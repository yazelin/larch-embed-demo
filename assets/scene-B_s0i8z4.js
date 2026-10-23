import{aw as Xo,ai as Yo,aF as _s,d as Lt,$ as ie,m as X,aG as jo,aH as $o,V as y,C as b,t as Qe,as as ks,h as vt,i as V,Q as ho,E as Es,G as Ce,c as H,n as Ze,u as jt,v as $t,F as Fs,o as U,L as Ns,w as st,g as ls,a7 as xo,ah as cs,ad as bo,aI as Yt,af as Xt,X as Ne,e as Ae,a8 as us,a9 as hs,_ as Rs,am as Zo,ay as Ke,aJ as Ds,q as pe,r as it,T as fs,a0 as $e,Y as ds,Z as Ws,a2 as Io,aK as Is,aq as Gs,a1 as Ls,aA as xe,a as Vs,P as Os,H as Us,D as Bs,aD as Hs,R as qs,W as Xs,N as Ys,aC as js,aL as $s}from"./three-engine-CPoZO8QK.js";import{h as Zs}from"./FourthChallengePage-CL_dOU9u.js";import"./preload-helper-BXl3LOEh.js";import"./react-core-CuKebU_E.js";import"./index-CWnuUqzw.js";import"./motion-engine-CNzg_hOY.js";import"./theme-BFhb13R7.js";import"./engagement-yy_RUUZC.js";import"./builtInPropThumbnails.generated-RzC-598z.js";import"./SiteShell-Ck0LKtPW.js";import"./StudioSidebar-BElVXKpR.js";import"./billingStatus-CWWbavpD.js";import"./notifications-DXT4eODq.js";import"./sidebar-icon-motion-mQMAC__i.js";import"./siteContent-ULOUtrxQ.js";import"./store-qwZaBvKC.js";import"./rpg-core-CUoBAkUL.js";import"./persistence-BzjkIsZY.js";import"./compression-BqI0Uc__.js";import"./flow-engine-CDPGInjf.js";import"./uiSkills-Y6MLy84v.js";import"./coins-Ca6KRXQs.js";import"./FeedbackDialog-Bk3Bp2wZ.js";import"./feedbackUploads-BWuNDgiR.js";import"./ime-DifmtmAZ.js";import"./VideoPlayback-CNT_DFrL.js";import"./message-square-Kfclo4Lc.js";import"./x-DRMfXEo7.js";import"./send-5moBpUj9.js";import"./earth-DTLfwBcK.js";import"./bug-BvVCxUIb.js";import"./lightbulb-B3wD2z7D.js";import"./triangle-alert-CDejW5lC.js";import"./loader-circle-Vidvf0-N.js";import"./gift-Pveu8iQ4.js";import"./pencil-line-dLA2Fz5D.js";import"./maximize-2-B0OUBo9H.js";import"./shield-check-Cl6PrRuW.js";import"./AvatarDecoration-B95O1V1O.js";import"./avatarDecorations-BNJAnnYE.js";import"./store-ClSqAdyT.js";import"./image-23RStwHj.js";import"./settings-2-CH2BehiL.js";import"./package-open-BbpBU_kY.js";import"./crown-BELjXYSW.js";import"./moon-ZPhaCLdC.js";import"./sun-NzKEUK5n.js";import"./message-square-plus-DvWhb784.js";/* empty css             */import"./ChallengeEditionMenu-B5bvuF4r.js";import"./chevron-down-Dp10-1_1.js";import"./CommentThread-Cbh8umWz.js";import"./ImageLightbox-E4xKqIXc.js";import"./Poll-CpMz37vi.js";import"./creator-profile-CogMH4en.js";import"./mail-DHGn5Hj8.js";import"./user-plus-Dfjclr9A.js";import"./NoticeDialog-haYTJK_n.js";/* empty css               */import"./list-checks-i31NAeYW.js";import"./smile-plus-D7AMFe6D.js";import"./docMarkdown-BC2G7a-B.js";import"./EmojiPicker-Cr62cZzz.js";import"./AiImageDialog-BpjWgY5D.js";import"./auroraLabClient-mzYDhlCA.js";import"./index.es-rCloIhuB.js";import"./search-D4tGHy3x.js";import"./PinecoinPlusIcon-8hZWlJag.js";import"./pinecoins-C4Ko6bF2.js";import"./circle-alert-Ck6a0bQv.js";import"./log-in-jSx1NSbn.js";import"./star-D-AdymRc.js";import"./pencil-BiqeGScw.js";import"./video-B02FcgQD.js";import"./eye-off-CC-TaqBp.js";import"./EventPage-D57slGm7.js";import"./confettiBurst-D66Q9Naj.js";import"./quote-OrJeCRPs.js";import"./party-popper-K9UCnm-u.js";import"./git-fork-C-K6Vlo8.js";import"./key-round-DPXWP8RM.js";import"./users-CsYg2IXt.js";import"./radio-DvwK3ONX.js";import"./youtube-7egOo9_t.js";import"./share-2-C4MjuxX3.js";import"./link-2-D8BLElFv.js";import"./circle-dollar-sign-DABjqpdg.js";import"./gem-DDuw53BP.js";import"./lock-DZdhimPd.js";import"./copy-Bz0EbCyL.js";import"./bell-ring-DK569bPr.js";import"./hash-B2BXUFUk.js";import"./badge-check-BWTwYCuj.js";import"./waves-Ds4wyR89.js";import"./arrow-down-WOSrswUg.js";import"./hourglass-Bjt0SAfF.js";import"./mountain-BBXwrxKi.js";import"./paw-print-BvzjJvRw.js";const Ko=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ks=`
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
`,Qs=`
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
`;class Js{constructor(t,o){this.renderer=t,this.sceneTarget=new Xo(1,1,{type:Yo,samples:4}),this.bloom=new _s(new Lt(1,1),.3,.55,1),this.bloom.blendMaterial.visible=!1,this.raysTarget=o.rays?new Xo(1,1,{type:Yo,minFilter:ie,magFilter:ie,depthBuffer:!1}):null,this.raysMaterial=o.rays?new X({uniforms:{tScene:{value:null},uLight:{value:new Lt(.5,.5)},uThreshold:{value:.9}},vertexShader:Ko,fragmentShader:Ks,depthTest:!1,depthWrite:!1,blending:jo}):null,this.raysQuad=this.raysMaterial?new $o(this.raysMaterial):null,this.grade=new X({uniforms:{tScene:{value:null},tBloom:{value:null},tRays:{value:null},uBloom:{value:1},uRays:{value:0},uRayTint:{value:new y(1,.95,.85)},uAberration:{value:2.2},uShadowTint:{value:new y(.93,1,1.06)},uHighlightTint:{value:new y(1.04,1.01,.95)},uSplit:{value:1},uSaturation:{value:1.06},uExposure:{value:1},uResolution:{value:new Lt(1,1)},uFrame:{value:0}},vertexShader:Ko,fragmentShader:Qs,depthTest:!1,depthWrite:!1,blending:jo,toneMapped:!1}),this.gradeQuad=new $o(this.grade)}renderer;bloom;sceneTarget;raysTarget;gradeQuad;raysQuad;grade;raysMaterial;frame=0;lightScreen=new y;forward=new y;rays=0;setSize(t,o,e){const s=Math.max(1,Math.round(t*e)),n=Math.max(1,Math.round(o*e));this.sceneTarget.setSize(s,n),this.bloom.setSize(s,n),this.raysTarget?.setSize(Math.max(1,Math.round(s/4)),Math.max(1,Math.round(n/4))),this.grade.uniforms.uResolution.value.set(s,n)}setLight(t,o){if(!this.raysMaterial||o.getWorldDirection(this.forward).dot(t)<.15)return 0;const s=this.lightScreen.copy(t).multiplyScalar(400).add(o.position).project(o);this.raysMaterial.uniforms.uLight.value.set(s.x*.5+.5,s.y*.5+.5);const n=Math.max(Math.abs(s.x),Math.abs(s.y));return 1-Math.min(1,Math.max(0,(n-.9)/.7))}render(t,o,e){const s=this.renderer;s.setRenderTarget(this.sceneTarget),s.render(t,o),this.bloom.render(s,null,this.sceneTarget,0,!1);const n=this.grade.uniforms;this.raysQuad&&this.raysTarget&&this.rays>.01?(this.raysMaterial.uniforms.tScene.value=this.sceneTarget.texture,s.setRenderTarget(this.raysTarget),this.raysQuad.render(s),n.tRays.value=this.raysTarget.texture,n.uRays.value=this.rays):(n.tRays.value=this.sceneTarget.texture,n.uRays.value=0),n.tScene.value=this.sceneTarget.texture,n.tBloom.value=this.bloom.renderTargetsHorizontal[0].texture,n.uExposure.value=e,n.uFrame.value=this.frame++%64,s.setRenderTarget(null),this.gradeQuad.render(s)}dispose(){this.sceneTarget.dispose(),this.raysTarget?.dispose(),this.bloom.dispose(),this.grade.dispose(),this.raysMaterial?.dispose(),this.gradeQuad.dispose(),this.raysQuad?.dispose()}}function ti(){return{uTime:{value:0},uSunDir:{value:new y(.45,.78,.42).normalize()},uSunColor:{value:new b("#fff1d6")},uSkyColor:{value:new b("#bfe6ff")},uGroundColor:{value:new b("#9cc46e")},uNight:{value:0},uUnder:{value:0},uDepth:{value:0},uGlow:{value:0},uSkyTop:{value:new b("#3f9ef0")},uSkyHorizon:{value:new b("#cdeeff")},uSkyHaze:{value:new b("#fff4dc")},uWaterGlow:{value:new b("#8ff0ff")},uWaterFog:{value:new b("#1d9cc4")},uWaterAbyss:{value:new b("#0f6a9a")},uWaterRays:{value:0}}}const ao={light:{skyTop:"#2d84e6",skyHorizon:"#d4efff",haze:"#fff3da",sunDir:new y(.42,.72,.55).normalize(),sunColor:"#fff2da",sunIntensity:1.75,hemiSky:"#d6eeff",hemiGround:"#9fb0d6",hemiIntensity:1.45,fog:"#c6e7f7",fogDensity:.0048,seaShallow:"#38d3cb",seaMid:"#0b92c6",seaDeep:"#0a4596",foam:"#ffffff",sand:"#f2ddb0",cloudLit:"#ffffff",cloudMid:"#e5edf9",cloudShade:"#a7bbe5"},dark:{skyTop:"#060d26",skyHorizon:"#23335e",haze:"#93a5dc",sunDir:new y(-.16,.27,-.95).normalize(),sunColor:"#c9d6ff",sunIntensity:1.05,hemiSky:"#6a7fc4",hemiGround:"#3a3f6e",hemiIntensity:1.25,fog:"#17233f",fogDensity:.0075,seaShallow:"#1c6c86",seaMid:"#0d3f62",seaDeep:"#071a36",foam:"#d8e6ff",sand:"#7d7f8c",cloudLit:"#7f8fc2",cloudMid:"#56669c",cloudShade:"#2e3a68"}},ei={light:[{depth:0,fog:"#1d9cc4",glow:"#8ff0ff",abyss:"#0f6a9a",density:.052,hemi:1,light:"#c4f6ff"},{depth:3,fog:"#1b93c0",glow:"#82eaff",abyss:"#0e6094",density:.036,hemi:.96,light:"#b8f0fd"},{depth:8,fog:"#1781b8",glow:"#6fdcf6",abyss:"#0b4f86",density:.027,hemi:.9,light:"#a4e6fa"},{depth:18,fog:"#0f5a99",glow:"#3fa8e0",abyss:"#072f66",density:.03,hemi:.72,light:"#7cc0ea"},{depth:30,fog:"#0a3772",glow:"#2271b8",abyss:"#04173d",density:.034,hemi:.56,light:"#5d92d8"},{depth:42,fog:"#072656",glow:"#1a5298",abyss:"#030c26",density:.036,hemi:.5,light:"#5683cc"},{depth:52,fog:"#0a4058",glow:"#1f7ea0",abyss:"#04202e",density:.032,hemi:.62,light:"#6fd0d6"}],dark:[{depth:0,fog:"#0e3f5e",glow:"#3f8fb8",abyss:"#082a44",density:.056,hemi:.78,light:"#7cc4e6"},{depth:3,fog:"#0d3a59",glow:"#3787b2",abyss:"#07263f",density:.04,hemi:.74,light:"#74bce2"},{depth:8,fog:"#0b3352",glow:"#2e78a6",abyss:"#06213c",density:.033,hemi:.68,light:"#6aaedc"},{depth:18,fog:"#08243f",glow:"#1f5a8c",abyss:"#04142a",density:.036,hemi:.55,light:"#5590c8"},{depth:30,fog:"#05162d",glow:"#153f72",abyss:"#020a1a",density:.04,hemi:.45,light:"#4673b4"},{depth:42,fog:"#040f22",glow:"#10305e",abyss:"#020714",density:.044,hemi:.4,light:"#4062a8"},{depth:52,fog:"#062a36",glow:"#13586e",abyss:"#02141c",density:.04,hemi:.5,light:"#4fb6c0"}]},no=new b,ro=new b;function oi(i,t,o={fog:new b,glow:new b,abyss:new b,density:0,hemi:0,light:new b}){const e=ei[i];let s=0;for(;s<e.length-2&&t>e[s+1].depth;)s++;const n=e[s],a=e[s+1],r=Math.min(1,Math.max(0,(t-n.depth)/(a.depth-n.depth))),u=r*r*(3-2*r);return o.fog.copy(no.set(n.fog).lerp(ro.set(a.fog),u)),o.glow.copy(no.set(n.glow).lerp(ro.set(a.glow),u)),o.abyss.copy(no.set(n.abyss).lerp(ro.set(a.abyss),u)),o.density=n.density+(a.density-n.density)*u,o.hemi=n.hemi+(a.hemi-n.hemi)*u,o.light.copy(no.set(n.light).lerp(ro.set(a.light),u)),o}const Qo=new b,qe=new y,Jo=new ks;function x(i={}){const t=i.s===void 0?[1,1,1]:typeof i.s=="number"?[i.s,i.s,i.s]:i.s;return new Qe().compose(new y(i.x||0,i.y||0,i.z||0),new ho().setFromEuler(new Es(i.rx||0,i.ry||0,i.rz||0,"YXZ")),new y(t[0],t[1],t[2]))}class nt{positions=[];normals=[];colors=[];indices=[];extra=[];get vertexCount(){return this.positions.length/3}add(t,o,e=new Qe,s=0,n){const a=t.getAttribute("position");t.getAttribute("normal")||t.computeVertexNormals();const r=t.getAttribute("normal"),u=this.vertexCount;Jo.getNormalMatrix(e);const c=new y,l=new y,d=typeof o=="function"?null:Qo.set(o).clone();for(let f=0;f<a.count;f++){c.fromBufferAttribute(a,f),l.fromBufferAttribute(r,f),qe.copy(c).applyMatrix4(e),this.positions.push(qe.x,qe.y,qe.z);const h=l.clone().applyMatrix3(Jo).normalize();n&&h.lerp(qe.clone().sub(n.center).normalize(),n.amount).normalize(),this.normals.push(h.x,h.y,h.z);const m=d||(()=>{const v=o(c,l);return v instanceof b?v:Qo.set(v)})();this.colors.push(m.r,m.g,m.b),this.extra.push(typeof s=="function"?s(c):s)}if(t.index){const f=t.index;for(let h=0;h<f.count;h++)this.indices.push(u+f.getX(h))}else for(let f=0;f<a.count;f++)this.indices.push(u+f);if(e.determinant()<0)for(let f=this.indices.length-(t.index?t.index.count:a.count);f<this.indices.length;f+=3){const h=this.indices[f+1];this.indices[f+1]=this.indices[f+2],this.indices[f+2]=h}return t.dispose(),this}build(t=!1){const o=new vt;o.setAttribute("position",new V(new Float32Array(this.positions),3)),o.setAttribute("normal",new V(new Float32Array(this.normals),3)),o.setAttribute("color",new V(new Float32Array(this.colors),3)),t&&o.setAttribute("aExtra",new V(new Float32Array(this.extra),1));const e=this.vertexCount;return o.setIndex(new V(e>65535?new Uint32Array(this.indices):new Uint16Array(this.indices),1)),o.computeBoundingSphere(),o.computeBoundingBox(),o}}function ae(i){let t=i>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967296)}function lo(i,t){const o=Math.sin(i*127.1+t*311.7)*43758.5453123;return o-Math.floor(o)}function si(i,t){const o=Math.floor(i),e=Math.floor(t),s=i-o,n=t-e,a=s*s*(3-2*s),r=n*n*(3-2*n),u=lo(o,e),c=lo(o+1,e),l=lo(o,e+1),d=lo(o+1,e+1);return(u+(c-u)*a+(l+(d-l)*a-(u+(c-u)*a))*r)*2-1}function bt(i,t,o=3){let e=0,s=.5,n=1,a=0;for(let r=0;r<o;r++)e+=si(i*n,t*n)*s,a+=s,s*=.5,n*=2.03;return e/a}const oe=(i,t,o)=>i+(t-i)*o,se=i=>Math.min(1,Math.max(0,i)),Q=(i,t,o)=>{const e=se((o-i)/(t-i));return e*e*(3-2*e)};function at(i,t,o){return new b(i).lerp(new b(t),se(o))}const ts=`
uniform float uTime;
uniform float uSeed;
uniform vec3 uGrab;
uniform vec3 uPull;
uniform float uRadius;
uniform float uBase;
uniform float uHeight;
uniform float uSquash;
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
  vec3 q = vec3(p.x * sxz, uBase + (p.y - uBase) * sy, p.z * sxz);
  // 呼吸：一圈很小、往上走的波
  q.xz *= 1.0 + 0.022 * h * sin(uTime * 2.3 + p.y * 3.1 + uSeed);
  vec3 rel = p - uGrab;
  float w = exp(-dot(rel, rel) / (uRadius * uRadius));
  float stick = smoothstep(0.0, 0.6, h);
  float k = max(w, 0.3 * h) * mix(0.2, 1.0, stick);
  q += uPull * k;
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
`,ii=`
uniform vec3 uDeep;
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uDeep * 0.42 + vec3(0.03, 0.02, 0.06), 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}
`,ai=`
uniform vec3 uColor;
uniform vec3 uDeep;
uniform vec3 uTop;
uniform float uTopStart;
uniform float uOpacity;
uniform float uBack;
uniform float uFace;
uniform float uBlink;
uniform vec3 uFaceCenter;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uNight;
varying vec3 vObj;
varying vec3 vWorld;
varying vec3 vNormalW;
#include <fog_pars_fragment>

float ellipse(vec2 p, vec2 c, vec2 r) {
  vec2 q = (p - c) / r;
  float d = dot(q, q);
  return 1.0 - smoothstep(0.82, 1.0, d);
}

void main() {
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
    vec3 inner = mix(uDeep, tint, 0.35) * (ambient * 0.75 + uSunColor * wrap * 0.35);
    outColor = vec4(inner, 0.9);
  } else {
    // 動畫風：亮面／暗面兩階，交界柔一點；暗面帶一點果凍自己的深色
    float band = smoothstep(0.36, 0.46, wrap);
    vec3 lit = tint * (uSunColor * 0.62 + ambient * 0.48);
    vec3 shade = mix(uDeep, tint, 0.38) * (ambient * 0.78 + uSunColor * 0.12);
    vec3 col = mix(shade, lit, band);
    // 背光時透出來的亮色
    float through = pow(clamp(dot(V, -uSunDir) * 0.5 + 0.5, 0.0, 1.0), 3.0) * (1.0 - facing);
    col += tint * through * 0.45;
    // 邊緣一圈亮亮的果凍光（硬邊）
    col += mix(tint, vec3(1.0), 0.7) * smoothstep(0.42, 0.55, fres) * 0.42;
    vec3 H = normalize(uSunDir + V);
    float nh = max(dot(N, H), 0.0);
    // 高光是一塊乾淨的白色形狀，不是一團霧
    float spec = smoothstep(0.972, 0.982, nh) + smoothstep(0.86, 0.9, nh) * 0.12;
    vec3 H2 = normalize(normalize(vec3(-0.5, 0.8, 0.4)) + V);
    spec += smoothstep(0.988, 0.994, max(dot(N, H2), 0.0)) * 0.9;
    col += vec3(1.0) * spec;
    float alpha = mix(uOpacity, 1.0, fres * 0.55 + spec * 0.4);
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
`;function ni(){const i=new U(1,56,40),t=i.getAttribute("position"),o=new y;for(let e=0;e<t.count;e++){o.fromBufferAttribute(t,e);let s=o.y*.82;s<-.42&&(s=-.42+(s+.42)*.12);const n=1+.08*Math.max(0,1-Math.abs(s+.12)*2.2);o.set(o.x*1.06*n,s+.42,o.z*1.06*n),t.setXYZ(e,o.x,o.y,o.z)}return i.computeVertexNormals(),i}function ri(){const i=[];for(let e=0;e<=26;e++){const s=e/26;if(s<.12)i.push(new Lt(.001+s/.12*.98,0));else if(s<.7){const n=(s-.12)/.58;i.push(new Lt(.98-n*.22+Math.sin(n*Math.PI)*.03,n*1.05))}else{const n=(s-.7)/.3,a=n*Math.PI/2;i.push(new Lt(Math.max(.001,.76*Math.cos(a)*(1-n*.05)),1.05+Math.sin(a)*.2))}}const o=new Ns(i,48);return o.computeVertexNormals(),o}function li(){const i=new st(1.5,1.5,1.5,6,.38);return i.translate(0,.75,0),i.deleteAttribute("uv"),i}class Xe{group=new Ce;front;back;outline=null;uniforms;kind;face;pull=new y;pullVel=new y;target=new y;squash=0;squashVel=0;hop=0;hopVel=0;blinkAt=1.5+Math.random()*3;dragging=!1;maxStretch;height;constructor(t,o,e,s={}){this.kind=t,this.face=!!s.face;const n=t==="slime"?ni():t==="pudding"?ri():li();n.computeBoundingBox();const a=n.boundingBox;this.height=a.max.y-a.min.y,this.maxStretch=this.height*1.25,this.uniforms={uTime:e.uTime,uSunDir:e.uSunDir,uSunColor:e.uSunColor,uSkyColor:e.uSkyColor,uGroundColor:e.uGroundColor,uNight:e.uNight,uSeed:{value:s.seed??Math.random()*10},uGrab:{value:new y(0,this.height*.75,.4)},uPull:{value:new y},uRadius:{value:t==="cube"?1.15:.95},uBase:{value:a.min.y},uHeight:{value:this.height},uSquash:{value:0},uColor:{value:new b(o.color)},uDeep:{value:new b(o.deep)},uTop:{value:new b(o.top||o.color)},uTopStart:{value:o.top?t==="pudding"?1.02:this.height*.8:99},uOpacity:{value:.84},uBack:{value:0},uFace:{value:this.face?1:0},uBlink:{value:1},uFaceCenter:{value:new y(0,this.height*.42,0)},uOutlineWidth:s.outlines?s.outlines.uWidth:{value:0},uResolution:s.outlines?s.outlines.uResolution:{value:new Lt(1,1)}};const r=u=>new X({uniforms:{...jt.clone($t.fog),...this.uniforms,uBack:{value:u?1:0},uFace:u?{value:0}:this.uniforms.uFace},vertexShader:ts,fragmentShader:ai,transparent:!0,depthWrite:!u,side:u?Ze:Fs,fog:!0});this.back=new H(n,r(!0)),this.front=new H(n,r(!1)),this.back.renderOrder=4,this.front.renderOrder=5,this.front.userData.jelly=this,this.group.add(this.back,this.front),s.outlines&&(this.outline=new H(n,new X({uniforms:{...jt.clone($t.fog),...this.uniforms},vertexShader:ts,fragmentShader:ii,side:Ze,fog:!0,defines:{OUTLINE:""},transparent:!0,depthWrite:!1})),this.outline.renderOrder=6,this.group.add(this.outline))}setLook(t){this.uniforms.uColor.value.set(t.color),this.uniforms.uDeep.value.set(t.deep),this.uniforms.uTop.value.set(t.top||t.color)}hit(t){return t.intersectObject(this.front,!1)[0]}grab(t){this.uniforms.uGrab.value.copy(t),this.dragging=!0}dragTo(t){this.target.copy(t).sub(this.uniforms.uGrab.value),this.target.length()>this.maxStretch&&this.target.setLength(this.maxStretch)}release(){this.dragging&&(this.dragging=!1,this.target.set(0,0,0),this.squashVel+=Math.min(3.2,this.pull.length()*2.4))}poke(t=!1){this.squashVel-=2.6,t&&(this.hopVel=5.2)}update(t,o){const e=Math.max(1,Math.min(6,Math.ceil(t/.008333333333333333))),s=t/e,n=this.dragging?260:120,a=this.dragging?24:5.2;for(let r=0;r<e;r++)this.pullVel.x+=((this.target.x-this.pull.x)*n-this.pullVel.x*a)*s,this.pullVel.y+=((this.target.y-this.pull.y)*n-this.pullVel.y*a)*s,this.pullVel.z+=((this.target.z-this.pull.z)*n-this.pullVel.z*a)*s,this.pull.addScaledVector(this.pullVel,s),this.squashVel+=(-this.squash*150-this.squashVel*6.5)*s,this.squash+=this.squashVel*s,(this.hop>0||this.hopVel!==0)&&(this.hopVel-=22*s,this.hop+=this.hopVel*s,this.hop<=0&&(this.hop=0,this.hopVel<-1&&(this.squashVel-=Math.min(4,-this.hopVel*.55)),this.hopVel=0));if(this.squash=Math.max(-.45,Math.min(.6,this.squash)),this.uniforms.uPull.value.copy(this.pull),this.uniforms.uSquash.value=this.squash+(this.hopVel>0?Math.min(.18,this.hopVel*.04):0),this.front.position.y=this.hop,this.back.position.y=this.hop,this.outline&&(this.outline.position.y=this.hop),this.face){this.blinkAt-=t,this.blinkAt<0&&(this.blinkAt=2.4+Math.random()*3.6);const r=this.blinkAt<.14?this.blinkAt/.14:1;this.uniforms.uBlink.value=this.blinkAt<.14?Math.abs(r*2-1):1}}get moving(){return this.dragging||this.pull.lengthSq()>1e-5||this.pullVel.lengthSq()>1e-5||Math.abs(this.squash)>1e-4||this.hop>0}dispose(){this.front.geometry.dispose(),this.front.material.dispose(),this.back.material.dispose(),this.outline?.material?.dispose()}}const ve=`
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
`,So=`
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
`,ms=`
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
`;let be=null;function ci(){if(be)return be;const i=256,t=new Uint8Array(i);for(let o=0;o<i;o++){const e=o/(i-1),s=Math.min(1,Math.max(0,(e-.47)/.07)),n=s*s*(3-2*s),a=Math.min(1,Math.max(0,(e-.86)/.1))*.06;t[o]=Math.round(Math.min(1,.2+n*.74+a)*255)}return be=new xo(t,i,1,cs,bo),be.magFilter=ie,be.minFilter=ie,be.needsUpdate=!0,be}const ui=`
uniform float uTime;
uniform float uWind;
attribute float aExtra;
vec3 windSway(vec3 p, float weight) {
  float phase = p.x * 0.45 + p.z * 0.38;
  vec3 offset = vec3(sin(uTime * 1.35 + phase), 0.0, cos(uTime * 1.05 + phase * 1.3)) * 0.055;
  offset.x += sin(uTime * 3.1 + phase * 2.0) * 0.012;
  return offset * weight * uWind;
}
`,Fo={color:{value:new b("#fff6dc")},strength:{value:.42}};function Me(i,t={}){const o=new ls({vertexColors:t.vertexColors??!0,color:t.color?new b(t.color):16777215,gradientMap:ci(),...t.side!==void 0?{side:t.side}:{},emissive:t.emissive?new b(t.emissive):0,emissiveIntensity:t.emissiveIntensity??1}),e={value:t.rim??.32},s={value:new b(t.rimColor||"#fff6dc")},n={value:1};return o.onBeforeCompile=a=>{a.uniforms.uRim=e,a.uniforms.uRimColor=s,a.uniforms.uSunDir=i.uSunDir,a.uniforms.uTime=i.uTime,a.uniforms.uWind=n,(t.caustics||t.rock)&&(a.uniforms.uCausticColor=Fo.color,a.uniforms.uCausticStrength=Fo.strength,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCausticWorld;`).replace("#include <project_vertex>",`#include <project_vertex>
vCausticWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`)),t.wind&&(a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
${ui}`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed += windSway(transformed, aExtra);`));const r=t.caustics||t.rock?`
uniform float uTime;
uniform vec3 uCausticColor;
uniform float uCausticStrength;
varying vec3 vCausticWorld;
${ve}
${So}`:"",u=t.rock?`
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
        diffuseColor.rgb = mix(diffuseColor.rgb, coralTint, coral * 0.6);`:"",c=t.rock?`
        // 斜斜看過去的岩壁邊緣融進水裡（水是有厚度的），輪廓才不會像剪下來的
        #ifdef USE_FOG
          float rockEdge = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.2);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, rockEdge * 0.6);
        #endif`:"",l=t.caustics?`
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
        }`:"";a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
uniform float uRim;
uniform vec3 uRimColor;
uniform vec3 uSunDir;${r}`).replace("#include <color_fragment>",`#include <color_fragment>${u}`).replace("#include <fog_fragment>",`#include <fog_fragment>${c}`).replace("#include <opaque_fragment>",`${l}
        // 輪廓光：只在朝向太陽那一側的邊緣，硬邊、像動畫裡的高光描邊
        vec3 viewDir = normalize(vViewPosition);
        float rimDot = 1.0 - clamp(dot(normal, viewDir), 0.0, 1.0);
        vec3 sunView = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
        float facingSun = clamp(dot(normal, sunView) * 0.6 + 0.55, 0.0, 1.0);
        outgoingLight += uRimColor * smoothstep(0.68, 0.76, rimDot) * facingSun * uRim;
        #include <opaque_fragment>`)},o.customProgramCacheKey=()=>`l3d-toon-${t.wind?"wind":"still"}${t.caustics?"-caustics":""}${t.rock?"-rock":""}`,o.userData.rim=e,o.userData.wind=n,o}const hi=`
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
`,fi=`
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
`;function di(){return{uWidth:{value:2},uResolution:{value:new Lt(1,1)}}}function mi(i,t,o,e={}){const s=i.getAttribute("position").count;i.getAttribute("aExtra")||i.setAttribute("aExtra",new V(new Float32Array(s),1)),i.getAttribute("color")||i.setAttribute("color",new V(new Float32Array(s*3).fill(.5),3));const n=new X({uniforms:{...jt.clone($t.fog),uWidth:o.uWidth,uWidthScale:{value:e.width??1},uResolution:o.uResolution,uTime:t.uTime,uWind:{value:1},uUseWind:{value:e.wind?1:0},uUseVertexColor:{value:e.vertexColors===!1?0:1},uInk:{value:new b(e.ink||"#24343a")},uTint:{value:e.tint??.55}},vertexShader:hi,fragmentShader:fi,side:Ze,fog:!0}),a=new H(i,n);return a.renderOrder=-1,a}function _e(i,t,o,e={}){const s=mi(i.geometry,t,o,e);return i.add(s),s}const Go=`
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
  col = mix(col, uHaze, pow(sun, 5.0) * mix(0.3, 0.22, uNight));
  col += uHaze * pow(sun, 56.0) * mix(0.42, 0.3, uNight);
  // 貼著地平線一層亮亮的霧
  col = mix(col, mix(uHorizon, uHaze, 0.4), exp(-h * 34.0) * 0.55);
  return col;
}
`,pi=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,vi=`
uniform float uTime;
varying vec3 vDir;
${ve}
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
  float disc = smoothstep(0.99935, 0.99962, sun);
  vec3 sunDisc = vec3(1.0, 0.98, 0.92) * 1.6;
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
`,gi=`
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
`,yi=`
uniform float uOpacity;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.2, 1.0, d)) * uOpacity * vTwinkle;
  gl_FragColor = vec4(vec3(1.0, 0.97, 0.9), a);
}
`,wi=`
attribute vec3 color;
varying vec3 vNormalW;
varying vec3 vWorld;
varying float vBase;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  // color.r 存的是這個點在整朵雲裡的高度（0＝雲底、1＝雲頂）
  vBase = color.r;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,xi=`
