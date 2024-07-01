import { markRaw } from 'vue'

const viewModules = import.meta.glob('../views/**/*.vue')
const layoutModules = import.meta.glob('../layout/**/*.vue')

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach((item) => {
    if (item.component && typeof item.component === 'string') {
      if (item.component.split('/')[0] === 'views') {
        item.component = markRaw(dynamicImport(viewModules, item.component))
      } else if (item.component.split('/')[0] === 'layout') {
        item.component = markRaw(dynamicImport(layoutModules, item.component))
      }
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

const dynamicImport = (dynamicViewsModules, component) => {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../', '')
    return k === component
  })
  const matchKey = matchKeys[0]

  return dynamicViewsModules[matchKey]
}
