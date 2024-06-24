import service from '@/utils/request'

// @Summary 添加菜单
// @Description 添加菜单，返回添加结果
// @Tags SysBaseMenu
// @Produce json
// @Param   menuInfo body system.SysBaseMenu true "添加菜单"
// @Success 200 {object} response.Response{data=systemRes.SysMenuResponse, msg=string}	"添加菜单,返回添加结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "添加菜单失败"
// @Router /menu/createMenu [POST]
export const createMenu = (data) => {
  return service({
    url: 'menu/createMenu',
    method: 'POST',
    data
  })
}

// @Summary 删除菜单
// @Description 删除菜单，返回操作结果
// @Tags SysBaseMenu
// @Produce json
// @Param   menuInfo body system.SysBaseMenu true "删除菜单"
// @Success 200 {object} response.Response{msg=string}	"删除菜单,返回操作结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "删除菜单失败"
// @Router /menu/deleteMenu [DELETE]
export const deleteMenu = (data) => {
  return service({
    url: 'menu/deleteMenu',
    method: 'DELETE',
    data
  })
}

// @Summary 修改菜单
// @Description 修改菜单，返回操作结果
// @Tags SysBaseMenu
// @Produce json
// @Param   menuInfo body system.SysBaseMenu true "修改菜单"
// @Success 200 {object} response.Response{msg=string}	"修改菜单,返回操作结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "修改菜单失败"
// @Router /menu/updateMenu [PUT]
export const updateMenu = (data) => {
  return service({
    url: 'menu/updateMenu',
    method: 'PUT',
    data
  })
}

// @Summary 分页获取菜单
// @Description 分页获取菜单
// @Tags SysBaseMenu
// @Produce json
// @Param   pageInfo body request.PageInfo true "分页获取菜单"
// @Success 200 {object} response.Response{data=response.PageResult, msg=string}	"分页获取菜单"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "分页获取菜单失败"
// @Router /menu/getMenuList [POST]
export const getMenuList = (pageInfo) => {
  return service({
    url: 'menu/getMenuList',
    method: 'POST',
    data: pageInfo
  })
}

// @Summary 获取树状菜单
// @Description 获取树状菜单
// @Tags SysBaseMenu
// @Produce json
// @Param   menuInfo body req.GetMenuByName true "获取树状菜单"
// @Success 200 {object} response.Response{data=response.NoPageResult, msg=string}	"获取树状菜单"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response   "获取树状菜单失败"
// @Router /menu/getMenuTree [POST]
export const getMenuTree = (data) => {
  return service({
    url: 'menu/getMenuTree',
    method: 'POST',
    data
  })
}

export const getRoleMenu = () => {
  return service({
    url: '/menu/getRoleMenu',
    method: 'GET'
  })
}

export const getSpecialRoleMenu = (data) => {
  return service({
    url: '/menu/getSpecialRoleMenu',
    method: 'POST',
    data
  })
}
