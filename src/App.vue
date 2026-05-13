<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from './stores/useAppStore'
import { ref, computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const { t, locale } = useI18n()
const appStore = useAppStore()
const router = useRouter()

const isDark = computed(() => appStore.isDark)
const currentLocale = computed(() => (locale.value === 'zh' ? zhCn : en))

const toggleTheme = () => {
  appStore.toggleTheme()
}

const toggleLang = () => {
  const newLang = locale.value === 'en' ? 'zh' : 'en'
  locale.value = newLang
  appStore.setLocale(newLang)
}

const activeIndex = computed(() => router.currentRoute.value.path)
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <div class="app-wrapper">
      <header class="app-header glass-effect">
        <div class="container header-content">
          <div class="logo" @click="router.push('/')">
             <span class="logo-text"><span class="highlight">JIAN</span></span>
          </div>
          
          <nav class="desktop-nav">
             <router-link to="/" :class="{ active: activeIndex === '/' }">{{ t('nav.home') }}</router-link>
             <router-link to="/projects" :class="{ active: activeIndex === '/projects' }">{{ t('nav.projects') }}</router-link>
             <router-link to="/blog" :class="{ active: activeIndex === '/blog' }">{{ t('nav.blog') }}</router-link>
             <router-link to="/contact" :class="{ active: activeIndex === '/contact' }">{{ t('nav.contact') }}</router-link>
          </nav>

          <div class="actions">
            <!-- Theme Toggle -->
            <el-button circle @click="toggleTheme" class="theme-btn">
               <el-icon v-if="!isDark"><Moon /></el-icon>
               <el-icon v-else><Sunny /></el-icon>
            </el-button>

            <!-- Lang Toggle -->
             <!-- <el-button circle @click="toggleLang" class="lang-btn">
               {{ locale === 'en' ? '中文' : 'EN' }}
             </el-button> -->
          </div>
        </div>
      </header>

      <main class="app-main">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>

      <footer class="app-footer">
        <div class="container footer-content">
           <div class="scocial-links">
             <a href="https://github.com" target="_blank"><el-icon><coffee-cup /></el-icon></a> <!-- Placeholder icon, will fix -->
             <!-- Use proper icons later -->
           </div>
           
           <p>&copy; 2026 JIAN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </el-config-provider>
</template>

<style>
/* Reset & Base */
:root {
  --primary-color: #bebec1;
  --bg-color: #ffffff;
  --text-color: #000000;
  --header-height: 64px;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.5);
  --button-black: #000000;
  --button-black-hover: #1a1a1a;
  --button-black-active: #111111;
  --el-color-primary: var(--button-black);
  --el-color-primary-dark-2: var(--button-black);
  --el-color-primary-light-3: #1a1a1a;
  --el-color-primary-light-5: #2a2a2a;
  --el-color-primary-light-7: #3a3a3a;
  --el-color-primary-light-8: #4a4a4a;
  --el-color-primary-light-9: #f5f5f5;
}

html.dark {
  --primary-color: #146079; /* Lighter for dark mode */
  --bg-color: #1a1a1a; /* Dark background */
  --text-color: rgba(255, 255, 255, 0.87);
  --glass-bg: rgba(26, 26, 26, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
}

#app {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 100;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glass-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-size: 2.5rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.logo-text {
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.desktop-nav {
  display: flex;
  gap: 50px;
  font-size: 1.5rem;
  font-weight: 800;
}

.desktop-nav a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.desktop-nav a.active, .desktop-nav a:hover {
  color: rgb(129, 129, 129);
}

.desktop-nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.desktop-nav a:hover::after, .desktop-nav a.active::after {
  width: 100%;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.el-button:not(.is-link) {
  --el-button-bg-color: var(--button-black);
  --el-button-border-color: var(--button-black);
  --el-button-text-color: #ffffff;
  --el-button-hover-bg-color: var(--button-black-hover);
  --el-button-hover-border-color: var(--button-black-hover);
  --el-button-hover-text-color: #ffffff;
  --el-button-active-bg-color: var(--button-black-active);
  --el-button-active-border-color: var(--button-black-active);
  --el-button-active-text-color: #ffffff;
}

.el-button.is-link {
  --el-button-bg-color: transparent;
  --el-button-border-color: transparent;
  --el-button-hover-bg-color: transparent;
  --el-button-hover-border-color: transparent;
  --el-button-active-bg-color: transparent;
  --el-button-active-border-color: transparent;
  --el-button-text-color: var(--button-black);
  --el-button-hover-text-color: var(--button-black-hover);
  --el-button-active-text-color: var(--button-black-active);
}

.el-radio-button__inner {
  color: var(--button-black);
}

.el-radio-button__inner:hover {
  color: var(--button-black);
}

.el-radio-button__original-radio:checked + .el-radio-button__inner {
  background-color: var(--button-black);
  border-color: var(--button-black);
  box-shadow: -1px 0 0 0 var(--button-black);
  color: #ffffff;
}

.theme-btn, .lang-btn {
  background: var(--button-black);
  border: 1px solid var(--button-black);
  color: #ffffff;
}

.theme-btn:hover, .lang-btn:hover {
  background: var(--button-black-hover);
  border-color: var(--button-black-hover);
  color: #ffffff;
}

/* Main Content */
.app-main {
  margin-top: var(--header-height);
  padding: 40px 0;
  min-height: calc(100vh - var(--header-height) - 100px); /* Adjust based on footer height */
}

/* Footer */
.app-footer {
  padding: 40px 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .app-footer {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
