import storage from '@/utils/storage'

const getPageTitle = (pageTitle) => {
  const appInfo = storage.get('appInfo')
  const title = appInfo ? appInfo.name : 'go-vue'
  if (pageTitle) {
    return `${title}`
  }
  return `${title}`
}

export default getPageTitle
