const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./C6_gaAz3.js","./DjoDWAqA.js","./entry.CJyXMGF5.css"])))=>i.map(i=>d[i]);
import{_ as z}from"./DmmDlsWm.js";import{Y as N,_ as A,a as k,c as v,b as h,d as I,y as H,h as D,F as O,r as R,l as q,i as E,w as B,g as y,t as w,Z as C,k as P,M as F,$ as K,m as W,a0 as J,a1 as Z,o as G,n as Y,f as T,e as U}from"./DjoDWAqA.js";import{N as Q}from"./Cnem-892.js";async function X(r){const i=document.querySelector(".kecare-sidebar");if(!i)return;const c=r.querySelectorAll("h1, h2, h3, h4, h5, h6"),d=[],o=[];for(let n=0;n<c.length;n++){const t=c[n],p=parseInt(t.tagName[1]),f={level:p,element:t,children:[]};for(;o.length>0&&o[o.length-1].level>=p;)o.pop();o.length>0?o[o.length-1].children.push(f):d.push(f),o.push(f)}function s(n,t=!1){let p="";for(const f of n){const l=f.element,e=l.id||"",u=l.textContent||"",m=t?"toc-sublink":"toc-link";p+=`<li class="${t?"toc-subitem":"toc-item"}">`,p+=`<a class="${m}" data-target="${e}" title="${u}">${u}</a>`,f.children.length>0&&(p+='<ul class="toc-sublist">',p+=s(f.children,!0),p+="</ul>"),p+="</li>"}return p}const g=`<ul class="toc-list">${s(d)}</ul>`;i.innerHTML=g;const a=i.querySelectorAll("a.toc-link, a.toc-sublink");for(let n=0;n<a.length;n++){const t=a[n];t.addEventListener("click",p=>{p.preventDefault();const f=t.dataset.target;if(!f)return;const l=document.getElementById(f);l&&l.scrollIntoView({behavior:"smooth",block:"start"})})}}const ee=`
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


`;async function te(){const r=document.createElement("style");r.textContent=ee,document.head.appendChild(r)}const ne=[[/^(<!--)(.+)(-->)$/,!1],[/^(\/\*)(.+)(\*\/)$/,!1],[/^(\/\/|["'#]|;{1,2}|%{1,2}|--)(.*)$/,!0],[/^(\*)(.+)$/,!0]];function oe(r,i,c){const d=[];for(const o of r){if(c==="v3"){const a=o.children.flatMap((n,t)=>{if(n.type!=="element")return n;const p=n.children[0];if(p.type!=="text")return n;const f=t===o.children.length-1;if(!M(p.value,f))return n;const l=p.value.split(/(\s+\/\/)/);if(l.length<=1)return n;let e=[l[0]];for(let u=1;u<l.length;u+=2)e.push(l[u]+(l[u+1]||""));return e=e.filter(Boolean),e.length<=1?n:e.map(u=>({...n,children:[{type:"text",value:u}]}))});a.length!==o.children.length&&(o.children=a)}const s=o.children;let g=s.length-1;c==="v1"?g=0:i&&(g=s.length-2);for(let a=Math.max(g,0);a<s.length;a++){const n=s[a];if(n.type!=="element")continue;const t=n.children.at(0);if(t?.type!=="text")continue;const p=a===s.length-1;let f=M(t.value,p),l;if(!f&&a>0&&t.value.trim().startsWith("[!code")){const e=s[a-1];if(e?.type==="element"){const u=e.children.at(0);if(u?.type==="text"&&u.value.includes("//")){const m=M(u.value+t.value,p);if(m){f=m,d.push({info:m,line:o,token:e,isLineCommentOnly:s.length===2&&e.children.length===1&&n.children.length===1,isJsxStyle:!1,additionalTokens:[n]});continue}}}}if(f)if(i&&!p&&a!==0){const e=j(s[a-1],"{")&&j(s[a+1],"}");d.push({info:f,line:o,token:n,isLineCommentOnly:s.length===3&&n.children.length===1,isJsxStyle:e,additionalTokens:l})}else d.push({info:f,line:o,token:n,isLineCommentOnly:s.length===1&&n.children.length===1,isJsxStyle:!1,additionalTokens:l})}}return d}function j(r,i){if(r.type!=="element")return!1;const c=r.children[0];return c.type!=="text"?!1:c.value.trim()===i}function M(r,i){let c=r.trimStart();const d=r.length-c.length;c=c.trimEnd();const o=r.length-c.length-d;for(const[s,g]of ne){if(g&&!i)continue;const a=s.exec(c);if(a)return[" ".repeat(d)+a[1],a[2],a[3]?a[3]+" ".repeat(o):void 0]}}function ae(r){const i=r.match(/(?:\/\/|["'#]|;{1,2}|%{1,2}|--)(\s*)$/);return i&&i[1].trim().length===0?r.slice(0,i.index):r}function V(r,i,c,d){return d==null&&(d="v3"),{name:r,code(o){const s=o.children.filter(t=>t.type==="element"),g=[];o.data??={};const a=o.data;a._shiki_notation??=oe(s,["jsx","tsx"].includes(this.options.lang),d);const n=a._shiki_notation;for(const t of n){if(t.info[1].length===0)continue;let p=s.indexOf(t.line);t.isLineCommentOnly&&d!=="v1"&&p++;let f=!1;if(t.info[1]=t.info[1].replace(i,(...e)=>c.call(this,e,t.line,t.token,s,p)?(f=!0,""):e[0]),!f)continue;d==="v1"&&(t.info[1]=ae(t.info[1]));const l=t.info[1].trim().length===0;if(l&&(t.info[1]=""),l&&t.isLineCommentOnly)g.push(t.line);else if(l&&t.isJsxStyle)t.line.children.splice(t.line.children.indexOf(t.token)-1,3);else if(l){if(t.additionalTokens)for(let e=t.additionalTokens.length-1;e>=0;e--){const u=t.additionalTokens[e],m=t.line.children.indexOf(u);m!==-1&&t.line.children.splice(m,1)}t.line.children.splice(t.line.children.indexOf(t.token),1)}else{const e=t.token.children[0];if(e.type==="text"&&(e.value=t.info.join(""),t.additionalTokens))for(const u of t.additionalTokens){const m=u.children[0];m?.type==="text"&&(m.value="")}}}for(const t of g){const p=o.children.indexOf(t),f=o.children[p+1];let l=1;f?.type==="text"&&f?.value===`
`&&(l=2),o.children.splice(p,l)}}}}function re(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _(r={},i="@shikijs/transformers:notation-map"){const{classMap:c={},classActivePre:d=void 0,classActiveCode:o=void 0}=r;return V(i,new RegExp(`#?\\s*\\[!code (${Object.keys(c).map(re).join("|")})(:\\d+)?\\]`,"gi"),function([s,g,a=":1"],n,t,p,f){const l=Number.parseInt(a.slice(1),10);for(let e=f;e<Math.min(f+l,p.length);e++)this.addClassToHast(p[e],c[g]);return d&&this.addClassToHast(this.pre,d),o&&this.addClassToHast(this.code,o),!0},r.matchAlgorithm)}function se(r={}){const{classLineAdd:i="diff add",classLineRemove:c="diff remove",classActivePre:d="has-diff",classActiveCode:o}=r;return _({classMap:{"++":i,"--":c},classActivePre:d,classActiveCode:o,matchAlgorithm:r.matchAlgorithm},"@shikijs/transformers:notation-diff")}function ie(r={}){const{classActiveLine:i="focused",classActivePre:c="has-focused",classActiveCode:d}=r;return _({classMap:{focus:i},classActivePre:c,classActiveCode:d,matchAlgorithm:r.matchAlgorithm},"@shikijs/transformers:notation-focus")}function $(r={}){const{classActiveLine:i="highlighted",classActivePre:c="has-highlighted",classActiveCode:d}=r;return _({classMap:{highlight:i,hl:i},classActivePre:c,classActiveCode:d,matchAlgorithm:r.matchAlgorithm},"@shikijs/transformers:notation-highlight")}const ce=Object.freeze(Object.defineProperty({__proto__:null,createCommentNotationTransformer:V,transformerNotationDiff:se,transformerNotationFocus:ie,transformerNotationHighlight:$,transformerNotationMap:_},Symbol.toStringTag,{value:"Module"}));async function le(r){const i=r.querySelectorAll("pre > code"),{codeToHtml:c}=await N(async()=>{const{codeToHtml:s}=await import("./C6_gaAz3.js");return{codeToHtml:s}},__vite__mapDeps([0,1,2]),import.meta.url),{transformerNotationDiff:d,transformerNotationFocus:o}=await N(async()=>{const{transformerNotationDiff:s,transformerNotationFocus:g}=await Promise.resolve().then(()=>ce);return{transformerNotationDiff:s,transformerNotationFocus:g}},void 0,import.meta.url);for(const s of i){const a=s.className.split(" ").find(L=>L.startsWith("language-")),n=a?a.replace("language-",""):"text",t=s.textContent||"";let p="";try{p=await c(t,{lang:n,theme:"one-dark-pro",transformers:[d({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),$({matchAlgorithm:"v3"})]})}catch{p=await c(t,{lang:"text",theme:"one-dark-pro",transformers:[d({matchAlgorithm:"v3"}),o({matchAlgorithm:"v3"}),$({matchAlgorithm:"v3"})]})}const f=document.createElement("div");f.innerHTML=p;const l=f.firstElementChild;if(!l)continue;const e='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',u='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',m='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',x=document.createElement("button");x.className="code-copy-button",x.innerHTML=e,x.type="button",x.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t),x.innerHTML=u,x.classList.add("success"),setTimeout(()=>{x.innerHTML=e,x.classList.remove("success")},2e3)}catch{x.innerHTML=m,x.classList.add("error"),setTimeout(()=>{x.innerHTML=e,x.classList.remove("error")},2e3)}}),l instanceof HTMLElement&&(l.style.position="relative",l.setAttribute("data-lang",(n||"text").toLowerCase()),l.appendChild(x));const b=s.parentElement;b&&b.tagName==="PRE"?b.replaceWith(l):s.replaceWith(l)}}async function de(r){const i=r.querySelectorAll("[data-tabs]");for(const c of i){const d=c.querySelectorAll(".md-tabs__tab"),o=c.querySelectorAll(".md-tabs__panel");for(let s=0;s<d.length;s++){const g=d[s];g&&g.addEventListener("click",()=>{for(const n of d)n.ariaSelected="false",n.classList.remove("md-tabs__tab--active");g.ariaSelected="true",g.classList.add("md-tabs__tab--active");for(const n of o)n.ariaHidden="true",n.setAttribute("hidden","");const a=o[s];a&&(a.ariaHidden="false",a.removeAttribute("hidden"))})}}}async function pe(r,i,c,d="/articles"){if(!r||!i||!c)return;const o='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',s='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',g='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',a=r.querySelector(".kecare-copy-button");a&&a.remove();const n=document.createElement("button");n.className="kecare-copy-button",n.innerHTML=`${o}<span>复制 Markdown</span>`,n.type="button",n.setAttribute("aria-label","复制 Markdown"),n.title="复制 Markdown",n.addEventListener("click",async()=>{try{const t=c.match(/\/([a-z]{2}-[A-Z]{2})\//),p=t?t[1]:"zh-CN",f=`${d.replace(/\/$/,"")}/${i}.${p}.json`,l=await fetch(f);if(!l.ok)throw new Error(`Failed to fetch: ${l.status}`);const u=(await l.json()).content;await navigator.clipboard.writeText(u),n.innerHTML=`${s}<span>复制成功了喵</span>`,n.classList.add("success"),setTimeout(()=>{n.innerHTML=`${o}<span>复制 Markdown</span>`,n.classList.remove("success")},2e3)}catch{n.innerHTML=`${g}<span>复制失败了喵</span>`,n.classList.add("error"),setTimeout(()=>{n.innerHTML=`${o}<span>复制 Markdown</span>`,n.classList.remove("error")},2e3)}}),r.appendChild(n)}async function ue(r,i,c,d="/articles"){if(!r||!i||!c)return;const o='<svg width="18" height="18" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M192 64C209.7 64 224 78.3 224 96L224 128L352 128C369.7 128 384 142.3 384 160C384 177.7 369.7 192 352 192L342.4 192L334 215.1C317.6 260.3 292.9 301.6 261.8 337.1C276 345.9 290.8 353.7 306.2 360.6L356.6 383L418.8 243C423.9 231.4 435.4 224 448 224C460.6 224 472.1 231.4 477.2 243L605.2 531C612.4 547.2 605.1 566.1 589 573.2C572.9 580.3 553.9 573.1 546.8 557L526.8 512L369.3 512L349.3 557C342.1 573.2 323.2 580.4 307.1 573.2C291 566 283.7 547.1 290.9 531L330.7 441.5L280.3 419.1C257.3 408.9 235.3 396.7 214.5 382.7C193.2 399.9 169.9 414.9 145 427.4L110.3 444.6C94.5 452.5 75.3 446.1 67.4 430.3C59.5 414.5 65.9 395.3 81.7 387.4L116.2 370.1C132.5 361.9 148 352.4 162.6 341.8C148.8 329.1 135.8 315.4 123.7 300.9L113.6 288.7C102.3 275.1 104.1 254.9 117.7 243.6C131.3 232.3 151.5 234.1 162.8 247.7L173 259.9C184.5 273.8 197.1 286.7 210.4 298.6C237.9 268.2 259.6 232.5 273.9 193.2L274.4 192L64.1 192C46.3 192 32 177.7 32 160C32 142.3 46.3 128 64 128L160 128L160 96C160 78.3 174.3 64 192 64zM448 334.8L397.7 448L498.3 448L448 334.8z" fill="currentColor"/></svg>',s=r.querySelector(".kecare-language-switcher");s&&s.remove();const g=c.match(/\/([a-z]{2}-[A-Z]{2})\//),a=g?g[1]:"zh-CN",n=document.createElement("div");n.className="kecare-language-switcher";const t=document.createElement("button");t.className="kecare-language-switcher-button",t.innerHTML=`${o}`,t.type="button",t.setAttribute("aria-label","切换语言"),t.title="切换语言";const p=document.createElement("div");p.className="kecare-language-dropdown",p.style.display="none";const f=[{code:"zh-CN",label:"中文"},{code:"en-US",label:"English"},{code:"zh-TW",label:"繁体中文"},{code:"ja-JP",label:"日本語"}];for(const l of f){const e=document.createElement("a");e.className="kecare-language-item",e.textContent=l.label,e.dataset.lang=l.code;const u=`${d.replace(/\/$/,"")}/${l.code}/${i}`;e.href=u,l.code===a&&e.classList.add("active"),p.appendChild(e)}t.addEventListener("click",l=>{l.stopPropagation();const e=p.style.display==="block";p.style.display=e?"none":"block"}),document.addEventListener("click",()=>{p.style.display="none"}),p.addEventListener("click",l=>{l.stopPropagation()}),n.appendChild(t),n.appendChild(p),r.appendChild(n)}let S=null;async function fe(){if(typeof window>"u"||typeof document>"u")return;await te();const r=new Promise(c=>{document.readyState==="complete"?c(void 0):window.addEventListener("load",c,{once:!0})});return{mounted:async(c,d)=>{await r;const o=document.querySelector(".kecare");await ue(o,c,d),await pe(o,c,d),await X(o),await de(o),await le(o)}}}function he(){return S||(S=fe()),S}const ge={},me={class:"toc"};function be(r,i){return k(),v("section",me,[...i[0]||(i[0]=[h("h3",{class:"toc-title"},"目录喵",-1),h("div",{class:"kecare-sidebar"},null,-1)])])}const xe=Object.assign(A(ge,[["render",be]]),{__name:"ThemeSidebarTocCard"}),ke={key:1,class:"side-nav-group"},ve=["onClick"],ye={class:"side-nav-group-title"},we=I({name:"SidebarNavTree",__name:"Sidebar-navtree",props:{items:{},level:{default:0}},setup(r){const i=r,c=K(),d=W(new Set),o=e=>"link"in e;function s(e){if(c.path===e)return!0;const u=e.replace(/^\.\//,"");return u?c.path.endsWith(`/${u}`):!1}const g=q(()=>`padding-left: ${i.level*12}px;`);function a(e){return o(e)?`l:${e.link}`:`g:${e.text}:${i.level}`}function n(e){return o(e)?s(e.link):!e.items||e.items.length===0?!1:e.items.some(u=>n(u))}function t(e){return o(e)?!0:d.value.has(a(e))}function p(e){if(o(e))return;const u=a(e);d.value.has(u)?d.value.delete(u):d.value.add(u)}function f(e,u){for(const m of e)!o(m)&&n(m)&&(u.add(a(m)),m.items&&m.items.length>0&&f(m.items,u))}function l(){const e=new Set;f(i.items,e),d.value=e}return H(()=>c.path,l,{immediate:!0}),H(()=>i.items,l,{immediate:!0,deep:!0}),(e,u)=>{const m=z,x=F("SidebarNavTree");return k(),v("ul",{class:"side-nav",style:D(g.value)},[(k(!0),v(O,null,R(i.items,b=>(k(),v("li",{key:a(b),class:"side-nav-item"},[o(b)?(k(),E(m,{key:0,class:C(["side-nav-link",{active:s(b.link)}]),to:b.link},{default:B(()=>[y(w(b.text),1)]),_:2},1032,["class","to"])):(k(),v("div",ke,[h("div",{class:"side-nav-group-header",onClick:L=>p(b)},[h("span",ye,w(b.text),1),h("span",{class:C(["side-nav-toggle-icon",{expanded:t(b)}])},[...u[0]||(u[0]=[h("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor"},[h("path",{d:"M6 4l4 4-4 4V4z"})],-1)])],2)],8,ve),h("div",{class:C(["side-nav-group-content",{collapsed:!t(b)}])},[b.items&&b.items.length>0?(k(),E(x,{key:0,items:b.items,level:i.level+1},null,8,["items","level"])):P("",!0)],2)]))]))),128))],4)}}}),_e=Object.assign(A(we,[["__scopeId","data-v-6139810f"]]),{__name:"ThemeSidebarNavtree"}),Le={class:"flex flex-col"},Ce={class:"layout max-w-[1600px] mx-auto pt-[300px] px-[16px] flex flex-wrap items-start gap-[30px] max-[960px]:flex-col max-[960px]:flex-nowrap max-[960px]:gap-[20px]"},Te={key:0,class:"sidebar flex-none w-[240px] max-w-[240px] sticky top-[85px] h-fit bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-[18px] px-[16px] max-[960px]:hidden"},Me={class:"sidebar-list max-h-[calc(100vh-140px)] overflow-auto pr-[6px]"},Se={key:1,class:"sidebar-empty text-[#7a7a7a] dark:text-gray-400 text-[0.95rem] px-[6px] py-[10px]"},Ee={class:"main-container flex flex-1 min-w-0 w-full gap-[30px] flex-col md:flex-row"},$e={class:"article flex-1 p-0"},Ae={class:"post bg-white/70 dark:bg-gray-800/70 backdrop-blur-[10px] backdrop-saturate-150 border border-[rgba(169,169,169,0.2)] dark:border-gray-700 rounded-[16px] p-[40px] max-[768px]:p-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-[30px]"},Ne=["innerHTML"],He={class:"post-copyright relative mt-[40px] mb-[10px] p-[20px] border border-[#eee] dark:border-gray-600 rounded-[12px] bg-white/80 dark:bg-gray-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-[#87ceeb] before:rounded-l-[4px]"},je={class:"post-copyright-author"},ze={class:"post-copyright-info"},Ie={class:"post-copyright-type"},Oe={class:"post-copyright-info"},Be=["href"],Pe={class:"aside flex-none w-[280px] max-w-[280px] sticky top-[65px] h-fit max-[960px]:order-3 hidden md:block"},Ve=I({__name:"article-theme",props:{article:{},navItems:{}},async setup(r){let i,c;const d=([i,c]=J(()=>he()),i=await i,c(),i),o=Z();G(async()=>{await Y(),await d.mounted(s.article.hash,o.path)});const s=r;return(g,a)=>{const n=z;return k(),v(O,null,[h("div",Le,[T(Q)]),a[5]||(a[5]=h("div",{class:"post-bg fixed inset-0 -z-[999] bg-no-repeat bg-center bg-cover",style:{"background-image":"url(http://pichost.cloud/files/874a924352100b2931c947d68c92dac886c5b02bde9ed6cc1cfcd4c5076b03a3.jpg)"}},null,-1)),h("div",Ce,[s.navItems!==null?(k(),v("aside",Te,[T(n,{class:"sidebar-title block mx-auto text-[1.1rem] font-extrabold text-[#4fc3f7] no-underline mb-[12px] px-[10px] py-[6px] rounded-[10px] bg-[rgba(79,195,247,0.10)] border border-[rgba(79,195,247,0.18)]",to:"/"},{default:B(()=>[...a[0]||(a[0]=[y("我是小菜单喵 ",-1)])]),_:1}),h("div",Me,[s.navItems?.length?(k(),E(_e,{key:0,items:s.navItems},null,8,["items"])):(k(),v("div",Se," 暂无目录喵~ "))])])):P("",!0),h("div",Ee,[h("div",$e,[h("div",Ae,[h("div",{class:"article-content leading-[1.8] [overflow-wrap:anywhere] break-words [&_h1]:mt-[1.5em] [&_h1]:mb-[0.5em] [&_h1]:text-[#2c3e50] dark:[&_h1]:text-gray-100 [&_h2]:mt-[1.5em] [&_h2]:mb-[0.5em] [&_h2]:text-[#2c3e50] dark:[&_h2]:text-gray-100 [&_h3]:mt-[1.5em] [&_h3]:mb-[0.5em] [&_h3]:text-[#2c3e50] dark:[&_h3]:text-gray-100",ref:"articleRef",innerHTML:s.article.html},null,8,Ne),h("div",He,[h("div",je,[a[1]||(a[1]=h("span",{class:"post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]"},"文章作者:",-1)),h("span",ze,w(s.article.author),1)]),h("div",Ie,[a[2]||(a[2]=h("span",{class:"post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]"},"文章链接:",-1)),h("span",Oe,[h("a",{class:"text-[#3498db] no-underline hover:underline",href:`https://www.kecare.me/articles/${s.article.hash} `,targe:"_blank",rel:"noopener noreferrer"},"kecare.me/articles/"+w(s.article.hash),9,Be)])]),a[3]||(a[3]=h("div",{class:"post-copyright-notice"},[h("span",{class:"post-copyright-meta text-[#4fc3f7] font-bold mr-[8px]"},"版权声明:"),h("span",{class:"post-copyright-info"},[y(" 博客所有文章除特别声明外，均采用 "),h("a",{class:"text-[#3498db] no-underline hover:underline",href:"https://creativecommons.org/licenses/by-nc-sa/4.0/"}," CC BY-NC-SA 4.0 "),y(" 许可协议。转载请注明来源 ")])],-1))]),a[4]||(a[4]=U('<div class="tags-shares flex justify-between items-center my-[30px] w-full max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[20px]" data-v-a59308fd><div class="post-tag-list flex flex-wrap gap-[10px]" data-v-a59308fd><a class="post-tag bg-[#87ceeb] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-a59308fd>喵</a><a class="post-tag bg-[#87ceeb] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-a59308fd>喵喵</a><a class="post-tag bg-[#87ceeb] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-a59308fd>喵喵喵</a><a class="post-tag bg-[#87ceeb] text-white px-[12px] py-[6px] rounded-full no-underline text-[0.9rem]" href="#" data-v-a59308fd>喵喵喵喵</a></div></div><hr class="post-hr my-[40px] h-[2px] w-full border-0 bg-gradient-to-r from-transparent via-[#e1f5fe] to-transparent" data-v-a59308fd>',2))])]),h("aside",Pe,[T(xe)])])])],64)}}}),Fe=Object.assign(A(Ve,[["__scopeId","data-v-a59308fd"]]),{__name:"ThemeArticleTheme"});export{Fe as a};
