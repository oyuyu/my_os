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

function Child() { }

//直接将prototype覆盖,存在的问题: prototype上有个constructor属性  直接覆盖的话其constructor属性也被覆盖   因此需要重写constructor
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
    Parent2.call(this, ...arguments)   //在Child1的构造函数里面通过this调用一遍Parent1方法   相当于在this的上下文里重新走了一遍Parent1的方法
}

Child2.prototype = new Parent2()
Child2.prototype.constructor = Child2


const c12 = new Child2('c12', 'red')
const c22 = new Child2('c22', 'blue')
c22.actions.push('sing')

console.log(c12.actions, '组合继承');
console.log(c22.actions, '组合继承');
console.log(c12, c22, c12.getname === c22.getname, '组合继承传参');
c12.getname('c12')
c22.getname('c22')


