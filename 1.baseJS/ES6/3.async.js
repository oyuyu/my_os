/**
 * 会通过隐式的promise返回结果
 */


// 模拟接口
function getname(name, cb) {
    setTimeout(() => {
        cb && cb(name, 'content:' + name)
    }, 500)
}


function getnamePromise(name) {
    return new Promise((resolve, reject) => {
        getname(name, (err, content) => {
            if (err) {
                reject()
            } else {
                resolve(content)

            }

        })

    })
}