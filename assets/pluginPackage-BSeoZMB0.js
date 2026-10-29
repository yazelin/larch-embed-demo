import{inflateRaw as R}from"./compression-NJe3JlLV.js";import{z as F}from"./storedZip-BHsIf9m2.js";import{ey as _}from"./store-YxykOFBo.js";import"./rpg-core-DN6dM24D.js";import"./index-Bs7J9eks.js";import"./preload-helper-BXl3LOEh.js";import"./react-core-CuKebU_E.js";import"./motion-engine-CNzg_hOY.js";import"./larch-math-Drr7IFNz.js";import"./builtInPropThumbnails.generated-HzKuy-AN.js";import"./persistence-DGvRRu3C.js";import"./cacheJanitor-C9c5twik.js";import"./flow-engine-CDPGInjf.js";import"./uiSkills-CIgnuI_Z.js";import"./billingStatus-CWWbavpD.js";import"./coins-BVGc2fVI.js";const I=400,K=40*1024*1024,G=300*1024,D={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",webp:"image/webp",gif:"image/gif",avif:"image/avif"},W={...D,svg:"image/svg+xml",mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",m4a:"audio/mp4",woff2:"font/woff2",woff:"font/woff",ttf:"font/ttf",otf:"font/otf"},Y=["screenshots","gallery"],m=e=>new Error(e),A=e=>(/\.([a-z0-9]+)$/i.exec(e)?.[1]||"").toLowerCase(),N=e=>e.includes("/")?e.slice(0,e.lastIndexOf("/")):"",M=e=>e.slice(e.lastIndexOf("/")+1),C=e=>new TextDecoder("utf-8").decode(e).replace(/^﻿/,""),O=e=>e.split("/").some(r=>r==="__MACOSX"||r===".DS_Store"||r.startsWith("._")||r==="Thumbs.db"||r===".git"||r==="node_modules"),ut=e=>e.length>=4&&e[0]===80&&e[1]===75&&(e[2]===3||e[2]===5);function H(e){let r="";for(let f=0;f<e.length;f+=32768)r+=String.fromCharCode(...e.subarray(f,f+32768));return btoa(r)}function ht(e){const r=new DataView(e.buffer,e.byteOffset,e.byteLength);let f=-1;for(let b=e.length-22;b>=Math.max(0,e.length-65557);b--)if(r.getUint32(b,!0)===101010256){f=b;break}if(f<0)throw m("這不是 Zip 檔，或檔案沒有下載完整。");const o=r.getUint16(f+10,!0);let n=r.getUint32(f+16,!0);if(o===65535||n===4294967295)throw m("Zip 檔太大了，請把擴充功能資料夾精簡後重新壓縮。");if(o>I)throw m(`Zip 裡有 ${o} 個檔案，上限是 ${I} 個。`);const l=new TextDecoder("utf-8"),p=new Map;let g=0;for(let b=0;b<o;b++){if(n+46>e.length||r.getUint32(n,!0)!==33639248)throw m("Zip 檔的目錄壞掉了，請重新壓縮一次。");const T=r.getUint16(n+8,!0),S=r.getUint16(n+10,!0),x=r.getUint32(n+20,!0),L=r.getUint32(n+24,!0),U=r.getUint16(n+28,!0),w=r.getUint32(n+42,!0),h=l.decode(e.subarray(n+46,n+46+U)).replace(/\\/g,"/");if(n+=46+U+r.getUint16(n+30,!0)+r.getUint16(n+32,!0),h.endsWith("/")||O(h))continue;if(h.startsWith("/")||/^[a-z]:/i.test(h)||h.split("/").includes(".."))throw m(`Zip 裡有不安全的路徑：${h}`);if(T&1)throw m(`「${h}」有加密，請改用沒有密碼的 Zip。`);if(g+=L,g>K)throw m("Zip 解開後超過 40 MB。大的圖片、音樂請放在專案素材，擴充功能裡只放程式。");if(w+30>e.length||r.getUint32(w,!0)!==67324752)throw m(`讀不到 Zip 裡的「${h}」，請重新壓縮一次。`);const $=w+30+r.getUint16(w+26,!0)+r.getUint16(w+28,!0),y=e.subarray($,$+x);if(y.length!==x)throw m(`Zip 裡的「${h}」不完整，請重新壓縮一次。`);if(S===0)p.set(h,y.slice());else if(S===8)try{p.set(h,R(y))}catch{throw m(`解不開 Zip 裡的「${h}」，請重新壓縮一次。`)}else throw m(`「${h}」用了不支援的壓縮方式，請用系統內建的「壓縮」重新打包。`)}return p}async function mt(e){const r=e.filter(o=>!O(o.path));if(r.length>I)throw m(`資料夾裡有 ${r.length} 個檔案，上限是 ${I} 個。請拿掉 node_modules、圖檔原稿這類不需要的東西。`);if(r.reduce((o,n)=>o+n.file.size,0)>K)throw m("資料夾超過 40 MB。大的圖片、音樂請放在專案素材，擴充功能裡只放程式。");const f=new Map;for(const o of r)f.set(o.path.replace(/\\/g,"/").replace(/^\/+/,""),new Uint8Array(await o.file.arrayBuffer()));return f}async function gt(e){const r=e.filter(n=>!!(n&&typeof n=="object"&&"isDirectory"in n));if(!r.length||!r.some(n=>n.isDirectory))return null;const f=[],o=async n=>{if(f.length>I||O(n.fullPath))return;if(n.isFile&&n.file){f.push({path:n.fullPath.replace(/^\/+/,""),file:await new Promise((p,g)=>n.file(p,g))});return}if(!n.isDirectory||!n.createReader)return;const l=n.createReader();for(;;){const p=await new Promise((g,b)=>l.readEntries(g,b));if(!p.length)break;for(const g of p)await o(g)}};for(const n of r)await o(n);return f}function v(e,r){const f=r.trim();if(!f||/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(f))return null;let o=f.split(/[?#]/)[0];try{o=decodeURIComponent(o)}catch{}const n=(o.startsWith("/")?o.slice(1):e?`${e}/${o}`:o).split("/"),l=[];for(const p of n)if(!(!p||p==="."))if(p===".."){if(!l.length)return null;l.pop()}else l.push(p);return l.join("/")}function X(e){const r=p=>p.split("/").length,f=[...e.keys()].filter(p=>_.includes(M(p).toLowerCase())).sort((p,g)=>r(p)-r(g)||_.indexOf(M(p).toLowerCase())-_.indexOf(M(g).toLowerCase()));if(f.length)return f[0];const o=[...e.keys()].filter(p=>A(p)==="json"),n=Math.min(...o.map(r)),l=o.filter(p=>r(p)===n);if(l.length===1)return l[0];throw m("找不到 larch-plugin.json：請把 manifest 存成 larch-plugin.json，放在資料夾最上層。")}function bt(e){if(!e.size)throw m("資料夾是空的。");const r=X(e),f=N(r),o=new Map;for(const[t,s]of e)f?t.startsWith(`${f}/`)&&o.set(t.slice(f.length+1),s):o.set(t,s);const n=M(r);let l;try{const t=JSON.parse(C(o.get(n)));if(!t||typeof t!="object"||Array.isArray(t))throw new Error("最外層要是一個物件 { … }");l=t}catch(t){throw m(`${n} 不是正確的 JSON：${t instanceof Error?t.message:String(t)}`)}const p=[],g=[],b=t=>{p.includes(t)||p.push(t)},T=(t,s)=>{const c=o.get(t);return c?C(c):(b(`${s} 用到的 ${t} 不在資料夾裡`),null)},S=(t,s,c)=>{const i=v(t,s);if(!i)return null;const a=o.get(i);if(!a)return b(`${c} 用到的 ${i} 不在資料夾裡`),null;const d=W[A(i)];return d?a.length>G?(b(`${i} 有 ${Math.round(a.length/1024)} KB，超過 ${G/1024} KB 沒有內嵌；大的圖片、音樂請放在專案素材，用欄位傳進來。`),null):`data:${d};base64,${H(a)}`:null},x=(t,s,c)=>t.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi,(i,a,d)=>{const u=S(s,d,c);return u?`url(${a||'"'}${u}${a||'"'})`:i}),L=t=>{const s=N(t);let c=C(o.get(t));return c=c.replace(/<script\b([^>]*?)\ssrc\s*=\s*(["'])([^"']+)\2([^>]*)>\s*<\/script\s*>/gi,(i,a,d,u,k)=>{const E=v(s,u);if(!E)return i;const B=T(E,t);return B===null?i:`<script${`${a}${k}`.replace(/\s+/g," ").replace(/\s+$/,"")}>
${B.replace(/<\/script/gi,"<\\/script")}
<\/script>`}),c=c.replace(/<link\b[^>]*>/gi,i=>{if(!/\brel\s*=\s*["']?stylesheet/i.test(i))return i;const a=/\bhref\s*=\s*(["'])([^"']+)\1/i.exec(i)?.[2],d=a?v(s,a):null;if(!d)return i;const u=T(d,t);return u===null?i:`<style>
${x(u,N(d),d).replace(/<\/style/gi,"<\\/style")}
</style>`}),c=c.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,(i,a,d,u)=>a+x(d,s,t)+u),c=c.replace(/(<(?:img|audio|video|source|image|input|track)\b[^>]*?\s(?:src|poster|href|xlink:href)\s*=\s*)(["'])([^"']+)\2/gi,(i,a,d,u)=>{const k=S(s,u,t);return k?`${a}${d}${k}${d}`:i}),c=c.replace(/(\sstyle\s*=\s*)(?:"([^"]*)"|'([^']*)')/gi,(i,a,d,u)=>{const k=d??u??"";if(!/url\(/i.test(k))return i;const E=x(k,s,t);return d!==void 0?`${a}"${E.replace(/"/g,"'")}"`:`${a}'${E.replace(/'/g,'"')}'`}),c},U=(t,s,c)=>{const i=typeof t.html=="string"?t.html.trim():"";if(i&&(i.includes("<")||!/\.html?$/i.test(i)))return;const a=i?v("",i):c.find(d=>o.has(d))||null;if(a){if(!o.has(a))throw m(`${n} 指到的 ${a} 不在資料夾裡`);t.html=L(a),g.push({field:s,path:a})}};for(const[t,s,c]of[["cards","cards","卡片"],["panels","panels","面板"],["huds","huds","常駐 UI"]]){const i=l[t];if(Array.isArray(i))for(const a of i){if(!a||typeof a!="object")continue;const d=a,u=typeof d.id=="string"?d.id:"",k=String(d.name||d.title||u||"");U(d,`${c}「${k}」`,u?[`${s}/${u}.html`,`${s}/${u}/index.html`]:[])}}const w=typeof l.worker=="string"?l.worker.trim():"";if(!w||!w.includes("<")&&/\.(?:html?|js)$/i.test(w)){const t=w?v("",w):["worker.html","worker.js","worker/index.html"].find(s=>o.has(s))||null;if(t){if(!o.has(t))throw m(`${n} 指到的 ${t} 不在資料夾裡`);l.worker=A(t)==="js"?`<!doctype html>
<html><head><meta charset="utf-8"></head><body><script>
${C(o.get(t)).replace(/<\/script/gi,"<\\/script")}
<\/script></body></html>`:L(t),g.push({field:"worker",path:t})}}const h=(t,s,c)=>{const i=o.get(t),a=D[A(t)];return!i||!a?null:{path:t,blob:new Blob([i],{type:a}),...s?{caption:s}:{},...c?{captionEn:c}:{}}};let $;if(typeof l.cover=="string"&&l.cover.trim()&&!/^(?:https?:|\/)/i.test(l.cover.trim())){const t=v("",l.cover);$=t&&h(t)||void 0,$||b(`找不到縮圖 ${l.cover}（要是 PNG、JPG、WebP 或 GIF）`),delete l.cover}else if(!l.cover){const t=["png","jpg","jpeg","webp","gif"].map(s=>`cover.${s}`).find(s=>o.has(s));t&&($=h(t)||void 0)}const y=[],j=[],Z=new Set;if(Array.isArray(l.gallery))for(const t of l.gallery){const s=t&&typeof t=="object"?t:{url:t},c=typeof s.url=="string"?s.url.trim():"",i=typeof s.caption=="string"?s.caption.trim():void 0,a=typeof s.captionEn=="string"?s.captionEn.trim():void 0;if(!c)continue;if(/^(?:https:\/\/|\/(?!\/))/i.test(c)){j.push({url:c,...i?{caption:i}:{},...a?{captionEn:a}:{}});continue}const d=v("",c),u=d?h(d,i,a):null;u&&d?(y.push(u),Z.add(d)):b(`找不到截圖 ${c}（要是 PNG、JPG、WebP 或 GIF）`)}const J=[...o.keys()].filter(t=>Y.includes(t.split("/")[0])&&D[A(t)]&&!Z.has(t)).sort((t,s)=>t.localeCompare(s,void 0,{numeric:!0}));for(const t of J){const s=h(t);s&&y.push(s)}const P=Math.max(0,12-j.length);return y.length>P&&(b(`商店最多放 12 張截圖，只取前 ${P} 張。`),y.length=P),j.length?l.gallery=j:delete l.gallery,{manifest:l,manifestPath:n,cover:$,screenshots:y,remoteGallery:j,parts:g,warnings:p,fileCount:o.size}}function wt(e){const r=g=>new TextEncoder().encode(g),f={id:"my-task-board",name:e?"任務看板":"Task board",version:"0.1.0",author:e?"你的名字":"Your name",description:e?"左上角專案列多一顆按鈕，打開任務看板；任務存進專案，換電腦也還在。":"Adds a button to the project bar that opens a task board. Tasks are saved into the project.",overview:e?"把待辦事項放在專案旁邊：新增、勾選、刪除，資料跟著專案的雲端存檔走。":"Keep a to-do list next to your project: add, tick and delete tasks; they travel with the project’s cloud saves.",features:e?["Alt+Shift+K 快速打開","任務存進專案，換電腦也還在","跟著編輯器換深色、淺色"]:["Open it with Alt+Shift+K","Tasks are saved into the project","Follows the editor’s light and dark theme"],categories:["tool"],permissions:["ui:contribute"],icon:"layers",commands:[{id:"open-board",title:e?"任務看板":"Task board",icon:"layers",surfaces:["navbar"],shortcut:"Alt+Shift+K",panel:"board"}],panels:[{id:"board",title:e?"任務看板":"Task board",size:"medium",html:"panels/board.html"}]},o=`<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="board.css">
</head><body>
<main>
  <h1>${e?"任務看板":"Task board"}</h1>
  <form id="add"><input id="title" placeholder="${e?"新增一件事…":"Add a task…"}" autocomplete="off"><button>${e?"新增":"Add"}</button></form>
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
    remove.textContent = '${e?"刪除":"Delete"}';
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
`,p=e?`# Larch 擴充功能資料夾

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
`;return F({"my-task-board/larch-plugin.json":r(`${JSON.stringify(f,null,2)}
`),"my-task-board/README.md":r(p),"my-task-board/panels/board.html":r(o),"my-task-board/panels/board.css":r(n),"my-task-board/panels/board.js":r(l)})}export{bt as buildPluginPackage,ut as isZipData,wt as pluginPackageTemplate,gt as readDroppedEntries,mt as readPluginFiles,ht as readPluginZip};
