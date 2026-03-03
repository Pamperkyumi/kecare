import{a as e}from"./DbNIgRzX.js";import{d as r,c as i,o as s}from"./D1LHy2jC.js";import"./anvSD_Ip.js";const c=r({__name:"39f6b230",setup(o){const t={lang:"zh-CN",title:"Github pages",html:`<div class="kecare"><h1 id="部署到-github-pages从-0-到上线喵">部署到 GitHub Pages（从 0 到上线喵~）</h1>
<h2 id="0-你需要准备什么清单">0. 你需要准备什么（清单）</h2>
<ul>
<li>一个 GitHub 账号（自己注册喵）</li>
<li>本地已安装 <strong>Git</strong></li>
<li>本地已安装 <strong>Node.js</strong>（用于安装依赖与构建 Nuxt）</li>
</ul>
<h2 id="1-在-github-上新建仓库repository">1. 在 GitHub 上新建仓库（Repository）</h2>
<ol>
<li><p>登录 GitHub  </p>
</li>
<li><p>右上角 <strong>New repository</strong>  </p>
</li>
<li><p>填写仓库信息：</p>
</li>
</ol>
<p> Repository name：名字随意喵，都可以的喵（也许吧</p>
<p>要选Public，要公开喵</p>
<p>创建完成后，你会得到一个仓库地址（后面绑定 Git 会用到）。</p>
<h2 id="2-让本地-git-绑定到-github推荐-ssh-方式喵">2. 让本地 Git “绑定”到 GitHub（推荐 SSH 方式喵~）</h2>
<h3 id="21-生成-ssh-key本地">2.1 生成 SSH Key（本地）</h3>
<p>打开终端执行：</p>
<pre><code class="language-bash">ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;
</code></pre>
<p>一路回车即可捏。遇到问题看一下Github 官方说明也是这套流程，会更详细一点👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?utm_source=chatgpt.com">点我喵</a></p>
<h3 id="22-把公钥添加到-github">2.2 把公钥添加到 GitHub</h3>
<ol>
<li>打开你本机的公钥文件（通常是 <strong>~/.ssh/id_ed25519.pub</strong>）</li>
<li>复制内容（是一长串以 <strong><code>ssh-ed25519</code></strong> 开头的文本）</li>
<li>在 GitHub 账号设置里 <strong>添加 SSH key</strong>（粘贴公钥）</li>
</ol>
<p>这是 GitHub 官方的“添加 SSH key”流程。看Github的肯定比我写的好，所以👉<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?utm_source=chatgpt.com">还是点击我喵</a></p>
<h3 id="23-测试-ssh-连接">2.3 测试 SSH 连接</h3>
<pre><code class="language-bash">ssh -T git@github.com
</code></pre>
<p>首次会提示确认指纹，输入 <code>yes</code>。看到欢迎信息就表示成功捏~</p>
<h2 id="3-把主题代码推到你的仓库">3. 把主题代码推到你的仓库</h2>
<p>下面假设你已经有一个主题目录（例如 <code>Kecare-theme/</code>），我们要把它推到刚才新建的仓库里。</p>
<h3 id="31-在主题目录初始化-git如果它还不是仓库">3.1 在主题目录初始化 Git（如果它还不是仓库)</h3>
<pre><code class="language-bash">cd &lt;你的主题目录&gt;
git init
git add -A
git commit -m &quot;init: theme&quot;
</code></pre>
<h3 id="32-添加远程仓库并推送">3.2 添加远程仓库并推送</h3>
<p>把下面的 <strong><code>&lt;user&gt;</code></strong> 和 <strong><code>&lt;repo&gt;</code></strong> 替换成你的 GitHub 用户名和仓库名：</p>
<pre><code class="language-bash">git branch -M main
git remote add origin git@github.com:&lt;user&gt;/&lt;repo&gt;.git
git push -u origin main
</code></pre>
<p>到这里，你的主题代码应该已经出现在 GitHub 仓库的 <strong><code>main</code></strong> 分支里了喵~</p>
<h2 id="4-nuxt示例主题">4. Nuxt（示例主题）</h2>
<blockquote>
<p>[!WARNING]
请注意：不同主题的脚手架与技术栈（语言/框架/构建方式）可能完全不同，因此部署方法也可能不同捏。本篇文档仅以<strong>示例主题</strong>为例进行演示——因为示例主题使用 <strong>Nuxt</strong> 搭建，所以文中的 Nuxt 构建部署步骤是“特制给本主题”的喵。实际部署前，请优先阅读<strong>主题作者</strong>提供的部署说明与要求喵~</p>
</blockquote>
<p>GitHub Pages 仅支持静态站点，Nuxt 会将您的应用程序预渲染为静态 HTML 文件。</p>
<h3 id="41-base-url">4.1 Base URL</h3>
<p>如果你没有使用自定义域名，需要在构建步骤中将 <code>NUXT_APP_BASE_URL</code> 设置为你的仓库名称。例如： <code>https://&lt;user&gt;.github.io/&lt;repository&gt;/</code> </p>
<p><code>NUXT_APP_BASE_URL=/&lt;repository&gt;/</code></p>
<p>Nuxt 官方明确要求这样做喵，详细请看👉<a href="https://nuxt.com/deploy/github-pages">点我喵</a></p>
<p>不过我觉得，在Nuxt.config.ts中进行配置baseUrl就好了</p>
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
<h3 id="5-在主题目录构建静态产物">5. 在主题目录构建静态产物</h3>
<p>确保你在<strong>主题目录</strong>执行</p>
<pre><code class="language-bash">npm install
</code></pre>
<p>然后构建：</p>
<pre><code class="language-bash">npx nuxt build --preset github_pages
</code></pre>
<p>构建完成后，Nuxt 的 GitHub Pages preset 会生成静态文件到：</p>
<pre><code class="language-txt">.output/public
</code></pre>
<p>这是 Nuxt 官方给出的输出路径（后面我们就发布这个目录）。</p>
<h2 id="6-发布构建产物到-gh-pages-分支">6. 发布构建产物到 <code>gh-pages</code> 分支</h2>
<p>在主题目录执行：</p>
<pre><code class="language-bash">npx gh-pages -d .output/public
</code></pre>
<p>它会把 <strong><code>.output/public</code></strong> 推送到 <strong><code>gh-pages</code></strong> 分支（若没有会自动创建），非常适合新手捏~</p>
<h2 id="7-在-github-仓库里启用-pages">7. 在 GitHub 仓库里启用 Pages</h2>
<ol>
<li>进入你的仓库 → <strong>Settings</strong></li>
</ol>
<ol start="2">
<li><p>找到 <strong>Pages</strong></p>
</li>
<li><p>在发布源（Source / Build and deployment）里选择：</p>
</li>
</ol>
<ul>
<li>Branch：<strong><code>gh-pages</code></strong></li>
<li>Folder：<strong><code>/ (root)</code></strong></li>
</ul>
<ol start="4">
<li>Save</li>
</ol>
<p>这也有Github 官方的流程👉<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com">还是点击我喵</a></p>
<p>保存后，稍等片刻，GitHub 会给出你的 Pages 地址，例如：</p>
<pre><code class="language-txt">https://&lt;user&gt;.github.io/&lt;repo&gt;/
</code></pre>
<p>让后访问即可喵</p>
<h2 id="faq">FAQ</h2>
<p>Q：我能不能让它自动部署（不用每次手动 build + publish）？</p>
<p>A: 可以。Nuxt 官方提供了 GitHub Actions 的示例工作流，能自动把 <code>.output/public</code> 上传并部署到 Pages。👉<a href="https://nuxt.com/deploy/github-pages">这里喵</a></p>
</div>`,isOriginalLang:!0,menu:"test",desc:"# 部署到 GitHub Pages（从 0 到上线喵~） ## 0. 你需要准备什么（清单） - 一个 GitHub 账号（自己注册喵） - 本地已安装 **Git** - 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt...",hash:"39f6b230",relativePath:"/Github pages.md",frontMatter:{cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",title:"Github pages",menu:"test",tags:[],desc:"# 部署到 GitHub Pages（从 0 到上线喵~） ## 0. 你需要准备什么（清单） - 一个 GitHub 账号（自己注册喵） - 本地已安装 **Git** - 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt...",translate:["zh-CN","en-US","ja-JP"]},cover:"https://pichost.cloud/files/944b71a32407dd671f9d09296c439efb3cfeb95341fd87cc9490470710bbbc76.webp",rawMarkdown:`\r
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
`},n=[{text:"入门指南",level:1,items:[{text:"Kecare从这里开始喵",link:"./70e6923c",level:2},{text:"快速开始",link:"./95bb100b",level:2},{text:"项目结构约定",link:"./a3b16d10",level:2}]},{text:"基本操作",level:1,items:[{text:"写作",link:"./6e8c5f0b",level:2},{text:"Markdown扩展",link:"./b40d18d1",level:2},{text:"菜单系统",link:"./4ee23999",level:2},{text:"国际化处理",link:"./493f5fa2",level:2}]},{text:"部署",level:1,items:[{text:"GitHub Pages",link:"./39f6b230",level:2}]},{text:"进阶",level:1,items:[{text:"生成器 CLI",level:2,items:[{text:"生成器CLI",link:"./fddd58bb",level:3},{text:"自定义生成器CLI",link:"./9e192d60",level:3}]}]},{text:"贡献与协作",level:1,items:[{text:"贡献指南",link:"./43fc313b",level:2}]}];return(u,g)=>(s(),i(e,{article:t,navItems:n}))}});export{c as default};
