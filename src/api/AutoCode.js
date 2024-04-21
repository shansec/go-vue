import service from '@/utils/request'

// @Summary 自动创建代码包
// @Tags SysAutoCode
// @Accept json
// @Produce json
// @Param autoCode body system.SysAutoCode true "自动创建代码包"
// @Success 200 {object} response.Response{msg=string} "创建成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "服务器内部错误"
// @Router /autocode/createPackage [POST]
export const createPackage = (data) => {
  return service({
    url: '/v1/autocode/createPackage',
    method: 'POST',
    data
  })
}

// @Summary 获取创建的包列表
// @Description 分页查询创建的包列表
// @Tags SysAutoCode
// @Accept json
// @Produce json
// @Param   packageInfo body request.GetPackageList true "创建的包列表查询参数"
// @Success 200 {object} response.PageResult{list=[]system.SysAutoCode, msg=string}	"获取创建的包列表成功"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "获取创建的包列表失败"
// @Router /autocode/getPackageList [POST]
export const getPackageList = (data) => {
  return service({
    url: '/v1/autocode/getPackageList',
    method: 'POST',
    data
  })
}

// @Summary 删除创建的包信息
// @Description 删除指定的创建的包信息
// @Tags SysAutoCode
// @Accept json
// @Produce json
// @Param   autoCode body system.SysAutoCode true "待删除的创建的包信息"
// @Success 200 {object} response.Response{msg=string} "删除创建的包，返回操作结果"
// @Failure 400 {object} response.Response "请求参数验证失败"
// @Failure 500 {object} response.Response "删除创建的包失败"
// @Router /autocode/delPackageInfo [DELETE]
export const deletePackage = (data) => {
  return service({
    url: '/v1/autocode/delPackageInfo',
    method: 'DELETE',
    data
  })
}
