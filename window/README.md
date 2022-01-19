# 浏览器对象 BOM 

## window

### MutationObserver 
检测DOM变化,可以用来监听新增/删除节点
#### 使用场景
- 通知用户当前页面所发生的变化
- 根据DOM的变化动态加载js模块
- 开发编译器时,使用MutationObserver收集任意时间点上的更改,实现撤销/重做功能


---


setTimeout  setInterval

setTimeout 定时器结束之后将回调函数放到eventloop中

setInterval 每隔一段时间将回调函数放到eventloop中

主栈执行完成之后再执行队列




location 对象   代表的含义
主要用于url相关的解析
https://juejin.cn/post/6844904002535030798





# DOM

document



重拍重绘  document.createDocumentFragment
createElement 新增多个元素的时候,一次性插入


类数组对象(Array-like)
Array.from()转换




## history

添加修改历史记录

切换url但是并不进行页面级别的刷新

对客户端进行路由进行劫持达到跳转的目的
pushState()    替换地址栏地址,加入history列表,但不会刷新页面
replaceState()    替换地址栏地址,替换当前页面在history列表中的记录,不刷新页面

window.onpopsatte


与location 切换url的区别:
不进行页面级别的刷新

ps:路由相关知识


## Elemnt 


## text


















http Headers

















## console

console.dir()显示一个对象所有的属性和方法。


alert() 会阻塞后面代码的执行



事件

addEventListener('click',callback)   设置多个回调依次触发
removeEventListener()

兼容IE
attachEvent('onclick'.callback)   设置多个回调,按相反的顺序执行
detachEvent()


事件捕获与冒泡
DOM是嵌套型的树形树状结构

捕获:自顶向下
冒泡:自下而上


addEventListener('click',callback,true)     true 捕获阶段触发事件








