import{ag as Co,ad as To,aD as Qi,f as vt,ai as te,S as st,aE as Uo,aF as Bo,V as v,C as E,au as Vo,av as Lo,aw as yi,g as xt,B as q,p as Ot,D as Gt,G as nt,o as U,L as xi,c as rt,T as ss,M as Se,aG as Ji,Q as Me,E as ta,as as Ne,u as os,U as ue,a as de,X as ea,e as Q,R as mt,al as As,x as bi,y as gs,z as oo,ac as vs,aH as be,A as Qt,ap as Mi,aq as We,ah as Oo,ak as Si,aI as Ao,an as Pe,at as Ps,az as Xs,ay as sa,d as ge,ax as es,O as zi,aJ as Ys,I as ki,ar as Te,j as oa,k as ia,aK as aa,aj as na,aL as uo,aM as fo,n as ra,l as la,i as ca,F as Ci,K as Po,H as Ti,J as ha,P as Ai,aN as qo,aO as ua,aC as da,W as fa,aB as pa,aP as ma,aQ as ga,aR as va}from"./three-engine-DgueuEcG.js";import{c as qs}from"./compileQuietly-CK7nzn7y.js";import{R as Pi,a as wa,c as ya}from"./rippleSim-CwhU6NBt.js";import{f as _i,I as jo,M as xa,b as ba,D as Ho,h as Xo,a as Yo,c as Ma,d as Sa}from"./layout-DU6Ilpyj.js";import{a as $o,c as za}from"./graphicsQuality-ExyJqURh.js";import"./react-core-CuKebU_E.js";import"./index-Bs7J9eks.js";import"./preload-helper-BXl3LOEh.js";import"./motion-engine-CNzg_hOY.js";const Zo=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,ka=`
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
`,Ca=`
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
`;class Ta{constructor(t,s){this.renderer=t,this.sceneTarget=new Co(1,1,{type:To,samples:4}),this.bloom=new Qi(new vt(1,1),.3,.55,1),this.bloom.blendMaterial.visible=!1,this.raysTarget=s.rays?new Co(1,1,{type:To,minFilter:te,magFilter:te,depthBuffer:!1}):null,this.raysMaterial=s.rays?new st({uniforms:{tScene:{value:null},uLight:{value:new vt(.5,.5)},uThreshold:{value:.9}},vertexShader:Zo,fragmentShader:ka,depthTest:!1,depthWrite:!1,blending:Uo}):null,this.raysQuad=this.raysMaterial?new Bo(this.raysMaterial):null,this.grade=new st({uniforms:{tScene:{value:null},tBloom:{value:null},tRays:{value:null},uBloom:{value:1},uRays:{value:0},uRayTint:{value:new v(1,.95,.85)},uAberration:{value:2.2},uShadowTint:{value:new v(.93,1,1.06)},uHighlightTint:{value:new v(1.04,1.01,.95)},uSplit:{value:1},uSaturation:{value:1.06},uExposure:{value:1},uResolution:{value:new vt(1,1)},uFrame:{value:0}},vertexShader:Zo,fragmentShader:Ca,depthTest:!1,depthWrite:!1,blending:Uo,toneMapped:!1}),this.gradeQuad=new Bo(this.grade)}renderer;bloom;sceneTarget;raysTarget;gradeQuad;raysQuad;grade;raysMaterial;frame=0;lightScreen=new v;forward=new v;rays=0;setSize(t,s,e){const o=Math.max(1,Math.round(t*e)),i=Math.max(1,Math.round(s*e));this.sceneTarget.setSize(o,i),this.bloom.setSize(o,i),this.raysTarget?.setSize(Math.max(1,Math.round(o/4)),Math.max(1,Math.round(i/4))),this.grade.uniforms.uResolution.value.set(o,i)}setLight(t,s){if(!this.raysMaterial||s.getWorldDirection(this.forward).dot(t)<.15)return 0;const o=this.lightScreen.copy(t).multiplyScalar(400).add(s.position).project(s);this.raysMaterial.uniforms.uLight.value.set(o.x*.5+.5,o.y*.5+.5);const i=Math.max(Math.abs(o.x),Math.abs(o.y));return 1-Math.min(1,Math.max(0,(i-.9)/.7))}async compileAsync(t,s,e){const o=this.renderer,i=o.getRenderTarget();o.setRenderTarget(this.sceneTarget);const a=qs(o,t,s,e);o.setRenderTarget(i),await a}render(t,s,e){const o=this.renderer;o.setRenderTarget(this.sceneTarget),o.render(t,s),this.bloom.render(o,null,this.sceneTarget,0,!1);const i=this.grade.uniforms;this.raysQuad&&this.raysTarget&&this.rays>.01?(this.raysMaterial.uniforms.tScene.value=this.sceneTarget.texture,o.setRenderTarget(this.raysTarget),this.raysQuad.render(o),i.tRays.value=this.raysTarget.texture,i.uRays.value=this.rays):(i.tRays.value=this.sceneTarget.texture,i.uRays.value=0),i.tScene.value=this.sceneTarget.texture,i.tBloom.value=this.bloom.renderTargetsHorizontal[0].texture,i.uExposure.value=e,i.uFrame.value=this.frame++%64,o.setRenderTarget(null),this.gradeQuad.render(o)}dispose(){this.sceneTarget.dispose(),this.raysTarget?.dispose(),this.bloom.dispose(),this.grade.dispose(),this.raysMaterial?.dispose(),this.gradeQuad.dispose(),this.raysQuad?.dispose()}}function Aa(){return{uTime:{value:0},uSunDir:{value:new v(.45,.78,.42).normalize()},uSunColor:{value:new E("#fff1d6")},uSkyColor:{value:new E("#bfe6ff")},uGroundColor:{value:new E("#9cc46e")},uNight:{value:0},uUnder:{value:0},uDepth:{value:0},uGlow:{value:0},uSkyTop:{value:new E("#3f9ef0")},uSkyHorizon:{value:new E("#cdeeff")},uSkyHaze:{value:new E("#fff4dc")},uWaterGlow:{value:new E("#8ff0ff")},uWaterFog:{value:new E("#1d9cc4")},uWaterAbyss:{value:new E("#0f6a9a")},uWaterRays:{value:0}}}const Ds={light:{skyTop:"#8d9ee6",skyHorizon:"#ffd2c6",haze:"#fff0dc",sunDir:new v(-.2,.3,-.93).normalize(),sunColor:"#fff0dc",sunIntensity:1.9,fillDir:new v(.35,.5,.8).normalize(),fillColor:"#ffe2ec",fillIntensity:.55,hemiSky:"#dfe2ff",hemiGround:"#c9a9a0",hemiIntensity:1,fog:"#eed2d6",fogDensity:.0016,foam:"#ffffff",sand:"#fbe9cf",cloudLit:"#fffaf5",cloudMid:"#ffe0e6",cloudShade:"#bdb6ea"},dark:{skyTop:"#121842",skyHorizon:"#4a4386",haze:"#c8b6ff",sunDir:new v(-.16,.27,-.95).normalize(),sunColor:"#cfd8ff",sunIntensity:1,fillDir:new v(.35,.5,.8).normalize(),fillColor:"#8f8ae6",fillIntensity:.4,hemiSky:"#7480d6",hemiGround:"#40386e",hemiIntensity:1.2,fog:"#1c2050",fogDensity:.006,foam:"#dfe8ff",sand:"#a6a0bc",cloudLit:"#9c9ee0",cloudMid:"#7472bc",cloudShade:"#3a3a7c"}},Pa={light:[{depth:0,fog:"#1d9cc4",glow:"#8ff0ff",abyss:"#0f6a9a",density:.052,hemi:1,light:"#c4f6ff"},{depth:3,fog:"#1b93c0",glow:"#82eaff",abyss:"#0e6094",density:.036,hemi:.96,light:"#b8f0fd"},{depth:8,fog:"#1781b8",glow:"#6fdcf6",abyss:"#0b4f86",density:.027,hemi:.9,light:"#a4e6fa"},{depth:18,fog:"#0f5a99",glow:"#3fa8e0",abyss:"#072f66",density:.03,hemi:.72,light:"#7cc0ea"},{depth:30,fog:"#0a3772",glow:"#2271b8",abyss:"#04173d",density:.034,hemi:.56,light:"#5d92d8"},{depth:42,fog:"#072656",glow:"#1a5298",abyss:"#030c26",density:.036,hemi:.5,light:"#5683cc"},{depth:52,fog:"#0a4058",glow:"#1f7ea0",abyss:"#04202e",density:.032,hemi:.62,light:"#6fd0d6"}],dark:[{depth:0,fog:"#0e3f5e",glow:"#3f8fb8",abyss:"#082a44",density:.056,hemi:.78,light:"#7cc4e6"},{depth:3,fog:"#0d3a59",glow:"#3787b2",abyss:"#07263f",density:.04,hemi:.74,light:"#74bce2"},{depth:8,fog:"#0b3352",glow:"#2e78a6",abyss:"#06213c",density:.033,hemi:.68,light:"#6aaedc"},{depth:18,fog:"#08243f",glow:"#1f5a8c",abyss:"#04142a",density:.036,hemi:.55,light:"#5590c8"},{depth:30,fog:"#05162d",glow:"#153f72",abyss:"#020a1a",density:.04,hemi:.45,light:"#4673b4"},{depth:42,fog:"#040f22",glow:"#10305e",abyss:"#020714",density:.044,hemi:.4,light:"#4062a8"},{depth:52,fog:"#062a36",glow:"#13586e",abyss:"#02141c",density:.04,hemi:.5,light:"#4fb6c0"}]},Ns=new E,Ws=new E;function _a(l,t,s={fog:new E,glow:new E,abyss:new E,density:0,hemi:0,light:new E}){const e=Pa[l];let o=0;for(;o<e.length-2&&t>e[o+1].depth;)o++;const i=e[o],a=e[o+1],n=Math.min(1,Math.max(0,(t-i.depth)/(a.depth-i.depth))),r=n*n*(3-2*n);return s.fog.copy(Ns.set(i.fog).lerp(Ws.set(a.fog),r)),s.glow.copy(Ns.set(i.glow).lerp(Ws.set(a.glow),r)),s.abyss.copy(Ns.set(i.abyss).lerp(Ws.set(a.abyss),r)),s.density=i.density+(a.density-i.density)*r,s.hemi=i.hemi+(a.hemi-i.hemi)*r,s.light.copy(Ns.set(i.light).lerp(Ws.set(a.light),r)),s}function io(l){let t=l>>>0||2654435769;return()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}class Fa{pos=[];nor=[];col=[];part=[];sway=[];idx=[];add(t,s,e,o,i,a){const n=this.pos.length/3;for(let r=0;r<t.length;r+=3)this.pos.push(t[r],t[r+1],t[r+2]),this.nor.push(s[r],s[r+1],s[r+2]),this.col.push(e[r],e[r+1],e[r+2]),this.part.push(i),this.sway.push(a(t[r+1],t[r],t[r+2]));for(const r of o)this.idx.push(n+r)}build(){const t=new xt;return t.setAttribute("position",new q(new Float32Array(this.pos),3)),t.setAttribute("normal",new q(new Float32Array(this.nor),3)),t.setAttribute("color",new q(new Float32Array(this.col),3)),t.setAttribute("aPart",new q(new Float32Array(this.part),1)),t.setAttribute("aSway",new q(new Float32Array(this.sway),1)),t.setIndex(this.idx),t.computeBoundingSphere(),t.computeBoundingBox(),t}}function Ia(l){const t=(1+Math.sqrt(5))/2;let s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(o=>{const i=Math.hypot(o[0],o[1],o[2]);return[o[0]/i,o[1]/i,o[2]/i]}),e=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let o=0;o<l;o++){const i=new Map,a=(r,h)=>{const c=r<h?`${r}_${h}`:`${h}_${r}`,u=i.get(c);if(u!==void 0)return u;const d=s[r],p=s[h],f=[(d[0]+p[0])/2,(d[1]+p[1])/2,(d[2]+p[2])/2],m=Math.hypot(f[0],f[1],f[2]);return s.push([f[0]/m,f[1]/m,f[2]/m]),i.set(c,s.length-1),s.length-1},n=[];for(const[r,h,c]of e){const u=a(r,h),d=a(h,c),p=a(c,r);n.push([r,u,p],[h,d,u],[c,p,d],[u,d,p])}e=n}return s=s.slice(),{positions:s.flat(),indices:e.flat()}}function $s(l,t,s,e){const o=(m,g,b)=>{let x=Math.imul(m,374761393)+Math.imul(g,668265263)+Math.imul(b,1440662683)+Math.imul(e,2246822519);return x=Math.imul(x^x>>>13,1274126177),((x^x>>>16)>>>0)/4294967296},i=Math.floor(l),a=Math.floor(t),n=Math.floor(s),r=l-i,h=t-a,c=s-n,u=r*r*(3-2*r),d=h*h*(3-2*h),p=c*c*(3-2*c),f=(m,g,b)=>m+(g-m)*b;return f(f(f(o(i,a,n),o(i+1,a,n),u),f(o(i,a+1,n),o(i+1,a+1,n),u),d),f(f(o(i,a,n+1),o(i+1,a,n+1),u),f(o(i,a+1,n+1),o(i+1,a+1,n+1),u),d),p)}const po=l=>new E(l);function Ea(l,t,s,e,o,i,a,n,r,h,c,u=.22){const d=Ia(r),p=[],f=[],m=[];for(let g=0;g<d.positions.length;g+=3){const b=d.positions[g],x=d.positions[g+1],y=d.positions[g+2],S=$s(b*2.2+i,x*2.2,y*2.2,i)-.5,A=$s(b*5.1+i*.3,x*5.1,y*5.1,i+7)-.5,C=1+S*u*2+A*u*.6,T=t.x+b*s.x*C,_=t.y+x*s.y*C,W=t.z+y*s.z*C;p.push(T,_,W);const D=T-e.x,Y=(_-e.y)*1.15,V=W-e.z,G=Math.hypot(D,Y,V)||1;let H=b*.45+D/G*.55,j=x*.45+Y/G*.55,et=y*.45+V/G*.55;const bt=Math.hypot(H,j,et)||1;H/=bt,j/=bt,et/=bt,f.push(H,j,et);const Rt=Math.min(1,G/o),Dt=(j+1)/2,fe=Math.max(0,Math.min(1,Rt*.55+Dt*.55-.12+A*.3)),wt=a.clone().lerp(n,fe);m.push(wt.r,wt.g,wt.b)}l.add(p,f,m,d.indices,h,g=>Math.max(0,g)*c)}function Ko(l,t,s,e,o,i,a,n=7,r=5){const h=io(a),c=s.clone().sub(t),u=c.length();c.normalize();const d=Math.abs(c.y)<.9?new v(0,1,0).cross(c).normalize():new v(1,0,0),p=c.clone().cross(d).normalize(),f=new v((h()-.5)*.3,0,(h()-.5)*.3).multiplyScalar(u),m=[],g=[],b=[],x=[];for(let y=0;y<=r;y++){const S=y/r,A=t.clone().addScaledVector(c,u*S).addScaledVector(f,Math.sin(S*Math.PI)*.5),C=e+(o-e)*S,T=y===0?1.35:1;for(let _=0;_<n;_++){const W=_/n*Math.PI*2,D=d.clone().multiplyScalar(Math.cos(W)).addScaledVector(p,Math.sin(W)),Y=1+($s(Math.cos(W)*2,S*4,Math.sin(W)*2,a)-.5)*.25,V=A.clone().addScaledVector(D,C*T*Y);m.push(V.x,V.y,V.z),g.push(D.x,D.y,D.z);const G=.78+.22*S+($s(W*3,S*9,0,a+3)-.5)*.2;b.push(i.r*G,i.g*G,i.b*G)}}for(let y=0;y<r;y++)for(let S=0;S<n;S++){const A=y*n+S,C=y*n+(S+1)%n,T=A+n,_=C+n;x.push(A,T,C,C,T,_)}l.add(m,g,b,x,0,y=>Math.max(0,y)*.02)}const Ra={tree:{dark:"#1f4a24",light:"#86b94a",bark:"#6a4a35",height:[2.4,3.4],crown:[1.9,2.6],blobs:[5,8]},blossom:{dark:"#c95f8a",light:"#ffd3e2",bark:"#5d4436",height:[2.2,3],crown:[1.8,2.4],blobs:[5,8]},autumn:{dark:"#a3451f",light:"#ffbf4a",bark:"#5e4433",height:[2.4,3.2],crown:[1.8,2.5],blobs:[5,7]},birch:{dark:"#4f7d2a",light:"#c7e07a",bark:"#e8e2d6",height:[3.4,4.4],crown:[1.4,1.9],blobs:[4,6]}};let ke=null;function Da(){if(ke)return ke;const l=512,t=l/2,s=document.createElement("canvas");s.width=s.height=l;const e=s.getContext("2d"),o=(i,a,n,r)=>{const h=io(n),c=i+t/2,u=a+t/2,d=r?90:22;for(let p=0;p<d;p++){const f=h()*Math.PI*2,m=Math.pow(h(),.7)*t*(r?.36:.3),g=c+Math.cos(f)*m,b=u+Math.sin(f)*m,x=r?t*(.16+h()*.1):t*(.17+h()*.11),y=r?t*.016:x*(.42+h()*.16),S=r?f+(h()-.5)*.5:f+Math.PI/2+(h()-.5)*1.3,A=Math.round(150+h()*105);e.save(),e.translate(g,b),e.rotate(S),e.fillStyle=`rgb(${A},${A},${A})`,e.beginPath(),e.moveTo(0,-x/2),e.quadraticCurveTo(y,-x*.05,0,x/2),e.quadraticCurveTo(-y,-x*.05,0,-x/2),e.fill(),r||(e.fillStyle="rgba(255,255,255,.18)",e.beginPath(),e.moveTo(0,-x/2),e.quadraticCurveTo(y,-x*.05,0,x/2),e.closePath(),e.fill(),e.strokeStyle="rgba(0,0,0,.16)",e.lineWidth=t*.006,e.beginPath(),e.moveTo(0,-x*.45),e.lineTo(0,x*.45),e.stroke()),e.restore()}};return o(0,0,11,!1),o(t,0,23,!1),o(0,t,37,!1),o(t,t,51,!0),ke=new Vo(s),ke.colorSpace=Lo,ke.generateMipmaps=!0,ke.minFilter=yi,ke.magFilter=te,ke.anisotropy=4,ke}const Qo={tree:{dark:"#21503b",mid:"#468a48",light:"#7db862",warm:"#a7c978"},blossom:{dark:"#b9557f",mid:"#f19ab8",light:"#ffe2ec",warm:"#fff0d8"},autumn:{dark:"#8f3c1f",mid:"#e0782f",light:"#ffc95a",warm:"#ffe08a"},birch:{dark:"#46783c",mid:"#82b758",light:"#c2dd88",warm:"#dde29c"},bush:{dark:"#265839",mid:"#4a8c46",light:"#7eb862",warm:"#a5c777"},pine:{dark:"#123827",mid:"#25603d",light:"#5b9a58",warm:"#9cbf6a"}};class Na{pos=[];corner=[];card=[];nor=[];col=[];idx=[];add(t,s,e,o,i,a,n,r,h){const c=this.pos.length/3,u=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[d,p]of u)this.pos.push(t.x,t.y,t.z),this.corner.push(d,p),this.card.push(e,o,n+i,a),this.nor.push(s.x,s.y,s.z),this.col.push(r.r,r.g,r.b,h);this.idx.push(c,c+1,c+2,c,c+2,c+3)}build(){const t=new xt;return t.setAttribute("position",new q(new Float32Array(this.pos),3)),t.setAttribute("aCorner",new q(new Float32Array(this.corner),2)),t.setAttribute("aCard",new q(new Float32Array(this.card),4)),t.setAttribute("normal",new q(new Float32Array(this.nor),3)),t.setAttribute("aTint",new q(new Float32Array(this.col),4)),t.setIndex(this.idx),t.computeBoundingSphere(),t.boundingSphere&&(t.boundingSphere.radius+=1.2),t.computeBoundingBox(),t}}function Wa(l,t,s,e,o,i={}){const a=new Na,n=io(o*131+7),r=new E(e.dark),h=new E(e.mid),c=new E(e.light),u=new E(e.warm||e.light),d=i.quadrants??[0,1,2],p=new E;for(const f of l){const m=Math.max(10,Math.round(f.r*f.r*58*(i.density??1)));for(let g=0;g<m;g++){const b=new v(n()*2-1,n()*2-.7,n()*2-1);b.lengthSq()<1e-4&&b.set(0,1,0),b.normalize();const x=.38+.62*Math.sqrt(n()),y=f.c.clone().addScaledVector(b,f.r*x),S=y.clone().sub(t),A=S.length()/Math.max(s,.01),C=b.clone().multiplyScalar(.55).add(S.normalize().multiplyScalar(.45)).normalize(),T=C.y*.5+.5,_=Math.min(1,Math.max(0,T*.55+x*.35+(n()-.5)*.25));p.copy(r).lerp(h,Math.min(1,_*1.6)).lerp(c,Math.max(0,_*1.6-.6)),C.y>.55&&n()<.4&&p.lerp(u,.35);const W=1+(n()-.5)*.14;p.multiplyScalar(W);const D=Math.min(1,x*.55+T*.35+Math.min(1,A)*.2),Y=f.r*(i.size??.46)*(.75+n()*.5),V=Math.max(0,y.y)*(i.swayScale??.08);a.add(y,C,Y,n()*Math.PI*2,n()*.99,D,d[Math.floor(n()*d.length)],p.clone(),V)}}return a.build()}function Va(l,t){const s=Ra[l],e=io(t*977+13),o=new Fa,i=s.height[0]+e()*(s.height[1]-s.height[0]),a=s.crown[0]+e()*(s.crown[1]-s.crown[0]),n=po(s.bark),r=new v((e()-.5)*.4,i,(e()-.5)*.4);Ko(o,new v(0,-.15,0),r,.2*(l==="birch"?.7:1),.11,n,t);const h=new v(r.x,i+a*.5,r.z);for(let f=0;f<3;f++){const m=e()*Math.PI*2,g=new v(r.x*.6,i*(.55+e()*.2),r.z*.6);Ko(o,g,new v(Math.cos(m)*a*.55,i+a*.3,Math.sin(m)*a*.55),.08,.045,n,t+f*31,5,3)}const c=[{c:h.clone(),r:a*.78}],u=Math.round(s.blobs[0]+e()*(s.blobs[1]-s.blobs[0]));for(let f=0;f<u;f++){const m=f/u*Math.PI*2+e()*.6,g=a*(.5+e()*.22);c.push({c:new v(h.x+Math.cos(m)*g,h.y+(e()-.4)*a*.8,h.z+Math.sin(m)*g),r:a*(.42+e()*.22)})}c.push({c:new v(h.x+(e()-.5)*.4,h.y+a*.55,h.z+(e()-.5)*.4),r:a*.48});const d=Qo[l]??Qo.tree,p=po(d.dark).multiplyScalar(.7);for(const f of c)Ea(o,f.c,new v(f.r*.62,f.r*.55,f.r*.62),h,a,t+Math.round(f.c.x*100),p,po(d.dark),1,1,.08,.12);return{solid:o.build(),cards:Wa(c,h,a,d,t,{quadrants:[0,1,2]})}}function La(l){const t=new Ot({vertexColors:!0,roughness:.88,metalness:0});t.onBeforeCompile=e=>{e.uniforms.uTime=l.uTime,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aSway;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        // 樹冠跟著風慢慢晃，越高晃越多
        transformed.xz += vec2(sin(uTime * 1.3 + position.y * 0.6), cos(uTime * 1.05 + position.y * 0.5)) * aSway * 0.05;`)},t.customProgramCacheKey=()=>"island-tree-solid";const s=new st({uniforms:{uTime:l.uTime,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uNight:l.uNight,tLeaf:{value:Da()}},vertexShader:`
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
      }`,side:Gt});return{solid:t,cards:s,dispose:()=>{t.dispose(),s.dispose()}}}function Fi(l,t,s,e){const o=Va(l,t*101+l.length*7+1),i=new nt;i.name=`tree-${l}`;const a=new U(o.solid,s.solid);a.castShadow=!0,a.receiveShadow=!0,i.add(a),o.cards&&i.add(new U(o.cards,s.cards));const n=o.solid.boundingBox,r=n?n.max.y:5;return i.scale.setScalar(e/Math.max(1,r*1.08)),i}const Oa={tree:new E("#7db862"),blossom:new E("#f19ab8"),autumn:new E("#ffc95a"),birch:new E("#c2dd88")};function Ga(){const l=new nt;l.name="bottle";const t=[],s=22;for(let u=0;u<=s;u++){const d=u/s,p=d*.62,f=d<.62?.12+Math.sin(Math.min(1,d/.12)*Math.PI/2)*.02-Math.max(0,d-.5)*.25:.05-(d-.62)*.02;t.push(new vt(Math.max(.035,f),p))}const e=new Ot({color:"#bff3ec",roughness:.05,metalness:0,transparent:!0,opacity:.42,envMapIntensity:1.4,depthWrite:!1}),o=new Ot({color:"#fff4d8",roughness:.85}),i=new Ot({color:"#b98a5a",roughness:.9}),a=new Ot({color:"#ff8fb1",roughness:.5}),n=new U(new xi(t,24),e);n.position.y=-.3,n.renderOrder=6;const r=new U(new rt(.055,.055,.34,14),o);r.position.y=-.08;const h=new U(new ss(.058,.012,8,20),a);h.rotation.x=Math.PI/2,h.position.y=-.08;const c=new U(new rt(.045,.04,.09,12),i);c.position.y=.35;for(const u of[r,h,c,n])u.castShadow=u!==n,l.add(u);return l.scale.setScalar(2.1),l}const Jo=new E,Ss=new v,ti=new Ji;function N(l={}){const t=l.s===void 0?[1,1,1]:typeof l.s=="number"?[l.s,l.s,l.s]:l.s;return new Se().compose(new v(l.x||0,l.y||0,l.z||0),new Me().setFromEuler(new ta(l.rx||0,l.ry||0,l.rz||0,"YXZ")),new v(t[0],t[1],t[2]))}class kt{positions=[];normals=[];colors=[];indices=[];extra=[];get vertexCount(){return this.positions.length/3}add(t,s,e=new Se,o=0,i){const a=t.getAttribute("position");t.getAttribute("normal")||t.computeVertexNormals();const n=t.getAttribute("normal"),r=this.vertexCount;ti.getNormalMatrix(e);const h=new v,c=new v,u=typeof s=="function"?null:Jo.set(s).clone();for(let d=0;d<a.count;d++){h.fromBufferAttribute(a,d),c.fromBufferAttribute(n,d),Ss.copy(h).applyMatrix4(e),this.positions.push(Ss.x,Ss.y,Ss.z);const p=c.clone().applyMatrix3(ti).normalize();i&&p.lerp(Ss.clone().sub(i.center).normalize(),i.amount).normalize(),this.normals.push(p.x,p.y,p.z);const f=u||(()=>{const m=s(h,c);return m instanceof E?m:Jo.set(m)})();this.colors.push(f.r,f.g,f.b),this.extra.push(typeof o=="function"?o(h):o)}if(t.index){const d=t.index;for(let p=0;p<d.count;p++)this.indices.push(r+d.getX(p))}else for(let d=0;d<a.count;d++)this.indices.push(r+d);if(e.determinant()<0)for(let d=this.indices.length-(t.index?t.index.count:a.count);d<this.indices.length;d+=3){const p=this.indices[d+1];this.indices[d+1]=this.indices[d+2],this.indices[d+2]=p}return t.dispose(),this}build(t=!1){const s=new xt;s.setAttribute("position",new q(new Float32Array(this.positions),3)),s.setAttribute("normal",new q(new Float32Array(this.normals),3)),s.setAttribute("color",new q(new Float32Array(this.colors),3)),t&&s.setAttribute("aExtra",new q(new Float32Array(this.extra),1));const e=this.vertexCount;return s.setIndex(new q(e>65535?new Uint32Array(this.indices):new Uint16Array(this.indices),1)),s.computeBoundingSphere(),s.computeBoundingBox(),s}}function _e(l){let t=l>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967296)}function Vs(l,t){const s=Math.sin(l*127.1+t*311.7)*43758.5453123;return s-Math.floor(s)}function Ua(l,t){const s=Math.floor(l),e=Math.floor(t),o=l-s,i=t-e,a=o*o*(3-2*o),n=i*i*(3-2*i),r=Vs(s,e),h=Vs(s+1,e),c=Vs(s,e+1),u=Vs(s+1,e+1);return(r+(h-r)*a+(c+(u-c)*a-(r+(h-r)*a))*n)*2-1}function Jt(l,t,s=3){let e=0,o=.5,i=1,a=0;for(let n=0;n<s;n++)e+=Ua(l*i,t*i)*o,a+=o,o*=.5,i*=2.03;return e/a}const Ae=(l,t,s)=>l+(t-l)*s,ve=l=>Math.min(1,Math.max(0,l)),lt=(l,t,s)=>{const e=ve((s-l)/(t-l));return e*e*(3-2*e)};function zt(l,t,s){return new E(l).lerp(new E(t),ve(s))}const mo=`
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
`,Ii=`
uniform vec4 uClip[4];
uniform int uClipCount;
void clipJelly(vec3 p) {
  for (int i = 0; i < 4; i++) {
    if (i >= uClipCount) break;
    if (dot(p, uClip[i].xyz) > uClip[i].w + 0.0015) discard;
  }
}
`,Ba=`
uniform vec3 uDeep;
varying vec3 vObj;
${Ii}
#include <fog_pars_fragment>
void main() {
  clipJelly(vObj);
  gl_FragColor = vec4(uDeep * 0.42 + vec3(0.03, 0.02, 0.06), 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,ei=`
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
${Ii}
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
`;function qa(){const l=new Q(1,56,40),t=l.getAttribute("position"),s=new v;for(let e=0;e<t.count;e++){s.fromBufferAttribute(t,e);let o=s.y*.82;o<-.42&&(o=-.42+(o+.42)*.12);const i=1+.08*Math.max(0,1-Math.abs(o+.12)*2.2);s.set(s.x*1.06*i,o+.42,s.z*1.06*i),t.setXYZ(e,s.x,s.y,s.z)}return l.computeVertexNormals(),l}function ja(){const l=[];for(let e=0;e<=26;e++){const o=e/26;if(o<.12)l.push(new vt(.001+o/.12*.98,0));else if(o<.7){const i=(o-.12)/.58;l.push(new vt(.98-i*.22+Math.sin(i*Math.PI)*.03,i*1.05))}else{const i=(o-.7)/.3,a=i*Math.PI/2;l.push(new vt(Math.max(.001,.76*Math.cos(a)*(1-i*.05)),1.05+Math.sin(a)*.2))}}const s=new xi(l,48);return s.computeVertexNormals(),s}function Ha(){const l=new mt(1.5,1.5,1.5,6,.38);return l.translate(0,.75,0),l.deleteAttribute("uv"),l}const go=4;function Ls(l,t,s=0){for(const e of t)if(l.x*e.x+l.y*e.y+l.z*e.z>e.w+s)return!1;return!0}function Xa(l,t,s){const e=l.getAttribute("position"),o=l.getIndex(),i=new v(t.x,t.y,t.z),a=new v,n=new v,r=new Set,h=[],c=(y,S)=>{a.fromBufferAttribute(e,y),n.fromBufferAttribute(e,S);const A=a.dot(i)-t.w,C=n.dot(i)-t.w;if(A>0==C>0)return;const T=a.clone().lerp(n,A/(A-C)),_=`${Math.round(T.x*400)},${Math.round(T.y*400)},${Math.round(T.z*400)}`;r.has(_)||(r.add(_),h.push(T))},u=o?o.count:e.count;for(let y=0;y+2<u;y+=3){const S=o?o.getX(y):y,A=o?o.getX(y+1):y+1,C=o?o.getX(y+2):y+2;c(S,A),c(A,C),c(C,S)}if(h.length<3)return[];const d=new v(Math.abs(i.y)<.9?0:1,Math.abs(i.y)<.9?1:0,0).cross(i).normalize(),p=i.clone().cross(d),f=h.map(y=>({p:y,x:y.dot(d),y:y.dot(p)})).sort((y,S)=>y.x-S.x||y.y-S.y),m=(y,S,A)=>(S.x-y.x)*(A.y-y.y)-(S.y-y.y)*(A.x-y.x),g=[],b=[];for(const y of f){for(;g.length>=2&&m(g[g.length-2],g[g.length-1],y)<=0;)g.pop();g.push(y)}for(let y=f.length-1;y>=0;y--){const S=f[y];for(;b.length>=2&&m(b[b.length-2],b[b.length-1],S)<=0;)b.pop();b.push(S)}let x=[...g.slice(0,-1),...b.slice(0,-1)].map(y=>y.p);for(const y of s){const S=new v(y.x,y.y,y.z),A=[];for(let C=0;C<x.length;C++){const T=x[C],_=x[(C+1)%x.length],W=T.dot(S)-y.w,D=_.dot(S)-y.w;W<=0&&A.push(T),W<=0!=D<=0&&A.push(T.clone().lerp(_,W/(W-D)))}if(x=A,x.length<3)return[]}return x}function Ya(l,t){const s=l.reduce((a,n)=>a.add(n),new v).divideScalar(l.length),e=[],o=[];for(let a=0;a<l.length;a++){const n=l[a],r=l[(a+1)%l.length];e.push(s.x,s.y,s.z,n.x,n.y,n.z,r.x,r.y,r.z);for(let h=0;h<3;h++)o.push(t.x,t.y,t.z)}const i=new xt;return i.setAttribute("position",new As(e,3)),i.setAttribute("normal",new As(o,3)),i}const Os=new v,vo=new v,$e=new v,si=new Me;class he{static softness=.6;group=new nt;front;back;outline=null;uniforms;kind;face;pull=new v;pullVel=new v;target=new v;squash=0;squashVel=0;hop=0;hopVel=0;shear=new vt;shearVel=new vt;lastWorld=new v;lastVelocity=new v;tracked=0;blinkAt=1.5+Math.random()*3;dragging=!1;holdStretch=0;swingTarget=new v;maxStretch;height;cuts;caps=[];env;outlines;ownsGeometry;constructor(t,s,e,o={}){this.kind=t,this.face=!!o.face,this.env=e,this.outlines=o.outlines,this.cuts=(o.cuts||[]).slice(0,go),this.ownsGeometry=!o.geometry;const i=o.geometry||(t==="slime"?qa():t==="pudding"?ja():Ha());i.computeBoundingBox();const a=i.boundingBox;this.height=a.max.y-a.min.y,this.maxStretch=this.height*1.25,this.uniforms={uTime:e.uTime,uSunDir:e.uSunDir,uSunColor:e.uSunColor,uSkyColor:e.uSkyColor,uGroundColor:e.uGroundColor,uNight:e.uNight,uSeed:{value:o.seed??Math.random()*10},uGrab:{value:new v(0,this.height*.75,.4)},uPull:{value:new v},uRadius:{value:t==="cube"?1.15:.95},uBase:{value:a.min.y},uHeight:{value:this.height},uSquash:{value:0},uShear:{value:new v},uBulge:{value:.6},uColor:{value:new E(s.color)},uDeep:{value:new E(s.deep)},uTop:{value:new E(s.top||s.color)},uTopStart:{value:s.top?t==="pudding"?1.02:this.height*.8:99},uOpacity:{value:.6},uBack:{value:0},uFace:{value:this.face?1:0},uBlink:{value:1},uMood:{value:0},uFaceCenter:{value:new v(0,this.height*.42,0)},uOutlineWidth:o.outlines?o.outlines.uWidth:{value:0},uResolution:o.outlines?o.outlines.uResolution:{value:new vt(1,1)},uClip:{value:Array.from({length:go},(r,h)=>this.cuts[h]?.clone()||new Ne(0,0,0,1))},uClipCount:{value:this.cuts.length}};const n=r=>new st({uniforms:{...ue.clone(de.fog),...this.uniforms,uBack:{value:r?1:0},uFace:r?{value:0}:this.uniforms.uFace},vertexShader:mo,fragmentShader:ei,transparent:!0,depthWrite:!r,side:r?os:ea,fog:!0});this.back=new U(i,n(!0)),this.front=new U(i,n(!1)),this.back.renderOrder=4,this.front.renderOrder=5,this.front.userData.jelly=this,this.group.add(this.back,this.front),o.outlines&&(this.outline=new U(i,new st({uniforms:{...ue.clone(de.fog),...this.uniforms},vertexShader:mo,fragmentShader:Ba,side:os,fog:!0,defines:{OUTLINE:""},transparent:!0,depthWrite:!1})),this.outline.renderOrder=6,this.group.add(this.outline)),this.cuts.forEach((r,h)=>{const c=Xa(i,r,this.cuts.filter((d,p)=>p!==h));if(c.length<3)return;const u=new U(Ya(c,r),new st({uniforms:{...ue.clone(de.fog),...this.uniforms,uBack:{value:0},uFace:{value:0}},vertexShader:mo,fragmentShader:ei,transparent:!0,depthWrite:!0,side:Gt,fog:!0}));u.renderOrder=5,this.caps.push(u),this.group.add(u)})}split(t){if(this.cuts.length>=go)return null;const s=t.clone().negate(),e=this.front.geometry,o=e.getAttribute("position"),i=new v;let a=0,n=0;for(let c=0;c<o.count;c+=3)i.fromBufferAttribute(o,c),Ls(i,this.cuts)&&(i.dot(new v(t.x,t.y,t.z))<=t.w?a++:n++);const r=a+n;if(!r||a/r<.06||n/r<.06)return null;const h=c=>{const u=new he(this.kind,{color:"#fff",deep:"#000"},this.env,{face:this.face,outlines:this.outlines,geometry:e,cuts:[...this.cuts,c]});for(const d of["uColor","uDeep","uTop"])u.uniforms[d].value.copy(this.uniforms[d].value);return u.uniforms.uTopStart.value=this.uniforms.uTopStart.value,u.uniforms.uSeed.value=this.uniforms.uSeed.value,u};return[h(t),h(s)]}centroid(){const t=this.front.geometry.getAttribute("position"),s=new v,e=new v;let o=0;for(let i=0;i<t.count;i+=2)s.fromBufferAttribute(t,i),Ls(s,this.cuts)&&(e.add(s),o++);return o?e.divideScalar(o):e}samplePoints(t=90){const s=this.front.geometry.getAttribute("position"),e=[];for(let i=0;i<s.count;i++){const a=new v().fromBufferAttribute(s,i);Ls(a,this.cuts)&&e.push(a)}for(const i of this.caps){const a=i.geometry.getAttribute("position");for(let n=0;n<a.count;n++)e.push(new v().fromBufferAttribute(a,n))}const o=Math.max(1,Math.floor(e.length/t));return e.filter((i,a)=>a%o===0)}setLook(t){this.uniforms.uColor.value.set(t.color),this.uniforms.uDeep.value.set(t.deep),this.uniforms.uTop.value.set(t.top||t.color)}hit(t){if(!this.cuts.length)return t.intersectObject(this.front,!1)[0];const s=new v;return t.intersectObjects([this.front,...this.caps],!1).find(e=>Ls(this.front.worldToLocal(s.copy(e.point)),this.cuts,.01))}grab(t){this.uniforms.uGrab.value.copy(t),this.dragging=!0}dragTo(t){this.target.copy(t).sub(this.uniforms.uGrab.value),this.target.length()>this.maxStretch&&this.target.setLength(this.maxStretch)}release(){this.dragging&&(this.dragging=!1,this.target.set(0,0,0),this.swingTarget.set(0,0,0),this.squashVel+=Math.min(3.2,this.pull.length()*2.4),this.kick(-this.pull.x*2.2,-this.pull.z*2.2))}kick(t,s){this.shearVel.x+=t,this.shearVel.y+=s}hopStep(t){this.hop>0||this.hopVel!==0||(this.hopVel=t,this.squashVel-=1.4)}get airborne(){return this.hop>0||this.hopVel>0}get hopHeight(){return this.hop}swing(t,s){this.swingTarget.copy(t).multiplyScalar(-s),this.swingTarget.length()>this.maxStretch*.6&&this.swingTarget.setLength(this.maxStretch*.6)}land(t){this.swingTarget.set(0,0,0),this.squashVel-=Math.min(5,t*.6);const s=Math.random()*Math.PI*2,e=Math.min(1.6,t*.18);this.kick(Math.cos(s)*e,Math.sin(s)*e),t>2&&(this.hopVel=Math.min(3.4,t*.32))}poke(t=!1){this.squashVel-=2.6;const s=Math.random()*Math.PI*2;this.kick(Math.cos(s)*1.1,Math.sin(s)*1.1),t&&(this.hopVel=5.2)}update(t,s){const e=Math.max(1,Math.min(6,Math.ceil(t/.008333333333333333))),o=t/e,i=Math.min(1,Math.max(0,he.softness)),a=this.dragging?260:120*(1.5-i*.8),n=this.dragging?24:5.2*(1.35-i*.6);this.group.getWorldPosition(Os),$e.set(0,0,0),this.tracked>1&&t>1e-4?(vo.copy(Os).sub(this.lastWorld).divideScalar(t),$e.copy(vo).sub(this.lastVelocity).divideScalar(t),$e.lengthSq()>8100&&$e.setLength(90),this.lastVelocity.copy(vo),this.group.getWorldQuaternion(si).invert(),$e.applyQuaternion(si)):this.tracked===1&&t>1e-4&&this.lastVelocity.copy(Os).sub(this.lastWorld).divideScalar(t),this.lastWorld.copy(Os),this.tracked++;const r=Math.PI*2*(4.2-i*1.9),h=2*(.24-i*.14)*r,c=1.1+i*.6,u=this.holdStretch>0?this.swingTarget:this.target;for(let d=0;d<e;d++)this.pullVel.x+=((u.x-this.pull.x)*a-this.pullVel.x*n)*o,this.pullVel.y+=((u.y-this.pull.y)*a-this.pullVel.y*n)*o,this.pullVel.z+=((u.z-this.pull.z)*a-this.pullVel.z*n)*o,this.pull.addScaledVector(this.pullVel,o),this.squashVel+=(-(this.squash-this.holdStretch)*150*(1.45-i*.75)-this.squashVel*6.5*(1.3-i*.55))*o,this.squash+=this.squashVel*o,this.shearVel.x+=(-r*r*this.shear.x-h*this.shearVel.x-$e.x*c)*o,this.shearVel.y+=(-r*r*this.shear.y-h*this.shearVel.y-$e.z*c)*o,this.shear.addScaledVector(this.shearVel,o),(this.hop>0||this.hopVel!==0)&&(this.hopVel-=22*o,this.hop+=this.hopVel*o,this.hop<=0&&(this.hop=0,this.hopVel<-1&&(this.squashVel-=Math.min(4,-this.hopVel*.55)),this.hopVel=0));this.squash=Math.max(-.45,Math.min(.6,this.squash)),this.shear.lengthSq()>.36*.36&&(this.shear.setLength(.36),this.shearVel.multiplyScalar(.5)),this.uniforms.uShear.value.set(this.shear.x,0,this.shear.y),this.uniforms.uBulge.value=.35+i*.45,this.uniforms.uPull.value.copy(this.pull),this.uniforms.uSquash.value=this.squash+(this.hopVel>0?Math.min(.18,this.hopVel*.04):0),this.front.position.y=this.hop,this.back.position.y=this.hop,this.outline&&(this.outline.position.y=this.hop);for(const d of this.caps)d.position.y=this.hop;if(this.face){this.blinkAt-=t,this.blinkAt<0&&(this.blinkAt=2.4+Math.random()*3.6);const d=this.blinkAt<.14?this.blinkAt/.14:1;this.uniforms.uBlink.value=this.blinkAt<.14?Math.abs(d*2-1):1}}get moving(){return this.dragging||this.holdStretch>0||this.pull.lengthSq()>1e-5||this.pullVel.lengthSq()>1e-5||Math.abs(this.squash)>1e-4||this.hop>0||this.shear.lengthSq()>1e-6||this.shearVel.lengthSq()>1e-5}dispose(){this.ownsGeometry&&this.front.geometry.dispose();for(const t of this.caps)t.geometry.dispose(),t.material.dispose();this.front.material.dispose(),this.back.material.dispose(),this.outline?.material?.dispose()}}const ze=`
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
`,Ei=`
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
`;let Ze=null;function $a(){if(Ze)return Ze;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.47)/.07)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.86)/.1))*.06;t[s]=Math.round(Math.min(1,.2+i*.74+a)*255)}return Ze=new gs(t,l,1,oo,vs),Ze.magFilter=te,Ze.minFilter=te,Ze.needsUpdate=!0,Ze}let Ke=null;function Za(){if(Ke)return Ke;const l=256,t=new Uint8Array(l);for(let s=0;s<l;s++){const e=s/(l-1),o=Math.min(1,Math.max(0,(e-.4)/.2)),i=o*o*(3-2*o),a=Math.min(1,Math.max(0,(e-.82)/.14))*.05;t[s]=Math.round(Math.min(1,.46+i*.5+a)*255)}return Ke=new gs(t,l,1,oo,vs),Ke.magFilter=te,Ke.minFilter=te,Ke.needsUpdate=!0,Ke}const Ka=`
uniform float uTime;
uniform float uWind;
attribute float aExtra;
vec3 windSway(vec3 p, float weight) {
  float phase = p.x * 0.45 + p.z * 0.38;
  vec3 offset = vec3(sin(uTime * 1.35 + phase), 0.0, cos(uTime * 1.05 + phase * 1.3)) * 0.055;
  offset.x += sin(uTime * 3.1 + phase * 2.0) * 0.012;
  return offset * weight * uWind;
}
`,_o={color:{value:new E("#fff6dc")},strength:{value:.42}};function Re(l,t={}){const s={vertexColors:t.vertexColors??!0,color:t.color?new E(t.color):16777215,...t.side!==void 0?{side:t.side}:{},emissive:t.emissive?new E(t.emissive):0,emissiveIntensity:t.emissiveIntensity??1},e=t.pbr?new Ot({...s,roughness:t.roughness??.88,metalness:0}):new bi({...s,gradientMap:t.anime?Za():$a()}),o={value:t.rim??(t.pbr?.12:t.anime?.2:.32)},i={value:new E(t.rimColor||"#fff6dc")},a={value:1};return e.onBeforeCompile=n=>{n.uniforms.uRim=o,n.uniforms.uRimColor=i,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uTime=l.uTime,n.uniforms.uWind=a,(t.caustics||t.rock||t.terrainDetail)&&(n.uniforms.uCausticColor=_o.color,n.uniforms.uCausticStrength=_o.strength,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCausticWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
vCausticWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`)),t.wind&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${Ka}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed += windSway(transformed, aExtra);`));const r=t.caustics||t.rock||t.terrainDetail?`
uniform float uTime;
uniform vec3 uCausticColor;
uniform float uCausticStrength;
varying vec3 vCausticWorld;
${ze}
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
`;function tn(){return{uWidth:{value:2},uResolution:{value:new vt(1,1)}}}function en(l,t,s,e={}){const o=l.getAttribute("position").count;l.getAttribute("aExtra")||l.setAttribute("aExtra",new q(new Float32Array(o),1)),l.getAttribute("color")||l.setAttribute("color",new q(new Float32Array(o*3).fill(.5),3));const i=new st({uniforms:{...ue.clone(de.fog),uWidth:s.uWidth,uWidthScale:{value:e.width??1},uResolution:s.uResolution,uTime:t.uTime,uWind:{value:1},uUseWind:{value:e.wind?1:0},uUseVertexColor:{value:e.vertexColors===!1?0:1},uInk:{value:new E(e.ink||"#24343a")},uTint:{value:e.tint??.55}},vertexShader:Qa,fragmentShader:Ja,side:os,fog:!0}),a=new U(l,i);return a.renderOrder=-1,a}function oi(l,t,s,e={}){const o=en(l.geometry,t,s,e);return l.add(o),o}const Go=`
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
${ze}
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
${ze}
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
`;function wo(l,t,s,e,o,i){const a=[],n=2.4+t()*1.4,r=4+Math.floor(t()*3);for(let m=0;m<r;m++){const g=r===1?0:m/(r-1)-.5;a.push({x:g*n,y:.25+t()*.2,z:(t()-.5)*.7,r:.62+t()*.3-Math.abs(g)*.35})}const h=1+Math.round(o*2);for(let m=1;m<=h;m++){const g=Math.max(1,Math.round((r-1)*(1-m/(h+1.2)))),b=n*(1-m/(h+1.6));for(let x=0;x<g;x++){const y=g===1?0:x/(g-1)-.5;a.push({x:y*b+(t()-.5)*.4,y:.35+m*(.62+t()*.22),z:(t()-.5)*.5,r:.7+t()*.32-m*.04})}}const c=a.length;for(let m=0;m<c;m++){const g=a[m];for(let b=0;b<3;b++){const x=t()*Math.PI*2;a.push({x:g.x+Math.cos(x)*g.r*.75,y:g.y+Math.abs(Math.sin(x))*g.r*.7,z:g.z+.2+t()*.2,r:g.r*(.34+t()*.2)})}}const u=a.reduce((m,g)=>Math.max(m,g.y+g.r),0),d=Math.cos(i),p=Math.sin(i),f={x:s.x,y:s.y+u*e*.32,z:s.z};for(const m of a){const g=m.x*e,b=m.z*e;l.push({x:s.x+g*d-b*p,y:s.y+m.y*e,z:s.z+g*p+b*d,r:m.r*e*1.3,h:Math.min(1,Math.max(0,m.y/Math.max(.01,u))),seed:t()*10,cx:f.x,cy:f.y,cz:f.z})}}function cn(l,t){const s=new nt,e={uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze},o=new U(new Q(460,40,20),new st({uniforms:{...e,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:sn,fragmentShader:on,side:os,depthWrite:!1,toneMapped:!1}));o.renderOrder=-10,s.add(o);const i=_e(41),a=t==="high"?620:300,n=new Float32Array(a*3),r=new Float32Array(a),h=new v;for(let T=0;T<a;T++){do h.set(i()*2-1,i()*.95+.04,i()*2-1);while(h.lengthSq()>1);h.normalize().multiplyScalar(420),n.set([h.x,h.y,h.z],T*3),r[T]=i()*10}const c=new xt;c.setAttribute("position",new q(n,3)),c.setAttribute("aSeed",new q(r,1));const u={uOpacity:{value:0},uScale:{value:1}},d=new be(c,new st({uniforms:{...u,uTime:l.uTime},vertexShader:an,fragmentShader:nn,transparent:!0,depthWrite:!1,blending:Qt}));d.renderOrder=-9,s.add(d);const p=new nt,f=_e(77),m=[],g=t==="high"?17:12;for(let T=0;T<g;T++){const _=T/g*Math.PI*2+f()*.25,W=300+f()*110,D=new v(Math.cos(_)*W,-5+f()*4,Math.sin(_)*W);wo(m,f,D,9+f()*9,.4+f()*1.1,-_+Math.PI/2)}const b=t==="high"?9:6;for(let T=0;T<b;T++){const _=T/b*Math.PI*2+.2+f()*.4,W=215+f()*50,D=new v(Math.cos(_)*W,3+f()*6,Math.sin(_)*W);wo(m,f,D,5+f()*4,.15+f()*.6,-_+Math.PI/2)}const x=t==="high"?8:5;for(let T=0;T<x;T++){const _=f()*Math.PI*2,W=190+f()*70,D=new v(Math.cos(_)*W,20+f()*16,Math.sin(_)*W);wo(m,f,D,2.6+f()*2.2,.1+f()*.3,-_+Math.PI/2)}m.sort((T,_)=>Math.hypot(_.x,_.z)-Math.hypot(T.x,T.z));const y=new Mi;y.setAttribute("position",new q(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),3)),y.setIndex([0,1,2,0,2,3]),y.setAttribute("aCenter",new We(new Float32Array(m.flatMap(T=>[T.x,T.y,T.z])),3)),y.setAttribute("aRadius",new We(new Float32Array(m.map(T=>T.r)),1)),y.setAttribute("aHeight",new We(new Float32Array(m.map(T=>T.h)),1)),y.setAttribute("aSeed",new We(new Float32Array(m.map(T=>T.seed)),1)),y.setAttribute("aCloud",new We(new Float32Array(m.flatMap(T=>[T.cx,T.cy,T.cz])),3)),y.instanceCount=m.length;const S={uLit:{value:new E("#ffffff")},uMid:{value:new E("#e3ebf8")},uShade:{value:new E("#aebde3")},uOpacity:{value:1}},A=new st({uniforms:{...S,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSunDir:l.uSunDir,uNight:l.uNight,uTime:l.uTime},vertexShader:rn,fragmentShader:ln,transparent:!0,depthWrite:!1}),C=new U(y,A);return C.renderOrder=-8,C.frustumCulled=!1,p.add(C),s.add(p),{group:s,uniforms:e,stars:d,clouds:p,starUniforms:u,cloudUniforms:S,dispose:()=>{o.geometry.dispose(),o.material.dispose(),c.dispose(),d.material.dispose(),C.geometry.dispose(),A.dispose()}}}const Zs=8,Ce=192,Fo=16,Io=2,Ks=.5;function hn(l){const t=new Uint8Array(Ce*Ce*4);for(let e=0;e<Ce;e++)for(let o=0;o<Ce;o++){const i=((o+.5)/Ce*2-1)*Fo,a=((e+.5)/Ce*2-1)*Fo;let n=Io;for(const h of l){let c=i-h.x,u=a-h.z;if(h.sx||h.sz){const d=Math.cos(h.yaw||0),p=Math.sin(h.yaw||0),f=c*d-u*p,m=c*p+u*d;c=f/(h.sx||1),u=m/(h.sz||1);const g=(Math.hypot(c,u)-1)*Math.min(h.sx||1,h.sz||1);n=Math.min(n,g);continue}n=Math.min(n,Math.hypot(c,u)-h.r)}const r=(e*Ce+o)*4;t[r]=Math.round(Math.min(1,Math.max(0,(n+Ks)/(Io+Ks)))*255),t[r+1]=0,t[r+2]=0,t[r+3]=255}const s=new gs(t,Ce,Ce,Oo,vs);return s.magFilter=te,s.minFilter=te,s.needsUpdate=!0,s}const ye=256,Kt=16,oe=8,Qs=3,Ri=.7;function un(){let l=4127;const t=()=>(l=l*16807%2147483647,l/2147483647),s=Float32Array.from({length:Kt*Kt},t),e=(c,u)=>s[(u%Kt+Kt)%Kt*Kt+(c%Kt+Kt)%Kt],o=(c,u)=>{const d=Math.floor(c),p=Math.floor(u),f=c-d,m=u-p,g=f*f*(3-2*f),b=m*m*(3-2*m),x=e(d,p),y=e(d+1,p),S=e(d,p+1),A=e(d+1,p+1);return x+(y-x)*g+(S-x)*b+(x-y-S+A)*g*b},i=(c,u)=>o(c,u)*.66+o(c*2,u*2)*.34,a=Array.from({length:oe*oe},()=>[.15+t()*.7,.15+t()*.7]),n=new Uint8Array(ye*ye*4),r=Kt/ye;for(let c=0;c<ye;c++)for(let u=0;u<ye;u++){const d=u*r,p=c*r,f=i(d,p),m=(i(d+r,p)-i(d-r,p))/(2*r),g=(i(d,p+r)-i(d,p-r))/(2*r),b=u/ye*oe,x=c/ye*oe,y=Math.floor(b),S=Math.floor(x);let A=9,C=9;for(let _=-1;_<=1;_++)for(let W=-1;W<=1;W++){const D=y+W,Y=S+_,V=a[(Y%oe+oe)%oe*oe+(D%oe+oe)%oe],G=Math.hypot(D+V[0]-b,Y+V[1]-x);G<A?(C=A,A=G):G<C&&(C=G)}const T=(c*ye+u)*4;n[T]=Math.round(Math.min(1,Math.max(0,m/(2*Qs)+.5))*255),n[T+1]=Math.round(Math.min(1,Math.max(0,g/(2*Qs)+.5))*255),n[T+2]=Math.round(Math.min(1,Math.max(0,f))*255),n[T+3]=Math.round(Math.min(1,(C-A)/Ri)*255)}const h=new gs(n,ye,ye,Oo,vs);return h.wrapS=h.wrapT=Si,h.magFilter=te,h.minFilter=yi,h.generateMipmaps=!0,h.needsUpdate=!0,h}function dn(l){const t=l==="high"?200:140,s=[];let e=5.2;for(;e<15;)s.push(e),e+=l==="high"?.28:.4;for(;e<520;)s.push(e),e*=l==="high"?1.075:1.1;s.push(520);const o=new Float32Array(s.length*t*3);s.forEach((n,r)=>{for(let h=0;h<t;h++){const c=h/t*Math.PI*2;o.set([Math.cos(c)*n,0,Math.sin(c)*n],(r*t+h)*3)}});const i=[];for(let n=0;n<s.length-1;n++){const r=n*t,h=(n+1)*t;for(let c=0;c<t;c++){const u=(c+1)%t;i.push(r+c,r+u,h+c,r+u,h+u,h+c)}}const a=new xt;return a.setAttribute("position",new q(o,3)),a.setIndex(i),a.computeBoundingSphere(),a}const fn=`
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
uniform vec4 uRipples[${Zs}];
uniform sampler2D uSeaNoise;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
varying vec2 vAxisX;
varying vec2 vAxisZ;
#include <fog_pars_fragment>
#ifdef RIPPLE_SIM
${Pi}
#endif
${ze}
${_s}
${Go}
${Ei}
// 高畫質每個像素自己算雜訊；手機與舊電腦讀那張雜訊圖（B 色版＝平滑雜訊，一格 ${Kt} 個單位）
#ifdef SEA_HIGH
  #define SEA_NOISE(p) vnoise(p)
#else
  #define SEA_NOISE(p) texture2D(uSeaNoise, (p) * ${(1/Kt).toFixed(4)}).b
#endif
// 光網（讀圖版）：兩層往不同方向慢慢飄、再用低頻的斜率扭一下
float seaCaustics(vec2 p, float t, float width) {
  #ifdef SEA_HIGH
    return caustics(p, t, width);
  #else
    vec2 warp = (texture2D(uSeaNoise, p * 0.021 + t * 0.002).rg - 0.5) * 1.1;
    // 再用跟格子差不多大的扭曲把直直的格子邊彎成曲線（不然看起來像碎玻璃）
    vec2 bend = (texture2D(uSeaNoise, p * 0.07 - t * 0.004 + 0.21).rg - 0.5) * 0.36;
    float a = texture2D(uSeaNoise, (p + warp + bend) * ${(1/oe).toFixed(4)} + vec2(t * 0.012, t * 0.007)).a;
    float b = texture2D(uSeaNoise, (p * 1.31 - warp - bend) * ${(1/oe).toFixed(4)} - vec2(t * 0.009, -t * 0.011) + 0.37).a;
    float e = min(a, b * 1.2) * ${Ri.toFixed(2)};
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
    vec2 g1 = (texture2D(uSeaNoise, q1 * ${(1/Kt).toFixed(4)}).rg - 0.5) * ${(2*Qs).toFixed(1)};
    vec2 g2 = (texture2D(uSeaNoise, q2 * ${(1/Kt).toFixed(4)} + 0.5).rg - 0.5) * ${(2*Qs).toFixed(1)};
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
  for (int i = 0; i < ${Zs}; i++) {
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
      float obstacle = texture2D(uFoamField, fieldUv).r * ${(Io+Ks).toFixed(2)} - ${Ks.toFixed(2)};
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
`;function yn(l,t,s,e,o=null,i=!1){const a=hn(s),n=un(),r=Array.from({length:Zs},()=>new Ne(0,0,-100,0));let h=0;const c={...ue.clone(de.fog),uCoast:{value:t},uFoamField:{value:a},uSeaNoise:{value:n},uShallow:{value:new E("#5fe3d6")},uMid:{value:new E("#16a5cf")},uDeep:{value:new E("#0a4f9e")},uFoam:{value:new E("#ffffff")},uSand:{value:new E("#f1dcae")},uGlowFoam:{value:new E("#7ff3ff")},uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,uSkyColor:l.uSkyColor,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTime:l.uTime,uNight:l.uNight,uRipples:{value:r},uSwellScale:{value:1},...o?o.uniforms:{},uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays},u=new st({uniforms:c,vertexShader:fn,fragmentShader:pn,transparent:!0,depthWrite:!1,side:Gt,fog:!0,defines:{...e==="high"?{SEA_HIGH:"",CAUSTIC_TWO_LAYERS:""}:{},...o?{RIPPLE_SIM:""}:{},...o&&i?{RIPPLE_VTF:""}:{}}}),d=new U(dn(e),u);d.renderOrder=2,d.frustumCulled=!1;const p=e==="high"?2200:1100,f=new Float32Array(p*3),m=new Float32Array(p*3);let g=9127;const b=()=>(g=g*16807%2147483647,g/2147483647);for(let A=0;A<p;A++){const C=Math.PI/2+(b()-.5)*4.2,T=9+Math.pow(b(),1.4)*150;f.set([Math.cos(C)*T,0,Math.sin(C)*T],A*3),m.set([b(),b(),b()],A*3)}const x=new xt;x.setAttribute("position",new q(f,3)),x.setAttribute("aSeed",new q(m,3));const y={uTime:l.uTime,uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir,uColor:{value:new E("#fffbef")}},S=new be(x,new st({uniforms:y,vertexShader:vn,fragmentShader:wn,transparent:!0,depthWrite:!1,blending:Qt}));return S.frustumCulled=!1,S.renderOrder=3,{mesh:d,uniforms:c,sparkles:S,sparkleUniforms:y,ripple:(A,C,T)=>{r[h].set(A,C,l.uTime.value,T),h=(h+1)%Zs},dispose:()=>{d.geometry.dispose(),u.dispose(),a.dispose(),n.dispose(),x.dispose(),S.material.dispose()}}}const ii=22;class Di{jelly;area;shadow;others;scale;state="idle";wait;target=new v;stepVel=new v;pauseBetweenHops=0;heldGoal=new v;velocity=new v;grabOffset=new v;lift=0;liftVel=0;swimTime=0;get sink(){return .28*this.scale}yawGoal=null;constructor(t,s,e,o,i){this.jelly=t,this.area=s,this.others=e,this.shadow=o,this.scale=t.group.scale.x,this.wait=.8+i%3*1.1,this.target.copy(t.group.position)}get position(){return this.jelly.group.position}get held(){return this.state==="held"}get swimming(){return this.state==="swim"}frozen=!1;floor(t,s){return Math.max(this.area.ground(t,s),this.area.seaLevel)}free(t,s,e=0){const o=Math.atan2(s,t);if(Math.hypot(t,s)>this.area.reach(o)-e)return!1;for(const[i,a,n]of this.area.blocked)if((t-i)**2+(s-a)**2<(n+e)**2)return!1;return!this.area.avoid?.(t,s)}pickTarget(){const t=this.position;for(let s=0;s<24;s++){const e=Math.random()*Math.PI*2,o=1.1+Math.random()*2.2,i=t.x+Math.cos(e)*o,a=t.z+Math.sin(e)*o;if(!this.free(i,a,.25))continue;let n=!0;for(let r=1;r<6&&n;r++){const h=r/6;this.free(t.x+(i-t.x)*h,t.z+(a-t.z)*h)||(n=!1)}if(n&&!this.others.some(r=>r!==this&&(Math.hypot(r.target.x-i,r.target.z-a)<1.3||Math.hypot(r.position.x-i,r.position.z-a)<1.1)))return this.target.set(i,0,a),!0}return!1}pause(){this.state==="walk"&&(this.state="idle"),this.wait=Math.max(this.wait,1.5)}hold(t){this.state="held",this.grabOffset.copy(t),this.heldGoal.copy(this.position),this.velocity.set(0,0,0),this.jelly.holdStretch=.32}holdTo(t){if(this.state!=="held")return;this.heldGoal.copy(t).sub(this.grabOffset);const s=Math.atan2(this.heldGoal.z,this.heldGoal.x),e=this.area.swimReach(s),o=Math.hypot(this.heldGoal.x,this.heldGoal.z);o>e&&(this.heldGoal.x*=e/o,this.heldGoal.z*=e/o);const i=this.floor(this.heldGoal.x,this.heldGoal.z);this.heldGoal.y=Math.min(i+4.5,Math.max(i+.55,this.heldGoal.y))}drop(){if(this.state!=="held")return;this.state="fall",this.jelly.holdStretch=0;const t=this.floor(this.position.x,this.position.z);this.lift=Math.max(0,this.position.y-t),this.liftVel=Math.max(-2,this.velocity.y)}update(t,s){const e=this.position,o=this.jelly;if(!this.frozen){if(this.state==="held")this.velocity.x+=((this.heldGoal.x-e.x)*90-this.velocity.x*14)*t,this.velocity.y+=((this.heldGoal.y-e.y)*90-this.velocity.y*14)*t,this.velocity.z+=((this.heldGoal.z-e.z)*90-this.velocity.z*14)*t,e.addScaledVector(this.velocity,t),o.swing(this.velocity,.05/this.scale),this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);else if(this.state==="fall"){if(this.liftVel-=ii*t,this.lift+=this.liftVel*t,e.x+=this.velocity.x*t*.3,e.z+=this.velocity.z*t*.3,this.velocity.multiplyScalar(Math.exp(-t*3)),o.swing(this.velocity,.03/this.scale),this.lift<=0){const i=-this.liftVel;this.lift=0,this.liftVel=0,this.area.ground(e.x,e.z)<this.area.seaLevel-.05?(this.state="swim",this.swimTime=0,o.land(i*.6),this.area.onSplash?.(e.clone(),i)):(o.land(i),this.unstick(),this.state="idle",this.wait=.8+Math.random()*1.2)}e.y=this.floor(e.x,e.z)+this.lift-(this.state==="swim"?this.sink:0)}else if(this.state==="swim"){this.swimTime+=t;const i=Math.atan2(e.z,e.x),a=Math.hypot(e.x,e.z);if(this.swimTime>1.1){const r=.9+this.scale*.4,h=Math.max(0,a-r*t)/Math.max(.001,a);e.x*=h,e.z*=h,this.yawGoal=Math.atan2(-e.x,-e.z)}else this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z);o.swing(new v(Math.sin(this.swimTime*3)*.4,0,0),.02/this.scale);const n=this.area.ground(e.x,e.z);if(e.y=this.area.seaLevel-this.sink+Math.sin(this.swimTime*2.6)*.04,n>this.area.seaLevel-.02){const r=this.area.reach(i)*.82;this.target.set(Math.cos(i)*r,0,Math.sin(i)*r),this.state="walk",this.pauseBetweenHops=.2,e.y=Math.max(n,this.area.seaLevel)-.02}}else if(this.state==="idle")e.y=this.area.ground(e.x,e.z)-.02,this.wait-=t,this.yawGoal=Math.atan2(s.x-e.x,s.z-e.z),this.wait<=0&&!o.dragging&&(this.pickTarget()?(this.state="walk",this.pauseBetweenHops=0):this.wait=.6);else if(this.state==="walk"){if(o.airborne)e.x+=this.stepVel.x*t,e.z+=this.stepVel.z*t;else{this.pauseBetweenHops-=t;const i=this.target.x-e.x,a=this.target.z-e.z,n=Math.hypot(i,a);if(n<.12)this.state="idle",this.wait=1.4+Math.random()*3.2;else if(this.pauseBetweenHops<=0){const r=3+Math.random()*.6,h=2*r/ii,c=Math.min(n,.42+this.scale*.2);this.stepVel.set(i/n*c/h,0,a/n*c/h),o.hopStep(r),this.pauseBetweenHops=.12+Math.random()*.14,this.yawGoal=Math.atan2(i,a)}}e.y=this.floor(e.x,e.z)-.02}if(this.yawGoal!==null){let i=this.yawGoal-o.group.rotation.y;i=Math.atan2(Math.sin(i),Math.cos(i)),o.group.rotation.y+=i*(1-Math.exp(-t*(this.state==="walk"?7:3)))}if(this.shadow){const i=this.area.ground(e.x,e.z),a=Math.max(0,e.y-i)+o.hopHeight;this.shadow.position.set(e.x,i+.035,e.z);const n=1/(1+a*.35);this.shadow.scale.setScalar(n),this.shadow.material.opacity=i<this.area.seaLevel?0:.32*n}}}unstick(){const t=this.position;for(const[s,e,o]of this.area.blocked){const i=t.x-s,a=t.z-e,n=Math.hypot(i,a);if(n<o){const r=(o+.05)/Math.max(.001,n);t.x=s+i*r,t.z=e+a*r}}this.target.copy(t)}}function Ni(l,t){const s=new DataView(t.bin);if(s.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const e=s.getUint32(4,!0),o=s.getUint32(8,!0),i=new v(s.getFloat32(12,!0),s.getFloat32(16,!0),s.getFloat32(20,!0)),a=m=>m+3&-4;let n=24;const r=new Int16Array(t.bin,n,e*3);n=a(n+e*6);const h=new Int8Array(t.bin,n,e*3);n=a(n+e*3);const c=new Uint16Array(t.bin,n,e*2);n=a(n+e*4);const u=e<65536?new Uint16Array(t.bin,n,o):new Uint32Array(t.bin,n,o),d=new xt;d.setAttribute("position",new q(r,3,!0)),d.setAttribute("normal",new q(h,3,!0)),d.setAttribute("uv",new q(c,2,!0)),d.setIndex(new q(u,1)),d.computeBoundingSphere();const p=new Ao(t.color);p.colorSpace=Lo,p.flipY=!1,p.anisotropy=4,p.needsUpdate=!0;let f=null;return t.normal&&(f=new Ao(t.normal),f.flipY=!1,f.needsUpdate=!0),{name:l,geometry:d,extent:i,map:p,normalMap:f}}async function xn(l){return Ni(l,await _i(l))}const bn=(l,t)=>t/(l.extent.y*2),Wi=`
uniform float uTime;
uniform float uWindStrength;
vec3 modelWind(vec3 p) {
  float w = pow(clamp(p.y * 0.5 + 0.5, 0.0, 1.0), 2.2) * uWindStrength;
  float phase = p.x * 1.7 + p.z * 1.3;
  return vec3((sin(uTime * 1.1 + phase) * 0.6 + sin(uTime * 2.7 + phase * 2.3) * 0.15) * w, 0.0, cos(uTime * 0.9 + phase) * 0.4 * w);
}
`;function Eo(l,t,s={}){const e=new Ot({map:t.map,normalMap:t.normalMap,roughness:.62,metalness:0,envMapIntensity:.9,...s.side!==void 0?{side:s.side}:{},...s.tint?{color:s.tint}:{}});t.normalMap&&e.normalScale.set(.6,.6);const o={value:s.wind||0},i={value:s.rim??.14},a={value:s.phase||0};return e.onBeforeCompile=n=>{n.uniforms.uTime=l.uTime,n.uniforms.uWindStrength=o,n.uniforms.uPhase=a,n.uniforms.uSunDir=l.uSunDir,n.uniforms.uRim=i,n.uniforms.uRimColor={value:new E("#fff0dc")},(s.wind||s.deform)&&(n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${Wi}
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
        #include <opaque_fragment>`)},e.customProgramCacheKey=()=>`larch-model-clay${s.wind?"-wind":""}${s.deform?`-${t.name}`:""}`,e.userData.phase=a,e}const Mn=`
uniform float uWidth;
uniform float uWidthScale;
uniform vec2 uResolution;
uniform float uUseWind;
uniform float uPhase;
${Wi}
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
`,Sn=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function zn(l,t,s,e={}){const o=new st({uniforms:{uWidth:t.uWidth,uWidthScale:{value:e.width??.55},uResolution:t.uResolution,uTime:l.uTime,uWindStrength:{value:e.wind||0},uUseWind:{value:e.wind?1:0},uPhase:e.phase||{value:0},uOpacity:e.opacity||{value:1},uInk:{value:new E(e.ink||"#2b1d2a")},fogColor:{value:new E},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:Mn.replace("DEFORM_BODY",e.deform||""),fragmentShader:Sn,side:os,fog:!0,transparent:!!e.opacity}),i=new U(s.geometry,o);return i.name=`${s.name}-outline`,s.add(i),i}const ms=81,Ve=6.6,Le=1.36,Ro=.6,Vi=-1.15,Li=1.55,yo=.02;class kn{size=ms;extent=Ve;data=new Float32Array(ms*ms);dirty=!1;get cell(){return 2*this.extent/(this.size-1)}pointX(t){return-this.extent+t*this.cell}pointZ(t){return-this.extent+t*this.cell}sample(t,s){if(!this.dirty)return 0;const e=this.size,o=(t+this.extent)/this.cell,i=(s+this.extent)/this.cell;if(o<=0||i<=0||o>=e-1||i>=e-1)return 0;const a=Math.floor(o),n=Math.floor(i),r=o-a,h=i-n,c=n*e+a,u=this.data;return(u[c]*(1-r)+u[c+1]*r)*(1-h)+(u[c+e]*(1-r)+u[c+e+1]*r)*h}clear(){this.data.fill(0),this.dirty=!1}snapshot(){return this.data.slice()}restore(t){this.data.set(t),this.dirty=t.some(s=>s!==0)}encode(){if(!this.dirty||!this.data.some(e=>Math.abs(e)>=yo/2))return"";const t=new Uint8Array(this.data.length);for(let e=0;e<this.data.length;e++)t[e]=(Math.max(-127,Math.min(127,Math.round(this.data[e]/yo)))+256)%256;let s="";for(let e=0;e<t.length;e+=4096)s+=String.fromCharCode(...t.subarray(e,e+4096));return btoa(s)}decode(t){if(this.clear(),!t)return!0;try{const s=atob(t);if(s.length!==this.data.length)return!1;for(let e=0;e<s.length;e++){const o=s.charCodeAt(e);this.data[e]=Math.max(Vi,Math.min(Li,(o>127?o-256:o)*yo))}return this.dirty=this.data.some(e=>e!==0),!0}catch{return this.clear(),!1}}}const Cn=`
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
`,Tn=`
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
${ze}
${_s}
#ifdef RIPPLE_SIM
${Pi}
#endif
void main() {
  // 跟捏地形的格子對齊：第 i 個格點在第 i 個像素的正中間
  vec2 p = vLocal.xz;
  vec2 uv = ((p + ${Ve.toFixed(3)}) / ${(2*Ve/(ms-1)).toFixed(5)} + 0.5) / ${ms.toFixed(1)};
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
`;function An(l,t,s){const e=ms,o=new Uint8Array(e*e),i=new gs(o,e,e,oo,vs);i.magFilter=te,i.minFilter=te,i.needsUpdate=!0;const a=new st({uniforms:{...ue.clone(de.fog),uPondDepth:{value:i},uTime:l.uTime,uNight:l.uNight,uShallow:t.uShallow,uDeep:t.uMid,uSand:t.uSand,uGlowFoam:t.uGlowFoam,uSunDir:l.uSunDir,uSunColor:l.uSunColor,uTop:l.uSkyTop,uHorizon:l.uSkyHorizon,uHaze:l.uSkyHaze,...s?s.uniforms:{}},vertexShader:Cn,fragmentShader:Tn,transparent:!0,depthWrite:!1,fog:!0,defines:s?{RIPPLE_SIM:""}:{}}),n=new Pe(2*Ve,2*Ve,1,1);n.rotateX(-Math.PI/2);const r=new U(n,a);r.position.y=Le,r.renderOrder=3,r.visible=!1,r.name="pond";const h=new Float32Array(e*e);return{mesh:r,update:(c,u)=>{let d=!1;for(let p=0;p<e;p++)for(let f=0;f<e;f++){const m=p*e+f,g=c.data[m],b=g<-.01?Math.max(0,Le-(u(c.pointX(f),c.pointZ(p))+g)):0;h[m]=b,o[m]=Math.round(Math.min(1,b/Ro)*255),o[m]>1&&(d=!0)}return i.needsUpdate=!0,r.visible=d,d},depthAt:(c,u)=>{if(!r.visible)return 0;const d=2*Ve/(e-1),p=(c+Ve)/d,f=(u+Ve)/d;if(p<=0||f<=0||p>=e-1||f>=e-1)return 0;const m=Math.floor(p),g=Math.floor(f),b=p-m,x=f-g,y=g*e+m;return(h[y]*(1-b)+h[y+1]*b)*(1-x)+(h[y+e]*(1-b)+h[y+e+1]*b)*x},dispose:()=>{n.dispose(),a.dispose(),i.dispose()}}}const ai=new Se,Pn=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2;class _n{items=[];add(t,s,e=[]){if(this.items.find(a=>a.object===t)){this.setBase(t,s);return}const i={object:t,followers:e,x:s.x,y:s.y,z:s.z,shear:new vt,shearVel:new vt,squash:0,squashVel:0,pop:1,matrix:new Se};this.items.push(i);for(const a of[t,...e])a.updateMatrix=function(){Ps.prototype.updateMatrix.call(this),this.matrix.premultiply(i.matrix)}}attach(t,s){const e=this.items.find(o=>o.object===t);!e||e.followers.includes(s)||(e.followers.push(s),s.updateMatrix=function(){Ps.prototype.updateMatrix.call(this),this.matrix.premultiply(e.matrix)})}objects(){return this.items.map(t=>t.object)}remove(t){const s=this.items.findIndex(o=>o.object===t);if(s<0)return;const[e]=this.items.splice(s,1);for(const o of[e.object,...e.followers])delete o.updateMatrix,o.updateMatrix()}setBase(t,s){const e=this.items.find(o=>o.object===t);e&&(e.x=s.x,e.y=s.y,e.z=s.z)}has(t){return this.items.some(s=>s.object===t)}poke(t,s=1){const e=this.items.find(i=>i.object===t);if(!e)return!1;const o=Math.random()*Math.PI*2;return e.squashVel-=2.4*s,e.shearVel.x+=Math.cos(o)*.9*s,e.shearVel.y+=Math.sin(o)*.9*s,!0}pop(t){const s=this.items.find(e=>e.object===t);s&&(s.pop=0,s.squashVel+=1.6)}nudgeAround(t,s,e,o){for(const i of this.items){const a=Math.hypot(i.x-t,i.z-s);if(a>e)continue;const n=(1-a/e)*o,r=a>.001?(i.x-t)/a:1,h=a>.001?(i.z-s)/a:0;i.shearVel.x+=r*n,i.shearVel.y+=h*n,i.squashVel-=n*.8}}update(t,s){const e=Math.min(1,Math.max(0,he.softness)),o=Math.PI*2*(3.2-e*1.4),i=2*(.2-e*.11)*o,a=Math.PI*2*(3.6-e*1.2),n=2*(.22-e*.1)*a,r=.035+e*.03,h=Math.max(1,Math.min(4,Math.ceil(t/(1/120)))),c=t/h;for(const u of this.items){if(!u.object.parent)continue;const d=s.alpha*u.z-s.omega*s.omega*u.x,p=-s.alpha*u.x-s.omega*s.omega*u.z;for(let x=0;x<h;x++)u.shearVel.x+=(-o*o*u.shear.x-i*u.shearVel.x-d*r)*c,u.shearVel.y+=(-o*o*u.shear.y-i*u.shearVel.y-p*r)*c,u.shear.addScaledVector(u.shearVel,c),u.squashVel+=(-a*a*u.squash-n*u.squashVel)*c,u.squash+=u.squashVel*c;u.shear.lengthSq()>.14*.14&&(u.shear.setLength(.14),u.shearVel.multiplyScalar(.6)),u.squash=Math.max(-.32,Math.min(.32,u.squash));let f=1;u.pop<1&&(u.pop=Math.min(1,u.pop+t/.42),f=Math.max(.001,Pn(u.pop)));const m=u.squash,g=(1+m)*f,b=f/Math.sqrt(Math.max(.3,1+m));u.matrix.makeTranslation(u.x,u.y,u.z).multiply(ai.set(b,u.shear.x*g,0,0,0,g,0,0,0,u.shear.y*g,b,0,0,0,0,1)).multiply(ai.makeTranslation(-u.x,-u.y,-u.z))}}get moving(){return this.items.some(t=>t.shear.lengthSq()>1e-6||Math.abs(t.squash)>1e-4||t.pop<1)}dispose(){for(const t of[...this.items])this.remove(t.object)}}const Js=20261108,ae={x:-2.7,z:-1.7,r:1.7,h:.9},Fn=[{x:1.7,z:-2.3,r:1.25,h:1.62},{x:3.35,z:.25,r:1.15,h:1.6},{x:.3,z:1.6,r:2.2,h:1.58}],js=1.18;function Lt(l){const t=Math.cos(l),s=Math.sin(l);return 7.05+.55*Jt(t*1.35+3.1,s*1.35+1.7,3)+.26*Math.sin(3*l+.8)+.16*Math.sin(5*l+2.1)}function In(l,t){return Math.abs(((l-t)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}function Do(l,t){let s=1.6+.14*Jt(l*.22+4,t*.22-2,3);s+=ae.h*Math.exp(-((l-ae.x)**2+(t-ae.z)**2)/(2*ae.r*ae.r));for(const e of Fn){const o=Math.exp(-((l-e.x)**2+(t-e.z)**2)/(2*e.r*e.r));s=Ae(s,e.h,o*.9)}return s}function ao(l){const t=Math.exp(-(In(l,js)**2)/.08000000000000002);return{ramp:t,edge:.8-.1*t,foot:.885+.04*t}}function ni(l,t){const s=Math.atan2(t,l),{edge:e}=ao(s);return 1-lt(e-.14,e-.035,Math.hypot(l,t)/Lt(s))}function Oi(l,t,s,e){const{ramp:o,edge:i,foot:a}=ao(e);if(l<=i){const r=lt(i-.07,i,l);return Do(t,s)-r*r*(.2-.12*o)}if(l<=a){const r=(l-i)/(a-i),h=Do(t,s)-(.2-.12*o),c=.5-.5*Math.cos(Math.PI*Math.pow(r,.78));return Ae(h,.42,Ae(c,r,o))}if(l<=1.04){const r=(l-a)/(1.04-a);return Ae(.42,-.24,Math.pow(r,1.12))+.04*Jt(t*.9,s*.9,2)}const n=ve((l-1.04)/.18);return Ae(-.24,-3.2,n*n*(3-2*n))}function Ft(l,t){const s=Math.atan2(t,l),e=Lt(s);return Oi(Math.hypot(l,t)/e,l,t,s)}const ri=[...Array.from({length:24},(l,t)=>Math.round((.03+t*.03)*1e3)/1e3),.745,.765,.78,.792,.805,.818,.832,.846,.86,.873,.89,.91,.935,.96,.985,1.01,1.04,1.08,1.12,1.17,1.22];function En(l){const t=[0,Do(0,0),0];for(const o of ri)for(let i=0;i<l;i++){const a=i/l*Math.PI*2,n=o*Lt(a),r=Math.cos(a)*n,h=Math.sin(a)*n;t.push(r,Oi(o,r,h,a),h)}const s=[];for(let o=0;o<l;o++)s.push(0,1+(o+1)%l,1+o);for(let o=0;o<ri.length-1;o++){const i=1+o*l,a=1+(o+1)*l;for(let n=0;n<l;n++){const r=(n+1)%l;s.push(i+n,i+r,a+n,i+r,a+r,a+n)}}const e=new xt;return e.setAttribute("position",new q(new Float32Array(t),3)),e.setIndex(s),e.computeVertexNormals(),e}function Ts(l,t){const s=Math.max(0,-3.2-t),e=Math.cos(l),o=Math.sin(l),i=lt(0,4,s);return Lt(l)*1.22+s*.115+i*(.75*Jt(e*1.6+t*.09,o*1.6-t*.07,3)+.35*Math.sin(t*.55+l*2))}const ie=-58;function Rn(l){const t=[];for(let i=-3.2;i>ie-2;i-=i>-18?.6:1.2)t.push(i);t.push(ie-2);const s=[];for(const i of t)for(let a=0;a<l;a++){const n=a/l*Math.PI*2,r=Ts(n,i);s.push(Math.cos(n)*r,i,Math.sin(n)*r)}const e=[];for(let i=0;i<t.length-1;i++){const a=i*l,n=(i+1)*l;for(let r=0;r<l;r++){const h=(r+1)%l;e.push(a+r,a+h,n+r,a+h,n+h,n+r)}}const o=new xt;return o.setAttribute("position",new q(new Float32Array(s),3)),o.setIndex(e),o.computeVertexNormals(),o}const Dn="#fbebcb",Gi="#a77548",Hs="#8a5c38",li="#fff3dd";function Nn(l,t=10){const s=new Q(1,t+2,t),e=s.getAttribute("position"),o=new v;for(let i=0;i<e.count;i++){o.fromBufferAttribute(e,i);const a=1+.18*Jt(o.x*1.7+l,o.z*1.7+o.y*1.3-l,2);o.multiplyScalar(a),o.y*=.72,e.setXYZ(i,o.x,o.y,o.z)}return s.computeVertexNormals(),s}function xe(l,t=16,s=12){return new Q(l,t,s)}function Ui(l){const t=Math.atan2(l.z,l.x),s=Math.hypot(l.x,l.z)/Lt(t),{ramp:e,edge:o,foot:i}=ao(t),a=Jt(l.x*.6,l.z*.6,2),n=zt("#86d46c","#aee88c",.45+a*.4+(l.y-1.6)*.3),r=zt("#9ade7e","#b8ec98",.5+a*.4),h=Math.sin(l.y*7.5+a*1.5)*.5+.5,c=zt("#efd6ae","#e2c290",h*.5),u=zt(Dn,"#f6dfb8",.5+a*.6),d=zt("#f0d9b4","#8fd0c4",lt(-.06,-2.6,l.y)),p=Ae(o+.012,i-.01,e),f=n.clone();return f.lerp(r,lt(o-.05,o,s)*(1-e)),f.lerp(c,lt(p-.004,p+.01,s)),f.lerp(u,lt(i-.012,i+.006,s)),f.lerp(d,lt(.985,1.03,s)),f}class Bi{solid=new kt;glow=new kt;pierParts=new kt;halos=[];chimneys=[];shadows=[];foamRings=[];rand=_e(Js);ground;constructor(t=Ft){this.ground=t}at(t,s){return this.ground(t,s)}tree({x:t,z:s},e,o){const i=this.at(t,s)-.05,a=new rt(.15,.24,1.6,10,5),n=a.getAttribute("position");for(let c=0;c<n.count;c++){const u=n.getY(c)+.8;n.setX(c,n.getX(c)+.14*(u/1.6)**2)}a.translate(0,.8,0),a.computeVertexNormals(),this.solid.add(a,Hs,N({x:t,y:i,z:s,s:e}));const r=new v(t+.1*e,i+2.05*e,s),h=(c,u,d,p)=>{this.solid.add(xe(p,20,14),(f,m)=>zt("#3f9a3e","#8fda62",m.y*.5+.5+.1*f.x),N({x:t+c*e,y:i+u*e,z:s+d*e,s:e}),.55+u*.18,{center:r,amount:.78})};h(.12,2,0,.95),h(.7,1.7,.25,.68),h(-.5,1.75,-.2,.72),h(.2,2.55,-.08,.62),h(-.2,1.65,.55,.55);for(const[c,u,d]of[[.55,2,.72],[-.35,2.25,.78],[.9,1.55,.55],[-.75,1.6,.45]])this.solid.add(xe(.13,10,8),o,N({x:t+c*e,y:i+u*e,z:s+d*e,s:e}),.9);this.shadows.push({x:t,z:s,r:1.5*e,o:.32})}palm({x:t,z:s},e,o,i){const a=this.at(t,s)-.05,n=Math.cos(i),r=Math.sin(i);let h=0,c=0,u=0;for(let p=0;p<8;p++){const f=new rt(.15-p*.008,.17-p*.008,.36,10,1),m=p/7;h=n*o*m*m*1.4,u=r*o*m*m*1.4,c=p*.33,this.solid.add(f,p%2?"#c99c64":"#b8874f",N({x:t+h*e,y:a+(c+.18)*e,z:s+u*e,rx:r*o*m*.5,rz:-n*o*m*.5,s:e}))}const d=a+(c+.36)*e;for(let p=0;p<7;p++){const f=p/7*Math.PI*2+.3,m=new Q(1,14,6);m.scale(1.15,.05,.3),m.translate(1,0,0),this.solid.add(m,g=>zt("#3d9f3f","#79cf55",ve(g.x*.5+.2)),N({x:t+h*e,y:d,z:s+u*e,ry:f,rz:-.42,s:e}),g=>ve(g.x*.6)*1.4)}for(let p=0;p<3;p++){const f=p*2.1;this.solid.add(xe(.13,10,8),"#7a5233",N({x:t+(h+Math.cos(f)*.17)*e,y:d-.14*e,z:s+(u+Math.sin(f)*.17)*e,s:e}))}this.shadows.push({x:t+h*e,z:s+u*e,r:1.2*e,o:.22})}house({x:t,z:s},e,o,i){const a=this.at(t,s),n=c=>{const u=Math.cos(e),d=Math.sin(e),p=c.x||0,f=c.z||0;return N({...c,x:t+p*u+f*d,y:a+(c.y||0),z:s-p*d+f*u,ry:(c.ry||0)+e})};this.solid.add(new mt(2.05,.24,1.75,2,.08),"#d9cdb8",n({y:.08})),this.solid.add(new mt(1.8,1.25,1.5,3,.12),li,n({y:.82}));const r=new rt(.86,.86,1.66,3,1);r.rotateZ(Math.PI/2),r.rotateX(-Math.PI/2),this.solid.add(r,li,n({y:1.62,s:[1.04,.82,.86]}));for(const c of[-1,1])this.solid.add(new mt(2.25,.15,1.36,2,.07),u=>zt(o,"#ffffff",u.y>.04?.14:0),n({y:1.9,z:c*.4,rx:c*.907}));this.solid.add(new mt(.28,.62,.28,2,.06),"#c46a4f",n({x:-.55,y:2.1,z:-.3}));const h=n({x:-.55,y:2.45,z:-.3}).elements;this.chimneys.push(new v(h[12],h[13],h[14])),this.solid.add(new mt(.44,.72,.1,2,.05),i,n({y:.56,z:.76})),this.solid.add(xe(.04,8,6),"#f2c14e",n({x:.12,y:.55,z:.82}));for(const c of[-.55,.55]){this.solid.add(new mt(.46,.46,.06,2,.04),"#ffffff",n({x:c,y:.98,z:.755})),this.glow.add(new mt(.34,.34,.05,2,.03),"#ffcf6e",n({x:c,y:.98,z:.78})),this.solid.add(new mt(.5,.1,.16,2,.04),Gi,n({x:c,y:.7,z:.82}));for(const p of[-.15,0,.15])this.solid.add(xe(.07,8,6),p===0?"#ffd166":"#ff8fab",n({x:c+p,y:.79,z:.84}));const d=n({x:c,y:.98,z:.85}).elements;this.halos.push(d[12],d[13],d[14])}this.shadows.push({x:t,z:s,r:1.9,o:.32})}windmillBody({x:t,z:s}){const e=this.at(t,s)-.05;this.solid.add(new rt(.62,.92,2.7,20,4),o=>zt("#f4e7cf","#e2cfaa",lt(.6,-1.3,o.y)),N({x:t,y:e+1.35,z:s}));for(const o of[.2,1.25])this.solid.add(new ss(.62+(1-o/1.35)*.28,.05,6,24),"#c9ad84",N({x:t,y:e+o,z:s,rx:Math.PI/2}));return this.solid.add(new Q(.8,20,10,0,Math.PI*2,0,Math.PI/2),"#e3584d",N({x:t,y:e+2.66,z:s,s:[1,.92,1]})),this.solid.add(new mt(.42,.66,.1,2,.05),Hs,N({x:t,y:e+.36,z:s+.9,rx:-.11})),this.glow.add(new mt(.26,.3,.06,2,.03),"#ffcf6e",N({x:t,y:e+1.55,z:s+.79,rx:-.11})),this.halos.push(t,e+1.55,s+.86),this.shadows.push({x:t,z:s,r:1.4,o:.3}),new v(t,e+2.42,s+.85)}pier(t){const s=Lt(t),e=new v(Math.cos(t),0,Math.sin(t)),o=Math.atan2(e.x,e.z),i=s*.93;for(let n=0;n<12;n++){const r=i+n*.32;this.pierParts.add(new mt(1.15,.07,.28,1,.03),n%3===1?"#b98a5a":"#c79a69",N({x:e.x*r,y:.42,z:e.z*r,ry:o}))}for(let n=0;n<4;n++){const r=i+.3+n*1.12;for(const h of[-1,1]){const c=Math.cos(t+Math.PI/2)*.52*h,u=Math.sin(t+Math.PI/2)*.52*h;this.pierParts.add(new rt(.075,.085,2,8,1),Hs,N({x:e.x*r+c,y:-.45,z:e.z*r+u})),this.foamRings.push({x:e.x*r+c,z:e.z*r+u,r:.1})}}const a=i+12*.32;return{x:e.x*(a+.8),z:e.z*(a+.8),yaw:o}}lighthouse({x:t,z:s}){const e=this.at(t,s)-.1;this.solid.add(new rt(.4,.55,2.3,16,6),o=>Math.floor((o.y+1.15)/.46)%2?"#ffffff":"#e8574b",N({x:t,y:e+1.15,z:s})),this.solid.add(new rt(.55,.55,.1,16,1),"#3f4a5a",N({x:t,y:e+2.33,z:s})),this.glow.add(new rt(.3,.3,.42,12,1),"#fff1a8",N({x:t,y:e+2.6,z:s})),this.solid.add(new ge(.42,.5,16),"#e8574b",N({x:t,y:e+3.06,z:s})),this.solid.add(xe(.08,8,6),"#f2c14e",N({x:t,y:e+3.36,z:s})),this.halos.push(t,e+2.6,s),this.shadows.push({x:t,z:s,r:.9,o:.28})}rock({x:t,z:s},e,o="#a9b6bf"){const i=this.at(t,s)-.12*e;this.solid.add(Nn(this.rand()*10),(a,n)=>zt("#7f8e98",o,n.y*.5+.55),N({x:t,y:i,z:s,ry:this.rand()*6,s:e})),this.foamRings.push({x:t,z:s,r:e*.95})}flower({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new rt(.015,.02,.24,4,1),"#4f9d3f",N({x:t,y:o+.12,z:s}),i=>ve(i.y/.24+.5)*.7);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;this.solid.add(xe(.06,6,4),e,N({x:t+Math.cos(a)*.065,y:o+.25,z:s+Math.sin(a)*.065,s:[1,.55,1]}),.75)}this.solid.add(xe(.045,6,4),"#ffd84d",N({x:t,y:o+.27,z:s}),.75)}bush({x:t,z:s},e){const o=this.at(t,s)-.05,i=new v(t,o+.2*e,s);for(const[a,n,r,h]of[[0,.3,0,.45],[.38,.22,.1,.34],[-.36,.24,-.05,.36]])this.solid.add(xe(h,14,10),(c,u)=>zt("#3d8f3a","#6cc451",u.y*.5+.5),N({x:t+a*e,y:o+n*e,z:s+r*e,s:e}),.25,{center:i,amount:.7});this.shadows.push({x:t,z:s,r:.75*e,o:.22})}stone({x:t,z:s},e){const o=this.at(t,s);this.solid.add(new rt(.3,.33,.1,12,1),zt("#efe2c6","#d8c8a8",this.rand()).getHex(),N({x:t,y:o+.02,z:s,ry:this.rand()*3,s:[e,1,e*(.8+this.rand()*.3)]}))}fence(t,s,e){for(let a=0;a<e;a++){const n=a/(e-1),r=Ae(t.x,s.x,n),h=Ae(t.z,s.z,n);this.solid.add(new mt(.12,.55,.12,1,.04),"#c99a68",N({x:r,y:this.at(r,h)+.25,z:h}))}const o=Math.hypot(s.x-t.x,s.z-t.z),i=Math.atan2(s.x-t.x,s.z-t.z);for(const a of[.2,.4]){const n=(t.x+s.x)/2,r=(t.z+s.z)/2;this.solid.add(new mt(.06,.07,o,1,.02),"#d8ab78",N({x:n,y:this.at(n,r)+a,z:r,ry:i}))}}}function Wn(){const l=new kt;l.add(xe(.16,12,10),"#8a5c38");for(let t=0;t<4;t++){const s=t/4*Math.PI*2;l.add(new mt(.09,1.55,.07,1,.03),"#9b6a42",N({x:Math.sin(s)*.8,y:Math.cos(s)*.8,rz:-s})),l.add(new mt(.36,1.12,.03,1,.012),e=>Math.abs(e.y)%.28<.04?"#e6d4b8":"#fffaf0",N({x:Math.sin(s)*.9+Math.cos(s)*.19,y:Math.cos(s)*.9-Math.sin(s)*.19,z:.02,rz:-s}))}return l.build()}function Vn(){const l=new Q(.42,28,18),t=["#ef4b4b","#ffffff","#ffd23f","#ffffff","#3d8bfd","#ffffff"],s=new kt;return s.add(l,e=>{if(Math.abs(e.y)>.36)return"#ffffff";const o=(Math.atan2(e.z,e.x)+Math.PI)/(Math.PI*2);return t[Math.floor(o*6)%6]}),s.build()}function qi(){const l=new kt;l.add(new mt(.86,.46,.58,2,.05),"#a3683c",N({y:.23})),l.add(new mt(.72,.03,.44,1,.01),"#4a2a14",N({y:.463}));for(const e of[-.3,.3])l.add(new mt(.08,.48,.6,1,.02),"#f2c14e",N({x:e,y:.24}));for(let e=0;e<7;e++)l.add(new rt(.07,.07,.025,10,1),"#ffd54a",N({x:-.26+e%4*.17,y:.47+(e>3?.03:0),z:-.12+(e>3?.14:0),rx:.2*(e%2)}));const t=new kt,s=new rt(.29,.29,.86,16,1,!1,0,Math.PI);s.rotateZ(Math.PI/2),t.add(s,"#b3743f",N({y:0,z:.29}));for(const e of[-.3,.3]){const o=new rt(.3,.3,.08,16,1,!1,0,Math.PI);o.rotateZ(Math.PI/2),t.add(o,"#f2c14e",N({x:e,z:.29}))}return t.add(new mt(.14,.16,.05,1,.02),"#f2c14e",N({y:.02,z:.6})),t.add(new mt(.86,.04,.58,1,.015),"#6e4122",N({y:.02,z:.29})),{base:l.build(),lid:t.build()}}function Ln(){const l=new kt,t=new Q(1,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2);return l.add(t,s=>s.y>-.18?"#ffffff":"#e8604c",N({s:[.55,.42,1.2]})),l.add(new mt(.9,.06,.24,1,.02),Gi,N({y:-.08})),l.add(new rt(.025,.025,1.3,6,1),Hs,N({x:.3,y:.1,rz:1.1})),l.build()}function On(){const l=document.createElement("canvas");l.width=l.height=64;const t=l.getContext("2d"),s=t.createRadialGradient(32,32,0,32,32,32);return s.addColorStop(0,"#ffffff"),s.addColorStop(.55,"#737373"),s.addColorStop(1,"#000000"),t.fillStyle=s,t.fillRect(0,0,64,64),new Vo(l)}const Gn=`
attribute vec3 color;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Un=`
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
`,Bn=`
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
`,qn=`
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
`,ci=`
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
`,hi=`
uniform vec3 uColor;
uniform float uOpacity;
varying float vFlicker;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.2) * uOpacity * vFlicker;
  gl_FragColor = vec4(uColor, a);
}
`,No=[{color:"#7fe0a0",deep:"#2f9a63",name:["薄荷","Mint"]},{color:"#ffa0c4",deep:"#d44d86",name:["草莓","Strawberry"]},{color:"#8cc8ff",deep:"#3b78d0",name:["汽水","Soda"]},{color:"#ffd36b",deep:"#d9902a",name:["檸檬","Lemon"]},{color:"#c7a8ff",deep:"#7a52d4",name:["葡萄","Grape"]}];async function jn(l,t,s=async()=>{}){const e=new nt;e.name="island";const o=new nt;e.add(o);const i=new Bi,a=new kn,n=(w,M)=>Ft(w,M)+a.sample(w,M),r=new _n;let h=null;const c=t.models||{},u=new Map,d=(w,M)=>{let P=u.get(w.name);P||(P=Eo(l,w,{wind:M.wind}),u.set(w.name,P));const I=new U(w.geometry,P),z=bn(w,M.height);I.scale.copy(w.extent).multiplyScalar(z);const R=M.y??Ft(M.x,M.z);return I.position.set(M.x,R+w.extent.y*z-(M.sink??.05),M.z),I.rotation.y=M.yaw,I.castShadow=!0,I.receiveShadow=!0,I.name=`model-${w.name}`,o.add(I),r.add(I,{x:M.x,y:R,z:M.z}),I},p=(w,M)=>(w.updateMatrix(),M.clone().applyMatrix4(w.matrix)),f=(w,M)=>{const P=w.geometry.getAttribute("position"),I=new v;let z=-1/0;for(let R=0;R<P.count;R++){const it=P.getX(R),Et=P.getY(R),ht=P.getZ(R),Xt=M(it,Et,ht);Xt>z&&(z=Xt,I.set(it,Et,ht))}return I},m=w=>{const M=w.geometry.getAttribute("position");let P=0,I=0,z=0,R=0,it=0,Et=0;for(let ht=0;ht<M.count;ht++){const Xt=M.getY(ht);Xt>.6&&(P+=M.getX(ht)*w.extent.x,I+=M.getZ(ht)*w.extent.z,z++),Xt<-.85&&(R+=M.getX(ht)*w.extent.x,it+=M.getZ(ht)*w.extent.z,Et++)}return Math.atan2(I/Math.max(1,z)-it/Math.max(1,Et),P/Math.max(1,z)-R/Math.max(1,Et))};i.solid.add(En(t.segments),Ui);const g=i.solid.vertexCount;await s();const b=1.7,x=-2.3,y=-.35,S=c.cottage;if(S){const w=d(S,{x:b,z:x,height:2.9,yaw:y-Math.PI/2,sink:.08});i.chimneys.push(p(w,f(S,(M,P)=>P))),i.shadows.push({x:b,z:x,r:1.9,o:.28})}else i.house({x:b,z:x},y,"#ec6a5c","#8f5a3a");let A;const C=c.windmill;if(C){const w=d(C,{x:ae.x,z:ae.z,height:3.3,yaw:0,sink:.12}),M=f(C,(I,z,R)=>z>.3?Math.hypot(I*C.extent.x,R*C.extent.z):-1),P=Math.atan2(M.x*C.extent.x,M.z*C.extent.z);w.rotation.y=-P,A=p(w,M),i.shadows.push({x:ae.x,z:ae.z,r:1.4,o:.28})}else A=i.windmillBody({x:ae.x,z:ae.z});const T=[[-4,-3.2,1],[.5,-4.5,.92],[4.2,-2.6,.86]],_=["tree","blossom","tree"],W=La(l),D=T.map(([w,M,P],I)=>{const z=3.1*P,R=Fi(_[I],I+1,W,z);return R.position.set(w,Ft(w,M)-.06,M),R.rotation.y=I*2.39+.6,o.add(R),r.add(R,{x:w,y:Ft(w,M)-.06,z:M}),i.shadows.push({x:w,z:M,r:1.5*P,o:.28}),{root:R,x:w,z:M,kind:_[I],height:z,scale:R.scale.x}}),Y=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"],V=_e(Js+7),G=-.9,H=3.75,j=[[b,x,1.45],[ae.x,ae.z,1.05],[G,H,.6],...T.map(([w,M])=>[w,M,.75])];let et=0;const bt=[];for(let w=0;w<300&&et<6;w++){const M=V()*Math.PI*2,P=Math.sqrt(V())*.7*Lt(M),I=Math.cos(M)*P,z=Math.sin(M)*P;if(!j.some(([R,it,Et])=>(I-R)**2+(z-it)**2<(Et+.4)**2)){for(let R=0;R<2;R++)i.flower({x:I+(V()-.5)*.35,z:z+(V()-.5)*.35},Y[Math.floor(V()*Y.length)]);bt.push([I,z,.5]),et++}}const Rt=[[2.5,5.2],[2,4.4],[1.45,3.65],[.85,3]];Rt.forEach(([w,M],P)=>i.stone({x:w,z:M},.95+P%2*.08));const Dt=[...j,...Rt.map(([w,M])=>[w,M,.42])],fe=2.45,wt=-.55,Yt=c.palm,ee=Yt?m(Yt):0,ct=[];for(const[w,M,P]of[[fe,1.05,.9],[wt,.95,.8]]){const I=Math.cos(w)*Lt(w)*.86,z=Math.sin(w)*Lt(w)*.86;if(ct.push([I,z]),!Yt){i.palm({x:I,z},M,P,w);continue}d(Yt,{x:I,z,height:3.6*M,yaw:ee-w,sink:.12,wind:.04}),i.shadows.push({x:I,z,r:1.1*M,o:.2})}const Ut=c.rocks;for(const[w,M,P]of[[.25,1,.5],[3,1,.55],[5.35,1.01,.5]]){const I=Math.cos(w)*Lt(w)*M,z=Math.sin(w)*Lt(w)*M;if(!Ut){i.rock({x:I,z},P);continue}d(Ut,{x:I,z,height:P*1.1,yaw:w*3.1,sink:P*.4}),i.foamRings.push({x:I,z,r:P*1.3})}const Nt=i.pier(js-.05);await s();const Wt=Re(l,{wind:!0,caustics:!0,pbr:!0,roughness:.82}),Bt=Re(l,{wind:!1,pbr:!0,roughness:.6}),Mt=new U(i.solid.build(!0),Wt);Mt.castShadow=!0,Mt.receiveShadow=!0,e.add(Mt);const ft=new U(i.pierParts.build(!0),Wt);ft.name="pier",ft.castShadow=!0,ft.receiveShadow=!0,e.add(ft);const qt={...ue.clone(de.fog),uNight:l.uNight},It=new U(i.glow.build(),new st({uniforms:qt,vertexShader:Gn,fragmentShader:Un,fog:!0}));o.add(It),await s();const Ct=Hn(l,t.detail,Dt,.05);o.add(Ct);const O=new xt;O.setAttribute("position",new q(new Float32Array(i.halos),3)),O.setAttribute("aSeed",new q(new Float32Array(i.halos.length/3).map((w,M)=>M*1.37),1));const $=new st({uniforms:{uSize:{value:260},uTime:l.uTime,uColor:{value:new E("#ffc861")},uOpacity:{value:0}},vertexShader:ci,fragmentShader:hi,transparent:!0,depthWrite:!1,blending:Qt}),at=new be(O,$);at.renderOrder=8,o.add(at);const ot=t.detail==="high"?36:18,J=new Float32Array(ot*3),ut=_e(Js+11);for(let w=0;w<ot;w++){const M=ut()*Math.PI*2,P=Math.sqrt(ut())*5.5,I=Math.cos(M)*P,z=Math.sin(M)*P;J.set([I,Ft(I,z)+.5+ut()*1.6,z],w*3)}const Tt=new xt;Tt.setAttribute("position",new q(J,3)),Tt.setAttribute("aSeed",new q(new Float32Array(ot).map((w,M)=>M*2.1),1));const Pt=new st({uniforms:{uSize:{value:70},uTime:l.uTime,uColor:{value:new E("#d9ff7a")},uOpacity:{value:0}},vertexShader:ci,fragmentShader:hi,transparent:!0,depthWrite:!1,blending:Qt}),dt=new be(Tt,Pt);dt.userData.base=J.slice(),dt.renderOrder=8,o.add(dt);const _t=On(),gt=new Xs({alphaMap:_t,color:"#1d3b2a",transparent:!0,depthWrite:!1,opacity:.3}),Z=[];for(const w of i.shadows){const M=new Pe(w.r*2,w.r*2);M.rotateX(-Math.PI/2),M.translate(w.x,Ft(w.x,w.z)+.03,w.z),Z.push(M)}const yt=new U(Xn(Z),gt);yt.renderOrder=1,o.add(yt);const pt=c.sails,tt=pt?new U(pt.geometry,Eo(l,pt,{side:Gt})):new U(Wn(),Bt);if(pt){const w=Math.max(pt.extent.y,pt.extent.z);tt.scale.copy(pt.extent).multiplyScalar(1.6/w),tt.rotation.order="ZYX",tt.rotation.y=Math.PI/2,tt.receiveShadow=!0}tt.position.copy(A),tt.castShadow=!0,o.add(tt),pt||oi(tt,l,t.outlines);const At=new U(new sa(1.5,24),new Xs({visible:!1,side:Gt}));At.position.copy(A).add(new v(0,0,.06)),o.add(At);const jt=o.children.find(w=>w.name==="model-windmill");jt&&(r.attach(jt,tt),r.attach(jt,At));const we=4.05,Fe=3.55,Vt=new U(Vn(),Re(l,{wind:!1,rim:.5}));Vt.position.set(we,Ft(we,Fe)+.4,Fe),Vt.visible=!1;const ws=qi(),Fs=Ft(G,H)-.02,$t=new U(ws.base,Bt);$t.position.set(G,Fs,H),$t.rotation.y=.35,$t.castShadow=!0;const is=new U(ws.lid,Bt);is.position.set(0,.46,-.29),$t.add(is),o.add($t),r.add($t,{x:G,y:Fs,z:H}),xo(o,gt,G,H,.7,.32);const Oe=1.95,ne=Ga(),ys=Lt(Oe)*1.16;ne.position.set(Math.cos(Oe)*ys,.04,Math.sin(Oe)*ys),o.add(ne),i.foamRings.push({x:ne.position.x,z:ne.position.z,r:.42});const re=new U(Ln(),Re(l,{wind:!1,side:Gt}));oi(re,l,t.outlines),re.position.set(Nt.x+Math.cos(js+Math.PI/2)*1.1,.05,Nt.z+Math.sin(js+Math.PI/2)*1.1),re.rotation.y=Nt.yaw+.25,e.add(re),await s();const le=[],Ge={ground:n,avoid:(w,M)=>(h?.depthAt(w,M)??0)>.03,reach:w=>Lt(w)*.6,blocked:[...j,...ct.map(([w,M])=>[w,M,.6])],seaLevel:0,swimReach:w=>Lt(w)*1.45,onSplash:(w,M)=>as.handler?.(w,M)},as={},ns=[],rs=(w,M,P,I,z=0)=>{w.group.position.set(M,Ft(M,P)-.02,P),w.group.scale.setScalar(I),w.group.rotation.y=z,o.add(w.group);const R=xo(o,gt,M,P,.95*I,.32);return le.push(w),ns.push(new Di(w,Ge,ns,R,le.length)),w},Ue=rs(new he("slime",No[0],l,{face:!0,seed:1}),.3,2.05,.78);rs(new he("slime",{color:"#ffa0c4",deep:"#d44d86"},l,{face:!0,seed:2}),-1.75,1.55,.58),rs(new he("slime",{color:"#8cc8ff",deep:"#3b78d0"},l,{face:!0,seed:3}),2.05,1.35,.62),await s();const Be=new Uint8Array(256);for(let w=0;w<256;w++){const M=(w/256-.5)*Math.PI*2;Be[w]=Math.round(ve((Lt(M)-5.5)/3)*255)}const Ht=new gs(Be,256,1,oo,vs);Ht.wrapS=Si,Ht.magFilter=te,Ht.minFilter=te,Ht.needsUpdate=!0,i.foamRings.push({x:re.position.x,z:re.position.z,r:0,sx:.5,sz:1.08,yaw:re.rotation.y});const St=t.ripples??null,pe=yn(l,Ht,i.foamRings,t.detail,St,!!t.vertexRipples),ls=pe.mesh,cs=pe.uniforms;e.add(ls);let hs=null;if(St){const w=i.foamRings;St.setWalls((M,P)=>{let I=lt(-.16,.02,Ft(M,P));for(const z of w){let R=M-z.x,it=P-z.z,Et;if(z.sx||z.sz){const ht=Math.cos(z.yaw||0),Xt=Math.sin(z.yaw||0),co=(R*ht-it*Xt)/(z.sx||1),ho=(R*Xt+it*ht)/(z.sz||1);Et=(Math.hypot(co,ho)-1)*Math.min(z.sx||1,z.sz||1)}else Et=Math.hypot(R,it)-z.r*.8;I=Math.max(I,1-lt(-.04,.06,Et))}return I}),hs=St.wallArray.slice()}h=An(l,cs,St),o.add(h.mesh);const qe=()=>{if(h.update(a,Ft),!St||!hs)return;const w=St.wallArray,M=St.size;if(w.set(hs),h.mesh.visible)for(let P=0;P<M;P++){const I=St.cellZ(P);if(!(Math.abs(I)>6.7))for(let z=0;z<M;z++){const R=St.cellX(z);Math.abs(R)>6.7||h.depthAt(R,I)>.004&&(w[P*M+z]=0)}}St.wallsChanged()},se=new v,xs=(w,M,P)=>{St?St.drop(w,M,-.11*P,.22+.14*Math.min(1.6,P)):(o.localToWorld(se.set(w,0,M)),pe.ripple(se.x,se.z,P))},Is=St?(w,M,P)=>{e.worldToLocal(se.set(w,0,M)),xs(se.x,se.z,P)}:pe.ripple,Ie=new v,je=(w,M,P,I,z)=>{if(!St){pe.ripple(P,I,z);return}e.worldToLocal(Ie.set(w,0,M)),e.worldToLocal(se.set(P,0,I));const R=Ie.distanceTo(se),it=Math.min(.05,.008+R*.06)*z;St.trail(Ie.x,Ie.z,se.x,se.z,-it,.2)};await s();const us=new kt;us.add(Rn(t.detail==="high"?128:72),(w,M)=>{const P=Jt(w.x*.35+w.y*.2,w.z*.35-w.y*.15,3),I=-w.y;let z=zt("#7d9ea6","#55707f",lt(4,40,I));return z.lerp(zt("#b9b393","#7f8c7a",lt(6,40,I)),lt(.3,.8,M.y)*.55),P<-.42&&(z=z.lerp(new E("#5fa88a"),.35)),z});const bs=new U(us.build(),Re(l,{wind:!1,rim:.12,caustics:!0,rock:!0}));e.add(bs);const He=9,Xe=i.chimneys.length*He,ce=new Float32Array(Xe*3),Zt=new Float32Array(Xe);for(let w=0;w<Xe;w++)Zt[w]=w%He/He;const me=new xt;me.setAttribute("position",new q(ce,3)),me.setAttribute("aAge",new q(Zt,1)),me.setAttribute("aSeed",new q(new Float32Array(Xe).map((w,M)=>M*.618034%1),1));const Es=new st({uniforms:{uScale:{value:1},uNight:l.uNight,uSunDir:l.uSunDir},vertexShader:Bn,fragmentShader:qn,transparent:!0,depthWrite:!1}),ds=new be(me,Es);ds.frustumCulled=!1,ds.renderOrder=7,o.add(ds);const Ms=[],Ye=Re(l,{wind:!1,rim:.4,emissive:"#5c6f80",emissiveIntensity:.25}),lo=new Q(.12,10,8);lo.scale(1.7,.75,.75);const Rs=new Q(.5,10,6);Rs.scale(.35,.05,1),Rs.translate(0,0,.42);const k=new kt;k.add(lo,"#ffffff"),k.add(new ge(.035,.12,6),"#f2b84b",N({x:.24,rz:-Math.PI/2}));const F=k.build(),L=new kt().add(Rs,w=>w.z>.7?"#4a5866":"#ffffff").build();for(let w=0;w<3;w++){const M=new nt,P=new U(F,Ye),I=new U(L,Ye),z=new U(L,Ye);z.scale.z=-1,M.add(P,I,z),M.scale.setScalar(.9+w*.12),o.add(M),Ms.push({group:M,left:I,right:z,radius:9+w*2.2,height:6.5+w*1.3,speed:.22+w*.05,phase:w*2.1})}const B=(w,M)=>{ne.position.y=.04+Math.sin(M*1.4)*.05,ne.rotation.set(Math.sin(M*1.1)*.1,Oe+M*.08,1.22+Math.sin(M*1.4+.6)*.08);for(let P=0;P<Xe;P++){const I=i.chimneys[Math.floor(P/He)];let z=Zt[P]+w*.22;z>1&&(z-=1),Zt[P]=z;const R=z*z;ce[P*3]=I.x+R*1.1+Math.sin(M*.8+P)*.08*z,ce[P*3+1]=I.y+z*2.1,ce[P*3+2]=I.z+R*.5}me.getAttribute("position").needsUpdate=!0,me.getAttribute("aAge").needsUpdate=!0;for(const P of Ms){const I=M*P.speed+P.phase;P.group.position.set(Math.cos(I)*P.radius,P.height+Math.sin(M*.9+P.phase)*.4,Math.sin(I)*P.radius),P.group.rotation.set(0,-I-Math.PI/2+Math.PI,Math.sin(M*.6+P.phase)*.15-.18);const z=Math.sin(M*7+P.phase*3)*.55;P.left.rotation.x=-z,P.right.rotation.x=z}},X=w=>{const M=r.objects().filter(R=>R.parent&&R.visible),P=w.intersectObjects(M,!0)[0];if(!P)return null;let I=P.object;for(;I&&!M.includes(I);)I=I.parent;if(!I)return null;const z=w.intersectObject(Mt,!1)[0];return z&&z.distance+.05<P.distance?null:{object:I,point:P.point.clone()}},K=w=>{let M=null,P=1/0;for(const I of le){const z=I.hit(w);z&&z.distance<P&&(P=z.distance,M={kind:"jelly",jelly:I,point:z.point.clone()})}for(const[I,z]of[["blades",At],["chest",$t],["bottle",ne]]){const R=w.intersectObject(z,!0)[0];R&&R.distance<P&&(P=R.distance,M={kind:I,point:R.point.clone()})}if(M){const I=w.intersectObject(Mt,!1)[0];if(I&&I.distance+.05<P)return null}return M};return{group:e,top:o,column:bs,sea:ls,seaUniforms:cs,jellies:le,walkers:ns,hero:Ue,blades:tt,ball:Vt,boat:re,pier:ft,halos:at,fireflies:dt,animate:B,ripple:Is,seaSparkles:pe.sparkles,seaSparkleUniforms:pe.sparkleUniforms,chest:{base:$t,lid:is,open:!1,angle:0,velocity:0},trees:D,bottle:ne,onSlimeSplash:w=>{as.handler=w},ground:n,sculpt:a,pond:h,wobble:r,ripples:St,rippleTrail:je,rippleLocal:xs,refreshWater:qe,hitProp:X,gulls:Ms.map(w=>w.group),kit:{env:l,outlines:t.outlines,detail:t.detail,terrain:Mt,terrainVertices:g,solid:Wt,still:Bt,shadowMaterial:gt,treeMaterials:W,models:c,placeModel:d,walkArea:Ge,protect:[...j,...Dt,...bt,...ct.map(([w,M])=>[w,M,.75])],grass:Ct,addShadow:(w,M,P,I)=>xo(o,gt,w,M,P,I)},bladeHub:A,pierEnd:Nt,materials:{solid:Wt},hitInteractive:K,hitLand:w=>{const M=w.intersectObject(Mt,!1)[0];return M&&M.point.y>-.05?M.point.clone():null},dispose:()=>{e.traverse(w=>{const M=w;M.geometry&&M.geometry.dispose();const P=M.material;Array.isArray(P)?P.forEach(I=>I.dispose?.()):P?.dispose?.()}),Ht.dispose(),_t.dispose(),h?.dispose(),r.dispose();for(const w of Object.values(c))w.map.dispose(),w.normalMap?.dispose();pe.dispose(),W.dispose()}}}function Hn(l,t,s,e=1){const o=new kt,i=_e(Js+23);for(let f=0;f<6;f++){const m=.15+i()*.13,g=new Pe(.06,m,1,3),b=g.getAttribute("position");for(let S=0;S<b.count;S++){const A=b.getY(S)+m/2,C=A/m;b.setXYZ(S,b.getX(S)*(1-C*.92),A,.08*C*C)}const x=f/6*Math.PI*2+i()*.6,y=.18+i()*.22;o.add(g,S=>zt("#46963d","#a8e679",ve(S.y/.26)),N({x:Math.cos(x)*.06,z:Math.sin(x)*.06,ry:x,rx:y}),S=>ve(S.y/.26))}const a=o.build(!0),n=a.getAttribute("normal");for(let f=0;f<n.count;f++)n.setXYZ(f,0,1,0);const r=new bi({vertexColors:!0,gradientMap:Re(l).gradientMap,side:Gt});r.onBeforeCompile=f=>{f.uniforms.uTime=l.uTime,f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aExtra;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec2 grassAt = vec2(0.0);
        #ifdef USE_INSTANCING
          grassAt = instanceMatrix[3].xz;
        #endif
        float grassPhase = grassAt.x * 0.8 + grassAt.y * 0.55;
        float gust = 0.55 + 0.45 * sin(uTime * 0.7 + grassAt.x * 0.25);
        transformed.x += sin(uTime * 1.9 + grassPhase) * 0.07 * aExtra * gust;
        transformed.z += cos(uTime * 1.5 + grassPhase * 1.2) * 0.05 * aExtra * gust;`)},r.customProgramCacheKey=()=>"l3d-grass";const h=Math.round((t==="high"?1300:600)*e),c=new es(a,r,h),u=new Ps,d=new E;let p=0;for(let f=0;f<h*5&&p<h;f++){const m=i()*Math.PI*2,{edge:g,foot:b,ramp:x}=ao(m),y=Ae(g-.03,b-.03,x),S=Math.sqrt(i())*y*Lt(m),A=Math.cos(m)*S,C=Math.sin(m)*S;s.some(([T,_,W])=>(A-T)**2+(C-_)**2<W*W)||(u.position.set(A,Ft(A,C)-.02,C),u.rotation.set(0,i()*Math.PI*2,0),u.scale.setScalar(.7+i()*.6),u.updateMatrix(),c.setMatrixAt(p,u.matrix),c.setColorAt(p,d.setRGB(.88+i()*.2,.92+i()*.14,.88+i()*.16)),p++)}return c.count=p,c.receiveShadow=!0,c}function xo(l,t,s,e,o,i){const a=new Pe(o*2,o*2);a.rotateX(-Math.PI/2);const n=new U(a,t.clone());return n.material.opacity=i,n.position.set(s,Ft(s,e)+.035,e),n.renderOrder=1,l.add(n),n}function Xn(l){const t=new kt;l.forEach(i=>t.add(i,"#000000"));const s=t.build(),e=s.getAttribute("position").count,o=new Float32Array(e*2);for(let i=0;i<e;i+=4)o.set([0,1,1,1,0,0,1,0],i*2);return s.setAttribute("uv",new q(o,2)),s}const Yn=3,$n=new v(0,1,0),Zn=l=>1+(1.9+1)*(l-1)**3+1.9*(l-1)**2,Kn=l=>l*l*(3-2*l);function Qn(l,t,s){const e=l.clone();if(e.clippingPlanes=[t],e.clipShadows=!0,s&&!l.transparent){e.side=Gt;const o=l.customProgramCacheKey();e.onBeforeCompile=(i,a)=>{l.onBeforeCompile.call(l,i,a),i.uniforms.uCutInner={value:s},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uCutInner;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
if (!gl_FrontFacing) gl_FragColor = vec4(uCutInner * (0.86 + 0.14 * sin(gl_FragCoord.x * 0.05) * sin(gl_FragCoord.y * 0.05)), 1.0);`)},e.customProgramCacheKey=()=>`${o}|cut`}return e}const bo=(l,t)=>l.traverse(s=>{t?s.layers.enable(0):s.layers.disable(0)});class Jn{cuts=[];isCut(t){return this.cuts.some(s=>s.root===t)}get count(){return this.cuts.length}cut(t,s,e){if(this.isCut(t)||!t.parent)return!1;for(;this.cuts.length>=Yn;)this.finish(this.cuts[0],!0);t.updateWorldMatrix(!0,!0);const o=new zi().setFromObject(t);if(o.isEmpty())return!1;const i=o.getSize(new v).length();let a=0,n=0;for(let g=0;g<8;g++){const b=new v(g&1?o.max.x:o.min.x,g&2?o.max.y:o.min.y,g&4?o.max.z:o.min.z);s.distanceToPoint(b)<0?a++:n++}if(!a||!n)return!1;const r=new Se().copy(t.matrixWorld).invert(),h=s.clone().applyMatrix4(r),u=(e.kind==="fall"?new v((o.min.x+o.max.x)/2,o.min.y,(o.min.z+o.max.z)/2):o.getCenter(new v)).clone().applyMatrix4(r),d=new Se().copy(t.parent.matrixWorld).invert(),p=e.inner?new E(e.inner).convertLinearToSRGB():null,f=[],m=[1,-1].map(g=>{const b=new Ys,x=t.clone(!0);x.name=`${t.name}-half`,x.traverse(A=>{const C=A;if(!C.isMesh)return;const T=_=>{const W=Qn(_,b,p);return f.push(W),W};if(Array.isArray(C.material)?C.material.some(_=>_ instanceof st):C.material instanceof st){C.visible=!1;return}C.material=Array.isArray(C.material)?C.material.map(T):T(C.material)}),bo(x,!0),t.parent.add(x);const y=s.normal.clone().multiplyScalar(g).transformDirection(d);y.y*=.25,y.lengthSq()<1e-6&&y.set(1,0,0),y.normalize();const S=new v().crossVectors($n,y);return S.lengthSq()<1e-6&&S.set(1,0,0),S.normalize(),{object:x,plane:b,localPlane:g>0?h.clone():h.clone().negate(),dir:y,axis:S,side:g}});return bo(t,!1),this.cuts.push({root:t,style:e,halves:m,t:0,pivot:u,baseScale:t.scale.clone(),size:i,materials:f,phase:"apart"}),this.update(0),!0}update(t){for(let s=this.cuts.length-1;s>=0;s--){const e=this.cuts[s];if(e.t+=t,e.phase==="grow"){const o=Math.min(1,e.t/1.6),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.root.scale.copy(e.baseScale).multiplyScalar(Math.max(.001,i)),o>=1&&this.cuts.splice(s,1);continue}this.place(e)&&this.finish(e)}}place(t){const{root:s,style:e,t:o}=t,i=e.kind==="fall";let a,n=1;if(o<.75)a=Zn(o/.75);else if(i){if(a=1,o>3.2&&(n=Math.max(.001,1-(o-3.2)/.4)),o>3.6)return!0}else if(a=o<2.9?1:1-Kn(Math.min(1,(o-2.9)/.7)),o>3.6)return!0;s.updateMatrix();const r=t.pivot.clone().applyMatrix4(s.matrix),h=i?0:Math.sin(o*2.4)*.03*t.size*Math.min(1,a);for(const c of t.halves){const u=c.object,d=new Me().setFromAxisAngle(c.axis,e.tilt*a);u.quaternion.copy(d).multiply(s.quaternion),u.position.copy(s.position).sub(r).applyQuaternion(d).add(r).addScaledVector(c.dir,e.push*t.size*a).add(new v(0,-(e.sink||0)*t.size*a+h*c.side,0)),u.scale.copy(s.scale).multiplyScalar(n),u.visible=s.visible,u.updateMatrixWorld(!0),c.plane.copy(c.localPlane).applyMatrix4(u.matrixWorld)}return!1}finish(t,s=!1){for(const o of t.halves)o.object.removeFromParent();for(const o of t.materials)o.dispose();if(t.materials.length=0,bo(t.root,!0),!s&&t.style.kind==="fall"&&t.phase==="apart"&&t.t>3.2){t.phase="grow",t.t=0,t.root.scale.setScalar(.001);return}t.root.scale.copy(t.baseScale);const e=this.cuts.indexOf(t);e>=0&&this.cuts.splice(e,1)}dispose(){for(const t of[...this.cuts])this.finish(t,!0);this.cuts.length=0}}const ui=18,Mo=2.6,tr=.98,zs=40,di=.16,er=[[/cottage/,{kind:"fall",inner:"#f3dfbf",tilt:.85,push:.08}],[/windmill/,{kind:"fall",inner:"#efe0c4",tilt:.8,push:.08}],[/palm/,{kind:"fall",inner:"#e7c98f",tilt:1.05,push:.06}],[/rocks/,{kind:"fall",inner:"#9aa3a8",tilt:.6,push:.1}]],sr=[[/cottage/,"#e8604c"],[/windmill/,"#f1e2c4"],[/sails|blades/,"#e9b56b"],[/palm/,"#7cc35b"],[/rocks/,"#b9b4a8"],[/whale/,"#8fb7ff"],[/serpent/,"#5ec6c0"],[/turtle/,"#ee9a83"],[/bottle/,"#bff3ec"]];class or{armed=!1;viewHeight=720;island;top;scene;camera;floating;hand;rising=-1;splits=[];leaves=[];drops=[];chops=new Map;wobbles=new Map;propCuts=new Jn;moods=new Map;propTargets=()=>[];dropGeometry=new Q(1,12,9);leafGeometry=new ki(1,0);materials=[];onArm;stroke=null;strokes=0;handGoal=null;handNdc=new vt(.4,-.3);handShown=0;handRoll=-.62;handDip=0;handMotion=new vt;trail;trailPositions;trailColors;trailPoints=[];clock=0;constructor(t,s,e,o){this.island=t,this.top=t.top,this.scene=s,this.camera=e,this.onArm=o,this.floating=fi(this.materials),this.floating.visible=!1,this.top.add(this.floating),this.hand=fi(this.materials,!0),this.hand.visible=!1,this.scene.add(this.hand);const i=new xt;this.trailPositions=new Float32Array(zs*2*3),this.trailColors=new Float32Array(zs*2*3),i.setAttribute("position",new q(this.trailPositions,3).setUsage(Te)),i.setAttribute("color",new q(this.trailColors,3).setUsage(Te));const a=[];for(let r=0;r<zs-1;r++){const h=r*2;a.push(h,h+1,h+2,h+1,h+3,h+2)}i.setIndex(a);const n=new Xs({vertexColors:!0,transparent:!0,blending:Qt,depthTest:!1,depthWrite:!1,fog:!1});this.materials.push(n),this.trail=new U(i,n),this.trail.frustumCulled=!1,this.trail.renderOrder=30,this.trail.visible=!1,this.scene.add(this.trail)}rise(){this.armed||(this.rising=0,this.floating.visible=!0)}putBack(){this.rising=-1,this.floating.visible=!1,this.stroke=null,this.armed&&(this.armed=!1,this.onArm(!1))}setHand(t,s=!1,e=!1){if(!t){this.handGoal=null;return}this.handGoal?(this.handGoal.ndc.copy(t),this.handGoal.down=s,this.handGoal.rest=e):this.handGoal={ndc:t.clone(),down:s,rest:e}}strokeBegin(t){this.stroke={id:++this.strokes,entered:new Map,chopped:new Set,props:new Map,lastDir:null,start:t.clone(),travelled:0},this.trailPoints.length=0,this.handNdc.copy(t)}strokeSample(t,s){const e=this.stroke;if(!e)return;const o=t.ray.direction.clone();this.trailPoints.push({ndc:s.clone(),t:this.clock}),this.trailPoints.length>zs&&this.trailPoints.shift(),e.travelled=Math.max(e.travelled,s.distanceTo(e.start));for(const n of this.cuttable(e.id)){const r=!!n.hit(t),h=e.entered.get(n);r&&!h?(e.entered.set(n,e.lastDir||o),n.cuts.length||this.setMood(n,1,1.4)):!r&&h&&(e.entered.delete(n),this.cutBody(n,h,o,t.ray.origin))}const i=this.hitTree(t);i&&!e.chopped.has(i.tree)&&(e.chopped.add(i.tree),this.chop(i.tree,i.point,t.ray.origin));const a=i?null:this.propHit(t);for(const[n,r]of e.props)n!==a?.root&&(e.props.delete(n),this.cutProp(n,r,o,t.ray.origin));a&&!e.props.has(a.root)&&(e.props.set(a.root,e.lastDir||o),this.touchProp(a.root,a.point)),e.lastDir=o}strokeEnd(t,s){const e=this.stroke;if(this.stroke=null,!e)return;const o=new v().setFromMatrixColumn(this.camera.matrixWorld,1);if(s){const i=this.cuttable(e.id).find(r=>r.hit(t));if(i){const r=t.ray.direction;this.cutBody(i,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin);return}const a=this.hitTree(t);if(a){this.chop(a.tree,a.point,t.ray.origin);return}const n=this.propHit(t);if(n){const r=t.ray.direction;this.cutProp(n.root,r.clone().addScaledVector(o,-.2).normalize(),r.clone().addScaledVector(o,.2).normalize(),t.ray.origin)}return}if(!(e.travelled<.05||!e.lastDir)){for(const[i,a]of e.entered)a.angleTo(e.lastDir)>.01&&this.cutBody(i,a,e.lastDir,t.ray.origin);for(const[i,a]of e.props)a.angleTo(e.lastDir)>.01&&this.cutProp(i,a,e.lastDir,t.ray.origin)}}cuttable(t){const s=[];for(const e of this.island.walkers)e.frozen||s.push(e.jelly);for(const e of this.splits)for(const o of e.pieces)o.stroke!==t&&o.body.cuts.length<4&&s.push(o.body);return s}cutBody(t,s,e,o){const i=new v().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new v().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize(),t.front.updateWorldMatrix(!0,!1);const a=new Ys().setFromNormalAndCoplanarPoint(i,o).applyMatrix4(new Se().copy(t.front.matrixWorld).invert()),n=new Ne(a.normal.x,a.normal.y,a.normal.z,-a.constant),r=t.split(n);if(!r)return;const h=this.island.walkers.find(x=>x.jelly===t);let c,u=null;if(h){const x=t.group,y=x.position.clone().add(new v(0,t.front.position.y*x.scale.x,0));c={walker:h,pieces:[],t:0,origin:y,quat:x.quaternion.clone(),scale:x.scale.x},this.splits.push(c),h.frozen=!0,x.visible=!1}else c=this.splits.find(x=>x.pieces.some(y=>y.body===t)),u=c.pieces.find(x=>x.body===t),c.pieces.splice(c.pieces.indexOf(u),1),this.top.remove(u.pivot),u.body.dispose();c.t=0;const d=c.scale,p=u?u.pivot.quaternion:c.quat,f=u?u.pivot.position.clone().sub(u.center.clone().multiplyScalar(d).applyQuaternion(p)):c.origin,m=new v(n.x,n.y,n.z).applyQuaternion(p);m.y*=.3,m.lengthSq()<1e-6&&m.set(1,0,0),m.normalize();const g=t.uniforms.uColor.value;r.forEach((x,y)=>{const S=y===0?-1:1,A=x.centroid(),C=new nt;C.position.copy(f).add(A.clone().multiplyScalar(d).applyQuaternion(p)),C.quaternion.copy(p),x.group.scale.setScalar(d),x.group.position.copy(A).multiplyScalar(-d),C.add(x.group),this.top.add(C),C.updateMatrixWorld(!0);const T=m.clone().multiplyScalar(S),_=(1.5+Math.random()*.6)*d,W=T.clone().multiplyScalar(_).add(new v(0,1.3+Math.random()*.5,0));u&&W.add(u.vel);const D=new v(0,1,0).cross(T).multiplyScalar(2.2+Math.random()*1.2);x.poke(),x.uniforms.uMood.value=2,c.pieces.push({body:x,pivot:C,center:A,vel:W,spin:D,samples:x.samplePoints(),stroke:this.stroke?.id??-1})});const b=f.clone().add(new v(0,t.height*d*.5,0));for(let x=0;x<7;x++){const y=new Ot({color:g.clone().offsetHSL(0,0,Math.random()*.12),roughness:.1,transparent:!0,opacity:.85,emissive:g,emissiveIntensity:.18});this.materials.push(y);const S=new U(this.dropGeometry,y),A=(.035+Math.random()*.04)*d*1.4;S.scale.setScalar(A),S.position.copy(b),this.top.add(S);const C=Math.random()*Math.PI*2;this.drops.push({mesh:S,vel:new v(Math.cos(C)*1.2,2.2+Math.random()*1.8,Math.sin(C)*1.2),t:0,size:A})}}hitTree(t){let s=null;for(const e of this.island.trees){const o=this.chops.get(e);if(o&&o.phase!=="stand")continue;const i=t.intersectObject(e.root,!0)[0];i&&(!s||i.distance<s.distance)&&(s={tree:e,point:this.top.worldToLocal(i.point.clone()),distance:i.distance})}return s}chop(t,s,e){let o=this.chops.get(t);if(o||(o={tree:t,hits:0,shake:0,shakeVel:0,axis:new v(1,0,0),fall:0,fallVel:0,phase:"stand",t:0,base:t.root.quaternion.clone()},this.chops.set(t,o)),o.phase!=="stand")return;o.hits+=1;const i=this.top.worldToLocal(e.clone()),a=new v(t.x-i.x,0,t.z-i.z).normalize();o.axis.set(a.z,0,-a.x),o.shakeVel+=3.2,this.burstLeaves(t,10+o.hits*4),o.hits>=3&&(o.phase="fall",o.fall=0,o.fallVel=.4,o.t=0)}burstLeaves(t,s){const e=Oa[t.kind];for(let o=0;o<s;o++){const i=new Ot({color:e.clone().offsetHSL(0,0,(Math.random()-.5)*.15),roughness:.8});this.materials.push(i);const a=new U(this.leafGeometry,i);a.scale.set(.09,.03,.06);const n=Math.random()*Math.PI*2;a.position.set(t.x+Math.cos(n)*.6,Ft(t.x,t.z)+t.height*(.55+Math.random()*.35),t.z+Math.sin(n)*.6),this.top.add(a),this.leaves.push({mesh:a,vel:new v(Math.cos(n)*(.6+Math.random()),1+Math.random()*1.6,Math.sin(n)*(.6+Math.random())),t:0,life:1.6+Math.random()*.8,spin:Math.random()*8-4})}}update(t,s){if(this.clock+=t,this.rising>=0){this.rising+=t;const e=this.island.chest.base,i=1-(1-Math.min(1,this.rising/.9))**3;this.floating.position.set(e.position.x,e.position.y+.25+i*1.1+Math.sin(s*3)*.03,e.position.z+.05),this.floating.rotation.set(Math.PI,s*3.2,.18),this.floating.scale.setScalar(.4+i*.6),this.rising>1.35&&(this.rising=-1,this.floating.visible=!1,this.armed=!0,this.handShown=0,this.onArm(!0))}this.updateHand(t,s);for(let e=this.splits.length-1;e>=0;e--)this.updateSplit(this.splits[e],t,s)&&this.splits.splice(e,1);for(let e=this.drops.length-1;e>=0;e--){const o=this.drops[e];o.t+=t,o.vel.y-=ui*t,o.mesh.position.addScaledVector(o.vel,t);const i=Math.max(Ft(o.mesh.position.x,o.mesh.position.z),0)+o.size*.4;if(o.mesh.position.y<i&&(o.mesh.position.y=i,o.vel.set(0,0,0),o.mesh.scale.set(o.size*1.5,o.size*.4,o.size*1.5)),o.t>1.1){const a=Math.max(.001,1-(o.t-1.1)/.4);o.mesh.scale.set(o.size*1.5*a,o.size*.4*a,o.size*1.5*a),o.t>1.5&&(this.top.remove(o.mesh),o.mesh.material.dispose(),this.drops.splice(e,1))}}for(let e=this.leaves.length-1;e>=0;e--){const o=this.leaves[e];o.t+=t,o.vel.y-=3.2*t,o.vel.x+=Math.sin(s*2+e)*t*.8,o.mesh.position.addScaledVector(o.vel,t),o.mesh.rotation.x+=o.spin*t,o.mesh.rotation.y+=o.spin*.7*t;const i=Ft(o.mesh.position.x,o.mesh.position.z)+.03;if(o.mesh.position.y<i&&(o.mesh.position.y=i,o.vel.set(0,0,0),o.spin=0),o.t>o.life){const a=1-(o.t-o.life)/.5,n=Math.max(.001,a);o.mesh.scale.set(.09*n,.03*n,.06*n),a<=0&&(this.top.remove(o.mesh),o.mesh.material.dispose(),this.leaves.splice(e,1))}}for(const e of this.chops.values())this.updateChop(e,t);this.propCuts.update(t);for(const[e,o]of this.moods){if(o-t>0){this.moods.set(e,o-t);continue}this.moods.delete(e),e.uniforms.uMood.value=0}for(const e of this.wobbles.values()){e.v+=(-e.s*150-e.v*8)*t,e.s+=e.v*t;const{object:o,base:i,s:a}=e;o.scale.set(i.x*(1-a*.5),i.y*(1+a),i.z*(1-a*.5)),Math.abs(a)<.002&&Math.abs(e.v)<.02&&(o.scale.copy(i),this.wobbles.delete(o))}}setMood(t,s,e){t.face&&(t.uniforms.uMood.value=s,this.moods.set(t,e))}propHit(t){const s=this.propTargets().filter(a=>!this.propCuts.isCut(a));if(!s.length)return null;const e=a=>{for(let n=a;n;n=n.parent)if(!n.visible)return!1;return!0},o=t.intersectObjects(s,!0).find(a=>a.object.isMesh&&e(a.object));if(!o)return null;const i=new Set(s);for(let a=o.object;a;a=a.parent)if(i.has(a))return{root:a,point:o.point.clone()};return null}touchProp(t,s){this.wobble(t,.3),this.chips(this.top.worldToLocal(s.clone()),this.chipColor(t),6)}chipColor(t){const s=t===this.island.blades?"blades":t===this.island.boat?"boat":t.name;return sr.find(([e])=>e.test(s))?.[1]||"#f1e2c4"}cutProp(t,s,e,o){const i=new v().crossVectors(s,e);i.lengthSq()<1e-10&&i.crossVectors(s,new v().setFromMatrixColumn(this.camera.matrixWorld,1)),i.normalize();const a=this.wobbles.get(t);a&&(t.scale.copy(a.base),this.wobbles.delete(t));const n=this.island,r=t===n.blades?{kind:"drift",inner:"#efd9a8",tilt:.5,push:.12,sink:.2}:t===n.boat?{kind:"drift",inner:"#f4e3c4",tilt:.45,push:.14,sink:.12}:t===n.ball?{kind:"drift",inner:"#fff6e0",tilt:.7,push:.16}:t===n.bottle?{kind:"drift",inner:null,tilt:.6,push:.16}:t===n.pier?{kind:"drift",inner:"#d9b17f",tilt:.28,push:.035,sink:.05}:t.name.startsWith("creature-")?{kind:"drift",inner:"#ffb3c1",tilt:.35,push:.12}:er.find(([c])=>c.test(t.name))?.[1]||{kind:"fall",inner:"#f3dfbf",tilt:.8,push:.08};if(!this.propCuts.cut(t,new Ys().setFromNormalAndCoplanarPoint(i,o),r))return;const h=new zi().setFromObject(t).getCenter(new v);this.chips(this.top.worldToLocal(h),this.chipColor(t),12)}wobble(t,s){let e=this.wobbles.get(t);e||(e={object:t,base:t.scale.clone(),s:0,v:0},this.wobbles.set(t,e)),e.v-=s*8}chips(t,s,e){const o=new E(s);for(let i=0;i<e;i++){const a=new Ot({color:o.clone().offsetHSL(0,0,(Math.random()-.5)*.18),roughness:.7});this.materials.push(a);const n=new U(this.leafGeometry,a),r=.035+Math.random()*.04;n.scale.setScalar(r),n.position.copy(t),n.rotation.set(Math.random()*6,Math.random()*6,0),this.top.add(n);const h=Math.random()*Math.PI*2;this.drops.push({mesh:n,vel:new v(Math.cos(h)*(.8+Math.random()),1.8+Math.random()*1.8,Math.sin(h)*(.8+Math.random())),t:0,size:r})}}updateSplit(t,s,e){t.t+=s;const o=t.t>2.8;if(o)for(const r of t.pieces)r.body.uniforms.uMood.value=1;const i=t.scale,a=new v;for(const r of t.pieces){const h=r.pivot;if(r.body.update(s,e),o){const d=t.origin.clone().add(r.center.clone().multiplyScalar(i).applyQuaternion(t.quat)),p=1-Math.exp(-s*7);h.position.lerp(d,p),h.quaternion.slerp(t.quat,p);continue}r.vel.y-=ui*s,h.position.addScaledVector(r.vel,s);const c=r.spin.length()*s;c>1e-5&&h.quaternion.premultiply(new Me().setFromAxisAngle(a.copy(r.spin).normalize(),c));let u=1/0;for(const d of r.samples)a.copy(d).sub(r.center).multiplyScalar(i).applyQuaternion(h.quaternion).add(h.position),u=Math.min(u,a.y-Math.max(Ft(a.x,a.z),0));if(u<0){h.position.y-=u,r.vel.y<-1.2?(r.body.land(-r.vel.y*1.4),r.vel.y*=-.28):r.vel.y=Math.max(0,r.vel.y);const d=Math.exp(-s*7);r.vel.x*=d,r.vel.z*=d,r.spin.multiplyScalar(Math.exp(-s*9))}else r.spin.multiplyScalar(Math.exp(-s*1.5))}if(t.t<3.5)return!1;for(const r of t.pieces)this.top.remove(r.pivot),r.body.dispose();const n=t.walker;return n.jelly.group.visible=!0,n.frozen=!1,n.jelly.land(6),this.setMood(n.jelly,1,1.6),!0}updateHand(t,s){const e=this.handGoal,o=this.armed&&e?1:0;if(this.handShown+=(o-this.handShown)*(1-Math.exp(-t*12)),this.handShown<.02&&!o){this.hand.visible=!1,this.trail.visible=!1,this.trailPoints.length=0;return}if(e){const p=this.handNdc.clone();e.rest?this.handNdc.lerp(e.ndc,1-Math.exp(-t*6)):this.handNdc.copy(e.ndc);const f=this.camera.aspect,m=new vt((this.handNdc.x-p.x)*f,this.handNdc.y-p.y).divideScalar(Math.max(t,1/240));this.handMotion.lerp(m,1-Math.exp(-t*14))}const i=this.handNdc.clone();e?.rest&&(i.y+=Math.sin(s*1.8)*.012);const a=this.handMotion.length();let n=-.62;a>.6&&(n=Math.atan2(this.handMotion.y,this.handMotion.x),Math.cos(n)<-.25&&(n+=Math.PI));let r=n-this.handRoll;r=Math.atan2(Math.sin(r),Math.cos(r)),this.handRoll+=r*(1-Math.exp(-t*(a>.6?16:6))),this.handDip+=((e?.down?1:0)-this.handDip)*(1-Math.exp(-t*14));const h=this.rayAt(i),c=this.camera,u=2*Mo*Math.tan(c.fov*Math.PI/360)/Math.max(1,this.viewHeight),d=Math.min(170,Math.max(88,Math.min(this.viewHeight*.2,this.viewHeight*c.aspect*.32)));this.hand.visible=!0,this.hand.position.copy(h.origin).addScaledVector(h.direction,Mo),this.hand.quaternion.copy(c.quaternion),this.hand.rotateZ(this.handRoll),this.hand.rotateX(.55-this.handDip*.35),this.hand.scale.setScalar(d*u/tr*(.9+this.handShown*.1)*Math.max(.001,this.handShown)),this.updateTrail(u)}rayAt(t){const s=new v().setFromMatrixPosition(this.camera.matrixWorld),e=new v(t.x,t.y,.5).unproject(this.camera).sub(s).normalize();return{origin:s,direction:e}}updateTrail(t){for(;this.trailPoints.length&&this.clock-this.trailPoints[0].t>di;)this.trailPoints.shift();const s=this.trailPoints;if(s.length<2){this.trail.visible=!1;return}this.trail.visible=!0;const e=new v().setFromMatrixColumn(this.camera.matrixWorld,0),o=new v().setFromMatrixColumn(this.camera.matrixWorld,1),i=s.map(h=>{const c=this.rayAt(h.ndc);return c.origin.addScaledVector(c.direction,Mo+.05)}),a=new E("#fff4fb"),n=this.camera.aspect;for(let h=0;h<zs;h++){const c=Math.min(h,i.length-1),u=i[c],d=s[Math.max(0,c-1)].ndc,p=s[Math.min(s.length-1,c+1)].ndc,f=new vt((p.x-d.x)*n,p.y-d.y);f.lengthSq()<1e-10&&f.set(1,0),f.normalize();const m=(this.clock-s[c].t)/di,g=Math.max(0,1-m)*(c/Math.max(1,i.length-1)),b=t*9*g,x=e.clone().multiplyScalar(-f.y*b).addScaledVector(o,f.x*b),y=u.clone().add(x),S=u.clone().sub(x);this.trailPositions.set([y.x,y.y,y.z,S.x,S.y,S.z],h*6);const A=a.clone().multiplyScalar(g*.9);this.trailColors.set([A.r,A.g,A.b,A.r,A.g,A.b],h*6)}const r=this.trail.geometry;r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}updateChop(t,s){const e=t.tree.root;if(t.t+=s,t.phase==="stand")t.shakeVel+=(-t.shake*60-t.shakeVel*7)*s,t.shake+=t.shakeVel*s,e.quaternion.copy(t.base).premultiply(new Me().setFromAxisAngle(t.axis,t.shake*.12));else if(t.phase==="fall")t.fallVel+=(2.4+t.fall*6)*s,t.fall+=t.fallVel*s,t.fall>=Math.PI/2-.08&&(t.fall=Math.PI/2-.08,t.fallVel*=-.25,Math.abs(t.fallVel)<.15&&(t.phase="down",t.t=0,this.burstLeaves(t.tree,18))),e.quaternion.copy(t.base).premultiply(new Me().setFromAxisAngle(t.axis,t.fall));else if(t.phase==="down")t.t>2.4&&(t.phase="shrink",t.t=0);else if(t.phase==="shrink"){const o=Math.min(1,t.t/.5);e.scale.setScalar(t.tree.scale*Math.max(.001,1-o)),o>=1&&(t.phase="grow",t.t=0,e.quaternion.copy(t.base))}else if(t.phase==="grow"){const o=Math.min(1,t.t/1.8),i=o===1?1:1-Math.cos(o*Math.PI*2.6)*Math.exp(-o*5.5);e.scale.setScalar(t.tree.scale*Math.max(.001,i)),o>=1&&this.chops.delete(t.tree)}}get pieces(){return this.splits.reduce((t,s)=>t+s.pieces.length,0)}get propsCut(){return this.propCuts.count}dispose(){this.propCuts.dispose(),this.top.remove(this.floating),this.scene.remove(this.hand,this.trail);for(const t of this.splits)for(const s of t.pieces)this.top.remove(s.pivot),s.body.dispose();for(const t of this.materials)t.dispose();for(const t of[this.floating,this.hand])t.traverse(s=>{s.geometry?.dispose()});this.trail.geometry.dispose(),this.dropGeometry.dispose(),this.leafGeometry.dispose()}}const So="none";function fi(l,t=!1){const s=new nt;s.name=t?"knife-hand":"knife";const e=new Ot({color:"#eef3fb",metalness:.7,roughness:.2,emissive:"#cfdcff",emissiveIntensity:t?.32:.18,fog:!t}),o=new Ot({color:"#ffffff",metalness:.4,roughness:.1,emissive:"#ffffff",emissiveIntensity:.45,fog:!t}),i=new Ot({color:"#f2c14e",metalness:.6,roughness:.3,fog:!t}),a=new Ot({color:"#ff8fb1",roughness:.45,emissive:"#ff5f95",emissiveIntensity:.12,fog:!t}),n=new Ot({color:"#fff1d6",roughness:.35,fog:!t});l.push(e,o,i,a,n);const r=new oa;r.moveTo(-.06,.56),r.lineTo(-.06,.16),r.quadraticCurveTo(-.055,.04,.012,0),r.quadraticCurveTo(.085,.16,.08,.56),r.closePath();const h=new ia(r,{depth:.016,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:10});h.translate(0,0,-.008);const c=new U(new rt(.006,.006,.42,6),o);c.position.set(.05,.34,.018),c.rotation.z=.03;const u=[[new U(h,e),0],[c,0],[new U(new mt(.2,.05,.07,2,.022),i),.585],[new U(new mt(.13,.36,.075,3,.05),a),.79]];for(const[d,p]of u)d.position.y+=p,d.castShadow=!t,s.add(d);for(const d of[.71,.86]){const p=new U(new Q(.018,10,8),n);p.position.set(0,d,.04),s.add(p)}return t&&s.traverse(d=>{d.renderOrder=31}),s}function ji(l){return 9.9+Math.max(0,-3.2-l)*.115+1.1}const to=-.55,eo=-1.6,Hi=-51,ir=l=>l<.5?2*l*l:1-(-2*l+2)**2/2;function De(l,t=new v,s=new v){const e=Math.min(1,Math.max(0,l)),o=eo+(Hi-eo)*ir(e),i=to+1.75*e,a=ji(o)+8.2+2.2*e;t.set(Math.sin(i)*a,o,Math.cos(i)*a);const n=Math.cos(i),r=-Math.sin(i),h=-Math.sin(i),c=-Math.cos(i),u=9+3*e,d=3.4-1.6*e;return s.set(t.x+n*u+h*d,o-2.2-3.2*e*e,t.z+r*u+c*d),{position:t,target:s}}function Qe(l,t,s,e){const{position:o,target:i}=De(l),a=i.clone().sub(o).setY(0).normalize(),n=new v(-a.z,0,a.x);return o.clone().addScaledVector(a,t).addScaledVector(n,s).setY(o.y+e)}const fs=2048,Je=2.1;class so{mesh;count;pos;vel;scale;fear;cellOf;cellStart=new Int32Array(fs+1);fill=new Int32Array(fs);sorted;goal=new v;options;phase;m=new Se;fwd=new v;side=new v;upv=new v;at=new v;static UP=new v(0,1,0);constructor(t,s,e){this.options=e,this.count=e.count;const o=_e(e.seed);this.phase=o()*10;const i=t.clone(),a=new Float32Array(this.count);this.mesh=new es(i,s,this.count),this.mesh.frustumCulled=!1,this.pos=new Float32Array(this.count*3),this.vel=new Float32Array(this.count*3),this.scale=new Float32Array(this.count),this.fear=new Float32Array(this.count),this.cellOf=new Int32Array(this.count),this.sorted=new Int32Array(this.count);const n=new E,{home:r}=e;for(let h=0;h<this.count;h++){const c=o()*Math.PI*2,u=Math.cbrt(o())*3.2;this.pos.set([r.x+Math.cos(c)*u,r.y+(o()-.5)*2.2,r.z+Math.sin(c)*u],h*3),this.vel.set([1.8+o()*.4,0,(o()-.5)*.6],h*3),this.scale[h]=e.size*(.8+o()*.4),a[h]=o()*20,n.set(e.colors[Math.floor(o()*e.colors.length)]).offsetHSL((o()-.5)*.03,0,(o()-.5)*.08),this.mesh.setColorAt(h,n)}i.setAttribute("aPhase",new We(a,1))}hash(t,s,e){const o=Math.floor(t/Je),i=Math.floor(s/Je),a=Math.floor(e/Je);return(o*73856093^i*19349663^a*83492791)>>>0&fs-1}bucket(){const t=this.cellStart;t.fill(0);for(let e=0;e<this.count;e++){const o=e*3,i=this.hash(this.pos[o],this.pos[o+1],this.pos[o+2]);this.cellOf[e]=i,t[i+1]++}for(let e=0;e<fs;e++)t[e+1]+=t[e];const s=this.fill;s.set(t.subarray(0,fs));for(let e=0;e<this.count;e++)this.sorted[s[this.cellOf[e]]++]=e}update(t,s,e){t=Math.min(t,1/24);const o=this.options,i=s*.14+this.phase;this.goal.set(o.home.x+Math.sin(i)*o.roam,o.home.y+Math.sin(i*1.9+1)*o.lift,o.home.z+Math.sin(i*2)*o.roam*.55),this.bucket();const a=Je,n=a*a,r=.95*.95,h=Math.cbrt(this.count)*.75;for(let c=0;c<this.count;c++){const u=c*3,d=this.pos[u],p=this.pos[u+1],f=this.pos[u+2];let m=0,g=0,b=0,x=0,y=0,S=0,A=0,C=0,T=0,_=0;const W=Math.floor(d/Je),D=Math.floor(p/Je),Y=Math.floor(f/Je);for(let ft=-1;ft<=1;ft++)for(let qt=-1;qt<=1;qt++)for(let It=-1;It<=1;It++){const Ct=((W+ft)*73856093^(D+qt)*19349663^(Y+It)*83492791)>>>0&fs-1;for(let O=this.cellStart[Ct],$=this.cellStart[Ct+1];O<$;O++){const at=this.sorted[O];if(at===c)continue;const ot=at*3,J=this.pos[ot]-d,ut=this.pos[ot+1]-p,Tt=this.pos[ot+2]-f,Pt=J*J+ut*ut+Tt*Tt;if(!(Pt>n)){if(m+=J,g+=ut,b+=Tt,x+=this.vel[ot],y+=this.vel[ot+1],S+=this.vel[ot+2],_++,Pt<r){const dt=1/Math.max(Pt,.01);A-=J*dt,C-=ut*dt,T-=Tt*dt}if(_>14)break}}}let V=this.vel[u],G=this.vel[u+1],H=this.vel[u+2],j=0,et=0,bt=0;_&&(j+=m/_*.3+(x/_-V)*1.1,et+=g/_*.3+(y/_-G)*1.1,bt+=b/_*.3+(S/_-H)*1.1),j+=A*.45,et+=C*.45,bt+=T*.45;const Rt=this.goal.x-d,Dt=this.goal.y-p,fe=this.goal.z-f,wt=Math.hypot(Rt,Dt,fe)||1,Yt=Math.min(2.6,Math.max(0,wt-h)*.35+.35);j+=Rt/wt*Yt,et+=Dt/wt*Yt,bt+=fe/wt*Yt;let ee=this.fear[c]*Math.exp(-t*1.6);if(e&&e.strength>0){const ft=d-e.origin.x,qt=p-e.origin.y,It=f-e.origin.z,Ct=ft*e.dir.x+qt*e.dir.y+It*e.dir.z;if(Ct>0){const O=ft-e.dir.x*Ct,$=qt-e.dir.y*Ct,at=It-e.dir.z*Ct,ot=Math.hypot(O,$,at),J=2.4+Ct*.06;if(ot<J){const ut=(1-ot/J)*16*e.strength/Math.max(ot,.25);j+=O*ut,et+=$*ut*.7,bt+=at*ut,ee=Math.max(ee,(1-ot/J)*e.strength)}}}this.fear[c]=ee;const ct=o.floor(d,f)+.7;p<ct+.4&&(et+=(ct+.4-p)*7),p>o.ceiling&&(et-=(p-o.ceiling)*5);const Ut=Math.hypot(d,f),Nt=o.column(Math.atan2(f,d),p)+1.3;if(Ut<Nt){const ft=(Nt-Ut)*6/Math.max(Ut,.5);j+=d*ft,bt+=f*ft}V+=j*t*2.4,G+=et*t*2.4,H+=bt*t*2.4,G*=Math.exp(-1.4*t);const Wt=Math.hypot(V,G,H)||1,Bt=Math.min(Math.max(Wt,1.5),3.1+ee*5);V*=Bt/Wt,G*=Bt/Wt,H*=Bt/Wt,this.vel[u]=V,this.vel[u+1]=G,this.vel[u+2]=H,this.pos[u]=d+V*t,this.pos[u+1]=Math.max(ct-.3,p+G*t),this.pos[u+2]=f+H*t,this.fwd.set(V,G*.55,H).normalize(),this.side.crossVectors(this.fwd,so.UP).normalize(),this.upv.crossVectors(this.side,this.fwd);const Mt=this.scale[c];this.m.makeBasis(this.fwd.multiplyScalar(Mt),this.upv.multiplyScalar(Mt),this.side.multiplyScalar(Mt)),this.m.setPosition(this.at.set(this.pos[u],this.pos[u+1],this.pos[u+2])),this.mesh.setMatrixAt(c,this.m)}this.mesh.instanceMatrix.needsUpdate=!0}stats(t){t.set(0,0,0);for(let e=0;e<this.count;e++)t.add(this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]));t.multiplyScalar(1/Math.max(1,this.count));let s=0;for(let e=0;e<this.count;e++)s+=this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]).distanceTo(t);return{center:t,spread:s/Math.max(1,this.count)}}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}const ar=`
uniform float uTime;
uniform float uDelta;
uniform vec4 uCenter[2];
uniform vec4 uShape[2];
uniform vec3 uScareOrigin;
uniform vec3 uScareDir;
uniform float uScare;
uniform vec4 uPredator;
${ze}
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
`,nr=`
uniform float uDelta;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 P = texture2D(texturePosition, uv);
  vec4 V = texture2D(textureVelocity, uv);
  gl_FragColor = vec4(P.xyz + V.xyz * uDelta, P.w);
}
`,rr=`
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
`,lr=`
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
`;function cr(){const l=[-.5,-.36,-.16,.06,.24,.38,.47],t=[.03,.075,.115,.13,.115,.085,.045],s=[.018,.036,.05,.056,.05,.038,.022],e=6,o=[],i=[];l.forEach((d,p)=>{for(let f=0;f<e;f++){const m=f/e*Math.PI*2+Math.PI/2;o.push(d,Math.sin(m)*t[p],Math.cos(m)*s[p])}});for(let d=0;d<l.length-1;d++)for(let p=0;p<e;p++){const f=d*e+p,m=d*e+(p+1)%e,g=(d+1)*e+p,b=(d+1)*e+(p+1)%e;i.push(f,g,m,m,g,b)}const a=o.length/3;o.push(.53,0,0);const n=(l.length-1)*e;for(let d=0;d<e;d++)i.push(n+d,a,n+(d+1)%e);const r=o.length/3;o.push(-.52,0,0);for(let d=0;d<e;d++)i.push(d,(d+1)%e,r);const h=o.length/3;o.push(-.48,0,0,-.74,.15,0,-.66,0,0,-.74,-.15,0),i.push(h,h+1,h+2,h,h+2,h+3,h,h+2,h+1,h,h+3,h+2);const c=o.length/3;o.push(.02,.12,0,-.14,.2,0,-.18,.1,0),i.push(c,c+1,c+2,c,c+2,c+1);const u=new xt;return u.setAttribute("position",new q(new Float32Array(o),3)),u.setIndex(i),u.computeVertexNormals(),u}class hr{constructor(t,s,e,o,i){this.renderer=t,this.clusters=i.slice(0,2);const a=this.clusters.map(f=>Math.max(1,Math.round(f.count/o))),n=a.reduce((f,m)=>f+m,0);this.gpu=new aa(o,n,t),this.gpu.setDataType(na);const r=this.gpu.createTexture(),h=this.gpu.createTexture();for(this.fill(r,h,o,a),this.velocity=this.gpu.addVariable("textureVelocity",ar,h),this.position=this.gpu.addVariable("texturePosition",nr,r),this.gpu.setVariableDependencies(this.velocity,[this.velocity,this.position]),this.gpu.setVariableDependencies(this.position,[this.velocity,this.position]),this.centers=this.clusters.map(f=>new Ne(f.center.x,f.center.y,f.center.z,f.radius)),this.homes=this.clusters.map(f=>f.center.clone());this.centers.length<2;)this.centers.push(new Ne(0,-999,0,1));const c=this.clusters.map(f=>new Ne(f.height,f.shape,f.speed,0));for(;c.length<2;)c.push(new Ne(1,0,1,0));Object.assign(this.velocity.material.uniforms,{uTime:{value:0},uDelta:{value:0},uCenter:{value:this.centers},uShape:{value:c},uScareOrigin:{value:new v},uScareDir:{value:new v(0,0,-1)},uScare:{value:0},uPredator:{value:new Ne(0,0,0,0)}}),Object.assign(this.position.material.uniforms,{uDelta:{value:0}});const u=this.gpu.init();if(u)throw new Error(u);const d=cr();this.geometries.push(d);let p=0;this.clusters.forEach((f,m)=>{const g=a[m],b=g*o,x=new Float32Array(b*2);for(let _=0;_<b;_++)x[_*2]=(_%o+.5)/o,x[_*2+1]=(p+Math.floor(_/o)+.5)/n;p+=g;const y=new Mi;y.index=d.index,y.setAttribute("position",d.getAttribute("position")),y.setAttribute("normal",d.getAttribute("normal")),y.setAttribute("aRef",new We(x,2)),y.instanceCount=b,this.geometries.push(y);const S=(f.palette&&f.palette.length?f.palette:[f.back]).slice(0,4),A=[0,1,2,3].map(_=>new E(S[_%S.length])),C=new st({uniforms:{...ue.clone(de.fog),tPosition:{value:null},tVelocity:{value:null},uTime:s.uTime,uSize:{value:f.size},uPalette:{value:A},uPaletteCount:{value:S.length},uSunDir:s.uSunDir,uLight:e,uSkyColor:s.uSkyColor,uGroundColor:s.uGroundColor,uSideColor:{value:new E(f.side)},uBellyColor:{value:new E(f.belly)},uFlash:{value:f.flash},uCaustic:{value:0},uGlow:s.uGlow,uNight:s.uNight},vertexShader:rr,fragmentShader:lr,fog:!0});this.materials.push(C);const T=new U(y,C);T.frustumCulled=!1,T.visible=!1,this.meshes.push(T)})}renderer;meshes=[];gpu;velocity;position;clusters;centers;homes;materials=[];fear=[0,0];geometries=[];active=[!1,!1];fill(t,s,e,o){const i=t.image.data,a=s.image.data;let n=1337;const r=()=>(n=n*16807%2147483647,n/2147483647);let h=0;this.clusters.forEach((c,u)=>{for(let d=0;d<o[u]*e;d++){const p=(h*e+d)*4,f=r()*Math.PI*2,m=(r()-.5)*c.height,g=c.shape>.5?1:Math.sqrt(Math.max(.05,1-(2*m/c.height)**2)),b=c.radius*g*(.45+.55*Math.sqrt(r()));i[p]=c.center.x+Math.cos(f)*b,i[p+1]=c.center.y+m,i[p+2]=c.center.z+Math.sin(f)*b,i[p+3]=u,a[p]=-Math.sin(f)*c.speed,a[p+1]=0,a[p+2]=Math.cos(f)*c.speed,a[p+3]=0}h+=o[u]}),t.needsUpdate=!0,s.needsUpdate=!0}update(t,s,e,o,i){if(this.active=e,this.meshes.forEach((c,u)=>{c.visible=!!e[u]}),!e.some(Boolean))return;const a=Math.min(t,1/30);this.clusters.forEach((c,u)=>{const d=this.homes[u],p=c.wander;this.centers[u].set(d.x+Math.sin(s*.07+u*2)*p,d.y+Math.sin(s*.11+u)*p*.3,d.z+Math.cos(s*.05+u*3)*p,c.radius)});const n=this.velocity.material.uniforms;n.uTime.value=s,n.uDelta.value=a,o&&o.strength>0?(n.uScareOrigin.value.copy(o.origin),n.uScareDir.value.copy(o.dir),n.uScare.value=o.strength,this.fear.forEach((c,u)=>{this.fear[u]=Math.max(this.fear[u],o.strength)})):n.uScare.value=0,this.fear.forEach((c,u)=>{this.fear[u]=c*Math.exp(-t*1.3)}),this.position.material.uniforms.uDelta.value=a,this.gpu.compute();const r=this.gpu.getCurrentRenderTarget(this.position).texture,h=this.gpu.getCurrentRenderTarget(this.velocity).texture;for(const c of this.materials)c.uniforms.tPosition.value=r,c.uniforms.tVelocity.value=h,c.uniforms.uCaustic.value=i}setPredator(t,s){this.velocity.material.uniforms.uPredator.value.set(t.x,t.y,t.z,s)}thin(t){this.meshes.forEach(s=>{const e=s.geometry,o=e.getAttribute("aRef").count;e.instanceCount=Math.max(64,Math.round(o*t))})}stats(t,s){const e=this.centers[t]||this.centers[0];s.set(e.x,e.y,e.z);const o=this.clusters[t]||this.clusters[0];return{center:s,spread:o.radius*(.75+this.fear[t]*.8)}}get running(){return this.active.some(Boolean)}dispose(){this.gpu.dispose(),this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose()),this.renderer}}class Xi{materials=[];geometries=[];mat(t,s={}){const e=new Ot({color:t,roughness:.55,metalness:0,...s});return this.materials.push(e),e}geo(t){return this.geometries.push(t),t}mesh(t,s,e={}){const o=new U(t,s);return e.p&&o.position.set(...e.p),e.s!==void 0&&(typeof e.s=="number"?o.scale.setScalar(e.s):o.scale.set(...e.s)),e.r&&o.rotation.set(...e.r),o}dispose(){this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose())}}function Wo(l,t,s,e,o){const i=l.geo(new Q(1,20,14)),a=l.mat("#21181d",{roughness:.25}),n=l.mat("#ffffff",{emissive:"#ffffff",emissiveIntensity:.8}),r=new Me().setFromUnitVectors(new v(0,0,1),o.clone().normalize());for(const h of e){const c=new nt;c.position.copy(h),c.quaternion.copy(r),c.add(l.mesh(i,a,{s:[s*.85,s*1.1,s*.45]})),c.add(l.mesh(i,n,{p:[-s*.28,s*.38,s*.38],s:s*.3})),c.add(l.mesh(i,n,{p:[s*.25,-s*.3,s*.38],s:s*.14})),t.add(c)}}function ur(){const l=new Xi,t=new nt;t.name="cute-turtle";const s=l.mat("#7cca5c"),e=l.mat("#f4cf6c"),o=l.mat("#ff9fb3",{transparent:!0,opacity:.75});o.userData.seeThrough=!0;const i=l.mat("#3a2a22",{roughness:.3}),a=l.geo(new Q(1,28,20)),n=l.geo(new Q(1,64,40)),r=[new v(0,1,0)];for(let D=0;D<6;D++)r.push(new v(Math.cos(D*Math.PI/3)*Math.cos(.85),Math.sin(.85),Math.sin(D*Math.PI/3)*Math.cos(.85)));for(let D=0;D<10;D++)r.push(new v(Math.cos(D*Math.PI/5+.3)*Math.cos(.25),Math.sin(.25),Math.sin(D*Math.PI/5+.3)*Math.cos(.25)));const h=[],c=new E("#c27843"),u=new E("#a65e30"),d=new E("#6f3c1d"),p=n.getAttribute("position"),f=new v;for(let D=0;D<p.count;D++){f.fromBufferAttribute(p,D).normalize();let Y=-2,V=-2;for(const j of r){const et=f.dot(j);et>Y?(V=Y,Y=et):et>V&&(V=et)}const G=Y-V,H=G<.035?d:u.clone().lerp(c,Math.min(1,G*6));h.push(H.r,H.g,H.b)}n.setAttribute("color",new As(h,3));const m=l.mesh(n,l.mat("#ffffff",{vertexColors:!0,roughness:.5}),{p:[-.1,.16,0],s:[.95,.7,.86]}),g=l.mesh(l.geo(new ss(.86,.09,10,36)),l.mat("#93502a"),{p:[-.08,.02,0],r:[Math.PI/2,0,0],s:[1.08,.98,1]}),b=l.mesh(a,e,{p:[-.05,-.04,0],s:[.92,.24,.8]}),x=new nt;x.position.set(1.02,.2,0),x.add(l.mesh(a,s,{s:.5}));const y=(D,Y,V,G=.5)=>new v(D,Y,V).normalize().multiplyScalar(G),S=y(.9,.2,.36,.47),A=y(.9,.2,-.36,.47);Wo(l,x,.1,[S,A],new v(1,.15,0)),x.add(l.mesh(a,o,{p:y(.62,-.12,.66,.47).toArray(),s:[.04,.05,.09],r:[0,-.8,0]})),x.add(l.mesh(a,o,{p:y(.62,-.12,-.66,.47).toArray(),s:[.04,.05,.09],r:[0,.8,0]}));const C=l.mesh(l.geo(new ss(.075,.018,8,18,Math.PI)),i,{p:y(.95,-.2,0,.495).toArray(),r:[0,Math.PI/2,Math.PI]});x.add(C);const T=l.mesh(a,s,{p:[.66,.12,0],s:[.3,.26,.28]}),_=[];for(const D of[-1,1]){const Y=l.mesh(a,s,{p:[.42,-.1,D*.66],s:[.22,.09,.38],r:[0,D*.45,0]}),V=l.mesh(a,s,{p:[-.6,-.1,D*.5],s:[.17,.08,.25],r:[0,-D*.5,0]});_.push([Y,D],[V,D*.5]),t.add(Y,V)}const W=l.mesh(l.geo(new ge(.1,.32,12)),s,{p:[-.92,-.02,0],r:[0,0,Math.PI/2]});return t.add(m,g,b,x,T,W),t.traverse(D=>{D.isMesh&&(D.castShadow=!0)}),{root:t,materials:l.materials,animate:D=>{for(const[Y,V]of _)Y.rotation.x=Math.sin(D*2.2+(V>0?0:.4))*.45*Math.sign(V)*(Math.abs(V)>.6?1:.6);x.position.y=.26+Math.sin(D*1.6)*.03,x.rotation.z=Math.sin(D*.9)*.08},dispose:()=>l.dispose()}}let Gs=null;function zo(){if(Gs)return Gs;const l=document.createElement("canvas");l.width=l.height=128;const t=l.getContext("2d"),s=t.createRadialGradient(64,64,0,64,64,64);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.25,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,128,128),Gs=new Vo(l),Gs}function dr(l,t){const s=new Xi,e=new nt;e.name="sea-friends";const o=s.geo(new Q(1,28,20)),i=O=>{O.rotation.y=Math.atan2(t.x-O.position.x,t.z-O.position.z)},a=new Map,n=O=>{const $=a.get(O);a.set(O,{t:0,base:$?.base||O.scale.clone()})},r=new nt;r.name="shipwreck";{const O=s.geo(new Q(1,32,16,0,Math.PI*2,Math.PI/2,Math.PI/2)),$=[],at=O.getAttribute("position"),ot=new E("#8a5a36"),J=new E("#6b4329");for(let tt=0;tt<at.count;tt++){const At=Math.floor((at.getY(tt)+1)*7)%2?ot:J;$.push(At.r,At.g,At.b)}O.setAttribute("color",new As($,3));const ut=s.mesh(O,s.mat("#ffffff",{vertexColors:!0,side:Gt,roughness:.8}),{s:[1.5,1.1,3.4]}),Tt=s.mesh(s.geo(new rt(1,1,.08,32)),s.mat("#a7764a",{roughness:.85}),{p:[0,-.12,0],s:[1.4,1,3.25]}),Pt=s.mesh(o,s.mat("#2a1a10",{roughness:1}),{p:[1.38,-.45,.6],s:[.12,.32,.42]}),dt=s.mesh(s.geo(new rt(.1,.13,3.2,10)),s.mat("#7a4c2c"),{p:[0,1.4,.4],r:[.25,0,-.35]}),_t=s.mesh(s.geo(new rt(.06,.06,2.2,8)),s.mat("#7a4c2c"),{p:[-.45,2.3,.75],r:[.25,0,Math.PI/2-.35]}),gt=s.geo(new Pe(1.8,1.5,10,8)),Z=gt.getAttribute("position");for(let tt=0;tt<Z.count;tt++){const At=Z.getX(tt),jt=Z.getY(tt);Z.setZ(tt,Math.sin(At*2.4)*.12+Math.cos(jt*3)*.06),jt<-.6&&Z.setY(tt,jt+Math.abs(Math.sin(At*9))*.35)}gt.computeVertexNormals();const yt=s.mesh(gt,s.mat("#efe2c2",{side:Gt,roughness:.9}),{p:[-.35,1.5,.62],r:[.25,0,-.35]}),pt=s.mesh(s.geo(new Pe(.6,.38)),s.mat("#2b2b38",{side:Gt}),{p:[.65,2.8,.9],r:[.25,0,-.35]});r.add(ut,Tt,Pt,dt,_t,yt,pt),r.position.copy(l(24,.5)).add(new v(0,.55,0)),r.rotation.set(.12,.9,.32)}e.add(r);const h=new nt;h.name="treasure";const c=qi();s.geo(c.base),s.geo(c.lid);const u=s.mat("#ffffff",{vertexColors:!0,roughness:.6}),d=new U(c.base,u),p=new U(c.lid,u);p.position.set(0,.46,-.29),p.rotation.x=-1.6,d.add(p),d.scale.setScalar(1.6),h.add(d);const f=s.mat("#f6c444",{metalness:.65,roughness:.28,emissive:"#7a5200",emissiveIntensity:.35}),m=new es(s.geo(new rt(.13,.13,.035,18)),f,34),g=new Ps;for(let O=0;O<m.count;O++){const $=O<12,at=O*2.4,ot=$?.08+O%4*.12:.9+O%6*.22;g.position.set($?(O%4-1.5)*.28:Math.cos(at)*ot+.6,$?.78+Math.floor(O/4)*.05:.03+O%3*.03,$?(Math.floor(O/4)-1)*.2:Math.sin(at)*ot*.6),g.rotation.set($?.3:O%5*.3,at,$?.2:O%4*.2),g.scale.setScalar(1),g.updateMatrix(),m.setMatrixAt(O,g.matrix)}h.add(m);const b=new uo({map:zo(),color:"#ffd76a",blending:Qt,depthWrite:!1,transparent:!0,opacity:.7});s.materials.push(b);const x=new fo(b);x.position.set(0,1.1,0),x.scale.setScalar(2.6),h.add(x),h.position.copy(l(12,-2.2)),i(h),h.rotation.y+=.5,e.add(h);let y=-1.6;const S=new nt;S.name="octopus";const A=s.mat("#ec86b8",{roughness:.45}),C=new nt;C.position.y=2.1,C.add(s.mesh(o,A,{s:[1.15,1.3,1.1]})),C.add(s.mesh(o,s.mat("#f7b6d6"),{p:[0,-.35,.95],s:[.62,.38,.22]})),Wo(s,C,.2,[new v(.42,.05,.95),new v(-.42,.05,.95)],new v(0,.05,1)),C.add(s.mesh(s.geo(new ss(.1,.045,10,20)),s.mat("#9c3d6f"),{p:[0,-.38,1.1]}));for(const O of[-1,1])C.add(s.mesh(o,s.mat("#ff8fa8",{transparent:!0,opacity:.7}),{p:[O*.7,-.25,.82],s:[.2,.11,.08]}));for(const[O,$,at,ot]of[[.5,.85,.55,.12],[-.3,1,.6,.09],[.15,1.15,.3,.07]])C.add(s.mesh(o,s.mat("#f7b6d6"),{p:[O,$,at],s:ot}));const T=s.mesh(s.geo(new ki(1,1)),s.mat("#7c8f9c",{flatShading:!0,roughness:.9}),{p:[0,.35,0],s:[1.5,.7,1.3]}),_=8,W=12,D=new es(o,A,_*W);D.frustumCulled=!1,S.add(T,C,D),S.position.copy(l(17.5,-5.2)),i(S),S.rotation.y+=.25,S.scale.setScalar(1.15),e.add(S);let Y=0;const V=new nt;V.name="pineapple-house";{const O=s.geo(new Q(1,40,30)),$=[],at=O.getAttribute("position"),ot=new E("#f2a33a"),J=new E("#b9661c"),ut=new E("#7a4a12");for(let Z=0;Z<at.count;Z++){const yt=at.getX(Z),pt=at.getY(Z),tt=at.getZ(Z),At=Math.atan2(tt,yt)*5,jt=pt*7,we=Math.abs(Math.sin(At+jt)),Fe=Math.abs(Math.sin(At-jt)),Vt=Math.min(we,Fe)<.16?J:we>.9&&Fe>.9?ut:ot;$.push(Vt.r,Vt.g,Vt.b)}O.setAttribute("color",new As($,3)),V.add(s.mesh(O,s.mat("#ffffff",{vertexColors:!0,roughness:.6}),{p:[0,1.5,0],s:[1.25,1.6,1.25]}));const Tt=s.geo(new Q(1,12,10)),Pt=s.mat("#4fae4d",{roughness:.6}),dt=s.mat("#7cd06a",{roughness:.6});for(let Z=0;Z<9;Z++){const yt=Z/9*Math.PI*2,pt=Z%2?.7:.45,tt=new U(Tt,Z%2?Pt:dt);tt.scale.set(.16,1.05,.06),tt.position.set(Math.cos(yt)*.32,3.55+Z%2*.1,Math.sin(yt)*.32),tt.rotation.set(Math.sin(yt)*pt,0,-Math.cos(yt)*pt,"XYZ"),V.add(tt)}const _t=s.mesh(s.geo(new rt(.36,.36,.1,24,1,!1,0,Math.PI)),s.mat("#8fc3d8"),{p:[0,.48,1.18],r:[Math.PI/2,0,Math.PI/2]}),gt=s.mesh(s.geo(new Pe(.72,.4)),s.mat("#8fc3d8",{side:Gt}),{p:[0,.28,1.2]});V.add(_t,gt);for(const[Z,yt]of[[-.62,1.9],[.55,1.35]]){const pt=s.mesh(s.geo(new ss(.22,.06,10,24)),s.mat("#9aa7b0",{metalness:.4,roughness:.35}),{p:[Z,yt,1.14-Math.abs(Z)*.16],r:[0,Z*.4,0]}),tt=s.mesh(o,s.mat("#bfe8f5",{emissive:"#ffe9a8",emissiveIntensity:.25}),{p:[Z,yt,1.1-Math.abs(Z)*.16],s:[.2,.2,.05],r:[0,Z*.4,0]});V.add(pt,tt)}V.position.copy(l(28,8.5)),i(V)}e.add(V);const G=new nt;G.name="anglerfish";const H=s.mat("#34406f",{roughness:.4}),j=new nt;j.add(s.mesh(o,H,{s:[.95,.82,.78]})),j.add(s.mesh(o,s.mat("#7d8cc4"),{p:[.1,-.35,0],s:[.7,.42,.62]})),j.add(s.mesh(o,s.mat("#1a1530",{roughness:.8}),{p:[.78,-.18,0],s:[.2,.26,.42]}));const et=s.geo(new ge(.045,.12,6)),bt=s.mat("#fffaf0");for(let O=0;O<5;O++)j.add(s.mesh(et,bt,{p:[.92,-.02,-.26+O*.13],r:[Math.PI,0,0]}));Wo(s,j,.13,[new v(.62,.28,.42),new v(.62,.28,-.42)],new v(.7,.1,0));const Rt=s.geo(new ge(.35,.55,3)),Dt=s.mesh(Rt,H,{p:[-1,.05,0],r:[Math.PI/2,0,Math.PI/2],s:[1,1,.3]});for(const O of[-1,1])j.add(s.mesh(o,H,{p:[0,-.1,O*.75],s:[.28,.1,.2],r:[0,O*.6,0]}));j.add(Dt);const fe=new ra([new v(.3,.72,0),new v(.65,1.25,0),new v(1.15,1.38,0),new v(1.4,1.12,0)]);j.add(s.mesh(s.geo(new la(fe,20,.035,6)),H));const wt=s.mat("#fff1a8",{emissive:"#ffd84a",emissiveIntensity:1.6,roughness:.2}),Yt=s.mesh(o,wt,{p:[1.4,1,0],s:.15});j.add(Yt);const ee=new uo({map:zo(),color:"#ffe27a",blending:Qt,depthWrite:!1,transparent:!0,opacity:1}),ct=new uo({map:zo(),color:"#ffcf5a",blending:Qt,depthWrite:!1,transparent:!0,opacity:.3});s.materials.push(ee,ct);const Ut=new fo(ee);Ut.position.set(1.4,1,0),Ut.scale.setScalar(2.2);const Nt=new fo(ct);Nt.position.set(1.2,.6,0),Nt.scale.setScalar(8),j.add(Ut,Nt),G.add(j);const Wt=l(11,1.4).add(new v(0,3.3,0));G.position.copy(Wt),G.scale.setScalar(.9),e.add(G);let Bt=!0,Mt=1;const ft=[[G,()=>{Bt=!Bt,n(j)}],[V,()=>n(V)],[S,()=>{Y=1,n(C)}],[h,()=>{y=y<-1?-.2:-1.6,n(d)}],[r,()=>n(r)]],qt=O=>{if(!e.visible)return null;let $=null;for(const[at,ot]of ft){const J=O.intersectObject(at,!0).find(ut=>!ut.object.isSprite);J&&(!$||J.distance<$.hit)&&($={hit:J.distance,act:ot,at:J.point.clone()})}return $},It=new v,Ct={group:e,get lampOn(){return Bt},update(O,$,at,ot){if(e.visible=ot,!ot)return;const J=$*.35;It.set(Math.cos(J)*1.6,Math.sin($*.8)*.35,Math.sin(J)*1.1),G.position.copy(Wt).add(It),G.rotation.y=Math.atan2(-Math.cos(J)*1.1,-Math.sin(J)*1.6),Dt.rotation.y=Math.sin($*5)*.35,Mt+=((Bt?1:0)-Mt)*(1-Math.exp(-O*8));const ut=.88+.12*Math.sin($*3.1)*Math.sin($*1.7);ee.opacity=Mt*ut,ct.opacity=Mt*.3*ut,wt.emissiveIntensity=.05+Mt*1.6,Y=Math.max(0,Y-O*.5);const Tt=1.4+Y*3,Pt=.28+Y*.35;for(let dt=0;dt<_;dt++){const _t=dt/_*Math.PI*2+.2;for(let gt=0;gt<W;gt++){const Z=gt/(W-1),yt=_t+Math.sin($*Tt*.6+dt+Z*2)*.35*Z,pt=.75+Z*1.9;g.position.set(Math.cos(yt)*pt,1.25-Z*.55+Math.sin($*Tt+dt*1.3+Z*4)*Pt*Z+Z*Z*.5,Math.sin(yt)*pt),g.scale.setScalar(.3*(1-Z*.72)),g.rotation.set(0,0,0),g.updateMatrix(),D.setMatrixAt(dt*W+gt,g.matrix)}}D.instanceMatrix.needsUpdate=!0,C.position.y=2.1+Math.sin($*1.2)*.08,p.rotation.x+=(y-p.rotation.x)*(1-Math.exp(-O*6)),b.opacity=.55+.2*Math.sin($*2.3);for(const[dt,_t]of a){_t.t+=O;const gt=Math.min(1,_t.t/.9),Z=Math.sin(gt*Math.PI*3)*Math.exp(-gt*3.5)*.18;dt.scale.set(_t.base.x*(1+Z),_t.base.y*(1-Z),_t.base.z*(1+Z)),gt>=1&&(dt.scale.copy(_t.base),a.delete(dt))}},tap(O){const $=qt(O);return $?($.act(),Ct.onBubbles?.($.at),!0):!1},hover:O=>!!qt(O),dispose(){s.dispose(),e.removeFromParent()}};return Ct}const fr=`
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
`,pr=`
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
${ze}
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
`,Yi={value:0};function ps(l,t,s){return new st({uniforms:{...ue.clone(de.fog),uTime:l.uTime,uSunDir:l.uSunDir,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uGlow:l.uGlow,uLight:t,uWiggle:{value:s.wiggle},uWiggleSpeed:{value:s.speed},uWiggleAxis:{value:s.axis==="y"?1:0},uDots:{value:s.dots?1:0},uDotColor:{value:new E(s.dots||"#ffffff")},uRim:{value:s.rim??.35},uBright:{value:s.bright??0},uCaustic:Yi},vertexShader:fr,fragmentShader:pr,fog:!0})}function no(l){return l.getAttribute("aPhase")||l.setAttribute("aPhase",new q(new Float32Array(l.getAttribute("position").count),1)),l}function mr(){const l=new kt;l.add(new Q(1,18,12),e=>e.y<-.25?"#fffbea":"#ffffff",N({s:[.5,.25,.14]}));const t=new ge(.2,.34,4,1);t.rotateZ(Math.PI/2),l.add(t,"#ffffff",N({x:-.58,s:[1,1.15,.22]}));const s=new ge(.1,.24,4,1);l.add(s,"#ffffff",N({x:-.05,y:.24,rz:.5,s:[1,1,.25]}));for(const e of[-1,1])l.add(new Q(.045,8,6),"#141420",N({x:.3,y:.05,z:e*.105})),l.add(new Q(.016,6,4),"#ffffff",N({x:.32,y:.07,z:e*.142}));return no(l.build())}function gr(){const l=new kt;l.add(new Q(1,36,22),t=>zt("#5b80b8","#e4eef6",lt(-.05,-.55,t.y+t.x*.05)),N({s:[3.3,1.35,1.4]}));for(const t of[-1,1])l.add(new Q(1,16,10),"#5276ad",N({x:.6,y:-.75,z:t*1.35,ry:t*.5,rz:-.4,s:[.85,.12,.38]})),l.add(new Q(.17,12,10),"#1d2233",N({x:2.25,y:.02,z:t*1.02})),l.add(new Q(.06,8,6),"#ffffff",N({x:2.36,y:.1,z:t*1.12})),l.add(new Q(.22,12,8),"#f4a6b8",N({x:2,y:-.32,z:t*1.07,s:[1,.45,.6]})),l.add(new Q(1,16,10),"#5276ad",N({x:-3.75,y:.1,z:t*.7,ry:t*.55,s:[.85,.1,.55]}));return l.add(new rt(.42,.75,1.3,16,2),"#5b80b8",N({x:-2.95,y:.08,rz:Math.PI/2})),no(l.build())}function vr(){const l=new kt;l.add(new Q(1,28,18),e=>zt("#4b3a5c","#2a2134",lt(.6,-.6,e.y)),N({s:[1.05,.85,.8]})),l.add(new Q(1,20,12,0,Math.PI*2,Math.PI/2,Math.PI/2),"#3a2c48",N({x:.45,y:-.12,s:[.75,.45,.7]}));for(let e=0;e<9;e++){const o=-.9+e/8*1.8,i=new ge(.045,.2,5,1);l.add(i,"#f4f1e6",N({x:.92+Math.cos(o)*.05,y:-.08,z:Math.sin(o)*.52,rz:Math.PI}))}for(const e of[-1,1])l.add(new Q(.12,10,8),"#e9f0c8",N({x:.62,y:.38,z:e*.42})),l.add(new Q(.06,8,6),"#141420",N({x:.7,y:.4,z:e*.47})),l.add(new ge(.25,.6,4,1),"#3a2c48",N({x:-.2,y:-.1,z:e*.78,rx:e*1.2,s:[1,1,.2]}));const t=new ge(.42,.7,6,1);t.rotateZ(Math.PI/2),l.add(t,"#3a2c48",N({x:-1.25,s:[1,1,.3]}));const s=new ss(.75,.025,6,16,Math.PI*.62);return l.add(s,"#5a4870",N({x:.55,y:.75,rz:.35})),no(l.build())}const wr=`
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
`,yr=`
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
`;function xr(){const l=new kt,t=new Q(1,32,14,0,Math.PI*2,0,Math.PI*.52),s=t.getAttribute("position");for(let e=0;e<s.count;e++){const o=s.getX(e),i=s.getY(e),a=s.getZ(e),n=1+.07*Math.sin(Math.atan2(a,o)*8)*(1-Math.min(1,i/.35));s.setXYZ(e,o*n,i*.88,a*n)}t.computeVertexNormals(),l.add(t,"#ffffff",new Se,0);for(let e=0;e<4;e++){const o=e/4*Math.PI*2+Math.PI/4;l.add(new Q(.2,12,8),"#ffffff",N({x:Math.cos(o)*.2,y:.45,z:Math.sin(o)*.2,s:[1,.35,.65],ry:-o}),2)}for(let e=0;e<9;e++){const o=e/9*Math.PI*2,i=new rt(.014,.006,2.3,4,12,!0);i.translate(0,-1.15,0),l.add(i,"#ffffff",N({x:Math.cos(o)*.74,y:.04,z:Math.sin(o)*.74}),1)}for(let e=0;e<4;e++){const o=e/4*Math.PI*2+.4,i=new rt(.07,.02,1.5,5,10,!0);i.translate(0,-.75,0),l.add(i,"#ffffff",N({x:Math.cos(o)*.16,y:.02,z:Math.sin(o)*.16,rx:Math.sin(o)*.12}),1)}return l.build(!0)}const br=`
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
`,Mr=`
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
`;function Sr(){const t=[],s=[],e=[];for(let i=0;i<=18;i++){const a=i/18,n=.15*(1-a*.5)*(1+.4*Math.sin(a*22));t.push(-n,a,0,n,a,0),s.push(0,0,1,0,0,1)}for(let i=0;i<18;i++){const a=i*2;e.push(a,a+1,a+2,a+1,a+3,a+2)}const o=new xt;return o.setAttribute("position",new q(new Float32Array(t),3)),o.setAttribute("normal",new q(new Float32Array(s),3)),o.setIndex(e),o}const zr=`
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
`,kr=`
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
${ze}
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
`,Cr=`
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
`,Tr=`
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
`,pi=`
uniform float uScale;
attribute float aSize;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,mi=`
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.0, 1.0, d)) * uOpacity;
  gl_FragColor = vec4(uColor, a);
}
`,Ar=`
varying vec2 vUv;
varying float vFade;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  // 鏡頭穿過光束的時候淡掉，不會突然一整片白
  vFade = smoothstep(2.5, 7.0, distance(world.xyz, cameraPosition));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,Pr=`
uniform float uOpacity;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
${ze}
void main() {
  // 一道光：兩邊柔柔地淡掉，裡面有幾條順著光的細紋，上面亮、往下慢慢消失
  float edge = smoothstep(0.0, 0.45, vUv.x) * smoothstep(1.0, 0.55, vUv.x);
  float streak = 0.5 + 0.5 * vnoise(vec2(vUv.x * 7.0 + uSeed * 3.0, vUv.y * 1.4 + uTime * 0.1));
  float fall = smoothstep(0.0, 0.92, vUv.y);
  float flicker = 0.72 + 0.28 * sin(uTime * 0.8 + uSeed * 5.0 + vUv.y * 2.4);
  float a = edge * edge * streak * fall * fall * flicker * uOpacity * vFade;
  gl_FragColor = vec4(uColor, a);
}
`,_r=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,Fr=`
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vDir;
${ze}
${Ei}
void main() {
  gl_FragColor = vec4(waterDome(normalize(vDir), uSunDir, uTime), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Ir=`
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
`,Er=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (exp(-d * d * 9.0) + exp(-d * d * 2.2) * 0.35) * vAlpha;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor * 1.6, a);
}
`;function Us(l,t){return ie+.9*Jt(l*.06,t*.06,3)+.18*Math.sin(l*.7+Jt(l*.2,t*.2)*3)}function Rr(l,t,s,e=1,o=null){const i=new nt;i.name="ocean";const a=_e(7781),n=s==="high",r=[],h=new Ps,c=new v,u={uWaterGlow:l.uWaterGlow,uWaterFog:l.uWaterFog,uWaterAbyss:l.uWaterAbyss,uWaterRays:l.uWaterRays,uSunDir:l.uSunDir,uTime:l.uTime},d=new U(new Q(300,32,18),new st({uniforms:u,vertexShader:_r,fragmentShader:Fr,side:os,depthWrite:!1}));d.renderOrder=-10,d.frustumCulled=!1,d.visible=!1,i.add(d),r.push(d.geometry,d.material);const p=[],f=new Pe(1,1);f.translate(0,-.5,0),r.push(f);const m=l.uWaterGlow;for(let k=0;k<(n?16:8);k++){const F=.02+a()*.36,L=Qe(F,5+a()*20,(a()-.5)*26,0),B=new st({uniforms:{uOpacity:{value:0},uTime:l.uTime,uSeed:{value:a()*10},uColor:m},vertexShader:Ar,fragmentShader:Pr,transparent:!0,depthWrite:!1,blending:Qt,side:Gt}),X=new U(f,B);X.position.set(L.x,-.3,L.z),X.rotation.z=(a()-.5)*.3,X.scale.set(.8+a()*2.6,22+a()*16,1),X.userData.strength=.5+a()*.5,X.renderOrder=6,p.push(X),i.add(X),r.push(B)}const g=n?700:320,b=34,x=new Float32Array(g*3),y=new Float32Array(g*3),S=new Float32Array(g);for(let k=0;k<g;k++)y.set([a()*b,a()*b,a()*b],k*3),S[k]=26+a()*46;const A=new xt,C=new q(x,3);C.setUsage(Te),A.setAttribute("position",C),A.setAttribute("aSize",new q(S,1));const T=new st({uniforms:{uScale:{value:1},uColor:{value:new E("#dff7ff")},uOpacity:{value:0}},vertexShader:pi,fragmentShader:mi,transparent:!0,depthWrite:!1,blending:Qt}),_=new be(A,T);_.frustumCulled=!1,_.renderOrder=7,i.add(_),r.push(A,T);const W=n?1100:480,D=26,Y=new Float32Array(W*3),V=new Float32Array(W*3);for(let k=0;k<W;k++)Y.set([a()*D,a()*D,a()*D],k*3),V.set([a(),a(),a()],k*3);const G=new xt;G.setAttribute("position",new q(Y,3)),G.setAttribute("aSeed",new q(V,3));const H={uTime:l.uTime,uScale:{value:1},uOpacity:{value:0},uBox:{value:D},uOrigin:{value:new v},uScareOrigin:{value:new v},uScareDir:{value:new v(0,0,-1)},uScare:{value:0}},j=new be(G,new st({uniforms:H,vertexShader:Ir,fragmentShader:Er,transparent:!0,depthWrite:!1,blending:Qt}));j.frustumCulled=!1,j.renderOrder=8,i.add(j),r.push(G,j.material);const et=mr();r.push(et);const bt=[],Rt=(k,F,L,B,X,K)=>{const w=new es(et,L,k);w.instanceMatrix.setUsage(Te),w.frustumCulled=!1;const M=new E,P=new Float32Array(k),I=[];for(let R=0;R<k;R++)M.set(F[R%F.length]),w.setColorAt(R,M),P[R]=a()*20,I.push({offset:new v((a()-.5)*X[0],(a()-.5)*X[1],(a()-.5)*X[2]),phase:P[R],speed:.6+a()*.7,scale:B*(.8+a()*.45)});w.geometry=et.clone(),w.geometry.setAttribute("aPhase",new We(P,1)),r.push(w.geometry),i.add(w);const z={mesh:w,center:K,fish:I,previous:I.map(()=>new v)};return bt.push(z),z},Dt=ps(l,t,{wiggle:.09,speed:11}),fe=ps(l,t,{wiggle:.07,speed:9,dots:"#7ff3ff",rim:.2});r.push(Dt,fe),Rt(n?40:22,["#ffd23f","#3d8bfd","#ff8c42","#ff6fa8","#7be0ff"],Dt,.8,[5,3,5],(k,F)=>{const L=k*.12+.3,B=Ts(L,-6)+3.2;return F.set(Math.sin(L)*B,-6+Math.sin(k*.3)*1.5,Math.cos(L)*B)}),Rt(n?30:16,["#2c3b5c","#33456b"],fe,.7,[6,3,6],(k,F)=>{const L=Qe(.56,13,-2,0);return F.set(L.x+Math.sin(k*.21)*4,L.y+Math.sin(k*.33)*1.2,L.z+Math.cos(k*.17)*4)});const wt=De(1).target,Yt=ps(l,t,{wiggle:.11,speed:14,rim:.4,bright:.34});r.push(Yt);const ee=k=>Math.max(24,Math.round(k*e));let ct=null;const Ut=.28;if(o)try{const k=eo+(Hi-eo)*(2*Ut*Ut),F=to+1.75*Ut+.56,L=ji(k)+8.2+2.2*Ut+3.2,B=De(1),X=B.target.clone().sub(B.position).setY(0).normalize(),K=B.target.clone().addScaledVector(X,7).addScaledVector(new v(-X.z,0,X.x),-2.5).setY(ie+3.6);ct=new hr(o.renderer,l,t,o.width,[{count:o.baitBall,center:new v(Math.sin(F)*L,k-1.2,Math.cos(F)*L),radius:5.2,height:10.5,shape:0,speed:3,size:.44,back:"#24508a",side:"#a8c8e0",belly:"#f1f7ff",flash:1.15,wander:1.2},{count:o.reef,center:K.setY(ie+5),radius:4.8,height:6.5,shape:0,speed:2.3,size:.44,back:"#2b86e8",side:"#8fe0ff",belly:"#fff6d8",palette:["#2b86e8","#2f9ff0","#1f6fd0","#ffd23f"],flash:.5,wander:1.8}]),ct.meshes.forEach(w=>i.add(w))}catch{ct=null}const Nt=ct?[]:[new so(et,Yt,{count:ee(260),colors:["#3fd0ff","#5ae6ff","#2fa8ff","#8ff3ff"],home:new v(wt.x,ie+5,wt.z),roam:9,lift:2,size:.42,seed:31,floor:(k,F)=>Us(k,F),column:Ts,ceiling:ie+11}),new so(et,Yt,{count:ee(110),colors:["#ffe14d","#ffc83d","#fff27a"],home:new v(wt.x+3,ie+3.6,wt.z-2),roam:6,lift:1.4,size:.36,seed:57,floor:(k,F)=>Us(k,F),column:Ts,ceiling:ie+9})];for(const k of Nt)i.add(k.mesh);const Wt=[!1,!1],Bt=new v,Mt=ps(l,t,{wiggle:.42,speed:1.6,axis:"y",rim:.25}),ft=new U(gr(),Mt);ft.scale.setScalar(1.15),i.add(ft),r.push(ft.geometry,Mt);const qt=ct?ct.stats(0,new v).center.clone().add(new v(0,-2.6,0)):Qe(.4,15,4,-1.5),It=ct?{x:8.5,z:8.5,speed:.085}:{x:10,z:7,speed:.045},Ct=n?8:5,O=n?7:3,$=Ct+O,at=new st({uniforms:{...ue.clone(de.fog),uTime:l.uTime,uGlow:l.uGlow},vertexShader:wr,fragmentShader:yr,transparent:!0,depthWrite:!1,blending:Qt,side:Gt,fog:!0}),ot=xr(),J=new es(ot,at,$);J.instanceMatrix.setUsage(Te),J.frustumCulled=!1,J.renderOrder=7;const ut=["#ffb3dc","#9eeaff","#cdb4ff","#ffd9b0","#b4ffe0"],Tt=[];for(let k=0;k<Ct;k++){const F=.3+k/Ct*.34+a()*.04,L=(k%2?1:-1)*(3.5+a()*6);Tt.push({home:Qe(F,11+a()*9,L,(a()-.4)*4),scale:.5+a()*.45,phase:a()*10}),J.setColorAt(k,new E(ut[k%ut.length]))}const Pt=_e(9157);for(let k=0;k<O;k++){const F=.46+k/O*.3+Pt()*.03,L=(k%2?-1:1)*(2.5+Pt()*8);Tt.push({home:Qe(F,8+Pt()*14,L,(Pt()-.5)*5),scale:.32+Pt()*.4,phase:Pt()*10}),J.setColorAt(Ct+k,new E(ut[(k+2)%ut.length]))}i.add(J),r.push(ot,at);const dt=ps(l,t,{wiggle:.12,speed:3,rim:.05,bright:.06}),_t=vr(),gt=[],Z=new Float32Array(6);for(let k=0;k<2;k++){const F=new U(_t,dt);F.scale.setScalar(k===0?1.15:.85);const L=Qe(.76+k*.07,10+k*3,k?5:-4,k?-1:1);gt.push({mesh:F,home:L,phase:k*2.3}),i.add(F)}r.push(_t,dt);const yt=new xt,pt=new q(Z,3);pt.setUsage(Te),yt.setAttribute("position",pt),yt.setAttribute("aSize",new q(new Float32Array([620,460]),1));const tt=new st({uniforms:{uScale:{value:1},uColor:{value:new E("#fff2a6")},uOpacity:{value:1}},vertexShader:pi,fragmentShader:mi,transparent:!0,depthWrite:!1,blending:Qt}),At=new be(yt,tt);At.frustumCulled=!1,At.renderOrder=8,i.add(At),r.push(yt,tt);const jt=new Pe(200,200,n?110:70,n?110:70);jt.rotateX(-Math.PI/2);const we=jt.getAttribute("position");for(let k=0;k<we.count;k++){const F=we.getX(k),L=we.getZ(k),B=.9*Jt(F*.06,L*.06,3)+.18*Math.sin(F*.7+Jt(F*.2,L*.2)*3);we.setY(k,ie+B)}jt.computeVertexNormals();const Fe=new kt;Fe.add(jt,k=>zt("#e7cf9a","#b9a57c",.5+Jt(k.x*.15,k.z*.15,2)));const Vt=new kt,ws=Us,Fs=[De(1).position,De(.93).position,De(.86).position],$t=(k,F=6.5)=>{const L=a()*Math.PI*2,B=Math.sqrt(a())*k,X=wt.x+Math.cos(L)*B,K=wt.z+Math.sin(L)*B,w=Math.atan2(K,X);return Math.hypot(X,K)<Ts(w,ie+2)+.6||Fs.some(M=>Math.hypot(M.x-X,M.z-K)<F)?null:{x:X,z:K,y:ws(X,K)}};for(let k=0;k<(n?26:14);k++){const F=$t(22);if(!F)continue;const L=.4+a()*1.3,B=new Q(1,12,9),X=B.getAttribute("position");for(let K=0;K<X.count;K++)c.fromBufferAttribute(X,K),c.multiplyScalar(1+.22*Jt(c.x*1.8+k,c.z*1.8+c.y,2)),c.y*=.65,X.setXYZ(K,c.x,c.y,c.z);B.computeVertexNormals(),Vt.add(B,(K,w)=>zt("#6f8796","#a6b8c2",w.y*.5+.5),N({x:F.x,y:F.y+.1*L,z:F.z,ry:a()*6,s:L}))}const is=["#ff7f9e","#ff9f5a","#c58bff","#ffd166","#6fe3c1"];for(let k=0;k<(n?30:16);k++){const F=$t(18);if(!F)continue;const L=is[k%is.length],B=k%3;if(B===0)for(let X=0;X<5;X++){const K=new rt(.06,.12,.9+a()*.6,6,1);K.translate(0,.45,0),Vt.add(K,L,N({x:F.x,y:F.y,z:F.z,rx:(a()-.5)*1.1,rz:(a()-.5)*1.1})),Vt.add(new Q(.11,8,6),L,N({x:F.x+(a()-.5)*.6,y:F.y+.8+a()*.4,z:F.z+(a()-.5)*.6}))}else if(B===1){const X=.45+a()*.35,K=new Q(X,28,14,0,Math.PI*2,0,Math.PI/2),w=K.getAttribute("position");for(let M=0;M<w.count;M++){c.fromBufferAttribute(w,M);const P=Math.sin(c.x*16+Math.sin(c.z*11)*2.2)*Math.sin(c.z*14+Math.sin(c.x*9)*1.8);c.multiplyScalar(1+.05*P+.08*Jt(c.x*3+k,c.z*3,2)),c.y*=.72,w.setXYZ(M,c.x,c.y,c.z)}K.computeVertexNormals(),Vt.add(K,M=>zt(L,"#3a2440",lt(.2,-.6,Math.sin(M.x*16+Math.sin(M.z*11)*2.2)*Math.sin(M.z*14+Math.sin(M.x*9)*1.8))*.45),N({x:F.x,y:F.y-.05,z:F.z}))}else{for(let X=0;X<9;X++){const K=X/9*Math.PI*2,w=new rt(.035,.06,.55,5,1);w.translate(0,.27,0),Vt.add(w,L,N({x:F.x+Math.cos(K)*.12,y:F.y+.1,z:F.z+Math.sin(K)*.12,rx:Math.sin(K)*.5,rz:-Math.cos(K)*.5}))}Vt.add(new rt(.2,.26,.2,10,1),"#f3e1c5",N({x:F.x,y:F.y+.08,z:F.z}))}}for(let k=0;k<(n?10:5);k++){const F=$t(15);if(!F)continue;const L=new kt;for(let B=0;B<5;B++){const X=new ge(.11,.42,5,1);X.rotateZ(-Math.PI/2),X.translate(.2,0,0),L.add(X,k%2?"#ff8f6b":"#ffb347",N({ry:B/5*Math.PI*2,s:[1,.45,1]}))}L.add(new Q(.12,8,6),k%2?"#ff8f6b":"#ffb347",N({s:[1,.5,1]})),Vt.add(L.build(),B=>B.y>.03?"#ffd0b0":k%2?"#ff8f6b":"#ffb347",N({x:F.x,y:F.y+.05,z:F.z,ry:a()*6}))}const Oe=new st({uniforms:{...ue.clone(de.fog),uTime:l.uTime,uLight:t,uSkyColor:l.uSkyColor,uGroundColor:l.uGroundColor,uSunDir:l.uSunDir,uGlow:l.uGlow,uNight:l.uNight},vertexShader:zr,fragmentShader:kr,fog:!0,defines:n?{CAUSTIC_TWO_LAYERS:""}:{}}),ne=new U(Fe.build(),Oe),ys=ps(l,t,{wiggle:0,speed:0,rim:.32,bright:.12}),re=new U(no(Vt.build()),ys);i.add(ne,re),r.push(ne.geometry,Oe,re.geometry,ys);const le=dr((k,F)=>{const L=Qe(1,k,F,0);return L.y=Us(L.x,L.z),L},De(1).position);i.add(le.group);const Ge=n?90:46,as={...ue.clone(de.fog),uTime:l.uTime,uGlow:l.uGlow,uLight:t,uSunDir:l.uSunDir,uBase:{value:new E("#1f4a2e")},uTip:{value:new E("#5fae62")},uGlowTip:{value:new E("#6ff0d6")}},ns=new st({uniforms:as,vertexShader:br,fragmentShader:Mr,side:Gt,fog:!0}),rs=Sr(),Ue=new es(rs,ns,Ge);let Be=0;for(let k=0;k<Ge*4&&Be<Ge;k++){const F=$t(26,8);if(!F)continue;const L=4+Math.floor(a()*5);for(let B=0;B<L&&Be<Ge;B++){const X=(a()-.5)*1.6,K=(a()-.5)*1.6;h.position.set(F.x+X,ws(F.x+X,F.z+K)-.1,F.z+K),h.rotation.set(0,a()*Math.PI,0),h.scale.set(.9+a()*.9,3.5+a()*6.5,1),h.updateMatrix(),Ue.setMatrixAt(Be++,h.matrix)}}Ue.count=Be,Ue.frustumCulled=!1,i.add(Ue),r.push(rs,ns);const Ht=n?380:190,St=new Float32Array(Ht*3),pe=new Float32Array(Ht),ls=new Float32Array(Ht),cs=Array.from({length:Ht},()=>({pos:new v,vel:0,wobble:a()*10,life:-1,size:0,burst:!1})),hs=Array.from({length:6},()=>$t(14)||{x:wt.x,z:wt.z,y:ie}),ro=k=>{const F=hs[Math.floor(a()*hs.length)];k.pos.set(F.x+(a()-.5)*.5,F.y+.2,F.z+(a()-.5)*.5),k.vel=1.1+a()*1.4,k.size=70+a()*120,k.life=7+a()*6,k.burst=!1};cs.forEach((k,F)=>{F<Ht*.7&&(ro(k),k.pos.y+=a()*12)});const qe=new xt,se=new q(St,3).setUsage(Te),xs=new q(pe,1).setUsage(Te),Is=new q(ls,1).setUsage(Te);qe.setAttribute("position",se),qe.setAttribute("aSize",xs),qe.setAttribute("aAlpha",Is);const Ie=new st({uniforms:{uScale:{value:1}},vertexShader:Cr,fragmentShader:Tr,transparent:!0,depthWrite:!1}),je=new be(qe,Ie);je.frustumCulled=!1,je.renderOrder=9,i.add(je),r.push(qe,Ie);let us=0;le.onBubbles=k=>bs(k,18);const bs=(k,F=14)=>{for(let L=0;L<F;L++){const B=cs[us];us=(us+1)%Ht,B.pos.set(k.x+(a()-.5)*.6,k.y+(a()-.5)*.4,k.z+(a()-.5)*.6),B.vel=1.6+a()*2.2,B.size=50+a()*150,B.life=2.6+a()*2.2,B.burst=!0}},He=new Me,Xe=new Se,ce=new v,Zt=new v,me=new v,Es=new v,ds=new v,Ms=new v(1,0,0),Ye=(k,F,L,B)=>(L.lengthSq()<1e-6&&L.set(1,0,0),L.normalize(),He.setFromUnitVectors(Ms,L),ds.setScalar(B),k.compose(F,He,ds));return{group:i,update:(k,F,L,B,X,K=null)=>{const w=l.uUnder.value,M=l.uNight.value;d.visible=w>.5,d.position.copy(L.position),l.uWaterRays.value=(1-lt(3,30,B))*(1-M*.5);const P=w*(1-lt(4,26,B))*(1-M*.55);for(const z of p)z.material.uniforms.uOpacity.value=P*z.userData.strength*.26,z.visible=P>.01,z.visible&&(c.set(L.position.x-z.position.x,0,L.position.z-z.position.z),z.rotation.y=Math.atan2(c.x,c.z));if(H.uOpacity.value=w*lt(12,30,B)*(.55+M*.45),j.visible=H.uOpacity.value>.01,j.visible&&(H.uOrigin.value.copy(L.position).subScalar(D/2),H.uScale.value=X,K&&K.strength>0&&(H.uScareOrigin.value.copy(K.origin),H.uScareDir.value.copy(K.dir)),H.uScare.value=K?K.strength:0),T.uniforms.uOpacity.value=w*(.25+lt(6,40,B)*.45),T.uniforms.uScale.value=X,_.visible=w>.02,_.visible){const z=L.position.x-b/2,R=L.position.y-b/2,it=L.position.z-b/2,Et=F*.35;for(let ht=0;ht<g;ht++){const Xt=y[ht*3],co=y[ht*3+1],ho=y[ht*3+2],$i=((Xt-z+Math.sin(F*.2+ht)*.3)%b+b)%b+z,Zi=((co-R-Et)%b+b)%b+R,Ki=((ho-it)%b+b)%b+it;x[ht*3]=$i,x[ht*3+1]=Math.min(Zi,-.2),x[ht*3+2]=Ki}C.needsUpdate=!0}for(const z of bt){z.center(F,me);const R=me.distanceTo(L.position)<60;z.mesh.visible=w>.01&&R,z.mesh.visible&&(z.fish.forEach((it,Et)=>{const ht=F*it.speed*.5+it.phase;Zt.set(Math.sin(ht)*it.offset.x,Math.sin(ht*1.3)*it.offset.y*.5+it.offset.y,Math.cos(ht)*it.offset.z).add(me);const Xt=z.previous[Et];Xt.lengthSq()===0&&(Xt.copy(Zt).x-=.01),ce.copy(Zt).sub(Xt),z.center(F+.4,Es),ce.addScaledVector(Es.sub(me),.25),z.mesh.setMatrixAt(Et,Ye(Xe,Zt,ce,it.scale)),Xt.lerp(Zt,.35)}),z.mesh.instanceMatrix.needsUpdate=!0)}{const z=F*It.speed;c.set(qt.x+Math.cos(z)*It.x,qt.y+Math.sin(F*.2)*1.2,qt.z+Math.sin(z)*It.z),ce.set(-Math.sin(z)*It.x,Math.cos(F*.2)*.24,Math.cos(z)*It.z),ft.matrixAutoUpdate=!1,Ye(ft.matrix,c,ce,1.15),ft.visible=w>.01&&B>4&&B<44,ct?.setPredator(c,ft.visible?5.6:0)}for(let z=0;z<$;z++){const R=Tt[z],it=Math.sin(F*.21+R.phase)*1.6+Math.sin(F*.37+R.phase*1.7)*.5;h.position.set(R.home.x+Math.sin(F*.2+R.phase)*1.2,R.home.y+it,R.home.z+Math.cos(F*.17+R.phase)*1.2),h.rotation.set(Math.sin(F*.3+R.phase)*.18,F*.1,Math.cos(F*.27+R.phase)*.18),h.scale.setScalar(R.scale),h.updateMatrix(),J.setMatrixAt(z,h.matrix)}J.instanceMatrix.needsUpdate=!0,J.visible=w>.01&&B>6,gt.forEach((z,R)=>{const it=F*.12+z.phase;c.set(z.home.x+Math.cos(it)*2.5,z.home.y+Math.sin(F*.5+z.phase)*.6,z.home.z+Math.sin(it)*2.5),ce.set(-Math.sin(it),.05,Math.cos(it)),z.mesh.matrixAutoUpdate=!1,Ye(z.mesh.matrix,c,ce,z.mesh.scale.x),z.mesh.visible=w>.01&&B>22,Zt.set(1.12,1.18,0).applyMatrix4(z.mesh.matrix),Z.set([Zt.x,Zt.y,Zt.z],R*3)}),pt.needsUpdate=!0,tt.uniforms.uOpacity.value=(.65+.35*Math.sin(F*3.1)*Math.sin(F*1.7))*lt(20,30,B),tt.uniforms.uScale.value=X,At.visible=B>20;const I=B>30;ne.visible=I,re.visible=I,Ue.visible=I,le.update(k,F,L,I&&w>.01);for(const z of Nt)z.mesh.visible=I,I&&z.update(k,F,K);if(Yi.value=w*(1-lt(6,30,B)*.8)*(1-M*.6)*.32,ct&&(Wt[0]=w>.01&&B>2&&B<34&&ct.stats(0,Bt).center.distanceTo(L.position)<48,Wt[1]=w>.01&&I,ct.update(k,F,Wt,K,w*(1-lt(6,26,B))*(1-M*.7)*.6)),je.visible=w>.01,Ie.uniforms.uScale.value=X,je.visible){for(let z=0;z<Ht;z++){const R=cs[z];if(R.life<=0)if(!R.burst&&z<Ht*.75&&I)ro(R);else{ls[z]=0;continue}R.life-=k,R.pos.y+=R.vel*k,R.pos.x+=Math.sin(F*2.2+R.wobble)*.25*k,R.pos.z+=Math.cos(F*1.9+R.wobble)*.25*k,R.pos.y>-.3&&(R.life=0),St.set([R.pos.x,R.pos.y,R.pos.z],z*3),pe[z]=R.size,ls[z]=Math.min(1,R.life*1.5)*(R.burst?1:.85)}se.needsUpdate=!0,xs.needsUpdate=!0,Is.needsUpdate=!0}},burst:bs,setTheme:k=>{as.uTip.value.set(k?"#3f8f5b":"#5fae62"),as.uBase.value.set(k?"#163a26":"#1f4a2e")},tap:k=>le.tap(k),hover:k=>le.hover(k),lampOn:()=>le.lampOn,swarmStats:k=>ct?ct.stats(1,k):Nt[0].stats(k),thinSchool:k=>ct?.thin(k),dispose:()=>{r.forEach(k=>k.dispose()),Nt.forEach(k=>k.dispose()),ct?.dispose(),le.dispose()}}}const gi="/events/creator-challenge-4/creatures",Bs={whale:`
    float tail = smoothstep(0.1, -1.0, p.z);
    p.y += sin(uTime * 1.25 + uPhase - p.z * 1.6) * 0.22 * tail * tail;
    p.x += sin(uTime * 0.6 + uPhase) * 0.04 * (1.0 - p.z) * 0.5;`,serpent:`
    float body = smoothstep(1.0, -0.6, p.z);
    p.x += sin(p.z * 4.6 - uTime * 2.1 + uPhase) * 0.5 * body;
    p.y += sin(p.z * 3.2 - uTime * 1.6 + uPhase) * 0.12 * body;`,turtle:`
    float side = abs(p.z);
    float fin = smoothstep(0.42, 0.95, side);
    p.y += sin(uTime * 1.5 + uPhase + sign(p.z) * 0.6 + p.x * 0.8) * 0.55 * fin * (side - 0.42);`};async function Dr(l){const[t,s]=await Promise.all([fetch(`${gi}/${l}.bin`).then(m=>{if(!m.ok)throw new Error(`${l}.bin ${m.status}`);return m.arrayBuffer()}),fetch(`${gi}/${l}.jpg`).then(m=>{if(!m.ok)throw new Error(`${l}.jpg ${m.status}`);return m.blob()}).then(m=>createImageBitmap(m,{imageOrientation:"none",premultiplyAlpha:"none",colorSpaceConversion:"none"}))]),e=new DataView(t);if(e.getUint32(0,!0)!==827474764)throw new Error(`${l}.bin is not LCR1`);const o=e.getUint32(4,!0),i=e.getUint32(8,!0),a=new v(e.getFloat32(12,!0),e.getFloat32(16,!0),e.getFloat32(20,!0)),n=m=>m+3&-4;let r=24;const h=new Int16Array(t,r,o*3);r=n(r+o*6);const c=new Int8Array(t,r,o*3);r=n(r+o*3);const u=new Uint16Array(t,r,o*2);r=n(r+o*4);const d=o<65536?new Uint16Array(t,r,i):new Uint32Array(t,r,i),p=new xt;p.setAttribute("position",new q(h,3,!0)),p.setAttribute("normal",new q(c,3,!0)),p.setAttribute("uv",new q(u,2,!0)),p.setIndex(new q(d,1)),p.computeBoundingSphere(),p.boundingSphere&&(p.boundingSphere.radius*=1.6);const f=new Ao(s);return f.colorSpace=Lo,f.flipY=!1,f.needsUpdate=!0,{geometry:p,extent:a,texture:f}}const Nr=`
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
`,Wr=`
uniform vec3 uInk;
uniform float uOpacity;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uInk, uOpacity);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`;function Vr(l,t,s){const e=new nt;e.name="creatures-island";const o=new nt;o.name="creatures-world",s.islandHost.add(e);const i=[];let a=!1;const n=(d,p,f,m,g,b)=>{const x={value:0},y={value:b},S=Re(l,{vertexColors:!1,rim:.55,rimColor:"#ffd9a8"});S.map=p.texture,S.transparent=!0,S.opacity=0;const A=S.onBeforeCompile;S.onBeforeCompile=(j,et)=>{A.call(S,j,et),j.uniforms.uPhase=y,j.uniforms.uTime=l.uTime,j.vertexShader=j.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uPhase;`).replace("#include <begin_vertex>",`#include <begin_vertex>
{ vec3 p = transformed; ${Bs[d]}
 transformed = p; }`)},S.customProgramCacheKey=()=>`larch-creature-${d}`;const C=new U(p.geometry,S),T=new st({uniforms:{uWidth:t.uWidth,uWidthScale:{value:.85},uResolution:t.uResolution,uTime:l.uTime,uPhase:y,uInk:{value:new E(g)},uOpacity:x,fogColor:{value:new E},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:2e3}},vertexShader:Nr.replace("DEFORM_BODY",Bs[d]),fragmentShader:Wr,side:os,fog:!0,transparent:!0}),_=new U(p.geometry,T),W=Math.max(p.extent.x,p.extent.y,p.extent.z)*2,D=f/W,Y=new nt;Y.scale.copy(p.extent).multiplyScalar(D),Y.add(C,_);const V=new nt;V.name=`creature-${d}`,V.add(Y);for(const j of[C,_])j.castShadow=j===C,j.frustumCulled=!0;const G={kind:d,root:V,body:C,outline:_,fade:x,shown:0,update:()=>{}};return(s.prepare?s.prepare(V).catch(()=>{}):Promise.resolve()).then(()=>{a||(m.add(V),i.push(G))}),G},r=(d,p,f,m,g,b)=>{const x={value:0},y=Eo(l,p,{deform:Bs[d],phase:b,rim:.18});y.transparent=!0,y.opacity=0;const S=new U(p.geometry,y);S.name=`creature-${d}-body`;const A=zn(l,t,S,{ink:g,width:0,deform:Bs[d],phase:y.userData.phase,opacity:x});A.visible=!1;const C=Math.max(p.extent.x,p.extent.y,p.extent.z)*2;S.scale.copy(p.extent).multiplyScalar(f/C),S.castShadow=!0,p.geometry.boundingSphere&&(p.geometry.boundingSphere.radius*=1.6);const T=new nt;T.name=`creature-${d}`,T.add(S);const _={kind:d,root:T,body:S,outline:A,fade:x,shown:0,update:()=>{}};return T.userData.halfHeight=p.extent.y*(f/C),(s.prepare?s.prepare(T).catch(()=>{}):Promise.resolve()).then(()=>{a||(m.add(T),i.push(_))}),_},h=new v,c=(d,p)=>{const f=new v,m=new v;d.update=(g,b)=>{p(b,f),p(b+.35,m),d.root.position.copy(f),h.subVectors(m,f),d.root.rotation.set(0,Math.atan2(h.x,h.z),0,"YXZ"),d.root.rotation.x=-Math.atan2(h.y,Math.hypot(h.x,h.z))}};Dr("whale").then(d=>{if(a)return;const p=n("whale",d,7.5,o,"#2a2550",0);c(p,(m,g)=>{const b=m*.07+2.2;return g.set(Math.cos(b)*22,7.8+Math.sin(m*.21)*1.2,Math.sin(b)*22-8)});const f=p.update;p.update=(m,g,b)=>{f(m,g,b),p.root.rotation.z=Math.sin(g*.21+.6)*.08-.12}}).catch(d=>console.warn("[islandDive] creature failed","whale",d instanceof Error?d.message:d));{const d=ur();d.root.scale.setScalar(1.2);const p=new nt;p.name="creature-turtle",p.add(d.root);const f=new U;f.visible=!1;const m={kind:"turtle",root:p,body:f,outline:f,fade:{value:0},shown:0,update:()=>{},materials:d.materials,dispose:d.dispose},g=new v,b=new v,x=new v,y=new v;let S=!1;m.update=(C,T,_)=>{_.getWorldDirection(b),x.set(-b.z,0,b.x).normalize(),g.copy(_.position).addScaledVector(b,14).addScaledVector(x,2.6+Math.sin(T*.23)*1),g.y+=-2.6+Math.sin(T*.47)*.7,g.y=Math.max(g.y,ie+2.6),y.copy(p.position),S?p.position.lerp(g,1-Math.exp(-C*.9)):(p.position.copy(g),S=!0),h.subVectors(p.position,y),h.lengthSq()<1e-6&&h.copy(x).multiplyScalar(-1).add(b),p.rotation.set(0,Math.atan2(-h.z,h.x),Math.atan2(h.y,Math.hypot(h.x,h.z))*.6,"YXZ"),d.animate(T)},(s.prepare?s.prepare(p).catch(()=>{}):Promise.resolve()).then(()=>{a||(o.add(p),i.push(m))})}const u=[["serpent",d=>{const p=r("serpent",d,4.4,e,"#14324a",1.3);c(p,(g,b)=>{const x=-g*.085+2.75,y=13.2+Math.sin(g*.17)*.8;return b.set(Math.cos(x)*y,.12+Math.sin(g*.43)*.1,Math.sin(x)*y)});const f=p.update,m=new v;p.update=(g,b,x)=>{f(g,b,x),e.worldToLocal(x.getWorldPosition(m));const y=p.root.position,S=(y.x*m.x+y.z*m.z)/(Math.hypot(y.x,y.z)*Math.hypot(m.x,m.z)+1e-6),A=Math.min(1,Math.max(0,(S-.05)/.5));y.y-=A*A*(3-2*A)*2.6}}]];for(const[d,p]of u)xn(d).then(f=>{a||p(f)}).catch(f=>{console.warn("[islandDive] creature failed",d,f instanceof Error?f.message:f)});return{island:e,world:o,update(d,p,f){const m=f.position.y;for(const g of i){const b=g.kind==="turtle"?m<-.6:g.kind==="serpent"?m>-12:m>-.35;if(g.root.visible=b,!b)continue;g.shown=Math.min(1,g.shown+d/1.2);const x=g.shown*g.shown*(3-2*g.shown);g.fade.value=x;const y=g.body.material;y.opacity=x,y.transparent=x<1;for(const S of g.materials||[])S.opacity=x,S.transparent=x<1||S.userData.seeThrough===!0;g.outline.material.transparent=x<1,g.update(d,p,f)}},dispose(){a=!0;for(const d of i){if(d.dispose){d.dispose();continue}d.body.geometry.dispose(),d.body.material.map?.dispose(),d.body.material.dispose(),d.outline.material.dispose()}e.removeFromParent(),o.removeFromParent()}}}const vi=[{color:"#ffd98a",deep:"#d9902a",top:"#8a4b22"},{color:"#ffc2d6",deep:"#d4588a",top:"#b03a5c"},{color:"#c9eaa0",deep:"#6fa63a",top:"#3f6b25"}],Lr=l=>1+(2.2+1)*(l-1)**3+2.2*(l-1)**2,Or=new E("#e6c99a"),Gr=new E("#ecd6a8"),Ur=new E("#bfae86"),Br=new v,qr=new E;class jr{island;items=[];history=[];nextId=1;seed=1;mask;vertexX;vertexZ;vertexY;buckets;grassBase=[];strokeProtect=null;strokeTouched=!1;sinceWater=0;cursor;cursorMaterial;onChange=null;constructor(t){this.island=t;const s=t.sculpt,e=s.size;this.mask=new Float32Array(e*e);for(let c=0;c<e;c++)for(let u=0;u<e;u++)this.mask[c*e+u]=ni(s.pointX(u),s.pointZ(c));const o=t.kit,i=o.terrain.geometry.getAttribute("position"),a=o.terrainVertices;this.vertexX=new Float32Array(a),this.vertexZ=new Float32Array(a),this.vertexY=new Float32Array(a);const n=e-1,r=Array.from({length:n*n},()=>[]);for(let c=0;c<a;c++){const u=i.getX(c),d=i.getZ(c);if(this.vertexX[c]=u,this.vertexZ[c]=d,this.vertexY[c]=i.getY(c),ni(u,d)<=.001)continue;const p=Math.floor((u+s.extent)/s.cell),f=Math.floor((d+s.extent)/s.cell);p<0||f<0||p>=n||f>=n||r[f*n+p].push(c)}this.buckets=r.map(c=>Int32Array.from(c));const h=o.grass;for(let c=0;c<h.count;c++){const u=new Float32Array(16);h.instanceMatrix.array.slice(c*16,c*16+16).forEach((d,p)=>{u[p]=d}),this.grassBase.push({x:u[12],y:u[13],z:u[14]})}this.cursorMaterial=new Xs({color:"#ffffff",transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1,side:Gt}),this.cursor=new U(new ca(.9,1,64,1),this.cursorMaterial),this.cursor.renderOrder=20,this.cursor.visible=!1,this.cursor.name="workshop-cursor",t.top.add(this.cursor)}get canUndo(){return this.history.length>0}get itemCount(){return this.items.length}beginStroke(){this.remember(),this.strokeProtect=[...this.island.kit.protect,...this.items.map(t=>[t.x,t.z,this.specOf(t.kind).radius+.1])],this.strokeTouched=!1,this.sinceWater=0}brush(t,s,e,o,i){const a=this.island.sculpt,n=a.size,r=a.cell,h=a.data,c=this.strokeProtect||this.island.kit.protect,u=Math.max(1,Math.floor((t-o+a.extent)/r)),d=Math.min(n-2,Math.ceil((t+o+a.extent)/r)),p=Math.max(1,Math.floor((s-o+a.extent)/r)),f=Math.min(n-2,Math.ceil((s+o+a.extent)/r));if(u>d||p>f)return!1;const m=e==="raise"?.62:e==="lower"?-.62:0,g=h.slice(),b=e==="smooth"?Math.min(1,i*10):Math.min(1,i*2.2);let x=!1;for(let y=p;y<=f;y++)for(let S=u;S<=d;S++){const A=y*n+S,C=this.mask[A];if(C<=0)continue;const T=a.pointX(S),_=a.pointZ(y),W=Math.hypot(T-t,_-s);if(W>o)continue;let D=1;for(const[et,bt,Rt]of c){const Dt=Math.hypot(T-et,_-bt);Dt<Rt+.5&&(D=Math.min(D,lt(Rt,Rt+.5,Dt)))}const V=Math.exp(-3.2*(W/o)**2)*(1-(W/o)**6)*C*D;if(V<=.001)continue;const G=h[A],H=(g[A-1]+g[A+1]+g[A-n]+g[A+n]+g[A]*4)/8,j=G+(H-G)*b*V;h[A]=Math.min(Li,Math.max(Vi,j+m*i*V)),h[A]!==G&&(x=!0)}return x?(a.dirty=!0,this.strokeTouched=!0,this.updateTerrain(a.pointX(u)-r,a.pointZ(p)-r,a.pointX(d)+r,a.pointZ(f)+r),this.sinceWater+=i,this.sinceWater>.22&&(this.sinceWater=0,this.island.refreshWater()),!0):!1}endStroke(){this.strokeTouched||this.history.pop(),this.strokeProtect=null,this.strokeTouched&&(this.strokeTouched=!1,this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater(),this.changed())}updateTerrain(t,s,e,o){const i=this.island.sculpt,a=i.size-1,n=i.cell,r=this.island.kit.terrain.geometry,h=r.getAttribute("position"),c=r.getAttribute("normal"),u=r.getAttribute("color"),d=this.island.ground,p=Math.max(0,Math.floor((t+i.extent)/n)),f=Math.min(a-1,Math.floor((e+i.extent)/n)),m=Math.max(0,Math.floor((s+i.extent)/n)),g=Math.min(a-1,Math.floor((o+i.extent)/n)),b=.05;for(let S=m;S<=g;S++)for(let A=p;A<=f;A++)for(const C of this.buckets[S*a+A]){const T=this.vertexX[C],_=this.vertexZ[C],W=i.sample(T,_),D=this.vertexY[C]+W;h.setY(C,D);const Y=-(d(T+b,_)-d(T-b,_))/(2*b),V=-(d(T,_+b)-d(T,_-b))/(2*b),G=Math.hypot(Y,1,V);c.setXYZ(C,Y/G,1/G,V/G);const H=qr.copy(Ui(Br.set(T,D,_)));W<-.02&&(H.lerp(Gr,lt(Le+.2,Le+.04,D)),H.lerp(Ur,lt(Le+.02,Le-.2,D))),Math.abs(W)>.02&&H.lerp(Or,lt(.66,.46,1/G)*.75),u.setXYZ(C,H.r,H.g,H.b)}h.needsUpdate=!0,c.needsUpdate=!0,u.needsUpdate=!0;const x=this.island.kit.grass;let y=!1;this.grassBase.forEach((S,A)=>{if(S.x<t-.3||S.x>e+.3||S.z<s-.3||S.z>o+.3)return;const C=x.instanceMatrix.array,T=i.sample(S.x,S.z),_=S.y+T<Le+.03&&T<-.02;C[A*16+13]=_?-50:S.y+T,y=!0}),y&&(x.instanceMatrix.needsUpdate=!0)}refreshAllTerrain(){const t=this.island.sculpt.extent;this.updateTerrain(-t,-t,t,t),this.island.kit.terrain.geometry.computeBoundingSphere(),this.island.refreshWater()}specOf(t){return jo.find(s=>s.kind===t)}canPlace(t,s,e,o){const i=this.island;if(i.ground(s,e)<.18||i.pond.depthAt(s,e)>.005)return!1;const n=Math.atan2(e,s);if(Math.hypot(s,e)>i.kit.walkArea.swimReach(n)/1.45*.98)return!1;const r=.12;if(Math.hypot(i.ground(s+r,e)-i.ground(s-r,e),i.ground(s,e+r)-i.ground(s,e-r))/(2*r)>.9)return!1;const c=this.specOf(t).radius;for(const[u,d,p]of i.kit.protect)if(Math.hypot(s-u,e-d)<(p+c)*.72)return!1;for(const u of this.items)if(u!==o&&Math.hypot(s-u.x,e-u.z)<(this.specOf(u.kind).radius+c)*.8)return!1;return!(!o&&this.items.length>=xa||!o&&t==="slime"&&this.items.filter(u=>u.kind==="slime").length>=ba)}place(t,s,e,o,i=Math.random()*Math.PI*2,a=!0){a&&this.remember();const n=this.build({id:`item-${this.nextId++}`,kind:t,x:e,z:o,yaw:i,look:s});return this.items.push(n),n.jelly?n.pop=0:this.island.wobble.pop(n.root),a&&this.changed(),n}beginMove(){this.remember()}moveTo(t,s,e){const o=this.items.find(a=>a.id===t.id);if(!o||!this.canPlace(o.kind,s,e,o))return!1;o.x=s,o.z=e;const i=this.island.ground(s,e);return o.walker?(o.walker.position.set(s,i-.02,e),o.walker.pause()):(o.root.position.x=s,o.root.position.z=e,o.root.position.y=i+(o.root.userData.lift??0),this.island.wobble.setBase(o.root,{x:s,y:i,z:e})),o.shadow&&o.shadow.position.set(s,i+.035,e),!0}endMove(t){if(!t){this.history.pop();return}this.changed()}rotate(t,s){const e=this.items.find(o=>o.id===t.id);e&&(this.remember(),e.yaw+=s,e.root.rotation.y+=s,this.island.wobble.poke(e.root,.5),e.jelly?.poke(),this.changed())}remove(t,s=!0){const e=this.items.findIndex(i=>i.id===t.id);if(e<0)return;s&&this.remember();const[o]=this.items.splice(e,1);this.destroy(o),s&&this.changed()}hitItem(t){let s=null,e=1/0;for(const o of this.items){const i=o.jelly?o.jelly.hit(t):t.intersectObject(o.root,!0)[0];i&&i.distance<e&&(s=o,e=i.distance)}return s}showCursor(t,s=1,e="ok"){if(!t){this.cursor.visible=!1;return}const o=this.cursor.geometry,i=o.getAttribute("position"),a=this.island.ground;for(let r=0;r<i.count;r++){const h=i.getX(r),c=i.getY(r),u=Math.hypot(h,c)||1,d=(u>.95?1:.9)*s,p=t.x+h/u*d,f=t.z+c/u*d;i.setXYZ(r,p,a(p,f)+.06,f)}i.needsUpdate=!0,o.computeBoundingSphere(),this.cursor.position.set(0,0,0),this.cursor.rotation.set(0,0,0);const n={raise:"#9df0c6",lower:"#9fd6ff",smooth:"#fff1c9",ok:"#ffffff",blocked:"#ff7a8a"};this.cursorMaterial.color.set(n[e]),this.cursor.visible=!0}update(t){for(const s of this.items)!s.jelly||s.pop>=1||(s.pop=Math.min(1,s.pop+t/.45),s.jelly.group.scale.setScalar(s.scale*Math.max(.001,Lr(s.pop))),s.pop>=1&&s.jelly.land(3))}snapshotItems(){return this.items.map(({id:t,kind:s,x:e,z:o,yaw:i,look:a})=>({id:t,kind:s,x:Number(e.toFixed(3)),z:Number(o.toFixed(3)),yaw:Number(i.toFixed(3)),look:a}))}load(t){for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.decode(t.sculpt),this.refreshAllTerrain();for(const s of t.items){if(!this.canPlace(s.kind,s.x,s.z))continue;const e=this.build({...s,id:`item-${this.nextId++}`});this.items.push(e)}this.history.length=0}reset(){this.remember();for(const t of[...this.items])this.remove(t,!1);this.island.sculpt.clear(),this.refreshAllTerrain(),this.changed()}undo(){const t=this.history.pop();if(!t)return!1;for(const s of[...this.items])this.remove(s,!1);this.island.sculpt.restore(t.sculpt),this.refreshAllTerrain();for(const s of t.items)this.items.push(this.build(s));return this.onChange?.(),!0}remember(){this.history.push({sculpt:this.island.sculpt.snapshot(),items:this.snapshotItems()}),this.history.length>30&&this.history.shift()}changed(){this.onChange?.()}build(t){const s=this.island,e=s.kit,o=s.top,i=s.ground(t.x,t.z),a={...t,root:new nt,shadow:null,jelly:null,walker:null,owned:[],pop:1,scale:1},n=this.specOf(t.kind),r=(u,d=e.solid)=>{const p=new Bi(()=>0);u(p);const f=p.solid.build(!0);a.owned.push(f);const m=new U(f,d);return m.castShadow=!0,m.receiveShadow=!0,m},h=(u,d=0)=>{u.position.set(t.x,i+d,t.z),u.rotation.y=t.yaw,u.userData.lift=d,u.name=u.name||`workshop-${t.kind}`,o.add(u),s.wobble.add(u,{x:t.x,y:i,z:t.z}),a.root=u},c=(u,d,p,f)=>{const m=e.models[u];if(!m)return!1;const g=e.placeModel(m,{x:t.x,z:t.z,height:d,yaw:t.yaw,sink:p,wind:f,y:i});return g.userData.lift=g.position.y-i,a.root=g,!0};switch(t.kind){case"palm":c("palm",3.2,.12,.04)||h(r(u=>u.palm({x:0,z:0},.9,.8,0)));break;case"tree":case"blossom":h(Fi(t.kind,11+this.seed++%7,e.treeMaterials,t.kind==="tree"?2.6:2.8),-.06);break;case"bush":h(r(u=>u.bush({x:0,z:0},.75)));break;case"flowers":h(r(u=>{const d=["#ff9ec4","#ffffff","#ffd98a","#c9b2ff"];for(let p=0;p<4;p++){const f=p*1.7+t.look,m=p?.17:0;u.flower({x:Math.cos(f)*m,z:Math.sin(f)*m},d[(p+Math.round(Math.abs(t.yaw)*3))%d.length])}}));break;case"rocks":c("rocks",.62,.18)||h(r(u=>u.rock({x:0,z:0},.45)));break;case"cottage":c("cottage",2.6,.08)||h(r(u=>u.house({x:0,z:0},0,"#ec6a5c","#8f5a3a")));break;case"lighthouse":h(r(u=>u.lighthouse({x:0,z:0}),e.still));break;case"slime":case"jelly":case"pudding":{const u=t.kind==="pudding"?vi[t.look%vi.length]:No[t.look%No.length],d=new he(t.kind==="slime"?"slime":t.kind==="jelly"?"cube":"pudding",u,e.env,{face:t.kind==="slime",seed:20+this.seed++,outlines:e.outlines});a.scale=t.kind==="slime"?.52:t.kind==="jelly"?.42:.5,d.group.position.set(t.x,i-.02,t.z),d.group.scale.setScalar(a.scale),d.group.rotation.y=t.yaw,d.group.name=`workshop-${t.kind}`,o.add(d.group),a.jelly=d,a.root=d.group,s.jellies.push(d),a.shadow=e.addShadow(t.x,t.z,.95*a.scale,.3),t.kind==="slime"&&(a.walker=new Di(d,e.walkArea,s.walkers,a.shadow,s.walkers.length+1),s.walkers.push(a.walker));break}}return a.shadow||(a.shadow=e.addShadow(t.x,t.z,n.radius*1.5,.26)),a.shadow.position.y=i+.035,a}destroy(t){const s=this.island;if(s.wobble.remove(t.root),t.root.removeFromParent(),t.jelly){const e=s.jellies.indexOf(t.jelly);e>=0&&s.jellies.splice(e,1),t.jelly.dispose()}if(t.walker){const e=s.walkers.indexOf(t.walker);e>=0&&s.walkers.splice(e,1)}t.shadow&&(t.shadow.removeFromParent(),t.shadow.geometry.dispose(),t.shadow.material.dispose()),t.owned.forEach(e=>e.dispose())}async thumbnails(t,s,e,o){const a=new Co(128,128,{type:To,format:Oo,samples:4}),n=new Ci;n.environment=s,n.environmentIntensity=.32;const r=new Po("#fff0d4",2.2);r.position.set(3,6,4),n.add(r,new Ti("#cfeeff","#a5cf7f",1.2),new ha("#ffffff",.15));const h=new Ai(30,1,.05,60),c=new Uint16Array(16384*4),u=document.createElement("canvas");u.width=u.height=128;const d=u.getContext("2d"),p={},f=this.island.kit.env,m={sun:f.uSunDir.value.clone(),sunColor:f.uSunColor.value.clone(),sky:f.uSkyColor.value.clone(),ground:f.uGroundColor.value.clone(),night:f.uNight.value};f.uSunDir.value.set(.45,.78,.42).normalize(),f.uSunColor.value.set("#fff1d6"),f.uSkyColor.value.set("#bfe6ff"),f.uGroundColor.value.set("#9cc46e"),f.uNight.value=0;const g=t.getRenderTarget();try{for(const b of jo){if(!e()||!d)break;const x=this.build({id:"thumb",kind:b.kind,x:0,z:0,yaw:.6,look:0}),y=x.root;this.island.wobble.remove(y),y.removeFromParent(),y.position.set(0,x.jelly?0:y.userData.lift??0,0),y.updateMatrixWorld(!0),n.add(y),x.jelly&&(x.jelly.group.scale.setScalar(1),x.jelly.update(.016,0));const S=new v,A=x.jelly?x.jelly.height:Math.max(.6,this.boundsHeight(y));S.set(0,A*.5,0);const C=Math.max(A,b.radius*2.2)*2.25;h.position.set(C*.62,A*.55+C*.42,C*.78),h.lookAt(S),t.setRenderTarget(a),t.setClearColor(0,0),t.clear(),t.render(n,h),t.readRenderTargetPixels(a,0,0,128,128,c);const T=d.createImageData(128,128);for(let _=0;_<128;_++)for(let W=0;W<128;W++){const D=((127-_)*128+W)*4,Y=(_*128+W)*4,V=ve(qo.fromHalfFloat(c[D+3]));for(let G=0;G<3;G++){const H=Math.max(0,qo.fromHalfFloat(c[D+G]))/Math.max(V,1e-4)*1.02,j=H<.76?H:.76+(1-.76)*(1-Math.exp(-(H-.76)/(1-.76))),et=j<=.0031308?j*12.92:1.055*j**(1/2.4)-.055;T.data[Y+G]=Math.round(ve(et)*255)}T.data[Y+3]=Math.round(V*255)}d.putImageData(T,0,0),p[b.kind]=u.toDataURL("image/png"),n.remove(y),this.island.top.add(y),this.destroy(x),await o()}}finally{t.setRenderTarget(g),a.dispose(),f.uSunDir.value.copy(m.sun),f.uSunColor.value.copy(m.sunColor),f.uSkyColor.value.copy(m.sky),f.uGroundColor.value.copy(m.ground),f.uNight.value=m.night}return p}boundsHeight(t){let s=0;return t.traverse(e=>{const o=e;if(!o.isMesh)return;o.geometry.computeBoundingBox();const i=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);s=Math.max(s,i.max.y)}),s}dispose(){for(const t of[...this.items])this.destroy(t);this.items.length=0,this.cursor.removeFromParent(),this.cursor.geometry.dispose(),this.cursorMaterial.dispose()}}function ll(){try{if((navigator.deviceMemory??8)<2)return!1;const s=document.createElement("canvas").getContext("webgl2");return s?(s.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}let ks=null;function wi(){if(ks!==null)return ks;try{const t=document.createElement("canvas").getContext("webgl2");ks=!!t?.getExtension("EXT_color_buffer_float"),t?.getExtension("WEBGL_lose_context")?.loseContext()}catch{ks=!1}return ks}function Hr(){const l=navigator,t=l.deviceMemory??8,s=l.hardwareConcurrency??8,e=window.matchMedia("(pointer: coarse)").matches,o=t<=2||s<=2?"low":e||t<=4||s<=4?"medium":"high";return za(o)}const Cs={high:{dpr:1.6,antialias:!0,shadow:2048,detail:"high",segments:168,frameMs:0,bloom:!0,swarm:1,school:{width:128,baitBall:10240,reef:1536},ripples:256},medium:{dpr:1.5,antialias:!0,shadow:1024,detail:"low",segments:120,frameMs:0,bloom:!1,swarm:.5,school:{width:64,baitBall:3584,reef:640},ripples:160},low:{dpr:1,antialias:!1,shadow:0,detail:"low",segments:96,frameMs:1e3/32,bloom:!1,swarm:.3,school:null,ripples:0}},Xr=13,Yr=`
uniform float uScale;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 120.0 * uScale / -mvPosition.z;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mvPosition;
}
`,$r=`
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float star = max(1.0 - smoothstep(0.0, 0.06, abs(c.x)) * 1.0, 0.0) * (1.0 - smoothstep(0.0, 0.5, abs(c.y)));
  star = max(star, (1.0 - smoothstep(0.0, 0.06, abs(c.y))) * (1.0 - smoothstep(0.0, 0.5, abs(c.x))));
  float glow = 1.0 - smoothstep(0.0, 0.5, length(c));
  float a = (star * 0.9 + glow * glow * 0.6) * vAlpha;
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.45), a);
}
`,ko=l=>l*l*(3-2*l),Zr=new v(Math.sin(to)*18.5,-.7,Math.cos(to)*18.5),Kr=new v(0,-2.2,0),Ee=l=>Math.min(1,Math.max(0,l));async function Qr(l){const t={},s=Promise.allSettled(Sa.map(e=>_i(e).then(o=>{t[e]=Ni(e,o)})));return await Promise.race([s,new Promise(e=>window.setTimeout(e,l))]),{...t}}const ts=()=>new Promise(l=>{const t=globalThis.scheduler;t?.yield?t.yield().then(l):window.setTimeout(l,0)});class cl{options;renderer;scene=new Ci;camera=new Ai(36,1,.1,900);env=Aa();hemi=new Ti("#cfeeff","#a5cf7f",1.2);sun=new Po("#fff0d4",2.2);fill=new Po("#ff9f86",.6);fog=new ua("#d3effa",.0055);depthLight={value:new E("#bff3ff")};outlines=tn();post=null;environment=null;creatures=null;island;ocean=null;oceanPending=!1;sky;sparkles;booted=!1;sparkleState=[];raycaster=new da;pointer=new vt;tier;theme;night=0;nightTarget=0;frame=0;frameCount=0;frameTimes=0;lastTime=0;lastRender=0;elapsed=0;running=!1;destroyed=!1;pixelRatio=1;width=1;height=1;camPos=new v(0,12,26);camTarget=new v(0,1.3,0);posed=!1;yaw=-.18;yawVel=0;idleFor=0;bladeVel=.8;ballSpin=new v;drag=null;sword=null;played=!1;hoverQueued=null;handAt=null;handDown=!1;touched=!1;slowFrames=0;sampledFrames=0;downgraded=0;dprSteps=0;lastCalls=0;thinned=!1;resizeObserver=null;cleanups=[];scrollY=0;heroHeight=1;scrollRange=1;depth=0;framingKey="";scratchVectors=Array.from({length:6},()=>new v);scratchColors=[new E,new E];below={fog:new E,glow:new E,abyss:new E,density:0,hemi:0,light:new E};worldPos=new v;spinQuat=new Me;spinAxis=new v;scare={origin:new v,dir:new v,strength:0};scareAt=-10;swarmProbe=new v;slot=null;swell={height:0,slopeX:0,slopeZ:0};ripplePoint=new v;lastRipple={t:-10,at:new v};ripples;hoverWater=null;spin={omega:0,alpha:0,lastYaw:-.18};ambientRipple=0;slimeTrails=new Map;workshop=null;editing=!1;tool={kind:"raise",size:1.1};selectedId=null;water={...Ho};designTimer=0;constructor(t){this.options=t,this.theme=t.theme,this.night=this.nightTarget=t.theme==="dark"?1:0,this.tier=t.tier||Hr();const s=Cs[this.tier],e=s.bloom&&wi();if(this.renderer=new fa({canvas:t.canvas,antialias:s.antialias&&!e,alpha:!1,powerPreference:this.tier==="high"?"high-performance":"default",stencil:!1}),this.renderer.toneMapping=pa,this.renderer.info.autoReset=!1,this.renderer.toneMappingExposure=1.02,this.renderer.localClippingEnabled=!0,s.shadow){this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ma,this.sun.castShadow=!0,this.sun.shadow.mapSize.set(s.shadow,s.shadow);const o=this.sun.shadow.camera;o.left=-10,o.right=10,o.top=10,o.bottom=-10,o.near=1,o.far=60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=6}this.ripples=s.ripples&&ya(this.renderer)?new wa(this.renderer,{size:s.ripples,extent:Xr,speed:2.2,damping:.988}):null,this.ripples&&(this.ripples.uniforms.uRippleAmp.value=3),this.scene.fog=this.fog,this.scene.background=new E("#d3effa"),this.scene.add(this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.boot(e)}async boot(t){const s=this.options,e=Cs[this.tier],o=(p,f)=>{this.destroyed||s.onProgress?.(p,f)};if(o(.08,"sky"),await ts(),this.destroyed||(this.sky=cn(this.env,e.detail),await ts(),this.destroyed))return;o(.16,"light");const i=new ga(this.renderer);if(this.environment=i.fromScene(new va,.04).texture,i.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=.32,await ts(),this.destroyed)return;o(.24,"models");const a=await Qr(7e3);if(this.destroyed)return;if(o(.5,"island"),this.island=await jn(this.env,{segments:e.segments,detail:e.detail,outlines:this.outlines,models:a,ripples:this.ripples,vertexRipples:this.renderer.capabilities.maxVertexTextures>0},ts),this.destroyed){this.island.dispose();return}this.workshop=new jr(this.island),this.workshop.onChange=()=>this.workshopChanged();const n=s.design;n&&(this.workshop.load(n),this.water={...n.water},he.softness=n.soft,this.applyWater()),o(.72,"island"),this.sword=new or(this.island,this.scene,this.camera,p=>{this.options.onSword?.(p),p||this.options.root.querySelectorAll("[data-island-surface]").forEach(f=>{f.style.cursor===So&&(f.style.cursor="")})}),this.sword.propTargets=()=>{const p=this.island;return[...p.top.children.filter(f=>f.name.startsWith("model-")),p.blades,p.boat,p.ball,p.bottle,p.pier,...this.creatures?[...this.creatures.island.children,...this.creatures.world.children]:[]]},this.island.onSlimeSplash((p,f)=>{const m=this.island.top.localToWorld(p.clone());this.island.ripple(m.x,m.z,1.4+Math.min(1.2,f*.08)),window.setTimeout(()=>{this.destroyed||this.island.ripple(m.x+.15,m.z-.1,.9)},160),this.markPlayed()});for(const p of Object.values(a))for(const f of[p.map,p.normalMap])if(f&&(this.renderer.initTexture(f),await ts(),this.destroyed))return;this.scene.add(this.sky.group,this.island.group,this.island.seaSparkles),this.island.group.rotation.y=this.yaw;const r=18,h=new xt;h.setAttribute("position",new q(new Float32Array(r*3),3)),h.setAttribute("aAlpha",new q(new Float32Array(r),1)),this.sparkles=new be(h,new st({uniforms:{uScale:{value:1}},vertexShader:Yr,fragmentShader:$r,transparent:!0,depthWrite:!1,blending:Qt})),this.sparkles.frustumCulled=!1,this.sparkles.renderOrder=10;for(let p=0;p<r;p++)this.sparkleState.push({pos:new v,vel:new v,life:0});if(this.island.top.add(this.sparkles),this.applyTheme(!0),t)try{this.post=new Ta(this.renderer,{rays:!0})}catch{this.post=null}s.canvas.dataset.tier=this.tier,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(s.canvas),s.islandSlot&&this.resizeObserver.observe(s.islandSlot),this.resize(),this.readScroll();const c=()=>this.readScroll();s.scroller.addEventListener("scroll",c,{passive:!0}),this.cleanups.push(()=>s.scroller.removeEventListener("scroll",c));const u=()=>{document.hidden?this.stop():this.start()};document.addEventListener("visibilitychange",u),this.cleanups.push(()=>document.removeEventListener("visibilitychange",u));const d=p=>{p.preventDefault(),this.stop(),s.onFallback?.("context-lost")};s.canvas.addEventListener("webglcontextlost",d),this.cleanups.push(()=>s.canvas.removeEventListener("webglcontextlost",d)),this.bindPointer(),await ts(),!this.destroyed&&(o(.86,"shaders"),this.post?await this.post.compileAsync(this.scene,this.camera,()=>!this.destroyed):await qs(this.renderer,this.scene,this.camera,()=>!this.destroyed),!this.destroyed&&(this.booted=!0,this.start()))}ensureOcean(t=!1){if(this.destroyed)return;if(this.ocean){t&&!this.ocean.group.parent&&this.scene.add(this.ocean.group);return}const s=Cs[this.tier],e=s.school&&wi()&&this.renderer.capabilities.maxVertexTextures>0?{renderer:this.renderer,...s.school}:null,o=Rr(this.env,this.depthLight,s.detail,s.swarm,e);if(this.ocean=o,o.setTheme(this.theme==="dark"),this.thinned&&o.thinSchool(.5),t){this.scene.add(o.group);return}qs(this.renderer,o.group,this.camera,()=>!this.destroyed,this.scene).then(()=>{!this.destroyed&&!o.group.parent&&this.scene.add(o.group)})}setTheme(t){if(this.theme=t,this.nightTarget=t==="dark"?1:0,!this.island){this.night=this.nightTarget;return}this.applyTheme(!1)}setEditing(t){if(this.editing!==t){if(this.editing=t,this.idleFor=0,this.yawVel=0,this.workshop?.showCursor(null),this.island)for(const s of this.island.gulls)s.visible=!t;t&&this.sword?.armed&&(this.island&&(this.island.chest.open=!1),this.sword.putBack()),t||this.select(null),this.framingKey=""}}setTool(t){this.tool=t,this.workshop?.showCursor(null)}nudgeYaw(t){this.yawVel+=t*2.2,this.idleFor=0}rotateSelected(t){const s=this.selectedItem();s&&this.workshop&&this.workshop.rotate(s,t)}removeSelected(){const t=this.selectedItem();!t||!this.workshop||(this.workshop.remove(t),this.select(null))}undo(){this.workshop?.undo()&&(this.selectedId&&!this.workshop.items.some(t=>t.id===this.selectedId)?this.select(null):this.workshopChanged())}resetDesign(){this.workshop&&(this.select(null),this.workshop.reset(),this.water={...Ho},he.softness=Ma,this.applyWater(),this.workshopChanged())}setWater(t){this.water={...this.water,...t},this.applyWater(),this.workshopChanged()}setSoftness(t){if(he.softness=Math.min(1,Math.max(0,t)),this.island){for(const s of this.island.jellies)s.poke();this.island.wobble.nudgeAround(0,0,9,.6)}this.workshopChanged()}async thumbnails(){return this.workshop?this.workshop.thumbnails(this.renderer,this.environment,()=>!this.destroyed,ts):{}}design(){return!this.workshop||!this.island?null:{v:1,sculpt:this.island.sculpt.encode(),items:this.workshop.snapshotItems(),water:{...this.water},soft:Number(he.softness.toFixed(2))}}selectedItem(){return this.selectedId?this.workshop?.items.find(t=>t.id===this.selectedId)??null:null}select(t){this.selectedId=t?.id??null,this.workshopChanged(!1)}workshopChanged(t=!0,s=!1){const e=this.workshop;if(!e)return;const o=this.selectedItem();this.options.onWorkshop?.({selected:o?{id:o.id,kind:o.kind}:null,canUndo:e.canUndo,items:e.itemCount,blocked:s}),t&&(window.clearTimeout(this.designTimer),this.designTimer=window.setTimeout(()=>{const i=this.design();i&&!this.destroyed&&this.options.onWorkshop?.({selected:this.selectedItem()?{id:this.selectedId,kind:this.selectedItem().kind}:null,canUndo:e.canUndo,items:e.itemCount,design:i})},450))}applyWater(){this.island&&(this.island.seaUniforms.uSwellScale.value=this.water.swell,this.ripples&&(this.ripples.strength=this.water.ripple),this.applyTheme(!1))}destroy(){this.destroyed||(this.destroyed=!0,this.stop(),this.resizeObserver?.disconnect(),this.cleanups.forEach(t=>t()),this.sword?.dispose(),this.workshop?.dispose(),this.ripples?.dispose(),window.clearTimeout(this.designTimer),this.island&&(this.island.jellies.forEach(t=>t.dispose()),this.island.dispose()),this.ocean?.dispose(),this.creatures?.dispose(),this.sky?.dispose(),this.sparkles&&(this.sparkles.geometry.dispose(),this.sparkles.material.dispose()),this.post?.dispose(),this.environment?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss())}start(){if(!this.booted||this.running||this.destroyed||document.hidden)return;this.running=!0,this.lastTime=performance.now();const t=s=>{if(!this.running)return;this.frame=requestAnimationFrame(t);const e=Cs[this.tier].frameMs;if(e&&s-this.lastRender<e-1)return;const o=Math.min(.05,Math.max(.001,(s-this.lastTime)/1e3));this.lastTime=s,this.lastRender=s,this.tick(o),this.watchSpeed(o)};this.frame=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.frame)}watchSpeed(t){document.hidden||this.options.adaptive===!1||(this.sampledFrames++,!(this.sampledFrames<30)&&(t>.045?this.slowFrames++:this.slowFrames=Math.max(0,this.slowFrames-.25),!(this.slowFrames<24)&&(this.slowFrames=0,this.downgraded++,this.downgraded===1&&$o(this.tier,this.tier==="high"?"medium":"low"),this.post?(this.post.dispose(),this.post=null):this.thinned?this.dprSteps<2?(this.dprSteps++,this.pixelRatio=Math.max(.7,this.pixelRatio*.78),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.outlines.uResolution.value.set(this.width*this.pixelRatio,this.height*this.pixelRatio),this.outlines.uWidth.value=(this.width<700?1.25:1.6)*this.pixelRatio):this.renderer.shadowMap.enabled?(this.renderer.shadowMap.enabled=!1,this.sun.castShadow=!1):(this.stop(),$o(this.tier,"static"),this.options.onFallback?.("slow")):(this.thinned=!0,this.ocean?.thinSchool(.5)))))}resize(){const t=this.options.canvas,s=Math.max(1,t.clientWidth),e=Math.max(1,t.clientHeight);this.width=s,this.height=e,this.downgraded||(this.pixelRatio=Math.min(window.devicePixelRatio||1,Cs[this.tier].dpr)),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(s,e,!1),this.post?.setSize(s,e,this.pixelRatio),this.outlines.uResolution.value.set(s*this.pixelRatio,e*this.pixelRatio),this.outlines.uWidth.value=(s<700?1.25:1.6)*this.pixelRatio,this.framingKey="",this.measureSlot(),this.readScroll()}measureSlot(){const t=this.options.islandSlot;if(!t){this.slot=null;return}const s=t.getBoundingClientRect(),e=this.options.canvas.getBoundingClientRect(),o=this.options.root.getBoundingClientRect();if(s.width<10||s.height<10){this.slot=null;return}this.slot={cx:s.left-e.left+s.width/2,cy:s.top-o.top+s.height/2,w:s.width,h:s.height},this.framingKey=""}heroFraming(){const t=this.width,s=this.height,e=t/s,o=e<.8?46:e<1.2?40:34,i=this.slot||{cx:t/2,cy:s*.62,w:t*.9,h:s*.6},a=Math.max(70,Math.min(i.w*.78,i.h*.98)),n=Math.min(90,Math.max(16,10*(s/2)/(a*Math.tan(o*Math.PI/360))));return{fov:o,px:i.cx,py:i.cy,radius:n,elevation:Xo(t,s)==="wide"?.27:.46}}applyFraming(t){const s=this.width,e=this.height,o=this.heroFraming(),i=s/2+(o.px-s/2)*t,a=e/2+(o.py-e/2)*t,n=`${s}x${e}:${i.toFixed(1)}:${a.toFixed(1)}:${o.fov}`;if(n===this.framingKey)return;this.framingKey=n;const r=i>=s/2?2*i:2*(s-i),h=i>=s/2?0:r-s,c=a>=e/2?2*a:2*(e-a),u=a>=e/2?0:c-e,d=Math.tan(o.fov*Math.PI/360);this.camera.fov=Math.atan(d*(c/e))*360/Math.PI,this.camera.aspect=r/c,Math.abs(r-s)>.5||Math.abs(c-e)>.5?this.camera.setViewOffset(r,c,h,u,s,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}readScroll(){const{scroller:t,root:s,hero:e}=this.options,o=s.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;this.scrollY=Math.max(0,t.scrollTop-o),this.heroHeight=Math.max(1,e.offsetHeight),this.scrollRange=Math.max(this.heroHeight+1,s.scrollHeight-t.clientHeight)}heroPose(t,s){let{radius:e,elevation:o}=this.heroFraming();this.editing&&(o=Math.max(o,.46)+.14,e*=Xo(this.width,this.height)==="wide"?1.02:1.1),t.set(0,Math.sin(o)*e+1,Math.cos(o)*e),s.set(0,1,0)}desiredPose(t,s){if(this.editing)return this.heroPose(t,s),{a:0,d:0};const e=this.heroHeight*.9,o=Ee(this.scrollY/e),i=Ee((this.scrollY-e)/Math.max(1,this.scrollRange-e)),[a,n,r,h]=this.scratchVectors;this.heroPose(a,n);const c=ko(o);if(t.lerpVectors(a,Zr,c),s.lerpVectors(n,Kr,c),i>0){De(i,r,h);const u=ko(Ee(i/.12));t.lerp(r,u),s.lerp(h,u)}return{a:o,d:i}}tick(t){this.renderer.info.reset(),this.elapsed+=t;const s=this.elapsed;this.env.uTime.value=s,Math.abs(this.night-this.nightTarget)>.001&&(this.night+=(this.nightTarget-this.night)*(1-Math.exp(-t*4)),this.applyTheme(!1));const e=this.scratchVectors[4],o=this.scratchVectors[5],{a:i,d:a}=this.desiredPose(e,o);this.applyFraming(1-ko(Ee(i*1.15))),this.posed||(this.camPos.copy(e),this.camTarget.copy(o),this.posed=!0);const n=1-Math.exp(-t*6.5);this.camPos.lerp(e,n),this.camTarget.lerp(o,n),this.camera.position.copy(this.camPos);const r=this.camPos.distanceTo(this.camTarget)*.0016;this.camera.position.x+=Math.sin(s*.37)*r,this.camera.position.y+=Math.sin(s*.53+1.3)*r*.7,this.camera.lookAt(this.camTarget);const h=this.camera.position.y,c=Ee((.25-h)/.6);this.depth=Math.max(0,-h),this.env.uUnder.value=c,this.env.uDepth.value=this.depth,this.env.uGlow.value=Ee((this.depth-14)/26)*(.55+this.night*.45),this.applyDepth(c),this.idleFor+=t,(!this.drag||this.drag.kind!=="turn")&&(this.yawVel*=Math.exp(-t*2.4),this.idleFor>5&&i<.4&&!this.editing&&(this.yawVel+=(.045-this.yawVel)*(1-Math.exp(-t*.6))),this.yaw+=this.yawVel*t),this.island.group.rotation.y=this.yaw;const u=(this.yaw-this.spin.lastYaw)/t;this.spin.lastYaw=this.yaw;const d=this.spin.omega+(u-this.spin.omega)*(1-Math.exp(-t*18));this.spin.alpha=Math.max(-60,Math.min(60,(d-this.spin.omega)/t)),this.spin.omega=d;const p=h>-.35;this.island.top.visible=p,this.island.boat.visible=p,this.island.sea.visible=h>-30,this.island.seaSparkles.visible=h>.05,this.island.seaSparkleUniforms.uScale.value=this.pixelRatio*Math.min(1.4,this.height/800),this.island.column.visible=h<4,this.sky.group.visible=c<.999,this.renderer.shadowMap.autoUpdate=h>-2,p&&this.updateIsland(t,s),this.ripples&&this.island.sea.visible&&(p&&this.ambientRipples(t,s),this.ripples.step(t)),this.scare.strength=Ee(1-(s-this.scareAt)/.9),!this.ocean&&(this.depth>0||this.scrollY>this.heroHeight*.35)&&this.ensureOcean(!0),this.ocean?.update(t,s,this.camera,this.depth,this.pixelRatio*this.height/800,this.scare.strength>0?this.scare:null),this.sky.clouds.rotation.y=s*.006,this.creatures?.update(t,s,this.camera);const f=this.options.canvas;if(this.frameCount++,this.frameTimes+=t,this.frameCount%60===0&&(f.dataset.ms=(this.frameTimes/60*1e3).toFixed(1),f.dataset.calls=String(this.lastCalls),this.frameTimes=0),this.frameCount%30===2&&p&&(f.dataset.targets=JSON.stringify(this.screenTargets())),this.frameCount%10===1&&this.depth>30){const m=this.ocean?.swarmStats(this.swarmProbe)??{spread:0},g=f.getBoundingClientRect(),b=this.swarmProbe.clone().project(this.camera);f.dataset.swarm=JSON.stringify({x:Math.round(g.left+(b.x+1)/2*g.width),y:Math.round(g.top+(1-b.y)/2*g.height),spread:Number(m.spread.toFixed(2))})}if(this.frameCount%10===1){f.dataset.depth=this.depth.toFixed(1),f.dataset.scare=this.scare.strength.toFixed(2),f.dataset.dive=a.toFixed(3),f.dataset.hero=i.toFixed(3);const m=this.options.depthLabel;if(m?.parentElement?.classList.toggle("is-visible",this.depth>.4),m&&this.options.depthText){const g=this.options.depthText(Math.round(this.depth*18));m.textContent!==g&&(m.textContent=g)}}if(this.post?(this.post.bloom.strength=.3+this.env.uGlow.value*.45+this.night*.12,this.post.rays=this.post.setLight(this.env.uSunDir.value,this.camera)*(1-this.env.uUnder.value)*(.5+this.night*.4),this.post.render(this.scene,this.camera,1)):this.renderer.render(this.scene,this.camera),this.lastCalls=this.renderer.info.render.calls,!f.dataset.ready){if(f.dataset.ready="1",this.options.onReady?.(),!this.oceanPending){this.oceanPending=!0;const m=window.requestIdleCallback;m?m(()=>this.ensureOcean(),{timeout:2500}):window.setTimeout(()=>this.ensureOcean(),900)}this.creatures=Vr(this.env,this.outlines,{islandHost:this.island.group,prepare:m=>qs(this.renderer,m,this.camera,()=>!this.destroyed,this.scene)}),this.scene.add(this.creatures.world)}if(this.hoverQueued){const{x:m,y:g,target:b}=this.hoverQueued;this.hoverQueued=null,this.updateHover(m,g,b)}}ambientRipples(t,s){const e=this.island;if(this.ambientRipple+=t,this.ambientRipple>1.1){this.ambientRipple=0;const o=e.boat.position,i=e.bottle.position;e.rippleLocal(o.x+Math.sin(s)*.55,o.z+Math.cos(s)*.55,.22),e.rippleLocal(i.x,i.z,.18)}for(const o of e.walkers){if(!o.swimming){this.slimeTrails.delete(o);continue}const i=o.position,a=this.slimeTrails.get(o);a&&Math.hypot(i.x-a.x,i.z-a.z)>.04?(e.ripples?.trail(a.x,a.z,i.x,i.z,-.025,.22),a.x=i.x,a.z=i.z):a||this.slimeTrails.set(o,{x:i.x,z:i.z})}}updateIsland(t,s){const e=this.island,o=this.worldPos;for(const f of e.jellies)f.update(t,s);e.wobble.update(t,this.spin),this.workshop?.update(t),this.drag?.kind==="sculpt"&&this.drag.at&&this.workshop&&this.tool.kind!=="place"&&this.tool.kind!=="move"&&(this.workshop.brush(this.drag.at.x,this.drag.at.z,this.tool.kind,this.tool.size,t),Math.random()<t*6&&e.wobble.nudgeAround(this.drag.at.x,this.drag.at.z,this.tool.size*2.2,this.tool.kind==="lower"?-.25:.25));const i=e.top.worldToLocal(o.copy(this.camera.position));for(const f of e.walkers)f.update(t,i);if(this.sword&&(this.sword.viewHeight=this.height,this.sword.setHand(...this.handPose()),this.sword.update(t,s)),(!this.drag||this.drag.kind!=="blades")&&(this.bladeVel+=(.7-this.bladeVel)*(1-Math.exp(-t*.5)),e.blades.rotation.z-=this.bladeVel*t),this.ballSpin.lengthSq()>1e-6){const f=this.ballSpin.length()*t,m=this.spinQuat.setFromAxisAngle(this.spinAxis.copy(this.ballSpin).normalize(),f);e.ball.quaternion.premultiply(m),this.ballSpin.multiplyScalar(Math.exp(-t*.9))}const a=e.chest,n=a.open?-1.95:0;a.velocity+=((n-a.angle)*70-a.velocity*9)*t,a.angle+=a.velocity*t,a.lid.rotation.x=a.angle,e.animate(t,s);const r=e.boat;r.getWorldPosition(o);const h=gn(o.x,o.z,s,.72*this.water.swell,this.swell);if(r.position.y=.31+h.height+Math.sin(s*1.3)*.015,r.rotation.z=-h.slopeX*.55+Math.sin(s*1.1)*.025,r.rotation.x=h.slopeZ*.55+Math.sin(s*.9+1)*.02,this.env.uNight.value>.02){const f=e.fireflies.geometry.getAttribute("position"),m=e.fireflies.userData.base;for(let g=0;g<f.count;g++)f.setXYZ(g,m[g*3]+Math.sin(s*.6+g)*.5,m[g*3+1]+Math.sin(s*.9+g*1.7)*.3,m[g*3+2]+Math.cos(s*.5+g*.7)*.5);f.needsUpdate=!0}const u=this.sparkles.geometry.getAttribute("position"),d=this.sparkles.geometry.getAttribute("aAlpha");let p=!1;this.sparkleState.forEach((f,m)=>{if(f.life<=0){d.setX(m,0);return}p=!0,f.life-=t,f.vel.y-=1.4*t,f.pos.addScaledVector(f.vel,t),u.setXYZ(m,f.pos.x,f.pos.y,f.pos.z),d.setX(m,Math.min(1,f.life*1.6))}),p&&(u.needsUpdate=!0,d.needsUpdate=!0),this.sparkles.material.uniforms.uScale.value=this.pixelRatio*this.height/800,e.top.children.forEach(f=>{const m=f.material;m?.uniforms?.uScale&&f!==this.sparkles&&(m.uniforms.uScale.value=this.pixelRatio*this.height/800)})}applyTheme(t){t&&(this.night=this.nightTarget);const s=this.night,e=(h,c)=>new E(h).lerp(new E(c),s),o=Ds.light,i=Ds.dark;this.sky.uniforms.uTop.value.copy(e(o.skyTop,i.skyTop)),this.sky.uniforms.uHorizon.value.copy(e(o.skyHorizon,i.skyHorizon)),this.sky.uniforms.uHaze.value.copy(e(o.haze,i.haze)),this.env.uSunDir.value.copy(o.sunDir).lerp(i.sunDir,s).normalize(),this.env.uNight.value=s;const a=this.island.seaUniforms,n=Yo[this.water.tint]||Yo.soda;a.uShallow.value.copy(e(n.light[0],n.dark[0])),a.uMid.value.copy(e(n.light[1],n.dark[1])),a.uDeep.value.copy(e(n.light[2],n.dark[2])),a.uFoam.value.copy(e(o.foam,i.foam)),a.uSand.value.copy(e(o.sand,i.sand));const r=this.sky.cloudUniforms;r.uLit.value.copy(e(o.cloudLit,i.cloudLit)),r.uMid.value.copy(e(o.cloudMid,i.cloudMid)),r.uShade.value.copy(e(o.cloudShade,i.cloudShade)),this.sky.starUniforms.uOpacity.value=s,this.island.halos.material.uniforms.uOpacity.value=s*.9,this.island.fireflies.material.uniforms.uOpacity.value=s,this.ocean?.setTheme(this.theme==="dark"),this.sky.clouds.visible=!0,_o.strength.value=.42*(1-s*.72)}applyDepth(t){const s=this.night,e=Ds.light,o=Ds.dark,i=_a(this.theme,this.depth,this.below),[a,n]=this.scratchColors;this.fog.color.copy(a.set(e.fog).lerp(n.set(o.fog),s)).lerp(i.fog,t),this.env.uWaterGlow.value.copy(i.glow),this.env.uWaterFog.value.copy(i.fog),this.env.uWaterAbyss.value.copy(i.abyss),this.fog.density=(e.fogDensity+(o.fogDensity-e.fogDensity)*s)*(1-t)+i.density*t,this.scene.background.copy(this.fog.color);const r=this.hemi.color.copy(a.set(e.hemiSky).lerp(n.set(o.hemiSky),s)).lerp(i.light,t),h=this.hemi.groundColor.copy(a.set(e.hemiGround).lerp(n.set(o.hemiGround),s)).lerp(i.fog,t),c=(e.hemiIntensity+(o.hemiIntensity-e.hemiIntensity)*s)*(1-t)+i.hemi*t;this.hemi.intensity=c;const u=(e.sunIntensity+(o.sunIntensity-e.sunIntensity)*s)*(1-t*Ee(.35+this.depth/24));this.sun.intensity=u,this.sun.color.copy(a.set(e.sunColor).lerp(n.set(o.sunColor),s)).lerp(i.light,t),this.sun.position.copy(this.env.uSunDir.value).multiplyScalar(30),this.sun.target.position.set(0,0,0),this.fill.intensity=(e.fillIntensity+(o.fillIntensity-e.fillIntensity)*s)*(1-t),this.fill.color.copy(a.set(e.fillColor).lerp(n.set(o.fillColor),s)),this.fill.position.copy(e.fillDir).multiplyScalar(30),this.env.uSunColor.value.copy(this.sun.color).multiplyScalar(u/2.2),this.env.uSkyColor.value.copy(r).multiplyScalar(c),this.env.uGroundColor.value.copy(h).multiplyScalar(c),this.depthLight.value.copy(i.light).multiplyScalar(.55+.45*(1-t*.6)),t<.5&&this.depthLight.value.copy(this.sun.color).multiplyScalar(u/2.2)}isSurface(t){return t instanceof HTMLElement&&t.closest("[data-island-surface]")===t?t:null}setPointer(t,s){const e=this.options.canvas.getBoundingClientRect();this.pointer.set((t-e.left)/e.width*2-1,-((s-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}hitAt(t,s){return this.camera.position.y<-.4||!this.island.top.visible?null:(this.setPointer(t,s),this.island.hitInteractive(this.raycaster))}markPlayed(){this.played||(this.played=!0,this.options.onPlayed?.())}bindPointer(){const{root:t}=this.options,s=n=>{if(n.touches.length!==1||!this.isSurface(n.target))return;if(this.editing){n.preventDefault();return}const h=n.touches[0],c=this.hitAt(h.clientX,h.clientY);(c&&c.kind!=="chest"&&c.kind!=="bottle"||!c&&this.sword?.armed&&this.slashable()&&this.island.hitLand(this.raycaster))&&n.preventDefault()};t.addEventListener("touchstart",s,{passive:!1}),this.cleanups.push(()=>t.removeEventListener("touchstart",s));const e=n=>{if(n.button!==0||this.drag)return;this.touched=n.pointerType!=="mouse";const r=this.isSurface(n.target);if(!r)return;const h=new vt(n.clientX,n.clientY),c={pointerId:n.pointerId,moved:0,start:h,surface:r};if(this.idleFor=0,this.editing){if(!this.editDown(n,c))return;try{r.setPointerCapture(n.pointerId)}catch{}return}const u=this.hitAt(n.clientX,n.clientY);if(this.sword?.armed&&u?.kind!=="chest"&&u?.kind!=="bottle"&&this.slashable()){this.drag={kind:"slash",last:h.clone(),...c},this.handAt={x:n.clientX,y:n.clientY},this.handDown=!0;const d=this.pointer.clone();this.sword.strokeBegin(d),this.sword.strokeSample(this.raycaster,d)}else if(u?.kind==="jelly"){const d=this.camera.getWorldDirection(new v).negate(),p=new Ys().setFromNormalAndCoplanarPoint(d,u.point);u.jelly.grab(u.jelly.front.worldToLocal(u.point.clone())),this.walkerOf(u.jelly)?.pause(),this.drag={kind:"jelly",jelly:u.jelly,plane:p,...c}}else if(u?.kind==="blades"){const d=this.island.bladeHub.clone();this.island.top.localToWorld(d),d.project(this.camera);const p=this.options.canvas.getBoundingClientRect(),f=new vt(p.left+(d.x+1)/2*p.width,p.top+(1-d.y)/2*p.height);this.drag={kind:"blades",hub:f,angle:Math.atan2(n.clientY-f.y,n.clientX-f.x),...c},this.bladeVel=0}else if(u?.kind==="ball")this.drag={kind:"ball",last:h.clone(),...c};else if(u?.kind==="chest"||u?.kind==="bottle")this.drag={kind:u.kind,...c};else if(this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6&&(this.island.hitLand(this.raycaster)||this.sword?.armed))this.drag={kind:"turn",last:h.clone(),...c},this.yawVel=0,this.lastRipple.t=-10,this.touchWater(n.clientX,n.clientY,1);else if(this.camera.position.y<=-.4)this.scareFish(n.clientX,n.clientY),this.drag={kind:"water",...c};else{this.touchWater(n.clientX,n.clientY,1.15,!0);return}try{r.setPointerCapture(n.pointerId)}catch{}this.drag.kind!=="chest"&&this.drag.kind!=="bottle"&&this.drag.kind!=="water"&&this.drag.kind!=="slash"&&!this.sword?.armed&&(r.style.cursor="grabbing")},o=n=>{const r=this.drag;if(this.editing){this.editMove(n);return}if(this.sword?.armed&&(!r||r.kind==="slash")){const h=this.isSurface(n.target)||r;r?.kind==="slash"&&n.pointerId===r.pointerId?this.handAt={x:n.clientX,y:n.clientY}:!r&&n.pointerType==="mouse"&&(this.handAt=h?{x:n.clientX,y:n.clientY}:null)}if((!r||r.kind==="water"||r.kind==="turn")&&this.isSurface(n.target)&&this.touchWater(n.clientX,n.clientY,r?.kind==="turn"?.8:.45),!r||r.kind==="water"){const h=this.isSurface(n.target);if(h&&this.camera.position.y<-.4&&this.scareFish(n.clientX,n.clientY),r)return;h&&n.pointerType==="mouse"&&(this.hoverQueued={x:n.clientX,y:n.clientY,target:h});return}if(n.pointerId===r.pointerId){if(r.moved=Math.max(r.moved,Math.hypot(n.clientX-r.start.x,n.clientY-r.start.y)),r.kind==="jelly"){this.setPointer(n.clientX,n.clientY);const h=new v;if(this.raycaster.ray.intersectPlane(r.plane,h)){const c=this.walkerOf(r.jelly);if(c&&r.moved>6){const u=this.raycaster.ray;if(this.island.top.worldToLocal(h.clone()).y<1.6&&!this.island.hitLand(this.raycaster)&&u.direction.y<-.02){const p=u.at((1.1-u.origin.y)/u.direction.y,new v),f=this.island.top.worldToLocal(p.clone());Math.hypot(f.x,f.z)>5&&h.copy(p)}const d=this.island.top.worldToLocal(h.clone());c.held||c.hold(d.clone().sub(c.position)),c.holdTo(d)}else c||r.jelly.dragTo(r.jelly.front.worldToLocal(h));r.moved>6&&this.markPlayed()}}else if(r.kind==="blades"){const h=Math.atan2(n.clientY-r.hub.y,n.clientX-r.hub.x);let c=h-r.angle;c=Math.atan2(Math.sin(c),Math.cos(c)),r.angle=h,this.island.blades.rotation.z-=c,this.bladeVel=this.bladeVel*.6+c/(1/60)*.4,r.moved>6&&this.markPlayed()}else if(r.kind==="ball"){const h=n.clientX-r.last.x,c=n.clientY-r.last.y;r.last.set(n.clientX,n.clientY);const u=new v().setFromMatrixColumn(this.camera.matrixWorld,0),p=new v().setFromMatrixColumn(this.camera.matrixWorld,1).multiplyScalar(h).add(u.multiplyScalar(c)),f=new Me().setFromAxisAngle(new v(0,1,0),-this.yaw);p.applyQuaternion(f),this.ballSpin.lerp(p.multiplyScalar(.45),.5),r.moved>6&&this.markPlayed()}else if(r.kind==="slash"){const h=n.clientX-r.last.x,c=n.clientY-r.last.y,u=Math.max(1,Math.ceil(Math.hypot(h,c)/12));for(let d=1;d<=u;d++)this.setPointer(r.last.x+h*d/u,r.last.y+c*d/u),this.sword?.strokeSample(this.raycaster,this.pointer.clone());r.last.set(n.clientX,n.clientY),r.moved>10&&this.markPlayed()}else if(r.kind==="turn"){const h=n.clientX-r.last.x;r.last.set(n.clientX,n.clientY);const c=h/Math.max(320,this.width)*4.2;this.yaw+=c,this.yawVel=this.yawVel*.5+c/(1/60)*.5,r.moved>10&&this.markPlayed()}}},i=n=>{const r=this.drag;if(!r||n.pointerId!==r.pointerId)return;this.drag=null,r.surface.style.cursor=this.sword?.armed&&n.pointerType==="mouse"?So:"";try{r.surface.releasePointerCapture(n.pointerId)}catch{}const h=r.moved<8&&n.type==="pointerup";if(this.editing&&(r.kind==="sculpt"||r.kind==="item"||r.kind==="place")){this.editUp(r,h,n),this.idleFor=0;return}if(r.kind==="turn"&&h&&!this.editing){this.setPointer(n.clientX,n.clientY);const c=this.island.hitProp(this.raycaster);c&&this.island.wobble.poke(c.object)&&this.markPlayed()}if(r.kind==="jelly")r.jelly.release(),this.walkerOf(r.jelly)?.drop(),h&&(r.jelly.poke(!0),this.markPlayed());else if(r.kind==="bottle"&&h)this.options.onBottle?.(),this.markPlayed();else if(r.kind==="slash")this.setPointer(n.clientX,n.clientY),h||this.sword?.strokeSample(this.raycaster,this.pointer.clone()),this.sword?.strokeEnd(this.raycaster,h),this.handDown=!1,n.pointerType!=="mouse"&&(this.handAt=null),this.markPlayed();else if(r.kind==="chest"&&h){const c=this.island.chest;c.open=!c.open,c.open?(this.spawnSparkles(),this.sword?.rise()):this.sword?.putBack(),this.markPlayed()}else if(r.kind==="water"&&h){if(this.setPointer(n.clientX,n.clientY),!this.ocean?.tap(this.raycaster)){const c=this.raycaster.ray.at(7,new v);c.y=Math.min(c.y,-.6),this.ocean?.burst(c,16)}this.markPlayed()}this.idleFor=0},a=n=>{n.key!=="Escape"||!this.sword?.armed||(this.island.chest.open=!1,this.sword.putBack())};window.addEventListener("keydown",a),this.cleanups.push(()=>window.removeEventListener("keydown",a)),t.addEventListener("pointerdown",e),t.addEventListener("pointermove",o),t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),this.cleanups.push(()=>{t.removeEventListener("pointerdown",e),t.removeEventListener("pointermove",o),t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i)})}slashable(){return this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6}handPose(){if(!this.sword?.armed||!this.slashable())return[null,!1,!1];const t=this.options.canvas.getBoundingClientRect(),s=(i,a)=>new vt((i-t.left)/t.width*2-1,-((a-t.top)/t.height)*2+1);if(this.handAt)return[s(this.handAt.x,this.handAt.y),this.handDown,!1];if(!this.touched&&!window.matchMedia("(hover: none)").matches)return[null,!1,!1];const e=this.options.islandSlot?.getBoundingClientRect(),o=e&&e.width>40?e:t;return[s(o.left+o.width*.68,o.top+o.height*.82),!1,!0]}walkerOf(t){return this.island.walkers.find(s=>s.jelly===t)}updateHover(t,s,e){if(this.drag)return;if(this.camera.position.y<-.4){this.setPointer(t,s);const n=this.ocean?.hover(this.raycaster)?"pointer":"";e.style.cursor!==n&&(e.style.cursor=n);return}const o=this.hitAt(t,s),i=this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6,a=this.sword?.armed&&i?So:o?o.kind==="chest"||o.kind==="bottle"?"pointer":"grab":i&&this.island.hitLand(this.raycaster)?"grab":"";e.style.cursor!==a&&(e.style.cursor=a)}touchWater(t,s,e,o=!1){if(this.camera.position.y<.3||this.scrollY>this.heroHeight*.9)return;this.setPointer(t,s);const i=this.raycaster.ray;if(i.direction.y>-.02)return;if(this.ripples&&this.island.hitLand(this.raycaster)){if(this.hoverWater=null,!this.island.pond.mesh.visible)return;const h=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,(Le-i.origin.y)/i.direction.y),c=this.island.top.worldToLocal(h);this.island.pond.depthAt(c.x,c.z)>.01&&this.island.rippleLocal(c.x,c.z,o?e:e*.35);return}const a=-i.origin.y/i.direction.y,n=this.ripplePoint.copy(i.origin).addScaledVector(i.direction,a);if(this.ripples){const h=this.elapsed;o?this.island.ripple(n.x,n.z,e):this.hoverWater&&h-this.hoverWater.t<.2&&this.island.rippleTrail(this.hoverWater.x,this.hoverWater.z,n.x,n.z,e),this.hoverWater={x:n.x,z:n.z,t:h};return}if(Math.hypot(n.x,n.z)<7.2)return;const r=this.elapsed;r-this.lastRipple.t<.12&&n.distanceTo(this.lastRipple.at)<1.2||(this.lastRipple.t=r,this.lastRipple.at.copy(n),this.island.ripple(n.x,n.z,e))}landUnder(t,s){this.setPointer(t,s);const e=this.island.hitLand(this.raycaster);return e?this.island.top.worldToLocal(e):null}editDown(t,s){const e=this.workshop;if(!e)return!1;this.setPointer(t.clientX,t.clientY);const o=this.tool.kind==="place"||this.tool.kind==="move"?e.hitItem(this.raycaster):null,i=this.landUnder(t.clientX,t.clientY);return o?(e.beginMove(),this.drag={kind:"item",item:o,grab:new vt(i?i.x-o.x:0,i?i.z-o.z:0),shifted:!1,...s},this.select(o)):i&&(this.tool.kind==="raise"||this.tool.kind==="lower"||this.tool.kind==="smooth")?(e.beginStroke(),this.drag={kind:"sculpt",at:i,...s}):i&&this.tool.kind==="place"?this.drag={kind:"place",...s}:(this.tool.kind==="move"&&this.select(null),this.drag={kind:"turn",last:s.start.clone(),...s},this.yawVel=0,this.touchWater(t.clientX,t.clientY,1)),!0}editMove(t){const s=this.drag,e=this.workshop;if(!e)return;const o=this.isSurface(t.target)||s?.surface;if(s&&t.pointerId===s.pointerId&&(s.moved=Math.max(s.moved,Math.hypot(t.clientX-s.start.x,t.clientY-s.start.y))),s?.kind==="turn"&&t.pointerId===s.pointerId){const n=t.clientX-s.last.x;s.last.set(t.clientX,t.clientY);const r=n/Math.max(320,this.width)*4.2;this.yaw+=r,this.yawVel=this.yawVel*.5+r/(1/60)*.5,this.touchWater(t.clientX,t.clientY,.8),e.showCursor(null);return}if(s?.kind==="place"&&t.pointerId===s.pointerId&&s.moved>10){this.drag={kind:"turn",last:new vt(t.clientX,t.clientY),pointerId:s.pointerId,moved:s.moved,start:s.start,surface:s.surface};return}const i=this.landUnder(t.clientX,t.clientY);s?.kind==="sculpt"&&t.pointerId===s.pointerId?s.at=i:s?.kind==="item"&&t.pointerId===s.pointerId&&i&&s.moved>6&&e.moveTo(s.item,i.x-s.grab.x,i.z-s.grab.y)&&(s.shifted=!0);const a=this.tool;if(!i||s&&s.kind!=="sculpt"&&s.kind!=="place")e.showCursor(null);else if(a.kind==="raise"||a.kind==="lower"||a.kind==="smooth")e.showCursor(i,a.size,a.kind);else if(a.kind==="place"){const n=e.specOf(a.item).radius;e.showCursor(i,n,e.canPlace(a.item,i.x,i.z)?"ok":"blocked")}else e.showCursor(null);if(o&&!s&&t.pointerType==="mouse"){this.setPointer(t.clientX,t.clientY);const r=(a.kind==="move"||a.kind==="place"?e.hitItem(this.raycaster):null)?"grab":i?a.kind==="move"?"":"crosshair":"grab";o.style.cursor!==r&&(o.style.cursor=r),this.touchWater(t.clientX,t.clientY,.45)}}editUp(t,s,e){const o=this.workshop;if(t.kind==="sculpt")o.endStroke(),e.pointerType!=="mouse"&&o.showCursor(null);else if(t.kind==="item"){if(o.endMove(t.shifted),s){const i=o.items.find(a=>a.id===t.item.id);i?.jelly?i.jelly.poke(i.kind==="slime"):i&&this.island.wobble.poke(i.root,.7)}}else if(t.kind==="place"&&s&&this.tool.kind==="place"){const i=this.landUnder(e.clientX,e.clientY),a=this.tool;if(i&&o.canPlace(a.item,i.x,i.z)){const n=o.place(a.item,a.look,i.x,i.z);this.island.wobble.nudgeAround(n.x,n.z,2.4,.5),this.select(n),this.markPlayed()}else this.workshopChanged(!1,!0);e.pointerType!=="mouse"&&o.showCursor(null)}}scareFish(t,s){this.setPointer(t,s),this.scare.origin.copy(this.raycaster.ray.origin),this.scare.dir.copy(this.raycaster.ray.direction),this.scareAt=this.elapsed}screenTargets(){const t=this.options.canvas.getBoundingClientRect(),s=i=>(i.project(this.camera),[Math.round(t.left+(i.x+1)/2*t.width),Math.round(t.top+(1-i.y)/2*t.height)]),e=this.island,o=i=>i.front.localToWorld(new v(0,i.height*.55,.3));return{hero:s(o(e.hero)),jellies:e.jellies.map(i=>s(o(i))),blades:s(e.top.localToWorld(e.bladeHub.clone().add(new v(0,.75,.05)))),ball:s(e.ball.getWorldPosition(new v)),chest:s(e.chest.base.localToWorld(new v(0,.3,.2))),chestOpen:e.chest.open,bottle:s(e.bottle.getWorldPosition(new v)),trees:e.trees.map(i=>s(e.top.localToWorld(new v(i.x,i.root.position.y+i.height*.3,i.z)))),armed:!!this.sword?.armed,ripples:!!this.ripples,editing:this.editing,items:this.workshop?.items.map(i=>({id:i.id,kind:i.kind,at:s(e.top.localToWorld(new v(i.x,e.ground(i.x,i.z)+.4,i.z)))}))??[],pond:e.pond.mesh.visible,yaw:Number(this.yaw.toFixed(3)),blade:Number(e.blades.rotation.z.toFixed(3))}}spawnSparkles(){const s=this.island.chest.base.position.clone().add(new v(0,.6,0));this.sparkleState.forEach(e=>{e.pos.copy(s),e.vel.set((Math.random()-.5)*2.2,2.2+Math.random()*1.8,(Math.random()-.5)*2.2),e.life=.9+Math.random()*.7})}}export{cl as IslandDive,ll as canRunIslandDive,Hr as pickDiveTier,wi as supportsFloatTargets};
