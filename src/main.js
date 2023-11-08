import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { registerEleIcon } from '@/plugins/ElementIcon.js'
// 引入黑暗模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element-dark.scss'

import '@/style/style.scss'
import router from './router/index.js'
import pinia from './store/index.js'
import App from './App.vue'

import './permission'
import './icons'
import 'virtual:svg-icons-register'

// 引入 iconfont 图标
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

const app = createApp(App)
registerEleIcon(app)

app.component('SvgIcon', SvgIcon)
app.component('Pagination', Pagination)
app.use(pinia)
app.use(router)
app.use(ElementPlus).mount('#app')
