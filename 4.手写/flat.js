// 数组扁平化

let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

// 差的实现   递归

const flat = (arr, parentId = 0) => {
  const res = [];

  arr.forEach((item, index) => {
    const { id, pid } = item;
    if (pid == parentId) {
      let child = flat(arr, id);
      child.length > 0 ? res.push({ ...item, child }) : res.push(item);
    }
  });

  return res;
};

// Map实现

const flatByMap = (arr) => {
  let res = [];
  let itemMap = {};
  arr.forEach((item) => {
    itemMap[item.id] = { ...item, child: [] };
  });
  arr.forEach((item) => {
    const { id, pid } = item;
    const itemtree = itemMap[id];
    if (pid == 0) {
      res.push(itemtree);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = { };
      }
      itemMap[pid].child.push(itemtree);
    }
  });
  return res;
};

let res = flatByMap(arr);
res = JSON.stringify(res);
console.log(res);
