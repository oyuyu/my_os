#!/usr/bin/env node

// 简单打包工具的实现: 基本的打包 + 热更新H  异步加载的实现/按需加载

const path = require('path')
const fs = require('fs')
const { stringify } = require('querystring')

//绝对路径与文件内容的映射
let absoluteMapfs = {}

//被请求文件的相对路径与 文件内容的映射
let requirePathMapChildfs = {}

//实现路径的补全,方便读取文件内容   name/name.js   ->   name.js
const getfilePath = (childpath) =>
  [childpath, `${childpath}.js`].find(fs.existsSync)

console.log(fs.existsSync, 'fs.existsSync')

let template = `
var map=@@map
function require (id){
  var moduleFunc= map[id]
  var exportModule={ exports: {} }
  moduleFunc(exportModule)
  return exportModule.exports
}
`
// ismain是否为入口文件
function main(pathtoModule, ismain = true) {
  console.log('-------处理了哪些文件-------', pathtoModule)
  //读取文件内容
  // 根路径
  const rootPath = path.dirname(pathtoModule)

  //读取模块内容,并对里面的结果进行替换
  const content = fs.readFileSync(pathtoModule, 'utf-8')

  //收集生成映射表文件的信息 :当前模块里面依赖了哪些模块 -- 所依赖模块的函数在哪
  //在运行过程中静态分析模块中依赖了哪些内容

  const moduleMatch = /require\(['"](.+?)['"]\)/g
  let match = null
  while ((match = moduleMatch.exec(content))) {
    const [, modulePath] = match
    // 基于当前相对路径拼接出引用文件的绝对地址
    const childpath = getfilePath(path.resolve(rootPath, modulePath))
    console.log('相对路径', modulePath, '绝对路径', childpath)

    // 可能存在相同引用的情况   如果已经处理过则结束本次循环  不做处理
    if (absoluteMapfs[childpath]) break
    // 通过递归的方式处理子文件的引用内容
    main(childpath, false)
    const childModuleStr = absoluteMapfs[childpath]
    requirePathMapChildfs[modulePath] = childModuleStr
  }
  console.log(requirePathMapChildfs)

  // 将文件内容拼接   并包裹在函数中返回
  // const funcStr = ` function (require,module,exports){
  //   ${content}
  // }
  //   `
  const funcStr = content
  absoluteMapfs[pathtoModule] = funcStr

  const tpl = template.replace('@@map', JSON.stringify(requirePathMapChildfs))
  console.log(ismain, '------main---------')
  if (!ismain) {
    return tpl
  }
  return `${tpl}
    (function(){
    ${funcStr}
    })()
    `
}

module.exports = main
