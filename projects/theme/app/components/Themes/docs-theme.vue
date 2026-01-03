<script lang="ts" setup>
import type { Article, NavItem } from "kecare-tools";
import SidebarNavTree from "../Sidebar/Sidebar-navtree.vue";

const props = defineProps<{
  article: Article;
}>();
const headings = computed(() => props.article.headings ?? []);

/* navbar */
const navbar = ref<HTMLElement | null>(null);
let lastScrollTop = 0;
let scrollHandler: (() => void) | null = null;

onMounted(() => {
  scrollHandler = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (!navbar.value) return;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.value.classList.add("hidden");
    } else {
      navbar.value.classList.remove("hidden");
    }
    lastScrollTop = scrollTop;
  };

  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <div class="layout">
    <header class="navbar" ref="navbar">
      <div class="nav-name">Pamper</div>
      <nav class="nav-links">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/docs/index">文档</RouterLink>
        <RouterLink to="/archives">归档</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <RouterLink to="/friends">友链</RouterLink>
      </nav>
    </header>

    <aside class="sidebar">
      <div class="sidebar-title">Kecare</div>
      <div class="sidebar-list">
        <aside v-if="article.menudata?.length">
        <SidebarNavTree :items="article.menudata" />
        </aside>
      </div>
    </aside>

    <main class="content">
      <div class="content-inner">
        <h1 class="content-title">{{ props.article.title }}</h1>
        <div class="article-content" v-html="props.article.contentHtml"></div>
      </div>
    </main>
    <section class="toc">
      <h3 class="toc-title">On this Page</h3>
      <ul class="toc-list">
        <li class="toc-item" v-for="h in headings" :key="h.id || h.text">
          <a class="toc-link" :href="`#${h.id}`" :title="h.text">{{ h.text }}</a>
          <ul v-if="h.depth === 1 && h.children?.length" class="toc-sublist">
            <li class="toc-subitem" v-for="c in h.children" :key="c.id || c.text">
              <a class="toc-sublink" :href="`#${c.id}`" :title="c.text">{{ c.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="toc-ad">
        <div class="toc-ad-title">广告位</div>
        <div class="toc-ad-body">广告位招租租租租租租租租租</div>
      </div>
      <div class="toc-ad">
        <div class="toc-ad-title">世界上最可爱的人喵</div>
        <img class="toc-ad-title" src="http://39.105.50.255/files/6c1a932360c24905be2fe53a97d91ce8bb4d38a871283954bce90c73b202bfb7.png"/>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ====== Flex Layout Root ====== */
.layout {
  --bg: #0d1117;
  --bg-soft: #0f1522;
  --card: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.08);
  --text: rgba(255, 255, 255, 0.88);
  --muted: rgba(255, 255, 255, 0.60);
  --muted-2: rgba(255, 255, 255, 0.45);
  --link: rgba(255, 255, 255, 0.88);
  --brand: #ff6b93;

  --radius: 12px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  min-height: 100vh;
  background: radial-gradient(1200px 600px at 20% -10%, rgba(255, 107, 147, 0.12), transparent 60%),
              radial-gradient(900px 500px at 80% 10%, rgba(120, 180, 255, 0.10), transparent 55%),
              var(--bg);
  color: var(--text);

  /* ✅ 用 flex 取代 grid */
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

/* ====== 顶部导航（全宽独占一行） ====== */
.navbar {
  /* ✅ 关键：占满整行 */
  flex: 0 0 100%;
  width: 100%;

  position: sticky;
  top: 0;
  z-index: 1000;

  height: 64px;
  padding: 0 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(13, 17, 23, 0.72);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  transition: transform 0.35s ease, background 0.35s ease;
}

.navbar.hidden {
  transform: translateY(-100%);
}

.nav-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text);

  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  display: flex;
  align-items: center;
}

.nav-links a:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.06);
}

.nav-links a.router-link-active {
  color: var(--text);
  background: rgba(255, 107, 147, 0.14);
  border: 1px solid rgba(255, 107, 147, 0.22);
}

/* ====== 左侧 Sidebar ====== */
.sidebar {
  /* 固定栏宽：桌面效果与 grid 基本一致 */
  flex: 0 0 280px;
  width: 280px;

  position: sticky;
  top: 64px; /* ✅ 避开 navbar，高度更准确 */
  height: calc(100vh - 64px);

  padding: 18px 14px;
  border-right: 1px solid var(--border);

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 35%),
              rgba(13, 17, 23, 0.55);
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
}

.sidebar-title {
  font-size: 0.95rem;
  font-weight: 900;
  color: var(--text);
  padding: 10px 12px;
  border-radius: var(--radius);
  margin-bottom: 12px;
  position: relative;

  display: flex;
  align-items: center;
}

.sidebar-title::after{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 2px;
  background-color: #2f3035;
}

.sidebar-list {
  /* ✅ 填满剩余空间，滚动 */
  flex: 1 1 auto;
  overflow: auto;
  padding-right: 6px;
}

.sidebar-list::-webkit-scrollbar { width: 10px; }
.sidebar-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.10);
  border-radius: 999px;
  border: 3px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
}
.sidebar-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.16);
}

/* ====== 中间内容区 ====== */
.content {
  /* ✅ 自适应宽：占据剩余空间 */
  flex: 1 1 0;
  min-width: 0;

  padding: 26px 22px 40px;

  display: flex;
}

