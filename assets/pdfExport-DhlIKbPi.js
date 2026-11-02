import{r as te}from"./backgroundShade-BWN4KWt-.js";import{ap as ae}from"./index-CpUcZcaR.js";import{buildPrintBook as ie,printScenes as ne}from"./printBook-B-UsJrmb.js";import{bn as re}from"./store-F1UlzJ2-.js";import{renderSceneStill as se,loadImage as oe}from"./videoExport--V8VcPDf.js";import"./preload-helper-BXl3LOEh.js";import"./react-core-CuKebU_E.js";import"./boards-CCpNhgGd.js";import"./importedNodes-D4SrRZda.js";import"./inventoryCatalog-Dsh77Mxt.js";import"./builtInPropThumbnails.generated-HTcIqvXB.js";import"./pluginManifest-DtBNASjS.js";import"./larch-math-D2H1mtik.js";import"./rpg-core-t3wT0B5n.js";import"./stageVisibility-Cwgiadnn.js";import"./persistence-qrEjdOOW.js";import"./compression-NJe3JlLV.js";import"./flow-engine-MaqDItRm.js";import"./pluginStorage-2aTQoNbu.js";import"./soundEffects-BykNDmTc.js";import"./lock-keyhole-BnAm3HMP.js";import"./zap--pgXdysk.js";import"./wand-sparkles-C7g2o2UX.js";import"./swords-BS0lWvYG.js";import"./sparkles-CBkXTQb8.js";import"./map-DJ-c1QZe.js";import"./grid-3x3-sAUEnDz3.js";import"./dices-NbnScaHJ.js";import"./coins-BoeptXd1.js";import"./box-CA4HTO_v.js";import"./paidBasics-B6aIeCEs.js";import"./message-circle-Ce9inMOh.js";import"./git-branch-ClD1zIOv.js";import"./clapperboard-jgUuAGyh.js";import"./radio-D9sDld3t.js";import"./video-Bhg0Nol3.js";import"./lightbulb-BHXwDG0j.js";import"./users-0JKYs9aD.js";import"./user-round-7JUdmURN.js";import"./nodeGroups-N-oklwA1.js";import"./uiSkills-CXEAVFNa.js";import"./billingStatus-dyVerBTO.js";import"./mediaUpload-DogTLcGj.js";import"./voiceLocale-BctR6NuN.js";import"./sfxTracks-IDRyaATN.js";const n=i=>String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");function q(i){const c=/^#([\da-f]{3}|[\da-f]{6})$/i.exec(String(i||"").trim())?.[1];if(!c)return;const t=c.length===3?c.split("").map(s=>s+s).join(""):c,r=s=>{const h=parseInt(t.slice(s,s+2),16)/255;return h<=.03928?h/12.92:((h+.055)/1.055)**2.4};return 1.05/(.2126*r(0)+.7152*r(2)+.0722*r(4)+.05)>=3?`#${t}`:void 0}const F=i=>!!(i&&!/^\s*(linear|radial|conic)-gradient\(/i.test(i));function me(i,c={}){const t=i.zh,r=c.paper||"a4",l=c.images||new Map,s=e=>e?l.get(e)||e:void 0,h=e=>l.get(e.key)||(F(e.background)?s(e.background):void 0),g=e=>t?`「${e}」`:`“${e}”`,b=e=>i.chapters.find(a=>a.index===e),y=e=>e?e.title:t?"另一話":"another chapter",w=i.stats.passages,z=w>1,u=i.chapters.flatMap(e=>e.passages.flatMap(a=>a.blocks)).some(e=>e.kind==="interactive"||e.kind==="video"),x=e=>e.map(a=>{const m=a.marks||[],p=m.find(o=>o.type==="variable");if(p){const o=String(p.value||a.text.replace(/[{}\s]/g,""));return`<span class="var">${n(i.labels[o]||o)}</span>`}let d=n(a.text).replace(/\n/g,"<br>");for(const o of m)if(o.type==="bold")d=`<b>${d}</b>`;else if(o.type==="italic")d=`<i>${d}</i>`;else if(o.type==="big")d=`<span class="big">${d}</span>`;else if(o.type==="small")d=`<small>${d}</small>`;else if(o.type==="code")d=`<code>${d}</code>`;else if(o.type==="ruby"&&o.value)d=`<ruby>${d}<rt>${n(o.value)}</rt></ruby>`;else if(o.type==="link"&&/^https?:\/\//i.test(String(o.value||"")))d=`<a class="out" href="${n(o.value)}">${d}</a>`;else if(o.type==="color"){const k=q(o.value);k&&(d=`<span style="color:${k}">${d}</span>`)}return d}).join(""),$=e=>x(re(e)),A=(e,a)=>`<a class="to" href="#p${e}">${a??e}</a>`,j=(e,a)=>{if("passage"in e)return`#p${e.passage}`;if("chapter"in e)return`#ch-${e.chapter}`;if("end"in e&&a?.interlude?.mode==="jump"&&a.interlude.target)return j(a.interlude.target)},P=(e,a)=>{if("passage"in e)return`<span class="to"><b>${e.passage}</b><i aria-hidden="true">›</i></span>`;if("chapter"in e)return`<span class="to to-chapter">${n(y(b(e.chapter)))}<i aria-hidden="true">›</i></span>`;if("outside"in e)return`<span class="to to-muted">${t?"另一話（未收錄）":"Another chapter (not included)"}</span>`;const m=a?.interlude;return m?.mode==="return"?`<span class="to to-muted">${t?"翻回原本那段":"Back where you were"}</span>`:m?.mode==="jump"&&m.target?P(m.target):`<span class="to to-muted">${t?"故事結束":"The end"}</span>`},S=(e,a,m,p="")=>{const d=a?j(a,m):void 0,o=`${e}${a?P(a,m):""}`;return d?`<a class="pick${p}" href="${d}">${o}</a>`:`<div class="pick is-static${p}">${o}</div>`},V=(e,a)=>e.condition?a===0?t?`如果${e.condition}`:`If ${e.condition}`:t?`不然，如果${e.condition}`:`Otherwise, if ${e.condition}`:a===0?t?"接著":"Next":t?"其他情況":"Otherwise",L=(e,a)=>e.map((m,p)=>S(`<span class="pick-label">${n(V(m,p))}</span>`,m.to,a," is-branch")).join(""),M=(e,a,m)=>{const p=j(a,m),d="passage"in a?t?`第 ${a.passage} 段`:`passage ${a.passage}`:"chapter"in a?n(y(b(a.chapter))):"",o=`${n(e)} <b>${d}</b><i aria-hidden="true">›</i>`;return p?`<p class="turn"><a class="turn-link" href="${p}">${o}</a></p>`:`<p class="turn">${o}</p>`},T=e=>{if(e.interlude?.mode==="return")return`<p class="interlude-end">${t?"這段插曲讀完了。翻回你剛才讀到的那一段，從中斷的地方接著讀。":"The interlude is over. Turn back to the passage you were reading and carry on from where you stopped."}</p>`;if(e.interlude?.mode==="jump"&&e.interlude.target)return M(t?"插曲讀完了，翻到":"The interlude is over. Turn to",e.interlude.target);const a=e.ending?.title;return`<div class="ending"><span class="ornament">◆</span><small>${e.ending?t?`結局 ${e.ending.index}`:`Ending ${e.ending.index}`:t?"故事結束":"The end"}</small>${a?`<b>${n(a)}</b>`:""}</div>`},f=(e,a)=>{if(e.kind==="go"){const o=e.to;return"end"in o?T(a):"passage"in o?M(o.passage===a.number+1?t?"繼續讀":"Read on to":t?"翻到":"Turn to",o):"chapter"in o?M(t?"翻到":"Turn to",o):`<p class="turn muted">${o.outside?t?`故事接到${g(o.outside)}，這份 PDF 沒有收錄。`:`The story continues in ${g(o.outside)}, which this PDF does not include.`:t?"故事接到另一話，這份 PDF 沒有收錄。":"The story continues in another chapter that this PDF does not include."}</p>`}if(e.kind==="branches")return`<nav class="picks"><p class="picks-head">${e.branches.some(k=>k.condition?.startsWith(t?"你覺得":"you judge"))?t?"由你判斷":"You decide":t?"看看紀錄表":"Check your sheet"}</p>${L(e.branches,a)}</nav>`;const m=e.options.map(o=>{const k=o.requirement?`<small class="need">${n(o.requirement)}</small>`:"",I=`<span class="pick-label">${$(o.label)}${k}</span>`;return o.branches.length?o.branches.length===1&&!o.branches[0].condition?S(I,o.branches[0].to,a):`<div class="pick-group"><div class="pick-group-label">${I}</div>${L(o.branches,a)}</div>`:S(I,void 0,a," is-shared")}).join(""),p=e.after?`<div class="after"><span>${t?"選好以後":"Whichever you pick"}</span>${f(e.after,a)}</div>`:"",d=e.noneLeft?`<div class="after"><span>${t?"選項都用完以後":"Once no options are left"}</span>${f(e.noneLeft,a)}</div>`:"";return`<nav class="picks"><p class="picks-head">${t?"你的選擇":"Your choice"}</p>${m}${p}${d}</nav>`},v=e=>`<span class="tag">${n(e)}</span>`,B=e=>{switch(e.kind){case"scene":{const a=h(e.scene);return a?`<figure class="scene"><img src="${n(a)}" alt=""></figure>`:""}case"line":{const a=x(e.runs);return e.hidden?`<p class="line hidden">${t?"（不顯示）":"(not shown)"}${e.speaker?`<b>${n(e.speaker)}</b> `:""}${a}</p>`:e.speaker?`<p class="line said"><span class="who">${n(e.speaker)}</span><span class="words">${a}</span></p>`:`<p class="line narration">${a}</p>`}case"card":return`<p class="card-tag">${n(e.title)}</p>`;case"cue":return`<p class="cue">${n(e.text)}</p>`;case"record":return`<aside class="record"><b>${t?"記下":"Note"}</b><ul>${e.items.map(a=>`<li>${n(a)}</li>`).join("")}</ul></aside>`;case"item":{const a=e.gained?e.count>1?` × ${e.count}`:"":e.count===0?t?"（全部）":" (all)":e.count>1?` × ${e.count}`:"",m=e.image?`<img src="${n(s(e.image))}" alt="">`:"";return`<aside class="item${e.gained?" gained":" lost"}">${m}<div><b>${e.gained?t?"獲得道具":"You got":t?"失去道具":"You lost"}</b><strong>${n(e.name)}${n(a)}</strong>${e.note?`<p>${n(e.note)}</p>`:""}<small>${e.gained?t?"寫進紀錄表的背包欄。":"Add it to the bag on your sheet.":t?"從紀錄表的背包欄劃掉。":"Cross it off the bag on your sheet."}</small></div></aside>`}case"input":{const a=i.labels[e.variable]||e.variable,m=e.inputKind==="number"?t?`想一個數字${e.range?`（${e.range}）`:""}`:`Choose a number${e.range?` (${e.range})`:""}`:e.inputKind==="password"?t?"想一組暗號":"Think of a password":t?"寫下你的答案":"Write your answer";return`<aside class="write"><b>${n(m)}</b>${e.prompt?`<p>${$(e.prompt)}</p>`:""}<div class="blank"><span class="var">${n(a)}</span><i></i></div>${e.suggestions.length?`<small>${t?"例如：":"For example: "}${e.suggestions.map(n).join(t?"、":", ")}</small>`:""}<small>${t?"後面看到這個空格，就換成你寫的答案。":"Wherever this blank appears later, read it as your answer."}</small></aside>`}case"dice":{const a=e.resultVar?g(i.labels[e.resultVar]||e.resultVar):"",m=e.passVar?g(i.labels[e.passVar]||e.passVar):"",p=t?`擲 ${e.count} 顆 ${e.sides} 面骰${e.count>1?"，把點數加起來":""}${a?`，記在${a}`:""}。`:`Roll ${e.count} ${e.sides}-sided ${e.count>1?"dice and add them up":"die"}${a?`, and write the total in ${a}`:""}.`,d=e.target>0?t?`總點數 ${e.target} 以上就過關${m?`：在${m}打勾`:""}。`:`A total of ${e.target} or more passes${m?` — tick ${m}`:""}.`:"",o=Array.from({length:e.count},()=>"<i></i>").join("<em>+</em>");return`<aside class="play dice">${v(t?"擲骰":"Dice")}<b>${n(e.title)}</b><p>${n(p)}${n(d)}</p><div class="dice-boxes">${o}<em>=</em><i class="total"></i></div></aside>`}case"maze":{const a=Math.max(1,...e.rows.map(d=>Array.from(d).length)),m=e.rows.flatMap(d=>{const o=Array.from(d);return Array.from({length:a},(k,I)=>{const C=o[I]||" ";return C==="#"?'<i class="wall"></i>':C==="S"?`<i class="mark">${n(e.player)}</i>`:C==="G"?`<i class="mark goal">${n(e.goal)}</i>`:C==="*"?`<i class="mark">${n(e.loot)}</i>`:C===" "?'<i class="void"></i>':"<i></i>"})}).join(""),p=[e.stepsVar?t?`數一數你走了幾步，記在${g(i.labels[e.stepsVar]||e.stepsVar)}`:`count your steps and write them in ${g(i.labels[e.stepsVar]||e.stepsVar)}`:"",e.lootVar?t?`把撿到幾個${e.loot}記在${g(i.labels[e.lootVar]||e.lootVar)}`:`write how many ${e.loot} you picked up in ${g(i.labels[e.lootVar]||e.lootVar)}`:""].filter(Boolean);return`<aside class="play maze">${v(t?"紙上迷宮":"Paper maze")}<b>${n(e.title)}</b><p>${t?`用筆從 ${n(e.player)} 走到 ${n(e.goal)}，不能穿過黑色的牆；${n(e.loot)} 可以順路撿起來。`:`Draw a path from ${n(e.player)} to ${n(e.goal)} without crossing the black walls; pick up ${n(e.loot)} on the way.`}</p><div class="maze-grid" style="--cols:${a}">${m}</div>${e.goalText?`<p class="small">${t?"到了出口：":"At the exit: "}${n(e.goalText)}</p>`:""}${p.length?`<p class="small">${n(p.join(t?"；":"; "))}${t?"。":"."}</p>`:""}</aside>`}case"interactive":{const a=e.tone==="bag"?t?"背包":"Bag":e.tone==="ai"?t?"AI 互動":"AI":e.tone==="rpg"?"RPG":e.tone==="miniGame"?t?"網頁小遊戲":"Web mini-game":t?"網頁互動":"Web interactive",m=e.color?q(e.color):void 0;return`<aside class="play web tone-${e.tone}"${m?` style="--tone:${m}"`:""}>${v(a)}<b>${n(e.title)}</b>${e.subtitle?`<small class="sub-title">${n(e.subtitle)}</small>`:""}${e.text?`<p>${$(e.text)}</p>`:""}${e.details.map(p=>`<p class="small">${n(p)}</p>`).join("")}</aside>`}case"video":{const a=e.poster?`<img src="${n(s(e.poster))}" alt="">`:"";return`<aside class="play video">${v(t?"影片":"Video")}${a}<b>${n(e.title)}</b>${e.text?`<p>${$(e.text)}</p>`:""}${e.url?`<p class="small"><a class="out" href="${n(e.url)}">${n(e.url)}</a></p>`:`<p class="small">${t?"這段影片要在網頁版看。":"Watch this video in the web version."}</p>`}</aside>`}case"cg":return`<figure class="cg"><img src="${n(s(e.url))}" alt=""><figcaption>${e.title?n(e.title):"CG"}</figcaption></figure>`;default:return""}},Z=e=>`<article class="passage" id="p${e.number}">
<header class="passage-head"><span class="no">${e.number}</span></header>
${e.blocks.map(B).join(`
`)}
${f(e.exit,e)}
</article>`,H=c.date||new Date,E=`${H.getFullYear()}-${String(H.getMonth()+1).padStart(2,"0")}-${String(H.getDate()).padStart(2,"0")}`,D=s(i.cover),O=[z?t?`${w} 段`:`${w} passages`:"",i.stats.choices?t?`${i.stats.choices} 個選擇`:`${i.stats.choices} choices`:"",i.stats.endings>1?t?`${i.stats.endings} 種結局`:`${i.stats.endings} endings`:""].filter(Boolean),_=`<section class="cover${D?"":" plain"}">
${D?`<div class="cover-art"><img src="${n(D)}" alt=""></div>`:'<div class="cover-art"></div>'}
<div class="cover-copy">
<small>${z?t?"互動故事・遊戲書":"Interactive story · Gamebook":t?"故事":"Story"}</small>
<h1>${n(i.title)}</h1>
${i.description?`<p>${n(i.description)}</p>`:""}
${O.length?`<ul class="stats">${O.map(e=>`<li>${n(e)}</li>`).join("")}</ul>`:""}
<footer>${t?`以 Larch 製作 · ${E}`:`Made with Larch · ${E}`}</footer>
</div>
</section>`,R=z?`<section class="howto">
<h2>${t?"閱讀方式":"How to read this book"}</h2>
<ol>
<li>${t?"從第 1 段開始讀。":"Start at passage 1."}</li>
<li>${t?"每段最後會告訴你翻到哪一段；遇到選擇，由你決定翻去哪裡。":"Each passage ends by telling you where to turn next. When you reach a choice, you decide."}</li>
${i.sheet.length||i.bag?`<li>${t?"看到「記下」，就在紀錄表上改數字、打勾或寫字；看到「如果……」，照紀錄表上的內容決定去處。":"When you see “Note”, update your sheet; when you see “If …”, check the sheet to find your way."}</li>`:""}
${u?`<li>${t?"標著「網頁互動」「網頁小遊戲」的地方只能在網頁版玩；可以玩完再回來，或自己決定結果往下讀。":"Parts marked “Web” only play in the web version; play them there, or pick a result yourself and read on."}</li>`:""}
<li>${t?"在電腦或手機上看這份 PDF 時，直接點你的選擇，就會跳到那一段。":"Reading on a screen? Just tap your choice to jump to that passage."}</li>
</ol>
${i.rules.length?`<div class="rules"><h3>${t?"隨時注意":"Always watch for"}</h3>${i.rules.map(e=>`<p>${t?`只要${n(e.condition)}，就立刻翻到`:`The moment ${n(e.condition)}, turn to`} ${A(e.passage,t?`第 ${e.passage} 段`:String(e.passage))}${e.mode==="return"?t?"，讀完再翻回來":", then come back":""}${e.once?t?"（只發生一次）":" (only once)":""}${t?"。":"."}</p>`).join("")}</div>`:""}
</section>`:"",N=i.chapters.length>1?`<section class="toc">
<h2>${t?"目錄":"Contents"}</h2>
${i.chapters.map((e,a)=>{const m=e.passages.map(d=>d.number),p=m.length?m.length>1?`${Math.min(...m)}–${Math.max(...m)}`:`${m[0]}`:t?"AI 即興":"AI";return`<a class="toc-row" href="#ch-${e.index}"><span class="toc-no">${t?`第 ${a+1} 話`:`Chapter ${a+1}`}</span><span class="toc-title">${n(e.title)}</span><span class="dots"></span><span class="toc-range">${n(p)}</span></a>`}).join("")}
</section>`:"",G=i.sheet.length||i.bag?`<section class="sheet">
<h2>${t?"冒險紀錄表":"Adventure sheet"}</h2>
<p class="small">${t?"一邊讀一邊在這裡記。可以印出來用鉛筆寫，也可以另外拿一張紙抄下來。":"Keep track here as you read — in pencil on a printout, or copied onto scrap paper."}</p>
${i.sheet.length?`<table><thead><tr><th>${t?"項目":"Item"}</th><th>${t?"一開始":"Starts at"}</th><th>${t?"紀錄":"Your notes"}</th></tr></thead><tbody>${i.sheet.map(e=>`<tr><th><b>${n(e.label)}</b>${e.description?`<small>${n(e.description)}</small>`:""}</th><td>${n(e.initial||"—")}</td><td class="notes">${e.type==="boolean"?'<span class="box"></span>':""}</td></tr>`).join("")}</tbody></table>`:""}
${i.bag?`<div class="bag"><b>${t?"背包":"Bag"}</b><div class="bag-lines"><i></i><i></i><i></i></div></div>`:""}
</section>`:"",Y=i.cast.length?`<section class="cast">
<h2>${t?"登場人物":"Characters"}</h2>
<div class="cast-grid">${i.cast.map(e=>`<div class="member">${e.portrait?`<div class="portrait"><img src="${n(s(e.portrait))}" alt=""></div>`:""}<b>${n(e.name)}</b>${e.role?`<small>${n(e.role)}</small>`:""}${e.summary?`<p>${n(e.summary)}</p>`:""}</div>`).join("")}</div>
</section>`:"",Q=R||N||G||Y?`<section class="front">${R}${N}${G}${Y}</section>`:"",X=i.chapters.map((e,a)=>{const m=i.chapters.length>1||e.ai?`<header class="chapter-head"><small>${t?`第 ${a+1} 話`:`Chapter ${a+1}`}</small><h2>${n(e.title)}</h2>${e.description?`<p>${n(e.description)}</p>`:""}</header>`:"",p=e.ai?`<aside class="play web tone-ai">${v(t?"AI 即興":"AI improvised")}<b>${t?"這一話由 AI 導演即興演出":"An AI director improvises this chapter"}</b>${e.ai.premise?`<p>${n(e.ai.premise)}</p>`:""}${e.ai.prompt?`<p class="small">${t?"AI 指示：":"AI brief: "}${n(e.ai.prompt)}</p>`:""}${e.ai.exits.length?`<p class="small">${t?"演到這些情況就結束：":"It ends when: "}${n(e.ai.exits.join(t?"、":"; "))}</p>`:""}<p class="small">${t?"沒有固定劇本，只能在網頁版玩。":"There is no fixed script; it only plays on the web."}</p></aside>${e.ai.next?M(t?"這一話結束之後，翻到":"Afterwards, turn to",e.ai.next):""}`:"";return`<section class="chapter" id="ch-${e.index}">${m}${p}${e.passages.map(Z).join(`
`)}</section>`}).join(`
`),ee=t?"zh-Hant":i.locale||"en";return`<!doctype html>
<html lang="${n(ee)}" class="paper-${r}${i.notes?" with-notes":""}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${n(i.title)}</title>
<style>${de(r,i.aspect)}</style>
</head>
<body>
${_}
${Q}
<main>
${X}
</main>
</body>
</html>`}function ce(i){const c=new Map,t=(r,l,s)=>{!r||!F(r)||c.has(r)||c.set(r,{url:r,maxSide:l,transparent:s})};t(i.cover,1800,!1);for(const r of i.cast)t(r.portrait,700,!0);for(const r of i.chapters)for(const l of r.passages)for(const s of l.blocks)s.kind==="item"&&t(s.image,360,!0),s.kind==="cg"&&t(s.url,1400,!1),s.kind==="video"&&t(s.poster,1100,!1),s.kind==="scene"&&F(s.scene.background)&&t(s.scene.background,1280,!1);return[...c.values()]}function de(i,c){const t=i==="a5",r=t?{size:"A5",width:148,height:210,margin:"14mm 13mm 16mm",text:122}:{size:"A4",width:210,height:297,margin:"18mm 18mm 20mm",text:174},l=`${Math.max(1,Math.round(c.width))} / ${Math.max(1,Math.round(c.height))}`;return`
@page { size: ${r.size}; margin: ${r.margin}; }
@page :first { margin: 0; }
/*
 * 紙張邊界歸零、改由內容自己在每一頁留白（box-decoration-break: clone 讓分頁後的每一段都
 * 重新有上下內距）。這樣 Chrome 的列印視窗就沒有地方放它自己的頁首頁尾 —— 那一欄會自動
 * 停用，印出來不會多一行日期、標題與 about:srcdoc。不支援的瀏覽器照舊用紙張邊界。
 */
