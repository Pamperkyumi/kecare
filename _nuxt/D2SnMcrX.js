import{a as r}from"./DbNIgRzX.js";import{d as t,c as l,o as a}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const g=t({__name:"6e8c5f0b",setup(o){const e={lang:"en-US",title:"Writing",html:`<div class="kecare"><h1 id="writing">Writing</h1>
<p>In Kecare, articles have a fixed storage location meow:</p>
<ul>
<li>Article Directory: <strong>theme-directory/.kecare/articles/</strong></li>
<li>File Type: Currently only supports <strong><code>*.md</code></strong></li>
<li>Recommended Naming: Use stable, readable English filenames (e.g., <strong><code>getting-started.md</code></strong>), avoid frequent renaming</li>
</ul>
<p>Currently only Markdown (<strong>.md</strong>) articles are supported. Support for more &quot;note formats/file types&quot; will be gradually added.</p>
<h2 id="1-create-a-new-article-file">1. Create a New Article File</h2>
<p>Create a new Markdown file under <strong>theme directory/.kecare/articles/</strong>, for example:</p>
<ul>
<li><strong><code>hello-kecare.md</code></strong></li>
<li><strong><code>my-first-post.md</code></strong></li>
</ul>
<h2 id="2-write-the-main-content">2. Write the main content</h2>
<p>You can write the main content just like regular Markdown, and remember to save when you&#39;re done, meow~</p>
<p>Here is a minimal example for you, meow~</p>
<pre><code class="language-markdown">---
title: Hello Kecare
date: 2026-01-22 12:00:00
tags:
  - kecare
desc: 这是我的第一篇 Kecare 文章喵~
author: Pamper
menu: test
translate: [&#39;zh-CN&#39;, &#39;en-US&#39;, &#39;ja-JP&#39;]
---

# Hello Kecare

这是一段正文内容喵~

- 支持 Markdown 标题
- 支持列表
- 支持代码块

\`\`\`ts
console.log(&quot;喵喵喵喵喵喵喵喵喵喵喵~&quot;);
\`\`\`
</code></pre>
<h2 id="3-running">3. Running</h2>
<p>After writing the article, you need to run the generator to see the updates in the browser, meow.</p>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 写作 在 Kecare 中，文章有一个固定存放位置喵： - 文章目录：**主题目录/.kecare/articles/** - 文件类型：目前仅支持 **`*.md`** - 推荐命名：使用稳定、可读的英文文件名（例如 **`getti...",hash:"6e8c5f0b",relativePath:"/写作.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"写作",menu:"test",tags:[],desc:"# 写作 在 Kecare 中，文章有一个固定存放位置喵： - 文章目录：**主题目录/.kecare/articles/** - 文件类型：目前仅支持 **`*.md`** - 推荐命名：使用稳定、可读的英文文件名（例如 **`getti...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 写作\r
\r
在 Kecare 中，文章有一个固定存放位置喵：\r
\r
- 文章目录：**主题目录/.kecare/articles/**\r
- 文件类型：目前仅支持 **\`*.md\`**\r
- 推荐命名：使用稳定、可读的英文文件名（例如 **\`getting-started.md\`**），避免频繁改名捏\r
\r
目前只支持 Markdown（**.md**）文章。后续会逐步支持更多“笔记格式/文件类型”的捏。\r
\r
## 1. 新建文章文件\r
\r
在 **主题目录/.kecare/articles/** 下新建一个 Markdown 文件，例如：\r
\r
- **\`hello-kecare.md\`**\r
- **\`my-first-post.md\`**\r
\r
## 2. 写正文内容\r
\r
你可以像写普通 Markdown 一样写正文内容，写完记得保存喵~\r
\r
下面给你一个最小示例喵~\r
\r
\`\`\`\`markdown\r
---\r
title: Hello Kecare\r
date: 2026-01-22 12:00:00\r
tags:\r
  - kecare\r
desc: 这是我的第一篇 Kecare 文章喵~\r
author: Pamper\r
menu: test\r
translate: ['zh-CN', 'en-US', 'ja-JP']\r
---\r
\r
# Hello Kecare\r
\r
这是一段正文内容喵~\r
\r
- 支持 Markdown 标题\r
- 支持列表\r
- 支持代码块\r
\r
\`\`\`ts\r
console.log("喵喵喵喵喵喵喵喵喵喵喵~");\r
\`\`\`\r
\`\`\`\`\r
\r
## 3. 运行\r
\r
写完文章后，需要运行生成器才能在浏览器里看到更新喵。\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(i,c)=>(a(),l(r,{article:e,navItems:n}))}});export{g as default};
