<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const projects = [
  {
    id: 1,
    title: '小麦网票务平台',
    desc: '支持演唱会等大型演出票务销售，采用go-zero实现高并发、高稳定、高可用',
    tags: ['Vue', 'Go'],
    
    link: '#'
  }
]
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
       <div class="content">
          <h1 class="gradient-text">{{ t('home.intro') }}</h1>
          <p class="subtitle">{{ t('home.desc') }}</p>
          <!-- <div class="actions">
            <el-button type="primary" size="large" round @click="router.push('/projects')">
              {{ t('home.viewProjects') }}
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
            <el-button size="large" round @click="router.push('/contact')">{{ t('home.contactMe') }}</el-button> -->
          <!-- </div> -->
       </div>
       <div class="visuals">
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
       </div>
    </section>

    <!-- Featured Projects -->
    <section class="section featured">
      <div class="container">
        <h2 class="section-title">{{ t('home.featuredProjects') }}</h2>
        <div class="grid">
          <el-card 
            v-for="project in projects" 
            :key="project.id" 
            class="card-hover"
            body-style="padding: 20px"
          >
            <h3>{{ project.title }}</h3>
            <p>{{ project.desc }}</p>
            <div class="tags">
              <el-tag v-for="tag in project.tech" :key="tag" effect="plain" round>{{ tag }}</el-tag>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section about">
      <div class="container">
        <div class="about-content">
           <h2 class="section-title">{{ t('home.aboutTitle') }}</h2>
           <p>
             {{ t('home.about') }}
           </p>
           <div class="social-links">
             <el-button circle size="large"><el-icon><Platform /></el-icon></el-button>
             <el-button circle size="large"><el-icon><Message /></el-icon></el-button>
             <el-button circle size="large"><el-icon><Share /></el-icon></el-button>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  overflow-x: hidden;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 0 20px;
}

.content {
  z-index: 10;
  max-width: 900px;
}

.gradient-text {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(45deg, #409EFF, #b882ff, #ff6b6b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Floating Shapes Animation */
.visuals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 10s infinite ease-in-out;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #409EFF;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: #b882ff;
  bottom: 10%;
  right: 10%;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}

.section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: none;
  background: var(--el-bg-color-overlay);
}

.card-hover:hover {
  transform: translateY(-10px);
  box-shadow: var(--el-box-shadow-light);
}

.tags {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.about-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.about-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--el-text-color-regular);
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .gradient-text {
    font-size: 2.5rem;
  }
}
</style>
