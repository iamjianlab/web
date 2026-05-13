<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const posts = [
  {
    id: 1,
    title: 'go-zero入门',
    excerpt: 'go-zero是一个微服务框架',
    date: '2026-02-13',
    tags: ['go', 'go-zero']
  }
]
</script>

<template>
  <div class="blog-container container">
    <div class="header">
      <h1 class="page-title">{{ t('blog.title') }}</h1>
      <p class="page-subtitle">less is more</p>
    </div>

    <div class="blog-list">
      <el-card v-for="post in posts" :key="post.id" class="post-card" shadow="hover">
         <div class="post-meta">
           <span class="date">{{ post.date }}</span>
         </div>
         <h2 class="post-title">{{ post.title }}</h2>
         <p class="post-excerpt">{{ post.excerpt }}</p>
         <div class="post-footer">
            <div class="tags">
               <el-tag v-for="tag in post.tags" :key="tag" effect="plain" size="small">{{ tag }}</el-tag>
            </div>
            <el-button link type="primary">阅读更多 &rarr;</el-button>
         </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  padding-top: 40px;
  max-width: 800px; /* Narrower for readability */
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-subtitle {
  color: var(--el-text-color-secondary);
  font-size: 1.2rem;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-card {
  border-radius: 12px;
  border: 1px solid var(--el-border-color-lighter);
}

.post-meta {
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.dot {
  font-size: 1.5rem;
  line-height: 0;
}

.post-title {
  font-size: 1.8rem;
  margin: 0 0 16px 0;
  line-height: 1.3;
  color: var(--el-text-color-primary);
  cursor: pointer;
  transition: color 0.3s;
}

.post-title:hover {
  color: var(--primary-color);
}

.post-excerpt {
  color: var(--el-text-color-regular);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.tags {
  display: flex;
  gap: 8px;
}
</style>
