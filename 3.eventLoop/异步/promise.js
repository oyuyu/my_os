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

// Promise._all = (promises) => {
//   return new Promise((rs, rj) => {
//     // 计数器
//     let count = 0
//     // 存放结果
//     let result = []
//     const len = promises.length

//     if (len === 0) {
//       return rs([])
//     }

//     promises.forEach((p, i) => {
//       // 注意有的数组项有可能不是Promise，需要手动转化一下
//       Promise.resolve(p)
//         .then((res) => {
//           count += 1
//           // 收集每个Promise的返回值
//           result[i] = res
//           // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
//           if (count === len) {
//             rs(result)
//           }
//           // 监听数组项中的Promise catch只要有一个失败，那么我们自己返回的Promise也会失败
//         })
//         .catch(rj)
//     })
//   })
// }

Promise._all = (promises) => {
  return new Promise((resolve, reject) => {
    let res = []
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((_res) => {
          res.push(_res)
          if (res.length === promises.length) {
            resolve(res)
          }
        })
        .catch(reject)
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
