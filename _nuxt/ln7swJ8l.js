import{a as r}from"./DbNIgRzX.js";import{d as t,c as a,o as l}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const d=t({__name:"95bb100b",setup(c){const e={lang:"ja-JP",title:"クイックスタート",html:`<div class="kecare"><h1 id="クイックスタート">クイックスタート</h1>
<p>もしあなたがKecareでブログを構築することを素早く体験したいだけで、すぐにジェネレーターの原理やカスタマイズ開発を研究するつもりがないなら、この記事に従ってローカルで実行できますよ。</p>
<h2 id="何を準備する必要がありますか">何を準備する必要がありますか</h2>
<h3 id="必須">必須</h3>
<ul>
<li><strong>Node.js</strong>：テーマの依存関係をインストールし、テーマ開発サーバー（通常は Nuxt/Vite など）を起動するために使用します</li>
<li><strong>テーマプロジェクト（Theme）</strong>：ページのレンダリングを担当しますにゃん</li>
</ul>
<h3 id="オプション推奨">オプション（推奨）</h3>
<ul>
<li><strong>Git</strong>：テーマリポジトリのクローンが便利です（なくても直接ZIPをダウンロードして解凍できますにゃ）</li>
</ul>
<h2 id="ステップ-1kecare-cli-のインストール">ステップ 1：Kecare CLI のインストール</h2>
<p>任意のディレクトリでターミナルを開き、実行：</p>
<pre><code class="language-bash">npm create kecare@beta
</code></pre>
<p>インストールが完了したら、確認してみてください：</p>
<pre><code class="language-bash">kecare -version
</code></pre>
<p>バージョン情報が表示されたら、インストール成功ですよ～</p>
<h2 id="ステップ-2サンプルテーマの取得nuxt">ステップ 2：サンプルテーマの取得（Nuxt）</h2>
<p>もしサンプルテーマを使用する場合は、cloneできます：</p>
<pre><code class="language-bash">git clone https://github.com/Pamperkyumi/Kecare-theme.git
cd Kecare-theme
</code></pre>
<blockquote>
<p>Gitがインストールされていない場合は、テーマリポジトリをzipでダウンロードして解凍し、テーマディレクトリに移動すればOKです。</p>
</blockquote>
<h2 id="ステップ-3依存関係のインストール">ステップ 3：依存関係のインストール</h2>
<p><strong>テーマディレクトリ</strong>で実行：</p>
<p><code>npm install</code></p>
<pre><code class="language-bash">npm install kecare@beta
</code></pre>
<blockquote>
<p>あなたは pnpm/yarn/bun を使って依存関係をインストールすることもできますにゃ～</p>
</blockquote>
<h2 id="ステップ-4kecare-ジェネレーターを実行する重要なコマンドですにゃ">ステップ 4：Kecare ジェネレーターを実行する（重要なコマンドですにゃ）</h2>
<p>今では手動で exe を探す必要はなく、kecare コマンドでジェネレーターを直接実行できます：</p>
<pre><code class="language-bash">kecare gen &lt;主题路径&gt;
</code></pre>
<p>例えば、現在テーマディレクトリ内にいる場合、直接以下のように書けます：</p>
<pre><code class="language-bash">kecare gen .
</code></pre>
<p>他のディレクトリにいる場合は、絶対パスまたは相対パスを書くことができます：</p>
<pre><code class="language-bash">kecare gen ./Kecare-theme
</code></pre>
<h2 id="ステップ-5起動成功の確認">ステップ 5：起動成功の確認</h2>
<p>すべてが正常であれば、次のような出力が表示されます：</p>
<pre><code class="language-bash">$ nuxt dev
● Nuxt x.x.x ...
➜ Local: http://localhost:3000/
</code></pre>
<p>ブラウザを開いてアクセス：</p>
<pre><code class="language-txt">http://localhost:3000/
</code></pre>
<p>サイトのホームページが見えるということは、もう起動できているということですね ✅</p>
<h3 id="faq先に助けてにゃん">FAQ(先に助けてにゃん)</h3>
<p>私にはわかりません、ごめんなさいにゃ</p>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 快速开始 如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。 ## 你需要准备什么 ### 必需 - **Node.js**：用于安装主题依赖、启动主题开发服务器（通常是...",hash:"95bb100b",relativePath:"/快速开始.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"快速开始",menu:"test",tags:[],desc:"# 快速开始 如果你只是想快速体验 Kecare 搭建博客，不打算立刻研究生成器原理或二次开发——照着这篇做就能在本地跑起来捏。 ## 你需要准备什么 ### 必需 - **Node.js**：用于安装主题依赖、启动主题开发服务器（通常是...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
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
