import{inflateRaw as R}from"./compression-NJe3JlLV.js";import{z as F}from"./storedZip-BHsIf9m2.js";import{E as _}from"./pluginManifest-DtBNASjS.js";const I=400,K=40*1024*1024,G=300*1024,D={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",webp:"image/webp",gif:"image/gif",avif:"image/avif"},W={...D,svg:"image/svg+xml",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",m4a:"audio/mp4",woff2:"font/woff2",woff:"font/woff",ttf:"font/ttf",otf:"font/otf"},Y=["screenshots","gallery"],g=t=>new Error(t),A=t=>(/\.([a-z0-9]+)$/i.exec(t)?.[1]||"").toLowerCase(),N=t=>t.includes("/")?t.slice(0,t.lastIndexOf("/")):"",M=t=>t.slice(t.lastIndexOf("/")+1),C=t=>new TextDecoder("utf-8").decode(t).replace(/^﻿/,""),O=t=>t.split("/").some(r=>r==="__MACOSX"||r===".DS_Store"||r.startsWith("._")||r==="Thumbs.db"||r===".git"||r==="node_modules"),ee=t=>t.length>=4&&t[0]===80&&t[1]===75&&(t[2]===3||t[2]===5);function H(t){let r="";for(let p=0;p<t.length;p+=32768)r+=String.fromCharCode(...t.subarray(p,p+32768));return btoa(r)}function te(t){const r=new DataView(t.buffer,t.byteOffset,t.byteLength);let p=-1;for(let b=t.length-22;b>=Math.max(0,t.length-65557);b--)if(r.getUint32(b,!0)===101010256){p=b;break}if(p<0)throw g("這不是 Zip 檔，或檔案沒有下載完整。");const o=r.getUint16(p+10,!0);let n=r.getUint32(p+16,!0);if(o===65535||n===4294967295)throw g("Zip 檔太大了，請把擴充功能資料夾精簡後重新壓縮。");if(o>I)throw g(`Zip 裡有 ${o} 個檔案，上限是 ${I} 個。`);const l=new TextDecoder("utf-8"),f=new Map;let m=0;for(let b=0;b<o;b++){if(n+46>t.length||r.getUint32(n,!0)!==33639248)throw g("Zip 檔的目錄壞掉了，請重新壓縮一次。");const T=r.getUint16(n+8,!0),E=r.getUint16(n+10,!0),x=r.getUint32(n+20,!0),L=r.getUint32(n+24,!0),U=r.getUint16(n+28,!0),w=r.getUint32(n+42,!0),h=l.decode(t.subarray(n+46,n+46+U)).replace(/\\/g,"/");if(n+=46+U+r.getUint16(n+30,!0)+r.getUint16(n+32,!0),h.endsWith("/")||O(h))continue;if(h.startsWith("/")||/^[a-z]:/i.test(h)||h.split("/").includes(".."))throw g(`Zip 裡有不安全的路徑：${h}`);if(T&1)throw g(`「${h}」有加密，請改用沒有密碼的 Zip。`);if(m+=L,m>K)throw g("Zip 解開後超過 40 MB。大的圖片、音樂請放在專案素材，擴充功能裡只放程式。");if(w+30>t.length||r.getUint32(w,!0)!==67324752)throw g(`讀不到 Zip 裡的「${h}」，請重新壓縮一次。`);const $=w+30+r.getUint16(w+26,!0)+r.getUint16(w+28,!0),y=t.subarray($,$+x);if(y.length!==x)throw g(`Zip 裡的「${h}」不完整，請重新壓縮一次。`);if(E===0)f.set(h,y.slice());else if(E===8)try{f.set(h,R(y))}catch{throw g(`解不開 Zip 裡的「${h}」，請重新壓縮一次。`)}else throw g(`「${h}」用了不支援的壓縮方式，請用系統內建的「壓縮」重新打包。`)}return f}async function re(t){const r=t.filter(o=>!O(o.path));if(r.length>I)throw g(`資料夾裡有 ${r.length} 個檔案，上限是 ${I} 個。請拿掉 node_modules、圖檔原稿這類不需要的東西。`);if(r.reduce((o,n)=>o+n.file.size,0)>K)throw g("資料夾超過 40 MB。大的圖片、音樂請放在專案素材，擴充功能裡只放程式。");const p=new Map;for(const o of r)p.set(o.path.replace(/\\/g,"/").replace(/^\/+/,""),new Uint8Array(await o.file.arrayBuffer()));return p}async function ne(t){const r=t.filter(n=>!!(n&&typeof n=="object"&&"isDirectory"in n));if(!r.length||!r.some(n=>n.isDirectory))return null;const p=[],o=async n=>{if(p.length>I||O(n.fullPath))return;if(n.isFile&&n.file){p.push({path:n.fullPath.replace(/^\/+/,""),file:await new Promise((f,m)=>n.file(f,m))});return}if(!n.isDirectory||!n.createReader)return;const l=n.createReader();for(;;){const f=await new Promise((m,b)=>l.readEntries(m,b));if(!f.length)break;for(const m of f)await o(m)}};for(const n of r)await o(n);return p}function v(t,r){const p=r.trim();if(!p||/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(p))return null;let o=p.split(/[?#]/)[0];try{o=decodeURIComponent(o)}catch{}const n=(o.startsWith("/")?o.slice(1):t?`${t}/${o}`:o).split("/"),l=[];for(const f of n)if(!(!f||f==="."))if(f===".."){if(!l.length)return null;l.pop()}else l.push(f);return l.join("/")}function X(t){const r=f=>f.split("/").length,p=[...t.keys()].filter(f=>_.includes(M(f).toLowerCase())).sort((f,m)=>r(f)-r(m)||_.indexOf(M(f).toLowerCase())-_.indexOf(M(m).toLowerCase()));if(p.length)return p[0];const o=[...t.keys()].filter(f=>A(f)==="json"),n=Math.min(...o.map(r)),l=o.filter(f=>r(f)===n);if(l.length===1)return l[0];throw g("找不到 larch-plugin.json：請把 manifest 存成 larch-plugin.json，放在資料夾最上層。")}function oe(t){if(!t.size)throw g("資料夾是空的。");const r=X(t),p=N(r),o=new Map;for(const[e,s]of t)p?e.startsWith(`${p}/`)&&o.set(e.slice(p.length+1),s):o.set(e,s);const n=M(r);let l;try{const e=JSON.parse(C(o.get(n)));if(!e||typeof e!="object"||Array.isArray(e))throw new Error("最外層要是一個物件 { … }");l=e}catch(e){throw g(`${n} 不是正確的 JSON：${e instanceof Error?e.message:String(e)}`)}const f=[],m=[],b=e=>{f.includes(e)||f.push(e)},T=(e,s)=>{const c=o.get(e);return c?C(c):(b(`${s} 用到的 ${e} 不在資料夾裡`),null)},E=(e,s,c)=>{const i=v(e,s);if(!i)return null;const a=o.get(i);if(!a)return b(`${c} 用到的 ${i} 不在資料夾裡`),null;const d=W[A(i)];return d?a.length>G?(b(`${i} 有 ${Math.round(a.length/1024)} KB，超過 ${G/1024} KB 沒有內嵌；大的圖片、音樂請放在專案素材，用欄位傳進來。`),null):`data:${d};base64,${H(a)}`:null},x=(e,s,c)=>e.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi,(i,a,d)=>{const u=E(s,d,c);return u?`url(${a||'"'}${u}${a||'"'})`:i}),L=e=>{const s=N(e);let c=C(o.get(e));return c=c.replace(/<script\b([^>]*?)\ssrc\s*=\s*(["'])([^"']+)\2([^>]*)>\s*<\/script\s*>/gi,(i,a,d,u,k)=>{const j=v(s,u);if(!j)return i;const B=T(j,e);return B===null?i:`<script${`${a}${k}`.replace(/\s+/g," ").replace(/\s+$/,"")}>
${B.replace(/<\/script/gi,"<\\/script")}
<\/script>`}),c=c.replace(/<link\b[^>]*>/gi,i=>{if(!/\brel\s*=\s*["']?stylesheet/i.test(i))return i;const a=/\bhref\s*=\s*(["'])([^"']+)\1/i.exec(i)?.[2],d=a?v(s,a):null;if(!d)return i;const u=T(d,e);return u===null?i:`<style>
${x(u,N(d),d).replace(/<\/style/gi,"<\\/style")}
</style>`}),c=c.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,(i,a,d,u)=>a+x(d,s,e)+u),c=c.replace(/(<(?:img|audio|video|source|image|input|track)\b[^>]*?\s(?:src|poster|href|xlink:href)\s*=\s*)(["'])([^"']+)\2/gi,(i,a,d,u)=>{const k=E(s,u,e);return k?`${a}${d}${k}${d}`:i}),c=c.replace(/(\sstyle\s*=\s*)(?:"([^"]*)"|'([^']*)')/gi,(i,a,d,u)=>{const k=d??u??"";if(!/url\(/i.test(k))return i;const j=x(k,s,e);return d!==void 0?`${a}"${j.replace(/"/g,"'")}"`:`${a}'${j.replace(/'/g,'"')}'`}),c},U=(e,s,c)=>{const i=typeof e.html=="string"?e.html.trim():"";if(i&&(i.includes("<")||!/\.html?$/i.test(i)))return;const a=i?v("",i):c.find(d=>o.has(d))||null;if(a){if(!o.has(a))throw g(`${n} 指到的 ${a} 不在資料夾裡`);e.html=L(a),m.push({field:s,path:a})}};for(const[e,s,c]of[["cards","cards","卡片"],["panels","panels","面板"],["huds","huds","常駐 UI"]]){const i=l[e];if(Array.isArray(i))for(const a of i){if(!a||typeof a!="object")continue;const d=a,u=typeof d.id=="string"?d.id:"",k=String(d.name||d.title||u||"");U(d,`${c}「${k}」`,u?[`${s}/${u}.html`,`${s}/${u}/index.html`]:[])}}const w=typeof l.worker=="string"?l.worker.trim():"";if(!w||!w.includes("<")&&/\.(?:html?|js)$/i.test(w)){const e=w?v("",w):["worker.html","worker.js","worker/index.html"].find(s=>o.has(s))||null;if(e){if(!o.has(e))throw g(`${n} 指到的 ${e} 不在資料夾裡`);l.worker=A(e)==="js"?`<!doctype html>
<html><head><meta charset="utf-8"></head><body><script>
${C(o.get(e)).replace(/<\/script/gi,"<\\/script")}
<\/script></body></html>`:L(e),m.push({field:"worker",path:e})}}const h=(e,s,c)=>{const i=o.get(e),a=D[A(e)];return!i||!a?null:{path:e,blob:new Blob([i],{type:a}),...s?{caption:s}:{},...c?{captionEn:c}:{}}};let $;if(typeof l.cover=="string"&&l.cover.trim()&&!/^(?:https?:|\/)/i.test(l.cover.trim())){const e=v("",l.cover);$=e&&h(e)||void 0,$||b(`找不到縮圖 ${l.cover}（要是 PNG、JPG、WebP 或 GIF）`),delete l.cover}else if(!l.cover){const e=["png","jpg","jpeg","webp","gif"].map(s=>`cover.${s}`).find(s=>o.has(s));e&&($=h(e)||void 0)}const y=[],S=[],Z=new Set;if(Array.isArray(l.gallery))for(const e of l.gallery){const s=e&&typeof e=="object"?e:{url:e},c=typeof s.url=="string"?s.url.trim():"",i=typeof s.caption=="string"?s.caption.trim():void 0,a=typeof s.captionEn=="string"?s.captionEn.trim():void 0;if(!c)continue;if(/^(?:https:\/\/|\/(?!\/))/i.test(c)){S.push({url:c,...i?{caption:i}:{},...a?{captionEn:a}:{}});continue}const d=v("",c),u=d?h(d,i,a):null;u&&d?(y.push(u),Z.add(d)):b(`找不到截圖 ${c}（要是 PNG、JPG、WebP 或 GIF）`)}const J=[...o.keys()].filter(e=>Y.includes(e.split("/")[0])&&D[A(e)]&&!Z.has(e)).sort((e,s)=>e.localeCompare(s,void 0,{numeric:!0}));for(const e of J){const s=h(e);s&&y.push(s)}const P=Math.max(0,12-S.length);return y.length>P&&(b(`商店最多放 12 張截圖，只取前 ${P} 張。`),y.length=P),S.length?l.gallery=S:delete l.gallery,{manifest:l,manifestPath:n,cover:$,screenshots:y,remoteGallery:S,parts:m,warnings:f,fileCount:o.size}}function se(t){const r=m=>new TextEncoder().encode(m),p={id:"my-task-board",name:t?"任務看板":"Task board",version:"0.1.0",author:t?"你的名字":"Your name",description:t?"左上角專案列多一顆按鈕，打開任務看板；任務存進專案，換電腦也還在。":"Adds a button to the project bar that opens a task board. Tasks are saved into the project.",overview:t?"把待辦事項放在專案旁邊：新增、勾選、刪除，資料跟著專案的雲端存檔走。":"Keep a to-do list next to your project: add, tick and delete tasks; they travel with the project’s cloud saves.",features:t?["Alt+Shift+K 快速打開","任務存進專案，換電腦也還在","跟著編輯器換深色、淺色"]:["Open it with Alt+Shift+K","Tasks are saved into the project","Follows the editor’s light and dark theme"],categories:["tool"],permissions:["ui:contribute"],icon:"layers",commands:[{id:"open-board",title:t?"任務看板":"Task board",icon:"layers",surfaces:["navbar"],shortcut:"Alt+Shift+K",panel:"board"}],panels:[{id:"board",title:t?"任務看板":"Task board",size:"medium",html:"panels/board.html"}]},o=`<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="board.css">
</head><body>
<main>
  <h1>${t?"任務看板":"Task board"}</h1>
  <form id="add"><input id="title" placeholder="${t?"新增一件事…":"Add a task…"}" autocomplete="off"><button>${t?"新增":"Add"}</button></form>
  <ul id="list"></ul>
</main>
<script src="board.js"><\/script>
</body></html>
`,n=`:root { color-scheme: light; --bg: #fbfbf9; --ink: #1d1d1b; --line: #deded8; --muted: #6b6b66; }
:root[data-larch-theme="dark"] { color-scheme: dark; --bg: #1b1c19; --ink: #f1f1ed; --line: #3a3b36; --muted: #a9a9a2; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 14px/1.5 system-ui, sans-serif; }
main { padding: 20px; }
h1 { margin: 0 0 14px; font-size: 18px; }
form { display: flex; gap: 8px; }
form input { flex: 1; min-width: 0; height: 36px; padding: 0 10px; border: 1px solid var(--line); border-radius: 9px; background: transparent; color: inherit; font: inherit; }
form button { height: 36px; padding: 0 14px; border: 0; border-radius: 9px; background: var(--ink); color: var(--bg); font: inherit; font-weight: 700; cursor: pointer; }
ul { display: grid; gap: 6px; margin: 14px 0 0; padding: 0; list-style: none; }
li { display: flex; align-items: center; gap: 9px; padding: 9px 11px; border: 1px solid var(--line); border-radius: 10px; }
li input { width: 16px; height: 16px; margin: 0; accent-color: #2f6b3d; }
li.done span { color: var(--muted); text-decoration: line-through; }
li span { flex: 1; }
li button { height: 28px; padding: 0 10px; border: 1px solid var(--line); border-radius: 8px; background: transparent; color: var(--muted); font: inherit; font-weight: 600; cursor: pointer; }
`,l=`// localStorage 會存進這個專案（Larch 的橋接層代管），換電腦也還在。
const KEY = 'tasks';
const list = document.getElementById('list');
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const save = (tasks) => localStorage.setItem(KEY, JSON.stringify(tasks));
function render() {
  list.textContent = '';
  for (const task of load()) {
    const item = document.createElement('li');
    item.className = task.done ? 'done' : '';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = task.done;
    box.onchange = () => { save(load().map((each) => each.id === task.id ? { ...each, done: box.checked } : each)); render(); };
    const label = document.createElement('span');
    label.textContent = task.title;
    const remove = document.createElement('button');
    remove.textContent = '${t?"刪除":"Delete"}';
    remove.onclick = () => { save(load().filter((each) => each.id !== task.id)); render(); };
    item.append(box, label, remove);
    list.append(item);
  }
}
document.getElementById('add').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('title');
  const title = input.value.trim();
  if (!title) return;
  save([...load(), { id: Date.now().toString(36), title, done: false }]);
  input.value = '';
  render();
});
window.addEventListener('storage', render);
render();
parent.postMessage({ type: 'larch:ready' }, '*');
`,f=t?`# Larch 擴充功能資料夾

整個資料夾壓成 Zip（或在發布頁直接選這個資料夾）就能放進 Larch：

- larch-plugin.json：manifest。卡片、面板、常駐 UI 的 html 可以寫檔名，例如 "html": "panels/board.html"。
  沒寫的話會照 cards/<id>.html、panels/<id>.html、huds/<id>.html 找；worker 找 worker.html 或 worker.js。
- HTML 裡的 <script src>、<link rel="stylesheet">、圖片、字型、CSS url() 只要指向資料夾裡的檔案，都會自動內嵌。
  JS 不要用 import 互相引用，請用多個 <script src> 依序載入。
- cover.png：市集縮圖（3:2 橫式）。
- screenshots/：商店截圖，照檔名排序（01.png、02.png…），最多 12 張。
  要加說明的話，在 larch-plugin.json 寫 "gallery": [{ "url": "screenshots/01.png", "caption": "說明" }]。

完整規格請在發布頁按「複製規格書」。
`:`# Larch plugin folder

Zip this whole folder (or pick the folder in the publish window) to bring it into Larch:

- larch-plugin.json: the manifest. Card, panel and HUD html can be a file name, e.g. "html": "panels/board.html".
  Left out, Larch looks for cards/<id>.html, panels/<id>.html and huds/<id>.html; the worker is worker.html or worker.js.
- <script src>, <link rel="stylesheet">, images, fonts and CSS url() inside the HTML are inlined when they point at files in the folder.
  Don't use import between JS files; load several <script src> in order instead.
- cover.png: the marketplace cover (3:2 landscape).
- screenshots/: store screenshots, ordered by file name (01.png, 02.png…), up to 12.
  For captions, add "gallery": [{ "url": "screenshots/01.png", "caption": "…" }] to larch-plugin.json.

Copy the full spec with “Copy spec” in the publish window.
`;return F({"my-task-board/larch-plugin.json":r(`${JSON.stringify(p,null,2)}
`),"my-task-board/README.md":r(f),"my-task-board/panels/board.html":r(o),"my-task-board/panels/board.css":r(n),"my-task-board/panels/board.js":r(l)})}export{oe as buildPluginPackage,ee as isZipData,se as pluginPackageTemplate,ne as readDroppedEntries,re as readPluginFiles,te as readPluginZip};
