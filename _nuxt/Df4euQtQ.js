import{a as r}from"./DbNIgRzX.js";import{d as t,c as l,o as a}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const k=t({__name:"6e8c5f0b",setup(c){const e={lang:"zh-CN",title:"写作",html:`<div class="kecare"><h1 id="写作">写作</h1>
<p>在 Kecare 中，文章有一个固定存放位置喵：</p>
<ul>
<li>文章目录：<strong>主题目录/.kecare/articles/</strong></li>
<li>文件类型：目前仅支持 <strong><code>*.md</code></strong></li>
<li>推荐命名：使用稳定、可读的英文文件名（例如 <strong><code>getting-started.md</code></strong>），避免频繁改名捏</li>
</ul>
<p>目前只支持 Markdown（<strong>.md</strong>）文章。后续会逐步支持更多“笔记格式/文件类型”的捏。</p>
<h2 id="1-新建文章文件">1. 新建文章文件</h2>
<p>在 <strong>主题目录/.kecare/articles/</strong> 下新建一个 Markdown 文件，例如：</p>
<ul>
<li><strong><code>hello-kecare.md</code></strong></li>
<li><strong><code>my-first-post.md</code></strong></li>
</ul>
<h2 id="2-写正文内容">2. 写正文内容</h2>
<p>你可以像写普通 Markdown 一样写正文内容，写完记得保存喵~</p>
<p>下面给你一个最小示例喵~</p>
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
<h2 id="3-运行">3. 运行</h2>
<p>写完文章后，需要运行生成器才能在浏览器里看到更新喵。</p>
</div>`,isOriginalLang:!0,menu:"test",desc:"# 写作 在 Kecare 中，文章有一个固定存放位置喵： - 文章目录：**主题目录/.kecare/articles/** - 文件类型：目前仅支持 **`*.md`** - 推荐命名：使用稳定、可读的英文文件名（例如 **`getti...",hash:"6e8c5f0b",relativePath:"/写作.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"写作",menu:"test",tags:[],desc:"# 写作 在 Kecare 中，文章有一个固定存放位置喵： - 文章目录：**主题目录/.kecare/articles/** - 文件类型：目前仅支持 **`*.md`** - 推荐命名：使用稳定、可读的英文文件名（例如 **`getti...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
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
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(o,s)=>(a(),l(r,{article:e,navItems:n}))}});export{k as default};