uniform vec3 uLit;
uniform vec3 uMid;
uniform vec3 uShade;
uniform float uOpacity;
varying vec3 vNormalW;
varying vec3 vWorld;
varying float vBase;
${Go}
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorld);
  float wrap = dot(N, uSunDir) * 0.5 + 0.5;
  // 三階的卡通明暗：亮面白、中間帶一點藍、暗面藍紫，交界柔一點
  vec3 col = mix(uShade, uMid, smoothstep(0.3, 0.38, wrap));
  col = mix(col, uLit, smoothstep(0.56, 0.62, wrap));
  // 雲底：平平的、暗一點
  col = mix(col, uShade * 0.96, smoothstep(0.22, 0.0, vBase) * 0.75);
  // 銀邊：側面的邊緣亮起來，朝著太陽看的時候整圈邊都會發光
  float rim = pow(1.0 - clamp(abs(dot(N, V)), 0.0, 1.0), 2.6);
  float toward = pow(max(dot(-V, uSunDir), 0.0), 3.0);
  col += uHaze * smoothstep(0.35, 0.75, rim) * (0.16 + toward * 0.7) * (0.4 + 0.6 * wrap);
  // 越遠、越靠近地平線，就越融進天空的霧裡
  vec3 dir = normalize(vWorld - cameraPosition);
  vec3 sky = skyGradient(vec3(dir.x, max(dir.y, 0.0), dir.z));
  float haze = (1.0 - smoothstep(0.0, 0.1, dir.y)) * 0.3 + smoothstep(0.3, 0.0, vBase) * 0.3;
  col = mix(col, sky, clamp(haze, 0.0, 0.85));
  gl_FragColor = vec4(col, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;function To(i,t,o,e,s,n,a){const r=[],u=2.4+t()*1.4,c=4+Math.floor(t()*3);for(let v=0;v<c;v++){const M=c===1?0:v/(c-1)-.5;r.push({x:M*u,y:.25+t()*.2,z:(t()-.5)*.7,r:.62+t()*.3-Math.abs(M)*.35})}const l=1+Math.round(s*2);for(let v=1;v<=l;v++){const M=Math.max(1,Math.round((c-1)*(1-v/(l+1.2)))),A=u*(1-v/(l+1.6));for(let k=0;k<M;k++){const _=M===1?0:k/(M-1)-.5;r.push({x:_*A+(t()-.5)*.4,y:.35+v*(.62+t()*.22),z:(t()-.5)*.5,r:.7+t()*.32-v*.04})}}const d=r.reduce((v,M)=>Math.max(v,M.y+M.r),0),f=new y(o.x,o.y+d*e*.45,o.z),h=Math.cos(n),m=Math.sin(n);for(const v of r){const M=new U(v.r,a[0],a[1]),A=M.getAttribute("position"),k=new y;for(let R=0;R<A.count;R++){k.fromBufferAttribute(A,R);const B=k.clone().normalize(),L=1+.09*bt(B.x*2.3+v.x*3.1+B.y*1.7,B.z*2.3+v.y*2.7-B.y*1.3,2);k.multiplyScalar(L),k.y<-v.r*.35&&(k.y=-v.r*.35),A.setXYZ(R,k.x,k.y,k.z)}M.computeVertexNormals();const _=v.x*e,G=v.z*e;i.add(M,R=>{const B=(v.y+R.y)/Math.max(.01,d);return new b(Math.min(1,Math.max(0,B)),0,0)},x({x:o.x+_*h-G*m,y:o.y+v.y*e,z:o.z+_*m+G*h,ry:-n,s:e}),0,{center:f,amount:.78})}}function bi(i,t){const o=new Ce,e={uTop:i.uSkyTop,uHorizon:i.uSkyHorizon,uHaze:i.uSkyHaze},s=new H(new U(460,40,20),new X({uniforms:{...e,uSunDir:i.uSunDir,uNight:i.uNight,uTime:i.uTime},vertexShader:pi,fragmentShader:vi,side:Ze,depthWrite:!1,toneMapped:!1}));s.renderOrder=-10,o.add(s);const n=ae(41),a=t==="high"?620:300,r=new Float32Array(a*3),u=new Float32Array(a),c=new y;for(let L=0;L<a;L++){do c.set(n()*2-1,n()*.95+.04,n()*2-1);while(c.lengthSq()>1);c.normalize().multiplyScalar(420),r.set([c.x,c.y,c.z],L*3),u[L]=n()*10}const l=new vt;l.setAttribute("position",new V(r,3)),l.setAttribute("aSeed",new V(u,1));const d={uOpacity:{value:0},uScale:{value:1}},f=new Yt(l,new X({uniforms:{...d,uTime:i.uTime},vertexShader:gi,fragmentShader:yi,transparent:!0,depthWrite:!1,blending:Xt}));f.renderOrder=-9,o.add(f);const h=new Ce,m=ae(77),v=new nt,M=t==="high"?[18,12]:[12,8],A=t==="high"?17:12;for(let L=0;L<A;L++){const E=L/A*Math.PI*2+m()*.25,J=300+m()*110,tt=new y(Math.cos(E)*J,-5+m()*4,Math.sin(E)*J);To(v,m,tt,9+m()*9,.4+m()*1.1,-E+Math.PI/2,M)}const k=t==="high"?9:6;for(let L=0;L<k;L++){const E=L/k*Math.PI*2+.2+m()*.4,J=215+m()*50,tt=new y(Math.cos(E)*J,3+m()*6,Math.sin(E)*J);To(v,m,tt,5+m()*4,.15+m()*.6,-E+Math.PI/2,M)}const _=t==="high"?8:5;for(let L=0;L<_;L++){const E=m()*Math.PI*2,J=190+m()*70,tt=new y(Math.cos(E)*J,20+m()*16,Math.sin(E)*J);To(v,m,tt,2.6+m()*2.2,.1+m()*.3,-E+Math.PI/2,M)}const G={uLit:{value:new b("#ffffff")},uMid:{value:new b("#e3ebf8")},uShade:{value:new b("#aebde3")},uOpacity:{value:1}},R=new X({uniforms:{...G,uTop:i.uSkyTop,uHorizon:i.uSkyHorizon,uHaze:i.uSkyHaze,uSunDir:i.uSunDir,uNight:i.uNight},vertexShader:wi,fragmentShader:xi,transparent:!0,depthWrite:!0}),B=new H(v.build(),R);return B.renderOrder=-8,B.frustumCulled=!1,h.add(B),o.add(h),{group:o,uniforms:e,stars:f,clouds:h,starUniforms:d,cloudUniforms:G,dispose:()=>{s.geometry.dispose(),s.material.dispose(),l.dispose(),f.material.dispose(),B.geometry.dispose(),R.dispose()}}}const fo=8,te=192,No=16,Ro=2,mo=.5;function Si(i){const t=new Uint8Array(te*te*4);for(let e=0;e<te;e++)for(let s=0;s<te;s++){const n=((s+.5)/te*2-1)*No,a=((e+.5)/te*2-1)*No;let r=Ro;for(const c of i){let l=n-c.x,d=a-c.z;if(c.sx||c.sz){const f=Math.cos(c.yaw||0),h=Math.sin(c.yaw||0),m=l*f-d*h,v=l*h+d*f;l=m/(c.sx||1),d=v/(c.sz||1);const M=(Math.hypot(l,d)-1)*Math.min(c.sx||1,c.sz||1);r=Math.min(r,M);continue}r=Math.min(r,Math.hypot(l,d)-c.r)}const u=(e*te+s)*4;t[u]=Math.round(Math.min(1,Math.max(0,(r+mo)/(Ro+mo)))*255),t[u+1]=0,t[u+2]=0,t[u+3]=255}const o=new xo(t,te,te,us,bo);return o.magFilter=ie,o.minFilter=ie,o.needsUpdate=!0,o}const Ht=256,Mt=16,Tt=8,po=3,ps=.7;function Mi(){let i=4127;const t=()=>(i=i*16807%2147483647,i/2147483647),o=Float32Array.from({length:Mt*Mt},t),e=(l,d)=>o[(d%Mt+Mt)%Mt*Mt+(l%Mt+Mt)%Mt],s=(l,d)=>{const f=Math.floor(l),h=Math.floor(d),m=l-f,v=d-h,M=m*m*(3-2*m),A=v*v*(3-2*v),k=e(f,h),_=e(f+1,h),G=e(f,h+1),R=e(f+1,h+1);return k+(_-k)*M+(G-k)*A+(k-_-G+R)*M*A},n=(l,d)=>s(l,d)*.66+s(l*2,d*2)*.34,a=Array.from({length:Tt*Tt},()=>[.15+t()*.7,.15+t()*.7]),r=new Uint8Array(Ht*Ht*4),u=Mt/Ht;for(let l=0;l<Ht;l++)for(let d=0;d<Ht;d++){const f=d*u,h=l*u,m=n(f,h),v=(n(f+u,h)-n(f-u,h))/(2*u),M=(n(f,h+u)-n(f,h-u))/(2*u),A=d/Ht*Tt,k=l/Ht*Tt,_=Math.floor(A),G=Math.floor(k);let R=9,B=9;for(let E=-1;E<=1;E++)for(let J=-1;J<=1;J++){const tt=_+J,Nt=G+E,ft=a[(Nt%Tt+Tt)%Tt*Tt+(tt%Tt+Tt)%Tt],j=Math.hypot(tt+ft[0]-A,Nt+ft[1]-k);j<R?(B=R,R=j):j<B&&(B=j)}const L=(l*Ht+d)*4;r[L]=Math.round(Math.min(1,Math.max(0,v/(2*po)+.5))*255),r[L+1]=Math.round(Math.min(1,Math.max(0,M/(2*po)+.5))*255),r[L+2]=Math.round(Math.min(1,Math.max(0,m))*255),r[L+3]=Math.round(Math.min(1,(B-R)/ps)*255)}const c=new xo(r,Ht,Ht,us,bo);return c.wrapS=c.wrapT=hs,c.magFilter=ie,c.minFilter=Rs,c.generateMipmaps=!0,c.needsUpdate=!0,c}function zi(i){const t=i==="high"?200:140,o=[];let e=5.2;for(;e<15;)o.push(e),e+=i==="high"?.28:.4;for(;e<520;)o.push(e),e*=i==="high"?1.075:1.1;o.push(520);const s=new Float32Array(o.length*t*3);o.forEach((r,u)=>{for(let c=0;c<t;c++){const l=c/t*Math.PI*2;s.set([Math.cos(l)*r,0,Math.sin(l)*r],(u*t+c)*3)}});const n=[];for(let r=0;r<o.length-1;r++){const u=r*t,c=(r+1)*t;for(let l=0;l<t;l++){const d=(l+1)%t;n.push(u+l,u+d,c+l,u+d,c+d,c+l)}}const a=new vt;return a.setAttribute("position",new V(s,3)),a.setIndex(n),a.computeBoundingSphere(),a}const Ci=`
uniform float uTime;
uniform sampler2D uCoast;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
#include <fog_pars_vertex>

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
  float amp = mix(0.45, 1.0, smoothstep(0.0, 7.0, dist));
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
  vWorld = world.xyz;
  vSwellN = n;
  vSwell = h / (0.28 * amp);
  vec4 mvPosition = viewMatrix * world;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,Ai=`
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
uniform vec4 uRipples[${fo}];
uniform sampler2D uSeaNoise;
varying vec3 vLocal;
varying vec3 vWorld;
varying vec3 vSwellN;
varying float vSwell;
#include <fog_pars_fragment>
${ve}
${So}
${Go}
${ms}
// 高畫質每個像素自己算雜訊；手機與舊電腦讀那張雜訊圖（B 色版＝平滑雜訊，一格 ${Mt} 個單位）
#ifdef SEA_HIGH
  #define SEA_NOISE(p) vnoise(p)
#else
  #define SEA_NOISE(p) texture2D(uSeaNoise, (p) * ${(1/Mt).toFixed(4)}).b
#endif
// 光網（讀圖版）：兩層往不同方向慢慢飄、再用低頻的斜率扭一下
float seaCaustics(vec2 p, float t, float width) {
  #ifdef SEA_HIGH
    return caustics(p, t, width);
  #else
    vec2 warp = (texture2D(uSeaNoise, p * 0.021 + t * 0.002).rg - 0.5) * 1.1;
    // 再用跟格子差不多大的扭曲把直直的格子邊彎成曲線（不然看起來像碎玻璃）
    vec2 bend = (texture2D(uSeaNoise, p * 0.07 - t * 0.004 + 0.21).rg - 0.5) * 0.36;
    float a = texture2D(uSeaNoise, (p + warp + bend) * ${(1/Tt).toFixed(4)} + vec2(t * 0.012, t * 0.007)).a;
    float b = texture2D(uSeaNoise, (p * 1.31 - warp - bend) * ${(1/Tt).toFixed(4)} - vec2(t * 0.009, -t * 0.011) + 0.37).a;
    float e = min(a, b * 1.2) * ${ps.toFixed(2)};
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
    vec2 g1 = (texture2D(uSeaNoise, q1 * ${(1/Mt).toFixed(4)}).rg - 0.5) * ${(2*po).toFixed(1)};
    vec2 g2 = (texture2D(uSeaNoise, q2 * ${(1/Mt).toFixed(4)} + 0.5).rg - 0.5) * ${(2*po).toFixed(1)};
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
  for (int i = 0; i < ${fo}; i++) {
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
        sand += uSunColor * seaCaustics(wp * 1.45, t * 0.85, causticWidth) * 0.55 * shallowLight;
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
    col += glintColor * (glint * 1.3 + sheen) * mix(1.0, 0.8, uNight);
    // 浪頭偶爾翻出一小撮白（只有近處，遠處就只是亮一點）
    float whitecap = 0.0;
    if (near > 0.01 && vSwell > 0.2) {
      float capNoise = SEA_NOISE(wp * 0.9 + vec2(t * 0.2, -t * 0.15));
      whitecap = smoothstep(0.7, 0.86, vSwell * 0.6 + capNoise * 0.55) * smoothstep(0.62, 0.8, SEA_NOISE(wp * 0.23 - t * 0.03)) * near * smoothstep(5.0, 12.0, dist);
    }

    // ── 白浪：貼著岸一條、一進一退拍上沙灘一條；岩石和木樁旁邊一圈（只有島邊才算） ──
    float foam = max(whitecap * 0.8, rippleRing * 0.5);
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
    vec2 fieldUv = lp / ${(No*2).toFixed(1)} + 0.5;
    if (all(greaterThan(fieldUv, vec2(0.0))) && all(lessThan(fieldUv, vec2(1.0)))) {
      float obstacle = texture2D(uFoamField, fieldUv).r * ${(Ro+mo).toFixed(2)} - ${mo.toFixed(2)};
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
`,Ti=[[.94,.34,11,.085,.55],[.62,.78,7.3,.055,.5],[.99,-.12,17,.11,.4],[.17,.98,4.9,.03,.55]];function Pi(i,t,o,e,s={height:0,slopeX:0,slopeZ:0}){s.height=0,s.slopeX=0,s.slopeZ=0;for(const[n,a,r,u]of Ti){const c=Math.PI*2/r,l=Math.sqrt(9.8/c)*.42,d=c*(n*i+a*t-l*o);s.height+=u*e*Math.sin(d),s.slopeX+=n*c*u*e*Math.cos(d),s.slopeZ+=a*c*u*e*Math.cos(d)}return s}const _i=`
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
`,ki=`
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
`;function Ei(i,t,o,e){const s=Si(o),n=Mi(),a=Array.from({length:fo},()=>new Ne(0,0,-100,0));let r=0;const u={...jt.clone($t.fog),uCoast:{value:t},uFoamField:{value:s},uSeaNoise:{value:n},uShallow:{value:new b("#5fe3d6")},uMid:{value:new b("#16a5cf")},uDeep:{value:new b("#0a4f9e")},uFoam:{value:new b("#ffffff")},uSand:{value:new b("#f1dcae")},uGlowFoam:{value:new b("#7ff3ff")},uTop:i.uSkyTop,uHorizon:i.uSkyHorizon,uHaze:i.uSkyHaze,uSkyColor:i.uSkyColor,uSunDir:i.uSunDir,uSunColor:i.uSunColor,uTime:i.uTime,uNight:i.uNight,uRipples:{value:a},uWaterGlow:i.uWaterGlow,uWaterFog:i.uWaterFog,uWaterAbyss:i.uWaterAbyss,uWaterRays:i.uWaterRays},c=new X({uniforms:u,vertexShader:Ci,fragmentShader:Ai,transparent:!0,depthWrite:!1,side:Ae,fog:!0,defines:e==="high"?{SEA_HIGH:"",CAUSTIC_TWO_LAYERS:""}:{}}),l=new H(zi(e),c);l.renderOrder=2,l.frustumCulled=!1;const d=e==="high"?2200:1100,f=new Float32Array(d*3),h=new Float32Array(d*3);let m=9127;const v=()=>(m=m*16807%2147483647,m/2147483647);for(let _=0;_<d;_++){const G=Math.PI/2+(v()-.5)*4.2,R=9+Math.pow(v(),1.4)*150;f.set([Math.cos(G)*R,0,Math.sin(G)*R],_*3),h.set([v(),v(),v()],_*3)}const M=new vt;M.setAttribute("position",new V(f,3)),M.setAttribute("aSeed",new V(h,3));const A={uTime:i.uTime,uScale:{value:1},uNight:i.uNight,uSunDir:i.uSunDir,uColor:{value:new b("#fffbef")}},k=new Yt(M,new X({uniforms:A,vertexShader:_i,fragmentShader:ki,transparent:!0,depthWrite:!1,blending:Xt}));return k.frustumCulled=!1,k.renderOrder=3,{mesh:l,uniforms:u,sparkles:k,sparkleUniforms:A,ripple:(_,G,R)=>{a[r].set(_,G,i.uTime.value,R),r=(r+1)%fo},dispose:()=>{l.geometry.dispose(),c.dispose(),s.dispose(),n.dispose(),M.dispose(),k.material.dispose()}}}const vo=20261108,ee={x:-2.7,z:-1.7,r:1.7,h:.9},Fi=[{x:1.7,z:-2.3,r:1.25,h:1.62},{x:3.35,z:.25,r:1.15,h:1.6},{x:.3,z:1.6,r:2.2,h:1.58}],co=1.18;function ht(i){const t=Math.cos(i),o=Math.sin(i);return 7.05+.55*bt(t*1.35+3.1,o*1.35+1.7,3)+.26*Math.sin(3*i+.8)+.16*Math.sin(5*i+2.1)}function Ni(i,t){return Math.abs(((i-t)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}function Do(i,t){let o=1.6+.14*bt(i*.22+4,t*.22-2,3);o+=ee.h*Math.exp(-((i-ee.x)**2+(t-ee.z)**2)/(2*ee.r*ee.r));for(const e of Fi){const s=Math.exp(-((i-e.x)**2+(t-e.z)**2)/(2*e.r*e.r));o=oe(o,e.h,s*.9)}return o}function Lo(i){const t=Math.exp(-(Ni(i,co)**2)/.08000000000000002);return{ramp:t,edge:.8-.1*t,foot:.885+.04*t}}function vs(i,t,o,e){const{ramp:s,edge:n,foot:a}=Lo(e);if(i<=n){const u=Q(n-.07,n,i);return Do(t,o)-u*u*(.2-.12*s)}if(i<=a){const u=(i-n)/(a-n),c=Do(t,o)-(.2-.12*s),l=.5-.5*Math.cos(Math.PI*Math.pow(u,.78));return oe(c,.42,oe(l,u,s))}if(i<=1.04){const u=(i-a)/(1.04-a);return oe(.42,-.24,Math.pow(u,1.12))+.04*bt(t*.9,o*.9,2)}const r=se((i-1.04)/.18);return oe(-.24,-3.2,r*r*(3-2*r))}function me(i,t){const o=Math.atan2(t,i),e=ht(o);return vs(Math.hypot(i,t)/e,i,t,o)}const es=[.03,.1,.18,.26,.34,.42,.5,.57,.63,.68,.72,.745,.765,.78,.792,.805,.818,.832,.846,.86,.873,.89,.91,.935,.96,.985,1.01,1.04,1.08,1.12,1.17,1.22];function Ri(i){const t=[0,Do(0,0),0];for(const s of es)for(let n=0;n<i;n++){const a=n/i*Math.PI*2,r=s*ht(a),u=Math.cos(a)*r,c=Math.sin(a)*r;t.push(u,vs(s,u,c,a),c)}const o=[];for(let s=0;s<i;s++)o.push(0,1+(s+1)%i,1+s);for(let s=0;s<es.length-1;s++){const n=1+s*i,a=1+(s+1)*i;for(let r=0;r<i;r++){const u=(r+1)%i;o.push(n+r,n+u,a+r,n+u,a+u,a+r)}}const e=new vt;return e.setAttribute("position",new V(new Float32Array(t),3)),e.setIndex(o),e.computeVertexNormals(),e}function je(i,t){const o=Math.max(0,-3.2-t),e=Math.cos(i),s=Math.sin(i),n=Q(0,4,o);return ht(i)*1.22+o*.115+n*(.75*bt(e*1.6+t*.09,s*1.6-t*.07,3)+.35*Math.sin(t*.55+i*2))}const Ft=-58;function Di(i){const t=[];for(let n=-3.2;n>Ft-2;n-=n>-18?.6:1.2)t.push(n);t.push(Ft-2);const o=[];for(const n of t)for(let a=0;a<i;a++){const r=a/i*Math.PI*2,u=je(r,n);o.push(Math.cos(r)*u,n,Math.sin(r)*u)}const e=[];for(let n=0;n<t.length-1;n++){const a=n*i,r=(n+1)*i;for(let u=0;u<i;u++){const c=(u+1)%i;e.push(a+u,a+c,r+u,a+c,r+c,r+u)}}const s=new vt;return s.setAttribute("position",new V(new Float32Array(o),3)),s.setIndex(e),s.computeVertexNormals(),s}const Wi="#f7e1ad",gs="#a77548",uo="#8a5c38",os="#fff3dd";function Ii(i,t=10){const o=new U(1,t+2,t),e=o.getAttribute("position"),s=new y;for(let n=0;n<e.count;n++){s.fromBufferAttribute(e,n);const a=1+.18*bt(s.x*1.7+i,s.z*1.7+s.y*1.3-i,2);s.multiplyScalar(a),s.y*=.72,e.setXYZ(n,s.x,s.y,s.z)}return o.computeVertexNormals(),o}function qt(i,t=16,o=12){return new U(i,t,o)}class Gi{solid=new nt;glow=new nt;halos=[];chimneys=[];shadows=[];foamRings=[];rand=ae(vo);at(t,o){return me(t,o)}tree({x:t,z:o},e,s){const n=this.at(t,o)-.05,a=new it(.15,.24,1.6,10,5),r=a.getAttribute("position");for(let l=0;l<r.count;l++){const d=r.getY(l)+.8;r.setX(l,r.getX(l)+.14*(d/1.6)**2)}a.translate(0,.8,0),a.computeVertexNormals(),this.solid.add(a,uo,x({x:t,y:n,z:o,s:e}));const u=new y(t+.1*e,n+2.05*e,o),c=(l,d,f,h)=>{this.solid.add(qt(h,20,14),(m,v)=>at("#3f9a3e","#8fda62",v.y*.5+.5+.1*m.x),x({x:t+l*e,y:n+d*e,z:o+f*e,s:e}),.55+d*.18,{center:u,amount:.78})};c(.12,2,0,.95),c(.7,1.7,.25,.68),c(-.5,1.75,-.2,.72),c(.2,2.55,-.08,.62),c(-.2,1.65,.55,.55);for(const[l,d,f]of[[.55,2,.72],[-.35,2.25,.78],[.9,1.55,.55],[-.75,1.6,.45]])this.solid.add(qt(.13,10,8),s,x({x:t+l*e,y:n+d*e,z:o+f*e,s:e}),.9);this.shadows.push({x:t,z:o,r:1.5*e,o:.32})}palm({x:t,z:o},e,s,n){const a=this.at(t,o)-.05,r=Math.cos(n),u=Math.sin(n);let c=0,l=0,d=0;for(let h=0;h<8;h++){const m=new it(.15-h*.008,.17-h*.008,.36,10,1),v=h/7;c=r*s*v*v*1.4,d=u*s*v*v*1.4,l=h*.33,this.solid.add(m,h%2?"#c99c64":"#b8874f",x({x:t+c*e,y:a+(l+.18)*e,z:o+d*e,rx:u*s*v*.5,rz:-r*s*v*.5,s:e}))}const f=a+(l+.36)*e;for(let h=0;h<7;h++){const m=h/7*Math.PI*2+.3,v=new U(1,14,6);v.scale(1.15,.05,.3),v.translate(1,0,0),this.solid.add(v,M=>at("#3d9f3f","#79cf55",se(M.x*.5+.2)),x({x:t+c*e,y:f,z:o+d*e,ry:m,rz:-.42,s:e}),M=>se(M.x*.6)*1.4)}for(let h=0;h<3;h++){const m=h*2.1;this.solid.add(qt(.13,10,8),"#7a5233",x({x:t+(c+Math.cos(m)*.17)*e,y:f-.14*e,z:o+(d+Math.sin(m)*.17)*e,s:e}))}this.shadows.push({x:t+c*e,z:o+d*e,r:1.2*e,o:.22})}house({x:t,z:o},e,s,n){const a=this.at(t,o),r=l=>{const d=Math.cos(e),f=Math.sin(e),h=l.x||0,m=l.z||0;return x({...l,x:t+h*d+m*f,y:a+(l.y||0),z:o-h*f+m*d,ry:(l.ry||0)+e})};this.solid.add(new st(2.05,.24,1.75,2,.08),"#d9cdb8",r({y:.08})),this.solid.add(new st(1.8,1.25,1.5,3,.12),os,r({y:.82}));const u=new it(.86,.86,1.66,3,1);u.rotateZ(Math.PI/2),u.rotateX(-Math.PI/2),this.solid.add(u,os,r({y:1.62,s:[1.04,.82,.86]}));for(const l of[-1,1])this.solid.add(new st(2.25,.15,1.36,2,.07),d=>at(s,"#ffffff",d.y>.04?.14:0),r({y:1.9,z:l*.4,rx:l*.907}));this.solid.add(new st(.28,.62,.28,2,.06),"#c46a4f",r({x:-.55,y:2.1,z:-.3}));const c=r({x:-.55,y:2.45,z:-.3}).elements;this.chimneys.push(new y(c[12],c[13],c[14])),this.solid.add(new st(.44,.72,.1,2,.05),n,r({y:.56,z:.76})),this.solid.add(qt(.04,8,6),"#f2c14e",r({x:.12,y:.55,z:.82}));for(const l of[-.55,.55]){this.solid.add(new st(.46,.46,.06,2,.04),"#ffffff",r({x:l,y:.98,z:.755})),this.glow.add(new st(.34,.34,.05,2,.03),"#ffcf6e",r({x:l,y:.98,z:.78})),this.solid.add(new st(.5,.1,.16,2,.04),gs,r({x:l,y:.7,z:.82}));for(const h of[-.15,0,.15])this.solid.add(qt(.07,8,6),h===0?"#ffd166":"#ff8fab",r({x:l+h,y:.79,z:.84}));const f=r({x:l,y:.98,z:.85}).elements;this.halos.push(f[12],f[13],f[14])}this.shadows.push({x:t,z:o,r:1.9,o:.32})}windmillBody({x:t,z:o}){const e=this.at(t,o)-.05;this.solid.add(new it(.62,.92,2.7,20,4),s=>at("#f4e7cf","#e2cfaa",Q(.6,-1.3,s.y)),x({x:t,y:e+1.35,z:o}));for(const s of[.2,1.25])this.solid.add(new fs(.62+(1-s/1.35)*.28,.05,6,24),"#c9ad84",x({x:t,y:e+s,z:o,rx:Math.PI/2}));return this.solid.add(new U(.8,20,10,0,Math.PI*2,0,Math.PI/2),"#e3584d",x({x:t,y:e+2.66,z:o,s:[1,.92,1]})),this.solid.add(new st(.42,.66,.1,2,.05),uo,x({x:t,y:e+.36,z:o+.9,rx:-.11})),this.glow.add(new st(.26,.3,.06,2,.03),"#ffcf6e",x({x:t,y:e+1.55,z:o+.79,rx:-.11})),this.halos.push(t,e+1.55,o+.86),this.shadows.push({x:t,z:o,r:1.4,o:.3}),new y(t,e+2.42,o+.85)}pier(t){const o=ht(t),e=new y(Math.cos(t),0,Math.sin(t)),s=Math.atan2(e.x,e.z),n=o*.93;for(let r=0;r<12;r++){const u=n+r*.32;this.solid.add(new st(1.15,.07,.28,1,.03),r%3===1?"#b98a5a":"#c79a69",x({x:e.x*u,y:.42,z:e.z*u,ry:s}))}for(let r=0;r<4;r++){const u=n+.3+r*1.12;for(const c of[-1,1]){const l=Math.cos(t+Math.PI/2)*.52*c,d=Math.sin(t+Math.PI/2)*.52*c;this.solid.add(new it(.075,.085,2,8,1),uo,x({x:e.x*u+l,y:-.45,z:e.z*u+d})),this.foamRings.push({x:e.x*u+l,z:e.z*u+d,r:.1})}}const a=n+12*.32;return{x:e.x*(a+.8),z:e.z*(a+.8),yaw:s}}lighthouse({x:t,z:o}){const e=this.at(t,o)-.1;this.solid.add(new it(.4,.55,2.3,16,6),s=>Math.floor((s.y+1.15)/.46)%2?"#ffffff":"#e8574b",x({x:t,y:e+1.15,z:o})),this.solid.add(new it(.55,.55,.1,16,1),"#3f4a5a",x({x:t,y:e+2.33,z:o})),this.glow.add(new it(.3,.3,.42,12,1),"#fff1a8",x({x:t,y:e+2.6,z:o})),this.solid.add(new pe(.42,.5,16),"#e8574b",x({x:t,y:e+3.06,z:o})),this.solid.add(qt(.08,8,6),"#f2c14e",x({x:t,y:e+3.36,z:o})),this.halos.push(t,e+2.6,o),this.shadows.push({x:t,z:o,r:.9,o:.28})}rock({x:t,z:o},e,s="#a9b6bf"){const n=this.at(t,o)-.12*e;this.solid.add(Ii(this.rand()*10),(a,r)=>at("#7f8e98",s,r.y*.5+.55),x({x:t,y:n,z:o,ry:this.rand()*6,s:e})),this.foamRings.push({x:t,z:o,r:e*.95})}flower({x:t,z:o},e){const s=this.at(t,o);this.solid.add(new it(.015,.02,.24,4,1),"#4f9d3f",x({x:t,y:s+.12,z:o}),n=>se(n.y/.24+.5)*.7);for(let n=0;n<5;n++){const a=n/5*Math.PI*2;this.solid.add(qt(.06,6,4),e,x({x:t+Math.cos(a)*.065,y:s+.25,z:o+Math.sin(a)*.065,s:[1,.55,1]}),.75)}this.solid.add(qt(.045,6,4),"#ffd84d",x({x:t,y:s+.27,z:o}),.75)}bush({x:t,z:o},e){const s=this.at(t,o)-.05,n=new y(t,s+.2*e,o);for(const[a,r,u,c]of[[0,.3,0,.45],[.38,.22,.1,.34],[-.36,.24,-.05,.36]])this.solid.add(qt(c,14,10),(l,d)=>at("#3d8f3a","#6cc451",d.y*.5+.5),x({x:t+a*e,y:s+r*e,z:o+u*e,s:e}),.25,{center:n,amount:.7});this.shadows.push({x:t,z:o,r:.75*e,o:.22})}stone({x:t,z:o},e){const s=this.at(t,o);this.solid.add(new it(.3,.33,.1,12,1),at("#efe2c6","#d8c8a8",this.rand()).getHex(),x({x:t,y:s+.02,z:o,ry:this.rand()*3,s:[e,1,e*(.8+this.rand()*.3)]}))}fence(t,o,e){for(let a=0;a<e;a++){const r=a/(e-1),u=oe(t.x,o.x,r),c=oe(t.z,o.z,r);this.solid.add(new st(.12,.55,.12,1,.04),"#c99a68",x({x:u,y:this.at(u,c)+.25,z:c}))}const s=Math.hypot(o.x-t.x,o.z-t.z),n=Math.atan2(o.x-t.x,o.z-t.z);for(const a of[.2,.4]){const r=(t.x+o.x)/2,u=(t.z+o.z)/2;this.solid.add(new st(.06,.07,s,1,.02),"#d8ab78",x({x:r,y:this.at(r,u)+a,z:u,ry:n}))}}}function Li(){const i=new nt;i.add(qt(.16,12,10),"#8a5c38");for(let t=0;t<4;t++){const o=t/4*Math.PI*2;i.add(new st(.09,1.55,.07,1,.03),"#9b6a42",x({x:Math.sin(o)*.8,y:Math.cos(o)*.8,rz:-o})),i.add(new st(.36,1.12,.03,1,.012),e=>Math.abs(e.y)%.28<.04?"#e6d4b8":"#fffaf0",x({x:Math.sin(o)*.9+Math.cos(o)*.19,y:Math.cos(o)*.9-Math.sin(o)*.19,z:.02,rz:-o}))}return i.build()}function Vi(){const i=new U(.42,28,18),t=["#ef4b4b","#ffffff","#ffd23f","#ffffff","#3d8bfd","#ffffff"],o=new nt;return o.add(i,e=>{if(Math.abs(e.y)>.36)return"#ffffff";const s=(Math.atan2(e.z,e.x)+Math.PI)/(Math.PI*2);return t[Math.floor(s*6)%6]}),o.build()}function Oi(){const i=new nt;i.add(new st(.86,.46,.58,2,.05),"#a3683c",x({y:.23}));for(const e of[-.3,.3])i.add(new st(.08,.48,.6,1,.02),"#f2c14e",x({x:e,y:.24}));for(let e=0;e<7;e++)i.add(new it(.07,.07,.025,10,1),"#ffd54a",x({x:-.26+e%4*.17,y:.47+(e>3?.03:0),z:-.12+(e>3?.14:0),rx:.2*(e%2)}));const t=new nt,o=new it(.29,.29,.86,16,1,!1,0,Math.PI);o.rotateZ(Math.PI/2),t.add(o,"#b3743f",x({y:0,z:.29}));for(const e of[-.3,.3]){const s=new it(.3,.3,.08,16,1,!1,0,Math.PI);s.rotateZ(Math.PI/2),t.add(s,"#f2c14e",x({x:e,z:.29}))}return t.add(new st(.14,.16,.05,1,.02),"#f2c14e",x({y:.02,z:.6})),{base:i.build(),lid:t.build()}}function Ui(){const i=new nt,t=new U(1,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2);return i.add(t,o=>o.y>-.18?"#ffffff":"#e8604c",x({s:[.55,.42,1.2]})),i.add(new st(.9,.06,.24,1,.02),gs,x({y:-.08})),i.add(new it(.025,.025,1.3,6,1),uo,x({x:.3,y:.1,rz:1.1})),i.build()}function Bi(){const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),o=t.createRadialGradient(32,32,0,32,32,32);return o.addColorStop(0,"#ffffff"),o.addColorStop(.55,"#737373"),o.addColorStop(1,"#000000"),t.fillStyle=o,t.fillRect(0,0,64,64),new Ws(i)}const Hi=`
attribute vec3 color;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`,qi=`
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
`,Xi=`
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
`,Yi=`
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
`,ss=`
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
`,is=`
uniform vec3 uColor;
uniform float uOpacity;
varying float vFlicker;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.2) * uOpacity * vFlicker;
  gl_FragColor = vec4(uColor, a);
}
`,Wo=[{color:"#7fe0a0",deep:"#2f9a63",name:["薄荷","Mint"]},{color:"#ffa0c4",deep:"#d44d86",name:["草莓","Strawberry"]},{color:"#8cc8ff",deep:"#3b78d0",name:["汽水","Soda"]},{color:"#ffd36b",deep:"#d9902a",name:["檸檬","Lemon"]},{color:"#c7a8ff",deep:"#7a52d4",name:["葡萄","Grape"]}];function ji(i,t){const o=new Ce;o.name="island";const e=new Ce;o.add(e);const s=new Gi;s.solid.add(Ri(t.segments),w=>{const S=Math.atan2(w.z,w.x),z=Math.hypot(w.x,w.z)/ht(S),{ramp:W,edge:D,foot:ct}=Lo(S),St=bt(w.x*.6,w.z*.6,2),Et=at("#6fc451","#9ade6c",.45+St*.6+(w.y-1.6)*.35),ye=at("#86d062","#a6e27a",.5+St*.5),eo=Math.sin(w.y*7.5+St*1.5)*.5+.5,Oe=at("#c99260","#a8714a",eo*.75),Ue=at(Wi,"#f0d49a",.5+St),oo=at("#e3c690","#7fb2a9",Q(-.06,-2.6,w.y)),Be=oe(D+.012,ct-.01,W);let It=Et.clone();return It.lerp(ye,Q(D-.05,D,z)*(1-W)),It.lerp(Oe,Q(Be-.004,Be+.01,z)),It.lerp(Ue,Q(ct-.012,ct+.006,z)),It.lerp(oo,Q(.985,1.03,z)),It}),s.house({x:1.7,z:-2.3},-.35,"#ec6a5c","#8f5a3a"),s.house({x:3.35,z:.25},-1.15,"#5b8ef0","#6b4a8f");const n=s.windmillBody({x:ee.x,z:ee.z}),a=["#ff9b3d","#ff7b8f","#f25c54","#ffb347"],r=[[-4.1,1,1],[-1,-4.2,1.05],[.6,-4.4,.85],[4.3,-2.4,.9],[-3.6,-3.6,.95],[-4.6,-1,.8]];r.forEach(([w,S,z],W)=>s.tree({x:w,z:S},z,a[W%a.length]));const u=["#ff8fab","#ffffff","#ffd166","#c9a7ff","#ff6b6b"],c=ae(vo+7),l=[[1.7,-2.3,1.4],[3.35,.25,1.4],[ee.x,ee.z,1.1],[.3,2.05,1.25],[-1.75,1.55,.95],[2.05,1.35,1],...r.map(([w,S])=>[w,S,.9])];let d=0;for(let w=0;w<400&&d<(t.detail==="high"?46:26);w++){const S=c()*Math.PI*2,z=Math.sqrt(c())*.74*ht(S),W=Math.cos(S)*z,D=Math.sin(S)*z;if(l.some(([St,Et,ye])=>(W-St)**2+(D-Et)**2<ye*ye))continue;const ct=1+Math.floor(c()*3);for(let St=0;St<ct;St++)s.flower({x:W+(c()-.5)*.4,z:D+(c()-.5)*.4},u[Math.floor(c()*u.length)]);d++}s.bush({x:.2,z:-2.9},.9),s.bush({x:4.6,z:1.6},.8),s.bush({x:-2.4,z:3.4},.85),s.bush({x:2.6,z:3.1},.7),s.fence({x:-4.2,z:-.1},{x:-3.3,z:.5},3),s.fence({x:-1.2,z:-.5},{x:-.6,z:-1.4},3);const f=[[2.5,5.2],[2,4.4],[1.45,3.65],[.85,3],[.15,2.45],[-.15,1.65],[.25,.85],[.85,.15],[1.3,-.65],[1.55,-1.3],[2.1,-.1],[2.75,.35]];f.forEach(([w,S],z)=>s.stone({x:w,z:S},.9+z%3*.08));const h=[...l,...f.map(([w,S])=>[w,S,.42]),[-.9,3.75,.6],[4.05,3.55,.55],[3,-1.3,.55]],m=2.45,v=-.55;s.palm({x:Math.cos(m)*ht(m)*.9,z:Math.sin(m)*ht(m)*.9},1.05,.9,m),s.palm({x:Math.cos(v)*ht(v)*.9,z:Math.sin(v)*ht(v)*.9},.95,.8,v);for(const[w,S,z]of[[.2,.98,.45],[.35,1.02,.32],[2.9,.99,.5],[3.05,1.03,.36],[4.1,.97,.42],[5.3,1,.55],[5.45,1.04,.33],[1.9,1.01,.3]])s.rock({x:Math.cos(w)*ht(w)*S,z:Math.sin(w)*ht(w)*S},z);const M=3.75;s.lighthouse({x:Math.cos(M)*ht(M)*.78,z:Math.sin(M)*ht(M)*.78});const A=s.pier(co-.05),k=Me(i,{wind:!0,caustics:!0}),_=Me(i,{wind:!1}),G=new H(s.solid.build(!0),k);G.castShadow=!0,G.receiveShadow=!0,o.add(G),_e(G,i,t.outlines,{wind:!0});const R={...jt.clone($t.fog),uNight:i.uNight},B=new H(s.glow.build(),new X({uniforms:R,vertexShader:Hi,fragmentShader:qi,fog:!0}));e.add(B);const L=$i(i,t.detail,h);e.add(L);const E=new vt;E.setAttribute("position",new V(new Float32Array(s.halos),3)),E.setAttribute("aSeed",new V(new Float32Array(s.halos.length/3).map((w,S)=>S*1.37),1));const J=new X({uniforms:{uSize:{value:260},uTime:i.uTime,uColor:{value:new b("#ffc861")},uOpacity:{value:0}},vertexShader:ss,fragmentShader:is,transparent:!0,depthWrite:!1,blending:Xt}),tt=new Yt(E,J);tt.renderOrder=8,e.add(tt);const Nt=t.detail==="high"?36:18,ft=new Float32Array(Nt*3),j=ae(vo+11);for(let w=0;w<Nt;w++){const S=j()*Math.PI*2,z=Math.sqrt(j())*5.5,W=Math.cos(S)*z,D=Math.sin(S)*z;ft.set([W,me(W,D)+.5+j()*1.6,D],w*3)}const et=new vt;et.setAttribute("position",new V(ft,3)),et.setAttribute("aSeed",new V(new Float32Array(Nt).map((w,S)=>S*2.1),1));const gt=new X({uniforms:{uSize:{value:70},uTime:i.uTime,uColor:{value:new b("#d9ff7a")},uOpacity:{value:0}},vertexShader:ss,fragmentShader:is,transparent:!0,depthWrite:!1,blending:Xt}),ut=new Yt(et,gt);ut.userData.base=ft.slice(),ut.renderOrder=8,e.add(ut);const Pt=Bi(),Vt=new Zo({alphaMap:Pt,color:"#1d3b2a",transparent:!0,depthWrite:!1,opacity:.3}),ne=[];for(const w of s.shadows){const S=new Ke(w.r*2,w.r*2);S.rotateX(-Math.PI/2),S.translate(w.x,me(w.x,w.z)+.03,w.z),ne.push(S)}const re=new H(Zi(ne),Vt);re.renderOrder=1,e.add(re);const rt=new H(Li(),_);rt.position.copy(n),rt.castShadow=!0,e.add(rt),_e(rt,i,t.outlines);const Rt=new H(new Ds(1.5,24),new Zo({visible:!1,side:Ae}));Rt.position.copy(n).add(new y(0,0,.06)),e.add(Rt);const Dt=4.05,Y=3.55,yt=new H(Vi(),Me(i,{wind:!1,rim:.5}));yt.position.set(Dt,me(Dt,Y)+.4,Y),yt.castShadow=!0,e.add(yt),_e(yt,i,t.outlines),Po(e,Vt,Dt,Y,.55,.35);const Ot=Oi(),_t=-.9,Zt=3.75,le=me(_t,Zt)-.02,q=new H(Ot.base,_);q.position.set(_t,le,Zt),q.rotation.y=.35,q.castShadow=!0;const wt=new H(Ot.lid,_);wt.position.set(0,.46,-.29),q.add(wt),e.add(q),_e(q,i,t.outlines),_e(wt,i,t.outlines),Po(e,Vt,_t,Zt,.7,.32);const $=new H(Ui(),Me(i,{wind:!1,side:Ae}));_e($,i,t.outlines),$.position.set(A.x+Math.cos(co+Math.PI/2)*1.1,.05,A.z+Math.sin(co+Math.PI/2)*1.1),$.rotation.y=A.yaw+.25,o.add($);const dt=[],pt=(w,S,z,W,D=0)=>(w.group.position.set(S,me(S,z)-.02,z),w.group.scale.setScalar(W),w.group.rotation.y=D,e.add(w.group),Po(e,Vt,S,z,.95*W,.32),dt.push(w),w),zt=t.outlines,Ut=pt(new Xe("slime",Wo[0],i,{face:!0,seed:1,outlines:zt}),.3,2.05,.78);pt(new Xe("slime",{color:"#ffa0c4",deep:"#d44d86"},i,{face:!0,seed:2,outlines:zt}),-1.75,1.55,.55),pt(new Xe("slime",{color:"#8cc8ff",deep:"#3b78d0"},i,{face:!0,seed:3,outlines:zt}),2.05,1.35,.6);const lt=4.35;pt(new Xe("cube",{color:"#ffd36b",deep:"#e0862e"},i,{seed:4,outlines:zt}),Math.cos(lt)*ht(lt)*.9,Math.sin(lt)*ht(lt)*.9,.42,.5),pt(new Xe("pudding",{color:"#ffe08a",deep:"#e3a33f",top:"#8a4b20"},i,{seed:5,outlines:zt}),3,-1.3,.42);const Z=new Uint8Array(256);for(let w=0;w<256;w++){const S=(w/256-.5)*Math.PI*2;Z[w]=Math.round(se((ht(S)-5.5)/3)*255)}const ot=new xo(Z,256,1,cs,bo);ot.wrapS=hs,ot.magFilter=ie,ot.minFilter=ie,ot.needsUpdate=!0,s.foamRings.push({x:$.position.x,z:$.position.z,r:0,sx:.5,sz:1.08,yaw:$.rotation.y});const xt=Ei(i,ot,s.foamRings,t.detail),Ct=xt.mesh,ce=xt.uniforms;o.add(Ct);const Re=new nt;Re.add(Di(t.detail==="high"?128:72),(w,S)=>{const z=bt(w.x*.35+w.y*.2,w.z*.35-w.y*.15,3),W=-w.y;let D=at("#7d9ea6","#55707f",Q(4,40,W));return D.lerp(at("#b9b393","#7f8c7a",Q(6,40,W)),Q(.3,.8,S.y)*.55),z<-.42&&(D=D.lerp(new b("#5fa88a"),.35)),D});const De=new H(Re.build(),Me(i,{wind:!1,rim:.12,caustics:!0,rock:!0}));o.add(De);const ge=9,Bt=s.chimneys.length*ge,ue=new Float32Array(Bt*3),Kt=new Float32Array(Bt);for(let w=0;w<Bt;w++)Kt[w]=w%ge/ge;const Wt=new vt;Wt.setAttribute("position",new V(ue,3)),Wt.setAttribute("aAge",new V(Kt,1)),Wt.setAttribute("aSeed",new V(new Float32Array(Bt).map((w,S)=>S*.618034%1),1));const Te=new X({uniforms:{uScale:{value:1},uNight:i.uNight,uSunDir:i.uSunDir},vertexShader:Xi,fragmentShader:Yi,transparent:!0,depthWrite:!1}),he=new Yt(Wt,Te);he.frustumCulled=!1,he.renderOrder=7,e.add(he);const We=[],kt=Me(i,{wind:!1,rim:.4,emissive:"#5c6f80",emissiveIntensity:.25}),Ie=new U(.12,10,8);Ie.scale(1.7,.75,.75);const Ge=new U(.5,10,6);Ge.scale(.35,.05,1),Ge.translate(0,0,.42);const Qt=new nt;Qt.add(Ie,"#ffffff"),Qt.add(new pe(.035,.12,6),"#f2b84b",x({x:.24,rz:-Math.PI/2}));const Je=Qt.build(),Le=new nt().add(Ge,w=>w.z>.7?"#4a5866":"#ffffff").build();for(let w=0;w<3;w++){const S=new Ce,z=new H(Je,kt),W=new H(Le,kt),D=new H(Le,kt);D.scale.z=-1,S.add(z,W,D),S.scale.setScalar(.9+w*.12),e.add(S),We.push({group:S,left:W,right:D,radius:9+w*2.2,height:6.5+w*1.3,speed:.22+w*.05,phase:w*2.1})}const Ve=(w,S)=>{for(let z=0;z<Bt;z++){const W=s.chimneys[Math.floor(z/ge)];let D=Kt[z]+w*.22;D>1&&(D-=1),Kt[z]=D;const ct=D*D;ue[z*3]=W.x+ct*1.1+Math.sin(S*.8+z)*.08*D,ue[z*3+1]=W.y+D*2.1,ue[z*3+2]=W.z+ct*.5}Wt.getAttribute("position").needsUpdate=!0,Wt.getAttribute("aAge").needsUpdate=!0;for(const z of We){const W=S*z.speed+z.phase;z.group.position.set(Math.cos(W)*z.radius,z.height+Math.sin(S*.9+z.phase)*.4,Math.sin(W)*z.radius),z.group.rotation.set(0,-W-Math.PI/2+Math.PI,Math.sin(S*.6+z.phase)*.15-.18);const D=Math.sin(S*7+z.phase*3)*.55;z.left.rotation.x=-D,z.right.rotation.x=D}},to=w=>{let S=null,z=1/0;for(const W of dt){const D=W.hit(w);D&&D.distance<z&&(z=D.distance,S={kind:"jelly",jelly:W,point:D.point.clone()})}for(const[W,D]of[["blades",Rt],["ball",yt],["chest",q]]){const ct=w.intersectObject(D,!0)[0];ct&&ct.distance<z&&(z=ct.distance,S={kind:W,point:ct.point.clone()})}if(S){const W=w.intersectObject(G,!1)[0];if(W&&W.distance+.05<z)return null}return S};return{group:o,top:e,column:De,sea:Ct,seaUniforms:ce,jellies:dt,hero:Ut,blades:rt,ball:yt,boat:$,halos:tt,fireflies:ut,animate:Ve,ripple:xt.ripple,seaSparkles:xt.sparkles,seaSparkleUniforms:xt.sparkleUniforms,chest:{base:q,lid:wt,open:!1,angle:0,velocity:0},bladeHub:n,pierEnd:A,materials:{solid:k},hitInteractive:to,dispose:()=>{o.traverse(w=>{const S=w;S.geometry&&S.geometry.dispose();const z=S.material;Array.isArray(z)?z.forEach(W=>W.dispose?.()):z?.dispose?.()}),ot.dispose(),Pt.dispose(),xt.dispose()}}}function $i(i,t,o){const e=new nt,s=ae(vo+23);for(let h=0;h<6;h++){const m=.15+s()*.13,v=new Ke(.06,m,1,3),M=v.getAttribute("position");for(let _=0;_<M.count;_++){const G=M.getY(_)+m/2,R=G/m;M.setXYZ(_,M.getX(_)*(1-R*.92),G,.08*R*R)}const A=h/6*Math.PI*2+s()*.6,k=.18+s()*.22;e.add(v,_=>at("#46963d","#a8e679",se(_.y/.26)),x({x:Math.cos(A)*.06,z:Math.sin(A)*.06,ry:A,rx:k}),_=>se(_.y/.26))}const n=e.build(!0),a=n.getAttribute("normal");for(let h=0;h<a.count;h++)a.setXYZ(h,0,1,0);const r=new ls({vertexColors:!0,gradientMap:Me(i).gradientMap,side:Ae});r.onBeforeCompile=h=>{h.uniforms.uTime=i.uTime,h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
attribute float aExtra;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec2 grassAt = vec2(0.0);
        #ifdef USE_INSTANCING
          grassAt = instanceMatrix[3].xz;
        #endif
        float grassPhase = grassAt.x * 0.8 + grassAt.y * 0.55;
        float gust = 0.55 + 0.45 * sin(uTime * 0.7 + grassAt.x * 0.25);
        transformed.x += sin(uTime * 1.9 + grassPhase) * 0.07 * aExtra * gust;
        transformed.z += cos(uTime * 1.5 + grassPhase * 1.2) * 0.05 * aExtra * gust;`)},r.customProgramCacheKey=()=>"l3d-grass";const u=t==="high"?1300:600,c=new $e(n,r,u),l=new ds,d=new b;let f=0;for(let h=0;h<u*5&&f<u;h++){const m=s()*Math.PI*2,{edge:v,foot:M,ramp:A}=Lo(m),k=oe(v-.03,M-.03,A),_=Math.sqrt(s())*k*ht(m),G=Math.cos(m)*_,R=Math.sin(m)*_;o.some(([B,L,E])=>(G-B)**2+(R-L)**2<E*E)||(l.position.set(G,me(G,R)-.02,R),l.rotation.set(0,s()*Math.PI*2,0),l.scale.setScalar(.7+s()*.6),l.updateMatrix(),c.setMatrixAt(f,l.matrix),c.setColorAt(f,d.setRGB(.88+s()*.2,.92+s()*.14,.88+s()*.16)),f++)}return c.count=f,c.receiveShadow=!0,c}function Po(i,t,o,e,s,n){const a=new Ke(s*2,s*2);a.rotateX(-Math.PI/2);const r=new H(a,t.clone());r.material.opacity=n,r.position.set(o,me(o,e)+.035,e),r.renderOrder=1,i.add(r)}function Zi(i){const t=new nt;i.forEach(n=>t.add(n,"#000000"));const o=t.build(),e=o.getAttribute("position").count,s=new Float32Array(e*2);for(let n=0;n<e;n+=4)s.set([0,1,1,1,0,0,1,0],n*2);return o.setAttribute("uv",new V(s,2)),o}function ys(i){return 9.9+Math.max(0,-3.2-i)*.115+1.1}const go=-.55,yo=-1.6,ws=-51,Ki=i=>i<.5?2*i*i:1-(-2*i+2)**2/2;function ze(i,t=new y,o=new y){const e=Math.min(1,Math.max(0,i)),s=yo+(ws-yo)*Ki(e),n=go+1.75*e,a=ys(s)+8.2+2.2*e;t.set(Math.sin(n)*a,s,Math.cos(n)*a);const r=Math.cos(n),u=-Math.sin(n),c=-Math.sin(n),l=-Math.cos(n),d=9+3*e,f=3.4-1.6*e;return o.set(t.x+r*d+c*f,s-2.2-3.2*e*e,t.z+u*d+l*f),{position:t,target:o}}function ke(i,t,o,e){const{position:s,target:n}=ze(i),a=n.clone().sub(s).setY(0).normalize(),r=new y(-a.z,0,a.x);return s.clone().addScaledVector(a,t).addScaledVector(r,o).setY(s.y+e)}const Ee=2048,Se=2.1;class wo{mesh;count;pos;vel;scale;fear;cellOf;cellStart=new Int32Array(Ee+1);fill=new Int32Array(Ee);sorted;goal=new y;options;phase;m=new Qe;fwd=new y;side=new y;upv=new y;at=new y;static UP=new y(0,1,0);constructor(t,o,e){this.options=e,this.count=e.count;const s=ae(e.seed);this.phase=s()*10;const n=t.clone(),a=new Float32Array(this.count);this.mesh=new $e(n,o,this.count),this.mesh.frustumCulled=!1,this.pos=new Float32Array(this.count*3),this.vel=new Float32Array(this.count*3),this.scale=new Float32Array(this.count),this.fear=new Float32Array(this.count),this.cellOf=new Int32Array(this.count),this.sorted=new Int32Array(this.count);const r=new b,{home:u}=e;for(let c=0;c<this.count;c++){const l=s()*Math.PI*2,d=Math.cbrt(s())*3.2;this.pos.set([u.x+Math.cos(l)*d,u.y+(s()-.5)*2.2,u.z+Math.sin(l)*d],c*3),this.vel.set([1.8+s()*.4,0,(s()-.5)*.6],c*3),this.scale[c]=e.size*(.8+s()*.4),a[c]=s()*20,r.set(e.colors[Math.floor(s()*e.colors.length)]).offsetHSL((s()-.5)*.03,0,(s()-.5)*.08),this.mesh.setColorAt(c,r)}n.setAttribute("aPhase",new Io(a,1))}hash(t,o,e){const s=Math.floor(t/Se),n=Math.floor(o/Se),a=Math.floor(e/Se);return(s*73856093^n*19349663^a*83492791)>>>0&Ee-1}bucket(){const t=this.cellStart;t.fill(0);for(let e=0;e<this.count;e++){const s=e*3,n=this.hash(this.pos[s],this.pos[s+1],this.pos[s+2]);this.cellOf[e]=n,t[n+1]++}for(let e=0;e<Ee;e++)t[e+1]+=t[e];const o=this.fill;o.set(t.subarray(0,Ee));for(let e=0;e<this.count;e++)this.sorted[o[this.cellOf[e]]++]=e}update(t,o,e){t=Math.min(t,1/24);const s=this.options,n=o*.14+this.phase;this.goal.set(s.home.x+Math.sin(n)*s.roam,s.home.y+Math.sin(n*1.9+1)*s.lift,s.home.z+Math.sin(n*2)*s.roam*.55),this.bucket();const a=Se,r=a*a,u=.95*.95,c=Math.cbrt(this.count)*.75;for(let l=0;l<this.count;l++){const d=l*3,f=this.pos[d],h=this.pos[d+1],m=this.pos[d+2];let v=0,M=0,A=0,k=0,_=0,G=0,R=0,B=0,L=0,E=0;const J=Math.floor(f/Se),tt=Math.floor(h/Se),Nt=Math.floor(m/Se);for(let q=-1;q<=1;q++)for(let wt=-1;wt<=1;wt++)for(let $=-1;$<=1;$++){const dt=((J+q)*73856093^(tt+wt)*19349663^(Nt+$)*83492791)>>>0&Ee-1;for(let pt=this.cellStart[dt],zt=this.cellStart[dt+1];pt<zt;pt++){const Ut=this.sorted[pt];if(Ut===l)continue;const lt=Ut*3,Z=this.pos[lt]-f,ot=this.pos[lt+1]-h,xt=this.pos[lt+2]-m,Ct=Z*Z+ot*ot+xt*xt;if(!(Ct>r)){if(v+=Z,M+=ot,A+=xt,k+=this.vel[lt],_+=this.vel[lt+1],G+=this.vel[lt+2],E++,Ct<u){const ce=1/Math.max(Ct,.01);R-=Z*ce,B-=ot*ce,L-=xt*ce}if(E>14)break}}}let ft=this.vel[d],j=this.vel[d+1],et=this.vel[d+2],gt=0,ut=0,Pt=0;E&&(gt+=v/E*.3+(k/E-ft)*1.1,ut+=M/E*.3+(_/E-j)*1.1,Pt+=A/E*.3+(G/E-et)*1.1),gt+=R*.45,ut+=B*.45,Pt+=L*.45;const Vt=this.goal.x-f,ne=this.goal.y-h,re=this.goal.z-m,rt=Math.hypot(Vt,ne,re)||1,Rt=Math.min(2.6,Math.max(0,rt-c)*.35+.35);gt+=Vt/rt*Rt,ut+=ne/rt*Rt,Pt+=re/rt*Rt;let Dt=this.fear[l]*Math.exp(-t*1.6);if(e&&e.strength>0){const q=f-e.origin.x,wt=h-e.origin.y,$=m-e.origin.z,dt=q*e.dir.x+wt*e.dir.y+$*e.dir.z;if(dt>0){const pt=q-e.dir.x*dt,zt=wt-e.dir.y*dt,Ut=$-e.dir.z*dt,lt=Math.hypot(pt,zt,Ut),Z=2.4+dt*.06;if(lt<Z){const ot=(1-lt/Z)*16*e.strength/Math.max(lt,.25);gt+=pt*ot,ut+=zt*ot*.7,Pt+=Ut*ot,Dt=Math.max(Dt,(1-lt/Z)*e.strength)}}}this.fear[l]=Dt;const Y=s.floor(f,m)+.7;h<Y+.4&&(ut+=(Y+.4-h)*7),h>s.ceiling&&(ut-=(h-s.ceiling)*5);const yt=Math.hypot(f,m),Ot=s.column(Math.atan2(m,f),h)+1.3;if(yt<Ot){const q=(Ot-yt)*6/Math.max(yt,.5);gt+=f*q,Pt+=m*q}ft+=gt*t*2.4,j+=ut*t*2.4,et+=Pt*t*2.4,j*=Math.exp(-1.4*t);const _t=Math.hypot(ft,j,et)||1,Zt=Math.min(Math.max(_t,1.5),3.1+Dt*5);ft*=Zt/_t,j*=Zt/_t,et*=Zt/_t,this.vel[d]=ft,this.vel[d+1]=j,this.vel[d+2]=et,this.pos[d]=f+ft*t,this.pos[d+1]=Math.max(Y-.3,h+j*t),this.pos[d+2]=m+et*t,this.fwd.set(ft,j*.55,et).normalize(),this.side.crossVectors(this.fwd,wo.UP).normalize(),this.upv.crossVectors(this.side,this.fwd);const le=this.scale[l];this.m.makeBasis(this.fwd.multiplyScalar(le),this.upv.multiplyScalar(le),this.side.multiplyScalar(le)),this.m.setPosition(this.at.set(this.pos[d],this.pos[d+1],this.pos[d+2])),this.mesh.setMatrixAt(l,this.m)}this.mesh.instanceMatrix.needsUpdate=!0}stats(t){t.set(0,0,0);for(let e=0;e<this.count;e++)t.add(this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]));t.multiplyScalar(1/Math.max(1,this.count));let o=0;for(let e=0;e<this.count;e++)o+=this.at.set(this.pos[e*3],this.pos[e*3+1],this.pos[e*3+2]).distanceTo(t);return{center:t,spread:o/Math.max(1,this.count)}}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}const Qi=`
uniform float uTime;
uniform float uDelta;
uniform vec4 uCenter[2];
uniform vec4 uShape[2];
uniform vec3 uScareOrigin;
uniform vec3 uScareDir;
uniform float uScare;
uniform vec4 uPredator;
${ve}
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
`,Ji=`
uniform float uDelta;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 P = texture2D(texturePosition, uv);
  vec4 V = texture2D(textureVelocity, uv);
  gl_FragColor = vec4(P.xyz + V.xyz * uDelta, P.w);
}
`,ta=`
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
`,ea=`
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
`;function oa(){const i=[-.5,-.36,-.16,.06,.24,.38,.47],t=[.03,.075,.115,.13,.115,.085,.045],o=[.018,.036,.05,.056,.05,.038,.022],e=6,s=[],n=[];i.forEach((f,h)=>{for(let m=0;m<e;m++){const v=m/e*Math.PI*2+Math.PI/2;s.push(f,Math.sin(v)*t[h],Math.cos(v)*o[h])}});for(let f=0;f<i.length-1;f++)for(let h=0;h<e;h++){const m=f*e+h,v=f*e+(h+1)%e,M=(f+1)*e+h,A=(f+1)*e+(h+1)%e;n.push(m,M,v,v,M,A)}const a=s.length/3;s.push(.53,0,0);const r=(i.length-1)*e;for(let f=0;f<e;f++)n.push(r+f,a,r+(f+1)%e);const u=s.length/3;s.push(-.52,0,0);for(let f=0;f<e;f++)n.push(f,(f+1)%e,u);const c=s.length/3;s.push(-.48,0,0,-.74,.15,0,-.66,0,0,-.74,-.15,0),n.push(c,c+1,c+2,c,c+2,c+3,c,c+2,c+1,c,c+3,c+2);const l=s.length/3;s.push(.02,.12,0,-.14,.2,0,-.18,.1,0),n.push(l,l+1,l+2,l,l+2,l+1);const d=new vt;return d.setAttribute("position",new V(new Float32Array(s),3)),d.setIndex(n),d.computeVertexNormals(),d}class sa{constructor(t,o,e,s,n){this.renderer=t,this.clusters=n.slice(0,2);const a=this.clusters.map(m=>Math.max(1,Math.round(m.count/s))),r=a.reduce((m,v)=>m+v,0);this.gpu=new Is(s,r,t),this.gpu.setDataType(Gs);const u=this.gpu.createTexture(),c=this.gpu.createTexture();for(this.fill(u,c,s,a),this.velocity=this.gpu.addVariable("textureVelocity",Qi,c),this.position=this.gpu.addVariable("texturePosition",Ji,u),this.gpu.setVariableDependencies(this.velocity,[this.velocity,this.position]),this.gpu.setVariableDependencies(this.position,[this.velocity,this.position]),this.centers=this.clusters.map(m=>new Ne(m.center.x,m.center.y,m.center.z,m.radius)),this.homes=this.clusters.map(m=>m.center.clone());this.centers.length<2;)this.centers.push(new Ne(0,-999,0,1));const l=this.clusters.map(m=>new Ne(m.height,m.shape,m.speed,0));for(;l.length<2;)l.push(new Ne(1,0,1,0));Object.assign(this.velocity.material.uniforms,{uTime:{value:0},uDelta:{value:0},uCenter:{value:this.centers},uShape:{value:l},uScareOrigin:{value:new y},uScareDir:{value:new y(0,0,-1)},uScare:{value:0},uPredator:{value:new Ne(0,0,0,0)}}),Object.assign(this.position.material.uniforms,{uDelta:{value:0}});const d=this.gpu.init();if(d)throw new Error(d);const f=oa();this.geometries.push(f);let h=0;this.clusters.forEach((m,v)=>{const M=a[v],A=M*s,k=new Float32Array(A*2);for(let E=0;E<A;E++)k[E*2]=(E%s+.5)/s,k[E*2+1]=(h+Math.floor(E/s)+.5)/r;h+=M;const _=new Ls;_.index=f.index,_.setAttribute("position",f.getAttribute("position")),_.setAttribute("normal",f.getAttribute("normal")),_.setAttribute("aRef",new Io(k,2)),_.instanceCount=A,this.geometries.push(_);const G=(m.palette&&m.palette.length?m.palette:[m.back]).slice(0,4),R=[0,1,2,3].map(E=>new b(G[E%G.length])),B=new X({uniforms:{...jt.clone($t.fog),tPosition:{value:null},tVelocity:{value:null},uTime:o.uTime,uSize:{value:m.size},uPalette:{value:R},uPaletteCount:{value:G.length},uSunDir:o.uSunDir,uLight:e,uSkyColor:o.uSkyColor,uGroundColor:o.uGroundColor,uSideColor:{value:new b(m.side)},uBellyColor:{value:new b(m.belly)},uFlash:{value:m.flash},uCaustic:{value:0},uGlow:o.uGlow,uNight:o.uNight},vertexShader:ta,fragmentShader:ea,fog:!0});this.materials.push(B);const L=new H(_,B);L.frustumCulled=!1,L.visible=!1,this.meshes.push(L)})}renderer;meshes=[];gpu;velocity;position;clusters;centers;homes;materials=[];fear=[0,0];geometries=[];active=[!1,!1];fill(t,o,e,s){const n=t.image.data,a=o.image.data;let r=1337;const u=()=>(r=r*16807%2147483647,r/2147483647);let c=0;this.clusters.forEach((l,d)=>{for(let f=0;f<s[d]*e;f++){const h=(c*e+f)*4,m=u()*Math.PI*2,v=(u()-.5)*l.height,M=l.shape>.5?1:Math.sqrt(Math.max(.05,1-(2*v/l.height)**2)),A=l.radius*M*(.45+.55*Math.sqrt(u()));n[h]=l.center.x+Math.cos(m)*A,n[h+1]=l.center.y+v,n[h+2]=l.center.z+Math.sin(m)*A,n[h+3]=d,a[h]=-Math.sin(m)*l.speed,a[h+1]=0,a[h+2]=Math.cos(m)*l.speed,a[h+3]=0}c+=s[d]}),t.needsUpdate=!0,o.needsUpdate=!0}update(t,o,e,s,n){if(this.active=e,this.meshes.forEach((l,d)=>{l.visible=!!e[d]}),!e.some(Boolean))return;const a=Math.min(t,1/30);this.clusters.forEach((l,d)=>{const f=this.homes[d],h=l.wander;this.centers[d].set(f.x+Math.sin(o*.07+d*2)*h,f.y+Math.sin(o*.11+d)*h*.3,f.z+Math.cos(o*.05+d*3)*h,l.radius)});const r=this.velocity.material.uniforms;r.uTime.value=o,r.uDelta.value=a,s&&s.strength>0?(r.uScareOrigin.value.copy(s.origin),r.uScareDir.value.copy(s.dir),r.uScare.value=s.strength,this.fear.forEach((l,d)=>{this.fear[d]=Math.max(this.fear[d],s.strength)})):r.uScare.value=0,this.fear.forEach((l,d)=>{this.fear[d]=l*Math.exp(-t*1.3)}),this.position.material.uniforms.uDelta.value=a,this.gpu.compute();const u=this.gpu.getCurrentRenderTarget(this.position).texture,c=this.gpu.getCurrentRenderTarget(this.velocity).texture;for(const l of this.materials)l.uniforms.tPosition.value=u,l.uniforms.tVelocity.value=c,l.uniforms.uCaustic.value=n}setPredator(t,o){this.velocity.material.uniforms.uPredator.value.set(t.x,t.y,t.z,o)}thin(t){this.meshes.forEach(o=>{const e=o.geometry,s=e.getAttribute("aRef").count;e.instanceCount=Math.max(64,Math.round(s*t))})}stats(t,o){const e=this.centers[t]||this.centers[0];o.set(e.x,e.y,e.z);const s=this.clusters[t]||this.clusters[0];return{center:o,spread:s.radius*(.75+this.fear[t]*.8)}}get running(){return this.active.some(Boolean)}dispose(){this.gpu.dispose(),this.materials.forEach(t=>t.dispose()),this.geometries.forEach(t=>t.dispose()),this.renderer}}const ia=`
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
`,aa=`
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
${ve}
${So}
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
`,xs={value:0};function Fe(i,t,o){return new X({uniforms:{...jt.clone($t.fog),uTime:i.uTime,uSunDir:i.uSunDir,uSkyColor:i.uSkyColor,uGroundColor:i.uGroundColor,uGlow:i.uGlow,uLight:t,uWiggle:{value:o.wiggle},uWiggleSpeed:{value:o.speed},uWiggleAxis:{value:o.axis==="y"?1:0},uDots:{value:o.dots?1:0},uDotColor:{value:new b(o.dots||"#ffffff")},uRim:{value:o.rim??.35},uBright:{value:o.bright??0},uCaustic:xs},vertexShader:ia,fragmentShader:aa,fog:!0})}function Mo(i){return i.getAttribute("aPhase")||i.setAttribute("aPhase",new V(new Float32Array(i.getAttribute("position").count),1)),i}function na(){const i=new nt;i.add(new U(1,18,12),e=>e.y<-.25?"#fffbea":"#ffffff",x({s:[.5,.25,.14]}));const t=new pe(.2,.34,4,1);t.rotateZ(Math.PI/2),i.add(t,"#ffffff",x({x:-.58,s:[1,1.15,.22]}));const o=new pe(.1,.24,4,1);i.add(o,"#ffffff",x({x:-.05,y:.24,rz:.5,s:[1,1,.25]}));for(const e of[-1,1])i.add(new U(.045,8,6),"#141420",x({x:.3,y:.05,z:e*.105})),i.add(new U(.016,6,4),"#ffffff",x({x:.32,y:.07,z:e*.142}));return Mo(i.build())}function ra(){const i=new nt;i.add(new U(1,36,22),t=>at("#5b80b8","#e4eef6",Q(-.05,-.55,t.y+t.x*.05)),x({s:[3.3,1.35,1.4]}));for(const t of[-1,1])i.add(new U(1,16,10),"#5276ad",x({x:.6,y:-.75,z:t*1.35,ry:t*.5,rz:-.4,s:[.85,.12,.38]})),i.add(new U(.17,12,10),"#1d2233",x({x:2.25,y:.02,z:t*1.02})),i.add(new U(.06,8,6),"#ffffff",x({x:2.36,y:.1,z:t*1.12})),i.add(new U(.22,12,8),"#f4a6b8",x({x:2,y:-.32,z:t*1.07,s:[1,.45,.6]})),i.add(new U(1,16,10),"#5276ad",x({x:-3.75,y:.1,z:t*.7,ry:t*.55,s:[.85,.1,.55]}));return i.add(new it(.42,.75,1.3,16,2),"#5b80b8",x({x:-2.95,y:.08,rz:Math.PI/2})),Mo(i.build())}function la(){const i=new nt;i.add(new U(1,28,18),e=>at("#4b3a5c","#2a2134",Q(.6,-.6,e.y)),x({s:[1.05,.85,.8]})),i.add(new U(1,20,12,0,Math.PI*2,Math.PI/2,Math.PI/2),"#3a2c48",x({x:.45,y:-.12,s:[.75,.45,.7]}));for(let e=0;e<9;e++){const s=-.9+e/8*1.8,n=new pe(.045,.2,5,1);i.add(n,"#f4f1e6",x({x:.92+Math.cos(s)*.05,y:-.08,z:Math.sin(s)*.52,rz:Math.PI}))}for(const e of[-1,1])i.add(new U(.12,10,8),"#e9f0c8",x({x:.62,y:.38,z:e*.42})),i.add(new U(.06,8,6),"#141420",x({x:.7,y:.4,z:e*.47})),i.add(new pe(.25,.6,4,1),"#3a2c48",x({x:-.2,y:-.1,z:e*.78,rx:e*1.2,s:[1,1,.2]}));const t=new pe(.42,.7,6,1);t.rotateZ(Math.PI/2),i.add(t,"#3a2c48",x({x:-1.25,s:[1,1,.3]}));const o=new fs(.75,.025,6,16,Math.PI*.62);return i.add(o,"#5a4870",x({x:.55,y:.75,rz:.35})),Mo(i.build())}const ca=`
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
`,ua=`
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
`;function ha(){const i=new nt,t=new U(1,32,14,0,Math.PI*2,0,Math.PI*.52),o=t.getAttribute("position");for(let e=0;e<o.count;e++){const s=o.getX(e),n=o.getY(e),a=o.getZ(e),r=1+.07*Math.sin(Math.atan2(a,s)*8)*(1-Math.min(1,n/.35));o.setXYZ(e,s*r,n*.88,a*r)}t.computeVertexNormals(),i.add(t,"#ffffff",new Qe,0);for(let e=0;e<4;e++){const s=e/4*Math.PI*2+Math.PI/4;i.add(new U(.2,12,8),"#ffffff",x({x:Math.cos(s)*.2,y:.45,z:Math.sin(s)*.2,s:[1,.35,.65],ry:-s}),2)}for(let e=0;e<9;e++){const s=e/9*Math.PI*2,n=new it(.014,.006,2.3,4,12,!0);n.translate(0,-1.15,0),i.add(n,"#ffffff",x({x:Math.cos(s)*.74,y:.04,z:Math.sin(s)*.74}),1)}for(let e=0;e<4;e++){const s=e/4*Math.PI*2+.4,n=new it(.07,.02,1.5,5,10,!0);n.translate(0,-.75,0),i.add(n,"#ffffff",x({x:Math.cos(s)*.16,y:.02,z:Math.sin(s)*.16,rx:Math.sin(s)*.12}),1)}return i.build(!0)}const fa=`
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
`,da=`
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
`;function ma(){const t=[],o=[],e=[];for(let n=0;n<=18;n++){const a=n/18,r=.15*(1-a*.5)*(1+.4*Math.sin(a*22));t.push(-r,a,0,r,a,0),o.push(0,0,1,0,0,1)}for(let n=0;n<18;n++){const a=n*2;e.push(a,a+1,a+2,a+1,a+3,a+2)}const s=new vt;return s.setAttribute("position",new V(new Float32Array(t),3)),s.setAttribute("normal",new V(new Float32Array(o),3)),s.setIndex(e),s}const pa=`
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
`,va=`
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
${ve}
${So}
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
`,ga=`
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
`,ya=`
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
`,as=`
uniform float uScale;
attribute float aSize;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uScale / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`,ns=`
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.0, 1.0, d)) * uOpacity;
  gl_FragColor = vec4(uColor, a);
}
`,wa=`
varying vec2 vUv;
varying float vFade;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  // 鏡頭穿過光束的時候淡掉，不會突然一整片白
  vFade = smoothstep(2.5, 7.0, distance(world.xyz, cameraPosition));
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,xa=`
uniform float uOpacity;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
${ve}
void main() {
  // 一道光：兩邊柔柔地淡掉，裡面有幾條順著光的細紋，上面亮、往下慢慢消失
  float edge = smoothstep(0.0, 0.45, vUv.x) * smoothstep(1.0, 0.55, vUv.x);
  float streak = 0.5 + 0.5 * vnoise(vec2(vUv.x * 7.0 + uSeed * 3.0, vUv.y * 1.4 + uTime * 0.1));
  float fall = smoothstep(0.0, 0.92, vUv.y);
  float flicker = 0.72 + 0.28 * sin(uTime * 0.8 + uSeed * 5.0 + vUv.y * 2.4);
  float a = edge * edge * streak * fall * fall * flicker * uOpacity * vFade;
  gl_FragColor = vec4(uColor, a);
}
`,ba=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_Position.z = gl_Position.w;
}
`,Sa=`
uniform vec3 uSunDir;
uniform float uTime;
varying vec3 vDir;
${ve}
${ms}
void main() {
  gl_FragColor = vec4(waterDome(normalize(vDir), uSunDir, uTime), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,Ma=`
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
`,za=`
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = (exp(-d * d * 9.0) + exp(-d * d * 2.2) * 0.35) * vAlpha;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor * 1.6, a);
}
`;function _o(i,t){return Ft+.9*bt(i*.06,t*.06,3)+.18*Math.sin(i*.7+bt(i*.2,t*.2)*3)}function Ca(i,t,o,e=1,s=null){const n=new Ce;n.name="ocean";const a=ae(7781),r=o==="high",u=[],c=new ds,l=new y,d={uWaterGlow:i.uWaterGlow,uWaterFog:i.uWaterFog,uWaterAbyss:i.uWaterAbyss,uWaterRays:i.uWaterRays,uSunDir:i.uSunDir,uTime:i.uTime},f=new H(new U(300,32,18),new X({uniforms:d,vertexShader:ba,fragmentShader:Sa,side:Ze,depthWrite:!1}));f.renderOrder=-10,f.frustumCulled=!1,f.visible=!1,n.add(f),u.push(f.geometry,f.material);const h=[],m=new Ke(1,1);m.translate(0,-.5,0),u.push(m);const v=i.uWaterGlow;for(let p=0;p<(r?16:8);p++){const g=.02+a()*.36,C=ke(g,5+a()*20,(a()-.5)*26,0),T=new X({uniforms:{uOpacity:{value:0},uTime:i.uTime,uSeed:{value:a()*10},uColor:v},vertexShader:wa,fragmentShader:xa,transparent:!0,depthWrite:!1,blending:Xt,side:Ae}),F=new H(m,T);F.position.set(C.x,-.3,C.z),F.rotation.z=(a()-.5)*.3,F.scale.set(.8+a()*2.6,22+a()*16,1),F.userData.strength=.5+a()*.5,F.renderOrder=6,h.push(F),n.add(F),u.push(T)}const M=r?700:320,A=34,k=new Float32Array(M*3),_=new Float32Array(M*3),G=new Float32Array(M);for(let p=0;p<M;p++)_.set([a()*A,a()*A,a()*A],p*3),G[p]=26+a()*46;const R=new vt,B=new V(k,3);B.setUsage(xe),R.setAttribute("position",B),R.setAttribute("aSize",new V(G,1));const L=new X({uniforms:{uScale:{value:1},uColor:{value:new b("#dff7ff")},uOpacity:{value:0}},vertexShader:as,fragmentShader:ns,transparent:!0,depthWrite:!1,blending:Xt}),E=new Yt(R,L);E.frustumCulled=!1,E.renderOrder=7,n.add(E),u.push(R,L);const J=r?1100:480,tt=26,Nt=new Float32Array(J*3),ft=new Float32Array(J*3);for(let p=0;p<J;p++)Nt.set([a()*tt,a()*tt,a()*tt],p*3),ft.set([a(),a(),a()],p*3);const j=new vt;j.setAttribute("position",new V(Nt,3)),j.setAttribute("aSeed",new V(ft,3));const et={uTime:i.uTime,uScale:{value:1},uOpacity:{value:0},uBox:{value:tt},uOrigin:{value:new y},uScareOrigin:{value:new y},uScareDir:{value:new y(0,0,-1)},uScare:{value:0}},gt=new Yt(j,new X({uniforms:et,vertexShader:Ma,fragmentShader:za,transparent:!0,depthWrite:!1,blending:Xt}));gt.frustumCulled=!1,gt.renderOrder=8,n.add(gt),u.push(j,gt.material);const ut=na();u.push(ut);const Pt=[],Vt=(p,g,C,T,F,I)=>{const O=new $e(ut,C,p);O.instanceMatrix.setUsage(xe),O.frustumCulled=!1;const K=new b,fe=new Float32Array(p),Gt=[];for(let N=0;N<p;N++)K.set(g[N%g.length]),O.setColorAt(N,K),fe[N]=a()*20,Gt.push({offset:new y((a()-.5)*F[0],(a()-.5)*F[1],(a()-.5)*F[2]),phase:fe[N],speed:.6+a()*.7,scale:T*(.8+a()*.45)});O.geometry=ut.clone(),O.geometry.setAttribute("aPhase",new Io(fe,1)),u.push(O.geometry),n.add(O);const P={mesh:O,center:I,fish:Gt,previous:Gt.map(()=>new y)};return Pt.push(P),P},ne=Fe(i,t,{wiggle:.09,speed:11}),re=Fe(i,t,{wiggle:.07,speed:9,dots:"#7ff3ff",rim:.2});u.push(ne,re),Vt(r?40:22,["#ffd23f","#3d8bfd","#ff8c42","#ff6fa8","#7be0ff"],ne,.8,[5,3,5],(p,g)=>{const C=p*.12+.3,T=je(C,-6)+3.2;return g.set(Math.sin(C)*T,-6+Math.sin(p*.3)*1.5,Math.cos(C)*T)}),Vt(r?30:16,["#2c3b5c","#33456b"],re,.7,[6,3,6],(p,g)=>{const C=ke(.56,13,-2,0);return g.set(C.x+Math.sin(p*.21)*4,C.y+Math.sin(p*.33)*1.2,C.z+Math.cos(p*.17)*4)});const rt=ze(1).target,Rt=Fe(i,t,{wiggle:.11,speed:14,rim:.4,bright:.34});u.push(Rt);const Dt=p=>Math.max(24,Math.round(p*e));let Y=null;const yt=.28;if(s)try{const p=yo+(ws-yo)*(2*yt*yt),g=go+1.75*yt+.56,C=ys(p)+8.2+2.2*yt+3.2,T=ze(1),F=T.target.clone().sub(T.position).setY(0).normalize(),I=T.target.clone().addScaledVector(F,7).addScaledVector(new y(-F.z,0,F.x),-2.5).setY(Ft+3.6);Y=new sa(s.renderer,i,t,s.width,[{count:s.baitBall,center:new y(Math.sin(g)*C,p-1.2,Math.cos(g)*C),radius:5.2,height:10.5,shape:0,speed:3,size:.44,back:"#24508a",side:"#a8c8e0",belly:"#f1f7ff",flash:1.15,wander:1.2},{count:s.reef,center:I.setY(Ft+5),radius:4.8,height:6.5,shape:0,speed:2.3,size:.44,back:"#2b86e8",side:"#8fe0ff",belly:"#fff6d8",palette:["#2b86e8","#2f9ff0","#1f6fd0","#ffd23f"],flash:.5,wander:1.8}]),Y.meshes.forEach(O=>n.add(O))}catch{Y=null}const Ot=Y?[]:[new wo(ut,Rt,{count:Dt(260),colors:["#3fd0ff","#5ae6ff","#2fa8ff","#8ff3ff"],home:new y(rt.x,Ft+5,rt.z),roam:9,lift:2,size:.42,seed:31,floor:(p,g)=>_o(p,g),column:je,ceiling:Ft+11}),new wo(ut,Rt,{count:Dt(110),colors:["#ffe14d","#ffc83d","#fff27a"],home:new y(rt.x+3,Ft+3.6,rt.z-2),roam:6,lift:1.4,size:.36,seed:57,floor:(p,g)=>_o(p,g),column:je,ceiling:Ft+9})];for(const p of Ot)n.add(p.mesh);const _t=[!1,!1],Zt=new y,le=Fe(i,t,{wiggle:.42,speed:1.6,axis:"y",rim:.25}),q=new H(ra(),le);q.scale.setScalar(1.15),n.add(q),u.push(q.geometry,le);const wt=Y?Y.stats(0,new y).center.clone().add(new y(0,-2.6,0)):ke(.4,15,4,-1.5),$=Y?{x:8.5,z:8.5,speed:.085}:{x:10,z:7,speed:.045},dt=r?8:5,pt=r?7:3,zt=dt+pt,Ut=new X({uniforms:{...jt.clone($t.fog),uTime:i.uTime,uGlow:i.uGlow},vertexShader:ca,fragmentShader:ua,transparent:!0,depthWrite:!1,blending:Xt,side:Ae,fog:!0}),lt=ha(),Z=new $e(lt,Ut,zt);Z.instanceMatrix.setUsage(xe),Z.frustumCulled=!1,Z.renderOrder=7;const ot=["#ffb3dc","#9eeaff","#cdb4ff","#ffd9b0","#b4ffe0"],xt=[];for(let p=0;p<dt;p++){const g=.3+p/dt*.34+a()*.04,C=(p%2?1:-1)*(3.5+a()*6);xt.push({home:ke(g,11+a()*9,C,(a()-.4)*4),scale:.5+a()*.45,phase:a()*10}),Z.setColorAt(p,new b(ot[p%ot.length]))}const Ct=ae(9157);for(let p=0;p<pt;p++){const g=.46+p/pt*.3+Ct()*.03,C=(p%2?-1:1)*(2.5+Ct()*8);xt.push({home:ke(g,8+Ct()*14,C,(Ct()-.5)*5),scale:.32+Ct()*.4,phase:Ct()*10}),Z.setColorAt(dt+p,new b(ot[(p+2)%ot.length]))}n.add(Z),u.push(lt,Ut);const ce=Fe(i,t,{wiggle:.12,speed:3,rim:.05,bright:.06}),Re=la(),De=[],ge=new Float32Array(6);for(let p=0;p<2;p++){const g=new H(Re,ce);g.scale.setScalar(p===0?1.15:.85);const C=ke(.76+p*.07,10+p*3,p?5:-4,p?-1:1);De.push({mesh:g,home:C,phase:p*2.3}),n.add(g)}u.push(Re,ce);const Bt=new vt,ue=new V(ge,3);ue.setUsage(xe),Bt.setAttribute("position",ue),Bt.setAttribute("aSize",new V(new Float32Array([620,460]),1));const Kt=new X({uniforms:{uScale:{value:1},uColor:{value:new b("#fff2a6")},uOpacity:{value:1}},vertexShader:as,fragmentShader:ns,transparent:!0,depthWrite:!1,blending:Xt}),Wt=new Yt(Bt,Kt);Wt.frustumCulled=!1,Wt.renderOrder=8,n.add(Wt),u.push(Bt,Kt);const Te=new Ke(200,200,r?110:70,r?110:70);Te.rotateX(-Math.PI/2);const he=Te.getAttribute("position");for(let p=0;p<he.count;p++){const g=he.getX(p),C=he.getZ(p),T=.9*bt(g*.06,C*.06,3)+.18*Math.sin(g*.7+bt(g*.2,C*.2)*3);he.setY(p,Ft+T)}Te.computeVertexNormals();const We=new nt;We.add(Te,p=>at("#e7cf9a","#b9a57c",.5+bt(p.x*.15,p.z*.15,2)));const kt=new nt,Ie=_o,Ge=[ze(1).position,ze(.93).position,ze(.86).position],Qt=(p,g=6.5)=>{const C=a()*Math.PI*2,T=Math.sqrt(a())*p,F=rt.x+Math.cos(C)*T,I=rt.z+Math.sin(C)*T,O=Math.atan2(I,F);return Math.hypot(F,I)<je(O,Ft+2)+.6||Ge.some(K=>Math.hypot(K.x-F,K.z-I)<g)?null:{x:F,z:I,y:Ie(F,I)}};for(let p=0;p<(r?26:14);p++){const g=Qt(22);if(!g)continue;const C=.4+a()*1.3,T=new U(1,12,9),F=T.getAttribute("position");for(let I=0;I<F.count;I++)l.fromBufferAttribute(F,I),l.multiplyScalar(1+.22*bt(l.x*1.8+p,l.z*1.8+l.y,2)),l.y*=.65,F.setXYZ(I,l.x,l.y,l.z);T.computeVertexNormals(),kt.add(T,(I,O)=>at("#6f8796","#a6b8c2",O.y*.5+.5),x({x:g.x,y:g.y+.1*C,z:g.z,ry:a()*6,s:C}))}const Je=["#ff7f9e","#ff9f5a","#c58bff","#ffd166","#6fe3c1"];for(let p=0;p<(r?30:16);p++){const g=Qt(18);if(!g)continue;const C=Je[p%Je.length],T=p%3;if(T===0)for(let F=0;F<5;F++){const I=new it(.06,.12,.9+a()*.6,6,1);I.translate(0,.45,0),kt.add(I,C,x({x:g.x,y:g.y,z:g.z,rx:(a()-.5)*1.1,rz:(a()-.5)*1.1})),kt.add(new U(.11,8,6),C,x({x:g.x+(a()-.5)*.6,y:g.y+.8+a()*.4,z:g.z+(a()-.5)*.6}))}else if(T===1){const F=.45+a()*.35,I=new U(F,28,14,0,Math.PI*2,0,Math.PI/2),O=I.getAttribute("position");for(let K=0;K<O.count;K++){l.fromBufferAttribute(O,K);const fe=Math.sin(l.x*16+Math.sin(l.z*11)*2.2)*Math.sin(l.z*14+Math.sin(l.x*9)*1.8);l.multiplyScalar(1+.05*fe+.08*bt(l.x*3+p,l.z*3,2)),l.y*=.72,O.setXYZ(K,l.x,l.y,l.z)}I.computeVertexNormals(),kt.add(I,K=>at(C,"#3a2440",Q(.2,-.6,Math.sin(K.x*16+Math.sin(K.z*11)*2.2)*Math.sin(K.z*14+Math.sin(K.x*9)*1.8))*.45),x({x:g.x,y:g.y-.05,z:g.z}))}else{for(let F=0;F<9;F++){const I=F/9*Math.PI*2,O=new it(.035,.06,.55,5,1);O.translate(0,.27,0),kt.add(O,C,x({x:g.x+Math.cos(I)*.12,y:g.y+.1,z:g.z+Math.sin(I)*.12,rx:Math.sin(I)*.5,rz:-Math.cos(I)*.5}))}kt.add(new it(.2,.26,.2,10,1),"#f3e1c5",x({x:g.x,y:g.y+.08,z:g.z}))}}for(let p=0;p<(r?10:5);p++){const g=Qt(15);if(!g)continue;const C=new nt;for(let T=0;T<5;T++){const F=new pe(.11,.42,5,1);F.rotateZ(-Math.PI/2),F.translate(.2,0,0),C.add(F,p%2?"#ff8f6b":"#ffb347",x({ry:T/5*Math.PI*2,s:[1,.45,1]}))}C.add(new U(.12,8,6),p%2?"#ff8f6b":"#ffb347",x({s:[1,.5,1]})),kt.add(C.build(),T=>T.y>.03?"#ffd0b0":p%2?"#ff8f6b":"#ffb347",x({x:g.x,y:g.y+.05,z:g.z,ry:a()*6}))}const Le=new X({uniforms:{...jt.clone($t.fog),uTime:i.uTime,uLight:t,uSkyColor:i.uSkyColor,uGroundColor:i.uGroundColor,uSunDir:i.uSunDir,uGlow:i.uGlow,uNight:i.uNight},vertexShader:pa,fragmentShader:va,fog:!0,defines:r?{CAUSTIC_TWO_LAYERS:""}:{}}),Ve=new H(We.build(),Le),to=Fe(i,t,{wiggle:0,speed:0,rim:.32,bright:.12}),w=new H(Mo(kt.build()),to);n.add(Ve,w),u.push(Ve.geometry,Le,w.geometry,to);const S=r?90:46,z={...jt.clone($t.fog),uTime:i.uTime,uGlow:i.uGlow,uLight:t,uSunDir:i.uSunDir,uBase:{value:new b("#1f4a2e")},uTip:{value:new b("#5fae62")},uGlowTip:{value:new b("#6ff0d6")}},W=new X({uniforms:z,vertexShader:fa,fragmentShader:da,side:Ae,fog:!0}),D=ma(),ct=new $e(D,W,S);let St=0;for(let p=0;p<S*4&&St<S;p++){const g=Qt(26,8);if(!g)continue;const C=4+Math.floor(a()*5);for(let T=0;T<C&&St<S;T++){const F=(a()-.5)*1.6,I=(a()-.5)*1.6;c.position.set(g.x+F,Ie(g.x+F,g.z+I)-.1,g.z+I),c.rotation.set(0,a()*Math.PI,0),c.scale.set(.9+a()*.9,3.5+a()*6.5,1),c.updateMatrix(),ct.setMatrixAt(St++,c.matrix)}}ct.count=St,ct.frustumCulled=!1,n.add(ct),u.push(D,W);const Et=r?380:190,ye=new Float32Array(Et*3),eo=new Float32Array(Et),Oe=new Float32Array(Et),Ue=Array.from({length:Et},()=>({pos:new y,vel:0,wobble:a()*10,life:-1,size:0,burst:!1})),oo=Array.from({length:6},()=>Qt(14)||{x:rt.x,z:rt.z,y:Ft}),Be=p=>{const g=oo[Math.floor(a()*oo.length)];p.pos.set(g.x+(a()-.5)*.5,g.y+.2,g.z+(a()-.5)*.5),p.vel=1.1+a()*1.4,p.size=70+a()*120,p.life=7+a()*6,p.burst=!1};Ue.forEach((p,g)=>{g<Et*.7&&(Be(p),p.pos.y+=a()*12)});const It=new vt,Vo=new V(ye,3).setUsage(xe),Oo=new V(eo,1).setUsage(xe),Uo=new V(Oe,1).setUsage(xe);It.setAttribute("position",Vo),It.setAttribute("aSize",Oo),It.setAttribute("aAlpha",Uo);const zo=new X({uniforms:{uScale:{value:1}},vertexShader:ga,fragmentShader:ya,transparent:!0,depthWrite:!1}),He=new Yt(It,zo);He.frustumCulled=!1,He.renderOrder=9,n.add(He),u.push(It,zo);let Co=0;const bs=(p,g=14)=>{for(let C=0;C<g;C++){const T=Ue[Co];Co=(Co+1)%Et,T.pos.set(p.x+(a()-.5)*.6,p.y+(a()-.5)*.4,p.z+(a()-.5)*.6),T.vel=1.6+a()*2.2,T.size=50+a()*150,T.life=2.6+a()*2.2,T.burst=!0}},Bo=new ho,Ss=new Qe,we=new y,Jt=new y,so=new y,Ho=new y,qo=new y,Ms=new y(1,0,0),Ao=(p,g,C,T)=>(C.lengthSq()<1e-6&&C.set(1,0,0),C.normalize(),Bo.setFromUnitVectors(Ms,C),qo.setScalar(T),p.compose(g,Bo,qo));return{group:n,update:(p,g,C,T,F,I=null)=>{const O=i.uUnder.value,K=i.uNight.value;f.visible=O>.5,f.position.copy(C.position),i.uWaterRays.value=(1-Q(3,30,T))*(1-K*.5);const fe=O*(1-Q(4,26,T))*(1-K*.55);for(const P of h)P.material.uniforms.uOpacity.value=fe*P.userData.strength*.26,P.visible=fe>.01,P.visible&&(l.set(C.position.x-P.position.x,0,C.position.z-P.position.z),P.rotation.y=Math.atan2(l.x,l.z));if(et.uOpacity.value=O*Q(12,30,T)*(.55+K*.45),gt.visible=et.uOpacity.value>.01,gt.visible&&(et.uOrigin.value.copy(C.position).subScalar(tt/2),et.uScale.value=F,I&&I.strength>0&&(et.uScareOrigin.value.copy(I.origin),et.uScareDir.value.copy(I.dir)),et.uScare.value=I?I.strength:0),L.uniforms.uOpacity.value=O*(.25+Q(6,40,T)*.45),L.uniforms.uScale.value=F,E.visible=O>.02,E.visible){const P=C.position.x-A/2,N=C.position.y-A/2,mt=C.position.z-A/2,io=g*.35;for(let At=0;At<M;At++){const Pe=_[At*3],zs=_[At*3+1],Cs=_[At*3+2],As=((Pe-P+Math.sin(g*.2+At)*.3)%A+A)%A+P,Ts=((zs-N-io)%A+A)%A+N,Ps=((Cs-mt)%A+A)%A+mt;k[At*3]=As,k[At*3+1]=Math.min(Ts,-.2),k[At*3+2]=Ps}B.needsUpdate=!0}for(const P of Pt){P.center(g,so);const N=so.distanceTo(C.position)<60;P.mesh.visible=O>.01&&N,P.mesh.visible&&(P.fish.forEach((mt,io)=>{const At=g*mt.speed*.5+mt.phase;Jt.set(Math.sin(At)*mt.offset.x,Math.sin(At*1.3)*mt.offset.y*.5+mt.offset.y,Math.cos(At)*mt.offset.z).add(so);const Pe=P.previous[io];Pe.lengthSq()===0&&(Pe.copy(Jt).x-=.01),we.copy(Jt).sub(Pe),P.center(g+.4,Ho),we.addScaledVector(Ho.sub(so),.25),P.mesh.setMatrixAt(io,Ao(Ss,Jt,we,mt.scale)),Pe.lerp(Jt,.35)}),P.mesh.instanceMatrix.needsUpdate=!0)}{const P=g*$.speed;l.set(wt.x+Math.cos(P)*$.x,wt.y+Math.sin(g*.2)*1.2,wt.z+Math.sin(P)*$.z),we.set(-Math.sin(P)*$.x,Math.cos(g*.2)*.24,Math.cos(P)*$.z),q.matrixAutoUpdate=!1,Ao(q.matrix,l,we,1.15),q.visible=O>.01&&T>4&&T<44,Y?.setPredator(l,q.visible?5.6:0)}for(let P=0;P<zt;P++){const N=xt[P],mt=Math.sin(g*.21+N.phase)*1.6+Math.sin(g*.37+N.phase*1.7)*.5;c.position.set(N.home.x+Math.sin(g*.2+N.phase)*1.2,N.home.y+mt,N.home.z+Math.cos(g*.17+N.phase)*1.2),c.rotation.set(Math.sin(g*.3+N.phase)*.18,g*.1,Math.cos(g*.27+N.phase)*.18),c.scale.setScalar(N.scale),c.updateMatrix(),Z.setMatrixAt(P,c.matrix)}Z.instanceMatrix.needsUpdate=!0,Z.visible=O>.01&&T>6,De.forEach((P,N)=>{const mt=g*.12+P.phase;l.set(P.home.x+Math.cos(mt)*2.5,P.home.y+Math.sin(g*.5+P.phase)*.6,P.home.z+Math.sin(mt)*2.5),we.set(-Math.sin(mt),.05,Math.cos(mt)),P.mesh.matrixAutoUpdate=!1,Ao(P.mesh.matrix,l,we,P.mesh.scale.x),P.mesh.visible=O>.01&&T>22,Jt.set(1.12,1.18,0).applyMatrix4(P.mesh.matrix),ge.set([Jt.x,Jt.y,Jt.z],N*3)}),ue.needsUpdate=!0,Kt.uniforms.uOpacity.value=(.65+.35*Math.sin(g*3.1)*Math.sin(g*1.7))*Q(20,30,T),Kt.uniforms.uScale.value=F,Wt.visible=T>20;const Gt=T>30;Ve.visible=Gt,w.visible=Gt,ct.visible=Gt;for(const P of Ot)P.mesh.visible=Gt,Gt&&P.update(p,g,I);if(xs.value=O*(1-Q(6,30,T)*.8)*(1-K*.6)*.32,Y&&(_t[0]=O>.01&&T>2&&T<34&&Y.stats(0,Zt).center.distanceTo(C.position)<48,_t[1]=O>.01&&Gt,Y.update(p,g,_t,I,O*(1-Q(6,26,T))*(1-K*.7)*.6)),He.visible=O>.01,zo.uniforms.uScale.value=F,He.visible){for(let P=0;P<Et;P++){const N=Ue[P];if(N.life<=0)if(!N.burst&&P<Et*.75&&Gt)Be(N);else{Oe[P]=0;continue}N.life-=p,N.pos.y+=N.vel*p,N.pos.x+=Math.sin(g*2.2+N.wobble)*.25*p,N.pos.z+=Math.cos(g*1.9+N.wobble)*.25*p,N.pos.y>-.3&&(N.life=0),ye.set([N.pos.x,N.pos.y,N.pos.z],P*3),eo[P]=N.size,Oe[P]=Math.min(1,N.life*1.5)*(N.burst?1:.85)}Vo.needsUpdate=!0,Oo.needsUpdate=!0,Uo.needsUpdate=!0}},burst:bs,setTheme:p=>{z.uTip.value.set(p?"#3f8f5b":"#5fae62"),z.uBase.value.set(p?"#163a26":"#1f4a2e")},swarmStats:p=>Y?Y.stats(1,p):Ot[0].stats(p),thinSchool:p=>Y?.thin(p),dispose:()=>{u.forEach(p=>p.dispose()),Ot.forEach(p=>p.dispose()),Y?.dispose()}}}function zr(){try{if((navigator.deviceMemory??8)<2)return!1;const o=document.createElement("canvas").getContext("webgl2");return o?(o.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}let Ye=null;function rs(){if(Ye!==null)return Ye;try{const t=document.createElement("canvas").getContext("webgl2");Ye=!!t?.getExtension("EXT_color_buffer_float"),t?.getExtension("WEBGL_lose_context")?.loseContext()}catch{Ye=!1}return Ye}function Aa(){const i=navigator,t=i.deviceMemory??8,o=i.hardwareConcurrency??8,e=window.matchMedia("(pointer: coarse)").matches;return t<=2||o<=2?"low":e||t<=4||o<=4?"medium":"high"}const ko={high:{dpr:1.6,antialias:!0,shadow:2048,detail:"high",segments:168,frameMs:0,bloom:!0,swarm:1,school:{width:128,baitBall:10240,reef:1536}},medium:{dpr:1.5,antialias:!0,shadow:1024,detail:"low",segments:120,frameMs:0,bloom:!1,swarm:.5,school:{width:64,baitBall:3584,reef:640}},low:{dpr:1,antialias:!1,shadow:0,detail:"low",segments:96,frameMs:1e3/32,bloom:!1,swarm:.3,school:null}},Ta=`
uniform float uScale;
attribute float aAlpha;
varying float vAlpha;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 120.0 * uScale / -mvPosition.z;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * mvPosition;
}
`,Pa=`
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float star = max(1.0 - smoothstep(0.0, 0.06, abs(c.x)) * 1.0, 0.0) * (1.0 - smoothstep(0.0, 0.5, abs(c.y)));
  star = max(star, (1.0 - smoothstep(0.0, 0.06, abs(c.y))) * (1.0 - smoothstep(0.0, 0.5, abs(c.x))));
  float glow = 1.0 - smoothstep(0.0, 0.5, length(c));
  float a = (star * 0.9 + glow * glow * 0.6) * vAlpha;
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.45), a);
}
`,Eo=i=>i*i*(3-2*i),_a=new y(Math.sin(go)*18.5,-.7,Math.cos(go)*18.5),ka=new y(0,-2.2,0),de=i=>Math.min(1,Math.max(0,i));class Cr{options;renderer;scene=new Vs;camera=new Os(36,1,.1,900);env=ti();hemi=new Us("#cfeeff","#a5cf7f",1.2);sun=new Bs("#fff0d4",2.2);fog=new Hs("#d3effa",.0055);depthLight={value:new b("#bff3ff")};outlines=di();post=null;island;ocean;sky;sparkles;sparkleState=[];raycaster=new qs;pointer=new Lt;tier;theme;night=0;nightTarget=0;frame=0;frameCount=0;frameTimes=0;lastTime=0;lastRender=0;elapsed=0;running=!1;destroyed=!1;pixelRatio=1;width=1;height=1;camPos=new y(0,12,26);camTarget=new y(0,1.3,0);posed=!1;yaw=-.18;yawVel=0;idleFor=0;bladeVel=.8;ballSpin=new y;drag=null;heroLook=0;played=!1;hoverQueued=null;slowFrames=0;sampledFrames=0;downgraded=0;dprSteps=0;lastCalls=0;thinned=!1;resizeObserver;cleanups=[];scrollY=0;heroHeight=1;scrollRange=1;depth=0;framingKey="";scratchVectors=Array.from({length:6},()=>new y);scratchColors=[new b,new b];below={fog:new b,glow:new b,abyss:new b,density:0,hemi:0,light:new b};worldPos=new y;spin=new ho;spinAxis=new y;scare={origin:new y,dir:new y,strength:0};scareAt=-10;swarmProbe=new y;slot=null;swell={height:0,slopeX:0,slopeZ:0};ripplePoint=new y;lastRipple={t:-10,at:new y};constructor(t){this.options=t,this.theme=t.theme,this.night=this.nightTarget=t.theme==="dark"?1:0,this.tier=t.tier||Aa();const o=ko[this.tier],e=o.bloom&&rs();if(this.renderer=new Xs({canvas:t.canvas,antialias:o.antialias&&!e,alpha:!1,powerPreference:this.tier==="high"?"high-performance":"default",stencil:!1}),this.renderer.toneMapping=Ys,this.renderer.info.autoReset=!1,this.renderer.toneMappingExposure=1.02,o.shadow){this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=js,this.sun.castShadow=!0,this.sun.shadow.mapSize.set(o.shadow,o.shadow);const l=this.sun.shadow.camera;l.left=-10,l.right=10,l.top=10,l.bottom=-10,l.near=1,l.far=60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=3}this.scene.fog=this.fog,this.scene.background=new b("#d3effa"),this.scene.add(this.hemi,this.sun,this.sun.target),this.sky=bi(this.env,o.detail),this.island=ji(this.env,{segments:o.segments,detail:o.detail,outlines:this.outlines});const s=o.school&&rs()&&this.renderer.capabilities.maxVertexTextures>0?{renderer:this.renderer,...o.school}:null;this.ocean=Ca(this.env,this.depthLight,o.detail,o.swarm,s),this.scene.add(this.sky.group,this.island.group,this.ocean.group,this.island.seaSparkles),this.island.group.rotation.y=this.yaw;const n=18,a=new vt;a.setAttribute("position",new V(new Float32Array(n*3),3)),a.setAttribute("aAlpha",new V(new Float32Array(n),1)),this.sparkles=new Yt(a,new X({uniforms:{uScale:{value:1}},vertexShader:Ta,fragmentShader:Pa,transparent:!0,depthWrite:!1,blending:Xt})),this.sparkles.frustumCulled=!1,this.sparkles.renderOrder=10;for(let l=0;l<n;l++)this.sparkleState.push({pos:new y,vel:new y,life:0});if(this.island.top.add(this.sparkles),this.applyTheme(!0),e)try{this.post=new Js(this.renderer,{rays:!0})}catch{this.post=null}t.canvas.dataset.tier=this.tier,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t.canvas),t.islandSlot&&this.resizeObserver.observe(t.islandSlot),this.resize(),this.readScroll();const r=()=>this.readScroll();t.scroller.addEventListener("scroll",r,{passive:!0}),this.cleanups.push(()=>t.scroller.removeEventListener("scroll",r));const u=()=>{document.hidden?this.stop():this.start()};document.addEventListener("visibilitychange",u),this.cleanups.push(()=>document.removeEventListener("visibilitychange",u));const c=l=>{l.preventDefault(),this.stop(),t.onFallback?.("context-lost")};t.canvas.addEventListener("webglcontextlost",c),this.cleanups.push(()=>t.canvas.removeEventListener("webglcontextlost",c)),this.bindPointer(),this.start()}setTheme(t){this.theme=t,this.nightTarget=t==="dark"?1:0,this.applyTheme(!1)}cycleHeroLook(){return this.heroLook=(this.heroLook+1)%Wo.length,this.island.hero.setLook(Wo[this.heroLook]),this.island.hero.poke(!0),this.options.onHeroLook?.(this.heroLook),this.heroLook}destroy(){this.destroyed||(this.destroyed=!0,this.stop(),this.resizeObserver.disconnect(),this.cleanups.forEach(t=>t()),this.island.jellies.forEach(t=>t.dispose()),this.island.dispose(),this.ocean.dispose(),this.sky.dispose(),this.sparkles.geometry.dispose(),this.sparkles.material.dispose(),this.post?.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss())}start(){if(this.running||this.destroyed||document.hidden)return;this.running=!0,this.lastTime=performance.now();const t=o=>{if(!this.running)return;this.frame=requestAnimationFrame(t);const e=ko[this.tier].frameMs;if(e&&o-this.lastRender<e-1)return;const s=Math.min(.05,Math.max(.001,(o-this.lastTime)/1e3));this.lastTime=o,this.lastRender=o,this.tick(s),this.watchSpeed(s)};this.frame=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.frame)}watchSpeed(t){document.hidden||this.options.adaptive===!1||(this.sampledFrames++,!(this.sampledFrames<30)&&(t>.045?this.slowFrames++:this.slowFrames=Math.max(0,this.slowFrames-.25),!(this.slowFrames<24)&&(this.slowFrames=0,this.downgraded++,this.post?(this.post.dispose(),this.post=null):this.thinned?this.dprSteps<2?(this.dprSteps++,this.pixelRatio=Math.max(.7,this.pixelRatio*.78),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.outlines.uResolution.value.set(this.width*this.pixelRatio,this.height*this.pixelRatio),this.outlines.uWidth.value=(this.width<700?1.25:1.6)*this.pixelRatio):this.renderer.shadowMap.enabled?(this.renderer.shadowMap.enabled=!1,this.sun.castShadow=!1):(this.stop(),this.options.onFallback?.("slow")):(this.thinned=!0,this.ocean.thinSchool(.5)))))}resize(){const t=this.options.canvas,o=Math.max(1,t.clientWidth),e=Math.max(1,t.clientHeight);this.width=o,this.height=e,this.downgraded||(this.pixelRatio=Math.min(window.devicePixelRatio||1,ko[this.tier].dpr)),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(o,e,!1),this.post?.setSize(o,e,this.pixelRatio),this.outlines.uResolution.value.set(o*this.pixelRatio,e*this.pixelRatio),this.outlines.uWidth.value=(o<700?1.25:1.6)*this.pixelRatio,this.framingKey="",this.measureSlot(),this.readScroll()}measureSlot(){const t=this.options.islandSlot;if(!t){this.slot=null;return}const o=t.getBoundingClientRect(),e=this.options.canvas.getBoundingClientRect(),s=this.options.root.getBoundingClientRect();if(o.width<10||o.height<10){this.slot=null;return}this.slot={cx:o.left-e.left+o.width/2,cy:o.top-s.top+o.height/2,w:o.width,h:o.height},this.framingKey=""}heroFraming(){const t=this.width,o=this.height,e=t/o,s=e<.8?46:e<1.2?40:34,n=this.slot||{cx:t/2,cy:o*.62,w:t*.9,h:o*.6},a=Math.max(70,Math.min(n.w*.66,n.h*.84)),r=Math.min(90,Math.max(16,10*(o/2)/(a*Math.tan(s*Math.PI/360))));return{fov:s,px:n.cx,py:n.cy,radius:r,elevation:Zs(t,o)==="wide"?.175:.4}}applyFraming(t){const o=this.width,e=this.height,s=this.heroFraming(),n=o/2+(s.px-o/2)*t,a=e/2+(s.py-e/2)*t,r=`${o}x${e}:${n.toFixed(1)}:${a.toFixed(1)}:${s.fov}`;if(r===this.framingKey)return;this.framingKey=r;const u=n>=o/2?2*n:2*(o-n),c=n>=o/2?0:u-o,l=a>=e/2?2*a:2*(e-a),d=a>=e/2?0:l-e,f=Math.tan(s.fov*Math.PI/360);this.camera.fov=Math.atan(f*(l/e))*360/Math.PI,this.camera.aspect=u/l,Math.abs(u-o)>.5||Math.abs(l-e)>.5?this.camera.setViewOffset(u,l,c,d,o,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix()}readScroll(){const{scroller:t,root:o,hero:e}=this.options,s=o.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;this.scrollY=Math.max(0,t.scrollTop-s),this.heroHeight=Math.max(1,e.offsetHeight),this.scrollRange=Math.max(this.heroHeight+1,o.scrollHeight-t.clientHeight)}heroPose(t,o){const{radius:e,elevation:s}=this.heroFraming();t.set(0,Math.sin(s)*e+1,Math.cos(s)*e),o.set(0,1,0)}desiredPose(t,o){const e=this.heroHeight*.9,s=de(this.scrollY/e),n=de((this.scrollY-e)/Math.max(1,this.scrollRange-e)),[a,r,u,c]=this.scratchVectors;this.heroPose(a,r);const l=Eo(s);if(t.lerpVectors(a,_a,l),o.lerpVectors(r,ka,l),n>0){ze(n,u,c);const d=Eo(de(n/.12));t.lerp(u,d),o.lerp(c,d)}return{a:s,d:n}}tick(t){this.renderer.info.reset(),this.elapsed+=t;const o=this.elapsed;this.env.uTime.value=o,Math.abs(this.night-this.nightTarget)>.001&&(this.night+=(this.nightTarget-this.night)*(1-Math.exp(-t*4)),this.applyTheme(!1));const e=this.scratchVectors[4],s=this.scratchVectors[5],{a:n,d:a}=this.desiredPose(e,s);this.applyFraming(1-Eo(de(n*1.15))),this.posed||(this.camPos.copy(e),this.camTarget.copy(s),this.posed=!0);const r=1-Math.exp(-t*6.5);this.camPos.lerp(e,r),this.camTarget.lerp(s,r),this.camera.position.copy(this.camPos);const u=this.camPos.distanceTo(this.camTarget)*.0016;this.camera.position.x+=Math.sin(o*.37)*u,this.camera.position.y+=Math.sin(o*.53+1.3)*u*.7,this.camera.lookAt(this.camTarget);const c=this.camera.position.y,l=de((.25-c)/.6);this.depth=Math.max(0,-c),this.env.uUnder.value=l,this.env.uDepth.value=this.depth,this.env.uGlow.value=de((this.depth-14)/26)*(.55+this.night*.45),this.applyDepth(l),this.idleFor+=t,(!this.drag||this.drag.kind!=="turn")&&(this.yawVel*=Math.exp(-t*2.4),this.idleFor>5&&n<.4&&(this.yawVel+=(.045-this.yawVel)*(1-Math.exp(-t*.6))),this.yaw+=this.yawVel*t),this.island.group.rotation.y=this.yaw;const d=c>-.35;this.island.top.visible=d,this.island.boat.visible=d,this.island.sea.visible=c>-30,this.island.seaSparkles.visible=c>.05,this.island.seaSparkleUniforms.uScale.value=this.pixelRatio*Math.min(1.4,this.height/800),this.island.column.visible=c<4,this.sky.group.visible=l<.999,this.renderer.shadowMap.autoUpdate=c>-2,d&&this.updateIsland(t,o),this.scare.strength=de(1-(o-this.scareAt)/.9),this.ocean.update(t,o,this.camera,this.depth,this.pixelRatio*this.height/800,this.scare.strength>0?this.scare:null),this.sky.clouds.rotation.y=o*.006;const f=this.options.canvas;if(this.frameCount++,this.frameTimes+=t,this.frameCount%60===0&&(f.dataset.ms=(this.frameTimes/60*1e3).toFixed(1),f.dataset.calls=String(this.lastCalls),this.frameTimes=0),this.frameCount%30===2&&d&&(f.dataset.targets=JSON.stringify(this.screenTargets())),this.frameCount%10===1&&this.depth>30){const h=this.ocean.swarmStats(this.swarmProbe),m=f.getBoundingClientRect(),v=this.swarmProbe.clone().project(this.camera);f.dataset.swarm=JSON.stringify({x:Math.round(m.left+(v.x+1)/2*m.width),y:Math.round(m.top+(1-v.y)/2*m.height),spread:Number(h.spread.toFixed(2))})}if(this.frameCount%10===1){f.dataset.depth=this.depth.toFixed(1),f.dataset.scare=this.scare.strength.toFixed(2),f.dataset.dive=a.toFixed(3),f.dataset.hero=n.toFixed(3);const h=this.options.depthLabel;if(h?.parentElement?.classList.toggle("is-visible",this.depth>.4),h&&this.options.depthText){const m=this.options.depthText(Math.round(this.depth*18));h.textContent!==m&&(h.textContent=m)}}if(this.post?(this.post.bloom.strength=.3+this.env.uGlow.value*.45+this.night*.12,this.post.rays=this.post.setLight(this.env.uSunDir.value,this.camera)*(1-this.env.uUnder.value)*.9,this.post.render(this.scene,this.camera,1)):this.renderer.render(this.scene,this.camera),this.lastCalls=this.renderer.info.render.calls,f.dataset.ready||(f.dataset.ready="1",this.options.onReady?.()),this.hoverQueued){const{x:h,y:m,target:v}=this.hoverQueued;this.hoverQueued=null,this.updateHover(h,m,v)}}updateIsland(t,o){const e=this.island,s=this.worldPos;for(const h of e.jellies){if(h.update(t,o),!h.face)continue;h.group.getWorldPosition(s);let v=Math.atan2(this.camera.position.x-s.x,this.camera.position.z-s.z)-this.yaw-h.group.rotation.y;v=Math.atan2(Math.sin(v),Math.cos(v)),h.group.rotation.y+=v*(1-Math.exp(-t*3))}if((!this.drag||this.drag.kind!=="blades")&&(this.bladeVel+=(.7-this.bladeVel)*(1-Math.exp(-t*.5)),e.blades.rotation.z-=this.bladeVel*t),this.ballSpin.lengthSq()>1e-6){const h=this.ballSpin.length()*t,m=this.spin.setFromAxisAngle(this.spinAxis.copy(this.ballSpin).normalize(),h);e.ball.quaternion.premultiply(m),this.ballSpin.multiplyScalar(Math.exp(-t*.9))}const n=e.chest,a=n.open?-1.95:0;n.velocity+=((a-n.angle)*70-n.velocity*9)*t,n.angle+=n.velocity*t,n.lid.rotation.x=n.angle,e.animate(t,o);const r=e.boat;r.getWorldPosition(s);const u=Pi(s.x,s.z,o,.72,this.swell);if(r.position.y=.17+u.height+Math.sin(o*1.3)*.015,r.rotation.z=-u.slopeX*.55+Math.sin(o*1.1)*.025,r.rotation.x=u.slopeZ*.55+Math.sin(o*.9+1)*.02,this.env.uNight.value>.02){const h=e.fireflies.geometry.getAttribute("position"),m=e.fireflies.userData.base;for(let v=0;v<h.count;v++)h.setXYZ(v,m[v*3]+Math.sin(o*.6+v)*.5,m[v*3+1]+Math.sin(o*.9+v*1.7)*.3,m[v*3+2]+Math.cos(o*.5+v*.7)*.5);h.needsUpdate=!0}const l=this.sparkles.geometry.getAttribute("position"),d=this.sparkles.geometry.getAttribute("aAlpha");let f=!1;this.sparkleState.forEach((h,m)=>{if(h.life<=0){d.setX(m,0);return}f=!0,h.life-=t,h.vel.y-=1.4*t,h.pos.addScaledVector(h.vel,t),l.setXYZ(m,h.pos.x,h.pos.y,h.pos.z),d.setX(m,Math.min(1,h.life*1.6))}),f&&(l.needsUpdate=!0,d.needsUpdate=!0),this.sparkles.material.uniforms.uScale.value=this.pixelRatio*this.height/800,e.top.children.forEach(h=>{const m=h.material;m?.uniforms?.uScale&&h!==this.sparkles&&(m.uniforms.uScale.value=this.pixelRatio*this.height/800)})}applyTheme(t){t&&(this.night=this.nightTarget);const o=this.night,e=(u,c)=>new b(u).lerp(new b(c),o),s=ao.light,n=ao.dark;this.sky.uniforms.uTop.value.copy(e(s.skyTop,n.skyTop)),this.sky.uniforms.uHorizon.value.copy(e(s.skyHorizon,n.skyHorizon)),this.sky.uniforms.uHaze.value.copy(e(s.haze,n.haze)),this.env.uSunDir.value.copy(s.sunDir).lerp(n.sunDir,o).normalize(),this.env.uNight.value=o;const a=this.island.seaUniforms;a.uShallow.value.copy(e(s.seaShallow,n.seaShallow)),a.uMid.value.copy(e(s.seaMid,n.seaMid)),a.uDeep.value.copy(e(s.seaDeep,n.seaDeep)),a.uFoam.value.copy(e(s.foam,n.foam)),a.uSand.value.copy(e(s.sand,n.sand));const r=this.sky.cloudUniforms;r.uLit.value.copy(e(s.cloudLit,n.cloudLit)),r.uMid.value.copy(e(s.cloudMid,n.cloudMid)),r.uShade.value.copy(e(s.cloudShade,n.cloudShade)),this.sky.starUniforms.uOpacity.value=o,this.island.halos.material.uniforms.uOpacity.value=o*.9,this.island.fireflies.material.uniforms.uOpacity.value=o,this.ocean.setTheme(this.theme==="dark"),this.sky.clouds.visible=!0,Fo.strength.value=.42*(1-o*.72)}applyDepth(t){const o=this.night,e=ao.light,s=ao.dark,n=oi(this.theme,this.depth,this.below),[a,r]=this.scratchColors;this.fog.color.copy(a.set(e.fog).lerp(r.set(s.fog),o)).lerp(n.fog,t),this.env.uWaterGlow.value.copy(n.glow),this.env.uWaterFog.value.copy(n.fog),this.env.uWaterAbyss.value.copy(n.abyss),this.fog.density=(e.fogDensity+(s.fogDensity-e.fogDensity)*o)*(1-t)+n.density*t,this.scene.background.copy(this.fog.color);const u=this.hemi.color.copy(a.set(e.hemiSky).lerp(r.set(s.hemiSky),o)).lerp(n.light,t),c=this.hemi.groundColor.copy(a.set(e.hemiGround).lerp(r.set(s.hemiGround),o)).lerp(n.fog,t),l=(e.hemiIntensity+(s.hemiIntensity-e.hemiIntensity)*o)*(1-t)+n.hemi*t;this.hemi.intensity=l;const d=(e.sunIntensity+(s.sunIntensity-e.sunIntensity)*o)*(1-t*de(.35+this.depth/24));this.sun.intensity=d,this.sun.color.copy(a.set(e.sunColor).lerp(r.set(s.sunColor),o)).lerp(n.light,t),this.sun.position.copy(this.env.uSunDir.value).multiplyScalar(30),this.sun.target.position.set(0,0,0),this.env.uSunColor.value.copy(this.sun.color).multiplyScalar(d/2.2),this.env.uSkyColor.value.copy(u).multiplyScalar(l),this.env.uGroundColor.value.copy(c).multiplyScalar(l),this.depthLight.value.copy(n.light).multiplyScalar(.55+.45*(1-t*.6)),t<.5&&this.depthLight.value.copy(this.sun.color).multiplyScalar(d/2.2)}isSurface(t){return t instanceof HTMLElement&&t.closest("[data-island-surface]")===t?t:null}setPointer(t,o){const e=this.options.canvas.getBoundingClientRect();this.pointer.set((t-e.left)/e.width*2-1,-((o-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}hitAt(t,o){return this.camera.position.y<-.4||!this.island.top.visible?null:(this.setPointer(t,o),this.island.hitInteractive(this.raycaster))}markPlayed(){this.played||(this.played=!0,this.options.onPlayed?.())}bindPointer(){const{root:t}=this.options,o=a=>{if(a.touches.length!==1||!this.isSurface(a.target))return;const u=a.touches[0],c=this.hitAt(u.clientX,u.clientY);c&&c.kind!=="chest"&&a.preventDefault()};t.addEventListener("touchstart",o,{passive:!1}),this.cleanups.push(()=>t.removeEventListener("touchstart",o));const e=a=>{if(a.button!==0||this.drag)return;const r=this.isSurface(a.target);if(!r)return;const u=new Lt(a.clientX,a.clientY),c={pointerId:a.pointerId,moved:0,start:u,surface:r},l=this.hitAt(a.clientX,a.clientY);if(this.idleFor=0,l?.kind==="jelly"){const d=this.camera.getWorldDirection(new y).negate(),f=new $s().setFromNormalAndCoplanarPoint(d,l.point);l.jelly.grab(l.jelly.front.worldToLocal(l.point.clone())),this.drag={kind:"jelly",jelly:l.jelly,plane:f,...c}}else if(l?.kind==="blades"){const d=this.island.bladeHub.clone();this.island.top.localToWorld(d),d.project(this.camera);const f=this.options.canvas.getBoundingClientRect(),h=new Lt(f.left+(d.x+1)/2*f.width,f.top+(1-d.y)/2*f.height);this.drag={kind:"blades",hub:h,angle:Math.atan2(a.clientY-h.y,a.clientX-h.x),...c},this.bladeVel=0}else if(l?.kind==="ball")this.drag={kind:"ball",last:u.clone(),...c};else if(l?.kind==="chest")this.drag={kind:"chest",...c};else if(this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6)this.drag={kind:"turn",last:u.clone(),...c},this.yawVel=0,this.lastRipple.t=-10,this.touchWater(a.clientX,a.clientY,1);else if(this.camera.position.y<=-.4)this.scareFish(a.clientX,a.clientY),this.drag={kind:"water",...c};else return;try{r.setPointerCapture(a.pointerId)}catch{}this.drag.kind!=="chest"&&this.drag.kind!=="water"&&(r.style.cursor="grabbing")},s=a=>{const r=this.drag;if((!r||r.kind==="water"||r.kind==="turn")&&this.isSurface(a.target)&&this.touchWater(a.clientX,a.clientY,r?.kind==="turn"?.8:.45),!r||r.kind==="water"){const u=this.isSurface(a.target);if(u&&this.camera.position.y<-.4&&this.scareFish(a.clientX,a.clientY),r)return;u&&a.pointerType==="mouse"&&(this.hoverQueued={x:a.clientX,y:a.clientY,target:u});return}if(a.pointerId===r.pointerId){if(r.moved=Math.max(r.moved,Math.hypot(a.clientX-r.start.x,a.clientY-r.start.y)),r.kind==="jelly"){this.setPointer(a.clientX,a.clientY);const u=new y;this.raycaster.ray.intersectPlane(r.plane,u)&&(r.jelly.dragTo(r.jelly.front.worldToLocal(u)),r.moved>6&&this.markPlayed())}else if(r.kind==="blades"){const u=Math.atan2(a.clientY-r.hub.y,a.clientX-r.hub.x);let c=u-r.angle;c=Math.atan2(Math.sin(c),Math.cos(c)),r.angle=u,this.island.blades.rotation.z-=c,this.bladeVel=this.bladeVel*.6+c/(1/60)*.4,r.moved>6&&this.markPlayed()}else if(r.kind==="ball"){const u=a.clientX-r.last.x,c=a.clientY-r.last.y;r.last.set(a.clientX,a.clientY);const l=new y().setFromMatrixColumn(this.camera.matrixWorld,0),f=new y().setFromMatrixColumn(this.camera.matrixWorld,1).multiplyScalar(u).add(l.multiplyScalar(c)),h=new ho().setFromAxisAngle(new y(0,1,0),-this.yaw);f.applyQuaternion(h),this.ballSpin.lerp(f.multiplyScalar(.45),.5),r.moved>6&&this.markPlayed()}else if(r.kind==="turn"){const u=a.clientX-r.last.x;r.last.set(a.clientX,a.clientY);const c=u/Math.max(320,this.width)*4.2;this.yaw+=c,this.yawVel=this.yawVel*.5+c/(1/60)*.5,r.moved>10&&this.markPlayed()}}},n=a=>{const r=this.drag;if(!r||a.pointerId!==r.pointerId)return;this.drag=null,r.surface.style.cursor="";try{r.surface.releasePointerCapture(a.pointerId)}catch{}const u=r.moved<8&&a.type==="pointerup";if(r.kind==="jelly")r.jelly.release(),u&&(r.jelly===this.island.hero?this.cycleHeroLook():r.jelly.poke(!0),this.markPlayed());else if(r.kind==="chest"&&u){const c=this.island.chest;c.open=!c.open,c.open&&this.spawnSparkles(),this.markPlayed()}else if(r.kind==="water"&&u){this.setPointer(a.clientX,a.clientY);const c=this.raycaster.ray.at(7,new y);c.y=Math.min(c.y,-.6),this.ocean.burst(c,16),this.markPlayed()}this.idleFor=0};t.addEventListener("pointerdown",e),t.addEventListener("pointermove",s),t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n),this.cleanups.push(()=>{t.removeEventListener("pointerdown",e),t.removeEventListener("pointermove",s),t.removeEventListener("pointerup",n),t.removeEventListener("pointercancel",n)})}updateHover(t,o,e){if(this.drag)return;const s=this.hitAt(t,o),n=s?s.kind==="chest"||s.kind==="jelly"&&s.jelly===this.island.hero?"pointer":"grab":this.camera.position.y>-.4&&this.scrollY<this.heroHeight*.6?"grab":"";e.style.cursor!==n&&(e.style.cursor=n)}touchWater(t,o,e){if(this.camera.position.y<.3||this.scrollY>this.heroHeight*.9)return;this.setPointer(t,o);const s=this.raycaster.ray;if(s.direction.y>-.02)return;const n=-s.origin.y/s.direction.y,a=this.ripplePoint.copy(s.origin).addScaledVector(s.direction,n);if(Math.hypot(a.x,a.z)<7.2)return;const r=this.elapsed;r-this.lastRipple.t<.12&&a.distanceTo(this.lastRipple.at)<1.2||(this.lastRipple.t=r,this.lastRipple.at.copy(a),this.island.ripple(a.x,a.z,e))}scareFish(t,o){this.setPointer(t,o),this.scare.origin.copy(this.raycaster.ray.origin),this.scare.dir.copy(this.raycaster.ray.direction),this.scareAt=this.elapsed}screenTargets(){const t=this.options.canvas.getBoundingClientRect(),o=n=>(n.project(this.camera),[Math.round(t.left+(n.x+1)/2*t.width),Math.round(t.top+(1-n.y)/2*t.height)]),e=this.island,s=n=>n.front.localToWorld(new y(0,n.height*.55,.3));return{hero:o(s(e.hero)),jellies:e.jellies.map(n=>o(s(n))),blades:o(e.top.localToWorld(e.bladeHub.clone().add(new y(0,.75,.05)))),ball:o(e.ball.getWorldPosition(new y)),chest:o(e.chest.base.localToWorld(new y(0,.3,.2))),chestOpen:e.chest.open,yaw:Number(this.yaw.toFixed(3)),blade:Number(e.blades.rotation.z.toFixed(3))}}spawnSparkles(){const o=this.island.chest.base.position.clone().add(new y(0,.6,0));this.sparkleState.forEach(e=>{e.pos.copy(o),e.vel.set((Math.random()-.5)*2.2,2.2+Math.random()*1.8,(Math.random()-.5)*2.2),e.life=.9+Math.random()*.7})}}export{Cr as IslandDive,zr as canRunIslandDive,Aa as pickDiveTier,rs as supportsFloatTargets};
