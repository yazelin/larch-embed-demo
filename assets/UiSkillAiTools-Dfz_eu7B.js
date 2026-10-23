import{j as t,r as k}from"./react-core-CuKebU_E.js";import{S as I}from"./StudioSelect-C5dmUUZ6.js";import{n as G}from"./builtInPropThumbnails.generated-RzC-598z.js";import{b as O}from"./soundEffects-BDSa-uSp.js";import{A as F,B as K,m as H,e as S,g as q,U as D,C as w,f as v,b as L,i as $,v as B}from"./uiSkills-Y6MLy84v.js";import{a as h,z as Y,m as N,p as V}from"./index-CWnuUqzw.js";/* empty css                  */import{R as W}from"./rotate-ccw-CrSseiSN.js";import{a as X}from"./StagePickerDialog-CGiImOk-.js";import{c as J}from"./agentPrompts-ofK1GEQP.js";import{e as P}from"./customInterface-CwCL3ksS.js";import{C as Z}from"./clipboard-paste-CoxDe9jp.js";import{C as j}from"./circle-x-Dhsz9gwX.js";import{C as Q}from"./circle-check-B34oX4bY.js";import{B as z}from"./bot-D3eRoMOY.js";const aa=[["/packs/japanese-anime-kemonomimi/music/10-crystal-wings-at-dawn.mp3","晶翼破曉（奇幻）","Crystal Wings at Dawn (fantasy)"],["/packs/journey-to-the-west/music/16-moon-rabbit-hears-the-bell.mp3","月兔聽鐘（古風）","Moon Rabbit Hears the Bell (eastern)"],["/packs/japanese-anime-kemonomimi/music/03-carrot-cake-at-three.mp3","三點的胡蘿蔔蛋糕（午後）","Carrot Cake at Three (afternoon)"],["/packs/midnight-frequency/music/01-signal-after-sign-off.mp3","收播後的訊號（雨夜電子）","Signal After Sign-Off (rainy synth)"],["/packs/larch-rpg-kingdom/music/overture.mp3","雲上序曲（冒險）","Overture Above the Clouds (adventure)"],["/audio/larch-creatures/dewdrops-heart.mp3","露珠之心（溫柔鋼琴）","Dewdrop Heart (gentle piano)"],["/packs/japanese-anime-kemonomimi/music/01-moonlit-tail-morning-train.mp3","月光尾巴與早班車（清晨）","Moonlit Tail, Morning Train (morning)"],["/audio/larch-creatures/folded-team-departs.mp3","摺紙小隊出發（俏皮）","Folded Team Departs (playful)"],["/audio/larch-creatures/sproutlight-path.mp3","芽光晨徑（童話）","Sproutlight Path (storybook)"],["/audio/larch-creatures/tiny-light-festival.mp3","微光祭典（熱鬧）","Tiny Light Festival (lively)"],["/audio/larch-creatures/07-letters-moonhorn-kept.mp3","月角收著的信（音樂盒）","Letters Moonhorn Kept (music box)"],["/audio/larch-creatures/moonhorn-goodnight.mp3","月角的晚安（夜晚）","Moonhorn Goodnight (night)"],["/packs/starline-teahouse/music/01-last-tram-warm-tea.mp3","末班電車與熱茶（城市療癒）","Last Tram, Warm Tea (city, cosy)"],["/packs/japanese-anime-kemonomimi/music/09-calico-cafe-closing-time.mp3","三花咖啡打烊時（黃昏）","Calico Café Closing Time (dusk)"],["/packs/korean-webtoon-ensemble/music/08-neon-encore-protocol.mp3","霓虹安可協定（都會）","Neon Encore Protocol (urban)"],["/packs/journey-to-the-west/music/01-pilgrims-depart.mp3","西行啟程（東方奇幻）","Pilgrims Depart (eastern fantasy)"],["/packs/larch-rpg-kingdom/music/town.mp3","雲之小鎮（小鎮）","Cloud Town (town)"],["/packs/mist-harbor-files/music/01-fog-keeps-the-ledger.mp3","霧裡的帳本（懸疑爵士）","Fog Keeps the Ledger (noir jazz)"],["/packs/greek-mythology-odyssey/music/01-above-the-twelve-thrones.mp3","十二王座之上（史詩）","Above the Twelve Thrones (epic)"]],T=aa.flatMap(([a,r,l])=>{try{return[{url:G(a),zh:r,en:l}]}catch{return[]}}),E=[...O].sort((a,r)=>+(r.category==="ui")-+(a.category==="ui")).map(a=>({url:a.url,zh:a.zh,en:a.en})),C={hover:["滑過","hover"],press:["按下","press"],open:["打開","open"],close:["關上","close"],advance:["下一句","next line"],use:["使用","use"]};function ea(a,r){if(!a)return r?"不播放":"Off";const l=[...T,...E].find(n=>n.url===a);if(l)return r?l.zh:l.en;const i=a.match(/\/skills\/[a-z0-9-]+\/sfx\/([a-z-]+)\.(?:mp3|m4a|ogg|wav)$/i);if(i&&C[i[1]])return r?`介面音效・${C[i[1]][0]}`:`UI sound · ${C[i[1]][1]}`;try{return decodeURIComponent(a.split("/").pop()||a).replace(/\.[^.]+$/,"").replace(/^\d{10,}_/,"")}catch{return a}}const ta=a=>{const r=a.replace("#","");return r.length===3||r.length===4?`#${r.slice(0,3).split("").map(l=>l+l).join("")}`:`#${r.slice(0,6)}`};let y=null;const x=()=>{y?.pause(),y=null};function ra({def:a,value:r,raw:l,label:i,id:n,zh:d,onChange:c}){const p=a.kind==="music",o=p?T:E,[e,u]=k.useState(!1),[s,b]=k.useState(!1),m=k.useRef(null);k.useEffect(()=>()=>{m.current&&y===m.current&&x()},[]);const _=e?"__custom":r===String(a.default)?"__default":r?o.some(g=>g.url===r)?r:"__custom":"__off",R=()=>{if(s&&m.current===y){x(),b(!1);return}if(!r)return;x();const g=new Audio(r);g.volume=p?.55:.8,g.addEventListener("ended",()=>b(!1),{once:!0}),y=g,m.current=g,g.play().then(()=>b(!0)).catch(()=>b(!1)),p&&window.setTimeout(()=>{y===g&&(x(),b(!1))},2e4)},U=[{value:"__default",label:a.default?h(d,"這包的預設：{0}","Pack default: {0}",ea(String(a.default),d)):h(d,"這包的預設（不播放）","Pack default (off)")},{value:"__off",label:p?h(d,"不播（用專案的標題音樂）","Off (use the project’s music)"):h(d,"不播（用 Larch 的提示音）","Off (Larch’s own cue)")},...o.filter(g=>g.url!==a.default).map(g=>({value:g.url,label:d?g.zh:g.en})),{value:"__custom",label:h(d,"自己的檔案網址…","My own file URL…")}];return t.jsxs("div",{className:"ui-skill-param is-wide is-audio",children:[t.jsx("span",{id:`${n}-label`,children:i}),t.jsx("button",{type:"button",className:"ui-skill-audio-play",disabled:!r,"aria-pressed":s,"aria-label":s?h(d,"停止試聽「{0}」","Stop “{0}”",i):h(d,"試聽「{0}」","Play “{0}”",i),onClick:R,children:s?t.jsx(X,{}):t.jsx(Y,{})}),t.jsx(I,{value:_,ariaLabel:i,options:U,onChange:g=>{if(x(),b(!1),g==="__custom"){u(!0);return}u(!1),c(g==="__default"?String(a.default):g==="__off"?"":g)}}),_==="__custom"&&t.jsx("input",{id:n,type:"url",inputMode:"url","aria-labelledby":`${n}-label`,placeholder:h(d,"音檔網址（Larch 媒體庫或 https）","Audio URL (Larch media or https)"),value:typeof l=="string"?l:r,onChange:g=>c(g.target.value.trim())})]})}function $a({defs:a,values:r,zh:l,onChange:i,idPrefix:n="skill-param"}){if(!a.length)return null;const d=a.some(e=>r&&Object.prototype.hasOwnProperty.call(r,e.key)&&r[e.key]!==e.default),c=(e,u)=>i({...r||{},[e]:u}),p=[...a.filter(e=>e.type!=="audio"),...a.filter(e=>e.type==="audio"&&e.kind==="music"),...a.filter(e=>e.type==="audio"&&e.kind!=="music")],o=p.find(e=>e.type==="audio");return t.jsxs("div",{className:"ui-skill-params",children:[p.map(e=>{const u=F(e,r?.[e.key]),s=K(e,l),b=`${n}-${e.key}`;return e.type==="toggle"?t.jsxs("label",{className:"ui-skill-param is-toggle",htmlFor:b,children:[t.jsx("span",{children:s}),t.jsx("input",{id:b,type:"checkbox",role:"switch",checked:u===!0,onChange:m=>c(e.key,m.target.checked)}),t.jsx("i",{"aria-hidden":"true"})]},e.key):e.type==="select"?t.jsxs("div",{className:"ui-skill-param",children:[t.jsx("span",{id:`${b}-label`,children:s}),t.jsx(I,{value:String(u),ariaLabel:s,onChange:m=>c(e.key,m),options:(e.options||[]).map(m=>({value:m.value,label:l?m.label:m.labelEn||m.label}))})]},e.key):e.type==="color"?t.jsxs("label",{className:"ui-skill-param is-color",htmlFor:b,children:[t.jsx("span",{children:s}),t.jsx("input",{id:b,type:"color",value:ta(String(u)),onChange:m=>c(e.key,m.target.value)}),t.jsx("code",{children:String(u)})]},e.key):e.type==="range"?t.jsxs("label",{className:"ui-skill-param is-range",htmlFor:b,children:[t.jsx("span",{children:s}),t.jsx("input",{id:b,type:"range",min:e.min,max:e.max,step:e.step,value:Number(u),onChange:m=>c(e.key,Number(m.target.value))}),t.jsxs("b",{children:[String(u),e.unit||""]})]},e.key):e.type==="audio"?t.jsxs(k.Fragment,{children:[e===o&&t.jsx("p",{className:"ui-skill-params-group",children:h(l,"音樂與音效","Music & sounds")}),t.jsx(ra,{def:e,value:String(u),raw:r?.[e.key],label:s,id:b,zh:l,onChange:m=>c(e.key,m)})]},e.key):e.type==="image"?t.jsxs("label",{className:"ui-skill-param is-wide",htmlFor:b,children:[t.jsx("span",{children:s}),t.jsx("input",{id:b,type:"url",inputMode:"url",placeholder:h(l,"圖片網址（Larch 媒體庫或 https）","Image URL (Larch media or https)"),value:typeof r?.[e.key]=="string"?String(r[e.key]):String(u),onChange:m=>c(e.key,m.target.value.trim())})]},e.key):t.jsxs("label",{className:"ui-skill-param is-wide",htmlFor:b,children:[t.jsx("span",{children:s}),t.jsx("input",{id:b,type:"text",maxLength:e.maxLength,value:String(u),onChange:m=>c(e.key,m.target.value)})]},e.key)}),d&&t.jsxs("button",{type:"button",className:"ui-skill-params-reset",onClick:()=>i({}),children:[t.jsx(W,{}),h(l,"全部回到預設","Reset all")]})]})}const f=`{
  "accent": { "type": "color", "label": "主色", "labelEn": "Accent", "default": "#d8b46a" }
}`;function _a(a){return a==="title"?`<script type="application/larch-params">
{
  "accent": { "type": "color", "label": "主色", "labelEn": "Accent", "default": "#d8b46a" },
  "eyebrow": { "type": "text", "label": "標題上方小字", "labelEn": "Eyebrow", "default": "A VISUAL NOVEL", "maxLength": 40 }
}
<\/script>
${P("title").replace('<div class="eyebrow">AN INTERACTIVE STORY</div>','<div class="eyebrow" data-larch-param="eyebrow"></div>').replace("color: #e5c28d; letter-spacing: .28em;","color: var(--skin-accent, #e5c28d); letter-spacing: .28em;").replace(/<button data-larch-action="(start|continue|load|chapters|gallery)">([^<]*)<\/button>/g,'<button data-larch-action="$1"><span data-larch-label="$1">$2</span></button>')}`:a==="dialogue"?`<script type="application/larch-params">
${f}
<\/script>
${P("dialogue").replace(".speaker { color: #e5c28d;",".speaker { color: var(--skin-accent, #e5c28d);").replace('<div class="speaker" data-larch-slot="speaker"></div>',`<div class="speaker" data-larch-slot="speaker"></div>
  <!-- 沒有角色名時（旁白）：html 不會有 data-has-speaker -->`)}`:a==="choices"?`/* @larch-params ${f} */
/* :scope 是選項的容器；浮在畫面上時還有 .vn2-choices-floating。 */
:scope.vn2-choices-floating { padding: 0; border: 0; background: none; box-shadow: none; backdrop-filter: none; }
[data-larch-ui="choice"] { border: 1px solid var(--skin-accent); border-radius: 999px; background: #1b1b22ee; color: #fff; }
[data-larch-ui="choice"]:hover, [data-larch-ui="choice"]:focus-visible { background: var(--skin-accent); color: #1b1b22; outline: none; }
[data-larch-ui="choice"]:disabled { border-style: dashed; background: #26262b; color: #c8c8d0; }
[data-larch-ui="choice-index"] { color: var(--skin-accent); }
[data-larch-ui="choice"]:hover [data-larch-ui="choice-index"] { color: inherit; }`:a==="menu"?`/* @larch-params ${f} */
/* 快捷列 */
:scope[data-larch-ui="toolbar"] button { color: #fff; }
:scope[data-larch-ui="toolbar"] button:hover, :scope[data-larch-ui="toolbar"] button:focus-visible { color: var(--skin-accent); }
/* 設定視窗：原生樣式讀這些變數（是 style 屬性給的，所以要加 !important） */
:scope[data-larch-ui="settings"] { --vn-settings-surface: #1b1b22 !important; --vn-settings-accent: var(--skin-accent) !important; }
/* 設定的分頁：原本排在上面，這裡改成左邊直排的一列 */
:scope[data-larch-ui="settings"] { display: grid; grid-template-columns: 150px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
:scope[data-larch-ui="settings"] > header { grid-column: 1 / -1; }
[data-larch-ui="settings-tabs"] { flex-direction: column; align-self: start; }
[data-larch-ui="settings-tab"][aria-selected="true"] { background: var(--skin-accent); color: #1b1b22; }
/* 設定、存讀檔、對話紀錄共用的標題列 */
:scope > header h2 { letter-spacing: .1em; }
[data-larch-ui="save-slot"] { border: 1px solid var(--skin-accent); }`:a==="inventory"?`/* @larch-params ${f} */
/* 背包不只換顏色，版面也能整個換：這個範例把它改成從畫面右邊滑出來的一條清單。 */
:scope[data-larch-ui="bag-button"], :scope[data-larch-ui="bag"], :scope[data-larch-ui="item-tip"] { --inventory-accent: var(--skin-accent) !important; --inventory-surface: #1b1b22 !important; --inventory-item: #26262e !important; --inventory-text: #fff !important; }
:scope[data-larch-ui="bag"] { left: auto; right: 0; top: 0; bottom: 0; width: min(420px, 100%); height: 100%; max-height: none; translate: none; transform: none !important; border-radius: 0; animation: slide .35s ease-out both; }
@keyframes slide { from { translate: 100% 0; } to { translate: 0 0; } }
/* 說明放上面、清單放下面；清單一列一個道具。 */
[data-larch-ui="bag-body"] { display: flex; flex-direction: column-reverse; }
[data-larch-ui="item-detail"] { flex: none; border-left: 0; }
[data-larch-ui="bag-grid"] { grid-template-columns: 1fr; gap: 4px; }
[data-larch-ui="slot-empty"] { display: none; }
[data-larch-ui="item"] { min-height: 48px; display: grid; grid-template-columns: 32px minmax(0, 1fr) auto; place-items: center start; padding: 6px 12px; }
[data-larch-ui="item-count"] { position: static; }
[data-larch-ui="item"][aria-selected="true"] { box-shadow: inset 3px 0 0 var(--skin-accent); }
[data-larch-ui="item-use"] { border-radius: 999px; }`:a==="gallery"?`/* @larch-params ${f} */
/* CG 收藏與選擇章節：:scope 是整個畫面（[data-larch-ui="gallery"] 或 [data-larch-ui="chapters"]）。 */
:scope { background: radial-gradient(ellipse at 50% 0%, #2a2238, #121018 70%); color: #fff; }
[data-larch-ui="screen-header"] h1 { letter-spacing: .12em; }
[data-larch-ui="screen-back"], [data-larch-ui="screen-close"] { border: 1px solid var(--skin-accent); background: #1b1b22; color: #fff; }
/* 每張 CG 像掛在牆上的畫框；鎖住的（data-locked）只剩一個空框 */
[data-larch-ui="gallery-grid"] { gap: 28px; }
[data-larch-ui="cg"] { padding: 10px; border: 6px solid var(--skin-accent); background: #1b1b22; box-shadow: 0 14px 30px #000a; }
[data-larch-ui="cg"][data-locked] { border-style: dashed; opacity: .8; }
[data-larch-ui="cg"] figcaption b { color: var(--skin-accent); }
/* 章節卡 */
[data-larch-ui="chapter"] { border: 1px solid var(--skin-accent); border-radius: 4px; background: #1b1b22; color: #fff; }
[data-larch-ui="chapter"]:hover, [data-larch-ui="chapter"]:focus-visible { background: var(--skin-accent); color: #1b1b22; }`:`/* @larch-params ${f} */
/* RPG 擴充功能的介面：這段 CSS 會放進 RPG 地圖自己的文件（狀態列、對話、戰鬥、商店、取名、轉盤），也套在地圖上方的暫停選單。 */
:root { --surface: #1b1b22 !important; --ink: #fff !important; --control: #26262e !important; --strong: var(--skin-accent) !important; --strong-fg: #1b1b22 !important; }
body > header, #quest-wrap #quest { border-radius: 4px !important; background: #1b1b22ee; color: #fff; }
/* 地圖上的對話：變數是執行時用 style 給的，要加 !important */
#dialogue { --dlg-accent: var(--skin-accent) !important; --dlg-speaker: var(--skin-accent) !important; }
#dialogue #speaker { background: none; }
/* 暫停選單 */
.rpg-pause-menu .pm-tile[aria-current="page"], .rpg-pause-menu .pm-primary { background: var(--skin-accent); color: #1b1b22; }
/* 戰鬥：整個畫面的配色都是 .rpg-battle 上的變數 */
.rpg-battle { --gold: var(--skin-accent) !important; --bt-edge: var(--skin-accent) !important; --bt-panel: rgba(27, 27, 34, .96) !important; --bt-radius: 4px !important; }
/* 商店與取名 */
.rpg-shop, .rpg-naming { border-color: var(--skin-accent); background: #1b1b22; color: #fff; }
.rpg-shop .shop-row[aria-selected="true"] { border-color: var(--skin-accent); }
/* 轉盤的主色 */
#wheel .wheel-stage { --accent: var(--skin-accent) !important; }`}function ia(a){const r=Object.keys(S).map(i=>`- ${i}：${S[i].zh}（${S[i].noteZh}）`).join(`
`),l=q.map(i=>`${i}（${D[i][0]}）`).join("、");return`---
name: larch-ui-skills-pack
description: Design a Larch “介面 Skills” pack — HTML/CSS skins for a visual novel player's title screen, dialogue box, choices, menus, inventory and RPG UI — ready to publish on the Larch marketplace.
---

# Larch 介面 Skills 包規格書${a?"":" (Larch UI Skills pack spec)"}

一包 Skills 可以換掉這七個部位，至少要一個：
${r}

交付格式：每個部位一段程式碼。title、dialogue 是完整的 HTML 片段（含 <style> 與行內 <script>），在隔離 iframe 裡執行；choices、menu、inventory、gallery、rpg 是 CSS（可以包在 <style> 裡），套在 Larch 原本的元件上 —— 功能照舊，外觀與版面（位置、排列、大小、結構）都可以換。每段上限 200,000 字元，整包 600,000 字元。
每段程式碼的第一行放部位標記，Larch 貼上時靠它分開：HTML 部位寫 <!-- larch-skill-part: title -->，CSS 部位寫 /* larch-skill-part: choices */。

## 共通規則
- 文字對比至少 4.5:1，按鈕與控制項外框至少 3:1；照顧 :hover、:focus-visible、:active、:disabled（選項的 disabled＝條件還沒達成）。
- 用相對尺寸與手機 media queries（寬 375px 也要能用），支援 prefers-reduced-motion。
- 圖片用 data: URI（SVG 最好）、Larch 媒體庫網址（https://pub-….r2.dev/…）或 larch.ink 上的網址；CSS 部位不能讀其他網站的檔案，@import 會被拿掉。
- 不要依賴外部字型或 CDN 腳本；字型用系統字（例如 "Noto Serif TC", "Songti TC", serif）。
- 不要把作品文字寫死：標題、副標、按鈕文字、台詞都由 Larch 填入。

## 參數（作者不碰程式碼就能調）
HTML 部位放一段：
<script type="application/larch-params">
{
  "accent": { "type": "color", "label": "主色", "labelEn": "Accent", "default": "#d8b46a" },
  "subtitle": { "type": "text", "label": "副標", "default": "…", "maxLength": 60 },
  "glow": { "type": "range", "label": "光暈", "min": 0, "max": 100, "step": 5, "unit": "%", "default": 60 },
  "side": { "type": "select", "label": "選單位置", "options": [{ "value": "left", "label": "左" }, { "value": "right", "label": "右" }], "default": "right" },
  "sparkle": { "type": "toggle", "label": "飄落特效", "default": true },
  "frame": { "type": "image", "label": "框線圖片", "default": "" },
  "bgm": { "type": "audio", "kind": "music", "label": "標題音樂", "default": "" }
}
<\/script>
CSS 部位寫成註解：/* @larch-params { … 同上 … } */
- 每個參數都會變成 CSS 變數 --skin-<key>（color 是色碼、range 帶單位、text 是 CSS 字串可用在 content、image 是 url(...)、toggle 是 1/0）。
- HTML 部位另外有：<html data-skin-<key>="值">（select 與 toggle，toggle 是 on/off）、[data-larch-param="key"] 會被填入文字參數或圖片參數。
- key 用小寫英數與連字號，最多 24 個參數。

## 音樂與音效（audio 參數）
audio 參數由播放器自己播（kind 是 music 或 sfx），作者可以在 Larch 裡試聽、換成內建的配樂與音效、貼自己的檔案或關掉（關掉就回到專案原本的設定）。只認得這些名字：
${Object.keys(w).filter(i=>w[i].length).map(i=>`- ${i}：${w[i].map(n=>`${n.key}（${n.zh}）`).join("、")}`).join(`
`)}
音檔用 Larch 媒體庫網址（https://pub-….r2.dev/…）或 larch.ink 上的網址。

## title（標題畫面，HTML）
- img[data-larch-slot="cover"]：作品封面；[data-larch-slot="title"]：遊戲標題；[data-larch-slot="description"]：副標。
- 按鈕：button[data-larch-action="start" | "continue" | "load" | "chapters" | "gallery" | "settings"]，一定要有 start。continue 直接讀最新一筆存檔；load 打開讀檔畫面讓玩家挑要讀哪一格（樣子用 menu 部位的 :scope[data-larch-ui="save"] 換）。settings 打開播放器的設定視窗（音量、文字、語言；樣子用 menu 部位的 :scope[data-larch-ui="settings"] 換）。沒開的功能 Larch 會加上 hidden（匯出的單檔網頁沒有設定視窗，settings 也會被藏起來），沒存檔時 continue 和 load 會 disabled；匯出的單檔網頁沒有讀檔畫面，load 會被藏起來。
- 標題畫面右上角的全螢幕與關閉鍵在標題 HTML 外面，外觀用 menu 部位的 CSS 換（見下面 menu）。
- 按鈕文字放在 [data-larch-label="start"] 這類元素裡，Larch 會填入作者在標題介面設定的字。
- 跨週目保留的變數（玩家的週目紀錄）：[data-larch-var="變數名"] 填入值；[data-larch-if="條件"] 只在條件成立時顯示（變數名、!變數名、變數名 >= 3、變數名 == 文字）。用來做從標題打開、條目逐條解鎖的人物圖鑑或通關紀錄。行內腳本也能從 larch:state 事件的 event.detail.variables 讀到同一份。
- 文字沒有內容時元素會有 [data-empty]。

## dialogue（對話框，HTML）
- [data-larch-slot="speaker"] 角色名、[data-larch-slot="text"] 台詞（Larch 填入含粗體、顏色、注音的富文字）、img[data-larch-slot="portrait"] 說話角色的立繪（可做頭像）。
- button[data-larch-action="advance"] 下一句；點框裡非按鈕的地方也會下一句。
- 也可以自己做工具列的按鈕，跟平台工具列同一套功能，就算專案把平台工具列整排關掉也照樣能用：data-larch-action="history"（回顧）、"auto"（自動播放）、"skip"（快轉）、"save"、"load"、"settings"、"fullscreen"、"screenshot"、"title"（回標題）。auto／skip 開著時按鈕有 aria-pressed="true"，用 [aria-pressed="true"] 畫按下去的樣子。
- 旁白時 <html> 沒有 data-has-speaker；沒有立繪時沒有 data-has-portrait。台詞字級用 var(--larch-text-size, 22px)。
- 這個框在選項卡上也會用來顯示提問（那時 advance 按鈕會被藏起來），選項排在框的下面。

## choices（選項，CSS）
- :scope＝選項容器（data-place="center|bottom|top|left|right|custom"；浮在畫面上時是 .vn2-choices-floating，可以把它的底色拿掉）。
- [data-larch-ui="choice"] 每顆選項（disabled＝條件未達成）、[data-larch-ui="choice-index"] 編號 01、[data-larch-ui="choice-text"] 文字、[data-larch-ui="choice-arrow"] 箭頭。

## menu（選單與設定，CSS）
- :scope[data-larch-ui="toolbar"] 對話框旁的快捷列（button、[aria-pressed="true"]、.vn2-dialogue-actions-divider）。
- :scope[data-larch-ui="settings"] 設定視窗：> header（small、h2、關閉 button）＋ 分頁 [data-larch-ui="settings-tabs"] > [data-larch-ui="settings-tab"][data-tab="text|audio|bag|status|kept|danmaku"]（目前那頁 [aria-selected="true"]）＋ [data-larch-ui="settings-body"] > section[data-larch-ui="settings-panel"][data-tab=…]（不是目前分頁的有 hidden）。分頁的位置與形狀可以整個換（左側直排、底部、像素指令列…）。面板裡：.vn2-menu-row（label 裡有 input[type=range]、select、b 數值）、.vn2-menu-toggle、.vn2-reading-note、.vn2-menu-actions button。原生配色讀 --vn-settings-surface/accent/text/button/button-text/border/radius，是 style 屬性給的，覆寫要加 !important。
- :scope[data-larch-ui="save"] 存讀檔：[data-larch-ui="save-slot"]（figure 截圖、.save-slot-info、.save-slot-actions button）。
- :scope[data-larch-ui="title-corner"] 標題畫面右上角的兩顆鈕：button[data-larch-ui="fullscreen"]（[aria-pressed="true"] 是全螢幕中）與 button[data-larch-ui="title-close"]；圖示是 svg，要換成自己的圖就把 svg 藏起來、用 background-image 或 ::before。
- :scope[data-larch-ui="history"] 對話紀錄：[data-larch-ui="history-entry"]（span 編號、b 角色、p 台詞）；變數 --vn-history-*。

## inventory（背包，CSS）
不只換顏色：位置、排列、大小與結構都可以換（例如從下面拉出來的抽屜、側邊滑出的清單、經典 RPG 的多視窗）。
- 背包按鈕 :scope[data-larch-ui="bag-button"]（[data-larch-ui="bag-button-label"] 文字、[data-larch-ui="bag-button-count"] 數量）；遮罩 :scope[data-larch-ui="bag-scrim"]。
- 背包視窗 :scope[data-larch-ui="bag"]：原本是畫面正中間（left/top 50%、translate -50% -50%）；要搬位置就改 left/right/top/bottom 與 translate，進場動畫自己寫時加上 transform: none !important。
  - 抽屜把手 [data-larch-ui="bag-handle"]：平常是 display: none；做成抽屜時讓它出現，玩家上下拖曳會設定 --larch-bag-height，面板高度寫成 height: var(--larch-bag-height, 60%)。
  - [data-larch-ui="bag-header"]：[data-larch-ui="bag-title"]（small、h2、p 摘要）、[data-larch-ui="wallet"] 金錢、[data-larch-ui="bag-close"] 關閉鍵。
  - [data-larch-ui="bag-body"]（原本是左右兩欄的 grid）：[data-larch-ui="bag-list"]（[data-larch-ui="bag-search"] 搜尋、[data-larch-ui="bag-grid"] 道具格）與說明欄 [data-larch-ui="item-detail"]（沒有道具時是 [data-larch-ui="bag-empty"]）。
  - 每個道具 [data-larch-ui="item"]（選中的有 [aria-selected="true"]）：[data-larch-ui="item-icon"]、[data-larch-ui="item-name"]、[data-larch-ui="item-count"]、[data-larch-ui="item-keep"]（不會消耗的道具）；空格子 [data-larch-ui="slot-empty"]。
  - 說明欄：[data-larch-ui="detail-head"]（[data-larch-ui="detail-icon"]、[data-larch-ui="detail-name"]、[data-larch-ui="detail-count"]）、[data-larch-ui="detail-desc"]、[data-larch-ui="detail-effects"]、[data-larch-ui="item-use"] 使用鍵。
- 滑過道具的小提示 :scope[data-larch-ui="item-tip"]（b、small）。
- 原生配色讀 --inventory-accent/surface/item/text/radius（要加 !important）。

## gallery（CG 收藏與選擇章節，CSS）
- CG 收藏 :scope[data-larch-ui="gallery"]：header[data-larch-ui="screen-header"]（button[data-larch-ui="screen-back"] 回到標題、small＋h1＋p 進度、button[data-larch-ui="screen-close"]）＋ [data-larch-ui="gallery-grid"] > figure[data-larch-ui="cg"]（鎖住的有 [data-locked]，裡面只有鎖的圖示；開的有 img，可能有 .cg-download 下載鍵）> figcaption（span 編號、b 標題）。
- 選擇章節 :scope[data-larch-ui="chapters"]：同樣的 header ＋ [data-larch-ui="chapter-grid"] > button[data-larch-ui="chapter"][data-index]（span 裡有縮圖 img 與 i 編號、b 章名、small 說明）。

## rpg（RPG 介面，CSS）
RPG 擴充功能裡的各種畫面（不是一般對話框的 RPG 風格）。這段 CSS 放進 RPG 地圖自己的文件，也套在地圖上方的暫停選單。執行時用 style 給的變數，覆寫要加 !important。
- 地圖配色變數（:root）：--surface、--ink、--fg、--muted、--line、--control、--strong、--strong-fg、--focus。
- 狀態列：body > header（.location 裡的 #title 是地名牌，原本絕對定位掛在狀態列上方 —— 狀態列用 clip-path 或 overflow: hidden 會把它切掉；#status、.hud-party：.hud-faces、.hud-hp > i、.hud-hp-text（裡面是等級 em.hud-lv 與數字 span.hud-hp-num）；#menu 等按鈕）；任務 #quest-wrap #quest（small、span）與 #quest-fold；提示 #notice、.hint；地點標記 .rpg-waypoint。主角走到狀態列、任務、方向鍵、搖桿、#interact 或技能列底下時，那一塊會加上 .see-through（預設半透明）；#interact 前方有人可以對話時加 .ready。
- 對話：#dialogue（--dlg-panel/text/speaker/accent/border/radius/font）、.dlg-box、.dlg-nameplate、#speaker（淺色主題時它有底色，換成自己的要加 background: none）、#text、.dialogue-actions button、.dlg-choice。專案有啟用 dialogue 部位時，地圖上的台詞直接用那個對話框（#dialogue 會有 .skin-box，框在 iframe.dlg-skin 裡，.dlg-box 原本的外觀會被拿掉）；這時這裡管的是 .dlg-choice 選項、.dialogue-actions 確認按鈕（兩者疊在對話框上方的面板 .dialogue-choices／.dialogue-actions 裡）和頭上泡泡（#dialogue[data-presentation="bubble"]）。
- 暫停選單（在地圖上方的播放器頁面）：.rpg-pause-menu（原生是 grid；.pm-header：h2、.pm-where、.pm-close；.pm-body 是 display: contents，.pm-nav 裡的 .pm-tile，目前那頁 [aria-current="page"]；.pm-content[data-page="status|equipment|settings"]：.pm-hero、.pm-portrait、.pm-health > i、.pm-level、.pm-exp、.pm-facts、.pm-party-member、.pm-gear-member、.pm-slot-weapon/armor/accessory、.pm-bag-item、.vn2-menu-row；裝備頁另有 .pm-stat（攻擊／防禦／魔力）、.pm-gear-skill（地圖上的攻擊）、.pm-gear-note（點裝備看說明的框）、.pm-diamond（裝備格的菱形）、.pm-drag-ghost（拖曳中的裝備）；.pm-footer .pm-primary）。背包與存檔分別由 inventory、menu 部位負責。原生的 .pm-where、.pm-stat、.pm-gear-skill、.pm-gear-note、.pm-bag-item、.pm-diamond、.pm-drag-ghost 自己有底色（原生是米色）：把字改成淺色（例如 .pm-content * { color: … }）時，這幾塊的 background 也要一起改，不然會變成淺底淺字。
- 戰鬥：.rpg-battle（配色全是變數：--ink、--muted、--gold、--danger、--bt-panel、--bt-panel-2、--bt-panel-soft、--bt-shade（「r g b」三個數字）、--bt-edge、--bt-edge-soft、--bt-deep、--bt-well-a/b、--bt-track、--bt-orb-a/b、--bt-orb-ink、--bt-orb-glyph、--bt-orb-hover-a/b、--bt-orb-off-a/ink/edge、--bt-radius、--bt-blur、--bt-font）。結構：.battle-top（.battle-caption、h2、.battle-turn、.battle-log）、敵人 .battle-unit.battle-enemy 與 .battle-unit-label、.battle-bar（.hp、.mp、.limit）、.battle-dock > .battle-party > .battle-member（[aria-current]、.is-low、.is-down）、指令 .battle-actions[data-menu="main|skills|items|result"] 裡的 .bt-orb（.is-attack/.is-skills/.is-items/.is-guard/.is-escape）與 .bt-card、.battle-target-label、.battle-result、.bt-talk（戰鬥事件的對話框；說話者立繪是旁邊的 img.bt-talk-face）。
- 商店：dialog.rpg-shop（.shop-head：h2、.shop-wallet、.shop-close；.shop-tabs button[aria-selected]；.shop-list > .shop-row[aria-selected]（.shop-price）；.shop-detail：.shop-art、.shop-note、.shop-qty output、.shop-total、.shop-short、button.shop-go；.shop-foot、kbd）。
- 取名：dialog.rpg-naming（.naming-face、small、h2、.naming-line input、button.naming-dice、.naming-note、button.naming-go）。
- 轉盤：#wheel .wheel-stage（主色 --accent，要加 !important）、.wheel-title、.wheel-dial、.wheel-slot（.is-on、kbd）、.wheel-hub、.wheel-name、.wheel-keys、.wheel-cancel。
- 同行的夥伴：.pm-party-member 是按鈕，點了就在 .pm-hero 顯示那位夥伴（第一格 .pm-party-hero 是主角）；選到的是 [aria-current="true"]、帶隊中的是 [data-leading]、還沒入隊的是 :disabled。能換人帶隊時 .pm-hero-card 裡有 .pm-party-lead.pm-hero-lead。
- 多人連線入口與好友視窗（地圖上方的播放器頁面）：[data-larch-ui="online-lobby"] 與 [data-larch-ui="online-social"]，裡面跟暫停選單同一套結構（.rpg-pause-menu、.pm-header、.pm-content、.pm-footer），暫停選單的樣式會一起套上；入口的選角 .ol-looks、.ol-look、.ol-colors、.ol-swatch、.ol-name input、.ol-channels、.ol-actions；好友視窗的 .ol-people、.ol-thread、.ol-compose。
- 地圖上的聊天列（地圖自己的文件）：.mp-ui[data-larch-ui="online-hud"]、頻道燈號 .mp-chip（[data-state] 與裡面的燈 i）、按鈕 .mp-tool（.mp-badge 是未讀數）、聊天紀錄 .mp-log > .mp-line（.chat、.mine、.system、.dm；名字是 b）、輸入列 .mp-compose（.mp-input、.mp-send）、表情盤 .mp-emotes、頭上的名牌 .mp-tag。
- 播放器右上角的關閉鍵（在 RPG 地圖上時）：[data-larch-ui="close"]；圖示原本是 ::before 畫的 ×，要自己畫裝飾請用 ::after。
- 暫停選單「語言」打開的清單掛在 <body> 底下：:scope[data-larch-ui="rpg-select"]（也有 .select-menu-popup.rpg-pause-select），裡面每個語言是 .select-menu-option（選中的有 .selected）。只有一種語言的作品不會出現這一列。

## 發布時填的資料
名稱、介紹、風格（最多 4 個：${l}）、版本號（1.0 這種）、商城封面圖（送審必填，建議 16:9 的實際畫面截圖）。
`}const la=a=>$(a)?`/* larch-skill-part: ${a} */`:`<!-- larch-skill-part: ${a} -->`,M=/<!--\s*larch-skill-part\s*:\s*([a-z-]+)\s*-->|\/\*\s*larch-skill-part\s*:\s*([a-z-]+)\s*\*\//gi,A=/^\s*(`{3,}|~{3,})\s*[\w-]*\s*$/,sa=/^\s*(?:`{3,}|~{3,})\s*$/,oa=a=>"`".repeat(Math.max(3,...[...a.matchAll(/`+/g)].map(r=>r[0].length+1))),na=a=>a.replace(M,"").replace(/^\s*\n/,"");function ca({name:a,parts:r,params:l,zh:i}){const n=v.filter(o=>r[o]?.trim()),d=n.map(o=>{const e=`${la(o)}
${na(r[o].trim())}`,u=oa(e);return`### ${L(o,i)}（${o}・${$(o)?"CSS":"HTML"}）
${u}${$(o)?"css":"html"}
${e}
${u}`}).join(`

