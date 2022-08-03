/**
 * 优点:
 * 增强代码可维护性
 * 友好提示,在编译阶段检查大部分错误
 *
 */

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
 */

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
  readonly name: string; //只读属性   使用const OR readonly要看它是作为变量使用还是属性使用
  age?: string; //可选属性
  [propName: string]: any; //其他属性绕过检查
}

//函数
interface IFn {
  (x: number, y: number): number;
}
const fn1: IFn = (x, y) => {
  return x + y;
};

const fn2 = (x: number, y: number): number => {
  return x + y;
};

// 可索引类型  定义索引签名类型 && 索引返回值类型
interface StringArr {
  [index: number]: string;
}
const stringArr: StringArr = ['你好', '加油'];

interface ReadonlyIndex {
  readonly [index: number]: string; //索引类型已读，防止给索引赋值
}
let readonlyIndex = ['心定'];
// readonlyIndex[1]=99  不能赋值

interface StringIndex {
  [index: string]: number;
}
const strIndex: StringIndex = { age: 1 };
