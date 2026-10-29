import{normalizeGame as K,normalizeMapCardConfig as G,normalizeBattleConfig as Q,CARD_ROGUE_DEFAULT_VARS as D,CARD_ROGUE_BATTLE_VARS as Z,CARD_ROGUE_PLUGIN_ID as z,CARD_ROGUE_SETTINGS_GAME as ee}from"./cardRogue-BxVGUbti.js";import{c as C}from"./cardRoguePlugin-Cj5i2g-8.js";import{cardRogueStarter as ae,CARD_ROGUE_MUSIC as te}from"./cardRogueStarter-DyUVaea6.js";import{au as re,av as ne}from"./playerDialogueLayout-C0Hntv5L.js";import{c$ as L}from"./store-YxykOFBo.js";import{rpg as b,RPG_PLUGIN_ID as j}from"./rpg-core-DN6dM24D.js";import{a as ie}from"./rpgStarter-BZZs81ni.js";import{a0 as oe}from"./builtInPropThumbnails.generated-HzKuy-AN.js";import"./preload-helper-BXl3LOEh.js";import"./react-core-CuKebU_E.js";import"./homeScreen-DWeXwjuD.js";import"./uiSkills-CIgnuI_Z.js";import"./index-Bs7J9eks.js";import"./motion-engine-CNzg_hOY.js";import"./larch-math-Drr7IFNz.js";import"./persistence-DGvRRu3C.js";import"./cacheJanitor-C9c5twik.js";import"./compression-NJe3JlLV.js";import"./flow-engine-CDPGInjf.js";import"./billingStatus-CWWbavpD.js";import"./coins-BVGc2fVI.js";import"./rpgKenney-D5ACtHqq.js";var I=Object.freeze,se=Object.defineProperty,le=(e,r)=>I(se(e,"raw",{value:I(e.slice())})),M;const P=e=>e.replace(/[\\"]/g,r=>`\\${r}`),ce={attack:["#ff6b5e","#d93a3a"],skill:["#3d8bfd","#2a66d6"],power:["#ffb938","#e09a12"],team:["#2fb47a","#17834a"],curse:["#8d95a8","#6c7489"]},de={N:"#dfe4ee",R:"#5b9bf5",SR:"#ff8fbf",SSR:"#ffc53d",UR:"conic"};function me(e){const r=(n,l,a,m)=>`"${n}": { "type": "image", "label": "${l}", "labelEn": "${a}", "default": "${P(m)}" }`,o=(n,l,a,m)=>`"${n}": { "type": "text", "label": "${l}", "labelEn": "${a}", "default": "${P(m)}", "maxLength": 40 }`,c=(n,l)=>{const[a,m]=ce[n.type],y=de[n.rarity];return`<figure class="mcard c${l+1}${n.rarity==="UR"?" ur":""}" style="--type:${a};--type-lo:${m};--frame:${y==="conic"?"#ff8fbf":y}">
      <span class="mbody"><img data-larch-param="card${l+1}" alt=""><b data-larch-param="card${l+1}Name"></b></span>
      <i class="mcost">${n.cost}</i>
    </figure>`};return String.raw(M||(M=le([`<script type="application/larch-params">
{
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  `,`,
  "intro": { "type": "select", "label": "入場動畫", "labelEn": "Entrance", "options": [ { "value": "full", "label": "完整", "labelEn": "Full" }, { "value": "quick", "label": "快速", "labelEn": "Quick" }, { "value": "off", "label": "關閉", "labelEn": "Off" }], "default": "full" }`,`
}
<\/script>
<style>
:root { --ink: #2b3350; --muted: #5f6886; --t: 1; --font: "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif; }
html[data-skin-intro="quick"] { --t: .45; }
html[data-skin-intro="off"] { --t: 0; }
* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; overflow: hidden; background: #bfe0ff; }
body { color: var(--ink); font-family: var(--font); -webkit-font-smoothing: antialiased; }
.screen { position: fixed; inset: 0; overflow: hidden; isolation: isolate; }
img[data-empty] { visibility: hidden; }

/* 背景：第一章的天空塔，慢慢推近；下面一層白霧，人物站得穩。 */
.bg { position: absolute; inset: -3%; width: 106%; height: 106%; background: #cfe6ff center / cover no-repeat; animation: bg-in calc(1.4s * var(--t)) ease-out both, drift 40s ease-in-out calc(1.4s * var(--t)) infinite alternate; }
@keyframes bg-in { from { opacity: 0; transform: scale(1.06); } to { opacity: 1; transform: none; } }
@keyframes drift { to { transform: scale(1.035) translate3d(-.8%, -.5%, 0); } }
.haze { position: absolute; inset: auto 0 0; height: 38%; background: linear-gradient(180deg, transparent, rgba(238, 244, 252, .78) 70%, rgba(238, 244, 252, .92)); pointer-events: none; }
.motes { position: absolute; inset: 0; pointer-events: none; }
.motes i { position: absolute; left: var(--x); top: var(--y); width: .5vmin; height: .5vmin; border-radius: 50%; background: #fff; box-shadow: 0 0 1.2vmin #fff; opacity: 0; animation: mote 7s ease-in-out var(--d) infinite; }
.motes i:nth-child(1) { --x: 18%; --y: 30%; --d: 0s; } .motes i:nth-child(2) { --x: 34%; --y: 62%; --d: 1.4s; } .motes i:nth-child(3) { --x: 66%; --y: 24%; --d: 2.6s; }
.motes i:nth-child(4) { --x: 82%; --y: 54%; --d: 3.8s; } .motes i:nth-child(5) { --x: 50%; --y: 12%; --d: 5s; } .motes i:nth-child(6) { --x: 8%; --y: 70%; --d: 6.1s; }
@keyframes mote { 0%, 100% { opacity: 0; transform: translateY(0); } 50% { opacity: .9; transform: translateY(-3vmin); } }

/* 角色（左）與敵人（右）：去背立繪站在地上，輕輕呼吸。 */
.cast { position: absolute; bottom: 0; height: 100%; pointer-events: none; }
.cast img { position: absolute; bottom: var(--b, 3%); height: var(--h); max-width: none; object-fit: contain; filter: drop-shadow(0 1.2vmin 1.4vmin rgba(43, 51, 80, .22)); transform-origin: 50% 100%; }
.heroes { left: 0; width: 33%; }
.heroes .h1 { --h: 56%; left: -4%; z-index: 3; animation: in-left calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.35s * var(--t)) both, breathe 4.2s ease-in-out 1.6s infinite; }
.heroes .h2 { --h: 46%; --b: 12%; left: -18%; z-index: 2; filter: drop-shadow(0 1vmin 1.2vmin rgba(43, 51, 80, .18)) saturate(.92) brightness(.97); animation: in-left calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.5s * var(--t)) both, breathe 4.6s ease-in-out 1.9s infinite; }
.heroes .h3 { --h: 42%; --b: 14%; left: 26%; z-index: 1; filter: drop-shadow(0 1vmin 1.2vmin rgba(43, 51, 80, .18)) saturate(.92) brightness(.97); animation: in-left calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.62s * var(--t)) both, breathe 5s ease-in-out 2.2s infinite; }
.foes { right: 0; width: 33%; }
.foes .boss { --h: 56%; --b: 6%; right: -8%; z-index: 1; animation: in-right calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.45s * var(--t)) both, breathe 5.4s ease-in-out 1.8s infinite; }
.foes .f1 { --h: 22%; --b: 3%; right: 50%; z-index: 2; animation: in-right calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.6s * var(--t)) both, bob 3.2s ease-in-out 1.8s infinite; }
.foes .f2 { --h: 19%; --b: 60%; right: 64%; z-index: 2; animation: in-right calc(.9s * var(--t)) cubic-bezier(.2, 1.3, .35, 1) calc(.72s * var(--t)) both, bob 3.8s ease-in-out 2.1s infinite; }
@keyframes in-left { from { opacity: 0; transform: translateX(-8vw); } to { opacity: 1; transform: none; } }
@keyframes in-right { from { opacity: 0; transform: translateX(8vw); } to { opacity: 1; transform: none; } }
@keyframes breathe { 50% { transform: scaleY(1.012) translateY(-.2%); } }
@keyframes bob { 50% { transform: translateY(-1.6vmin); } }

