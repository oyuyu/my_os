/**
 * 实例 js原型链
 *
 */

// 实现方式1: Object.create()

const People = {
  name: 'xiaohong ',
  getPhone: () => {
    console.log('小红的手机号')
  },
}

const person = Object.create(People)
person.getPhone()
