import{V as xt,Q as rt,E as jt,h as Bt,i as Y,U as Ut,C as X,j as kt,k as lt,l as Vt,G as Rt,m as Wt,n as Ht,c as St,o as Tt,M as Dt,p as Qt,q as Yt,r as Xt,s as Jt,t as Kt}from"./three-engine-CPoZO8QK.js";import{l as Zt,G as qt,c as te,d as ee,a as ne,b as oe}from"./builtins-BYZnGG-g.js";const se=["sphere","box","capsule","cylinder","cone","torus"],vt=96;function ut(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function Gt(e){let t=String(e||"").trim().replace(/^#/,"");if(t.length===3&&(t=t.split("").map(o=>o+o).join("")),!/^[0-9a-f]{6}$/i.test(t))return[.6,.58,.55];const n=parseInt(t,16);return[ut((n>>16&255)/255),ut((n>>8&255)/255),ut((n&255)/255)]}function T(e,t,n){return e<t?t:e>n?n:e}const re={sphere:0,box:1,capsule:2,cylinder:3,cone:4,torus:5},ie={add:0,subtract:1,intersect:2,paint:3};function ae(e,t=new Float64Array(9)){const[n,o,r]=e,s=Math.cos(n),f=Math.sin(n),u=Math.cos(o),c=Math.sin(o),a=Math.cos(r),i=Math.sin(r),p=s*a,d=s*i,l=f*a,m=f*i;return t[0]=u*a,t[1]=-u*i,t[2]=c,t[3]=d+l*c,t[4]=p-m*c,t[5]=-f*u,t[6]=m-p*c,t[7]=l+d*c,t[8]=s*u,t}function ce(e,t){const[n,o,r]=t.map(s=>Math.abs(s));switch(e){case"sphere":return[n,o,r];case"box":return[n,o,r];case"capsule":return[n,Math.max(o,n),n];case"cylinder":return[n,o,n];case"cone":return[n,o,n];case"torus":return[n+o,o,n+o]}}function le(e,t){const n=ae(e.r),o=e.s.map(v=>Math.max(.002,Math.abs(Number(v)||0))),r=re[e.shape]??0,s=ie[e.op]??0,f=Math.max(0,Number(e.blend)||0),u=Math.max(0,Math.min(Number(e.round)||0,Math.min(o[0],o[1],o[2]))),c=ce(e.shape,o),a=Math.abs(n[0])*c[0]+Math.abs(n[1])*c[1]+Math.abs(n[2])*c[2],i=Math.abs(n[3])*c[0]+Math.abs(n[4])*c[1]+Math.abs(n[5])*c[2],p=Math.abs(n[6])*c[0]+Math.abs(n[7])*c[1]+Math.abs(n[8])*c[2],d=f*2+.002,l=[e.p[0]-a-d,e.p[1]-i-d,e.p[2]-p-d],m=[e.p[0]+a+d,e.p[1]+i+d,e.p[2]+p+d];if(e.mirror){const v=Math.max(Math.abs(l[0]),Math.abs(m[0]));l[0]=-v,m[0]=v}return{index:t,src:e,shape:r,op:s,px:e.p[0],py:e.p[1],pz:e.p[2],m:n,sx:o[0],sy:o[1],sz:o[2],round:u,blend:f,mirror:!!e.mirror,color:Gt(e.color),gloss:T(Number(e.gloss)||0,0,1),glow:T(Number(e.glow)||0,0,1),min:l,max:m}}function At(e,t,n,o){switch(e.shape){case 0:{const r=t/e.sx,s=n/e.sy,f=o/e.sz,u=Math.sqrt(r*r+s*s+f*f),c=r/e.sx,a=s/e.sy,i=f/e.sz,p=Math.sqrt(c*c+a*a+i*i);return p>1e-9?u*(u-1)/p:-Math.min(e.sx,e.sy,e.sz)}case 1:{const r=e.round,s=Math.abs(t)-e.sx+r,f=Math.abs(n)-e.sy+r,u=Math.abs(o)-e.sz+r,c=Math.max(s,0),a=Math.max(f,0),i=Math.max(u,0);return Math.sqrt(c*c+a*a+i*i)+Math.min(Math.max(s,Math.max(f,u)),0)-r}case 2:{const r=e.sx,s=Math.max(e.sy-r,0),f=n-T(n,-s,s);return Math.sqrt(t*t+f*f+o*o)-r}case 3:{const r=e.round,s=Math.sqrt(t*t+o*o)-e.sx+r,f=Math.abs(n)-e.sy+r,u=Math.max(s,0),c=Math.max(f,0);return Math.min(Math.max(s,f),0)+Math.sqrt(u*u+c*c)-r}case 4:{const r=e.round,s=Math.max(e.sy-r,1e-4),f=Math.max(e.sx-r,1e-4),u=Math.sqrt(t*t+o*o),c=n,a=-f,i=2*s,p=u-Math.min(u,c<0?f:0),d=Math.abs(c)-s,l=T(((0-u)*a+(s-c)*i)/(a*a+i*i),0,1),m=u+a*l,v=c-s+i*l;return(m<0&&d<0?-1:1)*Math.sqrt(Math.min(p*p+d*d,m*m+v*v))-r}default:{const r=Math.sqrt(t*t+o*o)-e.sx;return Math.sqrt(r*r+n*n)-e.sy}}}function O(e,t,n,o){const r=e.m;let s=t-e.px,f=n-e.py,u=o-e.pz,c=At(e,r[0]*s+r[3]*f+r[6]*u,r[1]*s+r[4]*f+r[7]*u,r[2]*s+r[5]*f+r[8]*u);if(e.mirror){s=-t-e.px;const a=At(e,r[0]*s+r[3]*f+r[6]*u,r[1]*s+r[4]*f+r[7]*u,r[2]*s+r[5]*f+r[8]*u);c=ue(c,a,e.blend)}return c}function ue(e,t,n){if(n<=1e-6)return Math.min(e,t);const o=T(.5+.5*(t-e)/n,0,1);return t+(e-t)*o-n*o*(1-o)}function fe(e){const t=[];return e.prims.slice(0,vt).forEach((n,o)=>{n.hidden||t.push(le(n,o))}),t}function ot(e,t,n,o){return t>=e.min[0]&&t<=e.max[0]&&n>=e.min[1]&&n<=e.max[1]&&o>=e.min[2]&&o<=e.max[2]}function Et(e,t,n,o,r=!0){let s=1e9,f=.6,u=.58,c=.55,a=0,i=0,p=!0;for(let d=0;d<e.length;d++){const l=e[d];if(l.op===0){if(!p&&!ot(l,t,n,o))continue;const m=O(l,t,n,o);if(p){s=m,p=!1,r&&([f,u,c]=l.color,a=l.gloss,i=l.glow);continue}const v=l.blend,h=v<=1e-6?s<m?1:0:T(.5+.5*(m-s)/v,0,1);if(s=m+(s-m)*h-v*h*(1-h),r){const y=1-h;f+=(l.color[0]-f)*y,u+=(l.color[1]-u)*y,c+=(l.color[2]-c)*y,a+=(l.gloss-a)*y,i+=(l.glow-i)*y}}else if(l.op===1){if(p||!ot(l,t,n,o))continue;const m=-O(l,t,n,o),v=l.blend,h=v<=1e-6?s>m?1:0:T(.5-.5*(m-s)/v,0,1);if(s=m+(s-m)*h+v*h*(1-h),r){const y=1-h;f+=(l.color[0]-f)*y,u+=(l.color[1]-u)*y,c+=(l.color[2]-c)*y}}else if(l.op===2){if(p)continue;const m=ot(l,t,n,o)?O(l,t,n,o):Math.max(s,1e3),v=l.blend,h=v<=1e-6?s>m?1:0:T(.5-.5*(m-s)/v,0,1);s=m+(s-m)*h+v*h*(1-h)}else if(r&&ot(l,t,n,o)){const m=O(l,t,n,o),v=Math.max(l.blend,.004),h=T(.5-m/v,0,1);h>0&&(f+=(l.color[0]-f)*h,u+=(l.color[1]-u)*h,c+=(l.color[2]-c)*h,a+=(l.gloss-a)*h,i+=(l.glow-i)*h)}}return{d:s,r:f,g:u,b:c,gloss:a,glow:i}}function K(e,t,n,o){return Et(e,t,n,o,!1).d}function de(e){const t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(const o of e)if(o.op===0)for(let r=0;r<3;r++)t[r]=Math.min(t[r],o.min[r]),n[r]=Math.max(n[r],o.max[r]);return Number.isFinite(t[0])?{min:t,max:n}:{min:[-.5,0,-.5],max:[.5,1,.5]}}function me(e=[]){return e.slice(-4e3).map(t=>({x:t.p[0],y:t.p[1],z:t.p[2],radius:Math.max(.002,t.radius),r2:Math.max(.002,t.radius)**2,color:Gt(t.color),hardness:T(t.hardness,0,1),opacity:T(t.opacity,0,1)}))}function he(e,t,n,o,r){let[s,f,u]=r;for(const c of e){const a=t-c.x,i=n-c.y,p=o-c.z,d=a*a+i*i+p*p;if(d>=c.r2)continue;const l=Math.sqrt(d)/c.radius,m=c.hardness*.9,v=c.opacity*(l<=m?1:1-pe(m,1,l));s+=(c.color[0]-s)*v,f+=(c.color[1]-f)*v,u+=(c.color[2]-u)*v}return[s,f,u]}function pe(e,t,n){const o=T((n-e)/(t-e||1e-6),0,1);return o*o*(3-2*o)}let ft=0;function gt(e="c"){return ft=(ft+1)%1e6,`${e}${Date.now().toString(36).slice(-5)}${ft.toString(36)}${Math.random().toString(36).slice(2,5)}`}function We(e,t={}){const n={sphere:[.35,.35,.35],box:[.3,.3,.3],capsule:[.18,.4,.18],cylinder:[.25,.3,.25],cone:[.28,.35,.28],torus:[.3,.1,.3]};return{id:gt("p"),shape:e,op:"add",p:[0,.5,0],r:[0,0,0],s:n[e],round:e==="box"?.06:e==="cylinder"?.05:e==="cone"?.03:0,blend:.12,color:"#f2a37b",...t}}function Te(e){const t=e&&typeof e=="object"?e:{},n=(a,i=0,p=-1e3,d=1e3)=>{const l=Number(a);return Number.isFinite(l)?T(l,p,d):i},o=(a,i,p=-1e3,d=1e3)=>Array.isArray(a)?[n(a[0],i[0],p,d),n(a[1],i[1],p,d),n(a[2],i[2],p,d)]:i,r=(a,i="#f2a37b")=>typeof a=="string"&&/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a)?a:i,s=(Array.isArray(t.prims)?t.prims:[]).slice(0,vt).map(a=>{const i=a&&typeof a=="object"?a:{},p=se.includes(i.shape)?i.shape:"sphere",d=["add","subtract","intersect","paint"].includes(i.op)?i.op:"add",l={id:typeof i.id=="string"&&i.id?i.id.slice(0,40):gt("p"),shape:p,op:d,p:o(i.p,[0,.5,0],-50,50),r:o(i.r,[0,0,0],-20,20),s:o(i.s,[.3,.3,.3],.002,50),blend:n(i.blend,.1,0,5),color:r(i.color)};return i.round&&(l.round=n(i.round,0,0,10)),i.mirror&&(l.mirror=!0),typeof i.parent=="string"&&i.parent&&(l.parent=i.parent.slice(0,40)),i.hidden&&(l.hidden=!0),i.detail&&(l.detail=!0),i.gloss&&(l.gloss=n(i.gloss,0,0,1)),i.glow&&(l.glow=n(i.glow,0,0,1)),typeof i.name=="string"&&i.name&&(l.name=i.name.slice(0,40)),l}),f=(Array.isArray(t.splats)?t.splats:[]).slice(-4e3).map(a=>{const i=a&&typeof a=="object"?a:{};return{p:o(i.p,[0,0,0],-50,50),radius:n(i.radius,.03,.002,5),color:r(i.color,"#ffffff"),hardness:n(i.hardness,.5,0,1),opacity:n(i.opacity,1,0,1)}}),u=(Array.isArray(t.clips)?t.clips:[]).slice(0,24).map(a=>{const i=a&&typeof a=="object"?a:{},p=(Array.isArray(i.tracks)?i.tracks:[]).slice(0,vt).map(l=>{const m=l&&typeof l=="object"?l:{},v=(Array.isArray(m.times)?m.times:[]).slice(0,600).map(G=>n(G,0,0,600)),h=(G,it,Z,q)=>Array.isArray(G)?v.map((J,B)=>o(G[B],it,Z,q)):void 0,y={prim:String(m.prim||"").slice(0,40),times:v},w=h(m.p,[0,0,0],-50,50);w&&(y.p=w);const C=h(m.r,[0,0,0],-20,20);C&&(y.r=C);const D=h(m.s,[.3,.3,.3],.002,50);return D&&(y.s=D),y}).filter(l=>l.prim&&l.times.length),d=(Array.isArray(i.motions)?i.motions:[]).slice(0,64).map(l=>{const m=l&&typeof l=="object"?l:{},v=["wiggle","spin","bob","flap","breathe","swing","hop"];return{prim:String(m.prim||"").slice(0,40),kind:v.includes(m.kind)?m.kind:"wiggle",axis:m.axis==="x"||m.axis==="z"?m.axis:"y",amount:n(m.amount,.3,-10,10),speed:n(m.speed,1,0,20),phase:n(m.phase,0,-10,10)}}).filter(l=>l.prim);return{id:typeof i.id=="string"&&i.id?i.id.slice(0,40):gt("a"),name:typeof i.name=="string"?i.name.slice(0,40):"動畫",duration:n(i.duration,1,.05,120),loop:i.loop!==!1,tracks:p,...d.length?{motions:d}:{}}}),c={prims:s};return f.length&&(c.splats=f),u.length&&(c.clips=u),t.face&&typeof t.face=="object"&&(c.face={p:o(t.face.p,[0,.5,.3],-50,50),...t.face.forward?{forward:o(t.face.forward,[0,0,1],-1,1)}:{}}),c}const Ct=1e6;function Lt(e,t={}){const n=Math.max(12,Math.min(160,Math.round(t.resolution??72))),o=fe({prims:t.skipDetails?e.prims.filter(g=>!g.detail):t.solidDetailsApart?e.prims.filter(g=>!g.detail||g.op==="paint"):e.prims}),r=()=>({positions:new Float32Array(0),normals:new Float32Array(0),colors:new Float32Array(0),finish:new Float32Array(0),indices:new Uint32Array(0),min:[0,0,0],max:[0,0,0],cellSize:0});if(!o.some(g=>g.op===0))return r();const s=de(o),u=Math.max(s.max[0]-s.min[0],s.max[1]-s.min[1],s.max[2]-s.min[2],.001)/n,c=2,a=[s.min[0]-c*u,s.min[1]-c*u,s.min[2]-c*u],i=Math.ceil((s.max[0]-s.min[0])/u)+c*2+1,p=Math.ceil((s.max[1]-s.min[1])/u)+c*2+1,d=Math.ceil((s.max[2]-s.min[2])/u)+c*2+1,l=i*p*d;if(l>45e5)return Lt(e,{...t,resolution:Math.floor(n*.8)});const m=new Float32Array(l).fill(Ct),v=i*p;let h=!1;for(const g of o){if(g.op===3||g.op===1&&!h)continue;const P=Math.max(0,Math.floor((g.min[0]-a[0])/u)-2),M=Math.min(i-1,Math.ceil((g.max[0]-a[0])/u)+2),I=Math.max(0,Math.floor((g.min[1]-a[1])/u)-2),_=Math.min(p-1,Math.ceil((g.max[1]-a[1])/u)+2),N=Math.max(0,Math.floor((g.min[2]-a[2])/u)-2),z=Math.min(d-1,Math.ceil((g.max[2]-a[2])/u)+2),A=g.blend;if(g.op===2)for(let b=0;b<d;b++)for(let x=0;x<p;x++)for(let k=0;k<i;k++)k>=P&&k<=M&&x>=I&&x<=_&&b>=N&&b<=z||(m[k+x*i+b*v]=Ct);for(let b=N;b<=z;b++){const x=a[2]+b*u;for(let k=I;k<=_;k++){const L=a[1]+k*u;let j=P+k*i+b*v;for(let Q=P;Q<=M;Q++,j++){const V=a[0]+Q*u,W=m[j];if(g.op===0){const F=O(g,V,L,x);if(!h){m[j]=F;continue}if(A<=1e-6){F<W&&(m[j]=F);continue}const R=.5+.5*(F-W)/A,H=R<0?0:R>1?1:R;m[j]=F+(W-F)*H-A*H*(1-H)}else{const F=g.op===1?-O(g,V,L,x):O(g,V,L,x);if(A<=1e-6){F>W&&(m[j]=F);continue}const R=.5-.5*(F-W)/A,H=R<0?0:R>1?1:R;m[j]=F+(W-F)*H+A*H*(1-H)}}}}g.op===0&&(h=!0)}const y=i-1,w=p-1,C=d-1,D=new Int32Array(y*w*C).fill(-1),G=[],it=[0,1,i,i+1,v,v+1,v+i,v+i+1],Z=[0,1,2,3,4,5,6,7,0,2,1,3,4,6,5,7,0,4,1,5,2,6,3,7],q=[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]],J=new Float32Array(8);for(let g=0;g<C;g++)for(let P=0;P<w;P++)for(let M=0;M<y;M++){const I=M+P*i+g*v;let _=0;for(let x=0;x<8;x++)J[x]=m[I+it[x]],J[x]<0&&(_|=1<<x);if(_===0||_===255)continue;let N=0,z=0,A=0,b=0;for(let x=0;x<24;x+=2){const k=Z[x],L=Z[x+1],j=J[k],Q=J[L];if(j<0==Q<0)continue;const V=j/(j-Q),W=q[k],F=q[L];N+=W[0]+(F[0]-W[0])*V,z+=W[1]+(F[1]-W[1])*V,A+=W[2]+(F[2]-W[2])*V,b++}D[M+P*y+g*y*w]=G.length/3,G.push(a[0]+(M+N/b)*u,a[1]+(P+z/b)*u,a[2]+(g+A/b)*u)}const B=[],$t=[i,p,d],at=[y,w,C],Ot=[1,i,v],U=[1,y,y*w],S=[0,0,0];for(S[2]=0;S[2]<d;S[2]++)for(S[1]=0;S[1]<p;S[1]++)for(S[0]=0;S[0]<i;S[0]++){const g=S[0]+S[1]*i+S[2]*v,P=m[g]<0;for(let M=0;M<3;M++){if(S[M]>=$t[M]-1)continue;const I=m[g+Ot[M]]<0;if(P===I)continue;const _=(M+1)%3,N=(M+2)%3;if(S[_]<1||S[N]<1||S[_]>at[_]-1||S[N]>at[N]-1||S[M]>at[M]-1)continue;const z=S[0]*U[0]+S[1]*U[1]+S[2]*U[2],A=D[z-U[_]-U[N]],b=D[z-U[N]],x=D[z],k=D[z-U[_]];if(A<0||b<0||x<0||k<0)continue;const L=Pt(G,A,x),j=Pt(G,b,k);P?L<=j?B.push(A,b,x,A,x,k):B.push(A,b,k,b,x,k):L<=j?B.push(A,x,b,A,k,x):B.push(A,k,b,b,k,x)}}const tt=G.length/3,$=new Float32Array(G),et=new Float32Array(tt*3),nt=new Float32Array(tt*3),ct=new Float32Array(tt*2),bt=u*.5,Mt=t.splats===!1?[]:me(e.splats);for(let g=0;g<tt;g++){let P=$[g*3],M=$[g*3+1],I=$[g*3+2];for(let A=0;A<2;A++){const b=Nt(o,P,M,I,bt),x=K(o,P,M,I);if(!Number.isFinite(x)||Math.abs(x)>u*1.5)break;P-=b[0]*x,M-=b[1]*x,I-=b[2]*x}$[g*3]=P,$[g*3+1]=M,$[g*3+2]=I;const _=Nt(o,P,M,I,bt);et[g*3]=_[0],et[g*3+1]=_[1],et[g*3+2]=_[2];const N=Et(o,P,M,I,!0);let z=[N.r,N.g,N.b];Mt.length&&(z=he(Mt,P,M,I,z)),nt[g*3]=z[0],nt[g*3+1]=z[1],nt[g*3+2]=z[2],ct[g*2]=N.gloss,ct[g*2+1]=N.glow}const wt={positions:$,normals:et,colors:nt,finish:ct,indices:new Uint32Array(B),min:[a[0],a[1],a[2]],max:[a[0]+(i-1)*u,a[1]+(p-1)*u,a[2]+(d-1)*u],cellSize:u};return t.skin&&Object.assign(wt,ve(o,$,u)),wt}function Pt(e,t,n){const o=e[t*3]-e[n*3],r=e[t*3+1]-e[n*3+1],s=e[t*3+2]-e[n*3+2];return o*o+r*r+s*s}function Nt(e,t,n,o,r){const s=K(e,t+r,n-r,o-r),f=K(e,t-r,n-r,o+r),u=K(e,t-r,n+r,o-r),c=K(e,t+r,n+r,o+r);let a=s-f-u+c,i=-s-f+u+c,p=-s+f-u+c;const d=Math.hypot(a,i,p);return d>1e-9?(a/=d,i/=d,p/=d,[a,i,p]):[0,1,0]}function ve(e,t,n){const o=e.filter(a=>a.op!==3),r=t.length/3,s=new Uint16Array(r*4),f=new Float32Array(r*4),u=new Float32Array(o.length),c=[];for(let a=0;a<r;a++){const i=t[a*3],p=t[a*3+1],d=t[a*3+2];let l=1/0;for(let h=0;h<o.length;h++){const y=o[h],w=O(y,i,p,d),C=y.op===1?Math.abs(w):w;u[h]=C,C<l&&(l=C)}c.length=0;for(let h=0;h<o.length;h++){const y=o[h].blend+n*2;u[h]-l<y&&c.push(h)}c.sort((h,y)=>u[h]-u[y]);let m=0;const v=Math.min(4,c.length);for(let h=0;h<v;h++){const y=c[h],w=o[y].blend+n*2,C=1-(u[y]-l)/w,D=C*C;s[a*4+h]=y,f[a*4+h]=D,m+=D}if(m<=0){s[a*4]=c[0]??0,f[a*4]=1;continue}for(let h=0;h<v;h++)f[a*4+h]/=m}return{skinIndex:s,skinWeight:f,bones:o.map(a=>a.src.id)}}const dt=new rt,_t=new rt,mt=new rt,E=new jt,ge=new xt,st=new xt,ht=new xt;function ye(e,t,n){return[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n]}function xe(e,t,n){return dt.setFromEuler(E.set(e[0],e[1],e[2])),_t.setFromEuler(E.set(t[0],t[1],t[2])),dt.slerp(_t,n),E.setFromQuaternion(dt),[E.x,E.y,E.z]}function pt(e,t,n,o=!1){if(!t||!t.length)return;if(n<=e[0])return t[0];const r=e.length-1;if(n>=e[r])return t[r];let s=0;for(;s<r&&e[s+1]<n;)s++;const f=(n-e[s])/Math.max(1e-6,e[s+1]-e[s]);return o?xe(t[s],t[s+1],f):ye(t[s],t[s+1],f)}function be(e){const t=new Map;for(const n of e)if(n.parent){const o=t.get(n.parent)??[];o.push(n.id),t.set(n.parent,o)}return t}function Me(e,t,n){if(!n)return[t[0],t[1],t[2]];const o=ge.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]),r=o.length();if(r<1e-5)return[t[0],t[1],t[2]];o.divideScalar(r);const s=Math.min(r,Math.max(e.s[0],e.s[1],e.s[2])*.85);return[t[0]+o.x*s,t[1]+o.y*s,t[2]+o.z*s]}function we(e,t){const n=t*e.speed*Math.PI*2+e.phase;switch(e.kind){case"spin":return t*e.speed*Math.PI*2*Math.sign(e.amount||1);case"hop":return Math.abs(Math.sin(n))*e.amount;case"swing":{const o=Math.sin(n);return Math.sign(o)*Math.pow(Math.abs(o),.7)*e.amount}default:return Math.sin(n)*e.amount}}function ke(e,t,n,o=[]){const r=e.prims,s=new Map,f=n?n.loop?(t%n.duration+n.duration)%n.duration:Math.min(t,n.duration):0;for(const c of r){let a=[...c.p],i=[...c.r],p=[...c.s];const d=n?.tracks.find(l=>l.prim===c.id);if(d){const l=pt(d.times,d.p,f),m=pt(d.times,d.r,f,!0),v=pt(d.times,d.s,f);l&&(a=[l[0],l[1],l[2]]),m&&(i=[m[0],m[1],m[2]]),v&&(p=[v[0],v[1],v[2]])}s.set(c.id,{prim:c,p:a,r:i,s:p})}const u=[...n?.motions||[],...o];if(u.length){const c=be(r),a=(d,l=[])=>{for(const m of c.get(d)||[])l.push(m),a(m,l);return l},i=new Map,p=d=>{let l=i.get(d.prim.id);return l||(l=new rt().setFromEuler(E.set(d.r[0],d.r[1],d.r[2])),i.set(d.prim.id,l)),l};for(const d of u){const l=s.get(d.prim);if(!l)continue;const m=we(d,t),v=[d.prim,...a(d.prim)];if(d.kind==="bob"||d.kind==="hop"){const y=d.axis==="x"?0:d.axis==="y"?1:2;for(const w of v){const C=s.get(w);C.p[y]+=m}continue}if(d.kind==="breathe"){const y=1+m;for(const w of v){const C=s.get(w);C.s=[C.s[0]*y,C.s[1]*y,C.s[2]*y]}continue}const h=Me(l.prim,l.p,l.prim.parent?s.get(l.prim.parent)?.p:void 0);ht.set(d.axis==="x"?1:0,d.axis==="y"?1:0,d.axis==="z"?1:0),ht.applyQuaternion(p(l)).normalize(),mt.setFromAxisAngle(ht,m);for(const y of v){const w=s.get(y);st.set(w.p[0]-h[0],w.p[1]-h[1],w.p[2]-h[2]).applyQuaternion(mt),w.p=[h[0]+st.x,h[1]+st.y,h[2]+st.z],p(w).premultiply(mt)}}for(const[d,l]of i){const m=s.get(d);E.setFromQuaternion(l),m.r=[E.x,E.y,E.z]}}return r.map(c=>s.get(c.id))}function De(e){const t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(const{prim:o,p:r,s}of e){if(o.op!=="add"||o.hidden)continue;const f=Math.max(s[0],s[1],s[2])+(o.shape==="torus"?s[1]:0);for(let u=0;u<3;u++)t[u]=Math.min(t[u],r[u]-f),n[u]=Math.max(n[u],r[u]+f);o.mirror&&(t[0]=Math.min(t[0],-r[0]-f),n[0]=Math.max(n[0],-r[0]+f))}return Number.isFinite(t[0])?{min:t,max:n}:{min:[-.5,0,-.5],max:[.5,1,.5]}}function zt(e){const t=new Bt;return t.setAttribute("position",new Y(e.positions,3)),t.setAttribute("normal",new Y(e.normals,3)),t.setAttribute("color",new Y(e.colors,3)),t.setAttribute("aFinish",new Y(e.finish,2)),e.skinIndex&&e.skinWeight&&(t.setAttribute("skinIndex",new Ut(e.skinIndex,4)),t.setAttribute("skinWeight",new Y(e.skinWeight,4))),t.setIndex(new Y(e.indices,1)),t.computeBoundingSphere(),t.computeBoundingBox(),t}const yt=new Map;function Ge(e,t={}){return yt.has(`${e}:${t.resolution??72}:${t.skin?1:0}:${t.skipDetails?1:0}:${t.solidDetailsApart?1:0}`)}function Ee(e,t,n={}){const o=`${t}:${n.resolution??72}:${n.skin?1:0}:${n.skipDetails?1:0}:${n.solidDetailsApart?1:0}`;let r=yt.get(o);return r||(r=Lt(e,{skin:!0,...n}),yt.set(o,r)),r}function Le(e,t={}){return Zt(e,{uniforms:{uJelly:{value:t.jelly??0},uTint:{value:new X(t.tint??"#ffffff")},uHit:{value:0},uPopStart:{value:-1e3},uGrain:{value:t.grain??0},uSkin:{value:t.skin?1:0}},vertexShader:ze,fragmentShader:Fe,vertexColors:!0})}function $e(e="#2a2230",t=.018){return new Wt({uniforms:{uColor:{value:new X(e)},uWidth:{value:t}},vertexShader:`
      #include <common>
      #include <skinning_pars_vertex>
      uniform float uWidth;
      void main() {
        vec3 objectNormal = normal;
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
        vec3 transformed = position;
        #include <skinning_vertex>
        vec4 mv = modelViewMatrix * vec4(transformed, 1.);
        vec3 n = normalize(normalMatrix * objectNormal);
        // Constant-ish screen width: grow with distance.
        mv.xyz += n * uWidth * clamp(-mv.z * .12, 1., 6.);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:"uniform vec3 uColor; void main() { gl_FragColor = vec4(uColor, 1.); }",side:Ht})}function Oe(e){return new Wt({uniforms:{uTime:e.uTime,uSunDir:e.uSunDir,uSunColor:e.uSunColor,uAmount:{value:.35},uColor:{value:new X("#22d38a")},uThick:{value:.03},uWobble:{value:0}},vertexShader:`
      #include <common>
      #include <skinning_pars_vertex>
      uniform float uTime;
      uniform float uThick;
      uniform float uWobble;
      varying vec3 vN;
      varying vec3 vView;
      varying vec3 vWorld;
      void main() {
        vec3 objectNormal = normal;
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
        vec3 transformed = position;
        #include <skinning_vertex>
        // A jelly skin that breathes and quivers (more while moving).
        float ripple = sin(uTime * 3.1 + transformed.y * 9. + transformed.x * 5.) * .5 + sin(uTime * 4.7 - transformed.z * 8.) * .5;
        transformed += objectNormal * (uThick * (1. + ripple * (.22 + uWobble * .5)));
        vec4 world = modelMatrix * vec4(transformed, 1.);
        vWorld = world.xyz;
        vN = normalize(mat3(modelMatrix) * objectNormal);
        vView = cameraPosition - world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,fragmentShader:`
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uAmount;
      uniform vec3 uColor;
      varying vec3 vN;
      varying vec3 vView;
      varying vec3 vWorld;
      void main() {
        vec3 n = normalize(vN), v = normalize(vView);
        float facing = abs(dot(n, v));
        float rim = pow(1. - facing, 1.7);
        // Clear in the middle, the slime's colour thickening toward the edges, a sharp sun glint and a soft sheen.
        vec3 sun = normalize(uSunDir);
        float glint = pow(max(dot(reflect(-sun, n), v), 0.), 70.) * 1.6 + pow(max(dot(reflect(-sun, n), v), 0.), 9.) * .18;
        vec3 col = uColor * (.55 + .7 * rim) + vec3(.9, .97, 1.) * rim * .35 + min(uSunColor, vec3(1.6)) * glint;
        float alpha = clamp(uAmount * (.22 + .68 * rim) + glint * uAmount * .9, 0., .92);
        gl_FragColor = vec4(col, alpha);
      }`,transparent:!0,depthWrite:!1})}const Ft=new jt;new Kt;class Be{constructor(t,n,o,r,s={}){this.model=t;const f=zt(n);this.boneIds=n.bones??[];const u=new kt;u.name="root";for(const c of this.boneIds){const a=t.prims.find(p=>p.id===c),i=new kt;i.name=c,a&&(this.rest.set(c,a),i.position.set(a.p[0],a.p[1],a.p[2]),i.quaternion.setFromEuler(Ft.set(a.r[0],a.r[1],a.r[2]))),u.add(i),this.bones.push(i)}if(this.mesh=new lt(f,o),this.mesh.add(u),this.mesh.updateMatrixWorld(!0),this.mesh.bind(new Vt(this.bones)),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.group.add(this.mesh),r){const c=new lt(f,r);c.bind(this.mesh.skeleton,this.mesh.bindMatrix),c.frustumCulled=!1,this.mesh.add(c),this.outline=c}s.detailMeshes&&this.buildDetails()}model;group=new Rt;mesh;outline=null;coat=null;bones=[];boneIds=[];rest=new Map;details=[];buildDetails(){for(const t of this.model.prims){if(!t.detail||t.op==="paint"||t.hidden||t.shape==="torus")continue;const n=Se(t),o=()=>{const s=new St(Ne(t),n);if(s.castShadow=!1,s.frustumCulled=!1,t.shape==="sphere"&&Pe(t.color)){const f=new St(Ae,Ce);f.position.set(.32,.42,.78),f.scale.setScalar(.3),s.add(f)}return this.mesh.add(s),s},r=[o()];t.mirror&&r.push(o()),this.details.push({prim:t,meshes:r})}this.placeDetails(new Map(this.model.prims.map(t=>[t.id,{prim:t,p:t.p,r:t.r,s:t.s}])))}placeDetails(t){for(const n of this.details){const o=t.get(n.prim.id);if(!o)continue;const[r,s]=n.meshes;r.position.set(o.p[0],o.p[1],o.p[2]),r.rotation.set(o.r[0],o.r[1],o.r[2]),r.scale.set(..._e(n.prim,o.s)),s&&(s.position.set(-o.p[0],o.p[1],o.p[2]),s.rotation.set(o.r[0],-o.r[1],-o.r[2]),s.scale.copy(r.scale))}}setDetailsVisible(t){if(this.detailsOn!==t){this.detailsOn=t;for(const n of this.details)for(const o of n.meshes)o.visible=t}}detailsOn=!0;setData(t){if((t.bones??[]).join()!==this.boneIds.join())return!1;const n=this.mesh.geometry,o=zt(t);return this.mesh.geometry=o,this.outline&&(this.outline.geometry=o),this.coat&&(this.coat.geometry=o),n.dispose(),!0}addCoat(t){const n=new lt(this.mesh.geometry,t);return n.bind(this.mesh.skeleton,this.mesh.bindMatrix),n.frustumCulled=!1,n.renderOrder=2,this.mesh.add(n),this.coat=n,n}pose(t,n){const o=n?this.model.clips?.find(f=>f.id===n||f.name===n):void 0,r=ke(this.model,t,o),s=new Map(r.map(f=>[f.prim.id,f]));this.boneIds.forEach((f,u)=>{const c=s.get(f),a=this.rest.get(f);if(!c||!a)return;const i=this.bones[u];i.position.set(c.p[0],c.p[1],c.p[2]),i.quaternion.setFromEuler(Ft.set(c.r[0],c.r[1],c.r[2])),i.scale.set(c.s[0]/(a.s[0]||1),c.s[1]/(a.s[1]||1),c.s[2]/(a.s[2]||1))}),this.details.length&&this.placeDetails(s)}dispose(){this.mesh.geometry.dispose();for(const t of this.details)for(const n of t.meshes)n.geometry.dispose()}}const It=new Map;function Se(e){const t=`${e.color}:${e.gloss??0}:${e.glow??0}`;let n=It.get(t);if(!n){const o=new X(e.color||"#ffffff");n=new Dt({color:o,roughness:e.gloss?Math.max(.08,.45-e.gloss*.45):.55,metalness:0,emissive:e.glow?o:new X(0),emissiveIntensity:(e.glow??0)*1.6}),It.set(t,n)}return n}const Ae=new Tt(1,10,8),Ce=new Dt({color:"#ffffff",emissive:"#ffffff",emissiveIntensity:1.4,roughness:1});function Pe(e){const t=new X(e||"#fff");return t.r+t.g+t.b<.35}function Ne(e){switch(e.shape){case"box":return new Jt(2,2,2);case"cylinder":return new Xt(1,1,2,16);case"cone":return new Yt(1,2,16);case"capsule":{const t=e.s[0],n=Math.max(e.s[1]-t,0);return new Qt(t,n*2,6,12)}default:return new Tt(1,20,14)}}function _e(e,t){return e.shape==="capsule"?[t[0]/(e.s[0]||1),t[1]/(e.s[1]||1),t[2]/(e.s[2]||1)]:e.shape==="cone"||e.shape==="cylinder"?[t[0],t[1],t[0]]:[t[0],t[1],t[2]]}const ze=`
${ne}
#include <skinning_pars_vertex>
attribute vec2 aFinish;
attribute float aPattern;
attribute vec2 aUv2;
attribute vec2 aPop;
uniform float uPopStart;
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying vec2 vFinish;
varying vec3 vLocal;
varying vec3 vObjNormal;
varying float vPattern;
varying vec2 vUv2;
void main() {
  vec3 objectNormal = normal;
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  vec3 transformed = position;
  #include <skinning_vertex>
  // Built pieces spring up out of the ground one after another (delay aPop.x, from height aPop.y).
  if (uPopStart > -999.) {
    float pt = uTime - uPopStart - aPop.x;
    float k = 0.;
    if (pt > 0.) {
      float w = 3.2 * 6.2831, z = .42, wd = w * sqrt(1. - z * z);
      k = 1. - exp(-z * w * pt) * (cos(wd * pt) + z * w / wd * sin(wd * pt));
    }
    transformed.y = aPop.y + (transformed.y - aPop.y) * max(k, 0.);
  }
  mat4 inst = mat4(1.);
  #ifdef USE_INSTANCING
    inst = instanceMatrix;
  #endif
  vec4 l3dWorldPos = modelMatrix * inst * vec4(transformed, 1.);
  vec3 l3dWorldNormal = normalize(mat3(modelMatrix) * mat3(inst) * objectNormal);
  vWorldPos = l3dWorldPos.xyz;
  vNormal = l3dWorldNormal;
  vColor = color;
  #ifdef USE_INSTANCING_COLOR
    vColor *= instanceColor;
  #endif
  vFinish = aFinish;
  vLocal = position;
  vObjNormal = normal;
  vPattern = aPattern;
  vUv2 = aUv2;
  gl_Position = projectionMatrix * viewMatrix * l3dWorldPos;
  ${oe}
}
`,Fe=`
${qt}
${te}
${ee}
uniform float uJelly;
uniform vec3 uTint;
uniform float uHit;
uniform float uGrain;
uniform float uSkin;
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec3 vColor;
varying vec2 vFinish;
varying vec3 vLocal;
varying vec3 vObjNormal;
varying float vPattern;
varying vec2 vUv2;
void main() {
  vec3 n = dot(vNormal, vNormal) > 1e-8 ? normalize(vNormal) : vec3(0., 1., 0.);
  vec3 v = normalize(cameraPosition - vWorldPos);
  // Handmade clay's fingerprint grain (only where a material asks for it).
  float grain = uGrain > 0. ? l3dNoise3(vLocal * 26.) * .7 + l3dNoise3(vLocal * 61.) * .3 : 0.;
  float near = 1. - smoothstep(3., 12., length(cameraPosition - vWorldPos));
  float bumpH = grain * .011 / .35 * (1. - vFinish.x) * near * uGrain;
  float glow = vFinish.y;
  vec3 col = vColor * uTint;
  if (vPattern > .5) {
    float pb = 0.;
    col = l3dPattern(vPattern, col, vLocal, normalize(vObjNormal), vUv2, pb, glow);
    // Relief only up close. The bump is screen-space (one slope per 2×2 pixels), so on walls a few metres off every
    // brick and stone shaded in blocky stair-steps — worse when the frame is rendered below screen resolution.
    bumpH += pb * .55 * (1. - smoothstep(4., 16., length(cameraPosition - vWorldPos)));
  }
  n = l3dBump(n, vWorldPos, bumpH, .35);
  col = mix(col * mix(1., .82, uWetness), vec3(.93, .95, 1.), uSnowCover * smoothstep(.45, .85, n.y) * .9);
  float shadow = l3dSunShadow() * l3dCloudShadow(vWorldPos);
  float gloss = max(vFinish.x, uWetness * .45);
  // Soft two-tone light (a gentle ramp) reads cute and round.
  float ndl = dot(n, uSunDir);
  float ramp = smoothstep(-.15, .35, ndl) * .82 + smoothstep(.35, .9, ndl) * .18;
  // Skin wraps the light further round, so a creature turns from lit to shade gently instead of along a line.
  ramp = mix(ramp, smoothstep(-.42, .55, ndl) * .86 + smoothstep(.5, 1., ndl) * .14, uSkin);
  vec3 lit = col * (uSunColor * ramp * shadow * .9 + l3dAmbient(n) * 1.05 * mix(vec3(1.), vec3(.86, .93, 1.16), (1. - ramp * shadow) * .6));
  // Light scattering under the skin: the side away from the sun keeps a warm, saturated version of the colour (ears
  // and fins glow a little when backlit) rather than going grey.
  vec3 deep = col * col * 1.7;
  lit += deep * uSunColor * (1. - ramp * shadow) * (.1 + .16 * l3dTranslucency(n, v, 3.)) * uSkin;
  vec3 h = normalize(uSunDir + v);
  // A soft sheen, not a glint: capped so glossy eyes, wings and shells never flare into the bloom.
  lit += min(uSunColor * pow(max(dot(n, h), 0.), mix(14., 70., gloss)) * (.035 + gloss * .3) * shadow, vec3(.55));
  // Rim light separates the figure from the grass.
  float rim = pow(1. - max(dot(n, v), 0.), 3.);
  lit += (l3dAmbient(n) * .5 + uSunGlow * .25) * rim * .55;
  // A soft velvet sheen on the silhouette of fur and skin, brighter on the sunny side.
  lit += (col * .6 + .25) * uSunColor * pow(1. - max(dot(n, v), 0.), 2.2) * (.05 + .1 * max(ndl, 0.)) * shadow * uSkin;
  lit += col * glow * 1.6;
  lit += l3dPoints(col, n, vWorldPos);
  lit = mix(lit, vec3(1., .95, .9), uHit * .6);
  lit = l3dFog(lit, vWorldPos);
  gl_FragColor = vec4(lit, 1.);
}
`;export{Be as C,ie as O,re as S,Le as a,Ee as b,zt as c,$e as d,ae as e,De as f,Oe as g,We as h,Ge as i,fe as j,O as k,se as l,Lt as m,gt as n,ke as p,Te as s};
