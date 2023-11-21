// 优雅处理 async/await 模式所报错误
export const awaitWrap = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err, null])
}
