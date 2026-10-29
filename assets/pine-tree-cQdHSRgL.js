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
`}function Z(e,t,m=!1){return new e.ShaderMaterial({name:"Hand-painted vegetation",side:e.DoubleSide,transparent:!1,depthTest:!0,depthWrite:!0,uniforms:{uTime:{value:0},uPrimary:{value:new e.Color(t[0])},uSecondary:{value:new e.Color(t[1])},uAccent:{value:new e.Color(t[2])},uPaint:{value:m?0:1},uBrush:{value:1}},vertexShader:`attribute vec4 brushData,leafMotion; attribute vec2 plantRoot;
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
 }`})}function X(e){let t=0;return e.traverse(m=>{if(!m.isMesh||m.userData.previewHelper||m.userData.objectEffect)return;const k=m.geometry,x=k.index?.count??k.attributes.position.count,v=Math.min(x,k.drawRange.start),a=Math.min(x-v,k.drawRange.count);t+=Math.floor(a/3)*(m.isInstancedMesh?m.count:1)}),t}function Y(e,t,m,k={}){const x=new e.Group;x.name=t.model,x.userData={units:"meters",origin:"base-center",shader:"00-painterly-vegetation",plant:!0};const v={primary:t.colors[0],secondary:t.colors[1],accent:t.colors[2]},a=[],f=[],y=[],V=[],S=[],p=[],g=new e.Box3,U=o=>{const s=Math.sin(o*127.1+311.7)*43758.5453;return s-Math.floor(s)};let A=0,L=0,z=!1;const l=(o,s,i,c,q,B,M,n,r=[0,0,0,0])=>{a.push(...o),f.push(...s),y.push(...i),V.push(c,q,B,M),S.push(...n),p.push(...r)};function P(o,s,i,c,q,B,M,n=[0,0],r){const w=new e.Vector3(Math.cos(i),0,Math.sin(i)),u=r??[-Math.sin(i),.15,Math.cos(i)];for(let h=0;h<o.length-1;h++)for(const[E,C]of[[h,-1],[h,1],[h+1,-1],[h,1],[h+1,1],[h+1,-1]]){const R=new e.Vector3(...o[E]).addScaledVector(w,C*s[E]);l(R.toArray(),u,[(C+1)/2,E/(o.length-1)],c,q,B,M[E],n)}A++}function _(o,s,i,c,q,B,M,n,r=[0,0],w){const u=new e.Vector3(Math.cos(i),0,Math.sin(i)),h=new e.Vector3(-Math.sin(i)*Math.sin(c),Math.cos(c),Math.cos(i)*Math.sin(c)),E=w??new e.Vector3().crossVectors(u,h).toArray();for(const[C,R]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]]){const H=new e.Vector3(...o).addScaledVector(u,C*s[0]).addScaledVector(h,R*s[1]);l(H.toArray(),E,[(C+1)/2,(R+1)/2],q,B,M,n,r)}A++}function j(o,s,i=10,c=7,q=3.3){const B=new e.CatmullRomCurve3(o.map(n=>new e.Vector3(...n))),M=[];for(let n=0;n<=i;n++){const r=n/i,w=B.getPoint(r),u=B.getTangent(r),h=new e.Vector3().crossVectors(u,new e.Vector3(1,.03,0)).normalize(),E=new e.Vector3().crossVectors(u,h),C=r*(s.length-1),R=Math.min(s.length-2,Math.floor(C)),H=e.MathUtils.lerp(s[R],s[R+1],C-R);M.push(Array.from({length:c},(ae,W)=>{const $=h.clone().multiplyScalar(Math.cos(W*2*Math.PI/c)).addScaledVector(E,Math.sin(W*2*Math.PI/c));return{p:w.clone().addScaledVector($,H).toArray(),n:$.toArray()}}))}for(let n=0;n<i;n++)for(let r=0;r<c;r++)for(const[w,u]of[[n,r],[n+1,r],[n,(r+1)%c],[n,(r+1)%c],[n+1,r],[n+1,(r+1)%c]]){const h=M[w][u],E=r===c-1&&u===0?1:u/c;l(h.p,h.n,[E,w/i],0,0,.5,Math.pow(Math.max(0,h.p[1])/q,2),[0,0])}for(const n of[0,i]){const r=B.getPoint(n/i).toArray(),w=[0,n===0?-1:1,0];for(let u=0;u<c;u++)for(const h of[r,M[n][u].p,M[n][(u+1)%c].p])l(h,w,[.5,.5],0,0,.5,(Math.max(0,h[1])/q)**2,[0,0])}A++}function I(o,s,i,c,q=!1){for(const[w,u]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]])l([o[0]+w*s[0],o[1]+u*s[1],o[2]],[0,0,1],[(w+1)/2,(u+1)/2],q?10:9,i,.48+i*.35,0,[0,0],[...o,c]);const B=.25+.4*(i*17.7%1),M=i*Math.PI*2,n=[o[0]+Math.cos(M)*B,o[2]+Math.sin(M)*B],r=Math.hypot(...s)+.15;g.expandByPoint(new e.Vector3(Math.min(o[0],n[0])-r,0,Math.min(o[2],n[1])-r)),g.expandByPoint(new e.Vector3(Math.max(o[0],n[0])+r,o[1]+Math.hypot(...s)*2+.04,Math.max(o[2],n[1])+r)),A++}m({T:e,hash:U,stamp:_,strip:P,branch:j,fallingLeaf:I});const b=new e.BufferGeometry;for(const[o,s,i]of[["position",a,3],["normal",f,3],["uv",y,2],["brushData",V,4],["plantRoot",S,2],["leafMotion",p,4]])b.setAttribute(o,new e.Float32BufferAttribute(s,i));b.computeBoundingBox(),b.computeBoundingSphere(),b.boundingBox.expandByVector(new e.Vector3(.16,.02,.1)),b.boundingSphere.radius+=.2;let O;g.isEmpty()||(b.boundingBox.union(g),b.boundingBox.getBoundingSphere(b.boundingSphere),O=b.boundingBox.clone());const d=Z(e,t.colors),D=new e.Mesh(b,d);D.name=t.model+"-brushes",x.add(D),x.userData.modeledParts=A;const F=Object.freeze({triangles:X(x)});function N(o={}){if(!z){for(const s of["primary","secondary","accent"])/^#[0-9a-f]{6}$/i.test(o[s])&&(v[s]=o[s]);["Primary","Secondary","Accent"].forEach(s=>d.uniforms["u"+s].value.set(v[s.toLowerCase()]))}}N(k);const G={...v};return{group:x,materials:[d],stats:F,animationBounds:O,setOptions:N,update(o){z||(L+=Math.max(0,Math.min(.1,Number.isFinite(o)?o:0)),d.uniforms.uTime.value=L)},reset(){L=0,d.uniforms.uTime.value=0,N(G)},createBaseline(){return[Z(e,t.colors,!0)]},dispose(){z||(z=!0,b.dispose(),d.dispose(),x.removeFromParent(),x.clear())},get settings(){return{...v}},get elapsed(){return L},get disposed(){return z}}}function T(e){const{hash:t,stamp:m,branch:k,fallingLeaf:x}=e,v=3.9;k([[0,0,0],[.035,.8,.015],[-.035,1.8,0],[.02,2.8,-.025],[0,3.65,0]],[.16,.115,.075,.035,.004],26,9,v);for(let a=0;a<5;a++){const f=a*1.256;k([[Math.cos(f)*.3,0,Math.sin(f)*.3],[Math.cos(f)*.16,.12,Math.sin(f)*.16],[0,.42,0]],[.012,.048,.07],4,5,v)}for(let a=0;a<8;a++){const f=.73+a*.35,y=1.12-a*.125,V=a<5?5:4;for(let S=0;S<V;S++){const p=a*151+S*37,g=S*Math.PI*2/V+a*1.71+t(p)*.27,U=y*(.83+t(p+9)*.26),A=(t(p+18)-.5)*.17,L=l=>[Math.cos(g)*U*l,f+A-.18*Math.sin(l*Math.PI)+l*l*.19,Math.sin(g)*U*l];k([[0,f+.04,0],L(.4),L(.75),L(1)],[.045*(1-a*.07),.025,.013,.002],7,5,v);for(let l=-1;l<=1;l+=2)for(let P=0;P<5;P++){const _=.25+P*.145,j=L(_),I=g+l*(.75-_*.24),b=U*(.25-.1*_),O=[j[0]+Math.cos(I)*b,j[1]+.1+t(p+P)*.06,j[2]+Math.sin(I)*b];(P===2||P===4)&&k([j,j.map((d,D)=>(d+O[D])*.5),O],[.01,.006,.001],2,4,v);for(let d=0;d<5;d++){const D=t(p+P*19+d+l*217),F=.18+d*.2,N=j.map((G,o)=>G+(O[o]-G)*F);N[1]+=(D-.5)*.07,m(N,[.065+D*.035,.14+D*.07],I+t(p+d)*1.4,.65+t(p+P+d*33)*1.8,8,D,.21+t(p+P*17+d)*.57,(N[1]/v)**2,[0,0],[Math.cos(I)*.3,.85,Math.sin(I)*.3])}}const z=L(1);for(let l=0;l<5;l++)m([z[0],z[1]+l*.027,z[2]],[.075,.16],g+l*1.25,.2+l*.5,8,t(p+l),.65,(z[1]/v)**2,[0,0],[Math.cos(g)*.3,1,Math.sin(g)*.3])}}for(let a=0;a<60;a++){const f=a*2.39996,y=3.22+t(a+81)*.43,V=(3.74-y)*.25;m([Math.cos(f)*V,y,Math.sin(f)*V],[.055,.12],f,t(a)*1.5,8,t(a+6),.5+t(a)*.3,(y/v)**2,[0,0],[0,1,0])}for(let a=0;a<24;a++){const f=t(a+8101),y=a%8,V=y<5?5:4,S=Math.floor(a/8)%V,p=y*151+S*37,g=S*Math.PI*2/V+y*1.71+t(p)*.27,U=.73+y*.35,A=(1.12-y*.125)*(.83+t(p+9)*.26)*(.55+t(a+8309)*.35);x([Math.cos(g)*A,U+.09,Math.sin(g)*A],[.033+f*.014,.065+f*.02],f,(a+t(a+8401)*.8)/24,!0)}}const ee={model:"pine-tree",colors:["#477c59","#806044","#b5b766"]},te={primary:"#477c59",secondary:"#806044",accent:"#b5b766"};function ne(e={}){return Y(J,ee,T,{...te,...e})}export{ne as createGameObject,Z as createVegetationMaterial,ne as default,te as defaultOptions};
