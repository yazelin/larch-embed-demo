import{k as x,V as X,f as U,ah as we,ai as ye,aj as be,ak as Te,al as De,am as ke,an as Se,ao as Pe,ap as Ce,aq as Ue,ar as Re,as as Fe,at as Me,au as Ae,d as ve,U as Be,Z as fe,_ as me,av as V,aw as E,ax as Ne,ay as ze,az as L,aA as H,a9 as S,aB as $,C,S as de,aC as pe,a as xe,aD as ee,c as ge,v as We,aE as Le}from"./three-engine-DBk0tA82.js";import{c as K}from"./compileQuietly-CK7nzn7y.js";const te={pop:{frequency:3.2,damping:.42},snappy:{frequency:5.5,damping:.62},jelly:{frequency:2.6,damping:.28}};function _e(a,e,r,t,n){if(t<=0)return[a,e];const u=Math.max(.01,n.frequency)*Math.PI*2,o=Math.max(0,n.damping),i=a-r;if(o<1){const w=u*Math.sqrt(1-o*o),F=Math.exp(-o*u*t),R=Math.cos(w*t),z=Math.sin(w*t),g=i,_=(e+o*u*i)/w,Y=F*(g*R+_*z),q=F*((_*w-o*u*g)*R-(g*w+o*u*_)*z);return[r+Y,q]}if(o===1){const w=Math.exp(-u*t),F=i,R=e+u*i;return[r+w*(F+R*t),w*(R-u*(F+R*t))]}const f=Math.sqrt(o*o-1),m=-u*(o-f),c=-u*(o+f),v=(e-m*i)/(c-m),p=i-v,k=Math.exp(m*t),P=Math.exp(c*t);return[r+p*k+v*P,p*m*k+v*c*P]}class Q{value;velocity=0;target;cfg;constructor(e=0,r=te.snappy){this.value=e,this.target=e,this.cfg=r}set(e){return this.target=e,this}snap(e){return this.value=e,this.target=e,this.velocity=0,this}kick(e){return this.velocity+=e,this}step(e){return[this.value,this.velocity]=_e(this.value,this.velocity,this.target,Math.min(e,.1),this.cfg),this.value}get settled(){return Math.abs(this.value-this.target)<1e-4&&Math.abs(this.velocity)<.001}}class rt{x;y;z;constructor(e=[0,0,0],r=te.snappy){this.x=new Q(e[0],r),this.y=new Q(e[1],r),this.z=new Q(e[2],r)}set(e){return this.x.set(e[0]),this.y.set(e[1]),this.z.set(e[2]),this}snap(e){return this.x.snap(e[0]),this.y.snap(e[1]),this.z.snap(e[2]),this}kick(e){return this.x.kick(e[0]),this.y.kick(e[1]),this.z.kick(e[2]),this}step(e){return[this.x.step(e),this.y.step(e),this.z.step(e)]}get value(){return[this.x.value,this.y.value,this.z.value]}get settled(){return this.x.settled&&this.y.settled&&this.z.settled}}function st(a,e=0,r=te.pop){const t=a-e;if(t<=0)return 0;const n=r.frequency*Math.PI*2,u=Math.min(.999,r.damping),o=n*Math.sqrt(1-u*u);return 1-Math.exp(-u*n*t)*(Math.cos(o*t)+u*n/o*Math.sin(o*t))}function it(a,e){return 1-Math.exp(-a*e)}const B=`
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
varying vec2 vUv;
float aLuma(vec3 c) { return dot(c, vec3(.299, .587, .114)); }
float aHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float aNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(aHash(i), aHash(i + vec2(1., 0.)), f.x), mix(aHash(i + vec2(0., 1.)), aHash(i + vec2(1., 1.)), f.x), f.y);
}
float aFbm(vec2 p) { float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * aNoise(p); p = p * 2.03 + 17.1; a *= .5; } return s; }
// How sharply the brightness changes here (Sobel), sampled \`px\` apart.
float aEdge(vec2 uv, vec2 px) {
  float tl = aLuma(texture2D(tDiffuse, uv + px * vec2(-1., 1.)).rgb), tc = aLuma(texture2D(tDiffuse, uv + px * vec2(0., 1.)).rgb), tr = aLuma(texture2D(tDiffuse, uv + px * vec2(1., 1.)).rgb);
  float ml = aLuma(texture2D(tDiffuse, uv + px * vec2(-1., 0.)).rgb), mr = aLuma(texture2D(tDiffuse, uv + px * vec2(1., 0.)).rgb);
  float bl = aLuma(texture2D(tDiffuse, uv + px * vec2(-1., -1.)).rgb), bc = aLuma(texture2D(tDiffuse, uv + px * vec2(0., -1.)).rgb), br = aLuma(texture2D(tDiffuse, uv + px * vec2(1., -1.)).rgb);
  return length(vec2(tr + 2. * mr + br - tl - 2. * ml - bl, tl + 2. * tc + tr - bl - 2. * bc - br));
}
// A soft copy of the picture here (nine samples, \`px\` apart).
vec3 aSoft(vec2 uv, vec2 px) {
  vec3 c = texture2D(tDiffuse, uv).rgb * .25;
  c += (texture2D(tDiffuse, uv + px * vec2(1., 0.)).rgb + texture2D(tDiffuse, uv + px * vec2(-1., 0.)).rgb + texture2D(tDiffuse, uv + px * vec2(0., 1.)).rgb + texture2D(tDiffuse, uv + px * vec2(0., -1.)).rgb) * .125;
  c += (texture2D(tDiffuse, uv + px * vec2(1., 1.)).rgb + texture2D(tDiffuse, uv + px * vec2(-1., 1.)).rgb + texture2D(tDiffuse, uv + px * vec2(1., -1.)).rgb + texture2D(tDiffuse, uv + px * vec2(-1., -1.)).rgb) * .0625;
  return c;
}
`,N=()=>({tDiffuse:{value:null},resolution:{value:new x(1280,720)},time:{value:0}}),Ee={uniforms:N(),fragmentShader:`${B}
void main() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution, p = vUv * resolution / s;
  vec2 uv = vUv + (vec2(aFbm(p / 70.), aFbm(p / 70. + 9.7)) - .5) * px * 7.;
  vec3 c = aSoft(uv, px * 2.2);
  float l = aLuma(c);
  // Light places are left as bare paper, the rest falls into a few washes whose borders wander.
  float tone = smoothstep(.1, .86, l + (aFbm(p / 190.) - .5) * .14);
  tone = mix(tone, floor(tone * 4. + .5) / 4., .62);
  float grain = aFbm(p / 2.6);
  vec3 paper = vec3(.955, .935, .875) * (.93 + .07 * grain) * (.97 + .03 * aFbm(p / 420.));
  vec3 ink = vec3(.075, .085, .105);
  float density = pow(1. - tone, 1.3);
  // The washes pool a little darker here and lighter there, as wet ink settles (broad, soft: no speckle).
  density *= .88 + .2 * aFbm(p / 46. + 5.);
  vec3 col = mix(paper, ink, clamp(density, 0., 1.) * .84);
  float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
  vec3 hue = clamp(c / max(l, .08), .6, 1.5);
  col *= mix(vec3(1.), mix(vec3(1.), hue, .1 + .22 * sat), 1. - density * .85);
  // (Edges looked for a brush's width apart: the outline of a house or a hill, not of every blade of grass.)
  float stroke = smoothstep(.2, .55, aEdge(uv, px * 2.6)) * (.45 + .55 * smoothstep(.3, .7, aFbm(p / 22. + 3.1)));
  gl_FragColor = vec4(mix(col, ink, stroke * .9), 1.);
}`},Oe={uniforms:{...N(),tDepth:{value:null},uTan:{value:new x(1,1)},uCamWorld:{value:new U},uFocus:{value:new X},uNear:{value:.1},uFar:{value:1e3},uBars:{value:0},uAspect:{value:1.78},uDepthOn:{value:0},uDepthSize:{value:new x(1280,720)}},fragmentShader:`${B}
#ifdef FILTER_LITE
#define CREST_STEPS 6
#define CREST_GROW 1.9
#define CREST_FIRST 3.
#define CREST_FINE 2
#define SIDE_STEPS 4
#define SIDE_GROW 2.2
#define sFbm(p) (aNoise(p) * .62 + aNoise((p) * 2.03 + 17.1) * .38)
#else
#define CREST_STEPS 9
#define CREST_GROW 1.6
#define CREST_FIRST 2.5
#define CREST_FINE 3
#define SIDE_STEPS 6
#define SIDE_GROW 1.7
#define sFbm(p) aFbm(p)
#endif
uniform float uDepthOn;
uniform vec2 uDepthSize;
uniform float uBars;
uniform float uAspect;
uniform sampler2D tDepth;
uniform vec2 uTan;
uniform mat4 uCamWorld;
uniform vec3 uFocus;
uniform float uNear;
uniform float uFar;
const vec3 PAPER = vec3(.94, .912, .845);
const vec3 INK = vec3(.068, .066, .082);
float iDepth(vec2 uv) { return (uNear * uFar) / (uFar - (uFar - uNear) * texture2D(tDepth, uv).x); }
// How near a thing is (one over its distance; nothing for the sky). Across a flat face this runs in a straight line
// whichever way the face lies, so where the next thing along is NOT on that line, one form has ended against another.
float iNear(vec2 uv) { float d = iDepth(uv); return d > uFar * .9 ? 0. : 1. / max(d, .05); }
vec3 iView(vec2 uv, float d) { return vec3((uv * 2. - 1.) * uTan * d, -d); }
void flatMain() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution, p = vUv * resolution / s;
  vec2 uv = vUv + (vec2(aFbm(p / 70.), aFbm(p / 70. + 9.7)) - .5) * px * 7.;
  vec3 c = aSoft(uv, px * 2.2);
  float tone = smoothstep(.05, .62, aLuma(c) + (aFbm(p / 190.) - .5) * .14);
  tone = mix(tone, floor(tone * 4. + .5) / 4., .62);
  vec3 col = mix(PAPER * (.95 + .05 * aFbm(p / 2.6)), INK, clamp(pow(1. - tone, 1.25) * (.88 + .2 * aFbm(p / 46. + 5.)), 0., 1.) * .86);
  col = mix(col, INK, smoothstep(.2, .55, aEdge(uv, px * 2.6)) * (.45 + .55 * smoothstep(.3, .7, aFbm(p / 22. + 3.1))) * .9);
  float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b));
  col = mix(col, vec3(.76, .16, .1), smoothstep(.5, .78, (mx - mn) / max(mx, .001)) * smoothstep(.12, .3, c.r - max(c.g, c.b) * 1.25) * step(c.g, c.r * .5) * .9);
  gl_FragColor = vec4(col, 1.);
}
void main() {
  if (uDepthOn < .5) { flatMain(); return; }
  float s = resolution.y / 900.;
  vec2 px = s / resolution;
  vec2 grain = vUv * resolution / s;
  // The hand is not a ruler: everything is drawn a touch off where it is.
  // (cuv: where the colours are read. uv: the middle of the depth's own texel there; dt: one texel of it.)
  vec2 cuv = vUv + (vec2(aNoise(grain * .03), aNoise(grain * .03 + 31.)) - .5) * px * 2.6;
  vec2 dt = 1. / uDepthSize;
  vec2 uv = (floor(cuv * uDepthSize) + .5) * dt;
  float w0 = iNear(uv);
  float sky = 1. - step(1e-6, w0);
  float dn = w0 > 0. ? 1. / w0 : uFar;
  vec3 vp = iView(uv, dn);
  vec3 wp = (uCamWorld * vec4(vp, 1.)).xyz;
  // Which way the face here slopes (from its own side of any edge), and so which way it faces.
  // (Stepped a whole number of the depth's texels, about three pixels' worth; ex, ey: how far that was, in pixels.)
  vec2 et = max(vec2(1.), floor(3. * px / dt + .5)), ep = et * dt / px;
  float wu = iNear(uv + vec2(0., dt.y * et.y)), wd = iNear(uv - vec2(0., dt.y * et.y)), wr = iNear(uv + vec2(dt.x * et.x, 0.)), wl = iNear(uv - vec2(dt.x * et.x, 0.));
  float gy = (abs(wu - w0) < abs(w0 - wd) ? wu - w0 : w0 - wd) / ep.y, gx = (abs(wr - w0) < abs(w0 - wl) ? wr - w0 : w0 - wl) / ep.x;
  vec3 ax = iView(uv + vec2(dt.x * et.x, 0.), 1. / max(w0 + gx * ep.x, 1e-5)) - vp, ay = iView(uv + vec2(0., dt.y * et.y), 1. / max(w0 + gy * ep.y, 1e-5)) - vp;
  vec3 n = normalize((uCamWorld * vec4(normalize(cross(ax, ay)), 0.)).xyz);
  float steep = (1. - sky) * smoothstep(.3, .8, 1. - abs(n.y));
  float level = (1. - sky) * smoothstep(.8, .97, n.y);
  // The scene's own light and dark with its detail washed out (a brush doesn't draw every blade of grass), and its
  // colour here.
  vec3 c0 = texture2D(tDiffuse, cuv).rgb, cs = aSoft(cuv, px * 6.);
  float L = aLuma(cs);
  float mx = max(cs.r, max(cs.g, cs.b)), mn = min(cs.r, min(cs.g, cs.b)), sat = (mx - mn) / max(mx, .001);
  // What takes ink for being dark: foliage (a pine is the blackest thing in a landscape) and real darks (a cave
  // mouth, a black roof). Not what a surface happens to be patterned or lit with: a cracked rock face, the facets of
  // a meadow.
  float leaf = smoothstep(.02, .1, cs.g - max(cs.r, cs.b));
  // (Rock keeps only the broadest of its light and shade, as one soft wash: not its cracks.)
#ifdef FILTER_LITE
  float broad = L;
#else
  float broad = aLuma(aSoft(cuv, px * 21.));
#endif
  float shade = 1. - smoothstep(.18, .6, broad);
  // (Green ground is not foliage: of what lies flat, only its broadest shade counts, and little of that.)
  float lying = smoothstep(.35, .7, n.y);
  // (And close to, a surface's own pattern is bigger than a brush washes out: within a few metres only foliage
  // takes ink for being dark.)
  float beyond = smoothstep(5., 22., dn);
  shade *= beyond;
  float dark = max(leaf * mix(.5, 1., 1. - smoothstep(.2, .42, mix(L, broad, lying))) * (1. - lying) * mix(.3, 1., beyond), (1. - smoothstep(.08, .26, mix(L, broad, max(lying, steep * (1. - leaf))))) * (1. - lying) * (1. - steep * (1. - leaf) * .7) * mix(beyond, 1., leaf));
  // Water: lying flat and blue or green-blue (its waves tilt it a little). It is left as paper, with the dark of
  // what it mirrors and a few ripples.
  float water = (1. - sky) * smoothstep(.8, .93, n.y) * smoothstep(.05, .16, min(cs.b, cs.g * 1.15) - cs.r);
  // Cloud, snow, mist: pale and colourless. The paper itself, with the faintest wash under it and a light line round.
  float pale = (1. - sky) * smoothstep(.56, .74, L) * (1. - smoothstep(.2, .42, sat));
  // How far below its own crest this place is: up the picture, to where the form ends against something further off.
  float loaded = .65 + .7 * sFbm(wp.xz * .06 + wp.y * .045);
  float crestAt = -1., lo = 0., u = CREST_FIRST;
  for (int k = 0; k < CREST_STEPS; k++) {
    float tk = max(1., floor(u * px.y / dt.y + .5)), uk = tk * dt.y / px.y;
    if (w0 + gy * uk - iNear(uv + vec2(0., dt.y * tk)) > w0 * (.16 + .0038 * uk)) { crestAt = uk; break; }
    lo = uk; u *= CREST_GROW;
  }
  if (crestAt > 0.) for (int k = 0; k < CREST_FINE; k++) {
    float tm = max(1., floor((lo + crestAt) * .5 * px.y / dt.y + .5)), m = tm * dt.y / px.y;
    if (w0 + gy * m - iNear(uv + vec2(0., dt.y * tm)) > w0 * (.16 + .0038 * m)) crestAt = m; else lo = m;
  }
  float crest = crestAt > 0. ? exp(-crestAt / (40. * loaded)) * (1. - smoothstep(70., 112., crestAt)) * (1. - .5 * leaf) : 0.;
  // And how far from its edge on the side away from the light (which comes from the upper left of the sheet).
  float sideAt = -1.;
  u = 3.;
  for (int k = 0; k < SIDE_STEPS; k++) {
    float tk = max(1., floor(u * px.x / dt.x + .5)), uk = tk * dt.x / px.x;
    if (w0 + gx * uk - iNear(uv + vec2(dt.x * tk, 0.)) > w0 * (.16 + .0045 * uk)) { sideAt = uk; break; }
    u *= SIDE_GROW;
  }
  float side = sideAt > 0. ? exp(-sideAt / (17. * loaded)) : 0.;
  // The far sinks into the paper, and mist lies in the low ground beyond.
  float far = 1. - exp(-dn * .009);
  float below = 1. - smoothstep(uFocus.y - 12., uFocus.y - 1., wp.y);
  float beside = (1. - smoothstep(uFocus.y - 1., uFocus.y + 14., wp.y)) - below;
  float mist = (1. - sky) * (smoothstep(.1, .45, far) * below + smoothstep(.42, .8, far) * beside * .6) * (.65 + .35 * sFbm(wp.xz * .018 + time * .006));
  // The ink: crest, shaded side, and the scene's real darks (a pine, a cave mouth), laid one over another.
  float ink = 1. - (1. - crest * .84) * (1. - side * .5) * (1. - dark * .6) * (1. - shade * steep * .2);
  // (A range far off is one pale wash with a darker head.)
  ink = max(ink, smoothstep(70., 230., dn) * (.34 + .3 * crest));
  // (Cloud and snow, the brightest things, are the paper itself; so is level ground, where the eye rests.)
  ink *= mix(1., .15, smoothstep(.82, .96, L));
  ink *= mix(1., .4, level);
  // 皴: on rock, strokes dragged down the face, drier and broken; coarser the further off.
  vec2 face = abs(n.x) > abs(n.z) ? vec2(wp.z, wp.y) : vec2(wp.x, wp.y);
  float fine = 1. - smoothstep(20., 80., dn);
  // (The hand wanders: no two strokes run quite parallel.)
  face.x += (aNoise(vec2(face.y * .07, face.x * .03) + 4.) - .5) * 1.8;
  float drag = aNoise(face * vec2(1.3, .06)) * (.62 + .38 * mix(.55, aNoise(face * vec2(3.6, .11) + 3.), fine));
  float cliff = (1. - sky) * smoothstep(.5, .86, 1. - abs(n.y));
  ink += cliff * (1. - leaf) * (1. - far) * smoothstep(.26, .58, drag) * (.12 + .22 * (1. - crest));
  ink = mix(ink, crest * .1 + side * .06, pale);
  // (Close to, the ink is at its strongest: 濃墨 in front, 淡墨 behind.)
  ink *= mix(1.36, .3, far) * (1. - clamp(mist * 1.3, 0., 1.));
  ink = mix(ink, dark * .26 * (1. - far * .6), water);
  ink = clamp(ink * (1. - sky), 0., .95);
  // Washes: four strengths of ink, soft where they meet, a little darker along the edge where the water pooled.
  float q = ink * 4., f = fract(q);
  // (Open ground is one soft wash thinning down from its ridge: stepped, it broke up into rings below every crest.)
  float wash = mix(ink, (floor(q) + smoothstep(.3, .7, f)) / 4., .7 * (1. - lying));
  wash += smoothstep(.46, .6, f) * (1. - smoothstep(.6, .82, f)) * .07 * step(.2, ink) * (1. - lying);
  wash *= mix(.82 + .36 * sFbm(wp.xz * .3 + wp.y * .17), 1., lying);
  // On open ground a few dry strokes along the lie of the land, and otherwise the paper.
  wash *= mix(1., .35 + .65 * smoothstep(.5, .8, aNoise(vec2(dot(wp.xz, vec2(.9, .4)) * .5, dot(wp.xz, vec2(-.4, .9)) * 3.2))), level * (1. - water));
  // Ripples: short strokes lying across the view, here and there.
  vec2 back = normalize(vec2(uCamWorld[2].x, uCamWorld[2].z) + vec2(1e-4, 0.));
  float ripple = smoothstep(.7, .84, aNoise(vec2(dot(wp.xz, vec2(back.y, -back.x)) * .2 + time * .04, dot(wp.xz, back) * 2.4))) * smoothstep(.35, .7, aNoise(wp.xz * .07 + 5.));
  wash += water * ripple * .34 * (1. - far);
  // The line: where one form ends against another. Thick and thin with the hand's pressure, breaking up where the
  // brush ran dry, fainter far off. (What stands only a little in front of what is behind it, a blade of grass, has
  // none.)
  float press = .4 + 1.2 * sFbm(grain * .012 + 7.);
  float e = .6 + 1.5 * press;
  vec2 lt = max(vec2(1.), floor(e * px / dt + .5)), lp = lt * dt / px;
  float la = iNear(uv + vec2(dt.x * lt.x, 0.)), lb = iNear(uv - vec2(dt.x * lt.x, 0.)), lc = iNear(uv + vec2(0., dt.y * lt.y)), ld = iNear(uv - vec2(0., dt.y * lt.y));
  float nearest = max(max(w0, max(la, lb)), max(lc, ld));
  float edge = max(max(abs(la - w0 - gx * lp.x), abs(lb - w0 + gx * lp.x)), max(abs(lc - w0 - gy * lp.y), abs(ld - w0 + gy * lp.y))) / max(nearest, 1e-5);
  // (Further off it takes a bigger step to earn a line: a far blade of grass was being ringed round.)
  float off = smoothstep(8., 30., 1. / max(nearest, 1e-5));
  float line = smoothstep(.08 + .09 * off + .17 * leaf, .2 + .12 * off + .22 * leaf, edge) * smoothstep(.22, .58, aNoise(grain * .19) * .6 + press * .42);
  line *= mix(1., .16, 1. - smoothstep(.0036, .02, nearest)) * mix(1., .3, pale);
  float tone = max(wash, line * .95);
  // The sky is bare paper: the faintest wash where it is dark.
  tone = mix(tone, max(line * .9, smoothstep(.25, .65, 1. - L) * .14 * (.6 + .4 * sFbm(vUv * 4.))), sky);
  tone = clamp(tone, 0., 1.);
  vec3 col = mix(PAPER, INK, tone);
  // A cool cast in the far washes (花青), and vermilion kept where the scene is truly red: a seal, a gate, a scarf.
  col = mix(col, col * vec3(.88, .96, 1.07), far * (1. - sky) * .6);
  float rx = max(c0.r, max(c0.g, c0.b)), rn = min(c0.r, min(c0.g, c0.b));
  // (Red, not the orange of sandstone or the pink of a sunset cloud.)
  float red = smoothstep(.5, .78, (rx - rn) / max(rx, .001)) * smoothstep(.12, .3, c0.r - max(c0.g, c0.b) * 1.25) * step(c0.g, c0.r * .5) * (1. - sky);
  col = mix(col, mix(vec3(.76, .16, .1), INK, tone * .3), red * (1. - far * .55) * .92);
  // Paper: its tooth, a few long fibres, a little darker toward the edges of the sheet.
  col *= .965 + .06 * sFbm(grain * .011);
  col -= .02 * smoothstep(.72, 1., aNoise(grain * vec2(.7, .05) + 11.));
  vec2 c = vUv - .5;
  col *= 1. - dot(c, c) * .16;
  // Cinema bars: two bands of ink brushed across the sheet, their edges the brush's.
  if (uBars > 0.) {
    float bar = max(.5 * (1. - uAspect / 2.39), .06) * uBars + (sFbm(vec2(grain.x * .014, vUv.y > .5 ? 3. : 8.)) - .5) * .014;
    float band = 1. - smoothstep(bar - .0025, bar + .0025, min(vUv.y, 1. - vUv.y));
    col = mix(col, INK * (1.05 + .5 * sFbm(grain * vec2(.012, .2))), band);
  }
  gl_FragColor = vec4(col, 1.);
}`},Ie={uniforms:N(),fragmentShader:`${B}
void main() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution, p = vUv * resolution / s;
  vec2 uv = vUv + (vec2(aFbm(p / 55.), aFbm(p / 55. + 4.2)) - .5) * px * 9.;
  vec3 c = aSoft(uv, px * 3.);
  c = mix(c, floor(c * 6. + .5) / 6., .45);
  c = mix(c, vec3(aLuma(c)), .1) * (.92 + .16 * aFbm(p / 140.));
  float grain = aFbm(p / 2.2);
  vec3 paper = vec3(.985, .975, .945) * (.95 + .05 * grain);
  // Thin paint lets the paper through: lighter, and lightest where the colour was bright already.
  vec3 col = mix(paper, c, .8) * (.96 + .08 * grain);
  // Pigment gathers at the edge of a wash: a soft darker rim, not a drawn line.
  col *= 1. - smoothstep(.1, .5, aEdge(uv, px * 2.4)) * .16;
  gl_FragColor = vec4(col, 1.);
}`},je={uniforms:N(),fragmentShader:`${B}
void main() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution, p = vUv * resolution / s;
  vec3 m0 = vec3(0.), m1 = vec3(0.), m2 = vec3(0.), m3 = vec3(0.), s0 = vec3(0.), s1 = vec3(0.), s2 = vec3(0.), s3 = vec3(0.);
  for (int j = 0; j <= 3; j++) for (int i = 0; i <= 3; i++) {
    vec2 o = vec2(float(i), float(j)) * 1.5 * px;
    vec3 c = texture2D(tDiffuse, vUv + vec2(-o.x, -o.y)).rgb; m0 += c; s0 += c * c;
    c = texture2D(tDiffuse, vUv + vec2(o.x, -o.y)).rgb; m1 += c; s1 += c * c;
    c = texture2D(tDiffuse, vUv + vec2(-o.x, o.y)).rgb; m2 += c; s2 += c * c;
    c = texture2D(tDiffuse, vUv + vec2(o.x, o.y)).rgb; m3 += c; s3 += c * c;
  }
  m0 /= 16.; m1 /= 16.; m2 /= 16.; m3 /= 16.;
  float v0 = dot(abs(s0 / 16. - m0 * m0), vec3(1.)), v1 = dot(abs(s1 / 16. - m1 * m1), vec3(1.)), v2 = dot(abs(s2 / 16. - m2 * m2), vec3(1.)), v3 = dot(abs(s3 / 16. - m3 * m3), vec3(1.));
  vec3 col = m0; float v = v0;
  if (v1 < v) { col = m1; v = v1; }
  if (v2 < v) { col = m2; v = v2; }
  if (v3 < v) { col = m3; }
  // Richer paint, the ridges a brush leaves, and the weave of the canvas under it.
  col = mix(vec3(aLuma(col)), col, 1.18);
  col *= .95 + .1 * aFbm(vec2(p.x / 26., p.y / 5.) + aFbm(p / 60.) * 6.);
  col *= .975 + .025 * sin(p.x * 1.7) * sin(p.y * 1.7);
  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}`},He={uniforms:N(),fragmentShader:`${B}
void main() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution;
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  float l = aLuma(c);
  float band = mix((floor(l * 4.) + .5) / 4., l, .25);
  vec3 col = c * (band / max(l, .04));
  col = mix(vec3(aLuma(col)), col, 1.25);
  col = mix(col, vec3(.07, .06, .1), smoothstep(.16, .34, aEdge(vUv, px * 1.2)) * .92);
  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}`},Ge={uniforms:N(),fragmentShader:`${B}
float aHatch(float d, float f) { return 1. - smoothstep(0., .36, abs(sin(d * f))); }
void main() {
  float s = resolution.y / 900.;
  vec2 px = s / resolution, p = vUv * resolution / s;
  float l = aLuma(aSoft(vUv, px * 1.2));
  float grain = aFbm(p / 2.4);
  vec3 paper = vec3(.965, .955, .93) * (.94 + .06 * grain);
  float wob = (aFbm(p / 40.) - .5) * 5.;
  float a = aHatch(p.x + p.y + wob, .5) * smoothstep(.72, .45, l);
  float b = aHatch(p.x - p.y + wob, .5) * smoothstep(.5, .25, l);
  float d = aHatch(p.x * .2 + p.y + wob, .62) * smoothstep(.3, .08, l);
  float pencil = clamp(max(a, max(b, d)) * (.55 + .45 * grain), 0., 1.);
  float line = smoothstep(.1, .32, aEdge(vUv, px * 1.2));
  gl_FragColor = vec4(mix(paper, vec3(.2, .2, .23), max(pencil * .75, line * .9)), 1.);
}`},Ve={uniforms:{...N(),rows:{value:180}},fragmentShader:`${B}
uniform float rows;
float aBayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float aBayer4(vec2 a) { return aBayer2(.5 * a) * .25 + aBayer2(a); }
void main() {
  float cell = resolution.y / rows;
  vec2 grid = floor(vUv * resolution / cell);
  vec3 c = texture2D(tDiffuse, (grid + .5) * cell / resolution).rgb;
  c = mix(vec3(aLuma(c)), c, 1.15);
  // Eight steps a channel, the in-between ones mixed by the dot pattern (half strength: a full one checkers everything).
  gl_FragColor = vec4(clamp(floor(c * 7. + .22 + aBayer4(grid) * .56) / 7., 0., 1.), 1.);
}`},qe={uniforms:N(),fragmentShader:`${B}
void main() {
  float s = resolution.y / 900.;
  vec2 uv = vUv * 2. - 1.;
  float r2 = dot(uv, uv);
  vec2 st = uv * (1. + r2 * .035) * .5 + .5;
  if (st.x < 0. || st.x > 1. || st.y < 0. || st.y > 1.) { gl_FragColor = vec4(0., 0., 0., 1.); return; }
  vec3 c = vec3(texture2D(tDiffuse, st + vec2(.0012, 0.)).r, texture2D(tDiffuse, st).g, texture2D(tDiffuse, st - vec2(.0012, 0.)).b);
  // (240 scan lines, or as many as the picture has rows for: a thumbnail's hundred rows can't show 240.)
  c *= (.82 + .18 * sin(st.y * min(240., resolution.y / 3.) * 6.2831853)) * (.92 + .08 * sin(st.x * resolution.x / max(s, 1.) * 2.1));
  c *= 1.14 * (1. - .18 * r2) * (.985 + .015 * sin(time * 9.));
  gl_FragColor = vec4(c, 1.);
}`},A=(a,e)=>{a.resolution.value.set(e.width,e.height),a.time.value=e.time},$e=[{id:"ink",name:"水墨畫",hint:"宣紙上的墨色暈染與枯筆線條，只留一點淡彩",shader:Ee,frame:A,art:!0},{id:"shanshui",name:"水墨山水",hint:"整個場景畫成一幅山水：山頭濃、往下淡進霧裡，水面留白，只留一點朱紅",shader:Oe,frame:A,art:!0},{id:"watercolor",name:"水彩畫",hint:"透明的顏料在白紙上暈開，邊緣顏色較深",shader:Ie,frame:A,art:!0},{id:"oil",name:"油畫",hint:"厚塗的筆觸與畫布紋理（比較吃效能）",shader:je,frame:A,art:!0},{id:"toon",name:"卡通賽璐璐",hint:"分明的明暗色塊加黑色描邊，像手繪動畫",shader:He,frame:A,art:!0},{id:"sketch",name:"鉛筆素描",hint:"紙上的鉛筆線條，越暗的地方排線越密",shader:Ge,frame:A,art:!0},{id:"pixel",name:"像素風",hint:"大顆像素與有限的顏色，強度越高顆粒越大",shader:Ve,frame:(a,e)=>(A(a,e),a.rows.value=300-190*Math.max(0,Math.min(1,e.strength)),!0),art:!0},{id:"crt",name:"復古映像管",hint:"老電視的弧面螢幕、掃描線與微微閃爍",shader:qe,frame:A,art:!0},{id:"sepia",name:"復古褐色",hint:"舊相簿的暖褐色",shader:we,frame:(a,e)=>(a.amount.value=e.strength,!0)},{id:"technicolor",name:"復古彩色電影",hint:"早期彩色電影的濃烈色彩",shader:ye},{id:"bleach",name:"漂白略過",hint:"褪色又強對比的冷硬電影感",shader:be,frame:(a,e)=>(a.opacity.value=e.strength,!0)},{id:"film",name:"膠片顆粒",hint:"會跳動的底片顆粒",shader:Te,frame:(a,e)=>(a.time.value=e.time,a.intensity.value=.25+e.strength*.6,!0)},{id:"dots",name:"網點印刷",hint:"報紙照片的黑白網點",shader:De,frame:(a,e)=>{a.tSize.value.set(e.width,e.height),a.scale.value=1.25*Math.max(.6,900/e.height)}},{id:"halftone",name:"彩色半色調",hint:"彩色印刷的小圓點",shader:ke,frame:(a,e)=>(a.width.value=e.width,a.height.value=e.height,a.radius.value=3+3*e.height/900,a.blending.value=1-e.strength*.6,!0)},{id:"rgbshift",name:"RGB 色差",hint:"彩色重影，像老鏡頭",shader:Se,frame:(a,e)=>(a.amount.value=.0015+e.strength*.006,a.angle.value=.4,!0)},{id:"glitch",name:"數位故障",hint:"畫面三不五時撕裂跳動",shader:Pe,frame:Ze},{id:"kaleido",name:"萬花筒",hint:"整個世界變成對稱花紋",shader:Ce,frame:(a,e)=>{a.sides.value=6,a.angle.value=e.time*.04}},{id:"mirror",name:"鏡中世界",hint:"左右對稱的畫面",shader:Ue,frame:a=>{a.side.value=1}},{id:"sobel",name:"輪廓線稿",hint:"只留下物體的輪廓線",shader:Re,frame:(a,e)=>{a.resolution.value.set(e.width,e.height)}},{id:"hue",name:"換色系",hint:"整個世界換一種顏色",shader:Fe,frame:(a,e)=>(a.hue.value=e.strength*.9-.45,a.saturation.value=.12,!0)},{id:"colorify",name:"單色染色",hint:"像透過彩色玻璃看",shader:Me,tinted:!0,frame:(a,e)=>{a.color.value.set(e.color||"#ffc7e0")}},{id:"vignette",name:"暗角",hint:"四周變暗，視線集中在中間",shader:Ae,frame:(a,e)=>(a.offset.value=1.1,a.darkness.value=.6+e.strength*1.4,!0)}],Ke=a=>$e.find(e=>e.id===a);function Je(a,e,r=!1){const t=/varying\s+vec2\s+vUV\b/.test(a.shader.fragmentShader)?"vUV":"vUv",n=`${r?`#define FILTER_LITE 1
`:""}${a.shader.fragmentShader.replace(/void\s+main\s*\(\s*\)/,"void filterMain()")}
uniform float uStrength;
void main() { filterMain(); vec4 filtered = gl_FragColor; gl_FragColor = vec4(mix(texture2D(tDiffuse, ${t}).rgb, filtered.rgb, uStrength), 1.); }`,u=new ve({uniforms:{...Be.clone(a.shader.uniforms),uStrength:{value:1}},vertexShader:t==="vUV"?e.replace(/\bvUv\b/g,"vUV"):e,fragmentShader:n,depthTest:!1,depthWrite:!1});return a.id==="glitch"&&(u.uniforms.tDisp.value=Ye()),u}function Xe(a,e,r){const t=a.frame?.(e.uniforms,r);e.uniforms.uStrength.value=t?1:Math.max(0,Math.min(1,r.strength))}let G=null;function Ye(){if(G)return G;const a=64,e=new Uint8Array(a*a);for(let r=0;r<e.length;r++)e[r]=Math.floor(Math.random()*255);return G=new fe(e,a,a,me,V),G.needsUpdate=!0,G}let le=0,ne=0;function Ze(a,e){e.time>le&&(ne=e.time+.12+Math.random()*.25,le=e.time+.6+Math.random()*(4-e.strength*3));const r=e.time<ne;return a.byp.value=r?0:1,a.amount.value=Math.random()/30,a.angle.value=(Math.random()-.5)*Math.PI,a.seed.value=Math.random(),a.seed_x.value=(Math.random()-.5)*.6,a.seed_y.value=(Math.random()-.5)*.6,a.distortion_x.value=Math.random(),a.distortion_y.value=Math.random(),a.col_s.value=.05,!0}const ue=1,Qe=`
uniform sampler2D tDiffuse;
uniform float uWet;
uniform float uRush;
uniform float uTime;
uniform float uAspect;
varying vec2 vUv;
float lHash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float lNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  float a = lHash(i.x + i.y * 57.), b = lHash(i.x + 1. + i.y * 57.), c = lHash(i.x + (i.y + 1.) * 57.), d = lHash(i.x + 1. + (i.y + 1.) * 57.);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float lWater(vec2 uv) {
  float t = 1. - uWet;
  vec2 p = vec2(uv.x * uAspect, uv.y);
  // The sheet over the whole glass at first, its ragged upper edge running down and off.
  float edge = 1.2 - t * 3.1 + (lNoise(vec2(p.x * 2.6, uTime * .4)) - .5) * .5;
  float sheet = smoothstep(edge + .1, edge - .14, uv.y) * (.5 + .5 * lNoise(p * vec2(4.5, 2.) + vec2(0., uTime * 2.6)));
  // Behind it, rivulets here and there: each a bead running down the glass, a thinning tail above it, no two alike.
  float c = p.x * 5.2 + lNoise(vec2(p.x * 1.7, 3.1)) * 1.6;
  float id = floor(c), f = fract(c) - .5, h = lHash(id), h2 = lHash(id + 37.);
  float head = 1.25 - t * (1.5 + h * 2.2) - h2 * .5;
  float along = (uv.y - head) / (.28 + h2 * .5);
  float wob = (lNoise(vec2(id * 7.3, uv.y * 3.2 + uTime * .3)) - .5) * .5;
  float wide = mix(.2, .05, clamp(along, 0., 1.)) * (.5 + h * .9);
  float run = smoothstep(wide, 0., abs(f + wob)) * smoothstep(-.06, .02, along) * smoothstep(1., .2, along) * step(.28, h2 + h * .4);
  return sheet * .9 + run;
}
void main() {
  float e = .0045;
  float w = lWater(vUv);
  vec2 slope = vec2(lWater(vUv + vec2(e, 0.)) - w, lWater(vUv + vec2(0., e)) - w) / e;
  vec2 bent = clamp(vUv + slope * .0026 * min(1., uWet * 3.), 0., 1.);
  vec3 c = texture2D(tDiffuse, bent).rgb;
  if (uRush > .002) {
    // Speed: each point's last few moments on its way out from the middle, laid over it (six samples; none in the
    // middle of the picture, where what the player is steering at stays sharp).
    vec2 d = bent - .5;
    // (Each pixel's samples start a little differently, or six of them would show as six ghosts of every edge.)
    vec2 back = d * (-.027 * uRush * smoothstep(.05, .62, dot(d, d) * 2.2)) * (.72 + .56 * lHash(dot(floor(vUv * vec2(640., 360.)), vec2(1., 57.))));
    c = c * .3 + texture2D(tDiffuse, bent + back).rgb * .22 + texture2D(tDiffuse, bent + back * 2.).rgb * .18
      + texture2D(tDiffuse, bent + back * 3.).rgb * .14 + texture2D(tDiffuse, bent + back * 4.).rgb * .1 + texture2D(tDiffuse, bent + back * 5.).rgb * .06;
  }
  float rim = clamp(length(slope) * .035, 0., 1.);
  c += rim * .07 * min(1., uWet * 2.5);
  c = mix(c, c * vec3(.95, .985, 1.02), clamp(w, 0., 1.) * .3);
  gl_FragColor = vec4(c, 1.);
}
`,he=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }
`;class O{constructor(e){if(this.material=e,!O.geometry){const r=new xe;r.setAttribute("position",new ee([-1,-1,0,3,-1,0,-1,3,0],3)),r.setAttribute("uv",new ee([0,0,2,0,0,2],2)),O.geometry=r}this.mesh=new ge(O.geometry,e),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}material;static geometry=null;mesh;scene=new de;camera=new pe(-1,1,1,-1,0,1);render(e,r){e.setRenderTarget(r),e.render(this.scene,this.camera)}}class et{scene=new de;camera=new pe(-1,1,1,-1,0,1);inner=null;constructor(){const e=new xe;e.setAttribute("position",new ee([0,0,0,0,0,0,0,0,0],3));const r=new ge(e,new We({colorWrite:!1,depthWrite:!1,depthTest:!1}));r.frustumCulled=!1,r.onBeforeRender=()=>{const t=this.inner;this.inner=null,t?.()},this.scene.add(r)}run(e,r){this.inner=r,e.render(this.scene,this.camera),this.inner=null}dispose(){const e=this.scene.children[0];e.geometry.dispose(),e.material.dispose()}}const J={anime:{tonemap:0,saturation:1,contrast:1.06,balance:[.92,.9,.88],lift:[.006,.014,.032],gain:[.98,.96,.93],shadowTint:[.38,.5,.72],highlightTint:[1.03,1,.95],vignette:.22,grain:0,glow:.05,shoulder:.6,threshold:1,toning:1.45,chromatic:.18,dirt:.35},miniature:{tonemap:0,saturation:1.08,contrast:1,balance:[1.01,.99,1.02],lift:[.03,.026,.045],gain:[1.02,1,1],shadowTint:[.62,.52,.8],highlightTint:[1.04,1,.95],vignette:.12,grain:0,glow:.09,threshold:1.05,chromatic:.12,dirt:.2},dreamy:{tonemap:0,saturation:1.04,contrast:1.04,balance:[1.01,1,.99],lift:[0,.004,.016],gain:[1.02,1,.98],shadowTint:[.4,.46,.64],highlightTint:[1.03,.99,.92],vignette:.2,grain:0,glow:.06,threshold:1.1,chromatic:.2,dirt:.45},natural:{tonemap:0,saturation:1.06,contrast:1.04,balance:[1,1,1],lift:[0,0,0],gain:[1,1,1],shadowTint:[.42,.46,.62],highlightTint:[1,.97,.92],vignette:.2,grain:.006},storybook:{tonemap:0,saturation:1.14,contrast:1.07,balance:[1.04,1,.95],lift:[.01,.015,.03],gain:[1.03,1,.95],shadowTint:[.36,.38,.66],highlightTint:[1.04,.96,.84],vignette:.3,grain:.018},golden:{tonemap:1,saturation:1.12,contrast:1.06,balance:[1.12,1,.84],lift:[.02,.012,.03],gain:[1.05,.99,.9],shadowTint:[.4,.34,.62],highlightTint:[1.08,.94,.78],vignette:.32,grain:.018,chromatic:.3,dirt:.6},pastel:{tonemap:0,saturation:.92,contrast:.92,balance:[1.02,1,1.02],lift:[.06,.055,.07],gain:[1,.98,1.02],shadowTint:[.6,.5,.72],highlightTint:[1,.96,.96],vignette:.14,grain:0},vivid:{tonemap:1,saturation:1.3,contrast:1.1,balance:[1,1,1],lift:[0,0,.01],gain:[1,1,1],shadowTint:[.3,.4,.7],highlightTint:[1,.98,.9],vignette:.22,grain:.01},film:{tonemap:2,saturation:1.14,contrast:1.12,balance:[1.04,1,.95],lift:[0,.03,.045],gain:[1.06,1,.9],shadowTint:[.22,.42,.5],highlightTint:[1.08,.95,.8],vignette:.36,grain:.045,chromatic:.55,dirt:.7},moody:{tonemap:2,saturation:.84,contrast:1.14,balance:[.95,1,1.08],lift:[.01,.02,.04],gain:[.94,.97,1.02],shadowTint:[.3,.35,.55],highlightTint:[.95,.97,1],vignette:.48,grain:.03,chromatic:.4,dirt:.5},realistic:{tonemap:1,saturation:1.08,contrast:1.06,balance:[.66,.66,.68],lift:[0,0,0],gain:[1,1,1],shadowTint:[.5,.5,.54],highlightTint:[1,.99,.97],vignette:.26,grain:.014,threshold:1.25,chromatic:.22,dirt:.35},mono:{tonemap:2,saturation:0,contrast:1.1,balance:[1,1,1],lift:[.02,.015,.01],gain:[1.02,1,.95],shadowTint:[.5,.5,.5],highlightTint:[1,1,1],vignette:.35,grain:.04,mono:!0}};class lt{renderer;sceneRT;copyRT;mainRT;bloomDown=[];bloomUp=[];blurA;blurB;blurC;aoA;aoB;raysRT;taaRT=null;taaIndex=0;taaValid=!1;taaFrame=0;taaLastAt=0;taaOn=!0;reuseMatrices=!0;ownLights=!0;nested=new et;prevViewProj=new U;viewProj=new U;savedProj=new U;prevCamPos=new X;dofPre;dofA;dofB;lensDirt;airRT;airPass;copyPass;blitPass;prefilterPass;downPass;upPass;aoPass;aoBlurPass;raysPass;taaPass;dofPrePass;bokehPass;tentPass;compositePass;filterPass=null;filterRT=null;lensPass;lensRT=null;lensPrimed=!1;options;lite=!1;width=1;height=1;size=new x(1,1);hdr;time=0;sunNdc=new X;constructor(e,r){this.renderer=e,this.options={ao:!0,rays:!0,taa:!1,bokehTaps:38,...r};const t=e.getContext();this.hdr=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));const n=this.hdr?E:V,u=new Ne(1,1);u.type=ze,this.sceneRT=new L(1,1,{type:n,format:H,samples:r.samples,depthTexture:u,depthBuffer:!0}),this.sceneRT.texture.minFilter=S,this.sceneRT.texture.magFilter=S,this.copyRT=new L(1,1,{type:this.hdr?E:$,format:H,depthBuffer:!1}),this.copyRT.texture.minFilter=S,this.copyRT.texture.magFilter=S,this.mainRT=new L(1,1,{type:n,format:H,depthBuffer:!0}),this.mainRT.texture.minFilter=S,this.mainRT.texture.magFilter=S;const o=(v=n)=>{const p=new L(1,1,{type:v,format:H,depthBuffer:!1});return p.texture.minFilter=S,p.texture.magFilter=S,p};for(let v=0;v<r.bloomLevels;v++)this.bloomDown.push(o()),this.bloomUp.push(o());if(this.blurA=o(),this.blurB=o(),this.blurC=o(),this.aoA=o(V),this.aoB=o(V),this.raysRT=o(),this.options.taa&&this.hdr){const v=()=>{const p=new L(1,1,{type:E,format:H,depthBuffer:!1});return p.texture.minFilter=S,p.texture.magFilter=S,p};this.taaRT=[v(),v()]}this.dofPre=o(this.hdr?E:$),this.dofA=o(this.hdr?E:$),this.dofB=o(this.hdr?E:$),this.lensDirt=tt(),this.airRT=o();const i=(v,p)=>new O(new ve({uniforms:p,vertexShader:he,fragmentShader:v,depthTest:!1,depthWrite:!1}));this.copyPass=i(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform float uNear; uniform float uFar;
      varying vec2 vUv;
      void main() {
        float z = texture(tDepth, vUv).x;
        float viewZ = (uNear * uFar) / ((uFar - uNear) * z - uFar);
        vec3 c = texture(tColor, vUv).rgb;
        // One bad pixel (NaN/Inf) would spread into a black blob through bloom; drop it here.
        if (any(isnan(c)) || any(isinf(c))) c = vec3(0.);
        gl_FragColor = vec4(min(c, vec3(64.)), -viewZ);
      }`,{tColor:{value:null},tDepth:{value:null},uNear:{value:.1},uFar:{value:1e3}}),this.blitPass=i(`
      uniform sampler2D tColor; varying vec2 vUv;
      void main() { gl_FragColor = vec4(texture(tColor, vUv).rgb, 1.); }`,{tColor:{value:null}}),this.prefilterPass=i(`
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
      }`,{tColor:{value:null},uTexel:{value:new x},uThreshold:{value:1},uKnee:{value:.7}}),this.downPass=i(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec2 h = uTexel * .5;
        vec4 s = texture(tColor, vUv) * 4.;
        s += texture(tColor, vUv - h); s += texture(tColor, vUv + h);
        s += texture(tColor, vUv + vec2(h.x, -h.y)); s += texture(tColor, vUv - vec2(h.x, -h.y));
        gl_FragColor = s / 8.;
      }`,{tColor:{value:null},uTexel:{value:new x}}),this.upPass=i(`
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
      }`,{tColor:{value:null},tBase:{value:null},uTexel:{value:new x},uBaseWeight:{value:1}}),this.aoPass=i(`
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
      }`,{tDepth:{value:null},uTexel:{value:new x},uTan:{value:new x(1,1)},uRadius:{value:.95},uFar:{value:1e3}}),this.aoBlurPass=i(`
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
      }`,{tAo:{value:null},tDepth:{value:null},uDir:{value:new x}}),this.raysPass=i(`
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
      }`,{tDepth:{value:null},uSun:{value:new x(.5,.5)},uFar:{value:1e3},uAspect:{value:1}}),this.taaPass=i(`
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
      }`,{tCurrent:{value:null},tHistory:{value:null},tDepth:{value:null},tAir:{value:null},uAirOn:{value:0},uTexel:{value:new x(1,1)},uTan:{value:new x(1,1)},uJitter:{value:new x},uFar:{value:1e3},uReset:{value:1},uCamWorld:{value:new U},uPrevViewProj:{value:new U}});const f=Math.max(0,Math.round(this.options.airSteps??0));this.airPass=i(`
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
        const int N = ${Math.max(1,f)};
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
      }`,{tDepth:{value:null},tShadow:{value:null},uShadowMatrix:{value:new U},uCamWorld:{value:new U},uTan:{value:new x(1,1)},uJitter:{value:new x},uSunDir:{value:new X(0,1,0)},uSunColor:{value:new C(1,1,1)},uDensity:{value:0},uFrame:{value:0},uMaxDist:{value:60},uBias:{value:0},uHeight:{value:0}});const m=`
      uniform float uFocus; uniform float uDof; uniform float uMiniature;
      float cocAt(float d, vec2 uv) {
        float s = (d - uFocus) / max(uFocus, 1.);
        // Behind the focus the blur grows with distance; in front only what's really close blurs (and less), so
        // nearby things you play with stay readable.
        float c = (s < 0. ? -.45 * smoothstep(.5, 1., -s) : smoothstep(.22, 1.05, s)) * uDof;
        float t = uv.y - .52;
        float tilt = smoothstep(.12, .48, abs(t)) * uMiniature * sign(t);
        return abs(tilt) > abs(c) ? tilt : c;
      }`;this.dofPrePass=i(`
      uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 uTexel; uniform float uFar;
      ${m}
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
      }`,{tColor:{value:null},tDepth:{value:null},uTexel:{value:new x},uFar:{value:1e3},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}});const c=Math.max(12,Math.min(64,Math.round(this.options.bokehTaps??38)));this.bokehPass=i(`
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
      }`,{tPre:{value:null},uTexel:{value:new x},uRadius:{value:8},uFrame:{value:0}}),this.tentPass=i(`
      uniform sampler2D tColor; uniform vec2 uTexel; varying vec2 vUv;
      void main() {
        vec4 o = uTexel.xyxy * vec2(-.5, .5).xxyy;
        gl_FragColor = (texture(tColor, vUv + o.xy) + texture(tColor, vUv + o.zy) + texture(tColor, vUv + o.xw) + texture(tColor, vUv + o.zw)) * .25;
      }`,{tColor:{value:null},uTexel:{value:new x}}),this.lensPass=i(Qe,{tDiffuse:{value:null},uWet:{value:0},uRush:{value:0},uTime:{value:0},uAspect:{value:1}}),this.compositePass=i(`
      #include <common>
      #include <tonemapping_pars_fragment>
      uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tBlur; uniform sampler2D tDepth; uniform sampler2D tAo; uniform sampler2D tRays;
      uniform float uBloom; uniform float uExposure; uniform float uBlurOn;
      uniform int uTonemap; uniform float uSaturation; uniform float uContrast; uniform vec3 uBalance; uniform vec3 uLift; uniform vec3 uGain;
      uniform vec3 uShadowTint; uniform vec3 uHighlightTint;
      uniform float uVignette; uniform float uGrain; uniform float uMono; uniform float uAspect; uniform float uTime; uniform float uShoulder; uniform float uToning;
      uniform vec3 uFlash; uniform float uFlashAmount; uniform float uAo; uniform float uRays; uniform vec3 uSunColor; uniform float uGlow;
      uniform float uUnder; uniform vec3 uUnderColor; uniform float uUnderFog; uniform float uUnderSurface; uniform float uUnderDepth; uniform float uUnderBeams;
      uniform float uMist; uniform vec3 uMistColor;
      uniform mat4 uInvProj; uniform mat4 uCamWorld;
      uniform vec2 uTexel; uniform float uSharpen;
      uniform sampler2D tDof; uniform float uDofOn; uniform float uBokehPx; uniform sampler2D tDirt; uniform float uDirt; uniform float uChromatic; uniform float uLetterbox;
      uniform float uOutline; uniform float uOutlinePx;
      ${m}
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
        vec3 bloom = uBloom > 0. ? texture(tBloom, vUv).rgb * uBloom : vec3(0.);
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
        if (uMist > 0.) {
          // Inside a cloud: a soft white veil, thinner on what is close (the hero stays in sight), thicker further off
          // and toward the edges of the frame — never a blank white screen.
          float md = texture(tDepth, uv).a;
          float k = uMist * (.42 + .58 * (1. - exp(-md * .06)));
          k *= .9 + .2 * smoothstep(.15, .85, length((vUv - .5) * vec2(uAspect, 1.)));
          c = mix(c, uMistColor, clamp(k, 0., .85));
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
      }`,{tScene:{value:null},tBloom:{value:null},tBlur:{value:null},tDepth:{value:null},tAo:{value:null},tRays:{value:null},uBloom:{value:.5},uExposure:{value:1},uBlurOn:{value:0},uTonemap:{value:0},uSaturation:{value:1},uContrast:{value:1},uBalance:{value:new C(1,1,1)},uLift:{value:new C(0,0,0)},uGain:{value:new C(1,1,1)},uShadowTint:{value:new C(.4,.45,.6)},uHighlightTint:{value:new C(1,1,1)},uVignette:{value:.2},uShoulder:{value:0},uToning:{value:1},uGrain:{value:.01},uMono:{value:0},uAspect:{value:1},uTime:{value:0},uFlash:{value:new C(0,0,0)},uFlashAmount:{value:0},uAo:{value:0},uRays:{value:0},uSunColor:{value:new C(1,1,1)},uGlow:{value:0},uMist:{value:0},uMistColor:{value:new C(1,1,1)},uUnder:{value:0},uUnderColor:{value:new C(.05,.3,.4)},uUnderFog:{value:.04},uUnderSurface:{value:1e9},uUnderDepth:{value:0},uUnderBeams:{value:1},uInvProj:{value:new U},uCamWorld:{value:new U},uTexel:{value:new x(1,1)},uSharpen:{value:0},tDof:{value:null},uDofOn:{value:0},uBokehPx:{value:18},tDirt:{value:this.lensDirt},uDirt:{value:0},uChromatic:{value:0},uLetterbox:{value:0},uOutline:{value:0},uOutlinePx:{value:1},uFocus:{value:20},uDof:{value:0},uMiniature:{value:0}})}setSize(e,r){this.width=Math.max(1,Math.floor(e)),this.height=Math.max(1,Math.floor(r)),this.size.set(this.width,this.height),this.sceneRT.setSize(this.width,this.height),this.copyRT.setSize(this.width,this.height),this.mainRT.setSize(this.width,this.height);let t=this.width,n=this.height;for(let i=0;i<this.bloomDown.length;i++)t=Math.max(1,t>>1),n=Math.max(1,n>>1),this.bloomDown[i].setSize(t,n),this.bloomUp[i].setSize(t,n);const u=[Math.max(1,this.width>>1),Math.max(1,this.height>>1)],o=[Math.max(1,this.width>>2),Math.max(1,this.height>>2)];this.blurA.setSize(...u),this.blurB.setSize(...o),this.blurC.setSize(...u),this.aoA.setSize(...u),this.aoB.setSize(...u),this.raysRT.setSize(...o),this.taaRT?.forEach(i=>i.setSize(this.width,this.height)),this.taaValid=!1,this.dofPre.setSize(...u),this.dofA.setSize(...u),this.dofB.setSize(...u),this.options.airSteps&&this.options.airSteps>=20?this.airRT.setSize(...u):this.airRT.setSize(...o),this.compositePass.material.uniforms.uAspect.value=this.width/this.height}setLite(e){this.lite=e;const r=e?0:this.options.samples;this.sceneRT.samples!==r&&(this.sceneRT.samples=r,this.sceneRT.dispose()),this.taaValid=!1}contextRestored(){this.taaValid=!1,this.lensDirt.needsUpdate=!0}resetHistory(){this.taaValid=!1}get worldTexture(){return this.copyRT.texture}render(e,r,t,n,u=!0){const o=this.renderer;this.time+=n;const i=r.layers.mask,f=r.near??.1,m=r.far??1e3,c=r,v=this.taaOn&&!this.lite&&this.taaRT&&c.isPerspectiveCamera?this.taaRT:null;v||(this.taaValid=!1);let p=0,k=0;if(v){const l=performance.now();(n>.25||l-this.taaLastAt>250||this.prevCamPos.distanceToSquared(c.position)>36)&&(this.taaValid=!1),this.taaLastAt=l,this.taaFrame++;const h=this.taaFrame%8+1;p=(ce(h,2)-.5)*2/this.width,k=(ce(h,3)-.5)*2/this.height,this.savedProj.copy(c.projectionMatrix),c.projectionMatrix.elements[8]+=p,c.projectionMatrix.elements[9]+=k,c.projectionMatrixInverse.copy(c.projectionMatrix).invert()}r.layers.set(0),o.setRenderTarget(this.sceneRT),o.clear(!0,!0,!0),o.render(e,r);const P=this.copyPass.material.uniforms;P.tColor.value=this.sceneRT.texture,P.tDepth.value=this.sceneRT.depthTexture,P.uNear.value=f,P.uFar.value=m,this.copyPass.render(o,this.copyRT);let w=this.sceneRT.texture;if(u){this.blitPass.material.uniforms.tColor.value=this.copyRT.texture,this.blitPass.render(o,this.mainRT),o.setRenderTarget(this.mainRT),o.clear(!1,!0,!1),r.layers.set(ue);const l=o.autoClear;o.autoClear=!1;const h=e.background;e.background=null;const b=e.matrixWorldAutoUpdate;this.reuseMatrices&&(e.matrixWorldAutoUpdate=!1),this.ownLights?this.nested.run(o,()=>o.render(e,r)):o.render(e,r),e.matrixWorldAutoUpdate=b,e.background=h,o.autoClear=l,w=this.mainRT.texture}if(r.layers.mask=i,v){c.projectionMatrix.copy(this.savedProj),c.projectionMatrixInverse.copy(this.savedProj).invert();const l=Math.tan(c.fov*Math.PI/180/2)/(c.zoom||1),h=t.sunShadow,b=(this.options.airSteps??0)>0&&(t.airLight??0)>0&&!!h?.map&&!!t.sun&&!(t.underwater&&t.underwater.amount>.02);if(b&&h&&t.sun){const D=this.airPass.material.uniforms;D.tDepth.value=this.copyRT.texture,D.tShadow.value=h.map,D.uShadowMatrix.value.copy(h.matrix),D.uBias.value=h.bias,D.uCamWorld.value.copy(c.matrixWorld),D.uTan.value.set(l*c.aspect,l),D.uJitter.value.set(p,k),D.uSunDir.value.copy(t.sun.dir),D.uSunColor.value.copy(t.sun.color),D.uDensity.value=(t.airLight??0)*.004,D.uFrame.value=this.taaFrame,D.uMaxDist.value=Math.min(36,h.range*.8),D.uHeight.value=t.airHeight??2,this.airPass.render(o,this.airRT)}const d=this.taaPass.material.uniforms,T=v[this.taaIndex],j=v[1-this.taaIndex];d.tCurrent.value=w,d.tHistory.value=j.texture,d.tDepth.value=this.copyRT.texture,d.tAir.value=this.airRT.texture,d.uAirOn.value=b?1:0,d.uTexel.value.set(1/this.width,1/this.height),d.uTan.value.set(l*c.aspect,l),d.uJitter.value.set(p,k),d.uFar.value=m,d.uReset.value=this.taaValid?0:1,d.uCamWorld.value.copy(c.matrixWorld),d.uPrevViewProj.value.copy(this.prevViewProj),this.taaPass.render(o,T),this.viewProj.multiplyMatrices(this.savedProj,c.matrixWorldInverse),this.prevViewProj.copy(this.viewProj),this.prevCamPos.copy(c.position),this.taaIndex=1-this.taaIndex,this.taaValid=!0,w=T.texture}const F=!this.lite&&!!this.options.ao&&(t.ao??1)>0&&r.isPerspectiveCamera;if(F){const l=r,h=Math.tan(l.fov*Math.PI/180/2),b=this.aoPass.material.uniforms;b.tDepth.value=this.copyRT.texture,b.uTexel.value.set(1/this.aoA.width,1/this.aoA.height),b.uTan.value.set(h*l.aspect,h),b.uFar.value=m,this.aoPass.render(o,this.aoA);const d=this.aoBlurPass.material.uniforms;d.tDepth.value=this.copyRT.texture,d.tAo.value=this.aoA.texture,d.uDir.value.set(1.5/this.aoA.width,0),this.aoBlurPass.render(o,this.aoB),d.tAo.value=this.aoB.texture,d.uDir.value.set(0,1.5/this.aoA.height),this.aoBlurPass.render(o,this.aoA)}let R=!1;if(!this.lite&&this.options.rays&&t.sun&&t.sun.strength>0&&(this.sunNdc.copy(t.sun.dir).multiplyScalar(500).add(r.position).project(r),this.sunNdc.z<1&&Math.abs(this.sunNdc.x)<1.6&&Math.abs(this.sunNdc.y)<1.6)){const h=this.raysPass.material.uniforms;h.tDepth.value=this.copyRT.texture,h.uSun.value.set(this.sunNdc.x*.5+.5,this.sunNdc.y*.5+.5),h.uFar.value=m,h.uAspect.value=this.width/this.height,this.raysPass.render(o,this.raysRT),R=!0}let z=null;if(!this.lite&&this.options.bloom&&t.bloom>0&&this.bloomDown.length){const l=this.prefilterPass.material.uniforms;l.tColor.value=w,l.uTexel.value.set(1/this.width,1/this.height),l.uThreshold.value=(J[t.look]||J.storybook).threshold??1,this.prefilterPass.render(o,this.bloomDown[0]);const h=this.downPass.material.uniforms;for(let T=1;T<this.bloomDown.length;T++){const j=this.bloomDown[T-1];h.tColor.value=j.texture,h.uTexel.value.set(1/j.width,1/j.height),this.downPass.render(o,this.bloomDown[T])}const b=this.upPass.material.uniforms;let d=this.bloomDown[this.bloomDown.length-1];for(let T=this.bloomDown.length-2;T>=0;T--)b.tColor.value=d.texture,b.tBase.value=this.bloomDown[T].texture,b.uTexel.value.set(1/d.width,1/d.height),b.uBaseWeight.value=1,this.upPass.render(o,this.bloomUp[T]),d=this.bloomUp[T];z=d.texture}const g=J[t.look]||J.storybook,_=t.miniature>.01||t.depthOfField>.01,Y=(t.bokehRadius??12)*(this.height/1080),q=Math.max(1,Y*.5);if(_){const l=this.dofPrePass.material.uniforms;l.tColor.value=w,l.tDepth.value=this.copyRT.texture,l.uTexel.value.set(1/this.width,1/this.height),l.uFar.value=m,l.uFocus.value=t.focusDistance,l.uDof.value=Math.min(1,t.depthOfField),l.uMiniature.value=t.miniature,this.dofPrePass.render(o,this.dofPre);const h=this.bokehPass.material.uniforms;h.tPre.value=this.dofPre.texture,h.uTexel.value.set(1/this.dofPre.width,1/this.dofPre.height),h.uRadius.value=q,h.uFrame.value=this.taaFrame,this.bokehPass.render(o,this.dofA);const b=this.tentPass.material.uniforms;b.tColor.value=this.dofA.texture,b.uTexel.value.set(1/this.dofA.width,1/this.dofA.height),this.tentPass.render(o,this.dofB)}const Z=(g.glow??0)>0&&!this.lite;if(Z){const l=this.downPass.material.uniforms;l.tColor.value=w,l.uTexel.value.set(1/this.width,1/this.height),this.downPass.render(o,this.blurA),l.tColor.value=this.blurA.texture,l.uTexel.value.set(1/this.blurA.width,1/this.blurA.height),this.downPass.render(o,this.blurB);const h=this.upPass.material.uniforms;h.tColor.value=this.blurB.texture,h.tBase.value=this.blurA.texture,h.uTexel.value.set(1/this.blurB.width,1/this.blurB.height),h.uBaseWeight.value=0,this.upPass.render(o,this.blurC)}const s=this.compositePass.material.uniforms;s.uGlow.value=Z?g.glow??0:0,s.tScene.value=w,s.tBloom.value=z??this.blurB.texture,s.uBloom.value=z?t.bloom*.35:0,s.tBlur.value=this.blurC.texture,s.tDepth.value=this.copyRT.texture,s.tAo.value=this.aoA.texture,s.uAo.value=F?t.ao??1:0,s.tRays.value=this.raysRT.texture,s.uRays.value=R?t.sun.strength:0,t.sun&&s.uSunColor.value.copy(t.sun.color),s.uBlurOn.value=Z?1:0,s.uMiniature.value=t.miniature,s.uDof.value=Math.min(1,t.depthOfField),s.uFocus.value=t.focusDistance,s.uDofOn.value=_?1:0,s.tDof.value=this.dofB.texture,s.uBokehPx.value=q*2;const ae=Math.max(0,Math.min(1,t.lens??1));s.uDirt.value=z?(g.dirt??0)*ae:0,s.uChromatic.value=Math.min(1.5,(this.lite?0:(g.chromatic??0)*ae)+(t.chromatic??0)),s.uLetterbox.value=Math.max(0,Math.min(1,t.letterbox??0)),s.uOutline.value=Math.max(0,Math.min(1,t.outline??0)),s.uOutlinePx.value=Math.max(1,this.height/900),s.uExposure.value=t.exposure,s.uTexel.value.set(1/this.width,1/this.height),s.uSharpen.value=t.sharpen??0,s.uTonemap.value=g.tonemap,s.uSaturation.value=g.saturation,s.uContrast.value=g.contrast,s.uBalance.value.setRGB(...g.balance),s.uLift.value.setRGB(...g.lift),s.uGain.value.setRGB(...g.gain),s.uShadowTint.value.setRGB(...g.shadowTint),s.uHighlightTint.value.setRGB(...g.highlightTint),s.uVignette.value=g.vignette,s.uShoulder.value=g.shoulder??0,s.uToning.value=g.toning??1,s.uGrain.value=g.grain,s.uMono.value=g.mono?1:0,s.uTime.value=this.time,t.flash?(s.uFlash.value.setRGB(t.flash[0],t.flash[1],t.flash[2]),s.uFlashAmount.value=t.flash[3]):s.uFlashAmount.value=0,t.underwater&&t.underwater.amount>0?(s.uUnder.value=t.underwater.amount,s.uUnderColor.value.copy(t.underwater.color),s.uUnderFog.value=t.underwater.fog,s.uUnderSurface.value=t.underwater.surface??1e9,s.uUnderDepth.value=t.underwater.depth??0,s.uUnderBeams.value=(t.underwater.beams??.5)*2,s.uInvProj.value.copy(r.projectionMatrixInverse),s.uCamWorld.value.copy(r.matrixWorld)):s.uUnder.value=0,t.mist&&t.mist.amount>.002?(s.uMist.value=Math.min(1,t.mist.amount),s.uMistColor.value.copy(t.mist.color)):s.uMist.value=0;const I=t.filter&&t.filter.strength>0?Ke(t.filter.id):void 0,oe=this.lensPrimed?Math.max(0,Math.min(1,t.lensWater??0)):.005;this.lensPrimed=!0;let W=null;const re=this.lensPrimed?Math.max(0,Math.min(1,t.rush??0)):0;if(oe>.004||re>.01){const l=o.getDrawingBufferSize(new x);this.lensRT?(this.lensRT.width!==l.x||this.lensRT.height!==l.y)&&this.lensRT.setSize(l.x,l.y):this.lensRT=new L(l.x,l.y,{depthBuffer:!1}),W=this.lensRT}const se=()=>{if(!W)return;const l=this.lensPass.material.uniforms;l.tDiffuse.value=W.texture,l.uWet.value=oe,l.uRush.value=re,l.uTime.value=this.time,l.uAspect.value=W.width/Math.max(1,W.height),this.lensPass.render(o,null)};if(!I){this.compositePass.render(o,W),se();return}const M=o.getDrawingBufferSize(new x);this.filterRT?(this.filterRT.width!==M.x||this.filterRT.height!==M.y)&&this.filterRT.setSize(M.x,M.y):this.filterRT=new L(M.x,M.y,{depthBuffer:!1});const ie=this.lite?`${I.id}:lite`:I.id;this.filterPass?.id!==ie&&(this.filterPass?.pass.material.dispose(),this.filterPass={id:ie,pass:new O(Je(I,he,this.lite))});const y=this.filterPass.pass.material;if(y.uniforms.uBars&&(y.uniforms.uBars.value=s.uLetterbox.value,y.uniforms.uAspect.value=this.width/this.height,s.uLetterbox.value=0),this.compositePass.render(o,this.filterRT),y.uniforms.tDiffuse.value=this.filterRT.texture,Xe(I,y,{time:this.time,width:M.x,height:M.y,strength:t.filter.strength,color:t.filter.color}),y.uniforms.tDepth){y.uniforms.uDepthOn&&(y.uniforms.uDepthOn.value=1),y.uniforms.uDepthSize&&y.uniforms.uDepthSize.value.set(this.sceneRT.width,this.sceneRT.height);const l=r,h=Math.tan(l.fov*Math.PI/360);y.uniforms.tDepth.value=this.sceneRT.depthTexture,y.uniforms.uNear&&(y.uniforms.uNear.value=l.near),y.uniforms.uTan.value.set(h*l.aspect,h),y.uniforms.uCamWorld.value.copy(l.matrixWorld),y.uniforms.uFar.value=l.far,t.filterFocus&&y.uniforms.uFocus.value.copy(t.filterFocus)}this.filterPass.pass.render(o,W),se()}async compileLate(e,r,t,n=()=>!0){const u=this.renderer,o=u.getRenderTarget();u.setRenderTarget(this.sceneRT);const i=K(u,e,t,n,r);u.setRenderTarget(o),await i}async compileAsync(e,r,t=()=>!0){const n=this.renderer,u=n.getRenderTarget(),o=[];n.setRenderTarget(this.sceneRT),o.push(K(n,e,r,t));const i=r.layers.mask;r.layers.set(ue),n.setRenderTarget(this.mainRT),e.traverse(f=>{f.isMesh&&f.layers.test(r.layers)&&o.push(K(n,f,r,t,e))}),r.layers.mask=i;for(const f of[this.copyPass,this.blitPass,this.prefilterPass,this.downPass,this.upPass,this.aoPass,this.aoBlurPass,this.raysPass,this.airPass,this.taaPass,this.dofPrePass,this.bokehPass,this.tentPass,this.compositePass,this.lensPass])n.setRenderTarget(f===this.compositePass?null:this.mainRT),o.push(K(n,f.scene,f.camera,t));n.setRenderTarget(u),await Promise.all(o.map(f=>f.catch(()=>{})))}dispose(){this.filterRT?.dispose(),this.filterPass?.pass.material.dispose(),this.lensRT?.dispose(),this.lensPass.material.dispose(),[this.sceneRT,this.copyRT,this.mainRT,this.blurA,this.blurB,this.blurC,this.aoA,this.aoB,this.raysRT,this.dofPre,this.dofA,this.dofB,this.airRT,...this.taaRT??[],...this.bloomDown,...this.bloomUp].forEach(e=>e.dispose()),[this.copyPass,this.blitPass,this.prefilterPass,this.downPass,this.upPass,this.aoPass,this.aoBlurPass,this.raysPass,this.airPass,this.taaPass,this.dofPrePass,this.bokehPass,this.tentPass,this.compositePass].forEach(e=>e.material.dispose()),this.lensDirt.dispose(),this.nested.dispose()}}function ce(a,e){let r=1,t=0;for(let n=a;n>0;n=Math.floor(n/e))r/=e,t+=r*(n%e);return t}function tt(a=256){const e=new Uint8Array(a*a),r=new Float32Array(a*a);let t=9871;const n=()=>(t=t*16807%2147483647,t/2147483647),u=(i,f,m,c)=>{const v=m*m;for(let p=Math.max(0,Math.floor(f-m));p<Math.min(a,Math.ceil(f+m));p++)for(let k=Math.max(0,Math.floor(i-m));k<Math.min(a,Math.ceil(i+m));k++){const P=(k-i)**2+(p-f)**2;if(P>v)continue;const w=1-P/v;r[p*a+k]+=c*(w*w*.7+Math.exp(-((1-Math.sqrt(w)-.12)**2)*140)*.3)}};for(let i=0;i<70;i++){const f=n()*a,m=n()*a,c=Math.min(1,Math.hypot(f/a-.5,m/a-.5)*2.1);u(f,m,2+n()**2*26,(.15+n()*.55)*(.35+c*.65))}for(let i=0;i<3;i++){let f=n()*a,m=n()*a;const c=n()*Math.PI*2;for(let v=0;v<90;v++)u(f,m,3+n()*3,.05),f+=Math.cos(c+v*.012)*1.6,m+=Math.sin(c+v*.012)*1.6}for(let i=0;i<r.length;i++)e[i]=Math.round(Math.min(1,r[i])*255);const o=new fe(e,a,a,me,V);return o.magFilter=S,o.minFilter=S,o.wrapS=o.wrapT=Le,o.needsUpdate=!0,o}export{lt as P,te as S,ue as V,$e as a,rt as b,Q as c,it as d,Je as e,Xe as f,st as p,Ke as s};
