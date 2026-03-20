<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const navItems = [
    { label: '首页', href: '#home' },
    { label: '特性', href: '#features' },
    { label: '生态', href: '#ecosystem' },
    { label: '开始使用', href: '#start' },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay')
                    if (delay) {
                        ; (entry.target as HTMLElement).style.transitionDelay = `${parseInt(delay) * 0.1}s`
                    }
                    entry.target.classList.add('reveal-up')
                    observer?.unobserve(entry.target)
                }
            }
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    for (const el of elements) {
        observer.observe(el)
    }
})

onUnmounted(() => {
    observer?.disconnect()
})

const coreFeatures = [
    {
        tag: 'Framework Agnostic',
        title: '与框架无关的内容生成方式',
        desc: '只需要少量 TypeScript 参与页面生成，把内容、数据与模板拆开，让你自由接入自己的博客、文档站或展示站。',
    },
    {
        tag: 'Bun Runtime',
        title: '更轻快的本地构建体验',
        desc: '以 Bun 为运行时，适合追求更快构建速度与更简洁工具链的个人开发者与独立项目。',
    },
    {
        tag: 'Quick Integration',
        title: '快速接入，无需新建项目',
        desc: '想为现有网站接入博客或文档系统？无需从零开始。Kecare 可作为独立模块快速集成，让内容生成能力与现有项目无缝协作。',
    },
    {
        tag: 'Content First',
        title: '为博客和文档内容而设计',
        desc: '从文章列表、详情页，到菜单、侧边栏、归档页，都可以按你的主题结构进行自由组织。',
    },
]

const featureDetails = [
    {
        title: '内容源可控',
        desc: '你可以围绕 Markdown、Frontmatter、菜单配置、主题模板，构建自己的静态内容工作流。',
        points: ['支持文章数据注入', '支持自定义生成模板', '适合博客 / 文档 / 展示页'],
    },
    {
        title: '主题开发简单',
        desc: '主题作者不需要理解复杂框架内部机制，只需要专注页面模板与样式表达。',
        points: ['组件自由组合', '页面结构可完全定制', '适合长期维护自己的品牌风格'],
    },
    {
        title: '适合做个人品牌官网',
        desc: '除了文章页，也可以做产品官网、项目主页、工具文档与个人作品展示。',
        points: ['统一视觉风格', '宣传页与内容站整合', '适合后续扩展多语言'],
    },
    {
        title: '保留工程灵活性',
        desc: '你可以自己决定页面如何生成、如何拆模块、如何定义主题能力，而不是被固定约束。',
        points: ['低心智负担', '更适合折腾型开发者', '方便逐步演进自己的架构'],
    },
]

const ecosystemCards = [
    {
        title: '文章生成',
        desc: '把 Markdown 文章转换成可渲染页面数据。',
    },
    {
        title: '菜单系统',
        desc: '可扩展的多级菜单与页面导航组织能力。',
    },
    {
        title: '主题模板',
        desc: '主题作者专注 HTML / CSS / Vue 模板层表达。',
    },
    {
        title: '官方 SDK',
        desc: '可拓展代码高亮、复制按钮、Markdown 扩展等前端能力。',
    },
    {
        title: '多语言能力',
        desc: '为文章和页面后续接入翻译与多语言展示留出空间。',
    },
    {
        title: '可扩展工作流',
        desc: '适合逐步加入归档、标签、搜索、SEO 与更多生成能力。',
    },
]
</script>

