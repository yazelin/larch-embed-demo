import{a as l,b as o}from"./casualUi-CCOxxTrT.js";import{h as I,L as C}from"./l3dHudLayout-BtFMssmh.js";const T=["hearts","level","fire","air","actions","coins","clock","quests","forms","help"];class Q{constructor(t){this.root=t}root;until=new Map;pins=new Map;els=new Map;on=new Map;cleaners=new Set;menus=new Set;held=!1;away=!1;quiet=new Set(["help"]);t=0;wasSummoned=!1;add(t,e){if(!e)return;e.classList.add("l3d-piece"),e.dataset.piece=t;const a=this.els.get(t)??[];a.push(e),this.els.set(t,a),e.classList.toggle("is-on",this.on.get(t)===!0)}ping(t,e=3.6){this.until.set(t,Math.max(this.until.get(t)??0,this.t+e))}pingAll(t=4){for(const e of T)e!=="help"&&this.ping(e,t)}pin(t,e,a){const r=this.pins.get(t)??new Set;a?r.add(e):r.delete(e),this.pins.set(t,r)}clean(t,e){e?this.cleaners.add(t):this.cleaners.delete(t),this.root.classList.toggle("is-clean",this.cleaners.size>0)}get isClean(){return this.cleaners.size>0}menu(t,e){e?this.menus.add(t):this.menus.delete(t)}hold(t){this.held=t}setAway(t){this.away=t}get isAway(){return this.away}keepQuiet(t){this.quiet.add(t)}get summoned(){return this.held||this.menus.size>0}shown(t){return this.on.get(t)===!0}update(t){this.t+=t;const e=this.summoned;e!==this.wasSummoned&&(this.wasSummoned=e,this.root.classList.toggle("is-summoned",e));for(const a of T){const r=e||!this.away&&!this.quiet.has(a)||(this.pins.get(a)?.size??0)>0||this.t<(this.until.get(a)??0);if(this.on.get(a)!==r){this.on.set(a,r);for(const i of this.els.get(a)??[])i.classList.toggle("is-on",r)}}}}const J=`
.l3d-quests{position:absolute;right:16px;top:58px;display:grid;gap:6px;width:min(250px,42vw);pointer-events:none}
@media (max-width:1279px){.l3d-quests{top:108px}}
.l3d-quest{display:grid;gap:2px;width:100%;margin:0;border:0;text-align:left;font:inherit;cursor:pointer;padding:7px 11px 8px;border-radius:14px;background:rgba(24,28,44,.55);color:#fff;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 4px 14px rgba(0,0,0,.18);transition:transform .2s cubic-bezier(.2,1.6,.4,1),opacity .2s,box-shadow .2s}
.l3d-quest b{display:flex;align-items:center;gap:6px;font-size:13px}
.l3d-quest b i{font-style:normal;font-size:10px;color:#ffd23f}
.l3d-quest b em{margin-left:auto;padding:1px 7px;border-radius:999px;background:#ffd23f;color:#3a2600;font:700 10.5px ${l};font-style:normal;letter-spacing:.04em;text-shadow:none;white-space:nowrap}
.l3d-quest span{font-size:12px;color:#e6e9f5}
.l3d-quest.is-ready span{color:#ffe27a}
.l3d-quest:not(.is-tracked){opacity:.8}
.l3d-quest:not(.is-tracked) b i{color:#e6e9f5}
.l3d-quest:hover{opacity:1}
.l3d-quest:active{transform:scale(.97)}
.l3d-quest:focus-visible{outline:2px solid #fff;outline-offset:2px}
.l3d-qmark{position:absolute;transform:translate(-50%,-100%);display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:linear-gradient(180deg,#ffe27a,#f5b30f);color:#5a3400;font:800 19px ${l};box-shadow:0 3px 0 #c98a08,0 6px 14px rgba(0,0,0,.25);animation:czBob 1s ease-in-out infinite;pointer-events:none}
.l3d-qmark.is-ready{background:linear-gradient(180deg,#9fe7ff,#3fb7ff);color:#0b3550;box-shadow:0 3px 0 #2783c2,0 6px 14px rgba(0,0,0,.25)}
.l3d-waypoint{position:absolute;transform:translate(-50%,-50%);display:grid;justify-items:center;gap:4px;pointer-events:none}
.l3d-waypoint i{width:22px;height:22px;transform:rotate(45deg);border-radius:4px;background:#ffd23f;box-shadow:0 0 0 2.5px rgba(255,255,255,.95),0 0 16px rgba(255,210,63,.85)}
.l3d-waypoint span{padding:2px 9px;border-radius:999px;background:rgba(24,28,44,.72);color:#fff;font:700 12.5px ${l}}
.l3d-waypoint u{position:absolute;left:50%;top:11px;width:0;height:0;margin-left:-11px;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:15px solid #ffd23f;filter:drop-shadow(0 0 2px rgba(24,28,44,.85));transform-origin:50% 0;transform:rotate(var(--a,0deg)) translateY(-40px);display:none}
.l3d-waypoint.is-edge u{display:block}
.l3d-waypoint.is-edge i{animation:l3dWaypointBob .8s ease-in-out infinite}
@keyframes l3dWaypointBob{50%{translate:0 -3px}}
@media (prefers-reduced-motion:reduce){.l3d-waypoint.is-edge i{animation:none}}
`,S="rgba(16,20,36,.42)",$="blur(16px) saturate(1.35) brightness(.76)",p=`ui-rounded, "SF Pro Rounded", ${l}`,k="#f7f8fc",Z=`
.l3d-ui{--glass:${S};--hud-gap:10px}
.l3d-piece{opacity:0;visibility:hidden;transform:translateY(-4px) scale(.985);pointer-events:none!important;
  transition:opacity .5s ease,transform .6s cubic-bezier(.2,1.2,.4,1),visibility 0s linear .5s}
.l3d-piece.is-on{opacity:1;visibility:visible;transform:none;pointer-events:auto!important;transition:opacity .28s ease,transform .5s cubic-bezier(.2,1.5,.4,1),visibility 0s}
.l3d-glass,.l3d-ui .l3d-level,.l3d-ui .l3d-fire,.l3d-ui .l3d-hearts,.l3d-ui .l3d-coins,.l3d-ui .l3d-clock,.l3d-ui .l3d-weapon,.l3d-ui .l3d-bag-btn,.l3d-ui .l3d-keys,.l3d-ui .l3d-prompt,.l3d-ui .l3d-tag,.l3d-ui .l3d-online-pill,.l3d-ui .l3d-team-row,.l3d-ui .l3d-summon,.l3d-ui .l3d-form-peek{
  background:${S};-webkit-backdrop-filter:${$};backdrop-filter:${$};color:#fff;
  box-shadow:inset 0 0 0 .5px rgba(255,255,255,.16),inset 0 1px 0 rgba(255,255,255,.08),0 8px 24px rgba(6,8,20,.16);text-shadow:0 1px 2px rgba(6,8,20,.3)}
.l3d-ui.tier-low .l3d-glass,.l3d-ui.tier-low .l3d-level,.l3d-ui.tier-low .l3d-fire,.l3d-ui.tier-low .l3d-hearts,.l3d-ui.tier-low .l3d-coins,.l3d-ui.tier-low .l3d-clock,.l3d-ui.tier-low .l3d-weapon,.l3d-ui.tier-low .l3d-bag-btn,.l3d-ui.tier-low .l3d-keys,.l3d-ui.tier-low .l3d-prompt,.l3d-ui.tier-low .l3d-tag,.l3d-ui.tier-low .l3d-team-row,.l3d-ui.tier-low .l3d-summon,.l3d-ui.tier-low .l3d-form-peek{
  -webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(18,22,38,.58)}
.l3d-ui .cz-num{color:#fff;font-family:${p};font-weight:600;letter-spacing:.01em}
/* Top left: hearts, the level, the things in hand. Each always comes back in its own place. */
.l3d-ui .l3d-hud{left:max(22px,env(safe-area-inset-left));top:max(18px,env(safe-area-inset-top));display:grid;grid-auto-rows:min-content;justify-items:start;gap:var(--hud-gap);max-width:min(52%,560px);flex-wrap:nowrap;pointer-events:none}
.l3d-ui .l3d-hearts{gap:2px;padding:6px 11px 6px 9px;border-radius:999px}
.l3d-ui .l3d-hearts i.on svg{filter:drop-shadow(0 1px 2px rgba(120,10,30,.35))}
.l3d-ui .l3d-hearts i:not(.on) svg path{fill:rgba(255,255,255,.14);stroke:rgba(255,255,255,.62)}
.l3d-ui .l3d-hearts.is-low i.on:last-of-type{animation:l3dBeat 1s ease-in-out infinite}
@keyframes l3dBeat{0%,100%{transform:scale(1)}15%{transform:scale(1.22)}30%{transform:scale(.96)}45%{transform:scale(1.1)}}
.l3d-ui .l3d-level{gap:9px;padding:5px 14px 5px 6px;border-radius:999px}
.l3d-ui .l3d-level .lv{gap:3px;font:500 15px ${p};color:#fff}
.l3d-ui .l3d-level .lv b{font:500 11px ${p};color:${k};letter-spacing:.04em}
.l3d-ui .l3d-level .cz-track{width:78px;height:4px;background:rgba(255,255,255,.2);box-shadow:none}
.l3d-ui .l3d-level .cz-fill{background:linear-gradient(90deg,#8ff5c8,#3fe0a0);box-shadow:0 0 8px rgba(110,250,190,.65)}
.l3d-ui .l3d-level .cz-fill::after{display:none}
.l3d-ui .l3d-level small{font:500 11.5px ${p};color:${k};letter-spacing:.03em}
.l3d-ui .l3d-color-btn{width:28px;height:28px;margin:-2px 0;border-radius:50%}
.l3d-ui .l3d-color-btn:focus-visible,.l3d-ui .l3d-summon:focus-visible,.l3d-ui .l3d-form-peek:focus-visible{outline:2px solid #fff;outline-offset:2px}
/* Riding the wyvern: the fire in its belly. Burning, the bar flickers; run dry, it dims to embers and says it's coming
   back, the mark showing where it can breathe again; it shakes as the flame runs out. */
.l3d-ui .l3d-fire{display:flex;align-items:center;gap:8px;padding:5px 12px 5px 7px;border-radius:999px;font:600 12px ${p};color:#fff}
.l3d-ui .l3d-fire[hidden]{display:none}
.l3d-ui .l3d-fire .ico{display:grid;transition:filter .3s}
.l3d-ui .l3d-fire .ico svg{filter:drop-shadow(0 0 4px rgba(255,140,50,.7))}
.l3d-ui .l3d-fire .lbl{min-width:3em;font-weight:600;letter-spacing:.04em}
.l3d-ui .l3d-fire .track{position:relative;width:112px;height:7px;border-radius:999px;background:rgba(255,255,255,.18);box-shadow:inset 0 0 0 .5px rgba(255,255,255,.3)}
.l3d-ui .l3d-fire .fill{position:absolute;left:0;top:0;bottom:0;width:calc(var(--fire,1) * 100%);border-radius:inherit;background:linear-gradient(90deg,#ff6a2c,#ffad3a 55%,#ffe27a);box-shadow:0 0 9px rgba(255,150,60,.8)}
.l3d-ui .l3d-fire .mark{position:absolute;left:var(--relight,30%);top:-3px;bottom:-3px;width:2px;margin-left:-1px;border-radius:1px;background:rgba(255,255,255,.55);opacity:.5;transition:opacity .3s}
.l3d-ui .l3d-fire.is-burning .fill{animation:l3dFireFlicker .16s steps(2,jump-none) infinite}
.l3d-ui .l3d-fire.is-burning .ico{animation:l3dFireBeat .32s ease-in-out infinite alternate}
@keyframes l3dFireFlicker{to{filter:brightness(1.25) saturate(1.15)}}
@keyframes l3dFireBeat{to{transform:scale(1.14) translateY(-1px)}}
.l3d-ui .l3d-fire.is-dry .fill{background:linear-gradient(90deg,#d77a68,#f2a48f);box-shadow:none}
.l3d-ui .l3d-fire.is-dry .ico{filter:grayscale(.85) brightness(1.15)}
.l3d-ui .l3d-fire.is-dry .ico svg{filter:none}
.l3d-ui .l3d-fire.is-dry .mark{opacity:1;background:#fff}
.l3d-ui .l3d-fire.is-out{animation:l3dFireOut .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes l3dFireOut{20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}
.l3d-ui .l3d-fire .cz-key{background:#fff;color:${o.ink};box-shadow:none;font:600 10.5px ${p};min-width:18px;height:18px;border-radius:6px;text-shadow:none}
.l3d-hud-actions{display:flex;gap:8px;align-items:center}
.l3d-ui .l3d-weapon,.l3d-ui .l3d-bag-btn{padding:5px 12px 5px 8px;font:500 12.5px ${p};color:#fff;transition:transform .25s cubic-bezier(.2,1.6,.4,1),background .2s}
.l3d-ui .l3d-weapon:hover,.l3d-ui .l3d-bag-btn:hover{background:rgba(18,22,38,.55)}
.l3d-ui .l3d-weapon:focus-visible,.l3d-ui .l3d-bag-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.l3d-ui .l3d-weapon .cz-key,.l3d-ui .l3d-bag-btn .cz-key,.l3d-ui .l3d-prompt .cz-key,.l3d-ui .l3d-keys .cz-key{background:#fff;color:${o.ink};box-shadow:none;font:600 10.5px ${p};min-width:18px;height:18px;border-radius:6px;text-shadow:none}
.l3d-ui .l3d-hud .l3d-test-btn{outline:1.5px dashed rgba(255,255,255,.75);outline-offset:-3px}
.l3d-ui .l3d-hud .l3d-cloud-btn[aria-pressed="true"]{background:rgba(120,90,20,.55);box-shadow:inset 0 0 0 1px rgba(255,214,110,.85),0 0 18px rgba(255,200,80,.35)}
.l3d-ui .l3d-bag-btn .dot{box-shadow:0 0 0 2px rgba(18,22,38,.4)}
/* Top right: coins and the clock, then the quests. */
.l3d-hud-r{position:absolute;right:max(22px,env(safe-area-inset-right));top:max(18px,env(safe-area-inset-top));display:grid;justify-items:end;gap:var(--hud-gap);pointer-events:none}
/* Wider screens: beside the corner buttons (the HUD's own, and photo mode's on a touch screen), not under them. */
@media (min-width:641px){.l3d-ui:has(>.l3d-summon) .l3d-hud-r{right:calc(max(12px,env(safe-area-inset-right)) + 48px);top:calc(max(10px,env(safe-area-inset-top)) + 3px)}.l3d-ui:has(>.l3d-photo-btn-hud) .l3d-hud-r{right:calc(max(12px,env(safe-area-inset-right)) + 92px)}}
/* In a player's frame its close button (and the buttons beside it) hold the top-right corner: a row lower. */
.l3d-ui.is-framed .l3d-summon{top:calc(max(10px,env(safe-area-inset-top)) + 50px)}
@media (min-width:641px){.l3d-ui.is-framed:has(>.l3d-summon) .l3d-hud-r{top:calc(max(10px,env(safe-area-inset-top)) + 53px)}}
.l3d-ui .l3d-coins{gap:6px;padding:5px 13px 5px 8px;border-radius:999px;font:500 13.5px ${p}}
.l3d-ui .l3d-clock{gap:6px;padding:5px 13px 5px 9px;border-radius:999px;font:500 12px ${p};color:#fff}
.l3d-ui .l3d-clock b{font:600 13.5px ${p}}
.l3d-ui .l3d-clock small{color:${k};font:500 11.5px ${p};letter-spacing:.06em}
.l3d-ui .l3d-quests{right:max(22px,env(safe-area-inset-right));top:calc(max(18px,env(safe-area-inset-top)) + 92px);gap:8px;width:min(260px,40vw)}
/* A desktop player's frame: the right-hand column sits a row lower for its close button, the quests go under it —
   20px below 設定 (+94, 36 tall), or below 背包 (+138) when it shows. */
@media (min-width:641px){
  .l3d-ui.is-framed:not(.is-touch) .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 150px)}
  .l3d-ui.is-framed:not(.is-touch):has(>.l3d-story-bag-btn:not([hidden])) .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 194px)}
  /* Not in a frame, 背包 (+88, 36 tall) under 設定: the quests 20px below it, not over it (the cards can be clicked). */
  .l3d-ui:not(.is-framed):not(.is-touch):has(>.l3d-story-bag-btn:not([hidden])) .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 144px)}
}
/* A tablet in a player's frame: under the coins and the clock (a row lower for the close button), as on a desktop. */
@media (min-width:641px) and (min-height:561px){
  .l3d-ui.is-framed.is-touch .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 150px)}
  .l3d-ui.is-framed.is-touch:has(>.l3d-story-bag-btn:not([hidden])) .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 194px)}
}
.l3d-ui .l3d-quest{padding:9px 13px 10px;border-radius:16px;background:${S};-webkit-backdrop-filter:${$};backdrop-filter:${$};box-shadow:inset 0 0 0 .5px rgba(255,255,255,.16),0 8px 24px rgba(6,8,20,.16)}
.l3d-ui .l3d-quest b{font:600 13px ${p};color:#fff}
.l3d-ui .l3d-quest span{font:500 12px ${p};color:${k}}
.l3d-ui .l3d-quest.is-ready span{color:#ffe7a0}
/* The tracked quest: a gold edge on its left (and 追蹤中 where there's room). */
.l3d-ui .l3d-quest.is-tracked{box-shadow:inset 3px 0 0 #ffd23f,inset 0 0 0 .5px rgba(255,255,255,.22),0 8px 24px rgba(6,8,20,.2)}
.l3d-ui .l3d-quest:hover{background:rgba(16,20,36,.58)}
/* Bottom left: the controls, when asked for (H) and for the first moments. */
.l3d-ui .l3d-keys{left:max(22px,env(safe-area-inset-left));right:auto;top:auto;bottom:max(20px,env(safe-area-inset-bottom));max-width:min(560px,calc(100% - 44px));flex-wrap:wrap;gap:6px 14px;padding:8px 14px;border-radius:16px;font:500 12px ${p};color:${k}}
.l3d-ui .l3d-keys span{gap:6px}
.l3d-ui .l3d-keys .l3d-keys-help{display:none!important}
.l3d-ui .l3d-keys.is-folded span{display:flex}
/* A scene's own 按鍵說明書 (keyGuide.ts): a card of key and what it does, up until its cross is pressed. */
.l3d-ui .l3d-keys.is-guide{display:grid;gap:9px;width:min(320px,calc(100% - 44px));padding:11px 12px 12px 14px;border-radius:18px;font:500 13px ${p};color:#fff}
.l3d-ui .l3d-keys.is-guide header{display:flex;align-items:center;gap:8px}
.l3d-ui .l3d-keys.is-guide header b{flex:1;font:600 14px ${p};letter-spacing:.02em}
.l3d-ui .l3d-keys-close{display:grid;place-items:center;flex:none;width:28px;height:28px;margin:0;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;transition:background .15s}
.l3d-ui .l3d-keys-close:hover{background:rgba(255,255,255,.3)}
.l3d-ui .l3d-keys-close:active{transform:scale(.92)}
.l3d-ui .l3d-keys-close:focus-visible{outline:2px solid #fff;outline-offset:2px}
.l3d-ui .l3d-keys.is-guide .l3d-keys-rows{display:grid;grid-template-columns:auto minmax(0,1fr);gap:7px 10px;align-items:center}
.l3d-ui .l3d-keys.is-guide .l3d-keys-rows span{display:contents}
.l3d-ui .l3d-keys.is-guide .l3d-keys-rows .cz-key{justify-self:start;min-width:22px;height:22px;padding:0 7px;font-size:11.5px;white-space:nowrap}
.l3d-ui .l3d-keys.is-guide small{font:500 11.5px ${p};line-height:1.45;color:${k}}
/* The forms dock (bottom centre): a quiet glass shelf. */
.l3d-ui .l3d-forms{left:0;right:0;margin:0 auto;width:max-content;transform:none;cursor:grab;user-select:none}
.l3d-ui .l3d-forms.is-dragging{cursor:grabbing}
.l3d-ui .l3d-forms.l3d-piece{transform:translateY(6px) scale(.985)}
.l3d-ui .l3d-forms.l3d-piece.is-on{transform:none}
.l3d-ui .l3d-forms{background:${S};-webkit-backdrop-filter:${$};backdrop-filter:${$};box-shadow:inset 0 0 0 .5px rgba(255,255,255,.16),0 10px 30px rgba(6,8,20,.2);border-radius:20px;gap:8px;padding:8px 8px 14px;animation:none}
.l3d-ui .l3d-form{width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,.14);box-shadow:none}
.l3d-ui .l3d-form canvas,.l3d-ui .l3d-form img{width:40px;height:40px;border-radius:11px}
.l3d-ui .l3d-form:hover{transform:translateY(-3px);background:rgba(255,255,255,.24)}
.l3d-ui .l3d-form[aria-pressed=true]{background:rgba(255,255,255,.92);box-shadow:0 0 0 2px #fff,0 6px 18px rgba(255,255,255,.25);transform:translateY(-2px)}
.l3d-ui .l3d-form span{background:rgba(18,22,38,.72);font:500 10px ${p};bottom:-9px}
.l3d-ui .l3d-form:focus-visible{outline:2px solid #fff;outline-offset:2px}
/* Prompts by the thing nearest: small and soft. */
.l3d-ui .l3d-prompt{gap:6px;padding:4px 11px 4px 5px;font:500 12.5px ${p};border-radius:999px;animation:l3dPromptIn .35s cubic-bezier(.2,1.4,.4,1)}
.l3d-ui .l3d-prompt svg{width:16px;height:16px}
.l3d-ui .l3d-eat.is-locked span{color:${k}}
@keyframes l3dPromptIn{from{opacity:0;transform:translate(-50%,-80%) scale(.92)}to{opacity:1;transform:translate(-50%,-100%)}}
.l3d-ui .l3d-tag{padding:2px 10px;font:500 11.5px ${p};color:#fff;border-radius:999px}
/* Toasts: a quiet line of light across the top, no card. */
.l3d-ui .l3d-toast{top:12%;gap:10px;padding:8px 18px 8px 10px;border-radius:999px;background:radial-gradient(120% 160% at 50% 50%,rgba(14,18,32,.5),rgba(14,18,32,.34) 60%,rgba(14,18,32,0) 100%);box-shadow:none;-webkit-backdrop-filter:blur(10px) brightness(.9);backdrop-filter:blur(10px) brightness(.9);animation:l3dToastIn .5s cubic-bezier(.2,1.3,.4,1)}
.l3d-ui .l3d-toast .ico{width:30px;height:30px;border-radius:10px;background:rgba(255,255,255,.14)}
.l3d-ui .l3d-toast .ico svg{width:20px;height:20px}
.l3d-ui .l3d-toast b{font:600 15px ${p};color:#fff;text-shadow:0 1px 3px rgba(6,8,20,.45)}
.l3d-ui .l3d-toast small{font:500 12px ${p};color:${k};margin-top:2px;text-shadow:0 1px 2px rgba(6,8,20,.45)}
.l3d-ui .l3d-toast.is-leaving{opacity:0;transform:translate(-50%,-6px);transition:opacity .45s ease,transform .5s ease}
@keyframes l3dToastIn{from{opacity:0;transform:translate(-50%,8px) scale(.97)}to{opacity:1;transform:translate(-50%,0)}}
/* The marks over people: a little smaller. */
.l3d-ui .l3d-qmark{width:26px;height:26px;font-size:16px;box-shadow:0 2px 0 #c98a08,0 6px 14px rgba(0,0,0,.22)}
/* The corner button (phones) that brings the whole HUD up. */
.l3d-summon{position:absolute;right:max(12px,env(safe-area-inset-right));top:max(10px,env(safe-area-inset-top));width:36px;height:36px;border:0;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer;pointer-events:auto;transition:transform .25s cubic-bezier(.2,1.6,.4,1),background .2s}
.l3d-summon.l3d-photo-btn-hud{right:calc(max(12px,env(safe-area-inset-right)) + 44px)}
.l3d-summon[aria-pressed=true]{background:rgba(255,255,255,.9);color:${o.ink}}
.l3d-summon[aria-pressed=true] svg{stroke:${o.ink}}
.l3d-summon:active{transform:scale(.92)}
/* Phones: the shapes shelf folds into one button until it's wanted. */
.l3d-form-peek{position:absolute;left:max(12px,env(safe-area-inset-left));bottom:calc(max(22px,env(safe-area-inset-bottom)) + 142px);width:46px;height:46px;border:0;border-radius:16px;display:grid;place-items:center;padding:0;cursor:pointer;pointer-events:auto}
.l3d-form-peek img,.l3d-form-peek canvas{width:36px;height:36px;border-radius:11px}
.l3d-form-peek[hidden]{display:none}
.l3d-ui.is-forms-open .l3d-form-peek{opacity:0;pointer-events:none}
/* A clear screen (photo mode, cut-scenes): everything but what that mode brings with it. */
.l3d-ui.is-clean>:not(.l3d-keep){opacity:0!important;visibility:hidden!important;pointer-events:none!important;transition:opacity .45s ease,visibility 0s linear .45s!important}
@media (max-width:640px){
  .l3d-ui{--hud-gap:8px}
  .l3d-ui .l3d-hud{left:max(12px,env(safe-area-inset-left));top:max(10px,env(safe-area-inset-top));right:auto;max-width:calc(100% - 70px)}
  .l3d-hud-r{right:max(12px,env(safe-area-inset-right));top:calc(max(10px,env(safe-area-inset-top)) + 46px)}
  /* Below the HUD's rows (so a toast never lands on the hearts or the coins), the quests below the toast. */
  .l3d-ui .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 196px);right:max(12px,env(safe-area-inset-right))}
  /* Narrow cards: the gold edge says which is tracked, the name keeps its line. */
  .l3d-ui .l3d-quest b em{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .l3d-ui .l3d-toast{top:calc(max(10px,env(safe-area-inset-top)) + 122px);max-width:calc(100% - 24px);white-space:normal}
  /* Above its button, clear of the action buttons on the right (it scrolls sideways when there are many shapes). */
  .l3d-ui .l3d-forms{left:max(12px,env(safe-area-inset-left));right:auto;margin:0;bottom:calc(max(18px,env(safe-area-inset-bottom)) + 56px);max-width:calc(100% - 212px)}
  .l3d-ui.is-framed .l3d-hud-r{top:calc(max(10px,env(safe-area-inset-top)) + 96px)}
  .l3d-ui.is-framed .l3d-toast{top:calc(max(10px,env(safe-area-inset-top)) + 172px)}
  .l3d-ui.is-framed .l3d-quests{top:calc(max(10px,env(safe-area-inset-top)) + 246px)}
}
@media (prefers-reduced-motion:reduce){
  .l3d-piece,.l3d-piece.is-on{transform:none!important;transition:opacity .25s ease,visibility 0s linear .25s}
  .l3d-piece.is-on{transition:opacity .2s ease,visibility 0s}
  .l3d-ui .l3d-toast,.l3d-ui .l3d-prompt{animation:none}
  .l3d-ui .l3d-hearts.is-low i.on:last-of-type{animation:none}
  .l3d-ui .l3d-fire.is-burning .fill,.l3d-ui .l3d-fire.is-burning .ico,.l3d-ui .l3d-fire.is-out{animation:none}
}
`,x=o.ink,z="#8a90ab",v="#555b74",A="#767c96",L=`background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(20px) saturate(1.2);backdrop-filter:blur(20px) saturate(1.2);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.8),0 22px 54px rgba(18,22,44,.24),0 2px 8px rgba(18,22,44,.08);color:${x}`,tt=`
.l3d-ui .l3d-picker,.l3d-ui .l3d-dialogue,.l3d-ui .l3d-bag,.l3d-ui .l3d-chatbar{${L};border-radius:22px!important}
.l3d-ui.tier-low .l3d-picker,.l3d-ui.tier-low .l3d-dialogue,.l3d-ui.tier-low .l3d-bag,.l3d-ui.tier-low .l3d-chatbar{-webkit-backdrop-filter:none;backdrop-filter:none;background:#fff}
@keyframes l3dCardUp{from{opacity:0;transform:translate(-50%,16px) scale(.98)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes l3dCardFade{from{opacity:0}to{opacity:1}}
.l3d-ui .l3d-picker,.l3d-ui .l3d-dialogue,.l3d-ui .l3d-chatbar{animation:l3dCardUp .5s cubic-bezier(.2,1.2,.4,1) both}
.l3d-ui .l3d-bag{animation:l3dCardUp .45s cubic-bezier(.2,1.2,.4,1) both}
/* Pick your slime. */
.l3d-ui .l3d-picker{padding:22px 24px 24px}
.l3d-ui .l3d-picker h2{margin:0 0 16px;font:600 17px ${p};letter-spacing:.06em;color:${x}}
.l3d-ui .l3d-swatches{gap:6px;margin-bottom:18px}
.l3d-ui .l3d-swatch{padding:10px 2px 8px;border-radius:16px;background:transparent;color:${v};font:500 12px ${p};transition:transform .3s cubic-bezier(.2,1.5,.4,1),background .2s,box-shadow .2s,color .2s}
.l3d-ui .l3d-swatch:hover{background:rgba(43,48,73,.05);transform:translateY(-2px)}
.l3d-ui .l3d-swatch[aria-checked=true]{background:#fff;color:${x};font-weight:600;box-shadow:0 0 0 2px ${x},0 10px 24px rgba(18,22,44,.16);transform:translateY(-3px)}
.l3d-ui .l3d-swatch:focus-visible{outline:2px solid ${x};outline-offset:3px}
/* The main button: an ink pill. */
.l3d-ui .l3d-pick-go,.l3d-ui .l3d-choices .cz-btn.blue,.l3d-ui .l3d-chatbar .cz-btn{background:${x};color:#fff;border-radius:999px;text-shadow:none;
  box-shadow:0 10px 24px rgba(18,22,44,.24);font:600 15px ${p};letter-spacing:.04em;filter:none;transition:transform .25s cubic-bezier(.2,1.6,.4,1),background .2s,box-shadow .2s}
.l3d-ui .l3d-pick-go{padding:12px 36px}
.l3d-ui .l3d-pick-go:hover,.l3d-ui .l3d-choices .cz-btn.blue:hover,.l3d-ui .l3d-chatbar .cz-btn:hover{background:#3a4262;transform:translateY(-1px);filter:none}
.l3d-ui .l3d-pick-go:active,.l3d-ui .l3d-choices .cz-btn:active{transform:scale(.97);box-shadow:0 4px 12px rgba(18,22,44,.2)}
.l3d-ui .l3d-pick-go:focus-visible,.l3d-ui .l3d-choices .cz-btn:focus-visible,.l3d-ui .l3d-chatbar .cz-btn:focus-visible{outline:2px solid ${x};outline-offset:3px}
/* Dialogue: the speaker in an ink tag, the line in calm type, an ink arrow for "more". */
.l3d-ui .l3d-dialogue{padding:24px 28px 22px}
.l3d-ui .l3d-dialogue .cz-tag{top:-14px;padding:5px 14px;background:${x};color:#fff;box-shadow:0 8px 18px rgba(18,22,44,.22);font:600 13px ${p};letter-spacing:.08em}
.l3d-ui .l3d-dialogue p{font:500 17px/1.75 ${p};color:${x};letter-spacing:.02em}
.l3d-ui .l3d-dialogue .l3d-next{border-top-color:${x};opacity:.8}
.l3d-ui .l3d-choices{gap:10px;margin-top:16px}
.l3d-ui .l3d-choices .cz-btn{padding:11px 22px;border-radius:999px;font:600 15px ${p};text-shadow:none}
.l3d-ui .l3d-choices .cz-btn.white{background:#fff;color:${x};box-shadow:inset 0 0 0 1px ${z};filter:none}
.l3d-ui .l3d-choices .cz-btn.white:hover{background:#f4f5f9;transform:translateY(-1px)}
/* The bag: white card, ink tabs, thin edges. */
.l3d-ui .l3d-bag{padding:18px 20px 20px}
@media (max-width:520px){.l3d-ui .l3d-bag{padding:12px}}
.l3d-ui .l3d-bag-head [role=tablist]{background:transparent;box-shadow:inset 0 0 0 1px #d9dce6;padding:4px}
.l3d-ui .l3d-bag-head [role=tab]{font:600 13.5px ${p};color:${v};transition:background .2s,color .2s}
.l3d-ui .l3d-bag-head [role=tab][aria-selected=true]{background:${x};color:#fff;box-shadow:none}
.l3d-ui .l3d-bag-head [role=tab] i{background:#e8404e}
.l3d-ui .l3d-bag-coins{font:600 14px ${p}}
.l3d-ui .l3d-bag-coins .cz-num{color:${x}}
.l3d-ui .l3d-bag-close{background:#fff;color:${x};box-shadow:inset 0 0 0 1px ${z}}
.l3d-ui .l3d-bag-close:hover{background:#f4f5f9}
.l3d-ui .l3d-bag-head [role=tab]:focus-visible,.l3d-ui .l3d-bag-close:focus-visible,.l3d-ui .l3d-gear:focus-visible{outline:2px solid ${x};outline-offset:2px}
.l3d-ui .l3d-slot{background:#fff;box-shadow:inset 0 0 0 1px #e1e4ec;border-radius:18px}
.l3d-ui .l3d-slot h3{font:600 12.5px ${p};color:${v};letter-spacing:.12em}
.l3d-ui .l3d-gear{border-color:${z};border-radius:14px;font-family:${p};transition:transform .25s cubic-bezier(.2,1.6,.4,1),box-shadow .2s}
.l3d-ui .l3d-gear b{font-weight:600}
.l3d-ui .l3d-gear small{color:${v}}
.l3d-ui .l3d-gear em{background:#fff;color:${x};box-shadow:inset 0 0 0 1px ${z};font-weight:600}
.l3d-ui .l3d-gear.is-on{border-color:${x};background:#fff;box-shadow:inset 0 0 0 1px ${x}}
.l3d-ui .l3d-gear.is-on em{background:${x};color:#fff;box-shadow:none}
.l3d-ui .l3d-empty{color:${v};font-family:${p}}
/* The skill tree keeps its night sky, on a board inside the card. */
.l3d-ui .l3d-tree-info,.l3d-ui .l3d-tree-points{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-radius:16px}
.l3d-ui .l3d-tree-info b,.l3d-ui .l3d-tree-info span,.l3d-ui .l3d-tree-points{font-family:${p}}
/* The chat line (shared worlds). */
.l3d-ui .l3d-chatbar input{background:#fff;box-shadow:inset 0 0 0 1px ${z};font-family:${p}}
.l3d-ui .l3d-chatbar input:focus-visible{box-shadow:inset 0 0 0 2px ${x}}
/* 房間代碼 (組隊模式): a small card under who is here — make a code or type a friend's; with one, the code big, copy, back
   to the public rooms. Top of the screen only: clear of the stick and the buttons (on a short screen it scrolls). */
.l3d-ui .l3d-code{position:absolute;left:0;right:0;top:calc(max(14px,env(safe-area-inset-top)) + 46px);margin:0 auto;width:min(320px,calc(100% - 28px));box-sizing:border-box;display:grid;gap:10px;padding:14px 16px 16px;${L};border-radius:20px!important;font:500 13px/1.55 ${p};pointer-events:auto;z-index:1;animation:l3dCodeIn .35s cubic-bezier(.2,1.2,.4,1) both}
.l3d-ui.tier-low .l3d-code{-webkit-backdrop-filter:none;backdrop-filter:none;background:#fff}
@keyframes l3dCodeIn{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:none}}
@media (max-width:640px){.l3d-ui .l3d-code{left:max(12px,env(safe-area-inset-left));right:auto;margin:0;width:min(320px,calc(100% - 24px))}}
@media (max-height:500px){.l3d-ui .l3d-code{max-height:calc(100% - 210px);overflow:auto}}
.l3d-ui .l3d-code-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.l3d-ui .l3d-code-head b{font:600 15px ${p};color:${x};letter-spacing:.04em}
.l3d-ui .l3d-code-x{width:30px;height:30px;display:grid;place-items:center;border:0;border-radius:50%;background:#fff;color:${x};box-shadow:inset 0 0 0 1px ${A};cursor:pointer;transition:background .2s}
.l3d-ui .l3d-code-x:hover{background:#f4f5f9}
.l3d-ui .l3d-code-hint,.l3d-ui .l3d-code-or{margin:0;color:${v};font-size:12.5px}
.l3d-ui .l3d-code-or{text-align:center}
.l3d-ui .l3d-code-err{margin:0;color:#c42b36;font-weight:600;font-size:12.5px}
.l3d-ui .l3d-code-err:empty{display:none}
.l3d-ui .l3d-code .cz-btn{min-height:40px;padding:0 18px;border-radius:999px;background:${x};color:#fff;text-shadow:none;box-shadow:0 8px 20px rgba(18,22,44,.2);font:600 14px ${p};letter-spacing:.04em;filter:none;transition:transform .25s cubic-bezier(.2,1.6,.4,1),background .2s,box-shadow .2s}
.l3d-ui .l3d-code .cz-btn:hover{background:#3a4262;transform:translateY(-1px);filter:none}
.l3d-ui .l3d-code .cz-btn:active{transform:scale(.97);box-shadow:0 3px 10px rgba(18,22,44,.18)}
.l3d-ui .l3d-code .cz-btn.white{background:#fff;color:${x};box-shadow:inset 0 0 0 1px ${A}}
.l3d-ui .l3d-code .cz-btn.white:hover{background:#f4f5f9}
.l3d-ui .l3d-code .cz-btn:disabled{cursor:default;transform:none;opacity:.6}
.l3d-ui .l3d-code .cz-btn:focus-visible,.l3d-ui .l3d-code-x:focus-visible{outline:2px solid ${x};outline-offset:3px}
.l3d-ui .l3d-code-join{display:flex;gap:8px}
.l3d-ui .l3d-code-join input{flex:1;min-width:0;height:40px;box-sizing:border-box;border:0;border-radius:999px;padding:0 12px;background:#fff;box-shadow:inset 0 0 0 1px ${A};color:${x};font:700 16px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.2em;text-align:center;text-transform:uppercase;outline:none}
.l3d-ui .l3d-code-join input::placeholder{color:${v};opacity:1;letter-spacing:.2em}
.l3d-ui .l3d-code-join input:focus-visible{box-shadow:inset 0 0 0 2px ${x}}
.l3d-ui .l3d-code-show{display:flex;align-items:center;justify-content:center;gap:10px}
.l3d-ui .l3d-code-show b{padding:4px 14px;border-radius:14px;background:#eef0f8;box-shadow:inset 0 0 0 1px #d6dae8;color:${x};font:800 26px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.24em;text-indent:.24em}
.l3d-ui .l3d-code-acts{display:grid;gap:8px}
@media (prefers-reduced-motion:reduce){.l3d-ui .l3d-code{animation:l3dCardFade .2s ease both}}
/* A place's name: the opening's serif, white with a soft dark glow. */
.l3d-ui .l3d-region b{font:600 34px "Noto Serif TC","Songti TC","Source Han Serif TC",serif;letter-spacing:.24em;text-indent:.24em;text-shadow:0 0 24px rgba(22,16,44,.5),0 2px 10px rgba(22,16,44,.4)}
.l3d-ui .l3d-region small{font:500 14px "Noto Serif TC","Songti TC",serif;letter-spacing:.3em;text-indent:.3em;color:#fff;text-shadow:0 0 14px rgba(22,16,44,.7),0 1px 3px rgba(22,16,44,.5)}
@media (max-width:640px){.l3d-ui .l3d-region b{font-size:28px}}
@media (prefers-reduced-motion:reduce){
  .l3d-ui .l3d-picker,.l3d-ui .l3d-dialogue,.l3d-ui .l3d-chatbar,.l3d-ui .l3d-bag{animation:l3dCardFade .2s ease both}
}
`;function et(){if(typeof document>"u"||document.getElementById("l3d-intro-font"))return;const s=document.createElement("link");s.id="l3d-intro-font",s.rel="stylesheet",s.href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;600&display=swap",document.head.append(s)}const at='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.8l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.8v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',it='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 10h8"/><path d="M8 18h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',ot='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',rt='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.4 0 10 8 10 8a17.5 17.5 0 0 1-2.2 3.2M6.6 6.6C3.9 8.4 2 12 2 12s3.6 8 10 8a9.7 9.7 0 0 0 5.4-1.6"/><path d="m2 2 20 20"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',st='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.4"/></svg>',nt='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',m="#555b74",dt=`
.l3d-ui{position:absolute;inset:0;pointer-events:none;-webkit-user-select:none;user-select:none}
.l3d-ui *{box-sizing:border-box}
.l3d-hud{position:absolute;left:max(16px,env(safe-area-inset-left));top:max(14px,env(safe-area-inset-top));display:flex;flex-wrap:wrap;gap:10px;align-items:center;max-width:calc(50% - 120px);pointer-events:auto}
.l3d-level{display:flex;align-items:center;gap:8px;padding:5px 13px 5px 6px}
.l3d-level .lv{display:flex;align-items:center;gap:4px;font-size:15px}
.l3d-level .lv b{font-size:12px;color:${m};font-weight:600}
.l3d-level .cz-track{width:72px;height:8px}
.l3d-level small{font-size:11.5px;color:${m};font-weight:600}
.l3d-forms{position:absolute;left:50%;bottom:max(18px,env(safe-area-inset-bottom));transform:translateX(-50%);display:flex;gap:9px;padding:9px;pointer-events:auto;animation:czRise .45s cubic-bezier(.2,1.4,.4,1)}
.l3d-forms:empty{display:none}
/* 齊天大聖's: a tray over the skill bar, as wide as it needs; the key list makes way. */
.l3d-ui .l3d-forms.is-tray{bottom:calc(max(18px,env(safe-area-inset-bottom)) + 76px);max-width:min(720px,calc(100% - 32px))}
.l3d-ui:not(.is-forms-open) .l3d-forms.is-tray{opacity:0!important;pointer-events:none!important}
.l3d-ui.is-forms-open .l3d-keys{opacity:0!important;pointer-events:none}
@media (max-width:640px){.l3d-ui .l3d-forms.is-tray{left:12px;right:12px;width:auto;max-width:none;bottom:calc(max(18px,env(safe-area-inset-bottom)) + 292px)}}
/* Many shapes: the bar scrolls sideways (finger or trackpad) instead of running off the screen or under the buttons. */
.l3d-forms{max-width:calc(100% - 32px);overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scrollbar-width:none;touch-action:pan-x;padding-bottom:15px;-webkit-overflow-scrolling:touch}
.l3d-forms::-webkit-scrollbar{display:none}
.l3d-forms .l3d-form{flex:none}
.l3d-forms img{pointer-events:none;-webkit-user-drag:none;user-select:none}
@media (max-width:640px){.l3d-forms{left:max(10px,env(safe-area-inset-left));transform:none;max-width:calc(100% - 205px);gap:7px;padding:7px 7px 14px}.l3d-forms .l3d-form{width:48px;height:48px}.l3d-form canvas,.l3d-form img{width:40px;height:40px}}
.l3d-form-tabs{position:absolute;left:50%;bottom:calc(max(18px,env(safe-area-inset-bottom)) + 172px);transform:translateX(-50%);display:flex;gap:2px;max-width:min(720px,calc(100% - 32px));padding:0 6px;background:#f4f5fb;box-shadow:0 4px 0 ${o.lip};overflow-x:auto;scrollbar-width:none;pointer-events:auto}
.l3d-form-tabs::-webkit-scrollbar{display:none}
.l3d-form-tabs[hidden],.l3d-ui:not(.is-forms-open) .l3d-form-tabs{display:none}
.l3d-form-tabs button{flex:none;padding:9px 12px 7px;border:0;border-bottom:3px solid transparent;border-radius:0;background:transparent;color:${o.ink};font:600 13px ${l};cursor:pointer;transition:border-color .15s,color .15s}
.l3d-form-tabs button:hover{border-bottom-color:${o.line}}
.l3d-form-tabs button:focus-visible{outline:2px solid ${o.blue};outline-offset:-2px}
.l3d-form-tabs button[aria-selected=true]{border-bottom-color:${o.blue};color:${o.blueDark}}
@media (max-width:640px){.l3d-form-tabs{left:12px;right:12px;transform:none;max-width:none;bottom:calc(max(18px,env(safe-area-inset-bottom)) + 388px)}}
.l3d-forms.is-tray .l3d-form span{max-width:70px;overflow:hidden;text-overflow:ellipsis}
.l3d-form-dot{width:30px;height:30px;border-radius:50%;box-shadow:inset 0 -4px 0 rgba(43,48,73,.18)}
.l3d-form{position:relative;width:54px;height:54px;border-radius:16px;border:0;background:#f4f5fb;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 0 ${o.lip};transition:transform .3s cubic-bezier(.2,1.6,.4,1),box-shadow .2s,background .2s;font:600 11px ${l};color:${o.ink}}
.l3d-form canvas,.l3d-form img{width:46px;height:46px;border-radius:12px}
.l3d-form:hover{transform:translateY(-4px)}
.l3d-form[aria-pressed=true]{background:#fff;box-shadow:0 0 0 3px ${o.blue},0 5px 0 ${o.blueDark};transform:translateY(-3px)}
.l3d-form span{position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);padding:1px 7px;border-radius:999px;background:${o.ink};color:#fff;font-size:10px;white-space:nowrap}
.l3d-prompt{position:absolute;transform:translate(-50%,-100%);display:flex;align-items:center;gap:7px;padding:6px 13px 6px 7px;font-weight:600;font-size:13.5px;white-space:nowrap;animation:czPop .35s cubic-bezier(.2,1.6,.4,1)}
.l3d-dialogue{position:absolute;left:50%;bottom:max(20px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(780px,calc(100% - 28px));padding:24px 26px 22px;border-radius:28px!important;pointer-events:auto;animation:czRise .4s cubic-bezier(.2,1.4,.4,1)}
.l3d-dialogue .cz-tag{position:absolute;left:22px;top:-15px;font-size:14px;padding:5px 15px}
.l3d-portrait{position:absolute;bottom:0;pointer-events:none;animation:l3dPortraitIn .42s cubic-bezier(.2,1.3,.4,1) both}
.l3d-portrait.is-leaving{animation:l3dPortraitOut .26s ease-in forwards}
/* A portrait where the dialogue card's stage puts it: the screen is the stage (as in the player), the box in front. */
.l3d-portrait.is-staged{left:50%;height:88%;width:0;max-width:none;filter:none;z-index:1}
.l3d-portrait.is-staged img{position:absolute;left:0;bottom:0;height:100%;width:auto;max-width:none;transform:translateX(-50%) scale(var(--s,1)) scaleX(var(--fx,1)) scaleY(var(--fy,1));transform-origin:bottom center;filter:drop-shadow(0 10px 18px rgba(20,24,44,.28))}
.l3d-dialogue{z-index:2}
/* A dialogue card's page in a 3D scene: its background picture and props (talkScene.ts), behind the portrait and the box. */
.l3d-talk-scene{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
.l3d-talk-scene.is-front{z-index:2}
.l3d-talk-scene.is-entering{animation:l3dTalkIn .3s ease-out both}
.l3d-talk-scene.is-leaving{animation:l3dTalkOut .26s ease-in forwards}
.l3d-talk-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.l3d-talk-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.l3d-talk-tint{position:absolute;inset:0}
.l3d-talk-prop{position:absolute;width:0;height:0}
.l3d-talk-prop img{position:absolute;left:0;top:0;max-width:none;transform-origin:center;filter:drop-shadow(0 12px 24px rgba(0,0,0,.28))}
@keyframes l3dTalkIn{from{opacity:0}to{opacity:1}}
@keyframes l3dTalkOut{to{opacity:0}}
@keyframes l3dPortraitIn{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:none}}
@keyframes l3dPortraitOut{to{opacity:0;transform:translateY(24px)}}
.l3d-dialogue p{margin:0;font-size:18px;line-height:1.65;color:${o.ink};min-height:1.65em;font-weight:500}
.l3d-dialogue .l3d-next{position:absolute;right:22px;bottom:14px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid ${o.blue};animation:czBob .7s ease-in-out infinite}
.l3d-choices{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}
.l3d-choices .cz-btn{pointer-events:auto;padding:12px 22px;font-size:16px}
/* As wide as its words (not squeezed into the half of the screen right of its middle), up to the screen less a
   margin: a long hint wraps rather than running off a phone. */
.l3d-toast{position:absolute;left:50%;top:16%;transform:translateX(-50%);width:max-content;max-width:calc(100% - 32px);display:flex;align-items:center;gap:12px;padding:12px 22px 12px 12px;white-space:nowrap;animation:czPop .42s cubic-bezier(.2,1.6,.4,1)}
.l3d-toast>div:last-child{min-width:0}
/* An event's 播放影片 (game.ts playVideo): what it says over the black while it can't show a picture. */
.l3d-ev-video>video{max-width:100%;max-height:100%}
.l3d-ev-video .l3d-video-skip{position:absolute;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));padding:9px 22px;font-size:15px}
.l3d-ev-video .l3d-video-tap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:10px;padding:14px 26px;font-size:17px;white-space:nowrap}
.l3d-ev-video .l3d-video-tap:hover{transform:translate(-50%,calc(-50% - 2px))}
.l3d-ev-video .l3d-video-tap:active{transform:translate(-50%,calc(-50% + 4px))}
.l3d-ev-video .l3d-video-tap svg{width:20px;height:20px;flex:none}
.l3d-ev-video .l3d-video-wait{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);margin:0;font-size:15px;font-weight:600;color:rgba(255,255,255,.86)}
.l3d-ev-video .l3d-video-trouble{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(420px,calc(100% - 40px));box-sizing:border-box;padding:22px 24px 20px;text-align:center;animation:czPop .42s cubic-bezier(.2,1.6,.4,1)}
.l3d-ev-video .l3d-video-trouble b{display:block;font-size:18px;font-weight:700;color:${o.ink}}
.l3d-ev-video .l3d-video-trouble p{margin:8px 0 16px;font-size:14px;line-height:1.6;color:${m};font-weight:500}
.l3d-ev-video .l3d-video-trouble .cz-btn{padding:11px 30px}
.l3d-toast .ico{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:#f2f4fb}
.l3d-toast b{display:block;font-size:17px;font-weight:700;color:${o.ink}}
.l3d-ui .l3d-ashore{position:absolute;left:50%;top:max(12px,env(safe-area-inset-top));translate:-50% 0;padding:7px 16px;font-size:13px;z-index:6;white-space:nowrap;animation:czPop .35s cubic-bezier(.2,1.6,.4,1)}
.l3d-ui .l3d-ashore[hidden],.l3d-settings[hidden],.l3d-summon[hidden],.is-sandbox .l3d-settings-btn,.is-sandbox .l3d-story-bag-btn,.is-sandbox .l3d-keys,.is-sandbox .l3d-skill-row{display:none}
.l3d-summon.l3d-settings-btn{top:calc(max(10px,env(safe-area-inset-top)) + 44px)}
.l3d-ui.is-framed .l3d-summon.l3d-settings-btn{top:calc(max(10px,env(safe-area-inset-top)) + 94px)}
.l3d-summon.l3d-story-bag-btn{top:calc(max(10px,env(safe-area-inset-top)) + 88px)}
.l3d-ui.is-framed .l3d-summon.l3d-story-bag-btn{top:calc(max(10px,env(safe-area-inset-top)) + 138px)}
/* On a phone the coins sit under the corner buttons: it joins the row. */
@media (max-width:640px){.l3d-summon.l3d-settings-btn{top:max(10px,env(safe-area-inset-top));right:calc(max(12px,env(safe-area-inset-right)) + 88px)}.l3d-ui.is-framed .l3d-summon.l3d-settings-btn{top:calc(max(10px,env(safe-area-inset-top)) + 50px)}.l3d-ui.is-framed .l3d-settings{top:calc(max(10px,env(safe-area-inset-top)) + 96px)}}
/* On a phone 設定 moves left into the row of action chips: the bag stays in the right-hand column under the eye, and the coins and clock step down one button. */
@media (max-width:640px){.l3d-summon.l3d-story-bag-btn{top:calc(max(10px,env(safe-area-inset-top)) + 44px)}.l3d-ui.is-framed .l3d-summon.l3d-story-bag-btn{top:calc(max(10px,env(safe-area-inset-top)) + 94px)}.l3d-ui:has(>.l3d-story-bag-btn:not([hidden])) .l3d-hud-r{top:calc(max(10px,env(safe-area-inset-top)) + 90px)}.l3d-ui.is-framed:has(>.l3d-story-bag-btn:not([hidden])) .l3d-hud-r{top:calc(max(10px,env(safe-area-inset-top)) + 140px)}}
.l3d-settings{position:absolute;right:calc(max(12px,env(safe-area-inset-right)) + 46px);top:calc(max(10px,env(safe-area-inset-top)) + 44px);width:min(250px,calc(100% - 80px));display:grid;gap:10px;padding:14px;border-radius:18px;pointer-events:auto;z-index:7;background:rgba(14,18,32,.72);font-weight:500;font-size:13px;animation:czPop .3s cubic-bezier(.2,1.4,.4,1)}
.l3d-settings>b{font-size:14px;font-weight:600}
.l3d-settings-row{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:10px}
.l3d-settings-row input{width:100%;accent-color:#fff}
.l3d-ui .l3d-settings .l3d-weapon{justify-content:center;padding:8px 14px;background:rgba(255,255,255,.14)}
.l3d-ui .l3d-settings .l3d-weapon:hover{background:rgba(255,255,255,.24)}
.l3d-settings small{font-size:12px;line-height:1.5;color:rgba(255,255,255,.82);font-weight:500}
.l3d-settings-saves{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:8px}
.l3d-ui .l3d-settings .l3d-settings-saves .l3d-weapon{padding:8px 10px;white-space:nowrap}
.l3d-ui .l3d-settings .l3d-weapon:disabled{cursor:default;transform:none;opacity:.6}
.l3d-autosaved{position:absolute;left:max(14px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:6;padding:5px 12px;border-radius:999px;background:rgba(14,18,32,.7);color:#fff;font:600 12px ${l};pointer-events:none;opacity:0;transform:translateY(6px);transition:opacity .4s ease,transform .4s ease}
.l3d-autosaved.is-on{opacity:1;transform:none}
@media (pointer:coarse){.l3d-autosaved{left:50%;bottom:auto;top:max(10px,env(safe-area-inset-top));transform:translate(-50%,-4px)}.l3d-autosaved.is-on{transform:translate(-50%,0)}}
@media (max-width:640px){.l3d-autosaved{left:50%;top:auto;bottom:calc(max(14px,env(safe-area-inset-bottom)) + 92px);transform:translate(-50%,4px)}.l3d-autosaved.is-on{transform:translate(-50%,0)}}
@media (prefers-reduced-motion:reduce){.l3d-autosaved{transition:opacity .2s}}
.l3d-toast small{display:block;font-size:13px;color:${o.muted};font-weight:600;margin-top:1px;white-space:normal}
.l3d-tag{position:absolute;transform:translate(-50%,-100%);padding:2px 9px;font-weight:600;font-size:12px;white-space:nowrap;color:${o.ink};transition:opacity .3s}
.l3d-keys{position:absolute;right:16px;top:14px;display:flex;gap:9px;align-items:center;padding:5px 11px;font-size:12px;font-weight:600;color:${m};pointer-events:none}
.l3d-keys span{display:flex;align-items:center;gap:5px}
.l3d-keys .l3d-keys-help{display:none;align-items:center;gap:5px;font-weight:600}
.l3d-keys.is-folded span{display:none}
.l3d-keys.is-folded .l3d-keys-help{display:flex}
@media (max-width:1279px){.l3d-keys{top:64px}}
.l3d-online-layer{z-index:6}
.l3d-online{position:absolute;left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%);display:flex;gap:8px;align-items:center;pointer-events:auto}
.l3d-online[hidden]{display:none}
/* A phone's top row is the hearts' and the round buttons' (the chat button sat on the settings one): who is here goes
   down the left, under the HUD and a boss's bar (online.ts places it there as they grow), the teammates under it. */
@media (max-width:640px){.l3d-online{left:max(12px,env(safe-area-inset-left));transform:none;top:calc(max(10px,env(safe-area-inset-top)) + 92px)}}
.l3d-online-pill{display:flex;align-items:center;gap:7px;padding:5px 12px 5px 10px;font-weight:600;font-size:12.5px;color:${o.ink};white-space:nowrap}
.l3d-online-pill .dot{width:8px;height:8px;border-radius:50%;background:#20b26b;box-shadow:0 0 0 3px rgba(32,178,107,.22)}
.l3d-online-pill .dot.wait{background:#e8a31c;box-shadow:0 0 0 3px rgba(232,163,28,.22);animation:czBob .9s ease-in-out infinite}
.l3d-online-pill .dot.off{background:#9aa0b8;box-shadow:none}
.l3d-chat-btn{width:34px;height:34px;border-radius:50%!important;padding:0;display:grid;place-items:center}
.l3d-chat-btn[hidden]{display:none}
/* 房間代碼 (組隊模式): a white pill by who is here — 「房間代碼」 (「代碼」 on a phone), or the code itself once there is one. */
.l3d-code-btn{height:34px;border-radius:999px!important;padding:0 13px 0 10px;display:inline-flex;align-items:center;gap:5px;font-size:13px;white-space:nowrap}
.l3d-code-btn[hidden]{display:none}
.l3d-code-btn.has-code>span{font:700 13px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}
.l3d-code-btn .l3d-code-short{display:none}
@media (max-width:640px){.l3d-code-btn .l3d-code-long{display:none}.l3d-code-btn .l3d-code-short{display:inline}}
.l3d-chatbar{position:absolute;left:50%;bottom:max(104px,calc(env(safe-area-inset-bottom) + 96px));transform:translateX(-50%);width:min(560px,calc(100% - 28px));display:flex;gap:8px;padding:8px;pointer-events:auto;animation:czRise .3s cubic-bezier(.2,1.4,.4,1)}
.l3d-chatbar input{flex:1;min-width:0;border:0;border-radius:999px;padding:10px 16px;font:500 15px ${l};background:#eef0f7;color:${o.ink};outline:none}
.l3d-chatbar input::placeholder{color:#5d6382}
.l3d-chatbar input:focus-visible{box-shadow:0 0 0 3px ${o.blue}}
.l3d-chatbar .cz-btn{padding:0 18px;font-size:15px}
.l3d-say{max-width:min(280px,70vw);white-space:normal;text-align:center;padding:7px 14px;font-size:13.5px;color:${o.ink}}
/* 組隊模式: the teammates down the left (a dot of their colour, their name, their hearts as a bar), and a thin bar
   under each one's name over their head. Only a list: taps go through to the game. */
.l3d-team{position:absolute;left:max(16px,env(safe-area-inset-left));top:clamp(150px,34%,300px);display:grid;gap:6px;justify-items:start;pointer-events:none}
.l3d-team-row{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:6px;row-gap:4px;max-width:148px;padding:5px 11px 7px 9px;border-radius:12px!important;font-weight:600;font-size:12px;color:${o.ink}}
.l3d-team-row .dot{width:8px;height:8px;border-radius:50%;box-shadow:0 0 0 2px rgba(255,255,255,.55)}
.l3d-team-row b{overflow:hidden;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
.l3d-team-row .hp,.l3d-tag-hp{display:block;height:5px;border-radius:999px;background:rgba(20,16,32,.5);overflow:hidden}
.l3d-team-row .hp{grid-column:1/-1;width:104px}
.l3d-team-row .hp>i,.l3d-tag-hp>i{display:block;height:100%;border-radius:inherit;background:linear-gradient(180deg,#7ee2a0,#20b26b);transition:width .25s ease}
.l3d-team-row.is-low .hp>i,.l3d-tag-hp.is-low>i{background:linear-gradient(180deg,#ff8a8a,#e5484d)}
.l3d-team-more{padding:0 4px;font-weight:600;font-size:11.5px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.55)}
.l3d-tag>span{display:block}
.l3d-tag-hp{width:44px;height:4px;margin:3px auto 1px}
.l3d-tag-hp[hidden]{display:none}
@media (max-width:640px){.l3d-team{left:max(12px,env(safe-area-inset-left));top:clamp(150px,30%,240px);gap:4px}.l3d-team-row{max-width:118px;padding:4px 9px 6px 8px;font-size:11px}.l3d-team-row .hp{width:84px;height:4px}}
@media (max-height:500px){.l3d-team{top:auto;bottom:calc(max(14px,env(safe-area-inset-bottom)) + 150px)}}
/* The always-on chrome stays quiet: small translucent paper chips instead of chunky white cards, so the world is
   the picture and the HUD only labels it. */
.l3d-hearts{display:flex;gap:1px;align-items:center;padding:6px 10px 6px 8px;border-radius:999px}
.l3d-hearts i{display:grid}
.l3d-hearts i.on svg{filter:drop-shadow(0 1px 0 rgba(150,30,40,.18))}
.l3d-ui.is-hurt .l3d-hearts{animation:l3dWobble .45s}
.l3d-ui.is-hurt canvas{opacity:.85}
@keyframes l3dWobble{20%{transform:translateX(-4px) rotate(-2deg)}45%{transform:translateX(4px) rotate(2deg)}70%{transform:translateX(-2px)}}
.l3d-weapon{display:flex;align-items:center;gap:6px;padding:5px 10px 5px 8px;border:0;border-radius:999px;font:600 12.5px ${l};color:${o.ink};cursor:pointer;pointer-events:auto;transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
.l3d-weapon[hidden]{display:none}
.l3d-hud .l3d-test-btn{outline:1.5px dashed rgba(91,124,240,.7);outline-offset:-3px}
.l3d-hud .l3d-cloud-btn[aria-pressed="true"]{background:linear-gradient(180deg,#fff8de,#ffe6a3);box-shadow:0 0 0 2px rgba(240,182,74,.75),0 6px 18px rgba(240,170,60,.3)}
.l3d-weapon:hover{transform:translateY(-1px)}
.l3d-weapon:focus-visible{outline:2px solid ${o.blue};outline-offset:2px}
.l3d-weapon .cz-key{min-width:18px;height:18px;font-size:10.5px}
.l3d-clock{display:flex;align-items:center;gap:6px;padding:5px 12px 5px 9px;border-radius:999px;font-size:12px;color:${o.ink}}
.l3d-clock b{font-size:13.5px}
.l3d-clock small{color:${m};font-weight:600}
.l3d-float{position:absolute;transform:translate(-50%,-100%);font:700 24px ${l};color:#fff;text-shadow:0 2px 0 rgba(43,48,73,.4),0 0 14px rgba(255,214,90,.75);animation:l3dFloat 1.2s ease-out forwards;pointer-events:none;white-space:nowrap}
.l3d-float.xp{color:#ffe27a}
@keyframes l3dFloat{0%{opacity:0;transform:translate(-50%,-60%) scale(.5)}15%{opacity:1;transform:translate(-50%,-100%) scale(1.18)}30%{transform:translate(-50%,-120%) scale(1)}100%{opacity:0;transform:translate(-50%,-280%) scale(.95)}}
.l3d-hurt-flash{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 42%,rgba(244,91,101,.5));animation:l3dFlash .6s ease-out forwards}
.l3d-hurt-flash.burn{background:radial-gradient(ellipse at center,transparent 38%,rgba(255,132,52,.55))}
@keyframes l3dFlash{from{opacity:1}to{opacity:0}}
.l3d-eat.is-locked span{color:${m}}
.l3d-color-btn{display:grid;place-items:center;width:34px;height:34px;margin:-4px 0;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;pointer-events:auto;transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
.l3d-color-btn:hover{transform:scale(1.1) rotate(-6deg)}
.l3d-color-btn:focus-visible{outline:2px solid ${o.blue};outline-offset:1px}
.l3d-picker{position:absolute;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(560px,calc(100% - 28px));padding:20px 22px 22px;text-align:center;pointer-events:auto;animation:czRise .45s cubic-bezier(.2,1.4,.4,1)}
.l3d-ui.is-picking .l3d-btns,.l3d-ui.is-picking .l3d-stick{display:none}
.l3d-picker h2{margin:0 0 14px;font-size:19px;font-weight:700;color:${o.ink}}
.l3d-swatches{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-bottom:16px}
.l3d-swatch{display:grid;justify-items:center;gap:6px;padding:8px 2px 6px;border:0;border-radius:16px;background:#f4f5fb;color:${o.ink};font:600 12px ${l};cursor:pointer;transition:transform .25s cubic-bezier(.2,1.6,.4,1),background .15s,box-shadow .15s}
.l3d-swatch i{width:40px;height:34px;border-radius:50% 50% 46% 46%/62% 62% 40% 40%;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.95) 0 9%,transparent 11%),radial-gradient(ellipse at 50% 85%,color-mix(in srgb,var(--c) 60%,#fff) 0,var(--c) 60%,color-mix(in srgb,var(--c) 70%,#000) 100%);opacity:calc(.55 + var(--a) * .7);box-shadow:inset 0 -4px 8px rgba(0,0,0,.12),0 3px 6px rgba(43,48,73,.15)}
.l3d-swatch:hover{transform:translateY(-2px)}
.l3d-swatch[aria-checked=true]{background:#fff;box-shadow:0 0 0 3px ${o.blue},0 4px 0 ${o.blueDark}}
.l3d-swatch:focus-visible{outline:3px solid ${o.blue};outline-offset:2px}
.l3d-pick-go{padding:12px 30px;font-size:16px}
.l3d-dress{position:absolute;right:max(18px,env(safe-area-inset-right));top:50%;transform:translateY(-50%);width:min(380px,calc(100% - 28px));max-height:calc(100% - 32px);display:flex;flex-direction:column;overflow:hidden;padding:18px 18px 16px;pointer-events:auto;animation:czRise .45s cubic-bezier(.2,1.4,.4,1)}
.l3d-dress-rows{min-height:0;overflow:auto;overscroll-behavior:contain;margin:0 -6px;padding:0 6px}
.l3d-dress h2{margin:0 0 10px;font-size:19px;font-weight:700;color:${o.ink};text-align:center}
.l3d-dress-row{display:grid;grid-template-columns:72px minmax(0,1fr);align-items:center;gap:8px;padding:7px 0;border-bottom:1px dashed ${o.line}}
.l3d-dress-row>span{font:700 12.5px ${l};color:${m}}
.l3d-dress-step{display:flex;align-items:center;justify-content:space-between;gap:8px}
.l3d-dress-heroes{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:8px;padding:2px 0 8px;border-bottom:1px dashed ${o.line}}
.l3d-dress-heroes button{display:grid;justify-items:center;gap:3px;padding:6px 4px 7px;border:2px solid ${o.line};border-radius:16px;background:#fff;color:${o.ink};font:700 13px ${l};cursor:pointer;transition:transform .22s cubic-bezier(.2,1.6,.4,1),border-color .15s,box-shadow .2s}
.l3d-dress-heroes button:hover{transform:translateY(-2px)}
.l3d-dress-heroes button[aria-checked=true]{border-color:${o.blue};box-shadow:0 3px 0 ${o.blueDark}}
.l3d-dress-heroes button:focus-visible{outline:3px solid ${o.blue};outline-offset:2px}
.l3d-dress-heroes img{width:64px;height:64px;object-fit:contain;border-radius:12px;background:radial-gradient(circle at 50% 40%,#fff 30%,#eef1f8 100%)}
.l3d-dress-heroes img:not([src]){visibility:hidden}
.l3d-dress-step b{font:700 15px ${l};color:${o.ink}}
.l3d-dress-step .cz-btn{width:34px;height:34px;padding:0;font-size:20px;line-height:1}
.l3d-dress-swatches{display:flex;flex-wrap:wrap;gap:6px}
.l3d-dress-swatches button{width:26px;height:26px;padding:0;border:3px solid #fff;border-radius:50%;background:var(--c);box-shadow:0 0 0 1px rgba(43,48,73,.25),0 2px 4px rgba(43,48,73,.18);cursor:pointer;transition:transform .2s cubic-bezier(.2,1.6,.4,1)}
.l3d-dress-swatches button:hover{transform:scale(1.14)}
.l3d-dress-swatches button[aria-checked=true]{box-shadow:0 0 0 3px ${o.blue},0 3px 0 ${o.blueDark};transform:scale(1.1)}
.l3d-dress-swatches button:focus-visible{outline:3px solid ${o.blue};outline-offset:2px}
.l3d-dress .l3d-pick-go{flex:none;display:block;margin:14px auto 0}
@media (max-width:640px){.l3d-dress{top:auto;bottom:max(12px,env(safe-area-inset-bottom));right:50%;transform:translateX(50%);max-height:58%}}
/* A phone on its side: a slimmer card, so the hero stays in sight on the left. */
@media (max-height:500px) and (min-width:641px){.l3d-dress{width:min(340px,44%);top:calc(max(14px,env(safe-area-inset-top)) + 48px);transform:none;max-height:calc(100% - 72px);padding:10px 14px 12px}.l3d-dress h2{margin-bottom:2px;font-size:16px}.l3d-dress-row{grid-template-columns:70px minmax(0,1fr);padding:4px 0}.l3d-dress-swatches{gap:5px}.l3d-dress-swatches button{width:23px;height:23px;border-width:2px}.l3d-dress-step .cz-btn{width:30px;height:30px}.l3d-dress .l3d-pick-go{margin-top:8px;padding:9px 28px}}
@media (max-width:520px){.l3d-swatches{grid-template-columns:repeat(3,minmax(0,1fr))}}
.l3d-coins{display:flex;align-items:center;gap:5px;padding:5px 12px 5px 8px;border-radius:999px;font-size:13.5px;color:${o.ink}}
.l3d-coins.bump{animation:czPop .25s cubic-bezier(.2,1.6,.4,1)}
.l3d-float.coin{color:#ffd23f}
.l3d-bag-btn{position:relative;display:flex;align-items:center;gap:5px;padding:5px 10px 5px 7px;border:0;border-radius:999px;font:600 12.5px ${l};color:${o.ink};cursor:pointer;pointer-events:auto;transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
.l3d-bag-btn:hover{transform:translateY(-1px)}
.l3d-bag-btn:focus-visible{outline:2px solid ${o.blue};outline-offset:2px}
.l3d-bag-btn .cz-key{min-width:18px;height:18px;font-size:10.5px}
.l3d-bag-btn .dot{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:${o.red};color:#fff;font:700 11px ${l};display:grid;place-items:center;box-shadow:0 2px 0 ${o.redDark};animation:czBob .9s ease-in-out infinite}
.l3d-bag-btn .dot[hidden]{display:none}
.l3d-bag{position:absolute;left:50%;top:max(16px,calc(50% - 300px));transform:translateX(-50%);width:min(860px,calc(100% - 24px));height:min(600px,calc(100% - 32px));display:flex;flex-direction:column;overflow:hidden;padding:16px 18px 18px;pointer-events:auto;animation:czPop .32s cubic-bezier(.2,1.4,.4,1)}
.l3d-bag-head{flex:none;display:flex;align-items:center;gap:10px;margin-bottom:12px}
.l3d-bag-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain}
.l3d-bag-head [role=tablist]{display:flex;gap:4px;padding:4px;background:#eef0f7}
.l3d-bag-head [role=tab]{position:relative;padding:7px 16px;border:0;border-radius:0;background:transparent;color:${m};font:700 14px ${l};cursor:pointer}
.l3d-bag-head [role=tab][aria-selected=true]{background:#fff;color:${o.ink};box-shadow:0 2px 0 ${o.lip}}
.l3d-bag-head [role=tab] i{margin-left:6px;padding:0 6px;border-radius:999px;background:${o.red};color:#fff;font-style:normal;font-size:11px}
.l3d-bag-head [role=tab]:focus-visible,.l3d-bag-close:focus-visible,.l3d-tier:focus-visible,.l3d-gear:focus-visible{outline:2px solid ${o.blue};outline-offset:2px}
.l3d-bag-coins{display:flex;align-items:center;gap:5px;margin-left:auto;font-size:14px;color:${o.ink}}
.l3d-bag-close{width:34px;height:34px;border:0;border-radius:50%;background:#eef0f7;color:${o.ink};font-size:15px;cursor:pointer}
.l3d-bag-close:hover{background:#e3e6f2}
.l3d-bag-sub{margin:4px 2px 10px;color:${m};font-size:12.5px;font-weight:600}
.l3d-bag-sub b{color:${o.ink};font-size:14px}
@media (max-width:520px){.l3d-bag{top:max(8px,env(safe-area-inset-top));width:calc(100% - 16px);height:calc(100% - max(8px,env(safe-area-inset-top)) - max(8px,env(safe-area-inset-bottom)))}.l3d-bag-head{gap:8px}.l3d-bag-head [role=tab]{padding:7px 10px}}
.l3d-tree{position:relative;height:100%;min-height:260px;overflow:hidden;border-radius:18px;background:radial-gradient(ellipse at 50% 90%,#14344a,#081826 70%);color:#e9fbff}
.l3d-tree svg{position:absolute;inset:0;width:100%;height:100%}
.l3d-tree-lines path{fill:none;stroke:rgba(150,210,235,.42);stroke-width:3;stroke-linecap:round}
.l3d-tree-lines path.lit{stroke:#d9fbff;stroke-width:5}
.l3d-tree-lines path.flow{stroke:#ffffff;stroke-width:3;stroke-dasharray:6 26;animation:l3dFlow 1.6s linear infinite}
@keyframes l3dFlow{to{stroke-dashoffset:-64}}
.l3d-tree-motes i{position:absolute;bottom:-10px;width:4px;height:4px;border-radius:50%;background:#bff6ff;box-shadow:0 0 8px 2px rgba(150,240,255,.7);opacity:0;animation:l3dMote linear infinite}
@keyframes l3dMote{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(20px,-520px);opacity:0}}
.l3d-tree-core{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle,#e9fdff 0,#7fe6ff 35%,rgba(60,180,220,.15) 70%,transparent 72%);box-shadow:0 0 30px 10px rgba(120,230,255,.45);animation:l3dCore 3s ease-in-out infinite}
@keyframes l3dCore{50%{box-shadow:0 0 44px 16px rgba(120,230,255,.6)}}
.l3d-tree-branch{position:absolute;transform:translate(-50%,-50%);font:700 14px ${l};letter-spacing:.3em;color:#e9fbff;text-shadow:0 0 10px rgba(120,220,255,.9),0 1px 3px rgba(0,0,0,.7);pointer-events:none}
.l3d-node::before{content:"";position:absolute;inset:-9px;border-radius:50%;border:2px dashed rgba(255,224,138,.8);opacity:0;pointer-events:none}
.l3d-node.is-ready::before{opacity:1;animation:l3dSpin 6s linear infinite}
.l3d-node.is-done::after{content:"";position:absolute;inset:-14px;border-radius:50%;background:radial-gradient(circle,rgba(170,245,255,.35),transparent 70%);pointer-events:none;animation:l3dCore 2.6s ease-in-out infinite}
@keyframes l3dSpin{to{transform:rotate(360deg)}}
.l3d-burst{position:absolute;transform:translate(-50%,-50%);width:10px;height:10px;pointer-events:none}
.l3d-burst::before{content:"";position:absolute;inset:-6px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 24px 8px rgba(160,240,255,.9);animation:l3dBurstRing .7s ease-out forwards}
.l3d-burst i{position:absolute;left:3px;top:3px;width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 10px 3px rgba(160,240,255,.95);animation:l3dBurstSpark .8s ease-out forwards}
@keyframes l3dBurstRing{from{transform:scale(.4);opacity:1}to{transform:scale(7);opacity:0}}
@keyframes l3dBurstSpark{from{transform:translate(0,0);opacity:1}to{transform:translate(var(--dx),var(--dy));opacity:0}}
.l3d-node{position:absolute;transform:translate(-50%,-50%);display:grid;place-items:center;width:54px;height:54px;padding:0;border-radius:50%;border:2px solid rgba(160,215,235,.55);background:radial-gradient(circle,rgba(30,70,95,.92),rgba(8,24,38,.92));box-shadow:0 4px 14px rgba(0,0,0,.45);cursor:pointer;transition:transform .25s cubic-bezier(.2,1.6,.4,1),box-shadow .2s}
.l3d-node{color:#7fa3b5}
.l3d-node i{position:absolute;right:-4px;bottom:-4px;display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#0b2232;color:#a9c6d4;font:700 10.5px ${l};font-style:normal;border:1px solid rgba(140,200,225,.4)}
.l3d-node:hover,.l3d-node:focus-visible{transform:translate(-50%,-50%) scale(1.12)}
.l3d-node:focus-visible{outline:2px solid #fff;outline-offset:3px}
.l3d-node.is-done{color:#eafcff;border-color:#bff4ff;background:radial-gradient(circle at 50% 40%,#2a7fa3 0,#0f3d57 55%,#071d2c 100%);box-shadow:0 0 0 2px rgba(150,240,255,.25),0 0 22px 7px rgba(110,225,255,.55)}
.l3d-node.is-done .l3d-glyph{opacity:1;filter:drop-shadow(0 0 3px #8ff0ff) drop-shadow(0 0 8px rgba(110,225,255,.8))}
.l3d-node.is-done i{background:#e9fbff;color:#0b4a5e}
.l3d-node.is-ready{border-color:#ffe08a;background:radial-gradient(circle,#5a4a1a,#1c2a33);box-shadow:0 0 0 0 rgba(255,214,110,.7);animation:l3dNodeReady 1.4s ease-in-out infinite}
.l3d-node.is-ready{color:#ffe08a}
.l3d-node.is-ready .l3d-glyph{opacity:1;filter:drop-shadow(0 0 4px rgba(255,214,110,.9))}
.l3d-node.is-ready i{background:#ffd76a;color:#4a3000;border-color:#ffd76a}
@keyframes l3dNodeReady{50%{box-shadow:0 0 22px 8px rgba(255,214,110,.55)}}
.l3d-tree-points{position:absolute;right:16px;top:12px;display:flex;align-items:center;gap:7px;padding:6px 14px 6px 8px;border-radius:999px;background:rgba(6,18,31,.7);border:1px solid rgba(160,240,255,.25);color:#fff}
.l3d-tree-points i{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#fff,#7fe6ff);box-shadow:0 0 12px 3px rgba(120,230,255,.7)}
.l3d-tree-points b{font-size:17px;color:#fff}
.l3d-tree-points span{font-size:12px;color:#bcd6e2}
.l3d-tree-info{position:absolute;left:16px;top:12px;max-width:min(300px,60%);display:grid;gap:3px;padding:10px 14px;border-radius:14px;background:rgba(6,18,31,.72);border:1px solid rgba(160,240,255,.2)}
.l3d-tree-info b{font-size:14.5px;color:#fff}
.l3d-tree-info span{font-size:12.5px;line-height:1.5;color:#d6eef6}
.l3d-tree-info em{font-style:normal;font-size:12px;color:#ffd76a}
.l3d-branches{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.l3d-branch{display:grid;align-content:start;gap:10px;padding:10px;border-radius:18px;background:#f5f6fb}
.l3d-branch h3{margin:0 2px;font-size:13px;color:${m};letter-spacing:.08em}
.l3d-skill{display:grid;gap:6px;padding:10px;border-radius:14px;background:#fff;box-shadow:0 2px 0 ${o.lip}}
.l3d-skill header{display:flex;align-items:center;gap:7px}
.l3d-skill header b{font-size:14.5px;color:${o.ink}}
.l3d-skill header small{margin-left:auto;color:${m};font-weight:700;font-size:12px}
.l3d-tiers{display:grid;gap:5px}
.l3d-tier{position:relative;display:grid;grid-template-columns:22px minmax(0,1fr);gap:7px;align-items:center;padding:7px 9px;border:1px solid ${o.line};border-radius:11px;background:#fff;color:${o.ink};font:600 12px/1.45 ${l};text-align:left;cursor:default}
.l3d-tier i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#eef0f7;color:${m};font-style:normal;font-size:11.5px;font-weight:700}
.l3d-tier em{grid-column:2;font-style:normal;color:${m};font-size:11px}
.l3d-tier b{position:absolute;right:9px;top:7px;color:#18a06a}
.l3d-tier.is-done{border-color:#bfe9d4;background:#effbf5}
.l3d-tier.is-done i{background:#2fd88e;color:#fff}
.l3d-tier.is-ready{border-color:${o.blue};background:#f2f5ff;cursor:pointer;animation:l3dReady 1.6s ease-in-out infinite}
.l3d-tier.is-ready i{background:${o.blue};color:#fff}
.l3d-tier.is-ready:hover{transform:translateY(-1px)}
.l3d-tier.is-locked,.l3d-tier.is-later{opacity:.72}
@keyframes l3dReady{50%{box-shadow:0 0 0 3px rgba(91,124,240,.18)}}
.l3d-slots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.l3d-slot{display:grid;align-content:start;gap:7px;padding:10px;border-radius:18px;background:#f5f6fb}
.l3d-slot h3{margin:0 2px;font-size:13px;color:${m};letter-spacing:.08em}
.l3d-gear{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:9px;align-items:center;padding:9px 11px;border:1px solid ${o.line};border-radius:13px;background:#fff;color:${o.ink};font:600 12px ${l};text-align:left;cursor:pointer}
.l3d-gear span{display:grid;gap:2px}
.l3d-gear b{font-size:14px}
.l3d-gear small{color:${m};font-size:11.5px}
.l3d-gear em{font-style:normal;padding:4px 10px;border-radius:999px;background:#eef0f7;font-size:12px}
.l3d-gear.is-on{border-color:#2fd88e;background:#effbf5}
.l3d-gear.is-on em{background:#2fd88e;color:#0b3d27}
.l3d-gear:hover{transform:translateY(-1px)}
div.l3d-gear{cursor:default}
div.l3d-gear:hover{transform:none}
.l3d-item-pic{width:28px;height:28px;object-fit:contain;border-radius:8px;background:#f3f4f9}
.l3d-bag-body[data-body=items] .l3d-slots:has(> .l3d-slot:only-child){grid-template-columns:minmax(0,1fr)}
.l3d-empty{margin:2px;color:${m};font-size:12px;line-height:1.6}
@media (max-width:720px){.l3d-branches,.l3d-slots{grid-template-columns:minmax(0,1fr)}}
.l3d-boss{position:absolute;left:50%;top:max(58px,calc(env(safe-area-inset-top) + 50px));transform:translateX(-50%);width:min(520px,calc(100% - 40px));display:grid;justify-items:center;gap:3px;pointer-events:none;animation:czRise .4s cubic-bezier(.2,1.4,.4,1)}
.l3d-boss.is-leaving{opacity:0;transition:opacity .3s}
.l3d-boss small{font:600 11.5px ${l};color:#fff;letter-spacing:.2em;text-shadow:0 1px 3px rgba(0,0,0,.55)}
.l3d-boss b{font:700 19px ${l};color:#fff;letter-spacing:.06em;text-shadow:0 2px 0 rgba(0,0,0,.35),0 0 12px rgba(0,0,0,.4)}
.l3d-boss.is-angry b{color:#ffd0c4}
.l3d-boss .bar{position:relative;width:100%;height:12px;border-radius:999px;background:rgba(20,16,28,.55);box-shadow:0 0 0 2px rgba(255,255,255,.85),0 4px 12px rgba(0,0,0,.3);overflow:hidden}
.l3d-boss .bar i{position:absolute;left:0;top:0;bottom:0;border-radius:999px}
.l3d-boss .bar .lag{background:#ffe7a8;transition:width .8s ease .25s}
.l3d-boss .bar .fill{background:linear-gradient(180deg,#ff8a7a,#e8404e);transition:width .15s}
.l3d-boss.is-open .bar{box-shadow:0 0 0 2px #ffe27a,0 0 14px rgba(255,226,122,.8)}
.l3d-float.dmg{font-size:22px;color:#fff}
.l3d-float.l3d-say{font:700 15px ${l};color:${o.ink};text-shadow:none;background:#fff;padding:6px 12px 7px;border-radius:14px;box-shadow:0 3px 0 rgba(43,48,73,.22),0 6px 14px rgba(43,48,73,.18);animation:none;white-space:nowrap}
.l3d-float.l3d-say::after{content:"";position:absolute;left:50%;bottom:-6px;width:12px;height:12px;background:#fff;transform:translateX(-50%) rotate(45deg);border-radius:2px;box-shadow:3px 3px 0 rgba(43,48,73,.14)}
.l3d-float.crit{font-size:30px;color:#ffe27a}
/* Phones: the top bar wraps onto a second row instead of running off the screen; held things show as icons. */
@media (max-width:640px){.l3d-hud{right:max(12px,env(safe-area-inset-right));left:max(12px,env(safe-area-inset-left));top:max(10px,env(safe-area-inset-top));flex-wrap:wrap;gap:6px;max-width:none}.l3d-hud .l3d-weapon{padding:5px 8px}.l3d-hud .l3d-weapon span{display:none}.l3d-quests{top:138px}}
.l3d-region{position:absolute;left:50%;top:27%;transform:translateX(-50%);display:grid;justify-items:center;gap:6px;pointer-events:none;animation:l3dRegion 4.2s ease forwards}
.l3d-region b{font:700 34px ${l};color:#fff;letter-spacing:.32em;text-indent:.32em;text-shadow:0 2px 12px rgba(0,0,0,.45)}
.l3d-region small{font:600 14px ${l};color:#f4efe2;letter-spacing:.25em;text-shadow:0 1px 6px rgba(0,0,0,.5)}
.l3d-region i{width:min(340px,60vw);height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent)}
@keyframes l3dRegion{0%{opacity:0;transform:translate(-50%,8px)}14%{opacity:1;transform:translate(-50%,0)}78%{opacity:1}100%{opacity:0}}
.l3d-ui.is-cold::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 50%,rgba(170,215,255,.38));animation:czBob 3s ease-in-out infinite}
.l3d-level,.l3d-keys,.l3d-online-pill,.l3d-tag,.l3d-hearts,.l3d-weapon,.l3d-clock,.l3d-prompt,.l3d-coins,.l3d-bag-btn{background:rgba(252,250,246,.86);box-shadow:0 1px 2px rgba(43,48,73,.08),0 6px 18px rgba(43,48,73,.12);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.l3d-tag{background:rgba(252,250,246,.8)}
/* Roguelike 關卡 (rogue.ts): the stage and how much of it is broken, the combo, the words across the middle, the cards. */
.l3d-rogue{position:absolute;left:50%;top:max(12px,env(safe-area-inset-top));transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:7px 14px 7px 16px;pointer-events:none;background:rgba(252,250,246,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:3}
.l3d-rogue[hidden]{display:none}
.l3d-errand{position:absolute;left:50%;top:max(12px,env(safe-area-inset-top));transform:translateX(-50%);display:flex;align-items:center;gap:9px;padding:7px 16px 7px 10px;pointer-events:none;background:rgba(252,250,246,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:3;max-width:min(560px,92vw)}
.l3d-errand[hidden],.l3d-errand .cz-track[hidden],.l3d-mischief[hidden],.l3d-errand-arrow[hidden]{display:none}
.l3d-errand-icon{display:grid;place-items:center;flex:none}
.l3d-errand-text{font:700 15px ${l};color:${o.ink};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.l3d-errand-text em{font-style:normal;color:#c96a12}
.l3d-errand[data-kind="to"] .l3d-errand-text em{color:#178a54}
.l3d-errand .cz-track{width:min(130px,24vw);height:11px;flex:none;--c:${o.green}}
.l3d-errand .cz-fill{--c:${o.green};min-width:8px}
.l3d-errand .cz-track.is-low,.l3d-errand .cz-track.is-low .cz-fill{--c:#f45b65}
.l3d-errand-arrow{position:absolute;left:50%;top:calc(max(12px,env(safe-area-inset-top)) + 54px);transform:translateX(-50%);display:grid;justify-items:center;gap:2px;pointer-events:none;z-index:3}
.l3d-errand-arrow i{display:block;width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-bottom:24px solid #ffb02e;filter:drop-shadow(0 2px 0 rgba(43,48,73,.55));transform-origin:50% 60%}
.l3d-errand-arrow[data-kind="to"] i{border-bottom-color:#3fd07f}
.l3d-errand-arrow small{font:700 12.5px ${l};color:#fff;text-shadow:0 1px 0 rgba(43,48,73,.9),0 0 6px rgba(43,48,73,.6)}
.l3d-mischief{position:absolute;right:max(12px,env(safe-area-inset-right));top:calc(max(12px,env(safe-area-inset-top)) + 46px);display:flex;gap:3px;padding:6px 10px;pointer-events:none;background:rgba(252,250,246,.92);z-index:3}
.l3d-mischief i{display:block;width:18px;height:18px;background:#d9d4c8;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.l3d-mischief i.is-on{background:#f45b65}
.l3d-rogue-stage{font:700 15px ${l};color:${o.ink};white-space:nowrap}
.l3d-rogue .cz-track{width:min(190px,34vw);height:12px;--c:${o.orange}}
.l3d-rogue .cz-fill{--c:${o.orange};min-width:10px}
.l3d-rogue span.l3d-rogue-count{font:700 14px ${l};color:${o.ink};min-width:38px;text-align:right}
.l3d-combo{position:absolute;right:max(18px,env(safe-area-inset-right));top:32%;display:grid;justify-items:center;pointer-events:none;opacity:0;transform:scale(.6) rotate(-6deg);transform-origin:100% 50%;transition:opacity .25s,transform .25s}
.l3d-combo.is-on{opacity:1;transform:scale(1) rotate(-6deg)}
.l3d-combo b{font:700 46px ${l};line-height:1;color:#fff;-webkit-text-stroke:2px #2b3049;paint-order:stroke fill;text-shadow:0 4px 0 rgba(43,48,73,.55),0 0 18px rgba(255,170,60,.8)}
.l3d-combo small{font:700 14px ${l};color:#fff;letter-spacing:.2em;text-shadow:0 2px 0 rgba(43,48,73,.6),0 0 8px rgba(43,48,73,.5)}
.l3d-combo.is-hot b{color:#ffe27a;font-size:56px;text-shadow:0 4px 0 rgba(120,52,10,.6),0 0 24px rgba(255,120,40,.95)}
.l3d-combo.is-hit b{animation:l3dComboHit .28s cubic-bezier(.2,1.8,.4,1)}
@keyframes l3dComboHit{0%{transform:scale(1.55)}100%{transform:scale(1)}}
.l3d-rogue-banner{position:absolute;left:50%;top:30%;transform:translateX(-50%);display:grid;justify-items:center;gap:4px;pointer-events:none;opacity:0;width:max-content;max-width:calc(100% - 24px)}
.l3d-rogue-banner.is-on{animation:l3dRogueSay 2.1s ease forwards}
.l3d-rogue-banner b{font:700 54px ${l};color:#fff;letter-spacing:.08em;-webkit-text-stroke:3px #2b3049;paint-order:stroke fill;text-shadow:0 5px 0 rgba(43,48,73,.5),0 0 26px rgba(43,48,73,.35)}
.l3d-rogue-banner small{font:700 17px ${l};color:#fff;letter-spacing:.12em;text-shadow:0 2px 0 rgba(43,48,73,.6),0 0 10px rgba(43,48,73,.55)}
@keyframes l3dRogueSay{0%{opacity:0;transform:translate(-50%,10px) scale(.6)}12%{opacity:1;transform:translate(-50%,0) scale(1.08)}20%{transform:translate(-50%,0) scale(1)}78%{opacity:1}100%{opacity:0;transform:translate(-50%,-8px) scale(1)}}
.l3d-rogue-pick{position:absolute;inset:0;display:grid;align-content:center;justify-items:center;gap:18px;padding:16px;pointer-events:auto;background:rgba(30,34,58,.42);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);z-index:6;animation:l3dRogueDim .25s ease}
@keyframes l3dRogueDim{0%{opacity:0}100%{opacity:1}}
.l3d-rogue-pick h2{margin:0;font:700 30px ${l};color:#fff;letter-spacing:.1em;-webkit-text-stroke:2px #2b3049;paint-order:stroke fill;text-shadow:0 4px 0 rgba(43,48,73,.5)}
.l3d-rogue-cards{display:flex;gap:16px;justify-content:center;align-items:stretch;flex-wrap:wrap;max-width:1010px}
.l3d-rogue-card{--c:${o.green};position:relative;width:228px;padding:20px 16px 18px;border:0;cursor:pointer;display:grid;justify-items:center;align-content:start;gap:8px;text-align:center;font-family:${l};color:${o.ink};background:${o.card};animation:czRise .4s cubic-bezier(.2,1.4,.4,1) both;transition:transform .2s cubic-bezier(.2,1.6,.4,1),box-shadow .2s;-webkit-tap-highlight-color:transparent}
.l3d-rogue-card:hover,.l3d-rogue-card:focus-visible{transform:translateY(-6px);box-shadow:0 5px 0 var(--c),0 18px 34px rgba(72,82,140,.28)}
.l3d-rogue-card:focus-visible{outline:3px solid ${o.blue};outline-offset:3px}
.l3d-rogue-card:active{transform:translateY(2px)}
.l3d-rogue-card.is-picked{transform:translateY(-10px) scale(1.06);box-shadow:0 6px 0 var(--c),0 0 0 4px color-mix(in srgb,var(--c) 55%,#fff),0 22px 40px rgba(72,82,140,.34)}
.l3d-rogue-pick.is-done .l3d-rogue-card:not(.is-picked){opacity:.45;transform:scale(.96)}
.l3d-rogue-ico{width:68px;height:68px;border-radius:22px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 18%,#fff);box-shadow:inset 0 -3px 0 color-mix(in srgb,var(--c) 30%,#fff)}
.l3d-rogue-card b{font-size:19px;font-weight:700;color:${o.ink}}
.l3d-rogue-card small{font-size:13.5px;font-weight:600;line-height:1.45;color:#5d6485;min-height:39px;text-wrap:balance}
.l3d-rogue-pips{display:flex;gap:5px;margin-top:2px}
.l3d-rogue-pips i{width:16px;height:6px;border-radius:99px;background:${o.line}}
.l3d-rogue-pips i.on{background:var(--c)}
.l3d-rogue-pips i.next{background:color-mix(in srgb,var(--c) 45%,#fff);animation:czBob 1.2s ease-in-out infinite}
.l3d-rogue-card .cz-key{position:absolute;left:12px;top:12px}
.l3d-rogue-result{width:min(380px,calc(100% - 8px));padding:22px 22px 24px;text-align:center;font-family:${l};color:${o.ink};animation:czPop .4s cubic-bezier(.2,1.5,.4,1)}
.l3d-rogue-result h2{margin:0 0 14px;font-size:26px;font-weight:700;color:${o.ink};letter-spacing:.06em;-webkit-text-stroke:0;text-shadow:none}
.l3d-rogue-result dl{margin:0 0 18px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.l3d-rogue-result dl>div{padding:10px 8px;border-radius:14px;background:${o.bg}}
.l3d-rogue-result dt{font-size:12.5px;font-weight:600;color:#5d6485}
.l3d-rogue-result dd{margin:2px 0 0;font:700 24px ${l};color:${o.ink}}
.l3d-rogue-go{display:flex;gap:10px;justify-content:center}
.l3d-rogue-go .cz-btn{padding:11px 22px}
@media (hover:none){.l3d-rogue-card .cz-key{display:none}}
@media (max-width:640px){.l3d-errand{top:calc(max(10px,env(safe-area-inset-top)) + 46px)}.l3d-errand-arrow{top:calc(max(10px,env(safe-area-inset-top)) + 98px)}.l3d-mischief{top:calc(max(10px,env(safe-area-inset-top)) + 92px)}.l3d-errand-text{font-size:13.5px}.l3d-rogue{top:calc(max(10px,env(safe-area-inset-top)) + 46px)}.l3d-rogue-cards{gap:10px}.l3d-rogue-card{width:min(300px,86vw);grid-template-columns:56px 1fr;justify-items:start;text-align:left;padding:12px 14px;column-gap:12px;row-gap:2px}.l3d-rogue-ico{grid-row:1 / span 3;width:56px;height:56px;border-radius:18px}.l3d-rogue-card small{min-height:0}.l3d-rogue-banner b{font-size:40px}.l3d-combo b{font-size:36px}.l3d-combo.is-hot b{font-size:42px}.l3d-rogue-pick h2{font-size:24px}}
@media (max-height:480px){.l3d-rogue-pick{gap:8px}.l3d-rogue-card{width:190px;padding:10px 10px 12px;gap:4px}.l3d-rogue-ico{width:48px;height:48px}.l3d-rogue-card small{min-height:0;font-size:12.5px}.l3d-rogue-pick h2{font-size:22px}}
`;function P(s,t=28){const e=`c${Math.random().toString(36).slice(2,7)}`,a=`url(#${e})`,r=(c,f,b,h=1)=>`<circle cx="${c}" cy="${f}" r="${b}" fill="currentColor" stroke="none"${h<1?` opacity="${h}"`:""}/>`,i=c=>`<svg class="l3d-ctl-glyph" viewBox="0 0 32 32" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><defs><linearGradient id="${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient></defs>${c}</svg>`;switch(s){case"jump":return i('<path d="M16 21.5V7" stroke-width="2.6"/><path d="M10 12.8 16 6.8l6 6" stroke-width="2.6"/><path d="M7.5 26.2c2.6-1.7 5.4-2.5 8.5-2.5s5.9.8 8.5 2.5" opacity=".6"/>');case"sword":return i(`<path d="M26.2 5.8 25 10.4 13.6 21.8l-3.4-3.4L21.6 7z" fill="${a}" stroke-width="1.8"/><path d="M22.6 9.4 14.4 17.6" stroke-width="1" opacity=".75"/><path d="M8.2 16.6l7.2 7.2" stroke-width="2.4"/><path d="M10.8 21.2l-4.6 4.6" stroke-width="3"/>${r(5.2,26.8,1.7)}`);case"bow":return i('<path d="M9.5 4.2c8.6 3.4 8.6 20.2 0 23.6" stroke-width="2.4"/><path d="M9.5 4.2v23.6" stroke-width="1.1" opacity=".75"/><path d="M5 16h22" stroke-width="2"/><path d="M22.8 12 27 16l-4.2 4" stroke-width="2.2"/><path d="M5 16 2.8 13.6M5 16l-2.2 2.4" stroke-width="1.6"/>');case"gun":return i(`<path d="M4.5 12h14.8a2 2 0 0 1 2 2v2.6a2 2 0 0 1-2 2h-5.6l-1.5 5.8a1.8 1.8 0 0 1-1.7 1.3H8.3a1.4 1.4 0 0 1-1.4-1.8l1.4-5.3H4.5a1.5 1.5 0 0 1-1.5-1.5v-3.6A1.5 1.5 0 0 1 4.5 12z" fill="${a}" stroke-width="1.9"/><circle cx="11" cy="8.6" r="2.6" stroke-width="1.7"/><path d="M24.6 15.3h4.6" stroke-width="2.4"/><path d="M24.2 10.6l2.6-1.6M24.2 20l2.6 1.6" stroke-width="1.5" opacity=".7"/>`);case"wand":return i(`<path d="M5.5 26.5 18 14" stroke-width="2.6"/><path d="M22 3.8l1.7 4 4 1.7-4 1.7-1.7 4-1.7-4-4-1.7 4-1.7z" fill="${a}" stroke-width="1.7"/>${r(9.5,9,1.3,.85)}${r(26,21,1.3,.85)}<path d="M12.5 4.5v2.6M11.2 5.8h2.6" stroke-width="1.4" opacity=".8"/>`);case"staff":return i(`<path d="M6.2 25.8 20.6 11.4" stroke-width="2.6"/><circle cx="23.2" cy="8.8" r="4.2" fill="${a}" stroke-width="1.8"/>${r(23.2,8.8,1.5)}<path d="M28.2 15v3M26.7 16.5h3M15.5 4v2.6M14.2 5.3h2.6" stroke-width="1.4" opacity=".85"/>`);case"fist":return i(`<path d="M11.5 11.5h9.2a3.6 3.6 0 0 1 3.6 3.6v2.6a5.6 5.6 0 0 1-5.6 5.6h-3.2a4 4 0 0 1-4-4z" fill="${a}"/><path d="M15 11.5v4.2M18.4 11.5v4.2M21.6 12.1v3.6" stroke-width="1.5"/><path d="M11.5 17.2h6" stroke-width="1.6"/><path d="M3.5 12.5H8M2.5 17h5M3.5 21.5H8" stroke-width="1.8" opacity=".6"/>`);case"chomp":return i(`<path d="M26.6 10A11 11 0 1 0 26.6 22L17 16z" fill="${a}"/>${r(14,10.5,1.7)}<path d="M22.6 12.8l.8 2.2 1.6-1.6M22.6 19.2l.8-2.2 1.6 1.6" stroke-width="1.4"/>`);case"roll":return i(`<path d="M27.5 16A11.5 11.5 0 1 1 16 4.5c3.2 0 6.3 1.3 8.6 3.5L27.5 11" stroke-width="2.4"/><path d="M27.5 4.5V11H21" stroke-width="2.4"/>${r(16,16,2.6)}`);case"morph":return i(`<path d="M16 6s6.8 7.3 6.8 12.2a6.8 6.8 0 0 1-13.6 0C9.2 13.3 16 6 16 6z" fill="${a}"/><path d="M5 12.2a12 12 0 0 1 3.8-5.4M27 19.8a12 12 0 0 1-3.8 5.4" stroke-width="1.8"/><path d="M9.2 3.8v3.4H5.8M22.8 28.2v-3.4h3.4" stroke-width="1.8"/>`);case"star":return i(`<path d="M14.5 4c.9 5.6 3.4 8.1 9 9-5.6.9-8.1 3.4-9 9-.9-5.6-3.4-8.1-9-9 5.6-.9 8.1-3.4 9-9z" fill="${a}" stroke-width="1.8"/><path d="M24.5 19.4c.4 2.4 1.5 3.5 3.9 3.9-2.4.4-3.5 1.5-3.9 3.9-.4-2.4-1.5-3.5-3.9-3.9 2.4-.4 3.5-1.5 3.9-3.9z" fill="currentColor" stroke="none"/>`);case"fire":return i(`<path d="M16 3.5c1.6 5.2 8.5 7.6 8.5 15a8.5 8.5 0 0 1-17 0c0-3.8 2.5-6.6 4-7.8 0 4 2.4 5.3 4 5.3-1.5-4 0-9.3.5-12.5z" fill="${a}" stroke-width="1.9"/><path d="M16 27c-2.3 0-3.8-1.6-3.8-3.6 0-2.3 2.2-3.6 2.8-5.4 1.6 1.4 4.8 3 4.8 5.4 0 2-1.5 3.6-3.8 3.6z" fill="currentColor" stroke="none" opacity=".85"/>`);case"ice":return i(`<path d="M16 3.5l5.6 7.2L16 28.5l-5.6-17.8z" fill="${a}" stroke-width="1.9"/><path d="M10.4 10.7h11.2M16 3.5v25" stroke-width="1.1" opacity=".7"/><path d="M7.4 15.2 4 12.6l.6 6zM24.6 15.2 28 12.6l-.6 6z" fill="currentColor" stroke="none" opacity=".8"/>`);case"bolt":return i(`<path d="M18.6 3 8 18.2h7.2l-2 10.8 11.2-15.4h-7.4z" fill="${a}" stroke-width="1.9"/>`);case"heal":return i(`<path d="M14.6 26S5.8 20.7 4.2 15c-1.1-4.2 1.5-8.4 5.6-8.4 2.3 0 3.8 1.2 4.9 3 1.2-1.8 2.7-3 5-3 .9 0 1.7.2 2.4.6" fill="${a}" stroke-width="1.9"/><path d="M24.4 13.2v10M19.4 18.2h10" stroke-width="2.4"/>`);case"slash":return i(`<path d="M5 25.5C8 13 16.5 6 27.5 5.5 19.5 9.5 14 16.5 11.5 27z" fill="${a}" stroke-width="1.8"/><path d="M4 15.5c2-4 5-7 9-9" stroke-width="1.6" opacity=".6"/>`);case"shield":return i(`<path d="M16 3.5l10 3.6v7.2c0 6.4-4.3 11-10 13.2-5.7-2.2-10-6.8-10-13.2V7.1z" fill="${a}" stroke-width="1.9"/><path d="M16 7.6v16.4" stroke-width="1.3" opacity=".6"/>`);case"talk":return i(`<path d="M6.5 7h19a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H14.5L8.5 26v-4.5h-2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" fill="${a}" stroke-width="1.9"/>${r(11,14.3,1.5)}${r(16,14.3,1.5)}${r(21,14.3,1.5)}`);case"hand":return i(`<path d="M11 18V9a1.9 1.9 0 0 1 3.8 0v6M14.8 14.5V7a1.9 1.9 0 0 1 3.8 0v7.5M18.6 14.5V9a1.9 1.9 0 0 1 3.8 0v8.5c0 5.4-3.4 9-8.2 9-3.2 0-5.3-1.6-6.9-4.4l-2.6-4.4a1.9 1.9 0 0 1 3.2-2L11 18.5" fill="${a}" stroke-width="1.8"/>`);case"three":return i(`<circle cx="16" cy="10" r="4" fill="${a}" stroke-width="2"/><path d="M9.2 26c0-6.4 2.9-10 6.8-10s6.8 3.6 6.8 10" fill="${a}" stroke-width="2"/><circle cx="6.4" cy="13.6" r="2.6" stroke-width="1.7"/><path d="M2.6 25.4c0-4.2 1.4-7 3.8-7" stroke-width="1.7"/><circle cx="25.6" cy="13.6" r="2.6" stroke-width="1.7"/><path d="M29.4 25.4c0-4.2-1.4-7-3.8-7" stroke-width="1.7"/>`);case"peaks":return i(`<path d="M4.6 26v-9a2 2 0 0 1 4 0v9M9.6 26V10.6a2 2 0 0 1 4 0V26M14.6 26V7.4a2 2 0 0 1 4 0V26M19.6 26V10a2 2 0 0 1 4 0v16M24.6 26v-7a1.8 1.8 0 0 1 3.6 0v7" fill="${a}" stroke-width="1.8"/><path d="M3 26.6h26" stroke-width="2.2"/>`);case"cloud":return i(`<path d="M9.4 24.5a5.6 5.6 0 0 1-.8-11.1 7.6 7.6 0 0 1 14.6-1.8 6.5 6.5 0 0 1 .4 12.9z" fill="${a}" stroke-width="2"/><path d="M12 19.4c1.2 1.2 2.8 1.2 4 0s2.8-1.2 4 0" stroke-width="1.7"/>`);case"eye":return i(`<path d="M3.5 16S8 8.2 16 8.2 28.5 16 28.5 16 24 23.8 16 23.8 3.5 16 3.5 16z" fill="${a}" stroke-width="1.9"/><circle cx="16" cy="16" r="3.8" fill="currentColor" stroke="none"/>`);case"car":return i(`<circle cx="16" cy="16" r="11.5" stroke-width="2"/><circle cx="16" cy="16" r="3.2" fill="${a}"/><path d="M16 19.2v7.8M12.9 15 5 12.6M19.1 15 27 12.6" stroke-width="2"/>`);case"exit":return i('<path d="M13 6.5H8.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2H13" stroke-width="2.2"/><path d="M14.5 16h12.5M22 11l5 5-5 5" stroke-width="2.4"/>');case"up":return i('<path d="M9 15.5l7-7 7 7" stroke-width="2.6"/><path d="M9 23.5l7-7 7 7" stroke-width="2.6" opacity=".55"/>');case"down":return i('<path d="M9 8.5l7 7 7-7" stroke-width="2.6" opacity=".55"/><path d="M9 16.5l7 7 7-7" stroke-width="2.6"/>');case"dash":return i('<path d="M3.5 11H11M2 16h9.5M3.5 21H11" stroke-width="1.8" opacity=".6"/><path d="M13.5 8.5 21 16l-7.5 7.5" stroke-width="2.4"/><path d="M20.5 8.5 28 16l-7.5 7.5" stroke-width="2.4"/>');case"wings":return i(`<path d="M13.6 20.5C11.8 13.2 7.6 8.8 2.5 8c.2 1.8.8 3.3 1.7 4.6-.9.2-1.8.1-2.6-.2.8 2.1 2.1 3.7 3.8 4.8-1 .4-2 .5-2.9.4 2.7 2.6 6.6 3.6 11.1 2.9zM18.4 20.5C20.2 13.2 24.4 8.8 29.5 8c-.2 1.8-.8 3.3-1.7 4.6.9.2 1.8.1 2.6-.2-.8 2.1-2.1 3.7-3.8 4.8 1 .4 2 .5 2.9.4-2.7 2.6-6.6 3.6-11.1 2.9z" fill="${a}" stroke-width="1.6"/><path d="M16 27V10.5M12.9 13.6 16 10.4l3.1 3.2" stroke-width="2.2"/>`);case"brake":return i(`<path d="M11.6 4.5h8.8l6.1 6.1v8.8l-6.1 6.1h-8.8l-6.1-6.1v-8.8z" fill="${a}" stroke-width="1.9"/><path d="M10.5 16h11" stroke-width="2.8"/>`);case"web":return i('<path d="M16 2.5v27M4.3 9.2l23.4 13.6M4.3 22.8 27.7 9.2" stroke-width="1.3" opacity=".85"/><path d="M16 9.6q3.2 2.6 5.5 3.2.4 3.3 0 6.4-2.3.6-5.5 3.2-3.2-2.6-5.5-3.2-.4-3.1 0-6.4 2.3-.6 5.5-3.2z" stroke-width="1.6"/><path d="M16 5q5.2 4 9.5 5.5.7 5.5 0 11-4.3 1.5-9.5 5.5-5.2-4-9.5-5.5-.7-5.5 0-11Q10.8 9 16 5z" stroke-width="1.6"/>');case"roar":return i(`<path d="M4 15.2C8.4 10.2 13.4 7.6 19.6 7.4c-1.6 3-4.6 5.6-8.6 7.4zM4 16.8c4.4 5 9.4 7.6 15.6 7.8-1.6-3-4.6-5.6-8.6-7.4z" fill="${a}" stroke-width="1.8"/><path d="M15.4 10.2l1.1 3.2 1.4-4zM15.4 21.8l1.1-3.2 1.4 4z" fill="currentColor" stroke="none"/><path d="M23 11.4l4.4-2.6M23.6 16h5.2M23 20.6l4.4 2.6" stroke-width="2"/>`);case"spout":return i(`<path d="M16 23.5V11" stroke-width="2.6"/><path d="M16 11.5c-1.2-3.6-4.4-5.4-8.4-4.6 1 2.4 3 3.6 5.4 3.6M16 11.5c1.2-3.6 4.4-5.4 8.4-4.6-1 2.4-3 3.6-5.4 3.6" fill="${a}" stroke-width="1.9"/>${r(9,14.6,1.3)}${r(23,14.6,1.3)}<path d="M4.5 26.5c1.9-1.5 3.9-1.5 5.8 0s3.9 1.5 5.8 0 3.9-1.5 5.8 0 3.9 1.5 5.8 0" stroke-width="1.8" opacity=".7"/>`);case"lock":return i(`<path d="M11 14v-3.5a5 5 0 0 1 10 0V14" stroke-width="2"/><rect x="7.5" y="14" width="17" height="13" rx="3.5" fill="${a}" stroke-width="1.9"/>${r(16,20.5,1.8)}`)}}const B={jump:"#9fe6ff",sword:"#ffe2a0",bow:"#ffd27a",staff:"#ffc48a",gun:"#9ff5e0",wand:"#d9bcff",fist:"#ffe2a0",chomp:"#ffb8d6",roll:"#a8f0d0",morph:"#a8ffd6",star:"#d9bcff",fire:"#ffae7a",ice:"#a6eaff",bolt:"#ffe58a",heal:"#a8f5b8",slash:"#c8f0ff",shield:"#b8c8ff",talk:"#ffe08a",hand:"#ffe08a",eye:"#ffe08a",car:"#ffe08a",exit:"#ffe08a",up:"#9fe6ff",down:"#9fe6ff",dash:"#ffd0a0",wings:"#ffc890",brake:"#ff9a9a",web:"#e6edf8",lock:"#c8cede",roar:"#ffb48a",three:"#ffe58a",peaks:"#e4d8c2",cloud:"#fff0c8",spout:"#9fe6ff"},N={flame:"fire",gem:"ice",bolt:"bolt",heart:"heal",sword:"slash",shield:"shield",star:"star",drop:"morph",slime:"morph",swirl:"morph",three:"three",blaze:"eye",peaks:"peaks",cloud:"cloud"},Y=s=>N[s]??"star";function lt(s){return/車/.test(s)?"car":/對話|聊|說|問|講/.test(s)?"talk":/騎|坐上|飛/.test(s)?"wings":/看|讀|查|調查|觀察/.test(s)?"eye":"hand"}const _={attack:{x:0,y:0,size:"big",say:"above"},jump:{x:-98,y:20,size:"mid",say:"left"},alt:{x:-86,y:-52,size:"small",say:"left"},form:{x:-34,y:-98,size:"",say:"left"},action:{x:46,y:-90,size:"",say:"above"},run:{x:-86,y:-52,size:"small",say:"left"},roar:{x:-128,y:-116,size:"small",say:"left"}},D={r:170,at:[160,136,112,88]},U={r:176,at:[142,118,94,70]};function pt(s,t,e){const a=document.createElement("button"),r=_[s];return a.type="button",a.dataset.btn=s,a.dataset.l3dUi="",a.dataset.say=r.say,a.className=`l3d-ctl${r.size?` is-${r.size}`:""}`,a.style.setProperty("--x",`${r.x}px`),a.style.setProperty("--y",`${r.y}px`),a.innerHTML='<i class="l3d-ctl-cd"></i><b class="l3d-ctl-secs"></b><span class="l3d-ctl-say"></span>',E(a,t,e,!1),a}function ct(s,t,e){const a=document.createElement("button");a.type="button",a.dataset.l3dUi="",a.dataset.say="left",a.className="l3d-ctl is-small is-skill";for(const[r,i,c]of[[D,"--x","--y"],[U,"--px","--py"]]){const f=(r.at[s]??r.at[r.at.length-1]-(s-r.at.length+1)*24)*Math.PI/180;a.style.setProperty(i,`${Math.round(Math.cos(f)*r.r)}px`),a.style.setProperty(c,`${Math.round(-Math.sin(f)*r.r)}px`)}return a.innerHTML='<i class="l3d-ctl-cd"></i><b class="l3d-ctl-secs"></b><span class="l3d-ctl-say"></span>',E(a,t,e,!1),a}function E(s,t,e,a=!0){s.dataset.glyph!==t&&(s.dataset.glyph=t,s.style.setProperty("--accent",B[t]),s.querySelector(".l3d-ctl-glyph")?.remove(),s.insertAdjacentHTML("afterbegin",P(t,28)));const r=s.querySelector(".l3d-ctl-say");if(!r||r.textContent===e)return;const i=!r.textContent;r.textContent=e,s.setAttribute("aria-label",e),a&&!i&&(s.classList.remove("is-telling"),s.offsetWidth,s.classList.add("is-telling"),clearTimeout(Number(s.dataset.tellTimer||0)),s.dataset.tellTimer=String(setTimeout(()=>s.classList.remove("is-telling"),1800)))}function xt(s,t,e){const a=t>0;s.classList.toggle("is-cooling",a);const r=s.querySelector(".l3d-ctl-secs");if(!a){r?.textContent&&(r.textContent="");return}s.style.setProperty("--p",`${Math.min(100,t/Math.max(.1,e)*100).toFixed(1)}%`);const i=t>=1?String(Math.ceil(t)):t.toFixed(1);r&&r.textContent!==i&&(r.textContent=i)}const ft=`
/* The cluster hangs from the middle of the attack button (bottom right). */
.l3d-ui .l3d-btns{position:absolute;right:calc(max(20px,env(safe-area-inset-right)) + 72px);bottom:calc(max(18px,env(safe-area-inset-bottom)) + 56px);width:0;height:0;pointer-events:none;z-index:4}
.l3d-ui .l3d-skill-row{position:absolute;left:0;top:0;width:0;height:0}
.l3d-ui .l3d-skill-row[hidden]{display:none}
.l3d-ui .l3d-ctl{--s:56px;--accent:#9fe6ff;position:absolute;left:calc(var(--x,0px) - var(--s) / 2);top:calc(var(--y,0px) - var(--s) / 2);width:var(--s);height:var(--s);padding:0;margin:0;border:0;border-radius:50%;display:grid;place-items:center;color:#fff;cursor:pointer;pointer-events:auto;touch-action:none;-webkit-tap-highlight-color:transparent;opacity:.94;
  background:radial-gradient(circle at 50% 118%,color-mix(in srgb,var(--accent) 34%,transparent),transparent 58%),radial-gradient(circle at 50% 30%,rgba(52,62,90,.54),rgba(10,13,24,.7) 72%);
  box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.6),inset 0 0 0 4.5px rgba(255,255,255,.05),inset 0 12px 14px -12px rgba(255,255,255,.6),0 6px 18px rgba(4,8,20,.32);
  -webkit-backdrop-filter:blur(8px) saturate(1.35);backdrop-filter:blur(8px) saturate(1.35);
  transition:transform .42s cubic-bezier(.2,1.8,.32,1),box-shadow .2s,opacity .22s}
.l3d-ui .l3d-ctl.is-big{--s:86px}
.l3d-ui .l3d-ctl.is-mid{--s:64px}
.l3d-ui .l3d-ctl.is-small{--s:52px}
.l3d-ui .l3d-ctl .l3d-ctl-glyph{position:relative;z-index:1;width:calc(var(--s) * .5);height:calc(var(--s) * .5);filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 85%,transparent)) drop-shadow(0 1px 1px rgba(0,0,0,.45));transition:opacity .2s}
.l3d-ui .l3d-ctl.is-big .l3d-ctl-glyph{width:40px;height:40px}
/* The attack's frame: a fine ring broken in four, and a soft halo of its light. */
.l3d-ui .l3d-ctl.is-big::before{content:"";position:absolute;inset:-9px;border-radius:50%;pointer-events:none;
  background:repeating-conic-gradient(from 25deg,rgba(255,255,255,.62) 0 76deg,transparent 76deg 90deg);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));
  filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 70%,transparent))}
/* Pressed: squashed like jelly, rimmed in its light; let go, it springs back. A ring of light goes out from it. */
.l3d-ui .l3d-ctl::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;opacity:0;box-shadow:0 0 0 2px var(--accent),0 0 16px color-mix(in srgb,var(--accent) 70%,transparent)}
.l3d-ui .l3d-ctl.is-down{opacity:1;transform:scale(.88,.84);transition:transform .07s ease-out,box-shadow .1s;box-shadow:inset 0 0 0 2px var(--accent),inset 0 0 20px color-mix(in srgb,var(--accent) 50%,transparent),0 0 24px color-mix(in srgb,var(--accent) 55%,transparent)}
.l3d-ui .l3d-ctl.is-down::after{animation:l3dCtlRing .5s ease-out}
@keyframes l3dCtlRing{0%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(1.5)}}
/* Spent: a dark sweep with the seconds left. */
.l3d-ui .l3d-ctl .l3d-ctl-cd{position:absolute;inset:0;border-radius:50%;pointer-events:none;opacity:0;z-index:2;background:conic-gradient(rgba(4,6,16,.66) var(--p,0%),transparent 0);transition:opacity .15s}
.l3d-ui .l3d-ctl.is-cooling .l3d-ctl-cd{opacity:1}
.l3d-ui .l3d-ctl.is-cooling .l3d-ctl-glyph{opacity:.42}
.l3d-ui .l3d-ctl .l3d-ctl-secs{position:absolute;inset:0;z-index:3;display:grid;place-items:center;font:700 16px ${p};color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.85);pointer-events:none;font-variant-numeric:tabular-nums}
/* Its word, for a moment when it changes (always, for the thing to do here). */
.l3d-ui .l3d-ctl .l3d-ctl-say{position:absolute;z-index:4;white-space:nowrap;padding:3px 10px 4px;border-radius:999px;font:600 12px ${p};letter-spacing:.02em;color:#fff;background:rgba(10,14,26,.74);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 55%,transparent),0 4px 12px rgba(4,8,20,.3);opacity:0;pointer-events:none;transition:opacity .2s,transform .3s cubic-bezier(.2,1.6,.4,1)}
.l3d-ui .l3d-ctl[data-say=left] .l3d-ctl-say{right:calc(100% + 8px);top:50%;transform:translate(6px,-50%) scale(.9)}
.l3d-ui .l3d-ctl[data-say=above] .l3d-ctl-say{bottom:calc(100% + 8px);left:50%;transform:translate(-50%,6px) scale(.9)}
.l3d-ui .l3d-ctl.is-big[data-say=above] .l3d-ctl-say{bottom:calc(100% + 16px)}
.l3d-ui .l3d-ctl.is-telling .l3d-ctl-say,.l3d-ui .l3d-ctl.is-context.is-near .l3d-ctl-say{opacity:1}
.l3d-ui .l3d-ctl.is-telling[data-say=left] .l3d-ctl-say{transform:translate(0,-50%)}
.l3d-ui .l3d-ctl.is-telling[data-say=above] .l3d-ctl-say,.l3d-ui .l3d-ctl.is-context.is-near .l3d-ctl-say{transform:translate(-50%,0)}
/* The thing to do here: popping up when there is something, breathing gold. */
.l3d-ui .l3d-ctl.is-context{transition:transform .38s cubic-bezier(.2,1.7,.35,1),opacity .2s}
.l3d-ui .l3d-ctl.is-context:not(.is-near){opacity:0;pointer-events:none;transform:scale(.5)}
.l3d-ui .l3d-ctl.is-context.is-near:not(.is-down){animation:l3dCtlCall 1.6s ease-in-out infinite}
@keyframes l3dCtlCall{50%{box-shadow:inset 0 0 0 1.5px var(--accent),inset 0 0 0 4.5px rgba(255,255,255,.05),inset 0 12px 14px -12px rgba(255,255,255,.6),0 0 22px color-mix(in srgb,var(--accent) 60%,transparent)}}
.l3d-ui .l3d-ctl[hidden]{display:none}
@media (orientation:portrait){.l3d-ui .l3d-ctl.is-skill{left:calc(var(--px,0px) - var(--s) / 2);top:calc(var(--py,0px) - var(--s) / 2)}}
/* Going down takes the dodge's place (in the water or the air there is no rolling), the magic's on the wyvern. */
.l3d-ui .l3d-btns.is-diving [data-btn=alt]{visibility:hidden}
.l3d-ui .l3d-btns.is-dragon [data-btn=run]{--x:-34px!important;--y:-98px!important}
.l3d-ui .l3d-btns.is-wild [data-btn=form],.l3d-ui .l3d-btns.is-wild [data-btn=alt]{visibility:hidden}
/* Riding the wyvern: a ring of fire round the attack button, the breath left (it drains breathing, fills after). Run
   dry, it dims to embers and the button rests until it's back past the mark. */
.l3d-ui .l3d-ctl .l3d-ctl-mana{position:absolute;inset:-15px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity .25s;
  background:conic-gradient(var(--mana-c,#ffb347) calc(var(--fire,1) * 360deg),rgba(255,255,255,.2) 0);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4.5px))}
.l3d-ui .l3d-ctl.has-mana .l3d-ctl-mana{opacity:1}
.l3d-ui .l3d-ctl.has-mana.is-burning .l3d-ctl-mana{--mana-c:#ffd36a;animation:l3dManaBurn .16s steps(2,jump-none) infinite}
@keyframes l3dManaBurn{to{opacity:.72}}
.l3d-ui .l3d-ctl.has-mana.is-dry .l3d-ctl-mana{--mana-c:#f2a48f}
.l3d-ui .l3d-ctl.has-mana.is-dry .l3d-ctl-glyph{opacity:.42}
.l3d-ui .l3d-ctl.has-mana.is-out{animation:l3dManaOut .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes l3dManaOut{25%{transform:translateX(-4px)}50%{transform:translateX(4px)}75%{transform:translateX(-2px)}}
/* A skill just learned: its button pops in. */
.l3d-ui .l3d-ctl.is-new{animation:l3dCtlNew .9s cubic-bezier(.2,1.6,.4,1)}
@keyframes l3dCtlNew{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.15);opacity:1}100%{transform:none}}
/* Riding: the buttons that do nothing on the ride step aside. */
.l3d-ui .l3d-btns.is-car [data-btn=form],.l3d-ui .l3d-btns.is-car [data-btn=alt],.l3d-ui .l3d-btns.is-car [data-btn=attack],.l3d-ui .l3d-btns.is-dragon [data-btn=form]{visibility:hidden}
/* Someone talking, or the bag open: the buttons (they do nothing until it's over; tapping the box turns the pages), the
   shapes shelf and the keyboard's help sink out of the words' (or the bag's) way, and rise back after. (The stick has
   already gone: the controls are held.) */
.l3d-ui .l3d-btns,.l3d-ui .l3d-form-peek,.l3d-ui .l3d-keys{transition:opacity .3s ease,translate .5s cubic-bezier(.2,1.5,.4,1),visibility 0s}
.l3d-ui:is(.is-talking,.is-bagging) :is(.l3d-btns,.l3d-form-peek,.l3d-forms,.l3d-keys){opacity:0!important;translate:0 28px;visibility:hidden;transition:opacity .18s ease,translate .24s ease-in,visibility 0s linear .24s}
.l3d-ui:is(.is-talking,.is-bagging) :is(.l3d-btns .l3d-ctl,.l3d-form-peek,.l3d-forms,.l3d-keys){pointer-events:none!important}
@media (prefers-reduced-motion:reduce){.l3d-ui:is(.is-talking,.is-bagging) :is(.l3d-btns,.l3d-form-peek,.l3d-forms,.l3d-keys){translate:none}}
/* A phone on its side: the quests go to the left under the hearts (the right is the buttons'), as in the action RPGs. */
@media (min-width:641px) and (max-height:560px){.l3d-ui.is-touch .l3d-quests{left:max(22px,env(safe-area-inset-left));right:auto;top:calc(max(18px,env(safe-area-inset-top)) + 56px);width:min(240px,30vw)}}
/* Short screens (a phone on its side): the whole cluster a little smaller. */
@media (max-height:420px){.l3d-ui .l3d-btns{transform:scale(.9);transform-origin:0 0}}
@media (max-height:350px){.l3d-ui .l3d-btns{transform:scale(.8)}}
@media (prefers-reduced-motion:reduce){.l3d-ui .l3d-ctl,.l3d-ui .l3d-ctl.is-down{transition:opacity .2s,box-shadow .2s}.l3d-ui .l3d-ctl.is-down{transform:none}.l3d-ui .l3d-ctl.is-down::after,.l3d-ui .l3d-ctl.is-context.is-near,.l3d-ui .l3d-ctl.has-mana.is-burning .l3d-ctl-mana,.l3d-ui .l3d-ctl.has-mana.is-out{animation:none}}
`,ht=`
.l3d-stick{--sz:128px;position:absolute;left:calc(max(24px,env(safe-area-inset-left)) + var(--sz) / 2);top:calc(100% - max(22px,env(safe-area-inset-bottom)) - var(--sz) / 2);width:var(--sz);height:var(--sz);margin:calc(var(--sz) / -2) 0 0 calc(var(--sz) / -2);border-radius:50%;pointer-events:none;z-index:4;opacity:.62;
  background:radial-gradient(circle,rgba(14,18,32,.08) 0 44%,rgba(14,18,32,.3) 100%);
  box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.58),inset 0 0 0 9px rgba(255,255,255,.045),inset 0 0 24px rgba(255,255,255,.08),0 8px 26px rgba(4,8,20,.16);
  -webkit-backdrop-filter:blur(5px) saturate(1.2);backdrop-filter:blur(5px) saturate(1.2);transition:opacity .25s}
.l3d-stick.is-home{transition:opacity .3s}
.l3d-stick.is-live{opacity:1}
.l3d-stick.is-off{opacity:0}
.l3d-stick-ticks{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:rgba(255,255,255,.66);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
.l3d-stick-arc{position:absolute;inset:0;border-radius:50%;opacity:var(--k,0);background:conic-gradient(from calc(var(--a,0rad) - 55deg),transparent 0deg,rgba(214,244,255,1) 55deg,transparent 110deg);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));filter:drop-shadow(0 0 8px rgba(150,220,255,.95))}
.l3d-stick-knob{position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;
  background:radial-gradient(circle at 38% 30%,#fff 0,rgba(240,246,255,.96) 38%,rgba(194,212,240,.92) 100%);
  box-shadow:0 0 0 1px rgba(255,255,255,.85),0 5px 14px rgba(4,8,20,.38),0 0 20px rgba(160,220,255,.42)}
.l3d-stick-knob::after{content:"";position:absolute;inset:13px;border-radius:50%;box-shadow:inset 0 0 0 1.5px rgba(110,140,185,.38),inset 0 2px 4px rgba(110,140,185,.25)}
.l3d-stick.is-home .l3d-stick-knob{transition:transform .55s cubic-bezier(.2,2.1,.3,1)}
.l3d-stick.is-home .l3d-stick-arc{transition:opacity .3s}
@media (max-height:420px){.l3d-stick{--sz:116px}}
@media (prefers-reduced-motion:reduce){.l3d-stick.is-home,.l3d-stick.is-home .l3d-stick-knob{transition:opacity .25s}}
`,X=["q","y","u","i","o"];function ut(s,t){return t||(/fire|flame|magma|burn/.test(s)?"flame":/ice|frost|snow/.test(s)?"gem":/thunder|spark|arc|plasma|energy|bolt/.test(s)?"bolt":/heal|bloom|revival|heart/.test(s)?"heart":/slash|glaive|shock|wind|gale/.test(s)?"sword":/shield|guard|barrier|parry/.test(s)?"shield":"star")}const R=s=>s.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class bt{el=document.createElement("div");slots=new Map;constructor(t,e,a=X){this.el.className="l3d-skillbar",this.el.dataset.l3dUi="",this.el.setAttribute("role","toolbar"),this.el.setAttribute("aria-label","技能");for(const r of a){const i=document.createElement("button");i.type="button",i.className="l3d-sk is-locked",i.dataset.l3dUi="",i.innerHTML=`<span class="l3d-sk-ico"></span><i class="l3d-sk-cd"></i><b class="l3d-sk-secs"></b><kbd>${r.toUpperCase()}</kbd><span class="l3d-sk-tip" role="tooltip"></span>`,i.onclick=()=>{this.slots.get(r)?.skill&&t(r)},this.el.append(i),this.slots.set(r,{b:i,cd:i.querySelector(".l3d-sk-cd"),secs:i.querySelector(".l3d-sk-secs"),skill:null}),this.fill(r,null,e)}}fill(t,e,a="",r=""){const i=this.slots.get(t);if(!i)return;i.skill=e,i.b.classList.toggle("is-locked",!e);const c=e?Y(e.icon):"lock";i.b.querySelector(".l3d-sk-ico").innerHTML=P(c,e?28:22),i.b.style.setProperty("--accent",B[c]),i.b.querySelector(".l3d-sk-tip").innerHTML=e?`<b>${e.name}</b><small>${e.about}</small><em>冷卻 ${e.cooldown%1?e.cooldown.toFixed(1):e.cooldown} 秒</em>`:`<b>${r?`${R(r)}・鎖住`:"還沒學會"}</b><small>${R(a)}</small>`,i.b.classList.toggle("is-waiting",!e&&!!r),i.b.setAttribute("aria-label",e?`${e.name}（${t.toUpperCase()}）`:r?`${t.toUpperCase()}：${r}（鎖住）`:`${t.toUpperCase()}：還沒學會`),i.b.disabled=!e}learned(t){const e=this.slots.get(t)?.b;e&&(e.classList.remove("is-new"),e.offsetWidth,e.classList.add("is-new"),setTimeout(()=>e.classList.remove("is-new"),1600))}cast(t){const e=this.slots.get(t)?.b;e&&(e.classList.remove("is-cast"),e.offsetWidth,e.classList.add("is-cast"))}update(t){for(const e of this.slots.values()){const a=e.skill?Math.max(0,e.skill.readyAt-t):0,r=a>0;if(e.b.classList.toggle("is-cooling",r),r){e.cd.style.setProperty("--p",`${(a/Math.max(.1,e.skill.cooldown)*100).toFixed(1)}%`);const i=a>=1?String(Math.ceil(a)):a.toFixed(1);e.secs.textContent!==i&&(e.secs.textContent=i)}else e.secs.textContent&&(e.secs.textContent="")}}}const gt=`
.l3d-ui .l3d-skillbar{position:absolute;left:0;right:0;margin:0 auto;width:max-content;bottom:max(18px,env(safe-area-inset-bottom));display:flex;gap:9px;padding:9px 11px;border-radius:20px;pointer-events:auto;background:linear-gradient(180deg,rgba(28,34,52,.42),rgba(10,14,26,.56));-webkit-backdrop-filter:blur(14px) saturate(1.35);backdrop-filter:blur(14px) saturate(1.35);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2),inset 0 1px 0 rgba(255,255,255,.18),0 10px 30px rgba(6,8,20,.24)}
.l3d-ui .l3d-skillbar.l3d-piece{transform:translateY(6px) scale(.985)}
.l3d-ui .l3d-skillbar.l3d-piece.is-on{transform:none}
.l3d-ui .l3d-skillbar.is-away{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
.l3d-sk{--accent:#9fe6ff;position:relative;width:54px;height:54px;padding:0;border:0;border-radius:15px;display:grid;place-items:center;cursor:pointer;color:#fff;font:600 12px ${l};
  background:radial-gradient(circle at 50% 120%,color-mix(in srgb,var(--accent) 32%,transparent),transparent 62%),radial-gradient(circle at 50% 28%,rgba(80,92,124,.5),rgba(14,18,32,.7) 75%);
  box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.5),inset 0 0 0 4px rgba(255,255,255,.04),inset 0 12px 14px -12px rgba(255,255,255,.55);transition:transform .3s cubic-bezier(.2,1.7,.35,1),box-shadow .2s}
.l3d-sk:hover:not(:disabled){transform:translateY(-3px);box-shadow:inset 0 0 0 1.5px var(--accent),inset 0 0 16px color-mix(in srgb,var(--accent) 35%,transparent),inset 0 12px 14px -12px rgba(255,255,255,.55),0 6px 18px color-mix(in srgb,var(--accent) 40%,transparent)}
.l3d-sk:focus-visible{outline:2px solid #fff;outline-offset:2px}
.l3d-sk:disabled{cursor:default}
.l3d-sk .l3d-sk-ico{display:grid;place-items:center;color:#fff;filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 85%,transparent)) drop-shadow(0 1px 1px rgba(0,0,0,.45))}
.l3d-sk.is-locked{background:rgba(14,18,32,.36);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}
.l3d-sk.is-locked .l3d-sk-ico{opacity:.6;filter:none}
.l3d-sk.is-locked.is-waiting{box-shadow:inset 0 0 0 1.5px rgba(255,226,138,.62)}
.l3d-sk.is-locked.is-waiting .l3d-sk-ico{opacity:.9;color:#ffe28a}
.l3d-sk kbd{position:absolute;left:4px;top:4px;min-width:16px;height:16px;padding:0 4px;border-radius:5px;display:grid;place-items:center;background:rgba(6,8,18,.66);color:#fff;font:700 10.5px ${l};box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}
.l3d-sk .l3d-sk-cd{position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;background:conic-gradient(rgba(8,10,22,.68) var(--p,0%),transparent 0)}
.l3d-sk.is-cooling .l3d-sk-cd{opacity:1}
.l3d-sk.is-cooling .l3d-sk-ico{filter:grayscale(.7) brightness(.8)}
.l3d-sk .l3d-sk-secs{position:absolute;inset:0;display:grid;place-items:center;font:800 16px ${l};color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7);pointer-events:none}
.l3d-sk.is-cast{animation:l3dSkCast .42s cubic-bezier(.2,1.7,.35,1)}
.l3d-sk.is-cast::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:0 0 0 2px var(--accent),0 0 16px color-mix(in srgb,var(--accent) 70%,transparent);animation:l3dSkFlash .5s ease-out forwards}
@keyframes l3dSkCast{0%{transform:scale(.86,.82)}100%{transform:none}}
@keyframes l3dSkFlash{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}
.l3d-sk.is-new{animation:l3dSkNew 1.1s cubic-bezier(.2,1.5,.4,1)}
.l3d-sk.is-new::after{content:"";position:absolute;inset:-6px;border-radius:18px;border:2px solid #ffe28a;box-shadow:0 0 18px rgba(255,214,110,.9);animation:l3dSkRing 1.1s ease-out forwards;pointer-events:none}
@keyframes l3dSkNew{0%{transform:scale(.4) rotate(-12deg)}55%{transform:scale(1.18) rotate(4deg)}100%{transform:none}}
@keyframes l3dSkRing{0%{opacity:1;transform:scale(.7)}100%{opacity:0;transform:scale(1.5)}}
.l3d-sk .l3d-sk-tip{position:absolute;left:50%;bottom:calc(100% + 10px);transform:translate(-50%,4px);width:max-content;max-width:210px;padding:8px 11px;border-radius:12px;display:grid;gap:2px;text-align:left;background:rgba(14,18,32,.92);color:#fff;box-shadow:0 8px 24px rgba(6,8,20,.3);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .15s,transform .15s,visibility 0s linear .15s;white-space:normal}
.l3d-sk .l3d-sk-tip b{font:700 13px ${l}}
.l3d-sk .l3d-sk-tip small{font:500 11.5px ${l};color:#e9ecf6;line-height:1.4}
.l3d-sk .l3d-sk-tip em{font:600 11px ${l};font-style:normal;color:#ffe28a}
.l3d-sk:hover .l3d-sk-tip,.l3d-sk:focus-visible .l3d-sk-tip{opacity:1;visibility:visible;transform:translate(-50%,0);transition:opacity .15s,transform .15s,visibility 0s}
.l3d-ui.has-skillbar .l3d-keys{bottom:calc(max(20px,env(safe-area-inset-bottom)) + 80px)}
@media (prefers-reduced-motion:reduce){.l3d-sk,.l3d-sk.is-new,.l3d-sk.is-cast,.l3d-sk.is-new::after{animation:none!important;transition:none}}
`,y=6,w=4,j={width:150,height:48},H=".l3d-stick, .l3d-btns > :not(.l3d-skill-row), .l3d-btns .l3d-skill-row > *, .l3d-form-peek",O=".l3d-fire",V=[...C.filter(s=>s.move).map(s=>s.selector),H,".l3d-settings",O].join(", "),F=s=>s.nodeType===1&&s.matches(V),G=(s,t)=>s.l<t.r+y&&s.r+y>t.l&&s.t<t.b+y&&s.b+y>t.t;class mt{constructor(t,e,a={}){this.root=t,this.layout=e,this.options=a;const r=t.ownerDocument;this.sheet=r.createElement("style"),this.sheet.dataset.l3dLayout="",r.head.append(this.sheet),t.dataset.l3dLayout="";const i=r.defaultView;i&&"ResizeObserver"in i&&(this.resize=new i.ResizeObserver(()=>this.schedule())),this.resize?.observe(t),i&&"MutationObserver"in i&&(this.mutations=new i.MutationObserver(c=>{c.some(f=>f.type==="attributes"||[...f.addedNodes].some(F)||[...f.removedNodes].some(F))&&this.schedule()}),this.mutations.observe(t,{childList:!0,attributes:!0,attributeFilter:["class","hidden"]})),this.refresh()}root;layout;options;moved=new Map;sheet;resize=null;mutations=null;watched=new Set;frame=0;panelStyle=null;disposed=!1;setLayout(t){this.layout=t,this.refresh()}schedule(){if(this.disposed||this.frame)return;const t=this.root.ownerDocument.defaultView;t&&(this.frame=t.requestAnimationFrame(()=>{this.frame=0,this.refresh()}))}box(t){const e=t.getBoundingClientRect();if(e.width<1||e.height<1)return null;const a=this.root.getBoundingClientRect();return{l:e.left-a.left,t:e.top-a.top,r:e.right-a.left,b:e.bottom-a.top}}restore(t){const e=this.moved.get(t);e&&(this.moved.delete(t),t.isConnected&&(e.style?t.setAttribute("style",e.style):t.removeAttribute("style"),delete t.dataset.l3dPlaced,t.parentNode!==e.parent&&e.parent.insertBefore(t,e.next&&e.next.parentNode===e.parent?e.next:null)))}refresh(){if(this.disposed)return;const t=this.root,e=t.clientWidth,a=t.clientHeight,r=I(this.layout,t.classList.contains("is-touch")),i=C.filter(n=>r[n.id]?.hide).map(n=>`.l3d-ui[data-l3d-layout] :is(${n.selector}){display:none!important}`).join(`
`);this.sheet.textContent!==i&&(this.sheet.textContent=i);const c=[],f=new Set;for(const n of C){if(!n.move)continue;const d=r[n.id];for(const u of t.querySelectorAll(n.selector))f.add(u),d?.at&&!d.hide&&c.push({id:n.id,el:u,slot:d})}const b=new Set(c.map(n=>n.el));for(const n of[...this.moved.keys()])b.has(n)||this.restore(n);if(!e||!a){this.watch(f),this.mutations?.takeRecords();return}for(const n of c)this.moved.has(n.el)||(this.moved.set(n.el,{parent:n.el.parentNode,next:n.el.nextSibling,style:n.el.getAttribute("style")||""}),n.el.parentNode!==t&&(t.append(n.el),this.options.adopt?.(n.el,n.id))),n.el.dataset.l3dPlaced=n.id,delete n.el.dataset.l3dFallback;const h=[];t.classList.contains("is-framed")&&h.push({l:e-j.width,t:0,r:e,b:j.height});for(const n of t.querySelectorAll(H)){f.add(n);const d=this.box(n);d&&h.push(d)}for(const n of C)if(n.move)for(const d of t.querySelectorAll(n.selector)){if(b.has(d)||[...b].some(g=>g.contains(d)))continue;const u=this.box(d);u&&h.push(u)}for(const n of t.querySelectorAll(O))if(![...b].some(d=>d.contains(n))){const d=this.box(n);d&&h.push(d)}for(const n of c){const d=this.place(n.el,n.slot,e,a,h);if(d==="later")continue;if(d){h.push(d);continue}this.restore(n.el),n.el.dataset.l3dFallback=n.id;const u=this.box(n.el);u&&h.push(u)}this.followSettings(e,a),this.watch(f),this.mutations?.takeRecords()}place(t,e,a,r,i){const c=e.scale??1,f=t.offsetWidth,b=t.offsetHeight,h=e.at,n=(d,u,g)=>{t.style.position="absolute",t.style.left=`${Math.round(d)}px`,t.style.top=`${Math.round(u)}px`,t.style.right="auto",t.style.bottom="auto",t.style.margin="0",t.style.transformOrigin="0 0",g!==1?t.style.scale=String(Math.round(g*1e3)/1e3):t.style.removeProperty("scale")};if(!f||!b){const d=this.anchor(h,e,a,r,0,0);return n(d.l,d.t,c),"later"}for(const d of[c,c*.85,c*.72].filter((u,g)=>g===0||u>=.5)){const u=f*d,g=b*d;if(u>a-w*2||g>r-w*2)continue;const q=this.anchor(h,e,a,r,u,g),M=this.clear(q,u,g,a,r,h,i);if(M)return n(M.l,M.t,d),M}return null}anchor(t,e,a,r,i,c){const f=e.x??16,b=e.y??16,h=t.endsWith("left")?f:t.endsWith("right")?a-f-i:(a-i)/2+(e.x??0),n=t.startsWith("top")?b:t.startsWith("bottom")?r-b-c:(r-c)/2+(e.y??0);return{l:Math.max(w,Math.min(a-w-i,h)),t:Math.max(w,Math.min(r-w-c,n))}}clear(t,e,a,r,i,c,f){const b=n=>n.l>=w-.5&&n.t>=w-.5&&n.r<=r-w+.5&&n.b<=i-w+.5,h=c.startsWith("bottom")?["up","down"]:["down","up"];h.push(c.endsWith("right")?"left":"right",c.endsWith("right")?"right":"left");for(const n of h){const d={l:t.l,t:t.t,r:t.l+e,b:t.t+a};for(let u=0;u<24&&b(d);u++){const g=f.find(q=>G(d,q));if(!g)return d;n==="down"?(d.t=g.b+y+.5,d.b=d.t+a):n==="up"?(d.b=g.t-y-.5,d.t=d.b-a):n==="right"?(d.l=g.r+y+.5,d.r=d.l+e):(d.r=g.l-y-.5,d.l=d.r-e)}}return null}followSettings(t,e){const a=this.root.querySelector(".l3d-settings"),r=this.root.querySelector(".l3d-settings-btn[data-l3d-placed]");if(!a)return;if(!r){this.panelStyle!==null&&(this.panelStyle?a.setAttribute("style",this.panelStyle):a.removeAttribute("style"),this.panelStyle=null);return}this.panelStyle===null&&(this.panelStyle=a.getAttribute("style")||"");const i=parseFloat(r.style.left)||0,c=parseFloat(r.style.top)||0,f=r.offsetWidth*(parseFloat(r.style.scale)||1),b=c+f/2>e/2,h=b?Math.max(w,e-c-f):c;a.style.top=b?"auto":`${Math.round(h)}px`,a.style.bottom=b?`${Math.round(h)}px`:"auto",a.style.maxHeight=`${Math.round(e-h-w)}px`,a.style.overflowY="auto",i+f/2>t/2?(a.style.left="auto",a.style.right=`${Math.round(t-i+8)}px`):(a.style.right="auto",a.style.left=`${Math.round(i+f+8)}px`)}watch(t){if(this.resize){for(const e of this.watched)t.has(e)||this.resize.unobserve(e);for(const e of t)this.watched.has(e)||this.resize.observe(e);this.watched=t}}dispose(){this.disposed=!0,this.frame&&this.root.ownerDocument.defaultView?.cancelAnimationFrame(this.frame),this.resize?.disconnect(),this.mutations?.disconnect();for(const t of[...this.moved.keys()])this.restore(t);this.sheet.remove(),delete this.root.dataset.l3dLayout}}export{it as B,ft as C,ot as E,mt as H,ht as I,J as Q,gt as S,dt as U,Z as a,st as b,pt as c,bt as d,at as e,p as f,tt as g,Q as h,X as i,ut as j,nt as k,et as l,E as m,xt as n,ct as o,lt as p,rt as q,Y as s};
