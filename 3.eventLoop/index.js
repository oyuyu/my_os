async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
  Promise.resolve().then(() => {
    console.log("promise3");
  });
}, 0);
async1(); //同步执行 遇到async await 等待执行
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");


/**
 * @async/await
 * promise then 的语法糖
 * await 之前的部分属于New promise实例化的过程---是同步的
 */



// >>>> script start   promise1   script end   async1 start   async2   async1 end    promise2   setTimeout  promise3

// await是同步执行 所以会被打印  剩余的部分被丢到微任务消息队列

// >>> script start   async1 start   async2  async1 end  promise1  script end   promise2   setTimeout

// >>> script start   async1 start   async2    promise1  script end   async1 end    promise2   setTimeout    promise3   ✅
