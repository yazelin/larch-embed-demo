import{c as De}from"./index-BiUSOoji.js";import{f as x}from"./akarionMedia-BkIMgOoi.js";const ze=[["path",{d:"m2 8 2 2-2 2 2 2-2 2",key:"sv1b1"}],["path",{d:"m22 8-2 2 2 2-2 2 2 2",key:"101i4y"}],["rect",{width:"8",height:"14",x:"8",y:"5",rx:"1",key:"1oyrl4"}]],Oa=De("vibrate",ze),Ve={name:"Yapi",avatar:"/larch-mark.png"},Be='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}:root{--panel-bg:#eeeeea;--panel-fg:#262724}:root[data-theme="dark"]{--panel-bg:#2b2c31;--panel-fg:#f2f3f5}.panel{display:inline-block;padding:12px;border-radius:12px;background:var(--panel-bg);color:var(--panel-fg);font:14px Inter,"Noto Sans TC",system-ui,sans-serif}</style></head><body><div class="panel" id="hp">HP</div><script>addEventListener("message",function(e){if(e.source!==parent)return;var d=e.data;if(!d||!["larch:hud:init","larch:hud:update"].includes(d.type))return;document.documentElement.dataset.theme=d.theme;document.getElementById("hp").textContent="HP "+(d.variables.hp??0)});parent.postMessage({type:"larch:ready"},"*");<\/script></body></html>',ue=`<!doctype html>
<html><head><meta charset="utf-8">
<style>
  html, body { margin: 0; background: transparent; }
  :root { --panel-bg: #eeeeea; --panel-fg: #262724; }
  :root[data-theme="dark"] { --panel-bg: #2b2c31; --panel-fg: #f2f3f5; }
  .panel { background: var(--panel-bg); color: var(--panel-fg); border-radius: 12px; padding: 12px; }
</style></head>
<body><div class="panel">…</div>
<script>
  addEventListener('message', function (e) {
    if (e.source !== parent) return;
    var d = e.data;
    if (d && (d.type === 'larch:hud:init' || d.type === 'larch:hud:update')) document.documentElement.dataset.theme = d.theme;
  });
  parent.postMessage({ type: 'larch:ready' }, '*');
<\/script></body></html>`;function he(a){const e=JSON.stringify({id:"my-status-hud",name:"Status HUD",author:"Your name",version:"1.0.0",categories:["ui"],permissions:["player:ui","variables:read"],cards:[],huds:[{id:"status-bar",title:"HP",anchor:"top-left",width:180,height:48,offsetX:16,offsetY:80,interactive:!1,readVariables:["hp"],html:Be}]},null,2);return a?`## 遊戲常駐 UI（HUD）

在 manifest 宣告 \`huds\` 與 \`player:ui\` 權限，即可在遊戲角落放跨卡片保留的 UI。可以只提供 HUD，\`cards: []\` 合法，不需要 worker 或流程卡。

\`\`\`json
${e}
\`\`\`

- 每個擴充功能最多 8 個 HUD，每份 html 最多 400,000 字元。id 在擴充功能內唯一（3–60 字，小寫英數與連字號），title 是可存取的 iframe 名稱，titleEn 可選。
- anchor：top-left / top-right / bottom-left / bottom-right，預設 top-right。width / height 是 CSS 像素，32–640，預設 220 × 96；offsetX / offsetY 是從該角落算起的邊距，0–240，預設 16 / 80。小螢幕會縮限到可用範圍並避開安全區。
- 全螢幕：寫 \`"fullscreen": true\`，HUD 就蓋滿整個遊戲畫面（桌機、手機都是），仍避開安全區；anchor、width、height、offset 都不用寫。只要填滿一個方向時，width 或 height 寫 \`"full"\`（例如 \`"width": "full", "height": 64\` 是貼齊左右兩邊的橫條）；填滿的那個方向不算 offset。沒寫這兩個欄位的 HUD 跟以前一樣。
- interactive 預設 false：UI 只顯示、不攔截滑鼠、觸控或鍵盤焦點。設 true 後只攔截自己矩形範圍內的操作。透明的 iframe 區域仍屬於該矩形；請讓尺寸貼合內容，可用 resize 收合選單。UI 不會阻止劇情自行推進。全螢幕又 interactive 的 HUD 會擋住整個遊戲畫面的點擊（對話框、RPG 搖桿都按不到），只在選單打開時展開成全螢幕，關掉就 resize 回小尺寸，或用 visibleVariable 藏起來。
- readVariables / writeVariables 是故事變數「名稱」白名單，並分別需要 variables:read / variables:write。請先在專案建立這些變數；沒有宣告的變數不會傳入，未知變數、物件、NaN 與無限值不接受寫入。settings 的預設值與專案設定透過 values 傳入。
- readVariables、writeVariables 各最多 64 項（去掉重複後計算），超過的部分會被忽略，匯入與發布時會顯示警告。readVariables 可以寫前綴：\`"xn_*"\`（* 只能放在最後，前面至少一個字）會在遊戲中讀到所有以 xn_ 開頭的故事變數，一個前綴算一項；同一個 HUD 的所有前綴合計最多傳入 512 個變數（依變數名稱排序取前 512 個）。writeVariables 不支援前綴，可寫入的變數必須逐一列出。
- visibleVariable 可指定一個故事變數控制顯示，需要 variables:read。變數不存在或值為 false、0、空字串、"false"、"0" 時隱藏；其他值顯示。隱藏不銷毀 iframe；要把值也傳入沙盒，另列入 readVariables。

### HUD 訊息

先註冊 message 監聽器，再送 \`parent.postMessage({type:'larch:ready'}, '*')\`。

宿主回覆 \`larch:hud:init\`；換卡、換白板、讀檔、故事變數、語言或主題變動時送 \`larch:hud:update\`。兩者都有：\`{type, plugin, hud, values, variables, cardId, boardId, locale, theme, active}\`。theme 是 light 或 dark。只讀當下白板可用、且宣告可讀的變數。active=false 時請暫停自己的動畫與計時器；原生設定／存讀檔／歷史面板打開時 HUD 會隱藏並禁止寫入。

HUD 可送 \`{type:'larch:set', name:'hp', value:80}\` 更新授權變數；可送 \`{type:'larch:hud:resize', width:220, height:160}\` 調整自身矩形（仍受 32–640 與視窗範圍限制）；\`{type:'larch:hud:resize', fullscreen:true}\` 展開成全螢幕，\`{type:'larch:hud:resize', fullscreen:false, width:220, height:96}\` 收回來。width、height 也可以單獨寫 \`'full'\`；沒寫的方向照 manifest 的設定。HUD **不需要送 larch:complete**；complete、跳卡等流程控制訊息會被忽略。

### 生命週期與交付

同一輪播放換卡、換白板、改變數時保留 iframe 與內部狀態。返回標題、關閉播放或重新開始時重新建立；讀檔以故事變數同步，必須保存的狀態請寫進授權的故事變數，不能依賴沙盒 localStorage。

從「我的素材」把擴充功能導入專案時，會把 HUD 執行內容、版號、權限與設定預設值保存到 \`project.settings.plugins[pluginId].playback\`。分享／市集播放與 Web HTML／Windows 網頁播放器匯出使用這份快照，不要求玩家安裝擴充功能，也不自動跟隨市集更新。更新 HUD 版本請先移除專案中的擴充功能再重新導入；專案設定值會保留。直接透過專案 API 編寫者也要帶上 \`{enabled:true, playback:{version,permissions,huds,defaults:{}}}\`，只開 enabled 不會下載執行內容。原生 Unity／Godot／Unreal／Ren'Py runtime 不執行 HTML HUD。

HTML 在 sandbox="allow-scripts" 的 iframe 執行，不可存取主頁 DOM。請將 CSS、JS 與必要素材內嵌；HUD 不提供自動打包外部網址的功能。請依 theme 切換配色，固定背景必須配前景色，文字至少 4.5:1、控制邊界至少 3:1，並提供 hover、focus、active、disabled 樣式。

### 透明背景標準（必須遵守）

HUD 的框蓋在遊戲畫面上，框裡沒畫東西的地方必須透出底下的舞台，不能是一整塊白底或黑底。

- \`html\` 與 \`body\` 的背景一律 \`transparent\`。面板、按鈕的底色畫在裡面的元素（例如 \`.panel\`）上，並且同一條規則裡配好前景色。
- 不要寫死 color-scheme：CSS 裡不要有 \`color-scheme: light\`／\`dark\`，不要加 \`<meta name="color-scheme">\`，script 也不要改 \`colorScheme\`。框的 color-scheme 由平台依網站主題設定，並替 HUD 補上對應的 meta；HUD 自己另外指定，兩邊不一致時瀏覽器會在框底鋪一層不透明的白底或黑底。
- 淺色／深色交給平台：讀 \`larch:hud:init\`／\`larch:hud:update\` 的 \`theme\`，設在 \`document.documentElement.dataset.theme\`，用 \`:root[data-theme="dark"]\` 切換顏色；不要依賴 \`prefers-color-scheme\`（它不一定跟網站主題一致）。
- 框的尺寸貼合內容；需要展開時用 \`larch:hud:resize\`。全螢幕 HUD 尤其要整片透明，只在需要的地方畫面板。

可直接複製的骨架：

\`\`\`html
${ue}
\`\`\`

可匯入的互動範例：/plugin-examples/persistent-status.larch-plugin.json。先建立數值變數 hp=60、potions=3，再把擴充功能導入專案即可。
`:`## Persistent game UI (HUD)

Declare \`huds\` and permission \`player:ui\` to mount corner UI across story cards. HUD-only plugins use \`cards: []\`; no worker or flow card is needed.

\`\`\`json
${e}
\`\`\`

- Up to 8 HUDs per plugin, 400,000 characters of HTML each. IDs must be unique within the plugin (3–60 lowercase letters, digits and hyphens). title labels the frame; titleEn is optional.
- anchor: top-left / top-right / bottom-left / bottom-right (default top-right). width/height: 32–640 CSS pixels, defaults 220/96. offsetX/offsetY: corner margins 0–240, defaults 16/80. Frames are clamped to small viewports and safe areas.
- Full screen: \`"fullscreen": true\` makes the HUD cover the whole game area on desktop and phones, inside the safe areas; anchor, width, height and offsets are not needed. To fill one axis only, set width or height to \`"full"\` (\`"width": "full", "height": 64\` is a bar from edge to edge); the offset on a filled axis does not apply. HUDs without these fields behave as before.
- interactive defaults to false: display-only UI does not intercept pointer/touch input or keyboard focus. true enables interaction inside the frame rectangle only; transparent pixels still intercept input. Keep the frame tightly sized and resize it when expanding/collapsing. Story auto-advance continues. A full-screen interactive HUD blocks every click on the game (dialogue box, RPG joystick): go full screen only while its menu is open, then resize back or hide it with visibleVariable.
- readVariables/writeVariables list exact story variable names and require variables:read/variables:write respectively. Create those variables in the project first. Undeclared values are withheld; unknown variables, objects and non-finite numbers cannot be written. Plugin setting defaults plus project settings arrive as values.
- readVariables and writeVariables hold up to 64 entries each (after removing duplicates); extra entries are ignored and import/publish shows a warning. readVariables also accepts a prefix: \`"xn_*"\` (the * must come last, after at least one character) reads every story variable starting with xn_ during play and counts as one entry. All prefixes of one HUD together deliver at most 512 variables (the first 512 by name). writeVariables does not accept prefixes; list every writable variable by name.
- visibleVariable optionally controls visibility and requires variables:read. Missing, false, 0, empty string, "false", "0" hide the HUD without destroying it. Add the name to readVariables as well if the sandbox needs its value.

Register a message listener before posting \`{type:'larch:ready'}\` to parent. The host replies with \`larch:hud:init\`, then \`larch:hud:update\` on card, board, save-load, variable, locale or theme changes. Both contain \`{type,plugin,hud,values,variables,cardId,boardId,locale,theme,active}\`. theme is light/dark. Only readable variables available in the current board are sent. Pause animations/timers when active=false. Native settings/save/history panels hide HUDs and block their writes.

Send \`{type:'larch:set',name:'hp',value:80}\` to write an allowed variable; send \`{type:'larch:hud:resize',width:220,height:160}\` to resize within the same bounds; \`{type:'larch:hud:resize',fullscreen:true}\` expands to full screen and \`{type:'larch:hud:resize',fullscreen:false,width:220,height:96}\` shrinks back. width or height may also be \`'full'\` on its own; an axis left out keeps the manifest's setting. HUDs **do not send larch:complete**; complete/jump messages cannot advance the story.

The iframe survives cards, boards and variable changes during a play session. Returning to title, closing playback or starting a new game recreates it. Saves restore story variables; store durable state there rather than in sandbox localStorage.

Importing a plugin into a project snapshots its HUD HTML, version, permissions and setting defaults in \`project.settings.plugins[pluginId].playback\`. Shared/marketplace playback and Web HTML/Windows web-player exports use that snapshot without viewer installation or registry updates. To adopt a new HUD version, remove the plugin from the project and import it again; project setting values are retained. Direct project API authors must include \`{enabled:true,playback:{version,permissions,huds,defaults:{}}}\`; enabled alone does not fetch code. Native Unity/Godot/Unreal/Ren'Py runtimes do not execute HTML HUDs.

The HTML runs inside sandbox="allow-scripts" and cannot access the parent DOM. Inline CSS, JS and required assets; external URLs are not automatically bundled. Support light/dark theme messages, paired foreground/background colors, text contrast >=4.5:1, control boundaries >=3:1, and hover/focus/active/disabled states.

### Transparent background standard (required)

The HUD frame sits on top of the game. Wherever the HUD draws nothing, the stage must show through — never a solid white or black box.

- \`html\` and \`body\` backgrounds are always \`transparent\`. Paint panel and button backgrounds on inner elements (e.g. \`.panel\`), with the paired foreground colour in the same rule.
- Never hardcode color-scheme: no \`color-scheme: light\`/\`dark\` in CSS, no \`<meta name="color-scheme">\`, no script setting \`colorScheme\`. The platform sets the frame's color-scheme from the site theme and adds the matching meta for you; if the HUD declares a different one, the browser paints an opaque white or black backdrop behind the whole frame.
- Let the platform drive light/dark: read \`theme\` from \`larch:hud:init\`/\`larch:hud:update\`, store it in \`document.documentElement.dataset.theme\` and switch colours with \`:root[data-theme="dark"]\`. Do not rely on \`prefers-color-scheme\` (it may not match the site theme).
- Size the frame to its content; use \`larch:hud:resize\` to expand. A full-screen HUD especially must stay transparent everywhere it does not draw a panel.

Copy-paste skeleton:

\`\`\`html
${ue}
\`\`\`

Importable interactive example: /plugin-examples/persistent-status.larch-plugin.json. Create number variables hp=60 and potions=3, then import the plugin into the project.
`}const Ge="linear(0,.047,.157,.293,.432,.561,.673,.766,.84,.896,.937,.966,.986,.999,1.006,1.01,1.011,1.011,1.01,1.008,1.007,1.005,1.004,1.003,1)",qe="linear(0,.103,.333,.594,.823,.991,1.091,1.132,1.131,1.106,1.071,1.037,1.01,.993,.984,.982,.984,.988,.993,.997,1,1.002,1.002,1.002,1)",fe=`:root {
  --larch-ink: #111210; --larch-paper: #ffffff; --larch-soft: #eeeeea; --larch-line: #deded7; --larch-control-line: #8b8d85; --larch-muted: #686a63;
  --larch-control-muted-bg: #eeeeea; --larch-control-muted-fg: #262724;
  --larch-control-strong-bg: #171716; --larch-control-strong-fg: #ffffff;
  --larch-danger-bg: #fff0ee; --larch-danger-fg: #9f352e; --larch-link-fg: #3542b4;
  --larch-font: Inter, "SF Pro Display", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif;
  --larch-spring: cubic-bezier(.2,.9,.2,1);
  --larch-spring-pop: cubic-bezier(.2,1.5,.35,1);
  color-scheme: light;
}
@supports (transition-timing-function: linear(0, 1)) {
  :root {
    --larch-spring: ${Ge};
    --larch-spring-pop: ${qe};
  }
}
/* Dark: panels get data-larch-theme, HUDs add .dark from the theme field, cards follow the system. */
:root[data-larch-theme="dark"], :root.dark {
  --larch-ink: #f4f4f1; --larch-paper: #1e1f22; --larch-soft: #2b2c31; --larch-line: #4e5058; --larch-control-line: #7c7f88; --larch-muted: #b5bac1;
  --larch-control-muted-bg: #2b2c31; --larch-control-muted-fg: #f2f3f5;
  --larch-control-strong-bg: #f2f3f5; --larch-control-strong-fg: #171815;
  --larch-danger-bg: #3b2421; --larch-danger-fg: #ffb5ae; --larch-link-fg: #b8beff;
  color-scheme: dark;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-larch-theme="light"]):not(.light) {
    --larch-ink: #f4f4f1; --larch-paper: #1e1f22; --larch-soft: #2b2c31; --larch-line: #4e5058; --larch-control-line: #7c7f88; --larch-muted: #b5bac1;
    --larch-control-muted-bg: #2b2c31; --larch-control-muted-fg: #f2f3f5;
    --larch-control-strong-bg: #f2f3f5; --larch-control-strong-fg: #171815;
    --larch-danger-bg: #3b2421; --larch-danger-fg: #ffb5ae; --larch-link-fg: #b8beff;
    color-scheme: dark;
  }
}
body { margin: 0; background: var(--larch-paper); color: var(--larch-ink); font: 14px/1.5 var(--larch-font); }
.card { background: var(--larch-paper); color: var(--larch-ink); border: 1px solid var(--larch-line); border-radius: 12px; padding: 16px; }
button {
  min-height: 36px; padding: 0 14px; border: 1px solid transparent; border-radius: 8px; font: 600 13px/1 var(--larch-font);
  display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;
  background: var(--larch-control-muted-bg); color: var(--larch-control-muted-fg);
  transition: scale .38s var(--larch-spring), box-shadow .38s var(--larch-spring), background-color .22s ease, border-color .22s ease, color .22s ease;
}
button.primary { background: var(--larch-control-strong-bg); color: var(--larch-control-strong-fg); }
button.danger { background: var(--larch-danger-bg); color: var(--larch-danger-fg); }
@media (hover: hover) { button:not(:disabled):hover { scale: 1.018; } }
button:not(:disabled):active { scale: .965; transition-duration: .1s; }
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 2px solid var(--larch-ink); outline-offset: 3px; }
button:disabled { opacity: .45; cursor: not-allowed; }
button svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
input, select, textarea {
  min-height: 36px; padding: 0 10px; border: 1px solid var(--larch-control-line); border-radius: 8px;
  background: var(--larch-paper); color: var(--larch-ink); font: 14px var(--larch-font);
}
.enter { animation: larch-enter .42s var(--larch-spring) both; }
.pop { animation: larch-pop .59s var(--larch-spring-pop) both; }
@keyframes larch-enter { from { opacity: 0; translate: 0 8px; scale: .96; } }
@keyframes larch-pop { from { scale: .6; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}`,me=`function spring(from, to, onFrame, opts) {
  var k = (opts && opts.stiffness) || 380, c = (opts && opts.damping) || 32, x = from, v = 0, last = performance.now(), id = 0;
  function step(now) {
    var dt = Math.min(.032, (now - last) / 1000); last = now;
    v += (-k * (x - to) - c * v) * dt; x += v * dt;
    if (Math.abs(x - to) < .001 && Math.abs(v) < .01) { onFrame(to); return; }
    onFrame(x); id = requestAnimationFrame(step);
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { onFrame(to); return function () {}; }
  id = requestAnimationFrame(step);
  return function cancel() { cancelAnimationFrame(id); };
}`;function be(a){return a?`## Larch 介面風格（一定要照做）

擴充功能看起來要像 Larch 本來就有的功能，不是另一個網站。Larch 的風格是**中性、安靜、以內容為主**：白底或深灰底、近黑文字、細灰邊框、小圓角、柔和的 spring 動畫。

**直接把下面這段 CSS 放進每一份 html 的 \`<style>\` 開頭**，再用這些變數與 class 寫你的介面：

\`\`\`css
${fe}
\`\`\`

### 外觀規則
- **顏色只用上面的變數。** 不要紫色、不要大片綠色或藍色、不要漸層背景、不要霓虹發光。強調用 \`--larch-control-strong-*\`（黑底白字；深色模式反過來），次要按鈕用 \`--larch-control-muted-*\`，刪除用 \`--larch-danger-*\`，連結用 \`--larch-link-fg\`。遊戲本身的美術（地圖、角色、道具圖）不受這條限制，限制的是按鈕、面板、選單這些介面。
- **設了背景就要同時設文字顏色**，不要依賴瀏覽器預設的按鈕灰。文字對比至少 4.5:1，圖示與控制項邊框至少 3:1。
- **字型**用 \`--larch-font\`，內文 14px、按鈕 13px 粗體、標題 16–18px 粗體。不要另外載入字型。
- **圓角**：按鈕與輸入框 8px、卡片與面板 12px、膠囊標籤 999px。不要超過 16px 的大圓角。
- **間距**用 4 的倍數（4、8、12、16、24）。卡片內距 16px，元素之間 8–12px。
- **邊框**：分隔線與卡片外框用 1px \`--larch-line\`；輸入框、勾選框這類控制項的邊框要用 \`--larch-control-line\`（才有 3:1 對比）。陰影只用很淡的 \`0 8px 24px rgb(0 0 0 / .08)\`，深色模式不要陰影改用邊框。
- **圖示**用 inline SVG 線條圖示（像 Lucide：24×24 viewBox、stroke 2、圓角端點），按鈕內 16px、標題旁 18px，顏色用 \`currentColor\`。不要用 emoji 當圖示。
- **深色模式**：面板會在 \`<html>\` 收到 \`data-larch-theme\`；HUD 從訊息的 \`theme\` 欄位得知，請寫 \`document.documentElement.className = d.theme\`；卡片沒有主題資訊時跟著 \`prefers-color-scheme\`。三種情況上面的 CSS 都處理好了。
- **手機**：可點的東西至少 44×44px，按鈕之間至少 8px，不要只靠 hover 才看得到的功能。

### 互動與 spring 動畫
- **每個可按的東西都要有狀態**：hover 放大 1.018、按下縮到 .965（.1 秒）、鍵盤 focus 有 2px 外框、disabled 半透明。上面的 \`button\` 規則已經包含，自訂的可點元素（格子、道具、卡片）也要套同樣的 \`scale\` 與 \`transition\`。
- **動畫曲線一律用 \`var(--larch-spring)\`**（約 .42 秒、幾乎不回彈）：面板展開、清單項目進場、元素移動。**\`var(--larch-spring-pop)\`**（約 .6 秒、會彈一下）只用在小東西：開關切換、徽章數字、獲得道具、成功打勾。
- **進場**：新出現的區塊加 \`.enter\`（淡入＋往上 8px＋從 .96 放大）；清單項目可以每項延遲 30–40ms 依序進場，總長不超過 .3 秒。**離場**要比進場快（約 .18 秒 ease-out），不要彈。
- **只動 \`transform\`／\`scale\`／\`translate\`／\`opacity\`**，不要動 width、height、top、left —— 會卡。顏色變化用 .22 秒 ease，不要用彈簧。
- **跟手的動畫**（拖曳放開回位、數值條、跟著游標的東西）用下面這個 JS 彈簧，參數跟 Larch 編輯器一樣：

\`\`\`js
${me}
\`\`\`

- **尊重 \`prefers-reduced-motion\`**：上面的 CSS 與 \`spring()\` 都已經處理，自己寫的 \`requestAnimationFrame\` 動畫也要檢查。
- 動畫是為了讓操作有回饋，不是裝飾：不要無限循環的呼吸燈、不要整個畫面晃動、一次只讓一個東西彈。

`:`## Larch interface style (required)

A plugin should look like a feature Larch already has, not a different website. Larch is **neutral, quiet and content-first**: white or dark-grey surfaces, near-black text, thin grey borders, small radii and soft spring motion.

**Paste this CSS at the top of every html \`<style>\`** and build your interface on these variables and classes:

\`\`\`css
${fe}
\`\`\`

### Look
- **Use only the colour variables above.** No purple, no large green or blue areas, no gradient backgrounds, no neon glows. Primary actions use \`--larch-control-strong-*\` (black on white; inverted in dark mode), secondary ones \`--larch-control-muted-*\`, destructive ones \`--larch-danger-*\`, links \`--larch-link-fg\`. Game art (maps, characters, item pictures) is exempt — this applies to buttons, panels and menus.
- **Whenever you set a background, set the text colour in the same rule**; never rely on the browser's default button grey. Text needs at least 4.5:1 contrast, icons and control borders at least 3:1.
- **Type**: \`--larch-font\`, body 14px, buttons 13px bold, headings 16–18px bold. Don't load other fonts.
- **Radii**: 8px for buttons and inputs, 12px for cards and panels, 999px for pills. Nothing rounder than 16px.
- **Spacing** in multiples of 4 (4, 8, 12, 16, 24). Cards pad 16px; 8–12px between elements.
- **Borders**: dividers and card outlines are 1px \`--larch-line\`; inputs, checkboxes and other control boundaries use \`--larch-control-line\` so they reach 3:1. Shadows stay faint (\`0 8px 24px rgb(0 0 0 / .08)\`); in dark mode use a border instead of a shadow.
- **Icons** are inline line SVGs (Lucide-like: 24×24 viewBox, stroke 2, round caps), 16px in buttons, 18px beside headings, coloured with \`currentColor\`. No emoji as icons.
- **Dark mode**: panels get \`data-larch-theme\` on \`<html>\`; HUDs learn it from the message \`theme\` field — write \`document.documentElement.className = d.theme\`; cards without theme info follow \`prefers-color-scheme\`. The CSS above covers all three.
- **Phones**: tap targets at least 44×44px with 8px between them; never hide a feature behind hover only.

### Interaction and spring motion
- **Everything clickable has states**: hover scales to 1.018, press to .965 (.1s), keyboard focus gets a 2px outline, disabled is faded. The \`button\` rules above do this; give custom clickable elements (tiles, items, cards) the same \`scale\` and \`transition\`.
- **Use \`var(--larch-spring)\` for motion** (≈.42s, almost no overshoot): panels opening, list items entering, things moving. **\`var(--larch-spring-pop)\`** (≈.6s, one bounce) is only for small things: toggles, badge counts, item pickups, success ticks.
- **Enter**: add \`.enter\` to new blocks (fade in, rise 8px, scale from .96); stagger list items 30–40ms each, .3s total at most. **Exit** faster than enter (≈.18s ease-out) and without bounce.
- **Animate only \`transform\` / \`scale\` / \`translate\` / \`opacity\`**, never width, height, top or left. Colour changes use .22s ease, not a spring.
- **Motion that follows input** (drag release, value bars, things following the pointer) uses this JS spring, with the same constants as the Larch editor:

\`\`\`js
${me}
\`\`\`

- **Respect \`prefers-reduced-motion\`**: the CSS and \`spring()\` above already do; check it in any \`requestAnimationFrame\` animation you write yourself.
- Motion is feedback, not decoration: no infinite breathing glows, no whole-screen shakes, only one thing bouncing at a time.

`}const Me=["card","system","animation","render3d","live2d","physics","map","ui","tool"],I={card:{zh:"自訂卡片",en:"Custom cards",hintZh:"在白板上多一種卡片型別",hintEn:"Adds a new card type to the board"},system:{zh:"遊戲系統",en:"Game systems",hintZh:"背包、任務、好感度之類的機制",hintEn:"Inventory, quests, affinity and friends"},animation:{zh:"動畫演出",en:"Animation",hintZh:"轉場、鏡頭與立繪動態",hintEn:"Transitions, camera and portrait motion"},render3d:{zh:"3D 模組",en:"3D",hintZh:"3D 場景、模型與空間演出",hintEn:"3D scenes, models and spatial staging"},live2d:{zh:"Live2D 模組",en:"Live2D",hintZh:"骨架立繪與口型同步",hintEn:"Rigged portraits and lip-sync"},physics:{zh:"物理系統",en:"Physics",hintZh:"碰撞、重力與擬真互動",hintEn:"Collision, gravity and physical toys"},map:{zh:"地圖探索",en:"Maps",hintZh:"RPG 地圖、格子移動與探索",hintEn:"RPG maps, grid movement, exploration"},ui:{zh:"介面元件",en:"Interface",hintZh:"狀態列、選單與 HUD",hintEn:"Status bars, menus and HUD"},tool:{zh:"創作工具",en:"Authoring tools",hintZh:"給作者用的輔助，不會演給玩家看",hintEn:"Helpers for the author, not the player"}},$e=["variables:read","variables:write","assets:read","characters:read","flow:control","cards:read","cards:write","project:read","ui:contribute","save:hook","theme:write","player:ui"],ge={"player:ui":{zh:"顯示遊戲常駐介面",en:"Show persistent game UI",hintZh:"在遊戲角落顯示跨卡片保留的介面；互動限於宣告的範圍",hintEn:"Shows UI across story cards; interaction stays within its declared bounds"},"variables:read":{zh:"讀取故事變數",en:"Read story variables",hintZh:"僅限卡片勾選或常駐 UI 宣告的變數",hintEn:"Only variables selected on a card or declared by a HUD"},"variables:write":{zh:"寫入故事變數",en:"Write story variables",hintZh:"僅限卡片授權或常駐 UI 宣告的變數",hintEn:"Only variables authorised on a card or declared by a HUD"},"assets:read":{zh:"使用專案素材",en:"Use project assets",hintZh:"取得作者挑給它的圖片與音訊網址",hintEn:"Gets URLs for the assets you hand it"},"characters:read":{zh:"讀取角色資料",en:"Read characters",hintZh:"角色名稱與立繪網址",hintEn:"Character names and portrait URLs"},"flow:control":{zh:"推進故事",en:"Advance the story",hintZh:"演完之後讓故事往下一張卡走",hintEn:"Moves to the next card when it finishes"},"cards:read":{zh:"讀取白板卡片",en:"Read board cards",hintZh:"看得到這張白板上的卡片與連線",hintEn:"Sees the cards and links on the open board"},"cards:write":{zh:"修改白板卡片",en:"Edit board cards",hintZh:"可以新增、改寫、搬動或刪除卡片",hintEn:"Can add, rewrite, move or delete cards"},"project:read":{zh:"讀取專案資料",en:"Read the project",hintZh:"專案名稱、白板清單、變數與角色",hintEn:"Project name, boards, variables and characters"},"ui:contribute":{zh:"加入介面項目",en:"Add interface items",hintZh:"在右鍵選單、工具列或面板加入自己的項目",hintEn:"Adds items to context menus, the toolbar or panels"},"save:hook":{zh:"在存檔時執行",en:"Run on save",hintZh:"每次存檔前後可以做自己的事，例如留快照",hintEn:"Runs around each save — snapshots, exports, checks"},"theme:write":{zh:"調整介面外觀",en:"Restyle the interface",hintZh:"換編輯器的配色與圓角等外觀變數",hintEn:"Changes editor colours, radii and similar tokens"}},Fa=["variables:read","variables:write","assets:read","characters:read","flow:control","player:ui"],_e=["puzzle","backpack","box","boxes","coins","compass","cpu","dices","grid","layers","map","move3d","music","orbit","palette","person","scroll","shapes","sparkles","swords","timer","trophy","wand","zap","lock","quiz"],Ke=["text","longText","number","toggle","select","color","asset","assets","character","variable","storyCard"],Je=["settings","storage","variable"],We=["any","image","audio","video","background","character","expression","bgm","sfx","ui"],Ze=["top-left","top-right","bottom-left","bottom-right"],q=8,Ye=["cardMenu","canvasMenu","toolbar","inspector","navbar","topRight","bottomLeft","bottomRight"],Ra={cardMenu:{zh:"卡片右鍵選單",en:"Card context menu"},canvasMenu:{zh:"白板右鍵選單",en:"Board context menu"},toolbar:{zh:"白板工具列",en:"Board toolbar"},inspector:{zh:"卡片編輯器",en:"Card inspector"},navbar:{zh:"左上角專案列",en:"Project bar (top left)"},topRight:{zh:"右上角播放旁",en:"Next to Play (top right)"},bottomLeft:{zh:"左下角說明旁",en:"Next to Help (bottom left)"},bottomRight:{zh:"右下角檢視工具",en:"View controls (bottom right)"}},Da=["toolbar","navbar","topRight","bottomLeft","bottomRight"],ye=4,Xe=["modal","side","settings"],Qe=["medium","large","full"],ea=new Set(["Mod+A","Mod+C","Mod+D","Mod+E","Mod+F","Mod+G","Mod+H","Mod+J","Mod+K","Mod+L","Mod+M","Mod+N","Mod+O","Mod+P","Mod+Q","Mod+R","Mod+S","Mod+T","Mod+U","Mod+V","Mod+W","Mod+X","Mod+Y","Mod+Z","Mod+Shift+G","Mod+Shift+Z","Mod+Shift+N","Mod+Shift+T","Mod+Shift+W","Mod+Shift+R","Mod+Shift+J","Mod+Shift+I","Mod+Shift+C","Mod+Shift+B","Mod+Shift+O","Mod+Shift+Q","Mod+Alt+I","Mod+Alt+J","Mod+Shift+A","Mod+Shift+D","Mod+Shift+E","Mod+Shift+H","Mod+Shift+K","Mod+Shift+M","Mod+Shift+P","Mod+Shift+S","Mod+Shift+Y","Mod+0","Mod+1","Mod+2","Mod+3","Mod+4","Mod+5","Mod+6","Mod+7","Mod+8","Mod+9","Alt+D","Alt+E","Alt+F","Alt+F4","Mod+F4","Mod+F5","F1","F3","F5","F6","F7","F10","F11","F12"]),aa={mod:"Mod",cmd:"Mod",command:"Mod",meta:"Mod",ctrl:"Mod",control:"Mod",alt:"Alt",option:"Alt",opt:"Alt",shift:"Shift"};function ta(a){const e=a.split("+").map(r=>r.trim()).filter(Boolean);if(!e.length)return{error:"快捷鍵是空的"};const s=new Set;for(const r of e.slice(0,-1)){const i=aa[r.toLowerCase()];if(!i)return{error:`不認得的按鍵「${r}」，修飾鍵只能用 Mod、Alt、Shift`};s.add(i)}const t=e[e.length-1],n=/^[a-z0-9]$/i.test(t)||/^f([1-9]|1[0-2])$/i.test(t)?t.toUpperCase():"";if(!n)return{error:`「${t}」不能當快捷鍵，請用 A–Z、0–9 或 F1–F12`};if(!s.has("Mod")&&!s.has("Alt")&&!/^F/.test(n))return{error:"快捷鍵至少要有 Mod 或 Alt，例如 Alt+Shift+K"};const o=[...["Mod","Alt","Shift"].filter(r=>s.has(r)),n].join("+");return ea.has(o)?{error:`${o} 已經被 Larch 或瀏覽器用掉了，請換一組，例如 Alt+Shift+K`}:{shortcut:o}}function za(a,e,s){const t=a.split("+"),n=t[t.length-1];return(s?e.metaKey:e.ctrlKey)!==t.includes("Mod")||e.altKey!==t.includes("Alt")||e.shiftKey!==t.includes("Shift")||s&&e.ctrlKey?!1:/^[A-Z]$/.test(n)?e.code===`Key${n}`:/^[0-9]$/.test(n)?e.code===`Digit${n}`:e.key.toUpperCase()===n}function Va(a,e){const s=a.split("+");return e?s.map(t=>t==="Mod"?"⌘":t==="Alt"?"⌥":t==="Shift"?"⇧":t).join(""):s.map(t=>t==="Mod"?"Ctrl":t).join("+")}const sa=["project:open","project:save","card:change"],Ba={"project:open":{zh:"打開專案時",en:"When a project opens"},"project:save":{zh:"每次存檔時",en:"On every save"},"card:change":{zh:"卡片被改動時",en:"When a card changes"}};function Ga(a,e){const s=(t,n,o)=>{if(e.fullscreen===!0||t==="full")return"full";if(typeof t=="number"&&Number.isFinite(t))return Math.max(32,Math.min(640,Math.round(t)));const r=a.fullscreen?"full":n;return r==="full"?e.fullscreen===!1?o:"full":typeof r=="number"&&Number.isFinite(r)?Math.max(32,Math.min(640,Math.round(r))):o};return{width:s(e.width,a.width,220),height:s(e.height,a.height,96)}}const qa=["larch-inventory"],V=/^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/,M=/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/,C=4e5,na=12e5,U=12,A=64,oa=512,W=a=>a.length>1&&a.endsWith("*")&&!a.slice(0,-1).includes("*"),Ka=["larch-plugin.json","plugin.json","manifest.json"],B=a=>_e.includes(a),l=(a,e)=>typeof a=="string"?a.slice(0,e):"",v=a=>Array.isArray(a)?a:[];function Ie(a,e,s){const t=a||{},n=l(t.key,40);if(!M.test(n))return e.push(`${s}: 欄位 key「${n||"(空白)"}」無效，只能用英數與底線且開頭為英文字母`),null;const o=Ke.includes(t.kind)?t.kind:"text",r=v(t.options).slice(0,40).map(b=>{const f=b||{};return{value:l(f.value,80),label:l(f.label,80)||l(f.value,80),labelEn:l(f.labelEn,80)||void 0}}).filter(b=>b.value),i=o==="select"&&t.optionsFrom!==void 0?da(t.optionsFrom,e,`${s}: 欄位「${n}」的 optionsFrom`):void 0;if(o==="select"&&!r.length&&!i)return e.push(`${s}: 欄位「${n}」是 select，但沒有給 options（或 optionsFrom）`),null;t.optionsFrom!==void 0&&o!=="select"&&e.push(`${s}: 欄位「${n}」不是 select，不能用 optionsFrom`);const c=t.row===void 0?"":l(t.row,40);t.row!==void 0&&!M.test(c)&&e.push(`${s}: 欄位「${n}」的 row「${c||"(空白)"}」要是英數與底線的名稱`);const d=t.width;d!==void 0&&(typeof d!="number"||!Number.isFinite(d)||d<=0||d>12)&&e.push(`${s}: 欄位「${n}」的 width 要是大於 0、不超過 12 的數字（同一列照比例分寬度）`),t.showIfMode!==void 0&&t.showIfMode!=="hide"&&t.showIfMode!=="disable"&&e.push(`${s}: 欄位「${n}」的 showIfMode 只能是 hide 或 disable`);const p=typeof t.defaultValue=="string"||typeof t.defaultValue=="number"||typeof t.defaultValue=="boolean"?t.defaultValue:void 0;t.itemControls!==void 0&&o!=="assets"&&e.push(`${s}: 欄位「${n}」不是 assets，不能用 itemControls`);const u=o==="assets"&&t.itemControls!==void 0?ra(t.itemControls,e,`${s}: 欄位「${n}」的 itemControls`):[];return{key:n,label:l(t.label,80)||n,labelEn:l(t.labelEn,80)||void 0,kind:o,hint:l(t.hint,200)||void 0,hintEn:l(t.hintEn,200)||void 0,placeholder:l(t.placeholder,120)||void 0,options:o==="select"&&r.length?r:void 0,min:typeof t.min=="number"?t.min:void 0,max:typeof t.max=="number"?t.max:void 0,step:typeof t.step=="number"?t.step:void 0,assetKind:(o==="asset"||o==="assets")&&We.includes(t.assetKind)&&t.assetKind!=="any"?t.assetKind:void 0,assetValue:(o==="asset"||o==="assets")&&(t.assetValue==="name"||t.assetValue==="id")?t.assetValue:void 0,defaultValue:o==="toggle"?!!p:p,...t.showIf!==void 0?la(t.showIf,e,`${s}: 欄位「${n}」的 showIf`):{},...t.showIfMode==="disable"?{showIfMode:"disable"}:{},...i?{optionsFrom:i}:{},...c&&M.test(c)?{row:c}:{},...c&&typeof d=="number"&&d>0&&d<=12?{width:d}:{},...u.length?{itemControls:u}:{}}}const K=4,D=a=>typeof a=="number"&&Number.isFinite(a)?a:void 0;function ra(a,e,s){if(!Array.isArray(a))return e.push(`${s} 必須是陣列，例如 [{ "key": "volume", "label": "音量", "kind": "number", "min": 0, "max": 100 }]`),[];a.length>K&&e.push(`${s} 最多 ${K} 個`);const t=new Set;return a.slice(0,K).flatMap((n,o)=>{const r=n||{},i=l(r.key,40);if(!M.test(i))return e.push(`${s}[${o}]: key「${i||"(空白)"}」無效，只能用英數與底線且開頭為英文字母`),[];if(t.has(i))return e.push(`${s}[${o}]: key「${i}」重複了`),[];r.kind!==void 0&&r.kind!=="number"&&e.push(`${s}[${o}]: kind 目前只能是 number`),t.add(i);let c=D(r.min),d=D(r.max);c!==void 0&&d!==void 0&&c>d&&(e.push(`${s}[${o}]: min 不能大於 max`),c=d=void 0);const p=D(r.step);let u=D(r.defaultValue);return u!==void 0&&(u=Math.min(d??1/0,Math.max(c??-1/0,u))),[{key:i,label:l(r.label,40)||i,labelEn:l(r.labelEn,40)||void 0,kind:"number",...c!==void 0?{min:c}:{},...d!==void 0?{max:d}:{},...p!==void 0&&p>0?{step:p}:{},...u!==void 0?{defaultValue:u}:{}}]})}function Ja(a){return String(a??"").split(/\r?\n/).flatMap(e=>{const s=e.indexOf("	"),t=(s<0?e:e.slice(0,s)).trim();if(!t)return[];const n={};if(s>=0)try{const o=JSON.parse(e.slice(s+1));if(o&&typeof o=="object"&&!Array.isArray(o))for(const[r,i]of Object.entries(o))M.test(r)&&typeof i=="number"&&Number.isFinite(i)&&(n[r]=i)}catch{}return[{entry:t,meta:n}]})}const Wa=a=>a.map(({entry:e,meta:s})=>Object.keys(s).length?`${e}	${JSON.stringify(s)}`:e).join(`
`),j=a=>typeof a=="string"||typeof a=="number"||typeof a=="boolean",je=/^[A-Za-z0-9_-]{1,40}(\.[A-Za-z0-9_-]{1,40}){0,5}$/,ve=4,ia='{ "field": "mode", "equals": "advance" }';function X(a,e,s,t=!1,n=0){if(!a||typeof a!="object"||Array.isArray(a)){e.push(`${s} 必須是物件，例如 ${ia}`);return}const o=a,r=["all","any"].filter(f=>o[f]!==void 0);if(r.length){const[f]=r,g=o[f];if(r.length>1||["field","setting","equals","notEquals","in"].some(S=>o[S]!==void 0)){e.push(`${s}: all 或 any 要單獨寫，條件放在陣列裡`);return}if(n>=ve){e.push(`${s}: all／any 最多套 ${ve} 層`);return}if(!Array.isArray(g)||!g.length||g.length>12){e.push(`${s}: ${f} 必須是 1–12 條條件的陣列`);return}const E=g.map((S,T)=>X(S,e,`${s}.${f}[${T}]`,t,n+1));return E.every(Boolean)?{[f]:E}:void 0}const i=l(o.field,120),c=l(o.setting,40);if(t){if(o.setting!==void 0){e.push(`${s}: 篩選清單項目只能用 field（項目的屬性）`);return}if(!je.test(i)){e.push(`${s}: field「${i||"(空白)"}」不是有效的屬性名稱`);return}}else if(o.field!==void 0==(o.setting!==void 0)){e.push(`${s}: field（卡片欄位）與 setting（專案設定）要剛好寫一個`);return}else if(!M.test(i||c)){e.push(`${s}: ${i?"field":"setting"}「${i||c||"(空白)"}」不是有效的欄位 key`);return}const d=i?{field:i}:{setting:c},p=["equals","notEquals","in"].filter(f=>o[f]!==void 0);if(p.length!==1){e.push(`${s}: equals、notEquals、in 要剛好寫一個`);return}const[u]=p;if(u==="in"){const f=o.in;if(!Array.isArray(f)||!f.length||f.length>40||!f.every(j)){e.push(`${s}: in 必須是 1–40 個字串、數字或 true/false 的陣列`);return}return{...d,in:f.map(g=>typeof g=="string"?g.slice(0,80):g)}}const b=o[u];if(!j(b)){e.push(`${s}: ${u} 必須是字串、數字或 true/false`);return}return{...d,[u]:typeof b=="string"?b.slice(0,80):b}}function la(a,e,s){const t=X(a,e,s);return t?{showIf:t}:{}}function da(a,e,s){if(!a||typeof a!="object"||Array.isArray(a)){e.push(`${s} 必須是物件，例如 { "source": "settings", "key": "slots", "label": "name", "value": "code" }`);return}const t=a;if(!Je.includes(t.source)){e.push(`${s}: source 只能是 settings、storage 或 variable`);return}const n=l(t.key,120).trim();if(!(t.source==="settings"?M.test(n):!!n)){e.push(`${s}: key「${n||"(空白)"}」無效${t.source==="settings"?"，要是設定的 key":""}`);return}const r={};for(const c of["path","label","labelEn","value"]){if(t[c]===void 0)continue;const d=l(t[c],240);if(!je.test(d)){e.push(`${s}: ${c}「${d||"(空白)"}」要是屬性名稱，多層用 . 連接（例如 calendar.slots）`);return}r[c]=d}const i=t.where!==void 0?X(t.where,e,`${s} 的 where`,!0):void 0;if(!(t.where!==void 0&&!i))return{source:t.source,key:n,...r,...i?{where:i}:{},emptyHint:l(t.emptyHint,200)||void 0,emptyHintEn:l(t.emptyHintEn,200)||void 0}}const Ce=a=>a.all||a.any?[...a.all||[],...a.any||[]].flatMap(Ce):[a];function Ee(a,e,s){const t=new Set(a.map(o=>o.key));for(const o of a)for(const r of o.showIf?Ce(o.showIf):[])r.field!==void 0&&(r.field===o.key?e.push(`${s}: 欄位「${o.key}」的 showIf 不能指向自己`):t.has(r.field)||e.push(`${s}: 欄位「${o.key}」的 showIf 指向不存在的欄位「${r.field}」`));const n=new Set;a.forEach((o,r)=>{if(!o.row||a[r-1]?.row===o.row)return;n.has(o.row)&&e.push(`${s}: row「${o.row}」的欄位要排在一起，中間不能夾別的欄位`),n.add(o.row);let i=1;for(;a[r+i]?.row===o.row;)i+=1;i>4&&e.push(`${s}: row「${o.row}」最多放 4 個欄位`)})}const J=(a,e)=>a===e||String(a??"")===String(e),Z=(a,e)=>a.in?a.in.some(s=>J(e,s)):a.notEquals!==void 0?!J(e,a.notEquals):a.equals!==void 0?J(e,a.equals):!0,z=(a,e)=>a.all?a.all.every(s=>z(s,e)):a.any?a.any.some(s=>z(s,e)):e(a);function Za(a,e,s,t){const n=new Map,o=r=>{const i=n.get(r.key);if(i==="pending")return"hidden";if(i)return i;if(!r.showIf)return"shown";n.set(r.key,"pending");const d=z(r.showIf,p=>{const u=p.field??(t?void 0:p.setting);if(u===void 0)return Z(p,t?.[p.setting||""]);const b=e.find(f=>f.key===u);return!!(b&&o(b)==="shown")&&Z(p,s[u])})?"shown":r.showIfMode==="disable"?"disabled":"hidden";return n.set(r.key,d),d};return o(a)}function Ya(a){const e=[];for(const s of a){const t=e[e.length-1];s.field.row&&t?.[0].field.row===s.field.row?t.push(s):e.push([s])}return e}const P=(a,e)=>{let s=a;for(const t of e?e.split("."):[]){if(s===null||typeof s!="object")return;s=s[t]}return s},ca=200;function pa(a,e,s){let t;if(e.source==="settings")t=s.settings?.[e.key];else if(e.source==="storage")t=s.storage?.[e.key];else{const i=s.variables?.find(c=>c.name===e.key);i&&(i.plugin===a.id||a.permissions.includes("variables:read"))&&(t=i.defaultValue)}if(typeof t=="string"&&/^\s*[[{]/.test(t))try{t=JSON.parse(t)}catch{return[]}const n=P(t,e.path);if(!Array.isArray(n))return[];const o=[],r=new Set;for(const i of n){if(e.where&&!z(e.where,f=>Z(f,P(i,f.field))))continue;const c=j(i),d=c?i:P(i,e.value);if(!j(d))continue;const p=String(d).slice(0,200);if(!p||r.has(p))continue;const u=c?i:P(i,e.label),b=c?void 0:P(i,e.labelEn);if(r.add(p),o.push({value:p,label:(j(u)&&String(u).trim()?String(u):p).slice(0,80),...j(b)&&String(b).trim()?{labelEn:String(b).slice(0,80)}:{}}),o.length>=ca)break}return o}function Xa(a,e,s,t,n){const o=e.optionsFrom?pa(a,e.optionsFrom,s):[],r=(o.length?o:e.options||[]).map(c=>({value:c.value,label:n?c.label:c.labelEn||c.label}));if(!r.length){const c=e.optionsFrom;return{options:[],input:!0,emptyHint:(n?c?.emptyHint:c?.emptyHintEn||c?.emptyHint)||(n?"還沒有可以選的項目，可以先直接輸入。":"Nothing to choose from yet — type a value for now.")}}const i=String(t??"");return e.optionsFrom&&i&&!r.some(c=>c.value===i)&&r.push({value:i,label:n?`${i}（不在清單裡）`:`${i} (not in the list)`}),{options:r,input:!1}}function ua(a,e,s,t=C){const n=a||{},o=l(n.id,60).trim(),r=`第 ${s+1} 張卡片`;if(!V.test(o))return e.push(`${r}: id「${o||"(空白)"}」無效，請用小寫英數與連字號（3–60 字）`),null;const i=l(n.name,60).trim();if(!i)return e.push(`${r}: 缺少 name`),null;const c=typeof n.html=="string"?n.html:"";if(!c.trim())return e.push(`${r}「${i}」: 缺少 html，擴充功能卡片一定要有可執行的內容`),null;if(c.length>t)return e.push(`${r}「${i}」: html 超過 ${Math.round(t/1e3)}KB 上限`),null;const d=l(n.icon,24),p=l(n.color,7),u=[],b=new Set;for(const f of v(n.fields).slice(0,30)){const g=Ie(f,e,`${r}「${i}」`);!g||b.has(g.key)||(b.add(g.key),u.push(g))}return Ee(u,e,`${r}「${i}」`),{id:o,name:i,nameEn:l(n.nameEn,60)||void 0,description:l(n.description,400)||void 0,descriptionEn:l(n.descriptionEn,400)||void 0,icon:B(d)?d:void 0,color:/^#[0-9a-fA-F]{6}$/.test(p)?p:void 0,presentation:n.presentation==="fullscreen"?"fullscreen":"inline",...n.hidePresentation===!0||n.presentation==="none"?{hidePresentation:!0}:{},skippable:n.skippable!==!1,fields:u,readVariables:v(n.readVariables).map(f=>l(f,80).trim()).filter(Boolean),writeVariables:v(n.writeVariables).map(f=>l(f,80).trim()).filter(Boolean),html:c}}function ha(a,e,s){const t=a||{},n=l(t.id,60).trim(),o=`第 ${s+1} 個指令`;if(!V.test(n))return e.push(`${o}: id「${n||"(空白)"}」無效，請用小寫英數與連字號（3–60 字）`),null;const r=l(t.title,60).trim();if(!r)return e.push(`${o}: 缺少 title`),null;const i=Array.from(new Set(v(t.surfaces).map(u=>l(u,20)).filter(u=>Ye.includes(u)))),c=l(t.icon,24),d=l(t.shortcut,40).trim(),p=d?ta(d):{};return p.error&&e.push(`${o}「${r}」: ${p.error}`),{id:n,title:r,surfaces:i,titleEn:l(t.titleEn,60)||void 0,description:l(t.description,300)||void 0,descriptionEn:l(t.descriptionEn,300)||void 0,icon:B(c)?c:void 0,cardTypes:v(t.cardTypes).map(u=>l(u,40)).filter(Boolean).slice(0,20),confirm:l(t.confirm,200)||void 0,confirmEn:l(t.confirmEn,200)||void 0,...p.shortcut?{shortcut:p.shortcut}:{},...l(t.panel,60).trim()?{panel:l(t.panel,60).trim()}:{}}}function Ae(a,e,s,t="面板"){const n=a||{},o=l(n.id,60).trim(),r=`第 ${s+1} 個${t}`;if(!V.test(o))return e.push(`${r}: id「${o||"(空白)"}」無效`),null;const i=typeof n.html=="string"?n.html:"";if(!i.trim())return e.push(`${r}: 缺少 html`),null;if(i.length>C)return e.push(`${r}: html 超過 ${Math.round(C/1e3)}KB 上限`),null;const c=l(n.icon,24),d=Xe.includes(n.placement)?n.placement:"modal",p=Qe.includes(n.size)?n.size:void 0;return{id:o,title:l(n.title,60)||o,titleEn:l(n.titleEn,60)||void 0,icon:B(c)?c:void 0,placement:d,...p&&d==="modal"?{size:p}:{},html:i}}function fa(a,e,s,t=[]){const n=Ae(a,e,s,"常駐 UI");if(!n)return null;const o=a,r=(d,p,u,b)=>o[d]===void 0?p:typeof o[d]!="number"||!Number.isFinite(o[d])?(e.push(`常駐 UI「${n.id}」: ${d} 必須是有限數字`),p):Math.round(Math.max(u,Math.min(b,o[d]))),i=d=>{let p=Array.from(new Set(v(o[d]).map(g=>l(g,80).trim()).filter(g=>g&&!["__proto__","constructor","prototype"].includes(g))));const u=`常駐 UI「${n.id}」的 ${d}`,f=p.filter(g=>g.includes("*")).filter(g=>d==="writeVariables"||!W(g));return f.length&&(t.push(d==="writeVariables"?`${u} 不支援 * 萬用字元，已忽略：${f.join("、")}。可寫入的變數請逐一列出`:`${u} 裡的「${f.join("、")}」不是有效的前綴寫法（* 只能放在最後，前面至少一個字，例如 xn_*），已忽略`),p=p.filter(g=>!f.includes(g))),p.length>A&&t.push(`${u} 有 ${p.length} 個，超過 ${A} 個上限，後面 ${p.length-A} 個（從「${p[A]}」開始）會被忽略${d==="readVariables"?"。同一前綴的變數可以改寫成 xn_* 這種前綴寫法":""}`),p.slice(0,A)};o.anchor!==void 0&&!Ze.includes(o.anchor)&&e.push(`常駐 UI「${n.id}」: anchor 必須是四個角落之一`),o.fullscreen!==void 0&&typeof o.fullscreen!="boolean"&&e.push(`常駐 UI「${n.id}」: fullscreen 必須是 true 或 false`);const c=(d,p)=>o.fullscreen===!0||o[d]==="full"?"full":typeof o[d]=="string"?(e.push(`常駐 UI「${n.id}」: ${d} 必須是數字或 "full"`),p):r(d,p,32,640);return{id:n.id,title:n.title,titleEn:n.titleEn,html:n.html,anchor:o.anchor||"top-right",width:c("width",220),height:c("height",96),...o.fullscreen===!0?{fullscreen:!0}:{},offsetX:r("offsetX",16,0,240),offsetY:r("offsetY",80,0,240),interactive:o.interactive===!0,readVariables:i("readVariables"),writeVariables:i("writeVariables"),visibleVariable:l(o.visibleVariable,80).trim()||void 0}}const ma=/^--[a-z0-9-]{1,60}$/i,ba=/^[#a-z0-9 ,.()%+-]{1,80}$/i;function ga(a){if(!a||typeof a!="object")return;const e={};for(const[s,t]of Object.entries(a).slice(0,40)){const n=s.trim(),o=l(t,80).trim();!ma.test(n)||!ba.test(o)||/url\s*\(|expression|javascript:|@import/i.test(o)||(e[n]=o)}return Object.keys(e).length?e:void 0}function Pe(a){const e=[],s=[],t=a||{},n=l(t.id,60).trim().toLowerCase();V.test(n)||e.push(`擴充功能 id「${n||"(空白)"}」無效，請用小寫英數與連字號（3–60 字），例如 my-inventory-kit`);const o=l(t.name,80).trim();o||e.push("擴充功能缺少 name");const r=l(t.author,80).trim();r||e.push("擴充功能缺少 author");const i=l(t.version,20).trim()||"1.0.0";/^\d+(\.\d+){0,2}$/.test(i)||e.push(`版本「${i}」無效，請用 1.0.0 這種格式`);const c=v(t.cards),d=v(t.commands),p=v(t.panels),u=v(t.huds);!c.length&&!d.length&&!p.length&&!u.length&&!t.theme&&e.push("擴充功能至少要提供一樣東西：卡片（cards）、常駐 UI（huds）、指令（commands）、面板（panels）或主題（theme）"),c.length>U&&e.push(`一個擴充功能最多 ${U} 張卡片`),d.length>24&&e.push("一個擴充功能最多 24 個指令"),u.length>q&&e.push(`一個擴充功能最多 ${q} 個常駐 UI`);const b=[],f=new Set;u.slice(0,q).forEach((h,y)=>{const m=fa(h,e,y,s);if(m){if(f.has(m.id)){e.push(`常駐 UI id「${m.id}」重複`);return}f.add(m.id),b.push(m)}});const g=[],E=new Set;c.slice(0,U).forEach((h,y)=>{const m=ua(h,e,y,ee.has(n)?na:C);if(m){if(E.has(m.id)){e.push(`卡片 id「${m.id}」重複`);return}E.add(m.id),g.push(m)}});const S=[],T=new Set,ae=new Map;d.slice(0,24).forEach((h,y)=>{const m=ha(h,e,y);if(!(!m||T.has(m.id))){if(T.add(m.id),m.shortcut){const pe=ae.get(m.shortcut);pe?e.push(`指令「${m.title}」與「${pe}」用了同一組快捷鍵 ${m.shortcut}`):ae.set(m.shortcut,m.title)}S.push(m)}});const H=[],te=new Set;p.slice(0,8).forEach((h,y)=>{const m=Ae(h,e,y);!m||te.has(m.id)||(te.add(m.id),H.push(m))});const G=Array.from(new Set(v(t.hooks).map(h=>l(h,30)).filter(h=>sa.includes(h)))),O=typeof t.worker=="string"?t.worker:"";O.length>C&&e.push(`worker 超過 ${Math.round(C/1e3)}KB 上限`);for(const h of S){if(!h.panel)continue;const y=H.find(m=>m.id===h.panel);y?y.placement==="settings"&&e.push(`指令「${h.title}」不能打開 placement 為 settings 的面板「${h.panel}」，那一頁只在專案設定裡出現`):e.push(`指令「${h.title}」要打開的面板「${h.panel}」不在 panels 裡`)}(S.some(h=>!h.panel)||G.length)&&!O.trim()&&e.push("宣告了 hooks，或有指令沒有指定 panel，就必須提供 worker（執行它們的沙盒程式）");const F=[],se=new Set;for(const h of v(t.settings).slice(0,30)){const y=Ie(h,e,"擴充功能設定");!y||se.has(y.key)||(se.add(y.key),F.push(y))}Ee(F,e,"擴充功能設定");const ne=Array.from(new Set(v(t.categories).map(h=>l(h,20)).filter(h=>Me.includes(h)))),R=Array.from(new Set(v(t.permissions).map(h=>l(h,30)).filter(h=>$e.includes(h))));if(b.length&&!R.includes("player:ui")&&e.push("宣告 huds 必須提供 player:ui 權限"),b.some(h=>h.readVariables?.length||h.visibleVariable)&&!R.includes("variables:read")&&e.push("常駐 UI 讀取變數必須提供 variables:read 權限"),b.some(h=>h.writeVariables?.length)&&!R.includes("variables:write")&&e.push("常駐 UI 寫入變數必須提供 variables:write 權限"),e.length)return{errors:e,warnings:s};const oe=t.pricing==="paid"?"paid":"free",re=v(t.gallery).slice(0,12).flatMap(h=>{const y=h||{},m=l(y.url,2e3).trim();return/^(?:https:\/\/|\/(?!\/))/.test(m)?[{url:m,caption:l(y.caption,140).trim()||void 0,captionEn:l(y.captionEn,140).trim()||void 0}]:[]}),ie=h=>v(h).slice(0,12).map(y=>l(y,160).trim()).filter(Boolean),le=ie(t.features),de=ie(t.featuresEn),ce=l(t.icon,24);return{errors:[],warnings:s,plugin:{id:n,name:o,version:i,author:r,nameEn:l(t.nameEn,80)||void 0,description:l(t.description,800),descriptionEn:l(t.descriptionEn,800)||void 0,authorAvatar:l(t.authorAvatar,500)||void 0,homepage:/^https?:\/\//.test(l(t.homepage,500))?l(t.homepage,500):void 0,icon:B(ce)?ce:void 0,cover:l(t.cover,2e3)||void 0,gallery:re.length?re:void 0,overview:l(t.overview,4e3).trim()||void 0,overviewEn:l(t.overviewEn,4e3).trim()||void 0,features:le.length?le:void 0,featuresEn:de.length?de:void 0,categories:ne.length?ne:["card"],permissions:R,cards:g,huds:b.length?b:void 0,commands:S.length?S:void 0,panels:H.length?H:void 0,hooks:G.length?G:void 0,worker:O.trim()?O:void 0,settings:F.length?F:void 0,theme:ga(t.theme),pricing:oe,price:oe==="paid"?Math.max(1,Number(t.price)||1):void 0,license:l(t.license,120)||void 0,official:t.official===!0,builtIn:t.builtIn===!0,ownerId:l(t.ownerId,80)||void 0,installs:typeof t.installs=="number"?t.installs:void 0,createdAt:l(t.createdAt,40)||void 0,updatedAt:l(t.updatedAt,40)||void 0}}}function Qa(a){const e=a.trim();if(!e)return{errors:["請先貼上擴充功能 manifest（JSON）"]};let s;try{s=JSON.parse(e)}catch(t){return{errors:[`JSON 格式錯誤：${t instanceof Error?t.message:"無法解析"}`]}}return Pe(s)}function et(a,e,s){if(!e||!s)return;const t=a.find(o=>o.id===e),n=t?.cards.find(o=>o.id===s);return t&&n?{plugin:t,card:n}:void 0}function Q(a){const e={};for(const s of a.fields||[])s.defaultValue!==void 0?e[s.key]=s.defaultValue:s.kind==="toggle"?e[s.key]=!1:s.kind==="number"?e[s.key]=s.min??0:s.kind==="select"?e[s.key]=s.options?.[0]?.value||"":e[s.key]="";return e}function at(a,e,s){const t={...Q(e),...s?.pluginValues||{}},n=(e.fields||[]).filter(i=>i.kind==="variable").map(i=>t[i.key]).filter(i=>typeof i=="string"&&!!i),o=[...new Set([...n,...e.readVariables||[]])],r=[...new Set([...n,...e.writeVariables||[]])];return{type:"plugin",title:e.name,text:e.description||a.description,pluginId:a.id,pluginCardId:e.id,pluginVersion:a.version,pluginName:a.name,pluginCardName:e.name,pluginIcon:e.icon||a.icon,pluginColor:e.color,pluginHtml:ee.has(a.id)?void 0:e.html,pluginValues:t,pluginPresentation:e.presentation||"inline",pluginFrame:s?.pluginFrame?{...s.pluginFrame}:void 0,pluginSkippable:e.skippable!==!1,pluginReadVars:a.permissions.includes("variables:read")?o:[],pluginWriteVars:a.permissions.includes("variables:write")?r:[],pluginAssets:[...s?.pluginAssets||[]],platforms:["web"]}}const tt=a=>Q({fields:a.settings||[]});function st(a,e){return{...e?Q(e):{},...a.pluginValues||{}}}const ee=new Set(["larch-rpg-system","larch-card-roguelike","larch-3d","larch-live-quiz","larch-live"]);function nt(a,e,s){return a.pluginVersion!==s.version||!ee.has(s.id)&&a.pluginHtml!==e.html}const ot=a=>a.pluginAssets||[];function rt(a,e){const s=a.pluginReadVars||[];return s.length?Object.fromEntries(Object.entries(e).filter(([t])=>s.includes(t))):{}}function it(a,e){const s=a.readVariables||[],t=s.filter(W).map(r=>r.slice(0,-1)),n={};for(const r of s)!W(r)&&Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);let o=0;for(const r of Object.keys(e).sort()){if(o>=oa)break;t.some(i=>r.startsWith(i))&&(o++,n[r]=e[r])}return n}const lt=(a,e)=>(a.pluginWriteVars||[]).includes(e);function dt(a,e){const s=a.cards.length,t=a.huds?.length||0,n=a.categories.map(r=>e?I[r].zh:I[r].en),o=t?e?` · ${t} 個常駐 UI`:` · ${t} HUD${t>1?"s":""}`:"";return e?`${s} 張卡片${o} · ${n.join("、")}`:`${s} card${s>1?"s":""}${o} · ${n.join(", ")}`}function ct(a){if(!a.huds?.length)return;const{plugin:e}=Pe(a);if(e?.huds?.length)return{version:e.version,permissions:[...e.permissions],huds:e.huds,defaults:Object.fromEntries((e.settings||[]).filter(s=>s.defaultValue!==void 0).map(s=>[s.key,s.defaultValue]))}}const we=`{
  "id": "tiny-inventory",
  "name": "迷你背包",
  "version": "1.0.0",
  "author": "你的名字",
  "description": "玩家可以打開背包看道具，選一件帶走。",
  "categories": ["system", "ui"],
  "permissions": ["variables:read", "variables:write", "assets:read", "flow:control"],
  "icon": "backpack",
  "cards": [
    {
      "id": "open-bag",
      "name": "打開背包",
      "description": "列出道具，玩家挑一件之後繼續故事。",
      "icon": "backpack",
      "color": "#7a5c3a",
      "presentation": "inline",
      "fields": [
        { "key": "items", "kind": "longText", "label": "道具清單", "hint": "一行一件", "defaultValue": "繩索\\n火把\\n乾糧" },
        { "key": "pickVar", "kind": "variable", "label": "把選到的道具寫進哪個變數" },
        { "key": "allowSkip", "kind": "toggle", "label": "可以什麼都不拿", "defaultValue": true }
      ],
      "html": "<!doctype html>…"
    }
  ]
}`,ke=`<!doctype html>
<html><head><meta charset="utf-8"><style>/* 全部 inline */</style></head>
<body>
<script>
  let values = {}, vars = {}, assets = [], characters = [];

  // 1) 告訴故事「我準備好了」
  parent.postMessage({ type: 'larch:ready' }, '*');

  // 2) 收下作者填的欄位、授權的變數與素材
  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || data.type !== 'larch:init') return;
    values = data.values || {};          // Inspector 上那些欄位的值，鍵就是 field.key
    vars = data.variables || {};         // 只有作者勾選為「可讀」的變數
    assets = data.assets || [];          // [{ id, name, url, kind }]
    characters = data.characters || [];  // [{ id, name, portraitUrl }]
    start();
  });

  // 3) 中途寫回變數（只有作者勾選為「可寫」的名字會被接受）
  function setVar(name, value) {
    parent.postMessage({ type: 'larch:set', name, value }, '*');
  }

  // 4) 演完了 —— 一定要呼叫，否則玩家會卡在這張卡片上
  function finish(result) {
    parent.postMessage({ type: 'larch:complete', result }, '*');
  }
