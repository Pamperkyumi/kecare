import{a as t}from"./DbNIgRzX.js";import{d as e,c as a,o as s}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const b=e({__name:"b40d18d1",setup(o){const n={lang:"ja-JP",title:"markdown拡張",html:`<div class="kecare"><h1 id="markdown拡張">Markdown拡張</h1>
<h2 id="frontmatter">Frontmatter</h2>
<p>YAMLフロントマターはすぐに使える</p>
<pre><code>---
title: 写作                 # 标题：不填则默认使用文件名（或主题的默认逻辑）
date: 2025-11-19            # 日期：不填则会使用文件的最后修改时间
tags:                       # 标签：不填则表示没有标签
  - kecare
  - blog
desc: 这是一段简介           # 简介：用于首页/落地页文章卡片；不填可用正文开头截取
author: 作者                # 作者：不填则为空
coverSrc: &quot;https://example.com/cover.webp&quot; # 封面/背景图：不填则使用主题默认图
sticky: 1                   # 置顶：数字越大越靠前；不填则按日期倒序
menu: kecare-docs           # 菜单 key：用于挂载左侧菜单
translate: [&#39;zh-CN&#39;, &#39;en-US&#39;, &#39;ja-JP&#39;]  #用于国际化处理
---
</code></pre>
<p>これらのデータは、すべてのカスタムおよびテーマコンポーネントと共に、ページの残りの部分で使用されます。</p>
<h2 id="コードブロックのシンタックスハイライト">コードブロックのシンタックスハイライト</h2>
<p>Markdown コードブロックで Shiki を使用して、色付きテキストで言語のシンタックスハイライトを実現します。Shiki は多数のプログラミング言語をサポートしています。コードブロックの開始バッククォートの後に有効な言語エイリアスを追加するだけで使用できます。</p>
<p>例えば</p>
<pre><code class="language-js">export default {
  name: &#39;MyComponent&#39;,
  // ...
}
</code></pre>
<h2 id="コードブロック内の行ハイライト">コードブロック内の行ハイライト</h2>
<p><strong>Input 入力</strong></p>
<pre><code>\`\`\`js{4}
export default {
  data () {
    return {
      msg: &#39;Highlighted!&#39;
    }
  }
}
\`\`\`
</code></pre>
<p>あるいは</p>
<pre><code>\`\`\`js
export default {
  data () {
    return {
      msg: &#39;Highlighted!&#39; // [!code highlight]
    }
  }
}
\`\`\`
</code></pre>
<p><strong>Output 出力</strong></p>
<pre><code class="language-js">export default {
  data () {
    return {
      msg: &#39;Highlighted!&#39; // [!code highlight]
    }
  }
}
</code></pre>
<p>単一行だけでなく、複数の単一行、範囲、またはその両方を指定することもできます：</p>
<p>行範囲：例えば <strong>{5-8}</strong> 、 <strong>{3-10}</strong> 、 <strong>{10-17}</strong></p>
<p>複数の単一行：例えば <strong>{4,7,9}</strong></p>
<p>行範囲と単一行：例 <strong>{4,7-13,16,23-27,40}</strong></p>
<h2 id="コードブロックに焦点を当てる">コードブロックに焦点を当てる</h2>
<p>ある行に <strong>// [!code focus]</strong> コメントを追加すると、その行に焦点が当たり、コードの他の部分がぼやけます。</p>
<p><strong>Input 入力</strong></p>
<pre><code>\`\`\`js
export default {
  data () {
    return {
      msg: &#39;Focused!&#39; // [!code focus]
    }
  }
}
\`\`\`
</code></pre>
<p><strong>Output 出力</strong></p>
<pre><code class="language-js">export default {
  data () {
    return {
      msg: &#39;Focused!&#39; // [!code focus]
    }
  }
}
</code></pre>
<h2 id="コードブロック内のカラー差分表示">コードブロック内のカラー差分表示</h2>
<p>行に <strong>// [!code --]</strong> または <strong>// [!code ++]</strong> コメントを追加すると、コードブロックの色を保ちながら、その行の差分が作成されます。</p>
<p><strong>Input 入力</strong></p>
<pre><code>\`\`\`js
export default {
  data () {
    return {
      msg: &#39;Removed&#39; // [!code --]
      msg: &#39;Added&#39; // [!code ++]
    }
  }
}
\`\`\`
</code></pre>
<p><strong>Output 出力</strong></p>
<pre><code class="language-js">export default {
  data () {
    return {
      msg: &#39;Removed&#39; // [!code --]
      msg: &#39;Added&#39; // [!code ++]
    }
  }
}
</code></pre>
<h2 id="グループ分け">グループ分け</h2>
<p>このように複数のコードブロックをグループ化できます：</p>
<p><strong>Input 入力</strong></p>
<pre><code class="language-js">::: tabs

@tab 这是第一个标题

这是第一个标签页的内容。
- 可以包含 Markdown
- **加粗**,*斜体*等

@tab 这是第二个标题

这是第二个标签页的内容。
1. 有序列表
2. 第二个项目

:::

::: tabs

@tab js[config.js]

\`\`\`js
/**
 * @type {import(&#39;vitepress&#39;).UserConfig}
 */
const config = {
  // ...
}

export default config
\`\`\`

@tab ts[config.ts]

\`\`\`ts [config.ts]
import type { UserConfig } from &#39;vitepress&#39;

const config: UserConfig = {
  // ...
}

export default config
\`\`\`
:::
</code></pre>
<p><strong>Output 出力</strong></p>
<div class="md-tabs" data-tabs id="md-tabs-7">
                <div class="md-tabs__nav" role="tablist" aria-label="Code Tabs"><button type="button" role="tab" id="md-tabs-7-tab-0" class="md-tabs__tab" data-tab="0" aria-selected="true" aria-controls="md-tabs-7-panel-0">これは最初のタイトルです。</button><button type="button" role="tab" id="md-tabs-7-tab-1" class="md-tabs__tab" data-tab="1" aria-selected="false" aria-controls="md-tabs-7-panel-1">これは2番目の見出しです</button></div>
                <div class="md-tabs__panels"><div class="md-tabs__panel" role="tabpanel" id="md-tabs-7-panel-0" data-tab="0" aria-labelledby="md-tabs-7-tab-0" aria-hidden="false"><p>これは最初のタブの内容です。</p>
<ul>
<li>Markdownを含めることができます</li>
<li><strong>太字</strong>,<em>斜体</em>など</li>
</ul>
</div>
<div class="md-tabs__panel" role="tabpanel" id="md-tabs-7-panel-1" data-tab="1" aria-labelledby="md-tabs-7-tab-1" aria-hidden="true" hidden><p>これは2番目のタブの内容です。</p>
<ol>
<li>順序付きリスト</li>
<li>2番目の項目</li>
</ol>
</div></div>
                </div><div class="md-tabs" data-tabs id="md-tabs-8">
                <div class="md-tabs__nav" role="tablist" aria-label="Code Tabs"><button type="button" role="tab" id="md-tabs-8-tab-0" class="md-tabs__tab" data-tab="0" aria-selected="true" aria-controls="md-tabs-8-panel-0">js[config.js]</button><button type="button" role="tab" id="md-tabs-8-tab-1" class="md-tabs__tab" data-tab="1" aria-selected="false" aria-controls="md-tabs-8-panel-1">ts[config.ts]</button></div>
                <div class="md-tabs__panels"><div class="md-tabs__panel" role="tabpanel" id="md-tabs-8-panel-0" data-tab="0" aria-labelledby="md-tabs-8-tab-0" aria-hidden="false"><pre><code class="language-js">/**
 * @type {import(&#39;vitepress&#39;).UserConfig}
 */
const config = {
  // ...
}

export default config
</code></pre>
</div>
<div class="md-tabs__panel" role="tabpanel" id="md-tabs-8-panel-1" data-tab="1" aria-labelledby="md-tabs-8-tab-1" aria-hidden="true" hidden><pre><code class="language-ts">import type { UserConfig } from &#39;vitepress&#39;

const config: UserConfig = {
  // ...
}

export default config
</code></pre>
</div></div>
                </div></div>`,menu:"test",isOriginalLang:!1,desc:"# Markdown扩展 ## Frontmatter YAML frontmatter 开箱即用 ```` --- title: 写作 # 标题：不填则默认使用文件名（或主题的默认逻辑） date: 2025-11-19 # 日期：不填则...",hash:"b40d18d1",relativePath:"/markdown扩展.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"markdown扩展",menu:"test",tags:[],desc:"# Markdown扩展 ## Frontmatter YAML frontmatter 开箱即用 ```` --- title: 写作 # 标题：不填则默认使用文件名（或主题的默认逻辑） date: 2025-11-19 # 日期：不填则...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`# Markdown扩展\r
\r
## Frontmatter\r
\r
YAML frontmatter 开箱即用\r
\r
\`\`\`\`\r
---\r
title: 写作                 # 标题：不填则默认使用文件名（或主题的默认逻辑）\r
date: 2025-11-19            # 日期：不填则会使用文件的最后修改时间\r
tags:                       # 标签：不填则表示没有标签\r
  - kecare\r
  - blog\r
desc: 这是一段简介           # 简介：用于首页/落地页文章卡片；不填可用正文开头截取\r
author: 作者                # 作者：不填则为空\r
coverSrc: "https://example.com/cover.webp" # 封面/背景图：不填则使用主题默认图\r
sticky: 1                   # 置顶：数字越大越靠前；不填则按日期倒序\r
menu: kecare-docs           # 菜单 key：用于挂载左侧菜单\r
translate: ['zh-CN', 'en-US', 'ja-JP']  #用于国际化处理\r
---\r
\`\`\`\`\r
\r
这些数据将与所有自定义和主题组件一起，供页面其余部分使用。\r
\r
## 代码块中的语法高亮\r
\r
使用 Shiki 在 Markdown 代码块中通过彩色文本实现语言语法高亮。Shiki 支持多种编程语言。您只需在代码块的起始反引号后添加有效的语言别名即可\r
\r
例如\r
\r
\`\`\`\`js\r
export default {\r
  name: 'MyComponent',\r
  // ...\r
}\r
\`\`\`\`\r
\r
## 代码块中的行高亮\r
\r
**Input 输入**\r
\r
\`\`\`\`\r
\`\`\`js{4}\r
export default {\r
  data () {\r
    return {\r
      msg: 'Highlighted!'\r
    }\r
  }\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
亦或是\r
\r
\`\`\`\`\r
\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Highlighted!' // [!code highlight]\r
    }\r
  }\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
**Output 输出**\r
\r
\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Highlighted!' // [!code highlight]\r
    }\r
  }\r
}\r
\`\`\`\r
\r
除了单行之外，你还可以指定多个单行、范围或两者结合：\r
\r
行范围：例如 **{5-8}** 、 **{3-10}** 、 **{10-17}**\r
\r
多个单行：例如 **{4,7,9}**\r
\r
行范围和单行：例如 **{4,7-13,16,23-27,40}**\r
\r
## 聚焦于代码块\r
\r
在某行添加 **// [!code focus]** 注释将聚焦该行并模糊代码的其他部分。\r
\r
**Input 输入**\r
\r
\`\`\`\`\r
\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Focused!' // [!code focus]\r
    }\r
  }\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
**Output 输出**\r
\r
\`\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Focused!' // [!code focus]\r
    }\r
  }\r
}\r
\`\`\`\`\r
\r
## 代码块中的彩色差异显示\r
\r
在行上添加 **// [!code --]** 或 **// [!code ++]** 注释将创建该行的差异，同时保留代码块的颜色。\r
\r
**Input 输入**\r
\r
\`\`\`\`\r
\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Removed' // [!code --]\r
      msg: 'Added' // [!code ++]\r
    }\r
  }\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
**Output 输出**\r
\r
\`\`\`js\r
export default {\r
  data () {\r
    return {\r
      msg: 'Removed' // [!code --]\r
      msg: 'Added' // [!code ++]\r
    }\r
  }\r
}\r
\`\`\`\r
\r
## 分组\r
\r
你可以像这样对多个代码块进行分组：\r
\r
**Input 输入**\r
\r
\`\`\`\`js\r
::: tabs\r
\r
@tab 这是第一个标题\r
\r
这是第一个标签页的内容。\r
- 可以包含 Markdown\r
- **加粗**,*斜体*等\r
\r
@tab 这是第二个标题\r
\r
这是第二个标签页的内容。\r
1. 有序列表\r
2. 第二个项目\r
\r
:::\r
\r
::: tabs\r
\r
@tab js[config.js]\r
\r
\`\`\`js\r
/**\r
 * @type {import('vitepress').UserConfig}\r
 */\r
const config = {\r
  // ...\r
}\r
\r
export default config\r
\`\`\`\r
\r
@tab ts[config.ts]\r
\r
\`\`\`ts [config.ts]\r
import type { UserConfig } from 'vitepress'\r
\r
const config: UserConfig = {\r
  // ...\r
}\r
\r
export default config\r
\`\`\`\r
:::\r
\r
\`\`\`\`\r
\r
**Output 输出**\r
\r
::: tabs\r
\r
@tab 这是第一个标题。\r
\r
这是第一个标签页的内容。\r
- 可以包含 Markdown\r
- **加粗**,*斜体*等\r
\r
@tab 这是第二个标题\r
\r
这是第二个标签页的内容。\r
1. 有序列表\r
2. 第二个项目\r
\r
:::\r
\r
\r
\r
::: tabs\r
\r
@tab js[config.js]\r
\r
\`\`\`js\r
/**\r
 * @type {import('vitepress').UserConfig}\r
 */\r
const config = {\r
  // ...\r
}\r
\r
export default config\r
\`\`\`\r
\r
@tab ts[config.ts]\r
\r
\`\`\`ts [config.ts]\r
import type { UserConfig } from 'vitepress'\r
\r
const config: UserConfig = {\r
  // ...\r
}\r
\r
export default config\r
\`\`\`\r
:::\r
`},r=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(d,l)=>(s(),a(t,{article:n,navItems:r}))}});export{b as default};
