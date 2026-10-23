const d="#0a0b0e";function f(t){const e=t?.backgroundColor?.trim();return e&&/^#[0-9a-f]{6}$/i.test(e)?e.toLowerCase():e&&/^#[0-9a-f]{3}$/i.test(e)?`#${e.slice(1).split("").map(n=>n.repeat(2)).join("")}`.toLowerCase():d}function h(t,e){const n=Number(t?.backgroundOpacity);return Number.isFinite(n)?Math.min(1,Math.max(0,n)):e==="fullscreen"?0:.87}function p(t){return[Number.parseInt(t.slice(1,3),16),Number.parseInt(t.slice(3,5),16),Number.parseInt(t.slice(5,7),16)]}function g(t){const e=p(t).map(n=>{const r=n/255;return r<=.04045?r/12.92:((r+.055)/1.055)**2.4});return .2126*e[0]+.7152*e[1]+.0722*e[2]}function m(t){return g(f(t))>.179?"#17181c":"#ffffff"}function _(t,e){const n=f(t),r=h(t,e),[a,i,c]=p(n),s=m(t),o=s==="#ffffff"?"0 1px 3px rgba(0,0,0,.92)":"0 1px 2px rgba(255,255,255,.84)";return{"--vn-interactive-bg":`rgba(${a}, ${i}, ${c}, ${Number(r.toFixed(3))})`,"--vn-interactive-fg":s,"--vn-interactive-button-bg":s,"--vn-interactive-button-fg":s==="#ffffff"?"#16161a":"#ffffff","--vn-interactive-border":r===0?"transparent":s==="#ffffff"?"rgba(255,255,255,.18)":"rgba(23,24,28,.2)","--vn-interactive-text-shadow":o}}function x(t,e){return t?.buttonText?.trim()||e}function S(t,e){return t?.completionButtonText?.trim()||t?.buttonText?.trim()||e}const l="data-larch-speech-bridge",v=String.raw`(function(){
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
})();`;function E(t){if(!t||t.includes(l))return t||"";const e=`<script ${l}>${v}<\/script>`;return/^\s*<!doctype\b/i.test(t)?t.replace(/^(\s*<!doctype[^>]*>)/i,`$1${e}`):`${e}${t}`}function b(){if(typeof window>"u")return;const t=window;return t.SpeechRecognition||t.webkitSpeechRecognition}function w(t){const e=t.results,n=[],r=Math.max(0,Number(e?.length)||0);for(let a=0;a<r;a+=1){const i=e?.[a],c=[],s=Math.max(0,Number(i?.length)||0);for(let o=0;o<s;o+=1){const u=i?.[o];c.push({transcript:String(u?.transcript||""),confidence:Number.isFinite(Number(u?.confidence))?Number(u?.confidence):0})}n.push({isFinal:!!i?.isFinal,alternatives:c})}return n}function y(t){return typeof t=="string"&&t.length>0&&t.length<=120?t:""}function F(t){const e=t instanceof Error?t.name:"";return e==="NotAllowedError"||e==="SecurityError"?"not-allowed":e==="InvalidStateError"?"invalid-state":"audio-capture"}class I{constructor(e,n=b){this.frame=e,this.getConstructor=n}frame;getConstructor;active=new Map;handleMessage(e){if(!e||typeof e!="object")return!1;const n=e;if(!["larch:speech:start","larch:speech:stop","larch:speech:abort"].includes(String(n.type)))return!1;const r=y(n.id);return r&&(n.type==="larch:speech:start"?this.start(r,n):this.control(r,n.type==="larch:speech:stop"?"stop":"abort")),!0}dispose(){for(const e of this.active.values())try{e.abort()}catch{}this.active.clear()}post(e,n,r={}){this.frame()?.contentWindow?.postMessage({type:"larch:speech:event",id:e,event:n,...r},"*")}control(e,n){const r=this.active.get(e);if(r)try{r[n]()}catch{}}start(e,n){this.dispose();const r=this.getConstructor();if(!r){this.post(e,"error",{error:"not-supported",message:"Speech recognition is not supported by this browser."}),this.post(e,"end");return}const a=new r;a.lang=typeof n.lang=="string"?n.lang.slice(0,80):"",a.continuous=!!n.continuous,a.interimResults=!!n.interimResults,a.maxAlternatives=Math.max(1,Math.min(10,Number(n.maxAlternatives)||1)),a.onresult=i=>this.post(e,"result",{resultIndex:Math.max(0,Number(i.resultIndex)||0),results:w(i)}),a.onerror=i=>this.post(e,"error",{error:String(i.error||"audio-capture"),message:String(i.message||"")}),a.onend=()=>{this.active.delete(e),this.post(e,"end")},a.onstart=()=>this.post(e,"start");for(const i of["audiostart","audioend","soundstart","soundend","speechstart","speechend","nomatch"])a[`on${i}`]=()=>this.post(e,i);this.active.set(e,a);try{a.start()}catch(i){this.active.delete(e),this.post(e,"error",{error:F(i),message:i instanceof Error?i.message:""}),this.post(e,"end")}}}export{I as P,S as a,x as b,f as c,h as d,_ as i,E as p};
