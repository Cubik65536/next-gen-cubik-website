import { computed } from 'vue'
import { useData } from 'vitepress'

// Import language files
import enYaml from '../locales/en.yaml'
import zhYaml from '../locales/zh.yaml'

const translations = {
  'en': enYaml,
  'zh-CN': zhYaml
}

export function useI18n() {
  const { theme } = useData()
  
  const currentLang = computed(() => theme.value.siteMeta?.lang || 'en')
  
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]
    
    if (!value) {
      console.warn(`No translations found for language: ${currentLang.value}`)
      value = translations['en'] // Fallback to English
    }
    
    for (const k of keys) {
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = value[k]
    }
    
    return value || key
  }

  return {
    t,
    currentLang
  }
}
