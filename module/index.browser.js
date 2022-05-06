// 将CommonJS怎样经过处理转为能在浏览器中可执行的代码 

// 映射表
var map = {
    './moduleA': moduleA
}

// 模拟require
function require(id) {
    var module = map[id]
    var exportModule = { exports: {} }
    module(exportModule)
    return exportModule.exports
}


// moduleA.js
function moduleA(module) {
    module.exports = new Date().getTime()
}


// index.js


const a = require('./moduleA')
console.log(a);