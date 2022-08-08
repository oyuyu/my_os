// 懒汉单例模式  需要手动调用其实例化方法 进行实例化  多次调用返回同一个实例
class Lazy {
  //写成私有属性的形式 防止在外部被篡改
  //static #intance = null
  static intance = null
  // 定义实例化单例的方法   如果实例存在则直接返回 如果实例不存在则新建一个
  static getInstance() {
    if (!this.instance) {
      this.instance = new Lazy('lazy')
    }
    return this.instance
  }

  constructor(name) {
    console.log(name)
    this.name = name
  }
}

module.exports = { Lazy }
