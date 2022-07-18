/**
 * @观察者模式
 * 观察者们可以自定义处理程序,但是观察者们做的是同一类事情
 */

class EventBus {
  // 闯将事件缓存列表
  static list = {}
  constructor() {
    this.list = {}
  }
  // 将事件注册到调度中心
  $on(evntName, fn) {
    if (!this.list[evntName]) {
      this.list[eventName] = []
    }
    this.list[eventName].push(fn)
  }

  $emit() {
    const eventName = [].shift.apply(this, arguments)
    if (!this.list[eventName]) return
    this.list[eventName].forEach((fn) => {
      fn.apply(this, arguments)
    })
  }

  $off(eventName, cb) {
    if (!this.list[eventName]) return
    const index = this.list[eventName].findIndex((evet) => evet == cb)
    this.list[eventName].splice(index, 1)
  }
}
