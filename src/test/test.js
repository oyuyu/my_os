// // 扁平结构转树状结构

// const tree2FlatData = (datas) => {
//   const mapOne = {}
//   const mapTwo = {}
//   const mapThree = {}
//   datas.forEach((item) => {
//     const [one, two, three] = item.split('-')
//     if (!mapOne[one]) {
//       mapOne[one] = {
//         label: one,
//         value: one,
//         children: [],
//       }
//     }
//     if (!mapTwo[two]) {
//       mapTwo[two] = {
//         label: two,
//         value: two,
//         children: [],
//       }
//       mapOne[one].children.push(mapTwo[two])
//     }
//     if (!mapThree[three]) {
//       mapThree[three] = {
//         label: three,
//         value: three,
//       }
//       mapTwo[two].children.push(mapThree[three])
//     }
//   })
//   return Object.values(mapOne)
// }

// const data = ['a-b-c', 'a-c-g', 'a-b-y', 'e-f-m']

// tree2FlatData(data)

// console.log(JSON.stringify(tree2FlatData(data)))

// const res = [
//   {
//     label: 'a',
//     value: 'a',
//     children: [
//       {
//         label: 'b',
//         value: 'b',
//         children: [
//           {
//             label: 'c',
//             value: 'c',
//           },
//           {
//             label: 'y',
//             value: 'y',
//           },
//         ],
//       },
//       {
//         label: 'c',
//         value: 'c',
//         children: [
//           {
//             label: 'y',
//             value: 'y',
//           },
//         ],
//       },
//       {
//         label: 'b',
//         value: 'b',
//         children: [
//           { label: 'c', value: 'c', children: [{ label: 'd', value: 'd' }] },
//         ],
//       },
//     ],
//   },
// ]

// 完整路径

const tree = [
  {
    id: 1,
    children: [
      {
        id: '11',
        children: [{ id: '111' }],
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        id: '21',
        children: [
          { id: '211' },
          {
            id: '212',
          },
        ],
      },
      {
        id: '22',
        children: [
          { id: '221' },
          {
            id: '222',
          },
        ],
      },
    ],
  },
]

// const getPathById = (id, tree) => {
//   let path = ''
//   try {
//     function getNodePath(node) {
//       !!path ? (path += '/' + node.id) : (path += node.id)
//       if (gotit) return path
//       if (node.id === id) {
//         throw path
//       }
//       if (node.children && node.children.length > 0) {
//         for (childs of node.children) {
//           getNodePath(childs)
//         }
//         path = ''
//       } else {
//         path = ''
//       }
//     }
//     for (item of tree) {
//       getNodePath(item)
//     }
//     return path
//   } catch (e) {
//     return path
//   }
// }

// res = getPathById('21', tree)
// console.log(JSON.stringify(res))

const getPathById = (id, tree) => {
  let path = ''
  return new Promise((resolve) => {
    function getNodePath(node) {
      !!path ? (path += '/' + node.id) : (path += node.id)
      if (node.id === id) {
        resolve(path)
      }
      if (node.children && node.children.length > 0) {
        for (childs of node.children) {
          getNodePath(childs)
        }
        path = ''
      } else {
        path = ''
      }
    }
    for (item of tree) {
      getNodePath(item)
    }
  })
}

getPathById('21', tree).then((res) => {
  console.log(res)
})
