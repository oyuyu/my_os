
var map={"../../module/moduleA":"module.exports = new Date().getDay()"}
function require (id){
  var moduleFunc= map[id]
  var exportModule={ exports: {} }
  moduleFunc(exportModule)
  return exportModule.exports
}

    (function(){
    const moduleA = require('../../module/moduleA')
const moduleAJ = require('../../module/moduleA.js')

console.log('hello')

    })()
    