/**
 * @Set 类数组  成员唯一
 * @常用场景   数组去重
 */

let set1 = new Set([1, 2, 3, 2, 1, 2, 3])
console.log(set1) //Set(3) {1, 2, 3}
console.log(Array.from(set1)) //[1,2,3]
console.log([...set1]) //[1,2,3]

//方法
set1.add(1) //添加元素
set1.delete(6) //删除元素
set1.has(2) //检查元素是否存在
