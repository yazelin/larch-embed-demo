import{aZ as J}from"./three-engine-DgueuEcG.js";function K(){return`
 float grassHash(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
 vec2 windAt(vec2 root, float phase) {
   float wave = sin(dot(root, vec2(1.1, .7)) - uTime * 1.45);
   float gust = .5 + .5 * sin(dot(root, vec2(.48, -.31)) - uTime * .63);
   float flutter = sin(uTime * 2.6 + phase + root.x * 3.0) * .025;
   return vec2(.12 + wave * .11 + gust * .13, .035 + wave * .045 + flutter);
 }
`}function Q(){return`
 float brushStreak(float h, float seed) {
   return sin(h * 23.0 + sin(h * 9.0 + seed * 11.0) * 2.2 + seed * 31.0);
 }
`}function G(e,r,p=!1){return new e.ShaderMaterial({name:"Hand-painted vegetation",side:e.DoubleSide,transparent:!1,depthTest:!0,depthWrite:!0,uniforms:{uTime:{value:0},uPrimary:{value:new e.Color(r[0])},uSecondary:{value:new e.Color(r[1])},uAccent:{value:new e.Color(r[2])},uPaint:{value:p?0:1},uBrush:{value:1}},vertexShader:`attribute vec4 brushData,leafMotion; attribute vec2 plantRoot;
 uniform float uTime; varying vec2 vUv; varying vec4 vBrush; varying vec3 vLocal,vNormal; varying float vLeafVisibility;
 ${K()}
 vec3 leafTurn(vec3 p,float roll,float pitch,float yaw){
  p=vec3(cos(roll)*p.x-sin(roll)*p.y,sin(roll)*p.x+cos(roll)*p.y,p.z);
  p=vec3(p.x,cos(pitch)*p.y-sin(pitch)*p.z,sin(pitch)*p.y+cos(pitch)*p.z);
  return vec3(cos(yaw)*p.x+sin(yaw)*p.z,p.y,-sin(yaw)*p.x+cos(yaw)*p.z);
 }
 void main(){vUv=uv;vBrush=brushData;vLocal=position;vNormal=normalize(mat3(modelMatrix)*normal);vLeafVisibility=1.0;
 vec3 p=position;
 if(brushData.x>8.5){
  float seed=brushData.y,duration=8.0+4.0*fract(seed*13.37),cycle=fract(uTime/duration+leafMotion.w);
  float flight=min(cycle/.78,1.0),settle=smoothstep(.68,.78,cycle),angle=seed*6.283185;
  float roll=mix(sin(flight*10.0+angle)*.65,0.0,settle),pitch=mix(flight*9.0+angle,1.5707963,settle),yaw=angle+flight*(2.0+seed*3.0);
  vec3 corner=position-leafMotion.xyz,center=leafMotion.xyz;
  float reach=.25+.4*fract(seed*17.7),sway=.14*sin(flight*12.56637+angle)*sin(flight*3.141593);
  center.xz+=vec2(cos(angle),sin(angle))*reach*flight+vec2(-sin(angle),cos(angle))*sway;
  float verticalExtent=abs(cos(pitch))*(abs(sin(roll)*corner.x)+abs(cos(roll)*corner.y));
  center.y=.012+leafMotion.y*(1.0-flight)+verticalExtent+.035*sin(flight*12.56637+angle)*sin(flight*3.141593);
  p=center+leafTurn(corner,roll,pitch,yaw);vNormal=normalize(mat3(modelMatrix)*leafTurn(normal,roll,pitch,yaw));
  vLeafVisibility=smoothstep(0.0,.045,cycle)*(1.0-smoothstep(.86,.98,cycle));
 }else p.xz+=windAt(plantRoot,plantRoot.x*3.0+plantRoot.y)*brushData.w*.38;
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,fragmentShader:`uniform vec3 uPrimary,uSecondary,uAccent;uniform float uPaint,uBrush;
 varying vec2 vUv; varying vec4 vBrush; varying vec3 vLocal,vNormal; varying float vLeafVisibility;
 ${Q()}
 void main(){float kind=vBrush.x,seed=vBrush.y,x=vUv.x*2.0-1.0,h=vUv.y;
 float stroke=brushStreak(h,seed),vein=0.0,leafEdge=0.0;vec3 base;
 if(kind>8.5){
   // Surface-anchored brush grains remove pixels, never introducing transparent sorting.
   vec2 grainCell=floor(vUv*vec2(22.0,28.0));
   float dissolve=fract(sin(dot(grainCell,vec2(127.1,311.7))+seed*17.0)*43758.5453)*.7+h*.3;
   if(dissolve>=vLeafVisibility)discard;
 }
 if(kind>8.5&&kind<9.5){
   float y=(h-.5)*2.0,width=max(.035,1.0-y*y),edge=abs(x)/width,rim=.91+.065*sin(y*33.0+seed*19.0);
   if(abs(y)>.99||edge>rim)discard;
   vein=(1.0-smoothstep(.025,.075,abs(x)))*.6+step(.94,cos((y-abs(x)*.6)*24.0))*.25;
   leafEdge=smoothstep(.72,.98,edge);base=mix(uPrimary,uAccent,smoothstep(.48,.92,vBrush.z)*.84);
 }else if(kind>7.5){
   // A comb of tapered needles, with an unbroken central twig. Opaque cutouts keep depth reliable.
   float reach=.88*pow(1.0-h,.65)+.055,side=abs(x),row=fract((h-side*.26)*6.0+seed*.7);
   float needle=abs(row-.5),needleWidth=.34*(1.0-side*.48);
   if(side>reach||side>.065&&needle>needleWidth)discard;
   vein=(1.0-smoothstep(.02,.12,needle))*.45;leafEdge=smoothstep(.6,.95,side/reach);
   base=mix(uPrimary,uAccent,smoothstep(.63,.90,vBrush.z)*.6+h*.12);
 }else if(kind>6.5){
   // Three pointed, finely notched leaves per spatial brush stroke; no solid canopy underneath.
   vec2 q=vec2(x,(h-.5)*2.0);float closest=10.0;vec2 leaf=vec2(0.0);
   for(int i=0;i<3;i++){
     float side=float(i)-1.0;vec2 p=q-vec2(side*.39,i==1?.27:-.26);
     float angle=side*.56,c=cos(angle),s=sin(angle);p=mat2(c,-s,s,c)*p;p/=vec2(i==1?.40:.33,i==1?.67:.51);
     float d=abs(p.x)/max(.04,1.0-p.y*p.y);
     if(d<closest&&abs(p.y)<1.0){closest=d;leaf=p;}
   }
   float rim=.93+.065*sin(leaf.y*36.0+seed*19.0);
   if(closest>rim)discard;
   vein=(1.0-smoothstep(.025,.075,abs(leaf.x)))*.6;
   vein+=step(.94,cos((leaf.y-abs(leaf.x)*.6)*24.0))*.25;
   leafEdge=smoothstep(.72,.98,closest);
   base=mix(uPrimary,uAccent,smoothstep(.48,.92,vBrush.z)*.84);
 }else if(kind>.5&&kind<1.5){
   vec2 q=vec2(x,(h-.5)*2.0);float edge=.80+sin(q.y*13.0+seed*41.0)*.09+sin(q.x*19.0+seed*23.0)*.055;
   float shape=pow(abs(q.x),1.6)+pow(abs(q.y),1.7);
   if(shape>edge||shape>.45&&sin(q.y*25.0+q.x*17.0+seed*50.0)>.94)discard;
   base=mix(uPrimary,uAccent,smoothstep(.58,.86,vBrush.z)*.80);
 }else if((kind>1.5&&kind<2.5)||kind>5.5){
   float tip=1.0-smoothstep(.70,1.03,h),rim=.89+stroke*.028;
   if(abs(x+.12*sin(h*5.0+seed*9.0))>rim*tip)discard;
   if(abs(x)>rim*tip-step(.94,sin(h*21.0+seed*47.0))*.065&&h>.2)discard;
   base=kind>5.5?uSecondary*mix(.75,1.15,h):mix(uSecondary,uPrimary,smoothstep(.1,.75,h));base=mix(base,uAccent,step(.78,vBrush.z)*h*.55);
 }else if(kind>2.5&&kind<3.5){
   if(x*x+pow(abs((h-.46)/.57),4.0)>.74+.09*sin(h*19.0+seed*17.0))discard;
   base=mix(uPrimary,uAccent,smoothstep(.58,1.0,h)*.18);
 }else if(kind>3.5&&kind<4.5){if(length(vec2(x,(h-.5)*2.0))>.86)discard;base=uAccent;
 }else{base=uSecondary;}
 float light=.58+.42*max(0.0,dot(normalize(vNormal),normalize(vec3(-.5,1.0,.6))));
 float tone=mix(.63,1.12,smoothstep(.1,.9,vBrush.z));
 float bands=mix(.73,1.12,step(.53,light+vBrush.z*.15));
 float brush=step(.64,sin(h*10.0+seed*37.0+x*2.3));
 float grain=sin(vLocal.x*173.0+sin(vLocal.z*109.0))*sin(vLocal.y*149.0+seed*7.0);
 vec3 paint=base*tone*bands*(1.0+(brush-.5)*.12*uBrush+grain*.035*uBrush);
 if(kind>6.5)paint*=1.0+(vein*.18+leafEdge*.12)*uBrush;
 if(kind<.5){
   float around=vUv.x*6.28318,grooves=sin(around*9.0+sin(vLocal.y*5.0+around*2.0)*.6);
   float cracks=smoothstep(.77,.96,grooves),plates=step(.88,sin(vLocal.y*21.0+around*2.0));
   float knot=length(vec2(sin(around*1.5)*2.8,(vLocal.y-1.05)*6.0));
   float rings=(1.0-smoothstep(.5,1.8,knot))*sin(knot*19.0);
   paint=base*(.64+.36*light)*(1.0+(-cracks*.30-plates*.10+rings*.12+grain*.055)*uBrush);
 }
 gl_FragColor=vec4(mix(base*light,paint,uPaint),1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`})}function X(e){let r=0;return e.traverse(p=>{if(!p.isMesh||p.userData.previewHelper||p.userData.objectEffect)return;const u=p.geometry,h=u.index?.count??u.attributes.position.count,g=Math.min(h,u.drawRange.start),M=Math.min(h-g,u.drawRange.count);r+=Math.floor(M/3)*(p.isInstancedMesh?p.count:1)}),r}function Y(e,r,p,u={}){const h=new e.Group;h.name=r.model,h.userData={units:"meters",origin:"base-center",shader:"00-painterly-vegetation",plant:!0};const g={primary:r.colors[0],secondary:r.colors[1],accent:r.colors[2]},M=[],L=[],D=[],k=[],z=[],S=[],A=new e.Box3,U=t=>{const o=Math.sin(t*127.1+311.7)*43758.5453;return o-Math.floor(o)};let V=0,y=0,q=!1;const E=(t,o,s,i,x,m,f,a,n=[0,0,0,0])=>{M.push(...t),L.push(...o),D.push(...s),k.push(i,x,m,f),z.push(...a),S.push(...n)};function I(t,o,s,i,x,m,f,a=[0,0],n){const d=new e.Vector3(Math.cos(s),0,Math.sin(s)),c=n??[-Math.sin(s),.15,Math.cos(s)];for(let l=0;l<t.length-1;l++)for(const[b,w]of[[l,-1],[l,1],[l+1,-1],[l,1],[l+1,1],[l+1,-1]]){const B=new e.Vector3(...t[b]).addScaledVector(d,w*o[b]);E(B.toArray(),c,[(w+1)/2,b/(t.length-1)],i,x,m,f[b],a)}V++}function F(t,o,s,i,x,m,f,a,n=[0,0],d){const c=new e.Vector3(Math.cos(s),0,Math.sin(s)),l=new e.Vector3(-Math.sin(s)*Math.sin(i),Math.cos(i),Math.cos(s)*Math.sin(i)),b=d??new e.Vector3().crossVectors(c,l).toArray();for(const[w,B]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]]){const R=new e.Vector3(...t).addScaledVector(c,w*o[0]).addScaledVector(l,B*o[1]);E(R.toArray(),b,[(w+1)/2,(B+1)/2],x,m,f,a,n)}V++}function H(t,o,s=10,i=7,x=3.3){const m=new e.CatmullRomCurve3(t.map(a=>new e.Vector3(...a))),f=[];for(let a=0;a<=s;a++){const n=a/s,d=m.getPoint(n),c=m.getTangent(n),l=new e.Vector3().crossVectors(c,new e.Vector3(1,.03,0)).normalize(),b=new e.Vector3().crossVectors(c,l),w=n*(o.length-1),B=Math.min(o.length-2,Math.floor(w)),R=e.MathUtils.lerp(o[B],o[B+1],w-B);f.push(Array.from({length:i},(ae,N)=>{const O=l.clone().multiplyScalar(Math.cos(N*2*Math.PI/i)).addScaledVector(b,Math.sin(N*2*Math.PI/i));return{p:d.clone().addScaledVector(O,R).toArray(),n:O.toArray()}}))}for(let a=0;a<s;a++)for(let n=0;n<i;n++)for(const[d,c]of[[a,n],[a+1,n],[a,(n+1)%i],[a,(n+1)%i],[a+1,n],[a+1,(n+1)%i]]){const l=f[d][c],b=n===i-1&&c===0?1:c/i;E(l.p,l.n,[b,d/s],0,0,.5,Math.pow(Math.max(0,l.p[1])/x,2),[0,0])}for(const a of[0,s]){const n=m.getPoint(a/s).toArray(),d=[0,a===0?-1:1,0];for(let c=0;c<i;c++)for(const l of[n,f[a][c].p,f[a][(c+1)%i].p])E(l,d,[.5,.5],0,0,.5,(Math.max(0,l[1])/x)**2,[0,0])}V++}function W(t,o,s,i,x=!1){for(const[d,c]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]])E([t[0]+d*o[0],t[1]+c*o[1],t[2]],[0,0,1],[(d+1)/2,(c+1)/2],x?10:9,s,.48+s*.35,0,[0,0],[...t,i]);const m=.25+.4*(s*17.7%1),f=s*Math.PI*2,a=[t[0]+Math.cos(f)*m,t[2]+Math.sin(f)*m],n=Math.hypot(...o)+.15;A.expandByPoint(new e.Vector3(Math.min(t[0],a[0])-n,0,Math.min(t[2],a[1])-n)),A.expandByPoint(new e.Vector3(Math.max(t[0],a[0])+n,t[1]+Math.hypot(...o)*2+.04,Math.max(t[2],a[1])+n)),V++}p({T:e,hash:U,stamp:F,strip:I,branch:H,fallingLeaf:W});const v=new e.BufferGeometry;for(const[t,o,s]of[["position",M,3],["normal",L,3],["uv",D,2],["brushData",k,4],["plantRoot",z,2],["leafMotion",S,4]])v.setAttribute(t,new e.Float32BufferAttribute(o,s));v.computeBoundingBox(),v.computeBoundingSphere(),v.boundingBox.expandByVector(new e.Vector3(.16,.02,.1)),v.boundingSphere.radius+=.2;let j;A.isEmpty()||(v.boundingBox.union(A),v.boundingBox.getBoundingSphere(v.boundingSphere),j=v.boundingBox.clone());const P=G(e,r.colors),_=new e.Mesh(v,P);_.name=r.model+"-brushes",h.add(_),h.userData.modeledParts=V;const $=Object.freeze({triangles:X(h)});function C(t={}){if(!q){for(const o of["primary","secondary","accent"])/^#[0-9a-f]{6}$/i.test(t[o])&&(g[o]=t[o]);["Primary","Secondary","Accent"].forEach(o=>P.uniforms["u"+o].value.set(g[o.toLowerCase()]))}}C(u);const Z={...g};return{group:h,materials:[P],stats:$,animationBounds:j,setOptions:C,update(t){q||(y+=Math.max(0,Math.min(.1,Number.isFinite(t)?t:0)),P.uniforms.uTime.value=y)},reset(){y=0,P.uniforms.uTime.value=0,C(Z)},createBaseline(){return[G(e,r.colors,!0)]},dispose(){q||(q=!0,v.dispose(),P.dispose(),h.removeFromParent(),h.clear())},get settings(){return{...g}},get elapsed(){return y},get disposed(){return q}}}function T(e){const{hash:r,strip:p}=e;for(let u=0;u<145;u++){const h=u*2.39996,g=Math.sqrt(r(u+97))*.55,M=[Math.cos(h)*g,Math.sin(h)*g],L=r(u+42),D=.3+r(u+921)*.65*(1-g*.7),k=.04+r(u+45)*.055,z=.13+L*.18,S=r(u+6)*6.28,A=Array.from({length:4},(U,V)=>{const y=V/3;return[M[0]+Math.cos(S)*z*y*y,D*y,M[1]+Math.sin(S)*z*y*y]});p(A,[k*.28,k,k*.8,k*.18],S+Math.PI/2,2,L,.25+r(u+142)*.65,[0,1/9,4/9,1],M)}}const ee={model:"grass-clump",colors:["#8fa66c","#637e67","#c6ba79"]},te={primary:"#8fa66c",secondary:"#637e67",accent:"#c6ba79"};function ne(e={}){return Y(J,ee,T,{...te,...e})}export{ne as createGameObject,G as createVegetationMaterial,ne as default,te as defaultOptions};