.content-inner {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 22px 22px 28px;
  border-radius: calc(var(--radius) + 4px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);

  display: flex;
  flex-direction: column;
}

.content-title {
  margin: 0 0 16px;
  font-size: 1.65rem;
  letter-spacing: 0.2px;
  line-height: 1.25;

  display: flex;
  align-items: center;
}

.article-content {
  color: var(--text);
  line-height: 1.8;
  font-size: 1rem;

  display: flex;
  flex-direction: column;
}

/* markdown / html 内容样式保持不变 */
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  margin-top: 26px;
  margin-bottom: 10px;
  line-height: 1.3;
}

.article-content :deep(h2) {
  font-size: 1.25rem;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.article-content :deep(h3) { font-size: 1.12rem; }

.article-content :deep(p) {
  margin: 12px 0;
  color: var(--text);
}

.article-content :deep(a) {
  color: var(--link);
  text-decoration: none;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.28);
}
.article-content :deep(a:hover) {
  border-bottom-color: rgba(255, 107, 147, 0.55);
  color: var(--text);
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.2rem;
  margin: 12px 0;
}
.article-content :deep(li) {
  margin: 6px 0;
  color: rgba(255, 255, 255, 0.82);
}

.article-content :deep(blockquote) {
  margin: 14px 0;
  padding: 10px 14px;
  border-left: 3px solid rgba(255, 107, 147, 0.55);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  color: var(--muted);
}

.article-content :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.92em;
}

.article-content :deep(p > code),
.article-content :deep(li > code) {
  padding: 0.12em 0.42em;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  color: rgba(255, 255, 255, 0.90);
}

.article-content :deep(pre) {
  margin: 14px 0;
  padding: 14px 14px;
  border-radius: 14px;
  overflow: auto;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
}

.article-content :deep(pre code) {
  background: transparent;
  border: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.86);
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.article-content :deep(th),
.article-content :deep(td) {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}
.article-content :deep(th) {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  text-align: left;
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 22px 0;
}

/* ====== 右侧 TOC ====== */
.toc {
  flex: 0 0 260px;
  width: 260px;

  position: sticky;
  top: 64px; /* ✅ 与 sidebar 同步 */
  align-self: flex-start;

  height: calc(100vh - 64px);
  padding: 18px 14px;
  margin-right: 10px;

  border-left: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 40%),
              rgba(13, 17, 23, 0.35);
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
}

.toc-title {
  margin: 0 0 10px;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.85);

  display: flex;
  align-items: center;
}

.toc-list {
  list-style: none;
  margin: 10px 0 18px;
  padding: 0;

  overflow: auto;
  max-height: 52vh;
  padding-right: 6px;

  display: flex;
  flex-direction: column;
}

.toc-item { margin: 4px 0; display: flex; flex-direction: column; }

.toc-link,
.toc-sublink {
  display: flex;
  align-items: center;

  text-decoration: none;
  padding: 7px 10px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.62);
  border: 1px solid transparent;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-link:hover,
.toc-sublink:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.90);
}

.toc-sublist {
  list-style: none;
  margin: 6px 0 10px;
  padding: 0 0 0 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc-subitem { display: flex; }
.toc-sublink { padding: 6px 10px; color: rgba(255, 255, 255, 0.55); }

.toc-list::-webkit-scrollbar { width: 10px; }
.toc-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.10);
  border-radius: 999px;
  border: 3px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
}
.toc-list::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.16); }

.toc-ad {
  margin-top: 18px;
  padding: 14px 12px;
  border-radius: calc(var(--radius) + 2px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.14);

  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
}

.toc-ad-title {
  font-size: 0.86rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.78);

  display: flex;
  align-items: center;
}

/* 你这里 img 也叫 toc-ad-title（class 重名），做个兼容：别影响文字 */
img.toc-ad-title {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.toc-ad-body {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;

  display: flex;
  align-items: center;
}

/* ====== ✅ 响应式（更合理） ====== */

/* ① 平板：两栏（sidebar + content），隐藏 toc */
@media (max-width: 1024px) {
  .toc { display: none; }

  .sidebar {
    flex: 0 0 240px;
    width: 240px;
  }

  .content {
    padding: 22px 18px 34px;
  }
}

/* ② 手机：单栏（navbar / sidebar / content），sidebar 不 sticky */
@media (max-width: 860px) {
  .layout {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .navbar {
    position: sticky;
    top: 0;
  }

  .sidebar {
    position: relative;
    top: 0;
    height: auto;

    width: 100%;
    flex: 0 0 auto;

    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .sidebar-list {
    max-height: 42vh;
    overflow: auto;
  }

  .content {
    width: 100%;
    flex: 1 1 auto;
    padding: 16px 14px 28px;
  }

  .content-inner {
    padding: 18px 16px 22px;
  }

  .nav-links { gap: 8px; }
  .nav-links a { padding: 7px 9px; }
}

/* ③ 更窄屏：导航更紧凑，避免换行太难看 */
@media (max-width: 480px) {
  .navbar {
    padding: 0 12px;
  }

  .nav-name {
    font-size: 1rem;
  }

  .nav-links a {
    font-size: 0.9rem;
    padding: 6px 8px;
  }
}
</style>

