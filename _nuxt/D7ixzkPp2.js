const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./-fQR6db62.js","./HclGiUj8.js","./Cba6uaGN2.js"])))=>i.map(i=>d[i]);
import{$t as e,Cn as t,Dn as n,Gn as r,Hn as i,Ln as a,On as o,Qt as s,Sn as c,Tn as l,Un as u,Wn as d,Zt as f,_n as p,an as m,dn as h,en as g,in as _,lt as v,qt as y,rn as b,t as x,tn as S,yn as C}from"./D-ErjtRh.js";import{a as w}from"./gVm8Qisk.js";import{t as T}from"./HclGiUj8.js";import{n as E}from"./Cba6uaGN2.js";import{t as D}from"./Dc_0YfmZ2.js";import{n as O,t as k}from"./DTZvaiqj2.js";async function A(e){let t=document.querySelector(`.kecare-sidebar`);if(!t)return;let n=e.querySelectorAll(`h1, h2, h3, h4, h5, h6`),r=[],i=[];for(let e=0;e<n.length;e++){let t=n[e],a=parseInt(t.tagName[1]),o={level:a,element:t,children:[]};for(;i.length>0&&i[i.length-1].level>=a;)i.pop();i.length>0?i[i.length-1].children.push(o):r.push(o),i.push(o)}function a(e,t=!1){let n=``;for(let r of e){let e=r.element,i=e.id||``,o=e.textContent||``,s=t?`toc-sublink`:`toc-link`;n+=`<li class="${t?`toc-subitem`:`toc-item`}">`,n+=`<a class="${s}" data-target="${i}" title="${o}">${o}</a>`,r.children.length>0&&(n+=`<ul class="toc-sublist">`,n+=a(r.children,!0),n+=`</ul>`),n+=`</li>`}return n}t.innerHTML=`<ul class="toc-list">${a(r)}</ul>`;let o=t.querySelectorAll(`a.toc-link, a.toc-sublink`);for(let e=0;e<o.length;e++){let t=o[e];t.addEventListener(`click`,e=>{e.preventDefault();let n=t.dataset.target;if(!n)return;let r=document.getElementById(n);r&&r.scrollIntoView({behavior:`smooth`,block:`start`})})}}var j=`
.kecare h1 {
  font-size: 24px;
}

.kecare {
  position: relative;
}

.kecare-copy-button {
  position: absolute;
  top: -40px;
  right: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #4fc3f7;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kecare-copy-button:hover {
  background: #fff2f6;
}

.kecare-copy-button.success {
  background: rgba(82, 196, 26, 0.12);
  color: #2f9e44;
  border-color: rgba(47, 158, 68, 0.35);
}

.kecare-copy-button.error {
  background: rgba(245, 108, 108, 0.12);
  color: #e03131;
  border-color: rgba(224, 49, 49, 0.35);
}

.kecare-language-switcher {
  position: absolute;
  top: -40px;
  right: 180px;
  z-index: 2;
}

.kecare-language-switcher-button {
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #4fc3f7;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kecare-language-switcher-button:hover {
  background: #fff2f6;
}

.kecare-language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 100px;
}

.kecare-language-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.kecare-language-item:hover {
  background: rgba(79, 195, 247, 0.1);
}

.kecare-language-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
}

.kecare-language-item:hover {
  background: rgba(79, 195, 247, 0.1);
}

.kecare-language-item.active {
  color: #4fc3f7;
  font-weight: 600;
}

.code-copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  background-color: rgb(40, 44, 52);
  color: #abb2bf;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-copy-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.code-copy-button.success {
  background-color: rgba(82, 196, 26, 0.8);
  color: #ffffff;
  border-color: rgba(82, 196, 26, 0.8);
}

.code-copy-button.error {
  background-color: rgba(245, 108, 108, 0.8);
  color: #ffffff;
}
.md-tabs {
  --tabs-border: rgba(169, 169, 169, 0.2);
  --tabs-bg: rgba(255, 255, 255, 0.7);
  --tabs-text: #666;
  --tabs-text-active: #2c3e50;
  --tabs-accent: #ff6b93;
  border: 1px solid var(--tabs-border);
  border-radius: 16px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--tabs-bg);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.md-tabs__nav {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid var(--tabs-border);
  height: 49px;
}

.md-tabs__tab {

  position: relative;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--tabs-text);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 12px 14px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.md-tabs__tab:hover {
  color: var(--tabs-text-active);
}

.md-tabs__tab[aria-selected="true"] {
  color: var(--tabs-text-active);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 10px 10px 0 0;
}

.md-tabs__tab[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -1px;
  height: 2px;
  border-radius: 999px;
  background: var(--tabs-accent);
}

.md-tabs__panels {
   background: rgba(255, 255, 255, 0.7);
   backdrop-filter: blur(10px) saturate(150%);
   -webkit-backdrop-filter: blur(10px) saturate(150%);
}

.md-tabs__panel {
  margin: 0;
  padding: 14px 16px;
  font-size: 1rem;
  line-height: 1.8;
  color: #2c3e50;
}

.md-tabs__panel[hidden] {
  display: none;
}

.md-tabs__panel p {
  margin: 1em 0;
  font-size: 1rem;
  line-height: 1.8;
}

.md-tabs__panel > p:first-child {
  margin-top: 0;
}

.md-tabs__panel > p:last-child {
  margin-bottom: 0;
}

.md-tabs__panel pre {
  margin: 0;
  border-radius: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
}

.md-tabs__panel pre code {
  font-family: inherit;
}
pre.shiki.has-diff code .line {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
}

pre.shiki.has-diff code .line.diff.remove {
  background-color: rgba(239,68,68,0.15);
}
pre.shiki.has-diff code .line.diff.remove::before {
  content: '-';
  font-size: 1em;
  color: rgba(239,68,68,0.8);
  margin-right: 1em;
}
pre.shiki.has-diff code .line.diff.add {
  background-color: rgba(34,197,94,0.15);
}
pre.shiki.has-diff code .line.diff.add::before {
  content: '+';
  font-size: 1em;
  color: rgba(34,197,94,0.8);
  margin-right: 1em;
}
  
/* 给高亮行添加背景色和字体颜色 */
pre.shiki.has-highlighted code .line.highlighted {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(142, 150, 170, .14);
  border-left: 3px solid rgba(253, 253, 150, 0.7);
}

/* 使得高亮的行比其他行更醒目 */
pre.shiki.has-highlighted code .line.highlighted:hover {
  background-color: rgba(253, 253, 150, 0.5);
}

/* 默认状态：聚焦行清晰，其他行模糊 */
pre.shiki.has-focused code .line {
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  filter: blur(0.07rem);
  opacity: 0.35;
}

/* 聚焦行：保持清晰显示 */
pre.shiki.has-focused code .line.focused {
  filter: none;
  opacity: 1; 
  background-color: rgba(66, 153, 225, 0.12);
  border-left: 3px solid rgba(66, 153, 225, 0.6);
}

/* 鼠标悬停时：取消所有行的模糊效果 */
pre.shiki.has-focused code:hover .line {
  filter: none; 
  opacity: 1;
}

/* 鼠标悬停时，聚焦行样式仍然有效 */
pre.shiki.has-focused code .line.focused:hover {
  background-color: rgba(66, 153, 225, 0.22);
}

/* 鼠标悬停时，非聚焦行也会变清晰 */
pre.shiki.has-focused code .line:not(.focused):hover {
  filter: none;
  opacity: 1;
}


`;async function M(){let e=document.createElement(`style`);e.textContent=j,document.head.appendChild(e)}async function ee(e){let t=e.querySelectorAll(`pre > code`),{codeToHtml:n}=await T(async()=>{let{codeToHtml:e}=await import(`./-fQR6db62.js`);return{codeToHtml:e}},__vite__mapDeps([0,1]),import.meta.url),{transformerNotationDiff:r,transformerNotationFocus:i}=await T(async()=>{let{transformerNotationDiff:e,transformerNotationFocus:t}=await import(`./Cba6uaGN2.js`).then(e=>e.t);return{transformerNotationDiff:e,transformerNotationFocus:t}},__vite__mapDeps([2,0,1]),import.meta.url);for(let e of t){let t=e.className.split(` `).find(e=>e.startsWith(`language-`)),a=t?t.replace(`language-`,``):`text`,o=e.textContent||``,s=``;try{s=await n(o,{lang:a,theme:`one-dark-pro`,transformers:[r({matchAlgorithm:`v3`}),i({matchAlgorithm:`v3`}),E({matchAlgorithm:`v3`})]})}catch{s=await n(o,{lang:`text`,theme:`one-dark-pro`,transformers:[r({matchAlgorithm:`v3`}),i({matchAlgorithm:`v3`}),E({matchAlgorithm:`v3`})]})}let c=document.createElement(`div`);c.innerHTML=s;let l=c.firstElementChild;if(!l)continue;let u=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,d=document.createElement(`button`);d.className=`code-copy-button`,d.innerHTML=u,d.type=`button`,d.addEventListener(`click`,async()=>{try{await navigator.clipboard.writeText(o),d.innerHTML=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,d.classList.add(`success`),setTimeout(()=>{d.innerHTML=u,d.classList.remove(`success`)},2e3)}catch{d.innerHTML=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,d.classList.add(`error`),setTimeout(()=>{d.innerHTML=u,d.classList.remove(`error`)},2e3)}}),l instanceof HTMLElement&&(l.style.position=`relative`,l.setAttribute(`data-lang`,(a||`text`).toLowerCase()),l.appendChild(d));let f=e.parentElement;f&&f.tagName===`PRE`?f.replaceWith(l):e.replaceWith(l)}}async function N(e){let t=e.querySelectorAll(`[data-tabs]`);for(let e of t){let t=e.querySelectorAll(`.md-tabs__tab`),n=e.querySelectorAll(`.md-tabs__panel`);for(let e=0;e<t.length;e++){let r=t[e];r&&r.addEventListener(`click`,()=>{for(let e of t)e.ariaSelected=`false`,e.classList.remove(`md-tabs__tab--active`);r.ariaSelected=`true`,r.classList.add(`md-tabs__tab--active`);for(let e of n)e.ariaHidden=`true`,e.setAttribute(`hidden`,``);let i=n[e];i&&(i.ariaHidden=`false`,i.removeAttribute(`hidden`))})}}}async function P(e,t,n,r=`/articles`){if(!e||!t||!n)return;let i=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,a=e.querySelector(`.kecare-copy-button`);a&&a.remove();let o=document.createElement(`button`);o.className=`kecare-copy-button`,o.innerHTML=`${i}<span>复制 Markdown</span>`,o.type=`button`,o.setAttribute(`aria-label`,`复制 Markdown`),o.title=`复制 Markdown`,o.addEventListener(`click`,async()=>{try{let e=n.match(/\/([a-z]{2}-[A-Z]{2})\//),a=e?e[1]:`zh-CN`,s=`${r.replace(/\/$/,``)}/${t}.${a}.json`,c=await fetch(s);if(!c.ok)throw Error(`Failed to fetch: ${c.status}`);let l=(await c.json()).content;await navigator.clipboard.writeText(l),o.innerHTML=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>复制成功了喵</span>`,o.classList.add(`success`),setTimeout(()=>{o.innerHTML=`${i}<span>复制 Markdown</span>`,o.classList.remove(`success`)},2e3)}catch{o.innerHTML=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>复制失败了喵</span>`,o.classList.add(`error`),setTimeout(()=>{o.innerHTML=`${i}<span>复制 Markdown</span>`,o.classList.remove(`error`)},2e3)}}),e.appendChild(o)}async function F(e,t,n,r=`/articles`){if(!e||!t||!n)return;let i=e.querySelector(`.kecare-language-switcher`);i&&i.remove();let a=n.match(/\/([a-z]{2}-[A-Z]{2})\//),o=a?a[1]:`zh-CN`,s=document.createElement(`div`);s.className=`kecare-language-switcher`;let c=document.createElement(`button`);c.className=`kecare-language-switcher-button`,c.innerHTML=`<svg width="18" height="18" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M192 64C209.7 64 224 78.3 224 96L224 128L352 128C369.7 128 384 142.3 384 160C384 177.7 369.7 192 352 192L342.4 192L334 215.1C317.6 260.3 292.9 301.6 261.8 337.1C276 345.9 290.8 353.7 306.2 360.6L356.6 383L418.8 243C423.9 231.4 435.4 224 448 224C460.6 224 472.1 231.4 477.2 243L605.2 531C612.4 547.2 605.1 566.1 589 573.2C572.9 580.3 553.9 573.1 546.8 557L526.8 512L369.3 512L349.3 557C342.1 573.2 323.2 580.4 307.1 573.2C291 566 283.7 547.1 290.9 531L330.7 441.5L280.3 419.1C257.3 408.9 235.3 396.7 214.5 382.7C193.2 399.9 169.9 414.9 145 427.4L110.3 444.6C94.5 452.5 75.3 446.1 67.4 430.3C59.5 414.5 65.9 395.3 81.7 387.4L116.2 370.1C132.5 361.9 148 352.4 162.6 341.8C148.8 329.1 135.8 315.4 123.7 300.9L113.6 288.7C102.3 275.1 104.1 254.9 117.7 243.6C131.3 232.3 151.5 234.1 162.8 247.7L173 259.9C184.5 273.8 197.1 286.7 210.4 298.6C237.9 268.2 259.6 232.5 273.9 193.2L274.4 192L64.1 192C46.3 192 32 177.7 32 160C32 142.3 46.3 128 64 128L160 128L160 96C160 78.3 174.3 64 192 64zM448 334.8L397.7 448L498.3 448L448 334.8z" fill="currentColor"/></svg>`,c.type=`button`,c.setAttribute(`aria-label`,`切换语言`),c.title=`切换语言`;let l=document.createElement(`div`);l.className=`kecare-language-dropdown`,l.style.display=`none`;for(let e of[{code:`zh-CN`,label:`中文`},{code:`en-US`,label:`English`},{code:`zh-TW`,label:`繁体中文`},{code:`ja-JP`,label:`日本語`}]){let n=document.createElement(`a`);n.className=`kecare-language-item`,n.textContent=e.label,n.dataset.lang=e.code,n.href=`${r.replace(/\/$/,``)}/${e.code}/${t}`,e.code===o&&n.classList.add(`active`),l.appendChild(n)}c.addEventListener(`click`,e=>{e.stopPropagation();let t=l.style.display===`block`;l.style.display=t?`none`:`block`}),document.addEventListener(`click`,()=>{l.style.display=`none`}),l.addEventListener(`click`,e=>{e.stopPropagation()}),s.appendChild(c),s.appendChild(l),e.appendChild(s)}var I=null;async function L(){if(typeof window>`u`||typeof document>`u`)return;await M();let e=new Promise(e=>{document.readyState===`complete`?e(void 0):window.addEventListener(`load`,e,{once:!0})});return{mounted:async(t,n)=>{await e;let r=document.querySelector(`.kecare`);await P(r,t,n),await F(r,t,n),await A(r),await N(r),await ee(r)}}}function R(){return I||=L(),I}var z={},B={class:`toc`};function V(e,t){return C(),S(`section`,B,[...t[0]||=[s(`h3`,{class:`toc-title`},`目录喵`,-1),s(`div`,{class:`kecare-sidebar`},null,-1)]])}var H=Object.assign(x(z,[[`render`,V]]),{__name:`ThemeSidebarTocCard`}),U={key:1,class:`side-nav-group`},W=[`onClick`],G={class:`side-nav-group-title`},K=Object.assign(x(m({name:`SidebarNavTree`,__name:`Sidebar-navtree`,props:{items:{},level:{default:0}},setup(n){let i=n,p=w(),m=a(new Set),h=e=>`link`in e;function _(e){if(p.path===e)return!0;let t=e.replace(/^\.\//,``);return t?p.path.endsWith(`/${t}`):!1}let v=f(()=>`padding-left: ${i.level*12}px;`);function x(e){return h(e)?`l:${e.link}`:`g:${e.text}:${i.level}`}function T(e){return h(e)?_(e.link):!e.items||e.items.length===0?!1:e.items.some(e=>T(e))}function E(e){return h(e)?!0:m.value.has(x(e))}function O(e){if(h(e))return;let t=x(e);m.value.has(t)?m.value.delete(t):m.value.add(t)}function k(e,t){for(let n of e)!h(n)&&T(n)&&(t.add(x(n)),n.items&&n.items.length>0&&k(n.items,t))}function A(){let e=new Set;k(i.items,e),m.value=e}return l(()=>p.path,A,{immediate:!0}),l(()=>i.items,A,{immediate:!0,deep:!0}),(n,a)=>{let l=D,f=t(`SidebarNavTree`);return C(),S(`ul`,{class:`side-nav`,style:d(v.value)},[(C(!0),S(y,null,c(i.items,t=>(C(),S(`li`,{key:x(t),class:`side-nav-item`},[h(t)?(C(),e(l,{key:0,class:u([`side-nav-link`,{active:_(t.link)}]),to:t.link},{default:o(()=>[b(r(t.text),1)]),_:2},1032,[`class`,`to`])):(C(),S(`div`,U,[s(`div`,{class:`side-nav-group-header`,onClick:e=>O(t)},[s(`span`,G,r(t.text),1),s(`span`,{class:u([`side-nav-toggle-icon`,{expanded:E(t)}])},[...a[0]||=[s(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`currentColor`},[s(`path`,{d:`M6 4l4 4-4 4V4z`})],-1)]],2)],8,W),s(`div`,{class:u([`side-nav-group-content`,{collapsed:!E(t)}])},[t.items&&t.items.length>0?(C(),e(f,{key:0,items:t.items,level:i.level+1},null,8,[`items`,`level`])):g(``,!0)],2)]))]))),128))],4)}}}),[[`__scopeId`,`data-v-6139810f`]]),{__name:`ThemeSidebarNavtree`}),q={class:`flex flex-col`},J={class:`layout max-w-[1600px] mx-auto pt-[300px] px-[16px] flex flex-wrap items-start gap-[30px] max-[960px]:flex-col max-[960px]:flex-nowrap max-[960px]:gap-[20px]`},te={key:0,class:`sidebar flex-none w-[240px] max-w-[240px] sticky top-[85px] h-fit bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-[18px] px-[16px] max-[960px]:hidden`},Y={class:`sidebar-list max-h-[calc(100vh-140px)] overflow-auto pr-[6px]`},X={key:1,class:`sidebar-empty text-[#7a7a7a] dark:text-gray-400 text-[0.95rem] px-[6px] py-[10px]`},Z={class:`main-container flex flex-1 min-w-0 w-full gap-[30px] flex-col md:flex-row`},Q={class:`article flex-1 p-0`},ne={class:`post bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[40px] max-[768px]:p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[30px]`},re=[`innerHTML`],ie={class:`post-copyright relative mt-[40px] mb-[10px] p-[20px] border border-[#eee] dark:border-gray-600 rounded-[12px] bg-white/80 dark:bg-gray-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-[#87ceeb] before:rounded-l-[4px]`},ae={class:`post-copyright-author`},oe={class:`post-copyright-info`},$={class:`post-copyright-type`},se={class:`post-copyright-info`},ce=[`href`],le={class:`tags-shares flex justify-between items-center my-[30px] w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px]`},ue={class:`post-tag-list flex flex-wrap gap-[10px]`},de={key:0},fe={class:`aside flex-none w-[280px] max-w-[280px] sticky top-[65px] h-fit max-[960px]:order-3 hidden md:block`},pe=Object.assign(x(m({__name:`article-theme`,props:{article:{},navItems:{}},async setup(t){let a,l,u=([a,l]=n(()=>R()),a=await a,l(),a),m=v();p(async()=>{await h(),await u.mounted(x.article.hash,m.path),console.log(m.path)});let x=t;function w(e){return e?e.replace(/<\/?[^>]+(>|$)/g,` `).replace(/\s+/g,` `).trim():``}function T(e){if(!e)return 0;let t=e.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);return t?t.length:0}function E(e,t){let n={wordsPerMinute:200,round:`round`,imageSeconds:12,codeWordsMultiplier:.6,minMinutes:0,...t},r=/```[\s\S]*?```|<pre[\s\S]*?<\/pre>/gi,i=0,a=e.match(r);if(a)for(let e of a){let t=w(e).replace(/[`]/g,` `);i+=T(t)}let o=e.replace(r,` `),s=o.match(/<img\b[^>]*>/gi),c=s?s.length:0,l=T(w(o)),u=Math.round(l+i*n.codeWordsMultiplier),d=u/(n.wordsPerMinute/60),f=c*n.imageSeconds,p=Math.max(0,Math.round(d+f)),m=p/60,h;return h=n.round===`ceil`?Math.ceil(m):n.round===`floor`?Math.floor(m):Math.round(m),h<n.minMinutes&&(h=Math.max(0,Math.floor(n.minMinutes))),{words:u,timeSeconds:p,minutesFloat:m,minutes:h,wordsPerMinute:n.wordsPerMinute,images:c}}function A(e){return e.minutes<=0?`少于 1 分钟`:e.minutes===1?`1 分钟`:`约 ${e.minutes} 分钟`}let j=f(()=>E(x.article.html,{wordsPerMinute:220,round:`ceil`}));return f(()=>A(j.value)),f(()=>j.value.words),(t,n)=>{let a=D;return C(),S(y,null,[s(`div`,q,[_(O)]),s(`div`,{class:`post-bg fixed inset-0 -z-[999] bg-no-repeat bg-center bg-cover`,style:d({"background-image":`url(${i(k)})`})},null,4),s(`div`,J,[x.navItems===null?g(``,!0):(C(),S(`aside`,te,[_(a,{class:`sidebar-title block mx-auto text-[1.1rem] font-extrabold text-[#4fc3f7] no-underline mb-[12px] px-[10px] py-[6px] rounded-[10px] bg-[rgba(79,195,247,0.10)] border border-[rgba(79,195,247,0.18)]`,to:`/`},{default:o(()=>[...n[0]||=[b(`我是小菜单喵 `,-1)]]),_:1}),s(`div`,Y,[x.navItems?.length?(C(),e(K,{key:0,items:x.navItems},null,8,[`items`])):(C(),S(`div`,X,` 暂无目录喵~ `))])])),s(`div`,Z,[s(`div`,Q,[s(`div`,ne,[s(`div`,{class:`article-content leading-[1.8] [overflow-wrap:anywhere] break-words [&_h1]:mt-[1.5em] [&_h1]:mb-[0.5em] [&_h1]:text-[#2c3e50] dark:[&_h1]:text-gray-100 [&_h2]:mt-[1.5em] [&_h2]:mb-[0.5em] [&_h2]:text-[#2c3e50] dark:[&_h2]:text-gray-100 [&_h3]:mt-[1.5em] [&_h3]:mb-[0.5em] [&_h3]:text-[#2c3e50] dark:[&_h3]:text-gray-100`,ref:`articleRef`,innerHTML:x.article.html},null,8,re),s(`div`,ie,[s(`div`,ae,[n[1]||=s(`span`,{class:`post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]`},`文章作者:`,-1),s(`span`,oe,r(x.article.frontMatter.author),1)]),s(`div`,$,[n[2]||=s(`span`,{class:`post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]`},`文章链接:`,-1),s(`span`,se,[s(`a`,{class:`text-[#3498db] no-underline hover:underline`,href:`https://www.kecare.me/articles/${x.article.hash} `,targe:`_blank`,rel:`noopener noreferrer`},`kecare.me`+r(i(m).path),9,ce)])]),n[3]||=s(`div`,{class:`post-copyright-notice`},[s(`span`,{class:`post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]`},`版权声明:`),s(`span`,{class:`post-copyright-info`},[b(` 博客所有文章除特别声明外，均采用 `),s(`a`,{class:`text-[#3498db] no-underline hover:underline`,href:`https://creativecommons.org/licenses/by-nc-sa/4.0/`},` CC BY-NC-SA 4.0 `),b(` 许可协议。转载请注明来源 `)])],-1)]),s(`div`,le,[s(`div`,ue,[x.article.frontMatter.tags.length===0?(C(),S(`span`,de,`作者很懒，本文没有添加标签喵~ `)):(C(!0),S(y,{key:1},c(x.article.frontMatter.tags,t=>(C(),e(a,{key:t,to:`/archives?tag=`+encodeURIComponent(t),class:`post-tag bg-[#87ceeb] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem] hover:bg-[#4fc3f7] transition-colors duration-300`},{default:o(()=>[b(r(t),1)]),_:2},1032,[`to`]))),128))])]),n[4]||=s(`hr`,{class:`post-hr my-[40px] h-[2px] w-full border-0 bg-gradient-to-r from-transparent via-[#e1f5fe] to-transparent`},null,-1)])]),s(`aside`,fe,[_(H)])])])],64)}}}),[[`__scopeId`,`data-v-75f09dea`]]),{__name:`ThemeArticleTheme`});export{pe as t};