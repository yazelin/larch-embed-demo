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
`}function W(t,e,x=!1){return new t.ShaderMaterial({name:"Hand-painted vegetation",side:t.DoubleSide,transparent:!1,depthTest:!0,depthWrite:!0,uniforms:{uTime:{value:0},uPrimary:{value:new t.Color(e[0])},uSecondary:{value:new t.Color(e[1])},uAccent:{value:new t.Color(e[2])},uPaint:{value:x?0:1},uBrush:{value:1}},vertexShader:`attribute vec4 brushData,leafMotion; attribute vec2 plantRoot;
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
 }`})}function X(t){let e=0;return t.traverse(x=>{if(!x.isMesh||x.userData.previewHelper||x.userData.objectEffect)return;const V=x.geometry,b=V.index?.count??V.attributes.position.count,M=Math.min(b,V.drawRange.start),z=Math.min(b-M,V.drawRange.count);e+=Math.floor(z/3)*(x.isInstancedMesh?x.count:1)}),e}function Y(t,e,x,V={}){const b=new t.Group;b.name=e.model,b.userData={units:"meters",origin:"base-center",shader:"00-painterly-vegetation",plant:!0};const M={primary:e.colors[0],secondary:e.colors[1],accent:e.colors[2]},z=[],a=[],h=[],d=[],p=[],m=[],f=new t.Box3,q=o=>{const s=Math.sin(o*127.1+311.7)*43758.5453;return s-Math.floor(s)};let E=0,g=0,v=!1;const S=(o,s,i,c,A,k,w,n,r=[0,0,0,0])=>{z.push(...o),a.push(...s),h.push(...i),d.push(c,A,k,w),p.push(...n),m.push(...r)};function j(o,s,i,c,A,k,w,n=[0,0],r){const B=new t.Vector3(Math.cos(i),0,Math.sin(i)),u=r??[-Math.sin(i),.15,Math.cos(i)];for(let l=0;l<o.length-1;l++)for(const[L,C]of[[l,-1],[l,1],[l+1,-1],[l,1],[l+1,1],[l+1,-1]]){const R=new t.Vector3(...o[L]).addScaledVector(B,C*s[L]);S(R.toArray(),u,[(C+1)/2,L/(o.length-1)],c,A,k,w[L],n)}E++}function U(o,s,i,c,A,k,w,n,r=[0,0],B){const u=new t.Vector3(Math.cos(i),0,Math.sin(i)),l=new t.Vector3(-Math.sin(i)*Math.sin(c),Math.cos(c),Math.cos(i)*Math.sin(c)),L=B??new t.Vector3().crossVectors(u,l).toArray();for(const[C,R]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]]){const _=new t.Vector3(...o).addScaledVector(u,C*s[0]).addScaledVector(l,R*s[1]);S(_.toArray(),L,[(C+1)/2,(R+1)/2],A,k,w,n,r)}E++}function N(o,s,i=10,c=7,A=3.3){const k=new t.CatmullRomCurve3(o.map(n=>new t.Vector3(...n))),w=[];for(let n=0;n<=i;n++){const r=n/i,B=k.getPoint(r),u=k.getTangent(r),l=new t.Vector3().crossVectors(u,new t.Vector3(1,.03,0)).normalize(),L=new t.Vector3().crossVectors(u,l),C=r*(s.length-1),R=Math.min(s.length-2,Math.floor(C)),_=t.MathUtils.lerp(s[R],s[R+1],C-R);w.push(Array.from({length:c},(ae,F)=>{const H=l.clone().multiplyScalar(Math.cos(F*2*Math.PI/c)).addScaledVector(L,Math.sin(F*2*Math.PI/c));return{p:B.clone().addScaledVector(H,_).toArray(),n:H.toArray()}}))}for(let n=0;n<i;n++)for(let r=0;r<c;r++)for(const[B,u]of[[n,r],[n+1,r],[n,(r+1)%c],[n,(r+1)%c],[n+1,r],[n+1,(r+1)%c]]){const l=w[B][u],L=r===c-1&&u===0?1:u/c;S(l.p,l.n,[L,B/i],0,0,.5,Math.pow(Math.max(0,l.p[1])/A,2),[0,0])}for(const n of[0,i]){const r=k.getPoint(n/i).toArray(),B=[0,n===0?-1:1,0];for(let u=0;u<c;u++)for(const l of[r,w[n][u].p,w[n][(u+1)%c].p])S(l,B,[.5,.5],0,0,.5,(Math.max(0,l[1])/A)**2,[0,0])}E++}function P(o,s,i,c,A=!1){for(const[B,u]of[[-1,-1],[1,-1],[-1,1],[1,-1],[1,1],[-1,1]])S([o[0]+B*s[0],o[1]+u*s[1],o[2]],[0,0,1],[(B+1)/2,(u+1)/2],A?10:9,i,.48+i*.35,0,[0,0],[...o,c]);const k=.25+.4*(i*17.7%1),w=i*Math.PI*2,n=[o[0]+Math.cos(w)*k,o[2]+Math.sin(w)*k],r=Math.hypot(...s)+.15;f.expandByPoint(new t.Vector3(Math.min(o[0],n[0])-r,0,Math.min(o[2],n[1])-r)),f.expandByPoint(new t.Vector3(Math.max(o[0],n[0])+r,o[1]+Math.hypot(...s)*2+.04,Math.max(o[2],n[1])+r)),E++}x({T:t,hash:q,stamp:U,strip:j,branch:N,fallingLeaf:P});const y=new t.BufferGeometry;for(const[o,s,i]of[["position",z,3],["normal",a,3],["uv",h,2],["brushData",d,4],["plantRoot",p,2],["leafMotion",m,4]])y.setAttribute(o,new t.Float32BufferAttribute(s,i));y.computeBoundingBox(),y.computeBoundingSphere(),y.boundingBox.expandByVector(new t.Vector3(.16,.02,.1)),y.boundingSphere.radius+=.2;let I;f.isEmpty()||(y.boundingBox.union(f),y.boundingBox.getBoundingSphere(y.boundingSphere),I=y.boundingBox.clone());const D=W(t,e.colors),G=new t.Mesh(y,D);G.name=e.model+"-brushes",b.add(G),b.userData.modeledParts=E;const $=Object.freeze({triangles:X(b)});function O(o={}){if(!v){for(const s of["primary","secondary","accent"])/^#[0-9a-f]{6}$/i.test(o[s])&&(M[s]=o[s]);["Primary","Secondary","Accent"].forEach(s=>D.uniforms["u"+s].value.set(M[s.toLowerCase()]))}}O(V);const Z={...M};return{group:b,materials:[D],stats:$,animationBounds:I,setOptions:O,update(o){v||(g+=Math.max(0,Math.min(.1,Number.isFinite(o)?o:0)),D.uniforms.uTime.value=g)},reset(){g=0,D.uniforms.uTime.value=0,O(Z)},createBaseline(){return[W(t,e.colors,!0)]},dispose(){v||(v=!0,y.dispose(),D.dispose(),b.removeFromParent(),b.clear())},get settings(){return{...M}},get elapsed(){return g},get disposed(){return v}}}function T(t){const{hash:e,stamp:x,branch:V,fallingLeaf:b}=t,M=3.9,z=[];V([[0,0,0],[-.12,.52,.025],[-.04,1.13,-.035],[.11,1.75,.04],[-.08,2.49,.02],[.03,3.12,0]],[.23,.155,.12,.085,.044,.008],26,10,M);for(let a=0;a<6;a++){const h=a*1.047+.14,d=.34+e(a+13)*.15;V([[Math.cos(h)*d,0,Math.sin(h)*d],[Math.cos(h)*.22,.12,Math.sin(h)*.22],[-.05,.48,.015]],[.014,.065,.095],5,6,M)}for(let a=0;a<7;a++){const h=a*2.39996+.4,d=.82+e(a+23)*.3,p=2.45+e(a+53)*.48,m=Math.cos(h)*d,f=Math.sin(h)*d*.85,q=.93+e(a+9)*.55;z.push([m,p,f]);const E=[m*.56,p-.51,f*.56];V([[-.06,q,0],[m*.25,q+.35,f*.25],E,[m,p+.08,f]],[.08,.065,.034,.007],12,7,M);for(let g=0;g<3;g++){const v=h+(g-1)*.85,S=[m+Math.cos(v)*.37,p+.13+e(g+a*31)*.35,f+Math.sin(v)*.37];V([E,[m*.92,p-.05,f*.92],S],[.025,.016,.003],5,5,M)}for(let g=0;g<270;g++){const v=a*401+g,S=g*2.39996,j=e(v+900)*2-1,U=Math.pow(e(v+1700),.36),N=Math.sqrt(1-j*j),P=[m+Math.cos(S)*N*U*.78,p+j*U*.58,f+Math.sin(S)*N*U*.7];if(P[1]<2.15&&Math.hypot(P[0],P[2])<.88)continue;const y=e(v+211),I=.105+e(v+310)*.055,D=.18+e(v+23)*.54+(P[1]-2)*.13;x(P,[I,I*(.8+e(v+711)*.45)],S+y,e(v+62)*Math.PI,7,y,D,(P[1]/M)**2,[0,0],[P[0]*.4,.7+(P[1]-2)*.4,P[2]*.4])}}for(let a=0;a<300;a++){const h=a*2.39996,d=e(a+4300)*2-1,p=Math.pow(e(a+5100),.35),m=Math.sqrt(1-d*d),f=[Math.cos(h)*m*p*.77,2.98+d*p*.65,Math.sin(h)*m*p*.7],q=e(a+412);x(f,[.11+q*.04,.12+q*.05],h,e(a+411)*Math.PI,7,q,.4+e(a+31)*.43,(f[1]/M)**2,[0,0],[f[0]*.4,1,f[2]*.4])}z.push([0,2.98,0]);for(let a=0;a<96;a++){const h=z[a%z.length],d=e(a+7103),p=a*2.39996,m=.16+e(a+7801)*.37;b([h[0]+Math.cos(p)*m,h[1]+(e(a+7301)-.5)*.43,h[2]+Math.sin(p)*m],[.045+d*.02,.075+d*.025],d,(a+e(a+7907)*.8)/96)}}const ee={model:"round-tree",colors:["#e3952e","#795235","#f5ce67"]},te={primary:"#e3952e",secondary:"#795235",accent:"#f5ce67"};function ne(t={}){return Y(J,ee,T,{...te,...t})}export{ne as createGameObject,W as createVegetationMaterial,ne as default,te as defaultOptions};
