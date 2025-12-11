<script lang="ts" setup>
import type { Article } from "../../../generator/types/article";
import sidebar from "@/components/blog-sidebar.vue"

const props = defineProps<{
  articles: Article[];
  totalArticles: number; 
}>();

//subtitle文字
const subtitleText = "归档喵喵喵喵喵喵";
const typingSpeed = 200;
const subtitleElement = ref<HTMLElement | null>(null);
function typeWriter(text: string, element: HTMLElement, speed: number) {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            const charNode = document.createTextNode(text.charAt(i));
            element.insertBefore(charNode, cursor);
            i++;
            setTimeout(type, speed);
        } else {
            cursor.remove();
        }
    }
    
    type();
}

onMounted(() => {
  if (subtitleElement.value) {
    typeWriter(subtitleText, subtitleElement.value, typingSpeed);
  }
});



// 格式化日期
const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// 按年份组织文章
const organizeArticlesByYear = (articles: Article[] = []) => {
  const groupedArticles: { [year: string]: Article[] } = {};
  articles.forEach((article) => {
    const year = new Date(parseInt(article.createdAt)).getFullYear().toString();
    if (!groupedArticles[year]) {
      groupedArticles[year] = [];
    }
    groupedArticles[year].push(article);
  });
  return groupedArticles;
};

const groupedArticles = organizeArticlesByYear(props.articles);
</script>

<template>
  <div id="app">
    <!--背景图-->
    <div class="hero-section">
      <h1 class="site-title">Pamperのblog</h1>
      <div class="subtitle" ref="subtitleElement"></div>
      <div class="scroll-indicator">向下滑动浏览内容</div>
    </div>
    <div class="content-section">
      <div class="navbar">
        <div class="nav-name">Pamper</div>
        <ul class="nav-links">
          <li><a href="/">首页</a></li>
          <li><a href="#">归档</a></li>
          <li><a href="#">标签</a></li>
          <li><a href="#">关于</a></li>
          <li><a href="#">友链</a></li>
        </ul>
      </div>
    </div>
    <div class="main-container">
      <div class="articles-container">
        <div v-if="articles.length === 0" class="no-articles">
          <p>暂无文章归档</p>
        </div>
        <div v-for="(articles, year) in groupedArticles" :key="year">
          <h2>{{ year }}年喵</h2>
          <ul>
            <li v-for="article in articles" :key="article.id">
              <a :href="article.to" class="article-link">
                <span>❤{{ formatDate(article.createdAt) }}</span> - {{ article.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <sidebar :articles="articles"
               :totalArticles="totalArticles"/>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
    url('~/assets/bg1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  flex-direction: column;
}

.site-title {
  color: white;
  font-size: 4rem;
  font-weight: 700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  animation: fadeIn 2s ease-in-out;
}

.subtitle {
  color: #ff9eb0;
  font-size: 2rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.2rem;
  animation: bounce 2s infinite;
}

.main-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
}

.articles-container {
  flex: 1;
  display: grid;
  gap: 30px;
}

.no-articles {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.article-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.article-link:hover {
  color: #ff6b93;
}

h2 {
  font-size: 2rem;
  margin-top: 30px;
  color: #333;
  border-bottom: 2px solid #ff6b93;
  padding-bottom: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.navbar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  z-index: 1000;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links li {
  margin: 0 10px;
}

.nav-links a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: inherit;
  padding: 5px 0;
  font-weight: 500;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ff6b93;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease;
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>