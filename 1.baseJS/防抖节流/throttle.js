/**
 * 每隔n秒执行一次   不重新计时
 */

const throttle = (fn, delay) => {
  const timer = null
  return () => {
    if (!timer) {
      timer = setInterval(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}
