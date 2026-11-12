import{V as f,c as h,G as p,d as g,s as x,a as S,b as v,ag as w}from"./three-engine-DBk0tA82.js";import{o as l,r as y}from"./modelDoc-B_YKlzsE.js";function c(n,e){const o=y(e),r=new Float32Array(n*16),s=new Float32Array(n*12),i=new Uint32Array(n*6);for(let a=0;a<n;a++){const d=[o(),o(),o(),o()];for(let u=0;u<4;u++)r.set(d,(a*4+u)*4);s.set([-1,0,0,1,0,0,1,1,0,-1,1,0],a*12),i.set([a*4,a*4+1,a*4+2,a*4,a*4+2,a*4+3],a*6)}const t=new S;return t.setAttribute("aSeed",new v(r,4)),t.setAttribute("position",new v(s,3)),t.setIndex(new v(i,1)),t.boundingSphere=new w(new f,1e5),t}const m=`
${l}
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
`,z=`
${m}
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
}`,A=`
${l}
varying float vAlpha;
void main() {
  if (vAlpha < .01) discard;
  vec3 col = mix(uHemiSky * 1.15 + vec3(.12), vec3(.85, .9, 1.), .45);
  gl_FragColor = vec4(col, vAlpha * .36);
}`,M=`
${m}
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
}`,C=`
${l}
varying vec2 vUv;
varying float vPhase;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float ring = smoothstep(.16, 0., abs(d - .8)) * step(d, 1.);
  if (ring * vAlpha < .01) discard;
  gl_FragColor = vec4(mix(uHemiSky, vec3(1.), .5), ring * vAlpha * .3);
}`,b=`
${m}
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
}`,P=`
${l}
varying vec2 vUv;
varying float vAlpha;
void main() {
  float d = length(vUv);
  float a = smoothstep(1., .25, d) * vAlpha;
  if (a < .01) discard;
  vec3 col = mix(vec3(.92, .95, 1.), uHemiSky + vec3(.55), .25) * (1. - uNight * .45);
  gl_FragColor = vec4(col, a * .92);
}`;class B{constructor(e,o,r){this.env=e;const s=r==="low"?.45:r==="medium"?.7:1;this.uniforms={...e,uCam:{value:new f},uBox:{value:26},uAmount:{value:0},uHeight:{value:18},tHeight:{value:o.heightTex},tWater:{value:o.waterTex},uWorld:{value:o.size},uSea:{value:o.sea}};const i=(t,a)=>new g({uniforms:this.uniforms,vertexShader:t,fragmentShader:a,transparent:!0,depthWrite:!1,side:x});this.rain=new h(c(Math.round(11e3*s),31),i(z,A)),this.splash=new h(c(Math.round(1400*s),53),i(M,C)),this.snow=new h(c(Math.round(7e3*s),71),i(b,P));for(const t of[this.rain,this.splash,this.snow])t.frustumCulled=!1,t.visible=!1,t.renderOrder=30,this.group.add(t);this.group.name="l3d-weather"}env;group=new p;rain;splash;snow;uniforms;kind="clear";amount=0;target=0;flashIn=4;flash=0;baseSnow=0;onLightning;set(e){this.kind=e,this.target=e==="rain"?.75:e==="storm"?1:e==="snow"?.85:0}get falling(){return this.target>0||this.amount>0}update(e,o,r){this.amount+=(this.target-this.amount)*Math.min(1,e*.8),this.amount<.005&&this.target===0&&(this.amount=0);const s=this.kind==="snow";this.uniforms.uCam.value.copy(o),this.uniforms.uAmount.value=this.amount,this.uniforms.uSea.value=r,this.rain.visible=this.amount>0&&!s,this.splash.visible=this.rain.visible,this.snow.visible=this.amount>0&&s;const i=this.env,t=this.kind==="rain"||this.kind==="storm"?1:0;i.uWetness.value+=(t-i.uWetness.value)*Math.min(1,e*(t?.25:.06));const a=Math.max(s?.8:0,this.baseSnow);return i.uSnowCover.value+=(a-i.uSnowCover.value)*Math.min(1,e*(this.baseSnow>0&&i.uSnowCover.value<this.baseSnow?4:s?.05:.03)),this.kind==="storm"&&(this.flashIn-=e,this.flashIn<=0&&(this.flashIn=5+Math.random()*9,this.flash=1,this.onLightning?.())),this.flash=Math.max(0,this.flash-e*3.2),this.flash>0?Math.max(0,Math.sin(this.flash*Math.PI*2.5))*this.flash:0}dispose(){for(const e of[this.rain,this.splash,this.snow])e.geometry.dispose(),e.material.dispose()}}export{B as P};
