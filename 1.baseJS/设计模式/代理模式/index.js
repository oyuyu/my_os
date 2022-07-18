/**
 * target 代理对象
 * handle 自定义操作方法的集合 本身是ES6设计的一个对象,用来定义代理对象的各种可代理操作
 */
// let p=new Proxy(target,handler)

let p = new Proxy(obj, {
  get(target, key, value) {
    if (key == 'custom') {
      return '自定义的'
    }
    return target[key]
  },
  set(target, key, value) {
    //
  },
  has() {
    // 判断代理对象是否拥有某个属性时触发
  },
})


/**
 * @proxy作用
 * 拦截监视外部对对象的访问
 * 降低函数/类的复杂度
 * 在复杂操作前进行校验 / 对资源进行管理
 */
