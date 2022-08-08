/**
 * @原型链继承
 * 
 * 缺点:
 * 1.父类存在引用类型,改变一个实例的此变量,所有实例此变量改变
 * 2.无法传参
 */

function Parent() {
    this.name = 'parentName'
    this.actions = ['eat', 'rap']
    this.getAge = function () {
        console.log('parent age 18');
    }
}

// 作为构造函数存在
function Child() { }

// 更改子prototype也会将父的prototype改变
// Child.prototype = Parent.prototype


// ------让构造函数Child的prototype属性指向 要继承的那个构造函数  就可以继承到他的属性和方法=======
// 直接将prototype覆盖,存在的问题: prototype上有个constructor属性  
// 直接覆盖的话其constructor属性也被覆盖   因此需要重写constructor
//让Child.prototype 使用Parent的prototype
Child.prototype = new Parent()
Child.prototype.constructor = Child


const c1 = new Child()
console.log(c1.name);
c1.getAge()
console.log(c1.constructor);


const c2 = new Child()
c2.actions.push('sing')

console.log(c1.actions);   //存在引用类型的话,如果有一个实例改变了引用类型,所有实例的该属性发生变化
console.log(c2.actions);



/**
 * @构造函数继承
 * 为什么父类存在引用类型,改变一个实例会改变所有实例的此变量?  ->  存在于原型对象上   ->让其不在原型对象上
 * 缺点:浪费内存 
 */

function Parent1(name, color) {
    this.name = name
    this.color = color
    this.actions = ['eat', 'rap']
    this.getAge = function () {
        console.log('parent age 18');
    }
}

function Child1() {
    Parent1.call(this, ...arguments)   //在Child1的构造函数里面通过this调用一遍Parent1方法   相当于在this的上下文里重新走了一遍Parent1的方法
}

const c11 = new Child1('c11', 'red')
const c21 = new Child1('c21', 'blue')
c21.actions.push('sing')

console.log(c11.actions, '构造函数继承');
console.log(c21.actions, '构造函数继承');
console.log(c11, c21, '构造函数传参');


/**
 * @组合继承  原型链+构造函数继承
 * 缺点:调用了两次构造函数   生成了多余的属性
 */

function Parent2(name, color) {
    this.name = name
    this.color = color
    this.actions = ['eat', 'rap']
}

Parent2.prototype.getname = function () {
    console.log(this.name);
}


function Child2() {
    Parent2.call(this, ...arguments)   //第一次调用构造函数
}
Child2.prototype = new Parent2()   //第二次调用构造函数    占用内存
Child2.prototype.constructor = Child2


const c12 = new Child2('c12', 'red')
const c22 = new Child2('c22', 'blue')
c22.actions.push('sing')

console.log(c12.actions, '组合继承');
console.log(c22.actions, '组合继承');
console.log(c12, c22, c12.getname === c22.getname, '组合继承传参');
c12.getname('c12')
c22.getname('c22')


/**
 * @寄生组合式继承
 */


function Parent2(name, color) {
    this.name = name
    this.color = color
    this.actions = ['eat', 'rap']
}

Parent2.prototype.getname = function () {
    console.log(this.name);
}


function Child2() {
    Parent2.call(this, ...arguments)
}
Child2.prototype = Object.create(Parent.prototype)   //变动点  object.create()创建一个新对象 使用现有对象作为新建对象的原型   Parent.prototype作为Child2.prototype的原型
Child2.prototype.constructor = Child2


const c122 = new Child2('c122', 'red')
const c222 = new Child2('c222', 'blue')
c222.actions.push('sing')

console.log(c122.actions, '组合继承');
console.log(c222.actions, '组合继承');
console.log(c122, c222, c122.getname === c222.getname, '组合继承传参');
c122.getname('c122')
c222.getname('c222')



// class继承
class CParent {
    constructor() {
        this.name = 'parent'
    }

}

class CChild extends CParent {
    constructor(props) {
        super(props)  //实际上是在构造函数内部执行一遍CParent  返回的是继承了Cparent之后的CChild构造函数
    }
}

const cc1 = new CChild()
console.log(cc1.name, 'class继承');


