// 批量产出对象  频繁调用时不用new

// 工厂模式代码结构
function factory(type) {
  switch (type) {
    case 'type1':
      return new Type1()
    case 'type2':
      return new Type2()
    case 'type3':
      return new Type3()
    case 'type4':
      return new Type4()
    default:
      break
  }
}

// 示例 弹窗类型-消息/确认/warning弹窗

//分别建类
function message() {
  console.log('消息弹窗')
}
function confirm() {
  console.log('确认弹窗')
}
function warning() {
  console.log('warning弹窗')
}

// 工厂模式的代码
function pop(type) {
  switch (type) {
    case 'message':
      return new message()
    case 'confirm':
      return new confirm()
    case 'warning':
      return new warning()
    default:
      break
  }
}
pop('message')

/**
 * @改造 成面向对象
 * @原因 switch实现工厂模式看上去不太优雅
 */
function popup(type) {
  if (this instanceof popup) {
    return new this[type]()
  } else {
    return new popup(type)
  }
}
//
popup.prototype = { message, confirm, warning }
popup('warning')
/**
 * 封装成模块 挂载在window上作为模块使用
 */
export default (function () {
  window.popup = popup
})()
