const xe='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}:root{--panel-bg:#eeeeea;--panel-fg:#262724}:root[data-theme="dark"]{--panel-bg:#2b2c31;--panel-fg:#f2f3f5}.panel{display:inline-block;padding:12px;border-radius:12px;background:var(--panel-bg);color:var(--panel-fg);font:14px Inter,"Noto Sans TC",system-ui,sans-serif}</style></head><body><div class="panel" id="hp">HP</div><script>addEventListener("message",function(e){if(e.source!==parent)return;var d=e.data;if(!d||!["larch:hud:init","larch:hud:update"].includes(d.type))return;document.documentElement.dataset.theme=d.theme;document.getElementById("hp").textContent="HP "+(d.variables.hp??0)});parent.postMessage({type:"larch:ready"},"*");<\/script></body></html>',ne=`<!doctype html>
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
<\/script></body></html>`;function oe(s){const e=JSON.stringify({id:"my-status-hud",name:"Status HUD",author:"Your name",version:"1.0.0",categories:["ui"],permissions:["player:ui","variables:read"],cards:[],huds:[{id:"status-bar",title:"HP",anchor:"top-left",width:180,height:48,offsetX:16,offsetY:80,interactive:!1,readVariables:["hp"],html:xe}]},null,2);return s?`## 遊戲常駐 UI（HUD）

在 manifest 宣告 \`huds\` 與 \`player:ui\` 權限，即可在遊戲角落放跨卡片保留的 UI。可以只提供 HUD，\`cards: []\` 合法，不需要 worker 或流程卡。

\`\`\`json
${e}
\`\`\`

- 每個擴充功能最多 8 個 HUD，每份 html 最多 400,000 字元。id 在擴充功能內唯一（3–60 字，小寫英數與連字號），title 是可存取的 iframe 名稱，titleEn 可選。
- anchor：top-left / top-right / bottom-left / bottom-right，預設 top-right。width / height 是 CSS 像素，32–640，預設 220 × 96；offsetX / offsetY 是從該角落算起的邊距，0–240，預設 16 / 80。小螢幕會縮限到可用範圍並避開安全區。
- interactive 預設 false：UI 只顯示、不攔截滑鼠、觸控或鍵盤焦點。設 true 後只攔截自己矩形範圍內的操作。透明的 iframe 區域仍屬於該矩形；請讓尺寸貼合內容，可用 resize 收合選單。UI 不會阻止劇情自行推進。
- readVariables / writeVariables 是故事變數「名稱」白名單，並分別需要 variables:read / variables:write。請先在專案建立這些變數；沒有宣告的變數不會傳入，未知變數、物件、NaN 與無限值不接受寫入。settings 的預設值與專案設定透過 values 傳入。
- readVariables、writeVariables 各最多 64 項（去掉重複後計算），超過的部分會被忽略，匯入與發布時會顯示警告。readVariables 可以寫前綴：\`"xn_*"\`（* 只能放在最後，前面至少一個字）會在遊戲中讀到所有以 xn_ 開頭的故事變數，一個前綴算一項；同一個 HUD 的所有前綴合計最多傳入 512 個變數（依變數名稱排序取前 512 個）。writeVariables 不支援前綴，可寫入的變數必須逐一列出。
- visibleVariable 可指定一個故事變數控制顯示，需要 variables:read。變數不存在或值為 false、0、空字串、"false"、"0" 時隱藏；其他值顯示。隱藏不銷毀 iframe；要把值也傳入沙盒，另列入 readVariables。

### HUD 訊息

先註冊 message 監聽器，再送 \`parent.postMessage({type:'larch:ready'}, '*')\`。

宿主回覆 \`larch:hud:init\`；換卡、換白板、讀檔、故事變數、語言或主題變動時送 \`larch:hud:update\`。兩者都有：\`{type, plugin, hud, values, variables, cardId, boardId, locale, theme, active}\`。theme 是 light 或 dark。只讀當下白板可用、且宣告可讀的變數。active=false 時請暫停自己的動畫與計時器；原生設定／存讀檔／歷史面板打開時 HUD 會隱藏並禁止寫入。

HUD 可送 \`{type:'larch:set', name:'hp', value:80}\` 更新授權變數；可送 \`{type:'larch:hud:resize', width:220, height:160}\` 調整自身矩形（仍受 32–640 與視窗範圍限制）。HUD **不需要送 larch:complete**；complete、跳卡等流程控制訊息會被忽略。

### 生命週期與交付

同一輪播放換卡、換白板、改變數時保留 iframe 與內部狀態。返回標題、關閉播放或重新開始時重新建立；讀檔以故事變數同步，必須保存的狀態請寫進授權的故事變數，不能依賴沙盒 localStorage。

從「我的素材」把擴充功能導入專案時，會把 HUD 執行內容、版號、權限與設定預設值保存到 \`project.settings.plugins[pluginId].playback\`。分享／市集播放與 Web HTML／Windows 網頁播放器匯出使用這份快照，不要求玩家安裝擴充功能，也不自動跟隨市集更新。更新 HUD 版本請先移除專案中的擴充功能再重新導入；專案設定值會保留。直接透過專案 API 編寫者也要帶上 \`{enabled:true, playback:{version,permissions,huds,defaults:{}}}\`，只開 enabled 不會下載執行內容。原生 Unity／Godot／Unreal／Ren'Py runtime 不執行 HTML HUD。

HTML 在 sandbox="allow-scripts" 的 iframe 執行，不可存取主頁 DOM。請將 CSS、JS 與必要素材內嵌；HUD 不提供自動打包外部網址的功能。請依 theme 切換配色，固定背景必須配前景色，文字至少 4.5:1、控制邊界至少 3:1，並提供 hover、focus、active、disabled 樣式。

### 透明背景標準（必須遵守）

HUD 的框蓋在遊戲畫面上，框裡沒畫東西的地方必須透出底下的舞台，不能是一整塊白底或黑底。

- \`html\` 與 \`body\` 的背景一律 \`transparent\`。面板、按鈕的底色畫在裡面的元素（例如 \`.panel\`）上，並且同一條規則裡配好前景色。
- 不要寫死 color-scheme：CSS 裡不要有 \`color-scheme: light\`／\`dark\`，不要加 \`<meta name="color-scheme">\`，script 也不要改 \`colorScheme\`。框的 color-scheme 由平台依網站主題設定，並替 HUD 補上對應的 meta；HUD 自己另外指定，兩邊不一致時瀏覽器會在框底鋪一層不透明的白底或黑底。
- 淺色／深色交給平台：讀 \`larch:hud:init\`／\`larch:hud:update\` 的 \`theme\`，設在 \`document.documentElement.dataset.theme\`，用 \`:root[data-theme="dark"]\` 切換顏色；不要依賴 \`prefers-color-scheme\`（它不一定跟網站主題一致）。
- 框的尺寸貼合內容；需要展開時用 \`larch:hud:resize\`。

可直接複製的骨架：

\`\`\`html
${ne}
\`\`\`

可匯入的互動範例：/plugin-examples/persistent-status.larch-plugin.json。先建立數值變數 hp=60、potions=3，再把擴充功能導入專案即可。
`:`## Persistent game UI (HUD)

Declare \`huds\` and permission \`player:ui\` to mount corner UI across story cards. HUD-only plugins use \`cards: []\`; no worker or flow card is needed.

\`\`\`json
${e}
\`\`\`

- Up to 8 HUDs per plugin, 400,000 characters of HTML each. IDs must be unique within the plugin (3–60 lowercase letters, digits and hyphens). title labels the frame; titleEn is optional.
- anchor: top-left / top-right / bottom-left / bottom-right (default top-right). width/height: 32–640 CSS pixels, defaults 220/96. offsetX/offsetY: corner margins 0–240, defaults 16/80. Frames are clamped to small viewports and safe areas.
- interactive defaults to false: display-only UI does not intercept pointer/touch input or keyboard focus. true enables interaction inside the frame rectangle only; transparent pixels still intercept input. Keep the frame tightly sized and resize it when expanding/collapsing. Story auto-advance continues.
- readVariables/writeVariables list exact story variable names and require variables:read/variables:write respectively. Create those variables in the project first. Undeclared values are withheld; unknown variables, objects and non-finite numbers cannot be written. Plugin setting defaults plus project settings arrive as values.
- readVariables and writeVariables hold up to 64 entries each (after removing duplicates); extra entries are ignored and import/publish shows a warning. readVariables also accepts a prefix: \`"xn_*"\` (the * must come last, after at least one character) reads every story variable starting with xn_ during play and counts as one entry. All prefixes of one HUD together deliver at most 512 variables (the first 512 by name). writeVariables does not accept prefixes; list every writable variable by name.
- visibleVariable optionally controls visibility and requires variables:read. Missing, false, 0, empty string, "false", "0" hide the HUD without destroying it. Add the name to readVariables as well if the sandbox needs its value.

Register a message listener before posting \`{type:'larch:ready'}\` to parent. The host replies with \`larch:hud:init\`, then \`larch:hud:update\` on card, board, save-load, variable, locale or theme changes. Both contain \`{type,plugin,hud,values,variables,cardId,boardId,locale,theme,active}\`. theme is light/dark. Only readable variables available in the current board are sent. Pause animations/timers when active=false. Native settings/save/history panels hide HUDs and block their writes.

Send \`{type:'larch:set',name:'hp',value:80}\` to write an allowed variable; send \`{type:'larch:hud:resize',width:220,height:160}\` to resize within the same bounds. HUDs **do not send larch:complete**; complete/jump messages cannot advance the story.

The iframe survives cards, boards and variable changes during a play session. Returning to title, closing playback or starting a new game recreates it. Saves restore story variables; store durable state there rather than in sandbox localStorage.

Importing a plugin into a project snapshots its HUD HTML, version, permissions and setting defaults in \`project.settings.plugins[pluginId].playback\`. Shared/marketplace playback and Web HTML/Windows web-player exports use that snapshot without viewer installation or registry updates. To adopt a new HUD version, remove the plugin from the project and import it again; project setting values are retained. Direct project API authors must include \`{enabled:true,playback:{version,permissions,huds,defaults:{}}}\`; enabled alone does not fetch code. Native Unity/Godot/Unreal/Ren'Py runtimes do not execute HTML HUDs.

The HTML runs inside sandbox="allow-scripts" and cannot access the parent DOM. Inline CSS, JS and required assets; external URLs are not automatically bundled. Support light/dark theme messages, paired foreground/background colors, text contrast >=4.5:1, control boundaries >=3:1, and hover/focus/active/disabled states.

### Transparent background standard (required)

The HUD frame sits on top of the game. Wherever the HUD draws nothing, the stage must show through — never a solid white or black box.

- \`html\` and \`body\` backgrounds are always \`transparent\`. Paint panel and button backgrounds on inner elements (e.g. \`.panel\`), with the paired foreground colour in the same rule.
- Never hardcode color-scheme: no \`color-scheme: light\`/\`dark\` in CSS, no \`<meta name="color-scheme">\`, no script setting \`colorScheme\`. The platform sets the frame's color-scheme from the site theme and adds the matching meta for you; if the HUD declares a different one, the browser paints an opaque white or black backdrop behind the whole frame.
- Let the platform drive light/dark: read \`theme\` from \`larch:hud:init\`/\`larch:hud:update\`, store it in \`document.documentElement.dataset.theme\` and switch colours with \`:root[data-theme="dark"]\`. Do not rely on \`prefers-color-scheme\` (it may not match the site theme).
- Size the frame to its content; use \`larch:hud:resize\` to expand.

Copy-paste skeleton:

\`\`\`html
${ne}
\`\`\`

Importable interactive example: /plugin-examples/persistent-status.larch-plugin.json. Create number variables hp=60 and potions=3, then import the plugin into the project.
`}const Me="linear(0,.047,.157,.293,.432,.561,.673,.766,.84,.896,.937,.966,.986,.999,1.006,1.01,1.011,1.011,1.01,1.008,1.007,1.005,1.004,1.003,1)",Ie="linear(0,.103,.333,.594,.823,.991,1.091,1.132,1.131,1.106,1.071,1.037,1.01,.993,.984,.982,.984,.988,.993,.997,1,1.002,1.002,1.002,1)",ie=`:root {
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
    --larch-spring: ${Me};
    --larch-spring-pop: ${Ie};
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
}`,re=`function spring(from, to, onFrame, opts) {
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
}`;function le(s){return s?`## Larch 介面風格（一定要照做）

擴充功能看起來要像 Larch 本來就有的功能，不是另一個網站。Larch 的風格是**中性、安靜、以內容為主**：白底或深灰底、近黑文字、細灰邊框、小圓角、柔和的 spring 動畫。

**直接把下面這段 CSS 放進每一份 html 的 \`<style>\` 開頭**，再用這些變數與 class 寫你的介面：

\`\`\`css
${ie}
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
${re}
\`\`\`

- **尊重 \`prefers-reduced-motion\`**：上面的 CSS 與 \`spring()\` 都已經處理，自己寫的 \`requestAnimationFrame\` 動畫也要檢查。
- 動畫是為了讓操作有回饋，不是裝飾：不要無限循環的呼吸燈、不要整個畫面晃動、一次只讓一個東西彈。

`:`## Larch interface style (required)

A plugin should look like a feature Larch already has, not a different website. Larch is **neutral, quiet and content-first**: white or dark-grey surfaces, near-black text, thin grey borders, small radii and soft spring motion.

**Paste this CSS at the top of every html \`<style>\`** and build your interface on these variables and classes:

\`\`\`css
${ie}
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
${re}
\`\`\`

- **Respect \`prefers-reduced-motion\`**: the CSS and \`spring()\` above already do; check it in any \`requestAnimationFrame\` animation you write yourself.
- Motion is feedback, not decoration: no infinite breathing glows, no whole-screen shakes, only one thing bouncing at a time.

`}const me=["card","system","animation","render3d","live2d","physics","map","ui","tool"],S={card:{zh:"自訂卡片",en:"Custom cards",hintZh:"在白板上多一種卡片型別",hintEn:"Adds a new card type to the board"},system:{zh:"遊戲系統",en:"Game systems",hintZh:"背包、任務、好感度之類的機制",hintEn:"Inventory, quests, affinity and friends"},animation:{zh:"動畫演出",en:"Animation",hintZh:"轉場、鏡頭與立繪動態",hintEn:"Transitions, camera and portrait motion"},render3d:{zh:"3D 模組",en:"3D",hintZh:"3D 場景、模型與空間演出",hintEn:"3D scenes, models and spatial staging"},live2d:{zh:"Live2D 模組",en:"Live2D",hintZh:"骨架立繪與口型同步",hintEn:"Rigged portraits and lip-sync"},physics:{zh:"物理系統",en:"Physics",hintZh:"碰撞、重力與擬真互動",hintEn:"Collision, gravity and physical toys"},map:{zh:"地圖探索",en:"Maps",hintZh:"RPG 地圖、格子移動與探索",hintEn:"RPG maps, grid movement, exploration"},ui:{zh:"介面元件",en:"Interface",hintZh:"狀態列、選單與 HUD",hintEn:"Status bars, menus and HUD"},tool:{zh:"創作工具",en:"Authoring tools",hintZh:"給作者用的輔助，不會演給玩家看",hintEn:"Helpers for the author, not the player"}},fe=["variables:read","variables:write","assets:read","characters:read","flow:control","cards:read","cards:write","project:read","ui:contribute","save:hook","theme:write","player:ui"],de={"player:ui":{zh:"顯示遊戲常駐介面",en:"Show persistent game UI",hintZh:"在遊戲角落顯示跨卡片保留的介面；互動限於宣告的範圍",hintEn:"Shows UI across story cards; interaction stays within its declared bounds"},"variables:read":{zh:"讀取故事變數",en:"Read story variables",hintZh:"僅限卡片勾選或常駐 UI 宣告的變數",hintEn:"Only variables selected on a card or declared by a HUD"},"variables:write":{zh:"寫入故事變數",en:"Write story variables",hintZh:"僅限卡片授權或常駐 UI 宣告的變數",hintEn:"Only variables authorised on a card or declared by a HUD"},"assets:read":{zh:"使用專案素材",en:"Use project assets",hintZh:"取得作者挑給它的圖片與音訊網址",hintEn:"Gets URLs for the assets you hand it"},"characters:read":{zh:"讀取角色資料",en:"Read characters",hintZh:"角色名稱與立繪網址",hintEn:"Character names and portrait URLs"},"flow:control":{zh:"推進故事",en:"Advance the story",hintZh:"演完之後讓故事往下一張卡走",hintEn:"Moves to the next card when it finishes"},"cards:read":{zh:"讀取白板卡片",en:"Read board cards",hintZh:"看得到這張白板上的卡片與連線",hintEn:"Sees the cards and links on the open board"},"cards:write":{zh:"修改白板卡片",en:"Edit board cards",hintZh:"可以新增、改寫、搬動或刪除卡片",hintEn:"Can add, rewrite, move or delete cards"},"project:read":{zh:"讀取專案資料",en:"Read the project",hintZh:"專案名稱、白板清單、變數與角色",hintEn:"Project name, boards, variables and characters"},"ui:contribute":{zh:"加入介面項目",en:"Add interface items",hintZh:"在右鍵選單、工具列或面板加入自己的項目",hintEn:"Adds items to context menus, the toolbar or panels"},"save:hook":{zh:"在存檔時執行",en:"Run on save",hintZh:"每次存檔前後可以做自己的事，例如留快照",hintEn:"Runs around each save — snapshots, exports, checks"},"theme:write":{zh:"調整介面外觀",en:"Restyle the interface",hintZh:"換編輯器的配色與圓角等外觀變數",hintEn:"Changes editor colours, radii and similar tokens"}},Ye=["variables:read","variables:write","assets:read","characters:read","flow:control","player:ui"],ge=["puzzle","backpack","box","boxes","coins","compass","cpu","dices","grid","layers","map","move3d","music","orbit","palette","person","scroll","shapes","sparkles","swords","timer","trophy","wand","zap","lock","quiz"],$e=["text","longText","number","toggle","select","color","asset","assets","character","variable","storyCard"],Ee=["settings","storage","variable"],Ae=["any","image","audio","video","background","character","expression","bgm","sfx","ui"],Te=["top-left","top-right","bottom-left","bottom-right"],D=8,Le=["cardMenu","canvasMenu","toolbar","inspector","navbar","topRight","bottomLeft","bottomRight"],Xe={cardMenu:{zh:"卡片右鍵選單",en:"Card context menu"},canvasMenu:{zh:"白板右鍵選單",en:"Board context menu"},toolbar:{zh:"白板工具列",en:"Board toolbar"},inspector:{zh:"卡片編輯器",en:"Card inspector"},navbar:{zh:"左上角專案列",en:"Project bar (top left)"},topRight:{zh:"右上角播放旁",en:"Next to Play (top right)"},bottomLeft:{zh:"左下角說明旁",en:"Next to Help (bottom left)"},bottomRight:{zh:"右下角檢視工具",en:"View controls (bottom right)"}},Qe=["toolbar","navbar","topRight","bottomLeft","bottomRight"],ce=4,Ue=["modal","side","settings"],Pe=["medium","large","full"],je=new Set(["Mod+A","Mod+C","Mod+D","Mod+E","Mod+F","Mod+G","Mod+H","Mod+J","Mod+K","Mod+L","Mod+M","Mod+N","Mod+O","Mod+P","Mod+Q","Mod+R","Mod+S","Mod+T","Mod+U","Mod+V","Mod+W","Mod+X","Mod+Y","Mod+Z","Mod+Shift+G","Mod+Shift+Z","Mod+Shift+N","Mod+Shift+T","Mod+Shift+W","Mod+Shift+R","Mod+Shift+J","Mod+Shift+I","Mod+Shift+C","Mod+Shift+B","Mod+Shift+O","Mod+Shift+Q","Mod+Alt+I","Mod+Alt+J","Mod+Shift+A","Mod+Shift+D","Mod+Shift+E","Mod+Shift+H","Mod+Shift+K","Mod+Shift+M","Mod+Shift+P","Mod+Shift+S","Mod+Shift+Y","Mod+0","Mod+1","Mod+2","Mod+3","Mod+4","Mod+5","Mod+6","Mod+7","Mod+8","Mod+9","Alt+D","Alt+E","Alt+F","Alt+F4","Mod+F4","Mod+F5","F1","F3","F5","F6","F7","F10","F11","F12"]),Ne={mod:"Mod",cmd:"Mod",command:"Mod",meta:"Mod",ctrl:"Mod",control:"Mod",alt:"Alt",option:"Alt",opt:"Alt",shift:"Shift"};function Ce(s){const e=s.split("+").map(i=>i.trim()).filter(Boolean);if(!e.length)return{error:"快捷鍵是空的"};const a=new Set;for(const i of e.slice(0,-1)){const r=Ne[i.toLowerCase()];if(!r)return{error:`不認得的按鍵「${i}」，修飾鍵只能用 Mod、Alt、Shift`};a.add(r)}const t=e[e.length-1],n=/^[a-z0-9]$/i.test(t)||/^f([1-9]|1[0-2])$/i.test(t)?t.toUpperCase():"";if(!n)return{error:`「${t}」不能當快捷鍵，請用 A–Z、0–9 或 F1–F12`};if(!a.has("Mod")&&!a.has("Alt")&&!/^F/.test(n))return{error:"快捷鍵至少要有 Mod 或 Alt，例如 Alt+Shift+K"};const o=[...["Mod","Alt","Shift"].filter(i=>a.has(i)),n].join("+");return je.has(o)?{error:`${o} 已經被 Larch 或瀏覽器用掉了，請換一組，例如 Alt+Shift+K`}:{shortcut:o}}function et(s,e,a){const t=s.split("+"),n=t[t.length-1];return(a?e.metaKey:e.ctrlKey)!==t.includes("Mod")||e.altKey!==t.includes("Alt")||e.shiftKey!==t.includes("Shift")||a&&e.ctrlKey?!1:/^[A-Z]$/.test(n)?e.code===`Key${n}`:/^[0-9]$/.test(n)?e.code===`Digit${n}`:e.key.toUpperCase()===n}function tt(s,e){const a=s.split("+");return e?a.map(t=>t==="Mod"?"⌘":t==="Alt"?"⌥":t==="Shift"?"⇧":t).join(""):a.map(t=>t==="Mod"?"Ctrl":t).join("+")}const He=["project:open","project:save","card:change"],at={"project:open":{zh:"打開專案時",en:"When a project opens"},"project:save":{zh:"每次存檔時",en:"On every save"},"card:change":{zh:"卡片被改動時",en:"When a card changes"}},st=["larch-inventory"],H=/^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/,k=/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/,M=4e5,Ve=12e5,A=12,$=64,_e=512,F=s=>s.length>1&&s.endsWith("*")&&!s.slice(0,-1).includes("*"),nt=["larch-plugin.json","plugin.json","manifest.json"],V=s=>ge.includes(s),l=(s,e)=>typeof s=="string"?s.slice(0,e):"",y=s=>Array.isArray(s)?s:[];function be(s,e,a){const t=s||{},n=l(t.key,40);if(!k.test(n))return e.push(`${a}: 欄位 key「${n||"(空白)"}」無效，只能用英數與底線且開頭為英文字母`),null;const o=$e.includes(t.kind)?t.kind:"text",i=y(t.options).slice(0,40).map(g=>{const h=g||{};return{value:l(h.value,80),label:l(h.label,80)||l(h.value,80),labelEn:l(h.labelEn,80)||void 0}}).filter(g=>g.value),r=o==="select"&&t.optionsFrom!==void 0?Fe(t.optionsFrom,e,`${a}: 欄位「${n}」的 optionsFrom`):void 0;if(o==="select"&&!i.length&&!r)return e.push(`${a}: 欄位「${n}」是 select，但沒有給 options（或 optionsFrom）`),null;t.optionsFrom!==void 0&&o!=="select"&&e.push(`${a}: 欄位「${n}」不是 select，不能用 optionsFrom`);const d=t.row===void 0?"":l(t.row,40);t.row!==void 0&&!k.test(d)&&e.push(`${a}: 欄位「${n}」的 row「${d||"(空白)"}」要是英數與底線的名稱`);const c=t.width;c!==void 0&&(typeof c!="number"||!Number.isFinite(c)||c<=0||c>12)&&e.push(`${a}: 欄位「${n}」的 width 要是大於 0、不超過 12 的數字（同一列照比例分寬度）`),t.showIfMode!==void 0&&t.showIfMode!=="hide"&&t.showIfMode!=="disable"&&e.push(`${a}: 欄位「${n}」的 showIfMode 只能是 hide 或 disable`);const u=typeof t.defaultValue=="string"||typeof t.defaultValue=="number"||typeof t.defaultValue=="boolean"?t.defaultValue:void 0;t.itemControls!==void 0&&o!=="assets"&&e.push(`${a}: 欄位「${n}」不是 assets，不能用 itemControls`);const m=o==="assets"&&t.itemControls!==void 0?De(t.itemControls,e,`${a}: 欄位「${n}」的 itemControls`):[];return{key:n,label:l(t.label,80)||n,labelEn:l(t.labelEn,80)||void 0,kind:o,hint:l(t.hint,200)||void 0,hintEn:l(t.hintEn,200)||void 0,placeholder:l(t.placeholder,120)||void 0,options:o==="select"&&i.length?i:void 0,min:typeof t.min=="number"?t.min:void 0,max:typeof t.max=="number"?t.max:void 0,step:typeof t.step=="number"?t.step:void 0,assetKind:(o==="asset"||o==="assets")&&Ae.includes(t.assetKind)&&t.assetKind!=="any"?t.assetKind:void 0,assetValue:(o==="asset"||o==="assets")&&(t.assetValue==="name"||t.assetValue==="id")?t.assetValue:void 0,defaultValue:o==="toggle"?!!u:u,...t.showIf!==void 0?Re(t.showIf,e,`${a}: 欄位「${n}」的 showIf`):{},...t.showIfMode==="disable"?{showIfMode:"disable"}:{},...r?{optionsFrom:r}:{},...d&&k.test(d)?{row:d}:{},...d&&typeof c=="number"&&c>0&&c<=12?{width:c}:{},...m.length?{itemControls:m}:{}}}const O=4,N=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0;function De(s,e,a){if(!Array.isArray(s))return e.push(`${a} 必須是陣列，例如 [{ "key": "volume", "label": "音量", "kind": "number", "min": 0, "max": 100 }]`),[];s.length>O&&e.push(`${a} 最多 ${O} 個`);const t=new Set;return s.slice(0,O).flatMap((n,o)=>{const i=n||{},r=l(i.key,40);if(!k.test(r))return e.push(`${a}[${o}]: key「${r||"(空白)"}」無效，只能用英數與底線且開頭為英文字母`),[];if(t.has(r))return e.push(`${a}[${o}]: key「${r}」重複了`),[];i.kind!==void 0&&i.kind!=="number"&&e.push(`${a}[${o}]: kind 目前只能是 number`),t.add(r);let d=N(i.min),c=N(i.max);d!==void 0&&c!==void 0&&d>c&&(e.push(`${a}[${o}]: min 不能大於 max`),d=c=void 0);const u=N(i.step);let m=N(i.defaultValue);return m!==void 0&&(m=Math.min(c??1/0,Math.max(d??-1/0,m))),[{key:r,label:l(i.label,40)||r,labelEn:l(i.labelEn,40)||void 0,kind:"number",...d!==void 0?{min:d}:{},...c!==void 0?{max:c}:{},...u!==void 0&&u>0?{step:u}:{},...m!==void 0?{defaultValue:m}:{}}]})}function ot(s){return String(s??"").split(/\r?\n/).flatMap(e=>{const a=e.indexOf("	"),t=(a<0?e:e.slice(0,a)).trim();if(!t)return[];const n={};if(a>=0)try{const o=JSON.parse(e.slice(a+1));if(o&&typeof o=="object"&&!Array.isArray(o))for(const[i,r]of Object.entries(o))k.test(i)&&typeof r=="number"&&Number.isFinite(r)&&(n[i]=r)}catch{}return[{entry:t,meta:n}]})}const it=s=>s.map(({entry:e,meta:a})=>Object.keys(a).length?`${e}	${JSON.stringify(a)}`:e).join(`
`),x=s=>typeof s=="string"||typeof s=="number"||typeof s=="boolean",ye=/^[A-Za-z0-9_-]{1,40}(\.[A-Za-z0-9_-]{1,40}){0,5}$/,he=4,Oe='{ "field": "mode", "equals": "advance" }';function q(s,e,a,t=!1,n=0){if(!s||typeof s!="object"||Array.isArray(s)){e.push(`${a} 必須是物件，例如 ${Oe}`);return}const o=s,i=["all","any"].filter(h=>o[h]!==void 0);if(i.length){const[h]=i,v=o[h];if(i.length>1||["field","setting","equals","notEquals","in"].some(w=>o[w]!==void 0)){e.push(`${a}: all 或 any 要單獨寫，條件放在陣列裡`);return}if(n>=he){e.push(`${a}: all／any 最多套 ${he} 層`);return}if(!Array.isArray(v)||!v.length||v.length>12){e.push(`${a}: ${h} 必須是 1–12 條條件的陣列`);return}const I=v.map((w,T)=>q(w,e,`${a}.${h}[${T}]`,t,n+1));return I.every(Boolean)?{[h]:I}:void 0}const r=l(o.field,120),d=l(o.setting,40);if(t){if(o.setting!==void 0){e.push(`${a}: 篩選清單項目只能用 field（項目的屬性）`);return}if(!ye.test(r)){e.push(`${a}: field「${r||"(空白)"}」不是有效的屬性名稱`);return}}else if(o.field!==void 0==(o.setting!==void 0)){e.push(`${a}: field（卡片欄位）與 setting（專案設定）要剛好寫一個`);return}else if(!k.test(r||d)){e.push(`${a}: ${r?"field":"setting"}「${r||d||"(空白)"}」不是有效的欄位 key`);return}const c=r?{field:r}:{setting:d},u=["equals","notEquals","in"].filter(h=>o[h]!==void 0);if(u.length!==1){e.push(`${a}: equals、notEquals、in 要剛好寫一個`);return}const[m]=u;if(m==="in"){const h=o.in;if(!Array.isArray(h)||!h.length||h.length>40||!h.every(x)){e.push(`${a}: in 必須是 1–40 個字串、數字或 true/false 的陣列`);return}return{...c,in:h.map(v=>typeof v=="string"?v.slice(0,80):v)}}const g=o[m];if(!x(g)){e.push(`${a}: ${m} 必須是字串、數字或 true/false`);return}return{...c,[m]:typeof g=="string"?g.slice(0,80):g}}function Re(s,e,a){const t=q(s,e,a);return t?{showIf:t}:{}}function Fe(s,e,a){if(!s||typeof s!="object"||Array.isArray(s)){e.push(`${a} 必須是物件，例如 { "source": "settings", "key": "slots", "label": "name", "value": "code" }`);return}const t=s;if(!Ee.includes(t.source)){e.push(`${a}: source 只能是 settings、storage 或 variable`);return}const n=l(t.key,120).trim();if(!(t.source==="settings"?k.test(n):!!n)){e.push(`${a}: key「${n||"(空白)"}」無效${t.source==="settings"?"，要是設定的 key":""}`);return}const i={};for(const d of["path","label","labelEn","value"]){if(t[d]===void 0)continue;const c=l(t[d],240);if(!ye.test(c)){e.push(`${a}: ${d}「${c||"(空白)"}」要是屬性名稱，多層用 . 連接（例如 calendar.slots）`);return}i[d]=c}const r=t.where!==void 0?q(t.where,e,`${a} 的 where`,!0):void 0;if(!(t.where!==void 0&&!r))return{source:t.source,key:n,...i,...r?{where:r}:{},emptyHint:l(t.emptyHint,200)||void 0,emptyHintEn:l(t.emptyHintEn,200)||void 0}}const ve=s=>s.all||s.any?[...s.all||[],...s.any||[]].flatMap(ve):[s];function we(s,e,a){const t=new Set(s.map(o=>o.key));for(const o of s)for(const i of o.showIf?ve(o.showIf):[])i.field!==void 0&&(i.field===o.key?e.push(`${a}: 欄位「${o.key}」的 showIf 不能指向自己`):t.has(i.field)||e.push(`${a}: 欄位「${o.key}」的 showIf 指向不存在的欄位「${i.field}」`));const n=new Set;s.forEach((o,i)=>{if(!o.row||s[i-1]?.row===o.row)return;n.has(o.row)&&e.push(`${a}: row「${o.row}」的欄位要排在一起，中間不能夾別的欄位`),n.add(o.row);let r=1;for(;s[i+r]?.row===o.row;)r+=1;r>4&&e.push(`${a}: row「${o.row}」最多放 4 個欄位`)})}const R=(s,e)=>s===e||String(s??"")===String(e),z=(s,e)=>s.in?s.in.some(a=>R(e,a)):s.notEquals!==void 0?!R(e,s.notEquals):s.equals!==void 0?R(e,s.equals):!0,C=(s,e)=>s.all?s.all.every(a=>C(a,e)):s.any?s.any.some(a=>C(a,e)):e(s);function rt(s,e,a,t){const n=new Map,o=i=>{const r=n.get(i.key);if(r==="pending")return"hidden";if(r)return r;if(!i.showIf)return"shown";n.set(i.key,"pending");const c=C(i.showIf,u=>{const m=u.field??(t?void 0:u.setting);if(m===void 0)return z(u,t?.[u.setting||""]);const g=e.find(h=>h.key===m);return!!(g&&o(g)==="shown")&&z(u,a[m])})?"shown":i.showIfMode==="disable"?"disabled":"hidden";return n.set(i.key,c),c};return o(s)}function lt(s){const e=[];for(const a of s){const t=e[e.length-1];a.field.row&&t?.[0].field.row===a.field.row?t.push(a):e.push([a])}return e}const E=(s,e)=>{let a=s;for(const t of e?e.split("."):[]){if(a===null||typeof a!="object")return;a=a[t]}return a},ze=200;function qe(s,e,a){let t;if(e.source==="settings")t=a.settings?.[e.key];else if(e.source==="storage")t=a.storage?.[e.key];else{const r=a.variables?.find(d=>d.name===e.key);r&&(r.plugin===s.id||s.permissions.includes("variables:read"))&&(t=r.defaultValue)}if(typeof t=="string"&&/^\s*[[{]/.test(t))try{t=JSON.parse(t)}catch{return[]}const n=E(t,e.path);if(!Array.isArray(n))return[];const o=[],i=new Set;for(const r of n){if(e.where&&!C(e.where,h=>z(h,E(r,h.field))))continue;const d=x(r),c=d?r:E(r,e.value);if(!x(c))continue;const u=String(c).slice(0,200);if(!u||i.has(u))continue;const m=d?r:E(r,e.label),g=d?void 0:E(r,e.labelEn);if(i.add(u),o.push({value:u,label:(x(m)&&String(m).trim()?String(m):u).slice(0,80),...x(g)&&String(g).trim()?{labelEn:String(g).slice(0,80)}:{}}),o.length>=ze)break}return o}function dt(s,e,a,t,n){const o=e.optionsFrom?qe(s,e.optionsFrom,a):[],i=(o.length?o:e.options||[]).map(d=>({value:d.value,label:n?d.label:d.labelEn||d.label}));if(!i.length){const d=e.optionsFrom;return{options:[],input:!0,emptyHint:(n?d?.emptyHint:d?.emptyHintEn||d?.emptyHint)||(n?"還沒有可以選的項目，可以先直接輸入。":"Nothing to choose from yet — type a value for now.")}}const r=String(t??"");return e.optionsFrom&&r&&!i.some(d=>d.value===r)&&i.push({value:r,label:n?`${r}（不在清單裡）`:`${r} (not in the list)`}),{options:i,input:!1}}function Be(s,e,a,t=M){const n=s||{},o=l(n.id,60).trim(),i=`第 ${a+1} 張卡片`;if(!H.test(o))return e.push(`${i}: id「${o||"(空白)"}」無效，請用小寫英數與連字號（3–60 字）`),null;const r=l(n.name,60).trim();if(!r)return e.push(`${i}: 缺少 name`),null;const d=typeof n.html=="string"?n.html:"";if(!d.trim())return e.push(`${i}「${r}」: 缺少 html，擴充功能卡片一定要有可執行的內容`),null;if(d.length>t)return e.push(`${i}「${r}」: html 超過 ${Math.round(t/1e3)}KB 上限`),null;const c=l(n.icon,24),u=l(n.color,7),m=[],g=new Set;for(const h of y(n.fields).slice(0,30)){const v=be(h,e,`${i}「${r}」`);!v||g.has(v.key)||(g.add(v.key),m.push(v))}return we(m,e,`${i}「${r}」`),{id:o,name:r,nameEn:l(n.nameEn,60)||void 0,description:l(n.description,400)||void 0,descriptionEn:l(n.descriptionEn,400)||void 0,icon:V(c)?c:void 0,color:/^#[0-9a-fA-F]{6}$/.test(u)?u:void 0,presentation:n.presentation==="fullscreen"?"fullscreen":"inline",...n.hidePresentation===!0||n.presentation==="none"?{hidePresentation:!0}:{},skippable:n.skippable!==!1,fields:m,readVariables:y(n.readVariables).map(h=>l(h,80).trim()).filter(Boolean),writeVariables:y(n.writeVariables).map(h=>l(h,80).trim()).filter(Boolean),html:d}}function Ge(s,e,a){const t=s||{},n=l(t.id,60).trim(),o=`第 ${a+1} 個指令`;if(!H.test(n))return e.push(`${o}: id「${n||"(空白)"}」無效，請用小寫英數與連字號（3–60 字）`),null;const i=l(t.title,60).trim();if(!i)return e.push(`${o}: 缺少 title`),null;const r=Array.from(new Set(y(t.surfaces).map(m=>l(m,20)).filter(m=>Le.includes(m)))),d=l(t.icon,24),c=l(t.shortcut,40).trim(),u=c?Ce(c):{};return u.error&&e.push(`${o}「${i}」: ${u.error}`),{id:n,title:i,surfaces:r,titleEn:l(t.titleEn,60)||void 0,description:l(t.description,300)||void 0,descriptionEn:l(t.descriptionEn,300)||void 0,icon:V(d)?d:void 0,cardTypes:y(t.cardTypes).map(m=>l(m,40)).filter(Boolean).slice(0,20),confirm:l(t.confirm,200)||void 0,confirmEn:l(t.confirmEn,200)||void 0,...u.shortcut?{shortcut:u.shortcut}:{},...l(t.panel,60).trim()?{panel:l(t.panel,60).trim()}:{}}}function ke(s,e,a,t="面板"){const n=s||{},o=l(n.id,60).trim(),i=`第 ${a+1} 個${t}`;if(!H.test(o))return e.push(`${i}: id「${o||"(空白)"}」無效`),null;const r=typeof n.html=="string"?n.html:"";if(!r.trim())return e.push(`${i}: 缺少 html`),null;if(r.length>M)return e.push(`${i}: html 超過 ${Math.round(M/1e3)}KB 上限`),null;const d=l(n.icon,24),c=Ue.includes(n.placement)?n.placement:"modal",u=Pe.includes(n.size)?n.size:void 0;return{id:o,title:l(n.title,60)||o,titleEn:l(n.titleEn,60)||void 0,icon:V(d)?d:void 0,placement:c,...u&&c==="modal"?{size:u}:{},html:r}}function Ke(s,e,a,t=[]){const n=ke(s,e,a,"常駐 UI");if(!n)return null;const o=s,i=(d,c,u,m)=>o[d]===void 0?c:typeof o[d]!="number"||!Number.isFinite(o[d])?(e.push(`常駐 UI「${n.id}」: ${d} 必須是有限數字`),c):Math.round(Math.max(u,Math.min(m,o[d]))),r=d=>{let c=Array.from(new Set(y(o[d]).map(h=>l(h,80).trim()).filter(h=>h&&!["__proto__","constructor","prototype"].includes(h))));const u=`常駐 UI「${n.id}」的 ${d}`,g=c.filter(h=>h.includes("*")).filter(h=>d==="writeVariables"||!F(h));return g.length&&(t.push(d==="writeVariables"?`${u} 不支援 * 萬用字元，已忽略：${g.join("、")}。可寫入的變數請逐一列出`:`${u} 裡的「${g.join("、")}」不是有效的前綴寫法（* 只能放在最後，前面至少一個字，例如 xn_*），已忽略`),c=c.filter(h=>!g.includes(h))),c.length>$&&t.push(`${u} 有 ${c.length} 個，超過 ${$} 個上限，後面 ${c.length-$} 個（從「${c[$]}」開始）會被忽略${d==="readVariables"?"。同一前綴的變數可以改寫成 xn_* 這種前綴寫法":""}`),c.slice(0,$)};return o.anchor!==void 0&&!Te.includes(o.anchor)&&e.push(`常駐 UI「${n.id}」: anchor 必須是四個角落之一`),{id:n.id,title:n.title,titleEn:n.titleEn,html:n.html,anchor:o.anchor||"top-right",width:i("width",220,32,640),height:i("height",96,32,640),offsetX:i("offsetX",16,0,240),offsetY:i("offsetY",80,0,240),interactive:o.interactive===!0,readVariables:r("readVariables"),writeVariables:r("writeVariables"),visibleVariable:l(o.visibleVariable,80).trim()||void 0}}const Je=/^--[a-z0-9-]{1,60}$/i,Ze=/^[#a-z0-9 ,.()%+-]{1,80}$/i;function We(s){if(!s||typeof s!="object")return;const e={};for(const[a,t]of Object.entries(s).slice(0,40)){const n=a.trim(),o=l(t,80).trim();!Je.test(n)||!Ze.test(o)||/url\s*\(|expression|javascript:|@import/i.test(o)||(e[n]=o)}return Object.keys(e).length?e:void 0}function Se(s){const e=[],a=[],t=s||{},n=l(t.id,60).trim().toLowerCase();H.test(n)||e.push(`擴充功能 id「${n||"(空白)"}」無效，請用小寫英數與連字號（3–60 字），例如 my-inventory-kit`);const o=l(t.name,80).trim();o||e.push("擴充功能缺少 name");const i=l(t.author,80).trim();i||e.push("擴充功能缺少 author");const r=l(t.version,20).trim()||"1.0.0";/^\d+(\.\d+){0,2}$/.test(r)||e.push(`版本「${r}」無效，請用 1.0.0 這種格式`);const d=y(t.cards),c=y(t.commands),u=y(t.panels),m=y(t.huds);!d.length&&!c.length&&!u.length&&!m.length&&!t.theme&&e.push("擴充功能至少要提供一樣東西：卡片（cards）、常駐 UI（huds）、指令（commands）、面板（panels）或主題（theme）"),d.length>A&&e.push(`一個擴充功能最多 ${A} 張卡片`),c.length>24&&e.push("一個擴充功能最多 24 個指令"),m.length>D&&e.push(`一個擴充功能最多 ${D} 個常駐 UI`);const g=[],h=new Set;m.slice(0,D).forEach((p,b)=>{const f=Ke(p,e,b,a);if(f){if(h.has(f.id)){e.push(`常駐 UI id「${f.id}」重複`);return}h.add(f.id),g.push(f)}});const v=[],I=new Set;d.slice(0,A).forEach((p,b)=>{const f=Be(p,e,b,G.has(n)?Ve:M);if(f){if(I.has(f.id)){e.push(`卡片 id「${f.id}」重複`);return}I.add(f.id),v.push(f)}});const w=[],T=new Set,K=new Map;c.slice(0,24).forEach((p,b)=>{const f=Ge(p,e,b);if(!(!f||T.has(f.id))){if(T.add(f.id),f.shortcut){const se=K.get(f.shortcut);se?e.push(`指令「${f.title}」與「${se}」用了同一組快捷鍵 ${f.shortcut}`):K.set(f.shortcut,f.title)}w.push(f)}});const L=[],J=new Set;u.slice(0,8).forEach((p,b)=>{const f=ke(p,e,b);!f||J.has(f.id)||(J.add(f.id),L.push(f))});const _=Array.from(new Set(y(t.hooks).map(p=>l(p,30)).filter(p=>He.includes(p)))),U=typeof t.worker=="string"?t.worker:"";U.length>M&&e.push(`worker 超過 ${Math.round(M/1e3)}KB 上限`);for(const p of w){if(!p.panel)continue;const b=L.find(f=>f.id===p.panel);b?b.placement==="settings"&&e.push(`指令「${p.title}」不能打開 placement 為 settings 的面板「${p.panel}」，那一頁只在專案設定裡出現`):e.push(`指令「${p.title}」要打開的面板「${p.panel}」不在 panels 裡`)}(w.some(p=>!p.panel)||_.length)&&!U.trim()&&e.push("宣告了 hooks，或有指令沒有指定 panel，就必須提供 worker（執行它們的沙盒程式）");const P=[],Z=new Set;for(const p of y(t.settings).slice(0,30)){const b=be(p,e,"擴充功能設定");!b||Z.has(b.key)||(Z.add(b.key),P.push(b))}we(P,e,"擴充功能設定");const W=Array.from(new Set(y(t.categories).map(p=>l(p,20)).filter(p=>me.includes(p)))),j=Array.from(new Set(y(t.permissions).map(p=>l(p,30)).filter(p=>fe.includes(p))));if(g.length&&!j.includes("player:ui")&&e.push("宣告 huds 必須提供 player:ui 權限"),g.some(p=>p.readVariables?.length||p.visibleVariable)&&!j.includes("variables:read")&&e.push("常駐 UI 讀取變數必須提供 variables:read 權限"),g.some(p=>p.writeVariables?.length)&&!j.includes("variables:write")&&e.push("常駐 UI 寫入變數必須提供 variables:write 權限"),e.length)return{errors:e,warnings:a};const Y=t.pricing==="paid"?"paid":"free",X=y(t.gallery).slice(0,12).flatMap(p=>{const b=p||{},f=l(b.url,2e3).trim();return/^(?:https:\/\/|\/(?!\/))/.test(f)?[{url:f,caption:l(b.caption,140).trim()||void 0,captionEn:l(b.captionEn,140).trim()||void 0}]:[]}),Q=p=>y(p).slice(0,12).map(b=>l(b,160).trim()).filter(Boolean),ee=Q(t.features),te=Q(t.featuresEn),ae=l(t.icon,24);return{errors:[],warnings:a,plugin:{id:n,name:o,version:r,author:i,nameEn:l(t.nameEn,80)||void 0,description:l(t.description,800),descriptionEn:l(t.descriptionEn,800)||void 0,authorAvatar:l(t.authorAvatar,500)||void 0,homepage:/^https?:\/\//.test(l(t.homepage,500))?l(t.homepage,500):void 0,icon:V(ae)?ae:void 0,cover:l(t.cover,2e3)||void 0,gallery:X.length?X:void 0,overview:l(t.overview,4e3).trim()||void 0,overviewEn:l(t.overviewEn,4e3).trim()||void 0,features:ee.length?ee:void 0,featuresEn:te.length?te:void 0,categories:W.length?W:["card"],permissions:j,cards:v,huds:g.length?g:void 0,commands:w.length?w:void 0,panels:L.length?L:void 0,hooks:_.length?_:void 0,worker:U.trim()?U:void 0,settings:P.length?P:void 0,theme:We(t.theme),pricing:Y,price:Y==="paid"?Math.max(1,Number(t.price)||1):void 0,license:l(t.license,120)||void 0,official:t.official===!0,builtIn:t.builtIn===!0,ownerId:l(t.ownerId,80)||void 0,installs:typeof t.installs=="number"?t.installs:void 0,createdAt:l(t.createdAt,40)||void 0,updatedAt:l(t.updatedAt,40)||void 0}}}function ct(s){const e=s.trim();if(!e)return{errors:["請先貼上擴充功能 manifest（JSON）"]};let a;try{a=JSON.parse(e)}catch(t){return{errors:[`JSON 格式錯誤：${t instanceof Error?t.message:"無法解析"}`]}}return Se(a)}function ht(s,e,a){if(!e||!a)return;const t=s.find(o=>o.id===e),n=t?.cards.find(o=>o.id===a);return t&&n?{plugin:t,card:n}:void 0}function B(s){const e={};for(const a of s.fields||[])a.defaultValue!==void 0?e[a.key]=a.defaultValue:a.kind==="toggle"?e[a.key]=!1:a.kind==="number"?e[a.key]=a.min??0:a.kind==="select"?e[a.key]=a.options?.[0]?.value||"":e[a.key]="";return e}function ut(s,e,a){const t={...B(e),...a?.pluginValues||{}},n=(e.fields||[]).filter(r=>r.kind==="variable").map(r=>t[r.key]).filter(r=>typeof r=="string"&&!!r),o=[...new Set([...n,...e.readVariables||[]])],i=[...new Set([...n,...e.writeVariables||[]])];return{type:"plugin",title:e.name,text:e.description||s.description,pluginId:s.id,pluginCardId:e.id,pluginVersion:s.version,pluginName:s.name,pluginCardName:e.name,pluginIcon:e.icon||s.icon,pluginColor:e.color,pluginHtml:G.has(s.id)?void 0:e.html,pluginValues:t,pluginPresentation:e.presentation||"inline",pluginFrame:a?.pluginFrame?{...a.pluginFrame}:void 0,pluginSkippable:e.skippable!==!1,pluginReadVars:s.permissions.includes("variables:read")?o:[],pluginWriteVars:s.permissions.includes("variables:write")?i:[],pluginAssets:[...a?.pluginAssets||[]],platforms:["web"]}}const pt=s=>B({fields:s.settings||[]});function mt(s,e){return{...e?B(e):{},...s.pluginValues||{}}}const G=new Set(["larch-rpg-system","larch-card-roguelike","larch-3d","larch-live-quiz","larch-live"]);function ft(s,e,a){return s.pluginVersion!==a.version||!G.has(a.id)&&s.pluginHtml!==e.html}const gt=s=>s.pluginAssets||[];function bt(s,e){const a=s.pluginReadVars||[];return a.length?Object.fromEntries(Object.entries(e).filter(([t])=>a.includes(t))):{}}function yt(s,e){const a=s.readVariables||[],t=a.filter(F).map(i=>i.slice(0,-1)),n={};for(const i of a)!F(i)&&Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);let o=0;for(const i of Object.keys(e).sort()){if(o>=_e)break;t.some(r=>i.startsWith(r))&&(o++,n[i]=e[i])}return n}const vt=(s,e)=>(s.pluginWriteVars||[]).includes(e);function wt(s,e){const a=s.cards.length,t=s.huds?.length||0,n=s.categories.map(i=>e?S[i].zh:S[i].en),o=t?e?` · ${t} 個常駐 UI`:` · ${t} HUD${t>1?"s":""}`:"";return e?`${a} 張卡片${o} · ${n.join("、")}`:`${a} card${a>1?"s":""}${o} · ${n.join(", ")}`}function kt(s){if(!s.huds?.length)return;const{plugin:e}=Se(s);if(e?.huds?.length)return{version:e.version,permissions:[...e.permissions],huds:e.huds,defaults:Object.fromEntries((e.settings||[]).filter(a=>a.defaultValue!==void 0).map(a=>[a.key,a.defaultValue]))}}const ue=`{
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
}`,pe=`<!doctype html>
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
</body></html>`;function St(s={}){const e=s.zh!==!1,a=s.brief?.trim(),t=me.map(i=>`- \`${i}\` — ${e?S[i].zh:S[i].en}：${e?S[i].hintZh:S[i].hintEn}`).join(`
`),n=fe.map(i=>`- \`${i}\` — ${e?de[i].zh:de[i].en}`).join(`
`),o=ge.map(i=>`\`${i}\``).join("、");return e?`# Larch 擴充功能開發

你要寫一份 **Larch 擴充功能 manifest（一份 JSON；檔案多的話可以分檔寫成資料夾，見文末「交付方式」）**。安裝之後，它會在 Larch 的故事白板上多出幾張新的卡片型別 —— 背包系統、RPG 格子地圖、Live2D 立繪、物理演出、3D 模組，這些都做得出來。

## 這次要做什麼
${a||"（作者還沒描述，請先問他想要什麼樣的擴充功能與卡片。）"}

## 一個擴充功能長什麼樣
一份 JSON。它可以加卡片（最多 ${A} 張）、提供遊戲常駐 UI（huds）、或改編輯器（指令、面板、掛鉤、主題），也可以混合提供 —— 但至少要做其中一件。每張卡片＝白板上的一種新卡片型別，包含兩件事：
1. \`fields\`：作者在 Inspector 上要填的欄位（宣告式 schema，Larch 自己長出表單）。
2. \`html\`：這張卡在遊戲裡實際跑的東西 —— 一份**單檔 HTML**。

\`\`\`json
${ue}
\`\`\`

## html 的硬性規格
1. **一份完整的 HTML**：\`<!doctype html>\` 開頭，CSS 與 JS 全部 inline。**不要引用任何外部網址**的 script、樣式、字型或圖片 —— 它跑在 \`sandbox="allow-scripts"\` 的 iframe 裡，沒有 same-origin、不該依賴網路。卡片與常駐 UI 在遊戲裡**沒有可以保存的 localStorage**（要留下的請寫進變數）；面板與 worker 的 localStorage 會存進專案，見下方「面板與 worker 怎麼存資料」。要用圖就用作者透過 \`assets\` 傳進來的網址。
2. 版面由 \`presentation\` 決定：\`inline\` 是對話框裡的一塊區域（約 16:9，寬度隨視窗變），\`fullscreen\` 是整個瀏覽器視窗。一律用 \`100%\` / \`vw\` / \`vh\`，不要寫死像素。
3. 手機也要能用：滑鼠與觸控事件都要接。
4. 不要假設玩家會重新整理，也不要假設狀態會保留到下一張卡片 —— 要留下的東西請寫進變數。
5. 深色與淺色都要看得清楚；背景請自己畫，不要預期外面有底色。
6. **字型預設跟著專案**：沒寫 \`font-family\` 的字（含按鈕與輸入欄位）會用作者在專案設定「對話介面」選的字型，預覽與匯出版都一樣；要用自己的字型就照常寫 \`font-family\`，一定蓋得過。要讀專案字型（例如畫 canvas 文字）：卡片的 \`larch:init\` 帶 \`font\`，卡片與面板也都能呼叫 \`window.larch.getProjectFont()\`，兩者都是 \`{ family, name, kind, stylesheet?, url?, format? }\` —— \`family\` 是可以直接放進 \`font-family\` 的整串字型清單（\`ctx.font = '20px ' + font.family\`），\`kind\` 是 \`sans\`／\`serif\`／\`rounded\`／\`iansui\`／\`custom\`，上傳的字型才有 \`url\`。

${le(!0)}
## 跟故事溝通（唯一管道）
\`\`\`html
${pe}
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

${oe(!0)}
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
  - \`toolbar\` 白板工具列、\`navbar\` 左上角專案列、\`topRight\` 右上角播放旁、\`bottomLeft\` 左下角說明旁、\`bottomRight\` 右下角檢視工具 —— 這五個是圖示按鈕，滑過會顯示 title，請一定挑一個 \`icon\`。每一列最多顯示 ${ce} 顆擴充功能按鈕。
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
${a||"(The author has not described it yet — ask what kind of plugin and cards they want.)"}

## What a plugin is
One JSON document. It can add cards (up to ${A}), provide persistent game UI (huds), extend the editor (commands, panels, hooks, themes), or combine them — but it must do at least one of them. Each card is a new card type on the board and declares two things:
1. \`fields\` — what the author fills in on the Inspector (a declarative schema; Larch renders the form).
2. \`html\` — what actually runs during play: **one self-contained HTML file**.

\`\`\`json
${ue}
\`\`\`

## Hard requirements for html
1. **One complete HTML document** starting with \`<!doctype html>\`, all CSS and JS inline. **No external URLs** for scripts, styles, fonts or images — it runs in a \`sandbox="allow-scripts"\` iframe with no same-origin access and no network to rely on. Cards and persistent game UI have **no localStorage that survives** during play (persist into variables); panels and workers get a localStorage saved into the project — see “How panels and workers keep data” below. Use the URLs the author passes in through \`assets\`.
2. The viewport depends on \`presentation\`: \`inline\` is a panel inside the dialogue box (roughly 16:9, width follows the window), \`fullscreen\` is the whole browser window. Use relative units, never hard-coded pixels.
3. It must work with touch as well as mouse.
4. Never assume a reload, and never assume state survives to the next card — persist anything that matters into variables.
5. Draw your own background and stay legible in both light and dark surroundings.
6. **Text uses the project's font by default**: anything without its own \`font-family\` (buttons and inputs included) uses the font the author picked in Project settings → Dialogue UI, in preview and in exported builds. Write your own \`font-family\` as usual and it always wins. To read the project font (for canvas text, say): a card's \`larch:init\` carries \`font\`, and cards and panels can call \`window.larch.getProjectFont()\`. Both are \`{ family, name, kind, stylesheet?, url?, format? }\` — \`family\` is a complete font-family list (\`ctx.font = '20px ' + font.family\`), \`kind\` is \`sans\` / \`serif\` / \`rounded\` / \`iansui\` / \`custom\`, and only an uploaded font has a \`url\`.

${le(!1)}
## Talking to the story (the only channel)
\`\`\`html
${pe}
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

${oe(!1)}
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
  - \`toolbar\` (board toolbar), \`navbar\` (project bar, top left), \`topRight\` (next to Play), \`bottomLeft\` (next to Help), \`bottomRight\` (view controls) — icon buttons that show the title on hover, so always pick an \`icon\`. At most ${ce} plugin buttons show in each bar.
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

The publish window is Marketplace → Plugins → Publish (the board's Add card → Plugins → Create your own plugin opens the same window). When updating an existing plugin, leaving \`cover\` out keeps the current one.`}export{F as A,G as B,B as C,yt as D,ft as E,at as F,nt as G,Qe as P,de as a,wt as b,tt as c,et as d,st as e,ht as f,ut as g,kt as h,pt as i,ce as j,Ae as k,dt as l,Xe as m,ot as n,it as o,S as p,rt as q,lt as r,gt as s,bt as t,mt as u,vt as v,ct as w,St as x,Ye as y,Se as z};
