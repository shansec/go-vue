import service from '@/util/request'

// @Summary 创建 api
// @Tags SysApi
// @Accept json
// @Produce json
// @Param createApiInfo body system.SysApi true "创建 api"
// @Success 200 {object} response.Response{msg=string} "创建成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "服务器内部错误"
// @Router /api/createApi [POST]
export const createApi = (data) => {
  return service({
    url: '/api/createApi',
    method: 'POST',
    data
  })
}

// @Summary 删除 api
// @Tags SysApi
// @Accept json
// @Produce json
// @Param deleteApiInfo body system.SysApi true "删除 api"
// @Success 200 {object} response.Response{msg=string} "删除成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "服务器内部错误"
// @Router /api/deleteApi [DELETE]
export const deleteApi = (data) => {
  return service({
    url: '/api/deleteApi',
    method: 'DELETE',
    data
  })
}

// @Summary 更新 api
// @Tags SysApi
// @Accept json
// @Produce json
// @Param updateApiInfo body system.SysApi true "更新 api"
// @Success 200 {object} response.Response{msg=string} "更新成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "服务器内部错误"
// @Router /api/updateApi [PUT]
export const updateApi = (data) => {
  return service({
    url: '/api/updateApi',
    method: 'PUT',
    data
  })
}

// @Summary 获取 api 列表
// @Description 分页查询 api 信息列表
// @Tags SysApi
// @Accept json
// @Produce json
// @Param  apiPageInfo body systemReq.GetApiList true "api 列表查询参数"
// @Success 200 {object} response.PageResult{list=[]system.SysApi, msg=string}	"api 列表获取成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "获取部门列表失败"
// @Router /api/getApiList [GET]
export const getApiList = (pageInfo) => {
  return service({
    url: '/api/getApiList',
    method: 'POST',
    pageInfo
  })
}
