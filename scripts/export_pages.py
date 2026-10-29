#!/usr/bin/env python3
"""將 Larch 專案打包為純靜態 GitHub Pages 站點並套用沙盒與子路徑相容補丁。"""
import argparse
import json
import os
import re
import shutil
import sys

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

from lp import rewrite

POLYFILL_SCRIPT = """    <script>
      (function() {
        // 沙盒 (Sandboxed iframe) 環境下 localStorage / sessionStorage Polyfill
        try { var _ = window.localStorage; } catch (e) {
          var mem = {};
          var mock = {
            getItem: function(k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
            setItem: function(k, v) { mem[k] = String(v); },
            removeItem: function(k) { delete mem[k]; },
            clear: function() { mem = {}; },
            get length() { return Object.keys(mem).length; },
            key: function(i) { return Object.keys(mem)[i] || null; }
          };
          try {
            Object.defineProperty(window, 'localStorage', { value: mock, writable: true, configurable: true });
            Object.defineProperty(window, 'sessionStorage', { value: mock, writable: true, configurable: true });
          } catch (ex) {}
        }

        // 相對路徑基底與遊戲站點設定
        window.__LARCH_BASE__ = './';
        window.__LARCH_GAME_SITE__ = {
          appPath: '/play/market/local',
          origin: window.location.origin,
          host: window.location.host,
          larch: 'https://larch.ink'
        };

        // 攔截 API 呼叫，直接以本地 market.json 回應
        var origFetch = window.fetch;
        window.fetch = async function(resource, init) {
          var url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
          if (url.indexOf('/api/marketplace/') !== -1) {
            try {
              var r = await origFetch('./market.json');
              var data = await r.json();
              return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (err) {
              return new Response(JSON.stringify({ error: err.message }), { status: 500 });
            }
          }
          if (url.indexOf('/api/') !== -1) {
            return new Response(JSON.stringify({ offline: true }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          return origFetch.apply(this, arguments);
        };
      })();
    </script>"""


def patch_js_files(assets_dir):
    """修補 Vite 打包的根路徑絕對參考，使之在 GitHub Pages 次目錄與沙盒下正常運作。"""
    patched_count = 0
    for fname in os.listdir(assets_dir):
        fpath = os.path.join(assets_dir, fname)
        if not fname.endswith('.js') or not os.path.isfile(fpath):
            continue

        if fname.startswith('preload-helper-'):
            with open(fpath, 'r', encoding='utf-8') as f:
                code = f.read()
            if 'v=function(l){return"/"+l}' in code:
                code = code.replace(
                    'v=function(l){return"/"+l}',
                    'v=function(l){return(window.__LARCH_BASE__||"./")+l}'
                )
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(code)
                patched_count += 1

        elif fname.startswith('index-'):
            with open(fpath, 'r', encoding='utf-8') as f:
                code = f.read()
            # 繞過首頁根路徑比對，使 GitHub Pages 子路徑直接啟動遊戲
            new_code = re.sub(
                r'function ([A-Za-z0-9_$]+)\(e=(?:window\.)?location\.pathname\)\{return ([A-Za-z0-9_$]+)&&e==="/"\?\2\.appPath:e\}',
                r'function \1(e=window.location.pathname){return \2?\2.appPath:e}',
                code
            )
            if new_code != code:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(new_code)
                patched_count += 1

        elif fname.startswith('Preview-'):
            with open(fpath, 'r', encoding='utf-8') as f:
                code = f.read()
            orig = code
            coerce_expr = '(typeof e==="string"?e:(e?.text||e?.label||String(e||"")))'
            # 形式 1: useCallback(e=>(e||"").replace(
            code = re.sub(
                r'useCallback\(e=>\((e\|\|\"\")\)\.replace\(',
                r'useCallback(e=>(' + coerce_expr + r'||' + '""' + r').replace(',
                code
            )
            # 形式 2: useCallback(e=><fn>(e||"",<var>).replace(
            code = re.sub(
                r'useCallback\(e=>([A-Za-z0-9_$]+)\((e\|\|\"\"),([A-Za-z0-9_$]+)\)\.replace\(',
                r'useCallback(e=>\1(' + coerce_expr + r'||' + '""' + r',\3).replace(',
                code
            )
            if code != orig:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(code)
                patched_count += 1

    print(f"✅ 修補 JS 模組相容性補丁 ({patched_count} 個項目)")


