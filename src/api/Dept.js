import service from '@/utils/request.js'

// @Summary 添加部门
// @Description 添加部门，返回添加结果
// @Tags SysDept
// @Produce json
// @Param   deptInfo body systemReq.Create true "添加部门"
// @Success 200 {object} response.Response{msg=string}	"添加部门,返回添加结果"
// @Failure 500 {object} response.Response   "添加部门失败"
// @Router /dept/createDept [POST]
export const createDept = (data) => {
  return service({
    url: '/dept/createDept',
    method: 'POST',
    data
  })
}

// @Summary 获取部门列表
// @Description 分页查询部门信息列表
// @Tags SysDept
// @Accept json
// @Produce json
// @Param   deptPageInfo body systemReq.GetDeptList true "部门列表查询参数"
// @Success 200 {object} response.PageResult{list=[]system.SysDept, msg=string}	"获取部门列表成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "获取部门列表失败"
// @Router /dept/getDeptList [POST]
export const getDeptList = (data) => {
  return service({
    url: '/dept/getDeptList',
    method: 'POST',
    data
  })
}

// @Summary 删除部门信息
// @Description 删除指定的部门及其所有下级部门信息
// @Tags SysDept
// @Accept json
// @Produce json
// @Param   deptInfo body system.SysDept true "待删除的部门信息"
// @Success 200 {object} response.Response{msg=string} "删除部门信息，返回操作结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "删除部门信息失败,请检查是否包含下级部门"
// @Router /dept/delDeptInfo [DELETE]
export const delDeptInfo = (data) => {
  return service({
    url: '/dept/delDeptInfo',
    method: 'DELETE',
    data
  })
}

// @Summary 更新部门信息
// @Description 更新指定部门的详细信息
// @Tags SysDept
// @Accept json
// @Produce json
// @Param   dept body system.SysDept true "待更新的部门信息"
// @Success 200 {object} response.Response{msg=string} "更新部门信息,返回更新结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "更改部门信息失败"
// @Router /dept/updateDeptInfo [PUT]
export const updateDeptInfo = (data) => {
  return service({
    url: '/dept/updateDeptInfo',
    method: 'PUT',
    data
  })
}
