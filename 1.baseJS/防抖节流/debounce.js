/**
 * 触发后n秒再次触发 期间再次触发重新计时
 * @常见场景
 * scroll
 * @原理
 * 闭包
 */

// 精简版
const _debounce = (fn, delay) => {
  const timer = null
  return () => {
    // 每次执行前先清除计时器 确保间隔时间内只执行一次
    timer && clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

//进阶版 - 首次调用触发
const debounce = (fn, delay) => {
  const timer = null
  const delayTimer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
      clearTimeout(delayTimer)
    } else {
      // 第一次直接调用函数
      fn.apply(this, arguments)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      // 函数执行后设置为null  后续再次首次触发时能够执行

      // 延时清空计时器没有clear操作  设置为null的操作是按第一次触发事件计算延迟的
      //   setTimeout(() => {
      //     timer = null
      //   }, delay)

      delayTimer = setTimeout(() => {
        timer = null
      }, delay)
    }, delay)
  }
}

const handlerScroll = function () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条当前位置：' + scrollTop)
}
// 两函数结合，实现滚动防抖
const scrollHandler = debounce(handlerScroll, 1000)
window.addEventListener('scroll', scrollHandler)
