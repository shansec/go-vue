import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const registerIcon = (app) => {
  Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key])
  })
}
