/* @proxy
 * Proxy 对象用于创建一个对象的代理，从而实现基本操作的**拦截和自定义**（如属性查找、赋值、枚举、函数调用等）。
 */

// 传统对象拦截/自定义    限制指定属性的拦截
let target = { money: '1000W' }
let handle = {
    get() {
        console.log('get data');
    },
    set(value) {
        console.log(value, 'set data');
        return value
    }
}
Object.defineProperty(target, 'money', handle)

console.log('----------------test1-------------');
target.name = 'whr'
target.money
target.money = '一亿'



//proxy  不用指定key所有的属性都能拦截到   
// 缺点:originTarget套上proxy的壳之后对象不能撤销   set get方法会始终对originTarget进行拦截
let originTarget = {}
let proxyhandle = {
    //target->originTarget    receiver->proxyObject(套了壳子之后的对象)
    get(target, key, receiver) {
        console.log(target, key, receiver);
    },
    set(target, key, value, receiver) {
        console.log(target, key, value, receiver);
    }
}
let proxyObj = new Proxy(originTarget, proxyhandle)
console.log('----------------test2-------------');
proxyObj.name
proxyObj.name = 'vivian'



// 可撤销对象,与Proxy用法基本相同   优点:可以通过revoke撤销代理   
let { proxy: proxyObj2, revoke } = Proxy.revocable(originTarget, proxyhandle)
console.log('----------------test3-------------');
proxyObj2.name
proxyObj2.name = 'vivian'
revoke()
// proxyObj2.name



