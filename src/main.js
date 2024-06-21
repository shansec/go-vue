import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { iconIndex } from '@/plugins/index'
// 引入黑暗模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
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
import BasicLayout from '@/components/BasicLayout/index.vue'
import CustomElButton from '@/components/CustomElButton/index.vue'

const app = createApp(App)
iconIndex(app)

app.component('SvgIcon', SvgIcon)
app.component('Pagination', Pagination)
app.component('BasicLayout', BasicLayout)
app.component('CustomElButton', CustomElButton)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn }).mount('#app')