<template>
    <div class="landing-page">
        <div class="landing-bg"></div>
        <div class="landing-glow landing-glow-left"></div>
        <div class="landing-glow landing-glow-right"></div>

        <header class="site-header">
            <div class="container nav-shell">
                <NuxtLink class="brand" to="#">
                    <span class="brand-text">Kecare</span>
                </NuxtLink>

                <nav class="nav-menu">
                    <NuxtLink v-for="item in navItems" :key="item.href" to="#">{{ item.label }}</NuxtLink>
                </nav>

                <div class="nav-actions">
                    <NuxtLink class="ghost-button" to="#">查看模板</NuxtLink>
                    <NuxtLink class="solid-button" to="#">立即开始</NuxtLink>
                </div>
            </div>
        </header>

        <main>
            <section id="home" class="hero-section">
                <div class="container hero-grid">
                    <div class="hero-copy scroll-reveal">
                        <div class="hero-badge">Quick Integration · Content Driven · Template First</div>
                        <h1>
                            以模板为核心的
                            <span>Kecare</span>
                            静态内容生成器
                        </h1>
                        <p class="hero-desc">
                            摆脱框架束缚，使用 Kecare 可快速为你的网站接入博客系统。专注内容表达。用 Markdown 写文章，用 TypeScript 写模板，
                            自由构建博客、文档站或个人品牌官网。基于 Bun 运行时，构建更快、体验更轻。
                        </p>

                        <div class="hero-actions">
                            <NuxtLink class="solid-button hero-main-button" href="#start">开始构建页面</NuxtLink>
                            <NuxtLink class="ghost-button hero-sub-button" to="https://github.com/Pamperkyumi/kecare"
                                target="_blank" rel="noopener noreferrer">
                                Github</NuxtLink>
                        </div>

                    </div>

                    <div class="hero-preview scroll-reveal" data-delay="1">
                        <div class="preview-window">
                            <div class="preview-topbar">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div class="preview-content">
                                <div class="preview-label">OFFICIAL LANDING</div>
                                <h2>Kecare Generator</h2>
                                <p>
                                    Build your blog landing, docs homepage and content site with a
                                    template-first workflow.
                                </p>

                                <div class="preview-code">
                                    <div class="code-line"><span class="code-dim">$</span> bun create kecare</div>
                                    <div class="code-line"><span class="code-dim">$</span> edit your template</div>
                                    <div class="code-line"><span class="code-dim">$</span> generate content pages</div>
                                </div>

                                <div class="preview-grid">
                                    <div class="mini-card">
                                        <span class="mini-card-title">Article</span>
                                        <span class="mini-card-desc">Markdown → Page Data</span>
                                    </div>
                                    <div class="mini-card">
                                        <span class="mini-card-title">Theme</span>
                                        <span class="mini-card-desc">Template → Brand UI</span>
                                    </div>
                                    <div class="mini-card">
                                        <span class="mini-card-title">Menu</span>
                                        <span class="mini-card-desc">Config → Navigation</span>
                                    </div>
                                    <div class="mini-card">
                                        <span class="mini-card-title">SDK</span>
                                        <span class="mini-card-desc">Highlight / Copy / Extend</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" class="section-block">
                <div class="container">
                    <div class="section-head scroll-reveal">
                        <span class="section-kicker">Core Value</span>
                        <h2>为什么选择 Kecare</h2>
                        <p>
                            传统博客框架往往需要你学习整套框架概念，而 Kecare 选择另一条路：你只需要关心内容怎么写、页面长什么样，
                            剩下的交给生成器处理。
                        </p>
                    </div>

                    <div class="feature-grid">
                        <article v-for="(item, index) in coreFeatures" :key="item.title"
                            class="feature-card scroll-reveal" :data-delay="index + 1">
                            <span class="feature-tag">{{ item.tag }}</span>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section-block detail-section">
                <div class="container detail-grid">
                    <div class="detail-copy scroll-reveal">
                        <span class="section-kicker">Why This Layout Works</span>
                        <h2>为内容创作者而生的设计理念</h2>
                        <p>
                            Kecare 不追求大而全的功能覆盖，而是专注于解决一个核心问题：
                            如何让写作者更轻松地管理内容，同时保持页面设计的完全自由。
                        </p>
                        <p>
                            无论你是想搭建个人博客、技术文档站，还是产品展示官网，Kecare 都能让你用最少的代码实现最想要的效果。
                        </p>
                    </div>

                    <div class="detail-card-list">
                        <article v-for="(item, index) in featureDetails" :key="item.title"
                            class="detail-card scroll-reveal" :data-delay="index + 1">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                            <ul>
                                <li v-for="point in item.points" :key="point">{{ point }}</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section id="ecosystem" class="section-block ecosystem-section">
                <div class="container">
                    <div class="section-head scroll-reveal">
                        <span class="section-kicker">Ecosystem</span>
                        <h2>完整的内容生成生态</h2>
                        <p>
                            从文章解析到页面生成，从菜单管理到多语言支持，Kecare 提供了一整套工具链，
                            让你专注于创作，而不是被技术细节困扰。
                        </p>
                    </div>

                    <div class="ecosystem-grid">
                        <article v-for="(item, index) in ecosystemCards" :key="item.title"
                            class="ecosystem-card scroll-reveal" :data-delay="index + 1">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="start" class="section-block cta-section">
                <div class="container">
                    <div class="cta-panel scroll-reveal">
                        <div class="cta-copy">
                            <span class="section-kicker">Start Building</span>
                            <h2>开始构建你的内容世界</h2>
                            <p>
                                只需要几行命令，就能启动你的第一个 Kecare 项目。用 Markdown 记录想法，用模板定义风格，
                                让内容与设计完美融合。
                            </p>
                        </div>

                        <div class="cta-actions">
                            <NuxtLink class="solid-button" to="#" target="_blank" rel="noreferrer">GitHub</NuxtLink>
                            <NuxtLink class="ghost-button" to="#">查看文档</NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="container footer-shell">
                <div>
                    <div class="footer-brand">Kecare</div>
                    <span>&copy;2020-{{ new Date().getFullYear() }} Kecare. All rights reserved.</span>
                    <span>Powered
                        by <NuxtLink to="#" target="_blank" rel="noopener noreferrer">Kecare</NuxtLink></span>
                </div>
                <div class="footer-links">
                    <NuxtLink to="#">首页</NuxtLink>
                    <NuxtLink to="#">特性</NuxtLink>
                    <NuxtLink to="#">生态</NuxtLink>
                    <NuxtLink to="#">开始使用</NuxtLink>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
