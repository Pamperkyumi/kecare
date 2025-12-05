<script lang="ts" setup>
import sidebar from '@/components/blog-sidebar.vue'
import {ref} from "vue"

const props = defineProps<{
    friends:{
        title:string;
        contentHtml:string;
        coverSrc:string;
    }
}>()

// navbar
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

</script>

<template>
    <div class="content-section" >
        <div class="navbar" ref="navbar">
            <div class="nav-name">Pamper</div>
            <ul class="nav-links">
                <li><a href="#">首页</a></li>
                <li><a href="#">归档</a></li>
                <li><a href="#">标签</a></li>
                <li><a href="#">关于</a></li>
                <li><a href="#">友链</a></li>
          </ul>
      </div>
    </div>
    <div class="main-container">
        <div class="post-info">
            <h1 class="post-title">{{ props.friends.title }}</h1>
        </div>
        <div class="article-content" v-html="props.friends.contentHtml">
        </div>
    </div>
    <div>
        <sidebar></sidebar>
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



</style>