`),c=n.filter(o=>l?.[o]&&Object.keys(l[o]).length).map(o=>`- ${o}：${JSON.stringify(l[o])}`).join(`
`),p=ia(i).replace(/^---[\s\S]*?---\s*/,"");return i?`# 幫我修改 Larch 介面 Skills「${a}」

## 我想改的地方
（在這裡寫你的需求，例如：對話框改成深紅色、名字牌移到右邊、背包改成從下面拉出來的抽屜。）

## 回覆格式（很重要）
- 只回傳有修改的部位，每個部位給「完整」的程式碼，不要只給片段，也不要寫「其餘不變」。
- 每段程式碼的第一行保留部位標記，例如 <!-- larch-skill-part: dialogue --> 或 /* larch-skill-part: choices */，Larch 靠它把程式碼放回對的位置。
- 要新增部位也可以，用同樣的標記（部位代號：${v.join("、")}）。
- 保留 Larch 的掛鉤（data-larch-slot、data-larch-action、data-larch-label、data-larch-ui）與參數區塊，規格書在最後面。
${c?`
## 我在 Larch 裡調過的參數（可以改成新的預設值）
${c}
`:""}
## 目前的程式碼
${d}

## Larch 介面 Skills 規格書
${p}`:`# Please modify this Larch UI Skills pack: “${a}”

