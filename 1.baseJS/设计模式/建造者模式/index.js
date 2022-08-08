/**
 * @使用场景 用于比较复杂的大对象   构建的时候需要传很多参数,创建对象本身又很复杂
 */

// 一般结构

// 子模块
function Modal1() {
  console.log(1)
}
function Modal2() {
  console.log(2)
}
// 最终使用的类(内部结构比较复杂 有很多子模块  BModal实现将这些子模块组合起来完成功能)
function BModal() {
  this.modal1 = new Modal1()
  this.modal2 = new Modal2()
}
// 使用
let obj = new BModal()

/**
 * @示例
 * 编辑器
 * 拆分模块 1.编辑器本身-给外部调用 2.控制参数初始化和页面渲染的类 3. 控制字体的类  4. 状态管理类
 */

function HTMLInit() {
  this.initStyle = () => {}
  console.log('初始化页面')
}

function FontController(params) {
  this.changeColor = () => {}
  console.log('字体控制器')
}

function StateController(fontController) {
  this.state = []
  this.currState = 0
  this.fontController = fontController //将字体管理器注入  方便改变状态的时候改变字体
}

function Editer() {
  this.initer = new HTMLInit()
  this.fontController = new FontController()
  this.state = new StateController(this.fontController)
}
