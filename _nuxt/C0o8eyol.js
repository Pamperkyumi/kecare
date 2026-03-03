import{a as n}from"./DbNIgRzX.js";import{d as i,c as o,o as r}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const c=i({__name:"39f6b230",setup(s){const e={lang:"en-US",title:"Github pages",html:`<div class="kecare"><h1 id="deploy-to-github-pages-from-0-to-live-meow">Deploy to GitHub Pages (From 0 to Live Meow~)</h1>
<h2 id="0-what-you-need-to-prepare-checklist">0. What You Need to Prepare (Checklist)</h2>
<ul>
<li>A GitHub account (register it yourself meow)</li>
<li><strong>Git</strong> installed locally</li>
<li><strong>Node.js</strong> installed locally (for installing dependencies and building Nuxt)</li>
</ul>
<h2 id="1-create-a-new-repository-on-github">1. Create a New Repository on GitHub</h2>
<ol>
<li><p>Log in to GitHub</p>
</li>
<li><p><strong>New repository</strong> in the upper right corner</p>
</li>
<li><p>Fill in the repository information:</p>
</li>
</ol>
<p>Repository name: Any name is fine, meow, anything goes (maybe</p>
<p>Choose Public, make it public meow</p>
<p>After creation, you will receive a repository address (which will be used for Git binding later).</p>
<h2 id="2-bind-local-git-to-github-ssh-method-recommended-meow">2. Bind Local Git to GitHub (SSH Method Recommended Meow~)</h2>
<h3 id="21-generating-ssh-key-local">2.1 Generating SSH Key (Local)</h3>
<p>Open the terminal and execute:</p>
<pre><code class="language-bash">ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;
</code></pre>
<p>Just press Enter all the way. If you encounter any issues, take a look at the official GitHub documentation—it follows the same process and provides more details 👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?utm_source=chatgpt.com">Click me meow</a></p>
<h3 id="22-adding-the-public-key-to-github">2.2 Adding the Public Key to GitHub</h3>
<ol>
<li>Open your local public key file (usually <strong>~/.ssh/id_ed25519.pub</strong>)</li>
<li>Copy the content (it&#39;s a long string starting with <strong><code>ssh-ed25519</code></strong>)</li>
<li>In your GitHub account settings, <strong>add an SSH key</strong> (paste the public key)</li>
</ol>
<p>This is the official GitHub &quot;Add SSH key&quot; process. GitHub&#39;s documentation is definitely better than what I could write, so 👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?utm_source=chatgpt.com">just click me meow</a></p>
<h3 id="23-testing-ssh-connection">2.3 Testing SSH Connection</h3>
<pre><code class="language-bash">ssh -T git@github.com
</code></pre>
<p>First, you will be prompted to confirm the fingerprint; enter <code>yes</code>. Seeing the welcome message means success~</p>
<h2 id="3-push-the-theme-code-to-your-repository">3. Push the theme code to your repository</h2>
<p>Now, assuming you already have a theme directory (e.g., <code>Kecare-theme/</code>), we want to push it to the newly created repository.</p>
<h3 id="31-initialize-git-in-the-theme-directory-if-it39s-not-already-a-repository">3.1 Initialize Git in the Theme Directory (If It&#39;s Not Already a Repository)</h3>
<pre><code class="language-bash">cd &lt;你的主题目录&gt;
git init
git add -A
git commit -m &quot;init: theme&quot;
</code></pre>
<h3 id="32-adding-a-remote-repository-and-pushing">3.2 Adding a Remote Repository and Pushing</h3>
<p>Replace the following <strong><code>&lt;user&gt;</code></strong> and <strong><code>&lt;repo&gt;</code></strong> with your GitHub username and repository name:</p>
<pre><code class="language-bash">git branch -M main
git remote add origin git@github.com:&lt;user&gt;/&lt;repo&gt;.git
git push -u origin main
</code></pre>
<p>At this point, your theme code should already be in the <strong><code>main</code></strong> branch of the GitHub repository, meow~</p>
<h2 id="4-nuxt-example-theme">4. Nuxt (Example Theme)</h2>
<blockquote>
<p>[!WARNING]
Please note: The scaffolding and tech stack (language/framework/build method) may vary significantly between different themes, so the deployment methods may also be completely different. This document only uses the <strong>Example Theme</strong> for demonstration—because the Example Theme is built with <strong>Nuxt</strong>, the Nuxt build and deployment steps described here are &quot;customized for this theme&quot;. Before actual deployment, please prioritize reading the deployment instructions and requirements provided by the <strong>theme author</strong>.</p>
</blockquote>
<p>GitHub Pages only supports static sites, and Nuxt will pre-render your application into static HTML files.</p>
<h3 id="41-base-url">4.1 Base URL</h3>
<p>If you are not using a custom domain, you need to set <code>NUXT_APP_BASE_URL</code> to your repository name during the build step. For example: <code>https://&lt;user&gt;.github.io/&lt;repository&gt;/</code></p>
<p><code>NUXT_APP_BASE_URL=/&lt;repository&gt;/</code></p>
<p>Nuxt officially explicitly requires this meow, for details please see👉<a href="https://nuxt.com/deploy/github-pages">Click me meow</a></p>
<p>However, I think it&#39;s fine to configure the baseUrl in Nuxt.config.ts.</p>
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
<h3 id="5-building-static-assets-in-the-theme-directory">5. Building Static Assets in the Theme Directory</h3>
<p>Make sure you are executing in the <strong>theme directory</strong></p>
<pre><code class="language-bash">npm install
</code></pre>
<p>Then build:</p>
<pre><code class="language-bash">npx nuxt build --preset github_pages
</code></pre>
<p>After the build is complete, the Nuxt GitHub Pages preset will generate static files to:</p>
<pre><code class="language-txt">.output/public
</code></pre>
<p>This is the output path provided by Nuxt (we will publish this directory later).</p>
<h2 id="6-publish-build-artifacts-to-the-gh-pages-branch">6. Publish Build Artifacts to the <code>gh-pages</code> Branch</h2>
<p>Execute in the theme directory:</p>
<pre><code class="language-bash">npx gh-pages -d .output/public
</code></pre>
<p>It will push <strong><code>.output/public</code></strong> to the <strong><code>gh-pages</code></strong> branch (which will be automatically created if it doesn&#39;t exist), perfect for beginners~</p>
<h2 id="7-enable-pages-in-the-github-repository">7. Enable Pages in the GitHub Repository</h2>
<ol>
<li>Go to your repository → <strong>Settings</strong></li>
</ol>
<ol start="2">
<li><p>Find <strong>Pages</strong></p>
</li>
<li><p>In the Source / Build and deployment section, select:</p>
</li>
</ol>
<ul>
<li>Branch: <strong><code>gh-pages</code></strong></li>
<li>Folder: <strong><code>/ (root)</code></strong></li>
</ul>
<ol start="4">
<li>Save</li>
</ol>
<p>There is also the official GitHub process👉<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com">Still click me meow</a></p>
<p>After saving, wait a moment, and GitHub will provide your Pages address, for example:</p>
<pre><code class="language-txt">https://&lt;user&gt;.github.io/&lt;repo&gt;/
</code></pre>
<p>Then access it meow.</p>
<h2 id="faq">FAQ</h2>
<p>Q: Can I make it automatically deploy (without manually building + publishing each time)?</p>
<p>A: Yes. Nuxt officially provides example workflows for GitHub Actions that can automatically upload and deploy <code>.output/public</code> to Pages. 👉<a href="https://nuxt.com/deploy/github-pages">Click here meow</a></p>
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
`},t=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(a,l)=>(r(),o(n,{article:e,navItems:t}))}});export{c as default};
