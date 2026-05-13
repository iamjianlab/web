import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useAppStore = defineStore('app', () => {
    const isDark = ref(localStorage.getItem('isDark') === 'true')
    const locale = ref(localStorage.getItem('locale') || 'zh')

    // Handle initial load
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    const toggleTheme = () => {
        isDark.value = !isDark.value
        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('isDark', 'true')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('isDark', 'false')
        }
    }

    const setLocale = (lang) => {
        locale.value = lang
        localStorage.setItem('locale', lang)
    }

    return { isDark, locale, toggleTheme, setLocale }
})
