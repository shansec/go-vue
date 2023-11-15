import service from '@/utils/request.js'

/**
 * 添加部门
 * @param data
 * @returns string
 */
export const createDept = (data) => {
  return service({
    url: '/dept/createDept',
    method: 'POST',
    data
  })
}

/**
 * 获取部门列表
 * @param data
 * @returns []dept
 */
export const getDeptList = (data) => {
  return service({
    url: '/dept/getDeptList',
    method: 'POST',
    data
  })
}

/**
 * 删除部门信息
 * @param data
 * @returns string
 */
export const delDeptInfo = (data) => {
  return service({
    url: '/dept/delDeptInfo',
    method: 'DELETE',
    data
  })
}
