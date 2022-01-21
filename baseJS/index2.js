/**
 * @闭包
 * 
 * 
 * @场景
 * 私有变量
 * 存储变量
 */



(function() {
    var Person = function() {
        this.name = 'xiaoming'
    }
    Person.prototype.getname = function() {
        this.name += 'li'
        console.log(this.name);
    }

    var people = new Person;
    people.getname()

    function changeName() {
        people.name = 'change' //外部可以直接访问属性名并进行更改   但并不希望这样
    }
    changeName()
    people.getname()

})()

//改造 1 不建议
// 存在问题  变量公用的问题 并不是new出来的每个对象私有的  只能叫做静态私有变量

var Person = (function() {
    //静态私有变量
    var _name = 'lily'

    function Person() {}
    Person.prototype.getname = function() {
        _name += 'browse'
        console.log(_name);
    }
    return Person
})()

var people = new Person();
people.getname()

function changeName() {
    people.name = 'change' //外部可以直接访问属性名并进行更改   但并不希望这样
}
changeName()
people.getname()



/**
 * 实现私有变量
 * 1.使用symble
 * 2.下面
 * 
 * @常用场景
 * 使用闭包做缓存
 */

// 缺点:会造成资源浪费
(function() {
    var axios = require('axios')
        //封装数据接口
    function getMenu() {
        return axios.get('api')
    }

    // 组件内部使用 多次调用会造成浪费
    const APP = () => {
        const handleClick = () => {
            getMenu().then()
        }

        const handleRemove = () => {
            getMenu().then()
        }

    }
})()


//改写   用闭包做缓存
(function() {
    var axios = require('axios')
        //封装数据接口
    function apiGenerator(params) {
        //请求结果用变量缓存起来
        var data = null
        return function getMenu() {
            //下次请求的时候 如果数据存在则直接返回   如果数据不存在则再次发起请求
            //注意点: 返回值永远类型相同
            if (data) {
                // return data   //返回值类型不同   
                return Promise.resolve(data)
            } else {
                return axios.get('api').then((res) => {
                    data = res
                    return data
                })
            }
        }
    }

    var getMenu = apiGenerator()

    const APP = () => {
        const handleClick = () => {
            getMenu().then()
        }

        const handleRemove = () => {
            getMenu().then()
        }

    }
})()