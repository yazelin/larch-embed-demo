import{ah as Co,ae as To,aD as sa,k as xt,aj as ae,e as it,aE as Uo,aF as jo,V as v,C as W,av as no,aw as ro,ax as bi,c as kt,b as $,M as Ht,v as Xt,G as rt,d as q,L as Mi,a as ht,T as cs,at as Xe,z as hs,U as we,f as ye,Q as be,F as oa,j as J,R as wt,am as Ps,O as Si,X as vs,Y as lo,ad as ws,aG as ke,x as oe,aq as zi,ar as Ye,ai as Oo,al as ki,aH as Po,ao as Fe,g as Ee,au as As,u as Zs,az as ia,i as Me,ay as ls,B as Ci,aI as Ks,I as Ti,as as Ae,o as aa,p as na,aJ as ra,ak as la,aK as qs,aL as Hs,r as ca,q as ha,P as Lo,n as ua,S as Pi,D as Ao,H as Ai,A as da,aM as qo,aN as fa,aC as pa,W as ma,aB as ga,aO as va,aP as wa,aQ as ya}from"./three-engine-ZCw1R4k9.js";import{c as Xs}from"./compileQuietly-CK7nzn7y.js";import{s as Re,c as Ie,a as ut,G as Et,f as ie,m as It,p as G,b as _e,n as xa,d as ba}from"./creatureShape-BQCl6VwJ.js";import{R as _i,a as Ma,c as Sa}from"./rippleSim-Byc5X7oU.js";import{f as Fi,h as Ho,I as za}from"./layout-3RIFKfAW.js";import{a as Xo,c as ka}from"./graphicsQuality-D7CvWroX.js";import"./react-core-CuKebU_E.js";import"./index-CpUcZcaR.js";import"./preload-helper-BXl3LOEh.js";const Yo=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ca=`
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
`,Ta=`
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
`;class Pa{constructor(t,s){this.renderer=t,this.sceneTarget=new Co(1,1,{type:To,samples:4}),this.bloom=new sa(new xt(1,1),.3,.55,1),this.bloom.blendMaterial.visible=!1,this.raysTarget=s.rays?new Co(1,1,{type:To,minFilter:ae,magFilter:ae,depthBuffer:!1}):null,this.raysMaterial=s.rays?new it({uniforms:{tScene:{value:null},uLight:{value:new xt(.5,.5)},uThreshold:{value:.9}},vertexShader:Yo,fragmentShader:Ca,depthTest:!1,depthWrite:!1,blending:Uo}):null,this.raysQuad=this.raysMaterial?new jo(this.raysMaterial):null,this.grade=new it({uniforms:{tScene:{value:null},tBloom:{value:null},tRays:{value:null},uBloom:{value:1},uRays:{value:0},uRayTint:{value:new v(1,.95,.85)},uAberration:{value:2.2},uShadowTint:{value:new v(.93,1,1.06)},uHighlightTint:{value:new v(1.04,1.01,.95)},uSplit:{value:1},uSaturation:{value:1.06},uExposure:{value:1},uResolution:{value:new xt(1,1)},uFrame:{value:0}},vertexShader:Yo,fragmentShader:Ta,depthTest:!1,depthWrite:!1,blending:Uo,toneMapped:!1}),this.gradeQuad=new jo(this.grade)}renderer;bloom;sceneTarget;raysTarget;gradeQuad;raysQuad;grade;raysMaterial;frame=0;lightScreen=new v;forward=new v;rays=0;setSize(t,s,e){const o=Math.max(1,Math.round(t*e)),i=Math.max(1,Math.round(s*e));this.sceneTarget.setSize(o,i),this.bloom.setSize(o,i),this.raysTarget?.setSize(Math.max(1,Math.round(o/4)),Math.max(1,Math.round(i/4))),this.grade.uniforms.uResolution.value.set(o,i)}setLight(t,s){if(!this.raysMaterial||s.getWorldDirection(this.forward).dot(t)<.15)return 0;const o=this.lightScreen.copy(t).multiplyScalar(400).add(s.position).project(s);this.raysMaterial.uniforms.uLight.value.set(o.x*.5+.5,o.y*.5+.5);const i=Math.max(Math.abs(o.x),Math.abs(o.y));return 1-Math.min(1,Math.max(0,(i-.9)/.7))}async compileAsync(t,s,e){const o=this.renderer,i=o.getRenderTarget();o.setRenderTarget(this.sceneTarget);const a=Xs(o,t,s,e);o.setRenderTarget(i),await a}render(t,s,e){const o=this.renderer;o.setRenderTarget(this.sceneTarget),o.render(t,s),this.bloom.render(o,null,this.sceneTarget,0,!1);const i=this.grade.uniforms;this.raysQuad&&this.raysTarget&&this.rays>.01?(this.raysMaterial.uniforms.tScene.value=this.sceneTarget.texture,o.setRenderTarget(this.raysTarget),this.raysQuad.render(o),i.tRays.value=this.raysTarget.texture,i.uRays.value=this.rays):(i.tRays.value=this.sceneTarget.texture,i.uRays.value=0),i.tScene.value=this.sceneTarget.texture,i.tBloom.value=this.bloom.renderTargetsHorizontal[0].texture,i.uExposure.value=e,i.uFrame.value=this.frame++%64,o.setRenderTarget(null),this.gradeQuad.render(o)}dispose(){this.sceneTarget.dispose(),this.raysTarget?.dispose(),this.bloom.dispose(),this.grade.dispose(),this.raysMaterial?.dispose(),this.gradeQuad.dispose(),this.raysQuad?.dispose()}}function Aa(){return{uTime:{value:0},uSunDir:{value:new v(.45,.78,.42).normalize()},uSunColor:{value:new W("#fff1d6")},uSkyColor:{value:new W("#bfe6ff")},uGroundColor:{value:new W("#9cc46e")},uNight:{value:0},uUnder:{value:0},uDepth:{value:0},uGlow:{value:0},uSkyTop:{value:new W("#3f9ef0")},uSkyHorizon:{value:new W("#cdeeff")},uSkyHaze:{value:new W("#fff4dc")},uWaterGlow:{value:new W("#8ff0ff")},uWaterFog:{value:new W("#1d9cc4")},uWaterAbyss:{value:new W("#0f6a9a")},uWaterRays:{value:0}}}const Vs={light:{skyTop:"#8d9ee6",skyHorizon:"#ffd2c6",haze:"#fff0dc",sunDir:new v(-.2,.3,-.93).normalize(),sunColor:"#fff0dc",sunIntensity:1.9,fillDir:new v(.35,.5,.8).normalize(),fillColor:"#ffe2ec",fillIntensity:.55,hemiSky:"#dfe2ff",hemiGround:"#c9a9a0",hemiIntensity:1,fog:"#eed2d6",fogDensity:.0016,foam:"#ffffff",sand:"#fbe9cf",cloudLit:"#fffaf5",cloudMid:"#ffe0e6",cloudShade:"#bdb6ea"},dark:{skyTop:"#121842",skyHorizon:"#4a4386",haze:"#c8b6ff",sunDir:new v(-.16,.27,-.95).normalize(),sunColor:"#cfd8ff",sunIntensity:1,fillDir:new v(.35,.5,.8).normalize(),fillColor:"#8f8ae6",fillIntensity:.4,hemiSky:"#7480d6",hemiGround:"#40386e",hemiIntensity:1.2,fog:"#1c2050",fogDensity:.006,foam:"#dfe8ff",sand:"#a6a0bc",cloudLit:"#9c9ee0",cloudMid:"#7472bc",cloudShade:"#3a3a7c"}},_a={light:[{depth:0,fog:"#1d9cc4",glow:"#8ff0ff",abyss:"#0f6a9a",density:.052,hemi:1,light:"#c4f6ff"},{depth:3,fog:"#1b93c0",glow:"#82eaff",abyss:"#0e6094",density:.036,hemi:.96,light:"#b8f0fd"},{depth:8,fog:"#1781b8",glow:"#6fdcf6",abyss:"#0b4f86",density:.027,hemi:.9,light:"#a4e6fa"},{depth:18,fog:"#0f5a99",glow:"#3fa8e0",abyss:"#072f66",density:.03,hemi:.72,light:"#7cc0ea"},{depth:30,fog:"#0a3772",glow:"#2271b8",abyss:"#04173d",density:.034,hemi:.56,light:"#5d92d8"},{depth:42,fog:"#072656",glow:"#1a5298",abyss:"#030c26",density:.036,hemi:.5,light:"#5683cc"},{depth:52,fog:"#0a4058",glow:"#1f7ea0",abyss:"#04202e",density:.032,hemi:.62,light:"#6fd0d6"}],dark:[{depth:0,fog:"#0e3f5e",glow:"#3f8fb8",abyss:"#082a44",density:.056,hemi:.78,light:"#7cc4e6"},{depth:3,fog:"#0d3a59",glow:"#3787b2",abyss:"#07263f",density:.04,hemi:.74,light:"#74bce2"},{depth:8,fog:"#0b3352",glow:"#2e78a6",abyss:"#06213c",density:.033,hemi:.68,light:"#6aaedc"},{depth:18,fog:"#08243f",glow:"#1f5a8c",abyss:"#04142a",density:.036,hemi:.55,light:"#5590c8"},{depth:30,fog:"#05162d",glow:"#153f72",abyss:"#020a1a",density:.04,hemi:.45,light:"#4673b4"},{depth:42,fog:"#040f22",glow:"#10305e",abyss:"#020714",density:.044,hemi:.4,light:"#4062a8"},{depth:52,fog:"#062a36",glow:"#13586e",abyss:"#02141c",density:.04,hemi:.5,light:"#4fb6c0"}]},Os=new W,Ls=new W;function Fa(l,t,s={fog:new W,glow:new W,abyss:new W,density:0,hemi:0,light:new W}){const e=_a[l];let o=0;for(;o<e.length-2&&t>e[o+1].depth;)o++;const i=e[o],a=e[o+1],n=Math.min(1,Math.max(0,(t-i.depth)/(a.depth-i.depth))),r=n*n*(3-2*n);return s.fog.copy(Os.set(i.fog).lerp(Ls.set(a.fog),r)),s.glow.copy(Os.set(i.glow).lerp(Ls.set(a.glow),r)),s.abyss.copy(Os.set(i.abyss).lerp(Ls.set(a.abyss),r)),s.density=i.density+(a.density-i.density)*r,s.hemi=i.hemi+(a.hemi-i.hemi)*r,s.light.copy(Os.set(i.light).lerp(Ls.set(a.light),r)),s}function co(l){let t=l>>>0||2654435769;return()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}class Ia{pos=[];nor=[];col=[];part=[];sway=[];idx=[];add(t,s,e,o,i,a){const n=this.pos.length/3;for(let r=0;r<t.length;r+=3)this.pos.push(t[r],t[r+1],t[r+2]),this.nor.push(s[r],s[r+1],s[r+2]),this.col.push(e[r],e[r+1],e[r+2]),this.part.push(i),this.sway.push(a(t[r+1],t[r],t[r+2]));for(const r of o)this.idx.push(n+r)}build(){const t=new kt;return t.setAttribute("position",new $(new Float32Array(this.pos),3)),t.setAttribute("normal",new $(new Float32Array(this.nor),3)),t.setAttribute("color",new $(new Float32Array(this.col),3)),t.setAttribute("aPart",new $(new Float32Array(this.part),1)),t.setAttribute("aSway",new $(new Float32Array(this.sway),1)),t.setIndex(this.idx),t.computeBoundingSphere(),t.computeBoundingBox(),t}}function Ea(l){const t=(1+Math.sqrt(5))/2;let s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(o=>{const i=Math.hypot(o[0],o[1],o[2]);return[o[0]/i,o[1]/i,o[2]/i]}),e=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let o=0;o<l;o++){const i=new Map,a=(r,h)=>{const c=r<h?`${r}_${h}`:`${h}_${r}`,u=i.get(c);if(u!==void 0)return u;const d=s[r],p=s[h],f=[(d[0]+p[0])/2,(d[1]+p[1])/2,(d[2]+p[2])/2],m=Math.hypot(f[0],f[1],f[2]);return s.push([f[0]/m,f[1]/m,f[2]/m]),i.set(c,s.length-1),s.length-1},n=[];for(const[r,h,c]of e){const u=a(r,h),d=a(h,c),p=a(c,r);n.push([r,u,p],[h,d,u],[c,p,d],[u,d,p])}e=n}return s=s.slice(),{positions:s.flat(),indices:e.flat()}}function Qs(l,t,s,e){const o=(m,g,M)=>{let x=Math.imul(m,374761393)+Math.imul(g,668265263)+Math.imul(M,1440662683)+Math.imul(e,2246822519);return x=Math.imul(x^x>>>13,1274126177),((x^x>>>16)>>>0)/4294967296},i=Math.floor(l),a=Math.floor(t),n=Math.floor(s),r=l-i,h=t-a,c=s-n,u=r*r*(3-2*r),d=h*h*(3-2*h),p=c*c*(3-2*c),f=(m,g,M)=>m+(g-m)*M;return f(f(f(o(i,a,n),o(i+1,a,n),u),f(o(i,a+1,n),o(i+1,a+1,n),u),d),f(f(o(i,a,n+1),o(i+1,a,n+1),u),f(o(i,a+1,n+1),o(i+1,a+1,n+1),u),d),p)}const fo=l=>new W(l);function Ra(l,t,s,e,o,i,a,n,r,h,c,u=.22){const d=Ea(r),p=[],f=[],m=[];for(let g=0;g<d.positions.length;g+=3){const M=d.positions[g],x=d.positions[g+1],y=d.positions[g+2],S=Qs(M*2.2+i,x*2.2,y*2.2,i)-.5,T=Qs(M*5.1+i*.3,x*5.1,y*5.1,i+7)-.5,C=1+S*u*2+T*u*.6,P=t.x+M*s.x*C,_=t.y+x*s.y*C,E=t.z+y*s.z*C;p.push(P,_,E);const A=P-e.x,O=(_-e.y)*1.15,L=E-e.z,D=Math.hypot(A,O,L)||1;let R=M*.45+A/D*.55,j=x*.45+O/D*.55,Q=y*.45+L/D*.55;const st=Math.hypot(R,j,Q)||1;R/=st,j/=st,Q/=st,f.push(R,j,Q);const at=Math.min(1,D/o),ct=(j+1)/2,lt=Math.max(0,Math.min(1,at*.55+ct*.55-.12+T*.3)),ot=a.clone().lerp(n,lt);m.push(ot.r,ot.g,ot.b)}l.add(p,f,m,d.indices,h,g=>Math.max(0,g)*c)}function $o(l,t,s,e,o,i,a,n=7,r=5){const h=co(a),c=s.clone().sub(t),u=c.length();c.normalize();const d=Math.abs(c.y)<.9?new v(0,1,0).cross(c).normalize():new v(1,0,0),p=c.clone().cross(d).normalize(),f=new v((h()-.5)*.3,0,(h()-.5)*.3).multiplyScalar(u),m=[],g=[],M=[],x=[];for(let y=0;y<=r;y++){const S=y/r,T=t.clone().addScaledVector(c,u*S).addScaledVector(f,Math.sin(S*Math.PI)*.5),C=e+(o-e)*S,P=y===0?1.35:1;for(let _=0;_<n;_++){const E=_/n*Math.PI*2,A=d.clone().multiplyScalar(Math.cos(E)).addScaledVector(p,Math.sin(E)),O=1+(Qs(Math.cos(E)*2,S*4,Math.sin(E)*2,a)-.5)*.25,L=T.clone().addScaledVector(A,C*P*O);m.push(L.x,L.y,L.z),g.push(A.x,A.y,A.z);const D=.78+.22*S+(Qs(E*3,S*9,0,a+3)-.5)*.2;M.push(i.r*D,i.g*D,i.b*D)}}for(let y=0;y<r;y++)for(let S=0;S<n;S++){const T=y*n+S,C=y*n+(S+1)%n,P=T+n,_=C+n;x.push(T,P,C,C,P,_)}l.add(m,g,M,x,0,y=>Math.max(0,y)*.02)}const Da={tree:{dark:"#1f4a24",light:"#86b94a",bark:"#6a4a35",height:[2.4,3.4],crown:[1.9,2.6],blobs:[5,8]},blossom:{dark:"#c95f8a",light:"#ffd3e2",bark:"#5d4436",height:[2.2,3],crown:[1.8,2.4],blobs:[5,8]},autumn:{dark:"#a3451f",light:"#ffbf4a",bark:"#5e4433",height:[2.4,3.2],crown:[1.8,2.5],blobs:[5,7]},birch:{dark:"#4f7d2a",light:"#c7e07a",bark:"#e8e2d6",height:[3.4,4.4],crown:[1.4,1.9],blobs:[4,6]}};let Te=null;function Na(){if(Te)return Te;const l=512,t=l/2,s=document.createElement("canvas");s.width=s.height=l;const e=s.getContext("2d"),o=(i,a,n,r)=>{const h=co(n),c=i+t/2,u=a+t/2,d=r?90:22;for(let p=0;p<d;p++){const f=h()*Math.PI*2,m=Math.pow(h(),.7)*t*(r?.36:.3),g=c+Math.cos(f)*m,M=u+Math.sin(f)*m,x=r?t*(.16+h()*.1):t*(.17+h()*.11),y=r?t*.016:x*(.42+h()*.16),S=r?f+(h()-.5)*.5:f+Math.PI/2+(h()-.5)*1.3,T=Math.round(150+h()*105);e.save(),e.translate(g,M),e.rotate(S),e.fillStyle=`rgb(${T},${T},${T})`,e.beginPath(),e.moveTo(0,-x/2),e.quadraticCurveTo(y,-x*.05,0,x/2),e.quadraticCurveTo(-y,-x*.05,0,-x/2),e.fill(),r||(e.fillStyle="rgba(255,255,255,.18)",e.beginPath(),e.moveTo(0,-x/2),e.quadraticCurveTo(y,-x*.05,0,x/2),e.closePath(),e.fill(),e.strokeStyle="rgba(0,0,0,.16)",e.lineWidth=t*.006,e.beginPath(),e.moveTo(0,-x*.45),e.lineTo(0,x*.45),e.stroke()),e.restore()}};return o(0,0,11,!1),o(t,0,23,!1),o(0,t,37,!1),o(t,t,51,!0),Te=new no(s),Te.colorSpace=ro,Te.generateMipmaps=!0,Te.minFilter=bi,Te.magFilter=ae,Te.anisotropy=4,Te}const Zo={tree:{dark:"#21503b",mid:"#468a48",light:"#7db862",warm:"#a7c978"},blossom:{dark:"#b9557f",mid:"#f19ab8",light:"#ffe2ec",warm:"#fff0d8"},autumn:{dark:"#8f3c1f",mid:"#e0782f",light:"#ffc95a",warm:"#ffe08a"},birch:{dark:"#46783c",mid:"#82b758",light:"#c2dd88",warm:"#dde29c"},bush:{dark:"#265839",mid:"#4a8c46",light:"#7eb862",warm:"#a5c777"},pine:{dark:"#123827",mid:"#25603d",light:"#5b9a58",warm:"#9cbf6a"}};class Wa{pos=[];corner=[];card=[];nor=[];col=[];idx=[];add(t,s,e,o,i,a,n,r,h){const c=this.pos.length/3,u=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[d,p]of u)this.pos.push(t.x,t.y,t.z),this.corner.push(d,p),this.card.push(e,o,n+i,a),this.nor.push(s.x,s.y,s.z),this.col.push(r.r,r.g,r.b,h);this.idx.push(c,c+1,c+2,c,c+2,c+3)}build(){const t=new kt;return t.setAttribute("position",new $(new Float32Array(this.pos),3)),t.setAttribute("aCorner",new $(new Float32Array(this.corner),2)),t.setAttribute("aCard",new $(new Float32Array(this.card),4)),t.setAttribute("normal",new $(new Float32Array(this.nor),3)),t.setAttribute("aTint",new $(new Float32Array(this.col),4)),t.setIndex(this.idx),t.computeBoundingSphere(),t.boundingSphere&&(t.boundingSphere.radius+=1.2),t.computeBoundingBox(),t}}function Va(l,t,s,e,o,i={}){const a=new Wa,n=co(o*131+7),r=new W(e.dark),h=new W(e.mid),c=new W(e.light),u=new W(e.warm||e.light),d=i.quadrants??[0,1,2],p=new W;for(const f of l){const m=Math.max(10,Math.round(f.r*f.r*58*(i.density??1)));for(let g=0;g<m;g++){const M=new v(n()*2-1,n()*2-.7,n()*2-1);M.lengthSq()<1e-4&&M.set(0,1,0),M.normalize();const x=.38+.62*Math.sqrt(n()),y=f.c.clone().addScaledVector(M,f.r*x),S=y.clone().sub(t),T=S.length()/Math.max(s,.01),C=M.clone().multiplyScalar(.55).add(S.normalize().multiplyScalar(.45)).normalize(),P=C.y*.5+.5,_=Math.min(1,Math.max(0,P*.55+x*.35+(n()-.5)*.25));p.copy(r).lerp(h,Math.min(1,_*1.6)).lerp(c,Math.max(0,_*1.6-.6)),C.y>.55&&n()<.4&&p.lerp(u,.35);const E=1+(n()-.5)*.14;p.multiplyScalar(E);const A=Math.min(1,x*.55+P*.35+Math.min(1,T)*.2),O=f.r*(i.size??.46)*(.75+n()*.5),L=Math.max(0,y.y)*(i.swayScale??.08);a.add(y,C,O,n()*Math.PI*2,n()*.99,A,d[Math.floor(n()*d.length)],p.clone(),L)}}return a.build()}function Oa(l,t){const s=Da[l],e=co(t*977+13),o=new Ia,i=s.height[0]+e()*(s.height[1]-s.height[0]),a=s.crown[0]+e()*(s.crown[1]-s.crown[0]),n=fo(s.bark),r=new v((e()-.5)*.4,i,(e()-.5)*.4);$o(o,new v(0,-.15,0),r,.2*(l==="birch"?.7:1),.11,n,t);const h=new v(r.x,i+a*.5,r.z);for(let f=0;f<3;f++){const m=e()*Math.PI*2,g=new v(r.x*.6,i*(.55+e()*.2),r.z*.6);$o(o,g,new v(Math.cos(m)*a*.55,i+a*.3,Math.sin(m)*a*.55),.08,.045,n,t+f*31,5,3)}const c=[{c:h.clone(),r:a*.78}],u=Math.round(s.blobs[0]+e()*(s.blobs[1]-s.blobs[0]));for(let f=0;f<u;f++){const m=f/u*Math.PI*2+e()*.6,g=a*(.5+e()*.22);c.push({c:new v(h.x+Math.cos(m)*g,h.y+(e()-.4)*a*.8,h.z+Math.sin(m)*g),r:a*(.42+e()*.22)})}c.push({c:new v(h.x+(e()-.5)*.4,h.y+a*.55,h.z+(e()-.5)*.4),r:a*.48});const d=Zo[l]??Zo.tree,p=fo(d.dark).multiplyScalar(.7);for(const f of c)Ra(o,f.c,new v(f.r*.62,f.r*.55,f.r*.62),h,a,t+Math.round(f.c.x*100),p,fo(d.dark),1,1,.08,.12);return{solid:o.build(),cards:Va(c,h,a,d,t,{quadrants:[0,1,2]})}}function La(l){const t=new Ht({vertexColors:!0,roughness:.88,metalness:0});t.onBeforeCompile=e=>{e.uniforms.uTime=l.uTime,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aSway;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        // 樹冠跟著風慢慢晃，越高晃越多
        transformed.xz += vec2(sin(uTime * 1.3 + position.y * 0.6), cos(uTime * 1.05 + position.y * 0.5)) * aSway * 0.05;`)},t.customProgramCacheKey=()=>"island-tree-solid";const s=new it({uniforms:{uTime:l.uTime,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uNight:l.uNight,tLeaf:{value:Na()}},vertexShader:`
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
      }`,side:Xt});return{solid:t,cards:s,dispose:()=>{t.dispose(),s.dispose()}}}function Ii(l,t,s,e){const o=Oa(l,t*101+l.length*7+1),i=new rt;i.name=`tree-${l}`;const a=new q(o.solid,s.solid);a.castShadow=!0,a.receiveShadow=!0,i.add(a),o.cards&&i.add(new q(o.cards,s.cards));const n=o.solid.boundingBox,r=n?n.max.y:5;return i.scale.setScalar(e/Math.max(1,r*1.08)),i}const Ga={tree:new W("#7db862"),blossom:new W("#f19ab8"),autumn:new W("#ffc95a"),birch:new W("#c2dd88")};function Ba(){const l=new rt;l.name="bottle";const t=[],s=22;for(let u=0;u<=s;u++){const d=u/s,p=d*.62,f=d<.62?.12+Math.sin(Math.min(1,d/.12)*Math.PI/2)*.02-Math.max(0,d-.5)*.25:.05-(d-.62)*.02;t.push(new xt(Math.max(.035,f),p))}const e=new Ht({color:"#bff3ec",roughness:.05,metalness:0,transparent:!0,opacity:.42,envMapIntensity:1.4,depthWrite:!1}),o=new Ht({color:"#fff4d8",roughness:.85}),i=new Ht({color:"#b98a5a",roughness:.9}),a=new Ht({color:"#ff8fb1",roughness:.5}),n=new q(new Mi(t,24),e);n.position.y=-.3,n.renderOrder=6;const r=new q(new ht(.055,.055,.34,14),o);r.position.y=-.08;const h=new q(new cs(.058,.012,8,20),a);h.rotation.x=Math.PI/2,h.position.y=-.08;const c=new q(new ht(.045,.04,.09,12),i);c.position.y=.35;for(const u of[r,h,c,n])u.castShadow=u!==n,l.add(u);return l.scale.setScalar(2.1),l}const po=`
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
`,Ei=`
uniform vec4 uClip[4];
uniform int uClipCount;
void clipJelly(vec3 p) {
  for (int i = 0; i < 4; i++) {
    if (i >= uClipCount) break;
    if (dot(p, uClip[i].xyz) > uClip[i].w + 0.0015) discard;
  }
}
`,Ua=`
uniform vec3 uDeep;
varying vec3 vObj;
${Ei}
#include <fog_pars_fragment>
void main() {
  clipJelly(vObj);
  gl_FragColor = vec4(uDeep * 0.42 + vec3(0.03, 0.02, 0.06), 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,Ko=`
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
${Ei}
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
`;function ja(){const l=new J(1,56,40),t=l.getAttribute("position"),s=new v;for(let e=0;e<t.count;e++){s.fromBufferAttribute(t,e);let o=s.y*.82;o<-.42&&(o=-.42+(o+.42)*.12);const i=1+.08*Math.max(0,1-Math.abs(o+.12)*2.2);s.set(s.x*1.06*i,o+.42,s.z*1.06*i),t.setXYZ(e,s.x,s.y,s.z)}return l.computeVertexNormals(),l}function qa(){const l=[];for(let e=0;e<=26;e++){const o=e/26;if(o<.12)l.push(new xt(.001+o/.12*.98,0));else if(o<.7){const i=(o-.12)/.58;l.push(new xt(.98-i*.22+Math.sin(i*Math.PI)*.03,i*1.05))}else{const i=(o-.7)/.3,a=i*Math.PI/2;l.push(new xt(Math.max(.001,.76*Math.cos(a)*(1-i*.05)),1.05+Math.sin(a)*.2))}}const s=new Mi(l,48);return s.computeVertexNormals(),s}function Ha(){const l=new wt(1.5,1.5,1.5,6,.38);return l.translate(0,.75,0),l.deleteAttribute("uv"),l}const mo=4;function Gs(l,t,s=0){for(const e of t)if(l.x*e.x+l.y*e.y+l.z*e.z>e.w+s)return!1;return!0}function Xa(l,t,s){const e=l.getAttribute("position"),o=l.getIndex(),i=new v(t.x,t.y,t.z),a=new v,n=new v,r=new Set,h=[],c=(y,S)=>{a.fromBufferAttribute(e,y),n.fromBufferAttribute(e,S);const T=a.dot(i)-t.w,C=n.dot(i)-t.w;if(T>0==C>0)return;const P=a.clone().lerp(n,T/(T-C)),_=`${Math.round(P.x*400)},${Math.round(P.y*400)},${Math.round(P.z*400)}`;r.has(_)||(r.add(_),h.push(P))},u=o?o.count:e.count;for(let y=0;y+2<u;y+=3){const S=o?o.getX(y):y,T=o?o.getX(y+1):y+1,C=o?o.getX(y+2):y+2;c(S,T),c(T,C),c(C,S)}if(h.length<3)return[];const d=new v(Math.abs(i.y)<.9?0:1,Math.abs(i.y)<.9?1:0,0).cross(i).normalize(),p=i.clone().cross(d),f=h.map(y=>({p:y,x:y.dot(d),y:y.dot(p)})).sort((y,S)=>y.x-S.x||y.y-S.y),m=(y,S,T)=>(S.x-y.x)*(T.y-y.y)-(S.y-y.y)*(T.x-y.x),g=[],M=[];for(const y of f){for(;g.length>=2&&m(g[g.length-2],g[g.length-1],y)<=0;)g.pop();g.push(y)}for(let y=f.length-1;y>=0;y--){const S=f[y];for(;M.length>=2&&m(M[M.length-2],M[M.length-1],S)<=0;)M.pop();M.push(S)}let x=[...g.slice(0,-1),...M.slice(0,-1)].map(y=>y.p);for(const y of s){const S=new v(y.x,y.y,y.z),T=[];for(let C=0;C<x.length;C++){const P=x[C],_=x[(C+1)%x.length],E=P.dot(S)-y.w,A=_.dot(S)-y.w;E<=0&&T.push(P),E<=0!=A<=0&&T.push(P.clone().lerp(_,E/(E-A)))}if(x=T,x.length<3)return[]}return x}function Ya(l,t){const s=l.reduce((a,n)=>a.add(n),new v).divideScalar(l.length),e=[],o=[];for(let a=0;a<l.length;a++){const n=l[a],r=l[(a+1)%l.length];e.push(s.x,s.y,s.z,n.x,n.y,n.z,r.x,r.y,r.z);for(let h=0;h<3;h++)o.push(t.x,t.y,t.z)}const i=new kt;return i.setAttribute("position",new Ps(e,3)),i.setAttribute("normal",new Ps(o,3)),i}const Bs=new v,go=new v,ss=new v,Qo=new be;class ve{static softness=.6;group=new rt;front;back;outline=null;uniforms;kind;face;pull=new v;pullVel=new v;target=new v;squash=0;squashVel=0;hop=0;hopVel=0;shear=new xt;shearVel=new xt;lastWorld=new v;lastVelocity=new v;tracked=0;blinkAt=1.5+Math.random()*3;dragging=!1;holdStretch=0;swingTarget=new v;maxStretch;height;cuts;caps=[];env;outlines;ownsGeometry;constructor(t,s,e,o={}){this.kind=t,this.face=!!o.face,this.env=e,this.outlines=o.outlines,this.cuts=(o.cuts||[]).slice(0,mo),this.ownsGeometry=!o.geometry;const i=o.geometry||(t==="slime"?ja():t==="pudding"?qa():Ha());i.computeBoundingBox();const a=i.boundingBox;this.height=a.max.y-a.min.y,this.maxStretch=this.height*1.25,this.uniforms={uTime:e.uTime,uSunDir:e.uSunDir,uSunColor:e.uSunColor,uSkyColor:e.uSkyColor,uGroundColor:e.uGroundColor,uNight:e.uNight,uSeed:{value:o.seed??Math.random()*10},uGrab:{value:new v(0,this.height*.75,.4)},uPull:{value:new v},uRadius:{value:t==="cube"?1.15:.95},uBase:{value:a.min.y},uHeight:{value:this.height},uSquash:{value:0},uShear:{value:new v},uBulge:{value:.6},uColor:{value:new W(s.color)},uDeep:{value:new W(s.deep)},uTop:{value:new W(s.top||s.color)},uTopStart:{value:s.top?t==="pudding"?1.02:this.height*.8:99},uOpacity:{value:.6},uBack:{value:0},uFace:{value:this.face?1:0},uBlink:{value:1},uMood:{value:0},uFaceCenter:{value:new v(0,this.height*.42,0)},uOutlineWidth:o.outlines?o.outlines.uWidth:{value:0},uResolution:o.outlines?o.outlines.uResolution:{value:new xt(1,1)},uClip:{value:Array.from({length:mo},(r,h)=>this.cuts[h]?.clone()||new Xe(0,0,0,1))},uClipCount:{value:this.cuts.length}};const n=r=>new it({uniforms:{...we.clone(ye.fog),...this.uniforms,uBack:{value:r?1:0},uFace:r?{value:0}:this.uniforms.uFace},vertexShader:po,fragmentShader:Ko,transparent:!0,depthWrite:!r,side:r?hs:oa,fog:!0});this.back=new q(i,n(!0)),this.front=new q(i,n(!1)),this.back.renderOrder=4,this.front.renderOrder=5,this.front.userData.jelly=this,this.group.add(this.back,this.front),o.outlines&&(this.outline=new q(i,new it({uniforms:{...we.clone(ye.fog),...this.uniforms},vertexShader:po,fragmentShader:Ua,side:hs,fog:!0,defines:{OUTLINE:""},transparent:!0,depthWrite:!1})),this.outline.renderOrder=6,this.group.add(this.outline)),this.cuts.forEach((r,h)=>{const c=Xa(i,r,this.cuts.filter((d,p)=>p!==h));if(c.length<3)return;const u=new q(Ya(c,r),new it({uniforms:{...we.clone(ye.fog),...this.uniforms,uBack:{value:0},uFace:{value:0}},vertexShader:po,fragmentShader:Ko,transparent:!0,depthWrite:!0,side:Xt,fog:!0}));u.renderOrder=5,this.caps.push(u),this.group.add(u)})}split(t){if(this.cuts.length>=mo)return null;const s=t.clone().negate(),e=this.front.geometry,o=e.getAttribute("position"),i=new v;let a=0,n=0;for(let c=0;c<o.count;c+=3)i.fromBufferAttribute(o,c),Gs(i,this.cuts)&&(i.dot(new v(t.x,t.y,t.z))<=t.w?a++:n++);const r=a+n;if(!r||a/r<.06||n/r<.06)return null;const h=c=>{const u=new ve(this.kind,{color:"#fff",deep:"#000"},this.env,{face:this.face,outlines:this.outlines,geometry:e,cuts:[...this.cuts,c]});for(const d of["uColor","uDeep","uTop"])u.uniforms[d].value.copy(this.uniforms[d].value);return u.uniforms.uTopStart.value=this.uniforms.uTopStart.value,u.uniforms.uSeed.value=this.uniforms.uSeed.value,u};return[h(t),h(s)]}centroid(){const t=this.front.geometry.getAttribute("position"),s=new v,e=new v;let o=0;for(let i=0;i<t.count;i+=2)s.fromBufferAttribute(t,i),Gs(s,this.cuts)&&(e.add(s),o++);return o?e.divideScalar(o):e}samplePoints(t=90){const s=this.front.geometry.getAttribute("position"),e=[];for(let i=0;i<s.count;i++){const a=new v().fromBufferAttribute(s,i);Gs(a,this.cuts)&&e.push(a)}for(const i of this.caps){const a=i.geometry.getAttribute("position");for(let n=0;n<a.count;n++)e.push(new v().fromBufferAttribute(a,n))}const o=Math.max(1,Math.floor(e.length/t));return e.filter((i,a)=>a%o===0)}setLook(t){this.uniforms.uColor.value.set(t.color),this.uniforms.uDeep.value.set(t.deep),this.uniforms.uTop.value.set(t.top||t.color)}hit(t){if(!this.cuts.length)return t.intersectObject(this.front,!1)[0];const s=new v;return t.intersectObjects([this.front,...this.caps],!1).find(e=>Gs(this.front.worldToLocal(s.copy(e.point)),this.cuts,.01))}grab(t){this.uniforms.uGrab.value.copy(t),this.dragging=!0}dragTo(t){this.target.copy(t).sub(this.uniforms.uGrab.value),this.target.length()>this.maxStretch&&this.target.setLength(this.maxStretch)}release(){this.dragging&&(this.dragging=!1,this.target.set(0,0,0),this.swingTarget.set(0,0,0),this.squashVel+=Math.min(3.2,this.pull.length()*2.4),this.kick(-this.pull.x*2.2,-this.pull.z*2.2))}kick(t,s){this.shearVel.x+=t,this.shearVel.y+=s}hopStep(t){this.hop>0||this.hopVel!==0||(this.hopVel=t,this.squashVel-=1.4)}get airborne(){return this.hop>0||this.hopVel>0}get hopHeight(){return this.hop}swing(t,s){this.swingTarget.copy(t).multiplyScalar(-s),this.swingTarget.length()>this.maxStretch*.6&&this.swingTarget.setLength(this.maxStretch*.6)}land(t){this.swingTarget.set(0,0,0),this.squashVel-=Math.min(5,t*.6);const s=Math.random()*Math.PI*2,e=Math.min(1.6,t*.18);this.kick(Math.cos(s)*e,Math.sin(s)*e),t>2&&(this.hopVel=Math.min(3.4,t*.32))}poke(t=!1){this.squashVel-=2.6;const s=Math.random()*Math.PI*2;this.kick(Math.cos(s)*1.1,Math.sin(s)*1.1),t&&(this.hopVel=5.2)}update(t,s){const e=Math.max(1,Math.min(6,Math.ceil(t/.008333333333333333))),o=t/e,i=Math.min(1,Math.max(0,ve.softness)),a=this.dragging?260:120*(1.5-i*.8),n=this.dragging?24:5.2*(1.35-i*.6);this.group.getWorldPosition(Bs),ss.set(0,0,0),this.tracked>1&&t>1e-4?(go.copy(Bs).sub(this.lastWorld).divideScalar(t),ss.copy(go).sub(this.lastVelocity).divideScalar(t),ss.lengthSq()>8100&&ss.setLength(90),this.lastVelocity.copy(go),this.group.getWorldQuaternion(Qo).invert(),ss.applyQuaternion(Qo)):this.tracked===1&&t>1e-4&&this.lastVelocity.copy(Bs).sub(this.lastWorld).divideScalar(t),this.lastWorld.copy(Bs),this.tracked++;const r=Math.PI*2*(4.2-i*1.9),h=2*(.24-i*.14)*r,c=1.1+i*.6,u=this.holdStretch>0?this.swingTarget:this.target;for(let d=0;d<e;d++)this.pullVel.x+=((u.x-this.pull.x)*a-this.pullVel.x*n)*o,this.pullVel.y+=((u.y-this.pull.y)*a-this.pullVel.y*n)*o,this.pullVel.z+=((u.z-this.pull.z)*a-this.pullVel.z*n)*o,this.pull.addScaledVector(this.pullVel,o),this.squashVel+=(-(this.squash-this.holdStretch)*150*(1.45-i*.75)-this.squashVel*6.5*(1.3-i*.55))*o,this.squash+=this.squashVel*o,this.shearVel.x+=(-r*r*this.shear.x-h*this.shearVel.x-ss.x*c)*o,this.shearVel.y+=(-r*r*this.shear.y-h*this.shearVel.y-ss.z*c)*o,this.shear.addScaledVector(this.shearVel,o),(this.hop>0||this.hopVel!==0)&&(this.hopVel-=22*o,this.hop+=this.hopVel*o,this.hop<=0&&(this.hop=0,this.hopVel<-1&&(this.squashVel-=Math.min(4,-this.hopVel*.55)),this.hopVel=0));this.squash=Math.max(-.45,Math.min(.6,this.squash)),this.shear.lengthSq()>.36*.36&&(this.shear.setLength(.36),this.shearVel.multiplyScalar(.5)),this.uniforms.uShear.value.set(this.shear.x,0,this.shear.y),this.uniforms.uBulge.value=.35+i*.45,this.uniforms.uPull.value.copy(this.pull),this.uniforms.uSquash.value=this.squash+(this.hopVel>0?Math.min(.18,this.hopVel*.04):0),this.front.position.y=this.hop,this.back.position.y=this.hop,this.outline&&(this.outline.position.y=this.hop);for(const d of this.caps)d.position.y=this.hop;if(this.face){this.blinkAt-=t,this.blinkAt<0&&(this.blinkAt=2.4+Math.random()*3.6);const d=this.blinkAt<.14?this.blinkAt/.14:1;this.uniforms.uBlink.value=this.blinkAt<.14?Math.abs(d*2-1):1}}get moving(){return this.dragging||this.holdStretch>0||this.pull.lengthSq()>1e-5||this.pullVel.lengthSq()>1e-5||Math.abs(this.squash)>1e-4||this.hop>0||this.shear.lengthSq()>1e-6||this.shearVel.lengthSq()>1e-5}dispose(){this.ownsGeometry&&this.front.geometry.dispose();for(const t of this.caps)t.geometry.dispose(),t.material.dispose();this.front.material.dispose(),this.back.material.dispose(),this.outline?.material?.dispose()}}const Ce=`
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
`,_s=`
// 一層光網：格子點慢慢晃，取「離兩個最近點一樣遠」的地方（格子的邊）當亮線
float causticCells(vec2 p, float t) {
  vec2 i = floor(p), f = fract(p);
  float f1 = 8.0, f2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash22(i + g);
      o = 0.5 + 0.4 * sin(t * (0.6 + 0.5 * o.yx) + 6.2831853 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) { f2 = d; }
    }
  }
  return sqrt(f2) - sqrt(f1);
}
// 兩層疊起來，亮線交錯成網；先用跟格子差不多大的雜訊把直直的格子邊扭成軟軟的曲線，
// 亮線本身細細的，旁邊再帶一圈淡淡的光暈。width 越大線越粗（遠處用粗一點，免得閃）
// 光網的「離亮線多遠」（0＝在亮線上）：要自己決定線寬、或做彩色邊的時候用
float causticEdge(vec2 p, float t) {
  vec2 bend = vec2(vnoise(p * 1.15 + t * 0.12), vnoise(p * 1.15 + 4.3 - t * 0.1)) - 0.5;
  vec2 drift = vec2(vnoise(p * 0.3 + t * 0.04), vnoise(p * 0.3 - t * 0.035 + 5.2)) * 1.4;
  vec2 q = p + drift + bend * 0.62;
  float a = causticCells(q, t);
  #ifdef CAUSTIC_TWO_LAYERS
    float b = causticCells(q * 1.31 - drift * 0.6 + 3.1, t * 1.19);
    return min(a, b * 1.2);
  #else
    return a;
  #endif
}
float caustics(vec2 p, float t, float width) {
  vec2 bend = vec2(vnoise(p * 1.15 + t * 0.12), vnoise(p * 1.15 + 4.3 - t * 0.1)) - 0.5;
  vec2 drift = vec2(vnoise(p * 0.3 + t * 0.04), vnoise(p * 0.3 - t * 0.035 + 5.2)) * 1.4;
  vec2 q = p + drift + bend * 0.62;
  float a = causticCells(q, t);
  #ifdef CAUSTIC_TWO_LAYERS
    float b = causticCells(q * 1.31 - drift * 0.6 + 3.1, t * 1.19);
    float e = min(a, b * 1.2);
  #else
    float e = a;
  #endif
  return (1.0 - smoothstep(0.0, width, e)) + (1.0 - smoothstep(0.0, width * 3.5, e)) * 0.22;
}
`,Ri=`
uniform vec3 uWaterGlow;
uniform vec3 uWaterFog;
uniform vec3 uWaterAbyss;
uniform float uWaterRays;
vec3 waterDome(vec3 d, vec3 sunDir, float time) {
  vec3 col = mix(uWaterFog, uWaterAbyss, smoothstep(0.0, -0.8, d.y));
  col = mix(col, uWaterGlow, smoothstep(0.02, 0.92, d.y) * 0.92);
  vec3 sunIn = normalize(vec3(sunDir.x * 0.55, 1.0, sunDir.z * 0.55));
  float s = max(dot(d, sunIn), 0.0);
  col += uWaterGlow * pow(s, 5.0) * 0.3;
  vec3 u = normalize(cross(sunIn, vec3(0.0, 0.0, 1.0)));
  vec3 v = cross(sunIn, u);
  vec2 circle = normalize(vec2(dot(d, u), dot(d, v)) + 1e-5);
  float rays = vnoise(circle * 6.0 + vec2(time * 0.05, 0.0)) * 0.6 + vnoise(circle * 15.0 - vec2(0.0, time * 0.08)) * 0.4;
  rays = smoothstep(0.5, 0.86, rays) * smoothstep(-0.15, 0.7, s);
  return col + uWaterGlow * rays * 0.24 * uWaterRays;
}
`;let os=null;function $a(){if(os)return os;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.47)/.07)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.86)/.1))*.06;t[s]=Math.round(Math.min(1,.2+i*.74+a)*255)}return os=new vs(t,l,1,lo,ws),os.magFilter=ae,os.minFilter=ae,os.needsUpdate=!0,os}let is=null;function Za(){if(is)return is;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.4)/.2)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.82)/.14))*.05;t[s]=Math.round(Math.min(1,.46+i*.5+a)*255)}return is=new vs(t,l,1,lo,ws),is.magFilter=ae,is.minFilter=ae,is.needsUpdate=!0,is}const Ka=`
uniform float uTime;
uniform float uWind;
attribute float aExtra;
vec3 windSway(vec3 p, float weight) {
  float phase = p.x * 0.45 + p.z * 0.38;
  vec3 offset = vec3(sin(uTime * 1.35 + phase), 0.0, cos(uTime * 1.05 + phase * 1.3)) * 0.055;
  offset.x += sin(uTime * 3.1 + phase * 2.0) * 0.012;
  return offset * weight * uWind;
}
`,_o={color:{value:new W("#fff6dc")},strength:{value:.42}};function qe(l,t={}){const s={vertexColors:t.vertexColors??!0,color:t.color?new W(t.color):16777215,...t.side!==void 0?{side:t.side}:{},emissive:t.emissive?new W(t.emissive):0,emissiveIntensity:t.emissiveIntensity??1},e=t.pbr?new Ht({...s,roughness:t.roughness??.88,metalness:0}):new Si({...s,gradientMap:t.anime?Za():$a()}),o={value:t.rim??(t.pbr?.12:t.anime?.2:.32)},i={value:new W(t.rimColor||"#fff6dc")},a={value:1};return e.onBeforeCompile=n=>{n.uniforms.uRim=o,n.uniforms.uRimColor=i,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uTime=l.uTime,n.uniforms.uWind=a,(t.caustics||t.rock||t.terrainDetail)&&(n.uniforms.uCausticColor=_o.color,n.uniforms.uCausticStrength=_o.strength,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCausticWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
vCausticWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`)),t.wind&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${Ka}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed += windSway(transformed, aExtra);`));const r=t.caustics||t.rock||t.terrainDetail?`
uniform float uTime;
uniform vec3 uCausticColor;
uniform float uCausticStrength;
varying vec3 vCausticWorld;
${Ce}
${_s}`:"",h=t.rock?`
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
        diffuseColor.rgb = mix(diffuseColor.rgb, coralTint, coral * 0.6);`:"",c=t.terrainDetail?`
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
        roughnessFactor = clamp(roughnessFactor * (0.85 + 0.3 * terrainDetailValue), 0.0, 1.0);`:"",d=t.rock?`
        // 斜斜看過去的岩壁邊緣融進水裡（水是有厚度的），輪廓才不會像剪下來的
        #ifdef USE_FOG
          float rockEdge = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.2);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, rockEdge * 0.6);
        #endif`:"",p=t.caustics?`
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
uniform vec3 uSunDir;${r}`).replace("#include <color_fragment>",`#include <color_fragment>${h}${c}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>${u}`).replace("#include <fog_fragment>",`#include <fog_fragment>${d}`).replace("#include <opaque_fragment>",`${p}
        // 輪廓光：只在朝向太陽那一側的邊緣，硬邊、像動畫裡的高光描邊
        vec3 viewDir = normalize(vViewPosition);
        float rimDot = 1.0 - clamp(dot(normal, viewDir), 0.0, 1.0);
        vec3 sunView = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
        float facingSun = clamp(dot(normal, sunView) * 0.6 + 0.55, 0.0, 1.0);
        outgoingLight += uRimColor * smoothstep(0.68, 0.76, rimDot) * facingSun * uRim;
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>`l3d-toon-${t.pbr?"pbr-":t.anime?"anime-":""}${t.wind?"wind":"still"}${t.caustics?"-caustics":""}${t.rock?"-rock":""}${t.terrainDetail?"-terrain":""}`,e.userData.rim=o,e.userData.wind=a,e}const Qa=`
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
`,Ja=`
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
`;function tn(){return{uWidth:{value:2},uResolution:{value:new xt(1,1)}}}function en(l,t,s,e={}){const o=l.getAttribute("position").count;l.getAttribute("aExtra")||l.setAttribute("aExtra",new $(new Float32Array(o),1)),l.getAttribute("color")||l.setAttribute("color",new $(new Float32Array(o*3).fill(.5),3));const i=new it({uniforms:{...we.clone(ye.fog),uWidth:s.uWidth,uWidthScale:{value:e.width??1},uResolution:s.uResolution,uTime:t.uTime,uWind:{value:1},uUseWind:{value:e.wind?1:0},uUseVertexColor:{value:e.vertexColors===!1?0:1},uInk:{value:new W(e.ink||"#24343a")},uTint:{value:e.tint??.55}},vertexShader:Qa,fragmentShader:Ja,side:hs,fog:!0}),a=new q(l,i);return a.renderOrder=-1,a}function Jo(l,t,s,e={}){const o=en(l.geometry,t,s,e);return l.add(o),o}const Go=`
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
`,sn=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,on=`
uniform float uTime;
varying vec3 vDir;
${Ce}
${Go}
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
`,an=`
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
`,nn=`
uniform float uOpacity;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.2, 1.0, d)) * uOpacity * vTwinkle;
  gl_FragColor = vec4(vec3(1.0, 0.97, 0.9), a);
}
`,rn=`
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
`,ln=`
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
${Ce}
${Go}
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
`;function vo(l,t,s,e,o,i){const a=[],n=2.4+t()*1.4,r=4+Math.floor(t()*3);for(let m=0;m<r;m++){const g=r===1?0:m/(r-1)-.5;a.push({x:g*n,y:.25+t()*.2,z:(t()-.5)*.7,r:.62+t()*.3-Math.abs(g)*.35})}const h=1+Math.round(o*2);for(let m=1;m<=h;m++){const g=Math.max(1,Math.round((r-1)*(1-m/(h+1.2)))),M=n*(1-m/(h+1.6));for(let x=0;x<g;x++){const y=g===1?0:x/(g-1)-.5;a.push({x:y*M+(t()-.5)*.4,y:.35+m*(.62+t()*.22),z:(t()-.5)*.5,r:.7+t()*.32-m*.04})}}const c=a.length;for(let m=0;m<c;m++){const g=a[m];for(let M=0;M<3;M++){const x=t()*Math.PI*2;a.push({x:g.x+Math.cos(x)*g.r*.75,y:g.y+Math.abs(Math.sin(x))*g.r*.7,z:g.z+.2+t()*.2,r:g.r*(.34+t()*.2)})}}const u=a.reduce((m,g)=>Math.max(m,g.y+g.r),0),d=Math.cos(i),p=Math.sin(i),f={x:s.x,y:s.y+u*e*.32,z:s.z};for(const m of a){const g=m.x*e,M=m.z*e;l.push({x:s.x+g*d-M*p,y:s.y+m.y*e,z:s.z+g*p+M*d,r:m.r*e*1.3,h:Math.min(1,Math.max(0,m.y/Math.max(.01,u))),seed:t()*10,cx:f.x,cy:f.y,cz:f.z})}}function cn(l,t){const s=new rt,e={uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze},o=new q(new J(460,40,20),new it({uniforms:{...e,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:sn,fragmentShader:on,side:hs,depthWrite:!1,toneMapped:!1}));o.renderOrder=-10,s.add(o);const i=Re(41),a=t==="high"?620:300,n=new Float32Array(a*3),r=new Float32Array(a),h=new v;for(let P=0;P<a;P++){do h.set(i()*2-1,i()*.95+.04,i()*2-1);while(h.lengthSq()>1);h.normalize().multiplyScalar(420),n.set([h.x,h.y,h.z],P*3),r[P]=i()*10}const c=new kt;c.setAttribute("position",new $(n,3)),c.setAttribute("aSeed",new $(r,1));const u={uOpacity:{value:0},uScale:{value:1}},d=new ke(c,new it({uniforms:{...u,uTime:l.uTime},vertexShader:an,fragmentShader:nn,transparent:!0,depthWrite:!1,blending:oe}));d.renderOrder=-9,s.add(d);const p=new rt,f=Re(77),m=[],g=t==="high"?17:12;for(let P=0;P<g;P++){const _=P/g*Math.PI*2+f()*.25,E=300+f()*110,A=new v(Math.cos(_)*E,-5+f()*4,Math.sin(_)*E);vo(m,f,A,9+f()*9,.4+f()*1.1,-_+Math.PI/2)}const M=t==="high"?9:6;for(let P=0;P<M;P++){const _=P/M*Math.PI*2+.2+f()*.4,E=215+f()*50,A=new v(Math.cos(_)*E,3+f()*6,Math.sin(_)*E);vo(m,f,A,5+f()*4,.15+f()*.6,-_+Math.PI/2)}const x=t==="high"?8:5;for(let P=0;P<x;P++){const _=f()*Math.PI*2,E=190+f()*70,A=new v(Math.cos(_)*E,20+f()*16,Math.sin(_)*E);vo(m,f,A,2.6+f()*2.2,.1+f()*.3,-_+Math.PI/2)}m.sort((P,_)=>Math.hypot(_.x,_.z)-Math.hypot(P.x,P.z));const y=new zi;y.setAttribute("position",new $(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),y.setIndex([0,1,2,0,2,3]),y.setAttribute("aCenter",new Ye(new Float32Array(m.flatMap(P=>[P.x,P.y,P.z])),3)),y.setAttribute("aRadius",new Ye(new Float32Array(m.map(P=>P.r)),1)),y.setAttribute("aHeight",new Ye(new Float32Array(m.map(P=>P.h)),1)),y.setAttribute("aSeed",new Ye(new Float32Array(m.map(P=>P.seed)),1)),y.setAttribute("aCloud",new Ye(new Float32Array(m.flatMap(P=>[P.cx,P.cy,P.cz])),3)),y.instanceCount=m.length;const S={uLit:{value:new W("#ffffff")},uMid:{value:new W("#e3ebf8")},uShade:{value:new W("#aebde3")},uOpacity:{value:1}},T=new it({uniforms:{...S,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:rn,fragmentShader:ln,transparent:!0,depthWrite:!1}),C=new q(y,T);return C.renderOrder=-8,C.frustumCulled=!1,p.add(C),s.add(p),{group:s,uniforms:e,stars:d,clouds:p,starUniforms:u,cloudUniforms:S,dispose:()=>{o.geometry.dispose(),o.material.dispose(),c.dispose(),d.material.dispose(),C.geometry.dispose(),T.dispose()}}}const Js=8,Pe=192,Fo=16,Io=2,to=.5;function hn(l){const t=new Uint8Array(Pe*Pe*4);for(let e=0;e<Pe;e++)for(let o=0;o<Pe;o++){const i=((o+.5)/Pe*2-1)*Fo,a=((e+.5)/Pe*2-1)*Fo;let n=Io;for(const h of l){let c=i-h.x,u=a-h.z;if(h.sx||h.sz){const d=Math.cos(h.yaw||0),p=Math.sin(h.yaw||0),f=c*d-u*p,m=c*p+u*d;c=f/(h.sx||1),u=m/(h.sz||1);const g=(Math.hypot(c,u)-1)*Math.min(h.sx||1,h.sz||1);n=Math.min(n,g);continue}n=Math.min(n,Math.hypot(c,u)-h.r)}const r=(e*Pe+o)*4;t[r]=Math.round(Math.min(1,Math.max(0,(n+to)/(Io+to)))*255),t[r+1]=0,t[r+2]=0,t[r+3]=255}const s=new vs(t,Pe,Pe,Oo,ws);return s.magFilter=ae,s.minFilter=ae,s.needsUpdate=!0,s}const Se=256,se=16,he=8,eo=3,Di=.7;function un(){let l=4127;const t=()=>(l=l*16807%2147483647,l/2147483647),s=Float32Array.from({length:se*se},t),e=(c,u)=>s[(u%se+se)%se*se+(c%se+se)%se],o=(c,u)=>{const d=Math.floor(c),p=Math.floor(u),f=c-d,m=u-p,g=f*f*(3-2*f),M=m*m*(3-2*m),x=e(d,p),y=e(d+1,p),S=e(d,p+1),T=e(d+1,p+1);return x+(y-x)*g+(S-x)*M+(x-y-S+T)*g*M},i=(c,u)=>o(c,u)*.66+o(c*2,u*2)*.34,a=Array.from({length:he*he},()=>[.15+t()*.7,.15+t()*.7]),n=new Uint8Array(Se*Se*4),r=se/Se;for(let c=0;c<Se;c++)for(let u=0;u<Se;u++){const d=u*r,p=c*r,f=i(d,p),m=(i(d+r,p)-i(d-r,p))/(2*r),g=(i(d,p+r)-i(d,p-r))/(2*r),M=u/Se*he,x=c/Se*he,y=Math.floor(M),S=Math.floor(x);let T=9,C=9;for(let _=-1;_<=1;_++)for(let E=-1;E<=1;E++){const A=y+E,O=S+_,L=a[(O%he+he)%he*he+(A%he+he)%he],D=Math.hypot(A+L[0]-M,O+L[1]-x);D<T?(C=T,T=D):D<C&&(C=D)}const P=(c*Se+u)*4;n[P]=Math.round(Math.min(1,Math.max(0,m/(2*eo)+.5))*255),n[P+1]=Math.round(Math.min(1,Math.max(0,g/(2*eo)+.5))*255),n[P+2]=Math.round(Math.min(1,Math.max(0,f))*255),n[P+3]=Math.round(Math.min(1,(C-T)/Di)*255)}const h=new vs(n,Se,Se,Oo,ws);return h.wrapS=h.wrapT=ki,h.magFilter=ae,h.minFilter=bi,h.generateMipmaps=!0,h.needsUpdate=!0,h}function dn(l){const t=l==="high"?200:140,s=[];let e=5.2;for(;e<15;)s.push(e),e+=l==="high"?.28:.4;for(;e<520;)s.push(e),e*=l==="high"?1.075:1.1;s.push(520);const o=new Float32Array(s.length*t*3);s.forEach((n,r)=>{for(let h=0;h<t;h++){const c=h/t*Math.PI*2;o.set([Math.cos(c)*n,0,Math.sin(c)*n],(r*t+h)*3)}});const i=[];for(let n=0;n<s.length-1;n++){const r=n*t,h=(n+1)*t;for(let c=0;c<t;c++){const u=(c+1)%t;i.push(r+c,r+u,h+c,r+u,h+u,h+c)}}const a=new kt;return a.setAttribute("position",new $(o,3)),a.setIndex(i),a.computeBoundingSphere(),a}const fn=`
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
`,pn=`
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
uniform vec4 uRipples[${Js}];
uniform sampler2D uSeaNoise;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_fragment>
#ifdef RIPPLE_SIM
${_i}
#endif
${Ce}
${_s}
${Go}
${Ri}
// 高畫質每個像素自己算雜訊；手機與舊電腦讀那張雜訊圖（B 色版＝平滑雜訊，一格 ${se} 個單位）
#ifdef SEA_HIGH
  #define SEA_NOISE(p) vnoise(p)
#else
  #define SEA_NOISE(p) texture2D(uSeaNoise, (p) * ${(1/se).toFixed(4)}).b
#endif
// 光網（讀圖版）：兩層往不同方向慢慢飄、再用低頻的斜率扭一下
float seaCaustics(vec2 p, float t, float width) {
  #ifdef SEA_HIGH
    return caustics(p, t, width);
  #else
    vec2 warp = (texture2D(uSeaNoise, p * 0.021 + t * 0.002).rg - 0.5) * 1.1;
    // 再用跟格子差不多大的扭曲把直直的格子邊彎成曲線（不然看起來像碎玻璃）
    vec2 bend = (texture2D(uSeaNoise, p * 0.07 - t * 0.004 + 0.21).rg - 0.5) * 0.36;
    float a = texture2D(uSeaNoise, (p + warp + bend) * ${(1/he).toFixed(4)} + vec2(t * 0.012, t * 0.007)).a;
    float b = texture2D(uSeaNoise, (p * 1.31 - warp - bend) * ${(1/he).toFixed(4)} - vec2(t * 0.009, -t * 0.011) + 0.37).a;
    float e = min(a, b * 1.2) * ${Di.toFixed(2)};
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
    vec2 g1 = (texture2D(uSeaNoise, q1 * ${(1/se).toFixed(4)}).rg - 0.5) * ${(2*eo).toFixed(1)};
    vec2 g2 = (texture2D(uSeaNoise, q2 * ${(1/se).toFixed(4)} + 0.5).rg - 0.5) * ${(2*eo).toFixed(1)};
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
  for (int i = 0; i < ${Js}; i++) {
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
    vec2 fieldUv = lp / ${(Fo*2).toFixed(1)} + 0.5;
    if (all(greaterThan(fieldUv, vec2(0.0))) && all(lessThan(fieldUv, vec2(1.0)))) {
      float obstacle = texture2D(uFoamField, fieldUv).r * ${(Io+to).toFixed(2)} - ${to.toFixed(2)};
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
`,mn=[[.94,.34,11,.085,.55],[.62,.78,7.3,.055,.5],[.99,-.12,17,.11,.4],[.17,.98,4.9,.03,.55]];function gn(l,t,s,e,o={height:0,slopeX:0,slopeZ:0}){o.height=0,o.slopeX=0,o.slopeZ=0;for(const[i,a,n,r]of mn){const h=Math.PI*2/n,c=Math.sqrt(9.8/h)*.42,u=h*(i*l+a*t-c*s);o.height+=r*e*Math.sin(u),o.slopeX+=i*h*r*e*Math.cos(u),o.slopeZ+=a*h*r*e*Math.cos(u)}return o}const vn=`
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
`,wn=`
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
`;function yn(l,t,s,e,o=null,i=!1){const a=hn(s),n=un(),r=Array.from({length:Js},()=>new Xe(0,0,-100,0));let h=0;const c={...we.clone(ye.fog),uCoast:{value:t},uFoamField:{value:a},uSeaNoise:{value:n},uShallow:{value:new W("#5fe3d6")},uMid:{value:new W("#16a5cf")},uDeep:{value:new W("#0a4f9e")},uFoam:{value:new W("#ffffff")},uSand:{value:new W("#f1dcae")},uGlowFoam:{value:new W("#7ff3ff")},uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSkyColor:l.uSkyColor,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTime:l.uTime,uNight:l.uNight,uRipples:{value:r},uSwellScale:{value:1},...o?o.uniforms:{},uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays},u=new it({uniforms:c,vertexShader:fn,fragmentShader:pn,transparent:!0,depthWrite:!1,side:Xt,fog:!0,defines:{...e==="high"?{SEA_HIGH:"",CAUSTIC_TWO_LAYERS:""}:{},...o?{RIPPLE_SIM:""}:{},...o&&i?{RIPPLE_VTF:""}:{}}}),d=new q(dn(e),u);d.renderOrder=2,d.frustumCulled=!1;const p=e==="high"?2200:1100,f=new Float32Array(p*3),m=new Float32Array(p*3);let g=9127;const M=()=>(g=g*16807%2147483647,g/2147483647);for(let T=0;T<p;T++){const C=Math.PI/2+(M()-.5)*4.2,P=9+Math.pow(M(),1.4)*150;f.set([Math.cos(C)*P,0,Math.sin(C)*P],T*3),m.set([M(),M(),M()],T*3)}const x=new kt;x.setAttribute("position",new $(f,3)),x.setAttribute("aSeed",new $(m,3));const y={uTime:l.uTime,uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir,uColor:{value:new W("#fffbef")}},S=new ke(x,new it({uniforms:y,vertexShader:vn,fragmentShader:wn,transparent:!0,depthWrite:!1,blending:oe}));return S.frustumCulled=!1,S.renderOrder=3,{mesh:d,uniforms:c,sparkles:S,sparkleUniforms:y,ripple:(T,C,P)=>{r[h].set(T,C,l.uTime.value,P),h=(h+1)%Js},dispose:()=>{d.geometry.dispose(),u.dispose(),a.dispose(),n.dispose(),x.dispose(),S.material.dispose()}}}const ti=22;class Ni{jelly;area;shadow;others;scale;state="idle";wait;target=new v;stepVel=new v;pauseBetweenHops=0;heldGoal=new v;velocity=new v;grabOffset=new v;lift=0;liftVel=0;swimTime=0;get sink(){return .28*this.scale}yawGoal=null;constructor(t,s,e,o,i){this.jelly=t,this.area=s,this.others=e,this.shadow=o,this.scale=t.group.scale.x,this.wait=.8+i%3*1.1,this.target.copy(t.group.position)}get position(){return this.jelly.group.position}get held(){return this.state==="held"}get swimming(){return this.state==="swim"}frozen=!1;floor(t,s){return Math.max(this.area.ground(t,s),this.area.seaLevel)}free(t,s,e=0){const o=Math.atan2(s,t);if(Math.hypot(t,s)>this.area.reach(o)-e)return!1;for(const[i,a,n]of this.area.blocked)if((t-i)**2+(s-a)**2<(n+e)**2)return!1;return!this.area.avoid?.(t,s)}pickTarget(){const t=this.position;for(let s=0;s<24;s++){const e=Math.random()*Math.PI*2,o=1.1+Math.random()*2.2,i=t.x+Math.cos(e)*o,a=t.z+Math.sin(e)*o;if(!this.free(i,a,.25))continue;let n=!0;for(let r=1;r<6&&n;r++){const h=r/6;this.free(t.x+(i-t.x)*h,t.z+(a-t.z)*h)||(n=!1)}if(n&&!this.others.some(r=>r!==this&&(Math.hypot(r.target.x-i,r.target.z-a)<1.3||Math.hypot(r.position.x-i,r.position.z-a)<1.1)))return this.target.set(i,0,a),!0}return!1}pause(){this.state==="walk"&&(this.state="idle"),this.wait=Math.max(this.wait,1.5)}hold(t){this.state="held",this.grabOffset.copy(t),this.heldGoal.copy(this.position),this.velocity.set(0,0,0),this.jelly.holdStretch=.32}holdTo(t){if(this.state!=="held")return;this.heldGoal.copy(t).sub(this.grabOffset);const s=Math.atan2(this.heldGoal.z,this.heldGoal.x),e=this.area.swimReach(s),o=Math.hypot(this.heldGoal.x,this.heldGoal.z);o>e&&(this.heldGoal.x*=e/o,this.heldGoal.z*=e/o);const i=this.floor(this.heldGoal.x,this.heldGoal.z);this.heldGoal.y=Math.min(i+4.5,Math.max(i+.55,this.heldGoal.y))}drop(){if(this.state!=="held")return;this.state="fall",this.jelly.holdStretch=0;const t=this.floor(this.position.x,this.position.z);this.lift=Math.max(0,this.position.y-t),this.liftVel=Math.max(-2,this.velocity.y)}update(t,s){const e=this.position,o=this.jelly;if(!this.frozen){if(this.state==="held")this.velocity.x+=((this.heldGoal.x-e.x)*90-this.velocity.x*14)*t,this.velocity.y+=((this.heldGoal.y-e.y)*90-this.velocity.y*14)*t,this.velocity.z+=((this.heldGoal.z-e.z)*90-this.velocity.z*14)*t,e.addScaledVector(this.velocity,t),o.swing(this.velocity,.05/this.scale),this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);else if(this.state==="fall"){if(this.liftVel-=ti*t,this.lift+=this.liftVel*t,e.x+=this.velocity.x*t*.3,e.z+=this.velocity.z*t*.3,this.velocity.multiplyScalar(Math.exp(-t*3)),o.swing(this.velocity,.03/this.scale),this.lift<=0){const i=-this.liftVel;this.lift=0,this.liftVel=0,this.area.ground(e.x,e.z)<this.area.seaLevel-.05?(this.state="swim",this.swimTime=0,o.land(i*.6),this.area.onSplash?.(e.clone(),i)):(o.land(i),this.unstick(),this.state="idle",this.wait=.8+Math.random()*1.2)}e.y=this.floor(e.x,e.z)+this.lift-(this.state==="swim"?this.sink:0)}else if(this.state==="swim"){this.swimTime+=t;const i=Math.atan2(e.z,e.x),a=Math.hypot(e.x,e.z);if(this.swimTime>1.1){const r=.9+this.scale*.4,h=Math.max(0,a-r*t)/Math.max(.001,a);e.x*=h,e.z*=h,this.yawGoal=Math.atan2(-e.x,-e.z)}else this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);o.swing(new v(Math.sin(this.swimTime*3)*.4,0,0),.02/this.scale);const n=this.area.ground(e.x,e.z);if(e.y=this.area.seaLevel-this.sink+Math.sin(this.swimTime*2.6)*.04,n>this.area.seaLevel-.02){const r=this.area.reach(i)*.82;this.target.set(Math.cos(i)*r,0,Math.sin(i)*r),this.state="walk",this.pauseBetweenHops=.2,e.y=Math.max(n,this.area.seaLevel)-.02}}else if(this.state==="idle")e.y=this.area.ground(e.x,e.z)-.02,this.wait-=t,this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z),this.wait<=0&&!o.dragging&&(this.pickTarget()?(this.state="walk",this.pauseBetweenHops=0):this.wait=.6);else if(this.state==="walk"){if(o.airborne)e.x+=this.stepVel.x*t,e.z+=this.stepVel.z*t;else{this.pauseBetweenHops-=t;const i=this.target.x-e.x,a=this.target.z-e.z,n=Math.hypot(i,a);if(n<.12)this.state="idle",this.wait=1.4+Math.random()*3.2;else if(this.pauseBetweenHops<=0){const r=3+Math.random()*.6,h=2*r/ti,c=Math.min(n,.42+this.scale*.2);this.stepVel.set(i/n*c/h,0,a/n*c/h),o.hopStep(r),this.pauseBetweenHops=.12+Math.random()*.14,this.yawGoal=Math.atan2(i,a)}}e.y=this.floor(e.x,e.z)-.02}if(this.yawGoal!==null){let i=this.yawGoal-o.group.rotation.y;i=Math.atan2(Math.sin(i),Math.cos(i)),o.group.rotation.y+=i*(1-Math.exp(-t*(this.state==="walk"?7:3)))}if(this.shadow){const i=this.area.ground(e.x,e.z),a=Math.max(0,e.y-i)+o.hopHeight;this.shadow.position.set(e.x,i+.035,e.z);const n=1/(1+a*.35);this.shadow.scale.setScalar(n),this.shadow.material.opacity=i<this.area.seaLevel?0:.32*n}}}unstick(){const t=this.position;for(const[s,e,o]of this.area.blocked){const i=t.x-s,a=t.z-e,n=Math.hypot(i,a);if(n<o){const r=(o+.05)/Math.max(.001,n);t.x=s+i*r,t.z=e+a*r}}this.target.copy(t)}}function Wi(l,t){const s=new DataView(t.bin);if(s.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const e=s.getUint32(4,!0),o=s.getUint32(8,!0),i=new v(s.getFloat32(12,!0),s.getFloat32(16,!0),s.getFloat32(20,!0)),a=m=>m+3&-4;let n=24;const r=new Int16Array(t.bin,n,e*3);n=a(n+e*6);const h=new Int8Array(t.bin,n,e*3);n=a(n+e*3);const c=new Uint16Array(t.bin,n,e*2);n=a(n+e*4);const u=e<65536?new Uint16Array(t.bin,n,o):new Uint32Array(t.bin,n,o),d=new kt;d.setAttribute("position",new $(r,3,!0)),d.setAttribute("normal",new $(h,3,!0)),d.setAttribute("uv",new $(c,2,!0)),d.setIndex(new $(u,1)),d.computeBoundingSphere();const p=new Po(t.color);p.colorSpace=ro,p.flipY=!1,p.anisotropy=4,p.needsUpdate=!0;let f=null;return t.normal&&(f=new Po(t.normal),f.flipY=!1,f.needsUpdate=!0),{name:l,geometry:d,extent:i,map:p,normalMap:f}}async function Vi(l){return Wi(l,await Fi(l))}const Oi=(l,t)=>t/(l.extent.y*2),Li=`
uniform float uTime;
uniform float uWindStrength;
vec3 modelWind(vec3 p) {
  float w = pow(clamp(p.y * 0.5 + 0.5, 0.0, 1.0), 2.2) * uWindStrength;
  float phase = p.x * 1.7 + p.z * 1.3;
  return vec3((sin(uTime * 1.1 + phase) * 0.6 + sin(uTime * 2.7 + phase * 2.3) * 0.15) * w, 0.0, cos(uTime * 0.9 + phase) * 0.4 * w);
}
`;function Eo(l,t,s={}){const e=new Ht({map:t.map,normalMap:t.normalMap,roughness:.62,metalness:0,envMapIntensity:.9,...s.side!==void 0?{side:s.side}:{},...s.tint?{color:s.tint}:{}});t.normalMap&&e.normalScale.set(.6,.6);const o={value:s.wind||0},i={value:s.rim??.14},a={value:s.phase||0};return e.onBeforeCompile=n=>{n.uniforms.uTime=l.uTime,n.uniforms.uWindStrength=o,n.uniforms.uPhase=a,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uRim=i,n.uniforms.uRimColor={value:new W("#fff0dc")},(s.wind||s.deform)&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${Li}
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
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>`larch-model-clay${s.wind?"-wind":""}${s.deform?`-${t.name}`:""}`,e.userData.phase=a,e}const xn=`
uniform float uWidth;
uniform float uWidthScale;
uniform vec2 uResolution;
uniform float uUseWind;
uniform float uPhase;
${Li}
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
`,bn=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Mn(l,t,s,e={}){const o=new it({uniforms:{uWidth:t.uWidth,uWidthScale:{value:e.width??.55},uResolution:t.uResolution,uTime:l.uTime,uWindStrength:{value:e.wind||0},uUseWind:{value:e.wind?1:0},uPhase:e.phase||{value:0},uOpacity:e.opacity||{value:1},uInk:{value:new W(e.ink||"#2b1d2a")},fogColor:{value:new W},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:xn.replace("DEFORM_BODY",e.deform||""),fragmentShader:bn,side:hs,fog:!0,transparent:!!e.opacity}),i=new q(s.geometry,o);return i.name=`${s.name}-outline`,s.add(i),i}const gs=81,$e=6.6,Ze=1.36,Ro=.6,Gi=-1.15,Bi=1.55,wo=.02;class Sn{size=gs;extent=$e;data=new Float32Array(gs*gs);dirty=!1;get cell(){return 2*this.extent/(this.size-1)}pointX(t){return-this.extent+t*this.cell}pointZ(t){return-this.extent+t*this.cell}sample(t,s){if(!this.dirty)return 0;const e=this.size,o=(t+this.extent)/this.cell,i=(s+this.extent)/this.cell;if(o<=0||i<=0||o>=e-1||i>=e-1)return 0;const a=Math.floor(o),n=Math.floor(i),r=o-a,h=i-n,c=n*e+a,u=this.data;return(u[c]*(1-r)+u[c+1]*r)*(1-h)+(u[c+e]*(1-r)+u[c+e+1]*r)*h}clear(){this.data.fill(0),this.dirty=!1}snapshot(){return this.data.slice()}restore(t){this.data.set(t),this.dirty=t.some(s=>s!==0)}encode(){if(!this.dirty||!this.data.some(e=>Math.abs(e)>=wo/2))return"";const t=new Uint8Array(this.data.length);for(let e=0;e<this.data.length;e++)t[e]=(Math.max(-127,Math.min(127,Math.round(this.data[e]/wo)))+256)%256;let s="";for(let e=0;e<t.length;e+=4096)s+=String.fromCharCode(...t.subarray(e,e+4096));return btoa(s)}decode(t){if(this.clear(),!t)return!0;try{const s=atob(t);if(s.length!==this.data.length)return!1;for(let e=0;e<s.length;e++){const o=s.charCodeAt(e);this.data[e]=Math.max(Gi,Math.min(Bi,(o>127?o-256:o)*wo))}return this.dirty=this.data.some(e=>e!==0),!0}catch{return this.clear(),!1}}}const zn=`
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
`,kn=`
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
${Ce}
${_s}
#ifdef RIPPLE_SIM
${_i}
#endif
void main() {
  // 跟捏地形的格子對齊：第 i 個格點在第 i 個像素的正中間
  vec2 p = vLocal.xz;
  vec2 uv = ((p + ${$e.toFixed(3)}) / ${(2*$e/(gs-1)).toFixed(5)} + 0.5) / ${gs.toFixed(1)};
  float depth = texture2D(uPondDepth, uv).r * ${Ro.toFixed(2)};
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
  float deep = smoothstep(0.0, ${Ro.toFixed(2)}, depth);
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
`;function Cn(l,t,s){const e=gs,o=new Uint8Array(e*e),i=new vs(o,e,e,lo,ws);i.magFilter=ae,i.minFilter=ae,i.needsUpdate=!0;const a=new it({uniforms:{...we.clone(ye.fog),uPondDepth:{value:i},uTime:l.uTime,uNight:l.uNight,uShallow:t.uShallow,uDeep:t.uMid,uSand:t.uSand,uGlowFoam:t.uGlowFoam,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,...s?s.uniforms:{}},vertexShader:zn,fragmentShader:kn,transparent:!0,depthWrite:!1,fog:!0,defines:s?{RIPPLE_SIM:""}:{}}),n=new Fe(2*$e,2*$e,1,1);n.rotateX(-Math.PI/2);const r=new q(n,a);r.position.y=Ze,r.renderOrder=3,r.visible=!1,r.name="pond";const h=new Float32Array(e*e);return{mesh:r,update:(c,u)=>{let d=!1;for(let p=0;p<e;p++)for(let f=0;f<e;f++){const m=p*e+f,g=c.data[m],M=g<-.01?Math.max(0,Ze-(u(c.pointX(f),c.pointZ(p))+g)):0;h[m]=M,o[m]=Math.round(Math.min(1,M/Ro)*255),o[m]>1&&(d=!0)}return i.needsUpdate=!0,r.visible=d,d},depthAt:(c,u)=>{if(!r.visible)return 0;const d=2*$e/(e-1),p=(c+$e)/d,f=(u+$e)/d;if(p<=0||f<=0||p>=e-1||f>=e-1)return 0;const m=Math.floor(p),g=Math.floor(f),M=p-m,x=f-g,y=g*e+m;return(h[y]*(1-M)+h[y+1]*M)*(1-x)+(h[y+e]*(1-M)+h[y+e+1]*M)*x},dispose:()=>{n.dispose(),a.dispose(),i.dispose()}}}const ei=new Ee,Tn=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2;class Pn{items=[];add(t,s,e=[]){if(this.items.find(a=>a.object===t)){this.setBase(t,s);return}const i={object:t,followers:e,x:s.x,y:s.y,z:s.z,shear:new xt,shearVel:new xt,squash:0,squashVel:0,pop:1,matrix:new Ee};this.items.push(i);for(const a of[t,...e])a.updateMatrix=function(){As.prototype.updateMatrix.call(this),this.matrix.premultiply(i.matrix)}}attach(t,s){const e=this.items.find(o=>o.object===t);!e||e.followers.includes(s)||(e.followers.push(s),s.updateMatrix=function(){As.prototype.updateMatrix.call(this),this.matrix.premultiply(e.matrix)})}objects(){return this.items.map(t=>t.object)}remove(t){const s=this.items.findIndex(o=>o.object===t);if(s<0)return;const[e]=this.items.splice(s,1);for(const o of[e.object,...e.followers])delete o.updateMatrix,o.updateMatrix()}setBase(t,s){const e=this.items.find(o=>o.object===t);e&&(e.x=s.x,e.y=s.y,e.z=s.z)}has(t){return this.items.some(s=>s.object===t)}poke(t,s=1){const e=this.items.find(i=>i.object===t);if(!e)return!1;const o=Math.random()*Math.PI*2;return e.squashVel-=2.4*s,e.shearVel.x+=Math.cos(o)*.9*s,e.shearVel.y+=Math.sin(o)*.9*s,!0}pop(t){const s=this.items.find(e=>e.object===t);s&&(s.pop=0,s.squashVel+=1.6)}nudgeAround(t,s,e,o){for(const i of this.items){const a=Math.hypot(i.x-t,i.z-s);if(a>e)continue;const n=(1-a/e)*o,r=a>.001?(i.x-t)/a:1,h=a>.001?(i.z-s)/a:0;i.shearVel.x+=r*n,i.shearVel.y+=h*n,i.squashVel-=n*.8}}update(t,s){const e=Math.min(1,Math.max(0,ve.softness)),o=Math.PI*2*(3.2-e*1.4),i=2*(.2-e*.11)*o,a=Math.PI*2*(3.6-e*1.2),n=2*(.22-e*.1)*a,r=.035+e*.03,h=Math.max(1,Math.min(4,Math.ceil(t/(1/120)))),c=t/h;for(const u of this.items){if(!u.object.parent)continue;const d=s.alpha*u.z-s.omega*s.omega*u.x,p=-s.alpha*u.x-s.omega*s.omega*u.z;for(let x=0;x<h;x++)u.shearVel.x+=(-o*o*u.shear.x-i*u.shearVel.x-d*r)*c,u.shearVel.y+=(-o*o*u.shear.y-i*u.shearVel.y-p*r)*c,u.shear.addScaledVector(u.shearVel,c),u.squashVel+=(-a*a*u.squash-n*u.squashVel)*c,u.squash+=u.squashVel*c;u.shear.lengthSq()>.14*.14&&(u.shear.setLength(.14),u.shearVel.multiplyScalar(.6)),u.squash=Math.max(-.32,Math.min(.32,u.squash));let f=1;u.pop<1&&(u.pop=Math.min(1,u.pop+t/.42),f=Math.max(.001,Tn(u.pop)));const m=u.squash,g=(1+m)*f,M=f/Math.sqrt(Math.max(.3,1+m));u.matrix.makeTranslation(u.x,u.y,u.z).multiply(ei.set(M,u.shear.x*g,0,0,0,g,0,0,0,u.shear.y*g,M,0,0,0,0,1)).multiply(ei.makeTranslation(-u.x,-u.y,-u.z))}}get moving(){return this.items.some(t=>t.shear.lengthSq()>1e-6||Math.abs(t.squash)>1e-4||t.pop<1)}dispose(){for(const t of[...this.items])this.remove(t.object)}}const so=20261108,de={x:-2.7,z:-1.7,r:1.7,h:.9},An=[{x:1.7,z:-2.3,r:1.25,h:1.62},{x:3.35,z:.25,r:1.15,h:1.6},{x:.3,z:1.6,r:2.2,h:1.58}],Ys=1.18;function qt(l){const t=Math.cos(l),s=Math.sin(l);return 7.05+.55*ie(t*1.35+3.1,s*1.35+1.7,3)+.26*Math.sin(3*l+.8)+.16*Math.sin(5*l+2.1)}function _n(l,t){return Math.abs(((l-t)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}function Do(l,t){let s=1.6+.14*ie(l*.22+4,t*.22-2,3);s+=de.h*Math.exp(-((l-de.x)**2+(t-de.z)**2)/(2*de.r*de.r));for(const e of An){const o=Math.exp(-((l-e.x)**2+(t-e.z)**2)/(2*e.r*e.r));s=_e(s,e.h,o*.9)}return s}function ho(l){const t=Math.exp(-(_n(l,Ys)**2)/.08000000000000002);return{ramp:t,edge:.8-.1*t,foot:.885+.04*t}}function si(l,t){const s=Math.atan2(t,l),{edge:e}=ho(s);return 1-ut(e-.14,e-.035,Math.hypot(l,t)/qt(s))}function Ui(l,t,s,e){const{ramp:o,edge:i,foot:a}=ho(e);if(l<=i){const r=ut(i-.07,i,l);return Do(t,s)-r*r*(.2-.12*o)}if(l<=a){const r=(l-i)/(a-i),h=Do(t,s)-(.2-.12*o),c=.5-.5*Math.cos(Math.PI*Math.pow(r,.78));return _e(h,.42,_e(c,r,o))}if(l<=1.04){const r=(l-a)/(1.04-a);return _e(.42,-.24,Math.pow(r,1.12))+.04*ie(t*.9,s*.9,2)}const n=Ie((l-1.04)/.18);return _e(-.24,-3.2,n*n*(3-2*n))}function Nt(l,t){const s=Math.atan2(t,l),e=qt(s);return Ui(Math.hypot(l,t)/e,l,t,s)}const oi=[...Array.from({length:24},(l,t)=>Math.round((.03+t*.03)*1e3)/1e3),.745,.765,.78,.792,.805,.818,.832,.846,.86,.873,.89,.91,.935,.96,.985,1.01,1.04,1.08,1.12,1.17,1.22];function Fn(l){const t=[0,Do(0,0),0];for(const o of oi)for(let i=0;i<l;i++){const a=i/l*Math.PI*2,n=o*qt(a),r=Math.cos(a)*n,h=Math.sin(a)*n;t.push(r,Ui(o,r,h,a),h)}const s=[];for(let o=0;o<l;o++)s.push(0,1+(o+1)%l,1+o);for(let o=0;o<oi.length-1;o++){const i=1+o*l,a=1+(o+1)*l;for(let n=0;n<l;n++){const r=(n+1)%l;s.push(i+n,i+r,a+n,i+r,a+r,a+n)}}const e=new kt;return e.setAttribute("position",new $(new Float32Array(t),3)),e.setIndex(s),e.computeVertexNormals(),e}function Ts(l,t){const s=Math.max(0,-3.2-t),e=Math.cos(l),o=Math.sin(l),i=ut(0,4,s);return qt(l)*1.22+s*.115+i*(.75*ie(e*1.6+t*.09,o*1.6-t*.07,3)+.35*Math.sin(t*.55+l*2))}const ue=-58;function In(l){const t=[];for(let i=-3.2;i>ue-2;i-=i>-18?.6:1.2)t.push(i);t.push(ue-2);const s=[];for(const i of t)for(let a=0;a<l;a++){const n=a/l*Math.PI*2,r=Ts(n,i);s.push(Math.cos(n)*r,i,Math.sin(n)*r)}const e=[];for(let i=0;i<t.length-1;i++){const a=i*l,n=(i+1)*l;for(let r=0;r<l;r++){const h=(r+1)%l;e.push(a+r,a+h,n+r,a+h,n+h,n+r)}}const o=new kt;return o.setAttribute("position",new $(new Float32Array(s),3)),o.setIndex(e),o.computeVertexNormals(),o}const En="#fbebcb",ji="#a77548",$s="#8a5c38",ii="#fff3dd";function Rn(l,t=10){const s=new J(1,t+2,t),e=s.getAttribute("position"),o=new v;for(let i=0;i<e.count;i++){o.fromBufferAttribute(e,i);const a=1+.18*ie(o.x*1.7+l,o.z*1.7+o.y*1.3-l,2);o.multiplyScalar(a),o.y*=.72,e.setXYZ(i,o.x,o.y,o.z)}return s.computeVertexNormals(),s}function ze(l,t=16,s=12){return new J(l,t,s)}function qi(l){const t=Math.atan2(l.z,l.x),s=Math.hypot(l.x,l.z)/qt(t),{ramp:e,edge:o,foot:i}=ho(t),a=ie(l.x*.6,l.z*.6,2),n=It("#86d46c","#aee88c",.45+a*.4+(l.y-1.6)*.3),r=It("#9ade7e","#b8ec98",.5+a*.4),h=Math.sin(l.y*7.5+a*1.5)*.5+.5,c=It("#efd6ae","#e2c290",h*.5),u=It(En,"#f6dfb8",.5+a*.6),d=It("#f0d9b4","#8fd0c4",ut(-.06,-2.6,l.y)),p=_e(o+.012,i-.01,e),f=n.clone();return f.lerp(r,ut(o-.05,o,s)*(1-e)),f.lerp(c,ut(p-.004,p+.01,s)),f.lerp(u,ut(i-.012,i+.006,s)),f.lerp(d,ut(.985,1.03,s)),f}class Hi{solid=new Et;glow=new Et;pierParts=new Et;halos=[];chimneys=[];shadows=[];foamRings=[];rand=Re(so);ground;constructor(t=Nt){this.ground=t}at(t,s){return this.ground(t,s)}tree({x:t,z:s},e,o){const i=this.at(t,s)-.05,a=new ht(.15,.24,1.6,10,5),n=a.getAttribute("position");for(let c=0;c<n.count;c++){const u=n.getY(c)+.8;n.setX(c,n.getX(c)+.14*(u/1.6)**2)}a.translate(0,.8,0),a.computeVertexNormals(),this.solid.add(a,$s,G({x:t,y:i,z:s,s:e}));const r=new v(t+.1*e,i+2.05*e,s),h=(c,u,d,p)=>{this.solid.add(ze(p,20,14),(f,m)=>It("#3f9a3e","#8fda62",m.y*.5+.5+.1*f.x),G({x:t+c*e,y:i+u*e,z:s+d*e,s:e}),.55+u*.18,{center:r,amount:.78})};h(.12,2,0,.95),h(.7,1.7,.25,.68),h(-.5,1.75,-.2,.72),h(.2,2.55,-.08,.62),h(-.2,1.65,.55,.55);for(const[c,u,d]of[[.55,2,.72],[-.35,2.25,.78],[.9,1.55,.55],[-.75,1.6,.45]])this.solid.add(ze(.13,10,8),o,G({x:t+c*e,y:i+u*e,z:s+d*e,s:e}),.9);this.shadows.push({x:t,z:s,r:1.5*e,o:.32})}palm({x:t,z:s},e,o,i){const a=this.at(t,s)-.05,n=Math.cos(i),r=Math.sin(i);let h=0,c=0,u=0;for(let p=0;p<8;p++){const f=new ht(.15-p*.008,.17-p*.008,.36,10,1),m=p/7;h=n*o*m*m*1.4,u=r*o*m*m*1.4,c=p*.33,this.solid.add(f,p%2?"#c99c64":"#b8874f",G({x:t+h*e,y:a+(c+.18)*e,z:s+u*e,rx:r*o*m*.5,rz:-n*o*m*.5,s:e}))}const d=a+(c+.36)*e;for(let p=0;p<7;p++){const f=p/7*Math.PI*2+.3,m=new J(1,14,6);m.scale(1.15,.05,.3),m.translate(1,0,0),this.solid.add(m,g=>It("#3d9f3f","#79cf55",Ie(g.x*.5+.2)),G({x:t+h*e,y:d,z:s+u*e,ry:f,rz:-.42,s:e}),g=>Ie(g.x*.6)*1.4)}for(let p=0;p<3;p++){const f=p*2.1;this.solid.add(ze(.13,10,8),"#7a5233",G({x:t+(h+Math.cos(f)*.17)*e,y:d-.14*e,z:s+(u+Math.sin(f)*.17)*e,s:e}))}this.shadows.push({x:t+h*e,z:s+u*e,r:1.2*e,o:.22})}house({x:t,z:s},e,o,i){const a=this.at(t,s),n=c=>{const u=Math.cos(e),d=Math.sin(e),p=c.x||0,f=c.z||0;return G({...c,x:t+p*u+f*d,y:a+(c.y||0),z:s-p*d+f*u,ry:(c.ry||0)+e})};this.solid.add(new wt(2.05,.24,1.75,2,.08),"#d9cdb8",n({y:.08})),this.solid.add(new wt(1.8,1.25,1.5,3,.12),ii,n({y:.82}));const r=new ht(.86,.86,1.66,3,1);r.rotateZ(Math.PI/2),r.rotateX(-Math.PI/2),this.solid.add(r,ii,n({y:1.62,s:[1.04,.82,.86]}));for(const c of[-1,1])this.solid.add(new wt(2.25,.15,1.36,2,.07),u=>It(o,"#ffffff",u.y>.04?.14:0),n({y:1.9,z:c*.4,rx:c*.907}));this.solid.add(new wt(.28,.62,.28,2,.06),"#c46a4f",n({x:-.55,y:2.1,z:-.3}));const h=n({x:-.55,y:2.45,z:-.3}).elements;this.chimneys.push(new v(h[12],h[13],h[14])),this.solid.add(new wt(.44,.72,.1,2,.05),i,n({y:.56,z:.76})),this.solid.add(ze(.04,8,6),"#f2c14e",n({x:.12,y:.55,z:.82}));for(const c of[-.55,.55]){this.solid.add(new wt(.46,.46,.06,2,.04),"#ffffff",n({x:c,y:.98,z:.755})),this.glow.add(new wt(.34,.34,.05,2,.03),"#ffcf6e",n({x:c,y:.98,z:.78})),this.solid.add(new wt(.5,.1,.16,2,.04),ji,n({x:c,y:.7,z:.82}));for(const p of[-.15,0,.15])this.solid.add(ze(.07,8,6),p===0?"#ffd166":"#ff8fab",n({x:c+p,y:.79,z:.84}));const d=n({x:c,y:.98,z:.85}).elements;this.halos.push(d[12],d[13],d[14])}this.shadows.push({x:t,z:s,r:1.9,o:.32})}windmillBody({x:t,z:s}){const e=this.at(t,s)-.05;this.solid.add(new ht(.62,.92,2.7,20,4),o=>It("#f4e7cf","#e2cfaa",ut(.6,-1.3,o.y)),G({x:t,y:e+1.35,z:s}));for(const o of[.2,1.25])this.solid.add(new cs(.62+(1-o/1.35)*.28,.05,6,24),"#c9ad84",G({x:t,y:e+o,z:s,rx:Math.PI/2}));return this.solid.add(new J(.8,20,10,0,Math.PI*2,0,Math.PI/2),"#e3584d",G({x:t,y:e+2.66,z:s,s:[1,.92,1]})),this.solid.add(new wt(.42,.66,.1,2,.05),$s,G({x:t,y:e+.36,z:s+.9,rx:-.11})),this.glow.add(new wt(.26,.3,.06,2,.03),"#ffcf6e",G({x:t,y:e+1.55,z:s+.79,rx:-.11})),this.halos.push(t,e+1.55,s+.86),this.shadows.push({x:t,z:s,r:1.4,o:.3}),new v(t,e+2.42,s+.85)}pier(t){const s=qt(t),e=new v(Math.cos(t),0,Math.sin(t)),o=Math.atan2(e.x,e.z),i=s*.93;for(let n=0;n<12;n++){const r=i+n*.32;this.pierParts.add(new wt(1.15,.07,.28,1,.03),n%3===1?"#b98a5a":"#c79a69",G({x:e.x*r,y:.42,z:e.z*r,ry:o}))}for(let n=0;n<4;n++){const r=i+.3+n*1.12;for(const h of[-1,1]){const c=Math.cos(t+Math.PI/2)*.52*h,u=Math.sin(t+Math.PI/2)*.52*h;this.pierParts.add(new ht(.075,.085,2,8,1),$s,G({x:e.x*r+c,y:-.45,z:e.z*r+u})),this.foamRings.push({x:e.x*r+c,z:e.z*r+u,r:.1})}}const a=i+12*.32;return{x:e.x*(a+.8),z:e.z*(a+.8),yaw:o}}lighthouse({x:t,z:s}){const e=this.at(t,s)-.1;this.solid.add(new ht(.4,.55,2.3,16,6),o=>Math.floor((o.y+1.15)/.46)%2?"#ffffff":"#e8574b",G({x:t,y:e+1.15,z:s})),this.solid.add(new ht(.55,.55,.1,16,1),"#3f4a5a",G({x:t,y:e+2.33,z:s})),this.glow.add(new ht(.3,.3,.42,12,1),"#fff1a8",G({x:t,y:e+2.6,z:s})),this.solid.add(new Me(.42,.5,16),"#e8574b",G({x:t,y:e+3.06,z:s})),this.solid.add(ze(.08,8,6),"#f2c14e",G({x:t,y:e+3.36,z:s})),this.halos.push(t,e+2.6,s),this.shadows.push({x:t,z:s,r:.9,o:.28})}rock({x:t,z:s},e,o="#a9b6bf"){const i=this.at(t,s)-.12*e;this.solid.add(Rn(this.rand()*10),(a,n)=>It("#7f8e98",o,n.y*.5+.55),G({x:t,y:i,z:s,ry:this.rand()*6,s:e})),this.foamRings.push({x:t,z:s,r:e*.95})}flower({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new ht(.015,.02,.24,4,1),"#4f9d3f",G({x:t,y:o+.12,z:s}),i=>Ie(i.y/.24+.5)*.7);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;this.solid.add(ze(.06,6,4),e,G({x:t+Math.cos(a)*.065,y:o+.25,z:s+Math.sin(a)*.065,s:[1,.55,1]}),.75)}this.solid.add(ze(.045,6,4),"#ffd84d",G({x:t,y:o+.27,z:s}),.75)}bush({x:t,z:s},e){const o=this.at(t,s)-.05,i=new v(t,o+.2*e,s);for(const[a,n,r,h]of[[0,.3,0,.45],[.38,.22,.1,.34],[-.36,.24,-.05,.36]])this.solid.add(ze(h,14,10),(c,u)=>It("#3d8f3a","#6cc451",u.y*.5+.5),G({x:t+a*e,y:o+n*e,z:s+r*e,s:e}),.25,{center:i,amount:.7});this.shadows.push({x:t,z:s,r:.75*e,o:.22})}stone({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new ht(.3,.33,.1,12,1),It("#efe2c6","#d8c8a8",this.rand()).getHex(),G({x:t,y:o+.02,z:s,ry:this.rand()*3,s:[e,1,e*(.8+this.rand()*.3)]}))}fence(t,s,e){for(let a=0;a<e;a++){const n=a/(e-1),r=_e(t.x,s.x,n),h=_e(t.z,s.z,n);this.solid.add(new wt(.12,.55,.12,1,.04),"#c99a68",G({x:r,y:this.at(r,h)+.25,z:h}))}const o=Math.hypot(s.x-t.x,s.z-t.z),i=Math.atan2(s.x-t.x,s.z-t.z);for(const a of[.2,.4]){const n=(t.x+s.x)/2,r=(t.z+s.z)/2;this.solid.add(new wt(.06,.07,o,1,.02),"#d8ab78",G({x:n,y:this.at(n,r)+a,z:r,ry:i}))}}}function Dn(){const l=new Et;l.add(ze(.16,12,10),"#8a5c38");for(let t=0;t<4;t++){const s=t/4*Math.PI*2;l.add(new wt(.09,1.55,.07,1,.03),"#9b6a42",G({x:Math.sin(s)*.8,y:Math.cos(s)*.8,rz:-s})),l.add(new wt(.36,1.12,.03,1,.012),e=>Math.abs(e.y)%.28<.04?"#e6d4b8":"#fffaf0",G({x:Math.sin(s)*.9+Math.cos(s)*.19,y:Math.cos(s)*.9-Math.sin(s)*.19,z:.02,rz:-s}))}return l.build()}function Nn(){const l=new J(.42,28,18),t=["#ef4b4b","#ffffff","#ffd23f","#ffffff","#3d8bfd","#ffffff"],s=new Et;return s.add(l,e=>{if(Math.abs(e.y)>.36)return"#ffffff";const o=(Math.atan2(e.z,e.x)+Math.PI)/(Math.PI*2);return t[Math.floor(o*6)%6]}),s.build()}function Xi(){const l=new Et;l.add(new wt(.86,.46,.58,2,.05),"#a3683c",G({y:.23})),l.add(new wt(.72,.03,.44,1,.01),"#4a2a14",G({y:.463}));for(const e of[-.3,.3])l.add(new wt(.08,.48,.6,1,.02),"#f2c14e",G({x:e,y:.24}));for(let e=0;e<7;e++)l.add(new ht(.07,.07,.025,10,1),"#ffd54a",G({x:-.26+e%4*.17,y:.47+(e>3?.03:0),z:-.12+(e>3?.14:0),rx:.2*(e%2)}));const t=new Et,s=new ht(.29,.29,.86,16,1,!1,0,Math.PI);s.rotateZ(Math.PI/2),t.add(s,"#b3743f",G({y:0,z:.29}));for(const e of[-.3,.3]){const o=new ht(.3,.3,.08,16,1,!1,0,Math.PI);o.rotateZ(Math.PI/2),t.add(o,"#f2c14e",G({x:e,z:.29}))}return t.add(new wt(.14,.16,.05,1,.02),"#f2c14e",G({y:.02,z:.6})),t.add(new wt(.86,.04,.58,1,.015),"#6e4122",G({y:.02,z:.29})),{base:l.build(),lid:t.build()}}function Wn(){const l=new Et,t=new J(1,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2);return l.add(t,s=>s.y>-.18?"#ffffff":"#e8604c",G({s:[.55,.42,1.2]})),l.add(new wt(.9,.06,.24,1,.02),ji,G({y:-.08})),l.add(new ht(.025,.025,1.3,6,1),$s,G({x:.3,y:.1,rz:1.1})),l.build()}function Vn(){const l=document.createElement("canvas");l.width=l.height=64;const t=l.getContext("2d"),s=t.createRadialGradient(32,32,0,32,32,32);return s.addColorStop(0,"#ffffff"),s.addColorStop(.55,"#737373"),s.addColorStop(1,"#000000"),t.fillStyle=s,t.fillRect(0,0,64,64),new no(l)}const On=`
attribute vec3 color;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Ln=`
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
`,Gn=`
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
`,Bn=`
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
`,ai=`
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
`,ni=`
uniform vec3 uColor;
uniform float uOpacity;
varying float vFlicker;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.2) * uOpacity * vFlicker;
  gl_FragColor = vec4(uColor, a);
}
`,No=[{color:"#7fe0a0",deep:"#2f9a63",name:["薄荷","Mint"]},{color:"#ffa0c4",deep:"#d44d86",name:["草莓","Strawberry"]},{color:"#8cc8ff",deep:"#3b78d0",name:["汽水","Soda"]},{color:"#ffd36b",deep:"#d9902a",name:["檸檬","Lemon"]},{color:"#c7a8ff",deep:"#7a52d4",name:["葡萄","Grape"]}];async function Un(l,t,s=async()=>{}){const e=new rt;e.name="island";const o=new rt;e.add(o);const i=new Hi,a=new Sn,n=(w,b)=>Nt(w,b)+a.sample(w,b),r=new Pn;let h=null;const c=t.models||{},u=new Map,d=(w,b)=>{let k=u.get(w.name);k||(k=Eo(l,w,{wind:b.wind}),u.set(w.name,k));const I=new q(w.geometry,k),N=Oi(w,b.height);I.scale.copy(w.extent).multiplyScalar(N);const X=b.y??Nt(b.x,b.z);return I.position.set(b.x,X+w.extent.y*N-(b.sink??.05),b.z),I.rotation.y=b.yaw,I.castShadow=!0,I.receiveShadow=!0,I.name=`model-${w.name}`,o.add(I),r.add(I,{x:b.x,y:X,z:b.z}),I},p=(w,b)=>(w.updateMatrix(),b.clone().applyMatrix4(w.matrix)),f=(w,b)=>{const k=w.geometry.getAttribute("position"),I=new v;let N=-1/0;for(let X=0;X<k.count;X++){const U=k.getX(X),Y=k.getY(X),nt=k.getZ(X),ce=b(U,Y,nt);ce>N&&(N=ce,I.set(U,Y,nt))}return I},m=w=>{const b=w.geometry.getAttribute("position");let k=0,I=0,N=0,X=0,U=0,Y=0;for(let nt=0;nt<b.count;nt++){const ce=b.getY(nt);ce>.6&&(k+=b.getX(nt)*w.extent.x,I+=b.getZ(nt)*w.extent.z,N++),ce<-.85&&(X+=b.getX(nt)*w.extent.x,U+=b.getZ(nt)*w.extent.z,Y++)}return Math.atan2(I/Math.max(1,N)-U/Math.max(1,Y),k/Math.max(1,N)-X/Math.max(1,Y))};i.solid.add(Fn(t.segments),qi);const g=i.solid.vertexCount;await s();const M=1.7,x=-2.3,y=-.35,S=c.cottage;if(S){const w=d(S,{x:M,z:x,height:2.9,yaw:y-Math.PI/2,sink:.08});i.chimneys.push(p(w,f(S,(b,k)=>k))),i.shadows.push({x:M,z:x,r:1.9,o:.28})}else i.house({x:M,z:x},y,"#ec6a5c","#8f5a3a");let T;const C=c.windmill;if(C){const w=d(C,{x:de.x,z:de.z,height:3.3,yaw:0,sink:.12}),b=f(C,(I,N,X)=>N>.3?Math.hypot(I*C.extent.x,X*C.extent.z):-1),k=Math.atan2(b.x*C.extent.x,b.z*C.extent.z);w.rotation.y=-k,T=p(w,b),i.shadows.push({x:de.x,z:de.z,r:1.4,o:.28})}else T=i.windmillBody({x:de.x,z:de.z});const P=[[-4,-3.2,1],[.5,-4.5,.92],[4.2,-2.6,.86]],_=["tree","blossom","tree"],E=La(l),A=P.map(([w,b,k],I)=>{const N=3.1*k,X=Ii(_[I],I+1,E,N);return X.position.set(w,Nt(w,b)-.06,b),X.rotation.y=I*2.39+.6,o.add(X),r.add(X,{x:w,y:Nt(w,b)-.06,z:b}),i.shadows.push({x:w,z:b,r:1.5*k,o:.28}),{root:X,x:w,z:b,kind:_[I],height:N,scale:X.scale.x}}),O=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"],L=Re(so+7),D=-.9,R=3.75,j=[[M,x,1.45],[de.x,de.z,1.05],[D,R,.6],...P.map(([w,b])=>[w,b,.75])];let Q=0;const st=[];for(let w=0;w<300&&Q<6;w++){const b=L()*Math.PI*2,k=Math.sqrt(L())*.7*qt(b),I=Math.cos(b)*k,N=Math.sin(b)*k;if(!j.some(([X,U,Y])=>(I-X)**2+(N-U)**2<(Y+.4)**2)){for(let X=0;X<2;X++)i.flower({x:I+(L()-.5)*.35,z:N+(L()-.5)*.35},O[Math.floor(L()*O.length)]);st.push([I,N,.5]),Q++}}const at=[[2.5,5.2],[2,4.4],[1.45,3.65],[.85,3]];at.forEach(([w,b],k)=>i.stone({x:w,z:b},.95+k%2*.08));const ct=[...j,...at.map(([w,b])=>[w,b,.42])],lt=2.45,ot=-.55,Ct=c.palm,ft=Ct?m(Ct):0,pt=[];for(const[w,b,k]of[[lt,1.05,.9],[ot,.95,.8]]){const I=Math.cos(w)*qt(w)*.86,N=Math.sin(w)*qt(w)*.86;if(pt.push([I,N]),!Ct){i.palm({x:I,z:N},b,k,w);continue}d(Ct,{x:I,z:N,height:3.6*b,yaw:ft-w,sink:.12,wind:.04}),i.shadows.push({x:I,z:N,r:1.1*b,o:.2})}const ne=c.rocks;for(const[w,b,k]of[[.25,1,.5],[3,1,.55],[5.35,1.01,.5]]){const I=Math.cos(w)*qt(w)*b,N=Math.sin(w)*qt(w)*b;if(!ne){i.rock({x:I,z:N},k);continue}d(ne,{x:I,z:N,height:k*1.1,yaw:w*3.1,sink:k*.4}),i.foamRings.push({x:I,z:N,r:k*1.3})}const Jt=i.pier(Ys-.05);await s();const Lt=qe(l,{wind:!0,caustics:!0,pbr:!0,roughness:.82}),fe=qe(l,{wind:!1,pbr:!0,roughness:.6}),Wt=new q(i.solid.build(!0),Lt);Wt.castShadow=!0,Wt.receiveShadow=!0,e.add(Wt);const mt=new q(i.pierParts.build(!0),Lt);mt.name="pier",mt.castShadow=!0,mt.receiveShadow=!0,e.add(mt);const Gt={...we.clone(ye.fog),uNight:l.uNight},Rt=new q(i.glow.build(),new it({uniforms:Gt,vertexShader:On,fragmentShader:Ln,fog:!0}));o.add(Rt),await s();const Tt=jn(l,t.detail,ct,.05);o.add(Tt);const Dt=new kt;Dt.setAttribute("position",new $(new Float32Array(i.halos),3)),Dt.setAttribute("aSeed",new $(new Float32Array(i.halos.length/3).map((w,b)=>b*1.37),1));const pe=new it({uniforms:{uSize:{value:260},uTime:l.uTime,uColor:{value:new W("#ffc861")},uOpacity:{value:0}},vertexShader:ai,fragmentShader:ni,transparent:!0,depthWrite:!1,blending:oe}),Vt=new ke(Dt,pe);Vt.renderOrder=8,o.add(Vt);const gt=t.detail==="high"?36:18,vt=new Float32Array(gt*3),Pt=Re(so+11);for(let w=0;w<gt;w++){const b=Pt()*Math.PI*2,k=Math.sqrt(Pt())*5.5,I=Math.cos(b)*k,N=Math.sin(b)*k;vt.set([I,Nt(I,N)+.5+Pt()*1.6,N],w*3)}const Yt=new kt;Yt.setAttribute("position",new $(vt,3)),Yt.setAttribute("aSeed",new $(new Float32Array(gt).map((w,b)=>b*2.1),1));const $t=new it({uniforms:{uSize:{value:70},uTime:l.uTime,uColor:{value:new W("#d9ff7a")},uOpacity:{value:0}},vertexShader:ai,fragmentShader:ni,transparent:!0,depthWrite:!1,blending:oe}),V=new ke(Yt,$t);V.userData.base=vt.slice(),V.renderOrder=8,o.add(V);const K=Vn(),tt=new Zs({alphaMap:K,color:"#1d3b2a",transparent:!0,depthWrite:!1,opacity:.3}),bt=[];for(const w of i.shadows){const b=new Fe(w.r*2,w.r*2);b.rotateX(-Math.PI/2),b.translate(w.x,Nt(w.x,w.z)+.03,w.z),bt.push(b)}const dt=new q(qn(bt),tt);dt.renderOrder=1,o.add(dt);const zt=c.sails,Mt=zt?new q(zt.geometry,Eo(l,zt,{side:Xt})):new q(Dn(),fe);if(zt){const w=Math.max(zt.extent.y,zt.extent.z);Mt.scale.copy(zt.extent).multiplyScalar(1.6/w),Mt.rotation.order="ZYX",Mt.rotation.y=Math.PI/2,Mt.receiveShadow=!0}Mt.position.copy(T),Mt.castShadow=!0,o.add(Mt),zt||Jo(Mt,l,t.outlines);const Zt=new q(new ia(1.5,24),new Zs({visible:!1,side:Xt}));Zt.position.copy(T).add(new v(0,0,.06)),o.add(Zt);const yt=o.children.find(w=>w.name==="model-windmill");yt&&(r.attach(yt,Mt),r.attach(yt,Zt));const At=4.05,_t=3.55,Z=new q(Nn(),qe(l,{wind:!1,rim:.5}));Z.position.set(At,Nt(At,_t)+.4,_t),Z.visible=!1;const Ft=Xi(),Bt=Nt(D,R)-.02,et=new q(Ft.base,fe);et.position.set(D,Bt,R),et.rotation.y=.35,et.castShadow=!0;const Ut=new q(Ft.lid,fe);Ut.position.set(0,.46,-.29),et.add(Ut),o.add(et),r.add(et,{x:D,y:Bt,z:R}),yo(o,tt,D,R,.7,.32);const te=1.95,Kt=Ba(),De=qt(te)*1.16;Kt.position.set(Math.cos(te)*De,.04,Math.sin(te)*De),o.add(Kt),i.foamRings.push({x:Kt.position.x,z:Kt.position.z,r:.42});const jt=new q(Wn(),qe(l,{wind:!1,side:Xt}));Jo(jt,l,t.outlines),jt.position.set(Jt.x+Math.cos(Ys+Math.PI/2)*1.1,.05,Jt.z+Math.sin(Ys+Math.PI/2)*1.1),jt.rotation.y=Jt.yaw+.25,e.add(jt),await s();const me=[],ys={ground:n,avoid:(w,b)=>(h?.depthAt(w,b)??0)>.03,reach:w=>qt(w)*.6,blocked:[...j,...pt.map(([w,b])=>[w,b,.6])],seaLevel:0,swimReach:w=>qt(w)*1.45,onSplash:(w,b)=>re.handler?.(w,b)},re={},Ne=[],Ke=(w,b,k,I,N=0)=>{w.group.position.set(b,Nt(b,k)-.02,k),w.group.scale.setScalar(I),w.group.rotation.y=N,o.add(w.group);const X=yo(o,tt,b,k,.95*I,.32);return me.push(w),Ne.push(new Ni(w,ys,Ne,X,me.length)),w},Fs=Ke(new ve("slime",No[0],l,{face:!0,seed:1}),.3,2.05,.78);Ke(new ve("slime",{color:"#ffa0c4",deep:"#d44d86"},l,{face:!0,seed:2}),-1.75,1.55,.58),Ke(new ve("slime",{color:"#8cc8ff",deep:"#3b78d0"},l,{face:!0,seed:3}),2.05,1.35,.62),await s();const xs=new Uint8Array(256);for(let w=0;w<256;w++){const b=(w/256-.5)*Math.PI*2;xs[w]=Math.round(Ie((qt(b)-5.5)/3)*255)}const ge=new vs(xs,256,1,lo,ws);ge.wrapS=ki,ge.magFilter=ae,ge.minFilter=ae,ge.needsUpdate=!0,i.foamRings.push({x:jt.position.x,z:jt.position.z,r:0,sx:.5,sz:1.08,yaw:jt.rotation.y});const St=t.ripples??null,Ot=yn(l,ge,i.foamRings,t.detail,St,!!t.vertexRipples),bs=Ot.mesh,Ms=Ot.uniforms;e.add(bs);let Qe=null;if(St){const w=i.foamRings;St.setWalls((b,k)=>{let I=ut(-.16,.02,Nt(b,k));for(const N of w){let X=b-N.x,U=k-N.z,Y;if(N.sx||N.sz){const nt=Math.cos(N.yaw||0),ce=Math.sin(N.yaw||0),Qt=(X*nt-U*ce)/(N.sx||1),Be=(X*ce+U*nt)/(N.sz||1);Y=(Math.hypot(Qt,Be)-1)*Math.min(N.sx||1,N.sz||1)}else Y=Math.hypot(X,U)-N.r*.8;I=Math.max(I,1-ut(-.04,.06,Y))}return I}),Qe=St.wallArray.slice()}h=Cn(l,Ms,St),o.add(h.mesh);const Es=()=>{if(h.update(a,Nt),!St||!Qe)return;const w=St.wallArray,b=St.size;if(w.set(Qe),h.mesh.visible)for(let k=0;k<b;k++){const I=St.cellZ(k);if(!(Math.abs(I)>6.7))for(let N=0;N<b;N++){const X=St.cellX(N);Math.abs(X)>6.7||h.depthAt(X,I)>.004&&(w[k*b+N]=0)}}St.wallsChanged()},le=new v,We=(w,b,k)=>{St?St.drop(w,b,-.11*k,.22+.14*Math.min(1.6,k)):(o.localToWorld(le.set(w,0,b)),Ot.ripple(le.x,le.z,k))},Rs=St?(w,b,k)=>{e.worldToLocal(le.set(w,0,b)),We(le.x,le.z,k)}:Ot.ripple,Je=new v,Ds=(w,b,k,I,N)=>{if(!St){Ot.ripple(k,I,N);return}e.worldToLocal(Je.set(w,0,b)),e.worldToLocal(le.set(k,0,I));const X=Je.distanceTo(le),U=Math.min(.05,.008+X*.06)*N;St.trail(Je.x,Je.z,le.x,le.z,-U,.2)};await s();const us=new Et;us.add(In(t.detail==="high"?128:72),(w,b)=>{const k=ie(w.x*.35+w.y*.2,w.z*.35-w.y*.15,3),I=-w.y;let N=It("#7d9ea6","#55707f",ut(4,40,I));return N.lerp(It("#b9b393","#7f8c7a",ut(6,40,I)),ut(.3,.8,b.y)*.55),k<-.42&&(N=N.lerp(new W("#5fa88a"),.35)),N});const Ve=new q(us.build(),qe(l,{wind:!1,rim:.12,caustics:!0,rock:!0}));e.add(Ve);const Oe=9,Le=i.chimneys.length*Oe,ts=new Float32Array(Le*3),ds=new Float32Array(Le);for(let w=0;w<Le;w++)ds[w]=w%Oe/Oe;const ee=new kt;ee.setAttribute("position",new $(ts,3)),ee.setAttribute("aAge",new $(ds,1)),ee.setAttribute("aSeed",new $(new Float32Array(Le).map((w,b)=>b*.618034%1),1));const xe=new it({uniforms:{uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir},vertexShader:Gn,fragmentShader:Bn,transparent:!0,depthWrite:!1}),Ge=new ke(ee,xe);Ge.frustumCulled=!1,Ge.renderOrder=7,o.add(Ge);const fs=[],ps=qe(l,{wind:!1,rim:.4,emissive:"#5c6f80",emissiveIntensity:.25}),Ns=new J(.12,10,8);Ns.scale(1.7,.75,.75);const es=new J(.5,10,6);es.scale(.35,.05,1),es.translate(0,0,.42);const Ws=new Et;Ws.add(Ns,"#ffffff"),Ws.add(new Me(.035,.12,6),"#f2b84b",G({x:.24,rz:-Math.PI/2}));const Bo=Ws.build(),z=new Et().add(es,w=>w.z>.7?"#4a5866":"#ffffff").build();for(let w=0;w<3;w++){const b=new rt,k=new q(Bo,ps),I=new q(z,ps),N=new q(z,ps);N.scale.z=-1,b.add(k,I,N),b.scale.setScalar(.9+w*.12),o.add(b),fs.push({group:b,left:I,right:N,radius:9+w*2.2,height:6.5+w*1.3,speed:.22+w*.05,phase:w*2.1})}const F=(w,b)=>{Kt.position.y=.04+Math.sin(b*1.4)*.05,Kt.rotation.set(Math.sin(b*1.1)*.1,te+b*.08,1.22+Math.sin(b*1.4+.6)*.08);for(let k=0;k<Le;k++){const I=i.chimneys[Math.floor(k/Oe)];let N=ds[k]+w*.22;N>1&&(N-=1),ds[k]=N;const X=N*N;ts[k*3]=I.x+X*1.1+Math.sin(b*.8+k)*.08*N,ts[k*3+1]=I.y+N*2.1,ts[k*3+2]=I.z+X*.5}ee.getAttribute("position").needsUpdate=!0,ee.getAttribute("aAge").needsUpdate=!0;for(const k of fs){const I=b*k.speed+k.phase;k.group.position.set(Math.cos(I)*k.radius,k.height+Math.sin(b*.9+k.phase)*.4,Math.sin(I)*k.radius),k.group.rotation.set(0,-I-Math.PI/2+Math.PI,Math.sin(b*.6+k.phase)*.15-.18);const N=Math.sin(b*7+k.phase*3)*.55;k.left.rotation.x=-N,k.right.rotation.x=N}},B=w=>{const b=r.objects().filter(X=>X.parent&&X.visible),k=w.intersectObjects(b,!0)[0];if(!k)return null;let I=k.object;for(;I&&!b.includes(I);)I=I.parent;if(!I)return null;const N=w.intersectObject(Wt,!1)[0];return N&&N.distance+.05<k.distance?null:{object:I,point:k.point.clone()}},H=w=>{let b=null,k=1/0;for(const I of me){const N=I.hit(w);N&&N.distance<k&&(k=N.distance,b={kind:"jelly",jelly:I,point:N.point.clone()})}for(const[I,N]of[["blades",Zt],["chest",et],["bottle",Kt]]){const X=w.intersectObject(N,!0)[0];X&&X.distance<k&&(k=X.distance,b={kind:I,point:X.point.clone()})}if(b){const I=w.intersectObject(Wt,!1)[0];if(I&&I.distance+.05<k)return null}return b};return{group:e,top:o,column:Ve,sea:bs,seaUniforms:Ms,jellies:me,walkers:Ne,hero:Fs,blades:Mt,ball:Z,boat:jt,pier:mt,halos:Vt,fireflies:V,animate:F,ripple:Rs,seaSparkles:Ot.sparkles,seaSparkleUniforms:Ot.sparkleUniforms,chest:{base:et,lid:Ut,open:!1,angle:0,velocity:0},trees:A,bottle:Kt,onSlimeSplash:w=>{re.handler=w},ground:n,sculpt:a,pond:h,wobble:r,ripples:St,rippleTrail:Ds,rippleLocal:We,refreshWater:Es,hitProp:B,gulls:fs.map(w=>w.group),kit:{env:l,outlines:t.outlines,detail:t.detail,terrain:Wt,terrainVertices:g,solid:Lt,still:fe,shadowMaterial:tt,treeMaterials:E,models:c,placeModel:d,walkArea:ys,protect:[...j,...ct,...st,...pt.map(([w,b])=>[w,b,.75])],grass:Tt,addShadow:(w,b,k,I)=>yo(o,tt,w,b,k,I)},bladeHub:T,pierEnd:Jt,materials:{solid:Lt},hitInteractive:H,hitLand:w=>{const b=w.intersectObject(Wt,!1)[0];return b&&b.point.y>-.05?b.point.clone():null},dispose:()=>{e.traverse(w=>{const b=w;b.geometry&&b.geometry.dispose();const k=b.material;Array.isArray(k)?k.forEach(I=>I.dispose?.()):k?.dispose?.()}),ge.dispose(),K.dispose(),h?.dispose(),r.dispose();for(const w of Object.values(c))w.map.dispose(),w.normalMap?.dispose();Ot.dispose(),E.dispose()}}}function jn(l,t,s,e=1){const o=new Et,i=Re(so+23);for(let f=0;f<6;f++){const m=.15+i()*.13,g=new Fe(.06,m,1,3),M=g.getAttribute("position");for(let S=0;S<M.count;S++){const T=M.getY(S)+m/2,C=T/m;M.setXYZ(S,M.getX(S)*(1-C*.92),T,.08*C*C)}const x=f/6*Math.PI*2+i()*.6,y=.18+i()*.22;o.add(g,S=>It("#46963d","#a8e679",Ie(S.y/.26)),G({x:Math.cos(x)*.06,z:Math.sin(x)*.06,ry:x,rx:y}),S=>Ie(S.y/.26))}const a=o.build(!0),n=a.getAttribute("normal");for(let f=0;f<n.count;f++)n.setXYZ(f,0,1,0);const r=new Si({vertexColors:!0,gradientMap:qe(l).gradientMap,side:Xt});r.onBeforeCompile=f=>{f.uniforms.uTime=l.uTime,f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aExtra;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec2 grassAt = vec2(0.0);
        #ifdef USE_INSTANCING
          grassAt = instanceMatrix[3].xz;
        #endif
        float grassPhase = grassAt.x * 0.8 + grassAt.y * 0.55;
        float gust = 0.55 + 0.45 * sin(uTime * 0.7 + grassAt.x * 0.25);
        transformed.x += sin(uTime * 1.9 + grassPhase) * 0.07 * aExtra * gust;
        transformed.z += cos(uTime * 1.5 + grassPhase * 1.2) * 0.05 * aExtra * gust;`)},r.customProgramCacheKey=()=>"l3d-grass";const h=Math.round((t==="high"?1300:600)*e),c=new ls(a,r,h),u=new As,d=new W;let p=0;for(let f=0;f<h*5&&p<h;f++){const m=i()*Math.PI*2,{edge:g,foot:M,ramp:x}=ho(m),y=_e(g-.03,M-.03,x),S=Math.sqrt(i())*y*qt(m),T=Math.cos(m)*S,C=Math.sin(m)*S;s.some(([P,_,E])=>(T-P)**2+(C-_)**2<E*E)||(u.position.set(T,Nt(T,C)-.02,C),u.rotation.set(0,i()*Math.PI*2,0),u.scale.setScalar(.7+i()*.6),u.updateMatrix(),c.setMatrixAt(p,u.matrix),c.setColorAt(p,d.setRGB(.88+i()*.2,.92+i()*.14,.88+i()*.16)),p++)}return c.count=p,c.receiveShadow=!0,c}function yo(l,t,s,e,o,i){const a=new Fe(o*2,o*2);a.rotateX(-Math.PI/2);const n=new q(a,t.clone());return n.material.opacity=i,n.position.set(s,Nt(s,e)+.035,e),n.renderOrder=1,l.add(n),n}function qn(l){const t=new Et;l.forEach(i=>t.add(i,"#000000"));const s=t.build(),e=s.getAttribute("position").count,o=new Float32Array(e*2);for(let i=0;i<e;i+=4)o.set([0,1,1,1,0,0,1,0],i*2);return s.setAttribute("uv",new $(o,2)),s}const Hn=3,Xn=new v(0,1,0),Yn=l=>1+(1.9+1)*(l-1)**3+1.9*(l-1)**2,$n=l=>l*l*(3-2*l);function Zn(l,t,s){const e=l.clone();if(e.clippingPlanes=[t],e.clipShadows=!0,s&&!l.transparent){e.side=Xt;const o=l.customProgramCacheKey();e.onBeforeCompile=(i,a)=>{l.onBeforeCompile.call(l,i,a),i.uniforms.uCutInner={value:s},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uCutInner;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
if (!gl_FrontFacing) gl_FragColor = vec4(uCutInner * (0.86 + 0.14 * sin(gl_FragCoord.x * 0.05) * sin(gl_FragCoord.y * 0.05)), 1.0);`)},e.customProgramCacheKey=()=>`${o}|cut`}return e}const xo=(l,t)=>l.traverse(s=>{t?s.layers.enable(0):s.layers.disable(0)});class Kn{cuts=[];isCut(t){return this.cuts.some(s=>s.root===t)}get count(){return this.cuts.length}cut(t,s,e){if(this.isCut(t)||!t.parent)return!1;for(;this.cuts.length>=Hn;)this.finish(this.cuts[0],!0);t.updateWorldMatrix(!0,!0);const o=new Ci().setFromObject(t);if(o.isEmpty())return!1;const i=o.getSize(new v).length();let a=0,n=0;for(let g=0;g<8;g++){const M=new v(g&1?o.max.x:o.min.x,g&2?o.max.y:o.min.y,g&4?o.max.z:o.min.z);s.distanceToPoint(M)<0?a++:n++}if(!a||!n)return!1;const r=new Ee().copy(t.matrixWorld).invert(),h=s.clone().applyMatrix4(r),u=(e.kind==="fall"?new v((o.min.x+o.max.x)/2,o.min.y,(o.min.z+o.max.z)/2):o.getCenter(new v)).clone().applyMatrix4(r),d=new Ee().copy(t.parent.matrixWorld).invert(),p=e.inner?new W(e.inner).convertLinearToSRGB():null,f=[],m=[1,-1].map(g=>{const M=new Ks,x=t.clone(!0);x.name=`${t.name}-half`,x.traverse(T=>{const C=T;if(!C.isMesh)return;const P=_=>{const E=Zn(_,M,p);return f.push(E),E};if(Array.isArray(C.material)?C.material.some(_=>_ instanceof it):C.material instanceof it){C.visible=!1;return}C.material=Array.isArray(C.material)?C.material.map(P):P(C.material)}),xo(x,!0),t.parent.add(x);const y=s.normal.clone().multiplyScalar(g).transformDirection(d);y.y*=.25,y.lengthSq()<1e-6&&y.set(1,0,0),y.normalize();const S=new v().crossVectors(Xn,y);return S.lengthSq()<1e-6&&S.set(1,0,0),S.normalize(),{object:x,plane:M,localPlane:g>0?h.clone():h.clone().negate(),dir:y,axis:S,side:g}});return xo(t,!1),this.cuts.push({root:t,style:e,halves:m,t:0,pivot:u,baseScale:t.scale.clone(),size:i,materials:f,phase:"apart"}),this.update(0),!0}update(t){for(let s=this.cuts.length-1;s>=0;s--){const e=this.cuts[s];if(e.t+=t,e.phase==="grow"){const o=Math.min(1,e.t/1.6),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.root.scale.copy(e.baseScale).multiplyScalar(Math.max(.001,i)),o>=1&&this.cuts.splice(s,1);continue}this.place(e)&&this.finish(e)}}place(t){const{root:s,style:e,t:o}=t,i=e.kind==="fall";let a,n=1;if(o<.75)a=Yn(o/.75);else if(i){if(a=1,o>3.2&&(n=Math.max(.001,1-(o-3.2)/.4)),o>3.6)return!0}else if(a=o<2.9?1:1-$n(Math.min(1,(o-2.9)/.7)),o>3.6)return!0;s.updateMatrix();const r=t.pivot.clone().applyMatrix4(s.matrix),h=i?0:Math.sin(o*2.4)*.03*t.size*Math.min(1,a);for(const c of t.halves){const u=c.object,d=new be().setFromAxisAngle(c.axis,e.tilt*a);u.quaternion.copy(d).multiply(s.quaternion),u.position.copy(s.position).sub(r).applyQuaternion(d).add(r).addScaledVector(c.dir,e.push*t.size*a).add(new v(0,-(e.sink||0)*t.size*a+h*c.side,0)),u.scale.copy(s.scale).multiplyScalar(n),u.visible=s.visible,u.updateMatrixWorld(!0),c.plane.copy(c.localPlane).applyMatrix4(u.matrixWorld)}return!1}finish(t,s=!1){for(const o of t.halves)o.object.removeFromParent();for(const o of t.materials)o.dispose();if(t.materials.length=0,xo(t.root,!0),!s&&t.style.kind==="fall"&&t.phase==="apart"&&t.t>3.2){t.phase="grow",t.t=0,t.root.scale.setScalar(.001);return}t.root.scale.copy(t.baseScale);const e=this.cuts.indexOf(t);e>=0&&this.cuts.splice(e,1)}dispose(){for(const t of[...this.cuts])this.finish(t,!0);this.cuts.length=0}}const ri=18,bo=2.6,Qn=.98,Ss=40,li=.16,Jn=[[/cottage/,{kind:"fall",inner:"#f3dfbf",tilt:.85,push:.08}],[/windmill/,{kind:"fall",inner:"#efe0c4",tilt:.8,push:.08}],[/palm/,{kind:"fall",inner:"#e7c98f",tilt:1.05,push:.06}],[/rocks/,{kind:"fall",inner:"#9aa3a8",tilt:.6,push:.1}]],tr=[[/cottage/,"#e8604c"],[/windmill/,"#f1e2c4"],[/sails|blades/,"#e9b56b"],[/palm/,"#7cc35b"],[/rocks/,"#b9b4a8"],[/whale/,"#8fb7ff"],[/serpent/,"#5ec6c0"],[/turtle/,"#ee9a83"],[/bottle/,"#bff3ec"]];class er{armed=!1;viewHeight=720;island;top;scene;camera;floating;hand;rising=-1;splits=[];leaves=[];drops=[];chops=new Map;wobbles=new Map;propCuts=new Kn;moods=new Map;propTargets=()=>[];dropGeometry=new J(1,12,9);leafGeometry=new Ti(1,0);materials=[];onArm;stroke=null;strokes=0;handGoal=null;handNdc=new xt(.4,-.3);handShown=0;handRoll=-.62;handDip=0;handMotion=new xt;trail;trailPositions;trailColors;trailPoints=[];clock=0;constructor(t,s,e,o){this.island=t,this.top=t.top,this.scene=s,this.camera=e,this.onArm=o,this.floating=ci(this.materials),this.floating.visible=!1,this.top.add(this.floating),this.hand=ci(this.materials,!0),this.hand.visible=!1,this.scene.add(this.hand);const i=new kt;this.trailPositions=new Float32Array(Ss*2*3),this.trailColors=new Float32Array(Ss*2*3),i.setAttribute("position",new $(this.trailPositions,3).setUsage(Ae)),i.setAttribute("color",new $(this.trailColors,3).setUsage(Ae));const a=[];for(let r=0;r<Ss-1;r++){const h=r*2;a.push(h,h+1,h+2,h+1,h+3,h+2)}i.setIndex(a);const n=new Zs({vertexColors:!0,transparent:!0,blending:oe,depthTest:!1,depthWrite:!1,fog:!1});this.materials.push(n),this.trail=new q(i,n),this.trail.frustumCulled=!1,this.trail.renderOrder=30,this.trail.visible=!1,this.scene.add(this.trail)}rise(){this.armed||(this.rising=0,this.floating.visible=!0)}putBack(){this.rising=-1,this.floating.visible=!1,this.stroke=null,this.armed&&(this.armed=!1,this.onArm(!1))}setHand(t,s=!1,e=!1){if(!t){this.handGoal=null;return}this.handGoal?(this.handGoal.ndc.copy(t),this.handGoal.down=s,this.handGoal.rest=e):this.handGoal={ndc:t.clone(),down:s,rest:e}}strokeBegin(t){this.stroke={id:++this.strokes,entered:new Map,chopped:new Set,props:new Map,lastDir:null,start:t.clone(),travelled:0},this.trailPoints.length=0,this.handNdc.copy(t)}strokeSample(t,s){const e=this.stroke;if(!e)return;const o=t.ray.direction.clone();this.trailPoints.push({ndc:s.clone(),t:this.clock}),this.trailPoints.length>Ss&&this.trailPoints.shift(),e.travelled=Math.max(e.travelled,s.distanceTo(e.start));for(const n of this.cuttable(e.id)){const r=!!n.hit(t),h=e.entered.get(n);r&&!h?(e.entered.set(n,e.lastDir||o),n.cuts.length||this.setMood(n,1,1.4)):!r&&h&&(e.entered.delete(n),this.cutBody(n,h,o,t.ray.origin))}const i=this.hitTree(t);i&&!e.chopped.has(i.tree)&&(e.chopped.add(i.tree),this.chop(i.tree,i.point,t.ray.origin));const a=i?null:this.propHit(t);for(const[n,r]of e.props)n!==a?.root&&(e.props.delete(n),this.cutProp(n,r,o,t.ray.origin));a&&!e.props.has(a.root)&&(e.props.set(a.root,e.lastDir||o),this.touchProp(a.root,a.point)),e.lastDir=o}strokeEnd(t,s){const e=this.stroke;if(this.stroke=null,!e)return;const o=new v().setFromMatrixColumn(this.camera.matrixWorld,1);if(s){const i=this.cuttable(e.id).find(r=>r.hit(t));if(i){const r=t.ray.direction;this.cutBody(i,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin);return}const a=this.hitTree(t);if(a){this.chop(a.tree,a.point,t.ray.origin);return}const n=this.propHit(t);if(n){const r=t.ray.direction;this.cutProp(n.root,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin)}return}if(!(e.travelled<.05||!e.lastDir)){for(const[i,a]of e.entered)a.angleTo(e.lastDir)>.01&&this.cutBody(i,a,e.lastDir,t.ray.origin);for(const[i,a]of e.props)a.angleTo(e.lastDir)>.01&&this.cutProp(i,a,e.lastDir,t.ray.origin)}}cuttable(t){const s=[];for(const e of this.island.walkers)e.frozen||s.push(e.jelly);for(const e of this.splits)for(const o of e.pieces)o.stroke!==t&&o.body.cuts.length<4&&s.push(o.body);return s}cutBody(t,s,e,o){const i=new v().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new v().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize(),t.front.updateWorldMatrix(!0,!1);const a=new Ks().setFromNormalAndCoplanarPoint(i,o).applyMatrix4(new Ee().copy(t.front.matrixWorld).invert()),n=new Xe(a.normal.x,a.normal.y,a.normal.z,-a.constant),r=t.split(n);if(!r)return;const h=this.island.walkers.find(x=>x.jelly===t);let c,u=null;if(h){const x=t.group,y=x.position.clone().add(new v(0,t.front.position.y*x.scale.x,0));c={walker:h,pieces:[],t:0,origin:y,quat:x.quaternion.clone(),scale:x.scale.x},this.splits.push(c),h.frozen=!0,x.visible=!1}else c=this.splits.find(x=>x.pieces.some(y=>y.body===t)),u=c.pieces.find(x=>x.body===t),c.pieces.splice(c.pieces.indexOf(u),1),this.top.remove(u.pivot),u.body.dispose();c.t=0;const d=c.scale,p=u?u.pivot.quaternion:c.quat,f=u?u.pivot.position.clone().sub(u.center.clone().multiplyScalar(d).applyQuaternion(p)):c.origin,m=new v(n.x,n.y,n.z).applyQuaternion(p);m.y*=.3,m.lengthSq()<1e-6&&m.set(1,0,0),m.normalize();const g=t.uniforms.uColor.value;r.forEach((x,y)=>{const S=y===0?-1:1,T=x.centroid(),C=new rt;C.position.copy(f).add(T.clone().multiplyScalar(d).applyQuaternion(p)),C.quaternion.copy(p),x.group.scale.setScalar(d),x.group.position.copy(T).multiplyScalar(-d),C.add(x.group),this.top.add(C),C.updateMatrixWorld(!0);const P=m.clone().multiplyScalar(S),_=(1.5+Math.random()*.6)*d,E=P.clone().multiplyScalar(_).add(new v(0,1.3+Math.random()*.5,0));u&&E.add(u.vel);const A=new v(0,1,0).cross(P).multiplyScalar(2.2+Math.random()*1.2);x.poke(),x.uniforms.uMood.value=2,c.pieces.push({body:x,pivot:C,center:T,vel:E,spin:A,samples:x.samplePoints(),stroke:this.stroke?.id??-1})});const M=f.clone().add(new v(0,t.height*d*.5,0));for(let x=0;x<7;x++){const y=new Ht({color:g.clone().offsetHSL(0,0,Math.random()*.12),roughness:.1,transparent:!0,opacity:.85,emissive:g,emissiveIntensity:.18});this.materials.push(y);const S=new q(this.dropGeometry,y),T=(.035+Math.random()*.04)*d*1.4;S.scale.setScalar(T),S.position.copy(M),this.top.add(S);const C=Math.random()*Math.PI*2;this.drops.push({mesh:S,vel:new v(Math.cos(C)*1.2,2.2+Math.random()*1.8,Math.sin(C)*1.2),t:0,size:T})}}hitTree(t){let s=null;for(const e of this.island.trees){const o=this.chops.get(e);if(o&&o.phase!=="stand")continue;const i=t.intersectObject(e.root,!0)[0];i&&(!s||i.distance<s.distance)&&(s={tree:e,point:this.top.worldToLocal(i.point.clone()),distance:i.distance})}return s}chop(t,s,e){let o=this.chops.get(t);if(o||(o={tree:t,hits:0,shake:0,shakeVel:0,axis:new v(1,0,0),fall:0,fallVel:0,phase:"stand",t:0,base:t.root.quaternion.clone()},this.chops.set(t,o)),o.phase!=="stand")return;o.hits+=1;const i=this.top.worldToLocal(e.clone()),a=new v(t.x-i.x,0,t.z-i.z).normalize();o.axis.set(a.z,0,-a.x),o.shakeVel+=3.2,this.burstLeaves(t,10+o.hits*4),o.hits>=3&&(o.phase="fall",o.fall=0,o.fallVel=.4,o.t=0)}burstLeaves(t,s){const e=Ga[t.kind];for(let o=0;o<s;o++){const i=new Ht({color:e.clone().offsetHSL(0,0,(Math.random()-.5)*.15),roughness:.8});this.materials.push(i);const a=new q(this.leafGeometry,i);a.scale.set(.09,.03,.06);const n=Math.random()*Math.PI*2;a.position.set(t.x+Math.cos(n)*.6,Nt(t.x,t.z)+t.height*(.55+Math.random()*.35),t.z+Math.sin(n)*.6),this.top.add(a),this.leaves.push({mesh:a,vel:new v(Math.cos(n)*(.6+Math.random()),1+Math.random()*1.6,Math.sin(n)*(.6+Math.random())),t:0,life:1.6+Math.random()*.8,spin:Math.random()*8-4})}}update(t,s){if(this.clock+=t,this.rising>=0){this.rising+=t;const e=this.island.chest.base,i=1-(1-Math.min(1,this.rising/.9))**3;this.floating.position.set(e.position.x,e.position.y+.25+i*1.1+Math.sin(s*3)*.03,e.position.z+.05),this.floating.rotation.set(Math.PI,s*3.2,.18),this.floating.scale.setScalar(.4+i*.6),this.rising>1.35&&(this.rising=-1,this.floating.visible=!1,this.armed=!0,this.handShown=0,this.onArm(!0))}this.updateHand(t,s);for(let e=this.splits.length-1;e>=0;e--)this.updateSplit(this.splits[e],t,s)&&this.splits.splice(e,1);for(let e=this.drops.length-1;e>=0;e--){const o=this.drops[e];o.t+=t,o.vel.y-=ri*t,o.mesh.position.addScaledVector(o.vel,t);const i=Math.max(Nt(o.mesh.position.x,o.mesh.position.z),0)+o.size*.4;if(o.mesh.position.y<i&&(o.mesh.position.y=i,o.vel.set(0,0,0),o.mesh.scale.set(o.size*1.5,o.size*.4,o.size*1.5)),o.t>1.1){const a=Math.max(.001,1-(o.t-1.1)/.4);o.mesh.scale.set(o.size*1.5*a,o.size*.4*a,o.size*1.5*a),o.t>1.5&&(this.top.remove(o.mesh),o.mesh.material.dispose(),this.drops.splice(e,1))}}for(let e=this.leaves.length-1;e>=0;e--){const o=this.leaves[e];o.t+=t,o.vel.y-=3.2*t,o.vel.x+=Math.sin(s*2+e)*t*.8,o.mesh.position.addScaledVector(o.vel,t),o.mesh.rotation.x+=o.spin*t,o.mesh.rotation.y+=o.spin*.7*t;const i=Nt(o.mesh.position.x,o.mesh.position.z)+.03;if(o.mesh.position.y<i&&(o.mesh.position.y=i,o.vel.set(0,0,0),o.spin=0),o.t>o.life){const a=1-(o.t-o.life)/.5,n=Math.max(.001,a);o.mesh.scale.set(.09*n,.03*n,.06*n),a<=0&&(this.top.remove(o.mesh),o.mesh.material.dispose(),this.leaves.splice(e,1))}}for(const e of this.chops.values())this.updateChop(e,t);this.propCuts.update(t);for(const[e,o]of this.moods){if(o-t>0){this.moods.set(e,o-t);continue}this.moods.delete(e),e.uniforms.uMood.value=0}for(const e of this.wobbles.values()){e.v+=(-e.s*150-e.v*8)*t,e.s+=e.v*t;const{object:o,base:i,s:a}=e;o.scale.set(i.x*(1-a*.5),i.y*(1+a),i.z*(1-a*.5)),Math.abs(a)<.002&&Math.abs(e.v)<.02&&(o.scale.copy(i),this.wobbles.delete(o))}}setMood(t,s,e){t.face&&(t.uniforms.uMood.value=s,this.moods.set(t,e))}propHit(t){const s=this.propTargets().filter(a=>!this.propCuts.isCut(a));if(!s.length)return null;const e=a=>{for(let n=a;n;n=n.parent)if(!n.visible)return!1;return!0},o=t.intersectObjects(s,!0).find(a=>a.object.isMesh&&e(a.object));if(!o)return null;const i=new Set(s);for(let a=o.object;a;a=a.parent)if(i.has(a))return{root:a,point:o.point.clone()};return null}touchProp(t,s){this.wobble(t,.3),this.chips(this.top.worldToLocal(s.clone()),this.chipColor(t),6)}chipColor(t){const s=t===this.island.blades?"blades":t===this.island.boat?"boat":t.name;return tr.find(([e])=>e.test(s))?.[1]||"#f1e2c4"}cutProp(t,s,e,o){const i=new v().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new v().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize();const a=this.wobbles.get(t);a&&(t.scale.copy(a.base),this.wobbles.delete(t));const n=this.island,r=t===n.blades?{kind:"drift",inner:"#efd9a8",tilt:.5,push:.12,sink:.2}:t===n.boat?{kind:"drift",inner:"#f4e3c4",tilt:.45,push:.14,sink:.12}:t===n.ball?{kind:"drift",inner:"#fff6e0",tilt:.7,push:.16}:t===n.bottle?{kind:"drift",inner:null,tilt:.6,push:.16}:t===n.pier?{kind:"drift",inner:"#d9b17f",tilt:.28,push:.035,sink:.05}:t.name.startsWith("creature-")?{kind:"drift",inner:"#ffb3c1",tilt:.35,push:.12}:Jn.find(([c])=>c.test(t.name))?.[1]||{kind:"fall",inner:"#f3dfbf",tilt:.8,push:.08};if(!this.propCuts.cut(t,new Ks().setFromNormalAndCoplanarPoint(i,o),r))return;const h=new Ci().setFromObject(t).getCenter(new v);this.chips(this.top.worldToLocal(h),this.chipColor(t),12)}wobble(t,s){let e=this.wobbles.get(t);e||(e={object:t,base:t.scale.clone(),s:0,v:0},this.wobbles.set(t,e)),e.v-=s*8}chips(t,s,e){const o=new W(s);for(let i=0;i<e;i++){const a=new Ht({color:o.clone().offsetHSL(0,0,(Math.random()-.5)*.18),roughness:.7});this.materials.push(a);const n=new q(this.leafGeometry,a),r=.035+Math.random()*.04;n.scale.setScalar(r),n.position.copy(t),n.rotation.set(Math.random()*6,Math.random()*6,0),this.top.add(n);const h=Math.random()*Math.PI*2;this.drops.push({mesh:n,vel:new v(Math.cos(h)*(.8+Math.random()),1.8+Math.random()*1.8,Math.sin(h)*(.8+Math.random())),t:0,size:r})}}updateSplit(t,s,e){t.t+=s;const o=t.t>2.8;if(o)for(const r of t.pieces)r.body.uniforms.uMood.value=1;const i=t.scale,a=new v;for(const r of t.pieces){const h=r.pivot;if(r.body.update(s,e),o){const d=t.origin.clone().add(r.center.clone().multiplyScalar(i).applyQuaternion(t.quat)),p=1-Math.exp(-s*7);h.position.lerp(d,p),h.quaternion.slerp(t.quat,p);continue}r.vel.y-=ri*s,h.position.addScaledVector(r.vel,s);const c=r.spin.length()*s;c>1e-5&&h.quaternion.premultiply(new be().setFromAxisAngle(a.copy(r.spin).normalize(),c));let u=1/0;for(const d of r.samples)a.copy(d).sub(r.center).multiplyScalar(i).applyQuaternion(h.quaternion).add(h.position),u=Math.min(u,a.y-Math.max(Nt(a.x,a.z),0));if(u<0){h.position.y-=u,r.vel.y<-1.2?(r.body.land(-r.vel.y*1.4),r.vel.y*=-.28):r.vel.y=Math.max(0,r.vel.y);const d=Math.exp(-s*7);r.vel.x*=d,r.vel.z*=d,r.spin.multiplyScalar(Math.exp(-s*9))}else r.spin.multiplyScalar(Math.exp(-s*1.5))}if(t.t<3.5)return!1;for(const r of t.pieces)this.top.remove(r.pivot),r.body.dispose();const n=t.walker;return n.jelly.group.visible=!0,n.frozen=!1,n.jelly.land(6),this.setMood(n.jelly,1,1.6),!0}updateHand(t,s){const e=this.handGoal,o=this.armed&&e?1:0;if(this.handShown+=(o-this.handShown)*(1-Math.exp(-t*12)),this.handShown<.02&&!o){this.hand.visible=!1,this.trail.visible=!1,this.trailPoints.length=0;return}if(e){const p=this.handNdc.clone();e.rest?this.handNdc.lerp(e.ndc,1-Math.exp(-t*6)):this.handNdc.copy(e.ndc);const f=this.camera.aspect,m=new xt((this.handNdc.x-p.x)*f,this.handNdc.y-p.y).divideScalar(Math.max(t,1/240));this.handMotion.lerp(m,1-Math.exp(-t*14))}const i=this.handNdc.clone();e?.rest&&(i.y+=Math.sin(s*1.8)*.012);const a=this.handMotion.length();let n=-.62;a>.6&&(n=Math.atan2(this.handMotion.y,this.handMotion.x),Math.cos(n)<-.25&&(n+=Math.PI));let r=n-this.handRoll;r=Math.atan2(Math.sin(r),Math.cos(r)),this.handRoll+=r*(1-Math.exp(-t*(a>.6?16:6))),this.handDip+=((e?.down?1:0)-this.handDip)*(1-Math.exp(-t*14));const h=this.rayAt(i),c=this.camera,u=2*bo*Math.tan(c.fov*Math.PI/360)/Math.max(1,this.viewHeight),d=Math.min(170,Math.max(88,Math.min(this.viewHeight*.2,this.viewHeight*c.aspect*.32)));this.hand.visible=!0,this.hand.position.copy(h.origin).addScaledVector(h.direction,bo),this.hand.quaternion.copy(c.quaternion),this.hand.rotateZ(this.handRoll),this.hand.rotateX(.55-this.handDip*.35),this.hand.scale.setScalar(d*u/Qn*(.9+this.handShown*.1)*Math.max(.001,this.handShown)),this.updateTrail(u)}rayAt(t){const s=new v().setFromMatrixPosition(this.camera.matrixWorld),e=new v(t.x,t.y,.5).unproject(this.camera).sub(s).normalize();return{origin:s,direction:e}}updateTrail(t){for(;this.trailPoints.length&&this.clock-this.trailPoints[0].t>li;)this.trailPoints.shift();const s=this.trailPoints;if(s.length<2){this.trail.visible=!1;return}this.trail.visible=!0;const e=new v().setFromMatrixColumn(this.camera.matrixWorld,0),o=new v().setFromMatrixColumn(this.camera.matrixWorld,1),i=s.map(h=>{const c=this.rayAt(h.ndc);return c.origin.addScaledVector(c.direction,bo+.05)}),a=new W("#fff4fb"),n=this.camera.aspect;for(let h=0;h<Ss;h++){const c=Math.min(h,i.length-1),u=i[c],d=s[Math.max(0,c-1)].ndc,p=s[Math.min(s.length-1,c+1)].ndc,f=new xt((p.x-d.x)*n,p.y-d.y);f.lengthSq()<1e-10&&f.set(1,0),f.normalize();const m=(this.clock-s[c].t)/li,g=Math.max(0,1-m)*(c/Math.max(1,i.length-1)),M=t*9*g,x=e.clone().multiplyScalar(-f.y*M).addScaledVector(o,f.x*M),y=u.clone().add(x),S=u.clone().sub(x);this.trailPositions.set([y.x,y.y,y.z,S.x,S.y,S.z],h*6);const T=a.clone().multiplyScalar(g*.9);this.trailColors.set([T.r,T.g,T.b,T.r,T.g,T.b],h*6)}const r=this.trail.geometry;r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}updateChop(t,s){const e=t.tree.root;if(t.t+=s,t.phase==="stand")t.shakeVel+=(-t.shake*60-t.shakeVel*7)*s,t.shake+=t.shakeVel*s,e.quaternion.copy(t.base).premultiply(new be().setFromAxisAngle(t.axis,t.shake*.12));else if(t.phase==="fall")t.fallVel+=(2.4+t.fall*6)*s,t.fall+=t.fallVel*s,t.fall>=Math.PI/2-.08&&(t.fall=Math.PI/2-.08,t.fallVel*=-.25,Math.abs(t.fallVel)<.15&&(t.phase="down",t.t=0,this.burstLeaves(t.tree,18))),e.quaternion.copy(t.base).premultiply(new be().setFromAxisAngle(t.axis,t.fall));else if(t.phase==="down")t.t>2.4&&(t.phase="shrink",t.t=0);else if(t.phase==="shrink"){const o=Math.min(1,t.t/.5);e.scale.setScalar(t.tree.scale*Math.max(.001,1-o)),o>=1&&(t.phase="grow",t.t=0,e.quaternion.copy(t.base))}else if(t.phase==="grow"){const o=Math.min(1,t.t/1.8),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.scale.setScalar(t.tree.scale*Math.max(.001,i)),o>=1&&this.chops.delete(t.tree)}}get pieces(){return this.splits.reduce((t,s)=>t+s.pieces.length,0)}get propsCut(){return this.propCuts.count}dispose(){this.propCuts.dispose(),this.top.remove(this.floating),this.scene.remove(this.hand,this.trail);for(const t of this.splits)for(const s of t.pieces)this.top.remove(s.pivot),s.body.dispose();for(const t of this.materials)t.dispose();for(const t of[this.floating,this.hand])t.traverse(s=>{s.geometry?.dispose()});this.trail.geometry.dispose(),this.dropGeometry.dispose(),this.leafGeometry.dispose()}}const Mo="none";function ci(l,t=!1){const s=new rt;s.name=t?"knife-hand":"knife";const e=new Ht({color:"#eef3fb",metalness:.7,roughness:.2,emissive:"#cfdcff",emissiveIntensity:t?.32:.18,fog:!t}),o=new Ht({color:"#ffffff",metalness:.4,roughness:.1,emissive:"#ffffff",emissiveIntensity:.45,fog:!t}),i=new Ht({color:"#f2c14e",metalness:.6,roughness:.3,fog:!t}),a=new Ht({color:"#ff8fb1",roughness:.45,emissive:"#ff5f95",emissiveIntensity:.12,fog:!t}),n=new Ht({color:"#fff1d6",roughness:.35,fog:!t});l.push(e,o,i,a,n);const r=new aa;r.moveTo(-.06,.56),r.lineTo(-.06,.16),r.quadraticCurveTo(-.055,.04,.012,0),r.quadraticCurveTo(.085,.16,.08,.56),r.closePath();const h=new na(r,{depth:.016,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:10});h.translate(0,0,-.008);const c=new q(new ht(.006,.006,.42,6),o);c.position.set(.05,.34,.018),c.rotation.z=.03;const u=[[new q(h,e),0],[c,0],[new q(new wt(.2,.05,.07,2,.022),i),.585],[new q(new wt(.13,.36,.075,3,.05),a),.79]];for(const[d,p]of u)d.position.y+=p,d.castShadow=!t,s.add(d);for(const d of[.71,.86]){const p=new q(new J(.018,10,8),n);p.position.set(0,d,.04),s.add(p)}return t&&s.traverse(d=>{d.renderOrder=31}),s}function Wo(l){return 9.9+Math.max(0,-3.2-l)*.115+1.1}const oo=-.55,io=-1.6,Yi=-51,sr=l=>l<.5?2*l*l:1-(-2*l+2)**2/2;function He(l,t=new v,s=new v){const e=Math.min(1,Math.max(0,l)),o=io+(Yi-io)*sr(e),i=oo+1.75*e,a=Wo(o)+8.2+2.2*e;t.set(Math.sin(i)*a,o,Math.cos(i)*a);const n=Math.cos(i),r=-Math.sin(i),h=-Math.sin(i),c=-Math.cos(i),u=9+3*e,d=3.4-1.6*e;return s.set(t.x+n*u+h*d,o-2.2-3.2*e*e,t.z+r*u+c*d),{position:t,target:s}}function Ue(l,t,s,e){const{position:o,target:i}=He(l),a=i.clone().sub(o).setY(0).normalize(),n=new v(-a.z,0,a.x);return o.clone().addScaledVector(a,t).addScaledVector(n,s).setY(o.y+e)}const ms=2048,as=2.1;class ao{mesh;count;pos;vel;scale;fear;cellOf;cellStart=new Int32Array(ms+1);fill=new Int32Array(ms);sorted;goal=new v;options;phase;m=new Ee;fwd=new v;side=new v;upv=new v;at=new v;static UP=new v(0,1,0);constructor(t,s,e){this.options=e,this.count=e.count;const o=Re(e.seed);this.phase=o()*10;const i=t.clone(),a=new Float32Array(this.count);this.mesh=new ls(i,s,this.count),this.mesh.frustumCulled=!1,this.pos=new Float32Array(this.count*3),this.vel=new Float32Array(this.count*3),this.scale=new Float32Array(this.count),this.fear=new Float32Array(this.count),this.cellOf=new Int32Array(this.count),this.sorted=new Int32Array(this.count);const n=new W,{home:r}=e;for(let h=0;h<this.count;h++){const c=o()*Math.PI*2,u=Math.cbrt(o())*3.2;this.pos.set([r.x+Math.cos(c)*u,r.y+(o()-.5)*2.2,r.z+Math.sin(c)*u],h*3),this.vel.set([1.8+o()*.4,0,(o()-.5)*.6],h*3),this.scale[h]=e.size*(.8+o()*.4),a[h]=o()*20,n.set(e.colors[Math.floor(o()*e.colors.length)]).offsetHSL((o()-.5)*.03,0,(o()-.5)*.08),this.mesh.setColorAt(h,n)}i.setAttribute("aPhase",new Ye(a,1))}hash(t,s,e){const o=Math.floor(t/as),i=Math.floor(s/as),a=Math.floor(e/as);return(o*73856093^i*19349663^a*83492791)>>>0&ms-1}bucket(){const t=this.cellStart;t.fill(0);for(let e=0;e<this.count;e++){const o=e*3,i=this.hash(this.pos[o],this.pos[o+1],this.pos[o+2]);this.cellOf[e]=i,t[i+1]++}for(let e=0;e<ms;e++)t[e+1]+=t[e];const s=this.fill;s.set(t.subarray(0,ms));for(let e=0;e<this.count;e++)this.sorted[s[this.cellOf[e]]++]=e}update(t,s,e){t=Math.min(t,1/24);const o=this.options,i=s*.14+this.phase;this.goal.set(o.home.x+Math.sin(i)*o.roam,o.home.y+Math.sin(i*1.9+1)*o.lift,o.home.z+Math.sin(i*2)*o.roam*.55),this.bucket();const a=as,n=a*a,r=.95*.95,h=Math.cbrt(this.count)*.75;for(let c=0;c<this.count;c++){const u=c*3,d=this.pos[u],p=this.pos[u+1],f=this.pos[u+2];let m=0,g=0,M=0,x=0,y=0,S=0,T=0,C=0,P=0,_=0;const E=Math.floor(d/as),A=Math.floor(p/as),O=Math.floor(f/as);for(let mt=-1;mt<=1;mt++)for(let Gt=-1;Gt<=1;Gt++)for(let Rt=-1;Rt<=1;Rt++){const Tt=((E+mt)*73856093^(A+Gt)*19349663^(O+Rt)*83492791)>>>0&ms-1;for(let Dt=this.cellStart[Tt],pe=this.cellStart[Tt+1];Dt<pe;Dt++){const Vt=this.sorted[Dt];if(Vt===c)continue;const gt=Vt*3,vt=this.pos[gt]-d,Pt=this.pos[gt+1]-p,Yt=this.pos[gt+2]-f,$t=vt*vt+Pt*Pt+Yt*Yt;if(!($t>n)){if(m+=vt,g+=Pt,M+=Yt,x+=this.vel[gt],y+=this.vel[gt+1],S+=this.vel[gt+2],_++,$t<r){const V=1/Math.max($t,.01);T-=vt*V,C-=Pt*V,P-=Yt*V}if(_>14)break}}}let L=this.vel[u],D=this.vel[u+1],R=this.vel[u+2],j=0,Q=0,st=0;_&&(j+=m/_*.3+(x/_-L)*1.1,Q+=g/_*.3+(y/_-D)*1.1,st+=M/_*.3+(S/_-R)*1.1),j+=T*.45,Q+=C*.45,st+=P*.45;const at=this.goal.x-d,ct=this.goal.y-p,lt=this.goal.z-f,ot=Math.hypot(at,ct,lt)||1,Ct=Math.min(2.6,Math.max(0,ot-h)*.35+.35);j+=at/ot*Ct,Q+=ct/ot*Ct,st+=lt/ot*Ct;let ft=this.fear[c]*Math.exp(-t*1.6);if(e&&e.strength>0){const mt=d-e.origin.x,Gt=p-e.origin.y,Rt=f-e.origin.z,Tt=mt*e.dir.x+Gt*e.dir.y+Rt*e.dir.z;if(Tt>0){const Dt=mt-e.dir.x*Tt,pe=Gt-e.dir.y*Tt,Vt=Rt-e.dir.z*Tt,gt=Math.hypot(Dt,pe,Vt),vt=2.4+Tt*.06;if(gt<vt){const Pt=(1-gt/vt)*16*e.strength/Math.max(gt,.25);j+=Dt*Pt,Q+=pe*Pt*.7,st+=Vt*Pt,ft=Math.max(ft,(1-gt/vt)*e.strength)}}}this.fear[c]=ft;const pt=o.floor(d,f)+.7;p<pt+.4&&(Q+=(pt+.4-p)*7),p>o.ceiling&&(Q-=(p-o.ceiling)*5);const ne=Math.hypot(d,f),Jt=o.column(Math.atan2(f,d),p)+1.3;if(ne<Jt){const mt=(Jt-ne)*6/Math.max(ne,.5);j+=d*mt,st+=f*mt}L+=j*t*2.4,D+=Q*t*2.4,R+=st*t*2.4,D*=Math.exp(-1.4*t);const Lt=Math.hypot(L,D,R)||1,fe=Math.min(Math.max(Lt,1.5),3.1+ft*5);L*=fe/Lt,D*=fe/Lt,R*=fe/Lt,this.vel[u]=L,this.vel[u+1]=D,this.vel[u+2]=R,this.pos[u]=d+L*t,this.pos[u+1]=Math.max(pt-.3,p+D*t),this.pos[u+2]=f+R*t,this.fwd.set(L,D*.55,R).normalize(),this.side.crossVectors(this.fwd,ao.UP).normalize(),this.upv.crossVectors(this.side,this.fwd);const Wt=this.scale[c];this.m.makeBasis(this.fwd.multiplyScalar(Wt),this.upv.multiplyScalar(Wt),this.side.multiplyScalar(Wt)),this.m.setPosition(this.at.set(this.pos[u],this.pos[u+1],this.pos[u+2])),this.mesh.setMatrixAt(c,this.m)}this.mesh.instanceMatrix.needsUpdate=!0}stats(t){t.set(0,0,0);for(let e=0;e<this.count;e++)t.add(this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]));t.multiplyScalar(1/Math.max(1,this.count));let s=0;for(let e=0;e<this.count;e++)s+=this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]).distanceTo(t);return{center:t,spread:s/Math.max(1,this.count)}}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}const or=`
uniform float uTime;
uniform float uDelta;
uniform vec4 uCenter[2];
uniform vec4 uShape[2];
uniform vec3 uScareOrigin;
uniform vec3 uScareDir;
uniform float uScare;
uniform vec4 uPredator;
${Ce}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 P = texture2D(texturePosition, uv);
  vec4 V = texture2D(textureVelocity, uv);
  int id = int(P.w + 0.5);
  vec4 C = id == 0 ? uCenter[0] : uCenter[1];
  vec4 S = id == 0 ? uShape[0] : uShape[1];
  float R = C.w, H = S.x, speed = S.z;
  vec2 h = hash22(gl_FragCoord.xy * 1.37 + 0.5);
  float h3 = hash12(gl_FragCoord.yx * 0.73 + 3.1);
  // 這條魚想待的高度與半徑：紡錘的話中間胖、上下尖；大部分擠在外圈，中間空空的（魚風暴的樣子）
  float hi = (h.y - 0.5) * H;
  float bulge = mix(sqrt(max(0.05, 1.0 - pow(2.0 * hi / H, 2.0))), 1.0, S.y);
  float ri = R * bulge * mix(0.42, 1.0, sqrt(h.x));
  // 整群慢慢一縮一放，像在呼吸
  ri *= 1.0 + 0.08 * sin(uTime * 0.5 + hi * 0.4);
  vec3 rel = P.xyz - C.xyz;
  float rlen = length(rel.xz) + 1e-4;
  vec2 rdir = rel.xz / rlen;
  vec2 tang = vec2(-rdir.y, rdir.x);
  float lane = 0.75 + 0.5 * h3;
  vec3 desired = vec3(tang.x, 0.0, tang.y) * speed * lane;
  desired.xz -= rdir * (rlen - ri) * 1.4;
  desired.y += (hi + sin(uTime * 0.37 + h.x * 6.2831853) * H * 0.07 - rel.y) * 1.1;
  // 亂流：慢慢變的雜訊，讓整群不會轉得像機器
  vec3 q = P.xyz * 0.28 + vec3(0.0, uTime * 0.11, uTime * 0.07);
  desired += (vec3(vnoise(q.xy), vnoise(q.yz + 7.1), vnoise(q.zx + 3.7)) - 0.5) * speed * 0.9;
  // 被手指／滑鼠嚇到：離那條視線越近推得越用力，嚇到的魚游得更快
  float fear = V.w * exp(-uDelta * 1.3);
  if (uScare > 0.0) {
    vec3 o = P.xyz - uScareOrigin;
    float along = dot(o, uScareDir);
    if (along > 0.0) {
      vec3 perp = o - uScareDir * along;
      float d = length(perp) + 1e-3;
      float radius = 2.6 + along * 0.08;
      if (d < radius) {
        float k = 1.0 - d / radius;
        desired += perp / d * k * 22.0 * uScare;
        fear = max(fear, k * uScare);
      }
    }
  }
  // 鯨魚繞著魚群游：靠近牠的魚往外讓開，整團被擠得變形
  if (uPredator.w > 0.0) {
    vec3 pd = P.xyz - uPredator.xyz;
    float dd = length(pd) + 1e-3;
    float reach = uPredator.w;
    if (dd < reach) {
      float k = 1.0 - dd / reach;
      desired += pd / dd * k * k * 16.0;
      fear = max(fear, k * 0.6);
    }
  }
  float agility = 2.2 + fear * 4.0;
  vec3 v = V.xyz + (desired - V.xyz) * clamp(uDelta * agility, 0.0, 1.0);
  float len = length(v) + 1e-4;
  float top = speed * (1.25 + fear * 2.6);
  v *= clamp(len, speed * 0.45, top) / len;
  gl_FragColor = vec4(v, fear);
}
`,ir=`
uniform float uDelta;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 P = texture2D(texturePosition, uv);
  vec4 V = texture2D(textureVelocity, uv);
  gl_FragColor = vec4(P.xyz + V.xyz * uDelta, P.w);
}
`,ar=`
uniform sampler2D tPosition;
uniform sampler2D tVelocity;
uniform float uTime;
uniform float uSize;
uniform vec3 uPalette[4];
uniform float uPaletteCount;
attribute vec2 aRef;
varying vec3 vNormalW;
varying vec3 vWorld;
varying vec3 vBack;
varying float vSideY;
varying float vFear;
#include <fog_pars_vertex>
float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  vec4 P = texture2D(tPosition, aRef);
  vec4 V = texture2D(tVelocity, aRef);
  float seed = hash(aRef * 4096.0);
  vec3 fwd = normalize(V.xyz + vec3(1e-5, 0.0, 0.0));
  vec3 side = cross(fwd, vec3(0.0, 1.0, 0.0));
  side = length(side) < 1e-3 ? vec3(0.0, 0.0, 1.0) : normalize(side);
  vec3 up = cross(side, fwd);
  float speed = length(V.xyz);
  float scale = uSize * (0.78 + 0.44 * seed);
  // 尾巴擺：越後面擺越大，游得快、被嚇到時擺得更兇
  vec3 p = position;
  float tail = smoothstep(0.25, -0.72, p.x);
  float freq = 9.0 + speed * 3.0 + V.w * 8.0;
  float swing = sin(uTime * freq + seed * 40.0 - p.x * 5.5) * (0.1 + 0.09 * V.w) * tail;
  p.z += swing;
  vec3 n = normal;
  n.x -= swing * 0.8 * n.z;
  vec3 world = P.xyz + (fwd * p.x + up * p.y + side * p.z) * scale;
  vWorld = world;
  vNormalW = normalize(fwd * n.x + up * n.y + side * n.z);
  vSideY = position.y / 0.13;
  vFear = V.w;
  // 第四個顏色是點綴：只有少數幾條（一群魚大多是同一種，不會花花綠綠像彩色紙屑）
  float roll = hash(aRef * 977.0 + 0.3);
  int pick = uPaletteCount > 3.5 ? (roll > 0.93 ? 3 : int(floor(roll / 0.93 * 3.0))) : int(floor(roll * uPaletteCount));
  vBack = pick == 0 ? uPalette[0] : pick == 1 ? uPalette[1] : pick == 2 ? uPalette[2] : uPalette[3];
  vec4 mvPosition = viewMatrix * vec4(world, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,nr=`
uniform vec3 uSunDir;
uniform vec3 uLight;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform vec3 uSideColor;
uniform vec3 uBellyColor;
uniform float uFlash;
uniform float uTime;
uniform float uCaustic;
uniform float uGlow;
uniform float uNight;
varying vec3 vNormalW;
varying vec3 vWorld;
varying vec3 vBack;
varying float vSideY;
varying float vFear;
#include <fog_pars_fragment>
void main() {
  vec3 N = normalize(vNormalW);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorld);
  // 背深、側銀、腹白：交界硬一點（動畫的分色）
  vec3 base = mix(uBellyColor, uSideColor, smoothstep(-0.55, -0.25, vSideY));
  base = mix(base, vBack, smoothstep(0.15, 0.4, vSideY));
  float wrap = dot(N, uSunDir) * 0.5 + 0.5;
  float band = smoothstep(0.42, 0.5, wrap);
  vec3 ambient = mix(uGroundColor, uSkyColor, N.y * 0.5 + 0.5) * 0.7;
  vec3 col = base * (ambient + uLight * (0.25 + band * 0.6));
  // 銀光：身體側面剛好把光反射到鏡頭時亮一下
  vec3 R = reflect(-V, N);
  float flash = pow(max(dot(R, normalize(uSunDir + vec3(0.0, 0.6, 0.0))), 0.0), 10.0);
  col += mix(uLight, vec3(1.0), 0.5) * flash * uFlash * (0.6 + 0.4 * smoothstep(-0.4, 0.2, vSideY));
  // 輪廓光：邊緣一圈亮
  col += base * smoothstep(0.62, 0.8, 1.0 - abs(dot(N, V))) * 0.45;
  // 淺海裡背上晃著水面的光（魚很小：用便宜的兩道交錯的波就夠，不用整張光網）
  if (uCaustic > 0.01) {
    float band = sin(dot(vWorld.xz, vec2(1.7, 1.3)) + uTime * 1.3 + sin(vWorld.x * 0.6 - uTime * 0.7) * 1.8) * sin(dot(vWorld.xz, vec2(-1.1, 1.9)) - uTime * 1.1);
    col += uLight * pow(max(band, 0.0), 3.0) * uCaustic * 1.2 * smoothstep(0.0, 0.8, N.y);
  }
  col += vBack * uGlow * 0.25;
  // 夜裡的海：魚暗一點，只剩月光在身上閃
  col *= mix(1.0, 0.62, uNight);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function rr(){const l=[-.5,-.36,-.16,.06,.24,.38,.47],t=[.03,.075,.115,.13,.115,.085,.045],s=[.018,.036,.05,.056,.05,.038,.022],e=6,o=[],i=[];l.forEach((d,p)=>{for(let f=0;f<e;f++){const m=f/e*Math.PI*2+Math.PI/2;o.push(d,Math.sin(m)*t[p],Math.cos(m)*s[p])}});for(let d=0;d<l.length-1;d++)for(let p=0;p<e;p++){const f=d*e+p,m=d*e+(p+1)%e,g=(d+1)*e+p,M=(d+1)*e+(p+1)%e;i.push(f,g,m,m,g,M)}const a=o.length/3;o.push(.53,0,0);const n=(l.length-1)*e;for(let d=0;d<e;d++)i.push(n+d,a,n+(d+1)%e);const r=o.length/3;o.push(-.52,0,0);for(let d=0;d<e;d++)i.push(d,(d+1)%e,r);const h=o.length/3;o.push(-.48,0,0,-.74,.15,0,-.66,0,0,-.74,-.15,0),i.push(h,h+1,h+2,h,h+2,h+3,h,h+2,h+1,h,h+3,h+2);const c=o.length/3;o.push(.02,.12,0,-.14,.2,0,-.18,.1,0),i.push(c,c+1,c+2,c,c+2,c+1);const u=new kt;return u.setAttribute("position",new $(new Float32Array(o),3)),u.setIndex(i),u.computeVertexNormals(),u}class lr{constructor(t,s,e,o,i){this.renderer=t,this.clusters=i.slice(0,2);const a=this.clusters.map(f=>Math.max(1,Math.round(f.count/o))),n=a.reduce((f,m)=>f+m,0);this.gpu=new ra(o,n,t),this.gpu.setDataType(la);const r=this.gpu.createTexture(),h=this.gpu.createTexture();for(this.fill(r,h,o,a),this.velocity=this.gpu.addVariable("textureVelocity",or,h),this.position=this.gpu.addVariable("texturePosition",ir,r),this.gpu.setVariableDependencies(this.velocity,[this.velocity,this.position]),this.gpu.setVariableDependencies(this.position,[this.velocity,this.position]),this.centers=this.clusters.map(f=>new Xe(f.center.x,f.center.y,f.center.z,f.radius)),this.homes=this.clusters.map(f=>f.center.clone());this.centers.length<2;)this.centers.push(new Xe(0,-999,0,1));const c=this.clusters.map(f=>new Xe(f.height,f.shape,f.speed,0));for(;c.length<2;)c.push(new Xe(1,0,1,0));Object.assign(this.velocity.material.uniforms,{uTime:{value:0},uDelta:{value:0},uCenter:{value:this.centers},uShape:{value:c},uScareOrigin:{value:new v},uScareDir:{value:new v(0,0,-1)},uScare:{value:0},uPredator:{value:new Xe(0,0,0,0)}}),Object.assign(this.position.material.uniforms,{uDelta:{value:0}});const u=this.gpu.init();if(u)throw new Error(u);const d=rr();this.geometries.push(d);let p=0;this.clusters.forEach((f,m)=>{const g=a[m],M=g*o,x=new Float32Array(M*2);for(let _=0;_<M;_++)x[_*2]=(_%o+.5)/o,x[_*2+1]=(p+Math.floor(_/o)+.5)/n;p+=g;const y=new zi;y.index=d.index,y.setAttribute("position",d.getAttribute("position")),y.setAttribute("normal",d.getAttribute("normal")),y.setAttribute("aRef",new Ye(x,2)),y.instanceCount=M,this.geometries.push(y);const S=(f.palette&&f.palette.length?f.palette:[f.back]).slice(0,4),T=[0,1,2,3].map(_=>new W(S[_%S.length])),C=new it({uniforms:{...we.clone(ye.fog),tPosition:{value:null},tVelocity:{value:null},uTime:s.uTime,uSize:{value:f.size},uPalette:{value:T},uPaletteCount:{value:S.length},uSunDir:s.uSunDir,uLight:e,uSkyColor:s.uSkyColor,uGroundColor:s.uGroundColor,uSideColor:{value:new W(f.side)},uBellyColor:{value:new W(f.belly)},uFlash:{value:f.flash},uCaustic:{value:0},uGlow:s.uGlow,uNight:s.uNight},vertexShader:ar,fragmentShader:nr,fog:!0});this.materials.push(C);const P=new q(y,C);P.frustumCulled=!1,P.visible=!1,this.meshes.push(P)})}renderer;meshes=[];gpu;velocity;position;clusters;centers;homes;materials=[];fear=[0,0];geometries=[];active=[!1,!1];fill(t,s,e,o){const i=t.image.data,a=s.image.data;let n=1337;const r=()=>(n=n*16807%2147483647,n/2147483647);let h=0;this.clusters.forEach((c,u)=>{for(let d=0;d<o[u]*e;d++){const p=(h*e+d)*4,f=r()*Math.PI*2,m=(r()-.5)*c.height,g=c.shape>.5?1:Math.sqrt(Math.max(.05,1-(2*m/c.height)**2)),M=c.radius*g*(.45+.55*Math.sqrt(r()));i[p]=c.center.x+Math.cos(f)*M,i[p+1]=c.center.y+m,i[p+2]=c.center.z+Math.sin(f)*M,i[p+3]=u,a[p]=-Math.sin(f)*c.speed,a[p+1]=0,a[p+2]=Math.cos(f)*c.speed,a[p+3]=0}h+=o[u]}),t.needsUpdate=!0,s.needsUpdate=!0}update(t,s,e,o,i){if(this.active=e,this.meshes.forEach((c,u)=>{c.visible=!!e[u]}),!e.some(Boolean))return;const a=Math.min(t,1/30);this.clusters.forEach((c,u)=>{const d=this.homes[u],p=c.wander;this.centers[u].set(d.x+Math.sin(s*.07+u*2)*p,d.y+Math.sin(s*.11+u)*p*.3,d.z+Math.cos(s*.05+u*3)*p,c.radius)});const n=this.velocity.material.uniforms;n.uTime.value=s,n.uDelta.value=a,o&&o.strength>0?(n.uScareOrigin.value.copy(o.origin),n.uScareDir.value.copy(o.dir),n.uScare.value=o.strength,this.fear.forEach((c,u)=>{this.fear[u]=Math.max(this.fear[u],o.strength)})):n.uScare.value=0,this.fear.forEach((c,u)=>{this.fear[u]=c*Math.exp(-t*1.3)}),this.position.material.uniforms.uDelta.value=a,this.gpu.compute();const r=this.gpu.getCurrentRenderTarget(this.position).texture,h=this.gpu.getCurrentRenderTarget(this.velocity).texture;for(const c of this.materials)c.uniforms.tPosition.value=r,c.uniforms.tVelocity.value=h,c.uniforms.uCaustic.value=i}setPredator(t,s){this.velocity.material.uniforms.uPredator.value.set(t.x,t.y,t.z,s)}thin(t){this.meshes.forEach(s=>{const e=s.geometry,o=e.getAttribute("aRef").count;e.instanceCount=Math.max(64,Math.round(o*t))})}stats(t,s){const e=this.centers[t]||this.centers[0];s.set(e.x,e.y,e.z);const o=this.clusters[t]||this.clusters[0];return{center:s,spread:o.radius*(.75+this.fear[t]*.8)}}get running(){return this.active.some(Boolean)}dispose(){this.gpu.dispose(),this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose()),this.renderer}}class $i{materials=[];geometries=[];textures=[];mat(t,s={}){const e=new Ht({color:t,roughness:.55,metalness:0,...s});return this.materials.push(e),e}geo(t){return this.geometries.push(t),t}mesh(t,s,e={}){const o=new q(t,s);return e.p&&o.position.set(...e.p),e.s!==void 0&&(typeof e.s=="number"?o.scale.setScalar(e.s):o.scale.set(...e.s)),e.r&&o.rotation.set(...e.r),o}dispose(){this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose()),this.textures.forEach(t=>t.dispose())}}function Vo(l,t,s,e,o,i={}){const a=l.geo(new J(1,20,14)),n=l.mat("#21181d",{roughness:.25}),r=l.mat("#ffffff",{emissive:"#ffffff",emissiveIntensity:i.shine??.8}),h=i.iris?l.mat(i.iris,{roughness:.25,emissive:i.iris,emissiveIntensity:.25}):null,c=new be().setFromUnitVectors(new v(0,0,1),o.clone().normalize()),u=[];for(const d of e){const p=new rt;p.position.copy(d),p.quaternion.copy(c),p.add(l.mesh(a,n,{s:[s*.85,s*1.1,s*.45]})),h&&p.add(l.mesh(a,h,{p:[0,-s*.42,s*.12],s:[s*.6,s*.4,s*.36]})),p.add(l.mesh(a,r,{p:[-s*.28,s*.38,s*.38],s:s*.3})),p.add(l.mesh(a,r,{p:[s*.25,-s*.3,s*.38],s:s*.14})),t.add(p),u.push(p)}return u}const cr=(l,t=0)=>{const s=(l+t)%4.2;return s<.14?1-Math.sin(s/.14*Math.PI)*.9:1};function hr(){const l=new $i,t=new rt;t.name="cute-turtle";const s=l.mat("#7cca5c"),e=l.mat("#f4cf6c"),o=l.mat("#ff9fb3",{transparent:!0,opacity:.75});o.userData.seeThrough=!0;const i=l.mat("#3a2a22",{roughness:.3}),a=l.geo(new J(1,28,20)),n=l.geo(new J(1,64,40)),r=[new v(0,1,0)];for(let A=0;A<6;A++)r.push(new v(Math.cos(A*Math.PI/3)*Math.cos(.85),Math.sin(.85),Math.sin(A*Math.PI/3)*Math.cos(.85)));for(let A=0;A<10;A++)r.push(new v(Math.cos(A*Math.PI/5+.3)*Math.cos(.25),Math.sin(.25),Math.sin(A*Math.PI/5+.3)*Math.cos(.25)));const h=[],c=new W("#c27843"),u=new W("#a65e30"),d=new W("#6f3c1d"),p=n.getAttribute("position"),f=new v;for(let A=0;A<p.count;A++){f.fromBufferAttribute(p,A).normalize();let O=-2,L=-2;for(const j of r){const Q=f.dot(j);Q>O?(L=O,O=Q):Q>L&&(L=Q)}const D=O-L,R=D<.035?d:u.clone().lerp(c,Math.min(1,D*6));h.push(R.r,R.g,R.b)}n.setAttribute("color",new Ps(h,3));const m=l.mesh(n,l.mat("#ffffff",{vertexColors:!0,roughness:.5}),{p:[-.12,.14,0],s:[.86,.64,.78]}),g=l.mesh(l.geo(new cs(.86,.09,10,36)),l.mat("#93502a"),{p:[-.1,.01,0],r:[Math.PI/2,0,0],s:[.98,.91,1]}),M=l.mesh(a,e,{p:[-.07,-.05,0],s:[.84,.22,.73]}),x=.6,y=new rt;y.position.set(1,.3,0),y.add(l.mesh(a,s,{s:[x,x*.96,x*1.02]}));const S=(A,O,L,D=x*.95)=>new v(A,O,L).normalize().multiplyScalar(D),T=Vo(l,y,.15,[S(.86,.1,.44),S(.86,.1,-.44)],new v(1,.1,0),{iris:"#8a5a3c",shine:.6});y.add(l.mesh(a,o,{p:S(.6,-.18,.76).toArray(),s:[.05,.065,.12],r:[0,-.9,0]})),y.add(l.mesh(a,o,{p:S(.6,-.18,-.76).toArray(),s:[.05,.065,.12],r:[0,.9,0]}));const C=l.mesh(l.geo(new cs(.08,.02,8,18,Math.PI)),i,{p:S(.97,-.24,0,x*.99).toArray(),r:[0,Math.PI/2,Math.PI]});y.add(C);const P=l.mesh(a,s,{p:[.62,.14,0],s:[.3,.26,.28]}),_=[];for(const A of[-1,1]){const O=l.mesh(a,s,{p:[.38,-.1,A*.6],s:[.22,.09,.36],r:[0,A*.45,0]}),L=l.mesh(a,s,{p:[-.56,-.1,A*.45],s:[.16,.08,.23],r:[0,-A*.5,0]});_.push([O,A],[L,A*.5]),t.add(O,L)}const E=l.mesh(l.geo(new Me(.1,.3,12)),s,{p:[-.84,-.02,0],r:[0,0,Math.PI/2]});return t.add(m,g,M,y,P,E),t.traverse(A=>{A.isMesh&&(A.castShadow=!0)}),{root:t,materials:l.materials,animate:A=>{for(const[L,D]of _)L.rotation.x=Math.sin(A*2.2+(D>0?0:.4))*.45*Math.sign(D)*(Math.abs(D)>.6?1:.6);y.position.y=.3+Math.sin(A*1.6)*.035,y.rotation.set(Math.sin(A*.7)*.14,Math.sin(A*.43)*.18,Math.sin(A*.9)*.08);const O=cr(A);for(const L of T)L.scale.y=O},dispose:()=>l.dispose()}}const ur=`
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
`;let Us=null;function So(){if(Us)return Us;const l=document.createElement("canvas");l.width=l.height=128;const t=l.getContext("2d"),s=t.createRadialGradient(64,64,0,64,64,64);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.25,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,128,128),Us=new no(l),Us}function dr(l,t){const s=new $i,e=new rt;e.name="sea-friends";const o=s.geo(new J(1,28,20)),i=V=>{V.rotation.y=Math.atan2(t.x-V.position.x,t.z-V.position.z)},a=new Map,n=V=>{const K=a.get(V);a.set(V,{t:0,base:K?.base||V.scale.clone()})},r=new rt;r.name="shipwreck";{const V=s.geo(new J(1,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2)),K=[],tt=V.getAttribute("position"),bt=new W("#8a5a36"),dt=new W("#6b4329");for(let et=0;et<tt.count;et++){const Ut=Math.floor((tt.getY(et)+1)*7)%2?bt:dt;K.push(Ut.r,Ut.g,Ut.b)}V.setAttribute("color",new Ps(K,3));const zt=s.mesh(V,s.mat("#ffffff",{vertexColors:!0,side:Xt,roughness:.8}),{s:[1.5,1.1,3.4]}),Mt=s.mesh(s.geo(new ht(1,1,.08,32)),s.mat("#a7764a",{roughness:.85}),{p:[0,-.12,0],s:[1.4,1,3.25]}),Zt=s.mesh(o,s.mat("#2a1a10",{roughness:1}),{p:[1.38,-.45,.6],s:[.12,.32,.42]}),yt=s.mesh(s.geo(new ht(.1,.13,3.2,10)),s.mat("#7a4c2c"),{p:[0,1.4,.4],r:[.25,0,-.35]}),At=s.mesh(s.geo(new ht(.06,.06,2.2,8)),s.mat("#7a4c2c"),{p:[-.45,2.3,.75],r:[.25,0,Math.PI/2-.35]}),_t=s.geo(new Fe(1.8,1.5,10,8)),Z=_t.getAttribute("position");for(let et=0;et<Z.count;et++){const Ut=Z.getX(et),te=Z.getY(et);Z.setZ(et,Math.sin(Ut*2.4)*.12+Math.cos(te*3)*.06),te<-.6&&Z.setY(et,te+Math.abs(Math.sin(Ut*9))*.35)}_t.computeVertexNormals();const Ft=s.mesh(_t,s.mat("#efe2c2",{side:Xt,roughness:.9}),{p:[-.35,1.5,.62],r:[.25,0,-.35]}),Bt=s.mesh(s.geo(new Fe(.6,.38)),s.mat("#2b2b38",{side:Xt}),{p:[.65,2.8,.9],r:[.25,0,-.35]});r.add(zt,Mt,Zt,yt,At,Ft,Bt),r.position.copy(l(24,.5)).add(new v(0,.55,0)),r.rotation.set(.12,.9,.32)}e.add(r);const h=new rt;h.name="treasure";const c=Xi();s.geo(c.base),s.geo(c.lid);const u=s.mat("#ffffff",{vertexColors:!0,roughness:.6}),d=new q(c.base,u),p=new q(c.lid,u);p.position.set(0,.46,-.29),p.rotation.x=-1.6,d.add(p),d.scale.setScalar(1.6),h.add(d);const f=s.mat("#f6c444",{metalness:.65,roughness:.28,emissive:"#7a5200",emissiveIntensity:.35}),m=new ls(s.geo(new ht(.13,.13,.035,18)),f,34),g=new As;for(let V=0;V<m.count;V++){const K=V<12,tt=V*2.4,bt=K?.08+V%4*.12:.9+V%6*.22;g.position.set(K?(V%4-1.5)*.28:Math.cos(tt)*bt+.6,K?.78+Math.floor(V/4)*.05:.03+V%3*.03,K?(Math.floor(V/4)-1)*.2:Math.sin(tt)*bt*.6),g.rotation.set(K?.3:V%5*.3,tt,K?.2:V%4*.2),g.scale.setScalar(1),g.updateMatrix(),m.setMatrixAt(V,g.matrix)}h.add(m);const M=new qs({map:So(),color:"#ffd76a",blending:oe,depthWrite:!1,transparent:!0,opacity:.7});s.materials.push(M);const x=new Hs(M);x.position.set(0,1.1,0),x.scale.setScalar(2.6),h.add(x),h.position.copy(l(12,-2.2)),i(h),h.rotation.y+=.5,e.add(h);let y=-1.6;const S=new rt;S.name="octopus";const T=s.mat("#ec86b8",{roughness:.45}),C=new rt;C.position.y=2.1,C.add(s.mesh(o,T,{s:[1.15,1.3,1.1]})),C.add(s.mesh(o,s.mat("#f7b6d6"),{p:[0,-.35,.95],s:[.62,.38,.22]})),Vo(s,C,.2,[new v(.42,.05,.95),new v(-.42,.05,.95)],new v(0,.05,1)),C.add(s.mesh(s.geo(new cs(.1,.045,10,20)),s.mat("#9c3d6f"),{p:[0,-.38,1.1]}));for(const V of[-1,1])C.add(s.mesh(o,s.mat("#ff8fa8",{transparent:!0,opacity:.7}),{p:[V*.7,-.25,.82],s:[.2,.11,.08]}));for(const[V,K,tt,bt]of[[.5,.85,.55,.12],[-.3,1,.6,.09],[.15,1.15,.3,.07]])C.add(s.mesh(o,s.mat("#f7b6d6"),{p:[V,K,tt],s:bt}));const P=s.mesh(s.geo(new Ti(1,1)),s.mat("#7c8f9c",{flatShading:!0,roughness:.9}),{p:[0,.35,0],s:[1.5,.7,1.3]}),_=8,E=12,A=new ls(o,T,_*E);A.frustumCulled=!1,S.add(P,C,A);const O=l(17.5,-5.2),L=l(17.5,-2.1);let D=-1;const R=V=>{if(Math.abs(V-D)<.01)return;D=V;const K=Math.min(1,Math.max(0,(1.1-V)/.55));S.position.lerpVectors(O,L,K),i(S),S.rotation.y+=.25,S.scale.setScalar(1.15-K*.2)};R(16/9),e.add(S);let j=0;const Q={value:0},st={value:0};let at=null,ct=!1;Vi("octopus").then(V=>{if(ct){V.geometry.dispose(),V.map.dispose(),V.normalMap?.dispose();return}s.geo(V.geometry);const K=s.mat("#ffffff",{map:V.map,normalMap:V.normalMap,roughness:.5,emissive:"#ffffff",emissiveMap:V.map,emissiveIntensity:.28});s.textures.push(V.map,...V.normalMap?[V.normalMap]:[]),V.normalMap&&K.normalScale.set(.6,.6),K.onBeforeCompile=dt=>{dt.uniforms.uOctoTime=Q,dt.uniforms.uOctoWave=st,dt.vertexShader=dt.vertexShader.replace("#include <common>",`#include <common>
${ur}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed = octoDeform(position);`)},K.customProgramCacheKey=()=>"larch-sea-octopus";const tt=new q(V.geometry,K);tt.name="octopus-model",tt.castShadow=!0;const bt=Oi(V,2.6);tt.scale.copy(V.extent).multiplyScalar(bt),tt.position.y=1+V.extent.y*bt,tt.rotation.y=-Math.PI/2,S.add(tt),S.remove(C,A),at=tt}).catch(V=>console.warn("[islandDive] octopus model failed, keeping the clay one",V instanceof Error?V.message:V));const lt=new rt;lt.name="pineapple-house";{const V=s.geo(new J(1,40,30)),K=[],tt=V.getAttribute("position"),bt=new W("#f2a33a"),dt=new W("#b9661c"),zt=new W("#7a4a12");for(let Z=0;Z<tt.count;Z++){const Ft=tt.getX(Z),Bt=tt.getY(Z),et=tt.getZ(Z),Ut=Math.atan2(et,Ft)*5,te=Bt*7,Kt=Math.abs(Math.sin(Ut+te)),De=Math.abs(Math.sin(Ut-te)),jt=Math.min(Kt,De)<.16?dt:Kt>.9&&De>.9?zt:bt;K.push(jt.r,jt.g,jt.b)}V.setAttribute("color",new Ps(K,3)),lt.add(s.mesh(V,s.mat("#ffffff",{vertexColors:!0,roughness:.6}),{p:[0,1.5,0],s:[1.25,1.6,1.25]}));const Mt=s.geo(new J(1,12,10)),Zt=s.mat("#4fae4d",{roughness:.6}),yt=s.mat("#7cd06a",{roughness:.6});for(let Z=0;Z<9;Z++){const Ft=Z/9*Math.PI*2,Bt=Z%2?.7:.45,et=new q(Mt,Z%2?Zt:yt);et.scale.set(.16,1.05,.06),et.position.set(Math.cos(Ft)*.32,3.55+Z%2*.1,Math.sin(Ft)*.32),et.rotation.set(Math.sin(Ft)*Bt,0,-Math.cos(Ft)*Bt,"XYZ"),lt.add(et)}const At=s.mesh(s.geo(new ht(.36,.36,.1,24,1,!1,0,Math.PI)),s.mat("#8fc3d8"),{p:[0,.48,1.18],r:[Math.PI/2,0,Math.PI/2]}),_t=s.mesh(s.geo(new Fe(.72,.4)),s.mat("#8fc3d8",{side:Xt}),{p:[0,.28,1.2]});lt.add(At,_t);for(const[Z,Ft]of[[-.62,1.9],[.55,1.35]]){const Bt=s.mesh(s.geo(new cs(.22,.06,10,24)),s.mat("#9aa7b0",{metalness:.4,roughness:.35}),{p:[Z,Ft,1.14-Math.abs(Z)*.16],r:[0,Z*.4,0]}),et=s.mesh(o,s.mat("#bfe8f5",{emissive:"#ffe9a8",emissiveIntensity:.25}),{p:[Z,Ft,1.1-Math.abs(Z)*.16],s:[.2,.2,.05],r:[0,Z*.4,0]});lt.add(Bt,et)}lt.position.copy(l(28,8.5)),i(lt)}e.add(lt);const ot=new rt;ot.name="anglerfish";const Ct=s.mat("#34406f",{roughness:.4}),ft=new rt;ft.add(s.mesh(o,Ct,{s:[.95,.82,.78]})),ft.add(s.mesh(o,s.mat("#7d8cc4"),{p:[.1,-.35,0],s:[.7,.42,.62]})),ft.add(s.mesh(o,s.mat("#1a1530",{roughness:.8}),{p:[.78,-.18,0],s:[.2,.26,.42]}));const pt=s.geo(new Me(.045,.12,6)),ne=s.mat("#fffaf0");for(let V=0;V<5;V++)ft.add(s.mesh(pt,ne,{p:[.92,-.02,-.26+V*.13],r:[Math.PI,0,0]}));Vo(s,ft,.13,[new v(.62,.28,.42),new v(.62,.28,-.42)],new v(.7,.1,0));const Jt=s.geo(new Me(.35,.55,3)),Lt=s.mesh(Jt,Ct,{p:[-1,.05,0],r:[Math.PI/2,0,Math.PI/2],s:[1,1,.3]});for(const V of[-1,1])ft.add(s.mesh(o,Ct,{p:[0,-.1,V*.75],s:[.28,.1,.2],r:[0,V*.6,0]}));ft.add(Lt);const fe=new ca([new v(.3,.72,0),new v(.65,1.25,0),new v(1.15,1.38,0),new v(1.4,1.12,0)]);ft.add(s.mesh(s.geo(new ha(fe,20,.035,6)),Ct));const Wt=s.mat("#fff1a8",{emissive:"#ffd84a",emissiveIntensity:1.6,roughness:.2}),mt=s.mesh(o,Wt,{p:[1.4,1,0],s:.15});ft.add(mt);const Gt=new qs({map:So(),color:"#ffe27a",blending:oe,depthWrite:!1,transparent:!0,opacity:1}),Rt=new qs({map:So(),color:"#ffcf5a",blending:oe,depthWrite:!1,transparent:!0,opacity:.3});s.materials.push(Gt,Rt);const Tt=new Hs(Gt);Tt.position.set(1.4,1,0),Tt.scale.setScalar(2.2);const Dt=new Hs(Rt);Dt.position.set(1.2,.6,0),Dt.scale.setScalar(8),ft.add(Tt,Dt),ot.add(ft);const pe=l(11,1.4).add(new v(0,3.3,0));ot.position.copy(pe),ot.scale.setScalar(.9),e.add(ot);let Vt=!0,gt=1;const vt=[[ot,()=>{Vt=!Vt,n(ft)}],[lt,()=>n(lt)],[S,()=>{j=1,n(at||C)}],[h,()=>{y=y<-1?-.2:-1.6,n(d)}],[r,()=>n(r)]],Pt=V=>{if(!e.visible)return null;let K=null;for(const[tt,bt]of vt){const dt=V.intersectObject(tt,!0).find(zt=>!zt.object.isSprite);dt&&(!K||dt.distance<K.hit)&&(K={hit:dt.distance,act:bt,at:dt.point.clone()})}return K},Yt=new v,$t={group:e,get lampOn(){return Vt},update(V,K,tt,bt){if(e.visible=bt,!bt)return;tt instanceof Lo&&R(tt.aspect);const dt=K*.35;Yt.set(Math.cos(dt)*1.6,Math.sin(K*.8)*.35,Math.sin(dt)*1.1),ot.position.copy(pe).add(Yt),ot.rotation.y=Math.atan2(-Math.cos(dt)*1.1,-Math.sin(dt)*1.6),Lt.rotation.y=Math.sin(K*5)*.35,gt+=((Vt?1:0)-gt)*(1-Math.exp(-V*8));const zt=.88+.12*Math.sin(K*3.1)*Math.sin(K*1.7);Gt.opacity=gt*zt,Rt.opacity=gt*.3*zt,Wt.emissiveIntensity=.05+gt*1.6,j=Math.max(0,j-V*.5),Q.value=K,st.value=j;const Mt=1.4+j*3,Zt=.28+j*.35;if(!at)for(let yt=0;yt<_;yt++){const At=yt/_*Math.PI*2+.2;for(let _t=0;_t<E;_t++){const Z=_t/(E-1),Ft=At+Math.sin(K*Mt*.6+yt+Z*2)*.35*Z,Bt=.75+Z*1.9;g.position.set(Math.cos(Ft)*Bt,1.25-Z*.55+Math.sin(K*Mt+yt*1.3+Z*4)*Zt*Z+Z*Z*.5,Math.sin(Ft)*Bt),g.scale.setScalar(.3*(1-Z*.72)),g.rotation.set(0,0,0),g.updateMatrix(),A.setMatrixAt(yt*E+_t,g.matrix)}}A.instanceMatrix.needsUpdate=!0,C.position.y=2.1+Math.sin(K*1.2)*.08,p.rotation.x+=(y-p.rotation.x)*(1-Math.exp(-V*6)),M.opacity=.55+.2*Math.sin(K*2.3);for(const[yt,At]of a){At.t+=V;const _t=Math.min(1,At.t/.9),Z=Math.sin(_t*Math.PI*3)*Math.exp(-_t*3.5)*.18;yt.scale.set(At.base.x*(1+Z),At.base.y*(1-Z),At.base.z*(1+Z)),_t>=1&&(yt.scale.copy(At.base),a.delete(yt))}},tap(V){const K=Pt(V);return K?(K.act(),$t.onBubbles?.(K.at),!0):!1},hover:V=>!!Pt(V),dispose(){ct=!0,s.dispose(),e.removeFromParent()}};return $t}const hi=6,fr=new v(1,0,0);function pr(l,t){const s=document.createElement("canvas"),e=s.getContext("2d"),o='"Huninn", "jf-openhuninn-2.0", ui-rounded, "Noto Sans TC", "PingFang TC", sans-serif',i=512,a=30,n=i-a*2;e.font=`600 34px ${o}`;const r=[];let h="";for(const m of[...l])if(e.measureText(h+m).width>n){if(r.push(h),h=m,r.length===3)break}else h+=m;r.length<3&&h?r.push(h):r.length===3&&h&&r.join("").length<[...l].length&&(r[2]=`${r[2].slice(0,-1)}…`);const c=Math.min(i,Math.max(220,Math.max(...r.map(m=>e.measureText(m).width))+a*2)),u=a*2+r.length*46+40;s.width=i,s.height=u+28;const d=(i-c)/2;e.fillStyle="rgba(31, 26, 64, 0.22)",e.beginPath(),e.roundRect(d+4,8,c,u,28),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.roundRect(d,2,c,u,28),e.fill(),e.beginPath(),e.moveTo(i/2-18,u),e.lineTo(i/2,u+24),e.lineTo(i/2+18,u),e.closePath(),e.fill(),e.textAlign="center",e.textBaseline="top",e.fillStyle="#2a2440",e.font=`600 34px ${o}`,r.forEach((m,g)=>e.fillText(m,i/2,a+g*46)),e.fillStyle="#5b4aa6",e.font=`700 26px ${o}`;const p=[...t].length>16?`${[...t].slice(0,16).join("")}…`:t;e.fillText(`— ${p}`,i/2,a+r.length*46+6);const f=new no(s);return f.colorSpace=ro,{texture:f,aspect:i/s.height}}const zo=-.9,ui=46;function mr(l){if(l===0)return 1;const t=(l*.618034+.31)%1;return Math.min(1,.03+t*1.02)}function gr(l,t,s,e){const o=new rt;o.name="sea-creatures";let i=[],a=1;const n=new qs({transparent:!0,depthTest:!1,depthWrite:!1,opacity:0,fog:!1,toneMapped:!1}),r=new Hs(n);r.renderOrder=20,r.visible=!1,o.add(r);let h=null,c=0,u=2;const d=E=>{const A=s(E.x,E.z)+1.3;E.y=Math.max(A,Math.min(zo,E.y));const O=Math.hypot(E.x,E.z),L=e(E.y)+1.4;return O<L&&O>.001&&(E.x*=L/O,E.z*=L/O),E},p=(E,A)=>{const O=Math.min(1,Math.max(0,E+(Math.random()-.5)*.07)),L=6.5+Math.random()*9,D=(1.1+L*.32)*Math.min(1.5,Math.max(.55,a)),R=O>.95?-4.5+Math.random()*4.2:O<.08?-1.2+Math.random()*1.6:(Math.random()-.6)*5;return A.copy(d(t(O,L,(Math.random()*2-1)*D,R)))},f=()=>{r.visible=!1,h=null,n.map?.dispose(),n.map=null},m=E=>{f();const{texture:A,aspect:O}=pr(E.data.body,E.data.authorName);n.map=A,n.needsUpdate=!0,u=O,h=E,c=0,r.visible=!0,E.rest=2.2},g=E=>{if(!o.visible)return null;let A=null;const O=E.ray,L=new v;for(const D of i){const R=D.radius*D.scale*1.35;if(O.distanceSqToPoint(D.pos)>R*R)continue;const j=L.copy(D.pos).sub(O.origin).dot(O.direction);j>0&&(!A||j<A.distance)&&(A={swimmer:D,distance:j})}return A?.swimmer||null},M=new Ee,x=new be,y=new v,S=new be,T=new v,C=new v,P=new v,_=new v;return{group:o,setList(E,A){const O=new Map(i.map(D=>[D.id,D])),L=[];for(const D of E.slice(0,A)){const R=xa(D.design);if(!R)continue;const j=O.get(D.id);if(j&&JSON.stringify(j.data.design)===JSON.stringify(R)){j.data=D,O.delete(D.id),L.push(j);continue}const Q=ba(R),st=new q(Q,l);st.matrixAutoUpdate=!1,st.frustumCulled=!1,st.name=`sea-creature:${D.id}`,o.add(st);const at=Q.boundingSphere?.radius||1,ct=j?j.band:mr(L.length),lt=j?j.pos.clone():p(ct,new v);L.push({id:D.id,mesh:st,radius:at,scale:1.05/at,pos:lt,vel:new v,goal:p(ct,new v),heading:new v(Math.random()-.5,0,Math.random()-.5).normalize(),phase:Math.random()*10,rest:0,band:ct,data:D}),j&&(o.remove(j.mesh),j.mesh.geometry.dispose(),O.delete(D.id),h===j&&f())}for(const D of O.values())o.remove(D.mesh),D.mesh.geometry.dispose(),h===D&&f();i=L},update(E,A,O,L){if(o.visible=L&&i.length>0,!o.visible)return;a=O.aspect;const D=Math.min(E,.05);for(const R of i){T.copy(R.goal).sub(R.pos),T.length()<.8&&p(R.band,R.goal);const Q=R.rest>0?0:.9+.35*Math.sin(A*.3+R.phase);R.rest=Math.max(0,R.rest-D),T.normalize().multiplyScalar(Q).sub(R.vel).multiplyScalar(Math.min(1,D*1.2)),R.vel.add(T),R.pos.addScaledVector(R.vel,D);const st=s(R.pos.x,R.pos.z)+.9;R.pos.y<st&&(R.pos.y=st),R.pos.y>zo&&(R.pos.y=zo);const at=Math.hypot(R.pos.x,R.pos.z),ct=e(R.pos.y)+.9;if(at<ct&&at>.001&&(R.pos.x*=ct/at,R.pos.z*=ct/at),R.mesh.visible=O.position.distanceToSquared(R.pos)<ui*ui,!R.mesh.visible)continue;const lt=R.rest>0?T.copy(O.position).sub(R.pos).setY(0):T.copy(R.vel).setY(R.vel.y*.4);lt.lengthSq()>1e-4&&R.heading.lerp(lt.normalize(),1-Math.exp(-D*2.5)).normalize(),x.setFromUnitVectors(fr,R.heading),S.setFromAxisAngle(R.heading,Math.sin(A*1.3+R.phase)*.12),x.premultiply(S);const ot=Math.sin(A*1.6+R.phase)*.12;y.setScalar(R.scale),M.compose(T.copy(R.pos).setY(R.pos.y+ot),x,y),R.mesh.matrix.copy(M),R.mesh.matrixWorldNeedsUpdate=!0}if(h){c+=D;const R=Math.min(1,c*5)*Math.min(1,Math.max(0,hi-c));n.opacity=R;const j=O.position.distanceTo(h.pos),Q=Math.max(.7,j*.075)*(a<.8?1.1:1);r.scale.set(Q*u,Q,1),r.position.copy(h.pos).setY(h.pos.y+.75+Q*.5),O.getWorldDirection(C);const st=T.copy(r.position).sub(O.position).dot(C);if(st>.1){const at=st*Math.tan(O.fov*Math.PI/360),ct=at*O.aspect;P.crossVectors(C,O.up).normalize(),_.crossVectors(P,C).normalize();const lt=T.copy(r.position).sub(O.position).dot(P)/ct,ot=T.copy(r.position).sub(O.position).dot(_)/at,Ct=Math.max(0,.96-r.scale.x/2/ct),ft=Math.max(0,.94-r.scale.y/2/at);Math.abs(lt)>Ct&&r.position.addScaledVector(P,(Math.sign(lt)*Ct-lt)*ct),ot>ft&&r.position.addScaledVector(_,(ft-ot)*at)}c>=hi&&f()}},tap(E){const A=g(E);return A?(m(A),!0):!1},hover:E=>!!g(E),show(E){const A=i.find(O=>O.id===E);return A?(m(A),!0):!1},where:E=>i.find(A=>A.id===E)?.pos.clone()||null,talking:()=>h?.id||null,count:()=>i.length,dispose(){f(),n.dispose();for(const E of i)E.mesh.geometry.dispose();i=[],o.removeFromParent()}}}const vr=`
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
`,wr=`
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
${Ce}
${_s}
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
`,Zi={value:0};function ns(l,t,s){return new it({uniforms:{...we.clone(ye.fog),uTime:l.uTime,uSunDir:l.uSunDir,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uGlow:l.uGlow,uLight:t,uWiggle:{value:s.wiggle},uWiggleSpeed:{value:s.speed},uWiggleAxis:{value:s.axis==="y"?1:0},uDots:{value:s.dots?1:0},uDotColor:{value:new W(s.dots||"#ffffff")},uRim:{value:s.rim??.35},uBright:{value:s.bright??0},uCaustic:Zi},vertexShader:vr,fragmentShader:wr,fog:!0})}function uo(l){return l.getAttribute("aPhase")||l.setAttribute("aPhase",new $(new Float32Array(l.getAttribute("position").count),1)),l}function yr(){const l=new Et;l.add(new J(1,18,12),e=>e.y<-.25?"#fffbea":"#ffffff",G({s:[.5,.25,.14]}));const t=new Me(.2,.34,4,1);t.rotateZ(Math.PI/2),l.add(t,"#ffffff",G({x:-.58,s:[1,1.15,.22]}));const s=new Me(.1,.24,4,1);l.add(s,"#ffffff",G({x:-.05,y:.24,rz:.5,s:[1,1,.25]}));for(const e of[-1,1])l.add(new J(.045,8,6),"#141420",G({x:.3,y:.05,z:e*.105})),l.add(new J(.016,6,4),"#ffffff",G({x:.32,y:.07,z:e*.142}));return uo(l.build())}function xr(){const l=new Et;l.add(new J(1,36,22),t=>It("#5b80b8","#e4eef6",ut(-.05,-.55,t.y+t.x*.05)),G({s:[3.3,1.35,1.4]}));for(const t of[-1,1])l.add(new J(1,16,10),"#5276ad",G({x:.6,y:-.75,z:t*1.35,ry:t*.5,rz:-.4,s:[.85,.12,.38]})),l.add(new J(.17,12,10),"#1d2233",G({x:2.25,y:.02,z:t*1.02})),l.add(new J(.06,8,6),"#ffffff",G({x:2.36,y:.1,z:t*1.12})),l.add(new J(.22,12,8),"#f4a6b8",G({x:2,y:-.32,z:t*1.07,s:[1,.45,.6]})),l.add(new J(1,16,10),"#5276ad",G({x:-3.75,y:.1,z:t*.7,ry:t*.55,s:[.85,.1,.55]}));return l.add(new ht(.42,.75,1.3,16,2),"#5b80b8",G({x:-2.95,y:.08,rz:Math.PI/2})),uo(l.build())}function br(){const l=new Et;l.add(new J(1,28,18),e=>It("#4b3a5c","#2a2134",ut(.6,-.6,e.y)),G({s:[1.05,.85,.8]})),l.add(new J(1,20,12,0,Math.PI*2,Math.PI/2,Math.PI/2),"#3a2c48",G({x:.45,y:-.12,s:[.75,.45,.7]}));for(let e=0;e<9;e++){const o=-.9+e/8*1.8,i=new Me(.045,.2,5,1);l.add(i,"#f4f1e6",G({x:.92+Math.cos(o)*.05,y:-.08,z:Math.sin(o)*.52,rz:Math.PI}))}for(const e of[-1,1])l.add(new J(.12,10,8),"#e9f0c8",G({x:.62,y:.38,z:e*.42})),l.add(new J(.06,8,6),"#141420",G({x:.7,y:.4,z:e*.47})),l.add(new Me(.25,.6,4,1),"#3a2c48",G({x:-.2,y:-.1,z:e*.78,rx:e*1.2,s:[1,1,.2]}));const t=new Me(.42,.7,6,1);t.rotateZ(Math.PI/2),l.add(t,"#3a2c48",G({x:-1.25,s:[1,1,.3]}));const s=new cs(.75,.025,6,16,Math.PI*.62);return l.add(s,"#5a4870",G({x:.55,y:.75,rz:.35})),uo(l.build())}const Mr=`
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
`,Sr=`
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
`;function zr(){const l=new Et,t=new J(1,32,14,0,Math.PI*2,0,Math.PI*.52),s=t.getAttribute("position");for(let e=0;e<s.count;e++){const o=s.getX(e),i=s.getY(e),a=s.getZ(e),n=1+.07*Math.sin(Math.atan2(a,o)*8)*(1-Math.min(1,i/.35));s.setXYZ(e,o*n,i*.88,a*n)}t.computeVertexNormals(),l.add(t,"#ffffff",new Ee,0);for(let e=0;e<4;e++){const o=e/4*Math.PI*2+Math.PI/4;l.add(new J(.2,12,8),"#ffffff",G({x:Math.cos(o)*.2,y:.45,z:Math.sin(o)*.2,s:[1,.35,.65],ry:-o}),2)}for(let e=0;e<9;e++){const o=e/9*Math.PI*2,i=new ht(.014,.006,2.3,4,12,!0);i.translate(0,-1.15,0),l.add(i,"#ffffff",G({x:Math.cos(o)*.74,y:.04,z:Math.sin(o)*.74}),1)}for(let e=0;e<4;e++){const o=e/4*Math.PI*2+.4,i=new ht(.07,.02,1.5,5,10,!0);i.translate(0,-.75,0),l.add(i,"#ffffff",G({x:Math.cos(o)*.16,y:.02,z:Math.sin(o)*.16,rx:Math.sin(o)*.12}),1)}return l.build(!0)}const kr=`
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
`,Cr=`
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
`;function Tr(){const t=[],s=[],e=[];for(let i=0;i<=18;i++){const a=i/18,n=.15*(1-a*.5)*(1+.4*Math.sin(a*22));t.push(-n,a,0,n,a,0),s.push(0,0,1,0,0,1)}for(let i=0;i<18;i++){const a=i*2;e.push(a,a+1,a+2,a+1,a+3,a+2)}const o=new kt;return o.setAttribute("position",new $(new Float32Array(t),3)),o.setAttribute("normal",new $(new Float32Array(s),3)),o.setIndex(e),o}const Pr=`
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
`,Ar=`
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
${Ce}
${_s}
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
`,_r=`
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
`,Fr=`
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
`,di=`
uniform float uScale;
attribute float aSize;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,fi=`
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.0, 1.0, d)) * uOpacity;
  gl_FragColor = vec4(uColor, a);
}
`,Ir=`
varying vec2 vUv;
varying float vFade;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  // 鏡頭穿過光束的時候淡掉，不會突然一整片白
  vFade = smoothstep(2.5, 7.0, distance(world.xyz, cameraPosition));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,Er=`
uniform float uOpacity;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
${Ce}
void main() {
  // 一道光：兩邊柔柔地淡掉，裡面有幾條順著光的細紋，上面亮、往下慢慢消失
  float edge = smoothstep(0.0, 0.45, vUv.x) * smoothstep(1.0, 0.55, vUv.x);
  float streak = 0.5 + 0.5 * vnoise(vec2(vUv.x * 7.0 + uSeed * 3.0, vUv.y * 1.4 + uTime * 0.1));
  float fall = smoothstep(0.0, 0.92, vUv.y);
  float flicker = 0.72 + 0.28 * sin(uTime * 0.8 + uSeed * 5.0 + vUv.y * 2.4);
  float a = edge * edge * streak * fall * fall * flicker * uOpacity * vFade;
  gl_FragColor = vec4(uColor, a);
}
`,Rr=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,Dr=`
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vDir;
${Ce}
${Ri}
void main() {
  gl_FragColor = vec4(waterDome(normalize(vDir), uSunDir, uTime), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Nr=`
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
`,Wr=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (exp(-d * d * 9.0) + exp(-d * d * 2.2) * 0.35) * vAlpha;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor * 1.6, a);
}
`;function zs(l,t){return ue+.9*ie(l*.06,t*.06,3)+.18*Math.sin(l*.7+ie(l*.2,t*.2)*3)}function Vr(l,t,s,e=1,o=null){const i=new rt;i.name="ocean";const a=Re(7781),n=s==="high",r=[],h=new As,c=new v,u={uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays,uSunDir:l.uSunDir,uTime:l.uTime},d=new q(new J(300,32,18),new it({uniforms:u,vertexShader:Rr,fragmentShader:Dr,side:hs,depthWrite:!1}));d.renderOrder=-10,d.frustumCulled=!1,d.visible=!1,i.add(d),r.push(d.geometry,d.material);const p=[],f=new Fe(1,1);f.translate(0,-.5,0),r.push(f);const m=l.uWaterGlow;for(let z=0;z<(n?16:8);z++){const F=.02+a()*.36,B=Ue(F,5+a()*20,(a()-.5)*26,0),H=new it({uniforms:{uOpacity:{value:0},uTime:l.uTime,uSeed:{value:a()*10},uColor:m},vertexShader:Ir,fragmentShader:Er,transparent:!0,depthWrite:!1,blending:oe,side:Xt}),w=new q(f,H);w.position.set(B.x,-.3,B.z),w.rotation.z=(a()-.5)*.3,w.scale.set(.8+a()*2.6,22+a()*16,1),w.userData.strength=.5+a()*.5,w.renderOrder=6,p.push(w),i.add(w),r.push(H)}const g=n?700:320,M=34,x=new Float32Array(g*3),y=new Float32Array(g*3),S=new Float32Array(g);for(let z=0;z<g;z++)y.set([a()*M,a()*M,a()*M],z*3),S[z]=26+a()*46;const T=new kt,C=new $(x,3);C.setUsage(Ae),T.setAttribute("position",C),T.setAttribute("aSize",new $(S,1));const P=new it({uniforms:{uScale:{value:1},uColor:{value:new W("#dff7ff")},uOpacity:{value:0}},vertexShader:di,fragmentShader:fi,transparent:!0,depthWrite:!1,blending:oe}),_=new ke(T,P);_.frustumCulled=!1,_.renderOrder=7,i.add(_),r.push(T,P);const E=n?1100:480,A=26,O=new Float32Array(E*3),L=new Float32Array(E*3);for(let z=0;z<E;z++)O.set([a()*A,a()*A,a()*A],z*3),L.set([a(),a(),a()],z*3);const D=new kt;D.setAttribute("position",new $(O,3)),D.setAttribute("aSeed",new $(L,3));const R={uTime:l.uTime,uScale:{value:1},uOpacity:{value:0},uBox:{value:A},uOrigin:{value:new v},uScareOrigin:{value:new v},uScareDir:{value:new v(0,0,-1)},uScare:{value:0}},j=new ke(D,new it({uniforms:R,vertexShader:Nr,fragmentShader:Wr,transparent:!0,depthWrite:!1,blending:oe}));j.frustumCulled=!1,j.renderOrder=8,i.add(j),r.push(D,j.material);const Q=yr();r.push(Q);const st=[],at=(z,F,B,H,w,b)=>{const k=new ls(Q,B,z);k.instanceMatrix.setUsage(Ae),k.frustumCulled=!1;const I=new W,N=new Float32Array(z),X=[];for(let Y=0;Y<z;Y++)I.set(F[Y%F.length]),k.setColorAt(Y,I),N[Y]=a()*20,X.push({offset:new v((a()-.5)*w[0],(a()-.5)*w[1],(a()-.5)*w[2]),phase:N[Y],speed:.6+a()*.7,scale:H*(.8+a()*.45)});k.geometry=Q.clone(),k.geometry.setAttribute("aPhase",new Ye(N,1)),r.push(k.geometry),i.add(k);const U={mesh:k,center:b,fish:X,previous:X.map(()=>new v)};return st.push(U),U},ct=ns(l,t,{wiggle:.09,speed:11}),lt=ns(l,t,{wiggle:.07,speed:9,dots:"#7ff3ff",rim:.2});r.push(ct,lt),at(n?40:22,["#ffd23f","#3d8bfd","#ff8c42","#ff6fa8","#7be0ff"],ct,.8,[5,3,5],(z,F)=>{const B=z*.12+.3,H=Ts(B,-6)+3.2;return F.set(Math.sin(B)*H,-6+Math.sin(z*.3)*1.5,Math.cos(B)*H)}),at(n?30:16,["#2c3b5c","#33456b"],lt,.7,[6,3,6],(z,F)=>{const B=Ue(.56,13,-2,0);return F.set(B.x+Math.sin(z*.21)*4,B.y+Math.sin(z*.33)*1.2,B.z+Math.cos(z*.17)*4)});const ot=He(1).target,Ct=ns(l,t,{wiggle:.11,speed:14,rim:.4,bright:.34});r.push(Ct);const ft=z=>Math.max(24,Math.round(z*e));let pt=null;const ne=.28;if(o)try{const z=io+(Yi-io)*(2*ne*ne),F=oo+1.75*ne+.56,B=Wo(z)+8.2+2.2*ne+3.2,H=He(1),w=H.target.clone().sub(H.position).setY(0).normalize(),b=H.target.clone().addScaledVector(w,7).addScaledVector(new v(-w.z,0,w.x),-2.5).setY(ue+3.6);pt=new lr(o.renderer,l,t,o.width,[{count:o.baitBall,center:new v(Math.sin(F)*B,z-1.2,Math.cos(F)*B),radius:5.2,height:10.5,shape:0,speed:3,size:.44,back:"#24508a",side:"#a8c8e0",belly:"#f1f7ff",flash:1.15,wander:1.2},{count:o.reef,center:b.setY(ue+5),radius:4.8,height:6.5,shape:0,speed:2.3,size:.44,back:"#2b86e8",side:"#8fe0ff",belly:"#fff6d8",palette:["#2b86e8","#2f9ff0","#1f6fd0","#ffd23f"],flash:.5,wander:1.8}]),pt.meshes.forEach(k=>i.add(k))}catch{pt=null}const Jt=pt?[]:[new ao(Q,Ct,{count:ft(260),colors:["#3fd0ff","#5ae6ff","#2fa8ff","#8ff3ff"],home:new v(ot.x,ue+5,ot.z),roam:9,lift:2,size:.42,seed:31,floor:(z,F)=>zs(z,F),column:Ts,ceiling:ue+11}),new ao(Q,Ct,{count:ft(110),colors:["#ffe14d","#ffc83d","#fff27a"],home:new v(ot.x+3,ue+3.6,ot.z-2),roam:6,lift:1.4,size:.36,seed:57,floor:(z,F)=>zs(z,F),column:Ts,ceiling:ue+9})];for(const z of Jt)i.add(z.mesh);const Lt=[!1,!1],fe=new v,Wt=ns(l,t,{wiggle:.42,speed:1.6,axis:"y",rim:.25}),mt=new q(xr(),Wt);mt.scale.setScalar(1.15),i.add(mt),r.push(mt.geometry,Wt);const Gt=pt?pt.stats(0,new v).center.clone().add(new v(0,-2.6,0)):Ue(.4,15,4,-1.5),Rt=pt?{x:8.5,z:8.5,speed:.085}:{x:10,z:7,speed:.045},Tt=n?8:5,Dt=n?7:3,pe=Tt+Dt,Vt=new it({uniforms:{...we.clone(ye.fog),uTime:l.uTime,uGlow:l.uGlow},vertexShader:Mr,fragmentShader:Sr,transparent:!0,depthWrite:!1,blending:oe,side:Xt,fog:!0}),gt=zr(),vt=new ls(gt,Vt,pe);vt.instanceMatrix.setUsage(Ae),vt.frustumCulled=!1,vt.renderOrder=7;const Pt=["#ffb3dc","#9eeaff","#cdb4ff","#ffd9b0","#b4ffe0"],Yt=[];for(let z=0;z<Tt;z++){const F=.3+z/Tt*.34+a()*.04,B=(z%2?1:-1)*(3.5+a()*6);Yt.push({home:Ue(F,11+a()*9,B,(a()-.4)*4),scale:.5+a()*.45,phase:a()*10}),vt.setColorAt(z,new W(Pt[z%Pt.length]))}const $t=Re(9157);for(let z=0;z<Dt;z++){const F=.46+z/Dt*.3+$t()*.03,B=(z%2?-1:1)*(2.5+$t()*8);Yt.push({home:Ue(F,8+$t()*14,B,($t()-.5)*5),scale:.32+$t()*.4,phase:$t()*10}),vt.setColorAt(Tt+z,new W(Pt[(z+2)%Pt.length]))}i.add(vt),r.push(gt,Vt);const V=ns(l,t,{wiggle:.12,speed:3,rim:.05,bright:.06}),K=br(),tt=[],bt=new Float32Array(6);for(let z=0;z<2;z++){const F=new q(K,V);F.scale.setScalar(z===0?1.15:.85);const B=Ue(.76+z*.07,10+z*3,z?5:-4,z?-1:1);tt.push({mesh:F,home:B,phase:z*2.3}),i.add(F)}r.push(K,V);const dt=new kt,zt=new $(bt,3);zt.setUsage(Ae),dt.setAttribute("position",zt),dt.setAttribute("aSize",new $(new Float32Array([620,460]),1));const Mt=new it({uniforms:{uScale:{value:1},uColor:{value:new W("#fff2a6")},uOpacity:{value:1}},vertexShader:di,fragmentShader:fi,transparent:!0,depthWrite:!1,blending:oe}),Zt=new ke(dt,Mt);Zt.frustumCulled=!1,Zt.renderOrder=8,i.add(Zt),r.push(dt,Mt);const yt=new Fe(200,200,n?110:70,n?110:70);yt.rotateX(-Math.PI/2);const At=yt.getAttribute("position");for(let z=0;z<At.count;z++){const F=At.getX(z),B=At.getZ(z),H=.9*ie(F*.06,B*.06,3)+.18*Math.sin(F*.7+ie(F*.2,B*.2)*3);At.setY(z,ue+H)}yt.computeVertexNormals();const _t=new Et;_t.add(yt,z=>It("#e7cf9a","#b9a57c",.5+ie(z.x*.15,z.z*.15,2)));const Z=new Et,Ft=zs,Bt=[He(1).position,He(.93).position,He(.86).position],et=(z,F=6.5)=>{const B=a()*Math.PI*2,H=Math.sqrt(a())*z,w=ot.x+Math.cos(B)*H,b=ot.z+Math.sin(B)*H,k=Math.atan2(b,w);return Math.hypot(w,b)<Ts(k,ue+2)+.6||Bt.some(I=>Math.hypot(I.x-w,I.z-b)<F)?null:{x:w,z:b,y:Ft(w,b)}};for(let z=0;z<(n?26:14);z++){const F=et(22);if(!F)continue;const B=.4+a()*1.3,H=new J(1,12,9),w=H.getAttribute("position");for(let b=0;b<w.count;b++)c.fromBufferAttribute(w,b),c.multiplyScalar(1+.22*ie(c.x*1.8+z,c.z*1.8+c.y,2)),c.y*=.65,w.setXYZ(b,c.x,c.y,c.z);H.computeVertexNormals(),Z.add(H,(b,k)=>It("#6f8796","#a6b8c2",k.y*.5+.5),G({x:F.x,y:F.y+.1*B,z:F.z,ry:a()*6,s:B}))}const Ut=["#ff7f9e","#ff9f5a","#c58bff","#ffd166","#6fe3c1"];for(let z=0;z<(n?30:16);z++){const F=et(18);if(!F)continue;const B=Ut[z%Ut.length],H=z%3;if(H===0)for(let w=0;w<5;w++){const b=new ht(.06,.12,.9+a()*.6,6,1);b.translate(0,.45,0),Z.add(b,B,G({x:F.x,y:F.y,z:F.z,rx:(a()-.5)*1.1,rz:(a()-.5)*1.1})),Z.add(new J(.11,8,6),B,G({x:F.x+(a()-.5)*.6,y:F.y+.8+a()*.4,z:F.z+(a()-.5)*.6}))}else if(H===1){const w=.45+a()*.35,b=new J(w,28,14,0,Math.PI*2,0,Math.PI/2),k=b.getAttribute("position");for(let I=0;I<k.count;I++){c.fromBufferAttribute(k,I);const N=Math.sin(c.x*16+Math.sin(c.z*11)*2.2)*Math.sin(c.z*14+Math.sin(c.x*9)*1.8);c.multiplyScalar(1+.05*N+.08*ie(c.x*3+z,c.z*3,2)),c.y*=.72,k.setXYZ(I,c.x,c.y,c.z)}b.computeVertexNormals(),Z.add(b,I=>It(B,"#3a2440",ut(.2,-.6,Math.sin(I.x*16+Math.sin(I.z*11)*2.2)*Math.sin(I.z*14+Math.sin(I.x*9)*1.8))*.45),G({x:F.x,y:F.y-.05,z:F.z}))}else{for(let w=0;w<9;w++){const b=w/9*Math.PI*2,k=new ht(.035,.06,.55,5,1);k.translate(0,.27,0),Z.add(k,B,G({x:F.x+Math.cos(b)*.12,y:F.y+.1,z:F.z+Math.sin(b)*.12,rx:Math.sin(b)*.5,rz:-Math.cos(b)*.5}))}Z.add(new ht(.2,.26,.2,10,1),"#f3e1c5",G({x:F.x,y:F.y+.08,z:F.z}))}}for(let z=0;z<(n?10:5);z++){const F=et(15);if(!F)continue;const B=new Et;for(let H=0;H<5;H++){const w=new Me(.11,.42,5,1);w.rotateZ(-Math.PI/2),w.translate(.2,0,0),B.add(w,z%2?"#ff8f6b":"#ffb347",G({ry:H/5*Math.PI*2,s:[1,.45,1]}))}B.add(new J(.12,8,6),z%2?"#ff8f6b":"#ffb347",G({s:[1,.5,1]})),Z.add(B.build(),H=>H.y>.03?"#ffd0b0":z%2?"#ff8f6b":"#ffb347",G({x:F.x,y:F.y+.05,z:F.z,ry:a()*6}))}const te=new it({uniforms:{...we.clone(ye.fog),uTime:l.uTime,uLight:t,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uSunDir:l.uSunDir,uGlow:l.uGlow,uNight:l.uNight},vertexShader:Pr,fragmentShader:Ar,fog:!0,defines:n?{CAUSTIC_TWO_LAYERS:""}:{}}),Kt=new q(_t.build(),te),De=ns(l,t,{wiggle:0,speed:0,rim:.32,bright:.12}),jt=new q(uo(Z.build()),De);i.add(Kt,jt),r.push(Kt.geometry,te,jt.geometry,De);const me=dr((z,F)=>{const B=Ue(1,z,F,0);return B.y=zs(B.x,B.z),B},He(1).position);i.add(me.group);const ys=ns(l,t,{wiggle:.08,speed:6,rim:.32,bright:.12});r.push(ys);const re=gr(ys,(z,F,B,H)=>Ue(z,F,B,H),(z,F)=>zs(z,F),Wo);i.add(re.group);const Ne=n?90:46,Ke={...we.clone(ye.fog),uTime:l.uTime,uGlow:l.uGlow,uLight:t,uSunDir:l.uSunDir,uBase:{value:new W("#1f4a2e")},uTip:{value:new W("#5fae62")},uGlowTip:{value:new W("#6ff0d6")}},Fs=new it({uniforms:Ke,vertexShader:kr,fragmentShader:Cr,side:Xt,fog:!0}),xs=Tr(),ge=new ls(xs,Fs,Ne);let St=0;for(let z=0;z<Ne*4&&St<Ne;z++){const F=et(26,8);if(!F)continue;const B=4+Math.floor(a()*5);for(let H=0;H<B&&St<Ne;H++){const w=(a()-.5)*1.6,b=(a()-.5)*1.6;h.position.set(F.x+w,Ft(F.x+w,F.z+b)-.1,F.z+b),h.rotation.set(0,a()*Math.PI,0),h.scale.set(.9+a()*.9,3.5+a()*6.5,1),h.updateMatrix(),ge.setMatrixAt(St++,h.matrix)}}ge.count=St,ge.frustumCulled=!1,i.add(ge),r.push(xs,Fs);const Ot=n?380:190,bs=new Float32Array(Ot*3),Ms=new Float32Array(Ot),Qe=new Float32Array(Ot),Is=Array.from({length:Ot},()=>({pos:new v,vel:0,wobble:a()*10,life:-1,size:0,burst:!1})),Es=Array.from({length:6},()=>et(14)||{x:ot.x,z:ot.z,y:ue}),le=z=>{const F=Es[Math.floor(a()*Es.length)];z.pos.set(F.x+(a()-.5)*.5,F.y+.2,F.z+(a()-.5)*.5),z.vel=1.1+a()*1.4,z.size=70+a()*120,z.life=7+a()*6,z.burst=!1};Is.forEach((z,F)=>{F<Ot*.7&&(le(z),z.pos.y+=a()*12)});const We=new kt,Rs=new $(bs,3).setUsage(Ae),Je=new $(Ms,1).setUsage(Ae),Ds=new $(Qe,1).setUsage(Ae);We.setAttribute("position",Rs),We.setAttribute("aSize",Je),We.setAttribute("aAlpha",Ds);const us=new it({uniforms:{uScale:{value:1}},vertexShader:_r,fragmentShader:Fr,transparent:!0,depthWrite:!1}),Ve=new ke(We,us);Ve.frustumCulled=!1,Ve.renderOrder=9,i.add(Ve),r.push(We,us);let Oe=0;me.onBubbles=z=>Le(z,18);const Le=(z,F=14)=>{for(let B=0;B<F;B++){const H=Is[Oe];Oe=(Oe+1)%Ot,H.pos.set(z.x+(a()-.5)*.6,z.y+(a()-.5)*.4,z.z+(a()-.5)*.6),H.vel=1.6+a()*2.2,H.size=50+a()*150,H.life=2.6+a()*2.2,H.burst=!0}},ts=new be,ds=new Ee,ee=new v,xe=new v,Ge=new v,fs=new v,ps=new v,Ns=new v(1,0,0),es=(z,F,B,H)=>(B.lengthSq()<1e-6&&B.set(1,0,0),B.normalize(),ts.setFromUnitVectors(Ns,B),ps.setScalar(H),z.compose(F,ts,ps));return{group:i,update:(z,F,B,H,w,b=null)=>{const k=l.uUnder.value,I=l.uNight.value;d.visible=k>.5,d.position.copy(B.position),l.uWaterRays.value=(1-ut(3,30,H))*(1-I*.5);const N=k*(1-ut(4,26,H))*(1-I*.55);for(const U of p)U.material.uniforms.uOpacity.value=N*U.userData.strength*.26,U.visible=N>.01,U.visible&&(c.set(B.position.x-U.position.x,0,B.position.z-U.position.z),U.rotation.y=Math.atan2(c.x,c.z));if(R.uOpacity.value=k*ut(12,30,H)*(.55+I*.45),j.visible=R.uOpacity.value>.01,j.visible&&(R.uOrigin.value.copy(B.position).subScalar(A/2),R.uScale.value=w,b&&b.strength>0&&(R.uScareOrigin.value.copy(b.origin),R.uScareDir.value.copy(b.dir)),R.uScare.value=b?b.strength:0),P.uniforms.uOpacity.value=k*(.25+ut(6,40,H)*.45),P.uniforms.uScale.value=w,_.visible=k>.02,_.visible){const U=B.position.x-M/2,Y=B.position.y-M/2,nt=B.position.z-M/2,ce=F*.35;for(let Qt=0;Qt<g;Qt++){const Be=y[Qt*3],Ki=y[Qt*3+1],Qi=y[Qt*3+2],Ji=((Be-U+Math.sin(F*.2+Qt)*.3)%M+M)%M+U,ta=((Ki-Y-ce)%M+M)%M+Y,ea=((Qi-nt)%M+M)%M+nt;x[Qt*3]=Ji,x[Qt*3+1]=Math.min(ta,-.2),x[Qt*3+2]=ea}C.needsUpdate=!0}for(const U of st){U.center(F,Ge);const Y=Ge.distanceTo(B.position)<60;U.mesh.visible=k>.01&&Y,U.mesh.visible&&(U.fish.forEach((nt,ce)=>{const Qt=F*nt.speed*.5+nt.phase;xe.set(Math.sin(Qt)*nt.offset.x,Math.sin(Qt*1.3)*nt.offset.y*.5+nt.offset.y,Math.cos(Qt)*nt.offset.z).add(Ge);const Be=U.previous[ce];Be.lengthSq()===0&&(Be.copy(xe).x-=.01),ee.copy(xe).sub(Be),U.center(F+.4,fs),ee.addScaledVector(fs.sub(Ge),.25),U.mesh.setMatrixAt(ce,es(ds,xe,ee,nt.scale)),Be.lerp(xe,.35)}),U.mesh.instanceMatrix.needsUpdate=!0)}{const U=F*Rt.speed;c.set(Gt.x+Math.cos(U)*Rt.x,Gt.y+Math.sin(F*.2)*1.2,Gt.z+Math.sin(U)*Rt.z),ee.set(-Math.sin(U)*Rt.x,Math.cos(F*.2)*.24,Math.cos(U)*Rt.z),mt.matrixAutoUpdate=!1,es(mt.matrix,c,ee,1.15),mt.visible=k>.01&&H>4&&H<44,pt?.setPredator(c,mt.visible?5.6:0)}for(let U=0;U<pe;U++){const Y=Yt[U],nt=Math.sin(F*.21+Y.phase)*1.6+Math.sin(F*.37+Y.phase*1.7)*.5;h.position.set(Y.home.x+Math.sin(F*.2+Y.phase)*1.2,Y.home.y+nt,Y.home.z+Math.cos(F*.17+Y.phase)*1.2),h.rotation.set(Math.sin(F*.3+Y.phase)*.18,F*.1,Math.cos(F*.27+Y.phase)*.18),h.scale.setScalar(Y.scale),h.updateMatrix(),vt.setMatrixAt(U,h.matrix)}vt.instanceMatrix.needsUpdate=!0,vt.visible=k>.01&&H>6,tt.forEach((U,Y)=>{const nt=F*.12+U.phase;c.set(U.home.x+Math.cos(nt)*2.5,U.home.y+Math.sin(F*.5+U.phase)*.6,U.home.z+Math.sin(nt)*2.5),ee.set(-Math.sin(nt),.05,Math.cos(nt)),U.mesh.matrixAutoUpdate=!1,es(U.mesh.matrix,c,ee,U.mesh.scale.x),U.mesh.visible=k>.01&&H>22,xe.set(1.12,1.18,0).applyMatrix4(U.mesh.matrix),bt.set([xe.x,xe.y,xe.z],Y*3)}),zt.needsUpdate=!0,Mt.uniforms.uOpacity.value=(.65+.35*Math.sin(F*3.1)*Math.sin(F*1.7))*ut(20,30,H),Mt.uniforms.uScale.value=w,Zt.visible=H>20;const X=H>30;Kt.visible=X,jt.visible=X,ge.visible=X,me.update(z,F,B,X&&k>.01),re.update(z,F,B,k>.01);for(const U of Jt)U.mesh.visible=X,X&&U.update(z,F,b);if(Zi.value=k*(1-ut(6,30,H)*.8)*(1-I*.6)*.32,pt&&(Lt[0]=k>.01&&H>2&&H<34&&pt.stats(0,fe).center.distanceTo(B.position)<48,Lt[1]=k>.01&&X,pt.update(z,F,Lt,b,k*(1-ut(6,26,H))*(1-I*.7)*.6)),Ve.visible=k>.01,us.uniforms.uScale.value=w,Ve.visible){for(let U=0;U<Ot;U++){const Y=Is[U];if(Y.life<=0)if(!Y.burst&&U<Ot*.75&&X)le(Y);else{Qe[U]=0;continue}Y.life-=z,Y.pos.y+=Y.vel*z,Y.pos.x+=Math.sin(F*2.2+Y.wobble)*.25*z,Y.pos.z+=Math.cos(F*1.9+Y.wobble)*.25*z,Y.pos.y>-.3&&(Y.life=0),bs.set([Y.pos.x,Y.pos.y,Y.pos.z],U*3),Ms[U]=Y.size,Qe[U]=Math.min(1,Y.life*1.5)*(Y.burst?1:.85)}Rs.needsUpdate=!0,Je.needsUpdate=!0,Ds.needsUpdate=!0}},burst:Le,setTheme:z=>{Ke.uTip.value.set(z?"#3f8f5b":"#5fae62"),Ke.uBase.value.set(z?"#163a26":"#1f4a2e")},tap:z=>me.tap(z)||re.tap(z),hover:z=>me.hover(z)||re.hover(z),lampOn:()=>me.lampOn,setCreatures:(z,F)=>re.setList(z,F),showCreature:z=>re.show(z),creatureAt:z=>re.where(z),creatureCount:()=>re.count(),creatureTalking:()=>re.talking(),swarmStats:z=>pt?pt.stats(1,z):Jt[0].stats(z),thinSchool:z=>pt?.thin(z),dispose:()=>{r.forEach(z=>z.dispose()),Jt.forEach(z=>z.dispose()),pt?.dispose(),me.dispose(),re.dispose()}}}const pi="/events/creator-challenge-4/creatures",js={whale:`
    float tail = smoothstep(0.1, -1.0, p.z);
    p.y += sin(uTime * 1.25 + uPhase - p.z * 1.6) * 0.22 * tail * tail;
    p.x += sin(uTime * 0.6 + uPhase) * 0.04 * (1.0 - p.z) * 0.5;`,serpent:`
    float body = smoothstep(1.0, -0.6, p.z);
    p.x += sin(p.z * 4.6 - uTime * 2.1 + uPhase) * 0.5 * body;
    p.y += sin(p.z * 3.2 - uTime * 1.6 + uPhase) * 0.12 * body;`,turtle:`
    float side = abs(p.z);
    float fin = smoothstep(0.42, 0.95, side);
    p.y += sin(uTime * 1.5 + uPhase + sign(p.z) * 0.6 + p.x * 0.8) * 0.55 * fin * (side - 0.42);`};async function Or(l){const[t,s]=await Promise.all([fetch(`${pi}/${l}.bin`).then(m=>{if(!m.ok)throw new Error(`${l}.bin ${m.status}`);return m.arrayBuffer()}),fetch(`${pi}/${l}.jpg`).then(m=>{if(!m.ok)throw new Error(`${l}.jpg ${m.status}`);return m.blob()}).then(m=>createImageBitmap(m,{imageOrientation:"none",premultiplyAlpha:"none",colorSpaceConversion:"none"}))]),e=new DataView(t);if(e.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const o=e.getUint32(4,!0),i=e.getUint32(8,!0),a=new v(e.getFloat32(12,!0),e.getFloat32(16,!0),e.getFloat32(20,!0)),n=m=>m+3&-4;let r=24;const h=new Int16Array(t,r,o*3);r=n(r+o*6);const c=new Int8Array(t,r,o*3);r=n(r+o*3);const u=new Uint16Array(t,r,o*2);r=n(r+o*4);const d=o<65536?new Uint16Array(t,r,i):new Uint32Array(t,r,i),p=new kt;p.setAttribute("position",new $(h,3,!0)),p.setAttribute("normal",new $(c,3,!0)),p.setAttribute("uv",new $(u,2,!0)),p.setIndex(new $(d,1)),p.computeBoundingSphere(),p.boundingSphere&&(p.boundingSphere.radius*=1.6);const f=new Po(s);return f.colorSpace=ro,f.flipY=!1,f.needsUpdate=!0,{geometry:p,extent:a,texture:f}}const Lr=`
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
`,Gr=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Br(l,t,s){const e=new rt;e.name="creatures-island";const o=new rt;o.name="creatures-world",s.islandHost.add(e);const i=[];let a=!1;const n=(d,p,f,m,g,M)=>{const x={value:0},y={value:M},S=qe(l,{vertexColors:!1,rim:.55,rimColor:"#ffd9a8"});S.map=p.texture,S.transparent=!0,S.opacity=0;const T=S.onBeforeCompile;S.onBeforeCompile=(j,Q)=>{T.call(S,j,Q),j.uniforms.uPhase=y,j.uniforms.uTime=l.uTime,j.vertexShader=j.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uPhase;`).replace("#include <begin_vertex>",`#include <begin_vertex>
{ vec3 p = transformed; ${js[d]}
 transformed = p; }`)},S.customProgramCacheKey=()=>`larch-creature-${d}`;const C=new q(p.geometry,S),P=new it({uniforms:{uWidth:t.uWidth,uWidthScale:{value:.85},uResolution:t.uResolution,uTime:l.uTime,uPhase:y,uInk:{value:new W(g)},uOpacity:x,fogColor:{value:new W},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:Lr.replace("DEFORM_BODY",js[d]),fragmentShader:Gr,side:hs,fog:!0,transparent:!0}),_=new q(p.geometry,P),E=Math.max(p.extent.x,p.extent.y,p.extent.z)*2,A=f/E,O=new rt;O.scale.copy(p.extent).multiplyScalar(A),O.add(C,_);const L=new rt;L.name=`creature-${d}`,L.add(O);for(const j of[C,_])j.castShadow=j===C,j.frustumCulled=!0;const D={kind:d,root:L,body:C,outline:_,fade:x,shown:0,update:()=>{}};return(s.prepare?s.prepare(L).catch(()=>{}):Promise.resolve()).then(()=>{a||(m.add(L),i.push(D))}),D},r=(d,p,f,m,g,M)=>{const x={value:0},y=Eo(l,p,{deform:js[d],phase:M,rim:.18});y.transparent=!0,y.opacity=0;const S=new q(p.geometry,y);S.name=`creature-${d}-body`;const T=Mn(l,t,S,{ink:g,width:0,deform:js[d],phase:y.userData.phase,opacity:x});T.visible=!1;const C=Math.max(p.extent.x,p.extent.y,p.extent.z)*2;S.scale.copy(p.extent).multiplyScalar(f/C),S.castShadow=!0,p.geometry.boundingSphere&&(p.geometry.boundingSphere.radius*=1.6);const P=new rt;P.name=`creature-${d}`,P.add(S);const _={kind:d,root:P,body:S,outline:T,fade:x,shown:0,update:()=>{}};return P.userData.halfHeight=p.extent.y*(f/C),(s.prepare?s.prepare(P).catch(()=>{}):Promise.resolve()).then(()=>{a||(m.add(P),i.push(_))}),_},h=new v,c=(d,p)=>{const f=new v,m=new v;d.update=(g,M)=>{p(M,f),p(M+.35,m),d.root.position.copy(f),h.subVectors(m,f),d.root.rotation.set(0,Math.atan2(h.x,h.z),0,"YXZ"),d.root.rotation.x=-Math.atan2(h.y,Math.hypot(h.x,h.z))}};Or("whale").then(d=>{if(a)return;const p=n("whale",d,7.5,o,"#2a2550",0);c(p,(m,g)=>{const M=m*.07+2.2;return g.set(Math.cos(M)*22,7.8+Math.sin(m*.21)*1.2,Math.sin(M)*22-8)});const f=p.update;p.update=(m,g,M)=>{f(m,g,M),p.root.rotation.z=Math.sin(g*.21+.6)*.08-.12}}).catch(d=>console.warn("[islandDive] creature failed","whale",d instanceof Error?d.message:d));{const d=hr();d.root.scale.setScalar(1.2);const p=new rt;p.name="creature-turtle",p.add(d.root);const f=new q;f.visible=!1;const m={kind:"turtle",root:p,body:f,outline:f,fade:{value:0},shown:0,update:()=>{},materials:d.materials,dispose:d.dispose},g=new v,M=new v,x=new v,y=new v;let S=!1;m.update=(C,P,_)=>{_.getWorldDirection(M),x.set(-M.z,0,M.x).normalize(),g.copy(_.position).addScaledVector(M,14).addScaledVector(x,2.6+Math.sin(P*.23)*1),g.y+=-2.6+Math.sin(P*.47)*.7,g.y=Math.max(g.y,ue+2.6),y.copy(p.position),S?p.position.lerp(g,1-Math.exp(-C*.9)):(p.position.copy(g),S=!0),h.subVectors(p.position,y),h.lengthSq()<1e-6&&h.copy(x).multiplyScalar(-1).add(M),p.rotation.set(0,Math.atan2(-h.z,h.x),Math.atan2(h.y,Math.hypot(h.x,h.z))*.6,"YXZ"),d.animate(P)},(s.prepare?s.prepare(p).catch(()=>{}):Promise.resolve()).then(()=>{a||(o.add(p),i.push(m))})}const u=[["serpent",d=>{const p=r("serpent",d,4.4,e,"#14324a",1.3);c(p,(g,M)=>{const x=-g*.085+2.75,y=13.2+Math.sin(g*.17)*.8;return M.set(Math.cos(x)*y,.12+Math.sin(g*.43)*.1,Math.sin(x)*y)});const f=p.update,m=new v;p.update=(g,M,x)=>{f(g,M,x),e.worldToLocal(x.getWorldPosition(m));const y=p.root.position,S=(y.x*m.x+y.z*m.z)/(Math.hypot(y.x,y.z)*Math.hypot(m.x,m.z)+1e-6),T=Math.min(1,Math.max(0,(S-.05)/.5));y.y-=T*T*(3-2*T)*2.6}}]];for(const[d,p]of u)Vi(d).then(f=>{a||p(f)}).catch(f=>{console.warn("[islandDive] creature failed",d,f instanceof Error?f.message:f)});return{island:e,world:o,update(d,p,f){const m=f.position.y;for(const g of i){const M=g.kind==="turtle"?m<-.6:g.kind==="serpent"?m>-12:m>-.35;if(g.root.visible=M,!M)continue;g.shown=Math.min(1,g.shown+d/1.2);const x=g.shown*g.shown*(3-2*g.shown);g.fade.value=x;const y=g.body.material;y.opacity=x,y.transparent=x<1;for(const S of g.materials||[])S.opacity=x,S.transparent=x<1||S.userData.seeThrough===!0;g.outline.material.transparent=x<1,g.update(d,p,f)}},dispose(){a=!0;for(const d of i){if(d.dispose){d.dispose();continue}d.body.geometry.dispose(),d.body.material.map?.dispose(),d.body.material.dispose(),d.outline.material.dispose()}e.removeFromParent(),o.removeFromParent()}}}const mi=["#7fe0a0","#ffa0c4","#8cc8ff","#ffd36b","#c7a8ff"],Ur=["#ffd98a","#ffc2d6","#c9eaa0"],gi=[{kind:"palm",label:["椰子樹","Palm tree"],radius:.55},{kind:"tree",label:["圓圓樹","Round tree"],radius:.75},{kind:"blossom",label:["櫻花樹","Blossom tree"],radius:.75},{kind:"bush",label:["樹叢","Bush"],radius:.5},{kind:"flowers",label:["小花","Flowers"],radius:.32},{kind:"rocks",label:["石頭","Rocks"],radius:.5},{kind:"cottage",label:["小屋","Cottage"],radius:1.25},{kind:"lighthouse",label:["燈塔","Lighthouse"],radius:.6},{kind:"slime",label:["史萊姆","Slime"],radius:.45,looks:mi.length},{kind:"jelly",label:["果凍方塊","Jelly cube"],radius:.5,looks:mi.length},{kind:"pudding",label:["布丁","Pudding"],radius:.45,looks:Ur.length}],jr=32,qr=6,vi={soda:{light:["#6fe0d6","#35a8d0","#3d5fb8"],dark:["#2f8fa8","#1c4f86","#0e1d4c"],label:["蘇打藍","Soda"]},mint:{light:["#8ff0cf","#2bc4a3","#138a86"],dark:["#2f8f86","#146a66","#0b3f4a"],label:["薄荷果凍","Mint jelly"]},grape:{light:["#d2c2ff","#9581ee","#5444b8"],dark:["#5b4aa6","#3a2f86","#211a5a"],label:["葡萄汽水","Grape soda"]},peach:{light:["#ffc9da","#ff92b6","#c9558a"],dark:["#9a4a74","#6f2f58","#43183a"],label:["草莓牛奶","Strawberry milk"]},lagoon:{light:["#8aeaff","#1aa6e6","#0b5fb5"],dark:["#1f6f99","#0f4c7a","#072d55"],label:["湛藍海灣","Lagoon"]}},wi={tint:"soda",swell:1,ripple:1},Hr=.6,yi=[{color:"#ffd98a",deep:"#d9902a",top:"#8a4b22"},{color:"#ffc2d6",deep:"#d4588a",top:"#b03a5c"},{color:"#c9eaa0",deep:"#6fa63a",top:"#3f6b25"}],Xr=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2,Yr=new W("#e6c99a"),$r=new W("#ecd6a8"),Zr=new W("#bfae86"),Kr=new v,Qr=new W;class Jr{island;items=[];history=[];nextId=1;seed=1;mask;vertexX;vertexZ;vertexY;buckets;grassBase=[];strokeProtect=null;strokeTouched=!1;sinceWater=0;cursor;cursorMaterial;onChange=null;constructor(t){this.island=t;const s=t.sculpt,e=s.size;this.mask=new Float32Array(e*e);for(let c=0;c<e;c++)for(let u=0;u<e;u++)this.mask[c*e+u]=si(s.pointX(u),s.pointZ(c));const o=t.kit,i=o.terrain.geometry.getAttribute("position"),a=o.terrainVertices;this.vertexX=new Float32Array(a),this.vertexZ=new Float32Array(a),this.vertexY=new Float32Array(a);const n=e-1,r=Array.from({length:n*n},()=>[]);for(let c=0;c<a;c++){const u=i.getX(c),d=i.getZ(c);if(this.vertexX[c]=u,this.vertexZ[c]=d,this.vertexY[c]=i.getY(c),si(u,d)<=.001)continue;const p=Math.floor((u+s.extent)/s.cell),f=Math.floor((d+s.extent)/s.cell);p<0||f<0||p>=n||f>=n||r[f*n+p].push(c)}this.buckets=r.map(c=>Int32Array.from(c));const h=o.grass;for(let c=0;c<h.count;c++){const u=new Float32Array(16);h.instanceMatrix.array.slice(c*16,c*16+16).forEach((d,p)=>{u[p]=d}),this.grassBase.push({x:u[12],y:u[13],z:u[14]})}this.cursorMaterial=new Zs({color:"#ffffff",transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1,side:Xt}),this.cursor=new q(new ua(.9,1,64,1),this.cursorMaterial),this.cursor.renderOrder=20,this.cursor.visible=!1,this.cursor.name="workshop-cursor",t.top.add(this.cursor)}get canUndo(){return this.history.length>0}get itemCount(){return this.items.length}beginStroke(){this.remember(),this.strokeProtect=[...this.island.kit.protect,...this.items.map(t=>[t.x,t.z,this.specOf(t.kind).radius+.1])],this.strokeTouched=!1,this.sinceWater=0}brush(t,s,e,o,i){const a=this.island.sculpt,n=a.size,r=a.cell,h=a.data,c=this.strokeProtect||this.island.kit.protect,u=Math.max(1,Math.floor((t-o+a.extent)/r)),d=Math.min(n-2,Math.ceil((t+o+a.extent)/r)),p=Math.max(1,Math.floor((s-o+a.extent)/r)),f=Math.min(n-2,Math.ceil((s+o+a.extent)/r));if(u>d||p>f)return!1;const m=e==="raise"?.62:e==="lower"?-.62:0,g=h.slice(),M=e==="smooth"?Math.min(1,i*10):Math.min(1,i*2.2);let x=!1;for(let y=p;y<=f;y++)for(let S=u;S<=d;S++){const T=y*n+S,C=this.mask[T];if(C<=0)continue;const P=a.pointX(S),_=a.pointZ(y),E=Math.hypot(P-t,_-s);if(E>o)continue;let A=1;for(const[Q,st,at]of c){const ct=Math.hypot(P-Q,_-st);ct<at+.5&&(A=Math.min(A,ut(at,at+.5,ct)))}const L=Math.exp(-3.2*(E/o)**2)*(1-(E/o)**6)*C*A;if(L<=.001)continue;const D=h[T],R=(g[T-1]+g[T+1]+g[T-n]+g[T+n]+g[T]*4)/8,j=D+(R-D)*M*L;h[T]=Math.min(Bi,Math.max(Gi,j+m*i*L)),h[T]!==D&&(x=!0)}return x?(a.dirty=!0,this.strokeTouched=!0,this.updateTerrain(a.pointX(u)-r,a.pointZ(p)-r,a.pointX(d)+r,a.pointZ(f)+r),this.sinceWater+=i,this.sinceWater>.22&&(this.sinceWater=0,this.island.refreshWater()),!0):!1}endStroke(){this.strokeTouched||this.history.pop(),this.strokeProtect=null,this.strokeTouched&&(this.strokeTouched=!1,this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater(),this.changed())}updateTerrain(t,s,e,o){const i=this.island.sculpt,a=i.size-1,n=i.cell,r=this.island.kit.terrain.geometry,h=r.getAttribute("position"),c=r.getAttribute("normal"),u=r.getAttribute("color"),d=this.island.ground,p=Math.max(0,Math.floor((t+i.extent)/n)),f=Math.min(a-1,Math.floor((e+i.extent)/n)),m=Math.max(0,Math.floor((s+i.extent)/n)),g=Math.min(a-1,Math.floor((o+i.extent)/n)),M=.05;for(let S=m;S<=g;S++)for(let T=p;T<=f;T++)for(const C of this.buckets[S*a+T]){const P=this.vertexX[C],_=this.vertexZ[C],E=i.sample(P,_),A=this.vertexY[C]+E;h.setY(C,A);const O=-(d(P+M,_)-d(P-M,_))/(2*M),L=-(d(P,_+M)-d(P,_-M))/(2*M),D=Math.hypot(O,1,L);c.setXYZ(C,O/D,1/D,L/D);const R=Qr.copy(qi(Kr.set(P,A,_)));E<-.02&&(R.lerp($r,ut(Ze+.2,Ze+.04,A)),R.lerp(Zr,ut(Ze+.02,Ze-.2,A))),Math.abs(E)>.02&&R.lerp(Yr,ut(.66,.46,1/D)*.75),u.setXYZ(C,R.r,R.g,R.b)}h.needsUpdate=!0,c.needsUpdate=!0,u.needsUpdate=!0;const x=this.island.kit.grass;let y=!1;this.grassBase.forEach((S,T)=>{if(S.x<t-.3||S.x>e+.3||S.z<s-.3||S.z>o+.3)return;const C=x.instanceMatrix.array,P=i.sample(S.x,S.z),_=S.y+P<Ze+.03&&P<-.02;C[T*16+13]=_?-50:S.y+P,y=!0}),y&&(x.instanceMatrix.needsUpdate=!0)}refreshAllTerrain(){const t=this.island.sculpt.extent;this.updateTerrain(-t,-t,t,t),this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater()}specOf(t){return gi.find(s=>s.kind===t)}canPlace(t,s,e,o){const i=this.island;if(i.ground(s,e)<.18||i.pond.depthAt(s,e)>.005)return!1;const n=Math.atan2(e,s);if(Math.hypot(s,e)>i.kit.walkArea.swimReach(n)/1.45*.98)return!1;const r=.12;if(Math.hypot(i.ground(s+r,e)-i.ground(s-r,e),i.ground(s,e+r)-i.ground(s,e-r))/(2*r)>.9)return!1;const c=this.specOf(t).radius;for(const[u,d,p]of i.kit.protect)if(Math.hypot(s-u,e-d)<(p+c)*.72)return!1;for(const u of this.items)if(u!==o&&Math.hypot(s-u.x,e-u.z)<(this.specOf(u.kind).radius+c)*.8)return!1;return!(!o&&this.items.length>=jr||!o&&t==="slime"&&this.items.filter(u=>u.kind==="slime").length>=qr)}place(t,s,e,o,i=Math.random()*Math.PI*2,a=!0){a&&this.remember();const n=this.build({id:`item-${this.nextId++}`,kind:t,x:e,z:o,yaw:i,look:s});return this.items.push(n),n.jelly?n.pop=0:this.island.wobble.pop(n.root),a&&this.changed(),n}beginMove(){this.remember()}moveTo(t,s,e){const o=this.items.find(a=>a.id===t.id);if(!o||!this.canPlace(o.kind,s,e,o))return!1;o.x=s,o.z=e;const i=this.island.ground(s,e);return o.walker?(o.walker.position.set(s,i-.02,e),o.walker.pause()):(o.root.position.x=s,o.root.position.z=e,o.root.position.y=i+(o.root.userData.lift??0),this.island.wobble.setBase(o.root,{x:s,y:i,z:e})),o.shadow&&o.shadow.position.set(s,i+.035,e),!0}endMove(t){if(!t){this.history.pop();return}this.changed()}rotate(t,s){const e=this.items.find(o=>o.id===t.id);e&&(this.remember(),e.yaw+=s,e.root.rotation.y+=s,this.island.wobble.poke(e.root,.5),e.jelly?.poke(),this.changed())}remove(t,s=!0){const e=this.items.findIndex(i=>i.id===t.id);if(e<0)return;s&&this.remember();const[o]=this.items.splice(e,1);this.destroy(o),s&&this.changed()}hitItem(t){let s=null,e=1/0;for(const o of this.items){const i=o.jelly?o.jelly.hit(t):t.intersectObject(o.root,!0)[0];i&&i.distance<e&&(s=o,e=i.distance)}return s}showCursor(t,s=1,e="ok"){if(!t){this.cursor.visible=!1;return}const o=this.cursor.geometry,i=o.getAttribute("position"),a=this.island.ground;for(let r=0;r<i.count;r++){const h=i.getX(r),c=i.getY(r),u=Math.hypot(h,c)||1,d=(u>.95?1:.9)*s,p=t.x+h/u*d,f=t.z+c/u*d;i.setXYZ(r,p,a(p,f)+.06,f)}i.needsUpdate=!0,o.computeBoundingSphere(),this.cursor.position.set(0,0,0),this.cursor.rotation.set(0,0,0);const n={raise:"#9df0c6",lower:"#9fd6ff",smooth:"#fff1c9",ok:"#ffffff",blocked:"#ff7a8a"};this.cursorMaterial.color.set(n[e]),this.cursor.visible=!0}update(t){for(const s of this.items)!s.jelly||s.pop>=1||(s.pop=Math.min(1,s.pop+t/.45),s.jelly.group.scale.setScalar(s.scale*Math.max(.001,Xr(s.pop))),s.pop>=1&&s.jelly.land(3))}snapshotItems(){return this.items.map(({id:t,kind:s,x:e,z:o,yaw:i,look:a})=>({id:t,kind:s,x:Number(e.toFixed(3)),z:Number(o.toFixed(3)),yaw:Number(i.toFixed(3)),look:a}))}load(t){for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.decode(t.sculpt),this.refreshAllTerrain();for(const s of t.items){if(!this.canPlace(s.kind,s.x,s.z))continue;const e=this.build({...s,id:`item-${this.nextId++}`});this.items.push(e)}this.history.length=0}reset(){this.remember();for(const t of[...this.items])this.remove(t,!1);this.island.sculpt.clear(),this.refreshAllTerrain(),this.changed()}undo(){const t=this.history.pop();if(!t)return!1;for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.restore(t.sculpt),this.refreshAllTerrain();for(const s of t.items)this.items.push(this.build(s));return this.onChange?.(),!0}remember(){this.history.push({sculpt:this.island.sculpt.snapshot(),items:this.snapshotItems()}),this.history.length>30&&this.history.shift()}changed(){this.onChange?.()}build(t){const s=this.island,e=s.kit,o=s.top,i=s.ground(t.x,t.z),a={...t,root:new rt,shadow:null,jelly:null,walker:null,owned:[],pop:1,scale:1},n=this.specOf(t.kind),r=(u,d=e.solid)=>{const p=new Hi(()=>0);u(p);const f=p.solid.build(!0);a.owned.push(f);const m=new q(f,d);return m.castShadow=!0,m.receiveShadow=!0,m},h=(u,d=0)=>{u.position.set(t.x,i+d,t.z),u.rotation.y=t.yaw,u.userData.lift=d,u.name=u.name||`workshop-${t.kind}`,o.add(u),s.wobble.add(u,{x:t.x,y:i,z:t.z}),a.root=u},c=(u,d,p,f)=>{const m=e.models[u];if(!m)return!1;const g=e.placeModel(m,{x:t.x,z:t.z,height:d,yaw:t.yaw,sink:p,wind:f,y:i});return g.userData.lift=g.position.y-i,a.root=g,!0};switch(t.kind){case"palm":c("palm",3.2,.12,.04)||h(r(u=>u.palm({x:0,z:0},.9,.8,0)));break;case"tree":case"blossom":h(Ii(t.kind,11+this.seed++%7,e.treeMaterials,t.kind==="tree"?2.6:2.8),-.06);break;case"bush":h(r(u=>u.bush({x:0,z:0},.75)));break;case"flowers":h(r(u=>{const d=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"];for(let p=0;p<4;p++){const f=p*1.7+t.look,m=p?.17:0;u.flower({x:Math.cos(f)*m,z:Math.sin(f)*m},d[(p+Math.round(Math.abs(t.yaw)*3))%d.length])}}));break;case"rocks":c("rocks",.62,.18)||h(r(u=>u.rock({x:0,z:0},.45)));break;case"cottage":c("cottage",2.6,.08)||h(r(u=>u.house({x:0,z:0},0,"#ec6a5c","#8f5a3a")));break;case"lighthouse":h(r(u=>u.lighthouse({x:0,z:0}),e.still));break;case"slime":case"jelly":case"pudding":{const u=t.kind==="pudding"?yi[t.look%yi.length]:No[t.look%No.length],d=new ve(t.kind==="slime"?"slime":t.kind==="jelly"?"cube":"pudding",u,e.env,{face:t.kind==="slime",seed:20+this.seed++,outlines:e.outlines});a.scale=t.kind==="slime"?.52:t.kind==="jelly"?.42:.5,d.group.position.set(t.x,i-.02,t.z),d.group.scale.setScalar(a.scale),d.group.rotation.y=t.yaw,d.group.name=`workshop-${t.kind}`,o.add(d.group),a.jelly=d,a.root=d.group,s.jellies.push(d),a.shadow=e.addShadow(t.x,t.z,.95*a.scale,.3),t.kind==="slime"&&(a.walker=new Ni(d,e.walkArea,s.walkers,a.shadow,s.walkers.length+1),s.walkers.push(a.walker));break}}return a.shadow||(a.shadow=e.addShadow(t.x,t.z,n.radius*1.5,.26)),a.shadow.position.y=i+.035,a}destroy(t){const s=this.island;if(s.wobble.remove(t.root),t.root.removeFromParent(),t.jelly){const e=s.jellies.indexOf(t.jelly);e>=0&&s.jellies.splice(e,1),t.jelly.dispose()}if(t.walker){const e=s.walkers.indexOf(t.walker);e>=0&&s.walkers.splice(e,1)}t.shadow&&(t.shadow.removeFromParent(),t.shadow.geometry.dispose(),t.shadow.material.dispose()),t.owned.forEach(e=>e.dispose())}async thumbnails(t,s,e,o){const a=new Co(128,128,{type:To,format:Oo,samples:4}),n=new Pi;n.environment=s,n.environmentIntensity=.32;const r=new Ao("#fff0d4",2.2);r.position.set(3,6,4),n.add(r,new Ai("#cfeeff","#a5cf7f",1.2),new da("#ffffff",.15));const h=new Lo(30,1,.05,60),c=new Uint16Array(16384*4),u=document.createElement("canvas");u.width=u.height=128;const d=u.getContext("2d"),p={},f=this.island.kit.env,m={sun:f.uSunDir.value.clone(),sunColor:f.uSunColor.value.clone(),sky:f.uSkyColor.value.clone(),ground:f.uGroundColor.value.clone(),night:f.uNight.value};f.uSunDir.value.set(.45,.78,.42).normalize(),f.uSunColor.value.set("#fff1d6"),f.uSkyColor.value.set("#bfe6ff"),f.uGroundColor.value.set("#9cc46e"),f.uNight.value=0;const g=t.getRenderTarget();try{for(const M of gi){if(!e()||!d)break;const x=this.build({id:"thumb",kind:M.kind,x:0,z:0,yaw:.6,look:0}),y=x.root;this.island.wobble.remove(y),y.removeFromParent(),y.position.set(0,x.jelly?0:y.userData.lift??0,0),y.updateMatrixWorld(!0),n.add(y),x.jelly&&(x.jelly.group.scale.setScalar(1),x.jelly.update(.016,0));const S=new v,T=x.jelly?x.jelly.height:Math.max(.6,this.boundsHeight(y));S.set(0,T*.5,0);const C=Math.max(T,M.radius*2.2)*2.25;h.position.set(C*.62,T*.55+C*.42,C*.78),h.lookAt(S),t.setRenderTarget(a),t.setClearColor(0,0),t.clear(),t.render(n,h),t.readRenderTargetPixels(a,0,0,128,128,c);const P=d.createImageData(128,128);for(let _=0;_<128;_++)for(let E=0;E<128;E++){const A=((127-_)*128+E)*4,O=(_*128+E)*4,L=Ie(qo.fromHalfFloat(c[A+3]));for(let D=0;D<3;D++){const R=Math.max(0,qo.fromHalfFloat(c[A+D]))/Math.max(L,1e-4)*1.02,j=R<.76?R:.76+(1-.76)*(1-Math.exp(-(R-.76)/(1-.76))),Q=j<=.0031308?j*12.92:1.055*j**(1/2.4)-.055;P.data[O+D]=Math.round(Ie(Q)*255)}P.data[O+3]=Math.round(L*255)}d.putImageData(P,0,0),p[M.kind]=u.toDataURL("image/png"),n.remove(y),this.island.top.add(y),this.destroy(x),await o()}}finally{t.setRenderTarget(g),a.dispose(),f.uSunDir.value.copy(m.sun),f.uSunColor.value.copy(m.sunColor),f.uSkyColor.value.copy(m.sky),f.uGroundColor.value.copy(m.ground),f.uNight.value=m.night}return p}boundsHeight(t){let s=0;return t.traverse(e=>{const o=e;if(!o.isMesh)return;o.geometry.computeBoundingBox();const i=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);s=Math.max(s,i.max.y)}),s}dispose(){for(const t of[...this.items])this.destroy(t);this.items.length=0,this.cursor.removeFromParent(),this.cursor.geometry.dispose(),this.cursorMaterial.dispose()}}function gl(){try{if((navigator.deviceMemory??8)<2)return!1;const s=document.createElement("canvas").getContext("webgl2");return s?(s.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}let ks=null;function xi(){if(ks!==null)return ks;try{const t=document.createElement("canvas").getContext("webgl2");ks=!!t?.getExtension("EXT_color_buffer_float"),t?.getExtension("WEBGL_lose_context")?.loseContext()}catch{ks=!1}return ks}function tl(){const l=navigator,t=l.deviceMemory??8,s=l.hardwareConcurrency??8,e=window.matchMedia("(pointer: coarse)").matches,o=t<=2||s<=2?"low":e||t<=4||s<=4?"medium":"high";return ka(o)}const Cs={high:{dpr:1.6,antialias:!0,shadow:2048,detail:"high",segments:168,frameMs:0,bloom:!0,swarm:1,school:{width:128,baitBall:10240,reef:1536},ripples:256},medium:{dpr:1.5,antialias:!0,shadow:1024,detail:"low",segments:120,frameMs:0,bloom:!1,swarm:.5,school:{width:64,baitBall:3584,reef:640},ripples:160},low:{dpr:1,antialias:!1,shadow:0,detail:"low",segments:96,frameMs:1e3/32,bloom:!1,swarm:.3,school:null,ripples:0}},el=13,sl=`
uniform float uScale;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 120.0 * uScale / -mvPosition.z;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mvPosition;
}
`,ol=`
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float star = max(1.0 - smoothstep(0.0, 0.06, abs(c.x)) * 1.0, 0.0) * (1.0 - smoothstep(0.0, 0.5, abs(c.y)));
  star = max(star, (1.0 - smoothstep(0.0, 0.06, abs(c.y))) * (1.0 - smoothstep(0.0, 0.5, abs(c.x))));
  float glow = 1.0 - smoothstep(0.0, 0.5, length(c));
  float a = (star * 0.9 + glow * glow * 0.6) * vAlpha;
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.45), a);
}
`,ko=l=>l*l*(3-2*l),il=new v(Math.sin(oo)*18.5,-.7,Math.cos(oo)*18.5),al=new v(0,-2.2,0),je=l=>Math.min(1,Math.max(0,l));async function nl(l){const t={},s=Promise.allSettled(za.map(e=>Fi(e).then(o=>{t[e]=Wi(e,o)})));return await Promise.race([s,new Promise(e=>window.setTimeout(e,l))]),{...t}}const rs=()=>new Promise(l=>{const t=globalThis.scheduler;t?.yield?t.yield().then(l):window.setTimeout(l,0)});class vl{options;renderer;scene=new Pi;camera=new Lo(36,1,.1,900);env=Aa();hemi=new Ai("#cfeeff","#a5cf7f",1.2);sun=new Ao("#fff0d4",2.2);fill=new Ao("#ff9f86",.6);fog=new fa("#d3effa",.0055);depthLight={value:new W("#bff3ff")};outlines=tn();post=null;environment=null;creatures=null;island;ocean=null;oceanPending=!1;seaCreatures=[];sky;sparkles;booted=!1;sparkleState=[];raycaster=new pa;pointer=new xt;tier;theme;night=0;nightTarget=0;frame=0;frameCount=0;frameTimes=0;lastTime=0;lastRender=0;elapsed=0;running=!1;destroyed=!1;pixelRatio=1;width=1;height=1;camPos=new v(0,12,26);camTarget=new v(0,1.3,0);posed=!1;yaw=-.18;yawVel=0;idleFor=0;bladeVel=.8;ballSpin=new v;drag=null;sword=null;played=!1;hoverQueued=null;handAt=null;handDown=!1;touched=!1;slowFrames=0;sampledFrames=0;downgraded=0;dprSteps=0;lastCalls=0;thinned=!1;resizeObserver=null;cleanups=[];scrollY=0;heroHeight=1;scrollRange=1;depth=0;framingKey="";scratchVectors=Array.from({length:6},()=>new v);scratchColors=[new W,new W];below={fog:new W,glow:new W,abyss:new W,density:0,hemi:0,light:new W};worldPos=new v;spinQuat=new be;spinAxis=new v;scare={origin:new v,dir:new v,strength:0};scareAt=-10;swarmProbe=new v;slot=null;swell={height:0,slopeX:0,slopeZ:0};ripplePoint=new v;lastRipple={t:-10,at:new v};ripples;hoverWater=null;spin={omega:0,alpha:0,lastYaw:-.18};ambientRipple=0;slimeTrails=new Map;workshop=null;editing=!1;tool={kind:"raise",size:1.1};selectedId=null;water={...wi};designTimer=0;constructor(t){this.options=t,this.theme=t.theme,this.night=this.nightTarget=t.theme==="dark"?1:0,this.tier=t.tier||tl();const s=Cs[this.tier],e=s.bloom&&xi();if(this.renderer=new ma({canvas:t.canvas,antialias:s.antialias&&!e,alpha:!1,powerPreference:this.tier==="high"?"high-performance":"default",stencil:!1}),this.renderer.toneMapping=ga,this.renderer.info.autoReset=!1,this.renderer.toneMappingExposure=1.02,this.renderer.localClippingEnabled=!0,s.shadow){this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=va,this.sun.castShadow=!0,this.sun.shadow.mapSize.set(s.shadow,s.shadow);const o=this.sun.shadow.camera;o.left=-10,o.right=10,o.top=10,o.bottom=-10,o.near=1,o.far=60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=6}this.ripples=s.ripples&&Sa(this.renderer)?new Ma(this.renderer,{size:s.ripples,extent:el,speed:2.2,damping:.988}):null,this.ripples&&(this.ripples.uniforms.uRippleAmp.value=3),this.scene.fog=this.fog,this.scene.background=new W("#d3effa"),this.scene.add(this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.boot(e)}async boot(t){const s=this.options,e=Cs[this.tier],o=(p,f)=>{this.destroyed||s.onProgress?.(p,f)};if(o(.08,"sky"),await rs(),this.destroyed||(this.sky=cn(this.env,e.detail),await rs(),this.destroyed))return;o(.16,"light");const i=new wa(this.renderer);if(this.environment=i.fromScene(new ya,.04).texture,i.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=.32,await rs(),this.destroyed)return;o(.24,"models");const a=await nl(7e3);if(this.destroyed)return;if(o(.5,"island"),this.island=await Un(this.env,{segments:e.segments,detail:e.detail,outlines:this.outlines,models:a,ripples:this.ripples,vertexRipples:this.renderer.capabilities.maxVertexTextures>0},rs),this.destroyed){this.island.dispose();return}this.workshop=new Jr(this.island),this.workshop.onChange=()=>this.workshopChanged();const n=s.design;n&&(this.workshop.load(n),this.water={...n.water},ve.softness=n.soft,this.applyWater()),o(.72,"island"),this.sword=new er(this.island,this.scene,this.camera,p=>{this.options.onSword?.(p),p||this.options.root.querySelectorAll("[data-island-surface]").forEach(f=>{f.style.cursor===Mo&&(f.style.cursor="")})}),this.sword.propTargets=()=>{const p=this.island;return[...p.top.children.filter(f=>f.name.startsWith("model-")),p.blades,p.boat,p.ball,p.bottle,p.pier,...this.creatures?[...this.creatures.island.children,...this.creatures.world.children]:[]]},this.island.onSlimeSplash((p,f)=>{const m=this.island.top.localToWorld(p.clone());this.island.ripple(m.x,m.z,1.4+Math.min(1.2,f*.08)),window.setTimeout(()=>{this.destroyed||this.island.ripple(m.x+.15,m.z-.1,.9)},160),this.markPlayed()});for(const p of Object.values(a))for(const f of[p.map,p.normalMap])if(f&&(this.renderer.initTexture(f),await rs(),this.destroyed))return;this.scene.add(this.sky.group,this.island.group,this.island.seaSparkles),this.island.group.rotation.y=this.yaw;const r=18,h=new kt;h.setAttribute("position",new $(new Float32Array(r*3),3)),h.setAttribute("aAlpha",new $(new Float32Array(r),1)),this.sparkles=new ke(h,new it({uniforms:{uScale:{value:1}},vertexShader:sl,fragmentShader:ol,transparent:!0,depthWrite:!1,blending:oe})),this.sparkles.frustumCulled=!1,this.sparkles.renderOrder=10;for(let p=0;p<r;p++)this.sparkleState.push({pos:new v,vel:new v,life:0});if(this.island.top.add(this.sparkles),this.applyTheme(!0),t)try{this.post=new Pa(this.renderer,{rays:!0})}catch{this.post=null}s.canvas.dataset.tier=this.tier,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(s.canvas),s.islandSlot&&this.resizeObserver.observe(s.islandSlot),this.resize(),this.readScroll();const c=()=>this.readScroll();s.scroller.addEventListener("scroll",c,{passive:!0}),this.cleanups.push(()=>s.scroller.removeEventListener("scroll",c));const u=()=>{document.hidden?this.stop():this.start()};document.addEventListener("visibilitychange",u),this.cleanups.push(()=>document.removeEventListener("visibilitychange",u));const d=p=>{p.preventDefault(),this.stop(),s.onFallback?.("context-lost")};s.canvas.addEventListener("webglcontextlost",d),this.cleanups.push(()=>s.canvas.removeEventListener("webglcontextlost",d)),this.bindPointer(),await rs(),!this.destroyed&&(o(.86,"shaders"),this.post?await this.post.compileAsync(this.scene,this.camera,()=>!this.destroyed):await Xs(this.renderer,this.scene,this.camera,()=>!this.destroyed),!this.destroyed&&(this.booted=!0,this.start()))}ensureOcean(t=!1){if(this.destroyed)return;if(this.ocean){t&&!this.ocean.group.parent&&this.scene.add(this.ocean.group);return}const s=Cs[this.tier],e=s.school&&xi()&&this.renderer.capabilities.maxVertexTextures>0?{renderer:this.renderer,...s.school}:null,o=Vr(this.env,this.depthLight,s.detail,s.swarm,e);if(this.ocean=o,o.setTheme(this.theme==="dark"),o.setCreatures(this.seaCreatures,this.creatureCap()),this.thinned&&o.thinSchool(.5),t){this.scene.add(o.group);return}Xs(this.renderer,o.group,this.camera,()=>!this.destroyed,this.scene).then(()=>{!this.destroyed&&!o.group.parent&&this.scene.add(o.group)})}setCreatures(t){this.seaCreatures=t,this.ocean?.setCreatures(t,this.creatureCap())}setBottleHidden(t){this.island&&(this.island.bottle.visible=!t)}bottleScreen(){if(!this.island)return null;const t=this.options.canvas.getBoundingClientRect(),s=this.island.bottle.getWorldPosition(new v).project(this.camera);return{x:Math.round(t.left+(s.x+1)/2*t.width),y:Math.round(t.top+(1-s.y)/2*t.height)}}showCreature(t){return this.ocean?.showCreature(t)??!1}creatureScreen(t){const s=this.ocean?.creatureAt(t);if(!s)return null;const e=this.options.canvas.getBoundingClientRect();return s.project(this.camera),s.z>1||Math.abs(s.x)>1||Math.abs(s.y)>1?null:[Math.round(e.left+(s.x+1)/2*e.width),Math.round(e.top+(1-s.y)/2*e.height)]}creatureCap(){const t=typeof window<"u"&&window.matchMedia("(pointer: coarse)").matches;return this.tier==="high"&&!t?40:18}setTheme(t){if(this.theme=t,this.nightTarget=t==="dark"?1:0,!this.island){this.night=this.nightTarget;return}this.applyTheme(!1)}setEditing(t){if(this.editing!==t){if(this.editing=t,this.idleFor=0,this.yawVel=0,this.workshop?.showCursor(null),this.island)for(const s of this.island.gulls)s.visible=!t;t&&this.sword?.armed&&(this.island&&(this.island.chest.open=!1),this.sword.putBack()),t||this.select(null),this.framingKey=""}}setTool(t){this.tool=t,this.workshop?.showCursor(null)}nudgeYaw(t){this.yawVel+=t*2.2,this.idleFor=0}rotateSelected(t){const s=this.selectedItem();s&&this.workshop&&this.workshop.rotate(s,t)}removeSelected(){const t=this.selectedItem();!t||!this.workshop||(this.workshop.remove(t),this.select(null))}undo(){this.workshop?.undo()&&(this.selectedId&&!this.workshop.items.some(t=>t.id===this.selectedId)?this.select(null):this.workshopChanged())}resetDesign(){this.workshop&&(this.select(null),this.workshop.reset(),this.water={...wi},ve.softness=Hr,this.applyWater(),this.workshopChanged())}setWater(t){this.water={...this.water,...t},this.applyWater(),this.workshopChanged()}setSoftness(t){if(ve.softness=Math.min(1,Math.max(0,t)),this.island){for(const s of this.island.jellies)s.poke();this.island.wobble.nudgeAround(0,0,9,.6)}this.workshopChanged()}async thumbnails(){return this.workshop?this.workshop.thumbnails(this.renderer,this.environment,()=>!this.destroyed,rs):{}}design(){return!this.workshop||!this.island?null:{v:1,sculpt:this.island.sculpt.encode(),items:this.workshop.snapshotItems(),water:{...this.water},soft:Number(ve.softness.toFixed(2))}}selectedItem(){return this.selectedId?this.workshop?.items.find(t=>t.id===this.selectedId)??null:null}select(t){this.selectedId=t?.id??null,this.workshopChanged(!1)}workshopChanged(t=!0,s=!1){const e=this.workshop;if(!e)return;const o=this.selectedItem();this.options.onWorkshop?.({selected:o?{id:o.id,kind:o.kind}:null,canUndo:e.canUndo,items:e.itemCount,blocked:s}),t&&(window.clearTimeout(this.designTimer),this.designTimer=window.setTimeout(()=>{const i=this.design();i&&!this.destroyed&&this.options.onWorkshop?.({selected:this.selectedItem()?{id:this.selectedId,kind:this.selectedItem().kind}:null,canUndo:e.canUndo,items:e.itemCount,design:i})},450))}applyWater(){this.island&&(this.island.seaUniforms.uSwellScale.value=this.water.swell,this.ripples&&(this.ripples.strength=this.water.ripple),this.applyTheme(!1))}destroy(){this.destroyed||(this.destroyed=!0,this.stop(),this.resizeObserver?.disconnect(),this.cleanups.forEach(t=>t()),this.sword?.dispose(),this.workshop?.dispose(),this.ripples?.dispose(),window.clearTimeout(this.designTimer),this.island&&(this.island.jellies.forEach(t=>t.dispose()),this.island.dispose()),this.ocean?.dispose(),this.creatures?.dispose(),this.sky?.dispose(),this.sparkles&&(this.sparkles.geometry.dispose(),this.sparkles.material.dispose()),this.post?.dispose(),this.environment?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss())}start(){if(!this.booted||this.running||this.destroyed||document.hidden)return;this.running=!0,this.lastTime=performance.now();const t=s=>{if(!this.running)return;this.frame=requestAnimationFrame(t);const e=Cs[this.tier].frameMs;if(e&&s-this.lastRender<e-1)return;const o=Math.min(.05,Math.max(.001,(s-this.lastTime)/1e3));this.lastTime=s,this.lastRender=s,this.tick(o),this.watchSpeed(o)};this.frame=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.frame)}watchSpeed(t){document.hidden||this.options.adaptive===!1||(this.sampledFrames++,!(this.sampledFrames<30)&&(t>.045?this.slowFrames++:this.slowFrames=Math.max(0,this.slowFrames-.25),!(this.slowFrames<24)&&(this.slowFrames=0,this.downgraded++,this.downgraded===1&&Xo(this.tier,this.tier==="high"?"medium":"low"),this.post?(this.post.dispose(),this.post=null):this.thinned?this.dprSteps<2?(this.dprSteps++,this.pixelRatio=Math.max(.7,this.pixelRatio*.78),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.outlines.uResolution.value.set(this.width*this.pixelRatio,this.height*this.pixelRatio),this.outlines.uWidth.value=(this.width<700?1.25:1.6)*this.pixelRatio):this.renderer.shadowMap.enabled?(this.renderer.shadowMap.enabled=!1,this.sun.castShadow=!1):(this.stop(),Xo(this.tier,"static"),this.options.onFallback?.("slow")):(this.thinned=!0,this.ocean?.thinSchool(.5)))))}resize(){const t=this.options.canvas,s=Math.max(1,t.clientWidth),e=Math.max(1,t.clientHeight);this.width=s,this.height=e,this.downgraded||(this.pixelRatio=Math.min(window.devicePixelRatio||1,Cs[this.tier].dpr)),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(s,e,!1),this.post?.setSize(s,e,this.pixelRatio),this.outlines.uResolution.value.set(s*this.pixelRatio,e*this.pixelRatio),this.outlines.uWidth.value=(s<700?1.25:1.6)*this.pixelRatio,this.framingKey="",this.measureSlot(),this.readScroll()}measureSlot(){const t=this.options.islandSlot;if(!t){this.slot=null;return}const s=t.getBoundingClientRect(),e=this.options.canvas.getBoundingClientRect(),o=this.options.root.getBoundingClientRect();if(s.width<10||s.height<10){this.slot=null;return}this.slot={cx:s.left-e.left+s.width/2,cy:s.top-o.top+s.height/2,w:s.width,h:s.height},this.framingKey=""}heroFraming(){const t=this.width,s=this.height,e=t/s,o=e<.8?46:e<1.2?40:34,i=this.slot||{cx:t/2,cy:s*.62,w:t*.9,h:s*.6},a=Math.max(70,Math.min(i.w*.78,i.h*.98)),n=Math.min(90,Math.max(16,10*(s/2)/(a*Math.tan(o*Math.PI/360))));return{fov:o,px:i.cx,py:i.cy,radius:n,elevation:Ho(t,s)==="wide"?.27:.46}}applyFraming(t){const s=this.width,e=this.height,o=this.heroFraming(),i=s/2+(o.px-s/2)*t,a=e/2+(o.py-e/2)*t,n=`${s}x${e}:${i.toFixed(1)}:${a.toFixed(1)}:${o.fov}`;if(n===this.framingKey)return;this.framingKey=n;const r=i>=s/2?2*i:2*(s-i),h=i>=s/2?0:r-s,c=a>=e/2?2*a:2*(e-a),u=a>=e/2?0:c-e,d=Math.tan(o.fov*Math.PI/360);this.camera.fov=Math.atan(d*(c/e))*360/Math.PI,this.camera.aspect=r/c,Math.abs(r-s)>.5||Math.abs(c-e)>.5?this.camera.setViewOffset(r,c,h,u,s,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}readScroll(){const{scroller:t,root:s,hero:e}=this.options,o=s.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;this.scrollY=Math.max(0,t.scrollTop-o),this.heroHeight=Math.max(1,e.offsetHeight),this.scrollRange=Math.max(this.heroHeight+1,s.scrollHeight-t.clientHeight)}heroPose(t,s){let{radius:e,elevation:o}=this.heroFraming();this.editing&&(o=Math.max(o,.46)+.14,e*=Ho(this.width,this.height)==="wide"?1.02:1.1),t.set(0,Math.sin(o)*e+1,Math.cos(o)*e),s.set(0,1,0)}desiredPose(t,s){if(this.editing)return this.heroPose(t,s),{a:0,d:0};const e=this.heroHeight*.9,o=je(this.scrollY/e),i=je((this.scrollY-e)/Math.max(1,this.scrollRange-e)),[a,n,r,h]=this.scratchVectors;this.heroPose(a,n);const c=ko(o);if(t.lerpVectors(a,il,c),s.lerpVectors(n,al,c),i>0){He(i,r,h);const u=ko(je(i/.12));t.lerp(r,u),s.lerp(h,u)}return{a:o,d:i}}tick(t){this.renderer.info.reset(),this.elapsed+=t;const s=this.elapsed;this.env.uTime.value=s,Math.abs(this.night-this.nightTarget)>.001&&(this.night+=(this.nightTarget-this.night)*(1-Math.exp(-t*4)),this.applyTheme(!1));const e=this.scratchVectors[4],o=this.scratchVectors[5],{a:i,d:a}=this.desiredPose(e,o);this.applyFraming(1-ko(je(i*1.15))),this.posed||(this.camPos.copy(e),this.camTarget.copy(o),this.posed=!0);const n=1-Math.exp(-t*6.5);this.camPos.lerp(e,n),this.camTarget.lerp(o,n),this.camera.position.copy(this.camPos);const r=this.camPos.distanceTo(this.camTarget)*.0016;this.camera.position.x+=Math.sin(s*.37)*r,this.camera.position.y+=Math.sin(s*.53+1.3)*r*.7,this.camera.lookAt(this.camTarget);const h=this.camera.position.y,c=je((.25-h)/.6);this.depth=Math.max(0,-h),this.env.uUnder.value=c,this.env.uDepth.value=this.depth,this.env.uGlow.value=je((this.depth-14)/26)*(.55+this.night*.45),this.applyDepth(c),this.idleFor+=t,(!this.drag||this.drag.kind!=="turn")&&(this.yawVel*=Math.exp(-t*2.4),this.idleFor>5&&i<.4&&!this.editing&&(this.yawVel+=(.045-this.yawVel)*(1-Math.exp(-t*.6))),this.yaw+=this.yawVel*t),this.island.group.rotation.y=this.yaw;const u=(this.yaw-this.spin.lastYaw)/t;this.spin.lastYaw=this.yaw;const d=this.spin.omega+(u-this.spin.omega)*(1-Math.exp(-t*18));this.spin.alpha=Math.max(-60,Math.min(60,(d-this.spin.omega)/t)),this.spin.omega=d;const p=h>-.35;this.island.top.visible=p,this.island.boat.visible=p,this.island.sea.visible=h>-30,this.island.seaSparkles.visible=h>.05,this.island.seaSparkleUniforms.uScale.value=this.pixelRatio*Math.min(1.4,this.height/800),this.island.column.visible=h<4,this.sky.group.visible=c<.999,this.renderer.shadowMap.autoUpdate=h>-2,p&&this.updateIsland(t,s),this.ripples&&this.island.sea.visible&&(p&&this.ambientRipples(t,s),this.ripples.step(t)),this.scare.strength=je(1-(s-this.scareAt)/.9),!this.ocean&&(this.depth>0||this.scrollY>this.heroHeight*.35)&&this.ensureOcean(!0),this.ocean?.update(t,s,this.camera,this.depth,this.pixelRatio*this.height/800,this.scare.strength>0?this.scare:null),this.sky.clouds.rotation.y=s*.006,this.creatures?.update(t,s,this.camera);const f=this.options.canvas;if(this.frameCount++,this.frameTimes+=t,this.frameCount%60===0&&(f.dataset.ms=(this.frameTimes/60*1e3).toFixed(1),f.dataset.calls=String(this.lastCalls),this.frameTimes=0),this.frameCount%30===2&&p&&(f.dataset.targets=JSON.stringify(this.screenTargets())),this.frameCount%10===1&&this.depth>30){const m=this.ocean?.swarmStats(this.swarmProbe)??{spread:0},g=f.getBoundingClientRect(),M=this.swarmProbe.clone().project(this.camera);f.dataset.swarm=JSON.stringify({x:Math.round(g.left+(M.x+1)/2*g.width),y:Math.round(g.top+(1-M.y)/2*g.height),spread:Number(m.spread.toFixed(2))})}if(this.frameCount%10===1){f.dataset.depth=this.depth.toFixed(1),f.dataset.scare=this.scare.strength.toFixed(2),f.dataset.dive=a.toFixed(3),f.dataset.hero=i.toFixed(3);const m=this.options.depthLabel;if(m?.parentElement?.classList.toggle("is-visible",this.depth>.4),m&&this.options.depthText){const g=this.options.depthText(Math.round(this.depth*18));m.textContent!==g&&(m.textContent=g)}}if(this.post?(this.post.bloom.strength=.3+this.env.uGlow.value*.45+this.night*.12,this.post.rays=this.post.setLight(this.env.uSunDir.value,this.camera)*(1-this.env.uUnder.value)*(.5+this.night*.4),this.post.render(this.scene,this.camera,1)):this.renderer.render(this.scene,this.camera),this.lastCalls=this.renderer.info.render.calls,!f.dataset.ready){if(f.dataset.ready="1",this.options.onReady?.(),!this.oceanPending){this.oceanPending=!0;const m=window.requestIdleCallback;m?m(()=>this.ensureOcean(),{timeout:2500}):window.setTimeout(()=>this.ensureOcean(),900)}this.creatures=Br(this.env,this.outlines,{islandHost:this.island.group,prepare:m=>Xs(this.renderer,m,this.camera,()=>!this.destroyed,this.scene)}),this.scene.add(this.creatures.world)}if(this.hoverQueued){const{x:m,y:g,target:M}=this.hoverQueued;this.hoverQueued=null,this.updateHover(m,g,M)}}ambientRipples(t,s){const e=this.island;if(this.ambientRipple+=t,this.ambientRipple>1.1){this.ambientRipple=0;const o=e.boat.position,i=e.bottle.position;e.rippleLocal(o.x+Math.sin(s)*.55,o.z+Math.cos(s)*.55,.22),e.rippleLocal(i.x,i.z,.18)}for(const o of e.walkers){if(!o.swimming){this.slimeTrails.delete(o);continue}const i=o.position,a=this.slimeTrails.get(o);a&&Math.hypot(i.x-a.x,i.z-a.z)>.04?(e.ripples?.trail(a.x,a.z,i.x,i.z,-.025,.22),a.x=i.x,a.z=i.z):a||this.slimeTrails.set(o,{x:i.x,z:i.z})}}updateIsland(t,s){const e=this.island,o=this.worldPos;for(const f of e.jellies)f.update(t,s);e.wobble.update(t,this.spin),this.workshop?.update(t),this.drag?.kind==="sculpt"&&this.drag.at&&this.workshop&&this.tool.kind!=="place"&&this.tool.kind!=="move"&&(this.workshop.brush(this.drag.at.x,this.drag.at.z,this.tool.kind,this.tool.size,t),Math.random()<t*6&&e.wobble.nudgeAround(this.drag.at.x,this.drag.at.z,this.tool.size*2.2,this.tool.kind==="lower"?-.25:.25));const i=e.top.worldToLocal(o.copy(this.camera.position));for(const f of e.walkers)f.update(t,i);if(this.sword&&(this.sword.viewHeight=this.height,this.sword.setHand(...this.handPose()),this.sword.update(t,s)),(!this.drag||this.drag.kind!=="blades")&&(this.bladeVel+=(.7-this.bladeVel)*(1-Math.exp(-t*.5)),e.blades.rotation.z-=this.bladeVel*t),this.ballSpin.lengthSq()>1e-6){const f=this.ballSpin.length()*t,m=this.spinQuat.setFromAxisAngle(this.spinAxis.copy(this.ballSpin).normalize(),f);e.ball.quaternion.premultiply(m),this.ballSpin.multiplyScalar(Math.exp(-t*.9))}const a=e.chest,n=a.open?-1.95:0;a.velocity+=((n-a.angle)*70-a.velocity*9)*t,a.angle+=a.velocity*t,a.lid.rotation.x=a.angle,e.animate(t,s);const r=e.boat;r.getWorldPosition(o);const h=gn(o.x,o.z,s,.72*this.water.swell,this.swell);if(r.position.y=.31+h.height+Math.sin(s*1.3)*.015,r.rotation.z=-h.slopeX*.55+Math.sin(s*1.1)*.025,r.rotation.x=h.slopeZ*.55+Math.sin(s*.9+1)*.02,this.env.uNight.value>.02){const f=e.fireflies.geometry.getAttribute("position"),m=e.fireflies.userData.base;for(let g=0;g<f.count;g++)f.setXYZ(g,m[g*3]+Math.sin(s*.6+g)*.5,m[g*3+1]+Math.sin(s*.9+g*1.7)*.3,m[g*3+2]+Math.cos(s*.5+g*.7)*.5);f.needsUpdate=!0}const u=this.sparkles.geometry.getAttribute("position"),d=this.sparkles.geometry.getAttribute("aAlpha");let p=!1;this.sparkleState.forEach((f,m)=>{if(f.life<=0){d.setX(m,0);return}p=!0,f.life-=t,f.vel.y-=1.4*t,f.pos.addScaledVector(f.vel,t),u.setXYZ(m,f.pos.x,f.pos.y,f.pos.z),d.setX(m,Math.min(1,f.life*1.6))}),p&&(u.needsUpdate=!0,d.needsUpdate=!0),this.sparkles.material.uniforms.uScale.value=this.pixelRatio*this.height/800,e.top.children.forEach(f=>{const m=f.material;m?.uniforms?.uScale&&f!==this.sparkles&&(m.uniforms.uScale.value=this.pixelRatio*this.height/800)})}applyTheme(t){t&&(this.night=this.nightTarget);const s=this.night,e=(h,c)=>new W(h).lerp(new W(c),s),o=Vs.light,i=Vs.dark;this.sky.uniforms.uTop.value.copy(e(o.skyTop,i.skyTop)),this.sky.uniforms.uHorizon.value.copy(e(o.skyHorizon,i.skyHorizon)),this.sky.uniforms.uHaze.value.copy(e(o.haze,i.haze)),this.env.uSunDir.value.copy(o.sunDir).lerp(i.sunDir,s).normalize(),this.env.uNight.value=s;const a=this.island.seaUniforms,n=vi[this.water.tint]||vi.soda;a.uShallow.value.copy(e(n.light[0],n.dark[0])),a.uMid.value.copy(e(n.light[1],n.dark[1])),a.uDeep.value.copy(e(n.light[2],n.dark[2])),a.uFoam.value.copy(e(o.foam,i.foam)),a.uSand.value.copy(e(o.sand,i.sand));const r=this.sky.cloudUniforms;r.uLit.value.copy(e(o.cloudLit,i.cloudLit)),r.uMid.value.copy(e(o.cloudMid,i.cloudMid)),r.uShade.value.copy(e(o.cloudShade,i.cloudShade)),this.sky.starUniforms.uOpacity.value=s,this.island.halos.material.uniforms.uOpacity.value=s*.9,this.island.fireflies.material.uniforms.uOpacity.value=s,this.ocean?.setTheme(this.theme==="dark"),this.sky.clouds.visible=!0,_o.strength.value=.42*(1-s*.72)}applyDepth(t){const s=this.night,e=Vs.light,o=Vs.dark,i=Fa(this.theme,this.depth,this.below),[a,n]=this.scratchColors;this.fog.color.copy(a.set(e.fog).lerp(n.set(o.fog),s)).lerp(i.fog,t),this.env.uWaterGlow.value.copy(i.glow),this.env.uWaterFog.value.copy(i.fog),this.env.uWaterAbyss.value.copy(i.abyss),this.fog.density=(e.fogDensity+(o.fogDensity-e.fogDensity)*s)*(1-t)+i.density*t,this.scene.background.copy(this.fog.color);const r=this.hemi.color.copy(a.set(e.hemiSky).lerp(n.set(o.hemiSky),s)).lerp(i.light,t),h=this.hemi.groundColor.copy(a.set(e.hemiGround).lerp(n.set(o.hemiGround),s)).lerp(i.fog,t),c=(e.hemiIntensity+(o.hemiIntensity-e.hemiIntensity)*s)*(1-t)+i.hemi*t;this.hemi.intensity=c;const u=(e.sunIntensity+(o.sunIntensity-e.sunIntensity)*s)*(1-t*je(.35+this.depth/24));this.sun.intensity=u,this.sun.color.copy(a.set(e.sunColor).lerp(n.set(o.sunColor),s)).lerp(i.light,t),this.sun.position.copy(this.env.uSunDir.value).multiplyScalar(30),this.sun.target.position.set(0,0,0),this.fill.intensity=(e.fillIntensity+(o.fillIntensity-e.fillIntensity)*s)*(1-t),this.fill.color.copy(a.set(e.fillColor).lerp(n.set(o.fillColor),s)),this.fill.position.copy(e.fillDir).multiplyScalar(30),this.env.uSunColor.value.copy(this.sun.color).multiplyScalar(u/2.2),this.env.uSkyColor.value.copy(r).multiplyScalar(c),this.env.uGroundColor.value.copy(h).multiplyScalar(c),this.depthLight.value.copy(i.light).multiplyScalar(.55+.45*(1-t*.6)),t<.5&&this.depthLight.value.copy(this.sun.color).multiplyScalar(u/2.2)}isSurface(t){return t instanceof HTMLElement&&t.closest("[data-island-surface]")===t?t:null}setPointer(t,s){const e=this.options.canvas.getBoundingClientRect();this.pointer.set((t-e.left)/e.width*2-1,-((s-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}hitAt(t,s){if(this.camera.position.y<-.4||!this.island.top.visible)return null;this.setPointer(t,s);const e=this.island.hitInteractive(this.raycaster);return e?.kind==="bottle"&&!this.options.onBottle?null:e}markPlayed(){this.played||(this.played=!0,this.options.onPlayed?.())}bindPointer(){const{root:t}=this.options,s=n=>{if(n.touches.length!==1||!this.isSurface(n.target))return;if(this.editing){n.preventDefault();return}const h=n.touches[0],c=this.hitAt(h.clientX,h.clientY);(c&&c.kind!=="chest"&&c.kind!=="bottle"||!c&&this.sword?.armed&&this.slashable()&&this.island.hitLand(this.raycaster))&&n.preventDefault()};t.addEventListener("touchstart",s,{passive:!1}),this.cleanups.push(()=>t.removeEventListener("touchstart",s));const e=n=>{if(n.button!==0||this.drag)return;this.touched=n.pointerType!=="mouse";const r=this.isSurface(n.target);if(!r)return;const h=new xt(n.clientX,n.clientY),c={pointerId:n.pointerId,moved:0,start:h,surface:r};if(this.idleFor=0,this.editing){if(!this.editDown(n,c))return;try{r.setPointerCapture(n.pointerId)}catch{}return}const u=this.hitAt(n.clientX,n.clientY);if(this.sword?.armed&&u?.kind!=="chest"&&u?.kind!=="bottle"&&this.slashable()){this.drag={kind:"slash",last:h.clone(),...c},this.handAt={x:n.clientX,y:n.clientY},this.handDown=!0;const d=this.pointer.clone();this.sword.strokeBegin(d),this.sword.strokeSample(this.raycaster,d)}else if(u?.kind==="jelly"){const d=this.camera.getWorldDirection(new v).negate(),p=new Ks().setFromNormalAndCoplanarPoint(d,u.point);u.jelly.grab(u.jelly.front.worldToLocal(u.point.clone())),this.walkerOf(u.jelly)?.pause(),this.drag={kind:"jelly",jelly:u.jelly,plane:p,...c}}else if(u?.kind==="blades"){const d=this.island.bladeHub.clone();this.island.top.localToWorld(d),d.project(this.camera);const p=this.options.canvas.getBoundingClientRect(),f=new xt(p.left+(d.x+1)/2*p.width,p.top+(1-d.y)/2*p.height);this.drag={kind:"blades",hub:f,angle:Math.atan2(n.clientY-f.y,n.clientX-f.x),...c},this.bladeVel=0}else if(u?.kind==="ball")this.drag={kind:"ball",last:h.clone(),...c};else if(u?.kind==="chest"||u?.kind==="bottle")this.drag={kind:u.kind,...c};else if(this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6&&(this.island.hitLand(this.raycaster)||this.sword?.armed))this.drag={kind:"turn",last:h.clone(),...c},this.yawVel=0,this.lastRipple.t=-10,this.touchWater(n.clientX,n.clientY,1);else if(this.camera.position.y<=-.4)this.scareFish(n.clientX,n.clientY),this.drag={kind:"water",...c};else{this.touchWater(n.clientX,n.clientY,1.15,!0);return}try{r.setPointerCapture(n.pointerId)}catch{}this.drag.kind!=="chest"&&this.drag.kind!=="bottle"&&this.drag.kind!=="water"&&this.drag.kind!=="slash"&&!this.sword?.armed&&(r.style.cursor="grabbing")},o=n=>{const r=this.drag;if(this.editing){this.editMove(n);return}if(this.sword?.armed&&(!r||r.kind==="slash")){const h=this.isSurface(n.target)||r;r?.kind==="slash"&&n.pointerId===r.pointerId?this.handAt={x:n.clientX,y:n.clientY}:!r&&n.pointerType==="mouse"&&(this.handAt=h?{x:n.clientX,y:n.clientY}:null)}if((!r||r.kind==="water"||r.kind==="turn")&&this.isSurface(n.target)&&this.touchWater(n.clientX,n.clientY,r?.kind==="turn"?.8:.45),!r||r.kind==="water"){const h=this.isSurface(n.target);if(h&&this.camera.position.y<-.4&&this.scareFish(n.clientX,n.clientY),r)return;h&&n.pointerType==="mouse"&&(this.hoverQueued={x:n.clientX,y:n.clientY,target:h});return}if(n.pointerId===r.pointerId){if(r.moved=Math.max(r.moved,Math.hypot(n.clientX-r.start.x,n.clientY-r.start.y)),r.kind==="jelly"){this.setPointer(n.clientX,n.clientY);const h=new v;if(this.raycaster.ray.intersectPlane(r.plane,h)){const c=this.walkerOf(r.jelly);if(c&&r.moved>6){const u=this.raycaster.ray;if(this.island.top.worldToLocal(h.clone()).y<1.6&&!this.island.hitLand(this.raycaster)&&u.direction.y<-.02){const p=u.at((1.1-u.origin.y)/u.direction.y,new v),f=this.island.top.worldToLocal(p.clone());Math.hypot(f.x,f.z)>5&&h.copy(p)}const d=this.island.top.worldToLocal(h.clone());c.held||c.hold(d.clone().sub(c.position)),c.holdTo(d)}else c||r.jelly.dragTo(r.jelly.front.worldToLocal(h));r.moved>6&&this.markPlayed()}}else if(r.kind==="blades"){const h=Math.atan2(n.clientY-r.hub.y,n.clientX-r.hub.x);let c=h-r.angle;c=Math.atan2(Math.sin(c),Math.cos(c)),r.angle=h,this.island.blades.rotation.z-=c,this.bladeVel=this.bladeVel*.6+c/(1/60)*.4,r.moved>6&&this.markPlayed()}else if(r.kind==="ball"){const h=n.clientX-r.last.x,c=n.clientY-r.last.y;r.last.set(n.clientX,n.clientY);const u=new v().setFromMatrixColumn(this.camera.matrixWorld,0),p=new v().setFromMatrixColumn(this.camera.matrixWorld,1).multiplyScalar(h).add(u.multiplyScalar(c)),f=new be().setFromAxisAngle(new v(0,1,0),-this.yaw);p.applyQuaternion(f),this.ballSpin.lerp(p.multiplyScalar(.45),.5),r.moved>6&&this.markPlayed()}else if(r.kind==="slash"){const h=n.clientX-r.last.x,c=n.clientY-r.last.y,u=Math.max(1,Math.ceil(Math.hypot(h,c)/12));for(let d=1;d<=u;d++)this.setPointer(r.last.x+h*d/u,r.last.y+c*d/u),this.sword?.strokeSample(this.raycaster,this.pointer.clone());r.last.set(n.clientX,n.clientY),r.moved>10&&this.markPlayed()}else if(r.kind==="turn"){const h=n.clientX-r.last.x;r.last.set(n.clientX,n.clientY);const c=h/Math.max(320,this.width)*4.2;this.yaw+=c,this.yawVel=this.yawVel*.5+c/(1/60)*.5,r.moved>10&&this.markPlayed()}}},i=n=>{const r=this.drag;if(!r||n.pointerId!==r.pointerId)return;this.drag=null,r.surface.style.cursor=this.sword?.armed&&n.pointerType==="mouse"?Mo:"";try{r.surface.releasePointerCapture(n.pointerId)}catch{}const h=r.moved<8&&n.type==="pointerup";if(this.editing&&(r.kind==="sculpt"||r.kind==="item"||r.kind==="place")){this.editUp(r,h,n),this.idleFor=0;return}if(r.kind==="turn"&&h&&!this.editing){this.setPointer(n.clientX,n.clientY);const c=this.island.hitProp(this.raycaster);c&&this.island.wobble.poke(c.object)&&this.markPlayed()}if(r.kind==="jelly")r.jelly.release(),this.walkerOf(r.jelly)?.drop(),h&&(r.jelly.poke(!0),this.markPlayed());else if(r.kind==="bottle"&&h)this.options.onBottle?.(this.bottleScreen()||{x:n.clientX,y:n.clientY}),this.markPlayed();else if(r.kind==="slash")this.setPointer(n.clientX,n.clientY),h||this.sword?.strokeSample(this.raycaster,this.pointer.clone()),this.sword?.strokeEnd(this.raycaster,h),this.handDown=!1,n.pointerType!=="mouse"&&(this.handAt=null),this.markPlayed();else if(r.kind==="chest"&&h){const c=this.island.chest;c.open=!c.open,c.open?(this.spawnSparkles(),this.sword?.rise()):this.sword?.putBack(),this.markPlayed()}else if(r.kind==="water"&&h){if(this.setPointer(n.clientX,n.clientY),!this.ocean?.tap(this.raycaster)){const c=this.raycaster.ray.at(7,new v);c.y=Math.min(c.y,-.6),this.ocean?.burst(c,16)}this.markPlayed()}this.idleFor=0},a=n=>{n.key!=="Escape"||!this.sword?.armed||(this.island.chest.open=!1,this.sword.putBack())};window.addEventListener("keydown",a),this.cleanups.push(()=>window.removeEventListener("keydown",a)),t.addEventListener("pointerdown",e),t.addEventListener("pointermove",o),t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),this.cleanups.push(()=>{t.removeEventListener("pointerdown",e),t.removeEventListener("pointermove",o),t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i)})}slashable(){return this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6}handPose(){if(!this.sword?.armed||!this.slashable())return[null,!1,!1];const t=this.options.canvas.getBoundingClientRect(),s=(i,a)=>new xt((i-t.left)/t.width*2-1,-((a-t.top)/t.height)*2+1);if(this.handAt)return[s(this.handAt.x,this.handAt.y),this.handDown,!1];if(!this.touched&&!window.matchMedia("(hover: none)").matches)return[null,!1,!1];const e=this.options.islandSlot?.getBoundingClientRect(),o=e&&e.width>40?e:t;return[s(o.left+o.width*.68,o.top+o.height*.82),!1,!0]}walkerOf(t){return this.island.walkers.find(s=>s.jelly===t)}updateHover(t,s,e){if(this.drag)return;if(this.camera.position.y<-.4){this.setPointer(t,s);const n=this.ocean?.hover(this.raycaster)?"pointer":"";e.style.cursor!==n&&(e.style.cursor=n);return}const o=this.hitAt(t,s),i=this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6,a=this.sword?.armed&&i?Mo:o?o.kind==="chest"||o.kind==="bottle"?"pointer":"grab":i&&this.island.hitLand(this.raycaster)?"grab":"";e.style.cursor!==a&&(e.style.cursor=a)}touchWater(t,s,e,o=!1){if(this.camera.position.y<.3||this.scrollY>this.heroHeight*.9)return;this.setPointer(t,s);const i=this.raycaster.ray;if(i.direction.y>-.02)return;if(this.ripples&&this.island.hitLand(this.raycaster)){if(this.hoverWater=null,!this.island.pond.mesh.visible)return;const h=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,(Ze-i.origin.y)/i.direction.y),c=this.island.top.worldToLocal(h);this.island.pond.depthAt(c.x,c.z)>.01&&this.island.rippleLocal(c.x,c.z,o?e:e*.35);return}const a=-i.origin.y/i.direction.y,n=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,a);if(this.ripples){const h=this.elapsed;o?this.island.ripple(n.x,n.z,e):this.hoverWater&&h-this.hoverWater.t<.2&&this.island.rippleTrail(this.hoverWater.x,this.hoverWater.z,n.x,n.z,e),this.hoverWater={x:n.x,z:n.z,t:h};return}if(Math.hypot(n.x,n.z)<7.2)return;const r=this.elapsed;r-this.lastRipple.t<.12&&n.distanceTo(this.lastRipple.at)<1.2||(this.lastRipple.t=r,this.lastRipple.at.copy(n),this.island.ripple(n.x,n.z,e))}landUnder(t,s){this.setPointer(t,s);const e=this.island.hitLand(this.raycaster);return e?this.island.top.worldToLocal(e):null}editDown(t,s){const e=this.workshop;if(!e)return!1;this.setPointer(t.clientX,t.clientY);const o=this.tool.kind==="place"||this.tool.kind==="move"?e.hitItem(this.raycaster):null,i=this.landUnder(t.clientX,t.clientY);return o?(e.beginMove(),this.drag={kind:"item",item:o,grab:new xt(i?i.x-o.x:0,i?i.z-o.z:0),shifted:!1,...s},this.select(o)):i&&(this.tool.kind==="raise"||this.tool.kind==="lower"||this.tool.kind==="smooth")?(e.beginStroke(),this.drag={kind:"sculpt",at:i,...s}):i&&this.tool.kind==="place"?this.drag={kind:"place",...s}:(this.tool.kind==="move"&&this.select(null),this.drag={kind:"turn",last:s.start.clone(),...s},this.yawVel=0,this.touchWater(t.clientX,t.clientY,1)),!0}editMove(t){const s=this.drag,e=this.workshop;if(!e)return;const o=this.isSurface(t.target)||s?.surface;if(s&&t.pointerId===s.pointerId&&(s.moved=Math.max(s.moved,Math.hypot(t.clientX-s.start.x,t.clientY-s.start.y))),s?.kind==="turn"&&t.pointerId===s.pointerId){const n=t.clientX-s.last.x;s.last.set(t.clientX,t.clientY);const r=n/Math.max(320,this.width)*4.2;this.yaw+=r,this.yawVel=this.yawVel*.5+r/(1/60)*.5,this.touchWater(t.clientX,t.clientY,.8),e.showCursor(null);return}if(s?.kind==="place"&&t.pointerId===s.pointerId&&s.moved>10){this.drag={kind:"turn",last:new xt(t.clientX,t.clientY),pointerId:s.pointerId,moved:s.moved,start:s.start,surface:s.surface};return}const i=this.landUnder(t.clientX,t.clientY);s?.kind==="sculpt"&&t.pointerId===s.pointerId?s.at=i:s?.kind==="item"&&t.pointerId===s.pointerId&&i&&s.moved>6&&e.moveTo(s.item,i.x-s.grab.x,i.z-s.grab.y)&&(s.shifted=!0);const a=this.tool;if(!i||s&&s.kind!=="sculpt"&&s.kind!=="place")e.showCursor(null);else if(a.kind==="raise"||a.kind==="lower"||a.kind==="smooth")e.showCursor(i,a.size,a.kind);else if(a.kind==="place"){const n=e.specOf(a.item).radius;e.showCursor(i,n,e.canPlace(a.item,i.x,i.z)?"ok":"blocked")}else e.showCursor(null);if(o&&!s&&t.pointerType==="mouse"){this.setPointer(t.clientX,t.clientY);const r=(a.kind==="move"||a.kind==="place"?e.hitItem(this.raycaster):null)?"grab":i?a.kind==="move"?"":"crosshair":"grab";o.style.cursor!==r&&(o.style.cursor=r),this.touchWater(t.clientX,t.clientY,.45)}}editUp(t,s,e){const o=this.workshop;if(t.kind==="sculpt")o.endStroke(),e.pointerType!=="mouse"&&o.showCursor(null);else if(t.kind==="item"){if(o.endMove(t.shifted),s){const i=o.items.find(a=>a.id===t.item.id);i?.jelly?i.jelly.poke(i.kind==="slime"):i&&this.island.wobble.poke(i.root,.7)}}else if(t.kind==="place"&&s&&this.tool.kind==="place"){const i=this.landUnder(e.clientX,e.clientY),a=this.tool;if(i&&o.canPlace(a.item,i.x,i.z)){const n=o.place(a.item,a.look,i.x,i.z);this.island.wobble.nudgeAround(n.x,n.z,2.4,.5),this.select(n),this.markPlayed()}else this.workshopChanged(!1,!0);e.pointerType!=="mouse"&&o.showCursor(null)}}scareFish(t,s){this.setPointer(t,s),this.scare.origin.copy(this.raycaster.ray.origin),this.scare.dir.copy(this.raycaster.ray.direction),this.scareAt=this.elapsed}screenTargets(){const t=this.options.canvas.getBoundingClientRect(),s=i=>(i.project(this.camera),[Math.round(t.left+(i.x+1)/2*t.width),Math.round(t.top+(1-i.y)/2*t.height)]),e=this.island,o=i=>i.front.localToWorld(new v(0,i.height*.55,.3));return{hero:s(o(e.hero)),jellies:e.jellies.map(i=>s(o(i))),blades:s(e.top.localToWorld(e.bladeHub.clone().add(new v(0,.75,.05)))),ball:s(e.ball.getWorldPosition(new v)),chest:s(e.chest.base.localToWorld(new v(0,.3,.2))),chestOpen:e.chest.open,bottle:s(e.bottle.getWorldPosition(new v)),trees:e.trees.map(i=>s(e.top.localToWorld(new v(i.x,i.root.position.y+i.height*.3,i.z)))),armed:!!this.sword?.armed,ripples:!!this.ripples,editing:this.editing,items:this.workshop?.items.map(i=>({id:i.id,kind:i.kind,at:s(e.top.localToWorld(new v(i.x,e.ground(i.x,i.z)+.4,i.z)))}))??[],pond:e.pond.mesh.visible,yaw:Number(this.yaw.toFixed(3)),blade:Number(e.blades.rotation.z.toFixed(3))}}spawnSparkles(){const s=this.island.chest.base.position.clone().add(new v(0,.6,0));this.sparkleState.forEach(e=>{e.pos.copy(s),e.vel.set((Math.random()-.5)*2.2,2.2+Math.random()*1.8,(Math.random()-.5)*2.2),e.life=.9+Math.random()*.7})}}export{vl as IslandDive,gl as canRunIslandDive,tl as pickDiveTier,xi as supportsFloatTargets};
