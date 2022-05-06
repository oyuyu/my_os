// CommonJS 模块化规范

// const a = require('./moduleA')
// console.log(a);

// const res = ['aa-bb-cc-dd'].map((v) => {
//     return v.split('-').reduceRight((pre, curr) => {
//         if (pre.value) {
//             return {
//                 lable: curr,
//                 value: curr,
//                 children: pre
//             }
//         } else return {
//             lable: curr,
//             value: curr,
//         }
//     }, {})
// })

// const tosingleTree = (data) =>
//   data.reduceRight((pre, curr) => {
//     curr = { lable: curr, value: curr }
//     return pre ? { ...curr, children: pre } : curr
//   }, undefined)

// tosingleTree(['aa', 'bb', 'cc', 'dd'])
// const data = ['a-b-c-g', 'a-c-g-v', 'a-b-c-y', 'b-c-d-f']

const data = [
  ['aa', 'bb', 'cc'],
  ['aa', 'ff', 'dd'],
  ['aa', 'bb', 'dd'],
]
const tosingleTree = (data) =>
  data.reduceRight((pre, curr) => {
    curr = { lable: curr, value: curr }
    return pre ? { ...curr, children: [pre] } : curr
  }, undefined)

function treeData(data) {
  var code1 = '-1'
  var code2 = '-1'
  var root1 = []
  var rootData1 = {}
  var tmp1 = -1
  var tmp2 = -1
  for (var item of data) {
    const [level1, level2, level3, level4] = item
    if (code1 != level1) {
      rootData1 = tosingleTree(item)
      root1.push(rootData1)
      code1 = level1
      code2 = level2
      tmp1++
      tmp2 = 0
    } else {
    //   console.log(root1, tmp1, root1[tmp1].children)Í
      var children = root1[tmp1].children
      if (code2 == level2) {
        var children2 = children[tmp2].children
        children2.push({ label: level3, level: 3, value: level3 })
        children[tmp2].children = children2
      } else {
        children.push({
          label: level2,
          value: level2,
          level: 2,
          children: [{ label: level3, level: 3, value: level3 }],
        })
        rootData1.children = children
        root1[tmp1] = rootData1
        tmp2++
      }
      code2 = level2
      code1 = level1
    }
  }
  return root1
}

treeData(data)

// ['aa-bb-cc-dd'].map((v) => {
//     return for v.split('-').reverse().reduce((pre, curr) => {
//         if (pre.value) {
//             return {
//                 lable: curr,
//                 value: curr,
//                 children: pre
//             }
//         } else return {
//             lable: curr,
//             value: curr,
//         }
//     }, {})
// })
