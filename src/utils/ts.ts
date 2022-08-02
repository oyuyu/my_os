/**
 * 优点:
 * 增强代码可维护性
 * 友好提示,在编译阶段检查大部分错误
 *
 */

import ContextTreeNode from 'rc-tree/lib/TreeNode';

/**
 * @基础类型
 * @void 无效的  一般用在函数上, 定义函数无返回值
 * @never 永远不存在值的类型. 常用在抛出异常/不会有返回值(死循环)的函数表达式  或箭头表达式的返回值类型
 * @unkown 任何类型的值都可以赋值给它   但是Ta只能赋值给 unknown和any 类型的变量
 * @any 可以赋值/被赋值任何类型
 */

type WithNUll<T> =
  | T
  | boolean
  | number
  | string
  | symbol
  | unknown
  | void
  | undefined
  | null
  | never;

interface IProps {
  onClick: () => void;
}
const errorfn = (errMsg: string): never => {
  throw new Error(errMsg);
};
let str1: string = '你好';
let any1: any = 'enen';
const unknown: unknown = str1;

// str1 = unknown    //报错  unknown类型不能赋值给string类型
str1 = any1;

/**
 * enum类型
 * 1.未初始化  值从0增
 * 2.首个初始化  值从设置值+1
 */
enum Enum {
  UP, //0
  DOWN = 9, //9
  RIGHT, //10
}

enum Enum1 {
  RED, //0
  PINK = 'pink',
  BLUE = 'blue', //上条数据设置了非数字, 这个必须初始化
}

enum EnumColor {
  RED = 'red',
  PINK = 'pink',
  BLUE = 'blue',
}
const red: EnumColor = EnumColor.RED;
console.log(red); //red

/**
 * @数组类型 --相同类型的数组
 * @元组类型 --定义已知类型/数量的数组
 * unknown[] --未知类型数组
 * @ReadonlyArray  --只读数组 数组创建后不能被修改
 */
type Arr1 = number[];
type Arr2 = Array<number>;
const arr1: Arr1 = [1, 2, 3];

type Tuple = [number, string, {}];
const tuple: Tuple = [1, '1', {}];

const unknownArr: unknown[] = [];

const readonlyArr: ReadonlyArray<number> = [1, 2, 3, 4];

/**
 * @泛型
 */
// 场景1: 入参出参类型相同
const identity1 = <T>(x: T): T => {
  return x;
};
// identity1<string>(1) //err 正常不需要用<>明确传入类型   编译器能自动推算出
identity1<number>(1);

function identity2<T>(data: T[]): number {
  return data.length;
}
const identity3 = <U, T>(data: Array<U>, index: T): number => {
  //可以使用不同的泛型参数名,数量和方式对上就行
  return data.length;
};

interface IdentityFn {
  <T>(x: T, y: T): void; //泛型接口 不会对void类型进行强校验
}
const identity4: IdentityFn = function (x) {
  return x;
};
identity4(9, 9);

interface IdentityFn1<T> {
  (x: T, y: T): T;
}
const identity5: IdentityFn1<number> = function (x) {
  return x;
};
// identity5('e', 'r') //err
identity5(1, 1);

// 场景2: 泛型约束
const identityFn2 = <T extends { length: number }>(data: T) => {
  return data.length;
};
// identityFn2(1) //约束泛型必须存在length属性
identityFn2([]);
identityFn2({ length: 2, value: 1 });

// 场景3:一个参数被另一个参数类型束缚
// ??????

/**
 * @对象类型 --函数 {} 数组 类
 * @object 表示所有的非原始类型  不能把number等原始类型赋值给他   严格模式下 null undefined也不行
 * @Object/{}  原始类型/非原始类型都能赋值给Object 严格模式下 null undefined不行
 */

// 类
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    console.log(`Hi, ${this.name}`);
  }
}

/**
 * @接口 对值结构进行类型检查
 */

interface Ifn1Props {
  color: string;
  readonly name: string; //只读属性
  age?: string; //可选属性
  [props: string]: any; //字符串索引签名-描述对象索引类型&&索引返回值类型   可绕过额外属性的检查
}
//接口继承
interface Age {
  age: number;
}
interface Address {
  address: string;
}
interface People extends Age {
  name: string;
}
interface People2 extends Age, Address {
  //多个接口的合成接口
  name: string;
}

const xiaohong: People = { name: 'xiaohong', age: 19 };
const xiaoming: People2 = { name: 'xiaohong', age: 19, address: '' };
let xiaoli = <People2>{};
xiaoli.name = '小李';

//函数
interface IFn {
  // 可选参数必须再必选参数后面
  // 参数类型 : 返回值类型
  (
    x: number,
    y?: number, //可选参数
    ...rest: number[] // 剩余参数
  ): number;
}
const fn1: IFn = (m, n = 6) => {
  // 只要类型匹配 参数名字只是为了增加可读性,可以不匹配
  return m + n;
};
// fn1(1, 2, '3', '4', {})  //err
fn1(1, 2, 3, 4);
let ffn1: IFn = function (x, y = 1) {
  return x + y;
};
const fn2 = (x: number, y: number): number => {
  return x + y;
};

interface IFn1 {
  ({ x, y }: { x?: number; y: number }): number;
}
const fn3: IFn1 = ({ x = 99, y }) => {
  return x + y;
};

interface IFn2 {
  (x: number, y: number): number;
}
const fn5: IFn2 = (x) => {
  return x;
}; //定义函数时并不会做强校验
// fn5(6) //err  使用函数的时候会对函数接口定义做强校验
fn1(1, 2);

interface Ifn2Props {
  x: number;
  y: number;
}

const fn4 = ({ x, y }: Ifn2Props) => {
  return x + y;
};
// 额外属性绕过检查   1.使用断言 as    2.添加字符串索引签名
fn4({ x: 1, y: 2, z: 3 } as Ifn2Props);

// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
const getCounter = (): Counter => {
  let counter = <Counter>((x: number) => {
    return x.toString();
  });
  counter.interval = 500;
  counter.reset = () => {};
  return counter;
};

//可索引类型
interface Index1 {
  [index: number]: string | number;
}

const indexArr1: Index1 = [1, 2, '比你好'];
const indexObj1: Index1 = { 1: '基金', 2: 'BTC' };

interface Index2 {
  [index: string]: string | number;
}
const indexObj2: Index2 = { 基金: '$2000000', BTC: '$9999999' };

/**
 * @类
 */

interface IClockStatic {
  currTime: Date;
  setTime(d: Date): void;
}
class Clock implements IClockStatic {
  currTime: Date = new Date();
  setTime(d: Date) {
    this.currTime = d;
  }
  constructor(h: number, m: number) {
    `${h}:${m}`;
  }
}

//接口继承类
class Control {
  private state: unknown[] = [];
}

interface Selectable extends Control {
  select(): void;
}

class Button extends Control implements Selectable {
  select() {}
}
// tip: Button2缺少属性 state
// class Button2 implements Selectable {
//   select() { }
// }
