import{P as j,d as O}from"./pluginStorage-BE2b9AJY.js";import{k as v}from"./pluginManifest-MgDppFgk.js";const h={toast:null,addCards:"cards:write",updateCards:"cards:write",deleteCards:"cards:write",moveCards:"cards:write",setVariables:"variables:write",ensureVariables:"variables:write",setSettings:null,setStorage:null,openPanel:"ui:contribute",closePanel:null,theme:"theme:write"},p=(e,n=400)=>typeof e=="string"?e.slice(0,n):"",y=e=>Array.isArray(e)?e:[],b=e=>typeof e=="string"||typeof e=="number"||typeof e=="boolean"?e:void 0,S=new Set(["id","type","pluginId","pluginCardId","pluginHtml","pluginVersion","pluginName","pluginCardName","pluginReadVars","pluginWriteVars","miniGameHtml","miniGameDeferred","start"]),P=2e4;function k(e){if(!e||typeof e!="object")return null;const n={};for(const[u,i]of Object.entries(e).slice(0,40))S.has(u)||i!==void 0&&(n[u]=i);return!Object.keys(n).length||JSON.stringify(n).length>P?null:n}function V(e,n){const u=new Set(e.permissions),i=[],c=[];for(const f of y(n).slice(0,200)){const d=f||{},o=p(d.kind,40);if(!(o in h)){c.push(`不認得的動作「${o||"(空白)"}」`);continue}const m=h[o];if(m&&!u.has(m)){c.push(`「${o}」需要 ${m} 權限，這個擴充功能沒有宣告`);continue}switch(o){case"toast":{const t=p(d.message,200);t&&i.push({kind:o,message:t});break}case"addCards":{const t=y(d.cards).slice(0,100).map(r=>k(r)).filter(r=>!!r);t.length&&i.push({kind:o,cards:t,afterId:p(d.afterId,80)||void 0});break}case"updateCards":{const t=y(d.cards).slice(0,500).map(r=>{const s=r||{},a=p(s.id,80),l=k(s.patch);return a&&l?{id:a,patch:l}:null}).filter(r=>!!r);t.length&&i.push({kind:o,cards:t});break}case"deleteCards":{const t=y(d.ids).slice(0,200).map(r=>p(r,80)).filter(Boolean);t.length&&i.push({kind:o,ids:t});break}case"moveCards":{const t=y(d.positions).slice(0,500).map(r=>{const s=r||{},a=p(s.id,80),l=Number(s.x),g=Number(s.y);return a&&Number.isFinite(l)&&Number.isFinite(g)?{id:a,x:l,y:g}:null}).filter(r=>!!r);t.length&&i.push({kind:o,positions:t});break}case"setVariables":case"setSettings":{const t={};for(const[r,s]of Object.entries(d.values||{}).slice(0,60)){const a=b(s);a!==void 0&&(t[r.slice(0,60)]=typeof a=="string"?a.slice(0,2e3):a)}Object.keys(t).length&&i.push({kind:o,values:t});break}case"setStorage":{const t={};for(const[r,s]of Object.entries(d.values||{}).slice(0,j)){const a=r.slice(0,O);a&&(s===null?t[a]=null:(typeof s=="string"||typeof s=="number"||typeof s=="boolean")&&(t[a]=String(s)))}Object.keys(t).length&&i.push({kind:o,values:t});break}case"ensureVariables":{const t=[];for(const r of y(d.variables).slice(0,60)){const s=r||{},a=p(s.name,60).trim();if(!I.test(a)){c.push(`變數名稱「${a||"(空白)"}」無效，只能用文字、數字與底線，且不能以數字開頭`);continue}const l=b(s.defaultValue),g=s.type==="number"||s.type==="boolean"||s.type==="string"?s.type:typeof l=="number"?"number":typeof l=="boolean"?"boolean":"string",w=g==="number"?Number.isFinite(Number(l))?Number(l):0:g==="boolean"?l===!0||l==="true":typeof l=="string"?l.slice(0,2e3):l===void 0?"":String(l);t.push({name:a,type:g,defaultValue:w,label:p(s.label,80).trim()||void 0,description:p(s.description,200).trim()||void 0,scope:s.scope==="board"?"board":"project",...s.hidden===!0?{hidden:!0}:{}})}t.length&&i.push({kind:o,variables:t});break}case"openPanel":{const t=p(d.panelId,60),r=e.panels?.find(s=>s.id===t);r&&r.placement!=="settings"?i.push({kind:o,panelId:t}):c.push(r?`面板「${t}」只在專案設定裡出現，不能用 openPanel 打開`:`要打開的面板「${t}」不在這個擴充功能裡`);break}case"closePanel":i.push({kind:o});break;case"theme":{const t={};for(const[r,s]of Object.entries(d.tokens||{}).slice(0,40)){const a=r.trim(),l=p(s,80).trim();!/^--[a-z0-9-]{1,60}$/i.test(a)||!/^[#a-z0-9 ,.()%+-]{1,80}$/i.test(l)||/url\s*\(|expression|javascript:|@import/i.test(l)||(t[a]=l)}Object.keys(t).length&&i.push({kind:o,tokens:t});break}}}return{effects:i,rejected:c}}const I=/^[A-Za-z_\u3400-\u9fff][A-Za-z0-9_\u3400-\u9fff]{0,59}$/;function _(e,n,u,i,c){const f=t=>e.findIndex(r=>r.name===t&&(r.scope!=="board"||r.boardId===u)),d=[...e],o=[],m=[];for(const t of n){if(o.includes(t.name))continue;const r=f(t.name);if(r>=0){const a=d[r];if(c&&a.plugin===c&&!!a.hidden!=!!t.hidden){const{hidden:l,...g}=a;d[r]=t.hidden?{...g,hidden:!0}:g,m.push(t.name)}continue}const s=t.scope==="board";d.push({id:i(),name:t.name,label:t.label||t.name,type:t.type,defaultValue:t.defaultValue,description:t.description,scope:s?"board":"project",boardId:s?u:void 0,...c?{plugin:c}:{},...t.hidden?{hidden:!0}:{}}),o.push(t.name)}return{variables:d,added:o,changed:m}}function L(e){return{cards:e.cards.length,huds:e.huds?.length||0,commands:e.commands?.length||0,shortcuts:e.commands?.filter(n=>n.shortcut).length||0,panels:e.panels?.length||0,hooks:e.hooks?.length||0,theme:!!e.theme,editsProject:e.permissions.includes("cards:write"),runsOnSave:(e.hooks||[]).includes("project:save")}}const B={permission:'larch.openAssetPicker needs the "assets:read" permission in the manifest',surface:"larch.openAssetPicker only works in panels and settings pages, not in a worker or a card",panel:"larch.openAssetPicker only works while the panel is open",gesture:"larch.openAssetPicker must be called from a click or key press",busy:"An asset picker is already open",project:"The project changed before the picker opened",kind:`Unknown asset kind; use one of: ${v.join(", ")}`};function E(e){const n=e.requestId;if(typeof n!="string"||!/^[\w:.-]{1,80}$/.test(n))return null;const u=e.kind===void 0||e.kind===null||e.kind===""?"any":e.kind,i=v.includes(u),c=typeof e.title=="string"?e.title.replace(/[\u0000-\u001f\u007f]+/g," ").trim().slice(0,60):"";return{requestId:n,kind:i?u:"any",...c?{title:c}:{},...i?{}:{invalidKind:!0}}}function R({plugin:e,frame:n,request:u,busy:i,userActive:c,visiblePanel:f,currentProjectId:d}){if(n.pluginId!==e.id||n.kind!=="panel"&&n.kind!=="settings")return"surface";const o=(e.panels||[]).find(m=>m.id===n.viewId);return!o||n.kind==="settings"!=(o.placement==="settings")?"surface":e.permissions.includes("assets:read")?n.projectId!==d?"project":n.kind==="panel"&&(f?.pluginId!==e.id||f.panelId!==n.viewId)?"panel":u.invalidKind?"kind":i?"busy":c===!1?"gesture":null:"permission"}function U(e){return e.mediaKind==="other"||!e.url?null:{id:e.asset?.id||e.id,url:e.url,name:e.name,kind:e.mediaKind}}const N=e=>JSON.stringify(e).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"),x=`(function(seed){
  if (window.larch && window.larch.__bridge) return;
  var own = function(object, key){ return Object.prototype.hasOwnProperty.call(object, key); };
  var post = function(message){ try { parent.postMessage(message, '*'); } catch (error) {} };
  var data = Object.create(null);
  Object.keys(seed.storage || {}).forEach(function(key){ data[key] = String(seed.storage[key]); });
  var listeners = { init: [], update: [], storage: [] };
  var emit = function(name, payload){
    (listeners[name] || []).slice().forEach(function(listener){
      try { listener(payload); } catch (error) { setTimeout(function(){ throw error; }); }
    });
  };
  var makeStorage = function(persist){
    var store = persist ? data : Object.create(null);
    var api = {};
    var define = function(name, value){ Object.defineProperty(api, name, { value: value, configurable: true, writable: true, enumerable: false }); };
    define('getItem', function(key){ key = String(key); return own(store, key) ? store[key] : null; });
    define('setItem', function(key, value){
      key = String(key); value = String(value);
      if (store[key] === value) return;
      store[key] = value;
      if (persist) post({ type: 'larch:storage:set', key: key, value: value });
    });
    define('removeItem', function(key){
      key = String(key);
      if (!own(store, key)) return;
      delete store[key];
      if (persist) post({ type: 'larch:storage:remove', key: key });
    });
    define('clear', function(){
      var keys = Object.keys(store);
      keys.forEach(function(key){ delete store[key]; });
      if (persist && keys.length) post({ type: 'larch:storage:clear' });
    });
    define('key', function(index){ var keys = Object.keys(store); return index >= 0 && index < keys.length ? keys[index] : null; });
    Object.defineProperty(api, 'length', { get: function(){ return Object.keys(store).length; }, configurable: true, enumerable: false });
    if (typeof Proxy !== 'function') return api;
    // 跟真的 localStorage 一樣，localStorage.foo、localStorage['foo'] = 'x' 也要能用。
    return new Proxy(api, {
      get: function(target, prop){
        if (prop in target) return target[prop];
        if (typeof prop === 'string' && own(store, prop)) return store[prop];
        return undefined;
      },
      set: function(target, prop, value){
        if (typeof prop !== 'string' || prop in target) return false;
        target.setItem(prop, value);
        return true;
      },
      deleteProperty: function(target, prop){ if (typeof prop === 'string') target.removeItem(prop); return true; },
      has: function(target, prop){ return prop in target || (typeof prop === 'string' && own(store, prop)); },
      ownKeys: function(){ return Object.keys(store); },
      getOwnPropertyDescriptor: function(target, prop){
        if (typeof prop === 'string' && own(store, prop)) return { value: store[prop], writable: true, enumerable: true, configurable: true };
        return undefined;
      }
    });
  };
  var local = makeStorage(true);
  var session = makeStorage(false);
  var install = function(name, value){
    try { Object.defineProperty(window, name, { configurable: true, enumerable: true, get: function(){ return value; } }); } catch (error) {}
  };
  install('localStorage', local);
  install('sessionStorage', session);
  var apply = function(key, value){
    var oldValue = own(data, key) ? data[key] : null;
    if (value === null || value === undefined) delete data[key]; else data[key] = String(value);
    var newValue = own(data, key) ? data[key] : null;
    if (oldValue === newValue) return;
    try { window.dispatchEvent(new StorageEvent('storage', { key: key, oldValue: oldValue, newValue: newValue })); } catch (error) {}
    emit('storage', { key: key, oldValue: oldValue, newValue: newValue });
  };
  var api = {
    __bridge: 1,
    plugin: seed.plugin,
    surface: seed.surface,
    view: seed.view || null,
    locale: seed.locale,
    theme: seed.theme,
    project: seed.project || null,
    font: seed.font || null,
    getProjectFont: function(){ return api.font ? JSON.parse(JSON.stringify(api.font)) : null; },
    settings: Object.assign({}, seed.settings || {}),
    variables: {},
    storage: {
      get: function(key){ return local.getItem(key); },
      set: function(key, value){ local.setItem(key, value); },
      remove: function(key){ local.removeItem(key); },
      clear: function(){ local.clear(); },
      keys: function(){ return Object.keys(data); },
      all: function(){ return Object.assign({}, data); },
      getJSON: function(key, fallback){
        var raw = local.getItem(key);
        if (raw === null) return fallback;
        try { return JSON.parse(raw); } catch (error) { return fallback; }
      },
      setJSON: function(key, value){ local.setItem(key, JSON.stringify(value)); }
    },
    on: function(name, listener){
      if (!listeners[name] || typeof listener !== 'function') return function(){};
      listeners[name].push(listener);
      return function(){ var list = listeners[name]; var index = list.indexOf(listener); if (index >= 0) list.splice(index, 1); };
    },
    run: function(effects){ post({ type: 'larch:effects', effects: Array.isArray(effects) ? effects : [effects] }); },
    toast: function(message){ api.run({ kind: 'toast', message: String(message) }); },
    setSettings: function(values){ api.run({ kind: 'setSettings', values: values || {} }); },
    close: function(){ post({ type: 'larch:close' }); },
    resize: function(height){ post({ type: 'larch:resize', height: Number(height) || 0 }); },
    // 打開 Larch 的素材挑選視窗；挑中回 { id, url, name, kind }，取消回 null。宿主那一端會再檢查一次權限與點擊。
    openAssetPicker: function(options){
      options = options && typeof options === 'object' ? options : {};
      if (picking) return Promise.reject(new Error('An asset picker is already open'));
      var activation = typeof navigator === 'object' && navigator ? navigator.userActivation : null;
      if (activation && !activation.isActive) return Promise.reject(new Error('larch.openAssetPicker must be called from a click or key press'));
      var requestId = 'pick-' + (++pickCount) + '-' + Math.random().toString(36).slice(2, 10);
      return new Promise(function(resolve, reject){
        picking = { id: requestId, resolve: resolve, reject: reject };
        post({ type: 'larch:assets:pick', requestId: requestId, kind: options.kind || options.category || 'any', title: typeof options.title === 'string' ? options.title : undefined });
      });
    }
  };
  var picking = null, pickCount = 0;
  try { Object.defineProperty(window, 'larch', { value: api, configurable: true, writable: false }); } catch (error) { window.larch = api; }
  window.addEventListener('message', function(event){
    if (event.source !== parent) return;
    var message = event.data;
    if (!message || typeof message !== 'object') return;
    if (message.type === 'larch:storage:changed' && typeof message.key === 'string') { apply(message.key, message.value); return; }
    if (message.type === 'larch:assets:picked') {
      if (!picking || message.requestId !== picking.id) return;
      var request = picking; picking = null;
      if (typeof message.error === 'string') request.reject(new Error(message.error));
      else request.resolve(message.asset && typeof message.asset === 'object' ? { id: String(message.asset.id), url: String(message.asset.url), name: String(message.asset.name || ''), kind: String(message.asset.kind || '') } : null);
      return;
    }
    if (message.type === 'larch:storage:reset' && message.storage && typeof message.storage === 'object') {
      Object.keys(data).forEach(function(key){ if (!own(message.storage, key)) apply(key, null); });
      Object.keys(message.storage).forEach(function(key){ apply(key, message.storage[key]); });
      return;
    }
    if (message.type === 'larch:init' || message.type === 'larch:update') {
      if (message.settings && typeof message.settings === 'object') api.settings = Object.assign({}, message.settings);
      if (message.variables && typeof message.variables === 'object') api.variables = Object.assign({}, message.variables);
      if (typeof message.theme === 'string') { api.theme = message.theme; try { document.documentElement.dataset.larchTheme = message.theme; } catch (error) {} }
      if (typeof message.locale === 'string') api.locale = message.locale;
      if (message.project) api.project = message.project;
      if (message.font && typeof message.font === 'object') api.font = message.font;
      emit(message.type === 'larch:init' ? 'init' : 'update', message);
    }
  });
  // 沙盒沒有 allow-forms：瀏覽器在送出表單前就停下來，連 submit 事件都不發。AI 寫的面板
  // 很常用 <form onsubmit> 加 preventDefault()，所以這裡把「按送出鈕」與「在欄位按 Enter」
  // 補成一個 submit 事件（不會真的送出或換頁）。當場就發，讓 submit 處理器讀到的是按下
  // 那一刻的欄位內容。Larch 的沙盒永遠不給 allow-forms，所以不會跟瀏覽器自己的送出重複。
  var implicitForm = null;
  var submit = function(form, submitter){
    if (!form || !form.isConnected) return;
    var event;
    try { event = new SubmitEvent('submit', { bubbles: true, cancelable: true, submitter: submitter || null }); }
    catch (error) { event = document.createEvent('Event'); event.initEvent('submit', true, true); }
    form.dispatchEvent(event);
  };
  var submitButtonOf = function(form){
    var controls = form.elements;
    for (var index = 0; index < controls.length; index++) {
      var control = controls[index];
      var type = (control.getAttribute('type') || (control.tagName === 'BUTTON' ? 'submit' : '')).toLowerCase();
      if ((control.tagName === 'BUTTON' || control.tagName === 'INPUT') && (type === 'submit' || type === 'image')) return control;
    }
    return null;
  };
  document.addEventListener('click', function(event){
    if (event.defaultPrevented || !event.target || !event.target.closest) return;
    var button = event.target.closest('button, input[type="submit"], input[type="image"]');
    if (!button || !button.form || button.disabled) return;
    // 在欄位按 Enter 時，瀏覽器會再替預設按鈕補一次 click：那一次已經送過了。
    if (implicitForm === button.form) return;
    var type = (button.getAttribute('type') || (button.tagName === 'BUTTON' ? 'submit' : '')).toLowerCase();
    if (type === 'submit' || type === 'image') submit(button.form, button);
  });
  var TEXT_INPUTS = ['text', 'search', 'url', 'tel', 'email', 'password', 'number', 'date', 'time', 'datetime-local', 'month', 'week'];
  document.addEventListener('keydown', function(event){
    if (event.key !== 'Enter' || event.defaultPrevented || event.isComposing || event.keyCode === 229) return;
    var input = event.target;
    if (!input || input.tagName !== 'INPUT' || !input.form || TEXT_INPUTS.indexOf((input.type || 'text').toLowerCase()) < 0) return;
    var form = input.form, button = submitButtonOf(form);
    if (button && button.disabled) return;
    var fields = 0;
    for (var index = 0; index < form.elements.length; index++) {
      var control = form.elements[index];
      if (control.tagName === 'INPUT' && TEXT_INPUTS.indexOf((control.type || 'text').toLowerCase()) >= 0) fields++;
    }
    // 跟瀏覽器的隱式送出一樣：有送出鈕，或整張表單只有一個文字欄。
    if (!button && fields !== 1) return;
    implicitForm = form;
    setTimeout(function(){ if (implicitForm === form) implicitForm = null; }, 0);
    submit(form, button);
  });
  try { document.documentElement.dataset.larchTheme = seed.theme; } catch (error) {}
  // 嵌在專案設定裡的頁面跟著內容長高，不要在設定頁裡再捲一層。
  if (seed.surface === 'settings' && typeof ResizeObserver === 'function') {
    var lastHeight = 0, measuring = false;
    var measure = function(){
      measuring = false;
      // scrollHeight 至少等於 iframe 自己的高度，只會變高不會變矮；量 <html> 的實際大小才縮得回來。
      var height = Math.ceil(document.documentElement.getBoundingClientRect().height);
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      post({ type: 'larch:resize', height: height });
    };
    var schedule = function(){ if (!measuring) { measuring = true; requestAnimationFrame(measure); } };
    var observe = function(){ try { new ResizeObserver(schedule).observe(document.documentElement); if (document.body) new ResizeObserver(schedule).observe(document.body); } catch (error) {} schedule(); };
    if (document.body) observe(); else document.addEventListener('DOMContentLoaded', observe);
  }
  // 擴充功能沒送 larch:ready 也要拿得到 init：等它自己的腳本都跑完、監聽器掛好了再打招呼。
  var hello = function(){ post({ type: 'larch:bridge:loaded' }); };
  if (document.readyState === 'complete') setTimeout(hello, 0); else window.addEventListener('load', hello);
})`;function A(e){return`<script data-larch-bridge>${x}(${N(e)});<\/script>`}function q(e,n){const u=A(n),i=/<head(?:\s[^>]*)?>/i.exec(e);if(i)return e.slice(0,i.index+i[0].length)+u+e.slice(i.index+i[0].length);const c=/<html(?:\s[^>]*)?>/i.exec(e);if(c)return e.slice(0,c.index+c[0].length)+u+e.slice(c.index+c[0].length);const f=/<!doctype[^>]*>/i.exec(e);return f?e.slice(0,f.index+f[0].length)+u+e.slice(f.index+f[0].length):u+e}function F(e){if(!e||typeof e!="object"||Array.isArray(e))return null;const n=e;switch(n.type){case"larch:storage:set":return typeof n.key=="string"&&n.key&&typeof n.value=="string"?{type:n.type,key:n.key,value:n.value}:null;case"larch:storage:remove":return typeof n.key=="string"&&n.key?{type:n.type,key:n.key}:null;case"larch:storage:clear":case"larch:close":case"larch:bridge:loaded":case"larch:ready":return{type:n.type};case"larch:effects":return{type:n.type,effects:n.effects};case"larch:resize":return typeof n.height=="number"&&Number.isFinite(n.height)?{type:n.type,height:n.height}:null;case"larch:assets:pick":{const u=E(n);return u?{type:n.type,...u}:null}default:return null}}export{R as a,B as b,L as c,V as f,_ as m,U as p,F as r,q as w};
