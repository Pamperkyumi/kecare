<script lang="ts" setup>
import type { Article } from 'kecare-tools';
import ArticleSidebar from '../Sidebar/article-sidebar.vue';


const props = defineProps<{
  article: Article;
  articles: Article[]
}>()
const totalArticles = props.articles.length;

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


// Reading Time
type ReadingOptions = {
  wordsPerMinute?: number;
  round?: 'ceil' | 'floor' | 'round';
  imageSeconds?: number;
  codeWordsMultiplier?: number;
  minMinutes?: number;
};

type ReadingResult = {
  words: number;
  timeSeconds: number;
  minutesFloat: number;
  minutes: number;
  wordsPerMinute: number;
  images: number;
};

const READING_DEFAULTS: Required<ReadingOptions> = {
  wordsPerMinute: 200,
  round: 'round',
  imageSeconds: 12,
  codeWordsMultiplier: 0.6,
  minMinutes: 0,
};

function stripHtmlKeepImg(html: string): { text: string; images: number } {
  if (!html) return { text: '', images: 0 };
  const imgMatches = html.match(/<img\b[^>]*>/gi);
  const images = imgMatches ? imgMatches.length : 0;
  const text = html.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim();
  return { text, images };
}

function countWords(text: string): number {
  if (!text) return 0;
  const matches = text.match(/([\p{L}\p{N}]+|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+)/gu);
  return matches ? matches.length : 0;
}

