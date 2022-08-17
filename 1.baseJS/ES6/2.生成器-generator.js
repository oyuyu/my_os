/**
 * 需要再次巩固理解的点
 * co的实现
 */

/**
 * @基本用法
 * next() 执行下一步
 * close() 关闭生成器
 * send() 将值发送到生成器
 * throw() 向生成器抛出错误
 */




function* gen() {
    yield 1
    yield 2
    yield 3
}

const handle = gen()  //生成器函数执行与普通函数执行不同  返回一个句柄(实现了迭代器协议)
console.log(handle);

// generator实现了迭代器协议  便可以通过for..of调用
for (const item of handle) {
    console.log(item);
}


/**
 * @Promise处理异步   !!
 */


// error_first API 

function buy(name, cb) {
    setTimeout(() => {
        cb && cb(null, 'content:' + name)
    }, 5)
}


function buyPromise(name) {
    return new Promise((resolve, reject) => {
        buy(name, function (err, content) {
            if (err) {
                reject('执行失败')
            } else {
                resolve(content)
            }
        })
    })
}


// 缺点:可读性不好
// buyPromise('菠菜')
//     .then(function (content) {
//         console.log(content);
//         return buyPromise('泡面')
//     }).then(function (content) {
//         console.log(content);
//         return buyPromise('水饺')
//     }).then(function (content) {
//         console.log(content);
//     })




/**
 * @generator处理异步   !!
 */

// function* buyGenerator(name) {
//     yield buyPromise(name)
// }

// const buyHandle = buyGenerator('买菜')
// console.log(buyHandle.next().value, '------generator Promise');

// 串行的去处理一系列的操作

function* buyGenerators() {
    const cai = yield buyPromise('菜')
    const paomian = yield buyPromise('泡面' + cai)
    const shuijiao = yield buyPromise('水饺' + paomian)
    return shuijiao
}


var handleBuyGenerators = buyGenerators()
handleBuyGenerators.next()


// for (const item of buyGenerators()) {


// }


/**
 * @实现Generator函数自动执行
 */

function isPromise(obj) {
    return !!obj
        && (typeof obj === 'object' || typeof obj === 'function')
        && typeof obj.then === 'function'
        && typeof obj.catch === 'function'
}


function co(gen) {
    const ctx = this
    // 接受generator函数作为参数,返回一个Promise对象
    return new Promise((resolve, reject) => {
        // 检查跟gen是否为generator函数; 
        // 是:执行函数,得到一个内部指针函数
        if (typeof gen == 'function') {
            gen = gen.call(ctx)
        }
        // 否: 返回 resolve状态
        if (!gen || typeof gen.next !== 'function') {
            return resolve(gen)
        }

        // 将generator函数内部指针对象的next方法,包装
        function onFullfilled(res) {
            let ret
            try {
                ret = gen.next(res)
            } catch (e) {
                reject(e)
            }
            next(ret)
        }

        //next 反复调用自身
        function next(res) {
            // 检查是否为generator函数的最后一步
            if (res.done) {
                return resolve(res.value)
            }
            // 确保每一步的返回是Promise
            const value = toPromise.call(ctx, res.value)
            // 为返回值加上回调函数,通过onFullfilled再次调用next函数
            if (value && isPromise(value)) {
                return value.then(onFullfilled, onRejected)
            }
            // 参数不符合的条件下,终止执行
            return onRejected(new TypeError('following object was passed:' + String(ret.value)))

        }
        onFullfilled()
    })
}

co(buyGenerators).then((res) => {
    console.log(res);
})