:root {
    color-scheme: dark;
}

.landing-page {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background: #000;
    color: #f6edf4;
}

.landing-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: #000;
    z-index: 0;
}

.landing-glow {
    display: none;
}

.container {
    position: relative;
    z-index: 1;
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
}

.site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 16px 24px;
    background: rgba(9, 9, 14, 0.72);
    backdrop-filter: blur(22px);
    border-bottom: 1px solid rgba(56, 189, 248, 0.14);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.28);
}

.nav-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #fff4fa;
    font-weight: 800;
    text-decoration: none;
}

.brand-text {
    font-size: 1.3rem;
    letter-spacing: 0.02em;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 18px;
}

.nav-menu a,
.footer-links a {
    color: #b9acb8;
    text-decoration: none;
    transition: color 0.25s ease, opacity 0.25s ease;
}

.nav-menu a:hover,
.footer-links a:hover {
    color: #38bdf8;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.solid-button,
.ghost-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease,
        color 0.25s ease;
}

.solid-button {
    color: #fff8fc;
    background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
    box-shadow: 0 18px 36px rgba(14, 165, 233, 0.24);
}

.ghost-button {
    color: #bae6fd;
    border: 1px solid rgba(56, 189, 248, 0.2);
    background: rgba(255, 255, 255, 0.04);
}

.solid-button:hover,
.ghost-button:hover {
    transform: translateY(-2px);
}

.solid-button:hover {
    box-shadow: 0 22px 44px rgba(14, 165, 233, 0.32);
}

.ghost-button:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(56, 189, 248, 0.3);
}

.hero-section {
    padding: 100px 0 36px;
}

.hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    align-items: center;
    gap: 40px;
    min-height: calc(100vh - 140px);
}

.hero-copy h1 {
    margin: 18px 0 18px;
    font-size: clamp(2.7rem, 6vw, 5.2rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    color: #fff5fb;
}

.hero-copy h1 span {
    display: block;
    color: #38bdf8;
    text-shadow: 0 14px 36px rgba(56, 189, 248, 0.22);
}

.hero-desc,
.section-head p,
.detail-copy p,
.cta-copy p,
.footer-shell p {
    margin: 0;
    color: #a89dab;
    line-height: 1.8;
}

.hero-badge,
.section-kicker,
.preview-label,
.feature-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.16);
    color: #7dd3fc;
    font-size: 0.88rem;
    font-weight: 700;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.hero-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 28px;
}

.feature-card,
.detail-card,
.ecosystem-card,
.cta-panel,
.preview-window {
    border: 1px solid rgba(56, 189, 248, 0.12);
    background: linear-gradient(180deg, rgba(24, 24, 34, 0.88), rgba(15, 15, 23, 0.84));
    backdrop-filter: blur(18px);
    box-shadow:
        0 20px 48px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.feature-card h3,
.detail-card h3,
.ecosystem-card h3,
.cta-copy h2,
.section-head h2,
.detail-copy h2 {
    color: #fff2f8;
}

.feature-card p,
.detail-card p,
.detail-card li,
.ecosystem-card p {
    color: #ab9fac;
}

.hero-preview {
    display: flex;
    justify-content: flex-end;
}

.preview-window {
    width: 100%;
    max-width: 540px;
    padding: 18px;
    border-radius: 30px;
}

.preview-topbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
}

