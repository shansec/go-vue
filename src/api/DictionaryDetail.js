import service from '@/utils/request'

// @Summary 添加字典详情
// @Description 添加字典详情，返回添加结果
// @Tags SysDictionaryDetail
// @Produce json
// @Param   dictionaryDetailInfo body system.SysDictionaryDetail true "添加字典详情"
// @Success 200 {object} response.Response{msg=string}	"添加字典详情,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "添加字典详情失败"
// @Router /dictionaryDetail/createDictionaryDetail [POST]
export const createDictionaryDetail = (data) => {
  return service({
    url: '/dictionaryDetail/createDictionaryDetail',
    method: 'POST',
    data
  })
}

// @Summary 删除字典详情
// @Description 删除字典详情，返回删除结果
// @Tags SysDictionaryDetail
// @Produce json
// @Param   dictionaryDetailInfo body system.SysDictionaryDetail true "删除字典详情"
// @Success 200 {object} response.Response{msg=string}	"删除字典详情,返回删除结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "删除字典详情失败"
// @Router /dictionaryDetail/deleteDictionaryDetail [DELETE]
export const deleteDictionaryDetail = (data) => {
  return service({
    url: '/dictionaryDetail/deleteDictionaryDetail',
    method: 'DELETE',
    data
  })
}

// @Summary 获取字典详情
// @Description 获取字典详情
// @Tags SysDictionaryDetail
// @Produce json
// @Param   dictionaryDetailInfo body system.SysDictionaryDetail true "获取字典详情"
// @Success 200 {object} response.Response{data=system.SysDictionaryDetail, msg=string}	"获取字典详情"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "获取字典详情失败"
// @Router /dictionaryDetail/getDictionaryDetail [POST]
export const getDictionaryDetail = (data) => {
  return service({
    url: '/dictionaryDetail/getDictionaryDetail',
    method: 'POST',
    data
  })
}

// @Summary 分页获取字典详情
// @Description 分页获取字典详情
// @Tags SysDictionaryDetail
// @Produce json
// @Param   pageInfo body request.SysDictionaryDetailSearch true "分页获取字典详情"
// @Success 200 {object} response.Response{data=response.PageResult, msg=string}	"分页获取字典详情"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "分页获取字典详情失败"
// @Router /dictionaryDetail/getDictionaryDetailList [POST]
export const getDictionaryDetailList = (pageInfo) => {
  return service({
    url: '/dictionaryDetail/getDictionaryDetailList',
    method: 'POST',
    data: pageInfo
  })
}

// @Summary 修改字典详情
// @Description 修改字典详情，返回修改结果
// @Tags SysDictionaryDetail
// @Produce json
// @Param   dictionaryDetailInfo body system.SysDictionaryDetail true "修改字典详情"
// @Success 200 {object} response.Response{msg=string}	"修改字典详情,返回修改结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "修改字典详情失败"
// @Router /dictionaryDetail/updateDictionaryDetail [PUT]
export const updateDictionaryDetail = (data) => {
  return service({
    url: '/dictionaryDetail/updateDictionaryDetail',
    method: 'PUT',
    data
  })
}
