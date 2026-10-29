import{aZ as X}from"./three-engine-DgueuEcG.js";function J(){return`
 float grassHash(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
 vec2 windAt(vec2 root, float phase) {
   float wave = sin(dot(root, vec2(1.1, .7)) - uTime * 1.45);
   float gust = .5 + .5 * sin(dot(root, vec2(.48, -.31)) - uTime * .63);
   float flutter = sin(uTime * 2.6 + phase + root.x * 3.0) * .025;
   return vec2(.12 + wave * .11 + gust * .13, .035 + wave * .045 + flutter);
 }
`}function K(){return`
 float brushStreak(float h, float seed) {
   return sin(h * 23.0 + sin(h * 9.0 + seed * 11.0) * 2.2 + seed * 31.0);
 }
`}function H(e,i,p=!1){return new e.ShaderMaterial({name:"Hand-painted vegetation",side:e.DoubleSide,transparent:!1,depthTest:!0,depthWrite:!0,uniforms:{uTime:{value:0},uPrimary:{value:new e.Color(i[0])},uSecondary:{value:new e.Color(i[1])},uAccent:{value:new e.Color(i[2])},uPaint:{value:p?0:1},uBrush:{value:1}},vertexShader:`attribute vec4 brushData,leafMotion; attribute vec2 plantRoot;
 uniform float uTime; varying vec2 vUv; varying vec4 vBrush; varying vec3 vLocal,vNormal; varying float vLeafVisibility;
 ${J()}
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
 ${K()}
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
 }`})}function Q(e){let i=0;return e.traverse(p=>{if(!p.isMesh||p.userData.previewHelper||p.userData.objectEffect)return;const V=p.geometry,u=V.index?.count??V.attributes.position.count,m=Math.min(u,V.drawRange.start),L=Math.min(u-m,V.drawRange.count);i+=Math.floor(L/3)*(p.isInstancedMesh?p.count:1)}),i}function Y(e,i,p,V={}){const u=new e.Group;u.name=i.model,u.userData={units:"meters",origin:"base-center",shader:"00-painterly-vegetation",plant:!0};const m={primary:i.colors[0],secondary:i.colors[1],accent:i.colors[2]},L=[],x=[],P=[],D=[],j=[],C=[],z=new e.Box3,M=t=>{const o=Math.sin(t*127.1+311.7)*43758.5453;return o-Math.floor(o)};let d=0,h=0,r=!1;const v=(t,o,s,l,B,b,g,a,n=[0,0,0,0])=>{L.push(...t),x.push(...o),P.push(...s),D.push(l,B,b,g),j.push(...a),C.push(...n)};function q(t,o,s,l,B,b,g,a=[0,0],n){const y=new e.Vector3(Math.cos(s),0,Math.sin(s)),f=n??[-Math.sin(s),.15,Math.cos(s)];for(let c=0;c<t.length-1;c++)for(const[k,S]of[[c,-1],[c,1],[c+1,-1],[c,1],[c+1,1],[c+1,-1]]){const A=new e.Vector3(...t[k]).addScaledVector(y,S*o[k]);v(A.toArray(),f,[(S+1)/2,k/(t.length-1)],l,B,b,g[k],a)}d++}function R(t,o,s,l,B,b,g,a,n=[0,0],y){const f=new e.Vector3(Math.cos(s),0,Math.sin(s)),c=new e.Vector3(-Math.sin(s)*Math.sin(l),Math.cos(l),Math.cos(s)*Math.sin(l)),k=y??new e.Vector3().crossVectors(f,c).toArray();for(const[S,A]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]]){const _=new e.Vector3(...t).addScaledVector(f,S*o[0]).addScaledVector(c,A*o[1]);v(_.toArray(),k,[(S+1)/2,(A+1)/2],B,b,g,a,n)}d++}function I(t,o,s=10,l=7,B=3.3){const b=new e.CatmullRomCurve3(t.map(a=>new e.Vector3(...a))),g=[];for(let a=0;a<=s;a++){const n=a/s,y=b.getPoint(n),f=b.getTangent(n),c=new e.Vector3().crossVectors(f,new e.Vector3(1,.03,0)).normalize(),k=new e.Vector3().crossVectors(f,c),S=n*(o.length-1),A=Math.min(o.length-2,Math.floor(S)),_=e.MathUtils.lerp(o[A],o[A+1],S-A);g.push(Array.from({length:l},(ae,G)=>{const F=c.clone().multiplyScalar(Math.cos(G*2*Math.PI/l)).addScaledVector(k,Math.sin(G*2*Math.PI/l));return{p:y.clone().addScaledVector(F,_).toArray(),n:F.toArray()}}))}for(let a=0;a<s;a++)for(let n=0;n<l;n++)for(const[y,f]of[[a,n],[a+1,n],[a,(n+1)%l],[a,(n+1)%l],[a+1,n],[a+1,(n+1)%l]]){const c=g[y][f],k=n===l-1&&f===0?1:f/l;v(c.p,c.n,[k,y/s],0,0,.5,Math.pow(Math.max(0,c.p[1])/B,2),[0,0])}for(const a of[0,s]){const n=b.getPoint(a/s).toArray(),y=[0,a===0?-1:1,0];for(let f=0;f<l;f++)for(const c of[n,g[a][f].p,g[a][(f+1)%l].p])v(c,y,[.5,.5],0,0,.5,(Math.max(0,c[1])/B)**2,[0,0])}d++}function W(t,o,s,l,B=!1){for(const[y,f]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]])v([t[0]+y*o[0],t[1]+f*o[1],t[2]],[0,0,1],[(y+1)/2,(f+1)/2],B?10:9,s,.48+s*.35,0,[0,0],[...t,l]);const b=.25+.4*(s*17.7%1),g=s*Math.PI*2,a=[t[0]+Math.cos(g)*b,t[2]+Math.sin(g)*b],n=Math.hypot(...o)+.15;z.expandByPoint(new e.Vector3(Math.min(t[0],a[0])-n,0,Math.min(t[2],a[1])-n)),z.expandByPoint(new e.Vector3(Math.max(t[0],a[0])+n,t[1]+Math.hypot(...o)*2+.04,Math.max(t[2],a[1])+n)),d++}p({T:e,hash:M,stamp:R,strip:q,branch:I,fallingLeaf:W});const w=new e.BufferGeometry;for(const[t,o,s]of[["position",L,3],["normal",x,3],["uv",P,2],["brushData",D,4],["plantRoot",j,2],["leafMotion",C,4]])w.setAttribute(t,new e.Float32BufferAttribute(o,s));w.computeBoundingBox(),w.computeBoundingSphere(),w.boundingBox.expandByVector(new e.Vector3(.16,.02,.1)),w.boundingSphere.radius+=.2;let N;z.isEmpty()||(w.boundingBox.union(z),w.boundingBox.getBoundingSphere(w.boundingSphere),N=w.boundingBox.clone());const E=H(e,i.colors),O=new e.Mesh(w,E);O.name=i.model+"-brushes",u.add(O),u.userData.modeledParts=d;const $=Object.freeze({triangles:Q(u)});function U(t={}){if(!r){for(const o of["primary","secondary","accent"])/^#[0-9a-f]{6}$/i.test(t[o])&&(m[o]=t[o]);["Primary","Secondary","Accent"].forEach(o=>E.uniforms["u"+o].value.set(m[o.toLowerCase()]))}}U(V);const Z={...m};return{group:u,materials:[E],stats:$,animationBounds:N,setOptions:U,update(t){r||(h+=Math.max(0,Math.min(.1,Number.isFinite(t)?t:0)),E.uniforms.uTime.value=h)},reset(){h=0,E.uniforms.uTime.value=0,U(Z)},createBaseline(){return[H(e,i.colors,!0)]},dispose(){r||(r=!0,w.dispose(),E.dispose(),u.removeFromParent(),u.clear())},get settings(){return{...m}},get elapsed(){return h},get disposed(){return r}}}function T(e){const{hash:i,strip:p,stamp:V}=e;for(let u=0;u<22;u++){const m=u*2.39996,L=Math.sqrt(i(u+67))*.45,x=[Math.cos(m)*L,Math.sin(m)*L],P=i(u+13),D=.38+i(u+93)*.47,j=(P-.5)*.11,C=(i(u+9)-.5)*.11,z=Array.from({length:5},(d,h)=>{const r=h/4;return[x[0]+j*r*r,D*r,x[1]+C*r*r]});for(const d of[m,m+Math.PI/2])p(z,[.008,.008,.007,.006,.005],d,5,P,.5,[0,.0625,.25,.5625,1],x);for(let d=0;d<3;d++){const h=.22+d*.19,r=m+d*2.4,v=[x[0]+j*h*h,D*h,x[1]+C*h*h],q=[v[0]+Math.cos(r)*.16,v[1]+.1,v[2]+Math.sin(r)*.16];p([v,v.map((R,I)=>(R+q[I])*.5),q],[.02,.048,.005],r+1.57,6,P,.45,[h*h,(h+.06)**2,(h+.12)**2],x)}const M=z[4];for(let d=0;d<6;d++){const h=m+d*Math.PI/3,r=[Math.cos(h),Math.sin(h)],v=[M[0]+r[0]*.015,M[1],M[2]+r[1]*.015],q=[M[0]+r[0]*.14,M[1]+.055,M[2]+r[1]*.14];p([v,q],[.063,.063],h+Math.PI/2,3,P,.5+i(u)*.25,[1,1],x,[r[0]*.2,1,r[1]*.2])}V([M[0],M[1]+.009,M[2]],[.032,.032],m,Math.PI/2,4,P,.65,1,x,[0,1,0])}}const ee={model:"flower-clump",colors:["#c896b4","#789579","#dfc47e"]},te={primary:"#c896b4",secondary:"#789579",accent:"#dfc47e"};function ne(e={}){return Y(X,ee,T,{...te,...e})}export{ne as createGameObject,H as createVegetationMaterial,ne as default,te as defaultOptions};
