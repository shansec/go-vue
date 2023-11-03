import service from '@/utils/request'

export const getCaptcha = () => {
  return service({
    url: '/base/captcha',
    method: 'GET'
  })
}
