        <script setup lang="ts">
        import BlogLanding from "../components/blog-landing.vue";
        const articles =  [
    {
        "id": "hello-world",
        "title": "HelloWorld",
        "desc": "Hello World",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>Welcome to <a href=\"http://zespia.tw/hexo\">Hexo</a>! This is your very first post. Check <a href=\"http://zespia.tw/hexo/docs\">documentation</a> to learn how to use.</p>\n<p>纪念一下此避难所复活日期</p>\n",
        "createdAt": "1762613962901",
        "author": "Pamper",
        "to": "/articles/hello-world",
        "headings": [],
        "menudata": null
    },
    {
        "id": "a",
        "title": "a",
        "desc": "测试",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>测试</p>\n",
        "createdAt": "1763050953525",
        "author": "Pamper",
        "to": "/articles/a",
        "headings": [],
        "menudata": null
    },
    {
        "id": "aaa",
        "title": "翻译测试喵",
        "desc": "渐进式框架 Ai实时翻译功能喵，应该可能大概也许没有问题吧( 请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h2 id=\"渐进式框架\">渐进式框架</h2>\n<h2 id=\"ai实时翻译功能喵应该可能大概也许没有问题吧\">Ai实时翻译功能喵，应该可能大概也许没有问题吧(</h2>\n<h2 id=\"请通过点击右上角右上角翻译测试如果有问题不要拷打我喵如果可以以后可能会出教程bushi\">请通过点击右上角右上角翻译测试，如果有问题不要拷打我喵。如果可以，以后可能会出教程（bushi</h2>\n<!-- TRANSLATE_START -->\n\n<p>Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：</p>\n<ul>\n<li>无需构建步骤，渐进式增强静态的 HTML</li>\n<li>在任何页面中作为 Web Components 嵌入</li>\n<li>单页应用 (SPA)</li>\n<li>全栈 / 服务端渲染 (SSR)</li>\n<li>Jamstack / 静态站点生成 (SSG)</li>\n<li>开发桌面端、移动端、WebGL，甚至是命令行终端中的界面</li>\n</ul>\n<p>如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。即使你不是这些方面的专家，也能够跟得上。</p>\n<p>如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Vue，或者是对上述的这些概念感到好奇，我们在<a href=\"https://cn.vuejs.org/guide/extras/ways-of-using-vue.html\">使用 Vue 的多种方式</a>中讨论了有关它们的更多细节。</p>\n<p>无论再怎么灵活，Vue 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Vue 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Vue 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。</p>\n<!-- TRANSLATE_END -->\n\n",
        "createdAt": "1766844716136",
        "author": "Pamper",
        "to": "/articles/aaa",
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
        "id": "shishifanyi copy 2",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"对于ai翻译功能实现的一些小思路\">对于Ai翻译功能实现的一些小思路</h1>\n<h2 id=\"实现此功能所需要\">实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2 id=\"可选功能喵\">可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2 id=\"由于我很懒因为也没人看所以我只叙述一下大概的方法吧\">由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "createdAt": "1766603013610",
        "author": "Pamper",
        "to": "/articles/shishifanyi copy 2",
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
        "id": "shishifanyi copy",
        "title": "实时翻译功能的实现",
        "desc": "对于Ai翻译功能实现的一些小思路 实现此功能所需要 DeepSeek API (提供不同语言的翻译能力) Supabase 账户 (用作后端数据库处理) Supabase Edge Functions （作为后端API，调用DeepSeek...",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<h1 id=\"对于ai翻译功能实现的一些小思路\">对于Ai翻译功能实现的一些小思路</h1>\n<h2 id=\"实现此功能所需要\">实现此功能所需要</h2>\n<ul>\n<li><strong>DeepSeek API</strong>  (提供不同语言的翻译能力)</li>\n<li><strong>Supabase 账户</strong>(用作后端数据库处理)</li>\n<li><strong>Supabase Edge Functions</strong>（作为后端API，调用DeepSeek）</li>\n<li><strong>前端 (你的博客)</strong>(监听用户请求，调用Supabase函数)</li>\n</ul>\n<h2 id=\"可选功能喵\">可选功能喵</h2>\n<p>可用Supabase建立一个表，将每一次的翻译结果缓存，以节省Token和提升速度。</p>\n<h2 id=\"由于我很懒因为也没人看所以我只叙述一下大概的方法吧\">由于我很懒(因为也没人看),所以我只叙述一下大概的方法吧。</h2>\n<p>安装完Supabase之后，可以在Supabase中建立一个数据库，以缓存每一次的翻译结果，</p>\n<p>之后创建 <strong>Edge Funciton</strong>  编辑函数代码切记不要将 <strong>API</strong> 或 <strong>service_role key</strong> 直接写在代码中，可用<code>supabase secrets set</code>配置环境变量，最后只需在前端添加翻译功能即可喵</p>\n<p>如果有疑问可以通过我的联系方式找到我喵</p>\n<p>接下来对以下诗句测试一下翻译吧喵</p>\n<hr>\n<!-- TRANSLATE_START -->\n\n<p>The fountains mingle with the river</p>\n<p>And the rivers with the ocean</p>\n<p>The winds of heaven mix for ever</p>\n<p>With a sweet emotion;</p>\n<p>Nothing in the world is single;</p>\n<p>All things by a law divine</p>\n<p>In one spirit meet and mingle.</p>\n<p>Why not I with thine?—</p>\n<p>See the mountains kiss high heaven</p>\n<p>And the waves clasp one another;</p>\n<p>No sister-flower would be forgiven</p>\n<p>If it disdained its brother;</p>\n<p>And the sunlight clasps the earth</p>\n<p>And the moonbeams kiss the sea:</p>\n<p>What are all these kissings worth</p>\n<p>If thou kiss not me?</p>\n<!-- TRANSLATE_END -->\n\n<p>所以~ 我喜欢你喵.宝宝,我喜欢你，我们要在一起~ </p>\n",
        "createdAt": "1766603013610",
        "author": "Pamper",
        "to": "/articles/shishifanyi copy",
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
        const totalArticles = 7;
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
        