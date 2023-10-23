// 遍历require.context的返回模块，并导入
const requireAll = (requireContext) =>
  Object.keys(requireContext).map((item) => item)
// import所有符合条件的svg 三个参数：文件夹、是否使用子文件夹、正则
// const req = require.context('./svgs', false, /\.svg$/)
const req = import.meta.glob('./svg/*.svg')
requireAll(req)
