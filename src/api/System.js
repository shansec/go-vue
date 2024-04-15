import service from '@/utils/request'

// @Tags System
// @Summary 获取服务器信息
// @Produce json
// @Success 200 {object} response.Response{msg=string}	"获取服务器信息"
// @Router /system/status [GET]
export const getSystemState = () => {
  return service({
    url: '/v1/system/getServerInfo',
    method: 'get',
    donNotShowLoading: true
  })
}
