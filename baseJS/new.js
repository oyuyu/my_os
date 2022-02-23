/**
 * @new 关键字做了什么
 * 1. 继承Player的对象p1被创建
 * 2. p1.__proto__==Player.prototype
 * 3. 改变this指向 将this指向new出来的对象p1
 * 4. 返回新对象p1
 */



function People() {
    this.color = 'red'
    //不return
    //p1输出 People {color : 'red'}

    //显示return this  
    //p1输出 People {color : 'red'} 
    // return this   

    //显示return 基本类型  number string  boolean undefined   
    //p1输出 People {color : 'red'} 
    // return undefined   

    //显示return非基本类型   
    //p1 输出return的内容
    return [1,2,3,4]
}

const p1 = new People()

console.log(p1);



/**
 * 实现 new 
 */




