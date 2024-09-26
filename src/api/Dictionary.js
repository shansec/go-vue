import service from '@/utils/request'

// @Summary 添加字典
// @Description 添加字典，返回添加结果
// @Tags SysDictionary
// @Produce json
// @Param   dictionaryInfo body system.SysDictionary true "添加字典"
// @Success 200 {object} response.Response{msg=string}	"添加字典,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "添加字典失败"
// @Router /dictionary/createDictionary [POST]
export const createDictionary = (data) => {
  return service({
    url: '/dictionary/createDictionary',
    method: 'POST',
    data
  })
}

// @Summary 删除字典
// @Description 删除字典，返回添加结果
// @Tags SysDictionary
// @Produce json
// @Param   dictionaryInfo body system.SysDictionary true "删除字典"
// @Success 200 {object} response.Response{msg=string}	"删除字典,返回删除结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "删除字典失败"
// @Router /dictionary/deleteDictionary [DELETE]
export const deleteDictionary = (data) => {
  return service({
    url: '/dictionary/deleteDictionary',
    method: 'DELETE',
    data
  })
}

// @Summary 获取字典详情
// @Description 获取字典详情
// @Tags SysDictionary
// @Produce json
// @Param   dictionaryInfo body system.SysDictionary true "获取字典详情"
// @Success 200 {object} response.Response{data=system.SysDictionary, msg=string}	"获取字典详情"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "获取字典详情失败"
// @Router /dictionary/getDictionary [POST]
export const getDictionary = (data) => {
  return service({
    url: '/dictionary/getDictionary',
    method: 'POST',
    data
  })
}

// @Summary 分页获取字典
// @Description 分页获取字典
// @Tags SysDictionary
// @Produce json
// @Param   dictionaryInfo body system.SysDictionary true "分页获取字典"
// @Success 200 {object} response.Response{data=system.SysDictionary, msg=string}	"分页获取字典"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "分页获取字典失败"
// @Router /dictionary/getDictionaryInfoList [POST]
export const getDictionaryInfoList = (pageInfo) => {
  return service({
    url: '/dictionary/getDictionaryInfoList',
    method: 'POST',
    data: pageInfo
  })
}

// @Summary 修改字典
// @Description 修改字典，返回修改结果
// @Tags SysDictionary
// @Produce json
// @Param   dictionaryInfo body system.SysDictionary true "修改字典"
// @Success 200 {object} response.Response{msg=string}	"修改字典,返回修改结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "修改字典失败"
// @Router /dictionary/updateDictionary [PUT]
export const updateDictionary = (data) => {
  return service({
    url: '/dictionary/updateDictionary',
    method: 'PUT',
    data
  })
}
