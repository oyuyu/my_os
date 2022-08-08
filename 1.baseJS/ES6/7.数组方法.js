/* * @Author: whr
 * @Date: 2022-08-08 10:48:10
 * @Last Modified by:   whr
 * @Desc: 判断数组   数组去重  */

/**
 * @判断是否为数组
 */
let res

res = Array.isArray([])
res = [(1, 2)] instanceof Array
res = [].__proto__.construcor === Array
res = [].construcor === Array
res = Object.prototype.toString.call([]) //[object Array]

/**
 * @数组去重
 */
const notunionArr = [1, 1, 2, 3, 2, 3, { a: 1, b: 2 }, { a: 1, b: 2 }]
// 双重循环  时间复杂度O(n^2)
// 引用类型无法去重
function uniArr1(arr) {
  //首先判断类型
  if (!Array.isArray(arr)) {
    return arr
  }
  let resArr = [arr[0]]
  for (let i of arr) {
    let isunion = true
    for (const j of resArr) {
      if (i === j) {
        isunion = false
        break
      }
    }
    isunion && resArr.push(i)
  }
  return resArr
}
console.log(uniArr1(notunionArr))

//indexof 引用类型无法去重 时间复杂度O(n^2)
function uniArr2(arr) {
  if (!Array.isArray(arr)) return arr
  let res = []
  for (const i of arr) {
    res.indexOf(i) < 0 && res.push(i)
  }
  return res
}
console.log(uniArr2(notunionArr))

//判断元素第一次出现的位置 时间复杂度O(n^2)

function uniArr3(arr) {
  if (!Array.isArray(arr)) return arr
  return arr.filter((item, index) => arr.indexOf(item) === index)
}
console.log(uniArr3(notunionArr))

//相邻元素去重
function uniArr4(arr) {
  if (!Array.isArray(arr)) return arr
  arr = arr.sort()
  let res = []
  for (let i = 0; i < arr.length; i++) {
    arr[i] !== arr[i - 1] && res.push(arr[i])
  }
  return res
}
console.log(uniArr4(notunionArr))

// set解构赋值
function uniArr5(arr) {
  if (!Array.isArray(arr)) return arr
  return [...new Set(arr)]
}
console.log(uniArr5(notunionArr))

// arrfrom && set
function uniArr6(arr) {
  if (!Array.isArray(arr)) return arr
  return Array.from(new Set(arr))
}
console.log(uniArr6(notunionArr))

// 利用对象属性去重  只有这个可以对引用类型进行去重
function uniArr7(arr) {
  if (!Array.isArray(arr)) return arr
  let res = []
  let obj = {}
  for (const i of arr) {
    if (!obj[i]) {
      res.push(i)
      obj[i] = 1
    }
  }
  return res
}
console.log(uniArr7(notunionArr))
