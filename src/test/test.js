// 扁平结构转树状结构

const tree2FlatData = (datas) => {
  const mapOne = {}
  const mapTwo = {}
  const mapThree = {}
  datas.forEach((item) => {
    const [one, two, three] = item.split('-')
    if (!mapOne[one]) {
      mapOne[one] = {
        label: one,
        value: one,
        children: [],
      }
    }
    if (!mapTwo[two]) {
      mapTwo[two] = {
        label: two,
        value: two,
        children: [],
      }
      mapOne[one].children.push(mapTwo[two])
    }
    if (!mapThree[three]) {
      mapThree[three] = {
        label: three,
        value: three,
      }
      mapTwo[two].children.push(mapThree[three])
    }
  })
  return Object.values(mapOne)
}

const data = ['a-b-c', 'a-c-g', 'a-b-y', 'e-f-m']

tree2FlatData(data)

console.log(JSON.stringify(tree2FlatData(data)))

const res = [
  {
    label: 'a',
    value: 'a',
    children: [
      {
        label: 'b',
        value: 'b',
        children: [
          {
            label: 'c',
            value: 'c',
          },
          {
            label: 'y',
            value: 'y',
          },
        ],
      },
      {
        label: 'c',
        value: 'c',
        children: [
          {
            label: 'y',
            value: 'y',
          },
        ],
      },
      {
        label: 'b',
        value: 'b',
        children: [
          { label: 'c', value: 'c', children: [{ label: 'd', value: 'd' }] },
        ],
      },
    ],
  },
]


