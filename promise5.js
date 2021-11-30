/**
 * promise 实现
 * 实例方法   then catch
 * 静态方法   resolve reject all race 
 */


const PENDING = 'pending'
const FUlFILLED = 'fulfilled'
const REJECTED = 'rejected'


class _Promise {

    constructor(handleFunc) {
        //状态&&结果  管理 
        this.status = PENDING
        this.value = undefined

        // 存储回调成功/失败的函数    实现then的多次调用
        this.fulfilledList = []
        this.rejectList = []

        //处理异步
        this.onFulfilledCallback = null;
        this.onRejectedCallback = null;

        // 传入执行器(回调函数)并执行   接收两个函数参数
        handleFunc(this.resolve, this.reject)
    }

    /**
     * 为什么用箭头函数
     * this指向问题  箭头函数指向当前实例/也可用bind改变this指向
     */

    resolve = (val) => {
        /**
         * 为什么要用定时器包裹
         * eventLoop 执行栈问题  保证在
         */
        setTimeout(() => {
                if (this.status = PENDING) {
                    this.status = FUlFILLED

                    // 判断返回值
                    if (val instanceof _Promise) {
                        val.then(
                            (val) => {},
                            (error) => {}
                        )

                    } else { //传入的是普通值

                        this.value = val

                        console.log(this.fulfilledList, 'fulfilledList');

                        //fulfilllist 执行并清空
                        this.fulfilledList.forEach(item => item(val))
                        this.fulfilledList = []

                        this.onFulfilledCallback && this.onFulfilledCallback(val);

                    }
                }
            }, 0)
            // 触发当前状态为 fulfilled   执行后续

    }

    reject = (val) => {
        if (this.status = PENDING) {
            this.status = REJECTED
            this.value = val
        }

    }

    then(onfulfilled, onrejected) {
        return new _Promise((resolve, reject) => {
            switch (this.status) {
                case PENDING:
                    this.onFulfilledCallback = onfulfilled
                    this.onRejectedCallback = onrejected
                    console.log('pending');
                    this.fulfilledList.push(onfulfilled)
                    this.rejectList.push(onrejected)

                    break
                case FUlFILLED:
                    const res = onfulfilled(this.value)
                    console.log(res, 'fulfilled');

                    break;
                case REJECTED:
                    onrejected(this.value)
                    console.log('reject');
                    break;

                default:
                    break;
            }

        })
    }
    catch (onrejected) {
        if (this.status == REJECTED) {
            onrejected(this.value)

        }
    }
    static all() {}
    static race() {}
    static reject() {}
    static resolve() {}
}



// this指向new出来的实例    静态方法通过构造函数调用


const promise1 = new _Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了')
    }, 2000)
});

promise1.then((val) => {

    console.log(val);

    return 22
}).then((val) => {
    console.log(val);
})

promise1.then((val) => {
    console.log(1);
})

promise1.then((val) => {
    console.log(2);
})

promise1.then((val) => {
    console.log(3);
})