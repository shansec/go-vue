import { ElMessage, ElMessageBox } from 'element-plus'

// 普通信息提示
const infoMsg = (msgInfo) => {
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 成功提示
const successMsg = (msgInfo) => {
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 错误提示
const errorMsg = (msgInfo) => {
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 警告提示
const warnMsg = (msgInfo) => {
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo
  })
}

// 带一个确定按钮或是按钮的alertBox
const alertBox = (msg, confirmName, type) => {
  return ElMessageBox.alert(msg, '提示', {
    type: type,
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true
  })
}

// 带确定取消按钮或者是否按钮的弹出提示框
const confirmBox = (msg, confirmName, cancelName, type) => {
  return ElMessageBox.confirm(msg, '提示', {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelName,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true
  })
}

export { infoMsg, successMsg, errorMsg, warnMsg, alertBox, confirmBox }
