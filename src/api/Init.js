import service from '@/utils/request'

// @Summary 初始化数据
// @Description 初始化系统数据
// @Tags InitDB
// @Success 200 {object} response.Response{msg=string} "初始化系统数据"
// @Failure 400 {object} response.Response "参数错误"
// @Failure 500 {object} response.Response "初始化失败"
// @Router /init/initDB [POST]
export const initDB = (data) => {
  return service({
    url: '/v1/init/initDB',
    method: 'POST',
    data
  })
}

// @Summary 检查是否已初始化
// @Description 检查是否已初始化
// @Tags InitDB
// @Router /init/checkDB [POST]
export const checkDB = () => {
  return service({
    url: '/v1/init/checkDB',
    method: 'POST'
  })
}