## What I want changed
(Write your request here — e.g. “make the dialogue box deep red, move the name tag to the right, turn the bag into a drawer that slides up from the bottom”.)

## How to reply (important)
- Return only the parts you changed, each as COMPLETE code — no fragments, no “rest unchanged”.
- Keep the part marker as the first line of every code block, e.g. <!-- larch-skill-part: dialogue --> or /* larch-skill-part: choices */. Larch uses it to put each block back in the right place.
- You may add parts too, with the same marker (part ids: ${v.join(", ")}).
- Keep Larch's hooks (data-larch-slot, data-larch-action, data-larch-label, data-larch-ui) and the params blocks — the spec is at the end.
${c?`
## Settings I tuned in Larch (feel free to make them the new defaults)
${c}
`:""}
## Current code
${d}

## Larch UI Skills spec
${p}`}function pa(a){const r=a.split(`
`);let l=0;for(;l<r.length&&!r[l].trim();)l++;const i=[];if(A.test(r[l]||""))for(let n=l+1;n<r.length&&!sa.test(r[n]);n++)i.push(r[n]);else for(let n=l;n<r.length&&!A.test(r[n]);n++)i.push(r[n]);return i.join(`
`).trim()}function da(a,r){const l=a.replace(/\r\n?/g,`
`),i=[...l.matchAll(M)],n={},d=[];if(i.forEach((c,p)=>{const o=(c[1]||c[2]||"").toLowerCase(),e=(c.index||0)+c[0].length,u=p+1<i.length&&i[p+1].index||l.length,s=pa(l.slice(e,u));if(!H(o)){d.includes(o)||d.push(o);return}s&&(n[o]=`${s}
`)}),!i.length&&r){const c=l.match(/^\s*(`{3,}|~{3,})[\w-]*\s*\n([\s\S]*?)\n\s*\1\s*$/m),p=(c?c[2]:l).trim();p&&(n[r]=`${p}
`)}return{parts:n,unknown:d}}function Pa({name:a,parts:r,params:l,zh:i,className:n,disabled:d,onCopied:c}){const[p,o]=k.useState("");k.useEffect(()=>{if(!p)return;const u=window.setTimeout(()=>o(""),2600);return()=>window.clearTimeout(u)},[p]);const e=async()=>{try{await J(ca({name:a,parts:r,params:l,zh:i})),o("copied"),V("pop"),c?.()}catch{o("failed")}};return t.jsxs("button",{type:"button",className:n,disabled:d||!v.some(u=>r[u]?.trim()),onClick:()=>{e()},title:h(i,"連同規格書一起複製，貼到 ChatGPT、Claude 或 Gemini 寫上想改的地方","Copies the code with the spec — paste it to ChatGPT, Claude or Gemini and say what to change"),children:[p==="copied"?t.jsx(N,{}):t.jsx(z,{}),t.jsx("span",{"aria-live":"polite",children:p==="copied"?h(i,"已複製，貼到你的 AI","Copied — paste it to your AI"):p==="failed"?h(i,"無法複製，請再試一次","Could not copy — try again"):h(i,"複製給 AI 修改","Copy for your AI")})]})}function Aa({zh:a,fallback:r,applyLabel:l,onApply:i,onCancel:n}){const[d,c]=k.useState(""),p=k.useMemo(()=>da(d,r),[d,r]),o=v.filter(s=>p.parts[s]),e=Object.fromEntries(o.map(s=>[s,B(s,p.parts[s])])),u=o.length>0&&o.every(s=>!e[s]);return t.jsxs("div",{className:"ui-skill-ai-paste",children:[t.jsxs("label",{htmlFor:"ui-skill-ai-paste-text",children:[t.jsx(Z,{}),t.jsx("b",{children:h(a,"貼上 AI 改好的版本","Paste your AI’s reply")}),t.jsx("small",{children:h(a,"整段回覆直接貼上就好：Larch 會照每段程式碼第一行的部位標記（例如 <!-- larch-skill-part: dialogue -->）放回對的位置。","Paste the whole reply: Larch puts each code block back by the part marker on its first line (e.g. <!-- larch-skill-part: dialogue -->).")})]}),t.jsx("textarea",{id:"ui-skill-ai-paste-text",spellCheck:!1,rows:9,value:d,onChange:s=>c(s.target.value),placeholder:h(a,"把 AI 的回覆貼在這裡…","Paste the AI reply here…")}),d.trim()&&t.jsxs("ul",{className:"ui-skill-ai-found","aria-live":"polite",children:[o.map(s=>t.jsxs("li",{className:e[s]?"is-bad":"is-good",children:[e[s]?t.jsx(j,{}):t.jsx(Q,{}),t.jsx("b",{children:L(s,a)}),t.jsx("span",{children:e[s]||h(a,"可以套用","Ready")})]},s)),p.unknown.map(s=>t.jsxs("li",{className:"is-bad",children:[t.jsx(j,{}),t.jsx("b",{children:s}),t.jsx("span",{children:h(a,"不是 Larch 的部位代號，這段會略過","Not a Larch part id — skipped")})]},`unknown-${s}`)),!o.length&&t.jsxs("li",{className:"is-bad",children:[t.jsx(j,{}),t.jsx("span",{children:h(a,"找不到部位標記。請確認每段程式碼的第一行有 <!-- larch-skill-part: … --> 或 /* larch-skill-part: … */。","No part markers found. Each code block needs <!-- larch-skill-part: … --> or /* larch-skill-part: … */ as its first line.")})]})]}),t.jsxs("div",{className:"ui-skill-ai-paste-actions",children:[t.jsx("button",{type:"button",onClick:n,children:h(a,"取消","Cancel")}),t.jsxs("button",{type:"button",className:"primary",disabled:!u,onClick:()=>i(Object.fromEntries(o.map(s=>[s,p.parts[s]]))),children:[t.jsx(N,{}),l||h(a,"套用","Apply"),o.length>0&&` (${o.map(s=>L(s,a)).join(h(a,"、",", "))})`]})]})]})}export{$a as U,Pa as a,Aa as b,ia as c,la as d,da as p,_a as u};
