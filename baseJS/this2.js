/**
 * @改变this指向 优先级 箭头函数> bind call apply> 普通的指向 
 */


var xiaoming = { name: 'xiaoming' }

/**
 * 
 * @箭头函数指向  指向定义时最近的非箭头函数的执行上下文
 */
function outer() {
    console.log('1', this);
    const getname = () => {
        console.log('箭头函数', this);
    }
    getname()

    function inner() {
        console.log('inner', this);
        getname()
    }
    inner()
}

xiaoming.outer = outer
xiaoming.outer()


/**
 * 
 * bind call apply
 */


function getname() {
    console.log(this, arguments);
}
getname()

//立马执行
getname.call(xiaoming, 'call', 'xiaoming')
getname.apply(xiaoming, ['apply', 'xiaoming'])

//不是立即执行的   临时绑定this指向
//  实际上返回新函数   changebind=getname.bind(xiaoming, ['bind', 'xiaoming'])    这个函数才是绑定新对象的函数
getname.bind(xiaoming, 'bind', 'xiaoming')()

/**
 * @优先级
 */

var whofirst = () => {
    console.log(this, 'whofirst'); //指向window   但是为什么打印出来{}
}
whofirst.call(xiaoming)



/**
 * @call实现
 * 1.target没传默认指向window/global
 * 2.执行完删除
 */

Function.prototype._call = function() {
    let [target = globalThis, ...args] = arguments
    target.__func = this
    target.__func(...args)
    delete target.__func
}
console.log('------------_call------------');
getname._call(xiaoming, '_call')
getname._call()


/**
 * @apply
 */
Function.prototype._apply = function() {
    let [target = globalThis, args = []] = arguments
    target.__func = this
    target.__func(...args)
    delete target.__func
}

console.log('------------_apply------------');
getname._apply(xiaoming, ['_apply'])
getname._apply()

/**
 * @bind
 * 使用场景
 */
Function.prototype._bind = function() {
    let [target = globalThis, args = []] = arguments
    const _this = this
    return function() {
        return _this.apply(target, args)
    }
}

console.log('-------------bind------------');
getname.bind(xiaoming, ['_bind'])()