def export_pages(project_path, out_dir, vendor_dir, src_assets_dir=None):
    project_path = os.path.abspath(project_path)
    out_dir = os.path.abspath(out_dir)
    vendor_dir = os.path.abspath(vendor_dir)

    if not os.path.exists(project_path):
        raise FileNotFoundError(f"找不到專案檔：{project_path}")
    if not os.path.exists(vendor_dir):
        raise FileNotFoundError(f"找不到 vendor 核心快取目錄：{vendor_dir}")

    os.makedirs(out_dir, exist_ok=True)
    out_assets = os.path.join(out_dir, 'assets')
    os.makedirs(out_assets, exist_ok=True)

    print(f"📦 讀取專案：{project_path}")
    with open(project_path, 'r', encoding='utf-8') as f:
        raw_pj = json.load(f)

    project = rewrite.localize_urls(rewrite.fill_defaults(rewrite.unwrap(raw_pj)))
    market_data = rewrite.wrap_market(project)

    # 確保頂層陣列與欄位完整
    market_str = json.dumps(market_data, ensure_ascii=False)
    market_str = market_str.replace('/files/assets/', './assets/')
    market_str = market_str.replace('/files/', './assets/')

    market_json_path = os.path.join(out_dir, 'market.json')
    with open(market_json_path, 'w', encoding='utf-8') as f:
        f.write(market_str)
    print(f"✅ 生成 market.json ({os.path.getsize(market_json_path) / 1024:.1f} KB)")

    # 複製 vendor 核心播放器檔案
    vendor_assets = os.path.join(vendor_dir, 'assets')
    for item in os.listdir(vendor_dir):
        s = os.path.join(vendor_dir, item)
        d = os.path.join(out_dir, item)
        if item == 'assets':
            for a in os.listdir(vendor_assets):
                sa = os.path.join(vendor_assets, a)
                da = os.path.join(out_assets, a)
                shutil.copy2(sa, da)
        elif item == 'index.html':
            continue
        elif os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d)
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    # 處理 index.html
    vendor_index_path = os.path.join(vendor_dir, 'index.html')
    with open(vendor_index_path, 'r', encoding='utf-8') as f:
        vendor_index = f.read()

    vendor_index = vendor_index.replace('href="/assets/', 'href="./assets/')
    vendor_index = vendor_index.replace('src="/assets/', 'src="./assets/')
    vendor_index = vendor_index.replace('href="/favicon', 'href="./favicon')
    vendor_index = vendor_index.replace('href="/larch-', 'href="./larch-')
    vendor_index = vendor_index.replace('href="/manifest', 'href="./manifest')

    head_tag = '<head>'
    if head_tag in vendor_index:
        final_index = vendor_index.replace(head_tag, f"{head_tag}\n{POLYFILL_SCRIPT}\n", 1)
    else:
        final_index = f"{POLYFILL_SCRIPT}\n{vendor_index}"

    with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(final_index)
    print("✅ 生成並修補 index.html")

    # 修補 assets 裡的 JS bundle
    patch_js_files(out_assets)

    # 複製專案素材 (若存在)
    if src_assets_dir and os.path.isdir(src_assets_dir):
        asset_count = 0
        for item in os.listdir(src_assets_dir):
            sp = os.path.join(src_assets_dir, item)
            dp_assets = os.path.join(out_assets, item)
            dp_root = os.path.join(out_dir, item)
            if os.path.isfile(sp):
                shutil.copy2(sp, dp_assets)
                shutil.copy2(sp, dp_root)
                asset_count += 1
            elif os.path.isdir(sp):
                if os.path.exists(dp_assets):
                    shutil.rmtree(dp_assets)
                shutil.copytree(sp, dp_assets)
                asset_count += 1
        print(f"✅ 複製專案素材：{asset_count} 個項目至 assets/ 與根目錄")

    # 寫入 .nojekyll 防止 GitHub Pages 忽略 _ 開頭檔案
    nojekyll_path = os.path.join(out_dir, '.nojekyll')
    with open(nojekyll_path, 'w', encoding='utf-8') as f:
        pass
    print("✅ 確保 .nojekyll 存在")
    print("🎉 靜態發布包建置完成！輸出目錄：", out_dir)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='打包 Larch 專案為靜態 GitHub Pages 站點')
    parser.add_argument('--project', default='src/project.json', help='專案 JSON 檔案')
    parser.add_argument('--vendor', default='vendor/larch', help='vendor 核心目錄')
    parser.add_argument('--assets', default='src/assets', help='專案素材目錄')
    parser.add_argument('--out', default='.', help='輸出目錄')
    args = parser.parse_args()

    export_pages(args.project, args.out, args.vendor, args.assets)