function estimateReadingTimeFromHtml(
  htmlOrText: string,
  opts?: ReadingOptions
): ReadingResult {
  const o = { 
  wordsPerMinute: 200,
  round: 'round',
  imageSeconds: 12,
  codeWordsMultiplier: 0.6,
  minMinutes: 0, ...opts };
  const { text, images } = stripHtmlKeepImg(htmlOrText);

  const codeRegex = /```[\s\S]*?```|<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi;
  let codeWords = 0;
  let remainingText = text;
  const codeMatches = htmlOrText.match(codeRegex);
  
  if (codeMatches) {
    for (const cm of codeMatches) {
      const codeOnly = cm.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/[`]/g, ' ');
      codeWords += countWords(codeOnly);
    }
    const htmlWithoutCode = htmlOrText.replace(codeRegex, ' ');
    const stripped = stripHtmlKeepImg(htmlWithoutCode);
    remainingText = stripped.text;
  }

  const normalWords = countWords(remainingText);
  const effectiveWords = Math.round(normalWords + codeWords * o.codeWordsMultiplier);
  const wordsPerSecond = o.wordsPerMinute / 60;
  const secondsForWords = effectiveWords / wordsPerSecond;
  const secondsForImages = images * o.imageSeconds;
  const totalSeconds = Math.max(0, Math.round(secondsForWords + secondsForImages));

  const minutesFloat = totalSeconds / 60;
  let minutes: number;
  if (o.round === 'ceil') minutes = Math.ceil(minutesFloat);
  else if (o.round === 'floor') minutes = Math.floor(minutesFloat);
  else minutes = Math.round(minutesFloat);

  if (minutes < o.minMinutes) minutes = Math.max(0, Math.floor(o.minMinutes));

  return {
    words: effectiveWords,
    timeSeconds: totalSeconds,
    minutesFloat,
    minutes,
    wordsPerMinute: o.wordsPerMinute,
    images,
  };
}

function formatReadingTimeChinese(res: ReadingResult): string {
  if (res.minutes <= 0) return '少于 1 分钟';
  if (res.minutes === 1) return '1 分钟';
  return `约 ${res.minutes} 分钟`;
}

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

const processCodeBlocks = (container: HTMLElement | null) => {
  if (!container) return;
  const codeBlocks = container.querySelectorAll<HTMLElement>('pre code[class*="language-"]');
  const langMap: Record<string, string> = {
    'javascript': 'JS',
    'js': 'JS',
    'typescript': 'TS',
    'ts': 'TS',
    'markdown': 'md',
    'md': 'md',
    'python': 'Py',
    'py': 'Py',
    'vue': 'Vue',
    'html': 'HTML',
    'css': 'CSS',
    'csharp': 'C#',
    'cs': 'C#',
    'shell': 'Shell',
    'bash': 'Shell',
    'json': 'JSON'
  };

  codeBlocks.forEach((code) => {
    if (code.dataset.lang) return;

    const classes = Array.from(code.classList);
    const langClass = classes.find((c) => c.startsWith('language-'));

    if (langClass) {
      const rawLang = langClass.replace('language-', '').toLowerCase();
      const displayLang = langMap[rawLang] || (rawLang.charAt(0).toUpperCase() + rawLang.slice(1));
      code.dataset.lang = displayLang;
    }
  });
};
const articleRef = ref<HTMLElement | null>(null);
onMounted(() => {
    processCodeBlocks(articleRef.value)
})
</script>

<template>
  <div class="content-section">
    <div class="navbar" ref="navbar">
      <div class="nav-name">Pamper</div>
      <ul class="nav-links">
        <li><a href="/">首页</a></li>
        <li><a href="/docs/实时翻译">文档</a></li>
        <li><a href="./archives">归档</a></li>
        <li><a href="#">标签</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">友链</a></li>
      </ul>
    </div>
  </div>

  <div class="post-bg" :style="{ 'background-image': `url(${props.article.coverSrc})` }"></div>

  <div class="layout">
    <!-- 文章信息 -->
    <div class="hero">
      <div class="post-info">
        <h1 class="post-title">{{ props.article.title }}</h1>
        <div class="first-line">
          <span class="post-created">发布于: {{ props.article.date }}</span>
          <span class="post-sparator">|</span>
          <span class="word-count">总字数:{{ wordCount }}</span>
          <span class="post-sparator">|</span>
          <span class="reading-time">阅读时长: {{ readingTimeLabel }}</span>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="article">
        <div class="post">
          <div class="article-content" ref="articleRef" v-html="props.article.contentHtml" ></div>

          <div class="post-copyright">
            <div class="post-copyright-author">
              <span class="post-copyright-meta">文章作者:</span>
              <span class="post-copyright-info">{{ props.article.author }}</span>
            </div>
            <div class="post-copyright-type">
              <span class="post-copyright-meta">文章链接:</span>
              <span class="post-copyright-info"><a href="#">#</a></span>
            </div>
            <div class="post-copyright-notice">
              <span class="post-copyright-meta">版权声明:</span>
              <span class="post-copyright-info">
                博客所有文章除特别声明外，均采用
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0 </a>
                许可协议。转载请注明来源
              </span>
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
          <hr class="post-hr" />
        </div>
      </div>
    </div>
    <aside class="aside">
      <article-sidebar
      :article="article"
      :articles="articles"
      :totalArticles="totalArticles"
                />
    </aside>
  </div>
</template>

<style scoped>
*{ margin:0; padding:0; }

.article-content:deep(code[data-lang]::before) {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  left: 13%;
  padding: 10px 10px;
  background: #282c34;
  color: white;
  border-bottom-left-radius: 5px;
  font-size: 15px;
}
.article-content :deep(code:not(pre code)) {
    color: #ff6b93;          
    background: rgba(255, 107, 147, 0.12); 
    padding: 3px 6px;
    border-radius: 6px;   
    font-family: Consolas, Monaco, monospace;
    font-size: 0.9em;
    margin: 0 2px;
    border: 1px solid rgba(255, 107, 147, 0.2); 
}
.article-content :deep(pre) {
    background: #282c34; 
    color: #abb2bf;                
    font-family: Consolas, Monaco, monospace;
    line-height: 1.6;
    font-size: 0.95rem;
    padding: 45px 20px 20px;        
    margin: 30px 0;
    overflow-x: auto;              
    border-radius: 16px;            
    border: 1px solid rgba(255, 158, 176, 0.3); 
    box-shadow: 0 10px 30px rgba(255, 107, 147, 0.15); 
    position: relative;             
}

.article-content :deep(pre)::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 20px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f56; 
    box-shadow: 
        20px 0 0 #ffbd2e, 
        40px 0 0 #27c93f; 
    opacity: 0.8;
}

.article-content :deep(pre code) {
    background: transparent;
    padding: 0;
    border-radius: 0;
    color: inherit;
    border: none;
    font-family: inherit;
}

/* 针对 Webkit 浏览器 (Chrome, Safari, Edge) */
.article-content :deep(pre)::-webkit-scrollbar {
    height: 8px; 
    background-color: #282c34; 
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
}

.article-content :deep(pre)::-webkit-scrollbar-thumb {
    background: #ff9eb0; 
    border-radius: 4px;
    cursor: pointer;
}

.article-content :deep(pre)::-webkit-scrollbar-thumb:hover {
    background: #ff6b93;
}
.article-content :deep(a) {
    color: #ff6b93;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 107, 147, 0.3);
    padding: 0 2px;
    transition: all 0.3s ease; 
    position: relative;
    border-radius: 4px;
}
.article-content :deep(a:hover) {
    background: rgba(255, 107, 147, 0.15);
    border-bottom-color: #ff6b93;
    color: #ff85a6;
}
.article-content :deep(a:active) {
    transform: translateY(1px); 
}
.article-content :deep(table) {
    width: 100%;
    max-width: 100%;
    border-collapse: separate; /* 为了圆角，必须用 separate 而不是 collapse */
    border-spacing: 0;
    margin: 30px 0;
    overflow: hidden;
    border: 1px solid rgba(255, 158, 176, 0.3);
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    background: #282c34;
    font-size: 0.95rem;
}
.article-content :deep(th) {
    background: rgba(255, 107, 147, 0.1); 
    color: #ff6b93;
    font-weight: 600;
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 158, 176, 0.2); 
}

.article-content :deep(td) {
    padding: 12px 16px;
    color: #abb2bf;       
    border-bottom: 1px solid rgba(255, 255, 255, 0.05); 
    transition: background 0.2s;
}
.article-content :deep(tr:last-child td) {
    border-bottom: none;
}
.article-content :deep(tr:nth-child(even)) {
    background: rgba(255, 255, 255, 0.02);
}
.article-content :deep(tr:hover td) {
    background: rgba(255, 107, 147, 0.08);
    color: #fff; 
}
.article-content :deep(blockquote) {
    margin: 30px 0;
    padding: 20px 24px;
    background: rgba(255, 107, 147, 0.05); 
    border-radius: 0 12px 12px 0;         
    border-left: 4px solid #ff6b93;
    color: #bbc2cf;    
    font-style: italic;     
    line-height: 1.8;
    position: relative;
}

/* 引用块右上角的装饰在这*/
.article-content :deep(blockquote)::after {
    content: "Pamper";
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 6rem;
    color: rgba(255, 107, 147, 0.1);
    font-family: serif;
    pointer-events: none;    
    line-height: 1;
}

.article-content :deep(blockquote p) {
    margin: 0;
}
.article-content :deep(ul),
.article-content :deep(ol) {
    padding-left: 20px;   
    margin: 20px 0;
    color:#abb2bf;         
}

.article-content :deep(li) {
    margin-bottom: 10px;    
    line-height: 1.8;
    position: relative;    
}

.article-content :deep(ul) {
    list-style: none; 
}

.article-content :deep(ul li::before) {
    content: "";
    position: absolute;
    left: -20px;
    top: 10px;       
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff6b93;
    box-shadow: 0 0 8px rgba(255, 107, 147, 0.6);
    transition: all 0.3s ease;
}
.article-content :deep(ul li:hover::before) {
    transform: scale(1.5);
    background: #ff85a6;
}
.article-content :deep(ol) {
    list-style-type: decimal;
}

.article-content :deep(ol li::marker) {
    color: #ff6b93;   
    font-weight: bold;
    font-family: Consolas, Monaco, monospace; 
    font-size: 1.1em;
}

.post-bg{
  position: fixed;
  inset: 0;
  z-index: -999;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}


.layout{
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 16px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 30px;
  align-items: start;
}

.hero{
  grid-column: 1 / -1;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}

.post-info{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.post-title{
  color: white;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 1.25;
  text-shadow: 0 6px 18px rgba(0,0,0,0.35);
}

.first-line{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.88);
  text-shadow: 0 2px 8px rgba(0,0,0,0.25);
}

.main-container{ width: 100%; max-width: none; }
.article{ width: 100%; padding: 0; }

.aside{
  position: sticky;
  top: 65px;
  height: fit-content;
  width: 280px;
  max-width: 280px;
}
.post{
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid rgba(169,169,169,0.2);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.article-content{
  line-height: 1.8;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.article-content h1,
.article-content h2,
.article-content h3{
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
  background: rgba(255,255,255,0.8);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.post-copyright:before{
  content:"";
  position:absolute;
  top:0; left:0;
  width:4px; height:100%;
  background:#ff9eb0;
  border-radius:4px 0 0 4px;
}
.post-copyright-meta{ color:#ff6b93; font-weight:bold; margin-right:8px; }
.post-copyright a{ color:#3498db; text-decoration:none; }
.post-copyright a:hover{ text-decoration: underline; }

.tags-shares{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  width: 100%;
}
.post-tag-list{ display:flex; gap:10px; flex-wrap: wrap; }
.post-tag{
  background:#ff9eb0;
  color:white;
  padding:6px 12px;
  border-radius: 20px;
  text-decoration:none;
  font-size: 0.9rem;
  transition: all .3s ease;
}
.post-tag:hover{ background:#ff6b93; transform: translateY(-2px); }
.post-share-list{ display:flex; gap:15px; }
.share-QQ, .share-Wechat{
  display:inline-block;
  width:40px; height:40px;
  border-radius: 50%;
  background-color:#f0f0f0;
  position:relative;
  transition: all .3s ease;
}
.share-QQ:hover, .share-Wechat:hover{
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.share-QQ:after{
  content:"";
  position:absolute;
  top:50%; left:50%;
  transform: translate(-50%,-50%);
  color:#12b7f5;
  font-weight:bold;
}
.share-Wechat:after{
  content:"";
  position:absolute;
  top:50%; left:50%;
  transform: translate(-50%,-50%);
  color:#07c160;
  font-weight:bold;
  background-image: url(~/assets/QQ.ico);
}

.post-hr{
  margin: 40px auto;
  border:none;
  height:2px;
  background: linear-gradient(90deg, transparent, #ffe1e6, transparent);
  width: 100%;
}

@media (max-width: 960px){
  .layout{
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .aside{
    position: static;
    width: auto;
    max-width: none;
    top: auto;
  }
  .hero{ min-height: 38vh; }
}
@media (max-width: 768px){
  .post-title{ font-size: 1.9rem; }
  .post{ padding: 25px; }
  .tags-shares{
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}

.navbar{
  display:flex;
  position:fixed;
  top:0; left:0;
  width:100%;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  justify-content: space-between;
  transition: transform .4s ease;
  align-items:center;
  padding: 15px 5%;
  z-index: 1000;
  box-sizing: border-box; 
  
}
.navbar.hidden{ transform: translateY(-100%); }
.nav-name{ font-size:1.5rem; font-weight:bold; color:#ff6b93; }
.nav-links{
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: flex-end;

  max-width: 100%;
  box-sizing: border-box;
}

.nav-links li{ margin:0 10px; }
.nav-links a{
  position: relative;
  display:inline-block;
  text-decoration:none;
  color: inherit;
  padding: 5px 0;
  font-weight: 500;
}
.nav-links a::after{
  content:'';
  position:absolute;
  bottom:0; left:0;
  width:100%;
  height:2px;
  background:#ff6b93;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .5s ease;
}
.nav-links a:hover::after{
  transform: scaleX(1);
  transform-origin: left;
}

</style>
