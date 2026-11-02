import{$ as Ve,a0 as Ge,a1 as Le,a2 as Ne,a3 as Oe,a4 as je,a5 as Ee,a6 as _e,a7 as We,a8 as Ie,a9 as He,aa as $e,ab as Xe,ac as Ke,e as ve,U as Qe,X as De,Y as Re,ad as Y,g as F,V as P,k as M,ae as _,af as Ze,ag as Je,ah as W,ai as Q,aj as U,ak as re,C as B,al as Ye,c as et,am as ke,d as qe,S as tt,an as at,G as rt,ao as it,x as st,ap as ot,aq as nt,ar as le,as as ue}from"./three-engine-ZCw1R4k9.js";import{G as Ue,e as ze,r as lt}from"./modelDoc-B6vf5Cyd.js";import{c as ce}from"./compileQuietly-CK7nzn7y.js";const ut=[{id:"sepia",name:"復古褐色",hint:"舊相簿的暖褐色",shader:Ve,frame:(i,t)=>(i.amount.value=t.strength,!0)},{id:"technicolor",name:"復古彩色電影",hint:"早期彩色電影的濃烈色彩",shader:Ge},{id:"bleach",name:"漂白略過",hint:"褪色又強對比的冷硬電影感",shader:Le,frame:(i,t)=>(i.opacity.value=t.strength,!0)},{id:"film",name:"膠片顆粒",hint:"會跳動的底片顆粒",shader:Ne,frame:(i,t)=>(i.time.value=t.time,i.intensity.value=.25+t.strength*.6,!0)},{id:"dots",name:"網點印刷",hint:"報紙照片的黑白網點",shader:Oe,frame:(i,t)=>{i.tSize.value.set(t.width,t.height),i.scale.value=1.25*Math.max(.6,900/t.height)}},{id:"halftone",name:"彩色半色調",hint:"彩色印刷的小圓點",shader:je,frame:(i,t)=>(i.width.value=t.width,i.height.value=t.height,i.radius.value=3+3*t.height/900,i.blending.value=1-t.strength*.6,!0)},{id:"rgbshift",name:"RGB 色差",hint:"彩色重影，像老鏡頭",shader:Ee,frame:(i,t)=>(i.amount.value=.0015+t.strength*.006,i.angle.value=.4,!0)},{id:"glitch",name:"數位故障",hint:"畫面三不五時撕裂跳動",shader:_e,frame:mt},{id:"kaleido",name:"萬花筒",hint:"整個世界變成對稱花紋",shader:We,frame:(i,t)=>{i.sides.value=6,i.angle.value=t.time*.04}},{id:"mirror",name:"鏡中世界",hint:"左右對稱的畫面",shader:Ie,frame:i=>{i.side.value=1}},{id:"sobel",name:"輪廓線稿",hint:"只留下物體的輪廓線",shader:He,frame:(i,t)=>{i.resolution.value.set(t.width,t.height)}},{id:"hue",name:"換色系",hint:"整個世界換一種顏色",shader:$e,frame:(i,t)=>(i.hue.value=t.strength*.9-.45,i.saturation.value=.12,!0)},{id:"colorify",name:"單色染色",hint:"像透過彩色玻璃看",shader:Xe,tinted:!0,frame:(i,t)=>{i.color.value.set(t.color||"#ffc7e0")}},{id:"vignette",name:"暗角",hint:"四周變暗，視線集中在中間",shader:Ke,frame:(i,t)=>(i.offset.value=1.1,i.darkness.value=.6+t.strength*1.4,!0)}],ct=i=>ut.find(t=>t.id===i);function dt(i,t){const r=/varying\s+vec2\s+vUV\b/.test(i.shader.fragmentShader)?"vUV":"vUv",e=`${i.shader.fragmentShader.replace(/void\s+main\s*\(\s*\)/,"void filterMain()")}
uniform float uStrength;
void main() { filterMain(); vec4 filtered = gl_FragColor; gl_FragColor = vec4(mix(texture2D(tDiffuse, ${r}).rgb, filtered.rgb, uStrength), 1.); }`,a=new ve({uniforms:{...Qe.clone(i.shader.uniforms),uStrength:{value:1}},vertexShader:r==="vUV"?t.replace(/\bvUv\b/g,"vUV"):t,fragmentShader:e,depthTest:!1,depthWrite:!1});return i.id==="glitch"&&(a.uniforms.tDisp.value=ft()),a}function ht(i,t,r){const e=i.frame?.(t.uniforms,r);t.uniforms.uStrength.value=e?1:Math.max(0,Math.min(1,r.strength))}let Z=null;function ft(){if(Z)return Z;const i=64,t=new Uint8Array(i*i);for(let r=0;r<t.length;r++)t[r]=Math.floor(Math.random()*255);return Z=new De(t,i,i,Re,Y),Z.needsUpdate=!0,Z}let Pe=0,Se=0;function mt(i,t){t.time>Pe&&(Se=t.time+.12+Math.random()*.25,Pe=t.time+.6+Math.random()*(4-t.strength*3));const r=t.time<Se;return i.byp.value=r?0:1,i.amount.value=Math.random()/30,i.angle.value=(Math.random()-.5)*Math.PI,i.seed.value=Math.random(),i.seed_x.value=(Math.random()-.5)*.6,i.seed_y.value=(Math.random()-.5)*.6,i.distortion_x.value=Math.random(),i.distortion_y.value=Math.random(),i.col_s.value=.05,!0}const fe=1,Me=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }
`;class ${constructor(t){if(this.material=t,!$.geometry){const r=new et;r.setAttribute("position",new ke([-1,-1,0,3,-1,0,-1,3,0],3)),r.setAttribute("uv",new ke([0,0,2,0,0,2],2)),$.geometry=r}this.mesh=new qe($.geometry,t),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}material;static geometry=null;mesh;scene=new tt;camera=new at(-1,1,1,-1,0,1);render(t,r){t.setRenderTarget(r),t.render(this.scene,this.camera)}}const ie={anime:{tonemap:0,saturation:1,contrast:1.06,balance:[.92,.9,.88],lift:[.006,.014,.032],gain:[.98,.96,.93],shadowTint:[.38,.5,.72],highlightTint:[1.03,1,.95],vignette:.22,grain:0,glow:.05,shoulder:.6,threshold:1,toning:1.45,chromatic:.18,dirt:.35},miniature:{tonemap:0,saturation:1.08,contrast:1,balance:[1.01,.99,1.02],lift:[.03,.026,.045],gain:[1.02,1,1],shadowTint:[.62,.52,.8],highlightTint:[1.04,1,.95],vignette:.12,grain:0,glow:.09,threshold:1.05,chromatic:.12,dirt:.2},dreamy:{tonemap:0,saturation:1.04,contrast:1.04,balance:[1.01,1,.99],lift:[0,.004,.016],gain:[1.02,1,.98],shadowTint:[.4,.46,.64],highlightTint:[1.03,.99,.92],vignette:.2,grain:0,glow:.06,threshold:1.1,chromatic:.2,dirt:.45},natural:{tonemap:0,saturation:1.06,contrast:1.04,balance:[1,1,1],lift:[0,0,0],gain:[1,1,1],shadowTint:[.42,.46,.62],highlightTint:[1,.97,.92],vignette:.2,grain:.006},storybook:{tonemap:0,saturation:1.14,contrast:1.07,balance:[1.04,1,.95],lift:[.01,.015,.03],gain:[1.03,1,.95],shadowTint:[.36,.38,.66],highlightTint:[1.04,.96,.84],vignette:.3,grain:.018},golden:{tonemap:1,saturation:1.12,contrast:1.06,balance:[1.12,1,.84],lift:[.02,.012,.03],gain:[1.05,.99,.9],shadowTint:[.4,.34,.62],highlightTint:[1.08,.94,.78],vignette:.32,grain:.018,chromatic:.3,dirt:.6},pastel:{tonemap:0,saturation:.92,contrast:.92,balance:[1.02,1,1.02],lift:[.06,.055,.07],gain:[1,.98,1.02],shadowTint:[.6,.5,.72],highlightTint:[1,.96,.96],vignette:.14,grain:0},vivid:{tonemap:1,saturation:1.3,contrast:1.1,balance:[1,1,1],lift:[0,0,.01],gain:[1,1,1],shadowTint:[.3,.4,.7],highlightTint:[1,.98,.9],vignette:.22,grain:.01},film:{tonemap:2,saturation:1.14,contrast:1.12,balance:[1.04,1,.95],lift:[0,.03,.045],gain:[1.06,1,.9],shadowTint:[.22,.42,.5],highlightTint:[1.08,.95,.8],vignette:.36,grain:.045,chromatic:.55,dirt:.7},moody:{tonemap:2,saturation:.84,contrast:1.14,balance:[.95,1,1.08],lift:[.01,.02,.04],gain:[.94,.97,1.02],shadowTint:[.3,.35,.55],highlightTint:[.95,.97,1],vignette:.48,grain:.03,chromatic:.4,dirt:.5},mono:{tonemap:2,saturation:0,contrast:1.1,balance:[1,1,1],lift:[.02,.015,.01],gain:[1.02,1,.95],shadowTint:[.5,.5,.5],highlightTint:[1,1,1],vignette:.35,grain:.04,mono:!0}};class Bt{renderer;sceneRT;copyRT;mainRT;bloomDown=[];bloomUp=[];blurA;blurB;blurC;aoA;aoB;raysRT;taaRT=null;taaIndex=0;taaValid=!1;taaFrame=0;taaLastAt=0;taaOn=!0;prevViewProj=new F;viewProj=new F;savedProj=new F;prevCamPos=new P;dofPre;dofA;dofB;lensDirt;airRT;airPass;copyPass;blitPass;prefilterPass;downPass;upPass;aoPass;aoBlurPass;raysPass;taaPass;dofPrePass;bokehPass;tentPass;compositePass;filterPass=null;filterRT=null;options;width=1;height=1;size=new M(1,1);hdr;time=0;sunNdc=new P;constructor(t,r){this.renderer=t,this.options={ao:!0,rays:!0,taa:!1,bokehTaps:38,...r};const e=t.getContext();this.hdr=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"));const a=this.hdr?_:Y,s=new Ze(1,1);s.type=Je,this.sceneRT=new W(1,1,{type:a,format:Q,samples:r.samples,depthTexture:s,depthBuffer:!0}),this.sceneRT.texture.minFilter=U,this.sceneRT.texture.magFilter=U,this.copyRT=new W(1,1,{type:this.hdr?_:re,format:Q,depthBuffer:!1}),this.copyRT.texture.minFilter=U,this.copyRT.texture.magFilter=U,this.mainRT=new W(1,1,{type:a,format:Q,depthBuffer:!0}),this.mainRT.texture.minFilter=U,this.mainRT.texture.magFilter=U;const o=(d=a)=>{const f=new W(1,1,{type:d,format:Q,depthBuffer:!1});return f.texture.minFilter=U,f.texture.magFilter=U,f};for(let d=0;d<r.bloomLevels;d++)this.bloomDown.push(o()),this.bloomUp.push(o());if(this.blurA=o(),this.blurB=o(),this.blurC=o(),this.aoA=o(Y),this.aoB=o(Y),this.raysRT=o(),this.options.taa&&this.hdr){const d=()=>{const f=new W(1,1,{type:_,format:Q,depthBuffer:!1});return f.texture.minFilter=U,f.texture.magFilter=U,f};this.taaRT=[d(),d()]}this.dofPre=o(this.hdr?_:re),this.dofA=o(this.hdr?_:re),this.dofB=o(this.hdr?_:re),this.lensDirt=pt(),this.airRT=o();const n=(d,f)=>new $(new ve({uniforms:f,vertexShader:Me,fragmentShader:d,depthTest:!1,depthWrite:!1}));this.copyPass=n(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform float uNear; uniform float uFar;
      varying vec2 vUv;
      void main() {
        float z = texture(tDepth, vUv).x;
        float viewZ = (uNear * uFar) / ((uFar - uNear) * z - uFar);
        vec3 c = texture(tColor, vUv).rgb;
        // One bad pixel (NaN/Inf) would spread into a black blob through bloom; drop it here.
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        gl_FragColor = vec4(min(c, vec3(64.)), -viewZ);
      }`,{tColor:{value:null},tDepth:{value:null},uNear:{value:.1},uFar:{value:1e3}}),this.blitPass=n(`
      uniform sampler2D tColor; varying vec2 vUv;
      void main() { gl_FragColor = vec4(texture(tColor, vUv).rgb, 1.); }`,{tColor:{value:null}}),this.prefilterPass=n(`
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
      }`,{tColor:{value:null},uTexel:{value:new M},uThreshold:{value:1},uKnee:{value:.7}}),this.downPass=n(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec2 h = uTexel * .5;
        vec4 s = texture(tColor, vUv) * 4.;
        s += texture(tColor, vUv - h); s += texture(tColor, vUv + h);
        s += texture(tColor, vUv + vec2(h.x, -h.y)); s += texture(tColor, vUv - vec2(h.x, -h.y));
        gl_FragColor = s / 8.;
      }`,{tColor:{value:null},uTexel:{value:new M}}),this.upPass=n(`
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
      }`,{tColor:{value:null},tBase:{value:null},uTexel:{value:new M},uBaseWeight:{value:1}}),this.aoPass=n(`
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
      }`,{tDepth:{value:null},uTexel:{value:new M},uTan:{value:new M(1,1)},uRadius:{value:.95},uFar:{value:1e3}}),this.aoBlurPass=n(`
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
      }`,{tAo:{value:null},tDepth:{value:null},uDir:{value:new M}}),this.raysPass=n(`
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
      }`,{tDepth:{value:null},uSun:{value:new M(.5,.5)},uFar:{value:1e3},uAspect:{value:1}}),this.taaPass=n(`
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
      }`,{tCurrent:{value:null},tHistory:{value:null},tDepth:{value:null},tAir:{value:null},uAirOn:{value:0},uTexel:{value:new M(1,1)},uTan:{value:new M(1,1)},uJitter:{value:new M},uFar:{value:1e3},uReset:{value:1},uCamWorld:{value:new F},uPrevViewProj:{value:new F}});const l=Math.max(0,Math.round(this.options.airSteps??0));this.airPass=n(`
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
        const int N = ${Math.max(1,l)};
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
      }`,{tDepth:{value:null},tShadow:{value:null},uShadowMatrix:{value:new F},uCamWorld:{value:new F},uTan:{value:new M(1,1)},uJitter:{value:new M},uSunDir:{value:new P(0,1,0)},uSunColor:{value:new B(1,1,1)},uDensity:{value:0},uFrame:{value:0},uMaxDist:{value:60},uBias:{value:0},uHeight:{value:0}});const c=`
      uniform float uFocus; uniform float uDof; uniform float uMiniature;
      float cocAt(float d, vec2 uv) {
        float s = (d - uFocus) / max(uFocus, 1.);
        // Behind the focus the blur grows with distance; in front only what's really close blurs (and less), so
        // nearby things you play with stay readable.
        float c = (s < 0. ? -.45 * smoothstep(.5, 1., -s) : smoothstep(.22, 1.05, s)) * uDof;
        float t = uv.y - .52;
        float tilt = smoothstep(.12, .48, abs(t)) * uMiniature * sign(t);
        return abs(tilt) > abs(c) ? tilt : c;
      }`;this.dofPrePass=n(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 uTexel; uniform float uFar;
      ${c}
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
      }`,{tColor:{value:null},tDepth:{value:null},uTexel:{value:new M},uFar:{value:1e3},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}});const u=Math.max(12,Math.min(64,Math.round(this.options.bokehTaps??38)));this.bokehPass=n(`
      uniform sampler2D tPre; uniform vec2 uTexel; uniform float uRadius; uniform float uFrame;
      varying vec2 vUv;
      float weigh(float coc, float r) { return clamp((coc - r + 2.) / 2., 0., 1.); }
      void main() {
        vec4 center = texture(tPre, vUv);
        float coc0 = center.a * uRadius;
        vec3 bg = vec3(0.), fg = vec3(0.); float bgW = 0., fgW = 0.;
        // A golden-angle spiral, turned a little each frame (temporal AA smooths the rest).
        float spin = fract(uFrame * .618034) * 6.2831;
        const int N = ${u};
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
      }`,{tPre:{value:null},uTexel:{value:new M},uRadius:{value:8},uFrame:{value:0}}),this.tentPass=n(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec4 o = uTexel.xyxy * vec2(-.5, .5).xxyy;
        gl_FragColor = (texture(tColor, vUv + o.xy) + texture(tColor, vUv + o.zy) + texture(tColor, vUv + o.xw) + texture(tColor, vUv + o.zw)) * .25;
      }`,{tColor:{value:null},uTexel:{value:new M}}),this.compositePass=n(`
      #include <common>
      #include <tonemapping_pars_fragment>
      uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tBlur; uniform sampler2D tDepth; uniform sampler2D tAo; uniform sampler2D tRays;
      uniform float uBloom; uniform float uExposure; uniform float uBlurOn;
      uniform int uTonemap; uniform float uSaturation; uniform float uContrast; uniform vec3 uBalance; uniform vec3 uLift; uniform vec3 uGain;
      uniform vec3 uShadowTint; uniform vec3 uHighlightTint;
      uniform float uVignette; uniform float uGrain; uniform float uMono; uniform float uAspect; uniform float uTime; uniform float uShoulder; uniform float uToning;
      uniform vec3 uFlash; uniform float uFlashAmount; uniform float uAo; uniform float uRays; uniform vec3 uSunColor; uniform float uGlow;
      uniform float uUnder; uniform vec3 uUnderColor; uniform float uUnderFog; uniform float uUnderSurface; uniform float uUnderDepth; uniform float uUnderBeams;
      uniform mat4 uInvProj; uniform mat4 uCamWorld;
      uniform vec2 uTexel; uniform float uSharpen;
      uniform sampler2D tDof; uniform float uDofOn; uniform float uBokehPx; uniform sampler2D tDirt; uniform float uDirt; uniform float uChromatic; uniform float uLetterbox;
      uniform float uOutline; uniform float uOutlinePx;
      ${c}
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
          c += mix(uUnderColor, vec3(.7, .95, 1.), .55) * shafts * .3 * uUnderBeams * uUnder * (1. - deep);
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
      }`,{tScene:{value:null},tBloom:{value:null},tBlur:{value:null},tDepth:{value:null},tAo:{value:null},tRays:{value:null},uBloom:{value:.5},uExposure:{value:1},uBlurOn:{value:0},uTonemap:{value:0},uSaturation:{value:1},uContrast:{value:1},uBalance:{value:new B(1,1,1)},uLift:{value:new B(0,0,0)},uGain:{value:new B(1,1,1)},uShadowTint:{value:new B(.4,.45,.6)},uHighlightTint:{value:new B(1,1,1)},uVignette:{value:.2},uShoulder:{value:0},uToning:{value:1},uGrain:{value:.01},uMono:{value:0},uAspect:{value:1},uTime:{value:0},uFlash:{value:new B(0,0,0)},uFlashAmount:{value:0},uAo:{value:0},uRays:{value:0},uSunColor:{value:new B(1,1,1)},uGlow:{value:0},uUnder:{value:0},uUnderColor:{value:new B(.05,.3,.4)},uUnderFog:{value:.04},uUnderSurface:{value:1e9},uUnderDepth:{value:0},uUnderBeams:{value:1},uInvProj:{value:new F},uCamWorld:{value:new F},uTexel:{value:new M(1,1)},uSharpen:{value:0},tDof:{value:null},uDofOn:{value:0},uBokehPx:{value:18},tDirt:{value:this.lensDirt},uDirt:{value:0},uChromatic:{value:0},uLetterbox:{value:0},uOutline:{value:0},uOutlinePx:{value:1},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}})}setSize(t,r){this.width=Math.max(1,Math.floor(t)),this.height=Math.max(1,Math.floor(r)),this.size.set(this.width,this.height),this.sceneRT.setSize(this.width,this.height),this.copyRT.setSize(this.width,this.height),this.mainRT.setSize(this.width,this.height);let e=this.width,a=this.height;for(let n=0;n<this.bloomDown.length;n++)e=Math.max(1,e>>1),a=Math.max(1,a>>1),this.bloomDown[n].setSize(e,a),this.bloomUp[n].setSize(e,a);const s=[Math.max(1,this.width>>1),Math.max(1,this.height>>1)],o=[Math.max(1,this.width>>2),Math.max(1,this.height>>2)];this.blurA.setSize(...s),this.blurB.setSize(...o),this.blurC.setSize(...s),this.aoA.setSize(...s),this.aoB.setSize(...s),this.raysRT.setSize(...o),this.taaRT?.forEach(n=>n.setSize(this.width,this.height)),this.taaValid=!1,this.dofPre.setSize(...s),this.dofA.setSize(...s),this.dofB.setSize(...s),this.options.airSteps&&this.options.airSteps>=20?this.airRT.setSize(...s):this.airRT.setSize(...o),this.compositePass.material.uniforms.uAspect.value=this.width/this.height}resetHistory(){this.taaValid=!1}get worldTexture(){return this.copyRT.texture}render(t,r,e,a,s=!0){const o=this.renderer;this.time+=a;const n=r.layers.mask,l=r.near??.1,c=r.far??1e3,u=r,d=this.taaOn&&this.taaRT&&u.isPerspectiveCamera?this.taaRT:null;d||(this.taaValid=!1);let f=0,h=0;if(d){const b=performance.now();(a>.25||b-this.taaLastAt>250||this.prevCamPos.distanceToSquared(u.position)>36)&&(this.taaValid=!1),this.taaLastAt=b,this.taaFrame++;const g=this.taaFrame%8+1;f=(Ae(g,2)-.5)*2/this.width,h=(Ae(g,3)-.5)*2/this.height,this.savedProj.copy(u.projectionMatrix),u.projectionMatrix.elements[8]+=f,u.projectionMatrix.elements[9]+=h,u.projectionMatrixInverse.copy(u.projectionMatrix).invert()}r.layers.set(0),o.setRenderTarget(this.sceneRT),o.clear(!0,!0,!0),o.render(t,r);const T=this.copyPass.material.uniforms;T.tColor.value=this.sceneRT.texture,T.tDepth.value=this.sceneRT.depthTexture,T.uNear.value=l,T.uFar.value=c,this.copyPass.render(o,this.copyRT);let y=this.sceneRT.texture;if(s){this.blitPass.material.uniforms.tColor.value=this.copyRT.texture,this.blitPass.render(o,this.mainRT),o.setRenderTarget(this.mainRT),o.clear(!1,!0,!1),r.layers.set(fe);const b=o.autoClear;o.autoClear=!1;const g=t.background;t.background=null,o.render(t,r),t.background=g,o.autoClear=b,y=this.mainRT.texture}if(r.layers.mask=n,d){u.projectionMatrix.copy(this.savedProj),u.projectionMatrixInverse.copy(this.savedProj).invert();const b=Math.tan(u.fov*Math.PI/180/2)/(u.zoom||1),g=e.sunShadow,A=(this.options.airSteps??0)>0&&(e.airLight??0)>0&&!!g?.map&&!!e.sun&&!(e.underwater&&e.underwater.amount>.02);if(A&&g&&e.sun){const R=this.airPass.material.uniforms;R.tDepth.value=this.copyRT.texture,R.tShadow.value=g.map,R.uShadowMatrix.value.copy(g.matrix),R.uBias.value=g.bias,R.uCamWorld.value.copy(u.matrixWorld),R.uTan.value.set(b*u.aspect,b),R.uJitter.value.set(f,h),R.uSunDir.value.copy(e.sun.dir),R.uSunColor.value.copy(e.sun.color),R.uDensity.value=(e.airLight??0)*.004,R.uFrame.value=this.taaFrame,R.uMaxDist.value=Math.min(36,g.range*.8),R.uHeight.value=e.airHeight??2,this.airPass.render(o,this.airRT)}const k=this.taaPass.material.uniforms,D=d[this.taaIndex],K=d[1-this.taaIndex];k.tCurrent.value=y,k.tHistory.value=K.texture,k.tDepth.value=this.copyRT.texture,k.tAir.value=this.airRT.texture,k.uAirOn.value=A?1:0,k.uTexel.value.set(1/this.width,1/this.height),k.uTan.value.set(b*u.aspect,b),k.uJitter.value.set(f,h),k.uFar.value=c,k.uReset.value=this.taaValid?0:1,k.uCamWorld.value.copy(u.matrixWorld),k.uPrevViewProj.value.copy(this.prevViewProj),this.taaPass.render(o,D),this.viewProj.multiplyMatrices(this.savedProj,u.matrixWorldInverse),this.prevViewProj.copy(this.viewProj),this.prevCamPos.copy(u.position),this.taaIndex=1-this.taaIndex,this.taaValid=!0,y=D.texture}const C=!!this.options.ao&&(e.ao??1)>0&&r.isPerspectiveCamera;if(C){const b=r,g=Math.tan(b.fov*Math.PI/180/2),A=this.aoPass.material.uniforms;A.tDepth.value=this.copyRT.texture,A.uTexel.value.set(1/this.aoA.width,1/this.aoA.height),A.uTan.value.set(g*b.aspect,g),A.uFar.value=c,this.aoPass.render(o,this.aoA);const k=this.aoBlurPass.material.uniforms;k.tDepth.value=this.copyRT.texture,k.tAo.value=this.aoA.texture,k.uDir.value.set(1.5/this.aoA.width,0),this.aoBlurPass.render(o,this.aoB),k.tAo.value=this.aoB.texture,k.uDir.value.set(0,1.5/this.aoA.height),this.aoBlurPass.render(o,this.aoA)}let V=!1;if(this.options.rays&&e.sun&&e.sun.strength>0&&(this.sunNdc.copy(e.sun.dir).multiplyScalar(500).add(r.position).project(r),this.sunNdc.z<1&&Math.abs(this.sunNdc.x)<1.6&&Math.abs(this.sunNdc.y)<1.6)){const g=this.raysPass.material.uniforms;g.tDepth.value=this.copyRT.texture,g.uSun.value.set(this.sunNdc.x*.5+.5,this.sunNdc.y*.5+.5),g.uFar.value=c,g.uAspect.value=this.width/this.height,this.raysPass.render(o,this.raysRT),V=!0}let G=null;if(this.options.bloom&&e.bloom>0&&this.bloomDown.length){const b=this.prefilterPass.material.uniforms;b.tColor.value=y,b.uTexel.value.set(1/this.width,1/this.height),b.uThreshold.value=(ie[e.look]||ie.storybook).threshold??1,this.prefilterPass.render(o,this.bloomDown[0]);const g=this.downPass.material.uniforms;for(let D=1;D<this.bloomDown.length;D++){const K=this.bloomDown[D-1];g.tColor.value=K.texture,g.uTexel.value.set(1/K.width,1/K.height),this.downPass.render(o,this.bloomDown[D])}const A=this.upPass.material.uniforms;let k=this.bloomDown[this.bloomDown.length-1];for(let D=this.bloomDown.length-2;D>=0;D--)A.tColor.value=k.texture,A.tBase.value=this.bloomDown[D].texture,A.uTexel.value.set(1/k.width,1/k.height),A.uBaseWeight.value=1,this.upPass.render(o,this.bloomUp[D]),k=this.bloomUp[D];G=k.texture}const w=ie[e.look]||ie.storybook,L=e.miniature>.01||e.depthOfField>.01,Be=(e.bokehRadius??12)*(this.height/1080),be=Math.max(1,Be*.5);if(L){const b=this.dofPrePass.material.uniforms;b.tColor.value=y,b.tDepth.value=this.copyRT.texture,b.uTexel.value.set(1/this.width,1/this.height),b.uFar.value=c,b.uFocus.value=e.focusDistance,b.uDof.value=Math.min(1,e.depthOfField),b.uMiniature.value=e.miniature,this.dofPrePass.render(o,this.dofPre);const g=this.bokehPass.material.uniforms;g.tPre.value=this.dofPre.texture,g.uTexel.value.set(1/this.dofPre.width,1/this.dofPre.height),g.uRadius.value=be,g.uFrame.value=this.taaFrame,this.bokehPass.render(o,this.dofA);const A=this.tentPass.material.uniforms;A.tColor.value=this.dofA.texture,A.uTexel.value.set(1/this.dofA.width,1/this.dofA.height),this.tentPass.render(o,this.dofB)}const xe=(w.glow??0)>0;if(xe){const b=this.downPass.material.uniforms;b.tColor.value=y,b.uTexel.value.set(1/this.width,1/this.height),this.downPass.render(o,this.blurA),b.tColor.value=this.blurA.texture,b.uTexel.value.set(1/this.blurA.width,1/this.blurA.height),this.downPass.render(o,this.blurB);const g=this.upPass.material.uniforms;g.tColor.value=this.blurB.texture,g.tBase.value=this.blurA.texture,g.uTexel.value.set(1/this.blurB.width,1/this.blurB.height),g.uBaseWeight.value=0,this.upPass.render(o,this.blurC)}const m=this.compositePass.material.uniforms;m.uGlow.value=w.glow??0,m.tScene.value=y,m.tBloom.value=G??this.blurB.texture,m.uBloom.value=G?e.bloom*.35:0,m.tBlur.value=this.blurC.texture,m.tDepth.value=this.copyRT.texture,m.tAo.value=this.aoA.texture,m.uAo.value=C?e.ao??1:0,m.tRays.value=this.raysRT.texture,m.uRays.value=V?e.sun.strength:0,e.sun&&m.uSunColor.value.copy(e.sun.color),m.uBlurOn.value=xe?1:0,m.uMiniature.value=e.miniature,m.uDof.value=Math.min(1,e.depthOfField),m.uFocus.value=e.focusDistance,m.uDofOn.value=L?1:0,m.tDof.value=this.dofB.texture,m.uBokehPx.value=be*2;const we=Math.max(0,Math.min(1,e.lens??1));m.uDirt.value=(w.dirt??0)*we,m.uChromatic.value=Math.min(1.5,(w.chromatic??0)*we+(e.chromatic??0)),m.uLetterbox.value=Math.max(0,Math.min(1,e.letterbox??0)),m.uOutline.value=Math.max(0,Math.min(1,e.outline??0)),m.uOutlinePx.value=Math.max(1,this.height/900),m.uExposure.value=e.exposure,m.uTexel.value.set(1/this.width,1/this.height),m.uSharpen.value=e.sharpen??0,m.uTonemap.value=w.tonemap,m.uSaturation.value=w.saturation,m.uContrast.value=w.contrast,m.uBalance.value.setRGB(...w.balance),m.uLift.value.setRGB(...w.lift),m.uGain.value.setRGB(...w.gain),m.uShadowTint.value.setRGB(...w.shadowTint),m.uHighlightTint.value.setRGB(...w.highlightTint),m.uVignette.value=w.vignette,m.uShoulder.value=w.shoulder??0,m.uToning.value=w.toning??1,m.uGrain.value=w.grain,m.uMono.value=w.mono?1:0,m.uTime.value=this.time,e.flash?(m.uFlash.value.setRGB(e.flash[0],e.flash[1],e.flash[2]),m.uFlashAmount.value=e.flash[3]):m.uFlashAmount.value=0,e.underwater&&e.underwater.amount>0?(m.uUnder.value=e.underwater.amount,m.uUnderColor.value.copy(e.underwater.color),m.uUnderFog.value=e.underwater.fog,m.uUnderSurface.value=e.underwater.surface??1e9,m.uUnderDepth.value=e.underwater.depth??0,m.uUnderBeams.value=(e.underwater.beams??.5)*2,m.uInvProj.value.copy(r.projectionMatrixInverse),m.uCamWorld.value.copy(r.matrixWorld)):m.uUnder.value=0;const X=e.filter&&e.filter.strength>0?ct(e.filter.id):void 0;if(!X){this.compositePass.render(o,null);return}const N=o.getDrawingBufferSize(new M);this.filterRT?(this.filterRT.width!==N.x||this.filterRT.height!==N.y)&&this.filterRT.setSize(N.x,N.y):this.filterRT=new W(N.x,N.y,{depthBuffer:!1}),this.filterPass?.id!==X.id&&(this.filterPass?.pass.material.dispose(),this.filterPass={id:X.id,pass:new $(dt(X,Me))}),this.compositePass.render(o,this.filterRT);const Te=this.filterPass.pass.material;Te.uniforms.tDiffuse.value=this.filterRT.texture,ht(X,Te,{time:this.time,width:N.x,height:N.y,strength:e.filter.strength,color:e.filter.color}),this.filterPass.pass.render(o,null)}async compileAsync(t,r,e=()=>!0){const a=this.renderer,s=a.getRenderTarget(),o=[];a.setRenderTarget(this.sceneRT),o.push(ce(a,t,r,e));const n=r.layers.mask;r.layers.set(fe),a.setRenderTarget(this.mainRT),t.traverse(l=>{l.isMesh&&l.layers.test(r.layers)&&o.push(ce(a,l,r,e,t))}),r.layers.mask=n;for(const l of[this.copyPass,this.blitPass,this.prefilterPass,this.downPass,this.upPass,this.aoPass,this.aoBlurPass,this.raysPass,this.airPass,this.taaPass,this.dofPrePass,this.bokehPass,this.tentPass,this.compositePass])a.setRenderTarget(l===this.compositePass?null:this.mainRT),o.push(ce(a,l.scene,l.camera,e));a.setRenderTarget(s),await Promise.all(o.map(l=>l.catch(()=>{})))}dispose(){this.filterRT?.dispose(),this.filterPass?.pass.material.dispose(),[this.sceneRT,this.copyRT,this.mainRT,this.blurA,this.blurB,this.blurC,this.aoA,this.aoB,this.raysRT,this.dofPre,this.dofA,this.dofB,this.airRT,...this.taaRT??[],...this.bloomDown,...this.bloomUp].forEach(t=>t.dispose()),[this.copyPass,this.blitPass,this.prefilterPass,this.downPass,this.upPass,this.aoPass,this.aoBlurPass,this.raysPass,this.airPass,this.taaPass,this.dofPrePass,this.bokehPass,this.tentPass,this.compositePass].forEach(t=>t.material.dispose()),this.lensDirt.dispose()}}function Ae(i,t){let r=1,e=0;for(let a=i;a>0;a=Math.floor(a/t))r/=t,e+=r*(a%t);return e}function pt(i=256){const t=new Uint8Array(i*i),r=new Float32Array(i*i);let e=9871;const a=()=>(e=e*16807%2147483647,e/2147483647),s=(n,l,c,u)=>{const d=c*c;for(let f=Math.max(0,Math.floor(l-c));f<Math.min(i,Math.ceil(l+c));f++)for(let h=Math.max(0,Math.floor(n-c));h<Math.min(i,Math.ceil(n+c));h++){const T=(h-n)**2+(f-l)**2;if(T>d)continue;const y=1-T/d;r[f*i+h]+=u*(y*y*.7+Math.exp(-((1-Math.sqrt(y)-.12)**2)*140)*.3)}};for(let n=0;n<70;n++){const l=a()*i,c=a()*i,u=Math.min(1,Math.hypot(l/i-.5,c/i-.5)*2.1);s(l,c,2+a()**2*26,(.15+a()*.55)*(.35+u*.65))}for(let n=0;n<3;n++){let l=a()*i,c=a()*i;const u=a()*Math.PI*2;for(let d=0;d<90;d++)s(l,c,3+a()*3,.05),l+=Math.cos(u+d*.012)*1.6,c+=Math.sin(u+d*.012)*1.6}for(let n=0;n<r.length;n++)t[n]=Math.round(Math.min(1,r[n])*255);const o=new De(t,i,i,Re,Y);return o.magFilter=U,o.minFilter=U,o.wrapS=o.wrapT=Ye,o.needsUpdate=!0,o}let ge=null;function Vt(i){ge=i}function vt(){return ge}const gt="ember:";async function Gt(i,t=[]){const r=await ge?.object(i.replace(gt,"")).catch(()=>null);if(!r)return null;const e={};return["primary","secondary","accent"].forEach((a,s)=>{/^#[0-9a-f]{6}$/i.test(t[s]||"")&&(e[a]=t[s])}),r(e)}const ae="vfx:";let de=null;function yt(){const i=vt();return i?(de??=i.vfx().catch(()=>(de=null,null)),de):Promise.resolve(null)}async function bt(i,t={}){try{return(await yt())?.(i,t)??null}catch{return null}}function Lt(i){if(!i||typeof i!="object")return;const t=i;if(typeof t.id!="string"||!/^[a-z0-9-]{2,40}$/.test(t.id))return;const r=t.options&&typeof t.options=="object"?t.options:{},e=(s,o,n)=>{const l=Number(s);return Number.isFinite(l)?Math.max(o,Math.min(n,l)):void 0},a={};typeof r.color=="string"&&/^#[0-9a-f]{6}$/i.test(r.color)&&(a.color=r.color);for(const[s,o,n]of[["size",.1,3],["speed",.1,3],["detail",0,2],["density",0,1],["quantity",1,30],["spread",.2,4]]){const l=e(r[s],o,n);l!==void 0&&(a[s]=l)}return{id:t.id,options:a}}const Nt=["soft","spark","star","ring","petal","smoke","snow","heart","leaf","drop","square"],xt={soft:0,spark:1,star:2,ring:3,petal:4,smoke:5,snow:6,heart:7,leaf:8,drop:9,square:10},x=i=>({duration:1,loop:!1,rate:0,burst:30,life:[.6,1.2],emitter:"point",area:.1,speed:[1,3],direction:[0,1,0],spread:180,gravity:0,drag:1,turbulence:0,orbit:0,size:[.15,0],colors:["#ffffff","#ffffff"],alpha:[1,1,0],shape:"soft",blend:"add",spin:0,stretch:0,glow:.5,world:!0,...i}),wt=[x({id:"fire",name:"火焰",loop:!0,duration:1,rate:70,burst:0,life:[.5,1.1],emitter:"disc",area:.28,speed:[.6,1.6],spread:18,gravity:-2.2,drag:1.2,turbulence:1.2,size:[.42,.05],colors:["#fff3b0","#ffb347","#ff5a36","#5a2a2a"],alpha:[.9,.8,0],shape:"soft",glow:1.4}),x({id:"smoke",name:"煙霧",loop:!0,rate:11,burst:0,life:[2.4,4],emitter:"disc",area:.18,speed:[.6,1.1],spread:12,gravity:-.7,drag:.6,turbulence:.9,size:[.3,1.45],colors:["#c9c2bb","#eeeae6","#d4d9e2"],alpha:[0,.36,0],shape:"smoke",blend:"alpha",glow:0,spin:.35}),x({id:"coins",name:"金幣",burst:26,life:[.9,1.4],emitter:"point",speed:[3.5,6.5],direction:[0,1,0],spread:32,gravity:11,drag:.4,size:[.17,.13],colors:["#fff3a8","#ffd23f","#e8a317"],alpha:[1,1,0],shape:"star",glow:1.3,spin:4}),x({id:"ink",name:"墨汁",burst:70,life:[1.6,2.8],emitter:"cone",area:.25,speed:[2.5,6.5],direction:[0,0,1],spread:30,gravity:-.15,drag:3.2,turbulence:1.5,size:[.3,1.7],colors:["#3a2a52","#1d1630","#120e1e"],alpha:[.95,.75,0],shape:"smoke",blend:"alpha",glow:0,spin:.6}),x({id:"magic-burst",name:"魔法爆發",burst:80,life:[.5,1.1],emitter:"sphere",area:.15,speed:[2.5,6],spread:180,drag:3,turbulence:.6,size:[.16,0],colors:["#ffffff","#b38cff","#5f7dff"],alpha:[1,1,0],shape:"star",glow:1.6,spin:3}),x({id:"heal",name:"治療光環",loop:!0,duration:1.5,rate:40,burst:0,life:[1,1.6],emitter:"ring",area:.7,speed:[.5,1.2],direction:[0,1,0],spread:8,gravity:-.6,drag:.5,orbit:1.2,size:[.12,.02],colors:["#eaffd9","#7cf29a","#2fbf71"],alpha:[0,1,0],shape:"star",glow:1.2,spin:2}),x({id:"sparks",name:"電光火花",burst:60,life:[.15,.45],emitter:"point",speed:[6,12],spread:180,gravity:9,drag:2,size:[.05,.01],colors:["#ffffff","#8be9ff","#3a7bff"],alpha:[1,1,0],shape:"spark",stretch:1.2,glow:2}),x({id:"slash",name:"斬擊",burst:70,life:[.18,.35],emitter:"ring",area:1.1,speed:[.5,1.5],direction:[0,0,1],spread:25,drag:4,orbit:9,size:[.14,.02],colors:["#ffffff","#ffe08a","#ff8a3d"],alpha:[1,.9,0],shape:"spark",stretch:1.6,glow:1.8}),x({id:"sparkle",name:"星光閃爍",loop:!0,rate:10,burst:0,life:[.6,1.4],emitter:"sphere",area:.9,speed:[0,.2],spread:180,size:[0,.14],colors:["#ffffff","#fff2a8"],alpha:[0,1,0],shape:"star",glow:1.5,spin:1}),x({id:"portal",name:"傳送門",loop:!0,rate:90,burst:0,life:[.8,1.3],emitter:"ring",area:1.2,speed:[-.9,-.4],direction:[0,0,1],spread:0,orbit:2.5,size:[.1,.02],colors:["#ffffff","#8de3ff","#a46bff"],alpha:[0,1,0],shape:"soft",glow:1.6}),x({id:"confetti",name:"彩帶",burst:120,life:[1.6,2.6],emitter:"point",speed:[4,8],direction:[0,1,0],spread:55,gravity:6,drag:1.4,turbulence:.6,size:[.1,.08],colors:["#ff6b8b","#ffd166","#4ecdc4","#8e7dff"],alpha:[1,1,0],shape:"square",blend:"alpha",glow:0,spin:9}),x({id:"fireflies",name:"螢火蟲",loop:!0,rate:6,burst:10,life:[3,6],emitter:"box",area:4,speed:[.05,.25],spread:180,turbulence:.5,size:[.07,.07],colors:["#f4ffb0","#c8ff6a"],alpha:[0,1,0],shape:"soft",glow:2.5}),x({id:"frost",name:"冰霜",burst:60,life:[.6,1.2],emitter:"ring",area:.4,speed:[3,5],direction:[0,.2,0],spread:90,drag:3,size:[.16,.02],colors:["#ffffff","#bfefff","#6fc3ff"],alpha:[1,.9,0],shape:"snow",glow:1,spin:2}),x({id:"splash",name:"水花",burst:40,life:[.4,.8],emitter:"disc",area:.3,speed:[2,4.5],spread:35,gravity:14,drag:.5,size:[.08,.03],colors:["#ffffff","#bdf1ff"],alpha:[1,.9,0],shape:"drop",blend:"alpha",stretch:.6,glow:.3}),x({id:"goo",name:"黏液飛濺",burst:26,life:[.5,1],emitter:"sphere",area:.3,speed:[2,4],direction:[0,1,0],spread:70,gravity:12,drag:.4,size:[.13,.06],colors:["#8affc7","#22d38a"],alpha:[.95,.9,0],shape:"drop",blend:"alpha",stretch:.3,glow:.4}),x({id:"petals",name:"花瓣飄落",loop:!0,rate:8,burst:0,life:[4,7],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.3,.2],spread:30,gravity:.4,drag:.8,turbulence:.9,size:[.09,.08],colors:["#ffd1e1","#ff9fc2"],alpha:[0,1,0],shape:"petal",blend:"alpha",glow:0,spin:2.5}),x({id:"leaves",name:"落葉",loop:!0,rate:4,burst:0,life:[4,8],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.2,0],spread:40,gravity:.5,drag:.7,turbulence:1,size:[.12,.11],colors:["#ffc14d","#e8743b"],alpha:[0,1,0],shape:"leaf",blend:"alpha",glow:0,spin:3}),x({id:"hearts",name:"愛心",burst:14,life:[1,1.6],emitter:"sphere",area:.3,speed:[.8,1.6],direction:[0,1,0],spread:40,gravity:-1,drag:1,size:[.18,.1],colors:["#ff6f9c","#ff3d6e"],alpha:[1,1,0],shape:"heart",blend:"alpha",glow:.4,spin:1}),x({id:"level-up",name:"升級",burst:50,rate:30,duration:1,life:[.9,1.5],emitter:"ring",area:.6,speed:[1.5,3],direction:[0,1,0],spread:6,gravity:-1,orbit:3,size:[.12,.02],colors:["#ffffff","#ffe066","#ffab00"],alpha:[1,1,0],shape:"star",glow:1.8,spin:3}),x({id:"dust",name:"塵土",burst:18,life:[.6,1.1],emitter:"disc",area:.35,speed:[.6,1.6],direction:[0,.3,0],spread:80,gravity:-.2,drag:2.4,size:[.15,.5],colors:["#e8dcc0","#c9b896"],alpha:[.55,.35,0],shape:"smoke",blend:"alpha",glow:0,spin:.8}),x({id:"eat",name:"吃掉",burst:36,life:[.35,.7],emitter:"sphere",area:.5,speed:[-2.4,-1.2],spread:180,drag:1,size:[.1,.02],colors:["#ffffff","#b6ffd9","#22d38a"],alpha:[1,1,0],shape:"star",glow:1.6,spin:4}),x({id:"fire-breath",name:"噴火",loop:!0,rate:120,burst:0,life:[.35,.7],emitter:"point",speed:[7,10],direction:[0,0,1],spread:14,gravity:-1.5,drag:1.6,turbulence:1,size:[.14,.72],colors:["#ffe08a","#ff9a3a","#ff4a2a","#5a2a24"],alpha:[.85,.7,0],shape:"soft",glow:1}),x({id:"rain",name:"雨",loop:!0,rate:700,burst:0,life:[.6,.9],emitter:"box",area:22,speed:[14,17],direction:[.08,-1,.05],spread:2,size:[.025,.025],colors:["#cfe6ff","#cfe6ff"],alpha:[.5,.5,.2],shape:"spark",blend:"alpha",stretch:2.2,glow:0}),x({id:"bubbles",name:"氣泡",loop:!0,rate:7,burst:0,life:[3,5],emitter:"disc",area:.3,speed:[.5,1.1],direction:[0,1,0],spread:12,gravity:-.5,drag:.4,turbulence:.7,size:[.06,.14],colors:["#ffffff","#c8f4ff"],alpha:[.7,.55,0],shape:"ring",blend:"alpha",glow:.2}),x({id:"embers",name:"餘燼",loop:!0,rate:26,burst:0,life:[2,4],emitter:"sphere",area:3,speed:[.3,1.1],direction:[0,1,0],spread:70,gravity:-.7,drag:.6,turbulence:1.4,size:[.05,.02],colors:["#ffd27a","#ff7a2a","#a8321a"],alpha:[1,.9,0],shape:"spark",glow:1.6}),x({id:"snow",name:"雪",loop:!0,rate:160,burst:0,life:[5,8],emitter:"box",area:22,speed:[.6,1.2],direction:[.1,-1,0],spread:15,turbulence:.6,size:[.06,.06],colors:["#ffffff","#f2f8ff"],alpha:[0,1,.8],shape:"snow",blend:"alpha",glow:.2,spin:1})];function Ot(i){return i.startsWith(ae)?Tt(i.slice(ae.length)):wt.find(t=>t.id===i)}function Tt(i){if(/^[a-z0-9-]{2,40}$/.test(i))return{...x({id:`${ae}${i}`,name:i,rate:0,burst:0,duration:2.6}),vfx:{id:i}}}const ne=4;class jt{constructor(t,r,e=4e3){this.env=t,this.world=r,this.budget=e,this.group.name="l3d-particles"}env;world;group=new rt;emitters=[];runs=[];time=0;quad=new it(1,1);budget;material(t){const r=t.colors.slice(0,ne);for(;r.length<2;)r.push(r[0]||"#ffffff");const e=Array.from({length:ne},(s,o)=>new B(r[Math.min(o,r.length-1)])),a=t.blend==="add";return new ve({uniforms:{...this.env,tWorld:{value:this.world.texture},uResolution:{value:this.world.resolution},uNow:{value:0},uColors:{value:e},uKeys:{value:r.length},uAlpha:{value:new P(...t.alpha)},uSize:{value:new M(...t.size)},uGravity:{value:t.gravity},uDrag:{value:t.drag},uTurb:{value:t.turbulence},uOrbit:{value:t.orbit},uSpin:{value:t.spin},uStretch:{value:t.stretch},uGlow:{value:t.glow},uShape:{value:xt[t.shape]??0},uAdditive:{value:a?1:0},uOrigin:{value:new P},uLocal:{value:t.world?0:1}},vertexShader:kt,fragmentShader:Pt,transparent:!0,depthWrite:!1,depthTest:!0,blending:a?st:ot})}play(t,r,e={}){if(t.vfx)return this.playVfx(t,r,e);const a=t.rate*Math.max(...t.life)+t.burst,s=this.emitters.reduce((y,C)=>y+(C.done?0:C.capacity),0),o=Math.max(8,Math.min(Math.ceil(a*1.15)+4,Math.max(64,this.budget-s))),n=new nt;n.index=this.quad.index,n.setAttribute("position",this.quad.getAttribute("position")),n.setAttribute("uv",this.quad.getAttribute("uv"));const l=new le(new Float32Array(o*4).fill(-1e5),4).setUsage(ue),c=new le(new Float32Array(o*4),4).setUsage(ue),u=new le(new Float32Array(o*4),4).setUsage(ue);n.setAttribute("aBirth",l),n.setAttribute("aMotion",c),n.setAttribute("aExtra",u),n.instanceCount=o;const d=this.material(t),f=new qe(n,d);f.frustumCulled=!1,f.layers.set(fe),f.renderOrder=t.blend==="add"?20:15,this.group.add(f);const h=new F;if(e.direction){const y=e.direction.clone().normalize(),C=Math.abs(y.y)>.95?new P(1,0,0):new P(0,1,0),V=new P().crossVectors(C,y).normalize(),G=new P().crossVectors(y,V);h.makeBasis(V,G,y)}e.scale&&h.scale(new P(e.scale,e.scale,e.scale));const T={effect:t,mesh:f,geometry:n,birth:l,motion:c,extra:u,capacity:o,cursor:0,running:!0,elapsed:0,carry:0,origin:r.clone(),matrix:h,follow:e.follow,random:lt(Math.random()*1e9|0),done:!1};return this.emitters.push(T),this.spawn(T,t.burst),T}playVfx(t,r,e){const a={effect:t,handle:null,origin:r.clone(),follow:e.follow,direction:e.direction?.clone(),scale:e.scale??1,repeat:!!(e.repeat||t.loop),running:!0,elapsed:0,stoppedAt:0,done:!1};return this.runs.push(a),bt(t.vfx.id,t.vfx.options).then(s=>{if(!s){a.done=!0;return}if(a.done||!this.runs.includes(a)){s.dispose();return}a.handle=s,s.group.position.copy(a.origin),s.group.scale.setScalar(a.scale),a.direction&&s.setDirection(a.direction,0),this.group.add(s.group)}),a}stop(t){const r=this.emitters.find(a=>a===t);if(r){r.running=!1;return}const e=this.runs.find(a=>a===t);e&&e.running&&(e.running=!1,e.stoppedAt=e.elapsed,e.handle?e.handle.stop():e.done=!0)}aim(t,r){const e=this.runs.find(c=>c===t);if(e){e.direction=r.clone(),e.handle?.setDirection(r,0);return}const a=this.emitters.find(c=>c===t);if(!a)return;const s=r.clone().normalize(),o=Math.abs(s.y)>.95?new P(1,0,0):new P(0,1,0),n=new P().crossVectors(o,s).normalize(),l=new P().crossVectors(s,n);a.matrix.makeBasis(n,l,s)}stopAll(){for(const t of this.emitters)t.running=!1;for(const t of[...this.runs])this.stop(t)}spawn(t,r){const e=t.effect,a=new P(...e.direction);a.lengthSq()<1e-6&&a.set(0,1,0),a.normalize();const s=Math.min(180,Math.max(0,e.spread))*Math.PI/180,o=new P,n=new P,l=new P,c=Math.abs(a.y)>.95?new P(1,0,0):new P(0,1,0),u=new P().crossVectors(c,a).normalize(),d=new P().crossVectors(a,u);for(let f=0;f<r;f++){const h=t.random;switch(e.emitter){case"sphere":{o.set(h()*2-1,h()*2-1,h()*2-1),o.lengthSq()>1&&o.normalize(),n.copy(o).multiplyScalar(e.area);break}case"disc":{const w=h()*Math.PI*2,L=Math.sqrt(h())*e.area;n.copy(u).multiplyScalar(Math.cos(w)*L).addScaledVector(d,Math.sin(w)*L);break}case"ring":{const w=h()*Math.PI*2;n.copy(u).multiplyScalar(Math.cos(w)*e.area).addScaledVector(d,Math.sin(w)*e.area);break}case"box":n.set((h()-.5)*2*e.area,(h()-.5)*.5*e.area+e.area*.3,(h()-.5)*2*e.area);break;case"line":n.copy(a).multiplyScalar((h()-.5)*2*e.area);break;case"cone":{const w=h()*Math.PI*2,L=h()*e.area;n.copy(u).multiplyScalar(Math.cos(w)*L).addScaledVector(d,Math.sin(w)*L);break}default:n.set(0,0,0)}const T=h()*Math.PI*2,y=Math.acos(1-h()*(1-Math.cos(s)));l.copy(a).multiplyScalar(Math.cos(y)).addScaledVector(u,Math.sin(y)*Math.cos(T)).addScaledVector(d,Math.sin(y)*Math.sin(T)),e.emitter==="sphere"&&e.spread>=179&&l.copy(n).normalize();const C=e.speed[0]+h()*(e.speed[1]-e.speed[0]);n.applyMatrix4(t.matrix),l.transformDirection(t.matrix).multiplyScalar(C);const V=e.world?t.origin:new P,G=t.cursor;t.birth.setXYZW(G,V.x+n.x,V.y+n.y,V.z+n.z,this.time),t.motion.setXYZW(G,l.x,l.y,l.z,e.life[0]+h()*(e.life[1]-e.life[0])),t.extra.setXYZW(G,h(),.7+h()*.6,h()<.5?-1:1,h()),t.cursor=(t.cursor+1)%t.capacity}t.birth.needsUpdate=!0,t.motion.needsUpdate=!0,t.extra.needsUpdate=!0}update(t){this.time+=t;for(const r of this.emitters){if(r.follow){const a=r.follow();a?r.origin.copy(a):r.running=!1}const e=r.mesh.material.uniforms;if(e.uNow.value=this.time,e.uOrigin.value.copy(r.origin),r.running){if(r.elapsed+=t,!r.effect.loop&&r.elapsed>=r.effect.duration)r.running=!1;else if(r.effect.rate>0){r.carry+=r.effect.rate*t;const a=Math.floor(r.carry);a>0&&(r.carry-=a,this.spawn(r,Math.min(a,r.capacity)))}}!r.running&&!r.done&&(r.stoppedAt??=this.time,this.time-r.stoppedAt>Math.max(...r.effect.life)+.2&&(r.done=!0))}for(const r of this.emitters.filter(e=>e.done))this.group.remove(r.mesh),r.geometry.dispose(),r.mesh.material.dispose();this.emitters=this.emitters.filter(r=>!r.done);for(const r of this.runs){if(r.follow&&r.running){const a=r.follow();a?r.origin.copy(a):this.stop(r)}const e=r.handle;!e||r.done||(r.elapsed+=t,e.group.position.copy(r.origin),r.running&&!r.repeat&&r.elapsed>=r.effect.duration&&this.stop(r),e.update(t),e.finished?r.running&&r.repeat?(e.reset(),r.elapsed=0):(e.dispose(),r.done=!0):!r.running&&r.elapsed-r.stoppedAt>8&&(e.dispose(),r.done=!0))}this.runs=this.runs.filter(r=>!r.done)}get active(){return this.emitters.length+this.runs.length}dispose(){for(const t of this.emitters)t.geometry.dispose(),t.mesh.material.dispose();for(const t of this.runs)t.handle?.dispose(),t.done=!0;this.emitters=[],this.runs=[],this.quad.dispose()}}const kt=`
