const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')

/**
 * Promise.all([])
 * 接收 promise[] 返回一个新的Promise对象 -
 * 1.所有的Promise对象都成功  返回各个promise成功回调的返回值[]
 * 2.任意一个Promise失败
 */

Promise._all = (promises) => {
  return new Promise((resolve, reject) => {
    let res = []
    promises.forEach((p) => {
      p.then((_res) => {
        res.push(_res)
        if (res.length === promises.length) {
          resolve(res)
        }
      }).catch(reject)
    })
  })
}

Promise._all([p1, p2, p3]).then((res) => {
  console.log(res)
})

/**
 * Promise.allSettled([])
 * 所有的Promise对象都已敲定 (全部成功/失败)
 */

/**
 * Promise.any([])
 * 任意Promise对象成功  返回promise成功回调的返回值
 */

/**
 * Promise.race([])
 * 任意Promise状态敲定(成功/拒绝)
 */
