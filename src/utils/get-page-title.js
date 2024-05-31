import storage from '@/utils/storage'

const getPageTitle = (pageTitle) => {
  const appInfo = storage.get('appInfo')
  const title = appInfo ? appInfo.name : 'Go-Vue'
  if (pageTitle) {
    return `${title}`
  }
  return `${title}`
}

export default getPageTitle