<\/script>
</body></html>`;function pt(a={}){const e=a.zh!==!1,s=a.brief?.trim(),t=Me.map(r=>`- \`${r}\` — ${e?I[r].zh:I[r].en}：${e?I[r].hintZh:I[r].hintEn}`).join(`
`),n=$e.map(r=>`- \`${r}\` — ${e?ge[r].zh:ge[r].en}`).join(`
`),o=_e.map(r=>`\`${r}\``).join("、");return e?`# Larch 擴充功能開發

你要寫一份 **Larch 擴充功能 manifest（一份 JSON；檔案多的話可以分檔寫成資料夾，見文末「交付方式」）**。安裝之後，它會在 Larch 的故事白板上多出幾張新的卡片型別 —— 背包系統、RPG 格子地圖、Live2D 立繪、物理演出、3D 模組，這些都做得出來。

## 這次要做什麼
${s||"（作者還沒描述，請先問他想要什麼樣的擴充功能與卡片。）"}

## 一個擴充功能長什麼樣
一份 JSON。它可以加卡片（最多 ${U} 張）、提供遊戲常駐 UI（huds）、或改編輯器（指令、面板、掛鉤、主題），也可以混合提供 —— 但至少要做其中一件。每張卡片＝白板上的一種新卡片型別，包含兩件事：
1. \`fields\`：作者在 Inspector 上要填的欄位（宣告式 schema，Larch 自己長出表單）。
2. \`html\`：這張卡在遊戲裡實際跑的東西 —— 一份**單檔 HTML**。

\`\`\`json
${we}
\`\`\`

## html 的硬性規格
1. **一份完整的 HTML**：\`<!doctype html>\` 開頭，CSS 與 JS 全部 inline。**不要引用任何外部網址**的 script、樣式、字型或圖片 —— 它跑在 \`sandbox="allow-scripts"\` 的 iframe 裡，沒有 same-origin、不該依賴網路。卡片與常駐 UI 在遊戲裡**沒有可以保存的 localStorage**（要留下的請寫進變數）；面板與 worker 的 localStorage 會存進專案，見下方「面板與 worker 怎麼存資料」。要用圖就用作者透過 \`assets\` 傳進來的網址。
2. 版面由 \`presentation\` 決定：\`inline\` 是對話框裡的一塊區域（約 16:9，寬度隨視窗變），\`fullscreen\` 是整個瀏覽器視窗。一律用 \`100%\` / \`vw\` / \`vh\`，不要寫死像素。
3. 手機也要能用：滑鼠與觸控事件都要接。
4. 不要假設玩家會重新整理，也不要假設狀態會保留到下一張卡片 —— 要留下的東西請寫進變數。
5. 深色與淺色都要看得清楚；背景請自己畫，不要預期外面有底色。
6. **字型預設跟著專案**：沒寫 \`font-family\` 的字（含按鈕與輸入欄位）會用作者在專案設定「對話介面」選的字型，預覽與匯出版都一樣；要用自己的字型就照常寫 \`font-family\`，一定蓋得過。要讀專案字型（例如畫 canvas 文字）：卡片的 \`larch:init\` 帶 \`font\`，卡片與面板也都能呼叫 \`window.larch.getProjectFont()\`，兩者都是 \`{ family, name, kind, stylesheet?, url?, format? }\` —— \`family\` 是可以直接放進 \`font-family\` 的整串字型清單（\`ctx.font = '20px ' + font.family\`），\`kind\` 是 \`sans\`／\`serif\`／\`rounded\`／\`iansui\`／\`custom\`，上傳的字型才有 \`url\`。

${be(!0)}
## 跟故事溝通（唯一管道）
\`\`\`html
${ke}
\`\`\`

**流程卡片一定要送出 \`larch:complete\`**，否則玩家會永遠停在這張卡片上。

## 欄位型別（fields[].kind）
- \`text\` / \`longText\` — 單行、多行文字
- \`number\` — 數字，可加 \`min\` / \`max\` / \`step\`
- \`toggle\` — 開關（值是 true/false）
- \`select\` — 下拉選單，給 \`options: [{ value, label }]\`，或用 \`optionsFrom\` 從自己的資料讀（見下）
- \`color\` — 色碼
- \`asset\` — 讓作者從專案素材庫挑一個（有縮圖、可搜尋，不必手打素材名稱），值預設是素材網址。用 \`assetKind\` 限定種類：\`image\`、\`audio\`、\`video\`（看檔案型別）、\`background\`（背景場景）、\`character\`（角色立繪）、\`expression\`（角色的表情差分）、\`bgm\`（背景音樂）、\`sfx\`（音效，含 Larch 內建音效）、\`ui\`（介面素材），不寫就是全部。原本用 \`text\` 欄位讓作者打素材名稱的話，改成 \`asset\` 並加 \`assetValue: "name"\`，值仍然是素材名稱、舊卡片打好的名字照樣認得（\`"id"\` 則存素材 id）；用名稱或 id 時，挑到的素材也會放進卡片的 \`assets\`，請從那裡找網址。卡片欄位與擴充功能設定（\`settings\`）都能用。
- \`assets\` — 跟 \`asset\` 一樣從素材庫挑，但可以挑好幾個、調整先後順序（例如長條漫一格一格往下排的圖）。\`assetKind\`、\`assetValue\` 的用法相同。值是純文字，一行一個（用換行分開），照作者排好的順序：\`values.images.split(/\\r?\\n/).filter(Boolean)\`。原本用 \`longText\` 讓作者一行貼一個網址的，直接把 kind 改成 \`assets\`，舊卡片貼好的網址照樣認得。用名稱或 id 時，挑到的每個素材也會放進卡片的 \`assets\`。
  - 每個素材要再配幾個數字（例如每首 BGM 從第幾張開始、第幾張淡出、音量），加 \`itemControls\`：最多 4 個 \`{ "key": "volume", "label": "音量", "kind": "number", "min": 0, "max": 100, "defaultValue": 80 }\`，每個挑好的素材底下就有這幾格。填過的那一行會變成「素材＋Tab＋JSON」，例如 \`https://…/a.mp3\\t{"startAt":1,"volume":80}\`；沒填的只有素材。讀的時候先用 Tab 切開：\`const [url, meta] = line.split('\\t'); const opts = meta ? JSON.parse(meta) : {};\`。
- \`character\` — 讓作者挑一個角色，值是角色 id
- \`variable\` — 讓作者挑一個故事變數，值是變數名稱
- \`storyCard\` — 讓作者挑一張卡片當跳轉目標，值是卡片 id。除了可搜尋的下拉，也能按「從白板點選卡片」直接點白板上的卡片。

每個欄位都可以有 \`label\`、\`labelEn\`、\`hint\`、\`placeholder\`、\`defaultValue\`。key 只能用英數與底線。

### 依條件顯示或變灰（showIf、showIfMode）
欄位加上 \`showIf\`，就只在條件成立時才出現在卡片編輯器（或擴充功能設定頁）；作者一改相關的值，畫面馬上跟著變。一條條件是「看誰」加「怎麼比」：
- 看誰（擇一）：\`field\` 是同一張卡片（或同一份 \`settings\`）裡另一個欄位的 key；\`setting\` 是這個擴充功能的**專案設定**（\`settings\` 宣告的欄位，或面板用 \`larch.setSettings\` 存的值），適合「整個專案用時段制還是時數制」這種全專案的模式。
- 怎麼比（三選一）：\`equals\`（等於這個值）、\`in\`（是陣列裡任一個值）、\`notEquals\`（不等於這個值）。
- 好幾條一起看：\`{ "all": [條件, …] }\` 全部成立、\`{ "any": [條件, …] }\` 任一成立，可以再套（最多 4 層）。

條件不成立時預設藏起來；加 \`"showIfMode": "disable"\` 則留在原地、整塊（標籤、輸入框、說明）變灰不能改，適合「這個專案用不到，但讓作者知道有這一欄」。控制它的欄位本身藏起來或變灰時，它的條件也算不成立。藏起來或變灰的欄位**不會刪掉已經存的值**，沙盒照樣收到全部的 \`values\`，所以 html 要自己只看目前模式用得到的欄位。指向不存在的欄位、指向自己或條件寫錯，送審時會被擋下。

### 下拉選項從自己的資料來（optionsFrom）
\`select\` 可以不寫死 \`options\`，改用 \`optionsFrom\` 讀這個擴充功能**自己的**資料，例如作者在「時序管理」裡新增的時段：
- \`source\`：\`settings\`（這個擴充功能的專案設定）、\`storage\`（它的面板／worker 存的資料）、\`variable\`（專案變數，要宣告 \`variables:read\`，或是它自己用 \`ensureVariables\` 建的變數）。讀不到別的擴充功能的資料。
- \`key\`：那一筆設定、資料或變數的名字。值是 JSON 文字（例如 \`larch.setSettings({ timeSlots: JSON.stringify(list) })\`）會先解開。
- \`path\`：解開後到陣列的路徑，多層用 \`.\`（例如 \`calendar.slots\`）；值本身就是陣列就不用寫。
- \`where\`：只留符合的項目，寫法跟 showIf 一樣，但 \`field\` 指的是項目的屬性（例如 \`{ "field": "enabled", "notEquals": false }\`）。
- \`label\`／\`labelEn\`：哪個屬性當顯示文字；\`value\`：哪個屬性當存進去的值（存成文字）。陣列裡是單純的文字或數字時都不用寫。
- \`emptyHint\`／\`emptyHintEn\`：一個選項都沒有時欄位下面的提示。

讀不到、不是陣列或是空的時候，改用 \`options\`；連 \`options\` 都沒有就變成文字框，下面顯示 \`emptyHint\`。已經存的值不在清單裡（例如時段被刪了）會照樣留著，選單裡標「不在清單裡」，不會被清掉。

### 同一列（row、width）
相鄰、而且 \`row\` 一樣的欄位排在同一列（一列最多 4 個，要排在一起），寬度照 \`width\` 的比例分（預設 1，也就是等寬；\`"width": 2\` 是別人的兩倍）。輸入框上緣對齊，每一欄的說明在自己的輸入框下面、再長也不會推擠旁邊；下一列從最左邊開始。畫面太窄時自動疊成一欄。

例：「時間操作」卡片。專案設定裡有 \`timeMode\`（時段制 \`slot\`／時數制 \`hour\`）與時段清單 \`timeSlots\`；選「推進」要填數量，選「跳到下一個」或「設定日期時間」要填目標，目標年月日排一列，目標是時段還是小時看專案模式：
\`\`\`json
"settings": [
  { "key": "timeMode", "kind": "select", "label": "時間模式", "options": [{ "value": "slot", "label": "時段制" }, { "value": "hour", "label": "時數制" }] }
],
"cards": [{ "id": "time-op", "name": "時間操作", "html": "…", "fields": [
  { "key": "opType", "kind": "select", "label": "操作", "options": [
    { "value": "advance", "label": "推進" }, { "value": "next", "label": "跳到下一個" }, { "value": "set", "label": "設定日期時間" }
  ] },
  { "key": "amount", "kind": "number", "label": "數量", "min": 1, "defaultValue": 1, "showIf": { "field": "opType", "equals": "advance" } },
  { "key": "year", "kind": "number", "label": "目標年", "hint": "一般或自訂曆法使用；累計日數模式忽略此欄。", "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "month", "kind": "number", "label": "目標月", "min": 1, "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "day", "kind": "number", "label": "目標日", "min": 1, "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "targetSlot", "kind": "select", "label": "目標時段",
    "optionsFrom": { "source": "settings", "key": "timeSlots", "path": "slots", "label": "name", "value": "code", "emptyHint": "先到時序管理新增時段" },
    "showIf": { "all": [{ "setting": "timeMode", "equals": "slot" }, { "field": "opType", "in": ["next", "set"] }] } },
  { "key": "targetHour", "kind": "number", "label": "目標小時", "min": 0, "max": 23, "hint": "0～23",
    "showIf": { "all": [{ "setting": "timeMode", "equals": "hour" }, { "field": "opType", "in": ["next", "set"] }] } }
] }]
\`\`\`
\`timeSlots\` 存的是 \`{"slots":[{"name":"上午","code":"am"},…]}\` 這樣的 JSON 文字：下拉顯示「上午」，卡片存 \`am\`。想讓另一種模式的欄位留著變灰，在那兩欄加 \`"showIfMode": "disable"\`。

### 沒有演出的卡片
只算數值、寫變數就結束的邏輯卡，在卡片上加 \`"hidePresentation": true\`（或寫 \`"presentation": "none"\`），卡片編輯器就不會出現「演出方式」那一段。遊戲裡照 \`presentation\`（預設 \`inline\`）執行，所以 html 載入後直接處理完、送出 \`larch:complete\` 即可。

## 分類（categories）
${t}

## 權限（permissions）
${n}

只宣告真的會用到的權限。安裝的人看得到這份清單，多要權限只會降低安裝意願。

## 卡片圖示（icon）
只能從這些名字挑：${o}

${he(!0)}
## 除了卡片，擴充功能還能改編輯器

卡片是擴充功能的一半。另一半是**擴充編輯器本身** —— 這才是「像 Unity Asset Store 一樣」的部分：

\`\`\`json
{
  "commands": [
    { "id": "open-board", "title": "開啟任務看板", "icon": "layers", "surfaces": ["navbar", "toolbar"],
      "shortcut": "Alt+Shift+K", "panel": "task-board" },
    { "id": "tidy-layout", "title": "整理白板版面", "icon": "grid", "surfaces": ["canvasMenu", "bottomRight"],
      "confirm": "這會移動所有卡片，確定嗎？" },
    { "id": "tidy-lines", "title": "整理台詞排版", "surfaces": ["cardMenu", "inspector"], "cardTypes": ["dialogue"] }
  ],
  "hooks": ["project:save"],
  "panels": [
    { "id": "task-board", "title": "任務看板", "size": "large", "html": "<!doctype html>…" },
    { "id": "preferences", "title": "看板偏好", "placement": "settings", "html": "<!doctype html>…" }
  ],
  "settings": [{ "key": "columns", "kind": "number", "label": "每列幾張卡片", "defaultValue": 4 }],
  "theme": { "--larch-ink": "#161a22" },
  "worker": "<!doctype html>…"
}
\`\`\`

- \`commands\` — 加進 Larch 自己的介面。\`surfaces\` 可選：
  - \`toolbar\` 白板工具列、\`navbar\` 左上角專案列、\`topRight\` 右上角播放旁、\`bottomLeft\` 左下角說明旁、\`bottomRight\` 右下角檢視工具 —— 這五個是圖示按鈕，滑過會顯示 title，請一定挑一個 \`icon\`。每一列最多顯示 ${ye} 顆擴充功能按鈕。
  - \`cardMenu\` 卡片右鍵、\`canvasMenu\` 白板右鍵、\`inspector\` 卡片編輯器 —— 文字項目。\`cardTypes\` 限定只在某種卡片上出現。
  - \`shortcut\` 鍵盤快捷鍵，例如 \`Alt+Shift+K\` 或 \`Mod+Shift+L\`（Mod 在 Mac 是 ⌘、其他系統是 Ctrl）。一定要有 Mod 或 Alt；按鍵只能是 A–Z、0–9、F1–F12。⌘Z、⌘C、⌘V、⌘S、⌘F、⌘1–9、⌘⇧K 這類 Larch 或瀏覽器已經在用的組合會被擋下來；最不容易撞到的是 \`Alt+Shift+字母\`。作者在輸入框打字時快捷鍵不會觸發。
  - \`panel\` 按下去直接打開這個面板，不需要 worker。沒有 \`panel\` 的指令會送進 worker 執行。
- \`hooks\` — 生命週期：\`project:open\`、\`project:save\`（需要 \`save:hook\` 權限）、\`card:change\`。存檔檢查、自動整理這類系統靠它。
- \`panels\` — 擴充功能自己的一整塊 UI，一樣是單檔 HTML。\`placement\`：\`modal\`（置中視窗，預設）、\`side\`（右側抽屜）、\`settings\`（嵌在「專案設定 → 這個擴充功能」那一頁，適合放進階設定）。置中視窗可以用 \`size\`：\`medium\`（預設）、\`large\`、\`full\`。
- \`settings\` — 擴充功能層級的設定欄位。導入專案後，專案設定的左欄會多一頁「這個擴充功能」，作者在那裡填；值會隨每次呼叫送進 worker 與面板，也會送進遊戲裡的常駐 UI。
- \`theme\` — 只吃 CSS 變數，值只能是單純字面值（不接受 \`url()\` 之類的東西）。
- \`worker\` — 執行指令與 hooks 的地方。**宣告了 hooks，或有指令沒有指定 \`panel\`，就一定要有 worker**，否則上架會被擋下來。

### 面板與 worker 怎麼存資料（重要）

面板與 worker 一樣跑在 \`sandbox="allow-scripts"\` 的 iframe 裡，但 Larch 會先替它們裝好一層橋接：

- **\`localStorage\` 可以直接用**：讀寫都會存進「這個專案」，換電腦、重新整理、關掉面板再打開都還在，也跟著專案的雲端存檔、版本紀錄與協作走。每個擴充功能各自一份，上限約 512 KB（字串鍵值，跟瀏覽器的 localStorage 一樣只能存字串，物件請 \`JSON.stringify\`）。\`sessionStorage\` 只活在這次打開。不要用 IndexedDB、cookie 或下載檔案來存。
- 也可以用 \`window.larch.storage\`：\`get(key)\`、\`set(key, text)\`、\`remove(key)\`、\`keys()\`、\`getJSON(key, 預設值)\`、\`setJSON(key, 值)\`。同一個擴充功能的面板與 worker 共用這份資料；別的地方改了，會收到瀏覽器標準的 \`storage\` 事件，或用 \`larch.on('storage', fn)\`。
- 這份資料是**編輯器端的工作資料**：發布作品、分享連結與匯出的遊戲都不會帶出去，所以適合放任務清單、筆記、草稿。遊戲裡也要用到的值請放 \`settings\`；玩家在遊戲中的狀態請寫進故事變數。
- 面板關掉只是隱藏，裡面的程式繼續跑（計時器、未送出的輸入都還在）；換專案或重新整理才會重新載入。**計時請記下開始的時間戳（\`Date.now()\`）再相減**，不要用 \`setInterval\` 每秒加一：瀏覽器在背景會放慢計時器，秒數就會少算。需要跨重新整理的計時，就把開始時間存進 storage。
- 面板載入後送 \`parent.postMessage({ type: 'larch:ready' }, '*')\`，會收到 \`larch:init\`：\`{ plugin, panel, settings, storage, variables, project, locale, theme, font }\`（\`variables\` 是專案變數的預設值，需要 \`variables:read\`；\`font\` 是專案字型）。設定、主題或語言改變時會再收到 \`larch:update\`。\`window.larch.settings\`、\`larch.theme\`、\`larch.locale\`、\`larch.project\`、\`larch.getProjectFont()\` 也一直是最新的。
- 深色模式：橋接層會在面板的 \`<html>\` 加上 \`data-larch-theme="light"\` 或 \`"dark"\`，CSS 用 \`:root[data-larch-theme="dark"] body { … }\` 就能跟著編輯器換色。**背景一定要自己畫**：沒有背景的面板在深色模式下會是白底。
- 面板可以呼叫 \`larch.close()\` 關掉自己、\`larch.toast('完成了')\` 顯示提示、\`larch.setSettings({ columns: 3 })\` 改自己的設定、\`larch.run([...effect])\` 送出跟 worker 一樣的 effect（一樣逐筆檢查權限）。面板送 \`larch:set\` 不會改故事變數 —— 那是遊戲中卡片用的訊息。
- **讓作者從素材庫挑一個**：\`larch.openAssetPicker({ kind: 'background', title: '選擇戰鬥背景' })\` 會打開 Larch 自己的素材挑選視窗（縮圖、搜尋、分類分頁，音樂可以試聽，跟卡片欄位同一個）。回傳 Promise：作者挑了就是 \`{ id, url, name, kind }\`（\`kind\` 是 \`image\`／\`audio\`／\`video\`），按取消或關掉是 \`null\`。\`kind\` 跟 \`asset\` 欄位的 \`assetKind\` 一樣（\`any\`、\`image\`、\`audio\`、\`video\`、\`background\`、\`character\`、\`expression\`、\`bgm\`、\`sfx\`、\`ui\`，不寫就是全部）；\`title\` 可選，純文字最多 60 字。一次只挑一個；要讓作者挑好幾個，用 \`assets\` 欄位。
  - 需要 \`assets:read\` 權限；只能在面板（打開中的那一個）與 \`placement: "settings"\` 的設定頁呼叫，worker 不行。
  - 必須在按鈕的 click 或按鍵處理器裡直接呼叫（瀏覽器的使用者操作），不能在載入時或計時器裡自己跳出來；同一時間只能開一個。
  - 清單只有目前這個專案的素材（加上 Larch 內建音效），擴充功能只會拿到作者點的那一個，看不到整個素材庫，也不能讀任意檔案。
  - 被擋下時 Promise 會 reject，\`error.message\` 說明原因（少了權限、不是使用者操作、已經開著一個…）。拿到的 \`url\` 要長久保存就存進 \`settings\`（\`larch.setSettings\`）或 storage。

\`\`\`html
<button id="pick">選背景</button>
<script>
  document.getElementById('pick').onclick = async function () {
    try {
      var asset = await larch.openAssetPicker({ kind: 'background' });
      if (asset) larch.setSettings({ battleBackground: asset.url });
    } catch (error) { larch.toast(error.message); }
  };
<\/script>
\`\`\`

### worker 長這樣

\`\`\`html
<!doctype html><html><body><script>
  function handle(context){
    // context: { command?, hook?, settings, storage, project, cards, edges, selection, variables, locale, theme }
    // 回傳一串 effect；Larch 會逐筆檢查權限之後才真的執行
    return [
      { kind: 'updateCards', cards: [{ id: context.selection[0], patch: { text: '改好的台詞' } }] },
      { kind: 'toast', message: '完成了' }
    ];
  }
  parent.postMessage({ type: 'larch:ready' }, '*');
  window.addEventListener('message', function(event){
    var data = event.data;
    if (!data || data.type !== 'larch:invoke') return;
    parent.postMessage({ type: 'larch:result', requestId: data.requestId, effects: handle(data.context || {}) }, '*');
  });
<\/script></body></html>
\`\`\`

可以用的 effect：\`toast\`、\`addCards\`、\`updateCards\`、\`deleteCards\`、\`moveCards\`、\`setVariables\`、\`ensureVariables\`、\`setSettings\`、\`setStorage\`（\`{ kind: 'setStorage', values: { key: '文字' 或 null } }\`，null 是刪除）、\`openPanel\`、\`closePanel\`、\`theme\`。

\`setVariables\` 只改「已經存在」的變數預設值。插件需要自己的變數時（例如一鍵設定），用 \`ensureVariables\` 建立：\`{ kind: 'ensureVariables', variables: [{ name: 'gold', type: 'number', defaultValue: 0, label: '金幣' }] }\`。它只補上專案裡還沒有的變數，同名的變數整筆略過、保留作者原本的值，所以重複執行也安全；需要 \`variables:write\` 權限。\`scope\` 預設 \`project\`，填 \`board\` 則只建在目前的白板。擴充功能內部用的變數加上 \`hidden: true\`：遊戲裡照常讀寫、條件也照常判斷，但不會出現在作者的變數清單、條件與變數下拉裡，作者不會誤改或誤刪。之後對同一個自己建的變數再送一次 \`hidden: true\` 或 \`false\`，可以把它藏起來或重新露出（作者自己建的同名變數不受影響）。

**每一筆都會對照 \`permissions\` 檢查**：想改卡片就要宣告 \`cards:write\`，想掛存檔要 \`save:hook\`，想打開面板、加選單項目要 \`ui:contribute\`，想換配色要 \`theme:write\`。沒宣告的動作會被丟掉，而且作者會看到「這個擴充功能沒有宣告某某權限」的提示 —— 不是靜靜失敗。存自己的資料（storage、settings）不需要額外權限。

## 商店頁要寫的東西
- \`overview\`：商店「介紹」分頁的完整說明，空一行分段；\`features\`：重點特色，一行一項（最多 12 項）。英文版放 \`overviewEn\`、\`featuresEn\`。
- \`cover\`：市集縮圖（建議 3:2 橫式）。**送審一定要有**，個人使用版不需要。
- \`gallery\`：商店截圖或短片，最多 12 張：\`[{ "url": "https://…", "caption": "說明" }]\`。能開瀏覽器（例如 Playwright）的話，把面板、卡片實際跑起來截圖放進來，比文字更能讓人想安裝。

## 交付方式（三選一，越前面越好）
1. **直接存進作者的帳號**（能連上 Larch 的 Agent，例如有 MCP 或 Agent Key）：先讀 \`larch_plugin_spec\`，寫好之後用 \`larch_save_plugin_draft\` 存成**個人使用版**（REST：\`PUT /api/agent/plugins/<id>/draft\`，body 就是 manifest，可加 \`releaseNote\`）。圖片用 \`larch_upload_plugin_image\`（REST：\`POST /api/agent/plugins/images\`，\`{ pluginId, name, mimeType, base64 }\`）上傳，拿到的網址填進 \`cover\` 與 \`gallery\`。**不要送審**，作者會在發布頁試跑、確認之後自己送。改版時先 \`larch_get_plugin\` 讀回完整內容、提高 \`version\`，再整份存回去。
2. **一個資料夾，壓成 Zip**（系統比較複雜、檔案很多時）：作者在發布頁拖進 Zip 或直接選資料夾，Larch 會自動組成一份 manifest：
\`\`\`
my-plugin/
  larch-plugin.json     manifest；html 可以寫檔名，例如 "html": "panels/board.html"
  cards/<卡片 id>.html   沒寫 html 的卡片會照這個位置找
  panels/<面板 id>.html
  huds/<常駐 UI id>.html
  worker.html            或 worker.js（只寫 JS 也可以）
  cover.png              市集縮圖
  screenshots/01.png     商店截圖，照檔名排序；說明寫在 gallery：{ "url": "screenshots/01.png", "caption": "…" }
\`\`\`
   HTML 裡的 \`<script src="x.js">\`、\`<link rel="stylesheet" href="x.css">\`、圖片、字型與 CSS \`url()\` 只要指向資料夾裡的檔案都會自動內嵌（單一圖片最多 300 KB；大的素材請用卡片欄位從專案素材傳進來）。JS 之間**不要用 import**，用多個 \`<script src>\` 依序載入。
3. **單一 JSON**（小的擴充功能）：把完整的 manifest 放在一個 \`json\` 程式碼區塊裡回覆，作者整份貼進發布頁。不要用 \`...\` 省略 html 的內容 —— 省略的部分安裝之後就是壞掉的卡片。

發布頁在「素材商城 → 擴充功能 → 發布擴充功能」（白板的「新增卡片 → 擴充功能 → 建立自己的擴充功能」也是同一個視窗）。更新既有擴充功能時不寫 \`cover\` 會沿用目前那張。`:`# Larch plugin development

Write a **Larch plugin manifest (one JSON document; bigger plugins may be written as a folder of files — see “How to deliver” at the end)**. Once installed it adds new card types to the Larch story board — inventory systems, RPG grid maps, Live2D portraits, physics toys and 3D modules are all in scope.

## What to build
${s||"(The author has not described it yet — ask what kind of plugin and cards they want.)"}

## What a plugin is
One JSON document. It can add cards (up to ${U}), provide persistent game UI (huds), extend the editor (commands, panels, hooks, themes), or combine them — but it must do at least one of them. Each card is a new card type on the board and declares two things:
1. \`fields\` — what the author fills in on the Inspector (a declarative schema; Larch renders the form).
2. \`html\` — what actually runs during play: **one self-contained HTML file**.

\`\`\`json
${we}
\`\`\`

## Hard requirements for html
1. **One complete HTML document** starting with \`<!doctype html>\`, all CSS and JS inline. **No external URLs** for scripts, styles, fonts or images — it runs in a \`sandbox="allow-scripts"\` iframe with no same-origin access and no network to rely on. Cards and persistent game UI have **no localStorage that survives** during play (persist into variables); panels and workers get a localStorage saved into the project — see “How panels and workers keep data” below. Use the URLs the author passes in through \`assets\`.
2. The viewport depends on \`presentation\`: \`inline\` is a panel inside the dialogue box (roughly 16:9, width follows the window), \`fullscreen\` is the whole browser window. Use relative units, never hard-coded pixels.
3. It must work with touch as well as mouse.
4. Never assume a reload, and never assume state survives to the next card — persist anything that matters into variables.
5. Draw your own background and stay legible in both light and dark surroundings.
6. **Text uses the project's font by default**: anything without its own \`font-family\` (buttons and inputs included) uses the font the author picked in Project settings → Dialogue UI, in preview and in exported builds. Write your own \`font-family\` as usual and it always wins. To read the project font (for canvas text, say): a card's \`larch:init\` carries \`font\`, and cards and panels can call \`window.larch.getProjectFont()\`. Both are \`{ family, name, kind, stylesheet?, url?, format? }\` — \`family\` is a complete font-family list (\`ctx.font = '20px ' + font.family\`), \`kind\` is \`sans\` / \`serif\` / \`rounded\` / \`iansui\` / \`custom\`, and only an uploaded font has a \`url\`.

${be(!1)}
## Talking to the story (the only channel)
\`\`\`html
${ke}
\`\`\`

**Flow cards must send \`larch:complete\`**, otherwise the player is stuck on this card forever.

## Field kinds (fields[].kind)
- \`text\` / \`longText\` — single-line and multi-line text
- \`number\` — numeric, with optional \`min\` / \`max\` / \`step\`
- \`toggle\` — boolean switch
- \`select\` — dropdown; give \`options: [{ value, label }]\`, or read them from your own data with \`optionsFrom\` (below)
- \`color\` — colour value
- \`asset\` — the author picks from the project's asset library (thumbnails and search, no typing asset names); the value is the asset's URL by default. Narrow it with \`assetKind\`: \`image\`, \`audio\`, \`video\` (by file type), \`background\` (backdrops), \`character\` (character portraits), \`expression\` (characters' expression sprites), \`bgm\` (music), \`sfx\` (sound effects, including Larch's built-in ones) or \`ui\` (interface art); leave it out for everything. A plugin that used a \`text\` field for typed asset names can switch it to \`asset\` with \`assetValue: "name"\`: the value stays the asset's name and names typed on older cards still match (\`"id"\` stores the asset id). With a name or an id, the picked asset is also added to the card's \`assets\`, so look its URL up there. Works for card fields and plugin \`settings\` alike.
- \`assets\` — like \`asset\`, but the author picks several and sets their order (say, the panels of a vertical comic, top to bottom). \`assetKind\` and \`assetValue\` work the same. The value is plain text, one entry per line in the author's order: \`values.images.split(/\\r?\\n/).filter(Boolean)\`. A plugin whose \`longText\` field asked authors to paste one URL per line can switch its kind to \`assets\`; URLs pasted on older cards still match. With a name or an id, every picked asset is also added to the card's \`assets\`.
  - To pair each asset with a few numbers (say, the panel a BGM starts at, the panel it fades out at, and its volume), add \`itemControls\`: up to 4 of \`{ "key": "volume", "label": "Volume", "kind": "number", "min": 0, "max": 100, "defaultValue": 80 }\`, shown under every picked asset. A line with numbers filled in becomes the entry, a tab, then JSON — \`https://…/a.mp3\\t{"startAt":1,"volume":80}\`; lines without numbers hold just the entry. Split on the tab when reading: \`const [url, meta] = line.split('\\t'); const opts = meta ? JSON.parse(meta) : {};\`.
- \`character\` — the author picks a character; the value is the character id
- \`variable\` — the author picks a story variable; the value is the variable name
- \`storyCard\` — the author picks a card to jump to; the value is the card id. Besides the searchable dropdown, “Pick a card on the board” lets them click the card on the board.

Every field accepts \`label\`, \`labelEn\`, \`hint\`, \`placeholder\` and \`defaultValue\`. Keys are alphanumeric plus underscore.

### Showing or greying out fields by condition (showIf, showIfMode)
Add \`showIf\` to a field and it only appears in the card editor (or the plugin's settings page) while the condition holds; it updates live as the author edits. A condition is "what to look at" plus "how to compare":
- What (one of): \`field\` is the key of another field on the same card (or in the same \`settings\`); \`setting\` is one of this plugin's **project settings** (a declared \`settings\` field, or a value a panel saved with \`larch.setSettings\`) — right for project-wide modes such as "time slots or hours".
- How (exactly one): \`equals\` (is this value), \`in\` (is any value in the array) or \`notEquals\` (is not this value).
- Several at once: \`{ "all": [conditions…] }\` (every one holds) or \`{ "any": [conditions…] }\` (at least one holds), nestable up to 4 levels.

By default a field whose condition fails is hidden; with \`"showIfMode": "disable"\` it stays in place with the whole block (label, input, description) greyed out and not editable — good for "this project doesn't use it, but the author should know it exists". A field whose controlling field is hidden or greyed out fails its condition too. Hidden and greyed-out fields **never lose their stored values** and the sandbox still receives every \`values\` entry, so have the html read only the fields the current mode uses. Pointing at a missing field, at itself, or a malformed test is rejected on submission.

### Select options from your own data (optionsFrom)
A \`select\` can read its options from **this plugin's own** data with \`optionsFrom\` instead of a fixed \`options\` list — for example the time slots an author added in your time manager:
- \`source\`: \`settings\` (this plugin's project settings), \`storage\` (data its panels and worker saved) or \`variable\` (a project variable; needs \`variables:read\`, unless the plugin created the variable with \`ensureVariables\`). Other plugins' data is never readable.
- \`key\`: the name of that setting, storage entry or variable. A JSON text value (e.g. \`larch.setSettings({ timeSlots: JSON.stringify(list) })\`) is parsed first.
- \`path\`: where the array is inside it, \`.\` between levels (e.g. \`calendar.slots\`); leave it out when the value is the array.
- \`where\`: keep only matching items, written like showIf but with \`field\` naming a property of the item (e.g. \`{ "field": "enabled", "notEquals": false }\`).
- \`label\` / \`labelEn\`: the property shown; \`value\`: the property stored (as text). Not needed when the array holds plain text or numbers.
- \`emptyHint\` / \`emptyHintEn\`: the note under the field when there is nothing to choose.

When the source is missing, not an array or empty, \`options\` is used instead; without \`options\` the field becomes a text input with \`emptyHint\` below it. A stored value that is no longer listed (a deleted slot, say) is kept and shown as "not in the list" — it is never wiped.

### Fields on one row (row, width)
Adjacent fields with the same \`row\` share one row (up to 4, and they must be next to each other), split by their \`width\` ratios (default 1, i.e. equal; \`"width": 2\` is twice as wide). Inputs line up along the top, each description sits under its own input and never pushes its neighbours, and the next row starts at the left edge. On narrow screens the row stacks into one column.

Example: a “Time control” card. Project settings hold \`timeMode\` (\`slot\` or \`hour\`) and a slot list \`timeSlots\`. “Advance” asks for an amount; “Next” and “Set date and time” ask for a target; the target year, month and day share a row; the target is a slot or an hour depending on the project's mode:
\`\`\`json
"settings": [
  { "key": "timeMode", "kind": "select", "label": "Time mode", "options": [{ "value": "slot", "label": "Time slots" }, { "value": "hour", "label": "Hours" }] }
],
"cards": [{ "id": "time-op", "name": "Time control", "html": "…", "fields": [
  { "key": "opType", "kind": "select", "label": "Operation", "options": [
    { "value": "advance", "label": "Advance" }, { "value": "next", "label": "Next" }, { "value": "set", "label": "Set date and time" }
  ] },
  { "key": "amount", "kind": "number", "label": "Amount", "min": 1, "defaultValue": 1, "showIf": { "field": "opType", "equals": "advance" } },
  { "key": "year", "kind": "number", "label": "Target year", "hint": "Standard or custom calendars; ignored when counting days.", "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "month", "kind": "number", "label": "Target month", "min": 1, "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "day", "kind": "number", "label": "Target day", "min": 1, "row": "date", "showIf": { "field": "opType", "equals": "set" } },
  { "key": "targetSlot", "kind": "select", "label": "Target slot",
    "optionsFrom": { "source": "settings", "key": "timeSlots", "path": "slots", "label": "name", "value": "code", "emptyHint": "Add time slots in the time manager first" },
    "showIf": { "all": [{ "setting": "timeMode", "equals": "slot" }, { "field": "opType", "in": ["next", "set"] }] } },
  { "key": "targetHour", "kind": "number", "label": "Target hour", "min": 0, "max": 23, "hint": "0–23",
    "showIf": { "all": [{ "setting": "timeMode", "equals": "hour" }, { "field": "opType", "in": ["next", "set"] }] } }
] }]
\`\`\`
\`timeSlots\` holds JSON text such as \`{"slots":[{"name":"Morning","code":"am"},…]}\`: the dropdown shows “Morning” and the card stores \`am\`. To keep the other mode's field visible but greyed out, add \`"showIfMode": "disable"\` to those two fields.

### Cards without a presentation
A logic card that only works out numbers or writes variables can say \`"hidePresentation": true\` (or \`"presentation": "none"\`): its card editor then leaves out the Presentation section. During play it still runs as its \`presentation\` (\`inline\` by default), so have the html do its work and send \`larch:complete\` straight away.

## Categories
${t}

## Permissions
${n}

Declare only what you actually use — installers read this list, and over-asking costs you installs.

## Card icons
Pick from: ${o}

${he(!1)}
## Plugins extend the editor, not just the board

Cards are half of it. The other half is **extending the editor itself** — this is the Unity-Asset-Store-shaped part:

\`\`\`json
{
  "commands": [
    { "id": "open-board", "title": "Open the task board", "icon": "layers", "surfaces": ["navbar", "toolbar"],
      "shortcut": "Alt+Shift+K", "panel": "task-board" },
    { "id": "tidy-layout", "title": "Tidy the layout", "icon": "grid", "surfaces": ["canvasMenu", "bottomRight"],
      "confirm": "This moves every card. Continue?" },
    { "id": "tidy-lines", "title": "Tidy the lines", "surfaces": ["cardMenu", "inspector"], "cardTypes": ["dialogue"] }
  ],
  "hooks": ["project:save"],
  "panels": [
    { "id": "task-board", "title": "Task board", "size": "large", "html": "<!doctype html>…" },
    { "id": "preferences", "title": "Board preferences", "placement": "settings", "html": "<!doctype html>…" }
  ],
  "settings": [{ "key": "columns", "kind": "number", "label": "Cards per row", "defaultValue": 4 }],
  "theme": { "--larch-ink": "#161a22" },
  "worker": "<!doctype html>…"
}
\`\`\`

- \`commands\` — items inside Larch's own UI. \`surfaces\`:
  - \`toolbar\` (board toolbar), \`navbar\` (project bar, top left), \`topRight\` (next to Play), \`bottomLeft\` (next to Help), \`bottomRight\` (view controls) — icon buttons that show the title on hover, so always pick an \`icon\`. At most ${ye} plugin buttons show in each bar.
  - \`cardMenu\`, \`canvasMenu\`, \`inspector\` — text items. \`cardTypes\` restricts an item to certain cards.
  - \`shortcut\` — a keyboard shortcut such as \`Alt+Shift+K\` or \`Mod+Shift+L\` (Mod is ⌘ on Mac, Ctrl elsewhere). It needs Mod or Alt; the key is A–Z, 0–9 or F1–F12. Combinations Larch or the browser already use (⌘Z, ⌘C, ⌘V, ⌘S, ⌘F, ⌘1–9, ⌘⇧K…) are rejected; \`Alt+Shift+letter\` is least likely to collide. Shortcuts never fire while the author is typing in a field.
  - \`panel\` — opens that panel directly, no worker needed. Commands without \`panel\` run in the worker.
- \`hooks\` — lifecycle: \`project:open\`, \`project:save\` (needs \`save:hook\`), \`card:change\`. Save checks and housekeeping systems live here.
- \`panels\` — a whole UI of your own, again one self-contained HTML file. \`placement\`: \`modal\` (centred window, default), \`side\` (right-hand drawer) or \`settings\` (embedded in Project settings → this plugin's page, good for advanced options). Modal panels accept \`size\`: \`medium\` (default), \`large\`, \`full\`.
- \`settings\` — plugin-level setting fields. Once the plugin is imported, Project settings gets a page for it in the sidebar; values arrive with every worker call, in panels, and in persistent game UI.
- \`theme\` — CSS variables only, plain literal values (no \`url()\` and friends).
- \`worker\` — where commands and hooks run. **Declaring hooks, or a command without \`panel\`, requires a worker** — otherwise publishing is rejected.

### How panels and workers keep data (important)

Panels and workers run in \`sandbox="allow-scripts"\` iframes too, but Larch installs a bridge in them first:

- **\`localStorage\` just works**: reads and writes are saved into *this project*, so they survive reloads, other computers, and closing and reopening the panel, and they follow the project's cloud saves, version history and collaboration. Each plugin has its own store of about 512 KB (string keys and values, like the browser's localStorage — \`JSON.stringify\` objects). \`sessionStorage\` lives only while the panel is open. Do not use IndexedDB, cookies or file downloads for storage.
- Or use \`window.larch.storage\`: \`get(key)\`, \`set(key, text)\`, \`remove(key)\`, \`keys()\`, \`getJSON(key, fallback)\`, \`setJSON(key, value)\`. A plugin's panels and worker share the same data; changes made elsewhere arrive as the standard \`storage\` event, or through \`larch.on('storage', fn)\`.
- This is **editor-side working data**: published games, share links and exports never include it, which makes it right for task lists, notes and drafts. Values the game needs belong in \`settings\`; player state belongs in story variables.
- Closing a panel only hides it — its scripts keep running (timers, unsent input); switching projects or reloading starts it fresh. **Time things by storing a start timestamp (\`Date.now()\`) and subtracting**, never by adding one per \`setInterval\` tick: browsers slow timers down in the background and the count drifts. Store the start time if a timer must survive a reload.
- After loading, send \`parent.postMessage({ type: 'larch:ready' }, '*')\` and you receive \`larch:init\`: \`{ plugin, panel, settings, storage, variables, project, locale, theme, font }\` (\`variables\` are the project variables' default values and need \`variables:read\`; \`font\` is the project font). Changes to settings, theme or language arrive as \`larch:update\`. \`window.larch.settings\`, \`larch.theme\`, \`larch.locale\`, \`larch.project\` and \`larch.getProjectFont()\` are always current too.
- Dark mode: the bridge sets \`data-larch-theme="light"\` or \`"dark"\` on the panel's \`<html>\`, so \`:root[data-larch-theme="dark"] body { … }\` follows the editor. **Always paint your own background**: a panel without one shows up white in dark mode.
- A panel can call \`larch.close()\` to close itself, \`larch.toast('Done')\`, \`larch.setSettings({ columns: 3 })\` to change its own settings, and \`larch.run([...effects])\` to send the same effects a worker can (each still permission-checked). A panel's \`larch:set\` does not change story variables — that message is for cards during play.
- **Let the author pick an asset**: \`larch.openAssetPicker({ kind: 'background', title: 'Choose the battle backdrop' })\` opens Larch's own asset picker (thumbnails, search, category tabs, listen-before-pick for sounds — the same one card fields use). It returns a Promise: \`{ id, url, name, kind }\` (\`kind\` is \`image\`, \`audio\` or \`video\`) for the picked asset, or \`null\` when the author cancels or closes it. \`kind\` takes the same values as an \`asset\` field's \`assetKind\` (\`any\`, \`image\`, \`audio\`, \`video\`, \`background\`, \`character\`, \`expression\`, \`bgm\`, \`sfx\`, \`ui\`; omit it for everything); \`title\` is optional plain text, up to 60 characters. Single selection only; for several, use an \`assets\` field.
  - Needs the \`assets:read\` permission, and only works in a panel (the one that is open) or a \`placement: "settings"\` page — not in a worker.
  - Call it directly from a click or key handler (a real user gesture), never on load or from a timer; only one picker can be open at a time.
  - The list holds only the open project's assets (plus Larch's built-in sounds). The plugin receives just the asset the author clicked — never the whole library, and no arbitrary file access.
  - When the request is refused the Promise rejects and \`error.message\` says why (missing permission, no user gesture, a picker already open…). To keep the \`url\`, store it in \`settings\` (\`larch.setSettings\`) or storage.

\`\`\`html
<button id="pick">Choose backdrop</button>
<script>
  document.getElementById('pick').onclick = async function () {
    try {
      var asset = await larch.openAssetPicker({ kind: 'background' });
      if (asset) larch.setSettings({ battleBackground: asset.url });
    } catch (error) { larch.toast(error.message); }
  };
<\/script>
\`\`\`

### What a worker looks like

\`\`\`html
<!doctype html><html><body><script>
  function handle(context){
    // context: { command?, hook?, settings, storage, project, cards, edges, selection, variables, locale, theme }
    // Return a list of effects; Larch permission-checks each one before applying it
    return [
      { kind: 'updateCards', cards: [{ id: context.selection[0], patch: { text: 'rewritten line' } }] },
      { kind: 'toast', message: 'Done' }
    ];
  }
  parent.postMessage({ type: 'larch:ready' }, '*');
  window.addEventListener('message', function(event){
    var data = event.data;
    if (!data || data.type !== 'larch:invoke') return;
    parent.postMessage({ type: 'larch:result', requestId: data.requestId, effects: handle(data.context || {}) }, '*');
  });
<\/script></body></html>
\`\`\`

Available effects: \`toast\`, \`addCards\`, \`updateCards\`, \`deleteCards\`, \`moveCards\`, \`setVariables\`, \`ensureVariables\`, \`setSettings\`, \`setStorage\` (\`{ kind: 'setStorage', values: { key: 'text' or null } }\`, null deletes), \`openPanel\`, \`closePanel\`, \`theme\`.

\`setVariables\` only changes defaults of variables that already exist. When the plugin needs its own variables (a one-click setup, say), create them with \`ensureVariables\`: \`{ kind: 'ensureVariables', variables: [{ name: 'gold', type: 'number', defaultValue: 0, label: 'Gold' }] }\`. It only adds variables the project does not have yet — an existing variable with the same name is left untouched, keeping the author's value — so running it again is safe. Requires \`variables:write\`. \`scope\` defaults to \`project\`; \`board\` creates it on the open board only. Mark the plugin's internal variables \`hidden: true\`: they read, write and drive conditions during play as usual, but stay out of the author's variable list, condition pickers and variable dropdowns, so nobody edits or deletes them by accident. Sending \`hidden: true\` or \`false\` again for a variable your plugin created hides or reveals it (an author's own variable of the same name is never touched).

**Every one is checked against \`permissions\`**: editing cards needs \`cards:write\`, save hooks need \`save:hook\`, opening panels and adding menu items need \`ui:contribute\`, restyling needs \`theme:write\`. Undeclared actions are dropped and the author is shown exactly which permission was missing — they never fail silently. Keeping your own data (storage, settings) needs no extra permission.

## The store page
- \`overview\`: the full text of the store page's Overview tab, paragraphs separated by a blank line; \`features\`: highlights, one per line (up to 12). English goes in \`overviewEn\` / \`featuresEn\`.
- \`cover\`: the marketplace cover (3:2 landscape recommended). **Required to submit**; personal versions do not need it.
- \`gallery\`: store screenshots or short clips, up to 12: \`[{ "url": "https://…", "caption": "…" }]\`. If you can drive a browser (Playwright, say), run the panels and cards and capture them — screenshots sell a plugin better than words.

## How to deliver (pick one, best first)
1. **Save it straight into the author's account** (an agent connected to Larch through MCP or an Agent Key): read \`larch_plugin_spec\`, then save with \`larch_save_plugin_draft\` as a **personal version** (REST: \`PUT /api/agent/plugins/<id>/draft\`, the body is the manifest, optionally with \`releaseNote\`). Upload pictures with \`larch_upload_plugin_image\` (REST: \`POST /api/agent/plugins/images\`, \`{ pluginId, name, mimeType, base64 }\`) and put the URLs in \`cover\` and \`gallery\`. **Do not submit it for review** — the author tries it in the publish window and submits it. For an update, read the whole plugin back with \`larch_get_plugin\`, raise \`version\`, and save the complete manifest.
2. **A folder, zipped** (bigger systems with many files): the author drops the zip or picks the folder in the publish window and Larch assembles one manifest:
\`\`\`
my-plugin/
  larch-plugin.json     the manifest; html may be a file name, e.g. "html": "panels/board.html"
  cards/<card id>.html   used for cards without html
  panels/<panel id>.html
  huds/<HUD id>.html
  worker.html            or worker.js (plain JS is fine)
  cover.png              marketplace cover
  screenshots/01.png     store screenshots, ordered by name; captions go in gallery: { "url": "screenshots/01.png", "caption": "…" }
\`\`\`
   \`<script src="x.js">\`, \`<link rel="stylesheet" href="x.css">\`, images, fonts and CSS \`url()\` in the HTML are inlined when they point at files in the folder (up to 300 KB per image; pass bigger media in from the project through card fields). **Don't use import** between JS files; load several \`<script src>\` in order.
3. **A single JSON** (small plugins): reply with the complete manifest in one \`json\` code block; the author pastes it into the publish window. Never abbreviate the html with \`...\` — an elided runtime installs as a broken card.

The publish window is Marketplace → Plugins → Publish (the board's Add card → Plugins → Create your own plugin opens the same window). When updating an existing plugin, leaving \`cover\` out keeps the current one.`}const ya=[{id:"suno-horizon-oath",name:"LARCH — Horizon Oath.wav",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/epic/1784627767704_LARCH___Horizon_Oath.wav",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/b54259a2-ef19-4675-861d-aafca00ee911",style:"Suno Original BGM",category:"audio",variant:"大氣磅礴／史詩／92 BPM"},{id:"suno-empty-chair",name:"LARCH — The Empty Chair.wav",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/sad/1784627792076_LARCH___The_Empty_Chair.wav",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/e8941038-a544-4ed3-bbbf-e458b1a6b647",style:"Suno Original BGM",category:"audio",variant:"傷感／鋼琴大提琴／58 BPM"},{id:"suno-first-quest",name:"LARCH — First Quest First Snack.mp3",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/happy/1784627773334_LARCH___First_Quest_First_Snack.mp3",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/80ecfbcf-2e4b-4b33-b881-c74bb7caf2fe",style:"Suno Original BGM",category:"audio",variant:"開心／JRPG 城鎮／116 BPM"},{id:"suno-cafe-save-point",name:"LARCH — Cafe Save Point.mp3",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/relax/1784627771422_LARCH___Cafe_Save_Point.mp3",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/5f44e095-fbbe-4c81-9d0e-a91b5027962b",style:"Suno Original BGM",category:"audio",variant:"輕鬆／咖啡館／78 BPM"},{id:"suno-archive-midnight",name:"LARCH — Archive After Midnight.mp3",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/mystery/1784627774636_LARCH___Archive_After_Midnight.mp3",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/07cfe83e-d2fe-4116-bb63-bebeb4bb13f7",style:"Suno Original BGM",category:"audio",variant:"懸疑／調查／70 BPM"},{id:"suno-hallway-breathing",name:"LARCH — Hallway Breathing.mp3",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/horror/1784627777491_LARCH___Hallway_Breathing.mp3",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/15ea7545-7833-4871-9b83-5ca00941e97f",style:"Suno Original BGM",category:"audio",variant:"恐怖／極簡環境／無節拍"},{id:"suno-letters-window",name:"LARCH — Letters by the Window.wav",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/lyrical/1784627814026_LARCH___Letters_by_the_Window.wav",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/d0ae3e41-bb60-4d2b-8798-37d32b84e3f4",style:"Suno Original BGM",category:"audio",variant:"抒情／雨窗鋼琴大提琴／68 BPM"},{id:"suno-breach-warning",name:"LARCH — Breach Warning.mp3",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/sfx/impact/1784627817006_LARCH___Breach_Warning.mp3",remote:!0,license:"Suno Pro commercial license",source:"https://suno.com/song/c9dce792-9fb1-4a79-bbd2-067e04940903",style:"Suno Original SFX",category:"audio",variant:"震撼／警報 Stinger／8 秒"},{id:"bgm-hope-orchestral",name:"Hope — Orchestral Battle.ogg",type:"audio",url:x("/audio/cc0/hope-orchestral-battle.ogg"),remote:!0,license:"CC0 1.0",source:"OpenGameArt · MintoDog",style:"BGM",category:"audio",variant:"明亮戰鬥／可循環"},{id:"bgm-war-theme",name:"War Theme.ogg",type:"audio",url:x("/audio/cc0/war-theme.ogg"),remote:!0,license:"CC0 1.0",source:"OpenGameArt · Spring Spring",style:"BGM",category:"audio",variant:"軍事／戰略"},{id:"bgm-lets-battle",name:"Let's battle!.mp3",type:"audio",url:x("/audio/cc0/lets-battle.mp3"),remote:!0,license:"CC0 1.0",source:"OpenGameArt · haruta",style:"BGM",category:"audio",variant:"戰鬥／射擊"},...[["scene-rainy-station.png","雨夜月台","場景"],["scene-forest-shrine.png","晨霧神社","場景"],["scene-sunset-classroom.png","夕陽教室","場景"],["scene-night-city.png","霓虹夜城","場景"],["scene-coastal-train.png","海岸列車","場景"],["scene-library.png","古典圖書館","場景"],["scene-festival.png","夏日祭典","場景"],["scene-snow-village.png","雪夜小鎮","場景"],["scene-rooftop.png","學校屋頂","場景"],["scene-moon-garden.png","月光庭園","場景"],["char-aoi-anime.png","葵・動漫立繪","動漫"],["char-ren-anime.png","蓮・動漫立繪","動漫"],["char-mika-chibi.png","米卡・Q版立繪","Q版"],["char-eli-cartoon.png","伊萊・卡通立繪","卡通"],["char-sora-realistic.png","空・真人立繪","真人"],["aoi-smile.png","葵・微笑","表情"],["aoi-sad.png","葵・難過","表情"],["aoi-angry.png","葵・生氣","表情"],["aoi-surprised.png","葵・驚訝","表情"],["aoi-running.png","葵・奔跑","動作"],["ren-smile.png","蓮・微笑","表情"],["ren-worried.png","蓮・擔心","表情"],["ren-determined.png","蓮・堅定","表情"],["ren-shy.png","蓮・害羞","表情"],["ren-pointing.png","蓮・指向前方","動作"],["mika-happy.png","米卡・開心","表情"],["mika-cry.png","米卡・哭泣","表情"],["mika-angry.png","米卡・鼓臉","表情"],["mika-cheer.png","米卡・歡呼","動作"],["mika-sleepy.png","米卡・想睡","表情"],["aoi-worried.png","葵・擔心","表情"],["aoi-shy.png","葵・害羞","表情"],["aoi-determined.png","葵・堅定","表情"],["aoi-relieved.png","葵・安心","表情"],["aoi-cry.png","葵・哭泣","表情"],["ren-angry.png","蓮・生氣","表情"],["ren-surprised.png","蓮・驚訝","表情"],["ren-sad.png","蓮・難過","表情"],["ren-laugh.png","蓮・大笑","表情"],["ren-thinking.png","蓮・思考","表情"],["mika-surprised.png","米卡・驚訝","表情"],["mika-shy.png","米卡・害羞","表情"],["mika-determined.png","米卡・堅定","表情"],["mika-worried.png","米卡・擔心","表情"],["mika-thinking.png","米卡・思考","表情"],["eli-smile.png","伊萊・微笑","表情"],["eli-worried.png","伊萊・擔心","表情"],["eli-determined.png","伊萊・堅定","表情"],["eli-surprised.png","伊萊・驚訝","表情"],["eli-angry.png","伊萊・生氣","表情"],["eli-sad.png","伊萊・難過","表情"],["eli-thinking.png","伊萊・思考","表情"],["eli-laugh.png","伊萊・大笑","表情"],["eli-thumbs-up.png","伊萊・讚","動作"],["eli-repairing.png","伊萊・維修","動作"],["sora-smile.png","空・微笑","表情"],["sora-laugh.png","空・大笑","表情"],["sora-worried.png","空・擔心","表情"],["sora-determined.png","空・堅定","表情"],["sora-angry.png","空・生氣","表情"],["sora-surprised.png","空・驚訝","表情"],["sora-sad.png","空・難過","表情"],["sora-thinking.png","空・思考","表情"],["sora-presenting.png","空・介紹","動作"],["sora-confident.png","空・自信","動作"]].map(([a,e,s],t)=>{const n=a.includes("aoi")?"葵":a.includes("ren")?"蓮":a.includes("mika")?"米卡":a.includes("eli")?"伊萊":a.includes("sora")?"空":void 0;return{id:`sample-${t+1}`,name:e,type:"image",url:x(`/samples/${a}`),thumbnailUrl:x(`/samples/thumbs/${a.replace(".png",".webp")}`),remote:!0,license:"AI generated",source:"Codex image generation",style:s,category:s==="場景"?"scene":"character",character:n,variant:n?e.replace(`${n}・`,""):e}})],ut={schemaVersion:1,id:"larch-official-sample",name:"Larch 官方範例・雨停之前",description:"一段關於記憶、選擇與重逢的短篇視覺小說",locale:"zh-Hant",updatedAt:new Date().toISOString(),settings:{resolution:{width:1920,height:1080},textSpeed:32,returnToTitleOnEnd:!0,titleCoverPositionX:50,titleCoverPositionY:50,titleCoverShade:.58,cursorMode:"system",cursorSize:34,cursorRotation:342,cursorHotspotX:50,cursorHotspotY:50},variables:[{id:"playerName",name:"playerName",label:"玩家名字",type:"string",defaultValue:"悠真",description:"可在對話中使用 {{playerName}}"},{id:"aoiAffection",name:"aoiAffection",label:"葵的好感度",type:"number",defaultValue:10,description:"記錄角色好感度"}],media:ya,nodes:[{id:"opening",type:"story",position:{x:80,y:180},data:{type:"scene",title:"序幕・車站",text:"雨水在老車站的玻璃上緩緩滑落。",background:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784842042668_scene-rainy-station.png",bgm:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/templates/music/relax/1784627771422_LARCH___Cafe_Save_Point.mp3",bgmVolume:.3,bgmLoop:!0,start:!0}},{id:"line-1",type:"story",position:{x:430,y:80},data:{type:"dialogue",title:"第一次重逢",speaker:"葵",text:"你還是來了。和約定的那天一樣，晚了三分鐘。",emotion:"微笑",character:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784841913040_aoi-smile.png",characterPosition:"center"}},{id:"choice-1",type:"story",position:{x:780,y:180},data:{type:"choice",title:"如何回答？",text:"選擇悠真的回答",choices:["向她道歉","假裝不記得約定"]}},{id:"event-1",type:"story",position:{x:1130,y:80},data:{type:"event",title:"觸發回憶",eventName:"Larch.MemoryUnlocked",eventPayload:'{"chapter":"station","memory":1}'}},{id:"line-honest",type:"story",position:{x:1130,y:360},data:{type:"dialogue",title:"坦白",speaker:"{{playerName}}",text:"對不起。我不是忘記，而是害怕再次見到妳之後，會捨不得離開。",emotion:"認真",character:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784842014264_ren-determined.png",characterPosition:"left"}},{id:"scene-memory",type:"story",position:{x:1490,y:180},data:{type:"scene",title:"回憶・夕陽教室",text:"兩人的記憶回到那個尚未說完再見的午後。",background:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784842048056_scene-sunset-classroom.png"}},{id:"line-aoi",type:"story",position:{x:1850,y:100},data:{type:"dialogue",title:"葵的答案",speaker:"葵",text:`我等的不是一句道歉。
我只是想知道，{{playerName}} 還記不記得我們說過的未來。`,emotion:"擔心",character:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784841910277_aoi-sad.png",characterPosition:"right"}},{id:"choice-together",type:"story",position:{x:2210,y:180},data:{type:"choice",title:"雨停之後",text:"不論怎麼回答，兩人都將走向同一段新的旅程。",choices:["牽起她的手","把傘移向她那邊"],choiceMode:"shared"}},{id:"scene-ending",type:"story",position:{x:2570,y:180},data:{type:"scene",title:"尾聲・海岸列車",text:"雨停了。列車沿著海岸駛向天光。",background:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784842028236_scene-coastal-train.png"}},{id:"line-ending",type:"story",position:{x:2930,y:120},data:{type:"dialogue",title:"新的約定",speaker:"葵",text:`這次不要遲到了。
下一站，我們一起下車。`,emotion:"微笑",character:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/samples/1784841913040_aoi-smile.png",characterPosition:"center"}}],edges:[{id:"e-opening-line",source:"opening",target:"line-1",animated:!0},{id:"e-line-choice",source:"line-1",target:"choice-1",animated:!0},{id:"e-choice-event",source:"choice-1",sourceHandle:"choice-0",target:"event-1",animated:!0,label:"向她道歉"},{id:"e-choice-honest",source:"choice-1",sourceHandle:"choice-1",target:"line-honest",animated:!0,label:"假裝不記得約定"},{id:"e-event-memory",source:"event-1",target:"scene-memory",animated:!0},{id:"e-honest-memory",source:"line-honest",target:"scene-memory",animated:!0},{id:"e-memory-aoi",source:"scene-memory",target:"line-aoi",animated:!0},{id:"e-aoi-together",source:"line-aoi",target:"choice-together",animated:!0},{id:"e-together-ending",source:"choice-together",sourceHandle:"choice-all",target:"scene-ending",animated:!0,label:"所有選項"},{id:"e-ending-line",source:"scene-ending",target:"line-ending",animated:!0}]},w="Larch official cross-platform project license: commercial and non-commercial use allowed; edits allowed; no attribution required. Do not resell or redistribute the source assets.";function ht(a){return a===Ve.name?"official-cross-platform":"source-terms"}const Le=[{id:"idle",name:"平常",emotion:"平靜",prompt:"Neutral standing pose, tiny dot eyes, relaxed arms, calm expression."},{id:"joy",name:"開心",emotion:"開心",prompt:"Joyful pose with closed crescent eyes, both arms raised, buoyant body language."},{id:"sad",name:"難過",emotion:"難過",prompt:"Sad pose with lowered eyes, a single small blue tear, gently slumped body language."},{id:"angry",name:"生氣",emotion:"生氣",prompt:"Cute determined angry pose with inward eyebrows and hands on hips; never threatening."},{id:"surprised",name:"驚訝",emotion:"驚訝",prompt:"Surprised pose with wide round eyes and both arms lifted."}],Ue=[{slug:"sprout",name:"小芽",englishName:"Sprout",role:"家族引路人",summary:"頭頂嫩芽會朝故事最需要被照顧的方向轉動。",backstory:"從一顆被遺忘在故事白板角落的種子醒來，負責召集大家完成一年一度的微光祭典。",personality:"溫柔、好奇、有一點愛操心；總會先聽完別人的話。",speakingStyle:"短句、溫暖，常用「我們一起」邀請同伴。",tags:["植物","引導","溫柔"]},{slug:"beanbud",name:"豆耳",englishName:"Beanbud",role:"風聲收集員",summary:"長耳朵能聽見尚未被說出口的選項。",backstory:"住在選擇分岔口旁，會把每一條可能的道路折成一枚小紙籤。",personality:"反應快、樂觀、很會鼓勵猶豫的人。",speakingStyle:"節奏輕快，喜歡把選擇說成小小的冒險。",tags:["風","選擇","活潑"]},{slug:"pebble",name:"圓石",englishName:"Pebble",role:"記憶保管員",summary:"身上的藍色圓點會記錄旅途中重要的片刻。",backstory:"在河床睡了很久，醒來後發現每道水紋都是一段可以回看的歷史。",personality:"沉穩、可靠、偶爾慢半拍。",speakingStyle:"語速從容，會重述關鍵資訊，讓大家放心。",tags:["石頭","記憶","可靠"]},{slug:"dewdrop",name:"滴露",englishName:"Dewdrop",role:"情緒調音師",summary:"能從水波顏色看出一句台詞真正的情緒。",backstory:"清晨從第一片葉尖落下，沿途收集笑聲、眼淚與沒有說完的感受。",personality:"敏感、體貼、坦率。",speakingStyle:"善用感受詞，會溫柔地替別人確認心情。",tags:["水","情緒","體貼"]},{slug:"glowcap",name:"菇燈",englishName:"Glowcap",role:"場景點燈師",summary:"帽上的金色斑點能替任何場景找到恰好的光。",backstory:"原本是一盞森林夜燈，因為太想親自看看被照亮的故事而長出了腳。",personality:"務實、專注、藏不住得意。",speakingStyle:"像舞台監督一樣精準，常提到亮度、顏色和時機。",tags:["蘑菇","燈光","場景"]},{slug:"puffkin",name:"蒲毛",englishName:"Puffkin",role:"聲音收藏家",summary:"蓬鬆的身體能把旋律和悄悄話保存很久。",backstory:"曾被一陣風帶著旅行，把沿途聽見的音樂全藏進每一撮柔毛。",personality:"害羞、細心，一聊到聲音就會變得健談。",speakingStyle:"柔軟而小聲，擅長用擬聲詞描述氣氛。",tags:["聲音","音樂","害羞"]},{slug:"foldling",name:"摺仔",englishName:"Foldling",role:"結構工程師",summary:"能把散亂的故事摺成清楚的章節與白板。",backstory:"從一張寫滿箭頭的草稿紙誕生，對整齊的連線有無法抗拒的熱情。",personality:"理性、俐落、其實很怕大家迷路。",speakingStyle:"條列分明，會先說目標，再說下一步。",tags:["紙","結構","白板"]},{slug:"pinekin",name:"松果",englishName:"Pinekin",role:"狀態管理員",summary:"三層松鱗分別記著勇氣、友誼與任務進度。",backstory:"每完成一件承諾就長出一片新松鱗，因此從不輕易答應做不到的事。",personality:"認真、有責任感、被稱讚時會害羞。",speakingStyle:"會用數字確認進度，也不忘替同伴打氣。",tags:["松果","變數","任務"]},{slug:"starling",name:"星眠",englishName:"Starling",role:"夢境測試員",summary:"能在夢裡走過每一條分支，找出遺漏的結局。",backstory:"從一顆沒有被許下願望的星星落下，決定替所有故事確認它們都能抵達終點。",personality:"悠哉、敏銳、重要時刻特別清醒。",speakingStyle:"像說夢話般簡短，但常一語道破流程問題。",tags:["星星","試玩","分支"]},{slug:"cloudlet",name:"雲朵",englishName:"Cloudlet",role:"即興導演",summary:"藍色旋紋會在玩家自由輸入時長出新的對話。",backstory:"沒有固定形狀，所以最擅長接住突如其來的點子，再把它們變成可玩的下一幕。",personality:"想像力豐富、包容、偶爾飄得太遠。",speakingStyle:"開放式提問多，會接續玩家用過的詞。",tags:["雲","AI","即興"]},{slug:"lanternberry",name:"燈果",englishName:"Lanternberry",role:"事件信使",summary:"腹部的橘色燈芯會在事件送達外部系統時亮起。",backstory:"曾替森林各處送信，後來學會把訊息包成結構清楚的事件資料。",personality:"熱心、準時、對格式非常講究。",speakingStyle:"簡明確實，重要資料會再覆誦一次。",tags:["燈","事件","Unity"]},{slug:"moonhorn",name:"月角",englishName:"Moonhorn",role:"夜間守密人",summary:"月牙內側收藏著角色不會輕易說出的祕密。",backstory:"只在故事需要安靜思考時現身，守護人物設定不被即興演出弄丟。",personality:"安靜、機智、值得信任。",speakingStyle:"語氣平穩，有詩意但不故弄玄虛。",tags:["月亮","角色設定","秘密"]},{slug:"featherpost",name:"羽箋",englishName:"Featherpost",role:"靈感傳信員",summary:"三角翅膀會把剛冒出的靈感摺成能飛的小紙條。",backstory:"從故事工坊一張被風吹起的空白便條醒來，總在大家漏掉好點子時，繞一圈把它送回白板。",personality:"機靈、安靜、使命必達；被注意時會有點慌張。",speakingStyle:"句子短而俐落，像遞來紙條，常用「收到」與「送到了」。",tags:["小鳥","靈感","傳信"]}],Y=(a,e)=>x(`/assets/larch-creatures/${a}/${e}.png`),va=(a,e)=>x(`/assets/larch-creatures/thumbs/${a}-${e}.png`),ft=Ue.flatMap(a=>Le.map(e=>({id:`larch-creature-${a.slug}-${e.id}`,name:`${a.name} / ${e.name}`,type:"image",url:Y(a.slug,e.id),thumbnailUrl:va(a.slug,e.id),remote:!0,license:w,source:"Codex built-in image generation",style:"Larch 手繪小生物",category:"character",character:a.name,variant:e.name,emojiShortcode:`${a.slug}_${e.id}`,emojiName:`${a.name} / ${e.name}`}))),mt=Ue.map(a=>({id:`larch-character-${a.slug}`,name:a.name,slug:a.slug,role:a.role,summary:a.summary,backstory:a.backstory,personality:a.personality,speakingStyle:a.speakingStyle,systemPrompt:`你是 Larch 小生物家族的${a.name}（${a.englishName}）。維持角色設定，使用繁體中文，以 1–3 句簡短回應玩家。`,portraitUrl:Y(a.slug,"idle"),tags:[...a.tags],voiceProvider:"akarion",voiceName:"Yichen (zh)",expressions:Le.map(e=>({id:`larch-expression-${a.slug}-${e.id}`,name:e.name,emotion:e.emotion,imageUrl:Y(a.slug,e.id),prompt:e.prompt}))})),bt="/assets/larch-creatures/larch-creatures-pack-cover.webp",gt="https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/1784841558686_expression-sheet.png",wa=[{id:"larch-bg-sproutlight-gate",name:"芽光之門",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841526489_sproutlight-gate.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841534531_sproutlight-gate.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"森林入口／清晨"},{id:"larch-bg-dewdrop-pond",name:"滴露池畔",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841519407_dewdrop-pond.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841527803_dewdrop-pond.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"水面花園／薄霧"},{id:"larch-bg-glowcap-workshop",name:"菇燈工房",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841523638_glowcap-workshop.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841531783_glowcap-workshop.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"蘑菇工房／暖光"},{id:"larch-bg-folded-hills",name:"摺紙丘陵",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841522283_folded-hills.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841530571_folded-hills.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"紙藝山谷／冒險"},{id:"larch-bg-festival-square",name:"微光祭典廣場",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841520786_festival-square.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841529210_festival-square.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"森林祭典／夜晚"},{id:"larch-bg-moonhorn-garden",name:"月角祕密花園",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/1784841524937_moonhorn-garden.jpg",thumbnailUrl:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/assets/larch-creatures/backgrounds/thumbs/1784841533322_moonhorn-garden.jpg",license:w,source:"Codex built-in image generation",style:"童話水彩剪紙",category:"scene",variant:"月光花園／結局"}].map(a=>({...a,remote:!0})),ka=[{id:"larch-music-sproutlight-path",name:"01 芽光晨徑",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/audio/larch-creatures/1784841727962_sproutlight-path.mp3",license:w,source:"Original music generated with Mureka via ChatCut",style:"童話開場／玩具鋼琴／撥弦",category:"audio",variant:"92 BPM／90.99 秒",audioKind:"music",musicGenre:"童話冒險"},{id:"larch-music-dewdrops-heart",name:"02 滴露的心事",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/audio/larch-creatures/1784841721002_dewdrops-heart.mp3",license:w,source:"Original music generated with Mureka via ChatCut",style:"溫柔情緒／鋼琴／卡林巴",category:"audio",variant:"72 BPM／198.11 秒",audioKind:"music",musicGenre:"溫柔抒情"},{id:"larch-music-folded-team-departs",name:"03 摺紙小隊出發",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/audio/larch-creatures/1784841723281_folded-team-departs.mp3",license:w,source:"Original music generated with Mureka via ChatCut",style:"俏皮解謎／撥弦／木魚",category:"audio",variant:"112 BPM／154.47 秒",audioKind:"music",musicGenre:"俏皮解謎"},{id:"larch-music-tiny-light-festival",name:"04 微光祭典",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/audio/larch-creatures/1784841729798_tiny-light-festival.mp3",license:w,source:"Original music generated with Mureka via ChatCut",style:"森林祭典／室內民謠",category:"audio",variant:"104 BPM／109.63 秒",audioKind:"music",musicGenre:"歡樂祭典"},{id:"larch-music-moonhorn-goodnight",name:"05 月角的晚安",type:"audio",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/audio/larch-creatures/1784841725795_moonhorn-goodnight.mp3",license:w,source:"Original music generated with Mureka via ChatCut",style:"夢幻結尾／音樂盒／柔弦",category:"audio",variant:"66 BPM／173.19 秒",audioKind:"music",musicGenre:"夢幻夜曲"}].map(a=>({...a,remote:!0})),yt=[...wa,...ka],L=[{id:"jtw-ui-dialogue-frame",name:"西遊記・天宮對話框",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/ui/1784961120784_journey-dialogue-frame.png",category:"ui",style:"西遊記・東方奇幻 UI",variant:"對話框",license:"AI generated",source:"Codex image generation"},{id:"jtw-ui-nameplate",name:"西遊記・角色名牌",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/ui/1784961122090_journey-nameplate.png",category:"ui",style:"西遊記・東方奇幻 UI",variant:"角色名牌",license:"AI generated",source:"Codex image generation"},{id:"jtw-ui-choice-frame",name:"西遊記・選項框",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/ui/1784961118630_journey-choice-frame.png",category:"ui",style:"西遊記・東方奇幻 UI",variant:"選項框",license:"AI generated",source:"Codex image generation"},{id:"jtw-ui-continue-icon",name:"西遊記・繼續指示",type:"image",url:"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/ui/1784961119662_journey-continue-icon.png",category:"ui",style:"西遊記・東方奇幻 UI",variant:"繼續指示",license:"AI generated",source:"Codex image generation"}],Sa={modern:{preset:"modern",presentation:"panel",textOverflow:"grow",panelColor:"#0b0b0e",panelOpacity:.9,textColor:"#ffffff",speakerColor:"#ded1ff",accentColor:"#9f8fe0",borderColor:"#ffffff",borderRadius:20,panelWidth:74,panelPadding:26,panelOffset:3.2,fontFamily:"sans",fontSize:24,nameFontSize:19,backdropBlur:18},paper:{preset:"paper",presentation:"panel",textOverflow:"grow",panelColor:"#f6efe2",panelOpacity:.96,textColor:"#322a23",speakerColor:"#8a3c2b",accentColor:"#b86742",borderColor:"#6c5947",borderRadius:8,panelWidth:72,panelPadding:30,panelOffset:4,fontFamily:"serif",fontSize:25,nameFontSize:20,backdropBlur:6},journey:{preset:"journey",presentation:"panel",textOverflow:"grow",panelColor:"#21100d",panelOpacity:.9,textColor:"#fff8e8",speakerColor:"#ffe3a1",accentColor:"#e9bd5b",borderColor:"#d6a33a",borderRadius:24,panelWidth:82,panelPadding:38,panelOffset:2.7,fontFamily:"serif",fontSize:25,nameFontSize:21,backdropBlur:10,frameImage:L[0].url,nameplateImage:L[1].url,choiceFrameImage:L[2].url,continueIconImage:L[3].url},cinematic:{preset:"cinematic",presentation:"gradient",textOverflow:"grow",panelColor:"#05070a",panelOpacity:.84,textColor:"#f6f2e8",speakerColor:"#e2c17c",accentColor:"#b68a3d",borderColor:"#caa85f",borderRadius:0,panelWidth:100,panelPadding:30,panelOffset:0,fontFamily:"serif",fontSize:25,nameFontSize:18,backdropBlur:0}};function xa(a){return N(a).frameImage===L[0].url}function vt(a){const e=N(a);return[e.textOverflow==="scroll"?"dialogue-scroll":"dialogue-grow",e.frameImage?"has-ui-frame":"",e.nameplateImage?"has-ui-nameplate":"",e.nameplateImage&&e.nameplateFit==="name"?"nameplate-fit":"",!e.nameplateImage&&Ma(e)?"nameplate-free":"",$a(e)?"nameplate-text-only":"",He(e)?"has-nameplate-height":"",e.choiceFrameImage?"has-ui-choice":"",xa(e)?"ui-art-journey":"",e.presentation==="gradient"?"ui-gradient":"",e.skin==="cozy"&&e.presentation!=="gradient"?"ui-skin-cozy":"",Ne(e)?"has-box-height":"",e.presentation==="gradient"&&Te(e)?"has-gradient-width":"",Oe(e)?"has-text-inset":"",e.textShadow===!1?"no-text-shadow":""].filter(Boolean).join(" ")}const k=a=>typeof a=="number"&&Number.isFinite(a);function Ne(a){return k(a.panelHeight)?Math.round(Math.min(720,Math.max(120,a.panelHeight))):void 0}function Te(a){return k(a.gradientWidth)&&a.gradientWidth<100?Math.round(Math.max(40,a.gradientWidth)):void 0}function Se(a){return a.frameImage&&k(a.frameOpacity)&&a.frameOpacity<1?Math.max(0,a.frameOpacity):void 0}function Ma(a){return!!a.nameplateImage||a.nameplateFreeLayout===!0}function wt(a){return!a.nameplateImage&&(a.presentation==="gradient"||a.skin==="cozy")}function $a(a){return!a.nameplateImage&&a.nameplateTextOnly===!0}const xe={min:24,max:320},kt={x:960,y:540},St={x:480,y:200};function He(a){return k(a.nameplateHeight)?Math.round(Math.min(xe.max,Math.max(xe.min,a.nameplateHeight))):void 0}function _a(a){return a.nameplateImage&&k(a.nameplateOpacity)&&a.nameplateOpacity<1?Math.max(0,a.nameplateOpacity):void 0}function Ia(a,e="--vn-ui-"){const s={},t=He(a),n=_a(a);return t&&(s[`${e}nameplate-height`]=`${t}px`),n!==void 0&&(s[`${e}nameplate-opacity`]=`${n}`),s}const xt={min:12,max:72};function Mt(a){return a.frameImage?0:.35}function Oe(a){return!!(a.textInsetLeft||a.textInsetRight||a.textOffsetY)}function Fe(a,e="--vn-ui-"){const s={},t=Ne(a),n=a.presentation==="gradient"?Te(a):void 0;return t&&(s[`${e}height`]=`${t}px`),n&&(s[`${e}gradient-width`]=`${n}%`),Oe(a)&&(s[`${e}text-left`]=`${Math.round(a.textInsetLeft||0)}px`,s[`${e}text-right`]=`${Math.round(a.textInsetRight||0)}px`,s[`${e}text-y`]=`${Math.round(a.textOffsetY||0)}px`),s}function $t(a){return Object.keys(Fe(a)).length>0}function N(a){const e=a?.preset&&a.preset!=="custom"?a.preset:"cinematic";return{...Sa[e],...a}}function $(a,e){const s=a.replace("#",""),t=s.length===3?s.split("").map(o=>o+o).join(""):s.padEnd(6,"0").slice(0,6),n=Number.parseInt(t,16);return Number.isFinite(n)?`rgba(${n>>16},${n>>8&255},${n&255},${Math.max(0,Math.min(1,e))})`:`rgba(11,11,14,${e})`}function Re(a){const e=(a?.customFontName||"").replace(/[^\w一-鿿-]/g,"").slice(0,40);return`LarchProjectFont${e?`-${e}`:""}`}function _(a,e){const s=String(a||"").toLowerCase();return s.startsWith("ja")?e?'"Noto Serif JP","Hiragino Mincho ProN","Yu Mincho"':'"Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic UI","Meiryo"':s.startsWith("ko")?e?'"Noto Serif KR","AppleMyungjo","Batang"':'"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic"':/^zh-(?:hans|cn|sg|my)/.test(s)?e?'"Noto Serif SC","Songti SC","SimSun"':'"PingFang SC","Noto Sans SC","Microsoft YaHei"':e?'"Noto Serif TC","Songti TC","PMingLiU"':'"Noto Sans TC","Microsoft JhengHei"'}function _t(a){const e=String(a||"").toLowerCase();return/^(?:ja|ko|zh-(?:hans|cn|sg|my))/.test(e)?`"Inter",${_(a,!1)},sans-serif`:""}function ja(a,e,s){return a==="custom"&&e?.customFontUrl?`"${Re(e)}",${_(s,!1)},sans-serif`:a==="serif"?`${_(s,!0)},serif`:a==="rounded"?`"M PLUS Rounded 1c",${_(s,!1).replace('"Noto Sans TC",',"")},sans-serif`:a==="iansui"?`"Iansui",${_(s,!1)},sans-serif`:`"Inter",${_(s,!1)},sans-serif`}const Ca="https://fonts.googleapis.com/css2?family=Iansui&display=swap",Ea="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap";function Aa(a){return a==="iansui"?Ca:a==="rounded"?Ea:""}function It(a){const e=new Set([N(a.settings?.dialogueUi).fontFamily]);for(const s of a.settings?.titleScreen?.layers||[])s.font&&e.add(s.font);for(const s of a.nodes||[])for(const t of[s.data?.stage,...(s.data?.dialogueLines||[]).map(n=>n.stage)])for(const n of t?.texts||[])n.font&&e.add(n.font);return[...new Set([...e].map(Aa).filter(Boolean))]}const Pa=[[/\.woff2($|\?)/i,"woff2"],[/\.woff($|\?)/i,"woff"],[/\.otf($|\?)/i,"opentype"],[/\.ttf($|\?)/i,"truetype"],[/^data:font\/woff2|^data:application\/font-woff2/i,"woff2"],[/^data:font\/woff|^data:application\/font-woff/i,"woff"],[/^data:font\/otf|^data:font\/opentype/i,"opentype"],[/^data:font\/ttf|^data:font\/truetype/i,"truetype"]];function La(a){if(a)return Pa.find(([e])=>e.test(a))?.[1]}function Ua(a,e=!1){const s=N(a);if(s.fontFamily!=="custom"&&!e||!s.customFontUrl)return;const t=La(s.customFontUrl);return{family:Re(s),source:`url(${JSON.stringify(s.customFontUrl)})${t?` format("${t}")`:""}`}}function jt(a,e=!1){const s=Ua(a,e);return s?`@font-face{font-family:"${s.family}";src:${s.source};font-display:swap}`:""}function Ct(a){const e=N(a);return{"--vn-ui-panel":$(e.panelColor,e.panelOpacity),"--vn-ui-panel-solid":$(e.panelColor,1),"--vn-ui-border-solid":$(e.borderColor,1),"--vn-ui-accent-solid":$(e.accentColor,1),"--vn-ui-text":e.textColor,"--vn-ui-speaker":e.speakerColor,"--vn-ui-accent":$(e.accentColor,e.accentOpacity??1),"--vn-ui-border":$(e.borderColor,.55),"--vn-ui-radius":`${e.borderRadius}px`,"--vn-ui-width":`${e.panelWidth}%`,"--vn-ui-padding":`${e.panelPadding}px`,"--vn-ui-offset":`calc(${e.panelOffset} * var(--vn-box-vh,1vh))`,"--vn-ui-font":ja(e.fontFamily,e),"--vn-ui-font-size":`${e.fontSize}px`,"--vn-ui-name-size":`${e.nameFontSize}px`,"--vn-ui-blur":`${e.backdropBlur}px`,"--vn-ui-frame":e.frameImage?`url("${e.frameImage}")`:"none",...Se(e)!==void 0?{"--vn-ui-frame-opacity":`${Se(e)}`}:{},"--vn-ui-nameplate":e.nameplateImage?`url("${e.nameplateImage}")`:"none","--vn-ui-nameplate-x":`${k(e.nameplateOffsetX)?e.nameplateOffsetX:0}px`,"--vn-ui-nameplate-y":`${k(e.nameplateOffsetY)?e.nameplateOffsetY:0}px`,"--vn-ui-nameplate-scale":`${k(e.nameplateScale)&&e.nameplateScale>0?e.nameplateScale:1}`,"--vn-ui-name-x":`${k(e.nameplateTextOffsetX)?e.nameplateTextOffsetX:0}px`,"--vn-ui-name-y":`${k(e.nameplateTextOffsetY)?e.nameplateTextOffsetY:0}px`,...Ia(e),"--vn-ui-choice":e.choiceFrameImage?`url("${e.choiceFrameImage}")`:"none",...e.textShadow===!1?{"--vn-ui-bubble-name-shadow":"none"}:{},...Fe(e)}}function Na(a){return a.trim().toLowerCase().replace(/^:+|:+$/g,"").replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,50)}function Et(a){return Na(a.emojiShortcode||a.variant||a.name)}function At(a){const e=typeof a.name=="string"?a.name.trim():"",s=e.replace(/\.(?:png|jpe?g|webp|gif|avif|svg)$/i,""),t=typeof a.emojiName=="string"?a.emojiName.trim():"";return(!a.category||a.category==="general"||a.category==="emoji")&&s===e?s||t:t||s}function Pt(a){const e=a.character?.trim();if(e)return e;const s=String(a.name||"").replace(/\.[a-z0-9]{2,5}$/i,"").trim(),t=a.variant?.trim();if(s&&t&&s!==t){const n=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=s.replace(new RegExp(`[\\s_-・／/]+${n}$`,"i"),"").trim();if(o)return o}return s||t||""}const Lt={"https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/cloudforge-academy/props/1786295511278_01-thunderbird-automaton.png":"/assets/thumbnails/props/cloudforge-prop-thunderbird.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/glass-dune-caravan/props/1786295538760_01-heat-map-beetle.png":"/assets/thumbnails/props/glass-dune-prop-heat-map-beetle.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/greek-mythology-odyssey/props/1786295572395_01-branching-thunderbolt.png":"/assets/thumbnails/props/greek-prop-thunderbolt.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/greek-mythology-odyssey/props/1786295574181_02-owl-aegis-shield.png":"/assets/thumbnails/props/greek-prop-aegis.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/greek-mythology-odyssey/props/1786295575974_03-wandering-poet-lyre.png":"/assets/thumbnails/props/greek-prop-lyre.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/greek-mythology-odyssey/props/1786295577814_04-pomegranate-reliquary.png":"/assets/thumbnails/props/greek-prop-pomegranate.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132347409_01-moon-compass.png":"/assets/thumbnails/props/kemonomimi-prop-moon-compass.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132349127_02-arctic-courier-satchel.png":"/assets/thumbnails/props/kemonomimi-prop-arctic-courier-satchel.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132350644_03-rabbit-cake-box.png":"/assets/thumbnails/props/kemonomimi-prop-rabbit-cake-box.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132352269_04-ermine-mail-seal.png":"/assets/thumbnails/props/kemonomimi-prop-ermine-mail-seal.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132353793_05-snow-leopard-climbing-badge.png":"/assets/thumbnails/props/kemonomimi-prop-snow-leopard-climbing-badge.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132355396_06-antler-tuning-fork.png":"/assets/thumbnails/props/kemonomimi-prop-antler-tuning-fork.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132357151_07-sea-glass-specimen-kit.png":"/assets/thumbnails/props/kemonomimi-prop-sea-glass-specimen-kit.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132358752_08-raven-cipher-card.png":"/assets/thumbnails/props/kemonomimi-prop-raven-cipher-card.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132360424_09-calico-coffee-set.png":"/assets/thumbnails/props/kemonomimi-prop-calico-coffee-set.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132362309_10-tanuki-festival-mask.png":"/assets/thumbnails/props/kemonomimi-prop-tanuki-festival-mask.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132363920_11-axolotl-sample-capsule.png":"/assets/thumbnails/props/kemonomimi-prop-axolotl-sample-capsule.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132365308_12-bat-library-key.png":"/assets/thumbnails/props/kemonomimi-prop-bat-library-key.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132366798_13-acorn-letter-tube.png":"/assets/thumbnails/props/kemonomimi-prop-acorn-letter-tube.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132368377_14-shark-rescue-device.png":"/assets/thumbnails/props/kemonomimi-prop-shark-rescue-device.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/japanese-anime-kemonomimi/props/1787132369895_15-dragon-prism-tool.png":"/assets/thumbnails/props/kemonomimi-prop-dragon-prism-tool.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841841177_01-ruyi-jingu-bang.png":"/assets/thumbnails/props/jtw-prop-01.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841842781_02-moonlight-treasure-box.png":"/assets/thumbnails/props/jtw-prop-02.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841844381_03-buddhist-scripture-bundle.png":"/assets/thumbnails/props/jtw-prop-03.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841846129_04-kasaya-robe.png":"/assets/thumbnails/props/jtw-prop-04.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841847589_05-somersault-cloud.png":"/assets/thumbnails/props/jtw-prop-05.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841849079_06-diamond-snare-ring.png":"/assets/thumbnails/props/jtw-prop-06.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841850624_07-golden-fillet.png":"/assets/thumbnails/props/jtw-prop-07.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841852235_08-nine-toothed-rake.png":"/assets/thumbnails/props/jtw-prop-08.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841853622_09-demon-subduing-staff.png":"/assets/thumbnails/props/jtw-prop-09.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841855120_10-banana-leaf-fan.png":"/assets/thumbnails/props/jtw-prop-10.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841856762_11-purple-gold-gourd.png":"/assets/thumbnails/props/jtw-prop-11.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841858269_12-jade-purification-vase.png":"/assets/thumbnails/props/jtw-prop-12.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841859691_13-demon-revealing-mirror.png":"/assets/thumbnails/props/jtw-prop-13.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841860973_14-fire-tip-spear.png":"/assets/thumbnails/props/jtw-prop-14.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841862564_15-golden-lotus-seat.png":"/assets/thumbnails/props/jtw-prop-15.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1784841864066_16-immortal-peach.png":"/assets/thumbnails/props/jtw-prop-16.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1786295604424_17-ginseng-fruit.png":"/assets/thumbnails/props/jtw-prop-ginseng-fruit.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/journey-to-the-west/props/1786295605906_18-plantain-fan.png":"/assets/thumbnails/props/jtw-prop-plantain-fan.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113300589_01-wind-recurve-bow.png":"/assets/thumbnails/props/korean-webtoon-prop-wind-recurve-bow.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113301912_02-fracture-hunter-sword.png":"/assets/thumbnails/props/korean-webtoon-prop-fracture-hunter-sword.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113303452_03-spirit-reliquary.png":"/assets/thumbnails/props/korean-webtoon-prop-spirit-reliquary.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113304953_04-trauma-pouch.png":"/assets/thumbnails/props/korean-webtoon-prop-trauma-pouch.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113306461_05-detective-evidence-kit.png":"/assets/thumbnails/props/korean-webtoon-prop-detective-evidence-kit.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113307971_06-negotiation-folio.png":"/assets/thumbnails/props/korean-webtoon-prop-negotiation-folio.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113309432_07-hex-drone-core.png":"/assets/thumbnails/props/korean-webtoon-prop-hex-drone-core.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113310797_08-cyber-tablet-keyboard.png":"/assets/thumbnails/props/korean-webtoon-prop-cyber-tablet-keyboard.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113312543_09-rescue-rope-kit.png":"/assets/thumbnails/props/korean-webtoon-prop-rescue-rope-kit.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113313833_10-holy-knight-reliquary-sword.png":"/assets/thumbnails/props/korean-webtoon-prop-holy-knight-reliquary-sword.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113315187_11-covert-baton-earpiece.png":"/assets/thumbnails/props/korean-webtoon-prop-covert-baton-earpiece.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113316650_12-antidote-apothecary-satchel.png":"/assets/thumbnails/props/korean-webtoon-prop-antidote-apothecary-satchel.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113318059_13-dream-coffee-key.png":"/assets/thumbnails/props/korean-webtoon-prop-dream-coffee-key.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113319403_14-desert-compass-glaive.png":"/assets/thumbnails/props/korean-webtoon-prop-desert-compass-glaive.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/korean-webtoon-ensemble/props/1788113320842_15-polar-anemometer-scanner.png":"/assets/thumbnails/props/korean-webtoon-prop-polar-anemometer-scanner.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/midnight-frequency/props/1786295624469_01-blue-circle-cassette.png":"/assets/thumbnails/props/midnight-frequency-prop-blue-circle-cassette.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/mist-harbor-files/props/1786295634274_01-tide-ledger-compass.png":"/assets/thumbnails/props/mist-harbor-prop-tide-compass.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/mosslight-clinic/props/1786295647029_01-pulse-fern-capsule.png":"/assets/thumbnails/props/mosslight-prop-pulse-fern.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/starline-teahouse/props/1786295667068_01-memory-gaiwan.png":"/assets/thumbnails/props/starline-prop-memory-gaiwan.webp","https://pub-4b20b43f5acf4dfaa3f6ab842daa51cf.r2.dev/2d3b0242-9a6d-4051-9825-46aa4efd064a/larch/built-in-assets/packs/tideglass-conservatory/props/1786295681870_01-pelagic-seed-vault.png":"/assets/thumbnails/props/tideglass-prop-pelagic-seed-vault.webp"};export{xe as $,et as A,ee as B,at as C,ct as D,Pt as E,La as F,Re as G,Et as H,At as I,tt as J,ye as K,We as L,Na as M,w as N,bt as O,Da as P,Xa as Q,Ra as R,xt as S,Ne as T,Te as U,Oa as V,kt as W,St as X,wt as Y,$a as Z,Mt as _,ge as a,He as a0,xa as a1,Ja as a2,Wa as a3,Za as a4,Ya as a5,_t as a6,ot as a7,rt as a8,st as a9,lt as aa,Qa as ab,pt as ac,Fa as ad,Pe as ae,W as af,Ga as ag,Q as ah,it as ai,$ as aj,Se as ak,Ma as al,Oe as am,Ia as an,Fe as ao,nt as ap,Ba as aq,Ka as ar,yt as b,dt as c,ht as d,$t as e,vt as f,Ct as g,Va as h,za as i,Ua as j,jt as k,ft as l,Aa as m,It as n,Ve as o,I as p,qa as q,N as r,ya as s,ja as t,mt as u,gt as v,Lt as w,Sa as x,L as y,ut as z};
