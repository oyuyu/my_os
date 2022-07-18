// 使用

// loash 每次都引入,会不断重复的被实例化  可以用单例模式,这样多次调用也不会重复调用lodash

class Lodash {
  static instance = null
  static getInstance() {
    if (!Lodash.instance) {
      Lodash.instance = new Lodash()
    }
    return Lodash.instance
  }
  constructor() {
    loadScript('')
  }
}

const loadScript = (url) => {
  const _script = document.createElement('script')
  _script.src = url
  _script.onload = () => {}
  document.body.appendChild(_script)
}

Window.LodashLoader = Lodash
