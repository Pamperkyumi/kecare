<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from 'kecare'

defineOptions({
    name: 'SidebarNavTree',
})

const props = withDefaults(defineProps<{
    items: NavItem[]
    level?: number
}>(), {
    level: 0,
})

const route = useRoute()
const expandedGroups = ref<Set<string>>(new Set())

const isLinkItem = (
    item: NavItem
): item is { text: string; link: string; level: number } => {
    return 'link' in item
}

function isActiveLink(link: string) {
    if (route.path === link) return true

    const hash = link.replace(/^\.\//, '')
    if (!hash) return false

    return route.path.endsWith(`/${hash}`)
}

const paddingStyle = computed(() => {
    return `padding-left: ${props.level * 12}px;`
})

function keyOf(item: NavItem) {
    return isLinkItem(item) ? `l:${item.link}` : `g:${item.text}:${props.level}`
}

/**
 * 递归判断：当前 item 自己，或者它的后代中，
 * 是否包含当前正在访问的页面
 */
function hasActiveDescendant(item: NavItem): boolean {
    if (isLinkItem(item)) {
        return isActiveLink(item.link)
    }

    if (!item.items || item.items.length === 0) {
        return false
    }

    return item.items.some(child => hasActiveDescendant(child))
}

function isGroupExpanded(item: NavItem): boolean {
    if (isLinkItem(item)) return true
    return expandedGroups.value.has(keyOf(item))
}

function toggleGroup(item: NavItem) {
    if (isLinkItem(item)) return

    const key = keyOf(item)
    if (expandedGroups.value.has(key)) {
        expandedGroups.value.delete(key)
    } else {
        expandedGroups.value.add(key)
    }
}

function collectExpandedGroups(items: NavItem[], expanded: Set<string>) {
    for (const item of items) {
        if (!isLinkItem(item) && hasActiveDescendant(item)) {
            expanded.add(keyOf(item))
            if (item.items && item.items.length > 0) {
                collectExpandedGroups(item.items, expanded)
            }
        }
    }
}

function initializeExpandedState() {
    const nextExpanded = new Set<string>()
    collectExpandedGroups(props.items, nextExpanded)
    expandedGroups.value = nextExpanded
}

watch(() => route.path, initializeExpandedState, { immediate: true })
watch(() => props.items, initializeExpandedState, { immediate: true, deep: true })
</script>

<template>
    <ul class="side-nav" :style="paddingStyle">
        <li v-for="item in props.items" :key="keyOf(item)" class="side-nav-item">
            <NuxtLink v-if="isLinkItem(item)" class="side-nav-link" :class="{ active: isActiveLink(item.link) }"
                :to="item.link">
                {{ item.text }}
            </NuxtLink>

            <div v-else class="side-nav-group">
                <div class="side-nav-group-header" @click="toggleGroup(item)">
                    <span class="side-nav-group-title">{{ item.text }}</span>
                    <span class="side-nav-toggle-icon" :class="{ expanded: isGroupExpanded(item) }">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M6 4l4 4-4 4V4z" />
                        </svg>
                    </span>
                </div>

                <div class="side-nav-group-content" :class="{ collapsed: !isGroupExpanded(item) }">
                    <SidebarNavTree v-if="item.items && item.items.length > 0" :items="item.items"
                        :level="props.level + 1" />
                </div>
            </div>
        </li>
    </ul>
</template>
<style scoped>
/* 侧边栏列表样式 */
.side-nav {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* 侧边栏列表项样式 */
.side-nav-item {
    margin: 6px 0;
    line-height: 1.5;
}

/* 侧边栏嵌套列表样式 */
.side-nav .side-nav {
    margin-top: 6px;
    padding-left: 14px;
    border-left: 2px solid rgba(79, 195, 247, 0.18);
}

/* 侧边栏链接样式 */
.side-nav-link {
    display: block;
    padding: 8px 10px;
    border-radius: 10px;
    text-decoration: none;
    color: #2c3e50;
    border: 1px solid transparent;
    transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
    line-height: 1.3;
    word-break: break-word;
}

/* 侧边栏链接悬停样式 */
.side-nav-link:hover {
    background: rgba(79, 195, 247, 0.12);
    border-color: rgba(79, 195, 247, 0.18);
    color: #4fc3f7;
    transform: translateY(-1px);
}

/* 侧边栏激活状态样式 */
.side-nav-link.active {
    background: rgba(79, 195, 247, 0.16);
    border-color: rgba(79, 195, 247, 0.22);
    color: #4fc3f7;
    font-weight: 700;
}

/* 侧边栏分组头部样式 */
.side-nav-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 10px;
    transition: background 0.18s ease;
    user-select: none;
}

.side-nav-group-header:hover {
    background: rgba(255, 255, 255, 0.06);
}

/* 侧边栏分组标题样式 */
.side-nav-group-title {
    display: block;
    margin: 0;
    font-size: 0.86rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    color: rgba(0, 0, 0, 0.85);
}

/* 侧边栏展开图标样式 */
.side-nav-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.5);
    transition: transform 0.25s ease;
    flex-shrink: 0;
}

.side-nav-toggle-icon.expanded {
    transform: rotate(90deg);
}

/* 侧边栏分组内容样式 */
.side-nav-group-content {
    overflow: hidden;
    max-height: 2000px;
    transition: max-height 0.3s ease-out, opacity 0.2s ease;
    opacity: 1;
}

.side-nav-group-content.collapsed {
    max-height: 0;
    opacity: 0;
}
</style>