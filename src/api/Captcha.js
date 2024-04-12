import service from '@/utils/request'

export const getCaptcha = () => {
  return service({
    url: '/v1/base/captcha',
    method: 'GET'
  })
}
