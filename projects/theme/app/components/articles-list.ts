/*
 * 更新时间：2025-11-22T10:02:16.542Z
 */
export const articles = [
    {
        "id": "a",
        "title": "a",
        "desc": "测试",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>测试</p>\n",
        "createdAt": "1763050953525",
        "author": "Pamper",
        "to": "/articles/a"
    },
    {
        "id": "hello-world",
        "title": "HelloWorld",
        "desc": "Hello World",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>Welcome to <a href=\"http://zespia.tw/hexo\">Hexo</a>! This is your very first post. Check <a href=\"http://zespia.tw/hexo/docs\">documentation</a> to learn how to use.</p>\n<p>纪念一下此避难所复活日期</p>\n",
        "createdAt": "1762613962901",
        "author": "Pamper",
        "to": "/articles/hello-world"
    },
    {
        "id": "Markdown是怎么「变」成网页的？",
        "title": "论md文件是如何渲染到网页上中的",
        "desc": "Markdown是怎么「变」成网页的？ 现在很多人都会用 Hexo 、 VuePress 、 Docsify 等工具来搭建自己的博客或文档站，只需要写写 .md 文件，然后敲几行命令，最终就能在浏览器里看到漂亮的文章页面。 但中间到底发生了...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1>Markdown是怎么「变」成网页的？</h1>\n<p>现在很多人都会用 <a href=\"https://hexo.io\">Hexo</a>、<a href=\"https://vuepress.vuejs.org/\">VuePress</a>、<a href=\"https://docsify.js.org/#/\">Docsify</a> 等工具来搭建自己的博客或文档站，只需要写写 <code>.md</code> 文件，然后敲几行命令，最终就能在浏览器里看到漂亮的文章页面。</p>\n<p>但中间到底发生了什么？</p>\n<p>核心的一环就是：<strong>把 Markdown 文本解析成 HTML</strong>。而在 Hexo 的默认配置中，这件事就是交给一个叫 <strong>marked</strong> 的库来完成的（或者说，很多主题/插件都在用它）。</p>\n<h1><a href=\"https://marked.nodejs.cn/\">Marked</a> 是什么？</h1>\n<p>简单讲</p>\n<blockquote>\n<p><strong>marked 是一个用 JavaScript 编写的 Markdown 解析器和编译器</strong>，可以把 Markdown 字符串转化为 HTML 字符串。</p>\n</blockquote>\n<p>它有几个特点:</p>\n<ul>\n<li>纯JS编写，既可以在Node.js环境使用，也可以在浏览器端使用</li>\n<li>速度快，社区广泛，生态成熟</li>\n<li>支持自定义渲染</li>\n</ul>\n<h1>安装与使用</h1>\n<h2>1.安装(需要Node.js环境)</h2>\n<pre><code class=\"language-bash\">bun install marked\n\nnpm install marked\n\nyarn add marked\n\npnpm add marked\n</code></pre>\n<h2>2最简单的使用例子</h2>\n<p>新建一个<code>mdtext.js</code></p>\n<pre><code class=\"language-js\">// 引入 marked\nimport { marked } from &quot;marked&quot;;\n\n\nconst mdText = `\n#这是你的一篇Markdown喵\n# Heading level 1\n## Heading level 2\n### Heading level 3\n这是 **加粗** 的文字\n&gt; 这是引用喵\n-这是列表1\n-这是列表2\n\\`\\`\\` js\nconsole.log(&quot;Hello Markdown&quot;);\n\\`\\`\\`\n`\n// 使用 marked 将 Markdown 转换为 HTML\nconst html = marked(mdText)\nconsole.log(html)\n</code></pre>\n<p>让后在终端执行<code>node mdtext.js</code></p>\n<p>你会在控制台看到这样的输出</p>\n<pre><code class=\"language-html\">&lt;p&gt;#这是你的一篇Markdown喵&lt;/p&gt;\n&lt;h1&gt;Heading level 1&lt;/h1&gt;\n&lt;h2&gt;Heading level 2&lt;/h2&gt;\n&lt;h3&gt;Heading level 3&lt;/h3&gt;\n&lt;p&gt;这是 &lt;strong&gt;加粗&lt;/strong&gt; 的文字&lt;/p&gt;\n&lt;blockquote&gt;\n&lt;p&gt;这是引用喵\n-这是列表1\n-这是列表2&lt;/p&gt;\n&lt;/blockquote&gt;\n&lt;pre&gt;&lt;code class=&quot;language-js&quot;&gt;console.log(&amp;quot;Hello Markdown&amp;quot;);\n&lt;/code&gt;&lt;/pre&gt;\n</code></pre>\n<p>到这为止，你已经体验到了marked的作用以及核心</p>\n<blockquote>\n<p>marked 输入的是 Markdown 字符串,输出的是 Html 字符串</p>\n</blockquote>\n<h3>3 在网页中使用 marked 并渲染</h3>\n<p>上面的例子只是“打印出 HTML”，真正显示在浏览器里，还需要配合 DOM。</p>\n<p>如果你的项目还比较简单，没有打包工具，也可以直接通过 CDN：</p>\n<p>新建一个.html文件,在其中写入</p>\n<pre><code class=\"language-html\">&lt;script src=&quot;https://cdn.jsdelivr.net/npm/marked/marked.min.js&quot;&gt;&lt;/script&gt;\n\n&lt;div id=&quot;content&quot;&gt;&lt;/div&gt;\n\n&lt;script&gt;\n    const mdText = `\n#这是你的一篇Markdown喵\n# Heading level 1\n## Heading level 2\n### Heading level 3\n这是 **加粗** 的文字\n&gt; 这是引用喵\n-这是列表1\n-这是列表2\n\\`\\`\\` js\nconsole.log(&quot;Hello Markdown&quot;);\n\\`\\`\\`\n`\nconst html = marked.parse(mdText);\n// 把生成的 HTML 填入 div\ndocument.getElementById(&quot;content&quot;).innerHTML = html;\n&lt;/script&gt;\n</code></pre>\n<p>保存，并打开html文件，你就能直观的看到</p>\n<p>Markdown → HTML → DOM 渲染流程</p>\n<h1>Marked在内部做了什么</h1>\n<p>在获取Markdown文本后，调用marked进行解析，marked内部会做两件事</p>\n<ul>\n<li>词法分析（Lexer）：把 Markdown 文本拆成一个个 Token（标题、段落、列表、代码块等）</li>\n<li>语法分析 + 渲染（Parser + Renderer）：把这些 Token 转成 HTML 字符串。</li>\n</ul>\n<p>Node 端生成 HTML 后，Hexo 会把 HTML 写入最终生成的 <code>.html</code> 文件；浏览器会把HTML插入到DOM中最后被浏览器渲染</p>\n<h1>自定义渲染器</h1>\n<p>很多时候，博客主题希望对 Markdown 渲染出来的 HTML 做更细致的控制，比如</p>\n<ul>\n<li>标题前加上一个图标；</li>\n<li>为每个标题生成一个带 <code>id</code> 的锚点，用于目录/跳转；</li>\n<li>自定义代码块结构，配合前端的高亮插件（Prism.js / highlight.js 等）。</li>\n</ul>\n<p>marked 提供了一个叫 <strong>Renderer</strong> 的机制，让你可以覆写某些“渲染规则”。</p>\n<pre><code class=\"language-js\">import { marked } from &quot;marked&quot;;\n\n// 创建一个 renderer 实例\nconst renderer = new marked.Renderer();\nrenderer.heading = function (text, level, raw, slugger) {\n  // slugger 可以根据标题文本生成一个 id\n  const id = slugger.slug(raw); \n\n  return `\n    &lt;h${level} id=&quot;${id}&quot;&gt;\n      &lt;a href=&quot;#${id}&quot; class=&quot;header-anchor&quot;&gt;#&lt;/a&gt;\n      ${text}\n    &lt;/h${level}&gt;\n  `;\n};\n\nmarked.use({ renderer });\n\nconst md = `\n# 自定义标题示例\n\n## 子标题\n`;\n\nconst html = marked.parse(md);\nconsole.log(html);\n</code></pre>\n<p>这样，你的标题就会被渲染成带有锚点链接的结构，比如：</p>\n<pre><code class=\"language-html\">&lt;h1 id=&quot;zi-ding-yi-biao-ti-shi-li&quot;&gt;\n  &lt;a href=&quot;#zi-ding-yi-biao-ti-shi-li&quot; class=&quot;header-anchor&quot;&gt;#&lt;/a&gt;\n  自定义标题示例\n&lt;/h1&gt;\n</code></pre>\n<p>Hexo 的很多主题里，都会对代码块、标题、图片等做类似的自定义处理。</p>\n<h1>回到 Hexo：Hexo 是怎么用 marked 的？</h1>\n<p>1.扫描Markdown文件</p>\n<ul>\n<li>Hexo会扫描 <code>source/_post</code>下所有的<code>.md</code>文件</li>\n<li>对每个文件读取内容，并解析其中的 Front-matter（YAML 头信息，比如 <code>title</code>, <code>date</code>, <code>tags</code> 等）。</li>\n</ul>\n<p>2.调用Markdown渲染</p>\n<ul>\n<li><p>Hexo 根据配置选择使用哪个“渲染插件”（renderer）；</p>\n</li>\n<li><p>渲染插件内部则会调用 marked，把正文部分的 Markdown 转成 HTML。</p>\n</li>\n</ul>\n<p>3.将HTML填入主题模板</p>\n<ul>\n<li>Hexo 根据配置选择使用哪个“渲染插件”（renderer）；</li>\n<li>Hexo 把文章的 HTML 内容和元信息（标题、日期、标签）组合成最终的 HTML 结构。</li>\n</ul>\n<p>4.写入静态文件</p>\n<ul>\n<li><p>所有页面最终被写到 <code>public/</code> 目录</p>\n</li>\n<li><p>部署时只需把 <code>public</code> 目录上传到服务器或托管平台(如 Github Pages)</p>\n</li>\n</ul>\n<blockquote>\n<p>Hexo 就是大量地帮你做 “读 Markdown → 调用 marked → 套模板 → 写 HTML 文件” 这件事</p>\n</blockquote>\n<h1>你已经学会使用Marked了，快编写一个自己的博客搭建程序吧</h1>\n",
        "createdAt": "1763803279013",
        "author": "Pamper",
        "to": "/articles/Markdown是怎么「变」成网页的？"
    },
    {
        "id": "实时翻译",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1>对于Ai翻译功能实现的一些小思路</h1>\n<h2>实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2>可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2>由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "createdAt": "1763048610822",
        "author": "Pamper",
        "to": "/articles/实时翻译"
    },
    {
        "id": "翻译测试文章 copy 2",
        "title": "翻译测试喵",
        "desc": "渐进式框架 Ai实时翻译功能喵，应该可能大概也许没有问题吧( 请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h2>渐进式框架<a href=\"https://cn.vuejs.org/guide/introduction.html#the-progressive-framework\"></a></h2>\n<h2>Ai实时翻译功能喵，应该可能大概也许没有问题吧(</h2>\n<h2>请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi</h2>\n<!-- TRANSLATE_START -->\n\n<p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：</p>\n<ul>\n<li>无需构建步骤，渐进式增强静态的 HTML</li>\n<li>在任何页面中作为 Web Components 嵌入</li>\n<li>单页应用 (SPA)</li>\n<li>全栈 / 服务端渲染 (SSR)</li>\n<li>Jamstack / 静态站点生成 (SSG)</li>\n<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>\n</ul>\n<p>如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。</p>\n<p>如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在<a href=\"https://cn.vuejs.org/guide/extras/ways-of-using-vue.html\">使用 Vue 的多种方式</a>中讨论了有关它们的更多细节。</p>\n<p>无论再怎么灵活，Vue 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。</p>\n<!-- TRANSLATE_END -->\n\n",
        "createdAt": "1763048607354",
        "author": "Pamper",
        "to": "/articles/翻译测试文章 copy 2"
    },
    {
        "id": "翻译测试文章 copy",
        "title": "翻译测试喵",
        "desc": "渐进式框架 Ai实时翻译功能喵，应该可能大概也许没有问题吧( 请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h2>渐进式框架<a href=\"https://cn.vuejs.org/guide/introduction.html#the-progressive-framework\"></a></h2>\n<h2>Ai实时翻译功能喵，应该可能大概也许没有问题吧(</h2>\n<h2>请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi</h2>\n<!-- TRANSLATE_START -->\n\n<p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：</p>\n<ul>\n<li>无需构建步骤，渐进式增强静态的 HTML</li>\n<li>在任何页面中作为 Web Components 嵌入</li>\n<li>单页应用 (SPA)</li>\n<li>全栈 / 服务端渲染 (SSR)</li>\n<li>Jamstack / 静态站点生成 (SSG)</li>\n<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>\n</ul>\n<p>如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。</p>\n<p>如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在<a href=\"https://cn.vuejs.org/guide/extras/ways-of-using-vue.html\">使用 Vue 的多种方式</a>中讨论了有关它们的更多细节。</p>\n<p>无论再怎么灵活，Vue 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。</p>\n<!-- TRANSLATE_END -->\n\n",
        "createdAt": "1763296111139",
        "author": "Pamper",
        "to": "/articles/翻译测试文章 copy"
    },
    {
        "id": "翻译测试文章",
        "title": "翻译测试喵",
        "desc": "渐进式框架 Ai实时翻译功能喵，应该可能大概也许没有问题吧( 请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h2>渐进式框架<a href=\"https://cn.vuejs.org/guide/introduction.html#the-progressive-framework\"></a></h2>\n<h2>Ai实时翻译功能喵，应该可能大概也许没有问题吧(</h2>\n<h2>请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi</h2>\n<!-- TRANSLATE_START -->\n\n<p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：</p>\n<ul>\n<li>无需构建步骤，渐进式增强静态的 HTML</li>\n<li>在任何页面中作为 Web Components 嵌入</li>\n<li>单页应用 (SPA)</li>\n<li>全栈 / 服务端渲染 (SSR)</li>\n<li>Jamstack / 静态站点生成 (SSG)</li>\n<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>\n</ul>\n<p>如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。</p>\n<p>如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在<a href=\"https://cn.vuejs.org/guide/extras/ways-of-using-vue.html\">使用 Vue 的多种方式</a>中讨论了有关它们的更多细节。</p>\n<p>无论再怎么灵活，Vue 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。</p>\n<!-- TRANSLATE_END -->\n\n",
        "createdAt": "1763048607354",
        "author": "Pamper",
        "to": "/articles/翻译测试文章"
    }
];