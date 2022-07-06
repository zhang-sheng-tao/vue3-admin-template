import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/pinia/index.js'
import api from '@/api'

import './permission.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$api = api

app.use(pinia)
app.use(router)
app.mount('#app')

