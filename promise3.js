/**
 * promise规范  
 * 
● 每个then的返回值都是一个新的promise  promise2=promise1.then(onfullfilled, onrejected)
●  状态变化后的回调函数   .then(onfullfilled, onrejected)   回调不是函数则忽略
●  then可被同一个promise 调用多次     onfullfilled, onrejected 按注册顺序一依次回调
● then(()=>{return x})  x为对象/function 时  
     x为对象   首先尝试执行x.then()    如果键值没有then/then不为函数   则返回x
     x存在then 为函数    接收两个参数（resolve，reject） 


     then /catch 为实例方法
 */




new Promise((resolve, reject) => { reject(66) })
    .then(null, (err) => {
        console.log(err); //66
        return 333 //返回一个值  新的promise进入fullfill状态
    })
    .then(null, null)
    .then(null, null)
    .then(null, null)
    .then(null, null)
    .then((res) => {
        console.log(res); //33
        throw '异常-error' //throw异常  新的promise进入rejected状态
    })
    .then(null, (err) => {
        console.log(err); //异常-erro
    })


const promise1 = new Promise((resolve, reject) => { resolve('promise   1') })
const promise2 = new Promise((resolve, reject) => { resolve('promise   2') })
promise1.then(() => {
    return promise1
}).then((val) => {
    console.log(val); //promise   1
})

promise1.then(() => {
    return promise2
}).then((val) => {
    console.log(val); //promise   2
})

// then的返回值为对象  执行对象.then
promise1.then(() => {
    return {
        // then: () => { throw 'onject-异常' }
        get then() { //对象的存储器属性
            throw 'onject-异常'
        }
    }
}).then(null, (val) => {
    console.log(val);
})


promise1.then(() => {
    return {}
}).then((val) => {
    console.log(val, '对象内没then函数');
}, (val) => {
    console.log(val); //不执行
})


promise1.then(() => {
    return {
        then: 1
    }
}).then((val) => {
    console.log(val, '对象内没then函数');
}, (val) => {
    console.log(val);
})





// then的返回值为函数
promise1.then(() => {
        return {
            then(resolve, reject) {
                reject('function-then')
            }
        }
    }).then(null, (val) => {
        console.log(val);
        // return
    })
    .then((val) => {
        console.log(val, 'return null');
    })