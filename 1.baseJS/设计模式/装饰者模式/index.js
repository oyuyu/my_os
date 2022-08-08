/**
 * @装饰者
 * @作用 动态的给对象添加一些额外职责,不会影响从这个类中派生的其他对象 (是一种即用即付的方式)
 * @解决的问题  传统的继承不灵活,会导致1. 超类和子类之间强耦合,超类改变子类也随之改变  2.继承通常为'白盒复用',继承方式中超类内部的细节是对子类可见的,破坏了封装性
 */

// 装饰函数

function originFn() {
  console.log('原函数')
}

function decoratorFn1() {
  console.log('装饰函数1')
}

let _originFn = function () {
  originFn()
  decoratorFn1()
}
_originFn()

//AOP(面向切面编程 aspect Oriented Programing)
/**
 * @常用场景
 * 数据上报-分离业务代码和数据统计代码
 * 插件式表单验证=分离校验和提交请求的代码
 */

const before = function (fn, beforeFn) {
  return () => {
    beforeFn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}
const fn = () => {
  console.log('fn')
}
const beforeFn = () => {
  console.log('beforeFn')
}
before(fn, beforeFn)()
