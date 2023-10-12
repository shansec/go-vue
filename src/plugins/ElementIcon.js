// 引入组件库全局样式资源
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const registerEleIcon = (app) => {
  Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key])
  })
}
