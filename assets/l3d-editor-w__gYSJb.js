import{r as re,j as r}from"./react-core-CuKebU_E.js";import{S as V}from"./StudioSelect-C5dmUUZ6.js";import{H as Ke,d as lt,C as J,I as Fe}from"./creatures-CpeI2h0y.js";import{t as L,V as P,d as D,ai as Z,ad as de,au as nt,av as ut,aw as ee,a8 as te,$ as z,aq as ue,C as q,m as Xe,a7 as ct,ah as ht,a9 as dt,h as mt,at as Be,c as Pe,a as pt,ax as ft,G as De,ay as vt,af as bt,az as gt,a1 as xt,a2 as be,aA as ge,M as I,s as ce,o as se,q as yt,aB as ze,r as wt,T as Oe,e as kt}from"./three-engine-CPoZO8QK.js";import{h as Je,i as Ye,r as Tt,B as Ct}from"./builtins-BYZnGG-g.js";import{C as Le}from"./crosshair-CebJeHGu.js";import{E as jt}from"./eye-off-CC-TaqBp.js";import{E as St,P as ve,q as Mt}from"./index-CWnuUqzw.js";import{L as Pt}from"./lock-DZdhimPd.js";import{L as Dt}from"./lock-open-kL4Oo_4h.js";import{C as At}from"./copy-Bz0EbCyL.js";import{T as Y}from"./ime-DifmtmAZ.js";import{C as Ae}from"./chevron-up-oF4395I4.js";import{C as Qe}from"./chevron-down-Dp10-1_1.js";const et=1,Ut=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }
`;class oe{constructor(a){if(this.material=a,!oe.geometry){const o=new mt;o.setAttribute("position",new Be([-1,-1,0,3,-1,0,-1,3,0],3)),o.setAttribute("uv",new Be([0,0,2,0,0,2],2)),oe.geometry=o}this.mesh=new Pe(oe.geometry,a),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}material;static geometry=null;mesh;scene=new pt;camera=new ft(-1,1,1,-1,0,1);render(a,o){a.setRenderTarget(o),a.render(this.scene,this.camera)}}const he={anime:{tonemap:0,saturation:1,contrast:1.06,balance:[.92,.9,.88],lift:[.006,.014,.032],gain:[.98,.96,.93],shadowTint:[.38,.5,.72],highlightTint:[1.03,1,.95],vignette:.22,grain:0,glow:.05,shoulder:.6,threshold:1,toning:1.45,chromatic:.18,dirt:.35},dreamy:{tonemap:0,saturation:1.04,contrast:1.04,balance:[1.01,1,.99],lift:[0,.004,.016],gain:[1.02,1,.98],shadowTint:[.4,.46,.64],highlightTint:[1.03,.99,.92],vignette:.2,grain:0,glow:.06,threshold:1.1,chromatic:.2,dirt:.45},natural:{tonemap:0,saturation:1.06,contrast:1.04,balance:[1,1,1],lift:[0,0,0],gain:[1,1,1],shadowTint:[.42,.46,.62],highlightTint:[1,.97,.92],vignette:.2,grain:.006},storybook:{tonemap:0,saturation:1.14,contrast:1.07,balance:[1.04,1,.95],lift:[.01,.015,.03],gain:[1.03,1,.95],shadowTint:[.36,.38,.66],highlightTint:[1.04,.96,.84],vignette:.3,grain:.018},golden:{tonemap:1,saturation:1.12,contrast:1.06,balance:[1.12,1,.84],lift:[.02,.012,.03],gain:[1.05,.99,.9],shadowTint:[.4,.34,.62],highlightTint:[1.08,.94,.78],vignette:.32,grain:.018,chromatic:.3,dirt:.6},pastel:{tonemap:0,saturation:.92,contrast:.92,balance:[1.02,1,1.02],lift:[.06,.055,.07],gain:[1,.98,1.02],shadowTint:[.6,.5,.72],highlightTint:[1,.96,.96],vignette:.14,grain:0},vivid:{tonemap:1,saturation:1.3,contrast:1.1,balance:[1,1,1],lift:[0,0,.01],gain:[1,1,1],shadowTint:[.3,.4,.7],highlightTint:[1,.98,.9],vignette:.22,grain:.01},film:{tonemap:2,saturation:1.14,contrast:1.12,balance:[1.04,1,.95],lift:[0,.03,.045],gain:[1.06,1,.9],shadowTint:[.22,.42,.5],highlightTint:[1.08,.95,.8],vignette:.36,grain:.045,chromatic:.55,dirt:.7},moody:{tonemap:2,saturation:.84,contrast:1.14,balance:[.95,1,1.08],lift:[.01,.02,.04],gain:[.94,.97,1.02],shadowTint:[.3,.35,.55],highlightTint:[.95,.97,1],vignette:.48,grain:.03,chromatic:.4,dirt:.5},mono:{tonemap:2,saturation:0,contrast:1.1,balance:[1,1,1],lift:[.02,.015,.01],gain:[1.02,1,.95],shadowTint:[.5,.5,.5],highlightTint:[1,1,1],vignette:.35,grain:.04,mono:!0}};class fa{renderer;sceneRT;copyRT;mainRT;bloomDown=[];bloomUp=[];blurA;blurB;blurC;aoA;aoB;raysRT;taaRT=null;taaIndex=0;taaValid=!1;taaFrame=0;taaLastAt=0;taaOn=!0;prevViewProj=new L;viewProj=new L;savedProj=new L;prevCamPos=new P;dofPre;dofA;dofB;lensDirt;airRT;airPass;copyPass;blitPass;prefilterPass;downPass;upPass;aoPass;aoBlurPass;raysPass;taaPass;dofPrePass;bokehPass;tentPass;compositePass;options;width=1;height=1;size=new D(1,1);hdr;time=0;sunNdc=new P;constructor(a,o){this.renderer=a,this.options={ao:!0,rays:!0,taa:!1,bokehTaps:38,...o};const e=a.getContext();this.hdr=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"));const s=this.hdr?Z:de,l=new nt(1,1);l.type=ut,this.sceneRT=new ee(1,1,{type:s,format:te,samples:o.samples,depthTexture:l,depthBuffer:!0}),this.sceneRT.texture.minFilter=z,this.sceneRT.texture.magFilter=z,this.copyRT=new ee(1,1,{type:this.hdr?Z:ue,format:te,depthBuffer:!1}),this.copyRT.texture.minFilter=z,this.copyRT.texture.magFilter=z,this.mainRT=new ee(1,1,{type:s,format:te,depthBuffer:!0}),this.mainRT.texture.minFilter=z,this.mainRT.texture.magFilter=z;const n=(f=s)=>{const v=new ee(1,1,{type:f,format:te,depthBuffer:!1});return v.texture.minFilter=z,v.texture.magFilter=z,v};for(let f=0;f<o.bloomLevels;f++)this.bloomDown.push(n()),this.bloomUp.push(n());if(this.blurA=n(),this.blurB=n(),this.blurC=n(),this.aoA=n(de),this.aoB=n(de),this.raysRT=n(),this.options.taa&&this.hdr){const f=()=>{const v=new ee(1,1,{type:Z,format:te,depthBuffer:!1});return v.texture.minFilter=z,v.texture.magFilter=z,v};this.taaRT=[f(),f()]}this.dofPre=n(this.hdr?Z:ue),this.dofA=n(this.hdr?Z:ue),this.dofB=n(this.hdr?Z:ue),this.lensDirt=Rt(),this.airRT=n();const u=(f,v)=>new oe(new Xe({uniforms:v,vertexShader:Ut,fragmentShader:f,depthTest:!1,depthWrite:!1}));this.copyPass=u(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform float uNear; uniform float uFar;
      varying vec2 vUv;
      void main() {
        float z = texture(tDepth, vUv).x;
        float viewZ = (uNear * uFar) / ((uFar - uNear) * z - uFar);
        vec3 c = texture(tColor, vUv).rgb;
        // One bad pixel (NaN/Inf) would spread into a black blob through bloom; drop it here.
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        gl_FragColor = vec4(min(c, vec3(64.)), -viewZ);
      }`,{tColor:{value:null},tDepth:{value:null},uNear:{value:.1},uFar:{value:1e3}}),this.blitPass=u(`
      uniform sampler2D tColor; varying vec2 vUv;
      void main() { gl_FragColor = vec4(texture(tColor, vUv).rgb, 1.); }`,{tColor:{value:null}}),this.prefilterPass=u(`
      uniform sampler2D tColor; uniform vec2 uTexel; uniform float uThreshold; uniform float uKnee;
      varying vec2 vUv;
      vec3 tap(vec2 o) { vec3 c = texture(tColor, vUv + o * uTexel).rgb; if (any(isnan(c)) || any(isinf(c))) c = vec3(0.); c = min(c, vec3(64.)); return c / (1. + max(c.r, max(c.g, c.b)) * .25); }
      void main() {
        vec3 c = (tap(vec2(-1, -1)) + tap(vec2(1, -1)) + tap(vec2(-1, 1)) + tap(vec2(1, 1))) * .25;
        c = c / max(1. - max(c.r, max(c.g, c.b)) * .25, .2);
        float br = max(c.r, max(c.g, c.b));
        float soft = clamp(br - uThreshold + uKnee, 0., 2. * uKnee);
        soft = soft * soft / (4. * uKnee + 1e-4);
        float w = max(soft, br - uThreshold) / max(br, 1e-4);
        gl_FragColor = vec4(c * w, 1.);
      }`,{tColor:{value:null},uTexel:{value:new D},uThreshold:{value:1},uKnee:{value:.7}}),this.downPass=u(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec2 h = uTexel * .5;
        vec4 s = texture(tColor, vUv) * 4.;
        s += texture(tColor, vUv - h); s += texture(tColor, vUv + h);
        s += texture(tColor, vUv + vec2(h.x, -h.y)); s += texture(tColor, vUv - vec2(h.x, -h.y));
        gl_FragColor = s / 8.;
      }`,{tColor:{value:null},uTexel:{value:new D}}),this.upPass=u(`
      uniform sampler2D tColor; uniform sampler2D tBase; uniform vec2 uTexel; uniform float uBaseWeight; varying vec2 vUv;
      void main() {
        vec2 h = uTexel * .5;
        vec4 s = texture(tColor, vUv + vec2(-h.x * 2., 0.));
        s += texture(tColor, vUv + vec2(-h.x, h.y)) * 2.;
        s += texture(tColor, vUv + vec2(0., h.y * 2.));
        s += texture(tColor, vUv + vec2(h.x, h.y)) * 2.;
        s += texture(tColor, vUv + vec2(h.x * 2., 0.));
        s += texture(tColor, vUv + vec2(h.x, -h.y)) * 2.;
        s += texture(tColor, vUv + vec2(0., -h.y * 2.));
        s += texture(tColor, vUv + vec2(-h.x, -h.y)) * 2.;
        gl_FragColor = s / 12. + texture(tBase, vUv) * uBaseWeight;
      }`,{tColor:{value:null},tBase:{value:null},uTexel:{value:new D},uBaseWeight:{value:1}}),this.aoPass=u(`
      uniform sampler2D tDepth; uniform vec2 uTexel; uniform vec2 uTan; uniform float uRadius; uniform float uFar;
      varying vec2 vUv;
      vec3 viewPos(vec2 uv) { float d = texture(tDepth, uv).a; return vec3((uv * 2. - 1.) * uTan * d, -d); }
      float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(.06711056, .00583715)))); }
      void main() {
        float d = texture(tDepth, vUv).a;
        if (d > uFar * .9) { gl_FragColor = vec4(1.); return; }
        vec3 p = viewPos(vUv);
        vec3 px = viewPos(vUv + vec2(uTexel.x, 0.)) - p, nx = p - viewPos(vUv - vec2(uTexel.x, 0.));
        vec3 py = viewPos(vUv + vec2(0., uTexel.y)) - p, ny = p - viewPos(vUv - vec2(0., uTexel.y));
        vec3 dx = abs(px.z) < abs(nx.z) ? px : nx, dy = abs(py.z) < abs(ny.z) ? py : ny;
        vec3 n = normalize(cross(dx, dy));
        float radius = uRadius * (1. + d * .012);
        float uvR = radius / (2. * d * uTan.y);
        float occ = 0.;
        float phi = ign(gl_FragCoord.xy) * 6.2831;
        const int N = 10;
        for (int i = 0; i < N; i++) {
          float r = sqrt((float(i) + .5) / float(N));
          float a = float(i) * 2.39996 + phi;
          vec2 o = vec2(cos(a), sin(a)) * r * uvR;
          vec3 s = viewPos(vUv + o) - p;
          float l = length(s);
          occ += max(0., dot(n, s / max(l, 1e-4)) - .08) * smoothstep(radius * 1.6, radius * .4, l);
        }
        float ao = clamp(1. - occ / float(N) * 1.9, 0., 1.);
        gl_FragColor = vec4(ao, ao, ao, 1.);
      }`,{tDepth:{value:null},uTexel:{value:new D},uTan:{value:new D(1,1)},uRadius:{value:.95},uFar:{value:1e3}}),this.aoBlurPass=u(`
      uniform sampler2D tAo; uniform sampler2D tDepth; uniform vec2 uDir; varying vec2 vUv;
      void main() {
        float d0 = texture(tDepth, vUv).a;
        float sum = 0., wsum = 0.;
        for (int i = -3; i <= 3; i++) {
          vec2 uv = vUv + uDir * float(i);
          float d = texture(tDepth, uv).a;
          float w = exp(-float(i * i) * .18) * (1. / (1. + abs(d - d0) * 6. / max(d0, .5)));
          sum += texture(tAo, uv).r * w; wsum += w;
        }
        float ao = sum / wsum;
        gl_FragColor = vec4(ao, ao, ao, 1.);
      }`,{tAo:{value:null},tDepth:{value:null},uDir:{value:new D}}),this.raysPass=u(`
      uniform sampler2D tDepth; uniform vec2 uSun; uniform float uFar; uniform float uAspect; varying vec2 vUv;
      float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(.06711056, .00583715)))); }
      void main() {
        vec2 delta = (vUv - uSun);
        const int N = 36;
        vec2 stepv = delta / float(N) * .92;
        vec2 uv = vUv - stepv * ign(gl_FragCoord.xy);
        float illum = 1., sum = 0.;
        for (int i = 0; i < N; i++) {
          uv -= stepv;
          float sky = step(uFar * .9, texture(tDepth, clamp(uv, 0., 1.)).a);
          // Near the sun counts most.
          vec2 q = (uv - uSun) * vec2(uAspect, 1.);
          sum += sky * illum * exp(-dot(q, q) * 7.);
          illum *= .955;
        }
        gl_FragColor = vec4(vec3(sum / float(N)), 1.);
      }`,{tDepth:{value:null},uSun:{value:new D(.5,.5)},uFar:{value:1e3},uAspect:{value:1}}),this.taaPass=u(`
      uniform sampler2D tCurrent; uniform sampler2D tHistory; uniform sampler2D tDepth; uniform sampler2D tAir; uniform float uAirOn;
      uniform vec2 uTexel; uniform vec2 uTan; uniform vec2 uJitter; uniform float uFar; uniform float uReset;
      uniform mat4 uCamWorld; uniform mat4 uPrevViewProj;
      varying vec2 vUv;
      vec3 rgb2ycocg(vec3 c) { return vec3(dot(c, vec3(.25, .5, .25)), dot(c, vec3(.5, 0., -.5)), dot(c, vec3(-.25, .5, -.25))); }
      vec3 ycocg2rgb(vec3 c) { return vec3(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
      vec3 fetch(vec2 uv) {
        vec3 c = texture(tCurrent, uv).rgb;
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        if (uAirOn > .5) c += texture(tAir, uv).rgb;
        return rgb2ycocg(min(c, vec3(64.)));
      }
      // History through a 5-tap Catmull-Rom (sharper than bilinear, so the picture doesn't soften frame after frame).
      vec3 history(vec2 uv) {
        vec2 size = 1. / uTexel;
        vec2 pos = uv * size, c1 = floor(pos - .5) + .5, f = pos - c1;
        vec2 w0 = f * (-.5 + f * (1. - .5 * f)), w1 = 1. + f * f * (-2.5 + 1.5 * f), w2 = f * (.5 + f * (2. - 1.5 * f)), w3 = f * f * (-.5 + .5 * f);
        vec2 w12 = w1 + w2, o12 = w2 / w12;
        vec2 t0 = (c1 - 1.) * uTexel, t3 = (c1 + 2.) * uTexel, t12 = (c1 + o12) * uTexel;
        vec3 r = texture(tHistory, vec2(t12.x, t0.y)).rgb * w12.x * w0.y
          + texture(tHistory, vec2(t0.x, t12.y)).rgb * w0.x * w12.y + texture(tHistory, t12).rgb * w12.x * w12.y + texture(tHistory, vec2(t3.x, t12.y)).rgb * w3.x * w12.y
          + texture(tHistory, vec2(t12.x, t3.y)).rgb * w12.x * w3.y;
        float wsum = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
        return max(r / wsum, vec3(0.));
      }
      vec3 clipAabb(vec3 lo, vec3 hi, vec3 q, vec3 p) {
        vec3 c = .5 * (hi + lo), e = .5 * (hi - lo) + 1e-4;
        vec3 v = q - c, a = abs(v / e);
        float m = max(a.x, max(a.y, a.z));
        return m > 1. ? c + v / m : q;
      }
      void main() {
        vec3 cur = fetch(vUv);
        if (uReset > .5) { gl_FragColor = vec4(ycocg2rgb(cur), 1.); return; }
        // Where was this point last frame?
        float d = texture(tDepth, vUv).a;
        vec2 ndc = vUv * 2. - 1. + uJitter;
        vec4 world = uCamWorld * vec4(ndc * uTan * d, -d, 1.);
        vec4 prev = uPrevViewProj * world;
        vec2 puv = prev.xy / prev.w * .5 + .5;
        if (prev.w <= 0. || any(lessThan(puv, vec2(0.))) || any(greaterThan(puv, vec2(1.)))) { gl_FragColor = vec4(ycocg2rgb(cur), 1.); return; }
        // The colours around this pixel now: the history must look like one of them (variance clipping).
        vec3 m1 = cur, m2 = cur * cur, lo = cur, hi = cur;
        for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
          if (i == 0 && j == 0) continue;
          vec3 s = fetch(vUv + vec2(float(i), float(j)) * uTexel);
          m1 += s; m2 += s * s; lo = min(lo, s); hi = max(hi, s);
        }
        vec3 mu = m1 / 9., sigma = sqrt(abs(m2 / 9. - mu * mu));
        vec2 motion = (vUv - puv) / uTexel;
        float speed = length(motion);
        float gamma = mix(1.25, .9, clamp(speed / 12., 0., 1.));
        vec3 boxLo = max(lo, mu - gamma * sigma), boxHi = min(hi, mu + gamma * sigma);
        vec3 h = clipAabb(boxLo, boxHi, rgb2ycocg(history(puv)), cur);
        // Still pixels keep more of the past (smoother); moving ones less (sharper, no smear).
        float alpha = mix(.085, .24, clamp(speed / 18., 0., 1.));
        // Weigh each by 1 / (1 + brightness) so a single glint doesn't flicker through the blend.
        float wc = alpha / (1. + cur.x), wh = (1. - alpha) / (1. + h.x);
        vec3 r = (cur * wc + h * wh) / (wc + wh);
        gl_FragColor = vec4(max(ycocg2rgb(r), vec3(0.)), 1.);
      }`,{tCurrent:{value:null},tHistory:{value:null},tDepth:{value:null},tAir:{value:null},uAirOn:{value:0},uTexel:{value:new D(1,1)},uTan:{value:new D(1,1)},uJitter:{value:new D},uFar:{value:1e3},uReset:{value:1},uCamWorld:{value:new L},uPrevViewProj:{value:new L}});const i=Math.max(0,Math.round(this.options.airSteps??0));this.airPass=u(`
      uniform sampler2D tDepth; uniform sampler2DShadow tShadow; uniform mat4 uShadowMatrix; uniform mat4 uCamWorld;
      uniform vec2 uTan; uniform vec2 uJitter; uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uDensity;
      uniform float uFrame; uniform float uMaxDist; uniform float uBias; uniform float uHeight;
      varying vec2 vUv;
      float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(.06711056, .00583715)))); }
      void main() {
        float d = texture(tDepth, vUv).a;
        vec3 vdir = vec3((vUv * 2. - 1. + uJitter) * uTan, -1.);
        float rayLen = min(d * length(vdir), uMaxDist);
        vec3 rd = normalize(mat3(uCamWorld) * vdir);
        vec3 ro = uCamWorld[3].xyz;
        const int N = ${Math.max(1,i)};
        float stepL = rayLen / float(N);
        float t = stepL * fract(ign(gl_FragCoord.xy) + uFrame * .618034);
        float lit = 0.;
        for (int i = 0; i < N; i++) {
          vec3 p = ro + rd * t;
          vec4 s = uShadowMatrix * vec4(p, 1.);
          vec3 c = s.xyz / s.w;
          float sh = (c.x < 0. || c.x > 1. || c.y < 0. || c.y > 1. || c.z > 1.) ? 1. : texture(tShadow, vec3(c.xy, c.z + uBias));
          // Denser near the ground (valleys, under trees), thinning upward.
          lit += sh * exp(-max(p.y - uHeight, 0.) * .07);
          t += stepL;
        }
        float mu = dot(rd, uSunDir);
        float g = .6;
        float hg = (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5) * .0796;
        // Mostly forward scattering: shafts glow looking toward the sun, the rest of the air stays nearly clear
        // (a flat glow everywhere would only wash the picture out — distance haze is the fog's job).
        gl_FragColor = vec4(uSunColor * (lit * stepL * uDensity * (hg * 3. + .03)), 1.);
      }`,{tDepth:{value:null},tShadow:{value:null},uShadowMatrix:{value:new L},uCamWorld:{value:new L},uTan:{value:new D(1,1)},uJitter:{value:new D},uSunDir:{value:new P(0,1,0)},uSunColor:{value:new q(1,1,1)},uDensity:{value:0},uFrame:{value:0},uMaxDist:{value:60},uBias:{value:0},uHeight:{value:0}});const h=`
      uniform float uFocus; uniform float uDof; uniform float uMiniature;
      float cocAt(float d, vec2 uv) {
        float s = (d - uFocus) / max(uFocus, 1.);
        // Behind the focus the blur grows with distance; in front only what's really close blurs (and less), so
        // nearby things you play with stay readable.
        float c = (s < 0. ? -.45 * smoothstep(.5, 1., -s) : smoothstep(.22, 1.05, s)) * uDof;
        float t = uv.y - .52;
        float tilt = smoothstep(.12, .48, abs(t)) * uMiniature * sign(t);
        return abs(tilt) > abs(c) ? tilt : c;
      }`;this.dofPrePass=u(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 uTexel; uniform float uFar;
      ${h}
      varying vec2 vUv;
      void main() {
        vec2 o = uTexel * .5;
        vec2 uv0 = vUv + vec2(-o.x, -o.y), uv1 = vUv + vec2(o.x, -o.y), uv2 = vUv + vec2(-o.x, o.y), uv3 = vUv + o;
        vec3 c0 = texture(tColor, uv0).rgb, c1 = texture(tColor, uv1).rgb, c2 = texture(tColor, uv2).rgb, c3 = texture(tColor, uv3).rgb;
        float k0 = cocAt(texture(tDepth, uv0).a, uv0), k1 = cocAt(texture(tDepth, uv1).a, uv1), k2 = cocAt(texture(tDepth, uv2).a, uv2), k3 = cocAt(texture(tDepth, uv3).a, uv3);
        float lo = min(min(k0, k1), min(k2, k3)), hi = max(max(k0, k1), max(k2, k3));
        // Gentle brightness weighting: steadier, while bright points still open into visible discs.
        vec4 w = vec4(1. / (1. + max(c0.r, max(c0.g, c0.b)) * .35), 1. / (1. + max(c1.r, max(c1.g, c1.b)) * .35), 1. / (1. + max(c2.r, max(c2.g, c2.b)) * .35), 1. / (1. + max(c3.r, max(c3.g, c3.b)) * .35));
        vec3 c = (c0 * w.x + c1 * w.y + c2 * w.z + c3 * w.w) / dot(w, vec4(1.));
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        gl_FragColor = vec4(min(c, vec3(64.)), hi >= -lo ? hi : lo);
      }`,{tColor:{value:null},tDepth:{value:null},uTexel:{value:new D},uFar:{value:1e3},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}});const c=Math.max(12,Math.min(64,Math.round(this.options.bokehTaps??38)));this.bokehPass=u(`
      uniform sampler2D tPre; uniform vec2 uTexel; uniform float uRadius; uniform float uFrame;
      varying vec2 vUv;
      float weigh(float coc, float r) { return clamp((coc - r + 2.) / 2., 0., 1.); }
      void main() {
        vec4 center = texture(tPre, vUv);
        float coc0 = center.a * uRadius;
        vec3 bg = vec3(0.), fg = vec3(0.); float bgW = 0., fgW = 0.;
        // A golden-angle spiral, turned a little each frame (temporal AA smooths the rest).
        float spin = fract(uFrame * .618034) * 6.2831;
        const int N = ${c};
        for (int i = 0; i < N; i++) {
          float r = sqrt((float(i) + .5) / float(N)) * uRadius;
          float a = float(i) * 2.39996 + spin;
          vec4 s = texture(tPre, vUv + vec2(cos(a), sin(a)) * r * uTexel);
          float sc = s.a * uRadius;
          float bw = weigh(max(0., min(sc, coc0)), r);
          float fw = weigh(-sc, r);
          bg += s.rgb * bw; bgW += bw; fg += s.rgb * fw; fgW += fw;
        }
        bg *= 1. / (bgW + (bgW == 0. ? 1. : 0.));
        fg *= 1. / (fgW + (fgW == 0. ? 1. : 0.));
        float fgA = min(1., fgW * 3.14159 / float(N));
        gl_FragColor = vec4(mix(bg, fg, fgA), fgA);
      }`,{tPre:{value:null},uTexel:{value:new D},uRadius:{value:8},uFrame:{value:0}}),this.tentPass=u(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec4 o = uTexel.xyxy * vec2(-.5, .5).xxyy;
        gl_FragColor = (texture(tColor, vUv + o.xy) + texture(tColor, vUv + o.zy) + texture(tColor, vUv + o.xw) + texture(tColor, vUv + o.zw)) * .25;
      }`,{tColor:{value:null},uTexel:{value:new D}}),this.compositePass=u(`
      #include <common>
      #include <tonemapping_pars_fragment>
      uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tBlur; uniform sampler2D tDepth; uniform sampler2D tAo; uniform sampler2D tRays;
      uniform float uBloom; uniform float uExposure; uniform float uBlurOn;
      uniform int uTonemap; uniform float uSaturation; uniform float uContrast; uniform vec3 uBalance; uniform vec3 uLift; uniform vec3 uGain;
      uniform vec3 uShadowTint; uniform vec3 uHighlightTint;
      uniform float uVignette; uniform float uGrain; uniform float uMono; uniform float uAspect; uniform float uTime; uniform float uShoulder; uniform float uToning;
      uniform vec3 uFlash; uniform float uFlashAmount; uniform float uAo; uniform float uRays; uniform vec3 uSunColor; uniform float uGlow;
      uniform float uUnder; uniform vec3 uUnderColor; uniform float uUnderFog; uniform float uUnderSurface; uniform float uUnderDepth;
      uniform mat4 uInvProj; uniform mat4 uCamWorld;
      uniform vec2 uTexel; uniform float uSharpen;
      uniform sampler2D tDof; uniform float uDofOn; uniform float uBokehPx; uniform sampler2D tDirt; uniform float uDirt; uniform float uChromatic; uniform float uLetterbox;
      uniform float uOutline; uniform float uOutlinePx;
      ${h}
      varying vec2 vUv;
      float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      vec3 toSRGB(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(1. / 2.4)) - .055, step(.0031308, c)); }
      vec3 toneMap(vec3 c) { return uTonemap == 1 ? ACESFilmicToneMapping(c) : uTonemap == 2 ? AgXToneMapping(c) : NeutralToneMapping(c); }
      void main() {
        vec2 uv = vUv;
        // Under water the picture wavers gently.
        if (uUnder > 0.) uv += vec2(sin(vUv.y * 26. + uTime * 1.6), cos(vUv.x * 22. + uTime * 1.25)) * .0022 * uUnder;
        vec3 c = texture(tScene, uv).rgb;
        // Lens fringes: red and blue land a hair apart toward the corners (only ever a pixel or two).
        if (uChromatic > 0.) {
          vec2 dir = (uv - .5) * vec2(uAspect, 1.);
          vec2 off = dir * dot(dir, dir) * uChromatic * .0042 / vec2(uAspect, 1.);
          c = vec3(texture(tScene, uv + off).r, c.g, texture(tScene, uv - off).b);
        }
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        if (uSharpen > 0.) {
          // The picture is drawn at less than the screen's resolution on phones and stretched to fit: a light
          // contrast-adaptive sharpen (clamped to its neighbours, so no halos) keeps edges and faces crisp.
          vec3 a = texture(tScene, uv + vec2(uTexel.x, 0.)).rgb, b = texture(tScene, uv - vec2(uTexel.x, 0.)).rgb;
          vec3 e = texture(tScene, uv + vec2(0., uTexel.y)).rgb, f = texture(tScene, uv - vec2(0., uTexel.y)).rgb;
          vec3 lo = min(c, min(min(a, b), min(e, f))), hi = max(c, max(max(a, b), max(e, f)));
          c = clamp(c + (c - (a + b + e + f) * .25) * uSharpen, lo, hi);
        }
        if (uOutline > 0.) {
          // Ink lines: a pixel whose neighbours lie clearly farther away is on a silhouette. Only the near side is
          // inked (the line hugs the object), relative depth keeps grass and gentle slopes clean, and lines thin out
          // with distance so far hills don't turn into scribbles. The ink is the colour itself, deepened — like
          // coloured line art — never flat black.
          float d0 = texture(tDepth, vUv).a;
          vec2 o = uTexel * uOutlinePx;
          float far4 = max(max(texture(tDepth, vUv + vec2(o.x, 0.)).a, texture(tDepth, vUv - vec2(o.x, 0.)).a), max(texture(tDepth, vUv + vec2(0., o.y)).a, texture(tDepth, vUv - vec2(0., o.y)).a));
          float jump = (min(far4, d0 * 4.) - d0) / max(d0, .2);
          float ink = smoothstep(.07, .16, jump) * (1. - smoothstep(26., 90., d0)) * step(d0, 800.);
          c = mix(c, c * vec3(.2, .19, .26), ink * uOutline);
        }
        if (uAo > 0.) {
          float ao = texture(tAo, vUv).r;
          // Occlusion leans cool (sky light blocked), never pure grey.
          c *= mix(vec3(1.), mix(vec3(.55, .58, .72), vec3(1.), ao), uAo);
        }
        if (uDofOn > .5) {
          // The lens blur, blended in by how far out of focus this pixel is (and over it, whatever is in front).
          float coc = cocAt(texture(tDepth, vUv).a, vUv) * uBokehPx;
          vec4 dof = texture(tDof, vUv);
          float k = smoothstep(.35, 1.6, abs(coc));
          c = mix(c, dof.rgb, k + dof.a - k * dof.a);
        }
        vec3 bloom = texture(tBloom, vUv).rgb * uBloom;
        c += bloom;
        // Dirt on the lens glows where bright light passes through it.
        if (uDirt > 0.) c += bloom * texture(tDirt, vUv * vec2(uAspect, 1.) * .62).r * uDirt * 2.4;
        if (uRays > 0.) c += texture(tRays, vUv).rgb * uSunColor * uRays;
        if (uUnder > 0.) {
          // Clear, bright tropical water: red fades first but gently, so the sea stays a luminous turquoise; the far
          // water closes into a haze that glows toward the surface and deepens below; light shafts slant down from
          // above, slowly swaying.
          float d = texture(tDepth, uv).a;
          // Looking up, the water ends at its surface: past it is the sky, not more water.
          vec4 vp = uInvProj * vec4(vUv * 2. - 1., 1., 1.);
          vec3 ray = normalize(mat3(uCamWorld) * (vp.xyz / vp.w));
          float above = uUnderSurface - uCamWorld[3].y;
          if (ray.y > .001 && above > 0.) d = min(d, above / ray.y * dot(ray, -normalize(uCamWorld[2].xyz)));
          float haze = 1. - exp(-d * uUnderFog);
          vec3 absorb = exp(-vec3(.065, .02, .01) * (2. + min(d, 60.)));
          c *= mix(vec3(1.), absorb * vec3(.92, 1.02, 1.05), uUnder);
          vec3 hazeCol = mix(uUnderColor * .55, uUnderColor * 1.5 + vec3(.01, .05, .05), smoothstep(.05, 1., vUv.y));
          // The deep: past ten metres or so the daylight runs out — everything darkens toward night-blue, and only
          // what glows (and what the slime's own light reaches) still shows.
          float deep = smoothstep(6., 28., uUnderDepth) * uUnder;
          c *= mix(1., .85, deep);
          hazeCol = mix(hazeCol, vec3(.003, .012, .03), deep * .9);
          c = mix(c, hazeCol, haze * uUnder);
          vec2 q = vec2(vUv.x * uAspect + vUv.y * .45, vUv.y);
          float s1 = sin(q.x * 11. + uTime * .42 + sin(q.x * 3.3 - uTime * .21) * 2.4) * .5 + .5;
          float s2 = sin(q.x * 27. - uTime * .66 + sin(q.x * 5.9 + uTime * .29) * 1.6) * .5 + .5;
          float shafts = (pow(s1, 6.) * .85 + pow(s2, 12.) * .55) * smoothstep(.1, 1., vUv.y) * (1. - haze * .35);
          c += mix(uUnderColor, vec3(.7, .95, 1.), .55) * shafts * .3 * uUnder * (1. - deep);
        }
        c *= uExposure * uBalance;
        c = toSRGB(clamp(toneMap(c), 0., 1.));
        if (uGlow > 0.) {
          // The dreamy glow: a soft blurred copy screened over the picture.
          vec3 g = toSRGB(clamp(toneMap(texture(tBlur, vUv).rgb * uExposure * uBalance * 1.15 * mix(vec3(1.), vec3(.3, .5, .62), uUnder)), 0., 1.));
          c = 1. - (1. - c) * (1. - g * g * uGlow);
        }
        float luma = dot(c, vec3(.2126, .7152, .0722));
        // Split toning: cool shadows, warm highlights.
        // (Under water the warm highlight toning would turn the sea floor khaki: mostly off there.)
        float toning = uToning * (1. - .7 * uUnder);
        c = mix(c, c * uShadowTint * 1.6, (1. - smoothstep(.0, .45, luma)) * .35 * toning);
        c = mix(c, c * uHighlightTint, smoothstep(.45, 1., luma) * min(1., .6 * toning));
        luma = dot(c, vec3(.2126, .7152, .0722));
        c = mix(vec3(luma), c, uMono > .5 ? 0. : uSaturation);
        c = (c - .5) * uContrast + .5;
        c = c * uGain + uLift * (1. - c);
        // Highlight shoulder: past ~70% the curve flattens gently, so cream walls and white flowers in full sun stay
        // below paper-white instead of glaring after a long session.
        if (uShoulder > 0.) c = mix(c, .7 + (c - .7) * (1. - uShoulder * .55), smoothstep(.6, .95, c));
        if (uMono > .5) c *= vec3(1.04, 1., .93);
        vec2 q = (vUv - .5) * vec2(uAspect, 1.);
        c *= 1. - uVignette * smoothstep(.35, 1.05, length(q) * 1.15);
        c = mix(c, uFlash, uFlashAmount);
        // Triangular-distributed dither (two hashes): smooth gradients in sky and fog never band.
        float n1 = hash(vUv * 1931.7 + fract(uTime) * 37.), n2 = hash(vUv.yx * 1733.3 + fract(uTime * 1.37) * 53.);
        c += (n1 - .5) * uGrain + (n1 + n2 - 1.) / 255.;
        if (uLetterbox > 0.) {
          // Cinema bars closing to a 2.39:1 frame (or a little, on screens already that wide).
          float bar = max(.5 * (1. - uAspect / 2.39), .06) * uLetterbox;
          float px = uTexel.y * 1.5;
          c *= smoothstep(bar - px, bar + px, vUv.y) * smoothstep(bar - px, bar + px, 1. - vUv.y);
        }
        gl_FragColor = vec4(clamp(c, 0., 1.), 1.);
      }`,{tScene:{value:null},tBloom:{value:null},tBlur:{value:null},tDepth:{value:null},tAo:{value:null},tRays:{value:null},uBloom:{value:.5},uExposure:{value:1},uBlurOn:{value:0},uTonemap:{value:0},uSaturation:{value:1},uContrast:{value:1},uBalance:{value:new q(1,1,1)},uLift:{value:new q(0,0,0)},uGain:{value:new q(1,1,1)},uShadowTint:{value:new q(.4,.45,.6)},uHighlightTint:{value:new q(1,1,1)},uVignette:{value:.2},uShoulder:{value:0},uToning:{value:1},uGrain:{value:.01},uMono:{value:0},uAspect:{value:1},uTime:{value:0},uFlash:{value:new q(0,0,0)},uFlashAmount:{value:0},uAo:{value:0},uRays:{value:0},uSunColor:{value:new q(1,1,1)},uGlow:{value:0},uUnder:{value:0},uUnderColor:{value:new q(.05,.3,.4)},uUnderFog:{value:.04},uUnderSurface:{value:1e9},uUnderDepth:{value:0},uInvProj:{value:new L},uCamWorld:{value:new L},uTexel:{value:new D(1,1)},uSharpen:{value:0},tDof:{value:null},uDofOn:{value:0},uBokehPx:{value:18},tDirt:{value:this.lensDirt},uDirt:{value:0},uChromatic:{value:0},uLetterbox:{value:0},uOutline:{value:0},uOutlinePx:{value:1},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}})}setSize(a,o){this.width=Math.max(1,Math.floor(a)),this.height=Math.max(1,Math.floor(o)),this.size.set(this.width,this.height),this.sceneRT.setSize(this.width,this.height),this.copyRT.setSize(this.width,this.height),this.mainRT.setSize(this.width,this.height);let e=this.width,s=this.height;for(let u=0;u<this.bloomDown.length;u++)e=Math.max(1,e>>1),s=Math.max(1,s>>1),this.bloomDown[u].setSize(e,s),this.bloomUp[u].setSize(e,s);const l=[Math.max(1,this.width>>1),Math.max(1,this.height>>1)],n=[Math.max(1,this.width>>2),Math.max(1,this.height>>2)];this.blurA.setSize(...l),this.blurB.setSize(...n),this.blurC.setSize(...l),this.aoA.setSize(...l),this.aoB.setSize(...l),this.raysRT.setSize(...n),this.taaRT?.forEach(u=>u.setSize(this.width,this.height)),this.taaValid=!1,this.dofPre.setSize(...l),this.dofA.setSize(...l),this.dofB.setSize(...l),this.options.airSteps&&this.options.airSteps>=20?this.airRT.setSize(...l):this.airRT.setSize(...n),this.compositePass.material.uniforms.uAspect.value=this.width/this.height}resetHistory(){this.taaValid=!1}get worldTexture(){return this.copyRT.texture}render(a,o,e,s,l=!0){const n=this.renderer;this.time+=s;const u=o.layers.mask,i=o.near??.1,h=o.far??1e3,c=o,f=this.taaOn&&this.taaRT&&c.isPerspectiveCamera?this.taaRT:null;f||(this.taaValid=!1);let v=0,p=0;if(f){const T=performance.now();(s>.25||T-this.taaLastAt>250||this.prevCamPos.distanceToSquared(c.position)>36)&&(this.taaValid=!1),this.taaLastAt=T,this.taaFrame++;const y=this.taaFrame%8+1;v=(qe(y,2)-.5)*2/this.width,p=(qe(y,3)-.5)*2/this.height,this.savedProj.copy(c.projectionMatrix),c.projectionMatrix.elements[8]+=v,c.projectionMatrix.elements[9]+=p,c.projectionMatrixInverse.copy(c.projectionMatrix).invert()}o.layers.set(0),n.setRenderTarget(this.sceneRT),n.clear(!0,!0,!0),n.render(a,o);const d=this.copyPass.material.uniforms;d.tColor.value=this.sceneRT.texture,d.tDepth.value=this.sceneRT.depthTexture,d.uNear.value=i,d.uFar.value=h,this.copyPass.render(n,this.copyRT);let b=this.sceneRT.texture;if(l){this.blitPass.material.uniforms.tColor.value=this.copyRT.texture,this.blitPass.render(n,this.mainRT),n.setRenderTarget(this.mainRT),n.clear(!1,!0,!1),o.layers.set(et);const T=n.autoClear;n.autoClear=!1;const y=a.background;a.background=null,n.render(a,o),a.background=y,n.autoClear=T,b=this.mainRT.texture}if(o.layers.mask=u,f){c.projectionMatrix.copy(this.savedProj),c.projectionMatrixInverse.copy(this.savedProj).invert();const T=Math.tan(c.fov*Math.PI/180/2)/(c.zoom||1),y=e.sunShadow,U=(this.options.airSteps??0)>0&&(e.airLight??0)>0&&!!y?.map&&!!e.sun&&!(e.underwater&&e.underwater.amount>.02);if(U&&y&&e.sun){const B=this.airPass.material.uniforms;B.tDepth.value=this.copyRT.texture,B.tShadow.value=y.map,B.uShadowMatrix.value.copy(y.matrix),B.uBias.value=y.bias,B.uCamWorld.value.copy(c.matrixWorld),B.uTan.value.set(T*c.aspect,T),B.uJitter.value.set(v,p),B.uSunDir.value.copy(e.sun.dir),B.uSunColor.value.copy(e.sun.color),B.uDensity.value=(e.airLight??0)*.004,B.uFrame.value=this.taaFrame,B.uMaxDist.value=Math.min(36,y.range*.8),B.uHeight.value=e.airHeight??2,this.airPass.render(n,this.airRT)}const M=this.taaPass.material.uniforms,F=f[this.taaIndex],Q=f[1-this.taaIndex];M.tCurrent.value=b,M.tHistory.value=Q.texture,M.tDepth.value=this.copyRT.texture,M.tAir.value=this.airRT.texture,M.uAirOn.value=U?1:0,M.uTexel.value.set(1/this.width,1/this.height),M.uTan.value.set(T*c.aspect,T),M.uJitter.value.set(v,p),M.uFar.value=h,M.uReset.value=this.taaValid?0:1,M.uCamWorld.value.copy(c.matrixWorld),M.uPrevViewProj.value.copy(this.prevViewProj),this.taaPass.render(n,F),this.viewProj.multiplyMatrices(this.savedProj,c.matrixWorldInverse),this.prevViewProj.copy(this.viewProj),this.prevCamPos.copy(c.position),this.taaIndex=1-this.taaIndex,this.taaValid=!0,b=F.texture}const w=!!this.options.ao&&(e.ao??1)>0&&o.isPerspectiveCamera;if(w){const T=o,y=Math.tan(T.fov*Math.PI/180/2),U=this.aoPass.material.uniforms;U.tDepth.value=this.copyRT.texture,U.uTexel.value.set(1/this.aoA.width,1/this.aoA.height),U.uTan.value.set(y*T.aspect,y),U.uFar.value=h,this.aoPass.render(n,this.aoA);const M=this.aoBlurPass.material.uniforms;M.tDepth.value=this.copyRT.texture,M.tAo.value=this.aoA.texture,M.uDir.value.set(1.5/this.aoA.width,0),this.aoBlurPass.render(n,this.aoB),M.tAo.value=this.aoB.texture,M.uDir.value.set(0,1.5/this.aoA.height),this.aoBlurPass.render(n,this.aoA)}let S=!1;if(this.options.rays&&e.sun&&e.sun.strength>0&&(this.sunNdc.copy(e.sun.dir).multiplyScalar(500).add(o.position).project(o),this.sunNdc.z<1&&Math.abs(this.sunNdc.x)<1.6&&Math.abs(this.sunNdc.y)<1.6)){const y=this.raysPass.material.uniforms;y.tDepth.value=this.copyRT.texture,y.uSun.value.set(this.sunNdc.x*.5+.5,this.sunNdc.y*.5+.5),y.uFar.value=h,y.uAspect.value=this.width/this.height,this.raysPass.render(n,this.raysRT),S=!0}let A=null;if(this.options.bloom&&e.bloom>0&&this.bloomDown.length){const T=this.prefilterPass.material.uniforms;T.tColor.value=b,T.uTexel.value.set(1/this.width,1/this.height),T.uThreshold.value=(he[e.look]||he.storybook).threshold??1,this.prefilterPass.render(n,this.bloomDown[0]);const y=this.downPass.material.uniforms;for(let F=1;F<this.bloomDown.length;F++){const Q=this.bloomDown[F-1];y.tColor.value=Q.texture,y.uTexel.value.set(1/Q.width,1/Q.height),this.downPass.render(n,this.bloomDown[F])}const U=this.upPass.material.uniforms;let M=this.bloomDown[this.bloomDown.length-1];for(let F=this.bloomDown.length-2;F>=0;F--)U.tColor.value=M.texture,U.tBase.value=this.bloomDown[F].texture,U.uTexel.value.set(1/M.width,1/M.height),U.uBaseWeight.value=1,this.upPass.render(n,this.bloomUp[F]),M=this.bloomUp[F];A=M.texture}const k=he[e.look]||he.storybook,G=e.miniature>.01||e.depthOfField>.01,it=(e.bokehRadius??12)*(this.height/1080),Ue=Math.max(1,it*.5);if(G){const T=this.dofPrePass.material.uniforms;T.tColor.value=b,T.tDepth.value=this.copyRT.texture,T.uTexel.value.set(1/this.width,1/this.height),T.uFar.value=h,T.uFocus.value=e.focusDistance,T.uDof.value=Math.min(1,e.depthOfField),T.uMiniature.value=e.miniature,this.dofPrePass.render(n,this.dofPre);const y=this.bokehPass.material.uniforms;y.tPre.value=this.dofPre.texture,y.uTexel.value.set(1/this.dofPre.width,1/this.dofPre.height),y.uRadius.value=Ue,y.uFrame.value=this.taaFrame,this.bokehPass.render(n,this.dofA);const U=this.tentPass.material.uniforms;U.tColor.value=this.dofA.texture,U.uTexel.value.set(1/this.dofA.width,1/this.dofA.height),this.tentPass.render(n,this.dofB)}const Re=(k.glow??0)>0;if(Re){const T=this.downPass.material.uniforms;T.tColor.value=b,T.uTexel.value.set(1/this.width,1/this.height),this.downPass.render(n,this.blurA),T.tColor.value=this.blurA.texture,T.uTexel.value.set(1/this.blurA.width,1/this.blurA.height),this.downPass.render(n,this.blurB);const y=this.upPass.material.uniforms;y.tColor.value=this.blurB.texture,y.tBase.value=this.blurA.texture,y.uTexel.value.set(1/this.blurB.width,1/this.blurB.height),y.uBaseWeight.value=0,this.upPass.render(n,this.blurC)}const g=this.compositePass.material.uniforms;g.uGlow.value=k.glow??0,g.tScene.value=b,g.tBloom.value=A??this.blurB.texture,g.uBloom.value=A?e.bloom*.35:0,g.tBlur.value=this.blurC.texture,g.tDepth.value=this.copyRT.texture,g.tAo.value=this.aoA.texture,g.uAo.value=w?e.ao??1:0,g.tRays.value=this.raysRT.texture,g.uRays.value=S?e.sun.strength:0,e.sun&&g.uSunColor.value.copy(e.sun.color),g.uBlurOn.value=Re?1:0,g.uMiniature.value=e.miniature,g.uDof.value=Math.min(1,e.depthOfField),g.uFocus.value=e.focusDistance,g.uDofOn.value=G?1:0,g.tDof.value=this.dofB.texture,g.uBokehPx.value=Ue*2;const Ne=Math.max(0,Math.min(1,e.lens??1));g.uDirt.value=(k.dirt??0)*Ne,g.uChromatic.value=Math.min(1.5,(k.chromatic??0)*Ne+(e.chromatic??0)),g.uLetterbox.value=Math.max(0,Math.min(1,e.letterbox??0)),g.uOutline.value=Math.max(0,Math.min(1,e.outline??0)),g.uOutlinePx.value=Math.max(1,this.height/900),g.uExposure.value=e.exposure,g.uTexel.value.set(1/this.width,1/this.height),g.uSharpen.value=e.sharpen??0,g.uTonemap.value=k.tonemap,g.uSaturation.value=k.saturation,g.uContrast.value=k.contrast,g.uBalance.value.setRGB(...k.balance),g.uLift.value.setRGB(...k.lift),g.uGain.value.setRGB(...k.gain),g.uShadowTint.value.setRGB(...k.shadowTint),g.uHighlightTint.value.setRGB(...k.highlightTint),g.uVignette.value=k.vignette,g.uShoulder.value=k.shoulder??0,g.uToning.value=k.toning??1,g.uGrain.value=k.grain,g.uMono.value=k.mono?1:0,g.uTime.value=this.time,e.flash?(g.uFlash.value.setRGB(e.flash[0],e.flash[1],e.flash[2]),g.uFlashAmount.value=e.flash[3]):g.uFlashAmount.value=0,e.underwater&&e.underwater.amount>0?(g.uUnder.value=e.underwater.amount,g.uUnderColor.value.copy(e.underwater.color),g.uUnderFog.value=e.underwater.fog,g.uUnderSurface.value=e.underwater.surface??1e9,g.uUnderDepth.value=e.underwater.depth??0,g.uInvProj.value.copy(o.projectionMatrixInverse),g.uCamWorld.value.copy(o.matrixWorld)):g.uUnder.value=0,this.compositePass.render(n,null)}dispose(){[this.sceneRT,this.copyRT,this.mainRT,this.blurA,this.blurB,this.blurC,this.aoA,this.aoB,this.raysRT,this.dofPre,this.dofA,this.dofB,this.airRT,...this.taaRT??[],...this.bloomDown,...this.bloomUp].forEach(a=>a.dispose()),[this.copyPass,this.blitPass,this.prefilterPass,this.downPass,this.upPass,this.aoPass,this.aoBlurPass,this.raysPass,this.airPass,this.taaPass,this.dofPrePass,this.bokehPass,this.tentPass,this.compositePass].forEach(a=>a.material.dispose()),this.lensDirt.dispose()}}function qe(t,a){let o=1,e=0;for(let s=t;s>0;s=Math.floor(s/a))o/=a,e+=o*(s%a);return e}function Rt(t=256){const a=new Uint8Array(t*t),o=new Float32Array(t*t);let e=9871;const s=()=>(e=e*16807%2147483647,e/2147483647),l=(u,i,h,c)=>{const f=h*h;for(let v=Math.max(0,Math.floor(i-h));v<Math.min(t,Math.ceil(i+h));v++)for(let p=Math.max(0,Math.floor(u-h));p<Math.min(t,Math.ceil(u+h));p++){const d=(p-u)**2+(v-i)**2;if(d>f)continue;const b=1-d/f;o[v*t+p]+=c*(b*b*.7+Math.exp(-((1-Math.sqrt(b)-.12)**2)*140)*.3)}};for(let u=0;u<70;u++){const i=s()*t,h=s()*t,c=Math.min(1,Math.hypot(i/t-.5,h/t-.5)*2.1);l(i,h,2+s()**2*26,(.15+s()*.55)*(.35+c*.65))}for(let u=0;u<3;u++){let i=s()*t,h=s()*t;const c=s()*Math.PI*2;for(let f=0;f<90;f++)l(i,h,3+s()*3,.05),i+=Math.cos(c+f*.012)*1.6,h+=Math.sin(c+f*.012)*1.6}for(let u=0;u<o.length;u++)a[u]=Math.round(Math.min(1,o[u])*255);const n=new ct(a,t,t,ht,de);return n.magFilter=z,n.minFilter=z,n.wrapS=n.wrapT=dt,n.needsUpdate=!0,n}const va=["soft","spark","star","ring","petal","smoke","snow","heart","leaf","drop","square"],Nt={soft:0,spark:1,star:2,ring:3,petal:4,smoke:5,snow:6,heart:7,leaf:8,drop:9,square:10},j=t=>({duration:1,loop:!1,rate:0,burst:30,life:[.6,1.2],emitter:"point",area:.1,speed:[1,3],direction:[0,1,0],spread:180,gravity:0,drag:1,turbulence:0,orbit:0,size:[.15,0],colors:["#ffffff","#ffffff"],alpha:[1,1,0],shape:"soft",blend:"add",spin:0,stretch:0,glow:.5,world:!0,...t}),tt=[j({id:"fire",name:"火焰",loop:!0,duration:1,rate:70,burst:0,life:[.5,1.1],emitter:"disc",area:.28,speed:[.6,1.6],spread:18,gravity:-2.2,drag:1.2,turbulence:1.2,size:[.42,.05],colors:["#fff3b0","#ffb347","#ff5a36","#5a2a2a"],alpha:[.9,.8,0],shape:"soft",glow:1.4}),j({id:"smoke",name:"煙霧",loop:!0,rate:11,burst:0,life:[2.4,4],emitter:"disc",area:.18,speed:[.6,1.1],spread:12,gravity:-.7,drag:.6,turbulence:.9,size:[.3,1.45],colors:["#c9c2bb","#eeeae6","#d4d9e2"],alpha:[0,.36,0],shape:"smoke",blend:"alpha",glow:0,spin:.35}),j({id:"coins",name:"金幣",burst:26,life:[.9,1.4],emitter:"point",speed:[3.5,6.5],direction:[0,1,0],spread:32,gravity:11,drag:.4,size:[.17,.13],colors:["#fff3a8","#ffd23f","#e8a317"],alpha:[1,1,0],shape:"star",glow:1.3,spin:4}),j({id:"ink",name:"墨汁",burst:70,life:[1.6,2.8],emitter:"cone",area:.25,speed:[2.5,6.5],direction:[0,0,1],spread:30,gravity:-.15,drag:3.2,turbulence:1.5,size:[.3,1.7],colors:["#3a2a52","#1d1630","#120e1e"],alpha:[.95,.75,0],shape:"smoke",blend:"alpha",glow:0,spin:.6}),j({id:"magic-burst",name:"魔法爆發",burst:80,life:[.5,1.1],emitter:"sphere",area:.15,speed:[2.5,6],spread:180,drag:3,turbulence:.6,size:[.16,0],colors:["#ffffff","#b38cff","#5f7dff"],alpha:[1,1,0],shape:"star",glow:1.6,spin:3}),j({id:"heal",name:"治療光環",loop:!0,duration:1.5,rate:40,burst:0,life:[1,1.6],emitter:"ring",area:.7,speed:[.5,1.2],direction:[0,1,0],spread:8,gravity:-.6,drag:.5,orbit:1.2,size:[.12,.02],colors:["#eaffd9","#7cf29a","#2fbf71"],alpha:[0,1,0],shape:"star",glow:1.2,spin:2}),j({id:"sparks",name:"電光火花",burst:60,life:[.15,.45],emitter:"point",speed:[6,12],spread:180,gravity:9,drag:2,size:[.05,.01],colors:["#ffffff","#8be9ff","#3a7bff"],alpha:[1,1,0],shape:"spark",stretch:1.2,glow:2}),j({id:"slash",name:"斬擊",burst:70,life:[.18,.35],emitter:"ring",area:1.1,speed:[.5,1.5],direction:[0,0,1],spread:25,drag:4,orbit:9,size:[.14,.02],colors:["#ffffff","#ffe08a","#ff8a3d"],alpha:[1,.9,0],shape:"spark",stretch:1.6,glow:1.8}),j({id:"sparkle",name:"星光閃爍",loop:!0,rate:10,burst:0,life:[.6,1.4],emitter:"sphere",area:.9,speed:[0,.2],spread:180,size:[0,.14],colors:["#ffffff","#fff2a8"],alpha:[0,1,0],shape:"star",glow:1.5,spin:1}),j({id:"portal",name:"傳送門",loop:!0,rate:90,burst:0,life:[.8,1.3],emitter:"ring",area:1.2,speed:[-.9,-.4],direction:[0,0,1],spread:0,orbit:2.5,size:[.1,.02],colors:["#ffffff","#8de3ff","#a46bff"],alpha:[0,1,0],shape:"soft",glow:1.6}),j({id:"confetti",name:"彩帶",burst:120,life:[1.6,2.6],emitter:"point",speed:[4,8],direction:[0,1,0],spread:55,gravity:6,drag:1.4,turbulence:.6,size:[.1,.08],colors:["#ff6b8b","#ffd166","#4ecdc4","#8e7dff"],alpha:[1,1,0],shape:"square",blend:"alpha",glow:0,spin:9}),j({id:"fireflies",name:"螢火蟲",loop:!0,rate:6,burst:10,life:[3,6],emitter:"box",area:4,speed:[.05,.25],spread:180,turbulence:.5,size:[.07,.07],colors:["#f4ffb0","#c8ff6a"],alpha:[0,1,0],shape:"soft",glow:2.5}),j({id:"frost",name:"冰霜",burst:60,life:[.6,1.2],emitter:"ring",area:.4,speed:[3,5],direction:[0,.2,0],spread:90,drag:3,size:[.16,.02],colors:["#ffffff","#bfefff","#6fc3ff"],alpha:[1,.9,0],shape:"snow",glow:1,spin:2}),j({id:"splash",name:"水花",burst:40,life:[.4,.8],emitter:"disc",area:.3,speed:[2,4.5],spread:35,gravity:14,drag:.5,size:[.08,.03],colors:["#ffffff","#bdf1ff"],alpha:[1,.9,0],shape:"drop",blend:"alpha",stretch:.6,glow:.3}),j({id:"goo",name:"黏液飛濺",burst:26,life:[.5,1],emitter:"sphere",area:.3,speed:[2,4],direction:[0,1,0],spread:70,gravity:12,drag:.4,size:[.13,.06],colors:["#8affc7","#22d38a"],alpha:[.95,.9,0],shape:"drop",blend:"alpha",stretch:.3,glow:.4}),j({id:"petals",name:"花瓣飄落",loop:!0,rate:8,burst:0,life:[4,7],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.3,.2],spread:30,gravity:.4,drag:.8,turbulence:.9,size:[.09,.08],colors:["#ffd1e1","#ff9fc2"],alpha:[0,1,0],shape:"petal",blend:"alpha",glow:0,spin:2.5}),j({id:"leaves",name:"落葉",loop:!0,rate:4,burst:0,life:[4,8],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.2,0],spread:40,gravity:.5,drag:.7,turbulence:1,size:[.12,.11],colors:["#ffc14d","#e8743b"],alpha:[0,1,0],shape:"leaf",blend:"alpha",glow:0,spin:3}),j({id:"hearts",name:"愛心",burst:14,life:[1,1.6],emitter:"sphere",area:.3,speed:[.8,1.6],direction:[0,1,0],spread:40,gravity:-1,drag:1,size:[.18,.1],colors:["#ff6f9c","#ff3d6e"],alpha:[1,1,0],shape:"heart",blend:"alpha",glow:.4,spin:1}),j({id:"level-up",name:"升級",burst:50,rate:30,duration:1,life:[.9,1.5],emitter:"ring",area:.6,speed:[1.5,3],direction:[0,1,0],spread:6,gravity:-1,orbit:3,size:[.12,.02],colors:["#ffffff","#ffe066","#ffab00"],alpha:[1,1,0],shape:"star",glow:1.8,spin:3}),j({id:"dust",name:"塵土",burst:18,life:[.6,1.1],emitter:"disc",area:.35,speed:[.6,1.6],direction:[0,.3,0],spread:80,gravity:-.2,drag:2.4,size:[.15,.5],colors:["#e8dcc0","#c9b896"],alpha:[.55,.35,0],shape:"smoke",blend:"alpha",glow:0,spin:.8}),j({id:"eat",name:"吃掉",burst:36,life:[.35,.7],emitter:"sphere",area:.5,speed:[-2.4,-1.2],spread:180,drag:1,size:[.1,.02],colors:["#ffffff","#b6ffd9","#22d38a"],alpha:[1,1,0],shape:"star",glow:1.6,spin:4}),j({id:"fire-breath",name:"噴火",loop:!0,rate:120,burst:0,life:[.35,.7],emitter:"point",speed:[7,10],direction:[0,0,1],spread:14,gravity:-1.5,drag:1.6,turbulence:1,size:[.14,.72],colors:["#ffe08a","#ff9a3a","#ff4a2a","#5a2a24"],alpha:[.85,.7,0],shape:"soft",glow:1}),j({id:"rain",name:"雨",loop:!0,rate:700,burst:0,life:[.6,.9],emitter:"box",area:22,speed:[14,17],direction:[.08,-1,.05],spread:2,size:[.025,.025],colors:["#cfe6ff","#cfe6ff"],alpha:[.5,.5,.2],shape:"spark",blend:"alpha",stretch:2.2,glow:0}),j({id:"bubbles",name:"氣泡",loop:!0,rate:7,burst:0,life:[3,5],emitter:"disc",area:.3,speed:[.5,1.1],direction:[0,1,0],spread:12,gravity:-.5,drag:.4,turbulence:.7,size:[.06,.14],colors:["#ffffff","#c8f4ff"],alpha:[.7,.55,0],shape:"ring",blend:"alpha",glow:.2}),j({id:"embers",name:"餘燼",loop:!0,rate:26,burst:0,life:[2,4],emitter:"sphere",area:3,speed:[.3,1.1],direction:[0,1,0],spread:70,gravity:-.7,drag:.6,turbulence:1.4,size:[.05,.02],colors:["#ffd27a","#ff7a2a","#a8321a"],alpha:[1,.9,0],shape:"spark",glow:1.6}),j({id:"snow",name:"雪",loop:!0,rate:160,burst:0,life:[5,8],emitter:"box",area:22,speed:[.6,1.2],direction:[.1,-1,0],spread:15,turbulence:.6,size:[.06,.06],colors:["#ffffff","#f2f8ff"],alpha:[0,1,.8],shape:"snow",blend:"alpha",glow:.2,spin:1})];function ba(t){return tt.find(a=>a.id===t)}const fe=4;class ga{constructor(a,o,e=4e3){this.env=a,this.world=o,this.budget=e,this.group.name="l3d-particles"}env;world;group=new De;emitters=[];time=0;quad=new vt(1,1);budget;material(a){const o=a.colors.slice(0,fe);for(;o.length<2;)o.push(o[0]||"#ffffff");const e=Array.from({length:fe},(l,n)=>new q(o[Math.min(n,o.length-1)])),s=a.blend==="add";return new Xe({uniforms:{...this.env,tWorld:{value:this.world.texture},uResolution:{value:this.world.resolution},uNow:{value:0},uColors:{value:e},uKeys:{value:o.length},uAlpha:{value:new P(...a.alpha)},uSize:{value:new D(...a.size)},uGravity:{value:a.gravity},uDrag:{value:a.drag},uTurb:{value:a.turbulence},uOrbit:{value:a.orbit},uSpin:{value:a.spin},uStretch:{value:a.stretch},uGlow:{value:a.glow},uShape:{value:Nt[a.shape]??0},uAdditive:{value:s?1:0},uOrigin:{value:new P},uLocal:{value:a.world?0:1}},vertexShader:Ft,fragmentShader:Bt,transparent:!0,depthWrite:!1,depthTest:!0,blending:s?bt:gt})}play(a,o,e={}){const s=a.rate*Math.max(...a.life)+a.burst,l=this.emitters.reduce((b,w)=>b+(w.done?0:w.capacity),0),n=Math.max(8,Math.min(Math.ceil(s*1.15)+4,Math.max(64,this.budget-l))),u=new xt;u.index=this.quad.index,u.setAttribute("position",this.quad.getAttribute("position")),u.setAttribute("uv",this.quad.getAttribute("uv"));const i=new be(new Float32Array(n*4).fill(-1e5),4).setUsage(ge),h=new be(new Float32Array(n*4),4).setUsage(ge),c=new be(new Float32Array(n*4),4).setUsage(ge);u.setAttribute("aBirth",i),u.setAttribute("aMotion",h),u.setAttribute("aExtra",c),u.instanceCount=n;const f=this.material(a),v=new Pe(u,f);v.frustumCulled=!1,v.layers.set(et),v.renderOrder=a.blend==="add"?20:15,this.group.add(v);const p=new L;if(e.direction){const b=e.direction.clone().normalize(),w=Math.abs(b.y)>.95?new P(1,0,0):new P(0,1,0),S=new P().crossVectors(w,b).normalize(),A=new P().crossVectors(b,S);p.makeBasis(S,A,b)}e.scale&&p.scale(new P(e.scale,e.scale,e.scale));const d={effect:a,mesh:v,geometry:u,birth:i,motion:h,extra:c,capacity:n,cursor:0,running:!0,elapsed:0,carry:0,origin:o.clone(),matrix:p,follow:e.follow,random:Tt(Math.random()*1e9|0),done:!1};return this.emitters.push(d),this.spawn(d,a.burst),d}stop(a){const o=this.emitters.find(e=>e===a);o&&(o.running=!1)}aim(a,o){const e=this.emitters.find(i=>i===a);if(!e)return;const s=o.clone().normalize(),l=Math.abs(s.y)>.95?new P(1,0,0):new P(0,1,0),n=new P().crossVectors(l,s).normalize(),u=new P().crossVectors(s,n);e.matrix.makeBasis(n,u,s)}stopAll(){for(const a of this.emitters)a.running=!1}spawn(a,o){const e=a.effect,s=new P(...e.direction);s.lengthSq()<1e-6&&s.set(0,1,0),s.normalize();const l=Math.min(180,Math.max(0,e.spread))*Math.PI/180,n=new P,u=new P,i=new P,h=Math.abs(s.y)>.95?new P(1,0,0):new P(0,1,0),c=new P().crossVectors(h,s).normalize(),f=new P().crossVectors(s,c);for(let v=0;v<o;v++){const p=a.random;switch(e.emitter){case"sphere":{n.set(p()*2-1,p()*2-1,p()*2-1),n.lengthSq()>1&&n.normalize(),u.copy(n).multiplyScalar(e.area);break}case"disc":{const k=p()*Math.PI*2,G=Math.sqrt(p())*e.area;u.copy(c).multiplyScalar(Math.cos(k)*G).addScaledVector(f,Math.sin(k)*G);break}case"ring":{const k=p()*Math.PI*2;u.copy(c).multiplyScalar(Math.cos(k)*e.area).addScaledVector(f,Math.sin(k)*e.area);break}case"box":u.set((p()-.5)*2*e.area,(p()-.5)*.5*e.area+e.area*.3,(p()-.5)*2*e.area);break;case"line":u.copy(s).multiplyScalar((p()-.5)*2*e.area);break;case"cone":{const k=p()*Math.PI*2,G=p()*e.area;u.copy(c).multiplyScalar(Math.cos(k)*G).addScaledVector(f,Math.sin(k)*G);break}default:u.set(0,0,0)}const d=p()*Math.PI*2,b=Math.acos(1-p()*(1-Math.cos(l)));i.copy(s).multiplyScalar(Math.cos(b)).addScaledVector(c,Math.sin(b)*Math.cos(d)).addScaledVector(f,Math.sin(b)*Math.sin(d)),e.emitter==="sphere"&&e.spread>=179&&i.copy(u).normalize();const w=e.speed[0]+p()*(e.speed[1]-e.speed[0]);u.applyMatrix4(a.matrix),i.transformDirection(a.matrix).multiplyScalar(w);const S=e.world?a.origin:new P,A=a.cursor;a.birth.setXYZW(A,S.x+u.x,S.y+u.y,S.z+u.z,this.time),a.motion.setXYZW(A,i.x,i.y,i.z,e.life[0]+p()*(e.life[1]-e.life[0])),a.extra.setXYZW(A,p(),.7+p()*.6,p()<.5?-1:1,p()),a.cursor=(a.cursor+1)%a.capacity}a.birth.needsUpdate=!0,a.motion.needsUpdate=!0,a.extra.needsUpdate=!0}update(a){this.time+=a;for(const o of this.emitters){if(o.follow){const s=o.follow();s?o.origin.copy(s):o.running=!1}const e=o.mesh.material.uniforms;if(e.uNow.value=this.time,e.uOrigin.value.copy(o.origin),o.running){if(o.elapsed+=a,!o.effect.loop&&o.elapsed>=o.effect.duration)o.running=!1;else if(o.effect.rate>0){o.carry+=o.effect.rate*a;const s=Math.floor(o.carry);s>0&&(o.carry-=s,this.spawn(o,Math.min(s,o.capacity)))}}!o.running&&!o.done&&(o.stoppedAt??=this.time,this.time-o.stoppedAt>Math.max(...o.effect.life)+.2&&(o.done=!0))}for(const o of this.emitters.filter(e=>e.done))this.group.remove(o.mesh),o.geometry.dispose(),o.mesh.material.dispose();this.emitters=this.emitters.filter(o=>!o.done)}get active(){return this.emitters.length}dispose(){for(const a of this.emitters)a.geometry.dispose(),a.mesh.material.dispose();this.emitters=[],this.quad.dispose()}}const Ft=`
