# Larch Embed Demo · GitHub Pages 突破專案

[![Update Larch Player & Build](https://github.com/yazelin/larch-embed-demo/actions/workflows/update-player.yml/badge.svg)](https://github.com/yazelin/larch-embed-demo/actions/workflows/update-player.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 將突破 Larch 平台容量上限的超大型視覺小說 / RPG 專案部署於 GitHub Pages，並透過「全螢幕插件卡」無縫內嵌回 Larch 雲端專案中。

---

## 實機展示 (Live Demo)

- 🌐 **獨立 GitHub Pages 遊戲站點**：[https://yazelin.github.io/larch-embed-demo/](https://yazelin.github.io/larch-embed-demo/)
- 🎮 **Larch 平台線上全螢幕內嵌體驗**：[點此預覽 Larch 專案](https://larch.ink/preview/eyJwcm9qZWN0SWQiOiJwcm9qZWN0LTMwYmE3Y2NlLTBiYzUtNGQ5YS1hZDc5LTNkZjU3MWIzYmMxOSIsImtleUlkIjoiM2VlODYxOGYtNzliNS00OGQxLTg0MzMtY2M2YzVjODc2ODI1IiwiZXhwIjoxNzkzMzkzNzI1NjE1fQ.G3BVjxlwvur4TEklevuSYWJ8gONK2OIykuKfm0yFFgQ)

---

## 為什麼需要這個架構？

Larch 平台對於專案 JSON 檔案大小及雲端素材上傳設有容量上限。當作品具備以下特徵時，容易受限於平台配額：
1. **超大規模劇情**：包含數百張卡片、複雜網狀分支。
2. **海量多媒體素材**：全配音語音包（數十甚至數百 MB）、多音軌無損 BGM、高解析度立繪與 CG。

### 解決方案
1. 將大型遊戲專案本體透過本專案腳本打包成**純靜態網站（Zero Backend）**，免費託管於 GitHub Pages（無容量困擾）。
2. 在 Larch 主專案中建立一張**全螢幕插件卡（Plugin Card）**，以 `<iframe>` 指向 GitHub Pages 網址。
3. 透過 `window.parent.postMessage` 實現雙向通訊，當玩家在外部遊戲完成漫遊後，無縫將訊號回傳給 Larch 主線推進故事！

---

## 特性與亮點

- 🔄 **GitHub Actions 全自動同步官方引擎**：
  內建 `.github/workflows/update-player.yml`，定時追蹤 `larch.ink` 官方最新前端引擎，一有更新自動抓取、修補並重新建置發布，免人工維護。
- 🛠️ **四重沙盒與子目錄補丁**：
  - **Storage Polyfill**：注入純記憶體 Storage，解決 iframe 沙盒環境下的 `SecurityError`。
  - **動態 Base 路徑**：自動修補 Vite Chunk 動態載入，支援任意 GitHub Pages 倉庫子目錄。
  - **SPA 路由直通**：自動繞過官方首頁行銷頁，直達遊戲播放器。
  - **選擇卡型別相容**：容錯轉換選項物件與字串格式，杜絕播放器執行階段異常。
- 🤖 **AI Ready (內建 SKILL.md)**：
  提供完整的 [`SKILL.md`](SKILL.md) 規範與操作指南，讓任何 AI 助理（Claude, Gemini, Codex, Antigravity）都能讀取本 repo，為其他大專案自動建立獨立的 GitHub Pages 部署。

---

## 目錄結構

```text
.
├── .github/workflows/
│   └── update-player.yml     # 定時追蹤官方前端並自動建置
├── scripts/
│   ├── sync.py               # 官方最新引擎同步器
│   ├── export_pages.py       # 靜態化打包與相容補丁注入器
│   ├── build.py              # 統一建置 CLI
│   └── lp/rewrite.py         # 專案格式標準化轉譯器
├── src/
│   ├── project.json          # 專案原始 JSON 檔案
│   └── assets/               # 專案本地素材 (圖檔、音效)
├── SKILL.md                  # 給 AI 讀取的技能操作說明
└── README.md
```

---

## 本地使用與建置

### 1. 更新並建置
```bash
# 檢查官方版本並重新打包發布產物
python3 scripts/build.py --update
```

### 2. 本地預覽
```bash
python3 -m http.server 8080
# 打開瀏覽器訪問 http://localhost:8080 即可遊玩
```

---

## 授權條款

MIT License © 2026 林亞澤

---

亞澤的其他作品：[GitHub](https://github.com/yazelin) · [個人網站](https://yazelin.github.io/) · [Facebook](https://www.facebook.com/yazelin.j303) · [請我喝杯咖啡](https://buymeacoffee.com/yazelin)
