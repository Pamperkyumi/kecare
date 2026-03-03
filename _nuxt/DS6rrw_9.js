import{a as e}from"./DbNIgRzX.js";import{d as r,c as i,o as s}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const l=r({__name:"39f6b230",setup(o){const t={lang:"ja-JP",title:"GitHub Pages",html:`<div class="kecare"><h1 id="github-pages-へのデプロイゼロから公開までにゃん">GitHub Pages へのデプロイ（ゼロから公開までにゃん〜）</h1>
<h2 id="0-何を準備する必要があるかリスト">0. 何を準備する必要があるか（リスト）</h2>
<ul>
<li>GitHubアカウント（自分で登録してくださいね）</li>
<li>ローカルに <strong>Git</strong> がインストール済み</li>
<li>ローカルに <strong>Node.js</strong> がインストール済み（依存関係のインストールとNuxtのビルドに使用）</li>
</ul>
<h2 id="1-github-で新しいリポジトリを作成する">1. GitHub で新しいリポジトリを作成する</h2>
<ol>
<li><p>GitHubにログイン</p>
</li>
<li><p>右上の <strong>New repository</strong></p>
</li>
<li><p>リポジトリ情報の入力：</p>
</li>
</ol>
<p>リポジトリ名：名前は自由に設定してね、何でもいいよ（多分</p>
<p>Publicを選んで、公開するにゃん</p>
<p>作成が完了すると、リポジトリのアドレスが得られます（後でGitをバインドする際に使用します）。</p>
<h2 id="2-ローカル-git-を-github-にバインドするssh-方式をお勧めしますにゃん">2. ローカル Git を GitHub に「バインド」する（SSH 方式をお勧めしますにゃん～）</h2>
<h3 id="21-sshキーの生成ローカル">2.1 SSHキーの生成（ローカル）</h3>
<p>ターミナルを開いて実行：</p>
<pre><code class="language-bash">ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;
</code></pre>
<p>エンターキーを押し続けるだけでOKですよ。問題に遭遇したら、GitHubの公式説明も同じ手順で、より詳細に書かれています👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?utm_source=chatgpt.com">クリックしてね</a></p>
<h3 id="22-githubに公開鍵を追加する">2.2 GitHubに公開鍵を追加する</h3>
<ol>
<li>ローカルマシンの公開鍵ファイルを開きます（通常は <strong>~/.ssh/id_ed25519.pub</strong>）</li>
<li>内容をコピーします（<strong><code>ssh-ed25519</code></strong> で始まる長いテキストです）</li>
<li>GitHubアカウント設定で <strong>SSHキーを追加</strong>（公開鍵を貼り付け）</li>
</ol>
<p>これはGitHub公式の「SSHキーの追加」手順です。GitHubの説明は私が書くよりずっと良いので👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?utm_source=chatgpt.com">ぜひクリックしてくださいにゃ</a></p>
<h3 id="23-ssh接続のテスト">2.3 SSH接続のテスト</h3>
<pre><code class="language-bash">ssh -T git@github.com
</code></pre>
<p>最初に指紋の確認を求められますので、<code>yes</code>と入力してください。ようこそメッセージが表示されたら成功ですよ～</p>
<h2 id="3-テーマコードをあなたのリポジトリにプッシュする">3. テーマコードをあなたのリポジトリにプッシュする</h2>
<p>以下は、すでにテーマディレクトリ（例：<code>Kecare-theme/</code>）があると仮定し、それを先ほど作成したリポジトリにプッシュする方法です。</p>
<h3 id="31-テーマディレクトリで-git-を初期化するまだリポジトリでない場合">3.1 テーマディレクトリで Git を初期化する（まだリポジトリでない場合）</h3>
<pre><code class="language-bash">cd &lt;你的主题目录&gt;
git init
git add -A
git commit -m &quot;init: theme&quot;
</code></pre>
<h3 id="32-リモートリポジトリの追加とプッシュ">3.2 リモートリポジトリの追加とプッシュ</h3>
<p>以下の <strong><code>&lt;user&gt;</code></strong> と <strong><code>&lt;repo&gt;</code></strong> をあなたの GitHub ユーザー名とリポジトリ名に置き換えてください：</p>
<pre><code class="language-bash">git branch -M main
git remote add origin git@github.com:&lt;user&gt;/&lt;repo&gt;.git
git push -u origin main
</code></pre>
<p>ここまでで、あなたのテーマコードはすでにGitHubリポジトリの <strong><code>main</code></strong> ブランチに表示されているはずですにゃ～</p>
<h2 id="4-nuxtサンプルテーマ">4. Nuxt（サンプルテーマ）</h2>
<blockquote>
<p>[!WARNING]
ご注意ください：異なるテーマのスキャフォールディングと技術スタック（言語/フレームワーク/ビルド方法）は全く異なる場合があるため、デプロイ方法も異なる可能性があります。このドキュメントは<strong>サンプルテーマ</strong>を例として説明しています——サンプルテーマは <strong>Nuxt</strong> を使用して構築されているため、文中の Nuxt ビルドとデプロイ手順は「本テーマ専用」です。実際のデプロイ前には、<strong>テーマ作者</strong>が提供するデプロイ説明と要件を優先的にご確認ください。</p>
</blockquote>
<p>GitHub Pages は静的サイトのみをサポートしており、Nuxt はアプリケーションを静的 HTML ファイルに事前レンダリングします。</p>
<h3 id="41-ベースurl">4.1 ベースURL</h3>
<p>カスタムドメインを使用していない場合、ビルドステップで <code>NUXT_APP_BASE_URL</code> をリポジトリ名に設定する必要があります。例： <code>https://&lt;user&gt;.github.io/&lt;repository&gt;/</code></p>
<p><code>NUXT_APP_BASE_URL=/&lt;リポジトリ&gt;/</code></p>
<p>Nuxt公式が明確にこの方法を要求していますにゃ、詳細は👉<a href="https://nuxt.com/deploy/github-pages">こちらをクリックにゃ</a></p>
<p>ただ、Nuxt.config.tsでbaseUrlを設定すればいいと思います。</p>
<pre><code class="language-ts">export default defineNuxtConfig({
  compatibilityDate: &#39;2025-07-15&#39;,
  devtools: { enabled: true },
  app: {
    baseURL: &#39;https://&lt;user&gt;.github.io/&lt;repository&gt;/&#39;,
    head: {
    },
  },
});
</code></pre>
<h3 id="5-テーマディレクトリに静的アセットを構築する">5. テーマディレクトリに静的アセットを構築する</h3>
<p><strong>テーマディレクトリ</strong>で実行していることを確認してください</p>
<pre><code class="language-bash">npm install
</code></pre>
<p>次に構築：</p>
<pre><code class="language-bash">npx nuxt build --preset github_pages
</code></pre>
<p>ビルドが完了すると、NuxtのGitHub Pagesプリセットは静的ファイルを次の場所に生成します：</p>
<pre><code class="language-txt">.output/public
</code></pre>
<p>これはNuxt公式が提供する出力パスです（後ほどこのディレクトリを公開します）。</p>
<h2 id="6-ビルド成果物を-gh-pages-ブランチに公開する">6. ビルド成果物を <code>gh-pages</code> ブランチに公開する</h2>
<p>テーマディレクトリで実行：</p>
<pre><code class="language-bash">npx gh-pages -d .output/public
</code></pre>
<p>それは <strong><code>.output/public</code></strong> を <strong><code>gh-pages</code></strong> ブランチにプッシュします（存在しない場合は自動的に作成されます）、初心者にとても適していますね～</p>
<h2 id="7-github-リポジトリで-pages-を有効にする">7. GitHub リポジトリで Pages を有効にする</h2>
<ol>
<li>リポジトリに移動 → <strong>Settings</strong></li>
</ol>
<ol start="2">
<li><p><strong>Pages</strong> を探す</p>
</li>
<li><p>リリース元（Source / Build and deployment）で選択：</p>
</li>
</ol>
<ul>
<li>ブランチ：<strong><code>gh-pages</code></strong></li>
<li>フォルダ：<strong><code>/ (root)</code></strong></li>
</ul>
<ol start="4">
<li>保存</li>
</ol>
<p>これもGithub公式の手順です👉<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com">やっぱり私をクリックしてねにゃ</a></p>
<p>保存後、しばらく待つと、GitHub があなたの Pages アドレスを表示します。例えば：</p>
<pre><code class="language-txt">https://&lt;user&gt;.github.io/&lt;repo&gt;/
</code></pre>
<p>その後アクセスすればいいにゃん</p>
<h2 id="よくある質問">よくある質問</h2>
<p>Q：自動デプロイ（毎回手動でビルド＋公開しなくてもいいように）は可能ですか？</p>
<p>A: はい、できます。Nuxt公式はGitHub Actionsのサンプルワークフローを提供しており、<code>.output/public</code>を自動的にアップロードしてPagesにデプロイできます。👉<a href="https://nuxt.com/deploy/github-pages">こちらですにゃ</a></p>
</div>`,menu:"test",isOriginalLang:!1,desc:"# 部署到 GitHub Pages（从 0 到上线喵~） ## 0. 你需要准备什么（清单） - 一个 GitHub 账号（自己注册喵） - 本地已安装 **Git** - 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt...",hash:"39f6b230",relativePath:"/Github pages.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"Github pages",menu:"test",tags:[],desc:"# 部署到 GitHub Pages（从 0 到上线喵~） ## 0. 你需要准备什么（清单） - 一个 GitHub 账号（自己注册喵） - 本地已安装 **Git** - 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
# 部署到 GitHub Pages（从 0 到上线喵~）\r
\r
## 0. 你需要准备什么（清单）\r
\r
- 一个 GitHub 账号（自己注册喵）\r
- 本地已安装 **Git**\r
- 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt）\r
\r
## 1. 在 GitHub 上新建仓库（Repository）\r
\r
1) 登录 GitHub  \r
\r
2) 右上角 **New repository**  \r
\r
3) 填写仓库信息：\r
\r
 Repository name：名字随意喵，都可以的喵（也许吧\r
\r
要选Public，要公开喵\r
\r
创建完成后，你会得到一个仓库地址（后面绑定 Git 会用到）。\r
\r
## 2. 让本地 Git “绑定”到 GitHub（推荐 SSH 方式喵~）\r
\r
### 2.1 生成 SSH Key（本地）\r
\r
打开终端执行：\r
\r
\`\`\`bash\r
ssh-keygen -t ed25519 -C "your_email@example.com"\r
\`\`\`\r
\r
一路回车即可捏。遇到问题看一下Github 官方说明也是这套流程，会更详细一点👉[点我喵](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?utm_source=chatgpt.com)\r
\r
### 2.2 把公钥添加到 GitHub\r
\r
1. 打开你本机的公钥文件（通常是 **~/.ssh/id_ed25519.pub**）\r
2. 复制内容（是一长串以 **\`ssh-ed25519\`** 开头的文本）\r
3. 在 GitHub 账号设置里 **添加 SSH key**（粘贴公钥）\r
\r
这是 GitHub 官方的“添加 SSH key”流程。看Github的肯定比我写的好，所以👉[还是点击我喵](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?utm_source=chatgpt.com)\r
\r
### 2.3 测试 SSH 连接\r
\r
\`\`\`bash\r
ssh -T git@github.com\r
\`\`\`\r
\r
首次会提示确认指纹，输入 \`yes\`。看到欢迎信息就表示成功捏~\r
\r
## 3. 把主题代码推到你的仓库\r
\r
下面假设你已经有一个主题目录（例如 \`Kecare-theme/\`），我们要把它推到刚才新建的仓库里。\r
\r
### 3.1 在主题目录初始化 Git（如果它还不是仓库)\r
\r
\`\`\`bash\r
cd <你的主题目录>\r
git init\r
git add -A\r
git commit -m "init: theme"\r
\`\`\`\r
\r
### 3.2 添加远程仓库并推送\r
\r
把下面的 **\`<user>\`** 和 **\`<repo>\`** 替换成你的 GitHub 用户名和仓库名：\r
\r
\`\`\`bash\r
git branch -M main\r
git remote add origin git@github.com:<user>/<repo>.git\r
git push -u origin main\r
\`\`\`\r
\r
到这里，你的主题代码应该已经出现在 GitHub 仓库的 **\`main\`** 分支里了喵~\r
\r
## 4. Nuxt（示例主题）\r
\r
> [!WARNING]\r
> 请注意：不同主题的脚手架与技术栈（语言/框架/构建方式）可能完全不同，因此部署方法也可能不同捏。本篇文档仅以**示例主题**为例进行演示——因为示例主题使用 **Nuxt** 搭建，所以文中的 Nuxt 构建部署步骤是“特制给本主题”的喵。实际部署前，请优先阅读**主题作者**提供的部署说明与要求喵~\r
\r
GitHub Pages 仅支持静态站点，Nuxt 会将您的应用程序预渲染为静态 HTML 文件。\r
\r
### 4.1 Base URL\r
\r
如果你没有使用自定义域名，需要在构建步骤中将 \`NUXT_APP_BASE_URL\` 设置为你的仓库名称。例如： \`https://<user>.github.io/<repository>/\` \r
\r
\`NUXT_APP_BASE_URL=/<repository>/\`\r
\r
Nuxt 官方明确要求这样做喵，详细请看👉[点我喵](https://nuxt.com/deploy/github-pages)\r
\r
不过我觉得，在Nuxt.config.ts中进行配置baseUrl就好了\r
\r
\`\`\`\`ts\r
export default defineNuxtConfig({\r
  compatibilityDate: '2025-07-15',\r
  devtools: { enabled: true },\r
  app: {\r
    baseURL: 'https://<user>.github.io/<repository>/',\r
    head: {\r
    },\r
  },\r
});\r
\`\`\`\`\r
\r
### 5. 在主题目录构建静态产物\r
\r
确保你在**主题目录**执行\r
\r
\`\`\`bash\r
npm install\r
\`\`\`\r
\r
然后构建：\r
\r
\`\`\`bash\r
npx nuxt build --preset github_pages\r
\`\`\`\r
\r
构建完成后，Nuxt 的 GitHub Pages preset 会生成静态文件到：\r
\r
\`\`\`\`txt\r
.output/public\r
\`\`\`\`\r
\r
这是 Nuxt 官方给出的输出路径（后面我们就发布这个目录）。\r
\r
## 6. 发布构建产物到 \`gh-pages\` 分支\r
\r
在主题目录执行：\r
\r
\`\`\`bash\r
npx gh-pages -d .output/public\r
\`\`\`\r
\r
它会把 **\`.output/public\`** 推送到 **\`gh-pages\`** 分支（若没有会自动创建），非常适合新手捏~\r
\r
## 7. 在 GitHub 仓库里启用 Pages\r
\r
1) 进入你的仓库 → **Settings**\r
\r
2. 找到 **Pages**\r
\r
3. 在发布源（Source / Build and deployment）里选择：\r
\r
- Branch：**\`gh-pages\`**\r
- Folder：**\`/ (root)\`**\r
\r
4) Save\r
\r
这也有Github 官方的流程👉[还是点击我喵](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com)\r
\r
保存后，稍等片刻，GitHub 会给出你的 Pages 地址，例如：\r
\r
\`\`\`txt\r
https://<user>.github.io/<repo>/\r
\`\`\`\r
\r
让后访问即可喵\r
\r
## FAQ\r
\r
Q：我能不能让它自动部署（不用每次手动 build + publish）？\r
\r
A: 可以。Nuxt 官方提供了 GitHub Actions 的示例工作流，能自动把 \`.output/public\` 上传并部署到 Pages。👉[这里喵](https://nuxt.com/deploy/github-pages)\r
\r
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(g,u)=>(s(),i(e,{article:t,navItems:n}))}});export{l as default};
