        <script setup lang="ts">
        import BlogLanding from "../components/blog-landing.vue";
        const articles =  [
    {
        "id": "ea75beb6",
        "title": "ea75beb6",
        "desc": "测试",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>测试</p>\n",
        "date": "2025-11-14",
        "author": "Pamper",
        "to": "/articles/ea75beb6",
        "headings": [],
        "menudata": null
    },
    {
        "id": "9de17add",
        "title": "HelloWorld",
        "desc": "Hello World",
        "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
        "contentHtml": "<p>Welcome to <a href=\"http://zespia.tw/hexo\">Hexo</a>! This is your very first post. Check <a href=\"http://zespia.tw/hexo/docs\">documentation</a> to learn how to use.</p>\n<p>纪念一下此避难所复活日期</p>\n",
        "date": "2025-10-06",
        "author": "Pamper",
        "to": "/articles/9de17add",
        "headings": [],
        "menudata": null
    }
]; 
        const page = 2;
        const pageSize = 5;
        const totalPages = 2;
        const totalArticles = 7;
        const title = "文章列表";
        </script>
        <template>
            <BlogLanding
            :articles="articles"
            :page="page"
            :page-size="pageSize"
            :total-pages="totalPages"
            :total-articles="totalArticles"
            :title="title"
            />
        </template>
        