#!/usr/bin/env python3
"""同步 larch.ink 前端核心檔案至 vendor 快取。"""
import argparse
import os
import re
import shutil
import sys
import time
import urllib.error
import urllib.request

BASE = 'https://larch.ink'
SFX = ['rain', 'thunder', 'wind', 'waves', 'fire', 'footsteps', 'knock', 'whoosh', 'sting', 'heartbeat', 'chime']
REF = re.compile(r'(?:/?assets/|\./)([A-Za-z0-9_\-]+(?:\.[A-Za-z0-9_\-]+)*'
                 r'\.(?:js|mjs|css|woff2?|ttf|otf|png|svg|webp|jpe?g|gif|wasm|json|mp3))')
ROOT_REF = re.compile(r'["\'(`]/([A-Za-z0-9_\-]+\.(?:png|svg|ico|webp)'
                      r'|plugins/(?:[A-Za-z0-9_\-]+/)*[A-Za-z0-9_\-]+(?:\.[A-Za-z0-9_\-]+)*'
                      r'\.(?:png|webp|svg|jpe?g|gif|woff2?|otf|ttf|m4a|mp3|ogg|json))')


def extract_refs(text):
    return sorted(set(REF.findall(text)))


def extract_root_refs(text):
    return sorted(set(ROOT_REF.findall(text)))


def get_version(html):
    m = re.search(r'assets/(index-[A-Za-z0-9_\-]+\.js)', html)
    if not m:
        raise ValueError('larch.ink 首頁找不到 index-*.js，平台可能改了打包方式')
    return m.group(1)


def get(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code != 429 and e.code < 500 or attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))
        except OSError:
            if attempt == 2:
                raise
            time.sleep(2)


def crawl(dest, html):
    os.makedirs(os.path.join(dest, 'assets'), exist_ok=True)
    os.makedirs(os.path.join(dest, 'sfx'), exist_ok=True)
    with open(os.path.join(dest, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

    queue = extract_refs(html)
    seen = set()
    missing = []
    roots = set(extract_root_refs(html))
    fatal = []

    print(f"📥 開始下載核心資源隊列 ({len(queue)} 個初始資源)...")
    while queue:
        name = queue.pop()
        if name in seen:
            continue
        seen.add(name)

        asset_path = os.path.join(dest, 'assets', name)
        if os.path.exists(asset_path) and os.path.getsize(asset_path) > 0:
            if name.endswith(('.js', '.mjs', '.css')):
                try:
                    with open(asset_path, 'r', encoding='utf-8', errors='replace') as f:
                        text = f.read()
                    queue += extract_refs(text)
                    roots.update(extract_root_refs(text))
                except Exception:
                    pass
            continue

        try:
            data = get(f'{BASE}/assets/{name}')
        except urllib.error.HTTPError as e:
            if e.code == 404:
                missing.append(f'{name}（404）')
            else:
                fatal.append(f'{name}（{e.code}）')
            continue

        with open(asset_path, 'wb') as f:
            f.write(data)

        if name.endswith(('.js', '.mjs', '.css')):
            text = data.decode('utf-8', 'replace')
            queue += extract_refs(text)
            roots.update(extract_root_refs(text))

    os.makedirs(os.path.join(dest, 'root'), exist_ok=True)
    for name in sorted(roots):
        root_path = os.path.join(dest, 'root', name)
        if os.path.exists(root_path) and os.path.getsize(root_path) > 0:
            continue
        try:
            data = get(f'{BASE}/{name}')
        except urllib.error.HTTPError as e:
            missing.append(f'/{name}（{e.code}）')
            continue
        os.makedirs(os.path.dirname(root_path), exist_ok=True)
        with open(root_path, 'wb') as f:
            f.write(data)

    if fatal:
        raise RuntimeError('這些檔案下載失敗（非 404），快取不完整：' + '、'.join(fatal))

    for s in SFX:
        sfx_path = os.path.join(dest, 'sfx', s + '.mp3')
        if not os.path.exists(sfx_path):
            try:
                sfx_data = get(f'{BASE}/sfx/{s}.mp3')
                with open(sfx_path, 'wb') as f:
                    f.write(sfx_data)
            except Exception:
                pass

    if missing:
        print(f"⚠️ 略過 {len(missing)} 個伺服器上不存在的資源 (404):", missing[:6])
    print(f'✅ 同步完成：共快取 {len(seen) + len(roots) - len(missing)} 個檔案＋{len(SFX)} 個音效')


def check_and_sync(dest_dir, current_version=None, force=False):
    """檢查遠端版本；若不同或強制則進行下載。返回 (updated: bool, remote_version: str)"""
    print("🔍 檢查 larch.ink 最新版本...")
    html_bytes = get(f'{BASE}/')
    html = html_bytes.decode('utf-8', 'replace')
    remote_v = get_version(html)
    print(f"  遠端版本: {remote_v} | 目前版本: {current_version}")

    if not force and current_version == remote_v and os.path.exists(os.path.join(dest_dir, 'index.html')):
        print("⚡ 已經是最新版本，略過下載。")
        return False, remote_v

    print(f"🚀 偵測到新版本或缺少快取，開始同步最新前端 ({remote_v})...")
    tmp_dest = dest_dir + '.tmp'
    os.makedirs(tmp_dest, exist_ok=True)

    crawl(tmp_dest, html)

    with open(os.path.join(tmp_dest, 'VERSION'), 'w', encoding='utf-8') as f:
        f.write(remote_v + '\n')

    # 成功後原子替換
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)
    os.rename(tmp_dest, dest_dir)
    return True, remote_v


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='同步 larch.ink 前端檔案')
    parser.add_argument('--dest', default='vendor/larch', help='快取存放目錄')
    parser.add_argument('--force', action='store_true', help='強制重新下載')
    args = parser.parse_args()

    v_file = os.path.join(args.dest, 'VERSION')
    cur_v = None
    if os.path.exists(v_file):
        with open(v_file, 'r', encoding='utf-8') as f:
            cur_v = f.read().strip()

    updated, new_v = check_and_sync(args.dest, current_version=cur_v, force=args.force)
    sys.exit(0 if updated else 1)
