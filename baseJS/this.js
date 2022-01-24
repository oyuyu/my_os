/**
 * @this 不是被.出来的  自然执行时指向全局 
 */
function fn(params) {
    /*
     executionContext= {
         this:{}   //指定this   
    }
    */
    console.log(this, '-------');
}
fn()

/**
 * @this 执行时,永远指向最后.出来的那个对象
 */

var obj = {
    name: 'xiaoli',
    getname: function() {
        console.log(this);
    },
    child: {
        name: 'lili',
        getname: function() {
            console.log(this);

        }
    }
}
var wife = {
    name: 'xiaomei'
}
obj.getname()
obj.child.getname()
wife.getname = obj.getname
console.log('----wife-----');
wife.getname()
var getname = obj.getname
console.log('----global-----');
getname()
console.log('----逗号表达式返回最后那个值    执行时没被任何对象.出来-----');
(1, 2, 3, wife.getname)()

/**
 * @this 指向new出来的对象
 */
function Person() {
    console.log(this); //  this指向xiaoming(new出来的对象)  log打出来的是xiaoming的构造函数 Person   
    this.getname = function() {
        console.log(this, '--------');
    }
}

var xiaoming = new Person();
var xiaoli = { name: 'xiaoli' }
xiaoli.getname = xiaoming.getname
xiaoli.getname()