// 浅拷贝

const { eventNames } = require('npm')

const clone = (target) => {
  let cloneTarget = {}
  for (let key in target) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget
}

// 递归实现深拷贝

const cloneDeep = (target) => {
  //引用类型+null
  if (typeof target === 'object' && !target === null) {
    // 兼容对象+数组
    let cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      cloneTarget[key] = cloneDeep(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

//兼容循环引用的 深拷贝
//核心思想: 开辟存储空间  储存当前对象和拷贝对象的对应关系   拷贝的时候现在这个存储空间找,没有再去拷贝

const deepClonePro = (target, mapSpace = new Map()) => {
  if (typeof target === 'object' && !target === null) {
    const spaceValue = mapSpace.get(target)
    if (spaceValue) {
      return spaceValue
    }
    // 找到的是所属类原型上的constructor  指向当前类本身
    const clonedeep = new target.constructor() //根据数据类型创建空的 对象/数组
    mapSpace.set(target, clonedeep)

    for (let key in target) {
      clonedeep[key] = deepClonePro(value, mapSpace)
    }

    return clonedeep
  } else {
    return target
  }
}

let a = {
  b: { a: 1, b: 2 },
  c: 11,
  d: new Date(),
}
// 循环引用--一般不用考虑 会导致内存溢出
a.a = a
// let a = [{ a: 1, b: 2 }, undefined, null]

let b = cloneDeep(a)
// b.a = 88
// b.b = 99

console.log('a:', a, 'b:', b)

//

