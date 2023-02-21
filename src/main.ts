import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { registerEleIcon } from '@/plugins/ElementIcon'
// 引入黑暗模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element-dark.scss'

import '@/style/style.scss'
import router from './router/index.js'
import pinia from './store'
import App from './App.vue'

const app = createApp(App)
registerEleIcon(app)

app.use(pinia)
app.use(router)
app.use(ElementPlus).mount('#app')
