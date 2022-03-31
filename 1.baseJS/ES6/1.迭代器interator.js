/**
 * @interator
 * 可迭代协议&&迭代器协议
 * for..of /.../Array.from 使用了迭代器协议
 * 内置的可迭代类型:Array/ Map/ Set/ Generators等内部实现了可迭代协议   
 */

/**
 * @迭代器协议
 */
let myInterator = {
    // 里面有个方法   该方法里返回done:是否遍历完  value:当前遍历到的值
    next() {
        return {
            done: false,
            value: 1
        }
    }
}


/**
 * @可迭代协议
 */
let canInterator = {
    // 里面有个方法   该方法里返回done:是否遍历完  value:当前遍历到的值
    next() {
        return {
            done: false,
            value: 1
        }
    },
    // 需要实现一个方法  方法中返回可迭代对象
    [Symbol.interator]: function () {
        return '可迭代对象'
    }
}


/**
 * @示例
 * 在家七天  吃饭睡觉打豆豆    实现迭代器方法
 */
const inHome = {
    count: 0,
    next() {
        const actions = ['吃饭', '睡觉', '打豆豆']
        if (this.count >= 7 * actions.length) {
            return {
                done: true
            }
        }
        return {
            done: false,
            value: actions[this.count++ % actions.length] + `第${Math.floor((this.count - 1) / actions.length) + 1}天`
        }
    },
    [Symbol.iterator]: function () {   
        return this
    }
}
// for of 认的是协议    内置的可迭代类型:Array Map等   或者满足可迭代协议的对象 
// 会先调用[Symbol.iterator]方法拿到可迭代对象  然后怼着可迭代对象不停地执行next方法, 直到done

for (const iterator of inHome) {
    console.log(iterator);
}


