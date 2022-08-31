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
 * @类型断言 <>  / as
 */

(<string>'你好啊').length;
('str' as string).length;

/**
 * @交叉类型 &
 * 把多种类型叠加到一起  需同时具备所有的对象成员
 */
type Intersection1 = Type1 & Type2 & Type3;
const inter1: Intersection1 = { name: '小明', age: 19, sex: '男' };

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
 * @必选属性 Required
 */
interface Par1 {
  name?: string;
  age?: number;
}
const req1: Required<Par1> = { name: '', age: 19 };

/**
 * @可选属性 Partial
 */

let p: Partial<Union1> = {};
p = { name: '' };

/**
 * @类型映射 Record<K,T>  K为属性  T为K的类型
 */
type K1 = 'red' | 'blue';
let colors: Record<K1, number> = { blue: 1, red: 2 };
let enum2: Record<number, string> = { 1: '开始', 2: '结束' };

type Name = '小红' | '小I';
type People3 = { name: string; age: number };
let students: Record<Name, People3> = {
  小红: { name: 'xiao', age: 19 },
  小I: { name: 'xiao', age: 19 },
};

/**
 * @排除属性 Exclude
 */

type T1 = { name: string } | { age: string };
type U1 = { age: string };

let e1: Exclude<T1, U1> = { name: '' };

/**
 * @取并集 Extract
 */

let e2: Extract<T1, U1> = { age: '' };
/**
 * @剔除属性 Omit
 */
type P1 = { name: string; age: number; sex: string };
let o1: Omit<P1, 'name' | 'age'> = { sex: '' };

/**
 * @从类型中挑选属性 Pick  挑选出来的属性 继承之前的可选/只读/类型 等属性
 */
let p1: Pick<P1, 'name' | 'age'> = { name: '', age: 16 }; //name age 是必选属性

/**
 * @提取属性 Extract
 * 取交集 中的一个或多个
 */
const extract1: Extract<
  Union1,
  { name: string } | { id: number } | { age: number }
> = { name: '' };
const extract2: Extract<'a' | 'b' | 'c' | 'd', 'c' | 'd'> = 'd' || 'c';

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
 * @类型守卫  运行时进行检查,确保在指定范围之内
 * in
 * typeof
 * instanceof
 */

const fn6 = <T>(x: T): T => {
  if ('name' in x) {
    return { ...x, name: '你好' };
  }
  return x;
};
const fn6res = fn6({ name: 'xx', age: 10 });
console.log(fn6res);

function isTypeof(val: string | number) {
  if (typeof val === 'number') return 'number';
  if (typeof val === 'string') return 'string';
  return '啥也不是';
}

function creatDate(date: Date | string) {
  console.log(date);
  if (date instanceof Date) {
    date.getDate();
  } else {
    return new Date(date);
  }
}

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

/**
 * @返回值类型 ReturnType
 */

type Fn8 = (x: string, y: number) => number;
let returnT1: ReturnType<Fn8> = 9;
/**
 * @入参类型组成的元组类型 Parameters
 */

let paramT1: Parameters<Fn8> = ['fist', 2]; //[string,number]
