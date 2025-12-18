<script lang="ts" setup>
import { ref, computed} from 'vue';
import AuthorCard from './Author-card.vue';
import TocCard from './Toc-card.vue';
import type { Article } from 'kecare-tools';
const props = defineProps<{
    article:Article;
    totalArticles:number;

}>()
const tab = ref<"toc" | "author">("toc");
const headings = computed(() => props.article.headings ?? []);
</script>
<template>
  <div class="aside-shell">
    <div class="card">
      <div class="card-body" :key="tab">
        <TocCard v-if="tab === 'toc'" :headings="headings" />
        <AuthorCard v-else :totalArticles="props.totalArticles" />
      </div>

      <div class="actions" role="tablist" aria-label="侧边栏切换">
        <button
        type="button"
        class="action-btn"
        :class="{ active: tab === 'toc' }"
        @click="tab = 'toc'"
        role="tab"
        :aria-selected="tab === 'toc'"
        aria-label="目录"
        title="目录"
        >
        <span class="badge-icon badge-toc" aria-hidden="true"></span>
        </button>
        <button
        type="button"
        class="action-btn"
        :class="{ active: tab === 'author' }"
        @click="tab = 'author'"
        role="tab"
        :aria-selected="tab === 'author'"
        aria-label="作者"
        title="作者"
        >
        <span class="badge-icon badge-home" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aside-shell{
  width: 500px;
  max-width: 280px;
}

.card{
  border: 1px solid rgba(169, 169, 169, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden; 
}

.card-body{
  padding: 14px 14px 12px;
  min-height: 300px; 
  animation: fadeIn 160ms ease-out;
}

.actions{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.55);
}

/* 按钮基础样式 */
.action-btn{
  width: 100%;
  padding: 10px 0;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.75);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

/* hover */
.action-btn:hover{
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.95);
}

.action-btn.active{
  background: linear-gradient(135deg, #ff9eb0, #ff6b93);
  color: #fff;
  border-color: rgba(255, 107, 147, 0.55);
  box-shadow: 0 10px 22px rgba(255, 107, 147, 0.25);
}

.action-btn:focus-visible{
  outline: 3px solid rgba(255, 107, 147, 0.35);
  outline-offset: 2px;
}

@keyframes fadeIn{
  from{ opacity: 0; transform: translateY(4px); }
  to{ opacity: 1; transform: translateY(0); }
}

@media (max-width: 960px){
  .aside-shell{
    width: 100%;
    max-width: none;
  }
}

.action-btn{
  display: grid;
  place-items: center;
}

.badge-icon{
  position: relative;
  display: inline-block;
  width: 44px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background: rgba(255,255,255,0.85);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
}

.action-btn.active .badge-icon{
  border-color: rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.20);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
}

.badge-toc::before{
  content:"";
  position:absolute;
  left: 10px;
  top: 50%;
  width: 6px;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 2px;
  background: rgba(0,0,0,0.65);
  box-shadow:
    9px 0 0 rgba(0,0,0,0.45),
    18px 0 0 rgba(0,0,0,0.30);
}

.badge-toc::after{
  content:"";
  position:absolute;
  left: 16px;
  top: 50%;
  width: 20px;
  height: 2px;
  transform: translateY(-50%);
  background:
    linear-gradient(to right,
      rgba(0,0,0,0.35) 0 40%,
      transparent 40% 55%,
      rgba(0,0,0,0.25) 55% 100%);
  border-radius: 2px;
}

.action-btn.active .badge-toc::before{
  background: rgba(255,255,255,0.95);
  box-shadow:
    9px 0 0 rgba(255,255,255,0.82),
    18px 0 0 rgba(255,255,255,0.68);
}
.action-btn.active .badge-toc::after{
  background:
    linear-gradient(to right,
      rgba(255,255,255,0.75) 0 40%,
      transparent 40% 55%,
      rgba(255,255,255,0.55) 55% 100%);
}

.badge-home::before{
  content:"";
  position:absolute;
  left: 50%;
  top: 7px;
  width: 14px;
  height: 14px;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 2px;
  background: rgba(0,0,0,0.55); 
}

.badge-home::after{
  content:"";
  position:absolute;
  left: 50%;
  top: 12px;
  width: 18px;
  height: 12px;
  transform: translateX(-50%);
  border-radius: 3px;
  background: rgba(0,0,0,0.38); 
  box-shadow: inset 0 -0 0 0 rgba(0,0,0,0);
}

.badge-home{
  background-image:
    linear-gradient(to top,
      transparent 0 100%);
}
.badge-home::after{
  background:
    linear-gradient(to bottom,
      rgba(0,0,0,0.38) 0 100%);
}
.badge-home{
  overflow: hidden;
}
.badge-home .door{ display:none; }
.action-btn.active .badge-home::before{ background: rgba(255,255,255,0.92); }
.action-btn.active .badge-home::after{ background: rgba(255,255,255,0.70); }

</style>
