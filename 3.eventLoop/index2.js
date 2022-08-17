console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
  Promise.resolve().then(function () {
    console.log('promise3')
  })
  setTimeout(() => {
    console.log('innersetTimeOut')
  }, 0)
}, 0)

Promise.resolve()
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })
console.log('script end')

// >>>  script start  script end    promise1   promise2   setTimeout  promise3   innersetTimeOut

setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    //是本轮的微任务 会被加到本轮的微任务队列
    console.log('promise')
  })
}, 0)
// 是宏任务 会被加到下一轮中
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')

// start  timer1  promise   timer2
