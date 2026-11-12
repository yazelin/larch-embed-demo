import{r as i}from"./graphicsQuality-CiPxtIDC.js";import{i as a,w as r}from"./index-9VaqR6SS.js";const l=`
.l3d-slow-tip{position:absolute;left:50%;top:max(12%,54px);transform:translateX(-50%);z-index:6;pointer-events:auto;display:flex;align-items:center;gap:10px;max-width:calc(100% - 24px);padding:8px 8px 8px 18px;border-radius:999px;background:rgba(14,18,32,.72);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;font:600 14px/1.3 system-ui,"Noto Sans TC",sans-serif;animation:l3d-slow-tip-in .32s cubic-bezier(.2,1.4,.4,1)}
.l3d-slow-tip span{min-width:0}
.l3d-slow-tip button{flex:none;min-height:36px;border:0;border-radius:999px;padding:0 16px;font:700 14px/1 system-ui,"Noto Sans TC",sans-serif;cursor:pointer}
.l3d-slow-tip [data-go]{background:#fff;color:#141a2c}
.l3d-slow-tip [data-go]:hover{background:#e9edf8}
.l3d-slow-tip [data-no]{background:rgba(255,255,255,.14);color:#fff}
.l3d-slow-tip [data-no]:hover{background:rgba(255,255,255,.24)}
.l3d-slow-tip button:focus-visible{outline:2px solid #fff;outline-offset:2px}
.l3d-slow-tip.is-out{opacity:0;transition:opacity .25s ease}
@keyframes l3d-slow-tip-in{from{opacity:0;transform:translate(-50%,-8px)}to{opacity:1;transform:translate(-50%,0)}}
@media (max-width:560px){.l3d-slow-tip{flex-wrap:wrap;justify-content:center;border-radius:18px;padding:10px 12px;text-align:center}.l3d-slow-tip span{flex:1 1 100%}.l3d-slow-tip button{min-height:40px}}
@media (prefers-reduced-motion:reduce){.l3d-slow-tip{animation:none}}
`,o="larch-l3d-graphics-mode",n=t=>t==="performance"||t==="quality";function s(){if(typeof window>"u")return!1;const t=window.matchMedia?.("(pointer: coarse)").matches??!1,e=typeof screen<"u"&&screen.width>0&&Math.min(screen.width,screen.height)<=600;return t||e}function c(){const t=a(o);return n(t)?t:s()&&i()==="auto"?"performance":"quality"}function f(t){r(o,t)}export{l as S,n as i,c as r,f as w};
