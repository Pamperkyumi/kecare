        <script setup lang="ts">
        import BlogLanding from "../components/blog-landing.vue";
        const articles =  [
    {
        "id": "a6b39477",
        "title": "对不同标签的CSS",
        "desc": "这是h1 这是h2 这是h3 这是一个引用块 (blockquote)。 无序列表 (ul) 项目 A 项目 B 项目 C 有序列表 (ol) 第一步 第二步 第三步 超链接 (1): 点击访问 Gooooooogle 表格 姓名 年龄 张...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"这是h1\">这是h1</h1>\n<h2 id=\"这是h2\">这是h2</h2>\n<h3 id=\"这是h3\">这是h3</h3>\n<blockquote>\n<p>这是一个引用块 (blockquote)。</p>\n</blockquote>\n<h3 id=\"无序列表-ul\">无序列表 (ul)</h3>\n<ul>\n<li>项目 A</li>\n<li>项目 B</li>\n<li>项目 C</li>\n</ul>\n<h3 id=\"有序列表-ol\">有序列表 (ol)</h3>\n<ol>\n<li>第一步</li>\n<li>第二步</li>\n<li>第三步</li>\n</ol>\n<p><strong>超链接 (1):</strong> <a href=\"https://www.google.com\">点击访问 Gooooooogle</a></p>\n<h3 id=\"表格\">表格</h3>\n<table>\n<thead>\n<tr>\n<th><strong>姓名</strong></th>\n<th><strong>年龄</strong></th>\n<th></th>\n</tr>\n</thead>\n<tbody><tr>\n<td>张三</td>\n<td>114514</td>\n<td></td>\n</tr>\n<tr>\n<td>李四</td>\n<td>1919810</td>\n<td></td>\n</tr>\n</tbody></table>\n<p>代码块</p>\n<p>行内代码 <code>bun install</code></p>\n<p>块级代码</p>\n<pre><code class=\"language-javascript\">function greet(name){\n    console.log(`hello, ${name}!`)\n}\ngreet(&#39;world&#39;)\n</code></pre>\n<p>数学公式</p>\n<p>行内公式 <span class=\"katex\"><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.8974em;vertical-align:-0.0833em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">a</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.8141em;\"><span style=\"top:-3.063em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.8141em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">b</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.8141em;\"><span style=\"top:-3.063em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.8141em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">c</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.8141em;\"><span style=\"top:-3.063em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span></span>。</p>\n<p>块级公式</p>\n<p><span class=\"katex-display\"><span class=\"katex\"><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.4306em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:2.2764em;vertical-align:-0.686em;\"></span><span class=\"mord\"><span class=\"mopen nulldelimiter\"></span><span class=\"mfrac\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.5904em;\"><span style=\"top:-2.314em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"mord\"><span class=\"mord\">2</span><span class=\"mord mathnormal\">a</span></span></span><span style=\"top:-3.23em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"frac-line\" style=\"border-bottom-width:0.04em;\"></span></span><span style=\"top:-3.677em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"mord\"><span class=\"mord\">−</span><span class=\"mord mathnormal\">b</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mbin\">±</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mord sqrt\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.9134em;\"><span class=\"svg-align\" style=\"top:-3em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"mord\" style=\"padding-left:0.833em;\"><span class=\"mord\"><span class=\"mord mathnormal\">b</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.7401em;\"><span style=\"top:-2.989em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mbin\">−</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mord\">4</span><span class=\"mord mathnormal\">a</span><span class=\"mord mathnormal\">c</span></span></span><span style=\"top:-2.8734em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"hide-tail\" style=\"min-width:0.853em;height:1.08em;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400em\" height=\"1.08em\" viewBox=\"0 0 400000 1080\" preserveAspectRatio=\"xMinYMin slice\"><path d=\"M95,702\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl0 -0\nc5.3,-9.3,12,-14,20,-14\nH400000v40H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM834 80h400000v40h-400000z\"/></svg></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.1266em;\"><span></span></span></span></span></span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.686em;\"><span></span></span></span></span></span><span class=\"mclose nulldelimiter\"></span></span></span></span></span></span></p>\n",
        "date": "2025-12-29",
        "author": "Pamper",
        "to": "/articles/a6b39477",
        "headings": [
            {
                "depth": 1,
                "text": "这是h1",
                "id": "这是h1",
                "children": [
                    {
                        "depth": 2,
                        "text": "这是h2",
                        "id": "这是h2"
                    }
                ]
            }
        ],
        "menudata": null
    },
    {
        "id": "6ff21319",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"对于ai翻译功能实现的一些小思路\">对于Ai翻译功能实现的一些小思路</h1>\n<h2 id=\"实现此功能所需要\">实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2 id=\"可选功能喵\">可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2 id=\"由于我很懒因为也没人看所以我只叙述一下大概的方法吧\">由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "date": "2025-12-28",
        "author": "Pamper",
        "to": "/articles/6ff21319",
        "headings": [
            {
                "depth": 1,
                "text": "对于Ai翻译功能实现的一些小思路",
                "id": "对于ai翻译功能实现的一些小思路",
                "children": [
                    {
                        "depth": 2,
                        "text": "实现此功能所需要",
                        "id": "实现此功能所需要"
                    },
                    {
                        "depth": 2,
                        "text": "可选功能喵",
                        "id": "可选功能喵"
                    },
                    {
                        "depth": 2,
                        "text": "由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。",
                        "id": "由于我很懒因为也没人看所以我只叙述一下大概的方法吧"
                    }
                ]
            }
        ],
        "menu": "docs",
        "menudata": [
            {
                "text": "这是第一个导航栏",
                "level": 1,
                "items": [
                    {
                        "text": "切换显示",
                        "link": "./aaa",
                        "level": 2
                    },
                    {
                        "text": "标题",
                        "link": "./222",
                        "level": 2
                    }
                ]
            },
            {
                "text": "API",
                "level": 1,
                "items": [
                    {
                        "text": "www",
                        "link": "./333",
                        "level": 3
                    }
                ]
            }
        ]
    },
    {
        "id": "9ca5866a",
        "title": "翻译测试喵",
        "desc": "渐进式框架 Ai实时翻译功能喵，应该可能大概也许没有问题吧( 请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h2 id=\"渐进式框架\">渐进式框架</h2>\n<h2 id=\"ai实时翻译功能喵应该可能大概也许没有问题吧\">Ai实时翻译功能喵，应该可能大概也许没有问题吧(</h2>\n<h2 id=\"请通过点击右上角右上角翻译测试如果有问题不要拷打我喵如果可以以后可能会出教程bushi\">请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi</h2>\n<!-- TRANSLATE_START -->\n\n<p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：</p>\n<ul>\n<li>无需构建步骤，渐进式增强静态的 HTML</li>\n<li>在任何页面中作为 Web Components 嵌入</li>\n<li>单页应用 (SPA)</li>\n<li>全栈 / 服务端渲染 (SSR)</li>\n<li>Jamstack / 静态站点生成 (SSG)</li>\n<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>\n</ul>\n<p>如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。</p>\n<p>如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在<a href=\"https://cn.vuejs.org/guide/extras/ways-of-using-vue.html\">使用 Vue 的多种方式</a>中讨论了有关它们的更多细节。</p>\n<p>无论再怎么灵活，Vue 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。</p>\n<!-- TRANSLATE_END -->\n\n",
        "date": "2025-12-28",
        "author": "Pamper",
        "to": "/articles/9ca5866a",
        "headings": [
            {
                "depth": 2,
                "text": "渐进式框架",
                "id": "渐进式框架"
            },
            {
                "depth": 2,
                "text": "Ai实时翻译功能喵，应该可能大概也许没有问题吧(",
                "id": "ai实时翻译功能喵应该可能大概也许没有问题吧"
            },
            {
                "depth": 2,
                "text": "请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi",
                "id": "请通过点击右上角右上角翻译测试如果有问题不要拷打我喵如果可以以后可能会出教程bushi"
            }
        ],
        "menu": null,
        "menudata": null
    },
    {
        "id": "5b34633d",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"对于ai翻译功能实现的一些小思路\">对于Ai翻译功能实现的一些小思路</h1>\n<h2 id=\"实现此功能所需要\">实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2 id=\"可选功能喵\">可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2 id=\"由于我很懒因为也没人看所以我只叙述一下大概的方法吧\">由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "date": "2025-12-25",
        "author": "Pamper",
        "to": "/articles/5b34633d",
        "headings": [
            {
                "depth": 1,
                "text": "对于Ai翻译功能实现的一些小思路",
                "id": "对于ai翻译功能实现的一些小思路",
                "children": [
                    {
                        "depth": 2,
                        "text": "实现此功能所需要",
                        "id": "实现此功能所需要"
                    },
                    {
                        "depth": 2,
                        "text": "可选功能喵",
                        "id": "可选功能喵"
                    },
                    {
                        "depth": 2,
                        "text": "由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。",
                        "id": "由于我很懒因为也没人看所以我只叙述一下大概的方法吧"
                    }
                ]
            }
        ],
        "menu": "docs",
        "menudata": [
            {
                "text": "这是第一个导航栏",
                "level": 1,
                "items": [
                    {
                        "text": "切换显示",
                        "link": "./aaa",
                        "level": 2
                    },
                    {
                        "text": "标题",
                        "link": "./222",
                        "level": 2
                    }
                ]
            },
            {
                "text": "API",
                "level": 1,
                "items": [
                    {
                        "text": "www",
                        "link": "./333",
                        "level": 3
                    }
                ]
            }
        ]
    },
    {
        "id": "19484922",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"对于ai翻译功能实现的一些小思路\">对于Ai翻译功能实现的一些小思路</h1>\n<h2 id=\"实现此功能所需要\">实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2 id=\"可选功能喵\">可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2 id=\"由于我很懒因为也没人看所以我只叙述一下大概的方法吧\">由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "date": "2025-12-25",
        "author": "Pamper",
        "to": "/articles/19484922",
        "headings": [
            {
                "depth": 1,
                "text": "对于Ai翻译功能实现的一些小思路",
                "id": "对于ai翻译功能实现的一些小思路",
                "children": [
                    {
                        "depth": 2,
                        "text": "实现此功能所需要",
                        "id": "实现此功能所需要"
                    },
                    {
                        "depth": 2,
                        "text": "可选功能喵",
                        "id": "可选功能喵"
                    },
                    {
                        "depth": 2,
                        "text": "由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。",
                        "id": "由于我很懒因为也没人看所以我只叙述一下大概的方法吧"
                    }
                ]
            }
        ],
        "menu": "docs",
        "menudata": [
            {
                "text": "这是第一个导航栏",
                "level": 1,
                "items": [
                    {
                        "text": "切换显示",
                        "link": "./aaa",
                        "level": 2
                    },
                    {
                        "text": "标题",
                        "link": "./222",
                        "level": 2
                    }
                ]
            },
            {
                "text": "API",
                "level": 1,
                "items": [
                    {
                        "text": "www",
                        "link": "./333",
                        "level": 3
                    }
                ]
            }
        ]
    }
]; 
        const page = 1;
        const pageSize = 5;
        const totalPages = 2;
        const totalArticles = 8;
        const title = "文章列表";
        </script>
        <template>
            <BlogLanding
            :articles="articles"
            :page="page"
            :page-size="pageSize"
            :total-pages="totalPages"
            :total-articles="totalArticles"
            :title="title"
            />
        </template>
        