import{a as e}from"./DbNIgRzX.js";import{d as r,c as d,o as s}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const m=r({__name:"5f065839",setup(a){const t={lang:"ja-JP",title:"フロントマター",html:`<div class="kecare"><h1 id="front-matter">Front Matter</h1>
<p>各記事の冒頭には、Front Matter（YAML形式）を記述することができます。これは、テーマが必要とするメタ情報（例：タイトル、日付、タグ、説明、著者、カバー画像、ピン留め、メニューなど）を提供するために使用されますにゃ～</p>
<h3 id="完全な例">完全な例</h3>
<pre><code class="language-yaml">title: 写作                 # 标题：不填则默认使用文件名（或主题的默认逻辑）
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
</code></pre>
<h2 id="フィールド説明推奨規約">フィールド説明（推奨規約）</h2>
<table>
<thead>
<tr>
<th>フィールド</th>
<th>タイプ</th>
<th>説明</th>
</tr>
</thead>
<tbody><tr>
<td><strong>title</strong></td>
<td>string</td>
<td>記事タイトル</td>
</tr>
<tr>
<td><strong>date</strong></td>
<td>string</td>
<td>記事日時（フォーマット推奨 YYYY-MM-DD）</td>
</tr>
<tr>
<td><strong>tags</strong></td>
<td>string[]</td>
<td>タグ配列</td>
</tr>
<tr>
<td><strong>desc</strong></td>
<td>string</td>
<td>要約</td>
</tr>
<tr>
<td><strong>author</strong></td>
<td>string</td>
<td>著者名</td>
</tr>
<tr>
<td><strong>coverSrc</strong></td>
<td>string</td>
<td>カバー/背景画像 URL</td>
</tr>
<tr>
<td><strong>sticky</strong></td>
<td>number</td>
<td>トピック固定優先度</td>
</tr>
<tr>
<td><strong>menu</strong></td>
<td>string</td>
<td>バインドメニュー key</td>
</tr>
</tbody></table>
</div>`,menu:"test",isOriginalLang:!1,desc:"# Front Matter 每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供主题可能需要的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等喵~ ### 完整示例 ```yaml title:...",hash:"5f065839",relativePath:"/front-matter.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"front-matter",menu:"test",tags:[],desc:"# Front Matter 每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供主题可能需要的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等喵~ ### 完整示例 ```yaml title:...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# Front Matter\r
\r
每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供主题可能需要的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等喵~\r
\r
### 完整示例\r
\r
\`\`\`yaml\r
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
\`\`\`\r
\r
## 字段说明（推荐约定捏）\r
| 字段 | 类型 | 描述 |\r
| --- | --- | --- |\r
| **title** | string | 文章标题 |\r
| **date** | string | 文章时间（格式建议 YYYY-MM-DD） |\r
| **tags** | string[] | 标签数组 |\r
| **desc** | string | 摘要 |\r
| **author** | string | 作者名 |\r
| **coverSrc** | string | 封面/背景图 URL |\r
| **sticky** | number | 置顶优先级 |\r
| **menu** | string | 绑定菜单 key |\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(l,o)=>(s(),d(e,{article:t,navItems:n}))}});export{m as default};
