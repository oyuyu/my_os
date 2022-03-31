/**
 * @概念
 * 装饰器的本质是一个函数  通过修饰符@执行   与通过fn(className)执行一样的,相当于把类/方法作为参数传进去
 * 装饰类/方法,从根本上改变类对外暴露接口  
 */


console.log('--------test1--------');

const myDecorator = (target) => {
  console.log(target);
  target.prototype.click = function () {
    console.log('click');
  }
  return target
}


const fnDecorator = (targetPrototype, propName) => {
  // 装饰方法的时候会将 类的prototype传过来
  const originRender = targetPrototype.render

  targetPrototype.render = function () {
    console.log('reWrite render');
  }
  return targetPrototype
}

// 按条件使用装饰器

const conditionDecorator = (reWrite) => (targetPrototype, propName) => {
  if (reWrite) {
    const originProp = targetPrototype[propName]
    targetPrototype[propName] = function () {
      console.log('reWrite render');
    }
  }
  return targetPrototype
}


// @myDecorator
class MyComp {
  // @fnDecorator
  // @conditionDecorator(true)
  render() {
    return 'render'
  }
  // @conditionDecorator(false)
  getname() {
    return 'name'
  }
}

myDecorator(MyComp)

const newComp = new MyComp()
console.log(newComp);
newComp.click()
