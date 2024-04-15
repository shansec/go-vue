import service from '@/utils/request.js'

// @Tags SysDept
// @Summary 添加部门
// @Produce json
// @Param   data body systemReq.Create true "添加部门"
// @Success 200 {object} response.Response{msg=string}	"添加部门,返回添加结果"
// @Router /dept/createDept [POST]
export const createDept = (data) => {
  return service({
    url: '/v1/dept/createDept',
    method: 'POST',
    data
  })
}

// @Tags SysDept
// @Summary 获取部门列表
// @Produce json
// @Param   data body systemReq.GetDeptList true "空"
// @Success 200 {object} response.Response{data=response.PageResult, msg=string}	"获取部门列表,返回部门列表"
// @Router /dept/getDeptList [POST]
export const getDeptList = (data) => {
  return service({
    url: '/v1/dept/getDeptList',
    method: 'POST',
    data
  })
}

// @Tags SysDept
// @Summary 删除部门信息
// @Produce json
// @Param   data body system.SysDept true "删除部门信息"
// @Success 200 {object} response.Response{msg=string} "删除部门信息，返回操作结果"
// @Router /dept/delDeptInfo [DELETE]
export const delDeptInfo = (data) => {
  return service({
    url: '/v1/dept/delDeptInfo',
    method: 'DELETE',
    data
  })
}

// @Tags SysDept
// @Summary 更新部门信息
// @Produce json
// @Param   data body system.SysDept true "更新部门信息"
// @Success 200 {object} response.Response{msg=string} "更新部门信息,返回更新结果"
// @Router /dept/updateDeptInfo [PUT]
export const updateDeptInfo = (data) => {
  return service({
    url: '/v1/dept/updateDeptInfo',
    method: 'PUT',
    data
  })
}