.preview-topbar span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #38bdf8;
    box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
}

.preview-content {
    padding: 18px;
    border-radius: 24px;
    background: linear-gradient(180deg, rgba(19, 19, 28, 0.96), rgba(10, 10, 16, 0.92));
    border: 1px solid rgba(56, 189, 248, 0.12);
}

.preview-content h2 {
    margin: 16px 0 12px;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    color: #fff2f8;
}

.preview-content p {
    margin: 0;
    color: #b1a5b1;
    line-height: 1.8;
}

.preview-code {
    margin-top: 20px;
    padding: 16px;
    border-radius: 18px;
    background: linear-gradient(180deg, #0d0d14, #13131b);
    color: #e0f2fe;
    border: 1px solid rgba(56, 189, 248, 0.12);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.code-line+.code-line {
    margin-top: 10px;
}

.code-dim {
    color: #7dd3fc;
    margin-right: 8px;
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 20px;
}

.mini-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(56, 189, 248, 0.1);
}

.mini-card-title {
    color: #fff1f8;
    font-weight: 800;
}

.mini-card-desc {
    color: #a89da9;
    font-size: 0.94rem;
}

.section-block {
    padding: 96px 0;
}

.section-head {
    max-width: 760px;
}

.section-head h2,
.detail-copy h2,
.cta-copy h2 {
    margin: 16px 0 14px;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.12;
    letter-spacing: -0.03em;
}

.feature-grid,
.ecosystem-grid {
    display: grid;
    gap: 20px;
    margin-top: 32px;
}

.feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.feature-card,
.ecosystem-card {
    padding: 24px;
    border-radius: 28px;
}

.feature-card h3,
.ecosystem-card h3 {
    margin: 16px 0 10px;
    font-size: 1.3rem;
}

.detail-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    gap: 24px;
    align-items: start;
}

.detail-card-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.detail-card {
    padding: 22px;
    border-radius: 24px;
}

.detail-card h3 {
    margin: 0 0 10px;
    font-size: 1.1rem;
}

.detail-card ul {
    margin: 16px 0 0;
    padding-left: 18px;
}

.detail-card li+li {
    margin-top: 8px;
}

.ecosystem-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cta-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 26px;
    padding: 32px;
    border-radius: 32px;
    background: linear-gradient(180deg, rgba(24, 24, 34, 0.9), rgba(14, 14, 22, 0.92));
}

.cta-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.site-footer {
    padding: 0 0 42px;
}

.footer-shell {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    padding-top: 18px;
    border-top: 1px solid rgba(56, 189, 248, 0.12);
}

.footer-brand {
    font-size: 1.2rem;
    font-weight: 800;
    color: #fff2f8;
}

.footer-links {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
}

.scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition:
        opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-reveal.reveal-up {
    opacity: 1;
    transform: translateY(0);
}

.scroll-reveal[data-delay="1"] {
    transition-delay: 0.1s;
}

.scroll-reveal[data-delay="2"] {
    transition-delay: 0.2s;
}

.scroll-reveal[data-delay="3"] {
    transition-delay: 0.3s;
}

@media (max-width: 1100px) {

    .hero-grid,
    .detail-grid {
        grid-template-columns: 1fr;
    }

    .hero-preview {
        justify-content: flex-start;
    }

    .feature-grid,
    .ecosystem-grid,
    .detail-card-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .cta-panel {
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (max-width: 820px) {
    .site-header {
        position: fixed;
    }

    .nav-shell {
        flex-wrap: wrap;
        justify-content: center;
    }

    .nav-menu,
    .nav-actions {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .hero-section {
        padding-top: 28px;
    }

    .hero-grid {
        min-height: auto;
    }

    .feature-grid,
    .ecosystem-grid,
    .detail-card-list {
        grid-template-columns: 1fr;
    }

    .preview-grid {
        grid-template-columns: 1fr;
    }

    .hero-actions,
    .footer-shell {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>