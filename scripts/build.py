#!/usr/bin/env python3
"""Larch 靜態發布包建置與自動同步統一入口。"""
import argparse
import os
import sys

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

import sync
import export_pages

REPO_ROOT = os.path.dirname(SCRIPTS_DIR)


def main():
    parser = argparse.ArgumentParser(description='建置與同步 Larch 靜態網頁')
    parser.add_argument('--update', action='store_true', help='檢查並同步 larch.ink 最新版本')
    parser.add_argument('--force', action='store_true', help='強制重新下載最新版本')
    parser.add_argument('--project', default=os.path.join(REPO_ROOT, 'src', 'project.json'), help='專案 JSON 路徑')
    parser.add_argument('--assets', default=os.path.join(REPO_ROOT, 'src', 'assets'), help='專案素材目錄')
    parser.add_argument('--vendor', default=os.path.join(REPO_ROOT, 'vendor', 'larch'), help='核心播放器快取目錄')
    parser.add_argument('--out', default=REPO_ROOT, help='靜態網站輸出根目錄')
    args = parser.parse_args()

    v_file = os.path.join(args.vendor, 'VERSION')
    cur_v = None
    if os.path.exists(v_file):
        with open(v_file, 'r', encoding='utf-8') as f:
            cur_v = f.read().strip()

    vendor_exists = os.path.exists(os.path.join(args.vendor, 'index.html'))
    need_sync = args.update or args.force or not vendor_exists

    if need_sync:
        updated, remote_v = sync.check_and_sync(args.vendor, current_version=cur_v, force=args.force)
        if not updated and not args.force and vendor_exists and not args.update:
            print("快取已存在且未指定強制更新。")
    else:
        print(f"📌 使用本地快取版本: {cur_v or '未知'}")

    export_pages.export_pages(
        project_path=args.project,
        out_dir=args.out,
        vendor_dir=args.vendor,
        src_assets_dir=args.assets
    )


if __name__ == '__main__':
    main()
