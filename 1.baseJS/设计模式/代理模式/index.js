/**
 * 常见场景
 * 1.事件代理   2.缓存函数
 */

// 实现缓存函数   纯函数入参相同返回值相同 -- 如果入参相同则读取缓存中的返回值
const cacheFn = (fn) => {
  const cache = Object.create(null)
  return (str) => {
    const cacheData = cache[str]
    if (!cacheData) {
      cacheData = fn(str)
      cache[str] = cacheData
    }
    return cacheData
  }
}


/**
 * target 代理对象
 * handle 自定义操作方法的集合 本身是ES6设计的一个对象,用来定义代理对象的各种可代理操作
 * proxy对象包装另一个对象.并拦截读写/其他操作  自行去处理.或者透明的允许该对象处理他们
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
