import{f as s}from"./akarionMedia-BkIMgOoi.js";const c=`precision highp float;
uniform vec2 uRes; uniform float uT, uLevel, uCalm;
float rs(float a,float b,float x){return 1.-smoothstep(b,a,x);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float ell(vec3 p,vec3 r){float k0=length(p/r),k1=length(p/(r*r));return k0*(k0-1.)/max(k1,1e-4);}
float cyl(vec3 p,float r,float h,float k){vec2 d=vec2(length(p.xz)-r+k,abs(p.y)-h+k);return min(max(d.x,d.y),0.)+length(max(d,0.))-k;}
float bumps(vec3 p){return sin(p.x*7.+sin(p.z*5.))*sin(p.z*7.+1.3)*sin(p.y*6.+.7);}
float hop,lift;
const float TOP=-.5;
// What it is: 1 grass, 2 rock, 3 jelly, 4 trunk, 5 leaves, 6 eye, 7 stone.
vec2 pick(vec2 a,vec2 b){return a.x<b.x?a:b;}
vec2 map(vec3 p){
  // The island: a grassy top on a rock that tapers away below.
  float top=cyl(p-vec3(0.,TOP-.1,0.),1.22+.03*sin(atan(p.z,p.x)*5.),.1,.08);
  float rock=ell(p-vec3(0.,TOP-.42,0.),vec3(1.12,.4,1.12))+.035*bumps(p*1.6);
  rock=smin(rock,ell(p-vec3(.08,TOP-.86,.05),vec3(.46,.36,.46))+.03*bumps(p*2.2),.16);
  vec2 d=vec2(top,1.);
  d=pick(d,vec2(rock,2.));
  d=pick(d,vec2(ell(p-vec3(.82,TOP+.06,.28),vec3(.17,.12,.15))+.012*bumps(p*5.),7.));
  // A round little tree at the back.
  vec3 t=p-vec3(-.74,TOP,-.3);
  d=pick(d,vec2(cyl(t-vec3(0.,.2,0.),.055,.21,.02),4.));
  float leaves=smin(ell(t-vec3(0.,.56,0.),vec3(.3,.27,.3)),ell(t-vec3(.12,.42,.08),vec3(.2,.17,.2)),.08);
  d=pick(d,vec2(leaves+.012*bumps(t*7.),5.));
  // The slime, hopping: squashed down landing, stretched going up. A round dome with no point on top, the 3D system's
  // round slime (slime.ts ROUND_FORM: its body and the soft foot it sits on).
  float sy=1.+.14*hop-.1*(1.-hop)*(1.-hop),sw=1./sqrt(sy);
  vec3 q=(p-vec3(0.,TOP+lift,.08))/vec3(1.05*sw,1.05*sy,1.05*sw);
  float jelly=ell(q-vec3(0.,.37,0.),vec3(.52,.37,.52));
  jelly=smin(jelly,ell(q-vec3(0.,.12,0.),vec3(.62,.13,.62)),.24);
  d=pick(d,vec2(jelly*.9,3.));
  vec3 e=vec3(abs(q.x)-.19,q.y-.45,q.z-.465);
  d=pick(d,vec2(ell(e,vec3(.075,.105,.04))*.9,6.));
  return d;
}
vec3 normalAt(vec3 p){vec2 e=vec2(.0016,-.0016);return normalize(e.xyy*map(p+e.xyy).x+e.yyx*map(p+e.yyx).x+e.yxy*map(p+e.yxy).x+e.xxx*map(p+e.xxx).x);}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
  float t=uT;
  hop=uCalm>.5?.4:max(0.,sin(t*3.4));
  lift=hop*hop*.15;
  // A turn back and forth (it keeps its face to you), floating a little, seen from a little above.
  float yaw=uCalm>.5?-.35:sin(t*.45)*.62-.12,bob=uCalm>.5?0.:sin(t*.9)*.04;
  vec3 ro=vec3(0.,1.25,4.75),rd=normalize(vec3(uv*1.16,-1.9));
  rd.yz=rot(.39)*rd.yz;
  ro.y+=.32-bob;
  ro.xz=rot(yaw)*ro.xz;rd.xz=rot(yaw)*rd.xz;
  float fill=mix(-1.46,.76,uLevel);
  vec4 col=vec4(0.);
  // Motes of light going round it, in the same space (nearer ones in front of it, further ones behind).
  float hitAt=1e3,edge=1e3,z=0.,px=1.6/min(uRes.x,uRes.y)*2.;
  // Only inside the sphere it all fits in.
  vec3 oc=ro-vec3(0.,-.42,0.);float b=dot(oc,rd),c=dot(oc,oc)-1.86*1.86,h=b*b-c;
  vec2 hit=vec2(0.);
  if(h>0.){
    z=max(0.,-b-sqrt(h));float far=-b+sqrt(h);
    for(int i=0;i<56;i++){
      vec3 p=ro+rd*z;
      vec2 d=map(p);
      edge=min(edge,d.x/z);
      if(d.x<.0012*z){hit=d;hitAt=z;break;}
      z+=d.x;
      if(z>far)break;
    }
  }
  if(hitAt<1e3){
    vec3 p=ro+rd*hitAt,n=normalAt(p),l=normalize(vec3(.55,.75,.5)),v=-rd,hv=normalize(l+v);
    float nl=max(dot(n,l),0.),fres=pow(1.-max(dot(n,v),0.),3.),sky=.5+.5*n.y;
    float id=floor(hit.y+.5);
    vec3 alb=vec3(.5);
    if(id<1.5){alb=mix(vec3(.36,.68,.3),vec3(.46,.76,.34),.5+.5*bumps(p*2.));if(n.y<.45)alb=vec3(.42,.5,.26);}
    else if(id<2.5){alb=mix(vec3(.34,.25,.26),vec3(.56,.42,.36),.5+.5*bumps(p*2.5));}
    else if(id<3.5){alb=mix(vec3(.03,.56,.36),vec3(.36,.9,.62),clamp(.5+p.y-TOP-lift-.2,0.,1.));}
    else if(id<4.5){alb=vec3(.42,.27,.18);}
    else if(id<5.5){alb=mix(vec3(.2,.52,.3),vec3(.42,.78,.36),.5+.5*bumps(p*5.));}
    else if(id<6.5){alb=vec3(.05,.06,.12);}
    else{alb=vec3(.58,.56,.58);}
    vec3 solid=alb*(.36+.34*sky+.82*nl);
    float sp=id>2.5&&id<3.5?1.:(id>5.5&&id<6.5?1.4:.08);
    solid+=vec3(1.)*sp*pow(max(dot(n,hv),0.),id<3.5?70.:120.);
    if(id>2.5&&id<3.5){
      // Jelly: light through it, a bright rim, a cheek of pink and a little smile on its face.
      float sw=1./sqrt(1.+.14*hop-.1*(1.-hop)*(1.-hop));
      vec3 q=(p-vec3(0.,TOP+lift,.08))/vec3(1.05*sw,1.05,1.05*sw);
      solid+=vec3(.25,.9,.6)*(.04+.34*pow(1.-max(dot(n,v),0.),2.))+vec3(.4,1.,.75)*max(dot(n,-l),0.)*.14;
      float cheek=rs(.09,.03,length(vec2(abs(q.x)-.31,(q.y-.36)*1.5)))*step(0.,q.z);
      solid=mix(solid,vec3(1.,.55,.62),cheek*.55);
      float smile=rs(.016,.006,abs(length(vec2(q.x,q.y-.39))-.05))*step(q.y,.36)*step(0.,q.z);
      solid=mix(solid,vec3(.06,.2,.17),smile);
    }
    if(id>5.5&&id<6.5)solid+=vec3(1.)*smoothstep(.985,.995,dot(n,normalize(vec3(.34,.52,.78))));
    solid+=vec3(.5,.75,1.)*fres*.22;
    // Not filled yet: the model as a hologram, its lines round and up the shape.
    float ang=atan(p.z,p.x)*7.64;
    float la=abs(fract(ang)-.5),ly=abs(fract(p.y*8.)-.5);
    float lines=max(rs(.06,.02,la),rs(.06,.02,ly));
    vec3 holo=mix(vec3(.25,.75,.95),vec3(.5,1.,.85),.5+.5*n.y);
    float holoA=.09+.62*lines+.42*fres;
    float wave=fill+sin(atan(p.z,p.x)*3.+t*1.6)*.014;
    float solidK=rs(wave+.012,wave-.012,p.y);
    col=mix(vec4(holo*holoA,holoA),vec4(solid,1.),solidK);
    // The ring of light at the level it has filled to.
    float ring=rs(.06,0.,abs(p.y-wave))*(1.-step(.995,uLevel));
    col.rgb+=vec3(.55,1.,.88)*ring*.95;col.a=max(col.a,ring*.9);
  }else if(edge<px){col=vec4(.5,.95,.85,1.)*.16*rs(px,0.,edge);}
  // The motes.
  for(int i=0;i<7;i++){
    float k=float(i),a=k*.9+t*(.22+k*.02),r=1.25+.22*sin(k*2.1),y=-.72+.32*k+.1*sin(t*.7+k);
    vec3 m=vec3(cos(a)*r,y,sin(a)*r);
    vec3 w2=m-ro;float along=dot(w2,rd);
    if(along<=0.)continue;
    float dist=length(w2-rd*along);
    if(hitAt<1e3&&along>hitAt)continue;
    float glow=rs(.05,0.,dist)*(.45+.55*sin(t*2.+k*1.7));
    col.rgb+=vec3(.75,1.,.92)*max(0.,glow);col.a=max(col.a,max(0.,glow));
  }
  gl_FragColor=vec4(col.rgb,clamp(col.a,0.,1.));
}
`,d=`function l3dLoadingScene(canvas,level,size,calm){
var gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:true,powerPreference:'low-power'});
if(!gl)return{set:function(){},size:function(){},stop:function(){}};
function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
var prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,${JSON.stringify(c)}));
gl.linkProgram(prog);gl.useProgram(prog);
var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
var at=gl.getAttribLocation(prog,'a');gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,2,gl.FLOAT,false,0,0);
var uRes=gl.getUniformLocation(prog,'uRes'),uT=gl.getUniformLocation(prog,'uT'),uLevel=gl.getUniformLocation(prog,'uLevel'),uCalm=gl.getUniformLocation(prog,'uCalm');
var want=level,shown=level===null?0:level,running=true,raf=0,last=0,start=0,slow=0,scale=1,px=size;
var next=typeof requestAnimationFrame==='function'?requestAnimationFrame:function(f){return setTimeout(function(){f(Date.now());},33);};
var cancel=typeof cancelAnimationFrame==='function'?cancelAnimationFrame:clearTimeout;
function fit(){var n=Math.max(120,Math.round(px*scale));if(canvas.width!==n||canvas.height!==n){canvas.width=n;canvas.height=n;gl.viewport(0,0,n,n);}}
function frame(now){
if(!running)return;
raf=next(frame);
if(!start){start=now;last=now;}
var dt=Math.min(.1,(now-last)/1000);last=now;
// A slow machine draws it smaller rather than choppier.
slow+=((dt*1000)-slow)*.05;
if(slow>42&&scale>.5&&now-start>1200){scale*=.82;slow=20;}
var t=(now-start)/1000;
if(want===null){shown+=dt/5.2;if(shown>1.18)shown=0;}
else shown+=(want-shown)*Math.min(1,dt*3.5);
fit();
gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform2f(uRes,canvas.width,canvas.height);gl.uniform1f(uT,t);gl.uniform1f(uLevel,Math.min(1,shown));gl.uniform1f(uCalm,calm?1:0);
gl.drawArrays(gl.TRIANGLES,0,3);
}
raf=next(frame);
return{set:function(p){want=p;},size:function(s){px=s;},stop:function(){running=false;cancel(raf);var e=gl.getExtension('WEBGL_lose_context');if(e)e.loseContext();}};
}`,f=`\${src}
var scene=null;
self.onmessage=function(e){var d=e.data;
if(d.canvas)scene=l3dLoadingScene(d.canvas,d.level,d.size,d.calm);
else if(scene&&'level' in d)scene.set(d.level);
else if(scene&&'size' in d)scene.size(d.size);
};`,r=`${d}
function l3dStartLoading(canvas,level){
var calm=false;try{calm=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var size=function(){var r=canvas.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,1.5);return Math.round(Math.max(r.width,r.height,200)*d);};
var w=null,url='';
try{
if(canvas.transferControlToOffscreen&&typeof Worker==='function'&&typeof OffscreenCanvas==='function'){
url=URL.createObjectURL(new Blob([${JSON.stringify(f)}.replace('\${src}',function(){return l3dLoadingScene.toString();})],{type:'text/javascript'}));
w=new Worker(url);
var off=canvas.transferControlToOffscreen();
w.postMessage({canvas:off,level:level,size:size(),calm:calm},[off]);
}
}catch(e){w=null;}
var s=w?null:l3dLoadingScene(canvas,level,size(),calm);
return{set:function(p){if(w)w.postMessage({level:p});else if(s)s.set(p);},stop:function(){if(w){w.terminate();if(url)URL.revokeObjectURL(url);}if(s)s.stop();}};
}`;let i=null;function g(e,t){return i??=new Function(`${r};return l3dStartLoading;`)(),i(e,t)}const b="larch-3d",l="mwcyvf4v",v="/plugins/larch3d/runtime.js",p="<!--larch3d-runtime-->",w="/packs/larch-3d/cover-v3.webp",u="/packs/larch-3d/cover-v2.webp",x=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>html,body{margin:0;height:100%;overflow:hidden;background:#0e1414;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
#l3d-boot{position:fixed;inset:0;display:grid;grid-template-rows:minmax(0,1fr) auto;justify-items:center;padding:12px 16px max(18px,6vh);overflow:hidden;background:radial-gradient(70% 62% at 50% 40%,#2d4266 0%,#172038 58%,#0b0f20 100%);color:#fff;font:600 13px -apple-system,"Noto Sans TC",system-ui,sans-serif;letter-spacing:.04em;transition:opacity .35s ease}
#l3d-boot .model{position:relative;align-self:center;width:min(92vw,calc(100vh - 110px),620px);aspect-ratio:1;min-height:0}
#l3d-boot .model::before{content:"";position:absolute;left:12%;right:12%;bottom:1%;height:20%;border-radius:50%;background:radial-gradient(closest-side,rgba(127,242,207,.22),transparent)}
#l3d-boot canvas{position:absolute;inset:0;display:block;width:100%;height:100%}
#l3d-boot .hud{position:relative;display:grid;justify-items:center;gap:10px;width:min(380px,84vw)}
#l3d-boot .bar{position:relative;justify-self:stretch;height:4px;border-radius:999px;background:rgba(255,255,255,.16);overflow:hidden}
#l3d-boot .bar i{position:absolute;top:0;bottom:0;left:0;width:34%;border-radius:999px;background:linear-gradient(90deg,#46d9b0,#8fe3ff);box-shadow:0 0 12px rgba(127,242,207,.7);animation:l3dBar 1.8s cubic-bezier(.45,0,.55,1) infinite}
#l3d-boot b{font-weight:600;color:#d6dcf2}
@keyframes l3dBar{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
@media (prefers-reduced-motion:reduce){#l3d-boot .bar i{animation:none;width:40%}}</style></head>
<body><div id="l3d-boot"><div class="model"><canvas aria-hidden="true"></canvas></div><div class="hud"><div class="bar"><i></i></div><b>載入 3D 世界…</b></div></div>
<script>${r}
try{window.__l3dBootScene=l3dStartLoading(document.querySelector('#l3d-boot canvas'),null);}catch(e){}<\/script>
<script>(function(){if(window.__l3dBoot)return;window.__l3dBoot=1;var ran=false;function run(code){if(ran)return;ran=true;var s=document.createElement('script');s.textContent=code;document.body.appendChild(s);}
window.__l3dRun=run;addEventListener('message',function(e){var d=e.data;if(e.source===parent&&d&&d.type==='larch:l3d-runtime'&&typeof d.code==='string')run(d.code);});
setTimeout(function(){if(!ran)parent.postMessage({type:'larch:l3d-runtime-wanted',v:'${l}'},'*');},0);})();<\/script>${p}</body></html>`;let o=null;function y(){return o??=fetch(`${v}?v=${l}`).then(e=>{if(!e.ok)throw new Error(`3D runtime ${e.status}`);return e.text()}).catch(e=>{throw o=null,e}),o}const h=/^(vfx|objects\/[a-z0-9-]{2,40})$/,n=new Map;function k(e){if(!h.test(e))return Promise.reject(new Error("unknown 3D library script"));let t=n.get(e);return t||(t=fetch(`/plugins/larch3d/ember/${e}.js?v=${l}`).then(a=>{if(!a.ok)throw new Error(`3D library ${a.status}`);return a.text()}),t.catch(()=>n.delete(e)),n.set(e,t)),t}const R={cover:s(u)};export{b as L,x as a,k as b,R as c,w as d,y as l,g as s};
