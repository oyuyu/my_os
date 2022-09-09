/**
 * promise.all
 */

Promise._all = (promises) => {
  return new Promise((resolve, reject) => {
    let res = []
    pronises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((data) => {
          res[i] = data
          if (res.length === promise) {
            resolve(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}


/**
 * any
 */


