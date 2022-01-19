//作用域 作用域链和执行上下文栈   是有区别的
function inner(num) {
    var getData = function getData() {}
        //函数找作用域链的时候是找 定义时候的作用域链 (是找定义时候的栈而不是执行时候的栈)
        // console.log(name); //为什么不打印'xiaoming'  词法作用域  定义时向外找,而不是运行时向外找 

    function c() {}
}


function outer() {
    var name = 'xiaoming'
    inner(100)
}

outer()

// 执行栈  inner outer  window    与变量的作用域链是不一样的


/**
 * 
 * @循环引用爆栈
 * 当一个函数内部执行另一个函数的时候  虽然去执行内部函数了,但是外面的变量仍要保留  
 * 直到函数执行完以后才会对执行上下文栈进行销毁
 */

function demo(num) {
    var name = 'xiaoming'
    if (num > 10000000000) {
        return
    }
    demo(num + 1) //循环引用 会造成执行栈过多 爆栈!!  Maximum call stack size exceeded
}
demo(0)




//百万节点  用栈模拟递归 不建议使用递归   

//DFS 用栈模拟(自己造的栈不是js的调用栈)

//伪递归优化