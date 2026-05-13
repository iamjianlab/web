<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'Vue', 'Go']

const allProjects = [
  {
    id: 1,
    title: '小麦网票务平台',
    desc: '支持演唱会等大型演出票务销售，采用go-zero实现高并发、高稳定、高可用',
    tags: ['Vue', 'Go'],
    
    link: '#'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return allProjects
  return allProjects.filter(p => p.tags.some(t => t.includes(activeFilter.value)))
})
</script>

<template>
  <div class="projects-container container">
    <div class="header">
      <h1 class="page-title">我的项目</h1>
    </div>

    <!-- Filters -->
    <div class="filters">
      <el-radio-group v-model="activeFilter" size="large">
        <el-radio-button v-for="f in filters" :key="f" :label="f" />
      </el-radio-group>
    </div>

    <!-- Grid -->
    <transition-group name="list" tag="div" class="projects-grid">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <div class="card-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="tags">
            <el-tag v-for="tag in project.tags" :key="tag" effect="dark" size="small">{{ tag }}</el-tag>
          </div>
          <div class="actions">
            <el-button type="primary" link>查看详情</el-button>
            <el-button link><el-icon><Link /></el-icon></el-button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.projects-container {
  padding-top: 40px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
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

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.project-card {
  background: var(--el-bg-color);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--el-border-color-light);
  transition: all 0.3s ease;
  position: relative;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--el-box-shadow);
  border-color: var(--primary-color);
}

.card-content {
  padding: 25px;
}

.card-content h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: var(--el-text-color-primary);
}

.card-content p {
  color: var(--el-text-color-regular);
  margin-bottom: 20px;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid var(--el-border-color-lighter);
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
