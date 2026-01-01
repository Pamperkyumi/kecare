<script lang="ts" setup>
import type { Article, friend } from 'kecare-tools';
import sidebar from "~/components/Sidebar/author-card.vue"

const props = defineProps<{
  friends:friend[]
  articles:Article[]
}>();
const totalArticles = props.articles.length;

//subtitle文字
const subtitleText = "归档喵喵喵喵喵喵喵喵喵";
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

</script>

<template>
  <div id="app">
    <!--背景图-->
    <div class="hero-section">
      <h1 class="site-title">Pamperのblog</h1>
      <div class="subtitle" ref="subtitleElement"></div>
      <div class="scroll-indicator">向下滑动浏览内容</div>
    </div>
    <div class="content-section" >
        <div class="navbar" ref="navbar">
            <div class="nav-name">Pamper</div>
            <ul class="nav-links">
                <li><a href="/">首页</a></li>
                <li><a href="/docs/实时翻译">文档</a></li>
                <li><a href="archives">归档</a></li>
                <li><a href="#">关于</a></li>
                <li><a href="#">友链</a></li>
            </ul>
        </div>
    </div>
    <div class="main-container">
      <div class="articles-container">
        <div class="articles-container">
            <div v-if="friends && friends.length > 0" class="friends-grid">
        <nuxt-link
            v-for="(item, index) in friends" 
            :key="index" 
            :href="item.url" 
            target="_blank" 
            class="friend-card"
        >
            <div class="friend-avatar-wrapper">
                <img :src="item.image" :alt="item.name" class="friend-avatar" loading="lazy">
            </div>
            
            <div class="friend-info">
                <h3 class="friend-name">{{ item.name }}</h3>
                <p class="friend-desc">{{ item.desc }}</p>
            </div>
        </nuxt-link>
    </div>

    <div v-else class="empty-friends">
        <p>还没有添加友链哦 ~</p>
    </div>

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
.nav-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff6b93;
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

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
}

.friend-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(255, 107, 147, 0.2);
  border-color: #ff6b93;
}

.friend-avatar-wrapper {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.friend-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-info {
  text-align: center;
}

.friend-name {
  color: #333;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.friend-card:hover .friend-name {
  color: #ff6b93;
}

.friend-desc {
  color: #666;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>