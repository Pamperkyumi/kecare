<script lang="ts" setup>
import { ref, computed} from 'vue';
import AuthorCard from './Author-card.vue';
import TocCard from './Toc-card.vue';
import type { Article} from "../../../generator/types/article";
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
        >
          目录喵
        </button>
        <button
          type="button"
          class="action-btn"
          :class="{ active: tab === 'author' }"
          @click="tab = 'author'"
          role="tab"
          :aria-selected="tab === 'author'"
        >
          我喵
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aside-shell{
  width: 280px;
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
  min-height: 220px;
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
</style>