/* 中間的面板，和從它後面扇形露出來的三張牌。 */
.center { position: absolute; left: 50%; top: 50%; width: min(32vw, 540px); transform: translate(-50%, -50%); }
.fan { position: absolute; inset: 0; pointer-events: none; }
.mcard { position: absolute; top: 4%; left: 50%; width: 42%; aspect-ratio: 5 / 7; margin: 0 0 0 -21%; font-size: clamp(9px, .95vw, 15px); transform-origin: 50% 110%; animation: fan calc(.8s * var(--t)) cubic-bezier(.2, 1.4, .35, 1) calc(.9s * var(--t)) both, float 5s ease-in-out 2.2s infinite; }
.mcard.c1 { --r: -24deg; --x: -64%; z-index: 0; }
.mcard.c2 { --r: 0deg; --x: 0%; --y: -16%; z-index: 0; animation-delay: calc(1s * var(--t)), 2.6s; }
.mcard.c3 { --r: 24deg; --x: 64%; z-index: 0; animation-delay: calc(1.1s * var(--t)), 3s; }
@keyframes fan { from { opacity: 0; transform: translate(0, 18%) rotate(0); } to { opacity: 1; transform: translate(var(--x), var(--y, 0)) rotate(var(--r)); } }
@keyframes float { 0%, 100% { transform: translate(var(--x), var(--y, 0)) rotate(var(--r)); } 50% { transform: translate(var(--x), calc(var(--y, 0%) - 2.5%)) rotate(var(--r)); } }
.mbody { position: absolute; inset: 0; display: block; padding: .38em; border-radius: 1em; background: var(--frame); box-shadow: 0 .3em 0 rgba(43, 51, 80, .18), 0 .8em 1.6em rgba(43, 51, 80, .22); overflow: hidden; }
.mcard.ur .mbody { background: conic-gradient(from var(--a, 0deg), #ff8fbf, #ffd25e, #7ee8b5, #6cc4ff, #a3b4ff, #ff8fbf); animation: spin 5s linear infinite; }
@property --a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes spin { to { --a: 360deg; } }
.mbody::before { content: ""; position: absolute; inset: .38em; border-radius: .75em; background: #fff; }
.mbody img { position: absolute; left: .75em; right: .75em; top: .75em; width: calc(100% - 1.5em); height: 60%; object-fit: cover; border-radius: .6em; background: #eef1f7; mix-blend-mode: multiply; }
.mbody b { position: absolute; left: 1em; right: 1em; top: calc(.75em + 60% - .9em); padding: .32em .4em; border-radius: 99em; background: #fff; box-shadow: 0 0 0 .14em var(--frame), 0 .18em 0 .14em rgba(43, 51, 80, .18); color: var(--ink); font-size: 1em; font-weight: 900; letter-spacing: .04em; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mcard.ur .mbody b { box-shadow: 0 0 0 .14em #ffd25e, 0 .18em 0 .14em rgba(43, 51, 80, .18); }
.mcost { position: absolute; left: -.55em; top: -.6em; display: grid; place-items: center; width: 2.5em; height: 2.5em; border-radius: 50%; background: var(--type); box-shadow: 0 0 0 .16em #fff, 0 .22em 0 .16em var(--type-lo); color: #fff; font-size: 1em; font-style: normal; font-weight: 900; -webkit-text-stroke: .1em var(--ink); paint-order: stroke; }

.panel { position: relative; z-index: 2; margin-top: 30%; padding: clamp(18px, 2.6vw, 40px) clamp(18px, 2.6vw, 40px) clamp(20px, 2.4vw, 36px); border-radius: clamp(22px, 2.2vw, 34px); background: rgba(255, 255, 255, .95); box-shadow: 0 .45vmin 0 #e3e8f1, 0 2.4vmin 5vmin rgba(43, 51, 80, .22); text-align: center; animation: pop calc(.7s * var(--t)) cubic-bezier(.2, 1.5, .35, 1) calc(.2s * var(--t)) both; }
@keyframes pop { from { opacity: 0; transform: translateY(4vmin) scale(.92); } to { opacity: 1; transform: none; } }
h1 { margin: 0; color: var(--ink); font-size: clamp(34px, 4.6vw, 76px); font-weight: 900; line-height: 1.08; letter-spacing: .06em; text-shadow: 0 .06em 0 #ffd25e; }
h1[data-empty] { display: none; }
.tagline { margin: .7em 0 0; color: var(--muted); font-size: clamp(12px, 1vw, 16px); font-weight: 800; letter-spacing: .32em; }
.tagline[data-empty] { display: none; }
.menu { display: grid; gap: clamp(8px, .85vw, 12px); margin: clamp(16px, 1.8vw, 28px) auto 0; width: min(100%, 360px); }
.menu button { position: relative; display: flex; align-items: center; justify-content: center; gap: .55em; min-height: clamp(42px, 3.6vw, 56px); padding: 0 1.2em; border: 0; border-radius: 999px; background: #fff; color: var(--ink); box-shadow: 0 .28em 0 #d2d9e6, inset 0 0 0 2px #d2d9e6; font: 900 clamp(15px, 1.2vw, 20px) / 1 var(--font); letter-spacing: .12em; cursor: pointer; transition: transform .35s cubic-bezier(.2, 1.7, .35, 1), box-shadow .15s, filter .15s; animation: rise calc(.55s * var(--t)) cubic-bezier(.2, 1.4, .35, 1) both; }
.menu button:nth-child(1) { animation-delay: calc(.55s * var(--t)); } .menu button:nth-child(2) { animation-delay: calc(.63s * var(--t)); } .menu button:nth-child(3) { animation-delay: calc(.71s * var(--t)); }
.menu button:nth-child(4) { animation-delay: calc(.79s * var(--t)); } .menu button:nth-child(5) { animation-delay: calc(.87s * var(--t)); } .menu button:nth-child(6) { animation-delay: calc(.95s * var(--t)); }
@keyframes rise { from { opacity: 0; transform: translateY(1.4vmin); } to { opacity: 1; transform: none; } }
.menu button svg { width: 1.15em; height: 1.15em; flex: none; }
.menu button:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); }
.menu button:active:not(:disabled) { transform: translateY(.18em); box-shadow: 0 .1em 0 #d2d9e6, inset 0 0 0 2px #d2d9e6; }
.menu button:focus-visible { outline: 3px solid #2a66d6; outline-offset: 3px; }
.menu button:disabled { opacity: .5; cursor: not-allowed; }
.menu button[hidden] { display: none; }
.menu .b-start { background: #ffc53d; color: #3d2a00; box-shadow: 0 .28em 0 #e09a12; }
.menu .b-start:active:not(:disabled) { box-shadow: 0 .1em 0 #e09a12; }
.menu .b-continue { background: #17834a; color: #fff; box-shadow: 0 .28em 0 #0f5f35; }
.menu .b-continue:active:not(:disabled) { box-shadow: 0 .1em 0 #0f5f35; }
.menu .b-online { background: #2a66d6; color: #fff; box-shadow: 0 .28em 0 #1c4aa3; }
.menu .b-online:active:not(:disabled) { box-shadow: 0 .1em 0 #1c4aa3; }
.menu .b-start::after { content: ""; position: absolute; inset: -3px; border-radius: inherit; box-shadow: 0 0 0 0 rgba(255, 197, 61, .55); animation: pulse 2.4s ease-out 2.2s infinite; pointer-events: none; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 197, 61, .5); } 80%, 100% { box-shadow: 0 0 0 1.4vmin rgba(255, 197, 61, 0); } }
.foot { position: absolute; left: 50%; bottom: 2.4vmin; transform: translateX(-50%); padding: .5em 1.2em; border-radius: 99em; background: rgba(255, 255, 255, .86); color: var(--muted); font-size: clamp(10px, .75vw, 13px); font-weight: 800; letter-spacing: .28em; white-space: nowrap; animation: rise calc(.6s * var(--t)) ease calc(1.2s * var(--t)) both; }

/* 直向（手機）：面板在中間偏上、牌從面板上緣扇形露出來，角色與敵人縮小站在下面兩側（不被面板蓋住）。 */
@media (orientation: portrait) {
  .center { top: 43%; width: min(82vw, 400px); }
  .panel { margin-top: 34%; padding: 18px 18px 20px; border-radius: 24px; }
  .mcard { width: 33%; margin-left: -16.5%; top: 2%; font-size: clamp(8px, 2.6vw, 12px); }
  .mcard.c1 { --x: -72%; } .mcard.c3 { --x: 72%; }
  h1 { font-size: clamp(30px, 9vw, 44px); }
  .tagline { font-size: 12px; letter-spacing: .24em; }
  .menu { gap: 8px; margin-top: 14px; }
  .menu button { min-height: 42px; font-size: 15px; }
  .heroes, .foes { width: 50%; }
  .heroes .h1 { --h: 24%; left: 4%; --b: .5%; } .heroes .h2 { --h: 19%; left: -16%; --b: 3%; } .heroes .h3 { display: none; }
  .foes .boss { --h: 23%; right: -4%; --b: .5%; } .foes .f1 { --h: 10%; right: 50%; --b: .5%; } .foes .f2 { --h: 8%; right: 62%; --b: 20%; }
  .haze { height: 30%; }
  .foot { display: none; }
}
`,`@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .001s !important; animation-iteration-count: 1 !important; } }
</style>
<main class="screen">
  <div class="bg" data-larch-param="background"></div>
  <div class="motes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="cast heroes" aria-hidden="true"><img class="h2" data-larch-param="hero2" alt=""><img class="h3" data-larch-param="hero3" alt=""><img class="h1" data-larch-param="hero1" alt=""></div>
  <div class="cast foes" aria-hidden="true"><img class="boss" data-larch-param="boss" alt=""><img class="f2" data-larch-param="foe2" alt=""><img class="f1" data-larch-param="foe1" alt=""></div>
  <div class="haze" aria-hidden="true"></div>
  <section class="center">
    <div class="fan" aria-hidden="true">`,`</div>
    <div class="panel">
      <h1 data-larch-slot="title"></h1>
      <p class="tagline" data-larch-param="tagline"></p>
      <nav class="menu" aria-label="主選單">
        <button class="b-start" data-larch-action="start"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13L18.5 12z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span data-larch-label="start">開始遊戲</span></button>
        <button class="b-continue" data-larch-action="continue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12v16l-6-4-6 4z"/></svg><span data-larch-label="continue">繼續遊戲</span></button>
        <button class="b-online" data-larch-action="online"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 6"/></svg><span data-larch-label="online">多人連線</span></button>
        <button class="b-collection" data-larch-action="collection"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="3" width="12" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h10"/></svg><span data-larch-label="collection">圖鑑收藏</span></button>
        <button class="b-more" data-larch-action="chapters"><span data-larch-label="chapters">選擇章節</span></button>
        <button class="b-more" data-larch-action="gallery"><span data-larch-label="gallery">CG 收藏</span></button>
      </nav>
    </div>
  </section>
  <p class="foot" aria-hidden="true">LARCH · CARD ROGUELIKE</p>
</main>`])),o("tagline","副標","Tagline",e.tagline),r("background","背景","Background",e.background),r("hero1","前面的角色","Front hero",e.heroes[0]),r("hero2","後面的角色（左）","Back hero (left)",e.heroes[1]),r("hero3","後面的角色（右）","Back hero (right)",e.heroes[2]),r("boss","魔王","Boss",e.enemies[0]),r("foe1","小怪一","Enemy 1",e.enemies[1]),r("foe2","小怪二","Enemy 2",e.enemies[2]),r("card1","卡牌一的圖","Card 1 art",e.cards[0].art),o("card1Name","卡牌一的名字","Card 1 name",e.cards[0].name),r("card2","卡牌二的圖","Card 2 art",e.cards[1].art),o("card2Name","卡牌二的名字","Card 2 name",e.cards[1].name),r("card3","卡牌三的圖","Card 3 art",e.cards[2].art),o("card3Name","卡牌三的名字","Card 3 name",e.cards[2].name),e.music?`,
  "bgm": { "type": "audio", "kind": "music", "label": "標題音樂", "labelEn": "Title music", "default": "${P(e.music)}" }`:"",re,e.cards.map(c).join(""))}const U={zh:"月蝕之塔（範例）",en:"Eclipse Tower (sample)"},E=e=>oe[`/packs/larch-card-roguelike/${e}`]||"",N="2026-10-13T00:00:00.000Z",w=(e,r,o,c)=>({id:e,type:"story",position:{x:r,y:o},data:c}),s=(e,r,o,c)=>({id:`e-${e}-${r}`,source:e,target:r,sourceHandle:"right",targetHandle:"left",animated:!0,...o?{label:o}:{},...c?{data:{condition:{kind:"variable",variable:c.variable,op:"eq",value:c.value}}}:{}}),pe=(e,r)=>{const o={id:j,name:"RPG 系統",version:"0.4.0",permissions:["variables:read","variables:write","assets:read","flow:control"]},c={id:"map",name:"RPG 地圖",icon:"map",color:"#4a7358",presentation:"fullscreen",skippable:!1,html:"",readVariables:["rpgHp","inventory","rpgState","rpgEquipment"],writeVariables:["rpgHp","inventory","rpgState","rpgEquipment",D.gift],fields:[{key:"map",kind:"longText",label:"地圖資料",defaultValue:JSON.stringify(r)}]};return{...L(o,c),title:e}};function Be(e){const r=D,o=Z,c=ae(),n=K({...c,run:{...c.run,acts:3}}),l=t=>n.heroes.find(i=>i.id===t)?.portrait||"",a={intro:"cr-intro",map1:"cr-map-1",village:"cr-village",camp:"cr-camp",floor2:"cr-floor-2",map2:"cr-map-2",witchTalk:"cr-witch-talk",duel:"cr-duel",summit:"cr-summit",map3:"cr-map-3",win:"cr-win",lose:"cr-lose"},m=G({afterBoss:"leave",map:{...n.run.map,floors:8,stops:[{id:"village",label:e?"塔下的村子":"The village",floor:2,row:!0,leave:!0,lines:[{who:"",text:e?"塔腳下有個小村子，炊煙一縷一縷往上飄。":"A small village sits at the foot of the tower."}]},{id:"camp",label:e?"營火":"Campfire",floor:5,row:!0,leave:!0,lines:[{who:"hero",text:e?"前面有火光……還有人在？":"A fire ahead… is someone there?"}]}]}},n.run.map),y=G({afterBoss:"leave",map:{...n.run.map,floors:7,stops:[{id:"witch",label:e?"魔女的房間":"The witch’s room",floor:4,row:!0,leave:!0,lines:[{who:"enemy:witch",text:e?"站住。這一層是我的。":"Stop. This floor is mine."}]}]}},n.run.map),Y=G({afterBoss:"leave",map:{...n.run.map,floors:7,stops:[{id:"moonlight",label:e?"月光迴廊":"Moonlit hall",floor:3,row:!0,leave:!1,lines:[{who:"enemy:queen",text:e?"爬到這裡了？那就上來吧，月亮在等你。":"You made it this far? Come up, then. The moon is waiting."}]}]}},n.run.map),R=(t,i,d,u,h)=>w(t,i,d,{...L(C,C.cards[1]),title:u,pluginValues:{map:JSON.stringify(h),game:""}}),F=w(a.duel,2360,360,{...L(C,C.cards[2]),title:e?"魔女戰":"The witch",pluginValues:{battle:JSON.stringify(Q({useRun:!0,encounter:"a2-witch",retry:!0})),game:""}}),g=ie();g.name=e?"塔下的村子":"The village",g.events=g.events.map(t=>t.id==="elder"?{...t,name:e?"村長":"Elder",actions:[{...b.action("elder-tower"),text:e?`你要爬月蝕之塔？
路邊那個寶箱裡的東西給你，打開它就出發吧。`:`Climbing the Eclipse Tower?
Take what is in that chest by the road, then off you go.`}]}:t.id==="chest"?{...t,name:e?"寶箱":"Chest",actions:[{...b.action("chest-found"),text:e?`打開寶箱：拿到 50 金幣和一張卡牌！
該回塔裡了。`:`You open the chest: 50 gold and a card!
Back to the tower.`},{...b.action("chest-gift","variable"),variable:r.gift,value:"gold:50 card:random"},{...b.action("chest-leave","jump"),cardId:a.map1}]}:t),g.events.push({...b.event("road-east",16,8),name:e?"回塔的小路":"Road to the tower",trigger:"touch",area:[[0,1]],actions:[{...b.action("road-east-say"),text:e?"沿著小路，回到塔裡。":"You follow the road back to the tower."},{...b.action("road-east-leave","jump"),cardId:a.map1}]});const _=(t,i,d,u,h,v,$={})=>w(t,i,d,{type:"scene",title:u,text:h,background:E(`bg/${v}.webp`),...$}),x=(t,i,d,u,h,v,$)=>w(t,i,d,{type:"dialogue",title:u,speaker:v[0][0],text:v[0][1],background:E(`bg/${$}.webp`),character:h,characterPosition:"right",characterLayers:[{id:`layer-${t}`,url:h,position:"right",x:64,y:0,scale:.8}],dialogueLines:v.map(([J,W],X)=>({id:`${t}-${X}`,speaker:J,text:W}))}),B=[_(a.intro,60,300,e?"序章：紅月升起":"Prologue: the red moon",e?`紅月升起的那一夜，塔頂傳來狼嚎。

選一位冒險者，從塔底一路往上爬。`:`On the night the red moon rose, a howl came from the top of the tower.

Pick an adventurer and climb.`,"act1",{start:!0}),R(a.map1,520,300,e?"第一章：塔底森林":"Act 1: the forest",m),w(a.village,980,-400,pe(e?"塔下的村子":"The village",g)),x(a.camp,980,300,e?"營火旁的老騎士":"The old knight",l("gran"),e?[["葛蘭","坐吧，年輕人。爬這座塔的人，很少有活著下來的。"],["葛蘭","狼王怕火光，也怕你不放棄。"],["{{hero}}","……謝謝，我會記住。"]]:[["Gran","Sit down. Few who climb this tower come back."],["Gran","The wolf king fears fire, and people who don’t give up."],["{{hero}}","Thank you. I’ll remember."]],"act1"),x(a.floor2,980,660,e?"塔的二樓":"The second floor",l("nova"),e?[["諾瓦","狼王倒了。二樓住著血月伯爵，還有他養的魔女。"],["諾瓦","小心，她會擋在半路。"]]:[["Nova","The wolf king is down. The blood count lives upstairs, with his witch."],["Nova","Careful, she waits half way."]],"act2"),R(a.map2,1440,660,e?"第二章：血月城":"Act 2: the blood castle",y),x(a.witchTalk,1900,360,e?"魔女擋路":"The witch",n.enemies.find(t=>t.id==="witch")?.portrait||"",e?[["魔女","伯爵大人在睡覺，誰都不准上去。"],["{{hero}}","那就打過去。"]]:[["Witch","The count is asleep. Nobody goes up."],["{{hero}}","Then I’ll fight my way up."]],"act2"),F,x(a.summit,1900,900,e?"通往塔頂":"To the summit",l("lia"),e?[["莉亞","伯爵倒了，可是月亮還是黑的。"],["莉亞","塔頂坐著蝕月女王，月亮就藏在她的王冠裡。"],["{{hero}}","那就去把它拿回來。"]]:[["Lia","The count is down, but the moon is still dark."],["Lia","The eclipse queen sits at the top. She hid the moon in her crown."],["{{hero}}","Then let’s take it back."]],"act3"),R(a.map3,2360,900,e?"第三章：塔頂":"Act 3: the summit",Y),_(a.win,2820,900,e?"結局：登頂":"Ending: the summit",e?`月蝕散去，天空重新亮了起來。

這一局的牌組，就是你的冒險故事。`:`The eclipse fades and the sky grows bright again.

This deck is the story of your climb.`,"act3"),_(a.lose,2820,1260,e?"結局：再挑戰一次":"Ending: try again",e?`這次在半路倒下了。

換一位角色、換一套打法，再爬一次吧。`:`You fell on the way this time.

Pick another hero, try another deck, and climb again.`,"act2")],p=r.result,k=r.stop,O=[s(a.intro,a.map1),s(a.map1,a.village,e?"村子":"Village",{variable:k,value:"village"}),s(a.map1,a.camp,e?"營火":"Campfire",{variable:k,value:"camp"}),s(a.camp,a.map1),s(a.map1,a.floor2,e?"打完狼王":"Boss down",{variable:p,value:"act"}),s(a.map1,a.lose,e?"倒下":"Fell",{variable:p,value:"lose"}),s(a.floor2,a.map2),s(a.map2,a.witchTalk,e?"魔女":"Witch",{variable:k,value:"witch"}),s(a.witchTalk,a.duel),s(a.duel,a.map2,e?"贏了":"Won",{variable:o.result,value:"win"}),s(a.duel,a.lose,e?"輸了":"Lost",{variable:o.result,value:"lose"}),s(a.map2,a.summit,e?"打完伯爵":"Boss down",{variable:p,value:"act"}),s(a.map2,a.lose,e?"倒下":"Fell",{variable:p,value:"lose"}),s(a.summit,a.map3),s(a.map3,a.win,e?"通關":"Cleared",{variable:p,value:"win"}),s(a.map3,a.lose,e?"倒下":"Fell",{variable:p,value:"lose"})],V=[["lia","莉亞","Lia"],["nova","諾瓦","Nova"],["gran","葛蘭","Gran"]].map(([t,i,d])=>({id:`char-${t}`,name:e?i:d,slug:t,role:n.heroes.find(u=>u.id===t)?.title,portraitUrl:l(t),expressions:[]})),f=(t,i,d)=>({id:`var-${t}`,name:t,label:t,type:i,defaultValue:i==="number"?0:"",description:d}),H=e?U.zh:U.en,S=t=>n.enemies.find(i=>i.id===t)?.portrait||"",A=t=>{const i=n.cards.find(d=>d.id===t)||n.cards[0];return{art:i.art||"",name:i.name,type:i.type,rarity:i.rarity,cost:i.cost}},q=me({background:n.run.backgrounds[0]||"",tagline:n.run.subtitle||"",heroes:[l("lia"),l("gran"),l("nova")],enemies:[S("wolfking"),S("toadstool"),S("lantern")],cards:[A("lia-whirl"),A("lia-crimson"),A("gran-aegis")],music:te.find(t=>t.key==="map")?.url}),T=(t,i)=>({id:`action-${t}`,kind:"button",action:t,x:8,y:i,width:19,size:1.25,icon:!0});return{schemaVersion:1,id:"card-rogue-sample",name:H,description:e?"卡牌冒險的範例：卡牌地圖的劇情點接對話卡與 RPG 地圖，中途用目前這一局打一場卡牌戰鬥，打完魔王回到故事。卡牌與敵人在「新增卡片 → 擴充功能 → 卡牌資料庫」。":"A card adventure sample: story stops on card maps lead to dialogue cards and an RPG map, a card battle uses the current run, and the story picks up after each boss. Cards and enemies live in Add card → Plugins → Card database.",locale:e?"zh-Hant":"en",createdAt:N,updatedAt:N,nodes:B,edges:O,activeBoardId:"main",boards:[{id:"main",name:e?"主線":"Main",kind:"story",nodes:B,edges:O,updatedAt:N}],media:[],characters:V,variables:[f(p,"string",e?"卡牌冒險的結果：win、lose、act（打完一張地圖的魔王）、stop（停在劇情點）":"win, lose, act or stop"),f(r.floor,"number",e?"到達的樓層（第 2 章第 3 層是 103）":"Floor reached"),f(r.gold,"number",e?"結束時的金幣":"Gold left"),f(k,"string",e?"停在哪個劇情點":"Which story stop"),f(r.gift,"string",e?"故事送進卡牌冒險的獎勵（RPG 寶箱寫 gold:50 card:random）":"Gift into the card run"),f(o.result,"string",e?"卡牌戰鬥的結果：win 或 lose":"Card battle result"),f(o.hp,"number",e?"卡牌戰鬥打贏時剩下的生命":"HP left after a card battle")],settings:{resolution:{width:1920,height:1080},textSpeed:30,plugins:{[z]:{enabled:!0,settings:{[ee]:JSON.stringify(n),tutorial:"done"}},[j]:{enabled:!0,settings:{online:JSON.stringify({enabled:!0}),tutorial:"done"}},"larch-inventory":{enabled:!0,settings:{hudEnabled:!1}}},...E("cover.webp")?{projectThumbnail:E("cover.webp")}:{},titleScreen:{layers:[{id:"name",kind:"text",role:"title",x:8,y:33,size:7.4,width:44,align:"left",text:n.run.title},T("start",49.5),T("continue",56),T("online",62.5),T("collection",69)]},cgGalleryEnabled:!1,customInterfaces:{title:{enabled:!0,html:q,skin:{id:ne,name:e?"月蝕之塔標題":"Eclipse Tower title",official:!0}}}}}}export{U as CARD_ROGUE_SAMPLE_NAME,Be as cardRogueSampleProject};
