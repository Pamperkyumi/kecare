const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DfGNfAIv.js","./Jzb9kTVp.js","./entry.BXMILXV8.css"])))=>i.map(i=>d[i]);
import{_ as V,N as te}from"./bSLKK6I6.js";import{N as R,_ as I,o as x,a as k,b as u,d as W,g as F,F as q,r as ne,k as S,O as oe,z as re,c as N,w as C,i as _,t as v,P as se,j as K,Q as ae,e as ie,n as le,h as L,u as E,R as ce}from"./Jzb9kTVp.js";async function de(s){const i=document.querySelector(".kecare-sidebar");if(!i)return;const l=s.querySelectorAll("h1, h2, h3, h4, h5, h6"),a=[],o=[];for(let d=0;d<l.length;d++){const n=l[d],f=parseInt(n.tagName[1]),p={level:f,element:n,children:[]};for(;o.length>0&&o[o.length-1].level>=f;)o.pop();o.length>0?o[o.length-1].children.push(p):a.push(p),o.push(p)}function c(d,n=!1){let f="";for(const p of d){const r=p.element,e=r.id||"",h=r.textContent||"",g=n?"toc-sublink":"toc-link";f+=`<li class="${n?"toc-subitem":"toc-item"}">`,f+=`<a class="${g}" data-target="${e}" title="${h}">${h}</a>`,p.children.length>0&&(f+='<ul class="toc-sublist">',f+=c(p.children,!0),f+="</ul>"),f+="</li>"}return f}const m=`<ul class="toc-list">${c(a)}</ul>`;i.innerHTML=m;const t=i.querySelectorAll("a.toc-link, a.toc-sublink");for(let d=0;d<t.length;d++){const n=t[d];n.addEventListener("click",f=>{f.preventDefault();const p=n.dataset.target;if(!p)return;const r=document.getElementById(p);r&&r.scrollIntoView({behavior:"smooth",block:"start"})})}}const pe=`
.kecare h1 {
  font-size: 24px;
}

.kecare {
  position: relative;
}

.kecare-copy-button {
  position: absolute;
  top: -42px;
  right: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #ff6b93;
  border: 1px solid #ffd2dc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 11;
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


`;async function fe(){const s=document.createElement("style");s.textContent=pe,document.head.appendChild(s)}const ue=[[/^(<!--)(.+)(-->)$/,!1],[/^(\/\*)(.+)(\*\/)$/,!1],[/^(\/\/|["'#]|;{1,2}|%{1,2}|--)(.*)$/,!0],[/^(\*)(.+)$/,!0]];function he(s,i,l){const a=[];for(const o of s){if(l==="v3"){const t=o.children.flatMap((d,n)=>{if(d.type!=="element")return d;const f=d.children[0];if(f.type!=="text")return d;const p=n===o.children.length-1;if(!$(f.value,p))return d;const r=f.value.split(/(\s+\/\/)/);if(r.length<=1)return d;let e=[r[0]];for(let h=1;h<r.length;h+=2)e.push(r[h]+(r[h+1]||""));return e=e.filter(Boolean),e.length<=1?d:e.map(h=>({...d,children:[{type:"text",value:h}]}))});t.length!==o.children.length&&(o.children=t)}const c=o.children;let m=c.length-1;l==="v1"?m=0:i&&(m=c.length-2);for(let t=Math.max(m,0);t<c.length;t++){const d=c[t];if(d.type!=="element")continue;const n=d.children.at(0);if(n?.type!=="text")continue;const f=t===c.length-1;let p=$(n.value,f),r;if(!p&&t>0&&n.value.trim().startsWith("[!code")){const e=c[t-1];if(e?.type==="element"){const h=e.children.at(0);if(h?.type==="text"&&h.value.includes("//")){const g=$(h.value+n.value,f);if(g){p=g,a.push({info:g,line:o,token:e,isLineCommentOnly:c.length===2&&e.children.length===1&&d.children.length===1,isJsxStyle:!1,additionalTokens:[d]});continue}}}}if(p)if(i&&!f&&t!==0){const e=D(c[t-1],"{")&&D(c[t+1],"}");a.push({info:p,line:o,token:d,isLineCommentOnly:c.length===3&&d.children.length===1,isJsxStyle:e,additionalTokens:r})}else a.push({info:p,line:o,token:d,isLineCommentOnly:c.length===1&&d.children.length===1,isJsxStyle:!1,additionalTokens:r})}}return a}function D(s,i){if(s.type!=="element")return!1;const l=s.children[0];return l.type!=="text"?!1:l.value.trim()===i}function $(s,i){let l=s.trimStart();const a=s.length-l.length;l=l.trimEnd();const o=s.length-l.length-a;for(const[c,m]of ue){if(m&&!i)continue;const t=c.exec(l);if(t)return[" ".repeat(a)+t[1],t[2],t[3]?t[3]+" ".repeat(o):void 0]}}function me(s){const i=s.match(/(?:\/\/|["'#]|;{1,2}|%{1,2}|--)(\s*)$/);return i&&i[1].trim().length===0?s.slice(0,i.index):s}function J(s,i,l,a){return a==null&&(a="v3"),{name:s,code(o){const c=o.children.filter(n=>n.type==="element"),m=[];o.data??={};const t=o.data;t._shiki_notation??=he(c,["jsx","tsx"].includes(this.options.lang),a);const d=t._shiki_notation;for(const n of d){if(n.info[1].length===0)continue;let f=c.indexOf(n.line);n.isLineCommentOnly&&a!=="v1"&&f++;let p=!1;if(n.info[1]=n.info[1].replace(i,(...e)=>l.call(this,e,n.line,n.token,c,f)?(p=!0,""):e[0]),!p)continue;a==="v1"&&(n.info[1]=me(n.info[1]));const r=n.info[1].trim().length===0;if(r&&(n.info[1]=""),r&&n.isLineCommentOnly)m.push(n.line);else if(r&&n.isJsxStyle)n.line.children.splice(n.line.children.indexOf(n.token)-1,3);else if(r){if(n.additionalTokens)for(let e=n.additionalTokens.length-1;e>=0;e--){const h=n.additionalTokens[e],g=n.line.children.indexOf(h);g!==-1&&n.line.children.splice(g,1)}n.line.children.splice(n.line.children.indexOf(n.token),1)}else{const e=n.token.children[0];if(e.type==="text"&&(e.value=n.info.join(""),n.additionalTokens))for(const h of n.additionalTokens){const g=h.children[0];g?.type==="text"&&(g.value="")}}}for(const n of m){const f=o.children.indexOf(n),p=o.children[f+1];let r=1;p?.type==="text"&&p?.value===`
`&&(r=2),o.children.splice(f,r)}}}}function ge(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function H(s={},i="@shikijs/transformers:notation-map"){const{classMap:l={},classActivePre:a=void 0,classActiveCode:o=void 0}=s;return J(i,new RegExp(`#?\\s*\\[!code (${Object.keys(l).map(ge).join("|")})(:\\d+)?\\]`,"gi"),function([c,m,t=":1"],d,n,f,p){const r=Number.parseInt(t.slice(1),10);for(let e=p;e<Math.min(p+r,f.length);e++)this.addClassToHast(f[e],l[m]);return a&&this.addClassToHast(this.pre,a),o&&this.addClassToHast(this.code,o),!0},s.matchAlgorithm)}function be(s={}){const{classLineAdd:i="diff add",classLineRemove:l="diff remove",classActivePre:a="has-diff",classActiveCode:o}=s;return H({classMap:{"++":i,"--":l},classActivePre:a,classActiveCode:o,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-diff")}function xe(s={}){const{classActiveLine:i="focused",classActivePre:l="has-focused",classActiveCode:a}=s;return H({classMap:{focus:i},classActivePre:l,classActiveCode:a,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-focus")}function j(s={}){const{classActiveLine:i="highlighted",classActivePre:l="has-highlighted",classActiveCode:a}=s;return H({classMap:{highlight:i,hl:i},classActivePre:l,classActiveCode:a,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-highlight")}const ve=Object.freeze(Object.defineProperty({__proto__:null,createCommentNotationTransformer:J,transformerNotationDiff:be,transformerNotationFocus:xe,transformerNotationHighlight:j,transformerNotationMap:H},Symbol.toStringTag,{value:"Module"}));async function ke(s){const i=s.querySelectorAll("code"),{codeToHtml:l}=await R(async()=>{const{codeToHtml:c}=await import("./DfGNfAIv.js");return{codeToHtml:c}},__vite__mapDeps([0,1,2]),import.meta.url),{transformerNotationDiff:a,transformerNotationFocus:o}=await R(async()=>{const{transformerNotationDiff:c,transformerNotationFocus:m}=await Promise.resolve().then(()=>ve);return{transformerNotationDiff:c,transformerNotationFocus:m}},void 0,import.meta.url);for(const c of i){const t=c.className.split(" ").find(M=>M.startsWith("language-")),d=t?t.replace("language-",""):"text",n=c.textContent||"";let f="";try{f=await l(n,{lang:d,theme:"one-dark-pro",transformers:[a({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),j({matchAlgorithm:"v3"})]})}catch{f=await l(n,{lang:"text",theme:"one-dark-pro",transformers:[a({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),j({matchAlgorithm:"v3"})]})}const p=document.createElement("div");p.innerHTML=f;const r=p.firstElementChild;if(!r)continue;const e='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',h='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',g='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',b=document.createElement("button");b.className="code-copy-button",b.innerHTML=e,b.type="button",b.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(n),b.innerHTML=h,b.classList.add("success"),setTimeout(()=>{b.innerHTML=e,b.classList.remove("success")},2e3)}catch{b.innerHTML=g,b.classList.add("error"),setTimeout(()=>{b.innerHTML=e,b.classList.remove("error")},2e3)}}),r instanceof HTMLElement&&(r.style.position="relative",r.setAttribute("data-lang",(d||"text").toLowerCase()),r.appendChild(b));const y=c.parentElement;y&&y.tagName==="PRE"?y.replaceWith(r):c.replaceWith(r)}}async function _e(s){const i=s.querySelectorAll("[data-tabs]");for(const l of i){const a=l.querySelectorAll(".md-tabs__tab"),o=l.querySelectorAll(".md-tabs__panel");for(let c=0;c<a.length;c++){const m=a[c];m&&m.addEventListener("click",()=>{for(const d of a)d.ariaSelected="false",d.classList.remove("md-tabs__tab--active");m.ariaSelected="true",m.classList.add("md-tabs__tab--active");for(const d of o)d.ariaHidden="true",d.setAttribute("hidden","");const t=o[c];t&&(t.ariaHidden="false",t.removeAttribute("hidden"))})}}}async function ye(s,i){if(!s)return;const l=i?.trim();if(!l)return;const a='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',o='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',c='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',m=s.querySelector(".kecare-copy-button");m&&m.remove();const t=document.createElement("button");t.className="kecare-copy-button",t.innerHTML=`${a}<span>复制 Markdown</span>`,t.type="button",t.setAttribute("aria-label","复制 Markdown"),t.title="复制 Markdown",t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(l),t.innerHTML=`${o}<span>复制成功了喵</span>`,t.classList.add("success"),setTimeout(()=>{t.innerHTML=`${a}<span>复制 Markdown</span>`,t.classList.remove("success")},2e3)}catch{t.innerHTML=`${c}<span>复制失败了喵</span>`,t.classList.add("error"),setTimeout(()=>{t.innerHTML=`${a}<span>复制 Markdown</span>`,t.classList.remove("error")},2e3)}}),s.appendChild(t)}let A=null;async function we(){if(typeof window>"u"||typeof document>"u")return;await fe();const s=new Promise(l=>{document.readyState==="complete"?l(void 0):window.addEventListener("load",l,{once:!0})});return{mounted:async l=>{await s;const a=document.querySelector(".kecare");await ye(a,l),await de(a),await _e(a),await ke(a)}}}function Le(){return A||(A=we()),A}const Me={},Ce={class:"toc"};function Te(s,i){return x(),k("section",Ce,[...i[0]||(i[0]=[u("h3",{class:"toc-title"},"目录喵",-1),u("div",{class:"kecare-sidebar"},null,-1)])])}const Se=Object.assign(I(Me,[["render",Te]]),{__name:"ThemeSidebarTocCard"}),He={key:1,class:"side-nav-group"},Ee={class:"side-nav-group-title"},$e=W({name:"SidebarNavTree",__name:"Sidebar-navtree",props:{items:{},level:{default:0}},setup(s){const i=s,l=oe(),a=t=>"link"in t;function o(t){return l.path===t}const c=S(()=>`padding-left: ${i.level*12}px;`);function m(t){return a(t)?`l:${t.link}`:`g:${t.text}:${i.level}`}return(t,d)=>{const n=V,f=re("SidebarNavTree");return x(),k("ul",{class:"side-nav",style:F(c.value)},[(x(!0),k(q,null,ne(i.items,p=>(x(),k("li",{key:m(p),class:"side-nav-item"},[a(p)?(x(),N(n,{key:0,class:se(["side-nav-link",{active:o(p.link)}]),to:p.link},{default:C(()=>[_(v(p.text),1)]),_:2},1032,["class","to"])):(x(),k("div",He,[u("span",Ee,v(p.text),1),p.items&&p.items.length>0?(x(),N(f,{key:0,items:p.items,level:i.level+1},null,8,["items","level"])):K("",!0)]))]))),128))],4)}}}),Ae=Object.assign(I($e,[["__scopeId","data-v-549dac1d"]]),{__name:"ThemeSidebarNavtree"}),Ne=""+new URL("bg2.CiBeC1pP.webp",import.meta.url).href,je={class:"flex flex-col"},Ie={class:"layout max-w-[1600px] mx-auto pt-[100px] px-[16px] flex flex-wrap items-start gap-[30px] max-[960px]:flex-col max-[960px]:flex-nowrap max-[960px]:gap-[20px]"},Pe={class:"hero w-full flex items-center justify-center min-h-[30vh] max-[960px]:min-h-[38vh]"},Oe={class:"post-info text-center"},Be={class:"post-title text-[2.4rem] max-[768px]:text-[1.9rem] font-bold text-[#2c3e50] leading-tight"},ze={class:"first-line mt-[10px] flex flex-wrap items-center justify-center gap-[8px] text-[0.95rem] text-[#666]"},Re={class:"post-created"},De={class:"word-count"},Ve={class:"reading-time"},We={class:"post-languages inline-flex items-center gap-[20px] text-[20px] leading-none mt-[12px]"},Fe={key:0,class:"sidebar flex-none w-[240px] max-w-[240px] sticky top-[85px] h-fit bg-white/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-[18px] px-[16px] max-[960px]:hidden"},qe={class:"sidebar-list max-h-[calc(100vh-140px)] overflow-auto pr-[6px]"},Ke={key:1,class:"sidebar-empty text-[#7a7a7a] text-[0.95rem] px-[6px] py-[10px]"},Je={class:"main-container flex flex-1 min-w-0 w-full gap-[30px] flex-col md:flex-row"},Ue={class:"article flex-1 p-0"},Ye={class:"post bg-white/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] rounded-[16px] p-[40px] max-[768px]:p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[30px]"},Ze=["innerHTML"],Qe={class:"post-copyright relative mt-[40px] mb-[10px] p-[20px] border border-[#eee] rounded-[12px] bg-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-[#ff9eb0] before:rounded-l-[4px]"},Ge={class:"post-copyright-author"},Xe={class:"post-copyright-info"},et={class:"post-copyright-type"},tt={class:"post-copyright-info"},nt=["href"],ot={class:"aside flex-none w-[280px] max-w-[280px] sticky top-[65px] h-fit max-[960px]:order-3"},rt=W({__name:"article-theme",props:{article:{},navItems:{}},async setup(s){let i,l;const a=([i,l]=ae(()=>Le()),i=await i,l(),i);ie(async()=>{await le(),await a.mounted(o.article.rawMarkdown)});const o=s;t(o.article.html,{wordsPerMinute:220,round:"ceil"});function c(r){if(!r)return{text:"",images:0};const e=r.match(/<img\b[^>]*>/gi),h=e?e.length:0;return{text:r.replace(/<\/?[^>]+(>|$)/g," ").replace(/\s+/g," ").trim(),images:h}}function m(r){if(!r)return 0;const e=r.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);return e?e.length:0}function t(r,e){const h={wordsPerMinute:200,round:"round",imageSeconds:12,codeWordsMultiplier:.6,minMinutes:0,...e},{text:g,images:b}=c(r),y=/```[\s\S]*?```|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi;let M=0,P=g;const O=r.match(y);if(O){for(const X of O){const ee=X.replace(/<\/?[^>]+(>|$)/g," ").replace(/[`]/g," ");M+=m(ee)}const G=r.replace(y," ");P=c(G).text}const U=m(P),B=Math.round(U+M*h.codeWordsMultiplier),Y=h.wordsPerMinute/60,Z=B/Y,Q=b*h.imageSeconds,z=Math.max(0,Math.round(Z+Q)),T=z/60;let w;return h.round==="ceil"?w=Math.ceil(T):h.round==="floor"?w=Math.floor(T):w=Math.round(T),w<h.minMinutes&&(w=Math.max(0,Math.floor(h.minMinutes))),{words:B,timeSeconds:z,minutesFloat:T,minutes:w,wordsPerMinute:h.wordsPerMinute,images:b}}function d(r){return r.minutes<=0?"少于 1 分钟":r.minutes===1?"1 分钟":`约 ${r.minutes} 分钟`}const n=S(()=>t(o.article.html,{wordsPerMinute:220,round:"ceil"})),f=S(()=>d(n.value)),p=S(()=>n.value.words);return(r,e)=>{const h=V;return x(),k(q,null,[u("div",je,[L(te)]),u("div",{class:"post-bg fixed inset-0 -z-[999] bg-no-repeat bg-center bg-cover",style:F({"background-image":`url(${E(Ne)})`})},null,4),u("div",Ie,[u("div",Pe,[u("div",Oe,[u("h1",Be,v(o.article.title),1),u("div",ze,[u("span",Re,"发布于: "+v(o.article.date),1),e[0]||(e[0]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),u("span",De,"总字数:"+v(E(p)),1),e[1]||(e[1]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),u("span",Ve,"阅读时长: "+v(E(f)),1)]),u("span",We,[L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/en-US/${o.article.hash}`},{default:C(()=>[...e[2]||(e[2]=[_("English",-1)])]),_:1},8,["to"]),e[5]||(e[5]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/zh-CN/${o.article.hash}`},{default:C(()=>[...e[3]||(e[3]=[_("简体中文",-1)])]),_:1},8,["to"]),e[6]||(e[6]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/ja-JP/${o.article.hash}`},{default:C(()=>[...e[4]||(e[4]=[_("日本語",-1)])]),_:1},8,["to"])])])]),o.navItems!==null?(x(),k("aside",Fe,[L(h,{class:"sidebar-title inline-block text-[1.1rem] font-extrabold text-[#ff6b93] no-underline mb-[12px] px-[10px] py-[6px] rounded-[10px] bg-[rgba(255,107,147,0.10)] border border-[rgba(255,107,147,0.18)] transition-transform duration-200 hover:-translate-y-[1px] hover:bg-[rgba(255,107,147,0.14)]",to:"/"},{default:C(()=>[...e[7]||(e[7]=[_("我是小菜单喵 ",-1)])]),_:1}),u("div",qe,[o.navItems?.length?(x(),N(Ae,{key:0,items:o.navItems},null,8,["items"])):(x(),k("div",Ke," 暂无目录喵~ "))])])):K("",!0),u("div",Je,[u("div",Ue,[u("div",Ye,[u("div",{class:"article-content leading-[1.8] [overflow-wrap:anywhere] break-words [&_h1]:mt-[1.5em] [&_h1]:mb-[0.5em] [&_h1]:text-[#2c3e50] [&_h2]:mt-[1.5em] [&_h2]:mb-[0.5em] [&_h2]:text-[#2c3e50] [&_h3]:mt-[1.5em] [&_h3]:mb-[0.5em] [&_h3]:text-[#2c3e50]",ref:"articleRef",innerHTML:o.article.html},null,8,Ze),u("div",Qe,[u("div",Ge,[e[8]||(e[8]=u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"文章作者:",-1)),u("span",Xe,v(o.article.author),1)]),u("div",et,[e[9]||(e[9]=u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"文章链接:",-1)),u("span",tt,[u("a",{class:"text-[#3498db] no-underline hover:underline",href:`https://www.kecare.me/articles/${o.article.id} `,targe:"_blank",rel:"noopener noreferrer"},"kecare.me/articles/"+v(o.article.id),9,nt)])]),e[10]||(e[10]=u("div",{class:"post-copyright-notice"},[u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"版权声明:"),u("span",{class:"post-copyright-info"},[_(" 博客所有文章除特别声明外，均采用 "),u("a",{class:"text-[#3498db] no-underline hover:underline",href:"https://creativecommons.org/licenses/by-nc-sa/4.0/"}," CC BY-NC-SA 4.0 "),_(" 许可协议。转载请注明来源 ")])],-1))]),e[11]||(e[11]=ce('<div class="tags-shares flex justify-between items-center my-[30px] w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px]" data-v-a67e8e45><div class="post-tag-list flex flex-wrap gap-[10px]" data-v-a67e8e45><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem] transition-all duration-300 ease hover:bg-[#ff6b93] hover:-translate-y-[2px]" href="#" data-v-a67e8e45>喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem] transition-all duration-300 ease hover:bg-[#ff6b93] hover:-translate-y-[2px]" href="#" data-v-a67e8e45>喵喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem] transition-all duration-300 ease hover:bg-[#ff6b93] hover:-translate-y-[2px]" href="#" data-v-a67e8e45>喵喵喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem] transition-all duration-300 ease hover:bg-[#ff6b93] hover:-translate-y-[2px]" href="#" data-v-a67e8e45>喵喵喵喵</a></div></div><hr class="post-hr my-[40px] h-[2px] w-full border-0 bg-gradient-to-r from-transparent via-[#ffe1e6] to-transparent" data-v-a67e8e45>',2))])]),u("aside",ot,[L(Se)])])])],64)}}}),lt=Object.assign(I(rt,[["__scopeId","data-v-a67e8e45"]]),{__name:"ThemeArticleTheme"});export{lt as a};
