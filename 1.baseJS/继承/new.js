/**
 * @new 关键字做了什么  创建一个对象,把对象的__protot__指向构造函数的prototype  运行构造函数将this指向对象  并返回对象
 * 1. 继承People的对象p1被创建
 * 2. p1.__proto__==People.prototype
 * 3. 改变this指向 将this指向new出来的对象p1
 * 4. 返回新对象p1
 */

function People() {
  this.color = 'red'
  //不return
  //p1输出 People {color : 'red'}

  //显示return this
  //p1输出 People {color : 'red'}
  // return this

  //显示return 基本类型  number string  boolean undefined
  //p1输出 People {color : 'red'}
  // return undefined

  //显示return非基本类型
  //p1 输出return的内容
  return [1, 2, 3, 4]
}

const p1 = new People()

console.log(p1)

/**
 * 实现 new
 */

// 时间复杂度:运行所消耗的时间   空间复杂度:占用的内存(行数)

function _new() {
  //想要p1.__proto__==People.prototype   首先要拿到构造函数People
  const obj = new Object()
  // 实际上拿到People
  // 使用[].shift.call  原因:arguments是类数组  不能直接调用数组方法shift,通过改变this的方式调用数组方法
  // 本质:将类数组转换为数组   同: Array.prototype.shift.call  /  Array.from(arguments).shift()缺点:得新创建变量  输出的是一个新的数组,并没有改变arguments
  const _constructor = [].shift.call(arguments)
  obj.__proto__ = _constructor.prototype
  let res = _constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}

//使用
const p2 = _new(People)

console.log(p2)
