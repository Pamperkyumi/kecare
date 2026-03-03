import{a as n}from"./DbNIgRzX.js";import{d as t,c,o as a}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const k=t({__name:"a3b16d10",setup(s){const e={lang:"zh-CN",title:"项目结构约定",html:`<div class="kecare"><h1 id="项目结构与约定kecare">项目结构与约定（Kecare）</h1>
<p>无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架，
任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就能变成一个博客了，
它会会根据你定义的规则，替你生成博客页面。</p>
<hr>
<h2 id="1-目录结构">1. 目录结构</h2>
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
<p><strong>.kecare/</strong> 是 Kecare 体系里最关键的部分：<strong>写作者的内容放这里，菜单放这里，主题作者默认也从这里取内容</strong>，捏~</p>
<h2 id="2-kecare-目录的约定">2. <strong>.kecare/</strong> 目录的约定</h2>
<h3 id="21-kecarearticles文章目录">2.1 <strong>.kecare/articles/</strong>：文章目录</h3>
<ul>
<li>位置固定：<strong>主题目录/.kecare/articles/</strong></li>
<li>文件类型：目前仅支持 <strong><code>*.md</code></strong></li>
<li>推荐命名：使用稳定、可读的英文文件名（例如 <strong><code>getting-started.md</code></strong>），避免频繁改名捏</li>
</ul>
<p>为什么不建议乱改文件名？</p>
<p>因为在 Kecare 的常见实现中，文章的 <strong>id</strong> 往往由文件名哈希得到，从而形成稳定链接</p>
<p>文件名变了 → <strong>id</strong> 可能变化 → 旧链接可能失效，喵~</p>
<h3 id="22-kecaremenus菜单目录">2.2 <strong>.kecare/menus/</strong>：菜单目录</h3>
<ul>
<li>位置固定：<strong>主题目录/.kecare/menus/</strong></li>
<li>文件命名固定：<strong><code>*.menu.source.ts</code></strong></li>
<li>文件内容约定：导出 <strong>navItems: NavItem[]</strong></li>
</ul>
<h2 id="3-主题层如何消费数据面向主题作者捏">3. 主题层如何消费数据（面向主题作者捏）</h2>
<p>Kecare 的生成器通常会把文章解析成结构化对象数组（例如 <strong><code>articles: Article[]</code></strong>）</p>
</div>`,isOriginalLang:!0,menu:"test",desc:"# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",hash:"a3b16d10",relativePath:"/项目结构约定.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"项目结构约定",menu:"test",tags:[],desc:"# 项目结构与约定（Kecare） 无论任何技术栈或者框架，无论是 vue 还是 react 还是 svelte 还是传统的服务端渲染的框架， 任何一个老项目，或者你使用自己喜欢的技术栈所创建的新项目，只要新建一个 .kecare 目录，就...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
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
`},r=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(l,i)=>(a(),c(n,{article:e,navItems:r}))}});export{k as default};
