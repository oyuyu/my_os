/**
 *
 * @generator 相当于一个状态机 内部封装了多个状态
 * @next 每次返回yield后面表达式的结果 (最好是互不干扰的操作)
 *       next方法可以带一个参数,该参数被认为是上一个yield表达式的返回值
 */

function* generator(x) {
  let y = yield x * 2
  y = 2 + y
  console.log(y, 'y')
  let z = yield y + 6
  return '结果'
}

let res = generator(5)
console.log(res.next())
console.log(res.next(1)) //入参相当于 yield x * 2的返回值
console.log(res.next(5))

//常用操作
function* fetch() {
  yield ajax(url, () => {})
  yield ajax(url1, () => {})
  yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
