/**
 * promise的使用
 */




function promise() {
    new Promise((resolve, reject) => {
        //promise已完成时的回调
        resolve()

        //promise已拒绝时的回调
        reject()
    }).then(() => {
        console.log('promise resolve callback');
    }).catch(() => {
        console.log('promise reject callback');
    })

}

promise()