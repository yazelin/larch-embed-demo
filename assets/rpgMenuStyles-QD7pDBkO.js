const oe={page:"#f8ebcf",well:"#f0dcb3",deep:"#e3c592",tab:"#e9cd98",edge:"#b98553",glow:"#fff4dc",ink:"#4a2c1c",soft:"#6b4630",line:"#8a5a39",border:"#6e4329",dark:"#2e1a10",cover:"#5d3624",coverDeep:"#43251a",coverInk:"#ecd9b8",accent:"#a5412c",accentDeep:"#86321f",onAccent:"#fff6e6",gold:"#e5ae52",goldHi:"#f0c46e",up:"#2f6a22",track:"#5a3522",hp:"#8fd06a",hpLow:"#f08f74"},{page:s,well:w,deep:C,tab:J,edge:k,glow:$,ink:n,soft:m,line:T,border:u,dark:f,coverInk:ae,accent:i,accentDeep:z,onAccent:b,gold:R,track:we,hp:ee,hpLow:pe}=oe,A=`background:${s};color:${n};border:2px solid ${u};border-radius:14px;box-shadow:0 3px 0 ${k},0 12px 28px #3b21122e;backdrop-filter:none;`,H={...oe,coverHi:"#71442d"},ne={shadow:"#3b2112",deepShadow:"#1d0f08",stitch:"#c9975a",tint:"#9a6a3f",goldTint:"#c9a06a",backdrop:"#2b170f",grainHi:"#fff8e6",paperHi:"#fffaf0",paperLo:"#ecd5a6"},E=ne.backdrop;function D(e){return e.cover===H.cover&&e.page===H.page?ne:{shadow:e.dark,deepShadow:e.dark,stitch:e.edge,tint:e.line,goldTint:e.gold,backdrop:e.dark,grainHi:e.glow,paperHi:e.glow,paperLo:e.deep}}function te(e){const{deepShadow:o,stitch:d}=D(e);return`background:radial-gradient(130% 90% at 50% 0%,${e.coverHi},${e.cover} 52%,${e.coverDeep});color:${e.page};border:2px solid ${e.dark};border-radius:22px;box-shadow:inset 0 0 0 1px ${e.line}99,0 30px 80px ${o}80;outline:2px dashed ${d}8c;outline-offset:-9px;backdrop-filter:none;`}const ke=te(H);function ie(e){const{paperHi:o,paperLo:d}=D(e);return`radial-gradient(120% 80% at 22% 0%,${o},transparent 60%),radial-gradient(120% 90% at 80% 100%,${d},transparent 62%)`}const se=e=>`linear-gradient(180deg,${D(e).paperHi}a6,${D(e).paperHi}00 58%)`,K=se(H),U=ie(H);function de(e,o){const{tab:d,ink:x,border:v,glow:c,accent:h,onAccent:p,accentDeep:a,deep:g,well:t,soft:l,line:Q}=o,O=se(o),{paperHi:L}=D(o);return`
${e}{background:${O},${d};color:${x};border:2px solid ${v};border-radius:10px;box-shadow:0 2px 0 ${v};font-family:RpgPixel,monospace;font-weight:400;font-synthesis:none;min-height:44px;padding:8px 14px;cursor:pointer;text-shadow:none;backdrop-filter:none;transition:transform .16s ease,background-color .16s ease,box-shadow .16s ease}
${e}:hover{background:${O},${c};color:${x};border-color:${v};box-shadow:0 3px 0 ${v};transform:translateY(-1px)}
${e}:is([aria-current=page],[aria-pressed=true],.active){background:${h};color:${p};border-color:${p};box-shadow:0 0 0 2px ${a},0 3px 0 ${a}}
${e}:focus-visible{outline:3px solid var(--paper-focus,${h});outline-offset:3px}
${e}:active{background:${g};color:${x};box-shadow:0 0 0 ${v};transform:translateY(2px)}
${e}:disabled{background:linear-gradient(180deg,${L}5c,${L}00 58%),${t};color:${l};border:2px dashed ${Q};box-shadow:none;transform:none;cursor:not-allowed;opacity:1}
${e} :is(span,b,small,svg){color:inherit}
@media(prefers-reduced-motion:reduce){${e}{transition:none}${e}:is(:hover,:active){transform:none}}
`}function j(e){return de(e,H)}const le="transform:translate(.04em,-.11em)",ue=(e,o,d=o.ink)=>`
${e}{position:relative;display:grid;place-items:center;flex:none;width:44px;height:44px;min-height:44px;padding:0;border:0;border-radius:50%;background:transparent;color:${d};box-shadow:none;text-shadow:none;backdrop-filter:none;opacity:.8;font-size:0;cursor:pointer;transform:none;transition:opacity .2s ease,scale .4s cubic-bezier(.34,1.56,.64,1)}
${e}:before{content:'×';font:32px/1 RpgPixel,monospace;color:inherit;${le}}
${e} svg{display:none}
${e}:hover{background:transparent;color:${d};border:0;box-shadow:none;opacity:1;scale:1.1;transform:none}
${e}:active{background:transparent;color:${d};border:0;box-shadow:none;opacity:1;scale:.86;transform:none}
${e}:focus-visible{opacity:1;outline:3px solid var(--paper-focus,${o.accent});outline-offset:0}
@media(prefers-reduced-motion:reduce){${e}{transition:opacity .2s ease}${e}:is(:hover,:active){scale:1}}
`,M=(e,o)=>ue(e,H,o),Pe=`
body>header{${A}gap:12px;padding:8px 10px 8px 14px}
body>header strong{color:${n};font-size:20px;letter-spacing:1px}
${j("body>header button")}
body>header button{width:40px;height:40px;min-height:40px;padding:0;border-radius:50%;font-size:14px}
body>header #menu{font-size:22px}
/* HD-2D: the line the first map shows about turning the camera. */
.cam-tip{position:absolute;z-index:4;left:50%;bottom:calc(max(18px,env(safe-area-inset-bottom)) + 104px);margin:0;padding:9px 18px;border-radius:999px;background:#1d120bd9;color:${$};font:15px/1.3 RpgPixel,monospace;letter-spacing:.5px;white-space:nowrap;box-shadow:0 8px 24px #0005;transform:translateX(-50%);pointer-events:none;animation:cam-tip .5s cubic-bezier(.2,1.3,.4,1) both;transition:opacity .5s ease}
.cam-tip.leaving{opacity:0}
@keyframes cam-tip{from{opacity:0;translate:0 10px}to{opacity:1;translate:0}}
@media(prefers-reduced-motion:reduce){.cam-tip{animation:none}}
.hud-faces canvas{border-bottom:0}
/* On an action map the followers' faces are buttons: tap one (or press Q) to take control of them. */
body>header .hud-faces button.hud-face{display:grid;place-items:center;width:auto;height:auto;min-height:0;padding:1px;border:2px solid transparent;border-radius:6px;background:transparent;color:${n};box-shadow:none;transform:none;cursor:pointer}
body>header .hud-faces button.hud-face:hover{background:${$};color:${n};border-color:${u};box-shadow:none;transform:translateY(-1px)}
body>header .hud-faces button.hud-face:active{background:${C};color:${n};border-color:${u};box-shadow:none;transform:translateY(1px)}
body>header .hud-faces button.hud-face:focus-visible{outline:3px solid ${i};outline-offset:1px}
.hud-faces canvas.hud-lead{margin:3px;outline:2px solid ${i};outline-offset:1px;border-radius:3px}
.hud-hp{width:104px;height:8px;border:2px solid ${u};border-radius:6px;background:${we};box-shadow:none;overflow:hidden}
.hud-hp i{background:linear-gradient(180deg,#b4e690,${ee});color:${f}}
.hud-hp.low i{background:linear-gradient(180deg,#f7b29d,${pe});color:${f}}
.hud-hp-text{color:${m}}
/* The quest note: a small bookmarked slip under the HUD card that folds into a tab. */
#quest-wrap{position:absolute;z-index:2;left:max(16px,env(safe-area-inset-left));top:var(--hud-bottom,92px);display:flex;align-items:flex-start;gap:6px;max-width:min(330px,calc(100% - 32px))}
#quest-wrap[hidden]{display:none}
#quest{${A}position:relative;top:auto;right:auto;left:auto;width:auto;min-width:0;max-width:100%;padding:6px 30px 8px 20px;font:13px/1.45 RpgPixel,monospace;text-align:left}
#quest:before{content:'';position:absolute;left:7px;top:-2px;width:7px;height:20px;background:${i};clip-path:polygon(0 0,100% 0,100% 100%,50% 74%,0 100%)}
#quest small{display:block;margin:0 0 1px;color:${i};font:11px/1.4 RpgPixel,monospace;letter-spacing:.5px}#quest span{color:${n}}#quest:after{right:9px;color:${i};font-size:16px}
#quest:hover{background:${$};color:${n}}#quest:active{background:${w};color:${n}}#quest:focus-visible{outline:3px solid ${n};outline-offset:3px}
${j("#quest-fold")}
#quest-fold{flex:none;min-width:30px;height:30px;min-height:30px;padding:0 8px;border-radius:999px;font-size:13px;line-height:1}
#quest-wrap.folded #quest{display:none}#quest-wrap.folded #quest-fold{padding:0 12px}
@media(max-width:700px){#quest-wrap{left:12px;max-width:calc(100% - 24px)}}
@keyframes quest-updated{0%{box-shadow:0 3px 0 ${k},0 0 0 0 ${i}00}20%{box-shadow:0 3px 0 ${k},0 0 0 5px ${i}}100%{box-shadow:0 3px 0 ${k},0 12px 28px #3b21122e}}
.rpg-waypoint{padding:4px 12px;min-height:30px;background:${J};color:${n};border:2px solid ${u};border-radius:999px;font:14px/1.3 RpgPixel,monospace;box-shadow:0 2px 0 ${u};backdrop-filter:none}
.rpg-waypoint:after{left:calc(50% - 5px);bottom:-7px;width:8px;height:8px;background:${J};color:${n};border-right:2px solid ${u};border-bottom:2px solid ${u}}
.rpg-waypoint[data-kind=exit]{border-radius:8px;border-bottom:2px solid ${u};background:${s}}.rpg-waypoint[data-kind=exit]:after{background:${s}}
.rpg-waypoint.is-objective{background:${s};color:${n};border-color:${i};box-shadow:0 2px 0 ${i}}.rpg-waypoint.is-objective:after{background:${s};border-color:${i}}
.rpg-waypoint.is-objective:before{content:'!';position:absolute;right:-10px;top:-12px;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:${i};color:${b};border:2px solid ${s};font:12px/1 RpgPixel,monospace;animation:wp-hop 1.6s ease-in-out infinite}
@keyframes wp-hop{0%,70%,100%{translate:0 0}82%{translate:0 -3px}}
.rpg-waypoint:hover{background:${$};color:${n};border-color:${u}}.rpg-waypoint:hover:after{background:${$}}
.rpg-waypoint.is-objective:hover{border-color:${i}}
.rpg-waypoint:active{background:${C};color:${n}}.rpg-waypoint:active:after{background:${C}}
.rpg-waypoint:focus-visible{outline:3px solid ${n};outline-offset:3px}
${j("body>footer button")}
body>footer .pad button{width:48px;height:48px;padding:0;border-radius:50%;font-size:22px}
body>footer .stick{background:color-mix(in srgb,${s} 62%,transparent);border:2px solid ${u};box-shadow:0 3px 0 ${z}66}body>footer .stick i{background:${s};border:2px solid ${f};box-shadow:0 3px 0 ${f}}body>footer .stick.active i{background:${i};border-color:${z};box-shadow:0 3px 0 ${z}}
body>footer #interact{border-radius:999px;background:${i};color:${b};border-color:${b};box-shadow:0 0 0 2px ${z},0 3px 0 ${z}}
body>footer #interact:hover{background:${z};color:${b};border-color:${b}}
body>footer .hint,#notice{${A}font-size:12px;line-height:2;padding:4px 10px}
#banner{${A}min-width:min(380px,80vw);padding:10px 44px 12px;gap:2px}
#banner:before,#banner:after{content:'';position:absolute;top:12px;bottom:-10px;width:26px;height:auto;background:${i};clip-path:polygon(0 0,100% 0,100% 100%,0 100%,42% 50%);z-index:-1}
#banner:before{left:-28px}#banner:after{right:-28px;transform:scaleX(-1)}
#banner strong{color:${n};text-shadow:none;font-size:30px;letter-spacing:.12em}
#banner small{color:${i};text-shadow:none}
#loader{background:${E};color:${s}}#loader:before{background:radial-gradient(ellipse 80% 70% at 50% 42%,#6a3f2a 0%,#47281b 55%,${E} 100%)}
#loader small{color:${R}}#loader strong{color:${s}}#loader p{color:${ae}}
#loader .loader-bar{height:6px;border-radius:4px;background:#f8ebcf2e}#loader .loader-bar i{background:linear-gradient(90deg,${i},${R})}
#loader .loader-motes i{background:${R};color:${f};box-shadow:0 0 8px ${R}}
${j("#loader .loader-actions button")}
#loader .loader-actions button{font:18px/1.4 RpgPixel,monospace;--paper-focus:${R}}
body:after{background:${E}}
/* The HUD card and the quest note, dressed up: a paper plaque with an inner highlight, a pin before the place's name, a
   dotted rule over the party row, the faces in round frames, a heart and a rounded HP bar with a sheen, a level badge,
   and the note with a "!" badge before 遊戲任務. */
body>header{background:${U},${s};border-radius:16px;box-shadow:inset 0 0 0 2px ${$},0 3px 0 ${k},0 14px 30px #3b21123d;padding:9px 10px 9px 14px}
body>header strong{display:flex;align-items:center;gap:8px;font-size:19px}
body>header strong:before{content:'';flex:none;width:11px;height:11px;margin:0 1px 2px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:radial-gradient(circle,${b} 0 2px,${i} 2.6px);box-shadow:0 1px 0 ${z}}
body>header .location{gap:6px}
.hud-party{gap:7px;padding-top:6px;border-top:2px dotted ${k}}
.hud-faces{align-items:center;gap:4px}
.hud-faces canvas{width:28px;border-radius:5px;background:${w};box-shadow:0 0 0 2px ${u}}
.hud-faces:after{content:'\\2665';margin-left:3px;color:#c23a31;font:15px/1 system-ui,sans-serif}
.hud-hp{width:112px;height:12px;border-radius:999px;box-shadow:inset 0 2px 0 #0000003d}
.hud-hp i{border-radius:999px;background:linear-gradient(180deg,#d6f5b8,${ee} 52%,#6fae4d);box-shadow:inset 0 1px 0 #ffffff8c}
.hud-hp.low i{background:linear-gradient(180deg,#ffd2c4,${pe} 52%,#cf654b)}
.hud-hp-text{display:inline-flex;align-items:center;gap:6px;color:${m}}
.hud-hp-text .hud-lv{padding:1px 7px 2px;border-radius:999px;background:${i};color:${b};font:11px/1.3 RpgPixel,monospace;font-style:normal;letter-spacing:.5px}
#quest{background:${U},${s};border-radius:14px;box-shadow:inset 0 0 0 2px ${$},0 3px 0 ${k},0 12px 26px #3b21122e;padding:7px 32px 9px 22px;transition:transform .16s ease,box-shadow .16s ease}
#quest small{display:flex;align-items:center;gap:6px;letter-spacing:1px}
#quest small:before{content:'!';display:grid;place-items:center;flex:none;width:15px;height:15px;border-radius:50%;background:${i};color:${b};font:10px/1 RpgPixel,monospace}
#quest span{display:block;margin-top:2px;font-size:14px}
#quest:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 2px ${$},0 4px 0 ${k},0 14px 28px #3b21123d}
#quest:active{transform:translateY(1px);box-shadow:inset 0 0 0 2px ${$},0 1px 0 ${k},0 6px 14px #3b21122e}
/* With the cozy dialogue box, the HUD card, the quest note, the online chip and their buttons are cut from the same cloth:
   the box's own cream and ink, a thick frame in its border colour with a light inner edge and a ledge under it, dots fading
   into a corner, and the place's name on a striped tag riding the top edge like the speaker's nameplate. The colours come
   from the dialogue theme (the runtime sets --cz-*), so a recoloured box brings its HUD along. */
body.hud-cozy{--cz-panel:#fbf1dc;--cz-ink:#4a2e1c;--cz-border:#6b4526;--cz-accent:#a4552a;--cz-lift:color-mix(in srgb,var(--cz-panel) 45%,#fff);--cz-ledge:color-mix(in srgb,var(--cz-border) 55%,transparent);--cz-soft:color-mix(in srgb,var(--cz-panel) 70%,#fff)}
body.hud-cozy>header{margin-top:14px;padding:18px 12px 10px 16px;background:var(--cz-panel);color:var(--cz-ink);border:3px solid var(--cz-border);border-radius:20px;box-shadow:inset 0 0 0 3px var(--cz-lift),0 5px 0 var(--cz-ledge),0 16px 34px rgba(40,22,8,.3)}
body.hud-cozy>header:before{content:'';position:absolute;z-index:-1;right:6px;bottom:6px;width:52%;height:84%;border-bottom-right-radius:14px;background:radial-gradient(circle,color-mix(in srgb,var(--cz-accent) 30%,transparent) 1.5px,transparent 2px) 0 0/10px 10px;-webkit-mask-image:radial-gradient(ellipse at 100% 100%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse at 100% 100%,#000 0%,transparent 72%);pointer-events:none}
body.hud-cozy>header strong{position:absolute;z-index:1;top:-17px;left:14px;max-width:calc(100% - 28px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:3px 14px 4px 12px;border:3px solid var(--cz-border);border-radius:999px;background:repeating-linear-gradient(135deg,rgba(0,0,0,.09) 0 6px,transparent 6px 12px),var(--cz-accent);color:var(--cz-panel);font-size:15px;font-weight:800;letter-spacing:.12em;box-shadow:0 3px 0 var(--cz-ledge)}
body.hud-cozy>header strong:before{background:radial-gradient(circle,var(--cz-accent) 0 2px,var(--cz-panel) 2.6px);box-shadow:none}
body.hud-cozy>header .location{gap:0}
body.hud-cozy .hud-party{padding-top:4px;border-top:0}
body.hud-cozy .hud-faces canvas{box-shadow:0 0 0 2px var(--cz-border)}
body.hud-cozy .hud-hp{border-color:var(--cz-border)}
body.hud-cozy .hud-hp-text{color:var(--cz-ink)}
body.hud-cozy .hud-hp-text .hud-lv{border:2px solid var(--cz-border);background:repeating-linear-gradient(135deg,rgba(0,0,0,.09) 0 5px,transparent 5px 10px),var(--cz-accent);color:var(--cz-panel)}
body.hud-cozy>header>button,body.hud-cozy #quest-fold,body.hud-cozy .mp-chip{border:2px solid var(--cz-border);background:var(--cz-soft);color:var(--cz-ink);box-shadow:0 3px 0 var(--cz-ledge);text-shadow:none;transform:none}
body.hud-cozy>header>button{width:42px;height:42px;min-height:42px;border-radius:13px}
body.hud-cozy>header>button:hover,body.hud-cozy #quest-fold:hover,body.hud-cozy .mp-chip:hover{background:var(--cz-accent);color:var(--cz-panel);border-color:var(--cz-border);transform:translateY(-1px);box-shadow:0 4px 0 var(--cz-ledge)}
body.hud-cozy>header>button:active,body.hud-cozy #quest-fold:active,body.hud-cozy .mp-chip:active{transform:translateY(2px);box-shadow:0 1px 0 var(--cz-ledge)}
body.hud-cozy>header>button:focus-visible,body.hud-cozy #quest-fold:focus-visible,body.hud-cozy .mp-chip:focus-visible{outline:3px solid var(--cz-border);outline-offset:2px}
body.hud-cozy #quest{background:var(--cz-panel);color:var(--cz-ink);border:3px solid var(--cz-border);border-radius:16px;box-shadow:inset 0 0 0 3px var(--cz-lift),0 4px 0 var(--cz-ledge),0 12px 26px rgba(40,22,8,.26)}
body.hud-cozy #quest:hover{background:var(--cz-panel);box-shadow:inset 0 0 0 3px var(--cz-lift),0 5px 0 var(--cz-ledge),0 14px 28px rgba(40,22,8,.3)}
body.hud-cozy #quest:active{background:var(--cz-soft);box-shadow:inset 0 0 0 3px var(--cz-lift),0 1px 0 var(--cz-ledge)}
body.hud-cozy #quest:before,body.hud-cozy #quest small:before{background:var(--cz-accent);color:var(--cz-panel)}
body.hud-cozy #quest small,body.hud-cozy #quest:after{color:var(--cz-accent)}
body.hud-cozy #quest span{color:var(--cz-ink)}
body.hud-cozy #quest:focus-visible{outline:3px solid var(--cz-border);outline-offset:3px}
body.hud-cozy #quest-fold{border-radius:11px}
body.hud-cozy .mp-chip{font-weight:700}
@media(prefers-reduced-motion:reduce){body.hud-cozy :is(header>button,#quest-fold,.mp-chip):is(:hover,:active){transform:none}}
@media(prefers-reduced-motion:reduce){#quest{transition:none}#quest:is(:hover,:active){transform:none}}
@media(max-width:700px){.rpg-waypoint{font-size:12px;padding:3px 9px;min-height:28px}}
@media(max-width:600px){#banner strong{font-size:24px}#banner{padding:8px 32px 10px}}
@media(prefers-reduced-motion:reduce){.rpg-waypoint.is-objective:before{animation:none}}
`,re=e=>`
${e} .rpg-pause-menu,${e}.rpg-pause-menu[open]{grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto minmax(0,1fr) auto;grid-template-areas:"title close" "nav nav" "book book" "foot foot";padding:10px 12px;column-gap:10px}
${e} .pm-where,${e} .pm-footer kbd,${e} .pm-footer:before,${e} .pm-footer:after{display:none}
${e} .pm-header>div:first-child{padding:0 2px 4px}${e} .pm-header h2{font-size:22px}
${e} .pm-nav{overflow:visible;padding:6px 2px 10px}${e} .pm-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
${e} .pm-nav button.pm-tile{width:auto;min-width:0;min-height:52px;font-size:12px}
${e} .pm-content{padding:16px 14px 20px}
${e} :is(.pm-hero,.pm-gear,.vn2-settings-body){grid-template-columns:minmax(0,1fr)}
${e} .pm-hero{grid-template-columns:104px minmax(0,1fr);column-gap:14px}
${e} .pm-portrait{height:168px;padding-bottom:18px}${e} .pm-portrait canvas{max-width:96px;max-height:144px}${e} .pm-portrait:before{width:104px;height:28px;margin-right:-52px;bottom:6px}
${e} .pm-hero h3{font-size:24px}
${e} .pm-content[data-page=status] .pm-portrait{height:196px;padding-bottom:22px}${e} .pm-content[data-page=status] .pm-portrait canvas{max-width:96px;max-height:144px}${e} .pm-content[data-page=status] .pm-portrait:before{width:130px;height:34px;margin-right:-65px;bottom:8px}
${e} .pm-stat{gap:6px;padding:8px}${e} .pm-stat b{font-size:20px}
${e} :is(.pm-party-row,.pm-facts){column-gap:10px}${e} .pm-party-row{grid-template-columns:minmax(0,1fr)}
${e} .pm-page-title{max-width:none}
${e} .pm-doll{max-width:420px;width:100%;margin:0 auto;height:340px}${e} .pm-slot{width:96px}${e} .pm-doll-hero canvas{height:144px}
${e} .pm-footer{padding-top:10px}${e} .pm-footer p{min-width:0;font-size:12px}${e} .pm-footer button.pm-primary{flex:none;white-space:nowrap;font-size:17px;padding:8px 18px}
`;function ge(e){const{page:o,well:d,deep:x,tab:v,edge:c,glow:h,ink:p,soft:a,line:g,border:t,dark:l,cover:Q,coverDeep:O,coverInk:L,accent:r,accentDeep:y,onAccent:q,gold:Y,goldHi:be,up:_,track:N,hp:he,hpLow:je}=e,{shadow:B,tint:I,goldTint:fe,backdrop:V,grainHi:Z}=D(e),ve=te(e),G=ie(e),W=X=>de(X,e),ye=(X,$e)=>ue(X,e,$e);return`
.rpg-pause-menu,:root[data-theme=dark] .rpg-pause-menu{--pm-bg:${o};--pm-fg:${p};--pm-muted:${a};--pm-control:${d};--pm-border:${t};--pm-strong:${r};--pm-on-strong:${q};--pm-focus:${r};--pm-line:${g};--paper-focus:${r};color:${p}}
.preview-overlay-panel.rpg-pause-panel,#local-menu.rpg-pause-menu{${ve}padding:0;overflow:hidden}
.preview-overlay-panel.rpg-pause-panel{container:pm-journal / inline-size}
.rpg-pause-panel>.rpg-pause-menu,#local-menu.rpg-pause-menu[open]{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:"title nav close" "book book book" "where foot foot";column-gap:14px;padding:16px 20px 14px}
#local-menu::backdrop{background:${V}99;backdrop-filter:blur(6px)}
.rpg-pause-menu .pm-header,.rpg-pause-menu .pm-body,#local-menu .pm-header,#local-menu .pm-body{display:contents}
.rpg-pause-menu small{color:${a}}
.rpg-pause-menu .pm-header>div:first-child{grid-area:title;align-self:end;padding:0 4px 10px}
.rpg-pause-menu .pm-header small{display:block;font-size:12px;letter-spacing:3px;color:${Y}}
.rpg-pause-menu .pm-header h2{font-size:28px;line-height:1.2;color:${o};text-shadow:0 2px 0 ${l}}
${W(".rpg-pause-menu button")}
${ye(".rpg-pause-menu .pm-close",o)}
.rpg-pause-menu .pm-close{grid-area:close;align-self:center;margin-bottom:8px;--paper-focus:${Y}}
.rpg-pause-menu .pm-nav{grid-area:nav;display:flex;flex-direction:row;align-items:flex-end;justify-content:flex-end;gap:6px;min-width:0;padding:0 2px 8px;border:0;overflow:visible;--paper-focus:${Y}}
.rpg-pause-menu .pm-nav:after,.rpg-pause-menu .pm-nav-label,.rpg-pause-menu .pm-nav button:is(.pm-tile,[aria-current],[aria-pressed]):before{display:none}
.rpg-pause-menu .pm-tiles{display:flex;align-items:flex-end;gap:6px}
.rpg-pause-menu .pm-nav button{width:auto;min-height:44px;padding:6px 12px;border-color:${l};font-size:15px;white-space:nowrap}
.rpg-pause-menu .pm-nav button:is([aria-current=page],[aria-pressed=true]){border-color:${o};box-shadow:0 0 0 2px ${l},inset 0 -3px 0 ${y}}
.rpg-pause-menu .pm-nav button.pm-tile{flex-direction:column;justify-content:center;gap:2px;width:76px;min-height:62px;padding:6px 4px 7px;border:2px solid ${l};border-radius:12px;background:${K},${v};color:${p};font-size:13px;line-height:1.2;box-shadow:inset 0 -3px 0 ${c}}
.rpg-pause-menu .pm-nav button.pm-tile:hover{background:${K},${h};color:${p};transform:translateY(-2px)}
.rpg-pause-menu .pm-nav button.pm-tile[aria-current=page]{background:${r};color:${q};border-color:${o};box-shadow:0 0 0 2px ${l},inset 0 -3px 0 ${y};transform:translateY(-3px)}
.rpg-pause-menu .pm-nav button.pm-tile:active{background:${x};color:${p};transform:translateY(1px)}
.rpg-pause-menu .pm-tile-icon{display:grid;place-items:center;width:24px;height:24px}.rpg-pause-menu .pm-tile-icon:before{display:none}
.rpg-pause-menu .pm-nav button.pm-tile svg{display:block;width:20px;height:20px;color:inherit}
.rpg-pause-menu .pm-content{grid-area:book;position:relative;min-height:0;overflow:auto;padding:24px 30px 30px;border:2px solid ${l};border-radius:12px;background:${G},${o};color:${p};box-shadow:inset 0 0 0 1px ${Z},inset 0 0 44px ${fe}59,0 3px 0 ${x},0 5px 0 ${c},0 7px 0 ${l};scrollbar-gutter:stable both-edges;scrollbar-width:thin;scrollbar-color:${c} transparent;overscroll-behavior:contain}
.rpg-pause-menu .pm-content h3{color:${p}}.rpg-pause-menu .pm-location{color:${a}}
.rpg-pause-menu .pm-page-title{display:flex;align-items:center;gap:12px;margin:0 0 16px;font-size:26px;color:${p}}
.rpg-pause-menu .pm-page-title:after{content:'';flex:1;height:2px;background:repeating-linear-gradient(90deg,${g} 0 6px,transparent 6px 10px)}
.rpg-pause-menu .pm-section-title{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;margin:22px 0 10px;font-size:20px;color:${p}}
.rpg-pause-menu .pm-section-title:before{content:'';flex:none;width:9px;height:9px;background:${r};transform:rotate(45deg)}
.rpg-pause-menu .pm-section-title small{font-size:12px;letter-spacing:0;color:${a}}
.rpg-pause-menu .pm-hero,#local-menu .pm-hero{grid-template-columns:150px minmax(0,1fr);gap:0 22px;align-items:center;padding:0;border:0;border-radius:0;background:none;color:${p};overflow:visible}
.rpg-pause-menu .pm-portrait,#local-menu .pm-portrait{height:236px;place-items:end center;padding-bottom:28px;border-radius:0;background:none;color:${p};overflow:visible}
.rpg-pause-menu .pm-portrait:before{display:block;content:'';position:absolute;inset:auto 50% 12px auto;width:150px;height:38px;margin-right:-75px;border:2px dashed ${g};border-radius:50%;background:${x};box-shadow:inset 0 0 0 5px ${d};opacity:1}
.rpg-pause-menu .pm-portrait:after{display:none}
.rpg-pause-menu .pm-portrait canvas,#local-menu .pm-portrait canvas{max-width:128px;max-height:192px;filter:drop-shadow(0 4px 0 ${t}40)}
.rpg-pause-menu .pm-portrait>svg{color:${a}}
.rpg-pause-menu .pm-hero-card small{color:${a}}
.rpg-pause-menu .pm-hero h3{margin:4px 0 14px;font-size:32px;color:${p}}
.rpg-pause-menu .pm-health-label{color:${a}}.rpg-pause-menu .pm-health-label strong{color:${p}}
.rpg-pause-menu .pm-health,:root[data-theme=dark] .rpg-pause-menu .pm-health{height:16px;padding:2px;border:2px solid ${l};border-radius:8px;background:${N};color:${o}}
.rpg-pause-menu .pm-health>i,:root[data-theme=dark] .rpg-pause-menu .pm-health>i{background:linear-gradient(180deg,#b4e690,${he});color:${l};border-radius:5px;box-shadow:none}
.rpg-pause-menu .pm-health-note,.rpg-pause-menu .pm-facts dt{color:${a}}
.rpg-pause-menu .pm-level{color:${a}}.rpg-pause-menu .pm-level b{color:${p}}
.rpg-pause-menu .pm-exp,:root[data-theme=dark] .rpg-pause-menu .pm-exp{height:12px;padding:2px;border:2px solid ${l};border-radius:8px;background:${N}}
.rpg-pause-menu .pm-exp>i{border-radius:4px;background:linear-gradient(180deg,#cfe6ff,#5b8fd6)}
.rpg-pause-menu .pm-stat-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.rpg-pause-menu .pm-stat-row-compact{margin-top:16px}
.rpg-pause-menu .pm-stat{display:flex;align-items:center;gap:10px;min-width:0;padding:9px 11px;border:2px solid ${t};border-radius:10px;background:${d};color:${p};box-shadow:0 2px 0 ${c};transition:border-color .2s}
.rpg-pause-menu .pm-stat>svg{flex:none;width:18px;height:18px;color:${r}}.rpg-pause-menu .pm-stat>span{display:grid;gap:3px;min-width:0}
.rpg-pause-menu .pm-stat small{font-size:12px;color:${a}}.rpg-pause-menu .pm-stat b{font-size:24px;line-height:1;color:${p}}.rpg-pause-menu .pm-stat em{font-style:normal;font-size:12px;white-space:nowrap}
.rpg-pause-menu .pm-stat[data-delta=up]{border-color:${_}}.rpg-pause-menu .pm-stat[data-delta=up] em{color:${_}}.rpg-pause-menu .pm-stat[data-delta=down]{border-color:${r}}.rpg-pause-menu .pm-stat[data-delta=down] em{color:${r}}
.rpg-pause-menu .pm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.rpg-pause-menu .pm-party-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.rpg-pause-menu .pm-party-member{display:flex;align-items:center;gap:12px;padding:4px 14px 4px 8px;border:2px dashed ${g};border-radius:12px;background:none;color:${p}}
.rpg-pause-menu .pm-party-member[data-joined]{border:2px solid ${t};background:${d};box-shadow:0 2px 0 ${c}}
.rpg-pause-menu .pm-party-face{display:grid;place-items:end center;flex:none;width:64px;height:96px}.rpg-pause-menu .pm-party-face canvas{max-width:64px;max-height:96px;image-rendering:pixelated}.rpg-pause-menu .pm-party-face>svg{width:28px;height:28px;color:${a}}
.rpg-pause-menu .pm-party-member:not([data-joined]) .pm-party-face canvas{filter:brightness(0) opacity(.3)}
.rpg-pause-menu .pm-party-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
${W(".rpg-pause-menu .pm-party-lead")}
.rpg-pause-menu .pm-party-lead{flex:none;min-height:36px;padding:4px 12px;font-size:14px}.rpg-pause-menu .pm-party-member .pm-party-lead{margin-left:auto}
.rpg-pause-menu .pm-party-member[data-leading]{border-color:${r}}
.rpg-pause-menu .pm-party-member span{display:grid;gap:3px;min-width:0}.rpg-pause-menu .pm-party-member b{font-size:18px;color:${p}}.rpg-pause-menu .pm-party-member small{color:${a}} .rpg-pause-menu button.pm-party-member{display:flex;justify-content:flex-start;width:100%;min-height:0;font-family:inherit;font-weight:inherit;text-align:left;text-shadow:none;cursor:pointer;transform:none;box-shadow:none} .rpg-pause-menu button.pm-party-member[data-joined]{box-shadow:0 2px 0 ${c}} .rpg-pause-menu button.pm-party-member:hover:not(:disabled){border-color:${r};color:${p};transform:translateY(-1px)} .rpg-pause-menu button.pm-party-member[aria-current=true]{border-color:${r};color:${p};box-shadow:0 0 0 3px ${r},0 2px 0 ${c}} .rpg-pause-menu button.pm-party-member:disabled{background:none;border:2px dashed ${a};color:${p};cursor:default;opacity:1;transform:none} .rpg-pause-menu button.pm-party-member:disabled :is(b,small){color:${p}} .rpg-pause-menu button.pm-party-member :is(b){color:${p}} .rpg-pause-menu button.pm-party-member :is(small){color:${a}} .rpg-pause-menu .pm-party-hint{font-size:13px;color:${a}} .rpg-pause-menu .pm-hero-card .pm-hero-lead{justify-self:start;margin-top:12px}
.rpg-pause-menu .pm-facts{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 22px}
.rpg-pause-menu .pm-facts>div{padding:10px 4px 8px;border:0;border-bottom:2px dashed ${g};border-radius:0;background:none;color:${p}}
.rpg-pause-menu .pm-facts dd{color:${p}}.rpg-pause-menu .pm-facts dd small{color:${a}}
.rpg-pause-menu .pm-gear{display:grid;grid-template-columns:minmax(0,1fr);gap:22px;align-items:start}
.rpg-pause-menu .pm-doll{position:relative;width:100%;max-width:440px;height:370px;margin:0 auto;border:0;border-radius:0;background:none;overflow:visible}
.rpg-pause-menu .pm-doll-stage{position:absolute;left:50%;top:48%;width:160px;height:230px;transform:translate(-50%,-50%);pointer-events:none}
.rpg-pause-menu .pm-doll-hero{position:absolute;inset:0 0 22px;display:grid;place-items:end center}.rpg-pause-menu .pm-doll-hero canvas{display:block;height:192px;width:auto;image-rendering:pixelated;filter:drop-shadow(0 4px 0 ${t}40)}.rpg-pause-menu .pm-doll-hero>svg{width:80px;height:80px;color:${a}}
.rpg-pause-menu .pm-rune{position:absolute;left:50%;bottom:4px;width:170px;height:44px;margin-left:-85px;border:2px dashed ${g};border-radius:50%;background:${x};box-shadow:inset 0 0 0 5px ${d};animation:none}.rpg-pause-menu .pm-rune:before{display:none}
.rpg-pause-menu .pm-slot{position:absolute;z-index:1;display:grid;justify-items:center;gap:6px;width:112px}
.rpg-pause-menu .pm-slot-weapon{left:0;top:126px}.rpg-pause-menu .pm-slot-accessory{right:0;top:30px}.rpg-pause-menu .pm-slot-armor{right:0;top:206px}
.rpg-pause-menu button.pm-slot-frame,.rpg-pause-menu button.pm-slot-frame:is(:hover,:active,:disabled,:focus-visible){position:relative;display:grid;place-items:center;width:76px;height:76px;min-height:0;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;transform:none;cursor:grab;touch-action:none}
.rpg-pause-menu button.pm-slot-frame:disabled{cursor:default}
.rpg-pause-menu .pm-diamond{position:absolute;inset:11px;border:2px solid ${t};border-radius:6px;background:${d};transform:rotate(45deg);box-shadow:inset 0 0 0 3px ${o},0 3px 0 ${c};transition:transform .3s cubic-bezier(.2,1.4,.4,1),border-color .2s,box-shadow .2s}
.rpg-pause-menu button.pm-slot-frame:is(:hover,:focus-visible):not(:disabled) .pm-diamond{border-color:${r};transform:rotate(45deg) scale(1.08)}
.rpg-pause-menu button.pm-slot-frame:disabled .pm-diamond{border-style:dashed;border-color:${g};background:${o};box-shadow:none}
.rpg-pause-menu .pm-slot-frame img{position:relative;width:46px;height:46px;object-fit:contain;image-rendering:pixelated;pointer-events:none}.rpg-pause-menu .pm-slot-frame .pm-slot-empty{position:relative;width:22px;height:22px;color:${a}}
.rpg-pause-menu .pm-slot-label{display:grid;justify-items:center;gap:1px;max-width:112px;text-align:center}.rpg-pause-menu .pm-slot-label small{font-size:12px;letter-spacing:1px;color:${a}}.rpg-pause-menu .pm-slot-label b{font-size:12px;line-height:1.35;color:${p};overflow-wrap:anywhere}
.rpg-pause-menu .pm-slot[data-state=match] .pm-diamond{border-color:${r};animation:pm-beckon 1s ease-in-out infinite}
.rpg-pause-menu .pm-slot[data-state=target] .pm-diamond{border-color:${r};background:${h};transform:rotate(45deg) scale(1.16);box-shadow:inset 0 0 0 3px ${o},0 0 0 4px ${r}66}
.rpg-pause-menu .pm-slot[data-state=mismatch] .pm-slot-frame{opacity:.38}
.rpg-pause-menu .pm-slot[data-flash] .pm-diamond{animation:pm-equip .65s ease-out}
@keyframes pm-beckon{50%{box-shadow:inset 0 0 0 3px ${o},0 0 0 5px ${r}55}}@keyframes pm-equip{from{box-shadow:inset 0 0 0 3px ${o},0 0 0 0 ${r}}to{box-shadow:inset 0 0 0 3px ${o},0 0 0 22px ${r}00}}
.rpg-pause-menu .pm-gear-side{min-width:0}.rpg-pause-menu .pm-gear-side .pm-section-title{margin-top:18px}
/* Who is being dressed: a row of paper name tabs above the doll, and the attack their weapon gives them. */
.rpg-pause-menu .pm-gear-members{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 4px}
${W(".rpg-pause-menu .pm-gear-member")}
.rpg-pause-menu .pm-gear-member{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:3px 14px 3px 6px;border-radius:999px;font-size:15px}
.rpg-pause-menu .pm-gear-face{display:grid;place-items:end center;width:30px;height:34px;overflow:hidden}.rpg-pause-menu .pm-gear-face canvas{display:block;height:34px;width:auto;image-rendering:pixelated}.rpg-pause-menu .pm-gear-face svg{width:22px;height:22px}
.rpg-pause-menu .pm-gear-skill{display:flex;align-items:center;gap:10px;margin:0 0 12px;padding:8px 12px;border:2px solid ${t};border-radius:12px;background:${d};color:${p}}
.rpg-pause-menu .pm-gear-skill>svg{flex:none;width:18px;height:18px;color:${r}}
.rpg-pause-menu .pm-gear-skill span{display:grid;gap:1px}.rpg-pause-menu .pm-gear-skill small{font-size:11px;color:${a}}.rpg-pause-menu .pm-gear-skill b{font-size:15px;font-weight:400;color:${p}}.rpg-pause-menu .pm-gear-skill em{font-style:normal;font-size:11px;color:${a}}
.rpg-pause-menu .pm-bearer{position:absolute;left:4px;right:4px;bottom:3px;padding:1px 4px;border-radius:6px;background:${p};color:${o};font-size:10px;line-height:1.3;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rpg-pause-menu .pm-bag-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:10px}.rpg-pause-menu .pm-bag-cell{display:grid}
.rpg-pause-menu button.pm-bag-item{position:relative;display:grid;grid-template:100%/100%;place-items:center;aspect-ratio:1;min-height:0;padding:0;border:2px solid ${t};border-radius:10px;background:${d};color:${p};box-shadow:inset 0 0 0 2px ${o},0 2px 0 ${c};cursor:grab;touch-action:none}
.rpg-pause-menu button.pm-bag-item[aria-pressed=true]{border-color:${r};background:${o};color:${r};cursor:pointer;box-shadow:inset 0 0 0 2px ${o},0 2px 0 ${r}}
.rpg-pause-menu button.pm-bag-item:is(:hover,:focus-visible):not(:disabled){border-color:${r};background:${h};transform:translateY(-2px)}
.rpg-pause-menu button.pm-bag-item:disabled{border:2px dashed ${g};background:transparent;box-shadow:none;cursor:not-allowed}
.rpg-pause-menu .pm-bag-item img{width:72%;height:72%;object-fit:contain;image-rendering:pixelated;pointer-events:none}.rpg-pause-menu .pm-locked{width:18px;height:18px;color:${a}}
.rpg-pause-menu .pm-worn-mark{display:grid;justify-items:center;gap:4px;color:${r}}.rpg-pause-menu .pm-worn-mark svg{width:20px;height:20px}.rpg-pause-menu .pm-worn-mark small{font-size:12px;letter-spacing:0;color:${r}}
.rpg-pause-menu .pm-gear-note{display:grid;gap:4px;min-height:60px;margin-top:12px;padding:10px 12px;border-left:3px solid ${r};border-radius:0 10px 10px 0;background:${d};font-size:12px;color:${a}}.rpg-pause-menu .pm-gear-note b{font-size:18px;color:${p}}
/* The bag page: the items in the gear bag's slots (roomier, with the name under the picture), and the chosen one described beside them. */
.rpg-pause-menu .pm-item-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px}.rpg-pause-menu button.pm-bag-item.pm-item{cursor:pointer;touch-action:manipulation}
.rpg-pause-menu .pm-item img{width:56%;height:56%;margin-bottom:14px}.rpg-pause-menu .pm-item .pm-item-glyph{width:26px;height:26px;margin-bottom:14px;color:inherit;opacity:.75}
.rpg-pause-menu .pm-item-name{position:absolute;left:5px;right:5px;bottom:6px;font-size:12px;line-height:1.3;text-align:center;color:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@container pm-journal (max-width:560px){.rpg-pause-menu .pm-item-grid{grid-template-columns:repeat(auto-fill,minmax(80px,1fr))}}
.rpg-pause-menu .pm-items-detail>.pm-facts{margin-bottom:14px}
.rpg-pause-menu .pm-item-note{grid-template-columns:52px minmax(0,1fr);column-gap:12px;align-items:center;margin-top:0}.rpg-pause-menu .pm-item-note.is-empty{grid-template-columns:minmax(0,1fr)}
.rpg-pause-menu .pm-item-art{grid-row:span 2;display:grid;place-items:center;width:52px;height:52px;border:2px solid ${t};border-radius:10px;background:${o};color:${a}}.rpg-pause-menu .pm-item-art img{width:40px;height:40px;object-fit:contain;image-rendering:pixelated}.rpg-pause-menu .pm-item-art svg{width:24px;height:24px}
.rpg-pause-menu .pm-item-note .pm-item-desc{grid-column:1 / -1;margin-top:6px;font-size:14px;line-height:1.55;color:${p};white-space:pre-line;overflow-wrap:anywhere}
.rpg-pause-menu .pm-item-hints{display:grid;gap:6px;margin:12px 0 0;padding:0;list-style:none;font-size:12px;color:${a}}.rpg-pause-menu .pm-item-hints li{display:flex;align-items:center;gap:8px}.rpg-pause-menu .pm-item-hints svg{flex:none;width:16px;height:16px;color:${r}}
.rpg-pause-menu .pm-content .pm-item-problem{margin-top:12px;padding:8px 12px;border-left:3px solid var(--pm-strong,${r});border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--pm-strong,${r}) 14%,var(--pm-control,${h}));font-size:13px;color:var(--pm-fg,${p})}
.rpg-pause-menu button.pm-primary.pm-item-use{display:flex;align-items:center;justify-content:center;width:100%;margin-top:16px}
.pm-drag-ghost{position:fixed;z-index:2000;display:grid;place-items:center;width:64px;height:64px;margin:-32px 0 0 -32px;border:2px solid ${t};border-radius:12px;background:${o};color:${p};box-shadow:0 12px 30px ${B}5c;transform:rotate(-6deg) scale(1.05);pointer-events:none}.pm-drag-ghost img{width:46px;height:46px;object-fit:contain;image-rendering:pixelated}
.rpg-pause-menu .pm-settings-title{margin-bottom:18px}
.rpg-pause-menu .vn2-settings-body{display:grid;grid-template-columns:minmax(0,1fr);gap:18px 22px;align-items:start}
.rpg-pause-menu .vn2-settings-body section{padding:0;border:0;border-radius:0;background:none;color:${p}}
.rpg-pause-menu .vn2-settings-body h4{display:flex;align-items:center;gap:9px;font-size:18px;color:${p}}.rpg-pause-menu .vn2-settings-body h4:before{content:'';flex:none;width:8px;height:8px;background:${r};transform:rotate(45deg)}
.rpg-pause-menu .vn2-menu-row{border:2px solid ${t};border-radius:12px;background:${d};color:${p}}
.rpg-pause-menu .vn2-menu-row>span{color:${a}}.rpg-pause-menu .vn2-menu-row b{color:${p}}.rpg-pause-menu .vn2-reading-note{color:${a}}
.rpg-pause-menu .vn2-menu-row input[type=range]{appearance:none;height:10px;border:2px solid ${t};border-radius:6px;background:${x};color:${p};accent-color:${r}}
.rpg-pause-menu input[type=range]::-webkit-slider-thumb{appearance:none;width:18px;height:18px;border-radius:50%;background:${r};color:${q};border:2px solid ${o};box-shadow:0 0 0 2px ${t}}
.rpg-pause-menu input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:${r};color:${q};border:2px solid ${o};box-shadow:0 0 0 2px ${t}}
.rpg-pause-menu .vn2-menu-toggle input{accent-color:${r}}
.rpg-pause-menu .vn2-menu-row>.studio-select{flex:0 1 180px;width:auto;min-width:140px}
.rpg-pause-menu .vn2-menu-actions{display:flex;flex-wrap:wrap}.rpg-pause-menu .vn2-menu-actions>button{flex:1 1 84px;min-width:0}.rpg-pause-menu .vn2-menu-actions>.rpg-desktop-controls{flex-basis:100%}
@container pm-journal (max-width:560px){.rpg-pause-menu .vn2-menu-actions>button{flex-basis:110px}}
/* 系統設定 in the plain journal (no UI Skill on the RPG part; asked for on 2026-10-13: "太亂了"): every group is one card,
   a setting per row with its name on the left and its control on the right and a dashed rule between rows; the quick
   actions are small icon chips, on/off is a switch, the keys are keycaps. */
.rpg-pause-menu.pm-plain .pm-settings-title{margin-bottom:14px}
.rpg-pause-menu.pm-plain .vn2-settings-body{gap:14px}
.rpg-pause-menu.pm-plain .vn2-settings-body>section{grid-template-columns:minmax(0,1fr);gap:0;padding:2px 16px 8px;border:2px solid ${t};border-radius:16px;background:${o};color:${p};box-shadow:inset 0 0 0 2px ${h},0 2px 0 ${c}}
.rpg-pause-menu.pm-plain .vn2-settings-body h4{margin:0;padding:12px 0 8px;font-size:15px;letter-spacing:1px;color:${y}}
.rpg-pause-menu.pm-plain .vn2-settings-body h4:before{width:7px;height:7px}
.rpg-pause-menu.pm-plain .vn2-menu-row{display:flex;align-items:center;flex-wrap:nowrap;gap:12px;min-height:50px;margin:0;padding:8px 0;border:0;border-top:2px dashed color-mix(in srgb,${g} 38%,transparent);border-radius:0;background:none;color:${p};box-shadow:none}
.rpg-pause-menu.pm-plain .vn2-settings-body h4+.vn2-menu-row{border-top:0}
.rpg-pause-menu.pm-plain .vn2-menu-row>span{flex:1;min-width:0;display:flex;align-items:center;gap:10px;font-size:15px;line-height:1.35;white-space:normal;color:${p}}
.rpg-pause-menu.pm-plain .vn2-menu-row>span>svg{display:block;flex:none;width:18px;height:18px;color:${r}}
.rpg-pause-menu.pm-plain .vn2-menu-row input[type=range]{flex:0 1 150px;width:150px;min-width:80px;height:8px;margin:0;border-width:2px;cursor:pointer}
.rpg-pause-menu.pm-plain .vn2-menu-row>b{flex:none;min-width:48px;font-size:13px;color:${a};text-align:right;font-variant-numeric:tabular-nums}
.rpg-pause-menu.pm-plain .vn2-menu-row>.studio-select{flex:0 1 170px;min-width:130px}
/* On/off: a switch whose knob springs across. */
.rpg-pause-menu.pm-plain .vn2-menu-toggle{cursor:pointer}
.rpg-pause-menu.pm-plain .vn2-menu-toggle>i{display:none}
.rpg-pause-menu.pm-plain .vn2-menu-toggle input[type=checkbox]{-webkit-appearance:none;appearance:none;flex:none;position:static;width:48px;height:28px;margin:0;padding:0;border:2px solid ${t};border-radius:999px;background:radial-gradient(circle,${o} 0 8px,${t} 8.5px 10px,transparent 10.5px) no-repeat 1px 50%/24px 24px,${x};color:${p};opacity:1;pointer-events:auto;cursor:pointer;transition:background-position .38s cubic-bezier(.34,1.56,.64,1),background-color .2s ease,border-color .2s ease}
.rpg-pause-menu.pm-plain .vn2-menu-toggle input[type=checkbox]:checked{background:radial-gradient(circle,${q} 0 8px,${y} 8.5px 10px,transparent 10.5px) no-repeat calc(100% - 1px) 50%/24px 24px,${r};border-color:${y};color:${q}}
.rpg-pause-menu.pm-plain .vn2-menu-toggle input[type=checkbox]:focus-visible{outline:3px solid ${r};outline-offset:3px}
/* The quick actions: icon chips four to a row, the last one stretching over a short row so nothing stands alone. */
.rpg-pause-menu.pm-plain .vn2-menu-actions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:2px 0 14px}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button{position:relative;display:grid;justify-items:center;align-content:center;gap:5px;min-width:0;min-height:64px;padding:8px 6px;border-radius:14px;font-size:13px;line-height:1.25;white-space:normal;text-align:center}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button svg{display:block;width:20px;height:20px}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button:last-child:nth-child(4n+1 of button:not(.rpg-desktop-controls)){grid-column:span 4}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button:last-child:nth-child(4n+2 of button:not(.rpg-desktop-controls)){grid-column:span 3}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button:last-child:nth-child(4n+3 of button:not(.rpg-desktop-controls)){grid-column:span 2}
/* 顯示移動與互動按鈕 is an on/off setting like the ones below: a row with a switch, above the chips. */
.rpg-pause-menu.pm-plain .vn2-menu-actions>.rpg-desktop-controls{grid-column:1/-1;display:flex;justify-content:flex-start;gap:10px;min-height:50px;margin:0 0 4px;padding:8px 0;border:0;border-bottom:2px dashed color-mix(in srgb,${g} 38%,transparent);border-radius:0;background:none;color:${p};box-shadow:none;font-size:15px;text-align:left;transform:none}
.rpg-pause-menu.pm-plain .vn2-menu-actions>.rpg-desktop-controls>svg{color:${r}}
.rpg-pause-menu.pm-plain .vn2-menu-actions>.rpg-desktop-controls:after{content:'';flex:none;width:48px;height:28px;margin-left:auto;box-sizing:border-box;border:2px solid ${t};border-radius:999px;background:radial-gradient(circle,${o} 0 8px,${t} 8.5px 10px,transparent 10.5px) no-repeat 1px 50%/24px 24px,${x};transition:background-position .38s cubic-bezier(.34,1.56,.64,1),background-color .2s ease}
.rpg-pause-menu.pm-plain .vn2-menu-actions>.rpg-desktop-controls[aria-pressed=true]:after{background:radial-gradient(circle,${q} 0 8px,${y} 8.5px 10px,transparent 10.5px) no-repeat calc(100% - 1px) 50%/24px 24px,${r};border-color:${y}}
.rpg-pause-menu.pm-plain .vn2-menu-actions>.rpg-desktop-controls:is(:hover,:active,[aria-pressed=true]){background:none;color:${p};border-color:color-mix(in srgb,${g} 38%,transparent);box-shadow:none;transform:none}
.rpg-pause-menu.pm-plain .vn2-menu-actions .vn2-skip-rate{position:absolute;top:5px;right:7px;font-size:11px;color:inherit}
/* Keys: the skill keys sit beside their name; the action keys are a grid of keycaps under it. */
.rpg-pause-menu.pm-plain .vn2-skill-keys{flex-wrap:wrap;row-gap:8px}
.rpg-pause-menu.pm-plain .vn2-skill-keys>div{display:flex;flex-wrap:wrap;gap:6px;margin-left:auto}
.rpg-pause-menu.pm-plain .vn2-skill-keys>div button{min-width:40px;height:40px;min-height:40px;padding:0 8px;border-radius:10px;font:16px/1 RpgPixel,monospace}
.rpg-pause-menu.pm-plain .vn2-action-keys>div{display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:6px;width:100%;margin:0}
.rpg-pause-menu.pm-plain .vn2-action-keys>div button{display:grid;justify-items:center;align-content:center;gap:3px;width:auto;height:auto;min-height:54px;padding:6px 4px}
.rpg-pause-menu.pm-plain .vn2-action-keys button small{font-size:11px;line-height:1.2;letter-spacing:0;color:inherit}
.rpg-pause-menu.pm-plain .vn2-action-keys button b{font-size:16px;line-height:1;color:inherit}
.rpg-pause-menu.pm-plain .vn2-reading-note{margin:2px 0 10px;font-size:12px;line-height:1.65;color:${a}}
.rpg-pause-menu.pm-plain .vn2-action-keys .vn2-reading-note{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;width:100%;margin:0}
.rpg-pause-menu.pm-plain .vn2-keys-reset{min-height:34px;padding:4px 12px;font-size:13px}
/* 還原／重置: a small pill under the note, not another full-width framed bar. */
.rpg-pause-menu.pm-plain button.vn2-reading-reset{justify-self:start;justify-content:center;gap:7px;width:auto;min-height:38px;margin:4px 0 10px;padding:6px 14px;border:2px solid ${t};border-radius:999px;background:${v};color:${p};box-shadow:0 2px 0 ${t};font-size:13px}
.rpg-pause-menu.pm-plain button.vn2-reading-reset>span{flex:none;gap:7px;font-size:13px;color:inherit}
.rpg-pause-menu.pm-plain button.vn2-reading-reset>span>svg{width:15px;height:15px;color:inherit}
.rpg-pause-menu.pm-plain button.vn2-reading-reset:hover{background:${h};color:${p};border-color:${t}}
.rpg-pause-menu.pm-plain button.vn2-reading-reset:disabled{background:${d};color:${a};border:2px dashed ${g};box-shadow:none;transform:none;cursor:not-allowed}
.rpg-pause-menu.pm-plain button.vn2-reading-reset.is-confirming{background:${r};color:${q};border-color:${y};box-shadow:0 2px 0 ${y}}
/* A narrow page: a slider goes under its name and number, and the skill keys under theirs, at full width. */
@container pm-journal (max-width:560px){
.rpg-pause-menu.pm-plain .pm-settings-title{font-size:20px;margin-bottom:10px}
.rpg-pause-menu.pm-plain .vn2-settings-body>section{padding:2px 12px 6px}
.rpg-pause-menu.pm-plain .vn2-menu-actions>button{min-height:58px;font-size:12px}
.rpg-pause-menu.pm-plain .vn2-menu-row>span{font-size:14px}
.rpg-pause-menu.pm-plain .vn2-menu-row:has(>input[type=range]){flex-wrap:wrap;row-gap:10px;padding-bottom:12px}
.rpg-pause-menu.pm-plain .vn2-menu-row>input[type=range]{order:3;flex:1 0 100%;width:100%;min-width:0}
.rpg-pause-menu.pm-plain .vn2-skill-keys:not(.vn2-action-keys)>span{flex:1 0 100%}
.rpg-pause-menu.pm-plain .vn2-skill-keys:not(.vn2-action-keys)>div{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;margin:0}
}
/* A page opens with a small spring, its cards one after another. */
@keyframes pm-page-in{from{opacity:0;translate:0 10px}}
.rpg-pause-menu.pm-plain .pm-content>:not(.vn2-settings-body),.rpg-pause-menu.pm-plain .vn2-settings-body>section{animation:pm-page-in .45s cubic-bezier(.34,1.56,.64,1) backwards}
.rpg-pause-menu.pm-plain .vn2-settings-body>section:nth-child(2){animation-delay:.04s}
.rpg-pause-menu.pm-plain .vn2-settings-body>section:nth-child(3){animation-delay:.08s}
.rpg-pause-menu.pm-plain .vn2-settings-body>section:nth-child(n+4){animation-delay:.12s}
@media(prefers-reduced-motion:reduce){.rpg-pause-menu.pm-plain :is(.vn2-menu-toggle input[type=checkbox],.rpg-desktop-controls:after){transition:none}.rpg-pause-menu.pm-plain :is(.pm-content>*,.vn2-settings-body>section){animation:none}}
.rpg-pause-menu .studio-select .select-menu-trigger,.rpg-pause-menu .studio-select .select-menu-trigger:is(:hover,[aria-expanded=true]){background:${v};color:${p};border:2px solid ${t};border-radius:10px;font:18px RpgPixel,monospace}
.rpg-pause-menu .studio-select .select-menu-trigger:is(:hover,[aria-expanded=true]){background:${h}}
.select-menu-popup.rpg-pause-select{background:${o};color:${p};border:2px solid ${t};border-radius:14px;box-shadow:0 3px 0 ${c},0 12px 28px ${B}2e;padding:4px;font:18px/1.5 RpgPixel,monospace;font-synthesis:none}
.select-menu-popup.rpg-pause-select .select-menu-option{border-radius:8px;background:${o};color:${p};font:inherit}
.select-menu-popup.rpg-pause-select .select-menu-option:is(:hover,:focus-visible,.selected,[data-active=true]){background:${r};color:${q};outline-color:${p}}
.rpg-pause-menu .pm-where{grid-area:where;align-self:center;justify-self:start;display:flex;align-items:center;gap:6px;max-width:34vw;margin:12px 0 0;padding:5px 12px;border:2px solid ${l};border-radius:999px;background:${v};color:${p};font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rpg-pause-menu .pm-where svg{display:block;width:14px;height:14px;flex:none;color:${r}}
.rpg-pause-menu .pm-footer{grid-area:foot;position:relative;display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:12px 0 0;border:0;background:none;color:${o}}
.rpg-pause-menu .pm-footer p{font-size:12px;color:${L}}
.rpg-pause-menu .pm-footer:before,.rpg-pause-menu .pm-footer:after{content:'';position:absolute;top:-6px;width:16px;height:44px;clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%);pointer-events:none}
.rpg-pause-menu .pm-footer:before{left:12%;background:linear-gradient(90deg,${y},${r} 50%,${y})}
.rpg-pause-menu .pm-footer:after{left:calc(12% + 22px);height:36px;background:linear-gradient(90deg,#3e6b2e,#5d8f42 50%,#3e6b2e)}
.rpg-pause-menu kbd{margin-right:8px;padding:1px 6px;border:2px solid ${l};border-radius:6px;background:${v};color:${p};font:12px RpgPixel,monospace}
.rpg-pause-menu button.pm-primary{padding:8px 24px;border:2px solid ${l};border-radius:999px;background:${Y};color:${p};font-size:20px;box-shadow:0 3px 0 ${l};--paper-focus:${Y}}
.rpg-pause-menu button.pm-primary:hover{background:${be};color:${p};border-color:${l};box-shadow:0 4px 0 ${l}}
.rpg-pause-menu button.pm-primary:active{background:${Y};color:${p};box-shadow:0 1px 0 ${l};transform:translateY(2px)}
/* The status page is a character sheet: name, the hero on a rug, health, then stats. */
.rpg-pause-menu .pm-content[data-page=status]>.pm-hero{grid-template-columns:minmax(0,1fr)}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero-card{display:contents}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero-card>small{order:-2}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero h3{order:-1;display:flex;align-items:center;gap:12px;margin:2px 0 0}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero h3:after{content:'';flex:1;height:2px;background:repeating-linear-gradient(90deg,${g} 0 6px,transparent 6px 10px)}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait{height:262px;padding-bottom:28px}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait canvas{max-width:160px;max-height:240px}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait:before{width:190px;height:46px;margin-right:-95px;bottom:10px}
.rpg-pause-menu .pm-content[data-page=status] .pm-stat-row-compact{margin-top:12px}
/* The character's painted portrait stands behind them, the pixel figure on the rug in front of it. */
.rpg-pause-menu .pm-figure{position:relative;display:grid;place-items:end center;min-width:0}
.rpg-pause-menu .pm-figure.has-standee{grid-template-columns:minmax(0,1fr) auto;align-items:end;column-gap:0}
.rpg-pause-menu .pm-standee{display:block;width:100%;max-height:300px;object-fit:contain;object-position:bottom center;filter:drop-shadow(0 8px 10px ${B}2e);-webkit-user-drag:none}
.rpg-pause-menu .pm-content[data-page=status] .pm-figure.has-standee .pm-portrait{height:170px;margin-left:-28px;padding-bottom:18px}
.rpg-pause-menu .pm-content[data-page=status] .pm-figure.has-standee .pm-portrait canvas{max-width:96px;max-height:140px}
.rpg-pause-menu .pm-content[data-page=status] .pm-figure.has-standee .pm-portrait:before{width:120px;height:30px;margin-right:-60px;bottom:6px}
.rpg-pause-menu .pm-party-standee{flex:none;width:46px;height:58px;border:2px solid ${t};border-radius:10px;background:${x};object-fit:cover;object-position:top center}
/* The save slots as a page of the journal. */
.rpg-pause-menu .pm-saves-range{display:block;margin:-8px 0 12px;color:${a}}
.rpg-pause-menu .device-save-read-error{margin:0 0 12px;padding:10px 12px;border:2px solid ${r};border-radius:8px;background:${h};color:${p};font-size:13px;line-height:1.6}
.rpg-pause-menu .pm-saves .save-slot-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr));grid-auto-rows:max-content;gap:14px;min-height:0;padding:0 0 8px;overflow:visible}
.rpg-pause-menu .pm-saves article{display:grid;grid-template-columns:96px minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;column-gap:10px;min-width:0;padding:10px;border:2px solid ${t};border-radius:12px;background:${d};color:${p};box-shadow:0 2px 0 ${t}}
.rpg-pause-menu .pm-saves figure{grid-row:1 / span 2;position:relative;display:grid;place-items:center;min-height:88px;margin:0;overflow:hidden;border:2px solid ${g};border-radius:8px;background:${x};color:${p}}
.rpg-pause-menu .pm-saves figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.rpg-pause-menu .pm-saves figure svg{width:22px;height:22px}.rpg-pause-menu .pm-saves figure span{position:absolute;top:4px;right:6px;font-size:12px}
.rpg-pause-menu .pm-saves .save-slot-info{gap:2px;margin:0;padding:0;text-shadow:none}.rpg-pause-menu .pm-saves .save-slot-info b{color:${p};font-size:15px}.rpg-pause-menu .pm-saves .save-slot-info :is(span,small){color:${a};font-size:12px;letter-spacing:0}
.rpg-pause-menu .pm-saves .save-slot-name{width:100%;margin:0;padding:2px 6px;border:2px solid ${t};border-radius:8px;background:${o};color:${p};font:inherit;font-size:15px;text-shadow:none}.rpg-pause-menu .pm-saves .save-slot-name:hover{background:${h};color:${p}}.rpg-pause-menu .pm-saves .save-slot-name:focus-visible{border-color:${t};background:${o};color:${p};outline:3px solid ${r};outline-offset:2px}.rpg-pause-menu .pm-saves .save-slot-name:disabled{background:${d};color:${a};border-style:dashed}
.rpg-pause-menu .pm-saves .save-slot-actions{margin-top:8px;padding:0}.rpg-pause-menu .pm-saves .save-slot-actions button{width:100%;min-height:40px;padding:6px 10px;font-size:15px}
.rpg-pause-menu .pm-saves .save-slot-pagination{margin-top:6px;padding:12px 0 0;border-top:2px dashed ${g}}
.rpg-pause-menu .pm-saves .save-slot-pagination button{width:auto;min-width:36px;height:36px;min-height:36px;padding:0 8px;font-size:16px}
.rpg-pause-menu .pm-saves .save-slot-pagination button:hover:not(:disabled){background:${h};color:${p}}.rpg-pause-menu .pm-saves .save-slot-pagination button:active:not(:disabled){background:${x};color:${p}}.rpg-pause-menu .pm-saves .save-slot-pagination button:focus-visible{outline:3px solid ${r};outline-offset:2px}
/* Asking before leaving for the title: a small sheet of the same paper over the menu. */
.rpg-pause-panel>.rpg-pause-menu{position:relative}
.rpg-pause-menu .pm-ask{position:absolute;inset:0;z-index:5;display:grid;place-items:center;padding:16px;background:${V}99}
.rpg-pause-menu .pm-ask-card{display:grid;gap:10px;width:min(400px,100%);max-height:100%;overflow:auto;padding:20px;border:2px solid ${l};border-radius:12px;background:${G},${o};color:${p};box-shadow:inset 0 0 0 1px ${Z},0 3px 0 ${x},0 5px 0 ${c},0 7px 0 ${l},0 18px 40px ${B}80;--paper-focus:${r}}
.rpg-pause-menu .pm-ask-card:focus{outline:0}
.rpg-pause-menu .pm-ask-card h3{font-size:22px;line-height:1.3;color:${p}}.rpg-pause-menu .pm-ask-card p{font-size:15px;line-height:1.6;color:${a}}
.rpg-pause-menu .pm-ask-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.rpg-pause-menu .pm-ask-actions button,.rpg-pause-menu .pm-ask-actions button.pm-primary{flex:1 1 auto;min-height:44px;padding:8px 12px;border-radius:10px;font-size:16px;white-space:nowrap}
/* A wide panel opens into a two-page spread with the fold down the middle. */
@container pm-journal (min-width:860px){
.rpg-pause-menu .pm-saves .save-slot-grid{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:52px}
.rpg-pause-menu .pm-content{background:linear-gradient(90deg,transparent calc(50% - 26px),${I}12 calc(50% - 14px),${I}3d calc(50% - 3px),${t}59 50%,${I}3d calc(50% + 3px),${I}12 calc(50% + 14px),transparent calc(50% + 26px)),${G},${o}}
.rpg-pause-menu :is(.pm-hero,.pm-party-row,.pm-facts,.pm-gear,.vn2-settings-body){grid-template-columns:repeat(2,minmax(0,1fr));column-gap:52px}
.rpg-pause-menu .pm-page-title{max-width:calc(50% - 26px)}
.rpg-pause-menu .pm-content:is([data-page=status],[data-page=equipment]){display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:52px;align-content:start}
.rpg-pause-menu .pm-content[data-page=status]>*{grid-column:2;min-width:0}
.rpg-pause-menu .pm-content[data-page=status]>.pm-hero{grid-column:1;grid-row:1 / span 6;grid-template-columns:minmax(0,1fr);align-self:start}
.rpg-pause-menu .pm-content[data-page=status] .pm-party{margin-top:0}.rpg-pause-menu .pm-content[data-page=status] .pm-party .pm-section-title{margin-top:0}
.rpg-pause-menu .pm-content[data-page=status] .pm-party-row{grid-template-columns:minmax(0,1fr)}
.rpg-pause-menu .pm-content[data-page=status] .pm-page-title{max-width:none}
.rpg-pause-menu .pm-content[data-page=equipment]>.pm-page-title{grid-column:1;max-width:none}
.rpg-pause-menu .pm-content[data-page=equipment]>.pm-gear{display:contents}
.rpg-pause-menu .pm-content[data-page=equipment] .pm-doll{grid-column:1}
.rpg-pause-menu .pm-content[data-page=equipment] .pm-gear-members{grid-column:1}
.rpg-pause-menu .pm-content[data-page=equipment] .pm-gear-side{grid-column:2;grid-row:1 / span 3}
/* The bag: the items on the left page, the chosen one on the right. */
.rpg-pause-menu .pm-content[data-page=bag]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:auto minmax(0,1fr);column-gap:52px}
.rpg-pause-menu .pm-content[data-page=bag]>.pm-page-title{grid-column:1;max-width:none}
.rpg-pause-menu .pm-content[data-page=bag]>.pm-items{display:contents}
.rpg-pause-menu .pm-content[data-page=bag] .pm-items-list{grid-column:1}.rpg-pause-menu .pm-content[data-page=bag] .pm-items-list .pm-section-title{margin-top:0}
.rpg-pause-menu .pm-content[data-page=bag] .pm-items-detail{grid-column:2;grid-row:1 / span 2}
/* Settings flow down each page on their own: in a grid row a short section beside a tall one left a hole. */
.rpg-pause-menu .pm-content[data-page=settings] .vn2-settings-body{display:block;columns:2;column-gap:52px}
.rpg-pause-menu .pm-content[data-page=settings] .vn2-settings-body>section{break-inside:avoid;margin-bottom:22px}
.rpg-pause-menu.pm-plain .pm-content[data-page=settings] .vn2-settings-body>section{margin-bottom:14px}
}
@container pm-journal (max-width:900px){.rpg-pause-menu .pm-nav button.pm-tile{width:62px;font-size:12px}.rpg-pause-menu .pm-header h2{font-size:22px}}
/* A phone on its side: the character sheet sits side by side, so health and stats show without scrolling. */
@media(max-height:500px) and (min-width:560px){
.rpg-pause-menu .pm-content{padding:12px 18px 14px}
.rpg-pause-menu .pm-content[data-page=status]>.pm-hero{grid-template-columns:92px minmax(0,1fr);column-gap:16px;align-items:center}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(150px,34%);grid-template-areas:"title stats" "name stats" "label stats" "meter stats";column-gap:18px;align-items:center}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero-card>small{grid-area:title}
.rpg-pause-menu .pm-content[data-page=status] .pm-hero h3{grid-area:name;margin:0 0 4px;font-size:20px}
.rpg-pause-menu .pm-content[data-page=status] .pm-health-label{grid-area:label}
.rpg-pause-menu .pm-content[data-page=status] .pm-health{grid-area:meter}
.rpg-pause-menu .pm-content[data-page=status] .pm-health-note{display:none}
.rpg-pause-menu .pm-content[data-page=status] :is(.pm-level,.pm-exp){grid-column:1}
.rpg-pause-menu .pm-content[data-page=status] .pm-stat-row-compact{grid-area:stats;display:grid;grid-template-columns:minmax(0,1fr);gap:4px;margin:0}
.rpg-pause-menu .pm-content[data-page=status] .pm-stat{padding:3px 8px}
.rpg-pause-menu .pm-content[data-page=status] .pm-stat b{font-size:16px}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait{height:104px;padding-bottom:10px}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait canvas{max-width:64px;max-height:92px}
.rpg-pause-menu .pm-content[data-page=status] .pm-portrait:before{width:84px;height:22px;margin-right:-42px;bottom:2px}
}
@container pm-journal (max-width:680px){${re(".rpg-pause-panel")}}
@media(max-width:680px){${re("#local-menu")}.preview-overlay-panel.rpg-pause-panel,#local-menu.rpg-pause-menu{border-radius:18px;outline-offset:-7px}}
@media(prefers-reduced-motion:reduce){.rpg-pause-menu .pm-slot .pm-diamond{animation:none!important}.rpg-pause-menu .pm-diamond{transition:none}}
`}const ze=ge(H),qe=`
.preview-overlay-panel.rpg-pixel-save,.inventory-hud-panel.rpg-pixel-inventory{${ke}padding:18px 20px}
.history-panel.rpg-pixel-history{${A}}
.rpg-pixel-history :is(header,article){background:${w};color:${n};border-color:${T};border-radius:10px}.rpg-pixel-history :is(h2,b){color:${n}}.rpg-pixel-history :is(p,small,span){color:${m}}
${j(".rpg-pixel-history button")}
${M(".rpg-pixel-history>header>button")}
${M(".rpg-pixel-playback .vn2-chrome .vn2-chrome-right button[data-tour=preview-close]","#fffaf0")}
.rpg-pixel-playback .vn2-chrome .vn2-chrome-right button[data-tour=preview-close]{--paper-focus:#fffaf0;filter:drop-shadow(0 1px 1px #2b170fd9) drop-shadow(0 0 5px #2b170f8c)}
.rpg-pixel-playback .vn2-plugin-full>footer{background:${s};color:${n};border-color:${u}}
${j(".rpg-pixel-playback .vn2-plugin-full>footer button")}
.rpg-pixel-save h2,.rpg-pixel-inventory h2{color:${s};text-shadow:0 2px 0 ${f}}
.rpg-pixel-save>header small,.rpg-pixel-inventory>header :is(p,small){color:${R}}
.rpg-pixel-save>header,.rpg-pixel-inventory>header{background:transparent;color:${s};border-bottom:2px dashed #c9975a8c;border-radius:0}
${j(".rpg-pixel-save button")}
${j(".preview-overlay-panel.rpg-pixel-save article button")}
${j(".rpg-pixel-inventory button")}
${M(".rpg-pixel-save>header>button",s)}
${M(".rpg-pixel-inventory>header>button",s)}
.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet{background:${K},${J};color:${n};border:2px solid ${u};border-radius:10px;box-shadow:0 2px 0 ${u};min-height:44px;padding:4px 14px 4px 6px}
.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet>span{background:${w};color:${n};border-radius:6px}
.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet b{color:${n}}.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet small{color:${m}}
.rpg-pixel-save,.rpg-pixel-inventory{--paper-focus:${R}}
.rpg-pixel-save .save-slot-grid{--paper-focus:${i}}
.rpg-pixel-save .save-slot-grid>article{background:${U},${s};color:${n};border:2px solid ${f};border-radius:12px;box-shadow:0 3px 0 ${C},0 5px 0 ${f}}
.rpg-pixel-save .save-slot-grid figure{background:${w};color:${m};border:2px solid ${T};border-radius:8px}
.rpg-pixel-save .save-slot-grid figure svg{color:${m}}
.rpg-pixel-save .save-slot-grid{grid-auto-rows:max-content}.rpg-pixel-save .save-slot-grid>article:hover{color:${n};transform:translateY(-2px)}
.rpg-pixel-save .save-slot-grid figure{position:relative;z-index:0;inset:auto;flex:none;width:auto;height:112px;margin:10px 10px 0;border:2px solid ${T};border-radius:8px}
.rpg-pixel-save .save-slot-grid figure:after{display:none}.rpg-pixel-save .save-slot-grid figure span{color:${m};text-shadow:none;font-size:12px}
.rpg-pixel-save .save-slot-info{padding:8px 12px;text-shadow:none}
.rpg-pixel-save .save-slot-name{text-shadow:none}.rpg-pixel-save .save-slot-name:hover{background:${$}}
.rpg-pixel-save .save-slot-pagination button{width:auto;min-width:36px;height:36px;min-height:36px;padding:0 8px;font-size:16px}
.rpg-pixel-save .save-slot-info :is(b,span,small){color:${m}}.rpg-pixel-save .save-slot-info b{color:${n}}
.rpg-pixel-save .save-slot-name,.rpg-pixel-inventory input{background:${s};color:${n};border:2px solid ${u};border-radius:8px}
.rpg-pixel-save input:focus-visible,.rpg-pixel-inventory input:focus-visible{outline:3px solid ${i};outline-offset:2px}
.rpg-pixel-save input:disabled{background:${w};color:${m};border-style:dashed}
.rpg-pixel-save .save-slot-pagination{background:transparent;color:${s};border-top:2px dashed #c9975a8c}
.rpg-pixel-save .save-slot-pagination button{border-color:${f};border-radius:10px}
.rpg-pixel-save .save-slot-pagination button:is([aria-current=page],[aria-pressed=true],.active){border-color:${s};box-shadow:0 0 0 2px ${f}}
.rpg-pixel-inventory{--inventory-accent:${i}!important;--inventory-surface:${s}!important;--inventory-item:${w}!important;--inventory-text:${n}!important;--inventory-radius:10px!important}
.rpg-pixel-inventory .inventory-hud-grid{grid-auto-rows:max-content}.rpg-pixel-inventory .inventory-hud-grid>button{min-height:112px}
.rpg-pixel-inventory .inventory-hud-grid :is(button,.empty){background:${w};color:${n};border:2px solid ${u};border-radius:10px;box-shadow:inset 0 0 0 2px ${s},0 2px 0 ${f}}
.rpg-pixel-inventory .inventory-hud-grid .empty{border-style:dashed;border-color:${T};background:#f0dcb3b3;box-shadow:none}
.rpg-pixel-inventory .inventory-hud-grid button:is(:hover,:focus-visible,.active){border-color:${i};background:${$};color:${n};box-shadow:inset 0 0 0 2px ${s},0 0 0 3px ${s}}
.rpg-pixel-inventory .inventory-hud-grid button.active:before{background:${i};color:${b};box-shadow:none}
.rpg-pixel-inventory .inventory-hud-grid button b{color:${n}}.rpg-pixel-inventory .inventory-hud-grid button i,.rpg-pixel-inventory .inventory-hud-grid button>span{background:${i};color:${b};border-radius:6px}
.rpg-pixel-inventory .inventory-hud-slot.empty>i{background:transparent;color:${m};border:2px solid ${T}}
.rpg-pixel-inventory .inventory-hud-grid button:focus-visible{outline:3px solid ${R};outline-offset:2px}
.rpg-pixel-inventory .inventory-hud-info{background:${U},${s};color:${n};border:2px solid ${f};border-radius:12px;box-shadow:0 3px 0 ${C},0 5px 0 ${f}}
.rpg-pixel-inventory .inventory-info-head b{color:${n}}.rpg-pixel-inventory .inventory-info-head>span{background:${w};color:${n};border-radius:6px}
.rpg-pixel-inventory .inventory-info-head small{color:${m}}
.rpg-pixel-inventory .inventory-info-effects li{background:${w};color:${m};border-radius:6px}
.rpg-pixel-inventory .inventory-use-error{background:#f7d4c6;color:${n};border:2px solid ${i};border-radius:8px}
.inventory-hud-panel.rpg-pixel-inventory>header h2{color:${s}}
.rpg-pixel-inventory .inventory-hud-info-empty>b{color:${n}}.rpg-pixel-inventory .inventory-hud-info-empty>p,.rpg-pixel-inventory .inventory-info-desc{color:${m}}
.rpg-pixel-inventory .inventory-hud-info-empty:before{color:${i}}
.rpg-pixel-inventory .inventory-hud-info>button{background:${i};color:${b};border-color:${b};box-shadow:0 0 0 2px ${z},0 3px 0 ${z};--paper-focus:${i}}
.rpg-pixel-inventory .inventory-hud-info>button:hover{background:${z};color:${b};border-color:${b}}
.rpg-pixel-inventory .inventory-hud-search{background:${s};color:${n};border:2px solid ${u};border-radius:10px}.rpg-pixel-inventory .inventory-hud-search input{background:transparent;border:0}.rpg-pixel-inventory .inventory-hud-search input::placeholder{color:${m}}.rpg-pixel-inventory .inventory-hud-search svg{color:${m}}
.rpg-pixel-inventory .inventory-hud-nomatch{color:${ae}}
.inventory-slot-tip.rpg-pixel-tip{background:${s};color:${n};border:2px solid ${u};border-radius:10px;box-shadow:0 3px 0 ${k}}.inventory-slot-tip.rpg-pixel-tip small{color:${m}}
@media(max-width:600px){.preview-overlay-panel.rpg-pixel-save,.inventory-hud-panel.rpg-pixel-inventory{padding:14px 12px;border-radius:18px;outline-offset:-7px}}
`,me=`
@font-face{font-family:RpgPixel;src:url('/plugins/rpg/ui/fusion-pixel/fusion-pixel-12px-proportional-zh_hant.otf.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
`,S="background:linear-gradient(125deg,#3d5a7a38,transparent 48%,#b4986420),#172233eb;color:#faf6e9;border:1px solid #c9a96a;border-radius:4px;backdrop-filter:blur(18px) saturate(.8);box-shadow:0 16px 64px #101a1740;";function P(e){return`
${e}{background:linear-gradient(110deg,#ffffff09,transparent),#131c2bcc;color:#faf6e9;border:1px solid #c9a96a;border-radius:3px;box-shadow:inset 0 1px #e6e8c914;font-family:RpgPixel,monospace;font-weight:400;font-synthesis:none;min-height:44px;padding:8px 14px;cursor:pointer;transition:transform .18s ease,background-color .18s ease,border-color .18s ease;text-shadow:0 1px 3px #141c17}
${e}:hover,${e}[aria-current=page],${e}[aria-pressed=true],${e}.active{background:linear-gradient(110deg,#eee9d91c,transparent),#1a2638dd;color:#fff9e8;border-color:#f4dfac;box-shadow:inset 3px 0 #f4dfac}
${e}:focus-visible{outline:2px solid #f7e6b9;outline-offset:3px}
${e}:active{background:linear-gradient(110deg,#eee9d915,transparent),#131c2bdd;color:#fff9e8;transform:translateY(1px);border-color:#f7e6b9;box-shadow:inset 3px 0 #f7e6b9}
${e}:disabled{background:linear-gradient(110deg,#ffffff04,transparent),#131c2bd9;color:#b7bfcc;border:1px dashed #7d8799;opacity:1;cursor:not-allowed;transform:none;box-shadow:none;text-shadow:none}
${e} :is(span,b,small,svg){color:inherit}
@media(prefers-reduced-motion:reduce){${e}{transition:none}${e}:active{transform:none}}
`}const F=e=>`
${P(e)}
${e}{position:relative;width:44px;height:44px;min-height:44px;flex:none;padding:0;font-size:0;opacity:1;display:grid;place-items:center}
${e}:before{content:'×';font:28px/1 RpgPixel,monospace;color:inherit;${le}}
${e} svg{display:none}
`,xe="content:'';display:block;position:absolute;width:8px;height:8px;background:#f4dfac;color:#172233;box-shadow:0 0 12px #e5d3a680;transform:rotate(45deg);pointer-events:none;",Re=`
${me}
body{font:24px/1.5 RpgPixel,monospace;font-synthesis:none;color:#faf6e9}
body :is(button,strong,b,h2,h3){font-weight:400}
body>header{${S}gap:18px;padding:10px 14px;top:max(12px,env(safe-area-inset-top));left:max(12px,env(safe-area-inset-left))}
body>header strong{font-size:24px}#status{font-size:12px;color:#d9decc}
${P("body>header button")}
body>header #menu{width:44px;height:44px;padding:0;font-size:24px}
body>header #weapon{display:grid;place-items:center;width:44px;height:44px;padding:0;font-size:22px}body>header #weapon[hidden]{display:none}body>header #weapon img{width:28px;height:28px;image-rendering:pixelated}body>header #weapon img[hidden]{display:none}
body>footer .pad{gap:6px;grid-template-columns:repeat(3,48px);padding:0;background:transparent;color:#faf6e9}
${P("body>footer button")}
body>footer .pad button{width:48px;height:48px;font-size:24px;padding:0;border-radius:3px;box-shadow:none;color:#faf6e9}
body>footer .stick{background:#131c2b99;border:1px solid #c9a96a;box-shadow:inset 0 0 0 6px #c9a96a1f}body>footer .stick i{background:#131c2bee;border:2px solid #c9a96a;box-shadow:inset 0 1px #e6e8c933}body>footer .stick.active i{background:#1a2638;border-color:#f4dfac;box-shadow:0 0 0 3px #f4dfac55}
body>footer .hint,#notice{${S}font-size:12px;line-height:2;padding:4px 8px}
#notice{top:104px}
@media(max-width:600px){body>header{gap:8px;padding:8px 10px;max-width:calc(100% - 64px)}body>header strong{font-size:18px}body>header button{font-size:18px;padding:6px;min-height:40px}body>header #menu{width:44px;height:44px}body>footer #interact{font-size:18px}}
`,He=`
${me}
html.larch-pad :is(.rpg-pause-menu,.inventory-hud-panel,.preview-overlay-panel,.history-panel) :focus{outline:3px solid var(--paper-focus,#e5ae52)!important;outline-offset:3px}
.rpg-pixel-playback .vn2-chrome-right{opacity:1;pointer-events:auto}
.rpg-pixel-playback .vn2-plugin-full>footer:not(:has(button)){display:none}
.rpg-pixel-playback .vn2-plugin-full>footer{background:#0d1522;color:#faf6e9;border-color:#8f9bb0;font:18px RpgPixel,monospace}.rpg-pixel-playback .vn2-plugin-full>footer b{font:inherit}.rpg-pixel-playback .vn2-plugin-full>footer svg{display:none}
${P(".rpg-pixel-playback .vn2-plugin-full>footer button")}
.preview-overlay-panel.rpg-pixel-save,.inventory-hud-panel.rpg-pixel-inventory{${S}font:18px/1.5 RpgPixel,monospace;font-synthesis:none;padding:16px;backdrop-filter:blur(18px)}
.history-panel.rpg-pixel-history{${S}font:18px/1.7 RpgPixel,monospace;font-synthesis:none;backdrop-filter:blur(18px)}
.rpg-pixel-history :is(header,article){background:#0d1522;color:#faf6e9;border-color:#8f9bb0;border-radius:3px}.rpg-pixel-history :is(h2,b){font-family:inherit;font-weight:400;color:#f4dfac}.rpg-pixel-history h2{font-size:24px}.rpg-pixel-history :is(p,small,span){color:#d9decc;font-family:inherit}.rpg-pixel-history article p{font-size:18px}
${P(".rpg-pixel-history button")}
${F(".rpg-pixel-history>header>button")}
${F(".rpg-pixel-playback button[data-tour=preview-close]")}
.rpg-pixel-playback button[data-tour=preview-close]:focus-visible{outline:3px solid #f7e6b9;outline-offset:2px}
.rpg-pixel-save :is(h2,b,strong),.rpg-pixel-inventory :is(h2,b,strong){font-weight:400;font-family:inherit}
.rpg-pixel-save h2,.rpg-pixel-inventory h2{font-size:24px;color:#faf6e9}
.rpg-pixel-save :is(small,span),.rpg-pixel-inventory :is(small,p){color:#d9decc}
.rpg-pixel-save>header,.rpg-pixel-inventory>header{background:transparent;color:#faf6e9;border-bottom:1px solid #8f9bb0;padding:4px 4px 16px;border-radius:3px}
${P(".rpg-pixel-save button")}
${P(".preview-overlay-panel.rpg-pixel-save article button")}
.rpg-pixel-save button{font-size:18px}
${P(".rpg-pixel-inventory button")}
${F(".rpg-pixel-save>header>button")}
${F(".rpg-pixel-inventory>header>button")}
.rpg-pixel-save .save-slot-grid>article{background:#131c2b;color:#faf6e9;border:1px solid #8f9bb0;border-radius:3px;box-shadow:none}
.rpg-pixel-save .save-slot-grid figure{background:#0b1220;color:#b7bfcc;border-radius:3px;image-rendering:pixelated}
.rpg-pixel-save .save-slot-info :is(b,span,small){font-size:12px;color:#d9decc}.rpg-pixel-save .save-slot-info b{font-size:18px;color:#faf6e9}
.rpg-pixel-save .save-slot-name,.rpg-pixel-inventory input{background:transparent;color:#faf6e9;border:1px solid #8f9bb0;border-radius:3px;font:18px RpgPixel,monospace;box-shadow:none}
.rpg-pixel-save input:focus-visible,.rpg-pixel-inventory input:focus-visible{outline:3px solid #f7e6b9;outline-offset:2px}
.rpg-pixel-save input:disabled{background:#0d1522;color:#b7bfcc;border-style:dashed}
.rpg-pixel-save button svg{display:none}.rpg-pixel-save .save-slot-pagination>button svg{display:block;width:20px;height:20px}
.rpg-pixel-save .save-slot-pagination{background:transparent;color:#faf6e9;border-top:1px solid #8f9bb0}.rpg-pixel-save .save-slot-pagination button{border-radius:3px}
.rpg-pixel-inventory{--inventory-accent:#f4dfac!important;--inventory-surface:#0d1522!important;--inventory-item:#131c2b!important;--inventory-text:#faf6e9!important;--inventory-radius:3px!important;--inventory-surface-opacity:100%!important}
.rpg-pixel-inventory .inventory-hud-grid :is(button,.empty){background:#131c2b;color:#faf6e9;border:1px solid #8f9bb0;border-radius:3px;box-shadow:none;padding:12px;image-rendering:pixelated}
.rpg-pixel-inventory .inventory-hud-grid button:is(:hover,:focus-visible,.active){border-color:#f4dfac;background:#24324a;color:#faf6e9;box-shadow:inset 0 0 0 2px #0d1522}
.rpg-pixel-inventory .inventory-hud-grid button.active:before{${xe}top:6px;left:6px;z-index:2}
.rpg-pixel-inventory .inventory-hud-grid button b{font-size:12px;color:#faf6e9}.rpg-pixel-inventory .inventory-hud-grid button i{font:12px RpgPixel,monospace;background:#0d1522;color:#f4dfac;border-radius:3px}
.rpg-pixel-inventory .inventory-hud-grid img,.rpg-pixel-inventory .inventory-info-head img{image-rendering:pixelated}
.rpg-pixel-inventory .inventory-hud-info{background:#131c2b;color:#faf6e9;border:1px solid #8f9bb0;border-radius:3px;box-shadow:none}
.rpg-pixel-inventory .inventory-info-head b{font-size:24px;color:#f4dfac}.rpg-pixel-inventory .inventory-info-head>span{border-radius:3px;background:#0d1522;color:#faf6e9}
.rpg-pixel-inventory .inventory-info-effects li{background:#0d1522;color:#d9decc;border-radius:3px;font-size:12px}.rpg-pixel-inventory .inventory-use-error{background:#592f29;color:#faf6e9;border:1px solid #ffc8bc;border-radius:3px}
.inventory-hud-panel.rpg-pixel-inventory>header h2{font:36px/1.3 RpgPixel,monospace;color:#f4dfac}.inventory-hud-panel.rpg-pixel-inventory>header :is(p,small){font:12px/1.6 RpgPixel,monospace;color:#d9decc;letter-spacing:0}
.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet{border-radius:3px;border-color:#8f9bb0;background:#131c2b;color:#faf6e9;padding:4px 12px 4px 6px}.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet>span{border-radius:3px;background:#0d1522;color:#f4dfac}
.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet b{font:24px/1 RpgPixel,monospace;color:#f4dfac}.inventory-hud-panel.rpg-pixel-inventory>header>.inventory-hud-wallet small{font:12px/1.4 RpgPixel,monospace;color:#d9decc}
.rpg-pixel-inventory .inventory-hud-info-empty>b{font:24px/1.5 RpgPixel,monospace;color:#f4dfac}.rpg-pixel-inventory .inventory-hud-info-empty>p,.rpg-pixel-inventory .inventory-info-desc{font:18px/1.6 RpgPixel,monospace;font-size:round(nearest,calc(18px * var(--inventory-text-scale,1)),6px);color:#d9decc}
.rpg-pixel-inventory .inventory-hud-info-empty>svg{display:none}.rpg-pixel-inventory .inventory-hud-info-empty:before{content:'◇';font:48px RpgPixel,monospace;color:#f4dfac}
.rpg-pixel-inventory .inventory-info-head small{font:12px RpgPixel,monospace;color:#d9decc}.rpg-pixel-inventory .inventory-hud-info>button{font:18px RpgPixel,monospace;border-radius:3px;background-color:#24324a;color:#faf6e9;box-shadow:none}
.rpg-pixel-inventory .inventory-hud-grid button>span,.rpg-pixel-inventory .inventory-hud-slot.empty>i{border-radius:3px;background:#0d1522;color:#f4dfac}.rpg-pixel-inventory .inventory-hud-slot.empty>i{opacity:1;border:1px solid #8f9bb0;width:12px;height:12px}
.rpg-pixel-inventory .inventory-hud-grid button:focus-visible{outline:3px solid #f7e6b9;outline-offset:2px}.rpg-pixel-inventory .inventory-hud-search{background:#0b1220;color:#faf6e9;border:1px solid #8f9bb0;border-radius:3px}.rpg-pixel-inventory .inventory-hud-search input{border:0;font-size:18px}.rpg-pixel-inventory .inventory-hud-search input::placeholder{color:#b7bfcc}.rpg-pixel-inventory .inventory-hud-search input:focus-visible{outline:3px solid #f7e6b9}.rpg-pixel-inventory .inventory-hud-nomatch{font-size:18px;color:#d9decc}
.inventory-slot-tip.rpg-pixel-tip{background:#0d1522;color:#faf6e9;border:1px solid #c9a96a;border-radius:3px;font:18px RpgPixel,monospace;font-size:round(nearest,calc(18px * var(--inventory-text-scale,1)),6px)}.inventory-slot-tip.rpg-pixel-tip small{color:#d9decc}
@media(max-width:600px){.preview-overlay-panel.rpg-pixel-save,.inventory-hud-panel.rpg-pixel-inventory{padding:12px;border-width:1px}.rpg-pixel-save .save-slot-actions button{font-size:12px;padding:8px}.rpg-pixel-inventory .inventory-hud-grid :is(button,.empty){padding:8px}}
${qe}
`,ce=`
.rpg-pause-menu{--larch-control-muted-bg:#fff;--larch-control-muted-fg:#273244;--larch-control-strong-bg:#243047;--larch-control-strong-fg:#fff;--pm-line:color-mix(in srgb,var(--pm-border) 38%,transparent);--pm-bg:var(--larch-paper,var(--surface,#f8f8f5));--pm-fg:var(--larch-ink,var(--ink,#252b28));--pm-muted:var(--larch-control-muted-fg,var(--muted,#505953));--pm-control:var(--larch-control-muted-bg,var(--control,#e4e8e1));--pm-border:color-mix(in srgb,var(--larch-control-muted-fg,var(--fg,#293e2f)) 65%,var(--larch-control-muted-bg,var(--control,#e4e8e1)));--pm-strong:var(--larch-control-strong-bg,var(--strong,#304d3a));--pm-on-strong:var(--larch-control-strong-fg,var(--strong-fg,#fff));--pm-focus:var(--larch-link-fg,var(--focus,#276237));background:var(--pm-bg);color:var(--pm-fg);font:14px/1.5 system-ui,sans-serif;isolation:isolate}
:root[data-theme=dark] .rpg-pause-menu{--larch-control-muted-bg:#283141;--larch-control-muted-fg:#f3f5fa;--larch-control-strong-bg:#e1e9f8;--larch-control-strong-fg:#172338}
@media(max-width:700px),(pointer:coarse){.rpg-desktop-controls{display:none!important}}
.rpg-pause-menu *{box-sizing:border-box}.rpg-pause-menu h2,.rpg-pause-menu h3,.rpg-pause-menu p{margin:0}.rpg-pause-menu small{font-size:11px;letter-spacing:.08em;color:var(--pm-muted)}
.rpg-pause-menu .pm-header{position:static;display:flex;align-items:center;justify-content:space-between;gap:20px;max-width:none;padding:24px 28px;margin:0;border:0;border-bottom:1px solid var(--pm-line);border-radius:3px;background:var(--pm-bg);color:var(--pm-fg);box-shadow:none}
.rpg-pause-menu .pm-header h2{font-size:24px;font-weight:750;letter-spacing:-.04em}.rpg-pause-menu .pm-header small{display:block;margin-bottom:3px}
.rpg-pause-menu button{display:flex;align-items:center;justify-content:center;gap:10px;min-height:42px;padding:10px 14px;border:1px solid var(--pm-border);border-radius:12px;background:var(--pm-control);color:var(--pm-muted);font:inherit;font-weight:600;cursor:pointer;touch-action:manipulation;transition:transform .22s cubic-bezier(.2,1.5,.4,1);color-scheme:inherit}
.rpg-pause-menu button svg{width:18px;height:18px;flex:none}.rpg-pause-menu button:hover,.rpg-pause-menu button[aria-current=page],.rpg-pause-menu button[aria-pressed=true],.rpg-pause-menu button.pm-primary{background:var(--pm-strong);color:var(--pm-on-strong);border-color:var(--pm-strong)}
.rpg-pause-menu button.pm-primary:hover{box-shadow:inset 0 0 0 2px var(--pm-on-strong)}.rpg-pause-menu button:focus-visible,.rpg-pause-menu input:focus-visible,.rpg-pause-menu summary:focus-visible{outline:3px solid var(--pm-focus);outline-offset:3px}.rpg-pause-menu button:active{transform:scale(.96)}.rpg-pause-menu button:disabled{background:var(--pm-control);color:var(--pm-muted);border:1px dashed var(--pm-border);cursor:not-allowed;transform:none;box-shadow:none}.rpg-pause-menu .pm-close{width:42px;padding:0;flex:none}
.rpg-pause-menu .pm-body{display:grid;grid-template-columns:210px minmax(0,1fr);min-height:0;flex:1;overflow:hidden}.rpg-pause-menu .pm-nav{display:flex;flex-direction:column;gap:8px;padding:24px 16px;overflow:auto;border-right:1px solid var(--pm-line)}.rpg-pause-menu .pm-nav button{justify-content:flex-start;width:100%;flex:none}.rpg-pause-menu .pm-nav .pm-nav-label{padding:0 10px 8px}.rpg-pause-menu .pm-nav .pm-divider{margin:8px 0;border-top:1px solid var(--pm-line)}
.rpg-pause-menu .pm-content{min-width:0;overflow:auto;padding:28px;overscroll-behavior:contain}.rpg-pause-menu .pm-content h3{font-size:16px;font-weight:700}.rpg-pause-menu .pm-location{display:flex;align-items:center;gap:8px;margin:7px 0 22px;color:var(--pm-muted);font-size:13px}.rpg-pause-menu .pm-location svg{width:16px;height:16px;flex:none}
.rpg-pause-menu .pm-hero{position:relative;display:grid;grid-template-columns:180px minmax(0,1fr);gap:26px;align-items:center;padding:24px;border:1px solid var(--pm-line);border-radius:20px;background:var(--pm-control);color:var(--pm-muted);overflow:hidden}.rpg-pause-menu .pm-portrait{position:relative;height:210px;display:grid;place-items:center;border-radius:14px;background:radial-gradient(ellipse at 50% 45%,#bd985c44,transparent 75%),var(--pm-bg);color:var(--pm-fg);overflow:hidden}.rpg-pause-menu .pm-portrait:before{content:'';position:absolute;inset:20px;border:1px solid var(--pm-border);border-radius:50%;opacity:.5}.rpg-pause-menu .pm-portrait:after{content:'';position:absolute;width:88px;height:14px;border-radius:50%;background:var(--pm-fg);color:var(--pm-bg);opacity:.15;bottom:27px;filter:blur(5px)}
.rpg-pause-menu .pm-portrait canvas{position:relative;z-index:1;display:block;width:auto;height:auto;max-width:150px;max-height:165px;image-rendering:pixelated;filter:drop-shadow(0 8px 4px #0002);touch-action:auto}.rpg-pause-menu .pm-portrait>svg{width:70px;height:70px}.rpg-pause-menu .pm-hero h3{font-size:30px;letter-spacing:-.04em;line-height:1.3;overflow-wrap:anywhere;margin:8px 0 18px}.rpg-pause-menu .pm-health-label{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-size:12px}.rpg-pause-menu .pm-health-label strong{font-size:19px;font-variant-numeric:tabular-nums}.rpg-pause-menu .pm-health-label strong span{font-size:12px;font-weight:400}.rpg-pause-menu .pm-health{height:8px;background:var(--pm-bg);color:var(--pm-fg);border:1px solid var(--pm-border);border-radius:99px;overflow:hidden;margin-top:9px}.rpg-pause-menu .pm-health>i{display:block;height:100%;background:#287239;color:#fff;border-radius:inherit}.rpg-pause-menu .pm-health-note{font-size:12px;margin-top:10px}
.rpg-pause-menu .pm-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 0}.rpg-pause-menu .pm-facts>div{padding:16px 18px;border:1px solid var(--pm-line);border-radius:14px}.rpg-pause-menu .pm-facts dt{font-size:12px;color:var(--pm-muted);margin-bottom:6px}.rpg-pause-menu .pm-facts dd{margin:0;font-size:20px;font-weight:650;overflow-wrap:anywhere}.rpg-pause-menu .pm-attributes{margin-top:24px}.rpg-pause-menu .pm-attributes .pm-facts{margin-top:12px}
.rpg-pause-menu .pm-footer{position:static;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 28px;border-top:1px solid var(--pm-line);background:var(--pm-bg);color:var(--pm-fg);pointer-events:auto}.rpg-pause-menu .pm-footer p{font-size:12px;color:var(--pm-muted)}.rpg-pause-menu kbd{background:var(--pm-control);color:var(--pm-muted);font:inherit;padding:2px 5px;border:1px solid var(--pm-border);border-radius:4px;margin-right:6px}
.rpg-pause-menu .pm-settings-title{margin-bottom:20px}.rpg-pause-menu .vn2-settings-body{display:flex;flex-direction:column;gap:24px;padding:0;overflow:visible}.rpg-pause-menu .vn2-settings-body section{display:grid;gap:10px}.rpg-pause-menu .vn2-settings-body h4{font-size:13px;letter-spacing:0;color:var(--pm-fg)}.rpg-pause-menu .vn2-menu-row{display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:12px;border:1px solid var(--pm-border);border-radius:12px;background:var(--pm-control);color:var(--pm-muted)}.rpg-pause-menu .vn2-menu-row>span{color:inherit;display:flex;align-items:center;gap:8px;flex:1;font-size:12px;min-width:110px}.rpg-pause-menu .vn2-menu-row input:focus-visible{outline:3px solid var(--pm-focus);outline-offset:3px}.rpg-pause-menu .vn2-menu-row svg{width:16px;height:16px}.rpg-pause-menu .vn2-menu-row input[type=range]{width:130px;min-width:60px;flex:1;accent-color:var(--pm-strong)}.rpg-pause-menu .vn2-menu-row b{min-width:40px;text-align:right;font-size:12px}.rpg-pause-menu .vn2-reading-note{font-size:12px;line-height:1.7;color:var(--pm-muted);margin:0}.rpg-pause-menu .vn2-menu-actions{grid-template-columns:repeat(3,minmax(0,1fr))}.rpg-pause-menu .vn2-menu-actions button{font-size:12px;padding:10px 8px}.rpg-pause-menu .vn2-menu-actions .vn2-dialogue-actions-divider{display:none}.rpg-pause-menu .vn2-character-stats{display:none}.rpg-pause-menu section:has(>.vn2-character-stats){display:none}.rpg-pause-menu .studio-select .select-menu-trigger :is(b,small,svg){color:inherit}.rpg-pause-menu .vn2-menu-row .studio-select{min-width:150px}.rpg-pause-menu .vn2-menu-toggle input{accent-color:var(--pm-strong)}

.rpg-pause-menu button :is(span,b,small,svg){color:inherit}
.rpg-pause-menu .studio-select .select-menu-trigger{background:var(--pm-control);color:var(--pm-muted);border:1px solid var(--pm-border)}
.rpg-pause-menu .studio-select .select-menu-trigger:hover,.rpg-pause-menu .studio-select .select-menu-trigger[aria-expanded=true]{background:var(--pm-strong);color:var(--pm-on-strong);border-color:var(--pm-strong)}
.rpg-pause-menu .studio-select .select-menu-value b{text-align:left}
.select-menu-popup.rpg-pause-select{z-index:1300;box-sizing:border-box;overflow-y:auto;padding:6px;border-radius:13px;background:var(--larch-paper);color:var(--larch-ink);border:1px solid var(--larch-control-muted-fg)}
.select-menu-popup.rpg-pause-select .select-menu-option{width:100%;display:flex;align-items:center;gap:9px;padding:9px 10px;border:0;border-radius:9px;background:var(--larch-paper);color:var(--larch-ink);text-align:left;cursor:pointer}
.select-menu-popup.rpg-pause-select .select-menu-option>span{min-width:0;flex:1;display:grid;gap:2px}.select-menu-popup.rpg-pause-select .select-menu-check{flex:0 0 auto;width:15px}
.select-menu-popup.rpg-pause-select .select-menu-option :is(b,small,span,svg){color:inherit}
.select-menu-popup.rpg-pause-select .select-menu-option:is(:hover,:focus-visible,.selected,[data-active=true]){background:var(--larch-control-strong-bg);color:var(--larch-control-strong-fg)}
.preview-overlay-panel.rpg-pause-panel{width:min(980px,100%);max-height:min(780px,calc(100dvh - 48px));padding:0;border:0;border-radius:24px;overflow:hidden;background:var(--larch-paper);color:var(--larch-ink)}.rpg-pause-panel>.rpg-pause-menu{display:flex;flex-direction:column;max-height:inherit;height:min(740px,calc(100dvh - 48px))}
#local-menu.rpg-pause-menu{padding:0;width:min(800px,calc(100% - 32px));max-width:none;max-height:calc(100dvh - 32px);border:1px solid var(--pm-border);border-radius:24px;box-shadow:0 24px 100px #0006}#local-menu::backdrop{background:#10182099;backdrop-filter:blur(7px)}#local-menu .pm-body{grid-template-columns:180px minmax(0,1fr)}#local-menu .pm-hero{grid-template-columns:130px minmax(0,1fr);padding:18px;gap:20px}#local-menu .pm-portrait{height:180px}#local-menu .pm-portrait canvas{max-width:120px;max-height:140px}#local-menu .pm-content{max-height:calc(100dvh - 232px)}#local-menu[open]{animation:pm-enter .38s cubic-bezier(.16,1.35,.4,1)}@keyframes pm-enter{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
:root[data-theme=dark] .rpg-pause-menu .pm-health>i{background:#9fdaa9;color:#18301d}
@media(max-width:680px){.rpg-pause-menu .pm-header{padding:18px}.rpg-pause-menu .pm-header h2{font-size:21px}.rpg-pause-menu .pm-body,#local-menu .pm-body{grid-template-columns:1fr;display:flex;flex-direction:column}.rpg-pause-menu .pm-nav{flex-direction:row;flex:none;padding:12px;gap:7px;border-right:0;border-bottom:1px solid var(--pm-border)}.rpg-pause-menu .pm-nav button{width:auto;white-space:nowrap;font-size:12px;padding:9px 12px}.rpg-pause-menu .pm-nav-label,.rpg-pause-menu .pm-divider{display:none}.rpg-pause-menu .pm-content{padding:18px}.rpg-pause-menu .pm-hero,#local-menu .pm-hero{grid-template-columns:100px minmax(0,1fr);padding:16px;gap:16px}.rpg-pause-menu .pm-portrait,#local-menu .pm-portrait{height:156px}.rpg-pause-menu .pm-portrait canvas,#local-menu .pm-portrait canvas{max-width:90px;max-height:115px}.rpg-pause-menu .pm-hero h3{font-size:24px}.rpg-pause-menu .pm-footer{padding:12px 18px}.rpg-pause-menu .pm-footer p{font-size:11px}.rpg-pause-menu .pm-footer kbd{display:none}.rpg-pause-menu .pm-facts{gap:10px}.rpg-pause-menu .pm-facts>div{padding:12px}.rpg-pause-menu .pm-facts dd{font-size:17px}.rpg-pause-menu .vn2-menu-actions{grid-template-columns:repeat(2,minmax(0,1fr))}#local-menu .pm-content{max-height:calc(100dvh - 305px)}.preview-overlay-panel.rpg-pause-panel{max-height:calc(100dvh - 24px);border-radius:20px}.rpg-pause-panel>.rpg-pause-menu{height:calc(100dvh - 24px)}}
@media(max-width:700px),(pointer:coarse){#local-menu #local-controls{display:none}}
@media(prefers-reduced-motion:reduce){.rpg-pause-menu button{transition:none}.rpg-pause-menu button:active{transform:none}#local-menu[open]{animation:none}}
.rpg-pause-menu,:root[data-theme=dark] .rpg-pause-menu{--pm-bg:#0d1522;--pm-fg:#faf6e9;--pm-muted:#d9decc;--pm-control:#131c2b;--pm-border:#8f9bb0;--pm-strong:#24324a;--pm-on-strong:#faf6e9;--pm-focus:#f7e6b9;--pm-line:#8f9bb0;background:transparent;color:#faf6e9;font:24px/1.5 RpgPixel,monospace;font-synthesis:none}
.preview-overlay-panel.rpg-pause-panel,#local-menu.rpg-pause-menu{${S}padding:0;overflow:hidden}
.rpg-pause-panel>.rpg-pause-menu{height:min(740px,calc(100dvh - 50px))}
.rpg-pause-menu :is(h2,h3,h4,b,strong,button){font-weight:400}.rpg-pause-menu small{font-size:12px;letter-spacing:1px;color:#d9decc}
.rpg-pause-menu .pm-header{padding:12px 20px;border-bottom:1px solid #8f9bb0;background:transparent;color:#faf6e9}.rpg-pause-menu .pm-header h2{font-size:36px;letter-spacing:0;color:#f4dfac}
${P(".rpg-pause-menu button")}
.rpg-pause-menu .pm-body{grid-template-columns:220px minmax(0,1fr)}.rpg-pause-menu .pm-nav{padding:20px 12px;border-right:1px solid #8f9bb0;gap:12px}.rpg-pause-menu .pm-nav button{position:relative;padding-left:30px;font-size:24px;min-height:48px;white-space:nowrap}
.rpg-pause-menu .pm-nav button svg,.rpg-pause-menu .pm-location svg,.rpg-pause-menu .pm-primary svg,.rpg-pause-menu .vn2-menu-actions button svg{display:none}
.rpg-pause-menu .pm-nav button[aria-current=page]:before{${xe}left:12px;top:calc(50% - 4px)}
.rpg-pause-menu .pm-content{padding:20px 24px}.rpg-pause-menu .pm-content h3{font-size:24px;letter-spacing:0}.rpg-pause-menu .pm-location{font-size:18px;margin-bottom:16px}
.rpg-pause-menu .pm-hero{background:linear-gradient(110deg,#7fb2ff12,transparent);color:#faf6e9;border:0;border-radius:3px;padding:16px;gap:22px;grid-template-columns:144px minmax(0,1fr)}
.rpg-pause-menu .pm-portrait{height:216px;border-radius:3px;background:radial-gradient(ellipse at 50% 70%,#7fb2ff30,transparent 70%);color:#faf6e9}.rpg-pause-menu .pm-portrait:before,.rpg-pause-menu .pm-portrait:after{display:none}.rpg-pause-menu .pm-portrait canvas{max-width:110px;max-height:154px;filter:none}
.rpg-pause-menu .pm-hero h3{font-size:36px;letter-spacing:0;margin:8px 0 16px;color:#f4dfac}.rpg-pause-menu .pm-health-label strong{font-size:24px}.rpg-pause-menu .pm-health-label strong span{font-size:12px}.rpg-pause-menu .pm-health{height:12px;border-radius:3px;border:1px solid #8f9bb0;background:#0b1220;color:#faf6e9}.rpg-pause-menu .pm-health>i,:root[data-theme=dark] .rpg-pause-menu .pm-health>i{background:linear-gradient(90deg,#b2c391,#d2dcb4);color:#14251c;box-shadow:inset 0 1px 0 #d0fff0}
.rpg-pause-menu .pm-level{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-top:12px;font-size:12px;color:#d9decc}.rpg-pause-menu .pm-level b{font-size:22px;color:#f4dfac}.rpg-pause-menu .pm-level>span:last-child{font-variant-numeric:tabular-nums}
.rpg-pause-menu .pm-exp{height:8px;margin-top:6px;border:1px solid #8f9bb0;border-radius:3px;background:#0b1220;overflow:hidden}.rpg-pause-menu .pm-exp>i{display:block;height:100%;background:linear-gradient(90deg,#7fb2ff,#bfe6ff)}
.rpg-pause-menu .pm-bag-item[data-unusable] img{opacity:.35;filter:grayscale(1)}
.rpg-pause-menu .pm-facts>div{background:#0d152254;color:#faf6e9;border:0;border-bottom:1px solid #c9a96a;border-radius:0;padding:12px 16px}.rpg-pause-menu .pm-facts dd{font-size:24px;font-weight:400}.rpg-pause-menu .pm-facts dt,.rpg-pause-menu .pm-health-note{font-size:12px;color:#d9decc}
.rpg-pause-menu .pm-footer{background:transparent;color:#faf6e9;padding:12px 20px;border-top:1px solid #8f9bb0}.rpg-pause-menu .pm-footer p{font-size:12px}.rpg-pause-menu kbd{border-radius:3px;border:1px solid #8f9bb0;background:#131c2b;color:#faf6e9}
.rpg-pause-menu button.pm-primary,.rpg-pause-menu button.pm-primary:hover{background-color:#24324a;color:#faf6e9;border-color:#f4dfac;box-shadow:none}
${F(".rpg-pause-menu .pm-close")}
.rpg-pause-menu .vn2-settings-body h4{font-size:18px}.rpg-pause-menu .vn2-menu-row{border:1px solid #8f9bb0;border-radius:3px;background:#131c2be0;color:#faf6e9}.rpg-pause-menu .vn2-menu-actions button{font-size:18px;border-radius:3px}.rpg-pause-menu .vn2-menu-row>span,.rpg-pause-menu .vn2-menu-row b{font-size:12px}.rpg-pause-menu .vn2-menu-row svg{display:none}
.rpg-pause-menu .vn2-menu-row input[type=range]{appearance:none;height:8px;border:1px solid #8f9bb0;border-radius:3px;background:#0b1220;color:#faf6e9;accent-color:#f4dfac;cursor:pointer}
.rpg-pause-menu input[type=range]::-webkit-slider-thumb{appearance:none;width:16px;height:20px;background:#f4dfac;color:#0d1522;border:2px solid #e8d7a6;border-radius:3px;box-shadow:none}
.rpg-pause-menu input[type=range]::-moz-range-thumb{width:12px;height:16px;background:#f4dfac;color:#0d1522;border:2px solid #e8d7a6;border-radius:3px;box-shadow:none}

.rpg-pause-menu .studio-select .select-menu-trigger,.rpg-pause-menu .studio-select .select-menu-trigger:is(:hover,[aria-expanded=true]){background-color:#24324a;color:#faf6e9;border:1px solid #c9a96a;border-radius:3px;font:18px RpgPixel,monospace}
.select-menu-popup.rpg-pause-select{${S}padding:4px;font:18px/1.5 RpgPixel,monospace;font-synthesis:none}.select-menu-popup.rpg-pause-select .select-menu-option{border-radius:3px;background:#0d1522;color:#faf6e9;font:inherit}.select-menu-popup.rpg-pause-select .select-menu-option:is(:hover,:focus-visible,.selected,[data-active=true]){background:#24324a;color:#faf6e9;outline-color:#f4dfac}.select-menu-popup.rpg-pause-select .select-menu-option small{font-size:12px}
@media(max-width:680px){.rpg-pause-menu .pm-header{padding:8px 12px}.rpg-pause-menu .pm-header h2{font-size:24px}.rpg-pause-menu .pm-nav{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:10px 8px;border-right:0;border-bottom:1px solid #8f9bb0;gap:10px}.rpg-pause-menu .pm-nav button{font-size:18px;padding:8px 4px;min-height:44px;justify-content:center}.rpg-pause-menu .pm-nav button[aria-current=page]:before{display:none}.rpg-pause-menu .pm-content{padding:16px 12px}.rpg-pause-menu .pm-hero,#local-menu .pm-hero{grid-template-columns:96px minmax(0,1fr);padding:10px;gap:12px}.rpg-pause-menu .pm-portrait,#local-menu .pm-portrait{height:144px}.rpg-pause-menu .pm-portrait canvas{max-width:72px;max-height:108px}.rpg-pause-menu .pm-hero h3{font-size:24px}.rpg-pause-menu .pm-footer{padding:10px 12px;gap:8px}.rpg-pause-menu .pm-footer button{font-size:18px;padding:8px}.rpg-pause-menu .pm-facts>div{padding:10px}.rpg-pause-menu .pm-health-label{gap:4px}.rpg-pause-menu .pm-health-label strong{font-size:18px}.rpg-pause-menu .vn2-menu-actions button{font-size:12px}.rpg-pause-menu .pm-location{font-size:12px}.rpg-pause-panel>.rpg-pause-menu{height:calc(100dvh - 26px)}.preview-overlay-panel.rpg-pause-panel{max-height:calc(100dvh - 24px);border-radius:3px}}

`,Ye=ce+ze+`
`,De=e=>ce+ge(e)+`
`;export{De as a,He as b,E as c,oe as d,j as e,M as f,Re as g,xe as p,Ye as r,Pe as s};
