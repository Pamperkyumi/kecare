<script lang="ts" setup>
import type { heading } from 'kecare-tools';

const props = defineProps<{
  headings: heading[];
}>();
</script>

<template>
  <section class="toc">
    <h3 class="toc-title">目录</h3>

    <ul class="toc-list">
      <li class="toc-item" v-for="h in props.headings" :key="h.id || h.text">
        <a class="toc-link" :href="`#${h.id}`" :title="h.text">{{ h.text }}</a>

        <ul v-if="h.depth === 1 && h.children?.length" class="toc-sublist">
          <li class="toc-subitem" v-for="c in h.children" :key="c.id || c.text">
            <a class="toc-sublink" :href="`#${c.id}`" :title="c.text">{{ c.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<style>
  .toc{
  border-left: 4px solid #ff9eb0;
  padding-left: 12px;
  background: transparent;
}

.toc-title{
  font-size: 1.05rem;
  font-weight: 700;
  color: #ff6b93;
  margin: 0 0 10px;
}

.toc-list,
.toc-sublist{
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item{
  margin: 6px 0;
}

.toc-link,
.toc-sublink{
  display: block;             
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.6;

  text-decoration: none;
  color: rgba(0, 0, 0, 0.78);
  font-size: 0.92rem;

  padding: 6px 8px;
  border-radius: 10px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.toc-link:hover,
.toc-sublink:hover{
  background: rgba(255, 158, 176, 0.18);
  transform: translateX(2px);
}

.toc-sublist{
  margin-top: 6px;
  margin-left: 10px;
  padding-left: 12px;
  border-left: 2px dashed rgba(255, 107, 147, 0.35);
}

.toc-subitem{
  margin: 4px 0;
}

.toc-sublink{
  font-size: 0.88rem;
  color: rgba(0, 0, 0, 0.68);
  padding: 5px 8px;
}

</style>

