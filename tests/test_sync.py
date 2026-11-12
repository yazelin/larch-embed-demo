import io
import tempfile
import unittest
import unittest.mock
from contextlib import redirect_stdout
from pathlib import Path
from urllib.error import HTTPError

from scripts import sync


def http_error(code):
    return HTTPError('https://larch.ink/assets/app.js', code, '測試錯誤', None, None)


class GetRetryTests(unittest.TestCase):
    def test_retries_twice_then_returns_data(self):
        calls = 0
        waits = []

        def fake_opener(request, timeout):
            nonlocal calls
            calls += 1
            if calls <= 2:
                raise http_error(502)
            return io.BytesIO(b'ok')

        output = io.StringIO()
        with unittest.mock.patch.object(sync, 'RETRY_DELAYS', (0, 0, 0)):
            with redirect_stdout(output):
                result = sync.get(
                    'https://larch.ink/assets/app.js',
                    opener=fake_opener,
                    sleeper=waits.append,
                )

        self.assertEqual(result, b'ok')
        self.assertEqual(calls, 3)
        self.assertEqual(waits, [0, 0])
        self.assertEqual(len(output.getvalue().splitlines()), 2)

    def test_stops_after_four_failed_attempts(self):
        calls = 0
        waits = []

        def fake_opener(request, timeout):
            nonlocal calls
            calls += 1
            raise http_error(502)

        output = io.StringIO()
        with unittest.mock.patch.object(sync, 'RETRY_DELAYS', (0, 0, 0)):
            with redirect_stdout(output):
                with self.assertRaises(HTTPError) as raised:
                    sync.get(
                        'https://larch.ink/assets/app.js',
                        opener=fake_opener,
                        sleeper=waits.append,
                    )

        self.assertEqual(raised.exception.code, 502)
        self.assertEqual(calls, 4)
        self.assertEqual(waits, [0, 0, 0])
        self.assertEqual(len(output.getvalue().splitlines()), 3)

    def test_retries_after_timeout(self):
        calls = 0
        waits = []

        def fake_opener(request, timeout):
            nonlocal calls
            calls += 1
            if calls == 1:
                raise TimeoutError('逾時')
            return io.BytesIO(b'ok')

        with unittest.mock.patch.object(sync, 'RETRY_DELAYS', (0, 0, 0)):
            with redirect_stdout(io.StringIO()):
                result = sync.get(
                    'https://larch.ink/assets/app.js',
                    opener=fake_opener,
                    sleeper=waits.append,
                )

        self.assertEqual(result, b'ok')
        self.assertEqual(calls, 2)
        self.assertEqual(waits, [0])

    def test_does_not_retry_404(self):
        calls = 0
        waits = []

        def fake_opener(request, timeout):
            nonlocal calls
            calls += 1
            raise http_error(404)

        with self.assertRaises(HTTPError):
            sync.get(
                'https://larch.ink/assets/app.js',
                opener=fake_opener,
                sleeper=waits.append,
            )

        self.assertEqual(calls, 1)
        self.assertEqual(waits, [])


class CrawlFailureTests(unittest.TestCase):
    def test_non_404_failure_keeps_cache_incomplete_error(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            with unittest.mock.patch.object(sync, 'get', side_effect=http_error(502)):
                with redirect_stdout(io.StringIO()):
                    with self.assertRaisesRegex(
                        RuntimeError,
                        r'這些檔案下載失敗（非 404），快取不完整：app\.js（502）',
                    ):
                        sync.crawl(temp_dir, '<script src="/assets/app.js"></script>')

    def test_failed_sync_does_not_replace_existing_cache(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            dest = Path(temp_dir) / 'vendor'
            dest.mkdir()
            (dest / 'VERSION').write_text('old-version\n', encoding='utf-8')
            (dest / 'index.html').write_text('old-cache', encoding='utf-8')

            def fake_get(url):
                if url == f'{sync.BASE}/':
                    return b'<script src="/assets/index-version.js"></script>'
                raise http_error(502)

            with unittest.mock.patch.object(sync, 'get', side_effect=fake_get):
                with redirect_stdout(io.StringIO()):
                    with self.assertRaises(RuntimeError):
                        sync.check_and_sync(str(dest), current_version='old-version', force=True)

            self.assertEqual((dest / 'VERSION').read_text(encoding='utf-8'), 'old-version\n')
            self.assertEqual((dest / 'index.html').read_text(encoding='utf-8'), 'old-cache')

    def test_retry_schedule_is_two_five_and_fifteen_seconds(self):
        self.assertEqual(sync.RETRY_DELAYS, (2, 5, 15))


if __name__ == '__main__':
    unittest.main()
