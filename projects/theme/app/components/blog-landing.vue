<script lang="ts" setup>
import type { Article } from "../../../generator/types/article";
import sidebar from "@/components/blog-sidebar.vue"
import {ref, computed, onMounted, onUnmounted} from "vue"

const props = defineProps<{
    articles:Article[];
    page:number;
    pageSize:number;
    totalPages:number;
    totalArticles:number;
    title?: string;
    isIndex?: boolean;
}>()

// Props验证
if (props.page <= 0) {
    console.warn('Invalid page number:', props.page)
}
if (props.pageSize <= 0) {
    console.warn('Invalid page size:', props.pageSize)
}
if (props.totalPages < 0) {
    console.warn('Invalid total pages:', props.totalPages)
}
if (props.totalArticles < 0) {
    console.warn('Invalid total articles:', props.totalArticles)
}

const articles = computed(() => props.articles)

const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};


/* navbar */
const navbar = ref<HTMLElement | null>(null)
const subtitleElement = ref<HTMLElement | null>(null);
const typingTimer = ref<number | null>(null);

// subtitle文字
const subtitleText = "病弱系小猫女仆,可爱喵,喜欢喵,結婚喵.";
const typingSpeed = 100;

function typeWriter(text: string, element: HTMLElement, speed: number): () => void {
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
            typingTimer.value = window.setTimeout(type, speed);
        } else {
            cursor.remove();
        }
    }
    
    type();
    
    // 返回清理函数
    return () => {
        if (typingTimer.value) {
            clearTimeout(typingTimer.value);
            typingTimer.value = null;
        }
    };
}

onMounted(() => {
  // 初始化打字机效果
  if (subtitleElement.value) {
    typeWriter(subtitleText, subtitleElement.value, typingSpeed);
  }
  
  // 初始化滚动处理
  let lastScrollTop = 0;
  const scrollHandler = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!navbar.value) return;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.value.classList.add('hidden');
    } else {
      navbar.value.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
  };
  
  // 使用passive事件监听器提高性能
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // 在组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler);
    if (typingTimer.value) {
      clearTimeout(typingTimer.value);
      typingTimer.value = null;
    }
  });
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
                    <li><a href="blog-archives">归档</a></li>
                    <li><a href="#">标签</a></li>
                    <li><a href="#">关于</a></li>
                    <li><a href="#">友链</a></li>
                </ul>
            </div>
        </div>
            <div class="main-container">
                <div class="articles-container">
                    <a class="article-card" v-for="(article, index) in articles" :key="index" :href="article.to">
                        <img class="article-cover" :src="article.coverSrc" />
                        <div class="article-content" >
                            <div class="article-title">{{ article.title }}</div>
                            <div class="article-desc">{{ article.desc }}</div>
                            <div class="article-meta">
                                <span>作者: {{ article.author }}</span>
                                <span>{{ formatDate(article.createdAt) }}</span>
                            </div>
                        </div>
                    </a>
                    <nav class="pagination" v-if="totalPages > 1">
                        <router-Link class="page-btn" v-if="page > 1" :to="page === 2 ? '/' : `/page-${page - 1}`">上一页</router-Link>
                        <span class="pages">第 {{ page }} / {{ totalPages }} 页</span>
                        <router-Link class="page-btn" v-if="page < totalPages" :to="`/page-${page + 1}`">下一页</router-Link>
                    </nav>
                </div>
                <sidebar :articles="articles"
                         :totalArticles="totalArticles"
                />
            </div>
        </div>

</template>

<style scoped>
        :global(*) {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding-top: 70px;
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
        .pagination{
            text-align: center;
        }
        .page-btn,.pages{
            color: rgb(0, 0, 0);
        }
        .page-btn:hover{
            transform: translateY(-3px);
        }
        .page-btn:active{
            transform: translateY(1px);
        }
        .article-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }

        .article-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .article-cover {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .article-content {
            padding: 20px;
        }

        .article-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2c3e50;
            line-height: 1.3;
        }

        .article-desc {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.5;
        }

        .article-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }
        /* 背景图部分 */
        .hero-section {
            height: 100vh;
            background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), 
                              url('../assets/bg1.jpg');
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
        .subtitle{
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

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
            40% { transform: translateY(-20px) translateX(-50%); }
            60% { transform: translateY(-10px) translateX(-50%); }
        }


        /* navbar */
        .navbar {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            justify-content: space-between;
            transition: transform 0.4s ease;
            align-items: center;
            padding: 15px 5%;
            z-index: 1000;
        }

        .navbar.hidden {
            transform: translateY(-100%);
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
        
        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                position: static;
            }
            
            .navbar {
                padding: 15px 20px;
            }
            
            .nav-links {
                gap: 5px;
            }
            
            .nav-links li {
                margin: 0 5px;
            }
        }
        


</style>