${Je}${Ye}
attribute vec4 aBirth;
attribute vec4 aMotion;
attribute vec4 aExtra;
uniform float uNow;
uniform vec3 uColors[${fe}];
uniform int uKeys;
uniform vec3 uAlpha;
uniform vec2 uSize;
uniform float uGravity;
uniform float uDrag;
uniform float uTurb;
uniform float uOrbit;
uniform float uSpin;
uniform float uStretch;
uniform vec3 uOrigin;
uniform float uLocal;
varying vec2 vUv;
varying vec4 vColor;
varying float vViewZ;
varying float vSeed;
varying float vLife;
varying vec3 vWorld;
vec3 ramp(float t) {
  float x = t * float(uKeys - 1);
  int i = int(floor(x));
  float f = fract(x);
  vec3 a = uColors[0], b = uColors[1];
  for (int k = 0; k < ${fe-1}; k++) if (k == i) { a = uColors[k]; b = uColors[k + 1]; }
  if (i >= uKeys - 1) return uColors[uKeys - 1];
  return mix(a, b, f);
}
void main() {
  float age = uNow - aBirth.w;
  float life = aMotion.w;
  float t = age / life;
  vUv = uv;
  if (t < 0. || t > 1.) { gl_Position = vec4(2., 2., 2., 1.); return; }
  // Drag-integrated motion: v·(1−e^(−kt))/k, plus gravity (with drag terminal speed).
  float k = max(uDrag, .001);
  float travel = (1. - exp(-k * age)) / k;
  vec3 p = aBirth.xyz + aMotion.xyz * travel;
  p.y -= uGravity * (age - travel) / k;
  if (uTurb > 0.) {
    vec3 q = p * .7 + aExtra.x * 17.;
    p += (vec3(l3dNoise3(q + vec3(0., age * .6, 0.)), l3dNoise3(q + 11.3 + age * .5), l3dNoise3(q + 23.7 - age * .4)) - .5) * uTurb * age * 1.6;
  }
  if (uOrbit != 0.) {
    vec2 rel = p.xz - (uLocal > .5 ? vec2(0.) : uOrigin.xz);
    float a = uOrbit * age;
    rel = mat2(cos(a), -sin(a), sin(a), cos(a)) * rel;
    p.xz = rel + (uLocal > .5 ? vec2(0.) : uOrigin.xz);
  }
  if (uLocal > .5) p += uOrigin;
  float size = mix(uSize.x, uSize.y, t) * aExtra.y;
  float alpha = t < .5 ? mix(uAlpha.x, uAlpha.y, t * 2.) : mix(uAlpha.y, uAlpha.z, (t - .5) * 2.);
  vColor = vec4(ramp(t), alpha);
  vSeed = aExtra.x;
  vLife = t;
  vWorld = p;
  vec4 mv = viewMatrix * vec4(p, 1.);
  vec2 corner = (uv - .5);
  float ang = aExtra.x * 6.283 + uSpin * age * aExtra.z;
  if (uStretch > 0.) {
    // Stretch along the screen-space velocity.
    vec3 vel = aMotion.xyz * exp(-k * age) - vec3(0., uGravity * (1. - exp(-k * age)) / k, 0.);
    vec2 sv = (viewMatrix * vec4(vel, 0.)).xy;
    float sl = length(sv);
    vec2 d = sl > 1e-4 ? sv / sl : vec2(0., 1.);
    // (d.y, −d.x) keeps the quad's winding: the other side was mirrored and culled, so stretched sparks never drew.
    vec2 n = vec2(d.y, -d.x);
    float len = 1. + sl * uStretch * .12;
    mv.xy += d * corner.y * size * len + n * corner.x * size;
  } else {
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    mv.xy += rot * corner * size;
  }
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,Bt=`
${Je}${Ye}
uniform sampler2D tWorld;
uniform vec2 uResolution;
uniform float uGlow;
uniform float uShape;
uniform float uAdditive;
varying vec2 vUv;
varying vec4 vColor;
varying float vViewZ;
varying float vSeed;
varying float vLife;
varying vec3 vWorld;
float shapeMask(vec2 uv) {
  vec2 q = uv - .5;
  float r = length(q);
  if (uShape < .5) return smoothstep(.5, .0, r);
  if (uShape < 1.5) return smoothstep(.5, .1, abs(q.x) * 2.4 + abs(q.y) * .9) * smoothstep(.5, .3, r);
  if (uShape < 2.5) { float a = atan(q.y, q.x); float s = .16 + .2 * pow(abs(cos(a * 2.)), 6.); return smoothstep(s, s * .45, r) + smoothstep(.22, 0., r) * .6; }
  if (uShape < 3.5) return smoothstep(.06, 0., abs(r - .36)) ;
  if (uShape < 4.5) { vec2 e = q / vec2(.24, .44); return smoothstep(1., .75, length(e)); }
  if (uShape < 5.5) { float n = l3dNoise(uv * 4. + vSeed * 9.) * .5 + l3dNoise(uv * 8.3 + vSeed * 3.) * .3; return smoothstep(.5, .05, r + (n - .4) * .25); }
  if (uShape < 6.5) { float a = atan(q.y, q.x); float arm = smoothstep(.07, .0, abs(sin(a * 3.)) * r) * smoothstep(.48, .3, r); return max(arm, smoothstep(.12, .05, r)); }
  if (uShape < 7.5) { vec2 h = q * 2.4; h.y -= sqrt(abs(h.x)) * .55 - .1; return smoothstep(.62, .5, length(h)); }
  if (uShape < 8.5) { vec2 e = vec2(q.x * 2.2, q.y * 1.1); float leaf = smoothstep(.5, .42, length(e) + abs(q.x) * .2); return leaf * (1. - smoothstep(.015, .0, abs(q.x)) * .4); }
  if (uShape < 9.5) { vec2 d = q; d.y += .08; float drop = smoothstep(.32, .26, length(d * vec2(1., 1. - d.y * 1.2))); return drop; }
  return step(abs(q.x), .42) * step(abs(q.y), .28);
}
/**
 * Smoke and dust as little volumes, not flat discs: billowing density that churns and frays as the puff ages, shaded
 * like a soft ball of vapour — lit on the sun's side, cool sky light in the hollows, and glowing silver at its thin
 * edges when the sun is behind it (light scattered forward through the vapour).
 */
vec4 smokePuff() {
  vec2 q = vUv - .5;
  float r = length(q) * 2.;
  vec2 p = q * 2.4 + vSeed * 7.3;
  float t = uTime * .22;
  float n = l3dNoise(p * 1.6 + vec2(vSeed * 3., -t)) * .5 + l3dNoise(p * 3.7 + vec2(t * .7, -t * 1.3)) * .32 + l3dNoise(p * 8.3 - t * 2.) * .18;
  // Rounder and denser when young; wispy and eaten away by the time it fades.
  float erode = mix(.22, .62, vLife);
  float dens = smoothstep(1., .28, r + (n - .5) * (.55 + vLife * .5)) * smoothstep(erode - .2, erode + .25, n + (1. - r) * .45);
  if (dens < .01) return vec4(0.);
  // A pseudo-normal over the ball, roughened by the same noise, for the light.
  vec2 g = vec2(l3dNoise(p * 2.2 + 3.1) - l3dNoise(p * 2.2 - 3.1), l3dNoise(p * 2.2 + 7.7) - l3dNoise(p * 2.2 - 7.7));
  vec3 nrm = normalize(vec3(q * 2.1 + g * .7, sqrt(max(0., 1. - r * r)) + .2));
  vec3 sunV = normalize((viewMatrix * vec4(uSunDir, 0.)).xyz);
  float wrap = clamp(dot(nrm, sunV) * .55 + .45, 0., 1.);
  float through = pow(clamp(-sunV.z, 0., 1.), 3.) * (1. - dens * .75);
  vec3 sky = mix(uHemiGround, uHemiSky, nrm.y * .5 + .5);
  vec3 col = vColor.rgb * (sky * (.62 + .2 * nrm.y) + uSunColor * wrap * .62) + uSunColor * through * .9;
  // The fire under it and nearby lanterns light the vapour from inside (warm glowing smoke at night).
  vec3 lamps = vec3(0.);
  for (int i = 0; i < 8; i++) {
    if (i >= uLightCount) break;
    vec3 d = uLightPos[i].xyz - vWorld;
    float r = uLightPos[i].w, dist = length(d);
    if (dist > r) continue;
    float f = 1. - dist / r;
    lamps += uLightColor[i].rgb * uLightColor[i].a * f * f;
  }
  // By day the sun dominates (fire-tinted smoke in daylight reads as brown dust); at night the glow shows.
  col += vColor.rgb * lamps * (.24 + .3 * (1. - dens)) * mix(.3, 1., uNight);
  return vec4(col, dens);
}
void main() {
  bool puff = uShape > 4.5 && uShape < 5.5 && uAdditive < .5;
  vec4 smoke = puff ? smokePuff() : vec4(0.);
  float m = puff ? smoke.a : shapeMask(vUv);
  if (m < .01) discard;
  vec2 suv = gl_FragCoord.xy / uResolution;
  float world = texture(tWorld, suv).a;
  if (world < vViewZ) discard;
  // Soft where they meet surfaces, and never right in the camera's face.
  float soft = clamp((world - vViewZ) * (puff ? 1.2 : 2.5), 0., 1.) * smoothstep(.15, .6, vViewZ);
  float a = vColor.a * m * soft;
  vec3 col = vColor.rgb * (1. + uGlow);
  if (puff) {
    gl_FragColor = vec4(smoke.rgb, a);
  } else if (uAdditive < .5) {
    // Lit a little by the sky and sun so alpha particles sit in the scene.
    col *= mix(uHemiSky * 1.1 + uSunColor * .25, vec3(1.), .55);
    gl_FragColor = vec4(col, a);
  } else gl_FragColor = vec4(col, a);
}
`,at=["pop","gulp","splash","jump","land","morph","chime","coin","click","whoosh","break","fire","error","talk","levelup","boing","hit","slash","bow","pound","thunder","chomp","yum","hurt","flap","pickup","drop","chest","coins","swoosh","impact","sparkle","shutter"];let O=null,N=null,E=null,st=.7,$=1;const zt={pop:.08,gulp:.07,splash:.06,jump:.05,land:.07,boing:.06,hit:.08,slash:.06,bow:.05,pound:.05,chomp:.07,hurt:.04,flap:.08,drop:.05,break:.05,whoosh:.08,swoosh:.07,talk:0,fire:.06,impact:.03,sparkle:.04,coin:.015,click:.03};function ne(){if(!O)try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return null;O=new t,N=O.createGain(),N.gain.value=st,E=O.createBiquadFilter(),E.type="lowpass",E.frequency.value=2e4,E.Q.value=.5,N.connect(E),E.connect(O.destination)}catch{return null}return O.state==="suspended"&&O.resume().catch(()=>{}),O}function xa(){ne()}let Ie=0;function ya(t){const a=Math.max(0,Math.min(1,t));!O||!E||Math.abs(a-Ie)<.01||(Ie=a,E.frequency.setTargetAtTime(2e4*Math.pow(650/2e4,a),O.currentTime,.06))}function x(t,a,o,e,s,l,n,u=.005){const i=t.createOscillator(),h=t.createGain();i.type=a,i.frequency.setValueAtTime(o*$,s),i.frequency.exponentialRampToValueAtTime(Math.max(20,e*$),s+l),h.gain.setValueAtTime(0,s),h.gain.linearRampToValueAtTime(n,s+u),h.gain.exponentialRampToValueAtTime(1e-4,s+l),i.connect(h),h.connect(N),i.start(s),i.stop(s+l+.02)}function C(t,a,o,e,s,l=1,n="bandpass"){const u=Math.max(1,Math.floor(t.sampleRate*o)),i=t.createBuffer(1,u,t.sampleRate),h=i.getChannelData(0);for(let p=0;p<u;p++)h[p]=(Math.random()*2-1)*(1-p/u);const c=t.createBufferSource();c.buffer=i;const f=t.createBiquadFilter();f.type=n,f.frequency.value=s*$,f.Q.value=l;const v=t.createGain();v.gain.value=e,c.connect(f),f.connect(v),v.connect(N),c.start(a)}function Ge(t,a,o,e,s,l,n=1.2){const u=Math.max(1,Math.floor(t.sampleRate*o)),i=t.createBuffer(1,u,t.sampleRate),h=i.getChannelData(0);for(let p=0;p<u;p++)h[p]=Math.random()*2-1;const c=t.createBufferSource();c.buffer=i;const f=t.createBiquadFilter();f.type="bandpass",f.Q.value=n,f.frequency.setValueAtTime(s*$,a),f.frequency.exponentialRampToValueAtTime(Math.max(40,l*$),a+o);const v=t.createGain();v.gain.setValueAtTime(0,a),v.gain.linearRampToValueAtTime(e,a+o*.35),v.gain.exponentialRampToValueAtTime(1e-4,a+o),c.connect(f),f.connect(v),v.connect(N),c.start(a),c.stop(a+o+.02)}function wa(t,a=1,o={}){const e=ne();if(!e||!N||st<=0)return;const s=e.currentTime+.005,l=Math.max(.2,Math.min(1.5,a)),n=zt[t]??0;switch($=(o.pitch??1)*(1+(Math.random()*2-1)*n),t){case"pop":x(e,"sine",520,1180,s,.09,.25*l);break;case"boing":x(e,"triangle",180,520,s,.25,.22*l),x(e,"sine",360,900,s+.04,.18,.1*l);break;case"gulp":x(e,"sine",300,90,s,.18,.32*l),x(e,"sine",210,70,s+.12,.16,.22*l);break;case"splash":C(e,s,.35,.22*l,1800,.7),C(e,s+.05,.25,.12*l,900,1.2);break;case"jump":x(e,"triangle",210,560,s,.18,.26*l),x(e,"sine",520,1150,s+.03,.12,.12*l),C(e,s,.05,.05*l,2600,1.4);break;case"land":x(e,"sine",160,60,s,.14,.28*l),C(e,s,.08,.08*l,500,1);break;case"morph":x(e,"sine",200,900,s,.45,.18*l),x(e,"triangle",400,1600,s+.2,.4,.1*l),C(e,s,.5,.05*l,2400,2);break;case"chime":x(e,"sine",880,880,s,.5,.14*l),x(e,"sine",1320,1320,s+.09,.5,.1*l);break;case"coin":x(e,"square",988,988,s,.07,.08*l),x(e,"square",1319,1319,s+.07,.2,.08*l);break;case"click":x(e,"sine",900,700,s,.05,.12*l);break;case"talk":x(e,"triangle",500+Math.random()*200,420,s,.05,.06*l);break;case"whoosh":C(e,s,.4,.14*l,700,.6,"lowpass");break;case"break":C(e,s,.5,.3*l,300,.8,"lowpass"),x(e,"square",120,40,s,.3,.08*l);break;case"fire":C(e,s,.6,.16*l,1200,.5);break;case"error":x(e,"square",220,180,s,.15,.08*l),x(e,"square",180,150,s+.14,.2,.08*l);break;case"levelup":[523,659,784,1047].forEach((u,i)=>x(e,"triangle",u,u,s+i*.09,.3,.12*l));break;case"hit":x(e,"sine",240,70,s,.14,.3*l),C(e,s,.09,.16*l,1400,.9);break;case"slash":C(e,s,.22,.18*l,3200,1.4,"highpass"),x(e,"sine",1400,600,s,.12,.04*l);break;case"bow":x(e,"triangle",190,110,s,.16,.14*l),C(e,s+.02,.2,.1*l,2600,1.2);break;case"pound":x(e,"sine",110,38,s,.45,.4*l),C(e,s,.4,.24*l,260,.7,"lowpass");break;case"thunder":C(e,s,2.4,.32*l,140,.5,"lowpass"),C(e,s+.05,.5,.18*l,900,.6);break;case"chomp":C(e,s,.07,.26*l,2300,1.6),x(e,"square",330,120,s,.06,.07*l),C(e,s+.06,.16,.16*l,700,1.1),x(e,"sine",260,80,s+.12,.2,.3*l);break;case"yum":[784,988,1319].forEach((u,i)=>x(e,"triangle",u,u*1.01,s+i*.06,.22,.1*l)),x(e,"sine",2637,2637,s+.2,.3,.05*l);break;case"hurt":x(e,"sawtooth",420,160,s,.22,.1*l),x(e,"sine",300,110,s,.25,.2*l),C(e,s,.12,.1*l,1800,1);break;case"flap":C(e,s,.16,.12*l,520,.7,"lowpass"),C(e,s+.02,.1,.05*l,1400,.8);break;case"pickup":x(e,"triangle",523,523,s,.1,.1*l),x(e,"triangle",784,784,s+.08,.12,.1*l),x(e,"sine",1568,1568,s+.16,.25,.07*l),C(e,s,.06,.05*l,4e3,1.2,"highpass");break;case"chest":C(e,s,.25,.1*l,380,2.2),x(e,"triangle",196,230,s,.22,.08*l),[523,659,784,1047].forEach((u,i)=>x(e,"triangle",u,u,s+.2+i*.07,.32,.11*l)),x(e,"sine",2093,2093,s+.5,.5,.05*l);break;case"coins":for(let u=0;u<6;u++){const i=1800+Math.random()*900;x(e,"square",i,i*1.02,s+u*.055+Math.random()*.02,.07,.035*l),x(e,"sine",i*1.5,i*1.5,s+u*.055+.01,.12,.03*l)}break;case"drop":x(e,"triangle",392,262,s,.16,.12*l),C(e,s+.05,.1,.1*l,600,.9,"lowpass");break;case"swoosh":Ge(e,s,.32,.16*l,380,1500,1.6),Ge(e,s+.03,.26,.07*l,900,2600,3);break;case"impact":x(e,"sine",92,34,s,.7,.46*l,.004),x(e,"triangle",180,60,s,.28,.16*l),C(e,s,.55,.2*l,220,.6,"lowpass"),C(e,s,.06,.12*l,2400,1.2);break;case"sparkle":x(e,"sine",2637,2637,s,.22,.045*l),x(e,"sine",3520,3520,s+.05,.3,.035*l);break;case"shutter":C(e,s,.018,.3*l,3800,1.4,"highpass"),C(e,s+.02,.05,.1*l,1600,1.1),C(e,s+.075,.025,.2*l,2800,1.4,"highpass"),x(e,"sine",1200,900,s+.075,.04,.04*l);break}$=1}let xe=null;function ka(t){const a=ne();if(!(!a||!N)){if(!xe){if(t<=.001)return;const o=a.sampleRate*2,e=a.createBuffer(1,o,a.sampleRate),s=e.getChannelData(0);for(let h=0;h<o;h++)s[h]=Math.random()*2-1;const l=a.createBufferSource();l.buffer=e,l.loop=!0;const n=a.createBiquadFilter();n.type="bandpass",n.frequency.value=1500,n.Q.value=.5;const u=a.createBiquadFilter();u.type="lowpass",u.frequency.value=5200;const i=a.createGain();i.gain.value=0,l.connect(n),n.connect(u),u.connect(i),i.connect(N),l.start(),xe={gain:i,src:l}}xe.gain.gain.setTargetAtTime(Math.max(0,Math.min(1,t))*.2,a.currentTime,.9)}}function rt(t,a=2){const o=t.sampleRate*a,e=t.createBuffer(1,o,t.sampleRate),s=e.getChannelData(0);for(let n=0;n<o;n++)s[n]=Math.random()*2-1;const l=t.createBufferSource();return l.buffer=e,l.loop=!0,l}let ie=null,me=null,K=0;function Ta(t){const a=ne();if(!(!a||!N)){if(K=Math.max(0,Math.min(1,t)),!ie){if(K<=.001)return;const o=rt(a),e=a.createBiquadFilter();e.type="bandpass",e.frequency.value=180,e.Q.value=.9;const s=a.createOscillator();s.type="sawtooth",s.frequency.value=96;const l=a.createOscillator();l.frequency.value=5.5;const n=a.createGain();n.gain.value=9,l.connect(n),n.connect(s.frequency);const u=a.createBiquadFilter();u.type="lowpass",u.frequency.value=420;const i=a.createGain();i.gain.value=.18;const h=a.createGain();h.gain.value=0,o.connect(e),e.connect(h),s.connect(u),u.connect(i),i.connect(h),h.connect(N),o.start(),s.start(),l.start(),ie={gain:h,stop:()=>{try{o.stop(),s.stop(),l.stop()}catch{}h.disconnect()}},me=setInterval(()=>{const c=O;if(!c||!N||K<.02||Math.random()>.55)return;const f=c.currentTime+Math.random()*.15;C(c,f,.03+Math.random()*.05,(.06+Math.random()*.12)*K,1800+Math.random()*2600,2)},90)}ie.gain.gain.setTargetAtTime(K*.55,a.currentTime,.25)}}let X=null;function Ca(t,a=0){const o=ne();if(!o||!N)return;const e=Math.max(0,Math.min(1,t));if(!X){if(e<=.001)return;const l=rt(o,3),n=o.createBiquadFilter();n.type="bandpass",n.frequency.value=420,n.Q.value=.7;const u=o.createBiquadFilter();u.type="lowpass",u.frequency.value=1400;const i=o.createGain();i.gain.value=0,l.connect(n),n.connect(u),u.connect(i),i.connect(N),l.start(),X={gain:i,band:n,stop:()=>{try{l.stop()}catch{}i.disconnect()}}}const s=Math.max(0,Math.min(1,a));X.gain.gain.setTargetAtTime(e*(.035+s*.11),o.currentTime,.6),X.band.frequency.setTargetAtTime(340+s*420,o.currentTime,.8)}function ja(){ie?.stop(),X?.stop(),K=0,me&&(clearInterval(me),me=null),ie=null,X=null}const Ce={say:["說話","Say"],dialogue:["對話卡","Dialogue card"],set:["設定變數","Set variable"],if:["條件判斷","If"],wait:["等待","Wait"],effect:["粒子特效","Effect"],sound:["音效","Sound"],move:["移動","Move"],teleport:["傳送玩家","Teleport player"],show:["顯示物件","Show"],hide:["隱藏物件","Hide"],destroy:["移除物件","Remove"],goto:["前往卡片","Go to card"],ui:["顯示介面","UI screen"],form:["給予變身","Give a form"],camera:["鏡頭","Camera"],weather:["天氣與時間","Weather & time"],finish:["結束這張卡","Finish card"],choice:["選項","Choice"]};let ye=0;function Ot(t,a={}){ye=(ye+1)%1e6;const o={say:{speaker:"",text:"你好！"},set:{variable:"",op:"set",value:1},if:{variable:"",op:"eq",value:1,then:[],else:[]},wait:{seconds:1},effect:{effect:"sparkle",target:"self"},sound:{sound:"chime"},move:{target:"self",to:[0,0,0],seconds:1},teleport:{to:[0,0,0]},show:{target:""},hide:{target:"self"},destroy:{target:"self"},goto:{card:""},ui:{screen:"",visible:!0},form:{creature:"bird"},camera:{shake:.4},weather:{weather:"clear"},choice:{text:"要怎麼做？",options:[{label:"好",steps:[]},{label:"不要",steps:[]}]}};return{id:`st${Date.now().toString(36).slice(-4)}${ye.toString(36)}`,kind:t,...o[t]||{},...a}}function we(t,a=new Set,o=new Set){for(const e of t){e.kind==="set"&&e.variable&&(o.add(e.variable),e.op&&e.op!=="set"&&a.add(e.variable)),e.kind==="if"&&e.variable&&a.add(e.variable);for(const s of(e.text||"").matchAll(/\{\{\s*([\w.-]+)\s*\}\}/g))a.add(s[1]);e.then&&we(e.then,a,o),e.else&&we(e.else,a,o);for(const s of e.options||[])we(s.steps,a,o)}return{reads:a,writes:o}}function ke(t,a=new Set){for(const o of t){(o.kind==="goto"||o.kind==="dialogue")&&o.card&&a.add(o.card),o.then&&ke(o.then,a),o.else&&ke(o.else,a);for(const e of o.options||[])ke(e.steps,a)}return a}const je={helmet:{id:"helmet",name:"黃金頭盔",slot:"head",effect:"生命多 1 顆心",hearts:1,icon:"shield"},armor:{id:"armor",name:"黃金鎧甲",slot:"body",effect:"生命多 2 顆心",hearts:2,icon:"shield"},"flame-armor":{id:"flame-armor",name:"防火鎧甲",slot:"body",effect:"不怕火和熔岩・生命多 1 顆心",hearts:1,fireproof:!0,icon:"flame"},"frost-scarf":{id:"frost-scarf",name:"保暖圍巾",slot:"neck",effect:"在冰川不會冷到受傷",warm:!0,icon:"gem"}},Lt=Object.keys(je),Se=new I({color:"#ffd45a",metalness:.82,roughness:.2,emissive:"#7a4f00",emissiveIntensity:.5}),W=new I({color:"#e0a62a",metalness:.85,roughness:.28,emissive:"#5a3500",emissiveIntensity:.45}),qt=new I({color:"#b3262e",metalness:.7,roughness:.3,emissive:"#2a0505",emissiveIntensity:.4}),Ee=new I({color:"#e5484d",roughness:.65}),It=new I({color:"#ff3b55",metalness:.2,roughness:.1,emissive:"#c4122e",emissiveIntensity:.9}),Gt=new I({color:"#4fb6ff",metalness:.2,roughness:.1,emissive:"#1a6fd1",emissiveIntensity:.9}),Ve=new I({color:"#ffb347",emissive:"#ff7a1a",emissiveIntensity:2.2,roughness:.4}),Te=new I({color:"#7cc8f2",roughness:.85}),Et=new I({color:"#f4f8ff",roughness:.85});function R(t,a,o=0,e=0,s=0,l=0,n=0,u=0){const i=new Pe(t,a);return i.position.set(o,e,s),i.rotation.set(l,n,u),i.castShadow=!0,i}function ae(t,a,o,e=1.05,s=Se){const l=Math.acos(Math.max(-1,Math.min(1,(t-.34)/.36))),n=Math.acos(Math.max(-1,Math.min(1,(a-.34)/.36))),u=new se(1,48,16,Math.PI/2-o/2,o,l,n-l),i=R(u,s,0,.34,0);return i.scale.set(.62*e,.36*e,.62*e),i.material.side=kt,i}function Vt(t){const a=new De;if(t==="helmet"){a.add(ae(.71,.61,Math.PI*2,1.06)),a.add(ae(.625,.585,Math.PI*2,1.09,W)),a.add(R(new ce(.05,.14,.5),W,0,.73,-.02));for(const o of[-1,1])a.add(R(new se(.11,16,10,0,Math.PI*2,0,Math.PI/2),Se,o*.45,.6,.1,0,0,o*-1.2));a.add(R(new yt(.08,.34,12),Ee,0,.92,-.12,-.55));for(const o of[.02,-.1,-.22])a.add(R(new se(.06,10,8),Ee,0,.85-o*.2,o));a.add(R(new ze(.055),Gt,0,.61,.55))}else if(t==="armor"||t==="flame-armor"){const o=t==="armor"?Se:qt;a.add(ae(.37,.13,Math.PI*2,1.045,o)),a.add(ae(.395,.345,Math.PI*2,1.075,W)),a.add(ae(.16,.1,Math.PI*2,1.075,W));for(let e=0;e<8;e++){const s=e/8*Math.PI*2,l=R(new ce(.035,.2,.035),W,Math.sin(s)*.665,.25,Math.cos(s)*.665,0,s,0);a.add(l)}a.add(R(new wt(.1,.08,.03,6),W,0,.26,.66,Math.PI/2,0,0)),a.add(R(new ze(.055),t==="armor"?It:Ve,0,.26,.69));for(const e of[-1,1])for(const[s,l]of[[1,.45],[.8,.38]]){const n=R(new se(.19*s,20,10,0,Math.PI*2,0,Math.PI/2),s===1?o:W,e*.56,l,-.02,0,0,e*-1.15);n.scale.set(1,.55,1.1),a.add(n)}if(t==="flame-armor")for(const e of[-.9,.9])a.add(R(new se(.045,10,8),Ve,Math.sin(e)*.66,.24,Math.cos(e)*.66))}else t==="frost-scarf"&&(a.add(R(new Oe(.6,.07,10,40),Te,0,.52,0,Math.PI/2)),a.add(R(new Oe(.6,.03,8,40),Et,0,.52,0,Math.PI/2)),a.add(R(new ce(.13,.3,.05),Te,.12,.38,-.62,.35,0,.12)),a.add(R(new ce(.12,.24,.05),Te,-.04,.4,-.64,.25,0,-.1)));return a}class Sa{group=new De;pieces=new Map;sway=0;set(a){for(const[o,e]of this.pieces)a.includes(o)||(this.group.remove(e),this.pieces.delete(o));for(const o of a)if(!this.pieces.has(o)){const e=Vt(o);this.pieces.set(o,e),this.group.add(e)}}update(a,o,e,s,l,n){if(this.group.visible=l&&this.pieces.size>0,!this.group.visible)return;this.sway+=a*(2+n),this.group.position.copy(o),this.group.rotation.set(0,e,0),this.group.scale.set(s.x,s.y,s.z);const u=this.pieces.get("frost-scarf");if(u){const i=Math.sin(this.sway*2.4)*(.15+Math.min(.4,n*.05));u.children[2].rotation.x=.35+i,u.children[3].rotation.x=.25-i*.8}}}const H=t=>t.controller==="slime",_t=()=>[m("hero","少年","人形主角（預設）"),m("heroine","少女","人形主角"),...le().filter(t=>t.value!=="hero"&&t.value!=="heroine"&&!J[t.value]?.boss)],m=(t,a,o)=>({value:t,label:a,hint:o}),Me=t=>[...tt.map(a=>m(a.id,a.name,"內建")),...t.effects],le=()=>Object.keys(J).map(t=>m(t,J[t].name,J[t].abilityName)),_e=()=>[m("interact","靠近按互動鍵","玩家走到旁邊按 E／互動"),m("touch","碰到就觸發"),m("start","場景一開始"),m("timer","每隔一段時間"),m("eaten","被史萊姆吃掉時"),m("hit","被攻擊時","被撞、被劍砍、被箭射中或被火燒到"),m("leave","玩家離開範圍")],Wt={player:[{key:"controller",kind:"select",label:"主角",options:()=>[m("character","人物或動物","選一個外觀，或用自己做的模型"),m("slime","史萊姆","會吃東西變身、升級、學技能")]},{key:"creature",kind:"select",label:"主角外觀",options:_t,when:t=>!H(t)},{key:"model",kind:"select",label:"自己做的模型（優先）",options:t=>[m("","不用，用上面的外觀"),...t.models],when:t=>!H(t)},{key:"look",kind:"select",label:"史萊姆樣子",options:()=>[m("water","圓潤水球（預設）","一整團圓圓的清水，表面輕輕流動，有大眼睛"),m("cute","果凍水滴","頭上有一點尖的果凍"),m("liquid","低矮流體","貼著地面的一灘，裡面有氣泡")],when:H},{key:"color",kind:"color",label:"史萊姆顏色",when:H},{key:"formJelly",kind:"number",label:"變身後保留的史萊姆質感",min:0,max:1,step:.05,when:t=>H(t)&&(t.look??"water")==="water"},{key:"speed",kind:"number",label:"移動速度",min:1,max:14,step:.1},{key:"jump",kind:"number",label:"跳躍力",min:2,max:18,step:.1},{key:"weapon",kind:"select",label:"一開始拿的武器（F 鍵／點一下）",options:()=>[m("none","空手（衝撞）","整個身體撞過去"),m("sword","劍","大範圍揮砍"),m("bow","弓箭","射向鏡頭看的地方"),m("staff","金箍棒","轉圈橫掃")]},{key:"name",kind:"text",label:"名字（頭上顯示）",placeholder:"留空就不顯示"},{key:"hearts",kind:"number",label:"生命（顆心，0 = 不會受傷）",min:0,max:12,step:1},{key:"pickColor",kind:"bool",label:"開始時讓玩家選史萊姆顏色",when:H},{key:"skills",kind:"bool",label:"技能樹與背包（B）",hint:"升級得到技能點，可以學二段跳、唾液、暴食…",when:H}],camera:[{key:"mode",kind:"select",label:"鏡頭方式",options:()=>[m("follow","跟隨（第三人稱）"),m("orbit","環繞"),m("top","俯視"),m("side","側面捲軸"),m("fixed","固定"),m("first","第一人稱")]},{key:"distance",kind:"number",label:"距離",min:2,max:40,step:.5,unit:"m"},{key:"pitch",kind:"number",label:"俯角",min:-.5,max:1.4,step:.01},{key:"fov",kind:"number",label:"視角",min:25,max:90,step:1,unit:"°"}],collider:[{key:"shape",kind:"select",label:"形狀",options:()=>[m("auto","自動（照模型）"),m("box","方塊"),m("circle","圓柱")]},{key:"solid",kind:"bool",label:"擋住玩家",hint:"關掉就能穿過去"},{key:"stand",kind:"bool",label:"可以站在上面"}],physics:[{key:"body",kind:"select",label:"形體",options:()=>[m("ball","球"),m("box","箱子")]},{key:"mass",kind:"number",label:"重量",min:.1,max:20,step:.1},{key:"bounce",kind:"number",label:"彈性",min:0,max:1,step:.01},{key:"friction",kind:"number",label:"摩擦",min:0,max:1,step:.01},{key:"float",kind:"bool",label:"浮在水上"}],trigger:[{key:"radius",kind:"number",label:"範圍半徑",min:.3,max:20,step:.1,unit:"m"},{key:"once",kind:"bool",label:"只觸發一次"}],event:[{key:"trigger",kind:"select",label:"什麼時候開始",options:_e},{key:"prompt",kind:"text",label:"互動提示文字",placeholder:"查看"},{key:"once",kind:"bool",label:"只發生一次"}],dialogue:[{key:"trigger",kind:"select",label:"什麼時候說話",options:_e},{key:"card",kind:"select",label:"使用白板上的對話卡",options:t=>[m("","不使用，直接寫台詞"),...t.dialogueCards]},{key:"prompt",kind:"text",label:"互動提示文字",placeholder:"對話"}],animator:[{key:"clip",kind:"select",label:"動作",options:()=>[m("idle","待機呼吸"),m("walk","走路"),m("hop","跳跳"),m("wave","揮手"),m("dance","跳舞"),m("spin","轉圈")]},{key:"speed",kind:"number",label:"速度",min:.1,max:3,step:.05}],particles:[{key:"effect",kind:"select",label:"特效",options:Me},{key:"loop",kind:"bool",label:"持續播放"}],audio:[{key:"sound",kind:"select",label:"音效",options:()=>at.map(t=>m(t,t))},{key:"loop",kind:"bool",label:"重複播放"},{key:"volume",kind:"number",label:"音量",min:0,max:1,step:.01},{key:"radius",kind:"number",label:"聽得到的距離",min:1,max:60,step:.5,unit:"m"}],light:[{key:"color",kind:"color",label:"燈光顏色"},{key:"intensity",kind:"number",label:"亮度",min:0,max:8,step:.1},{key:"radius",kind:"number",label:"照亮範圍",min:1,max:30,step:.5,unit:"m"},{key:"nightOnly",kind:"bool",label:"只在晚上亮"}],spin:[{key:"axis",kind:"select",label:"旋轉軸",options:()=>[m("y","上下軸（水平轉）"),m("x","左右軸"),m("z","前後軸")]},{key:"speed",kind:"number",label:"速度",min:-6,max:6,step:.05}],float:[{key:"height",kind:"number",label:"上下幅度",min:0,max:3,step:.01,unit:"m"},{key:"speed",kind:"number",label:"速度",min:.1,max:4,step:.05}],patrol:[{key:"speed",kind:"number",label:"速度",min:.2,max:8,step:.1},{key:"wait",kind:"number",label:"每個點停留",min:0,max:10,step:.1,unit:"秒"}],follow:[{key:"target",kind:"select",label:"跟著誰",options:t=>[m("player","玩家"),...t.objects]},{key:"distance",kind:"number",label:"保持距離",min:.5,max:20,step:.1,unit:"m"},{key:"speed",kind:"number",label:"速度",min:.5,max:12,step:.1}],wander:[{key:"radius",kind:"number",label:"活動範圍",min:1,max:40,step:.5,unit:"m"},{key:"speed",kind:"number",label:"速度",min:.2,max:8,step:.1},{key:"shy",kind:"number",label:"怕生（看到玩家會跑）",min:0,max:12,step:.5,unit:"m"}],edible:[{key:"form",kind:"select",label:"吃掉後可以變成",options:t=>[m("","不能變身"),...le(),...t.models]},{key:"level",kind:"number",label:"需要的等級",min:1,max:20,step:1},{key:"respawn",kind:"number",label:"多久後重新出現",min:0,max:600,step:5,unit:"秒"}],breakable:[{key:"by",kind:"select",label:"怎麼破壞",options:()=>[m("heavy","怪力（石魔像）"),m("fire","火（小火龍）"),m("attack","被攻擊就破","衝撞、劍、弓箭都可以"),m("any","碰一下就破")]},{key:"effect",kind:"select",label:"破掉的特效",options:Me}],portal:[{key:"card",kind:"select",label:"前往白板上的卡片",options:t=>[m("","不換卡片，傳送到這個場景的位置"),...t.storyCards]},{key:"x",kind:"number",label:"傳送到 X",min:-500,max:500,step:.5},{key:"z",kind:"number",label:"傳送到 Z",min:-500,max:500,step:.5}],script:[],network:[{key:"sync",kind:"select",label:"同步什麼",options:()=>[m("transform","位置與方向","大家看到的位置一樣"),m("state","狀態（顯示／隱藏、被吃掉）"),m("none","不同步")]},{key:"owner",kind:"select",label:"由誰決定",options:()=>[m("host","房主","第一個進來的玩家"),m("player","最後碰到的玩家")]}],ui:[{key:"screen",kind:"select",label:"UI 畫面",options:t=>[m("","請選擇"),...t.screens]},{key:"show",kind:"select",label:"什麼時候顯示",options:()=>[m("always","一直顯示"),m("near","玩家靠近時"),m("interact","互動時")]}],billboard:[{key:"text",kind:"text",label:"頭上的文字"},{key:"color",kind:"color",label:"文字顏色"}],quest:[{key:"portrait",kind:"text",label:"立繪圖片網址（對話時顯示）",placeholder:"可留空"}],boss:[{key:"hp",kind:"number",label:"血量",min:5,max:300,step:1},{key:"title",kind:"text",label:"稱號（血條上面）",placeholder:"例如：熔岩山的守護者"},{key:"attack",kind:"select",label:"攻擊方式",options:()=>[m("slam","重擊地面","地面發紅後砸下，跳起來就能躲"),m("pounce","飛撲","壓低身子後撲向玩家")]},{key:"arena",kind:"number",label:"戰鬥範圍",min:6,max:60,step:1,unit:"m"},{key:"drop",kind:"select",label:"打敗後留下",options:()=>[m("none","什麼都不留"),...We()]}],region:[{key:"name",kind:"text",label:"地區名稱（進入時大字顯示）"},{key:"subtitle",kind:"text",label:"副標題",placeholder:"可留空"},{key:"radius",kind:"number",label:"範圍半徑",min:2,max:300,step:1,unit:"m"},{key:"inner",kind:"number",label:"中間不算的半徑（0 = 整個圓）",min:0,max:280,step:1,unit:"m"},{key:"climate",kind:"select",label:"氣候",options:()=>[m("none","一般"),m("cold","寒冷","沒有保暖圍巾會凍傷"),m("hot","炎熱","有火星飄著")]},{key:"above",kind:"bool",label:"只算這個高度以上",hint:"天空之城這類浮在空中的地方"}],hazard:[{key:"kind",kind:"select",label:"種類",options:()=>[m("fire","火焰","燒傷，防火裝備不怕"),m("cold","寒冰","凍傷，保暖裝備不怕"),m("spike","尖刺")]},{key:"radius",kind:"number",label:"範圍半徑",min:.3,max:20,step:.1,unit:"m"},{key:"damage",kind:"number",label:"扣幾顆心",min:1,max:5,step:1}],loot:[{key:"coins",kind:"number",label:"金幣（0 = 隨機）",min:0,max:999,step:1},{key:"item",kind:"select",label:"裡面還有",options:()=>[m("none","只有金幣"),...We()]}]};function We(){return[m("sword","劍"),m("bow","弓箭"),m("staff","金箍棒","轉圈橫掃，打得最重"),m("cloud","觔斗雲","按 C 騎上去，在天上飛來飛去"),m("helmet","頭盔","多一顆心"),m("armor","鎧甲","多兩顆心"),m("flame-armor","防火鎧甲","不怕火和熔岩"),m("frost-scarf","保暖圍巾","不怕冷")]}const Ht=[["玩法",["player","camera","event","dialogue","trigger","portal","edible","breakable","loot","quest","boss","region","hazard"]],["動作",["wander","patrol","follow","spin","float","animator","physics","collider"]],["效果",["particles","audio","light","billboard","ui"]],["進階",["script","network"]]];function _({label:t,value:a,min:o,max:e,step:s,unit:l,onChange:n,disabled:u}){const i=Math.abs(s)>=1?Math.round(a):Math.abs(s)>=.1?a.toFixed(1):a.toFixed(2);return r.jsxs("label",{className:"dsect-slider",children:[r.jsx("span",{children:t}),r.jsx("input",{type:"range",min:o,max:e,step:s,value:a,disabled:u,"aria-label":t,onChange:h=>n(Number(h.target.value))}),r.jsxs("b",{children:[i,l==="°"?"°":""]})]})}function ot({label:t,hint:a,value:o,onChange:e,disabled:s}){return r.jsxs("label",{className:"dsect-toggle"+(o?" on":""),children:[r.jsx("input",{type:"checkbox",checked:o,disabled:s,onChange:l=>e(l.target.checked)}),r.jsxs("span",{children:[r.jsx("b",{children:t}),a&&r.jsx("small",{children:a})]})]})}function $t({field:t,value:a,onChange:o,ctx:e}){const s=e.readOnly;if(t.kind==="number")return r.jsx(_,{label:t.label,value:Number(a)||0,min:t.min,max:t.max,step:t.step,unit:t.unit,disabled:s,onChange:o});if(t.kind==="bool")return r.jsx(ot,{label:t.label,hint:t.hint,value:!!a,disabled:s,onChange:o});if(t.kind==="color")return r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:t.label}),r.jsxs("div",{className:"l3d-row",style:{flex:"none"},children:[r.jsx("input",{type:"color",value:String(a||"#ffffff"),disabled:s,onChange:n=>o(n.target.value),"aria-label":t.label}),r.jsx("input",{value:String(a||""),disabled:s,onChange:n=>o(n.target.value),"aria-label":`${t.label}（色碼）`})]})]});if(t.kind==="text")return r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:t.label}),t.long?r.jsx("textarea",{value:String(a??""),placeholder:t.placeholder,disabled:s,onChange:n=>o(n.target.value)}):r.jsx("input",{value:String(a??""),placeholder:t.placeholder,disabled:s,onChange:n=>o(n.target.value)})]});const l=t.options(e);return r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:t.label}),r.jsx(V,{className:"l3d-select",ariaLabel:t.label,value:String(a??""),options:l,disabled:s,searchable:l.length>10,onChange:n=>o(n)})]})}function Ma({def:t,onChange:a,onDelete:o,onDuplicate:e,onFocus:s,ctx:l}){const[n,u]=re.useState(""),i=(p,d=!1)=>a({...t,...p},d),h=(p,d,b=!0)=>i({components:t.components.map(w=>w.id===p?d:w)},b),c=(p,d)=>{const b=t.components.slice(),w=p+d;w<0||w>=b.length||([b[p],b[w]]=[b[w],b[p]],i({components:b},!0))},f=(p,d,b=1)=>r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:d}),r.jsx("div",{className:"l3d-vec",children:["X","Y","Z"].map((w,S)=>r.jsxs("label",{children:[r.jsx("i",{children:w}),r.jsx("input",{type:"number",step:p==="r"?5:.1,value:Math.round(t[p][S]*b*100)/100,disabled:l.readOnly,"aria-label":`${d} ${w}`,onChange:A=>{const k=[...t[p]];k[S]=(Number(A.target.value)||0)/b,p==="s"&&(k[S]=Math.max(.05,k[S])),i({[p]:k})}})]},w))})]}),v=Ht.flatMap(([p,d])=>d.map(b=>({value:b,label:Ke[b][0],group:p})));return r.jsxs("div",{className:"l3d-panel-stack",children:[r.jsxs("section",{className:"dsect",children:[r.jsxs("header",{children:[r.jsx("span",{className:"dsect-icon",children:r.jsx(Le,{})}),r.jsxs("div",{children:[r.jsx("b",{children:t.name||"物件"}),r.jsx("small",{children:Zt(t)})]}),r.jsxs("div",{className:"dsect-head-tools",children:[r.jsx("button",{type:"button","aria-label":"對準這個物件",title:"對準（F）",onClick:s,children:r.jsx(Le,{})}),r.jsx("button",{type:"button","aria-label":t.hidden?"顯示":"隱藏","aria-pressed":!!t.hidden,disabled:l.readOnly,onClick:()=>i({hidden:!t.hidden}),children:t.hidden?r.jsx(jt,{}):r.jsx(St,{})}),r.jsx("button",{type:"button","aria-label":t.locked?"解鎖":"鎖定","aria-pressed":!!t.locked,disabled:l.readOnly,onClick:()=>i({locked:!t.locked}),children:t.locked?r.jsx(Pt,{}):r.jsx(Dt,{})})]})]}),r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:"名稱"}),r.jsx("input",{value:t.name,disabled:l.readOnly,maxLength:60,onChange:p=>i({name:p.target.value})})]}),f("p","位置"),f("r","旋轉（度）",180/Math.PI),f("s","大小"),t.type==="builtin"||t.type==="model"?r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:"顏色（套在整個物件上）"}),r.jsxs("div",{className:"l3d-row",style:{flex:"none"},children:[r.jsx("input",{type:"color",value:t.color||"#ffffff",disabled:l.readOnly,onChange:p=>i({color:p.target.value},!0),"aria-label":"物件顏色"}),r.jsx("button",{type:"button",disabled:l.readOnly||!t.color,onClick:()=>i({color:void 0},!0),children:"還原"})]})]}):null,r.jsxs("div",{className:"dsect-actions",children:[r.jsxs("button",{type:"button",disabled:l.readOnly,onClick:e,children:[r.jsx(At,{}),"複製"]}),r.jsxs("button",{type:"button",className:"danger",disabled:l.readOnly,onClick:o,children:[r.jsx(Y,{}),"刪除"]})]})]}),t.components.map((p,d)=>r.jsx(Kt,{comp:p,ctx:l,first:d===0,last:d===t.components.length-1,onChange:(b,w)=>h(p.id,b,w),onRemove:()=>i({components:t.components.filter(b=>b.id!==p.id)},!0),onMove:b=>c(d,b)},p.id)),r.jsxs("section",{className:"dsect",children:[r.jsxs("header",{children:[r.jsx("span",{className:"dsect-icon",children:r.jsx(ve,{})}),r.jsxs("div",{children:[r.jsx("b",{children:"新增元件"}),r.jsx("small",{children:"像 Unity 一樣，一個物件可以疊很多元件"})]})]}),r.jsx(V,{className:"l3d-select",ariaLabel:"新增元件",value:n,placeholder:"選擇要加上的元件…",options:v,searchable:!0,disabled:l.readOnly,onChange:p=>{u(""),p&&i({components:[...t.components,lt(p)]},!0)}})]})]})}function Zt(t){return t.type==="creature"?`生物・${J[t.ref]?.name||t.ref}`:{builtin:"建築與道具",model:"3D 模型卡",creature:"生物",light:"光源",effect:"粒子特效",empty:"空物件",spawn:"玩家出生點",text:"文字"}[t.type]||t.type}function Kt({comp:t,ctx:a,first:o,last:e,onChange:s,onRemove:l,onMove:n}){const u=(c,f)=>s({...t,props:{...t.props,[c]:f}},t.type!=="event"&&t.type!=="dialogue"&&t.type!=="script"),[i]=Ke[t.type],h=t.enabled!==!1;return r.jsxs("section",{className:"l3d-comp"+(h?"":" off"),children:[r.jsxs("header",{children:[r.jsx("input",{type:"checkbox",checked:h,disabled:a.readOnly,"aria-label":`啟用「${i}」`,onChange:c=>s({...t,enabled:c.target.checked?void 0:!1},!0)}),r.jsx("b",{children:i}),r.jsxs("div",{className:"dsect-head-tools",children:[r.jsx("button",{type:"button","aria-label":"往上移",disabled:o||a.readOnly,onClick:()=>n(-1),children:r.jsx(Ae,{})}),r.jsx("button",{type:"button","aria-label":"往下移",disabled:e||a.readOnly,onClick:()=>n(1),children:r.jsx(Qe,{})}),r.jsx("button",{type:"button",className:"l3d-danger","aria-label":`移除「${i}」`,disabled:a.readOnly,onClick:l,children:r.jsx(Y,{})})]})]}),r.jsxs("div",{children:[Wt[t.type].filter(c=>!c.when||c.when({...Fe[t.type],...t.props})).map(c=>r.jsx($t,{field:c,value:t.props[c.key]??Fe[t.type][c.key],ctx:a,onChange:f=>u(c.key,f)},c.key)),t.type==="dialogue"&&!t.props.card&&r.jsx(Xt,{lines:t.props.lines||[],ctx:a,onChange:c=>u("lines",c)}),t.type==="event"&&r.jsx(pe,{steps:t.props.steps||[],ctx:a,onChange:c=>u("steps",c)}),t.type==="quest"&&r.jsx(Jt,{quests:t.props.quests||[],ctx:a,onChange:c=>u("quests",c)}),t.type==="script"&&r.jsx(ea,{comp:t,ctx:a,onChange:c=>s({...t,props:{...t.props,...c}},!1)})]})]})}function Xt({lines:t,ctx:a,onChange:o}){return r.jsxs("div",{className:"l3d-steps",children:[t.map((e,s)=>r.jsxs("div",{className:"l3d-step",children:[r.jsxs("header",{children:["第 ",s+1," 句",r.jsx("div",{className:"dsect-head-tools",children:r.jsx("button",{type:"button",className:"l3d-danger","aria-label":`刪除第 ${s+1} 句`,disabled:a.readOnly,onClick:()=>o(t.filter((l,n)=>n!==s)),children:r.jsx(Y,{})})})]}),r.jsx("input",{value:e.speaker||"",placeholder:"說話的人（可留空）",disabled:a.readOnly,"aria-label":"說話的人",onChange:l=>o(t.map((n,u)=>u===s?{...n,speaker:l.target.value}:n))}),r.jsx("textarea",{value:e.text,disabled:a.readOnly,"aria-label":"台詞",onChange:l=>o(t.map((n,u)=>u===s?{...n,text:l.target.value}:n))})]},s)),r.jsx("div",{className:"dsect-actions",children:r.jsxs("button",{type:"button",disabled:a.readOnly,onClick:()=>o([...t,{speaker:"",text:""}]),children:[r.jsx(ve,{}),"新增台詞"]})})]})}const He=[["eat","吃掉生物","吃掉小動物"],["eat-prop","吃掉道具","吃掉道具"],["open","打開寶箱","打開寶箱"],["defeat","打倒 Boss","打倒 Boss"],["reach","到達地區","去那個地方"]],$e=t=>t.split(`
`).map(a=>a.trim()).filter(Boolean);function Jt({quests:t,ctx:a,onChange:o}){const e=a.readOnly,s=(i,h)=>o(t.map((c,f)=>f===i?{...c,...h}:c)),l=[m("","沒有"),...Lt.map(i=>m(i,je[i].name,je[i].effect))],n=i=>i==="eat"?[m("","任何生物"),...le()]:i==="eat-prop"?Ct.map(h=>m(h.id,h.name)):i==="defeat"?[...le().filter(h=>J[h.value]?.boss),...a.objects]:a.objects,u=(i,h)=>r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:i}),h]});return r.jsxs("div",{className:"l3d-steps",children:[t.map((i,h)=>r.jsxs("div",{className:"l3d-step",children:[r.jsxs("header",{children:["任務 ",h+1,"：",i.title||"未命名",r.jsxs("div",{className:"dsect-head-tools",children:[r.jsx("button",{type:"button","aria-label":"上移",disabled:e||h===0,onClick:()=>o(t.map((c,f)=>f===h-1?t[h]:f===h?t[h-1]:c)),children:r.jsx(Ae,{})}),r.jsx("button",{type:"button",className:"l3d-danger","aria-label":`刪除任務 ${h+1}`,disabled:e,onClick:()=>o(t.filter((c,f)=>f!==h)),children:r.jsx(Y,{})})]})]}),u("任務名稱",r.jsx("input",{value:i.title,disabled:e,onChange:c=>s(h,{title:c.target.value})})),u("接任務時說的話（一行一頁，最後一行是問句）",r.jsx("textarea",{value:i.offer.join(`
`),disabled:e,onChange:c=>s(h,{offer:$e(c.target.value)})})),r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:"要做什麼"}),r.jsx(V,{className:"l3d-select",ariaLabel:"要做什麼",value:i.goal.kind,disabled:e,options:He.map(([c,f])=>m(c,f)),onChange:c=>s(h,{goal:{...i.goal,kind:c,target:"",label:He.find(f=>f[0]===c)?.[2]||""}})})]}),r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:"對象"}),r.jsx(V,{className:"l3d-select",ariaLabel:"對象",value:i.goal.target||"",disabled:e,searchable:!0,options:n(i.goal.kind),onChange:c=>s(h,{goal:{...i.goal,target:c}})})]}),(i.goal.kind==="eat"||i.goal.kind==="eat-prop")&&r.jsx(_,{label:"數量",value:i.goal.count??1,min:1,max:30,step:1,disabled:e,onChange:c=>s(h,{goal:{...i.goal,count:c}})}),u("任務欄顯示",r.jsx("input",{value:i.goal.label,disabled:e,onChange:c=>s(h,{goal:{...i.goal,label:c.target.value}})})),u("還沒完成時說的話",r.jsx("input",{value:i.waiting||"",disabled:e,onChange:c=>s(h,{waiting:c.target.value})})),u("完成時說的話（一行一頁）",r.jsx("textarea",{value:i.thanks.join(`
`),disabled:e,onChange:c=>s(h,{thanks:$e(c.target.value)})})),r.jsx(_,{label:"獎勵金幣",value:i.reward.coins??0,min:0,max:500,step:5,disabled:e,onChange:c=>s(h,{reward:{...i.reward,coins:c||void 0}})}),r.jsx(_,{label:"獎勵技能點",value:i.reward.points??0,min:0,max:5,step:1,disabled:e,onChange:c=>s(h,{reward:{...i.reward,points:c||void 0}})}),r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:"獎勵裝備"}),r.jsx(V,{className:"l3d-select",ariaLabel:"獎勵裝備",value:i.reward.gear||"",disabled:e,options:l,onChange:c=>s(h,{reward:{...i.reward,gear:c||void 0}})})]}),r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:"接任務時先送的裝備"}),r.jsx(V,{className:"l3d-select",ariaLabel:"接任務時先送的裝備",value:i.gift||"",disabled:e,options:l,onChange:c=>s(h,{gift:c||void 0})})]})]},i.id)),r.jsx("div",{className:"dsect-actions",children:r.jsxs("button",{type:"button",disabled:e,onClick:()=>o([...t,{id:`q${Date.now().toString(36)}`,title:"新任務",offer:["可以幫我一個忙嗎？"],thanks:["謝謝你！"],goal:{kind:"eat",count:3,label:"吃掉小動物"},reward:{coins:10}}]),children:[r.jsx(ve,{}),"新增任務"]})})]})}const Yt=[["對話",["say","dialogue","choice"]],["變數與流程",["set","if","wait","goto","finish"]],["物件與玩家",["move","teleport","show","hide","destroy","form"]],["演出",["effect","sound","camera","weather","ui"]]];function pe({steps:t,ctx:a,onChange:o,depth:e=0}){const[s,l]=re.useState(""),n=Yt.flatMap(([i,h])=>h.map(c=>({value:c,label:Ce[c][0],group:i}))),u=(i,h)=>o(t.map((c,f)=>f===i?h:c));return r.jsxs("div",{className:"l3d-steps",children:[t.map((i,h)=>r.jsx(Qt,{s:i,ctx:a,depth:e,index:h,count:t.length,onChange:c=>u(h,c),onRemove:()=>o(t.filter((c,f)=>f!==h)),onMove:c=>{const f=t.slice(),v=h+c;v<0||v>=f.length||([f[h],f[v]]=[f[v],f[h]],o(f))}},i.id)),r.jsx(V,{className:"l3d-select",ariaLabel:"新增步驟",value:s,placeholder:t.length?"＋ 再加一個步驟…":"＋ 加上第一個步驟…",options:n,searchable:!0,disabled:a.readOnly||e>4,onChange:i=>{l(""),i&&o([...t,Ot(i)])}})]})}function Qt({s:t,ctx:a,depth:o,index:e,count:s,onChange:l,onRemove:n,onMove:u}){const i=d=>l({...t,...d}),h=a.readOnly,c=[m("self","這個物件"),m("player","玩家"),...a.objects],f=(d,b)=>r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:d}),b]}),v=(d,b,w,S)=>f(d,r.jsx(V,{className:"l3d-select",ariaLabel:d,value:b,options:w,disabled:h,searchable:w.length>10,onChange:S}));let p=null;switch(t.kind){case"say":p=r.jsxs(r.Fragment,{children:[r.jsx("input",{value:t.speaker||"",placeholder:"說話的人（可留空）",disabled:h,"aria-label":"說話的人",onChange:d=>i({speaker:d.target.value})}),r.jsx("textarea",{value:t.text||"",disabled:h,"aria-label":"台詞",placeholder:"可以用 {{變數名}} 顯示變數",onChange:d=>i({text:d.target.value})})]});break;case"dialogue":p=v("對話卡",t.card||"",[m("","請選擇"),...a.dialogueCards],d=>i({card:d}));break;case"goto":p=v("前往的卡片",t.card||"",[m("","請選擇"),...a.storyCards],d=>i({card:d}));break;case"set":p=r.jsxs(r.Fragment,{children:[r.jsx("input",{value:t.variable||"",placeholder:"變數名稱",disabled:h,"aria-label":"變數名稱",onChange:d=>i({variable:d.target.value})}),v("怎麼改",t.op||"set",[m("set","設為"),m("add","加上"),m("subtract","減去"),m("toggle","切換開關")],d=>i({op:d})),t.op!=="toggle"&&r.jsx("input",{value:String(t.value??""),placeholder:"值",disabled:h,"aria-label":"值",onChange:d=>i({value:d.target.value!==""&&Number.isFinite(Number(d.target.value))?Number(d.target.value):d.target.value})})]});break;case"if":p=r.jsxs(r.Fragment,{children:[r.jsx("input",{value:t.variable||"",placeholder:"變數名稱",disabled:h,"aria-label":"變數名稱",onChange:d=>i({variable:d.target.value})}),v("條件",t.op||"eq",[m("eq","等於"),m("neq","不等於"),m("gte","大於或等於"),m("lte","小於或等於")],d=>i({op:d})),r.jsx("input",{value:String(t.value??""),placeholder:"值",disabled:h,"aria-label":"比較的值",onChange:d=>i({value:d.target.value!==""&&Number.isFinite(Number(d.target.value))?Number(d.target.value):d.target.value})}),r.jsx("small",{className:"l3d-hint",children:"成立時"}),r.jsx(pe,{steps:t.then||[],ctx:a,depth:o+1,onChange:d=>i({then:d})}),r.jsx("small",{className:"l3d-hint",children:"不成立時"}),r.jsx(pe,{steps:t.else||[],ctx:a,depth:o+1,onChange:d=>i({else:d})})]});break;case"choice":p=r.jsxs(r.Fragment,{children:[r.jsx("textarea",{value:t.text||"",disabled:h,"aria-label":"問題",onChange:d=>i({text:d.target.value})}),(t.options||[]).map((d,b)=>r.jsxs("div",{className:"l3d-step",style:{borderLeftColor:"var(--larch-muted)"},children:[r.jsxs("header",{children:[r.jsx("input",{value:d.label,disabled:h,"aria-label":`選項 ${b+1}`,onChange:w=>i({options:(t.options||[]).map((S,A)=>A===b?{...S,label:w.target.value}:S)})}),r.jsx("div",{className:"dsect-head-tools",children:r.jsx("button",{type:"button",className:"l3d-danger","aria-label":`刪除選項 ${b+1}`,disabled:h||(t.options||[]).length<=1,onClick:()=>i({options:(t.options||[]).filter((w,S)=>S!==b)}),children:r.jsx(Y,{})})})]}),r.jsx(pe,{steps:d.steps,ctx:a,depth:o+1,onChange:w=>i({options:(t.options||[]).map((S,A)=>A===b?{...S,steps:w}:S)})})]},b)),r.jsx("div",{className:"dsect-actions",children:r.jsxs("button",{type:"button",disabled:h||(t.options||[]).length>=6,onClick:()=>i({options:[...t.options||[],{label:"新選項",steps:[]}]}),children:[r.jsx(ve,{}),"新增選項"]})})]});break;case"wait":p=r.jsx(_,{label:"秒數",value:t.seconds??1,min:.1,max:10,step:.1,disabled:h,onChange:d=>i({seconds:d})});break;case"effect":p=r.jsxs(r.Fragment,{children:[v("特效",t.effect||"sparkle",Me(a),d=>i({effect:d})),v("在哪裡",t.target||"self",c,d=>i({target:d}))]});break;case"sound":p=v("音效",t.sound||"chime",at.map(d=>m(d,d)),d=>i({sound:d}));break;case"move":p=r.jsxs(r.Fragment,{children:[v("移動誰",t.target||"self",c,d=>i({target:d})),r.jsx(Ze,{label:"到這個位置",value:t.to||[0,0,0],ro:h,onChange:d=>i({to:d})}),r.jsx(_,{label:"花多久",value:t.seconds??1,min:.1,max:10,step:.1,disabled:h,onChange:d=>i({seconds:d})})]});break;case"teleport":p=r.jsx(Ze,{label:"把玩家傳送到",value:t.to||[0,0,0],ro:h,onChange:d=>i({to:d})});break;case"show":case"hide":case"destroy":p=v("哪個物件",t.target||"self",c.filter(d=>d.value!=="player"),d=>i({target:d}));break;case"ui":p=r.jsxs(r.Fragment,{children:[v("UI 畫面",t.screen||"",[m("","請選擇"),...a.screens],d=>i({screen:d})),r.jsx(ot,{label:"顯示（關掉＝隱藏）",value:t.visible!==!1,disabled:h,onChange:d=>i({visible:d})})]});break;case"form":p=v("給史萊姆的變身",t.creature||"bird",[...le(),...a.models],d=>i({creature:d}));break;case"camera":p=r.jsx(_,{label:"鏡頭晃動",value:t.shake??.4,min:0,max:2,step:.05,disabled:h,onChange:d=>i({shake:d})});break;case"weather":p=r.jsxs(r.Fragment,{children:[v("天氣",t.weather||"clear",[m("clear","晴天"),m("cloudy","多雲"),m("rain","下雨"),m("storm","暴風雨"),m("snow","下雪"),m("fog","起霧")],d=>i({weather:d})),r.jsx(_,{label:"時間（不改請拉到 -1）",value:t.hour??-1,min:-1,max:24,step:.25,disabled:h,onChange:d=>i({hour:d<0?void 0:d})})]});break;case"finish":p=r.jsx("p",{className:"l3d-hint",children:"結束這張 3D 卡片，故事接到下一張卡。"});break}return r.jsxs("div",{className:"l3d-step",children:[r.jsxs("header",{children:[Ce[t.kind][0],r.jsxs("div",{className:"dsect-head-tools",children:[r.jsx("button",{type:"button","aria-label":"往上移",disabled:e===0||h,onClick:()=>u(-1),children:r.jsx(Ae,{})}),r.jsx("button",{type:"button","aria-label":"往下移",disabled:e===s-1||h,onClick:()=>u(1),children:r.jsx(Qe,{})}),r.jsx("button",{type:"button",className:"l3d-danger","aria-label":`刪除「${Ce[t.kind][0]}」`,disabled:h,onClick:n,children:r.jsx(Y,{})})]})]}),p]})}function Ze({label:t,value:a,ro:o,onChange:e}){return r.jsxs("div",{className:"l3d-field",children:[r.jsx("span",{children:t}),r.jsx("div",{className:"l3d-vec",children:["X","Y","Z"].map((s,l)=>r.jsxs("label",{children:[r.jsx("i",{children:s}),r.jsx("input",{type:"number",step:.5,value:a[l],disabled:o,"aria-label":`${t} ${s}`,onChange:n=>{const u=[...a];u[l]=Number(n.target.value)||0,e(u)}})]},s))})]})}function ea({comp:t,ctx:a,onChange:o}){const[e,s]=re.useState(!1),[l,n]=re.useState(""),[u,i]=re.useState(!1),h=String(t.props.description||""),c=String(t.props.code||""),f=async()=>{s(!0),n("");try{const v=await fetch("/api/l3d/script",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:h,previous:c})}),p=await v.json().catch(()=>({}));if(!v.ok||!p.code)throw new Error(p.error||"AI 這次沒有寫出程式，請再試一次");o({code:p.code}),i(!0)}catch(v){n(v instanceof Error?v.message:String(v))}finally{s(!1)}};return r.jsxs("div",{className:"l3d-ai",children:[r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:"這個物件要做什麼？"}),r.jsx("textarea",{value:h,disabled:a.readOnly,placeholder:"例如：玩家靠近時跳一下並冒出愛心，每 5 秒原地轉一圈",onChange:v=>o({description:v.target.value})})]}),r.jsxs("div",{className:"dsect-actions",children:[r.jsxs("button",{type:"button",className:"l3d-primary",disabled:a.readOnly||e||h.trim().length<4,"aria-busy":e,onClick:()=>{f()},children:[r.jsx(Mt,{}),e?"AI 撰寫中…":c?"請 AI 重寫":"請 AI 寫程式"]}),c&&r.jsx("button",{type:"button","aria-pressed":u,onClick:()=>i(v=>!v),children:u?"收起程式":"查看程式"})]}),l&&r.jsx("p",{className:"l3d-hint",role:"alert",children:l}),c&&u&&r.jsxs("label",{className:"l3d-field",children:[r.jsx("span",{children:"程式（進階，可以直接改）"}),r.jsx("textarea",{value:c,disabled:a.readOnly,spellCheck:!1,style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",minHeight:160},onChange:v=>o({code:v.target.value})})]}),!c&&r.jsx("p",{className:"l3d-hint",children:"程式在遊戲的沙盒裡執行，只能動到這個物件、玩家位置、變數和特效。"})]})}export{je as G,Ma as L,ga as P,_ as S,ot as T,et as V,wa as a,Sa as b,ya as c,ka as d,Lt as e,Ta as f,Ca as g,ja as h,we as i,tt as j,va as k,fa as l,ba as p,ke as s,xa as u};
