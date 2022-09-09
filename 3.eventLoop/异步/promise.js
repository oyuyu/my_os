const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 500)
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
    let count = 0
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((_res) => {
          res[i] = _res
          count++
          if (promises.length === count) {
            resolve(res)
          }
        })
        .catch(reject)
    })
  })
}

// Promise._all([p1, p2, p3, p4])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

/**
 * Promise.allSettled([])
 * 所有的Promise对象都已敲定 (全部成功/失败)
 */

/**
 * Promise.any([])   草案阶段
 * 任意Promise对象成功  返回promise成功回调的返回值  全部失败才返回失败的回调
 */

Promise._any = (promises) => {
  return new Promise((resolve, reject) => {
    let errs = []
    let count = 0
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errs[i] = err
          count++
          if (promises.length === count) reject(errs)
        })
    })
  })
}

// Promise.any([p4, p5])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

/**
 * Promise.race([])
 * 任意Promise状态敲定(成功/拒绝)
 */

Promise._race = (promises) => {
  return new Promise((resolve, rejecct) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve).catch(rejecct)
    })
  })
}

Promise._race([p3, p4])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
