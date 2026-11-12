import{l as k,e as w,b as y}from"./rpg-core-DKNJgNTD.js";function z(){const e="#dialogue .dlg-cast img.card-standee",s="scale(var(--s,1)) scaleX(var(--fx,1)) scaleY(var(--fy,1)) scaleX(var(--loop-face,1)) translateX(-50%)",r=a=>(a.match(/@keyframes [\w-]+\{(?:[^{}]*\{[^{}]*\})+\}/g)||[]).map(n=>n.replace(/@keyframes larch-/,"@keyframes dlg-st-").replace(/transform:([^;}]+)/g,(i,c)=>`transform:${c.trim()} ${s}`)).join(`
`),g=(a,n)=>[...a.matchAll(new RegExp(`^\\.${n}-(\\w+)\\{animation:larch-${n}-\\w+ ([\\d.]+s)([^;}]*)\\}`,"gm"))].map(i=>({name:i[1],length:i[2],rest:i[3]})),t=g(w,"enter").map(a=>`${e}.enter[data-enter=${a.name}]{--st-enter:dlg-st-enter-${a.name} var(--st-enter-ms,${a.length})${a.rest.replace(/\bboth\b/,"backwards")}}`),u=g(y,"exit").map(a=>`${e}.stage-leaving[data-exit=${a.name}]{animation:dlg-st-exit-${a.name} var(--st-exit-ms,${a.length})${a.rest}}`),p=[...k.matchAll(/^\.loop-(\w+)(\.loop-face)?\{(?:[^;{}]*;)?animation:([^}]+)\}/gm)].flatMap(([,a,n,i])=>{const c=i.replace(/larch-loop-/g,"dlg-st-loop-"),x=`${e}[data-loop=${a}]${n?"[data-loop-face]":""}`,b=c.replace(/\binfinite\b/g,"1").replace(/dlg-st-loop-sway /,"dlg-st-loop-sway-once ");return[`${x}{--st-loop:${c}}`,`${x}[data-loop-once]{--st-loop:${b}}`]});return[r(w),r(y),r(k),'@property --loop-face{syntax:"<number>";inherits:true;initial-value:1}',`${e},${e}.enter{animation:var(--st-loop,none),var(--st-mood,none),var(--st-enter,none)}`,`${e}.enter{--st-enter:dlg-fade .45s ease-out}`,`${e}.enter[data-enter=none]{--st-enter:none}`,...t,`${e}[data-emotion=happy]:not(.dim){--st-mood:dlg-hop .55s ease-out}`,`${e}[data-emotion=angry]:not(.dim){--st-mood:dlg-shake .42s ease-out}`,`${e}[data-emotion=sad]:not(.dim){--st-mood:dlg-sink .7s ease-out forwards}`,`${e}[data-emotion=surprised]:not(.dim){--st-mood:dlg-jump .4s ease-out}`,...p,`${e}.stage-leaving{pointer-events:none;animation:dlg-st-exit-fade var(--st-exit-ms,.34s) cubic-bezier(.4,0,.7,.4) both}`,`${e}.stage-leaving[data-exit=none]{animation:none;opacity:0}`,...u,`@media (prefers-reduced-motion:reduce){${e}[data-loop]{--st-loop:none!important}${e}.enter[data-enter]:not([data-enter=none]){--st-enter:dlg-fade .2s ease-out!important}}`].join(`
`)}const C=`
#dialogue{--dlg-border-solid:#6b4526;--dlg-accent-solid:#a4552a;--dlg-solid:#05070a;--dlg-panel:rgba(5,7,10,.84);--dlg-text:#f6f2e8;--dlg-speaker:#e2c17c;--dlg-accent:#b68a3d;--dlg-border:rgba(202,168,95,.55);--dlg-radius:0px;--dlg-width:74%;--dlg-padding:26px;--dlg-offset:3.2vh;--dlg-font:"Noto Serif TC","Songti TC","PMingLiU",serif;--dlg-size:25px;--dlg-name-size:18px;--dlg-blur:0px;position:absolute;inset:0;z-index:4;pointer-events:none;color:var(--dlg-text);font-family:var(--dlg-font);font-synthesis:none}
#dialogue[hidden]{display:none}
#dialogue-backdrop{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1;pointer-events:none;animation:dlg-fade .45s ease-out}
#dialogue-backdrop[hidden]{display:none}
#dialogue .dlg-cast{position:absolute;inset:0;overflow:hidden;pointer-events:none;isolation:isolate}
#dialogue .dlg-cast img{position:absolute;bottom:-9vh;height:94vh;max-width:64vw;object-fit:contain;object-position:bottom center;transform-origin:50% 100%;filter:brightness(1) saturate(1) drop-shadow(0 18px 32px #0008);transition:filter .32s ease,transform .38s cubic-bezier(.2,.8,.2,1),opacity .3s ease}
#dialogue .dlg-cast img[hidden]{display:none}
#dialogue #portrait{right:7vw}
#dialogue #portrait-alt{left:5vw}
#dialogue .dlg-cast img.pixel-standee{height:min(44vh,calc(100% - var(--dlg-stand,21vh) - 16px));bottom:var(--dlg-stand,21vh);filter:brightness(1) saturate(1) drop-shadow(0 6px 0 #0007)}
#dialogue .dlg-cast img.pixel-standee.dim{filter:brightness(.52) saturate(.78) drop-shadow(0 6px 0 #0007)}
#dialogue .dlg-cast img.dim{filter:brightness(.52) saturate(.78) drop-shadow(0 18px 32px #0008);transform:translateY(1.4vh) scale(.975)}
#dialogue .dlg-cast img.enter{animation:dlg-enter .5s cubic-bezier(.2,.8,.2,1)}
/* A dialogue card's people (the runtime's stageCard), where the card's stage puts them and as large as in the story player
   (.stage-actor: 88% of the screen's height at scale 1, --x their middle, --y their feet up from the bottom). Listening
   only darkens them; the 表情 animations move them with translate, which adds to this transform. The transform turns
   about their feet's middle (the origin is the box's left edge, which translateX(-50%) brings under their middle), so the
   card's 入場 and 循環 animations (scale, rotate) grow and sway them in place.
   Lit and dimmed keep the same filter functions (brightness(1) when lit), or the switch between speakers jumps instead
   of fading (fb-7a629dcd). */
#dialogue .dlg-cast img.card-standee,#dialogue .dlg-cast img.card-standee.dim{left:var(--x,50%);right:auto;bottom:var(--y,0%);height:88%;width:auto;max-width:none;transform-origin:0 100%;transform:scale(var(--s,1)) scaleX(var(--fx,1)) scaleY(var(--fy,1)) scaleX(var(--loop-face,1)) translateX(-50%)}
#dialogue .dlg-cast img.card-standee{filter:brightness(1) saturate(1) drop-shadow(0 20px 40px #0000004d)}
#dialogue .dlg-cast img.card-standee.dim{filter:brightness(.56) saturate(.82) drop-shadow(0 20px 40px #0000004d)}
#dialogue .dlg-cast img:not(.card-standee)[data-emotion=happy]:not(.dim){animation:dlg-hop .55s ease-out}
#dialogue .dlg-cast img:not(.card-standee)[data-emotion=angry]:not(.dim){animation:dlg-shake .42s ease-out}
#dialogue .dlg-cast img:not(.card-standee)[data-emotion=sad]:not(.dim){animation:dlg-sink .7s ease-out forwards}
#dialogue .dlg-cast img:not(.card-standee)[data-emotion=surprised]:not(.dim){animation:dlg-jump .4s ease-out}
${z()}
/* A dialogue card's stage videos (the runtime's stageVideos): x/y their middle in % of the screen, 64% of its width at scale 1,
   as on the player's stage (.stage-video); behind the standees or in front of them. */
#dialogue .dlg-videos{position:absolute;inset:0;overflow:hidden;pointer-events:none}
#dialogue .dlg-video{position:absolute;left:var(--x,50%);top:var(--y,50%);width:64%;aspect-ratio:var(--aspect,16/9);animation:dlg-fade .45s ease-out}
#dialogue .dlg-video-inner{width:100%;height:100%;opacity:var(--opacity,1);transform:translate(-50%,-50%) rotate(var(--rotate,0deg)) scale(var(--scale,1)) scaleX(var(--flip,1));transition:opacity .45s ease}
#dialogue .dlg-video.is-fill{inset:0;width:100%;height:100%;aspect-ratio:auto}
#dialogue .dlg-video.is-fill .dlg-video-inner{transform:scaleX(var(--flip,1))}
#dialogue .dlg-video :is(video,iframe){display:block;width:100%;height:100%;margin:0;border:0;background:transparent;object-fit:contain;pointer-events:none}
#dialogue .dlg-video[data-fit=cover] video{object-fit:cover}
#dialogue .dlg-video[data-fit=fill] video{object-fit:fill}
#dialogue .dlg-video.is-finished .dlg-video-inner{opacity:0}
#dialogue[data-presentation=bubble] .dlg-videos{display:none}
/* A card's props (道具) sit on the stage as on the player's stage (.stage-prop): their middle at --x/--y, as big as there
   (38% of the stage wide, 60% tall at scale 1), behind the standees or in front of them. */
#dialogue .dlg-props{position:absolute;inset:0;overflow:hidden;pointer-events:none}
#dialogue .dlg-prop{position:absolute;left:var(--x,50%);top:var(--y,50%);animation:dlg-fade .45s ease-out}
#dialogue .dlg-prop img{display:block;width:auto;height:auto;max-width:38vw;max-height:60vh;object-fit:contain;transform:translate(-50%,-50%) rotate(var(--rotate,0deg)) scale(var(--scale,1)) scaleX(var(--flip,1));transform-origin:50% 50%;filter:drop-shadow(0 10px 18px #00000038);-webkit-user-drag:none}
#dialogue[data-presentation=bubble] .dlg-props{display:none}
/* The card's 震動 shakes the scene (the map, the backdrop, the videos, the props, the standees), never the words; as
   strong and as quick as its knobs, like the player's .stage-shaking. */
main.dlg-shaking{--shake-unit:calc(13 * var(--fx-shake-intensity,1))}
main.dlg-shaking>canvas,#dialogue.dlg-shaking>:is(.dlg-videos,.dlg-props,.dlg-cast){animation:dlg-stage-shake calc(.5s / var(--fx-shake-speed,1)) linear infinite}
#dialogue.dlg-shaking>#dialogue-backdrop{animation:dlg-fade .45s ease-out,dlg-stage-shake calc(.5s / var(--fx-shake-speed,1)) linear infinite}
@keyframes dlg-stage-shake{0%,100%{translate:0 0}12%{translate:calc(var(--shake-unit,10) * -1px) calc(var(--shake-unit,10) * .55px)}25%{translate:calc(var(--shake-unit,10) * .82px) calc(var(--shake-unit,10) * -.78px)}37%{translate:calc(var(--shake-unit,10) * -.64px) calc(var(--shake-unit,10) * -.42px)}50%{translate:calc(var(--shake-unit,10) * .95px) calc(var(--shake-unit,10) * .5px)}62%{translate:calc(var(--shake-unit,10) * -.5px) calc(var(--shake-unit,10) * .76px)}75%{translate:calc(var(--shake-unit,10) * .6px) calc(var(--shake-unit,10) * -.3px)}87%{translate:calc(var(--shake-unit,10) * -.28px) calc(var(--shake-unit,10) * .2px)}}
/* A page that only plays its stage (隱藏台詞): no box; a click anywhere goes on. */
#dialogue.page-hidden{pointer-events:auto;cursor:pointer}
#dialogue.page-hidden .dlg-box{visibility:hidden;pointer-events:none}
.dlg-box{position:absolute;left:0;right:0;bottom:0;pointer-events:auto;cursor:pointer;min-height:clamp(210px,31vh,290px);padding:clamp(86px,12vh,150px) clamp(30px,5.5vw,110px) clamp(28px,4.3vh,54px);background:linear-gradient(0deg,color-mix(in srgb,var(--dlg-solid) 98%,transparent) 0%,color-mix(in srgb,var(--dlg-solid) 86%,transparent) 40%,color-mix(in srgb,var(--dlg-solid) 42%,transparent) 68%,transparent 100%);animation:dlg-fade .35s ease-out}
#dialogue.ui-panel .dlg-box{left:50%;right:auto;bottom:var(--dlg-offset);width:min(var(--dlg-width),calc(100% - 32px));min-height:0;padding:var(--dlg-padding) calc(var(--dlg-padding) * 1.3) calc(var(--dlg-padding) + 30px);transform:translateX(-50%);background:var(--dlg-panel);border:1px solid var(--dlg-border);border-radius:var(--dlg-radius);backdrop-filter:blur(var(--dlg-blur));box-shadow:0 24px 64px #0006}
#dialogue.transparent .dlg-box{background:none;border-color:transparent;box-shadow:none;backdrop-filter:none}
.dlg-nameplate{width:max-content;max-width:70%;margin:0 0 12px;padding:6px 12px;border:1px solid color-mix(in srgb,var(--dlg-accent) 60%,transparent);border-radius:2px;background:rgba(4,5,7,.46);color:var(--dlg-speaker);box-shadow:0 8px 25px rgba(0,0,0,.24)}
.dlg-nameplate:has(#speaker:empty){display:none}
#speaker{display:block;font:var(--dlg-name-size)/1.35 var(--dlg-font);letter-spacing:.1em;color:var(--dlg-speaker);text-shadow:0 2px 5px #000}
#text{margin:0;max-width:min(1180px,100%);min-height:3.64em;max-height:32vh;overflow:auto;font:var(--dlg-size)/1.82 var(--dlg-font);letter-spacing:.055em;white-space:pre-wrap;color:var(--dlg-text);text-shadow:0 2px 7px #000;scrollbar-width:thin}
#text .dlg-rest{visibility:hidden}
/* Words the card marked, as the player's dialogue box shows them (the .rt-* rules in styles.css). */
#text :is(.rt-bold,.rt-italic){font-synthesis:weight style}
#text .rt-bold{font-weight:850;-webkit-text-stroke:.03em currentColor}
#text .rt-italic{font-style:italic}
#text .rt-big{font-size:1.34em}
#text .rt-small{font-size:.82em}
#text .rt-glow{text-shadow:0 0 6px currentColor,0 0 18px currentColor}
#text .rt-shake{display:inline-block;animation:dlg-rt-shake .32s infinite}
#text .rt-wave{display:inline-block;animation:dlg-rt-wave 1.5s ease-in-out infinite}
@keyframes dlg-rt-shake{0%,100%{translate:0 0}20%{translate:-1.5px 1px}40%{translate:1.5px -1px}60%{translate:-1px -1.5px}80%{translate:1px 1.5px}}
@keyframes dlg-rt-wave{0%,100%{translate:0 0}50%{translate:0 -.22em}}
.dialogue-actions{position:absolute;right:clamp(24px,4.5vw,72px);bottom:clamp(20px,3.6vh,46px);display:flex;align-items:center;justify-content:flex-end;gap:12px;flex-wrap:wrap;max-width:calc(100% - 48px)}
#dialogue .dialogue-actions button{font:15px/1.4 var(--dlg-font);letter-spacing:.06em;min-height:44px;margin:0;box-shadow:none;transition:opacity .2s,background-color .2s,border-color .2s,transform .2s}
#dialogue #next{display:inline-flex;align-items:center;gap:8px;padding:8px 6px 8px 12px;background:transparent;color:color-mix(in srgb,var(--dlg-accent) 70%,#fff);border:1px solid transparent;border-radius:2px;text-shadow:0 2px 6px #000}
#dialogue #next:after{content:'';width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(-45deg);margin-left:2px;animation:dlg-nudge 1.1s ease-in-out infinite}
#dialogue #next:hover{background:rgba(4,5,7,.5);color:#fff;border-color:color-mix(in srgb,var(--dlg-accent) 55%,transparent)}
#dialogue #next:active{background:rgba(4,5,7,.7);color:#fff;transform:translateY(1px)}
#dialogue #next:focus-visible,#dialogue #dialogue-cancel:focus-visible{outline:2px solid color-mix(in srgb,var(--dlg-accent) 70%,#fff);outline-offset:2px}
#dialogue .dlg-mode{display:inline-flex;align-items:center;gap:7px;padding:8px 10px;background:transparent;color:color-mix(in srgb,var(--dlg-text) 82%,transparent);border:1px solid transparent;border-radius:2px;text-shadow:0 2px 6px #000;cursor:pointer}
#dialogue .dlg-mode:before{content:'';width:7px;height:7px;border-radius:50%;border:1.5px solid currentColor;box-sizing:border-box}
#dialogue .dlg-mode:hover{background:rgba(4,5,7,.5);color:#fff;border-color:color-mix(in srgb,var(--dlg-accent) 55%,transparent)}
#dialogue .dlg-mode:active{background:rgba(4,5,7,.7);color:#fff;transform:translateY(1px)}
#dialogue .dlg-mode:focus-visible{outline:2px solid color-mix(in srgb,var(--dlg-accent) 70%,#fff);outline-offset:2px}
#dialogue .dlg-mode[aria-pressed=true]{color:color-mix(in srgb,var(--dlg-accent) 70%,#fff);background:rgba(4,5,7,.42);border-color:color-mix(in srgb,var(--dlg-accent) 45%,transparent)}
#dialogue .dlg-mode[aria-pressed=true]:before{background:currentColor;box-shadow:0 0 6px currentColor}
#dialogue[data-presentation=bubble] .dlg-mode{display:none}
#dialogue.typing #next{opacity:.38}
#dialogue.typing #next:after{animation:none}
#dialogue.choosing #next,#dialogue #dialogue-cancel{min-width:min(280px,42vw);justify-content:center;padding:10px 20px;color:var(--dlg-text);border:1px solid var(--dlg-edge,color-mix(in srgb,var(--dlg-accent) 45%,transparent));border-radius:2px;background:linear-gradient(90deg,rgba(5,6,8,.84),rgba(5,6,8,.42));text-shadow:0 2px 5px #000}
#dialogue.choosing #next:after{display:none}
#dialogue.choosing #next:hover,#dialogue #dialogue-cancel:hover{background:linear-gradient(90deg,color-mix(in srgb,var(--dlg-accent) 34%,rgba(5,6,8,.9)),rgba(5,6,8,.5));color:#fff;border-color:var(--dlg-accent)}
#dialogue.choosing #next:active,#dialogue #dialogue-cancel:active{background:color-mix(in srgb,var(--dlg-accent) 45%,rgba(5,6,8,.9));color:#fff}
#dialogue.typing .dialogue-actions button#dialogue-cancel{visibility:hidden}
#dialogue-cancel[hidden]{display:none}
/* A choice step's answers, under its question: one per line, numbered, the one in focus lit like a hovered button. */
#dialogue.has-choices #next{display:none}
.dialogue-choices{display:grid;gap:8px;width:min(560px,100%);max-height:min(52vh,420px);margin:14px 0 0;padding:3px;overflow-y:auto;overscroll-behavior:contain;cursor:default}
/* Seven answers or more stand in two columns, so they fit under the question without scrolling. */
.dialogue-choices.is-many{grid-template-columns:repeat(2,minmax(0,1fr));width:min(820px,100%)}
@media (max-width:560px){.dialogue-choices.is-many{grid-template-columns:1fr}}
#dialogue .dlg-choice-skip{opacity:.86}
#dialogue .dlg-choice-skip .dlg-choice-key{width:auto;min-width:24px;padding:0 6px;border-radius:12px;font-size:10px}
#dialogue .dlg-choice{display:flex;align-items:center;gap:12px;width:100%;min-height:44px;margin:0;padding:9px 16px;text-align:left;font:15px/1.45 var(--dlg-font);letter-spacing:.05em;color:var(--dlg-text);border:1px solid var(--dlg-edge,color-mix(in srgb,var(--dlg-accent) 45%,transparent));border-radius:2px;background:linear-gradient(90deg,rgba(5,6,8,.84),rgba(5,6,8,.42));text-shadow:0 2px 5px #000;box-shadow:none;cursor:pointer;transition:background-color .2s,border-color .2s,transform .2s}
#dialogue .dlg-choice:is(:hover,:focus-visible){background:linear-gradient(90deg,color-mix(in srgb,var(--dlg-accent) 34%,rgba(5,6,8,.9)),rgba(5,6,8,.5));color:#fff;border-color:var(--dlg-accent)}
#dialogue .dlg-choice:focus-visible{outline:2px solid color-mix(in srgb,var(--dlg-accent) 70%,#fff);outline-offset:2px}
#dialogue .dlg-choice:active{background:color-mix(in srgb,var(--dlg-accent) 45%,rgba(5,6,8,.9));color:#fff;transform:translateY(1px)}
#dialogue .dlg-choice-key{display:grid;place-items:center;flex:none;width:24px;height:24px;border:1px solid color-mix(in srgb,var(--dlg-accent) 60%,transparent);border-radius:50%;font-size:12px;color:inherit}
#dialogue[data-presentation=bubble] .dialogue-choices{margin-top:10px}
#dialogue[data-presentation=bubble] .dlg-choice{min-height:38px;padding:6px 12px;font-size:14px}
@media(prefers-reduced-motion:reduce){#dialogue .dlg-choice{transition:none}#dialogue .dlg-choice:active{transform:none}}
body.talking>header,body.talking #quest-wrap,body.talking .rpg-waypoints,body.talking>footer{opacity:0;pointer-events:none}
body>header,#quest-wrap,.rpg-waypoints,body>footer{transition:opacity .3s ease}
body.talking #skills,body.talking #abilities{opacity:0;visibility:hidden;transition:opacity .3s ease,visibility 0s linear .3s}
#dialogue[data-presentation=bubble]{inset:auto;width:min(320px,88vw);pointer-events:auto;transform:translate(-50%,-100%)}
#dialogue[data-presentation=bubble].below{transform:translateX(-50%)}
#dialogue[data-presentation=bubble] .dlg-cast,#dialogue[data-presentation=bubble] #dialogue-backdrop{display:none}
#dialogue[data-presentation=bubble] .dlg-box{position:relative;inset:auto;width:auto;transform:none;min-height:0;padding:12px 16px;background:color-mix(in srgb,var(--dlg-solid) 88%,transparent);border:1px solid color-mix(in srgb,var(--dlg-accent) 55%,transparent);border-radius:14px;box-shadow:0 12px 30px #0006}
#dialogue[data-presentation=bubble] .dlg-box:after{content:'';position:absolute;left:clamp(12px,calc(50% - 7px + var(--tail,0px)),calc(100% - 26px));bottom:-8px;width:14px;height:14px;background:color-mix(in srgb,var(--dlg-solid) 88%,transparent);border-right:1px solid color-mix(in srgb,var(--dlg-accent) 55%,transparent);border-bottom:1px solid color-mix(in srgb,var(--dlg-accent) 55%,transparent);transform:rotate(45deg)}
#dialogue[data-presentation=bubble].below .dlg-box:after{top:-8px;bottom:auto;transform:rotate(225deg)}
#dialogue[data-presentation=bubble].adrift .dlg-box:after{display:none}
#dialogue[data-presentation=bubble] .dlg-nameplate{margin-bottom:6px;padding:2px 8px}
#dialogue[data-presentation=bubble] #speaker{font-size:14px}
#dialogue[data-presentation=bubble] #text{min-height:0;font-size:17px;line-height:1.65;max-height:30vh}
#dialogue[data-presentation=bubble] .dialogue-actions{position:static;margin-top:8px}
#dialogue[data-presentation=bubble] #next{font-size:13px;min-height:32px}
@keyframes dlg-fade{from{opacity:0}to{opacity:1}}
@keyframes dlg-enter{from{opacity:0;transform:translateX(2.5vw)}to{opacity:1;transform:none}}
@keyframes dlg-hop{0%,100%{translate:0 0}35%{translate:0 -1.6vh}65%{translate:0 .3vh}}
@keyframes dlg-shake{0%,100%{translate:0 0}20%{translate:-.7vw 0}40%{translate:.6vw 0}60%{translate:-.4vw 0}80%{translate:.2vw 0}}
@keyframes dlg-sink{to{translate:0 1.2vh}}
@keyframes dlg-jump{0%,100%{translate:0 0}30%{translate:0 -2.4vh}}
@keyframes dlg-nudge{0%,100%{translate:0 0}50%{translate:3px 0}}
@media(max-width:700px){#text{font-size:clamp(12px,var(--dlg-size),17px)}#speaker{font-size:clamp(11px,var(--dlg-name-size),15px)}.dlg-box{min-height:clamp(190px,34dvh,286px);padding:76px max(20px,env(safe-area-inset-right)) calc(74px + env(safe-area-inset-bottom)) max(20px,env(safe-area-inset-left))}#text{line-height:1.62;max-height:34vh;letter-spacing:.03em}#dialogue .dlg-cast img{height:68vh;bottom:-4vh;max-width:92vw}#dialogue .dlg-cast img.pixel-standee{height:min(30vh,calc(100% - var(--dlg-stand,30vh) - 16px));bottom:var(--dlg-stand,30vh)}#dialogue #portrait{right:-4vw}#dialogue #portrait-alt{left:-6vw}.dialogue-actions{right:16px;bottom:calc(14px + env(safe-area-inset-bottom))}#dialogue.choosing #next,#dialogue #dialogue-cancel{min-width:0;flex:1}}
@media(max-height:500px){#text{font-size:clamp(12px,var(--dlg-size),17px)}#speaker{font-size:clamp(11px,var(--dlg-name-size),14px)}.dlg-box{min-height:0;padding-top:52px;padding-bottom:18px}.dlg-nameplate{margin-bottom:6px;padding:3px 10px}#text{max-height:30vh;min-height:0;line-height:1.55;max-width:calc(100% - 170px)}#dialogue .dlg-cast img{height:108vh;bottom:-26vh}.dialogue-actions{bottom:14px}}
@media(prefers-reduced-motion:reduce){#dialogue *,main.dlg-shaking>canvas{animation:none!important;transition:none!important}}
/* The project's dialogue Skills (the runtime's setupSkin): the author's own box, in its frame, takes the bottom of the
   screen as tall as it asks; the game's box around it gives up its own look (the RPG UI skin's too, hence the ids and
   !important), and only the answers and the confirm buttons stay, over the Skills box. A bubble is still the game's. */
#dialogue .dlg-skin{display:none}
#dialogue.skin-box .dlg-skin{display:block;order:3;flex:none;width:100%;height:var(--skin-h,220px);margin:0;border:0;padding:0;background:transparent;color-scheme:normal;pointer-events:auto}
#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*){display:flex!important;flex-direction:column!important;align-items:flex-end!important;justify-content:flex-end!important;gap:10px!important;position:absolute!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:auto!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:0!important;transform:none!important;translate:none!important;rotate:none!important;scale:none!important;background:none!important;border:0!important;border-radius:0!important;outline:0!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;filter:none!important;clip-path:none!important;-webkit-mask:none!important;mask:none!important;opacity:1!important;overflow:visible!important;cursor:default!important;animation:dlg-fade .35s ease-out!important}
#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)::before,#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)::after{content:none!important;display:none!important}
#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)>:is(.dlg-nameplate,#text){display:none!important}
#dialogue.skin-box:not(.choosing) .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)>.dialogue-actions>:not(.dlg-mode){display:none!important}
#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)>:is(.dialogue-choices,.dialogue-actions){position:relative!important;inset:auto!important;transform:none!important;order:1;max-width:calc(100% - 32px);margin:0 max(16px,4vw) 0 16px!important}
#dialogue.skin-box .dlg-box:is(#larch-skin-box,*):is(#larch-skin-box,*):is(#larch-skin-box,*)>.dialogue-actions{order:2}
/* Over the map instead of over the game's dark box: the answers and the confirm buttons sit on a panel of the dialogue
   theme's own colour (the words on them are made for it), like a choice window. */
#dialogue.skin-box :is(.dialogue-choices,.dialogue-actions){padding:8px;border:1px solid var(--dlg-border);border-radius:max(4px,var(--dlg-radius));background:color-mix(in srgb,var(--dlg-solid) 94%,transparent);box-shadow:0 14px 34px #0007}
/* On a panel of their own colour the answers and buttons are told apart by their edges alone: drawn bright enough for 3:1. */
#dialogue.skin-box{--dlg-edge:color-mix(in srgb,var(--dlg-accent-solid) 70%,var(--dlg-text));--dlg-edge-light:color-mix(in srgb,var(--dlg-text) 62%,var(--dlg-solid))}

#dialogue.ui-light .dlg-nameplate,#dialogue.ui-light .dlg-nameplate #speaker{background:var(--dlg-text);color:var(--dlg-solid);border-color:transparent;box-shadow:none;text-shadow:none}
#dialogue.ui-light #text,#dialogue.ui-light #next{color:var(--dlg-text);text-shadow:none}
#dialogue.no-text-shadow :is(#speaker,#text,#next,#dialogue-cancel,.dlg-mode,.dlg-choice){text-shadow:none!important}
#dialogue.ui-light #next:hover,#dialogue.ui-light #next:active{background:color-mix(in srgb,var(--dlg-text) 12%,transparent);color:var(--dlg-text);border-color:color-mix(in srgb,var(--dlg-text) 45%,transparent)}
#dialogue.ui-light #next:focus-visible,#dialogue.ui-light #dialogue-cancel:focus-visible{outline-color:var(--dlg-text)}
#dialogue.ui-light.choosing #next,#dialogue.ui-light #dialogue-cancel{background:color-mix(in srgb,var(--dlg-text) 8%,transparent);color:var(--dlg-text);border-color:var(--dlg-edge-light,color-mix(in srgb,var(--dlg-text) 40%,transparent));text-shadow:none}
#dialogue.ui-light.choosing #next:is(:hover,:active),#dialogue.ui-light #dialogue-cancel:is(:hover,:active){background:var(--dlg-text);color:var(--dlg-solid);border-color:var(--dlg-text)}
#dialogue.ui-light .dlg-choice{background:color-mix(in srgb,var(--dlg-text) 8%,transparent);color:var(--dlg-text);border-color:var(--dlg-edge-light,color-mix(in srgb,var(--dlg-text) 40%,transparent));text-shadow:none}
#dialogue.ui-light .dlg-choice:is(:hover,:focus-visible,:active){background:var(--dlg-text);color:var(--dlg-solid);border-color:var(--dlg-text)}
#dialogue.ui-light .dlg-choice:focus-visible{outline-color:var(--dlg-text)}
/* 溫暖卡片（skin: cozy）：跟劇情對話框同一個樣子——奶油色圓角卡片、實心描邊、壓在上緣的名牌、網點角落、會跳的三角形。 */
#dialogue.ui-cozy.ui-panel .dlg-box{border:3px solid var(--dlg-border-solid);background:var(--dlg-panel);box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--dlg-solid) 45%,#fff),0 6px 0 color-mix(in srgb,var(--dlg-border-solid) 55%,transparent),0 22px 46px rgba(40,22,8,.34);backdrop-filter:none;padding-top:calc(var(--dlg-padding) + 6px)}
#dialogue.ui-cozy.ui-panel .dlg-box:before{position:absolute;right:8px;bottom:8px;width:min(42%,360px);height:78%;border-bottom-right-radius:max(0px,calc(var(--dlg-radius) - 8px));background:radial-gradient(circle,color-mix(in srgb,var(--dlg-accent-solid) 30%,transparent) 1.7px,transparent 2.2px) 0 0/11px 11px;-webkit-mask-image:radial-gradient(ellipse at 100% 100%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse at 100% 100%,#000 0%,transparent 72%);pointer-events:none;content:''}
#dialogue.ui-cozy.ui-panel .dlg-box>:is(#text,.dialogue-choices){position:relative}
#dialogue.ui-cozy.ui-panel .dlg-nameplate{position:absolute;top:-20px;left:clamp(18px,3vw,34px);max-width:calc(100% - 60px);margin:0;padding:5px 20px 6px;border:3px solid var(--dlg-border-solid);border-radius:999px;background:repeating-linear-gradient(135deg,rgba(255,255,255,.13) 0 6px,transparent 6px 12px),var(--dlg-accent-solid);box-shadow:0 3px 0 color-mix(in srgb,var(--dlg-border-solid) 55%,transparent)}
#dialogue.ui-cozy .dlg-nameplate #speaker{color:var(--dlg-solid);text-shadow:none;letter-spacing:.12em;font-weight:800}
#dialogue.ui-cozy[data-presentation=bubble] .dlg-box{border:2px solid var(--dlg-border-solid);background:var(--dlg-panel)}
#dialogue.ui-cozy[data-presentation=bubble] .dlg-box:after{background:var(--dlg-panel);border-color:var(--dlg-border-solid);border-width:0 2px 2px 0}
#dialogue.ui-cozy[data-presentation=bubble] .dlg-nameplate{padding:2px 12px;border:2px solid var(--dlg-border-solid);border-radius:999px;background:var(--dlg-accent-solid)}
#dialogue.ui-cozy #text{color:var(--dlg-text);text-shadow:none}
#dialogue.ui-cozy #next{color:color-mix(in srgb,var(--dlg-text) 80%,transparent);text-shadow:none;font-weight:700;border-radius:10px}
#dialogue.ui-cozy #next:after{width:0;height:0;margin-left:4px;border:0;border-top:10px solid var(--dlg-accent-solid);border-inline:8px solid transparent;transform:none;animation:dlg-cozy-bob 1.1s ease-in-out infinite}
#dialogue.ui-cozy #next:is(:hover,:active){background:color-mix(in srgb,var(--dlg-accent-solid) 14%,transparent);color:var(--dlg-text);border-color:color-mix(in srgb,var(--dlg-border-solid) 45%,transparent)}
#dialogue.ui-cozy.typing #next:after{animation:none}
#dialogue.ui-cozy.choosing #next,#dialogue.ui-cozy #dialogue-cancel,#dialogue.ui-cozy .dlg-choice{border:2px solid var(--dlg-border-solid);border-radius:14px;background:color-mix(in srgb,var(--dlg-solid) 70%,#fff);color:var(--dlg-text);text-shadow:none;box-shadow:0 3px 0 color-mix(in srgb,var(--dlg-border-solid) 35%,transparent)}
#dialogue.ui-cozy.choosing #next:is(:hover,:active),#dialogue.ui-cozy #dialogue-cancel:is(:hover,:active),#dialogue.ui-cozy .dlg-choice:is(:hover,:focus-visible,:active){background:var(--dlg-accent-solid);color:var(--dlg-solid);border-color:var(--dlg-border-solid)}
#dialogue.ui-cozy .dlg-choice-key{border-color:currentColor}
#dialogue.ui-cozy :is(#next,#dialogue-cancel,.dlg-choice):focus-visible{outline:3px solid var(--dlg-border-solid);outline-offset:2px}
@keyframes dlg-cozy-bob{0%,100%{translate:0 -2px}50%{translate:0 3px}}
@media(prefers-reduced-motion:reduce){#dialogue.ui-cozy #next:after{animation:none}}
`;function j(e){const s={},r=[];if(!e||typeof e!="object")return{vars:s,classes:r};const g=o=>typeof o=="string"&&/^#[0-9a-f]{3,8}$/i.test(o)?o:void 0,t=(o,l,d)=>typeof o=="number"&&Number.isFinite(o)?Math.max(l,Math.min(d,o)):void 0,u=o=>{const l=o.replace("#",""),d=l.length===3?l.split("").map(v=>v+v).join(""):l.slice(0,6);return parseInt(d,16)},p=(o,l)=>{const d=u(o);return`rgba(${d>>16},${d>>8&255},${d&255},${l})`},a=(o,l)=>{l&&(s[o]=l)},n=o=>o===void 0?void 0:o+"px",i=g(e.panelColor),c=t(e.panelOpacity,0,1)??.84,x=g(e.accentColor),b=g(e.borderColor);a("--dlg-solid",i),a("--dlg-panel",i&&p(i,c)),a("--dlg-text",g(e.textColor)),a("--dlg-speaker",g(e.speakerColor)),a("--dlg-accent",x&&p(x,t(e.accentOpacity,0,1)??1)),a("--dlg-border",b&&p(b,.55)),a("--dlg-border-solid",b),a("--dlg-accent-solid",x&&p(x,1)),a("--dlg-radius",n(t(e.borderRadius,0,60))),a("--dlg-padding",n(t(e.panelPadding,8,80))),a("--dlg-blur",n(t(e.backdropBlur,0,40)));const m=t(e.panelWidth,30,100);a("--dlg-width",m===void 0?void 0:m+"%");const f=t(e.panelOffset,0,20);a("--dlg-offset",f===void 0?void 0:f+"vh"),a("--dlg-size",n(t(e.fontSize,12,72))),a("--dlg-name-size",n(t(e.nameFontSize,10,72))),typeof e.font=="string"&&e.font.length<240&&!/[;{}<>]/.test(e.font)&&(s["--dlg-font"]=e.font),e.skin==="cozy"&&r.push("ui-cozy"),e.presentation==="panel"&&r.push("ui-panel"),e.textShadow===!1&&r.push("no-text-shadow");const h=(o,l)=>{const d=(u(o)>>16-l*8&255)/255;return d<=.04045?d/12.92:((d+.055)/1.055)**2.4};return i&&c>=.6&&.2126*h(i,0)+.7152*h(i,1)+.0722*h(i,2)>.45&&r.push("ui-light"),{vars:s,classes:r}}function S(e){const s=e.querySelector(".dlg-box");if(!s)return 0;const r=e.ownerDocument.defaultView||window,g=Number((r.getComputedStyle(s).backgroundColor.match(/[\d.]+/g)||[])[3]??1),t=e.querySelector(".dlg-nameplate"),u=e.querySelector("#text"),p=g>=.5?0:t?.offsetHeight?t.offsetTop:u?.offsetTop||0;return Math.max(0,Math.round(e.clientHeight-s.offsetTop-p))}export{j as a,S as b,C as r};
