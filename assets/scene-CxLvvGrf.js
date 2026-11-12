import{az as No,aw as Do,b9 as la,k as bt,a9 as de,d as pt,ba as ei,bb as si,V as g,C as W,a6 as ho,a7 as uo,a8 as Fi,a as Bt,b as K,M as Ut,s as te,G as mt,c as H,L as Zo,h as yt,T as ds,a1 as Ko,F as fs,U as Se,e as ze,Q as be,J as ca,j as ot,R as kt,aD as Fs,X as Ei,Z as xs,_ as fo,av as bs,aX as Ae,x as he,ad as ha,ae as us,aA as Qo,aE as Ri,a_ as Wo,ab as Ee,f as Ne,a2 as ps,v as Is,aM as ua,i as ke,aa as Qe,a4 as to,B as po,I as Ni,af as Ie,o as Lo,p as Vo,aG as Ys,aF as $s,r as da,q as fa,P as Jo,bc as pa,n as ma,S as Di,D as Oo,H as Wi,A as ga,aK as oi,b1 as va,aL as wa,bd as ya,W as xa,b8 as ba,b0 as Ma,b2 as Sa,be as za}from"./three-engine-DBk0tA82.js";import{c as Zs}from"./compileQuietly-CK7nzn7y.js";import{s as De,c as Re,a as dt,G as Nt,f as ue,m as Gt,p as B,b as Fe,n as ka,d as Ca}from"./creatureShape-CDUtiiYs.js";import{N as We,C as Es,W as Li,G as Ta}from"./school-DdimvPJz.js";import{a as Vi,R as Aa,c as Pa}from"./rippleSim-BL3e2kPe.js";import{f as Oi,h as ii,I as _a}from"./layout-3RIFKfAW.js";import{a as ai,c as Ia}from"./graphicsQuality-CiPxtIDC.js";import"./react-core-Ci-x9IAP.js";import"./index-9VaqR6SS.js";import"./preload-helper-BXl3LOEh.js";const ni=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Fa=`
uniform sampler2D tScene;
uniform vec2 uLight;
uniform float uThreshold;
varying vec2 vUv;
void main() {
  vec2 delta = (vUv - uLight) / 36.0;
  vec2 uv = vUv;
  float decay = 1.0;
  vec3 sum = vec3(0.0);
  for (int i = 0; i < 36; i++) {
    uv -= delta;
    vec3 c = texture2D(tScene, uv).rgb;
    float l = max(max(c.r, c.g), c.b);
    sum += c * smoothstep(uThreshold, uThreshold + 0.6, l) * decay;
    decay *= 0.955;
  }
  gl_FragColor = vec4(sum / 36.0, 1.0);
}
`,Ea=`
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform sampler2D tRays;
uniform float uBloom;
uniform float uRays;
uniform vec3 uRayTint;
uniform float uAberration;
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform float uSplit;
uniform float uSaturation;
uniform float uExposure;
uniform vec2 uResolution;
uniform float uFrame;
varying vec2 vUv;
#include <tonemapping_pars_fragment>
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main() {
  vec2 c = vUv - 0.5;
  float edge = dot(c, c);
  // 色差只在畫面四角（中間完全清楚）：角落大約 uAberration 個像素的一半
  vec2 shift = c * (edge * 2.0) * uAberration / uResolution;
  vec3 col;
  col.r = texture2D(tScene, vUv - shift).r;
  col.g = texture2D(tScene, vUv).g;
  col.b = texture2D(tScene, vUv + shift).b;
  col += texture2D(tBloom, vUv).rgb * uBloom;
  col += texture2D(tRays, vUv).rgb * uRayTint * uRays;
  col *= uExposure;
  col = NeutralToneMapping(col);
  // 分離色調：暗部偏青藍、亮部偏奶油暖色（動畫電影的調色）
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col *= mix(vec3(1.0), mix(uShadowTint, uHighlightTint, smoothstep(0.08, 0.75, l)), uSplit);
  col = mix(vec3(l), col, uSaturation);
  vec4 outColor = sRGBTransferOETF(vec4(clamp(col, 0.0, 1.0), 1.0));
  // 抖動：半階的雜訊，天空和深海的漸層不會出現色帶（看不出顆粒）
  outColor.rgb += (ign(gl_FragCoord.xy + uFrame * 5.588238) - 0.5) / 255.0;
  gl_FragColor = outColor;
}
`;class Ra{constructor(t,s){this.renderer=t,this.sceneTarget=new No(1,1,{type:Do,samples:4}),this.bloom=new la(new bt(1,1),.3,.55,1),this.bloom.blendMaterial.visible=!1,this.raysTarget=s.rays?new No(1,1,{type:Do,minFilter:de,magFilter:de,depthBuffer:!1}):null,this.raysMaterial=s.rays?new pt({uniforms:{tScene:{value:null},uLight:{value:new bt(.5,.5)},uThreshold:{value:.9}},vertexShader:ni,fragmentShader:Fa,depthTest:!1,depthWrite:!1,blending:ei}):null,this.raysQuad=this.raysMaterial?new si(this.raysMaterial):null,this.grade=new pt({uniforms:{tScene:{value:null},tBloom:{value:null},tRays:{value:null},uBloom:{value:1},uRays:{value:0},uRayTint:{value:new g(1,.95,.85)},uAberration:{value:2.2},uShadowTint:{value:new g(.93,1,1.06)},uHighlightTint:{value:new g(1.04,1.01,.95)},uSplit:{value:1},uSaturation:{value:1.06},uExposure:{value:1},uResolution:{value:new bt(1,1)},uFrame:{value:0}},vertexShader:ni,fragmentShader:Ea,depthTest:!1,depthWrite:!1,blending:ei,toneMapped:!1}),this.gradeQuad=new si(this.grade)}renderer;bloom;sceneTarget;raysTarget;gradeQuad;raysQuad;grade;raysMaterial;frame=0;lightScreen=new g;forward=new g;rays=0;setSize(t,s,e){const o=Math.max(1,Math.round(t*e)),i=Math.max(1,Math.round(s*e));this.sceneTarget.setSize(o,i),this.bloom.setSize(o,i),this.raysTarget?.setSize(Math.max(1,Math.round(o/4)),Math.max(1,Math.round(i/4))),this.grade.uniforms.uResolution.value.set(o,i)}setLight(t,s){if(!this.raysMaterial||s.getWorldDirection(this.forward).dot(t)<.15)return 0;const o=this.lightScreen.copy(t).multiplyScalar(400).add(s.position).project(s);this.raysMaterial.uniforms.uLight.value.set(o.x*.5+.5,o.y*.5+.5);const i=Math.max(Math.abs(o.x),Math.abs(o.y));return 1-Math.min(1,Math.max(0,(i-.9)/.7))}async compileAsync(t,s,e){const o=this.renderer,i=o.getRenderTarget();o.setRenderTarget(this.sceneTarget);const a=Zs(o,t,s,e);o.setRenderTarget(i),await a}render(t,s,e){const o=this.renderer;o.setRenderTarget(this.sceneTarget),o.render(t,s),this.bloom.render(o,null,this.sceneTarget,0,!1);const i=this.grade.uniforms;this.raysQuad&&this.raysTarget&&this.rays>.01?(this.raysMaterial.uniforms.tScene.value=this.sceneTarget.texture,o.setRenderTarget(this.raysTarget),this.raysQuad.render(o),i.tRays.value=this.raysTarget.texture,i.uRays.value=this.rays):(i.tRays.value=this.sceneTarget.texture,i.uRays.value=0),i.tScene.value=this.sceneTarget.texture,i.tBloom.value=this.bloom.renderTargetsHorizontal[0].texture,i.uExposure.value=e,i.uFrame.value=this.frame++%64,o.setRenderTarget(null),this.gradeQuad.render(o)}dispose(){this.sceneTarget.dispose(),this.raysTarget?.dispose(),this.bloom.dispose(),this.grade.dispose(),this.raysMaterial?.dispose(),this.gradeQuad.dispose(),this.raysQuad?.dispose()}}function Na(){return{uTime:{value:0},uSunDir:{value:new g(.45,.78,.42).normalize()},uSunColor:{value:new W("#fff1d6")},uSkyColor:{value:new W("#bfe6ff")},uGroundColor:{value:new W("#9cc46e")},uNight:{value:0},uUnder:{value:0},uDepth:{value:0},uGlow:{value:0},uSkyTop:{value:new W("#3f9ef0")},uSkyHorizon:{value:new W("#cdeeff")},uSkyHaze:{value:new W("#fff4dc")},uWaterGlow:{value:new W("#8ff0ff")},uWaterFog:{value:new W("#1d9cc4")},uWaterAbyss:{value:new W("#0f6a9a")},uWaterRays:{value:0}}}const Os={light:{skyTop:"#8d9ee6",skyHorizon:"#ffd2c6",haze:"#fff0dc",sunDir:new g(-.2,.3,-.93).normalize(),sunColor:"#fff0dc",sunIntensity:1.9,fillDir:new g(.35,.5,.8).normalize(),fillColor:"#ffe2ec",fillIntensity:.55,hemiSky:"#dfe2ff",hemiGround:"#c9a9a0",hemiIntensity:1,fog:"#eed2d6",fogDensity:.0016,foam:"#ffffff",sand:"#fbe9cf",cloudLit:"#fffaf5",cloudMid:"#ffe0e6",cloudShade:"#bdb6ea"},dark:{skyTop:"#121842",skyHorizon:"#4a4386",haze:"#c8b6ff",sunDir:new g(-.16,.27,-.95).normalize(),sunColor:"#cfd8ff",sunIntensity:1,fillDir:new g(.35,.5,.8).normalize(),fillColor:"#8f8ae6",fillIntensity:.4,hemiSky:"#7480d6",hemiGround:"#40386e",hemiIntensity:1.2,fog:"#1c2050",fogDensity:.006,foam:"#dfe8ff",sand:"#a6a0bc",cloudLit:"#9c9ee0",cloudMid:"#7472bc",cloudShade:"#3a3a7c"}},Da={light:[{depth:0,fog:"#1d9cc4",glow:"#8ff0ff",abyss:"#0f6a9a",density:.052,hemi:1,light:"#c4f6ff"},{depth:3,fog:"#1b93c0",glow:"#82eaff",abyss:"#0e6094",density:.036,hemi:.96,light:"#b8f0fd"},{depth:8,fog:"#1781b8",glow:"#6fdcf6",abyss:"#0b4f86",density:.027,hemi:.9,light:"#a4e6fa"},{depth:18,fog:"#0f5a99",glow:"#3fa8e0",abyss:"#072f66",density:.03,hemi:.72,light:"#7cc0ea"},{depth:30,fog:"#0a3772",glow:"#2271b8",abyss:"#04173d",density:.034,hemi:.56,light:"#5d92d8"},{depth:42,fog:"#072656",glow:"#1a5298",abyss:"#030c26",density:.036,hemi:.5,light:"#5683cc"},{depth:52,fog:"#0a4058",glow:"#1f7ea0",abyss:"#04202e",density:.032,hemi:.62,light:"#6fd0d6"}],dark:[{depth:0,fog:"#0e3f5e",glow:"#3f8fb8",abyss:"#082a44",density:.056,hemi:.78,light:"#7cc4e6"},{depth:3,fog:"#0d3a59",glow:"#3787b2",abyss:"#07263f",density:.04,hemi:.74,light:"#74bce2"},{depth:8,fog:"#0b3352",glow:"#2e78a6",abyss:"#06213c",density:.033,hemi:.68,light:"#6aaedc"},{depth:18,fog:"#08243f",glow:"#1f5a8c",abyss:"#04142a",density:.036,hemi:.55,light:"#5590c8"},{depth:30,fog:"#05162d",glow:"#153f72",abyss:"#020a1a",density:.04,hemi:.45,light:"#4673b4"},{depth:42,fog:"#040f22",glow:"#10305e",abyss:"#020714",density:.044,hemi:.4,light:"#4062a8"},{depth:52,fog:"#062a36",glow:"#13586e",abyss:"#02141c",density:.04,hemi:.5,light:"#4fb6c0"}]},Gs=new W,Bs=new W;function Wa(l,t,s={fog:new W,glow:new W,abyss:new W,density:0,hemi:0,light:new W}){const e=Da[l];let o=0;for(;o<e.length-2&&t>e[o+1].depth;)o++;const i=e[o],a=e[o+1],n=Math.min(1,Math.max(0,(t-i.depth)/(a.depth-i.depth))),r=n*n*(3-2*n);return s.fog.copy(Gs.set(i.fog).lerp(Bs.set(a.fog),r)),s.glow.copy(Gs.set(i.glow).lerp(Bs.set(a.glow),r)),s.abyss.copy(Gs.set(i.abyss).lerp(Bs.set(a.abyss),r)),s.density=i.density+(a.density-i.density)*r,s.hemi=i.hemi+(a.hemi-i.hemi)*r,s.light.copy(Gs.set(i.light).lerp(Bs.set(a.light),r)),s}function mo(l){let t=l>>>0||2654435769;return()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}class La{pos=[];nor=[];col=[];part=[];sway=[];idx=[];add(t,s,e,o,i,a){const n=this.pos.length/3;for(let r=0;r<t.length;r+=3)this.pos.push(t[r],t[r+1],t[r+2]),this.nor.push(s[r],s[r+1],s[r+2]),this.col.push(e[r],e[r+1],e[r+2]),this.part.push(i),this.sway.push(a(t[r+1],t[r],t[r+2]));for(const r of o)this.idx.push(n+r)}build(){const t=new Bt;return t.setAttribute("position",new K(new Float32Array(this.pos),3)),t.setAttribute("normal",new K(new Float32Array(this.nor),3)),t.setAttribute("color",new K(new Float32Array(this.col),3)),t.setAttribute("aPart",new K(new Float32Array(this.part),1)),t.setAttribute("aSway",new K(new Float32Array(this.sway),1)),t.setIndex(this.idx),t.computeBoundingSphere(),t.computeBoundingBox(),t}}function Va(l){const t=(1+Math.sqrt(5))/2;let s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(o=>{const i=Math.hypot(o[0],o[1],o[2]);return[o[0]/i,o[1]/i,o[2]/i]}),e=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let o=0;o<l;o++){const i=new Map,a=(r,c)=>{const h=r<c?`${r}_${c}`:`${c}_${r}`,u=i.get(h);if(u!==void 0)return u;const m=s[r],f=s[c],d=[(m[0]+f[0])/2,(m[1]+f[1])/2,(m[2]+f[2])/2],p=Math.hypot(d[0],d[1],d[2]);return s.push([d[0]/p,d[1]/p,d[2]/p]),i.set(h,s.length-1),s.length-1},n=[];for(const[r,c,h]of e){const u=a(r,c),m=a(c,h),f=a(h,r);n.push([r,u,f],[c,m,u],[h,f,m],[u,m,f])}e=n}return s=s.slice(),{positions:s.flat(),indices:e.flat()}}function eo(l,t,s,e){const o=(p,v,w)=>{let y=Math.imul(p,374761393)+Math.imul(v,668265263)+Math.imul(w,1440662683)+Math.imul(e,2246822519);return y=Math.imul(y^y>>>13,1274126177),((y^y>>>16)>>>0)/4294967296},i=Math.floor(l),a=Math.floor(t),n=Math.floor(s),r=l-i,c=t-a,h=s-n,u=r*r*(3-2*r),m=c*c*(3-2*c),f=h*h*(3-2*h),d=(p,v,w)=>p+(v-p)*w;return d(d(d(o(i,a,n),o(i+1,a,n),u),d(o(i,a+1,n),o(i+1,a+1,n),u),m),d(d(o(i,a,n+1),o(i+1,a,n+1),u),d(o(i,a+1,n+1),o(i+1,a+1,n+1),u),m),f)}const Mo=l=>new W(l);function Oa(l,t,s,e,o,i,a,n,r,c,h,u=.22){const m=Va(r),f=[],d=[],p=[];for(let v=0;v<m.positions.length;v+=3){const w=m.positions[v],y=m.positions[v+1],x=m.positions[v+2],M=eo(w*2.2+i,y*2.2,x*2.2,i)-.5,k=eo(w*5.1+i*.3,y*5.1,x*5.1,i+7)-.5,P=1+M*u*2+k*u*.6,T=t.x+w*s.x*P,F=t.y+y*s.y*P,I=t.z+x*s.z*P;f.push(T,F,I);const _=T-e.x,O=(F-e.y)*1.15,V=I-e.z,N=Math.hypot(_,O,V)||1;let R=w*.45+_/N*.55,X=y*.45+O/N*.55,$=x*.45+V/N*.55;const nt=Math.hypot(R,X,$)||1;R/=nt,X/=nt,$/=nt,d.push(R,X,$);const ut=Math.min(1,N/o),ft=(X+1)/2,wt=Math.max(0,Math.min(1,ut*.55+ft*.55-.12+k*.3)),G=a.clone().lerp(n,wt);p.push(G.r,G.g,G.b)}l.add(f,d,p,m.indices,c,v=>Math.max(0,v)*h)}function ri(l,t,s,e,o,i,a,n=7,r=5){const c=mo(a),h=s.clone().sub(t),u=h.length();h.normalize();const m=Math.abs(h.y)<.9?new g(0,1,0).cross(h).normalize():new g(1,0,0),f=h.clone().cross(m).normalize(),d=new g((c()-.5)*.3,0,(c()-.5)*.3).multiplyScalar(u),p=[],v=[],w=[],y=[];for(let x=0;x<=r;x++){const M=x/r,k=t.clone().addScaledVector(h,u*M).addScaledVector(d,Math.sin(M*Math.PI)*.5),P=e+(o-e)*M,T=x===0?1.35:1;for(let F=0;F<n;F++){const I=F/n*Math.PI*2,_=m.clone().multiplyScalar(Math.cos(I)).addScaledVector(f,Math.sin(I)),O=1+(eo(Math.cos(I)*2,M*4,Math.sin(I)*2,a)-.5)*.25,V=k.clone().addScaledVector(_,P*T*O);p.push(V.x,V.y,V.z),v.push(_.x,_.y,_.z);const N=.78+.22*M+(eo(I*3,M*9,0,a+3)-.5)*.2;w.push(i.r*N,i.g*N,i.b*N)}}for(let x=0;x<r;x++)for(let M=0;M<n;M++){const k=x*n+M,P=x*n+(M+1)%n,T=k+n,F=P+n;y.push(k,T,P,P,T,F)}l.add(p,v,w,y,0,x=>Math.max(0,x)*.02)}const Ga={tree:{dark:"#1f4a24",light:"#86b94a",bark:"#6a4a35",height:[2.4,3.4],crown:[1.9,2.6],blobs:[5,8]},blossom:{dark:"#c95f8a",light:"#ffd3e2",bark:"#5d4436",height:[2.2,3],crown:[1.8,2.4],blobs:[5,8]},autumn:{dark:"#a3451f",light:"#ffbf4a",bark:"#5e4433",height:[2.4,3.2],crown:[1.8,2.5],blobs:[5,7]},birch:{dark:"#4f7d2a",light:"#c7e07a",bark:"#e8e2d6",height:[3.4,4.4],crown:[1.4,1.9],blobs:[4,6]}};let Pe=null;function Ba(){if(Pe)return Pe;const l=512,t=l/2,s=document.createElement("canvas");s.width=s.height=l;const e=s.getContext("2d"),o=(i,a,n,r)=>{const c=mo(n),h=i+t/2,u=a+t/2,m=r?90:22;for(let f=0;f<m;f++){const d=c()*Math.PI*2,p=Math.pow(c(),.7)*t*(r?.36:.3),v=h+Math.cos(d)*p,w=u+Math.sin(d)*p,y=r?t*(.16+c()*.1):t*(.17+c()*.11),x=r?t*.016:y*(.42+c()*.16),M=r?d+(c()-.5)*.5:d+Math.PI/2+(c()-.5)*1.3,k=Math.round(150+c()*105);e.save(),e.translate(v,w),e.rotate(M),e.fillStyle=`rgb(${k},${k},${k})`,e.beginPath(),e.moveTo(0,-y/2),e.quadraticCurveTo(x,-y*.05,0,y/2),e.quadraticCurveTo(-x,-y*.05,0,-y/2),e.fill(),r||(e.fillStyle="rgba(255,255,255,.18)",e.beginPath(),e.moveTo(0,-y/2),e.quadraticCurveTo(x,-y*.05,0,y/2),e.closePath(),e.fill(),e.strokeStyle="rgba(0,0,0,.16)",e.lineWidth=t*.006,e.beginPath(),e.moveTo(0,-y*.45),e.lineTo(0,y*.45),e.stroke()),e.restore()}};return o(0,0,11,!1),o(t,0,23,!1),o(0,t,37,!1),o(t,t,51,!0),Pe=new ho(s),Pe.colorSpace=uo,Pe.generateMipmaps=!0,Pe.minFilter=Fi,Pe.magFilter=de,Pe.anisotropy=4,Pe}const li={tree:{dark:"#21503b",mid:"#468a48",light:"#7db862",warm:"#a7c978"},blossom:{dark:"#b9557f",mid:"#f19ab8",light:"#ffe2ec",warm:"#fff0d8"},autumn:{dark:"#8f3c1f",mid:"#e0782f",light:"#ffc95a",warm:"#ffe08a"},birch:{dark:"#46783c",mid:"#82b758",light:"#c2dd88",warm:"#dde29c"},bush:{dark:"#265839",mid:"#4a8c46",light:"#7eb862",warm:"#a5c777"},pine:{dark:"#123827",mid:"#25603d",light:"#5b9a58",warm:"#9cbf6a"}};class Ua{pos=[];corner=[];card=[];nor=[];col=[];idx=[];add(t,s,e,o,i,a,n,r,c){const h=this.pos.length/3,u=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[m,f]of u)this.pos.push(t.x,t.y,t.z),this.corner.push(m,f),this.card.push(e,o,n+i,a),this.nor.push(s.x,s.y,s.z),this.col.push(r.r,r.g,r.b,c);this.idx.push(h,h+1,h+2,h,h+2,h+3)}build(){const t=new Bt;return t.setAttribute("position",new K(new Float32Array(this.pos),3)),t.setAttribute("aCorner",new K(new Float32Array(this.corner),2)),t.setAttribute("aCard",new K(new Float32Array(this.card),4)),t.setAttribute("normal",new K(new Float32Array(this.nor),3)),t.setAttribute("aTint",new K(new Float32Array(this.col),4)),t.setIndex(this.idx),t.computeBoundingSphere(),t.boundingSphere&&(t.boundingSphere.radius+=1.2),t.computeBoundingBox(),t}}function ja(l,t,s,e,o,i={}){const a=new Ua,n=mo(o*131+7),r=new W(e.dark),c=new W(e.mid),h=new W(e.light),u=new W(e.warm||e.light),m=i.quadrants??[0,1,2],f=new W;for(const d of l){const p=Math.max(10,Math.round(d.r*d.r*58*(i.density??1)));for(let v=0;v<p;v++){const w=new g(n()*2-1,n()*2-.7,n()*2-1);w.lengthSq()<1e-4&&w.set(0,1,0),w.normalize();const y=.38+.62*Math.sqrt(n()),x=d.c.clone().addScaledVector(w,d.r*y),M=x.clone().sub(t),k=M.length()/Math.max(s,.01),P=w.clone().multiplyScalar(.55).add(M.normalize().multiplyScalar(.45)).normalize(),T=P.y*.5+.5,F=Math.min(1,Math.max(0,T*.55+y*.35+(n()-.5)*.25));f.copy(r).lerp(c,Math.min(1,F*1.6)).lerp(h,Math.max(0,F*1.6-.6)),P.y>.55&&n()<.4&&f.lerp(u,.35);const I=1+(n()-.5)*.14;f.multiplyScalar(I);const _=Math.min(1,y*.55+T*.35+Math.min(1,k)*.2),O=d.r*(i.size??.46)*(.75+n()*.5),V=Math.max(0,x.y)*(i.swayScale??.08);a.add(x,P,O,n()*Math.PI*2,n()*.99,_,m[Math.floor(n()*m.length)],f.clone(),V)}}return a.build()}function Ha(l,t){const s=Ga[l],e=mo(t*977+13),o=new La,i=s.height[0]+e()*(s.height[1]-s.height[0]),a=s.crown[0]+e()*(s.crown[1]-s.crown[0]),n=Mo(s.bark),r=new g((e()-.5)*.4,i,(e()-.5)*.4);ri(o,new g(0,-.15,0),r,.2*(l==="birch"?.7:1),.11,n,t);const c=new g(r.x,i+a*.5,r.z);for(let d=0;d<3;d++){const p=e()*Math.PI*2,v=new g(r.x*.6,i*(.55+e()*.2),r.z*.6);ri(o,v,new g(Math.cos(p)*a*.55,i+a*.3,Math.sin(p)*a*.55),.08,.045,n,t+d*31,5,3)}const h=[{c:c.clone(),r:a*.78}],u=Math.round(s.blobs[0]+e()*(s.blobs[1]-s.blobs[0]));for(let d=0;d<u;d++){const p=d/u*Math.PI*2+e()*.6,v=a*(.5+e()*.22);h.push({c:new g(c.x+Math.cos(p)*v,c.y+(e()-.4)*a*.8,c.z+Math.sin(p)*v),r:a*(.42+e()*.22)})}h.push({c:new g(c.x+(e()-.5)*.4,c.y+a*.55,c.z+(e()-.5)*.4),r:a*.48});const m=li[l]??li.tree,f=Mo(m.dark).multiplyScalar(.7);for(const d of h)Oa(o,d.c,new g(d.r*.62,d.r*.55,d.r*.62),c,a,t+Math.round(d.c.x*100),f,Mo(m.dark),1,1,.08,.12);return{solid:o.build(),cards:ja(h,c,a,m,t,{quadrants:[0,1,2]})}}function qa(l){const t=new Ut({vertexColors:!0,roughness:.88,metalness:0});t.onBeforeCompile=e=>{e.uniforms.uTime=l.uTime,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aSway;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        // 樹冠跟著風慢慢晃，越高晃越多
        transformed.xz += vec2(sin(uTime * 1.3 + position.y * 0.6), cos(uTime * 1.05 + position.y * 0.5)) * aSway * 0.05;`)},t.customProgramCacheKey=()=>"island-tree-solid";const s=new pt({uniforms:{uTime:l.uTime,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uNight:l.uNight,tLeaf:{value:Ba()}},vertexShader:`
      uniform float uTime;
      attribute vec2 aCorner;
      attribute vec4 aCard;
      attribute vec4 aTint;
      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vAo;
      void main() {
        float scale = length(modelMatrix[0].xyz);
        vec4 centerW = modelMatrix * vec4(position, 1.0);
        float rnd = fract(aCard.z);
        // 整個樹冠隨風、每張葉子各自輕輕抖
        centerW.xz += vec2(sin(uTime * 1.3 + position.y * 0.6), cos(uTime * 1.05 + position.y * 0.5)) * aTint.w * scale * 0.05;
        float ang = aCard.y + sin(uTime * (2.2 + rnd * 2.0) + rnd * 40.0) * 0.1;
        vec2 c = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (aCorner * aCard.x * scale);
        vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
        vec3 camUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
        vec3 camBack = vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
        centerW.xyz += camRight * c.x + camUp * c.y + camBack * aCard.x * scale * 0.15;
        vNormal = normalize(mat3(modelMatrix) * normal);
        vColor = aTint.rgb;
        float quad = floor(aCard.z);
        vUv = (aCorner * 0.5 + 0.5) * 0.5 + vec2(mod(quad, 2.0), floor(quad / 2.0)) * 0.5;
        vAo = aCard.w;
        gl_Position = projectionMatrix * viewMatrix * centerW;
      }`,fragmentShader:`
      uniform sampler2D tLeaf;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform vec3 uSkyColor;
      uniform vec3 uGroundColor;
      uniform float uNight;
      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec2 vUv;
      varying float vAo;
      void main() {
        vec4 leaf = texture2D(tLeaf, vUv);
        float a = (leaf.a - 0.45) / max(fwidth(leaf.a), 1e-3) + 0.5;
        if (a < 0.5) discard;
        vec3 n = normalize(vNormal);
        vec3 col = vColor * (0.74 + leaf.r * 0.4);
        // 圓圓的樹冠：柔和的包覆光＋天空與地面的環境光，背光的葉子透一點暖光
        float diff = smoothstep(-0.35, 0.85, dot(n, uSunDir));
        vec3 ambient = mix(uGroundColor, uSkyColor, n.y * 0.5 + 0.5);
        vec3 lit = col * (uSunColor * diff * 0.95 + ambient * mix(0.5, 1.08, vAo));
        lit += col * uSunColor * pow(max(-dot(n, uSunDir), 0.0), 2.0) * 0.18;
        gl_FragColor = vec4(lit, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,side:te});return{solid:t,cards:s,dispose:()=>{t.dispose(),s.dispose()}}}function Gi(l,t,s,e){const o=Ha(l,t*101+l.length*7+1),i=new mt;i.name=`tree-${l}`;const a=new H(o.solid,s.solid);a.castShadow=!0,a.receiveShadow=!0,i.add(a),o.cards&&i.add(new H(o.cards,s.cards));const n=o.solid.boundingBox,r=n?n.max.y:5;return i.scale.setScalar(e/Math.max(1,r*1.08)),i}const Xa={tree:new W("#7db862"),blossom:new W("#f19ab8"),autumn:new W("#ffc95a"),birch:new W("#c2dd88")};function Ya(){const l=new mt;l.name="bottle";const t=[],s=22;for(let u=0;u<=s;u++){const m=u/s,f=m*.62,d=m<.62?.12+Math.sin(Math.min(1,m/.12)*Math.PI/2)*.02-Math.max(0,m-.5)*.25:.05-(m-.62)*.02;t.push(new bt(Math.max(.035,d),f))}const e=new Ut({color:"#bff3ec",roughness:.05,metalness:0,transparent:!0,opacity:.42,envMapIntensity:1.4,depthWrite:!1}),o=new Ut({color:"#fff4d8",roughness:.85}),i=new Ut({color:"#b98a5a",roughness:.9}),a=new Ut({color:"#ff8fb1",roughness:.5}),n=new H(new Zo(t,24),e);n.position.y=-.3,n.renderOrder=6;const r=new H(new yt(.055,.055,.34,14),o);r.position.y=-.08;const c=new H(new ds(.058,.012,8,20),a);c.rotation.x=Math.PI/2,c.position.y=-.08;const h=new H(new yt(.045,.04,.09,12),i);h.position.y=.35;for(const u of[r,c,h,n])u.castShadow=u!==n,l.add(u);return l.scale.setScalar(2.1),l}const So=`
uniform float uTime;
uniform float uSeed;
uniform vec3 uGrab;
uniform vec3 uPull;
uniform float uRadius;
uniform float uBase;
uniform float uHeight;
uniform float uSquash;
uniform vec3 uShear;
uniform float uBulge;
uniform float uOutlineWidth;
uniform vec2 uResolution;
varying vec3 vObj;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_vertex>

vec3 deform(vec3 p) {
  float h = clamp((p.y - uBase) / uHeight, 0.0, 1.0);
  float sy = 1.0 + uSquash;
  float sxz = inversesqrt(max(sy, 0.25));
  // 壓扁時肚子鼓出來（體積還在，像果凍被按下去）
  float bulge = 1.0 + uBulge * max(-uSquash, 0.0) * 4.0 * h * (1.0 - h);
  vec3 q = vec3(p.x * sxz * bulge, uBase + (p.y - uBase) * sy, p.z * sxz * bulge);
  // 呼吸：一圈很小、往上走的波
  q.xz *= 1.0 + 0.022 * h * sin(uTime * 2.3 + p.y * 3.1 + uSeed);
  vec3 rel = p - uGrab;
  float w = exp(-dot(rel, rel) / (uRadius * uRadius));
  float stick = smoothstep(0.0, 0.6, h);
  float k = max(w, 0.3 * h) * mix(0.2, 1.0, stick);
  q += uPull * k;
  // 整顆往一邊晃：底部黏著地，越上面晃得越多
  q.xz += uShear.xz * h * h * uHeight;
  float len = length(uPull);
  if (len > 1e-4) {
    vec3 dir = uPull / len;
    vec3 off = q - (uGrab + uPull * k);
    vec3 perp = off - dir * dot(off, dir);
    q -= perp * w * clamp(len / (uRadius * 2.6), 0.0, 0.4);
  }
  return q;
}

void main() {
  vec3 n = normalize(normal);
  vec3 t = normalize(abs(n.y) < 0.95 ? cross(n, vec3(0.0, 1.0, 0.0)) : cross(n, vec3(1.0, 0.0, 0.0)));
  vec3 b = cross(n, t);
  float e = 0.015;
  vec3 p0 = deform(position);
  vec3 p1 = deform(position + t * e);
  vec3 p2 = deform(position + b * e);
  vec3 dn = cross(p1 - p0, p2 - p0);
  dn = length(dn) > 1e-8 ? normalize(dn) : n;
  if (dot(dn, n) < 0.0) dn = -dn;
  vObj = position;
  vec4 world = modelMatrix * vec4(p0, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * dn);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #ifdef OUTLINE
    // 描邊：沿著螢幕上的法線方向往外推固定的像素寬
    vec3 viewNormal = normalize(mat3(viewMatrix) * vNormalW);
    vec2 outlineDir = (projectionMatrix * vec4(viewNormal, 0.0)).xy;
    float outlineLen = length(outlineDir);
    if (outlineLen > 1e-5) gl_Position.xy += outlineDir / outlineLen * uOutlineWidth * gl_Position.w * 2.0 / uResolution;
    gl_Position.z += 0.0006 * gl_Position.w;
  #endif
  #include <fog_vertex>
}
`,Bi=`
uniform vec4 uClip[4];
uniform int uClipCount;
void clipJelly(vec3 p) {
  for (int i = 0; i < 4; i++) {
    if (i >= uClipCount) break;
    if (dot(p, uClip[i].xyz) > uClip[i].w + 0.0015) discard;
  }
}
`,$a=`
uniform vec3 uDeep;
varying vec3 vObj;
${Bi}
#include <fog_pars_fragment>
void main() {
  clipJelly(vObj);
  gl_FragColor = vec4(uDeep * 0.42 + vec3(0.03, 0.02, 0.06), 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,ci=`
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
uniform vec3 uDeep;
uniform vec3 uTop;
uniform float uTopStart;
uniform float uOpacity;
uniform float uBack;
uniform float uFace;
uniform float uBlink;
/** 0＝平常、1＝嚇一跳、2＝被切開（X_X）。 */
uniform float uMood;
uniform vec3 uFaceCenter;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uNight;
varying vec3 vObj;
varying vec3 vWorld;
varying vec3 vNormalW;
${Bi}
#include <fog_pars_fragment>

float ellipse(vec2 p, vec2 c, vec2 r) {
  vec2 q = (p - c) / r;
  float d = dot(q, q);
  return 1.0 - smoothstep(0.82, 1.0, d);
}

void main() {
  clipJelly(vObj);
  vec3 N = normalize(vNormalW);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorld);
  float ndl = dot(N, uSunDir);
  float wrap = clamp((ndl + 0.5) / 1.5, 0.0, 1.0);
  vec3 ambient = mix(uGroundColor, uSkyColor, N.y * 0.5 + 0.5);
  vec3 tint = vObj.y > uTopStart ? uTop : uColor;
  float facing = clamp(dot(N, V), 0.0, 1.0);
  float fres = pow(1.0 - facing, 2.6);
  vec4 outColor;
  if (uBack > 0.5) {
    // 內側：顏色更深，像光在果凍裡走了一段路
    vec3 inner = mix(uDeep, tint, 0.5) * (ambient * 0.8 + uSunColor * wrap * 0.4);
    outColor = vec4(inner, 0.52);
  } else {
    // 動畫風：亮面／暗面兩階，交界柔一點；暗面帶一點果凍自己的深色
    float band = smoothstep(0.36, 0.46, wrap);
    vec3 lit = tint * (uSunColor * 0.62 + ambient * 0.48);
    vec3 shade = mix(uDeep, tint, 0.38) * (ambient * 0.78 + uSunColor * 0.12);
    vec3 col = mix(shade, lit, band);
    // 背光時透出來的亮色
    float through = pow(clamp(dot(V, -uSunDir) * 0.5 + 0.5, 0.0, 1.0), 3.0) * (1.0 - facing);
    col += tint * through * 0.45;
    // 厚度：正中間光要穿過厚厚一層，顏色深一點、飽和一點；邊緣薄，留著亮色（像真的果凍）
    float thick = pow(facing, 1.6);
    vec3 deepLit = mix(uDeep, tint, 0.35) * (uSunColor * 0.55 + ambient * 0.62);
    col = mix(col, deepLit, thick * 0.26 * (1.0 - uNight * 0.4));
    // 邊緣一圈亮亮的果凍光（硬邊）
    col += mix(tint, vec3(1.0), 0.7) * smoothstep(0.42, 0.55, fres) * 0.42;
    vec3 H = normalize(uSunDir + V);
    float nh = max(dot(N, H), 0.0);
    // 高光是一塊乾淨的白色形狀，不是一團霧
    float spec = smoothstep(0.972, 0.982, nh) + smoothstep(0.86, 0.9, nh) * 0.12;
    vec3 H2 = normalize(normalize(vec3(-0.5, 0.8, 0.4)) + V);
    spec += smoothstep(0.988, 0.994, max(dot(N, H2), 0.0)) * 0.9;
    col += vec3(1.0) * spec;
    // 晶瑩剔透（2026-10-24 使用者：「史萊姆要透明晶瑩一點」）：邊緣一圈帶淡淡彩虹色的亮光，
    // 身體裡有幾顆一閃一閃的小亮點，像光在果凍裡折射
    float rim = smoothstep(0.22, 0.8, fres);
    vec3 irid = 0.5 + 0.5 * cos(6.2831 * (fres * 0.7 + vec3(0.0, 0.33, 0.67)) + uTime * 0.25);
    col += mix(vec3(1.0), irid, 0.4) * rim * 0.32;
    float glint = sin(vObj.x * 23.0 + uSeed * 3.1) * sin(vObj.y * 19.0 + uTime * 0.8 + uSeed) * sin(vObj.z * 21.0 - uSeed * 2.3);
    glint = pow(max(glint, 0.0), 24.0);
    col += vec3(1.0) * glint * 1.6;
    float alpha = mix(uOpacity, 1.0, clamp(fres * 0.8 + spec * 0.6 + glint, 0.0, 1.0));
    if (uFace > 0.5) {
      vec3 d = normalize(vObj - uFaceCenter);
      vec2 fp = vec2(atan(d.x, d.z), asin(clamp(d.y, -1.0, 1.0)));
      if (d.z > 0.2) {
        vec2 eyeR = vec2(0.105, 0.17 * uBlink + 0.012);
        vec2 e1 = vec2(-0.34, 0.12);
        vec2 e2 = vec2(0.34, 0.12);
        float eyes = max(ellipse(fp, e1, eyeR), ellipse(fp, e2, eyeR));
        vec3 eyeCol = vec3(0.13, 0.1, 0.2);
        float lower = smoothstep(e1.y - 0.02, e1.y - 0.13, fp.y);
        eyeCol = mix(eyeCol, uDeep * 0.75 + tint * 0.2, lower * 0.65);
        float shine = max(ellipse(fp, e1 + vec2(-0.03, 0.06), vec2(0.036)), ellipse(fp, e2 + vec2(-0.03, 0.06), vec2(0.036)));
        shine = max(shine, max(ellipse(fp, e1 + vec2(0.035, -0.05), vec2(0.018)), ellipse(fp, e2 + vec2(0.035, -0.05), vec2(0.018))));
        shine *= step(0.3, uBlink);
        float blush = max(ellipse(fp, vec2(-0.6, -0.04), vec2(0.12, 0.055)), ellipse(fp, vec2(0.6, -0.04), vec2(0.12, 0.055)));
        float arc = abs(length(fp - vec2(0.0, 0.03)) - 0.085);
        float mouth = (1.0 - smoothstep(0.008, 0.02, arc)) * step(fp.y, -0.025) * step(abs(fp.x), 0.07);
        if (uMood > 1.5) {
          // 被切開（2026-10-25 使用者：「史萊姆被砍的時候，要驚訝、死亡表情」）：X_X 的眼睛、歪歪扭扭的嘴，臉色發白
          vec2 d1 = fp - e1, d2 = fp - e2;
          float x1 = min(abs(d1.x - d1.y), abs(d1.x + d1.y)) * 0.7071;
          float x2 = min(abs(d2.x - d2.y), abs(d2.x + d2.y)) * 0.7071;
          eyes = max((1.0 - smoothstep(0.014, 0.024, x1)) * step(max(abs(d1.x), abs(d1.y)), 0.08),
                     (1.0 - smoothstep(0.014, 0.024, x2)) * step(max(abs(d2.x), abs(d2.y)), 0.08));
          eyeCol = vec3(0.13, 0.1, 0.2);
          shine = 0.0;
          blush = 0.0;
          float wave = abs(fp.y + 0.075 - sin(fp.x * 70.0) * 0.012);
          mouth = (1.0 - smoothstep(0.008, 0.017, wave)) * step(abs(fp.x), 0.085);
          col = mix(col, vec3(0.92, 0.95, 1.0), 0.12);
        } else if (uMood > 0.5) {
          // 嚇一跳：圓滾滾的大眼睛、張成「o」的嘴
          vec2 wide = vec2(0.125, 0.165);
          eyes = max(ellipse(fp, e1, wide), ellipse(fp, e2, wide));
          shine = max(ellipse(fp, e1 + vec2(-0.035, 0.065), vec2(0.045)), ellipse(fp, e2 + vec2(-0.035, 0.065), vec2(0.045)));
          shine = max(shine, max(ellipse(fp, e1 + vec2(0.04, -0.06), vec2(0.02)), ellipse(fp, e2 + vec2(0.04, -0.06), vec2(0.02))));
          float o = length((fp - vec2(0.0, -0.085)) / vec2(0.05, 0.07));
          mouth = 1.0 - smoothstep(0.8, 1.0, o);
          blush *= 1.6;
        }
        col = mix(col, vec3(1.0, 0.55, 0.68), blush * 0.45);
        col = mix(col, eyeCol, eyes);
        col = mix(col, vec3(1.0), shine * eyes);
        col = mix(col, vec3(0.16, 0.1, 0.18), mouth);
        alpha = max(alpha, max(eyes, mouth));
      }
    }
    // 夜裡自己帶一點微光，在暗處也看得清楚
    col += tint * uNight * 0.3;
    outColor = vec4(col, alpha);
  }
  gl_FragColor = outColor;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Za(){const l=new ot(1,56,40),t=l.getAttribute("position"),s=new g;for(let e=0;e<t.count;e++){s.fromBufferAttribute(t,e);let o=s.y*.82;o<-.42&&(o=-.42+(o+.42)*.12);const i=1+.08*Math.max(0,1-Math.abs(o+.12)*2.2);s.set(s.x*1.06*i,o+.42,s.z*1.06*i),t.setXYZ(e,s.x,s.y,s.z)}return l.computeVertexNormals(),l}function Ka(){const l=[];for(let e=0;e<=26;e++){const o=e/26;if(o<.12)l.push(new bt(.001+o/.12*.98,0));else if(o<.7){const i=(o-.12)/.58;l.push(new bt(.98-i*.22+Math.sin(i*Math.PI)*.03,i*1.05))}else{const i=(o-.7)/.3,a=i*Math.PI/2;l.push(new bt(Math.max(.001,.76*Math.cos(a)*(1-i*.05)),1.05+Math.sin(a)*.2))}}const s=new Zo(l,48);return s.computeVertexNormals(),s}function Qa(){const l=new kt(1.5,1.5,1.5,6,.38);return l.translate(0,.75,0),l.deleteAttribute("uv"),l}const zo=4;function Us(l,t,s=0){for(const e of t)if(l.x*e.x+l.y*e.y+l.z*e.z>e.w+s)return!1;return!0}function Ja(l,t,s){const e=l.getAttribute("position"),o=l.getIndex(),i=new g(t.x,t.y,t.z),a=new g,n=new g,r=new Set,c=[],h=(x,M)=>{a.fromBufferAttribute(e,x),n.fromBufferAttribute(e,M);const k=a.dot(i)-t.w,P=n.dot(i)-t.w;if(k>0==P>0)return;const T=a.clone().lerp(n,k/(k-P)),F=`${Math.round(T.x*400)},${Math.round(T.y*400)},${Math.round(T.z*400)}`;r.has(F)||(r.add(F),c.push(T))},u=o?o.count:e.count;for(let x=0;x+2<u;x+=3){const M=o?o.getX(x):x,k=o?o.getX(x+1):x+1,P=o?o.getX(x+2):x+2;h(M,k),h(k,P),h(P,M)}if(c.length<3)return[];const m=new g(Math.abs(i.y)<.9?0:1,Math.abs(i.y)<.9?1:0,0).cross(i).normalize(),f=i.clone().cross(m),d=c.map(x=>({p:x,x:x.dot(m),y:x.dot(f)})).sort((x,M)=>x.x-M.x||x.y-M.y),p=(x,M,k)=>(M.x-x.x)*(k.y-x.y)-(M.y-x.y)*(k.x-x.x),v=[],w=[];for(const x of d){for(;v.length>=2&&p(v[v.length-2],v[v.length-1],x)<=0;)v.pop();v.push(x)}for(let x=d.length-1;x>=0;x--){const M=d[x];for(;w.length>=2&&p(w[w.length-2],w[w.length-1],M)<=0;)w.pop();w.push(M)}let y=[...v.slice(0,-1),...w.slice(0,-1)].map(x=>x.p);for(const x of s){const M=new g(x.x,x.y,x.z),k=[];for(let P=0;P<y.length;P++){const T=y[P],F=y[(P+1)%y.length],I=T.dot(M)-x.w,_=F.dot(M)-x.w;I<=0&&k.push(T),I<=0!=_<=0&&k.push(T.clone().lerp(F,I/(I-_)))}if(y=k,y.length<3)return[]}return y}function tn(l,t){const s=l.reduce((a,n)=>a.add(n),new g).divideScalar(l.length),e=[],o=[];for(let a=0;a<l.length;a++){const n=l[a],r=l[(a+1)%l.length];e.push(s.x,s.y,s.z,n.x,n.y,n.z,r.x,r.y,r.z);for(let c=0;c<3;c++)o.push(t.x,t.y,t.z)}const i=new Bt;return i.setAttribute("position",new Fs(e,3)),i.setAttribute("normal",new Fs(o,3)),i}const js=new g,ko=new g,as=new g,hi=new be;class xe{static softness=.6;group=new mt;front;back;outline=null;uniforms;kind;face;pull=new g;pullVel=new g;target=new g;squash=0;squashVel=0;hop=0;hopVel=0;shear=new bt;shearVel=new bt;lastWorld=new g;lastVelocity=new g;tracked=0;blinkAt=1.5+Math.random()*3;dragging=!1;holdStretch=0;swingTarget=new g;maxStretch;height;cuts;caps=[];env;outlines;ownsGeometry;constructor(t,s,e,o={}){this.kind=t,this.face=!!o.face,this.env=e,this.outlines=o.outlines,this.cuts=(o.cuts||[]).slice(0,zo),this.ownsGeometry=!o.geometry;const i=o.geometry||(t==="slime"?Za():t==="pudding"?Ka():Qa());i.computeBoundingBox();const a=i.boundingBox;this.height=a.max.y-a.min.y,this.maxStretch=this.height*1.25,this.uniforms={uTime:e.uTime,uSunDir:e.uSunDir,uSunColor:e.uSunColor,uSkyColor:e.uSkyColor,uGroundColor:e.uGroundColor,uNight:e.uNight,uSeed:{value:o.seed??Math.random()*10},uGrab:{value:new g(0,this.height*.75,.4)},uPull:{value:new g},uRadius:{value:t==="cube"?1.15:.95},uBase:{value:a.min.y},uHeight:{value:this.height},uSquash:{value:0},uShear:{value:new g},uBulge:{value:.6},uColor:{value:new W(s.color)},uDeep:{value:new W(s.deep)},uTop:{value:new W(s.top||s.color)},uTopStart:{value:s.top?t==="pudding"?1.02:this.height*.8:99},uOpacity:{value:.6},uBack:{value:0},uFace:{value:this.face?1:0},uBlink:{value:1},uMood:{value:0},uFaceCenter:{value:new g(0,this.height*.42,0)},uOutlineWidth:o.outlines?o.outlines.uWidth:{value:0},uResolution:o.outlines?o.outlines.uResolution:{value:new bt(1,1)},uClip:{value:Array.from({length:zo},(r,c)=>this.cuts[c]?.clone()||new Ko(0,0,0,1))},uClipCount:{value:this.cuts.length}};const n=r=>new pt({uniforms:{...Se.clone(ze.fog),...this.uniforms,uBack:{value:r?1:0},uFace:r?{value:0}:this.uniforms.uFace},vertexShader:So,fragmentShader:ci,transparent:!0,depthWrite:!r,side:r?fs:ca,fog:!0});this.back=new H(i,n(!0)),this.front=new H(i,n(!1)),this.back.renderOrder=4,this.front.renderOrder=5,this.front.userData.jelly=this,this.group.add(this.back,this.front),o.outlines&&(this.outline=new H(i,new pt({uniforms:{...Se.clone(ze.fog),...this.uniforms},vertexShader:So,fragmentShader:$a,side:fs,fog:!0,defines:{OUTLINE:""},transparent:!0,depthWrite:!1})),this.outline.renderOrder=6,this.group.add(this.outline)),this.cuts.forEach((r,c)=>{const h=Ja(i,r,this.cuts.filter((m,f)=>f!==c));if(h.length<3)return;const u=new H(tn(h,r),new pt({uniforms:{...Se.clone(ze.fog),...this.uniforms,uBack:{value:0},uFace:{value:0}},vertexShader:So,fragmentShader:ci,transparent:!0,depthWrite:!0,side:te,fog:!0}));u.renderOrder=5,this.caps.push(u),this.group.add(u)})}split(t){if(this.cuts.length>=zo)return null;const s=t.clone().negate(),e=this.front.geometry,o=e.getAttribute("position"),i=new g;let a=0,n=0;for(let h=0;h<o.count;h+=3)i.fromBufferAttribute(o,h),Us(i,this.cuts)&&(i.dot(new g(t.x,t.y,t.z))<=t.w?a++:n++);const r=a+n;if(!r||a/r<.06||n/r<.06)return null;const c=h=>{const u=new xe(this.kind,{color:"#fff",deep:"#000"},this.env,{face:this.face,outlines:this.outlines,geometry:e,cuts:[...this.cuts,h]});for(const m of["uColor","uDeep","uTop"])u.uniforms[m].value.copy(this.uniforms[m].value);return u.uniforms.uTopStart.value=this.uniforms.uTopStart.value,u.uniforms.uSeed.value=this.uniforms.uSeed.value,u};return[c(t),c(s)]}centroid(){const t=this.front.geometry.getAttribute("position"),s=new g,e=new g;let o=0;for(let i=0;i<t.count;i+=2)s.fromBufferAttribute(t,i),Us(s,this.cuts)&&(e.add(s),o++);return o?e.divideScalar(o):e}samplePoints(t=90){const s=this.front.geometry.getAttribute("position"),e=[];for(let i=0;i<s.count;i++){const a=new g().fromBufferAttribute(s,i);Us(a,this.cuts)&&e.push(a)}for(const i of this.caps){const a=i.geometry.getAttribute("position");for(let n=0;n<a.count;n++)e.push(new g().fromBufferAttribute(a,n))}const o=Math.max(1,Math.floor(e.length/t));return e.filter((i,a)=>a%o===0)}setLook(t){this.uniforms.uColor.value.set(t.color),this.uniforms.uDeep.value.set(t.deep),this.uniforms.uTop.value.set(t.top||t.color)}hit(t){if(!this.cuts.length)return t.intersectObject(this.front,!1)[0];const s=new g;return t.intersectObjects([this.front,...this.caps],!1).find(e=>Us(this.front.worldToLocal(s.copy(e.point)),this.cuts,.01))}grab(t){this.uniforms.uGrab.value.copy(t),this.dragging=!0}dragTo(t){this.target.copy(t).sub(this.uniforms.uGrab.value),this.target.length()>this.maxStretch&&this.target.setLength(this.maxStretch)}release(){this.dragging&&(this.dragging=!1,this.target.set(0,0,0),this.swingTarget.set(0,0,0),this.squashVel+=Math.min(3.2,this.pull.length()*2.4),this.kick(-this.pull.x*2.2,-this.pull.z*2.2))}kick(t,s){this.shearVel.x+=t,this.shearVel.y+=s}hopStep(t){this.hop>0||this.hopVel!==0||(this.hopVel=t,this.squashVel-=1.4)}get airborne(){return this.hop>0||this.hopVel>0}get hopHeight(){return this.hop}swing(t,s){this.swingTarget.copy(t).multiplyScalar(-s),this.swingTarget.length()>this.maxStretch*.6&&this.swingTarget.setLength(this.maxStretch*.6)}land(t){this.swingTarget.set(0,0,0),this.squashVel-=Math.min(5,t*.6);const s=Math.random()*Math.PI*2,e=Math.min(1.6,t*.18);this.kick(Math.cos(s)*e,Math.sin(s)*e),t>2&&(this.hopVel=Math.min(3.4,t*.32))}poke(t=!1){this.squashVel-=2.6;const s=Math.random()*Math.PI*2;this.kick(Math.cos(s)*1.1,Math.sin(s)*1.1),t&&(this.hopVel=5.2)}update(t,s){const e=Math.max(1,Math.min(6,Math.ceil(t/.008333333333333333))),o=t/e,i=Math.min(1,Math.max(0,xe.softness)),a=this.dragging?260:120*(1.5-i*.8),n=this.dragging?24:5.2*(1.35-i*.6);this.group.getWorldPosition(js),as.set(0,0,0),this.tracked>1&&t>1e-4?(ko.copy(js).sub(this.lastWorld).divideScalar(t),as.copy(ko).sub(this.lastVelocity).divideScalar(t),as.lengthSq()>8100&&as.setLength(90),this.lastVelocity.copy(ko),this.group.getWorldQuaternion(hi).invert(),as.applyQuaternion(hi)):this.tracked===1&&t>1e-4&&this.lastVelocity.copy(js).sub(this.lastWorld).divideScalar(t),this.lastWorld.copy(js),this.tracked++;const r=Math.PI*2*(4.2-i*1.9),c=2*(.24-i*.14)*r,h=1.1+i*.6,u=this.holdStretch>0?this.swingTarget:this.target;for(let m=0;m<e;m++)this.pullVel.x+=((u.x-this.pull.x)*a-this.pullVel.x*n)*o,this.pullVel.y+=((u.y-this.pull.y)*a-this.pullVel.y*n)*o,this.pullVel.z+=((u.z-this.pull.z)*a-this.pullVel.z*n)*o,this.pull.addScaledVector(this.pullVel,o),this.squashVel+=(-(this.squash-this.holdStretch)*150*(1.45-i*.75)-this.squashVel*6.5*(1.3-i*.55))*o,this.squash+=this.squashVel*o,this.shearVel.x+=(-r*r*this.shear.x-c*this.shearVel.x-as.x*h)*o,this.shearVel.y+=(-r*r*this.shear.y-c*this.shearVel.y-as.z*h)*o,this.shear.addScaledVector(this.shearVel,o),(this.hop>0||this.hopVel!==0)&&(this.hopVel-=22*o,this.hop+=this.hopVel*o,this.hop<=0&&(this.hop=0,this.hopVel<-1&&(this.squashVel-=Math.min(4,-this.hopVel*.55)),this.hopVel=0));this.squash=Math.max(-.45,Math.min(.6,this.squash)),this.shear.lengthSq()>.36*.36&&(this.shear.setLength(.36),this.shearVel.multiplyScalar(.5)),this.uniforms.uShear.value.set(this.shear.x,0,this.shear.y),this.uniforms.uBulge.value=.35+i*.45,this.uniforms.uPull.value.copy(this.pull),this.uniforms.uSquash.value=this.squash+(this.hopVel>0?Math.min(.18,this.hopVel*.04):0),this.front.position.y=this.hop,this.back.position.y=this.hop,this.outline&&(this.outline.position.y=this.hop);for(const m of this.caps)m.position.y=this.hop;if(this.face){this.blinkAt-=t,this.blinkAt<0&&(this.blinkAt=2.4+Math.random()*3.6);const m=this.blinkAt<.14?this.blinkAt/.14:1;this.uniforms.uBlink.value=this.blinkAt<.14?Math.abs(m*2-1):1}}get moving(){return this.dragging||this.holdStretch>0||this.pull.lengthSq()>1e-5||this.pullVel.lengthSq()>1e-5||Math.abs(this.squash)>1e-4||this.hop>0||this.shear.lengthSq()>1e-6||this.shearVel.lengthSq()>1e-5}dispose(){this.ownsGeometry&&this.front.geometry.dispose();for(const t of this.caps)t.geometry.dispose(),t.material.dispose();this.front.material.dispose(),this.back.material.dispose(),this.outline?.material?.dispose()}}let ns=null;function en(){if(ns)return ns;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.47)/.07)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.86)/.1))*.06;t[s]=Math.round(Math.min(1,.2+i*.74+a)*255)}return ns=new xs(t,l,1,fo,bs),ns.magFilter=de,ns.minFilter=de,ns.needsUpdate=!0,ns}let rs=null;function sn(){if(rs)return rs;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.4)/.2)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.82)/.14))*.05;t[s]=Math.round(Math.min(1,.46+i*.5+a)*255)}return rs=new xs(t,l,1,fo,bs),rs.magFilter=de,rs.minFilter=de,rs.needsUpdate=!0,rs}const on=`
uniform float uTime;
uniform float uWind;
attribute float aExtra;
vec3 windSway(vec3 p, float weight) {
  float phase = p.x * 0.45 + p.z * 0.38;
  vec3 offset = vec3(sin(uTime * 1.35 + phase), 0.0, cos(uTime * 1.05 + phase * 1.3)) * 0.055;
  offset.x += sin(uTime * 3.1 + phase * 2.0) * 0.012;
  return offset * weight * uWind;
}
`,Go={color:{value:new W("#fff6dc")},strength:{value:.42}};function Ye(l,t={}){const s={vertexColors:t.vertexColors??!0,color:t.color?new W(t.color):16777215,...t.side!==void 0?{side:t.side}:{},emissive:t.emissive?new W(t.emissive):0,emissiveIntensity:t.emissiveIntensity??1},e=t.pbr?new Ut({...s,roughness:t.roughness??.88,metalness:0}):new Ei({...s,gradientMap:t.anime?sn():en()}),o={value:t.rim??(t.pbr?.12:t.anime?.2:.32)},i={value:new W(t.rimColor||"#fff6dc")},a={value:1};return e.onBeforeCompile=n=>{n.uniforms.uRim=o,n.uniforms.uRimColor=i,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uTime=l.uTime,n.uniforms.uWind=a,(t.caustics||t.rock||t.terrainDetail)&&(n.uniforms.uCausticColor=Go.color,n.uniforms.uCausticStrength=Go.strength,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCausticWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
vCausticWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`)),t.wind&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${on}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed += windSway(transformed, aExtra);`));const r=t.caustics||t.rock||t.terrainDetail?`
uniform float uTime;
uniform vec3 uCausticColor;
uniform float uCausticStrength;
varying vec3 vCausticWorld;
${We}
${Es}`:"",c=t.rock?`
        // 岩石：細一點的深淺斑＋裂縫；朝上、比較淺的地方長著一小塊一小塊的珊瑚（顏色淡淡的，不搶魚的戲）
        vec3 rp = vCausticWorld;
        vec2 rq = rp.xz + vec2(rp.y * 0.8, -rp.y * 0.6);
        float mottle = vnoise(rq * 1.1) * 0.6 + vnoise(rq * 3.1 + 7.0) * 0.4;
        diffuseColor.rgb *= 0.84 + 0.28 * mottle;
        float crack = 1.0 - smoothstep(0.0, 0.035, abs(vnoise(rq * 1.7 + 3.0) - 0.5));
        diffuseColor.rgb *= 1.0 - crack * 0.22;
        float rockUp = dot(normalize(vNormal), normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz));
        float coral = smoothstep(0.76, 0.785, vnoise(rq * 2.1 + 9.0)) * smoothstep(-34.0, -6.0, rp.y) * smoothstep(-0.2, 0.3, rockUp);
        vec3 coralTint = mix(vec3(0.92, 0.55, 0.62), vec3(0.93, 0.66, 0.46), smoothstep(0.3, 0.7, vnoise(rq * 0.35 + 2.0)));
        coralTint = mix(coralTint, vec3(0.68, 0.6, 0.92), smoothstep(0.62, 0.8, vnoise(rq * 0.3 - 4.0)));
        diffuseColor.rgb = mix(diffuseColor.rgb, coralTint, coral * 0.6);`:"",h=t.terrainDetail?`
        // 地表細節：三層世界座標雜訊調亮暗與色相；平地是草（深淺斑＋偏黃的乾草塊），斜坡是岩層（一層層橫紋＋裂縫），
        // 沙灘有細顆粒。顏色本身來自頂點色，這裡只加質感。
        vec3 dp = vCausticWorld;
        float dn1 = vnoise(dp.xz * 1.3 + 11.0);
        float dn2 = vnoise(dp.xz * 4.7 - 3.0);
        float dn3 = vnoise(dp.xz * 17.0 + 5.0);
        float terrainDetailValue = dn1 * 0.5 + dn2 * 0.32 + dn3 * 0.18;
        vec3 upView = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        float flatness = clamp(dot(normalize(vNormal), upView), 0.0, 1.0);
        float steep = 1.0 - smoothstep(0.55, 0.85, flatness);
        diffuseColor.rgb *= 0.82 + 0.34 * terrainDetailValue;
        // 草地：一塊塊偏黃的乾草、偏藍的陰濕處
        vec3 dryTint = vec3(1.08, 1.02, 0.78);
        vec3 lushTint = vec3(0.86, 0.98, 0.92);
        diffuseColor.rgb *= mix(lushTint, dryTint, smoothstep(0.35, 0.75, dn1)) * (1.0 - steep) + steep;
        // 岩層：斜坡上的橫紋與裂縫
        float strata = sin(dp.y * 9.0 + dn2 * 4.0) * 0.5 + 0.5;
        float crackLine = 1.0 - smoothstep(0.0, 0.05, abs(vnoise(dp.xz * 2.2 + dp.y * 1.3) - 0.5));
        diffuseColor.rgb *= 1.0 - steep * (0.18 * strata + 0.28 * crackLine);
        // 沙灘的細顆粒
        diffuseColor.rgb *= 1.0 + (hash12(floor(dp.xz * 60.0)) - 0.5) * 0.06 * flatness;`:"",u=t.terrainDetail&&t.pbr?`
        roughnessFactor = clamp(roughnessFactor * (0.85 + 0.3 * terrainDetailValue), 0.0, 1.0);`:"",m=t.rock?`
        // 斜斜看過去的岩壁邊緣融進水裡（水是有厚度的），輪廓才不會像剪下來的
        #ifdef USE_FOG
          float rockEdge = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.2);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, rockEdge * 0.6);
        #endif`:"",f=t.caustics?`
        // 水面下的部分：晃動的光網，朝上的地方最亮，越深越淡
        float causticUnder = smoothstep(0.06, -0.28, vCausticWorld.y);
        if (causticUnder > 0.0 && uCausticStrength > 0.0) {
          vec3 upView = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
          // 只畫在朝上的地方（沙坡、海床），直的岩壁不畫
          float causticFacing = smoothstep(0.35, 0.85, dot(normal, upView));
          // 投影時把高度也算進去：直的岩壁上光網不會被拉成一條條長線
          vec2 causticAt = vCausticWorld.xz * 1.7 + vec2(vCausticWorld.y * 1.4, -vCausticWorld.y * 1.1);
          float causticNet = caustics(causticAt, uTime * 0.85, 0.075);
          outgoingLight += uCausticColor * causticNet * causticUnder * causticFacing * exp(vCausticWorld.y * 0.16) * uCausticStrength;
        }`:"";n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRim;
uniform vec3 uRimColor;
uniform vec3 uSunDir;${r}`).replace("#include <color_fragment>",`#include <color_fragment>${c}${h}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>${u}`).replace("#include <fog_fragment>",`#include <fog_fragment>${m}`).replace("#include <opaque_fragment>",`${f}
        // 輪廓光：只在朝向太陽那一側的邊緣，硬邊、像動畫裡的高光描邊
        vec3 viewDir = normalize(vViewPosition);
        float rimDot = 1.0 - clamp(dot(normal, viewDir), 0.0, 1.0);
        vec3 sunView = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
        float facingSun = clamp(dot(normal, sunView) * 0.6 + 0.55, 0.0, 1.0);
        outgoingLight += uRimColor * smoothstep(0.68, 0.76, rimDot) * facingSun * uRim;
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>`l3d-toon-${t.pbr?"pbr-":t.anime?"anime-":""}${t.wind?"wind":"still"}${t.caustics?"-caustics":""}${t.rock?"-rock":""}${t.terrainDetail?"-terrain":""}`,e.userData.rim=o,e.userData.wind=a,e}const an=`
uniform float uWidth;
uniform float uWidthScale;
uniform vec2 uResolution;
uniform float uTime;
uniform float uWind;
uniform float uUseWind;
attribute vec3 color;
attribute float aExtra;
varying vec3 vColor;
#include <fog_pars_vertex>
vec3 windSway(vec3 p, float weight) {
  float phase = p.x * 0.45 + p.z * 0.38;
  vec3 offset = vec3(sin(uTime * 1.35 + phase), 0.0, cos(uTime * 1.05 + phase * 1.3)) * 0.055;
  offset.x += sin(uTime * 3.1 + phase * 2.0) * 0.012;
  return offset * weight * uWind;
}
void main() {
  vec3 p = position;
  if (uUseWind > 0.5) p += windSway(p, aExtra);
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mvPosition;
  vec3 viewNormal = normalize(normalMatrix * normal);
  vec2 dir = (projectionMatrix * vec4(viewNormal, 0.0)).xy;
  float len = length(dir);
  if (len > 1e-5) clip.xy += dir / len * uWidth * uWidthScale * clip.w * 2.0 / uResolution;
  // 往後推一點點，免得跟背面打架
  clip.z += 0.0004 * clip.w;
  gl_Position = clip;
  #include <fog_vertex>
}
`,nn=`
uniform vec3 uInk;
uniform float uTint;
uniform float uUseVertexColor;
varying vec3 vColor;
#include <fog_pars_fragment>
void main() {
  vec3 base = uUseVertexColor > 0.5 ? vColor : vec3(0.5);
  vec3 col = mix(uInk, base * 0.32, uTint);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function rn(){return{uWidth:{value:2},uResolution:{value:new bt(1,1)}}}function ln(l,t,s,e={}){const o=l.getAttribute("position").count;l.getAttribute("aExtra")||l.setAttribute("aExtra",new K(new Float32Array(o),1)),l.getAttribute("color")||l.setAttribute("color",new K(new Float32Array(o*3).fill(.5),3));const i=new pt({uniforms:{...Se.clone(ze.fog),uWidth:s.uWidth,uWidthScale:{value:e.width??1},uResolution:s.uResolution,uTime:t.uTime,uWind:{value:1},uUseWind:{value:e.wind?1:0},uUseVertexColor:{value:e.vertexColors===!1?0:1},uInk:{value:new W(e.ink||"#24343a")},uTint:{value:e.tint??.55}},vertexShader:an,fragmentShader:nn,side:fs,fog:!0}),a=new H(l,i);return a.renderOrder=-1,a}function ui(l,t,s,e={}){const o=ln(l.geometry,t,s,e);return l.add(o),o}const ti=`
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uHaze;
uniform vec3 uSunDir;
uniform float uNight;
vec3 skyGradient(vec3 d) {
  float h = clamp(d.y, 0.0, 1.0);
  vec3 col = mix(uHorizon, uTop, pow(h, 0.34));
  float sun = max(dot(d, uSunDir), 0.0);
  // 太陽那一側亮一點、暖一點；夜裡是月光的一圈淡淡光暈
  col = mix(col, uHaze, pow(sun, 5.0) * mix(0.42, 0.22, uNight));
  col += uHaze * pow(sun, 56.0) * mix(0.62, 0.3, uNight);
  // 夕陽：太陽那個方位的地平線整片燒起來（橫向的一大片暖光，越靠近地平線越亮）
  vec2 dirFlat = d.xz / max(length(d.xz), 1e-4);
  vec2 sunFlat = uSunDir.xz / max(length(uSunDir.xz), 1e-4);
  float side = pow(max(dot(dirFlat, sunFlat), 0.0), 3.0);
  col = mix(col, uHaze, side * exp(-h * 5.5) * mix(0.55, 0.25, uNight));
  // 貼著地平線一層亮亮的霧
  col = mix(col, mix(uHorizon, uHaze, 0.4), exp(-h * 34.0) * 0.55);
  return col;
}
`,cn=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,hn=`
uniform float uTime;
varying vec3 vDir;
${We}
${ti}
void main() {
  vec3 d = normalize(vDir);
  vec3 col = skyGradient(d);
  float sun = max(dot(d, uSunDir), 0.0);
  // 高空的卷雲：投影到一片很高的天花板上，順著風拉長的一絲一絲
  if (d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.18);
    vec2 wind = vec2(uTime * 0.0025, uTime * 0.001);
    vec2 sw = vec2(uv.x * 0.8 + uv.y * 0.6, -uv.x * 0.6 + uv.y * 0.8);
    float n = vnoise(sw * vec2(0.7, 2.6) + wind) * 0.62 + vnoise(sw * vec2(1.7, 5.2) - wind * 1.3) * 0.28 + vnoise(sw * vec2(4.1, 9.0) + wind * 2.0) * 0.1;
    float wisp = smoothstep(0.56, 0.86, n) * smoothstep(0.03, 0.22, d.y) * (1.0 - smoothstep(0.75, 1.0, d.y));
    vec3 wispCol = mix(vec3(1.0), uHaze, 0.25) * mix(1.0, 0.45, uNight);
    col = mix(col, wispCol, wisp * mix(0.55, 0.18, uNight));
  }
  // 太陽（白天）：白色的小圓盤＋一圈光；月亮（夜裡）：淡黃的圓盤，上面幾塊淡淡的坑
  // 夕陽比正午的太陽大、偏暖；月亮維持原本的大小
  float disc = mix(smoothstep(0.99845, 0.99895, sun), smoothstep(0.99935, 0.99962, sun), uNight);
  vec3 sunDisc = vec3(1.0, 0.86, 0.6) * 1.9;
  vec3 tangent = normalize(cross(uSunDir, vec3(0.0, 1.0, 0.0)));
  vec3 bitangent = cross(tangent, uSunDir);
  vec2 moonUv = vec2(dot(d, tangent), dot(d, bitangent)) * 40.0;
  float craters = vnoise(moonUv * 1.6 + 3.0) * 0.6 + vnoise(moonUv * 3.7) * 0.4;
  vec3 moonDisc = mix(vec3(1.0, 0.97, 0.86), vec3(0.78, 0.8, 0.86), smoothstep(0.45, 0.75, craters)) * 1.25;
  col = mix(col, mix(sunDisc, moonDisc, uNight), disc);
  // 地平線以下：接海的顏色（被霧蓋住的遠方）
  col = mix(col, uHorizon * 0.9, smoothstep(0.0, -0.12, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`,un=`
uniform float uTime;
uniform float uScale;
attribute float aSeed;
varying float vTwinkle;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vTwinkle = 0.55 + 0.45 * sin(uTime * (1.2 + fract(aSeed) * 2.0) + aSeed * 13.0);
  gl_PointSize = (1.4 + fract(aSeed * 3.7) * 2.2) * uScale;
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w * 0.9999;
}
`,dn=`
uniform float uOpacity;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.2, 1.0, d)) * uOpacity * vTwinkle;
  gl_FragColor = vec4(vec3(1.0, 0.97, 0.9), a);
}
`,fn=`
attribute vec3 aCenter;
attribute float aRadius;
attribute float aHeight;
attribute float aSeed;
attribute vec3 aCloud;
varying vec2 vUv;
varying float vHeight;
varying float vSeed;
varying vec3 vCenterW;
varying vec3 vCloudW;
void main() {
  vec4 center = modelMatrix * vec4(aCenter, 1.0);
  vCenterW = center.xyz;
  vCloudW = (modelMatrix * vec4(aCloud, 1.0)).xyz;
  vec4 mv = viewMatrix * center;
  mv.xy += position.xy * aRadius;
  vUv = position.xy;
  vHeight = aHeight;
  vSeed = aSeed;
  gl_Position = projectionMatrix * mv;
}
`,pn=`
uniform vec3 uLit;
uniform vec3 uMid;
uniform vec3 uShade;
uniform float uOpacity;
uniform float uTime;
varying vec2 vUv;
varying float vHeight;
varying float vSeed;
varying vec3 vCenterW;
varying vec3 vCloudW;
${We}
${ti}
float cloudFbm(vec2 p) {
  return vnoise(p) * 0.5 + vnoise(p * 2.07 + 3.1) * 0.27 + vnoise(p * 4.3 - 1.7) * 0.15 + vnoise(p * 8.9 + 5.3) * 0.08;
}
void main() {
  float r = length(vUv);
  if (r > 1.0) discard;
  vec2 drift = vec2(uTime * 0.012, uTime * 0.007);
  float n = cloudFbm(vUv * 1.6 + vec2(vSeed * 7.31, vSeed * 3.17) + drift);
  // 動漫的雲：輪廓清楚（交界很窄），邊上被雜訊咬出一點點不規則
  float lump = vnoise(vUv * 5.3 + vSeed * 9.7) * 0.6 + vnoise(vUv * 11.0 - vSeed * 4.1) * 0.4;
  float edge = r + (n - 0.5) * 0.42 + (lump - 0.5) * 0.22;
  float density = 1.0 - smoothstep(0.66, 0.8, edge);
  density *= smoothstep(0.0, 0.08, 1.0 - r);
  if (density < 0.004) discard;
  // 法線：整朵雲的形狀為主（雲心指向這一團），面片自己的球面為輔 —— 整朵雲一起受光，
  // 不會每一小團各自一圈明暗而變成一串泡泡
  vec3 nv = normalize(vec3(vUv * 0.92, sqrt(max(0.0, 1.0 - r * r)) + 0.15));
  vec3 nw = normalize((vec4(nv, 0.0) * viewMatrix).xyz);
  vec3 outward = vCenterW - vCloudW;
  vec3 N = normalize(normalize(outward + vec3(0.0, 1e-3, 0.0)) * 0.8 + nw * 0.55);
  float wrap = dot(N, uSunDir) * 0.5 + 0.5;
  // 三段受光：暗面（偏紫的陰影）→ 暖粉的中間調 → 受光面；交界有一點寬度，不是硬切
  float lightAmount = clamp(wrap * 0.75 + vHeight * 0.35 - 0.05, 0.0, 1.0);
  vec3 col = mix(uShade, uMid, smoothstep(0.22, 0.42, lightAmount));
  col = mix(col, uLit, smoothstep(0.5, 0.68, lightAmount));
  // 雲內部一點點筆觸感的明暗
  col *= 0.94 + 0.1 * n;
  // 朝太陽那一側的邊緣亮一圈（動漫雲的金邊），只在雲的範圍裡
  vec3 V = normalize(vCenterW - cameraPosition);
  float toward = pow(max(dot(V, uSunDir), 0.0), 4.0);
  // 只有整朵雲的外輪廓（法線朝側面、背對鏡頭的那一圈）才亮
  float silhouette = 1.0 - abs(dot(N, -V));
  float rimBand = smoothstep(0.52, 0.76, edge) * density * smoothstep(0.35, 0.8, silhouette);
  col += uHaze * rimBand * (0.35 + toward * 1.5);
  // 遠處、貼著地平線的那一截淡淡融進天空
  vec3 dir = normalize(vCenterW - cameraPosition);
  vec3 sky = skyGradient(vec3(dir.x, max(dir.y, 0.0), dir.z));
  float haze = (1.0 - smoothstep(0.0, 0.05, dir.y)) * 0.28 + smoothstep(0.2, 0.0, vHeight) * 0.22;
  col = mix(col, sky, clamp(haze, 0.0, 0.5));
  gl_FragColor = vec4(col, density * uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function Co(l,t,s,e,o,i){const a=[],n=2.4+t()*1.4,r=4+Math.floor(t()*3);for(let p=0;p<r;p++){const v=r===1?0:p/(r-1)-.5;a.push({x:v*n,y:.25+t()*.2,z:(t()-.5)*.7,r:.62+t()*.3-Math.abs(v)*.35})}const c=1+Math.round(o*2);for(let p=1;p<=c;p++){const v=Math.max(1,Math.round((r-1)*(1-p/(c+1.2)))),w=n*(1-p/(c+1.6));for(let y=0;y<v;y++){const x=v===1?0:y/(v-1)-.5;a.push({x:x*w+(t()-.5)*.4,y:.35+p*(.62+t()*.22),z:(t()-.5)*.5,r:.7+t()*.32-p*.04})}}const h=a.length;for(let p=0;p<h;p++){const v=a[p];for(let w=0;w<3;w++){const y=t()*Math.PI*2;a.push({x:v.x+Math.cos(y)*v.r*.75,y:v.y+Math.abs(Math.sin(y))*v.r*.7,z:v.z+.2+t()*.2,r:v.r*(.34+t()*.2)})}}const u=a.reduce((p,v)=>Math.max(p,v.y+v.r),0),m=Math.cos(i),f=Math.sin(i),d={x:s.x,y:s.y+u*e*.32,z:s.z};for(const p of a){const v=p.x*e,w=p.z*e;l.push({x:s.x+v*m-w*f,y:s.y+p.y*e,z:s.z+v*f+w*m,r:p.r*e*1.3,h:Math.min(1,Math.max(0,p.y/Math.max(.01,u))),seed:t()*10,cx:d.x,cy:d.y,cz:d.z})}}function mn(l,t){const s=new mt,e={uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze},o=new H(new ot(460,40,20),new pt({uniforms:{...e,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:cn,fragmentShader:hn,side:fs,depthWrite:!1,toneMapped:!1}));o.renderOrder=-10,s.add(o);const i=De(41),a=t==="high"?620:300,n=new Float32Array(a*3),r=new Float32Array(a),c=new g;for(let T=0;T<a;T++){do c.set(i()*2-1,i()*.95+.04,i()*2-1);while(c.lengthSq()>1);c.normalize().multiplyScalar(420),n.set([c.x,c.y,c.z],T*3),r[T]=i()*10}const h=new Bt;h.setAttribute("position",new K(n,3)),h.setAttribute("aSeed",new K(r,1));const u={uOpacity:{value:0},uScale:{value:1}},m=new Ae(h,new pt({uniforms:{...u,uTime:l.uTime},vertexShader:un,fragmentShader:dn,transparent:!0,depthWrite:!1,blending:he}));m.renderOrder=-9,s.add(m);const f=new mt,d=De(77),p=[],v=t==="high"?17:12;for(let T=0;T<v;T++){const F=T/v*Math.PI*2+d()*.25,I=300+d()*110,_=new g(Math.cos(F)*I,-5+d()*4,Math.sin(F)*I);Co(p,d,_,9+d()*9,.4+d()*1.1,-F+Math.PI/2)}const w=t==="high"?9:6;for(let T=0;T<w;T++){const F=T/w*Math.PI*2+.2+d()*.4,I=215+d()*50,_=new g(Math.cos(F)*I,3+d()*6,Math.sin(F)*I);Co(p,d,_,5+d()*4,.15+d()*.6,-F+Math.PI/2)}const y=t==="high"?8:5;for(let T=0;T<y;T++){const F=d()*Math.PI*2,I=190+d()*70,_=new g(Math.cos(F)*I,20+d()*16,Math.sin(F)*I);Co(p,d,_,2.6+d()*2.2,.1+d()*.3,-F+Math.PI/2)}p.sort((T,F)=>Math.hypot(F.x,F.z)-Math.hypot(T.x,T.z));const x=new ha;x.setAttribute("position",new K(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),x.setIndex([0,1,2,0,2,3]),x.setAttribute("aCenter",new us(new Float32Array(p.flatMap(T=>[T.x,T.y,T.z])),3)),x.setAttribute("aRadius",new us(new Float32Array(p.map(T=>T.r)),1)),x.setAttribute("aHeight",new us(new Float32Array(p.map(T=>T.h)),1)),x.setAttribute("aSeed",new us(new Float32Array(p.map(T=>T.seed)),1)),x.setAttribute("aCloud",new us(new Float32Array(p.flatMap(T=>[T.cx,T.cy,T.cz])),3)),x.instanceCount=p.length;const M={uLit:{value:new W("#ffffff")},uMid:{value:new W("#e3ebf8")},uShade:{value:new W("#aebde3")},uOpacity:{value:1}},k=new pt({uniforms:{...M,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:fn,fragmentShader:pn,transparent:!0,depthWrite:!1}),P=new H(x,k);return P.renderOrder=-8,P.frustumCulled=!1,f.add(P),s.add(f),{group:s,uniforms:e,stars:m,clouds:f,starUniforms:u,cloudUniforms:M,dispose:()=>{o.geometry.dispose(),o.material.dispose(),h.dispose(),m.material.dispose(),P.geometry.dispose(),k.dispose()}}}const so=8,_e=192,Bo=16,Uo=2,oo=.5;function gn(l){const t=new Uint8Array(_e*_e*4);for(let e=0;e<_e;e++)for(let o=0;o<_e;o++){const i=((o+.5)/_e*2-1)*Bo,a=((e+.5)/_e*2-1)*Bo;let n=Uo;for(const c of l){let h=i-c.x,u=a-c.z;if(c.sx||c.sz){const m=Math.cos(c.yaw||0),f=Math.sin(c.yaw||0),d=h*m-u*f,p=h*f+u*m;h=d/(c.sx||1),u=p/(c.sz||1);const v=(Math.hypot(h,u)-1)*Math.min(c.sx||1,c.sz||1);n=Math.min(n,v);continue}n=Math.min(n,Math.hypot(h,u)-c.r)}const r=(e*_e+o)*4;t[r]=Math.round(Math.min(1,Math.max(0,(n+oo)/(Uo+oo)))*255),t[r+1]=0,t[r+2]=0,t[r+3]=255}const s=new xs(t,_e,_e,Qo,bs);return s.magFilter=de,s.minFilter=de,s.needsUpdate=!0,s}const Ce=256,le=16,me=8,io=3,Ui=.7;function vn(){let l=4127;const t=()=>(l=l*16807%2147483647,l/2147483647),s=Float32Array.from({length:le*le},t),e=(h,u)=>s[(u%le+le)%le*le+(h%le+le)%le],o=(h,u)=>{const m=Math.floor(h),f=Math.floor(u),d=h-m,p=u-f,v=d*d*(3-2*d),w=p*p*(3-2*p),y=e(m,f),x=e(m+1,f),M=e(m,f+1),k=e(m+1,f+1);return y+(x-y)*v+(M-y)*w+(y-x-M+k)*v*w},i=(h,u)=>o(h,u)*.66+o(h*2,u*2)*.34,a=Array.from({length:me*me},()=>[.15+t()*.7,.15+t()*.7]),n=new Uint8Array(Ce*Ce*4),r=le/Ce;for(let h=0;h<Ce;h++)for(let u=0;u<Ce;u++){const m=u*r,f=h*r,d=i(m,f),p=(i(m+r,f)-i(m-r,f))/(2*r),v=(i(m,f+r)-i(m,f-r))/(2*r),w=u/Ce*me,y=h/Ce*me,x=Math.floor(w),M=Math.floor(y);let k=9,P=9;for(let F=-1;F<=1;F++)for(let I=-1;I<=1;I++){const _=x+I,O=M+F,V=a[(O%me+me)%me*me+(_%me+me)%me],N=Math.hypot(_+V[0]-w,O+V[1]-y);N<k?(P=k,k=N):N<P&&(P=N)}const T=(h*Ce+u)*4;n[T]=Math.round(Math.min(1,Math.max(0,p/(2*io)+.5))*255),n[T+1]=Math.round(Math.min(1,Math.max(0,v/(2*io)+.5))*255),n[T+2]=Math.round(Math.min(1,Math.max(0,d))*255),n[T+3]=Math.round(Math.min(1,(P-k)/Ui)*255)}const c=new xs(n,Ce,Ce,Qo,bs);return c.wrapS=c.wrapT=Ri,c.magFilter=de,c.minFilter=Fi,c.generateMipmaps=!0,c.needsUpdate=!0,c}function wn(l){const t=l==="high"?200:140,s=[];let e=5.2;for(;e<15;)s.push(e),e+=l==="high"?.28:.4;for(;e<520;)s.push(e),e*=l==="high"?1.075:1.1;s.push(520);const o=new Float32Array(s.length*t*3);s.forEach((n,r)=>{for(let c=0;c<t;c++){const h=c/t*Math.PI*2;o.set([Math.cos(h)*n,0,Math.sin(h)*n],(r*t+c)*3)}});const i=[];for(let n=0;n<s.length-1;n++){const r=n*t,c=(n+1)*t;for(let h=0;h<t;h++){const u=(h+1)%t;i.push(r+h,r+u,c+h,r+u,c+u,c+h)}}const a=new Bt;return a.setAttribute("position",new K(o,3)),a.setIndex(i),a.computeBoundingSphere(),a}const yn=`
uniform float uTime;
uniform sampler2D uCoast;
uniform float uSwellScale;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_vertex>
#ifdef RIPPLE_VTF
uniform sampler2D uRippleMap;
uniform vec4 uRippleRect;
uniform float uRippleAmp;
#endif

// 一道 Gerstner 浪：浪頭尖一點、浪谷平一點；順便累加法線
void wave(vec2 p, vec2 dir, float len, float amp, float steep, float t, inout vec3 disp, inout vec3 n, inout float h) {
  float k = 6.2831853 / len;
  float c = sqrt(9.8 / k) * 0.42;
  float f = k * (dot(dir, p) - c * t);
  float cf = cos(f), sf = sin(f);
  disp += vec3(dir.x * steep * amp * cf, amp * sf, dir.y * steep * amp * cf);
  n += vec3(-dir.x * k * amp * cf, -steep * k * amp * sf, -dir.y * k * amp * cf);
  h += amp * sf;
}

void main() {
  vLocal = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  float r = length(position.xz);
  float ang = atan(position.z, position.x);
  float coast = 5.5 + texture2D(uCoast, vec2(ang / 6.28318530718 + 0.5, 0.5)).r * 3.0;
  float dist = r - coast;
  // 靠岸的浪小一點（不然整片水會把沙灘淹掉），外海大一點
  float amp = mix(0.45, 1.0, smoothstep(0.0, 7.0, dist)) * uSwellScale;
  vec3 disp = vec3(0.0);
  vec3 n = vec3(0.0, 1.0, 0.0);
  float h = 0.0;
  vec2 p = world.xz;
  float t = uTime;
  wave(p, vec2(0.94, 0.34), 11.0, 0.085 * amp, 0.55, t, disp, n, h);
  wave(p, vec2(0.62, 0.78), 7.3, 0.055 * amp, 0.5, t, disp, n, h);
  wave(p, vec2(0.99, -0.12), 17.0, 0.11 * amp, 0.4, t, disp, n, h);
  wave(p, vec2(0.17, 0.98), 4.9, 0.03 * amp, 0.55, t, disp, n, h);
  world.xyz += disp;
  #ifdef RIPPLE_VTF
    // 漣漪真的讓水面起伏一點（法線另外在片段著色器裡讀，比頂點細）
    vec2 ruv = (position.xz - uRippleRect.xy) / (2.0 * uRippleRect.z) + 0.5;
    if (ruv.x > 0.0 && ruv.y > 0.0 && ruv.x < 1.0 && ruv.y < 1.0) world.y += texture2D(uRippleMap, ruv).r * uRippleAmp * 0.6;
  #endif
  vWorld = world.xyz;
  // 島（連同海）會轉：區域座標的斜率換成世界座標要用這兩個軸
  vAxisX = (modelMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xz;
  vAxisZ = (modelMatrix * vec4(0.0, 0.0, 1.0, 0.0)).xz;
  vSwellN = n;
  vSwell = h / (0.28 * amp);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,xn=`
uniform sampler2D uCoast;
uniform sampler2D uFoamField;
uniform vec3 uShallow;
uniform vec3 uMid;
uniform vec3 uDeep;
uniform vec3 uFoam;
uniform vec3 uSand;
uniform vec3 uGlowFoam;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform float uTime;
uniform vec4 uRipples[${so}];
uniform sampler2D uSeaNoise;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_fragment>
#ifdef RIPPLE_SIM
${Vi}
#endif
${We}
${Es}
${ti}
${Li}
// 高畫質每個像素自己算雜訊；手機與舊電腦讀那張雜訊圖（B 色版＝平滑雜訊，一格 ${le} 個單位）
#ifdef SEA_HIGH
  #define SEA_NOISE(p) vnoise(p)
#else
  #define SEA_NOISE(p) texture2D(uSeaNoise, (p) * ${(1/le).toFixed(4)}).b
#endif
// 光網（讀圖版）：兩層往不同方向慢慢飄、再用低頻的斜率扭一下
float seaCaustics(vec2 p, float t, float width) {
  #ifdef SEA_HIGH
    return caustics(p, t, width);
  #else
    vec2 warp = (texture2D(uSeaNoise, p * 0.021 + t * 0.002).rg - 0.5) * 1.1;
    // 再用跟格子差不多大的扭曲把直直的格子邊彎成曲線（不然看起來像碎玻璃）
    vec2 bend = (texture2D(uSeaNoise, p * 0.07 - t * 0.004 + 0.21).rg - 0.5) * 0.36;
    float a = texture2D(uSeaNoise, (p + warp + bend) * ${(1/me).toFixed(4)} + vec2(t * 0.012, t * 0.007)).a;
    float b = texture2D(uSeaNoise, (p * 1.31 - warp - bend) * ${(1/me).toFixed(4)} - vec2(t * 0.009, -t * 0.011) + 0.37).a;
    float e = min(a, b * 1.2) * ${Ui.toFixed(2)};
    return (1.0 - smoothstep(0.0, width, e)) + (1.0 - smoothstep(0.0, width * 3.5, e)) * 0.22;
  #endif
}

// 細細的小波紋：兩層雜湊雜訊的斜率（近處才有，遠處淡掉免得閃）
vec2 ripplesSlope(vec2 p, float t) {
  vec2 q1 = p * 0.62 + vec2(t * 0.11, t * 0.07);
  vec2 q2 = p * 1.55 + vec2(-t * 0.17, t * 0.13);
  #ifdef SEA_HIGH
    float e = 0.07;
    float h1 = vnoise(q1), h1x = vnoise(q1 + vec2(e, 0.0)), h1z = vnoise(q1 + vec2(0.0, e));
    vec2 g = vec2(h1x - h1, h1z - h1) / e * 0.62;
    float h2 = vnoise(q2), h2x = vnoise(q2 + vec2(e, 0.0)), h2z = vnoise(q2 + vec2(0.0, e));
    g += vec2(h2x - h2, h2z - h2) / e * 1.55 * 0.45;
    return g;
  #else
    // 讀圖：斜率直接存在 R/G
    vec2 g1 = (texture2D(uSeaNoise, q1 * ${(1/le).toFixed(4)}).rg - 0.5) * ${(2*io).toFixed(1)};
    vec2 g2 = (texture2D(uSeaNoise, q2 * ${(1/le).toFixed(4)} + 0.5).rg - 0.5) * ${(2*io).toFixed(1)};
    return g1 * 0.62 + g2 * 1.55 * 0.45;
  #endif
}

void main() {
  vec2 lp = vLocal.xz;
  float r = length(lp);
  float ang = atan(lp.y, lp.x);
  float coast = 5.5 + texture2D(uCoast, vec2(ang / 6.28318530718 + 0.5, 0.5)).r * 3.0;
  float dist = r - coast;
  // 島底下那一塊：從上面看是島（不畫水）；從水底往上看不挖洞，畫成島的底（下面再淡淡混一點）
  if (dist < -0.75 && gl_FrontFacing) discard;
  float t = uTime;
  vec2 wp = vWorld.xz;
  vec3 toCam = cameraPosition - vWorld;
  float camDist = length(toCam);
  vec3 V = toCam / camDist;
  // 一個像素在海面上多寬（世界單位）：細節照這個淡掉，遠處不會閃成一片雜訊
  float pix = max(length(fwidth(wp)), 1e-4);
  float near = 1.0 - smoothstep(0.035, 0.2, pix);
  float mid = 1.0 - smoothstep(0.12, 0.6, pix);
  vec2 around = vec2(cos(ang), sin(ang));

  // 指尖劃過的漣漪：一圈一圈往外擴散、慢慢消失
  vec2 rippleSlope = vec2(0.0);
  float rippleRing = 0.0;
  for (int i = 0; i < ${so}; i++) {
    vec4 rp = uRipples[i];
    float age = t - rp.z;
    if (rp.w <= 0.0 || age < 0.0 || age > 3.2) continue;
    vec2 dv = wp - rp.xy;
    float d = length(dv);
    float front = age * 1.35 + 0.05;
    float k = d - front;
    float env = rp.w * exp(-age * 1.25) * exp(-k * k * 6.0) * smoothstep(0.0, 0.12, age);
    rippleSlope += (d > 1e-3 ? dv / d : vec2(0.0)) * cos(k * 15.0) * env * 0.9;
    rippleRing = max(rippleRing, env * smoothstep(0.55, 1.0, sin(k * 15.0 + 1.2)));
  }
  // GPU 漣漪：手指劃過的軌跡、撞到岸邊彈回來的波（區域座標的斜率轉成世界座標）
  vec2 simSlope = vec2(0.0);
  float simHeight = 0.0;
  #ifdef RIPPLE_SIM
    vec3 sim = rippleAt(lp) * rippleInside(lp);
    simHeight = sim.x;
    simSlope = sim.y * vAxisX + sim.z * vAxisZ;
    rippleSlope += simSlope;
    // 波峰：一圈圈乾淨的亮線（動畫的畫法），越陡越亮
    rippleRing = max(rippleRing, smoothstep(0.018, 0.07, simHeight) * smoothstep(0.06, 0.26, length(simSlope)));
  #endif
  // 細波紋只有近處看得到：遠處的像素直接跳過（省掉一半以上的雜訊計算）
  vec2 slope = rippleSlope;
  if (near > 0.001) slope += ripplesSlope(wp, t) * near * 0.16;
  vec3 swellN = normalize(vSwellN);
  vec3 N = normalize(swellN + vec3(-slope.x, 0.0, -slope.y));

  if (!gl_FrontFacing) {
    // ── 從水底往上看：正上方一圈是天空（斯涅耳窗），外面全反射成深藍；水面的光紋晃來晃去 ──
    float cosI = abs(dot(N, V));
    float window = smoothstep(0.58, 0.72, cosI);
    float rim = smoothstep(0.56, 0.64, cosI) * (1.0 - smoothstep(0.64, 0.74, cosI));
    vec3 skyThrough = mix(mix(uHorizon, uTop, 0.3) * 1.05 + uHaze * 0.18, uWaterGlow * 1.25, 0.35);
    vec3 deepBelow = mix(uWaterFog, uWaterGlow, 0.3);
    vec3 col = mix(deepBelow, skyThrough, window);
    col += mix(uHaze, vec3(1.0), 0.4) * rim * 0.35;
    float veins = seaCaustics(wp * 0.7, t * 1.1, 0.14);
    col += vec3(0.75, 0.97, 1.0) * veins * 0.32 * window * mid;
    // 太陽穿過水面：一團刺眼的亮光（折射後比實際高一點）
    vec3 sunIn = normalize(vec3(uSunDir.x * 0.75, max(uSunDir.y, 0.2), uSunDir.z * 0.75));
    float sunSpot = pow(max(dot(-V, sunIn), 0.0), 380.0);
    col += uSunColor * sunSpot * 2.4;
    // 窗外（全反射的地方）也有浪反射的亮紋，水面才不會是一整片平平的顏色
    col += uWaterGlow * seaCaustics(wp * 0.45 + 7.0, t * 0.9, 0.2) * 0.16 * (1.0 - window) * mid;
    col *= mix(1.0, 0.45, uNight);
    // 島的正下方：暗暗的沙底
    col = mix(col, col * 0.82, smoothstep(-0.2, -0.9, dist));
    // 遠方的水面融進水裡的「天空」（跟水下大球同一個顏色），地平線上不會有一條接縫
    #ifdef USE_FOG
      float farFog = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
      col = mix(col, waterDome(-V, uSunDir, t), farFog);
    #endif
    gl_FragColor = vec4(col, 0.97);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  } else {
    // ── 水深與水色：岸邊一圈淺灘（看得到沙），礁石邊緣外急降成外海 ──
    // 礁石離岸多遠：繞著島慢慢變（有的地方是一大片淺灘），邊緣再抖一點
    float reef = 2.0 + 3.4 * smoothstep(0.25, 0.85, SEA_NOISE(around * 1.5 + 4.0)) + 0.9 * (SEA_NOISE(wp * 0.33 + 2.0) - 0.5);
    float depth = 0.85 * smoothstep(-0.15, 1.5, dist) + 0.95 * smoothstep(1.0, reef, dist) + 14.0 * smoothstep(reef - 0.25, reef + 2.4, dist);
    vec3 body = mix(uShallow, uMid, smoothstep(0.8, reef + 1.6, dist));
    body = mix(body, uDeep, smoothstep(reef + 1.2, 38.0, dist));
    vec3 col = body;
    // 淺灘（礁石以內）才看得到底下的沙：外海的像素整段跳過
    if (dist < reef + 2.6) {
      vec3 sand = uSand;
      // 沙紋：一條條被浪推出來的淺淺紋路
      float sandWave = sin(dot(wp, vec2(0.55, 0.83)) * 6.5 + SEA_NOISE(wp * 0.6) * 4.0) * 0.5 + 0.5;
      sand *= 0.9 + 0.1 * sandWave * near;
      // 淺灘上幾塊海草和岩斑
      float weed = smoothstep(0.64, 0.72, SEA_NOISE(wp * 0.5 + 11.0)) * smoothstep(0.5, 1.2, dist) * (1.0 - smoothstep(reef - 0.7, reef - 0.1, dist));
      sand = mix(sand, sand * vec3(0.32, 0.6, 0.44), weed * 0.85);
      // 水底的光網：越深越淡，遠處線粗一點免得閃
      float shallowLight = exp(-depth * 0.7) * (1.0 - uNight * 0.85) * mid;
      if (shallowLight > 0.01) {
        float causticWidth = mix(0.07, 0.16, smoothstep(0.015, 0.09, pix));
        // 漣漪經過時，水底的光網跟著晃；波谷把光聚在一起的地方更亮
        float focus = 1.0 + clamp(-simHeight * 9.0, -0.4, 0.9);
        sand += uSunColor * seaCaustics(wp * 1.45 + simSlope * 0.35, t * 0.85, causticWidth) * 0.55 * shallowLight * focus;
      }
      // 光線在水裡走一段就被吃掉：紅光最先沒了，所以越深越青、越藍
      vec3 trans = exp(-depth * vec3(1.45, 0.42, 0.3));
      col = sand * trans + body * (1.0 - trans);
      // 礁石邊緣：淺灘和外海之間一條淡淡的亮線（動畫裡的畫法）
      float lip = (1.0 - smoothstep(0.0, 0.5, abs(dist - reef - 0.2))) * mid * SEA_NOISE(wp * 1.3 + t * 0.1);
      col = mix(col, uShallow * 1.05, lip * 0.18);
    }

    // 長浪的明暗（兩階、交界柔一點）：浪頭亮、浪谷暗
    float crest = smoothstep(0.15, 0.55, vSwell);
    float trough = smoothstep(-0.2, -0.7, vSwell);
    col *= 1.0 + (crest * 0.08 - trough * 0.07) * mid * smoothstep(0.5, 4.0, dist);
    // 雲影：外海一片片慢慢飄過去的暗影（只在離島遠一點的地方）
    float cloud = smoothstep(0.5, 0.72, SEA_NOISE(wp * 0.016 + vec2(t * 0.006, t * 0.0035)));
    col *= 1.0 - cloud * 0.13 * smoothstep(12.0, 34.0, dist) * (1.0 - uNight);

    // ── 反射天空：越斜看越亮，遠處一片銀亮（但比天空本身深一點，地平線才分得清楚） ──
    // 反射用比較平順的法線：小波紋只留一點，遠處（一個像素很寬）長浪也壓平一點，地平線附近才不會閃成一條條白痕
    vec3 Nr = normalize(mix(vec3(0.0, 1.0, 0.0), swellN, 0.5 + 0.3 * mid) + vec3(-slope.x, 0.0, -slope.y) * 0.4);
    vec3 R = reflect(-V, Nr);
    R.y = abs(R.y) + 0.02;
    R = normalize(R);
    float rh = clamp(R.y, 0.0, 1.0);
    vec3 refl = mix(mix(uHorizon, uHaze, 0.25), uTop, pow(rh, 0.55)) * vec3(0.84, 0.92, 1.0);
    refl = mix(refl, uHaze, pow(max(dot(R, uSunDir), 0.0), 6.0) * 0.3);
    float cosV = clamp(dot(Nr, V), 0.0, 1.0);
    float fres = 0.025 + 0.975 * pow(1.0 - cosV, 5.0);
    fres = mix(fres, smoothstep(0.05, 0.6, fres), 0.5);
    // 斜斜看過去（島的另一側）淺灘主要反射天空，不會是一圈平平的亮綠色
    col = mix(col, refl, clamp(fres, 0.0, 1.0) * mix(0.72, 0.86, smoothstep(2.0, 20.0, dist)));

    // ── 太陽／月亮：反光碎成一條閃閃的光帶 ──
    // 近處再疊一層更細的波紋，反光碎成一顆顆小亮片，不會變成一大塊白
    vec3 H = normalize(uSunDir + V);
    vec2 fine = vec2(0.0);
    if (near > 0.001 && dot(N, H) > 0.9) {
      vec2 q3 = wp * 3.3 + vec2(t * 0.42, -t * 0.31);
      float e3 = 0.05;
      float g0 = SEA_NOISE(q3);
      fine = vec2(SEA_NOISE(q3 + vec2(e3, 0.0)) - g0, SEA_NOISE(q3 + vec2(0.0, e3)) - g0) / e3 * 3.3;
    }
    vec3 Ns = normalize(swellN + vec3(-slope.x * 2.2 - fine.x * 0.05 * near, 0.0, -slope.y * 2.2 - fine.y * 0.05 * near));
    float nh = max(dot(Ns, H), 0.0);
    float glint = smoothstep(mix(0.9935, 0.9962, near), mix(0.9968, 0.9984, near), nh) * mix(1.0, 0.75, near);
    // 近處的反光再碎成小亮片（不然鏡頭往下看的時候，腳邊會是一大塊一大塊的白）
    if (glint > 0.0 && near > 0.01) glint *= mix(1.0, smoothstep(0.32, 0.68, SEA_NOISE(wp * 5.0 + vec2(t * 0.6, -t * 0.4))), near);
    float sheen = pow(max(dot(N, H), 0.0), 260.0) * 0.45;
    vec3 glintColor = mix(vec3(1.0, 0.97, 0.9), vec3(0.86, 0.92, 1.0), uNight);
    // 微縮模型風的海：反光收斂一點（早上不要一整條白亮亮的光帶），晚上的月光帶維持
    col += glintColor * (glint * 1.3 + sheen) * mix(0.55, 0.8, uNight);
    // 浪頭偶爾翻出一小撮白（只有近處，遠處就只是亮一點）
    float whitecap = 0.0;
    if (near > 0.01 && vSwell > 0.2) {
      float capNoise = SEA_NOISE(wp * 0.9 + vec2(t * 0.2, -t * 0.15));
      whitecap = smoothstep(0.7, 0.86, vSwell * 0.6 + capNoise * 0.55) * smoothstep(0.62, 0.8, SEA_NOISE(wp * 0.23 - t * 0.03)) * near * smoothstep(5.0, 12.0, dist);
    }

    // ── 白浪：貼著岸一條、一進一退拍上沙灘一條；岩石和木樁旁邊一圈（只有島邊才算） ──
    float foam = max(whitecap * 0.8, rippleRing * 0.5);
    #ifdef RIPPLE_SIM
      // 劃過的地方留下一條淡淡的泡泡（碎成一點一點，不是一整片白）
      float trail = smoothstep(0.04, 0.12, abs(simHeight)) * smoothstep(0.42, 0.7, SEA_NOISE(wp * 4.2 + vec2(t * 0.35, -t * 0.25)));
      foam = max(foam, trail * 0.55 * near);
      // 漣漪朝著鏡頭的那一面映出亮亮的天空
      col += mix(refl, vec3(1.0), 0.4) * smoothstep(0.06, 0.4, dot(simSlope, -normalize(V.xz + 1e-4))) * 0.12 * mid;
    #endif
    float edgeNoise = 0.5;
    if (dist < 4.5) {
      edgeNoise = SEA_NOISE(around * 9.0 + vec2(t * 0.25, 0.0)) * 0.5 + SEA_NOISE(wp * 2.2 + t * 0.4) * 0.5;
      // 一道浪從外面推向沙灘：越靠岸越白、越寬，碎成一段一段
      float wash = fract(t * 0.12 + SEA_NOISE(around * 1.3) * 0.35);
      float washEase = wash * wash * (3.0 - 2.0 * wash);
      float washAt = mix(0.85, 0.03, washEase);
      float washWidth = 0.035 + 0.1 * washEase;
      float washBreak = smoothstep(0.3, 0.55, SEA_NOISE(around * 14.0 + vec2(wash * 3.0, 0.0)));
      float washLine = (1.0 - smoothstep(washWidth * 0.45, washWidth, abs(dist - washAt - (edgeNoise - 0.5) * 0.16)))
        * smoothstep(0.05, 0.35, wash) * (1.0 - smoothstep(0.8, 1.0, wash)) * mix(washBreak, 1.0, washEase);
      float shore = 1.0 - smoothstep(0.06, 0.24, dist - 0.16 * edgeNoise);
      // 岸邊的泡泡蕾絲：一點一點破掉的白
      float lace = smoothstep(0.56, 0.68, SEA_NOISE(wp * 5.0 + vec2(t * 0.3, -t * 0.2))) * (1.0 - smoothstep(0.15, 0.75, dist)) * near;
      foam = max(foam, max(shore, washLine * 0.9));
      foam = max(foam, lace * 0.65);
    }
    vec2 fieldUv = lp / ${(Bo*2).toFixed(1)} + 0.5;
    if (all(greaterThan(fieldUv, vec2(0.0))) && all(lessThan(fieldUv, vec2(1.0)))) {
      float obstacle = texture2D(uFoamField, fieldUv).r * ${(Uo+oo).toFixed(2)} - ${oo.toFixed(2)};
      if (obstacle < 0.4) {
        float ringWobble = SEA_NOISE(wp * 3.0 + t * 0.6);
        float ringFoam = (1.0 - smoothstep(0.02, 0.06 + 0.06 * ringWobble, obstacle)) * smoothstep(-0.12, -0.02, obstacle);
        float ringOuter = (1.0 - smoothstep(0.012, 0.032, abs(obstacle - 0.2 - 0.07 * sin(t * 1.7 + ringWobble * 3.0)))) * 0.4 * near;
        foam = max(foam, max(ringFoam, ringOuter));
      }
    }
    foam = clamp(foam * (0.78 + 0.22 * edgeNoise), 0.0, 1.0);
    // 很斜看的時候（島的另一側）白浪壓扁成一條細線：淡一點，才不像貼上去的貼紙
    foam *= mix(0.55, 1.0, smoothstep(0.06, 0.3, cosV));
    // 夜裡浪花是藍色的螢光（像會發光的浮游生物）
    vec3 foamColor = mix(uFoam, uGlowFoam, uNight);
    col = mix(col, foamColor, foam);
    col += uGlowFoam * (rippleRing * 0.8 + foam * 0.35) * uNight;

    // 岸邊最淺的那一段半透明，讓底下真的沙灘透出來，水和沙灘接得起來
    float alpha = max(smoothstep(-0.35, 0.45, dist), foam);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
}
`,bn=[[.94,.34,11,.085,.55],[.62,.78,7.3,.055,.5],[.99,-.12,17,.11,.4],[.17,.98,4.9,.03,.55]];function Mn(l,t,s,e,o={height:0,slopeX:0,slopeZ:0}){o.height=0,o.slopeX=0,o.slopeZ=0;for(const[i,a,n,r]of bn){const c=Math.PI*2/n,h=Math.sqrt(9.8/c)*.42,u=c*(i*l+a*t-h*s);o.height+=r*e*Math.sin(u),o.slopeX+=i*c*r*e*Math.cos(u),o.slopeZ+=a*c*r*e*Math.cos(u)}return o}const Sn=`
uniform float uTime;
uniform float uScale;
uniform float uNight;
uniform vec3 uSunDir;
attribute vec3 aSeed;
varying float vAlpha;
varying float vSpin;
varying float vSize;
void main() {
  vec3 p = position;
  // 跟海面同一組長浪：小星星黏在浪上
  float t = uTime;
  float h = 0.0;
  vec3 n = vec3(0.0, 1.0, 0.0);
  for (int i = 0; i < 4; i++) {
    vec2 dir = i == 0 ? vec2(0.94, 0.34) : i == 1 ? vec2(0.62, 0.78) : i == 2 ? vec2(0.99, -0.12) : vec2(0.17, 0.98);
    float len = i == 0 ? 11.0 : i == 1 ? 7.3 : i == 2 ? 17.0 : 4.9;
    float amp = i == 0 ? 0.085 : i == 1 ? 0.055 : i == 2 ? 0.11 : 0.03;
    float k = 6.2831853 / len;
    float c = sqrt(9.8 / k) * 0.42;
    float f = k * (dot(dir, p.xz) - c * t);
    h += amp * sin(f);
    n.xz -= dir * k * amp * cos(f);
  }
  p.y = h + 0.02;
  vec3 V = normalize(cameraPosition - p);
  vec3 N = normalize(n);
  // 浪頭、斜面朝向亮的天空時才閃；夜裡集中在月光帶上
  // 真的陽光（月光）閃光只在太陽反射的那條光帶上：用反射方向離太陽多近決定這顆會不會亮
  vec3 R = reflect(-V, N);
  float lobe = pow(max(dot(R, uSunDir), 0.0), 14.0);
  float crest = smoothstep(-0.02, 0.07, h);
  float rate = 1.2 + aSeed.y * 2.2;
  float blink = pow(max(0.0, sin(t * rate + aSeed.x * 6.2831853)), 16.0);
  // 光帶外面只剩島邊淺灘偶爾一兩顆（亮亮的淺水），深藍的外海和遠處都不閃
  float rim = (1.0 - smoothstep(12.0, 20.0, length(p.xz))) * step(0.86, aSeed.z) * 0.5;
  vAlpha = blink * crest * (lobe * 2.0 + rim);
  vSpin = aSeed.z * 0.6;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  float dist = -mv.z;
  // 大小用像素算：遠的小一點，但不會小到糊成一顆點
  float size = clamp((4.0 + 7.0 * aSeed.y) * uScale * (0.4 + 0.6 * min(vAlpha, 1.0)) * mix(1.0, 0.55, smoothstep(20.0, 120.0, dist)), 2.5, 22.0);
  vSize = size;
  gl_PointSize = vAlpha < 0.02 ? 0.0 : size;
  gl_Position = projectionMatrix * mv;
}
`,zn=`
uniform vec3 uColor;
varying float vAlpha;
varying float vSpin;
varying float vSize;
void main() {
  // 用像素量：光芒的粗細固定一個多像素，中間的圓點兩三個像素
  vec2 c = (gl_PointCoord - 0.5) * vSize;
  float s = sin(vSpin), co = cos(vSpin);
  c = vec2(c.x * co - c.y * s, c.x * s + c.y * co);
  float reach = vSize * 0.5;
  float armX = exp(-pow(abs(c.y) / 0.85, 2.0)) * pow(max(0.0, 1.0 - abs(c.x) / reach), 2.2);
  float armY = exp(-pow(abs(c.x) / 0.85, 2.0)) * pow(max(0.0, 1.0 - abs(c.y) / reach), 2.2);
  float core = exp(-dot(c, c) / (1.6 + vSize * 0.06));
  float a = (max(armX, armY) * 0.85 + core) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(uColor * 2.0, a);
}
`;function kn(l,t,s,e,o=null,i=!1){const a=gn(s),n=vn(),r=Array.from({length:so},()=>new Ko(0,0,-100,0));let c=0;const h={...Se.clone(ze.fog),uCoast:{value:t},uFoamField:{value:a},uSeaNoise:{value:n},uShallow:{value:new W("#5fe3d6")},uMid:{value:new W("#16a5cf")},uDeep:{value:new W("#0a4f9e")},uFoam:{value:new W("#ffffff")},uSand:{value:new W("#f1dcae")},uGlowFoam:{value:new W("#7ff3ff")},uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSkyColor:l.uSkyColor,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTime:l.uTime,uNight:l.uNight,uRipples:{value:r},uSwellScale:{value:1},...o?o.uniforms:{},uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays},u=new pt({uniforms:h,vertexShader:yn,fragmentShader:xn,transparent:!0,depthWrite:!1,side:te,fog:!0,defines:{...e==="high"?{SEA_HIGH:"",CAUSTIC_TWO_LAYERS:""}:{},...o?{RIPPLE_SIM:""}:{},...o&&i?{RIPPLE_VTF:""}:{}}}),m=new H(wn(e),u);m.renderOrder=2,m.frustumCulled=!1;const f=e==="high"?2200:1100,d=new Float32Array(f*3),p=new Float32Array(f*3);let v=9127;const w=()=>(v=v*16807%2147483647,v/2147483647);for(let k=0;k<f;k++){const P=Math.PI/2+(w()-.5)*4.2,T=9+Math.pow(w(),1.4)*150;d.set([Math.cos(P)*T,0,Math.sin(P)*T],k*3),p.set([w(),w(),w()],k*3)}const y=new Bt;y.setAttribute("position",new K(d,3)),y.setAttribute("aSeed",new K(p,3));const x={uTime:l.uTime,uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir,uColor:{value:new W("#fffbef")}},M=new Ae(y,new pt({uniforms:x,vertexShader:Sn,fragmentShader:zn,transparent:!0,depthWrite:!1,blending:he}));return M.frustumCulled=!1,M.renderOrder=3,{mesh:m,uniforms:h,sparkles:M,sparkleUniforms:x,ripple:(k,P,T)=>{r[c].set(k,P,l.uTime.value,T),c=(c+1)%so},dispose:()=>{m.geometry.dispose(),u.dispose(),a.dispose(),n.dispose(),y.dispose(),M.material.dispose()}}}const di=22;class ji{jelly;area;shadow;others;scale;state="idle";wait;target=new g;stepVel=new g;pauseBetweenHops=0;heldGoal=new g;velocity=new g;grabOffset=new g;lift=0;liftVel=0;swimTime=0;get sink(){return .28*this.scale}yawGoal=null;constructor(t,s,e,o,i){this.jelly=t,this.area=s,this.others=e,this.shadow=o,this.scale=t.group.scale.x,this.wait=.8+i%3*1.1,this.target.copy(t.group.position)}get position(){return this.jelly.group.position}get held(){return this.state==="held"}get swimming(){return this.state==="swim"}frozen=!1;floor(t,s){return Math.max(this.area.ground(t,s),this.area.seaLevel)}free(t,s,e=0){const o=Math.atan2(s,t);if(Math.hypot(t,s)>this.area.reach(o)-e)return!1;for(const[i,a,n]of this.area.blocked)if((t-i)**2+(s-a)**2<(n+e)**2)return!1;return!this.area.avoid?.(t,s)}pickTarget(){const t=this.position;for(let s=0;s<24;s++){const e=Math.random()*Math.PI*2,o=1.1+Math.random()*2.2,i=t.x+Math.cos(e)*o,a=t.z+Math.sin(e)*o;if(!this.free(i,a,.25))continue;let n=!0;for(let r=1;r<6&&n;r++){const c=r/6;this.free(t.x+(i-t.x)*c,t.z+(a-t.z)*c)||(n=!1)}if(n&&!this.others.some(r=>r!==this&&(Math.hypot(r.target.x-i,r.target.z-a)<1.3||Math.hypot(r.position.x-i,r.position.z-a)<1.1)))return this.target.set(i,0,a),!0}return!1}pause(){this.state==="walk"&&(this.state="idle"),this.wait=Math.max(this.wait,1.5)}hold(t){this.state="held",this.grabOffset.copy(t),this.heldGoal.copy(this.position),this.velocity.set(0,0,0),this.jelly.holdStretch=.32}holdTo(t){if(this.state!=="held")return;this.heldGoal.copy(t).sub(this.grabOffset);const s=Math.atan2(this.heldGoal.z,this.heldGoal.x),e=this.area.swimReach(s),o=Math.hypot(this.heldGoal.x,this.heldGoal.z);o>e&&(this.heldGoal.x*=e/o,this.heldGoal.z*=e/o);const i=this.floor(this.heldGoal.x,this.heldGoal.z);this.heldGoal.y=Math.min(i+4.5,Math.max(i+.55,this.heldGoal.y))}drop(){if(this.state!=="held")return;this.state="fall",this.jelly.holdStretch=0;const t=this.floor(this.position.x,this.position.z);this.lift=Math.max(0,this.position.y-t),this.liftVel=Math.max(-2,this.velocity.y)}update(t,s){const e=this.position,o=this.jelly;if(!this.frozen){if(this.state==="held")this.velocity.x+=((this.heldGoal.x-e.x)*90-this.velocity.x*14)*t,this.velocity.y+=((this.heldGoal.y-e.y)*90-this.velocity.y*14)*t,this.velocity.z+=((this.heldGoal.z-e.z)*90-this.velocity.z*14)*t,e.addScaledVector(this.velocity,t),o.swing(this.velocity,.05/this.scale),this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);else if(this.state==="fall"){if(this.liftVel-=di*t,this.lift+=this.liftVel*t,e.x+=this.velocity.x*t*.3,e.z+=this.velocity.z*t*.3,this.velocity.multiplyScalar(Math.exp(-t*3)),o.swing(this.velocity,.03/this.scale),this.lift<=0){const i=-this.liftVel;this.lift=0,this.liftVel=0,this.area.ground(e.x,e.z)<this.area.seaLevel-.05?(this.state="swim",this.swimTime=0,o.land(i*.6),this.area.onSplash?.(e.clone(),i)):(o.land(i),this.unstick(),this.state="idle",this.wait=.8+Math.random()*1.2)}e.y=this.floor(e.x,e.z)+this.lift-(this.state==="swim"?this.sink:0)}else if(this.state==="swim"){this.swimTime+=t;const i=Math.atan2(e.z,e.x),a=Math.hypot(e.x,e.z);if(this.swimTime>1.1){const r=.9+this.scale*.4,c=Math.max(0,a-r*t)/Math.max(.001,a);e.x*=c,e.z*=c,this.yawGoal=Math.atan2(-e.x,-e.z)}else this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);o.swing(new g(Math.sin(this.swimTime*3)*.4,0,0),.02/this.scale);const n=this.area.ground(e.x,e.z);if(e.y=this.area.seaLevel-this.sink+Math.sin(this.swimTime*2.6)*.04,n>this.area.seaLevel-.02){const r=this.area.reach(i)*.82;this.target.set(Math.cos(i)*r,0,Math.sin(i)*r),this.state="walk",this.pauseBetweenHops=.2,e.y=Math.max(n,this.area.seaLevel)-.02}}else if(this.state==="idle")e.y=this.area.ground(e.x,e.z)-.02,this.wait-=t,this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z),this.wait<=0&&!o.dragging&&(this.pickTarget()?(this.state="walk",this.pauseBetweenHops=0):this.wait=.6);else if(this.state==="walk"){if(o.airborne)e.x+=this.stepVel.x*t,e.z+=this.stepVel.z*t;else{this.pauseBetweenHops-=t;const i=this.target.x-e.x,a=this.target.z-e.z,n=Math.hypot(i,a);if(n<.12)this.state="idle",this.wait=1.4+Math.random()*3.2;else if(this.pauseBetweenHops<=0){const r=3+Math.random()*.6,c=2*r/di,h=Math.min(n,.42+this.scale*.2);this.stepVel.set(i/n*h/c,0,a/n*h/c),o.hopStep(r),this.pauseBetweenHops=.12+Math.random()*.14,this.yawGoal=Math.atan2(i,a)}}e.y=this.floor(e.x,e.z)-.02}if(this.yawGoal!==null){let i=this.yawGoal-o.group.rotation.y;i=Math.atan2(Math.sin(i),Math.cos(i)),o.group.rotation.y+=i*(1-Math.exp(-t*(this.state==="walk"?7:3)))}if(this.shadow){const i=this.area.ground(e.x,e.z),a=Math.max(0,e.y-i)+o.hopHeight;this.shadow.position.set(e.x,i+.035,e.z);const n=1/(1+a*.35);this.shadow.scale.setScalar(n),this.shadow.material.opacity=i<this.area.seaLevel?0:.32*n}}}unstick(){const t=this.position;for(const[s,e,o]of this.area.blocked){const i=t.x-s,a=t.z-e,n=Math.hypot(i,a);if(n<o){const r=(o+.05)/Math.max(.001,n);t.x=s+i*r,t.z=e+a*r}}this.target.copy(t)}}function Hi(l,t){const s=new DataView(t.bin);if(s.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const e=s.getUint32(4,!0),o=s.getUint32(8,!0),i=new g(s.getFloat32(12,!0),s.getFloat32(16,!0),s.getFloat32(20,!0)),a=p=>p+3&-4;let n=24;const r=new Int16Array(t.bin,n,e*3);n=a(n+e*6);const c=new Int8Array(t.bin,n,e*3);n=a(n+e*3);const h=new Uint16Array(t.bin,n,e*2);n=a(n+e*4);const u=e<65536?new Uint16Array(t.bin,n,o):new Uint32Array(t.bin,n,o),m=new Bt;m.setAttribute("position",new K(r,3,!0)),m.setAttribute("normal",new K(c,3,!0)),m.setAttribute("uv",new K(h,2,!0)),m.setIndex(new K(u,1)),m.computeBoundingSphere();const f=new Wo(t.color);f.colorSpace=uo,f.flipY=!1,f.anisotropy=4,f.needsUpdate=!0;let d=null;return t.normal&&(d=new Wo(t.normal),d.flipY=!1,d.needsUpdate=!0),{name:l,geometry:m,extent:i,map:f,normalMap:d}}async function qi(l){return Hi(l,await Oi(l))}const Xi=(l,t)=>t/(l.extent.y*2),Yi=`
uniform float uTime;
uniform float uWindStrength;
vec3 modelWind(vec3 p) {
  float w = pow(clamp(p.y * 0.5 + 0.5, 0.0, 1.0), 2.2) * uWindStrength;
  float phase = p.x * 1.7 + p.z * 1.3;
  return vec3((sin(uTime * 1.1 + phase) * 0.6 + sin(uTime * 2.7 + phase * 2.3) * 0.15) * w, 0.0, cos(uTime * 0.9 + phase) * 0.4 * w);
}
`;function jo(l,t,s={}){const e=new Ut({map:t.map,normalMap:t.normalMap,roughness:.62,metalness:0,envMapIntensity:.9,...s.side!==void 0?{side:s.side}:{},...s.tint?{color:s.tint}:{}});t.normalMap&&e.normalScale.set(.6,.6);const o={value:s.wind||0},i={value:s.rim??.14},a={value:s.phase||0};return e.onBeforeCompile=n=>{n.uniforms.uTime=l.uTime,n.uniforms.uWindStrength=o,n.uniforms.uPhase=a,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uRim=i,n.uniforms.uRimColor={value:new W("#fff0dc")},(s.wind||s.deform)&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${Yi}
uniform float uPhase;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          ${s.wind?"transformed += modelWind(transformed);":""}
          ${s.deform?`{ vec3 p = transformed; ${s.deform}
 transformed = p; }`:""}`)),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uSunDir;
uniform float uRim;
uniform vec3 uRimColor;`).replace("#include <opaque_fragment>",`
        // 柔和的輪廓光：朝太陽那一側的邊緣亮一點（微縮模型照片的那種邊光）
        vec3 rimView = normalize(vViewPosition);
        float rimDot = 1.0 - clamp(dot(normal, rimView), 0.0, 1.0);
        vec3 rimSun = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
        float rimFacing = clamp(dot(normal, rimSun) * 0.6 + 0.5, 0.0, 1.0);
        outgoingLight += uRimColor * smoothstep(0.45, 0.9, rimDot) * rimFacing * uRim;
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>`larch-model-clay${s.wind?"-wind":""}${s.deform?`-${t.name}`:""}`,e.userData.phase=a,e}const Cn=`
uniform float uWidth;
uniform float uWidthScale;
uniform vec2 uResolution;
uniform float uUseWind;
uniform float uPhase;
${Yi}
#include <fog_pars_vertex>
void main() {
  vec3 p = position;
  if (uUseWind > 0.5) p += modelWind(p);
  DEFORM_BODY
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mvPosition;
  vec3 viewNormal = normalize(normalMatrix * normal);
  vec2 dir = (projectionMatrix * vec4(viewNormal, 0.0)).xy;
  float len = length(dir);
  if (len > 1e-5) clip.xy += dir / len * uWidth * uWidthScale * clip.w * 2.0 / uResolution;
  clip.z += 0.0004 * clip.w;
  gl_Position = clip;
  #include <fog_vertex>
}
`,Tn=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function An(l,t,s,e={}){const o=new pt({uniforms:{uWidth:t.uWidth,uWidthScale:{value:e.width??.55},uResolution:t.uResolution,uTime:l.uTime,uWindStrength:{value:e.wind||0},uUseWind:{value:e.wind?1:0},uPhase:e.phase||{value:0},uOpacity:e.opacity||{value:1},uInk:{value:new W(e.ink||"#2b1d2a")},fogColor:{value:new W},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:Cn.replace("DEFORM_BODY",e.deform||""),fragmentShader:Tn,side:fs,fog:!0,transparent:!!e.opacity}),i=new H(s.geometry,o);return i.name=`${s.name}-outline`,s.add(i),i}const ys=81,Ze=6.6,Ke=1.36,Ho=.6,$i=-1.15,Zi=1.55,To=.02;class Pn{size=ys;extent=Ze;data=new Float32Array(ys*ys);dirty=!1;get cell(){return 2*this.extent/(this.size-1)}pointX(t){return-this.extent+t*this.cell}pointZ(t){return-this.extent+t*this.cell}sample(t,s){if(!this.dirty)return 0;const e=this.size,o=(t+this.extent)/this.cell,i=(s+this.extent)/this.cell;if(o<=0||i<=0||o>=e-1||i>=e-1)return 0;const a=Math.floor(o),n=Math.floor(i),r=o-a,c=i-n,h=n*e+a,u=this.data;return(u[h]*(1-r)+u[h+1]*r)*(1-c)+(u[h+e]*(1-r)+u[h+e+1]*r)*c}clear(){this.data.fill(0),this.dirty=!1}snapshot(){return this.data.slice()}restore(t){this.data.set(t),this.dirty=t.some(s=>s!==0)}encode(){if(!this.dirty||!this.data.some(e=>Math.abs(e)>=To/2))return"";const t=new Uint8Array(this.data.length);for(let e=0;e<this.data.length;e++)t[e]=(Math.max(-127,Math.min(127,Math.round(this.data[e]/To)))+256)%256;let s="";for(let e=0;e<t.length;e+=4096)s+=String.fromCharCode(...t.subarray(e,e+4096));return btoa(s)}decode(t){if(this.clear(),!t)return!0;try{const s=atob(t);if(s.length!==this.data.length)return!1;for(let e=0;e<s.length;e++){const o=s.charCodeAt(e);this.data[e]=Math.max($i,Math.min(Zi,(o>127?o-256:o)*To))}return this.dirty=this.data.some(e=>e!==0),!0}catch{return this.clear(),!1}}}const _n=`
varying vec3 vLocal;
varying vec3 vWorld;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_vertex>
void main() {
  // 池塘放在 island.top 底下、只往上移了 POND_LEVEL：x、z 就是島的區域座標（跟漣漪、捏地形的格子同一套）
  vLocal = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vAxisX = (modelMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xz;
  vAxisZ = (modelMatrix * vec4(0.0, 0.0, 1.0, 0.0)).xz;
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,In=`
uniform sampler2D uPondDepth;
uniform float uTime;
uniform float uNight;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uSand;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uHaze;
uniform vec3 uGlowFoam;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_fragment>
${We}
${Es}
#ifdef RIPPLE_SIM
${Vi}
#endif
void main() {
  // 跟捏地形的格子對齊：第 i 個格點在第 i 個像素的正中間
  vec2 p = vLocal.xz;
  vec2 uv = ((p + ${Ze.toFixed(3)}) / ${(2*Ze/(ys-1)).toFixed(5)} + 0.5) / ${ys.toFixed(1)};
  float depth = texture2D(uPondDepth, uv).r * ${Ho.toFixed(2)};
  if (depth < 0.006) discard;
  float t = uTime;
  vec3 V = normalize(cameraPosition - vWorld);
  // 小小的風吹波紋（池塘比海平靜）
  vec2 slope = vec2(vnoise(p * 2.4 + vec2(t * 0.32, t * 0.21)) - 0.5, vnoise(p * 2.4 + vec2(7.1 - t * 0.27, 3.3 + t * 0.18)) - 0.5) * 0.16;
  float ring = 0.0;
  #ifdef RIPPLE_SIM
    vec3 sim = rippleAt(p);
    vec2 simSlope = sim.y * vAxisX + sim.z * vAxisZ;
    slope += simSlope;
    ring = smoothstep(0.018, 0.07, sim.x) * smoothstep(0.06, 0.26, length(simSlope));
  #endif
  vec3 N = normalize(vec3(-slope.x, 1.0, -slope.y));
  float deep = smoothstep(0.0, ${Ho.toFixed(2)}, depth);
  // 水底：沙子＋晃動的光網（越深越淡、晚上幾乎沒有）
  float light = exp(-depth * 3.2) * (1.0 - uNight * 0.8);
  vec3 bottom = uSand * (0.9 + 0.1 * vnoise(p * 3.0));
  bottom += uSunColor * caustics(p * 1.9 + slope * 0.5, t * 0.9, 0.08) * 0.55 * light;
  // 越深越吃掉紅光：淺的地方是透明的沙色，深的地方是水自己的顏色
  vec3 trans = exp(-depth * vec3(5.2, 1.8, 1.25));
  vec3 col = bottom * trans + mix(uShallow, uDeep, deep) * (1.0 - trans);
  // 反射天空
  vec3 R = reflect(-V, N);
  R.y = abs(R.y) + 0.02;
  R = normalize(R);
  vec3 refl = mix(mix(uHorizon, uHaze, 0.25), uTop, pow(clamp(R.y, 0.0, 1.0), 0.55)) * vec3(0.86, 0.93, 1.0);
  float fres = 0.03 + 0.97 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);
  col = mix(col, refl, clamp(fres, 0.0, 0.8));
  vec3 H = normalize(uSunDir + V);
  col += mix(vec3(1.0, 0.97, 0.9), vec3(0.86, 0.92, 1.0), uNight) * smoothstep(0.986, 0.996, max(dot(N, H), 0.0)) * 0.8;
  // 岸邊一圈小泡泡、漣漪的波峰一圈亮線
  float lace = (1.0 - smoothstep(0.008, 0.06, depth)) * smoothstep(0.38, 0.66, vnoise(p * 7.5 + vec2(t * 0.4, -t * 0.3)));
  float foam = max(lace * 0.8, ring * 0.55);
  col = mix(col, mix(vec3(1.0), uGlowFoam, uNight), foam);
  col *= mix(1.0, 0.6, uNight);
  col += uGlowFoam * foam * uNight * 0.5;
  float alpha = max(smoothstep(0.006, 0.07, depth) * 0.94, foam);
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Fn(l,t,s){const e=ys,o=new Uint8Array(e*e),i=new xs(o,e,e,fo,bs);i.magFilter=de,i.minFilter=de,i.needsUpdate=!0;const a=new pt({uniforms:{...Se.clone(ze.fog),uPondDepth:{value:i},uTime:l.uTime,uNight:l.uNight,uShallow:t.uShallow,uDeep:t.uMid,uSand:t.uSand,uGlowFoam:t.uGlowFoam,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,...s?s.uniforms:{}},vertexShader:_n,fragmentShader:In,transparent:!0,depthWrite:!1,fog:!0,defines:s?{RIPPLE_SIM:""}:{}}),n=new Ee(2*Ze,2*Ze,1,1);n.rotateX(-Math.PI/2);const r=new H(n,a);r.position.y=Ke,r.renderOrder=3,r.visible=!1,r.name="pond";const c=new Float32Array(e*e);return{mesh:r,update:(h,u)=>{let m=!1;for(let f=0;f<e;f++)for(let d=0;d<e;d++){const p=f*e+d,v=h.data[p],w=v<-.01?Math.max(0,Ke-(u(h.pointX(d),h.pointZ(f))+v)):0;c[p]=w,o[p]=Math.round(Math.min(1,w/Ho)*255),o[p]>1&&(m=!0)}return i.needsUpdate=!0,r.visible=m,m},depthAt:(h,u)=>{if(!r.visible)return 0;const m=2*Ze/(e-1),f=(h+Ze)/m,d=(u+Ze)/m;if(f<=0||d<=0||f>=e-1||d>=e-1)return 0;const p=Math.floor(f),v=Math.floor(d),w=f-p,y=d-v,x=v*e+p;return(c[x]*(1-w)+c[x+1]*w)*(1-y)+(c[x+e]*(1-w)+c[x+e+1]*w)*y},dispose:()=>{n.dispose(),a.dispose(),i.dispose()}}}const fi=new Ne,En=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2;class Rn{items=[];add(t,s,e=[]){if(this.items.find(a=>a.object===t)){this.setBase(t,s);return}const i={object:t,followers:e,x:s.x,y:s.y,z:s.z,shear:new bt,shearVel:new bt,squash:0,squashVel:0,pop:1,matrix:new Ne};this.items.push(i);for(const a of[t,...e])a.updateMatrix=function(){ps.prototype.updateMatrix.call(this),this.matrix.premultiply(i.matrix)}}attach(t,s){const e=this.items.find(o=>o.object===t);!e||e.followers.includes(s)||(e.followers.push(s),s.updateMatrix=function(){ps.prototype.updateMatrix.call(this),this.matrix.premultiply(e.matrix)})}objects(){return this.items.map(t=>t.object)}remove(t){const s=this.items.findIndex(o=>o.object===t);if(s<0)return;const[e]=this.items.splice(s,1);for(const o of[e.object,...e.followers])delete o.updateMatrix,o.updateMatrix()}setBase(t,s){const e=this.items.find(o=>o.object===t);e&&(e.x=s.x,e.y=s.y,e.z=s.z)}has(t){return this.items.some(s=>s.object===t)}poke(t,s=1){const e=this.items.find(i=>i.object===t);if(!e)return!1;const o=Math.random()*Math.PI*2;return e.squashVel-=2.4*s,e.shearVel.x+=Math.cos(o)*.9*s,e.shearVel.y+=Math.sin(o)*.9*s,!0}pop(t){const s=this.items.find(e=>e.object===t);s&&(s.pop=0,s.squashVel+=1.6)}nudgeAround(t,s,e,o){for(const i of this.items){const a=Math.hypot(i.x-t,i.z-s);if(a>e)continue;const n=(1-a/e)*o,r=a>.001?(i.x-t)/a:1,c=a>.001?(i.z-s)/a:0;i.shearVel.x+=r*n,i.shearVel.y+=c*n,i.squashVel-=n*.8}}update(t,s){const e=Math.min(1,Math.max(0,xe.softness)),o=Math.PI*2*(3.2-e*1.4),i=2*(.2-e*.11)*o,a=Math.PI*2*(3.6-e*1.2),n=2*(.22-e*.1)*a,r=.035+e*.03,c=Math.max(1,Math.min(4,Math.ceil(t/(1/120)))),h=t/c;for(const u of this.items){if(!u.object.parent)continue;const m=s.alpha*u.z-s.omega*s.omega*u.x,f=-s.alpha*u.x-s.omega*s.omega*u.z;for(let y=0;y<c;y++)u.shearVel.x+=(-o*o*u.shear.x-i*u.shearVel.x-m*r)*h,u.shearVel.y+=(-o*o*u.shear.y-i*u.shearVel.y-f*r)*h,u.shear.addScaledVector(u.shearVel,h),u.squashVel+=(-a*a*u.squash-n*u.squashVel)*h,u.squash+=u.squashVel*h;u.shear.lengthSq()>.14*.14&&(u.shear.setLength(.14),u.shearVel.multiplyScalar(.6)),u.squash=Math.max(-.32,Math.min(.32,u.squash));let d=1;u.pop<1&&(u.pop=Math.min(1,u.pop+t/.42),d=Math.max(.001,En(u.pop)));const p=u.squash,v=(1+p)*d,w=d/Math.sqrt(Math.max(.3,1+p));u.matrix.makeTranslation(u.x,u.y,u.z).multiply(fi.set(w,u.shear.x*v,0,0,0,v,0,0,0,u.shear.y*v,w,0,0,0,0,1)).multiply(fi.makeTranslation(-u.x,-u.y,-u.z))}}get moving(){return this.items.some(t=>t.shear.lengthSq()>1e-6||Math.abs(t.squash)>1e-4||t.pop<1)}dispose(){for(const t of[...this.items])this.remove(t.object)}}const ao=20261108,ge={x:-2.7,z:-1.7,r:1.7,h:.9},Nn=[{x:1.7,z:-2.3,r:1.25,h:1.62},{x:3.35,z:.25,r:1.15,h:1.6},{x:.3,z:1.6,r:2.2,h:1.58}],Ks=1.18;function Jt(l){const t=Math.cos(l),s=Math.sin(l);return 7.05+.55*ue(t*1.35+3.1,s*1.35+1.7,3)+.26*Math.sin(3*l+.8)+.16*Math.sin(5*l+2.1)}function Dn(l,t){return Math.abs(((l-t)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}function qo(l,t){let s=1.6+.14*ue(l*.22+4,t*.22-2,3);s+=ge.h*Math.exp(-((l-ge.x)**2+(t-ge.z)**2)/(2*ge.r*ge.r));for(const e of Nn){const o=Math.exp(-((l-e.x)**2+(t-e.z)**2)/(2*e.r*e.r));s=Fe(s,e.h,o*.9)}return s}function go(l){const t=Math.exp(-(Dn(l,Ks)**2)/.08000000000000002);return{ramp:t,edge:.8-.1*t,foot:.885+.04*t}}function pi(l,t){const s=Math.atan2(t,l),{edge:e}=go(s);return 1-dt(e-.14,e-.035,Math.hypot(l,t)/Jt(s))}function Ki(l,t,s,e){const{ramp:o,edge:i,foot:a}=go(e);if(l<=i){const r=dt(i-.07,i,l);return qo(t,s)-r*r*(.2-.12*o)}if(l<=a){const r=(l-i)/(a-i),c=qo(t,s)-(.2-.12*o),h=.5-.5*Math.cos(Math.PI*Math.pow(r,.78));return Fe(c,.42,Fe(h,r,o))}if(l<=1.04){const r=(l-a)/(1.04-a);return Fe(.42,-.24,Math.pow(r,1.12))+.04*ue(t*.9,s*.9,2)}const n=Re((l-1.04)/.18);return Fe(-.24,-3.2,n*n*(3-2*n))}function Xt(l,t){const s=Math.atan2(t,l),e=Jt(s);return Ki(Math.hypot(l,t)/e,l,t,s)}const mi=[...Array.from({length:24},(l,t)=>Math.round((.03+t*.03)*1e3)/1e3),.745,.765,.78,.792,.805,.818,.832,.846,.86,.873,.89,.91,.935,.96,.985,1.01,1.04,1.08,1.12,1.17,1.22];function Wn(l){const t=[0,qo(0,0),0];for(const o of mi)for(let i=0;i<l;i++){const a=i/l*Math.PI*2,n=o*Jt(a),r=Math.cos(a)*n,c=Math.sin(a)*n;t.push(r,Ki(o,r,c,a),c)}const s=[];for(let o=0;o<l;o++)s.push(0,1+(o+1)%l,1+o);for(let o=0;o<mi.length-1;o++){const i=1+o*l,a=1+(o+1)*l;for(let n=0;n<l;n++){const r=(n+1)%l;s.push(i+n,i+r,a+n,i+r,a+r,a+n)}}const e=new Bt;return e.setAttribute("position",new K(new Float32Array(t),3)),e.setIndex(s),e.computeVertexNormals(),e}function _s(l,t){const s=Math.max(0,-3.2-t),e=Math.cos(l),o=Math.sin(l),i=dt(0,4,s);return Jt(l)*1.22+s*.115+i*(.75*ue(e*1.6+t*.09,o*1.6-t*.07,3)+.35*Math.sin(t*.55+l*2))}const ce=-58;function Ln(l){const t=[];for(let i=-3.2;i>ce-2;i-=i>-18?.6:1.2)t.push(i);t.push(ce-2);const s=[];for(const i of t)for(let a=0;a<l;a++){const n=a/l*Math.PI*2,r=_s(n,i);s.push(Math.cos(n)*r,i,Math.sin(n)*r)}const e=[];for(let i=0;i<t.length-1;i++){const a=i*l,n=(i+1)*l;for(let r=0;r<l;r++){const c=(r+1)%l;e.push(a+r,a+c,n+r,a+c,n+c,n+r)}}const o=new Bt;return o.setAttribute("position",new K(new Float32Array(s),3)),o.setIndex(e),o.computeVertexNormals(),o}const Vn="#fbebcb",Qi="#a77548",Qs="#8a5c38",gi="#fff3dd";function On(l,t=10){const s=new ot(1,t+2,t),e=s.getAttribute("position"),o=new g;for(let i=0;i<e.count;i++){o.fromBufferAttribute(e,i);const a=1+.18*ue(o.x*1.7+l,o.z*1.7+o.y*1.3-l,2);o.multiplyScalar(a),o.y*=.72,e.setXYZ(i,o.x,o.y,o.z)}return s.computeVertexNormals(),s}function Te(l,t=16,s=12){return new ot(l,t,s)}function Ji(l){const t=Math.atan2(l.z,l.x),s=Math.hypot(l.x,l.z)/Jt(t),{ramp:e,edge:o,foot:i}=go(t),a=ue(l.x*.6,l.z*.6,2),n=Gt("#86d46c","#aee88c",.45+a*.4+(l.y-1.6)*.3),r=Gt("#9ade7e","#b8ec98",.5+a*.4),c=Math.sin(l.y*7.5+a*1.5)*.5+.5,h=Gt("#efd6ae","#e2c290",c*.5),u=Gt(Vn,"#f6dfb8",.5+a*.6),m=Gt("#f0d9b4","#8fd0c4",dt(-.06,-2.6,l.y)),f=Fe(o+.012,i-.01,e),d=n.clone();return d.lerp(r,dt(o-.05,o,s)*(1-e)),d.lerp(h,dt(f-.004,f+.01,s)),d.lerp(u,dt(i-.012,i+.006,s)),d.lerp(m,dt(.985,1.03,s)),d}class ta{solid=new Nt;glow=new Nt;pierParts=new Nt;halos=[];chimneys=[];shadows=[];foamRings=[];rand=De(ao);ground;constructor(t=Xt){this.ground=t}at(t,s){return this.ground(t,s)}tree({x:t,z:s},e,o){const i=this.at(t,s)-.05,a=new yt(.15,.24,1.6,10,5),n=a.getAttribute("position");for(let h=0;h<n.count;h++){const u=n.getY(h)+.8;n.setX(h,n.getX(h)+.14*(u/1.6)**2)}a.translate(0,.8,0),a.computeVertexNormals(),this.solid.add(a,Qs,B({x:t,y:i,z:s,s:e}));const r=new g(t+.1*e,i+2.05*e,s),c=(h,u,m,f)=>{this.solid.add(Te(f,20,14),(d,p)=>Gt("#3f9a3e","#8fda62",p.y*.5+.5+.1*d.x),B({x:t+h*e,y:i+u*e,z:s+m*e,s:e}),.55+u*.18,{center:r,amount:.78})};c(.12,2,0,.95),c(.7,1.7,.25,.68),c(-.5,1.75,-.2,.72),c(.2,2.55,-.08,.62),c(-.2,1.65,.55,.55);for(const[h,u,m]of[[.55,2,.72],[-.35,2.25,.78],[.9,1.55,.55],[-.75,1.6,.45]])this.solid.add(Te(.13,10,8),o,B({x:t+h*e,y:i+u*e,z:s+m*e,s:e}),.9);this.shadows.push({x:t,z:s,r:1.5*e,o:.32})}palm({x:t,z:s},e,o,i){const a=this.at(t,s)-.05,n=Math.cos(i),r=Math.sin(i);let c=0,h=0,u=0;for(let f=0;f<8;f++){const d=new yt(.15-f*.008,.17-f*.008,.36,10,1),p=f/7;c=n*o*p*p*1.4,u=r*o*p*p*1.4,h=f*.33,this.solid.add(d,f%2?"#c99c64":"#b8874f",B({x:t+c*e,y:a+(h+.18)*e,z:s+u*e,rx:r*o*p*.5,rz:-n*o*p*.5,s:e}))}const m=a+(h+.36)*e;for(let f=0;f<7;f++){const d=f/7*Math.PI*2+.3,p=new ot(1,14,6);p.scale(1.15,.05,.3),p.translate(1,0,0),this.solid.add(p,v=>Gt("#3d9f3f","#79cf55",Re(v.x*.5+.2)),B({x:t+c*e,y:m,z:s+u*e,ry:d,rz:-.42,s:e}),v=>Re(v.x*.6)*1.4)}for(let f=0;f<3;f++){const d=f*2.1;this.solid.add(Te(.13,10,8),"#7a5233",B({x:t+(c+Math.cos(d)*.17)*e,y:m-.14*e,z:s+(u+Math.sin(d)*.17)*e,s:e}))}this.shadows.push({x:t+c*e,z:s+u*e,r:1.2*e,o:.22})}house({x:t,z:s},e,o,i){const a=this.at(t,s),n=h=>{const u=Math.cos(e),m=Math.sin(e),f=h.x||0,d=h.z||0;return B({...h,x:t+f*u+d*m,y:a+(h.y||0),z:s-f*m+d*u,ry:(h.ry||0)+e})};this.solid.add(new kt(2.05,.24,1.75,2,.08),"#d9cdb8",n({y:.08})),this.solid.add(new kt(1.8,1.25,1.5,3,.12),gi,n({y:.82}));const r=new yt(.86,.86,1.66,3,1);r.rotateZ(Math.PI/2),r.rotateX(-Math.PI/2),this.solid.add(r,gi,n({y:1.62,s:[1.04,.82,.86]}));for(const h of[-1,1])this.solid.add(new kt(2.25,.15,1.36,2,.07),u=>Gt(o,"#ffffff",u.y>.04?.14:0),n({y:1.9,z:h*.4,rx:h*.907}));this.solid.add(new kt(.28,.62,.28,2,.06),"#c46a4f",n({x:-.55,y:2.1,z:-.3}));const c=n({x:-.55,y:2.45,z:-.3}).elements;this.chimneys.push(new g(c[12],c[13],c[14])),this.solid.add(new kt(.44,.72,.1,2,.05),i,n({y:.56,z:.76})),this.solid.add(Te(.04,8,6),"#f2c14e",n({x:.12,y:.55,z:.82}));for(const h of[-.55,.55]){this.solid.add(new kt(.46,.46,.06,2,.04),"#ffffff",n({x:h,y:.98,z:.755})),this.glow.add(new kt(.34,.34,.05,2,.03),"#ffcf6e",n({x:h,y:.98,z:.78})),this.solid.add(new kt(.5,.1,.16,2,.04),Qi,n({x:h,y:.7,z:.82}));for(const f of[-.15,0,.15])this.solid.add(Te(.07,8,6),f===0?"#ffd166":"#ff8fab",n({x:h+f,y:.79,z:.84}));const m=n({x:h,y:.98,z:.85}).elements;this.halos.push(m[12],m[13],m[14])}this.shadows.push({x:t,z:s,r:1.9,o:.32})}windmillBody({x:t,z:s}){const e=this.at(t,s)-.05;this.solid.add(new yt(.62,.92,2.7,20,4),o=>Gt("#f4e7cf","#e2cfaa",dt(.6,-1.3,o.y)),B({x:t,y:e+1.35,z:s}));for(const o of[.2,1.25])this.solid.add(new ds(.62+(1-o/1.35)*.28,.05,6,24),"#c9ad84",B({x:t,y:e+o,z:s,rx:Math.PI/2}));return this.solid.add(new ot(.8,20,10,0,Math.PI*2,0,Math.PI/2),"#e3584d",B({x:t,y:e+2.66,z:s,s:[1,.92,1]})),this.solid.add(new kt(.42,.66,.1,2,.05),Qs,B({x:t,y:e+.36,z:s+.9,rx:-.11})),this.glow.add(new kt(.26,.3,.06,2,.03),"#ffcf6e",B({x:t,y:e+1.55,z:s+.79,rx:-.11})),this.halos.push(t,e+1.55,s+.86),this.shadows.push({x:t,z:s,r:1.4,o:.3}),new g(t,e+2.42,s+.85)}pier(t){const s=Jt(t),e=new g(Math.cos(t),0,Math.sin(t)),o=Math.atan2(e.x,e.z),i=s*.93;for(let n=0;n<12;n++){const r=i+n*.32;this.pierParts.add(new kt(1.15,.07,.28,1,.03),n%3===1?"#b98a5a":"#c79a69",B({x:e.x*r,y:.42,z:e.z*r,ry:o}))}for(let n=0;n<4;n++){const r=i+.3+n*1.12;for(const c of[-1,1]){const h=Math.cos(t+Math.PI/2)*.52*c,u=Math.sin(t+Math.PI/2)*.52*c;this.pierParts.add(new yt(.075,.085,2,8,1),Qs,B({x:e.x*r+h,y:-.45,z:e.z*r+u})),this.foamRings.push({x:e.x*r+h,z:e.z*r+u,r:.1})}}const a=i+12*.32;return{x:e.x*(a+.8),z:e.z*(a+.8),yaw:o}}lighthouse({x:t,z:s}){const e=this.at(t,s)-.1;this.solid.add(new yt(.4,.55,2.3,16,6),o=>Math.floor((o.y+1.15)/.46)%2?"#ffffff":"#e8574b",B({x:t,y:e+1.15,z:s})),this.solid.add(new yt(.55,.55,.1,16,1),"#3f4a5a",B({x:t,y:e+2.33,z:s})),this.glow.add(new yt(.3,.3,.42,12,1),"#fff1a8",B({x:t,y:e+2.6,z:s})),this.solid.add(new ke(.42,.5,16),"#e8574b",B({x:t,y:e+3.06,z:s})),this.solid.add(Te(.08,8,6),"#f2c14e",B({x:t,y:e+3.36,z:s})),this.halos.push(t,e+2.6,s),this.shadows.push({x:t,z:s,r:.9,o:.28})}rock({x:t,z:s},e,o="#a9b6bf"){const i=this.at(t,s)-.12*e;this.solid.add(On(this.rand()*10),(a,n)=>Gt("#7f8e98",o,n.y*.5+.55),B({x:t,y:i,z:s,ry:this.rand()*6,s:e})),this.foamRings.push({x:t,z:s,r:e*.95})}flower({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new yt(.015,.02,.24,4,1),"#4f9d3f",B({x:t,y:o+.12,z:s}),i=>Re(i.y/.24+.5)*.7);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;this.solid.add(Te(.06,6,4),e,B({x:t+Math.cos(a)*.065,y:o+.25,z:s+Math.sin(a)*.065,s:[1,.55,1]}),.75)}this.solid.add(Te(.045,6,4),"#ffd84d",B({x:t,y:o+.27,z:s}),.75)}bush({x:t,z:s},e){const o=this.at(t,s)-.05,i=new g(t,o+.2*e,s);for(const[a,n,r,c]of[[0,.3,0,.45],[.38,.22,.1,.34],[-.36,.24,-.05,.36]])this.solid.add(Te(c,14,10),(h,u)=>Gt("#3d8f3a","#6cc451",u.y*.5+.5),B({x:t+a*e,y:o+n*e,z:s+r*e,s:e}),.25,{center:i,amount:.7});this.shadows.push({x:t,z:s,r:.75*e,o:.22})}stone({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new yt(.3,.33,.1,12,1),Gt("#efe2c6","#d8c8a8",this.rand()).getHex(),B({x:t,y:o+.02,z:s,ry:this.rand()*3,s:[e,1,e*(.8+this.rand()*.3)]}))}fence(t,s,e){for(let a=0;a<e;a++){const n=a/(e-1),r=Fe(t.x,s.x,n),c=Fe(t.z,s.z,n);this.solid.add(new kt(.12,.55,.12,1,.04),"#c99a68",B({x:r,y:this.at(r,c)+.25,z:c}))}const o=Math.hypot(s.x-t.x,s.z-t.z),i=Math.atan2(s.x-t.x,s.z-t.z);for(const a of[.2,.4]){const n=(t.x+s.x)/2,r=(t.z+s.z)/2;this.solid.add(new kt(.06,.07,o,1,.02),"#d8ab78",B({x:n,y:this.at(n,r)+a,z:r,ry:i}))}}}function Gn(){const l=new Nt;l.add(Te(.16,12,10),"#8a5c38");for(let t=0;t<4;t++){const s=t/4*Math.PI*2;l.add(new kt(.09,1.55,.07,1,.03),"#9b6a42",B({x:Math.sin(s)*.8,y:Math.cos(s)*.8,rz:-s})),l.add(new kt(.36,1.12,.03,1,.012),e=>Math.abs(e.y)%.28<.04?"#e6d4b8":"#fffaf0",B({x:Math.sin(s)*.9+Math.cos(s)*.19,y:Math.cos(s)*.9-Math.sin(s)*.19,z:.02,rz:-s}))}return l.build()}function Bn(){const l=new ot(.42,28,18),t=["#ef4b4b","#ffffff","#ffd23f","#ffffff","#3d8bfd","#ffffff"],s=new Nt;return s.add(l,e=>{if(Math.abs(e.y)>.36)return"#ffffff";const o=(Math.atan2(e.z,e.x)+Math.PI)/(Math.PI*2);return t[Math.floor(o*6)%6]}),s.build()}function ea(){const l=new Nt;l.add(new kt(.86,.46,.58,2,.05),"#a3683c",B({y:.23})),l.add(new kt(.72,.03,.44,1,.01),"#4a2a14",B({y:.463}));for(const e of[-.3,.3])l.add(new kt(.08,.48,.6,1,.02),"#f2c14e",B({x:e,y:.24}));for(let e=0;e<7;e++)l.add(new yt(.07,.07,.025,10,1),"#ffd54a",B({x:-.26+e%4*.17,y:.47+(e>3?.03:0),z:-.12+(e>3?.14:0),rx:.2*(e%2)}));const t=new Nt,s=new yt(.29,.29,.86,16,1,!1,0,Math.PI);s.rotateZ(Math.PI/2),t.add(s,"#b3743f",B({y:0,z:.29}));for(const e of[-.3,.3]){const o=new yt(.3,.3,.08,16,1,!1,0,Math.PI);o.rotateZ(Math.PI/2),t.add(o,"#f2c14e",B({x:e,z:.29}))}return t.add(new kt(.14,.16,.05,1,.02),"#f2c14e",B({y:.02,z:.6})),t.add(new kt(.86,.04,.58,1,.015),"#6e4122",B({y:.02,z:.29})),{base:l.build(),lid:t.build()}}function Un(){const l=new Nt,t=new ot(1,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2);return l.add(t,s=>s.y>-.18?"#ffffff":"#e8604c",B({s:[.55,.42,1.2]})),l.add(new kt(.9,.06,.24,1,.02),Qi,B({y:-.08})),l.add(new yt(.025,.025,1.3,6,1),Qs,B({x:.3,y:.1,rz:1.1})),l.build()}function jn(){const l=document.createElement("canvas");l.width=l.height=64;const t=l.getContext("2d"),s=t.createRadialGradient(32,32,0,32,32,32);return s.addColorStop(0,"#ffffff"),s.addColorStop(.55,"#737373"),s.addColorStop(1,"#000000"),t.fillStyle=s,t.fillRect(0,0,64,64),new ho(l)}const Hn=`
attribute vec3 color;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,qn=`
uniform float uNight;
varying vec3 vColor;
#include <fog_pars_fragment>
void main() {
  vec3 day = vec3(0.62, 0.84, 0.95);
  gl_FragColor = vec4(mix(day, vColor * 1.35, uNight), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,Xn=`
uniform float uScale;
uniform vec3 uSunDir;
attribute float aAge;
attribute float aSeed;
varying float vAge;
varying float vSeed;
varying vec3 vSunView;
void main() {
  vAge = aAge;
  vSeed = aSeed;
  vSunView = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (300.0 + aAge * 960.0) * (0.85 + aSeed * 0.3) * uScale / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,Yn=`
uniform float uNight;
varying float vAge;
varying float vSeed;
varying vec3 vSunView;
void main() {
  // 一團軟軟的煙：當成一顆球來打光（亮面白、暗面帶一點藍紫），邊緣柔柔地淡掉，越飄越散
  vec2 c = (gl_PointCoord - 0.5) * 2.0;
  c.y = -c.y;
  float wobble = 0.08 * sin(atan(c.y, c.x) * 5.0 + vSeed * 20.0 + vAge * 4.0);
  float r = length(c) / (1.0 + wobble * vAge);
  if (r > 1.0) discard;
  vec3 n = vec3(c, sqrt(max(0.0, 1.0 - r * r)));
  float wrap = dot(n, vSunView) * 0.5 + 0.5;
  float lit = smoothstep(0.42, 0.56, wrap);
  vec3 dayCol = mix(vec3(0.8, 0.84, 0.94), vec3(1.0), lit);
  vec3 nightCol = mix(vec3(0.42, 0.47, 0.62), vec3(0.72, 0.76, 0.9), lit);
  vec3 col = mix(dayCol, nightCol, uNight);
  float edge = 1.0 - smoothstep(0.55 + 0.3 * (1.0 - vAge), 1.0, r);
  float a = edge * smoothstep(0.0, 0.12, vAge) * (1.0 - smoothstep(0.45, 1.0, vAge)) * mix(0.92, 0.6, vAge);
  gl_FragColor = vec4(col, a);
}
`,vi=`
uniform float uSize;
uniform float uTime;
attribute float aSeed;
varying float vFlicker;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vFlicker = 0.85 + 0.15 * sin(uTime * 3.0 + aSeed * 7.0);
  gl_PointSize = uSize * vFlicker / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,wi=`
uniform vec3 uColor;
uniform float uOpacity;
varying float vFlicker;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.2) * uOpacity * vFlicker;
  gl_FragColor = vec4(uColor, a);
}
`,Xo=[{color:"#7fe0a0",deep:"#2f9a63",name:["薄荷","Mint"]},{color:"#ffa0c4",deep:"#d44d86",name:["草莓","Strawberry"]},{color:"#8cc8ff",deep:"#3b78d0",name:["汽水","Soda"]},{color:"#ffd36b",deep:"#d9902a",name:["檸檬","Lemon"]},{color:"#c7a8ff",deep:"#7a52d4",name:["葡萄","Grape"]}];async function $n(l,t,s=async()=>{}){const e=new mt;e.name="island";const o=new mt;e.add(o);const i=new ta,a=new Pn,n=(b,z)=>Xt(b,z)+a.sample(b,z),r=new Rn;let c=null;const h=t.models||{},u=new Map,m=(b,z)=>{let A=u.get(b.name);A||(A=jo(l,b,{wind:z.wind}),u.set(b.name,A));const S=new H(b.geometry,A),D=Xi(b,z.height);S.scale.copy(b.extent).multiplyScalar(D);const j=z.y??Xt(z.x,z.z);return S.position.set(z.x,j+b.extent.y*D-(z.sink??.05),z.z),S.rotation.y=z.yaw,S.castShadow=!0,S.receiveShadow=!0,S.name=`model-${b.name}`,o.add(S),r.add(S,{x:z.x,y:j,z:z.z}),S},f=(b,z)=>(b.updateMatrix(),z.clone().applyMatrix4(b.matrix)),d=(b,z)=>{const A=b.geometry.getAttribute("position"),S=new g;let D=-1/0;for(let j=0;j<A.count;j++){const lt=A.getX(j),Rt=A.getY(j),qt=A.getZ(j),ae=z(lt,Rt,qt);ae>D&&(D=ae,S.set(lt,Rt,qt))}return S},p=b=>{const z=b.geometry.getAttribute("position");let A=0,S=0,D=0,j=0,lt=0,Rt=0;for(let qt=0;qt<z.count;qt++){const ae=z.getY(qt);ae>.6&&(A+=z.getX(qt)*b.extent.x,S+=z.getZ(qt)*b.extent.z,D++),ae<-.85&&(j+=z.getX(qt)*b.extent.x,lt+=z.getZ(qt)*b.extent.z,Rt++)}return Math.atan2(S/Math.max(1,D)-lt/Math.max(1,Rt),A/Math.max(1,D)-j/Math.max(1,Rt))};i.solid.add(Wn(t.segments),Ji);const v=i.solid.vertexCount;await s();const w=1.7,y=-2.3,x=-.35,M=h.cottage;if(M){const b=m(M,{x:w,z:y,height:2.9,yaw:x-Math.PI/2,sink:.08});i.chimneys.push(f(b,d(M,(z,A)=>A))),i.shadows.push({x:w,z:y,r:1.9,o:.28})}else i.house({x:w,z:y},x,"#ec6a5c","#8f5a3a");let k;const P=h.windmill;if(P){const b=m(P,{x:ge.x,z:ge.z,height:3.3,yaw:0,sink:.12}),z=d(P,(S,D,j)=>D>.3?Math.hypot(S*P.extent.x,j*P.extent.z):-1),A=Math.atan2(z.x*P.extent.x,z.z*P.extent.z);b.rotation.y=-A,k=f(b,z),i.shadows.push({x:ge.x,z:ge.z,r:1.4,o:.28})}else k=i.windmillBody({x:ge.x,z:ge.z});const T=[[-4,-3.2,1],[.5,-4.5,.92],[4.2,-2.6,.86]],F=["tree","blossom","tree"],I=qa(l),_=T.map(([b,z,A],S)=>{const D=3.1*A,j=Gi(F[S],S+1,I,D);return j.position.set(b,Xt(b,z)-.06,z),j.rotation.y=S*2.39+.6,o.add(j),r.add(j,{x:b,y:Xt(b,z)-.06,z}),i.shadows.push({x:b,z,r:1.5*A,o:.28}),{root:j,x:b,z,kind:F[S],height:D,scale:j.scale.x}}),O=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"],V=De(ao+7),N=-.9,R=3.75,X=[[w,y,1.45],[ge.x,ge.z,1.05],[N,R,.6],...T.map(([b,z])=>[b,z,.75])];let $=0;const nt=[];for(let b=0;b<300&&$<6;b++){const z=V()*Math.PI*2,A=Math.sqrt(V())*.7*Jt(z),S=Math.cos(z)*A,D=Math.sin(z)*A;if(!X.some(([j,lt,Rt])=>(S-j)**2+(D-lt)**2<(Rt+.4)**2)){for(let j=0;j<2;j++)i.flower({x:S+(V()-.5)*.35,z:D+(V()-.5)*.35},O[Math.floor(V()*O.length)]);nt.push([S,D,.5]),$++}}const ut=[[2.5,5.2],[2,4.4],[1.45,3.65],[.85,3]];ut.forEach(([b,z],A)=>i.stone({x:b,z},.95+A%2*.08));const ft=[...X,...ut.map(([b,z])=>[b,z,.42])],wt=2.45,G=-.55,et=h.palm,q=et?p(et):0,J=[];for(const[b,z,A]of[[wt,1.05,.9],[G,.95,.8]]){const S=Math.cos(b)*Jt(b)*.86,D=Math.sin(b)*Jt(b)*.86;if(J.push([S,D]),!et){i.palm({x:S,z:D},z,A,b);continue}m(et,{x:S,z:D,height:3.6*z,yaw:q-b,sink:.12,wind:.04}),i.shadows.push({x:S,z:D,r:1.1*z,o:.2})}const st=h.rocks;for(const[b,z,A]of[[.25,1,.5],[3,1,.55],[5.35,1.01,.5]]){const S=Math.cos(b)*Jt(b)*z,D=Math.sin(b)*Jt(b)*z;if(!st){i.rock({x:S,z:D},A);continue}m(st,{x:S,z:D,height:A*1.1,yaw:b*3.1,sink:A*.4}),i.foamRings.push({x:S,z:D,r:A*1.3})}const gt=i.pier(Ks-.05);await s();const vt=Ye(l,{wind:!0,caustics:!0,pbr:!0,roughness:.82}),jt=Ye(l,{wind:!1,pbr:!0,roughness:.6}),Mt=new H(i.solid.build(!0),vt);Mt.castShadow=!0,Mt.receiveShadow=!0,e.add(Mt);const ct=new H(i.pierParts.build(!0),vt);ct.name="pier",ct.castShadow=!0,ct.receiveShadow=!0,e.add(ct);const Ft={...Se.clone(ze.fog),uNight:l.uNight},Dt=new H(i.glow.build(),new pt({uniforms:Ft,vertexShader:Hn,fragmentShader:qn,fog:!0}));o.add(Dt),await s();const At=Zn(l,t.detail,ft,.05);o.add(At);const Ht=new Bt;Ht.setAttribute("position",new K(new Float32Array(i.halos),3)),Ht.setAttribute("aSeed",new K(new Float32Array(i.halos.length/3).map((b,z)=>z*1.37),1));const ve=new pt({uniforms:{uSize:{value:260},uTime:l.uTime,uColor:{value:new W("#ffc861")},uOpacity:{value:0}},vertexShader:vi,fragmentShader:wi,transparent:!0,depthWrite:!1,blending:he}),Yt=new Ae(Ht,ve);Yt.renderOrder=8,o.add(Yt);const St=t.detail==="high"?36:18,zt=new Float32Array(St*3),Wt=De(ao+11);for(let b=0;b<St;b++){const z=Wt()*Math.PI*2,A=Math.sqrt(Wt())*5.5,S=Math.cos(z)*A,D=Math.sin(z)*A;zt.set([S,Xt(S,D)+.5+Wt()*1.6,D],b*3)}const ee=new Bt;ee.setAttribute("position",new K(zt,3)),ee.setAttribute("aSeed",new K(new Float32Array(St).map((b,z)=>z*2.1),1));const se=new pt({uniforms:{uSize:{value:70},uTime:l.uTime,uColor:{value:new W("#d9ff7a")},uOpacity:{value:0}},vertexShader:vi,fragmentShader:wi,transparent:!0,depthWrite:!1,blending:he}),L=new Ae(ee,se);L.userData.base=zt.slice(),L.renderOrder=8,o.add(L);const Q=jn(),rt=new Is({alphaMap:Q,color:"#1d3b2a",transparent:!0,depthWrite:!1,opacity:.3}),Pt=[];for(const b of i.shadows){const z=new Ee(b.r*2,b.r*2);z.rotateX(-Math.PI/2),z.translate(b.x,Xt(b.x,b.z)+.03,b.z),Pt.push(z)}const xt=new H(Kn(Pt),rt);xt.renderOrder=1,o.add(xt);const Et=h.sails,_t=Et?new H(Et.geometry,jo(l,Et,{side:te})):new H(Gn(),jt);if(Et){const b=Math.max(Et.extent.y,Et.extent.z);_t.scale.copy(Et.extent).multiplyScalar(1.6/b),_t.rotation.order="ZYX",_t.rotation.y=Math.PI/2,_t.receiveShadow=!0}_t.position.copy(k),_t.castShadow=!0,o.add(_t),Et||ui(_t,l,t.outlines);const oe=new H(new ua(1.5,24),new Is({visible:!1,side:te}));oe.position.copy(k).add(new g(0,0,.06)),o.add(oe);const Ct=o.children.find(b=>b.name==="model-windmill");Ct&&(r.attach(Ct,_t),r.attach(Ct,oe));const Lt=4.05,Vt=3.55,Z=new H(Bn(),Ye(l,{wind:!1,rim:.5}));Z.position.set(Lt,Xt(Lt,Vt)+.4,Vt),Z.visible=!1;const Ot=ea(),Zt=Xt(N,R)-.02,ht=new H(Ot.base,jt);ht.position.set(N,Zt,R),ht.rotation.y=.35,ht.castShadow=!0;const Kt=new H(Ot.lid,jt);Kt.position.set(0,.46,-.29),ht.add(Kt),o.add(ht),r.add(ht,{x:N,y:Zt,z:R}),Ao(o,rt,N,R,.7,.32);const ne=1.95,ie=Ya(),Le=Jt(ne)*1.16;ie.position.set(Math.cos(ne)*Le,.04,Math.sin(ne)*Le),o.add(ie),i.foamRings.push({x:ie.position.x,z:ie.position.z,r:.42});const Qt=new H(Un(),Ye(l,{wind:!1,side:te}));ui(Qt,l,t.outlines),Qt.position.set(gt.x+Math.cos(Ks+Math.PI/2)*1.1,.05,gt.z+Math.sin(Ks+Math.PI/2)*1.1),Qt.rotation.y=gt.yaw+.25,e.add(Qt),await s();const we=[],Ms={ground:n,avoid:(b,z)=>(c?.depthAt(b,z)??0)>.03,reach:b=>Jt(b)*.6,blocked:[...X,...J.map(([b,z])=>[b,z,.6])],seaLevel:0,swimReach:b=>Jt(b)*1.45,onSplash:(b,z)=>fe.handler?.(b,z)},fe={},Ve=[],Je=(b,z,A,S,D=0)=>{b.group.position.set(z,Xt(z,A)-.02,A),b.group.scale.setScalar(S),b.group.rotation.y=D,o.add(b.group);const j=Ao(o,rt,z,A,.95*S,.32);return we.push(b),Ve.push(new ji(b,Ms,Ve,j,we.length)),b},Rs=Je(new xe("slime",Xo[0],l,{face:!0,seed:1}),.3,2.05,.78);Je(new xe("slime",{color:"#ffa0c4",deep:"#d44d86"},l,{face:!0,seed:2}),-1.75,1.55,.58),Je(new xe("slime",{color:"#8cc8ff",deep:"#3b78d0"},l,{face:!0,seed:3}),2.05,1.35,.62),await s();const Ss=new Uint8Array(256);for(let b=0;b<256;b++){const z=(b/256-.5)*Math.PI*2;Ss[b]=Math.round(Re((Jt(z)-5.5)/3)*255)}const ye=new xs(Ss,256,1,fo,bs);ye.wrapS=Ri,ye.magFilter=de,ye.minFilter=de,ye.needsUpdate=!0,i.foamRings.push({x:Qt.position.x,z:Qt.position.z,r:0,sx:.5,sz:1.08,yaw:Qt.rotation.y});const It=t.ripples??null,$t=kn(l,ye,i.foamRings,t.detail,It,!!t.vertexRipples),zs=$t.mesh,ks=$t.uniforms;e.add(zs);let ts=null;if(It){const b=i.foamRings;It.setWalls((z,A)=>{let S=dt(-.16,.02,Xt(z,A));for(const D of b){let j=z-D.x,lt=A-D.z,Rt;if(D.sx||D.sz){const qt=Math.cos(D.yaw||0),ae=Math.sin(D.yaw||0),xo=(j*qt-lt*ae)/(D.sx||1),bo=(j*ae+lt*qt)/(D.sz||1);Rt=(Math.hypot(xo,bo)-1)*Math.min(D.sx||1,D.sz||1)}else Rt=Math.hypot(j,lt)-D.r*.8;S=Math.max(S,1-dt(-.04,.06,Rt))}return S}),ts=It.wallArray.slice()}c=Fn(l,ks,It),o.add(c.mesh);const Ds=()=>{if(c.update(a,Xt),!It||!ts)return;const b=It.wallArray,z=It.size;if(b.set(ts),c.mesh.visible)for(let A=0;A<z;A++){const S=It.cellZ(A);if(!(Math.abs(S)>6.7))for(let D=0;D<z;D++){const j=It.cellX(D);Math.abs(j)>6.7||c.depthAt(j,S)>.004&&(b[A*z+D]=0)}}It.wallsChanged()},pe=new g,Oe=(b,z,A)=>{It?It.drop(b,z,-.11*A,.22+.14*Math.min(1.6,A)):(o.localToWorld(pe.set(b,0,z)),$t.ripple(pe.x,pe.z,A))},Ws=It?(b,z,A)=>{e.worldToLocal(pe.set(b,0,z)),Oe(pe.x,pe.z,A)}:$t.ripple,es=new g,Ls=(b,z,A,S,D)=>{if(!It){$t.ripple(A,S,D);return}e.worldToLocal(es.set(b,0,z)),e.worldToLocal(pe.set(A,0,S));const j=es.distanceTo(pe),lt=Math.min(.05,.008+j*.06)*D;It.trail(es.x,es.z,pe.x,pe.z,-lt,.2)};await s();const ms=new Nt;ms.add(Ln(t.detail==="high"?128:72),(b,z)=>{const A=ue(b.x*.35+b.y*.2,b.z*.35-b.y*.15,3),S=-b.y;let D=Gt("#7d9ea6","#55707f",dt(4,40,S));return D.lerp(Gt("#b9b393","#7f8c7a",dt(6,40,S)),dt(.3,.8,z.y)*.55),A<-.42&&(D=D.lerp(new W("#5fa88a"),.35)),D});const Ge=new H(ms.build(),Ye(l,{wind:!1,rim:.12,caustics:!0,rock:!0}));e.add(Ge);const Be=9,Ue=i.chimneys.length*Be,ss=new Float32Array(Ue*3),gs=new Float32Array(Ue);for(let b=0;b<Ue;b++)gs[b]=b%Be/Be;const re=new Bt;re.setAttribute("position",new K(ss,3)),re.setAttribute("aAge",new K(gs,1)),re.setAttribute("aSeed",new K(new Float32Array(Ue).map((b,z)=>z*.618034%1),1));const Me=new pt({uniforms:{uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir},vertexShader:Xn,fragmentShader:Yn,transparent:!0,depthWrite:!1}),je=new Ae(re,Me);je.frustumCulled=!1,je.renderOrder=7,o.add(je);const os=[],Cs=new ot(1,12,8);Cs.scale(.42,.36,.92);const wo=new Is({visible:!1}),is=Ye(l,{wind:!1,rim:.4,emissive:"#5c6f80",emissiveIntensity:.25}),yo=new ot(.12,10,8);yo.scale(1.7,.75,.75);const Vs=new ot(.5,10,6);Vs.scale(.35,.05,1),Vs.translate(0,0,.42);const C=new Nt;C.add(yo,"#ffffff"),C.add(new ke(.035,.12,6),"#f2b84b",B({x:.24,rz:-Math.PI/2}));const E=C.build(),U=new Nt().add(Vs,b=>b.z>.7?"#4a5866":"#ffffff").build();for(let b=0;b<3;b++){const z=new mt,A=new H(E,is),S=new H(U,is),D=new H(U,is);D.scale.z=-1,z.add(A,S,D,new H(Cs,wo)),z.name=`gull-${b}`,z.scale.setScalar(.9+b*.12),z.userData.velocity=new g,o.add(z),os.push({group:z,left:S,right:D,radius:9+b*2.2,height:6.5+b*1.3,speed:.22+b*.05,phase:b*2.1,size:.9+b*.12,arrive:1/0,last:null})}const Y=2.8,tt=(b,z)=>{ie.position.y=.04+Math.sin(z*1.4)*.05,ie.rotation.set(Math.sin(z*1.1)*.1,ne+z*.08,1.22+Math.sin(z*1.4+.6)*.08);for(let S=0;S<Ue;S++){const D=i.chimneys[Math.floor(S/Be)];let j=gs[S]+b*.22;j>1&&(j-=1),gs[S]=j;const lt=j*j;ss[S*3]=D.x+lt*1.1+Math.sin(z*.8+S)*.08*j,ss[S*3+1]=D.y+j*2.1,ss[S*3+2]=D.z+lt*.5}re.getAttribute("position").needsUpdate=!0,re.getAttribute("aAge").needsUpdate=!0;const A=e.rotation.y;for(const S of os){const D=z*S.speed+S.phase;let j=0;if(S.arrive<Y){S.arrive+=b;const ae=Math.min(1,S.arrive/Y);j=1-ae*ae*(3-2*ae),S.group.scale.setScalar(S.size*(.35+.65*(1-j))),ae>=1&&(S.group.scale.setScalar(S.size),S.group.userData.arriving=!1)}S.group.position.set(Math.cos(D)*S.radius+Math.sin(A)*22*j,S.height+j*5+Math.sin(z*.9+S.phase)*.4,Math.sin(D)*S.radius-Math.cos(A)*22*j);const lt=S.group.userData.velocity,Rt=j>.01&&lt.lengthSq()>.01?Math.atan2(-lt.z,lt.x):-D-Math.PI/2;S.group.rotation.set(0,Rt,Math.sin(z*.6+S.phase)*.15-.18);const qt=Math.sin(z*(7+j*5)+S.phase*3)*.55;S.left.rotation.x=-qt,S.right.rotation.x=qt,S.last&&b>0&&lt.subVectors(S.group.position,S.last).divideScalar(b),(S.last||=new g).copy(S.group.position)}},it=b=>{const z=os.find(A=>A.group===b);z&&(z.arrive=0,z.last=null,z.group.userData.arriving=!0,z.group.scale.setScalar(z.size*.35))},at=b=>{const z=r.objects().filter(j=>j.parent&&j.visible),A=b.intersectObjects(z,!0)[0];if(!A)return null;let S=A.object;for(;S&&!z.includes(S);)S=S.parent;if(!S)return null;const D=b.intersectObject(Mt,!1)[0];return D&&D.distance+.05<A.distance?null:{object:S,point:A.point.clone()}},Tt=b=>{let z=null,A=1/0;for(const S of we){const D=S.hit(b);D&&D.distance<A&&(A=D.distance,z={kind:"jelly",jelly:S,point:D.point.clone()})}for(const[S,D]of[["blades",oe],["chest",ht],["bottle",ie]]){const j=b.intersectObject(D,!0)[0];j&&j.distance<A&&(A=j.distance,z={kind:S,point:j.point.clone()})}if(z){const S=b.intersectObject(Mt,!1)[0];if(S&&S.distance+.05<A)return null}return z};return{group:e,top:o,column:Ge,sea:zs,seaUniforms:ks,jellies:we,walkers:Ve,hero:Rs,blades:_t,ball:Z,boat:Qt,pier:ct,halos:Yt,fireflies:L,animate:tt,ripple:Ws,seaSparkles:$t.sparkles,seaSparkleUniforms:$t.sparkleUniforms,chest:{base:ht,lid:Kt,open:!1,angle:0,velocity:0},trees:_,bottle:ie,onSlimeSplash:b=>{fe.handler=b},ground:n,sculpt:a,pond:c,wobble:r,ripples:It,rippleTrail:Ls,rippleLocal:Oe,refreshWater:Ds,hitProp:at,gulls:os.map(b=>b.group),gullReturn:it,kit:{env:l,outlines:t.outlines,detail:t.detail,terrain:Mt,terrainVertices:v,solid:vt,still:jt,shadowMaterial:rt,treeMaterials:I,models:h,placeModel:m,walkArea:Ms,protect:[...X,...ft,...nt,...J.map(([b,z])=>[b,z,.75])],grass:At,addShadow:(b,z,A,S)=>Ao(o,rt,b,z,A,S)},bladeHub:k,pierEnd:gt,materials:{solid:vt},hitInteractive:Tt,hitLand:b=>{const z=b.intersectObject(Mt,!1)[0];return z&&z.point.y>-.05?z.point.clone():null},dispose:()=>{e.traverse(b=>{const z=b;z.geometry&&z.geometry.dispose();const A=z.material;Array.isArray(A)?A.forEach(S=>S.dispose?.()):A?.dispose?.()}),ye.dispose(),Q.dispose(),c?.dispose(),r.dispose();for(const b of Object.values(h))b.map.dispose(),b.normalMap?.dispose();$t.dispose(),I.dispose()}}}function Zn(l,t,s,e=1){const o=new Nt,i=De(ao+23);for(let d=0;d<6;d++){const p=.15+i()*.13,v=new Ee(.06,p,1,3),w=v.getAttribute("position");for(let M=0;M<w.count;M++){const k=w.getY(M)+p/2,P=k/p;w.setXYZ(M,w.getX(M)*(1-P*.92),k,.08*P*P)}const y=d/6*Math.PI*2+i()*.6,x=.18+i()*.22;o.add(v,M=>Gt("#46963d","#a8e679",Re(M.y/.26)),B({x:Math.cos(y)*.06,z:Math.sin(y)*.06,ry:y,rx:x}),M=>Re(M.y/.26))}const a=o.build(!0),n=a.getAttribute("normal");for(let d=0;d<n.count;d++)n.setXYZ(d,0,1,0);const r=new Ei({vertexColors:!0,gradientMap:Ye(l).gradientMap,side:te});r.onBeforeCompile=d=>{d.uniforms.uTime=l.uTime,d.vertexShader=d.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aExtra;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec2 grassAt = vec2(0.0);
        #ifdef USE_INSTANCING
          grassAt = instanceMatrix[3].xz;
        #endif
        float grassPhase = grassAt.x * 0.8 + grassAt.y * 0.55;
        float gust = 0.55 + 0.45 * sin(uTime * 0.7 + grassAt.x * 0.25);
        transformed.x += sin(uTime * 1.9 + grassPhase) * 0.07 * aExtra * gust;
        transformed.z += cos(uTime * 1.5 + grassPhase * 1.2) * 0.05 * aExtra * gust;`)},r.customProgramCacheKey=()=>"l3d-grass";const c=Math.round((t==="high"?1300:600)*e),h=new Qe(a,r,c),u=new ps,m=new W;let f=0;for(let d=0;d<c*5&&f<c;d++){const p=i()*Math.PI*2,{edge:v,foot:w,ramp:y}=go(p),x=Fe(v-.03,w-.03,y),M=Math.sqrt(i())*x*Jt(p),k=Math.cos(p)*M,P=Math.sin(p)*M;s.some(([T,F,I])=>(k-T)**2+(P-F)**2<I*I)||(u.position.set(k,Xt(k,P)-.02,P),u.rotation.set(0,i()*Math.PI*2,0),u.scale.setScalar(.7+i()*.6),u.updateMatrix(),h.setMatrixAt(f,u.matrix),h.setColorAt(f,m.setRGB(.88+i()*.2,.92+i()*.14,.88+i()*.16)),f++)}return h.count=f,h.receiveShadow=!0,h}function Ao(l,t,s,e,o,i){const a=new Ee(o*2,o*2);a.rotateX(-Math.PI/2);const n=new H(a,t.clone());return n.material.opacity=i,n.position.set(s,Xt(s,e)+.035,e),n.renderOrder=1,l.add(n),n}function Kn(l){const t=new Nt;l.forEach(i=>t.add(i,"#000000"));const s=t.build(),e=s.getAttribute("position").count,o=new Float32Array(e*2);for(let i=0;i<e;i+=4)o.set([0,1,1,1,0,0,1,0],i*2);return s.setAttribute("uv",new K(o,2)),s}const Qn=12,Xe=12,Jn=9,tr=new g(0,1,0),er=new po;function sr(l){const t=new po;return l.traverse(s=>{const e=s;!e.isMesh||!e.visible||!e.geometry||!(Array.isArray(e.material)?e.material:[e.material]).some(i=>i.visible)||(e.geometry.boundingBox||e.geometry.computeBoundingBox(),t.union(er.copy(e.geometry.boundingBox).applyMatrix4(e.matrixWorld)))}),t}const or=l=>1+(1.9+1)*(l-1)**3+1.9*(l-1)**2,ir=l=>l*l*(3-2*l);function ar(l,t,s){const e=l.clone();if(e.clippingPlanes=[t],e.clipShadows=!0,s&&!l.transparent){e.side=te;const o=l.customProgramCacheKey();e.onBeforeCompile=(i,a)=>{l.onBeforeCompile.call(l,i,a),i.uniforms.uCutInner={value:s},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uCutInner;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
if (!gl_FrontFacing) gl_FragColor = vec4(uCutInner * (0.86 + 0.14 * sin(gl_FragCoord.x * 0.05) * sin(gl_FragCoord.y * 0.05)), 1.0);`)},e.customProgramCacheKey=()=>`${o}|cut`}return e}const Po=(l,t)=>l.traverse(s=>{t?s.layers.enable(0):s.layers.disable(0)});class nr{cuts=[];floor=()=>0;onSplash=null;onReturn=null;isCut(t){return this.cuts.some(s=>s.root===t||s.halves.some(e=>e.object===t))}get count(){return this.cuts.length}cut(t,s,e){if(this.isCut(t)||!t.parent||this.cuts.length>=Qn)return!1;t.updateWorldMatrix(!0,!0);const o=sr(t);if(o.isEmpty())return!1;const i=o.getSize(new g).length();let a=0,n=0;for(let v=0;v<8;v++){const w=new g(v&1?o.max.x:o.min.x,v&2?o.max.y:o.min.y,v&4?o.max.z:o.min.z);s.distanceToPoint(w)<0?a++:n++}if(!a||!n)return!1;const r=new Ne().copy(t.matrixWorld).invert(),c=s.clone().applyMatrix4(r),u=(e.kind==="fall"?new g((o.min.x+o.max.x)/2,o.min.y,(o.min.z+o.max.z)/2):o.getCenter(new g)).clone().applyMatrix4(r),m=new Ne().copy(t.parent.matrixWorld).invert(),f=e.inner?new W(e.inner).convertLinearToSRGB():null,d=[],p=[1,-1].map(v=>{const w=new to,y=t.clone(!0);y.name=`${t.name}-half`,y.traverse(P=>{const T=P;if(!T.isMesh)return;const F=I=>{const _=ar(I,w,f);return d.push(_),_};if(Array.isArray(T.material)?T.material.some(I=>I instanceof pt):T.material instanceof pt){T.visible=!1;return}T.material=Array.isArray(T.material)?T.material.map(F):F(T.material)}),Po(y,!0),t.parent.add(y);const x=s.normal.clone().multiplyScalar(v).transformDirection(m);x.y*=.25,x.lengthSq()<1e-6&&x.set(1,0,0),x.normalize();const M=new g().crossVectors(tr,x);M.lengthSq()<1e-6&&M.set(1,0,0),M.normalize();const k={object:y,plane:w,localPlane:v>0?c.clone():c.clone().negate(),dir:x,axis:M,side:v};if(e.kind==="drop"){const P=t.userData.velocity instanceof g?t.userData.velocity:null,T=(P?P.clone().multiplyScalar(.7):new g).addScaledVector(x,e.push*10).add(new g(0,1.6,0));k.fall={pos:t.position.clone(),vel:T,base:t.quaternion.clone(),angle:0,spin:(3+Math.random()*2.5)*v,landed:-1}}return k});return Po(t,!1),this.cuts.push({root:t,style:e,halves:p,t:0,pivot:u,baseScale:t.scale.clone(),size:i,materials:d,phase:"apart"}),this.update(0),!0}update(t){for(let s=this.cuts.length-1;s>=0;s--){const e=this.cuts[s];if(e.t+=t,e.phase==="grow"){const o=Math.min(1,e.t/1.6),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.root.scale.copy(e.baseScale).multiplyScalar(Math.max(.001,i)),o>=1&&this.cuts.splice(s,1);continue}(e.style.kind==="drop"?this.drop(e,t):this.place(e))&&this.finish(e)}}drop(t,s){const e=t.root.parent;let o=0;for(const i of t.halves){const a=i.fall,n=i.object;if(a.landed<0){a.vel.y-=Jn*s,a.pos.addScaledVector(a.vel,s),a.angle+=a.spin*s;const c=this.floor(a.pos.x,a.pos.z);if(a.pos.y<c){a.pos.y=c,a.landed=0;const h=c<=.02;this.onSplash&&e&&this.onSplash(e.localToWorld(a.pos.clone()),t.size,h)}}else a.landed+=s,this.floor(a.pos.x,a.pos.z)<=.02&&(a.pos.y-=s*.5),a.angle+=a.spin*s*.2;const r=a.landed<0?1:Math.max(.001,1-a.landed/.55);if(a.landed>.55){o++,n.visible=!1;continue}n.quaternion.setFromAxisAngle(i.axis,a.angle).multiply(a.base),n.position.copy(a.pos),n.scale.copy(t.baseScale).multiplyScalar(r),n.visible=t.root.visible,n.updateMatrixWorld(!0),i.plane.copy(i.localPlane).applyMatrix4(n.matrixWorld)}return o===t.halves.length&&t.t>(t.style.respawn??6)}place(t){const{root:s,style:e,t:o}=t,i=e.kind==="fall";let a,n=1;if(o<.75)a=or(o/.75);else if(i){if(a=1,o>Xe&&(n=Math.max(.001,1-(o-Xe)/.4)),o>Xe+.4)return!0}else if(a=o<Xe?1:1-ir(Math.min(1,(o-Xe)/.7)),o>Xe+.7)return!0;s.updateMatrix();const r=t.pivot.clone().applyMatrix4(s.matrix),c=i?0:Math.sin(o*2.4)*.03*t.size*Math.min(1,a);for(const h of t.halves){const u=h.object,m=new be().setFromAxisAngle(h.axis,e.tilt*a);u.quaternion.copy(m).multiply(s.quaternion),u.position.copy(s.position).sub(r).applyQuaternion(m).add(r).addScaledVector(h.dir,e.push*t.size*a).add(new g(0,-(e.sink||0)*t.size*a+c*h.side,0)),u.scale.copy(s.scale).multiplyScalar(n),u.visible=s.visible,u.updateMatrixWorld(!0),h.plane.copy(h.localPlane).applyMatrix4(u.matrixWorld)}return!1}finish(t,s=!1){for(const o of t.halves)o.object.removeFromParent();for(const o of t.materials)o.dispose();if(t.materials.length=0,Po(t.root,!0),!s&&t.style.kind==="fall"&&t.phase==="apart"&&t.t>Xe){t.phase="grow",t.t=0,t.root.scale.setScalar(.001);return}t.root.scale.copy(t.baseScale);const e=this.cuts.indexOf(t);e>=0&&this.cuts.splice(e,1),!s&&t.style.kind==="drop"&&this.onReturn?.(t.root)}dispose(){for(const t of[...this.cuts])this.finish(t,!0);this.cuts.length=0}}const yi=18,_o=2.6,rr=.98,Ts=40,xi=.16,lr=.42,cr=l=>1+(1.6+1)*(l-1)**3+1.6*(l-1)**2,hr=[[/cottage/,{kind:"fall",inner:"#f3dfbf",tilt:.85,push:.08}],[/windmill/,{kind:"fall",inner:"#efe0c4",tilt:.8,push:.08}],[/palm/,{kind:"fall",inner:"#e7c98f",tilt:1.05,push:.06}],[/rocks/,{kind:"fall",inner:"#9aa3a8",tilt:.6,push:.1}]],ur=[[/cottage/,"#e8604c"],[/windmill/,"#f1e2c4"],[/sails|blades/,"#e9b56b"],[/palm/,"#7cc35b"],[/rocks/,"#b9b4a8"],[/whale/,"#8fb7ff"],[/serpent/,"#5ec6c0"],[/turtle/,"#ee9a83"],[/bottle/,"#bff3ec"],[/gull/,"#f4f7fb"],[/dolphin/,"#8cc3f2"]];class dr{armed=!1;viewHeight=720;island;top;scene;camera;hand;fly=-1;flyFrom=new bt;splits=[];leaves=[];drops=[];chops=new Map;wobbles=new Map;propCuts=new nr;moods=new Map;propTargets=()=>[];dropGeometry=new ot(1,12,9);leafGeometry=new Ni(1,0);materials=[];onArm;stroke=null;strokes=0;handGoal=null;handNdc=new bt(.4,-.3);handShown=0;handRoll=-.62;handDip=0;handMotion=new bt;trail;trailPositions;trailColors;trailPoints=[];clock=0;constructor(t,s,e,o){this.island=t,this.top=t.top,this.scene=s,this.camera=e,this.onArm=o,this.propCuts.floor=(r,c)=>Math.max(t.ground(r,c),0),this.propCuts.onSplash=(r,c,h)=>this.splash(r,h),this.propCuts.onReturn=r=>t.gullReturn(r),this.hand=fr(this.materials,!0),this.hand.visible=!1,this.scene.add(this.hand);const i=new Bt;this.trailPositions=new Float32Array(Ts*2*3),this.trailColors=new Float32Array(Ts*2*3),i.setAttribute("position",new K(this.trailPositions,3).setUsage(Ie)),i.setAttribute("color",new K(this.trailColors,3).setUsage(Ie));const a=[];for(let r=0;r<Ts-1;r++){const c=r*2;a.push(c,c+1,c+2,c+1,c+3,c+2)}i.setIndex(a);const n=new Is({vertexColors:!0,transparent:!0,blending:he,depthTest:!1,depthWrite:!1,fog:!1});this.materials.push(n),this.trail=new H(i,n),this.trail.frustumCulled=!1,this.trail.renderOrder=30,this.trail.visible=!1,this.scene.add(this.trail)}grab(t){this.armed||(this.armed=!0,this.stroke=null,this.handShown=.2,this.handMotion.set(0,0),t?(this.flyFrom.copy(t),this.handNdc.copy(t),this.fly=0):this.fly=-1,this.onArm(!0))}putBack(){this.fly=-1,this.stroke=null,this.armed&&(this.armed=!1,this.onArm(!1))}setHand(t,s=!1,e=!1,o=!1){if(!t){this.handGoal=null;return}this.handGoal?(this.handGoal.ndc.copy(t),this.handGoal.down=s,this.handGoal.rest=e,this.handGoal.home=o):this.handGoal={ndc:t.clone(),down:s,rest:e,home:o}}strokeBegin(t){this.stroke={id:++this.strokes,entered:new Map,chopped:new Set,props:new Map,lastDir:null,start:t.clone(),travelled:0},this.trailPoints.length=0,this.handNdc.copy(t)}strokeSample(t,s){const e=this.stroke;if(!e)return;const o=t.ray.direction.clone();this.trailPoints.push({ndc:s.clone(),t:this.clock}),this.trailPoints.length>Ts&&this.trailPoints.shift(),e.travelled=Math.max(e.travelled,s.distanceTo(e.start));for(const n of this.cuttable(e.id)){const r=!!n.hit(t),c=e.entered.get(n);r&&!c?(e.entered.set(n,e.lastDir||o),n.cuts.length||this.setMood(n,1,1.4)):!r&&c&&(e.entered.delete(n),this.cutBody(n,c,o,t.ray.origin))}const i=this.hitTree(t);i&&!e.chopped.has(i.tree)&&(e.chopped.add(i.tree),this.chop(i.tree,i.point,t.ray.origin));const a=i?null:this.propHit(t);for(const[n,r]of e.props)n!==a?.root&&(e.props.delete(n),this.cutProp(n,r,o,t.ray.origin));a&&!e.props.has(a.root)&&(e.props.set(a.root,e.lastDir||o),this.touchProp(a.root,a.point)),e.lastDir=o}strokeEnd(t,s){const e=this.stroke;if(this.stroke=null,!e)return;const o=new g().setFromMatrixColumn(this.camera.matrixWorld,1);if(s){const i=this.cuttable(e.id).find(r=>r.hit(t));if(i){const r=t.ray.direction;this.cutBody(i,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin);return}const a=this.hitTree(t);if(a){this.chop(a.tree,a.point,t.ray.origin);return}const n=this.propHit(t);if(n){const r=t.ray.direction;this.cutProp(n.root,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin)}return}if(!(e.travelled<.05||!e.lastDir)){for(const[i,a]of e.entered)a.angleTo(e.lastDir)>.01&&this.cutBody(i,a,e.lastDir,t.ray.origin);for(const[i,a]of e.props)a.angleTo(e.lastDir)>.01&&this.cutProp(i,a,e.lastDir,t.ray.origin)}}cuttable(t){const s=[];for(const e of this.island.walkers)e.frozen||s.push(e.jelly);for(const e of this.splits)for(const o of e.pieces)o.stroke!==t&&o.body.cuts.length<4&&s.push(o.body);return s}cutBody(t,s,e,o){const i=new g().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new g().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize(),t.front.updateWorldMatrix(!0,!1);const a=new to().setFromNormalAndCoplanarPoint(i,o).applyMatrix4(new Ne().copy(t.front.matrixWorld).invert()),n=new Ko(a.normal.x,a.normal.y,a.normal.z,-a.constant),r=t.split(n);if(!r)return;const c=this.island.walkers.find(y=>y.jelly===t);let h,u=null;if(c){const y=t.group,x=y.position.clone().add(new g(0,t.front.position.y*y.scale.x,0));h={walker:c,pieces:[],t:0,origin:x,quat:y.quaternion.clone(),scale:y.scale.x},this.splits.push(h),c.frozen=!0,y.visible=!1}else h=this.splits.find(y=>y.pieces.some(x=>x.body===t)),u=h.pieces.find(y=>y.body===t),h.pieces.splice(h.pieces.indexOf(u),1),this.top.remove(u.pivot),u.body.dispose();h.t=0;const m=h.scale,f=u?u.pivot.quaternion:h.quat,d=u?u.pivot.position.clone().sub(u.center.clone().multiplyScalar(m).applyQuaternion(f)):h.origin,p=new g(n.x,n.y,n.z).applyQuaternion(f);p.y*=.3,p.lengthSq()<1e-6&&p.set(1,0,0),p.normalize();const v=t.uniforms.uColor.value;r.forEach((y,x)=>{const M=x===0?-1:1,k=y.centroid(),P=new mt;P.position.copy(d).add(k.clone().multiplyScalar(m).applyQuaternion(f)),P.quaternion.copy(f),y.group.scale.setScalar(m),y.group.position.copy(k).multiplyScalar(-m),P.add(y.group),this.top.add(P),P.updateMatrixWorld(!0);const T=p.clone().multiplyScalar(M),F=(1.5+Math.random()*.6)*m,I=T.clone().multiplyScalar(F).add(new g(0,1.3+Math.random()*.5,0));u&&I.add(u.vel);const _=new g(0,1,0).cross(T).multiplyScalar(2.2+Math.random()*1.2);y.poke(),y.uniforms.uMood.value=2,h.pieces.push({body:y,pivot:P,center:k,vel:I,spin:_,samples:y.samplePoints(),stroke:this.stroke?.id??-1})});const w=d.clone().add(new g(0,t.height*m*.5,0));for(let y=0;y<7;y++){const x=new Ut({color:v.clone().offsetHSL(0,0,Math.random()*.12),roughness:.1,transparent:!0,opacity:.85,emissive:v,emissiveIntensity:.18});this.materials.push(x);const M=new H(this.dropGeometry,x),k=(.035+Math.random()*.04)*m*1.4;M.scale.setScalar(k),M.position.copy(w),this.top.add(M);const P=Math.random()*Math.PI*2;this.drops.push({mesh:M,vel:new g(Math.cos(P)*1.2,2.2+Math.random()*1.8,Math.sin(P)*1.2),t:0,size:k})}}hitTree(t){let s=null;for(const e of this.island.trees){const o=this.chops.get(e);if(o&&o.phase!=="stand")continue;const i=t.intersectObject(e.root,!0)[0];i&&(!s||i.distance<s.distance)&&(s={tree:e,point:this.top.worldToLocal(i.point.clone()),distance:i.distance})}return s}chop(t,s,e){let o=this.chops.get(t);if(o||(o={tree:t,hits:0,shake:0,shakeVel:0,axis:new g(1,0,0),fall:0,fallVel:0,phase:"stand",t:0,base:t.root.quaternion.clone()},this.chops.set(t,o)),o.phase!=="stand")return;o.hits+=1;const i=this.top.worldToLocal(e.clone()),a=new g(t.x-i.x,0,t.z-i.z).normalize();o.axis.set(a.z,0,-a.x),o.shakeVel+=3.2,this.burstLeaves(t,10+o.hits*4),o.hits>=3&&(o.phase="fall",o.fall=0,o.fallVel=.4,o.t=0)}burstLeaves(t,s){const e=Xa[t.kind];for(let o=0;o<s;o++){const i=new Ut({color:e.clone().offsetHSL(0,0,(Math.random()-.5)*.15),roughness:.8});this.materials.push(i);const a=new H(this.leafGeometry,i);a.scale.set(.09,.03,.06);const n=Math.random()*Math.PI*2;a.position.set(t.x+Math.cos(n)*.6,Xt(t.x,t.z)+t.height*(.55+Math.random()*.35),t.z+Math.sin(n)*.6),this.top.add(a),this.leaves.push({mesh:a,vel:new g(Math.cos(n)*(.6+Math.random()),1+Math.random()*1.6,Math.sin(n)*(.6+Math.random())),t:0,life:1.6+Math.random()*.8,spin:Math.random()*8-4})}}update(t,s){this.clock+=t,this.updateHand(t,s);for(let o=this.splits.length-1;o>=0;o--)this.updateSplit(this.splits[o],t,s)&&this.splits.splice(o,1);for(let o=this.drops.length-1;o>=0;o--){const i=this.drops[o];i.t+=t,i.vel.y-=yi*t,i.mesh.position.addScaledVector(i.vel,t);const a=Math.max(Xt(i.mesh.position.x,i.mesh.position.z),0)+i.size*.4;if(i.mesh.position.y<a&&(i.mesh.position.y=a,i.vel.set(0,0,0),i.mesh.scale.set(i.size*1.5,i.size*.4,i.size*1.5)),i.t>1.1){const n=Math.max(.001,1-(i.t-1.1)/.4);i.mesh.scale.set(i.size*1.5*n,i.size*.4*n,i.size*1.5*n),i.t>1.5&&(this.top.remove(i.mesh),i.mesh.material.dispose(),this.drops.splice(o,1))}}for(let o=this.leaves.length-1;o>=0;o--){const i=this.leaves[o];i.t+=t,i.vel.y-=3.2*t,i.vel.x+=Math.sin(s*2+o)*t*.8,i.mesh.position.addScaledVector(i.vel,t),i.mesh.rotation.x+=i.spin*t,i.mesh.rotation.y+=i.spin*.7*t;const a=Xt(i.mesh.position.x,i.mesh.position.z)+.03;if(i.mesh.position.y<a&&(i.mesh.position.y=a,i.vel.set(0,0,0),i.spin=0),i.t>i.life){const n=1-(i.t-i.life)/.5,c=Math.max(.001,n)*(i.size??1);i.mesh.scale.set(.09*c,.03*c,.06*c),n<=0&&(this.top.remove(i.mesh),i.mesh.material.dispose(),this.leaves.splice(o,1))}}for(const o of this.chops.values())this.updateChop(o,t);this.propCuts.update(t);const e=this.top.children.find(o=>o.name==="model-windmill");e&&(this.island.blades.visible=!this.propCuts.isCut(e));for(const[o,i]of this.moods){if(i-t>0){this.moods.set(o,i-t);continue}this.moods.delete(o),o.uniforms.uMood.value=0}for(const o of this.wobbles.values()){o.v+=(-o.s*150-o.v*8)*t,o.s+=o.v*t;const{object:i,base:a,s:n}=o;i.scale.set(a.x*(1-n*.5),a.y*(1+n),a.z*(1-n*.5)),Math.abs(n)<.002&&Math.abs(o.v)<.02&&(i.scale.copy(a),this.wobbles.delete(i))}}setMood(t,s,e){t.face&&(t.uniforms.uMood.value=s,this.moods.set(t,e))}propHit(t){const s=this.propTargets().filter(a=>!this.propCuts.isCut(a));if(!s.length)return null;const e=a=>{for(let n=a;n;n=n.parent)if(!n.visible)return!1;return!0},o=t.intersectObjects(s,!0).find(a=>a.object.isMesh&&e(a.object));if(!o)return null;const i=new Set(s);for(let a=o.object;a;a=a.parent)if(i.has(a))return{root:a,point:o.point.clone()};return null}touchProp(t,s){this.wobble(t,.3),this.chips(this.top.worldToLocal(s.clone()),this.chipColor(t),6)}chipColor(t){const s=t===this.island.blades?"blades":t===this.island.boat?"boat":t.name;return ur.find(([e])=>e.test(s))?.[1]||"#f1e2c4"}cutProp(t,s,e,o){const i=new g().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new g().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize();const a=this.wobbles.get(t);a&&(t.scale.copy(a.base),this.wobbles.delete(t));const n=this.island,r=t===n.blades?{kind:"drift",inner:"#efd9a8",tilt:.5,push:.12,sink:.2}:t===n.boat?{kind:"drift",inner:"#f4e3c4",tilt:.45,push:.14,sink:.12}:t===n.ball?{kind:"drift",inner:"#fff6e0",tilt:.7,push:.16}:t===n.bottle?{kind:"drift",inner:null,tilt:.6,push:.16}:t===n.pier?{kind:"drift",inner:"#d9b17f",tilt:.28,push:.035,sink:.05}:t.name.startsWith("gull-")?{kind:"drop",inner:"#ffb3c1",tilt:0,push:.2,respawn:6.5}:t.name.startsWith("creature-")?{kind:"drift",inner:"#ffb3c1",tilt:.35,push:.12}:hr.find(([h])=>h.test(t.name))?.[1]||{kind:"fall",inner:"#f3dfbf",tilt:.8,push:.08};if(!this.propCuts.cut(t,new to().setFromNormalAndCoplanarPoint(i,o),r))return;const c=new po().setFromObject(t).getCenter(new g);this.chips(this.top.worldToLocal(c),this.chipColor(t),12),r.kind==="drop"&&this.feathers(c,9)}feathers(t,s){for(let e=0;e<s;e++){const o=new Ut({color:new W("#ffffff").offsetHSL(0,0,-Math.random()*.1),roughness:.75});this.materials.push(o);const i=new H(this.leafGeometry,o),a=1.6+Math.random()*.6;i.scale.set(.09*a,.03*a,.06*a),i.position.copy(t),this.top.add(i);const n=Math.random()*Math.PI*2;this.leaves.push({mesh:i,vel:new g(Math.cos(n)*(.6+Math.random()),.8+Math.random()*1.4,Math.sin(n)*(.6+Math.random())),t:0,life:2+Math.random()*.8,spin:Math.random()*8-4,size:a})}}splash(t,s){s&&this.island.ripple(t.x,t.z,1.1),this.chips(this.top.worldToLocal(t.clone()),s?"#e6fbff":"#f4f7fb",s?9:5)}wobble(t,s){let e=this.wobbles.get(t);e||(e={object:t,base:t.scale.clone(),s:0,v:0},this.wobbles.set(t,e)),e.v-=s*8}chips(t,s,e){const o=new W(s);for(let i=0;i<e;i++){const a=new Ut({color:o.clone().offsetHSL(0,0,(Math.random()-.5)*.18),roughness:.7});this.materials.push(a);const n=new H(this.leafGeometry,a),r=.035+Math.random()*.04;n.scale.setScalar(r),n.position.copy(t),n.rotation.set(Math.random()*6,Math.random()*6,0),this.top.add(n);const c=Math.random()*Math.PI*2;this.drops.push({mesh:n,vel:new g(Math.cos(c)*(.8+Math.random()),1.8+Math.random()*1.8,Math.sin(c)*(.8+Math.random())),t:0,size:r})}}updateSplit(t,s,e){t.t+=s;const o=t.t>2.8;if(o)for(const r of t.pieces)r.body.uniforms.uMood.value=1;const i=t.scale,a=new g;for(const r of t.pieces){const c=r.pivot;if(r.body.update(s,e),o){const m=t.origin.clone().add(r.center.clone().multiplyScalar(i).applyQuaternion(t.quat)),f=1-Math.exp(-s*7);c.position.lerp(m,f),c.quaternion.slerp(t.quat,f);continue}r.vel.y-=yi*s,c.position.addScaledVector(r.vel,s);const h=r.spin.length()*s;h>1e-5&&c.quaternion.premultiply(new be().setFromAxisAngle(a.copy(r.spin).normalize(),h));let u=1/0;for(const m of r.samples)a.copy(m).sub(r.center).multiplyScalar(i).applyQuaternion(c.quaternion).add(c.position),u=Math.min(u,a.y-Math.max(Xt(a.x,a.z),0));if(u<0){c.position.y-=u,r.vel.y<-1.2?(r.body.land(-r.vel.y*1.4),r.vel.y*=-.28):r.vel.y=Math.max(0,r.vel.y);const m=Math.exp(-s*7);r.vel.x*=m,r.vel.z*=m,r.spin.multiplyScalar(Math.exp(-s*9))}else r.spin.multiplyScalar(Math.exp(-s*1.5))}if(t.t<3.5)return!1;for(const r of t.pieces)this.top.remove(r.pivot),r.body.dispose();const n=t.walker;return n.jelly.group.visible=!0,n.frozen=!1,n.jelly.land(6),this.setMood(n.jelly,1,1.6),!0}updateHand(t,s){const e=this.handGoal,o=this.armed&&e?1:0;if(this.handShown+=(o-this.handShown)*(1-Math.exp(-t*12)),this.handShown<.02&&!o){this.hand.visible=!1,this.trail.visible=!1,this.trailPoints.length=0;return}let i=0;if(e&&this.fly>=0){this.fly+=t;const d=Math.min(1,this.fly/lr);this.handNdc.lerpVectors(this.flyFrom,e.ndc,cr(d)),this.handNdc.y+=Math.sin(Math.PI*d)*.16,i=(1-d)*(1-d)*Math.PI*2,this.handMotion.set(0,0),d>=1&&(this.fly=-1)}else if(e){const d=this.handNdc.clone();e.rest?this.handNdc.lerp(e.ndc,1-Math.exp(-t*6)):this.handNdc.copy(e.ndc);const p=this.camera.aspect,v=new bt((this.handNdc.x-d.x)*p,this.handNdc.y-d.y).divideScalar(Math.max(t,1/240));this.handMotion.lerp(v,1-Math.exp(-t*14))}const a=this.handNdc.clone();e?.rest&&(a.y+=Math.sin(s*1.8)*.012);const n=this.handMotion.length();let r=e?.home?-.08:-.62;n>.6&&!e?.home&&(r=Math.atan2(this.handMotion.y,this.handMotion.x),Math.cos(r)<-.25&&(r+=Math.PI));let c=r-this.handRoll;c=Math.atan2(Math.sin(c),Math.cos(c)),this.handRoll+=c*(1-Math.exp(-t*(n>.6?16:6))),this.handDip+=((e?.down||e?.home?1:0)-this.handDip)*(1-Math.exp(-t*14));const h=this.rayAt(a),u=this.camera,m=2*_o*Math.tan(u.fov*Math.PI/360)/Math.max(1,this.viewHeight),f=Math.min(170,Math.max(88,Math.min(this.viewHeight*.2,this.viewHeight*u.aspect*.32)));this.hand.visible=!0,this.hand.position.copy(h.origin).addScaledVector(h.direction,_o),this.hand.quaternion.copy(u.quaternion),this.hand.rotateZ(this.handRoll+i),this.hand.rotateX(.55-this.handDip*.35),this.hand.scale.setScalar(f*m/rr*(.9+this.handShown*.1)*Math.max(.001,this.handShown)),this.updateTrail(m)}rayAt(t){const s=new g().setFromMatrixPosition(this.camera.matrixWorld),e=new g(t.x,t.y,.5).unproject(this.camera).sub(s).normalize();return{origin:s,direction:e}}updateTrail(t){for(;this.trailPoints.length&&this.clock-this.trailPoints[0].t>xi;)this.trailPoints.shift();const s=this.trailPoints;if(s.length<2){this.trail.visible=!1;return}this.trail.visible=!0;const e=new g().setFromMatrixColumn(this.camera.matrixWorld,0),o=new g().setFromMatrixColumn(this.camera.matrixWorld,1),i=s.map(c=>{const h=this.rayAt(c.ndc);return h.origin.addScaledVector(h.direction,_o+.05)}),a=new W("#fff4fb"),n=this.camera.aspect;for(let c=0;c<Ts;c++){const h=Math.min(c,i.length-1),u=i[h],m=s[Math.max(0,h-1)].ndc,f=s[Math.min(s.length-1,h+1)].ndc,d=new bt((f.x-m.x)*n,f.y-m.y);d.lengthSq()<1e-10&&d.set(1,0),d.normalize();const p=(this.clock-s[h].t)/xi,v=Math.max(0,1-p)*(h/Math.max(1,i.length-1)),w=t*9*v,y=e.clone().multiplyScalar(-d.y*w).addScaledVector(o,d.x*w),x=u.clone().add(y),M=u.clone().sub(y);this.trailPositions.set([x.x,x.y,x.z,M.x,M.y,M.z],c*6);const k=a.clone().multiplyScalar(v*.9);this.trailColors.set([k.r,k.g,k.b,k.r,k.g,k.b],c*6)}const r=this.trail.geometry;r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}updateChop(t,s){const e=t.tree.root;if(t.t+=s,t.phase==="stand")t.shakeVel+=(-t.shake*60-t.shakeVel*7)*s,t.shake+=t.shakeVel*s,e.quaternion.copy(t.base).premultiply(new be().setFromAxisAngle(t.axis,t.shake*.12));else if(t.phase==="fall")t.fallVel+=(2.4+t.fall*6)*s,t.fall+=t.fallVel*s,t.fall>=Math.PI/2-.08&&(t.fall=Math.PI/2-.08,t.fallVel*=-.25,Math.abs(t.fallVel)<.15&&(t.phase="down",t.t=0,this.burstLeaves(t.tree,18))),e.quaternion.copy(t.base).premultiply(new be().setFromAxisAngle(t.axis,t.fall));else if(t.phase==="down")t.t>Xe&&(t.phase="shrink",t.t=0);else if(t.phase==="shrink"){const o=Math.min(1,t.t/.5);e.scale.setScalar(t.tree.scale*Math.max(.001,1-o)),o>=1&&(t.phase="grow",t.t=0,e.quaternion.copy(t.base))}else if(t.phase==="grow"){const o=Math.min(1,t.t/1.8),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.scale.setScalar(t.tree.scale*Math.max(.001,i)),o>=1&&this.chops.delete(t.tree)}}get pieces(){return this.splits.reduce((t,s)=>t+s.pieces.length,0)}get propsCut(){return this.propCuts.count}dispose(){this.propCuts.dispose(),this.scene.remove(this.hand,this.trail);for(const t of this.splits)for(const s of t.pieces)this.top.remove(s.pivot),s.body.dispose();for(const t of this.materials)t.dispose();this.hand.traverse(t=>{t.geometry?.dispose()}),this.trail.geometry.dispose(),this.dropGeometry.dispose(),this.leafGeometry.dispose()}}const Hs="none";function fr(l,t=!1){const s=new mt;s.name=t?"knife-hand":"knife";const e=new Ut({color:"#eef3fb",metalness:.7,roughness:.2,emissive:"#cfdcff",emissiveIntensity:t?.32:.18,fog:!t}),o=new Ut({color:"#ffffff",metalness:.4,roughness:.1,emissive:"#ffffff",emissiveIntensity:.45,fog:!t}),i=new Ut({color:"#f2c14e",metalness:.6,roughness:.3,fog:!t}),a=new Ut({color:"#ff8fb1",roughness:.45,emissive:"#ff5f95",emissiveIntensity:.12,fog:!t}),n=new Ut({color:"#fff1d6",roughness:.35,fog:!t});l.push(e,o,i,a,n);const r=new Lo;r.moveTo(-.06,.56),r.lineTo(-.06,.16),r.quadraticCurveTo(-.055,.04,.012,0),r.quadraticCurveTo(.085,.16,.08,.56),r.closePath();const c=new Vo(r,{depth:.016,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:10});c.translate(0,0,-.008);const h=new H(new yt(.006,.006,.42,6),o);h.position.set(.05,.34,.018),h.rotation.z=.03;const u=[[new H(c,e),0],[h,0],[new H(new kt(.2,.05,.07,2,.022),i),.585],[new H(new kt(.13,.36,.075,3,.05),a),.79]];for(const[m,f]of u)m.position.y+=f,m.castShadow=!t,s.add(m);for(const m of[.71,.86]){const f=new H(new ot(.018,10,8),n);f.position.set(0,m,.04),s.add(f)}return t&&s.traverse(m=>{m.renderOrder=31}),s}function Yo(l){return 9.9+Math.max(0,-3.2-l)*.115+1.1}const no=-.55,ro=-1.6,sa=-51,pr=l=>l<.5?2*l*l:1-(-2*l+2)**2/2;function $e(l,t=new g,s=new g){const e=Math.min(1,Math.max(0,l)),o=ro+(sa-ro)*pr(e),i=no+1.75*e,a=Yo(o)+8.2+2.2*e;t.set(Math.sin(i)*a,o,Math.cos(i)*a);const n=Math.cos(i),r=-Math.sin(i),c=-Math.sin(i),h=-Math.cos(i),u=9+3*e,m=3.4-1.6*e;return s.set(t.x+n*u+c*m,o-2.2-3.2*e*e,t.z+r*u+h*m),{position:t,target:s}}function He(l,t,s,e){const{position:o,target:i}=$e(l),a=i.clone().sub(o).setY(0).normalize(),n=new g(-a.z,0,a.x);return o.clone().addScaledVector(a,t).addScaledVector(n,s).setY(o.y+e)}const vs=2048,ls=2.1;class lo{mesh;count;pos;vel;scale;fear;cellOf;cellStart=new Int32Array(vs+1);fill=new Int32Array(vs);sorted;goal=new g;options;phase;m=new Ne;fwd=new g;side=new g;upv=new g;at=new g;static UP=new g(0,1,0);constructor(t,s,e){this.options=e,this.count=e.count;const o=De(e.seed);this.phase=o()*10;const i=t.clone(),a=new Float32Array(this.count);this.mesh=new Qe(i,s,this.count),this.mesh.frustumCulled=!1,this.pos=new Float32Array(this.count*3),this.vel=new Float32Array(this.count*3),this.scale=new Float32Array(this.count),this.fear=new Float32Array(this.count),this.cellOf=new Int32Array(this.count),this.sorted=new Int32Array(this.count);const n=new W,{home:r}=e;for(let c=0;c<this.count;c++){const h=o()*Math.PI*2,u=Math.cbrt(o())*3.2;this.pos.set([r.x+Math.cos(h)*u,r.y+(o()-.5)*2.2,r.z+Math.sin(h)*u],c*3),this.vel.set([1.8+o()*.4,0,(o()-.5)*.6],c*3),this.scale[c]=e.size*(.8+o()*.4),a[c]=o()*20,n.set(e.colors[Math.floor(o()*e.colors.length)]).offsetHSL((o()-.5)*.03,0,(o()-.5)*.08),this.mesh.setColorAt(c,n)}i.setAttribute("aPhase",new us(a,1))}hash(t,s,e){const o=Math.floor(t/ls),i=Math.floor(s/ls),a=Math.floor(e/ls);return(o*73856093^i*19349663^a*83492791)>>>0&vs-1}bucket(){const t=this.cellStart;t.fill(0);for(let e=0;e<this.count;e++){const o=e*3,i=this.hash(this.pos[o],this.pos[o+1],this.pos[o+2]);this.cellOf[e]=i,t[i+1]++}for(let e=0;e<vs;e++)t[e+1]+=t[e];const s=this.fill;s.set(t.subarray(0,vs));for(let e=0;e<this.count;e++)this.sorted[s[this.cellOf[e]]++]=e}update(t,s,e){t=Math.min(t,1/24);const o=this.options,i=s*.14+this.phase;this.goal.set(o.home.x+Math.sin(i)*o.roam,o.home.y+Math.sin(i*1.9+1)*o.lift,o.home.z+Math.sin(i*2)*o.roam*.55),this.bucket();const a=ls,n=a*a,r=.95*.95,c=Math.cbrt(this.count)*.75;for(let h=0;h<this.count;h++){const u=h*3,m=this.pos[u],f=this.pos[u+1],d=this.pos[u+2];let p=0,v=0,w=0,y=0,x=0,M=0,k=0,P=0,T=0,F=0;const I=Math.floor(m/ls),_=Math.floor(f/ls),O=Math.floor(d/ls);for(let ct=-1;ct<=1;ct++)for(let Ft=-1;Ft<=1;Ft++)for(let Dt=-1;Dt<=1;Dt++){const At=((I+ct)*73856093^(_+Ft)*19349663^(O+Dt)*83492791)>>>0&vs-1;for(let Ht=this.cellStart[At],ve=this.cellStart[At+1];Ht<ve;Ht++){const Yt=this.sorted[Ht];if(Yt===h)continue;const St=Yt*3,zt=this.pos[St]-m,Wt=this.pos[St+1]-f,ee=this.pos[St+2]-d,se=zt*zt+Wt*Wt+ee*ee;if(!(se>n)){if(p+=zt,v+=Wt,w+=ee,y+=this.vel[St],x+=this.vel[St+1],M+=this.vel[St+2],F++,se<r){const L=1/Math.max(se,.01);k-=zt*L,P-=Wt*L,T-=ee*L}if(F>14)break}}}let V=this.vel[u],N=this.vel[u+1],R=this.vel[u+2],X=0,$=0,nt=0;F&&(X+=p/F*.3+(y/F-V)*1.1,$+=v/F*.3+(x/F-N)*1.1,nt+=w/F*.3+(M/F-R)*1.1),X+=k*.45,$+=P*.45,nt+=T*.45;const ut=this.goal.x-m,ft=this.goal.y-f,wt=this.goal.z-d,G=Math.hypot(ut,ft,wt)||1,et=Math.min(2.6,Math.max(0,G-c)*.35+.35);X+=ut/G*et,$+=ft/G*et,nt+=wt/G*et;let q=this.fear[h]*Math.exp(-t*1.6);if(e&&e.strength>0){const ct=m-e.origin.x,Ft=f-e.origin.y,Dt=d-e.origin.z,At=ct*e.dir.x+Ft*e.dir.y+Dt*e.dir.z;if(At>0){const Ht=ct-e.dir.x*At,ve=Ft-e.dir.y*At,Yt=Dt-e.dir.z*At,St=Math.hypot(Ht,ve,Yt),zt=2.4+At*.06;if(St<zt){const Wt=(1-St/zt)*16*e.strength/Math.max(St,.25);X+=Ht*Wt,$+=ve*Wt*.7,nt+=Yt*Wt,q=Math.max(q,(1-St/zt)*e.strength)}}}this.fear[h]=q;const J=o.floor(m,d)+.7;f<J+.4&&($+=(J+.4-f)*7),f>o.ceiling&&($-=(f-o.ceiling)*5);const st=Math.hypot(m,d),gt=o.column(Math.atan2(d,m),f)+1.3;if(st<gt){const ct=(gt-st)*6/Math.max(st,.5);X+=m*ct,nt+=d*ct}V+=X*t*2.4,N+=$*t*2.4,R+=nt*t*2.4,N*=Math.exp(-1.4*t);const vt=Math.hypot(V,N,R)||1,jt=Math.min(Math.max(vt,1.5),3.1+q*5);V*=jt/vt,N*=jt/vt,R*=jt/vt,this.vel[u]=V,this.vel[u+1]=N,this.vel[u+2]=R,this.pos[u]=m+V*t,this.pos[u+1]=Math.max(J-.3,f+N*t),this.pos[u+2]=d+R*t,this.fwd.set(V,N*.55,R).normalize(),this.side.crossVectors(this.fwd,lo.UP).normalize(),this.upv.crossVectors(this.side,this.fwd);const Mt=this.scale[h];this.m.makeBasis(this.fwd.multiplyScalar(Mt),this.upv.multiplyScalar(Mt),this.side.multiplyScalar(Mt)),this.m.setPosition(this.at.set(this.pos[u],this.pos[u+1],this.pos[u+2])),this.mesh.setMatrixAt(h,this.m)}this.mesh.instanceMatrix.needsUpdate=!0}stats(t){t.set(0,0,0);for(let e=0;e<this.count;e++)t.add(this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]));t.multiplyScalar(1/Math.max(1,this.count));let s=0;for(let e=0;e<this.count;e++)s+=this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]).distanceTo(t);return{center:t,spread:s/Math.max(1,this.count)}}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}class oa{materials=[];geometries=[];textures=[];mat(t,s={}){const e=new Ut({color:t,roughness:.55,metalness:0,...s});return this.materials.push(e),e}geo(t){return this.geometries.push(t),t}mesh(t,s,e={}){const o=new H(t,s);return e.p&&o.position.set(...e.p),e.s!==void 0&&(typeof e.s=="number"?o.scale.setScalar(e.s):o.scale.set(...e.s)),e.r&&o.rotation.set(...e.r),o}dispose(){this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose()),this.textures.forEach(t=>t.dispose())}}function $o(l,t,s,e,o,i={}){const a=l.geo(new ot(1,20,14)),n=l.mat("#21181d",{roughness:.25}),r=l.mat("#ffffff",{emissive:"#ffffff",emissiveIntensity:i.shine??.8}),c=i.iris?l.mat(i.iris,{roughness:.25,emissive:i.iris,emissiveIntensity:.25}):null,h=new be().setFromUnitVectors(new g(0,0,1),o.clone().normalize()),u=[];for(const m of e){const f=new mt;f.position.copy(m),f.quaternion.copy(h),f.add(l.mesh(a,n,{s:[s*.85,s*1.1,s*.45]})),c&&f.add(l.mesh(a,c,{p:[0,-s*.42,s*.12],s:[s*.6,s*.4,s*.36]})),f.add(l.mesh(a,r,{p:[-s*.28,s*.38,s*.38],s:s*.3})),f.add(l.mesh(a,r,{p:[s*.25,-s*.3,s*.38],s:s*.14})),t.add(f),u.push(f)}return u}const mr=(l,t=0)=>{const s=(l+t)%4.2;return s<.14?1-Math.sin(s/.14*Math.PI)*.9:1};function gr(){const l=new oa,t=new mt;t.name="cute-turtle";const s=l.mat("#7cca5c"),e=l.mat("#f4cf6c"),o=l.mat("#ff9fb3",{transparent:!0,opacity:.75});o.userData.seeThrough=!0;const i=l.mat("#3a2a22",{roughness:.3}),a=l.geo(new ot(1,28,20)),n=l.geo(new ot(1,64,40)),r=[new g(0,1,0)];for(let _=0;_<6;_++)r.push(new g(Math.cos(_*Math.PI/3)*Math.cos(.85),Math.sin(.85),Math.sin(_*Math.PI/3)*Math.cos(.85)));for(let _=0;_<10;_++)r.push(new g(Math.cos(_*Math.PI/5+.3)*Math.cos(.25),Math.sin(.25),Math.sin(_*Math.PI/5+.3)*Math.cos(.25)));const c=[],h=new W("#c27843"),u=new W("#a65e30"),m=new W("#6f3c1d"),f=n.getAttribute("position"),d=new g;for(let _=0;_<f.count;_++){d.fromBufferAttribute(f,_).normalize();let O=-2,V=-2;for(const X of r){const $=d.dot(X);$>O?(V=O,O=$):$>V&&(V=$)}const N=O-V,R=N<.035?m:u.clone().lerp(h,Math.min(1,N*6));c.push(R.r,R.g,R.b)}n.setAttribute("color",new Fs(c,3));const p=l.mesh(n,l.mat("#ffffff",{vertexColors:!0,roughness:.5}),{p:[-.12,.14,0],s:[.86,.64,.78]}),v=l.mesh(l.geo(new ds(.86,.09,10,36)),l.mat("#93502a"),{p:[-.1,.01,0],r:[Math.PI/2,0,0],s:[.98,.91,1]}),w=l.mesh(a,e,{p:[-.07,-.05,0],s:[.84,.22,.73]}),y=.6,x=new mt;x.position.set(1,.3,0),x.add(l.mesh(a,s,{s:[y,y*.96,y*1.02]}));const M=(_,O,V,N=y*.95)=>new g(_,O,V).normalize().multiplyScalar(N),k=$o(l,x,.15,[M(.86,.1,.44),M(.86,.1,-.44)],new g(1,.1,0),{iris:"#8a5a3c",shine:.6});x.add(l.mesh(a,o,{p:M(.6,-.18,.76).toArray(),s:[.05,.065,.12],r:[0,-.9,0]})),x.add(l.mesh(a,o,{p:M(.6,-.18,-.76).toArray(),s:[.05,.065,.12],r:[0,.9,0]}));const P=l.mesh(l.geo(new ds(.08,.02,8,18,Math.PI)),i,{p:M(.97,-.24,0,y*.99).toArray(),r:[0,Math.PI/2,Math.PI]});x.add(P);const T=l.mesh(a,s,{p:[.62,.14,0],s:[.3,.26,.28]}),F=[];for(const _ of[-1,1]){const O=l.mesh(a,s,{p:[.38,-.1,_*.6],s:[.22,.09,.36],r:[0,_*.45,0]}),V=l.mesh(a,s,{p:[-.56,-.1,_*.45],s:[.16,.08,.23],r:[0,-_*.5,0]});F.push([O,_],[V,_*.5]),t.add(O,V)}const I=l.mesh(l.geo(new ke(.1,.3,12)),s,{p:[-.84,-.02,0],r:[0,0,Math.PI/2]});return t.add(p,v,w,x,T,I),t.traverse(_=>{_.isMesh&&(_.castShadow=!0)}),{root:t,materials:l.materials,animate:_=>{for(const[V,N]of F)V.rotation.x=Math.sin(_*2.2+(N>0?0:.4))*.45*Math.sign(N)*(Math.abs(N)>.6?1:.6);x.position.y=.3+Math.sin(_*1.6)*.035,x.rotation.set(Math.sin(_*.7)*.14,Math.sin(_*.43)*.18,Math.sin(_*.9)*.08);const O=mr(_);for(const V of k)V.scale.y=O},dispose:()=>l.dispose()}}const vr=`
uniform float uOctoTime;
uniform float uOctoWave;
vec3 octoDeform(vec3 p) {
  float r = length(p.xz);
  float a = atan(p.z, p.x);
  float arm = smoothstep(0.25, 0.95, r) * smoothstep(0.2, -0.45, p.y);
  float speed = 1.6 + uOctoWave * 4.0;
  p.y += sin(uOctoTime * speed - r * 5.0 + a * 3.0) * (0.1 + uOctoWave * 0.16) * arm;
  float swirl = sin(uOctoTime * speed * 0.6 + a * 2.0 - r * 3.0) * (0.06 + uOctoWave * 0.12) * arm;
  float c = cos(swirl), s = sin(swirl);
  p.xz = mat2(c, -s, s, c) * p.xz;
  float top = smoothstep(-0.3, 0.7, p.y);
  float jiggle = sin(uOctoTime * 18.0) * uOctoWave * uOctoWave * 0.1 + sin(uOctoTime * 1.3) * 0.015;
  p.xz *= 1.0 + jiggle * top;
  p.y -= jiggle * top * 0.6 * (p.y + 0.3);
  return p;
}
`;let qs=null;function Io(){if(qs)return qs;const l=document.createElement("canvas");l.width=l.height=128;const t=l.getContext("2d"),s=t.createRadialGradient(64,64,0,64,64,64);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.25,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,128,128),qs=new ho(l),qs}function wr(l,t){const s=new oa,e=new mt;e.name="sea-friends";const o=s.geo(new ot(1,28,20)),i=L=>{L.rotation.y=Math.atan2(t.x-L.position.x,t.z-L.position.z)},a=new Map,n=L=>{const Q=a.get(L);a.set(L,{t:0,base:Q?.base||L.scale.clone()})},r=new mt;r.name="shipwreck";{const L=s.geo(new ot(1,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2)),Q=[],rt=L.getAttribute("position"),Pt=new W("#8a5a36"),xt=new W("#6b4329");for(let ht=0;ht<rt.count;ht++){const Kt=Math.floor((rt.getY(ht)+1)*7)%2?Pt:xt;Q.push(Kt.r,Kt.g,Kt.b)}L.setAttribute("color",new Fs(Q,3));const Et=s.mesh(L,s.mat("#ffffff",{vertexColors:!0,side:te,roughness:.8}),{s:[1.5,1.1,3.4]}),_t=s.mesh(s.geo(new yt(1,1,.08,32)),s.mat("#a7764a",{roughness:.85}),{p:[0,-.12,0],s:[1.4,1,3.25]}),oe=s.mesh(o,s.mat("#2a1a10",{roughness:1}),{p:[1.38,-.45,.6],s:[.12,.32,.42]}),Ct=s.mesh(s.geo(new yt(.1,.13,3.2,10)),s.mat("#7a4c2c"),{p:[0,1.4,.4],r:[.25,0,-.35]}),Lt=s.mesh(s.geo(new yt(.06,.06,2.2,8)),s.mat("#7a4c2c"),{p:[-.45,2.3,.75],r:[.25,0,Math.PI/2-.35]}),Vt=s.geo(new Ee(1.8,1.5,10,8)),Z=Vt.getAttribute("position");for(let ht=0;ht<Z.count;ht++){const Kt=Z.getX(ht),ne=Z.getY(ht);Z.setZ(ht,Math.sin(Kt*2.4)*.12+Math.cos(ne*3)*.06),ne<-.6&&Z.setY(ht,ne+Math.abs(Math.sin(Kt*9))*.35)}Vt.computeVertexNormals();const Ot=s.mesh(Vt,s.mat("#efe2c2",{side:te,roughness:.9}),{p:[-.35,1.5,.62],r:[.25,0,-.35]}),Zt=s.mesh(s.geo(new Ee(.6,.38)),s.mat("#2b2b38",{side:te}),{p:[.65,2.8,.9],r:[.25,0,-.35]});r.add(Et,_t,oe,Ct,Lt,Ot,Zt),r.position.copy(l(24,.5)).add(new g(0,.55,0)),r.rotation.set(.12,.9,.32)}e.add(r);const c=new mt;c.name="treasure";const h=ea();s.geo(h.base),s.geo(h.lid);const u=s.mat("#ffffff",{vertexColors:!0,roughness:.6}),m=new H(h.base,u),f=new H(h.lid,u);f.position.set(0,.46,-.29),f.rotation.x=-1.6,m.add(f),m.scale.setScalar(1.6),c.add(m);const d=s.mat("#f6c444",{metalness:.65,roughness:.28,emissive:"#7a5200",emissiveIntensity:.35}),p=new Qe(s.geo(new yt(.13,.13,.035,18)),d,34),v=new ps;for(let L=0;L<p.count;L++){const Q=L<12,rt=L*2.4,Pt=Q?.08+L%4*.12:.9+L%6*.22;v.position.set(Q?(L%4-1.5)*.28:Math.cos(rt)*Pt+.6,Q?.78+Math.floor(L/4)*.05:.03+L%3*.03,Q?(Math.floor(L/4)-1)*.2:Math.sin(rt)*Pt*.6),v.rotation.set(Q?.3:L%5*.3,rt,Q?.2:L%4*.2),v.scale.setScalar(1),v.updateMatrix(),p.setMatrixAt(L,v.matrix)}c.add(p);const w=new Ys({map:Io(),color:"#ffd76a",blending:he,depthWrite:!1,transparent:!0,opacity:.7});s.materials.push(w);const y=new $s(w);y.position.set(0,1.1,0),y.scale.setScalar(2.6),c.add(y),c.position.copy(l(12,-2.2)),i(c),c.rotation.y+=.5,e.add(c);let x=-1.6;const M=new mt;M.name="octopus";const k=s.mat("#ec86b8",{roughness:.45}),P=new mt;P.position.y=2.1,P.add(s.mesh(o,k,{s:[1.15,1.3,1.1]})),P.add(s.mesh(o,s.mat("#f7b6d6"),{p:[0,-.35,.95],s:[.62,.38,.22]})),$o(s,P,.2,[new g(.42,.05,.95),new g(-.42,.05,.95)],new g(0,.05,1)),P.add(s.mesh(s.geo(new ds(.1,.045,10,20)),s.mat("#9c3d6f"),{p:[0,-.38,1.1]}));for(const L of[-1,1])P.add(s.mesh(o,s.mat("#ff8fa8",{transparent:!0,opacity:.7}),{p:[L*.7,-.25,.82],s:[.2,.11,.08]}));for(const[L,Q,rt,Pt]of[[.5,.85,.55,.12],[-.3,1,.6,.09],[.15,1.15,.3,.07]])P.add(s.mesh(o,s.mat("#f7b6d6"),{p:[L,Q,rt],s:Pt}));const T=s.mesh(s.geo(new Ni(1,1)),s.mat("#7c8f9c",{flatShading:!0,roughness:.9}),{p:[0,.35,0],s:[1.5,.7,1.3]}),F=8,I=12,_=new Qe(o,k,F*I);_.frustumCulled=!1,M.add(T,P,_);const O=l(17.5,-5.2),V=l(17.5,-2.1);let N=-1;const R=L=>{if(Math.abs(L-N)<.01)return;N=L;const Q=Math.min(1,Math.max(0,(1.1-L)/.55));M.position.lerpVectors(O,V,Q),i(M),M.rotation.y+=.25,M.scale.setScalar(1.15-Q*.2)};R(16/9),e.add(M);let X=0;const $={value:0},nt={value:0};let ut=null,ft=!1;qi("octopus").then(L=>{if(ft){L.geometry.dispose(),L.map.dispose(),L.normalMap?.dispose();return}s.geo(L.geometry);const Q=s.mat("#ffffff",{map:L.map,normalMap:L.normalMap,roughness:.5,emissive:"#ffffff",emissiveMap:L.map,emissiveIntensity:.28});s.textures.push(L.map,...L.normalMap?[L.normalMap]:[]),L.normalMap&&Q.normalScale.set(.6,.6),Q.onBeforeCompile=xt=>{xt.uniforms.uOctoTime=$,xt.uniforms.uOctoWave=nt,xt.vertexShader=xt.vertexShader.replace("#include <common>",`#include <common>
${vr}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed = octoDeform(position);`)},Q.customProgramCacheKey=()=>"larch-sea-octopus";const rt=new H(L.geometry,Q);rt.name="octopus-model",rt.castShadow=!0;const Pt=Xi(L,2.6);rt.scale.copy(L.extent).multiplyScalar(Pt),rt.position.y=1+L.extent.y*Pt,rt.rotation.y=-Math.PI/2,M.add(rt),M.remove(P,_),ut=rt}).catch(L=>console.warn("[islandDive] octopus model failed, keeping the clay one",L instanceof Error?L.message:L));const wt=new mt;wt.name="pineapple-house";{const L=s.geo(new ot(1,40,30)),Q=[],rt=L.getAttribute("position"),Pt=new W("#f2a33a"),xt=new W("#b9661c"),Et=new W("#7a4a12");for(let Z=0;Z<rt.count;Z++){const Ot=rt.getX(Z),Zt=rt.getY(Z),ht=rt.getZ(Z),Kt=Math.atan2(ht,Ot)*5,ne=Zt*7,ie=Math.abs(Math.sin(Kt+ne)),Le=Math.abs(Math.sin(Kt-ne)),Qt=Math.min(ie,Le)<.16?xt:ie>.9&&Le>.9?Et:Pt;Q.push(Qt.r,Qt.g,Qt.b)}L.setAttribute("color",new Fs(Q,3)),wt.add(s.mesh(L,s.mat("#ffffff",{vertexColors:!0,roughness:.6}),{p:[0,1.5,0],s:[1.25,1.6,1.25]}));const _t=s.geo(new ot(1,12,10)),oe=s.mat("#4fae4d",{roughness:.6}),Ct=s.mat("#7cd06a",{roughness:.6});for(let Z=0;Z<9;Z++){const Ot=Z/9*Math.PI*2,Zt=Z%2?.7:.45,ht=new H(_t,Z%2?oe:Ct);ht.scale.set(.16,1.05,.06),ht.position.set(Math.cos(Ot)*.32,3.55+Z%2*.1,Math.sin(Ot)*.32),ht.rotation.set(Math.sin(Ot)*Zt,0,-Math.cos(Ot)*Zt,"XYZ"),wt.add(ht)}const Lt=s.mesh(s.geo(new yt(.36,.36,.1,24,1,!1,0,Math.PI)),s.mat("#8fc3d8"),{p:[0,.48,1.18],r:[Math.PI/2,0,Math.PI/2]}),Vt=s.mesh(s.geo(new Ee(.72,.4)),s.mat("#8fc3d8",{side:te}),{p:[0,.28,1.2]});wt.add(Lt,Vt);for(const[Z,Ot]of[[-.62,1.9],[.55,1.35]]){const Zt=s.mesh(s.geo(new ds(.22,.06,10,24)),s.mat("#9aa7b0",{metalness:.4,roughness:.35}),{p:[Z,Ot,1.14-Math.abs(Z)*.16],r:[0,Z*.4,0]}),ht=s.mesh(o,s.mat("#bfe8f5",{emissive:"#ffe9a8",emissiveIntensity:.25}),{p:[Z,Ot,1.1-Math.abs(Z)*.16],s:[.2,.2,.05],r:[0,Z*.4,0]});wt.add(Zt,ht)}wt.position.copy(l(28,8.5)),i(wt)}e.add(wt);const G=new mt;G.name="anglerfish";const et=s.mat("#34406f",{roughness:.4}),q=new mt;q.add(s.mesh(o,et,{s:[.95,.82,.78]})),q.add(s.mesh(o,s.mat("#7d8cc4"),{p:[.1,-.35,0],s:[.7,.42,.62]})),q.add(s.mesh(o,s.mat("#1a1530",{roughness:.8}),{p:[.78,-.18,0],s:[.2,.26,.42]}));const J=s.geo(new ke(.045,.12,6)),st=s.mat("#fffaf0");for(let L=0;L<5;L++)q.add(s.mesh(J,st,{p:[.92,-.02,-.26+L*.13],r:[Math.PI,0,0]}));$o(s,q,.13,[new g(.62,.28,.42),new g(.62,.28,-.42)],new g(.7,.1,0));const gt=s.geo(new ke(.35,.55,3)),vt=s.mesh(gt,et,{p:[-1,.05,0],r:[Math.PI/2,0,Math.PI/2],s:[1,1,.3]});for(const L of[-1,1])q.add(s.mesh(o,et,{p:[0,-.1,L*.75],s:[.28,.1,.2],r:[0,L*.6,0]}));q.add(vt);const jt=new da([new g(.3,.72,0),new g(.65,1.25,0),new g(1.15,1.38,0),new g(1.4,1.12,0)]);q.add(s.mesh(s.geo(new fa(jt,20,.035,6)),et));const Mt=s.mat("#fff1a8",{emissive:"#ffd84a",emissiveIntensity:1.6,roughness:.2}),ct=s.mesh(o,Mt,{p:[1.4,1,0],s:.15});q.add(ct);const Ft=new Ys({map:Io(),color:"#ffe27a",blending:he,depthWrite:!1,transparent:!0,opacity:1}),Dt=new Ys({map:Io(),color:"#ffcf5a",blending:he,depthWrite:!1,transparent:!0,opacity:.3});s.materials.push(Ft,Dt);const At=new $s(Ft);At.position.set(1.4,1,0),At.scale.setScalar(2.2);const Ht=new $s(Dt);Ht.position.set(1.2,.6,0),Ht.scale.setScalar(8),q.add(At,Ht),G.add(q);const ve=l(11,1.4).add(new g(0,3.3,0));G.position.copy(ve),G.scale.setScalar(.9),e.add(G);let Yt=!0,St=1;const zt=[[G,()=>{Yt=!Yt,n(q)}],[wt,()=>n(wt)],[M,()=>{X=1,n(ut||P)}],[c,()=>{x=x<-1?-.2:-1.6,n(m)}],[r,()=>n(r)]],Wt=L=>{if(!e.visible)return null;let Q=null;for(const[rt,Pt]of zt){const xt=L.intersectObject(rt,!0).find(Et=>!Et.object.isSprite);xt&&(!Q||xt.distance<Q.hit)&&(Q={hit:xt.distance,act:Pt,at:xt.point.clone()})}return Q},ee=new g,se={group:e,get lampOn(){return Yt},update(L,Q,rt,Pt){if(e.visible=Pt,!Pt)return;rt instanceof Jo&&R(rt.aspect);const xt=Q*.35;ee.set(Math.cos(xt)*1.6,Math.sin(Q*.8)*.35,Math.sin(xt)*1.1),G.position.copy(ve).add(ee),G.rotation.y=Math.atan2(-Math.cos(xt)*1.1,-Math.sin(xt)*1.6),vt.rotation.y=Math.sin(Q*5)*.35,St+=((Yt?1:0)-St)*(1-Math.exp(-L*8));const Et=.88+.12*Math.sin(Q*3.1)*Math.sin(Q*1.7);Ft.opacity=St*Et,Dt.opacity=St*.3*Et,Mt.emissiveIntensity=.05+St*1.6,X=Math.max(0,X-L*.5),$.value=Q,nt.value=X;const _t=1.4+X*3,oe=.28+X*.35;if(!ut)for(let Ct=0;Ct<F;Ct++){const Lt=Ct/F*Math.PI*2+.2;for(let Vt=0;Vt<I;Vt++){const Z=Vt/(I-1),Ot=Lt+Math.sin(Q*_t*.6+Ct+Z*2)*.35*Z,Zt=.75+Z*1.9;v.position.set(Math.cos(Ot)*Zt,1.25-Z*.55+Math.sin(Q*_t+Ct*1.3+Z*4)*oe*Z+Z*Z*.5,Math.sin(Ot)*Zt),v.scale.setScalar(.3*(1-Z*.72)),v.rotation.set(0,0,0),v.updateMatrix(),_.setMatrixAt(Ct*I+Vt,v.matrix)}}_.instanceMatrix.needsUpdate=!0,P.position.y=2.1+Math.sin(Q*1.2)*.08,f.rotation.x+=(x-f.rotation.x)*(1-Math.exp(-L*6)),w.opacity=.55+.2*Math.sin(Q*2.3);for(const[Ct,Lt]of a){Lt.t+=L;const Vt=Math.min(1,Lt.t/.9),Z=Math.sin(Vt*Math.PI*3)*Math.exp(-Vt*3.5)*.18;Ct.scale.set(Lt.base.x*(1+Z),Lt.base.y*(1-Z),Lt.base.z*(1+Z)),Vt>=1&&(Ct.scale.copy(Lt.base),a.delete(Ct))}},tap(L){const Q=Wt(L);return Q?(Q.act(),se.onBubbles?.(Q.at),!0):!1},hover:L=>!!Wt(L),dispose(){ft=!0,s.dispose(),e.removeFromParent()}};return se}const bi=6,yr=new g(1,0,0);function xr(l,t){const s=document.createElement("canvas"),e=s.getContext("2d"),o='"Huninn", "jf-openhuninn-2.0", ui-rounded, "Noto Sans TC", "PingFang TC", sans-serif',i=512,a=30,n=i-a*2;e.font=`600 34px ${o}`;const r=[];let c="";for(const p of[...l])if(e.measureText(c+p).width>n){if(r.push(c),c=p,r.length===3)break}else c+=p;r.length<3&&c?r.push(c):r.length===3&&c&&r.join("").length<[...l].length&&(r[2]=`${r[2].slice(0,-1)}…`);const h=Math.min(i,Math.max(220,Math.max(...r.map(p=>e.measureText(p).width))+a*2)),u=a*2+r.length*46+40;s.width=i,s.height=u+28;const m=(i-h)/2;e.fillStyle="rgba(31, 26, 64, 0.22)",e.beginPath(),e.roundRect(m+4,8,h,u,28),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(m,2,h,u,28),e.fill(),e.beginPath(),e.moveTo(i/2-18,u),e.lineTo(i/2,u+24),e.lineTo(i/2+18,u),e.closePath(),e.fill(),e.textAlign="center",e.textBaseline="top",e.fillStyle="#2a2440",e.font=`600 34px ${o}`,r.forEach((p,v)=>e.fillText(p,i/2,a+v*46)),e.fillStyle="#5b4aa6",e.font=`700 26px ${o}`;const f=[...t].length>16?`${[...t].slice(0,16).join("")}…`:t;e.fillText(`— ${f}`,i/2,a+r.length*46+6);const d=new ho(s);return d.colorSpace=uo,{texture:d,aspect:i/s.height}}const Fo=-.9,Mi=46;function br(l){if(l===0)return 1;const t=(l*.618034+.31)%1;return Math.min(1,.03+t*1.02)}function Mr(l,t,s,e){const o=new mt;o.name="sea-creatures";let i=[],a=1;const n=new Ys({transparent:!0,depthTest:!1,depthWrite:!1,opacity:0,fog:!1,toneMapped:!1}),r=new $s(n);r.renderOrder=20,r.visible=!1,o.add(r);let c=null,h=0,u=2;const m=I=>{const _=s(I.x,I.z)+1.3;I.y=Math.max(_,Math.min(Fo,I.y));const O=Math.hypot(I.x,I.z),V=e(I.y)+1.4;return O<V&&O>.001&&(I.x*=V/O,I.z*=V/O),I},f=(I,_)=>{const O=Math.min(1,Math.max(0,I+(Math.random()-.5)*.07)),V=6.5+Math.random()*9,N=(1.1+V*.32)*Math.min(1.5,Math.max(.55,a)),R=O>.95?-4.5+Math.random()*4.2:O<.08?-1.2+Math.random()*1.6:(Math.random()-.6)*5;return _.copy(m(t(O,V,(Math.random()*2-1)*N,R)))},d=()=>{r.visible=!1,c=null,n.map?.dispose(),n.map=null},p=I=>{d();const{texture:_,aspect:O}=xr(I.data.body,I.data.authorName);n.map=_,n.needsUpdate=!0,u=O,c=I,h=0,r.visible=!0,I.rest=2.2},v=I=>{if(!o.visible)return null;let _=null;const O=I.ray,V=new g;for(const N of i){const R=N.radius*N.scale*1.35;if(O.distanceSqToPoint(N.pos)>R*R)continue;const X=V.copy(N.pos).sub(O.origin).dot(O.direction);X>0&&(!_||X<_.distance)&&(_={swimmer:N,distance:X})}return _?.swimmer||null},w=new Ne,y=new be,x=new g,M=new be,k=new g,P=new g,T=new g,F=new g;return{group:o,setList(I,_){const O=new Map(i.map(N=>[N.id,N])),V=[];for(const N of I.slice(0,_)){const R=ka(N.design);if(!R)continue;const X=O.get(N.id);if(X&&JSON.stringify(X.data.design)===JSON.stringify(R)){X.data=N,O.delete(N.id),V.push(X);continue}const $=Ca(R),nt=new H($,l);nt.matrixAutoUpdate=!1,nt.frustumCulled=!1,nt.name=`sea-creature:${N.id}`,o.add(nt);const ut=$.boundingSphere?.radius||1,ft=X?X.band:br(V.length),wt=X?X.pos.clone():f(ft,new g);V.push({id:N.id,mesh:nt,radius:ut,scale:1.05/ut,pos:wt,vel:new g,goal:f(ft,new g),heading:new g(Math.random()-.5,0,Math.random()-.5).normalize(),phase:Math.random()*10,rest:0,band:ft,data:N}),X&&(o.remove(X.mesh),X.mesh.geometry.dispose(),O.delete(N.id),c===X&&d())}for(const N of O.values())o.remove(N.mesh),N.mesh.geometry.dispose(),c===N&&d();i=V},update(I,_,O,V){if(o.visible=V&&i.length>0,!o.visible)return;a=O.aspect;const N=Math.min(I,.05);for(const R of i){k.copy(R.goal).sub(R.pos),k.length()<.8&&f(R.band,R.goal);const $=R.rest>0?0:.9+.35*Math.sin(_*.3+R.phase);R.rest=Math.max(0,R.rest-N),k.normalize().multiplyScalar($).sub(R.vel).multiplyScalar(Math.min(1,N*1.2)),R.vel.add(k),R.pos.addScaledVector(R.vel,N);const nt=s(R.pos.x,R.pos.z)+.9;R.pos.y<nt&&(R.pos.y=nt),R.pos.y>Fo&&(R.pos.y=Fo);const ut=Math.hypot(R.pos.x,R.pos.z),ft=e(R.pos.y)+.9;if(ut<ft&&ut>.001&&(R.pos.x*=ft/ut,R.pos.z*=ft/ut),R.mesh.visible=O.position.distanceToSquared(R.pos)<Mi*Mi,!R.mesh.visible)continue;const wt=R.rest>0?k.copy(O.position).sub(R.pos).setY(0):k.copy(R.vel).setY(R.vel.y*.4);wt.lengthSq()>1e-4&&R.heading.lerp(wt.normalize(),1-Math.exp(-N*2.5)).normalize(),y.setFromUnitVectors(yr,R.heading),M.setFromAxisAngle(R.heading,Math.sin(_*1.3+R.phase)*.12),y.premultiply(M);const G=Math.sin(_*1.6+R.phase)*.12;x.setScalar(R.scale),w.compose(k.copy(R.pos).setY(R.pos.y+G),y,x),R.mesh.matrix.copy(w),R.mesh.matrixWorldNeedsUpdate=!0}if(c){h+=N;const R=Math.min(1,h*5)*Math.min(1,Math.max(0,bi-h));n.opacity=R;const X=O.position.distanceTo(c.pos),$=Math.max(.7,X*.075)*(a<.8?1.1:1);r.scale.set($*u,$,1),r.position.copy(c.pos).setY(c.pos.y+.75+$*.5),O.getWorldDirection(P);const nt=k.copy(r.position).sub(O.position).dot(P);if(nt>.1){const ut=nt*Math.tan(O.fov*Math.PI/360),ft=ut*O.aspect;T.crossVectors(P,O.up).normalize(),F.crossVectors(T,P).normalize();const wt=k.copy(r.position).sub(O.position).dot(T)/ft,G=k.copy(r.position).sub(O.position).dot(F)/ut,et=Math.max(0,.96-r.scale.x/2/ft),q=Math.max(0,.94-r.scale.y/2/ut);Math.abs(wt)>et&&r.position.addScaledVector(T,(Math.sign(wt)*et-wt)*ft),G>q&&r.position.addScaledVector(F,(q-G)*ut)}h>=bi&&d()}},tap(I){const _=v(I);return _?(p(_),!0):!1},hover:I=>!!v(I),show(I){const _=i.find(O=>O.id===I);return _?(p(_),!0):!1},where:I=>i.find(_=>_.id===I)?.pos.clone()||null,talking:()=>c?.id||null,count:()=>i.length,dispose(){d(),n.dispose();for(const I of i)I.mesh.geometry.dispose();i=[],o.removeFromParent()}}}const Sr=`
uniform float uTime;
uniform float uWiggle;
uniform float uWiggleSpeed;
uniform float uWiggleAxis;
attribute vec3 color;
attribute float aPhase;
varying vec3 vColor;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_vertex>
void main() {
  vec3 p = position;
  float tail = smoothstep(0.35, -1.0, p.x);
  float wave = sin(uTime * uWiggleSpeed + aPhase - p.x * 2.6) * uWiggle * tail;
  if (uWiggleAxis > 0.5) p.y += wave; else p.z += wave;
  vLocal = position;
  vec3 tint = vec3(1.0);
  #ifdef USE_INSTANCING_COLOR
    tint = instanceColor;
  #endif
  vColor = color * tint;
  mat4 model = modelMatrix;
  #ifdef USE_INSTANCING
    model = modelMatrix * instanceMatrix;
  #endif
  vec4 world = model * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(model) * normal);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,zr=`
uniform vec3 uSunDir;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform vec3 uLight;
uniform float uDots;
uniform vec3 uDotColor;
uniform float uGlow;
uniform float uRim;
uniform float uBright;
uniform float uCaustic;
uniform float uTime;
varying vec3 vColor;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_fragment>
${We}
${Es}
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorld);
  float up = N.y * 0.5 + 0.5;
  vec3 ambient = mix(uGroundColor, uSkyColor, up) * 0.75;
  float wrap = clamp((dot(N, uSunDir) + 0.6) / 1.6, 0.0, 1.0);
  // 卡通兩階明暗＋硬邊輪廓光
  float band = smoothstep(0.42, 0.5, wrap);
  vec3 col = vColor * (ambient + uLight * (0.2 + band * 0.62));
  col += mix(vColor, vec3(1.0), 0.5) * smoothstep(0.55, 0.65, 1.0 - max(dot(N, V), 0.0)) * uRim;
  // 魚群在深水裡要亮亮的才看得到（像清澈的海裡發光的熱帶魚）
  col += vColor * uBright;
  // 淺海裡，朝上的地方晃著水面的光紋
  if (uCaustic > 0.01) col += uLight * caustics(vWorld.xz * 1.6 + vec2(vWorld.y * 0.9, -vWorld.y * 0.7), uTime * 0.85, 0.09) * uCaustic * smoothstep(0.35, 0.95, N.y);
  if (uDots > 0.5) {
    vec2 cell = vec2(vLocal.x * 9.0, vLocal.y * 14.0);
    vec2 f = fract(cell) - 0.5;
    float dots = (1.0 - smoothstep(0.12, 0.3, length(f))) * step(abs(vLocal.z), 0.2) * step(-0.12, vLocal.y) * step(vLocal.y, 0.04) * step(-0.45, vLocal.x);
    col += uDotColor * dots * (0.6 + uGlow * 1.4);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,ia={value:0};function cs(l,t,s){return new pt({uniforms:{...Se.clone(ze.fog),uTime:l.uTime,uSunDir:l.uSunDir,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uGlow:l.uGlow,uLight:t,uWiggle:{value:s.wiggle},uWiggleSpeed:{value:s.speed},uWiggleAxis:{value:s.axis==="y"?1:0},uDots:{value:s.dots?1:0},uDotColor:{value:new W(s.dots||"#ffffff")},uRim:{value:s.rim??.35},uBright:{value:s.bright??0},uCaustic:ia},vertexShader:Sr,fragmentShader:zr,fog:!0})}function vo(l){return l.getAttribute("aPhase")||l.setAttribute("aPhase",new K(new Float32Array(l.getAttribute("position").count),1)),l}function kr(){const l=new Nt;l.add(new ot(1,18,12),e=>e.y<-.25?"#fffbea":"#ffffff",B({s:[.5,.25,.14]}));const t=new ke(.2,.34,4,1);t.rotateZ(Math.PI/2),l.add(t,"#ffffff",B({x:-.58,s:[1,1.15,.22]}));const s=new ke(.1,.24,4,1);l.add(s,"#ffffff",B({x:-.05,y:.24,rz:.5,s:[1,1,.25]}));for(const e of[-1,1])l.add(new ot(.045,8,6),"#141420",B({x:.3,y:.05,z:e*.105})),l.add(new ot(.016,6,4),"#ffffff",B({x:.32,y:.07,z:e*.142}));return vo(l.build())}function Cr(){const l=new Nt;l.add(new ot(1,36,22),t=>Gt("#5b80b8","#e4eef6",dt(-.05,-.55,t.y+t.x*.05)),B({s:[3.3,1.35,1.4]}));for(const t of[-1,1])l.add(new ot(1,16,10),"#5276ad",B({x:.6,y:-.75,z:t*1.35,ry:t*.5,rz:-.4,s:[.85,.12,.38]})),l.add(new ot(.17,12,10),"#1d2233",B({x:2.25,y:.02,z:t*1.02})),l.add(new ot(.06,8,6),"#ffffff",B({x:2.36,y:.1,z:t*1.12})),l.add(new ot(.22,12,8),"#f4a6b8",B({x:2,y:-.32,z:t*1.07,s:[1,.45,.6]})),l.add(new ot(1,16,10),"#5276ad",B({x:-3.75,y:.1,z:t*.7,ry:t*.55,s:[.85,.1,.55]}));return l.add(new yt(.42,.75,1.3,16,2),"#5b80b8",B({x:-2.95,y:.08,rz:Math.PI/2})),vo(l.build())}function Tr(){const l=new Nt;l.add(new ot(1,28,18),e=>Gt("#4b3a5c","#2a2134",dt(.6,-.6,e.y)),B({s:[1.05,.85,.8]})),l.add(new ot(1,20,12,0,Math.PI*2,Math.PI/2,Math.PI/2),"#3a2c48",B({x:.45,y:-.12,s:[.75,.45,.7]}));for(let e=0;e<9;e++){const o=-.9+e/8*1.8,i=new ke(.045,.2,5,1);l.add(i,"#f4f1e6",B({x:.92+Math.cos(o)*.05,y:-.08,z:Math.sin(o)*.52,rz:Math.PI}))}for(const e of[-1,1])l.add(new ot(.12,10,8),"#e9f0c8",B({x:.62,y:.38,z:e*.42})),l.add(new ot(.06,8,6),"#141420",B({x:.7,y:.4,z:e*.47})),l.add(new ke(.25,.6,4,1),"#3a2c48",B({x:-.2,y:-.1,z:e*.78,rx:e*1.2,s:[1,1,.2]}));const t=new ke(.42,.7,6,1);t.rotateZ(Math.PI/2),l.add(t,"#3a2c48",B({x:-1.25,s:[1,1,.3]}));const s=new ds(.75,.025,6,16,Math.PI*.62);return l.add(s,"#5a4870",B({x:.55,y:.75,rz:.35})),vo(l.build())}const Ar=`
uniform float uTime;
attribute float aExtra;
varying vec3 vColor;
varying vec3 vLocal;
varying float vPart;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_vertex>
void main() {
  vec3 p = position;
  float phase = 0.0;
  vec3 tint = vec3(1.0);
  #ifdef USE_INSTANCING
    phase = instanceMatrix[3].x * 0.37 + instanceMatrix[3].z * 0.21;
  #endif
  #ifdef USE_INSTANCING_COLOR
    tint = instanceColor;
  #endif
  float pulse = sin(uTime * 1.9 + phase);
  if (aExtra < 0.5 || aExtra > 1.5) {
    // 鐘形的身體：裙邊一收一放
    float rim = 1.0 - smoothstep(0.0, 0.75, p.y);
    p.xz *= 1.0 + 0.14 * pulse * rim;
    p.y *= 1.0 - 0.09 * pulse;
  } else {
    float hang = clamp(-p.y / 2.4, 0.0, 1.0);
    p.x += sin(uTime * 1.3 + phase + p.y * 2.4) * 0.2 * hang;
    p.z += cos(uTime * 1.1 + phase + p.y * 2.0) * 0.2 * hang;
    p.xz *= 1.0 + 0.12 * pulse * (1.0 - hang);
  }
  vColor = tint;
  vLocal = position;
  vPart = aExtra;
  mat4 model = modelMatrix;
  #ifdef USE_INSTANCING
    model = modelMatrix * instanceMatrix;
  #endif
  vec4 world = model * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(model) * normal);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Pr=`
uniform float uGlow;
varying vec3 vColor;
varying vec3 vLocal;
varying float vPart;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_fragment>
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorld);
  float fres = pow(1.0 - abs(dot(N, V)), 1.8);
  vec3 col;
  float a;
  if (vPart > 1.5) {
    // 裡面那朵四瓣的小花：最亮
    col = mix(vColor, vec3(1.0), 0.45) * (0.9 + uGlow * 0.6);
    a = 0.55;
  } else if (vPart > 0.5) {
    col = vColor * (0.7 + uGlow * 0.5);
    a = 0.2;
  } else {
    // 傘面：中間透明、邊緣亮，從頂端放射出淡淡的條紋
    float ang = atan(vLocal.z, vLocal.x);
    float stripes = 0.55 + 0.45 * sin(ang * 8.0);
    float rim = 1.0 - smoothstep(0.05, 0.6, vLocal.y);
    col = mix(vColor, vec3(1.0), 0.18) * (0.45 + fres * 1.1 + rim * 0.35 * stripes) * (0.8 + uGlow * 0.5);
    a = 0.08 + fres * 0.42 + rim * 0.14 + stripes * 0.05;
  }
  // 加亮混合的東西不能往霧的顏色混（會變亮），改成越遠越淡
  #ifdef USE_FOG
    #ifdef FOG_EXP2
      float fogFactor = 1.0 - exp(- fogDensity * fogDensity * vFogDepth * vFogDepth);
    #else
      float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    #endif
    a *= 1.0 - fogFactor;
  #endif
  gl_FragColor = vec4(col, a);
}
`;function _r(){const l=new Nt,t=new ot(1,32,14,0,Math.PI*2,0,Math.PI*.52),s=t.getAttribute("position");for(let e=0;e<s.count;e++){const o=s.getX(e),i=s.getY(e),a=s.getZ(e),n=1+.07*Math.sin(Math.atan2(a,o)*8)*(1-Math.min(1,i/.35));s.setXYZ(e,o*n,i*.88,a*n)}t.computeVertexNormals(),l.add(t,"#ffffff",new Ne,0);for(let e=0;e<4;e++){const o=e/4*Math.PI*2+Math.PI/4;l.add(new ot(.2,12,8),"#ffffff",B({x:Math.cos(o)*.2,y:.45,z:Math.sin(o)*.2,s:[1,.35,.65],ry:-o}),2)}for(let e=0;e<9;e++){const o=e/9*Math.PI*2,i=new yt(.014,.006,2.3,4,12,!0);i.translate(0,-1.15,0),l.add(i,"#ffffff",B({x:Math.cos(o)*.74,y:.04,z:Math.sin(o)*.74}),1)}for(let e=0;e<4;e++){const o=e/4*Math.PI*2+.4,i=new yt(.07,.02,1.5,5,10,!0);i.translate(0,-.75,0),l.add(i,"#ffffff",B({x:Math.cos(o)*.16,y:.02,z:Math.sin(o)*.16,rx:Math.sin(o)*.12}),1)}return l.build(!0)}const Ir=`
uniform float uTime;
varying float vH;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_vertex>
void main() {
  vec3 p = position;
  float phase = 0.0;
  #ifdef USE_INSTANCING
    phase = instanceMatrix[3].x * 0.31 + instanceMatrix[3].z * 0.47;
  #endif
  float h = p.y;
  float sway = pow(h, 1.4);
  p.x += sin(uTime * 0.85 + phase + h * 2.2) * 0.55 * sway;
  p.z += cos(uTime * 0.7 + phase * 1.3 + h * 1.7) * 0.35 * sway;
  vH = h;
  mat4 model = modelMatrix;
  #ifdef USE_INSTANCING
    model = modelMatrix * instanceMatrix;
  #endif
  vec4 world = model * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(model) * normal);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Fr=`
uniform vec3 uBase;
uniform vec3 uTip;
uniform vec3 uGlowTip;
uniform float uGlow;
uniform vec3 uLight;
uniform vec3 uSunDir;
varying float vH;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_fragment>
void main() {
  vec3 N = normalize(vNormalW);
  if (!gl_FrontFacing) N = -N;
  vec3 col = mix(uBase, uTip, smoothstep(0.0, 0.9, vH));
  float lit = 0.6 + 0.4 * smoothstep(0.42, 0.52, clamp(dot(N, uSunDir) * 0.5 + 0.5, 0.0, 1.0));
  col *= uLight * lit + 0.25;
  col += uGlowTip * smoothstep(0.55, 1.0, vH) * uGlow * 0.9;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Er(){const t=[],s=[],e=[];for(let i=0;i<=18;i++){const a=i/18,n=.15*(1-a*.5)*(1+.4*Math.sin(a*22));t.push(-n,a,0,n,a,0),s.push(0,0,1,0,0,1)}for(let i=0;i<18;i++){const a=i*2;e.push(a,a+1,a+2,a+1,a+3,a+2)}const o=new Bt;return o.setAttribute("position",new K(new Float32Array(t),3)),o.setAttribute("normal",new K(new Float32Array(s),3)),o.setIndex(e),o}const Rr=`
attribute vec3 color;
varying vec3 vColor;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_vertex>
void main() {
  vColor = color;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Nr=`
uniform float uTime;
uniform vec3 uLight;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform vec3 uSunDir;
uniform float uGlow;
uniform float uNight;
varying vec3 vColor;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_fragment>
${We}
${Es}
void main() {
  vec3 N = normalize(vNormalW);
  vec3 ambient = mix(uGroundColor, uSkyColor, N.y * 0.5 + 0.5);
  float lit = clamp(dot(N, uSunDir) * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = vColor * (ambient * 0.85 + uLight * 0.4 * lit);
  // 沙紋：一條條被水流推出來的淺淺紋路
  float ripple = sin(dot(vWorld.xz, vec2(0.42, 0.91)) * 3.2 + vnoise(vWorld.xz * 0.35) * 5.0) * 0.5 + 0.5;
  col *= 0.92 + 0.08 * ripple;
  // 光網：RGB 錯開一點點，亮線邊緣帶一點點彩虹（像真的水底）
  vec2 p = vWorld.xz * 0.95;
  float width = 0.06;
  // 只算一次「離亮線多遠」，紅綠藍用不同的線寬：亮線邊緣自然帶一點彩虹
  float edge = causticEdge(p, uTime * 0.8);
  vec3 w3 = width * vec3(1.32, 1.0, 0.78);
  vec3 c = (1.0 - smoothstep(vec3(0.0), w3, vec3(edge))) + (1.0 - smoothstep(vec3(0.0), w3 * 3.5, vec3(edge))) * 0.22;
  // 光網一片亮一片暗（水面的浪把光聚在一起又散開），不會整片均勻得像磁磚
  // 這麼深的地方光網已經很淡：只剩一片一片慢慢飄過的亮
  float patchy = smoothstep(0.35, 0.8, vnoise(vWorld.xz * 0.07 + uTime * 0.02));
  col += uLight * c * (0.03 + 0.17 * patchy) * (0.8 + uGlow * 0.3) * (1.0 - uNight * 0.7);
  // 沙地深淺：大塊一點的暗斑與亮沙，海床才不會一整片同一個顏色
  col *= 0.9 + 0.2 * vnoise(vWorld.xz * 0.12 + 7.0);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,Dr=`
uniform float uScale;
attribute float aSize;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mvPosition.z;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mvPosition;
}
`,Wr=`
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float rim = smoothstep(0.62, 0.92, d) * (1.0 - smoothstep(0.93, 1.0, d));
  float shine = 1.0 - smoothstep(0.0, 0.2, length(gl_PointCoord - vec2(0.36, 0.32)));
  float a = (rim * 0.8 + shine * 0.95 + 0.07) * vAlpha;
  vec3 col = mix(vec3(0.72, 0.94, 1.0), vec3(1.0), shine);
  gl_FragColor = vec4(col, a);
}
`,Si=`
uniform float uScale;
attribute float aSize;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,zi=`
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.0, 1.0, d)) * uOpacity;
  gl_FragColor = vec4(uColor, a);
}
`,Lr=`
varying vec2 vUv;
varying float vFade;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  // 鏡頭穿過光束的時候淡掉，不會突然一整片白
  vFade = smoothstep(2.5, 7.0, distance(world.xyz, cameraPosition));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,Vr=`
uniform float uOpacity;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
${We}
void main() {
  // 一道光：兩邊柔柔地淡掉，裡面有幾條順著光的細紋，上面亮、往下慢慢消失
  float edge = smoothstep(0.0, 0.45, vUv.x) * smoothstep(1.0, 0.55, vUv.x);
  float streak = 0.5 + 0.5 * vnoise(vec2(vUv.x * 7.0 + uSeed * 3.0, vUv.y * 1.4 + uTime * 0.1));
  float fall = smoothstep(0.0, 0.92, vUv.y);
  float flicker = 0.72 + 0.28 * sin(uTime * 0.8 + uSeed * 5.0 + vUv.y * 2.4);
  float a = edge * edge * streak * fall * fall * flicker * uOpacity * vFade;
  gl_FragColor = vec4(uColor, a);
}
`,Or=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,Gr=`
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vDir;
${We}
${Li}
void main() {
  gl_FragColor = vec4(waterDome(normalize(vDir), uSunDir, uTime), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Br=`
uniform float uTime;
uniform float uScale;
uniform float uOpacity;
uniform float uBox;
uniform vec3 uOrigin;
uniform vec3 uScareOrigin;
uniform vec3 uScareDir;
uniform float uScare;
attribute vec3 aSeed;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec3 drift = vec3(sin(uTime * 0.11 + aSeed.x * 6.2831853) * 0.7, uTime * 0.09, cos(uTime * 0.083 + aSeed.x * 4.0) * 0.7);
  vec3 p = mod(position + drift - uOrigin, uBox) + uOrigin;
  float pulse = 0.25 + 0.75 * pow(0.5 + 0.5 * sin(uTime * (0.5 + aSeed.y * 0.9) + aSeed.x * 31.0), 3.0);
  vec3 o = p - uScareOrigin;
  float along = max(dot(o, uScareDir), 0.0);
  float d = length(o - uScareDir * along);
  float stir = uScare * (1.0 - smoothstep(0.6, 3.6, d));
  vAlpha = uOpacity * (pulse + stir * 2.2);
  vColor = mix(vec3(0.3, 0.92, 1.0), vec3(0.5, 0.62, 1.0), aSeed.z);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_PointSize = clamp((5.0 + aSeed.y * 9.0) * uScale * (1.0 + stir * 0.8) * 6.0 / max(2.0, -mv.z), 1.5, 24.0);
  gl_Position = projectionMatrix * mv;
}
`,Ur=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (exp(-d * d * 9.0) + exp(-d * d * 2.2) * 0.35) * vAlpha;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor * 1.6, a);
}
`;function As(l,t){return ce+.9*ue(l*.06,t*.06,3)+.18*Math.sin(l*.7+ue(l*.2,t*.2)*3)}function jr(l,t,s,e=1,o=null){const i=new mt;i.name="ocean";const a=De(7781),n=s==="high",r=[],c=new ps,h=new g,u={uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays,uSunDir:l.uSunDir,uTime:l.uTime},m=new H(new ot(300,32,18),new pt({uniforms:u,vertexShader:Or,fragmentShader:Gr,side:fs,depthWrite:!1}));m.renderOrder=-10,m.frustumCulled=!1,m.visible=!1,i.add(m),r.push(m.geometry,m.material);const f=[],d=new Ee(1,1);d.translate(0,-.5,0),r.push(d);const p=l.uWaterGlow;for(let C=0;C<(n?16:8);C++){const E=.02+a()*.36,U=He(E,5+a()*20,(a()-.5)*26,0),Y=new pt({uniforms:{uOpacity:{value:0},uTime:l.uTime,uSeed:{value:a()*10},uColor:p},vertexShader:Lr,fragmentShader:Vr,transparent:!0,depthWrite:!1,blending:he,side:te}),tt=new H(d,Y);tt.position.set(U.x,-.3,U.z),tt.rotation.z=(a()-.5)*.3,tt.scale.set(.8+a()*2.6,22+a()*16,1),tt.userData.strength=.5+a()*.5,tt.renderOrder=6,f.push(tt),i.add(tt),r.push(Y)}const v=n?700:320,w=34,y=new Float32Array(v*3),x=new Float32Array(v*3),M=new Float32Array(v);for(let C=0;C<v;C++)x.set([a()*w,a()*w,a()*w],C*3),M[C]=26+a()*46;const k=new Bt,P=new K(y,3);P.setUsage(Ie),k.setAttribute("position",P),k.setAttribute("aSize",new K(M,1));const T=new pt({uniforms:{uScale:{value:1},uColor:{value:new W("#dff7ff")},uOpacity:{value:0}},vertexShader:Si,fragmentShader:zi,transparent:!0,depthWrite:!1,blending:he}),F=new Ae(k,T);F.frustumCulled=!1,F.renderOrder=7,i.add(F),r.push(k,T);const I=n?1100:480,_=26,O=new Float32Array(I*3),V=new Float32Array(I*3);for(let C=0;C<I;C++)O.set([a()*_,a()*_,a()*_],C*3),V.set([a(),a(),a()],C*3);const N=new Bt;N.setAttribute("position",new K(O,3)),N.setAttribute("aSeed",new K(V,3));const R={uTime:l.uTime,uScale:{value:1},uOpacity:{value:0},uBox:{value:_},uOrigin:{value:new g},uScareOrigin:{value:new g},uScareDir:{value:new g(0,0,-1)},uScare:{value:0}},X=new Ae(N,new pt({uniforms:R,vertexShader:Br,fragmentShader:Ur,transparent:!0,depthWrite:!1,blending:he}));X.frustumCulled=!1,X.renderOrder=8,i.add(X),r.push(N,X.material);const $=kr();r.push($);const nt=[],ut=(C,E,U,Y,tt,it)=>{const at=new Qe($,U,C);at.instanceMatrix.setUsage(Ie),at.frustumCulled=!1;const Tt=new W,b=new Float32Array(C),z=[];for(let S=0;S<C;S++)Tt.set(E[S%E.length]),at.setColorAt(S,Tt),b[S]=a()*20,z.push({offset:new g((a()-.5)*tt[0],(a()-.5)*tt[1],(a()-.5)*tt[2]),phase:b[S],speed:.6+a()*.7,scale:Y*(.8+a()*.45)});at.geometry=$.clone(),at.geometry.setAttribute("aPhase",new us(b,1)),r.push(at.geometry),i.add(at);const A={mesh:at,center:it,fish:z,previous:z.map(()=>new g)};return nt.push(A),A},ft=cs(l,t,{wiggle:.09,speed:11}),wt=cs(l,t,{wiggle:.07,speed:9,dots:"#7ff3ff",rim:.2});r.push(ft,wt),ut(n?40:22,["#ffd23f","#3d8bfd","#ff8c42","#ff6fa8","#7be0ff"],ft,.8,[5,3,5],(C,E)=>{const U=C*.12+.3,Y=_s(U,-6)+3.2;return E.set(Math.sin(U)*Y,-6+Math.sin(C*.3)*1.5,Math.cos(U)*Y)}),ut(n?30:16,["#2c3b5c","#33456b"],wt,.7,[6,3,6],(C,E)=>{const U=He(.56,13,-2,0);return E.set(U.x+Math.sin(C*.21)*4,U.y+Math.sin(C*.33)*1.2,U.z+Math.cos(C*.17)*4)});const G=$e(1).target,et=cs(l,t,{wiggle:.11,speed:14,rim:.4,bright:.34});r.push(et);const q=C=>Math.max(24,Math.round(C*e));let J=null;const st=.28;if(o)try{const C=ro+(sa-ro)*(2*st*st),E=no+1.75*st+.56,U=Yo(C)+8.2+2.2*st+3.2,Y=$e(1),tt=Y.target.clone().sub(Y.position).setY(0).normalize(),it=Y.target.clone().addScaledVector(tt,7).addScaledVector(new g(-tt.z,0,tt.x),-2.5).setY(ce+3.6);J=new Ta(o.renderer,l,t,o.width,[{count:o.baitBall,center:new g(Math.sin(E)*U,C-1.2,Math.cos(E)*U),radius:5.2,height:10.5,shape:0,speed:3,size:.44,back:"#24508a",side:"#a8c8e0",belly:"#f1f7ff",flash:1.15,wander:1.2},{count:o.reef,center:it.setY(ce+5),radius:4.8,height:6.5,shape:0,speed:2.3,size:.44,back:"#2b86e8",side:"#8fe0ff",belly:"#fff6d8",palette:["#2b86e8","#2f9ff0","#1f6fd0","#ffd23f"],flash:.5,wander:1.8}]),J.meshes.forEach(at=>i.add(at))}catch{J=null}const gt=J?[]:[new lo($,et,{count:q(260),colors:["#3fd0ff","#5ae6ff","#2fa8ff","#8ff3ff"],home:new g(G.x,ce+5,G.z),roam:9,lift:2,size:.42,seed:31,floor:(C,E)=>As(C,E),column:_s,ceiling:ce+11}),new lo($,et,{count:q(110),colors:["#ffe14d","#ffc83d","#fff27a"],home:new g(G.x+3,ce+3.6,G.z-2),roam:6,lift:1.4,size:.36,seed:57,floor:(C,E)=>As(C,E),column:_s,ceiling:ce+9})];for(const C of gt)i.add(C.mesh);const vt=[!1,!1],jt=new g,Mt=cs(l,t,{wiggle:.42,speed:1.6,axis:"y",rim:.25}),ct=new H(Cr(),Mt);ct.scale.setScalar(1.15),i.add(ct),r.push(ct.geometry,Mt);const Ft=J?J.stats(0,new g).center.clone().add(new g(0,-2.6,0)):He(.4,15,4,-1.5),Dt=J?{x:8.5,z:8.5,speed:.085}:{x:10,z:7,speed:.045},At=n?8:5,Ht=n?7:3,ve=At+Ht,Yt=new pt({uniforms:{...Se.clone(ze.fog),uTime:l.uTime,uGlow:l.uGlow},vertexShader:Ar,fragmentShader:Pr,transparent:!0,depthWrite:!1,blending:he,side:te,fog:!0}),St=_r(),zt=new Qe(St,Yt,ve);zt.instanceMatrix.setUsage(Ie),zt.frustumCulled=!1,zt.renderOrder=7;const Wt=["#ffb3dc","#9eeaff","#cdb4ff","#ffd9b0","#b4ffe0"],ee=[];for(let C=0;C<At;C++){const E=.3+C/At*.34+a()*.04,U=(C%2?1:-1)*(3.5+a()*6);ee.push({home:He(E,11+a()*9,U,(a()-.4)*4),scale:.5+a()*.45,phase:a()*10}),zt.setColorAt(C,new W(Wt[C%Wt.length]))}const se=De(9157);for(let C=0;C<Ht;C++){const E=.46+C/Ht*.3+se()*.03,U=(C%2?-1:1)*(2.5+se()*8);ee.push({home:He(E,8+se()*14,U,(se()-.5)*5),scale:.32+se()*.4,phase:se()*10}),zt.setColorAt(At+C,new W(Wt[(C+2)%Wt.length]))}i.add(zt),r.push(St,Yt);const L=cs(l,t,{wiggle:.12,speed:3,rim:.05,bright:.06}),Q=Tr(),rt=[],Pt=new Float32Array(6);for(let C=0;C<2;C++){const E=new H(Q,L);E.scale.setScalar(C===0?1.15:.85);const U=He(.76+C*.07,10+C*3,C?5:-4,C?-1:1);rt.push({mesh:E,home:U,phase:C*2.3}),i.add(E)}r.push(Q,L);const xt=new Bt,Et=new K(Pt,3);Et.setUsage(Ie),xt.setAttribute("position",Et),xt.setAttribute("aSize",new K(new Float32Array([620,460]),1));const _t=new pt({uniforms:{uScale:{value:1},uColor:{value:new W("#fff2a6")},uOpacity:{value:1}},vertexShader:Si,fragmentShader:zi,transparent:!0,depthWrite:!1,blending:he}),oe=new Ae(xt,_t);oe.frustumCulled=!1,oe.renderOrder=8,i.add(oe),r.push(xt,_t);const Ct=new Ee(200,200,n?110:70,n?110:70);Ct.rotateX(-Math.PI/2);const Lt=Ct.getAttribute("position");for(let C=0;C<Lt.count;C++){const E=Lt.getX(C),U=Lt.getZ(C),Y=.9*ue(E*.06,U*.06,3)+.18*Math.sin(E*.7+ue(E*.2,U*.2)*3);Lt.setY(C,ce+Y)}Ct.computeVertexNormals();const Vt=new Nt;Vt.add(Ct,C=>Gt("#e7cf9a","#b9a57c",.5+ue(C.x*.15,C.z*.15,2)));const Z=new Nt,Ot=As,Zt=[$e(1).position,$e(.93).position,$e(.86).position],ht=(C,E=6.5)=>{const U=a()*Math.PI*2,Y=Math.sqrt(a())*C,tt=G.x+Math.cos(U)*Y,it=G.z+Math.sin(U)*Y,at=Math.atan2(it,tt);return Math.hypot(tt,it)<_s(at,ce+2)+.6||Zt.some(Tt=>Math.hypot(Tt.x-tt,Tt.z-it)<E)?null:{x:tt,z:it,y:Ot(tt,it)}};for(let C=0;C<(n?26:14);C++){const E=ht(22);if(!E)continue;const U=.4+a()*1.3,Y=new ot(1,12,9),tt=Y.getAttribute("position");for(let it=0;it<tt.count;it++)h.fromBufferAttribute(tt,it),h.multiplyScalar(1+.22*ue(h.x*1.8+C,h.z*1.8+h.y,2)),h.y*=.65,tt.setXYZ(it,h.x,h.y,h.z);Y.computeVertexNormals(),Z.add(Y,(it,at)=>Gt("#6f8796","#a6b8c2",at.y*.5+.5),B({x:E.x,y:E.y+.1*U,z:E.z,ry:a()*6,s:U}))}const Kt=["#ff7f9e","#ff9f5a","#c58bff","#ffd166","#6fe3c1"];for(let C=0;C<(n?30:16);C++){const E=ht(18);if(!E)continue;const U=Kt[C%Kt.length],Y=C%3;if(Y===0)for(let tt=0;tt<5;tt++){const it=new yt(.06,.12,.9+a()*.6,6,1);it.translate(0,.45,0),Z.add(it,U,B({x:E.x,y:E.y,z:E.z,rx:(a()-.5)*1.1,rz:(a()-.5)*1.1})),Z.add(new ot(.11,8,6),U,B({x:E.x+(a()-.5)*.6,y:E.y+.8+a()*.4,z:E.z+(a()-.5)*.6}))}else if(Y===1){const tt=.45+a()*.35,it=new ot(tt,28,14,0,Math.PI*2,0,Math.PI/2),at=it.getAttribute("position");for(let Tt=0;Tt<at.count;Tt++){h.fromBufferAttribute(at,Tt);const b=Math.sin(h.x*16+Math.sin(h.z*11)*2.2)*Math.sin(h.z*14+Math.sin(h.x*9)*1.8);h.multiplyScalar(1+.05*b+.08*ue(h.x*3+C,h.z*3,2)),h.y*=.72,at.setXYZ(Tt,h.x,h.y,h.z)}it.computeVertexNormals(),Z.add(it,Tt=>Gt(U,"#3a2440",dt(.2,-.6,Math.sin(Tt.x*16+Math.sin(Tt.z*11)*2.2)*Math.sin(Tt.z*14+Math.sin(Tt.x*9)*1.8))*.45),B({x:E.x,y:E.y-.05,z:E.z}))}else{for(let tt=0;tt<9;tt++){const it=tt/9*Math.PI*2,at=new yt(.035,.06,.55,5,1);at.translate(0,.27,0),Z.add(at,U,B({x:E.x+Math.cos(it)*.12,y:E.y+.1,z:E.z+Math.sin(it)*.12,rx:Math.sin(it)*.5,rz:-Math.cos(it)*.5}))}Z.add(new yt(.2,.26,.2,10,1),"#f3e1c5",B({x:E.x,y:E.y+.08,z:E.z}))}}for(let C=0;C<(n?10:5);C++){const E=ht(15);if(!E)continue;const U=new Nt;for(let Y=0;Y<5;Y++){const tt=new ke(.11,.42,5,1);tt.rotateZ(-Math.PI/2),tt.translate(.2,0,0),U.add(tt,C%2?"#ff8f6b":"#ffb347",B({ry:Y/5*Math.PI*2,s:[1,.45,1]}))}U.add(new ot(.12,8,6),C%2?"#ff8f6b":"#ffb347",B({s:[1,.5,1]})),Z.add(U.build(),Y=>Y.y>.03?"#ffd0b0":C%2?"#ff8f6b":"#ffb347",B({x:E.x,y:E.y+.05,z:E.z,ry:a()*6}))}const ne=new pt({uniforms:{...Se.clone(ze.fog),uTime:l.uTime,uLight:t,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uSunDir:l.uSunDir,uGlow:l.uGlow,uNight:l.uNight},vertexShader:Rr,fragmentShader:Nr,fog:!0,defines:n?{CAUSTIC_TWO_LAYERS:""}:{}}),ie=new H(Vt.build(),ne),Le=cs(l,t,{wiggle:0,speed:0,rim:.32,bright:.12}),Qt=new H(vo(Z.build()),Le);i.add(ie,Qt),r.push(ie.geometry,ne,Qt.geometry,Le);const we=wr((C,E)=>{const U=He(1,C,E,0);return U.y=As(U.x,U.z),U},$e(1).position);i.add(we.group);const Ms=cs(l,t,{wiggle:.08,speed:6,rim:.32,bright:.12});r.push(Ms);const fe=Mr(Ms,(C,E,U,Y)=>He(C,E,U,Y),(C,E)=>As(C,E),Yo);i.add(fe.group);const Ve=n?90:46,Je={...Se.clone(ze.fog),uTime:l.uTime,uGlow:l.uGlow,uLight:t,uSunDir:l.uSunDir,uBase:{value:new W("#1f4a2e")},uTip:{value:new W("#5fae62")},uGlowTip:{value:new W("#6ff0d6")}},Rs=new pt({uniforms:Je,vertexShader:Ir,fragmentShader:Fr,side:te,fog:!0}),Ss=Er(),ye=new Qe(Ss,Rs,Ve);let It=0;for(let C=0;C<Ve*4&&It<Ve;C++){const E=ht(26,8);if(!E)continue;const U=4+Math.floor(a()*5);for(let Y=0;Y<U&&It<Ve;Y++){const tt=(a()-.5)*1.6,it=(a()-.5)*1.6;c.position.set(E.x+tt,Ot(E.x+tt,E.z+it)-.1,E.z+it),c.rotation.set(0,a()*Math.PI,0),c.scale.set(.9+a()*.9,3.5+a()*6.5,1),c.updateMatrix(),ye.setMatrixAt(It++,c.matrix)}}ye.count=It,ye.frustumCulled=!1,i.add(ye),r.push(Ss,Rs);const $t=n?380:190,zs=new Float32Array($t*3),ks=new Float32Array($t),ts=new Float32Array($t),Ns=Array.from({length:$t},()=>({pos:new g,vel:0,wobble:a()*10,life:-1,size:0,burst:!1})),Ds=Array.from({length:6},()=>ht(14)||{x:G.x,z:G.z,y:ce}),pe=C=>{const E=Ds[Math.floor(a()*Ds.length)];C.pos.set(E.x+(a()-.5)*.5,E.y+.2,E.z+(a()-.5)*.5),C.vel=1.1+a()*1.4,C.size=70+a()*120,C.life=7+a()*6,C.burst=!1};Ns.forEach((C,E)=>{E<$t*.7&&(pe(C),C.pos.y+=a()*12)});const Oe=new Bt,Ws=new K(zs,3).setUsage(Ie),es=new K(ks,1).setUsage(Ie),Ls=new K(ts,1).setUsage(Ie);Oe.setAttribute("position",Ws),Oe.setAttribute("aSize",es),Oe.setAttribute("aAlpha",Ls);const ms=new pt({uniforms:{uScale:{value:1}},vertexShader:Dr,fragmentShader:Wr,transparent:!0,depthWrite:!1}),Ge=new Ae(Oe,ms);Ge.frustumCulled=!1,Ge.renderOrder=9,i.add(Ge),r.push(Oe,ms);let Be=0;we.onBubbles=C=>Ue(C,18);const Ue=(C,E=14)=>{for(let U=0;U<E;U++){const Y=Ns[Be];Be=(Be+1)%$t,Y.pos.set(C.x+(a()-.5)*.6,C.y+(a()-.5)*.4,C.z+(a()-.5)*.6),Y.vel=1.6+a()*2.2,Y.size=50+a()*150,Y.life=2.6+a()*2.2,Y.burst=!0}},ss=new be,gs=new Ne,re=new g,Me=new g,je=new g,os=new g,Cs=new g,wo=new g(1,0,0),is=(C,E,U,Y)=>(U.lengthSq()<1e-6&&U.set(1,0,0),U.normalize(),ss.setFromUnitVectors(wo,U),Cs.setScalar(Y),C.compose(E,ss,Cs));return{group:i,update:(C,E,U,Y,tt,it=null)=>{const at=l.uUnder.value,Tt=l.uNight.value;m.visible=at>.5,m.position.copy(U.position),l.uWaterRays.value=(1-dt(3,30,Y))*(1-Tt*.5);const b=at*(1-dt(4,26,Y))*(1-Tt*.55);for(const A of f)A.material.uniforms.uOpacity.value=b*A.userData.strength*.26,A.visible=b>.01,A.visible&&(h.set(U.position.x-A.position.x,0,U.position.z-A.position.z),A.rotation.y=Math.atan2(h.x,h.z));if(R.uOpacity.value=at*dt(12,30,Y)*(.55+Tt*.45),X.visible=R.uOpacity.value>.01,X.visible&&(R.uOrigin.value.copy(U.position).subScalar(_/2),R.uScale.value=tt,it&&it.strength>0&&(R.uScareOrigin.value.copy(it.origin),R.uScareDir.value.copy(it.dir)),R.uScare.value=it?it.strength:0),T.uniforms.uOpacity.value=at*(.25+dt(6,40,Y)*.45),T.uniforms.uScale.value=tt,F.visible=at>.02,F.visible){const A=U.position.x-w/2,S=U.position.y-w/2,D=U.position.z-w/2,j=E*.35;for(let lt=0;lt<v;lt++){const Rt=x[lt*3],qt=x[lt*3+1],ae=x[lt*3+2],xo=((Rt-A+Math.sin(E*.2+lt)*.3)%w+w)%w+A,bo=((qt-S-j)%w+w)%w+S,ra=((ae-D)%w+w)%w+D;y[lt*3]=xo,y[lt*3+1]=Math.min(bo,-.2),y[lt*3+2]=ra}P.needsUpdate=!0}for(const A of nt){A.center(E,je);const S=je.distanceTo(U.position)<60;A.mesh.visible=at>.01&&S,A.mesh.visible&&(A.fish.forEach((D,j)=>{const lt=E*D.speed*.5+D.phase;Me.set(Math.sin(lt)*D.offset.x,Math.sin(lt*1.3)*D.offset.y*.5+D.offset.y,Math.cos(lt)*D.offset.z).add(je);const Rt=A.previous[j];Rt.lengthSq()===0&&(Rt.copy(Me).x-=.01),re.copy(Me).sub(Rt),A.center(E+.4,os),re.addScaledVector(os.sub(je),.25),A.mesh.setMatrixAt(j,is(gs,Me,re,D.scale)),Rt.lerp(Me,.35)}),A.mesh.instanceMatrix.needsUpdate=!0)}{const A=E*Dt.speed;h.set(Ft.x+Math.cos(A)*Dt.x,Ft.y+Math.sin(E*.2)*1.2,Ft.z+Math.sin(A)*Dt.z),re.set(-Math.sin(A)*Dt.x,Math.cos(E*.2)*.24,Math.cos(A)*Dt.z),ct.matrixAutoUpdate=!1,is(ct.matrix,h,re,1.15),ct.visible=at>.01&&Y>4&&Y<44,J?.setPredator(h,ct.visible?5.6:0)}for(let A=0;A<ve;A++){const S=ee[A],D=Math.sin(E*.21+S.phase)*1.6+Math.sin(E*.37+S.phase*1.7)*.5;c.position.set(S.home.x+Math.sin(E*.2+S.phase)*1.2,S.home.y+D,S.home.z+Math.cos(E*.17+S.phase)*1.2),c.rotation.set(Math.sin(E*.3+S.phase)*.18,E*.1,Math.cos(E*.27+S.phase)*.18),c.scale.setScalar(S.scale),c.updateMatrix(),zt.setMatrixAt(A,c.matrix)}zt.instanceMatrix.needsUpdate=!0,zt.visible=at>.01&&Y>6,rt.forEach((A,S)=>{const D=E*.12+A.phase;h.set(A.home.x+Math.cos(D)*2.5,A.home.y+Math.sin(E*.5+A.phase)*.6,A.home.z+Math.sin(D)*2.5),re.set(-Math.sin(D),.05,Math.cos(D)),A.mesh.matrixAutoUpdate=!1,is(A.mesh.matrix,h,re,A.mesh.scale.x),A.mesh.visible=at>.01&&Y>22,Me.set(1.12,1.18,0).applyMatrix4(A.mesh.matrix),Pt.set([Me.x,Me.y,Me.z],S*3)}),Et.needsUpdate=!0,_t.uniforms.uOpacity.value=(.65+.35*Math.sin(E*3.1)*Math.sin(E*1.7))*dt(20,30,Y),_t.uniforms.uScale.value=tt,oe.visible=Y>20;const z=Y>30;ie.visible=z,Qt.visible=z,ye.visible=z,we.update(C,E,U,z&&at>.01),fe.update(C,E,U,at>.01);for(const A of gt)A.mesh.visible=z,z&&A.update(C,E,it);if(ia.value=at*(1-dt(6,30,Y)*.8)*(1-Tt*.6)*.32,J&&(vt[0]=at>.01&&Y>2&&Y<34&&J.stats(0,jt).center.distanceTo(U.position)<48,vt[1]=at>.01&&z,J.update(C,E,vt,it,at*(1-dt(6,26,Y))*(1-Tt*.7)*.6)),Ge.visible=at>.01,ms.uniforms.uScale.value=tt,Ge.visible){for(let A=0;A<$t;A++){const S=Ns[A];if(S.life<=0)if(!S.burst&&A<$t*.75&&z)pe(S);else{ts[A]=0;continue}S.life-=C,S.pos.y+=S.vel*C,S.pos.x+=Math.sin(E*2.2+S.wobble)*.25*C,S.pos.z+=Math.cos(E*1.9+S.wobble)*.25*C,S.pos.y>-.3&&(S.life=0),zs.set([S.pos.x,S.pos.y,S.pos.z],A*3),ks[A]=S.size,ts[A]=Math.min(1,S.life*1.5)*(S.burst?1:.85)}Ws.needsUpdate=!0,es.needsUpdate=!0,Ls.needsUpdate=!0}},burst:Ue,setTheme:C=>{Je.uTip.value.set(C?"#3f8f5b":"#5fae62"),Je.uBase.value.set(C?"#163a26":"#1f4a2e")},tap:C=>we.tap(C)||fe.tap(C),hover:C=>we.hover(C)||fe.hover(C),lampOn:()=>we.lampOn,setCreatures:(C,E)=>fe.setList(C,E),showCreature:C=>fe.show(C),creatureAt:C=>fe.where(C),creatureCount:()=>fe.count(),creatureTalking:()=>fe.talking(),swarmStats:C=>J?J.stats(1,C):gt[0].stats(C),thinSchool:C=>J?.thin(C),dispose:()=>{r.forEach(C=>C.dispose()),gt.forEach(C=>C.dispose()),J?.dispose(),we.dispose(),fe.dispose()}}}const Hr=2.3,qr=2.2,Eo=18,co={z:.55,a:.18},Js=[[.015,-1.02],[.07,-.99],[.12,-.86],[.19,-.64],[.28,-.38],[.36,-.1],[.405,.15],[.405,.32],[.37,.47],[.3,.6],[.2,.69],[.135,.75],[.118,.84],[.1,.93],[.06,.995],[.001,1.02]];function aa(l){const t=l.z;return l.x*=.96,l.y*=.9,l.y+=.035*(1-t*t),l.y>0&&(l.y+=.06*dt(.25,.5,t)*(1-dt(.56,.74,t))),l.y-=.09*dt(.58,.86,t),l}function na(l,t,s){let e=0;for(let a=1;a<Js.length;a++){const[n,r]=Js[a-1],[c,h]=Js[a];if(l>=r&&l<=h){e=n+(c-n)*((l-r)/(h-r));break}}const o=aa(new g(Math.cos(t)*e*s,Math.sin(t)*e,l)),i=new g(Math.cos(t)*s,Math.sin(t)+.15,.45).normalize();return{point:o,normal:i}}const Xr=l=>{const t=l%4.6;return t<.14?1-Math.sin(t/.14*Math.PI)*.92:1};function Yr(l){const t=new Nt,s=l==="high"?36:22,e=new Zo(Js.map(([w,y])=>new bt(w,y)),s);e.rotateX(Math.PI/2);const o=e.getAttribute("position"),i=new g;for(let w=0;w<o.count;w++)aa(i.fromBufferAttribute(o,w)),o.setXYZ(w,i.x,i.y,i.z);e.deleteAttribute("normal"),e.deleteAttribute("uv");const a=pa(e,1e-4);e.dispose(),a.computeVertexNormals();const n=new W("#5f97d6"),r=new W("#8cc3f2"),c=new W("#f4f8ff");t.add(a,w=>{const y=-.06+.05*Math.sin(w.z*4.2+.6);return r.clone().lerp(n,dt(.08,.3,w.y)).lerp(c,dt(y+.04,y-.08,w.y))});const h=new Lo;h.moveTo(.17,0),h.quadraticCurveTo(.1,.2,-.17,.33),h.quadraticCurveTo(-.1,.14,-.2,0),h.lineTo(.17,0);const u=new Vo(h,{depth:.05,bevelEnabled:!0,bevelThickness:.03,bevelSize:.024,bevelSegments:3,curveSegments:l==="high"?10:6});u.translate(0,0,-.025),u.rotateY(-Math.PI/2),t.add(u,"#5a8fcf",B({y:.36,z:-.12}));const m=new Lo;m.moveTo(0,.07),m.quadraticCurveTo(.24,.06,.46,-.15),m.quadraticCurveTo(.26,-.1,0,-.03),m.quadraticCurveTo(-.26,-.1,-.46,-.15),m.quadraticCurveTo(-.24,.06,0,.07);const f=new Vo(m,{depth:.03,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:2,curveSegments:l==="high"?10:6});f.translate(0,0,-.015),f.rotateX(Math.PI/2),t.add(f,"#5f97d6",B({z:-1}));const d=(w,y)=>new ot(1,w,y);for(const w of[-1,1])t.add(d(14,10),"#6fa5de",B({x:w*.34,y:-.17,z:.2,ry:w*.55,rz:w*-.55,s:[.2,.035,.1]}));const p=(w,y,x)=>{const{point:M,normal:k}=na(w,y,x),P=new ps;return P.position.copy(M),P.quaternion.copy(new be().setFromUnitVectors(new g(0,0,1),k)),P.updateMatrix(),(T,F,I,_)=>P.matrix.clone().multiply(B({x:T,y:F,z:I,s:_}))};for(const w of[-1,1]){t.add(d(10,8),"#ffa3bd",p(.43,.02,w)(0,0,-.006,[.05,.034,.013]));const y=p(co.z,co.a,w);t.add(d(16,12),"#1f1a22",y(0,0,0,[.062,.078,.034]),1),t.add(d(8,6),"#ffffff",y(-.018*w,.026,.028,[.02,.02,.012]),2),t.add(d(8,6),"#ffffff",y(.016*w,-.02,.028,[.01,.01,.008]),2)}const v=t.build(!0);return v.computeBoundingSphere(),v.boundingSphere&&(v.boundingSphere.radius*=1.3),v}function $r(l){const t=Yr(l.detail),s=na(co.z,co.a,1).point.y.toFixed(4),e={uSwim:{value:0},uStroke:{value:.12},uBlink:{value:1}},o=new Ut({vertexColors:!0,roughness:.5,metalness:0});o.onBeforeCompile=G=>{Object.assign(G.uniforms,e),G.vertexShader=G.vertexShader.replace("#include <common>",`#include <common>
uniform float uSwim;
uniform float uStroke;
uniform float uBlink;
attribute float aExtra;
varying float vShine;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        // 尾巴上下擺（越往尾巴越大）；眼睛眨眼時往中間壓扁
        float tail = smoothstep(0.2, -1.2, transformed.z);
        transformed.y += sin(uSwim - transformed.z * 2.3) * uStroke * tail * tail;
        if (aExtra > 0.5) transformed.y = ${s} + (transformed.y - ${s}) * uBlink;
        vShine = step(1.5, aExtra);`),G.fragmentShader=G.fragmentShader.replace("#include <common>",`#include <common>
varying float vShine;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += vec3(0.9) * vShine;`)},o.customProgramCacheKey=()=>"larch-dolphin";const i=new H(t,o);i.name="dolphin-body";const a=new mt;a.name="creature-dolphin",a.add(i),a.scale.setScalar(Hr/qr),a.position.set(0,-6,12);const n=new Ut({color:"#f2fcff",emissive:"#c9f4ff",emissiveIntensity:.4,roughness:.15,transparent:!0,opacity:.92}),r=new Qe(new ot(1,8,6),n,Eo);r.name="dolphin-spray",r.frustumCulled=!1,r.visible=!1;const c=Array.from({length:Eo},()=>({pos:new g,vel:new g,life:0,size:0}));let h=0;const u=new ps,m=(G,et,q,J)=>{for(let st=0;st<et;st++){const gt=c[h];h=(h+1)%Eo;const vt=Math.random()*Math.PI*2;gt.pos.copy(G),gt.vel.set(Math.cos(vt)*(.6+Math.random())*q,(2.4+Math.random()*2.2)*q,Math.sin(vt)*(.6+Math.random())*q),J&&gt.vel.addScaledVector(J,.8*q),gt.life=.7+Math.random()*.35,gt.size=(.05+Math.random()*.06)*Math.max(.6,q)}r.visible=!0},f=(G,et,q,J)=>{l.onSplash?.(G,et),m(G,q,Math.min(1.2,.5+et*.5),J)};let d="surface",p=null,v="leap",w=2.2,y=0,x=0,M=!1;const k=new g,P=new g,T=new g(0,0,1),F=new g,I=new g,_=new g,O=new g,V={start:new g,dir:new g,apex:new g,end:new g},N=new g(0,1,0),R=(G,et,q)=>q.copy(G.start).addScaledVector(G.dir,G.vh*et).setY(G.y0+G.vy0*et-.5*G.g*et*et),X=(G,et,q)=>{if(G==="leap")return{kind:G,t:-.55,start:et.clone(),dir:q.clone(),vh:4.6,vy0:13*1.15/2,g:13,y0:0,span:1.15,marks:0};const J=1.1,st=8*.56/(J*J);return{kind:G,t:-.5,start:et.clone(),dir:q.clone(),vh:2.6,vy0:st*J/2,g:st,y0:-.52,span:J,marks:0}},$=(G,et,q)=>{G.getWorldDirection(F).setY(0).normalize();const J=X(et,new g,new g(1,0,0)),st=J.vh*J.span;for(let gt=0;gt<6;gt++){const vt=Math.random()*Math.PI*2,jt=10.6+Math.random()*3,Mt=O.set(Math.sin(vt)*jt,0,Math.cos(vt)*jt),ct=V.dir.set(Math.cos(vt),0,-Math.sin(vt)).multiplyScalar(Math.random()<.5?1:-1);if(Math.abs(ct.dot(F))>.55)continue;V.start.copy(Mt).addScaledVector(ct,-st/2),V.end.copy(Mt).addScaledVector(ct,st/2);const Ft=et==="leap"?J.vy0*J.vy0/(2*J.g)+.5:.5;if(V.apex.copy(Mt).setY(Ft),!l.canLeap||l.canLeap([V.start,V.apex,V.end],q))return X(et,V.start,ct)}return null},nt=G=>{const et=a.position;P.subVectors(et,k).divideScalar(Math.max(G,.001)),k.copy(et),P.lengthSq()>.04&&T.lerp(O.copy(P).normalize(),1-Math.exp(-G*(p?30:5))).normalize();const q=Math.atan2(T.x,T.z),J=-Math.atan2(T.y,Math.hypot(T.x,T.z));a.rotation.set(J,q,Math.sin(ft*.7)*.12,"YXZ")},ut=G=>{if(!r.visible)return;let et=!1;c.forEach((q,J)=>{q.life>0&&(q.life-=G,q.vel.y-=11*G,q.pos.addScaledVector(q.vel,G),q.pos.y<0&&q.vel.y<0&&(q.life=Math.min(q.life,.05)));const st=q.life>0?q.size*Math.min(1,q.life*6):1e-4;q.life>0&&(et=!0),u.position.copy(q.pos),u.scale.set(st,st*1.25,st),u.updateMatrix(),r.setMatrixAt(J,u.matrix)}),r.instanceMatrix.needsUpdate=!0,et||(r.visible=!1)};let ft=0;return{root:a,spray:r,materials:[o],update(G,et,q){ft+=G;const J=q.position.y<-.35;J!==(d==="dive")&&(d=J?"dive":"surface",J?p=null:(p=null,w=2)),e.uBlink.value=Xr(et);const st=a.position;if(d==="surface"){if(M||(st.set(0,-6,12),k.copy(st),M=!0),p||(w-=G,st.addScaledVector(T,G*2).setY(Math.max(st.y-G*1.5,-6)),w<=0&&(y-=G,y<=0&&(y=.25,p=$(q,v,w<-8),p&&(R(p,p.t,st),k.copy(st),T.copy(p.dir))))),p){p.t+=G,R(p,p.t,st);const vt=O.copy(st).addScaledVector(p.dir,.9).setY(0);p.kind==="leap"?(p.marks===0&&p.t>=0&&(p.marks=1,x++,f(vt,1.2,10,p.dir)),p.marks===1&&p.t>=p.span&&(p.marks=2,f(O.copy(st).setY(0),1.5,14,null))):(p.marks===0&&p.t>=p.span*.2&&(p.marks=1,x++,f(vt,.55,3,p.dir)),p.marks===1&&p.t>=p.span*.5&&(p.marks=2,m(O.copy(st).addScaledVector(p.dir,.25).setY(st.y+.42),6,.55,null)),p.marks===2&&p.t>=p.span*.85&&(p.marks=3,l.onSplash?.(O.copy(st).setY(0),.45))),p.t>p.span+.6&&(p=null,v=v==="leap"?"roll":"leap",w=3.5+Math.random()*3)}const gt=st.y>.2;e.uStroke.value+=((gt?.03:.12)-e.uStroke.value)*(1-Math.exp(-G*6)),e.uSwim.value+=G*(gt?2.5:7),nt(G),a.visible=st.y>-1.25}else{const gt=q;q.getWorldDirection(F),I.set(-F.z,0,F.x).normalize();const vt=15,jt=Math.tan((gt.fov||40)*Math.PI/360)*vt,Mt=jt*(gt.aspect||1),ct=ft*.5,Ft=(gt.aspect||1)<.8,Dt=Math.min(5.5,Mt*(Ft?.85:.6)),At=Math.min(Ft?3.6:2.8,jt*.55);_.copy(q.position).addScaledVector(F,vt+Math.sin(ct*.7)*2.5).addScaledVector(I,Math.cos(ct)*Dt-Math.min(1.2,Mt*.15)).addScaledVector(N,Math.sin(ct*1.3+.4)*At+.6),_.y=Math.min(-1.1,Math.max(ce+3.2,_.y)),st.lerp(_,1-Math.exp(-G*1.6)),e.uStroke.value+=(.13-e.uStroke.value)*(1-Math.exp(-G*4)),e.uSwim.value+=G*6.5,nt(G),a.visible=!0}ut(G)},state:()=>({mode:d,event:p&&p.t>=0&&p.t<=p.span?p.kind:null,position:a.position.clone(),visible:a.visible,surfaced:x}),dispose(){t.dispose(),o.dispose(),r.geometry.dispose(),n.dispose(),a.removeFromParent(),r.removeFromParent()}}}const ki="/events/creator-challenge-4/creatures",Xs={whale:`
    float tail = smoothstep(0.1, -1.0, p.z);
    p.y += sin(uTime * 1.25 + uPhase - p.z * 1.6) * 0.22 * tail * tail;
    p.x += sin(uTime * 0.6 + uPhase) * 0.04 * (1.0 - p.z) * 0.5;`,serpent:`
    float body = smoothstep(1.0, -0.6, p.z);
    p.x += sin(p.z * 4.6 - uTime * 2.1 + uPhase) * 0.5 * body;
    p.y += sin(p.z * 3.2 - uTime * 1.6 + uPhase) * 0.12 * body;`,turtle:`
    float side = abs(p.z);
    float fin = smoothstep(0.42, 0.95, side);
    p.y += sin(uTime * 1.5 + uPhase + sign(p.z) * 0.6 + p.x * 0.8) * 0.55 * fin * (side - 0.42);`};async function Zr(l){const[t,s]=await Promise.all([fetch(`${ki}/${l}.bin`).then(p=>{if(!p.ok)throw new Error(`${l}.bin ${p.status}`);return p.arrayBuffer()}),fetch(`${ki}/${l}.jpg`).then(p=>{if(!p.ok)throw new Error(`${l}.jpg ${p.status}`);return p.blob()}).then(p=>createImageBitmap(p,{imageOrientation:"none",premultiplyAlpha:"none",colorSpaceConversion:"none"}))]),e=new DataView(t);if(e.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const o=e.getUint32(4,!0),i=e.getUint32(8,!0),a=new g(e.getFloat32(12,!0),e.getFloat32(16,!0),e.getFloat32(20,!0)),n=p=>p+3&-4;let r=24;const c=new Int16Array(t,r,o*3);r=n(r+o*6);const h=new Int8Array(t,r,o*3);r=n(r+o*3);const u=new Uint16Array(t,r,o*2);r=n(r+o*4);const m=o<65536?new Uint16Array(t,r,i):new Uint32Array(t,r,i),f=new Bt;f.setAttribute("position",new K(c,3,!0)),f.setAttribute("normal",new K(h,3,!0)),f.setAttribute("uv",new K(u,2,!0)),f.setIndex(new K(m,1)),f.computeBoundingSphere(),f.boundingSphere&&(f.boundingSphere.radius*=1.6);const d=new Wo(s);return d.colorSpace=uo,d.flipY=!1,d.needsUpdate=!0,{geometry:f,extent:a,texture:d}}const Kr=`
uniform float uWidth;
uniform float uWidthScale;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPhase;
#include <fog_pars_vertex>
void main() {
  vec3 p = position;
  DEFORM_BODY
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mvPosition;
  vec3 viewNormal = normalize(normalMatrix * normal);
  vec2 dir = (projectionMatrix * vec4(viewNormal, 0.0)).xy;
  float len = length(dir);
  if (len > 1e-5) clip.xy += dir / len * uWidth * uWidthScale * clip.w * 2.0 / uResolution;
  clip.z += 0.0004 * clip.w;
  gl_Position = clip;
  #include <fog_vertex>
}
`,Qr=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Jr(l,t,s){const e=new mt;e.name="creatures-island";const o=new mt;o.name="creatures-world",s.islandHost.add(e);const i=[];let a=!1;const n=(f,d,p,v,w,y)=>{const x={value:0},M={value:y},k=Ye(l,{vertexColors:!1,rim:.55,rimColor:"#ffd9a8"});k.map=d.texture,k.transparent=!0,k.opacity=0;const P=k.onBeforeCompile;k.onBeforeCompile=($,nt)=>{P.call(k,$,nt),$.uniforms.uPhase=M,$.uniforms.uTime=l.uTime,$.vertexShader=$.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uPhase;`).replace("#include <begin_vertex>",`#include <begin_vertex>
{ vec3 p = transformed; ${Xs[f]}
 transformed = p; }`)},k.customProgramCacheKey=()=>`larch-creature-${f}`;const T=new H(d.geometry,k),F=new pt({uniforms:{uWidth:t.uWidth,uWidthScale:{value:.85},uResolution:t.uResolution,uTime:l.uTime,uPhase:M,uInk:{value:new W(w)},uOpacity:x,fogColor:{value:new W},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:Kr.replace("DEFORM_BODY",Xs[f]),fragmentShader:Qr,side:fs,fog:!0,transparent:!0}),I=new H(d.geometry,F),_=Math.max(d.extent.x,d.extent.y,d.extent.z)*2,O=p/_,V=new mt;V.scale.copy(d.extent).multiplyScalar(O),V.add(T,I);const N=new mt;N.name=`creature-${f}`,N.add(V);for(const $ of[T,I])$.castShadow=$===T,$.frustumCulled=!0;const R={kind:f,root:N,body:T,outline:I,fade:x,shown:0,update:()=>{}};return(s.prepare?s.prepare(N).catch(()=>{}):Promise.resolve()).then(()=>{a||(v.add(N),i.push(R))}),R},r=(f,d,p,v,w,y)=>{const x={value:0},M=jo(l,d,{deform:Xs[f],phase:y,rim:.18});M.transparent=!0,M.opacity=0;const k=new H(d.geometry,M);k.name=`creature-${f}-body`;const P=An(l,t,k,{ink:w,width:0,deform:Xs[f],phase:M.userData.phase,opacity:x});P.visible=!1;const T=Math.max(d.extent.x,d.extent.y,d.extent.z)*2;k.scale.copy(d.extent).multiplyScalar(p/T),k.castShadow=!0,d.geometry.boundingSphere&&(d.geometry.boundingSphere.radius*=1.6);const F=new mt;F.name=`creature-${f}`,F.add(k);const I={kind:f,root:F,body:k,outline:P,fade:x,shown:0,update:()=>{}};return F.userData.halfHeight=d.extent.y*(p/T),(s.prepare?s.prepare(F).catch(()=>{}):Promise.resolve()).then(()=>{a||(v.add(F),i.push(I))}),I},c=new g,h=(f,d)=>{const p=new g,v=new g;f.update=(w,y)=>{d(y,p),d(y+.35,v),f.root.position.copy(p),c.subVectors(v,p),f.root.rotation.set(0,Math.atan2(c.x,c.z),0,"YXZ"),f.root.rotation.x=-Math.atan2(c.y,Math.hypot(c.x,c.z))}};Zr("whale").then(f=>{if(a)return;const d=n("whale",f,7.5,o,"#2a2550",0);h(d,(v,w)=>{const y=v*.07+2.2;return w.set(Math.cos(y)*22,7.8+Math.sin(v*.21)*1.2,Math.sin(y)*22-8)});const p=d.update;d.update=(v,w,y)=>{p(v,w,y),d.root.rotation.z=Math.sin(w*.21+.6)*.08-.12}}).catch(f=>console.warn("[islandDive] creature failed","whale",f instanceof Error?f.message:f));{const f=gr();f.root.scale.setScalar(1.2);const d=new mt;d.name="creature-turtle",d.add(f.root);const p=new H;p.visible=!1;const v={kind:"turtle",root:d,body:p,outline:p,fade:{value:0},shown:0,update:()=>{},materials:f.materials,dispose:f.dispose},w=new g,y=new g,x=new g,M=new g;let k=!1;v.update=(T,F,I)=>{I.getWorldDirection(y),x.set(-y.z,0,y.x).normalize(),w.copy(I.position).addScaledVector(y,14).addScaledVector(x,2.6+Math.sin(F*.23)*1),w.y+=-2.6+Math.sin(F*.47)*.7,w.y=Math.max(w.y,ce+2.6),M.copy(d.position),k?d.position.lerp(w,1-Math.exp(-T*.9)):(d.position.copy(w),k=!0),c.subVectors(d.position,M),c.lengthSq()<1e-6&&c.copy(x).multiplyScalar(-1).add(y),d.rotation.set(0,Math.atan2(-c.z,c.x),Math.atan2(c.y,Math.hypot(c.x,c.z))*.6,"YXZ"),f.animate(F)},(s.prepare?s.prepare(d).catch(()=>{}):Promise.resolve()).then(()=>{a||(o.add(d),i.push(v))})}let u=null;{const f=$r(s.dolphin||{detail:"high"}),d=new H;d.visible=!1;const p={kind:"dolphin",root:f.root,body:d,outline:d,fade:{value:0},shown:0,update:(y,x,M)=>f.update(y,x,M),materials:f.materials,dispose:f.dispose},v=new mt;v.add(f.root,f.spray),(s.prepare?s.prepare(v).catch(()=>{}):Promise.resolve()).then(()=>{a||(o.add(f.root,f.spray),i.push(p),u=f)})}const m=[["serpent",f=>{const d=r("serpent",f,4.4,e,"#14324a",1.3);h(d,(w,y)=>{const x=-w*.085+2.75,M=13.2+Math.sin(w*.17)*.8;return y.set(Math.cos(x)*M,.12+Math.sin(w*.43)*.1,Math.sin(x)*M)});const p=d.update,v=new g;d.update=(w,y,x)=>{p(w,y,x),e.worldToLocal(x.getWorldPosition(v));const M=d.root.position,k=(M.x*v.x+M.z*v.z)/(Math.hypot(M.x,M.z)*Math.hypot(v.x,v.z)+1e-6),P=Math.min(1,Math.max(0,(k-.05)/.5));M.y-=P*P*(3-2*P)*2.6}}]];for(const[f,d]of m)qi(f).then(p=>{a||d(p)}).catch(p=>{console.warn("[islandDive] creature failed",f,p instanceof Error?p.message:p)});return{island:e,world:o,update(f,d,p){const v=p.position.y;for(const w of i){const y=w.kind==="dolphin"?!0:w.kind==="turtle"?v<-.6:w.kind==="serpent"?v>-12:v>-.35;if(w.root.visible=y,!y)continue;w.shown=Math.min(1,w.shown+f/1.2);const x=w.shown*w.shown*(3-2*w.shown);w.fade.value=x;const M=w.body.material;M.opacity=x,M.transparent=x<1;for(const k of w.materials||[])k.opacity=x,k.transparent=x<1||k.userData.seeThrough===!0;w.outline.material.transparent=x<1,w.update(f,d,p)}},dolphin:()=>u?.state()??null,dispose(){a=!0;for(const f of i){if(f.dispose){f.dispose();continue}f.body.geometry.dispose(),f.body.material.map?.dispose(),f.body.material.dispose(),f.outline.material.dispose()}e.removeFromParent(),o.removeFromParent()}}}const Ci=["#7fe0a0","#ffa0c4","#8cc8ff","#ffd36b","#c7a8ff"],tl=["#ffd98a","#ffc2d6","#c9eaa0"],Ti=[{kind:"palm",label:["椰子樹","Palm tree"],radius:.55},{kind:"tree",label:["圓圓樹","Round tree"],radius:.75},{kind:"blossom",label:["櫻花樹","Blossom tree"],radius:.75},{kind:"bush",label:["樹叢","Bush"],radius:.5},{kind:"flowers",label:["小花","Flowers"],radius:.32},{kind:"rocks",label:["石頭","Rocks"],radius:.5},{kind:"cottage",label:["小屋","Cottage"],radius:1.25},{kind:"lighthouse",label:["燈塔","Lighthouse"],radius:.6},{kind:"slime",label:["史萊姆","Slime"],radius:.45,looks:Ci.length},{kind:"jelly",label:["果凍方塊","Jelly cube"],radius:.5,looks:Ci.length},{kind:"pudding",label:["布丁","Pudding"],radius:.45,looks:tl.length}],el=32,sl=6,Ai={soda:{light:["#6fe0d6","#35a8d0","#3d5fb8"],dark:["#2f8fa8","#1c4f86","#0e1d4c"],label:["蘇打藍","Soda"]},mint:{light:["#8ff0cf","#2bc4a3","#138a86"],dark:["#2f8f86","#146a66","#0b3f4a"],label:["薄荷果凍","Mint jelly"]},grape:{light:["#d2c2ff","#9581ee","#5444b8"],dark:["#5b4aa6","#3a2f86","#211a5a"],label:["葡萄汽水","Grape soda"]},peach:{light:["#ffc9da","#ff92b6","#c9558a"],dark:["#9a4a74","#6f2f58","#43183a"],label:["草莓牛奶","Strawberry milk"]},lagoon:{light:["#8aeaff","#1aa6e6","#0b5fb5"],dark:["#1f6f99","#0f4c7a","#072d55"],label:["湛藍海灣","Lagoon"]}},Pi={tint:"soda",swell:1,ripple:1},ol=.6,_i=[{color:"#ffd98a",deep:"#d9902a",top:"#8a4b22"},{color:"#ffc2d6",deep:"#d4588a",top:"#b03a5c"},{color:"#c9eaa0",deep:"#6fa63a",top:"#3f6b25"}],il=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2,al=new W("#e6c99a"),nl=new W("#ecd6a8"),rl=new W("#bfae86"),ll=new g,cl=new W;class hl{island;items=[];history=[];nextId=1;seed=1;mask;vertexX;vertexZ;vertexY;buckets;grassBase=[];strokeProtect=null;strokeTouched=!1;sinceWater=0;cursor;cursorMaterial;onChange=null;constructor(t){this.island=t;const s=t.sculpt,e=s.size;this.mask=new Float32Array(e*e);for(let h=0;h<e;h++)for(let u=0;u<e;u++)this.mask[h*e+u]=pi(s.pointX(u),s.pointZ(h));const o=t.kit,i=o.terrain.geometry.getAttribute("position"),a=o.terrainVertices;this.vertexX=new Float32Array(a),this.vertexZ=new Float32Array(a),this.vertexY=new Float32Array(a);const n=e-1,r=Array.from({length:n*n},()=>[]);for(let h=0;h<a;h++){const u=i.getX(h),m=i.getZ(h);if(this.vertexX[h]=u,this.vertexZ[h]=m,this.vertexY[h]=i.getY(h),pi(u,m)<=.001)continue;const f=Math.floor((u+s.extent)/s.cell),d=Math.floor((m+s.extent)/s.cell);f<0||d<0||f>=n||d>=n||r[d*n+f].push(h)}this.buckets=r.map(h=>Int32Array.from(h));const c=o.grass;for(let h=0;h<c.count;h++){const u=new Float32Array(16);c.instanceMatrix.array.slice(h*16,h*16+16).forEach((m,f)=>{u[f]=m}),this.grassBase.push({x:u[12],y:u[13],z:u[14]})}this.cursorMaterial=new Is({color:"#ffffff",transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1,side:te}),this.cursor=new H(new ma(.9,1,64,1),this.cursorMaterial),this.cursor.renderOrder=20,this.cursor.visible=!1,this.cursor.name="workshop-cursor",t.top.add(this.cursor)}get canUndo(){return this.history.length>0}get itemCount(){return this.items.length}beginStroke(){this.remember(),this.strokeProtect=[...this.island.kit.protect,...this.items.map(t=>[t.x,t.z,this.specOf(t.kind).radius+.1])],this.strokeTouched=!1,this.sinceWater=0}brush(t,s,e,o,i){const a=this.island.sculpt,n=a.size,r=a.cell,c=a.data,h=this.strokeProtect||this.island.kit.protect,u=Math.max(1,Math.floor((t-o+a.extent)/r)),m=Math.min(n-2,Math.ceil((t+o+a.extent)/r)),f=Math.max(1,Math.floor((s-o+a.extent)/r)),d=Math.min(n-2,Math.ceil((s+o+a.extent)/r));if(u>m||f>d)return!1;const p=e==="raise"?.62:e==="lower"?-.62:0,v=c.slice(),w=e==="smooth"?Math.min(1,i*10):Math.min(1,i*2.2);let y=!1;for(let x=f;x<=d;x++)for(let M=u;M<=m;M++){const k=x*n+M,P=this.mask[k];if(P<=0)continue;const T=a.pointX(M),F=a.pointZ(x),I=Math.hypot(T-t,F-s);if(I>o)continue;let _=1;for(const[$,nt,ut]of h){const ft=Math.hypot(T-$,F-nt);ft<ut+.5&&(_=Math.min(_,dt(ut,ut+.5,ft)))}const V=Math.exp(-3.2*(I/o)**2)*(1-(I/o)**6)*P*_;if(V<=.001)continue;const N=c[k],R=(v[k-1]+v[k+1]+v[k-n]+v[k+n]+v[k]*4)/8,X=N+(R-N)*w*V;c[k]=Math.min(Zi,Math.max($i,X+p*i*V)),c[k]!==N&&(y=!0)}return y?(a.dirty=!0,this.strokeTouched=!0,this.updateTerrain(a.pointX(u)-r,a.pointZ(f)-r,a.pointX(m)+r,a.pointZ(d)+r),this.sinceWater+=i,this.sinceWater>.22&&(this.sinceWater=0,this.island.refreshWater()),!0):!1}endStroke(){this.strokeTouched||this.history.pop(),this.strokeProtect=null,this.strokeTouched&&(this.strokeTouched=!1,this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater(),this.changed())}updateTerrain(t,s,e,o){const i=this.island.sculpt,a=i.size-1,n=i.cell,r=this.island.kit.terrain.geometry,c=r.getAttribute("position"),h=r.getAttribute("normal"),u=r.getAttribute("color"),m=this.island.ground,f=Math.max(0,Math.floor((t+i.extent)/n)),d=Math.min(a-1,Math.floor((e+i.extent)/n)),p=Math.max(0,Math.floor((s+i.extent)/n)),v=Math.min(a-1,Math.floor((o+i.extent)/n)),w=.05;for(let M=p;M<=v;M++)for(let k=f;k<=d;k++)for(const P of this.buckets[M*a+k]){const T=this.vertexX[P],F=this.vertexZ[P],I=i.sample(T,F),_=this.vertexY[P]+I;c.setY(P,_);const O=-(m(T+w,F)-m(T-w,F))/(2*w),V=-(m(T,F+w)-m(T,F-w))/(2*w),N=Math.hypot(O,1,V);h.setXYZ(P,O/N,1/N,V/N);const R=cl.copy(Ji(ll.set(T,_,F)));I<-.02&&(R.lerp(nl,dt(Ke+.2,Ke+.04,_)),R.lerp(rl,dt(Ke+.02,Ke-.2,_))),Math.abs(I)>.02&&R.lerp(al,dt(.66,.46,1/N)*.75),u.setXYZ(P,R.r,R.g,R.b)}c.needsUpdate=!0,h.needsUpdate=!0,u.needsUpdate=!0;const y=this.island.kit.grass;let x=!1;this.grassBase.forEach((M,k)=>{if(M.x<t-.3||M.x>e+.3||M.z<s-.3||M.z>o+.3)return;const P=y.instanceMatrix.array,T=i.sample(M.x,M.z),F=M.y+T<Ke+.03&&T<-.02;P[k*16+13]=F?-50:M.y+T,x=!0}),x&&(y.instanceMatrix.needsUpdate=!0)}refreshAllTerrain(){const t=this.island.sculpt.extent;this.updateTerrain(-t,-t,t,t),this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater()}specOf(t){return Ti.find(s=>s.kind===t)}canPlace(t,s,e,o){const i=this.island;if(i.ground(s,e)<.18||i.pond.depthAt(s,e)>.005)return!1;const n=Math.atan2(e,s);if(Math.hypot(s,e)>i.kit.walkArea.swimReach(n)/1.45*.98)return!1;const r=.12;if(Math.hypot(i.ground(s+r,e)-i.ground(s-r,e),i.ground(s,e+r)-i.ground(s,e-r))/(2*r)>.9)return!1;const h=this.specOf(t).radius;for(const[u,m,f]of i.kit.protect)if(Math.hypot(s-u,e-m)<(f+h)*.72)return!1;for(const u of this.items)if(u!==o&&Math.hypot(s-u.x,e-u.z)<(this.specOf(u.kind).radius+h)*.8)return!1;return!(!o&&this.items.length>=el||!o&&t==="slime"&&this.items.filter(u=>u.kind==="slime").length>=sl)}place(t,s,e,o,i=Math.random()*Math.PI*2,a=!0){a&&this.remember();const n=this.build({id:`item-${this.nextId++}`,kind:t,x:e,z:o,yaw:i,look:s});return this.items.push(n),n.jelly?n.pop=0:this.island.wobble.pop(n.root),a&&this.changed(),n}beginMove(){this.remember()}moveTo(t,s,e){const o=this.items.find(a=>a.id===t.id);if(!o||!this.canPlace(o.kind,s,e,o))return!1;o.x=s,o.z=e;const i=this.island.ground(s,e);return o.walker?(o.walker.position.set(s,i-.02,e),o.walker.pause()):(o.root.position.x=s,o.root.position.z=e,o.root.position.y=i+(o.root.userData.lift??0),this.island.wobble.setBase(o.root,{x:s,y:i,z:e})),o.shadow&&o.shadow.position.set(s,i+.035,e),!0}endMove(t){if(!t){this.history.pop();return}this.changed()}rotate(t,s){const e=this.items.find(o=>o.id===t.id);e&&(this.remember(),e.yaw+=s,e.root.rotation.y+=s,this.island.wobble.poke(e.root,.5),e.jelly?.poke(),this.changed())}remove(t,s=!0){const e=this.items.findIndex(i=>i.id===t.id);if(e<0)return;s&&this.remember();const[o]=this.items.splice(e,1);this.destroy(o),s&&this.changed()}hitItem(t){let s=null,e=1/0;for(const o of this.items){const i=o.jelly?o.jelly.hit(t):t.intersectObject(o.root,!0)[0];i&&i.distance<e&&(s=o,e=i.distance)}return s}showCursor(t,s=1,e="ok"){if(!t){this.cursor.visible=!1;return}const o=this.cursor.geometry,i=o.getAttribute("position"),a=this.island.ground;for(let r=0;r<i.count;r++){const c=i.getX(r),h=i.getY(r),u=Math.hypot(c,h)||1,m=(u>.95?1:.9)*s,f=t.x+c/u*m,d=t.z+h/u*m;i.setXYZ(r,f,a(f,d)+.06,d)}i.needsUpdate=!0,o.computeBoundingSphere(),this.cursor.position.set(0,0,0),this.cursor.rotation.set(0,0,0);const n={raise:"#9df0c6",lower:"#9fd6ff",smooth:"#fff1c9",ok:"#ffffff",blocked:"#ff7a8a"};this.cursorMaterial.color.set(n[e]),this.cursor.visible=!0}update(t){for(const s of this.items)!s.jelly||s.pop>=1||(s.pop=Math.min(1,s.pop+t/.45),s.jelly.group.scale.setScalar(s.scale*Math.max(.001,il(s.pop))),s.pop>=1&&s.jelly.land(3))}snapshotItems(){return this.items.map(({id:t,kind:s,x:e,z:o,yaw:i,look:a})=>({id:t,kind:s,x:Number(e.toFixed(3)),z:Number(o.toFixed(3)),yaw:Number(i.toFixed(3)),look:a}))}load(t){for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.decode(t.sculpt),this.refreshAllTerrain();for(const s of t.items){if(!this.canPlace(s.kind,s.x,s.z))continue;const e=this.build({...s,id:`item-${this.nextId++}`});this.items.push(e)}this.history.length=0}reset(){this.remember();for(const t of[...this.items])this.remove(t,!1);this.island.sculpt.clear(),this.refreshAllTerrain(),this.changed()}undo(){const t=this.history.pop();if(!t)return!1;for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.restore(t.sculpt),this.refreshAllTerrain();for(const s of t.items)this.items.push(this.build(s));return this.onChange?.(),!0}remember(){this.history.push({sculpt:this.island.sculpt.snapshot(),items:this.snapshotItems()}),this.history.length>30&&this.history.shift()}changed(){this.onChange?.()}build(t){const s=this.island,e=s.kit,o=s.top,i=s.ground(t.x,t.z),a={...t,root:new mt,shadow:null,jelly:null,walker:null,owned:[],pop:1,scale:1},n=this.specOf(t.kind),r=(u,m=e.solid)=>{const f=new ta(()=>0);u(f);const d=f.solid.build(!0);a.owned.push(d);const p=new H(d,m);return p.castShadow=!0,p.receiveShadow=!0,p},c=(u,m=0)=>{u.position.set(t.x,i+m,t.z),u.rotation.y=t.yaw,u.userData.lift=m,u.name=u.name||`workshop-${t.kind}`,o.add(u),s.wobble.add(u,{x:t.x,y:i,z:t.z}),a.root=u},h=(u,m,f,d)=>{const p=e.models[u];if(!p)return!1;const v=e.placeModel(p,{x:t.x,z:t.z,height:m,yaw:t.yaw,sink:f,wind:d,y:i});return v.userData.lift=v.position.y-i,a.root=v,!0};switch(t.kind){case"palm":h("palm",3.2,.12,.04)||c(r(u=>u.palm({x:0,z:0},.9,.8,0)));break;case"tree":case"blossom":c(Gi(t.kind,11+this.seed++%7,e.treeMaterials,t.kind==="tree"?2.6:2.8),-.06);break;case"bush":c(r(u=>u.bush({x:0,z:0},.75)));break;case"flowers":c(r(u=>{const m=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"];for(let f=0;f<4;f++){const d=f*1.7+t.look,p=f?.17:0;u.flower({x:Math.cos(d)*p,z:Math.sin(d)*p},m[(f+Math.round(Math.abs(t.yaw)*3))%m.length])}}));break;case"rocks":h("rocks",.62,.18)||c(r(u=>u.rock({x:0,z:0},.45)));break;case"cottage":h("cottage",2.6,.08)||c(r(u=>u.house({x:0,z:0},0,"#ec6a5c","#8f5a3a")));break;case"lighthouse":c(r(u=>u.lighthouse({x:0,z:0}),e.still));break;case"slime":case"jelly":case"pudding":{const u=t.kind==="pudding"?_i[t.look%_i.length]:Xo[t.look%Xo.length],m=new xe(t.kind==="slime"?"slime":t.kind==="jelly"?"cube":"pudding",u,e.env,{face:t.kind==="slime",seed:20+this.seed++,outlines:e.outlines});a.scale=t.kind==="slime"?.52:t.kind==="jelly"?.42:.5,m.group.position.set(t.x,i-.02,t.z),m.group.scale.setScalar(a.scale),m.group.rotation.y=t.yaw,m.group.name=`workshop-${t.kind}`,o.add(m.group),a.jelly=m,a.root=m.group,s.jellies.push(m),a.shadow=e.addShadow(t.x,t.z,.95*a.scale,.3),t.kind==="slime"&&(a.walker=new ji(m,e.walkArea,s.walkers,a.shadow,s.walkers.length+1),s.walkers.push(a.walker));break}}return a.shadow||(a.shadow=e.addShadow(t.x,t.z,n.radius*1.5,.26)),a.shadow.position.y=i+.035,a}destroy(t){const s=this.island;if(s.wobble.remove(t.root),t.root.removeFromParent(),t.jelly){const e=s.jellies.indexOf(t.jelly);e>=0&&s.jellies.splice(e,1),t.jelly.dispose()}if(t.walker){const e=s.walkers.indexOf(t.walker);e>=0&&s.walkers.splice(e,1)}t.shadow&&(t.shadow.removeFromParent(),t.shadow.geometry.dispose(),t.shadow.material.dispose()),t.owned.forEach(e=>e.dispose())}async thumbnails(t,s,e,o){const a=new No(128,128,{type:Do,format:Qo,samples:4}),n=new Di;n.environment=s,n.environmentIntensity=.32;const r=new Oo("#fff0d4",2.2);r.position.set(3,6,4),n.add(r,new Wi("#cfeeff","#a5cf7f",1.2),new ga("#ffffff",.15));const c=new Jo(30,1,.05,60),h=new Uint16Array(16384*4),u=document.createElement("canvas");u.width=u.height=128;const m=u.getContext("2d"),f={},d=this.island.kit.env,p={sun:d.uSunDir.value.clone(),sunColor:d.uSunColor.value.clone(),sky:d.uSkyColor.value.clone(),ground:d.uGroundColor.value.clone(),night:d.uNight.value};d.uSunDir.value.set(.45,.78,.42).normalize(),d.uSunColor.value.set("#fff1d6"),d.uSkyColor.value.set("#bfe6ff"),d.uGroundColor.value.set("#9cc46e"),d.uNight.value=0;const v=t.getRenderTarget();try{for(const w of Ti){if(!e()||!m)break;const y=this.build({id:"thumb",kind:w.kind,x:0,z:0,yaw:.6,look:0}),x=y.root;this.island.wobble.remove(x),x.removeFromParent(),x.position.set(0,y.jelly?0:x.userData.lift??0,0),x.updateMatrixWorld(!0),n.add(x),y.jelly&&(y.jelly.group.scale.setScalar(1),y.jelly.update(.016,0));const M=new g,k=y.jelly?y.jelly.height:Math.max(.6,this.boundsHeight(x));M.set(0,k*.5,0);const P=Math.max(k,w.radius*2.2)*2.25;c.position.set(P*.62,k*.55+P*.42,P*.78),c.lookAt(M),t.setRenderTarget(a),t.setClearColor(0,0),t.clear(),t.render(n,c),t.readRenderTargetPixels(a,0,0,128,128,h);const T=m.createImageData(128,128);for(let F=0;F<128;F++)for(let I=0;I<128;I++){const _=((127-F)*128+I)*4,O=(F*128+I)*4,V=Re(oi.fromHalfFloat(h[_+3]));for(let N=0;N<3;N++){const R=Math.max(0,oi.fromHalfFloat(h[_+N]))/Math.max(V,1e-4)*1.02,X=R<.76?R:.76+(1-.76)*(1-Math.exp(-(R-.76)/(1-.76))),$=X<=.0031308?X*12.92:1.055*X**(1/2.4)-.055;T.data[O+N]=Math.round(Re($)*255)}T.data[O+3]=Math.round(V*255)}m.putImageData(T,0,0),f[w.kind]=u.toDataURL("image/png"),n.remove(x),this.island.top.add(x),this.destroy(y),await o()}}finally{t.setRenderTarget(v),a.dispose(),d.uSunDir.value.copy(p.sun),d.uSunColor.value.copy(p.sunColor),d.uSkyColor.value.copy(p.sky),d.uGroundColor.value.copy(p.ground),d.uNight.value=p.night}return f}boundsHeight(t){let s=0;return t.traverse(e=>{const o=e;if(!o.isMesh)return;o.geometry.computeBoundingBox();const i=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);s=Math.max(s,i.max.y)}),s}dispose(){for(const t of[...this.items])this.destroy(t);this.items.length=0,this.cursor.removeFromParent(),this.cursor.geometry.dispose(),this.cursorMaterial.dispose()}}function Al(){try{if((navigator.deviceMemory??8)<2)return!1;const s=document.createElement("canvas").getContext("webgl2");return s?(s.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}let Ps=null;function Ii(){if(Ps!==null)return Ps;try{const t=document.createElement("canvas").getContext("webgl2");Ps=!!t?.getExtension("EXT_color_buffer_float"),t?.getExtension("WEBGL_lose_context")?.loseContext()}catch{Ps=!1}return Ps}function ul(){const l=navigator,t=l.deviceMemory??8,s=l.hardwareConcurrency??8,e=window.matchMedia("(pointer: coarse)").matches,o=t<=2||s<=2?"low":e||t<=4||s<=4?"medium":"high";return Ia(o)}const ws={high:{dpr:1.6,antialias:!0,shadow:2048,detail:"high",segments:168,frameMs:0,bloom:!0,swarm:1,school:{width:128,baitBall:10240,reef:1536},ripples:256},medium:{dpr:1.5,antialias:!0,shadow:1024,detail:"low",segments:120,frameMs:0,bloom:!1,swarm:.5,school:{width:64,baitBall:3584,reef:640},ripples:160},low:{dpr:1,antialias:!1,shadow:0,detail:"low",segments:96,frameMs:1e3/32,bloom:!1,swarm:.3,school:null,ripples:0}},dl=13,fl=`
uniform float uScale;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 120.0 * uScale / -mvPosition.z;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mvPosition;
}
`,pl=`
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float star = max(1.0 - smoothstep(0.0, 0.06, abs(c.x)) * 1.0, 0.0) * (1.0 - smoothstep(0.0, 0.5, abs(c.y)));
  star = max(star, (1.0 - smoothstep(0.0, 0.06, abs(c.y))) * (1.0 - smoothstep(0.0, 0.5, abs(c.x))));
  float glow = 1.0 - smoothstep(0.0, 0.5, length(c));
  float a = (star * 0.9 + glow * glow * 0.6) * vAlpha;
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.45), a);
}
`,Ro=l=>l*l*(3-2*l),ml=new g(Math.sin(no)*18.5,-.7,Math.cos(no)*18.5),gl=new g(0,-2.2,0),qe=l=>Math.min(1,Math.max(0,l));async function vl(l){const t={},s=Promise.allSettled(_a.map(e=>Oi(e).then(o=>{t[e]=Hi(e,o)})));return await Promise.race([s,new Promise(e=>window.setTimeout(e,l))]),{...t}}const hs=()=>new Promise(l=>{const t=globalThis.scheduler;t?.yield?t.yield().then(l):window.setTimeout(l,0)});class Pl{options;renderer;scene=new Di;camera=new Jo(36,1,.1,900);env=Na();hemi=new Wi("#cfeeff","#a5cf7f",1.2);sun=new Oo("#fff0d4",2.2);fill=new Oo("#ff9f86",.6);fog=new va("#d3effa",.0055);depthLight={value:new W("#bff3ff")};outlines=rn();post=null;environment=null;creatures=null;island;ocean=null;oceanPending=!1;seaCreatures=[];sky;sparkles;booted=!1;sparkleState=[];raycaster=new wa;pointer=new bt;leapRay=new ya;leapPoint=new g;leapEye=new g;leapHit=new g;tier;theme;night=0;nightTarget=0;frame=0;frameCount=0;frameTimes=0;lastTime=0;lastRender=0;elapsed=0;running=!1;destroyed=!1;pixelRatio=1;width=1;height=1;camPos=new g(0,12,26);camTarget=new g(0,1.3,0);posed=!1;yaw=-.18;yawVel=0;idleFor=0;bladeVel=.8;ballSpin=new g;drag=null;sword=null;played=!1;hoverQueued=null;handAt=null;handDown=!1;touched=!1;overChest=!1;chestOpenedAt=-10;slowFrames=0;sampledFrames=0;downgraded=0;dprSteps=0;lastCalls=0;thinned=!1;resizeObserver=null;cleanups=[];scrollY=0;heroHeight=1;scrollRange=1;depth=0;framingKey="";scratchVectors=Array.from({length:6},()=>new g);scratchColors=[new W,new W];below={fog:new W,glow:new W,abyss:new W,density:0,hemi:0,light:new W};worldPos=new g;spinQuat=new be;spinAxis=new g;scare={origin:new g,dir:new g,strength:0};scareAt=-10;swarmProbe=new g;slot=null;swell={height:0,slopeX:0,slopeZ:0};ripplePoint=new g;lastRipple={t:-10,at:new g};ripples;hoverWater=null;spin={omega:0,alpha:0,lastYaw:-.18};ambientRipple=0;slimeTrails=new Map;workshop=null;editing=!1;tool={kind:"raise",size:1.1};selectedId=null;water={...Pi};designTimer=0;constructor(t){this.options=t,this.theme=t.theme,this.night=this.nightTarget=t.theme==="dark"?1:0,this.tier=t.tier||ul();const s=ws[this.tier],e=s.bloom&&Ii();if(this.renderer=new xa({canvas:t.canvas,antialias:s.antialias&&!e,alpha:!1,powerPreference:this.tier==="high"?"high-performance":"default",stencil:!1}),this.renderer.toneMapping=ba,this.renderer.info.autoReset=!1,this.renderer.toneMappingExposure=1.02,this.renderer.localClippingEnabled=!0,s.shadow){this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ma,this.sun.castShadow=!0,this.sun.shadow.mapSize.set(s.shadow,s.shadow);const o=this.sun.shadow.camera;o.left=-10,o.right=10,o.top=10,o.bottom=-10,o.near=1,o.far=60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=6}this.ripples=s.ripples&&Pa(this.renderer)?new Aa(this.renderer,{size:s.ripples,extent:dl,speed:2.2,damping:.988}):null,this.ripples&&(this.ripples.uniforms.uRippleAmp.value=3),this.scene.fog=this.fog,this.scene.background=new W("#d3effa"),this.scene.add(this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.boot(e)}async boot(t){const s=this.options,e=ws[this.tier],o=(f,d)=>{this.destroyed||s.onProgress?.(f,d)};if(o(.08,"sky"),await hs(),this.destroyed||(this.sky=mn(this.env,e.detail),await hs(),this.destroyed))return;o(.16,"light");const i=new Sa(this.renderer);if(this.environment=i.fromScene(new za,.04).texture,i.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=.32,await hs(),this.destroyed)return;o(.24,"models");const a=await vl(7e3);if(this.destroyed)return;if(o(.5,"island"),this.island=await $n(this.env,{segments:e.segments,detail:e.detail,outlines:this.outlines,models:a,ripples:this.ripples,vertexRipples:this.renderer.capabilities.maxVertexTextures>0},hs),this.destroyed){this.island.dispose();return}this.workshop=new hl(this.island),this.workshop.onChange=()=>this.workshopChanged();const n=s.design;n&&(this.workshop.load(n),this.water={...n.water},xe.softness=n.soft,this.applyWater()),o(.72,"island"),this.sword=new dr(this.island,this.scene,this.camera,f=>{this.options.onSword?.(f),f||this.options.root.querySelectorAll("[data-island-surface]").forEach(d=>{d.style.cursor===Hs&&(d.style.cursor="")})}),this.sword.propTargets=()=>{const f=this.island;return[...f.top.children.filter(d=>d.name.startsWith("model-")),f.blades,f.boat,f.ball,f.bottle,f.pier,...f.gulls.filter(d=>!d.userData.arriving),...this.creatures?[...this.creatures.island.children,...this.creatures.world.children].filter(d=>d.name.startsWith("creature-")):[]]},this.island.onSlimeSplash((f,d)=>{const p=this.island.top.localToWorld(f.clone());this.island.ripple(p.x,p.z,1.4+Math.min(1.2,d*.08)),window.setTimeout(()=>{this.destroyed||this.island.ripple(p.x+.15,p.z-.1,.9)},160),this.markPlayed()});for(const f of Object.values(a))for(const d of[f.map,f.normalMap])if(d&&(this.renderer.initTexture(d),await hs(),this.destroyed))return;this.scene.add(this.sky.group,this.island.group,this.island.seaSparkles),this.island.group.rotation.y=this.yaw;const r=18,c=new Bt;c.setAttribute("position",new K(new Float32Array(r*3),3)),c.setAttribute("aAlpha",new K(new Float32Array(r),1)),this.sparkles=new Ae(c,new pt({uniforms:{uScale:{value:1}},vertexShader:fl,fragmentShader:pl,transparent:!0,depthWrite:!1,blending:he})),this.sparkles.frustumCulled=!1,this.sparkles.renderOrder=10;for(let f=0;f<r;f++)this.sparkleState.push({pos:new g,vel:new g,life:0});if(this.island.top.add(this.sparkles),this.applyTheme(!0),t)try{this.post=new Ra(this.renderer,{rays:!0})}catch{this.post=null}s.canvas.dataset.tier=this.tier,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(s.canvas),s.islandSlot&&this.resizeObserver.observe(s.islandSlot),this.resize(),this.readScroll();const h=()=>this.readScroll();s.scroller.addEventListener("scroll",h,{passive:!0}),this.cleanups.push(()=>s.scroller.removeEventListener("scroll",h));const u=()=>{document.hidden?this.stop():this.start()};document.addEventListener("visibilitychange",u),this.cleanups.push(()=>document.removeEventListener("visibilitychange",u));const m=f=>{f.preventDefault(),this.stop(),s.onFallback?.("context-lost")};s.canvas.addEventListener("webglcontextlost",m),this.cleanups.push(()=>s.canvas.removeEventListener("webglcontextlost",m)),this.bindPointer(),await hs(),!this.destroyed&&(o(.86,"shaders"),this.post?await this.post.compileAsync(this.scene,this.camera,()=>!this.destroyed):await Zs(this.renderer,this.scene,this.camera,()=>!this.destroyed),!this.destroyed&&(this.booted=!0,this.start()))}ensureOcean(t=!1){if(this.destroyed)return;if(this.ocean){t&&!this.ocean.group.parent&&this.scene.add(this.ocean.group);return}const s=ws[this.tier],e=s.school&&Ii()&&this.renderer.capabilities.maxVertexTextures>0?{renderer:this.renderer,...s.school}:null,o=jr(this.env,this.depthLight,s.detail,s.swarm,e);if(this.ocean=o,o.setTheme(this.theme==="dark"),o.setCreatures(this.seaCreatures,this.creatureCap()),this.thinned&&o.thinSchool(.5),t){this.scene.add(o.group);return}Zs(this.renderer,o.group,this.camera,()=>!this.destroyed,this.scene).then(()=>{!this.destroyed&&!o.group.parent&&this.scene.add(o.group)})}setCreatures(t){this.seaCreatures=t,this.ocean?.setCreatures(t,this.creatureCap())}setBottleHidden(t){this.island&&(this.island.bottle.visible=!t)}bottleScreen(){if(!this.island)return null;const t=this.options.canvas.getBoundingClientRect(),s=this.island.bottle.getWorldPosition(new g).project(this.camera);return{x:Math.round(t.left+(s.x+1)/2*t.width),y:Math.round(t.top+(1-s.y)/2*t.height)}}showCreature(t){return this.ocean?.showCreature(t)??!1}creatureScreen(t){const s=this.ocean?.creatureAt(t);if(!s)return null;const e=this.options.canvas.getBoundingClientRect();return s.project(this.camera),s.z>1||Math.abs(s.x)>1||Math.abs(s.y)>1?null:[Math.round(e.left+(s.x+1)/2*e.width),Math.round(e.top+(1-s.y)/2*e.height)]}creatureCap(){const t=typeof window<"u"&&window.matchMedia("(pointer: coarse)").matches;return this.tier==="high"&&!t?40:18}setTheme(t){if(this.theme=t,this.nightTarget=t==="dark"?1:0,!this.island){this.night=this.nightTarget;return}this.applyTheme(!1)}setEditing(t){if(this.editing!==t){if(this.editing=t,this.idleFor=0,this.yawVel=0,this.workshop?.showCursor(null),this.island)for(const s of this.island.gulls)s.visible=!t;t&&this.sword?.armed&&(this.island&&(this.island.chest.open=!1),this.sword.putBack()),t||this.select(null),this.framingKey=""}}setTool(t){this.tool=t,this.workshop?.showCursor(null)}nudgeYaw(t){this.yawVel+=t*2.2,this.idleFor=0}rotateSelected(t){const s=this.selectedItem();s&&this.workshop&&this.workshop.rotate(s,t)}removeSelected(){const t=this.selectedItem();!t||!this.workshop||(this.workshop.remove(t),this.select(null))}undo(){this.workshop?.undo()&&(this.selectedId&&!this.workshop.items.some(t=>t.id===this.selectedId)?this.select(null):this.workshopChanged())}resetDesign(){this.workshop&&(this.select(null),this.workshop.reset(),this.water={...Pi},xe.softness=ol,this.applyWater(),this.workshopChanged())}setWater(t){this.water={...this.water,...t},this.applyWater(),this.workshopChanged()}setSoftness(t){if(xe.softness=Math.min(1,Math.max(0,t)),this.island){for(const s of this.island.jellies)s.poke();this.island.wobble.nudgeAround(0,0,9,.6)}this.workshopChanged()}async thumbnails(){return this.workshop?this.workshop.thumbnails(this.renderer,this.environment,()=>!this.destroyed,hs):{}}design(){return!this.workshop||!this.island?null:{v:1,sculpt:this.island.sculpt.encode(),items:this.workshop.snapshotItems(),water:{...this.water},soft:Number(xe.softness.toFixed(2))}}selectedItem(){return this.selectedId?this.workshop?.items.find(t=>t.id===this.selectedId)??null:null}select(t){this.selectedId=t?.id??null,this.workshopChanged(!1)}workshopChanged(t=!0,s=!1){const e=this.workshop;if(!e)return;const o=this.selectedItem();this.options.onWorkshop?.({selected:o?{id:o.id,kind:o.kind}:null,canUndo:e.canUndo,items:e.itemCount,blocked:s}),t&&(window.clearTimeout(this.designTimer),this.designTimer=window.setTimeout(()=>{const i=this.design();i&&!this.destroyed&&this.options.onWorkshop?.({selected:this.selectedItem()?{id:this.selectedId,kind:this.selectedItem().kind}:null,canUndo:e.canUndo,items:e.itemCount,design:i})},450))}applyWater(){this.island&&(this.island.seaUniforms.uSwellScale.value=this.water.swell,this.ripples&&(this.ripples.strength=this.water.ripple),this.applyTheme(!1))}destroy(){this.destroyed||(this.destroyed=!0,this.stop(),this.resizeObserver?.disconnect(),this.cleanups.forEach(t=>t()),this.sword?.dispose(),this.workshop?.dispose(),this.ripples?.dispose(),window.clearTimeout(this.designTimer),this.island&&(this.island.jellies.forEach(t=>t.dispose()),this.island.dispose()),this.ocean?.dispose(),this.creatures?.dispose(),this.sky?.dispose(),this.sparkles&&(this.sparkles.geometry.dispose(),this.sparkles.material.dispose()),this.post?.dispose(),this.environment?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss())}start(){if(!this.booted||this.running||this.destroyed||document.hidden)return;this.running=!0,this.lastTime=performance.now();const t=s=>{if(!this.running)return;this.frame=requestAnimationFrame(t);const e=ws[this.tier].frameMs;if(e&&s-this.lastRender<e-1)return;const o=Math.min(.05,Math.max(.001,(s-this.lastTime)/1e3));this.lastTime=s,this.lastRender=s,this.tick(o),this.watchSpeed(o)};this.frame=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.frame)}watchSpeed(t){document.hidden||this.options.adaptive===!1||(this.sampledFrames++,!(this.sampledFrames<30)&&(t>.045?this.slowFrames++:this.slowFrames=Math.max(0,this.slowFrames-.25),!(this.slowFrames<24)&&(this.slowFrames=0,this.downgraded++,this.downgraded===1&&ai(this.tier,this.tier==="high"?"medium":"low"),this.post?(this.post.dispose(),this.post=null):this.thinned?this.dprSteps<2?(this.dprSteps++,this.pixelRatio=Math.max(.7,this.pixelRatio*.78),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.outlines.uResolution.value.set(this.width*this.pixelRatio,this.height*this.pixelRatio),this.outlines.uWidth.value=(this.width<700?1.25:1.6)*this.pixelRatio):this.renderer.shadowMap.enabled?(this.renderer.shadowMap.enabled=!1,this.sun.castShadow=!1):(this.stop(),ai(this.tier,"static"),this.options.onFallback?.("slow")):(this.thinned=!0,this.ocean?.thinSchool(.5)))))}resize(){const t=this.options.canvas,s=Math.max(1,t.clientWidth),e=Math.max(1,t.clientHeight);this.width=s,this.height=e,this.downgraded||(this.pixelRatio=Math.min(window.devicePixelRatio||1,ws[this.tier].dpr)),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(s,e,!1),this.post?.setSize(s,e,this.pixelRatio),this.outlines.uResolution.value.set(s*this.pixelRatio,e*this.pixelRatio),this.outlines.uWidth.value=(s<700?1.25:1.6)*this.pixelRatio,this.framingKey="",this.measureSlot(),this.readScroll()}measureSlot(){const t=this.options.islandSlot;if(!t){this.slot=null;return}const s=t.getBoundingClientRect(),e=this.options.canvas.getBoundingClientRect(),o=this.options.root.getBoundingClientRect();if(s.width<10||s.height<10){this.slot=null;return}this.slot={cx:s.left-e.left+s.width/2,cy:s.top-o.top+s.height/2,w:s.width,h:s.height},this.framingKey=""}heroFraming(){const t=this.width,s=this.height,e=t/s,o=e<.8?46:e<1.2?40:34,i=this.slot||{cx:t/2,cy:s*.62,w:t*.9,h:s*.6},a=Math.max(70,Math.min(i.w*.78,i.h*.98)),n=Math.min(90,Math.max(16,10*(s/2)/(a*Math.tan(o*Math.PI/360))));return{fov:o,px:i.cx,py:i.cy,radius:n,elevation:ii(t,s)==="wide"?.27:.46}}applyFraming(t){const s=this.width,e=this.height,o=this.heroFraming(),i=s/2+(o.px-s/2)*t,a=e/2+(o.py-e/2)*t,n=`${s}x${e}:${i.toFixed(1)}:${a.toFixed(1)}:${o.fov}`;if(n===this.framingKey)return;this.framingKey=n;const r=i>=s/2?2*i:2*(s-i),c=i>=s/2?0:r-s,h=a>=e/2?2*a:2*(e-a),u=a>=e/2?0:h-e,m=Math.tan(o.fov*Math.PI/360);this.camera.fov=Math.atan(m*(h/e))*360/Math.PI,this.camera.aspect=r/h,Math.abs(r-s)>.5||Math.abs(h-e)>.5?this.camera.setViewOffset(r,h,c,u,s,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}readScroll(){const{scroller:t,root:s,hero:e}=this.options,o=s.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;this.scrollY=Math.max(0,t.scrollTop-o),this.heroHeight=Math.max(1,e.offsetHeight),this.scrollRange=Math.max(this.heroHeight+1,s.scrollHeight-t.clientHeight)}heroPose(t,s){let{radius:e,elevation:o}=this.heroFraming();this.editing&&(o=Math.max(o,.46)+.14,e*=ii(this.width,this.height)==="wide"?1.02:1.1),t.set(0,Math.sin(o)*e+1,Math.cos(o)*e),s.set(0,1,0)}desiredPose(t,s){if(this.editing)return this.heroPose(t,s),{a:0,d:0};const e=this.heroHeight*.9,o=qe(this.scrollY/e),i=qe((this.scrollY-e)/Math.max(1,this.scrollRange-e)),[a,n,r,c]=this.scratchVectors;this.heroPose(a,n);const h=Ro(o);if(t.lerpVectors(a,ml,h),s.lerpVectors(n,gl,h),i>0){$e(i,r,c);const u=Ro(qe(i/.12));t.lerp(r,u),s.lerp(c,u)}return{a:o,d:i}}tick(t){this.renderer.info.reset(),this.elapsed+=t;const s=this.elapsed;this.env.uTime.value=s,Math.abs(this.night-this.nightTarget)>.001&&(this.night+=(this.nightTarget-this.night)*(1-Math.exp(-t*4)),this.applyTheme(!1));const e=this.scratchVectors[4],o=this.scratchVectors[5],{a:i,d:a}=this.desiredPose(e,o);this.applyFraming(1-Ro(qe(i*1.15))),this.posed||(this.camPos.copy(e),this.camTarget.copy(o),this.posed=!0);const n=1-Math.exp(-t*6.5);this.camPos.lerp(e,n),this.camTarget.lerp(o,n),this.camera.position.copy(this.camPos);const r=this.camPos.distanceTo(this.camTarget)*.0016;this.camera.position.x+=Math.sin(s*.37)*r,this.camera.position.y+=Math.sin(s*.53+1.3)*r*.7,this.camera.lookAt(this.camTarget);const c=this.camera.position.y,h=qe((.25-c)/.6);this.depth=Math.max(0,-c),this.env.uUnder.value=h,this.env.uDepth.value=this.depth,this.env.uGlow.value=qe((this.depth-14)/26)*(.55+this.night*.45),this.applyDepth(h),this.idleFor+=t,(!this.drag||this.drag.kind!=="turn")&&(this.yawVel*=Math.exp(-t*2.4),this.idleFor>5&&i<.4&&!this.editing&&(this.yawVel+=(.045-this.yawVel)*(1-Math.exp(-t*.6))),this.yaw+=this.yawVel*t),this.island.group.rotation.y=this.yaw;const u=(this.yaw-this.spin.lastYaw)/t;this.spin.lastYaw=this.yaw;const m=this.spin.omega+(u-this.spin.omega)*(1-Math.exp(-t*18));this.spin.alpha=Math.max(-60,Math.min(60,(m-this.spin.omega)/t)),this.spin.omega=m;const f=c>-.35;this.island.top.visible=f,this.island.boat.visible=f,this.island.sea.visible=c>-30,this.island.seaSparkles.visible=c>.05,this.island.seaSparkleUniforms.uScale.value=this.pixelRatio*Math.min(1.4,this.height/800),this.island.column.visible=c<4,this.sky.group.visible=h<.999,this.renderer.shadowMap.autoUpdate=c>-2,f&&this.updateIsland(t,s),this.ripples&&this.island.sea.visible&&(f&&this.ambientRipples(t,s),this.ripples.step(t)),this.scare.strength=qe(1-(s-this.scareAt)/.9),!this.ocean&&(this.depth>0||this.scrollY>this.heroHeight*.35)&&this.ensureOcean(!0),this.ocean?.update(t,s,this.camera,this.depth,this.pixelRatio*this.height/800,this.scare.strength>0?this.scare:null),this.sky.clouds.rotation.y=s*.006,this.creatures?.update(t,s,this.camera);const d=this.options.canvas;if(this.frameCount++,this.frameTimes+=t,this.frameCount%60===0&&(d.dataset.ms=(this.frameTimes/60*1e3).toFixed(1),d.dataset.calls=String(this.lastCalls),this.frameTimes=0),this.frameCount%30===2&&f&&(d.dataset.targets=JSON.stringify(this.screenTargets())),this.frameCount%10===1&&this.depth>30){const p=this.ocean?.swarmStats(this.swarmProbe)??{spread:0},v=d.getBoundingClientRect(),w=this.swarmProbe.clone().project(this.camera);d.dataset.swarm=JSON.stringify({x:Math.round(v.left+(w.x+1)/2*v.width),y:Math.round(v.top+(1-w.y)/2*v.height),spread:Number(p.spread.toFixed(2))})}if(this.frameCount%10===1){d.dataset.depth=this.depth.toFixed(1),d.dataset.scare=this.scare.strength.toFixed(2),d.dataset.dive=a.toFixed(3),d.dataset.hero=i.toFixed(3);const p=this.options.depthLabel;if(p?.parentElement?.classList.toggle("is-visible",this.depth>.4),p&&this.options.depthText){const v=this.options.depthText(Math.round(this.depth*18));p.textContent!==v&&(p.textContent=v)}}if(this.post?(this.post.bloom.strength=.3+this.env.uGlow.value*.45+this.night*.12,this.post.rays=this.post.setLight(this.env.uSunDir.value,this.camera)*(1-this.env.uUnder.value)*(.5+this.night*.4),this.post.render(this.scene,this.camera,1)):this.renderer.render(this.scene,this.camera),this.lastCalls=this.renderer.info.render.calls,!d.dataset.ready){if(d.dataset.ready="1",this.options.onReady?.(),!this.oceanPending){this.oceanPending=!0;const p=window.requestIdleCallback;p?p(()=>this.ensureOcean(),{timeout:2500}):window.setTimeout(()=>this.ensureOcean(),900)}this.creatures=Jr(this.env,this.outlines,{islandHost:this.island.group,prepare:p=>Zs(this.renderer,p,this.camera,()=>!this.destroyed,this.scene),dolphin:{detail:ws[this.tier].detail,canLeap:(p,v)=>this.dolphinCanLeap(p,v),onSplash:(p,v)=>{this.camera.position.y>-.35&&this.island.ripple(p.x,p.z,v)}}}),this.scene.add(this.creatures.world)}if(this.hoverQueued){const{x:p,y:v,target:w}=this.hoverQueued;this.hoverQueued=null,this.updateHover(p,v,w)}}ambientRipples(t,s){const e=this.island;if(this.ambientRipple+=t,this.ambientRipple>1.1){this.ambientRipple=0;const o=e.boat.position,i=e.bottle.position;e.rippleLocal(o.x+Math.sin(s)*.55,o.z+Math.cos(s)*.55,.22),e.rippleLocal(i.x,i.z,.18)}for(const o of e.walkers){if(!o.swimming){this.slimeTrails.delete(o);continue}const i=o.position,a=this.slimeTrails.get(o);a&&Math.hypot(i.x-a.x,i.z-a.z)>.04?(e.ripples?.trail(a.x,a.z,i.x,i.z,-.025,.22),a.x=i.x,a.z=i.z):a||this.slimeTrails.set(o,{x:i.x,z:i.z})}}updateIsland(t,s){const e=this.island,o=this.worldPos;for(const d of e.jellies)d.update(t,s);e.wobble.update(t,this.spin),this.workshop?.update(t),this.drag?.kind==="sculpt"&&this.drag.at&&this.workshop&&this.tool.kind!=="place"&&this.tool.kind!=="move"&&(this.workshop.brush(this.drag.at.x,this.drag.at.z,this.tool.kind,this.tool.size,t),Math.random()<t*6&&e.wobble.nudgeAround(this.drag.at.x,this.drag.at.z,this.tool.size*2.2,this.tool.kind==="lower"?-.25:.25));const i=e.top.worldToLocal(o.copy(this.camera.position));for(const d of e.walkers)d.update(t,i);if(this.sword&&(this.sword.viewHeight=this.height,this.sword.setHand(...this.handPose()),this.sword.update(t,s)),(!this.drag||this.drag.kind!=="blades")&&(this.bladeVel+=(.7-this.bladeVel)*(1-Math.exp(-t*.5)),e.blades.rotation.z-=this.bladeVel*t),this.ballSpin.lengthSq()>1e-6){const d=this.ballSpin.length()*t,p=this.spinQuat.setFromAxisAngle(this.spinAxis.copy(this.ballSpin).normalize(),d);e.ball.quaternion.premultiply(p),this.ballSpin.multiplyScalar(Math.exp(-t*.9))}const a=e.chest,n=a.open?-1.95:0;a.velocity+=((n-a.angle)*70-a.velocity*9)*t,a.angle+=a.velocity*t,a.lid.rotation.x=a.angle,e.animate(t,s);const r=e.boat;r.getWorldPosition(o);const c=Mn(o.x,o.z,s,.72*this.water.swell,this.swell);if(r.position.y=.31+c.height+Math.sin(s*1.3)*.015,r.rotation.z=-c.slopeX*.55+Math.sin(s*1.1)*.025,r.rotation.x=c.slopeZ*.55+Math.sin(s*.9+1)*.02,this.env.uNight.value>.02){const d=e.fireflies.geometry.getAttribute("position"),p=e.fireflies.userData.base;for(let v=0;v<d.count;v++)d.setXYZ(v,p[v*3]+Math.sin(s*.6+v)*.5,p[v*3+1]+Math.sin(s*.9+v*1.7)*.3,p[v*3+2]+Math.cos(s*.5+v*.7)*.5);d.needsUpdate=!0}const u=this.sparkles.geometry.getAttribute("position"),m=this.sparkles.geometry.getAttribute("aAlpha");let f=!1;this.sparkleState.forEach((d,p)=>{if(d.life<=0){m.setX(p,0);return}f=!0,d.life-=t,d.vel.y-=1.4*t,d.pos.addScaledVector(d.vel,t),u.setXYZ(p,d.pos.x,d.pos.y,d.pos.z),m.setX(p,Math.min(1,d.life*1.6))}),f&&(u.needsUpdate=!0,m.needsUpdate=!0),this.sparkles.material.uniforms.uScale.value=this.pixelRatio*this.height/800,e.top.children.forEach(d=>{const p=d.material;p?.uniforms?.uScale&&d!==this.sparkles&&(p.uniforms.uScale.value=this.pixelRatio*this.height/800)})}applyTheme(t){t&&(this.night=this.nightTarget);const s=this.night,e=(c,h)=>new W(c).lerp(new W(h),s),o=Os.light,i=Os.dark;this.sky.uniforms.uTop.value.copy(e(o.skyTop,i.skyTop)),this.sky.uniforms.uHorizon.value.copy(e(o.skyHorizon,i.skyHorizon)),this.sky.uniforms.uHaze.value.copy(e(o.haze,i.haze)),this.env.uSunDir.value.copy(o.sunDir).lerp(i.sunDir,s).normalize(),this.env.uNight.value=s;const a=this.island.seaUniforms,n=Ai[this.water.tint]||Ai.soda;a.uShallow.value.copy(e(n.light[0],n.dark[0])),a.uMid.value.copy(e(n.light[1],n.dark[1])),a.uDeep.value.copy(e(n.light[2],n.dark[2])),a.uFoam.value.copy(e(o.foam,i.foam)),a.uSand.value.copy(e(o.sand,i.sand));const r=this.sky.cloudUniforms;r.uLit.value.copy(e(o.cloudLit,i.cloudLit)),r.uMid.value.copy(e(o.cloudMid,i.cloudMid)),r.uShade.value.copy(e(o.cloudShade,i.cloudShade)),this.sky.starUniforms.uOpacity.value=s,this.island.halos.material.uniforms.uOpacity.value=s*.9,this.island.fireflies.material.uniforms.uOpacity.value=s,this.ocean?.setTheme(this.theme==="dark"),this.sky.clouds.visible=!0,Go.strength.value=.42*(1-s*.72)}applyDepth(t){const s=this.night,e=Os.light,o=Os.dark,i=Wa(this.theme,this.depth,this.below),[a,n]=this.scratchColors;this.fog.color.copy(a.set(e.fog).lerp(n.set(o.fog),s)).lerp(i.fog,t),this.env.uWaterGlow.value.copy(i.glow),this.env.uWaterFog.value.copy(i.fog),this.env.uWaterAbyss.value.copy(i.abyss),this.fog.density=(e.fogDensity+(o.fogDensity-e.fogDensity)*s)*(1-t)+i.density*t,this.scene.background.copy(this.fog.color);const r=this.hemi.color.copy(a.set(e.hemiSky).lerp(n.set(o.hemiSky),s)).lerp(i.light,t),c=this.hemi.groundColor.copy(a.set(e.hemiGround).lerp(n.set(o.hemiGround),s)).lerp(i.fog,t),h=(e.hemiIntensity+(o.hemiIntensity-e.hemiIntensity)*s)*(1-t)+i.hemi*t;this.hemi.intensity=h;const u=(e.sunIntensity+(o.sunIntensity-e.sunIntensity)*s)*(1-t*qe(.35+this.depth/24));this.sun.intensity=u,this.sun.color.copy(a.set(e.sunColor).lerp(n.set(o.sunColor),s)).lerp(i.light,t),this.sun.position.copy(this.env.uSunDir.value).multiplyScalar(30),this.sun.target.position.set(0,0,0),this.fill.intensity=(e.fillIntensity+(o.fillIntensity-e.fillIntensity)*s)*(1-t),this.fill.color.copy(a.set(e.fillColor).lerp(n.set(o.fillColor),s)),this.fill.position.copy(e.fillDir).multiplyScalar(30),this.env.uSunColor.value.copy(this.sun.color).multiplyScalar(u/2.2),this.env.uSkyColor.value.copy(r).multiplyScalar(h),this.env.uGroundColor.value.copy(c).multiplyScalar(h),this.depthLight.value.copy(i.light).multiplyScalar(.55+.45*(1-t*.6)),t<.5&&this.depthLight.value.copy(this.sun.color).multiplyScalar(u/2.2)}isSurface(t){return t instanceof HTMLElement&&t.closest("[data-island-surface]")===t?t:null}setPointer(t,s){const e=this.options.canvas.getBoundingClientRect();this.pointer.set((t-e.left)/e.width*2-1,-((s-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}hitAt(t,s){if(this.camera.position.y<-.4||!this.island.top.visible)return null;this.setPointer(t,s);const e=this.island.hitInteractive(this.raycaster);return e?.kind==="bottle"&&!this.options.onBottle?null:e}markPlayed(){this.played||(this.played=!0,this.options.onPlayed?.())}bindPointer(){const{root:t}=this.options,s=n=>{if(n.touches.length!==1||!this.isSurface(n.target))return;if(this.editing){n.preventDefault();return}const c=n.touches[0],h=this.hitAt(c.clientX,c.clientY);(h&&h.kind!=="chest"&&h.kind!=="bottle"||!h&&this.sword?.armed&&this.slashable()&&this.island.hitLand(this.raycaster))&&n.preventDefault()};t.addEventListener("touchstart",s,{passive:!1}),this.cleanups.push(()=>t.removeEventListener("touchstart",s));const e=n=>{if(n.button!==0||this.drag)return;this.touched=n.pointerType!=="mouse";const r=this.isSurface(n.target);if(!r)return;const c=new bt(n.clientX,n.clientY),h={pointerId:n.pointerId,moved:0,start:c,surface:r};if(this.idleFor=0,this.editing){if(!this.editDown(n,h))return;try{r.setPointerCapture(n.pointerId)}catch{}return}const u=this.hitAt(n.clientX,n.clientY);if(this.sword?.armed&&u?.kind!=="chest"&&u?.kind!=="bottle"&&this.slashable()){this.drag={kind:"slash",last:c.clone(),...h},this.handAt={x:n.clientX,y:n.clientY},this.handDown=!0;const m=this.pointer.clone();this.sword.strokeBegin(m),this.sword.strokeSample(this.raycaster,m)}else if(u?.kind==="jelly"){const m=this.camera.getWorldDirection(new g).negate(),f=new to().setFromNormalAndCoplanarPoint(m,u.point);u.jelly.grab(u.jelly.front.worldToLocal(u.point.clone())),this.walkerOf(u.jelly)?.pause(),this.drag={kind:"jelly",jelly:u.jelly,plane:f,...h}}else if(u?.kind==="blades"){const m=this.island.bladeHub.clone();this.island.top.localToWorld(m),m.project(this.camera);const f=this.options.canvas.getBoundingClientRect(),d=new bt(f.left+(m.x+1)/2*f.width,f.top+(1-m.y)/2*f.height);this.drag={kind:"blades",hub:d,angle:Math.atan2(n.clientY-d.y,n.clientX-d.x),...h},this.bladeVel=0}else if(u?.kind==="ball")this.drag={kind:"ball",last:c.clone(),...h};else if(u?.kind==="chest"||u?.kind==="bottle")this.drag={kind:u.kind,...h};else if(this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6&&(this.island.hitLand(this.raycaster)||this.sword?.armed))this.drag={kind:"turn",last:c.clone(),...h},this.yawVel=0,this.lastRipple.t=-10,this.touchWater(n.clientX,n.clientY,1);else if(this.camera.position.y<=-.4)this.scareFish(n.clientX,n.clientY),this.drag={kind:"water",...h};else{this.touchWater(n.clientX,n.clientY,1.15,!0);return}try{r.setPointerCapture(n.pointerId)}catch{}this.drag.kind!=="chest"&&this.drag.kind!=="bottle"&&this.drag.kind!=="water"&&this.drag.kind!=="slash"&&!this.sword?.armed&&(r.style.cursor="grabbing")},o=n=>{const r=this.drag;if(this.editing){this.editMove(n);return}if(this.sword?.armed&&(!r||r.kind==="slash")){const c=this.isSurface(n.target)||r;r?.kind==="slash"&&n.pointerId===r.pointerId?this.handAt={x:n.clientX,y:n.clientY}:!r&&n.pointerType==="mouse"&&(this.handAt=c?{x:n.clientX,y:n.clientY}:null)}if((!r||r.kind==="water"||r.kind==="turn")&&this.isSurface(n.target)&&this.touchWater(n.clientX,n.clientY,r?.kind==="turn"?.8:.45),!r||r.kind==="water"){const c=this.isSurface(n.target);if(c&&this.camera.position.y<-.4&&this.scareFish(n.clientX,n.clientY),r)return;c&&n.pointerType==="mouse"&&(this.hoverQueued={x:n.clientX,y:n.clientY,target:c});return}if(n.pointerId===r.pointerId){if(r.moved=Math.max(r.moved,Math.hypot(n.clientX-r.start.x,n.clientY-r.start.y)),r.kind==="jelly"){this.setPointer(n.clientX,n.clientY);const c=new g;if(this.raycaster.ray.intersectPlane(r.plane,c)){const h=this.walkerOf(r.jelly);if(h&&r.moved>6){const u=this.raycaster.ray;if(this.island.top.worldToLocal(c.clone()).y<1.6&&!this.island.hitLand(this.raycaster)&&u.direction.y<-.02){const f=u.at((1.1-u.origin.y)/u.direction.y,new g),d=this.island.top.worldToLocal(f.clone());Math.hypot(d.x,d.z)>5&&c.copy(f)}const m=this.island.top.worldToLocal(c.clone());h.held||h.hold(m.clone().sub(h.position)),h.holdTo(m)}else h||r.jelly.dragTo(r.jelly.front.worldToLocal(c));r.moved>6&&this.markPlayed()}}else if(r.kind==="blades"){const c=Math.atan2(n.clientY-r.hub.y,n.clientX-r.hub.x);let h=c-r.angle;h=Math.atan2(Math.sin(h),Math.cos(h)),r.angle=c,this.island.blades.rotation.z-=h,this.bladeVel=this.bladeVel*.6+h/(1/60)*.4,r.moved>6&&this.markPlayed()}else if(r.kind==="ball"){const c=n.clientX-r.last.x,h=n.clientY-r.last.y;r.last.set(n.clientX,n.clientY);const u=new g().setFromMatrixColumn(this.camera.matrixWorld,0),f=new g().setFromMatrixColumn(this.camera.matrixWorld,1).multiplyScalar(c).add(u.multiplyScalar(h)),d=new be().setFromAxisAngle(new g(0,1,0),-this.yaw);f.applyQuaternion(d),this.ballSpin.lerp(f.multiplyScalar(.45),.5),r.moved>6&&this.markPlayed()}else if(r.kind==="slash"){const c=n.clientX-r.last.x,h=n.clientY-r.last.y,u=Math.max(1,Math.ceil(Math.hypot(c,h)/12));for(let m=1;m<=u;m++)this.setPointer(r.last.x+c*m/u,r.last.y+h*m/u),this.sword?.strokeSample(this.raycaster,this.pointer.clone());r.last.set(n.clientX,n.clientY),r.moved>10&&this.markPlayed()}else if(r.kind==="turn"){const c=n.clientX-r.last.x;r.last.set(n.clientX,n.clientY);const h=c/Math.max(320,this.width)*4.2;this.yaw+=h,this.yawVel=this.yawVel*.5+h/(1/60)*.5,r.moved>10&&this.markPlayed()}}},i=n=>{const r=this.drag;if(!r||n.pointerId!==r.pointerId)return;this.drag=null,r.surface.style.cursor=this.sword?.armed&&n.pointerType==="mouse"?Hs:"";try{r.surface.releasePointerCapture(n.pointerId)}catch{}const c=r.moved<8&&n.type==="pointerup";if(this.editing&&(r.kind==="sculpt"||r.kind==="item"||r.kind==="place")){this.editUp(r,c,n),this.idleFor=0;return}if(r.kind==="turn"&&c&&!this.editing){this.setPointer(n.clientX,n.clientY);const h=this.island.hitProp(this.raycaster);h&&this.island.wobble.poke(h.object)&&this.markPlayed()}if(r.kind==="jelly")r.jelly.release(),this.walkerOf(r.jelly)?.drop(),c&&(r.jelly.poke(!0),this.markPlayed());else if(r.kind==="bottle"&&c)this.options.onBottle?.(this.bottleScreen()||{x:n.clientX,y:n.clientY}),this.markPlayed();else if(r.kind==="slash")this.setPointer(n.clientX,n.clientY),c||this.sword?.strokeSample(this.raycaster,this.pointer.clone()),this.sword?.strokeEnd(this.raycaster,c),this.handDown=!1,n.pointerType!=="mouse"&&(this.handAt=null),this.markPlayed();else if(r.kind==="chest"&&c){const h=this.island.chest;h.open?this.elapsed-this.chestOpenedAt>.45&&(h.open=!1,this.overChest=!1,this.sword?.putBack()):(h.open=!0,this.chestOpenedAt=this.elapsed,this.spawnSparkles(),this.sword?.grab(this.chestNdc()),n.pointerType==="mouse"&&(this.handAt={x:n.clientX,y:n.clientY},this.overChest=!0,r.surface.style.cursor=Hs)),this.markPlayed()}else if(r.kind==="water"&&c){if(this.setPointer(n.clientX,n.clientY),!this.ocean?.tap(this.raycaster)){const h=this.raycaster.ray.at(7,new g);h.y=Math.min(h.y,-.6),this.ocean?.burst(h,16)}this.markPlayed()}this.idleFor=0},a=n=>{n.key!=="Escape"||!this.sword?.armed||(this.island.chest.open=!1,this.overChest=!1,this.sword.putBack())};window.addEventListener("keydown",a),this.cleanups.push(()=>window.removeEventListener("keydown",a)),t.addEventListener("pointerdown",e),t.addEventListener("pointermove",o),t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),this.cleanups.push(()=>{t.removeEventListener("pointerdown",e),t.removeEventListener("pointermove",o),t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i)})}slashable(){return this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6}handPose(){if(!this.sword?.armed||!this.slashable())return[null,!1,!1,!1];const t=this.options.canvas.getBoundingClientRect(),s=(i,a)=>new bt((i-t.left)/t.width*2-1,-((a-t.top)/t.height)*2+1);if(this.handAt)return[s(this.handAt.x,this.handAt.y),this.handDown,!1,this.overChest&&!this.handDown];if(!this.touched&&!window.matchMedia("(hover: none)").matches)return[null,!1,!1,!1];const e=this.options.islandSlot?.getBoundingClientRect(),o=e&&e.width>40?e:t;return[s(o.left+o.width*.68,o.top+o.height*.82),!1,!0,!1]}dolphinCanLeap([t,s,e],o){if(this.editing||!this.island||this.camera.position.y<.2)return!1;const i=!o&&this.scrollY<this.heroHeight*.3?this.slot:null,a=(f,d)=>{const p=this.leapPoint.copy(f).project(this.camera);if(p.z>1)return!1;const v=(p.x+1)/2*this.width,w=(1-p.y)/2*this.height;return i?Math.abs(v-i.cx)<=i.w*.46&&w>=i.cy-i.h*(.46+d)&&w<=i.cy+i.h*.46:v>this.width*.06&&v<this.width*.94&&w>this.height*.1&&w<this.height*.9};if(!a(t,0)||!a(e,0)||!a(s,.4))return!1;const n=this.island,r=n.top,c=[...r.children.filter(f=>f.name.startsWith("model-")),...n.trees.map(f=>f.root)].filter(f=>f.visible).map(f=>new po().setFromObject(f)),h=this.camera.position,u=r.worldToLocal(this.leapEye.copy(h)),m=f=>{const d=r.worldToLocal(this.leapPoint.copy(f));for(let v=1;v<32;v++){const w=v/32,y=d.x+(u.x-d.x)*w,x=d.z+(u.z-d.z)*w;if(!(y*y+x*x>121)&&d.y+(u.y-d.y)*w<n.ground(y,x))return!0}this.leapRay.set(h,this.leapPoint.copy(f).sub(h).normalize());const p=h.distanceTo(f)-.3;return c.some(v=>this.leapRay.intersectBox(v,this.leapHit)!==null&&this.leapHit.distanceTo(h)<p)};return!m(s)&&(!m(t)||!m(e))}chestNdc(){const t=this.island.chest.base.localToWorld(new g(0,.45,.1)).project(this.camera);return Math.abs(t.x)<=1.2&&Math.abs(t.y)<=1.2?new bt(t.x,t.y):null}walkerOf(t){return this.island.walkers.find(s=>s.jelly===t)}updateHover(t,s,e){if(this.drag)return;if(this.camera.position.y<-.4){this.setPointer(t,s);const r=this.ocean?.hover(this.raycaster)?"pointer":"";e.style.cursor!==r&&(e.style.cursor=r);return}const o=this.hitAt(t,s),i=this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6,a=!!(this.sword?.armed&&i&&o?.kind==="chest");a&&!this.overChest&&this.island.wobble.poke(this.island.chest.base,.35),this.overChest=a;const n=this.sword?.armed&&i?Hs:o?o.kind==="chest"||o.kind==="bottle"?"pointer":"grab":i&&this.island.hitLand(this.raycaster)?"grab":"";e.style.cursor!==n&&(e.style.cursor=n)}touchWater(t,s,e,o=!1){if(this.camera.position.y<.3||this.scrollY>this.heroHeight*.9)return;this.setPointer(t,s);const i=this.raycaster.ray;if(i.direction.y>-.02)return;if(this.ripples&&this.island.hitLand(this.raycaster)){if(this.hoverWater=null,!this.island.pond.mesh.visible)return;const c=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,(Ke-i.origin.y)/i.direction.y),h=this.island.top.worldToLocal(c);this.island.pond.depthAt(h.x,h.z)>.01&&this.island.rippleLocal(h.x,h.z,o?e:e*.35);return}const a=-i.origin.y/i.direction.y,n=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,a);if(this.ripples){const c=this.elapsed;o?this.island.ripple(n.x,n.z,e):this.hoverWater&&c-this.hoverWater.t<.2&&this.island.rippleTrail(this.hoverWater.x,this.hoverWater.z,n.x,n.z,e),this.hoverWater={x:n.x,z:n.z,t:c};return}if(Math.hypot(n.x,n.z)<7.2)return;const r=this.elapsed;r-this.lastRipple.t<.12&&n.distanceTo(this.lastRipple.at)<1.2||(this.lastRipple.t=r,this.lastRipple.at.copy(n),this.island.ripple(n.x,n.z,e))}landUnder(t,s){this.setPointer(t,s);const e=this.island.hitLand(this.raycaster);return e?this.island.top.worldToLocal(e):null}editDown(t,s){const e=this.workshop;if(!e)return!1;this.setPointer(t.clientX,t.clientY);const o=this.tool.kind==="place"||this.tool.kind==="move"?e.hitItem(this.raycaster):null,i=this.landUnder(t.clientX,t.clientY);return o?(e.beginMove(),this.drag={kind:"item",item:o,grab:new bt(i?i.x-o.x:0,i?i.z-o.z:0),shifted:!1,...s},this.select(o)):i&&(this.tool.kind==="raise"||this.tool.kind==="lower"||this.tool.kind==="smooth")?(e.beginStroke(),this.drag={kind:"sculpt",at:i,...s}):i&&this.tool.kind==="place"?this.drag={kind:"place",...s}:(this.tool.kind==="move"&&this.select(null),this.drag={kind:"turn",last:s.start.clone(),...s},this.yawVel=0,this.touchWater(t.clientX,t.clientY,1)),!0}editMove(t){const s=this.drag,e=this.workshop;if(!e)return;const o=this.isSurface(t.target)||s?.surface;if(s&&t.pointerId===s.pointerId&&(s.moved=Math.max(s.moved,Math.hypot(t.clientX-s.start.x,t.clientY-s.start.y))),s?.kind==="turn"&&t.pointerId===s.pointerId){const n=t.clientX-s.last.x;s.last.set(t.clientX,t.clientY);const r=n/Math.max(320,this.width)*4.2;this.yaw+=r,this.yawVel=this.yawVel*.5+r/(1/60)*.5,this.touchWater(t.clientX,t.clientY,.8),e.showCursor(null);return}if(s?.kind==="place"&&t.pointerId===s.pointerId&&s.moved>10){this.drag={kind:"turn",last:new bt(t.clientX,t.clientY),pointerId:s.pointerId,moved:s.moved,start:s.start,surface:s.surface};return}const i=this.landUnder(t.clientX,t.clientY);s?.kind==="sculpt"&&t.pointerId===s.pointerId?s.at=i:s?.kind==="item"&&t.pointerId===s.pointerId&&i&&s.moved>6&&e.moveTo(s.item,i.x-s.grab.x,i.z-s.grab.y)&&(s.shifted=!0);const a=this.tool;if(!i||s&&s.kind!=="sculpt"&&s.kind!=="place")e.showCursor(null);else if(a.kind==="raise"||a.kind==="lower"||a.kind==="smooth")e.showCursor(i,a.size,a.kind);else if(a.kind==="place"){const n=e.specOf(a.item).radius;e.showCursor(i,n,e.canPlace(a.item,i.x,i.z)?"ok":"blocked")}else e.showCursor(null);if(o&&!s&&t.pointerType==="mouse"){this.setPointer(t.clientX,t.clientY);const r=(a.kind==="move"||a.kind==="place"?e.hitItem(this.raycaster):null)?"grab":i?a.kind==="move"?"":"crosshair":"grab";o.style.cursor!==r&&(o.style.cursor=r),this.touchWater(t.clientX,t.clientY,.45)}}editUp(t,s,e){const o=this.workshop;if(t.kind==="sculpt")o.endStroke(),e.pointerType!=="mouse"&&o.showCursor(null);else if(t.kind==="item"){if(o.endMove(t.shifted),s){const i=o.items.find(a=>a.id===t.item.id);i?.jelly?i.jelly.poke(i.kind==="slime"):i&&this.island.wobble.poke(i.root,.7)}}else if(t.kind==="place"&&s&&this.tool.kind==="place"){const i=this.landUnder(e.clientX,e.clientY),a=this.tool;if(i&&o.canPlace(a.item,i.x,i.z)){const n=o.place(a.item,a.look,i.x,i.z);this.island.wobble.nudgeAround(n.x,n.z,2.4,.5),this.select(n),this.markPlayed()}else this.workshopChanged(!1,!0);e.pointerType!=="mouse"&&o.showCursor(null)}}scareFish(t,s){this.setPointer(t,s),this.scare.origin.copy(this.raycaster.ray.origin),this.scare.dir.copy(this.raycaster.ray.direction),this.scareAt=this.elapsed}screenTargets(){const t=this.options.canvas.getBoundingClientRect(),s=i=>(i.project(this.camera),[Math.round(t.left+(i.x+1)/2*t.width),Math.round(t.top+(1-i.y)/2*t.height)]),e=this.island,o=i=>i.front.localToWorld(new g(0,i.height*.55,.3));return{hero:s(o(e.hero)),jellies:e.jellies.map(i=>s(o(i))),blades:s(e.top.localToWorld(e.bladeHub.clone().add(new g(0,.75,.05)))),ball:s(e.ball.getWorldPosition(new g)),chest:s(e.chest.base.localToWorld(new g(0,.3,.2))),chestOpen:e.chest.open,bottle:s(e.bottle.getWorldPosition(new g)),trees:e.trees.map(i=>s(e.top.localToWorld(new g(i.x,i.root.position.y+i.height*.3,i.z)))),armed:!!this.sword?.armed,ripples:!!this.ripples,editing:this.editing,items:this.workshop?.items.map(i=>({id:i.id,kind:i.kind,at:s(e.top.localToWorld(new g(i.x,e.ground(i.x,i.z)+.4,i.z)))}))??[],pond:e.pond.mesh.visible,yaw:Number(this.yaw.toFixed(3)),blade:Number(e.blades.rotation.z.toFixed(3))}}spawnSparkles(){const s=this.island.chest.base.position.clone().add(new g(0,.6,0));this.sparkleState.forEach(e=>{e.pos.copy(s),e.vel.set((Math.random()-.5)*2.2,2.2+Math.random()*1.8,(Math.random()-.5)*2.2),e.life=.9+Math.random()*.7})}}export{Pl as IslandDive,Al as canRunIslandDive,ul as pickDiveTier,Ii as supportsFloatTargets};
