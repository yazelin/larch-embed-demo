import{F as g,am as R,f as h,ag as m,aS as d,ai as v,ah as w,ad as y,y as C,z as D,ac as z,S as M,as as f,g as T,B as b,o as S,C as A}from"./three-engine-DgueuEcG.js";const o=8;function B(c){const e=c.getContext();return typeof WebGL2RenderingContext>"u"||!(e instanceof WebGL2RenderingContext)?!1:c.extensions.has("EXT_color_buffer_float")||c.extensions.has("EXT_color_buffer_half_float")}const F=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,U=`
uniform sampler2D uPrev;
uniform sampler2D uWall;
uniform vec2 uTexel;
uniform float uK;
uniform float uDamp;
uniform vec4 uRect;
uniform vec2 uShift;
uniform vec4 uDropA[${o}];
uniform vec2 uDropB[${o}];
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
  for (int i = 0; i < ${o}; i++) {
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
`,E=`
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
`;class P{size;extent;uniforms;strength=1;renderer;targets;index=0;material;scene=new g;camera=new R(-1,1,1,-1,0,1);wall;wallData;drops=[];acc=0;shiftCells=new h;center=new h;activeFor=0;constructor(e,t){this.renderer=e,this.size=t.size,this.extent=t.extent;const s={type:y,format:w,minFilter:v,magFilter:v,depthBuffer:!1,stencilBuffer:!1,wrapS:d,wrapT:d,generateMipmaps:!1};this.targets=[new m(this.size,this.size,s),new m(this.size,this.size,s)],this.wallData=new Uint8Array(this.size*this.size),this.wall=new C(this.wallData,this.size,this.size,D,z),this.wall.magFilter=v,this.wall.minFilter=v,this.wall.needsUpdate=!0;const a=2*this.extent/this.size,r=t.speed??2.4,l=Math.min(1.9,(2*r*(1/60)/a)**2);this.material=new M({uniforms:{uPrev:{value:null},uWall:{value:this.wall},uTexel:{value:new h(1/this.size,1/this.size)},uK:{value:l},uDamp:{value:t.damping??.988},uRect:{value:new f(0,0,this.extent,0)},uShift:{value:new h},uDropA:{value:Array.from({length:o},()=>new f)},uDropB:{value:Array.from({length:o},()=>new h)},uDropCount:{value:0}},vertexShader:F,fragmentShader:U,depthTest:!1,depthWrite:!1});const i=new T;i.setAttribute("position",new b(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));const n=new S(i,this.material);n.frustumCulled=!1,this.scene.add(n),this.uniforms={uRippleMap:{value:this.targets[0].texture},uRippleRect:{value:new f(0,0,this.extent,0)},uRippleTexel:{value:new h(1/this.size,1/this.size)},uRippleAmp:{value:1}},this.clear()}get cell(){return 2*this.extent/this.size}get active(){return this.activeFor>0}set damping(e){this.material.uniforms.uDamp.value=e}setSpeed(e){this.material.uniforms.uK.value=Math.min(1.9,(2*e*(1/60)/this.cell)**2)}setWalls(e){const t=this.size,s=this.center.x,a=this.center.y,r=this.extent;for(let l=0;l<t;l++)for(let i=0;i<t;i++){const n=s+((i+.5)/t*2-1)*r,p=a+((l+.5)/t*2-1)*r;this.wallData[l*t+i]=Math.round(Math.min(1,Math.max(0,e(n,p)))*255)}this.wall.needsUpdate=!0}get wallArray(){return this.wallData}wallsChanged(){this.wall.needsUpdate=!0}cellX(e){return this.center.x+((e+.5)/this.size*2-1)*this.extent}cellZ(e){return this.center.y+((e+.5)/this.size*2-1)*this.extent}recenter(e,t){const s=this.cell,a=Math.round((e-this.center.x)/s),r=Math.round((t-this.center.y)/s);return!a&&!r?!1:(this.center.x+=a*s,this.center.y+=r*s,this.shiftCells.x+=a,this.shiftCells.y+=r,this.uniforms.uRippleRect.value.set(this.center.x,this.center.y,this.extent,0),!0)}drop(e,t,s,a=this.cell*2.2){this.trail(e,t,e,t,s,a)}trail(e,t,s,a,r,l=this.cell*2){const i=r*this.strength;if(!i)return;const n=this.extent,p=(u,x)=>Math.abs(u-this.center.x)>n||Math.abs(x-this.center.y)>n;if(!(p(e,t)&&p(s,a))){if(this.activeFor=6,this.drops.length>=o){const u=this.drops[this.drops.length-1];u.bx=s,u.bz=a,u.strength=Math.sign(i)*Math.max(Math.abs(u.strength),Math.abs(i)),u.radius=Math.max(u.radius,l);return}this.drops.push({ax:e,az:t,bx:s,bz:a,strength:i,radius:Math.max(l,this.cell*1.2)})}}step(e){this.activeFor=Math.max(0,this.activeFor-e),this.acc+=Math.min(e,.1);let t=0;for(;this.acc>=1/60&&t<3;)this.pass(),this.acc-=1/60,t++;!t&&(this.drops.length||this.shiftCells.x||this.shiftCells.y)&&this.pass(),this.acc>1/20&&(this.acc=0)}clear(){const e=this.renderer,t=e.getRenderTarget(),s=e.getClearColor(new A),a=e.getClearAlpha();e.setClearColor(0,0);for(const r of this.targets)e.setRenderTarget(r),e.clear(!0,!1,!1);e.setRenderTarget(t),e.setClearColor(s,a),this.drops.length=0,this.activeFor=0}pass(){const e=this.renderer,t=this.material.uniforms;t.uPrev.value=this.targets[this.index].texture,t.uRect.value.copy(this.uniforms.uRippleRect.value),t.uShift.value.set(this.shiftCells.x/this.size,this.shiftCells.y/this.size),this.shiftCells.set(0,0);const s=t.uDropA.value,a=t.uDropB.value;this.drops.forEach((i,n)=>{s[n].set(i.ax,i.az,i.bx,i.bz),a[n].set(i.strength,i.radius)}),t.uDropCount.value=this.drops.length,this.drops.length=0;const r=e.getRenderTarget(),l=e.autoClear;e.autoClear=!1,e.setRenderTarget(this.targets[1-this.index]),e.render(this.scene,this.camera),e.setRenderTarget(r),e.autoClear=l,this.index=1-this.index,this.uniforms.uRippleMap.value=this.targets[this.index].texture}dispose(){this.targets.forEach(e=>e.dispose()),this.material.dispose(),this.wall.dispose(),this.scene.children[0].geometry.dispose()}}export{E as R,P as a,B as c};
