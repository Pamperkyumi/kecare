<script lang="ts" setup>
import { 
  estimateReadingTimeFromHtml, 
  formatReadingTimeChinese 
} from './reading-time'

const props = defineProps<{
    article: {
        /**
         * 文章标题
         */
        title: string;
        /**
         * 文章内容 (html)
         */
        contentHtml: string;
        /**
         * 封面图片链接
         */
        coverSrc: string;
         /**
         * 创建日期 (毫秒级时间戳)
         */
        createdAt: string;
        /**
         * 作者
         */
        author: string;
    };
}>();

const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const readingInfo = computed(() => {
  const result = estimateReadingTimeFromHtml(props.article.contentHtml, { 
    wordsPerMinute: 220,
    round: 'ceil'
  })
  return result
})

const readingTimeLabel = computed(() => {
  return formatReadingTimeChinese(readingInfo.value)
})

const wordCount = computed(() => {
  return readingInfo.value.words
})


/* navbar */
const navbar = ref<HTMLElement | null>(null)

let lastScrollTop = 0
let scrollHandler: (() => void) | null = null

onMounted(() => {
  scrollHandler = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    if (!navbar.value) return
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.value.classList.add('hidden')
    } 
    else {
      navbar.value.classList.remove('hidden')
    }
    
    lastScrollTop = scrollTop
  }
  

  window.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

const res = estimateReadingTimeFromHtml(props.article.contentHtml, { wordsPerMinute: 220, round: 'ceil' });

</script>

<template>
  <div class="content-section" >
      <div class="navbar" ref="navbar">
        <div class="nav-name">Pamper</div>
          <ul class="nav-links">
                <li><a href="/">首页</a></li>
                <li><a href="../blog-archives">归档</a></li>
                <li><a href="#">标签</a></li>
                <li><a href="#">关于</a></li>
                <li><a href="#">友链</a></li>
          </ul>
      </div>
    </div>
  <div class="post-bg" :style="{'background-image':`url(${props.article.coverSrc})`}"></div>
  <div class="main-container">
      <div class="article">
        <div class="post-info">
          <h1 class="post-title">{{ props.article.title }}</h1>
          <div class="first-line">
            <span class="post-created">发布于: {{ formatDate(article.createdAt) }}</span>
            <span class="post-sparator">|</span>
            <span class="word-count">总字数:{{ wordCount }} </span>
            <span class="post-sparator">|</span>
            <span class="reading-time">阅读时长:  {{ readingTimeLabel }}</span>
          </div>
        </div>
        
        <div class="post">
          <div class="article-content" v-html="props.article.contentHtml"></div>
          <div class="post-copyright">
            <div class="post-copyright-author">
              <span class="post-copyright-meta">文章作者:</span>
              <span class="post-copyright-info">{{ props.article.author }}</span>
            </div>
            <div class="post-copyright-type">
              <span class="post-copyright-meta">文章链接:</span>
              <span class="post-copyright-info"><a href=#>#</a></span>
            </div>
            <div class="post-copyright-notice">
              <span class="post-copyright-meta">版权声明:</span>
              <span class="post-copyright-info">博客所有文章除特别声明外，均采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0 </a>许可协议。转载请注明来源</span>
            </div> 
          </div>
          
          <div class="tags-shares">
            <div class="post-tag-list">
              <a class="post-tag" href="#">喵</a>
              <a class="post-tag" href="#">喵喵</a>
              <a class="post-tag" href="#">喵喵喵</a>
              <a class="post-tag" href="#">喵喵喵喵</a>
            </div>
            <div class="post-share">
              <div class="post-share-list">
                <a class="share-QQ" href=""></a>
                <a class="share-Wechat" href="#"></a>
              </div>
            </div>
          </div>
          <hr class="post-hr">
        </div>
      </div>
  </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    }
    
    body{
      position: relative;
      overflow-y: scroll;
      min-height: 100%;
      background: #fff;
      color: #4c4948;
      font-size: 16px;
      line-height: 2;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      scroll-behavior: smooth;
    }
    
    .post-bg{
      background-position: center;
      background-size: cover;
      position: fixed;
      z-index: -999;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
    }
    
    .main-container {
      display: flex;
      justify-content: center;
      padding-top: 100px;
    }
    .post-info{
      margin-bottom: 40px;
    }
    
    .post-title{
      margin-bottom: 16px;
      color: white;
      font-weight: 600;
      font-size: 2.2rem;
      line-height: 1.3;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .first-line{
      color: rgba(0, 0, 0, 0.9);
      font-size: 95%;
      display: flex;
      gap: 10px;
    }
    
    .post{
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px) saturate(150%);
      border: 1px solid rgba(169, 169, 169, 0.2);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
    }
    .article{
        gap: 30px;
        max-width: 800px;
        width: 100%;
        padding: 0 20px;
    }
    
    .article-content {
      line-height: 1.8;
    }
    
    .article-content h1, 
    .article-content h2, 
    .article-content h3 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      color: #2c3e50;
    }
    .post-copyright{
      position: relative;
      margin: 40px 0 10px;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .post-copyright:before{
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: #ff9eb0;
      border-radius: 4px 0 0 4px;
    }
    
    .post-copyright-meta{
      color: #ff6b93;
      font-weight: bold;
      margin-right: 8px;
    }
    
    .post-copyright-info{
      padding-left: 0;
    }
    
    .post-copyright a{
      color: #3498db;
      text-decoration: none;
    }
    
    .post-copyright a:hover{
      text-decoration: underline;
    }
    .tags-shares{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
        width: 100%;
    }
    
    .post-tag-list{
        display: flex;
        gap: 10px;
    }
    
    .post-tag{
        background: #ff9eb0;
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        text-decoration: none;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    
    .post-tag:hover{
        background: #ff6b93;
        transform: translateY(-2px);
    }
    
    .post-share-list{
        display: flex;
        gap: 15px;
    }
    .share-QQ, .share-Wechat{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #f0f0f0;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .share-QQ:hover, .share-Wechat:hover{
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .share-QQ:after{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #12b7f5;
        font-weight: bold;
    }
    
    .share-Wechat:after{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #07c160;
        font-weight: bold;
        background-image: url(~/assets/QQ.ico);
    }
    
    .post-hr{
        position: relative;
        margin: 40px auto;
        border: none;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ffe1e6, transparent);
        width: 100%;
    }

@media (max-width: 1100px) {
      .content-wrapper {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .author-stats {
        justify-content: space-between;
        max-width: 400px;
        margin: 0 auto 20px;
      }
    }
    
    @media (max-width: 768px) {
      .post-title {
        font-size: 1.8rem;
      }
      
      .post {
        padding: 25px;
      }
      
      .tags-shares {
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
      }
      
      .post-share {
        width: 100%;
      }
      
      .post-share-list {
        justify-content: flex-start;
      }
      
      .first-line {
        flex-wrap: wrap;
      }
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
    
</style>