/**
 * @区别 Object.create()   {}  new Object 
 * 字面量{}创建&& new Object创建无区别  新建对象的__proto__都指向Object.prototype
 * Object.create()  使用现有对象来提供新建对象的__proto__
 * @优点   实现新建对象与原有对象引用地址的解耦  操作新对象不会影响老对象
 */



/**
 * @Object.create() 作用:继承&&自定义属性方法
 * Object.create(obj,[,自定义属性方法])  
 * 1. obj是新对象的原型对象,若为null,新对象为空对象,不会继续继承Object.prototype上的任何属性方法
 * 2. 自定义属性方法为可选项,可用hasOwnProperty()获取
 */
const person = {
    isHuman: true,
};

const definedProperty = {
    name: {
        value: 'me',
        writable: true,
        configurable: true,
        enumerable: true
    }
}
let me = Object.create(person, definedProperty);

console.log(me.hasOwnProperty('isHuman'), me.hasOwnProperty('name'));
console.log(me.isHuman, me.name);


//传入null
me = Object.create(null, definedProperty);
console.log(me, '传入null');
// console.log(me?.hasOwnProperty('isHuman'), me?.hasOwnProperty('name'));  没有继承Object.prototype上的任何属性和方法，如hasOwnProperty()、toString()
console.log(me.isHuman, me.name);


// let uu = Object.create('me')
// console.log(uu, '只能传入object/null');

/**
 * @实现
 */

const create = function (proto) {
    if (typeof proto !== "object" && typeof proto !== "function") {
        // 类型校验
        throw new TypeError("proto必须为对象或者函数");
    } else if (proto === null) {
        // null 特殊处理
        throw new Error("在浏览器中暂不支持传递null");
    }

    // 创建一个构造函数
    function F() { }
    // 更改其 prototype
    F.prototype = proto;

    // 返回构造的实例， 这个时候返回的实例和传入的 proto中间多了一层 F
    return new F();
};


Object._create = function (proto, properties = {}) {
    if (typeof proto != 'object') {
        throw new TypeError('TypeError:传入值必须为object or null')
    } else if (proto == null) {
        return Object.defineProperties({}, properties)
    } else {
        function Obj() { }
        Obj.prototype = proto
        const res = new Obj()
        Object.defineProperties(res, properties)
        return res
    }
}

// let test = Object._create('name')
// console.log(test, '-----');

let test1 = Object._create(null, definedProperty)
console.log(test1, test1.name, '传入null-----');

test1 = Object._create(person, definedProperty)
console.log(test1.isHuman, test1.name);
console.log(test1.hasOwnProperty('isHuman'), test1.hasOwnProperty('name'));















