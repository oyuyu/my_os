// 对象是单个实例的抽象
// 构造函数是模板  描述对象的基本结构   new AA生产实例

/**
 * @new 关键字做了什么
 * 1. 创建一个空对象
 * 2. 构造函数的this指向空对象
 * 3. 新对象的原型(__proto__)指向 原对象的prototype属性
 * 4. 执行构造函数内部代码
 * */
function _new() {
  let _constructor = [].shift.apply(arguments)

  // 创建空对象 创建对象的原型 指向 原对象的prototype属性
  let obj = Object.create(_constructor) //Object.create() 使用原对象作为新建对象的原型prototype
  //   let obj = new Object()
  //   obj.__proto__ = _constructor.prototype
  let res = _constructor.apply(obj, arguments)
  return res === 'object' && !res === null ? res : obj
}

/**
 * @生成实例的两种方式
 * 1.new 构造函数
 * 2.Object.create(现有对象)  将吸纳有对象作为模板生成新的实例对象
 */


