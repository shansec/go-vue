import service from '@/utils/request'

// @Summary 获取验证码
// @Description 生成并返回一个新的默认数字验证码
// @Tags SysUser
// @Produce json
// @Success 200 {object} response.Response{data=systemRes.SysCaptchaResponse, msg=string}	"获取验证码"
// @Failure 500 {object} response.Response "验证码获取失败"
// @Router /base/captcha [GET]
export const getCaptcha = () => {
  return service({
    url: '/base/captcha',
    method: 'GET'
  })
}
