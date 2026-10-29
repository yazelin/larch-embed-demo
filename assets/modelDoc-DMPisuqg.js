import{_ as d}from"./preload-helper-BXl3LOEh.js";import{M as E,V as p,g as q,B as V,C as f,D as C,X as I,Y as x,Q as H,G as k,o as T,p as v,O,x as D,Z as U}from"./three-engine-DgueuEcG.js";import{v as G,G as $,x as Y,V as K,y as Q,z as X,A as Z,C as J,B as ee,D as te,E as ae,F as re,t as se}from"./stageModel-CnGp4kR2.js";import{M as ne}from"./motions-CvmnnzeK.js";const oe=600;function ie(t){if(!Array.isArray(t))return[];const e=(a,r,s)=>{const o=Number(a);return Number.isFinite(o)?Math.max(r,Math.min(s,o)):0},n=(a,r,s)=>Array.isArray(a)?[e(a[0],r,s),e(a[1],r,s),e(a[2],r,s)]:[0,0,0];return t.slice(-oe).map(a=>{const r=a&&typeof a=="object"?a:{};return{p:n(r.p,-100,100),d:n(r.d,-10,10),r:Math.max(.005,e(r.r,.005,20))}}).filter(a=>a.d[0]||a.d[1]||a.d[2])}function le(t){if(t>=1)return 0;const e=1-t*t;return e*e}function W(t,e){if(e.length)for(const n of e){const[a,r,s]=n.p,[o,i,c]=n.d,u=n.r,m=u*u;for(let l=0;l<t.length;l+=3){const w=t[l]-a,h=t[l+1]-r,y=t[l+2]-s,P=w*w+h*h+y*y;if(P>=m)continue;const A=le(Math.sqrt(P)/u);t[l]+=o*A,t[l+1]+=i*A,t[l+2]+=c*A}}}function ce(t){if(!t?.length)return"";let e=2166136261;const n=JSON.stringify(t);for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619);return`:d${(e>>>0).toString(36)}`}function ue(t,e){if(!e?.length)return t;const n=new Float32Array(t.positions);W(n,e);const a=new q;a.setAttribute("position",new V(n,3)),a.setIndex(new V(t.indices,1)),a.computeVertexNormals();const r=a.getAttribute("normal").array;return a.dispose(),{...t,positions:n,normals:new Float32Array(r)}}const N=new E,g=new p;function me(t,e){t.updateMatrixWorld(!0);const n=new E().copy(t.matrixWorld).invert();t.traverse(a=>{const r=a;if(!r.isMesh||!r.geometry)return;const s=r.geometry.getAttribute("position");if(!s||s.itemSize!==3)return;const o=r.userData.restPositions??(e?.length?new Float32Array(s.array):void 0);if(!o)return;const i=r.geometry.getAttribute("normal");if(r.userData.restPositions=o,r.userData.restNormals??=i?new Float32Array(i.array):null,!e?.length){s.array.set(o),s.needsUpdate=!0,i&&r.userData.restNormals&&(i.array.set(r.userData.restNormals),i.needsUpdate=!0),r.geometry.computeBoundingSphere();return}const c=new E().multiplyMatrices(n,r.matrixWorld);N.copy(c).invert();const u=new Float32Array(o.length);for(let l=0;l<o.length;l+=3)g.set(o[l],o[l+1],o[l+2]).applyMatrix4(c),u[l]=g.x,u[l+1]=g.y,u[l+2]=g.z;W(u,e||[]);const m=s.array;for(let l=0;l<o.length;l+=3)g.set(u[l],u[l+1],u[l+2]).applyMatrix4(N),m[l]=g.x,m[l+1]=g.y,m[l+2]=g.z;s.needsUpdate=!0,r.geometry.computeVertexNormals(),r.geometry.computeBoundingSphere(),r.geometry.computeBoundingBox()})}const he=`
${Y}
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
  ${K}
  vWorldPos = l3dWorldPos.xyz;
  vWorldNormal = l3dWorldNormal;
  #ifdef USE_COLOR
    vTint = color.rgb;
  #else
    vTint = vec3(1.);
  #endif
  gl_Position = projectionMatrix * viewMatrix * l3dWorldPos;
  ${Q}
}
`,fe=`
${$}
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
`;function pe(t,e,n){const a=n?new f(n):e.color?.clone()??new f("#ffffff"),r=G(t,{uniforms:{uColor:{value:a},uMap:{value:e.map??null},uHasMap:{value:e.map?1:0},uNormalMap:{value:e.normalMap??null},uHasNormal:{value:e.normalMap?1:0},uSoften:{value:.75},uAlphaTest:{value:e.alphaTest??.4},uEmissive:{value:e.emissive?.clone()??new f(0,0,0)}},vertexShader:he,fragmentShader:fe,vertexColors:!!e.vertexColors,side:e.doubleSided?C:I});return r.name="l3d-scene-lit",r}const de={uJellyBase:{value:new p},uJellyHeight:{value:1},uJellySquash:{value:0},uJellyShear:{value:new p},uJellyBulge:{value:0},uJellyDeep:{value:new f("#ffffff")}},ye=`
uniform vec3 uJellyBase;
uniform float uJellyHeight;
uniform float uJellySquash;
uniform vec3 uJellyShear;
uniform float uJellyBulge;
// World-space soft body: the base stays put, the top leans (more the higher up), squashing is volume-keeping and
// bulges the middle out.
vec3 jellyDeform(vec3 w) {
  vec3 r = w - uJellyBase;
  float h = clamp(r.y / max(uJellyHeight, .001), 0., 1.6);
  float sy = 1. + uJellySquash;
  float sxz = inversesqrt(max(sy, .3));
  float hc = clamp(h, 0., 1.);
  float bulge = 1. + uJellyBulge * max(-uJellySquash, 0.) * 4. * hc * (1. - hc);
  r.xz *= sxz * bulge;
  r.y *= sy;
  r.xz += uJellyShear.xz * h * h * uJellyHeight;
  return uJellyBase + r;
}
`,ge=`
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
vec4 jellyWorld = modelMatrix * mvPosition;
jellyWorld.xyz = jellyDeform( jellyWorld.xyz );
mvPosition = viewMatrix * jellyWorld;
gl_Position = projectionMatrix * mvPosition;
`,ve=`
{
  // Thick in the middle, thin at the rim: the facing part takes the deeper colour, the edge glows with its own.
  float jellyFacing = clamp(dot(normal, normalize(vViewPosition)), 0., 1.);
  outgoingLight = mix(outgoingLight, outgoingLight * uJellyDeep, pow(jellyFacing, 1.5) * .24);
  outgoingLight += diffuseColor.rgb * (pow(1. - jellyFacing, 3.) * .42 + .1);
}
`;function we(t,e,n){const a=new x({color:t.clone().lerp(new f("#ffffff"),.3),map:e,vertexColors:n,transmission:.82,thickness:.9,roughness:.16,ior:1.38,attenuationColor:t.clone(),attenuationDistance:1.5,clearcoat:1,clearcoatRoughness:.05,specularIntensity:1,side:C}),r=t.clone().multiplyScalar(.82);return r.offsetHSL(0,.1,0),a.userData.jelly=!0,a.userData.jellyDeep=r,a.onBeforeCompile=s=>{const i=a.userData.jellyRig?.uniforms??{...de,uJellyDeep:{value:r}};Object.assign(s.uniforms,i),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
${ye}`).replace("#include <project_vertex>",ge),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uJellyDeep;`).replace("#include <opaque_fragment>",`${ve}
#include <opaque_fragment>`)},a.customProgramCacheKey=()=>"larch-jelly-v2",a}const _=new p,S=new p,L=new p,b=new p,be=new H,xe=new E;class Me{uniforms;softness;root;squash=0;squashVel=0;shear=new p;shearVel=new p;lastWorld=new p;lastVelocity=new p;tracked=0;height=1;bottom=0;time=Math.random()*10;constructor(e,n){this.root=e,this.softness=Math.min(1,Math.max(0,n)),this.uniforms={uJellyBase:{value:new p},uJellyHeight:{value:1},uJellySquash:{value:0},uJellyShear:{value:new p},uJellyBulge:{value:.6},uJellyDeep:{value:new f("#ffffff")}},this.measure()}measure(){const e=this.root;e.updateWorldMatrix(!0,!0);const n=xe.copy(e.matrixWorld).invert();let a=1/0,r=-1/0;e.traverse(s=>{const o=s;if(!o.isMesh||!o.geometry)return;o.geometry.boundingBox||o.geometry.computeBoundingBox();const i=o.geometry.boundingBox;for(const c of[i.min.x,i.max.x])for(const u of[i.min.y,i.max.y])for(const m of[i.min.z,i.max.z])_.set(c,u,m).applyMatrix4(o.matrixWorld).applyMatrix4(n),a=Math.min(a,_.y),r=Math.max(r,_.y)}),Number.isFinite(a)&&r>a&&(this.bottom=a,this.height=r-a)}carry(e){this.squash=e.squash,this.squashVel=e.squashVel,this.shear.copy(e.shear),this.shearVel.copy(e.shearVel),this.time=e.time}poke(e=1){const n=Math.random()*Math.PI*2;this.squashVel-=2.8*e,this.shearVel.x+=Math.cos(n)*1.2*e,this.shearVel.z+=Math.sin(n)*1.2*e}land(e){this.squashVel-=Math.min(5,e*.55);const n=Math.random()*Math.PI*2,a=Math.min(1.4,e*.12);this.shearVel.x+=Math.cos(n)*a,this.shearVel.z+=Math.sin(n)*a}get moving(){return Math.abs(this.squash)>1e-4||Math.abs(this.squashVel)>.001||this.shear.lengthSq()>1e-6||this.shearVel.lengthSq()>1e-5}update(e){if(e<=0)return;const n=this.root;n.updateWorldMatrix(!0,!1),n.getWorldPosition(S);const a=n.getWorldScale(_).y,r=this.softness;b.set(0,0,0),this.tracked>1?(L.copy(S).sub(this.lastWorld).divideScalar(e),b.copy(L).sub(this.lastVelocity).divideScalar(e),b.lengthSq()>14400&&b.setLength(120),this.lastVelocity.y<-2.5&&L.y>this.lastVelocity.y*.3&&this.land(-this.lastVelocity.y*.7),this.lastVelocity.copy(L)):this.tracked===1&&this.lastVelocity.copy(S).sub(this.lastWorld).divideScalar(e),this.lastWorld.copy(S),this.tracked++;const s=Math.PI*2*(3.8-r*1.8),o=2*(.26-r*.15)*s,i=Math.PI*2*(4.4-r*1.8),c=2*(.24-r*.12)*i,u=(.7+r*.7)/Math.max(.4,this.height*a),m=Math.max(1,Math.min(6,Math.ceil(e/(1/120)))),l=Math.min(e,.1)/m;this.time+=e;const w=Math.sin(this.time*2.1)*.012*(.4+r);for(let y=0;y<m;y++)this.shearVel.x+=(-s*s*this.shear.x-o*this.shearVel.x-b.x*u)*l,this.shearVel.z+=(-s*s*this.shear.z-o*this.shearVel.z-b.z*u)*l,this.shear.addScaledVector(this.shearVel,l),this.squashVel+=(-i*i*this.squash-c*this.squashVel+Math.min(0,b.y)*.02)*l,this.squash+=this.squashVel*l;this.shear.y=0,this.shear.lengthSq()>.3*.3&&(this.shear.setLength(.3),this.shearVel.multiplyScalar(.5)),this.squash=Math.max(-.34,Math.min(.34,this.squash));const h=this.uniforms;n.getWorldQuaternion(be),h.uJellyBase.value.set(0,this.bottom,0).applyMatrix4(n.matrixWorld),h.uJellyHeight.value=this.height*a,h.uJellySquash.value=this.squash+w,h.uJellyShear.value.copy(this.shear),h.uJellyBulge.value=.35+r*.45}}function j(t,e){const n=[];if(t.traverse(r=>{const s=r;if(s.isMesh)for(const o of Array.isArray(s.material)?s.material:[s.material])o?.userData?.jelly&&n.push(o)}),!n.length)return null;const a=new Me(t,e);for(const r of n)r.userData.jellyRig=a,a.uniforms.uJellyDeep.value.copy(r.userData.jellyDeep??new f("#ffffff")),r.needsUpdate=!0;return t.userData.jellyRig=a,a}const _e=[{id:"standard",name:"標準",nameEn:"Standard"},{id:"original",name:"原本的樣子",nameEn:"Original"},{id:"scene",name:"場景光影",nameEn:"Scene lighting"},{id:"clay",name:"黏土",nameEn:"Clay"},{id:"toon",name:"卡通",nameEn:"Toon"},{id:"sketch",name:"素描排線",nameEn:"Pencil hatching"},{id:"dots",name:"漫畫網點",nameEn:"Comic dots"},{id:"jelly",name:"果凍",nameEn:"Jelly"},{id:"water",name:"流水",nameEn:"Water"},{id:"glass",name:"玻璃",nameEn:"Glass"},{id:"crystal",name:"水晶",nameEn:"Crystal"},{id:"ice",name:"冰",nameEn:"Ice"},{id:"metal",name:"金屬",nameEn:"Metal"},{id:"gold",name:"黃金",nameEn:"Gold"},{id:"glow",name:"發光",nameEn:"Glow"},{id:"lava",name:"岩漿",nameEn:"Lava"},{id:"plush",name:"絨毛",nameEn:"Plush"}];function We(t,e,n,a=1){const r=n*a;switch(t.position.y=0,t.rotation.set(0,t.userData.baseYaw??0,0),t.scale.set(1,1,1),e){case"breathe":{const s=Math.sin(r*2.2)*.035;t.scale.set(1-s*.5,1+s,1-s*.5);break}case"hop":{const s=r*1.6%1,o=Math.sin(s*Math.PI);t.position.y=o*.32;const i=s<.08||s>.92?.16*(1-Math.abs(s<.5?s:1-s)/.08):-o*.06;t.scale.set(1+i*.6,1-i,1+i*.6);break}case"waddle":t.rotation.z=Math.sin(r*5)*.1,t.position.y=Math.abs(Math.sin(r*5))*.05;break;case"float":t.position.y=.25+Math.sin(r*1.5)*.12,t.rotation.z=Math.sin(r*1.1)*.05;break;case"spin":t.rotation.y=(t.userData.baseYaw??0)+r*1.4;break;case"jelly":{const s=Math.sin(r*7)*.06*(.6+.4*Math.sin(r*1.3));t.scale.set(1+s,1-s,1+s);break}case"dance":t.rotation.y=(t.userData.baseYaw??0)+Math.sin(r*3)*.5,t.rotation.z=Math.sin(r*6)*.08,t.position.y=Math.abs(Math.sin(r*6))*.12;break}}const F=["glb","gltf","fbx","obj","stl","ply","dae","3mf","usdz"],Se=[{id:"object",name:"物件",nameEn:"Objects"},{id:"prop",name:"道具",nameEn:"Props"},{id:"house",name:"屋子",nameEn:"Houses"},{id:"slime",name:"史萊姆",nameEn:"Slimes"},{id:"human",name:"人類",nameEn:"People"},{id:"creature",name:"動物",nameEn:"Animals"},{id:"other",name:"其他",nameEn:"Other"}],Le=["wander","hop","keyAnim","clickAnim","spin","float","follow","animator","script"];function Ee(t="新模型"){return{v:1,name:t,source:"clay",clay:{prims:[]},material:{preset:"standard"},physics:{wobble:.3,mass:1,bounce:.3},view:{base:!0}}}const ke=["clear","cloudy","rain","storm","snow","fog"],Ae=Se.map(t=>t.id);function De(t){if(!t||typeof t!="object")return;const e=t,n=(r,s,o,i)=>{const c=Number(r);return Number.isFinite(c)?Math.max(o,Math.min(i,c)):s},a=Array.isArray(e.refs)?e.refs.slice(0,6).map(r=>{const s=r&&typeof r=="object"?r:{};if(typeof s.url!="string"||!/^(https:\/\/|\/|data:image\/)/.test(s.url)||s.url.length>4e5)return null;const o=Array.isArray(s.offset)?s.offset:[];return{id:typeof s.id=="string"?s.id.slice(0,40):`r${Math.random().toString(36).slice(2,8)}`,url:s.url,plane:s.plane==="side"||s.plane==="top"?s.plane:"front",opacity:n(s.opacity,.6,.05,1),size:n(s.size,1.6,.1,20),offset:[n(o[0],0,-20,20),n(o[1],0,-20,20),n(o[2],0,-20,20)]}}).filter(r=>!!r):[];return{...e.base===!1?{base:!1}:{base:!0},...typeof e.sky=="string"&&e.sky.length<2e3?{sky:e.sky}:{},...ke.includes(e.weather)&&e.weather!=="clear"?{weather:e.weather}:{},...a.length?{refs:a}:{}}}function Ce(t){return Array.isArray(t)?t.slice(0,16).map(e=>{const n=e&&typeof e=="object"?e:{};if(!Le.includes(n.type))return null;const a=n.props&&typeof n.props=="object"?JSON.stringify(n.props):"{}",r=a.length<=2e4?JSON.parse(a):{};return{id:typeof n.id=="string"?n.id.slice(0,40):`c${Math.random().toString(36).slice(2,9)}`,type:n.type,...n.enabled===!1?{enabled:!1}:{},props:r}}).filter(e=>!!e):[]}function Fe(t){try{const e=JSON.parse(t||"{}"),n=_e.map(i=>i.id),a={v:1,name:typeof e.name=="string"?e.name.slice(0,80):"模型",source:e.source==="file"?"file":"clay",material:{preset:n.includes(e.material?.preset)?e.material.preset:e.source==="file"?"original":"clay",...typeof e.material?.color=="string"?{color:e.material.color.slice(0,9)}:{},...Number.isFinite(e.material?.strength)?{strength:Number(e.material.strength)}:{}}};if(e.clay&&(a.clay=X(e.clay)),e.file&&typeof e.file.url=="string"&&(a.file={url:e.file.url.slice(0,2e3),format:F.includes(e.file.format)?e.file.format:"glb",name:String(e.file.name||"").slice(0,120),...e.file.size?{size:Number(e.file.size)}:{},...typeof e.file.mtlUrl=="string"?{mtlUrl:e.file.mtlUrl.slice(0,2e3)}:{}}),e.fit&&(a.fit={height:Math.max(.05,Math.min(100,Number(e.fit.height)||1.2)),offset:Array.isArray(e.fit.offset)?e.fit.offset.slice(0,3).map(Number):[0,0,0],rotY:Number(e.fit.rotY)||0}),e.ai&&typeof e.ai=="object"){const i=JSON.stringify(e.ai);i.length<=2e4&&(a.ai=JSON.parse(i))}e.paint?.texture&&(a.paint={texture:String(e.paint.texture).slice(0,2e3)}),e.physics&&(a.physics={wobble:Math.max(0,Math.min(1,Number(e.physics.wobble)||0)),mass:Math.max(.05,Math.min(100,Number(e.physics.mass)||1)),bounce:Math.max(0,Math.min(1,Number(e.physics.bounce)||0))}),e.creature&&(a.creature={behaviour:["still","walk","hop","fly","hover","swim"].includes(e.creature.behaviour)?e.creature.behaviour:"walk",speed:Number(e.creature.speed)||1.3,shy:Number(e.creature.shy)||0}),typeof e.thumb=="string"&&e.thumb.length<3e5&&(a.thumb=e.thumb),(e.hero==="boy"||e.hero==="girl")&&(a.hero=e.hero,a.heroLook=Z(e.heroLook,e.hero)),ne.some(i=>i.id===e.motion)&&(a.motion=e.motion),Ae.includes(e.category)&&(a.category=e.category);const r=De(e.view);r&&(a.view=r);const s=ie(e.deform);if(s.length&&(a.deform=s),e.anims&&typeof e.anims=="object"){const i={};for(const c of["idle","walk","run","jump"]){const u=e.anims[c];typeof u=="string"&&u&&(i[c]=u.slice(0,80))}Object.keys(i).length&&(a.anims=i)}const o=Ce(e.behaviours);return o.length&&(a.behaviours=o),!a.clay&&a.source==="clay"&&(a.clay={prims:[]}),a}catch{return Ee()}}function z(t,e,n){const a=n?new f(n):e.color?.clone()??new f("#ffffff"),r=e.map??null,s=!!e.vertexColors;switch(t){case"standard":return new v({color:a,map:r,vertexColors:s,roughness:.52,metalness:0});case"clay":return new v({color:a,map:r,vertexColors:s,roughness:.78,metalness:0});case"toon":return new D({color:a,map:r,vertexColors:s});case"sketch":return B("sketch",new D({color:a,map:r,vertexColors:s}));case"dots":return B("dots",new D({color:a,map:r,vertexColors:s}));case"jelly":return we(a,r,s);case"water":return new x({color:a.clone().lerp(new f("#7fd6ff"),.5),transmission:.96,thickness:.5,roughness:.03,ior:1.33,clearcoat:1,attenuationColor:new f("#3fb2d6"),attenuationDistance:1.6});case"glass":return new x({color:a,transmission:1,thickness:.3,roughness:.02,ior:1.5,metalness:0,clearcoat:1});case"crystal":return new x({color:a,transmission:.85,thickness:.6,roughness:.05,ior:2.2,iridescence:1,iridescenceIOR:1.6,clearcoat:1,flatShading:!0});case"ice":return new x({color:a.clone().lerp(new f("#dff6ff"),.6),transmission:.7,thickness:1,roughness:.35,ior:1.31,attenuationColor:new f("#8ad3ff"),attenuationDistance:1.2});case"metal":return new v({color:a,map:r,vertexColors:s,metalness:1,roughness:.22});case"gold":return new v({color:new f("#ffcc55"),metalness:1,roughness:.18});case"glow":return new v({color:a,map:r,vertexColors:s,emissive:a,emissiveIntensity:2.4,roughness:.5});case"lava":return new v({color:new f("#3a1a12"),emissive:new f("#ff5a1f"),emissiveIntensity:2,roughness:.9});case"plush":return new x({color:a,map:r,vertexColors:s,roughness:1,sheen:1,sheenRoughness:.6,sheenColor:a.clone().lerp(new f("#ffffff"),.5)});default:return null}}function B(t,e){return e.customProgramCacheKey=()=>`larch-ink-${t}`,e.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <dithering_fragment>",`#include <dithering_fragment>
      {
        // How lit this spot is compared with its own colour (so a dark fur and a pale one hatch alike).
        float base = max(dot(diffuseColor.rgb, vec3(.299, .587, .114)), .04);
        float light = clamp(dot(gl_FragColor.rgb, vec3(.299, .587, .114)) / base * .8, 0., 1.);
        vec3 paper = mix(vec3(1.), diffuseColor.rgb, .72);
        vec3 inkColor = diffuseColor.rgb * .26 + vec3(.04, .035, .06);
        vec2 p = gl_FragCoord.xy;
        float ink = 0.;
        ${t==="sketch"?`
        float a = abs(fract((p.x + p.y) / 7.) - .5), b = abs(fract((p.x - p.y) / 7.) - .5), c = abs(fract(p.y / 5.) - .5);
        if (light < .9) ink = max(ink, 1. - smoothstep(.06, .14, a));
        if (light < .66) ink = max(ink, 1. - smoothstep(.06, .14, b));
        if (light < .42) ink = max(ink, 1. - smoothstep(.08, .16, c));
        if (light < .2) ink = max(ink, .85);`:`
        vec2 cell = p / 6.;
        cell = mat2(.7071, -.7071, .7071, .7071) * cell;
        float d = length(fract(cell) - .5);
        float radius = sqrt(max(0., .95 - light)) * .64;
        ink = 1. - smoothstep(radius - .06, radius + .06, d);
        paper = mix(diffuseColor.rgb, vec3(1.), .12);`}
        gl_FragColor.rgb = mix(paper, inkColor, ink);
      }`)},e}function R(t){return .3+.7*Math.min(1,Math.max(0,t.physics?.wobble??.3))}const M=new Map;function Pe(t,e={}){const n=t.clay??{prims:[]},a=e.key??`model:${Je(n)}`,r=se(n,a,{resolution:64,skin:!0,...e});if(!t.deform?.length)return r;const s=`${a}:${e.resolution??64}:${e.skin===!1?0:1}${ce(t.deform)}`;let o=M.get(s);return o||(o=ue(r,t.deform),M.size>40&&M.delete(M.keys().next().value),M.set(s,o)),o}function Ve(t,e){const n=t.find(r=>r.name===e?.idle)??t.find(r=>/idle|stand|breath|待機/i.test(r.name));if(n)return n;const a=t[0];return a&&(a.name===e?.walk||/walk|march|run/i.test(a.name))?void 0:a}async function qe(t,e){if(t.source==="clay"&&t.clay){const n=Pe(t);if(t.material.preset==="clay"||t.material.preset==="original"||t.material.preset==="scene"){const s=new J(t.clay,n,e.clay,e.outline);return s.group.userData.figure=s,s.group}const a=new J(t.clay,n,e.clay),r=z(t.material.preset,{vertexColors:!0},t.material.color);return r&&(a.mesh.material=r),a.group.userData.figure=a,t.material.preset==="jelly"&&j(a.group,R(t)),a.group}if(t.source==="file"&&t.file&&e.file){const n=await e.file(t.file.url);if(!n)throw new Error("model file missing");const a=await Oe(n,t.file.format,t.file.mtlUrl&&e.file?await e.file(t.file.mtlUrl):null),r=a.object;let s=a.clips;const o=Te(r,t.fit?.height??1.2,t.fit?.offset,t.fit?.rotY);if(t.deform?.length&&me(o,t.deform),t.material.preset==="scene"){const i=new Map;o.traverse(c=>{const u=c;if(!u.isMesh)return;const m=l=>{const w=i.get(l);if(w)return w;const h=l,y=pe(e.env,{color:h.color,map:h.map,normalMap:h.normalMap,emissive:h.emissiveMap?void 0:h.emissive?.clone().multiplyScalar(h.emissiveIntensity??1),vertexColors:!!u.geometry.getAttribute("color")&&!!h.vertexColors,doubleSided:h.side===C,alphaTest:h.alphaTest||(h.transparent?.35:.4)},t.material.color);return i.set(l,y),y};u.material=Array.isArray(u.material)?u.material.map(m):m(u.material)})}else t.material.preset!=="original"&&t.material.preset!=="standard"&&o.traverse(i=>{const c=i;if(!c.isMesh)return;const u=Array.isArray(c.material)?c.material[0]:c.material,m=z(t.material.preset,{color:u?.color,map:u?.map,vertexColors:!!c.geometry.getAttribute("color")},t.material.color);m&&(c.material=m)});if(o.traverse(i=>{const c=i;c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0)}),t.material.preset==="jelly"&&j(o,R(t)),t.hero?(ee(o),te(o,t.hero,t.heroLook),s=ae(s,r),o.userData.hero=t.hero):t.toon&&re(o),s.length){const i=new U(o);o.userData.mixer=i,o.userData.clips=s;const c=Ve(s,t.anims);c&&i.clipAction(c).play()}return o}return new k}function Te(t,e,n=[0,0,0],a=0){const r=new k,s=new k;s.add(t),r.add(s),t.updateMatrixWorld(!0);const i=new O().setFromObject(t).getSize(new p),c=i.y>1e-6?e/i.y:1;t.scale.multiplyScalar(c),t.updateMatrixWorld(!0);const u=new O().setFromObject(t),m=u.getCenter(new p);return t.position.x-=m.x,t.position.z-=m.z,t.position.y-=u.min.y,s.position.set(n[0],n[1],n[2]),s.rotation.y=a,r.userData.fitScale=c,r}async function Oe(t,e,n=null){const a=()=>new TextDecoder().decode(t);switch(e){case"glb":case"gltf":{const{GLTFLoader:r}=await d(async()=>{const{GLTFLoader:m}=await import("./three-engine-DgueuEcG.js").then(l=>l.bb);return{GLTFLoader:m}},[]),{DRACOLoader:s}=await d(async()=>{const{DRACOLoader:m}=await import("./three-engine-DgueuEcG.js").then(l=>l.bc);return{DRACOLoader:m}},[]),{MeshoptDecoder:o}=await d(async()=>{const{MeshoptDecoder:m}=await import("./three-engine-DgueuEcG.js").then(l=>l.bd);return{MeshoptDecoder:m}},[]),i=new r,c=new s;c.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/"),i.setDRACOLoader(c),i.setMeshoptDecoder(o),await Ne(i);const u=await i.parseAsync(t,"");return{object:u.scene,clips:u.animations}}case"fbx":{const{FBXLoader:r}=await d(async()=>{const{FBXLoader:o}=await import("./three-engine-DgueuEcG.js").then(i=>i.be);return{FBXLoader:o}},[]),s=new r().parse(t,"");return{object:s,clips:s.animations||[]}}case"obj":{const{OBJLoader:r}=await d(async()=>{const{OBJLoader:o}=await import("./three-engine-DgueuEcG.js").then(i=>i.bf);return{OBJLoader:o}},[]),s=new r;if(n){const{MTLLoader:o}=await d(async()=>{const{MTLLoader:c}=await import("./three-engine-DgueuEcG.js").then(u=>u.bg);return{MTLLoader:c}},[]),i=new o().parse(new TextDecoder().decode(n),"");i.preload(),s.setMaterials(i)}return{object:s.parse(a()),clips:[]}}case"stl":{const{STLLoader:r}=await d(async()=>{const{STLLoader:o}=await import("./three-engine-DgueuEcG.js").then(i=>i.bh);return{STLLoader:o}},[]),s=new r().parse(t);return s.computeVertexNormals(),{object:new T(s,new v({color:"#d8d2c8",roughness:.7,vertexColors:!!s.getAttribute("color")})),clips:[]}}case"ply":{const{PLYLoader:r}=await d(async()=>{const{PLYLoader:o}=await import("./three-engine-DgueuEcG.js").then(i=>i.bi);return{PLYLoader:o}},[]),s=new r().parse(t);return s.computeVertexNormals(),{object:new T(s,new v({color:"#ffffff",roughness:.7,vertexColors:!!s.getAttribute("color")})),clips:[]}}case"dae":{const{ColladaLoader:r}=await d(async()=>{const{ColladaLoader:o}=await import("./three-engine-DgueuEcG.js").then(i=>i.bj);return{ColladaLoader:o}},[]),s=new r().parse(a(),"");return{object:s?.scene??new k,clips:s?.scene?.animations||[]}}case"3mf":{const{ThreeMFLoader:r}=await d(async()=>{const{ThreeMFLoader:s}=await import("./three-engine-DgueuEcG.js").then(o=>o.bk);return{ThreeMFLoader:s}},[]);return{object:new r().parse(t),clips:[]}}case"usdz":{const{USDZLoader:r}=await d(async()=>{const{USDZLoader:s}=await import("./three-engine-DgueuEcG.js").then(o=>o.bl);return{USDZLoader:s}},[]);return{object:new r().parse(t),clips:[]}}}}function Ie(t){const e=t.toLowerCase().split(".").pop()||"";return F.includes(e)?e:null}function Je(t){const e=JSON.stringify(t.prims)+JSON.stringify(t.splats||[]);let n=2166136261;for(let a=0;a<e.length;a++)n^=e.charCodeAt(a),n=Math.imul(n,16777619);return(n>>>0).toString(36)+e.length.toString(36)}async function Ne(t){const{TextureLoader:e}=await d(async()=>{const{TextureLoader:n}=await import("./three-engine-DgueuEcG.js").then(a=>a.aZ);return{TextureLoader:n}},[]);t.register(n=>{const a=n;return a.textureLoader=new e(a.options.manager),{name:"larch-image-textures"}})}export{oe as M,We as a,Oe as b,z as c,me as d,Ee as e,Te as f,ue as g,j as h,qe as i,R as j,Ve as k,Le as l,_e as m,Se as n,Ie as o,Fe as p,Ne as q,Pe as r};
