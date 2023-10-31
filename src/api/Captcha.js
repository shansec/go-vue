import { get } from '@/utils/request'
export default class Captcha {
  static async getCaptcha() {
    return get('/base/captcha')
  }
}
