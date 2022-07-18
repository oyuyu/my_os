// 懒汉单例模式  需要手动调用其实例化方法 进行实例化  多次调用返回同一个实例
class Lazy {
  //写成私有属性的形式 防止在外部被篡改
  //static #intance = null
  static intance = null
  // 定义实例化单例的方法
  static getInstance() {
    if (!Lazy.instance) {
      Lazy.instance = new Lazy('lazy')
    }
    return Lazy.instance
  }

  constructor(name) {
    console.log(name)
    this.name = name
  }
}

module.exports = { Lazy }
