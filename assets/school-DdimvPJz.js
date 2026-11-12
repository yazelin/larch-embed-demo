import{bf as V,aB as _,a1 as x,V as w,ad as M,ae as W,C as P,d as F,U as R,e as E,c as A,a as G,b as N}from"./three-engine-DBk0tA82.js";const I=`
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
`,H=`
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
`,Y=`
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
`,q=`
uniform float uTime;
uniform float uDelta;
uniform vec4 uCenter[2];
uniform vec4 uShape[2];
uniform vec3 uScareOrigin;
uniform vec3 uScareDir;
uniform float uScare;
uniform vec4 uPredator;
${I}
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
`,B=`
uniform float uDelta;
uniform vec3 uJump[2];
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 P = texture2D(texturePosition, uv);
  vec4 V = texture2D(textureVelocity, uv);
  gl_FragColor = vec4(P.xyz + V.xyz * uDelta + (int(P.w + 0.5) == 0 ? uJump[0] : uJump[1]), P.w);
}
`,L=`
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
`,O=`
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
`;function k(){const S=[-.5,-.36,-.16,.06,.24,.38,.47],i=[.03,.075,.115,.13,.115,.085,.045],r=[.018,.036,.05,.056,.05,.038,.022],e=6,t=[],h=[];S.forEach((s,n)=>{for(let a=0;a<e;a++){const p=a/e*Math.PI*2+Math.PI/2;t.push(s,Math.sin(p)*i[n],Math.cos(p)*r[n])}});for(let s=0;s<S.length-1;s++)for(let n=0;n<e;n++){const a=s*e+n,p=s*e+(n+1)%e,g=(s+1)*e+n,d=(s+1)*e+(n+1)%e;h.push(a,g,p,p,g,d)}const c=t.length/3;t.push(.53,0,0);const f=(S.length-1)*e;for(let s=0;s<e;s++)h.push(f+s,c,f+(s+1)%e);const v=t.length/3;t.push(-.52,0,0);for(let s=0;s<e;s++)h.push(s,(s+1)%e,v);const u=t.length/3;t.push(-.48,0,0,-.74,.15,0,-.66,0,0,-.74,-.15,0),h.push(u,u+1,u+2,u,u+2,u+3,u,u+2,u+1,u,u+3,u+2);const o=t.length/3;t.push(.02,.12,0,-.14,.2,0,-.18,.1,0),h.push(o,o+1,o+2,o,o+2,o+1);const l=new G;return l.setAttribute("position",new N(new Float32Array(t),3)),l.setIndex(h),l.computeVertexNormals(),l}class J{constructor(i,r,e,t,h){this.renderer=i,this.clusters=h.slice(0,2);const c=this.clusters.map(a=>Math.max(1,Math.round(a.count/t))),f=c.reduce((a,p)=>a+p,0);this.gpu=new V(t,f,i),this.gpu.setDataType(_);const v=this.gpu.createTexture(),u=this.gpu.createTexture();for(this.fill(v,u,t,c),this.velocity=this.gpu.addVariable("textureVelocity",q,u),this.position=this.gpu.addVariable("texturePosition",B,v),this.gpu.setVariableDependencies(this.velocity,[this.velocity,this.position]),this.gpu.setVariableDependencies(this.position,[this.velocity,this.position]),this.centers=this.clusters.map(a=>new x(a.center.x,a.center.y,a.center.z,a.radius)),this.homes=this.clusters.map(a=>a.center.clone());this.centers.length<2;)this.centers.push(new x(0,-999,0,1));const o=this.clusters.map(a=>new x(a.height,a.shape,a.speed,0));for(;o.length<2;)o.push(new x(1,0,1,0));Object.assign(this.velocity.material.uniforms,{uTime:{value:0},uDelta:{value:0},uCenter:{value:this.centers},uShape:{value:o},uScareOrigin:{value:new w},uScareDir:{value:new w(0,0,-1)},uScare:{value:0},uPredator:{value:new x(0,0,0,0)}}),Object.assign(this.position.material.uniforms,{uDelta:{value:0},uJump:{value:[new w,new w]}}),this.shapes=o;const l=this.gpu.init();if(l)throw new Error(l);const s=k();this.geometries.push(s);let n=0;this.clusters.forEach((a,p)=>{const g=c[p],d=g*t,C=new Float32Array(d*2);for(let m=0;m<d;m++)C[m*2]=(m%t+.5)/t,C[m*2+1]=(n+Math.floor(m/t)+.5)/f;n+=g;const y=new M;y.index=s.index,y.setAttribute("position",s.getAttribute("position")),y.setAttribute("normal",s.getAttribute("normal")),y.setAttribute("aRef",new W(C,2)),y.instanceCount=d,this.geometries.push(y);const z=(a.palette&&a.palette.length?a.palette:[a.back]).slice(0,4),T=[0,1,2,3].map(m=>new P(z[m%z.length])),D=new F({uniforms:{...R.clone(E.fog),tPosition:{value:null},tVelocity:{value:null},uTime:r.uTime,uSize:{value:a.size},uPalette:{value:T},uPaletteCount:{value:z.length},uSunDir:r.uSunDir,uLight:e,uSkyColor:r.uSkyColor,uGroundColor:r.uGroundColor,uSideColor:{value:new P(a.side)},uBellyColor:{value:new P(a.belly)},uFlash:{value:a.flash},uCaustic:{value:0},uGlow:r.uGlow,uNight:r.uNight},vertexShader:L,fragmentShader:O,fog:!0});this.materials.push(D);const b=new A(y,D);b.frustumCulled=!1,b.visible=!1,this.meshes.push(b)})}renderer;meshes=[];gpu;velocity;position;clusters;centers;homes;materials=[];fear=[0,0];shapes=[];geometries=[];active=[!1,!1];fill(i,r,e,t){const h=i.image.data,c=r.image.data;let f=1337;const v=()=>(f=f*16807%2147483647,f/2147483647);let u=0;this.clusters.forEach((o,l)=>{for(let s=0;s<t[l]*e;s++){const n=(u*e+s)*4,a=v()*Math.PI*2,p=(v()-.5)*o.height,g=o.shape>.5?1:Math.sqrt(Math.max(.05,1-(2*p/o.height)**2)),d=o.radius*g*(.45+.55*Math.sqrt(v()));h[n]=o.center.x+Math.cos(a)*d,h[n+1]=o.center.y+p,h[n+2]=o.center.z+Math.sin(a)*d,h[n+3]=l,c[n]=-Math.sin(a)*o.speed,c[n+1]=0,c[n+2]=Math.cos(a)*o.speed,c[n+3]=0}u+=t[l]}),i.needsUpdate=!0,r.needsUpdate=!0}update(i,r,e,t,h){if(this.active=e,this.meshes.forEach((o,l)=>{o.visible=!!e[l]}),!e.some(Boolean))return;const c=Math.min(i,1/30);this.clusters.forEach((o,l)=>{const s=this.homes[l],n=o.wander;this.centers[l].set(s.x+Math.sin(r*.07+l*2)*n,s.y+Math.sin(r*.11+l)*n*.3,s.z+Math.cos(r*.05+l*3)*n,o.radius)});const f=this.velocity.material.uniforms;f.uTime.value=r,f.uDelta.value=c,t&&t.strength>0?(f.uScareOrigin.value.copy(t.origin),f.uScareDir.value.copy(t.dir),f.uScare.value=t.strength,this.fear.forEach((o,l)=>{this.fear[l]=Math.max(this.fear[l],t.strength)})):f.uScare.value=0,this.fear.forEach((o,l)=>{this.fear[l]=o*Math.exp(-i*1.3)}),this.position.material.uniforms.uDelta.value=c,this.gpu.compute();for(const o of this.position.material.uniforms.uJump.value)o.set(0,0,0);const v=this.gpu.getCurrentRenderTarget(this.position).texture,u=this.gpu.getCurrentRenderTarget(this.velocity).texture;for(const o of this.materials)o.uniforms.tPosition.value=v,o.uniforms.tVelocity.value=u,o.uniforms.uCaustic.value=h}moveTo(i,r,e){const t=this.homes[i],h=this.clusters[i];if(!t||!h||(this.position.material.uniforms.uJump.value[i].subVectors(r,t),t.copy(r),!e))return;Object.assign(h,e),this.shapes[i].set(e.height,e.shape,e.speed,0);const c=this.materials[i].uniforms;c.uSize.value=e.size,c.uFlash.value=e.flash,c.uSideColor.value.set(e.side),c.uBellyColor.value.set(e.belly);const f=(e.palette&&e.palette.length?e.palette:[e.back]).slice(0,4);c.uPaletteCount.value=f.length,c.uPalette.value.forEach((v,u)=>v.set(f[u%f.length]))}setPredator(i,r){this.velocity.material.uniforms.uPredator.value.set(i.x,i.y,i.z,r)}thin(i){this.meshes.forEach(r=>{const e=r.geometry,t=e.getAttribute("aRef").count;e.instanceCount=Math.max(64,Math.round(t*i))})}stats(i,r){const e=this.centers[i]||this.centers[0];r.set(e.x,e.y,e.z);const t=this.clusters[i]||this.clusters[0];return{center:r,spread:t.radius*(.75+this.fear[i]*.8)}}get running(){return this.active.some(Boolean)}dispose(){this.gpu.dispose(),this.materials.forEach(i=>i.dispose()),this.geometries.forEach(i=>i.dispose()),this.renderer}}export{H as C,J as G,I as N,Y as W};
