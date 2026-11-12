import{G as f,f as v,V as m,d,s as g,x as w,ac as p,c as x,a as b,b as c}from"./three-engine-DBk0tA82.js";import{q as y}from"./modelDoc-B_YKlzsE.js";import{V as z}from"./post-CUO98Vzi.js";const M=9.6,F=2.1,C=`
uniform float uTime;
uniform float uLength;
uniform float uRadius;
uniform float uGrow;
uniform float uCore;
varying vec2 vUv;
varying float vViewZ;
varying float vFacing;
void main() {
  float z = uv.y, a = uv.x * 6.2831853;
  float len = uLength * max(uGrow, .001);
  // Narrow at the jaws, flaring fast, then billowing: bulges roll down it.
  float r = uRadius * (.07 + .93 * pow(z, .62));
  r *= 1. + .22 * z * sin(a * 3. + uTime * 17. - z * 11.) + .14 * z * sin(a * 5. - uTime * 11. + z * 7.);
  r *= mix(1., .42, uCore);
  vec3 p = vec3(cos(a) * r, sin(a) * r, z * len);
  // It wavers, and the far end lifts a little (hot air rises).
  p.x += sin(uTime * 8.3 + z * 5.) * .1 * z * uRadius;
  p.y += sin(uTime * 7.1 + z * 4. + 1.3) * .1 * z * uRadius + z * z * len * .07;
  vec4 wp = modelMatrix * vec4(p, 1.);
  vec3 n = normalize(mat3(modelMatrix) * vec3(cos(a), sin(a), -.45));
  vFacing = abs(dot(n, normalize(cameraPosition - wp.xyz)));
  vUv = vec2(uv.x, z);
  vec4 mv = viewMatrix * wp;
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}`,T=`
${y}
uniform float uTime;
uniform float uNight;
uniform float uCut;
uniform float uCore;
uniform float uIntensity;
uniform sampler2D tWorld;
uniform vec2 uResolution;
varying vec2 vUv;
varying float vViewZ;
varying float vFacing;
void main() {
  float z = vUv.y, a = vUv.x * 6.2831853;
  // Fire streaming down the jet: churning noise (round the tube, so it has no seam) pushed about by a slower swirl,
  // pulled fast along its length.
  vec3 q = vec3(cos(a) * 2., sin(a) * 2., z * 7. - uTime * 9.);
  float swirl = l3dFbm3(q * .55 + vec3(0., 0., uTime * 1.3));
  float n = l3dFbm3(q + swirl * 1.8);
  // Solid near the jaws, breaking into licking tongues toward the end, feathered at its silhouette; it fades in
  // from the jaws (and burns away from them when the breath stops).
  float edge = smoothstep(.04, .5, vFacing);
  float start = smoothstep(uCut, uCut + .08, z) * smoothstep(0., .04, z);
  float body = smoothstep(.3 + z * .28, .46 + z * .22, n + vFacing * .28 + (1. - z) * .22 - uCore * .05);
  float dens = edge * start * body * (1. - smoothstep(.7, 1., z)) * uIntensity;
  if (dens < .004) discard;
  // Behind the world it's hidden; where it meets it (the ground it scorches), soft.
  float world = texture(tWorld, gl_FragCoord.xy / uResolution).a;
  if (world < vViewZ) discard;
  dens *= clamp((world - vViewZ) * 1.6, 0., 1.) * smoothstep(.1, .5, vViewZ);
  // Its heat: white-hot at the jaws and in the core, yellow and orange in the thick of it, red to a dark smoky edge
  // where the tongues thin out.
  float heat = clamp((1. - z) * .75 + (n - .5) * .9 + vFacing * .18 + uCore * .45, 0., 1.);
  vec3 col = mix(vec3(.22, .04, .03), vec3(.92, .16, .03), smoothstep(.05, .3, heat));
  col = mix(col, vec3(1., .46, .06), smoothstep(.3, .55, heat));
  col = mix(col, vec3(1., .8, .3), smoothstep(.55, .8, heat));
  col = mix(col, vec3(1., .97, .86), smoothstep(.85, 1., heat));
  // The flame itself is laid over what's behind it (strong colour even against a bright sky); the core adds its glow.
  float bright = (.9 + heat * heat * 2.2) * (1. + uNight * .35);
  gl_FragColor = uCore > .5 ? vec4(col * bright, dens * .7) : vec4(col * bright, dens * mix(.55, .95, smoothstep(.1, .5, heat)));
}`;function R(u=28,e=44){const l=[],a=[],n=[];for(let r=0;r<=e;r++)for(let t=0;t<=u;t++){const i=t/u*Math.PI*2,s=r/e;l.push(Math.cos(i)*s,Math.sin(i)*s,s),a.push(t/u,s)}for(let r=0;r<e;r++)for(let t=0;t<u;t++){const i=r*(u+1)+t,s=i+u+1;n.push(i,s,i+1,i+1,s,s+1)}const o=new b;return o.setAttribute("position",new c(new Float32Array(l),3)),o.setAttribute("uv",new c(new Float32Array(a),2)),o.setIndex(n),o}class G{group=new f;geometry=R();materials=[];grow=0;cut=0;basis=new v;x=new m;y=new m;constructor(e,l){for(const a of[0,1]){const n=new d({uniforms:{uTime:e.uTime,uNight:e.uNight,tWorld:{value:l.texture},uResolution:{value:l.resolution},uLength:{value:M*(a?.62:1)},uRadius:{value:F},uGrow:{value:0},uCut:{value:0},uCore:{value:a},uIntensity:{value:1}},vertexShader:C,fragmentShader:T,transparent:!0,depthWrite:!1,depthTest:!0,blending:a?w:p,side:g}),o=new x(this.geometry,n);o.frustumCulled=!1,o.layers.set(z),o.renderOrder=21+a,this.group.add(o),this.materials.push(n)}this.group.visible=!1}get showing(){return this.group.visible}update(e,l,a,n,o,r=1){if(l?(this.grow=Math.min(1,this.grow+e/.16),this.cut=0):this.grow>0&&(this.cut=Math.min(1,this.cut+e/.24),this.cut>=1&&(this.grow=0)),this.group.visible=this.grow>0,!this.group.visible)return;const t=n.lengthSq()>1e-6?n.clone().normalize():new m(0,0,1);this.x.set(0,1,0).cross(t),this.x.lengthSq()<1e-6&&this.x.set(1,0,0),this.x.normalize(),this.y.crossVectors(t,this.x),this.basis.makeBasis(this.x,this.y,t),this.group.quaternion.setFromRotationMatrix(this.basis),this.group.position.copy(a),this.group.scale.setScalar(Math.max(.2,o));const i=1-Math.max(0,Math.min(1,r)),s=(.9+Math.random()*.1)*(1-i*Math.random()*.7);for(const h of this.materials)h.uniforms.uGrow.value=this.grow*(1-i*(.45+Math.random()*.2)),h.uniforms.uCut.value=this.cut,h.uniforms.uIntensity.value=s*(1-this.cut*.5)}hide(){this.grow=0,this.cut=0,this.group.visible=!1}dispose(){this.group.removeFromParent(),this.geometry.dispose();for(const e of this.materials)e.dispose()}}export{G as B,M as a};
