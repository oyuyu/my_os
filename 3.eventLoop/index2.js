console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
  Promise.resolve().then(function () {
    console.log("promise3");
  });
  setTimeout(() => {
    console.log("innersetTimeOut");
  }, 0);
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });
console.log("script end");

// >>>  script start  script end    promise1   promise2   setTimeout  promise3   innersetTimeOut
