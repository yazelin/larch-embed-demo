"""把作者手上的專案 JSON 轉成 Larch 播放器吃的形狀。全部是純函式，不碰檔案。"""
import copy
import re
from collections import deque

_MEDIA = r'(?:png|jpe?g|webp|gif|svg|avif|mp3|wav|ogg|m4a|mp4|webm)'
# 沒有 scheme、不以 / 開頭、沒有空白與 ?#，副檔名是媒體 → 視為專案資料夾裡的本機素材
_LOCAL = re.compile(r'^(?![a-zA-Z][\w+.-]*:)(?!/)[^\s?#]+\.' + _MEDIA + r'$', re.I)


def unwrap(doc):
    """吃裸專案、agent API 的 {"project": …}、市集回應三種形狀。"""
    return doc['project'] if isinstance(doc.get('project'), dict) else doc


def localize_urls(value):
    """相對路徑的媒體改寫成 /files/<路徑>；含 .. 的一律不動（伺服器那邊也會擋）。"""
    if isinstance(value, dict):
        return {k: localize_urls(v) for k, v in value.items()}
    if isinstance(value, list):
        return [localize_urls(v) for v in value]
    if isinstance(value, str) and _LOCAL.match(value) and '..' not in value.split('/'):
        return '/files/' + value.removeprefix('./')
    return value


def fill_defaults(project):
    """補上 Larch 平台建專案時本來就會有的欄位。agent 從零手寫的 JSON 常常只有 boards，
    播放器缺這些會直接壞掉（實測：沒有 settings 讀不到 projectThumbnail、卡片沒有 position 讀不到 x）。"""
    p = copy.deepcopy(project)
    p.setdefault('id', 'local-project')
    p.setdefault('name', '未命名專案')
    p.setdefault('description', '')
    p.setdefault('schemaVersion', 1)
    p.setdefault('locale', 'zh-Hant')
    p.setdefault('languages', [{'code': 'zh-Hant', 'label': '繁體中文', 'voiceMode': 'shared'}])
    for k in ('characters', 'media', 'variables'):
        p.setdefault(k, [])
    p.setdefault('settings', {})
    for b in p.get('boards') or []:
        b.setdefault('name', b.get('id', ''))
        b.setdefault('mode', 'story')
        for i, n in enumerate(b.setdefault('nodes', [])):
            n.setdefault('type', 'story')
            n.setdefault('position', {'x': 300 * i, 'y': 0})
            n.setdefault('data', {})
        for i, e in enumerate(b.setdefault('edges', [])):
            e.setdefault('id', f'edge-{i}')
    return p


def all_nodes(project):
    for b in project.get('boards') or []:
        for n in b.get('nodes') or []:
            yield b['id'], n


def find_start(project):
    boards = project.get('boards') or []
    if not boards:
        raise ValueError('專案沒有任何版子')
    active = project.get('activeBoardId')
    starts = [(b, n['id']) for b, n in all_nodes(project) if (n.get('data') or {}).get('start')]
    for s in starts:
        if s[0] == active:
            return s
    if starts:
        return starts[0]
    for b in boards:
        if b.get('nodes'):
            return b['id'], b['nodes'][0]['id']
    raise ValueError('專案沒有任何卡片')


def wrap_market(project, board_id=None):
    """包成 GET /api/marketplace/<id>?play=1 的回應形狀。"""
    p = copy.deepcopy(project)
    board_id = board_id or find_start(p)[0]
    board = next(b for b in p['boards'] if b['id'] == board_id)
    p['activeBoardId'] = board_id
    p['nodes'] = board.get('nodes') or []
    p['edges'] = board.get('edges') or []
    return {
        'id': 'local',
        'title': p.get('name') or 'local',
        'description': p.get('description') or '',
        'startBoardId': board_id,
        'publishedBoardIds': [b['id'] for b in p['boards']],
        'chapterMode': False,
        'project': p,
    }
