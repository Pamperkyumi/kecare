import{a as t}from"./DbNIgRzX.js";import{d as r,c as a,o}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const p=r({__name:"493f5fa2",setup(i){const e={lang:"en-US",title:"Internationalization Handling",html:`<div class="kecare"><h1 id="internationalization-processing">Internationalization Processing</h1>
<h2 id="why-is-internationalization-needed">Why is Internationalization Needed?</h2>
<p>I firmly believe that every thoughtfully written article deserves to be seen by more people and to transcend language barriers, reaching readers all over the world. It is precisely this belief that drives Kecare to thoughtfully provide internationalization support for you, enabling your content to effortlessly reach a global audience.</p>
<h2 id="how-to-configure-translation-functionality">How to Configure Translation Functionality</h2>
<h3 id="1-enable-translation">1. Enable Translation</h3>
<p>Add a field <code>translate</code> in the front-matter of the article that needs translation, and fill in the language code you want to translate into, for example: en-US (English-United States), ja-JP (Japanese-Japan), etc. Please try to adhere to the country language code reference table.</p>
<p><strong>The first field must be the current language field</strong></p>
<pre><code class="language-yaml">translate: [&#39;zh-CN&#39;,&#39;en-US&#39;, &#39;ja-JP&#39;]
</code></pre>
<p>That&#39;s good then</p>
<p>Here are some commonly used language codes:</p>
<table>
<thead>
<tr>
<th>Language</th>
<th>Code</th>
</tr>
</thead>
<tbody><tr>
<td>English</td>
<td>en-US</td>
</tr>
<tr>
<td>Japanese</td>
<td>ja-JP</td>
</tr>
<tr>
<td>Korean</td>
<td>ko-KR</td>
</tr>
<tr>
<td>French</td>
<td>fr-FR</td>
</tr>
<tr>
<td>German</td>
<td>de-DE</td>
</tr>
<tr>
<td>Russian</td>
<td>ru-RU</td>
</tr>
<tr>
<td>Portuguese</td>
<td>pt-BR</td>
</tr>
</tbody></table>
<h3 id="2-create-configuration-file">2. Create Configuration File</h3>
<p>You only need to create a configuration file <strong>kecare.config.ts</strong> in the <strong>.kecare</strong> directory.</p>
<h3 id="3-configure-translation-parameters">3. Configure Translation Parameters</h3>
<p>Export the <code>TranslationConfig</code> configuration object in the file, as shown in the following example:</p>
<pre><code class="language-ts">export async function kecareConfig() {
    return {
        llm: {
            model: &#39;deepseek-chat&#39;,
            apiKey: &#39;sk-&#39;,
            apiBaseUrl: &#39;https://api.deepseek.com/v1&#39;,
            prompt: &#39;&#39; //额外的提示词 可选
        }
    };
}
</code></pre>
<p>Built-in a system prompt</p>
<pre><code class="language-text">你是一个很好用的翻译助手，请帮我将下面的文章翻译成英语，
注意：千万不要增删任何 HTML标签/属性和markdown标签/属性,你如果看到markdown标签，
如果是代码块的内容，请不要翻译，只翻译文本节点。
如果是代码内容，请不要翻译，原样放回。保留链接 href、图片 src、id、class 不动。
注意：代码块占位符（如 __CODE_BLOCK_0__）不要翻译，原样保留。
</code></pre>
<h2 id="token">token</h2>
<p>We are well aware that the token cost for AI translation can be significant. Therefore, we have specifically designed multiple optimization measures to help you maximize savings on token consumption:</p>
<ul>
<li><strong>Segmented Translation</strong>: Intelligently segments the Markdown article and submits each segment to AI for translation.</li>
<li><strong>Caching Mechanism</strong>: Translation results are automatically cached in the <strong>.kecare/.tmp</strong> directory.</li>
<li><strong>Incremental Updates</strong>: During the next build, the system automatically detects which paragraphs have been modified and only retranslates the changed parts.</li>
<li><strong>Efficiency Improvement</strong>: Not only saves token costs but also significantly improves build efficiency.</li>
</ul>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 国际化处理 ## 为什么需要国际化？ 我始终相信，每一篇用心撰写的文章都值得被更多人看见，值得跨越语言的界限，被全世界的读者所阅读。正是出于这样的信念，Kecare 贴心地为你准备了国际化处理，让你的内容能够轻松触达全球受众。 ## 如...",hash:"493f5fa2",relativePath:"/国际化处理.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"国际化处理",menu:"test",tags:[],desc:"# 国际化处理 ## 为什么需要国际化？ 我始终相信，每一篇用心撰写的文章都值得被更多人看见，值得跨越语言的界限，被全世界的读者所阅读。正是出于这样的信念，Kecare 贴心地为你准备了国际化处理，让你的内容能够轻松触达全球受众。 ## 如...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
#  国际化处理\r
\r
## 为什么需要国际化？\r
\r
我始终相信，每一篇用心撰写的文章都值得被更多人看见，值得跨越语言的界限，被全世界的读者所阅读。正是出于这样的信念，Kecare 贴心地为你准备了国际化处理，让你的内容能够轻松触达全球受众。\r
\r
## 如何配置翻译功能\r
\r
### 1. 启用翻译\r
在需要翻译的文章的front-matter中添加一个字段\`translate\`，并填写你需要翻译的语言代码，例如：en-US（英语-美国）、ja-JP（日语-日本）等。请尽量遵守国家语言代码对照表。\r
\r
**第一个字段一定要是当前语言的字段**\r
\r
\`\`\`yaml\r
translate: ['zh-CN','en-US', 'ja-JP']\r
\`\`\`\r
就好了捏\r
\r
以下是一些常用的语言代码：\r
| 语言 | 代码 |\r
| --- | --- |\r
| 英语 | en-US |\r
| 日语 | ja-JP |\r
| 韩语 | ko-KR |\r
| 法语 | fr-FR |\r
| 德语 | de-DE |\r
| 俄语 | ru-RU |\r
| 葡萄牙语 | pt-BR |\r
\r
### 2. 创建配置文件\r
\r
你只需在 **.kecare** 目录下创建配置文件**kecare.config.ts**\r
### 3. 配置翻译参数\r
\r
在文件中导出 \`TranslationConfig\` 配置对象，示例如下：\r
\r
\`\`\`ts\r
export async function kecareConfig() {\r
    return {\r
        llm: {\r
            model: 'deepseek-chat',\r
            apiKey: 'sk-',\r
            apiBaseUrl: 'https://api.deepseek.com/v1',\r
            prompt: '' //额外的提示词 可选\r
        }\r
    };\r
}\r
\`\`\`\r
内置了一个系统提示词\r
\`\`\`text\r
你是一个很好用的翻译助手，请帮我将下面的文章翻译成英语，\r
注意：千万不要增删任何 HTML标签/属性和markdown标签/属性,你如果看到markdown标签，\r
如果是代码块的内容，请不要翻译，只翻译文本节点。\r
如果是代码内容，请不要翻译，原样放回。保留链接 href、图片 src、id、class 不动。\r
注意：代码块占位符（如 __CODE_BLOCK_0__）不要翻译，原样保留。\r
\`\`\`\r
## token\r
\r
我们深知 AI 翻译的 token 成本不菲，因此特别设计了多重优化措施，帮助你最大化节省 token 消耗：\r
\r
- **分段翻译**：将 Markdown 文章进行智能分段，逐段提交给 AI 进行翻译\r
- **缓存机制**：翻译结果会自动缓存在 **.kecare/.tmp** 目录下\r
- **增量更新**：下次构建时，系统会自动检测哪些段落被修改，只需重新翻译变更部分\r
- **效率提升**：不仅节省了 token 成本，还大大提高了构建效率\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(l,s)=>(o(),a(t,{article:e,navItems:n}))}});export{p as default};
