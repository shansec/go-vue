import service from '@/utils/request.js'

// @Summary 用户注册账号
// @Tags SysUser
// @Produce json
// @Param   data body systemReq.Register true "用户注册"
// @Success 200 {object} response.Response{data=systemRes.SysUserResponse, msg=string}	"用户注册"
// @Router /base/register [POST]
export const createUser = (data) => {
  return service({
    url: '/v1/user/register',
    method: 'POST',
    data
  })
}

// @Summary 修改密码
// @Tags SysUser
// @Produce json
// @Param   data body systemReq.ChangePassword true "修改密码"
// @Success 200 {object} response.Response{msg=string}	"修改密码,返回修改结果"
// @Router /base/login [POST]
export const modifyPassword = (data) => {
  return service({
    url: '/v1/user/modifyPassword',
    method: 'POST',
    data
  })
}

// @Summary 用户登录
// @Tags SysUser
// @Produce json
// @Param   data body systemReq.Login true "用户登录"
// @Success 200 {object} response.Response{data=systemRes.Login, msg=string}	"用户登录"
// @Router /base/login [POST]
export const login = (data) => {
  return service({
    url: '/v1/base/login',
    method: 'POST',
    data
  })
}

// @Summary 更新用户信息
// @Tags SysUser
// @Produce json
// @Param   data body system.SysUser true "更新用户信息"
// @Success 200 {object} response.Response{msg=string} "更新用户信息，返回操作结果"
// @Router /user/updateUserInfo [PUT]
export const updateUserInfo = (data) => {
  return service({
    url: '/v1/user/updateUserInfo',
    method: 'POST',
    data
  })
}

// @Tags SysUser
// @Summary 获取用户信息
// @Produce json
// @Success 200 {object} response.Response{data=systemRes.SysUserResponse, msg=string} "获取用户信息"
// @Router /user/getUserInfo [GET]
export const getUserInfo = () => {
  return service({
    url: '/v1/user/getUserInfo',
    method: 'GET'
  })
}

// @Tags SysUser
// @Summary 获取用户列表
// @Produce json
// @Param   data body systemReq.GetUserList true "获取用户列表"
// @Success 200 {object} response.Response{data=response.PageResult, msg=string} "获取用户列表"
// @Router /user/getUsersInfo [GET]
export const getUsersInfo = (data) => {
  return service({
    url: '/v1/user/getUsersInfo',
    method: 'POST',
    data
  })
}

// @Tags SysUser
// @Summary 更改用户状态
// @Produce json
// @Param   data body systemReq.UUID true "更改用户状态"
// @Success 200 {object} response.Response{msg=string} "更改用户状态，返回操作结果"
// @Router /user/updateUserStatus [GET]
export const updateUserStatus = (data) => {
  return service({
    url: '/v1/user/updateUserStatus',
    method: 'PUT',
    data
  })
}

// @Tags SysUser
// @Summary 删除用户信息
// @Produce json
// @Param   data body systemReq.UUID true "删除用户信息"
// @Success 200 {object} response.Response{msg=string} "删除用户信息，返回操作结果"
// @Router /user/delUserInfo [Delete]
export const delUserInfo = (data) => {
  return service({
    url: '/v1/user/delUserInfo',
    method: 'DELETE',
    data
  })
}
