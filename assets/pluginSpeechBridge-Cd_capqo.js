import{j as l}from"./react-core-CuKebU_E.js";import{bD as y,bE as w}from"./store-F1UlzJ2-.js";import"./liveQuizBranches-B6Axrt3C.js";import{L as x}from"./lock-keyhole-BnAm3HMP.js";function S({spot:t,name:e,locked:r,active:n,className:s="",children:a,...c}){const i=t.label||"tag";return l.jsxs("button",{type:"button",...c,className:`map-spot label-${i} hover-${t.hover||"glow"}${t.image?" has-image":""}${r?" is-locked":""}${n?" is-active":""} ${s}`,style:{left:`${t.x}%`,top:`${t.y}%`,"--map-spot-glow":t.glowColor||"#ffd86b","--map-spot-size":w(t)/100,...y(t),...c.style},children:[l.jsxs("span",{className:"map-spot-body",children:[t.image&&l.jsx("img",{className:"map-spot-art",src:t.image,alt:"",draggable:!1}),i!=="none"&&l.jsxs("span",{className:"map-spot-name",children:[r&&l.jsx(x,{"aria-hidden":"true"}),l.jsx("span",{children:e})]})]}),a]})}function T({spots:t,names:e,plainNames:r,visible:n,allowed:s,hoverIndex:a,hint:c,lockedLabel:i,groupLabel:p,onHover:u,onPick:g,onLocked:v}){return l.jsxs("div",{className:"map-scene-layer",role:"group","aria-label":p,"data-larch-ui":"map",children:[n.map(o=>{const f=!s(o);return l.jsx(S,{spot:t[o],name:e[o],locked:f,active:a===o,"data-larch-ui":"map-spot","data-index":o+1,"aria-disabled":f||void 0,"aria-label":f?`${r[o]||""} ${i}`.trim():r[o]||void 0,onMouseEnter:()=>u(o),onMouseLeave:()=>u(null),onFocus:()=>u(o),onBlur:()=>u(null),onClick:b=>{b.stopPropagation(),f?v(o):g(o)}},o)}),c&&l.jsx("div",{className:"map-spot-hint",role:"status",children:c.text},c.key)]})}const F="#0a0b0e",_=.87;function h(t){const e=t?.backgroundColor?.trim();return e&&/^#[0-9a-f]{6}$/i.test(e)?e.toLowerCase():e&&/^#[0-9a-f]{3}$/i.test(e)?`#${e.slice(1).split("").map(r=>r.repeat(2)).join("")}`.toLowerCase():F}function E(t,e){const r=Number(t?.backgroundOpacity);return Number.isFinite(r)?Math.min(1,Math.max(0,r)):e==="fullscreen"?0:_}function m(t){return[Number.parseInt(t.slice(1,3),16),Number.parseInt(t.slice(3,5),16),Number.parseInt(t.slice(5,7),16)]}function N(t){const e=m(t).map(r=>{const n=r/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4});return .2126*e[0]+.7152*e[1]+.0722*e[2]}function R(t){return N(h(t))>.179?"#17181c":"#ffffff"}function B(t,e){const r=h(t),n=E(t,e),[s,a,c]=m(r),i=R(t),p=i==="#ffffff"?"0 1px 3px rgba(0,0,0,.92)":"0 1px 2px rgba(255,255,255,.84)";return{"--vn-interactive-bg":`rgba(${s}, ${a}, ${c}, ${Number(n.toFixed(3))})`,"--vn-interactive-fg":i,"--vn-interactive-button-bg":i,"--vn-interactive-button-fg":i==="#ffffff"?"#16161a":"#ffffff","--vn-interactive-border":n===0?"transparent":i==="#ffffff"?"rgba(255,255,255,.18)":"rgba(23,24,28,.2)","--vn-interactive-text-shadow":p}}function O(t,e){return t?.buttonText?.trim()||e}function D(t,e){return t?.completionButtonText?.trim()||t?.buttonText?.trim()||e}const d="data-larch-speech-bridge",C=String.raw`(function(){
  'use strict';
  if(window.__larchSpeechBridge)return;
  window.__larchSpeechBridge=true;
  var instances=new Map();
  var sequence=0;

  function define(object,key,value){
    try{Object.defineProperty(object,key,{configurable:true,enumerable:true,value:value});}
    catch(_error){try{object[key]=value;}catch(_ignored){}}
  }

  function dispatch(instance,name,details){
    var event;
    try{event=new Event(name);}catch(_error){event=document.createEvent('Event');event.initEvent(name,false,false);}
    if(details)Object.keys(details).forEach(function(key){define(event,key,details[key]);});
    instance.dispatchEvent(event);
    var handler=instance['on'+name];
    if(typeof handler==='function')handler.call(instance,event);
  }

  function speechResults(raw){
    var results=(raw||[]).map(function(item){
      var result=(item.alternatives||[]).map(function(alternative){
        return {transcript:String(alternative.transcript||''),confidence:Number(alternative.confidence)||0};
      });
      define(result,'isFinal',Boolean(item.isFinal));
      define(result,'item',function(index){return result[index]||null;});
      return result;
    });
    define(results,'item',function(index){return results[index]||null;});
    return results;
  }

  class LarchSpeechRecognition extends EventTarget{
    constructor(){
      super();
      this.lang='';
      this.continuous=false;
      this.interimResults=false;
      this.maxAlternatives=1;
      this.onstart=null;
      this.onend=null;
      this.onresult=null;
      this.onerror=null;
      this.onaudiostart=null;
      this.onaudioend=null;
      this.onsoundstart=null;
      this.onsoundend=null;
      this.onspeechstart=null;
      this.onspeechend=null;
      this.onnomatch=null;
      this.__larchId='speech-'+Date.now().toString(36)+'-'+(++sequence).toString(36);
      instances.set(this.__larchId,this);
    }
    start(){
      instances.set(this.__larchId,this);
      parent.postMessage({type:'larch:speech:start',id:this.__larchId,lang:this.lang,continuous:this.continuous,interimResults:this.interimResults,maxAlternatives:this.maxAlternatives},'*');
    }
    stop(){parent.postMessage({type:'larch:speech:stop',id:this.__larchId},'*');}
    abort(){parent.postMessage({type:'larch:speech:abort',id:this.__larchId},'*');}
  }

  function installConstructor(name){
    try{Object.defineProperty(window,name,{configurable:true,writable:true,value:LarchSpeechRecognition});}
    catch(_error){try{window[name]=LarchSpeechRecognition;}catch(_ignored){}}
  }
  installConstructor('SpeechRecognition');
  installConstructor('webkitSpeechRecognition');

  function wrapPolicy(name){
    var original=document[name];
    var wrapped=Object.create(original||null);
    define(wrapped,'allowsFeature',function(feature){
      if(String(feature).toLowerCase()==='microphone')return true;
      if(original&&typeof original.allowsFeature==='function')return original.allowsFeature.apply(original,arguments);
      return false;
    });
    define(wrapped,'allowedFeatures',function(){
      var values=original&&typeof original.allowedFeatures==='function'?original.allowedFeatures.call(original):[];
      return values.indexOf('microphone')<0?values.concat('microphone'):values;
    });
    define(wrapped,'getAllowlistForFeature',function(feature){
      if(String(feature).toLowerCase()==='microphone')return ['*'];
      if(original&&typeof original.getAllowlistForFeature==='function')return original.getAllowlistForFeature.apply(original,arguments);
      return [];
    });
    try{Object.defineProperty(document,name,{configurable:true,value:wrapped});}
    catch(_error){if(original)try{original.allowsFeature=wrapped.allowsFeature;}catch(_ignored){}}
  }
  wrapPolicy('permissionsPolicy');
  wrapPolicy('featurePolicy');

  window.addEventListener('message',function(event){
    if(event.source!==parent)return;
    var data=event.data||{};
    if(data.type!=='larch:speech:event'||typeof data.id!=='string')return;
    var instance=instances.get(data.id);
    if(!instance)return;
    var details={};
    if(data.event==='result'){
      details.resultIndex=Number(data.resultIndex)||0;
      details.results=speechResults(data.results);
    }else if(data.event==='error'){
      details.error=String(data.error||'audio-capture');
      details.message=String(data.message||'');
    }
    dispatch(instance,String(data.event||''),details);
    if(data.event==='end')instances.delete(data.id);
  });
})();`;function V(t){if(!t||t.includes(d))return t||"";const e=`<script ${d}>${C}<\/script>`;return/^\s*<!doctype\b/i.test(t)?t.replace(/^(\s*<!doctype[^>]*>)/i,`$1${e}`):`${e}${t}`}function I(){if(typeof window>"u")return;const t=window;return t.SpeechRecognition||t.webkitSpeechRecognition}function $(t){const e=t.results,r=[],n=Math.max(0,Number(e?.length)||0);for(let s=0;s<n;s+=1){const a=e?.[s],c=[],i=Math.max(0,Number(a?.length)||0);for(let p=0;p<i;p+=1){const u=a?.[p];c.push({transcript:String(u?.transcript||""),confidence:Number.isFinite(Number(u?.confidence))?Number(u?.confidence):0})}r.push({isFinal:!!a?.isFinal,alternatives:c})}return r}function M(t){return typeof t=="string"&&t.length>0&&t.length<=120?t:""}function j(t){const e=t instanceof Error?t.name:"";return e==="NotAllowedError"||e==="SecurityError"?"not-allowed":e==="InvalidStateError"?"invalid-state":"audio-capture"}class z{constructor(e,r=I){this.frame=e,this.getConstructor=r}frame;getConstructor;active=new Map;handleMessage(e){if(!e||typeof e!="object")return!1;const r=e;if(!["larch:speech:start","larch:speech:stop","larch:speech:abort"].includes(String(r.type)))return!1;const n=M(r.id);return n&&(r.type==="larch:speech:start"?this.start(n,r):this.control(n,r.type==="larch:speech:stop"?"stop":"abort")),!0}dispose(){for(const e of this.active.values())try{e.abort()}catch{}this.active.clear()}post(e,r,n={}){this.frame()?.contentWindow?.postMessage({type:"larch:speech:event",id:e,event:r,...n},"*")}control(e,r){const n=this.active.get(e);if(n)try{n[r]()}catch{}}start(e,r){this.dispose();const n=this.getConstructor();if(!n){this.post(e,"error",{error:"not-supported",message:"Speech recognition is not supported by this browser."}),this.post(e,"end");return}const s=new n;s.lang=typeof r.lang=="string"?r.lang.slice(0,80):"",s.continuous=!!r.continuous,s.interimResults=!!r.interimResults,s.maxAlternatives=Math.max(1,Math.min(10,Number(r.maxAlternatives)||1)),s.onresult=a=>this.post(e,"result",{resultIndex:Math.max(0,Number(a.resultIndex)||0),results:$(a)}),s.onerror=a=>this.post(e,"error",{error:String(a.error||"audio-capture"),message:String(a.message||"")}),s.onend=()=>{this.active.delete(e),this.post(e,"end")},s.onstart=()=>this.post(e,"start");for(const a of["audiostart","audioend","soundstart","soundend","speechstart","speechend","nomatch"])s[`on${a}`]=()=>this.post(e,a);this.active.set(e,s);try{s.start()}catch(a){this.active.delete(e),this.post(e,"error",{error:j(a),message:a instanceof Error?a.message:""}),this.post(e,"end")}}}export{T as M,z as P,D as a,O as b,S as c,h as d,E as e,B as i,V as p};
