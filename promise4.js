/**
 * 构造函数的静态方法
 */


const promise1 = new Promise((resolve) => { resolve('1') })
const promise2 = new Promise((resolve) => { setTimeout(() => { resolve('2') }, 1000) })
const promise3 = new Promise((resolve) => { setTimeout(() => { resolve('3') }, 2000) })
const promise4 = new Promise((resolve, reject) => { setTimeout(() => { reject('4') }, 3000) })

Promise.race([promise1, promise2, promise3, promise4])
    .catch((x) => { console.log(x); })
    .then((x) => { console.log(x); }) //1

Promise.all([promise1, promise2, promise3, promise4])
    .catch((x) => { console.log(x); }) //4
    .then((x) => { console.log(x); }) //undefined