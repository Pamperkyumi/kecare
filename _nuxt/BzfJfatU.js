import{a as r}from"./DbNIgRzX.js";import{d as t,c as a,o as l}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const d=t({__name:"95bb100b",setup(c){const e={lang:"zh-CN",title:"快速开始",html:`<div class="kecare"><h1 id="快速开始">快速开始</h1>
<p>如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。</p>
<h2 id="你需要准备什么">你需要准备什么</h2>
<h3 id="必需">必需</h3>
<ul>
<li><strong>Node.js</strong>：用于安装主题依赖、启动主题开发服务器（通常是 Nuxt/Vite 之类）</li>
<li><strong>一个主题项目（Theme）</strong>：负责渲染页面喵</li>
</ul>
<h3 id="可选推荐">可选（推荐）</h3>
<ul>
<li><strong>Git</strong>：方便克隆主题仓库（没有也可以直接下载压缩包解压喵）</li>
</ul>
<h2 id="第-1-步安装-kecare-cli">第 1 步：安装 Kecare CLI</h2>
<p>在任意目录打开终端，执行：</p>
<pre><code class="language-bash">npm create kecare@beta
</code></pre>
<p>安装完成后，你可以验证一下：</p>
<pre><code class="language-bash">kecare -version
</code></pre>
<p>如果能输出版本信息，就说明安装成功啦捏</p>
<h2 id="第-2-步获取示例主题nuxt">第 2 步：获取示例主题（Nuxt）</h2>
<p>如果你使用示例主题，可以 clone：</p>
<pre><code class="language-bash">git clone https://github.com/Pamperkyumi/Kecare-theme.git
cd Kecare-theme
</code></pre>
<blockquote>
<p>如果你没装 Git，也可以把主题仓库下载 zip 解压，然后进入主题目录即可捏。</p>
</blockquote>
<h2 id="第-3-步安装依赖">第 3 步：安装依赖</h2>
<p>在<strong>主题目录</strong>里执行：</p>
<p><code>npm install</code></p>
<pre><code class="language-bash">npm install kecare@beta
</code></pre>
<blockquote>
<p>你也可以用 pnpm/yarn/bun 来装依赖喵~</p>
</blockquote>
<h2 id="第-4-步运行-kecare-生成器关键命令喵">第 4 步：运行 Kecare 生成器（关键命令喵）</h2>
<p>现在你不需要手动找 exe 了，直接用 kecare 命令运行生成器即可：</p>
<pre><code class="language-bash">kecare gen &lt;主题路径&gt;
</code></pre>
<p>例如你当前就在主题目录里，可以直接写：</p>
<pre><code class="language-bash">kecare gen .
</code></pre>
<p>如果你在别的目录，可以写绝对路径或相对路径：</p>
<pre><code class="language-bash">kecare gen ./Kecare-theme
</code></pre>
<h2 id="第-5-步确认启动成功">第 5 步：确认启动成功</h2>
<p>如果一切正常，你会看到类似输出：</p>
<pre><code class="language-bash">$ nuxt dev
● Nuxt x.x.x ...
➜ Local: http://localhost:3000/
</code></pre>
<p>打开浏览器访问：</p>
<pre><code class="language-txt">http://localhost:3000/
</code></pre>
<p>能看到站点首页就说明你已经跑起来了捏 ✅</p>
<h3 id="faq先救命喵">FAQ(先救命喵)</h3>
<p>我不知道喵，对不起喵</p>
</div>`,isOriginalLang:!0,menu:"test",desc:"# 快速开始 如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。 ## 你需要准备什么 ### 必需 - **Node.js**：用于安装主题依赖、启动主题开发服务器（通常是...",hash:"95bb100b",relativePath:"/快速开始.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"快速开始",menu:"test",tags:[],desc:"# 快速开始 如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。 ## 你需要准备什么 ### 必需 - **Node.js**：用于安装主题依赖、启动主题开发服务器（通常是...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 快速开始\r
\r
如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。\r
\r
## 你需要准备什么\r
\r
### 必需\r
- **Node.js**：用于安装主题依赖、启动主题开发服务器（通常是 Nuxt/Vite 之类）\r
- **一个主题项目（Theme）**：负责渲染页面喵\r
\r
### 可选（推荐）\r
- **Git**：方便克隆主题仓库（没有也可以直接下载压缩包解压喵）\r
\r
## 第 1 步：安装 Kecare CLI\r
\r
在任意目录打开终端，执行：\r
\r
\`\`\`bash\r
npm create kecare@beta\r
\`\`\`\r
安装完成后，你可以验证一下：\r
\`\`\`bash\r
kecare -version\r
\`\`\`\r
如果能输出版本信息，就说明安装成功啦捏\r
\r
## 第 2 步：获取示例主题（Nuxt）\r
\r
如果你使用示例主题，可以 clone：\r
\r
\`\`\`bash\r
git clone https://github.com/Pamperkyumi/Kecare-theme.git\r
cd Kecare-theme\r
\`\`\`\r
> 如果你没装 Git，也可以把主题仓库下载 zip 解压，然后进入主题目录即可捏。\r
\r
## 第 3 步：安装依赖\r
\r
在**主题目录**里执行：\r
\r
\`npm install\`\r
\r
\`\`\`bash\r
npm install kecare@beta\r
\`\`\`\r
\r
> 你也可以用 pnpm/yarn/bun 来装依赖喵~\r
\r
## 第 4 步：运行 Kecare 生成器（关键命令喵）\r
\r
现在你不需要手动找 exe 了，直接用 kecare 命令运行生成器即可：\r
\`\`\`bash\r
kecare gen <主题路径>\r
\`\`\`\r
例如你当前就在主题目录里，可以直接写：\r
\`\`\`bash\r
kecare gen .\r
\`\`\`\r
如果你在别的目录，可以写绝对路径或相对路径：\r
\`\`\`bash\r
kecare gen ./Kecare-theme\r
\`\`\`\r
\r
## 第 5 步：确认启动成功\r
\r
如果一切正常，你会看到类似输出：\r
\r
\`\`\`bash\r
$ nuxt dev\r
● Nuxt x.x.x ...\r
➜ Local: http://localhost:3000/\r
\`\`\`\r
\r
打开浏览器访问：\r
\r
\`\`\`\`txt\r
http://localhost:3000/\r
\`\`\`\`\r
\r
能看到站点首页就说明你已经跑起来了捏 ✅\r
\r
\r
### FAQ(先救命喵)\r
\r
我不知道喵，对不起喵\r
\r
\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(s,p)=>(l(),a(r,{article:e,navItems:n}))}});export{d as default};
