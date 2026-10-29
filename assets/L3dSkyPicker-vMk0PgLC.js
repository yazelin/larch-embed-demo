import{c as B,m as T}from"./index-Bs7J9eks.js";import{V as $,o as A,G as W,S as U,D as H,g as E,B as C,aY as D}from"./three-engine-DgueuEcG.js";import{H as j,r as O}from"./stageModel-CnGp4kR2.js";import{r as m,j as t}from"./react-core-CuKebU_E.js";import{G as F}from"./grip-vertical-CF_MXWNJ.js";import{p as G,a as Y,s as I,b as V,c as X,d as K,e as q}from"./L3dSplit-Bvahp6ue.js";import{I as R}from"./image-up-Pg1grl_k.js";import{I as J}from"./upload-4HTylpyQ.js";import{C as Q}from"./copy-BSWO0hfZ.js";import{L as Z}from"./loader-circle-BtZ4s4KB.js";const ee=[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",key:"10n0gc"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814",key:"16shm9"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",key:"1lxi77"}]],we=B("rotate-3d",ee);const te=[["path",{d:"M5 7v11a1 1 0 0 0 1 1h11",key:"13dt1j"}],["path",{d:"M5.293 18.707 11 13",key:"ezgbsx"}],["circle",{cx:"19",cy:"19",r:"2",key:"17f5cg"}],["circle",{cx:"5",cy:"5",r:"2",key:"1gwv83"}]],Se=B("scale-3d",te);function P(d,a){const s=O(a),n=new Float32Array(d*16),u=new Float32Array(d*12),l=new Uint32Array(d*6);for(let c=0;c<d;c++){const y=[s(),s(),s(),s()];for(let h=0;h<4;h++)n.set(y,(c*4+h)*4);u.set([-1,0,0,1,0,0,1,1,0,-1,1,0],c*12),l.set([c*4,c*4+1,c*4+2,c*4,c*4+2,c*4+3],c*6)}const i=new E;return i.setAttribute("aSeed",new C(n,4)),i.setAttribute("position",new C(u,3)),i.setIndex(new C(l,1)),i.boundingSphere=new D(new $,1e5),i}const M=`
${j}
uniform vec3 uCam;
uniform float uBox;
uniform float uAmount;
uniform sampler2D tHeight;
uniform sampler2D tWater;
uniform float uWorld;
uniform float uSea;
attribute vec4 aSeed;
float surfaceAt(vec2 xz) {
  vec2 uv = (xz + uWorld * .5) / uWorld;
  float g = texture(tHeight, uv).r;
  if (any(lessThan(uv, vec2(0.))) || any(greaterThan(uv, vec2(1.)))) g = -1000.;
  return max(g, max(uSea, texture(tWater, clamp(uv, 0., 1.)).r));
}
/** The copy of this drop's world-anchored spot that is nearest the camera. */
vec2 around(vec2 base) { return base + uBox * floor((uCam.xz - base) / uBox + .5); }
`,ae=`
${M}
uniform float uHeight;
varying float vAlpha;
void main() {
  vec2 corner = position.xy;
  if (aSeed.w > uAmount) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float speed = 15. + aSeed.z * 4.;
  vec2 drift = uWindDir * uWindStrength * 3.2;
  float fall = mod(uTime * speed + aSeed.z * 97., uHeight);
  vec2 xz = around(aSeed.xy * uBox);
  vec3 p = vec3(xz.x + drift.x * fall / speed, uCam.y + uHeight * .6 - fall, xz.y + drift.y * fall / speed);
  float alive = step(surfaceAt(p.xz), p.y);
  vec3 dir = normalize(vec3(drift.x, -speed, drift.y));
  vec3 toCam = normalize(cameraPosition - p);
  vec3 side = normalize(cross(dir, toCam));
  float near = length(p - cameraPosition);
  vec3 q = p - dir * corner.y * (.3 + aSeed.z * .3) + side * corner.x * (.0045 + near * .0011);
  vAlpha = alive * smoothstep(.6, 2.6, near) * (1. - smoothstep(uBox * .32, uBox * .5, length(xz - uCam.xz))) * (.55 + aSeed.w * .45);
  gl_Position = projectionMatrix * viewMatrix * vec4(q, 1.);
}`,se=`
${j}
varying float vAlpha;
void main() {
  if (vAlpha < .01) discard;
  vec3 col = mix(uHemiSky * 1.15 + vec3(.12), vec3(.85, .9, 1.), .45);
  gl_FragColor = vec4(col, vAlpha * .36);
}`,ie=`
${M}
varying vec2 vUv;
varying float vPhase;
varying float vAlpha;
void main() {
  vec2 corner = vec2(position.x, position.y * 2. - 1.);
  if (aSeed.w > uAmount) { gl_Position = vec4(2., 2., 2., 1.); return; }
  vPhase = fract(uTime * (1.6 + aSeed.z * 1.2) + aSeed.z * 13.);
  vec2 xz = around(aSeed.xy * uBox) + (aSeed.zw - .5) * .6;
  float y = surfaceAt(xz) + .03;
  float r = .05 + vPhase * .15;
  vUv = corner;
  vAlpha = (1. - vPhase) * (1. - smoothstep(uBox * .3, uBox * .5, length(xz - uCam.xz)));
  gl_Position = projectionMatrix * viewMatrix * vec4(xz.x + corner.x * r, y, xz.y + corner.y * r, 1.);
}`,re=`
${j}
varying vec2 vUv;
varying float vPhase;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float ring = smoothstep(.16, 0., abs(d - .8)) * step(d, 1.);
  if (ring * vAlpha < .01) discard;
  gl_FragColor = vec4(mix(uHemiSky, vec3(1.), .5), ring * vAlpha * .3);
}`,ne=`
${M}
uniform float uHeight;
varying vec2 vUv;
varying float vAlpha;
void main() {
  vec2 corner = vec2(position.x, position.y * 2. - 1.);
  if (aSeed.w > uAmount) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float speed = .9 + aSeed.z * .7;
  float fall = mod(uTime * speed + aSeed.z * 53., uHeight);
  vec2 xz = around(aSeed.xy * uBox);
  vec2 drift = uWindDir * uWindStrength * 1.4 * fall / speed;
  float sway = sin(uTime * (.9 + aSeed.w * .8) + aSeed.z * 40.) * .45;
  vec3 p = vec3(xz.x + drift.x + sway, uCam.y + uHeight * .6 - fall, xz.y + drift.y + cos(uTime * .7 + aSeed.x * 30.) * .35);
  float alive = smoothstep(-.05, .25, p.y - surfaceAt(p.xz));
  vec3 toCam = normalize(cameraPosition - p);
  vec3 right = normalize(cross(vec3(0., 1., 0.), toCam));
  vec3 up = cross(toCam, right);
  float size = .032 + aSeed.w * .04;
  vUv = corner;
  vAlpha = alive * smoothstep(.4, 1.6, length(p - cameraPosition)) * (1. - smoothstep(uBox * .32, uBox * .5, length(xz - uCam.xz)));
  gl_Position = projectionMatrix * viewMatrix * vec4(p + (right * corner.x + up * corner.y) * size, 1.);
}`,oe=`
${j}
varying vec2 vUv;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float a = smoothstep(1., .25, d) * vAlpha;
  if (a < .01) discard;
  vec3 col = mix(vec3(.92, .95, 1.), uHemiSky + vec3(.55), .25) * (1. - uNight * .45);
  gl_FragColor = vec4(col, a * .92);
}`;class be{constructor(a,s,n){this.env=a;const u=n==="low"?.45:n==="medium"?.7:1;this.uniforms={...a,uCam:{value:new $},uBox:{value:26},uAmount:{value:0},uHeight:{value:18},tHeight:{value:s.heightTex},tWater:{value:s.waterTex},uWorld:{value:s.size},uSea:{value:s.sea}};const l=(i,c)=>new U({uniforms:this.uniforms,vertexShader:i,fragmentShader:c,transparent:!0,depthWrite:!1,side:H});this.rain=new A(P(Math.round(11e3*u),31),l(ae,se)),this.splash=new A(P(Math.round(1400*u),53),l(ie,re)),this.snow=new A(P(Math.round(7e3*u),71),l(ne,oe));for(const i of[this.rain,this.splash,this.snow])i.frustumCulled=!1,i.visible=!1,i.renderOrder=30,this.group.add(i);this.group.name="l3d-weather"}env;group=new W;rain;splash;snow;uniforms;kind="clear";amount=0;target=0;flashIn=4;flash=0;baseSnow=0;onLightning;set(a){this.kind=a,this.target=a==="rain"?.75:a==="storm"?1:a==="snow"?.85:0}update(a,s,n){this.amount+=(this.target-this.amount)*Math.min(1,a*.8),this.amount<.005&&this.target===0&&(this.amount=0);const u=this.kind==="snow";this.uniforms.uCam.value.copy(s),this.uniforms.uAmount.value=this.amount,this.uniforms.uSea.value=n,this.rain.visible=this.amount>0&&!u,this.splash.visible=this.rain.visible,this.snow.visible=this.amount>0&&u;const l=this.env,i=this.kind==="rain"||this.kind==="storm"?1:0;l.uWetness.value+=(i-l.uWetness.value)*Math.min(1,a*(i?.25:.06));const c=Math.max(u?.8:0,this.baseSnow);return l.uSnowCover.value+=(c-l.uSnowCover.value)*Math.min(1,a*(this.baseSnow>0&&l.uSnowCover.value<this.baseSnow?4:u?.05:.03)),this.kind==="storm"&&(this.flashIn-=a,this.flashIn<=0&&(this.flashIn=5+Math.random()*9,this.flash=1,this.onLightning?.())),this.flash=Math.max(0,this.flash-a*3.2),this.flash>0?Math.max(0,Math.sin(this.flash*Math.PI*2.5))*this.flash:0}dispose(){for(const a of[this.rain,this.splash,this.snow])a.geometry.dispose(),a.material.dispose()}}function ke({tools:d,groups:a,active:s,onPick:n,storageKey:u,phone:l,disabled:i}){const[c,y]=m.useState(()=>{try{const e=localStorage.getItem(u);return e==="right"||e==="top"||e==="bottom"?e:"left"}catch{return"left"}}),[h,g]=m.useState(null),[x,w]=m.useState(null),f=m.useRef(null),v=m.useRef(null),S=l?"bottom":c,k=(e,r)=>{const p=v.current?.parentElement?.getBoundingClientRect();if(!p)return S;const b={left:e-p.left,right:p.right-e,top:r-p.top,bottom:p.bottom-r};return Object.keys(b).reduce((N,_)=>b[_]<b[N]?_:N)},z=e=>{y(e);try{localStorage.setItem(u,e)}catch{}},o=S==="left"||S==="right";return t.jsxs(t.Fragment,{children:[x&&t.jsx("span",{className:`l3d-capsule-target to-${x}`,"aria-hidden":"true"}),t.jsxs("div",{ref:v,className:`l3d-capsule edge-${S}${o?" is-vertical":" is-horizontal"}${h?" is-dragging":""}`,style:h?{translate:`${h.x}px ${h.y}px`}:void 0,role:"toolbar","aria-label":"工具","aria-orientation":o?"vertical":"horizontal",children:[!l&&t.jsx("button",{type:"button",className:"l3d-capsule-grip","aria-label":"拖曳工具列（方向鍵也可以換到別的邊）",title:"拖曳到畫面的任一邊",onPointerDown:e=>{e.button===0&&(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),f.current={pointer:e.pointerId,x:e.clientX,y:e.clientY},g({x:0,y:0}))},onPointerMove:e=>{const r=f.current;r?.pointer===e.pointerId&&(g({x:e.clientX-r.x,y:e.clientY-r.y}),w(k(e.clientX,e.clientY)))},onPointerUp:e=>{f.current?.pointer===e.pointerId&&(f.current=null,g(null),w(null),z(k(e.clientX,e.clientY)))},onPointerCancel:()=>{f.current=null,g(null),w(null)},onKeyDown:e=>{const r={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"top",ArrowDown:"bottom"}[e.key];r&&(e.preventDefault(),z(r))},children:t.jsx(F,{})}),d.map((e,r)=>t.jsxs("span",{className:"l3d-capsule-slot",children:[a?.includes(r)&&t.jsx("i",{className:"l3d-capsule-sep","aria-hidden":"true"}),t.jsxs("button",{type:"button","aria-pressed":s===e.id,"aria-label":e.key?`${e.label}（${e.key}）`:e.label,disabled:i?.(e.id),onClick:()=>n(e.id),children:[e.icon,t.jsxs("span",{className:"l3d-capsule-tip","aria-hidden":"true",children:[e.label,e.key&&t.jsx("kbd",{children:e.key})]})]})]},e.id))]})]})}async function L(d){const a=new FormData;a.append("file",d);const s=await fetch("/api/akarion/media",{method:"POST",body:a,credentials:"same-origin"}),n=await s.json().catch(()=>({}));if(!s.ok||!(n.public_url||n.url))throw new Error(n.error||"圖片上傳失敗");return n.public_url||n.url}function le(d){const s=[["px","right","posx","右"],["nx","left","negx","左"],["py","top","up","posy","上"],["ny","bottom","down","negy","下"],["pz","front","posz","前"],["nz","back","negz","後"]].map(n=>d.find(u=>{const l=u.name.toLowerCase().replace(/\.[^.]+$/,"");return n.some(i=>l===i||l.endsWith(`_${i}`)||l.endsWith(`-${i}`)||l.endsWith(i))}));return s.every(Boolean)&&new Set(s).size===6?s:d}const ce=d=>new Promise(a=>{const s=URL.createObjectURL(d),n=new Image;n.onload=()=>{a({w:n.naturalWidth,h:n.naturalHeight}),URL.revokeObjectURL(s)},n.onerror=()=>{a({w:0,h:0}),URL.revokeObjectURL(s)},n.src=s});function ze({value:d,onChange:a,readOnly:s,noneLabel:n="關掉天空"}){const u=m.useRef(null),l=m.useRef(null),[i,c]=m.useState(""),[y,h]=m.useState(""),[g,x]=m.useState(""),[w,f]=m.useState(!1),v=G(d),S=o=>{h(""),x(""),a(o)},k=[{id:void 0,name:"依時間變化",swatch:I(void 0)},...V.map(o=>({id:o.id,name:o.name,swatch:I(o.id)})),{id:"none",name:n,swatch:Y}],z=o=>o===void 0?v.kind==="painted":o==="none"?v.kind==="none":v.kind==="preset"&&v.preset.id===o;return t.jsxs("div",{className:"l3d-sky-picker",children:[t.jsxs("div",{className:"l3d-sky-grid",role:"group","aria-label":"天空",children:[k.map(o=>t.jsxs("button",{type:"button","aria-pressed":z(o.id),disabled:s,onClick:()=>S(o.id),title:o.name,children:[t.jsx("i",{style:{background:o.swatch},"aria-hidden":"true"}),t.jsx("span",{children:o.name})]},o.id??"painted")),(v.kind==="image"||v.kind==="cube")&&t.jsxs("button",{type:"button","aria-pressed":!0,disabled:s,title:"自己的天空圖",children:[t.jsx("i",{className:"is-picture","aria-hidden":"true",children:t.jsx(R,{})}),t.jsx("span",{children:v.kind==="image"?"自己的全景圖":"自己的六張圖"})]})]}),t.jsx("input",{ref:u,type:"file",hidden:!0,accept:"image/png,image/jpeg,image/webp",onChange:async o=>{const e=o.target.files?.[0];if(o.target.value="",!!e){c("上傳全景圖中…"),h(""),x("");try{const{w:r,h:p}=await ce(e),b=await L(e);a(X(b)),r&&p&&Math.abs(r/p-2)>.08&&x(`這張圖是 ${r}×${p}，不是 2:1：天空會被拉長。等距柱狀全景圖要寬是高的兩倍（例如 4096×2048）。`)}catch(r){h(r instanceof Error?r.message:String(r))}finally{c("")}}}}),t.jsx("input",{ref:l,type:"file",hidden:!0,multiple:!0,accept:"image/png,image/jpeg,image/webp",onChange:async o=>{const e=[...o.target.files||[]];if(o.target.value="",!!e.length){if(e.length!==6){h(`立方體天空要剛好六張圖（現在是 ${e.length} 張）：右、左、上、下、前、後。`);return}c("上傳六張天空圖中…"),h(""),x("");try{const r=[];for(const p of le(e))r.push(await L(p));a(K(r))}catch(r){h(r instanceof Error?r.message:String(r))}finally{c("")}}}}),t.jsxs("div",{className:"dsect-actions",children:[t.jsxs("button",{type:"button",disabled:s||!!i,onClick:()=>u.current?.click(),children:[t.jsx(R,{}),"上傳全景圖"]}),t.jsxs("button",{type:"button",disabled:s||!!i,onClick:()=>l.current?.click(),children:[t.jsx(J,{}),"上傳六張圖"]}),t.jsxs("button",{type:"button",onClick:()=>{navigator.clipboard?.writeText(q).then(()=>{f(!0),setTimeout(()=>f(!1),1800)})},children:[w?t.jsx(T,{}):t.jsx(Q,{}),w?"已複製":"製作方法給 AI"]})]}),i&&t.jsxs("p",{className:"l3d-hint","aria-live":"polite",children:[t.jsx(Z,{className:"spin"}),i]}),g&&t.jsx("p",{className:"l3d-hint",children:g}),y&&t.jsx("p",{className:"l3d-hint l3d-error",role:"alert",children:y}),t.jsx("p",{className:"l3d-hint",children:"全景圖用 2:1 的等距柱狀圖（例如 4096×2048）；六張圖是立方體的右、左、上、下、前、後，檔名帶 px／nx／py／ny／pz／nz 會自動排好。"})]})}export{ke as L,be as P,we as R,Se as S,ze as a,L as u};
