---
layout: source/_posts
title: 论md文件是如何渲染到网页上中的
date: 2025-11-19 21:16:42
tags:
- Marked
- Hexo
---

# Markdown是怎么「变」成网页的？

现在很多人都会用 [Hexo](https://hexo.io)、[VuePress](https://vuepress.vuejs.org/)、[Docsify](https://docsify.js.org/#/) 等工具来搭建自己的博客或文档站，只需要写写 `.md` 文件，然后敲几行命令，最终就能在浏览器里看到漂亮的文章页面。

但中间到底发生了什么？

核心的一环就是：**把 Markdown 文本解析成 HTML**。而在 Hexo 的默认配置中，这件事就是交给一个叫 **marked** 的库来完成的（或者说，很多主题/插件都在用它）。

# [Marked](https://marked.nodejs.cn/) 是什么？

简单讲

> **marked 是一个用 JavaScript 编写的 Markdown 解析器和编译器**，可以把 Markdown 字符串转化为 HTML 字符串。

它有几个特点:

- 纯JS编写，既可以在Node.js环境使用，也可以在浏览器端使用
- 速度快，社区广泛，生态成熟
- 支持自定义渲染

# 安装与使用

## 1.安装(需要Node.js环境)

```bash
bun install marked

npm install marked

yarn add marked

pnpm add marked
```

## 2最简单的使用例子

新建一个`mdtext.js`

```js
// 引入 marked
import { marked } from "marked";


const mdText = `
#这是你的一篇Markdown喵
# Heading level 1
## Heading level 2
### Heading level 3
这是 **加粗** 的文字
> 这是引用喵
-这是列表1
-这是列表2
\`\`\` js
console.log("Hello Markdown");
\`\`\`
`
// 使用 marked 将 Markdown 转换为 HTML
const html = marked(mdText)
console.log(html)
```

让后在终端执行`node mdtext.js`

你会在控制台看到这样的输出

```html
<p>#这是你的一篇Markdown喵</p>
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<p>这是 <strong>加粗</strong> 的文字</p>
<blockquote>
<p>这是引用喵
-这是列表1
-这是列表2</p>
</blockquote>
<pre><code class="language-js">console.log(&quot;Hello Markdown&quot;);
</code></pre>
```

到这为止，你已经体验到了marked的作用以及核心

> marked 输入的是 Markdown 字符串,输出的是 Html 字符串

### 3 在网页中使用 marked 并渲染

上面的例子只是“打印出 HTML”，真正显示在浏览器里，还需要配合 DOM。

如果你的项目还比较简单，没有打包工具，也可以直接通过 CDN：

新建一个.html文件,在其中写入

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<div id="content"></div>

<script>
    const mdText = `
#这是你的一篇Markdown喵
# Heading level 1
## Heading level 2
### Heading level 3
这是 **加粗** 的文字
> 这是引用喵
-这是列表1
-这是列表2
\`\`\` js
console.log("Hello Markdown");
\`\`\`
`
const html = marked.parse(mdText);
// 把生成的 HTML 填入 div
document.getElementById("content").innerHTML = html;
</script>
```

保存，并打开html文件，你就能直观的看到

Markdown → HTML → DOM 渲染流程

# Marked在内部做了什么

在获取Markdown文本后，调用marked进行解析，marked内部会做两件事

- 词法分析（Lexer）：把 Markdown 文本拆成一个个 Token（标题、段落、列表、代码块等）
- 语法分析 + 渲染（Parser + Renderer）：把这些 Token 转成 HTML 字符串。

Node 端生成 HTML 后，Hexo 会把 HTML 写入最终生成的 `.html` 文件；浏览器会把HTML插入到DOM中最后被浏览器渲染

# 自定义渲染器

很多时候，博客主题希望对 Markdown 渲染出来的 HTML 做更细致的控制，比如

- 标题前加上一个图标；
- 为每个标题生成一个带 `id` 的锚点，用于目录/跳转；
- 自定义代码块结构，配合前端的高亮插件（Prism.js / highlight.js 等）。

marked 提供了一个叫 **Renderer** 的机制，让你可以覆写某些“渲染规则”。

```js
import { marked } from "marked";

// 创建一个 renderer 实例
const renderer = new marked.Renderer();
renderer.heading = function (text, level, raw, slugger) {
  // slugger 可以根据标题文本生成一个 id
  const id = slugger.slug(raw); 

  return `
    <h${level} id="${id}">
      <a href="#${id}" class="header-anchor">#</a>
      ${text}
    </h${level}>
  `;
};

marked.use({ renderer });

const md = `
# 自定义标题示例

## 子标题
`;

const html = marked.parse(md);
console.log(html);

```

这样，你的标题就会被渲染成带有锚点链接的结构，比如：

```html
<h1 id="zi-ding-yi-biao-ti-shi-li">
  <a href="#zi-ding-yi-biao-ti-shi-li" class="header-anchor">#</a>
  自定义标题示例
</h1>

```

Hexo 的很多主题里，都会对代码块、标题、图片等做类似的自定义处理。

# 回到 Hexo：Hexo 是怎么用 marked 的？

1.扫描Markdown文件

- Hexo会扫描 `source/_post`下所有的`.md`文件
- 对每个文件读取内容，并解析其中的 Front-matter（YAML 头信息，比如 `title`, `date`, `tags` 等）。

2.调用Markdown渲染

- Hexo 根据配置选择使用哪个“渲染插件”（renderer）；

- 渲染插件内部则会调用 marked，把正文部分的 Markdown 转成 HTML。

3.将HTML填入主题模板

- Hexo 根据配置选择使用哪个“渲染插件”（renderer）；
- Hexo 把文章的 HTML 内容和元信息（标题、日期、标签）组合成最终的 HTML 结构。

4.写入静态文件

- 所有页面最终被写到 `public/` 目录

- 部署时只需把 `public` 目录上传到服务器或托管平台(如 Github Pages)

> Hexo 就是大量地帮你做 “读 Markdown → 调用 marked → 套模板 → 写 HTML 文件” 这件事

# 你已经学会使用Marked了，快编写一个自己的博客搭建程序吧
