// 发布订阅模式   相当于一个事件管理中心. 一个模块发送消息,其他模块能接受到消息.从而达到通信的作用

/**
 * @思路
 * 构造一个类,初始化空对象存放所有的事件
 * 接受订阅时  将事件名作为key  接受消息后需要执行的回调作为Value.   一个事件可能有多个订阅者--回调函数要存储成列表
 * 发布消息时  从列表中取的指定事件名对应的回调函数依次触发
 */

/**
 * @要实现的功能
 * 1.注册监听 $on
 * 2.注册只执行一次的监听  $once
 * 3.触发事件  $emit
 * 4.移除监听事件  $off
 */

type EventList = Record<string, any[]>;

class EventBus {
  eventList: EventList;
  constructor() {
    this.eventList = {};
  }
  // 注册事件监听
  $on(eventName: string, fn: any) {
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }
    this.eventList[eventName].push(fn);
  }

  // 扎到对应的事件监听器, 依次执行
  $emit() {
    // arguments 是一个类数组对象不能和数组一样进行操作  借用array.prototype 对象上的方法 可以完成对应的操作
    const eventName = [].shift.call(arguments) as unknown as string;
    const fns = this.eventList[eventName] || [];
    fns.forEach((fn) => {
      fn.call(this, ...arguments);
    });
  }

  //
  $off(eventName: string) {
    this.eventList[eventName] = [];
  }
}
