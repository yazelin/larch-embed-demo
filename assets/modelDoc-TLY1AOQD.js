import{_ as p}from"./preload-helper-BXl3LOEh.js";import{C as m,e as y,F as S,G as w,c as M,M as v,B as _,V as b,f as h,g as C,b as T}from"./three-engine-CPoZO8QK.js";import{s as D,b as O,C as x}from"./clayRender-BtrR-tSQ.js";import{M as A}from"./motions-CvmnnzeK.js";import{l as N,G as P,a as R,V as F,b as k}from"./builtins-BYZnGG-g.js";const V=`
${R}
#include <skinning_pars_vertex>
#include <morphtarget_pars_vertex>
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vTint;
void main() {
  vUv = uv;
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  ${F}
  vWorldPos = l3dWorldPos.xyz;
  vWorldNormal = l3dWorldNormal;
  #ifdef USE_COLOR
    vTint = color.rgb;
  #else
    vTint = vec3(1.);
  #endif
  gl_Position = projectionMatrix * viewMatrix * l3dWorldPos;
  ${k}
}
`,W=`
${P}
uniform vec3 uColor;
uniform sampler2D uMap;
uniform float uHasMap;
uniform sampler2D uNormalMap;
uniform float uHasNormal;
uniform float uSoften;
uniform float uAlphaTest;
uniform vec3 uEmissive;
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vTint;
// Normal mapping without tangents (Schüler's cotangent frame from screen-space derivatives).
vec3 perturb(vec3 n, vec3 p, vec2 uv, vec3 m) {
  vec3 dp1 = dFdx(p), dp2 = dFdy(p);
  vec2 duv1 = dFdx(uv), duv2 = dFdy(uv);
  vec3 dp2perp = cross(dp2, n), dp1perp = cross(n, dp1);
  vec3 t = dp2perp * duv1.x + dp1perp * duv2.x;
  vec3 b = dp2perp * duv1.y + dp1perp * duv2.y;
  float invmax = inversesqrt(max(dot(t, t), dot(b, b)) + 1e-12);
  return normalize(mat3(t * invmax, b * invmax, n) * m);
}
void main() {
  vec3 albedo = uColor * vTint;
  if (uHasMap > .5) {
    vec4 t = texture(uMap, vUv, uSoften);
    if (t.a < uAlphaTest) discard;
    // Baked light and harsh micro-contrast in generated textures fight the world's own light: ease the extremes.
    vec3 c = t.rgb;
    float l = dot(c, vec3(.2126, .7152, .0722));
    c = mix(vec3(l), c, 1.06);
    c = mix(c, vec3(l) * .35 + c * .65, smoothstep(.55, 1., l) * .25);
    albedo *= clamp(c, 0., .9);
  }
  vec3 n = normalize(vWorldNormal) * (gl_FrontFacing ? 1. : -1.);
  if (uHasNormal > .5) {
    vec3 m = texture(uNormalMap, vUv).xyz * 2. - 1.;
    m.xy *= .7;
    n = perturb(n, vWorldPos, vUv, normalize(m));
  }
  vec3 v = normalize(cameraPosition - vWorldPos);
  float shadow = l3dSunShadow() * l3dCloudShadow(vWorldPos);
  vec3 col = l3dLight(albedo, n, v, shadow, 1., .3, .18, .25);
  col += l3dPoints(albedo, n, vWorldPos);
  col += l3dRim(n, v, .75);
  col += uEmissive;
  // Light through thin parts (leaves, ears, cloth) when the sun is behind them.
  col += albedo * uSunColor * l3dTranslucency(n, v, 6.) * .12 * shadow;
  gl_FragColor = vec4(l3dFog(col, vWorldPos), 1.);
}
`;function z(a,e,i){const n=i?new m(i):e.color?.clone()??new m("#ffffff"),r=N(a,{uniforms:{uColor:{value:n},uMap:{value:e.map??null},uHasMap:{value:e.map?1:0},uNormalMap:{value:e.normalMap??null},uHasNormal:{value:e.normalMap?1:0},uSoften:{value:.75},uAlphaTest:{value:e.alphaTest??.4},uEmissive:{value:e.emissive?.clone()??new m(0,0,0)}},vertexShader:V,fragmentShader:W,vertexColors:!!e.vertexColors,side:e.doubleSided?y:S});return r.name="l3d-scene-lit",r}const I=[{id:"original",name:"原本的樣子",nameEn:"Original"},{id:"scene",name:"場景光影",nameEn:"Scene lighting"},{id:"clay",name:"黏土",nameEn:"Clay"},{id:"toon",name:"卡通",nameEn:"Toon"},{id:"jelly",name:"果凍",nameEn:"Jelly"},{id:"water",name:"流水",nameEn:"Water"},{id:"glass",name:"玻璃",nameEn:"Glass"},{id:"crystal",name:"水晶",nameEn:"Crystal"},{id:"ice",name:"冰",nameEn:"Ice"},{id:"metal",name:"金屬",nameEn:"Metal"},{id:"gold",name:"黃金",nameEn:"Gold"},{id:"glow",name:"發光",nameEn:"Glow"},{id:"lava",name:"岩漿",nameEn:"Lava"},{id:"plush",name:"絨毛",nameEn:"Plush"}];function q(a,e,i,n=1){const r=i*n;switch(a.position.y=0,a.rotation.set(0,a.userData.baseYaw??0,0),a.scale.set(1,1,1),e){case"breathe":{const t=Math.sin(r*2.2)*.035;a.scale.set(1-t*.5,1+t,1-t*.5);break}case"hop":{const t=r*1.6%1,o=Math.sin(t*Math.PI);a.position.y=o*.32;const s=t<.08||t>.92?.16*(1-Math.abs(t<.5?t:1-t)/.08):-o*.06;a.scale.set(1+s*.6,1-s,1+s*.6);break}case"waddle":a.rotation.z=Math.sin(r*5)*.1,a.position.y=Math.abs(Math.sin(r*5))*.05;break;case"float":a.position.y=.25+Math.sin(r*1.5)*.12,a.rotation.z=Math.sin(r*1.1)*.05;break;case"spin":a.rotation.y=(a.userData.baseYaw??0)+r*1.4;break;case"jelly":{const t=Math.sin(r*7)*.06*(.6+.4*Math.sin(r*1.3));a.scale.set(1+t,1-t,1+t);break}case"dance":a.rotation.y=(a.userData.baseYaw??0)+Math.sin(r*3)*.5,a.rotation.z=Math.sin(r*6)*.08,a.position.y=Math.abs(Math.sin(r*6))*.12;break}}const E=["glb","gltf","fbx","obj","stl","ply","dae","3mf","usdz"];function U(a="新模型"){return{v:1,name:a,source:"clay",clay:{prims:[]},material:{preset:"clay"},physics:{wobble:.3,mass:1,bounce:.3}}}function Z(a){try{const e=JSON.parse(a||"{}"),i=I.map(r=>r.id),n={v:1,name:typeof e.name=="string"?e.name.slice(0,80):"模型",source:e.source==="file"?"file":"clay",material:{preset:i.includes(e.material?.preset)?e.material.preset:e.source==="file"?"original":"clay",...typeof e.material?.color=="string"?{color:e.material.color.slice(0,9)}:{},...Number.isFinite(e.material?.strength)?{strength:Number(e.material.strength)}:{}}};return e.clay&&(n.clay=D(e.clay)),e.file&&typeof e.file.url=="string"&&(n.file={url:e.file.url.slice(0,2e3),format:E.includes(e.file.format)?e.file.format:"glb",name:String(e.file.name||"").slice(0,120),...e.file.size?{size:Number(e.file.size)}:{},...typeof e.file.mtlUrl=="string"?{mtlUrl:e.file.mtlUrl.slice(0,2e3)}:{}}),e.fit&&(n.fit={height:Math.max(.05,Math.min(100,Number(e.fit.height)||1.2)),offset:Array.isArray(e.fit.offset)?e.fit.offset.slice(0,3).map(Number):[0,0,0],rotY:Number(e.fit.rotY)||0}),e.ai&&typeof e.ai=="object"&&(n.ai=JSON.parse(JSON.stringify(e.ai).slice(0,2e4))),e.paint?.texture&&(n.paint={texture:String(e.paint.texture).slice(0,2e3)}),e.physics&&(n.physics={wobble:Math.max(0,Math.min(1,Number(e.physics.wobble)||0)),mass:Math.max(.05,Math.min(100,Number(e.physics.mass)||1)),bounce:Math.max(0,Math.min(1,Number(e.physics.bounce)||0))}),e.creature&&(n.creature={behaviour:["still","walk","hop","fly","hover","swim"].includes(e.creature.behaviour)?e.creature.behaviour:"walk",speed:Number(e.creature.speed)||1.3,shy:Number(e.creature.shy)||0}),typeof e.thumb=="string"&&e.thumb.length<3e5&&(n.thumb=e.thumb),A.some(r=>r.id===e.motion)&&(n.motion=e.motion),!n.clay&&n.source==="clay"&&(n.clay={prims:[]}),n}catch{return U()}}function L(a,e,i){const n=i?new m(i):e.color?.clone()??new m("#ffffff"),r=e.map??null,t=!!e.vertexColors;switch(a){case"clay":return new v({color:n,map:r,vertexColors:t,roughness:.78,metalness:0});case"toon":return new C({color:n,map:r,vertexColors:t});case"jelly":return new h({color:n,map:r,vertexColors:t,transmission:.92,thickness:.8,roughness:.12,ior:1.33,attenuationColor:n,attenuationDistance:.9,clearcoat:1,clearcoatRoughness:.05,side:y});case"water":return new h({color:n.clone().lerp(new m("#7fd6ff"),.5),transmission:.96,thickness:.5,roughness:.03,ior:1.33,clearcoat:1,attenuationColor:new m("#3fb2d6"),attenuationDistance:1.6});case"glass":return new h({color:n,transmission:1,thickness:.3,roughness:.02,ior:1.5,metalness:0,clearcoat:1});case"crystal":return new h({color:n,transmission:.85,thickness:.6,roughness:.05,ior:2.2,iridescence:1,iridescenceIOR:1.6,clearcoat:1,flatShading:!0});case"ice":return new h({color:n.clone().lerp(new m("#dff6ff"),.6),transmission:.7,thickness:1,roughness:.35,ior:1.31,attenuationColor:new m("#8ad3ff"),attenuationDistance:1.2});case"metal":return new v({color:n,map:r,vertexColors:t,metalness:1,roughness:.22});case"gold":return new v({color:new m("#ffcc55"),metalness:1,roughness:.18});case"glow":return new v({color:n,map:r,vertexColors:t,emissive:n,emissiveIntensity:2.4,roughness:.5});case"lava":return new v({color:new m("#3a1a12"),emissive:new m("#ff5a1f"),emissiveIntensity:2,roughness:.9});case"plush":return new h({color:n,map:r,vertexColors:t,roughness:1,sheen:1,sheenRoughness:.6,sheenColor:n.clone().lerp(new m("#ffffff"),.5)});default:return null}}async function Q(a,e){if(a.source==="clay"&&a.clay){const i=`model:${j(a.clay)}`,n=O(a.clay,i,{resolution:64,skin:!0});if(a.material.preset==="clay"||a.material.preset==="original"||a.material.preset==="scene"){const o=new x(a.clay,n,e.clay,e.outline);return o.group.userData.figure=o,o.group}const r=new x(a.clay,n,e.clay),t=L(a.material.preset,{vertexColors:!0},a.material.color);return t&&(r.mesh.material=t),r.group.userData.figure=r,r.group}if(a.source==="file"&&a.file&&e.file){const i=await e.file(a.file.url);if(!i)throw new Error("model file missing");const{object:n,clips:r}=await G(i,a.file.format,a.file.mtlUrl&&e.file?await e.file(a.file.mtlUrl):null),t=B(n,a.fit?.height??1.2,a.fit?.offset,a.fit?.rotY);if(a.material.preset==="scene"){const o=new Map;t.traverse(s=>{const l=s;if(!l.isMesh)return;const c=u=>{const f=o.get(u);if(f)return f;const d=u,g=z(e.env,{color:d.color,map:d.map,normalMap:d.normalMap,emissive:d.emissiveMap?void 0:d.emissive?.clone().multiplyScalar(d.emissiveIntensity??1),vertexColors:!!l.geometry.getAttribute("color")&&!!d.vertexColors,doubleSided:d.side===y,alphaTest:d.alphaTest||(d.transparent?.35:.4)},a.material.color);return o.set(u,g),g};l.material=Array.isArray(l.material)?l.material.map(c):c(l.material)})}else a.material.preset!=="original"&&t.traverse(o=>{const s=o;if(!s.isMesh)return;const l=Array.isArray(s.material)?s.material[0]:s.material,c=L(a.material.preset,{color:l?.color,map:l?.map,vertexColors:!!s.geometry.getAttribute("color")},a.material.color);c&&(s.material=c)});if(t.traverse(o=>{const s=o;s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),r.length){const o=new T(t);t.userData.mixer=o,t.userData.clips=r;const s=r.find(l=>/idle|stand|breath/i.test(l.name))??r[0];o.clipAction(s).play()}return t}return new w}function B(a,e,i=[0,0,0],n=0){const r=new w,t=new w;t.add(a),r.add(t),a.updateMatrixWorld(!0);const s=new _().setFromObject(a).getSize(new b),l=s.y>1e-6?e/s.y:1;a.scale.multiplyScalar(l),a.updateMatrixWorld(!0);const c=new _().setFromObject(a),u=c.getCenter(new b);return a.position.x-=u.x,a.position.z-=u.z,a.position.y-=c.min.y,t.position.set(i[0],i[1],i[2]),t.rotation.y=n,r.userData.fitScale=l,r}async function G(a,e,i=null){const n=()=>new TextDecoder().decode(a);switch(e){case"glb":case"gltf":{const{GLTFLoader:r}=await p(async()=>{const{GLTFLoader:u}=await import("./three-engine-CPoZO8QK.js").then(f=>f.aN);return{GLTFLoader:u}},[]),{DRACOLoader:t}=await p(async()=>{const{DRACOLoader:u}=await import("./three-engine-CPoZO8QK.js").then(f=>f.aO);return{DRACOLoader:u}},[]),{MeshoptDecoder:o}=await p(async()=>{const{MeshoptDecoder:u}=await import("./three-engine-CPoZO8QK.js").then(f=>f.aP);return{MeshoptDecoder:u}},[]),s=new r,l=new t;l.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/"),s.setDRACOLoader(l),s.setMeshoptDecoder(o);const c=await s.parseAsync(a,"");return{object:c.scene,clips:c.animations}}case"fbx":{const{FBXLoader:r}=await p(async()=>{const{FBXLoader:o}=await import("./three-engine-CPoZO8QK.js").then(s=>s.aQ);return{FBXLoader:o}},[]),t=new r().parse(a,"");return{object:t,clips:t.animations||[]}}case"obj":{const{OBJLoader:r}=await p(async()=>{const{OBJLoader:o}=await import("./three-engine-CPoZO8QK.js").then(s=>s.aR);return{OBJLoader:o}},[]),t=new r;if(i){const{MTLLoader:o}=await p(async()=>{const{MTLLoader:l}=await import("./three-engine-CPoZO8QK.js").then(c=>c.aS);return{MTLLoader:l}},[]),s=new o().parse(new TextDecoder().decode(i),"");s.preload(),t.setMaterials(s)}return{object:t.parse(n()),clips:[]}}case"stl":{const{STLLoader:r}=await p(async()=>{const{STLLoader:o}=await import("./three-engine-CPoZO8QK.js").then(s=>s.aT);return{STLLoader:o}},[]),t=new r().parse(a);return t.computeVertexNormals(),{object:new M(t,new v({color:"#d8d2c8",roughness:.7,vertexColors:!!t.getAttribute("color")})),clips:[]}}case"ply":{const{PLYLoader:r}=await p(async()=>{const{PLYLoader:o}=await import("./three-engine-CPoZO8QK.js").then(s=>s.aU);return{PLYLoader:o}},[]),t=new r().parse(a);return t.computeVertexNormals(),{object:new M(t,new v({color:"#ffffff",roughness:.7,vertexColors:!!t.getAttribute("color")})),clips:[]}}case"dae":{const{ColladaLoader:r}=await p(async()=>{const{ColladaLoader:o}=await import("./three-engine-CPoZO8QK.js").then(s=>s.aV);return{ColladaLoader:o}},[]),t=new r().parse(n(),"");return{object:t?.scene??new w,clips:t?.scene?.animations||[]}}case"3mf":{const{ThreeMFLoader:r}=await p(async()=>{const{ThreeMFLoader:t}=await import("./three-engine-CPoZO8QK.js").then(o=>o.aW);return{ThreeMFLoader:t}},[]);return{object:new r().parse(a),clips:[]}}case"usdz":{const{USDZLoader:r}=await p(async()=>{const{USDZLoader:t}=await import("./three-engine-CPoZO8QK.js").then(o=>o.aX);return{USDZLoader:t}},[]);return{object:new r().parse(a),clips:[]}}}}function K(a){const e=a.toLowerCase().split(".").pop()||"";return E.includes(e)?e:null}function j(a){const e=JSON.stringify(a.prims)+JSON.stringify(a.splats||[]);let i=2166136261;for(let n=0;n<e.length;n++)i^=e.charCodeAt(n),i=Math.imul(i,16777619);return(i>>>0).toString(36)+e.length.toString(36)}export{I as M,q as a,Z as b,L as c,Q as d,U as e,B as f,K as g,G as p};
