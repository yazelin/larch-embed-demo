import{af as Vt,at as Mt,ao as Nt,L}from"./index-BiUSOoji.js";import{f as At}from"./rpg-core-CKeu5hXC.js";import{r as w}from"./react-core-Ci-x9IAP.js";import{o as te,h as Bt,j as Lt,f as N}from"./akarionMedia-BkIMgOoi.js";import{o as V,q as Rt}from"./builtInPropThumbnails.generated-C59IzV5m.js";import{e as We,l as Ot,a as Tt,b as Pt}from"./larch-math-D2H1mtik.js";const se=e=>e.op==="hasItem"||e.op==="lacksItem";function Ht(e,t,n){const r=String(n??"").trim();if(!r)return!1;let a=[];if(typeof e=="string"&&e.trim())try{const o=JSON.parse(e);Array.isArray(o)&&(a=o)}catch{a=e.split(/[,、]/).map(o=>({n:o.trim()})).filter(o=>o.n)}const i=a.some(o=>{if(!o||typeof o!="object")return!1;const s=o,l=String(s.id||s.n||"").trim().toLowerCase().replace(/\s+/g,"-"),c=s.q===void 0?1:Number(s.q);return l===r&&Number.isFinite(c)&&c>0});return t==="lacksItem"?!i:i}function Na(e,t=!0){const n=new Set;return[...Array.isArray(e)?[]:j(e).map(i=>({values:i,cardTitle:t?"道具管理":"Item manager",location:{nodeId:""}})),...Array.isArray(e)?we(e):vt(e)].flatMap(({values:i,cardTitle:o,location:s})=>{const l=String(i.itemName||"神秘道具"),c=(String(i.itemId||"").trim()||l.trim()).toLowerCase().replace(/\s+/g,"-"),d=i.bagVar===void 0?"inventory":String(i.bagVar).trim(),u=JSON.stringify([d,c]);return!c||!d||n.has(u)?[]:(n.add(u),[{key:u,id:c,bagVar:d,name:l,cardTitle:o,nodeId:s.nodeId}])})}const le=e=>e.op==="eventRan"||e.op==="eventNotRan",Aa=(e,t)=>JSON.stringify([e,t]);function Ft(e,t,n){let r,a;try{r=JSON.parse(String(n??""))}catch{return!1}if(!Array.isArray(r)||!r[0]||!r[1])return!1;const i=String(r[0]),o=String(r[1]);try{a=typeof e=="string"?JSON.parse(e||"{}"):e}catch{a={}}const s=a&&typeof a=="object"?a[i]:void 0,l=!!(s&&Array.isArray(s.ran)&&s.ran.some(c=>String(c)===o));return t==="eventNotRan"?!l:l}const Ba="__larch_cards__",ce=e=>e.op==="cardRan"||e.op==="cardNotRan",La=e=>JSON.stringify([...e]);function $t(e,t,n){const r=String(n??"").trim();if(!r)return!1;let a=e;if(typeof e=="string")try{a=JSON.parse(e||"[]")}catch{a=[]}const i=Array.isArray(a)&&a.some(o=>String(o)===r);return t==="cardNotRan"?!i:i}function Ra(e,t,n){if(typeof e!="string")return!1;try{const r=JSON.parse(e)?.state?.mapBy;return typeof r=="string"&&!!r&&r!==t&&n.indexOf(r)<0}catch{return!1}}function Oa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&!!t):[]}const Ta=[{id:"set",zh:"設為",en:"Set to",zhHint:"直接指定一個值；數字可以寫算式，例如 {a}+{b}",enHint:"Write a value straight in — numbers take a formula like {a}+{b}"},{id:"add",zh:"增減",en:"Add",zhHint:"在原本的數字上加減，填負數就是扣；也可以寫算式",enHint:"Adds to the current number — negatives subtract; formulas work too"},{id:"toggle",zh:"反轉",en:"Flip",zhHint:"true 變 false、false 變 true",enHint:"true becomes false, and back"},{id:"random",zh:"隨機",en:"Random",zhHint:"在範圍內擲一次骰子",enHint:"Rolls once inside the range"}];let Ce=0;function Pa(e=""){return Ce+=1,{id:globalThis.crypto?.randomUUID?globalThis.crypto.randomUUID():`op-${Date.now().toString(36)}-${Ce}`,variable:e,kind:"set",value:""}}const I=e=>{const t=Number(e);return Number.isFinite(t)?t:0};function z(e){if(typeof e=="boolean")return e;if(typeof e=="number")return e!==0;const t=String(e??"").trim().toLowerCase();return t!==""&&t!=="false"&&t!=="0"}function Ve(e,t,n){return!n||!de(e)?I(e):We(e,Ot(t))??I(e)}const de=e=>typeof e=="string"&&/[{}+\-*/()×÷（）＋－＊／]/.test(e.trim().replace(/^[+-]/,""));function Ha(e){const t=e.trim();return t?/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(t)&&String(Number(t))===t?Number(t):e:""}function Fa(e,t){return de(e)?We(e,n=>t.find(r=>r.name===n)?.defaultValue)!==null:!0}function Dt(e,t){return t==="number"?I(e):t==="boolean"?z(e):t==="string"?typeof e=="string"?e:String(e??""):typeof e=="number"||typeof e=="boolean"?e:String(e??"")}function $a(e){return Object.fromEntries((e||[]).map(t=>[t.name,t.type]))}function Da(e,t,n={},r=Math.random){if(!e?.length)return t;const a={...t};for(const i of e){const o=i?.variable?.trim();if(!o)continue;const s=n[o],l=a[o],c=i.valueFrom?a[i.valueFrom]:i.value,d=!i.valueFrom;if(i.kind==="add"){a[o]=I(l)+Ve(c,a,d);continue}if(i.kind==="toggle"){a[o]=!z(l);continue}if(i.kind==="random"){if(s==="boolean"){a[o]=r()<.5;continue}const u=Math.round(I(i.min??0)),m=Math.round(I(i.max??100)),b=Math.min(u,m),p=Math.max(u,m);a[o]=b+Math.floor(r()*(p-b+1));continue}a[o]=s==="number"?Ve(c,a,d):Dt(c,s)}return a}function _t(e,t){const n=e.variable?.trim();if(!n)return t?"還沒選變數":"No variable chosen";const r=e.valueFrom?`{${e.valueFrom}}`:String(e.value??"");if(e.kind==="toggle")return`${n} → ${t?"反轉":"flip"}`;if(e.kind==="random")return`${n} → ${t?"隨機":"random"} ${Math.round(I(e.min??0))}–${Math.round(I(e.max??100))}`;if(e.kind==="add"){if(!e.valueFrom&&de(e.value))return`${n} + (${e.value.trim()})`;const a=e.valueFrom?r:I(e.value),i=!e.valueFrom&&I(e.value)<0?"−":"+";return`${n} ${i} ${e.valueFrom?r:Math.abs(a)}`}return`${n} = ${r===""?t?"（空白）":"(empty)":r}`}function _a(e,t){const n=(e||[]).filter(r=>r?.variable?.trim());return n.length?n.map(r=>_t(r,t)).join(" · "):t?"還沒設定任何變數":"No changes yet"}function Ua(e,t){const n=new Set(e.map(r=>r.id));return t.filter(r=>n.has(r.source)&&n.has(r.target))}const ne=e=>{const t=e||"";return t.startsWith("choice-")||t.startsWith("exit-")||t.startsWith("quiz-")?t:""},Me=e=>`${e.source}\0${ne(e.sourceHandle)}`;function za(e){const t=new Map;for(const i of e)t.set(i.source,[...t.get(i.source)||[],i]);const n=new Set,r=new Map,a=i=>{r.set(i,"visiting");for(const o of t.get(i)||[]){const s=r.get(o.target);s==="visiting"?n.add(o.id):s!=="done"&&a(o.target)}r.set(i,"done")};for(const i of e)r.has(i.source)||a(i.source);return n}function qa(e,t){const n=ne(t.sourceHandle),r=new Set;for(const a of e)a.source!==t.source||a.target!==t.target||ne(a.sourceHandle)===n&&r.add(a.id);return r}const ae=e=>{const t=e.data?.condition;return t?t.kind==="ai"?Ke(t).some(n=>!!n.prompt?.trim()):X(t).some(n=>!!n.variable?.trim()):!1};function Ya(e){const t=new Map;for(const r of e)t.set(Me(r),[...t.get(Me(r))||[],r]);const n=new Map;for(const r of t.values()){if(r.length<2)continue;let a=!1;for(const i of r){if(ae(i)){n.set(i.id,"guarded");continue}n.set(i.id,a?"blocked":"default"),a=!0}}return n}function Xa(e){return[...e.filter(t=>ae(t)),...e.filter(t=>!ae(t))]}const Ut=(e,t,n)=>{const r=typeof e=="number"||typeof n=="number",a=r?Number(e):String(e??""),i=r?Number(n):String(n??"");switch(t){case"gt":return a>i;case"gte":return a>=i;case"lt":return a<i;case"lte":return a<=i;case"neq":return a!==i;default:return a===i}};function X(e){return!e||e.kind!=="variable"?[]:e.conditions?.length?e.conditions:[{variable:e.variable,op:e.op,value:e.value,valueSource:e.valueSource,valueFrom:e.valueFrom}]}function Wa(e,t="all"){const n=e[0]||{};return{kind:"variable",variable:n.variable,op:n.op||"eq",value:n.value,valueSource:n.valueSource,valueFrom:n.valueFrom,conditions:e,match:t}}function Ke(e){return!e||e.kind!=="ai"?[]:e.aiConditions?.length?e.aiConditions:[{prompt:e.prompt}]}function Ka(e,t="all"){return{kind:"ai",prompt:(e[0]||{}).prompt,aiConditions:e,match:t}}function je(e,t){if(!e)return!0;if(e.kind==="ai")return;const n=X(e).filter(a=>!!a.variable?.trim());if(!n.length)return!0;const r=n.map(a=>{const i=t[a.variable];if(se(a))return Ht(i,a.op,a.value);if(le(a))return Ft(i,a.op,a.value);if(ce(a))return $t(i,a.op,a.value);const o=a.valueSource==="variable"||!!a.valueFrom;if(o&&(!a.valueFrom||!Object.prototype.hasOwnProperty.call(t,a.valueFrom)))return!1;const s=o?t[a.valueFrom]:typeof i=="number"?Number(a.value):a.value;return Ut(i,a.op||"eq",s)});return e.match==="any"?r.some(Boolean):r.every(Boolean)}function ja(e,t){if(!e)return!0;const n=X(e);return!n.length||n.some(r=>!r.variable?.trim()||!se(r)&&!le(r)&&!ce(r)&&!Object.prototype.hasOwnProperty.call(t,r.variable))?!1:je(e,t)===!0}function Ga(e,t,n={}){if(!e)return t?"沒有條件，永遠通行":"No condition — always taken";if(e.kind==="ai"){const o=Ke(e).flatMap(s=>s.prompt?.trim()?[s.prompt.trim()]:[]);return o.length?`${t?"AI 判斷：":"AI decides: "}${o.join(e.match==="any"?t?" 或 ":" OR ":t?" 且 ":" AND ")}`:t?"AI 判斷（尚未填寫）":"AI condition (empty)"}const r=X(e).filter(o=>!!o.variable?.trim());if(!r.length)return t?"尚未選擇變數":"No variable chosen";const a={gt:">",gte:"≥",lt:"<",lte:"≤",eq:"=",neq:"≠"};return r.map(o=>{if(se(o))return`${o.variable} ${o.op==="hasItem"?t?"持有":"has":t?"未持有":"lacks"} ${o.value||(t?"（尚未選擇道具）":"(no item selected)")}`;if(le(o)){const d=o.variableLabel?.trim()||(t?"事件":"An event");return o.op==="eventNotRan"?t?`「${d}」還沒執行過`:`“${d}” has not run`:t?`「${d}」執行過`:`“${d}” has run`}if(ce(o)){const d=o.variableLabel?.trim()||(t?"卡片":"A card");return o.op==="cardNotRan"?t?`卡片「${d}」還沒執行過`:`Card “${d}” has not run`:t?`卡片「${d}」執行過`:`Card “${d}” has run`}if(Vt(o.variable)){const d=o.op==="neq"?!z(o.value):z(o.value);return`${o.variableLabel?.trim()||(t?"CG 收藏":"CG collection")} ${d?t?"已解鎖":"is unlocked":t?"尚未解鎖":"is locked"}`}const s=o.valueSource==="variable"||!!o.valueFrom,l=n[o.variable]||o.variable,c=s?o.valueFrom?t?`變數 ${n[o.valueFrom]||o.valueFrom}`:`variable ${n[o.valueFrom]||o.valueFrom}`:t?"未選變數":"no variable":String(o.value??"");return`${l} ${a[o.op||"eq"]} ${c}`}).join(e.match==="any"?t?" 或 ":" OR ":t?" 且 ":" AND ")}function zt(e){return!e||e.kind!=="card"?[]:e.routes?.length?e.routes:e.targetNodeId||e.condition?[{id:"legacy",targetNodeId:e.targetNodeId,condition:e.condition}]:[{id:"legacy"}]}function Ja(e){const t=(e||"").trim();if(!(!t||/\s/.test(t)))return/^(https?:\/\/|mailto:|tel:)/i.test(t)?t:/^[\w-]+(\.[\w-]+)+(:\d+)?([/?#]|$)/.test(t)?`https://${t}`:void 0}function qt(e,t=!1){const n=typeof e=="string"?e.trim():"";if(!(!n||n.length>2048||/\s/.test(n)||!(t?/^https:\/\//i:/^https?:\/\//i).test(n)))try{return new URL(n).href}catch{return}}function Za(e,t=!1){const n=qt(e,t);n&&window.open(n,"_blank","noopener,noreferrer")}function Qa(e,t){return Ge(zt(e),t)}function Ge(e,t){for(const n of e)if(n.targetNodeId&&n.condition&&je(n.condition,t)===!0)return n.targetNodeId;return e.find(n=>n.targetNodeId&&!n.condition)?.targetNodeId}const Ne=(e,t)=>e?t.get(e)||e:void 0;function Yt(e,t){if(!e)return;const n=r=>r?.map(a=>({...a,targetNodeId:Ne(a.targetNodeId,t)}));return{...e,targetNodeId:Ne(e.targetNodeId,t),...e.routes?{routes:n(e.routes)}:{},...e.inventoryUseRoutes?{inventoryUseRoutes:n(e.inventoryUseRoutes)}:{}}}function Ae(e,t){if(!e)return;const n=r=>r.clickAction?{...r,clickAction:Yt(r.clickAction,t)}:r;return{...e,actors:(e.actors||[]).map(n),props:e.props?.map(n),videos:e.videos?.map(n)}}function er(e,t){return{...e,...e.stage?{stage:Ae(e.stage,t)}:{},...e.dialogueLines?{dialogueLines:e.dialogueLines.map(n=>n.stage?{...n,stage:Ae(n.stage,t)}:n)}:{}}}const tr=e=>!!(e&&(e.type==="builtin"||e.type==="model"||e.type==="asset"));function Xt(e){if(!e||typeof e!="object")return;const t=e,n=String(t.type??"").slice(0,20),r=String(t.ref??"").slice(0,120);if(!n||!r)return;const a=s=>typeof s=="string"&&/^#[0-9a-f]{3,8}$/i.test(s),i=Array.isArray(t.colors)?t.colors.filter(a).slice(0,3):[],o=(Array.isArray(t.lights)?t.lights:[]).slice(0,4).flatMap(s=>{const l=s&&typeof s=="object"?s:{},c=Number(l.intensity),d=Number(l.radius);return!a(l.color)||!(c>0)||!(d>0)?[]:[{color:l.color,intensity:Math.min(10,c),radius:Math.min(60,d),...l.nightOnly===!0?{nightOnly:!0}:{}}]});return{type:n,ref:r,...a(t.color)?{color:t.color}:{},...i.length?{colors:i}:{},...o.length?{lights:o}:{}}}const Wt={accentColor:"#78a67d",surfaceColor:"#ffffff",itemColor:"#f3f6f2",textColor:"#27322b",radius:22,motionStyle:"gentle",shadowStyle:"soft",buttonStyle:"pill",buttonImage:"",buttonLabel:"",buttonSize:48,buttonShowCount:!0,buttonPositionMode:"preset",buttonX:86,buttonY:12,buttonPivot:"top-left",surfaceOpacity:.94,slotCount:12,buttonIconScale:.36,textScale:1,showEffectHint:!1,showStoryHint:!1,showUseHint:!0},$=(e,t)=>/^#[\da-f]{6}$/i.test(String(e||""))?String(e):t,Kt=new Set(["gentle","bouncy","calm"]),jt=new Set(["soft","flat","float"]),Gt=new Set(["pill","icon","image"]),Jt=new Set(["preset","custom"]),Zt=new Set(["top-left","top-center","top-right","center-left","center","center-right","bottom-left","bottom-center","bottom-right"]);function nr(e,t={}){const n={...Wt,...t};let r=e;if(typeof r=="string")if(!r.trim())r={};else try{r=JSON.parse(r)}catch{r={}}const a=r&&typeof r=="object"&&!Array.isArray(r)?r:{},i=String(a.motionStyle||n.motionStyle),o=String(a.shadowStyle||n.shadowStyle),s=String(a.buttonStyle||n.buttonStyle),l=String(a.buttonPositionMode||n.buttonPositionMode),c=String(a.buttonPivot||n.buttonPivot),d=a.buttonShowCount,u=(m,b)=>m==null?b:m!==!1&&m!=="false";return{accentColor:$(a.accentColor,n.accentColor),surfaceColor:$(a.surfaceColor,n.surfaceColor),itemColor:$(a.itemColor,n.itemColor),textColor:$(a.textColor,n.textColor),radius:Math.max(14,Math.min(32,Math.round(Number(a.radius??n.radius)||n.radius))),motionStyle:Kt.has(i)?i:n.motionStyle,shadowStyle:jt.has(o)?o:n.shadowStyle,buttonStyle:Gt.has(s)?s:n.buttonStyle,buttonImage:String(a.buttonImage??n.buttonImage??"").trim(),buttonLabel:String(a.buttonLabel??n.buttonLabel??"").trim().slice(0,30),buttonSize:Math.max(36,Math.min(128,Math.round(Number(a.buttonSize??n.buttonSize)||n.buttonSize))),buttonShowCount:d==null?n.buttonShowCount:d!==!1&&d!=="false",buttonPositionMode:Jt.has(l)?l:n.buttonPositionMode,buttonX:Math.max(0,Math.min(100,Number(a.buttonX??n.buttonX)||0)),buttonY:Math.max(0,Math.min(100,Number(a.buttonY??n.buttonY)||0)),buttonPivot:Zt.has(c)?c:n.buttonPivot,surfaceOpacity:Math.max(.25,Math.min(1,Number(a.surfaceOpacity??n.surfaceOpacity)||n.surfaceOpacity)),slotCount:Math.max(6,Math.min(30,Math.round(Number(a.slotCount??n.slotCount)||n.slotCount))),buttonIconScale:Math.max(.2,Math.min(.8,Number(a.buttonIconScale??n.buttonIconScale)||n.buttonIconScale)),textScale:Math.max(.8,Math.min(1.6,Number(a.textScale??n.textScale)||n.textScale)),showEffectHint:u(a.showEffectHint,n.showEffectHint),showStoryHint:u(a.showStoryHint,n.showStoryHint),showUseHint:u(a.showUseHint,n.showUseHint)}}const ue=e=>Math.max(1,Math.min(9999999,Math.round(Number(e)||1))),Je=new Set(["none","set","add","subtract","toggle"]);function R(e){let t=e;if(typeof t=="string"){if(!t.trim())return[];try{t=JSON.parse(t)}catch{return[]}}return Array.isArray(t)?t.flatMap((n,r)=>{if(!n||typeof n!="object"||Array.isArray(n))return[];const a=n,i=String(a.targetNodeId||"").trim()||void 0,o=a.condition&&typeof a.condition=="object"&&!Array.isArray(a.condition)?a.condition:void 0;return[{id:String(a.id||`inventory-route-${r+1}`),...i?{targetNodeId:i}:{},...o?{condition:o}:{}}]}):[]}function Qt(e){const t=R(e.useRoutes);return t.length?t:e.storyNodeId?[{id:"legacy",targetNodeId:e.storyNodeId}]:[]}function ar(e,t){return Ge(Qt(e),t)}function en(e){let t=e;if(typeof t=="string"){const r=t;if(!r.trim())return[];try{t=JSON.parse(r)}catch{t=r.split(/[,、]/).map(a=>({name:a.trim()})).filter(a=>a.name)}}if(!Array.isArray(t))return[];const n=new Map;for(const[r,a]of t.entries()){const i=typeof a=="string"?{name:a}:a;if(!i)continue;const o=String(i.name??i.n??"").trim();if(!o)continue;const s=String(i.id||o.toLocaleLowerCase().replace(/\s+/g,"-")||`item-${r}`),l=String(i.effectKind??i.e??"none"),c=R(i.useRoutes??i.r),d=Xt(i.model??i.m),u={id:s,name:o,icon:String(i.icon??i.i??i.image??""),description:String(i.description??i.d??""),count:ue(i.count??i.q),consumable:(i.consumable??i.c)!==!1,effectKind:Je.has(l)?l:"none",effectVariable:String(i.effectVariable??i.v??"").trim()||void 0,effectValue:i.effectValue??i.x,useConditionVariable:String(i.useConditionVariable??"").trim()||void 0,useConditionValue:i.useConditionValue,useConditionMessage:String(i.useConditionMessage??""),storyNodeId:String(i.storyNodeId??i.t??"").trim()||void 0,...c.length?{useRoutes:c}:{},...d?{model:d}:{}},m=n.get(s);n.set(s,m?{...u,count:m.count+u.count}:u)}return[...n.values()]}function rr(e){return JSON.stringify(e.filter(t=>t.count>0).map(t=>({id:t.id,n:t.name,i:t.icon,d:t.description,q:ue(t.count),c:t.consumable,e:t.effectKind,v:t.effectVariable||"",x:t.effectValue??"",t:t.storyNodeId||"",r:R(t.useRoutes),useConditionVariable:t.useConditionVariable,useConditionValue:t.useConditionValue,useConditionMessage:t.useConditionMessage,...t.model?{m:t.model}:{}})))}const ir=e=>e.reduce((t,n)=>t+n.count,0);function or(e,t){if(!e?.effectVariable||e.effectKind==="none")return"";const n=t?{set:"設為",add:"增加",subtract:"減少",toggle:"切換"}:{set:"Set",add:"Add",subtract:"Subtract",toggle:"Toggle"};return`${e.effectVariable} · ${n[e.effectKind]}${e.effectKind==="toggle"?"":` ${String(e.effectValue??"")}`}`}const tn=["coin","coins","gold","gold-coin","money"];function sr(e,t,n=[]){const r=typeof t=="string"?t.trim():"";if(r==="none")return;const a=r||tn.find(s=>e.some(l=>l.id===s)||n.some(l=>l.id===s));if(!a)return;const i=e.find(s=>s.id===a),o=n.find(s=>s.id===a);return{id:a,name:i?.name||o?.name||a,icon:i?.icon||o?.icon||"",count:i?.count||0}}function nn(e,t,n="道具"){const r=t.inventoryEffectKind||"none",a=R(t.inventoryUseRoutes);return{id:(t.inventoryId?.trim()||`stage-${e.id}`).toLowerCase().replace(/\s+/g,"-"),name:t.inventoryName?.trim()||e.name?.trim()||t.label?.trim()||n,icon:t.inventoryImage??e.url,description:t.inventoryDescription?.trim()||"",count:ue(t.inventoryCount),consumable:t.inventoryConsumable===!0,effectKind:Je.has(r)?r:"none",effectVariable:t.inventoryEffectVariable?.trim()||void 0,effectValue:t.inventoryEffectValue,...t.inventoryStoryNodeId?.trim()?{storyNodeId:t.inventoryStoryNodeId.trim()}:{},...a.length?{useRoutes:a}:{},useConditionVariable:t.inventoryUseConditionVariable?.trim()||void 0,useConditionValue:t.inventoryUseConditionValue,useConditionMessage:t.inventoryUseConditionMessage?.trim()||""}}function lr(e,t){return en([...e,t])}function Ze(e){return e===!0||e==="true"?!0:e===!1||e==="false"?!1:e!==""&&e!=null&&Number.isFinite(Number(e))?Number(e):String(e??"")}function an(e,t){const n=e.useConditionVariable?.trim();return!n||Object.prototype.hasOwnProperty.call(t,n)&&t[n]===Ze(e.useConditionValue)}function cr(e,t){const n={...t};if(!an(e,t))return n;const r=e.effectVariable;if(r&&e.effectKind!=="none"){const a=n[r],i=Number(e.effectValue)||0;e.effectKind==="add"?n[r]=(Number(a)||0)+i:e.effectKind==="subtract"?n[r]=(Number(a)||0)-i:e.effectKind==="toggle"?n[r]=!a:n[r]=Ze(e.effectValue)}return n}function dr(e,t){return e.flatMap((n,r)=>r!==t||!n.consumable?[n]:n.count>1?[{...n,count:n.count-1}]:[])}function rn(){return typeof window>"u"?!1:navigator.standalone?!0:typeof window.matchMedia!="function"?!1:["standalone","fullscreen","minimal-ui"].some(e=>window.matchMedia(`(display-mode: ${e})`).matches)}const on=/\b(Line|FBAN|FBAV|FB_IAB|Instagram|MicroMessenger|Messenger|Threads|TikTok|musical_ly|Snapchat|KAKAOTALK)\b/i;function ur(){if(typeof navigator>"u")return"other";const e=navigator.userAgent;return on.test(e)?"in-app":/iPhone|iPad|iPod/.test(e)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":"other"}const fr=()=>typeof window<"u"&&!!window.__larchInstallPrompt;async function mr(){const e=window.__larchInstallPrompt;if(!e)return!1;window.__larchInstallPrompt=void 0;try{return await e.prompt(),(await e.userChoice).outcome==="accepted"}catch{return!1}}const pr="larch:install-ready",Qe="larch-home-screen-hint",sn=30;function hr(){try{const e=Number(localStorage.getItem(Qe));return Number.isFinite(e)&&e>0&&Date.now()-e<sn*864e5}catch{return!1}}function gr(){try{localStorage.setItem(Qe,String(Date.now()))}catch{}}function br(){try{return window.self!==window.top}catch{return!0}}function yr(e,t){w.useEffect(()=>{if(!t||typeof document>"u")return;const n=document.querySelector('link[rel="manifest"]'),r=document.querySelector('meta[name="apple-mobile-web-app-title"]'),a=n?.getAttribute("href"),i=r?.getAttribute("content"),o=e.trim().slice(0,30);return n?.setAttribute("href",`/api/play-manifest?start=${encodeURIComponent(location.pathname+location.search)}${o?`&name=${encodeURIComponent(o)}`:""}`),r&&o&&r.setAttribute("content",o),()=>{n&&a&&n.setAttribute("href",a),r&&i&&r.setAttribute("content",i)}},[t,e])}const et="larch-immersive",A=()=>document;function tt(){if(typeof document>"u"||A().fullscreenEnabled===!1||A().webkitFullscreenEnabled===!1)return!1;const e=document.documentElement;return typeof e.requestFullscreen=="function"||typeof e.webkitRequestFullscreen=="function"}const S=()=>typeof document>"u"?null:A().fullscreenElement??A().webkitFullscreenElement??null;let nt=null,Be=!1;function at(){const e=n=>{const r=document.createElement("div");r.style.cssText=`position:fixed;top:0;left:0;width:0;height:${n};visibility:hidden;pointer-events:none`,document.documentElement.append(r);const a=r.getBoundingClientRect().height/100;return r.remove(),a},t=e("100vh");return{vh:t,dvh:e("100dvh")||t}}function D(){const e=document.documentElement.style,t=()=>{e.removeProperty("--larch-window-vh"),e.removeProperty("--larch-window-dvh")},n=nt;if(!n||!S())return t();const r=at();let a=n;if(window.innerWidth>=window.innerHeight===n.landscape?n.chrome={vh:Math.max(0,r.vh-n.vh),dvh:Math.max(0,r.dvh-n.dvh)}:a=n.chrome?{vh:Math.max(0,r.vh-n.chrome.vh),dvh:Math.max(0,r.dvh-n.chrome.dvh)}:null,!a)return t();e.setProperty("--larch-window-vh",`${a.vh}px`),e.setProperty("--larch-window-dvh",`${a.dvh}px`)}function ln(){typeof document>"u"||S()||(nt={...at(),landscape:window.innerWidth>=window.innerHeight},!Be&&(Be=!0,document.addEventListener("fullscreenchange",D),document.addEventListener("webkitfullscreenchange",D),window.addEventListener("resize",D),window.addEventListener("orientationchange",D)))}async function rt(e){const t=e;return ln(),typeof t.requestFullscreen=="function"?(await t.requestFullscreen(),!0):typeof t.webkitRequestFullscreen=="function"?(await t.webkitRequestFullscreen(),!0):!1}async function Le(){S()&&(typeof A().exitFullscreen=="function"?await A().exitFullscreen():await A().webkitExitFullscreen?.())}const _=e=>document.documentElement.classList.toggle(et,e),G=()=>document.documentElement.classList.contains(et);let Re=0;const cn=()=>new Promise(e=>{if(S())return e(!0);window.setTimeout(()=>e(!!S()),400)});function vr(){typeof document>"u"||S()||rt(document.documentElement).catch(()=>{})}function xr(){const e=w.useMemo(()=>tt(),[]),[t,n]=w.useState(()=>!!S()||G()),[r,a]=w.useState(!1);w.useEffect(()=>{window.clearTimeout(Re);const l=()=>{const c=!!S()||G();n(c),c||a(!1)};return document.addEventListener("fullscreenchange",l),document.addEventListener("webkitfullscreenchange",l),()=>{document.removeEventListener("fullscreenchange",l),document.removeEventListener("webkitfullscreenchange",l),Re=window.setTimeout(()=>{_(!1),Le()},150)}},[]);const i=w.useCallback(l=>{const c=()=>{_(!0),n(!0),!l&&!rn()&&a(!0)};rt(document.documentElement).then(d=>d?cn():!1).then(d=>{d?(_(!1),a(!1)):c()}).catch(c)},[]),o=w.useCallback(()=>{if(S()){Le();return}if(G()){_(!1),n(!1),a(!1);return}i(!1)},[i]),s=w.useCallback(()=>{S()||i(!0)},[i]);return{active:t,native:e,blocked:r,toggle:o,enter:s}}const Oe={width:1920,height:1080},kr=["contain","cover"],dn=e=>e==="cover"?"cover":e==="contain"?"contain":"auto",fe=.88;function un(e,t,n=1){return!e?.width||!e.height||!t.width||!t.height?0:t.height*fe*(n||1)*(e.width/e.height)/2/t.width*100}function fn(e){const t=Number(e?.width),n=Number(e?.height);return{width:Number.isFinite(t)&&t>0?t:Oe.width,height:Number.isFinite(n)&&n>0?n:Oe.height}}function Te(e,t,n,r="contain"){const a=[e/n.width,t/n.height],i=r==="cover"?Math.max(...a):Math.min(...a);return Number.isFinite(i)&&i>0?i:.01}function mn(){const e=window.orientation;return pn({view:{width:window.innerWidth,height:window.innerHeight},screen:{width:Number(window.screen?.width),height:Number(window.screen?.height)},native:tt(),orientationType:window.screen?.orientation?.type,legacyOrientation:typeof e=="number"?e:void 0,appleTouch:Mt()||Nt()})}function pn(e){const{view:t,screen:n,native:r}=e;if(!r||!(n.width>0&&n.height>0))return t;let a;return e.orientationType?.startsWith("landscape")?a=!0:e.orientationType?.startsWith("portrait")?a=!1:typeof e.legacyOrientation=="number"?a=Math.abs(e.legacyOrientation)===90:e.appleTouch&&(a=t.width>t.height),a===void 0||a===n.width>=n.height?{width:n.width,height:n.height}:{width:n.height,height:n.width}}function hn(e,t){return e.width>0&&e.height>0&&t.width>0?{width:t.width,height:t.width*e.height/e.width}:t}function gn(){return hn(mn(),{width:window.innerWidth,height:window.innerHeight})}function wr(e,t,n,r){const a=dn(t),i=fn(e),[o,s]=w.useState(null),[l,c]=w.useState(()=>({...i,scale:1})),d=i.width,u=i.height,m=r?.width,b=r?.height;return w.useEffect(()=>{if(!o)return;const p=(v,x,h)=>c(f=>f.width===v&&f.height===x&&f.scale===h?f:{width:v,height:x,scale:h}),g=()=>{const v=o.getBoundingClientRect();if(a==="auto"){const x=m&&b?{width:m,height:b}:n?gn():v,h=Math.max(1,Math.round(x.width)),f=Math.max(1,Math.round(x.height));p(h,f,Te(v.width,v.height,{width:h,height:f}));return}p(d,u,Te(v.width,v.height,{width:d,height:u},a))};g();const k=new ResizeObserver(g);return k.observe(o),window.addEventListener("resize",g),window.addEventListener("orientationchange",g),()=>{k.disconnect(),window.removeEventListener("resize",g),window.removeEventListener("orientationchange",g)}},[o,d,u,a,n,m,b]),{...l,fit:a,measureRef:s}}function Er(e,t,n){const r=[...new Set(e)].filter(a=>a&&!t[a]&&te(a)).sort().join(`
`);w.useEffect(()=>{if(!r)return;let a=!0;const i=r.split(`
`).map(o=>{const s=new Image;return s.onload=()=>{a&&s.naturalWidth&&s.naturalHeight&&n(o,{width:s.naturalWidth,height:s.naturalHeight})},s.src=o,s});return()=>{a=!1,i.forEach(o=>{o.onload=null})}},[r,n])}function it(e,t){const n=e.width/e.height,r=t.width/t.height;return!Number.isFinite(n)||!Number.isFinite(r)||r<=0||n<=0?1:Math.min(1,n/r)}const ot=.35,st=.5,Ir=32,bn=.15,Sr=48,Cr=4;function yn(e,t,n,r,a){const i=e.map((f,y)=>y).sort((f,y)=>e[f].centerX-e[y].centerX||f-y),o=i.map(f=>t[f]),s=i.length-1,l=o.slice(1).map((f,y)=>(o[y]+f)*(1-ot)),c=o[0]+o[s]+l.reduce((f,y)=>f+y,0),d=c>0?Math.max(it(n,r),st,Math.min(1,100/c)):1;let u=o[0]*d,m=100-o[s]*d;u>m&&(u=m=(u+m)/2);const b=l.reduce((f,y)=>f+y*d,0),p=b>m-u?(m-u)/b:1,g=i.map(f=>e[f].centerX);g.forEach((f,y)=>{g[y]=Math.max(f,y?g[y-1]+l[y-1]*d*p:u)});for(let f=s;f>=0;f-=1)g[f]=Math.min(g[f],f<s?g[f+1]-l[f]*d*p:m);const k=Math.max(...e.map(f=>f.scale??1)),v=fe*100*k,x=Math.max(0,Math.min(a-v*d*bn,v*(1-d))),h=e.map(f=>({x:f.centerX,scale:(f.scale??1)*d,offsetY:(f.offsetY??0)*d+(f.overBox?0:x)}));return i.forEach((f,y)=>{h[f].x=g[y]}),h}function Vr(e,t,n,r=!0,a){const i=e.map(h=>({x:h.centerX,scale:h.scale??1,offsetY:h.offsetY??0}));if(!r||!e.length)return i;const o=e.map(h=>un(h.natural,t,h.scale??1));if(a&&e.length>1&&t.width<t.height)return yn(e,o,t,n,a.floorCover);const s=e.map((h,f)=>f).sort((h,f)=>e[h].centerX-e[f].centerX||h-f),l=Math.max(it(t,n),st);let c=1;const d=s.filter(h=>o[h]>0);for(let h=1;h<d.length;h+=1){const f=d[h-1],y=d[h],M=o[f]+o[y],T=(e[y].centerX-e[f].centerX)/(M*(1-ot));c=Math.min(c,Math.max(l,Math.min(1,T)))}const u=e.map(h=>h.centerX),m=(Math.min(...u)+Math.max(...u))/2,b=h=>{let f=1/0,y=-1/0;return e.forEach((M,T)=>{const F=m+(M.centerX-m)*h,Se=o[T]*c;f=Math.min(f,F-Se),y=Math.max(y,F+Se)}),{left:f,right:y}};let p=1;if(b(1).right-b(1).left>100){let h=0,f=1;for(let y=0;y<24;y+=1){const M=(h+f)/2,{left:T,right:F}=b(M);F-T>100?f=M:h=M}p=h}const{left:g,right:k}=b(p),v=k-g,x=v>100?(100-v)/2-g:Math.max(-g,Math.min(100-k,0));return e.map((h,f)=>({x:m+(h.centerX-m)*p+x,scale:(h.scale??1)*c,offsetY:(h.offsetY??0)*c}))}const H={farLeft:11,left:27,center:50,right:73,farRight:89},vn=Object.keys(H),P=(e,t=0)=>{if(e===""||e==null)return t;const n=Number(e);return Number.isFinite(n)?n:t},xn=[0,.22,.44,.66],Mr=(e=1)=>xn.map(t=>-Number((t*fe*100*(e||1)).toFixed(2))),lt=1920,ct=1080,dt=e=>e==="farLeft"||e==="left"?"left":e==="farRight"||e==="right"?"right":"center",kn=e=>e==="left"?"left":e==="right"?"right":"center",Nr=e=>vn.reduce((t,n)=>Math.abs(H[n]-e)<Math.abs(H[t]-e)?n:t,"center"),Ar=e=>P(H[e.slot],H.center)+P(e.offsetX),Br=e=>e.dialogueLayer==="front",Lr=e=>e.dialogueLayer==="front",wn=e=>e.width>0&&e.width<e.height;function Rr(e,t){const n=e.portrait;if(!n||!wn(t))return e;const r=P(n.scale,e.scale);return{...e,offsetX:P(n.offsetX,e.offsetX),offsetY:P(n.offsetY,e.offsetY),scale:r>0?r:e.scale}}const En=()=>({actors:[]}),U=e=>e.devices?{devices:Object.fromEntries(Object.entries(e.devices).map(([t,n])=>[t,{...n}]))}:{},re=e=>({actors:(e?.actors||[]).map(t=>({...t,...t.portrait?{portrait:{...t.portrait}}:{},...U(t),...t.clickAction?{clickAction:{...t.clickAction}}:{}})),...e?.props?.length?{props:e.props.map(t=>({...t,...U(t),...t.clickAction?{clickAction:{...t.clickAction}}:{}}))}:{},...e?.texts?.length?{texts:e.texts.map(t=>({...t,...U(t),...t.runs?{runs:t.runs.map(n=>({...n,...n.marks?{marks:n.marks.map(r=>({...r}))}:{}}))}:{}}))}:{},...e?.videos?.length?{videos:e.videos.map(t=>({...t,...U(t),...t.chromaKey?{chromaKey:{...t.chromaKey}}:{},...t.clickAction?{clickAction:{...t.clickAction}}:{}}))}:{}}),In=(e,t)=>{if(!e.loopOnce)return e;const{loop:n,loopOnce:r,...a}=e;return t?{...a,loop:"none"}:a};function Pe(e,t=!1){const n=r=>In(r,t);return{...e,actors:e.actors.map(n),...e.props?{props:e.props.map(n)}:{},...e.texts?{texts:e.texts.map(n)}:{},...e.videos?{videos:e.videos.map(n)}:{}}}const Or=e=>!!(e&&(e.actors.length||e.props?.length||e.texts?.length||e.videos?.length));function Tr(e){if(!e)return e;const t=n=>n.clickAction?.kind!=="card";return{...e,actors:e.actors.filter(t),...e.props?{props:e.props.filter(t)}:{},...e.videos?{videos:e.videos.filter(t)}:{}}}function me(e,t){return t?.stage!==void 0||e.stage!==void 0?!0:!!(e.characterLayers?.length||e.character)}function He(e,t,n){return{id:e.id||L(),characterId:n,name:t,url:e.url,slot:kn(e.position),offsetX:Number(e.x||0)/lt*100,offsetY:-Number(e.y||0)/ct*100,scale:Number(e.scale||1),...e.flipX?{flipX:!0}:{},...e.flipY?{flipY:!0}:{}}}function Sn(e){return{id:e.id,url:e.url,position:dt(e.slot),x:Math.round((e.offsetX||0)/100*lt),y:Math.round(-(e.offsetY||0)/100*ct),scale:e.scale,...e.flipX?{flipX:!0}:{},...e.flipY?{flipY:!0}:{}}}function ut(e){const t=e.actors,n=t[0];return{stage:e,characterLayers:t.map(Sn),character:n?.url,characterPosition:n?dt(n.slot):void 0}}function ft(e){return e.stage?e.stage:e.characterLayers?.length?{actors:e.characterLayers.map(t=>He(t,e.speaker,e.characterId))}:e.character?{actors:[He({id:L(),url:e.character,position:e.characterPosition||"center",x:Number(e.characterX||0),y:Number(e.characterY||0),scale:Number(e.characterScale||1),flipX:!!e.characterFlipX,flipY:!!e.characterFlipY},e.speaker,e.characterId)]}:En()}function mt(e,t){return t?.stage||ft(e)}function Cn(e,t,n,r=0){if(!me(e,t)&&n)return Pe(re(n));const a=re(mt(e,t));return r>0&&!t?.stage?Pe(a):a}function Pr(e,t,n,r){return n?.stage!==void 0?`${e}:${r}`:me(t,n)?e:null}function pe(e,t,n){if(t?.narration)return;if(t?.speakerActorId&&e.actors.some(i=>i.id===t.speakerActorId))return t.speakerActorId;const r=(t?.speaker||n||"").trim(),a=r?e.actors.find(i=>(i.name||"").trim()===r):void 0;if(a)return a.id;if(!t?.speakerActorId)return r?e.actors.find(i=>!(i.name||"").trim()&&!i.characterId)?.id:e.actors[0]?.id}function Hr(e,t,n){return t?.narration||!(t?.speaker||n||"").trim()?!1:!pe(e,t,n)}function Fr(e,t,n){const r=pe(e,t,n);if(!r)return[];const a=(t?.coSpeakerActorIds||[]).filter((i,o,s)=>i!==r&&s.indexOf(i)===o&&e.actors.some(l=>l.id===i));return[r,...a]}function $r(e,t){const n=c=>{const d=String(c.name||"").trim();return c.characterId?"character:"+c.characterId:d?"name:"+d:"actor:"+c.id},r=c=>c.replace(/#\d+$/,""),a=t?t.ids:[],i=t?t.keys:[],o=[],s={};e.forEach((c,d)=>{const u=a.indexOf(c.id),m=u>=0?i[u]:void 0;m&&r(m)===n(c)&&!s[m]&&(o[d]=m,s[m]=!0)});const l={};return e.forEach((c,d)=>{o[d]&&(l[n(c)]=!0)}),e.forEach((c,d)=>{if(!(o[d]||l[n(c)]))for(let u=0;u<i.length;u++){const m=i[u];if(r(m)===n(c)&&!s[m]){o[d]=m,s[m]=!0;return}}}),e.forEach((c,d)=>{if(o[d])return;let u=n(c);for(let m=1;s[u]||i.indexOf(u)>=0;m++)u=n(c)+"#"+m;o[d]=u,s[u]=!0}),o}const Fe=(e,t)=>String(e??"").trim().toLowerCase()===t.trim().toLowerCase(),pt=(e,t)=>t?.find(n=>e.characterId&&n.id===e.characterId)||t?.find(n=>e.name&&n.name===e.name);function Dr(e,t){const n=pt(e,t),r=n?.portraitUrl;return!r||!e.url||r===e.url||!te(r)||!te(e.url)?e.url:(n.expressions||[]).some(a=>a?.imageUrl===e.url)?r:e.url}function Vn(e,t){const n=(e?.expressions||[]).filter(r=>r?.imageUrl);return n.find(r=>r.id===t)||n.find(r=>Fe(r.name,t))||n.find(r=>Fe(r.emotion,t))}function Mn(e,t,n){if(!t?.expression?.trim())return;const r=t.expressionActorId||pe(e,t,n);return r?e.actors.find(a=>a.id===r):void 0}function _r(e,t,n,r){const a=Mn(e,t,r);if(!a)return e;const i=t.expression.trim(),o=Vn(pt(a,n),i),s=o?o.imageUrl===a.url?void 0:{...a,url:o.imageUrl}:Bt(a.url)?{...a,live2d:{...a.live2d,expression:i}}:Lt(a.url)?{...a,mesh:{...a.mesh,expression:i}}:void 0;return s?{...e,actors:e.actors.map(l=>l===a?s:l)}:e}function Ur(e,t,n=!0){return e.actors.filter(a=>t.includes(a.id)).map(a=>(a.name||"").trim()).filter(Boolean).join(n?"＆":" & ")}function zr(e,t,n){const r=new Map(e.map(s=>[s.id,s])),a=new Map;for(const s of t)a.set(s.target,[...a.get(s.target)||[],s.source]);const i=new Set([n]);let o=a.get(n)||[];for(let s=0;s<60&&o.length;s+=1){const l=[];for(const c of o){if(i.has(c))continue;i.add(c);const d=r.get(c);if(d?.data.background)return{url:d.data.background,title:d.data.title};l.push(...a.get(c)||[])}o=l}return null}function Nn(e){const t=e.dialogueLines||[];for(let n=t.length-1;n>=1;n-=1)if(t[n].stage!==void 0)return t[n].stage;return me(e,t[0])?mt(e,t[0]):void 0}function An(e,t,n){const r=new Map(e.map(s=>[s.id,s])),a=new Map;for(const s of t)a.set(s.target,[...a.get(s.target)||[],s.source]);const i=new Set([n]);let o=a.get(n)||[];for(let s=0;s<60&&o.length;s+=1){const l=[];for(const c of o){if(i.has(c))continue;i.add(c);const d=r.get(c),u=d&&Nn(d.data);if(u)return{stage:u,title:d.data.title};l.push(...a.get(c)||[])}o=l}return null}function Bn(e){const t=new Set(e.actors.map(r=>r.slot));return["center","left","right","farLeft","farRight"].find(r=>!t.has(r))||"center"}function qr(e,t,n,r){return{id:L(),characterId:r,name:n,url:e,slot:Bn(t),offsetX:0,offsetY:0,scale:1,enter:"fade"}}function $e(e,t){return t?.some(n=>n.defaultLoop&&n.defaultLoop!=="none")?{...e,actors:e.actors.map(n=>{const r=n.loop?void 0:At(n,t);return r?{...n,loop:r}:n})}:e}function Yr(e,t){if(!t?.some(r=>r.defaultLoop&&r.defaultLoop!=="none"))return e;const n=r=>r?.map(a=>a.stage?{...a,stage:$e(a.stage,t)}:a);return{...e,...e.stage?{stage:$e(e.stage,t)}:{},...e.dialogueLines?{dialogueLines:n(e.dialogueLines)}:{},...e.localizations?{localizations:e.localizations.map(r=>r.dialogueLines?{...r,dialogueLines:n(r.dialogueLines)}:r)}:{}}}function Ln(e,t){return{id:L(),...t?{name:t}:{},url:e,x:50,y:55,scale:.5,depth:"front",enter:"fade"}}function Xr(e,t,n){const r=e.name?.trim();if(r)return r;const a=t?"道具":"Prop";return n===void 0?a:`${a} ${n+1}`}function Wr(e,t,n){return{id:L(),...n?.id?{mediaId:n.id}:{},url:e,...n?.videoFileUrl?{videoFileUrl:n.videoFileUrl}:{},name:t,x:50,y:50,scale:.8,depth:"front",opacity:1,fit:"contain",volume:0,videoLoop:!0,enter:"fade"}}function Rn(e){return{id:L(),url:e.url,name:e.name,x:50,y:50,scale:1.56,depth:"front",opacity:e.opacity??1,fit:e.fit||"contain",volume:0,videoLoop:e.loop!==!1,...e.chromaKey?{chromaKey:{...e.chromaKey}}:{}}}function Kr(e){if(!e.videoOverlay?.url)return e;const t=Rn(e.videoOverlay),n=a=>({...re(a),videos:[...(a.videos||[]).map(i=>({...i})),{...t,...t.chromaKey?{chromaKey:{...t.chromaKey}}:{}}]}),r=n(ft({...e}));return{...e,...ut(r),videoOverlay:void 0,...e.dialogueLines?{dialogueLines:e.dialogueLines.map(a=>a.stage?{...a,stage:n(a.stage)}:a)}:{}}}function jr(e){const t=Math.min(3,e.texts?.length||0)*7;return{id:L(),text:"",x:50,y:28+t,size:6,width:70,align:"center",font:"theme",weight:800,color:"#ffffff",effect:"shadow",effectColor:"#000000",depth:"front",enter:"fade"}}const he=(e,t,n)=>`<!doctype html>
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
<\/script></body></html>`,ht='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9"/></svg>',On='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6.5 8.5h11a2 2 0 0 1 2 2V20h-15v-9.5a2 2 0 0 1 2-2Z"/><path d="M8 13h8v5H8zM8 11v2m8-2v2"/></svg>',W=(e,t,n)=>`<!doctype html>
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
<\/script></body></html>`,ge=`
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
`,Tn=W("取得道具",`
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
    <span class="pickup-media" id="item-mark">${ht}<img id="item-image" alt="" draggable="false"/></span>
  </button>
`,`${ge}
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
}`),Pn=W("移除道具","<style>.wrap{display:none}</style>",`${ge}
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
}`),Hn=W("打開背包",`
  <h1 id="title">背包 <small id="hint"></small></h1>
  <div id="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;max-height:42vh;overflow:auto;padding:2px"></div>
  <div id="info" class="soft-card" style="min-height:42px;padding:10px 12px;font-size:11px;line-height:1.6;color:#758078">選擇道具查看資訊</div>
  <p id="empty" style="display:none;font-size:12px;color:#7a867d;padding:20px 0;text-align:center"></p>
  <div class="row"><button class="ghost" id="skip">什麼都不拿</button><button class="cta" id="go" disabled>使用</button></div>
`,`${ge}
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
    cell.innerHTML='${ht}<b style="font-size:12px">'+
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
}`),gt=e=>W(e?"開啟背包功能":"關閉背包功能",`
  <h1>${e?"開啟背包功能":"關閉背包功能"} <small>${e?"SHOW HUD":"HIDE HUD"}</small></h1>
  <div class="soft-card" style="display:flex;align-items:center;gap:12px;padding:14px">
    <div class="item-mark">${On}</div>
    <div><b style="display:block;font-size:14px">${e?"背包按鈕已顯示":"背包按鈕已隱藏"}</b><p style="margin-top:4px;color:#748077;font-size:11px">故事會自動繼續。</p></div>
  </div>
