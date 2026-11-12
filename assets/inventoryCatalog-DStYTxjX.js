import{a9 as tt,am as nt,ai as at,L as N}from"./index-9VaqR6SS.js";import{f as it}from"./rpg-core-DKNJgNTD.js";import{r as v}from"./react-core-Ci-x9IAP.js";import{o as z,h as rt,j as ot,f as B}from"./akarionMedia-BkIMgOoi.js";import{o as I}from"./builtInPropThumbnails.generated-ARchckix.js";import{e as st}from"./pluginManifest-MgDppFgk.js";import{e as Ne,l as lt}from"./larch-math-D2H1mtik.js";const Z=e=>e.op==="hasItem"||e.op==="lacksItem";function ct(e,t,n){const a=String(n??"").trim();if(!a)return!1;let i=[];if(typeof e=="string"&&e.trim())try{const o=JSON.parse(e);Array.isArray(o)&&(i=o)}catch{i=e.split(/[,、]/).map(o=>({n:o.trim()})).filter(o=>o.n)}const r=i.some(o=>{if(!o||typeof o!="object")return!1;const s=o,d=String(s.id||s.n||"").trim().toLowerCase().replace(/\s+/g,"-"),c=s.q===void 0?1:Number(s.q);return d===a&&Number.isFinite(c)&&c>0});return t==="lacksItem"?!r:r}function Mn(e,t=!0){const n=new Set;return[...Array.isArray(e)?[]:K(e).map(r=>({values:r,cardTitle:t?"道具管理":"Item manager",location:{nodeId:""}})),...Array.isArray(e)?fe(e):Qe(e)].flatMap(({values:r,cardTitle:o,location:s})=>{const d=String(r.itemName||"神秘道具"),c=(String(r.itemId||"").trim()||d.trim()).toLowerCase().replace(/\s+/g,"-"),l=r.bagVar===void 0?"inventory":String(r.bagVar).trim(),u=JSON.stringify([l,c]);return!c||!l||n.has(u)?[]:(n.add(u),[{key:u,id:c,bagVar:l,name:d,cardTitle:o,nodeId:s.nodeId}])})}const Q=e=>e.op==="eventRan"||e.op==="eventNotRan",Nn=(e,t)=>JSON.stringify([e,t]);function dt(e,t,n){let a,i;try{a=JSON.parse(String(n??""))}catch{return!1}if(!Array.isArray(a)||!a[0]||!a[1])return!1;const r=String(a[0]),o=String(a[1]);try{i=typeof e=="string"?JSON.parse(e||"{}"):e}catch{i={}}const s=i&&typeof i=="object"?i[r]:void 0,d=!!(s&&Array.isArray(s.ran)&&s.ran.some(c=>String(c)===o));return t==="eventNotRan"?!d:d}const An="__larch_cards__",ee=e=>e.op==="cardRan"||e.op==="cardNotRan",Bn=e=>JSON.stringify([...e]);function ut(e,t,n){const a=String(n??"").trim();if(!a)return!1;let i=e;if(typeof e=="string")try{i=JSON.parse(e||"[]")}catch{i=[]}const r=Array.isArray(i)&&i.some(o=>String(o)===a);return t==="cardNotRan"?!r:r}function Ln(e,t,n){if(typeof e!="string")return!1;try{const a=JSON.parse(e)?.state?.mapBy;return typeof a=="string"&&!!a&&a!==t&&n.indexOf(a)<0}catch{return!1}}function On(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!!t):[]}const Rn=[{id:"set",zh:"設為",en:"Set to",zhHint:"直接指定一個值；數字可以寫算式，例如 {a}+{b}",enHint:"Write a value straight in — numbers take a formula like {a}+{b}"},{id:"add",zh:"增減",en:"Add",zhHint:"在原本的數字上加減，填負數就是扣；也可以寫算式",enHint:"Adds to the current number — negatives subtract; formulas work too"},{id:"toggle",zh:"反轉",en:"Flip",zhHint:"true 變 false、false 變 true",enHint:"true becomes false, and back"},{id:"random",zh:"隨機",en:"Random",zhHint:"在範圍內擲一次骰子",enHint:"Rolls once inside the range"}];let he=0;function Tn(e=""){return he+=1,{id:globalThis.crypto?.randomUUID?globalThis.crypto.randomUUID():`op-${Date.now().toString(36)}-${he}`,variable:e,kind:"set",value:""}}const k=e=>{const t=Number(e);return Number.isFinite(t)?t:0};function $(e){if(typeof e=="boolean")return e;if(typeof e=="number")return e!==0;const t=String(e??"").trim().toLowerCase();return t!==""&&t!=="false"&&t!=="0"}function ge(e,t,n){return!n||!te(e)?k(e):Ne(e,lt(t))??k(e)}const te=e=>typeof e=="string"&&/[{}+\-*/()×÷（）＋－＊／]/.test(e.trim().replace(/^[+-]/,""));function Fn(e){const t=e.trim();return t?/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(t)&&String(Number(t))===t?Number(t):e:""}function Hn(e,t){return te(e)?Ne(e,n=>t.find(a=>a.name===n)?.defaultValue)!==null:!0}function ft(e,t){return t==="number"?k(e):t==="boolean"?$(e):t==="string"?typeof e=="string"?e:String(e??""):typeof e=="number"||typeof e=="boolean"?e:String(e??"")}function Pn(e){return Object.fromEntries((e||[]).map(t=>[t.name,t.type]))}function $n(e,t,n={},a=Math.random){if(!e?.length)return t;const i={...t};for(const r of e){const o=r?.variable?.trim();if(!o)continue;const s=n[o],d=i[o],c=r.valueFrom?i[r.valueFrom]:r.value,l=!r.valueFrom;if(r.kind==="add"){i[o]=k(d)+ge(c,i,l);continue}if(r.kind==="toggle"){i[o]=!$(d);continue}if(r.kind==="random"){if(s==="boolean"){i[o]=a()<.5;continue}const u=Math.round(k(r.min??0)),m=Math.round(k(r.max??100)),b=Math.min(u,m),x=Math.max(u,m);i[o]=b+Math.floor(a()*(x-b+1));continue}i[o]=s==="number"?ge(c,i,l):ft(c,s)}return i}function mt(e,t){const n=e.variable?.trim();if(!n)return t?"還沒選變數":"No variable chosen";const a=e.valueFrom?`{${e.valueFrom}}`:String(e.value??"");if(e.kind==="toggle")return`${n} → ${t?"反轉":"flip"}`;if(e.kind==="random")return`${n} → ${t?"隨機":"random"} ${Math.round(k(e.min??0))}–${Math.round(k(e.max??100))}`;if(e.kind==="add"){if(!e.valueFrom&&te(e.value))return`${n} + (${e.value.trim()})`;const i=e.valueFrom?a:k(e.value),r=!e.valueFrom&&k(e.value)<0?"−":"+";return`${n} ${r} ${e.valueFrom?a:Math.abs(i)}`}return`${n} = ${a===""?t?"（空白）":"(empty)":a}`}function Un(e,t){const n=(e||[]).filter(a=>a?.variable?.trim());return n.length?n.map(a=>mt(a,t)).join(" · "):t?"還沒設定任何變數":"No changes yet"}function Dn(e,t){const n=new Set(e.map(a=>a.id));return t.filter(a=>n.has(a.source)&&n.has(a.target))}const W=e=>{const t=e||"";return t.startsWith("choice-")||t.startsWith("exit-")||t.startsWith("quiz-")?t:""},be=e=>`${e.source}\0${W(e.sourceHandle)}`;function Yn(e){const t=new Map;for(const r of e)t.set(r.source,[...t.get(r.source)||[],r]);const n=new Set,a=new Map,i=r=>{a.set(r,"visiting");for(const o of t.get(r)||[]){const s=a.get(o.target);s==="visiting"?n.add(o.id):s!=="done"&&i(o.target)}a.set(r,"done")};for(const r of e)a.has(r.source)||i(r.source);return n}function qn(e,t){const n=W(t.sourceHandle),a=new Set;for(const i of e)i.source!==t.source||i.target!==t.target||W(i.sourceHandle)===n&&a.add(i.id);return a}const j=e=>{const t=e.data?.condition;return t?t.kind==="ai"?Ae(t).some(n=>!!n.prompt?.trim()):D(t).some(n=>!!n.variable?.trim()):!1};function Kn(e){const t=new Map;for(const a of e)t.set(be(a),[...t.get(be(a))||[],a]);const n=new Map;for(const a of t.values()){if(a.length<2)continue;let i=!1;for(const r of a){if(j(r)){n.set(r.id,"guarded");continue}n.set(r.id,i?"blocked":"default"),i=!0}}return n}function Xn(e){return[...e.filter(t=>j(t)),...e.filter(t=>!j(t))]}const pt=(e,t,n)=>{const a=typeof e=="number"||typeof n=="number",i=a?Number(e):String(e??""),r=a?Number(n):String(n??"");switch(t){case"gt":return i>r;case"gte":return i>=r;case"lt":return i<r;case"lte":return i<=r;case"neq":return i!==r;default:return i===r}};function D(e){return!e||e.kind!=="variable"?[]:e.conditions?.length?e.conditions:[{variable:e.variable,op:e.op,value:e.value,valueSource:e.valueSource,valueFrom:e.valueFrom}]}function zn(e,t="all"){const n=e[0]||{};return{kind:"variable",variable:n.variable,op:n.op||"eq",value:n.value,valueSource:n.valueSource,valueFrom:n.valueFrom,conditions:e,match:t}}function Ae(e){return!e||e.kind!=="ai"?[]:e.aiConditions?.length?e.aiConditions:[{prompt:e.prompt}]}function Wn(e,t="all"){return{kind:"ai",prompt:(e[0]||{}).prompt,aiConditions:e,match:t}}function Be(e,t){if(!e)return!0;if(e.kind==="ai")return;const n=D(e).filter(i=>!!i.variable?.trim());if(!n.length)return!0;const a=n.map(i=>{const r=t[i.variable];if(Z(i))return ct(r,i.op,i.value);if(Q(i))return dt(r,i.op,i.value);if(ee(i))return ut(r,i.op,i.value);const o=i.valueSource==="variable"||!!i.valueFrom;if(o&&(!i.valueFrom||!Object.prototype.hasOwnProperty.call(t,i.valueFrom)))return!1;const s=o?t[i.valueFrom]:typeof r=="number"?Number(i.value):i.value;return pt(r,i.op||"eq",s)});return e.match==="any"?a.some(Boolean):a.every(Boolean)}function jn(e,t){if(!e)return!0;const n=D(e);return!n.length||n.some(a=>!a.variable?.trim()||!Z(a)&&!Q(a)&&!ee(a)&&!Object.prototype.hasOwnProperty.call(t,a.variable))?!1:Be(e,t)===!0}function _n(e,t,n={}){if(!e)return t?"沒有條件，永遠通行":"No condition — always taken";if(e.kind==="ai"){const o=Ae(e).flatMap(s=>s.prompt?.trim()?[s.prompt.trim()]:[]);return o.length?`${t?"AI 判斷：":"AI decides: "}${o.join(e.match==="any"?t?" 或 ":" OR ":t?" 且 ":" AND ")}`:t?"AI 判斷（尚未填寫）":"AI condition (empty)"}const a=D(e).filter(o=>!!o.variable?.trim());if(!a.length)return t?"尚未選擇變數":"No variable chosen";const i={gt:">",gte:"≥",lt:"<",lte:"≤",eq:"=",neq:"≠"};return a.map(o=>{if(Z(o))return`${o.variable} ${o.op==="hasItem"?t?"持有":"has":t?"未持有":"lacks"} ${o.value||(t?"（尚未選擇道具）":"(no item selected)")}`;if(Q(o)){const l=o.variableLabel?.trim()||(t?"事件":"An event");return o.op==="eventNotRan"?t?`「${l}」還沒執行過`:`“${l}” has not run`:t?`「${l}」執行過`:`“${l}” has run`}if(ee(o)){const l=o.variableLabel?.trim()||(t?"卡片":"A card");return o.op==="cardNotRan"?t?`卡片「${l}」還沒執行過`:`Card “${l}” has not run`:t?`卡片「${l}」執行過`:`Card “${l}” has run`}if(tt(o.variable)){const l=o.op==="neq"?!$(o.value):$(o.value);return`${o.variableLabel?.trim()||(t?"CG 收藏":"CG collection")} ${l?t?"已解鎖":"is unlocked":t?"尚未解鎖":"is locked"}`}const s=o.valueSource==="variable"||!!o.valueFrom,d=n[o.variable]||o.variable,c=s?o.valueFrom?t?`變數 ${n[o.valueFrom]||o.valueFrom}`:`variable ${n[o.valueFrom]||o.valueFrom}`:t?"未選變數":"no variable":String(o.value??"");return`${d} ${i[o.op||"eq"]} ${c}`}).join(e.match==="any"?t?" 或 ":" OR ":t?" 且 ":" AND ")}function ht(e){return!e||e.kind!=="card"?[]:e.routes?.length?e.routes:e.targetNodeId||e.condition?[{id:"legacy",targetNodeId:e.targetNodeId,condition:e.condition}]:[{id:"legacy"}]}function Gn(e){const t=(e||"").trim();if(!(!t||/\s/.test(t)))return/^(https?:\/\/|mailto:|tel:)/i.test(t)?t:/^[\w-]+(\.[\w-]+)+(:\d+)?([/?#]|$)/.test(t)?`https://${t}`:void 0}function Jn(e,t){return Le(ht(e),t)}function Le(e,t){for(const n of e)if(n.targetNodeId&&n.condition&&Be(n.condition,t)===!0)return n.targetNodeId;return e.find(n=>n.targetNodeId&&!n.condition)?.targetNodeId}const ye=(e,t)=>e?t.get(e)||e:void 0;function gt(e,t){if(!e)return;const n=a=>a?.map(i=>({...i,targetNodeId:ye(i.targetNodeId,t)}));return{...e,targetNodeId:ye(e.targetNodeId,t),...e.routes?{routes:n(e.routes)}:{},...e.inventoryUseRoutes?{inventoryUseRoutes:n(e.inventoryUseRoutes)}:{}}}function ve(e,t){if(!e)return;const n=a=>a.clickAction?{...a,clickAction:gt(a.clickAction,t)}:a;return{...e,actors:(e.actors||[]).map(n),props:e.props?.map(n),videos:e.videos?.map(n)}}function Zn(e,t){return{...e,...e.stage?{stage:ve(e.stage,t)}:{},...e.dialogueLines?{dialogueLines:e.dialogueLines.map(n=>n.stage?{...n,stage:ve(n.stage,t)}:n)}:{}}}function bt(e){if(!e||typeof e!="object")return;const t=e,n=String(t.type??"").slice(0,20),a=String(t.ref??"").slice(0,120);if(!n||!a)return;const i=o=>typeof o=="string"&&/^#[0-9a-f]{3,8}$/i.test(o),r=Array.isArray(t.colors)?t.colors.filter(i).slice(0,3):[];return{type:n,ref:a,...i(t.color)?{color:t.color}:{},...r.length?{colors:r}:{}}}const yt={accentColor:"#78a67d",surfaceColor:"#ffffff",itemColor:"#f3f6f2",textColor:"#27322b",radius:22,motionStyle:"gentle",shadowStyle:"soft",buttonStyle:"pill",buttonImage:"",buttonLabel:"",buttonSize:48,buttonShowCount:!0,buttonPositionMode:"preset",buttonX:86,buttonY:12,buttonPivot:"top-left",surfaceOpacity:.94,slotCount:12,buttonIconScale:.36,textScale:1,showEffectHint:!1,showStoryHint:!1,showUseHint:!0},F=(e,t)=>/^#[\da-f]{6}$/i.test(String(e||""))?String(e):t,vt=new Set(["gentle","bouncy","calm"]),xt=new Set(["soft","flat","float"]),kt=new Set(["pill","icon","image"]),wt=new Set(["preset","custom"]),Et=new Set(["top-left","top-center","top-right","center-left","center","center-right","bottom-left","bottom-center","bottom-right"]);function Qn(e,t={}){const n={...yt,...t};let a=e;if(typeof a=="string")if(!a.trim())a={};else try{a=JSON.parse(a)}catch{a={}}const i=a&&typeof a=="object"&&!Array.isArray(a)?a:{},r=String(i.motionStyle||n.motionStyle),o=String(i.shadowStyle||n.shadowStyle),s=String(i.buttonStyle||n.buttonStyle),d=String(i.buttonPositionMode||n.buttonPositionMode),c=String(i.buttonPivot||n.buttonPivot),l=i.buttonShowCount,u=(m,b)=>m==null?b:m!==!1&&m!=="false";return{accentColor:F(i.accentColor,n.accentColor),surfaceColor:F(i.surfaceColor,n.surfaceColor),itemColor:F(i.itemColor,n.itemColor),textColor:F(i.textColor,n.textColor),radius:Math.max(14,Math.min(32,Math.round(Number(i.radius??n.radius)||n.radius))),motionStyle:vt.has(r)?r:n.motionStyle,shadowStyle:xt.has(o)?o:n.shadowStyle,buttonStyle:kt.has(s)?s:n.buttonStyle,buttonImage:String(i.buttonImage??n.buttonImage??"").trim(),buttonLabel:String(i.buttonLabel??n.buttonLabel??"").trim().slice(0,30),buttonSize:Math.max(36,Math.min(128,Math.round(Number(i.buttonSize??n.buttonSize)||n.buttonSize))),buttonShowCount:l==null?n.buttonShowCount:l!==!1&&l!=="false",buttonPositionMode:wt.has(d)?d:n.buttonPositionMode,buttonX:Math.max(0,Math.min(100,Number(i.buttonX??n.buttonX)||0)),buttonY:Math.max(0,Math.min(100,Number(i.buttonY??n.buttonY)||0)),buttonPivot:Et.has(c)?c:n.buttonPivot,surfaceOpacity:Math.max(.25,Math.min(1,Number(i.surfaceOpacity??n.surfaceOpacity)||n.surfaceOpacity)),slotCount:Math.max(6,Math.min(30,Math.round(Number(i.slotCount??n.slotCount)||n.slotCount))),buttonIconScale:Math.max(.2,Math.min(.8,Number(i.buttonIconScale??n.buttonIconScale)||n.buttonIconScale)),textScale:Math.max(.8,Math.min(1.6,Number(i.textScale??n.textScale)||n.textScale)),showEffectHint:u(i.showEffectHint,n.showEffectHint),showStoryHint:u(i.showStoryHint,n.showStoryHint),showUseHint:u(i.showUseHint,n.showUseHint)}}const ne=e=>Math.max(1,Math.min(9999999,Math.round(Number(e)||1))),Oe=new Set(["none","set","add","subtract","toggle"]);function A(e){let t=e;if(typeof t=="string"){if(!t.trim())return[];try{t=JSON.parse(t)}catch{return[]}}return Array.isArray(t)?t.flatMap((n,a)=>{if(!n||typeof n!="object"||Array.isArray(n))return[];const i=n,r=String(i.targetNodeId||"").trim()||void 0,o=i.condition&&typeof i.condition=="object"&&!Array.isArray(i.condition)?i.condition:void 0;return[{id:String(i.id||`inventory-route-${a+1}`),...r?{targetNodeId:r}:{},...o?{condition:o}:{}}]}):[]}function It(e){const t=A(e.useRoutes);return t.length?t:e.storyNodeId?[{id:"legacy",targetNodeId:e.storyNodeId}]:[]}function ea(e,t){return Le(It(e),t)}function St(e){let t=e;if(typeof t=="string"){const a=t;if(!a.trim())return[];try{t=JSON.parse(a)}catch{t=a.split(/[,、]/).map(i=>({name:i.trim()})).filter(i=>i.name)}}if(!Array.isArray(t))return[];const n=new Map;for(const[a,i]of t.entries()){const r=typeof i=="string"?{name:i}:i;if(!r)continue;const o=String(r.name??r.n??"").trim();if(!o)continue;const s=String(r.id||o.toLocaleLowerCase().replace(/\s+/g,"-")||`item-${a}`),d=String(r.effectKind??r.e??"none"),c=A(r.useRoutes??r.r),l=bt(r.model??r.m),u={id:s,name:o,icon:String(r.icon??r.i??r.image??""),description:String(r.description??r.d??""),count:ne(r.count??r.q),consumable:(r.consumable??r.c)!==!1,effectKind:Oe.has(d)?d:"none",effectVariable:String(r.effectVariable??r.v??"").trim()||void 0,effectValue:r.effectValue??r.x,useConditionVariable:String(r.useConditionVariable??"").trim()||void 0,useConditionValue:r.useConditionValue,useConditionMessage:String(r.useConditionMessage??""),storyNodeId:String(r.storyNodeId??r.t??"").trim()||void 0,...c.length?{useRoutes:c}:{},...l?{model:l}:{}},m=n.get(s);n.set(s,m?{...u,count:m.count+u.count}:u)}return[...n.values()]}function ta(e){return JSON.stringify(e.filter(t=>t.count>0).map(t=>({id:t.id,n:t.name,i:t.icon,d:t.description,q:ne(t.count),c:t.consumable,e:t.effectKind,v:t.effectVariable||"",x:t.effectValue??"",t:t.storyNodeId||"",r:A(t.useRoutes),useConditionVariable:t.useConditionVariable,useConditionValue:t.useConditionValue,useConditionMessage:t.useConditionMessage,...t.model?{m:t.model}:{}})))}const na=e=>e.reduce((t,n)=>t+n.count,0);function aa(e,t){if(!e?.effectVariable||e.effectKind==="none")return"";const n=t?{set:"設為",add:"增加",subtract:"減少",toggle:"切換"}:{set:"Set",add:"Add",subtract:"Subtract",toggle:"Toggle"};return`${e.effectVariable} · ${n[e.effectKind]}${e.effectKind==="toggle"?"":` ${String(e.effectValue??"")}`}`}const Vt=["coin","coins","gold","gold-coin","money"];function ia(e,t,n=[]){const a=typeof t=="string"?t.trim():"";if(a==="none")return;const i=a||Vt.find(s=>e.some(d=>d.id===s)||n.some(d=>d.id===s));if(!i)return;const r=e.find(s=>s.id===i),o=n.find(s=>s.id===i);return{id:i,name:r?.name||o?.name||i,icon:r?.icon||o?.icon||"",count:r?.count||0}}function Ct(e,t,n="道具"){const a=t.inventoryEffectKind||"none",i=A(t.inventoryUseRoutes);return{id:(t.inventoryId?.trim()||`stage-${e.id}`).toLowerCase().replace(/\s+/g,"-"),name:t.inventoryName?.trim()||e.name?.trim()||t.label?.trim()||n,icon:t.inventoryImage??e.url,description:t.inventoryDescription?.trim()||"",count:ne(t.inventoryCount),consumable:t.inventoryConsumable===!0,effectKind:Oe.has(a)?a:"none",effectVariable:t.inventoryEffectVariable?.trim()||void 0,effectValue:t.inventoryEffectValue,...t.inventoryStoryNodeId?.trim()?{storyNodeId:t.inventoryStoryNodeId.trim()}:{},...i.length?{useRoutes:i}:{},useConditionVariable:t.inventoryUseConditionVariable?.trim()||void 0,useConditionValue:t.inventoryUseConditionValue,useConditionMessage:t.inventoryUseConditionMessage?.trim()||""}}function ra(e,t){return St([...e,t])}function Re(e){return e===!0||e==="true"?!0:e===!1||e==="false"?!1:e!==""&&e!=null&&Number.isFinite(Number(e))?Number(e):String(e??"")}function Mt(e,t){const n=e.useConditionVariable?.trim();return!n||Object.prototype.hasOwnProperty.call(t,n)&&t[n]===Re(e.useConditionValue)}function oa(e,t){const n={...t};if(!Mt(e,t))return n;const a=e.effectVariable;if(a&&e.effectKind!=="none"){const i=n[a],r=Number(e.effectValue)||0;e.effectKind==="add"?n[a]=(Number(i)||0)+r:e.effectKind==="subtract"?n[a]=(Number(i)||0)-r:e.effectKind==="toggle"?n[a]=!i:n[a]=Re(e.effectValue)}return n}function sa(e,t){return e.flatMap((n,a)=>a!==t||!n.consumable?[n]:n.count>1?[{...n,count:n.count-1}]:[])}function Nt(){return typeof window>"u"?!1:navigator.standalone?!0:typeof window.matchMedia!="function"?!1:["standalone","fullscreen","minimal-ui"].some(e=>window.matchMedia(`(display-mode: ${e})`).matches)}const At=/\b(Line|FBAN|FBAV|FB_IAB|Instagram|MicroMessenger|Messenger|Threads|TikTok|musical_ly|Snapchat|KAKAOTALK)\b/i;function la(){if(typeof navigator>"u")return"other";const e=navigator.userAgent;return At.test(e)?"in-app":/iPhone|iPad|iPod/.test(e)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":"other"}const ca=()=>typeof window<"u"&&!!window.__larchInstallPrompt;async function da(){const e=window.__larchInstallPrompt;if(!e)return!1;window.__larchInstallPrompt=void 0;try{return await e.prompt(),(await e.userChoice).outcome==="accepted"}catch{return!1}}const ua="larch:install-ready",Te="larch-home-screen-hint",Bt=30;function fa(){try{const e=Number(localStorage.getItem(Te));return Number.isFinite(e)&&e>0&&Date.now()-e<Bt*864e5}catch{return!1}}function ma(){try{localStorage.setItem(Te,String(Date.now()))}catch{}}function pa(){try{return window.self!==window.top}catch{return!0}}function ha(e,t){v.useEffect(()=>{if(!t||typeof document>"u")return;const n=document.querySelector('link[rel="manifest"]'),a=document.querySelector('meta[name="apple-mobile-web-app-title"]'),i=n?.getAttribute("href"),r=a?.getAttribute("content"),o=e.trim().slice(0,30);return n?.setAttribute("href",`/api/play-manifest?start=${encodeURIComponent(location.pathname+location.search)}${o?`&name=${encodeURIComponent(o)}`:""}`),a&&o&&a.setAttribute("content",o),()=>{n&&i&&n.setAttribute("href",i),a&&r&&a.setAttribute("content",r)}},[t,e])}const Fe="larch-immersive",M=()=>document;function He(){if(typeof document>"u"||M().fullscreenEnabled===!1||M().webkitFullscreenEnabled===!1)return!1;const e=document.documentElement;return typeof e.requestFullscreen=="function"||typeof e.webkitRequestFullscreen=="function"}const S=()=>typeof document>"u"?null:M().fullscreenElement??M().webkitFullscreenElement??null;async function Pe(e){const t=e;return typeof t.requestFullscreen=="function"?(await t.requestFullscreen(),!0):typeof t.webkitRequestFullscreen=="function"?(await t.webkitRequestFullscreen(),!0):!1}async function xe(){S()&&(typeof M().exitFullscreen=="function"?await M().exitFullscreen():await M().webkitExitFullscreen?.())}const H=e=>document.documentElement.classList.toggle(Fe,e),X=()=>document.documentElement.classList.contains(Fe);let ke=0;const Lt=()=>new Promise(e=>{if(S())return e(!0);window.setTimeout(()=>e(!!S()),400)});function ga(){typeof document>"u"||S()||Pe(document.documentElement).catch(()=>{})}function ba(){const e=v.useMemo(()=>He(),[]),[t,n]=v.useState(()=>!!S()||X()),[a,i]=v.useState(!1);v.useEffect(()=>{window.clearTimeout(ke);const d=()=>{const c=!!S()||X();n(c),c||i(!1)};return document.addEventListener("fullscreenchange",d),document.addEventListener("webkitfullscreenchange",d),()=>{document.removeEventListener("fullscreenchange",d),document.removeEventListener("webkitfullscreenchange",d),ke=window.setTimeout(()=>{H(!1),xe()},150)}},[]);const r=v.useCallback(d=>{const c=()=>{H(!0),n(!0),!d&&!Nt()&&i(!0)};Pe(document.documentElement).then(l=>l?Lt():!1).then(l=>{l?(H(!1),i(!1)):c()}).catch(c)},[]),o=v.useCallback(()=>{if(S()){xe();return}if(X()){H(!1),n(!1),i(!1);return}r(!1)},[r]),s=v.useCallback(()=>{S()||r(!0)},[r]);return{active:t,native:e,blocked:a,toggle:o,enter:s}}const we={width:1920,height:1080},ya=["contain","cover"],Ot=e=>e==="cover"?"cover":e==="contain"?"contain":"auto",ae=.88;function Rt(e,t,n=1){return!e?.width||!e.height||!t.width||!t.height?0:t.height*ae*(n||1)*(e.width/e.height)/2/t.width*100}function Tt(e){const t=Number(e?.width),n=Number(e?.height);return{width:Number.isFinite(t)&&t>0?t:we.width,height:Number.isFinite(n)&&n>0?n:we.height}}function Ee(e,t,n,a="contain"){const i=[e/n.width,t/n.height],r=a==="cover"?Math.max(...i):Math.min(...i);return Number.isFinite(r)&&r>0?r:.01}function Ft(){const e=window.orientation;return Ht({view:{width:window.innerWidth,height:window.innerHeight},screen:{width:Number(window.screen?.width),height:Number(window.screen?.height)},native:He(),orientationType:window.screen?.orientation?.type,legacyOrientation:typeof e=="number"?e:void 0,appleTouch:nt()||at()})}function Ht(e){const{view:t,screen:n,native:a}=e;if(!a||!(n.width>0&&n.height>0))return t;let i;return e.orientationType?.startsWith("landscape")?i=!0:e.orientationType?.startsWith("portrait")?i=!1:typeof e.legacyOrientation=="number"?i=Math.abs(e.legacyOrientation)===90:e.appleTouch&&(i=t.width>t.height),i===void 0||i===n.width>=n.height?{width:n.width,height:n.height}:{width:n.height,height:n.width}}function Pt(e,t){return e.width>0&&e.height>0&&t.width>0?{width:t.width,height:t.width*e.height/e.width}:t}function $t(){return Pt(Ft(),{width:window.innerWidth,height:window.innerHeight})}function va(e,t,n,a){const i=Ot(t),r=Tt(e),[o,s]=v.useState(null),[d,c]=v.useState(()=>({...r,scale:1})),l=r.width,u=r.height,m=a?.width,b=a?.height;return v.useEffect(()=>{if(!o)return;const x=(y,w,p)=>c(f=>f.width===y&&f.height===w&&f.scale===p?f:{width:y,height:w,scale:p}),g=()=>{const y=o.getBoundingClientRect();if(i==="auto"){const w=m&&b?{width:m,height:b}:n?$t():y,p=Math.max(1,Math.round(w.width)),f=Math.max(1,Math.round(w.height));x(p,f,Ee(y.width,y.height,{width:p,height:f}));return}x(l,u,Ee(y.width,y.height,{width:l,height:u},i))};g();const V=new ResizeObserver(g);return V.observe(o),window.addEventListener("resize",g),window.addEventListener("orientationchange",g),()=>{V.disconnect(),window.removeEventListener("resize",g),window.removeEventListener("orientationchange",g)}},[o,l,u,i,n,m,b]),{...d,fit:i,measureRef:s}}function xa(e,t,n){const a=[...new Set(e)].filter(i=>i&&!t[i]&&z(i)).sort().join(`
`);v.useEffect(()=>{if(!a)return;let i=!0;const r=a.split(`
`).map(o=>{const s=new Image;return s.onload=()=>{i&&s.naturalWidth&&s.naturalHeight&&n(o,{width:s.naturalWidth,height:s.naturalHeight})},s.src=o,s});return()=>{i=!1,r.forEach(o=>{o.onload=null})}},[a,n])}function $e(e,t){const n=e.width/e.height,a=t.width/t.height;return!Number.isFinite(n)||!Number.isFinite(a)||a<=0||n<=0?1:Math.min(1,n/a)}const Ue=.35,De=.5,ka=32,Ut=.15,wa=48,Ea=4;function Dt(e,t,n,a,i){const r=e.map((f,h)=>h).sort((f,h)=>e[f].centerX-e[h].centerX||f-h),o=r.map(f=>t[f]),s=r.length-1,d=o.slice(1).map((f,h)=>(o[h]+f)*(1-Ue)),c=o[0]+o[s]+d.reduce((f,h)=>f+h,0),l=c>0?Math.max($e(n,a),De,Math.min(1,100/c)):1;let u=o[0]*l,m=100-o[s]*l;u>m&&(u=m=(u+m)/2);const b=d.reduce((f,h)=>f+h*l,0),x=b>m-u?(m-u)/b:1,g=r.map(f=>e[f].centerX);g.forEach((f,h)=>{g[h]=Math.max(f,h?g[h-1]+d[h-1]*l*x:u)});for(let f=s;f>=0;f-=1)g[f]=Math.min(g[f],f<s?g[f+1]-d[f]*l*x:m);const V=Math.max(...e.map(f=>f.scale??1)),y=ae*100*V,w=Math.max(0,Math.min(i-y*l*Ut,y*(1-l))),p=e.map(f=>({x:f.centerX,scale:(f.scale??1)*l,offsetY:(f.offsetY??0)*l+(f.overBox?0:w)}));return r.forEach((f,h)=>{p[f].x=g[h]}),p}function Ia(e,t,n,a=!0,i){const r=e.map(p=>({x:p.centerX,scale:p.scale??1,offsetY:p.offsetY??0}));if(!a||!e.length)return r;const o=e.map(p=>Rt(p.natural,t,p.scale??1));if(i&&e.length>1&&t.width<t.height)return Dt(e,o,t,n,i.floorCover);const s=e.map((p,f)=>f).sort((p,f)=>e[p].centerX-e[f].centerX||p-f),d=Math.max($e(t,n),De);let c=1;const l=s.filter(p=>o[p]>0);for(let p=1;p<l.length;p+=1){const f=l[p-1],h=l[p],C=o[f]+o[h],L=(e[h].centerX-e[f].centerX)/(C*(1-Ue));c=Math.min(c,Math.max(d,Math.min(1,L)))}const u=e.map(p=>p.centerX),m=(Math.min(...u)+Math.max(...u))/2,b=p=>{let f=1/0,h=-1/0;return e.forEach((C,L)=>{const T=m+(C.centerX-m)*p,pe=o[L]*c;f=Math.min(f,T-pe),h=Math.max(h,T+pe)}),{left:f,right:h}};let x=1;if(b(1).right-b(1).left>100){let p=0,f=1;for(let h=0;h<24;h+=1){const C=(p+f)/2,{left:L,right:T}=b(C);T-L>100?f=C:p=C}x=p}const{left:g,right:V}=b(x),y=V-g,w=y>100?(100-y)/2-g:Math.max(-g,Math.min(100-V,0));return e.map((p,f)=>({x:m+(p.centerX-m)*x+w,scale:(p.scale??1)*c,offsetY:(p.offsetY??0)*c}))}const R={farLeft:11,left:27,center:50,right:73,farRight:89},Yt=Object.keys(R),O=(e,t=0)=>{if(e===""||e==null)return t;const n=Number(e);return Number.isFinite(n)?n:t},qt=[0,.22,.44,.66],Sa=(e=1)=>qt.map(t=>-Number((t*ae*100*(e||1)).toFixed(2))),Ye=1920,qe=1080,Ke=e=>e==="farLeft"||e==="left"?"left":e==="farRight"||e==="right"?"right":"center",Kt=e=>e==="left"?"left":e==="right"?"right":"center",Va=e=>Yt.reduce((t,n)=>Math.abs(R[n]-e)<Math.abs(R[t]-e)?n:t,"center"),Ca=e=>O(R[e.slot],R.center)+O(e.offsetX),Ma=e=>e.dialogueLayer==="front",Na=e=>e.dialogueLayer==="front",Xt=e=>e.width>0&&e.width<e.height;function Aa(e,t){const n=e.portrait;if(!n||!Xt(t))return e;const a=O(n.scale,e.scale);return{...e,offsetX:O(n.offsetX,e.offsetX),offsetY:O(n.offsetY,e.offsetY),scale:a>0?a:e.scale}}const zt=()=>({actors:[]}),P=e=>e.devices?{devices:Object.fromEntries(Object.entries(e.devices).map(([t,n])=>[t,{...n}]))}:{},_=e=>({actors:(e?.actors||[]).map(t=>({...t,...t.portrait?{portrait:{...t.portrait}}:{},...P(t),...t.clickAction?{clickAction:{...t.clickAction}}:{}})),...e?.props?.length?{props:e.props.map(t=>({...t,...P(t),...t.clickAction?{clickAction:{...t.clickAction}}:{}}))}:{},...e?.texts?.length?{texts:e.texts.map(t=>({...t,...P(t),...t.runs?{runs:t.runs.map(n=>({...n,...n.marks?{marks:n.marks.map(a=>({...a}))}:{}}))}:{}}))}:{},...e?.videos?.length?{videos:e.videos.map(t=>({...t,...P(t),...t.chromaKey?{chromaKey:{...t.chromaKey}}:{},...t.clickAction?{clickAction:{...t.clickAction}}:{}}))}:{}}),Wt=(e,t)=>{if(!e.loopOnce)return e;const{loop:n,loopOnce:a,...i}=e;return t?{...i,loop:"none"}:i};function Ie(e,t=!1){const n=a=>Wt(a,t);return{...e,actors:e.actors.map(n),...e.props?{props:e.props.map(n)}:{},...e.texts?{texts:e.texts.map(n)}:{},...e.videos?{videos:e.videos.map(n)}:{}}}const Ba=e=>!!(e&&(e.actors.length||e.props?.length||e.texts?.length||e.videos?.length));function La(e){if(!e)return e;const t=n=>n.clickAction?.kind!=="card";return{...e,actors:e.actors.filter(t),...e.props?{props:e.props.filter(t)}:{},...e.videos?{videos:e.videos.filter(t)}:{}}}function ie(e,t){return t?.stage!==void 0||e.stage!==void 0?!0:!!(e.characterLayers?.length||e.character)}function Se(e,t,n){return{id:e.id||N(),characterId:n,name:t,url:e.url,slot:Kt(e.position),offsetX:Number(e.x||0)/Ye*100,offsetY:-Number(e.y||0)/qe*100,scale:Number(e.scale||1),...e.flipX?{flipX:!0}:{},...e.flipY?{flipY:!0}:{}}}function jt(e){return{id:e.id,url:e.url,position:Ke(e.slot),x:Math.round((e.offsetX||0)/100*Ye),y:Math.round(-(e.offsetY||0)/100*qe),scale:e.scale,...e.flipX?{flipX:!0}:{},...e.flipY?{flipY:!0}:{}}}function Xe(e){const t=e.actors,n=t[0];return{stage:e,characterLayers:t.map(jt),character:n?.url,characterPosition:n?Ke(n.slot):void 0}}function ze(e){return e.stage?e.stage:e.characterLayers?.length?{actors:e.characterLayers.map(t=>Se(t,e.speaker,e.characterId))}:e.character?{actors:[Se({id:N(),url:e.character,position:e.characterPosition||"center",x:Number(e.characterX||0),y:Number(e.characterY||0),scale:Number(e.characterScale||1),flipX:!!e.characterFlipX,flipY:!!e.characterFlipY},e.speaker,e.characterId)]}:zt()}function We(e,t){return t?.stage||ze(e)}function _t(e,t,n,a=0){if(!ie(e,t)&&n)return Ie(_(n));const i=_(We(e,t));return a>0&&!t?.stage?Ie(i):i}function Oa(e,t,n,a){return n?.stage!==void 0?`${e}:${a}`:ie(t,n)?e:null}function re(e,t,n){if(t?.narration)return;if(t?.speakerActorId&&e.actors.some(r=>r.id===t.speakerActorId))return t.speakerActorId;const a=(t?.speaker||n||"").trim(),i=a?e.actors.find(r=>(r.name||"").trim()===a):void 0;if(i)return i.id;if(!t?.speakerActorId)return a?e.actors.find(r=>!(r.name||"").trim()&&!r.characterId)?.id:e.actors[0]?.id}function Ra(e,t,n){return t?.narration||!(t?.speaker||n||"").trim()?!1:!re(e,t,n)}function Ta(e,t,n){const a=re(e,t,n);if(!a)return[];const i=(t?.coSpeakerActorIds||[]).filter((r,o,s)=>r!==a&&s.indexOf(r)===o&&e.actors.some(d=>d.id===r));return[a,...i]}function Fa(e,t){const n=c=>{const l=String(c.name||"").trim();return c.characterId?"character:"+c.characterId:l?"name:"+l:"actor:"+c.id},a=c=>c.replace(/#\d+$/,""),i=t?t.ids:[],r=t?t.keys:[],o=[],s={};e.forEach((c,l)=>{const u=i.indexOf(c.id),m=u>=0?r[u]:void 0;m&&a(m)===n(c)&&!s[m]&&(o[l]=m,s[m]=!0)});const d={};return e.forEach((c,l)=>{o[l]&&(d[n(c)]=!0)}),e.forEach((c,l)=>{if(!(o[l]||d[n(c)]))for(let u=0;u<r.length;u++){const m=r[u];if(a(m)===n(c)&&!s[m]){o[l]=m,s[m]=!0;return}}}),e.forEach((c,l)=>{if(o[l])return;let u=n(c);for(let m=1;s[u]||r.indexOf(u)>=0;m++)u=n(c)+"#"+m;o[l]=u,s[u]=!0}),o}const Ve=(e,t)=>String(e??"").trim().toLowerCase()===t.trim().toLowerCase(),je=(e,t)=>t?.find(n=>e.characterId&&n.id===e.characterId)||t?.find(n=>e.name&&n.name===e.name);function Ha(e,t){const n=je(e,t),a=n?.portraitUrl;return!a||!e.url||a===e.url||!z(a)||!z(e.url)?e.url:(n.expressions||[]).some(i=>i?.imageUrl===e.url)?a:e.url}function Gt(e,t){const n=(e?.expressions||[]).filter(a=>a?.imageUrl);return n.find(a=>a.id===t)||n.find(a=>Ve(a.name,t))||n.find(a=>Ve(a.emotion,t))}function Jt(e,t,n){if(!t?.expression?.trim())return;const a=t.expressionActorId||re(e,t,n);return a?e.actors.find(i=>i.id===a):void 0}function Pa(e,t,n,a){const i=Jt(e,t,a);if(!i)return e;const r=t.expression.trim(),o=Gt(je(i,n),r),s=o?o.imageUrl===i.url?void 0:{...i,url:o.imageUrl}:rt(i.url)?{...i,live2d:{...i.live2d,expression:r}}:ot(i.url)?{...i,mesh:{...i.mesh,expression:r}}:void 0;return s?{...e,actors:e.actors.map(d=>d===i?s:d)}:e}function $a(e,t,n=!0){return e.actors.filter(i=>t.includes(i.id)).map(i=>(i.name||"").trim()).filter(Boolean).join(n?"＆":" & ")}function Ua(e,t,n){const a=new Map(e.map(s=>[s.id,s])),i=new Map;for(const s of t)i.set(s.target,[...i.get(s.target)||[],s.source]);const r=new Set([n]);let o=i.get(n)||[];for(let s=0;s<60&&o.length;s+=1){const d=[];for(const c of o){if(r.has(c))continue;r.add(c);const l=a.get(c);if(l?.data.background)return{url:l.data.background,title:l.data.title};d.push(...i.get(c)||[])}o=d}return null}function Zt(e){const t=e.dialogueLines||[];for(let n=t.length-1;n>=1;n-=1)if(t[n].stage!==void 0)return t[n].stage;return ie(e,t[0])?We(e,t[0]):void 0}function Qt(e,t,n){const a=new Map(e.map(s=>[s.id,s])),i=new Map;for(const s of t)i.set(s.target,[...i.get(s.target)||[],s.source]);const r=new Set([n]);let o=i.get(n)||[];for(let s=0;s<60&&o.length;s+=1){const d=[];for(const c of o){if(r.has(c))continue;r.add(c);const l=a.get(c),u=l&&Zt(l.data);if(u)return{stage:u,title:l.data.title};d.push(...i.get(c)||[])}o=d}return null}function en(e){const t=new Set(e.actors.map(a=>a.slot));return["center","left","right","farLeft","farRight"].find(a=>!t.has(a))||"center"}function Da(e,t,n,a){return{id:N(),characterId:a,name:n,url:e,slot:en(t),offsetX:0,offsetY:0,scale:1,enter:"fade"}}function Ce(e,t){return t?.some(n=>n.defaultLoop&&n.defaultLoop!=="none")?{...e,actors:e.actors.map(n=>{const a=n.loop?void 0:it(n,t);return a?{...n,loop:a}:n})}:e}function Ya(e,t){if(!t?.some(a=>a.defaultLoop&&a.defaultLoop!=="none"))return e;const n=a=>a?.map(i=>i.stage?{...i,stage:Ce(i.stage,t)}:i);return{...e,...e.stage?{stage:Ce(e.stage,t)}:{},...e.dialogueLines?{dialogueLines:n(e.dialogueLines)}:{},...e.localizations?{localizations:e.localizations.map(a=>a.dialogueLines?{...a,dialogueLines:n(a.dialogueLines)}:a)}:{}}}function tn(e,t){return{id:N(),...t?{name:t}:{},url:e,x:50,y:55,scale:.5,depth:"front",enter:"fade"}}function qa(e,t,n){const a=e.name?.trim();if(a)return a;const i=t?"道具":"Prop";return n===void 0?i:`${i} ${n+1}`}function Ka(e,t,n){return{id:N(),...n?.id?{mediaId:n.id}:{},url:e,...n?.videoFileUrl?{videoFileUrl:n.videoFileUrl}:{},name:t,x:50,y:50,scale:.8,depth:"front",opacity:1,fit:"contain",volume:0,videoLoop:!0,enter:"fade"}}function nn(e){return{id:N(),url:e.url,name:e.name,x:50,y:50,scale:1.56,depth:"front",opacity:e.opacity??1,fit:e.fit||"contain",volume:0,videoLoop:e.loop!==!1,...e.chromaKey?{chromaKey:{...e.chromaKey}}:{}}}function Xa(e){if(!e.videoOverlay?.url)return e;const t=nn(e.videoOverlay),n=i=>({..._(i),videos:[...(i.videos||[]).map(r=>({...r})),{...t,...t.chromaKey?{chromaKey:{...t.chromaKey}}:{}}]}),a=n(ze({...e}));return{...e,...Xe(a),videoOverlay:void 0,...e.dialogueLines?{dialogueLines:e.dialogueLines.map(i=>i.stage?{...i,stage:n(i.stage)}:i)}:{}}}function za(e){const t=Math.min(3,e.texts?.length||0)*7;return{id:N(),text:"",x:50,y:28+t,size:6,width:70,align:"center",font:"theme",weight:800,color:"#ffffff",effect:"shadow",effectColor:"#000000",depth:"front",enter:"fade"}}const oe=(e,t,n)=>`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{font-family:-apple-system,"Segoe UI","Noto Sans TC",system-ui,sans-serif;color:#f4f1ea;
    background:radial-gradient(120% 120% at 50% 0%,#26241f 0%,#141310 70%);
    display:flex;align-items:center;justify-content:center;padding:14px;overflow:hidden;-webkit-tap-highlight-color:transparent}
  .wrap{width:100%;max-width:760px;display:flex;flex-direction:column;gap:12px}
  h1{font-size:15px;letter-spacing:.02em;font-weight:650;display:flex;align-items:center;gap:8px}
  h1 small{font-weight:400;opacity:.55;font-size:12px}
  button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
  .cta{align-self:flex-end;padding:9px 18px;border-radius:999px;background:#f4f1ea;color:#191712;font-weight:650;font-size:13px;
    transition:transform .16s ease,opacity .16s ease}
  .cta:hover{transform:translateY(-1px)}
  .cta[disabled]{opacity:.35;cursor:default;transform:none}
  .ghost{padding:9px 16px;border-radius:999px;border:1px solid rgba(244,241,234,.22);font-size:13px;opacity:.75}
  .row{display:flex;align-items:center;gap:10px;justify-content:flex-end}
</style></head>
<body><div class="wrap">${t}</div>
<script>
var values={},vars={},assets=[],characters=[],locale='zh-Hant',done=false;
function setVar(name,value){ if(name) parent.postMessage({type:'larch:set',name:name,value:value},'*'); }
function finish(result,payload){ if(done)return; done=true; parent.postMessage({type:'larch:complete',result:result,payload:payload},'*'); }
function num(value,fallback){ var parsed=Number(value); return isNaN(parsed)?fallback:parsed; }
function str(value,fallback){ return (value===undefined||value===null||value==='')?fallback:String(value); }
function lines(value){ return str(value,'').split(/\\r?\\n/).map(function(item){return item.trim();}).filter(Boolean); }
parent.postMessage({type:'larch:ready'},'*');
window.addEventListener('message',function(event){
  var data=event.data;
  if(!data||data.type!=='larch:init')return;
  values=data.values||{};vars=data.variables||{};assets=data.assets||[];characters=data.characters||[];locale=data.locale||'zh-Hant';
  try{ start(); }catch(error){ finish('error'); }
});
${n}
<\/script></body></html>`,_e='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9"/></svg>',an='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6.5 8.5h11a2 2 0 0 1 2 2V20h-15v-9.5a2 2 0 0 1 2-2Z"/><path d="M8 13h8v5H8zM8 11v2m8-2v2"/></svg>',Y=(e,t,n)=>`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{font-family:-apple-system,"Segoe UI","Noto Sans TC",system-ui,sans-serif;color:#27322b;background:transparent;
    display:flex;align-items:center;justify-content:center;padding:12px;overflow:hidden;-webkit-tap-highlight-color:transparent}
  .wrap{width:100%;max-width:760px;display:flex;flex-direction:column;gap:11px;padding:16px;border:1px solid #e4eae3;
    border-radius:22px;background:#fff;box-shadow:0 18px 48px rgba(39,50,43,.12);animation:arrive .55s cubic-bezier(.18,1.35,.36,1)}
  h1{font-size:15px;letter-spacing:.01em;font-weight:780;display:flex;align-items:center;gap:8px}
  h1 small{font-weight:700;color:#78a67d;font-size:9px;letter-spacing:.14em}
  svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
  .cta,.ghost{min-height:38px;padding:8px 16px;border-radius:13px;font-size:12px;font-weight:760;
    transition:transform .38s cubic-bezier(.18,1.35,.36,1),background .18s ease,border-color .18s ease,box-shadow .18s ease}
  .cta{background:#78a67d;color:#fff;box-shadow:0 8px 18px rgba(82,123,88,.2)}
  .ghost{border:1px solid #dfe7de;background:#f7f9f6;color:#5c685f}
  .cta:hover,.ghost:hover{transform:translateY(-3px) scale(1.025)}
  .cta:active,.ghost:active{transform:scale(.96)}
  .cta[disabled]{opacity:.35;cursor:default;transform:none;box-shadow:none}
  .row{display:flex;align-items:center;gap:8px;justify-content:flex-end}
  .soft-card{border:1px solid #e3eae2;border-radius:17px;background:#f6f8f5}
  .item-mark{width:58px;height:58px;flex:none;display:grid;place-items:center;border-radius:17px;background:#e8f1e8;color:#628d68}
  .item-mark svg{width:27px;height:27px}
  @keyframes arrive{0%{opacity:0;transform:translateY(12px) scale(.94)}65%{transform:translateY(-2px) scale(1.012)}100%{opacity:1;transform:none}}
  @media(max-width:520px){body{padding:8px}.wrap{padding:13px;border-radius:18px}}
</style></head>
<body><div class="wrap">${t}</div>
<script>
var values={},vars={},assets=[],characters=[],locale='zh-Hant',done=false;
function setVar(name,value){ if(name) parent.postMessage({type:'larch:set',name:name,value:value},'*'); }
function finish(result,payload){ if(done)return; done=true; parent.postMessage({type:'larch:complete',result:result,payload:payload},'*'); }
function num(value,fallback){ var parsed=Number(value); return isNaN(parsed)?fallback:parsed; }
function str(value,fallback){ return (value===undefined||value===null||value==='')?fallback:String(value); }
parent.postMessage({type:'larch:ready'},'*');
window.addEventListener('message',function(event){
  var data=event.data;
  if(!data||data.type!=='larch:init')return;
  values=data.values||{};vars=data.variables||{};assets=data.assets||[];characters=data.characters||[];locale=data.locale||'zh-Hant';
  try{ start(); }catch(error){ finish('error'); }
});
${n}
<\/script></body></html>`,se=`
function readBag(name){
  var raw=vars[name];
  if(!raw)return [];
  if(typeof raw!=='string'){ return []; }
  try{ var parsed=JSON.parse(raw); return Array.isArray(parsed)?parsed:[]; }
  catch(error){
    // 作者也可能自己在專案設定裡填了「繩索,火把」這種預設值 —— 照樣讀得懂。
    return raw.split(/[,、]/).map(function(item){return item.trim();}).filter(Boolean).map(function(item){return {n:item,i:''};});
  }
}
function writeBag(name,items){ setVar(name,JSON.stringify(items)); }
function readRoutes(value){
  var parsed=value;
  if(typeof parsed==='string'){if(!parsed.trim())return [];try{parsed=JSON.parse(parsed)}catch(error){return []}}
  return Array.isArray(parsed)?parsed:[];
}
`,rn=Y("取得道具",`
  <style>
    body{padding:0;background:transparent}
    .wrap{width:100%;max-width:none;height:100%;display:grid;place-items:center;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;animation:none}
    .pickup{position:relative;width:clamp(156px,40vmin,350px);height:clamp(156px,40vmin,350px);display:grid;place-items:center;border-radius:50%;outline:0;
      transition:transform .5s cubic-bezier(.18,1.35,.36,1);animation:pickup-arrive .72s cubic-bezier(.16,1.28,.3,1) both}
    .pickup::before{position:absolute;inset:7%;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:radial-gradient(circle at 42% 35%,rgba(255,255,255,.35),rgba(238,247,239,.16) 52%,rgba(168,197,172,.09));content:''}
    .pickup::after{position:absolute;inset:-2%;border:1px solid rgba(220,241,224,.24);border-radius:50%;content:'';animation:pickup-halo 2.4s ease-out infinite}
    .pickup-media{position:relative;z-index:1;width:76%;height:76%;display:grid;place-items:center;color:rgba(238,247,239,.92)}
    .pickup,.pickup-media{-webkit-user-select:none;user-select:none}
    .pickup-media img{-webkit-user-select:none;user-select:none;-webkit-user-drag:none;display:none;width:100%;height:100%;object-fit:contain;animation:pickup-float 3s ease-in-out infinite}
    .pickup-media svg{width:42%;height:42%}
    .pickup:hover{transform:scale(1.06)}
    .pickup:focus-visible{box-shadow:0 0 0 4px rgba(255,255,255,.82),0 0 0 8px rgba(112,160,119,.55)}
    .pickup:active{transform:scale(.94)}
    .pickup.collected{pointer-events:none;animation:pickup-collect .36s cubic-bezier(.4,0,.2,1) forwards}
    .pickup.confirmed{pointer-events:none;animation:pickup-confirm .36s cubic-bezier(.18,1.35,.36,1) both}
    @keyframes pickup-arrive{0%{opacity:0;transform:translateY(24px) scale(.58) rotate(-4deg)}70%{opacity:1;transform:translateY(-5px) scale(1.06) rotate(1deg)}100%{transform:none}}
    @keyframes pickup-float{0%,100%{transform:translateY(3px) rotate(-1deg)}50%{transform:translateY(-7px) rotate(1deg)}}
    @keyframes pickup-halo{0%{opacity:.7;transform:scale(.82)}75%,100%{opacity:0;transform:scale(1.16)}}
    @keyframes pickup-collect{45%{opacity:1;transform:scale(1.13)}100%{opacity:0;transform:scale(.72) translateY(-12px)}}
    @keyframes pickup-confirm{50%{transform:scale(1.12)}100%{transform:scale(1)}}
    @media(prefers-reduced-motion:reduce){.pickup,.pickup-media img,.pickup::after{animation:none}.pickup{transition:opacity .18s ease}.pickup.collected{opacity:0}}
  </style>
  <button type="button" class="pickup" id="go" aria-label="收進背包">
    <span class="pickup-media" id="item-mark">${_e}<img id="item-image" alt="" draggable="false"/></span>
  </button>
`,`${se}
var started=false;
function start(){
  if(done||started)return;
  started=true;
  var name=str(values.itemName,'神秘道具');
  var note=str(values.itemNote,'');
  var bagVar=str(values.bagVar,'');
  var count=Math.max(1,num(values.itemCount,1));
  var hideAfterCollect=values.hideAfterCollect!==false;
  var button=document.getElementById('go');
  button.setAttribute('aria-label','收進背包：'+name+(count>1?'，數量 '+count:''));
  button.title=name;
  var itemImage=str(values.itemImage,'');
  if(itemImage){
    var image=document.getElementById('item-image');
    image.src=itemImage;image.alt=name;image.style.display='block';
    image.onerror=function(){image.style.display='none';document.querySelector('#item-mark svg').style.display='block';};
    document.querySelector('#item-mark svg').style.display='none';
  }
  var collected=false;
  button.onclick=function(){
    if(collected)return;
    collected=true;button.disabled=true;button.classList.add(hideAfterCollect?'collected':'confirmed');
    var bag=readBag(bagVar);
    var itemId=(str(values.itemId,'').trim()||name.trim()).toLowerCase().replace(/\\s+/g,'-');
    var existing=bag.find(function(item){return String(item.id||item.n)===itemId;});
    var item={id:itemId,n:name,i:itemImage,d:note,q:count,c:values.consumable!==false,e:str(values.effectKind,'none'),v:str(values.effectVar,''),x:values.effectValue,t:str(values.storyNodeId,''),r:readRoutes(values.useRoutes),useConditionVariable:str(values.useConditionVariable,'').trim(),useConditionValue:values.useConditionValue,useConditionMessage:str(values.useConditionMessage,'')};
    if(existing){
      existing.q=Math.max(1,num(existing.q,1))+count;
      existing.n=name;existing.i=itemImage;existing.d=note;existing.c=item.c;existing.e=item.e;existing.v=item.v;existing.x=item.x;existing.t=item.t;existing.r=item.r;
      existing.useConditionVariable=item.useConditionVariable;existing.useConditionValue=item.useConditionValue;existing.useConditionMessage=item.useConditionMessage;
    }else bag.push(item);
    if(bagVar)writeBag(bagVar,bag);
    if(values.countVar)setVar(str(values.countVar,''),bag.reduce(function(total,entry){return total+Math.max(1,num(entry.q,1));},0));
    if(values.autoCollect===true)finish('granted',{item:name,count:count});
    else setTimeout(function(){finish('granted',{item:name,count:count});},280);
  };
  if(values.autoCollect===true){button.style.display='none';button.onclick();}
}`),on=Y("移除道具","<style>.wrap{display:none}</style>",`${se}
function start(){
  if(done)return;
  var bagVar=str(values.bagVar,'');
  var id=str(values.itemId,'').trim().toLowerCase().replace(/\\s+/g,'-');
  var name=str(values.itemName,'').trim();
  var quantity=Number(values.itemCount);
  quantity=Number.isFinite(quantity)?Math.max(0,Math.floor(quantity)):1;
  var remaining=quantity,removed=0;
  var bag=readBag(bagVar).filter(function(item){
    if(!item||typeof item!=='object')return true;
    var matches=id?String(item.id||item.n||'').trim().toLowerCase().replace(/\\s+/g,'-')===id:!!name&&String(item.n||'')===name;
    if(!matches||(quantity!==0&&remaining===0))return true;
    var count=Math.max(1,num(item.q,1));
    var take=quantity===0?count:Math.min(count,remaining);
    removed+=take;remaining-=take;
    if(take===count)return false;
    item.q=count-take;return true;
  });
  if(bagVar&&removed)writeBag(bagVar,bag);
  if(values.countVar)setVar(str(values.countVar,''),bag.reduce(function(total,item){return total+Math.max(1,num(item&&item.q,1));},0));
  finish('removed',{item:id||name,count:removed});
}`),sn=Y("打開背包",`
  <h1 id="title">背包 <small id="hint"></small></h1>
  <div id="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;max-height:42vh;overflow:auto;padding:2px"></div>
  <div id="info" class="soft-card" style="min-height:42px;padding:10px 12px;font-size:11px;line-height:1.6;color:#758078">選擇道具查看資訊</div>
  <p id="empty" style="display:none;font-size:12px;color:#7a867d;padding:20px 0;text-align:center"></p>
  <div class="row"><button class="ghost" id="skip">什麼都不拿</button><button class="cta" id="go" disabled>使用</button></div>
`,`${se}
var picked=-1,bag=[],bagVar='';
function itemCount(item){return Math.max(1,num(item.q,1));}
function effectValue(raw){
  if(raw===true||raw==='true')return true;if(raw===false||raw==='false')return false;
  if(raw!==''&&!isNaN(Number(raw)))return Number(raw);return raw;
}
function useEffectOf(item){
  if(!item.v||!item.e||item.e==='none')return;
  var before=vars[item.v],amount=Number(item.x)||0,next;
  if(item.e==='add')next=(Number(before)||0)+amount;
  else if(item.e==='subtract')next=(Number(before)||0)-amount;
  else if(item.e==='toggle')next=!Boolean(before);
  else next=effectValue(item.x);
  setVar(item.v,next);
}
function render(){
  var grid=document.getElementById('grid');
  grid.innerHTML='';
  document.getElementById('empty').style.display=bag.length?'none':'block';
  bag.forEach(function(item,index){
    var cell=document.createElement('button');
    cell.style.cssText='display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding:11px;border-radius:15px;text-align:left;color:#27322b;'+
      'border:1px solid '+(picked===index?'#78a67d':'#e3eae2')+';'+
      'background:'+(picked===index?'#edf5ed':'#f7f9f6')+';box-shadow:'+(picked===index?'0 8px 20px rgba(77,117,83,.13)':'none')+';transition:transform .38s cubic-bezier(.18,1.35,.36,1),background .18s,border-color .18s';
    cell.innerHTML='${_e}<b style="font-size:12px">'+
      String(item.n||'道具').replace(/</g,'&lt;')+'</b>'+(itemCount(item)>1?'<small style="color:#6a776d">×'+itemCount(item)+'</small>':'');
    cell.onmouseenter=function(){cell.style.transform='translateY(-3px)';document.getElementById('info').textContent=String(item.d||'沒有額外說明。');};
    cell.onmouseleave=function(){cell.style.transform='';};
    cell.onclick=function(){ picked=index; document.getElementById('go').disabled=false; render(); };
    cell.onfocus=function(){document.getElementById('info').textContent=String(item.d||'沒有額外說明。');};
    grid.appendChild(cell);
  });
}
function start(){
  bagVar=str(values.bagVar,'');
  bag=readBag(bagVar);
  document.getElementById('title').firstChild.textContent=str(values.title,'背包')+' ';
  document.getElementById('hint').textContent=bag.length?(bag.length+' 件道具'):'';
  document.getElementById('empty').textContent=str(values.emptyText,'背包是空的。');
  var skip=document.getElementById('skip');
  skip.style.display=values.allowSkip===false?'none':'';
  skip.onclick=function(){ if(values.pickVar) setVar(str(values.pickVar,''),''); finish('skipped'); };
  document.getElementById('go').onclick=function(){
    if(picked<0)return;
    var item=bag[picked];
    var condition=String(item.useConditionVariable||'').trim();
    if(condition&&(!Object.prototype.hasOwnProperty.call(vars,condition)||vars[condition]!==effectValue(item.useConditionValue==null?'':item.useConditionValue))){
      var info=document.getElementById('info');
      info.setAttribute('role','alert');
      info.textContent=String(item.useConditionMessage||'').trim()||(locale.indexOf('zh')===0?'目前不符合使用條件，無法使用這個道具。':'You cannot use this item until its condition is met.');
      return;
    }
    parent.postMessage({type:'larch:inventory-use',target:item.t||'',routes:readRoutes(item.r||item.useRoutes)},'*');
    if(values.pickVar) setVar(str(values.pickVar,''),String(item.n||''));
    useEffectOf(item);
    if(values.consume!==false&&item.c!==false&&bagVar){
      if(itemCount(item)>1)item.q=itemCount(item)-1;else bag.splice(picked,1);
      writeBag(bagVar,bag);
    }
    finish('used',{item:item.n,target:item.t||'',routes:readRoutes(item.r||item.useRoutes)});
  };
  render();
}`),Ge=e=>Y(e?"開啟背包功能":"關閉背包功能",`
  <h1>${e?"開啟背包功能":"關閉背包功能"} <small>${e?"SHOW HUD":"HIDE HUD"}</small></h1>
  <div class="soft-card" style="display:flex;align-items:center;gap:12px;padding:14px">
    <div class="item-mark">${an}</div>
    <div><b style="display:block;font-size:14px">${e?"背包按鈕已顯示":"背包按鈕已隱藏"}</b><p style="margin-top:4px;color:#748077;font-size:11px">故事會自動繼續。</p></div>
  </div>
`,`
function start(){
  setVar('inventoryHudVisible',${e?"true":"false"});
  setTimeout(function(){finish('${e?"shown":"hidden"}');},80);
}`),ln=Ge(!0),cn=Ge(!1),dn=oe("地圖探索",`
  <h1 id="title">探索 <small id="stats"></small></h1>
  <div id="board" style="align-self:center;display:grid;gap:2px;padding:10px;border-radius:16px;
    background:rgba(0,0,0,.3);border:1px solid rgba(244,241,234,.12);max-width:100%;overflow:auto"></div>
  <div id="pad" style="align-self:center;display:grid;grid-template-columns:repeat(3,46px);grid-template-rows:repeat(2,46px);gap:5px"></div>
  <div class="row"><span id="log" style="margin-right:auto;font-size:12px;opacity:.6"></span><button class="cta" id="go" disabled>離開地圖</button></div>
`,`
var map=[],player={x:0,y:0},steps=0,loot=0,goal=null,reached=false,cell=30;
var THEMES={
  stone:{wall:'#3b3730',floor:'#1d1b17',edge:'rgba(244,241,234,.05)'},
  grass:{wall:'#2f4030',floor:'#18241a',edge:'rgba(200,255,200,.06)'},
  night:{wall:'#2a2b3d',floor:'#141520',edge:'rgba(190,200,255,.07)'}
};
function draw(){
  var theme=THEMES[str(values.tileTheme,'stone')]||THEMES.stone;
  var board=document.getElementById('board');
  board.style.gridTemplateColumns='repeat('+map[0].length+','+cell+'px)';
  board.innerHTML='';
  for(var y=0;y<map.length;y++)for(var x=0;x<map[y].length;x++){
    var tile=map[y][x];
    var box=document.createElement('div');
    box.style.cssText='width:'+cell+'px;height:'+cell+'px;display:grid;place-items:center;border-radius:5px;font-size:'+Math.round(cell*.62)+'px;'+
      'background:'+(tile==='#'?theme.wall:theme.floor)+';box-shadow:inset 0 0 0 1px '+theme.edge;
    if(player.x===x&&player.y===y) box.textContent=str(values.playerEmoji,'🧍');
    else if(tile==='G') box.textContent=str(values.goalEmoji,'🚪');
    else if(tile==='*') box.textContent=str(values.lootEmoji,'✨');
    board.appendChild(box);
  }
  document.getElementById('stats').textContent=steps+' 步'+(loot?(' · '+loot+' 個收穫'):'');
}
function move(dx,dy){
  if(reached)return;
  var x=player.x+dx,y=player.y+dy;
  if(y<0||y>=map.length||x<0||x>=map[y].length||map[y][x]==='#')return;
  player.x=x;player.y=y;steps++;
  if(map[y][x]==='*'){ map[y]=map[y].slice(0,x)+'.'+map[y].slice(x+1); loot++; document.getElementById('log').textContent='撿到東西了'; }
  if(map[y][x]==='G'){
    reached=true;
    document.getElementById('log').textContent=str(values.goalText,'抵達出口。');
    document.getElementById('go').disabled=false;
    if(values.autoFinish!==false) setTimeout(complete,450);
  }
  draw();
}
function complete(){
  if(values.stepsVar) setVar(str(values.stepsVar,''),steps);
  if(values.lootVar) setVar(str(values.lootVar,''),loot);
  if(values.goalVar) setVar(str(values.goalVar,''),reached?'reached':'left');
  finish(reached?'reached':'left',{steps:steps,loot:loot});
}
function start(){
  document.getElementById('title').firstChild.textContent=str(values.title,'探索')+' ';
  var rows=lines(values.mapText);
  if(!rows.length) rows=['#######','#S..*.#','#.###.#','#....G#','#######'];
  var width=Math.max.apply(null,rows.map(function(row){return row.length;}));
  map=rows.map(function(row){
    var padded=row;
    while(padded.length<width) padded+='#';
    return padded;
  });
  for(var y=0;y<map.length;y++){
    var start=map[y].indexOf('S');
    if(start>=0){ player={x:start,y:y}; map[y]=map[y].slice(0,start)+'.'+map[y].slice(start+1); }
    if(map[y].indexOf('G')>=0) goal=true;
  }
  cell=Math.max(18,Math.min(40,Math.floor((Math.min(window.innerWidth,620)-52)/width)));
  var pad=[['','↑',''],['←','↓','→']];
  var deltas={'↑':[0,-1],'↓':[0,1],'←':[-1,0],'→':[1,0]};
  var padBox=document.getElementById('pad');
  pad.forEach(function(row){ row.forEach(function(key){
    var button=document.createElement('button');
    button.textContent=key;
    button.style.cssText=key?'border-radius:12px;background:rgba(244,241,234,.08);border:1px solid rgba(244,241,234,.14);font-size:16px':'visibility:hidden';
    if(key) button.onclick=function(){ move(deltas[key][0],deltas[key][1]); };
    padBox.appendChild(button);
  });});
  window.addEventListener('keydown',function(event){
    var keys={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
    var delta=keys[event.key];
    if(delta){ event.preventDefault(); move(delta[0],delta[1]); }
  });
  document.getElementById('go').onclick=complete;
  if(!goal) document.getElementById('go').disabled=false;
  draw();
}`),un=oe("擲骰",`
  <h1 id="title">擲骰</h1>
  <canvas id="stage" style="width:100%;aspect-ratio:16/9;border-radius:16px;background:linear-gradient(180deg,#1b1a16,#0f0e0c);border:1px solid rgba(244,241,234,.12)"></canvas>
  <div class="row"><span id="out" style="margin-right:auto;font-size:13px;opacity:.75"></span>
    <button class="ghost" id="roll">重擲</button><button class="cta" id="go" disabled>繼續</button></div>
`,`
var canvas,ctx,dice=[],running=false,total=0,scale=1;
function reset(){
  var count=Math.max(1,Math.min(6,Math.round(num(values.diceCount,2))));
  var sides=Math.max(2,Math.min(100,Math.round(num(values.sides,6))));
  dice=[];
  for(var index=0;index<count;index++) dice.push({
    x:60+index*20, y:40+index*14, vx:2.6+Math.random()*3.4, vy:1+Math.random()*2,
    angle:Math.random()*6.28, spin:(Math.random()-.5)*.5, size:34, sides:sides, face:1, rest:0
  });
  running=true;total=0;
  document.getElementById('out').textContent='';
  document.getElementById('go').disabled=true;
}
function step(){
  var width=canvas.width/scale,height=canvas.height/scale;
  var gravity=num(values.gravity,0.42),bounce=Math.min(.95,Math.max(.05,num(values.bounce,0.52)));
  var moving=false;
  dice.forEach(function(die){
    die.vy+=gravity;
    die.x+=die.vx;die.y+=die.vy;die.angle+=die.spin;
    var half=die.size/2;
    if(die.x-half<4){ die.x=4+half; die.vx=Math.abs(die.vx)*bounce; die.spin=-die.spin*.8; }
    if(die.x+half>width-4){ die.x=width-4-half; die.vx=-Math.abs(die.vx)*bounce; die.spin=-die.spin*.8; }
    if(die.y+half>height-4){
      die.y=height-4-half;
      die.vy=-Math.abs(die.vy)*bounce;
      die.vx*=.82;die.spin*=.7;
      if(Math.abs(die.vy)<1.1){ die.vy=0;die.spin*=.4; }
    }
    if(die.y-half<4){ die.y=4+half; die.vy=Math.abs(die.vy)*bounce; }
    var settled=Math.abs(die.vy)<.35&&Math.abs(die.vx)<.25&&die.y+half>height-8;
    die.rest=settled?die.rest+1:0;
    if(die.rest<26){ moving=true; die.face=1+Math.floor(Math.random()*die.sides); }
    else { die.angle=Math.round(die.angle/1.5708)*1.5708; die.spin=0; }
  });
  if(!moving&&running) settle();
}
function pip(x,y,radius){ ctx.beginPath();ctx.arc(x,y,radius,0,6.284);ctx.fill(); }
function paint(){
  var width=canvas.width/scale,height=canvas.height/scale;
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle='rgba(244,241,234,.06)';ctx.fillRect(0,height-5,width,5);
  dice.forEach(function(die){
    ctx.save();ctx.translate(die.x,die.y);ctx.rotate(die.angle);
    var half=die.size/2,radius=7;
    ctx.fillStyle='#f4f1ea';ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=12;ctx.shadowOffsetY=4;
    ctx.beginPath();
    ctx.moveTo(-half+radius,-half);
    ctx.arcTo(half,-half,half,half,radius);ctx.arcTo(half,half,-half,half,radius);
    ctx.arcTo(-half,half,-half,-half,radius);ctx.arcTo(-half,-half,half,-half,radius);
    ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#17150f';
    if(die.sides===6){
      var offset=half*.42,dot=half*.13;
      var layout={1:[[0,0]],2:[[-offset,-offset],[offset,offset]],3:[[-offset,-offset],[0,0],[offset,offset]],
        4:[[-offset,-offset],[offset,-offset],[-offset,offset],[offset,offset]],
        5:[[-offset,-offset],[offset,-offset],[0,0],[-offset,offset],[offset,offset]],
        6:[[-offset,-offset],[offset,-offset],[-offset,0],[offset,0],[-offset,offset],[offset,offset]]};
      (layout[die.face]||layout[1]).forEach(function(point){ pip(point[0],point[1],dot); });
    } else {
      ctx.font='600 '+Math.round(half)+'px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(String(die.face),0,1);
    }
    ctx.restore();
  });
}
function settle(){
  running=false;
  total=dice.reduce(function(sum,die){ return sum+die.face; },0);
  var target=Math.round(num(values.targetNumber,0));
  var passed=target>0?total>=target:true;
  var text='擲出 '+dice.map(function(die){return die.face;}).join(' + ')+' ＝ '+total;
  if(target>0) text+=passed?('　✓ 達到 '+target):('　✗ 沒到 '+target);
  document.getElementById('out').textContent=text;
  document.getElementById('go').disabled=false;
  if(values.resultVar) setVar(str(values.resultVar,''),total);
  if(values.passVar) setVar(str(values.passVar,''),passed);
}
function frame(){ if(running) step(); paint(); requestAnimationFrame(frame); }
function start(){
  document.getElementById('title').textContent=str(values.title,'擲骰');
  canvas=document.getElementById('stage');ctx=canvas.getContext('2d');
  function size(){
    scale=window.devicePixelRatio||1;
    canvas.width=canvas.clientWidth*scale;canvas.height=canvas.clientHeight*scale;
    ctx.setTransform(scale,0,0,scale,0,0);
  }
  size();window.addEventListener('resize',size);
  document.getElementById('roll').onclick=reset;
  document.getElementById('go').onclick=function(){ finish('rolled',{total:total}); };
  reset();frame();
}`),fn=oe("立繪演出",`
  <div id="stage" style="position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;
    background:#0d0c0a;border:1px solid rgba(244,241,234,.12)">
    <img id="bg" alt="" style="position:absolute;inset:-6%;width:112%;height:112%;object-fit:cover;opacity:.85;transition:transform .35s ease-out">
    <img id="art" alt="" style="position:absolute;left:50%;bottom:0;height:96%;transform:translateX(-50%);object-fit:contain;
      transform-origin:50% 100%;transition:transform .35s ease-out">
    <p id="caption" style="position:absolute;left:0;right:0;bottom:0;padding:16px 18px;font-size:14px;line-height:1.65;
      background:linear-gradient(transparent,rgba(10,9,8,.88));display:none"></p>
  </div>
  <div class="row"><span id="hint" style="margin-right:auto;font-size:12px;opacity:.5">移動滑鼠看看</span><button class="cta" id="go">繼續</button></div>
`,`
function start(){
  var art=document.getElementById('art'),bg=document.getElementById('bg'),stage=document.getElementById('stage');
  var portrait=str(values.portrait,''),background=str(values.background,'');
  if(portrait) art.src=portrait; else art.style.display='none';
  if(background) bg.src=background; else bg.style.background='radial-gradient(80% 80% at 50% 20%,#2b2924,#111)';
  var caption=str(values.caption,'');
  if(caption){ var box=document.getElementById('caption'); box.textContent=caption; box.style.display='block'; }

  var sway=num(values.sway,6),breathe=values.breathe!==false,parallax=values.parallax!==false;
  var tiltX=0,tiltY=0;
  function apply(phase){
    var lift=breathe?Math.sin(phase/900)*1.1:0;
    var scale=breathe?1+Math.sin(phase/900)*0.012:1;
    art.style.transform='translateX(calc(-50% + '+(tiltX*sway)+'px)) translateY('+(lift+tiltY*sway*.4)+'px) scale('+scale+')';
    bg.style.transform='translate('+(-tiltX*sway*.5)+'px,'+(-tiltY*sway*.3)+'px)';
  }
  function tick(now){ apply(now); requestAnimationFrame(tick); }
  if(parallax){
    stage.addEventListener('pointermove',function(event){
      var rect=stage.getBoundingClientRect();
      tiltX=((event.clientX-rect.left)/rect.width-.5)*2;
      tiltY=((event.clientY-rect.top)/rect.height-.5)*2;
    });
    stage.addEventListener('pointerleave',function(){ tiltX=0;tiltY=0; });
  } else document.getElementById('hint').style.display='none';
  requestAnimationFrame(tick);

  var hold=Math.round(num(values.holdMs,0));
  if(hold>0) setTimeout(function(){ finish('shown'); },hold);
  document.getElementById('go').onclick=function(){ finish('shown'); };
}`),le=e=>`<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
function reply(requestId, effects){ parent.postMessage({ type:'larch:result', requestId: requestId, effects: effects || [] }, '*'); }
${e}
parent.postMessage({ type:'larch:ready' }, '*');
window.addEventListener('message', function(event){
  var data = event.data;
  if(!data || data.type !== 'larch:invoke') return;
  var effects = [];
  try { effects = handle(data.context || {}) || []; }
  catch (error) { effects = [{ kind:'toast', message:'擴充功能執行失敗：' + (error && error.message ? error.message : error) }]; }
  reply(data.requestId, effects);
});
<\/script></body></html>`,mn=le(`
function orderCards(cards, edges){
  var byId = {}, indegree = {}, out = {};
  cards.forEach(function(card){ byId[card.id] = card; indegree[card.id] = 0; out[card.id] = []; });
  edges.forEach(function(edge){
    if(!byId[edge.source] || !byId[edge.target]) return;
    out[edge.source].push(edge.target);
    indegree[edge.target] = (indegree[edge.target] || 0) + 1;
  });
  // 起點：作者標的開始卡優先，其次是沒有人指向它的卡片。
  var roots = cards.filter(function(card){ return card.start; }).map(function(card){ return card.id; });
  cards.forEach(function(card){ if(!indegree[card.id] && roots.indexOf(card.id) < 0) roots.push(card.id); });
  var seen = {}, order = [], queue = roots.slice();
  while(queue.length){
    var id = queue.shift();
    if(!id || seen[id] || !byId[id]) continue;
    seen[id] = true; order.push(id);
    (out[id] || []).forEach(function(next){ if(!seen[next]) queue.push(next); });
  }
  // 迴圈或斷在別處的卡片照樣要有位置，不能因為排不進流程就被留在原地。
  cards.forEach(function(card){ if(!seen[card.id]) order.push(card.id); });
  return order;
}
function handle(context){
  var cards = (context.cards || []).filter(function(card){ return card.type !== 'group'; });
  var edges = context.edges || [];
  if(!cards.length) return [{ kind:'toast', message:'這張白板還沒有卡片。' }];

  if(context.command === 'tidy-layout'){
    var columns = Math.max(2, Math.min(8, Number(context.settings.columns) || 4));
    var gapX = Math.max(180, Number(context.settings.gapX) || 360);
    var gapY = Math.max(120, Number(context.settings.gapY) || 240);
    var order = orderCards(cards, edges);
    var positions = order.map(function(id, index){
      var row = Math.floor(index / columns);
      // 蛇行排列：一行由左到右、下一行由右到左，接續的兩張卡才會相鄰。
      var col = row % 2 === 0 ? (index % columns) : (columns - 1 - (index % columns));
      return { id: id, x: 80 + col * gapX, y: 120 + row * gapY };
    });
    return [
      { kind:'moveCards', positions: positions },
      { kind:'toast', message: '已依故事順序重排 ' + positions.length + ' 張卡片。' }
    ];
  }

  if(context.command === 'audit-board'){
    var hasIn = {}, hasOut = {};
    edges.forEach(function(edge){ hasOut[edge.source] = true; hasIn[edge.target] = true; });
    var boardOnly = { group:1, inspiration:1, lore:1 };
    var live = cards.filter(function(card){ return !boardOnly[card.type]; });
    var orphans = live.filter(function(card){ return !hasIn[card.id] && !hasOut[card.id] && !card.start; });
    var deadEnds = live.filter(function(card){ return hasIn[card.id] && !hasOut[card.id] && card.type !== 'boardJump'; });
    var empty = live.filter(function(card){
      if(card.type !== 'dialogue') return false;
      var lines = card.dialogueLines || [];
      if(!lines.length) return !String(card.text || '').trim();
      return lines.every(function(line){ return !String(line.text || '').trim(); });
    });
    var parts = [];
    if(orphans.length) parts.push(orphans.length + ' 張沒接上任何線');
    if(deadEnds.length) parts.push(deadEnds.length + ' 張是死路');
    if(empty.length) parts.push(empty.length + ' 張對話是空的');
    return [{ kind:'toast', message: parts.length ? ('白板檢查：' + parts.join('、') + '。') : ('白板檢查：' + live.length + ' 張卡片都接得起來，沒有發現問題。') }];
  }
  return [];
}`),pn=le(`
var FULL = { ',':'，', '.':'。', '?':'？', '!':'！', ':':'：', ';':'；', '(':'（', ')':'）' };
function tidyText(text){
  return String(text || '')
    .replace(/[ \\t]+/g, ' ')
    .replace(/ *\\n */g, '\\n')
    .replace(/\\n{3,}/g, '\\n\\n')
    .trim();
}
function widen(text){
  // 只轉「中日文字後面」的半形標點：英數之間的逗號小數點不能動。
  return String(text || '').replace(/([\\u4e00-\\u9fff\\u3040-\\u30ff])([,.?!:;()])/g, function(all, char, mark){
    return char + (FULL[mark] || mark);
  });
}
function mapLines(card, transform){
  var patch = {};
  var lines = card.dialogueLines;
  if(Array.isArray(lines) && lines.length){
    patch.dialogueLines = lines.map(function(line){
      var next = {};
      for(var key in line) if(Object.prototype.hasOwnProperty.call(line, key)) next[key] = line[key];
      next.text = transform(line.text);
      // 富文字的 runs 是純文字的來源，改了字就得讓它重新生成，否則畫面上還是舊的。
      delete next.runs;
      return next;
    });
  }
  if(typeof card.text === 'string' && card.text) patch.text = transform(card.text);
  return Object.keys(patch).length ? patch : null;
}
function handle(context){
  var selection = context.selection || [];
  var cards = (context.cards || []).filter(function(card){
    return card.type === 'dialogue' && (!selection.length || selection.indexOf(card.id) >= 0);
  });
  if(!cards.length) return [{ kind:'toast', message:'請先選一張對話卡片。' }];
  var transform = context.command === 'fullwidth-punctuation' ? widen : tidyText;
  var updates = [];
  cards.forEach(function(card){
    var patch = mapLines(card, transform);
    if(patch) updates.push({ id: card.id, patch: patch });
  });
  if(!updates.length) return [{ kind:'toast', message:'這些卡片沒有需要調整的台詞。' }];
  return [
    { kind:'updateCards', cards: updates },
    { kind:'toast', message: (context.command === 'fullwidth-punctuation' ? '已把 ' : '已整理 ') + updates.length + ' 張卡片的台詞。' }
  ];
}`),hn=le(`
function handle(context){
  if(context.hook !== 'project:save' && context.command !== 'check-now') return [];
  var cards = context.cards || [];
  var edges = context.edges || [];
  var boardOnly = { group:1, inspiration:1, lore:1 };
  var live = cards.filter(function(card){ return !boardOnly[card.type]; });
  if(!live.length) return [];
  var hasOut = {};
  edges.forEach(function(edge){ hasOut[edge.source] = true; });
  var problems = [];
  var noStart = !live.some(function(card){ return card.start; });
  if(noStart) problems.push('沒有設定開始卡片');
  var brokenChoice = live.filter(function(card){
    if(card.type !== 'choice') return false;
    var outgoing = edges.filter(function(edge){ return edge.source === card.id; }).length;
    return outgoing < (card.choices || []).length && card.choiceMode !== 'shared';
  });
  if(brokenChoice.length) problems.push(brokenChoice.length + ' 張選擇卡有選項還沒接出去');
  var emptyDialogue = live.filter(function(card){
    if(card.type !== 'dialogue') return false;
    var lines = card.dialogueLines || [];
    if(!lines.length) return !String(card.text || '').trim();
    return lines.some(function(line){ return !String(line.text || '').trim(); });
  });
  if(emptyDialogue.length) problems.push(emptyDialogue.length + ' 張對話卡有空白台詞');
  if(!problems.length) return context.command === 'check-now' ? [{ kind:'toast', message:'存檔檢查：目前沒有發現問題。' }] : [];
  // 存檔時只在有問題時出聲；每次都跳「一切正常」很快就會被當成雜訊而被忽略。
  return [{ kind:'toast', message:'存檔檢查：' + problems.join('、') + '。' }];
}`),gn=[{id:"larch-inventory",name:"背包系統",nameEn:"Inventory system",version:"2.0.0",author:I.name,description:"替專案加上一套可直接使用的道具背包：遊戲左上或右上會出現背包按鈕，玩家可隨時打開、查看道具說明並使用。道具能修改變數或跳到指定劇情，也能把「打開背包」卡片接進對話流程。",descriptionEn:"Adds a ready-to-use item inventory: a configurable top-left or top-right HUD lets players inspect and use items at any time. Items can change variables or jump to a story card, and the Open inventory card fits directly into dialogue flow.",categories:["system","ui"],permissions:["variables:read","variables:write","assets:read","flow:control"],icon:"backpack",cover:B("/packs/larch-inventory-plugin/cover-v3.webp"),gallery:[{url:B("/packs/larch-inventory-plugin/cover-v3.webp"),caption:"讓玩家帶著道具走完整個故事",captionEn:"Let players carry their items through the whole story"},{url:B("/packs/larch-inventory-plugin/shot-vn-bag-v1.webp"),caption:"隨時打開背包，看道具說明、使用道具",captionEn:"Open the bag any time to read about an item and use it"},{url:B("/packs/larch-inventory-plugin/shot-pickup-v1.webp"),caption:"取得道具的那一刻，有專屬的演出",captionEn:"Picking an item up gets its own moment on screen"},{url:B("/packs/larch-inventory-plugin/shot-rpg-bag-v1.webp"),caption:"在 RPG 系統裡自動換成像素風格",captionEn:"In the RPG system it takes on the pixel style"},{url:B("/packs/larch-inventory-plugin/shot-settings-v1.webp"),caption:"背包設定：按鈕、外觀和格子都能調整，右邊即時預覽",captionEn:"Bag settings: the button, the look and the slots, with a live preview"}],overview:`幫你的故事加上一個隨時可以打開的背包。玩家在劇情裡拿到的東西都會收進背包，點一下就能看說明、使用道具。

道具可以改變變數，也可以帶玩家跳到指定的劇情卡片：拿鑰匙開門、送禮物增加好感度、在對的地點用對的東西，都不用寫程式。

背包的外觀、按鈕位置和格子數量都能在「背包設定」裡調整；放進 RPG 系統時，會自動換上像素風格。`,overviewEn:`Give your story a bag that opens any time. Whatever players pick up along the way goes into it, and a tap shows what an item is and lets them use it.

Items can change variables or take players to a story card: a key that opens a door, a gift that raises friendship, the right thing used in the right place, all without code.

The look, the button’s place and the number of slots are set in Inventory settings; inside the RPG system it takes on the pixel style.`,features:["「取得道具」卡片：點擊收取或自動放進背包，附圖片和說明","「打開背包」卡片：在劇情中讓玩家選一件道具，再依選擇分支","使用效果：設定、增加、減少或切換變數，或跳到指定劇情","使用條件：只有在對的地點或狀態下才能使用","常駐背包按鈕：位置、樣式、顏色和格子數量都能調整","和 RPG 系統共用同一個背包，並換上像素風格"],featuresEn:["Grant item card: collect with a click or straight into the bag, with a picture and a note","Open inventory card: players pick an item mid-story and the story branches on it","Use effects: set, add to, subtract from or toggle a variable, or go to a story card","Use conditions: an item works only in the right place or state","A bag button that stays on screen, with its place, style, colours and slots adjustable","Shares one bag with the RPG system, in pixel style there"],official:!0,builtIn:!0,pricing:"free",license:"larch-only",settings:[{key:"hudEnabled",kind:"toggle",label:"顯示背包按鈕",labelEn:"Show inventory button",hint:"關閉後不顯示常駐按鈕，仍可用「打開背包」卡片讓玩家進入背包。",hintEn:"When off, the persistent button is hidden; Open bag cards can still show the inventory.",defaultValue:!0},{key:"hudPosition",kind:"select",label:"背包按鈕位置",labelEn:"Inventory button position",defaultValue:"right",options:[{value:"left",label:"左上角",labelEn:"Top left"},{value:"right",label:"右上角",labelEn:"Top right"}]},{key:"bagVar",kind:"text",label:"背包資料變數",labelEn:"Inventory data variable",hint:"預設使用 inventory；通常不用修改。",hintEn:"Uses inventory by default; usually leave this alone.",defaultValue:"inventory"},{key:"currencyItem",kind:"text",label:"當作錢的道具",labelEn:"Item used as money",hint:"填道具 ID，背包最上面會顯示持有數量；留空會自動找金幣，填 none 就不顯示。",hintEn:"An item id whose count shows at the top of the bag; empty finds coins by itself, none shows no money.",defaultValue:""},{key:"buttonStyle",kind:"select",label:"按鈕樣式",labelEn:"Button style",defaultValue:"pill",options:[{value:"pill",label:"圖示＋文字膠囊",labelEn:"Icon and label pill"},{value:"icon",label:"純圖示按鈕",labelEn:"Icon only"},{value:"image",label:"自訂圖片按鈕",labelEn:"Custom image"}]},{key:"buttonImage",kind:"asset",assetKind:"image",label:"自訂按鈕圖片",labelEn:"Custom button image",hint:"透明 PNG 最適合。",hintEn:"Transparent PNG works best."},{key:"buttonLabel",kind:"text",label:"按鈕文字",labelEn:"Button label",defaultValue:"背包"},{key:"buttonSize",kind:"number",label:"按鈕尺寸",labelEn:"Button size",min:36,max:128,step:2,defaultValue:48},{key:"buttonShowCount",kind:"toggle",label:"顯示道具數量",labelEn:"Show item count",defaultValue:!0},{key:"buttonPositionMode",kind:"select",label:"按鈕位置模式",labelEn:"Button position mode",defaultValue:"preset",options:[{value:"preset",label:"使用左／右上角",labelEn:"Use selected corner"},{value:"custom",label:"使用自訂座標",labelEn:"Use custom coordinates"}]},{key:"buttonX",kind:"number",label:"X 座標（%）",labelEn:"X coordinate (%)",min:0,max:100,step:1,defaultValue:86},{key:"buttonY",kind:"number",label:"Y 座標（%）",labelEn:"Y coordinate (%)",min:0,max:100,step:1,defaultValue:12},{key:"buttonPivot",kind:"select",label:"按鈕 Pivot",labelEn:"Button pivot",defaultValue:"top-left",options:[{value:"top-left",label:"左上",labelEn:"Top left"},{value:"top-center",label:"上中",labelEn:"Top center"},{value:"top-right",label:"右上",labelEn:"Top right"},{value:"center-left",label:"左中",labelEn:"Center left"},{value:"center",label:"中央",labelEn:"Center"},{value:"center-right",label:"右中",labelEn:"Center right"},{value:"bottom-left",label:"左下",labelEn:"Bottom left"},{value:"bottom-center",label:"下中",labelEn:"Bottom center"},{value:"bottom-right",label:"右下",labelEn:"Bottom right"}]},{key:"slotCount",kind:"number",label:"背包格數",labelEn:"Inventory slots",min:6,max:30,step:1,defaultValue:12},{key:"accentColor",kind:"color",label:"重點色",labelEn:"Accent color",defaultValue:"#78a67d"},{key:"surfaceColor",kind:"color",label:"面板顏色",labelEn:"Panel color",defaultValue:"#ffffff"},{key:"surfaceOpacity",kind:"number",label:"介面透明度",labelEn:"UI opacity",min:.25,max:1,step:.05,defaultValue:.94},{key:"itemColor",kind:"color",label:"格子顏色",labelEn:"Slot color",defaultValue:"#f3f6f2"},{key:"textColor",kind:"color",label:"文字顏色",labelEn:"Text color",defaultValue:"#27322b"},{key:"radius",kind:"number",label:"圓角",labelEn:"Corner radius",min:14,max:32,step:1,defaultValue:22},{key:"motionStyle",kind:"select",label:"互動手感",labelEn:"Motion feel",defaultValue:"gentle",options:[{value:"gentle",label:"柔和",labelEn:"Gentle"},{value:"bouncy",label:"活潑彈跳",labelEn:"Bouncy"},{value:"calm",label:"安靜緩和",labelEn:"Calm"}]},{key:"shadowStyle",kind:"select",label:"陰影風格",labelEn:"Shadow style",defaultValue:"soft",options:[{value:"soft",label:"柔和",labelEn:"Soft"},{value:"flat",label:"平面",labelEn:"Flat"},{value:"float",label:"漂浮",labelEn:"Floating"}]}],cards:[{id:"grant-item",name:"取得道具",nameEn:"Grant item",description:"點擊收取或自動把道具加入背包。",descriptionEn:"Collect an item by clicking or add it to the inventory automatically.",icon:"box",color:"#78a67d",presentation:"fullscreen",skippable:!1,html:rn,fields:[{key:"autoCollect",kind:"toggle",label:"自動加入背包",labelEn:"Automatically add to inventory",hint:"進入卡片時直接加入並繼續故事，不需要點擊。",hintEn:"Adds the item on entry and continues the story without a click.",defaultValue:!1},{key:"itemId",kind:"text",label:"道具 ID",labelEn:"Item ID",hint:"選填；留空時由名稱產生。同 ID 的道具會累加數量。",hintEn:"Optional; generated from the name when empty. Items with the same ID stack."},{key:"itemName",kind:"text",label:"道具名稱",labelEn:"Item name",defaultValue:"繩索"},{key:"itemImage",kind:"asset",assetKind:"image",label:"道具圖片",labelEn:"Item image",hint:"會顯示在取得畫面與背包格子中。",hintEn:"Shown in the pickup moment and inventory slot."},{key:"itemNote",kind:"longText",label:"道具資訊",labelEn:"Item information",placeholder:"在背包裡選到這件道具時顯示的說明",hint:"玩家在背包中點選這件道具時，會顯示在右側的說明欄。",hintEn:"Shown in the detail pane when the player selects this item in the inventory."},{key:"crossover",kind:"toggle",label:"開放聯動",labelEn:"Open for crossovers",hint:"玩家拿到後會收進帳號的「聯動收藏」，其他作品可以把它加進自己的背包。",hintEn:"Players who get it keep it in their account’s crossover collection, and other works can add it to their own bag.",defaultValue:!1},{key:"crossoverSync",kind:"toggle",label:"已經拿到的玩家也一起更新",labelEn:"Update it for players who already have it",hint:"之後改了名字、圖片或說明，玩家聯動收藏裡的這件也會換成新的（作品發布更新後）。關掉就留著他們當初拿到時的樣子。",hintEn:"When you change its name, picture or description later, players’ crossover collections show the new version too (once the update is published). Turn it off to keep the version they got.",defaultValue:!0},{key:"itemCount",kind:"number",label:"數量",labelEn:"Count",min:1,max:99,step:1,defaultValue:1},{key:"hideAfterCollect",kind:"toggle",label:"點擊收取後讓圖片消失",labelEn:"Hide image after collecting",hint:"取消勾選時，道具圖片會保留到下一張卡片出現。",hintEn:"When disabled, the item image remains until the next card appears.",defaultValue:!0},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",hint:"兩張卡片要指向同一個變數",hintEn:"Both cards must point at the same variable",defaultValue:"inventory"},{key:"countVar",kind:"variable",label:"道具數量寫進",labelEn:"Write item count to",hint:"想在選項上判斷「身上有幾件」時才需要",hintEn:"Only needed if you branch on how many items are held"},{key:"useConditionVariable",kind:"variable",label:"使用條件變數",labelEn:"Use condition variable",hint:"不指定時可隨時使用；指定後，變數必須等於下方的值。",hintEn:"Leave unused to allow use anytime; otherwise the variable must equal the value below."},{key:"useConditionValue",kind:"text",label:"必須等於",labelEn:"Must equal",hint:"可填文字、數字、true 或 false。",hintEn:"Accepts text, numbers, true or false."},{key:"useConditionMessage",kind:"longText",label:"條件不成立時的提示",labelEn:"Message when condition is not met",hint:"留空時顯示「目前不符合使用條件，無法使用這個道具。」",hintEn:"If empty, shows “You cannot use this item until its condition is met.”"},{key:"consumable",kind:"toggle",label:"使用後消耗一個",labelEn:"Consume one after use",defaultValue:!0},{key:"effectKind",kind:"select",label:"使用後改變變數",labelEn:"Variable effect on use",defaultValue:"none",options:[{value:"none",label:"不改變",labelEn:"No change"},{value:"set",label:"設成指定值",labelEn:"Set value"},{value:"add",label:"增加數值",labelEn:"Add number"},{value:"subtract",label:"減少數值",labelEn:"Subtract number"},{value:"toggle",label:"切換成立／不成立",labelEn:"Toggle true / false"}]},{key:"effectVar",kind:"variable",label:"要影響的變數",labelEn:"Variable to affect"},{key:"effectValue",kind:"text",label:"變數參數",labelEn:"Effect value",hint:"加減填數字；設定可填文字、數字、true 或 false。",hintEn:"Use a number for add/subtract; set accepts text, numbers, true or false."},{key:"storyNodeId",kind:"storyCard",label:"使用後前往卡片",labelEn:"Story card after use",hint:"選填；使用後會立刻前往所選卡片。",hintEn:"Optional. Using the item immediately jumps to the selected card."}]},{id:"remove-item",name:"移除道具",nameEn:"Remove item",description:"進入卡片時，自動依 ID 或名稱移除背包道具並繼續故事。",descriptionEn:"Automatically removes inventory items by ID or name and continues the story.",icon:"box",color:"#78a67d",presentation:"inline",skippable:!1,html:on,fields:[{key:"itemId",kind:"text",label:"道具 ID",labelEn:"Item ID",hint:"優先以 ID 比對；留空時使用下方名稱。",hintEn:"Matches by ID first; leave empty to match by name."},{key:"itemName",kind:"text",label:"道具名稱",labelEn:"Item name",hint:"ID 留空時，移除名稱完全相同的道具。",hintEn:"When ID is empty, matches the exact item name."},{key:"itemCount",kind:"number",label:"移除數量（0 為全部）",labelEn:"Quantity to remove (0 for all)",min:0,max:99,step:1,defaultValue:1},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",defaultValue:"inventory"},{key:"countVar",kind:"variable",label:"剩餘道具總數寫進",labelEn:"Write remaining total count to"}]},{id:"open-bag",name:"打開背包",nameEn:"Open bag",description:"列出背包裡的道具，玩家挑一件之後繼續故事。",descriptionEn:"Lists what is in the bag and lets the player use one before the story continues.",icon:"backpack",color:"#6f9474",presentation:"inline",html:sn,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"背包"},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",defaultValue:"inventory"},{key:"pickVar",kind:"variable",label:"選到的道具寫進",labelEn:"Write the pick to",hint:"之後用選項或條件連線判斷玩家用了什麼",hintEn:"Branch on it afterwards with a choice or condition",defaultValue:"inventoryLastUsed"},{key:"consume",kind:"toggle",label:"用完就從背包移除",labelEn:"Consume on use",defaultValue:!0},{key:"allowSkip",kind:"toggle",label:"允許什麼都不拿",labelEn:"Allow leaving empty-handed",defaultValue:!0},{key:"emptyText",kind:"text",label:"背包空的時候顯示",labelEn:"Empty state text",defaultValue:"背包是空的。"}]},{id:"show-hud",name:"開啟背包功能",nameEn:"Enable inventory",description:"顯示遊戲中的背包按鈕，之後玩家可以隨時打開背包。",descriptionEn:"Shows the in-game inventory button so players can open the bag at any time.",icon:"backpack",color:"#78a67d",presentation:"inline",html:ln,writeVariables:["inventoryHudVisible"]},{id:"hide-hud",name:"關閉背包功能",nameEn:"Disable inventory",description:"隱藏遊戲中的背包按鈕；背包內容會保留，之後仍可再次開啟。",descriptionEn:"Hides the in-game inventory button while keeping every item for later.",icon:"backpack",color:"#8f9b91",presentation:"inline",html:cn,writeVariables:["inventoryHudVisible"]}]},{id:"larch-rpg-map",name:"RPG 格子地圖",nameEn:"RPG grid map",version:"1.0.0",author:I.name,description:"用純文字畫一張格子地圖，玩家用方向鍵或螢幕上的十字鍵走到出口。走了幾步、撿到幾個東西都寫得回故事變數，可以拿來決定接下來演哪一段。",descriptionEn:"Draw a grid map as plain text and let the player walk it to the exit with arrow keys or the on-screen pad. Steps taken and pickups are written back into story variables, ready to branch on.",categories:["map","system"],permissions:["variables:write","flow:control"],icon:"map",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"explore",name:"地圖探索",nameEn:"Explore map",description:"一段可走的格子地圖，抵達出口就繼續故事。",descriptionEn:"A walkable grid; reaching the exit resumes the story.",icon:"compass",color:"#4a7358",presentation:"inline",html:dn,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"探索"},{key:"mapText",kind:"longText",label:"地圖",labelEn:"Map",hint:"# 牆、. 地板、S 起點、G 出口、* 收穫。一行一列。",hintEn:"# wall, . floor, S start, G exit, * pickup. One row per line.",defaultValue:`#########
#S..#...#
#.#.#.#.#
#.#...#*#
#.#####.#
#......G#
#########`},{key:"tileTheme",kind:"select",label:"地圖風格",labelEn:"Tile theme",defaultValue:"stone",options:[{value:"stone",label:"石造地城",labelEn:"Stone dungeon"},{value:"grass",label:"草地森林",labelEn:"Grass and forest"},{value:"night",label:"夜色",labelEn:"Night"}]},{key:"playerEmoji",kind:"text",label:"玩家圖示",labelEn:"Player icon",defaultValue:"🧍"},{key:"goalEmoji",kind:"text",label:"出口圖示",labelEn:"Exit icon",defaultValue:"🚪"},{key:"lootEmoji",kind:"text",label:"收穫圖示",labelEn:"Pickup icon",defaultValue:"✨"},{key:"goalText",kind:"text",label:"抵達出口時顯示",labelEn:"Arrival text",defaultValue:"抵達出口。"},{key:"goalVar",kind:"variable",label:"結果寫進",labelEn:"Write result to",hint:"抵達出口寫 reached，中途離開寫 left",hintEn:"reached on arrival, left if they bail out"},{key:"stepsVar",kind:"variable",label:"步數寫進",labelEn:"Write step count to"},{key:"lootVar",kind:"variable",label:"收穫數寫進",labelEn:"Write pickup count to"},{key:"autoFinish",kind:"toggle",label:"走到出口就自動繼續",labelEn:"Auto-continue at the exit",defaultValue:!0}]}]},{id:"larch-physics-dice",name:"物理骰子",nameEn:"Physics dice",version:"1.0.0",author:I.name,description:"真的會翻滾、碰撞、慢慢停下來的骰子。設一個門檻值就是一次擲骰檢定，結果與成敗都寫回變數，可以直接接兩條分支演成功與失敗。",descriptionEn:"Dice that actually tumble, bounce and settle. Set a target number to turn it into a skill check — the total and the pass/fail both go back into variables, ready for two branches.",categories:["physics","system"],permissions:["variables:write","flow:control"],icon:"dices",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"roll",name:"擲骰檢定",nameEn:"Dice check",description:"擲一組骰子，總點數與是否過關寫回變數。",descriptionEn:"Rolls a set of dice and writes the total and pass state back.",icon:"dices",color:"#8b4f4f",presentation:"inline",html:un,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"擲骰"},{key:"diceCount",kind:"number",label:"骰子數量",labelEn:"Dice",min:1,max:6,step:1,defaultValue:2},{key:"sides",kind:"number",label:"每顆幾面",labelEn:"Sides",min:2,max:100,step:1,defaultValue:6},{key:"targetNumber",kind:"number",label:"過關門檻",labelEn:"Target number",hint:"0 就是純擲骰，不判成敗",hintEn:"0 means a plain roll with no check",min:0,max:600,step:1,defaultValue:7},{key:"resultVar",kind:"variable",label:"總點數寫進",labelEn:"Write total to"},{key:"passVar",kind:"variable",label:"是否過關寫進",labelEn:"Write pass/fail to"},{key:"gravity",kind:"number",label:"重力",labelEn:"Gravity",min:.1,max:2,step:.05,defaultValue:.42},{key:"bounce",kind:"number",label:"彈性",labelEn:"Bounce",min:.05,max:.95,step:.05,defaultValue:.52}]}]},{id:"larch-portrait-motion",name:"立繪動態演出",nameEn:"Portrait motion",version:"1.0.0",author:I.name,description:"把一張靜態立繪演成會呼吸的鏡頭：立繪隨著呼吸微微起伏，滑鼠移動時立繪與背景以不同幅度位移，做出 2.5D 的景深。給還沒有 Live2D 骨架的角色用。",descriptionEn:"Turns a still portrait into a breathing shot: the art rises and falls, and portrait and background shift at different rates under the pointer for a 2.5D parallax. For characters that have no Live2D rig yet.",categories:["animation","live2d"],permissions:["assets:read","flow:control"],icon:"person",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"portrait",name:"立繪特寫",nameEn:"Portrait shot",description:"一段會呼吸、有景深的立繪特寫。",descriptionEn:"A breathing portrait shot with parallax depth.",icon:"person",color:"#6b5bbd",presentation:"inline",html:fn,fields:[{key:"portrait",kind:"asset",assetKind:"image",label:"立繪",labelEn:"Portrait"},{key:"background",kind:"asset",assetKind:"image",label:"背景",labelEn:"Background"},{key:"caption",kind:"longText",label:"疊在畫面下方的字",labelEn:"Caption"},{key:"breathe",kind:"toggle",label:"呼吸起伏",labelEn:"Breathing",defaultValue:!0},{key:"parallax",kind:"toggle",label:"滑鼠視差",labelEn:"Pointer parallax",defaultValue:!0},{key:"sway",kind:"number",label:"位移幅度",labelEn:"Motion amount",min:0,max:30,step:1,defaultValue:6},{key:"holdMs",kind:"number",label:"幾毫秒後自動繼續",labelEn:"Auto-continue after (ms)",hint:"0 就等玩家自己按繼續",hintEn:"0 waits for the player",min:0,max:2e4,step:250,defaultValue:0}]}]}],bn=[{id:"larch-board-tools",name:"白板整理工具",nameEn:"Board tools",version:"1.0.0",author:I.name,description:"兩個白板層級的工具：依故事順序把卡片重排成整齊的蛇行版面，以及檢查有沒有接不上的卡片、死路與空白對話。重排走的是故事線而不是座標，所以整理完的白板還是你認得的那一張。",descriptionEn:"Two board-level tools: re-flow every card into a tidy serpentine layout that follows the story order, and audit the board for orphans, dead ends and empty dialogue. It follows the story graph, not coordinates, so the tidied board is still the one you recognise.",categories:["tool"],permissions:["cards:read","cards:write","project:read","ui:contribute"],icon:"grid",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:mn,settings:[{key:"columns",kind:"number",label:"每列幾張卡片",labelEn:"Cards per row",min:2,max:8,step:1,defaultValue:4},{key:"gapX",kind:"number",label:"水平間距",labelEn:"Horizontal gap",min:180,max:900,step:20,defaultValue:360},{key:"gapY",kind:"number",label:"垂直間距",labelEn:"Vertical gap",min:120,max:700,step:20,defaultValue:240}],commands:[{id:"tidy-layout",title:"整理白板版面",titleEn:"Tidy the layout",description:"依故事順序重排所有卡片",descriptionEn:"Re-flow every card along the story order",icon:"grid",surfaces:["canvasMenu","toolbar"],confirm:"這會移動白板上所有卡片的位置，確定要重排嗎？（可以用復原還原）",confirmEn:"This moves every card on the board. Continue? (Undo restores it.)"},{id:"audit-board",title:"檢查這張白板",titleEn:"Audit this board",description:"找出沒接線的卡片、死路與空白對話",descriptionEn:"Finds orphans, dead ends and empty dialogue",icon:"compass",surfaces:["canvasMenu","toolbar"]}]},{id:"larch-dialogue-tools",name:"台詞工具",nameEn:"Dialogue tools",version:"1.0.0",author:I.name,description:"在對話卡的右鍵選單多兩項：整理多餘的空白與空行，以及把中文句子裡的半形標點換成全形。從別的地方貼進來的稿子最需要這兩個。",descriptionEn:"Adds two items to a dialogue card’s context menu: tidy stray whitespace and blank lines, and convert half-width punctuation to full-width inside CJK sentences. Pasted drafts need both.",categories:["tool"],permissions:["cards:read","cards:write","ui:contribute"],icon:"scroll",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:pn,commands:[{id:"tidy-lines",title:"整理台詞排版",titleEn:"Tidy the lines",description:"收掉多餘空格與空行",descriptionEn:"Collapses stray spaces and blank lines",icon:"scroll",surfaces:["cardMenu","inspector"],cardTypes:["dialogue"]},{id:"fullwidth-punctuation",title:"標點改成全形",titleEn:"Full-width punctuation",description:"只轉中文句子裡的半形標點",descriptionEn:"Only converts punctuation inside CJK sentences",icon:"wand",surfaces:["cardMenu","inspector"],cardTypes:["dialogue"]}]},{id:"larch-save-guard",name:"存檔守門員",nameEn:"Save guard",version:"1.0.0",author:I.name,description:"每次存檔時檢查一遍：有沒有設開始卡片、選擇卡的選項是不是都接出去了、對話卡有沒有空白台詞。沒問題就不出聲，有問題才提醒 —— 每次都說「一切正常」的提示很快就會被無視。",descriptionEn:"Runs a check on every save: is there a start card, are all choice options wired up, are any dialogue lines blank. It stays quiet when everything is fine — a notice that always fires is a notice nobody reads.",categories:["tool"],permissions:["cards:read","project:read","save:hook","ui:contribute"],icon:"shapes",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:hn,hooks:["project:save"],commands:[{id:"check-now",title:"立刻檢查故事",titleEn:"Check the story now",description:"不等存檔，現在就跑一次",descriptionEn:"Runs the save check right now",icon:"shapes",surfaces:["canvasMenu","toolbar"]}]},{id:"larch-theme-inkwell",name:"墨井主題",nameEn:"Inkwell theme",version:"1.0.0",author:I.name,description:"把編輯器換成偏藍的冷色調，圓角也收得更緊一些。這個擴充功能示範的是最單純的一種擴充：沒有程式碼，只有一組介面變數。",descriptionEn:"Recolours the editor to a cool blue-leaning palette with tighter corners. It demonstrates the simplest kind of plugin there is: no code at all, just a set of interface tokens.",categories:["ui"],permissions:["theme:write"],icon:"palette",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],theme:{"--larch-ink":"#161a22","--larch-muted":"#6b7382","--larch-line":"#dfe3ea","--larch-paper":"#f7f9fc"}}],ce=[...gn,...bn],yn=new Set(st),Wa=ce.filter(e=>yn.has(e.id));new Set(ce.map(e=>e.id));const Je=ce.find(e=>e.id==="larch-inventory"),G=Je.cards.find(e=>e.id==="grant-item"),de=Object.fromEntries((G.fields||[]).filter(e=>e.defaultValue!==void 0).map(e=>[e.key,e.defaultValue])),Ze={itemId:"inventoryId",itemName:"inventoryName",itemImage:"inventoryImage",itemNote:"inventoryDescription",itemCount:"inventoryCount",bagVar:"inventoryBagVar",countVar:"inventoryCountVar",consumable:"inventoryConsumable",effectKind:"inventoryEffectKind",effectVar:"inventoryEffectVariable",effectValue:"inventoryEffectValue",storyNodeId:"inventoryStoryNodeId",useConditionVariable:"inventoryUseConditionVariable",useConditionValue:"inventoryUseConditionValue",useConditionMessage:"inventoryUseConditionMessage",hideAfterCollect:"hideAfterClick",crossover:"inventoryCrossover",crossoverSync:"inventoryCrossoverSync"};function vn(e,t,n="inventory"){const a=Ct(e,t),i={...de,itemId:a.id,itemName:a.name,itemImage:a.icon,consumable:a.consumable,bagVar:n,countVar:"inventoryCount",hideAfterCollect:!!t.hideAfterClick};for(const[r,o]of Object.entries(Ze))t[o]!==void 0&&(i[r]=t[o]);return t.inventoryUseRoutes?.length&&(i.useRoutes=JSON.stringify(A(t.inventoryUseRoutes))),i.itemId=t.inventoryId?.trim()?t.inventoryId:a.id,i.bagVar=t.inventoryBagVar?.trim()||n,i}function Me(e){const t=Object.fromEntries(Object.entries(Ze).filter(([n])=>e[n]!==void 0).map(([n,a])=>[a,e[n]]));return e.useRoutes===void 0?t:{...t,inventoryUseRoutes:A(e.useRoutes)}}function ue(e){return[{id:e.activeBoardId,name:e.boards?.find(n=>n.id===e.activeBoardId)?.name||"白板",nodes:e.nodes,edges:e.edges},...(e.boards||[]).filter(n=>n.id!==e.activeBoardId)]}function fe(e,t="inventory"){const n=[];for(const a of e){a.data.type==="plugin"&&a.data.pluginId==="larch-inventory"&&a.data.pluginCardId==="grant-item"&&n.push({location:{nodeId:a.id},values:{...de,...a.data.pluginValues},cardTitle:a.data.title||"取得道具"});const i=(r,o,s)=>{if(r)for(const d of["actors","props","videos"])for(const c of r[d]||[])c.clickAction?.kind==="inventory"&&n.push({location:{nodeId:a.id,lineId:o,collection:d,objectId:c.id},values:vn(c,c.clickAction,t),cardTitle:a.data.title||a.id,page:s})};i(a.data.stage),a.data.dialogueLines?.forEach((r,o)=>i(r.stage,r.id,o+1))}return n}function Qe(e){const t=String(e.settings.plugins?.["larch-inventory"]?.settings?.bagVar||"inventory");return ue(e).flatMap(n=>fe(n.nodes,t).map(a=>({...a,boardName:n.name,location:{...a.location,boardId:n.id}})))}function xn(e,t,n){const a=ue(e).find(s=>s.id===t.boardId),i=a?.nodes.find(s=>s.id===t.nodeId);if(!a||!i)return null;let r=i.data;if(t.collection){if(!t.objectId&&!["scene","dialogue"].includes(r.type))return null;const s=t.lineId?r.dialogueLines?.find(l=>l.id===t.lineId):void 0;if(t.lineId&&!s)return null;const d=t.objectId?s?.stage||r.stage:_t(r,s,Qt(a.nodes,a.edges,i.id)?.stage);if(!d)return null;let c;if(t.objectId){const l=d[t.collection]?.find(u=>u.id===t.objectId);if(!l||l.clickAction?.kind!=="inventory")return null;c={...d,[t.collection]:d[t.collection].map(u=>u.id===t.objectId?{...u,clickAction:{...u.clickAction,...Me(n),kind:"inventory"}}:u)}}else{const l=tn(String(n.itemImage||""),String(n.itemName||"道具"));c={...d,props:[...d.props||[],{...l,clickAction:{...Me(n),kind:"inventory"}}]}}r=s?{...r,dialogueLines:r.dialogueLines.map(l=>l.id===s.id?{...l,stage:c}:l)}:{...r,...Xe(c)}}else{if(r.pluginId!=="larch-inventory"||r.pluginCardId!=="grant-item")return null;const s={...de,...r.pluginValues,...n},d=(G.fields||[]).filter(c=>c.kind==="variable").map(c=>String(s[c.key]||"")).filter(Boolean);r={...r,pluginValues:s,pluginHtml:G.html,pluginVersion:Je.version,pluginReadVars:[...new Set([...r.pluginReadVars||[],...d])],pluginWriteVars:[...new Set([...r.pluginWriteVars||[],...d])]}}const o=a.nodes.map(s=>s.id===i.id?{...s,data:r}:s);return{...e,...a.id===e.activeBoardId?{nodes:o}:{},boards:e.boards?.map(s=>s.id===a.id?{...s,nodes:o,updatedAt:new Date().toISOString()}:s)}}const et=["itemId","itemName","itemImage","itemNote","bagVar","consumable","effectKind","effectVar","effectValue","useConditionVariable","useConditionValue","useConditionMessage","useRoutes","storyNodeId","crossover","crossoverSync","crossProject","crossRef","crossWork","crossStats","crossLater","crossVar"];function ja(e){const t=String(e.effectKind||"none"),n=A(e.useRoutes);return{id:me(e),name:String(e.itemName||e.itemId||"道具"),icon:String(e.itemImage||""),description:String(e.itemNote||""),count:Math.max(1,Math.round(Number(e.itemCount)||1)),consumable:e.consumable!==!1,effectKind:["none","set","add","subtract","toggle"].includes(t)?t:"none",...String(e.effectVar||"").trim()?{effectVariable:String(e.effectVar).trim(),effectValue:e.effectValue}:{},...String(e.storyNodeId||"").trim()?{storyNodeId:String(e.storyNodeId).trim()}:{},...n.length?{useRoutes:n}:{},...String(e.useConditionVariable||"").trim()?{useConditionVariable:String(e.useConditionVariable).trim(),useConditionValue:e.useConditionValue,useConditionMessage:String(e.useConditionMessage||"")}:{}}}const me=e=>(String(e.itemId||"").trim()||String(e.itemName||"").trim()).toLowerCase().replace(/\s+/g,"-"),q=e=>String(e.settings.plugins?.["larch-inventory"]?.settings?.bagVar||"inventory");function E(e,t){const n=me(e);return n?JSON.stringify([String(e.bagVar||t).trim()||t,n]):""}function U(e,t){const n={};for(const a of et)e[a]!==void 0&&(n[a]=e[a]);return{...n,itemId:me(e),bagVar:String(e.bagVar||t).trim()||t}}function K(e){let t=e.settings.plugins?.["larch-inventory"]?.settings?.items;if(typeof t=="string")try{t=JSON.parse(t)}catch{t=[]}if(!Array.isArray(t))return[];const n=q(e),a=new Set;return t.flatMap(i=>{if(!i||typeof i!="object"||Array.isArray(i))return[];const r={};for(const d of et){const c=i[d];(typeof c=="string"||typeof c=="boolean"||typeof c=="number"&&Number.isFinite(c))&&(r[d]=c)}const o=U(r,n),s=E(o,n);return!s||!String(o.itemName||"").trim()||a.has(s)?[]:(a.add(s),[o])})}function J(e,t){const n=e.settings.plugins||{},a=n["larch-inventory"]||{enabled:!0};return{...e,settings:{...e.settings,plugins:{...n,"larch-inventory":{...a,settings:{...a.settings||{},items:JSON.stringify(t)}}}}}}function _a(e){const t=q(e),n=new Map;for(const a of K(e)){const i=E(a,t);n.set(i,{key:i,values:a,inLibrary:!0,sources:[]})}for(const a of Qe(e)){const i=U(a.values,t),r=E(i,t);r&&(n.has(r)||n.set(r,{key:r,values:i,inLibrary:!1,sources:[]}),n.get(r).sources.push({location:a.location,kind:a.location.collection?"stage":"card",boardName:a.boardName,cardTitle:a.cardTitle,...a.page?{page:a.page}:{}}))}return[...n.values()]}function Ga(e,t,n){const a=q(e),i=U(n,a),r=E(i,a);if(!r)return e;const o=K(e),s=t?o.findIndex(l=>E(l,a)===t):-1;let d=s>=0?J(e,o.flatMap((l,u)=>u===s?[i]:E(l,a)===r?[]:[l])):t===null?J(e,[...o.filter(l=>E(l,a)!==r),i]):e;const c=t??r;for(const l of ue(d))for(const u of fe(l.nodes,a))E(U(u.values,a),a)===c&&(d=xn(d,{...u.location,boardId:l.id},{...u.values,...i})||d);return d}function Ja(e,t){const n=q(e);return J(e,K(e).filter(a=>E(a,n)!==t))}export{za as $,Ia as A,Ca as B,R as C,ae as D,ht as E,Xt as F,Va as G,ka as H,Sa as I,O as J,vn as K,Gn as L,Me as M,Ot as N,Ua as O,Qt as P,ie as Q,_t as R,re as S,Ta as T,Ra as U,Pa as V,tn as W,Ie as X,_ as Y,$a as Z,Jt as _,Fn as a,oa as a$,Ka as a0,zt as a1,mt as a2,Kn as a3,Yn as a4,j as a5,be as a6,D as a7,Ae as a8,Z as a9,na as aA,aa as aB,ta as aC,ra as aD,St as aE,ca as aF,ua as aG,la as aH,da as aI,ja as aJ,Ln as aK,ha as aL,pa as aM,fa as aN,ia as aO,Qn as aP,rn as aQ,Fa as aR,ma as aS,Oa as aT,Mt as aU,Un as aV,$ as aW,Ke as aX,Bn as aY,ea as aZ,sa as a_,Wn as aa,ee as ab,qn as ac,Mn as ad,An as ae,Q as af,Nn as ag,We as ah,q as ai,K as aj,E as ak,Qe as al,U as am,Pn as an,$n as ao,jn as ap,W as aq,Be as ar,Xa as as,Zn as at,Ja as au,Ga as av,xn as aw,ba as ax,ya as ay,Nt as az,ze as b,On as b0,Xn as b1,wa as b2,Ea as b3,Kt as b4,Se as b5,Ct as b6,Jn as b7,La as b8,yt as b9,_a as ba,Ce as bb,ce as bc,sn as bd,Ya as be,De as bf,Ue as bg,Ut as bh,ct as bi,dt as bj,ut as bk,Rn as bl,Je as bm,we as bn,Da as c,Dn as d,me as e,Hn as f,_n as g,de as h,te as i,G as j,qa as k,$t as l,zn as m,Tn as n,Wa as o,A as p,Aa as q,ga as r,Xe as s,Na as t,va as u,Ma as v,Ba as w,Tt as x,xa as y,Ha as z};
