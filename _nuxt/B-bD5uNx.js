import{a as t}from"./DbNIgRzX.js";import{d as r,c as o,o as s}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const m=r({__name:"4ee23999",setup(a){const e={lang:"en-US",title:"Menu System",html:`<div class="kecare"><h1 id="menu">Menu</h1>
<div class="md-tabs" data-tabs id="md-tabs-3">
                <div class="md-tabs__nav" role="tablist" aria-label="Code Tabs"><button type="button" role="tab" id="md-tabs-3-tab-0" class="md-tabs__tab" data-tab="0" aria-selected="true" aria-controls="md-tabs-3-panel-0">typescript</button><button type="button" role="tab" id="md-tabs-3-tab-1" class="md-tabs__tab" data-tab="1" aria-selected="false" aria-controls="md-tabs-3-panel-1">javascript</button></div>
                <div class="md-tabs__panels"><div class="md-tabs__panel" role="tabpanel" id="md-tabs-3-panel-0" data-tab="0" aria-labelledby="md-tabs-3-tab-0" aria-hidden="false"><pre><code class="language-python">这是第一个标签页的内容。
- 可以包含 Markdown
- **加粗**、\`代码\`等
</code></pre>
</div>
<div class="md-tabs__panel" role="tabpanel" id="md-tabs-3-panel-1" data-tab="1" aria-labelledby="md-tabs-3-tab-1" aria-hidden="true" hidden><pre><code class="language-javascript">这是第二个标签页的内容。
1. 有序列表
2. 第二个项目
</code></pre>
</div></div>
                </div><pre><code class="language-js">export default {
  data () {
    return {
      msg: &#39;Removed&#39; // [!code --]
      msg: &#39;Added&#39; // [!code ++]
    }
  }
}
</code></pre>
<pre><code class="language-ts">console.log(&#39;Not focused&#39;);
console.log(&#39;Focused&#39;) // [!code focus]
console.log(&#39;Not focused&#39;);
</code></pre>
<pre><code class="language-ts">console.log(&#39;Not highlighted&#39;)
console.log(&#39;Highlighted&#39;) // [!code highlight]
console.log(&#39;Not highlighted&#39;)
</code></pre>
<p>Some people use blogs to write documentation (like the page you&#39;re reading right now), and usually, there&#39;s a menu bar/directory bar on the left to help with navigation.<br>So Kecare also provides a simpler, more unified way to write menus~ Where should the menu be placed?</p>
<h2 id="1-where-is-the-menu-located-meow">1. Where is the menu located, meow?</h2>
<p>In Kecare, menus also have <strong>fixed storage locations</strong>:</p>
<ul>
<li>Menu Directory: <strong>theme directory/.kecare/menus/</strong></li>
</ul>
<blockquote>
<p>✅ Only by placing it in this directory can Kecare scan and generate the corresponding menu meow~</p>
</blockquote>
<hr>
<h2 id="2-create-a-new-menu-file-naming-rules-are-very-important">2. Create a new menu file (Naming rules are very important)</h2>
<p>Create a new file under the menu directory: <strong><code>*.menu.source.ts</code></strong></p>
<p>For example:</p>
<ul>
<li><strong><code>kecare-docs.menu.source.ts</code></strong></li>
<li><strong><code>milkio-docs.menu.source.ts</code></strong></li>
</ul>
<blockquote>
<p>The filename prefix (e.g., <code>kecare-docs</code>) will become the <strong>menu</strong> you reference in the article&#39;s Front Matter. It&#39;s recommended to use English + hyphens for better stability meow~</p>
</blockquote>
<hr>
<h2 id="3-write-menu-content-export-navitems">3. Write Menu Content (Export navItems)</h2>
<h2 id="export-navitems-in-the-menu-file-with-the-type-navitem">Export <strong>navItems</strong> in the menu file, with the type <strong>NavItem[]</strong>:</h2>
<pre><code class="language-ts">import type { NavItem } from &quot;kecare&quot;;

export const navItems: NavItem[] = [
  {
    text: &quot;快速开始喵&quot;,
    level: 1,
    items: [
      {
        text: &quot;快速开始&quot;,
        link: &quot;./快速开始&quot;,
        level: 2,
      },
      {
        text: &quot;写作&quot;,
        link: &quot;./写作&quot;,
        level: 2,
      },
    ],
  },
  {
    text: &quot;自定义&quot;,
    level: 1,
    items: [
      {
        text: &quot;编写主题&quot;,
        link: &quot;./编写主题&quot;,
        level: 3,
      },
    ],
  },
];
</code></pre>
<h3 id="what-exactly-is-link">What exactly is <code>link</code>?</h3>
<p><strong>link</strong> refers to <strong>the path of the article to jump to</strong>~
Generally, it corresponds to your article page route (or article slug), and it&#39;s most common to write it in a relative form, for example:</p>
<ul>
<li><code>./Quick Start</code></li>
<li><code>./Writing</code></li>
</ul>
<h2 id="4-enable-the-menu-meow-in-the-article">4. Enable the Menu Meow in the Article</h2>
<p>Add <strong>menu</strong> to the Front Matter of the article <strong>.md</strong> where you need to display the menu:</p>
<pre><code class="language-yaml">---
menu: kecare-docs # 这里只写文件名前缀，不用写 .menu.source.ts 喵~
---
</code></pre>
<p>The corresponding menu file is:</p>
<ul>
<li><code>theme directory/.kecare/menus/kecare-docs.menu.source.ts</code></li>
</ul>
<blockquote>
<p>✅ Rule summary: The value of <strong>menu</strong> = the filename prefix of <strong>.menu.source.ts</strong>~</p>
</blockquote>
<hr>
<h2 id="5-navitem-structure-description-meow">5. NavItem Structure Description Meow</h2>
<p>In <strong>kecare</strong>, <strong>NavItem</strong> supports two types of nodes:</p>
<ul>
<li><strong>Leaf Node</strong>: Clickable for navigation (has <strong>link</strong>)</li>
<li><strong>Group Node</strong>: Serves only as a category (has <strong>items</strong>)</li>
</ul>
<p>Type definitions (reference):</p>
<pre><code class="language-ts">export type NavItem =
  | { text: string; link: string; level: number; desc?: string; icon?: string }
  | { text: string; items: NavItem[]; level: number };
</code></pre>
<h2 id="faq-meow-meow-meow">FAQ (Meow Meow Meow)</h2>
<ul>
<li><strong>Q: Can an article be associated with multiple menus?</strong>
Typically, an article is bound to only one <code>menu</code>. If multiple menus are needed, support from the theme side is required (e.g., merged rendering), nya~</li>
<li><strong>Q: Must the menu file be named <code>\\*.menu.source.ts</code>?</strong>
Yes, nya~ This is the naming convention for Kecare to scan menu files. Files not following this rule might not be recognized.</li>
</ul>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 菜单（Menu） ::: tabs @tab typescript ```python 这是第一个标签页的内容。 - 可以包含 Markdown - **加粗**、`代码`等 ``` @tab javascript ```javascr...",hash:"4ee23999",relativePath:"/菜单系统.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"菜单系统",menu:"test",tags:[],desc:"# 菜单（Menu） ::: tabs @tab typescript ```python 这是第一个标签页的内容。 - 可以包含 Markdown - **加粗**、`代码`等 ``` @tab javascript ```javascr...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 菜单（Menu）\r
\r
::: tabs\r
\r
@tab typescript\r
\r
\`\`\`python\r
这是第一个标签页的内容。\r
- 可以包含 Markdown\r
- **加粗**、\`代码\`等\r
\`\`\`\r
@tab javascript\r
\r
\`\`\`javascript\r
这是第二个标签页的内容。\r
1. 有序列表\r
2. 第二个项目\r
\`\`\`\r
:::\r
\r
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
\`\`\`ts\r
console.log('Not focused');\r
console.log('Focused') // [!code focus]\r
console.log('Not focused');\r
\`\`\`\r
\r
\`\`\`ts\r
console.log('Not highlighted')\r
console.log('Highlighted') // [!code highlight]\r
console.log('Not highlighted')\r
\`\`\`\r
\r
\r
有的人会拿博客来写文档（比如你现在读的这一页捏），通常左侧会有一个菜单栏/目录栏帮助跳转。  \r
所以 Kecare 也提供了一套更简单、更统一的菜单编写方式喵~菜单放在哪里？\r
\r
## 1. 菜单放在哪里喵？\r
\r
在 Kecare 中，菜单也有**固定存放位置**：\r
\r
- 菜单目录：**主题目录/.kecare/menus/**\r
\r
> ✅ 只要放在这个目录里，Kecare 才能扫描到并生成对应的菜单喵~\r
\r
------\r
\r
## 2. 新建菜单文件（命名规则很重要捏）\r
\r
在菜单目录下新建：**\`*.menu.source.ts\`**\r
\r
例如：\r
\r
- **\`kecare-docs.menu.source.ts\`**\r
- **\`milkio-docs.menu.source.ts\`**\r
\r
> 文件名前缀（如 \`kecare-docs\`）会成为你在文章 Front Matter 里引用的 **menu**，建议用英文 + 短横线更稳定喵~\r
\r
------\r
\r
## 3. 编写菜单内容（导出 navItems）\r
\r
## 在菜单文件里导出 **navItems**，类型为 **NavItem[]**：\r
\r
\`\`\`ts\r
import type { NavItem } from "kecare";\r
\r
export const navItems: NavItem[] = [\r
  {\r
    text: "快速开始喵",\r
    level: 1,\r
    items: [\r
      {\r
        text: "快速开始",\r
        link: "./快速开始",\r
        level: 2,\r
      },\r
      {\r
        text: "写作",\r
        link: "./写作",\r
        level: 2,\r
      },\r
    ],\r
  },\r
  {\r
    text: "自定义",\r
    level: 1,\r
    items: [\r
      {\r
        text: "编写主题",\r
        link: "./编写主题",\r
        level: 3,\r
      },\r
    ],\r
  },\r
];\r
\`\`\`\r
\r
### \`link\` 到底是什么？\r
\r
**link** 指的是**要跳转到的文章路径**哦~\r
一般来说它对应你的文章页面路由（或文章 slug），写成相对形式最常见，例如：\r
\r
- \`./快速开始\`\r
- \`./写作\`\r
\r
## 4. 在文章中启用菜单喵\r
\r
在需要显示菜单的文章 **.md** 的 Front Matter 里加 **menu**：\r
\r
\`\`\`yaml\r
---\r
menu: kecare-docs # 这里只写文件名前缀，不用写 .menu.source.ts 喵~\r
---\r
\`\`\`\r
\r
它对应的菜单文件是：\r
\r
- \`主题目录/.kecare/menus/kecare-docs.menu.source.ts\`\r
\r
> ✅ 规则总结：**menu** 的值 = **.menu.source.ts** 的文件名前缀捏~\r
\r
------\r
\r
## 5. NavItem 结构说明喵\r
\r
在 **kecare** 里，**NavItem** 支持两种节点：\r
\r
- **叶子节点**：可点击跳转（有 **link**）\r
- **分组节点**：仅作为分类（有 **items**）\r
\r
类型定义（参考）：\r
\r
\`\`\`ts\r
export type NavItem =\r
  | { text: string; link: string; level: number; desc?: string; icon?: string }\r
  | { text: string; items: NavItem[]; level: number };\r
\`\`\`\r
\r
## FAQ（喵喵喵）\r
\r
- **Q：一个文章能挂多个菜单吗？**\r
  通常一个文章只绑定一个 \`menu\`。如果要多个，需要主题侧支持（例如合并渲染），捏~\r
- **Q：菜单文件一定要叫 \`\\*.menu.source.ts\` 吗？**\r
  是的喵~ 这是 Kecare 扫描菜单文件的约定命名，不按规则可能不会被识别。\r
\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(l,i)=>(s(),o(t,{article:e,navItems:n}))}});export{m as default};