@media print {
  @supports (box-decoration-break: clone) {
    @page { margin: 0; }
    .front, main { padding: ${r.margin}; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  }
}
:root {
  color-scheme: light;
  --ink: #1c211d; --muted: #5a6058; --accent: #365f43; --line: #cfd4cb; --soft: #f2f4ef; --paper: #fff;
  --serif: "Noto Serif TC", "Source Han Serif TC", "Songti TC", "PMingLiU", "Noto Serif CJK TC", "Hiragino Mincho ProN", Georgia, "Times New Roman", serif;
  --sans: Inter, "SF Pro Text", "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", "Helvetica Neue", Arial, sans-serif;
  --text-width: ${r.text}mm;
}
* { box-sizing: border-box; }
html { background: var(--paper); color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: ${t?"9.6pt":"10.6pt"}/1.85 var(--serif); letter-spacing: .01em; text-rendering: optimizeLegibility; }
a { color: inherit; text-decoration: none; }
h1, h2, h3 { font-family: var(--sans); color: var(--ink); line-height: 1.3; margin: 0; break-after: avoid; }
img { display: block; max-width: 100%; }
.small { font-size: .86em; color: var(--muted); }
.muted { color: var(--muted); }

/* 封面：整頁，不留白邊（@page :first 已經把邊界拿掉）。 */
.cover { width: ${r.width}mm; height: ${r.height-.6}mm; display: flex; flex-direction: column; overflow: hidden; break-after: page; background: #10140f; color: #fff; }
.cover-art { flex: 1 1 58%; min-height: 0; background: linear-gradient(145deg, #365f43, #10140f); }
.cover-art img { width: 100%; height: 100%; object-fit: cover; }
.cover.plain .cover-art { flex-basis: 38%; }
.cover-copy { flex: 0 0 auto; padding: ${t?"10mm 12mm 11mm":"15mm 18mm 16mm"}; font-family: var(--sans); background: #10140f; }
.cover-copy small { display: block; color: #b9d3be; font-size: ${t?"7.5pt":"8.5pt"}; letter-spacing: .16em; font-weight: 600; }
.cover-copy h1 { margin: 3mm 0 0; color: #fff; font-family: var(--serif); font-size: ${t?"21pt":"30pt"}; font-weight: 700; letter-spacing: .02em; }
.cover-copy p { margin: 3.5mm 0 0; color: #d6ddd4; font-size: ${t?"8.5pt":"10pt"}; line-height: 1.7; max-width: 150mm; }
.cover-copy .stats { display: flex; flex-wrap: wrap; gap: 2mm; margin: 5mm 0 0; padding: 0; list-style: none; }
.cover-copy .stats li { padding: .8mm 2.6mm; border: .25mm solid #6f8a74; border-radius: 99px; color: #e8efe6; font-size: ${t?"7.5pt":"8.5pt"}; }
.cover-copy footer { margin-top: 6mm; color: #a9b6a7; font-size: ${t?"7pt":"8pt"}; }

.front { break-after: page; }
.front > section + section { margin-top: 9mm; }
.front h2 { font-size: ${t?"13pt":"15pt"}; padding-bottom: 2mm; border-bottom: .3mm solid var(--line); margin-bottom: 3.5mm; }
.howto ol { margin: 0; padding-left: 5.5mm; }
.howto li { margin: 1mm 0; }
.rules { margin-top: 5mm; padding: 3.5mm 4.5mm; border: .3mm solid #b8c9ba; border-radius: 2.5mm; background: #f1f6f1; }
.rules h3 { font-size: 10pt; color: var(--accent); margin-bottom: 1.5mm; }
.rules p { margin: 1mm 0; }
.rules .to { color: var(--accent); font-weight: 700; font-family: var(--sans); }
.toc-row { display: flex; align-items: baseline; gap: 2.5mm; padding: 1.4mm 0; }
.toc-no { flex: none; font: 600 .82em var(--sans); color: var(--muted); }
.toc-title { flex: none; max-width: 70%; }
.toc-range { flex: none; font: 700 .9em var(--sans); color: var(--accent); }
.dots { flex: 1 1 auto; min-width: 4mm; border-bottom: .3mm dotted #9aa097; transform: translateY(-1.1mm); }
.sheet table { width: 100%; border-collapse: collapse; font-size: .95em; }
.sheet th, .sheet td { border: .25mm solid var(--line); padding: 2mm 2.5mm; text-align: left; vertical-align: top; }
.sheet thead th { font: 600 .8em var(--sans); color: var(--muted); background: var(--soft); }
.sheet tbody th { width: 34%; font-weight: normal; }
.sheet tbody th small { display: block; color: var(--muted); font-size: .8em; line-height: 1.5; }
.sheet tbody td:nth-child(2) { width: 18%; font-family: var(--sans); }
.sheet td.notes { height: 11mm; background-image: linear-gradient(90deg, transparent calc(100% - .2mm), #eef0eb 0); background-size: 8mm 100%; }
.sheet .box { display: inline-block; width: 4.5mm; height: 4.5mm; border: .35mm solid var(--ink); border-radius: .8mm; background: #fff; }
.bag { margin-top: 4mm; padding: 3mm 4mm; border: .25mm solid var(--line); border-radius: 2mm; }
.bag b { font-family: var(--sans); font-size: .9em; }
.bag-lines i { display: block; height: 8mm; border-bottom: .25mm solid var(--line); }
.cast-grid { display: grid; grid-template-columns: repeat(${t?2:3}, minmax(0, 1fr)); gap: 4mm; }
.member { break-inside: avoid; padding: 3mm; border: .25mm solid var(--line); border-radius: 2.5mm; }
.member .portrait { height: ${t?34:42}mm; margin: -1mm -1mm 2mm; border-radius: 1.8mm; background: linear-gradient(180deg, #eef2ec, #dfe6dc); overflow: hidden; }
.member .portrait img { width: 100%; height: 100%; object-fit: contain; object-position: center bottom; }
.member b { display: block; font-family: var(--sans); }
.member small { display: block; color: var(--accent); font: 600 .78em var(--sans); }
.member p { margin: 1mm 0 0; font-size: .85em; line-height: 1.6; color: var(--muted); }

.chapter { break-before: page; }
.chapter:first-child { break-before: auto; }
.chapter-head { margin-bottom: 7mm; padding-bottom: 4mm; border-bottom: .5mm solid var(--ink); }
.chapter-head small { font: 700 .8em var(--sans); letter-spacing: .14em; color: var(--accent); }
.chapter-head h2 { font-size: ${t?"16pt":"20pt"}; margin-top: 1mm; font-family: var(--serif); }
.chapter-head p { margin: 2mm 0 0; color: var(--muted); font-size: .92em; }

.passage { margin: 0 0 ${t?"6mm":"8mm"}; }
.passage-head { display: flex; align-items: center; gap: 3mm; margin: 0 0 3mm; break-after: avoid; }
.passage-head::after { content: ""; flex: 1; border-top: .3mm solid var(--line); }
.passage-head .no { min-width: 9mm; height: 9mm; padding: 0 2mm; display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; background: var(--ink); color: #fff; font: 700 ${t?"9pt":"10pt"} var(--sans); }
.scene { margin: 0 0 4mm; break-inside: avoid; }
/* 插圖不撐滿整頁寬：一張 16:9 滿版就佔掉三分之一頁，短段落會被整段擠到下一頁、留下大片空白。 */
.scene img { width: auto; height: auto; max-width: 100%; max-height: ${t?52:70}mm; aspect-ratio: ${l}; margin: 0 auto; object-fit: cover; border-radius: 2mm; background: var(--soft); }
.line { margin: 0 0 2.2mm; orphans: 2; widows: 2; }
.line.narration { text-indent: 2em; }
.line.said { display: grid; grid-template-columns: ${t?"17mm":"21mm"} minmax(0, 1fr); column-gap: 3mm; }
.line.said .who { font: 700 .82em/2.25 var(--sans); color: var(--accent); text-align: right; overflow-wrap: anywhere; }
.line.hidden { color: var(--muted); font-style: italic; font-size: .9em; }
.var { display: inline-block; min-width: 14mm; padding: 0 1.2mm; border-bottom: .3mm solid var(--ink); font: 600 .78em var(--sans); color: var(--muted); text-align: center; text-indent: 0; }
.big { font-size: 1.2em; }
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: .9em; }
ruby rt { font-size: .5em; }
.out { color: #254c9a; text-decoration: underline; overflow-wrap: anywhere; }
.card-tag { margin: 3mm 0 1.5mm; font: 600 .74em var(--sans); color: #6d5a2c; }
.card-tag::before { content: "▸ "; }
.cue { margin: 0 0 1.5mm; font: .76em var(--sans); color: var(--muted); }

.record, .item, .write, .play { break-inside: avoid; margin: 3mm 0 3.5mm; padding: 3mm 4mm; border-radius: 2.2mm; font-family: var(--sans); font-size: .9em; line-height: 1.65; }
.record { display: flex; gap: 3mm; border-left: 1mm solid var(--accent); background: #f1f6f1; }
.record b { flex: none; color: var(--accent); }
.record ul { margin: 0; padding: 0; list-style: none; }
.record li + li { margin-top: .6mm; }
.item { display: flex; gap: 4mm; align-items: center; border: .3mm solid #c9d8c8; background: #f6faf5; }
.item.lost { border-color: #dcc9c4; background: #fbf6f4; }
.item img { width: 16mm; height: 16mm; object-fit: contain; flex: none; }
.item b { display: block; font-size: .8em; color: var(--accent); }
.item.lost b { color: #8c3b2e; }
.item strong { display: block; font-size: 1.1em; }
.item p { margin: .6mm 0 0; color: var(--muted); }
.item small, .write small { display: block; color: var(--muted); font-size: .82em; }
.write { border: .3mm dashed #9aa597; }
.write b { color: var(--accent); }
.write p { margin: 1mm 0; font-family: var(--serif); }
.write .blank { display: flex; align-items: flex-end; gap: 2mm; margin: 2.5mm 0 1.5mm; }
.write .blank i { flex: 1; height: 7mm; border-bottom: .35mm solid var(--ink); }
.play { position: relative; border: .35mm solid var(--tone, #8d968a); background: #fafbf8; }
.play > b { display: block; font-size: 1.08em; margin-top: 1mm; }
.play p { margin: 1.2mm 0 0; }
.play .sub-title { display: block; color: var(--muted); }
.tag { display: inline-block; padding: .2mm 2mm; border-radius: 99px; background: var(--tone, #5a6058); color: #fff; font: 700 .72em/1.7 var(--sans); letter-spacing: .06em; }
.tone-ai { --tone: #5a4ea0; }
.tone-miniGame { --tone: #8a4b1f; }
.tone-rpg { --tone: #2f6a55; }
.tone-bag { --tone: #4d7453; }
.dice { --tone: #8b4f4f; }
.maze { --tone: #37563f; }
.video { --tone: #3b556e; }
.video img { width: 100%; max-height: 60mm; object-fit: cover; border-radius: 1.5mm; margin: 2mm 0; }
.dice-boxes { display: flex; align-items: center; gap: 2mm; margin-top: 2.5mm; }
.dice-boxes i { width: 9mm; height: 9mm; border: .35mm solid var(--ink); border-radius: 1.6mm; background: #fff; }
.dice-boxes i.total { width: 14mm; }
.dice-boxes em { font-style: normal; font-weight: 700; color: var(--muted); }
.maze-grid { --cell: min(8mm, calc(var(--text-width) * .92 / var(--cols))); display: grid; grid-template-columns: repeat(var(--cols), var(--cell)); margin: 3mm 0 1mm; border: .35mm solid var(--ink); width: max-content; background: #fff; }
.maze-grid i { width: var(--cell); height: var(--cell); display: grid; place-items: center; font-style: normal; font-size: calc(var(--cell) * .66); line-height: 1; border: .1mm solid #e3e6e0; }
.maze-grid i.wall { background: #2a302b; border-color: #2a302b; }
.maze-grid i.void { background: transparent; border-color: transparent; }
.cg { margin: 3mm 0 4mm; break-inside: avoid; text-align: center; }
.cg img { width: 100%; max-height: ${t?80:110}mm; object-fit: contain; border-radius: 2mm; }
.cg figcaption { margin-top: 1.5mm; font: 600 .78em var(--sans); color: var(--muted); }

.turn { margin: 4mm 0 0; font-family: var(--sans); font-size: .92em; color: var(--muted); break-inside: avoid; break-before: avoid; }
.turn b { color: var(--accent); }
/* 「繼續讀第 5 段」：一顆小膠囊按鈕，螢幕上看 PDF 的人點它就翻過去。 */
.turn-link { display: inline-flex; align-items: center; gap: 1.2mm; padding: 1.4mm 3.4mm 1.4mm 4mm; border: .3mm solid #9cb5a2; border-radius: 99px; background: #f1f6f1; color: var(--ink); }
.turn-link i { font-style: normal; font-weight: 800; color: var(--accent); }
/* 選項跟它前面那句問話留在同一頁：翻頁後才看到一排按鈕，讀者會不知道在選什麼。 */
.picks { margin: 4.5mm 0 0; font-family: var(--sans); font-size: .92em; break-inside: avoid; break-before: avoid; }
.picks-head { margin: 0 0 2mm; font-size: .78em; font-weight: 700; letter-spacing: .12em; color: var(--muted); break-after: avoid; }
/* 每個選項是一顆按鈕：整顆都是連結；右邊的號碼留給印在紙上的人翻。 */
.pick { display: flex; align-items: center; gap: 3mm; margin: 0 0 2mm; padding: 2.5mm 2.5mm 2.5mm 4.2mm; border: .35mm solid #8e9a8b; border-radius: 2.8mm; background: #fbfcfa; color: var(--ink); box-shadow: 0 .6mm 0 #d3d9d0; break-inside: avoid; }
.pick-label { flex: 1 1 auto; min-width: 0; font-family: var(--serif); font-size: 1.05em; line-height: 1.55; }
.pick.is-branch .pick-label { font-family: var(--sans); font-size: 1em; }
.pick-label .need { display: block; margin-top: .6mm; font-family: var(--sans); font-size: .74em; color: #8c3b2e; }
.pick .to { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 1.1mm; min-width: 12mm; height: 7.4mm; padding: 0 2.6mm 0 3.2mm; border-radius: 99px; background: var(--accent); color: #fff; font: 800 .95em var(--sans); }
.pick .to i { font-style: normal; color: #d3e6d7; }
.pick .to-chapter { max-width: 55%; font-size: .85em; }
.pick .to-muted { padding: 0 3mm; background: #eceee9; color: var(--muted); font-size: .8em; font-weight: 600; }
.pick.is-static { box-shadow: none; }
.pick.is-shared { border-style: dashed; background: transparent; }
.pick-group { margin: 0 0 2mm; padding: 2.5mm 2.5mm .5mm 4.2mm; border: .35mm solid #8e9a8b; border-radius: 2.8mm; background: #fbfcfa; box-shadow: 0 .6mm 0 #d3d9d0; break-inside: avoid; }
.pick-group-label { margin-bottom: 2mm; }
.pick-group .pick { background: #fff; box-shadow: none; }
.after { margin-top: 1mm; color: var(--muted); font-size: .95em; }
.after .turn { margin-top: 1.2mm; }
.ending { margin: 7mm 0 2mm; text-align: center; font-family: var(--sans); break-inside: avoid; }
.ending .ornament { display: block; color: var(--accent); font-size: .8em; letter-spacing: 1em; }
.ending small { display: block; margin-top: 1mm; font-weight: 700; letter-spacing: .2em; color: var(--muted); }
.ending b { display: block; margin-top: 1mm; font-family: var(--serif); font-size: 1.3em; }
.interlude-end { margin: 4mm 0 0; padding: 2.5mm 3.5mm; border-radius: 2mm; background: var(--soft); font: .9em var(--sans); color: var(--muted); }

@media screen {
  html { background: #e9ebe6; }
  body { max-width: ${r.width}mm; margin: 0 auto; padding: 0 0 12mm; background: var(--paper); box-shadow: 0 0 0 .3mm #d5d9d1; }
  .cover { width: 100%; }
  .front, main { padding: 12mm 14mm 0; }
}
`}const J=(i,c,t)=>new Promise(r=>{try{i.toBlob(r,c,t)}catch{r(null)}});async function U(i,c,t){let r=0;await Promise.all(Array.from({length:Math.min(c,i.length)},async()=>{for(;r<i.length;){const l=i[r];r+=1,await t(l)}}))}async function le(i,c,t){const r=await oe(i);if(!r?.naturalWidth||!r.naturalHeight)return null;const l=Math.min(1,c/Math.max(r.naturalWidth,r.naturalHeight)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(r.naturalWidth*l)),s.height=Math.max(1,Math.round(r.naturalHeight*l));const h=s.getContext("2d");return h?(t||(h.fillStyle="#fff",h.fillRect(0,0,s.width,s.height)),h.drawImage(r,0,0,s.width,s.height),J(s,t?"image/png":"image/jpeg",.86)):null}async function K(i){await Promise.all([...i.images].map(c=>(c.complete?Promise.resolve():new Promise(t=>{c.addEventListener("load",()=>t(),{once:!0}),c.addEventListener("error",()=>t(),{once:!0})})).then(()=>c.decode?.().catch(()=>{})))),await i.fonts?.ready.catch(()=>{})}async function pe(i,c,t,r){if(r&&!r.closed){r.document.open(),r.document.write(i),r.document.close(),await K(r.document),r.focus(),r.print();return}const l=document.createElement("iframe");l.setAttribute("aria-hidden","true"),l.tabIndex=-1,l.title=c,l.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;pointer-events:none";const s=new Promise(z=>l.addEventListener("load",()=>z(),{once:!0}));l.srcdoc=i,document.body.appendChild(l),await s;const h=l.contentWindow,g=l.contentDocument;if(!h||!g)throw l.remove(),t(),new Error("print frame unavailable");await K(g);const b=document.title;let y=!1;const w=()=>{y||(y=!0,document.title=b,window.setTimeout(()=>{l.remove(),t()},1500))};h.addEventListener("afterprint",w,{once:!0}),window.setTimeout(w,600*1e3),document.title=c,h.focus(),h.print(),document.title=b}async function nt(i,c,t,r){const l=c.uiZh!==!1;if(ae())throw new Error(l?"iOS App 還不能列印 PDF。請用 Safari 或電腦開啟 Larch 再匯出。":"The iOS app cannot print a PDF yet. Open Larch in Safari or on a computer to export.");const s=ie(i,c);if(!s.stats.passages&&!s.chapters.some(u=>u.ai))throw new Error(l?"這份專案還沒有可以印的劇情：先在白板上放一張對話或場景卡。":"There is no story to print yet — add a dialogue or scene card first.");t?.(4);const h=new Map,g=[],b=(u,x)=>{if(!x)return;const $=URL.createObjectURL(x);g.push($),h.set(u,$)},y=[...s.warnings];if(s.illustrations){const u=ne(s),x=ce(s),$=u.length+x.length;let A=0;const j=()=>{A+=1,t?.(4+Math.round(A/Math.max(1,$)*86),{done:A,total:$})},S=1280/Math.max(s.aspect.width,s.aspect.height),V=Math.max(2,Math.round(s.aspect.width*S)),L=Math.max(2,Math.round(s.aspect.height*S)),M=te(i.settings.backgroundShade);let T=0;await U(u,3,async f=>{const v=document.createElement("canvas");v.width=V,v.height=L,await se(v,f,{keepActorsInFrame:i.settings.keepActorsInFrame!==!1,backgroundShade:M}).catch(()=>!1)?b(f.key,await J(v,"image/jpeg",.82)):T+=1,j()}),await U(x,4,async f=>{b(f.url,await le(f.url,f.maxSide,f.transparent).catch(()=>null)),j()}),T&&y.push(l?`有 ${T} 張插圖讀不到角色或背景圖，改印原本的背景（或留白）。`:`${T} illustration(s) could not load their art and fall back to the plain background (or are left out).`)}t?.(94);const w=me(s,{paper:c.paper,images:h}),z=()=>{for(const u of g)URL.revokeObjectURL(u)},W=(s.title||"Larch").replace(/[\\/:*?"<>|]+/g," ").trim()||"Larch";return await pe(w,W,r?()=>{}:z,r),t?.(100),{book:s,warnings:y}}export{nt as exportStoryPdf};
