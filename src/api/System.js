import service from '@/utils/request'

// @Summary 获取服务器信息
// @Description 查询并返回系统的服务器相关信息
// @Tags System
// @Produce json
// @Success 200 {object} response.Response{msg=string}	"获取服务器信息"
// @Failure 500 {object} response.Response "获取失败"
// @Router /system/status [GET]
export const getSystemState = () => {
  return service({
    url: '/system/getServerInfo',
    method: 'get',
    donNotShowLoading: true
  })
}
