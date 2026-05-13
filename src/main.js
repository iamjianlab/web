import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import zh from './locales/zh.js'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

const i18n = createI18n({
    legacy: false, // use Composition API mode
    locale: localStorage.getItem('locale') || 'zh', // set locale
    fallbackLocale: 'zh', // set fallback locale
    messages: {
        en,
        zh
    }
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
