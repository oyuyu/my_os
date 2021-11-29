/**
 * 封装异步操作为promise
 * 主要是控制执行resolve&&reject的执行时机
 */



const callback = () => {
    console.log('promise resolve callback');

}

const rejectcallback = () => {
    console.log('promise reject callback');

}


function promiseAssynic() {
    return new Promise((resolve, reject) => {
        //promise已完成时的回调
        resolve()

        //promise已拒绝时的回调
        reject()
    })
}

promiseAssynic()
    .then(callback)
    .catch(rejectcallback)