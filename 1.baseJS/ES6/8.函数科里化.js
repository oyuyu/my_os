/**
 * @本质 参数收集--接受参数但不执行,等到所有参数都接收完后在执行
 *
 */

// 参数个数确定的情况
function add(a, b, c) {
  return a + b + c
}
function createCurry(fn) {
  const len = fn.length
  let args = []
  return function callback() {
    args = [...args, ...arguments]
    if (args.length < len) {
      return callback
    } else {
      return fn(...args)
    }
  }
}
const res = createCurry(add)(1)(2)(5)
console.log(res)


// 参数个数不确定
function add2() {
  return [...arguments].reduce((pre, curr) => pre + curr, 0)
}
function createCurry1(fn) {
  let curryargs = []
  return function callback() {
    curryargs = [...curryargs, ...arguments]
    // 如果传入参数为空 则表示传参结束
    // 限制--必须以()结尾
    if (arguments.length) {
      return callback
    } else {
      return fn(...curryargs)
    }
  }
}
const res2 = createCurry1(add2)(1)(5)()
console.log(res2)
