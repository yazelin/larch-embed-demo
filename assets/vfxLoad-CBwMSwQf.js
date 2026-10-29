import{G as ot,C as it,M as Qe,an as X,aX as qe,g as se,al as U,D as Ke,X as Be,c as Ye,T as st,e as He,a$ as nt,V as ie,ap as rt,aq as lt,S as ct,A as ft,ao as pt,o as vt,Q as We,E as ut,b0 as Ue,aZ as Ze}from"./three-engine-DgueuEcG.js";import{m as ht}from"./sfx-BRGz48kp.js";import"./stageModel-CnGp4kR2.js";import"./builtInPropThumbnails.generated-HzKuy-AN.js";import"./preload-helper-BXl3LOEh.js";import"./compression-NJe3JlLV.js";import"./compileQuietly-CK7nzn7y.js";function dt(){return`
 float grassHash(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
 vec2 windAt(vec2 root, float phase) {
   float wave = sin(dot(root, vec2(1.1, .7)) - uTime * 1.45);
   float gust = .5 + .5 * sin(dot(root, vec2(.48, -.31)) - uTime * .63);
   float flutter = sin(uTime * 2.6 + phase + root.x * 3.0) * .025;
   return vec2(.12 + wave * .11 + gust * .13, .035 + wave * .045 + flutter);
 }
`}function mt(){return`
 float brushStreak(float h, float seed) {
   return sin(h * 23.0 + sin(h * 9.0 + seed * 11.0) * 2.2 + seed * 31.0);
 }
`}function yt($,R={}){const E=$.kind,x=$.variant,Ie={"0:3":3,"1:1":4,"1:3":6,"3:1":12,"3:3":9,"3:4":5,"2:4":9,"2:5":3,"2:6":4,"2:7":3,"3:7":10,"2:8":7,"3:8":13,"7:0":7,"7:1":4,"1:5":9,"3:9":14,"3:10":9,"1:6":8,"9:0":6}[`${E}:${x}`]??1,ne=$.renderStyle==="toon"&&(E===3||E===4),xe=Math.min(E===5?128:1024,Math.max(1,$.maxParticles)),K=new ot;K.name=$.id;let Q={color:$.color,size:1,density:$.defaultDensity??.5,speed:1,detail:1,...$.quantity?{quantity:$.quantity.default}:{},...$.spread?{spread:$.spread.default}:{},...R},H=0,te=!1,B=0,Y=null,me=0;const _=new ie(1,0,0),ye=new ie(1,0,0),ve=new ie,re=new Set,ce=new Set,ae=[],fe=[],ge=[],Re=[],Fe=[];function we(o,w="xyz",h=0){return ge.push({object:o,axes:w,pivot:h,scale:o.scale.clone(),position:o.position.clone()}),o}const Te={uTime:{value:0},uColor:{value:new it},uQuantity:{value:Ie},uSpread:{value:1},uStretch:{value:1},uSize:{value:1},uDetail:{value:1}},f={0:[.35,.8],1:[x===2?1.6:.4,.6],2:[.7,1],4:[1.1,1.4],5:[.5,1.2]},c=$.burst?[$.duration*.1,$.duration*.45]:f[E]??[.3,.8],r={start:Math.max(.001,Number($.lifecycle?.start)||c[0]),end:Math.max(.001,Number($.lifecycle?.end)||c[1])};let v="starting",T=0,b=-1,S=1,A=!1;const z={uLifeStage:{value:0},uLifeStart:{value:0},uLifeEnd:{value:0},uLifeOrigin:{value:1},uStopTime:{value:-1},uEndDuration:{value:r.end},uImpact:{value:0},uEmitterTime:{value:0}},j=new Qe,Z=new Qe;let ue=-1,de=null;const W=`
    uniform float uLifeStage,uLifeStart,uLifeEnd,uLifeOrigin;
    uniform mat4 uClipToGroup,uGroupToClip;
    varying vec3 vStagePosition;varying float vStagePart;
    vec3 stageShape(vec3 p,float s,float e,float part){
      float grow=s*s*(3.0-2.0*s),curl=(1.0-grow);
      #if KIND == 0
        float tail=1.0-smoothstep(-1.4,.25,p.x);
        #if VARIANT == 0
          p.yz*=mix(.22,1.0,grow);p.x=mix(p.x*.38-.16,p.x,grow);
          p.y+=sin(p.x*4.5+s*7.0)*curl*.15;
        #elif VARIANT == 1
          p.x*=mix(1.3,1.0,grow);p.yz*=mix(.08,1.0,grow);
        #elif VARIANT == 2 || VARIANT == 4
          float assemble=ceil((atan(p.z,p.y)+3.14159)*3.0)*.028;
          p.yz*=1.0+curl*(.8+assemble);p.x-=curl*(.2+assemble);
        #elif VARIANT == 3
          p.yz*=1.0+curl*.8;p.x+=sin(p.y*7.0)*curl*.4;
        #elif VARIANT == 5
          p.z+=sin(p.x*4.0)*curl*.75;p.x-=curl*.5;
        #else
          p.yz*=1.0+curl*.85;float turn=curl*2.4;
          p.yz=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*p.yz;
        #endif
        p.x-=e*tail*1.6;p.yz*=1.0-e*.75;
      #elif KIND == 1
        // Range is revealed in fragments; endpoints never change coordinates.
        p.yz*=mix(.35,1.0,grow)*(1.0-e*.7);
      #elif KIND == 2
        float r=length(p.xz),a=atan(p.z,p.x);
        float cell=floor((a+3.14159)*3.0);float stagger=smoothstep(.04+fract(part*.37+cell*.13)*.2,.9,e);
        #if VARIANT == 0
          p.y+=curl*(.15+sin(a*5.0)*.08);float returnTime=smoothstep(.0,.72,e);float turn=returnTime*.8;p.xz=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*p.xz;p.xz*=1.0-returnTime*.95;p.y=mix(p.y,.06,returnTime)+sin(returnTime*3.14159)*.32;
        #elif VARIANT == 1
          p.y*=grow*(1.0-stagger*.8);p.y+=sin(stagger*3.14159)*.16;p.xz*=1.0+stagger*.1;
        #elif VARIANT == 2
          vec2 cellCenter=(floor(p.xz*2.5)+.5)/2.5;vec2 local=p.xz-cellCenter;float tumble=stagger*(1.0+fract(cell*.71)*2.0);p.xz=cellCenter*(1.0+stagger*.65)+local*cos(tumble);p.y+=local.x*sin(tumble)+sin(stagger*3.14159)*(.25+fract(cell*.71)*.45)-stagger*stagger*.35;p.xz*=mix(.7,1.0,grow);
        #elif VARIANT == 3
          p.y*=grow;float release=smoothstep(fract(cell*.37)*.2,.72,e);p*=1.0+release*.4;p.y+=release*(.12+max(0.0,p.y)*.4);
        #elif VARIANT == 4
          p.y*=grow;p.xz*=1.0+stagger*.32;p.y-=stagger*stagger*max(0.0,p.y)*.9;p.x+=sin(part*3.1)*stagger*.18;
        #elif VARIANT == 5
          p.y*=grow;float release=smoothstep(.02+fract(part*.31)*.2,.72,e);float loosen=release*(.4+max(0.0,p.y)*.7);p.xz+=vec2(cos(part*2.4),sin(part*2.4))*loosen;p.y+=sin(release*3.14159)*.28-release*release*.55;
        #elif VARIANT == 6
          float height=max(0.0,p.y);float retract=smoothstep(.0,.9,e);float bend=retract*height*2.1;float turn=curl*2.7+retract*.4;
          p.xz=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*p.xz;p.xz*=1.0-retract*.3;p.xz+=vec2(cos(a),sin(a))*(cos(bend)-1.0)*height*.45;
          p.y=grow*(height*cos(bend)*(1.0-retract*.5)+min(p.y,0.0));
        #elif VARIANT == 7
          float slide=smoothstep(.04+(.5+.5*sin(a*3.0))*.25,.9,e);p.y*=grow*(1.0-slide);p.y+=sin(slide*3.14159)*(.08+.06*sin(a*2.0));p.xz*=1.0-slide*.83;
        #else
          float pop=smoothstep(.08+fract(part*.41)*.25,.65+fract(part*.41)*.25,e);p.y*=grow*(1.0-pop*.85);p.xz*=mix(.55,1.0,grow)*(1.0+sin(pop*3.14159)*.65);
        #endif
      #elif KIND == 3
        float radius=length(p.xz),angle=atan(p.z,p.x);
        #if VARIANT == 2
          float crest=sin(radius*5.0-e*5.0+sin(angle*5.0));p.y+=crest*sin(e*3.14159)*.18;p.xz*=1.0+e*.12;
        #elif VARIANT == 4
          float h=max(0.0,p.y+1.3);p.z+=sin(h*4.0-e*6.0)*e*.4;p.y+=cos(h*3.5-e*5.0)*e*.24;p.x*=1.0+e*.2;
        #elif VARIANT == 5
          p.x+=sin(p.y*25.0+floor(e*17.0))*e*.07;p.z+=sin(p.y*18.0-floor(e*13.0))*e*.06;
        #elif VARIANT == 6
          float h=max(0.0,p.y+1.3);float roll=e*3.8+radius*2.0;p.y+=sin(roll)*h*.7;p.xz*=1.0+sin(roll)*h*.15;
        #elif VARIANT == 7
          float ray=length(p);p*=1.0-e*.22;p.y+=sin(ray*7.0+e*8.0)*e*.04;
        #endif
      #elif KIND == 4
        float h=clamp((p.y+1.4)/3.4,0.0,1.0);
        // 大範圍捲流向內聚攏；正常持續及收尾（s=1）保持原來的變形。
        float gather=curl*(1.0-smoothstep(0.0,.6,e));
        p.y=-1.4+(p.y+1.4)*(1.0+gather*.10);
        float turn=gather*(1.0-h)*.55-e*.45;p.xz=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*p.xz;p.xz*=1.0+gather*.45+e*.18;
        #if VARIANT == 1
          p.y=max(-1.38,p.y-e*e*h*.7);
        #endif
      #elif KIND == 5
        #if VARIANT == 1
          p.xz*=mix(.18,1.0,grow)*(1.0+e*.18);
        #else
          p.y=-1.4+(p.y+1.4)*mix(.2,1.0,grow);
        #endif
      #endif
      return p;
    }
  `,oe=`
    uniform float uLifeStage,uLifeStart,uLifeEnd,uLifeOrigin,uImpact;
    varying vec3 vStagePosition;varying float vStagePart;
    float phaseCoverage(vec3 p){
      float s=uLifeStart,e=uLifeEnd;
      float a=atan(p.z,p.x),r=length(p.xz);
      float start=1.0,end=1.0;
      #if KIND == 0
        #if VARIANT == 0
          float curl=sin(p.x*6.0+p.y*5.0+s*9.0)*.06;
          start=smoothstep(0.0,.18,s)*smoothstep(-.12,.12,s-(.15+clamp(-p.x,0.0,3.0)*.2+curl));
        #elif VARIANT == 1
          start=smoothstep(.0,.12,s)*smoothstep(-.1,.1,s-abs(p.x)*.24);
        #elif VARIANT == 2 || VARIANT == 4
          start=smoothstep(-.08,.08,s-(.12+fract(atan(p.z,p.y)*1.7)*.56));
        #elif VARIANT == 3
          start=smoothstep(-.12,.12,s-(.1+fract(p.x*.8+p.y)*.55));
        #elif VARIANT == 5
          start=smoothstep(-.13,.13,s-(.15+clamp(-p.x,0.0,2.0)*.25));
        #else
          start=smoothstep(-.13,.13,s-(.1+fract(atan(p.z,p.y)*.5-p.x*.3)*.6));
        #endif
        end=1.0-smoothstep(0.0,uImpact>.5?.28:.9,e);
      #elif KIND == 1
        float x=clamp((p.x+2.4)/4.8,0.0,1.0);
        start=smoothstep(-.08,.08,s*1.16-.08-x);
        end=smoothstep(-.14,.05,x-e*1.22+.12)*(1.0-smoothstep(.78,1.0,e));
      #elif KIND == 2
        float pattern=0.0;
        #if VARIANT == 0
          pattern=.1+r*.25+sin(a*5.0)*.08;
        #elif VARIANT == 1
          pattern=.12+fract(a/6.28318*5.0)*.22+r*.2;
        #elif VARIANT == 2
          pattern=.1+r*.25+abs(sin(a*3.0))*.1;
        #elif VARIANT == 3
          pattern=.12+max(abs(p.x),abs(p.z))*.27+max(0.0,p.y)*.18;
        #elif VARIANT == 4
          pattern=.1+fract(floor(p.x*3.0)+floor(p.z*3.0)*.38)*.35+max(0.0,p.y)*.2;
        #elif VARIANT == 5
          pattern=.14+fract(a/6.28318*3.0)*.3+max(0.0,p.y)*.2;
        #elif VARIANT == 6
          pattern=.08+r*.18+max(0.0,p.y)*.25;
        #elif VARIANT == 7
          pattern=.1+(1.7-r)*.25+abs(sin(a*1.5))*.12;
        #else
          pattern=.12+r*.2+sin(a*3.0)*.1;
        #endif
        pattern=clamp(pattern,.08,.75);
        start=smoothstep(-.08,.08,s-pattern);
        end=1.0-smoothstep(-.12,.12,e-(.18+pattern*.75));
        #if VARIANT == 0
          end=1.0-smoothstep(.64,.98,e);
        #elif VARIANT == 5 || VARIANT == 6 || VARIANT == 7
          end=1.0-smoothstep(.55,.98,e);
        #endif
        if(e>0.0){
          #if VARIANT == 1
            float ash=.5+.5*sin(p.x*31.0+p.z*23.0+sin(p.x*17.0)*3.0);end*=smoothstep(e*.7-.1,e*.7+.12,ash);
          #elif VARIANT == 3
            float sector=fract(a*1.4324);float gap=smoothstep(.03,.38,e)*.22;end*=smoothstep(gap,gap+.025,sector)*(1.0-smoothstep(1.0-gap-.025,1.0-gap,sector));
          #elif VARIANT == 2 || VARIANT == 4
            vec2 tile=abs(fract(p.xz*2.5)-.5);float crack=max(tile.x,tile.y);end*=1.0-smoothstep(.5-e*.25,.51-e*.25,crack);
          #elif VARIANT == 7
            float grain=.5+.5*sin(p.x*19.0+sin(p.z*15.0)*2.0);end*=mix(1.0,smoothstep(e*.65-.12,e*.65+.15,grain),smoothstep(.5,.9,e));
          #elif VARIANT == 8
            float pop=smoothstep(.08+fract(vStagePart*.41)*.25,.65+fract(vStagePart*.41)*.25,e);end*=1.0-smoothstep(.015,.08,max(0.0,p.y)-(.9-pop*1.5));
          #endif
        }
      #elif KIND == 3
        if(e>0.0){
          #if VARIANT == 2
            float breakUp=.5+.5*sin(a*7.0+sin(a*3.0)+p.y*5.0);end=smoothstep(e*.6-.1,e*.6+.12,breakUp);
          #elif VARIANT == 4
            float flame=.5+.5*sin(p.x*7.0+sin(p.y*5.0-e*9.0)*2.0+p.z*3.0);end=smoothstep(e*.82-.08,e*.82+.09,flame);
          #elif VARIANT == 5
            float segment=floor(p.y*3.0);float discharge=.5+.5*sin(segment*4.7+floor(e*13.0)*2.9);end=mix(smoothstep(.32,.55,discharge)*(1.0-smoothstep(.1,.55,e)),1.0,1.0-smoothstep(-.9,-.3,p.y));
          #elif VARIANT == 6
            float foam=.5+.5*sin(a*11.0+sin(p.y*9.0+e*8.0)+r*4.0);end=smoothstep(e*.88-.08,e*.88+.12,foam);
          #elif VARIANT == 7
            float ray=length(p);float streak=.5+.5*sin(a*9.0+floor(e*9.0)*2.4);end=1.0-smoothstep((1.0-e)*3.0+.2,(1.0-e)*3.0+.5,ray);end*=mix(.2,1.0,streak);
          #endif
        }
      #elif KIND == 4
        float h=clamp((p.y+1.4)/3.4,0.0,1.0);
        start=smoothstep(0.0,.13,s);
        end=1.0-smoothstep(.45,1.0,e);
      #elif KIND == 5
        start=smoothstep(.0,.25,s);
        end=1.0-smoothstep(.35,1.0,e);
      #endif
      return start*end;
    }
  `;function le(){if(!($.burst&&!(E===3&&x===2))){for(const o of ce){if(o.userData.ownLifecycle)continue;E===0&&!o.transparent&&Fe.push(o);const w=o.vertexShader.includes("attribute float aPhase")?"aPhase":o.vertexShader.includes("attribute vec4 seed")?"seed.x*37.0":"0.0";E===2&&[0,2,3,5,6,7,8].includes(x)&&(o.vertexShader=o.vertexShader.replace(/\buTime\b/g,"uEmitterTime"),o.fragmentShader=o.fragmentShader.replace(/\buTime\b/g,"uEmitterTime"));const g=o.vertexShader.replace(/void\s+main\s*\(\s*\)/,"void steadyMain()"),l=o.fragmentShader.replace(/void\s+main\s*\(\s*\)/,"void steadyMain()");o.uniforms={...o.uniforms,...z,uClipToGroup:{value:j},uGroupToClip:{value:Z}},o.vertexShader=W+g+`
        void main(){steadyMain();vStagePosition=vec3(0.0);vStagePart=${w};if(uLifeStage==1.0)return;
          vec4 p=uClipToGroup*gl_Position;p/=p.w;vStagePosition=p.xyz;
          gl_Position=uGroupToClip*vec4(stageShape(p.xyz,uLifeStart,uLifeEnd,vStagePart),1.0);
        }`,o.fragmentShader=oe+l+`
        void main(){steadyMain();if(uLifeStage==1.0)return;
          float coverage=phaseCoverage(vStagePosition);
          if(coverage<.004)discard;gl_FragColor.a*=coverage;
          #if KIND == 1 && VARIANT == 4
            float radius=length(vStagePosition.yz);float core=1.0-smoothstep(.04,.22,radius);float atEnd=smoothstep(1.65,2.05,abs(vStagePosition.x));
            float petal=floor((atan(vStagePosition.z,vStagePosition.y)+3.14159)*.955);float release=smoothstep(.15+fract(petal*.381)*.3,.85,uLifeEnd);
            gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0,.97,.81),core*.75);
            gl_FragColor.a*=mix(.55+.45*core,1.0-release,atEnd);
            gl_FragColor.a*=1.0-atEnd*smoothstep(.35,.9,uLifeEnd)*smoothstep(.05,.55,radius);
          #elif KIND == 2 && VARIANT == 1
            gl_FragColor.rgb*=1.0-uLifeEnd*.75;
          #elif KIND == 4 && VARIANT == 2
            gl_FragColor.rgb*=1.0-uLifeEnd*.6;
          #elif KIND == 3 && VARIANT == 6
            gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(.8,.94,1.0),uLifeEnd*.65);
          #endif
        }`}if(E===2){for(const o of K.children)if(o.geometry.type==="PlaneGeometry"){const w=o.geometry,h=w.parameters,g=new X(h.width,h.height,24,24),l=new se,u=w.attributes.position.count;for(const P of["position","normal","uv"])l.setAttribute(P,new U([...w.attributes[P].array,...g.attributes[P].array],w.attributes[P].itemSize));l.setIndex([...w.index.array,...Array.from(g.index.array,P=>P+u)]),Re.push({geometry:l,steady:w.index.count,transition:g.index.count}),o.geometry=l,re.delete(w),w.dispose(),g.dispose(),re.add(l)}}for(const o of K.children)o.onBeforeRender=(w,h,g)=>{v!=="active"&&((ue!==w.info.render.frame||de!==g)&&(Z.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse).multiply(K.matrixWorld),j.copy(Z).invert(),ue=w.info.render.frame,de=g),o.material.uniformsNeedUpdate=!0)}}}const C=`
    float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise2(vec2 p) {
      vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
    }
    float fbm(vec2 p) { return noise2(p)*0.57+noise2(p*2.07+3.1)*0.29+noise2(p*4.13-1.7)*0.14; }
    float band(float x,float width) { return 1.0-smoothstep(width,width+0.004,abs(x)); }
    #define PI 3.14159265359
  `,J=`
    float toonStep(float edge,float x){float aa=max(fwidth(x),.008);return smoothstep(edge-aa,edge+aa,x);}
    vec3 toonShade(vec3 tint,float light){
      vec3 c=mix(tint*.28,tint*1.08,toonStep(.40,light));
      return mix(c,mix(tint,vec3(1.0),.53)*1.15,toonStep(.69,light));
    }
  `,pe=`
    vec3 noiseGradient(vec2 p){
      vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f),du=6.0*f*(1.0-f);
      float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
      return vec3(mix(mix(a,b,u.x),mix(c,d,u.x),u.y),du.x*mix(b-a,d-c,u.y),du.y*mix(c-a,d-b,u.x));
    }
    vec3 curlFlow(vec3 p,float t){
      // A=(N(y,z),N(z,x),N(x,y)) 的解析 curl；所有元件取樣同一空間。
      vec3 ax=noiseGradient(p.yz+vec2(7.3-t*0.22,1.7+t*0.11));
      vec3 ay=noiseGradient(p.zx+vec2(13.1+t*0.13,5.4-t*0.19));
      vec3 az=noiseGradient(p.xy+vec2(2.9-t*0.16,17.2+t*0.14));
      return vec3(az.z-ay.y,ax.z-az.y,ay.z-ax.y)*0.65;
    }
  `,Se=`
    vec3 flameErosion(vec2 uv,float t,float seed){
      vec2 p=vec2(uv.x+uv.y*0.65,uv.y);
      float warp=noise2(p*vec2(3.1,2.7)+vec2(seed,t*-0.31));
      p.x+=(warp-0.5)*0.6;
      float broad=noise2(p*vec2(4.0,2.2)+vec2(seed*3.7,-t*0.85));
      float fine=noise2(p*vec2(10.5,5.0)+vec2(seed*7.1,-t*1.35));
      float erosion=broad*0.72+fine*0.28;
      float interior=1.0-abs(uv.x*2.0-1.0);
      float shape=interior-(1.0-erosion)*0.67;
      float aa=max(fwidth(shape)*0.8,0.018);
      float mask=smoothstep(-aa,aa+0.07,shape);
      float heat=clamp(shape*0.9+broad*0.25,0.0,1.0);
      float edge=exp(-abs(shape)*24.0)*smoothstep(0.28,0.58,erosion);
      return vec3(mask,heat,edge);
    }
    vec3 flameColor(vec3 tint,float heat){
      vec3 c=mix(tint*0.065,tint*1.35,smoothstep(0.06,0.48,heat));
      return mix(c,tint*1.6+vec3(1.0,0.85,0.50),smoothstep(0.48,0.84,heat));
    }
  `,be=`
    vec2 smokeOptics(vec2 q,vec2 densityGradient,float density,vec3 lightDir){
      float dome=sqrt(max(0.015,1.0-dot(q,q)));
      vec3 n=normalize(vec3(q-densityGradient*0.13,dome));
      float wrap=clamp(dot(n,lightDir)*0.7+0.3,0.0,1.0);
      float thickness=dome*(0.3+density*1.1);
      float transmission=exp(-thickness*1.7);
      float rim=pow(1.0-dome,2.0)*wrap*0.20;
      return vec2((0.16+wrap*0.70)*mix(0.55,1.0,transmission)+rim,1.0-exp(-thickness*1.8));
    }
  `,L=`
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  `,Ae=`
    varying vec2 vUv;
    void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
  `,Ce=`
    float styleStep(float edge,float value){float aa=max(fwidth(value),.012);return smoothstep(edge-aa,edge+aa,value);}
    vec3 styleColor(vec3 tint,float light){
      vec3 c=mix(tint*.22,tint*.72,styleStep(.38,light));
      return mix(c,mix(tint,vec3(1.0),.38)*1.04,styleStep(.70,light));
    }
    vec3 styleHeat(vec3 tint,float heat){
      vec3 c=mix(tint*.24,tint*1.05,styleStep(.38,heat));
      return mix(c,mix(tint,vec3(1.0,.88,.51),.62),styleStep(.70,heat));
    }
  `;function M(o,w=Ae,h={},g=!0,l={}){const u=new ct({uniforms:{...Te,...z,...h},defines:{KIND:E,VARIANT:x,TOON:ne?1:0,...l},vertexShader:`uniform float uSize;
`+w,fragmentShader:`uniform float uDetail;
`+(ne?Ce:"")+o,transparent:!0,depthWrite:!1,side:Ke,blending:g&&!ne?ft:pt});return ce.add(u),u}function G(o,w,h=1){re.add(o);const g=new vt(o,w);return g.frustumCulled=!1,g.renderOrder=h,K.add(g),g}function ee(o,w,h,g,l=1){const u=new rt;o.index&&u.setIndex(o.index.clone());for(const k of Object.keys(o.attributes))u.setAttribute(k,o.attributes[k].clone());o.dispose();const P=new Float32Array(w*4);let V=($.seed??(($.index??0)+1)*9187)+ae.length*311;for(let k=0;k<P.length;k++)V=V*1664525+1013904223>>>0,P[k]=V/4294967296;return u.setAttribute("seed",new lt(P,4)),ae.push({geometry:u,weight:h,maximum:w}),G(u,g,l)}const Ve=`
    attribute vec4 seed;
    uniform float uStopTime,uEndDuration,uQuantity,uSpread;
    uniform float uTime;
    uniform float uStretch;
    varying vec2 vUv;
    varying float vAlpha;
    varying float vSeed;
    varying float vLife;
    varying float vLight;
    ${C}
    ${pe}
    varying vec3 vKeyLight;
    void main(){
      vKeyLight=normalize(mat3(viewMatrix)*vec3(-0.45,0.8,0.55));
      vUv=uv;vSeed=seed.w;vLight=1.0;
      float t=uTime,a=seed.x*PI*2.0,r=sqrt(seed.z);
      float life=fract(seed.y+t*0.35);
      vec3 p=vec3(0.0);vec2 shape=vec2(1.0);
      float size=0.05+seed.w*0.06;
      vAlpha=0.8;vLife=life;
      #if CLOUD == 1
        #if KIND == 3
          float age=clamp(t/2.8,0.0,1.0);
          float rise=1.0-exp(-t*4.0);
          float crown=step(0.35,seed.y);
          float expansion=(0.25+rise*1.2)*(0.25+seed.z*0.75);
          p=vec3(cos(a)*expansion*crown,-1.36+rise*(0.5+seed.y*2.45)+age*0.3,sin(a)*expansion*crown);
          p.xz+=vec2(sin(t*1.5+a),cos(t*1.7+a))*age*0.25;
          size=(0.3+rise*0.85)*(0.6+seed.w*0.7);
          vAlpha=smoothstep(0.02,0.18,t)*pow(1.0-age,1.2)*0.72;
          vLife=age;vLight=max(0.0,1.0-t*0.65)*(1.0-crown*seed.y*0.5);
          #if VARIANT == 1
            p=vec3(cos(a)*r*(0.3+age*1.5),-1.3+rise*(seed.y*0.6)+age*0.4,sin(a)*r*(0.3+age*1.5));size*=0.6;vAlpha*=0.28;
          #elif VARIANT == 2
            float front=(1.0-exp(-t*2.3))*2.55;float scatter=front*(0.35+seed.z*0.7);p=vec3(cos(a)*scatter,-1.35+sin(age*PI)*(0.12+seed.y*0.40),sin(a)*scatter);size*=0.65;shape=vec2(1.7,0.65);vAlpha*=0.42;
          #elif VARIANT == 3
            p.xz*=1.5;p.y=-1.3+age*0.6+seed.y*0.35;size*=0.75;vAlpha*=0.55;
          #endif
        #else
          float h=uStopTime<0.0?fract(seed.y+t*0.15):min(1.0,fract(seed.y+uStopTime*0.15)+(t-uStopTime)/uEndDuration);
          float spread=0.18+pow(h,0.8)*0.7;
          p=vec3(cos(a+h*4.0)*r*spread+sin(h*5.0+t*0.4)*0.25,h*3.5-1.4,sin(a+h*4.0)*r*spread);
          size=(0.48+h*0.95)*(0.75+seed.w*0.45);
          vAlpha=sin(h*PI)*0.5;vLife=h;
          #if VARIANT == 1
            p=vec3(cos(a+t*0.08)*r*2.0,-1.12+seed.y*0.45,sin(a+t*0.08)*r*1.6);
            size=0.9+seed.w*1.0;shape=vec2(1.5,0.6);vAlpha=0.23;vLife=seed.y;
          #elif VARIANT == 2
            h=uStopTime<0.0?fract(seed.y+t*0.48):min(1.0,fract(seed.y+uStopTime*0.48)+(t-uStopTime)/uEndDuration);
            p=vec3(cos(a+h*7.0)*h*h*0.85,h*3.6-1.4,sin(a+h*7.0)*h*h*0.65);
            size=0.18+h*0.9;shape=vec2(1.0,1.25);vAlpha=sin(h*PI)*0.34;vLife=h;
          #elif VARIANT == 3
            float age=clamp(t/3.5,0.0,1.0),expand=1.0-exp(-t*3.2);
            p=vec3(cos(a)*r*expand*1.55,-0.8+seed.y*expand*1.6+age*0.6,sin(a)*r*expand*1.55);
            size=(0.3+expand*0.85)*(0.6+seed.w*0.6);
            vAlpha=smoothstep(0.0,0.15,t)*pow(1.0-age,1.5)*0.6;vLife=age;
          #endif
        #endif
      #else
        #if KIND == 0
          life=fract(seed.y+t*0.65);
          p=vec3(0.85-life*3.6,sin(a)*r*(0.05+life*0.38),cos(a)*r*(0.05+life*0.38));
          size=0.04+seed.w*0.1;vAlpha=pow(1.0-life,1.5);shape=vec2(2.6,0.6);
          #if VARIANT == 0
            p=vec3(0.65-life*(2.8+seed.z*0.7),sin(a)*r*(0.16+life*0.50),cos(a)*r*(0.16+life*0.50));p.y+=sin(life*9.0-t*5.0+a)*life*0.24;size=0.018+seed.w*0.052;vAlpha=sin(life*PI)*pow(1.0-life,1.2)*0.65;shape=vec2(2.3,0.45);
          #elif VARIANT == 1
            p.yz*=0.9;shape=vec2(4.8,0.3);p.yz+=vec2(cos(a),sin(a))*sin(life*PI)*0.14;vAlpha*=0.2+0.8*step(0.45,sin(life*24.0+t*12.0+seed.z*9.0));
          #elif VARIANT == 2
            shape=vec2(2.2,0.6);p.yz*=1.25;p.y-=life*life*0.4;size*=0.42;vAlpha*=0.35+0.35*pow(max(0.0,sin(t*4.0+seed.z*31.0)),6.0);
          #else
            float spiral=life*12.0-t*3.0+(uQuantity==3.0?floor(seed.x*3.0)*2.094:floor(seed.x*uQuantity)*6.283185307/uQuantity);
            p.yz=vec2(cos(spiral),sin(spiral))*((0.26*mix(uSize,1.0,smoothstep(0.0,0.35,life))+life*0.16)*uSpread)+p.yz*0.07;
            shape=vec2(2.0,0.6);
          #endif
        #elif KIND == 1
          float phase=fract(seed.y+t*1.7);
          if(seed.x<0.26){
            p=vec3(-2.4+phase*0.45/uStretch,cos(a)*phase*0.4,sin(a)*phase*0.4);
            vAlpha=1.0-phase;size=0.04;shape=vec2(2.0,0.65);
          }else if(seed.x>0.58){
            float spread=phase*(0.3+seed.z*0.8);
            p=vec3(2.4-phase*(0.2+seed.w*0.65)/uStretch,cos(a)*spread,sin(a)*spread);
            vAlpha=pow(1.0-phase,1.3);shape=vec2(1.0,3.0);size=0.025+seed.w*0.045;
          }else{
            p=vec3((phase-0.5)*4.8,cos(a+t*4.0)*0.12*r,sin(a+t*4.0)*0.12*r);
            vAlpha=0.6;shape=vec2(2.7,0.5);
          }
          #if VARIANT == 2
            float cycle=t,charge=min(cycle/1.52,1.0),release=smoothstep(1.52,1.60,cycle);
            if(seed.x<0.58){float incoming=fract(seed.y+t*(0.45+charge*0.6));float radius=(1.0-incoming)*(0.35+seed.z*0.75);float angle=a-t*2.0;p=vec3(-2.4-(1.0-incoming)*0.7/uStretch,cos(angle)*radius*uSize,sin(angle)*radius*uSize);vAlpha=sin(incoming*PI)*(0.25+charge*0.75)*(1.0-release*0.4);shape=vec2(2.2,0.5);}
            else{vAlpha*=release;size*=0.7+release*0.6;p.yz*=1.0+release*0.35;}
          #elif VARIANT == 3
            p.yz+=sin(vec2(seed.z*41.0,seed.w*33.0)+floor(t*15.0))*0.1;
          #endif
      #elif KIND == 2
          float spin=a+t*0.15;
          p=vec3(cos(spin)*r*1.85,life*1.4,sin(spin)*r*1.85);
          vAlpha=sin(life*PI)*0.55;size=0.04+seed.w*0.055;
          #if VARIANT == 1
            p.y=life*(0.3+r*0.7);p.xz+=vec2(sin(t*2.0+a),cos(t*2.3+a))*life*0.12;shape=vec2(0.8,3.6);size=0.07+seed.w*0.10;
          #elif VARIANT == 2
            p.y=0.08+life*0.4;p.xz*=0.88+0.12*sin(life*PI);shape=vec2(1.0);vAlpha*=0.5+0.5*pow(max(0.0,sin(t*2.0+seed.z*29.0)),4.0);
          #elif VARIANT == 3
            p=vec3(cos(spin)*sin(seed.y*PI*0.5),cos(seed.y*PI*0.5),sin(spin)*sin(seed.y*PI*0.5))*1.85;
            vAlpha=0.25+0.2*sin(t*2.0+seed.z*6.0);
          #endif
        #elif KIND == 3
          float age=clamp(t/2.8,0.0,1.0);
          float dt=max(0.0,t-seed.w*0.1);
          float speed=0.4+seed.z*1.6;
          p=vec3(cos(a)*speed*dt,-1.35+(2.5+seed.y*3.3)*dt-2.5*dt*dt,sin(a)*speed*dt);
          p.y=max(-1.36,p.y);vAlpha=pow(1.0-age,1.7)*0.65;size=0.018+seed.w*0.045;shape=vec2(0.6,2.5);
          #if VARIANT == 1
            float ray=floor(seed.x*8.0)/8.0*PI*2.0;p=vec3(cos(ray)*dt*speed*0.8,-1.35+dt*(3.0+seed.y*3.5),sin(ray)*dt*speed*0.8);shape=vec2(0.3,6.0);vAlpha*=1.0-smoothstep(0.35,1.25,t);
            #if TOON == 1
              vec3 discharge=normalize(vec3(cos(a),.6+seed.y*1.8,sin(a)));
              p=discharge*(.15+dt*(2.0+seed.z*3.0));p.y-=1.2;
              shape=vec2(3.2,.3);vAlpha*=smoothstep(.06,.13,t);
            #endif
          #elif VARIANT == 2
            p.xz*=1.7;p.y=-1.35+(1.2+seed.y*2.2)*dt-2.5*dt*dt;p.y=max(-1.36,p.y);size*=0.8;shape=vec2(1.0);vAlpha*=0.4;
          #elif VARIANT == 3
            size*=0.85;shape=vec2(0.7,1.8);
          #endif
        #elif KIND == 4
          float h=uStopTime<0.0?fract(seed.y+t*.3):min(1.0,fract(seed.y+uStopTime*.3)+(t-uStopTime)*.55),spin=h*9.6-t*5.28+a;
          float radius=0.09+pow(h,1.45)*1.05+pow(h,4.0)*0.65;
          #if TOON == 1
            radius+=.22*(1.0-smoothstep(.08,.55,h));
          #endif
          p=vec3(cos(spin)*radius,h*3.6-1.4,sin(spin)*radius);
          p.x+=sin(h*2.6+t*0.5)*h*0.35;
          size=0.025+seed.w*0.04;shape=vec2(4.0,0.45);vAlpha=sin(h*PI)*0.5;
          #if VARIANT == 0
            shape=vec2(7.0,0.23);size*=0.8;vAlpha*=0.65;
          #elif VARIANT == 1
            radius+=seed.z*0.4;p.xz=vec2(cos(spin),sin(spin))*radius;size=0.012+seed.w*0.035;shape=vec2(1.0,0.8);vAlpha*=0.75;
          #elif VARIANT == 2
            spin=a-t*2.4;float drift=pow(h,3.0)*(0.3+seed.z*0.8);p=vec3(cos(spin)*(radius+drift),h*3.8-1.4,sin(spin)*(radius+drift));size=0.016+seed.w*0.04;shape=vec2(0.8,2.7);vAlpha=sin(h*PI)*(0.45+0.45*sin(t*13.0+seed.z*19.0));
          #else
            h=floor(seed.y*6.0)/6.0+0.08;spin=a-t*2.4;radius=0.15+pow(h,1.2)*1.8;p=vec3(cos(spin)*radius,h*3.5-1.4+sin(spin*3.0)*0.07,sin(spin)*radius);size=0.018+seed.w*0.03;shape=vec2(1.0);vAlpha=0.25+pow(max(0.0,sin(seed.z*20.0+t*3.0)),4.0)*0.6;
          #endif
        #endif
      #endif
      #if KIND == 4 || KIND == 5
        vec3 field=curlFlow(vec3(p.x,p.y+1.4,p.z)*1.1,t);
        p+=field*(KIND==4?0.12:0.16)*smoothstep(0.0,0.25,p.y+1.4);
      #endif
      #if CLOUD == 1
        size*=uSize;
      #endif
      #if KIND == 4
        p.xz*=uSize;p.y=(p.y+1.4)*uSize-1.4;
      #endif
      vLife=clamp(vLife,0.0,1.0);
      vec4 mv=modelViewMatrix*vec4(p,1.0);
      float scale=length(modelMatrix[1].xyz);
      #if KIND == 0 && VARIANT == 2
        float spin=t*(1.0+seed.z*3.0)+a;vec3 shard=position*vec3(2.0,.55,.65)*size;
        shard.xy=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*shard.xy;
        mv=modelViewMatrix*vec4(p+shard,1.0);
      #elif TOON == 1 && KIND == 3 && VARIANT == 1 && CLOUD == 0
        vec3 direction=normalize(vec3(cos(a),.6+seed.y*1.8,sin(a)));
        vec2 along=normalize((modelViewMatrix*vec4(direction,0.0)).xy+vec2(.0001));
        mv.xy+=(along*position.x*shape.x+vec2(-along.y,along.x)*position.y*shape.y)*size*scale;
      #elif KIND == 4
        vec2 tangent=normalize((modelViewMatrix*vec4(-sin(spin),0.1,cos(spin),0.0)).xy);vec2 crossFlow=vec2(-tangent.y,tangent.x);
        mv.xy+=(tangent*position.x*shape.x+crossFlow*position.y*shape.y)*size*scale;
      #else
        mv.xy+=position.xy*size*shape*scale;
      #endif
      gl_Position=projectionMatrix*mv;
    }
  `,Me=`
    uniform vec3 uColor;uniform float uTime;
    varying vec2 vUv;varying float vAlpha;varying float vSeed;varying float vLife;varying float vLight;
    ${C}${pe}${be}${Se}
    ${E===0?J:""}
    varying vec3 vKeyLight;
    void main(){
      vec2 q=vUv*2.0-1.0;float d=length(q);
      #if !(KIND == 0 && VARIANT == 2)
        if(d>1.0)discard;
      #endif
      float alpha=exp(-d*d*5.0)*(1.0-smoothstep(0.65,1.0,d));
      vec3 color=mix(uColor,vec3(1.0),pow(1.0-d,8.0)*0.35);
      #if CLOUD == 1
        vec2 original=q;
        float angle=vSeed*6.28+uTime*0.18;
        mat2 rotation=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));q=rotation*q;
        vec3 coarse=noiseGradient(q*2.8+vec2(vSeed*17.0,-uTime*0.18));
        #if TOON == 1
          vec3 fine=coarse;
        #else
          vec3 fine=noiseGradient(q*5.7+vec2(vSeed*31.0,-uTime*0.31));
        #endif
        float n=coarse.x*0.72+fine.x*0.28;
        vec2 gradient=mat2(cos(angle),sin(angle),-sin(angle),cos(angle))*(coarse.yz*2.8*0.72+fine.yz*5.7*0.28);
        float puff=1.0-smoothstep(0.43,1.0,d+(n-0.5)*0.43);
        float body=smoothstep(0.14,0.76,n+(1.0-d)*0.55);
        vec2 optics=smokeOptics(original,gradient,n,vKeyLight);
        float light=optics.x;
        color=uColor*light*1.15;
        alpha=puff*body*optics.y*1.35;
        #if KIND == 3
          float hot=vLight*(0.4+body*0.6);
          #if VARIANT == 0
            color=mix(uColor*(0.06+light*0.13),uColor*(1.8+hot*2.4)+vec3(pow(hot,3.0)*0.8),smoothstep(0.10,0.65,hot));
          #elif VARIANT == 1
            color=mix(uColor*0.35,uColor*1.7,hot);
          #elif VARIANT == 2
            color=uColor*(0.10+light*0.85);
          #else
            color=uColor*(0.18+light*0.95);
          #endif
        #else
          #if VARIANT == 2
            color=uColor*(0.40+light*0.65);
          #endif
        #endif
        #if TOON == 1
          color=styleColor(uColor,.20+light*.65+n*.18);
          alpha=(1.0-smoothstep(.68,.98,d+(n-.5)*.35))*smoothstep(.18,.42,n+(1.0-d)*.35)*.82;
          #if VARIANT == 0
            color=mix(styleColor(uColor*.28,light),styleHeat(uColor,hot*.65+n*.3),smoothstep(.10,.65,hot));
          #elif VARIANT == 1
            alpha*=.16;color=styleColor(uColor*.5,.2+light*.45);
          #endif
        #endif
      #elif KIND == 2
        #if VARIANT == 0
          float crossShape=min(max(abs(q.x)-0.20,abs(q.y)-0.66),max(abs(q.x)-0.66,abs(q.y)-0.20));
          alpha=1.0-smoothstep(-0.02,0.08,crossShape);color=uColor*1.2;
        #elif VARIANT == 1
          vec3 burn=flameErosion(vec2(vUv.x,vUv.y*1.3),uTime*1.8,vSeed*9.0);
          alpha=burn.x*pow(max(0.0,1.0-vUv.y),0.7)*smoothstep(0.0,0.2,vUv.y);color=flameColor(uColor,burn.y*0.7+(1.0-vUv.y)*0.3);
        #elif VARIANT == 2
          float a=atan(q.y,q.x);float spoke=pow(abs(cos(a*3.0)),28.0);
          alpha=(spoke*(1.0-smoothstep(0.4,0.85,d))+exp(-d*d*45.0))*0.85;
        #else
          alpha=band(max(abs(q.x),abs(q.y))-0.52,0.07);color=uColor*1.3;
        #endif
      #elif KIND == 0 && VARIANT == 3
        alpha=band(abs(q.x)+abs(q.y)-0.64,0.05)+exp(-d*d*35.0)*0.4;
      #elif KIND == 0 && VARIANT == 2
        alpha=0.8;color*=0.35+0.65*vUv.y;
      #elif (KIND == 3 && VARIANT == 3) || (KIND == 4 && VARIANT == 3)
        alpha=1.0-smoothstep(0.7,1.0,abs(q.x)+abs(q.y));
        color*=0.7+step(q.x,0.0)*0.5;
      #endif
      #if KIND == 0
        color=toonShade(uColor,.46+(1.0-d)*.4);
      #endif
      #if TOON == 1 && CLOUD == 0
        color=styleColor(uColor,.28+(1.0-d)*.5+vLight*.1);
        #if KIND == 3 && VARIANT == 1
          alpha=(1.0-smoothstep(.35,.75,abs(q.y)))*(1.0-smoothstep(.6,1.0,abs(q.x)));
        #elif KIND == 4 && VARIANT == 1
          color=styleColor(uColor*.55,.3+vSeed*.5);
        #elif (KIND == 3 && VARIANT == 0) || (KIND == 4 && VARIANT == 2)
          color=styleHeat(uColor,.50+(1.0-d)*.35);
        #endif
      #endif
      gl_FragColor=vec4(color,alpha*vAlpha*uDetail);
      ${L}
    }
  `;function Ee(){const o={"3:4":0,"0:4":1,"2:4":2,"3:5":3,"1:4":4,"2:5":5,"2:6":6,"0:5":7,"3:6":8,"2:7":9,"3:7":10,"0:6":11,"2:8":12}[`${E}:${x}`];if(o===void 0)throw new Error(`Unsupported effect variant: ${E}:${x}`);const w=[],h=Math.PI*2;function g(e,t=0,a=0,n=-1){const s=e.attributes.position.count;return e.setAttribute("aPart",new U(new Float32Array(s).fill(t),1)),e.setAttribute("aPhase",new U(new Float32Array(s).fill(a),1)),e.setAttribute("aUnit",new U(new Float32Array(s).fill(n),1)),w.push(e),e}function l(e,t=32,a=8,n=0,s=0,p=-1){const m=[],q=[],F=[];for(let N=0;N<=t;N++)for(let O=0;O<=a;O++)m.push(...e(N/t,O/a)),q.push(N/t,O/a);for(let N=0;N<t;N++)for(let O=0;O<a;O++){const ze=N*(a+1)+O,Le=ze+a+1;F.push(ze,Le,ze+1,ze+1,Le,Le+1)}const I=new se;return I.setAttribute("position",new U(m,3)),I.setAttribute("uv",new U(q,2)),I.setIndex(F),I.computeVertexNormals(),g(I,n,s,p)}function u(e,t=.035,a=24,n=5,s=0,p=0,m=-1){return l((q,F)=>{const I=new ie(...e(q)),N=new ie(...e(Math.min(1,q+.001))).sub(new ie(...e(Math.max(0,q-.001)))).normalize(),O=new ie().crossVectors(N,Math.abs(N.y)>.9?new ie(1,0,0):new ie(0,1,0)).normalize(),ze=new ie().crossVectors(N,O),Le=typeof t=="function"?t(q):t;return I.addScaledVector(O,Math.cos(F*h)*Le).addScaledVector(ze,Math.sin(F*h)*Le),I.toArray()},a,n,s,p,m)}function P(e,t,a,n,s,p,m=0,q=0,F=-1){const I=new qe(1);return I.scale(n,s,p),I.rotateZ(m),I.translate(e,t,a),g(I,q,m,F)}if(o===0){for(let e=0;e<10;e++)l((t,a)=>[t,a,e],e<3?28:16,e<3?16:10,0,e,e);for(let e=0;e<12;e++)l((t,a)=>[t,a,e],1,1,2,e,Math.floor(e*5/12))}else if(o===1){l((e,t)=>{const a=e*h,n=t*h,s=.65+.16*Math.cos(n);return[s*Math.cos(a),s*Math.sin(a),.13*Math.sin(n)]},56,8);for(let e=0;e<9;e++){const t=e*h/9,a=.8;P(Math.cos(t)*a,Math.sin(t)*a,.02,.12,.19+e%3*.035,.13,t-Math.PI/2)}}else if(o===2){for(let e=-2;e<=2;e++)u(t=>[t*2.6-1.3,.08,e*.65],.018,2,4),u(t=>[e*.65,.08,t*2.6-1.3],.018,2,4);for(let e=0;e<18;e++){const t=[[.425,.425],[-.425,.425],[.425,-.425],[-.425,-.425],[0,.425],[0,-.425],[.425,0],[-.425,0],[.425,.85]],[a,n]=e<9?[(e%3-1)*.85,(Math.floor(e/3)-1)*.85]:t[e-9];P(a,.45+e%3*.22,n,.09,.15,.09,e*.6,1,e),u(s=>[a+Math.cos(s*h)*.24,.42+e%3*.22,n+Math.sin(s*h)*.24],.018,4,4,1,e*.6,e)}}else if(o===3){const e=(t,a,n)=>u(s=>{const p=s*(t.length-1),m=Math.min(t.length-2,Math.floor(p)),q=p-m;return t[m].map((F,I)=>F+(t[m+1][I]-F)*q)},a,(t.length-1)*2,4,0,n);e([[.35,2.6,-.1],[-.24,1.95,.08],[.2,1.55,.1],[-.28,.9,-.15],[.14,.4,.05],[-.1,-.5,.1],[0,-1.35,0]],.045,0);for(let t=0;t<7;t++){const a=t*2.4,n=t<3?1.7-t*.5:-1.3,s=t<3?.8:1.6;e([[0,n,0],[Math.cos(a)*s*.35,n-.1,Math.sin(a)*s*.25],[Math.cos(a+.2)*s*.65,n-.35,Math.sin(a-.2)*s*.6],[Math.cos(a)*s,Math.max(-1.35,n-.65),Math.sin(a)*s]],.025,t+.6)}}else if(o===4){for(const[e,t]of[[.042,0],[.11,2]])l((a,n)=>{const s=n*h;return[a*4.8-2.4,Math.cos(s)*e,Math.sin(s)*e]},32,10,t);for(const e of[-1,1]){u(t=>[e*2.4,Math.cos(t*h)*.42,Math.sin(t*h)*.42],.012,48,4,1,e);for(let t=0;t<7;t++)l((a,n)=>{const s=t*h/7,p=.08+a*(e<0?.58:.85),m=Math.sin(a*Math.PI)*.12*Math.sin(n*Math.PI),q=Math.cos(n*Math.PI);return[e*2.4+Math.sin(a*Math.PI)*.22,Math.cos(s)*p-Math.sin(s)*m*q,Math.sin(s)*p+Math.cos(s)*m*q]},18,6,1,t+e*.1)}}else if(o===5)for(let e=0;e<6;e++){const t=e*h/(e<3?3:6);u(a=>{const n=t+a*2.7,s=.4+Math.sin(a*Math.PI)*.8;return[Math.cos(n)*s,.12+Math.sin(a*Math.PI)*1.65,Math.sin(n)*s]},a=>.045+.035*Math.sin(a*Math.PI),36,6,1,e*2.1,e)}else if(o===6){for(let e=0;e<8;e++){const t=e*h/(e<4?4:8);u(a=>{const n=.8+Math.sin(a*3.8)*.3,s=t+a*1.7;return[Math.cos(s)*n,a*1.65,Math.sin(s)*n]},a=>.065*(1-a*.6),30,6,1,e,e);for(let a=0;a<3;a++){const n=.35+a*.43,s=t+n,p=1.05;l((m,q)=>{const F=Math.sin(m*Math.PI)*.18*(q*2-1),I=m*.55;return[Math.cos(s)*(p+I)-Math.sin(s)*F,n+Math.sin(m*2.5)*.25+Math.abs(F)*.3,Math.sin(s)*(p+I)+Math.cos(s)*F]},10,4,2,e,e),P(Math.cos(s)*.94,n,Math.sin(s)*.94,.08,.2,.08,e,2,e)}}for(let e=0;e<7;e++){const t=e*h/7;l((a,n)=>{const s=.12+a*.55,p=Math.sin(a*Math.PI)*.18*(n*2-1);return[Math.cos(t)*s-Math.sin(t)*p,.65+a*.3+n*(1-n)*.15,Math.sin(t)*s+Math.cos(t)*p]},10,4,3,e)}}else if(o===7)for(let e=0;e<4;e++)l((t,a)=>{const n=(t-.5)*4.9,s=a*h,p=.72+Math.cos(s)*Math.sin(t*Math.PI)*.18;return[Math.sin(n)*p,Math.cos(n)*p-.2,Math.sin(s)*.16*Math.sin(t*Math.PI)]},40,6,e,e*.5);else if(o===8){l((e,t)=>[e,t,0],64,20,0,0),l((e,t)=>[e,.37+t*.26,0],64,4,1,0);for(let e=0;e<12;e++)l((t,a)=>[t,a,e],1,1,2,e)}else if(o===9){for(let e=0;e<6;e++)l((t,a)=>[t,a,e],24,10,1,e,e%3);for(let e=3;e<6;e++)l((t,a)=>[t,a,e],24,10,1,e,e),l((t,a)=>[t,a,e+6],24,10,1,e+6,e)}else if(o===10){for(let t=0;t<3;t++){const a=t*h/3;u(n=>{const s=n*h,p=Math.cos(s)*1.4,m=Math.sin(s)*.8;return[p*Math.cos(a),m,p*Math.sin(a)]},.022,64,4,0,t)}const e=[];for(let t=0;t<12;t++){const a=t*2.4,n=.75+t%3*.25,s=[Math.cos(a)*n,Math.sin(t*1.8)*.8,Math.sin(a)*n];e.push(s),P(...s,.07,.13,.07,a,1),t&&u(p=>e[t-1].map((m,q)=>m+(s[q]-m)*p),.012,2,3,1,t)}for(let t=0;t<20;t++){const a=t*2.4;u(n=>[Math.cos(a)*n*2.1,Math.sin(t*2)*n*1.7,Math.sin(a)*n*2.1],n=>.055*Math.sin(n*Math.PI),12,4,2,t*.5,t)}}else if(o===11)for(let e=0;e<7;e++)l((t,a)=>{const n=t*(3.2+e%3*.45)+e*2.39996,s=a*h,p=.025+.46*Math.pow(Math.sin(t*Math.PI*.85),1.2),m=Math.sin(t*Math.PI)*(.026+e%3*.013);return[.98-t*(1.6+e%3*.35),Math.cos(n)*(p+Math.cos(s)*m),Math.sin(n)*(p+Math.cos(s)*m)+Math.sin(s)*m]},24,6,0,e);else if(o===12)for(let e=0;e<14;e++){const t=e*2.4,a=e?.55+e%2*.35:0,n=new He(.24+e%3*.07,16,10,0,h,0,Math.PI*.5);n.translate(Math.cos(t)*a,.04,Math.sin(t)*a),g(n,1,e*1.4,e)}function V(){const e={position:[],normal:[],uv:[],aPart:[],aPhase:[],aUnit:[]},t=[];let a=0;for(const s of w){for(const p of Object.keys(e))e[p].push(...s.attributes[p].array);if(s.index)for(const p of s.index.array)t.push(p+a);else for(let p=0;p<s.attributes.position.count;p++)t.push(p+a);a+=s.attributes.position.count,s.dispose()}w.length=0;const n=new se;for(const[s,p]of Object.entries(e))n.setAttribute(s,new U(p,s==="position"||s==="normal"?3:s==="uv"?2:1));return n.setIndex(t),n}const k=$.burst?`float life=clamp(uTime/${$.duration.toFixed(1)},0.0,1.0);float alive=smoothstep(0.0,.025,life)*(1.0-smoothstep(.70,1.0,life));`:"float life=0.0;float alive=1.0;",D=`uniform float uRetire,uOpening,uStopTime,uQuantity;varying float vPart;attribute float aPart;attribute float aPhase;attribute float aUnit;uniform float uTime;uniform float uStretch;varying vec2 vUv;varying vec3 vN;varying vec3 vP;varying float vFade;varying float vPhase;varying float vSandMass;${C}
      mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
      void main(){vUv=uv;vPhase=aPhase;vPart=aPart;vSandMass=1.0;vec3 p=position;vec3 n=normal;${k}vFade=alive;
        // Early clipping also covers branches that replace vFade or return early.
        if(aUnit>=uQuantity){vFade=0.0;vP=vec3(0);vN=vec3(0,1,0);gl_Position=vec4(2,2,2,1);return;}
        #if SPELL == 0
          if(aPart>1.5){
            float seed=fract(aPhase*.618034),age=max(0.0,life-seed*.10),grow=smoothstep(.0,.20,age);
            float lane=mod(aPhase,4.0)-1.5,h=.25+floor(aPhase/4.0)*.22;
            if(abs(uQuantity-5.0)>.1)lane=uQuantity<1.5?0.0:(aUnit/(uQuantity-1.0)*2.0-1.0)*1.5;
            float turn=h*(1.5+age*1.0)+age*.12;
            p=vec3(lane*(.18+h*.64)*grow,-1.25+sin(turn)*1.35*grow+h*.3*grow,(1.0-cos(turn))*.95*grow+age*.65);
            p.y+=smoothstep(.55,.98,age)*.48;p.y=-1.3+(p.y+1.3)*uSize;p.xz*=uSize;
            vec4 mv=modelViewMatrix*vec4(p,1.0);float width=(.15+grow*.66)*(1.0-smoothstep(.62,.99,age)*.55);
            mv.xy+=(uv-.5)*width*uSize*vec2(1.15,1.25)*length(modelMatrix[1].xyz);
            vFade=smoothstep(.0,.07,age)*(1.0-smoothstep(.82,1.0,age));vP=p;vN=normalize(mat3(viewMatrix)*vec3(-.45,.8,.55));gl_Position=projectionMatrix*mv;return;
          }
          float seed=fract(aPhase*.618034),lane=aPhase<3.0?aPhase-1.0:(aPhase-3.5)*1.5;
          if(abs(uQuantity-5.0)>.1)lane=uQuantity<1.5?0.0:aUnit/(uQuantity-1.0)*2.0-1.0;
          float age=max(0.0,life-seed*.10),grow=smoothstep(.0,.20,age),h=uv.x;
          float curl=h*(1.5+age*1.0)+age*.12,bulk=(aPhase<3.0?1.0:.66)*grow;
          float height=bulk*(1.30+seed*.25),width=pow(max(0.0,sin(h*PI)),.65)*(.36+seed*.12)*bulk;
          width*=1.0-smoothstep(.55,.96,age)*.7;
          float around=uv.y*PI*2.0,wrinkle=1.0+sin(h*13.0-age*8.0+around*3.0+aPhase)*.12;
          vec3 center=vec3(lane*(.38+h*.78)*grow,-1.26+sin(curl)*height+h*.3*grow,(1.0-cos(curl))*height*.70+age*.65);
          p=center+vec3(cos(around)*width*wrinkle,-sin(around)*sin(curl)*width*.55,sin(around)*cos(curl)*width*.55);
          p.y+=smoothstep(.60,.95,age)*h*.45;vFade=smoothstep(.0,.04,age)*(1.0-smoothstep(.90,1.0,age));
        #elif SPELL == 1
          p.xy=rot(uTime*4.0)*p.xy;n.xy=rot(uTime*4.0)*n.xy;p.yz=rot(.15*sin(uTime*2.0))*p.yz;
        #elif SPELL == 2
          if(aPart>.5){
            if(abs(uQuantity-9.0)>.1){
              vec2 from=vec2(mod(aUnit,3.0)-1.0,floor(aUnit/3.0)-1.0)*.85;
              if(aUnit>8.5){float e=aUnit-9.0;from=e<.5?vec2(.425,.425):e<1.5?vec2(-.425,.425):e<2.5?vec2(.425,-.425):e<3.5?vec2(-.425,-.425):e<4.5?vec2(0,.425):e<5.5?vec2(0,-.425):e<6.5?vec2(.425,0):e<7.5?vec2(-.425,0):vec2(.425,.85);}
              float columns=ceil(sqrt(uQuantity)),rows=ceil(uQuantity/columns),row=floor(aUnit/columns),inRow=min(columns,uQuantity-row*columns);
              vec2 to=vec2(inRow<1.5?0.0:(mod(aUnit,columns)/(inRow-1.0)*2.0-1.0)*.85,rows<1.5?0.0:(row/(rows-1.0)*2.0-1.0)*.85);p.xz+=to-from;
            }
            p.y+=.18*sin(uTime*1.4+aPhase);float turn=uTime*.18;float angle=(floor(turn)+smoothstep(.25,.75,fract(turn)))*PI*.5;p.xz=rot(angle)*p.xz;if(abs(uQuantity-9.0)>.1)n.xz=rot(angle)*n.xz;
          }
        #elif SPELL == 3
          float on=smoothstep(aPhase*.006,aPhase*.006+.012,life);float primary=1.0-smoothstep(.07,.19,life);float ground=1.0-smoothstep(-1.1,-.5,position.y);float residual=(exp(-pow((life-.38-aPhase*.014)*40.0,2.0))+exp(-pow((life-.66+aPhase*.01)*48.0,2.0)))*ground;
          vFade*=on*max(primary,residual*.8);p.x+=sin(position.y*17.0+floor(uTime*24.0)+aPhase)*.075;p.z+=sin(position.y*23.0-floor(uTime*19.0))* .06;
        #elif SPELL == 4
          if(aPart<.5||aPart>1.5){p.yz*=.92+.08*sin(uTime*3.0+position.x*4.0);p.yz*=uSize;}else{p.yz=rot(uTime*.35)*p.yz*uSize;p.x=sign(p.x)*2.4+(p.x-sign(p.x)*2.4)*uSize/max(uStretch,.001);}vFade*=smoothstep(0.0,.25,uTime);
        #elif SPELL == 5
          float cycle=fract(uTime*.52+aPhase*.15915),tight=smoothstep(.05,.15,cycle)*(1.0-smoothstep(.38,.83,cycle));
          float release=smoothstep(.0,.66,uRetire),h=uv.x,a=aPhase/2.1*2.094395;
          if(abs(uQuantity-3.0)>.1)a=aUnit*PI*2.0/uQuantity;
          float hook=smoothstep(.70,1.0,h),b=a+h*1.1+hook*(2.7-release*2.1);
          float r=(.28+sin(h*PI)*1.04)*(1.0-tight*.63)+release*h*.85;
          float width=(.062+.045*sin(h*PI))*(1.0-smoothstep(.86,1.0,h)*.7),side=uv.y*PI*2.0;
          p=vec3(cos(b)*(r+cos(side)*width),.06+sin(h*PI)*1.55+hook*.25+sin(side)*width*.35,sin(b)*(r+cos(side)*width));
          p.y*=smoothstep(.0,.85,uOpening);p.y-=release*release*h*.45;
          vFade*=1.0-smoothstep(.62,.98,uRetire);
        #elif SPELL == 6
          float delay=fract(aPhase*.37)*.18;float retract=smoothstep(delay,.95,uRetire);float h=max(0.0,position.y);float root=aPhase*PI*.5;
          if(aUnit>=0.0&&abs(uQuantity-4.0)>.1){float original=aUnit*PI*2.0/(aUnit<3.5?4.0:8.0);root=aUnit*PI*2.0/uQuantity;p.xz=rot(original-root)*p.xz;n.xz=rot(original-root)*n.xz;}
          vec2 leafRadial=normalize(p.xz+vec2(.0001)),base=vec2(cos(root),sin(root))*.8;
          float bend=retract*(1.3+h*1.3),arc=h*max(.12,1.0-retract*.65);p.xz=base+(p.xz-base)*(1.0-retract*.55);
          p.xz+=vec2(cos(root),sin(root))*(1.0-cos(bend))*arc*.45;p.y=max(.025,arc*sin(bend+.001)/(bend+.001));
          if(aPart>1.5){float fold=smoothstep(.0,.7,retract);float attach=.35+floor(max(0.0,h-.35)/.43)*.43;float blade=uv.x*.55;vec2 radial=leafRadial;p.xz-=radial*blade*fold;p.y+=blade*sin(fold*PI*.8)*.35;}
          p.y*=smoothstep(.0,.85,uOpening);vFade*=1.0-smoothstep(.78,1.0,uRetire);
        #elif SPELL == 7
          p.yz=rot(uTime*2.7-aPhase)*p.yz;n.yz=rot(uTime*2.7-aPhase)*n.yz;if(aPart>.5){p.x-=aPart*.45;p.y+=sin(uTime*3.0-aPart)*.12;vFade*=.23*(1.0-aPart*.18);}
        #elif SPELL == 8
          float across=uv.x*2.0-1.0,a=across*1.6;
          float age=max(0.0,life-abs(across)*.12),grow=smoothstep(.0,.15,age),crash=smoothstep(.27,.58,age);
          float height=(.5+pow(max(0.0,1.0-across*across),.6)*.8)*grow;
          height*=1.0+sin(across*12.0-age*7.0)*.14+sin(across*23.0+age*4.0)*.07;
          float theta=position.y*PI*2.0,radial=.85+life*2.2;
          float roll=crash*1.35,yy=(1.0-cos(theta))*height*.5,rr=sin(theta)*(.25+height*.22);
          float y=yy*cos(roll)-rr*sin(roll),r=radial+yy*sin(roll)+rr*cos(roll);
          float breaking=smoothstep(.27+.04*sin(across*9.0),.61+.035*sin(across*13.0),age);
          float crown=pow(max(0.0,sin(position.y*PI)),2.0);y-=breaking*height*.95*crown;r+=breaking*crown*.35;vSandMass=max(0.0,y)/max(.01,height);
          p=vec3(sin(a)*r,-1.3+max(.025,y),cos(a)*r-.5);if(aPart>.5)p.y+=.016;
          n=normalize(vec3(sin(a)*sin(theta+roll),-cos(theta+roll),cos(a)*sin(theta+roll)));
          vFade*=1.0-smoothstep(.42,.67,age);
          if(aPart>1.5){
            float side=(aPhase/11.0)*2.0-1.0,born=.27+abs(side)*.12+sin(aPhase*2.4)*.025,local=max(0.0,life-born),on=smoothstep(.0,.055,local);
            float angle=side*1.6,rr=.85+life*2.2+local*.75;
            p=vec3(sin(angle)*rr,-1.3+max(.035,.82+local*.6-local*local*8.0),cos(angle)*rr-.5);
            p.y=-1.3+(p.y+1.3)*uSize;p.xz*=uSize;
            vec4 mv=modelViewMatrix*vec4(p,1.0);float width=(.42+local*.90)*on;
            mv.xy+=(uv-.5)*width*uSize*length(modelMatrix[1].xyz);vP=p;vN=normalize(mat3(viewMatrix)*vec3(-.45,.8,.55));vFade=on*(1.0-smoothstep(.32,.60,local));gl_Position=projectionMatrix*mv;return;
          }
        #elif SPELL == 9
          float bank=aUnit,origin=uStopTime<0.0?uTime:uStopTime;
          float cycle=fract(origin*.24+bank*.31);if(uRetire>0.0)cycle=min(.999,cycle+uRetire*.9);
          float packet=aUnit<2.5?step(2.5,aPhase):step(5.5,aPhase),side=pow(sin(uv.x*PI),.65);
          float local=clamp((cycle-.10-uv.x*.25)*2.4,0.0,1.0);
          float slide=smoothstep(.02,.88,local),build=smoothstep(.0,.16,cycle);
          float angle=bank*PI*2.0/uQuantity+.32+(uv.x-.5)*1.55;
          if(uQuantity>3.5)angle=bank*PI*2.0/uQuantity+.32+(uv.x-.5)*1.55*3.0/uQuantity;
          float crest=.82-slide*.52,radial=.12+uv.y*1.25;
          float profile=max(0.0,min(uv.y/max(.08,crest),(1.0-uv.y)/(1.0-crest)));
          float scar=exp(-pow((uv.y-crest)*6.0,2.0))*sin(slide*PI);
          float height=profile*side*(.17+build*.25)*(1.0-scar*.85)*(1.0-slide*.55);
          height+=sin(uv.x*19.0+bank)*.025*profile;
          if(packet>.5){radial=.18+(1.0-slide)*.66+(uv.y-.5)*.28;
            height=sin(uv.y*PI)*side*.20*sin(slide*PI);vFade*=sin(slide*PI);}
          p=vec3(cos(angle)*radial,.025+height*smoothstep(.0,.75,uOpening),sin(angle)*radial);
          float sink=smoothstep(.04+uv.y*.30,.86,uRetire);p.xz*=.72*(1.0-sink*(1.0-uv.y)*.85);vSandMass=height*(1.0-sink);p.y=.025+vSandMass;
          n=normalize(vec3(cos(angle)*(uv.y<crest?-1.3:1.0),1.0,sin(angle)*(uv.y<crest?-1.3:1.0)));
          vFade*=1.0-smoothstep(.74,.99,uRetire);
        #elif SPELL == 10
          if(aPart<1.5){float gather=1.0-smoothstep(0.0,.36,life)*.82;p*=gather;p.xz=rot(uTime*(1.0+life*3.0))*p.xz;vFade*=1.0-smoothstep(.35,.50,life);}else{float start=.31+fract(aPhase*.37)*.065;float age=max(0.0,life-start);float release=smoothstep(.0,.08,age);float a=aPhase*4.8;vec3 direction=normalize(vec3(cos(a),sin(aPhase*4.0)*.8,sin(a)));
          if(abs(uQuantity-10.0)>.1){float y=uQuantity<1.5?0.0:((aUnit+.5)/uQuantity*2.0-1.0)*.8;float azimuth=aUnit*2.399963;float radial=sqrt(1.0-y*y);direction=vec3(cos(azimuth)*radial,y,sin(azimuth)*radial);}
          vec3 side=normalize(cross(direction,vec3(0,1,0))),up=cross(direction,side);if(abs(uQuantity-10.0)>.1)n=side*cos(uv.y*PI*2.0)+up*sin(uv.y*PI*2.0);
          float head=exp(-pow((uv.x-.86)*13.0,2.0));float radius=(head*.052+uv.x*.006)*(1.0-smoothstep(.12,.30,age));p=direction*(age*8.0+uv.x*(1.30-age*2.8))+(side*cos(uv.y*PI*2.0)+up*sin(uv.y*PI*2.0))*radius;vFade*=release*(1.0-smoothstep(.15,.34,age));}
        #elif SPELL == 11
          float turn=-uTime*2.4+aPhase*.1;p.yz=rot(turn)*p.yz;n.yz=rot(turn)*n.yz;p.yz*=1.0+.08*sin(uv.x*12.0-uTime*5.0+aPhase);
        #elif SPELL == 12
          if(abs(uQuantity-7.0)>.1){float r=aUnit<.5?0.0:.55+mod(aUnit,2.0)*.35;float angle=(aUnit-1.0)*PI*2.0/max(1.0,uQuantity-1.0);p.xz+=(vec2(cos(angle),sin(angle))-vec2(cos(aUnit*2.4),sin(aUnit*2.4)))*r;}
          float pop=uRetire>0.0?clamp(uRetire*1.55-fract(aPhase*.23)*.3,0.0,1.0):fract(uTime*.24+aPhase*.17);p.y*=.8+sin(pop*PI)*.5;p.y*=smoothstep(.0,.6,uOpening);vFade*=1.0-smoothstep(.91,1.0,pop);
        #endif
        #if SPELL != 4
          #if KIND == 3
            p.y=-1.3+(p.y+1.3)*uSize;p.xz*=uSize;
          #else
            p*=uSize;
          #endif
        #endif
        vP=p;vN=normalize(normalMatrix*n);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
      }`,i=`uniform float uRetire;varying float vPart;uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying vec3 vN;varying vec3 vP;varying float vFade;varying float vPhase;varying float vSandMass;${C}${pe}${be}${J}
      void main(){
        #if SPELL == 0
          if(vPart>1.5){
            float age=max(0.0,uTime/3.0-fract(vPhase*.618034)*.10);vec2 q=vUv*2.0-1.0;
            float spin=age*3.0+vPhase;q=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*q;
            vec3 n=noiseGradient(q*2.5+vec2(vPhase*7.0,-age*2.0));float d=length(q)+(n.x-.5)*.30;
            vec2 lit=smokeOptics(q,n.yz*2.5,n.x,vN);float burn=smoothstep(.45,.96,age);
            float alpha=(1.0-smoothstep(.76,.98,d))*smoothstep(.05+burn*.65,.20+burn*.65,n.x+(1.0-d)*.5)*vFade;
            float heat=.12+n.x*.39+(1.0-d)*.30+lit.x*.16;
            vec3 c=mix(uColor*.23,uColor*1.08,toonStep(.4,heat));c=mix(c,vec3(1,.91,.53),toonStep(.67,heat));
            if(alpha<.005)discard;gl_FragColor=vec4(c,alpha);${L}return;
          }
        #endif
        #if SPELL == 8
          if(vPart>1.5){vec2 q=vUv*2.0-1.0;vec3 nn=noiseGradient(q*2.7+vec2(vPhase*6.0,-uTime*.8));float d=length(q)+(nn.x-.5)*.32;
            float alpha=(1.0-smoothstep(.62,.98,d))*smoothstep(.05,.23,nn.x+(1.0-d)*.25)*vFade;
            vec2 optic=smokeOptics(q,nn.yz*2.7,nn.x,vN);vec3 c=mix(uColor*.7,vec3(.83,.96,1),toonStep(.42,optic.x*.5+nn.x*.3+.2));
            if(alpha<.004)discard;gl_FragColor=vec4(c,alpha);${L}return;}
        #endif
        vec3 shadingNormal=normalize(vN);
        #if SPELL == 0 || SPELL == 5 || SPELL == 6 || SPELL == 11
          shadingNormal=normalize(cross(dFdx(vP),dFdy(vP)));
        #endif
        float shade=.25+.65*abs(dot(shadingNormal,normalize(vec3(-.4,.8,.5))));float alpha=vFade;float ink=0.0;
        #if SPELL == 0
          float age=max(0.0,uTime/3.0-fract(vPhase*.618034)*.10);
          float n=noise2(vec2(vUv.x*6.0-age*4.0,vUv.y*3.0+vPhase*1.7));
          float curl=noise2(vec2(vUv.x*12.0-age*6.0,vUv.y*5.0+vPhase));
          float burn=smoothstep(.43,.93,age)*(1.0-vUv.x*.4);
          float tear=n*.65+curl*.20+sin(vUv.x*PI)*.25-burn*1.35;
          alpha*=smoothstep(.01,.09,tear)*(1.0-smoothstep(.64,.86,age));
          shade=.13+n*.27+shade*.20+pow(max(0.0,sin(vUv.y*PI*2.0+vUv.x*4.0-age*3.0)),3.0)*.35;
        #elif SPELL == 3
          shade=.52+.35*pow(abs(cos(vUv.y*6.283)),3.0);
        #elif SPELL == 4
          float axial=pow(max(0.0,cos(vP.x*7.0-uTime*8.0)),10.0);shade=vPart<.5?.93:.6+axial*.3;
          alpha*=vPart>1.5?.16+.12*axial:vPart>.5?sin(vUv.x*3.14159)*(.55+.3*axial):.94;
        #elif SPELL == 5 || SPELL == 7
          #if SPELL == 5
            alpha*=1.0-smoothstep(.87,1.0,uRetire);
            float curse=fract(vUv.x*8.0-uTime*.9+vPhase*.17);
            float etch=1.0-smoothstep(.04,.13,abs(curse-.5));
            float stain=noise2(vec2(vUv.x*5.0-uTime*1.1,vUv.y*2.0+vPhase));
            shade=mix(.14,.47,smoothstep(.51,.67,stain));shade=max(shade,etch*.77*pow(abs(sin(vUv.y*PI*2.0)),7.0));
            alpha*=smoothstep(uRetire*.8-.12,uRetire*.8+.08,stain+vUv.x*.18);
            alpha*=smoothstep(.0,.06,vUv.x);
          #endif
          #if SPELL == 7
            shade*=.64;
          #endif
          #if SPELL == 7
            shade+=.22*pow(max(0.0,sin(vUv.x*14.0-uTime*3.0)),8.0);
          #endif
        #elif SPELL == 8
          float foam=noise2(vec2(vUv.x*23.0,vUv.y*5.0-uTime*1.8));float age=max(.0,uTime/3.2-abs(vUv.x*2.0-1.0)*.17);
          float crest=pow(vUv.y,5.0),breakup=smoothstep(.29,.62,age);
          alpha*=smoothstep(.0,.08,sin(vUv.x*PI))*smoothstep(.015,.10,vSandMass);
          shade=.16+.42*max(0.0,dot(shadingNormal,normalize(vec3(-.4,.8,.5))))+foam*.17;
          if(vPart>1.5){shade=.18+shade*.65;float top=sin(vUv.y*PI*2.0);shade=max(shade,smoothstep(.52,.8,top)*.93);alpha*=smoothstep(.0,.12,sin(vUv.x*PI));}
          else if(vPart>.5){shade=.94;alpha*=smoothstep(.35,.64,foam)*.88;}
          else{float torn=foam+(1.0-vUv.y)*.20;alpha*=smoothstep(breakup*.52-.08,breakup*.52+.08,torn);}
        #elif SPELL == 9
          float grain=noise2(vec2(vUv.x*34.0,vUv.y*13.0+uTime*4.0));float slide=pow(.5+.5*sin(vUv.y*39.0+uTime*13.0+sin(vUv.x*28.0)*2.0),16.0);
          shade=.18+max(.0,dot(shadingNormal,normalize(vec3(-.65,.65,.35))))*.28+noise2(vec2(vUv.x*10.0,vUv.y*14.0+uTime*4.0))*.20;alpha*=smoothstep(.015,.065,vSandMass);alpha*=smoothstep(.0,.12,sin(vUv.x*PI))*smoothstep(.0,.10,sin(vUv.y*PI));alpha*=1.0-smoothstep(.61+vUv.y*.15,.80+vUv.y*.15,uRetire);
        #elif SPELL == 10
          shade=vPart>1.5?mix(.44,.98,smoothstep(.72,.84,vUv.x)):.75;alpha*=vPart>1.5?pow(vUv.x,1.4)*.95:1.0;
        #elif SPELL == 11
          float flow=noise2(vec2(vUv.x*8.0+uTime*1.6,vPhase*3.4+vUv.y*2.0));alpha*=smoothstep(.0,.06,vUv.x)*(1.0-smoothstep(.8,1.0,vUv.x))*smoothstep(.05,.20,flow)*.85;shade=.19+shade*.30+pow(max(0.0,sin(vUv.y*PI*2.0)),4.0)*.27+pow(max(0.0,sin(vUv.x*12.0+uTime*6.0+vPhase)),8.0)*.16;
        #endif
        #if SPELL == 12
          float pop=uRetire>0.0?clamp(uRetire*1.55-fract(vPhase*.23)*.3,0.0,1.0):fract(uTime*.24+vPhase*.17);float hole=smoothstep(.62,.81,pop);float edge=1.0-hole-vUv.y+sin(vUv.x*31.4+vPhase)*hole*.045;alpha*=smoothstep(-.015,.03,edge);float rim=1.0-smoothstep(.0,.07,abs(edge));float membrane=pow(1.0-abs(dot(shadingNormal,vec3(0,0,1))),2.0);shade=.10+shade*.30+max(rim,membrane)*.55;alpha*=.22+max(rim,membrane)*.65;
        #elif SPELL == 6
          if(vPart>1.5)alpha*=1.0-smoothstep(.48-uRetire*.42,.52-uRetire*.42,abs(vUv.y-.5));
        #endif
        #if SPELL != 0 && SPELL != 3 && SPELL != 4 && SPELL != 8 && SPELL != 9 && SPELL != 10 && SPELL != 11 && SPELL != 12
          float edge=abs(dot(normalize(vN),vec3(0,0,1)));ink=1.0-smoothstep(.04,.13+fwidth(edge),edge);
        #endif
        vec3 c=mix(toonShade(uColor,shade),uColor*.09,ink*.8);
        #if SPELL == 0
          c=mix(uColor*.25,uColor*1.08,toonStep(.36,shade));c=mix(c,vec3(1.0,.92,.58),toonStep(.65,shade));
        #elif SPELL == 8
          if(vPart>.5&&vPart<1.5)c=vec3(.83,.96,1.0);
          if(vPart>1.5)c=mix(c,vec3(.83,.96,1.0),smoothstep(.55,.85,sin(vUv.y*PI*2.0)));
        #endif
        if(alpha<.003)discard;gl_FragColor=vec4(c,alpha);${L}
      }`,d=G(V(),M(i,D,{uRetire:z.uLifeEnd,uOpening:z.uLifeStart},!1,{SPELL:o}),2);if(d.name="school-body",d.material.depthWrite=o!==0&&o!==3&&o!==4&&o!==10&&o!==11&&o!==12,o===12&&(d.material.side=Be),[0,3,5,6,8,9,10,12].includes(o)&&(d.material.userData.ownLifecycle=!0),E===2){const e=M(`uniform vec3 uColor;uniform float uTime;
        #if SPELL == 9
          uniform float uLifeStart,uLifeEnd;
        #endif
        varying vec2 vUv;${C}${J}
        float line(vec2 p,vec2 a,vec2 b,float w){vec2 v=b-a;return 1.0-smoothstep(w,w+.006,length(p-a-v*clamp(dot(p-a,v)/dot(v,v),0.0,1.0)));}
        void main(){vec2 p=(vUv-.5)*3.5;float r=length(p),a=atan(p.y,p.x),m=0.0;float inner=0.0;
          #if SPELL == 2
            float box=max(abs(p.x),abs(p.y));m=band(box-1.3,.018)+band(box-1.43,.012);vec2 cell=abs(fract((p+.325)/.65)-.5);m+=max(band(cell.x-.45,.015),band(cell.y-.45,.015))*step(box,1.3)*.35;
          #elif SPELL == 5
            for(int i=0;i<3;i++){float t=float(i)*2.094;vec2 q=mat2(cos(t),-sin(t),sin(t),cos(t))*p;m+=line(q,vec2(.18,-.08),vec2(1.2,.28),.055)+line(q,vec2(1.2,.28),vec2(.93,.58),.055)+line(q,vec2(.93,.58),vec2(.76,.3),.055);}m+=band(r-.6,.024)*(.5+.5*cos(a*9.0));m*=1.2+.5*sin(uTime*2.5-a*3.0);inner=(1.0-smoothstep(0.0,1.4,r))*.08;
          #elif SPELL == 6
            float leaf=.9+.27*cos(a*6.0);m=band(r-leaf,.025)+band(r-1.42,.014);m+=band(sin(a*3.0)*r,.018)*step(r,1.15);inner=step(r,leaf)*.07;
          #elif SPELL == 9
            for(int i=0;i<3;i++){float t=float(i)*2.094;vec2 b=vec2(cos(t),sin(t))*1.68,c=vec2(cos(t+2.094),sin(t+2.094))*1.68;m+=line(p,b,c,.026)+line(p,b*.74,c*.74,.012);}m+=band(r-.38,.018);inner=exp(-r*r*2.0)*.15;
          #elif SPELL == 12
            float lobes=1.04+.21*cos(a*3.0);m=band(r-lobes,.032)+band(r-lobes*.76,.015);float ripple=fract(r*2.5-uTime*.45);m+=band(ripple-.5,.035)*step(r,lobes)*.25;inner=step(r,lobes)*.14;
          #endif
          float sweep=.45+.55*pow(.5+.5*sin(a*2.0-uTime*1.5+r*3.0),3.0);float alpha=clamp(m*sweep+inner,0.0,.92);
          #if SPELL == 9
            alpha*=smoothstep(.0,.75,uLifeStart)*(1.0-smoothstep(.76,1.0,uLifeEnd));
          #endif
          if(alpha<.003)discard;gl_FragColor=vec4(toonShade(uColor,.35+sweep*.5),alpha);${L}}`,Ae,{},!1,{SPELL:o});o===9&&(e.userData.ownLifecycle=!0);const t=G(new X(3.5,3.5),e,0);t.rotation.x=-Math.PI/2,t.position.y=.018,we(t)}if(E===0){for(let t=0;t<(o===7?3:4);t++)l((a,n)=>{const s=t*h/4+a*3,p=(1-a)*.3,m=Math.sin(a*Math.PI)*.065*(n*2-1);return[-a*2.8,Math.cos(s)*p+m,Math.sin(s)*p+m*.3]},24,2,0,t);const e=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vPhase;${J}
        void main(){float broken=smoothstep(.1,.3,.5+.5*sin(vUv.x*29.0+uTime*5.0+vPhase));float a=pow(1.0-vUv.x,1.6)*sin(vUv.y*3.14159)*broken*uDetail;gl_FragColor=vec4(toonShade(uColor,.62),a*.75);${L}}`,`attribute float aPhase;uniform float uTime;varying vec2 vUv;varying float vPhase;
        void main(){vUv=uv;vPhase=aPhase;vec3 p=position;p.x-=.38*uSize;float a=uTime*1.4+aPhase;p.yz=mat2(cos(a),-sin(a),sin(a),cos(a))*p.yz;p.yz+=sin(uv.x*12.0-uTime*4.0+aPhase)*uv.x*.06;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1);G(V(),e,1).name="school-trail"}const y=M(`uniform vec3 uColor;varying vec2 vUv;varying float vFade;varying float vLight;${J}
      void main(){vec2 q=vUv*2.0-1.0;float a=1.0-smoothstep(.45,1.0,length(q));
        #if SPELL == 1 || SPELL == 2 || SPELL == 10
          a=1.0-smoothstep(.5,.9,abs(q.x)+abs(q.y));
        #elif SPELL == 3
          a=(1.0-smoothstep(.08,.23,abs(q.x+sin(q.y*9.0)*.16)))*(1.0-smoothstep(.75,1.0,abs(q.y)));
        #elif SPELL == 7 || SPELL == 11
          a=(1.0-smoothstep(.1,.7,abs(q.y)))*(1.0-smoothstep(.65,1.0,abs(q.x)));
        #endif
        if(a*vFade<.003)discard;gl_FragColor=vec4(toonShade(uColor,vLight),a*vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime,uStopTime,uQuantity;
#if SPELL == 12 || SPELL == 9
uniform float uLifeEnd,uLifeStart;
#endif
uniform float uStretch;varying vec2 vUv;varying float vFade;varying float vLight;${C}
      void main(){vUv=uv;${k}float f=fract(seed.x+uTime*(.25+seed.w*.3)),a=seed.y*6.283;vec3 p=vec3(0);float scale=.035+seed.w*.055;vFade=sin(f*PI)*alive*.7;vLight=.45+seed.w*.4;
        #if SPELL == 0
          float t=max(0.0,uTime-seed.x*.6);p=vec3((seed.y-.5)*(1.0+t),-1.25+t*(1.4+seed.z)-t*t*.2,(seed.z-.5)*(.4+t*.5));scale*=.6;vFade*=1.0-smoothstep(.55,1.0,life);
        #elif SPELL == 1 || SPELL == 7 || SPELL == 11
          p=vec3(-.38*uSize-f*2.8,cos(a)*(f*.4+.1),sin(a)*(f*.4+.1));scale*=1.0-f*.5;
          #if SPELL == 11
            p.yz*=uSize;scale*=.23*uSize;
          #endif
        #elif SPELL == 2
          p=vec3((floor(seed.y*5.0)-2.0)*.65,f*1.2,(floor(seed.z*5.0)-2.0)*.65);scale*=.6;
        #elif SPELL == 3
          float t=max(0.0,uTime-.08-seed.x*.16);p=vec3(cos(a)*t*2.0,-1.3+sin(min(t,1.0)*PI)*seed.z*.8,sin(a)*t*2.0);vFade*=1.0-smoothstep(.3,.8,life);
        #elif SPELL == 4
          float end=seed.x<.5?-1.0:1.0;p=vec3(end*2.4+end*f*.2/max(uStretch,.001),cos(a)*(.3+f*.7)*uSize,sin(a)*(.3+f*.7)*uSize);vFade*=smoothstep(0.0,.25,uTime);
        #elif SPELL == 5
          p=vec3(cos(a+uTime*.3)*(.3+f),f*1.3,sin(a+uTime*.3)*(.3+f))*uSize;scale*=.42*uSize;vLight=.35;
        #elif SPELL == 6
          p=vec3(cos(a)*(.3+seed.z),f*1.8,sin(a)*(.3+seed.z));scale*=.7;
        #elif SPELL == 8
          float across=seed.y*2.0-1.0,delay=abs(across)*.17+sin(across*7.0)*.025;
          float born=(.34+delay)*3.2+seed.x*.26,t=max(0.0,uTime-born),r=.7+born/3.2*2.1+.4+t*1.2;
          p=vec3(sin(across*1.6)*r,max(-1.27,-.55+t*(.35+seed.z*.7)-t*t*2.4),cos(across*1.6)*r-.5);
          vLight=.8+seed.w*.18;vFade=smoothstep(.0,.06,t)*(1.0-smoothstep(.40,1.0,t))*.88;
          scale=seed.x<.18?.08+seed.w*.08:.035+seed.w*.045;scale*=1.0+step(p.y,-1.26)*.55;
        #elif SPELL == 9
          float bank=floor(seed.y*uQuantity),angle=bank*PI*2.0/uQuantity+.32+(seed.z-.5)*1.55;
          if(uQuantity>3.5)angle=bank*PI*2.0/uQuantity+.32+(seed.z-.5)*1.55*3.0/uQuantity;
          float cycle=fract((uStopTime<0.0?uTime:uStopTime)*.24+bank*.31);if(uStopTime>=0.0)cycle=min(.999,cycle+uLifeEnd*.90);
          float local=clamp((cycle-.10-seed.z*.25)*2.4,0.0,1.0),fall=smoothstep(.02,.88,local),crest=.82-.52*fall;
          float v=crest*(1.0-f),r=.10+v*1.23,bankHeight=pow(sin(seed.z*PI),.65)*(.17+smoothstep(.0,.16,cycle)*.25);
          p=vec3(cos(angle)*r*.72,.035+bankHeight*(1.0-f)*(1.0-fall*.85),sin(angle)*r*.72);
          scale=.025+seed.w*.025;vLight=.45+seed.w*.35;vFade*=smoothstep(.27,.4,cycle)*(1.0-smoothstep(.82,.99,cycle))*smoothstep(.0,.7,uLifeStart)*(1.0-smoothstep(.7,1.0,uLifeEnd));
        #elif SPELL == 10
          float outAge=max(.0,life-.36),r=life<.36?(1.0-life/.36)*1.6:outAge*(2.8+seed.w*2.1);
          float sy=seed.z*2.0-1.0,radial=sqrt(max(.0,1.0-sy*sy));a+=outAge*(.6+seed.w);
          p=vec3(cos(a)*radial*r,sy*r,sin(a)*radial*r);vLight=.72+seed.w*.25;vFade*=1.0-smoothstep(.64+seed.x*.13,.83+seed.x*.15,life);
        #elif SPELL == 12
          float bubble=floor(seed.y*uQuantity),ba=bubble*2.4,br=bubble<.5?0.0:.55+mod(bubble,2.0)*.35;
          if(abs(uQuantity-7.0)>.1)ba=(bubble-1.0)*PI*2.0/max(1.0,uQuantity-1.0);
          float flight=uStopTime<0.0?fract(uTime*.24+bubble*.238-.65):max(0.0,uLifeEnd*1.55-fract(bubble*1.4*.23)*.3-.62);
          float splash=flight*4.0,angle=seed.x*PI*2.0;p=vec3(cos(ba)*br+cos(angle)*splash*.3,max(.04,.16+splash*.5-splash*splash*.7),sin(ba)*br+sin(angle)*splash*.3);
          scale*=.6;vLight=.6+seed.w*.3;vFade=smoothstep(.0,.025,flight)*(1.0-smoothstep(.15,.28,flight))*smoothstep(.0,.3,uLifeStart)*(1.0-smoothstep(.85,1.0,uLifeEnd));
        #endif
        #if SPELL == 0 || SPELL == 8 || SPELL == 10
          p.y=-1.3+(p.y+1.3)*uSize;p.xz*=uSize;
        #elif SPELL == 9
          p*=uSize;
        #endif
        vec4 mv=modelViewMatrix*vec4(p,1.0);vec2 card=position.xy*scale;
        #if SPELL == 7 || SPELL == 11
          card.x*=2.5;
        #endif
        mv.xy+=card;gl_Position=projectionMatrix*mv;
      }`,{},!1,{SPELL:o});if(ee(new X(1,1),xe,1,y,3).name="school-particles",(o===12||o===9)&&(y.userData.ownLifecycle=!0),o===12){const e=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vFade;${C}${J}
        void main(){vec2 q=vUv*2.0-1.0;float cloud=(1.0-smoothstep(.35,1.0,length(q)))*smoothstep(.2,.7,noise2(q*2.0+uTime*.3));gl_FragColor=vec4(toonShade(uColor,.28),cloud*vFade*.65*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime,uStopTime,uLifeStart,uLifeEnd;varying vec2 vUv;varying float vFade;
        void main(){vUv=uv;float f=uStopTime<0.0?fract(seed.x+uTime*.16):min(1.0,fract(seed.x+uStopTime*.16)+uLifeEnd*.65),a=seed.y*6.283+uTime*.25;vec3 p=vec3(cos(a)*(.3+seed.z),.12+f*.35,sin(a)*(.3+seed.z));vec4 mv=modelViewMatrix*vec4(p,1.0);mv.xy+=position.xy*vec2(.65,.28);vFade=sin(f*3.14159)*smoothstep(.0,.5,uLifeStart)*(1.0-smoothstep(.65,1.0,uLifeEnd));gl_Position=projectionMatrix*mv;}`,{},!1);ee(new X(1,1),32,.0625,e,4).name="school-mist",e.userData.ownLifecycle=!0}}if(!(xt({THREE:Ze,kind:E,variant:x,instanced:ee,shader:M,output:L})||gt({THREE:Ze,kind:E,variant:x,cap:xe,mesh:G,instanced:ee,shader:M,output:L})))if(x>=4)Ee();else{let w=function(h,g,l){const u=M(`
      uniform vec3 uColor;uniform float uTime;uniform float uRole;
      varying vec2 vUv;${C}
      void main(){
        vec2 p=vUv*2.0-1.0;float r=length(p),a=atan(p.y,p.x);
        float rays=pow(abs(sin(a*(uRole<0.5?6.0:9.0)+uTime*2.0)),20.0);
        float halo=exp(-r*r*7.5)*0.5;
        float core=exp(-r*r*75.0);
        float crown=band(r-(0.38+sin(uTime*9.0)*0.025),0.012)*(0.4+0.6*pow(abs(sin(a*8.0-uTime*3.0)),4.0));
        float alpha=(halo+core*0.8+rays*exp(-r*5.0)*0.7+crown*0.4)*(1.0-smoothstep(0.8,1.0,r));
        #if KIND == 1
          #if VARIANT == 0
            float aperture=band(r-0.34,0.022)*(0.45+0.55*pow(abs(cos(a*3.0-uTime*1.4)),8.0));
            float splash=pow(max(0.0,cos(a*7.0+sin(a*11.0+uTime*6.0))),14.0)*exp(-r*4.2);
            alpha=core+halo*0.65+(uRole<0.5?aperture:splash)*0.7;
          #elif VARIANT == 1
            float cycle=fract(uTime*1.2-uRole*0.38);
            alpha=core*0.6+halo*0.35+band(r-cycle*0.85,0.026)*(1.0-cycle)*0.85;
            alpha+=pow(max(0.0,cos(a*4.0-uTime)),18.0)*exp(-r*5.0)*0.35;
          #elif VARIANT == 2
            float phase=uTime,release=smoothstep(1.52,1.60,phase),impact=smoothstep(1.61,1.65,phase);
            if(uRole<0.5){
              float intake=fract(r*2.5+phase*1.1);
              float iris=pow(max(0.0,cos(a*5.0-r*9.0+phase*2.5)),12.0);
              alpha=(core*1.2+halo*0.65+iris*exp(-r*3.5)*0.65+band(intake-0.5,0.055)*(1.0-r)*0.25)*(0.1+min(phase/1.52,1.0));
            }else{
              float turbulence=noise2(p*7.0+vec2(phase*2.0,-phase*3.0));
              float corona=exp(-pow((r-0.28-(turbulence-0.5)*0.14)*12.0,2.0));
              float shock=fract(max(0.0,phase-1.62)*1.7);
              alpha=(core*1.5+halo*0.5+corona*0.5+band(r-shock*0.88,0.026)*sin(shock*PI)*0.65)*impact;
            }
          #else
            float jitter=noise2(vec2(cos(a),sin(a))*7.0+floor(uTime*18.0));
            float forks=pow(max(0.0,cos(a*(uRole<0.5?5.0:11.0)+jitter*4.0)),24.0);
            alpha=core*0.8+halo*0.3+forks*(1.0-smoothstep(0.25,0.85,r))*0.8;
          #endif
          alpha*=1.0-smoothstep(0.85,1.0,r);
        #endif
        vec3 color=uColor*(1.1+core)+vec3(core*0.45);
        gl_FragColor=vec4(color,alpha*(0.88+sin(uTime*17.0)*0.12)*uDetail);${L}
      }`,o,{uRole:{value:l}}),P=G(new X(g,g),u,4);return P.position.x=h,P};E===5?ee(new X(1,1),xe,1,M(Me,Ve,{},!1,{CLOUD:1}),0):(ee(E===0&&x===2?new qe(.7):new X(1,1),xe,E===3?.86:1,M(Me,Ve,{},!0,{CLOUD:0}),3),E===3&&ee(new X(1,1),Math.min(x===0?116:128,Math.ceil(xe*.14)),.14,M(Me,Ve,{},!1,{CLOUD:1}),0));const o="varying vec2 vUv;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);mv.xy+=position.xy*length(modelMatrix[1].xyz);gl_Position=projectionMatrix*mv;}";if(E===0)if(x===0){const h=[],g=[],l=[];for(let i=0;i<=48;i++)for(let d=0;d<=20;d++){const y=i/48,e=d/20*Math.PI*2,t=Math.pow(Math.sin(y*Math.PI),.6)*(.12+.5*y);h.push(-2.65+y*4.05,Math.cos(e)*t,Math.sin(e)*t),g.push(y,d/20)}for(let i=0;i<48;i++)for(let d=0;d<20;d++){const y=i*21+d;l.push(y,y+1,y+20+1,y+1,y+20+2,y+20+1)}const V=new se;V.setAttribute("position",new U(h,3)),V.setAttribute("uv",new U(g,2)),V.setIndex(l);const k=M(`uniform float uTime;uniform vec3 uColor;varying vec2 vUv;varying vec3 vN;varying vec3 vView;${C}${J}
        void main(){float h=vUv.x,a=vUv.y*PI*2.0,t=uTime;
          vec2 flowUV=vec2(h*8.0+t*2.7,cos(a)*1.6+sin(a)*2.1);
          float roll=noise2(flowUV),curl=noise2(flowUV*1.71+vec2(t*.9,3.7));
          // 只在前緣和尾端做大塊侵蝕，中央保持連續；不靠碎片堆出主體。
          float tear=roll*.68+curl*.32;
          float front=smoothstep(.78,1.0,h),back=1.0-smoothstep(.04,.40,h);
          if(tear<.16+front*.29+back*.34+sin(a*3.0+h*9.0+t*4.0)*back*.10)discard;
          vec3 n=normalize(vN),eye=normalize(vView);float roundness=abs(dot(n,eye));
          float turn=.5+.5*dot(n,normalize(vec3(-.3,.75,.6)));
          float heat=.10+roundness*.20+turn*.26+roll*.34+sin(h*10.0+a*2.0+t*6.0)*.10;
          vec3 c=mix(uColor*.38,uColor*1.12,toonStep(.40,heat));
          c=mix(c,mix(uColor,vec3(1.0,.88,.46),.6)*1.2,toonStep(.64,heat));
          gl_FragColor=vec4(c,1.0);${L}}`,`${C}
        uniform float uTime;varying vec2 vUv;varying vec3 vN;varying vec3 vView;
        vec3 flamePoint(float h,float a){
          float t=uTime,body=smoothstep(.28,.68,h),scale=mix(1.0,uSize,body);
          float wave=sin(h*12.0+a*3.0+t*6.5),eddy=sin(h*8.0-a*2.0+t*4.1);
          float capAngle=clamp((h-.8)/.2,0.0,1.0)*PI*.5;
          float capFade=h>=1.0?0.0:cos(capAngle);
          float r=h>.8?pow(sin(.8*PI),.6)*.52*capFade:pow(max(.00001,sin(h*PI)),.6)*(.12+.5*h);
          r*=1.0+(wave*.28+eddy*.20)*mix(1.0,capFade,smoothstep(.78,.9,h));
          float spin=a+h*2.7+sin(h*6.0+t*3.2)*.30;
          float x=h>.8?.59+.52*sin(capAngle):-2.65+h*4.05;
          x+=(sin(a*3.0+t*5.5)*.07+eddy*.06)*smoothstep(.60,.82,h)*capFade*capFade;
          x+=sin(t*4.1)*.035*smoothstep(.78,1.0,h);
          x+=sin(a*3.0+h*8.0+t*5.0)*.35*(1.0-smoothstep(.05,.48,h));
          // 軸向接合比截面縮放更晚開始，避免最大尺寸把尾部折回自身。
          x+=(x-.65)*(uSize-1.0)*smoothstep(.55,.90,h);
          vec2 bend=vec2(sin(h*5.0+t*3.0),cos(h*7.0+t*2.7))*(.04+(.9-h)*.10);
          vec2 crossSection=vec2(cos(spin),sin(spin))*r+bend;
          return vec3(x,crossSection*scale);
        }
        void main(){vUv=uv;float h=clamp(uv.x,.001,1.0),a=uv.y*PI*2.0;vec3 p=flamePoint(h,a);
          float nh=min(h,.998);
          vec3 dh=flamePoint(min(nh+.001,1.0),a)-flamePoint(max(nh-.001,0.0),a);
          vec3 da=flamePoint(nh,a+.003)-flamePoint(nh,a-.003);
          vN=normalMatrix*normalize(cross(da,dh));vec4 mv=modelViewMatrix*vec4(p,1.0);vView=-mv.xyz;gl_Position=projectionMatrix*mv;}`,{},!1);k.side=Ke,k.transparent=!1,k.depthWrite=!0;const D=G(V,k,2);D.name="projectile-core"}else if(x<3){let h=function(y,e,t=6,a=8){const n=[],s=[],p=[];for(let q=0;q<=a;q++){const F=q/a,I=Math.pow(Math.sin(F*Math.PI),.9)*(.65+.35*F);for(let N=0;N<=t;N++){const O=N/t*Math.PI*2,ze=1+.13*Math.sin(O*3+.8);n.push((F*2-1)*y,Math.cos(O)*e*I*ze,Math.sin(O)*e*I),s.push(F,N/t)}}for(let q=0;q<a;q++)for(let F=0;F<t;F++){const I=q*(t+1)+F;p.push(I,I+1,I+t+1,I+1,I+t+2,I+t+1)}const m=new se;return m.setAttribute("position",new U(n,3)),m.setAttribute("uv",new U(s,2)),m.setIndex(p),m.computeVertexNormals(),m},g=function(y,e=28,t=5){const a=[],n=[],s=[],p=[];for(const q of y){const F=a.length/3;for(let I=0;I<=e;I++)for(let N=0;N<=t;N++)a.push(I/e,Math.cos(N/t*Math.PI*2),Math.sin(N/t*Math.PI*2)),n.push(I/e,N/t),s.push(...q);for(let I=0;I<e;I++)for(let N=0;N<t;N++){const O=F+I*(t+1)+N;p.push(O,O+1,O+t+1,O+1,O+t+2,O+t+1)}}const m=new se;return m.setAttribute("position",new U(a,3)),m.setAttribute("uv",new U(n,2)),m.setAttribute("aStream",new U(s,4)),m.setIndex(p),m};const l=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying vec3 vN;varying vec3 vV;varying vec3 vP;${C}${J}
        void main(){float rim=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.0);vec3 c;float alpha=0.97;
          #if VARIANT == 1
            float charge=pow(max(0.0,sin(vP.x*13.0+uTime*9.0)),12.0);
            float stripe=pow(abs(cos(vUv.y*18.85+vP.x*2.0)),20.0);
            c=toonShade(uColor,.24+rim*.40+stripe*.31+charge*.21);
          #else
            float lit=max(0.0,dot(normalize(vN),normalize(vec3(-0.35,0.8,0.5))));
            float edge=pow(abs(cos(vUv.y*18.85)),24.0);
            float sweep=pow(max(0.0,sin(vP.x*3.0-uTime*2.4)),24.0);
            float fracture=1.0-smoothstep(0.02,0.065,abs(sin(vP.x*16.0+vP.y*26.0+vP.z*19.0)));
            c=toonShade(uColor,.18+lit*.53+rim*.17+sweep*.24);
          #endif
          gl_FragColor=vec4(c,alpha);${L}}`,`uniform float uTime;varying vec2 vUv;varying vec3 vN;varying vec3 vV;varying vec3 vP;
        void main(){vUv=uv;vec3 p=position;vP=p;
          #if VARIANT == 1
            p.yz*=0.88+0.12*sin(uTime*9.0-p.x*5.0);
          #endif
          vec4 mv=modelViewMatrix*vec4(p,1.0);vN=normalMatrix*normal;vV=-mv.xyz;gl_Position=projectionMatrix*mv;}`,{},!1);l.side=Be,l.depthWrite=!0,l.transparent=!1;let u=h(.85,.22,6,2);if(x===2){u.dispose();const y=[],e=[],t=[];for(const[a,n,s,p,m,q,F]of[[.85,.23,.08,0,0,0,.2],[.65,.15,-.3,.23,.08,-.27,.8],[.49,.13,-.46,-.17,.17,.35,2],[.58,.14,-.36,-.03,-.24,.16,4.1],[.3,.1,-.62,.2,-.16,-.5,1.6]]){const I=h(a,n,6,2),N=I.toNonIndexed();I.dispose(),N.rotateX(F),N.rotateZ(q),N.translate(s,p,m),N.computeVertexNormals(),y.push(...N.attributes.position.array),e.push(...N.attributes.normal.array),t.push(...N.attributes.uv.array),N.dispose()}u=new se,u.setAttribute("position",new U(y,3)),u.setAttribute("normal",new U(e,3)),u.setAttribute("uv",new U(t,2))}const P=G(u,l,2);P.position.x=.85,P.name="projectile-core",we(P),x===2&&fe.push(()=>{P.rotation.x=Math.sin(H*.7)*.12});const V=`uniform float uTime;attribute vec4 aStream;varying vec2 vUv;varying float vPhase;varying float vFace;
        void main(){float h=position.x,t=uTime,phase=aStream.w;vUv=uv;vPhase=phase;
          float a=aStream.x;float radius=aStream.z;float width;vec3 p;
          #if VARIANT == 1
            float tick=floor(t*18.0);a+=h*.65;
            float j=sin(floor(h*13.0)*17.0+tick+phase)*.055*sin(h*PI);
            radius=radius*sin(h*PI)+j;width=.009+sin(h*PI)*.012;
            p=vec3(.85+.65*uSize-h*aStream.y,cos(a)*radius,sin(a)*radius);
          #else
            radius*=sin(h*PI);a+=h*.7+sin(t*.6+phase)*.12;width=.009+sin(h*PI)*.025;
            p=vec3(.85-.3*uSize-h*aStream.y,cos(a)*radius,sin(a)*radius);
          #endif
          float attach=mix(uSize,1.0,smoothstep(0.0,.65,h));p.yz*=attach;
          // 尾端位置固定，只有近彈體的接合範圍隨核心尺寸改變。
          #if VARIANT == 1
            p.x-=.65*(uSize-1.0)*smoothstep(0.0,1.0,h);
          #else
            p.x+=.3*(uSize-1.0)*smoothstep(0.0,1.0,h);
          #endif
          vec3 normal=vec3(0.0,position.y,position.z);p+=normal*width*attach;
          vec4 mv=modelViewMatrix*vec4(p,1.0);vFace=abs(dot(normalize(normalMatrix*normal),normalize(-mv.xyz)));gl_Position=projectionMatrix*mv;}`,k=`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vPhase;varying float vFace;${C}${J}
        void main(){float h=vUv.x,t=uTime,alpha;vec3 c;
          #if VARIANT == 1
            float packet=pow(max(0.0,sin(h*26.0+t*14.0+vPhase)),10.0);
            alpha=(.18+.75*toonStep(.35,packet))*sin(h*PI);c=toonShade(uColor,.50+packet*.35);
          #else
            float frost=noise2(vec2(h*19.0+t*1.8,vUv.y*7.0+vPhase));
            alpha=pow(1.0-h,1.5)*smoothstep(0.0,.14,h)*(.12+.18*toonStep(.5,frost));c=toonShade(uColor,.53);
          #endif
          gl_FragColor=vec4(c,alpha*uDetail);${L}}`,D=M(k,`${C}${V}`,{},!1),d=G(g(x===1?[[.1,3,.26,.3],[1.5,2.65,.38,1.7],[2.8,3.4,.21,3.2],[4.2,2.8,.34,4.6],[5.4,3.15,.25,5.8]]:[[.5,2.6,.34,.3],[2.7,2,.4,1.7],[4.8,2.35,.28,3.2]],24,5),D,3);if(d.name="projectile-trails",x===1){const y=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vPhase;${C}${J}
          void main(){float cut=noise2(vec2(floor(vUv.x*9.0),floor(uTime*16.0)+vPhase));float flash=.35+.65*step(.36,cut);float a=sin(vUv.x*PI)*flash;gl_FragColor=vec4(toonShade(uColor,.74),a*uDetail);${L}}`,`${C}uniform float uTime;attribute vec4 aStream;varying vec2 vUv;varying float vPhase;
          void main(){vUv=uv;vPhase=aStream.w;float h=position.x;float tick=floor(uTime*16.0);float a=aStream.x;
            float jitter=sin(floor(h*10.0)*18.0+tick+aStream.w)*.08;float r=sin(h*PI)*(aStream.z+jitter);
            vec3 p=vec3(.72-h*aStream.y,cos(a)*r,sin(a)*r);p.yz+=position.yz*.012;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1),e=G(g([[.4,1.5,.38,.1],[1.8,1.2,.46,1.2],[3.2,1.6,.39,2.7],[4.7,1.35,.42,4.1],[.7,.8,.52,5.3],[3.6,.9,.54,6.9]],20,3),y,4);e.position.x=.85,e.name="projectile-envelope",we(e)}}else{const h=[],g=[],l=[];for(let e=0;e<6;e++){const t=new qe(.13);for(let a=0;a<t.attributes.position.count;a++)h.push(...t.attributes.position.array.slice(a*3,a*3+3)),g.push(...t.attributes.normal.array.slice(a*3,a*3+3)),l.push(e);t.dispose()}const u=new se;u.setAttribute("position",new U(h,3)),u.setAttribute("normal",new U(g,3)),u.setAttribute("aOrbit",new U(l,1)),u.setAttribute("aUnit",new U(l,1));const P=M(`uniform vec3 uColor;varying vec3 vN;varying float vQuantityFade;${J}void main(){if(vQuantityFade<.5)discard;float l=abs(dot(normalize(vN),normalize(vec3(-0.5,0.8,0.4))));gl_FragColor=vec4(toonShade(uColor,.2+l*.75),1.0);${L}}`,`uniform float uTime,uQuantity,uSpread;attribute float aOrbit;varying vec3 vN;varying float vQuantityFade;
        void main(){vQuantityFade=step(aOrbit,uQuantity-.5);float a=aOrbit*(uQuantity==3.0?2.094395:6.283185307/uQuantity)-uTime*3.0;vec3 p=position*vec3(1.4,0.6,0.6);p+=vec3(sin(a*2.0)*0.09,cos(a)*0.26*uSpread,sin(a)*0.26*uSpread);vN=normalMatrix*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1),V=G(u,P,3);V.name="arcane-missile-cores",V.position.x=.85,we(V);const k=[],D=[],i=[];for(let e=0;e<6;e++){const t=k.length/3;for(let a=0;a<=64;a++)for(let n=0;n<2;n++)k.push(a/64,e,n*2-1),D.push(a/64,n);for(let a=0;a<64;a++){const n=t+a*2;i.push(n,n+1,n+2,n+1,n+3,n+2)}}const d=new se;d.setAttribute("position",new U(k,3)),d.setAttribute("uv",new U(D,2)),d.setAttribute("aUnit",new U(k.filter((e,t)=>t%3===1),1)),d.setIndex(i);const y=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vQuantityFade;${J}void main(){if(vQuantityFade<.5)discard;float edge=abs(vUv.y*2.0-1.0);float a=(1.0-toonStep(.78,edge))*pow(1.0-vUv.x,1.2);float rune=pow(max(0.0,cos(vUv.x*44.0+uTime*5.0)),10.0);float packet=0.32+0.55*rune+0.13*sin(vUv.x*32.0+uTime*6.0);gl_FragColor=vec4(toonShade(uColor,.45+packet*.4),a*(.5+.5*toonStep(.55,packet))*uDetail);${L}}`,`uniform float uTime,uQuantity,uSpread;varying vec2 vUv;varying float vQuantityFade;
        void main(){vUv=uv;vQuantityFade=step(position.y,uQuantity-.5);float h=position.x,a=position.y*(uQuantity==3.0?2.094395:6.283185307/uQuantity)-uTime*3.0+h*12.0;float r=(0.26*mix(uSize,1.0,smoothstep(0.0,0.35,h))+h*0.16)*uSpread;vec3 p=vec3(0.85-h*3.5,cos(a)*r,sin(a)*r);vec4 mv=modelViewMatrix*vec4(p,1.0);mv.y+=position.z*(0.02+(1.0-h)*0.045)*length(modelMatrix[1].xyz);gl_Position=projectionMatrix*mv;}`,{},!1);G(d,y,2).name="arcane-missile-trails"}if(E===1){if(w(-2.4,x===2?2.1:1,0),w(2.4,x===2?2.6:1.4,1),x<2){const h=M(`varying vec2 vUv;varying vec3 vN;varying vec3 vV;uniform float uTime,uQuantity;uniform vec3 uColor;${C}
        void main(){float v=vUv.y,t=uTime;float alpha=0.6;vec3 c=uColor*1.2;
        #if VARIANT == 0
          float filament=pow(max(0.0,cos(vUv.x*PI*8.0-v*31.0+t*8.0)),20.0);
          float facing=abs(dot(normalize(vN),normalize(vV)));alpha=0.48+filament*0.35;c+=vec3(0.35)+uColor*filament*0.6+vec3(pow(facing,6.0)*0.3);
        #elif VARIANT == 1
          float packet=pow(max(0.0,cos(uQuantity==4.0?v*PI*8.0-t*8.0:v*6.283185307*uQuantity-t*8.0*(uQuantity/4.0))),12.0);float fins=pow(abs(cos(vUv.x*PI*4.0)),6.0);alpha=0.035+packet*(0.55+fins*0.45);c+=vec3(packet*0.8);
        #endif
        gl_FragColor=vec4(c,alpha);${L}}`,`varying vec2 vUv;varying vec3 vN;varying vec3 vV;uniform float uTime,uQuantity;
        void main(){vUv=uv;vec3 p=position;
        #if VARIANT == 1
          float packet=pow(max(0.0,cos(uQuantity==4.0?uv.y*25.13274-uTime*8.0:uv.y*6.283185307*uQuantity-uTime*8.0*(uQuantity/4.0))),6.0);p.xz*=0.35+packet*0.9;
        #endif
        p.xz*=uSize;vec4 mv=modelViewMatrix*vec4(p,1.0);vN=normalMatrix*normal;vV=-mv.xyz;gl_Position=projectionMatrix*mv;}`),g=x===1?.12:.045,l=G(new Ye(g,g,4.8,12,48,!0),h,2);if(l.rotation.z=-Math.PI/2,x===1&&(l.name="pulse-body"),x===0){const u=M(`varying vec2 vUv;uniform vec3 uColor;uniform float uTime;${C}
          void main(){float filament=pow(max(0.0,cos(vUv.x*PI*6.0-vUv.y*24.0+uTime*3.0)),24.0);gl_FragColor=vec4(uColor,0.08+filament*0.28);${L}}`),P=G(new Ye(.13,.13,4.8,24,64,!0),u,1);P.rotation.z=-Math.PI/2,we(P,"xz")}else{const u=M(`varying float vFade;uniform vec3 uColor;void main(){gl_FragColor=vec4(uColor*1.7,vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime;uniform float uStretch;varying float vFade;
          void main(){float life=fract(seed.x+uTime*0.38);vec3 p=vec3(position.z,position.y,position.x);float x;
            x=-2.4+life*4.8;p.yz*=uSize*(0.7+sin(life*3.14159)*0.6);vFade=sin(life*3.14159)*0.85;
          p.x/=uStretch;p.x+=x;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`);ee(new st(.26,.012,5,32),12,.025,u,3)}}else if(x===3){const h=[],g=[],l=[];for(let V=0;V<12;V++){const k=h.length/3;for(let D=0;D<=80;D++)for(let i=0;i<2;i++)h.push(D/80,V,i*2-1),g.push(D/80,i);for(let D=0;D<80;D++){let i=k+D*2;l.push(i,i+1,i+2,i+1,i+3,i+2)}}const u=new se;u.setAttribute("position",new U(h,3)),u.setAttribute("uv",new U(g,2)),u.setAttribute("aUnit",new U(h.filter((V,k)=>k%3===1),1)),u.setIndex(l);const P=M(`varying vec2 vUv;varying float vBranch;varying float vQuantityFade;uniform vec3 uColor;void main(){if(vQuantityFade<.5)discard;float a=1.0-abs(vUv.y*2.0-1.0);gl_FragColor=vec4(uColor*1.5+vec3(vBranch<0.5?0.7:0.1),a*(vBranch<0.5?1.0:0.65));${L}}`,`varying vec2 vUv;varying float vBranch;varying float vQuantityFade;uniform float uTime,uQuantity;${C}
        void main(){vUv=uv;float h=position.x,b=position.y,frame=floor(uTime*18.0);vBranch=b;vQuantityFade=step(b,uQuantity-.5);
          float envelope=sin(h*PI),cell=h*22.0;float k=floor(cell);float frac=fract(cell);
          float n=mix(hash(vec2(k,frame+b*13.0)),hash(vec2(k+1.0,frame+b*13.0)),frac)*2.0-1.0;
          float m=mix(hash(vec2(k,frame+b*9.0+43.0)),hash(vec2(k+1.0,frame+b*9.0+43.0)),frac)*2.0-1.0;
          float amp=(b<0.5?0.18:0.25+min(b,5.0)*0.09)*uSize;vec3 p=vec3(h*4.8-2.4,n*envelope*amp,m*envelope*amp);
          vec4 mv=modelViewMatrix*vec4(p,1.0);mv.y+=position.z*(b<0.5?0.038:0.018)*uSize;gl_Position=projectionMatrix*mv;}`);G(u,P,3).name="arc-ray-branches"}if(x===2){const h=[],g=[],l=[];for(let k=0;k<5;k++){const D=h.length/3;for(let i=0;i<=64;i++)for(let d=0;d<2;d++)h.push(i/64,d*2-1,k),g.push(i/64,d);for(let i=0;i<64;i++){const d=D+i*2;l.push(d,d+1,d+2,d+1,d+3,d+2)}}const u=new se;u.setAttribute("position",new U(h,3)),u.setAttribute("uv",new U(g,2)),u.setIndex(l);const P=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vBlade;${C}
        void main(){float phase=uTime,h=vUv.x,edge=abs(vUv.y*2.0-1.0);float release=smoothstep(1.52,1.60,phase);
          float head=clamp((phase-1.52)*10.0,0.0,1.08);float gate=1.0-smoothstep(head-0.035,head,h);
          float fiber=0.6+0.4*noise2(vec2(h*24.0-uTime*25.0,edge*5.0+vBlade));float core=exp(-edge*edge*24.0);
          float a=(1.0-smoothstep(0.55,1.0,edge))*fiber*release*gate;
          if(vBlade<0.5)a=max(a,exp(-edge*edge*90.0)*0.09);
          gl_FragColor=vec4(uColor*(1.5+core*0.5)+vec3(core*0.65),a*(vBlade<0.5?0.95:0.5));${L}}`,`uniform float uTime;varying vec2 vUv;varying float vBlade;
        void main(){vUv=uv;float h=position.x,id=position.z;vBlade=id;float phase=uTime;float release=smoothstep(1.52,1.60,phase);
          float a=id*1.256637+uTime*0.25;float profile=pow(max(0.0,sin(h*3.14159)),0.55);float diamonds=pow(abs(sin(h*12.56637-phase*3.0)),3.0);
          float width=(id<0.5?0.035:0.05+profile*(0.12+diamonds*0.14))*uSize;
          if(id>0.5)width*=release;float bend=sin(h*15.0-id+uTime*9.0)*0.035*profile*release*uSize;
          vec3 p=vec3(h*4.8-2.4,cos(a)*(position.y*width+bend),sin(a)*(position.y*width+bend));gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`);G(u,P,3);const V=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vFade;void main(){float edge=abs(vUv.y*2.0-1.0);float core=exp(-edge*edge*16.0);gl_FragColor=vec4(uColor*1.8+vec3(core*0.35),core*vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime;uniform float uStretch;varying vec2 vUv;varying float vFade;
        void main(){vUv=uv;float phase=uTime,h=uv.x;float charge=min(phase/1.52,1.0);float a=seed.x*6.28318-h*2.6-uTime*2.1;
          float r=(1.0-h)*(0.35+charge*0.65);vec3 p=vec3(-2.4-(1.0-h)*(0.3+seed.y*0.55)/uStretch,cos(a)*r*uSize,sin(a)*r*uSize);
          p.yz+=vec2(cos(a),sin(a))*position.y*0.028*uSize;
          vFade=sin(h*3.14159)*(0.15+charge*0.8)*(1.0-smoothstep(1.55,1.75,phase)*0.40);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`);ee(new X(1,1,32,1),7,.016,V,3)}for(const h of[-1,1]){const g=M(`uniform vec3 uColor;uniform float uTime;uniform float uEnd;varying vec2 vUv;${C}
        void main(){vec2 p=vUv*2.0-1.0;float r=length(p),a=atan(p.y,p.x);float alpha;
        #if VARIANT == 0
          alpha=band(r-0.58,0.018)+band(r-0.76,0.008)*step(0.65,sin(a*8.0-uTime));
        #elif VARIANT == 1
          float wave=fract(uTime*1.2);alpha=band(r-wave*0.92,0.024)*(1.0-wave)+band(r-0.3,0.018);
        #elif VARIANT == 2
          float phase=uTime,charge=min(phase/1.52,1.0),release=smoothstep(1.61,1.65,phase);
          if(uEnd<0.0){float iris=pow(max(0.0,cos(a*5.0-r*6.0-uTime*2.5)),10.0);alpha=(band(r-0.48,0.016)+iris*band(r-0.64,0.09))*charge+exp(-r*r*18.0)*(0.1+charge*0.6);}
          else{float pulse=fract(max(0.0,phase-1.62)*1.7);alpha=(band(r-0.48,0.02)*0.65+band(r-pulse*0.94,0.035)*(1.0-pulse)+pow(max(0.0,cos(a*9.0+uTime*5.0)),12.0)*exp(-r*4.0))*release;}
        #else
          float n=noise2(vec2(a*12.0,floor(uTime*16.0)));alpha=band(r-0.55-n*0.18,0.018)+pow(max(0.0,sin(a*11.0+uTime*5.0)),32.0)*exp(-r*2.0)*0.5;
        #endif
        gl_FragColor=vec4(uColor*1.4,alpha*0.8*uDetail);${L}}`,Ae,{uEnd:{value:h}}),l=G(new X(h<0?1:1.3,h<0?1:1.3),g,2);l.rotation.y=Math.PI/2,l.position.x=h*2.4}}if(E===2){const h=M(`
      uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
      float segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/dot(d,d),0.0,1.0));}
      float ink(float d,float w){return band(d,w)+exp(-abs(d)*120.0)*0.12;}
      float polygon(vec2 p,float sides,float radius,float rotation){float a=atan(p.y,p.x)+rotation;float sector=2.0*PI/sides;return cos(floor(0.5+a/sector)*sector-a)*length(p)-radius;}
      void main(){
        vec2 p=(vUv-0.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=uTime;
        if(r>0.99)discard;
        float inkSum=ink(r-0.94,0.003)+ink(r-0.9,0.0018)+ink(r-0.74,0.003);
        float spin=a-t*0.09;
        float cells=(spin+PI)/6.28318*36.0;
        vec2 q=vec2((fract(cells)-0.5)*1.8,(r-0.821)*16.0);
        float id=floor(cells);
        float rune=segment(q,vec2(-0.22,-0.42),vec2(-0.22,0.42));
        rune=min(rune,segment(q,vec2(-0.22,0.31),vec2(0.27,0.10+mod(id,3.0)*0.10)));
        rune=min(rune,segment(q,vec2(-0.22,-0.15),vec2(0.28,-0.35)));
        if(mod(id,2.0)<1.0)rune=min(rune,segment(q,vec2(0.25,-0.35),vec2(0.25,0.34)));
        inkSum+=ink(rune,0.035)*step(0.77,r)*(1.0-step(0.875,r));
        float outerTicks=pow(abs(sin(a*48.0+t*0.12)),32.0)*band(r-0.968,0.012);
        inkSum+=outerTicks*0.7;
        #if VARIANT == 0
          // 花瓣與四向治療十字。
          float petals=0.35+0.16*cos(a*8.0+t*0.12);
          inkSum+=ink(r-petals,0.004)+ink(r-0.6,0.002);
          inkSum+=ink(r-0.17,0.004);
          inkSum+=ink(segment(p,vec2(-0.12,0),vec2(0.12,0)),0.022);
          inkSum+=ink(segment(p,vec2(0,-0.12),vec2(0,0.12)),0.022);
          float ang=floor((a+PI/4.0)/(PI/2.0))*PI/2.0;
          vec2 c=vec2(cos(ang),sin(ang))*0.65;
          vec2 d=p-c;
          inkSum+=ink(segment(d,vec2(-0.035,0),vec2(0.035,0)),0.009)+ink(segment(d,vec2(0,-0.035),vec2(0,0.035)),0.009);
        #elif VARIANT == 1
          // 五向炎輪：長短分明的火刃，避免交疊三角形造成雜亂。
          float sector=2.0*PI/5.0;float angle=mod(a-t*0.055+sector*0.5,sector)-sector*0.5;
          vec2 f=vec2(cos(angle),sin(angle))*r;
          float curve=0.12*sin((f.x-0.18)*7.0);
          float blade=ink(f.y-curve,0.008)*smoothstep(0.14,0.24,f.x)*(1.0-smoothstep(0.54,0.65,f.x));
          float echo=ink(f.y+0.055-curve*0.6,0.003)*smoothstep(0.23,0.32,f.x)*(1.0-smoothstep(0.48,0.60,f.x));
          inkSum+=blade+echo;
          inkSum+=ink(r-0.115,0.005)+ink(polygon(p,5.0,0.075,t*0.055),0.007);
          inkSum+=ink(r-0.67,0.003)*step(0.05,cos(a*5.0-t*0.275));
          inkSum+=ink(polygon(p,5.0,0.60,t*0.055),0.0015)*0.6;
        #elif VARIANT == 2
          // 六角冰晶主幹、分枝與雙層六角結界。
          inkSum+=ink(polygon(p,6.0,0.64,0.0),0.004)+ink(polygon(p,6.0,0.53,PI/6.0),0.002);
          float sector=PI/3.0;float local=mod(a+sector*0.5,sector)-sector*0.5;
          vec2 f=vec2(cos(local),sin(local))*r;
          inkSum+=ink(segment(f,vec2(0.08,0),vec2(0.63,0)),0.005);
          inkSum+=ink(segment(f,vec2(0.30,0),vec2(0.42,0.13)),0.004)+ink(segment(f,vec2(0.30,0),vec2(0.42,-0.13)),0.004);
          inkSum+=ink(segment(f,vec2(0.46,0),vec2(0.55,0.09)),0.003)+ink(segment(f,vec2(0.46,0),vec2(0.55,-0.09)),0.003);
          inkSum+=ink(polygon(p,6.0,0.10,0.0),0.008);
        #else
          // 交錯方印、八角邊界與斷續防禦刻度。
          inkSum+=ink(polygon(p,4.0,0.40,t*0.08),0.004)+ink(polygon(p,4.0,0.40,PI/4.0+t*0.08),0.004);
          inkSum+=ink(polygon(p,8.0,0.65,0.0),0.004)+ink(polygon(p,4.0,0.13,-t*0.15),0.01);
          inkSum+=band(r-0.69,0.012)*step(0.1,sin(a*16.0-t*0.3));
        #endif
        float pulse=0.85+sin(t*1.2)*0.15;float accent=0.0;
        #if VARIANT == 0
          float growth=fract(t*0.26);accent=exp(-pow((r-growth)*22.0,2.0))*sin(growth*PI);pulse=0.68+0.24*pow(0.5+0.5*sin(t*1.5),2.0);
        #elif VARIANT == 1
          float sectorHeat=0.5+0.5*sin(a*5.0-t*2.0);accent=sectorHeat*noise2(p*9.0-t*0.7);pulse=0.72+accent*0.3;
        #elif VARIANT == 2
          float freeze=fract(t*0.14);accent=exp(-pow((r-freeze)*30.0,2.0))*sin(freeze*PI);pulse=0.82;
        #else
          accent=pow(max(0.0,cos(a*4.0-t*1.2-r*5.0)),16.0);pulse=0.76;
        #endif
        float alpha=min(inkSum*(0.72+accent*0.65),1.0)*pulse;
        gl_FragColor=vec4(uColor*1.4+vec3(0.04),alpha*uDetail);${L}
      }`),g=G(new X(4.5,4.5),h,1);g.rotation.x=-Math.PI/2,g.position.y=.025,we(g);const l=M(`
      uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
      void main(){vec2 p=vUv*2.0-1.0;float r=length(p),t=uTime;float a=0.0;vec3 c=uColor;
        #if VARIANT == 0
          float wave=fract(t*0.26);a=exp(-r*r*5.0)*0.035+exp(-pow((r-wave)*18.0,2.0))*sin(wave*PI)*0.12;
        #elif VARIANT == 1
          float n=noise2(p*7.0+vec2(t*0.3,-t*0.4));float vein=pow(1.0-abs(sin(p.x*19.0+p.y*11.0+n*7.0)),7.0);a=(0.025+vein*0.15)*(1.0-smoothstep(0.2,0.87,r));c=uColor*(0.6+n*0.8);
        #elif VARIANT == 2
          float crystal=pow(abs(cos(atan(p.y,p.x)*3.0)),18.0);a=(crystal*0.06+noise2(p*18.0)*0.025)*(1.0-smoothstep(0.4,0.9,r));
        #else
          a=band(r-0.78,0.014)*(0.08+0.07*sin(t*2.0))+exp(-r*r*5.0)*0.025;
        #endif
        gl_FragColor=vec4(c,a*uDetail);${L}}
    `),u=G(new X(4.8,4.8),l,0);if(u.rotation.x=-Math.PI/2,u.position.y=.015,x===3){const P=M(`
        uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
        void main(){
          vec2 grid=vec2(vUv.x*24.0,vUv.y*12.0);grid.x+=mod(floor(grid.y),2.0)*0.5;vec2 cell=abs(fract(grid)-0.5);
          float tile=band(max(cell.x*0.866+cell.y*0.5,cell.y)-0.44,0.018);
          float latitude=sin(vUv.y*PI*0.5);float scan=exp(-pow((vUv.y-fract(uTime*0.17))*20.0,2.0));
          float alpha=(tile*(0.11+scan*0.22)+scan*0.04)*latitude;
          gl_FragColor=vec4(uColor*(1.0+scan*0.6),alpha*uDetail);${L}}
      `);we(G(new He(1.85,40,20,0,Math.PI*2,0,Math.PI/2),P,2))}}if(E===3){if(x===0){const D=M(`varying vec2 vUv;varying float vSeed;uniform vec3 uColor;uniform float uTime;${C}${Se}
        void main(){vec2 p=vUv*2.0-1.0;float t=uTime;float angle=vSeed*6.28+t*0.45;p=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p;
          float n=fbm(p*3.2+vec2(vSeed*17.0,-t*1.0));float fine=noise2(p*9.0+n*3.0);float d=length(p)+(n-0.5)*0.28;
          float body=smoothstep(0.18,0.70,n+(1.0-d)*0.35);float heat=max(0.0,1.0-t*0.7);
          vec2 fireUv=vec2(vUv.x+sin(vUv.y*8.0-t*4.0)*0.055,vUv.y*vUv.y);
          vec3 burn=flameErosion(fireUv,t*1.3,vSeed*7.0);
          vec3 ember=flameColor(uColor,clamp(n*0.65+burn.y*0.5,0.0,1.0))*mix(0.7,1.1,fine);
          vec3 color=mix(vec3(0.045,0.035,0.028),ember,smoothstep(0.0,0.6,heat));
          float alpha=(1.0-smoothstep(0.45,1.0,d))*body*smoothstep(0.0,0.08,t)*(1.0-smoothstep(0.8,2.0,t));
          alpha*=mix(1.0,0.35+burn.x*0.65,heat);
          #if TOON == 1
            color=mix(styleColor(uColor*.23,.2+n*.65),styleHeat(uColor,.12+n*.33+(1.0-d)*.38+burn.y*.18-p.y*.08),smoothstep(.0,.6,heat));
            alpha=(1.0-smoothstep(.72,.94,d))*smoothstep(.24,.42,n+(1.0-d)*.35)*smoothstep(.0,.08,t)*(1.0-smoothstep(.8,2.0,t));
          #endif
          gl_FragColor=vec4(color,alpha*(TOON==1?.68:.85));${L}}`,`attribute vec4 seed;uniform float uTime;varying vec2 vUv;varying float vSeed;
        void main(){vUv=uv;vSeed=seed.w;float t=uTime,rise=1.0-exp(-t*6.0),a=seed.x*6.28318;
          vec3 p=vec3(cos(a)*rise*(0.15+seed.y*0.65),rise*(0.4+seed.y*1.5)+t*0.2,sin(a)*rise*(0.15+seed.y*0.65))*uSize;p.y-=1.35;
          vec4 mv=modelViewMatrix*vec4(p,1.0);mv.xy+=position.xy*(0.3+rise*1.5)*(0.8+seed.z*0.4)*uSize*length(modelMatrix[1].xyz);gl_Position=projectionMatrix*mv;}`,{},!1);ee(new X(1,1),12,.025,D,1)}if(x===1){if(ne){const i=[],d=[],y=[],e=[],t=[];for(let p=0;p<72;p++){const m=Math.floor(p%36/12),q=p%12+(p>=36?12:0),F=m===0?16:5,I=i.length/3;for(let N=0;N<=F;N++)for(let O=0;O<2;O++)i.push(N/F,O*2-1,p),d.push(N/F,O),y.push(q),e.push(m);for(let N=0;N<F;N++){const O=I+N*2;t.push(O,O+1,O+2,O+1,O+3,O+2)}}const a=new se;a.setAttribute("position",new U(i,3)),a.setAttribute("uv",new U(d,2)),a.setAttribute("aUnit",new U(y,1)),a.setAttribute("aRole",new U(e,1)),a.setIndex(t);const n=M(`uniform vec3 uColor;varying vec2 vUv;varying float vFade;varying float vId;
          void main(){float edge=abs(vUv.y*2.0-1.0);float aa=max(fwidth(edge),.025);
            float core=1.0-smoothstep(.20-aa,.20+aa,edge);
            float seam=styleStep(.62,fract(vUv.x*3.0+vId*.31));
            vec3 c=styleColor(uColor,.36+core*.52-seam*.09);
            float alpha=(1.0-smoothstep(.75,1.0,edge))*vFade;
            gl_FragColor=vec4(c,alpha);${L}}`,`uniform float uTime,uQuantity;attribute float aUnit,aRole;varying vec2 vUv;varying float vFade;varying float vId;${C}
          vec3 direction(float id){float a=id*2.39996;return normalize(vec3(cos(a),.40+hash(vec2(id,3.0))*1.6,sin(a)));}
          vec3 pointOnArc(float id,float h){vec3 dir=direction(id);vec3 side=normalize(cross(dir,vec3(0,1,0)));vec3 up=cross(side,dir);
            float cell=h*16.0,i=floor(cell),f=fract(cell);
            float j=mix(hash(vec2(id*3.0,i)),hash(vec2(id*3.0,i+1.0)),f)-.5;
            float k=mix(hash(vec2(id*7.0,i+13.0)),hash(vec2(id*7.0,i+14.0)),f)-.5;
            return dir*h*(1.8+hash(vec2(id,9.0))*1.6)+(side*j+up*k)*.52*sin(h*PI*.9);}
          float pulse(float t,float start,float end){return smoothstep(start,start+.035,t)*(1.0-smoothstep(end-.06,end,t));}
          void main(){vUv=uv;float branch=position.z,id=aUnit,h=position.x,t=uTime;vId=branch;
            float delay=.035+hash(vec2(id,5.0))*.085;float growth=clamp((t-delay)*6.5,0.0,1.0);
            vec3 dir=direction(id),p=pointOnArc(id,h*growth);
            float width=.044+hash(vec2(id,2.0))*.025;
            if(aRole>.5){float fork=aRole<1.5?.31:.62;float offset=aRole<1.5?1.0:-1.0;
              vec3 side=normalize(cross(dir,vec3(0,1,0)));vec3 split=normalize(dir*.5+side*offset*.85+vec3(0,.28,0));
              float child=clamp((growth-fork)/(1.0-fork),0.0,1.0);float lengthBranch=.5+hash(vec2(branch,7.0))*.85;
              float cell=h*5.0,i=floor(cell);float jag=mix(hash(vec2(branch,i)),hash(vec2(branch,i+1.0)),fract(cell))-.5;
              p=pointOnArc(id,min(growth,fork))+split*h*lengthBranch*child+side*jag*.36*sin(h*PI)*child;dir=split;width*=.62;
            }
            float main=pulse(t,delay,.47+hash(vec2(id,4.0))*.22);
            float echo=pulse(t,.78+hash(vec2(id,8.0))*.27,.93+hash(vec2(id,8.0))*.27)*.8;
            echo+=pulse(t,1.28+hash(vec2(id,6.0))*.34,1.41+hash(vec2(id,6.0))*.34)*.6;
            echo+=pulse(t,1.85+hash(vec2(id,11.0))*.12,1.97+hash(vec2(id,11.0))*.12)*step(.72,hash(vec2(id,12.0)))*.4;
            vFade=max(main,echo)*growth*step(aUnit,uQuantity-.5);width*=1.0-smoothstep(.88,1.0,h)*.78;
            p*=uSize;p.y-=1.20;vec4 mv=modelViewMatrix*vec4(p,1);
            vec2 along=normalize((modelViewMatrix*vec4(dir,0)).xy+vec2(.0001));
            mv.xy+=vec2(-along.y,along.x)*position.y*width*uSize*length(modelMatrix[1].xyz);
            gl_Position=projectionMatrix*mv;}`,{},!1);G(a,n,2).name="energy-burst-arcs";const s=M(`uniform vec3 uColor;varying vec2 vUv;varying float vFade;
          void main(){float edge=abs(vUv.y*2.0-1.0);float core=1.0-smoothstep(.25,.5,edge);
            gl_FragColor=vec4(styleColor(uColor,.4+core*.46),(1.0-smoothstep(.6,1.0,edge))*vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime;varying vec2 vUv;varying float vFade;${C}
          void main(){vUv=uv;float t=uTime,a=seed.x*PI*2.0,dt=max(0.0,t-.09-seed.w*.09);vec3 dir=normalize(vec3(cos(a),.4+seed.y*1.8,sin(a)));
            vec3 p=dir*(.35+(1.0-exp(-dt*3.0))*(1.2+seed.z*1.8));p*=uSize;p.y-=1.2;
            vec4 mv=modelViewMatrix*vec4(p,1);vec2 along=normalize((modelViewMatrix*vec4(dir,0)).xy+vec2(.0001));vec2 side=vec2(-along.y,along.x);
            float jag=(hash(vec2(seed.w*71.0,floor(uv.x*4.0+.01)))-.5)*sin(uv.x*PI);
            mv.xy+=(along*position.x*(.22+seed.z*.45)+side*(jag*.18+position.y*.022))*uSize*length(modelMatrix[1].xyz);
            vFade=smoothstep(.0,.07,dt)*(1.0-smoothstep(.28+seed.z*.15,.65+seed.z*.3,dt));gl_Position=projectionMatrix*mv;}`,{},!1);ee(new X(1,1,4,1),36,.06,s,3)}else{const i=[],d=[],y=[];for(let n=0;n<18;n++){const s=i.length/3;for(let p=0;p<=24;p++)for(let m=0;m<2;m++)i.push(p/24,m*2-1,n),d.push(p/24,m);for(let p=0;p<24;p++){const m=s+p*2;y.push(m,m+1,m+2,m+1,m+3,m+2)}}const e=new se;e.setAttribute("position",new U(i,3)),e.setAttribute("uv",new U(d,2)),e.setIndex(y);const t=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vFade;varying float vRay;${C}
        void main(){float edge=abs(vUv.y*2.0-1.0);float core=exp(-edge*edge*28.0);float n=noise2(vec2(vUv.x*21.0,vRay*3.1));
          float erosion=smoothstep(0.08,0.30,n-uTime*0.22+0.25);float front=exp(-pow((vUv.x-fract(uTime*1.6+vRay*0.13))*16.0,2.0));
          float broken=(0.25+0.75*erosion)*(0.6+front*0.7);float alpha=(1.0-smoothstep(0.6,1.0,edge))*vFade*broken;vec3 c=uColor*(1.3+core)+vec3(core*.85);
          #if TOON == 1
            c=styleColor(uColor,.28+core*.55+front*.12);alpha=(1.0-smoothstep(.78,1.0,edge))*vFade*(.35+.65*erosion);
          #endif
          gl_FragColor=vec4(c,alpha);${L}}`,`uniform float uTime;varying vec2 vUv;varying float vFade;varying float vRay;${C}
        void main(){vUv=uv;float id=position.z;vRay=id;float h=position.x,t=uTime,dt=max(0.0,t-0.04-hash(vec2(id,5.0))*0.055);float a=id*2.39996;
          float growth=1.0-exp(-dt*11.0);float lengthRay=(1.5+hash(vec2(id,7.0))*1.8)*growth;
          float outward=0.3+hash(vec2(id,4.0))*0.9;
          vec3 dir=normalize(vec3(cos(a)*outward,0.65+hash(vec2(id,3.0)),sin(a)*outward));
          float bend=sin(h*PI)*sin(floor(h*8.0)*1.7+id)*0.11;
          vec3 p=dir*(h*lengthRay+max(0.0,t-0.3)*0.55);p.xz+=vec2(-sin(a),cos(a))*bend;
          float width=pow(max(0.0,sin(h*PI)),1.2)*(0.09+hash(vec2(id,1.0))*0.13)*growth;
          p.xz+=vec2(-sin(a),cos(a))*position.y*width;p*=uSize;p.y-=1.20;
          vFade=smoothstep(0.04,0.12,t)*(1.0-smoothstep(0.22+hash(vec2(id,9.0))*0.2,0.85,t));
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`);G(e,t,2);const a=M(`uniform vec3 uColor;varying float vFade;varying vec2 vUv;void main(){vec2 q=vUv*2.0-1.0;float w=0.045+(1.0-vUv.y)*0.25;float d=abs(q.x+q.y*0.32);float rim=(1.0-smoothstep(0.015,0.07,abs(d-w)))+(1.0-smoothstep(w*0.5,w,d))*0.18;rim*=sin(vUv.y*3.14159);vec3 c=uColor*1.8+vec3(.2);
          #if TOON == 1
            c=styleColor(uColor,.38+vUv.y*.42);rim=smoothstep(.12,.25,rim);
          #endif
          gl_FragColor=vec4(c,rim*vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime;varying float vFade;varying vec3 vN;varying vec2 vUv;
        void main(){vUv=uv;float t=max(0.0,uTime-0.09),a=seed.x*6.28318,flight=1.0-exp(-t*3.5);vec3 p=position*vec3(1.0,1.6,1.0)*(0.6+seed.z);
          float b=t*(2.0+seed.z*4.0)+a;mat2 rot=mat2(cos(b),-sin(b),sin(b),cos(b));p.xy=rot*p.xy;vec3 n=normal;n.xy=rot*n.xy;vN=normalMatrix*n;
          p+=vec3(cos(a)*flight*(0.4+seed.z*1.6),flight*(0.6+seed.y*2.2)-t*t*0.35,sin(a)*flight*(0.4+seed.z*1.6));p*=uSize;p.y-=1.25;vFade=smoothstep(0.04,0.16,uTime)*(1.0-smoothstep(0.55,1.65,uTime));gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1);ee(new X(.32,.32),36,.06,a,3)}const D=M(`uniform float uTime;uniform vec3 uColor;varying vec2 vUv;${C}
        void main(){vec2 p=vUv*2.0-1.0;float r=length(p),a=atan(p.y,p.x),t=uTime;float hot=exp(-r*r*25.0);float spokes=pow(abs(cos(a*3.0)),35.0)*exp(-r*6.0);float fade=smoothstep(0.0,0.035,t)*(1.0-smoothstep(0.1,0.42,t));vec3 c=uColor*1.9+vec3(hot);
          #if TOON == 1
            c=styleColor(uColor,.45+hot*.4);
          #endif
          gl_FragColor=vec4(c,(hot+spokes)*fade);${L}}`,`uniform float uTime;varying vec2 vUv;
        void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(0,-1.20+uSize*0.22,0,1);mv.xy+=position.xy*uSize*(0.4+min(uTime,0.4)*5.0)*length(modelMatrix[1].xyz);gl_Position=projectionMatrix*mv;}`);G(new X(2,2),D,4)}if(x===2){const D=[],i=[],d=[];for(let s=0;s<7;s++){const p=D.length/3;for(const[m,q]of[[0,0],[1,0],[0,1],[1,1]])D.push(m-.5,q-.5,s),i.push(m,q);d.push(p,p+1,p+2,p+2,p+1,p+3)}const y=new se;y.setAttribute("position",new U(D,3)),y.setAttribute("uv",new U(i,2)),y.setIndex(d);const e=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vFade,vSeed;varying vec3 vKeyLight;${C}${pe}${be}
        void main(){vec2 q=vUv*2.0-1.0;float turn=uTime*(.9+fract(vSeed*.37)) +vSeed*2.4;q=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*q;
          vec3 n=noiseGradient(q*2.6+vec2(vSeed*17.0,-uTime*.65));float d=length(q)+(n.x-.5)*.30;vec2 optics=smokeOptics(q,n.yz*2.6,n.x,vKeyLight);
          float a=(1.0-smoothstep(.68,.96,d))*smoothstep(.13,.40,n.x)*vFade;
          vec3 c=uColor*(.12+optics.x*.4);
          #if TOON == 1
            c=styleColor(uColor*.52,.16+optics.x*.55+n.x*.18);
          #endif
          gl_FragColor=vec4(c,a*.86);${L}
        }`,`uniform float uTime;varying vec2 vUv;varying float vFade,vSeed;varying vec3 vKeyLight;
        void main(){vUv=uv;float id=position.z;vSeed=id;float seed=fract(id*.618034),t=max(.0,uTime-seed*.14);
          float a=id*2.39996-t*.25,grow=1.0-exp(-t*6.0),roll=t*(1.5+seed*.4);
          float r=.16+grow*(1.05+seed*.45)+t*.28;
          vec3 p=vec3(cos(a)*r,-1.35+(sin(min(roll,3.14159))*.58+.08)*grow,sin(a)*r);p.y=-1.35+(p.y+1.35)*uSize;p.xz*=uSize;
          vec4 mv=modelViewMatrix*vec4(p,1.0);mv.xy+=position.xy*vec2(1.15+seed*.5,.85+seed*.3)*grow*(1.0+t*.25)*uSize*length(modelMatrix[1].xyz);
          vFade=smoothstep(.0,.08,t)*(1.0-smoothstep(.80+seed*.25,1.65+seed*.2,t));vKeyLight=normalize(mat3(viewMatrix)*vec3(-.45,.8,.55));gl_Position=projectionMatrix*mv;
        }`,{},!1),t=G(y,e,1);t.material.userData.ownLifecycle=!0;const a=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vFade;varying float vSeed;${C}
        void main(){vec2 q=vUv*2.0-1.0;float n=fbm(vec2(q.x*3.0+vSeed*15.0,q.y*4.0-uTime));float width=(0.3+vUv.y*0.5)*(0.55+n*0.6);float a=(1.0-smoothstep(width*0.5,width,abs(q.x)))*sin(vUv.y*PI)*smoothstep(0.22,0.62,n);vec3 c=uColor*(.13+n*.34);
          #if TOON == 1
            c=styleColor(uColor*.7,.20+n*.70);a=(1.0-smoothstep(width*.75,width,abs(q.x)))*sin(vUv.y*PI)*smoothstep(.22,.42,n);
          #endif
          gl_FragColor=vec4(c,a*vFade*.42);${L}}`,`attribute vec4 seed;uniform float uTime;varying vec2 vUv;varying float vFade;varying float vSeed;
        void main(){vUv=uv;vSeed=seed.w;float t=uTime,dt=max(0.0,t-seed.w*0.10),a=seed.x*6.28318;float rise=1.0-exp(-dt*8.0),h=uv.y;
          float r=h*rise*(0.35+seed.z*1.0)+dt*0.2;vec3 p=vec3(cos(a)*r,h*rise*(.7+seed.y*1.0)-h*dt*dt*0.75,sin(a)*r);
          p*=uSize;p.y-=1.34;vec4 mv=modelViewMatrix*vec4(p,1.0);mv.x+=position.x*(0.16+h*0.75)*rise*uSize*length(modelMatrix[1].xyz);
          vFade=smoothstep(0.01,0.10,dt)*(1.0-smoothstep(0.25+seed.y*0.15,1.2,dt));gl_Position=projectionMatrix*mv;}`,{},!1,{CLOUD:1});ee(new X(1,1,1,12),18,.045,a,2);const n=M(`uniform vec3 uColor;varying float vFade;varying vec3 vN;void main(){float l=0.3+max(0.0,dot(normalize(vN),normalize(vec3(-0.5,0.8,0.3))));vec3 c=uColor*l*.25;
          #if TOON == 1
            c=styleColor(uColor*.35,l*.65);
          #endif
          gl_FragColor=vec4(c,vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime;varying float vFade;varying vec3 vN;
        void main(){float t=uTime,a=seed.x*6.28318;vec3 p=position*vec3(1.3,0.4,0.8)*(0.4+seed.w);float spin=a+t*7.0;mat2 rot=mat2(cos(spin),-sin(spin),sin(spin),cos(spin));p.xy=rot*p.xy;vec3 n=normal;n.xy=rot*n.xy;vN=normalMatrix*n;
          p+=vec3(cos(a)*t*(0.8+seed.z),max(0.02,(1.8+seed.y*1.8)*t-3.0*t*t),sin(a)*t*(0.8+seed.z));p*=uSize;p.y-=1.35;vFade=smoothstep(0.0,0.05,t)*(1.0-smoothstep(0.55,1.5,t));gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1);ee(new nt(.075),28,.055,n,3)}if(x===3){const D=[],i=[],d=[],y=[];for(let a=0;a<18;a++){const n=a<9?a/9:(a-9+.5)/9,s=n*Math.PI*2,p=a===0?0:.25+a%3*.12,m=1.3+a%4*.35,q=[Math.cos(s)*p,0,Math.sin(s)*p],F=[[0,-.12,0],[.19,.4,0],[0,.4,.19],[-.19,.4,0],[0,.4,-.19],[Math.cos(s)*.35,m,Math.sin(s)*.35]];for(const I of[[0,2,1],[0,3,2],[0,4,3],[0,1,4],[5,1,2],[5,2,3],[5,3,4],[5,4,1]])for(const N of I)D.push(...F[N]),i.push(...q),d.push(n),y.push(a)}const e=new se;e.setAttribute("position",new U(D,3)),e.setAttribute("aCenter",new U(i,3)),e.setAttribute("aSeed",new U(d,1)),e.setAttribute("aUnit",new U(y,1)),e.computeVertexNormals();const t=M(`uniform vec3 uColor;uniform float uTime;varying vec3 vN;varying vec3 vCrystal;varying float vFade;${C}
        void main(){float light=0.3+max(dot(normalize(vN),normalize(vec3(-0.6,0.8,0.3))),0.0);
          float n=noise2(vCrystal.xy*8.0+vCrystal.z*5.0);float crack=1.0-smoothstep(0.03,0.12,abs(sin(vCrystal.y*17.0+vCrystal.x*23.0+n*4.0)));
          #if TOON == 1
            crack=1.0-smoothstep(.04,.13,abs(sin(vCrystal.y*7.0+vCrystal.x*9.0+n)));
          #endif
          float fracture=smoothstep(0.10,0.35,uTime)*crack;float dissolve=smoothstep(0.0,0.14,n-(uTime-0.8)*0.65);
          vec3 c=uColor*(0.3+light*0.6+fracture*0.8)+vec3(pow(light,6.0)*0.3);
#if TOON == 1
            c=styleColor(uColor,.14+light*.55+fracture*.22);
          #endif
          gl_FragColor=vec4(c,vFade*dissolve);${L}}`,`attribute vec3 aCenter;attribute float aSeed,aUnit;uniform float uTime,uQuantity;varying vec3 vN;varying vec3 vCrystal;varying float vFade;
        void main(){vCrystal=position;float t=uTime,growth=smoothstep(0.0,0.16,t),flight=max(0.0,t-0.24);vec3 p=position*growth*uSize;float a=aSeed*6.28318;float spin=flight*(aSeed-0.5)*2.0;mat2 rot=mat2(cos(spin),-sin(spin),sin(spin),cos(spin));p.xy=rot*p.xy;vec3 n=normal;n.xy=rot*n.xy;vN=normalMatrix*n;
          p+=aCenter+vec3(cos(a)*flight*1.5,-1.35+flight*(1.3+aSeed)-flight*flight*2.0,sin(a)*flight*1.5);vFade=(1.0-smoothstep(0.8,1.7,t))*step(aUnit,uQuantity-.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,{},!1);G(e,t,2).name="ice-shatter-crystals"}if(x===3){const D=M(`uniform vec3 uColor;varying float vFade;varying vec3 vN;void main(){float light=0.35+max(dot(normalize(vN),normalize(vec3(-0.6,0.8,0.4))),0.0);vec3 c=uColor*(.7+light);
        #if TOON == 1
          c=styleColor(uColor,light*.7);
        #endif
        gl_FragColor=vec4(c,vFade*uDetail);${L}}`,`
        attribute vec4 seed;uniform float uTime;varying float vFade;varying vec3 vN;
        void main(){float t=uTime,a=seed.x*6.28318;float dt=max(0.0,t-seed.w*0.1);float speed=0.5+seed.z*1.4;vec3 c=vec3(cos(a)*dt*speed,max(-1.32,-1.32+(2.0+seed.y*3.8)*dt-2.4*dt*dt),sin(a)*dt*speed);vec3 p=position;p.y*=2.2;float spin=a+t*2.0;mat2 rot=mat2(cos(spin),-sin(spin),sin(spin),cos(spin));p.xy=rot*p.xy;p*=0.6+seed.z;vN=normalMatrix*normal;vFade=pow(max(0.0,1.0-t/2.8),1.3);gl_Position=projectionMatrix*modelViewMatrix*vec4(c+p,1.0);}
      `,{},!1);ee(new qe(.12),Math.ceil(xe*.08),.08,D,2)}const h=[],g=[],l=[];for(let D=0;D<10;D++){const i=h.length/3;for(let d=0;d<=16;d++)for(let y=0;y<2;y++)h.push(y*2-1,d/16,D/10*2*Math.PI),g.push(y,d/16);for(let d=0;d<16;d++){const y=i+d*2;l.push(y,y+1,y+2,y+1,y+3,y+2)}}const u=new se;u.setAttribute("position",new U(h,3)),u.setAttribute("uv",new U(g,2)),u.setIndex(l);const P=M(`
      uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
      void main(){float t=uTime;float side=1.0-smoothstep(0.1,1.0,abs(vUv.x*2.0-1.0));float n=fbm(vec2(vUv.x*4.0,vUv.y*8.0-t*4.0));float mask=smoothstep(0.2,0.75,n+side*0.3);float life=smoothstep(0.0,0.1,t)*(1.0-smoothstep(0.15,0.75,t));vec3 c=uColor*1.5;
      #if TOON == 1
        c=styleHeat(uColor,.25+n*.6);mask=smoothstep(.32,.46,n+side*.3);
      #endif
      gl_FragColor=vec4(c,side*mask*life*(1.0-vUv.y)*0.6);${L}}
    `,`
      uniform float uTime;varying vec2 vUv;
      void main(){vUv=uv;float t=uTime,h=position.y,a=position.z;float growth=1.0-exp(-t*7.0);float height=2.0+sin(a*7.1)*0.7;float rad=h*growth*(0.55+sin(a*4.0)*0.18);vec3 p=vec3(cos(a)*rad,-1.35+h*height*growth,sin(a)*rad);float width=(1.0-h)*0.35*growth;p.xz+=vec2(-sin(a),cos(a))*position.x*width;p.y-=max(0.0,t-0.5)*h*0.6;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}
    `,{},x!==2);x===0?we(G(u,P,2),"xyz",-1.35):u.dispose();const V=M(`
      uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
      void main(){vec2 p=vUv*2.0-1.0;float r=length(p),t=uTime;float radius=(1.0-exp(-t*3.5))*0.82;float wave=exp(-pow((r-radius)*45.0,2.0));float dust=exp(-pow((r-radius+0.07)*14.0,2.0))*fbm(p*8.0)*0.45;float fade=pow(max(0.0,1.0-t/2.4),2.0);float alpha=(wave*0.7+dust)*fade;
        #if VARIANT == 0
          alpha*=0.22;
        #elif VARIANT == 1
          alpha*=0.18*(1.0-smoothstep(0.15,0.5,t));
        #elif VARIANT == 2
          float corrugation=noise2(p*14.0);float compress=pow(max(0.0,cos((r-radius)*110.0+corrugation*2.0)),12.0);
          float wake=exp(-pow((r-radius+0.055)*20.0,2.0));alpha=(wave*0.24+compress*wake*0.20)*fade*(1.0-smoothstep(0.4,1.1,t));
        #else
          float a=atan(p.y,p.x);alpha=(wave*0.35+band(r-radius*0.55,0.004)*step(0.1,cos(a*12.0)))*fade;
        #endif
        vec3 c=uColor*(.7+wave);
        #if TOON == 1
          c=styleColor(uColor,.35+wave*.5);
        #endif
        gl_FragColor=vec4(c,alpha);${L}}
    `),k=G(new X(7,7),V,2);k.rotation.x=-Math.PI/2,k.position.y=-1.36}if(E===4){const h=[],g=[],l=[],u=ne&&(x===2||x===3),P=ne?x===0?16:x===3?18:22:x===0?30:x===3?28:44,V=ne&&x===1;for(let s=0;s<(V?P*2:P);s++){const p=u&&x===3?18:V&&s>=P?20:V?1:ne?20:36,m=u&&x===3?5:V&&s>=P?6:V?1:ne?6:2,q=h.length/3;for(let F=0;F<=p;F++)for(let I=0;I<=m;I++)h.push(F/p,I/m*2-1,s),g.push(F/p,I/m);for(let F=0;F<p;F++)for(let I=0;I<m;I++){const N=m+1,O=q+F*N+I;l.push(O,O+1,O+N,O+1,O+N+1,O+N)}}const k=new se;k.setAttribute("position",new U(h,3)),k.setAttribute("uv",new U(g,2)),k.setIndex(l);const D=`uniform float uTime,uRetire,uOpening,uStoppedAt;varying float vVolume;varying vec2 vUv;varying float vLight;varying float vSeed;varying float vFade;varying float vHeight;${C}${pe}
      void main(){vUv=uv;vVolume=0.0;float s=position.x,id=position.z;
        #if TOON == 1 && (VARIANT == 1 || VARIANT == 2)
          vVolume=id<22.0?1.0:0.0;id=mod(id,22.0);
        #endif
        vSeed=id;float t=uStoppedAt<0.0?uTime:uStoppedAt+1.4*(uRetire-.35*uRetire*uRetire);
        float r1=hash(vec2(id,1.0)),r2=hash(vec2(id,3.0)),r3=hash(vec2(id,7.0));float phase=r1;
        #if TOON == 1 && (VARIANT == 1 || VARIANT == 2)
        if(vVolume>.5){ float born=fract(hash(vec2(id,23.7))+(uStoppedAt<0.0?uTime:uStoppedAt)*(.14+r2*.035));
          float h=born,spin=id*2.399963-uTime*(2.0+r2*.3)+h*3.0;
          float radius=.30+pow(h,1.3)*1.45+.22*(1.0-smoothstep(.05,.55,h));
          vec3 p=vec3(cos(spin)*radius,h*3.5,sin(spin)*radius);
          float release=smoothstep(r2*.16,.95,uRetire);
          #if VARIANT == 1
            p.y-=release*release*(1.7+h*2.4);p.xz*=1.0+release*.22;
          #else
            p.y+=release*(.8+h*.6);p.xz+=vec2(-sin(spin),cos(spin))*release*.6;
          #endif
          // 沙團先沿外側切線捲入，略早於主柱就位，避免懸浮外圈與中柱脫節。
          float gather=(1.0-smoothstep(.02,.78,uOpening))*(1.0-smoothstep(0.0,.6,uRetire));
          p.xz+=vec2(-sin(spin),cos(spin))*gather*(1.2+h*1.5);p.xz*=1.0+gather*.38;p.y+=gather*h*.35;
          p*=uSize;p.y-=1.4;
          float width=(.65+h*.75)*( .88+r3*.24)*(1.0+gather*.15);
          vec4 mv=modelViewMatrix*vec4(p,1.0);vec2 tangent=normalize((modelViewMatrix*vec4(-sin(spin),.48,cos(spin),0.0)).xy+vec2(.0001));
          mv.xy+=mat2(tangent.x,tangent.y,-tangent.y,tangent.x)*(uv-.5)*width*uSize*vec2(1.55,VARIANT==2?.40:.56)*length(modelMatrix[1].xyz);
          vLight=spin;vHeight=h;vFade=smoothstep(0.0,.12,uOpening)*smoothstep(.0,.09,h)*(1.0-smoothstep(.88,1.0,h))*(1.0-smoothstep(.72,1.0,uRetire));
          #if VARIANT == 1
            vFade*=smoothstep(-1.5,-1.12,p.y);
          #endif
          gl_Position=projectionMatrix*mv;return; }
        #endif
        #if VARIANT == 1 || VARIANT == 2
          float exitAge=smoothstep(.02+r2*.34,.92,uRetire);s=mix(s,.24+r3*.45,exitAge*(VARIANT==1?.24:.12));
        #endif
        float life=fract(r1+t*(0.065+r2*0.055));
        float h=0.025+life*0.77+s*(0.12+r3*0.23);
        #if TOON == 1
          // Adjacent sheets share a large eddy; unequal lengths keep their ends from lining up.
          float family=id,lane=0.0;
          phase=fract(id*.6180339);
          #if VARIANT != 0
            phase=hash(vec2(id,23.7));
          #endif
          life=fract(phase+(uStoppedAt<0.0?t:uStoppedAt)*(.072+hash(vec2(family,8.0))*.025));if(uStoppedAt>=0.0)life=min(1.0,life+uRetire*.27);
          h=.025+life*.68+s*(.18+r3*.13);
          #if VARIANT != 0
            life=fract(phase+(uStoppedAt<0.0?t:uStoppedAt)*(.10+r2*.025));
            h=.02+life*.52+s*(.27+r3*.21);
            if(mod(id,5.0)<.5)h=.025+s*.40;
          #endif
        #endif
        float lean=sin(h*3.0+t*0.45)*h*0.22;
        #if TOON == 1 && VARIANT == 3
          s=mix(s,.2+r2*.5,smoothstep(.02+r3*.12,.85,uRetire)*.80);
        #endif
        float pitch=1.2+r2*3.1;
        float a=r3*PI*2.0+s*pitch-t*(2.0+r2*0.65)+sin(s*5.0+t*0.7+id)*0.18;
        #if TOON == 1
          // Keep azimuth separate from lifetime phase: adding both golden angles collapses every start onto the same side.
          a=family*2.39996323+s*(3.5+r2*1.2)-t*(2.05+phase*.2)+lane*.16;
          a+=sin(h*5.0-t*.65)*.28+sin(s*PI)*sin(s*4.0-t*.8+phase*6.28)*.22;
          #if VARIANT == 1 || VARIANT == 2
            a-=exitAge*(.2+r3*1.3);
          #endif
        #endif
        float taper=pow(max(0.0,sin(s*PI)),0.55+r2*0.8);
        float width=(0.045+h*(0.10+r1*0.17))*taper;
        if(mod(id,6.0)<0.5)width*=1.8;
        #if TOON == 1
          width*=1.8+(.5+.5*sin(id*2.3))*.25;
          #if VARIANT != 0
            width+=.08*taper*(1.0-h*.6);
          #endif
        #endif
        #if VARIANT == 0
          width*=0.75;
        #elif VARIANT == 1
          width*=1.2;
        #elif VARIANT == 3
          width*=0.65;a+=sin(s*9.0+id)*0.12;
        #endif
        float tear=(sin(s*47.0+t*3.0+id)*0.022+sin(s*97.0-t*4.0)*0.008)*taper;
        float curl=sin(s*PI)*sin(s*6.0+t*0.8+id)*0.15;
        float y=h*3.55+curl+position.y*(width+tear*abs(position.y));
        float radius=(0.08+pow(h,1.35)*1.2+pow(h,4.0)*0.65)*(0.72+r3*0.40);
        radius+=sin(s*9.0-t*0.9+id)*0.07*h+position.y*width*0.4;
        #if TOON == 1
          radius+=.22*(1.0-smoothstep(.08,.55,h));
          #if VARIANT != 0
            radius-=pow(h,4.0)*.25;
            radius+=sin(h*5.0-t*.9+id*.6)*.10*sin(s*PI);
          #endif
          // Roll each cross-section into an open crescent, instead of a flat strip.
          float roll=sin(h*4.5-t*.9+phase*2.0)*.65+sin(s*PI)*.5;
          #if VARIANT == 1 || VARIANT == 2
            roll+=exitAge*(1.8+r3)*sin(s*PI);
          #endif
          float across=position.y*1.9+roll;
          float center=cos(roll),edge=cos(across);
          radius+=(edge-center)*width*.95+sin(h*7.0-t*.8)*.08*sin(s*PI);
          #if VARIANT == 1 || VARIANT == 2
            float roundExit=smoothstep(.04,.55,uRetire);
            radius=mix(radius,radius-(edge-center)*width*.95+cos(position.y*PI+roll)*width*.7,roundExit);
          #endif
          y=h*3.55+curl+(sin(across)-sin(roll))*width*1.3;
          #if VARIANT == 1 || VARIANT == 2
            y=mix(y,h*3.55+curl+sin(position.y*PI+roll)*width*.7,roundExit);
          #endif
          y+=sin(h*4.0-t*.9+phase*2.0)*.10*sin(s*PI);
          #if VARIANT == 3
            radius+=(cos(position.y*PI)-1.0)*width*.42;
            y=h*3.55+curl+sin(position.y*PI)*width*.42;
          #endif
          a+=lane*.035*(1.0-smoothstep(.4,1.0,h));
        #endif
        vec3 p=vec3(cos(a)*radius+lean,y,sin(a)*radius);
        p.z+=sin(h*4.0+t*0.31)*h*0.10;
        vec3 eddy=curlFlow(p*1.1,t);
        p+=eddy*(0.07+h*0.12);
        vLight=clamp(0.5+0.5*sin(a-0.8)+eddy.y*0.12,0.0,1.0);
        #if TOON == 1
          vec3 surfaceNormal=vec3(cos(a)*cos(across),-sin(across),sin(a)*cos(across));
          vLight=clamp(.45+dot(surfaceNormal,vec3(-.38,.58,.72))*.52+eddy.y*.08,0.0,1.0);
        #endif
        float peel=smoothstep(phase*.09,.85,uRetire);vec2 tangent=vec2(-sin(a),cos(a));
        #if VARIANT == 1 || VARIANT == 2
          p.xz+=tangent*exitAge*(.12+r2*.32);
        #else
          p.xz+=tangent*peel*(.8+h*1.15);p.xz*=1.0+peel*.38;p.y+=peel*h*.35;
        #endif
        #if VARIANT == 1
          float collapse=exitAge;
          float sag=smoothstep(.0,.7,collapse)*(.35+.65*pow(s,1.5));
          p.y-=collapse*collapse*(2.4+r3*2.4)+sag*width;
          p.xz*=1.0+collapse*.12;p.y-=position.y*width*collapse*.5;
        #elif VARIANT == 2
          p.y+=exitAge*(.85+phase*.9);p.xz*=1.0+exitAge*.12;
        #endif
        vHeight=h;float gather=(1.0-smoothstep(.04,1.0,uOpening))*(1.0-smoothstep(0.0,.6,uRetire));
        // 重用收尾的切向鬆散形態，從外圍捲回；旋轉時間繼續向前，不倒播。
        p.xz+=tangent*gather*(.8+h*1.15);p.xz*=1.0+gather*.38;p.y+=gather*h*.35;
        p*=uSize;p.y-=1.4;
        vFade=smoothstep(0.0,.12,uOpening)*smoothstep(0.0,0.10,life)*(1.0-smoothstep(0.85,1.0,life));vFade*=1.0-smoothstep(.48+phase*.18,.88+phase*.1,uRetire);
        #if VARIANT == 1
          vFade*=smoothstep(-1.4,-1.1,p.y);
        #endif
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,i=`uniform vec3 uColor;uniform float uTime,uRetire,uOpening;uniform float uGlow;varying float vVolume;varying vec2 vUv;varying float vLight;varying float vSeed;varying float vFade;varying float vHeight;${C}${pe}${be}${Se}
      void main(){
        #if TOON == 1 && (VARIANT == 1 || VARIANT == 2)
        if(vVolume>.5){ vec2 q=vUv*2.0-1.0;float spin=-uTime*.8+vSeed*.7;q=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*q;
          vec3 n=noiseGradient(q*2.4+vec2(vSeed*9.0,-uTime*.45));float d=length(q)+(n.x-.5)*.35;
          vec3 key=vec3(-.45,.8,.55);vec2 optics=smokeOptics(q,n.yz*2.4,n.x,key);
          float a=(1.0-smoothstep(.73,.98,d))*smoothstep(.02,.18,n.x+(1.0-d)*.3)*vFade;
          vec3 c=styleColor(uColor*.8,.20+optics.x*.44+n.x*.10);
          #if VARIANT == 2
            float burn=smoothstep(.08,.95,uRetire),heat=.16+optics.x*.15+n.x*.20+pow(max(0.0,1.0-abs(q.y)),1.4)*.43;
            a*=smoothstep(.10+burn*.50,.23+burn*.48,n.x+(1.0-d)*.35);
            c=styleHeat(uColor,heat);c=mix(c,uColor*vec3(.26,.075,.03),burn*.65);
          #endif
          a*=VARIANT==2?.46:.42;if(a<.004)discard;gl_FragColor=vec4(c,a);${L}return; }
        #endif
        float s=vUv.x,w=vUv.y;
        vec2 skew=vec2(s+w*0.28,w+s*0.16);
        float warp=noise2(skew*vec2(8.0,3.0)+vec2(-uTime*0.55,vSeed*2.3));
        #if TOON == 1
          float family=vSeed;
          float n=noise2(vec2(s*7.0-uTime*.95,w*2.1+family*3.7+warp*.6));
        #else
          float n=fbm(vec2(s*25.0-uTime*(1.2+fract(vSeed*0.13)),w*5.0+vSeed*3.7+warp*1.5));
        #endif
        float fiber=noise2(vec2(s*10.0-uTime*2.0,w*31.0+vSeed));
        float rim=abs(w*2.0-1.0);
        float silhouette=1.0-smoothstep(0.56+n*0.3,0.72+n*0.28,rim);
        float split=smoothstep(0.20,0.46,n+sin(w*29.0+s*7.0)*0.09);
        #if TOON == 1
          split=smoothstep(.18,.36,n);
          #if VARIANT == 1
            split=smoothstep(.28,.47,n);
          #endif
        #endif
        float tip=smoothstep(0.0,0.04,s)*(1.0-smoothstep(0.80,1.0,s));
        float departure=smoothstep(uRetire*.85-.15,uRetire*.85+.08,n*.55+(1.0-s)*.45);float alpha=silhouette*split*tip*vFade*departure;
        #if VARIANT == 2
          float delay=fract(vSeed*.381966)*.24+vHeight*.16;
          float exitBurn=smoothstep(.04+delay,.80+delay*.25,uRetire);
          float flameFront=n*.60+sin(s*PI)*.4-exitBurn*.82;alpha*=smoothstep(-.03,.10,flameFront);
          alpha*=1.0-smoothstep(.60,.95,uRetire+fract(vSeed*.23)*.15);
        #elif VARIANT == 1
          float grain=noise2(vec2(s*21.0,w*34.0-uTime*2.0+vSeed));
          alpha*=mix(1.0,smoothstep(.18,.40,grain),smoothstep(.10,.55,uRetire));
          alpha*=smoothstep(uRetire*.55-.08,uRetire*.55+.12,n);
        #endif
        float crest=exp(-pow((w-0.68-(n-0.5)*0.32)*18.0,2.0));
        float streak=pow(max(0.0,sin(w*48.0+n*6.0+s*3.0)),16.0);
        vec3 c;float lum=0.25+vLight*0.75;
        #if VARIANT == 0
          c=uColor*(0.12+lum*0.6+crest*0.8);alpha*=0.6;
        #elif VARIANT == 1
          c=uColor*(0.09+lum*0.4+fiber*0.13);alpha*=0.85;
        #elif VARIANT == 2
          #if TOON == 1
            float fireNoise=noise2(vec2(w*4.0+vSeed,s*11.0-uTime*2.4));
            vec3 burn=vec3(smoothstep(.20,.40,fireNoise),fireNoise,styleStep(.68,fireNoise)*.5);
          #else
            vec3 burn=flameErosion(vec2(w,s*2.0),uTime*1.3,vSeed*0.37);
          #endif
          alpha*=burn.x;
          c=flameColor(uColor,burn.y*0.90+lum*0.08)*(0.40+lum*0.6);
          if(!gl_FrontFacing)c*=0.38;
          c+=uColor*burn.z*0.55;
          crest=max(crest*0.45,burn.z*0.7);
        #else
          float gaps=step(0.12,fract(s*7.0+vSeed*0.3));
          #if TOON == 0
            alpha*=gaps;
          #endif
          c=uColor*(0.1+lum*0.7+crest*1.2);
        #endif
        #if TOON == 1
          c=styleColor(uColor,.15+vLight*.6+n*.18+crest*.16);
          #if VARIANT == 1
            c=styleColor(uColor*.82,.20+vLight*.37+n*.12+crest*.08);
          #elif VARIANT == 2
            float warmth=.19+vLight*.32+n*.33+crest*.11;
            c=styleHeat(uColor,warmth);if(!gl_FrontFacing)c*=.70;
          #elif VARIANT == 3
            float packet=pow(max(0.0,sin(s*12.0-uTime*4.5+vSeed*1.3)),6.0);
            c=styleColor(uColor,.20+vLight*.36+packet*.33+crest*.12);
          #endif
        #endif
        if(uGlow>0.5){
          alpha*=crest*(0.25+lum*0.75)+streak*0.10;
          if(!gl_FrontFacing)alpha*=0.3;
          #if VARIANT == 1
            alpha*=0.12;
          #elif VARIANT == 0
            alpha*=0.35;
          #endif
          c=uColor*1.7+vec3(0.3,0.19,0.07)*crest;alpha*=uDetail*0.8;
        }
        #if TOON == 1
          if(uGlow>.5){c=styleColor(uColor,.82);alpha*=.28;}
          // In-material contour ink: screen-space width, no outline mesh or full-screen pass.
          float contour=.65+n*.28-rim;
          contour=min(contour,min(s*5.0,(1.0-s)*2.0));
          float pixel=max(fwidth(contour),.002);
          float ink=1.0-smoothstep(pixel*.5,pixel*1.9,contour);
          float edgeCoverage=smoothstep(-pixel,pixel,contour);
          alpha*=edgeCoverage;
          vec3 inkColor=mix(vec3(.012,.016,.022),uColor*.055,.65);
          c=mix(c,inkColor,ink*(VARIANT==0?.55:.25)*(1.0-uRetire*.7));
          #if VARIANT == 2
            c=mix(c,uColor*vec3(.22,.045,.012),smoothstep(.35,.9,uRetire)*.82);
          #endif
        #endif
        #if TOON == 1 && (VARIANT == 1 || VARIANT == 2)
          alpha*=VARIANT==2?.90:.62;
        #endif
        #if TOON == 1 && VARIANT == 3
          // 亮紋沿捲曲表面的縱向傳遞，避免插值光量跨三角形形成大片亮折面。
          float track=.49+.15*sin(s*5.0-uTime*.6+vSeed*1.3);
          float stripe=1.0-smoothstep(.035,.15,abs(w-track));
          float chargePhase=fract(s*2.4-uTime*.8+vSeed*.23);
          float pulse=smoothstep(.05,.24,chargePhase)*(1.0-smoothstep(.68,.94,chargePhase));
          float light=.29+vLight*.13+stripe*(.24+pulse*.33);
          c=styleColor(uColor,light);
          float cut=smoothstep(.08,.8,uRetire);float islands=smoothstep(.15+cut*.40,.27+cut*.42,noise2(vec2(s*9.0-uTime*.6,vSeed*2.7)));
          alpha=silhouette*split*tip*vFade*departure*(.84+stripe*.10)*islands;
        #endif
        gl_FragColor=vec4(c,alpha);${L}}`,d=u?D.replaceAll("VARIANT","FLOW_VARIANT").replace("width*=0.75;",x===2?"width*=1.10;":"width*=1.23;").replace("vHeight=h;float gather=","p.xz*=1.20;p.y*=1.08;vHeight=h;float gather="):D,y=G(k,M(i,d,{uGlow:{value:0},uRetire:z.uLifeEnd,uOpening:z.uLifeStart,uStoppedAt:z.uStopTime},!1,u?{FLOW_VARIANT:0}:{}),2);y.name="vortex-column",y.material.userData.ownLifecycle=!0,ne||G(k.clone(),M(i,D,{uGlow:{value:1},uRetire:z.uLifeEnd,uOpening:z.uLifeStart,uStoppedAt:z.uStopTime}),3);const e=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;varying float vSeed;varying float vFade;varying float vInner;varying vec3 vKeyLight;${C}${pe}${be}
      void main(){vec2 q=vUv*2.0-1.0;vec2 original=q;float spin=vSeed*6.28-uTime*(0.4+vSeed*0.3);
        q=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*q;
        vec3 broad=noiseGradient(q*2.8+vec2(vSeed*27.0,-uTime*0.25));
        #if TOON == 1
          vec3 fine=broad;
        #else
          vec3 fine=noiseGradient(q*6.1+vec2(vSeed*11.0,-uTime*0.5));
        #endif
        float n=broad.x*0.72+fine.x*0.28;
        vec2 gradient=mat2(cos(spin),sin(spin),-sin(spin),cos(spin))*(broad.yz*2.8*0.72+fine.yz*6.1*0.28);
        float d=length(q)+(n-0.5)*0.45;
        vec2 optics=smokeOptics(original,gradient,n,vKeyLight);
        float a=(1.0-smoothstep(0.30,1.0,d))*smoothstep(0.15,0.65,n)*optics.y*vFade*1.35;
        vec3 c=uColor*(0.05+optics.x*0.6);
        #if VARIANT == 2
          float illumination=vInner*(0.3+max(0.0,-original.y)*0.7);
          c=vec3(0.028,0.025,0.023)*(0.4+optics.x)+uColor*illumination*(0.2+optics.y*0.45);
        #elif VARIANT == 3
          c+=uColor*vInner*0.13;a*=0.45;
        #endif
        #if TOON == 1
          c=styleColor(uColor*.48,.16+optics.x*.60+n*.2);
          #if VARIANT == 2
            c=mix(styleColor(vec3(.12,.09,.065),optics.x),styleHeat(uColor,.35+vInner*.4)*.48,vInner*.7);
          #elif VARIANT == 3
            c=styleColor(uColor*.55,.18+optics.x*.6+vInner*.2);
          #endif
          a=(1.0-smoothstep(.62,.94,d))*smoothstep(.20,.40,n)*vFade*.80;
          #if VARIANT != 0
            a=(1.0-smoothstep(.70,.98,d))*smoothstep(.05,.22,n+(1.0-d)*.25)*vFade*.73;
          #endif
          #if VARIANT == 3
            a*=.45;
          #endif
        #endif
        gl_FragColor=vec4(c,a*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime,uStopTime;varying vec2 vUv;varying float vSeed;varying float vFade;varying float vInner;varying vec3 vKeyLight;${C}${pe}
      void main(){vUv=uv;vSeed=seed.w;vKeyLight=normalize(mat3(viewMatrix)*vec3(-0.45,0.8,0.55));
        float rate=.15+seed.w*.08;float life=uStopTime<0.0?fract(seed.y+uTime*rate):min(1.0,fract(seed.y+uStopTime*rate)+(uTime-uStopTime)*.55),a=seed.x*6.28318-uTime*1.2-life*3.0;
        float roll=life*6.28318+seed.z*3.14159;
        float r=(2.2-life*1.7)*(0.7+seed.z*0.5)+cos(roll)*(0.16+seed.w*0.18);
        #if TOON == 1
          r*=1.25;
        #endif
        float lift=(0.22+sin(roll)*0.20)*sin(life*3.14159)+life*life*(0.7+seed.z*0.9);
        vec3 p=vec3(cos(a)*r,lift,sin(a)*r);p+=curlFlow(p*1.1,uTime)*0.17*sin(life*3.14159);p.y-=1.36;
        vInner=exp(-r*r*0.7)*(1.0-life*0.4);
        vec4 mv=modelViewMatrix*vec4(p,1.0);float size=(0.60+sin(life*3.14159)*0.65)*(0.8+seed.w*0.4);
        mv.xy+=position.xy*size*vec2(1.25,1.05)*length(modelMatrix[1].xyz);vFade=sin(life*3.14159)*0.85;
        #if VARIANT == 0
          vFade*=0.55;
        #endif
        gl_Position=projectionMatrix*mv;}`,{},!1,{CLOUD:1});ee(new X(1,1),96,.16,e,1);const t=M(`uniform vec3 uColor;varying vec2 vUv;varying float vFade;${C}
      void main(){vec2 q=vUv*2.0-1.0;float a=1.0-smoothstep(0.65,0.95,abs(q.y)+q.x*q.x);vec3 c=uColor*(0.20+vUv.y*0.30);
        #if VARIANT == 0
          c=mix(vec3(0.08,0.12,0.04),uColor*0.45,vUv.y);a*=step(abs(q.y),0.7*(1.0-q.x*q.x));
        #elif VARIANT == 1
          a=step(abs(q.x)+abs(q.y)*0.7,0.9);c=uColor*(0.12+step(q.y,0.0)*0.18);
        #elif VARIANT == 2
          c=mix(uColor*0.04,uColor*2.5+vec3(0.35),pow(vUv.y,6.0));
        #else
          a=band(abs(q.x)+abs(q.y)-0.65,0.09);c=uColor*1.8;
        #endif
        #if TOON == 1
          c=styleColor(uColor*.65,.2+vUv.y*.65);
          #if VARIANT == 0
            c=styleColor(mix(vec3(.2,.3,.08),uColor,.4),.22+vUv.y*.6);
          #elif VARIANT == 2
            c=styleHeat(uColor,.16+vUv.y*.75);
          #elif VARIANT == 3
            c=styleColor(uColor,.8);
          #endif
        #endif
        gl_FragColor=vec4(c,a*vFade*uDetail);${L}}`,`attribute vec4 seed;uniform float uTime,uStopTime;varying vec2 vUv;varying float vFade;
      void main(){vUv=uv;float life=uStopTime<0.0?fract(seed.y+uTime*.16):min(1.0,fract(seed.y+uStopTime*.16)+(uTime-uStopTime)*.6),a=seed.x*6.28318-uTime*2.4,r=0.25+life*1.9;

        #if TOON == 1
          r+=.22*(1.0-smoothstep(.08,.55,life));
        #endif
        vec3 p=vec3(cos(a)*r,-1.25+life*3.1,sin(a)*r);vec4 mv=modelViewMatrix*vec4(p,1.0);
        float spin=a+uTime;mat2 rot=mat2(cos(spin),-sin(spin),sin(spin),cos(spin));vec2 card=position.xy;
        #if VARIANT == 0
          card*=vec2(1.0,0.45);
        #elif VARIANT == 1
          card*=0.5;
        #elif VARIANT == 2
          card*=vec2(0.4,1.4);
        #endif
        mv.xy+=rot*card*(VARIANT==3?(.14+seed.w*.15):(.08+seed.w*.13))*length(modelMatrix[1].xyz);vFade=sin(life*3.14159);gl_Position=projectionMatrix*mv;}`,{},!1);ee(new X(1,1),40,.055,t,4);const a=M(`uniform vec3 uColor;uniform float uTime;varying vec2 vUv;${C}
      void main(){vec2 p=vUv*2.0-1.0;float r=length(p),a=atan(p.y,p.x);float turn=a-uTime*1.7+r*4.0;vec2 polar=vec2(cos(turn),sin(turn));
        float broad=noise2(polar*(2.0+r*3.0)+vec2(r*4.0,uTime*0.2));
        float detail=noise2(vec2(cos(a-uTime*2.4+r*7.0),sin(a-uTime*2.4+r*7.0))*(5.0+r*7.0));
        float mask=exp(-pow((r-0.42)*4.0,2.0))*smoothstep(0.18,0.50,broad*detail);vec3 c=uColor*.06;
        #if TOON == 1
          c=styleColor(uColor*.12,.18+broad*.65);
        #endif
        gl_FragColor=vec4(c,mask*.30);${L}}`,Ae,{},!1),n=G(new X(ne?7.25:5.8,ne?7.25:5.8),a,0);n.rotation.x=-Math.PI/2,n.position.y=-1.38}}let he=null,Ne=null;function Xe(){if(E!==0)return;const o=[],w=[],h=[],g=[],l=[];function u(i,d,y,e,t){const a=o.length/3;for(let n=0;n<=i;n++)for(let s=0;s<=d;s++){const p=t(s/d,n/i);o.push(...p),w.push(...e),h.push(y),l.push(s/d,n/i)}for(let n=0;n<i;n++)for(let s=0;s<d;s++){const p=a+n*(d+1)+s,m=p+d+1;g.push(p,m,p+1,m,m+1,p+1)}}function P(i,d,y,e){const t=new ie(.25+Math.sin(d*2.4)*.45,Math.cos(d*2.39996),Math.sin(d*2.39996)).normalize(),a=new We().setFromUnitVectors(ye,t);function n(s){return new ie(...s).sub(new ie(...i)).applyQuaternion(a).add(new ie(...i)).toArray()}u(1,4,d,i,(s,p)=>{const m=s*Math.PI*2;return n([i[0]+(p?y:0),i[1]+(p?0:Math.cos(m)*e),i[2]+(p?0:Math.sin(m)*e)])}),u(1,4,d,i,(s,p)=>{const m=s*Math.PI*2;return n([i[0]-(p?e:0),i[1]+(p?0:Math.cos(m)*e),i[2]+(p?0:Math.sin(m)*e)])})}if(x===0)for(let i=0;i<12;i++)u(1,1,i,[0,0,0],(d,y)=>[d-.5,y-.5,0]);else if(x===1)for(let i=0;i<12;i++){const d=i*2.39996,y=.6+i%4*.18;u(7,3,i,[0,0,0],(e,t)=>{const a=Math.round(t*7),n=Math.sin(a*17+i*3)*.14,s=d+n,p=t*y,m=(i%3===0?.052:.026)*(1-t*.7),q=e*Math.PI*2;return[.04+t*(.25+i%5*.27)+Math.cos(q)*m,Math.cos(s)*p+Math.sin(q)*m,Math.sin(s)*p+Math.sin(t*9+i)*.06]})}else if(x===2)for(let i=0;i<13;i++){const d=i*2.39996,y=.15+i*7%13/13*.45;P([.08+i*5%13/13*.7,Math.cos(d)*y,Math.sin(d)*y],i,.28+i%4*.12,.09+i%3*.018)}else if(x===3)for(let i=0;i<7;i++){const d=i*2.39996,y=.3+i%3*.13,e=[i%3*.33,Math.cos(d)*y,Math.sin(d)*y],t=new We().setFromEuler(new ut(i*.63,i*.77,i*.4)),a=[[[-.15,-.2],[-.15,.2]],[[-.15,.12],[.13,-.02]],[[-.15,-.08],[.1,-.2]]];i%2===0&&a.push([[.1,-.2],[.1,.12]]);for(const[n,s]of a)u(1,1,i,e,(p,m)=>{const q=n[0]+(s[0]-n[0])*p+(m-.5)*.025,F=n[1]+(s[1]-n[1])*p;return new ie(0,q,F).applyQuaternion(t).add(new ie(...e)).toArray()});P(e,i,.11,.055)}else if(x===4)for(let i=0;i<7;i++)u(3,8,i,[.08+i%3*.22,Math.cos(i*.897)*.5,Math.sin(i*.897)*.5],(d,y)=>{const e=i*.897+d*.63,t=.48+y*.18;return[.08+i%3*.22+Math.sin(y*3.14159)*.13+Math.sin(e*2+i)*.12,Math.cos(e)*t,Math.sin(e)*t]});else if(x===5)for(let i=0;i<3;i++)u(4,24,i,[0,0,0],(d,y)=>{const e=(d-.5)*1.8+i*.25,t=.55+i*.16+y*.16*Math.sin(d*Math.PI);return[(i-1)*.24+d*.65+y*.09,Math.cos(e)*t-.6,Math.sin(e)*t]});else for(let i=0;i<8;i++)u(4,12,i,[0,0,0],(d,y)=>[d,y,i]);const V=new se;V.setAttribute("position",new U(o,3)),V.setAttribute("uv",new U(l,2)),V.setAttribute("aCenter",new U(w,3)),V.setAttribute("aPart",new U(h,1)),V.setIndex(g),V.computeVertexNormals();const k=`attribute vec3 aCenter;attribute float aPart;uniform float uLifeEnd,uLifeOrigin;varying vec3 vP;varying vec3 vImpactNormal;varying vec2 vFlow;varying float vPart;
      #if VARIANT == 0
      uniform vec3 uImpactUp;
      #endif
      void main(){vFlow=uv;vImpactNormal=normal;float t=uLifeEnd;float open=1.0-exp(-t*7.0);vec3 p=position;vPart=aPart;
        #if VARIANT == 0
          float seed=fract(sin(aPart*17.13+2.8)*4375.3),level=fract(aPart*.381966),age=max(0.0,t-aPart*.006);
          float grow=1.0-exp(-age*12.0),spin=aPart*2.399963+age*(1.7+seed);
          vec3 up=normalize(uImpactUp),depth=vec3(1,0,0)-up*up.x;
          if(dot(depth,depth)<.01)depth=vec3(0,0,1)-up*up.z;
          depth=normalize(depth);vec3 across=cross(depth,up);
          // Spherical emission from the contact point; buoyancy follows the radial impulse.
          float vertical=1.0-2.0*(aPart+.5)/12.0;
          float ring=sqrt(max(0.0,1.0-vertical*vertical));
          vec3 direction=up*vertical+depth*cos(spin)*ring+across*sin(spin)*ring;
          float radial=grow*(.67+seed*.26)+age*.12;
          vec3 center=direction*radial+up*smoothstep(.30,.95,age)*.32;
          center*=uSize*(.35+.65*uLifeOrigin);
          vec4 mv=modelViewMatrix*vec4(center,1.0);
          float width=(.20+grow*.95)*(.85+seed*.25)*(1.0-smoothstep(.65,1.0,age)*.22);
          mv.xy+=(uv-.5)*vec2(width,width*(1.05+level*.2))*uSize*(.35+.65*uLifeOrigin)*length(modelMatrix[1].xyz);
          vImpactNormal=normalize(mat3(viewMatrix)*vec3(-.45,.8,.55));vP=center;gl_Position=projectionMatrix*mv;return;
        #elif VARIANT == 1
          p*=.12+open*1.35;p.x+=sin(floor(t*22.0)+aPart*3.0)*.035;
        #elif VARIANT == 2 || VARIANT == 4
          p-=aCenter;float spin=t*(1.5+mod(aPart,3.0));p.yz=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*p.yz;
          p.xz=mat2(cos(spin*.7),-sin(spin*.7),sin(spin*.7),cos(spin*.7))*p.xz;p+=aCenter*(.25+open*2.0);p.x+=t*(.2+mod(aPart,4.0)*.25);p.y-=t*t*.7;
        #elif VARIANT == 3
          p-=aCenter;p*=.25+sin(t*3.14159)*.8;p+=aCenter*(.2+open*2.0);p.x+=t*.5;
        #elif VARIANT == 5
          float spin=t*1.4;p.yz=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*p.yz;p*=.35+open*1.1;p.x+=t*1.3;p.z+=(t-.35)*(1.1+aPart*.3);
        #else
          float age=max(0.0,t-aPart*.025),h=uv.x,spin=aPart*2.399963-age*(4.0+mod(aPart,3.0))+h*2.7;
          float pulse=sin(h*3.14159265),head=age*(3.4+mod(aPart,3.0)*.35);
          float radius=(.05+age*.95)*(.5+pulse*.5)*( .7+mod(aPart,3.0)*.17);
          float width=(.015+pulse*.07)*(1.0-smoothstep(.45,.95,age)),tube=uv.y*6.2831853;
          p=vec3(.04+head+h*(.35+age*.7)+cos(tube)*width,cos(spin)*(radius+sin(tube)*width),sin(spin)*(radius+sin(tube)*width));
        #endif
        p*=uSize*(.35+.65*uLifeOrigin);vP=p;
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
      }`,D=`uniform vec3 uColor;uniform float uLifeEnd;varying vec3 vP;varying vec3 vImpactNormal;varying vec2 vFlow;varying float vPart;${C}${pe}${be}${J}
      void main(){float t=uLifeEnd;float fade=smoothstep(.0,.07,t)*(1.0-smoothstep(.52,1.0,t));
        vec3 n=normalize(cross(dFdx(vP),dFdy(vP)));

        float light=.35+abs(dot(n,normalize(vec3(.7,1,.5))))*.45;float mask=1.0;
        #if VARIANT == 0
          vec2 q=vFlow*2.0-1.0;float age=max(0.0,t-vPart*.006),seed=fract(vPart*.618034);
          float turn=age*(1.7+seed)+vPart*2.4;
          q=mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*q;
          vec3 density=noiseGradient(q*3.2+vec2(seed*17.0,-age*2.3));
          float fine=noise2(q*7.0+density.x*1.4+seed*13.0);
          float n0=density.x*.76+fine*.24,d=length(q)+(n0-.5)*.35;
          vec2 optics=smokeOptics(q,density.yz*3.2,n0,vImpactNormal);
          float burnout=smoothstep(.40+seed*.12,.96,age);
          mask=(1.0-smoothstep(.79,.94,d))*smoothstep(.18+burnout*.55,.40+burnout*.5,n0+(1.0-d)*.50);
          light=.20+n0*.55+(1.0-d)*.15+optics.x*.16-age*.13;
          fade=smoothstep(.0,.055,age)*(1.0-smoothstep(.65+seed*.08,.97,age))*.82;
        #elif VARIANT == 1
          float charge=.5+.5*sin(vPart*4.7+floor(t*16.0)*2.1);mask=mix(.2,1.0,smoothstep(.15,.45,charge));mask*=1.0-smoothstep(.35+mod(vPart,3.0)*.13,.6+mod(vPart,3.0)*.13,t);light=mod(vPart,3.0)<.5?.82:.57;
        #elif VARIANT == 3
          mask=1.0-smoothstep(.5,.9,t+vPart*.025);light=.65;
        #elif VARIANT == 5
          mask=1.0-smoothstep(.22,.85,t+vPart*.09);light=.2+light*.55;
        #elif VARIANT == 6
          float flow=noise2(vec2(vFlow.x*8.0-t*5.0,vPart*2.3));mask=smoothstep(t*.6-.15,t*.6+.10,flow)*sin(vFlow.x*PI);fade*=1.0-smoothstep(.45,.96,t+vPart*.018);light=.35+.35*abs(dot(n,normalize(vec3(.4,.8,.5))))+.16*pow(vFlow.x,.6);
        #endif
        if(mask*fade<.006)discard;
        vec3 c=toonShade(uColor,light);
        #if VARIANT == 0
          c=mix(uColor*vec3(.50,.18,.07),uColor*1.08,toonStep(.46,light));c=mix(c,vec3(1.0,.92,.58),toonStep(.68,light));
        #endif
        gl_FragColor=vec4(c,mask*fade);${L}
      }`;he=G(V,M(D,k,{uImpactUp:{value:new ie(0,1,0)}},!1),5),x===0&&(he.material.depthWrite=!1),he.name="lifecycle-impact",he.visible=!1,Ne=G(new X(1.8,1.8),M(`uniform vec3 uColor;uniform float uLifeEnd;varying vec2 vUv;
      void main(){vec2 q=vUv*2.0-1.0;float t=uLifeEnd;float a=exp(-dot(q,q)*5.5)*(1.0-smoothstep(.0,.28,t))*smoothstep(.0,.025,t)*.24;
        gl_FragColor=vec4(uColor,a);${L}}`,`uniform float uLifeEnd;varying vec2 vUv;
      void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(0,0,0,1);mv.xy+=position.xy*uSize*(.5+uLifeEnd*2.0);gl_Position=projectionMatrix*mv;}`),4),Ne.name="lifecycle-contact-glow",Ne.visible=!1}le(),Xe();function _e(o={}){if(te)return;if(Q={...Q,...o},$.quantity){const l=$.quantity;Q.quantity=Number.isFinite(Q.quantity)?Ue.clamp(Math.round(Q.quantity),l.min,l.max):l.default}else delete Q.quantity;if(Te.uQuantity.value=Q.quantity??Ie,$.spread){const l=$.spread;Q.spread=Number.isFinite(Q.spread)?Ue.clamp(Q.spread,l.min,l.max):l.default}else delete Q.spread;Te.uSpread.value=Q.spread??1,Q.size=Ue.clamp(Number(Q.size)||1,.25,2),Q.density=Ue.clamp(Number(Q.density)||.125,.125,1),/^#[0-9a-f]{6}$/i.test(Q.color)||(Q.color=$.color),Te.uColor.value.set(Q.color);const w=Math.max(1,Math.round(xe*Q.density)),h=E===3&&x===2?7:E===3&&(x===4||x===6)?12:E===4&&ne&&x===1?22:0;let g=w-h;me=h;for(let l=ae.length-1;l>=0;l--){const u=ae[l],P=l===0?g:Math.min(u.maximum,Math.round(w*u.weight));u.geometry.instanceCount=P,g-=P,me+=P}Q.speed=Ue.clamp(Number(Q.speed)||1,.25,2),Q.detail=Ue.clamp(Number(Q.detail)||.25,.25,2),Te.uSize.value=Q.size,Te.uDetail.value=Q.detail;for(const l of ge){l.object.scale.copy(l.scale);for(const u of l.axes)l.object.scale[u]*=Q.size;l.object.position.copy(l.position),l.pivot&&(l.object.position.y+=l.pivot*(1-Q.size))}Y&&je(),ke()}function je(){ve.subVectors(Y.end,Y.start);const o=ve.length();K.position.copy(Y.start).add(Y.end).multiplyScalar(.5),o>0&&K.quaternion.setFromUnitVectors(ye,ve.normalize()),K.scale.set(o/4.8,1,1),Te.uStretch.value=Math.max(.001,o/4.8),K.visible=o>0}function ke(){$.burst?v=H+1e-9>=$.duration?"finished":H+1e-9>=$.duration*.55?"ending":H+1e-9>=$.duration*.1?"active":"starting":b>=0?v=T+1e-9>=r.end?"finished":"ending":v=H+1e-9>=r.start?"active":"starting";const o=b>=0?S:Math.min(1,H/r.start);z.uEmitterTime.value=b>=0?b:H,z.uLifeStart.value=o,z.uLifeEnd.value=$.burst?Math.max(0,Math.min(1,(H/$.duration-.55)/.45)):b>=0?Math.min(1,T/r.end):0,z.uLifeStage.value=v==="active"?1:v==="starting"?0:2,z.uLifeOrigin.value=S,z.uStopTime.value=b,z.uImpact.value=A?1:0;for(const w of Fe)w.transparent=v!=="active",w.depthWrite=v==="active";for(const w of Re)w.geometry.setDrawRange(v==="active"?0:w.steady,v==="active"?w.steady:w.transition);K.visible=v!=="finished"&&(!Y||Y.start.distanceToSquared(Y.end)>0),he&&(he.visible=A&&v==="ending",Ne.visible=A&&v==="ending"&&T/r.end<.28),E===0&&x===0&&ae.length===1&&(ae[0].geometry.instanceCount=Math.max(0,me-(A&&v==="ending"?12:0)))}function Ge(){te||v==="ending"||v==="finished"||$.burst||(S=Math.min(1,H/r.start),b=H,T=0,ke())}const Oe=new ie,Pe=new ie,De=new Qe;function Je(o){const w=Q.size;if(x===0)o.set(.65+(.46+Math.sin(H*4.1)*.035)*w,Math.sin(5+H*3)*.03*w,Math.cos(7+H*2.7)*.03*w);else if(x===1)o.set(.85+.85*w,0,0);else if(x===2)o.set(.85+.93*w,0,0);else if(x===3){const h=Q.quantity??3,g=Q.spread??1,l=Math.min(1,H/r.start),u=1-l*l*(3-2*l);let P=-1/0;for(let V=0;V<h;V++){const k=V*(h===3?2.094395:Math.PI*2/h)-H*3,D=.85+Math.sin(k*2)*.09*w,i=Math.cos(k)*.26*w*g,d=Math.sin(k)*.26*w*g;for(let y=0;y<6;y++){const e=Math.floor(y/2),t=y%2?-1:1;let a=D+(e===0?t*.182*w:0),n=i+(e===1?t*.078*w:0),s=d+(e===2?t*.078*w:0);n*=1+u*.8,s*=1+u*.8,a+=Math.sin(n*7)*u*.4,a>P&&(P=a,o.set(a,n,s))}}return o}else if(x===4){o.set(.81*w,0,0);for(let l=0;l<9;l++){const u=l*Math.PI*2/9-H*4,P=.99+l%3*.035,V=Math.cos(u)*P*w;V>o.x&&o.set(V,Math.sin(u)*P*w,.02*w)}const h=-.15*Math.sin(H*2),g=o.y;o.y=g*Math.cos(h),o.z+=g*Math.sin(h)}else x===5?o.set(.9*w,-.2*w*Math.cos(H*2.7),.2*w*Math.sin(H*2.7)):x===6?o.set(1.11*w,0,0):o.set(w,0,0);if(H<r.start){const h=H/r.start,g=h*h*(3-2*h),l=1-g;if(x===0)o.y*=.22+.78*g,o.z*=.22+.78*g,o.x=(o.x*.38-.16)*(1-g)+o.x*g,o.y+=Math.sin(o.x*4.5+h*7)*l*.15;else if(x===1)o.x*=1.3-.3*g,o.y*=.08+.92*g,o.z*=.08+.92*g;else if(x===2||x===4){const u=Math.ceil((Math.atan2(o.z,o.y)+Math.PI)*3)*.028;o.y*=1+l*(.8+u),o.z*=1+l*(.8+u),o.x-=l*(.2+u)}else x===3?(o.y*=1+l*.8,o.z*=1+l*.8,o.x+=Math.sin(o.y*7)*l*.4):x===5&&(o.z+=Math.sin(o.x*4)*l*.75,o.x-=l*.5)}return o}function et(o,w){E!==0||te||v==="ending"||v==="finished"||o&&(!Number.isFinite(o.x)||!Number.isFinite(o.y)||!Number.isFinite(o.z))||(Je(he.position),o&&(Oe.copy(o),K.parent&&(K.parent.updateWorldMatrix(!0,!1),K.parent.worldToLocal(Oe)),ve.copy(he.position).multiply(K.scale).applyQuaternion(K.quaternion),K.position.copy(Oe).sub(ve)),Ne.position.copy(he.position),K.updateWorldMatrix(!0,!1),De.copy(K.matrixWorld).invert(),w?Pe.copy(w):Pe.copy(ye).transformDirection(K.matrixWorld).negate(),(!Number.isFinite(Pe.lengthSq())||Pe.lengthSq()<1e-10)&&Pe.copy(ye).transformDirection(K.matrixWorld).negate(),Pe.transformDirection(De),he.quaternion.setFromUnitVectors(ye,Pe),x===0&&(he.updateWorldMatrix(!0,!1),De.copy(he.matrixWorld).invert(),he.material.uniforms.uImpactUp.value.set(0,1,0).transformDirection(De)),A=!0,Ge())}function $e(o){if(te||!Number.isFinite(o)||o<0||v==="finished")return;const w=o*Q.speed;H+=w,Te.uTime.value=H,b>=0&&(T+=w),E===0&&B&&b<0&&K.position.addScaledVector(_,o*B);for(const h of fe)h();ke()}function tt(){te||(H=0,T=0,b=-1,A=!1,S=1,v="starting",Te.uTime.value=0,he&&(he.position.set(0,0,0),Ne.position.set(0,0,0)),ke(),$e(0))}function at(){if(!te){te=!0,v="finished",K.visible=!1,K.removeFromParent();for(const o of re)o.dispose();for(const o of ce)o.dispose();re.clear(),ce.clear(),K.clear()}}return _e(Q),$e(0),{group:K,update:$e,setOptions:_e,reset:tt,dispose:at,stop:Ge,hit:et,get settings(){return{...Q}},get particleCount(){return me},get elapsed(){return H},get phase(){return v},get finished(){return v==="finished"},get lifecycle(){return{...r}},setDirection(o,w=4){E!==0||te||v==="ending"||v==="finished"||!o||!Number.isFinite(o.lengthSq())||o.lengthSq()===0||(_.copy(o).normalize(),B=Math.max(0,Number(w)||0),K.quaternion.setFromUnitVectors(ye,_))},setEndpoints(o,w){E!==1||te||v==="ending"||v==="finished"||(Y={start:o.clone(),end:w.clone()},je())}}}function gt($){const{THREE:R,kind:E,variant:x,cap:Ie,mesh:ne,instanced:xe,shader:K,output:Q}=$,H=`${E}:${x}`,B=["6:0","3:8","7:0","7:1","8:0","1:5","3:9","3:10","1:6","9:0"].indexOf(H);if(B<0)return!1;const Y=Math.PI*2,me=[],_=(f,c=[0,0,0],r=[0,0,0,0],v=-1)=>{f.translate(...c),me.push({geometry:f,center:c,data:r,unit:v})};function ye(f=me){const c=[],r=[],v=[],T=[],b=[],S=[];for(const z of f){const j=z.geometry.index?z.geometry.toNonIndexed():z.geometry,Z=j.attributes.position,ue=j.attributes.normal,de=j.attributes.uv;for(let W=0;W<Z.count;W++)c.push(Z.getX(W),Z.getY(W),Z.getZ(W)),r.push(ue.getX(W),ue.getY(W),ue.getZ(W)),v.push(de?.getX(W)??0,de?.getY(W)??0),T.push(...z.center),b.push(...z.data),S.push(z.unit??-1);j!==z.geometry&&j.dispose(),z.geometry.dispose()}const A=new R.BufferGeometry;return A.setAttribute("position",new R.Float32BufferAttribute(c,3)),A.setAttribute("normal",new R.Float32BufferAttribute(r,3)),A.setAttribute("uv",new R.Float32BufferAttribute(v,2)),A.setAttribute("aCenter",new R.Float32BufferAttribute(T,3)),A.setAttribute("aData",new R.Float32BufferAttribute(b,4)),A.setAttribute("aUnit",new R.Float32BufferAttribute(S,1)),A}function ve(f,c,r){return new R.OctahedronGeometry(1,0).scale(f,c,r)}function re(f,c,r,v,T,b,S=32,A=!1){const z=[],j=[],Z=(W,oe,le)=>A?[le,Math.cos(oe)*W*T,Math.sin(oe)*W]:[Math.cos(oe)*W,le,Math.sin(oe)*W],ue=(W,oe,le,C,J,pe)=>{z.push(...W,...oe,...le),j.push(...C,...J,...pe)};for(let W=0;W<S;W++){const oe=W/S,le=(W+1)/S,C=r+(v-r)*oe,J=r+(v-r)*le,pe=Z(f,C,-b/2),Se=Z(c,C,-b/2),be=Z(c,C,b/2),L=Z(f,C,b/2),Ae=Z(f,J,-b/2),Ce=Z(c,J,-b/2),M=Z(c,J,b/2),G=Z(f,J,b/2);for(const[ee,Ve,Me,Ee]of[[pe,Ae,Ce,Se],[Se,Ce,M,be],[be,M,G,L],[L,G,Ae,pe]])ue(ee,Ve,Me,[oe,0],[le,0],[le,1]),ue(ee,Me,Ee,[oe,0],[le,1],[oe,1]);W===0&&(ue(pe,Se,be,[oe,0],[oe,1],[oe,1]),ue(pe,be,L,[oe,0],[oe,1],[oe,0])),W===S-1&&(ue(Ae,M,Ce,[le,0],[le,1],[le,1]),ue(Ae,G,M,[le,0],[le,0],[le,1]))}const de=new R.BufferGeometry;return de.setAttribute("position",new R.Float32BufferAttribute(z,3)),de.setAttribute("uv",new R.Float32BufferAttribute(j,2)),de.computeVertexNormals(),de}function ce(f,c,r=.025,v=5){const T=new R.Vector3(...f),b=new R.Vector3(...c),S=b.clone().sub(T),A=new R.CylinderGeometry(r,r,S.length(),v,1,!1);return A.applyQuaternion(new R.Quaternion().setFromUnitVectors(new R.Vector3(0,1,0),S.normalize())),A.translate(...T.add(b).multiplyScalar(.5).toArray()),A}const ae=`
    uniform float uTime,uLifeStart,uLifeEnd,uLifeOrigin,uStopTime,uEndDuration,uStretch,uQuantity,uSpread;
    float sat(float a){return clamp(a,0.0,1.0);}
    float ease(float a){a=sat(a);return 1.0-pow(1.0-a,3.0);}
    float fadeEnd(){return 1.0-smoothstep(.58,1.0,uLifeEnd);}
    float grow(){return smoothstep(0.0,1.0,uLifeStart);}
    mat2 turn(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
    float rand(float n){return fract(sin(n*127.1+311.7)*43758.5453);}
  `;function fe(f,c="",r=!1){const v=`${ae}
      attribute vec3 aCenter;attribute vec4 aData;attribute float aUnit;
      varying vec2 vUv;varying vec3 vN,vP;varying float vAlpha,vTone,vPart;
      void main(){
        vec3 p=position,c=aCenter,q=p-c;vec3 n=normal;
        vUv=uv;vAlpha=1.0;vTone=aData.w;vPart=aData.x;
        ${f}
        vP=p;vN=normalize(normalMatrix*n);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
      }`,T=`${ae}
      uniform float uSize;uniform vec3 uColor;varying vec2 vUv;varying vec3 vN,vP;varying float vAlpha,vTone,vPart;
      void main(){
        float light=dot(normalize(vN),normalize(mat3(viewMatrix)*vec3(-.4,.8,.55)))*.5+.5;
        float shade=mix(.28,.82,smoothstep(.38,.41,light));shade=mix(shade,1.16,smoothstep(.7,.73,light));
        vec3 color=mix(uColor*shade,mix(uColor,vec3(1.0),.7),clamp(vTone,0.0,1.0));
        if(vTone<0.0)color=mix(uColor*.13,vec3(.10,.12,.14),.65)*(.65+shade*.4);
        float alpha=vAlpha;
        ${c}
        if(alpha<.003)discard;
        gl_FragColor=vec4(color,clamp(alpha,0.0,1.0));${Q}
      }`,b=K(T,v,{},r);return b.userData.ownLifecycle=!0,b}function ge(f,c="",r="utility-body",v=me,T=!1){const b=ne(ye(v),fe(f,c,T),1);return b.name=r,b}if(B===0){for(let f=0;f<9;f++){const c=-1.15+f*2.3/9,r=-1.15+(f+1)*2.3/9,v=(c+r)/2,T=[Math.cos(v)*1.7,.1,Math.sin(v)*1.7];for(const[b,S,A,z]of[[1.35,2.02,.13,.16],[1.95,2.07,.09,.88]]){const j=re(b,S,c,r,1,A,5).translate(0,.1,0);me.push({geometry:j,center:T,data:[f/8,v,0,z]})}if(f<7){const b=re(1.1,1.19,c,r,1,.055,4).translate(0,.25,0);me.push({geometry:b,center:[Math.cos(v)*1.15,.25,Math.sin(v)*1.15],data:[f/8,v,1,.55]})}}ge(`
      float t=uTime/.65,sw=ease(t/.62),angle=-1.10+sw*1.82;
      float release=.27+aData.x*.17,peel=ease((uTime-release)/.16);
      p=c+q*(1.0-peel*.68);p.xz+=vec2(cos(aData.y),sin(aData.y))*peel*.32;
      p.y-=peel*peel*.34;p.y+=sin((aData.x+vUv.x/9.0)*3.14159)*.12;
      p.xz=turn(angle-peel*.13)*p.xz;n.xz=turn(angle-peel*.13)*n.xz;p*=uSize;
      float along=(aData.x*8.0+vUv.x)/9.0;
      vAlpha=smoothstep(-.04,.04,sw-along*.72)*smoothstep(0.0,.055,t)*(1.0-smoothstep(release+.09,release+.20,uTime));
    `,"color+=uColor*.055*pow(.5+.5*sin((vPart+vUv.x/9.0)*(16.0+uDetail*26.0)),10.0);")}else if(B===1){for(let f=0;f<13;f++){const c=-2.25+f*.36,r=Math.sin(f*2.2)*.19+Math.sin(f*.79)*.14,v=[c+.37,.016,Math.sin((f+1)*2.2)*.19+Math.sin((f+1)*.79)*.14],T=ce([c,.016,r],v,.038+f%3*.007,4);_(T,[0,0,0],[f/12,0,0,.8]);for(let b=-1;b<=1;b+=2){const S=f*2+(b===1?1:0),A=Math.sin(S*7.3)*.11,z=new R.DodecahedronGeometry(1,0).scale(.15+S%4*.045,.12+S%3*.055,.18+S%5*.035);if(z.rotateZ(A*2.3),z.rotateY(S*1.71),z.rotateX(A*1.5),_(z,[c+A,.09,r+b*(.22+S%3*.095)],[f/12,b,1,-1],f),(f+b)%3!==0){const j=[.1+A,.026,b*(.3+S%4*.12)];_(ce([0,0,0],j,.018,4),[c,.033,r],[f/12,b,2,.65]),f%2===0&&_(ce(j,[j[0]+.14,j[1],j[2]+b*.1],.012,4),[c,.033,r],[f/12,b,2,.55])}}}for(let f=13;f<26;f++)for(let c=-1;c<=1;c+=2){const r=-2.25+f*.36,v=Math.sin(f*2.2)*.19+Math.sin(f*.79)*.14,T=f*2+(c===1?1:0),b=Math.sin(T*7.3)*.11,S=new R.DodecahedronGeometry(1,0).scale(.15+T%4*.045,.12+T%3*.055,.18+T%5*.035);S.rotateZ(b*2.3),S.rotateY(T*1.71),S.rotateX(b*1.5),_(S,[r+b,.09,v+c*(.22+T%3*.095)],[f/12,c,1,-1],f)}ge(`
      float path=aData.x;
      if(aUnit>=0.0&&uQuantity!=13.0)path=aUnit/max(1.0,uQuantity-1.0);
      float arrival=.1+path*.62,age=uTime-arrival;
      float hit=ease(age/.11),settle=smoothstep(.12,.75,age);
      if(aData.z>.5&&aData.z<1.5){q.xz=turn(aData.y*hit*(1.0-settle)*.27)*q.xz;p=c+q;
        p.y+=sin(sat(age/.72)*3.14159)*(.36+rand(path)*.2);p.z+=aData.y*hit*(1.0-settle)*.15;
        if(uQuantity!=13.0){float index=path*12.0;
          p.x+=(index-aUnit)*.36;
          p.z+=sin(index*2.2)*.19+sin(index*.79)*.14-sin(aUnit*2.2)*.19-sin(aUnit*.79)*.14;}
      }
      p.z*=uSize;p.y*=uSize;
      vAlpha=smoothstep(-.02,.055,age)*(1.0-smoothstep(1.28,1.8,uTime));
      if(aUnit>=0.0)vAlpha*=step(aUnit+.5,uQuantity);
    `,"if(vTone>=0.0){color=mix(uColor,vec3(1.0,.89,.4),.45+.35*sin(vP.x*(5.0+3.0*uDetail)-uTime*9.0));alpha*=.8+.2*sin(vP.x*13.0+uTime*3.0);}")}else if(B===2||B===3){const f=B===2?7:4;for(let c=0;c<f;c++){const r=(c-1)*Y/6,v=c===0?0:.98,T=Math.sqrt(1.18*1.18-v*v),b=new R.Vector3(T,Math.cos(r)*v,Math.sin(r)*v).normalize(),S=[T-.28,.9+Math.cos(r)*v,Math.sin(r)*v],A=new R.Quaternion().setFromUnitVectors(new R.Vector3(0,1,0),b),z=new R.CylinderGeometry(.51,.51,.17,6,1,!1);z.applyQuaternion(A),_(z,S,[c/(f-1),r,0,.08],c);const j=new R.CylinderGeometry(.425,.425,.026,6,1,!1);j.applyQuaternion(A),_(j,[S[0]+b.x*.1,S[1]+b.y*.1,S[2]+b.z*.1],[c/(f-1),r,1,.42],c)}if(B===3)for(let c=0;c<9;c++){const r=c*Y/9,v=[.8,.9+Math.cos(r)*.25,Math.sin(r)*.25],T=ve(.07,.22,.07);T.rotateX(r),_(T,v,[c/9,r,2,.9])}B===3&&(_(ce([1.01,.54,0],[1.01,1.26,0],.014,4),[0,0,0],[0,0,3,1]),_(ce([1.01,.83,-.31],[1.01,.97,.31],.012,4),[0,0,0],[0,0,3,1])),ge(B===2?`
      float start=smoothstep(aData.x*.38,aData.x*.38+.60,uLifeStart);
      float close=smoothstep(aData.x*.16,.83+aData.x*.16,uLifeEnd);
      float visible=start*(1.0-close);
      p=c+q*(.78+.22*visible);p.x+=(1.0-start)*.45+close*.32;
      p.y+=(1.0-start)*cos(aData.y)*.17;p.z+=(1.0-start)*sin(aData.y)*.17;
      p*=uSize;vAlpha=visible*fadeEnd()*step(aUnit+.5,uQuantity);
    `:`
      float t=uTime/.55,pressure=sin(sat(t/.34)*3.14159);
      float rebound=sin(sat((t-.34)/.27)*3.14159);
      float strength=aData.x<.01?.54:.16*(1.0-aData.x*.45);
      p.x-=pressure*strength;p.x+=rebound*strength*.27;
      if(aData.z<1.5){p.y+=(c.y-.9)*pressure*.10;p.z+=c.z*pressure*.10;}
      if(aData.z>1.5&&aData.z<2.5){float spread=ease((t-.25)/.65);p=c+q*(1.0-spread*.6);p.y+=cos(aData.y)*spread*1.0;p.z+=sin(aData.y)*spread*1.0;p.x+=spread*.35;}
      p*=uSize;vAlpha=smoothstep(0.0,.06,t)*(1.0-smoothstep(.52,1.0,t));
      if(aData.z>2.5)vAlpha*=1.0-smoothstep(.08,.22,t);
      if(aUnit>=0.0)vAlpha*=step(aUnit+.5,uQuantity);
    `,B===2?"float line=pow(.5+.5*sin((vP.y+vP.z*.6)*(10.0+uDetail*8.0)),24.0);color+=uColor*line*.10;":"color=mix(color,vec3(1.0),.48*(1.0-smoothstep(0.0,.23,uTime)));color+=uColor*.08*pow(.5+.5*sin(vP.y*(10.0+uDetail*12.0)+vP.z*11.0),12.0);")}else if(B===4){for(let r=0;r<16;r++){const v=r*Y/16,T=(r+.8)*Y/16;_(re(.92,1.08,v,T,1.35,.18,3,!0),[0,1.45,0],[r/16,v,0,.18]),_(re(.975,1.01,v+.025,T-.025,1.35,.025,3,!0),[.107,1.45,0],[r/16,v,1,.92])}ge(`
      float s=smoothstep(aData.x*.3,aData.x*.3+.64,uLifeStart);
      float e=smoothstep(aData.x*.15,.82+aData.x*.15,uLifeEnd);
      float fold=(1.0-s)*.17+e*.15;p.y-=1.45;p.yz*=1.0+fold;p.y+=1.45;
      p.x+=(1.0-s)*sin(aData.y*2.0)*.28;p*=uSize;
      vAlpha=s*(1.0-e)*fadeEnd();
    `,"color+=uColor*.10*sin(vPart*25.13-uTime*1.4);","utility-gate-frame");const f=new R.CircleGeometry(.94,48);f.rotateY(Math.PI/2),f.scale(1,1.35,1);const c=[{geometry:f.translate(0,1.45,0),center:[0,1.45,0],data:[0,0,0,0]}];ge(`
      float s=grow(),close=1.0-smoothstep(0.0,.82,uLifeEnd);
      p.y-=1.45;p.z*=max(.012,s*close);p.y*=.7+.3*s*close;p.y+=1.45;p*=uSize;
      vAlpha=s*close*fadeEnd();
    `,`
      vec2 q=(vUv-.5)*2.0;float r=length(q);float a=atan(q.y,q.x);
      float swirl=.5+.5*sin(r*(10.0+uDetail*5.0)-a*3.0-uTime*3.25);
      vec2 starUv=(q+vec2(sin(uTime*.08)*.1,uTime*.009))*(12.0+uDetail*2.0);
      vec2 grid=floor(starUv);
      vec2 cell=fract(starUv)-.5;
      float cross=max(pow(max(0.0,1.0-abs(cell.x)*13.0),3.0)*max(0.0,1.0-abs(cell.y)*3.2),pow(max(0.0,1.0-abs(cell.y)*13.0),3.0)*max(0.0,1.0-abs(cell.x)*3.2));
      float star=step(.963,rand(dot(grid,vec2(1.0,71.0))))*cross*(.72+.28*sin(uTime+grid.x));
      color=mix(uColor*.035,uColor*.23,swirl*.17+smoothstep(.55,1.0,r)*.55);
      color+=mix(uColor,vec3(1.0),.8)*star*2.0;alpha*=.50*(1.0-smoothstep(.96,1.0,r));
    `,"utility-star-membrane",c)}else if(B===5||B===8)if(B===5){for(let f=0;f<3;f++){const c=new R.CylinderGeometry(.011,.011,4.8,5,36,!0);c.rotateZ(Math.PI/2),_(c,[0,0,0],[f/3,f*Y/3,0,.25])}for(let f=0;f<18;f++){const c=f%3*Y/3,r=new R.SphereGeometry(1,8,5);r.scale(.22,.15,.15),_(r,[0,0,0],[f/9,c,1,.68]);const v=new R.ConeGeometry(.12,.44,5,1,!0);v.rotateZ(-Math.PI/2),v.translate(.24,0,0),_(v,[0,0,0],[f/9,c,2,.16])}for(let f=0;f<2;f++)for(let c=0;c<5;c++)_(re(f===0?.27:.16,f===0?.31:.19,c*Y/5,(c+.7)*Y/5,1,.035,4,!0),[f===0?-2.4:2.4,0,0],[c/5,c*Y/5,3+f,.5]);ge(`
        float travel=.60,t=uTime/travel,a=aData.y;
        if(aData.z<.5){
          float f=(p.x+2.4)/4.8;float envelope=sin(f*3.14159);
          p.y+=sin(f*3.0+a)*.34*envelope;p.z+=cos(f*3.0+a)*.34*envelope;
          float front=smoothstep(-.04,.06,uTime/.35-(1.0-f));
          float stoppedFor=max(0.0,uTime-uStopTime);
          float drain=smoothstep(-.05,.08,1.0-f-stoppedFor/travel);
          float end=uStopTime<0.0?1.0:mix(1.0,drain,smoothstep(0.0,.08,stoppedFor));
          vAlpha=front*end*grow()*fadeEnd()*.28;
        }else if(aData.z>2.5){
          p=c+q*vec3(uSize/max(uStretch,.001),uSize,uSize);p.yz/=uSize;
          vAlpha=grow()*fadeEnd()*(1.0-smoothstep(.35,1.0,uLifeEnd))*.65;
        }else{
          float index=floor(aData.x*9.0+.5);
          float offset=uQuantity==9.0?aData.x:index/uQuantity;
          float cycle=t+offset,phase=fract(cycle),birth=(floor(cycle)-offset)*travel;
          float f=1.0-phase;float envelope=sin(phase*3.14159);
          float live=step(0.0,birth)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,birth));
          p.x=p.x*uSize/max(uStretch,.001)+(f-.5)*4.8;
          p.y+=sin(f*3.0+a)*.34*envelope;p.z+=cos(f*3.0+a)*.34*envelope;
          vAlpha=live*smoothstep(0.0,.08,phase)*(1.0-smoothstep(.82,1.0,phase))*fadeEnd()*step(index+.5,uQuantity);
        }
        p.yz*=uSize;
      `,"if(vTone>.5)color=mix(uColor*.7,vec3(.86,1.0,.93),.62)*(.92+.08*sin((vP.x*28.0+vP.y*19.0)*uDetail));")}else{let f=function(){const r=[],v=[],T=[];for(let A=0;A<=8;A++){const z=A/8,j=[],Z=.17*Math.pow(1-z,.72)+.006,ue=.065*(1-z)+.004;for(let de=0;de<6;de++){const W=de*Y/6;j.push([z,Math.cos(W)*Z,Math.sin(W)*ue])}T.push(j)}const b=(A,z,j)=>{r.push(...A,...z,...j),v.push(A[0],A[1]+.5,z[0],z[1]+.5,j[0],j[1]+.5)};for(let A=0;A<8;A++)for(let z=0;z<6;z++){const j=(z+1)%6;b(T[A][z],T[A+1][z],T[A+1][j]),b(T[A][z],T[A+1][j],T[A][j])}for(let A=0;A<6;A++){const z=(A+1)%6;b([0,0,0],T[0][z],T[0][A]),b([1,0,0],T[8][A],T[8][z])}const S=new R.BufferGeometry;return S.setAttribute("position",new R.Float32BufferAttribute(r,3)),S.setAttribute("uv",new R.Float32BufferAttribute(v,2)),S.computeVertexNormals(),S};for(let r=0;r<16;r++){const v=(r/8+Math.sin(r*2.3)*.018+1)%1;_(new R.SphereGeometry(1,10,7),[0,0,0],[v,r*2.37,0,.14+r%3*.035])}for(let r=0;r<5;r++){const v=new R.SphereGeometry(1,7,5);v.scale(.09,.065,.065),_(v,[0,0,0],[r/5+.03,r*2.19,2,.26])}const c=[-.4,.65,1.8,3.05,4.65];for(let r=0;r<5;r++){const v=(r*.213+.07)%1,T=c[r];_(f(),[0,0,0],[v,T,1,.24]);const b=new R.SphereGeometry(1,8,6);b.scale(.1+r%2*.025,.12+r%3*.018,.1+r%2*.025),_(b,[0,0,0],[v,T,3,.36])}ge(`
        if(aData.z<.5){
          float index=floor(aData.y/2.37+.5);
          float offset=uQuantity==8.0?aData.x:fract(aData.x+index*(1.0/uQuantity-1.0/8.0));
          float travel=.25,cycle=uTime/travel+offset,phase=fract(cycle),birth=(floor(cycle)-offset)*travel;
          float live=step(0.0,birth)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,birth));
          float bulb=smoothstep(-1.0,.35,q.x),envelope=pow(max(0.0,sin(phase*3.14159)),.28);
          float radius=(.075+phase*.24)*(.87+.13*sin(aData.y))*envelope;
          float neck=.25+.75*bulb,irregular=1.0+.095*sin(q.x*5.0+aData.y+phase*3.0);
          float length=min(.43+.07*rand(aData.y),min(phase,1.0-phase)*4.55);
          p.x=-2.4+phase*4.8+q.x*length;
          p.y=q.y*radius*neck*irregular+sin(phase*5.0+aData.y)*.045*envelope;
          p.z=q.z*radius*neck*irregular+cos(phase*6.0+aData.y)*.035*envelope;
          vAlpha=live*smoothstep(0.0,.045,phase)*(1.0-smoothstep(.95,1.0,phase))*fadeEnd()*step(index+.5,uQuantity);
        }else if(aData.z>1.5&&aData.z<2.5){
          float travel=.25,cycle=uTime/travel+aData.x,phase=fract(cycle),birth=(floor(cycle)-aData.x)*travel;
          float live=step(0.0,birth)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,birth));
          p.x=-2.4+phase*4.8+q.x*min(1.0,phase*12.0)*min(1.0,(1.0-phase)*12.0);
          float radial=(.12+phase*.38)*sin(phase*3.14159);
          p.y=q.y+cos(aData.y)*radial-.10*phase*phase;p.z=q.z+sin(aData.y)*radial;
          vAlpha=live*smoothstep(.02,.10,phase)*(1.0-smoothstep(.84,1.0,phase))*fadeEnd();
        }else if(aData.z<1.5){
          float period=.38,cycle=(uTime-.25)/period+aData.x,phase=fract(cycle);
          float source=(floor(cycle)-aData.x)*period;
          float live=step(0.0,source)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,source));
          float h=q.x,extend=ease(phase/.40),retreat=smoothstep(.43,.82,phase);
          float reach=.59+.16*rand(aData.y),radial=.13+reach*h*extend;
          float width=1.0-retreat*.68;
          float bow=.13*sin(h*3.14159)-.23*h*h;
          p.x=2.30+(bow+q.z)*uSize/max(uStretch,.001);
          p.y=cos(aData.y)*radial-q.y*width*sin(aData.y);
          p.z=sin(aData.y)*radial+q.y*width*cos(aData.y);
          n=normalize(vec3(normal.z,normal.y*cos(aData.y)-normal.x*sin(aData.y),normal.y*sin(aData.y)+normal.x*cos(aData.y)));
          float rootRetreat=smoothstep(-.06,.06,h-retreat*1.16);
          vAlpha=live*smoothstep(0.0,.08,phase)*(1.0-smoothstep(.67,.83,phase))*rootRetreat*(1.0-smoothstep(.78,1.0,uLifeEnd));
        }else{
          // A drop is born at the tongue tip, then moves independently under gravity.
          float period=.38,cycle=(uTime-.36)/period+aData.x,phase=fract(cycle),age=phase*period;
          float source=(floor(cycle)-aData.x)*period;
          float live=step(0.0,source)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,source));
          float reach=.59+.16*rand(aData.y),radial=.13+reach+age*(.90+.20*rand(aData.y+1.0));
          p.x=2.07+(q.x+age*.22)*uSize/max(uStretch,.001);
          p.y=q.y+cos(aData.y)*radial+.20*age-6.0*age*age;
          p.z=q.z+sin(aData.y)*radial;
          vAlpha=live*smoothstep(0.0,.018,age)*(1.0-smoothstep(.20,.30,age))*(1.0-smoothstep(.94,1.0,uLifeEnd));
        }
        p.yz*=uSize;
      `,`
        float streak=.5+.5*sin(vP.x*(7.0+uDetail*5.0)+vP.y*8.0-uTime*8.0);
        color=mix(color,mix(uColor,vec3(.93,1.0,.35),.52),smoothstep(.67,.86,streak)*.26);
      `)}else if(B===6){let f=function(){const c=[],r=[],v=[];for(let S=0;S<=9;S++){const A=S/9,z=.46*Math.pow(Math.sin(A*Math.PI),.75)+.012;v.push([[-z,A,-.045],[z,A,-.045],[-z,A,.045],[z,A,.045]])}const T=(S,A,z)=>{c.push(...S,...A,...z),r.push(S[0]+.5,S[1],A[0]+.5,A[1],z[0]+.5,z[1])};for(let S=0;S<9;S++){const A=v[S],z=v[S+1];for(const[j,Z]of[[0,1],[1,3],[3,2],[2,0]])T(A[j],z[j],z[Z]),T(A[j],z[Z],A[Z])}const b=new R.BufferGeometry;return b.setAttribute("position",new R.Float32BufferAttribute(c,3)),b.setAttribute("uv",new R.Float32BufferAttribute(r,2)),b.computeVertexNormals(),b};for(let c=0;c<2;c++)for(let r=0;r<14;r++){const v=(r+c*.5)*Y/7;_(f(),[0,0,0],[r/7,v,c,.21+c*.18],r*2+c)}for(let c=0;c<5;c++){const r=c*Y/5;_(ve(.06,.14,.06),[Math.cos(r)*.28,.1,Math.sin(r)*.28],[c/5,r,2,.75])}ge(`
      float phase=aData.x,angle=aData.y;
      if(aUnit>=0.0&&uQuantity!=14.0){
        float ringCount=max(1.0,floor((uQuantity+1.0-aData.z)/2.0));
        float index=floor(aUnit/2.0);phase=index/ringCount;
        angle=(index+aData.z*.5)*6.28318530718/ringCount;
      }
      float t=uTime/2.2,gather=ease(t/.17),rise=ease((t-.12)/.46),open=ease((t-.26-phase*.035)/.38);
      float dissolve=smoothstep(.68,1.0,t);
      if(aData.z<1.5){
        float h=q.y,spread=.11+open*(.94-aData.z*.20),bend=.25*open;
        float radial=(1.0-gather)*.43+.10+h*spread+h*h*bend;
        float height=.05+rise*.29+h*(.11+rise*1.65)-h*h*.38*open;
        float dr=spread+2.0*h*bend,dy=.11+rise*1.65-h*.76*open;
        vec2 normalProfile=normalize(vec2(dy,-dr));
        radial+=q.z*normalProfile.x;height+=q.z*normalProfile.y;
        float widthScale=.34+rise*.66;
        if(uQuantity>14.0){
          float ringCount=max(1.0,floor((uQuantity+1.0-aData.z)/2.0));
          float halfGap=(radial-q.z*normalProfile.x)*tan(3.14159265359/ringCount)*.82;
          widthScale=min(widthScale*7.0/ringCount,halfGap/max(abs(q.x),.012));
        }
        p=vec3(cos(angle)*radial-q.x*widthScale*sin(angle),height+dissolve*.32,sin(angle)*radial+q.x*widthScale*cos(angle));
        n=normalize(vec3(cos(angle)*normalProfile.x,normalProfile.y,sin(angle)*normalProfile.x)*normal.z+vec3(-sin(angle),0.0,cos(angle))*normal.x+vec3(cos(angle)*dr,dy,sin(angle)*dr)*normal.y);
        vAlpha=smoothstep(0.0,.08,t)*(1.0-dissolve)*step(aUnit+.5,uQuantity);
      }else{p.y+=rise*2.05+dissolve*.2;p.xz*=1.0+rise*.25;vAlpha=smoothstep(.23,.39,t)*(1.0-smoothstep(.7,.98,t));}
      p*=uSize;
    `,"color=mix(color,vec3(1.0,.98,.69),smoothstep(.3,2.0,vP.y/uSize)*.32);float vein=pow(.5+.5*cos((vP.x+vP.z)*(10.0+uDetail*9.0)),18.0);color+=uColor*vein*.07;")}else if(B===7){for(let f=0;f<18;f++){const c=f*2.39996,r=f===0?0:.55+.8*(f%3)/2,v=[Math.cos(c)*r,0,Math.sin(c)*r],T=ve(.13,.64,.13);T.translate(0,.64,0),_(T,v,[f/9,c,0,.27]);for(let S=0;S<3;S++){const A=ve(.075,.15,.075);A.rotateZ((S-1)*.8),_(A,v,[f/9,c+S*Y/3,1,.67])}const b=new R.CylinderGeometry(.25,.31,.045,6,1,!1);_(b,[v[0],.025,v[2]],[f/9,c,2,.12])}ge(`
      float index=floor(aData.x*9.0+.5);
      float offset=uQuantity==9.0?aData.x:index/uQuantity;
      float impact=.43+offset*1.05,age=uTime-impact;
      if(aData.z<.5){float fall=sat((age+.34)/.34);float y=(1.0-fall*fall)*2.55;
        p=c+q*uSize;p.y+=y;
        vAlpha=smoothstep(-.37,-.30,age)*(1.0-smoothstep(.015,.12,age));
      }else if(aData.z<1.5){float a=sat(age/.48);p=c+q*uSize*(1.0-a*.55);
        p.x+=cos(aData.y)*a*.43*uSize;p.z+=sin(aData.y)*a*.43*uSize;p.y+=sin(a*3.14159)*.40*uSize;
        vAlpha=smoothstep(0.0,.025,age)*(1.0-smoothstep(.20,.48,age));
      }else{p=c+q*uSize;float a=ease(age/.15);p.xz=c.xz+(p.xz-c.xz)*a;vAlpha=smoothstep(0.0,.04,age)*(1.0-smoothstep(.35,.85,age));}
      p.xz+=(uSpread-1.0)*c.xz;
      vAlpha*=(1.0-smoothstep(2.12,2.4,uTime))*step(index+.5,uQuantity);
    `,"color=mix(color,vec3(.86,.97,1.0),.19);color+=uColor*.08*pow(.5+.5*sin(vP.y*(12.0+uDetail*13.0)+vP.x*19.0),16.0);")}else if(B===9){for(let f=0;f<12;f++){const c=f*Y/6,r=[[.03,Math.cos(c)*.35,Math.sin(c)*.35],[.04,Math.cos(c+.16)*.68,Math.sin(c+.16)*.68],[-.04,Math.cos(c-.09)*.85,Math.sin(c-.09)*.85],[.02,Math.cos(c+.03)*1.18,Math.sin(c+.03)*1.18]];for(let T=0;T<r.length-1;T++)_(ce(r[T],r[T+1],T===0?.025:.018,4),[0,0,0],[f/6,c,T,.1],f),_(ce(r[T],r[T+1],T===0?.037:.028,4),[0,0,0],[f/6,c,10+T,.85],f);const v=[.09,Math.cos(c-.24)*1.01,Math.sin(c-.24)*1.01];_(ce(r[1],v,.014,4),[0,0,0],[f/6,c,3,.1],f),_(ce(r[1],v,.022,4),[0,0,0],[f/6,c,13,.75],f),f<6&&_(re(.3,.37,c+.035,c+Y/6-.08,1,.045,4,!0),[0,0,0],[f/6,c,4,.22])}_(ve(.12,.28,.22),[0,0,0],[0,0,5,.65]),ge(`
      float phase=aData.x,angle=aData.y;
      if(aUnit>=0.0&&uQuantity!=6.0){
        phase=aUnit/uQuantity;angle=phase*6.28318530718;
        p.yz=turn(aData.y-angle)*p.yz;n.yz=turn(aData.y-angle)*n.yz;vPart=phase;
      }
      float radius=length(p.yz),assemble=smoothstep(phase*.25,.7+phase*.25,uLifeStart);
      float off=.09+(1.0-sat(radius/1.2))*.63+phase*.11;
      float release=1.0-smoothstep(off,off+.10,uLifeEnd);
      if(aData.z>9.5){
        float wave=sin(uTime*6.3+angle+radius*7.0),jag=sin(uTime*9.0+angle*2.0+radius*13.0);
        float turnAngle=.19*sin(uTime*4.5-angle)+jag*.065*smoothstep(.3,1.2,radius);
        p.yz=turn(turnAngle)*p.yz;p.x+=wave*.17*smoothstep(.25,1.1,radius);
        p.yz*=1.0+wave*.075;
        float travel=.18+.82*pow(.5+.5*sin(uTime*7.0-radius*9.0-angle),2.0);
        vAlpha=assemble*release*fadeEnd()*travel;
      }else{vAlpha=assemble*release*fadeEnd()*(aData.z<3.5?.38:.75);}
      if(aUnit>=0.0)vAlpha*=step(aUnit+.5,uQuantity);
      p*=uSize;
    `,"color=mix(color,vec3(.94,.98,1.0),.12+.12*sin(uTime*7.0-vPart*(6.0+uDetail*6.0)));")}const Re=`${ae}
    attribute vec4 seed;varying vec3 vN;varying float vAlpha,vTone;
    void main(){
      vec3 p=vec3(0.0);float size=.009+seed.w*.016;float a=seed.x*6.283185;
      float t=uTime,age=0.0;vAlpha=1.0;vTone=seed.w;
      #if UTILITY == 0
        float f=sat(t/.65);float spread=ease(f/.7);float angle=-1.7+seed.x*2.7+spread*.9;
        p=vec3(cos(angle)*(1.15+seed.z*1.2),.1+(seed.y-.5)*.5,sin(angle)*(1.15+seed.z*1.2));
        p*=uSize;vAlpha=smoothstep(.02,.13,f)*(1.0-smoothstep(.25+seed.y*.3,1.0,f));size*=1.0-f*.6;
      #elif UTILITY == 1
        float x=-2.2+seed.x*4.4;age=t-(.1+seed.x*.62);
        p=vec3(x,.05+max(0.0,age)*(1.3+seed.y)-max(0.0,age)*max(0.0,age)*2.2,sin(seed.x*27.0)*.20+(seed.z-.5)*age*.8);
        p.yz*=uSize;vAlpha=smoothstep(0.0,.08,age)*(1.0-smoothstep(.3,.85,age))*(1.0-smoothstep(1.5,1.8,t));
      #elif UTILITY == 2 || UTILITY == 4 || UTILITY == 9
        float f=fract(seed.y+t*.30);float radial=1.1+seed.z*.28;
        #if UTILITY == 2
          p=vec3(.7+seed.z*.1,.9+cos(a)*radial,sin(a)*radial);
        #elif UTILITY == 4
          p=vec3((seed.z-.5)*.25,1.45+cos(a)*1.4,sin(a)*1.04);
        #else
          p=vec3((seed.z-.5)*.15,cos(a)*(.3+seed.y),sin(a)*(.3+seed.y));
        #endif
        p*=uSize;vAlpha=sin(f*3.14159)*grow()*fadeEnd()*(1.0-uLifeEnd)*.7;
      #elif UTILITY == 3
        float f=sat(t/.55);float r=.15+ease(f)*(.45+seed.y*.9);
        p=vec3(.6+f*seed.z,.9+cos(a)*r,sin(a)*r);p*=uSize;
        vAlpha=smoothstep(0.0,.07,f)*(1.0-smoothstep(.25+seed.z*.25,1.0,f));
      #elif UTILITY == 5 || UTILITY == 8
        float travel=.62,cycle=t/travel+seed.y,f=fract(cycle),birth=(floor(cycle)-seed.y)*travel;
        float live=step(0.0,birth)*(uStopTime<0.0?1.0:1.0-step(uStopTime+.00001,birth));
        #if UTILITY == 5
          float path=1.0-f,lane=floor(seed.z*3.0)*2.0944;p.x=2.4-f*4.8;p.y=sin(path*3.0+lane)*sin(f*3.14159)*.34;p.z=cos(path*3.0+lane)*sin(f*3.14159)*.34;size*=.6;
        #else
          p.x=-2.4+f*4.8;p.y=cos(a)*(.08+f*.46)*seed.z;p.z=sin(a)*(.08+f*.46)*seed.z;size*=1.2;
        #endif
        p.yz*=uSize;vAlpha=live*smoothstep(0.0,.08,f)*(1.0-smoothstep(.78,1.0,f))*fadeEnd();
      #elif UTILITY == 6
        float f=sat(t/2.2);float rise=ease((f-seed.y*.22)/.7),r=(.2+seed.z*.9)*sin(rise*2.1);
        p=vec3(cos(a+rise)*r,rise*(1.5+seed.y*1.2),sin(a+rise)*r)*uSize;
        vAlpha=smoothstep(seed.y*.15,seed.y*.15+.13,f)*(1.0-smoothstep(.48+seed.z*.15,1.0,f));
      #elif UTILITY == 7
        // Keep decoration per landing sparse when fewer than nine lances are selected.
        float cell=floor(seed.x*max(9.0,uQuantity)),phi=cell*2.39996,r=cell<.5?0.0:.55+.8*mod(cell,3.0)/2.0;
        age=t-(.43+cell/uQuantity*1.05);float f=sat(age/.55);
        p=vec3(cos(phi)*r,0.0,sin(phi)*r)+vec3(cos(a)*f*.65,sin(f*3.14159)*(.2+seed.y*.5),sin(a)*f*.65)*uSize;
        p.xz+=(uSpread-1.0)*vec2(cos(phi)*r,sin(phi)*r);
        vAlpha=smoothstep(0.0,.03,age)*(1.0-smoothstep(.2,.55,age))*step(cell+.5,uQuantity);
      #endif
      vAlpha*=smoothstep(.42,.90,seed.w);
      #if UTILITY == 2 || UTILITY == 4 || UTILITY == 9
        size*=.52;vAlpha*=.38;
      #elif UTILITY == 5
        vAlpha*=.45;
      #elif UTILITY == 8
        vAlpha*=.55;
      #endif
      vec3 q=position*size*uSize;
      #if UTILITY == 0
        q.x*=3.2;q.y*=.35;q.z*=.65;q.xz=turn(-1.7+seed.x*2.7+ease(sat(uTime/.65)/.7)*.9+1.5708)*q.xz;
      #elif UTILITY == 1
        q.xz*=.55;q.y*=2.2;
      #elif UTILITY == 3 || UTILITY == 7
        q.y*=2.0;
      #elif UTILITY == 6
        q.xz*=.6;q.y*=1.6;
      #endif
      #if UTILITY == 5 || UTILITY == 8
        q.x/=max(uStretch,.001);
      #endif
      p+=q;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
    }`,Fe=`uniform vec3 uColor;varying vec3 vN;varying float vAlpha,vTone;
    void main(){if(vAlpha<.003)discard;float light=dot(normalize(vN),normalize(vec3(-.4,.8,.55)))*.5+.5;
      vec3 color=mix(uColor*.65,mix(uColor,vec3(1.0),.65),step(.48,light));
      gl_FragColor=vec4(color,vAlpha*.82);${Q}}
  `,we=K(Fe,Re,{},!1,{UTILITY:B});we.userData.ownLifecycle=!0;const Te=xe(new R.TetrahedronGeometry(1,0),Ie,1,we,2);return Te.name="utility-detail-particles",!0}function xt($){const{THREE:R,kind:E,variant:x,instanced:Ie,shader:ne,output:xe}=$;if(E!==10||x!==0)return!1;function K(te){const B=[],Y=[],me=[],_=te?6:3;for(let ve=0;ve<_;ve++){const re=te?1:3,ce=B.length/3;for(let ae=0;ae<=re;ae++)for(let fe=0;fe<2;fe++)B.push(fe*2-1,ae/re,ve),Y.push(fe,ae/re);for(let ae=0;ae<re;ae++){const fe=ce+ae*2;me.push(fe,fe+1,fe+2,fe+1,fe+3,fe+2)}}const ye=new R.BufferGeometry;return ye.setAttribute("position",new R.Float32BufferAttribute(B,3)),ye.setAttribute("uv",new R.Float32BufferAttribute(Y,2)),ye.setIndex(me),ye}const Q=`
    attribute vec4 seed;
    uniform float uTime, uLifeStart, uLifeEnd;
    varying vec2 vUv;
    varying float vShade, vSeed, vPetal, vGrowth;
    ${dt()}
    void main() {
      vUv = uv; vSeed = seed.w; vPetal = 0.0;
      vGrowth = smoothstep(0.0, 1.0, uLifeStart) * (1.0 - smoothstep(0.0, 1.0, uLifeEnd));
      vec2 root = (seed.xy * 2.0 - 1.0) * 1.85;
      root *= sqrt(1.0 - .27 * root.yx * root.yx / 3.4225);
      float id = position.z, h = position.y;
      float angle = seed.w * 6.283185 + id * 2.39996;
      vec2 along = vec2(cos(angle), sin(angle));
      vec2 across = vec2(-along.y, along.x);
      vec3 p;
      float patchTone = .5 + .5 * sin(root.x * 2.3 + sin(root.y * 1.8) * 1.4);
      #if FLOWERS == 1
        float height = .48 + seed.z * .45;
        vec2 wind = windAt(root, seed.w * 6.283185);
        if (id < .5) {
          p = vec3(across.x * position.x * .009, h * height, across.y * position.x * .009);
          p.xz += wind * h * h;
        } else {
          vPetal = 1.0;
          float a = (id - 1.0) * 1.256637 + seed.w * 6.283185;
          vec2 radial = vec2(cos(a), sin(a)), tangent = vec2(-radial.y, radial.x);
          float lengthPetal = .12 + grassHash(id + seed.z * 91.0) * .085;
          vec2 petal = radial * (.012 + h * lengthPetal) + tangent * position.x * (.045 + seed.z * .025);
          p = vec3(petal.x, height + .018 + h * .035 + dot(petal, across) * .65, petal.y);
          p.xz += wind;
        }
        vShade = .4 + seed.z * .3;
      #else
        float shape = grassHash(seed.z * 103.0 + id * 7.0);
        float height = (.30 + pow(seed.z, .7) * .82) * (.72 + shape * .38);
        float width = (.065 + grassHash(seed.w * 53.0 + id) * .10) * mix(1.25, .72, seed.z);
        float taper = .22 + .78 * pow(max(0.0, sin(h * 2.85 + .23)), .72);
        float lean = (.12 + shape * .27) * h * h;
        vec2 leaf = across * position.x * width * taper + along * lean;
        leaf += windAt(root, seed.w * 6.283185 + id * .23) * h * h;
        p = vec3(leaf.x, h * height - lean * .16, leaf.y);
        vShade = .12 + patchTone * .35 + shape * .28 + seed.z * .05;
      #endif
      p *= uSize * vGrowth;
      p.xz += root;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,H=`
    ${mt()}
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vShade, vSeed, vPetal, vGrowth;
    void main() {
      if (vGrowth < .002) discard;
      float x = vUv.x * 2.0 - 1.0, h = vUv.y;
      vec3 color;
      if (vPetal > .5) {
        float edge = .74 + .09 * sin(h * 19.0 + vSeed * 17.0);
        float cap = pow(abs((h - .46) / .57), 4.0);
        if (x*x + cap > edge) discard;
        color = mix(vec3(.69,.74,.70), vec3(.86,.89,.82), step(.43, vShade + x * .09));
      } else {
        #if FLOWERS == 0
          float streak = brushStreak(h, vSeed);
          float rim = .89 + streak * .028 * uDetail;
          float tip = 1.0 - smoothstep(.70, 1.03, h);
          if (abs(x + .12 * sin(h * 5.0 + vSeed * 9.0)) > rim * tip) discard;
          float notch = step(.94, sin(h * 21.0 + vSeed * 47.0)) * .065 * uDetail;
          if (abs(x) > rim * tip - notch && h > .2) discard;
        #endif
        float light = vShade + h * .16;
        color = mix(uColor * .37, uColor * .77, step(.36, light));
        color = mix(color, uColor * 1.13, step(.57, light));
        color = mix(color, mix(uColor, vec3(.70,.70,.22), .55), step(.76, light));
        float stroke = step(.64, sin(h * 10.0 + vSeed * 37.0 + x * 2.3));
        color *= 1.0 + (stroke - .5) * .10 * uDetail;
      }
      gl_FragColor = vec4(color, 1.0);
      ${xe}
    }
  `;for(const te of[!1,!0]){const B=ne(H,Q,{},!1,{FLOWERS:te?1:0});B.transparent=!1,B.depthWrite=!0,B.userData.ownLifecycle=!0;const Y=Ie(K(te),te?32:480,te?1/16:15/16,B,0);Y.name=te?"grass-white-flowers":"grass-brush-clumps"}return!0}function It($,R={}){const E=ht.find(x=>x.preset.id===$);return E?yt(E.preset,{...E.defaults,...R}):null}export{It as makeVfx};