`,`
function start(){
  setVar('inventoryHudVisible',${e?"true":"false"});
  setTimeout(function(){finish('${e?"shown":"hidden"}');},80);
}`),Fn=gt(!0),$n=gt(!1),Dn=he("地圖探索",`
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
}`),_n=he("擲骰",`
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
}`),Un=he("立繪演出",`
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
}`),be=e=>`<!doctype html><html><head><meta charset="utf-8"></head><body>
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
<\/script></body></html>`,zn=be(`
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
}`),qn=be(`
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
}`),Yn=be(`
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
}`),Xn=[{id:"larch-inventory",name:"背包系統",nameEn:"Inventory system",version:"2.0.0",author:V.name,description:"替專案加上一套可直接使用的道具背包：遊戲左上或右上會出現背包按鈕，玩家可隨時打開、查看道具說明並使用。道具能修改變數或跳到指定劇情，也能把「打開背包」卡片接進對話流程。",descriptionEn:"Adds a ready-to-use item inventory: a configurable top-left or top-right HUD lets players inspect and use items at any time. Items can change variables or jump to a story card, and the Open inventory card fits directly into dialogue flow.",categories:["system","ui"],permissions:["variables:read","variables:write","assets:read","flow:control"],icon:"backpack",cover:N("/packs/larch-inventory-plugin/cover-v3.webp"),gallery:[{url:N("/packs/larch-inventory-plugin/cover-v3.webp"),caption:"讓玩家帶著道具走完整個故事",captionEn:"Let players carry their items through the whole story"},{url:N("/packs/larch-inventory-plugin/shot-vn-bag-v1.webp"),caption:"隨時打開背包，看道具說明、使用道具",captionEn:"Open the bag any time to read about an item and use it"},{url:N("/packs/larch-inventory-plugin/shot-pickup-v1.webp"),caption:"取得道具的那一刻，有專屬的演出",captionEn:"Picking an item up gets its own moment on screen"},{url:N("/packs/larch-inventory-plugin/shot-rpg-bag-v1.webp"),caption:"在 RPG 系統裡自動換成像素風格",captionEn:"In the RPG system it takes on the pixel style"},{url:N("/packs/larch-inventory-plugin/shot-settings-v1.webp"),caption:"背包設定：按鈕、外觀和格子都能調整，右邊即時預覽",captionEn:"Bag settings: the button, the look and the slots, with a live preview"}],overview:`幫你的故事加上一個隨時可以打開的背包。玩家在劇情裡拿到的東西都會收進背包，點一下就能看說明、使用道具。

