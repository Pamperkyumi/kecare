const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./wYgiZ0u3.js","./BvSnv4_Y.js","./entry.DB3emvdn.css"])))=>i.map(i=>d[i]);
import{_ as V,N as te}from"./CdAijwvK.js";import{Y as z,_ as I,a as b,c as k,b as u,d as F,e as W,F as q,r as ne,l as S,i as N,w as C,h as _,t as v,Z as oe,k as K,E as re,$ as se,a0 as ae,o as ie,n as le,f as L,u as E,g as ce}from"./BvSnv4_Y.js";async function de(s){const a=document.querySelector(".kecare-sidebar");if(!a)return;const c=s.querySelectorAll("h1, h2, h3, h4, h5, h6"),i=[],o=[];for(let l=0;l<c.length;l++){const t=c[l],f=parseInt(t.tagName[1]),p={level:f,element:t,children:[]};for(;o.length>0&&o[o.length-1].level>=f;)o.pop();o.length>0?o[o.length-1].children.push(p):i.push(p),o.push(p)}function d(l,t=!1){let f="";for(const p of l){const r=p.element,e=r.id||"",h=r.textContent||"",g=t?"toc-sublink":"toc-link";f+=`<li class="${t?"toc-subitem":"toc-item"}">`,f+=`<a class="${g}" data-target="${e}" title="${h}">${h}</a>`,p.children.length>0&&(f+='<ul class="toc-sublist">',f+=d(p.children,!0),f+="</ul>"),f+="</li>"}return f}const m=`<ul class="toc-list">${d(i)}</ul>`;a.innerHTML=m;const n=a.querySelectorAll("a.toc-link, a.toc-sublink");for(let l=0;l<n.length;l++){const t=n[l];t.addEventListener("click",f=>{f.preventDefault();const p=t.dataset.target;if(!p)return;const r=document.getElementById(p);r&&r.scrollIntoView({behavior:"smooth",block:"start"})})}}const pe=`
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
  color: #ff6b93;
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


`;async function fe(){const s=document.createElement("style");s.textContent=pe,document.head.appendChild(s)}const ue=[[/^(<!--)(.+)(-->)$/,!1],[/^(\/\*)(.+)(\*\/)$/,!1],[/^(\/\/|["'#]|;{1,2}|%{1,2}|--)(.*)$/,!0],[/^(\*)(.+)$/,!0]];function he(s,a,c){const i=[];for(const o of s){if(c==="v3"){const n=o.children.flatMap((l,t)=>{if(l.type!=="element")return l;const f=l.children[0];if(f.type!=="text")return l;const p=t===o.children.length-1;if(!H(f.value,p))return l;const r=f.value.split(/(\s+\/\/)/);if(r.length<=1)return l;let e=[r[0]];for(let h=1;h<r.length;h+=2)e.push(r[h]+(r[h+1]||""));return e=e.filter(Boolean),e.length<=1?l:e.map(h=>({...l,children:[{type:"text",value:h}]}))});n.length!==o.children.length&&(o.children=n)}const d=o.children;let m=d.length-1;c==="v1"?m=0:a&&(m=d.length-2);for(let n=Math.max(m,0);n<d.length;n++){const l=d[n];if(l.type!=="element")continue;const t=l.children.at(0);if(t?.type!=="text")continue;const f=n===d.length-1;let p=H(t.value,f),r;if(!p&&n>0&&t.value.trim().startsWith("[!code")){const e=d[n-1];if(e?.type==="element"){const h=e.children.at(0);if(h?.type==="text"&&h.value.includes("//")){const g=H(h.value+t.value,f);if(g){p=g,i.push({info:g,line:o,token:e,isLineCommentOnly:d.length===2&&e.children.length===1&&l.children.length===1,isJsxStyle:!1,additionalTokens:[l]});continue}}}}if(p)if(a&&!f&&n!==0){const e=D(d[n-1],"{")&&D(d[n+1],"}");i.push({info:p,line:o,token:l,isLineCommentOnly:d.length===3&&l.children.length===1,isJsxStyle:e,additionalTokens:r})}else i.push({info:p,line:o,token:l,isLineCommentOnly:d.length===1&&l.children.length===1,isJsxStyle:!1,additionalTokens:r})}}return i}function D(s,a){if(s.type!=="element")return!1;const c=s.children[0];return c.type!=="text"?!1:c.value.trim()===a}function H(s,a){let c=s.trimStart();const i=s.length-c.length;c=c.trimEnd();const o=s.length-c.length-i;for(const[d,m]of ue){if(m&&!a)continue;const n=d.exec(c);if(n)return[" ".repeat(i)+n[1],n[2],n[3]?n[3]+" ".repeat(o):void 0]}}function me(s){const a=s.match(/(?:\/\/|["'#]|;{1,2}|%{1,2}|--)(\s*)$/);return a&&a[1].trim().length===0?s.slice(0,a.index):s}function J(s,a,c,i){return i==null&&(i="v3"),{name:s,code(o){const d=o.children.filter(t=>t.type==="element"),m=[];o.data??={};const n=o.data;n._shiki_notation??=he(d,["jsx","tsx"].includes(this.options.lang),i);const l=n._shiki_notation;for(const t of l){if(t.info[1].length===0)continue;let f=d.indexOf(t.line);t.isLineCommentOnly&&i!=="v1"&&f++;let p=!1;if(t.info[1]=t.info[1].replace(a,(...e)=>c.call(this,e,t.line,t.token,d,f)?(p=!0,""):e[0]),!p)continue;i==="v1"&&(t.info[1]=me(t.info[1]));const r=t.info[1].trim().length===0;if(r&&(t.info[1]=""),r&&t.isLineCommentOnly)m.push(t.line);else if(r&&t.isJsxStyle)t.line.children.splice(t.line.children.indexOf(t.token)-1,3);else if(r){if(t.additionalTokens)for(let e=t.additionalTokens.length-1;e>=0;e--){const h=t.additionalTokens[e],g=t.line.children.indexOf(h);g!==-1&&t.line.children.splice(g,1)}t.line.children.splice(t.line.children.indexOf(t.token),1)}else{const e=t.token.children[0];if(e.type==="text"&&(e.value=t.info.join(""),t.additionalTokens))for(const h of t.additionalTokens){const g=h.children[0];g?.type==="text"&&(g.value="")}}}for(const t of m){const f=o.children.indexOf(t),p=o.children[f+1];let r=1;p?.type==="text"&&p?.value===`
`&&(r=2),o.children.splice(f,r)}}}}function ge(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $(s={},a="@shikijs/transformers:notation-map"){const{classMap:c={},classActivePre:i=void 0,classActiveCode:o=void 0}=s;return J(a,new RegExp(`#?\\s*\\[!code (${Object.keys(c).map(ge).join("|")})(:\\d+)?\\]`,"gi"),function([d,m,n=":1"],l,t,f,p){const r=Number.parseInt(n.slice(1),10);for(let e=p;e<Math.min(p+r,f.length);e++)this.addClassToHast(f[e],c[m]);return i&&this.addClassToHast(this.pre,i),o&&this.addClassToHast(this.code,o),!0},s.matchAlgorithm)}function xe(s={}){const{classLineAdd:a="diff add",classLineRemove:c="diff remove",classActivePre:i="has-diff",classActiveCode:o}=s;return $({classMap:{"++":a,"--":c},classActivePre:i,classActiveCode:o,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-diff")}function be(s={}){const{classActiveLine:a="focused",classActivePre:c="has-focused",classActiveCode:i}=s;return $({classMap:{focus:a},classActivePre:c,classActiveCode:i,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-focus")}function j(s={}){const{classActiveLine:a="highlighted",classActivePre:c="has-highlighted",classActiveCode:i}=s;return $({classMap:{highlight:a,hl:a},classActivePre:c,classActiveCode:i,matchAlgorithm:s.matchAlgorithm},"@shikijs/transformers:notation-highlight")}const ve=Object.freeze(Object.defineProperty({__proto__:null,createCommentNotationTransformer:J,transformerNotationDiff:xe,transformerNotationFocus:be,transformerNotationHighlight:j,transformerNotationMap:$},Symbol.toStringTag,{value:"Module"}));async function ke(s){const a=s.querySelectorAll("pre > code"),{codeToHtml:c}=await z(async()=>{const{codeToHtml:d}=await import("./wYgiZ0u3.js");return{codeToHtml:d}},__vite__mapDeps([0,1,2]),import.meta.url),{transformerNotationDiff:i,transformerNotationFocus:o}=await z(async()=>{const{transformerNotationDiff:d,transformerNotationFocus:m}=await Promise.resolve().then(()=>ve);return{transformerNotationDiff:d,transformerNotationFocus:m}},void 0,import.meta.url);for(const d of a){const n=d.className.split(" ").find(M=>M.startsWith("language-")),l=n?n.replace("language-",""):"text",t=d.textContent||"";let f="";try{f=await c(t,{lang:l,theme:"one-dark-pro",transformers:[i({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),j({matchAlgorithm:"v3"})]})}catch{f=await c(t,{lang:"text",theme:"one-dark-pro",transformers:[i({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),j({matchAlgorithm:"v3"})]})}const p=document.createElement("div");p.innerHTML=f;const r=p.firstElementChild;if(!r)continue;const e='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',h='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',g='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',x=document.createElement("button");x.className="code-copy-button",x.innerHTML=e,x.type="button",x.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t),x.innerHTML=h,x.classList.add("success"),setTimeout(()=>{x.innerHTML=e,x.classList.remove("success")},2e3)}catch{x.innerHTML=g,x.classList.add("error"),setTimeout(()=>{x.innerHTML=e,x.classList.remove("error")},2e3)}}),r instanceof HTMLElement&&(r.style.position="relative",r.setAttribute("data-lang",(l||"text").toLowerCase()),r.appendChild(x));const y=d.parentElement;y&&y.tagName==="PRE"?y.replaceWith(r):d.replaceWith(r)}}async function _e(s){const a=s.querySelectorAll("[data-tabs]");for(const c of a){const i=c.querySelectorAll(".md-tabs__tab"),o=c.querySelectorAll(".md-tabs__panel");for(let d=0;d<i.length;d++){const m=i[d];m&&m.addEventListener("click",()=>{for(const l of i)l.ariaSelected="false",l.classList.remove("md-tabs__tab--active");m.ariaSelected="true",m.classList.add("md-tabs__tab--active");for(const l of o)l.ariaHidden="true",l.setAttribute("hidden","");const n=o[d];n&&(n.ariaHidden="false",n.removeAttribute("hidden"))})}}}async function ye(s,a,c="/articles"){if(!s||!a)return;const i='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',o='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',d='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',m=s.querySelector(".kecare-copy-button");m&&m.remove();const n=document.createElement("button");n.className="kecare-copy-button",n.innerHTML=`${i}<span>复制 Markdown</span>`,n.type="button",n.setAttribute("aria-label","复制 Markdown"),n.title="复制 Markdown",n.addEventListener("click",async()=>{try{const l=`${c.replace(/\/$/,"")}/${encodeURIComponent(a)}.md`;console.log("111",l);const t=await fetch(l);if(!t.ok)throw new Error(`Failed to fetch: ${t.status}`);const f=await t.text();await navigator.clipboard.writeText(f),n.innerHTML=`${o}<span>复制成功了喵</span>`,n.classList.add("success"),setTimeout(()=>{n.innerHTML=`${i}<span>复制 Markdown</span>`,n.classList.remove("success")},2e3)}catch{n.innerHTML=`${d}<span>复制失败了喵</span>`,n.classList.add("error"),setTimeout(()=>{n.innerHTML=`${i}<span>复制 Markdown</span>`,n.classList.remove("error")},2e3)}}),s.appendChild(n)}let A=null;async function we(){if(typeof window>"u"||typeof document>"u")return;await fe();const s=new Promise(c=>{document.readyState==="complete"?c(void 0):window.addEventListener("load",c,{once:!0})});return{mounted:async c=>{await s;const i=document.querySelector(".kecare");await ye(i,c),await de(i),await _e(i),await ke(i)}}}function Le(){return A||(A=we()),A}const Me={},Ce={class:"toc"};function Te(s,a){return b(),k("section",Ce,[...a[0]||(a[0]=[u("h3",{class:"toc-title"},"目录喵",-1),u("div",{class:"kecare-sidebar"},null,-1)])])}const Se=Object.assign(I(Me,[["render",Te]]),{__name:"ThemeSidebarTocCard"}),$e={key:1,class:"side-nav-group"},Ee={class:"side-nav-group-title"},He=F({name:"SidebarNavTree",__name:"Sidebar-navtree",props:{items:{},level:{default:0}},setup(s){const a=s,c=se(),i=n=>"link"in n;function o(n){return c.path===n}const d=S(()=>`padding-left: ${a.level*12}px;`);function m(n){return i(n)?`l:${n.link}`:`g:${n.text}:${a.level}`}return(n,l)=>{const t=V,f=re("SidebarNavTree");return b(),k("ul",{class:"side-nav",style:W(d.value)},[(b(!0),k(q,null,ne(a.items,p=>(b(),k("li",{key:m(p),class:"side-nav-item"},[i(p)?(b(),N(t,{key:0,class:oe(["side-nav-link",{active:o(p.link)}]),to:p.link},{default:C(()=>[_(v(p.text),1)]),_:2},1032,["class","to"])):(b(),k("div",$e,[u("span",Ee,v(p.text),1),p.items&&p.items.length>0?(b(),N(f,{key:0,items:p.items,level:a.level+1},null,8,["items","level"])):K("",!0)]))]))),128))],4)}}}),Ae=Object.assign(I(He,[["__scopeId","data-v-549dac1d"]]),{__name:"ThemeSidebarNavtree"}),Ne=""+new URL("bg2.CiBeC1pP.webp",import.meta.url).href,je={class:"flex flex-col"},Ie={class:"layout max-w-[1600px] mx-auto pt-[100px] px-[16px] flex flex-wrap items-start gap-[30px] max-[960px]:flex-col max-[960px]:flex-nowrap max-[960px]:gap-[20px]"},Pe={class:"hero w-full flex items-center justify-center min-h-[30vh] max-[960px]:min-h-[38vh]"},Oe={class:"post-info text-center"},Be={class:"post-title text-[2.4rem] max-[768px]:text-[1.9rem] font-bold text-[#2c3e50] dark:text-gray-100 leading-tight"},Re={class:"first-line mt-[10px] flex flex-wrap items-center justify-center gap-[8px] text-[0.95rem] text-[#666] dark:text-gray-400"},ze={class:"post-created"},De={class:"word-count"},Ve={class:"reading-time"},Fe={class:"post-languages inline-flex items-center gap-[20px] text-[20px] leading-none mt-[12px]"},We={key:0,class:"sidebar flex-none w-[240px] max-w-[240px] sticky top-[85px] h-fit bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-[18px] px-[16px] max-[960px]:hidden"},qe={class:"sidebar-list max-h-[calc(100vh-140px)] overflow-auto pr-[6px]"},Ke={key:1,class:"sidebar-empty text-[#7a7a7a] dark:text-gray-400 text-[0.95rem] px-[6px] py-[10px]"},Je={class:"main-container flex flex-1 min-w-0 w-full gap-[30px] flex-col md:flex-row"},Ue={class:"article flex-1 p-0"},Ye={class:"post bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[40px] max-[768px]:p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[30px]"},Ze=["innerHTML"],Ge={class:"post-copyright relative mt-[40px] mb-[10px] p-[20px] border border-[#eee] dark:border-gray-600 rounded-[12px] bg-white/80 dark:bg-gray-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-[#ff9eb0] before:rounded-l-[4px]"},Qe={class:"post-copyright-author"},Xe={class:"post-copyright-info"},et={class:"post-copyright-type"},tt={class:"post-copyright-info"},nt=["href"],ot={class:"aside flex-none w-[280px] max-w-[280px] sticky top-[65px] h-fit max-[960px]:order-3"},rt=F({__name:"article-theme",props:{article:{},navItems:{}},async setup(s){let a,c;const i=([a,c]=ae(()=>Le()),a=await a,c(),a);ie(async()=>{await le(),await i.mounted(o.article.title)});const o=s;n(o.article.html,{wordsPerMinute:220,round:"ceil"});function d(r){if(!r)return{text:"",images:0};const e=r.match(/<img\b[^>]*>/gi),h=e?e.length:0;return{text:r.replace(/<\/?[^>]+(>|$)/g," ").replace(/\s+/g," ").trim(),images:h}}function m(r){if(!r)return 0;const e=r.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);return e?e.length:0}function n(r,e){const h={wordsPerMinute:200,round:"round",imageSeconds:12,codeWordsMultiplier:.6,minMinutes:0,...e},{text:g,images:x}=d(r),y=/```[\s\S]*?```|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi;let M=0,P=g;const O=r.match(y);if(O){for(const X of O){const ee=X.replace(/<\/?[^>]+(>|$)/g," ").replace(/[`]/g," ");M+=m(ee)}const Q=r.replace(y," ");P=d(Q).text}const U=m(P),B=Math.round(U+M*h.codeWordsMultiplier),Y=h.wordsPerMinute/60,Z=B/Y,G=x*h.imageSeconds,R=Math.max(0,Math.round(Z+G)),T=R/60;let w;return h.round==="ceil"?w=Math.ceil(T):h.round==="floor"?w=Math.floor(T):w=Math.round(T),w<h.minMinutes&&(w=Math.max(0,Math.floor(h.minMinutes))),{words:B,timeSeconds:R,minutesFloat:T,minutes:w,wordsPerMinute:h.wordsPerMinute,images:x}}function l(r){return r.minutes<=0?"少于 1 分钟":r.minutes===1?"1 分钟":`约 ${r.minutes} 分钟`}const t=S(()=>n(o.article.html,{wordsPerMinute:220,round:"ceil"})),f=S(()=>l(t.value)),p=S(()=>t.value.words);return(r,e)=>{const h=V;return b(),k(q,null,[u("div",je,[L(te)]),u("div",{class:"post-bg fixed inset-0 -z-[999] bg-no-repeat bg-center bg-cover",style:W({"background-image":`url(${E(Ne)})`})},null,4),u("div",Ie,[u("div",Pe,[u("div",Oe,[u("h1",Be,v(o.article.title),1),u("div",Re,[u("span",ze,"发布于: "+v(o.article.frontMatter.date),1),e[0]||(e[0]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),u("span",De,"总字数:"+v(E(p)),1),e[1]||(e[1]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),u("span",Ve,"阅读时长: "+v(E(f)),1)]),u("span",Fe,[L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/en-US/${o.article.hash}`},{default:C(()=>[...e[2]||(e[2]=[_("English",-1)])]),_:1},8,["to"]),e[5]||(e[5]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/zh-CN/${o.article.hash}`},{default:C(()=>[...e[3]||(e[3]=[_("简体中文",-1)])]),_:1},8,["to"]),e[6]||(e[6]=u("span",{class:"post-sparator text-[#ff9eb0]"},"|",-1)),L(h,{class:"text-[#ff6b93] font-bold no-underline px-[8px] py-[4px] rounded-[8px] hover:underline",to:`/articles/ja-JP/${o.article.hash}`},{default:C(()=>[...e[4]||(e[4]=[_("日本語",-1)])]),_:1},8,["to"])])])]),o.navItems!==null?(b(),k("aside",We,[L(h,{class:"sidebar-title inline-block text-[1.1rem] font-extrabold text-[#ff6b93] no-underline mb-[12px] px-[10px] py-[6px] rounded-[10px] bg-[rgba(255,107,147,0.10)] border border-[rgba(255,107,147,0.18)]",to:"/"},{default:C(()=>[...e[7]||(e[7]=[_("我是小菜单喵 ",-1)])]),_:1}),u("div",qe,[o.navItems?.length?(b(),N(Ae,{key:0,items:o.navItems},null,8,["items"])):(b(),k("div",Ke," 暂无目录喵~ "))])])):K("",!0),u("div",Je,[u("div",Ue,[u("div",Ye,[u("div",{class:"article-content leading-[1.8] [overflow-wrap:anywhere] break-words [&_h1]:mt-[1.5em] [&_h1]:mb-[0.5em] [&_h1]:text-[#2c3e50] dark:[&_h1]:text-gray-100 [&_h2]:mt-[1.5em] [&_h2]:mb-[0.5em] [&_h2]:text-[#2c3e50] dark:[&_h2]:text-gray-100 [&_h3]:mt-[1.5em] [&_h3]:mb-[0.5em] [&_h3]:text-[#2c3e50] dark:[&_h3]:text-gray-100",ref:"articleRef",innerHTML:o.article.html},null,8,Ze),u("div",Ge,[u("div",Qe,[e[8]||(e[8]=u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"文章作者:",-1)),u("span",Xe,v(o.article.author),1)]),u("div",et,[e[9]||(e[9]=u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"文章链接:",-1)),u("span",tt,[u("a",{class:"text-[#3498db] no-underline hover:underline",href:`https://www.kecare.me/articles/${o.article.hash} `,targe:"_blank",rel:"noopener noreferrer"},"kecare.me/articles/"+v(o.article.hash),9,nt)])]),e[10]||(e[10]=u("div",{class:"post-copyright-notice"},[u("span",{class:"post-copyright-meta text-[#ff6b93] font-bold mr-[8px]"},"版权声明:"),u("span",{class:"post-copyright-info"},[_(" 博客所有文章除特别声明外，均采用 "),u("a",{class:"text-[#3498db] no-underline hover:underline",href:"https://creativecommons.org/licenses/by-nc-sa/4.0/"}," CC BY-NC-SA 4.0 "),_(" 许可协议。转载请注明来源 ")])],-1))]),e[11]||(e[11]=ce('<div class="tags-shares flex justify-between items-center my-[30px] w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px]" data-v-542d62ea><div class="post-tag-list flex flex-wrap gap-[10px]" data-v-542d62ea><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-542d62ea>喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-542d62ea>喵喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-542d62ea>喵喵喵</a><a class="post-tag bg-[#ff9eb0] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-542d62ea>喵喵喵喵</a></div></div><hr class="post-hr my-[40px] h-[2px] w-full border-0 bg-gradient-to-r from-transparent via-[#ffe1e6] to-transparent" data-v-542d62ea>',2))])]),u("aside",ot,[L(Se)])])])],64)}}}),lt=Object.assign(I(rt,[["__scopeId","data-v-542d62ea"]]),{__name:"ThemeArticleTheme"});export{lt as a};
