import{a as n}from"./DbNIgRzX.js";import{d as o,c as r,o as a}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const h=o({__name:"70e6923c",setup(i){const e={lang:"en-US",title:"Kecare starts here meow",html:`<div class="kecare"><h1 id="about-kecare-start-here-meow">About Kecare: Start Here Meow</h1>
<blockquote>
<p>Writing documentation is really a bit difficult for me...<br>If you find anything hard to understand, please don&#39;t scold me first (whispering). You can submit an Issue / PR to help me improve it, and I&#39;ll be super grateful! Sorry, sorry, sorry (bow.gif)</p>
</blockquote>
<p>Kecare is a generator framework for modern static blogs and note sites. Its primary goal is not to &quot;create another Hexo,&quot; but to separate the <strong>content system</strong> from the <strong>theme/framework</strong>, turning your blogging capabilities into &quot;pluggable modules&quot; meow~</p>
<h2 id="what-makes-kecare-more-quotadvancedquot-than-hexo-non-invasive-meow">What Makes Kecare More &quot;Advanced&quot; Than Hexo: Non-Invasive Meow!</h2>
<p>Many traditional blogging solutions (like Hexo) will lock you into a fixed ecosystem:<br>themes, builds, plugins, directory structures—many things are tightly coupled with it. If you want to switch tech stacks, you have to start over from scratch.</p>
<p>The core advantage of Kecare lies in its <strong>Non-intrusive</strong> nature.</p>
<p>In one sentence, it means:</p>
<blockquote>
<p><strong>If you are a front-end developer, you can directly &quot;install&quot; a blog system onto your existing application with almost no concern for the technology stack used by the original project.</strong><br>You just need to create a <code>.kecare/</code> directory in your old project, write the content and rules according to the convention, and Kecare will generate the blog-related pages/data for you based on the rules you define, meow~</p>
</blockquote>
<p>Your original project could be:</p>
<ul>
<li>Vue / Nuxt</li>
<li>React / Next</li>
<li>Svelte / SvelteKit</li>
<li>Traditional Server-Side Rendering Frameworks (SSR)</li>
<li>Even just an old project (as long as you can integrate the generated results, it&#39;s fine)</li>
</ul>
<p><strong>Kecare doesn&#39;t force you to migrate, change your architecture, or rewrite your pages.</strong><br>It&#39;s like an &quot;external content production line,&quot; attaching the blog system in the lightest way possible meow~</p>
<h2 id="two-ways-of-usage-default-theme-vs-custom-theme">Two Ways of Usage: Default Theme vs Custom Theme</h2>
<p>Kecare offers two &quot;user-friendly starting paths&quot; for external users, and you can choose according to your needs~</p>
<h3 id="1-default-theme-works-out-of-the-box-meow">1) Default Theme (Works Out of the Box Meow)</h3>
<p>If you just want to have a blog that works, looks good, and is ready for writing right away—you can directly use the <strong>default theme</strong> I provide.</p>
<ul>
<li>Tech Stack: <strong>Nuxt + Vue3</strong></li>
<li>Target Audience: You who want to start writing quickly and get the blog up and running first, meow~</li>
<li>Features: You almost don&#39;t need to understand the internal details of Kecare. Just place the <code>.kecare/</code> content as per the documentation and run the commands.</li>
</ul>
<h3 id="2-custom-themes-the-true-quotnon-invasivequot-capability-meow">2) Custom Themes (The True &quot;Non-Invasive&quot; Capability Meow)</h3>
<p>If you value the freedom of being &quot;technology stack agnostic,&quot; then Kecare&#39;s custom theme path is just for you~</p>
<p>You can:</p>
<ul>
<li>Add a <code>.kecare/</code> directory in any tech stack/framework (Vue/React/Svelte/SSR/legacy projects)</li>
<li>Define generation rules in your preferred way (e.g., how articles are converted to HTML, how routing data is generated, how menu data is generated, etc.)</li>
<li>Let Kecare output consumable content artifacts for your project (such as structured data, static page fragments, resource indexes, etc.)</li>
</ul>
<p>Then your project only needs to do one thing:</p>
<blockquote>
<p><strong>By integrating Kecare&#39;s output for rendering (or directly publishing it), you complete a &quot;plugin-style blog system.&quot;</strong></p>
</blockquote>
<p>This is the ideal state of Kecare:
<strong>Blogging capabilities are additional, portable, and not bound to themes</strong>, meow~</p>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 关于 Kecare：从这里开始喵 > 写文档这种事情对我来说真的有点难捏…… > 如果你觉得哪里看不懂，先别骂我惹（小声），你可以来提 Issue / PR 帮我改，我会超级感激的喵！对不起惹对不起惹对不起惹（鞠躬.gif） Kecar...",hash:"70e6923c",relativePath:"/Kecare从这里开始喵.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"Kecare从这里开始喵",menu:"test",tags:[],desc:"# 关于 Kecare：从这里开始喵 > 写文档这种事情对我来说真的有点难捏…… > 如果你觉得哪里看不懂，先别骂我惹（小声），你可以来提 Issue / PR 帮我改，我会超级感激的喵！对不起惹对不起惹对不起惹（鞠躬.gif） Kecar...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 关于 Kecare：从这里开始喵\r
\r
> 写文档这种事情对我来说真的有点难捏……  \r
> 如果你觉得哪里看不懂，先别骂我惹（小声），你可以来提 Issue / PR 帮我改，我会超级感激的喵！对不起惹对不起惹对不起惹（鞠躬.gif）\r
\r
Kecare 是一个面向现代静态博客与笔记站点的生成器框架。它最大的目标不是“再做一个 Hexo”，而是把 **内容系统** 从 **主题/框架** 里拆出来，让你的博客能力变成“可插拔模块”喵~\r
\r
## Kecare 比 Hexo 更“先进”的地方：非侵入式喵！\r
\r
很多传统博客方案（比如 Hexo）会把你带进一套固定的生态里：  \r
主题、构建、插件、目录结构，很多东西都和它绑定在一起，想换技术栈就得重来捏。\r
\r
而 Kecare 的核心优势在于：**非侵入性（Non-intrusive）**。\r
\r
一句话解释就是：\r
\r
> **如果你是前端开发者，你可以直接给你的现有应用“加装”一套博客系统，几乎不关心原项目用的是什么技术栈。**  \r
> 你只需要在旧项目里新建一个 \`.kecare/\` 目录，并按约定写好内容与规则，Kecare 就会根据你定义的规则替你生成博客相关的页面/数据喵~\r
\r
你原本的项目可以是：\r
\r
- Vue / Nuxt\r
- React / Next\r
- Svelte / SvelteKit\r
- 传统服务端渲染框架（SSR）\r
- 甚至只是一个老项目（只要你能接入生成结果就行捏）\r
\r
**Kecare 不强迫你迁移，不改变你的架构，不要求你重写页面。**  \r
它像一个“外置的内容生产线”，把博客系统以最轻的方式挂上去喵~\r
\r
## 两种使用方式：默认主题 vs 自定义主题\r
\r
Kecare 对外提供两条“友好上手路径”，你可以按你的需求选捏~\r
\r
### 1) 默认主题（开箱即用喵）\r
\r
如果你只想立刻拥有一个能跑、好看、可写作的博客——你可以直接使用我提供的 **默认主题**。\r
\r
- 技术栈：**Nuxt + Vue3**\r
- 适合人群：想快速开始写作、想先把博客跑起来的你喵~\r
- 特点：你几乎不需要了解 Kecare 内部细节，只要按文档放好 \`.kecare/\` 内容并运行命令即可\r
\r
### 2) 自定义主题（真正的“非侵入式”能力喵）\r
\r
如果你更在意“与技术栈无关”的自由度，那 Kecare 的自定义主题路线就是为你准备的捏~\r
\r
你可以：\r
\r
- 在任何技术栈/框架里（Vue/React/Svelte/SSR/老项目）**新增一个 \`.kecare/\` 目录**\r
- 用你喜欢的方式定义生成规则（例如文章如何转 HTML、如何生成路由数据、如何生成菜单数据等）\r
- 让 Kecare 输出你项目可消费的内容产物（比如结构化数据、静态页面片段、资源索引等）\r
\r
然后你的项目只要做一件事：\r
\r
> **把 Kecare 的产物接进来渲染（或者直接发布），就完成了一套“外挂式博客系统”。**\r
\r
这就是 Kecare 的理想状态：\r
**博客能力是附加的、可移植的、与主题不绑定的**，喵~\r
\r
`},t=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(s,l)=>(a(),r(n,{article:e,navItems:t}))}});export{h as default};
