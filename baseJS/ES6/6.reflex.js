

/**
 * @修改某些Object方法的返回结果，让其变得更合理
 */

// Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，
try {
    Object.defineProperty(target, property, attributes);
    // success
} catch (e) {
    // failure
}

if (Reflect.defineProperty(target, property, attributes)) {
    // success
} else {
    // failure
}


// 改变对象的操作行为  命令式->函数行为'assign' in Object // true
'assign' in Object
Reflect.has(Object, 'assign') // true





// 查找并返回target对象的name属性 name属性部署了读取函数（getter），则读取函数的this绑定receiver 
Reflect.get(target, name, receiver)  
// 设置target对象的name属性等于value
Reflect.set(target, name, value, receiver)
// 为对象定义属性
Reflect.defineProperty(target, name, desc)
// <=> delete obj[name]，用于删除对象的属性
Reflect.deleteProperty(target, name)
// 对应name in obj里面的in运算符   target对象是否含有name属性
Reflect.has(target, name)
// 返回对象的所有属性   <=> Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
Reflect.ownKeys(target)
// 返回一个布尔值，表示当前对象是否可扩展。
Reflect.isExtensible(target)
// 让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
Reflect.preventExtensions(target)
// 得到指定属性的描述对象
Reflect.getOwnPropertyDescriptor(target, name)

Reflect.apply(fn, thisTarget, args)
// 等同于new target(...args)
Reflect.construct(target, args)
// 读取对象的__proto__属性
Reflect.getPrototypeOf(target)
// 设置目标对象的原型  返回一个布尔值表示是否设置成功
Reflect.setPrototypeOf(target, prototype)
