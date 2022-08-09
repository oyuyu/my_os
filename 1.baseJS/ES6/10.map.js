/**
 * @map
 * 键值对结构  和Json对象类似
 */

//数据结构
let map1 = new Map([
  ['name', '小红'],
  ['age', 16],
])
console.log(map1) //Map(2) {name => 小红, age => 16}

// 方法
map1.set('sex', 'girl') // 一个key 只能对应一个value
map1.has('name') //判断
map1.get('name') //取值
map1.delete('sex') // 删除
map1.forEach((value, key, map) => {
  console.log({ value, key, map })
}) //遍历

const iterator = map1.entries() //返回一个迭代器对象
console.log(iterator.next()) //{value:['name', '小红'], done:false}
console.log(iterator.next().value)
console.log(iterator.next())

map1.keys() //获取keys
map1.values()
map1.size //长度
map1.clear() //清空
