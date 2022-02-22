
/**
 * @创建对象
 * 普通模式  工厂模式
 */

const player = new Object()
player.age = 18
player.study = function () { }


const player1 = {
    age: 18,
    study: function () { }
}

//工厂模式
//这种方式创建判断不出类型
function creatPlayer(age) {
    const Player = new Object()
    Player.age = age
    Player.study = function () { }
    return Player
}

const xiaoming = creatPlayer(18)
console.log(xiaoming, 'xiaoming');
console.log(xiaoming.constructor);   //输出function:object   根本不知道是继承了Player 但实际上本意是创建各种player  

//构造函数+实例的方式创建  
//构造函数
function Player() {
    this.age = 18
    this.study = function () { }
}
//创建实例
const xiaohong = new Player()
console.log(xiaohong, xiaohong.constructor, 'xiaohong');
//继承
xiaohong.study()

//好处:可以清楚的知道类型   
//缺点:每生成一个实例,构造函数内部的方法都会重新开辟一块新的内存空间
//---->既要知道类型,又要解决占用内存的问题---->原型 prototype

//原型的方式创建对象

function People() {
    this.color = 'red'
}

People.prototype = {
    getfamily: function () { }       //无论创建多少个实例,此方法只占用一份内存
}

const p1 = new People()
const p2 = new People()

console.log(p1.getfamily === p2.getfamily, '通过原型创建对象, 是否新开辟内存空间');
console.log(p1.__proto__, '__proto__');
console.log(Object.getPrototypeOf(p1), 'getPrototypeOf');
console.log(p1.constructor, 'constructor');


//静态属性
function Goods() {
    this.color = 'red'
    if (!Goods.total) {
        Goods.total = 0
    } else {
        Goods.total++
    }
}

const g1 = new Goods()
const g2 = new Goods()

























/**
 * @常见问题
 */

console.log([1, 2, 3].toString());
console.log({ a: 1 }.toString());


/**
 * 判断对象为数组类型
 */
let a = [1, 2, 3, 4]
console.log(Array.isArray(a));
console.log(Array.prototype == a.__proto__);
console.log(a instanceof Array);
console.log(Object.prototype.toString.call(a));
