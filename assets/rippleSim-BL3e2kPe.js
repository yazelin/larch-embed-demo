import{S as M,aC as D,k as c,az as y,aJ as z,a9 as g,aA as T,aw as b,Z as A,_ as S,av as F,d as U,a1 as w,a as _,b as W,c as E,C as B}from"./three-engine-DBk0tA82.js";const f=8;function X(d){const t=d.getContext();return typeof WebGL2RenderingContext>"u"||!(t instanceof WebGL2RenderingContext)?!1:d.extensions.has("EXT_color_buffer_float")||d.extensions.has("EXT_color_buffer_half_float")}const P=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,G=`
uniform sampler2D uPrev;
uniform sampler2D uWall;
uniform vec2 uTexel;
uniform float uK;
uniform float uDamp;
uniform vec4 uRect;
uniform vec2 uShift;
uniform vec4 uDropA[${f}];
uniform vec2 uDropB[${f}];
uniform int uDropCount;
varying vec2 vUv;

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * h);
}

vec4 cell(vec2 uv) {
  // 平移時新露出來的那一圈是平靜的水
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return vec4(0.0);
  return texture2D(uPrev, uv);
}

void main() {
  vec2 uv = vUv + uShift;
  vec4 info = cell(uv);
  float avg = (cell(uv - vec2(uTexel.x, 0.0)).r + cell(uv + vec2(uTexel.x, 0.0)).r + cell(uv - vec2(0.0, uTexel.y)).r + cell(uv + vec2(0.0, uTexel.y)).r) * 0.25;
  info.g += (avg - info.r) * uK;
  info.g *= uDamp;
  info.r += info.g;
  info.r *= 0.9985;
  vec2 p = uRect.xy + (vUv * 2.0 - 1.0) * uRect.z;
  for (int i = 0; i < ${f}; i++) {
    if (i >= uDropCount) break;
    vec4 a = uDropA[i];
    vec2 b = uDropB[i];
    float d = segment(p, a.xy, a.zw);
    float drop = max(0.0, 1.0 - d / b.y);
    info.r += (0.5 - cos(drop * 3.14159265) * 0.5) * b.x;
  }
  // 岸、石頭、船身：水在那裡不能動（漣漪撞上去就彈回來）
  info.rg *= 1.0 - texture2D(uWall, vUv).r;
  // 方形的邊緣慢慢吃掉漣漪，不會從看不見的牆反彈回來
  vec2 edge = min(vUv, 1.0 - vUv);
  info.rg *= mix(0.86, 1.0, smoothstep(0.0, 0.09, min(edge.x, edge.y)));
  info.r = clamp(info.r, -1.5, 1.5);
  gl_FragColor = info;
}
`,K=`
uniform sampler2D uRippleMap;
uniform vec4 uRippleRect;
uniform vec2 uRippleTexel;
uniform float uRippleAmp;
vec2 rippleUv(vec2 p) { return (p - uRippleRect.xy) / (2.0 * uRippleRect.z) + 0.5; }
float rippleInside(vec2 p) {
  vec2 uv = rippleUv(p);
  vec2 edge = min(uv, 1.0 - uv);
  return smoothstep(0.0, 0.06, min(edge.x, edge.y));
}
vec3 rippleAt(vec2 p) {
  vec2 uv = rippleUv(p);
  if (uv.x <= 0.0 || uv.y <= 0.0 || uv.x >= 1.0 || uv.y >= 1.0) return vec3(0.0);
  vec2 e = uRippleTexel;
  float h = texture2D(uRippleMap, uv).r;
  float hl = texture2D(uRippleMap, uv - vec2(e.x, 0.0)).r, hr = texture2D(uRippleMap, uv + vec2(e.x, 0.0)).r;
  float hd = texture2D(uRippleMap, uv - vec2(0.0, e.y)).r, hu = texture2D(uRippleMap, uv + vec2(0.0, e.y)).r;
  float cellSize = 2.0 * uRippleRect.z * e.x;
  return vec3(h, (hr - hl) / (2.0 * cellSize), (hu - hd) / (2.0 * cellSize)) * uRippleAmp;
}
`;class j{size;extent;uniforms;strength=1;renderer;targets;index=0;material;scene=new M;camera=new D(-1,1,1,-1,0,1);wall;wallData;drops=[];acc=0;shiftCells=new c;center=new c;at=new c;wallsAt=null;activeFor=0;constructor(t,e){this.renderer=t,this.size=e.size,this.extent=e.extent;const a={type:b,format:T,minFilter:g,magFilter:g,depthBuffer:!1,stencilBuffer:!1,wrapS:z,wrapT:z,generateMipmaps:!1};this.targets=[new y(this.size,this.size,a),new y(this.size,this.size,a)],this.wallData=new Uint8Array(this.size*this.size),this.wall=new A(this.wallData,this.size,this.size,S,F),this.wall.magFilter=g,this.wall.minFilter=g,this.wall.needsUpdate=!0;const s=2*this.extent/this.size,i=e.speed??2.4,n=Math.min(1.9,(2*i*(1/60)/s)**2);this.material=new U({uniforms:{uPrev:{value:null},uWall:{value:this.wall},uTexel:{value:new c(1/this.size,1/this.size)},uK:{value:n},uDamp:{value:e.damping??.988},uRect:{value:new w(0,0,this.extent,0)},uShift:{value:new c},uDropA:{value:Array.from({length:f},()=>new w)},uDropB:{value:Array.from({length:f},()=>new c)},uDropCount:{value:0}},vertexShader:P,fragmentShader:G,depthTest:!1,depthWrite:!1});const r=new _;r.setAttribute("position",new W(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));const u=new E(r,this.material);u.frustumCulled=!1,this.scene.add(u),this.uniforms={uRippleMap:{value:this.targets[0].texture},uRippleRect:{value:new w(0,0,this.extent,0)},uRippleTexel:{value:new c(1/this.size,1/this.size)},uRippleAmp:{value:1}},this.clear()}get cell(){return 2*this.extent/this.size}get active(){return this.activeFor>0}set damping(t){this.material.uniforms.uDamp.value=t}setSpeed(t){this.material.uniforms.uK.value=Math.min(1.9,(2*t*(1/60)/this.cell)**2)}setWalls(t){const e=this.size,a=this.center.x,s=this.center.y,i=this.extent;for(let n=0;n<e;n++)for(let r=0;r<e;r++){const u=a+((r+.5)/e*2-1)*i,p=s+((n+.5)/e*2-1)*i;this.wallData[n*e+r]=Math.round(Math.min(1,Math.max(0,t(u,p)))*255)}(this.wallsAt??=new c).copy(this.at),this.wall.needsUpdate=!0}updateWalls(t){const e=this.size,a=this.wallsAt,s=a?this.at.x-a.x:e,i=a?this.at.y-a.y:e;if(Math.abs(s)>=e||Math.abs(i)>=e){this.setWalls(t);return}if(!s&&!i)return;const n=this.wallData,r=i>0?{start:0,end:e-i,step:1}:{start:e-1,end:-i-1,step:-1};for(let l=r.start;l!==r.end;l+=r.step){const h=l*e,v=(l+i)*e;s>=0?n.copyWithin(h,v+s,v+e):n.copyWithin(h-s,v,v+e+s)}const u=this.center.x,p=this.center.y,o=this.extent,m=(l,h)=>{const v=u+((l+.5)/e*2-1)*o,C=p+((h+.5)/e*2-1)*o;n[h*e+l]=Math.round(Math.min(1,Math.max(0,t(v,C)))*255)},x=i>0?[e-i,e]:[0,-i];for(let l=x[0];l<x[1];l++)for(let h=0;h<e;h++)m(h,l);const R=s>0?[e-s,e]:[0,-s];for(let l=0;l<e;l++)if(!(l>=x[0]&&l<x[1]))for(let h=R[0];h<R[1];h++)m(h,l);this.wallsAt.copy(this.at),this.wall.needsUpdate=!0}get wallArray(){return this.wallData}wallsChanged(){this.wall.needsUpdate=!0}cellX(t){return this.center.x+((t+.5)/this.size*2-1)*this.extent}cellZ(t){return this.center.y+((t+.5)/this.size*2-1)*this.extent}recenter(t,e){const a=this.cell,s=Math.round((t-this.center.x)/a),i=Math.round((e-this.center.y)/a);return!s&&!i?!1:(this.center.x+=s*a,this.center.y+=i*a,this.shiftCells.x+=s,this.shiftCells.y+=i,this.at.x+=s,this.at.y+=i,this.uniforms.uRippleRect.value.set(this.center.x,this.center.y,this.extent,0),!0)}drop(t,e,a,s=this.cell*2.2){this.trail(t,e,t,e,a,s)}trail(t,e,a,s,i,n=this.cell*2){const r=i*this.strength;if(!r)return;const u=this.extent,p=(o,m)=>Math.abs(o-this.center.x)>u||Math.abs(m-this.center.y)>u;if(!(p(t,e)&&p(a,s))){if(this.activeFor=6,this.drops.length>=f){const o=this.drops[this.drops.length-1];o.bx=a,o.bz=s,o.strength=Math.sign(r)*Math.max(Math.abs(o.strength),Math.abs(r)),o.radius=Math.max(o.radius,n);return}this.drops.push({ax:t,az:e,bx:a,bz:s,strength:r,radius:Math.max(n,this.cell*1.2)})}}step(t){this.activeFor=Math.max(0,this.activeFor-t),this.acc+=Math.min(t,.1);let e=0;for(;this.acc>=1/60&&e<3;)this.pass(),this.acc-=1/60,e++;!e&&(this.drops.length||this.shiftCells.x||this.shiftCells.y)&&this.pass(),this.acc>1/20&&(this.acc=0)}clear(){const t=this.renderer,e=t.getRenderTarget(),a=t.getClearColor(new B),s=t.getClearAlpha();t.setClearColor(0,0);for(const i of this.targets)t.setRenderTarget(i),t.clear(!0,!1,!1);t.setRenderTarget(e),t.setClearColor(a,s),this.drops.length=0,this.activeFor=0}pass(){const t=this.renderer,e=this.material.uniforms;e.uPrev.value=this.targets[this.index].texture,e.uRect.value.copy(this.uniforms.uRippleRect.value),e.uShift.value.set(this.shiftCells.x/this.size,this.shiftCells.y/this.size),this.shiftCells.set(0,0);const a=e.uDropA.value,s=e.uDropB.value;this.drops.forEach((r,u)=>{a[u].set(r.ax,r.az,r.bx,r.bz),s[u].set(r.strength,r.radius)}),e.uDropCount.value=this.drops.length,this.drops.length=0;const i=t.getRenderTarget(),n=t.autoClear;t.autoClear=!1,t.setRenderTarget(this.targets[1-this.index]),t.render(this.scene,this.camera),t.setRenderTarget(i),t.autoClear=n,this.index=1-this.index,this.uniforms.uRippleMap.value=this.targets[this.index].texture}dispose(){this.targets.forEach(t=>t.dispose()),this.material.dispose(),this.wall.dispose(),this.scene.children[0].geometry.dispose()}}export{j as R,K as a,X as c};
