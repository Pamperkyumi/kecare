import{a as t}from"./DbNIgRzX.js";import{d as n,c as a,o}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const h=n({__name:"a3b16d10",setup(c){const e={lang:"en-US",title:"Project Structure Conventions",html:`<div class="kecare"><h1 id="project-structure-and-conventions-kecare">Project Structure and Conventions (Kecare)</h1>
<p>Regardless of the technology stack or framework, be it Vue, React, Svelte, or traditional server-side rendering frameworks,
any existing project, or a new project you create using your preferred technology stack, can be transformed into a blog simply by creating a <code>.kecare</code> directory.
It will generate blog pages for you based on the rules you define.</p>
<hr>
<h2 id="1-directory-structure">1. Directory Structure</h2>
<pre><code class="language-txt">Kecare-theme/                       # 主题根目录（themeDir）
├─ .kecare/                          # Kecare 约定目录（）
│  ├─ articles/                      # 文章源文件（Markdown）
│  │  ├─ hello-kecare.md
│  │  └─ ...
│  └─ menus/                         # 菜单源文件（TypeScript）
│  │  ├─ kecare-docs.menu.source.ts
│  │  └─ ...
│  └─ en-US.trans.ts                      # 英文翻译配置文件
│
...
</code></pre>
<p><strong>.kecare/</strong> is the most crucial part of the Kecare system: <strong>writers&#39; content goes here, menus go here, and theme authors by default also fetch content from here</strong>, ne~</p>
<h2 id="2-kecare-directory-conventions">2. <strong>.kecare/</strong> Directory Conventions</h2>
<h3 id="21-kecarearticlesarticle-directory">2.1 <strong>.kecare/articles/</strong>：Article Directory</h3>
<ul>
<li>Location fixed: <strong>theme directory/.kecare/articles/</strong></li>
<li>File type: Currently only supports <strong><code>*.md</code></strong></li>
<li>Recommended naming: Use stable, readable English filenames (e.g., <strong><code>getting-started.md</code></strong>), avoid frequent renaming</li>
</ul>
<p>Why is it not recommended to randomly change file names?</p>
<p>Because in common implementations of Kecare, the <strong>id</strong> of an article is often derived from the hash of the file name, thereby forming a stable link.</p>
<p>The file name changed → <strong>id</strong> may change → old links may become invalid, meow~</p>
<h3 id="22-kecaremenus-menu-directory">2.2 <strong>.kecare/menus/</strong>: Menu Directory</h3>
<ul>
<li>Location fixed: <strong>theme directory/.kecare/menus/</strong></li>
<li>File naming fixed: <strong><code>*.menu.source.ts</code></strong></li>
<li>File content convention: export <strong>navItems: NavItem[]</strong></li>
</ul>
<h2 id="3-how-the-theme-layer-consumes-data-for-theme-authors">3. How the Theme Layer Consumes Data (For Theme Authors)</h2>
<p>Kecare&#39;s generator typically parses articles into structured object arrays (e.g., <strong><code>articles: Article[]</code></strong>)</p>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",hash:"a3b16d10",relativePath:"/项目结构约定.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"项目结构约定",menu:"test",tags:[],desc:"# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 项目结构与约定（Kecare）\r
无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架，\r
任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就能变成一个博客了，\r
它会会根据你定义的规则，替你生成博客页面。\r
\r
---\r
\r
## 1. 目录结构\r
\r
\`\`\`txt\r
Kecare-theme/                       # 主题根目录（themeDir）\r
├─ .kecare/                          # Kecare 约定目录（）\r
│  ├─ articles/                      # 文章源文件（Markdown）\r
│  │  ├─ hello-kecare.md\r
│  │  └─ ...\r
│  └─ menus/                         # 菜单源文件（TypeScript）\r
│  │  ├─ kecare-docs.menu.source.ts\r
│  │  └─ ...\r
│  └─ en-US.trans.ts                      # 英文翻译配置文件\r
│\r
...\r
\`\`\`\r
\r
**.kecare/** 是 Kecare 体系里最关键的部分：**写作者的内容放这里，菜单放这里，主题作者默认也从这里取内容**，捏~\r
\r
## 2. **.kecare/** 目录的约定\r
\r
### 2.1 **.kecare/articles/**：文章目录\r
\r
- 位置固定：**主题目录/.kecare/articles/**\r
- 文件类型：目前仅支持 **\`*.md\`**\r
- 推荐命名：使用稳定、可读的英文文件名（例如 **\`getting-started.md\`**），避免频繁改名捏\r
\r
为什么不建议乱改文件名？\r
\r
因为在 Kecare 的常见实现中，文章的 **id** 往往由文件名哈希得到，从而形成稳定链接\r
\r
文件名变了 → **id** 可能变化 → 旧链接可能失效，喵~\r
\r
### 2.2 **.kecare/menus/**：菜单目录\r
\r
- 位置固定：**主题目录/.kecare/menus/**\r
- 文件命名固定：**\`*.menu.source.ts\`**\r
- 文件内容约定：导出 **navItems: NavItem[]**\r
\r
## 3. 主题层如何消费数据（面向主题作者捏）\r
\r
Kecare 的生成器通常会把文章解析成结构化对象数组（例如 **\`articles: Article[]\`**）\r
\r
`},r=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(s,i)=>(o(),a(t,{article:e,navItems:r}))}});export{h as default};