${Ue}${ze}
attribute vec4 aBirth;
attribute vec4 aMotion;
attribute vec4 aExtra;
uniform float uNow;
uniform vec3 uColors[${ne}];
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
  for (int k = 0; k < ${ne-1}; k++) if (k == i) { a = uColors[k]; b = uColors[k + 1]; }
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
`,Pt=`
${Ue}${ze}
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
`,St=JSON.parse('[{"preset":{"id":"ice-shard","lifecycle":{"start":0.35,"end":0.8},"name":"冰晶彈","english":"Ice shard","category":"projectile","color":"#b3dcff","description":"不對稱晶簇以簡潔卡通切面與掠過冷光呈現厚度，旋轉碎晶向後脫落，留下細霜。","tags":"冰 魔法 射擊","maxParticles":512,"kind":0,"variant":2,"duration":5,"burst":false,"seed":27561,"schools":["ice"]},"defaults":{"speed":1,"detail":1,"color":"#b3dcff","size":1,"density":0.5}},{"preset":{"id":"ice-shatter","quantity":{"min":1,"max":18,"default":9,"label":"主晶片數量","unit":"枚","help":"向外爆散的大晶片數量；小冰屑仍由粒子密度控制。"},"lifecycle":{"start":0.27999999999999997,"end":1.26},"name":"冰晶碎裂","english":"Ice shatter","category":"burst","color":"#b8e5ff","description":"清楚的卡通晶面浮現裂紋亮帶，九向晶柱炸裂成明暗分明的立體碎晶。","tags":"冰 碎片 破碎 命中 卡通 賽璐璐","maxParticles":768,"kind":3,"variant":3,"duration":2.8,"burst":true,"seed":146992,"renderStyle":"toon","schools":["ice"]},"defaults":{"speed":1,"detail":1,"color":"#b8e5ff","size":1,"density":0.5,"quantity":9}},{"preset":{"id":"frost-lance-rain","spread":{"min":0.5,"max":3,"default":1,"label":"落點散布範圍","help":"從中心向外拉開冰槍落點；冰槍大小、落下高度與碎裂大小不變。"},"quantity":{"min":1,"max":18,"default":9,"label":"冰槍數量","unit":"支","help":"每次施放落下的冰槍總數。碎裂與霜痕跟隨各支冰槍；可用落點散布範圍拉開間距。"},"lifecycle":{"start":0.24,"end":1.08},"name":"冰槍驟雨","english":"Frost lance rain","category":"burst","color":"#a9dfff","description":"冰槍由不同高度錯峰落下，固定落點各自碎裂成稜面冰屑，地面霜痕逐漸消退。","tags":"冰槍 落冰 冰雨 冰霜 Ice","maxParticles":512,"kind":3,"variant":10,"duration":2.4,"burst":true,"seed":413415,"schools":["ice"],"previewTime":0.9,"thumbnailTime":0.9},"defaults":{"speed":1,"detail":1,"color":"#a9dfff","size":1,"density":0.5,"quantity":9,"spread":1}},{"preset":{"id":"frost-field","lifecycle":{"start":0.7,"end":1},"name":"冰霜領域","english":"Frost field","category":"area","color":"#9bdfff","description":"冷光沿六角雪花法陣向外掃過，六芒冰屑在霜紋上方緩慢閃爍。","tags":"冰凍 緩速 範圍 雪","maxParticles":512,"kind":2,"variant":2,"duration":5,"burst":false,"seed":101057,"schools":["ice"]},"defaults":{"speed":1,"detail":1,"color":"#9bdfff","size":1,"density":0.5}},{"preset":{"id":"venom-stream","quantity":{"min":1,"max":16,"default":8,"label":"每輪液團","unit":"團","help":"每輪噴出的主要液團數量；零星液滴與末端濺蝕保留，不等於同時可見數。"},"lifecycle":{"start":0.25,"end":0.7},"name":"劇毒噴流","english":"Venom stream","category":"beam","color":"#acdc6f","description":"有厚度的錐形毒液由施法端流向目標端，液滴斷續飛濺，末端濺蝕；停止時尾流排空。","tags":"噴流 毒液 腐蝕 劇毒 Poison","maxParticles":512,"kind":1,"variant":6,"duration":5,"burst":false,"seed":422602,"schools":["poison"],"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#acdc6f","size":1,"density":0.5,"quantity":8}},{"preset":{"id":"ground-fog","lifecycle":{"start":0.5,"end":1.2},"name":"地面煙霧","english":"Ground fog","category":"smoke","color":"#a6c9ca","description":"低矮霧層沿地面鋪開，適合場景氣氛與區域遮罩。","tags":"霧 環境 地面","maxParticles":128,"kind":5,"variant":1,"duration":5,"burst":false,"seed":202114},"defaults":{"speed":1,"detail":1,"color":"#a6c9ca","size":1,"density":0.5}},{"preset":{"id":"arcane-matrix","quantity":{"min":1,"max":18,"default":9,"label":"浮空晶體數量","unit":"枚","help":"晶體及各自的小環一起增減，地面矩陣保持完整。"},"lifecycle":{"start":0.7,"end":1},"name":"奧術矩陣","english":"Arcane matrix","kind":2,"variant":4,"color":"#bd9aff","duration":5,"burst":false,"description":"方格法陣逐一連接節點，多層浮空符文沿矩陣升降、重新排列。","category":"area","tags":"奧術 Arcane 法術 魔法","schools":["arcane"],"maxParticles":512,"seed":322133,"previewTime":1.4,"thumbnailTime":1.4},"defaults":{"speed":1,"detail":1,"color":"#bd9aff","size":1,"density":0.5,"quantity":9}},{"preset":{"id":"arcane-missile","spread":{"min":0.5,"max":3,"default":1,"label":"投射物散布範圍","help":"拉開晶核與配對尾跡的繞行間距；晶核大小、尾跡長度與整組前進方向不變。"},"quantity":{"min":1,"max":6,"default":3,"label":"晶核數量","unit":"枚","help":"晶核與配對尾跡一起增減；整組共同飛行及命中。"},"lifecycle":{"start":0.35,"end":0.8},"name":"奧術飛彈","english":"Arcane missile","category":"projectile","color":"#c99aff","description":"三枚卡通晶核繞行前進，分段魔力亮紋與菱形符印沿螺旋尾跡流動。","tags":"魔法 螺旋 法師","maxParticles":768,"kind":0,"variant":3,"duration":5,"burst":false,"seed":36748,"schools":["arcane"]},"defaults":{"speed":1,"detail":1,"color":"#c99aff","size":1,"density":0.5,"quantity":3,"spread":1}},{"preset":{"id":"shadow-glaive","lifecycle":{"start":0.35,"end":0.8},"name":"影襲飛刃","english":"Shadow glaive","kind":0,"variant":5,"color":"#a28bce","duration":5,"burst":false,"description":"立體弧刃扭轉穿刺，錯位殘像向後拉開，在速度中切碎消散。","category":"projectile","tags":"暗影 Shadow 法術 魔法","schools":["shadow"],"maxParticles":512,"seed":372168,"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#a28bce","size":1,"density":0.5}},{"preset":{"id":"painterly-grass","name":"手繪草地","english":"Painterly Grass","category":"environment","kind":10,"variant":0,"schools":["nature"],"color":"#829544","maxParticles":512,"defaultDensity":0.75,"seed":607319,"duration":5,"burst":false,"lifecycle":{"start":0.6,"end":0.8},"previewMode":"continuous","previewTime":2.2,"thumbnailTime":2.2,"description":"寬幅筆刷草葉交疊成橄欖綠與黃綠色塊，乳白小花點綴其中；草根固定，成片風勢讓葉尖與花朵自然擺動。","tags":"草地 草叢 白花 手繪 油畫 筆觸 植被 環境 自然 grass painterly meadow foliage flowers wind Nature"},"defaults":{"speed":1,"detail":1,"color":"#829544","size":1,"density":0.75}},{"preset":{"id":"prism-parry","quantity":{"min":1,"max":4,"default":4,"label":"格擋盾片數量","unit":"片","help":"受壓盾片與稜光一起增減，接觸亮線及碎光保留。"},"lifecycle":{"start":0.055,"end":0.2475},"name":"折光格擋","english":"Prism parry","category":"shield","color":"#ffe3a0","description":"接觸亮線瞬間劃開，局部盾片短促受壓，碎光向外折射後迅速退去。","tags":"格擋 彈反 接觸 防禦 聖光 Light","maxParticles":512,"kind":7,"variant":1,"duration":0.55,"burst":true,"seed":376667,"schools":["light"],"previewTime":0.14,"thumbnailTime":0.14},"defaults":{"speed":1,"detail":1,"color":"#ffe3a0","size":1,"density":0.5,"quantity":4}},{"preset":{"id":"continuous-beam","lifecycle":{"start":0.4,"end":0.6},"name":"持續光束","english":"Continuous beam","category":"beam","color":"#ff6555","description":"穩定細束外繞流動光絲，發射虹膜持續旋轉，命中端散出放射火花。","tags":"雷射 激光 武器 科幻","maxParticles":512,"kind":1,"variant":0,"duration":5,"burst":false,"seed":45935},"defaults":{"speed":1,"detail":1,"color":"#ff6555","size":1,"density":0.5}},{"preset":{"id":"astral-convergence","quantity":{"min":1,"max":20,"default":10,"label":"爆發星束數量","unit":"道","help":"聚合後向外放射的星束數量；前段星軌與星座保留。","previewTime":1.45},"lifecycle":{"start":0.34,"end":1.53},"name":"星軌匯爆","english":"Astral convergence","kind":3,"variant":7,"color":"#c1b8ff","duration":3.4,"burst":true,"description":"立體星軌與星座向中心匯聚，短暫壓縮後釋放星芒與錯時光痕。","category":"burst","tags":"星界 Astral 法術 魔法","schools":["astral"],"maxParticles":512,"seed":402189,"previewTime":0.35,"thumbnailTime":0.35},"defaults":{"speed":1,"detail":1,"color":"#c1b8ff","size":1,"density":0.5,"quantity":10}},{"preset":{"id":"astral-gate","lifecycle":{"start":0.8,"end":0.8},"name":"星隙門扉","english":"Astral gate","category":"portal","color":"#c1b8ff","description":"垂直門框分段展開，內面星紋持續流動；停止施放時開口收合，框緣隨之退光。","tags":"門 傳送 空間 星界 Astral","maxParticles":512,"kind":8,"variant":0,"duration":5,"burst":false,"seed":385854,"schools":["astral"],"previewTime":1.4,"thumbnailTime":1.4},"defaults":{"speed":1,"detail":1,"color":"#c1b8ff","size":1,"density":0.5}},{"preset":{"id":"dust-devil","lifecycle":{"start":1.7,"end":1.4},"name":"沙塵旋風","english":"Dust devil","category":"vortex","color":"#dcbb87","description":"厚實的分層沙帶交錯旋升，保留中心空隙，砂礫與大片捲塵各自流動。","tags":"沙 土 龍捲風 沙漠 卡通 賽璐璐","maxParticles":1024,"kind":4,"variant":1,"duration":5,"burst":false,"seed":165366,"renderStyle":"toon","schools":["sand"]},"defaults":{"speed":1,"detail":1,"color":"#dcbb87","size":1,"density":0.5}},{"preset":{"id":"healing-field","lifecycle":{"start":0.7,"end":1},"name":"治療領域","english":"Healing field","category":"area","color":"#86e9b2","description":"八瓣法陣逐圈送出治療光波，微小十字向上漂浮，符文隨恢復節奏明滅。","tags":"回血 治療 輔助 光環","maxParticles":512,"kind":2,"variant":0,"duration":5,"burst":false,"seed":82683,"schools":["light"]},"defaults":{"speed":1,"detail":1,"color":"#86e9b2","size":1,"density":0.5}},{"preset":{"id":"quicksand-seal","quantity":{"min":1,"max":6,"default":3,"label":"沙脊數量","unit":"組","help":"每組沙脊與配對的滑沙一起增減，底部封印保留。"},"lifecycle":{"start":0.7,"end":1},"name":"流砂封印","english":"Quicksand seal","kind":2,"variant":7,"color":"#dfba7c","duration":5,"burst":false,"description":"三角封印裡的沙脊向內流動，輪流堆起後崩落，細砂沿地面被吸入。","category":"area","tags":"沙塵 Sand 法術 魔法","schools":["sand"],"maxParticles":512,"seed":392182,"previewTime":1.5,"thumbnailTime":1.5},"defaults":{"speed":1,"detail":1,"color":"#dfba7c","size":1,"density":0.5,"quantity":3}},{"preset":{"id":"smoke-puff","lifecycle":{"start":0.35000000000000003,"end":1.575},"name":"消散煙團","english":"Smoke puff","category":"smoke","color":"#b1afc8","description":"煙團一次膨脹後散去，適合出現、消失與落地。","tags":"煙 消失 忍者 落地","maxParticles":96,"kind":5,"variant":3,"duration":3.5,"burst":true,"seed":220488},"defaults":{"speed":1,"detail":1,"color":"#b1afc8","size":1,"density":0.5}},{"preset":{"id":"tidal-surge","lifecycle":{"start":0.32000000000000006,"end":1.4400000000000002},"name":"潮汐衝湧","english":"Tidal surge","kind":3,"variant":6,"color":"#66cddd","duration":3.2,"burst":true,"description":"半環水浪向外推進，厚實浪頭自然翻捲，前緣碎成泡沫與水滴。","category":"burst","tags":"水流 Water 法術 魔法","schools":["water"],"maxParticles":512,"seed":382175,"previewTime":0.85,"thumbnailTime":0.85},"defaults":{"speed":1,"detail":1,"color":"#66cddd","size":1,"density":0.5}},{"preset":{"id":"flame-surge","quantity":{"min":1,"max":10,"default":5,"label":"火舌數量","unit":"道","help":"獨立翻捲火舌的數量，保留煙霧與火星。"},"lifecycle":{"start":0.30000000000000004,"end":1.35},"name":"火瀑噴湧","english":"Flame surge","kind":3,"variant":4,"color":"#ff823e","duration":3,"burst":true,"description":"連續扇形火面向上翻湧，翻捲的燃燒前緣撕裂成餘燼。","category":"burst","tags":"火焰 Fire 法術 魔法","schools":["fire"],"maxParticles":512,"seed":302119,"previewTime":0.7,"thumbnailTime":0.7},"defaults":{"speed":1,"detail":1,"color":"#ff823e","size":1,"density":0.5,"quantity":5}},{"preset":{"id":"fire-vortex","lifecycle":{"start":1.7,"end":1.4},"name":"火焰旋風","english":"Fire vortex","category":"vortex","color":"#ff884b","description":"暗面、橙焰與暖亮邊交錯旋升，破碎火邊與受火光照亮的底部煙塵持續翻捲。","tags":"火焰 龍捲風 旋風 卡通 賽璐璐","maxParticles":1024,"kind":4,"variant":2,"duration":5,"burst":false,"seed":174553,"renderStyle":"toon","schools":["fire"]},"defaults":{"speed":1,"detail":1,"color":"#ff884b","size":1,"density":0.5}},{"preset":{"id":"fire-explosion","lifecycle":{"start":0.27999999999999997,"end":1.26},"name":"火焰爆炸","english":"Fire explosion","category":"burst","color":"#ff9859","description":"三段熱色的火焰向上翻湧，大片煙冠膨脹後冷卻成分層暗煙。","tags":"火焰 爆破 命中 卡通 賽璐璐","maxParticles":1024,"kind":3,"variant":0,"duration":2.8,"burst":true,"seed":119431,"renderStyle":"toon","schools":["fire"]},"defaults":{"speed":1,"detail":1,"color":"#ff9859","size":1,"density":0.5}},{"preset":{"id":"fireball","lifecycle":{"start":0.35,"end":0.8},"name":"火球","english":"Fireball","category":"projectile","color":"#ff823e","description":"連續的立體火焰向後翻捲、拉伸與撕裂，燃燒前緣持續變形；三段卡通色階保留整體感與明暗層次。","tags":"火焰 法師 技能 飛行","maxParticles":768,"kind":0,"variant":0,"duration":5,"burst":false,"seed":9187,"schools":["fire"]},"defaults":{"speed":1,"detail":1,"color":"#ff823e","size":1,"density":0.5}},{"preset":{"id":"smoke-column","lifecycle":{"start":0.5,"end":1.2},"name":"煙柱","english":"Smoke column","category":"smoke","color":"#aeb9cb","description":"層疊煙團向上翻湧，隨高度擴散並逐漸變淡。","tags":"煙 環境 燃燒","maxParticles":128,"kind":5,"variant":0,"duration":5,"burst":false,"seed":192927},"defaults":{"speed":1,"detail":1,"color":"#aeb9cb","size":1,"density":0.5}},{"preset":{"id":"magma-fissure","quantity":{"min":1,"max":26,"default":13,"label":"岩塊組數","unit":"組","help":"每組裂痕兩側的岩塊一起起落；裂地長度與前進路徑保持固定。"},"lifecycle":{"start":0.18,"end":0.81},"name":"熔痕裂地","english":"Magma fissure","category":"burst","color":"#ff823e","description":"火痕沿地面向前逐段裂開，石片錯峰抬起後落回，流動熔光冷卻成零星餘燼。","tags":"裂地 地面 熔岩 火焰 Fire","maxParticles":512,"kind":3,"variant":8,"duration":1.8,"burst":true,"seed":358293,"schools":["fire"],"previewTime":0.65,"thumbnailTime":0.65},"defaults":{"speed":1,"detail":1,"color":"#ff823e","size":1,"density":0.5,"quantity":13}},{"preset":{"id":"burning-ground","lifecycle":{"start":0.7,"end":1},"name":"燃燒地面","english":"Burning ground","category":"area","color":"#ff914a","description":"五向炎刃依序發亮，地面裂隙流動，錯落火舌侵蝕消散而持續重生。","tags":"火焰 地板 傷害 範圍","maxParticles":1024,"kind":2,"variant":1,"duration":5,"burst":false,"seed":91870,"schools":["fire"]},"defaults":{"speed":1,"detail":1,"color":"#ff914a","size":1,"density":0.5}},{"preset":{"id":"revival-bloom","quantity":{"min":1,"max":28,"default":14,"label":"光瓣數量","unit":"片","help":"上下兩層光瓣的總數，調整後保持環形分布與向上綻放。"},"lifecycle":{"start":0.22,"end":0.99},"name":"生命回綻","english":"Revival bloom","category":"burst","color":"#ff8fbd","description":"自然光瓣從低處聚合，再向上舒展綻放，留下稀疏柔光，適合復甦與強化治療。","tags":"復活 復甦 治療 生命 自然 Nature 聖光 Light","maxParticles":512,"kind":3,"variant":9,"duration":2.2,"burst":true,"seed":404228,"schools":["nature","light"],"previewTime":1,"thumbnailTime":1},"defaults":{"speed":1,"detail":1,"color":"#ff8fbd","size":1,"density":0.5,"quantity":14}},{"preset":{"id":"prism-guard","quantity":{"min":1,"max":7,"default":7,"label":"護盾盾片數量","unit":"片","help":"盾片與各自稜光一起增減；最多保留完整七片盾面。"},"lifecycle":{"start":0.3,"end":0.65},"name":"稜光護盾","english":"Prism guard","category":"shield","color":"#73e3ff","description":"厚實稜面盾片拼合成朝前的弧面，片間空隙保留通透感；停止施放時依序收回。","tags":"護盾 防禦 格擋 保護 聖光 Light","maxParticles":512,"kind":7,"variant":0,"duration":5,"burst":false,"seed":367480,"schools":["light"],"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#73e3ff","size":1,"density":0.5,"quantity":7}},{"preset":{"id":"binding-curse","quantity":{"min":1,"max":6,"default":3,"label":"束縛弧數量","unit":"條","help":"環繞目標的立體束縛弧數量，保留地面咒陣。"},"lifecycle":{"start":0.7,"end":1},"name":"縛魂咒陣","english":"Binding curse","kind":2,"variant":5,"color":"#ae7be5","duration":5,"burst":false,"description":"三向鉤狀咒印散開侵蝕，立體束縛弧交替收緊，暗面與亮邊維持清楚輪廓。","category":"area","tags":"黑暗 Dark 法術 魔法","schools":["dark"],"maxParticles":512,"seed":352154,"previewTime":1.4,"thumbnailTime":1.4},"defaults":{"speed":1,"detail":1,"color":"#ae7be5","size":1,"density":0.5,"quantity":3}},{"preset":{"id":"radiant-beam","lifecycle":{"start":0.4,"end":0.6},"name":"聖輝光束","english":"Radiant beam","kind":1,"variant":4,"color":"#ffe3a0","duration":5,"burst":false,"description":"日輪印記持續射出稜面光柱，亮紋沿軸推進，命中端綻放連續光瓣。","category":"beam","tags":"聖光 Light 法術 魔法","schools":["light"],"maxParticles":512,"seed":342147,"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#ffe3a0","size":1,"density":0.5}},{"preset":{"id":"energy-vortex","lifecycle":{"start":1.7,"end":1.4},"name":"能量漩渦","english":"Energy vortex","category":"vortex","color":"#bba5ff","description":"分段能量帶與跳動亮紋交錯旋升，符印沿通透風眼流動。","tags":"魔法 能量 傳送 龍捲風 卡通 賽璐璐","maxParticles":768,"kind":4,"variant":3,"duration":5,"burst":false,"seed":183740,"renderStyle":"toon","schools":["arcane"]},"defaults":{"speed":1,"detail":1,"color":"#bba5ff","size":1,"density":0.5}},{"preset":{"id":"energy-burst","quantity":{"previewTime":0.35,"min":1,"max":24,"default":12,"label":"主放電數量","unit":"道","help":"每道主放電及其兩條子分岔一起增減；裝飾碎電另由密度調整。"},"lifecycle":{"start":0.27999999999999997,"end":1.26},"name":"能量爆裂","english":"Energy burst","category":"burst","color":"#72d9ff","description":"中心閃光後，分岔雷電向外、向上錯時爆開，伴隨細小電火花與局部餘電，逐漸消散。","tags":"科幻 命中 能量 卡通 賽璐璐 雷電 放電 電弧","maxParticles":768,"kind":3,"variant":1,"duration":2.8,"burst":true,"seed":128618,"renderStyle":"toon","schools":["storm"]},"defaults":{"speed":1,"detail":1,"color":"#72d9ff","size":1,"density":0.5,"quantity":12}},{"preset":{"id":"pulse-beam","quantity":{"min":1,"max":8,"default":4,"label":"脈衝波數","unit":"道","help":"固定射程內的主要脈衝波數。流速保持不變，數量增加時脈衝更密。"},"lifecycle":{"start":0.4,"end":0.6},"name":"脈衝光束","english":"Pulse beam","category":"beam","color":"#71e7dc","description":"收縮細線串起膨脹的脈衝節點與前進光環，兩端持續釋放波紋。","tags":"雷射 激光 脈衝 射擊","maxParticles":512,"kind":1,"variant":1,"duration":5,"burst":false,"seed":55122},"defaults":{"speed":1,"detail":1,"color":"#71e7dc","size":1,"density":0.5,"quantity":4}},{"preset":{"id":"venom-pool","quantity":{"min":1,"max":14,"default":7,"label":"毒泡數量","unit":"個","help":"毒沼表面的立體鼓泡數量，保留地面毒沼。"},"lifecycle":{"start":0.7,"end":1},"name":"腐蝕毒沼","english":"Venom pool","kind":2,"variant":8,"color":"#acdc6f","duration":5,"burst":false,"description":"三瓣毒咒法陣隆起毒泡，破裂波紋擴散，少量低矮毒氣緩慢游移。","category":"area","tags":"劇毒 Poison 法術 魔法","schools":["poison"],"maxParticles":512,"seed":422203,"previewTime":1.6,"thumbnailTime":1.6},"defaults":{"speed":1,"detail":1,"color":"#acdc6f","size":1,"density":0.5,"quantity":7}},{"preset":{"id":"thorn-crown","quantity":{"min":1,"max":8,"default":4,"label":"藤蔓數量","unit":"株","help":"每株藤蔓與它的葉片、尖刺一起增減，中央花冠保留。"},"lifecycle":{"start":0.7,"end":1},"name":"荊棘花冠","english":"Thorn crown","kind":2,"variant":6,"color":"#88d49a","duration":5,"burst":false,"description":"葉脈法陣長出彎曲荊棘藤蔓，葉片展開，花冠沿生長節奏脈動。","category":"area","tags":"自然 Nature 法術 魔法","schools":["nature"],"maxParticles":512,"seed":362161,"previewTime":1.4,"thumbnailTime":1.4},"defaults":{"speed":1,"detail":1,"color":"#88d49a","size":1,"density":0.5,"quantity":4}},{"preset":{"id":"steam-jet","lifecycle":{"start":0.5,"end":1.2},"name":"蒸汽噴發","english":"Steam jet","category":"smoke","color":"#d1dfe8","description":"窄束蒸汽快速上衝，頂部散開成薄薄雲霧。","tags":"蒸氣 工業 噴射","maxParticles":96,"kind":5,"variant":2,"duration":5,"burst":false,"seed":211301,"schools":["water"]},"defaults":{"speed":1,"detail":1,"color":"#d1dfe8","size":1,"density":0.5}},{"preset":{"id":"charged-beam","lifecycle":{"start":1.6,"end":0.6},"name":"蓄力光束","english":"Charged beam","category":"beam","color":"#f6c76c","description":"啟動聚能後持續開火，發射端旋流不斷吸入，命中端持續噴散電漿與壓力環；重播才重新蓄力。","tags":"雷射 蓄力 大招 科幻","maxParticles":768,"kind":1,"variant":2,"duration":5,"burst":false,"seed":64309},"defaults":{"speed":1,"detail":1,"color":"#f6c76c","size":1,"density":0.5}},{"preset":{"id":"spiral-gale","lifecycle":{"start":0.35,"end":0.8},"name":"螺旋風槍","english":"Spiral gale","kind":0,"variant":6,"color":"#b4e5d5","duration":5,"burst":false,"description":"開放式螺旋氣流穿刺前進，短幅風面翻捲，尾端留下逐漸收束的風痕。","category":"projectile","tags":"風 Wind 法術 魔法","schools":["wind"],"maxParticles":512,"seed":412196,"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#b4e5d5","size":1,"density":0.5}},{"preset":{"id":"shockwave","lifecycle":{"start":0.27999999999999997,"end":1.26},"name":"衝擊波","english":"Shockwave","category":"burst","color":"#f0cf9d","description":"分層壓力前緣向外推進，大片塵浪向上翻捲，暗面碎礫落回地面。","tags":"衝擊 地面 爆炸 範圍 卡通 賽璐璐","maxParticles":512,"kind":3,"variant":2,"duration":2.8,"burst":true,"seed":137805,"renderStyle":"toon"},"defaults":{"speed":1,"detail":1,"color":"#f0cf9d","size":1,"density":0.5}},{"preset":{"id":"storm-enchant","quantity":{"min":1,"max":12,"default":6,"label":"雷紋分支數量","unit":"道","help":"每組主雷紋、分岔及遊走電流一起增減，中央符印保留。"},"lifecycle":{"start":0.35,"end":0.55},"name":"雷印附魔","english":"Storm enchant","category":"status","color":"#a9bbff","description":"局部雷紋環繞掛接物件，分支電流間歇遊走；停止施放時沿符印逐段退電。","tags":"附魔 武器 雷印 電流 風暴 Storm","maxParticles":512,"kind":9,"variant":0,"duration":5,"burst":false,"seed":431789,"schools":["storm"],"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#a9bbff","size":1,"density":0.5,"quantity":6}},{"preset":{"id":"thunder-strike","lifecycle":{"start":0.26,"end":1.1700000000000002},"name":"雷霆落擊","english":"Thunder strike","kind":3,"variant":5,"color":"#a9bbff","duration":2.6,"burst":true,"description":"分岔落雷從上方劈向地面，沿地表放電後，局部餘電接續跳動消散。","category":"burst","tags":"風暴 Storm 法術 魔法","schools":["storm"],"maxParticles":512,"seed":332140,"previewTime":0.28,"thumbnailTime":0.28},"defaults":{"speed":1,"detail":1,"color":"#a9bbff","size":1,"density":0.5}},{"preset":{"id":"arc-ray","quantity":{"min":1,"max":12,"default":6,"label":"電弧數量","unit":"道","help":"端點之間的獨立電弧數，保留兩端耀光及原射程。"},"lifecycle":{"start":0.4,"end":0.6},"name":"電弧射線","english":"Arc ray","category":"beam","color":"#a6b5ff","description":"六股不規則電弧持續分叉跳躍，兩端放電冠連結發射與命中。","tags":"閃電 電擊 雷射","maxParticles":768,"kind":1,"variant":3,"duration":5,"burst":false,"seed":73496,"schools":["storm"]},"defaults":{"speed":1,"detail":1,"color":"#a6b5ff","size":1,"density":0.5,"quantity":6}},{"preset":{"id":"plasma-bolt","lifecycle":{"start":0.35,"end":0.8},"name":"電漿彈","english":"Plasma bolt","category":"projectile","color":"#73e3ff","description":"卡通電漿穿刺體持續壓縮脈動，分段明暗搭配跳動電弧，斷續電荷沿尾跡向後爆衝。","tags":"科幻 能量 子彈","maxParticles":512,"kind":0,"variant":1,"duration":5,"burst":false,"seed":18374},"defaults":{"speed":1,"detail":1,"color":"#73e3ff","size":1,"density":0.5}},{"preset":{"id":"frost-wheel","lifecycle":{"start":0.35,"end":0.8},"name":"霜輪飛刃","english":"Frost wheel","kind":0,"variant":4,"color":"#a9dfff","duration":5,"burst":false,"description":"中空冰輪帶著不對稱晶齒高速旋轉，厚實晶面掠過冷光，沿尾跡脫落細霜。","category":"projectile","tags":"冰霜 Ice 法術 魔法","schools":["ice"],"maxParticles":512,"seed":312126,"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#a9dfff","size":1,"density":0.5}},{"preset":{"id":"soul-siphon","quantity":{"min":1,"max":18,"default":9,"label":"每輪能量珠","unit":"顆","help":"每輪回流的能量珠數量，分股回到施法端；不等於同時可見數。"},"lifecycle":{"start":0.35,"end":0.65},"name":"靈魂汲流","english":"Soul siphon","category":"beam","color":"#a883e8","description":"黑暗能量由目標端分股回流施法端，停止供給後，餘下能量繼續流動並完成回收。","tags":"汲取 吸收 靈魂 黑暗 Dark","maxParticles":512,"kind":1,"variant":5,"duration":5,"burst":false,"seed":395041,"schools":["dark"],"previewTime":1.2,"thumbnailTime":1.2},"defaults":{"speed":1,"detail":1,"color":"#a883e8","size":1,"density":0.5,"quantity":9}},{"preset":{"id":"wind-vortex","lifecycle":{"start":1.7,"end":1.4},"name":"風旋","english":"Wind vortex","category":"vortex","color":"#a4dfd1","description":"寬幅交錯氣流呈現簡潔亮暗面，葉片穿過風眼，底部煙塵持續向內捲入。","tags":"風 龍捲風 旋風 卡通 賽璐璐","maxParticles":768,"kind":4,"variant":0,"duration":5,"burst":false,"seed":156179,"renderStyle":"toon","schools":["wind"]},"defaults":{"speed":1,"detail":1,"color":"#a4dfd1","size":1,"density":0.5}},{"preset":{"id":"magic-barrier","lifecycle":{"start":0.7,"end":1},"name":"魔法結界","english":"Magic barrier","category":"area","color":"#bba3ff","description":"雙方印與八角符文交替掃光，細胞狀防護網格沿半球升起，方形符片持續閃動。","tags":"護盾 防禦 法陣 範圍","maxParticles":768,"kind":2,"variant":3,"duration":5,"burst":false,"seed":110244,"schools":["arcane"]},"defaults":{"speed":1,"detail":1,"color":"#bba3ff","size":1,"density":0.5}}]'),Mt=St.map(({preset:i,defaults:t})=>({id:i.id,name:String(i.name),english:String(i.english),category:String(i.category),color:String(i.color),description:String(i.description||""),burst:!!i.burst,duration:Number(i.duration)||3,...i.quantity?{quantity:i.quantity}:{},...i.spread?{spread:i.spread}:{},defaults:t})),Et=[["projectile","投射物"],["beam","光束"],["burst","爆炸"],["area","範圍法陣"],["vortex","旋風"],["smoke","煙霧"],["shield","防禦"],["portal","傳送門"],["status","附魔"],["environment","環境"]],_t="來自 00GameDevs 特效庫（作者 @00vchannel）",At=i=>Mt.find(t=>t.id===i.replace(ae,""));function Wt(i,t={},r=`${ae}${i}`){const e=At(i);return{id:r,name:e?.name||i,duration:e?.burst?e.duration:2.6,loop:!1,rate:0,burst:0,life:[.5,1],emitter:"point",area:0,speed:[0,0],direction:[0,1,0],spread:0,gravity:0,drag:0,turbulence:0,orbit:0,size:[.1,0],colors:[t.color||e?.color||"#ffffff"],alpha:[1,1,0],shape:"soft",blend:"add",spin:0,stretch:0,glow:1,world:!0,vfx:{id:e?.id||i,options:t}}}const It=["pop","gulp","splash","jump","land","morph","chime","coin","click","whoosh","break","fire","error","talk","levelup","boing","hit","slash","bow","pound","thunder","chomp","yum","hurt","flap","pickup","drop","chest","coins","swoosh","impact","sparkle","shutter","thwip","roar","breath","sputter"];let z=null,S=null,O=null,Fe=.7,q=1;const Ct={pop:.08,gulp:.07,splash:.06,jump:.05,land:.07,boing:.06,hit:.08,slash:.06,bow:.05,pound:.05,chomp:.07,hurt:.04,flap:.08,drop:.05,break:.05,whoosh:.08,swoosh:.07,talk:0,fire:.06,impact:.03,sparkle:.04,coin:.015,click:.03,thwip:.07,roar:.05,breath:.05,sputter:.06};function E(){if(!z)try{const i=window.AudioContext||window.webkitAudioContext;if(!i)return null;z=new i,S=z.createGain(),S.gain.value=Fe,O=z.createBiquadFilter(),O.type="lowpass",O.frequency.value=2e4,O.Q.value=.5,S.connect(O),O.connect(z.destination)}catch{return null}return z.state==="suspended"&&z.resume().catch(()=>{}),z}function Ht(){E()}let Ce=0;function $t(i){const t=Math.max(0,Math.min(1,i));!z||!O||Math.abs(t-Ce)<.01||(Ce=t,O.frequency.setTargetAtTime(2e4*Math.pow(650/2e4,t),z.currentTime,.06))}function p(i,t,r,e,a,s,o,n=.005){const l=i.createOscillator(),c=i.createGain();l.type=t,l.frequency.setValueAtTime(r*q,a),l.frequency.exponentialRampToValueAtTime(Math.max(20,e*q),a+s),c.gain.setValueAtTime(0,a),c.gain.linearRampToValueAtTime(o,a+n),c.gain.exponentialRampToValueAtTime(1e-4,a+s),l.connect(c),c.connect(S),l.start(a),l.stop(a+s+.02)}function v(i,t,r,e,a,s=1,o="bandpass"){const n=Math.max(1,Math.floor(i.sampleRate*r)),l=i.createBuffer(1,n,i.sampleRate),c=l.getChannelData(0);for(let h=0;h<n;h++)c[h]=(Math.random()*2-1)*(1-h/n);const u=i.createBufferSource();u.buffer=l;const d=i.createBiquadFilter();d.type=o,d.frequency.value=a*q,d.Q.value=s;const f=i.createGain();f.gain.value=e,u.connect(d),d.connect(f),f.connect(S),u.start(t)}function me(i,t,r,e,a,s,o=1.2){const n=Math.max(1,Math.floor(i.sampleRate*r)),l=i.createBuffer(1,n,i.sampleRate),c=l.getChannelData(0);for(let h=0;h<n;h++)c[h]=Math.random()*2-1;const u=i.createBufferSource();u.buffer=l;const d=i.createBiquadFilter();d.type="bandpass",d.Q.value=o,d.frequency.setValueAtTime(a*q,t),d.frequency.exponentialRampToValueAtTime(Math.max(40,s*q),t+r);const f=i.createGain();f.gain.setValueAtTime(0,t),f.gain.linearRampToValueAtTime(e,t+r*.35),f.gain.exponentialRampToValueAtTime(1e-4,t+r),u.connect(d),d.connect(f),f.connect(S),u.start(t),u.stop(t+r+.02)}function pe(i,t,r,e,a,s,o,n,l,c){const u=Math.max(1,Math.floor(i.sampleRate*r)),d=i.createBuffer(1,u,i.sampleRate),f=d.getChannelData(0);for(let C=0;C<u;C++)f[C]=Math.random()*2-1;const h=i.createBufferSource();h.buffer=d;const T=i.createBiquadFilter();T.type=a,T.Q.value=n,T.frequency.setValueAtTime(s*q,t),T.frequency.linearRampToValueAtTime(Math.max(40,o*q),t+r);const y=i.createGain();return y.gain.setValueAtTime(0,t),y.gain.linearRampToValueAtTime(e,t+l),y.gain.setValueAtTime(e,t+Math.max(l,r-c)),y.gain.exponentialRampToValueAtTime(1e-4,t+r),h.connect(T),T.connect(y),y.connect(S),h.start(t),h.stop(t+r+.02),y}function Dt(i,t,r){const a=i.createOscillator();a.type="sine",a.frequency.setValueAtTime(26,t),a.frequency.linearRampToValueAtTime(19,t+1.55);const s=i.createGain();s.gain.value=14*q,a.connect(s);const o=i.createBiquadFilter();o.type="lowpass",o.Q.value=3.2,o.frequency.setValueAtTime(380,t),o.frequency.linearRampToValueAtTime(1350,t+.32),o.frequency.exponentialRampToValueAtTime(420,t+1.55);const n=i.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(.26*r,t+.2),n.gain.setValueAtTime(.26*r,t+.9),n.gain.exponentialRampToValueAtTime(1e-4,t+1.55),o.connect(n),n.connect(S);for(const[u,d,f]of[[74,"sawtooth",1],[111,"square",.45],[148,"sawtooth",.3]]){const h=i.createOscillator();h.type=d,h.frequency.setValueAtTime(u*.82*q,t),h.frequency.linearRampToValueAtTime(u*1.12*q,t+.38),h.frequency.exponentialRampToValueAtTime(u*.7*q,t+1.55),s.connect(h.frequency);const T=i.createGain();T.gain.value=f,h.connect(T),T.connect(o),h.start(t),h.stop(t+1.55+.05)}const l=pe(i,t,1.55,.2*r,"bandpass",520,300,1.1,.18,.5),c=i.createGain();c.gain.value=.09*r,a.connect(c),c.connect(l.gain),a.start(t),a.stop(t+1.55+.05),p(i,"sine",62,30,t,.65,.34*r,.03),pe(i,t+.05,1.55*.8,.05*r,"highpass",2400,1600,.7,.2,.5)}function Rt(i,t,r){p(i,"sine",150,42,t,.38,.32*r,.01),v(i,t,.3,.2*r,420,.8,"lowpass"),pe(i,t+.03,.5,.16*r,"bandpass",500,1100,.7,.1,.35);for(let e=0;e<3;e++)v(i,t+.08+Math.random()*.3,.02+Math.random()*.04,(.05+Math.random()*.07)*r,1800+Math.random()*2600,2)}function qt(i,t,r){for(let e=0;e<3;e++){const a=t+e*.11+Math.random()*.03;v(i,a,.09,(.16-e*.04)*r,380-e*60,.9,"lowpass"),p(i,"sine",120-e*18,50,a,.1,(.12-e*.03)*r,.005)}me(i,t+.05,.45,.07*r,2400,700,1.4);for(let e=0;e<5;e++)v(i,t+.1+Math.random()*.4,.015+Math.random()*.025,(.04+Math.random()*.06)*r,2200+Math.random()*2400,2.2)}function Xt(i,t=1,r={}){const e=E();if(!e||!S||Fe<=0)return;const a=e.currentTime+.005,s=Math.max(.2,Math.min(1.5,t)),o=Ct[i]??0;switch(q=(r.pitch??1)*(1+(Math.random()*2-1)*o),i){case"pop":p(e,"sine",520,1180,a,.09,.25*s);break;case"boing":p(e,"triangle",180,520,a,.25,.22*s),p(e,"sine",360,900,a+.04,.18,.1*s);break;case"gulp":p(e,"sine",300,90,a,.18,.32*s),p(e,"sine",210,70,a+.12,.16,.22*s);break;case"splash":v(e,a,.35,.22*s,1800,.7),v(e,a+.05,.25,.12*s,900,1.2);break;case"jump":p(e,"triangle",210,560,a,.18,.26*s),p(e,"sine",520,1150,a+.03,.12,.12*s),v(e,a,.05,.05*s,2600,1.4);break;case"land":p(e,"sine",160,60,a,.14,.28*s),v(e,a,.08,.08*s,500,1);break;case"morph":p(e,"sine",200,900,a,.45,.18*s),p(e,"triangle",400,1600,a+.2,.4,.1*s),v(e,a,.5,.05*s,2400,2);break;case"chime":p(e,"sine",880,880,a,.5,.14*s),p(e,"sine",1320,1320,a+.09,.5,.1*s);break;case"coin":p(e,"square",988,988,a,.07,.08*s),p(e,"square",1319,1319,a+.07,.2,.08*s);break;case"click":p(e,"sine",900,700,a,.05,.12*s);break;case"talk":p(e,"triangle",500+Math.random()*200,420,a,.05,.06*s);break;case"whoosh":v(e,a,.4,.14*s,700,.6,"lowpass");break;case"break":v(e,a,.5,.3*s,300,.8,"lowpass"),p(e,"square",120,40,a,.3,.08*s);break;case"fire":v(e,a,.6,.16*s,1200,.5);break;case"error":p(e,"square",220,180,a,.15,.08*s),p(e,"square",180,150,a+.14,.2,.08*s);break;case"levelup":[523,659,784,1047].forEach((n,l)=>p(e,"triangle",n,n,a+l*.09,.3,.12*s));break;case"hit":p(e,"sine",240,70,a,.14,.3*s),v(e,a,.09,.16*s,1400,.9);break;case"slash":v(e,a,.22,.18*s,3200,1.4,"highpass"),p(e,"sine",1400,600,a,.12,.04*s);break;case"bow":p(e,"triangle",190,110,a,.16,.14*s),v(e,a+.02,.2,.1*s,2600,1.2);break;case"pound":p(e,"sine",110,38,a,.45,.4*s),v(e,a,.4,.24*s,260,.7,"lowpass");break;case"thunder":v(e,a,2.4,.32*s,140,.5,"lowpass"),v(e,a+.05,.5,.18*s,900,.6);break;case"chomp":v(e,a,.07,.26*s,2300,1.6),p(e,"square",330,120,a,.06,.07*s),v(e,a+.06,.16,.16*s,700,1.1),p(e,"sine",260,80,a+.12,.2,.3*s);break;case"yum":[784,988,1319].forEach((n,l)=>p(e,"triangle",n,n*1.01,a+l*.06,.22,.1*s)),p(e,"sine",2637,2637,a+.2,.3,.05*s);break;case"hurt":p(e,"sawtooth",420,160,a,.22,.1*s),p(e,"sine",300,110,a,.25,.2*s),v(e,a,.12,.1*s,1800,1);break;case"flap":v(e,a,.16,.12*s,520,.7,"lowpass"),v(e,a+.02,.1,.05*s,1400,.8);break;case"pickup":p(e,"triangle",523,523,a,.1,.1*s),p(e,"triangle",784,784,a+.08,.12,.1*s),p(e,"sine",1568,1568,a+.16,.25,.07*s),v(e,a,.06,.05*s,4e3,1.2,"highpass");break;case"chest":v(e,a,.25,.1*s,380,2.2),p(e,"triangle",196,230,a,.22,.08*s),[523,659,784,1047].forEach((n,l)=>p(e,"triangle",n,n,a+.2+l*.07,.32,.11*s)),p(e,"sine",2093,2093,a+.5,.5,.05*s);break;case"coins":for(let n=0;n<6;n++){const l=1800+Math.random()*900;p(e,"square",l,l*1.02,a+n*.055+Math.random()*.02,.07,.035*s),p(e,"sine",l*1.5,l*1.5,a+n*.055+.01,.12,.03*s)}break;case"drop":p(e,"triangle",392,262,a,.16,.12*s),v(e,a+.05,.1,.1*s,600,.9,"lowpass");break;case"swoosh":me(e,a,.32,.16*s,380,1500,1.6),me(e,a+.03,.26,.07*s,900,2600,3);break;case"impact":p(e,"sine",92,34,a,.7,.46*s,.004),p(e,"triangle",180,60,a,.28,.16*s),v(e,a,.55,.2*s,220,.6,"lowpass"),v(e,a,.06,.12*s,2400,1.2);break;case"sparkle":p(e,"sine",2637,2637,a,.22,.045*s),p(e,"sine",3520,3520,a+.05,.3,.035*s);break;case"shutter":v(e,a,.018,.3*s,3800,1.4,"highpass"),v(e,a+.02,.05,.1*s,1600,1.1),v(e,a+.075,.025,.2*s,2800,1.4,"highpass"),p(e,"sine",1200,900,a+.075,.04,.04*s);break;case"thwip":v(e,a,.07,.2*s,4200,1.8,"highpass"),p(e,"sine",2100,700,a,.06,.05*s),v(e,a+.06,.05,.12*s,1600,1.2);break;case"roar":Dt(e,a,s);break;case"breath":Rt(e,a,s);break;case"sputter":qt(e,a,s);break}q=1}let he=null;function Kt(i){const t=E();if(!(!t||!S)){if(!he){if(i<=.001)return;const r=t.sampleRate*2,e=t.createBuffer(1,r,t.sampleRate),a=e.getChannelData(0);for(let c=0;c<r;c++)a[c]=Math.random()*2-1;const s=t.createBufferSource();s.buffer=e,s.loop=!0;const o=t.createBiquadFilter();o.type="bandpass",o.frequency.value=1500,o.Q.value=.5;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=5200;const l=t.createGain();l.gain.value=0,s.connect(o),o.connect(n),n.connect(l),l.connect(S),s.start(),he={gain:l,src:s}}he.gain.gain.setTargetAtTime(Math.max(0,Math.min(1,i))*.2,t.currentTime,.9)}}function ye(i,t=2){const r=i.sampleRate*t,e=i.createBuffer(1,r,i.sampleRate),a=e.getChannelData(0);for(let o=0;o<r;o++)a[o]=Math.random()*2-1;const s=i.createBufferSource();return s.buffer=e,s.loop=!0,s}let ee=null,se=null,I=0;function Qt(i){const t=E();if(!(!t||!S)){if(I=Math.max(0,Math.min(1,i)),!ee){if(I<=.001)return;const r=ye(t),e=t.createBiquadFilter();e.type="bandpass",e.frequency.value=180,e.Q.value=.9;const a=t.createOscillator();a.type="sawtooth",a.frequency.value=96;const s=t.createOscillator();s.frequency.value=5.5;const o=t.createGain();o.gain.value=9,s.connect(o),o.connect(a.frequency);const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=420;const l=t.createGain();l.gain.value=.18;const c=t.createGain();c.gain.value=0,r.connect(e),e.connect(c),a.connect(n),n.connect(l),l.connect(c),c.connect(S),r.start(),a.start(),s.start(),ee={gain:c,stop:()=>{try{r.stop(),a.stop(),s.stop()}catch{}c.disconnect()}},se=setInterval(()=>{const u=z;if(!u||!S||I<.02||Math.random()>.55)return;const d=u.currentTime+Math.random()*.15;v(u,d,.03+Math.random()*.05,(.06+Math.random()*.12)*I,1800+Math.random()*2600,2)},90)}ee.gain.gain.setTargetAtTime(I*.55,t.currentTime,.25)}}let H=null;function Zt(i,t=0){const r=E();if(!r||!S)return;const e=Math.max(0,Math.min(1,i));if(!H){if(e<=.001)return;const s=ye(r,3),o=r.createBiquadFilter();o.type="bandpass",o.frequency.value=420,o.Q.value=.7;const n=r.createBiquadFilter();n.type="lowpass",n.frequency.value=1400;const l=r.createGain();l.gain.value=0,s.connect(o),o.connect(n),n.connect(l),l.connect(S),s.start(),H={gain:l,band:o,stop:()=>{try{s.stop()}catch{}l.disconnect()}}}const a=Math.max(0,Math.min(1,t));H.gain.gain.setTargetAtTime(e*(.035+a*.11),r.currentTime,.6),H.band.frequency.setTargetAtTime(340+a*420,r.currentTime,.8)}let j=null;function Jt(i,t=0){const r=E();if(!r||!S)return;const e=Math.max(0,Math.min(1,i)),a=Math.max(0,Math.min(1,t));if(!j){if(e<=.001)return;const o=r.createOscillator(),n=r.createOscillator();o.type="triangle",n.type="sawtooth";const l=r.createOscillator();l.frequency.value=7.5;const c=r.createGain();c.gain.value=3,l.connect(c),c.connect(o.frequency);const u=r.createBiquadFilter();u.type="lowpass",u.frequency.value=260,u.Q.value=.8;const d=r.createGain();d.gain.value=.25;const f=r.createGain();f.gain.value=0,o.connect(u),n.connect(d),d.connect(u),u.connect(f),f.connect(S),o.start(),n.start(),l.start(),j={gain:f,a:o,b:n,filter:u,stop:()=>{try{o.stop(),n.stop(),l.stop()}catch{}f.disconnect()}}}const s=r.currentTime;j.a.frequency.setTargetAtTime(48+a*58,s,.18),j.b.frequency.setTargetAtTime(48.7+a*58.6,s,.18),j.filter.frequency.setTargetAtTime(220+a*420,s,.25),j.gain.gain.setTargetAtTime(e*(.11+a*.07),s,.2)}let te=null,oe=null,J=0;function Yt(i){const t=E();if(!t||!S)return;const r=Math.max(0,Math.min(1,i));if(!te){if(r<=.001)return;const a=ye(t,2),s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=240,s.Q.value=.8;const o=t.createBiquadFilter();o.type="bandpass",o.frequency.value=900,o.Q.value=.7;const n=t.createOscillator();n.frequency.value=3.1;const l=t.createGain();l.gain.value=180,n.connect(l),l.connect(o.frequency);const c=t.createGain();c.gain.value=.75;const u=t.createGain();u.gain.value=.45;const d=t.createGain();d.gain.value=0,a.connect(s),s.connect(c),c.connect(d),a.connect(o),o.connect(u),u.connect(d),d.connect(S),a.start(),n.start(),te={gain:d,band:o,stop:()=>{try{a.stop(),n.stop()}catch{}d.disconnect()}},oe=setInterval(()=>{const f=z;!f||!S||J<.05||Math.random()>.6||v(f,f.currentTime+Math.random()*.08,.02+Math.random()*.04,(.04+Math.random()*.07)*J,1800+Math.random()*2600,2)},70)}const e=r>J;J=r,te.gain.gain.setTargetAtTime(r*.38,t.currentTime,e?.06:.12)}function ea(){ee?.stop(),H?.stop(),j?.stop(),te?.stop(),I=0,J=0,se&&(clearInterval(se),se=null),oe&&(clearInterval(oe),oe=null),ee=null,H=null,j=null,te=null}export{ht as A,ct as B,gt as E,wt as P,It as S,Mt as V,Nt as a,Vt as b,bt as c,Bt as d,yt as e,Et as f,_t as g,jt as h,Wt as i,St as j,fe as k,Gt as l,Ot as m,$t as n,Kt as o,Xt as p,Jt as q,Yt as r,Lt as s,Qt as t,Ht as u,At as v,Zt as w,ea as x,ut as y,dt as z};
