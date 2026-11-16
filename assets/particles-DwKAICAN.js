import{s as ge,d as ve,aa as Le,ab as qe,ac as Ie,ad as _e,C as E,V as y,a as we,b as _,G as te,f as D,ae as G,Q as Y,af as We,x as Ee,ag as Fe,k as Te,ah as Ve,ai as Q,aj as J,c as Re,ak as $e}from"./three-engine-BteDTChT.js";import{p as Ge,S as Ue,V as De}from"./post-BjU08tKb.js";import{h as Oe,l as be,G as ye,i as se,j as re,k as xe,r as I,n as Be,s as je,o as Me,q as Se}from"./modelDoc-CZSlftHX.js";const ae="vfx:";let ee=null;function Ke(){const r=Oe();return r?(ee??=r.vfx().catch(()=>(ee=null,null)),ee):Promise.resolve(null)}async function Ze(r,e={}){try{return(await Ke())?.(r,e)??null}catch{return null}}function Ct(r){if(!r||typeof r!="object")return;const e=r;if(typeof e.id!="string"||!/^[a-z0-9-]{2,40}$/.test(e.id))return;const t=e.options&&typeof e.options=="object"?e.options:{},a=(n,c,s)=>{const l=Number(n);return Number.isFinite(l)?Math.max(c,Math.min(s,l)):void 0},o={};typeof t.color=="string"&&/^#[0-9a-f]{6}$/i.test(t.color)&&(o.color=t.color);for(const[n,c,s]of[["size",.1,3],["speed",.1,3],["detail",0,2],["density",0,1],["quantity",1,30],["spread",.2,4]]){const l=a(t[n],c,s);l!==void 0&&(o[n]=l)}return{id:e.id,options:o}}const Xe=[{id:"explosion",name:"爆炸",group:"爆炸",length:1.7,reach:48},{id:"blast",name:"小爆炸",group:"爆炸",length:.8,reach:32},{id:"impact",name:"重擊",group:"爆炸",length:.8,reach:28},{id:"flame",name:"火焰",group:"火",hint:"持續燃燒的聲音",length:2.4,every:1.7,reach:14},{id:"firejet",name:"噴火",group:"火",hint:"持續噴發的聲音",length:2,every:1.4,reach:22},{id:"breath",name:"點燃",group:"火",hint:"一聲轟地燒起來",length:.6,reach:22},{id:"crackle",name:"餘燼",group:"火",hint:"零星的劈啪聲",length:1.5,every:1.4,reach:12},{id:"magic",name:"魔法閃光",group:"魔法",length:.9,reach:24},{id:"magicburst",name:"魔法爆發",group:"魔法",length:1.2,reach:30},{id:"heal",name:"治癒",group:"魔法",length:1.5,reach:18},{id:"hum",name:"魔力低鳴",group:"魔法",hint:"傳送門、光束、結界這類持續的魔法",length:3,every:2.2,reach:14},{id:"morph",name:"變身",group:"魔法",length:.7,reach:22},{id:"levelup",name:"升級",group:"魔法",length:.7,reach:24},{id:"zap",name:"電光",group:"自然",hint:"滋滋的電流",length:.5,reach:22},{id:"lightning",name:"雷電",group:"自然",hint:"落雷的一聲巨響",length:1.9,reach:60},{id:"thunder",name:"遠雷",group:"自然",hint:"遠遠的隆隆聲",length:2.5,reach:60},{id:"ice",name:"冰",group:"自然",hint:"冰晶碎裂",length:1,reach:24},{id:"splash",name:"水花",group:"自然",length:.4,reach:20},{id:"bubbles",name:"氣泡",group:"自然",hint:"持續冒泡的聲音",length:1.2,every:1.2,reach:10},{id:"rain",name:"雨",group:"自然",hint:"持續的雨聲",length:3,every:2.1,reach:40},{id:"wind",name:"風",group:"自然",hint:"持續的風聲",length:3,every:2.1,reach:26},{id:"swoosh",name:"一陣風",group:"自然",length:.4,reach:18},{id:"poison",name:"毒",group:"自然",hint:"冒泡的毒液",length:1.1,reach:18},{id:"goo",name:"黏液",group:"自然",length:.4,reach:16},{id:"puff",name:"煙",group:"自然",hint:"噗地冒出一團煙",length:1,reach:16},{id:"coins",name:"金幣",group:"閃亮",hint:"一陣金幣叮叮噹噹",length:.5,reach:22},{id:"coin",name:"一枚金幣",group:"閃亮",length:.3,reach:18},{id:"sparkle",name:"星星",group:"閃亮",length:.4,reach:14},{id:"chime",name:"叮",group:"閃亮",length:.6,reach:20},{id:"confetti",name:"彩帶",group:"閃亮",length:.9,reach:24},{id:"heart",name:"愛心",group:"閃亮",length:.7,reach:16},{id:"slash",name:"斬擊",group:"動作",length:.3,reach:18},{id:"whoosh",name:"咻",group:"動作",length:.4,reach:18},{id:"pop",name:"啵",group:"動作",length:.1,reach:14},{id:"gulp",name:"吞下",group:"動作",length:.3,reach:14}],He=new Map(Xe.map(r=>[r.id,r])),ne=r=>r?He.get(r):void 0,Ye=24,Qe=3,U=r=>r.url||r.id||"",ze=r=>ne(r.id)?.reach??Ye;function Je(r,e=0){const t=ne(r.id);return t?.every?t.every:Math.max(Qe,(t?.length??2)+1.5,e)*(1+Math.random()*.4)}function Pt(r,e){const t=ze(r);return e>=t?0:r.volume*(e<=2?1:Math.pow(1-(e-2)/(t-2),1.6))}function Nt(r){if(!r||typeof r!="object")return;const e=r,t=(o,n,c)=>{const s=Number(o);return Number.isFinite(s)?Math.max(0,Math.min(c,s)):n},a={volume:t(e.volume,1,1),delay:t(e.delay,0,2)};return typeof e.url=="string"&&e.url.length<2e3&&/^(https:\/\/|\/)/.test(e.url)?{url:e.url,...typeof e.name=="string"&&e.name?{name:e.name.slice(0,80)}:{},...a}:ne(e.id)?{id:e.id,...a}:void 0}const et={fire:["flame"],coins:["coins"],ink:["goo",.7],"magic-burst":["magicburst"],heal:["heal",.8],sparks:["zap"],slash:["slash"],portal:["hum"],confetti:["confetti"],frost:["ice"],splash:["splash"],goo:["goo"],hearts:["heart"],"level-up":["levelup"],dust:["puff",.7],eat:["gulp"],"fire-breath":["firejet"],rain:["rain"],bubbles:["bubbles",.8],embers:["crackle"]},tt={"ice-shard":"ice","ice-shatter":"ice","frost-lance-rain":"ice","frost-field":"ice","frost-wheel":"ice","venom-stream":"poison","venom-pool":"poison","arcane-matrix":"hum","arcane-missile":"magic","shadow-glaive":"slash","prism-parry":"chime","prism-guard":"chime","continuous-beam":"hum","astral-convergence":"magicburst","astral-gate":"hum","dust-devil":"wind","healing-field":"heal","quicksand-seal":"wind","smoke-puff":"puff","tidal-surge":"splash","flame-surge":"firejet","fire-vortex":"flame","fire-explosion":"explosion",fireball:"breath","magma-fissure":"blast","burning-ground":"flame","revival-bloom":"heal","binding-curse":"hum","radiant-beam":"hum","energy-vortex":"hum","energy-burst":"zap","pulse-beam":"hum","thorn-crown":"magic","steam-jet":"puff","charged-beam":"zap","spiral-gale":"swoosh",shockwave:"explosion","storm-enchant":"zap","thunder-strike":"lightning","arc-ray":"zap","plasma-bolt":"zap","soul-siphon":"hum","wind-vortex":"wind","magic-barrier":"hum"};function le(r){const e=et[r];return e?{id:e[0],volume:e[1]??1,delay:0}:void 0}function ce(r){const e=tt[r];return e?{id:e,volume:1,delay:0}:void 0}let W=null;function ke(){if(W)return W;const r=512,e=r/2,t=document.createElement("canvas");t.width=t.height=r;const a=t.getContext("2d"),o=(n,c,s,l)=>{const h=I(s),m=n+e/2,g=c+e/2,v=l?90:22;for(let f=0;f<v;f++){const i=h()*Math.PI*2,d=Math.pow(h(),.7)*e*(l?.36:.3),p=m+Math.cos(i)*d,b=g+Math.sin(i)*d,u=l?e*(.16+h()*.1):e*(.17+h()*.11),x=l?e*.016:u*(.42+h()*.16),w=l?i+(h()-.5)*.5:i+Math.PI/2+(h()-.5)*1.3,M=Math.round(150+h()*105);a.save(),a.translate(p,b),a.rotate(w),a.fillStyle=`rgb(${M},${M},${M})`,a.beginPath(),a.moveTo(0,-u/2),a.quadraticCurveTo(x,-u*.05,0,u/2),a.quadraticCurveTo(-x,-u*.05,0,-u/2),a.fill(),l||(a.fillStyle="rgba(255,255,255,.18)",a.beginPath(),a.moveTo(0,-u/2),a.quadraticCurveTo(x,-u*.05,0,u/2),a.closePath(),a.fill(),a.strokeStyle="rgba(0,0,0,.16)",a.lineWidth=e*.006,a.beginPath(),a.moveTo(0,-u*.45),a.lineTo(0,u*.45),a.stroke()),a.restore()}};return o(0,0,11,!1),o(e,0,23,!1),o(0,e,37,!1),o(e,e,51,!0),W=new Le(t),W.colorSpace=qe,W.generateMipmaps=!0,W.minFilter=Ie,W.magFilter=_e,W.anisotropy=4,W}const O={tree:{dark:"#21503b",mid:"#468a48",light:"#7db862",warm:"#a7c978"},blossom:{dark:"#b9557f",mid:"#f19ab8",light:"#ffe2ec",warm:"#fff0d8"},autumn:{dark:"#8f3c1f",mid:"#e0782f",light:"#ffc95a",warm:"#ffe08a"},birch:{dark:"#46783c",mid:"#82b758",light:"#c2dd88",warm:"#dde29c"},bush:{dark:"#265839",mid:"#4a8c46",light:"#7eb862",warm:"#a5c777"},pine:{dark:"#123827",mid:"#25603d",light:"#5b9a58",warm:"#9cbf6a"}};class at{pos=[];corner=[];card=[];nor=[];col=[];idx=[];add(e,t,a,o,n,c,s,l,h){const m=this.pos.length/3,g=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[v,f]of g)this.pos.push(e.x,e.y,e.z),this.corner.push(v,f),this.card.push(a,o,s+n,c),this.nor.push(t.x,t.y,t.z),this.col.push(l.r,l.g,l.b,h);this.idx.push(m,m+1,m+2,m,m+2,m+3)}build(){const e=new we;return e.setAttribute("position",new _(new Float32Array(this.pos),3)),e.setAttribute("aCorner",new _(new Float32Array(this.corner),2)),e.setAttribute("aCard",new _(new Float32Array(this.card),4)),e.setAttribute("normal",new _(new Float32Array(this.nor),3)),e.setAttribute("aTint",new _(new Float32Array(this.col),4)),e.setIndex(this.idx),e.computeBoundingSphere(),e.boundingSphere&&(e.boundingSphere.radius+=1.2),e.computeBoundingBox(),e}}function ie(r,e,t,a,o,n={}){const c=new at,s=I(o*131+7),l=new E(a.dark),h=new E(a.mid),m=new E(a.light),g=new E(a.warm||a.light),v=n.quadrants??[0,1,2],f=new E;for(const i of r){const d=Math.max(10,Math.round(i.r*i.r*58*(n.density??1)));for(let p=0;p<d;p++){const b=new y(s()*2-1,s()*2-.7,s()*2-1);b.lengthSq()<1e-4&&b.set(0,1,0),b.normalize();const u=.38+.62*Math.sqrt(s()),x=i.c.clone().addScaledVector(b,i.r*u),w=x.clone().sub(e),M=w.length()/Math.max(t,.01),S=b.clone().multiplyScalar(.55).add(w.normalize().multiplyScalar(.45)).normalize(),A=S.y*.5+.5,P=Math.min(1,Math.max(0,A*.55+u*.35+(s()-.5)*.25));f.copy(l).lerp(h,Math.min(1,P*1.6)).lerp(m,Math.max(0,P*1.6-.6)),S.y>.55&&s()<.4&&f.lerp(g,.35);const N=1+(s()-.5)*.14;f.multiplyScalar(N);const L=Math.min(1,u*.55+A*.35+Math.min(1,M)*.2),k=i.r*(n.size??.46)*(.75+s()*.5),q=Math.max(0,x.y)*(n.swayScale??.08);c.add(x,S,k,s()*Math.PI*2,s()*.99,L,v[Math.floor(s()*v.length)],f.clone(),q)}}return c.build()}const ot=`
${se}
${re}
attribute vec2 aCorner;
attribute vec4 aCard;
attribute vec4 aTint;
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying vec2 vUv;
varying float vAo;
varying float vRand;
void main() {
  mat4 inst = mat4(1.);
  #ifdef USE_INSTANCING
    inst = instanceMatrix;
  #endif
  float scale = length(inst[0].xyz);
  vec4 root = modelMatrix * inst * vec4(0., 0., 0., 1.);
  vec4 centerW = modelMatrix * inst * vec4(position, 1.);
  // The crown leans with gusts (more toward the top), each card flutters on its own.
  vec2 w = l3dWind(root.xz, 1.) * aTint.w * scale * .55;
  centerW.xz += w;
  float rnd = fract(aCard.z);
  float flutter = sin(uTime * (2.2 + rnd * 2.) + rnd * 40.) * .12 * (.35 + uWindStrength);
  float ang = aCard.y + flutter;
  vec2 c = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (aCorner * aCard.x * scale);
  // Spread the card across the camera's right and up axes (billboard), nudged toward the camera.
  vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 camUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 camBack = vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
  centerW.xyz += camRight * c.x + camUp * c.y + camBack * aCard.x * scale * .15;
  vec4 mv = viewMatrix * centerW;
  vec3 transformed = position;
  vec3 objectNormal = normal;
  vec4 l3dWorldPos = centerW;
  vec3 l3dWorldNormal = normalize(mat3(modelMatrix) * mat3(inst) * objectNormal);
  vWorldPos = l3dWorldPos.xyz;
  vNormal = l3dWorldNormal;
  vColor = aTint.rgb;
  #ifdef USE_INSTANCING_COLOR
    vColor *= instanceColor;
  #endif
  float quad = floor(aCard.z);
  vUv = (aCorner * .5 + .5) * .5 + vec2(mod(quad, 2.), floor(quad / 2.)) * .5;
  vAo = aCard.w;
  vRand = rnd;
  gl_Position = projectionMatrix * mv;
  ${xe}
}
`,st=`
${ye}
uniform sampler2D tLeaf;
uniform float uA2C;
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying vec2 vUv;
varying float vAo;
varying float vRand;
void main() {
  vec4 leaf = texture(tLeaf, vUv);
  // Keep coverage stable at every distance (sharpen alpha by its own derivative).
  float a = (leaf.a - .45) / max(fwidth(leaf.a), 1e-3) + .5;
  if (uA2C < .5 && a < .5) discard;
  if (a <= 0.) discard;
  vec3 n = normalize(vNormal);
  vec3 v = normalize(cameraPosition - vWorldPos);
  float shadow = l3dSunShadowFast() * l3dCloudShadow(vWorldPos);
  vec3 col = vColor * (.72 + leaf.r * .42) * mix(1., .85, uWetness);
  // Snow caps the crowns.
  col = mix(col, vec3(.92, .95, 1.), uSnowCover * smoothstep(.15, .75, n.y) * smoothstep(.35, .8, leaf.r + .3) * .85);
  float ndl = dot(n, uSunDir);
  // Soft wrap light on the round crown, cool blue-green shade, warm glow through backlit leaves.
  float diff = smoothstep(-.35, .85, ndl);
  vec3 lit = col * (uSunColor * diff * shadow * .95 + l3dAmbient(n) * mix(.42, 1.05, vAo));
  lit += col * uSunColor * l3dTranslucency(n, v, 2.) * (.35 + .65 * shadow) * .5;
  lit += uSunColor * pow(max(dot(reflect(-uSunDir, n), v), 0.), 24.) * .05 * shadow;
  lit += l3dPoints(col, n, vWorldPos);
  lit = l3dFog(lit, vWorldPos);
  gl_FragColor = vec4(lit, clamp(a, 0., 1.));
}
`;function rt(r,e){const t=be(r,{uniforms:{tLeaf:{value:ke()},uA2C:{value:e?1:0}},vertexShader:ot,fragmentShader:st,side:ge});return t.alphaToCoverage=e,t}function nt(r){return new ve({uniforms:{...r,tLeaf:{value:ke()}},vertexShader:`
      ${se.replace("#include <shadowmap_pars_vertex>","")}
      ${re}
      attribute vec2 aCorner; attribute vec4 aCard; attribute vec4 aTint;
      varying vec2 vUv;
      void main() {
        mat4 inst = mat4(1.);
        #ifdef USE_INSTANCING
          inst = instanceMatrix;
        #endif
        float scale = length(inst[0].xyz);
        vec4 root = modelMatrix * inst * vec4(0., 0., 0., 1.);
        vec4 centerW = modelMatrix * inst * vec4(position, 1.);
        centerW.xz += l3dWind(root.xz, 1.) * aTint.w * scale * .55;
        vec4 mv = viewMatrix * centerW;
        float ang = aCard.y;
        mv.xy += mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * aCorner * aCard.x * scale;
        float quad = floor(aCard.z);
        vUv = (aCorner * .5 + .5) * .5 + vec2(mod(quad, 2.), floor(quad / 2.)) * .5;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D tLeaf; varying vec2 vUv;
      void main() { if (texture(tLeaf, vUv).a < .5) discard; gl_FragColor = vec4(1.); }`,side:ge})}const Lt=["tree","blossom","autumn","pine","birch","bush","rock","boulder","palm","mushroom","kelp","seagrass"],de=["kelp","seagrass"],he=4,it=64,ue=45;class V{pos=[];nor=[];col=[];part=[];sway=[];idx=[];add(e,t,a,o,n,c){const s=this.pos.length/3;for(let l=0;l<e.length;l+=3)this.pos.push(e[l],e[l+1],e[l+2]),this.nor.push(t[l],t[l+1],t[l+2]),this.col.push(a[l],a[l+1],a[l+2]),this.part.push(n),this.sway.push(c(e[l+1],e[l],e[l+2]));for(const l of o)this.idx.push(s+l)}build(){const e=new we;return e.setAttribute("position",new _(new Float32Array(this.pos),3)),e.setAttribute("normal",new _(new Float32Array(this.nor),3)),e.setAttribute("color",new _(new Float32Array(this.col),3)),e.setAttribute("aPart",new _(new Float32Array(this.part),1)),e.setAttribute("aSway",new _(new Float32Array(this.sway),1)),e.setIndex(this.idx),e.computeBoundingSphere(),e.computeBoundingBox(),e}}function j(r){const e=(1+Math.sqrt(5))/2;let t=[[-1,e,0],[1,e,0],[-1,-e,0],[1,-e,0],[0,-1,e],[0,1,e],[0,-1,-e],[0,1,-e],[e,0,-1],[e,0,1],[-e,0,-1],[-e,0,1]].map(o=>{const n=Math.hypot(o[0],o[1],o[2]);return[o[0]/n,o[1]/n,o[2]/n]}),a=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];for(let o=0;o<r;o++){const n=new Map,c=(l,h)=>{const m=l<h?`${l}_${h}`:`${h}_${l}`,g=n.get(m);if(g!==void 0)return g;const v=t[l],f=t[h],i=[(v[0]+f[0])/2,(v[1]+f[1])/2,(v[2]+f[2])/2],d=Math.hypot(i[0],i[1],i[2]);return t.push([i[0]/d,i[1]/d,i[2]/d]),n.set(m,t.length-1),t.length-1},s=[];for(const[l,h,m]of a){const g=c(l,h),v=c(h,m),f=c(m,l);s.push([l,g,f],[h,v,g],[m,f,v],[g,v,f])}a=s}return t=t.slice(),{positions:t.flat(),indices:a.flat()}}function T(r,e,t,a){const o=(d,p,b)=>{let u=Math.imul(d,374761393)+Math.imul(p,668265263)+Math.imul(b,1440662683)+Math.imul(a,2246822519);return u=Math.imul(u^u>>>13,1274126177),((u^u>>>16)>>>0)/4294967296},n=Math.floor(r),c=Math.floor(e),s=Math.floor(t),l=r-n,h=e-c,m=t-s,g=l*l*(3-2*l),v=h*h*(3-2*h),f=m*m*(3-2*m),i=(d,p,b)=>d+(p-d)*b;return i(i(i(o(n,c,s),o(n+1,c,s),g),i(o(n,c+1,s),o(n+1,c+1,s),g),v),i(i(o(n,c,s+1),o(n+1,c,s+1),g),i(o(n,c+1,s+1),o(n+1,c+1,s+1),g),v),f)}const C=r=>new E(r);function Ae(r,e,t,a,o,n,c,s,l,h,m,g=.22){const v=j(l),f=[],i=[],d=[];for(let p=0;p<v.positions.length;p+=3){const b=v.positions[p],u=v.positions[p+1],x=v.positions[p+2],w=T(b*2.2+n,u*2.2,x*2.2,n)-.5,M=T(b*5.1+n*.3,u*5.1,x*5.1,n+7)-.5,S=1+w*g*2+M*g*.6,A=e.x+b*t.x*S,P=e.y+u*t.y*S,N=e.z+x*t.z*S;f.push(A,P,N);const L=A-a.x,k=(P-a.y)*1.15,q=N-a.z,F=Math.hypot(L,k,q)||1;let K=b*.45+L/F*.55,$=u*.45+k/F*.55,Z=x*.45+q/F*.55;const X=Math.hypot(K,$,Z)||1;K/=X,$/=X,Z/=X,i.push(K,$,Z);const Ce=Math.min(1,F/o),Pe=($+1)/2,Ne=Math.max(0,Math.min(1,Ce*.55+Pe*.55-.12+M*.3)),H=c.clone().lerp(s,Ne);d.push(H.r,H.g,H.b)}r.add(f,i,d,v.indices,h,p=>Math.max(0,p)*m)}function R(r,e,t,a,o,n,c,s=7,l=5){const h=I(c),m=t.clone().sub(e),g=m.length();m.normalize();const v=Math.abs(m.y)<.9?new y(0,1,0).cross(m).normalize():new y(1,0,0),f=m.clone().cross(v).normalize(),i=new y((h()-.5)*.3,0,(h()-.5)*.3).multiplyScalar(g),d=[],p=[],b=[],u=[];for(let x=0;x<=l;x++){const w=x/l,M=e.clone().addScaledVector(m,g*w).addScaledVector(i,Math.sin(w*Math.PI)*.5),S=a+(o-a)*w,A=x===0?1.35:1;for(let P=0;P<s;P++){const N=P/s*Math.PI*2,L=v.clone().multiplyScalar(Math.cos(N)).addScaledVector(f,Math.sin(N)),k=1+(T(Math.cos(N)*2,w*4,Math.sin(N)*2,c)-.5)*.25,q=M.clone().addScaledVector(L,S*A*k);d.push(q.x,q.y,q.z),p.push(L.x,L.y,L.z);const F=.78+.22*w+(T(N*3,w*9,0,c+3)-.5)*.2;b.push(n.r*F,n.g*F,n.b*F)}}for(let x=0;x<l;x++)for(let w=0;w<s;w++){const M=x*s+w,S=x*s+(w+1)%s,A=M+s,P=S+s;u.push(M,A,S,S,A,P)}r.add(d,p,b,u,0,x=>Math.max(0,x)*.02)}const lt={tree:{dark:"#1f4a24",light:"#86b94a",bark:"#6a4a35",height:[2.4,3.4],crown:[1.9,2.6],blobs:[5,8]},blossom:{dark:"#c95f8a",light:"#ffd3e2",bark:"#5d4436",height:[2.2,3],crown:[1.8,2.4],blobs:[5,8]},autumn:{dark:"#a3451f",light:"#ffbf4a",bark:"#5e4433",height:[2.4,3.2],crown:[1.8,2.5],blobs:[5,7]},birch:{dark:"#4f7d2a",light:"#c7e07a",bark:"#e8e2d6",height:[3.4,4.4],crown:[1.4,1.9],blobs:[4,6]}};function ct(r,e){const t=lt[r],a=I(e*977+13),o=new V,n=t.height[0]+a()*(t.height[1]-t.height[0]),c=t.crown[0]+a()*(t.crown[1]-t.crown[0]),s=C(t.bark),l=new y((a()-.5)*.4,n,(a()-.5)*.4);R(o,new y(0,-.15,0),l,.2*(r==="birch"?.7:1),.11,s,e);const h=new y(l.x,n+c*.5,l.z);for(let i=0;i<3;i++){const d=a()*Math.PI*2,p=new y(l.x*.6,n*(.55+a()*.2),l.z*.6);R(o,p,new y(Math.cos(d)*c*.55,n+c*.3,Math.sin(d)*c*.55),.08,.045,s,e+i*31,5,3)}const m=[{c:h.clone(),r:c*.78}],g=Math.round(t.blobs[0]+a()*(t.blobs[1]-t.blobs[0]));for(let i=0;i<g;i++){const d=i/g*Math.PI*2+a()*.6,p=c*(.5+a()*.22);m.push({c:new y(h.x+Math.cos(d)*p,h.y+(a()-.4)*c*.8,h.z+Math.sin(d)*p),r:c*(.42+a()*.22)})}m.push({c:new y(h.x+(a()-.5)*.4,h.y+c*.55,h.z+(a()-.5)*.4),r:c*.48});const v=O[r]??O.tree,f=C(v.dark).multiplyScalar(.7);for(const i of m)Ae(o,i.c,new y(i.r*.62,i.r*.55,i.r*.62),h,c,e+Math.round(i.c.x*100),f,C(v.dark),1,1,.08,.12);return{solid:o.build(),cards:ie(m,h,c,v,e,{quadrants:[0,1,2]})}}function dt(r){const e=I(r*733+5),t=new V,a=4+e()*2.2;R(t,new y(0,-.15,0),new y(0,a*.62,0),.2,.1,C("#5a3f2c"),r);const o=O.pine,n=5+Math.floor(e()*2),c=[];for(let s=0;s<n;s++){const l=s/(n-1),h=(1.7-l*1.35)*(.92+e()*.16),m=a*(.34+l*.62),g=j(1),v=[],f=[],i=[];for(let p=0;p<g.positions.length;p+=3){const b=g.positions[p],u=g.positions[p+1],x=g.positions[p+2],w=u>0?1-u:1+u*.3,M=h*.72*Math.max(.05,w);v.push(b*M,m+u*h*.55+(u>0?h*.3:0),x*M),f.push(b,.5,x);const S=C(o.dark).multiplyScalar(.75);i.push(S.r,S.g,S.b)}t.add(v,f,i,g.indices,1,p=>Math.max(0,p)*.05);const d=Math.max(5,Math.round(h*7));for(let p=0;p<d;p++){const b=p/d*Math.PI*2+e()*.5;c.push({c:new y(Math.cos(b)*h*.7,m+(e()-.3)*.3,Math.sin(b)*h*.7),r:.42+h*.18})}c.push({c:new y(0,m+h*.55,0),r:.3+h*.25})}return{solid:t.build(),cards:ie(c,new y(0,a*.7,0),a*.5,o,r,{quadrants:[3],size:.7,density:.9,swayScale:.05})}}function ht(r){const e=I(r*557+9),t=new V,a=.78+e()*.45,o=new y(0,a*.5,0),n=O.bush,c=[{c:o.clone(),r:a*.85}];for(let s=0;s<3;s++){const l=e()*Math.PI*2;c.push({c:new y(Math.cos(l)*a*.55,a*.38+e()*a*.3,Math.sin(l)*a*.55),r:a*(.5+e()*.2)})}for(const s of c)Ae(t,s.c,new y(s.r*.7,s.r*.6,s.r*.7),o,a,r+Math.round(s.c.x*100),C(n.dark).multiplyScalar(.7),C(n.dark),1,1,.1,.12);return{solid:t.build(),cards:ie(c,o,a,n,r,{quadrants:[0,1,2],size:.66,swayScale:.1})}}function fe(r,e){const t=I(r*331+17),a=new V,o=j(e?3:2),n=(e?1.6:.7)*(.8+t()*.5),c=(e?1.2:.45)*(.7+t()*.5),s=(e?1.4:.6)*(.8+t()*.5),l=[],h=[],m=[],g=C("#9a9284"),v=C("#6e675e"),f=C("#6f9a3a");for(let d=0;d<o.positions.length;d+=3){const p=o.positions[d],b=o.positions[d+1],u=o.positions[d+2],x=T(p*1.6+r,b*1.6,u*1.6,r),w=T(p*4,b*4,u*4,r+1),M=.78+x*.38+w*.1;let S=b*c*M;S<-c*.25&&(S=-c*.25+(S+c*.25)*.2),l.push(p*n*M,S+c*.2,u*s*M),h.push(p,b,u);const A=Math.max(0,b-.35)*1.6*(T(p*3,b*3,u*3,r+5)+.3),P=v.clone().lerp(g,.45+w*.5).lerp(f,Math.min(.85,A));m.push(P.r,P.g,P.b)}a.add(l,h,m,o.indices,2,()=>0);const i=a.build();return i.computeVertexNormals(),i}function ut(r){const e=I(r*211+3),t=new V,a=4.2+e()*1.5,o=new y((e()-.5)*1.6,0,(e()-.5)*1.6),n=new y(o.x,a,o.z);R(t,new y(0,-.1,0),n,.2,.13,C("#8a6a48"),r,7,8);const c=C("#2f6b2a"),s=C("#8fcf5a"),l=7+Math.floor(e()*3);for(let h=0;h<l;h++){const m=h/l*Math.PI*2+e()*.3,g=2.2+e()*.6,v=[],f=[],i=[],d=[],p=7;for(let b=0;b<=p;b++){const u=b/p,x=Math.sin(u*Math.PI*.9)*.9-u*u*1.4,w=n.x+Math.cos(m)*g*u,M=n.y+x,S=n.z+Math.sin(m)*g*u,A=Math.sin(u*Math.PI)*.45+.04,P=-Math.sin(m)*A,N=Math.cos(m)*A;v.push(w+P,M-.05,S+N,w,M+.06,S,w-P,M-.05,S-N);for(let k=0;k<3;k++)f.push(0,1,0);const L=c.clone().lerp(s,.3+u*.6);for(let k=0;k<3;k++)i.push(L.r,L.g,L.b);if(b>0){const k=b*3,q=k-3;d.push(q,k,q+1,q+1,k,k+1,q+1,k+1,q+2,q+2,k+1,k+2)}}t.add(v,f,i,d,1,b=>Math.max(0,b)*.05)}return t.build()}function ft(r){const e=I(r*97+1),t=new V,a=.5+e()*.35,o=.45+e()*.25;R(t,new y(0,-.05,0),new y(0,a,0),.12,.1,C("#f1e6d2"),r,7,3);const n=j(2),c=[],s=[],l=[],h=C(e()>.5?"#e0533d":"#c86ad8"),m=C("#fff7ea");for(let g=0;g<n.positions.length;g+=3){const v=n.positions[g],f=n.positions[g+1],i=n.positions[g+2],d=f>0?f:f*.25;c.push(v*o,a+d*o*.75,i*o),s.push(v,f,i);const p=T(v*4.5,f*4.5,i*4.5,r)>.72&&f>.1,b=f<0?C("#f3e2c4"):p?m:h;l.push(b.r,b.g,b.b)}return t.add(c,s,l,n.indices,2,()=>0),t.build()}function oe(r,e,t,a,o,n,c){const s=[],l=[],h=[],m=[],g=e.length;for(let i=0;i<g;i++){const d=i/(g-1),p=e[i],u=e[Math.min(g-1,i+1)].clone().sub(e[Math.max(0,i-1)]).normalize().clone().cross(a).normalize(),x=t(d)/2,w=o.clone().lerp(n,d);for(const M of[-1,1])s.push(p.x+a.x*x*M,p.y+a.y*x*M,p.z+a.z*x*M),l.push(u.x,u.y,u.z),h.push(w.r,w.g,w.b)}for(let i=0;i+1<g;i++){const d=i*2;m.push(d,d+1,d+2,d+1,d+3,d+2)}r.add(s,l,h,m,3,i=>Math.max(0,i)*c);const v=l.map(i=>-i),f=[];for(let i=0;i+1<g;i++){const d=i*2;f.push(d,d+2,d+1,d+1,d+2,d+3)}r.add(s,v,h,f,3,i=>Math.max(0,i)*c)}function pt(r){const e=I(r*131+7),t=new V,a=3+Math.floor(e()*3),o=C("#5f7a24"),n=C("#b7c45a"),c=C("#7c6a26");for(let s=0;s<a;s++){const l=e()*Math.PI*2,h=e()*.4,m=Math.cos(l)*h,g=Math.sin(l)*h,v=2.4+e()*2.6,f=e()*Math.PI*2,i=u=>new y(m+Math.cos(f)*u*u*.5+Math.sin(u*5+s)*.08,u*v,g+Math.sin(f)*u*u*.5),d=Array.from({length:9},(u,x)=>i(x/8)),p=new y(Math.cos(f+1.4),0,Math.sin(f+1.4));oe(t,d,()=>.05,p,o,c,.32);const b=6+Math.floor(e()*4);for(let u=0;u<b;u++){const x=.18+u/b*.78,w=i(x),M=u%2?1:-1,S=new y(Math.cos(f+M*1.2+e()*.4),0,Math.sin(f+M*1.2+e()*.4)),A=.5+e()*.45,P=Array.from({length:5},(N,L)=>{const k=L/4;return w.clone().addScaledVector(S,k*A*.7).add(new y(0,k*A*.6,0)).addScaledVector(p,Math.sin(k*6+u)*.05)});oe(t,P,N=>.16*Math.sin(Math.PI*Math.min(1,.15+N*.9))+.02,p.clone().multiplyScalar(1).add(new y(0,.25,0)).normalize(),o.clone().lerp(n,x*.5),n,.32)}}return t.build()}function mt(r){const e=I(r*173+11),t=new V,a=14+Math.floor(e()*8),o=C("#2f7a3c"),n=C("#8fd06a");for(let c=0;c<a;c++){const s=e()*Math.PI*2,l=e()*.28,h=.35+e()*.55,m=.15+e()*.3,g=new y(Math.cos(s),0,Math.sin(s)),v=Array.from({length:5},(i,d)=>{const p=d/4;return new y(Math.cos(s)*l,0,Math.sin(s)*l).addScaledVector(g,p*p*m).add(new y(0,p*h,0))}),f=new y(-g.z,0,g.x);oe(t,v,i=>.045*(1-i*.8),f,o,n,.9)}return t.build()}const pe=new Map;function me(r,e){const t=`${r}:${e}`,a=pe.get(t);if(a)return a;const o=e*101+r.length*7+1,n=r==="pine"?dt(o):r==="bush"?ht(o):r==="rock"?{solid:fe(o,!1)}:r==="boulder"?{solid:fe(o,!0)}:r==="palm"?{solid:ut(o)}:r==="mushroom"?{solid:ft(o)}:r==="kelp"?{solid:pt(o)}:r==="seagrass"?{solid:mt(o)}:ct(r,o);return pe.set(t,n),n}const qt={tree:.35,blossom:.35,autumn:.35,birch:.3,pine:.4,bush:.9,rock:.6,boulder:1.5,palm:.3,mushroom:.3,kelp:0,seagrass:0};class It{group=new te;material;cardMaterial;cardDepth;meshes=new Map;born=new Map;growing=[];time=0;first=!0;seaShadows=!0;constructor(e,t=!0){this.material=be(e,{vertexShader:gt,fragmentShader:vt,vertexColors:!0}),this.cardMaterial=rt(e,t),this.cardDepth=nt(e),this.group.name="l3d-foliage"}setSeaShadows(e){if(e!==this.seaShadows){this.seaShadows=e;for(const[t,a]of this.meshes)if(de.includes(t.split(":")[0]))for(const o of a)o.castShadow=e}}setMsaa(e){this.cardMaterial.alphaToCoverage=e,this.cardMaterial.uniforms.uA2C.value=e?1:0}signatures=new Map;set(e){const t=i=>`${i.kind}:${Math.round(i.x*20)}:${Math.round(i.z*20)}`,a=new Map;for(const i of e){const d=t(i);a.set(d,this.born.get(d)??(this.first?-100:this.time+Math.random()*.12))}this.born=a,this.first=!1;const o=new Map;e.forEach((i,d)=>{const p=i.variant??Math.abs(Math.round(i.x*7.31+i.z*3.17+d))%he,b=`${i.kind}:${p%he}`,u=o.get(b)??[];u.push(i),o.set(b,u)});const n=new Map;for(const[i,d]of o){if(d.length<it){n.set(i,d);continue}for(const p of d){const b=`${i}:${Math.floor(p.x/ue)}:${Math.floor(p.z/ue)}`,u=n.get(b)??[];u.push(p),n.set(b,u)}}const c=i=>i.map(d=>`${t(d)}:${Math.round(d.y*20)}:${Math.round(d.rot*100)}:${Math.round(d.scale*100)}:${d.tint??""}`).join("|"),s=new Map;for(const[i,d]of n)s.set(i,c(d));for(const[i,d]of this.meshes)if(s.get(i)!==this.signatures.get(i)){for(const p of d)this.group.remove(p),p.dispose();this.meshes.delete(i)}this.signatures=s,this.growing=this.growing.filter(i=>i.meshes.every(d=>d.parent===this.group));const l=new D,h=new Y,m=new y,g=new y,v=new y(0,1,0),f=new E;for(const[i,d]of n){if(this.meshes.has(i))continue;const[p,b]=i.split(":"),u=me(p,Number(b)),x=[je(new G(u.solid,this.material,d.length))];if(u.cards){const w=new G(u.cards,this.cardMaterial,d.length);w.customDepthMaterial=this.cardDepth,x.push(w)}d.forEach((w,M)=>{h.setFromAxisAngle(v,w.rot),m.set(w.x,w.y,w.z),g.setScalar(w.scale),l.compose(m,h,g);const S=w.tint??(Math.sin(w.x*12.9898+w.z*78.233)*43758.5453%1+1)%1;f.setRGB(.9+S*.2,.92+S*.16,.9+(1-S)*.16);for(const A of x)A.setMatrixAt(M,l),A.setColorAt(M,f)});for(const w of x)w.castShadow=this.seaShadows||!de.includes(p),w.receiveShadow=!0,w.computeBoundingSphere(),w.boundingSphere&&(w.boundingSphere.radius+=2),w.name=i,this.group.add(w);d.forEach((w,M)=>{const S=this.born.get(t(w))??-100;if(!(this.time-S>=1.6)){this.growing.push({meshes:x,index:M,inst:w,born:S}),h.setFromAxisAngle(v,w.rot),l.compose(m.set(w.x,w.y,w.z),h,g.setScalar(.001));for(const A of x)A.setMatrixAt(M,l)}}),this.meshes.set(i,x)}}standIns(){const e=new te,t=new D().compose(new y(0,-500,0),new Y,new y(.001,.001,.001)),a=new E(1,1,1);for(const o of["tree","pine","rock"]){const n=me(o,0),c=[new G(n.solid,this.material,1)];if(n.cards){const s=new G(n.cards,this.cardMaterial,1);s.customDepthMaterial=this.cardDepth,c.push(s)}for(const s of c)s.setMatrixAt(0,t),s.setColorAt(0,a),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1,e.add(s)}return e}update(e){if(this.time+=e,!this.growing.length)return;const t=new D,a=new Y,o=new y,n=new y,c=new y(0,1,0),s=new Set;this.growing=this.growing.filter(l=>{const h=this.time-l.born,m=h>=1.6?1:Math.max(.001,Ge(h,0,Ue.pop)),g=1+(m-1)*.6;a.setFromAxisAngle(c,l.inst.rot),o.set(l.inst.x,l.inst.y,l.inst.z),n.set(l.inst.scale*m/Math.sqrt(Math.max(.2,g)),l.inst.scale*m*g,l.inst.scale*m/Math.sqrt(Math.max(.2,g))),t.compose(o,a,n);for(const v of l.meshes)v.setMatrixAt(l.index,t),s.add(v);return h<1.6});for(const l of s)l.instanceMatrix.needsUpdate=!0}dispose(){for(const e of this.meshes.values())for(const t of e)t.dispose();this.material.dispose(),this.cardMaterial.dispose(),this.cardDepth.dispose()}}const gt=`
${se}
${re}
attribute float aPart;
attribute float aSway;
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying float vPart;
varying vec3 vLocal;
void main() {
  vec3 transformed = position;
  vec3 objectNormal = normal;
  mat4 inst = mat4(1.);
  #ifdef USE_INSTANCING
    inst = instanceMatrix;
  #endif
  vec4 root = modelMatrix * inst * vec4(0., 0., 0., 1.);
  // Sway: the whole crown leans with gusts; leaves flutter on top.
  vec2 w = l3dWind(root.xz, 1.);
  vec3 offset = vec3(w.x, 0., w.y) * aSway * .55;
  if (aPart > .5 && aPart < 1.5) {
    float f = sin(uTime * 4.2 + dot(position, vec3(3.1, 2.3, 4.7))) * .02 * (.4 + uWindStrength);
    offset += normal * f;
  }
  if (aPart > 2.5) {
    // Sea plants: no wind down there, a slow current that sways them, ripples running up toward the tips.
    float t = uTime;
    offset = vec3(sin(t * 1.05 + root.x * .31 + position.y * .8) + .35 * sin(t * 2.3 + position.y * 2.4 + root.z),
                  0.,
                  cos(t * .82 + root.z * .27 + position.y * .65) + .3 * cos(t * 1.9 + position.y * 2.1 + root.x)) * aSway * .3;
  }
  vec4 l3dWorldPos = modelMatrix * inst * vec4(transformed, 1.);
  l3dWorldPos.xyz += offset;
  vec3 l3dWorldNormal = normalize(mat3(modelMatrix) * mat3(inst) * objectNormal);
  vWorldPos = l3dWorldPos.xyz;
  vNormal = l3dWorldNormal;
  vColor = color;
  #ifdef USE_INSTANCING_COLOR
    vColor *= instanceColor;
  #endif
  vPart = aPart;
  vLocal = position;
  gl_Position = projectionMatrix * viewMatrix * l3dWorldPos;
  ${xe}
}
`,vt=`
${ye}
${Be}
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying float vPart;
varying vec3 vLocal;
void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(cameraPosition - vWorldPos);
  if (!gl_FrontFacing) n = -n;
  float shadow = l3dSunShadowFast() * l3dCloudShadow(vWorldPos);
  vec3 col = vColor;
  vec3 lit;
  if (vPart > 2.5) {
    // Sea plants: smooth blades, a little see-through (the light glows through them), softly shaded.
    lit = l3dLight(col, n, v, mix(.65, 1., shadow), .9, .35, .05, .12);
    lit += col * uSunColor * l3dTranslucency(n, v, 2.) * .45;
  } else if (vPart > .5 && vPart < 1.5) {
    // Leaves: soft clumps of light and shade (painterly), a hint of leaf grain, wrapped light, glow when backlit.
    float clumps = l3dNoise3(vLocal * 3.2);
    float grain = l3dNoise3(vLocal * 13.);
    float detailFade = 1. - smoothstep(12., 45., length(cameraPosition - vWorldPos));
    n = l3dBump(n, vWorldPos, clumps * .7 + grain * .3 * detailFade, .32);
    col *= mix(.8, 1.12, smoothstep(.3, .75, clumps)) * mix(.96, 1.04, grain);
    float ao = mix(.5, 1., smoothstep(-.5, .8, vNormal.y * .6 + clumps * .4));
    lit = l3dLight(col, n, v, shadow, ao, .45, .05, .1);
    lit += col * uSunColor * l3dTranslucency(n, v, 2.5) * .55 * (.4 + .6 * shadow);
  } else if (vPart > 1.5) {
    // Stone and caps: chunky, matte.
    float grain = l3dNoise3(vLocal * 7.) * .7 + l3dNoise3(vLocal * 19.) * .3;
    n = l3dBump(n, vWorldPos, grain, .6);
    col *= mix(.85, 1.08, grain);
    lit = l3dLight(col, n, v, shadow, mix(.6, 1., vNormal.y * .5 + .5), .3, .08, .15);
  } else {
    // Bark.
    float bark = l3dNoise3(vec3(vLocal.x * 14., vLocal.y * 3., vLocal.z * 14.));
    n = l3dBump(n, vWorldPos, bark, .8);
    col *= mix(.75, 1.05, bark);
    lit = l3dLight(col, n, v, shadow, .85, .3, .04, .1);
  }
  lit += l3dPoints(col, n, vWorldPos);
  lit = l3dFog(lit, vWorldPos);
  gl_FragColor = vec4(lit, 1.);
}
`,_t=["soft","spark","star","ring","petal","smoke","snow","heart","leaf","drop","square"],wt={soft:0,spark:1,star:2,ring:3,petal:4,smoke:5,snow:6,heart:7,leaf:8,drop:9,square:10},z=r=>({...le(r.id)?{sound:le(r.id)}:{},duration:1,loop:!1,rate:0,burst:30,life:[.6,1.2],emitter:"point",area:.1,speed:[1,3],direction:[0,1,0],spread:180,gravity:0,drag:1,turbulence:0,orbit:0,size:[.15,0],colors:["#ffffff","#ffffff"],alpha:[1,1,0],shape:"soft",blend:"add",spin:0,stretch:0,glow:.5,world:!0,...r}),bt=[z({id:"fire",name:"火焰",loop:!0,duration:1,rate:70,burst:0,life:[.5,1.1],emitter:"disc",area:.28,speed:[.6,1.6],spread:18,gravity:-2.2,drag:1.2,turbulence:1.2,size:[.42,.05],colors:["#fff3b0","#ffb347","#ff5a36","#5a2a2a"],alpha:[.9,.8,0],shape:"soft",glow:1.4}),z({id:"smoke",name:"煙霧",loop:!0,rate:11,burst:0,life:[2.4,4],emitter:"disc",area:.18,speed:[.6,1.1],spread:12,gravity:-.7,drag:.6,turbulence:.9,size:[.3,1.45],colors:["#c9c2bb","#eeeae6","#d4d9e2"],alpha:[0,.36,0],shape:"smoke",blend:"alpha",glow:0,spin:.35}),z({id:"coins",name:"金幣",burst:26,life:[.9,1.4],emitter:"point",speed:[3.5,6.5],direction:[0,1,0],spread:32,gravity:11,drag:.4,size:[.17,.13],colors:["#fff3a8","#ffd23f","#e8a317"],alpha:[1,1,0],shape:"star",glow:1.3,spin:4}),z({id:"ink",name:"墨汁",burst:70,life:[1.6,2.8],emitter:"cone",area:.25,speed:[2.5,6.5],direction:[0,0,1],spread:30,gravity:-.15,drag:3.2,turbulence:1.5,size:[.3,1.7],colors:["#3a2a52","#1d1630","#120e1e"],alpha:[.95,.75,0],shape:"smoke",blend:"alpha",glow:0,spin:.6}),z({id:"magic-burst",name:"魔法爆發",burst:80,life:[.5,1.1],emitter:"sphere",area:.15,speed:[2.5,6],spread:180,drag:3,turbulence:.6,size:[.16,0],colors:["#ffffff","#b38cff","#5f7dff"],alpha:[1,1,0],shape:"star",glow:1.6,spin:3}),z({id:"heal",name:"治療光環",loop:!0,duration:1.5,rate:40,burst:0,life:[1,1.6],emitter:"ring",area:.7,speed:[.5,1.2],direction:[0,1,0],spread:8,gravity:-.6,drag:.5,orbit:1.2,size:[.12,.02],colors:["#eaffd9","#7cf29a","#2fbf71"],alpha:[0,1,0],shape:"star",glow:1.2,spin:2}),z({id:"sparks",name:"電光火花",burst:60,life:[.15,.45],emitter:"point",speed:[6,12],spread:180,gravity:9,drag:2,size:[.05,.01],colors:["#ffffff","#8be9ff","#3a7bff"],alpha:[1,1,0],shape:"spark",stretch:1.2,glow:2}),z({id:"slash",name:"斬擊",burst:70,life:[.18,.35],emitter:"ring",area:1.1,speed:[.5,1.5],direction:[0,0,1],spread:25,drag:4,orbit:9,size:[.14,.02],colors:["#ffffff","#ffe08a","#ff8a3d"],alpha:[1,.9,0],shape:"spark",stretch:1.6,glow:1.8}),z({id:"sparkle",name:"星光閃爍",loop:!0,rate:10,burst:0,life:[.6,1.4],emitter:"sphere",area:.9,speed:[0,.2],spread:180,size:[0,.14],colors:["#ffffff","#fff2a8"],alpha:[0,1,0],shape:"star",glow:1.5,spin:1}),z({id:"portal",name:"傳送門",loop:!0,rate:90,burst:0,life:[.8,1.3],emitter:"ring",area:1.2,speed:[-.9,-.4],direction:[0,0,1],spread:0,orbit:2.5,size:[.1,.02],colors:["#ffffff","#8de3ff","#a46bff"],alpha:[0,1,0],shape:"soft",glow:1.6}),z({id:"confetti",name:"彩帶",burst:120,life:[1.6,2.6],emitter:"point",speed:[4,8],direction:[0,1,0],spread:55,gravity:6,drag:1.4,turbulence:.6,size:[.1,.08],colors:["#ff6b8b","#ffd166","#4ecdc4","#8e7dff"],alpha:[1,1,0],shape:"square",blend:"alpha",glow:0,spin:9}),z({id:"fireflies",name:"螢火蟲",loop:!0,rate:6,burst:10,life:[3,6],emitter:"box",area:4,speed:[.05,.25],spread:180,turbulence:.5,size:[.07,.07],colors:["#f4ffb0","#c8ff6a"],alpha:[0,1,0],shape:"soft",glow:2.5}),z({id:"frost",name:"冰霜",burst:60,life:[.6,1.2],emitter:"ring",area:.4,speed:[3,5],direction:[0,.2,0],spread:90,drag:3,size:[.16,.02],colors:["#ffffff","#bfefff","#6fc3ff"],alpha:[1,.9,0],shape:"snow",glow:1,spin:2}),z({id:"splash",name:"水花",burst:40,life:[.4,.8],emitter:"disc",area:.3,speed:[2,4.5],spread:35,gravity:14,drag:.5,size:[.08,.03],colors:["#ffffff","#bdf1ff"],alpha:[1,.9,0],shape:"drop",blend:"alpha",stretch:.6,glow:.3}),z({id:"goo",name:"黏液飛濺",burst:26,life:[.5,1],emitter:"sphere",area:.3,speed:[2,4],direction:[0,1,0],spread:70,gravity:12,drag:.4,size:[.13,.06],colors:["#8affc7","#22d38a"],alpha:[.95,.9,0],shape:"drop",blend:"alpha",stretch:.3,glow:.4}),z({id:"petals",name:"花瓣飄落",loop:!0,rate:8,burst:0,life:[4,7],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.3,.2],spread:30,gravity:.4,drag:.8,turbulence:.9,size:[.09,.08],colors:["#ffd1e1","#ff9fc2"],alpha:[0,1,0],shape:"petal",blend:"alpha",glow:0,spin:2.5}),z({id:"leaves",name:"落葉",loop:!0,rate:4,burst:0,life:[4,8],emitter:"box",area:5,speed:[.2,.5],direction:[1,-.2,0],spread:40,gravity:.5,drag:.7,turbulence:1,size:[.12,.11],colors:["#ffc14d","#e8743b"],alpha:[0,1,0],shape:"leaf",blend:"alpha",glow:0,spin:3}),z({id:"hearts",name:"愛心",burst:14,life:[1,1.6],emitter:"sphere",area:.3,speed:[.8,1.6],direction:[0,1,0],spread:40,gravity:-1,drag:1,size:[.18,.1],colors:["#ff6f9c","#ff3d6e"],alpha:[1,1,0],shape:"heart",blend:"alpha",glow:.4,spin:1}),z({id:"level-up",name:"升級",burst:50,rate:30,duration:1,life:[.9,1.5],emitter:"ring",area:.6,speed:[1.5,3],direction:[0,1,0],spread:6,gravity:-1,orbit:3,size:[.12,.02],colors:["#ffffff","#ffe066","#ffab00"],alpha:[1,1,0],shape:"star",glow:1.8,spin:3}),z({id:"dust",name:"塵土",burst:18,life:[.6,1.1],emitter:"disc",area:.35,speed:[.6,1.6],direction:[0,.3,0],spread:80,gravity:-.2,drag:2.4,size:[.15,.5],colors:["#e8dcc0","#c9b896"],alpha:[.55,.35,0],shape:"smoke",blend:"alpha",glow:0,spin:.8}),z({id:"eat",name:"吃掉",burst:36,life:[.35,.7],emitter:"sphere",area:.5,speed:[-2.4,-1.2],spread:180,drag:1,size:[.1,.02],colors:["#ffffff","#b6ffd9","#22d38a"],alpha:[1,1,0],shape:"star",glow:1.6,spin:4}),z({id:"fire-breath",name:"噴火",loop:!0,rate:120,burst:0,life:[.35,.7],emitter:"point",speed:[7,10],direction:[0,0,1],spread:14,gravity:-1.5,drag:1.6,turbulence:1,size:[.14,.72],colors:["#ffe08a","#ff9a3a","#ff4a2a","#5a2a24"],alpha:[.85,.7,0],shape:"soft",glow:1}),z({id:"rain",name:"雨",loop:!0,rate:700,burst:0,life:[.6,.9],emitter:"box",area:22,speed:[14,17],direction:[.08,-1,.05],spread:2,size:[.025,.025],colors:["#cfe6ff","#cfe6ff"],alpha:[.5,.5,.2],shape:"spark",blend:"alpha",stretch:2.2,glow:0}),z({id:"bubbles",name:"氣泡",loop:!0,rate:7,burst:0,life:[3,5],emitter:"disc",area:.3,speed:[.5,1.1],direction:[0,1,0],spread:12,gravity:-.5,drag:.4,turbulence:.7,size:[.06,.14],colors:["#ffffff","#c8f4ff"],alpha:[.7,.55,0],shape:"ring",blend:"alpha",glow:.2}),z({id:"embers",name:"餘燼",loop:!0,rate:26,burst:0,life:[2,4],emitter:"sphere",area:3,speed:[.3,1.1],direction:[0,1,0],spread:70,gravity:-.7,drag:.6,turbulence:1.4,size:[.05,.02],colors:["#ffd27a","#ff7a2a","#a8321a"],alpha:[1,.9,0],shape:"spark",glow:1.6}),z({id:"snow",name:"雪",loop:!0,rate:160,burst:0,life:[5,8],emitter:"box",area:22,speed:[.6,1.2],direction:[.1,-1,0],spread:15,turbulence:.6,size:[.06,.06],colors:["#ffffff","#f2f8ff"],alpha:[0,1,.8],shape:"snow",blend:"alpha",glow:.2,spin:1})];function Wt(r){return r.startsWith(ae)?yt(r.slice(ae.length)):bt.find(e=>e.id===r)}function yt(r){if(/^[a-z0-9-]{2,40}$/.test(r))return{...z({id:`${ae}${r}`,name:r,rate:0,burst:0,duration:2.6}),vfx:{id:r},...ce(r)?{sound:ce(r)}:{}}}const B=4;function xt(r,e){const t=Math.max(r.life[0],r.life[1],0),a=Math.max(Math.abs(r.speed[0]),Math.abs(r.speed[1])),o=Math.abs(r.gravity)*t*t/2,n=Math.max(r.size[0],r.size[1],0)*(1+(a+Math.abs(r.gravity)*t)*Math.max(0,r.stretch)*.12);return(r.area*1.6*e+a*t+o+Math.abs(r.turbulence)*t*1.6+n)*1.2+1}class Et{constructor(e,t,a=4e3){this.env=e,this.world=t,this.budget=a,this.group.name="l3d-particles"}env;world;group=new te;emitters=[];runs=[];time=0;quad=new We(1,1);budget;onSound=null;listener=null;sounds=[];soundNext=new Map;material(e){const t=e.colors.slice(0,B);for(;t.length<2;)t.push(t[0]||"#ffffff");const a=Array.from({length:B},(n,c)=>new E(t[Math.min(c,t.length-1)])),o=e.blend==="add";return new ve({uniforms:{...this.env,tWorld:{value:this.world.texture},uResolution:{value:this.world.resolution},uNow:{value:0},uColors:{value:a},uKeys:{value:t.length},uAlpha:{value:new y(...e.alpha)},uSize:{value:new Te(...e.size)},uGravity:{value:e.gravity},uDrag:{value:e.drag},uTurb:{value:e.turbulence},uOrbit:{value:e.orbit},uSpin:{value:e.spin},uStretch:{value:e.stretch},uGlow:{value:e.glow},uShape:{value:wt[e.shape]??0},uAdditive:{value:o?1:0},uOrigin:{value:new y},uLocal:{value:e.world?0:1}},vertexShader:Mt,fragmentShader:St,transparent:!0,depthWrite:!1,depthTest:!0,blending:o?Ee:Fe})}play(e,t,a={}){if(e.vfx)return this.heard(this.playVfx(e,t,a),a.sound);const o=e.rate*Math.max(...e.life)+e.burst,n=this.emitters.reduce((d,p)=>d+(p.done?0:p.capacity),0),c=Math.max(8,Math.min(Math.ceil(o*1.15)+4,Math.max(64,this.budget-n))),s=new Ve;s.index=this.quad.index,s.setAttribute("position",this.quad.getAttribute("position")),s.setAttribute("uv",this.quad.getAttribute("uv"));const l=new Q(new Float32Array(c*4).fill(-1e5),4).setUsage(J),h=new Q(new Float32Array(c*4),4).setUsage(J),m=new Q(new Float32Array(c*4),4).setUsage(J);s.setAttribute("aBirth",l),s.setAttribute("aMotion",h),s.setAttribute("aExtra",m),s.instanceCount=c;const g=this.material(e),v=new Re(s,g);v.frustumCulled=!1,a.follow||(s.boundingSphere=new $e(t.clone(),xt(e,a.scale??1)),v.frustumCulled=!0,v.matrixAutoUpdate=!1,v.matrixWorldAutoUpdate=!1),v.layers.set(De),v.renderOrder=e.blend==="add"?20:15,this.group.add(v);const f=new D;if(a.direction){const d=a.direction.clone().normalize(),p=Math.abs(d.y)>.95?new y(1,0,0):new y(0,1,0),b=new y().crossVectors(p,d).normalize(),u=new y().crossVectors(d,b);f.makeBasis(b,u,d)}a.scale&&f.scale(new y(a.scale,a.scale,a.scale));const i={effect:e,mesh:v,geometry:s,birth:l,motion:h,extra:m,capacity:c,cursor:0,running:!0,elapsed:0,carry:0,origin:t.clone(),matrix:f,follow:a.follow,random:I(Math.random()*1e9|0),done:!1,repeat:a.repeat??e.loop};return this.emitters.push(i),this.spawn(i,e.burst),this.heard(i,a.sound)}moments=new WeakMap;once(e,t,a){if(!e.loop)return this.play(e,t,a);let o=this.moments.get(e);return o||this.moments.set(e,o={...e,loop:!1}),this.play(o,t,a)}heard(e,t){const a=e.effect.sound;return a&&t&&this.sounds.push({sound:a,source:e,wait:a.delay,repeats:t!=="once"&&e.repeat}),e}silence(e){const t=this.sounds.filter(a=>a.source===e);if(t.length){this.sounds=this.sounds.filter(a=>a.source!==e);for(const a of t)this.sounds.some(o=>U(o.sound)===U(a.sound))||this.soundNext.delete(U(a.sound))}}updateSounds(e){const t=this.listener?.()??null,a=new Map;this.sounds=this.sounds.filter(o=>{const n=o.source;if("handle"in n&&!n.handle)return!n.done;if(o.repeats&&(!n.running||n.done))return!1;if(o.wait-=e,o.wait>0)return!0;const c=t?n.origin.distanceTo(t):0;if(!o.repeats)return this.onSound?.(o.sound,c),!1;if("restartedAt"in n&&n.restartedAt!==void 0){const h=this.time-n.restartedAt;if(h<o.sound.delay-1e-6||h>=o.sound.delay+e-1e-6)return!0}const s=U(o.sound),l=a.get(s);return(!l||c<l.distance)&&a.set(s,{job:o,distance:c}),!0});for(const[o,{job:n,distance:c}]of a)this.time<(this.soundNext.get(o)??0)||c>ze(n.sound)||(this.onSound?.(n.sound,c),this.soundNext.set(o,this.time+Je(n.sound,"handle"in n.source?n.source.effect.duration+1:0)))}playVfx(e,t,a){const o={effect:e,handle:null,origin:t.clone(),follow:a.follow,direction:a.direction?.clone(),scale:a.scale??1,repeat:!!(a.repeat||e.loop),running:!0,elapsed:0,stoppedAt:0,done:!1};return this.runs.push(o),Ze(e.vfx.id,e.vfx.options).then(n=>{if(!n){o.done=!0;return}if(o.done||!this.runs.includes(o)){n.dispose();return}o.handle=n,n.group.position.copy(o.origin),n.group.scale.setScalar(o.scale),o.direction&&n.setDirection(o.direction,0),this.group.add(n.group)}),o}stop(e){this.silence(e);const t=this.emitters.find(o=>o===e);if(t){t.running=!1;return}const a=this.runs.find(o=>o===e);a&&a.running&&(a.running=!1,a.stoppedAt=a.elapsed,a.handle?a.handle.stop():a.done=!0)}aim(e,t){const a=this.runs.find(h=>h===e);if(a){a.direction=t.clone(),a.handle?.setDirection(t,0);return}const o=this.emitters.find(h=>h===e);if(!o)return;const n=t.clone().normalize(),c=Math.abs(n.y)>.95?new y(1,0,0):new y(0,1,0),s=new y().crossVectors(c,n).normalize(),l=new y().crossVectors(n,s);o.matrix.makeBasis(s,l,n)}stopAll(){for(const e of this.emitters)e.running=!1;for(const e of[...this.runs])this.stop(e);this.sounds=[],this.soundNext.clear()}spawn(e,t){const a=e.effect,o=new y(...a.direction);o.lengthSq()<1e-6&&o.set(0,1,0),o.normalize();const n=Math.min(180,Math.max(0,a.spread))*Math.PI/180,c=new y,s=new y,l=new y,h=Math.abs(o.y)>.95?new y(1,0,0):new y(0,1,0),m=new y().crossVectors(h,o).normalize(),g=new y().crossVectors(o,m);for(let v=0;v<t;v++){const f=e.random;switch(a.emitter){case"sphere":{c.set(f()*2-1,f()*2-1,f()*2-1),c.lengthSq()>1&&c.normalize(),s.copy(c).multiplyScalar(a.area);break}case"disc":{const x=f()*Math.PI*2,w=Math.sqrt(f())*a.area;s.copy(m).multiplyScalar(Math.cos(x)*w).addScaledVector(g,Math.sin(x)*w);break}case"ring":{const x=f()*Math.PI*2;s.copy(m).multiplyScalar(Math.cos(x)*a.area).addScaledVector(g,Math.sin(x)*a.area);break}case"box":s.set((f()-.5)*2*a.area,(f()-.5)*.5*a.area+a.area*.3,(f()-.5)*2*a.area);break;case"line":s.copy(o).multiplyScalar((f()-.5)*2*a.area);break;case"cone":{const x=f()*Math.PI*2,w=f()*a.area;s.copy(m).multiplyScalar(Math.cos(x)*w).addScaledVector(g,Math.sin(x)*w);break}default:s.set(0,0,0)}const i=f()*Math.PI*2,d=Math.acos(1-f()*(1-Math.cos(n)));l.copy(o).multiplyScalar(Math.cos(d)).addScaledVector(m,Math.sin(d)*Math.cos(i)).addScaledVector(g,Math.sin(d)*Math.sin(i)),a.emitter==="sphere"&&a.spread>=179&&l.copy(s).normalize();const p=a.speed[0]+f()*(a.speed[1]-a.speed[0]);s.applyMatrix4(e.matrix),l.transformDirection(e.matrix).multiplyScalar(p);const b=a.world?e.origin:new y,u=e.cursor;e.birth.setXYZW(u,b.x+s.x,b.y+s.y,b.z+s.z,this.time),e.motion.setXYZW(u,l.x,l.y,l.z,a.life[0]+f()*(a.life[1]-a.life[0])),e.extra.setXYZW(u,f(),.7+f()*.6,f()<.5?-1:1,f()),e.cursor=(e.cursor+1)%e.capacity}e.birth.needsUpdate=!0,e.motion.needsUpdate=!0,e.extra.needsUpdate=!0}update(e){this.time+=e;for(const t of this.emitters){if(t.follow){const o=t.follow();o?t.origin.copy(o):t.running=!1}const a=t.mesh.material.uniforms;if(a.uNow.value=this.time,a.uOrigin.value.copy(t.origin),t.running){if(t.elapsed+=e,(!t.effect.loop||!t.repeat)&&t.elapsed>=t.effect.duration)t.repeat?t.elapsed>=t.effect.duration+Math.max(...t.effect.life)&&(t.elapsed=0,t.carry=0,t.restartedAt=this.time,this.spawn(t,t.effect.burst)):t.running=!1;else if(t.effect.rate>0){t.carry+=t.effect.rate*e;const o=Math.floor(t.carry);o>0&&(t.carry-=o,this.spawn(t,Math.min(o,t.capacity)))}}!t.running&&!t.done&&(t.stoppedAt??=this.time,this.time-t.stoppedAt>Math.max(...t.effect.life)+.2&&(t.done=!0))}for(const t of this.emitters.filter(a=>a.done))this.group.remove(t.mesh),t.geometry.dispose(),t.mesh.material.dispose();this.emitters=this.emitters.filter(t=>!t.done);for(const t of this.runs){if(t.follow&&t.running){const o=t.follow();o?t.origin.copy(o):this.stop(t)}const a=t.handle;!a||t.done||(t.elapsed+=e,a.group.position.copy(t.origin),t.running&&!t.repeat&&t.elapsed>=t.effect.duration&&this.stop(t),a.update(e),a.finished?t.running&&t.repeat?(a.reset(),t.elapsed=0,t.restartedAt=this.time):(a.dispose(),t.done=!0):!t.running&&t.elapsed-t.stoppedAt>8&&(a.dispose(),t.done=!0))}this.runs=this.runs.filter(t=>!t.done),this.sounds.length&&this.updateSounds(e)}get active(){return this.emitters.length+this.runs.length}get settling(){return this.emitters.some(e=>!e.running||!e.repeat)||this.runs.some(e=>!e.repeat||!e.running)}dispose(){for(const e of this.emitters)e.geometry.dispose(),e.mesh.material.dispose();for(const e of this.runs)e.handle?.dispose(),e.done=!0;this.emitters=[],this.runs=[],this.sounds=[],this.quad.dispose()}}const Mt=`
${Me}${Se}
attribute vec4 aBirth;
attribute vec4 aMotion;
attribute vec4 aExtra;
uniform float uNow;
uniform vec3 uColors[${B}];
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
  for (int k = 0; k < ${B-1}; k++) if (k == i) { a = uColors[k]; b = uColors[k + 1]; }
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
`,St=`
${Me}${Se}
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
`;export{Lt as F,bt as P,de as S,ae as V,Ct as a,_t as b,Ze as c,Pt as d,ne as e,me as f,U as g,It as h,Et as i,qt as j,Ke as k,Xe as l,Wt as p,Nt as s,ce as v};
