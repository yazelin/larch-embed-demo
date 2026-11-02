import{V as $,d as C,G as T,e as W,v as U,c as H,b as N,a$ as E}from"./three-engine-ZCw1R4k9.js";import{G as z,r as O}from"./modelDoc-B6vf5Cyd.js";import{r as v,j as t}from"./react-core-CuKebU_E.js";import{G as D}from"./grip-vertical-gHWBimhY.js";import{p as F,a as G,s as _,b as V,c as Y,d as X,e as K}from"./L3dSplit-g1vayybu.js";import{I as B}from"./image-up-DALXV18V.js";import{I as q}from"./images-CFHjbxew.js";import{C as J}from"./check-ClhcYNuF.js";import{C as Q}from"./copy-Ca8sZXR3.js";import{L as Z}from"./loader-circle-B3BoloJC.js";function P(d,a){const s=O(a),r=new Float32Array(d*16),u=new Float32Array(d*12),o=new Uint32Array(d*6);for(let l=0;l<d;l++){const y=[s(),s(),s(),s()];for(let p=0;p<4;p++)r.set(y,(l*4+p)*4);u.set([-1,0,0,1,0,0,1,1,0,-1,1,0],l*12),o.set([l*4,l*4+1,l*4+2,l*4,l*4+2,l*4+3],l*6)}const i=new H;return i.setAttribute("aSeed",new N(r,4)),i.setAttribute("position",new N(u,3)),i.setIndex(new N(o,1)),i.boundingSphere=new E(new $,1e5),i}const I=`
${z}
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
`,ee=`
${I}
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
}`,te=`
${z}
varying float vAlpha;
void main() {
  if (vAlpha < .01) discard;
  vec3 col = mix(uHemiSky * 1.15 + vec3(.12), vec3(.85, .9, 1.), .45);
  gl_FragColor = vec4(col, vAlpha * .36);
}`,ae=`
${I}
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
}`,se=`
${z}
varying vec2 vUv;
varying float vPhase;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float ring = smoothstep(.16, 0., abs(d - .8)) * step(d, 1.);
  if (ring * vAlpha < .01) discard;
  gl_FragColor = vec4(mix(uHemiSky, vec3(1.), .5), ring * vAlpha * .3);
}`,ie=`
${I}
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
}`,re=`
${z}
varying vec2 vUv;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float a = smoothstep(1., .25, d) * vAlpha;
  if (a < .01) discard;
  vec3 col = mix(vec3(.92, .95, 1.), uHemiSky + vec3(.55), .25) * (1. - uNight * .45);
  gl_FragColor = vec4(col, a * .92);
}`;class xe{constructor(a,s,r){this.env=a;const u=r==="low"?.45:r==="medium"?.7:1;this.uniforms={...a,uCam:{value:new $},uBox:{value:26},uAmount:{value:0},uHeight:{value:18},tHeight:{value:s.heightTex},tWater:{value:s.waterTex},uWorld:{value:s.size},uSea:{value:s.sea}};const o=(i,l)=>new W({uniforms:this.uniforms,vertexShader:i,fragmentShader:l,transparent:!0,depthWrite:!1,side:U});this.rain=new C(P(Math.round(11e3*u),31),o(ee,te)),this.splash=new C(P(Math.round(1400*u),53),o(ae,se)),this.snow=new C(P(Math.round(7e3*u),71),o(ie,re));for(const i of[this.rain,this.splash,this.snow])i.frustumCulled=!1,i.visible=!1,i.renderOrder=30,this.group.add(i);this.group.name="l3d-weather"}env;group=new T;rain;splash;snow;uniforms;kind="clear";amount=0;target=0;flashIn=4;flash=0;baseSnow=0;onLightning;set(a){this.kind=a,this.target=a==="rain"?.75:a==="storm"?1:a==="snow"?.85:0}update(a,s,r){this.amount+=(this.target-this.amount)*Math.min(1,a*.8),this.amount<.005&&this.target===0&&(this.amount=0);const u=this.kind==="snow";this.uniforms.uCam.value.copy(s),this.uniforms.uAmount.value=this.amount,this.uniforms.uSea.value=r,this.rain.visible=this.amount>0&&!u,this.splash.visible=this.rain.visible,this.snow.visible=this.amount>0&&u;const o=this.env,i=this.kind==="rain"||this.kind==="storm"?1:0;o.uWetness.value+=(i-o.uWetness.value)*Math.min(1,a*(i?.25:.06));const l=Math.max(u?.8:0,this.baseSnow);return o.uSnowCover.value+=(l-o.uSnowCover.value)*Math.min(1,a*(this.baseSnow>0&&o.uSnowCover.value<this.baseSnow?4:u?.05:.03)),this.kind==="storm"&&(this.flashIn-=a,this.flashIn<=0&&(this.flashIn=5+Math.random()*9,this.flash=1,this.onLightning?.())),this.flash=Math.max(0,this.flash-a*3.2),this.flash>0?Math.max(0,Math.sin(this.flash*Math.PI*2.5))*this.flash:0}dispose(){for(const a of[this.rain,this.splash,this.snow])a.geometry.dispose(),a.material.dispose()}}function ye({tools:d,groups:a,active:s,onPick:r,storageKey:u,phone:o,disabled:i,actions:l=[]}){const[y,p]=v.useState(()=>{try{const e=localStorage.getItem(u);return e==="right"||e==="top"||e==="bottom"?e:"left"}catch{return"left"}}),[g,f]=v.useState(null),[S,b]=v.useState(null),h=v.useRef(null),j=v.useRef(null),w=o?"bottom":y,k=(e,c)=>{const x=j.current?.parentElement?.getBoundingClientRect();if(!x)return w;const A={left:e-x.left,right:x.right-e,top:c-x.top,bottom:x.bottom-c};return Object.keys(A).reduce((M,R)=>A[R]<A[M]?R:M)},n=e=>{p(e);try{localStorage.setItem(u,e)}catch{}},m=w==="left"||w==="right";return t.jsxs(t.Fragment,{children:[S&&t.jsx("span",{className:`l3d-capsule-target to-${S}`,"aria-hidden":"true"}),t.jsxs("div",{ref:j,className:`l3d-capsule edge-${w}${m?" is-vertical":" is-horizontal"}${g?" is-dragging":""}`,style:g?{translate:`${g.x}px ${g.y}px`}:void 0,role:"toolbar","aria-label":"工具","aria-orientation":m?"vertical":"horizontal",children:[!o&&t.jsx("button",{type:"button",className:"l3d-capsule-grip","aria-label":"拖曳工具列（方向鍵也可以換到別的邊）",title:"拖曳到畫面的任一邊",onPointerDown:e=>{e.button===0&&(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),h.current={pointer:e.pointerId,x:e.clientX,y:e.clientY},f({x:0,y:0}))},onPointerMove:e=>{const c=h.current;c?.pointer===e.pointerId&&(f({x:e.clientX-c.x,y:e.clientY-c.y}),b(k(e.clientX,e.clientY)))},onPointerUp:e=>{h.current?.pointer===e.pointerId&&(h.current=null,f(null),b(null),n(k(e.clientX,e.clientY)))},onPointerCancel:()=>{h.current=null,f(null),b(null)},onKeyDown:e=>{const c={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"top",ArrowDown:"bottom"}[e.key];c&&(e.preventDefault(),n(c))},children:t.jsx(D,{})}),d.map((e,c)=>t.jsxs("span",{className:"l3d-capsule-slot",children:[a?.includes(c)&&t.jsx("i",{className:"l3d-capsule-sep","aria-hidden":"true"}),t.jsxs("button",{type:"button","aria-pressed":s===e.id,"aria-label":e.key?`${e.label}（${e.key}）`:e.label,disabled:i?.(e.id),onClick:()=>r(e.id),children:[e.icon,t.jsxs("span",{className:"l3d-capsule-tip","aria-hidden":"true",children:[e.label,e.key&&t.jsx("kbd",{children:e.key})]})]})]},e.id)),l.map((e,c)=>t.jsxs("span",{className:"l3d-capsule-slot",children:[c===0&&t.jsx("i",{className:"l3d-capsule-sep","aria-hidden":"true"}),t.jsxs("button",{type:"button",className:"is-toggle","aria-pressed":!!e.pressed,"aria-label":e.label,"data-action":e.id,onClick:e.onClick,children:[e.icon,t.jsx("span",{className:"l3d-capsule-tip","aria-hidden":"true",children:e.label})]})]},e.id))]})]})}async function L(d){const a=new FormData;a.append("file",d);const s=await fetch("/api/akarion/media",{method:"POST",body:a,credentials:"same-origin"}),r=await s.json().catch(()=>({}));if(!s.ok||!(r.public_url||r.url))throw new Error(r.error||"圖片上傳失敗");return r.public_url||r.url}function ne(d){const s=[["px","right","posx","右"],["nx","left","negx","左"],["py","top","up","posy","上"],["ny","bottom","down","negy","下"],["pz","front","posz","前"],["nz","back","negz","後"]].map(r=>d.find(u=>{const o=u.name.toLowerCase().replace(/\.[^.]+$/,"");return r.some(i=>o===i||o.endsWith(`_${i}`)||o.endsWith(`-${i}`)||o.endsWith(i))}));return s.every(Boolean)&&new Set(s).size===6?s:d}const oe=d=>new Promise(a=>{const s=URL.createObjectURL(d),r=new Image;r.onload=()=>{a({w:r.naturalWidth,h:r.naturalHeight}),URL.revokeObjectURL(s)},r.onerror=()=>{a({w:0,h:0}),URL.revokeObjectURL(s)},r.src=s});function be({value:d,onChange:a,readOnly:s,noneLabel:r="關掉天空"}){const u=v.useRef(null),o=v.useRef(null),[i,l]=v.useState(""),[y,p]=v.useState(""),[g,f]=v.useState(""),[S,b]=v.useState(!1),h=F(d),j=n=>{p(""),f(""),a(n)},w=[{id:void 0,name:"依時間變化",swatch:_(void 0)},...V.map(n=>({id:n.id,name:n.name,swatch:_(n.id)})),{id:"none",name:r,swatch:G}],k=n=>n===void 0?h.kind==="painted":n==="none"?h.kind==="none":h.kind==="preset"&&h.preset.id===n;return t.jsxs("div",{className:"l3d-sky-picker",children:[t.jsxs("div",{className:"l3d-sky-grid",role:"group","aria-label":"天空",children:[w.map(n=>t.jsxs("button",{type:"button","aria-pressed":k(n.id),disabled:s,onClick:()=>j(n.id),title:n.name,children:[t.jsx("i",{style:{background:n.swatch},"aria-hidden":"true"}),t.jsx("span",{children:n.name})]},n.id??"painted")),(h.kind==="image"||h.kind==="cube")&&t.jsxs("button",{type:"button","aria-pressed":!0,disabled:s,title:"自己的天空圖",children:[t.jsx("i",{className:"is-picture","aria-hidden":"true",children:t.jsx(B,{})}),t.jsx("span",{children:h.kind==="image"?"自己的全景圖":"自己的六張圖"})]})]}),t.jsx("input",{ref:u,type:"file",hidden:!0,accept:"image/png,image/jpeg,image/webp",onChange:async n=>{const m=n.target.files?.[0];if(n.target.value="",!!m){l("上傳全景圖中…"),p(""),f("");try{const{w:e,h:c}=await oe(m),x=await L(m);a(Y(x)),e&&c&&Math.abs(e/c-2)>.08&&f(`這張圖是 ${e}×${c}，不是 2:1：天空會被拉長。等距柱狀全景圖要寬是高的兩倍（例如 4096×2048）。`)}catch(e){p(e instanceof Error?e.message:String(e))}finally{l("")}}}}),t.jsx("input",{ref:o,type:"file",hidden:!0,multiple:!0,accept:"image/png,image/jpeg,image/webp",onChange:async n=>{const m=[...n.target.files||[]];if(n.target.value="",!!m.length){if(m.length!==6){p(`立方體天空要剛好六張圖（現在是 ${m.length} 張）：右、左、上、下、前、後。`);return}l("上傳六張天空圖中…"),p(""),f("");try{const e=[];for(const c of ne(m))e.push(await L(c));a(X(e))}catch(e){p(e instanceof Error?e.message:String(e))}finally{l("")}}}}),t.jsxs("div",{className:"dsect-actions",children:[t.jsxs("button",{type:"button",disabled:s||!!i,onClick:()=>u.current?.click(),children:[t.jsx(B,{}),"上傳全景圖"]}),t.jsxs("button",{type:"button",disabled:s||!!i,onClick:()=>o.current?.click(),children:[t.jsx(q,{}),"上傳六張圖"]}),t.jsxs("button",{type:"button",onClick:()=>{navigator.clipboard?.writeText(K).then(()=>{b(!0),setTimeout(()=>b(!1),1800)})},children:[S?t.jsx(J,{}):t.jsx(Q,{}),S?"已複製":"製作方法給 AI"]})]}),i&&t.jsxs("p",{className:"l3d-hint","aria-live":"polite",children:[t.jsx(Z,{className:"spin"}),i]}),g&&t.jsx("p",{className:"l3d-hint",children:g}),y&&t.jsx("p",{className:"l3d-hint l3d-error",role:"alert",children:y}),t.jsx("p",{className:"l3d-hint",children:"全景圖用 2:1 的等距柱狀圖（例如 4096×2048）；六張圖是立方體的右、左、上、下、前、後，檔名帶 px／nx／py／ny／pz／nz 會自動排好。"})]})}export{ye as L,xe as P,be as a,L as u};
