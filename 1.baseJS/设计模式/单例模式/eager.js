// 饿汉单例模式  在加载模块时,就已经实例化完成

class Eager {
  // 单例一般放在类的静态属性中
  static instance = new Eager('hello')
  constructor(name) {
    console.log(name)
    this.name = name
  }
}

module.exports = { Eager }