道具可以改變變數，也可以帶玩家跳到指定的劇情卡片：拿鑰匙開門、送禮物增加好感度、在對的地點用對的東西，都不用寫程式。

背包的外觀、按鈕位置和格子數量都能在「背包設定」裡調整；放進 RPG 系統時，會自動換上像素風格。`,overviewEn:`Give your story a bag that opens any time. Whatever players pick up along the way goes into it, and a tap shows what an item is and lets them use it.

Items can change variables or take players to a story card: a key that opens a door, a gift that raises friendship, the right thing used in the right place, all without code.

The look, the button’s place and the number of slots are set in Inventory settings; inside the RPG system it takes on the pixel style.`,features:["「取得道具」卡片：點擊收取或自動放進背包，附圖片和說明","「打開背包」卡片：在劇情中讓玩家選一件道具，再依選擇分支","使用效果：設定、增加、減少或切換變數，或跳到指定劇情","使用條件：只有在對的地點或狀態下才能使用","常駐背包按鈕：位置、樣式、顏色和格子數量都能調整","和 RPG 系統共用同一個背包，並換上像素風格"],featuresEn:["Grant item card: collect with a click or straight into the bag, with a picture and a note","Open inventory card: players pick an item mid-story and the story branches on it","Use effects: set, add to, subtract from or toggle a variable, or go to a story card","Use conditions: an item works only in the right place or state","A bag button that stays on screen, with its place, style, colours and slots adjustable","Shares one bag with the RPG system, in pixel style there"],official:!0,builtIn:!0,pricing:"free",license:"larch-only",settings:[{key:"hudEnabled",kind:"toggle",label:"顯示背包按鈕",labelEn:"Show inventory button",hint:"關閉後不顯示常駐按鈕，仍可用「打開背包」卡片讓玩家進入背包。",hintEn:"When off, the persistent button is hidden; Open bag cards can still show the inventory.",defaultValue:!0},{key:"hudPosition",kind:"select",label:"背包按鈕位置",labelEn:"Inventory button position",defaultValue:"right",options:[{value:"left",label:"左上角",labelEn:"Top left"},{value:"right",label:"右上角",labelEn:"Top right"}]},{key:"bagVar",kind:"text",label:"背包資料變數",labelEn:"Inventory data variable",hint:"預設使用 inventory；通常不用修改。",hintEn:"Uses inventory by default; usually leave this alone.",defaultValue:"inventory"},{key:"currencyItem",kind:"text",label:"當作錢的道具",labelEn:"Item used as money",hint:"填道具 ID，背包最上面會顯示持有數量；留空會自動找金幣，填 none 就不顯示。",hintEn:"An item id whose count shows at the top of the bag; empty finds coins by itself, none shows no money.",defaultValue:""},{key:"buttonStyle",kind:"select",label:"按鈕樣式",labelEn:"Button style",defaultValue:"pill",options:[{value:"pill",label:"圖示＋文字膠囊",labelEn:"Icon and label pill"},{value:"icon",label:"純圖示按鈕",labelEn:"Icon only"},{value:"image",label:"自訂圖片按鈕",labelEn:"Custom image"}]},{key:"buttonImage",kind:"asset",assetKind:"image",label:"自訂按鈕圖片",labelEn:"Custom button image",hint:"透明 PNG 最適合。",hintEn:"Transparent PNG works best."},{key:"buttonLabel",kind:"text",label:"按鈕文字",labelEn:"Button label",defaultValue:"背包"},{key:"buttonSize",kind:"number",label:"按鈕尺寸",labelEn:"Button size",min:36,max:128,step:2,defaultValue:48},{key:"buttonShowCount",kind:"toggle",label:"顯示道具數量",labelEn:"Show item count",defaultValue:!0},{key:"buttonPositionMode",kind:"select",label:"按鈕位置模式",labelEn:"Button position mode",defaultValue:"preset",options:[{value:"preset",label:"使用左／右上角",labelEn:"Use selected corner"},{value:"custom",label:"使用自訂座標",labelEn:"Use custom coordinates"}]},{key:"buttonX",kind:"number",label:"X 座標（%）",labelEn:"X coordinate (%)",min:0,max:100,step:1,defaultValue:86},{key:"buttonY",kind:"number",label:"Y 座標（%）",labelEn:"Y coordinate (%)",min:0,max:100,step:1,defaultValue:12},{key:"buttonPivot",kind:"select",label:"按鈕 Pivot",labelEn:"Button pivot",defaultValue:"top-left",options:[{value:"top-left",label:"左上",labelEn:"Top left"},{value:"top-center",label:"上中",labelEn:"Top center"},{value:"top-right",label:"右上",labelEn:"Top right"},{value:"center-left",label:"左中",labelEn:"Center left"},{value:"center",label:"中央",labelEn:"Center"},{value:"center-right",label:"右中",labelEn:"Center right"},{value:"bottom-left",label:"左下",labelEn:"Bottom left"},{value:"bottom-center",label:"下中",labelEn:"Bottom center"},{value:"bottom-right",label:"右下",labelEn:"Bottom right"}]},{key:"slotCount",kind:"number",label:"背包格數",labelEn:"Inventory slots",min:6,max:30,step:1,defaultValue:12},{key:"accentColor",kind:"color",label:"重點色",labelEn:"Accent color",defaultValue:"#78a67d"},{key:"surfaceColor",kind:"color",label:"面板顏色",labelEn:"Panel color",defaultValue:"#ffffff"},{key:"surfaceOpacity",kind:"number",label:"介面透明度",labelEn:"UI opacity",min:.25,max:1,step:.05,defaultValue:.94},{key:"itemColor",kind:"color",label:"格子顏色",labelEn:"Slot color",defaultValue:"#f3f6f2"},{key:"textColor",kind:"color",label:"文字顏色",labelEn:"Text color",defaultValue:"#27322b"},{key:"radius",kind:"number",label:"圓角",labelEn:"Corner radius",min:14,max:32,step:1,defaultValue:22},{key:"motionStyle",kind:"select",label:"互動手感",labelEn:"Motion feel",defaultValue:"gentle",options:[{value:"gentle",label:"柔和",labelEn:"Gentle"},{value:"bouncy",label:"活潑彈跳",labelEn:"Bouncy"},{value:"calm",label:"安靜緩和",labelEn:"Calm"}]},{key:"shadowStyle",kind:"select",label:"陰影風格",labelEn:"Shadow style",defaultValue:"soft",options:[{value:"soft",label:"柔和",labelEn:"Soft"},{value:"flat",label:"平面",labelEn:"Flat"},{value:"float",label:"漂浮",labelEn:"Floating"}]}],cards:[{id:"grant-item",name:"取得道具",nameEn:"Grant item",description:"點擊收取或自動把道具加入背包。",descriptionEn:"Collect an item by clicking or add it to the inventory automatically.",icon:"box",color:"#78a67d",presentation:"fullscreen",skippable:!1,html:Tn,fields:[{key:"autoCollect",kind:"toggle",label:"自動加入背包",labelEn:"Automatically add to inventory",hint:"進入卡片時直接加入並繼續故事，不需要點擊。",hintEn:"Adds the item on entry and continues the story without a click.",defaultValue:!1},{key:"itemId",kind:"text",label:"道具 ID",labelEn:"Item ID",hint:"選填；留空時由名稱產生。同 ID 的道具會累加數量。",hintEn:"Optional; generated from the name when empty. Items with the same ID stack."},{key:"itemName",kind:"text",label:"道具名稱",labelEn:"Item name",defaultValue:"繩索"},{key:"itemImage",kind:"asset",assetKind:"image",label:"道具圖片",labelEn:"Item image",hint:"會顯示在取得畫面與背包格子中。",hintEn:"Shown in the pickup moment and inventory slot."},{key:"itemNote",kind:"longText",label:"道具資訊",labelEn:"Item information",placeholder:"在背包裡選到這件道具時顯示的說明",hint:"玩家在背包中點選這件道具時，會顯示在右側的說明欄。",hintEn:"Shown in the detail pane when the player selects this item in the inventory."},{key:"crossover",kind:"toggle",label:"開放聯動",labelEn:"Open for crossovers",hint:"玩家拿到後會收進帳號的「聯動收藏」，其他作品可以把它加進自己的背包。",hintEn:"Players who get it keep it in their account’s crossover collection, and other works can add it to their own bag.",defaultValue:!1},{key:"crossoverSync",kind:"toggle",label:"已經拿到的玩家也一起更新",labelEn:"Update it for players who already have it",hint:"之後改了名字、圖片或說明，玩家聯動收藏裡的這件也會換成新的（作品發布更新後）。關掉就留著他們當初拿到時的樣子。",hintEn:"When you change its name, picture or description later, players’ crossover collections show the new version too (once the update is published). Turn it off to keep the version they got.",defaultValue:!0},{key:"itemCount",kind:"number",label:"數量",labelEn:"Count",min:1,max:99,step:1,defaultValue:1},{key:"hideAfterCollect",kind:"toggle",label:"點擊收取後讓圖片消失",labelEn:"Hide image after collecting",hint:"取消勾選時，道具圖片會保留到下一張卡片出現。",hintEn:"When disabled, the item image remains until the next card appears.",defaultValue:!0},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",hint:"兩張卡片要指向同一個變數",hintEn:"Both cards must point at the same variable",defaultValue:"inventory"},{key:"countVar",kind:"variable",label:"道具數量寫進",labelEn:"Write item count to",hint:"想在選項上判斷「身上有幾件」時才需要",hintEn:"Only needed if you branch on how many items are held"},{key:"useConditionVariable",kind:"variable",label:"使用條件變數",labelEn:"Use condition variable",hint:"不指定時可隨時使用；指定後，變數必須等於下方的值。",hintEn:"Leave unused to allow use anytime; otherwise the variable must equal the value below."},{key:"useConditionValue",kind:"text",label:"必須等於",labelEn:"Must equal",hint:"可填文字、數字、true 或 false。",hintEn:"Accepts text, numbers, true or false."},{key:"useConditionMessage",kind:"longText",label:"條件不成立時的提示",labelEn:"Message when condition is not met",hint:"留空時顯示「目前不符合使用條件，無法使用這個道具。」",hintEn:"If empty, shows “You cannot use this item until its condition is met.”"},{key:"consumable",kind:"toggle",label:"使用後消耗一個",labelEn:"Consume one after use",defaultValue:!0},{key:"effectKind",kind:"select",label:"使用後改變變數",labelEn:"Variable effect on use",defaultValue:"none",options:[{value:"none",label:"不改變",labelEn:"No change"},{value:"set",label:"設成指定值",labelEn:"Set value"},{value:"add",label:"增加數值",labelEn:"Add number"},{value:"subtract",label:"減少數值",labelEn:"Subtract number"},{value:"toggle",label:"切換成立／不成立",labelEn:"Toggle true / false"}]},{key:"effectVar",kind:"variable",label:"要影響的變數",labelEn:"Variable to affect"},{key:"effectValue",kind:"text",label:"變數參數",labelEn:"Effect value",hint:"加減填數字；設定可填文字、數字、true 或 false。",hintEn:"Use a number for add/subtract; set accepts text, numbers, true or false."},{key:"storyNodeId",kind:"storyCard",label:"使用後前往卡片",labelEn:"Story card after use",hint:"選填；使用後會立刻前往所選卡片。",hintEn:"Optional. Using the item immediately jumps to the selected card."}]},{id:"remove-item",name:"移除道具",nameEn:"Remove item",description:"進入卡片時，自動依 ID 或名稱移除背包道具並繼續故事。",descriptionEn:"Automatically removes inventory items by ID or name and continues the story.",icon:"box",color:"#78a67d",presentation:"inline",skippable:!1,html:Pn,fields:[{key:"itemId",kind:"text",label:"道具 ID",labelEn:"Item ID",hint:"優先以 ID 比對；留空時使用下方名稱。",hintEn:"Matches by ID first; leave empty to match by name."},{key:"itemName",kind:"text",label:"道具名稱",labelEn:"Item name",hint:"ID 留空時，移除名稱完全相同的道具。",hintEn:"When ID is empty, matches the exact item name."},{key:"itemCount",kind:"number",label:"移除數量（0 為全部）",labelEn:"Quantity to remove (0 for all)",min:0,max:99,step:1,defaultValue:1},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",defaultValue:"inventory"},{key:"countVar",kind:"variable",label:"剩餘道具總數寫進",labelEn:"Write remaining total count to"}]},{id:"open-bag",name:"打開背包",nameEn:"Open bag",description:"列出背包裡的道具，玩家挑一件之後繼續故事。",descriptionEn:"Lists what is in the bag and lets the player use one before the story continues.",icon:"backpack",color:"#6f9474",presentation:"inline",html:Hn,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"背包"},{key:"bagVar",kind:"variable",label:"背包變數",labelEn:"Bag variable",defaultValue:"inventory"},{key:"pickVar",kind:"variable",label:"選到的道具寫進",labelEn:"Write the pick to",hint:"之後用選項或條件連線判斷玩家用了什麼",hintEn:"Branch on it afterwards with a choice or condition",defaultValue:"inventoryLastUsed"},{key:"consume",kind:"toggle",label:"用完就從背包移除",labelEn:"Consume on use",defaultValue:!0},{key:"allowSkip",kind:"toggle",label:"允許什麼都不拿",labelEn:"Allow leaving empty-handed",defaultValue:!0},{key:"emptyText",kind:"text",label:"背包空的時候顯示",labelEn:"Empty state text",defaultValue:"背包是空的。"}]},{id:"show-hud",name:"開啟背包功能",nameEn:"Enable inventory",description:"顯示遊戲中的背包按鈕，之後玩家可以隨時打開背包。",descriptionEn:"Shows the in-game inventory button so players can open the bag at any time.",icon:"backpack",color:"#78a67d",presentation:"inline",html:Fn,writeVariables:["inventoryHudVisible"]},{id:"hide-hud",name:"關閉背包功能",nameEn:"Disable inventory",description:"隱藏遊戲中的背包按鈕；背包內容會保留，之後仍可再次開啟。",descriptionEn:"Hides the in-game inventory button while keeping every item for later.",icon:"backpack",color:"#8f9b91",presentation:"inline",html:$n,writeVariables:["inventoryHudVisible"]}]},{id:"larch-rpg-map",name:"RPG 格子地圖",nameEn:"RPG grid map",version:"1.0.0",author:V.name,description:"用純文字畫一張格子地圖，玩家用方向鍵或螢幕上的十字鍵走到出口。走了幾步、撿到幾個東西都寫得回故事變數，可以拿來決定接下來演哪一段。",descriptionEn:"Draw a grid map as plain text and let the player walk it to the exit with arrow keys or the on-screen pad. Steps taken and pickups are written back into story variables, ready to branch on.",categories:["map","system"],permissions:["variables:write","flow:control"],icon:"map",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"explore",name:"地圖探索",nameEn:"Explore map",description:"一段可走的格子地圖，抵達出口就繼續故事。",descriptionEn:"A walkable grid; reaching the exit resumes the story.",icon:"compass",color:"#4a7358",presentation:"inline",html:Dn,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"探索"},{key:"mapText",kind:"longText",label:"地圖",labelEn:"Map",hint:"# 牆、. 地板、S 起點、G 出口、* 收穫。一行一列。",hintEn:"# wall, . floor, S start, G exit, * pickup. One row per line.",defaultValue:`#########
#S..#...#
#.#.#.#.#
#.#...#*#
#.#####.#
#......G#
#########`},{key:"tileTheme",kind:"select",label:"地圖風格",labelEn:"Tile theme",defaultValue:"stone",options:[{value:"stone",label:"石造地城",labelEn:"Stone dungeon"},{value:"grass",label:"草地森林",labelEn:"Grass and forest"},{value:"night",label:"夜色",labelEn:"Night"}]},{key:"playerEmoji",kind:"text",label:"玩家圖示",labelEn:"Player icon",defaultValue:"🧍"},{key:"goalEmoji",kind:"text",label:"出口圖示",labelEn:"Exit icon",defaultValue:"🚪"},{key:"lootEmoji",kind:"text",label:"收穫圖示",labelEn:"Pickup icon",defaultValue:"✨"},{key:"goalText",kind:"text",label:"抵達出口時顯示",labelEn:"Arrival text",defaultValue:"抵達出口。"},{key:"goalVar",kind:"variable",label:"結果寫進",labelEn:"Write result to",hint:"抵達出口寫 reached，中途離開寫 left",hintEn:"reached on arrival, left if they bail out"},{key:"stepsVar",kind:"variable",label:"步數寫進",labelEn:"Write step count to"},{key:"lootVar",kind:"variable",label:"收穫數寫進",labelEn:"Write pickup count to"},{key:"autoFinish",kind:"toggle",label:"走到出口就自動繼續",labelEn:"Auto-continue at the exit",defaultValue:!0}]}]},{id:"larch-physics-dice",name:"物理骰子",nameEn:"Physics dice",version:"1.0.0",author:V.name,description:"真的會翻滾、碰撞、慢慢停下來的骰子。設一個門檻值就是一次擲骰檢定，結果與成敗都寫回變數，可以直接接兩條分支演成功與失敗。",descriptionEn:"Dice that actually tumble, bounce and settle. Set a target number to turn it into a skill check — the total and the pass/fail both go back into variables, ready for two branches.",categories:["physics","system"],permissions:["variables:write","flow:control"],icon:"dices",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"roll",name:"擲骰檢定",nameEn:"Dice check",description:"擲一組骰子，總點數與是否過關寫回變數。",descriptionEn:"Rolls a set of dice and writes the total and pass state back.",icon:"dices",color:"#8b4f4f",presentation:"inline",html:_n,fields:[{key:"title",kind:"text",label:"標題",labelEn:"Heading",defaultValue:"擲骰"},{key:"diceCount",kind:"number",label:"骰子數量",labelEn:"Dice",min:1,max:6,step:1,defaultValue:2},{key:"sides",kind:"number",label:"每顆幾面",labelEn:"Sides",min:2,max:100,step:1,defaultValue:6},{key:"targetNumber",kind:"number",label:"過關門檻",labelEn:"Target number",hint:"0 就是純擲骰，不判成敗",hintEn:"0 means a plain roll with no check",min:0,max:600,step:1,defaultValue:7},{key:"resultVar",kind:"variable",label:"總點數寫進",labelEn:"Write total to"},{key:"passVar",kind:"variable",label:"是否過關寫進",labelEn:"Write pass/fail to"},{key:"gravity",kind:"number",label:"重力",labelEn:"Gravity",min:.1,max:2,step:.05,defaultValue:.42},{key:"bounce",kind:"number",label:"彈性",labelEn:"Bounce",min:.05,max:.95,step:.05,defaultValue:.52}]}]},{id:"larch-portrait-motion",name:"立繪動態演出",nameEn:"Portrait motion",version:"1.0.0",author:V.name,description:"把一張靜態立繪演成會呼吸的鏡頭：立繪隨著呼吸微微起伏，滑鼠移動時立繪與背景以不同幅度位移，做出 2.5D 的景深。給還沒有 Live2D 骨架的角色用。",descriptionEn:"Turns a still portrait into a breathing shot: the art rises and falls, and portrait and background shift at different rates under the pointer for a 2.5D parallax. For characters that have no Live2D rig yet.",categories:["animation","live2d"],permissions:["assets:read","flow:control"],icon:"person",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[{id:"portrait",name:"立繪特寫",nameEn:"Portrait shot",description:"一段會呼吸、有景深的立繪特寫。",descriptionEn:"A breathing portrait shot with parallax depth.",icon:"person",color:"#6b5bbd",presentation:"inline",html:Un,fields:[{key:"portrait",kind:"asset",assetKind:"image",label:"立繪",labelEn:"Portrait"},{key:"background",kind:"asset",assetKind:"image",label:"背景",labelEn:"Background"},{key:"caption",kind:"longText",label:"疊在畫面下方的字",labelEn:"Caption"},{key:"breathe",kind:"toggle",label:"呼吸起伏",labelEn:"Breathing",defaultValue:!0},{key:"parallax",kind:"toggle",label:"滑鼠視差",labelEn:"Pointer parallax",defaultValue:!0},{key:"sway",kind:"number",label:"位移幅度",labelEn:"Motion amount",min:0,max:30,step:1,defaultValue:6},{key:"holdMs",kind:"number",label:"幾毫秒後自動繼續",labelEn:"Auto-continue after (ms)",hint:"0 就等玩家自己按繼續",hintEn:"0 waits for the player",min:0,max:2e4,step:250,defaultValue:0}]}]}],Wn=[{id:"larch-board-tools",name:"白板整理工具",nameEn:"Board tools",version:"1.0.0",author:V.name,description:"兩個白板層級的工具：依故事順序把卡片重排成整齊的蛇行版面，以及檢查有沒有接不上的卡片、死路與空白對話。重排走的是故事線而不是座標，所以整理完的白板還是你認得的那一張。",descriptionEn:"Two board-level tools: re-flow every card into a tidy serpentine layout that follows the story order, and audit the board for orphans, dead ends and empty dialogue. It follows the story graph, not coordinates, so the tidied board is still the one you recognise.",categories:["tool"],permissions:["cards:read","cards:write","project:read","ui:contribute"],icon:"grid",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:zn,settings:[{key:"columns",kind:"number",label:"每列幾張卡片",labelEn:"Cards per row",min:2,max:8,step:1,defaultValue:4},{key:"gapX",kind:"number",label:"水平間距",labelEn:"Horizontal gap",min:180,max:900,step:20,defaultValue:360},{key:"gapY",kind:"number",label:"垂直間距",labelEn:"Vertical gap",min:120,max:700,step:20,defaultValue:240}],commands:[{id:"tidy-layout",title:"整理白板版面",titleEn:"Tidy the layout",description:"依故事順序重排所有卡片",descriptionEn:"Re-flow every card along the story order",icon:"grid",surfaces:["canvasMenu","toolbar"],confirm:"這會移動白板上所有卡片的位置，確定要重排嗎？（可以用復原還原）",confirmEn:"This moves every card on the board. Continue? (Undo restores it.)"},{id:"audit-board",title:"檢查這張白板",titleEn:"Audit this board",description:"找出沒接線的卡片、死路與空白對話",descriptionEn:"Finds orphans, dead ends and empty dialogue",icon:"compass",surfaces:["canvasMenu","toolbar"]}]},{id:"larch-dialogue-tools",name:"台詞工具",nameEn:"Dialogue tools",version:"1.0.0",author:V.name,description:"在對話卡的右鍵選單多兩項：整理多餘的空白與空行，以及把中文句子裡的半形標點換成全形。從別的地方貼進來的稿子最需要這兩個。",descriptionEn:"Adds two items to a dialogue card’s context menu: tidy stray whitespace and blank lines, and convert half-width punctuation to full-width inside CJK sentences. Pasted drafts need both.",categories:["tool"],permissions:["cards:read","cards:write","ui:contribute"],icon:"scroll",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:qn,commands:[{id:"tidy-lines",title:"整理台詞排版",titleEn:"Tidy the lines",description:"收掉多餘空格與空行",descriptionEn:"Collapses stray spaces and blank lines",icon:"scroll",surfaces:["cardMenu","inspector"],cardTypes:["dialogue"]},{id:"fullwidth-punctuation",title:"標點改成全形",titleEn:"Full-width punctuation",description:"只轉中文句子裡的半形標點",descriptionEn:"Only converts punctuation inside CJK sentences",icon:"wand",surfaces:["cardMenu","inspector"],cardTypes:["dialogue"]}]},{id:"larch-save-guard",name:"存檔守門員",nameEn:"Save guard",version:"1.0.0",author:V.name,description:"每次存檔時檢查一遍：有沒有設開始卡片、選擇卡的選項是不是都接出去了、對話卡有沒有空白台詞。沒問題就不出聲，有問題才提醒 —— 每次都說「一切正常」的提示很快就會被無視。",descriptionEn:"Runs a check on every save: is there a start card, are all choice options wired up, are any dialogue lines blank. It stays quiet when everything is fine — a notice that always fires is a notice nobody reads.",categories:["tool"],permissions:["cards:read","project:read","save:hook","ui:contribute"],icon:"shapes",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],worker:Yn,hooks:["project:save"],commands:[{id:"check-now",title:"立刻檢查故事",titleEn:"Check the story now",description:"不等存檔，現在就跑一次",descriptionEn:"Runs the save check right now",icon:"shapes",surfaces:["canvasMenu","toolbar"]}]},{id:"larch-theme-inkwell",name:"墨井主題",nameEn:"Inkwell theme",version:"1.0.0",author:V.name,description:"把編輯器換成偏藍的冷色調，圓角也收得更緊一些。這個擴充功能示範的是最單純的一種擴充：沒有程式碼，只有一組介面變數。",descriptionEn:"Recolours the editor to a cool blue-leaning palette with tighter corners. It demonstrates the simplest kind of plugin there is: no code at all, just a set of interface tokens.",categories:["ui"],permissions:["theme:write"],icon:"palette",official:!0,builtIn:!0,pricing:"free",license:"larch-only",cards:[],theme:{"--larch-ink":"#161a22","--larch-muted":"#6b7382","--larch-line":"#dfe3ea","--larch-paper":"#f7f9fc"}}],ye=[...Xn,...Wn],Kn=new Set(Rt),Gr=ye.filter(e=>Kn.has(e.id));new Set(ye.map(e=>e.id));const jn="larch-3d",ve="mwj0eife",Gn="/plugins/larch3d/runtime.js",Jn="<!--larch3d-runtime-->",Jr="/packs/larch-3d/cover-v3.webp",Zn="/packs/larch-3d/cover-v2.webp",Zr=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>html,body{margin:0;height:100%;overflow:hidden;background:#06070a;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
#l3d-boot{position:fixed;inset:0;z-index:1;display:grid;place-content:center;justify-items:center;gap:12px;background:#06070a;color:#fff;font:600 13px -apple-system,"Noto Sans TC",system-ui,sans-serif;letter-spacing:.04em;transition:opacity .35s ease}
#l3d-boot .bar{position:relative;width:min(240px,64vw);height:4px;border-radius:999px;background:rgba(255,255,255,.14);overflow:hidden}
#l3d-boot .bar i{position:absolute;top:0;bottom:0;left:0;width:34%;border-radius:999px;background:rgba(255,255,255,.78);animation:l3dBar 1.6s cubic-bezier(.45,0,.55,1) infinite}
#l3d-boot b{font-weight:600;color:rgba(255,255,255,.72)}
@keyframes l3dBar{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
@media (prefers-reduced-motion:reduce){#l3d-boot .bar i{animation:none;width:40%}}</style></head>
<body><div id="l3d-boot" role="status"><div class="bar"><i></i></div><b>載入中…</b></div>
<script>(function(){if(window.__l3dBoot)return;window.__l3dBoot=1;var ran=false;function run(code){if(ran)return;ran=true;var s=document.createElement('script');s.textContent=code;document.body.appendChild(s);}
window.__l3dRun=run;addEventListener('message',function(e){var d=e.data;if(e.source===parent&&d&&d.type==='larch:l3d-runtime'&&typeof d.code==='string')run(d.code);});
setTimeout(function(){if(!ran)parent.postMessage({type:'larch:l3d-runtime-wanted',v:'${ve}'},'*');},0);})();<\/script>${Jn}</body></html>`;let J=null;function Qr(){return J??=fetch(`${Gn}?v=${ve}`).then(e=>{if(!e.ok)throw new Error(`3D runtime ${e.status}`);return e.text()}).catch(e=>{throw J=null,e}),J}const Qn=/^(vfx|objects\/[a-z0-9-]{2,40})$/,Z=new Map;function ei(e){if(!Qn.test(e))return Promise.reject(new Error("unknown 3D library script"));let t=Z.get(e);return t||(t=fetch(`/plugins/larch3d/ember/${e}.js?v=${ve}`).then(n=>{if(!n.ok)throw new Error(`3D library ${n.status}`);return n.text()}),t.catch(()=>Z.delete(e)),Z.set(e,t)),t}const ti={cover:N(Zn)},ea="inventory";function ta(e){let t={};try{t=JSON.parse(String(e||"{}"))||{}}catch{return[]}const n=[],r=(a,i,o=0)=>{if(!(!Array.isArray(a)||o>12)){for(const s of a)if(!(!s||typeof s!="object")){if(s.kind==="item"&&s.op!=="subtract"&&typeof s.item=="string"&&s.item.trim()&&n.push({itemId:s.item.trim(),name:String(s.text||""),where:i}),s.kind==="shop"&&Array.isArray(s.goods))for(const l of s.goods)l&&typeof l.item=="string"&&l.item.trim()&&n.push({itemId:l.item.trim(),name:String(l.name||""),where:i});if(r(s.then,i,o+1),r(s.else,i,o+1),r(s.steps,i,o+1),Array.isArray(s.options))for(const l of s.options)r(l?.steps,i,o+1)}}};for(const a of(Array.isArray(t.objects)?t.objects:[]).slice(0,3e3)){if(!a||!Array.isArray(a.components))continue;const i=String(a.name||a.id||"");for(const o of a.components)if(o?.type==="event"&&(r(o.props?.steps,i),Array.isArray(o.props?.pages)))for(const s of o.props.pages.slice(0,12))r(s?.steps,i)}for(const a of(Array.isArray(t.commonEvents)?t.commonEvents:[]).slice(0,50))r(a?.steps,`共通事件 · ${String(a?.name||"")}`);return n}function na(e){return[{id:e.activeBoardId,name:e.boards?.find(n=>n.id===e.activeBoardId)?.name||"白板",nodes:e.nodes||[]},...(e.boards||[]).filter(n=>n.id!==e.activeBoardId)].flatMap(n=>(n.nodes||[]).flatMap(r=>r.data.type!=="plugin"||r.data.pluginId!==jn||r.data.pluginCardId!=="scene"?[]:ta(r.data.pluginValues?.scene).map(a=>({...a,boardId:n.id,boardName:n.name,nodeId:r.id,cardTitle:r.data.title||r.id}))))}const bt=ye.find(e=>e.id==="larch-inventory"),ie=bt.cards.find(e=>e.id==="grant-item"),xe=Object.fromEntries((ie.fields||[]).filter(e=>e.defaultValue!==void 0).map(e=>[e.key,e.defaultValue])),yt={itemId:"inventoryId",itemName:"inventoryName",itemImage:"inventoryImage",itemNote:"inventoryDescription",itemCount:"inventoryCount",bagVar:"inventoryBagVar",countVar:"inventoryCountVar",consumable:"inventoryConsumable",effectKind:"inventoryEffectKind",effectVar:"inventoryEffectVariable",effectValue:"inventoryEffectValue",storyNodeId:"inventoryStoryNodeId",useConditionVariable:"inventoryUseConditionVariable",useConditionValue:"inventoryUseConditionValue",useConditionMessage:"inventoryUseConditionMessage",hideAfterCollect:"hideAfterClick",crossover:"inventoryCrossover",crossoverSync:"inventoryCrossoverSync"};function aa(e,t,n="inventory"){const r=nn(e,t),a={...xe,itemId:r.id,itemName:r.name,itemImage:r.icon,consumable:r.consumable,bagVar:n,countVar:"inventoryCount",hideAfterCollect:!!t.hideAfterClick};for(const[i,o]of Object.entries(yt))t[o]!==void 0&&(a[i]=t[o]);return t.inventoryUseRoutes?.length&&(a.useRoutes=JSON.stringify(R(t.inventoryUseRoutes))),a.itemId=t.inventoryId?.trim()?t.inventoryId:r.id,a.bagVar=t.inventoryBagVar?.trim()||n,a}function De(e){const t=Object.fromEntries(Object.entries(yt).filter(([n])=>e[n]!==void 0).map(([n,r])=>[r,e[n]]));return e.useRoutes===void 0?t:{...t,inventoryUseRoutes:R(e.useRoutes)}}function ke(e){return[{id:e.activeBoardId,name:e.boards?.find(n=>n.id===e.activeBoardId)?.name||"白板",nodes:e.nodes,edges:e.edges},...(e.boards||[]).filter(n=>n.id!==e.activeBoardId)]}function we(e,t="inventory"){const n=[];for(const r of e){r.data.type==="plugin"&&r.data.pluginId==="larch-inventory"&&r.data.pluginCardId==="grant-item"&&n.push({location:{nodeId:r.id},values:{...xe,...r.data.pluginValues},cardTitle:r.data.title||"取得道具"});const a=(i,o,s)=>{if(i)for(const l of["actors","props","videos"])for(const c of i[l]||[])c.clickAction?.kind==="inventory"&&n.push({location:{nodeId:r.id,lineId:o,collection:l,objectId:c.id},values:aa(c,c.clickAction,t),cardTitle:r.data.title||r.id,page:s})};a(r.data.stage),r.data.dialogueLines?.forEach((i,o)=>a(i.stage,i.id,o+1))}return n}function vt(e){const t=String(e.settings.plugins?.["larch-inventory"]?.settings?.bagVar||"inventory");return ke(e).flatMap(n=>we(n.nodes,t).map(r=>({...r,boardName:n.name,location:{...r.location,boardId:n.id}})))}function ra(e,t,n){const r=ke(e).find(s=>s.id===t.boardId),a=r?.nodes.find(s=>s.id===t.nodeId);if(!r||!a)return null;let i=a.data;if(t.collection){if(!t.objectId&&!["scene","dialogue"].includes(i.type))return null;const s=t.lineId?i.dialogueLines?.find(d=>d.id===t.lineId):void 0;if(t.lineId&&!s)return null;const l=t.objectId?s?.stage||i.stage:Cn(i,s,An(r.nodes,r.edges,a.id)?.stage);if(!l)return null;let c;if(t.objectId){const d=l[t.collection]?.find(u=>u.id===t.objectId);if(!d||d.clickAction?.kind!=="inventory")return null;c={...l,[t.collection]:l[t.collection].map(u=>u.id===t.objectId?{...u,clickAction:{...u.clickAction,...De(n),kind:"inventory"}}:u)}}else{const d=Ln(String(n.itemImage||""),String(n.itemName||"道具"));c={...l,props:[...l.props||[],{...d,clickAction:{...De(n),kind:"inventory"}}]}}i=s?{...i,dialogueLines:i.dialogueLines.map(d=>d.id===s.id?{...d,stage:c}:d)}:{...i,...ut(c)}}else{if(i.pluginId!=="larch-inventory"||i.pluginCardId!=="grant-item")return null;const s={...xe,...i.pluginValues,...n},l=(ie.fields||[]).filter(c=>c.kind==="variable").map(c=>String(s[c.key]||"")).filter(Boolean);i={...i,pluginValues:s,pluginHtml:ie.html,pluginVersion:bt.version,pluginReadVars:[...new Set([...i.pluginReadVars||[],...l])],pluginWriteVars:[...new Set([...i.pluginWriteVars||[],...l])]}}const o=r.nodes.map(s=>s.id===a.id?{...s,data:i}:s);return{...e,...r.id===e.activeBoardId?{nodes:o}:{},boards:e.boards?.map(s=>s.id===r.id?{...s,nodes:o,updatedAt:new Date().toISOString()}:s)}}const xt=["itemId","itemName","itemImage","itemNote","bagVar","consumable","effectKind","effectVar","effectValue","useConditionVariable","useConditionValue","useConditionMessage","useRoutes","storyNodeId","crossover","crossoverSync","crossProject","crossRef","crossWork","crossStats","crossLater","crossVar"];function ni(e){const t=String(e.effectKind||"none"),n=R(e.useRoutes);return{id:Ee(e),name:String(e.itemName||e.itemId||"道具"),icon:String(e.itemImage||""),description:String(e.itemNote||""),count:Math.max(1,Math.round(Number(e.itemCount)||1)),consumable:e.consumable!==!1,effectKind:["none","set","add","subtract","toggle"].includes(t)?t:"none",...String(e.effectVar||"").trim()?{effectVariable:String(e.effectVar).trim(),effectValue:e.effectValue}:{},...String(e.storyNodeId||"").trim()?{storyNodeId:String(e.storyNodeId).trim()}:{},...n.length?{useRoutes:n}:{},...String(e.useConditionVariable||"").trim()?{useConditionVariable:String(e.useConditionVariable).trim(),useConditionValue:e.useConditionValue,useConditionMessage:String(e.useConditionMessage||"")}:{}}}const Ee=e=>(String(e.itemId||"").trim()||String(e.itemName||"").trim()).toLowerCase().replace(/\s+/g,"-"),K=e=>String(e.settings.plugins?.["larch-inventory"]?.settings?.bagVar||"inventory");function C(e,t){const n=Ee(e);return n?JSON.stringify([String(e.bagVar||t).trim()||t,n]):""}function q(e,t){const n={};for(const r of xt)e[r]!==void 0&&(n[r]=e[r]);return{...n,itemId:Ee(e),bagVar:String(e.bagVar||t).trim()||t}}function j(e){let t=e.settings.plugins?.["larch-inventory"]?.settings?.items;if(typeof t=="string")try{t=JSON.parse(t)}catch{t=[]}if(!Array.isArray(t))return[];const n=K(e),r=new Set;return t.flatMap(a=>{if(!a||typeof a!="object"||Array.isArray(a))return[];const i={};for(const l of xt){const c=a[l];(typeof c=="string"||typeof c=="boolean"||typeof c=="number"&&Number.isFinite(c))&&(i[l]=c)}const o=q(i,n),s=C(o,n);return!s||!String(o.itemName||"").trim()||r.has(s)?[]:(r.add(s),[o])})}function oe(e,t){const n=e.settings.plugins||{},r=n["larch-inventory"]||{enabled:!0};return{...e,settings:{...e.settings,plugins:{...n,"larch-inventory":{...r,settings:{...r.settings||{},items:JSON.stringify(t)}}}}}}function ai(e){const t=K(e),n=new Map;for(const a of j(e)){const i=C(a,t);n.set(i,{key:i,values:a,inLibrary:!0,sources:[]})}for(const a of vt(e)){const i=q(a.values,t),o=C(i,t);o&&(n.has(o)||n.set(o,{key:o,values:i,inLibrary:!1,sources:[]}),n.get(o).sources.push({location:a.location,kind:a.location.collection?"stage":"card",boardName:a.boardName,cardTitle:a.cardTitle,...a.page?{page:a.page}:{}}))}const r=new Set;for(const a of na(e)){const i=n.get(JSON.stringify([ea,a.itemId])),o=JSON.stringify([a.nodeId,a.where,a.itemId]);!i||r.has(o)||(r.add(o),i.sources.push({location:{boardId:a.boardId,nodeId:a.nodeId},kind:"l3d",boardName:a.boardName,cardTitle:a.cardTitle,...a.where?{where:a.where}:{}}))}return[...n.values()]}function ri(e,t,n){const r=K(e),a=q(n,r),i=C(a,r);if(!i)return e;const o=j(e),s=t?o.findIndex(d=>C(d,r)===t):-1;let l=s>=0?oe(e,o.flatMap((d,u)=>u===s?[a]:C(d,r)===i?[]:[d])):t===null?oe(e,[...o.filter(d=>C(d,r)!==i),a]):e;const c=t??i;for(const d of ke(l))for(const u of we(d.nodes,r))C(q(u.values,r),r)===c&&(l=ra(l,{...u.location,boardId:d.id},{...u.values,...a})||l);return l}function ii(e,t){const n=K(e);return oe(e,j(e).filter(r=>C(r,n)!==t))}const Q=/\{\{\s*([\w.-]+)\s*\}\}/g,ia=new Set(["variable","ruby"]),O=e=>(e||[]).map(t=>JSON.stringify([t.type,t.value??"",t.rubyColor??"",t.rubySize??"",!!t.rubyHoverOnly])).sort().join("|"),oa=e=>(e||[]).map(t=>t.text).join("");function E(e){const t=[];for(const n of e){if(!n.text)continue;const r=t[t.length-1];r&&O(r.marks)===O(n.marks)?r.text+=n.text:t.push({text:n.text,...n.marks?.length?{marks:n.marks.map(a=>({...a}))}:{}})}return t}function kt(e){const t=[];let n=0;Q.lastIndex=0;for(let r=Q.exec(e);r;r=Q.exec(e))r.index>n&&t.push({text:e.slice(n,r.index)}),t.push({text:r[0],marks:[{type:"variable",value:r[1]}]}),n=r.index+r[0].length;return n<e.length&&t.push({text:e.slice(n)}),E(t)}const sa=e=>e?.runs?.length?e.runs:kt(e?.text||"");function B(e,t){const n=[];let r=0;for(const a of e){const i=r+a.text.length;t>r&&t<i?(n.push({...a,text:a.text.slice(0,t-r)}),n.push({...a,text:a.text.slice(t-r)})):n.push(a),r=i}return n}const wt=(e,t,n,r)=>{const a=B(B(e,t),n),i=[];let o=0;for(const s of a)r(o)&&i.push(s),o+=s.text.length;return i};function la(e,t,n){if(n<=t)return Et(e,t);const r=wt(e,t,n,a=>a>=t&&a<n);return r.length?(r[0].marks||[]).filter(a=>r.every(i=>(i.marks||[]).some(o=>O([o])===O([a])))):[]}function Et(e,t){let n=0;for(const r of e){const a=n+r.text.length;if(t>n&&t<=a)return(r.marks||[]).map(i=>({...i}));n=a}return[]}function ca(e,t,n,r){if(n<=t)return e;const a=B(B(e,t),n);let i=0;const o=a.map(s=>{const l=i;if(i+=s.text.length,l<t||l>=n)return s;const c=(s.marks||[]).filter(d=>d.type!==r.type);return{...s,marks:[...c,r]}});return E(o)}function da(e,t,n,r){if(n<=t)return e;const a=B(B(e,t),n);let i=0;const o=a.map(s=>{const l=i;if(i+=s.text.length,l<t||l>=n)return s;const c=(s.marks||[]).filter(d=>d.type!==r);return{...s,...c.length?{marks:c}:{marks:void 0}}});return E(o)}function oi(e,t,n,r){return la(e,t,n).some(i=>O([i])===O([r]))?da(e,t,n,r.type):ca(e,t,n,r)}function ua(e,t,n){const r=B(e,t),a=[];let i=0,o=!1;for(const s of r)!o&&i>=t&&(a.push(...n),o=!0),a.push(s),i+=s.text.length;return o||a.push(...n),E(a)}const fa=(e,t,n)=>n<=t?e:E(wt(e,t,n,r=>r<t||r>=n));function si(e,t,n){if(!e?.length)return kt(n);if(t===n)return E(e);const r=Math.min(t.length,n.length);let a=0;for(;a<r&&t[a]===n[a];)a+=1;let i=0;for(;i<r-a&&t[t.length-1-i]===n[n.length-1-i];)i+=1;const o=t.length-a-i,s=n.slice(a,n.length-i);let l=o>0?fa(e,a,a+o):E(e);if(s){const c=Et(l,a).filter(d=>!ia.has(d.type));l=ua(l,a,[{text:s,...c.length?{marks:c}:{}}])}return l}const It=/:([a-z0-9][a-z0-9_-]{1,49}):/gi;function St(e){return e.replace(It,"￼").length}function ma(e,t){if(t<=0)return"";let n=0,r=0;const a=new RegExp(It.source,"gi");let i;for(;i=a.exec(e);){const o=i.index-r;if(n+o>=t)return e.slice(0,r+(t-n));if(n+=o,r=i.index,n+1>t||(n+=1,r=i.index+i[0].length,n===t))return e.slice(0,r)}return e.slice(0,r+Math.max(0,t-n))}function li(e,t){if(t<=0)return[];const n=[];let r=t;for(const a of e){if(r<=0)break;const i=St(a.text);if(i<=r)n.push(a),r-=i;else{const o=a.marks?.filter(s=>s.type!=="ruby");n.push({...a,text:ma(a.text,r),...o?.length?{marks:o}:{marks:void 0}}),r=0}}return n}function pa(e,t){let n=!1;const r=e.map(a=>{const i=a.marks?.find(s=>s.type==="variable");if(!i?.value)return a;const o=t(i.value);return o===a.text?a:(n=!0,{...a,text:o})});return n?E(r):r}function ci(e,t){const n=Tt(e,t,Pt);return n===e?e:E(n)}function di(e,t){const n=pa(e,t);let r=!1;const a=n.map(i=>{if(i.marks?.some(s=>s.type==="variable"))return i;const o=i.text.replace(/\{\{\s*([\w.-]+)\s*\}\}/g,(s,l)=>t(l));return o===i.text?i:(r=!0,{...i,text:o})});return r?E(a):a}const ui=(e,t)=>({bold:t?"粗體":"Bold",italic:t?"斜體":"Italic",shake:t?"震動":"Shake",wave:t?"波浪":"Wave",big:t?"放大":"Bigger",small:t?"縮小":"Smaller",glow:t?"發光":"Glow",color:t?"顏色":"Colour",link:t?"連結":"Link",tip:t?"提示":"Tooltip",ruby:t?"上方小字":"Ruby text",code:t?"程式碼":"Code",variable:t?"變數":"Variable"})[e],ha=250,ga=1e3,ba=6e4,ya=5,va=1e3,xa=/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,ka=e=>{const t=String(e??"").trim(),n=t.startsWith("#")?t:`#${t}`;return xa.test(n)?n.toLowerCase():void 0},_e=(e,t)=>{if(e[t]!=="[")return null;const n=e.indexOf("]",t+1);return n<0||n-t>16?null:{value:e.slice(t+1,n).trim(),end:n+1}},Ue=e=>!!(e&&/[a-z]/i.test(e)),ze=(e,t,n)=>Math.min(n,Math.max(t,e));function Ct(e,t){const n=e[t+1];if(n===void 0)return null;switch(n){case"\\":return{token:{type:"literal",text:"\\"},length:2};case".":return{token:{type:"event",event:{kind:"pause",ms:ha}},length:2};case"|":return{token:{type:"event",event:{kind:"pause",ms:ga}},length:2};case"!":return{token:{type:"event",event:{kind:"wait"}},length:2};case">":return{token:{type:"event",event:{kind:"instant",on:!0}},length:2};case"<":return{token:{type:"event",event:{kind:"instant",on:!1}},length:2};case"^":return{token:{type:"auto"},length:2}}const r=n.toLowerCase();if(r==="w"||r==="s"){const a=_e(e,t+2);if(!a)return null;if(r==="s"&&a.value==="")return{token:{type:"event",event:{kind:"speed",perChar:null}},length:a.end-t};if(!/^\d+(?:\.\d+)?$/.test(a.value))return null;const i=Number(a.value);return r==="w"?{token:{type:"event",event:{kind:"pause",ms:ze(Math.round(i),0,ba)}},length:a.end-t}:{token:{type:"event",event:{kind:"speed",perChar:i<=0?null:ze(Math.round(i),ya,va)}},length:a.end-t}}if(r==="c"){const a=_e(e,t+2);if(a){if(a.value===""||a.value==="0")return{token:{type:"color",value:null},length:a.end-t};const i=a.value.startsWith("#")?ka(a.value):void 0;return i?{token:{type:"color",value:i},length:a.end-t}:null}return Ue(e[t+2])?null:{token:{type:"color",value:null},length:2}}return r==="r"&&n==="r"?Ue(e[t+2])?null:{token:{type:"event",event:{kind:"speed",perChar:null}},length:2}:null}function fi(e){const t=[];let n="";for(let r=0;r<e.length;r+=1){const a=e[r]==="\\"?Ct(e,r):null;if(!a){n+=e[r];continue}a.token.type==="literal"?n+=a.token.text:(n&&t.push({type:"literal",text:n}),n="",t.push(a.token)),r+=a.length-1}return n&&t.push({type:"literal",text:n}),t}const Y=e=>!!(e&&e.includes("\\")),ee=e=>!!e.marks?.some(t=>t.type==="variable"||t.type==="code");function Ie(e){if(!e.some(p=>!ee(p)&&Y(p.text)))return{runs:e,cues:[],autoAdvance:!1,hasCodes:!1};const t=[];e.forEach((p,g)=>{for(const k of p.text)t.push({char:k,run:g})});const r=t.map(p=>p.char).join(""),a=[];let i=0;for(const p of t)a.push(i),i+=p.char.length;const o=new Map(a.map((p,g)=>[p,g])),s=[],l=[];let c=null,d=!1,u=!1,m="";const b=(p,g)=>{const k=(g||[]).filter(x=>c===null||x.type!=="color"),v=c===null?k:[...k,{type:"color",value:c}];s.push({text:p,...v.length?{marks:v.map(x=>({...x}))}:{}}),m+=p};for(let p=0;p<t.length;p+=1){const{char:g,run:k}=t[p],v=e[k].marks;if(g!=="\\"||ee(e[k])){b(g,v);continue}const x=Ct(r,a[p]),h=x?o.get(a[p]+x.length)??t.length:-1;if(!x||t.slice(p,h).some(y=>ee(e[y.run]))){b(g,v);continue}u=!0;const{token:f}=x;f.type==="literal"?b(f.text,v):f.type==="auto"?d=!0:f.type==="color"?c=f.value:l.push({at:St(m),event:f.event}),p=h-1}return{runs:u?E(s):e,cues:l,autoAdvance:d,hasCodes:u}}function qe(e){return!e||!Y(e)?e:Ie([{text:e}]).runs.map(t=>t.text).join("")}const mi=e=>Ie(e).runs;function Ye(e){if(!Y(e.text)&&!e.runs?.some(r=>Y(r.text)))return e;const t=Ie(sa(e));if(!t.hasCodes)return e;const n=t.runs.some(r=>r.marks?.length);return{...e,text:oa(t.runs),...e.runs?.length||n?{runs:t.runs}:{}}}function Xe(e){const t=qe(e.text),n=e.dialogueLines?.map(Ye),r=e.localizations?.map(a=>({...a,text:qe(a.text),dialogueLines:a.dialogueLines?.map(Ye)}));return{...e,...e.text!==void 0?{text:t}:{},...n?{dialogueLines:n}:{},...r?{localizations:r}:{}}}function pi(e){return{...e,nodes:e.nodes.map(t=>({...t,data:Xe(t.data)})),...e.boards?{boards:e.boards.map(t=>({...t,nodes:t.nodes.map(n=>({...n,data:Xe(n.data)}))}))}:{}}}function hi(e,t,n){const r=n.speedFactor&&n.speedFactor>0?n.speedFactor:1;let a=n.startSpeed??null,i=!1;const o=[];let s={from:0,to:0,times:[],duration:0},l=0,c=0;const d=[...t].sort((b,p)=>b.at-p.at);let u=0;const m=b=>{let p=0;for(;c<d.length&&d[c].at<=b;){const{event:g}=d[c];c+=1,g.kind==="pause"?n.instant||(p+=g.ms):g.kind==="speed"?a=g.perChar:g.kind==="instant"?i=g.on:g.kind==="wait"&&b<e&&b>s.from&&(l+=p,p=0,s.duration=l,o.push(s),s={from:b,to:b,times:[],duration:0},l=0)}return l+=p,p};for(let b=0;b<e;b+=1){m(b);const p=n.instant||i?0:Math.max(1,(a??n.perChar)/r);l+=p,s.times.push(l),s.to=b+1}return u=m(e),s.duration=l,o.push(s),{segments:o,endSpeed:a,trailingMs:u}}function gi(e,t){const{times:n}=e;if(!n.length||t>=n[n.length-1])return e.to;let r=0,a=n.length;for(;r<a;){const i=r+a>>1;n[i]<=t?r=i+1:a=i}return e.from+r}const wa=[{code:"\\.",insert:"\\.",zh:"停 0.25 秒",en:"Pause 0.25 s"},{code:"\\|",insert:"\\|",zh:"停 1 秒",en:"Pause 1 s"},{code:"\\w[500]",insert:"\\w[500]",zh:"停指定毫秒數",en:"Pause for the given milliseconds"},{code:"\\s[60]",insert:"\\s[60]",zh:"之後每字幾毫秒（越小越快，沿用到後面台詞）",en:"Milliseconds per character from here on (lower is faster; carries into later lines)"},{code:"\\r",insert:"\\r",zh:"速度回到預設（同 \\s[0]）",en:"Back to the default speed (same as \\s[0])"},{code:"\\!",insert:"\\!",zh:"停下來等玩家點一下",en:"Wait for the player to click"},{code:"\\^",insert:"\\^",zh:"打完自動下一句，不等點擊",en:"Advance automatically when the line finishes"},{code:"\\>",insert:"\\>",zh:"之後的字一次出現",en:"Show the following text at once"},{code:"\\<",insert:"\\<",zh:"恢復逐字打",en:"Resume letter-by-letter typing"},{code:"\\c[#ff6b6b]",insert:"\\c[#ff6b6b]",zh:"之後的字換顏色（#RGB／#RRGGBB）",en:"Colour the following text (#RGB / #RRGGBB)"},{code:"\\c[]",insert:"\\c[]",zh:"顏色回到原本的",en:"Back to the normal colour"},{code:"\\\\",insert:"\\\\",zh:"打出一個反斜線",en:"A literal backslash"}];`${wa.map(e=>`${e.code} = ${e.en}`).join("; ")}`;export{dn as $,si as A,Xr as B,mi as C,wr as D,gn as E,Rr as F,Lr as G,Br as H,Or as I,fn as J,Er as K,jn as L,Dr as M,Vr as N,Ar as O,H as P,fe as Q,zt as R,wn as S,wa as T,Nr as U,Ir as V,Mr as W,P as X,aa as Y,Ja as Z,De as _,Ha as a,ur as a$,zr as a0,An as a1,me as a2,Cn as a3,pe as a4,Fr as a5,Hr as a6,_r as a7,Ln as a8,St as a9,Da as aA,je as aB,ja as aC,ne as aD,Kr as aE,er as aF,ii as aG,ri as aH,ra as aI,K as aJ,j as aK,C as aL,vt as aM,q as aN,ta as aO,ea as aP,ni as aQ,xr as aR,kr as aS,rn as aT,ir as aU,or as aV,rr as aW,lr as aX,en as aY,fr as aZ,pr as a_,qe as aa,Pe as ab,re as ac,Ur as ad,Mn as ae,jr as af,Wr as ag,En as ah,_t as ai,Ya as aj,za as ak,ae as al,Me as am,X as an,Ke as ao,se as ap,Ka as aq,ce as ar,qa as as,Na as at,Ba as au,le as av,Aa as aw,mt as ax,Za as ay,$a as az,ft as b,mr as b0,Ra as b1,yr as b2,br as b3,hr as b4,sr as b5,nr as b6,Tn as b7,Zr as b8,kt as b9,kn as bA,He as bB,nn as bC,Qa as bD,Tr as bE,ti as bF,Wt as bG,ai as bH,$e as bI,ye as bJ,Y as bK,fi as bL,pi as bM,Hn as bN,Yr as bO,st as bP,ot as bQ,bn as bR,Ht as bS,Ft as bT,$t as bU,Ta as bV,bt as bW,na as bX,Oe as bY,Jr as bZ,Ie as ba,pa as bb,ci as bc,di as bd,hi as be,li as bf,$r as bg,gr as bh,Pr as bi,an as bj,_a as bk,z as bl,dt as bm,La as bn,gi as bo,Qr as bp,ei as bq,ar as br,dr as bs,cr as bt,Oa as bu,Xa as bv,Sr as bw,Cr as bx,tr as by,Qt as bz,qr as c,ka as d,Ua as e,Fa as f,oa as g,Ee as h,de as i,Ga as j,xe as k,sa as l,Wa as m,Pa as n,Gr as o,R as p,ie as q,vr as r,ut as s,la as t,ui as u,ca as v,da as w,E as x,oi as y,ua as z};
