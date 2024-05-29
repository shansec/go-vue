import service from '@/utils/request'

// @Summary 添加角色
// @Description 添加角色，返回添加结果
// @Tags SysRole
// @Produce json
// @Param   createRoleInfo, roleInfo body system.SysRole true "添加角色"
// @Success 200 {object} response.Response{data=systemRes.SysRoleResponse, msg=string}	"添加角色,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "添加角色失败"
// @Router /role/createRole [POST]
export const createRole = (data) => {
  return service({
    url: 'role/createRole',
    method: 'POST',
    data
  })
}

// @Summary 删除角色
// @Description 删除角色，返回添加结果
// @Tags SysRole
// @Produce json
// @Param   delRoleInfo body system.SysRole true "删除角色"
// @Success 200 {object} response.Response{msg=string}	"删除角色,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "删除角色失败"
// @Router /role/deleteRole [DELETE]
export const deleteRole = (data) => {
  return service({
    url: 'role/deleteRole',
    method: 'DELETE',
    data
  })
}

// @Summary 更新角色
// @Description 更新角色，返回添加结果
// @Tags SysRole
// @Produce json
// @Param   updateRole body system.SysRole true "更新角色"
// @Success 200 {object} response.Response{data=systemRes.SysRoleResponse, msg=string}	"更新角色,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "更新角色失败"
// @Router /role/updateRole [PUT]
export const updateRole = (data) => {
  return service({
    url: 'role/updateRole',
    method: 'PUT',
    data
  })
}

// @Summary 分页获取角色列表
// @Description 分页获取角色列表
// @Tags SysRole
// @Produce json
// @Param   pageInfo body request.PageInfo true "分页获取角色列表"
// @Success 200 {object} response.Response{data=response.PageResult, msg=string}	"分页获取角色列表"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "分页获取角色列表失败"
// @Router /role/getRoleList [POST]
export const getRoleList = (pageInfo) => {
  return service({
    url: 'role/getRoleList',
    method: 'POST',
    pageInfo
  })
}
