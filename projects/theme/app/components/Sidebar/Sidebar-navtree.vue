<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import type { NavItem } from 'kecare-tools';

    defineOptions({
        name: 'SidebarNavTree',
    })
    const props = withDefaults(defineProps<{
        items: NavItem[];
        level?: number;
    }>(), {
        level: 0,
    })
    const route = useRoute();
    const isLinkItem = (item: NavItem): item is { text: string; link: string;level: number } => {

        return 'link' in item;

    }
    function isActiveLink(link:string){
        return route.path === link;
    }
    const paddingStyle = computed(() => {
        return `padding-left: ${props.level * 12}px;`;
    })

    function keyOf(item: NavItem) {
        return isLinkItem(item) ? `l:${item.link}` : `g:${item.text}:${props.level}`
    }
</script>
<template>
    <ul class="side-nav" :style="paddingStyle">
        <li v-for="item in props.items" :key="keyOf(item)" class="side-nav-item">
            <RouterLink
                v-if="isLinkItem(item)"
                class="side-nav-link"
                :class="{ active: isActiveLink(item.link) }"
                :to="item.link"
            >
                {{ item.text }}
            </RouterLink>
            
            <div v-else class="side-nav-group">
                <span class="side-nav-group-title">{{ item.text }}</span>
                <SidebarNavTree 
                    v-if="item.items && item.items.length > 0"
                    :items="item.items"
                    :level="props.level + 1"
                />
            </div>
        </li>
    </ul>
</template>
<style scoped>
.side-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.side-nav-item {
  margin: 2px 0;
}

/* 分组标题（更像目录小标题） */
.side-nav-group-title {
  display: block;
  margin: 12px 0 6px;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.72);
}

/* 链接项：整行可点、hover 更舒服 */
.side-nav-link {
  display: block;
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none;

  color: rgba(255, 255, 255, 0.66);
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  border: 1px solid transparent;

  line-height: 1.3;
  word-break: break-word;
}

.side-nav-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.90);
}

/* 激活态：简约但明显 */
.side-nav-link.active {
  color: rgba(255, 255, 255, 0.92);
  background: rgba(255, 107, 147, 0.14);
  border-color: rgba(255, 107, 147, 0.22);
  font-weight: 650;
}

/* 层级缩进：你用 paddingStyle 控制了 ul 的 padding-left，这里不额外处理即可 */

</style>