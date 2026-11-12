const e=`
:root{--bg0:#eef2f8;--bg1:#f7f9fc;--panel:#ffffff;--panel2:#f3f5fa;--line:#e3e8f1;--line2:#d2d9e6;--gold:#ffb938;--gold2:#ffc53d;--red:#e5484d;--teal:#12b886;--blue:#2a66d6;--ink:#2b3350;--muted:#5f6886;--green:#17834a;--shadow:0 .5rem 1.4rem #2b335022,0 .12rem .3rem #2b335014;--font:"PingFang TC","Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif;--serif:var(--font);--spring:cubic-bezier(.2,1.7,.35,1);--out:cubic-bezier(.2,.9,.25,1);color-scheme:light}
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:clip;background:var(--bg0);color:var(--ink);font:600 16px/1.45 var(--font);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;overscroll-behavior:none}
html{font-size:clamp(10px,min(1.2vw,2.05vh),18px)}
button{font:inherit;color:inherit}
button:focus-visible,[tabindex]:focus-visible{outline:.2rem solid var(--blue);outline-offset:.2rem}
[hidden]{display:none!important}
#app{position:fixed;inset:0;overflow:clip;background:radial-gradient(120% 80% at 50% 0%,#ffffff 0%,var(--bg1) 40%,var(--bg0) 100%)}
.scr{position:absolute;inset:0;display:none}
.scr.on{display:block;animation:scr-in .45s var(--out)}
@keyframes scr-in{from{opacity:0;transform:scale(1.015)}}
.stars{display:none}
.motes{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.motes i{position:absolute;bottom:-2rem;width:.6rem;height:.6rem;border-radius:50%;background:#ffffff;box-shadow:0 0 .6rem #ffffffcc;animation:mote 9s linear infinite;opacity:.8}
.motes i:nth-child(2n){left:18%;animation-duration:12s;animation-delay:-3s;background:#ffe9a8}.motes i:nth-child(3n){left:46%;animation-duration:10s;animation-delay:-6s}.motes i:nth-child(4n){left:74%;animation-duration:14s;animation-delay:-1s;background:#d6e8ff}.motes i:nth-child(5n){left:88%;animation-delay:-8s}.motes i:nth-child(1){left:8%}
@keyframes mote{to{transform:translate(3rem,-110vh);opacity:0}}

/* ---- 按鈕：扁平、圓潤、底下一條深色邊，按下去會彈 ---- */
.btn{--b1:#ffd25e;--b2:#ffc53d;--b3:#e09a12;--bt:#3d2a00;position:relative;display:inline-flex;align-items:center;justify-content:center;gap:.5em;min-height:2.9rem;padding:.6em 1.4em;border:0;border-radius:1.1rem;background:linear-gradient(180deg,var(--b1),var(--b2) 55%);color:var(--bt);font-weight:900;font-size:1.05rem;letter-spacing:.04em;box-shadow:0 .28rem 0 var(--b3),0 .5rem 1rem #2b33502e,inset 0 .14rem 0 #ffffff80;cursor:pointer;transition:transform .4s var(--spring),box-shadow .12s,filter .2s;white-space:nowrap}
.btn .cri{width:1.25em;height:1.25em}
.btn:hover{transform:translateY(-.15rem) scale(1.045)}
.btn:active{transform:translateY(.22rem) scale(.97);box-shadow:0 .06rem 0 var(--b3),0 .2rem .4rem #2b33502e,inset 0 .14rem 0 #ffffff80;transition-duration:.08s}
.btn.blue{--b1:#3d7be6;--b2:#2a66d6;--b3:#1c4a9e;--bt:#fff}
.btn.purple{--b1:#3d7be6;--b2:#2a66d6;--b3:#1c4a9e;--bt:#fff}
.btn.red{--b1:#e5484d;--b2:#d93a3a;--b3:#a32323;--bt:#fff}
.btn.green{--b1:#1f9455;--b2:#17834a;--b3:#0f5c33;--bt:#fff}
.btn.ghost{--b1:#ffffff;--b2:#ffffff;--b3:#d2d9e6;--bt:#2b3350;box-shadow:0 .28rem 0 var(--b3),0 .5rem 1rem #2b33501f,inset 0 0 0 .12rem #e3e8f1}
.btn.ghost:active{box-shadow:0 .06rem 0 var(--b3),inset 0 0 0 .12rem #e3e8f1}
.btn.small{min-height:2.3rem;padding:.35em .95em;font-size:.9rem;border-radius:.85rem}
.btn.big{min-height:3.6rem;padding:.7em 2.2em;font-size:1.3rem;border-radius:1.35rem}
.btn:disabled{background:#e9edf4;color:#5f6886;box-shadow:0 .2rem 0 #d2d9e6;cursor:not-allowed;transform:none}
.btn.pulse{animation:btn-pulse 1.6s ease-in-out infinite}
@keyframes btn-pulse{50%{box-shadow:0 .28rem 0 var(--b3),0 0 0 .45rem color-mix(in srgb,var(--b2) 28%,transparent),inset 0 .14rem 0 #ffffff80}}
.icon-btn{display:grid;place-items:center;width:2.7rem;height:2.7rem;padding:0;border:0;border-radius:.9rem;background:#fff;color:var(--ink);cursor:pointer;transition:transform .35s var(--spring),background .2s;box-shadow:0 .22rem 0 #d2d9e6,var(--shadow)}
.icon-btn:hover{transform:scale(1.08);background:#f7f9fc}
.icon-btn:active{transform:scale(.94)}
.icon-btn .cri{width:1.35rem;height:1.35rem}
.panel{background:#fff;border:0;border-radius:1.6rem;box-shadow:0 .35rem 0 #e3e8f1,0 1.2rem 3rem #2b335026}
.tag{display:inline-flex;align-items:center;gap:.3em;padding:.2em .7em;border-radius:99rem;background:var(--panel2);color:var(--muted);font-size:.78rem;font-weight:800}

/* ---- 標題 ---- */
.scr-title{display:none;text-align:center}
.scr-title.on{display:grid;place-items:center}
.title-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.title-bg+.title-moon{display:none}
.title-moon{position:absolute;left:50%;top:8%;width:min(30vh,34vw);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:#fff3c4;box-shadow:0 0 0 1.2rem #fff3c455,0 0 0 2.6rem #fff3c422;animation:moon 7s ease-in-out infinite alternate}
@keyframes moon{to{transform:translateX(-50%) translateY(.8rem)}}
.title-tower{display:none}
.title-box{position:relative;z-index:2;display:grid;justify-items:center;gap:.9rem;margin-top:8vh;padding:2rem 2.6rem 2.2rem;border-radius:2rem;background:#ffffffeb;box-shadow:0 .4rem 0 #e3e8f1,0 1.4rem 3rem #2b335026}
.title-box h1{margin:0;font:900 clamp(2.4rem,6vw,4.6rem)/1.1 var(--font);letter-spacing:.1em;color:var(--ink);text-shadow:0 .25rem 0 #ffc53d}
.title-box p{margin:0;color:var(--muted);font-weight:800;letter-spacing:.2em}
.title-actions{display:grid;gap:.85rem;margin-top:1rem;min-width:16rem}
.title-foot{position:absolute;left:50%;bottom:1.2rem;transform:translateX(-50%);padding:.25rem .9rem;border-radius:99rem;background:#ffffffd9;color:var(--muted);font-size:.78rem;font-weight:800;letter-spacing:.15em;white-space:nowrap}
.title-actions .btn{width:100%}

/* ---- 頂部狀態列：白色膠囊 ---- */
.hud{position:absolute;z-index:30;left:0;right:0;top:0;display:flex;align-items:center;gap:.7rem;padding:.6rem calc(1rem + var(--host-right,0px)) .6rem 1rem;pointer-events:none}
.hud>*{pointer-events:auto}
.hud-hero{display:flex;align-items:center;gap:.55rem;min-width:0;padding:.25rem .9rem .25rem .25rem;border-radius:99rem;background:#fff;box-shadow:var(--shadow)}
.hud-face{width:2.6rem;height:2.6rem;border-radius:50%;overflow:hidden;border:.16rem solid var(--hero,#e5484d);background:var(--panel2);flex:none}
.hud-face img{width:100%;height:100%;object-fit:cover;object-position:50% 15%}
.hud-name{display:grid;line-height:1.15;min-width:0}
.hud-name strong{font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hud-name small{color:var(--muted);font-size:.72rem;font-weight:800}
.hud-stat{display:flex;align-items:center;gap:.35rem;flex:none;white-space:nowrap;padding:.35rem .8rem;border-radius:99rem;background:#fff;box-shadow:var(--shadow);font-weight:900;font-variant-numeric:tabular-nums}
.hud-stat .cri{width:1.25rem;height:1.25rem}
.hud-party{border:0;color:var(--ink);font:inherit;font-weight:900;cursor:pointer;transition:transform .2s var(--spring)}
.hud-party:hover:not(:disabled){transform:translateY(-.1rem)}
.hud-party:focus-visible{outline:.16rem solid #2a66d6;outline-offset:.12rem}
.hud-party:disabled{cursor:default;opacity:.62}
.hud-hp .cri{color:#e5484d}.hud-gold .cri{color:#e09a12}
.hud-gold.bump{animation:bump .5s var(--spring)}
@keyframes bump{40%{transform:scale(1.25)}}
.hud-potions{display:flex;gap:.3rem;padding:.25rem;border-radius:99rem;background:#fff;box-shadow:var(--shadow)}
.potion-slot{position:relative;display:grid;place-items:center;width:2.3rem;height:2.3rem;padding:0;border-radius:50%;border:.12rem dashed #c3cbdb;background:var(--panel2);cursor:pointer;transition:transform .3s var(--spring)}
.potion-slot.full{border:0;background:color-mix(in srgb,var(--pc,#ff6b3d) 16%,#fff)}
.potion-slot.full:hover{transform:scale(1.12) rotate(-6deg)}
.potion-slot img{width:86%;height:86%;object-fit:contain}
.potion-slot .cri{width:1.4rem;height:1.4rem;color:var(--pc,#ff6b3d)}
.hud-relics{display:flex;flex-wrap:wrap;align-content:flex-start;gap:.25rem;flex:1;min-width:0;padding:.2rem}
.relic{position:relative;flex:none;display:grid;place-items:center;width:2.5rem;height:2.5rem;padding:0;border:0;border-radius:50%;background:#fff;box-shadow:0 .15rem 0 #d2d9e6,0 .3rem .6rem #2b33501f;cursor:help;transition:transform .35s var(--spring)}
.relic:hover{transform:scale(1.15)}
.relic img{width:86%;height:86%;object-fit:contain}
.relic .cri{width:1.35rem;height:1.35rem;color:#e09a12}
.relic b{position:absolute;right:-.2rem;bottom:-.2rem;min-width:1.1rem;height:1.1rem;padding:0 .2rem;border-radius:99rem;background:var(--ink);color:#fff;font-size:.65rem;line-height:1.1rem;text-align:center}
.relic.flash{animation:relic-flash .7s var(--spring)}
@keyframes relic-flash{30%{transform:scale(1.5);box-shadow:0 0 0 .3rem #ffc53d,0 0 1.2rem #ffc53d}}
.hud-floor{padding:.4rem .8rem;border-radius:99rem;background:#fff;box-shadow:var(--shadow);color:var(--muted);font-weight:900;font-size:.85rem;white-space:nowrap}
.hud-right{display:flex;align-items:center;gap:.45rem;margin-left:auto}
.hud-deck{position:relative}
.hud-deck b{position:absolute;right:-.35rem;bottom:-.35rem;min-width:1.3rem;height:1.3rem;padding:0 .25rem;border-radius:99rem;background:var(--blue);color:#fff;font-size:.72rem;line-height:1.3rem;font-weight:900}

/* ---- 地圖：白色圓角卡片、圓形房間鈕 ---- */
.scr-map{overflow:clip}
.map-scroll{position:absolute;inset:var(--hud-h,4.3rem) 0 0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scroll-behavior:smooth}
.map-paper{position:relative;width:min(46rem,94vw);margin:.6rem auto 3rem;border-radius:1.8rem;background:#fff;box-shadow:0 .4rem 0 #e3e8f1,0 1.4rem 3rem #2b33501f;color:var(--ink)}
.map-paper::before{content:'';position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle,#dfe5f0 .09rem,transparent .1rem) 0 0/1.6rem 1.6rem;opacity:.9;pointer-events:none}
.map-head{position:sticky;top:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.4rem .7rem;border-radius:1.8rem 1.8rem 0 0;background:linear-gradient(180deg,#fff,#fffffff2 70%,#fff0)}
.map-head h2{margin:0;font:900 1.4rem/1.2 var(--font);color:var(--ink);letter-spacing:.06em}
.map-head small{color:var(--muted);font-weight:800}
.map-legend{display:flex;flex-wrap:wrap;gap:.35rem .7rem;font-size:.75rem;font-weight:800;color:var(--muted)}
.map-legend span{display:flex;align-items:center;gap:.2rem}.map-legend .cri{width:1rem;height:1rem}
.map-board{position:relative;margin:0 1rem}
.map-paper.has-bg::before{display:none}
.map-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;pointer-events:none}
.map-paper.has-bg .map-head{background:linear-gradient(180deg,#fffffff2,#ffffffd9 70%,#fff0)}
.node.own-icon{overflow:visible}
.node-img{width:78%;height:78%;object-fit:contain;pointer-events:none;filter:drop-shadow(0 .1rem 0 #fff)}
.map-legend img{width:1rem;height:1rem;object-fit:contain}
.map-lines{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.map-lines path{fill:none;stroke:#c3cbdb;stroke-width:3;stroke-dasharray:2 9;stroke-linecap:round}
.map-lines path.done{stroke:#2a66d6;stroke-dasharray:none;stroke-width:4}
.map-lines path.next{stroke:#ffb938;stroke-width:4;stroke-dasharray:2 8;animation:dash 1s linear infinite}
@keyframes dash{to{stroke-dashoffset:-18}}
.node{position:absolute;display:grid;place-items:center;width:3.3rem;height:3.3rem;margin:-1.65rem 0 0 -1.65rem;padding:0;border:0;border-radius:50%;background:#fff;color:#5f6886;box-shadow:0 .22rem 0 #d2d9e6,0 .4rem .8rem #2b33501f,inset 0 0 0 .14rem #e3e8f1;cursor:default;transition:transform .45s var(--spring)}
.node .cri{width:1.75rem;height:1.75rem}
.node[data-kind=fight]{color:#5f6886}.node[data-kind=elite]{color:#d93a3a;background:#fff1f0}.node[data-kind=boss]{width:5.4rem;height:5.4rem;margin:-2.7rem 0 0 -2.7rem;color:#fff;background:#e5484d;box-shadow:0 .3rem 0 #a32323,0 .6rem 1.2rem #e5484d55}
.node[data-kind=boss] .cri{width:3rem;height:3rem}
.map-board.sized .node{width:calc(3.3rem*var(--node-scale));height:calc(3.3rem*var(--node-scale));margin:calc(-1.65rem*var(--node-scale)) 0 0 calc(-1.65rem*var(--node-scale))}
.map-board.sized .node .cri{width:calc(1.75rem*var(--node-scale));height:calc(1.75rem*var(--node-scale))}
.map-board.sized .node[data-kind=boss]{width:calc(5.4rem*var(--node-scale));height:calc(5.4rem*var(--node-scale));margin:calc(-2.7rem*var(--node-scale)) 0 0 calc(-2.7rem*var(--node-scale))}
.map-board.sized .node[data-kind=boss] .cri{width:calc(3rem*var(--node-scale));height:calc(3rem*var(--node-scale))}
.node[data-kind=rest]{color:#d9480f;background:#fff4e6}.node[data-kind=shop]{color:#1c64c8;background:#eef4ff}.node[data-kind=treasure]{color:#b35c00;background:#fff8db}.node[data-kind=event]{color:#0b7285;background:#e6fcf5}
.node.done{opacity:.55;box-shadow:0 .1rem 0 #d2d9e6,inset 0 0 0 .14rem #2a66d6}
.node.done::after{content:'';position:absolute;inset:-.25rem;border-radius:50%;border:.2rem solid #2a66d6}
.node.here{opacity:1;box-shadow:0 0 0 .3rem #fff,0 0 0 .5rem #2a66d6,0 .4rem 1rem #2a66d655}
.node.can{cursor:pointer;animation:node-bob 1.4s ease-in-out infinite;box-shadow:0 .22rem 0 #e09a12,0 0 0 .25rem #ffc53d,0 .5rem 1.2rem #ffb93877}
.node.can:hover{transform:scale(1.22);animation:none}
.node.can:active{transform:scale(1.05)}
@keyframes node-bob{50%{transform:translateY(-.3rem) scale(1.08)}}
.node.voted{box-shadow:0 .22rem 0 #d2d9e6,0 0 0 .35rem var(--vote,#2a66d6),0 0 1.2rem var(--vote,#2a66d6)}
.node-votes{position:absolute;left:50%;bottom:-1rem;transform:translateX(-50%);display:flex;gap:.15rem}
.node-votes i{width:.8rem;height:.8rem;border-radius:50%;background:var(--c);box-shadow:0 0 0 .12rem #fff}
.map-avatar{position:absolute;width:2.4rem;height:2.4rem;margin:-3.4rem 0 0 -1.2rem;border-radius:50%;overflow:hidden;border:.18rem solid #fff;box-shadow:0 .3rem .6rem #2b335040;transition:left .7s var(--out),top .7s var(--out);pointer-events:none;background:var(--panel2)}
.map-avatar img{width:100%;height:100%;object-fit:cover;object-position:50% 15%}
.map-wait{position:fixed;left:50%;bottom:1.2rem;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:.7rem;max-width:calc(100vw - 2rem);padding:.6rem 1.1rem;border-radius:99rem;background:var(--ink);color:#fff;font-weight:800;box-shadow:var(--shadow)}

/* ---- 戰鬥 ---- */
.scr-battle{overflow:clip}
.bt-bg{position:absolute;inset:0;background:linear-gradient(180deg,#cfe6ff 0%,#eaf4ff 55%,#e6f3df 56%,#d5ebc9 100%);background-size:cover;background-position:center}
.bt-bg img{width:100%;height:100%;object-fit:cover}
.bt-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#ffffff26,transparent 22%,transparent 60%,#eef2f8d9 84%,#eef2f8 100%)}
.bt-floor{position:absolute;left:-10%;right:-10%;top:58%;height:30%;background:radial-gradient(60% 40% at 50% 20%,#ffffff40,transparent 70%);pointer-events:none}
.bt-stage{position:absolute;left:0;right:0;top:max(18%,calc(var(--hud-h,0px) + 3rem));bottom:32%;display:flex;justify-content:space-between;align-items:flex-end;padding:0 6%}
.bt-side{position:relative;display:flex;align-items:flex-end;gap:1.5rem;height:100%}
.bt-enemies{justify-content:flex-end;gap:2.2rem}
.unit{--sz:15rem;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:var(--sz);height:100%;transition:filter .3s,opacity .5s}
.bt-players .unit{--sz:16rem}
.bt-players[data-n="2"] .unit{--sz:13rem}.bt-players[data-n="3"] .unit,.bt-players[data-n="4"] .unit{--sz:10.5rem}
.bt-players[data-n="3"],.bt-players[data-n="4"]{gap:.4rem}
.bt-enemies[data-n="3"] .unit{--sz:12rem}.bt-enemies[data-n="4"] .unit{--sz:10rem}.bt-enemies[data-n="5"] .unit{--sz:9rem}
.bt-enemies[data-n="6"] .unit{--sz:7.8rem}.bt-enemies[data-n="7"] .unit,.bt-enemies[data-n="8"] .unit{--sz:6.8rem}
.bt-enemies[data-n="5"]{gap:1rem}.bt-enemies[data-n="6"],.bt-enemies[data-n="7"],.bt-enemies[data-n="8"]{gap:.35rem}
.bt-enemies .unit.gone{display:none}
.unit-figure{position:relative;flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center;min-height:0;transform-origin:50% 100%}
.unit-figure img{position:relative;max-width:100%;max-height:100%;object-fit:contain;transform:translate(var(--lx,0),var(--ly,0)) scale(var(--ls,1)) scaleX(var(--lf,1));transform-origin:50% 100%;filter:drop-shadow(0 .35rem .4rem #2b335033);pointer-events:none}
.unit-figure .aura{position:absolute;left:10%;right:10%;bottom:5%;height:55%;border-radius:50%;background:radial-gradient(closest-side,var(--aura,#ffffff66),transparent);filter:blur(.6rem);opacity:.55}
.unit.breathe .unit-figure{animation:breathe 3.6s ease-in-out infinite}
@keyframes breathe{50%{transform:scaleY(1.018) scaleX(.992)}}
.unit-emblem{display:grid;place-items:center;width:70%;aspect-ratio:1;border-radius:50%;background:var(--c,#8d95a8);box-shadow:0 .4rem 0 color-mix(in srgb,var(--c,#8d95a8) 70%,#000),0 1rem 1.6rem #2b335033,inset 0 0 0 .3rem #ffffff55;color:#fff;margin-bottom:8%}
.unit-emblem .cri{width:50%;height:50%}
.unit-shadow{position:absolute;bottom:-.3rem;left:18%;right:18%;height:1rem;border-radius:50%;background:radial-gradient(closest-side,#2b335040,transparent)}
.unit-plate{position:relative;width:min(100%,12rem);margin-top:.5rem;display:grid;gap:.3rem;justify-items:center}
.unit-name{padding:.12rem .7rem;border-radius:99rem;background:#fff;color:var(--ink);font-weight:900;font-size:.85rem;box-shadow:0 .15rem 0 #d2d9e6;white-space:nowrap}
.hpbar{position:relative;width:100%;height:1.25rem;border-radius:99rem;background:#dfe4ee;box-shadow:0 0 0 .18rem #fff,0 .25rem .5rem #2b335026;overflow:hidden}
.hpbar i{position:absolute;left:0;top:0;bottom:0;border-radius:inherit}
.hpbar .ghost{background:#ffd8d8;transition:width .9s .35s var(--out)}
.hpbar .fill{background:#f25c5c;box-shadow:inset 0 .25rem 0 #ffffff40;transition:width .35s var(--out)}
.unit.has-block .hpbar .fill{background:#3d8bfd}
.unit.poisoned .hpbar .fill{background:#40c057}
.hpbar span{position:absolute;inset:0;display:grid;place-items:center;font-size:.78rem;font-weight:900;color:#fff;-webkit-text-stroke:.14rem #2b3350;paint-order:stroke;font-variant-numeric:tabular-nums;white-space:nowrap}
.unit-block{position:absolute;left:-1.6rem;top:50%;display:grid;place-items:center;width:2.4rem;height:2.6rem;transform:translateY(-50%) scale(0);transition:transform .45s var(--spring)}
.unit-block .cri{position:absolute;inset:0;width:100%;height:100%;color:#1c4a9e;filter:drop-shadow(0 .12rem 0 #fff)}
.unit-block .cri path{fill:#2a66d6}
.unit-block b{position:relative;color:#fff;font-size:.9rem;font-weight:900;white-space:nowrap;font-variant-numeric:tabular-nums}
.unit .unit-block b.long{font-size:.68rem;-webkit-text-stroke:.14rem #1c4a9e;paint-order:stroke}
.unit-block:has(b.long){z-index:2}
.unit.has-block .unit-block{transform:translateY(-50%) scale(1)}
.unit-block[data-left]::after{content:attr(data-left);position:absolute;left:-.3rem;bottom:-.2rem;min-width:.9rem;height:.9rem;padding:0 .15rem;border-radius:99rem;background:#fff;color:#1c4a9e;box-shadow:inset 0 0 0 .09rem #1c4a9e;font-size:.56rem;line-height:.9rem;font-weight:900;text-align:center;font-variant-numeric:tabular-nums}
.unit-status{display:flex;flex-wrap:wrap;justify-content:center;gap:.25rem;min-height:1.6rem}
.st-ico{position:relative;display:grid;place-items:center;width:1.7rem;height:1.7rem;border-radius:.5rem;background:#fff;color:var(--sc,#5f6886);box-shadow:0 .15rem 0 #d2d9e6;cursor:help;animation:st-in .4s var(--spring)}
.st-ico .cri{width:1.1rem;height:1.1rem}
.st-ico b{position:absolute;right:-.35rem;bottom:-.35rem;min-width:1rem;height:1rem;padding:0 .2rem;border-radius:99rem;background:var(--ink);color:#fff;font-size:.62rem;line-height:1rem;font-weight:900;text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}
.st-ico .st-left{position:absolute;left:-.35rem;top:-.35rem;min-width:.9rem;height:.9rem;padding:0 .15rem;border-radius:99rem;background:#fff;color:#2b3350;box-shadow:inset 0 0 0 .09rem #2b3350;font-size:.56rem;line-height:.9rem;font-style:normal;font-weight:900;text-align:center;font-variant-numeric:tabular-nums}
.st-ico.power{--sc:#b35c00;border-radius:50%}
@keyframes st-in{from{transform:scale(0)}}
.unit-intent{position:absolute;top:-.4rem;left:50%;z-index:3;display:flex;align-items:center;gap:.25rem;padding:.25rem .7rem .25rem .4rem;border-radius:99rem;background:#fff;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .8rem #2b335026;transform:translateX(-50%);animation:intent-bob 2s ease-in-out infinite;cursor:help;white-space:nowrap}
.unit-intent .cri{width:1.7rem;height:1.7rem}
.unit-intent b{font-size:1.1rem;font-weight:900;color:var(--ink);font-variant-numeric:tabular-nums}
.unit-intent small{font-size:.75rem;color:var(--muted);font-weight:900}
.unit-intent[data-kind^=attack] .cri{color:#d93a3a}.unit-intent[data-kind=defend] .cri,.unit-intent[data-kind=defendBuff] .cri{color:#2a66d6}.unit-intent[data-kind=buff] .cri{color:#b35c00}.unit-intent[data-kind=debuff] .cri,.unit-intent[data-kind=curse] .cri{color:#0b7285}.unit-intent[data-kind=heal] .cri{color:#17834a}
.unit-intent .who{width:1.2rem;height:1.2rem;border-radius:50%;background:var(--c);box-shadow:0 0 0 .12rem #fff,0 0 0 .22rem #d2d9e6;margin-left:.15rem}
@keyframes intent-bob{50%{transform:translateX(-50%) translateY(-.3rem)}}
.unit.targetable{cursor:crosshair}
.bt-enemies .unit.back .unit-figure{scale:.86}
.unit-row{padding:.05rem .55rem;border-radius:99rem;background:#2b3350;color:#fff;font-size:.68rem;font-weight:900;white-space:nowrap}
.unit-bond{padding:.05rem .55rem;border-radius:99rem;background:#6a3fb0;color:#fff;font-size:.68rem;font-weight:900;white-space:nowrap;cursor:help}
.unit-bond.waiting{background:#fff;color:#5b3596;box-shadow:inset 0 0 0 .1rem #6a3fb0}
.unit.dead:has(.unit-bond.waiting){opacity:.55;filter:grayscale(1)}
.unit-lock{position:absolute;left:50%;top:42%;z-index:4;display:none;flex-direction:column;align-items:center;gap:.3rem;transform:translate(-50%,-50%);pointer-events:none}
.unit.locked .unit-lock{display:flex}
.unit.locked{cursor:not-allowed}
.unit.locked .unit-figure img,.unit.locked .unit-emblem{filter:grayscale(.6) opacity(.65)}
.unit-lock .cri{width:2.4rem;height:2.4rem;padding:.45rem;border-radius:50%;background:#fff;color:#2b3350;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .8rem #2b335033}
.unit-lock b{padding:.15rem .6rem;border-radius:99rem;background:#fff;color:#2b3350;font-size:.78rem;font-weight:900;white-space:nowrap;box-shadow:0 .15rem 0 #d2d9e6}
.bt-players .unit.targetable .unit-figure img,.bt-players .unit.targetable .unit-emblem{filter:drop-shadow(0 0 .5rem #2fb47a99)}
.bt-players .unit.aimed .unit-figure img,.bt-players .unit.aimed .unit-emblem{filter:drop-shadow(0 0 .2rem #fff) drop-shadow(0 0 .9rem #17834a) brightness(1.06)}
.bt-players .unit.aimed::before{border-color:#17834a}
.unit.aimed .unit-figure img,.unit.aimed .unit-emblem{filter:drop-shadow(0 0 .2rem #fff) drop-shadow(0 0 .9rem #e5484d) brightness(1.06)}
.unit.aimed::before{content:'';position:absolute;left:50%;bottom:4.5rem;width:70%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;border:.25rem dashed #e5484d;animation:reticle 4s linear infinite;pointer-events:none}
@keyframes reticle{to{transform:translateX(-50%) rotate(360deg)}}
.unit.hit .unit-figure{animation:hit .38s ease-out}
.unit.hit .unit-figure img{filter:drop-shadow(0 .35rem .4rem #2b335033) brightness(1.6) sepia(.6) hue-rotate(-30deg) saturate(4)}
@keyframes hit{20%{transform:translateX(-.9rem) rotate(-2deg)}45%{transform:translateX(.6rem)}70%{transform:translateX(-.3rem)}}
.unit.lunge-r .unit-figure{animation:lunge-r .5s var(--out)}
.unit.lunge-l .unit-figure{animation:lunge-l .5s var(--out)}
@keyframes lunge-r{35%{transform:translateX(3.5rem) scale(1.06)}}
@keyframes lunge-l{35%{transform:translateX(-3.5rem) scale(1.06)}}
.unit.cast .unit-figure{animation:cast .55s var(--spring)}
@keyframes cast{40%{transform:translateY(-.8rem) scale(1.04)}}
.unit.posing .unit-figure img,.unit.posing .unit-emblem{animation:pose-in .5s var(--spring)}
@keyframes pose-in{from{opacity:.2;scale:.8}to{opacity:1;scale:1}}
.unit.dead{opacity:0;filter:blur(.4rem) grayscale(1);transform:translateY(1rem);transition:opacity .8s .2s,filter .8s,transform .8s;pointer-events:none}
.unit.down .unit-figure{filter:grayscale(1) opacity(.55);transform:rotate(-8deg) translateY(1rem)}
.unit.ended .unit-plate::after{content:'✓';position:absolute;right:-1.6rem;top:-1.6rem;display:grid;place-items:center;width:1.6rem;height:1.6rem;border-radius:50%;background:#17834a;color:#fff;font-weight:900;box-shadow:0 0 0 .14rem #fff}
.unit-me{position:absolute;top:-1.7rem;left:50%;transform:translateX(-50%);padding:.1rem .55rem;border-radius:99rem;background:var(--c);color:#2b3350;font-size:.7rem;font-weight:900;box-shadow:0 .15rem 0 #2b335033,0 0 0 .14rem #fff;white-space:nowrap}
.unit-handc{position:absolute;right:-.4rem;top:-1.7rem;display:flex;align-items:center;gap:.15rem;padding:.1rem .45rem;border-radius:99rem;background:#fff;color:var(--ink);box-shadow:0 .15rem 0 #d2d9e6;font-size:.72rem;font-weight:900}
.unit-handc .cri{width:.9rem;height:.9rem}
.unit.party-pick{cursor:pointer}
.unit.party-on .unit-me{outline:.14rem solid #2b3350;outline-offset:.06rem}
.unit.party-on .hpbar{box-shadow:0 0 0 .16rem #2b3350}

/* 手牌區自成一層：出牌飛到中間時再高的 z-index 也只在這一層裡比，大字、演出、彈出視窗一律在它前面。 */
.bt-bottom{position:absolute;left:0;right:0;bottom:0;height:39%;pointer-events:none;z-index:20}
.bt-bottom>*{pointer-events:auto}
.bt-hand{position:absolute;left:13%;right:13%;bottom:0;height:100%;pointer-events:none}
.hcard{position:absolute;left:0;top:0;font-size:var(--cs,12.6px);transform-origin:50% 100%;will-change:transform;pointer-events:auto;cursor:grab;touch-action:none}
.hcard.dragging{cursor:grabbing}
.hcard .crc-body{transition:box-shadow .25s}
.hcard.playable .crc-body{box-shadow:0 .5em 1.2em #2b335033,0 0 0 .2em #40c057,0 0 1.2em #40c05799}
.hcard.unplayable .crc-body{filter:saturate(.55) brightness(.94)}
.hcard.sealed .crc-body{filter:grayscale(.85) brightness(.82)}
.hc-seal{position:absolute;left:0;top:0;z-index:4;width:12.5em;height:17.5em;box-sizing:border-box;padding-top:1.9em;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:.35em;border-radius:1.1em;background:repeating-linear-gradient(135deg,#1d234026 0 .7em,#1d234040 .7em 1.4em);color:#fff;pointer-events:none;text-align:center}
.hc-seal .cri{width:3em;height:3em;padding:.5em;border-radius:50%;background:#a61e1e;color:#fff;box-shadow:0 .2em 0 #6b1010,0 .4em .9em #0006}
.hc-seal-tag{display:flex;align-items:stretch;border-radius:.5em;overflow:hidden;box-shadow:0 .15em 0 #6b1010,0 .3em .7em #0005;white-space:nowrap}
.hc-seal b{padding:.15em .55em;background:#a61e1e;color:#fff;font-size:1.05em;font-weight:900;letter-spacing:.06em}
.hc-seal small{display:flex;align-items:center;padding:.15em .55em;background:#fff;color:#a61e1e;font-size:.95em;font-weight:800}
.hcard.selected .crc-body{box-shadow:0 .5em 1.2em #2b335033,0 0 0 .24em #ffc53d,0 0 1.6em #ffb938}
.hcard.ready .crc-body{box-shadow:0 0 0 .24em #ffc53d,0 0 2.2em #ffb938}
.bt-energy{position:absolute;left:3%;bottom:calc(2.5% + 6.2rem);display:grid;place-items:center;width:6.4rem;height:6.4rem;border-radius:50%;background:radial-gradient(circle at 50% 30%,#ffd25e,#ffb938 70%);box-shadow:0 0 0 .4rem #fff,0 .55rem 0 .4rem #e3e8f1,0 1rem 2rem #2b335033,inset 0 -.45rem 0 #e09a12;pointer-events:auto}
.bt-energy::before{content:'';position:absolute;inset:-1rem;border-radius:50%;border:.18rem dashed #ffb938aa;animation:spin 14s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.bt-energy b{font-size:2.5rem;font-weight:900;line-height:1;color:#fff;-webkit-text-stroke:.18rem #3d2a00;paint-order:stroke;font-variant-numeric:tabular-nums}
.bt-energy b.long{font-size:1.45rem;-webkit-text-stroke-width:.14rem;white-space:nowrap}
.bt-energy small{position:absolute;bottom:1rem;font-size:.8rem;font-weight:900;color:#3d2a00}
.bt-energy.empty{background:#e9edf4;box-shadow:0 0 0 .4rem #fff,0 .55rem 0 .4rem #e3e8f1,inset 0 -.45rem 0 #d2d9e6}
.bt-energy.empty b{color:#e9edf4;-webkit-text-stroke-color:#5f6886}.bt-energy.empty small{color:#5f6886}
.bt-energy.bump{animation:bump .5s var(--spring)}
.bt-pile{position:absolute;bottom:2.5%;display:grid;place-items:center;width:4.4rem;height:4.4rem;padding:0;border:0;border-radius:1.1rem;background:#fff;box-shadow:0 .25rem 0 #d2d9e6,var(--shadow);cursor:pointer;transition:transform .35s var(--spring)}
.bt-pile:hover{transform:scale(1.1)}
.bt-pile .cri{width:2rem;height:2rem;color:var(--blue)}
.bt-pile b{position:absolute;right:-.4rem;bottom:-.4rem;min-width:1.6rem;height:1.6rem;padding:0 .3rem;border-radius:99rem;background:var(--ink);color:#fff;font-size:.85rem;line-height:1.6rem;font-weight:900;text-align:center;box-shadow:0 0 0 .14rem #fff}
.bt-draw{left:2.2%}.bt-discard{right:2.2%}.bt-exhaust{right:8.4%;width:3.4rem;height:3.4rem}.bt-exhaust .cri{color:#d9480f}
.bt-pile.bump{animation:bump .45s var(--spring)}
.bt-end{position:absolute;right:2.6%;bottom:calc(2.5% + 5.8rem);min-width:9.5rem}
.bt-coop{position:absolute;right:1rem;top:calc(var(--hud-h,4.3rem) - .1rem);display:grid;gap:.3rem;z-index:5}
.bt-turn{position:absolute;left:50%;top:calc(var(--hud-h,4.3rem) - .1rem);transform:translateX(-50%);padding:.3rem 1rem;border-radius:99rem;background:#fff;color:var(--ink);box-shadow:var(--shadow);font-weight:900;font-size:.85rem;z-index:5}
.bt-queue{position:absolute;left:50%;top:calc(var(--hud-h,4.3rem) + 1.95rem);transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:.3rem;max-width:min(36rem,92vw);margin:0;padding:0;list-style:none;pointer-events:none;z-index:5}
.bt-queue li{display:flex;align-items:center;gap:.3rem;padding:.18rem .55rem .18rem .2rem;border-radius:99rem;background:#fff;color:var(--ink);box-shadow:var(--shadow);font-size:.74rem;font-weight:800;white-space:nowrap}
.bt-queue li b{display:grid;place-items:center;min-width:1.15rem;height:1.15rem;border-radius:50%;background:var(--c);color:#2b3350;font-size:.68rem;font-weight:900}
.bt-queue li span{color:var(--muted);font-weight:700}
.bt-arrow{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:60;overflow:visible}
.bt-arrow path{fill:none;stroke:#2a66d6;stroke-width:9;stroke-linecap:round;stroke-dasharray:1 16;filter:drop-shadow(0 0 0 #fff) drop-shadow(0 .12rem 0 #fff);animation:dash 0.6s linear infinite}
.bt-arrow.hot path{stroke:#e5484d}
.bt-arrow polygon{fill:#2a66d6;stroke:#fff;stroke-width:3;stroke-linejoin:round}
.bt-arrow.hot polygon{fill:#e5484d}
.bt-arrow.friendly path{stroke:#17834a}.bt-arrow.friendly polygon{fill:#17834a}
/* 月圓之夜的排版：沒有主角立繪，敵人站在中間；玩家是左下角的小卡（頭像、生命、格擋、狀態），多人時一人一張。 */
#s-battle[data-layout=moon] .bt-stage{justify-content:center}
#s-battle[data-layout=moon] .bt-enemies{justify-content:center;gap:3rem}
#s-battle[data-layout=moon] .bt-enemies .unit{--sz:18rem}
#s-battle[data-layout=moon] .bt-enemies[data-n="3"] .unit{--sz:14rem}#s-battle[data-layout=moon] .bt-enemies[data-n="4"] .unit,#s-battle[data-layout=moon] .bt-enemies[data-n="5"] .unit{--sz:11rem}
#s-battle[data-layout=moon] .bt-enemies[data-n="5"]{gap:1.5rem}#s-battle[data-layout=moon] .bt-enemies[data-n="6"],#s-battle[data-layout=moon] .bt-enemies[data-n="7"],#s-battle[data-layout=moon] .bt-enemies[data-n="8"]{gap:.6rem}
#s-battle[data-layout=moon] .bt-enemies[data-n="6"] .unit{--sz:9.5rem}#s-battle[data-layout=moon] .bt-enemies[data-n="7"] .unit,#s-battle[data-layout=moon] .bt-enemies[data-n="8"] .unit{--sz:8.2rem}
#s-battle[data-layout=moon] .bt-players{position:absolute;left:1.2rem;top:auto;bottom:-1.5rem;height:auto;z-index:6;flex-direction:column;align-items:stretch;gap:.5rem}
#s-battle[data-layout=moon] .bt-players .unit{--sz:auto;width:15.5rem;height:auto;flex-direction:row;align-items:center;gap:.7rem;padding:.55rem .8rem .55rem .55rem;border-radius:1.3rem;background:#fffffff2;box-shadow:0 .25rem 0 #d2d9e6,var(--shadow);animation:none}
#s-battle[data-layout=moon] .bt-players .unit-figure{flex:none;width:4.4rem;height:4.4rem;border-radius:50%;overflow:hidden;background:color-mix(in srgb,var(--aura,#c0d4f5) 30%,#eef2f8);box-shadow:0 0 0 .2rem #fff,0 0 0 .32rem #d2d9e6;animation:none}
#s-battle[data-layout=moon] .bt-players .unit-figure img{width:100%;height:100%;max-width:none;max-height:none;object-fit:cover;object-position:50% 10%;transform:none;filter:none}
#s-battle[data-layout=moon] .bt-players .unit-figure .aura,#s-battle[data-layout=moon] .bt-players .unit-shadow{display:none}
#s-battle[data-layout=moon] .bt-players .unit-emblem{width:100%;margin:0;box-shadow:none}
#s-battle[data-layout=moon] .bt-players .unit-plate{flex:1;width:auto;margin:0;justify-items:stretch}
#s-battle[data-layout=moon] .bt-players .unit-name{justify-self:start}
#s-battle[data-layout=moon] .bt-players .unit-status{justify-content:flex-start;min-height:0}
#s-battle[data-layout=moon] .bt-players .unit-block{left:-1.5rem;top:-.4rem;width:2.1rem;height:2.3rem;transform:scale(0);z-index:2}
#s-battle[data-layout=moon] .bt-players .unit.has-block .unit-block{transform:scale(1)}
#s-battle[data-layout=moon] .bt-players .unit.aimed::before{left:2.75rem;bottom:auto;top:50%;width:5.4rem;transform:translate(-50%,-50%)}
/* 多人：「你／名字」的小牌子、對方的手牌數、結束回合的勾都放進卡片裡，不要壓在邊框上。 */
#s-battle[data-layout=moon] .bt-players .unit-me{position:static;justify-self:start;transform:none;margin-bottom:.1rem;box-shadow:0 0 0 .12rem #fff}
#s-battle[data-layout=moon] .bt-players .unit-handc{top:.55rem;right:.6rem;box-shadow:0 0 0 .1rem #d2d9e6}
#s-battle[data-layout=moon] .bt-players .unit.ended .unit-plate::after{right:auto;left:-1.4rem;top:auto;bottom:-.3rem;width:1.4rem;height:1.4rem;font-size:.8rem}
#s-battle[data-layout=moon] .bt-players .unit-plate{padding-right:2.6rem}
#s-battle[data-layout=moon] .bt-players .hpbar{min-width:5.6rem}
#s-battle[data-layout=moon] .bt-players .unit{width:max-content;min-width:15.5rem}
#s-lobby.still .seat,.still #s-room .room-card,.still #s-room .reward,.still #s-room .pick,.still #s-room .seat,.still #s-end .room-card{animation:none!important}
#s-battle[data-layout=moon] .bt-players .unit.down .unit-figure{transform:none;filter:grayscale(1) opacity(.55)}
.bt-playline{position:absolute;left:0;right:0;top:56%;height:.25rem;background:linear-gradient(90deg,transparent,#2a66d699,transparent);opacity:0;transition:opacity .2s;pointer-events:none}
.bt-playline.on{opacity:1}
.fx-layer{position:absolute;inset:0;pointer-events:none;z-index:70;overflow:hidden}
.fx-num{position:absolute;font:900 2.6rem/1 var(--font);color:#f03e3e;-webkit-text-stroke:.22rem #fff;paint-order:stroke;text-shadow:0 .25rem 0 #2b335040;animation:num 1.1s var(--out) forwards;white-space:nowrap}
.fx-num.block{color:#2a66d6;font-size:1.8rem}
.fx-num.heal{color:#17834a}
.fx-num.poison{color:#5c940d}
.fx-num.status{font-size:1.25rem;-webkit-text-stroke-width:.16rem;color:#b35c00}
.fx-num.status.bad{color:#0b7285}
.fx-num.big{font-size:3.6rem}
.fx-num.crit{color:#ff8a00;-webkit-text-stroke-color:#2b3350;font-size:4.4rem;animation-duration:1.15s}
.fx-num.crit-tag{color:#ffd43b;-webkit-text-stroke:.2rem #2b3350;font-size:1.9rem;letter-spacing:.04em}
.fx-num.elem{color:var(--el,#fff);-webkit-text-stroke:.18rem var(--el-stroke,#2b3350);font-size:1.5rem}
.fx-num.elem.weak,.fx-num.elem.immune{font-size:1.2rem}
.fx-num.total{color:#ffd43b;-webkit-text-stroke:.24rem #2b3350;font-size:3.2rem;z-index:2}
.fx-num.total.turn-total{animation-name:num-hold}
.st-ico.el{background:#fff;box-shadow:inset 0 0 0 .14rem var(--sc,#5f6886);color:#2b3350;width:auto;padding:0 .4rem;gap:.2rem;display:inline-flex;align-items:center}
.st-ico.el em{font-style:normal;font-weight:900;font-size:.68rem;color:#2b3350}
.st-ico.el .el-dot{width:.55rem;height:.55rem;border-radius:50%;background:var(--sc,#5f6886)}
.st-ico.el .el-pic{width:.95rem;height:.95rem;object-fit:contain}
@keyframes num{0%{transform:translate(-50%,0) scale(.3);opacity:0}18%{transform:translate(-50%,-1.5rem) scale(1.35);opacity:1}35%{transform:translate(-50%,-2rem) scale(1)}100%{transform:translate(-50%,-4.5rem) scale(.9);opacity:0}}
@keyframes num-hold{0%{transform:translate(-50%,0) scale(.3);opacity:0}12%{transform:translate(-50%,-1rem) scale(1.2);opacity:1}22%{transform:translate(-50%,-1rem) scale(1);opacity:1}85%{transform:translate(-50%,-1.4rem) scale(1);opacity:1}100%{transform:translate(-50%,-2rem) scale(.95);opacity:0}}
.fx-slash{position:absolute;width:12rem;height:12rem;margin:-6rem 0 0 -6rem;background:linear-gradient(135deg,transparent 44%,#fff 47%,#ffc53d 50%,#fff 53%,transparent 56%);filter:drop-shadow(0 0 .3rem #ffb938);animation:slash .35s ease-out forwards}
@keyframes slash{from{clip-path:inset(0 100% 100% 0);opacity:1}to{clip-path:inset(0 0 0 0);opacity:0}}
.fx-burst{position:absolute;width:9rem;height:9rem;margin:-4.5rem 0 0 -4.5rem;border-radius:50%;background:radial-gradient(circle,#fff 0 18%,var(--c,#ffc53d) 30%,transparent 66%);animation:burst .55s var(--out) forwards}
@keyframes burst{from{transform:scale(.2);opacity:1}to{transform:scale(1.6);opacity:0}}
.fx-card{position:absolute;left:0;top:0;font-size:var(--cs,12.6px);z-index:80;pointer-events:none;will-change:transform}
.fx-card.burn .crc{animation:burn .7s ease-in forwards}
@keyframes burn{to{filter:brightness(1.6) sepia(.8) hue-rotate(-20deg) blur(.3rem);opacity:0;transform:scale(1.15)}}
.banner{position:absolute;left:0;right:0;top:38%;z-index:90;display:grid;place-items:center;height:6.5rem;pointer-events:none;opacity:0}
.banner.show{animation:banner 1.15s cubic-bezier(.4,0,.6,1) forwards}
.banner::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,#ffffffeb 20%,#ffffffeb 80%,transparent);box-shadow:0 .3rem 0 #e3e8f166}
.banner strong{position:relative;font:900 2.6rem/1 var(--font);letter-spacing:.3em;color:var(--blue);text-shadow:0 .2rem 0 #d6e4ff}
.banner.enemy strong{color:#d93a3a;text-shadow:0 .2rem 0 #ffe0e0}
.banner.win strong{font-size:3.4rem;color:#b35c00;text-shadow:0 .25rem 0 #ffe8a8}
/* 使用卡牌／出招時的影片：蓋住戰場（橫幅之上、彈出視窗之下），點哪裡都能跳過。 */
.use-video{position:absolute;inset:0;z-index:95;display:grid;place-items:center;background:#0b0e17f2;cursor:pointer;animation:fade .18s}
.use-video.out{opacity:0;transition:opacity .18s}
.use-video video{width:100%;height:100%;object-fit:contain;pointer-events:none}
.use-video-wait{position:absolute;left:50%;top:50%;margin:0;transform:translate(-50%,-50%);color:#f4f6fb;font-weight:900;display:none}
.use-video.loading .use-video-wait{display:block;animation:fade .2s .3s both}
.use-video-skip{position:absolute;right:calc(1rem + var(--host-right,0px));bottom:1.2rem;background:linear-gradient(180deg,var(--b1),var(--b2) 55%);color:var(--bt)}
@keyframes banner{0%{opacity:0;transform:scale(.7)}12%{opacity:1;transform:scale(1.06)}20%{transform:scale(1)}74%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0)}}
.shake{animation:shake .4s ease-out}
@keyframes shake{20%{transform:translate(-.5rem,.3rem)}40%{transform:translate(.4rem,-.3rem)}60%{transform:translate(-.3rem,.2rem)}80%{transform:translate(.2rem,0)}}

/* ---- 特殊效果：倒戈、隱身、變身、召喚物、記號與下一張牌的加成 ---- */
.unit.charmed .unit-figure img,.unit.charmed .unit-emblem{scale:-1 1;filter:drop-shadow(0 0 .2rem #fff) drop-shadow(0 0 .7rem #f783ac)}
.bt-players .unit.charmed{--sz:11.5rem}
.unit.charmed .unit-name{background:#fff0f6;color:#a61e4d;box-shadow:0 .15rem 0 #fcc2d7}
.unit.charmed .unit-figure::after{content:'♥';position:absolute;top:8%;right:14%;font:900 1.5rem/1 var(--font);color:#e64980;-webkit-text-stroke:.14rem #fff;paint-order:stroke;animation:intent-bob 1.6s ease-in-out infinite}
.unit-intent .charm-mark{display:grid;color:#e64980}.unit-intent .charm-mark .cri{width:1.1rem;height:1.1rem}
.unit-intent[data-kind=stunned] .cri{color:#e67700}
.unit.stealthed .unit-figure{opacity:.42;filter:saturate(.6)}
.unit.stealthed .unit-figure::before{content:'';position:absolute;inset:8% 14% 0;border-radius:45%;background:repeating-linear-gradient(115deg,#ffffff00 0 .9rem,#ffffff66 .9rem 1.3rem);animation:stealth 1.8s linear infinite;pointer-events:none}
@keyframes stealth{to{background-position:6rem 0}}
.unit.dodge .unit-figure{animation:dodge .5s var(--out)}
@keyframes dodge{40%{transform:translateX(-2.2rem) skewX(-8deg);opacity:.5}}
.unit.formed .unit-figure img[data-form],.unit.formed .unit-emblem[data-form]{animation:pose-in .55s var(--spring)}
.st-ico .st-emoji{font-style:normal;font-size:1.05rem;line-height:1}
.st-ico.mark{--sc:#b35c00}
.st-ico.mod{width:auto;min-width:1.7rem;padding:0 .4rem;background:#fff4d6;color:#8a4b00;box-shadow:0 .15rem 0 #f0c674}
.st-ico.mod em{font-style:normal;font-size:.72rem;font-weight:900;white-space:nowrap}
.st-ico.mod.ban{background:#ffe3e3;color:#a61e1e;box-shadow:0 .15rem 0 #f1a3a3;padding-right:.75rem;margin-right:.3rem}
.st-ico.timer{--sc:#1971c2;border-radius:50%}
.st-ico.timer.swallow{--sc:#8a4b00;background:#fff4d6;box-shadow:0 0 0 .14rem #c2410c}
.st-ico.swallow img{width:70%;height:70%;object-fit:contain}
.st-ico.immune::after{content:'';position:absolute;left:.25rem;right:.25rem;top:calc(50% - .08rem);height:.16rem;border-radius:99rem;background:var(--sc);box-shadow:0 0 0 .1rem #fff;transform:rotate(-45deg)}
.unit-summons{position:absolute;bottom:calc(5.4rem + var(--st-extra,0px));left:50%;translate:-50% 0;z-index:4;display:flex;flex-direction:row;align-items:flex-end;gap:.5rem;max-width:calc(100% + .8rem);padding:.7rem .45rem 1.8rem;overflow:auto hidden;scrollbar-width:thin;scrollbar-color:#2b335040 transparent;overscroll-behavior-x:contain;pointer-events:auto}
.unit-summons:empty{display:none}
/* 這一邊只有一個人（一個人玩、玩家對戰的對手）：旁邊沒有別人，那一排可以比他寬一些 */
@media (min-width:901px){.bt-side[data-n="1"] .unit-summons{translate:none;max-width:calc(100% + 9rem)}.bt-players[data-n="1"] .unit-summons{left:0}.bt-enemies[data-n="1"] .unit-summons{left:auto;right:0}}
/* 多人時腳邊有名字牌（.unit-me）與手牌數：排在它們上面 */
.unit:has(.unit-plate>.unit-me:not([hidden])) .unit-summons{bottom:calc(7.1rem + var(--st-extra,0px))}
/* 狀態多到換行（fb-dc453188）：名字牌往上長，召喚物那一排跟著往上移（--st-extra 是多出來那幾行的高度，一行時是 0） */
/* 召喚物在角色腳邊橫向平排（fb-fd06e5fb）：每一隻下面直接寫攻擊與生命；排不下先縮小（--summon-k），還是放不下就橫向捲動 */
.unit-summons>.summon{flex:none}
.unit-summons>.summon:first-child{margin-left:auto}.unit-summons>.summon:last-child{margin-right:auto}
.unit-summons.over{-webkit-mask:linear-gradient(90deg,#000 calc(100% - 1.4rem),#0000);mask:linear-gradient(90deg,#000 calc(100% - 1.4rem),#0000)}
.summon{--summon-x:calc(var(--summon-k,1) * var(--summon-scale,1) * var(--summon-f,1));--summon-d:max(1.9rem,calc(3rem * var(--summon-x)));position:relative;display:flex;justify-content:center;min-width:2.7rem;cursor:help;animation:summon-in .55s var(--spring)}
.summon-pic{display:grid;place-items:center;width:var(--summon-d);height:var(--summon-d);overflow:hidden;border-radius:50%;background:#fff;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .9rem #2b335026,inset 0 0 0 .16rem #e3e8f1;color:var(--ink)}
.summon.weapon .summon-pic{border-radius:.8rem;background:#fff4d6;box-shadow:0 .2rem 0 #f0c674,0 .4rem .9rem #2b335026}
.summon.totem .summon-pic{border-radius:.8rem .7rem 1.1rem 1.1rem;background:#e6fcf5;box-shadow:0 .2rem 0 #96f2d7,0 .4rem .9rem #2b335026}
.summon-pic img{width:100%;height:100%;object-fit:contain}
.summon-pic i{font-style:normal;font-size:.8rem;font-weight:900;line-height:1.1;color:var(--ink);text-align:center;padding:0 .2rem}
.summon-pic .cri{width:55%;height:55%}
/* 攻擊、生命掛在圖下面（不算進召喚物的框，按住拖的是圖） */
.summon-atk,.summon-hp{position:absolute;left:50%;translate:-50% 0;z-index:1;display:flex;align-items:center;justify-content:center;gap:.05rem;min-width:1.2rem;height:1.05rem;padding:0 .28rem;border-radius:99rem;color:#fff;font-size:.66rem;font-weight:900;line-height:1.05rem;white-space:nowrap;font-variant-numeric:tabular-nums;box-shadow:0 0 0 .12rem #fff}
.summon-atk{top:calc(var(--summon-d) - .5rem);background:#d93a3a}
.summon-hp{top:calc(var(--summon-d) + .67rem);background:#17834a}
.summon-atk[hidden]+.summon-hp{top:calc(var(--summon-d) - .5rem)}
.summon-atk .cri{width:.7rem;height:.7rem}
.summon-turns{position:absolute;top:-.35rem;right:-.35rem;z-index:1;min-width:1.1rem;height:1.1rem;border-radius:99rem;background:var(--ink);color:#fff;font:900 .62rem/1.1rem var(--font);font-style:normal;text-align:center;box-shadow:0 0 0 .12rem #fff}
.summon [hidden]{display:none}
/* 強化卡給召喚物的格擋（fb-fd06e5fb）：左上角的小盾牌寫數字，跟角色的格擋同色 */
.summon-block{position:absolute;top:-.45rem;left:-.45rem;z-index:1;display:grid;place-items:center;width:1.3rem;height:1.4rem;pointer-events:none}
.summon-block .cri{position:absolute;inset:0;width:100%;height:100%;color:#1c4a9e;filter:drop-shadow(0 .1rem 0 #fff)}
.summon-block .cri path{fill:#2a66d6}
.summon-block b{position:relative;color:#fff;font-size:.56rem;font-weight:900;line-height:1;font-variant-numeric:tabular-nums}
/* 拿著可以給召喚物的強化卡：可以接的召喚物標綠框，指到的那隻加深、放大一點（跟選隊友同色） */
.summon.buffable{cursor:copy}
.summon.buffable .summon-pic{outline:.18rem solid #2fb47a;outline-offset:.14rem}
.summon.buffaim{scale:1.08}
.summon.buffaim .summon-pic{outline-color:#17834a;outline-width:.24rem}
.summon.figure.buffable .summon-pic{outline:none}.summon.figure.buffable .summon-pic img{filter:drop-shadow(0 0 .35rem #2fb47a) drop-shadow(0 .35rem .35rem #2b335038)}
.summon.figure.buffaim .summon-pic img{filter:drop-shadow(0 0 .2rem #fff) drop-shadow(0 0 .6rem #17834a)}
/* 點召喚物放大（fb-fd06e5fb）：同一邊有兩隻以上時，點到的那隻放大、其他暫時縮小；點旁邊、出手後回復。放大有上限，不會蓋滿畫面 */
.summon{touch-action:manipulation}
.summon-pic{transition:width .2s ease,height .2s ease}
.sum-focus .summon{--summon-f:.72}
.sum-focus .summon.focus{--summon-f:1.45;z-index:2}
.sum-focus .summon.focus{--summon-d:min(4.6rem,max(1.9rem,calc(3rem * var(--summon-x))))}
.sum-focus .summon.figure.focus{--summon-d:min(7rem,max(2.6rem,calc(5rem * var(--summon-x))))}
/* 召喚物身上的狀態（fb-dc453188）：圖上面的小圖示，一排 3 個、從下往上排；有狀態時那一排上面多留高度，捲動框不會切到 */
.unit-summons.has-st{padding-top:calc(.7rem + var(--summon-st-rows,1) * 1.1rem)}
.summon-st{position:absolute;bottom:calc(100% + .45rem);left:50%;translate:-50% 0;z-index:1;display:flex;flex-wrap:wrap-reverse;justify-content:center;gap:.15rem .12rem;width:calc(3 * .95rem + 2 * .12rem);pointer-events:none}
.st-mini{position:relative;display:grid;place-items:center;width:.95rem;height:.95rem;border-radius:.3rem;background:#fff;color:var(--sc,#5f6886);box-shadow:0 .1rem 0 #d2d9e6;font-style:normal}
.st-mini .cri{width:.7rem;height:.7rem}
.st-mini b{position:absolute;right:-.3rem;bottom:-.3rem;min-width:.75rem;height:.75rem;padding:0 .12rem;border-radius:99rem;background:var(--ink);color:#fff;font-size:.5rem;line-height:.75rem;font-weight:900;text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}
/* 有自己去背圖的召喚物：不要圓牌，直接站在主人腳邊 */
.summon.figure{--summon-d:max(2.6rem,calc(5rem * var(--summon-x)))}
.summon.figure .summon-pic{overflow:visible;border-radius:0;background:none;box-shadow:none}
.summon.figure.weapon .summon-pic{width:calc(var(--summon-d) * .75)}
.summon.figure .summon-pic img{filter:drop-shadow(0 .35rem .35rem #2b335038)}
.summon.figure .summon-turns{top:0;right:0}
.unit[data-side=e] .summon.figure .summon-pic img{scale:-1 1}
.unit[data-side=p] .summon.figure.like .summon-pic img{scale:-1 1}.unit[data-side=e] .summon.figure.like .summon-pic img{scale:1 1}
.summon.act{animation:summon-act .45s var(--spring)}
.summon.stealthed .summon-pic{opacity:.45;filter:saturate(.6)}
.summon.cmd{cursor:grab;touch-action:pan-x}
/* 拖召喚物去攻擊是按著圖拖；排太長要捲動時，手指按在下面的攻擊、生命上左右滑 */
.summon.cmd .summon-pic{touch-action:none}
.summon.cmd .summon-pic{outline:.18rem solid #f5a524;outline-offset:.14rem;animation:summon-ready 1.6s ease-in-out infinite}
.summon.figure.cmd .summon-pic{outline:none;animation:none}.summon.figure.cmd .summon-pic img{filter:drop-shadow(0 0 .35rem #f5a524) drop-shadow(0 .35rem .35rem #2b335038)}
.summon.cmd.aiming{cursor:grabbing;scale:1.08}
.summon.cmd.aiming .summon-pic{outline-color:#d93a3a;animation:none}
.summon.spent{filter:grayscale(.7);opacity:.72}
@keyframes summon-ready{50%{outline-offset:.3rem}}
.summon.hit{animation:hit .38s ease-out}
@keyframes summon-in{from{transform:scale(0) rotate(-30deg)}}
@keyframes summon-act{40%{transform:scale(1.25) translateY(-.4rem)}}
#s-battle[data-layout=moon] .bt-players .unit-summons{position:static;translate:none;flex:0 1 auto;min-width:0;max-width:100%;margin-left:.2rem;padding:.4rem .4rem 1.8rem}
#s-battle[data-layout=moon] .bt-players .unit-summons.has-st{padding-top:calc(.4rem + var(--summon-st-rows,1) * 1.1rem)}
#s-battle[data-layout=moon] .bt-players .summon{--summon-d:2.2rem}
#s-battle[data-layout=moon] .bt-players .summon.figure{--summon-d:2.6rem}

/* ---- 特殊效果的演出（api.vfx）：粗線、平塗、圓圓的，跟遊戲介面同一套 ---- */
.vfx{position:absolute;pointer-events:none}
.vfx-dot{display:grid;place-items:center;margin:-.6rem 0 0 -.6rem;width:1.2rem;height:1.2rem;font:900 1.4rem/1 var(--font);animation:vfx-fly-out .75s var(--dl,0ms) var(--out) both}
@keyframes vfx-fly-out{0%{transform:translate(0,0) scale(.3) rotate(0);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(1) rotate(var(--rot,0deg));opacity:0}}
.vfx-ember{border-radius:50%;background:#ffa94d;box-shadow:0 0 0 .14rem #fff3bf}
.vfx-flame{width:1.5rem;height:2rem;margin:-1rem 0 0 -.75rem;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(circle at 50% 70%,#ffe066 0 28%,#ff922b 30% 60%,#f03e3e 62%);border:.14rem solid #2b3350;animation-duration:.9s}
.vfx-shard{width:.8rem;height:1.6rem;margin:-.8rem 0 0 -.4rem;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);background:linear-gradient(#e7f5ff,#74c0fc)}
.vfx-plus{color:#2fb47a;-webkit-text-stroke:.14rem #fff;paint-order:stroke;animation-duration:1s}
.vfx-heart{color:#f06595;-webkit-text-stroke:.14rem #fff;paint-order:stroke;animation-duration:1s}
.vfx-star{color:#fcc419;-webkit-text-stroke:.14rem #fff;paint-order:stroke}
.vfx-bub{border-radius:50%;background:#b2f2bb99;box-shadow:inset 0 0 0 .14rem #2f9e44;animation-duration:1s}
.vfx-bub.bubble,.vfx-bub.water{background:#a5d8ff99;box-shadow:inset 0 0 0 .14rem #1c7ed6}
.vfx-puff{width:2.4rem;height:2.4rem;margin:-1.2rem 0 0 -1.2rem;border-radius:50%;background:#dee2e6;box-shadow:inset 0 -.3rem 0 #ced4da;animation-duration:.8s}
.vfx-meteor{width:5.2rem;height:5.2rem;margin:-2.6rem 0 0 -2.6rem;animation:vfx-meteor .5s var(--dl,0ms) cubic-bezier(.5,0,.9,.6) both}
.vfx-meteor i{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffd8a8 0 18%,#ff922b 20% 55%,#e8590c 57%);border:.22rem solid #2b3350}
.vfx-meteor::before{content:'';position:absolute;left:55%;bottom:55%;width:9rem;height:2.8rem;border-radius:99rem;background:linear-gradient(90deg,#ffe06600,#ffd43b 55%,#ff922b);transform:rotate(-38deg);transform-origin:0 50%}
@keyframes vfx-meteor{from{transform:translate(42vw,-70vh) scale(.6)}to{transform:translate(0,0) scale(1)}}
.vfx-rock{width:1.8rem;height:1.6rem;margin:-.8rem 0 0 -.9rem;border-radius:40% 55% 45% 50%;background:#a9a39b;border:.18rem solid #2b3350;animation:vfx-drop .45s var(--dl,0ms) ease-in both}
.vfx-boom{width:10rem;height:10rem;margin:-5rem 0 0 -5rem;border-radius:50%;background:radial-gradient(circle,#fff 0 16%,#ffe066 18% 34%,var(--c,#ff922b) 36% 58%,transparent 60%);animation:burst .6s var(--out) forwards}
.vfx-boom.big{width:15rem;height:15rem;margin:-7.5rem 0 0 -7.5rem}
.vfx-bolt{width:3rem;height:var(--h,60vh);margin-left:-1.5rem;transform:translateY(-100%);animation:vfx-blink .38s steps(2) both}
.vfx-bolt svg{width:100%;height:100%;overflow:visible}
.vfx-bolt path{fill:#ffe066;stroke:#2b3350;stroke-width:2.2;stroke-linejoin:round;vector-effect:non-scaling-stroke}
@keyframes vfx-blink{0%,60%{opacity:1}30%,100%{opacity:0}}
.vfx-ring{width:6rem;height:6rem;margin:-3rem 0 0 -3rem;border-radius:50%;border:.35rem solid #74c0fc;animation:burst .55s var(--out) forwards}
.vfx-beam{height:1.2rem;width:var(--w);margin-top:-.6rem;border-radius:99rem;transform:rotate(var(--a));transform-origin:0 50%;background:linear-gradient(90deg,#fff,var(--c,#74c0fc) 30%,#fff);box-shadow:0 0 0 .18rem #2b3350;animation:vfx-beam .5s var(--out) both}
@keyframes vfx-beam{0%{clip-path:inset(0 100% 0 0)}45%{clip-path:inset(0 0 0 0);opacity:1}100%{clip-path:inset(0 0 0 0);opacity:0}}
.vfx-pillar{width:6rem;height:100vh;margin-left:-3rem;transform:translateY(-100%);background:linear-gradient(90deg,#fff9db00,#fff3bf 30%,#fff 50%,#fff3bf 70%,#fff9db00);animation:vfx-pillar .6s var(--out) both}
@keyframes vfx-pillar{0%{transform:translateY(-100%) scaleX(0)}30%{transform:translateY(-100%) scaleX(1)}100%{transform:translateY(-100%) scaleX(.2);opacity:0}}
.vfx-dome{width:12rem;height:12rem;margin:-8rem 0 0 -6rem;border-radius:50% 50% 40% 40%;border:.3rem solid var(--c,#4dabf7);background:radial-gradient(circle at 35% 30%,#ffffffaa,#a5d8ff44 60%);animation:vfx-dome .6s var(--spring) both}
@keyframes vfx-dome{0%{transform:scale(.2);opacity:0}40%{transform:scale(1.05);opacity:1}100%{transform:scale(1);opacity:0}}
.vfx-swirl{width:9rem;height:9rem;margin:-4.5rem 0 0 -4.5rem;border-radius:50%;border:.3rem solid transparent;border-top-color:#63e6be;border-left-color:#c3fae8;animation:vfx-swirl .6s var(--dl,0ms) linear both}
@keyframes vfx-swirl{from{transform:rotate(0) scale(.4);opacity:1}to{transform:rotate(540deg) scale(1.3);opacity:0}}
.vfx-portal{width:9rem;height:3rem;margin:-1.5rem 0 0 -4.5rem;border-radius:50%;border:.3rem solid #4dabf7;background:radial-gradient(closest-side,#d0ebff,#74c0fc88 70%,transparent);box-shadow:0 0 0 .2rem #fff;animation:vfx-portal .7s var(--out) both}
.vfx-portal.small{width:5rem;height:1.6rem;margin:-.8rem 0 0 -2.5rem}
@keyframes vfx-portal{0%{transform:scale(0)}35%{transform:scale(1.1)}100%{transform:scale(.6);opacity:0}}
.vfx-drop{width:.5rem;height:1.4rem;margin-left:-.25rem;border-radius:99rem;background:#74c0fc;top:0!important;animation:vfx-rain .55s var(--dl,0ms) ease-in both}
.vfx-drop.glyph{width:auto;height:auto;background:none;font-size:2rem;line-height:1}
@keyframes vfx-rain{from{transform:translateY(-12vh);opacity:0}15%{opacity:1}to{transform:translateY(var(--fall));opacity:1}}
@keyframes vfx-drop{from{transform:translateY(-60vh) rotate(-90deg)}to{transform:translateY(0) rotate(0)}}
.vfx-fly{display:grid;place-items:center;transform:translate(-50%,-50%)}
.vfx-proj b{display:block;width:1.6rem;height:1.6rem;border-radius:50%;background:#ffd43b;border:.18rem solid #2b3350}
.vfx-proj i,.vfx-orb i{font-style:normal;font-size:2.1rem;line-height:1}
.vfx-orb{width:1.5rem;height:1.5rem;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#f783ac 60%);box-shadow:0 0 0 .16rem #fff,0 0 1rem #f783ac}
.vfx-orb.alt{background:radial-gradient(circle at 35% 35%,#fff,#4dabf7 60%);box-shadow:0 0 0 .16rem #fff,0 0 1rem #4dabf7}
.vfx-orb.steal{background:radial-gradient(circle at 35% 35%,#fff,#fcc419 60%);box-shadow:0 0 0 .16rem #fff,0 0 1rem #fcc419}
.vfx-orb.steal:has(i){width:auto;height:auto;background:none;box-shadow:none}
.vfx-orb.summon{width:1rem;height:1rem;background:#ffd43b;box-shadow:0 0 0 .14rem #2b3350}
.vfx-flash{position:absolute;inset:0;background:var(--c,#fff);animation:vfx-flash .5s ease-out both}
.vfx-flash.dark{background:radial-gradient(circle,transparent 30%,var(--c,#1d2340) 85%);animation-duration:.8s}
@keyframes vfx-flash{0%{opacity:0}20%{opacity:.75}100%{opacity:0}}

/* ---- AI 即興技能：玩家當場說一句話 ---- */
.improv{width:min(30rem,100%);padding:1.3rem 1.3rem 1.1rem;animation:pop .45s var(--spring)}
.improv-head{display:flex;align-items:center;gap:.7rem}
.improv-head>.cri{flex:none;width:2.6rem;height:2.6rem;padding:.45rem;border-radius:1rem;background:#fff4d6;color:#b35c00}
.improv-head h3{margin:0;font:900 1.25rem/1.2 var(--font);color:var(--ink)}
.improv-head small{color:var(--muted);font-weight:800}
.improv .note{text-align:left;margin:.7rem 0}
.improv-row{display:flex;gap:.5rem}
.improv-row input{flex:1;min-width:0;height:2.9rem;padding:0 1rem;border:0;border-radius:1rem;background:var(--panel2);color:var(--ink);font:800 1rem var(--font);box-shadow:inset 0 0 0 .14rem var(--line2);outline:none;-webkit-user-select:text;user-select:text}
.improv-row input:focus-visible{box-shadow:inset 0 0 0 .18rem var(--blue)}
.improv-row input.shake{animation:shake .4s ease-out}
.improv-row .icon-btn{height:2.9rem;width:2.9rem}
.improv-row .icon-btn.on{background:#d93a3a;color:#fff;box-shadow:0 .22rem 0 #a51d1d}
.improv-ideas{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.7rem}
.improv-wait{display:flex;align-items:center;justify-content:center;gap:.4rem;margin:.8rem 0 0;color:#8a4b00;font-weight:900}
.improv-wait .cri{width:1.2rem;height:1.2rem;animation:spin 1.2s linear infinite}
.improv-wait[hidden]{display:none}
.improv-actions{display:flex;justify-content:flex-end;gap:.6rem;margin-top:1rem}
.improv.busy .improv-ideas,.improv.busy .improv-actions{opacity:.45;pointer-events:none}

/* ---- 覆蓋層：獎勵、選牌、牌組、商店、休息、事件、寶箱、結算 ---- */
.overlay{position:absolute;inset:0;z-index:100;display:grid;place-items:center;padding:4.5rem 1rem 1rem;background:#2b335066;-webkit-backdrop-filter:blur(.35rem);backdrop-filter:blur(.35rem);animation:fade .3s}
@keyframes fade{from{opacity:0}}
.room{position:absolute;inset:0;display:grid;place-items:center;padding:4.6rem 1rem 1.2rem;overflow:auto}
.room-card{position:relative;width:min(58rem,100%);padding:1.6rem;animation:pop .55s var(--spring)}
@keyframes pop{from{transform:scale(.85) translateY(1.5rem);opacity:0}}
.room-title{display:flex;align-items:center;gap:.7rem;margin:0 0 1rem}
.room-title h2{margin:0;font:900 1.8rem/1.1 var(--font);letter-spacing:.06em;color:var(--ink)}
.room-title .cri{width:2.2rem;height:2.2rem;padding:.35rem;border-radius:.8rem;background:#fff4d6;color:#b35c00}
.room-foot{display:flex;flex-wrap:wrap;justify-content:center;gap:.8rem;margin-top:1.3rem}
.lobby-modes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem;margin:1rem 0 .4rem}
.mode-chip{display:flex;align-items:flex-start;gap:.65rem;padding:.8rem .9rem;border:.14rem solid var(--line);border-radius:1.1rem;background:#fff;color:var(--ink);font:inherit;text-align:left;cursor:pointer;transition:transform .3s var(--spring),border-color .2s}
.mode-chip:hover{transform:translateY(-.1rem)}
.mode-chip>.cri{flex:none;width:1.6rem;height:1.6rem;padding:.3rem;border-radius:.7rem;background:var(--panel2);color:var(--ink)}
.mode-chip span{display:grid;gap:.15rem}
.mode-chip b{font-size:.98rem;font-weight:900}
.mode-chip small{color:var(--muted);font-size:.78rem;font-weight:700;line-height:1.45}
.mode-chip[aria-pressed="true"]{border-color:var(--blue);background:#eef4ff}
.mode-chip[aria-pressed="true"]>.cri{background:var(--blue);color:#fff}
.mode-chip[data-mode="pvp"][aria-pressed="true"]{border-color:var(--red);background:#fff1f1}
.mode-chip[data-mode="pvp"][aria-pressed="true"]>.cri{background:var(--red);color:#fff}
.mode-chip[aria-disabled="true"]{cursor:default}.mode-chip[aria-disabled="true"]:hover{transform:none}
.mode-chip:focus-visible{outline:.15rem solid var(--blue);outline-offset:.15rem}
.lobby-turns{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .7rem;margin:.5rem 0 .3rem;color:var(--ink)}
.lobby-turns>span{font-size:.85rem;font-weight:900}
.lobby-turns>small{flex:1 1 12rem;color:var(--muted);font-size:.76rem;font-weight:700;line-height:1.4}
.turns-seg{display:flex;border:.12rem solid var(--line2);border-radius:0;background:#fff}
.turns-chip{padding:.35rem .85rem;border:0;border-radius:0;background:#fff;color:var(--ink);font:inherit;font-size:.82rem;font-weight:800;cursor:pointer}
.turns-chip+.turns-chip{border-left:.12rem solid var(--line2)}
.turns-chip:hover{background:var(--panel2);color:var(--ink)}
.turns-chip[aria-pressed="true"]{background:var(--blue);color:#fff}
.turns-chip[aria-disabled="true"]{cursor:default}.turns-chip[aria-disabled="true"]:hover{background:#fff;color:var(--ink)}
.turns-chip[aria-disabled="true"][aria-pressed="true"]:hover{background:var(--blue);color:#fff}
.turns-chip:focus-visible{outline:.15rem solid var(--blue);outline-offset:.1rem}
.dev-seg{flex-wrap:wrap;width:fit-content;max-width:100%;border-color:#7d87a6}
.dev-seg[hidden]{display:none}
.dev-seg .turns-chip+.turns-chip{border-left-color:#7d87a6}
.dev-panel>.dev-seg,.dev-panel>.dev-row{margin-bottom:.7rem}
.dev-list{display:grid;gap:.4rem;max-height:min(50vh,26rem);margin:.7rem 0;padding:.15rem;overflow-y:auto}
.dev-row{display:grid;gap:.3rem;color:var(--ink);text-align:left}
.dev-row>b{font-size:.85rem}
.dev-row>span{display:flex;flex-wrap:wrap;gap:.35rem}
.dev-item{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding:.45rem .75rem;border:.12rem solid #7d87a6;border-radius:.7rem;background:#fff;color:var(--ink);font:inherit;font-size:.9rem;text-align:left;cursor:pointer}
.dev-item small{color:var(--muted);font-weight:700}
.dev-item:hover{background:var(--panel2)}
.dev-item:active{background:var(--line)}
.dev-item:focus-visible{outline:.15rem solid var(--blue);outline-offset:.1rem}
.lobby-mode-note{margin:0 0 .4rem}
.unit.active-turn .aura{opacity:.95;background:radial-gradient(closest-side,#ffd25e,transparent)}
.unit.active-turn .unit-me::after{content:'';display:inline-block;width:.45rem;height:.45rem;margin-left:.35rem;border-radius:50%;background:#e5484d;box-shadow:0 0 0 .14rem #fff;vertical-align:.08rem;animation:mic-on 1.1s ease-in-out infinite}
.duel-given{display:flex;align-items:center;justify-content:center;gap:.4rem;margin:.45rem 0;color:var(--ink);font-weight:700}
.duel-given .cri{width:1.05rem;height:1.05rem;color:var(--blue)}
.duel-cards{max-height:min(46vh,30rem);margin-top:.6rem}
.duel-rows{display:grid;gap:.4rem;margin:.9rem 0 .2rem}
.duel-row{display:grid;grid-template-columns:auto auto 1fr auto;align-items:center;gap:.55rem;padding:.55rem .8rem;border-radius:.9rem;background:var(--panel2);color:var(--ink);font-size:.9rem}
.duel-row small{color:var(--muted);font-weight:700}
.duel-row>span:last-child{display:inline-flex;align-items:center;gap:.3rem;font-weight:800}
.duel-row.won{background:#fff4d6;color:#5a3b00}
.duel-row.won small{color:#6b4a00}
.duel-row .cri{width:1.05rem;height:1.05rem}
.duel-dot{width:.7rem;height:.7rem;border-radius:50%;background:var(--c);box-shadow:0 0 0 .14rem #2b335040}
.wait-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-top:1rem}
.wait-actions .cri{width:1.05rem;height:1.05rem}
.map-wait .btn{flex:none}.map-wait .cri{width:1rem;height:1rem}
.map-wait.peek{background:#fff;color:var(--ink)}
.map-ping{position:absolute;z-index:3;width:3.3rem;height:3.3rem;margin:-1.65rem 0 0 -1.65rem;border:.28rem solid var(--c);border-radius:50%;box-shadow:0 0 0 .14rem #2b335066;pointer-events:none;animation:map-ping 1.6s ease-out forwards}
@keyframes map-ping{0%{scale:.5;opacity:1}70%{opacity:.85}100%{scale:2.1;opacity:0}}
.bt-wait{position:absolute;right:2.6%;bottom:calc(2.5% + 9.6rem)}
.bt-wait .wait-actions{margin:0;justify-content:flex-end}
.unit-peek{position:absolute;z-index:6;top:0;left:50%;font-size:clamp(5px,.5rem,8px);transform:translate(-50%,-22%) rotate(-4deg);pointer-events:none;filter:drop-shadow(0 .5rem .7rem #2b335047);animation:fade .2s}
.unit-peek .peek-tag{position:absolute;z-index:2;left:50%;top:0;transform:translate(-50%,-115%);display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:99rem;background:var(--ink);color:#fff;font-size:.72rem;font-weight:800;white-space:nowrap}
.unit-peek .peek-tag .cri{width:.9rem;height:.9rem}
.reward-list{display:grid;gap:.6rem;max-width:30rem;margin:0 auto}
.reward{display:flex;align-items:center;gap:.9rem;width:100%;padding:.7rem 1rem;border:0;border-radius:1.1rem;background:#fff;box-shadow:0 .22rem 0 #d2d9e6,inset 0 0 0 .12rem #e3e8f1;color:var(--ink);font-weight:900;font-size:1.05rem;text-align:left;cursor:pointer;transition:transform .4s var(--spring),opacity .3s;animation:pop .5s var(--spring) backwards}
.reward:nth-child(2){animation-delay:.08s}.reward:nth-child(3){animation-delay:.16s}.reward:nth-child(4){animation-delay:.24s}
.reward:hover{transform:translateX(.4rem) scale(1.02);box-shadow:0 .22rem 0 #d2d9e6,inset 0 0 0 .14rem #2a66d6}
.reward:active{transform:scale(.97)}
.reward .ri{display:grid;place-items:center;width:2.8rem;height:2.8rem;border-radius:.9rem;background:var(--panel2);flex:none}
.reward .ri img{width:85%;height:85%;object-fit:contain}.reward .ri .cri{width:1.6rem;height:1.6rem;color:var(--blue)}
.reward small{display:block;color:var(--muted);font-size:.78rem;font-weight:700}
.reward.taken{opacity:0;transform:translateX(2rem) scale(.9);pointer-events:none;height:0;padding:0;margin:-.3rem 0;transition:all .45s var(--out)}
.pick-row{display:flex;flex-wrap:wrap;justify-content:center;gap:1.6rem;margin:1rem 0}
.pick{position:relative;padding:0;border:0;background:none;cursor:pointer;font-size:clamp(10px,1.35rem,20px);animation:deal .65s var(--spring) backwards;transition:transform .45s var(--spring)}
.pick:nth-child(2){animation-delay:.1s}.pick:nth-child(3){animation-delay:.2s}.pick:nth-child(4){animation-delay:.3s}.pick:nth-child(5){animation-delay:.4s}
.pick:hover{transform:translateY(-.8rem) scale(1.06);z-index:2}
.pick:active{transform:scale(.97)}
@keyframes deal{from{transform:translateY(8rem) rotate(-12deg) scale(.6);opacity:0}}
.pick-price{position:absolute;left:50%;bottom:-1.4rem;transform:translateX(-50%);display:flex;align-items:center;gap:.25rem;padding:.2rem .75rem;border-radius:99rem;background:#fff;color:#3d2a00;font-weight:900;font-size:.95rem;white-space:nowrap;box-shadow:0 .18rem 0 #d2d9e6,0 .3rem .6rem #2b335026}
.pick-price .cri{width:1.1rem;height:1.1rem;color:#e09a12}
.pick-price.poor{color:#d93a3a}
.pick.sold{opacity:.3;pointer-events:none;filter:grayscale(1)}
.pick-sale{position:absolute;right:-.6rem;top:-.6rem;z-index:8;padding:.15rem .55rem;border-radius:.6rem;background:#d93a3a;color:#fff;font-weight:900;font-size:.8rem;transform:rotate(12deg);box-shadow:0 .2rem 0 #a32323}
.deck-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(10.5rem,1fr));gap:1.4rem 1rem;justify-items:center;max-height:min(70vh,46rem);overflow:auto;padding:1.1rem 1rem 1.5rem;font-size:clamp(9px,.85rem,13px)}
.deck-grid .pick,.shop-grid .pick{font-size:inherit;animation:none}
.deck-grid .pick:hover{transform:translateY(-.4rem) scale(1.04)}
.deck-tools{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.toggle{display:inline-flex;align-items:center;gap:.5rem;font-weight:800;color:var(--muted);cursor:pointer}
.toggle input{width:1.2rem;height:1.2rem;accent-color:var(--blue)}
.shop-grid{display:grid;gap:2.4rem 1.2rem;grid-template-columns:repeat(auto-fill,minmax(10.6rem,1fr));justify-items:center;font-size:clamp(9px,.8rem,12.5px);padding-bottom:1rem}
.shop-row{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-top:2rem}
.shop-item{position:relative;display:grid;justify-items:center;gap:.3rem;width:7rem;padding:.8rem .4rem 1.6rem;border:0;border-radius:1.2rem;background:#fff;box-shadow:0 .22rem 0 #d2d9e6,inset 0 0 0 .12rem #e3e8f1;color:var(--ink);cursor:pointer;transition:transform .4s var(--spring)}
.shop-item:hover{transform:translateY(-.3rem) scale(1.05)}
.shop-item .si{display:grid;place-items:center;width:3.6rem;height:3.6rem;border-radius:50%;background:var(--panel2)}
.shop-item .si img{width:100%;height:100%;object-fit:contain}.shop-item .si .cri{width:2.2rem;height:2.2rem;color:var(--blue)}
.shop-item strong{font-size:.85rem;text-align:center;line-height:1.2}
.shop-keeper{position:absolute;right:2%;bottom:0;height:62%;pointer-events:none;filter:drop-shadow(0 .5rem .6rem #2b335033)}
.rest-fire{position:relative;width:12rem;height:12rem;margin:0 auto}
.rest-fire i{position:absolute;left:50%;bottom:30%;width:5.4rem;height:5.4rem;margin-left:-2.7rem;border-radius:50% 0 50% 50%;background:#ff8a3d;border:.24rem solid #2b3350;transform:rotate(-45deg);transform-origin:50% 50%;animation:fire 1s ease-in-out infinite alternate}
.rest-fire i:nth-child(2){width:3.6rem;height:3.6rem;margin-left:-1.8rem;bottom:31%;background:#ffc53d;animation-duration:.8s}
.rest-fire i:nth-child(3){width:1.9rem;height:1.9rem;margin-left:-.95rem;bottom:32%;background:#fff3bf;animation-duration:1.2s}
.rest-fire::before{content:'';position:absolute;left:18%;right:18%;bottom:20%;height:1.5rem;border-radius:.75rem;background:#b0703f;border:.22rem solid #2b3350;transform:rotate(-10deg)}
.rest-fire::after{content:'';position:absolute;left:18%;right:18%;bottom:20%;height:1.5rem;border-radius:.75rem;background:#c98250;border:.22rem solid #2b3350;transform:rotate(10deg)}
@keyframes fire{to{transform:rotate(-45deg) scale(1.08) translate(.15rem,-.15rem)}}
@keyframes glow{to{opacity:.6;transform:scale(1.1)}}
.rest-choices{display:flex;flex-wrap:wrap;justify-content:center;gap:1.4rem;margin-top:1.2rem}
.choice-big{display:grid;justify-items:center;gap:.4rem;width:13rem;padding:1.2rem 1rem;border:0;border-radius:1.4rem;background:#fff;box-shadow:0 .3rem 0 #d2d9e6,inset 0 0 0 .14rem #e3e8f1;color:var(--ink);cursor:pointer;transition:transform .45s var(--spring)}
.choice-big:hover{transform:translateY(-.4rem) scale(1.05);box-shadow:0 .3rem 0 #d2d9e6,inset 0 0 0 .16rem #2a66d6}
.choice-big:active{transform:scale(.96)}
.choice-big .cri{width:3rem;height:3rem;color:#d9480f}
.choice-big strong{font-size:1.25rem}
.choice-big small{color:var(--muted);font-weight:700;text-align:center}
.choice-big:disabled{opacity:.5;cursor:not-allowed;transform:none}
.event-wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:1.6rem;align-items:center}
.event-art{position:relative;aspect-ratio:4/3;border-radius:1.3rem;overflow:hidden;background:var(--panel2);box-shadow:0 .25rem 0 #e3e8f1,inset 0 0 0 .12rem #e3e8f1}
.event-art img{width:100%;height:100%;object-fit:cover}
.event-art .cri{position:absolute;inset:25%;width:50%;height:50%;color:#c3cbdb}
.event-text{font-size:1.08rem;line-height:1.75;color:var(--ink);font-weight:600;white-space:pre-wrap}
.event-choices{display:grid;gap:.6rem;margin-top:1rem}
.event-choice{display:grid;gap:.15rem;width:100%;padding:.75rem 1.1rem;border:0;border-radius:1.1rem;background:#fff;box-shadow:0 .22rem 0 #d2d9e6,inset 0 0 0 .12rem #e3e8f1;color:var(--ink);text-align:left;cursor:pointer;transition:transform .4s var(--spring)}
.event-choice:hover{transform:translateX(.4rem);box-shadow:0 .22rem 0 #d2d9e6,inset 0 0 0 .14rem #2a66d6}
.event-choice strong{font-size:1.02rem}.event-choice small{color:var(--muted);font-weight:700}
.event-choice:disabled{opacity:.5;cursor:not-allowed;transform:none}
.event-choice.picked{box-shadow:0 .22rem 0 #e09a12,inset 0 0 0 .18rem #ffb938}
.chest{position:relative;width:13rem;height:11rem;margin:1.6rem auto 1rem;cursor:pointer;isolation:isolate}
.chest-lid,.chest-base{position:absolute;left:0;right:0;border-radius:1rem;background:linear-gradient(90deg,transparent 16%,#c97a2a 16% 24%,transparent 24% 76%,#c97a2a 76% 84%,transparent 84%),#e8a04a;box-shadow:inset 0 0 0 .28rem #2b3350,inset 0 -.6rem 0 #c97a2a}
.chest-base{bottom:0;height:58%}
.chest-lid{top:6%;height:42%;border-radius:1.8rem 1.8rem .6rem .6rem;transform-origin:8% 100%;transition:transform .7s var(--spring)}
.chest-lock{position:absolute;left:50%;top:40%;width:2.2rem;height:2.6rem;margin-left:-1.1rem;border-radius:.5rem;background:#ffc53d;box-shadow:0 0 0 .22rem #2b3350;z-index:2;transition:opacity .3s}
.chest.open{margin-top:3.4rem}
.chest.open .chest-lid{transform:translate(-.4rem,-.7rem) rotate(-15deg)}
.chest.open .chest-lock{opacity:0}
.chest-rays{position:absolute;left:50%;top:40%;width:24rem;height:24rem;margin:-12rem 0 0 -12rem;background:repeating-conic-gradient(#ffc53d66 0 8deg,transparent 8deg 22deg);border-radius:50%;opacity:0;transition:opacity .6s;animation:spin 12s linear infinite;-webkit-mask:radial-gradient(closest-side,#000,transparent);mask:radial-gradient(closest-side,#000,transparent);z-index:-1}
.chest.open .chest-rays{opacity:1}
.chest:not(.open){animation:node-bob 1.6s ease-in-out infinite}
.end-wrap{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:1.6rem;align-items:center}
.end-hero{height:min(52vh,30rem);display:flex;align-items:flex-end;justify-content:center}
.end-hero img{max-height:100%;max-width:100%;object-fit:contain;filter:drop-shadow(0 .6rem .8rem #2b335033)}
.end-stats{display:grid;grid-template-columns:1fr 1fr;gap:.7rem;margin:1.2rem 0}
.end-stat{padding:.7rem .9rem;border-radius:1.1rem;background:var(--panel2)}
.end-stat small{display:block;color:var(--muted);font-weight:800;font-size:.78rem}
.end-stat b{font-size:1.6rem;font-variant-numeric:tabular-nums}
.end-title{margin:0;font:900 3rem/1.1 var(--font);letter-spacing:.12em}
.end-title.win{color:#b35c00;text-shadow:0 .25rem 0 #ffe8a8}
.end-title.lose{color:#d93a3a;text-shadow:0 .25rem 0 #ffe0e0}
.rays{position:absolute;left:50%;top:40%;width:150vmax;height:150vmax;margin:-75vmax 0 0 -75vmax;background:repeating-conic-gradient(#ffc53d1f 0 6deg,transparent 6deg 18deg);animation:spin 40s linear infinite;pointer-events:none}

/* ---- 角色選擇與大廳 ---- */
.scr-heroes{overflow:hidden}
.hs-stage{position:absolute;left:0;top:0;bottom:0;width:56%;display:flex;align-items:flex-end;justify-content:center}
.hs-stage::before{content:'';position:absolute;left:12%;right:12%;bottom:6%;height:4.5rem;border-radius:50%;background:#dfe5f0}
.hs-stage .aura{position:absolute;left:14%;right:14%;bottom:14%;height:70%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--aura,#ff6b5b) 40%,#fff),transparent);opacity:.6;filter:blur(1.4rem);animation:glow 2.4s ease-in-out infinite alternate}
.hs-figure{position:relative;height:84%;margin-bottom:4%;display:flex;align-items:flex-end;animation:breathe 3.6s ease-in-out infinite;transform-origin:50% 100%}
.hs-figure img{height:100%;max-width:52vw;object-fit:contain;transform:translate(var(--lx,0),var(--ly,0)) scale(var(--ls,1)) scaleX(var(--lf,1));transform-origin:50% 100%;filter:drop-shadow(0 .5rem .6rem #2b335026);animation:hero-in .7s var(--spring)}
@keyframes hero-in{from{opacity:0;transform:translateX(-3rem) scale(.92)}}
.hs-info{position:absolute;right:4%;top:50%;width:min(36rem,42%);transform:translateY(-50%);padding:1.6rem;animation:pop .5s var(--spring)}
.hs-info h2{margin:.2rem 0 0;font:900 2.5rem/1.1 var(--font);letter-spacing:.06em;color:var(--ink)}
.hs-info .title{display:inline-block;padding:.15rem .7rem;border-radius:99rem;background:color-mix(in srgb,var(--hero,#e5484d) 14%,#fff);color:color-mix(in srgb,var(--hero,#e5484d) 70%,#2b3350);font-weight:900;font-size:.85rem;letter-spacing:.12em}
.hs-info p{color:var(--ink);font-weight:600;line-height:1.7;margin:.8rem 0}
.hs-stats{display:flex;flex-wrap:wrap;gap:.5rem;margin:.6rem 0}
.hs-relic{display:flex;align-items:center;gap:.7rem;padding:.6rem .8rem;border-radius:1.1rem;background:var(--panel2)}
.hs-relic .relic{cursor:default}
.hs-relic small{display:block;color:var(--muted);font-weight:700}
.diff-row{display:grid;grid-template-columns:auto auto minmax(0,1fr);align-items:center;gap:.35rem .7rem;margin:.8rem 0 0;padding:.55rem .75rem;border-radius:1.1rem;background:var(--panel2);color:var(--ink)}
.diff-label{display:inline-flex;align-items:center;gap:.3em;color:var(--muted);font-weight:900;font-size:.85rem;cursor:help}
.diff-label .cri{width:1.15em;height:1.15em}
.diff-step{display:flex;align-items:center;gap:.25rem}
.diff-step .icon-btn{width:2.1rem;height:2.1rem;border-radius:.75rem;box-shadow:0 .16rem 0 var(--line2)}
.diff-step .icon-btn.next .cri{transform:scaleX(-1)}
.diff-step .icon-btn:not([disabled]):hover{transform:translateY(-.08rem)}
.diff-step .icon-btn:not([disabled]):active{transform:translateY(.1rem);box-shadow:none}
.diff-step .icon-btn:focus-visible{outline:.16rem solid var(--blue);outline-offset:.12rem}
.diff-step .icon-btn[disabled]{background:transparent;box-shadow:none;color:#8a92ab;cursor:default}
.diff-step b{min-width:1.9rem;text-align:center;font:900 1.4rem/1 var(--font);color:var(--ink)}
.diff-row.on .diff-step b{color:#c4262b}
.diff-row p.diff-rule{margin:0;font-size:.85rem;font-weight:800;line-height:1.35;color:var(--ink)}
.diff-rule small{display:block;color:var(--muted);font-weight:700;font-size:.75rem}
.diff-row p.diff-next{grid-column:1/-1;display:flex;align-items:center;gap:.3em;margin:0;font-size:.76rem;font-weight:700;line-height:1.3;color:var(--muted)}
.diff-next .cri{width:1em;height:1em}
.lobby-diff{margin:.6rem 0 .2rem}
.lobby-diff .diff-row{margin:0}
.tip .diff-rules{margin:.35rem 0 0;padding-left:1.3em;display:grid;gap:.15rem}
.end-diff{margin:.1rem 0 .3rem;color:#c4262b}
.end-diff .cri{width:1em;height:1em}
.hud-diff{display:inline-flex;align-items:center;gap:.25em;color:#c4262b;cursor:help}
.hud-diff .cri{width:1.1em;height:1.1em}
.hs-deck{display:flex;flex-wrap:nowrap;min-width:0;margin:1rem 0 .4rem;padding-left:1.6rem;font-size:6.4px;height:8.6rem}
.hs-deck>span{flex:0 1 auto;min-width:1.2rem}
.hs-deck>span:last-child{flex-shrink:0}
.hs-deck .crc{margin-left:-1.4rem;transition:transform .4s var(--spring)}
.hs-deck .crc:hover{transform:translateY(-1rem) scale(1.1);z-index:2}
.hs-tabs{position:absolute;left:50%;bottom:1.2rem;transform:translateX(-50%);display:flex;gap:.8rem;padding:.5rem;border-radius:1.6rem;background:#fff;box-shadow:var(--shadow);z-index:5}
.hs-tab{position:relative;width:4.4rem;height:4.4rem;padding:0;border:0;border-radius:1.1rem;overflow:hidden;background:var(--panel2);cursor:pointer;transition:transform .4s var(--spring)}
.hs-tab img{width:100%;height:100%;object-fit:cover;object-position:50% 12%}
.hs-tab:hover{transform:translateY(-.3rem) scale(1.06)}
.hs-tab[aria-pressed=true]{box-shadow:inset 0 0 0 .22rem var(--c),0 .3rem 0 color-mix(in srgb,var(--c) 70%,#000);transform:translateY(-.4rem) scale(1.08)}
.hs-tab .unit-emblem{width:100%;height:100%;margin:0;border-radius:0;box-shadow:none}
.hs-back{position:absolute;left:1rem;top:1rem;z-index:5}
.hs-party{display:grid;gap:.4rem;margin:.7rem 0 .2rem}
.hs-party>strong{color:var(--ink);font-size:.9rem}
.hs-party-row{display:flex;flex-wrap:wrap;gap:.4rem}
.hs-party-slot{display:inline-flex;align-items:center;gap:.35rem;min-height:2.1rem;padding:.2rem .6rem .2rem .25rem;border-radius:99rem;background:color-mix(in srgb,var(--c,#2a66d6) 12%,#fff);color:var(--ink);font-size:.82rem;font-weight:800;box-shadow:inset 0 0 0 .1rem var(--c,#2a66d6)}
.hs-party-slot .hud-face{width:1.6rem;height:1.6rem;border-width:.1rem}
.hs-party-slot.empty{padding:.2rem .8rem;background:#fff;color:#5a6478;box-shadow:inset 0 0 0 .1rem #8a93a6}
.hs-party-badge{position:absolute;right:.2rem;top:.2rem;display:grid;place-items:center;width:1.25rem;height:1.25rem;border-radius:50%;background:#2b3350;color:#fff;font-size:.75rem;font-style:normal;font-weight:900}
.hs-links{position:absolute;left:1rem;top:1rem;z-index:5;display:flex;flex-wrap:wrap;gap:.5rem}
.lobby-card{width:min(52rem,100%);padding:1.6rem}
.lobby-code{display:flex;align-items:center;justify-content:center;gap:.8rem;margin:.6rem 0 1.2rem}
.lobby-code b{padding:.3rem 1rem;border-radius:1rem;background:#eef4ff;font:900 2.4rem/1.2 ui-monospace,Menlo,monospace;letter-spacing:.3em;color:var(--blue);box-shadow:inset 0 0 0 .14rem #d6e4ff}
.lobby-seats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
.seat{position:relative;display:grid;justify-items:center;gap:.4rem;padding:.8rem .5rem;border-radius:1.2rem;background:var(--panel2);min-height:11rem;animation:pop .45s var(--spring)}
.seat.empty{background:none;border:.16rem dashed #c3cbdb}
.seat.empty small,.seat.empty strong{color:var(--muted)}
.seat-face{width:5rem;height:5rem;border-radius:50%;overflow:hidden;background:#fff;box-shadow:0 0 0 .22rem var(--c,#fff)}
.seat-face img{width:100%;height:100%;object-fit:cover;object-position:50% 12%}
.seat strong{font-size:.95rem;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.seat small{color:var(--muted);font-weight:800}
.seat .ready{color:var(--green)}
.seat-host{position:absolute;top:.4rem;right:.5rem;padding:.05rem .45rem;border-radius:99rem;background:#fff4d6;color:#8a5a00;font-size:.7rem;font-weight:900}
.lobby-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.7rem;margin-top:1rem}
.field{display:grid;gap:.3rem;font-weight:800;color:var(--muted);font-size:.85rem}
.field input{min-width:0;padding:.65rem .9rem;border:.14rem solid var(--line2);border-radius:.9rem;background:#fff;color:var(--ink);font:900 1.2rem/1.2 var(--font);letter-spacing:.1em;outline:none;-webkit-user-select:text;user-select:text}
.field input:focus{border-color:var(--blue);box-shadow:0 0 0 .25rem #2a66d626}
.hero-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-top:.8rem}
.hero-pill{display:flex;align-items:center;gap:.45rem;padding:.3rem .8rem .3rem .3rem;border:0;border-radius:99rem;background:#fff;color:var(--ink);font-weight:900;cursor:pointer;box-shadow:0 .18rem 0 #d2d9e6,inset 0 0 0 .12rem #e3e8f1;transition:transform .35s var(--spring)}
.hero-pill img,.hero-pill .dot{width:2rem;height:2rem;border-radius:50%;object-fit:cover;object-position:50% 12%;background:color-mix(in srgb,var(--c) 18%,#fff)}
.hero-pill:hover{transform:scale(1.05)}
.hero-pill[aria-pressed=true]{background:color-mix(in srgb,var(--c) 14%,#fff);box-shadow:0 .18rem 0 color-mix(in srgb,var(--c) 60%,#2b3350),inset 0 0 0 .16rem var(--c)}
.note{margin:.6rem 0 0;color:var(--muted);font-weight:700;text-align:center}
.note.err{color:#d93a3a}
.chat{position:absolute;left:1rem;bottom:1rem;z-index:40;display:flex;flex-direction:column-reverse;gap:.45rem;width:min(23rem,calc(100vw - 2rem))}
#app[data-scr="s-map"] .chat{bottom:4.2rem}
#app[data-scr="s-battle"] .chat{top:calc(var(--hud-h,4.3rem) + .1rem);bottom:auto;flex-direction:column;width:min(21rem,calc(100vw - 2rem))}
.chat-toggle{display:grid;place-items:center;align-self:flex-start;flex:none;width:2.6rem;height:2.6rem;padding:0;border:0;border-radius:50%;background:#fff;color:var(--ink);cursor:pointer;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .9rem #2b33501f;transition:transform .3s var(--spring)}
.chat-toggle:hover{transform:scale(1.08)}
.chat-toggle .cri{width:1.3rem;height:1.3rem}
.chat-toggle.unread{position:relative}
.chat-toggle.unread::after{content:'';position:absolute;top:.1rem;right:.1rem;width:.7rem;height:.7rem;border-radius:50%;background:var(--red);box-shadow:0 0 0 .14rem #fff}
.chat-toggle:focus-visible{outline:.15rem solid var(--blue);outline-offset:.12rem}
.chat.open .chat-toggle{background:var(--ink);color:#fff}
.chat:not(.open)>:not(.chat-toggle):not(.chat-log){display:none}
.chat:not(.open) .chat-log{max-width:18rem}
#app[data-scr="s-battle"] .chat:not(.open) .chat-log{display:none}
@media (max-width:900px),(max-height:500px){
  #app:not([data-scr="s-battle"]) .chat{bottom:.8rem;left:.8rem}
  #app[data-scr="s-map"] .chat{bottom:3.6rem}
}
.chat-log{display:flex;flex-direction:column;gap:.25rem;pointer-events:none}
.chat-log p{align-self:flex-start;max-width:100%;margin:0;padding:.32rem .75rem;border-radius:.9rem;background:#fffffff2;color:var(--ink);font-size:.82rem;font-weight:700;line-height:1.45;overflow-wrap:anywhere;box-shadow:0 .15rem 0 #d2d9e6;animation:fade .25s;transition:opacity .9s}
.chat-log p.old{opacity:0}
.chat-log p.sys{background:#fff4d6;color:#5a3b00}
.chat-log b{margin-right:.4rem;font-weight:900}
.chat-log b::before{content:'';display:inline-block;width:.55rem;height:.55rem;margin-right:.3rem;border-radius:50%;background:var(--c);box-shadow:0 0 0 .12rem #2b335040;vertical-align:.05rem}
.chat-box{display:flex;gap:.3rem;padding:.3rem;border-radius:99rem;background:#fff;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .9rem #2b33501f}
.chat-box input{flex:1;min-width:0;height:2.3rem;padding:0 .85rem;border:0;border-radius:99rem;background:var(--panel2);color:var(--ink);font:inherit;font-size:.9rem;font-weight:700;outline:none}
.chat-box input::placeholder{color:var(--muted);opacity:1}
.chat-box input:focus-visible{box-shadow:inset 0 0 0 .14rem var(--blue)}
.chat-btn{display:grid;place-items:center;flex:none;width:2.3rem;height:2.3rem;padding:0;border:0;border-radius:50%;background:var(--panel2);color:var(--ink);cursor:pointer;transition:transform .3s var(--spring)}
.chat-btn:hover{transform:scale(1.08)}
.chat-btn .cri{width:1.15rem;height:1.15rem}
.chat-btn.send{background:var(--blue);color:#fff}
.chat-btn.on{background:var(--red);color:#fff;animation:mic-on 1.1s ease-in-out infinite}
@keyframes mic-on{50%{box-shadow:0 0 0 .35rem #e5484d40}}
.chat-btn:focus-visible,.phrase:focus-visible{outline:.15rem solid var(--blue);outline-offset:.12rem}
.phrases{display:flex;flex-wrap:wrap;gap:.35rem}
.phrase{padding:.3rem .75rem;border:0;border-radius:99rem;background:#fff;color:var(--ink);font-weight:800;font-size:.82rem;cursor:pointer;box-shadow:0 .15rem 0 #d2d9e6,0 .3rem .6rem #2b33501f;transition:transform .3s var(--spring)}
.phrase:hover{transform:scale(1.07)}
.bubble{position:absolute;z-index:95;max-width:16rem;padding:.45rem .8rem;text-align:center;overflow-wrap:anywhere;border-radius:1rem;background:#fff;color:var(--ink);font-weight:900;font-size:.95rem;box-shadow:0 .2rem 0 #d2d9e6,0 .4rem .8rem #2b335033;transform:translate(-50%,-100%);animation:bubble 2.6s var(--out) forwards;pointer-events:none;white-space:nowrap}
.bubble::after{content:'';position:absolute;left:50%;bottom:-.45rem;margin-left:-.45rem;border:.45rem solid transparent;border-top-color:#fff;border-bottom:0}
.move-pop{position:absolute;z-index:96;display:flex;flex-direction:column;align-items:center;gap:.05rem;width:max-content;max-width:min(16rem,90vw);padding:.3rem .85rem;text-align:center;overflow-wrap:anywhere;border-radius:.7rem;border:.14rem solid var(--blue);background:var(--ink);color:#fff;box-shadow:var(--shadow);transform:translateX(-50%);animation:move-pop 1.6s var(--out) forwards;pointer-events:none}
.move-pop.foe{border-color:var(--red)}
.move-pop small{font-size:.68rem;font-weight:700;line-height:1.2;color:#dfe5f4}
.move-pop b{font-size:1rem;font-weight:900;line-height:1.25}
@keyframes move-pop{0%{opacity:0;transform:translateX(-50%) scale(.7)}10%{opacity:1;transform:translateX(-50%) scale(1.04)}18%{transform:translateX(-50%) scale(1)}85%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-.4rem)}}
@keyframes bubble{0%{opacity:0;transform:translate(-50%,-80%) scale(.6)}12%{opacity:1;transform:translate(-50%,-100%) scale(1)}85%{opacity:1}100%{opacity:0;transform:translate(-50%,-120%)}}
.tip{position:fixed;z-index:200;max-width:18rem;padding:.7rem .9rem;border-radius:1rem;background:#fff;color:var(--ink);box-shadow:0 .2rem 0 #d2d9e6,0 .8rem 1.6rem #2b335033;font-size:.88rem;font-weight:600;line-height:1.55;pointer-events:none;animation:tip .2s var(--out)}
.tip strong{display:block;color:var(--blue);font-size:.98rem}
.tip small{display:block;margin-top:.3rem;color:var(--muted);font-style:italic}
@keyframes tip{from{opacity:0;transform:translateY(.3rem)}}
.inspect{display:grid;justify-items:center;gap:1.2rem}
.inspect-cards{display:flex;align-items:center;gap:1.6rem;font-size:clamp(14px,2.1vh,24px)}
.inspect-cards .arrow .cri{width:2.4rem;height:2.4rem;color:#fff;filter:drop-shadow(0 .15rem 0 #2b335066)}
.inspect>p.note{margin:0;padding:.45rem 1.1rem;border-radius:99rem;background:#fff;color:var(--ink);box-shadow:0 .15rem 0 #d2d9e6}
.overlay>div:not(.panel)>.room-title{margin:0;padding:.35rem 1.2rem .35rem .4rem;border-radius:99rem;background:#fff;box-shadow:0 .2rem 0 #d2d9e6,var(--shadow)}
.overlay>div:not(.panel)>.room-title h2{font-size:1.4rem}
.inspect-keys{display:grid;gap:.4rem;max-width:34rem}
.inspect-keys p{margin:0;padding:.5rem .85rem;border-radius:.8rem;background:#fff;color:var(--ink);font-size:.88rem;box-shadow:0 .15rem 0 #d2d9e6}
.inspect-keys b{color:#b35c00}
/* 卡面說明被「…」截掉時，放大的畫面裡另外排出完整說明 */
.inspect-cards{flex-wrap:wrap;justify-content:center;row-gap:1rem}
.inspect-one{display:grid;grid-template-columns:min-content;align-content:start;gap:.6rem;cursor:zoom-out}
.inspect-full{box-sizing:border-box;padding:.6rem .9rem;border-radius:.8rem;background:#fff;color:var(--ink);font-size:clamp(13px,.66em,16px);box-shadow:0 .15rem 0 #d2d9e6}
.inspect-foot{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem}
/* 矮的畫面（手機橫向）排不下牌＋完整說明：整個放大畫面可以上下捲，放得下時照舊置中。 */
.overlay:has(>.inspect){overflow-y:auto;overscroll-behavior:contain}
.overlay>.inspect{align-self:start;margin-block:auto}
.bt-full{position:fixed;z-index:500;left:0;top:0;width:max-content;padding:.55rem .85rem;border-radius:.8rem;background:#fff;color:var(--ink);font-size:clamp(12.5px,.95rem,15px);box-shadow:0 .2rem 0 #d2d9e6,var(--shadow);overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;animation:fade .15s}
.bt-full[hidden]{display:none}
/* 選單不超出畫面：面板高度跟著視窗，排不下時清單自己捲，最下面的「放棄」捲得到。清單留一點內距，按鈕的陰影和焦點框才不會被捲動範圍切掉。 */
.overlay:has(>.menu-panel){--menu-top:max(4.5rem,calc(env(safe-area-inset-top,0px) + .6rem));--menu-bottom:max(1rem,calc(env(safe-area-inset-bottom,0px) + .6rem));padding-top:var(--menu-top);padding-bottom:var(--menu-bottom)}
.menu-panel{display:flex;flex-direction:column;max-height:calc(100vh - var(--menu-top) - var(--menu-bottom));max-height:calc(100dvh - var(--menu-top) - var(--menu-bottom))}
.menu-panel .room-title{flex:none}
.menu-list{flex:0 1 auto;display:grid;grid-auto-rows:max-content;gap:.7rem;min-width:min(20rem,80vw);min-height:0;margin:-.4rem;padding:.4rem;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y}
.menu-list .btn{width:100%}
.menu-list .note{font-size:.9rem}
/* 手機橫向這種矮畫面：狀態列本來就被遮罩蓋著，上面不用再留位子，間距也收緊 */
@media (max-height:500px){
  .overlay:has(>.menu-panel){--menu-top:max(.6rem,calc(env(safe-area-inset-top,0px) + .4rem));--menu-bottom:max(.6rem,calc(env(safe-area-inset-bottom,0px) + .4rem))}
  .menu-panel{padding:.8rem 1.1rem 1rem}
  .menu-panel .room-title{margin-bottom:.5rem}
  .menu-panel .room-title h2{font-size:1.4rem}
  .menu-panel .room-title .cri{width:1.8rem;height:1.8rem;padding:.25rem}
  .menu-list{gap:.45rem}
}
/* 選單的設定卡：音效、背景音樂、動畫同一張白卡，每一列同高、圖示和右邊的值對齊 */
.menu-settings{display:grid;overflow:hidden;border:.1rem solid var(--line2);border-radius:1.1rem;background:#fff;color:var(--ink);box-shadow:0 .2rem 0 var(--line),0 .4rem 1rem #2b335014}
.menu-row{display:grid;grid-template-columns:2.1rem minmax(0,1fr) auto;align-items:center;gap:.75rem;width:100%;min-height:3.2rem;padding:.45rem .85rem;border:0;background:#fff;color:var(--ink);font-size:.98rem;font-weight:800;letter-spacing:.02em;line-height:1.2;text-align:left}
.menu-row+.menu-row{border-top:.08rem solid var(--line)}
.menu-row b{color:var(--muted);font-weight:800;font-variant-numeric:tabular-nums;text-align:right}
button.menu-row{cursor:pointer;transition:background .15s}
button.menu-row:hover{background:var(--panel2);color:var(--ink)}
button.menu-row:active{background:#e9edf4;color:var(--ink)}
button.menu-row:focus-visible{outline-offset:-.2rem}
.menu-icon{display:grid;place-items:center;width:2.1rem;height:2.1rem;padding:0;border:0;border-radius:.7rem;background:var(--bg0);color:var(--ink);transition:transform .25s var(--spring),background .15s}
.menu-icon .cri{width:1.25rem;height:1.25rem}
button.menu-row:hover .menu-icon{background:#fff;color:var(--ink)}
button.menu-icon{cursor:pointer}
button.menu-icon:hover{background:var(--line);color:var(--ink);transform:scale(1.06)}
button.menu-icon:active{background:var(--line2);color:var(--ink);transform:scale(.94)}
button.menu-icon:focus-visible{outline:.15rem solid var(--blue);outline-offset:.1rem}
.menu-music{grid-template-columns:2.1rem minmax(0,1fr)}
.menu-music label{display:grid;grid-template-columns:minmax(0,auto) minmax(4.5rem,1fr) 2.8rem;align-items:center;gap:.75rem;min-width:0}
/* 滑桿：還沒填滿的那段也要跟白底有 3:1，看得出是一條軌道 */
.menu-music input{--track:#8a92ab;-webkit-appearance:none;appearance:none;width:100%;height:1.6rem;margin:0;background:transparent;cursor:pointer}
.menu-music input::-webkit-slider-runnable-track{height:.42rem;border-radius:99rem;background:linear-gradient(90deg,var(--blue) var(--fill),var(--track) var(--fill))}
.menu-music input::-webkit-slider-thumb{-webkit-appearance:none;width:1.2rem;height:1.2rem;margin-top:-.39rem;border:.24rem solid var(--blue);border-radius:50%;background:#fff;box-shadow:0 .1rem .25rem #2b335040;transition:transform .2s var(--spring)}
.menu-music input:hover::-webkit-slider-thumb{transform:scale(1.12)}
.menu-music input:active::-webkit-slider-thumb{transform:scale(1.22)}
.menu-music input::-moz-range-track{height:.42rem;border-radius:99rem;background:var(--track)}
.menu-music input::-moz-range-progress{height:.42rem;border-radius:99rem;background:var(--blue)}
.menu-music input::-moz-range-thumb{box-sizing:border-box;width:1.2rem;height:1.2rem;border:.24rem solid var(--blue);border-radius:50%;background:#fff;box-shadow:0 .1rem .25rem #2b335040;transition:transform .2s var(--spring)}
.menu-music input:hover::-moz-range-thumb{transform:scale(1.12)}
.menu-music input:active::-moz-range-thumb{transform:scale(1.22)}
.menu-music input:focus-visible{outline:.15rem solid var(--blue);outline-offset:.1rem;border-radius:.5rem}
.loading{position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);font-weight:800;letter-spacing:.2em}
.toast{position:absolute;left:50%;top:calc(var(--hud-h,4.3rem) + .7rem);z-index:150;transform:translateX(-50%);padding:.6rem 1.1rem;border-radius:99rem;background:var(--ink);color:#fff;font-weight:800;box-shadow:0 .4rem .8rem #2b335040;animation:toast 2.8s var(--out) forwards;pointer-events:none;white-space:nowrap}
@keyframes toast{0%{opacity:0;transform:translate(-50%,-.6rem)}10%,85%{opacity:1;transform:translate(-50%,0)}100%{opacity:0}}
.collection-filter{display:flex;flex-wrap:wrap;gap:.4rem}
.chip{padding:.35rem .85rem;border:0;border-radius:99rem;background:var(--panel2);color:var(--ink);font-weight:800;font-size:.85rem;cursor:pointer;box-shadow:inset 0 0 0 .1rem var(--line)}
.chip[aria-pressed=true]{background:var(--blue);color:#fff;box-shadow:0 .15rem 0 #1c4a9e}

/* ---- 對話（奇遇、劇情點）：立繪＋對話框，點一下換下一句 ---- */
.talking .story-card{visibility:hidden}
.talk{position:absolute;inset:0;z-index:160;cursor:pointer;background:linear-gradient(180deg,transparent 45%,#2b335040);animation:fade .25s}
.talk-face{position:absolute;bottom:0;height:min(72vh,46rem);max-width:46vw;object-fit:contain;filter:drop-shadow(0 .6rem .8rem #2b335033);animation:talk-in .45s var(--spring)}
.talk-face.left{left:4%}.talk-face.right{right:4%}
@keyframes talk-in{from{opacity:0;transform:translateY(2rem) scale(.96)}}
.talk-box{position:absolute;left:50%;bottom:1.4rem;width:min(52rem,92vw);transform:translateX(-50%);padding:1.4rem 1.6rem 1.6rem;border-radius:1.6rem;background:#fff;color:var(--ink);box-shadow:0 .35rem 0 #e3e8f1,0 1.2rem 2.6rem #2b335033;animation:pop .35s var(--spring)}
.talk-name{position:absolute;top:-1rem;left:1.4rem;padding:.25rem 1rem;border-radius:99rem;background:#fff;color:var(--ink);font-size:1rem;box-shadow:0 0 0 .2rem var(--c),0 .2rem 0 .2rem color-mix(in srgb,var(--c) 60%,#2b3350)}
.talk-box.right .talk-name{left:auto;right:1.4rem}
.talk-box p{margin:0;font-size:1.15rem;line-height:1.75;font-weight:600;white-space:pre-wrap}
.talk-next{position:absolute;right:1.1rem;bottom:.6rem;color:var(--blue);font-size:.9rem;animation:intent-bob 1.4s ease-in-out infinite}
.talk-next .cri{width:1rem;height:1rem}
/* ---- 地圖：劇情點與塗鴉 ---- */
.node[data-kind=story]{color:#fff;background:#2a66d6;box-shadow:0 .22rem 0 #1c4a9e,0 .4rem .8rem #2a66d655}
.node[data-kind=story].can{box-shadow:0 .22rem 0 #1c4a9e,0 0 0 .25rem #ffc53d,0 .5rem 1.2rem #ffb93877}
.node-label{position:absolute;left:50%;top:calc(100% - .6rem);z-index:2;transform:translateX(-50%);padding:.05rem .55rem;border-radius:99rem;background:#fff;color:var(--ink);font-size:.68rem;font-weight:900;line-height:1.35;white-space:nowrap;box-shadow:0 0 0 .1rem #d2d9e6;pointer-events:none}
/* ---- 鎖住的角色、卡牌與新解鎖 ---- */
.hs-tab.locked img,.hs-tab.locked .unit-emblem{filter:grayscale(1) brightness(.9);opacity:.55}
.lock-badge{position:absolute;right:.2rem;bottom:.2rem;display:grid;place-items:center;width:1.5rem;height:1.5rem;border-radius:50%;background:var(--ink);color:#fff}
.lock-badge .cri{width:.95rem;height:.95rem}
.scr-heroes.is-locked .hs-figure img{filter:grayscale(1) brightness(.85) drop-shadow(0 .5rem .6rem #2b335026);opacity:.6}
.lock-note{display:flex;align-items:center;gap:.5rem;margin:0;padding:.7rem 1rem;border-radius:1rem;background:var(--panel2);color:var(--ink);font-weight:800}
.lock-note .cri{width:1.3rem;height:1.3rem;color:var(--muted)}
.pick.locked .crc{filter:grayscale(1) brightness(.92);opacity:.55}
.lock-cover{position:absolute;inset:0 0 auto;height:50%;display:grid;place-content:center;justify-items:center;gap:.4rem;padding:1rem;text-align:center;color:var(--ink);font-size:.85em;font-weight:900;z-index:9}
.lock-cover .cri{width:2.2em;height:2.2em;padding:.4em;border-radius:50%;background:#fff;box-shadow:var(--shadow)}
.lock-cover b{padding:.2em .7em;border-radius:99rem;background:#fff;box-shadow:0 .15rem 0 #d2d9e6}
.pal-list{display:grid;gap:.5rem;margin:0 0 1rem;padding:.8rem;border-radius:1.2rem;background:var(--panel2)}
.pal-list h3{display:flex;align-items:center;gap:.4rem;margin:0 0 .2rem;font-size:.95rem;color:var(--ink)}
.pal-list h3 .cri{width:1.1rem;height:1.1rem;color:var(--blue)}
.pal-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:.7rem;padding:.5rem .6rem;border-radius:1rem;background:#fff;box-shadow:0 .15rem 0 #e3e8f1}
.pal-row.invite{box-shadow:0 0 0 .16rem #ffc53d,0 .15rem 0 #e3e8f1;animation:pop .45s var(--spring)}
.pal-row span{display:grid;min-width:0}
.pal-row b{overflow:hidden;color:var(--ink);text-overflow:ellipsis;white-space:nowrap}
.pal-row small{color:var(--muted);font-weight:700;font-size:.8rem}
.pal-face{display:grid;place-items:center;width:2.6rem;height:2.6rem;border-radius:50%;object-fit:cover;background:#e8f0ff;color:var(--blue);font-weight:900;box-shadow:0 0 0 .14rem #fff,0 0 0 .26rem #d2d9e6}
.pal-empty{margin:0 0 .8rem}
.coll-bar{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem 1rem;margin:.6rem 0 .2rem}
.coll-count{display:inline-flex;align-items:center;gap:.35rem;padding:.3rem .9rem;border-radius:99rem;background:#fff4d6;color:#5a3b00;font-weight:900}
.coll-count .cri{width:1.1rem;height:1.1rem;color:#b35c00}
.pick.unseen .crc{filter:grayscale(1);opacity:.4}
.coll-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(11rem,1fr));gap:1rem;margin-top:.8rem;max-height:62vh;overflow:auto;padding:.3rem}
.coll-tile{display:grid;justify-items:center;gap:.25rem;padding:.8rem .7rem 1rem;border-radius:1.3rem;background:var(--panel2);text-align:center;color:var(--ink)}
.coll-pic{display:grid;grid-template:minmax(0,1fr)/minmax(0,1fr);place-items:end center;width:100%;height:10rem}
.coll-pic img{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 .3rem .4rem #2b335026)}
.coll-tile small{display:inline-flex;align-items:center;gap:.25rem;color:var(--muted);font-weight:700;font-size:.8rem}
.coll-tile small .cri{width:.9rem;height:.9rem}
.coll-tile.unseen .coll-pic img{filter:brightness(0) opacity(.32)}
.coll-tile.unseen.locked .coll-pic img{filter:grayscale(1) opacity(.45)}
.coll-tile.enemy[data-tier=boss]{box-shadow:inset 0 0 0 .14rem #e5484d55}
.gift-list{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1rem;margin:.6rem 0 1rem}
.gift-item{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1rem;border-radius:1.1rem;background:var(--panel2);color:var(--ink);font-size:1.05rem}
.gift-item .cri,.gift-item img{width:1.8rem;height:1.8rem}
.gift-card{font-size:11px;animation:pop .55s var(--spring)}
.end-unlocks{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin:0 0 1rem;padding:.7rem .9rem;border-radius:1.1rem;background:#fff4d6;color:#5a3b00}
.end-unlocks .cri{width:1.2rem;height:1.2rem;color:#b35c00}
.end-unlocks span{padding:.15rem .6rem;border-radius:99rem;background:#fff;font-size:.85rem;font-weight:800}

/* ---- 手機橫向、播放器裡的矮框 ----
   手牌區是最下面一條（牌的大小由程式照它的高度算），左欄放能量與抽牌堆、右欄放結束回合與棄牌堆，
   敵人和名牌都站在手牌區上面。狀態列只排一行，遺物多了就橫向捲。 */
@media (max-height:500px) and (min-aspect-ratio:801/1000){
  #s-battle{--hand-h:clamp(6.5rem,44vh,15rem);--safe-b:env(safe-area-inset-bottom,0px);--safe-l:env(safe-area-inset-left,0px);--safe-r:env(safe-area-inset-right,0px)}
  .hud{gap:.4rem;padding:.35rem calc(max(.6rem,env(safe-area-inset-right,0px)) + var(--host-right,0px)) .35rem max(.6rem,env(safe-area-inset-left,0px))}
  .hud-hero{padding-right:.7rem}
  .hud-face{width:2.2rem;height:2.2rem}
  .hud-name small{display:none}
  .hud-stat{padding:.25rem .6rem}
  .hud-potions{gap:.2rem;padding:.2rem}
  .potion-slot{width:2rem;height:2rem}
  .hud-relics{flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:.25rem}
  .hud-relics::-webkit-scrollbar{display:none}
  .relic{width:2.1rem;height:2.1rem}
  .relic .cri{width:1.15rem;height:1.15rem}
  .hud-right{min-width:0}
  .hud .icon-btn{width:2.3rem;height:2.3rem;flex:none}
  .hud-floor{min-width:0;overflow:hidden;text-overflow:ellipsis;padding:.3rem .6rem;font-size:.78rem}
  .bt-stage{top:calc(var(--hud-h,3.4rem) + 1rem);bottom:calc(var(--hand-h) + var(--safe-b));padding:0 max(4%,var(--safe-r)) 0 max(4%,var(--safe-l))}
  .unit-plate{grid-auto-rows:max-content;margin-top:.3rem;gap:.2rem}
  .unit-name{max-width:100%;overflow:hidden;text-overflow:ellipsis}
  .unit-status{min-height:1.2rem}
  .bt-bottom{height:calc(var(--hand-h) + var(--safe-b))}
  .bt-hand{left:calc(6.2rem + var(--safe-l));right:calc(9rem + var(--safe-r));top:auto;bottom:var(--safe-b);height:var(--hand-h)}
  .bt-energy{left:calc(.9rem + var(--safe-l));bottom:calc(var(--safe-b) + 4.4rem);width:4.4rem;height:4.4rem;z-index:320}
  .bt-energy::before{inset:-.45rem}
  .bt-energy b{font-size:1.7rem;transform:translateY(-.25rem)}
  .bt-energy b.long{font-size:1rem;-webkit-text-stroke-width:.12rem}
  .bt-energy small{bottom:.35rem;font-size:.68rem}
  .bt-pile{width:3rem;height:3rem;z-index:320}
  .bt-pile .cri{width:1.5rem;height:1.5rem}
  .bt-pile b{min-width:1.3rem;height:1.3rem;font-size:.72rem;line-height:1.3rem}
  .bt-draw{left:calc(1.6rem + var(--safe-l));bottom:calc(var(--safe-b) + .6rem)}
  .bt-discard{right:calc(.9rem + var(--safe-r));bottom:calc(var(--safe-b) + .6rem)}
  .bt-exhaust{right:calc(4.6rem + var(--safe-r));bottom:calc(var(--safe-b) + .6rem);width:2.8rem;height:2.8rem}
  .bt-end{right:calc(.7rem + var(--safe-r));bottom:calc(var(--safe-b) + 4.6rem);min-width:7.6rem;min-height:2.6rem;padding:.4em .9em;font-size:.95rem;z-index:320}
  .bt-wait{right:calc(.7rem + var(--safe-r));bottom:calc(var(--safe-b) + 8rem);z-index:320}
  #s-battle[data-layout=moon] .bt-stage{padding-left:calc(13.5rem + var(--safe-l))}
  #s-battle[data-layout=moon] .bt-players{left:calc(.6rem + var(--safe-l));bottom:.2rem}
  #s-battle[data-layout=moon] .bt-players .unit{width:max-content;min-width:12.5rem;gap:.5rem;padding:.4rem .6rem .4rem .4rem}
  #s-battle[data-layout=moon] .bt-players .unit-figure{width:3.4rem;height:3.4rem}
}

/* ---- 手機直向 ---- */
@media (max-aspect-ratio:4/5){
  html{font-size:clamp(9px,2.6vw,15px)}
  /* 跟橫向一樣一排：英雄在左、敵人在右。照站幾個人平均分寬度，名牌、血條、意圖跟著等比縮。 */
  .bt-stage{top:max(12%,calc(var(--hud-h,0px) + 2.5rem));bottom:30%;gap:1.2rem;padding:0 3%;--fit:calc((94vw - 1.2rem - (var(--pn,1) + var(--en,1) - 2) * .4rem) / (var(--pn,1) + var(--en,1)))}
  #s-battle[data-layout] .bt-side[data-n]{gap:.4rem;min-width:0}
  #s-battle .bt-side[data-n] .unit{--sz:min(13rem,var(--fit));flex:0 1 auto;min-width:0;height:min(100%,calc(var(--sz) * 1.25 + 5.5rem))}
  .bt-side .unit-plate{gap:.2rem}
  .bt-side .unit-name{font-size:clamp(.6rem,calc(var(--sz) * .066),.85rem);padding:.1rem clamp(.35rem,calc(var(--sz) * .055),.7rem)}
  .bt-side .hpbar{height:clamp(.85rem,calc(var(--sz) * .096),1.25rem)}
  .bt-side .hpbar span{font-size:clamp(.6rem,calc(var(--sz) * .06),.78rem)}
  .bt-side .unit-status{min-height:clamp(1.1rem,calc(var(--sz) * .12),1.6rem)}
  .bt-side .st-ico{width:clamp(1.15rem,calc(var(--sz) * .13),1.7rem);height:clamp(1.15rem,calc(var(--sz) * .13),1.7rem)}
  /* 寫字的圖示（加成、禁牌）照字的寬度，不然字會蓋到隔壁。 */
  .bt-side .st-ico.mod{width:auto;padding:0 .3rem}
  .bt-side .st-ico.mod em{font-size:.62rem}
  .bt-side .st-ico.mod.ban{padding-right:.6rem}
  .bt-side .st-ico .cri{width:65%;height:65%}
  .bt-side .unit-intent{gap:.15rem;padding:.2rem clamp(.4rem,calc(var(--sz) * .054),.7rem) .2rem .3rem}
  .bt-side .unit-intent .cri{width:clamp(1.1rem,calc(var(--sz) * .13),1.7rem);height:clamp(1.1rem,calc(var(--sz) * .13),1.7rem)}
  .bt-side .unit-intent b{font-size:clamp(.8rem,calc(var(--sz) * .085),1.1rem)}
  .bt-side .unit-intent small{font-size:clamp(.58rem,calc(var(--sz) * .058),.75rem)}
  .bt-side .unit-block{left:clamp(-1.6rem,calc(var(--sz) * -.12),-1rem);width:clamp(1.7rem,calc(var(--sz) * .185),2.4rem);height:clamp(1.85rem,calc(var(--sz) * .2),2.6rem)}
  .bt-side .unit-block b{font-size:clamp(.7rem,calc(var(--sz) * .07),.9rem)}
  .bt-hand{left:1%;right:1%}
  .bt-bottom{height:25%}
  .bt-energy{left:2%;bottom:auto;top:-2.6rem;width:4.4rem;height:4.4rem}
  .bt-energy b{font-size:1.7rem}
  .bt-energy b.long{font-size:1rem;-webkit-text-stroke-width:.12rem}
  .bt-energy small{bottom:.35rem;font-size:.68rem}
  .bt-energy b{transform:translateY(-.25rem)}
  .bt-end{right:2%;bottom:auto;top:-2.3rem;min-width:7.5rem}
  .bt-wait{right:2%;bottom:auto;top:-5.6rem}
  #app[data-scr="s-battle"] .chat{width:min(18rem,60vw)}
  .bt-draw{left:6.2rem;bottom:auto;top:-2rem;width:3rem;height:3rem}.bt-discard{right:9.6rem;bottom:auto;top:-2rem;width:3rem;height:3rem}.bt-exhaust{right:13rem;bottom:auto;top:-2rem;width:2.8rem;height:2.8rem}
  .bt-pile .cri{width:1.5rem;height:1.5rem}
  .hs-stage{width:100%;height:58%;bottom:auto}
  .hs-info{position:absolute;left:3%;right:3%;top:auto;bottom:7rem;width:auto;transform:none;padding:1rem;max-height:38%;overflow:auto}
  .hs-figure img{max-width:90vw}
  .event-wrap,.end-wrap{grid-template-columns:1fr}
  .event-art{max-height:28vh}
  .end-hero{height:24vh}
  .lobby-seats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .lobby-modes{grid-template-columns:1fr}
  .hud{flex-wrap:wrap;gap:.5rem}
  .hud-relics{order:9;flex-basis:100%;gap:.2rem;padding:.1rem}
  .relic{width:2.1rem;height:2.1rem}
  .relic .cri{width:1.15rem;height:1.15rem}
  /* 狀態列一行：名字收起來只留頭像，遺物在中間橫向捲，不再折成兩排。 */
  .hud{flex-wrap:nowrap;gap:.35rem;padding:max(.45rem,env(safe-area-inset-top,0px)) calc(max(.5rem,env(safe-area-inset-right,0px)) + var(--host-right,0px)) .45rem max(.5rem,env(safe-area-inset-left,0px))}
  .hud-hero{padding:.2rem}
  .hud-face{width:2.2rem;height:2.2rem}
  .hud-name{display:none}
  .hud-stat{gap:.25rem;padding:.25rem .55rem}
  .hud-stat .cri{width:1.05rem;height:1.05rem}
  /* 個人多角色：隊友只留頭像（血量看場上），不然選單會被擠出畫面。 */
  .hud-party{padding:.15rem}
  .hud-party-hp{display:none}
  .hud-potions{gap:.15rem;padding:.2rem}
  .potion-slot{width:1.9rem;height:1.9rem}
  .hud-relics{order:0;flex:1 1 0;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:.25rem}
  .hud-relics::-webkit-scrollbar{display:none}
  .hud-right{gap:.3rem;min-width:0}
  .hud .icon-btn{width:2.2rem;height:2.2rem;flex:none}
  .hud-floor{min-width:0;overflow:hidden;text-overflow:ellipsis;padding:.25rem .5rem;font-size:.7rem}
  /* 由下往上：手牌區、能量／牌堆／結束回合一排、戰場。牌的大小由程式照手牌區的高度算。 */
  #s-battle{--hand-h:clamp(8rem,22vh,15rem);--ctl-h:5rem;--safe-b:env(safe-area-inset-bottom,0px)}
  .bt-stage{top:calc(var(--hud-h,3.6rem) + 1.4rem);bottom:calc(var(--hand-h) + var(--ctl-h) + var(--safe-b))}
  .unit-plate{grid-auto-rows:max-content}
  .unit-name{max-width:100%;overflow:hidden;text-overflow:ellipsis}
  .bt-bottom{height:calc(var(--hand-h) + var(--ctl-h) + var(--safe-b))}
  .bt-hand{top:auto;bottom:var(--safe-b);height:var(--hand-h);left:max(1%,env(safe-area-inset-left,0px));right:max(1%,env(safe-area-inset-right,0px))}
  .bt-energy{top:.3rem;z-index:320}
  .bt-energy::before{inset:-.45rem}
  .bt-end{top:1.05rem;z-index:320}
  .bt-wait{top:auto;bottom:calc(100% + .3rem);z-index:320}
  .bt-pile{z-index:320}
  .bt-draw,.bt-discard{top:1rem}.bt-exhaust{top:1.1rem}
  /* 月圓之夜：英雄卡改成直的小卡站在敵人左邊同一排（隊友往上疊），敵人在剩下的寬度置中。 */
  #s-battle[data-layout=moon] .bt-stage{justify-content:space-between;padding-left:max(3%,env(safe-area-inset-left,0px));--fit:calc((94vw - 1.2rem - (var(--en,1) - 1) * .4rem) / (var(--en,1) + 1))}
  #s-battle[data-layout=moon] .bt-enemies[data-n]{flex:1 1 0;justify-content:center;height:100%;padding-bottom:0}
  #s-battle[data-layout=moon] .bt-enemies[data-n] .unit{--sz:min(14rem,var(--fit))}
  #s-battle[data-layout=moon] .bt-players[data-n]{position:relative;left:auto;bottom:auto;flex:none;justify-content:flex-end;align-items:stretch;height:100%}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit{--sz:min(9.5rem,var(--fit));width:var(--sz);height:auto;flex:none;flex-direction:column;align-items:stretch;gap:.35rem;padding:.5rem .45rem .45rem}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-figure{align-self:center;width:min(4.4rem,62%);height:auto;aspect-ratio:1}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-plate{padding-right:0;justify-items:stretch}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-name,#s-battle[data-layout=moon] .bt-players[data-n] .unit-me{justify-self:center}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-status{justify-content:center}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-handc{top:.35rem;right:.35rem}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit.aimed::before{left:50%;top:calc(.5rem + min(2.2rem,31%));width:min(5.4rem,80%)}
  #s-battle[data-layout=moon] .bt-players[data-n] .unit-summons{align-self:stretch;margin:0}
  /* 手機直式只有一張自己的卡片（一個人玩、玩家對戰）：召喚物排在卡片上方的空位，不用擠在卡片裡捲動 */
  #s-battle[data-layout=moon] .bt-players[data-n="1"] .unit-summons{position:absolute;left:0;bottom:calc(100% + 1.4rem);max-width:calc(100vw - 1.6rem);margin:0;padding-left:.2rem}
  #s-battle[data-layout=moon] .bt-players[data-n="1"] .unit-summons>.summon:first-child{margin-left:0}
}
/* 玩家自己組的卡組（run.deckBuild）：大廳與選角的「我的卡組」那一排、組牌畫面；只有玩家對戰時標題與房間的玩法方塊。 */
.btn-two{display:grid;gap:.05rem;text-align:left;line-height:1.15}
.btn-two small{font-size:.72em;font-weight:800;opacity:.9}
.title-note{margin:0;padding:.6rem .8rem;border-radius:.9rem;background:var(--panel2);color:var(--ink)}
.lobby-modes.single{grid-template-columns:1fr}
.lobby-modes.single .mode-chip{cursor:default}
.lobby-modes.single .mode-chip:hover{transform:none}
.deck-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.4rem .7rem;margin:.8rem 0 0}
.hs-info .deck-bar{justify-content:flex-start;margin:.6rem 0 0}
.deck-state{display:inline-flex;align-items:center;gap:.3rem;color:var(--muted);font-size:.85rem;font-weight:800;line-height:1.35}
.deck-state .cri{flex:none;width:1rem;height:1rem}
.deck-state.ok{color:var(--green)}
.deck-state.bad{color:#c62f34}
.note.deck-block{margin:.5rem 0 0;color:#c62f34;font-size:.85rem;line-height:1.4}
.deckb{display:flex;flex-direction:column;gap:.7rem;max-height:calc(100vh - 2rem);max-height:calc(100dvh - 2rem)}
.deckb-rule{padding:.3rem .8rem;border-radius:99rem;background:var(--panel2);color:var(--ink);font-size:.85rem;font-weight:800}
.deckb-decks{display:flex;flex-wrap:wrap;gap:.4rem}
.deckb-decks .chip{display:inline-flex;align-items:center;gap:.4rem}
.deckb-decks .chip small{min-width:1.4rem;padding:0 .35rem;border-radius:99rem;background:#ffffffcc;color:var(--ink);font-size:.75rem}
.deckb-decks .chip .cri{width:1rem;height:1rem}
.deckb-head{display:flex;flex-wrap:wrap;align-items:flex-end;gap:.6rem 1rem}
.deckb-head .field input{font-size:1rem;letter-spacing:0;padding:.5rem .8rem}
.deckb-heroes{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem}
.deckb-heroes>span{color:var(--muted);font-size:.85rem;font-weight:800}
.deckb-heroes .hero-pill{font-size:.9rem}
.deckb-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(15rem,19rem);gap:1rem;min-height:0;flex:1}
.deckb-pool{display:flex;flex-direction:column;gap:.5rem;min-height:0}
.deckb-search{padding:.55rem .9rem;border:.14rem solid var(--line2);border-radius:.9rem;background:#fff;color:var(--ink);font:800 .95rem/1.2 var(--font);outline:none;-webkit-user-select:text;user-select:text}
.deckb-search:focus{border-color:var(--blue);box-shadow:0 0 0 .25rem #2a66d626}
.deckb-grid{max-height:min(50vh,34rem);flex:1;min-height:12rem;padding:.6rem .4rem 1rem;grid-template-columns:repeat(auto-fill,minmax(8.6rem,1fr));gap:1rem .7rem;font-size:clamp(8px,.72rem,11px);border-radius:1rem;background:var(--panel2)}
.deckb-card.full{opacity:.45}
.deckb-n{position:absolute;right:-.2rem;top:-.4rem;z-index:3;padding:.1rem .5rem;border-radius:99rem;background:var(--blue);color:#fff;font:900 1.1em/1.3 var(--font);box-shadow:0 .15rem 0 #1c4a9e}
.deckb-list{display:flex;flex-direction:column;gap:.4rem;min-height:0}
.deckb-count{display:grid;gap:.2rem;padding:.6rem .8rem;border-radius:1rem;background:var(--panel2);color:var(--ink)}
.deckb-list ul{list-style:none;margin:0;padding:0;display:grid;gap:.3rem;overflow:auto;flex:1;min-height:6rem;align-content:start}
.deckb-row{display:flex;align-items:center;gap:.5rem;width:100%;padding:.4rem .6rem;border:0;border-radius:.8rem;background:#fff;color:var(--ink);font:inherit;text-align:left;cursor:pointer;box-shadow:inset 0 0 0 .1rem var(--line)}
.deckb-row:hover{box-shadow:inset 0 0 0 .14rem var(--red)}
.deckb-row.bad{box-shadow:inset 0 0 0 .14rem #c62f34;background:#fff1f1}
.deckb-row b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.9rem}
.deckb-row .cri{flex:none;width:.9rem;height:.9rem;color:var(--muted)}
.deckb-cost{flex:none;display:grid;place-items:center;width:1.5rem;height:1.5rem;border-radius:50%;background:var(--blue);color:#fff;font-size:.78rem;font-weight:900}
.deckb-x{color:var(--muted);font-weight:900;font-size:.85rem}
.deckb-foot{flex-wrap:wrap;justify-content:flex-start;gap:.5rem;margin-top:0}
.deckb-gap{flex:1}
@media (max-width:900px),(max-height:500px){
  .deckb{padding:1rem}
  .deckb-body{grid-template-columns:1fr}
  .deckb-grid{max-height:34vh;max-height:34dvh;min-height:9rem;grid-template-columns:repeat(auto-fill,minmax(6.6rem,1fr));font-size:clamp(7px,.6rem,10px)}
  .deckb-list ul{max-height:6.5rem;min-height:3rem}
  .deckb-head .field{flex:1 1 100%}
  .deckb-gap{display:none}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;export{e as cardRogueRuntimeCss};
