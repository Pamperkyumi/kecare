<script lang="ts" setup>
import type { Article } from "../../../generator/types/article";
const props = defineProps<{

    articles:Article[];
    totalArticles?:number;
}>()
const totalCount = computed(() => props.totalArticles ?? props.articles.length)
</script>
<template>
    <div class="sidebar">
    <div class="author-card">
        <div class="avatar">
            <img src="~/assets/avatar.webp">
        </div>
        <h3 class="author-name">Pamper</h3>
        <p class="author-About">喵喵喵喵喵喵喵！喵喵。</p>
        <div class="author-stats">
            <div class="stat-item">
                <div class="stat-label">文章</div>
                <div class="stat-num">{{ totalCount }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">标签</div>
                <div class="stat-num">1919810</div>
            </div>
        </div>
        <button class="follow" onclick="window.open('https://space.bilibili.com/422742655', '_blank')">灌注喵</button>
    </div>
    <div class="sidebar-section">
        <h3 class="sidebar-title">标签云</h3>
        <div class="tags-cloud">
            <a href="#" class="tag">喵</a>
            <a href="#" class="tag">喵喵</a>
            <a href="#" class="tag">喵喵喵</a>
            <a href="#" class="tag">喵喵喵喵</a>
        </div>
    </div>
</div>
</template>
<style scoped>
        .sidebar {
            width: 350px;
            flex-shrink: 0;
            position: sticky;
            top: 90px;
            height: fit-content;
        }

        .author-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-bottom: 30px;
        }

        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 15px;
            border: 3px solid #ff9eb0;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .author-name {
            font-size: 1.4rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .author-About {
            color: #666;
            margin-bottom: 20px;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .author-stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
            padding: 15px 0;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }

        .stat-item {
            display: flex;
            flex-direction: column;
        }

        .stat-num {
            font-weight: bold;
            font-size: 1.2rem;
            color: #ff6b93;
        }

        .stat-label {
            font-size: 0.85rem;
            color: #888;
        }

        .follow {
            background: #ff9eb0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
        }

        .follow:hover {
            background: #ff6b93;
            transform: translateY(-2px);
        }

        .sidebar-section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        .sidebar-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #2c3e50;
            padding-bottom: 10px;
            border-bottom: 2px solid #ff9eb0;
        }

        .tags-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .tag {
            background: #f0f0f0;
            color: #666;
            padding: 5px 12px;
            border-radius: 15px;
            text-decoration: none;
            font-size: 0.85rem;
            transition: all 0.3s ease;
        }

        .tag:hover {
            background: #ff9eb0;
            color: white;
            transform: translateY(-2px);
        }
</style>