type Type1 = { name: string };
type Type2 = { age: number };
type Type3 = { sex: string };

interface Interface1 {
  name: string;
}
interface Interface2 {
  age: number;
}
interface Interface3 {
  sex: string;
}
/**
 * @交叉类型 &
 * 把多种类型叠加到一起  需同时具备所有的对象成员
 */
type Intersection1 = Type1 & Type2 & Type3;
const xiaoming: Intersection1 = { name: '小明', age: 19, sex: '男' };

function intersectionfn<T, U>(x: T, y: U): T & U {
  return { ...x, ...y };
}

const intersectionfn1 = <T, U>(x: T, y: U): T & U => {
  return { ...x, ...y };
};

/**
 * @联合类型 |
 * 满足其中一个/多个类型的合集
 */

type Union1 = Type1 | Type2 | Type3;
const union1: Union1 = { age: 16 };
const union2: Union1 = { name: '', age: 16 };

type IUnion1 = Interface1 | Interface2 | Interface3;
const union3: IUnion1 = { name: '', age: 16 };

/**
 * @可选属性 Partial
 */

let p: Partial<Union1> = {};
p = { name: '' };

/**
 * @排除属性 Exclude
 * 只能从联合类型中排除
 */

type U1 = { add: string };
let e1: Exclude<IUnion1, U1> = { age: 16 };

/**
 * &类型断言 is
 * 返回Boolean
 */
const isInterface1 = (x: IUnion1): x is Interface1 =>
  (<Interface1>x).name !== undefined;

const unionfn = (x: IUnion1): IUnion1 => {
  //x.name不一定存在 因为要使用类型断言
  // if (x?.name) {
  //     return { name: '' }
  // }
  if ((<Interface1>x).name !== undefined) return { name: '' };
  return x;
};

const unionfn1 = <T extends IUnion1>(x: T): T => {
  return x;
};

/**
 * @索引类型
 */
function indexfn<T, K extends keyof T>(p: T, k: K): T[K] {
  return p[k];
}
indexfn({ name: 'xiaoming', age: 16 }, 'age');
// indexfn({ name: 'xiaoming', age: 16 },'sex')

const index1: keyof Intersection1 = 'age';
// const index2: keyof Union1='age'  //err

//索引类型和字符串索引签名
interface P<T> {
  [key: string]: T;
}
let value: P<number>['name'] = 19;
let key: keyof P<number> = 'name';

// 映射-只读的实现
type ReadonlyP<T> = {
  readonly [K in keyof T]: T[K];
};
// let readonly1: ReadonlyP<Interface1> = { name: '' }
// 简易写法
let readonly1: Readonly<Interface1> = { name: '' };
readonly1.name;
// readonly1.naem ='xiao狗'  // 属性只读

//映射-可选的实现
type PartialP<T> = {
  [K in keyof T]?: T[K];
};
// let p2: PartialP<Interface1> = {}
let p2: Partial<Interface1> = {};
p2 = { name: '' };
p2.name = '';
