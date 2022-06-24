#!/usr/bin/env node

// 简单打包工具的实现: 基本的打包  热更新H  异步加载的实现/按需加载
/**
 * @实现功能  pack HMR 异步加载
 * 
 * webpack如何执行打包?
 * @函数形式  可以通过require引入函数,并执行   函数参数相当于配置  实现打包的目的
 * @命令行的形式  实现方式: 通过自执行函数  读取配置文件内的配置,作为参数(webpack中对应webpack.config.js)

 */

// 函数形式调用
// const webpack = require('webpack')
// webpack({    //配置项
//   entry: '',
//   output: '',
// })
//

/**-------------------------------------------------------------------- */
const { existsSync, writeFileSync, readFileSync, watch, read } = require('fs')
const { dirname, resolve, extname } = require('path')

const root = dirname(require.main.paths[1])
const funcWrapper = ['function (require, module, exports) {', '}']
const getFilePath = (modulePath) =>
  [modulePath, `${modulePath}.js`, `${modulePath}/index.js`].find(existsSync)

// 模块函数自执行 起到命令行的作用
main(require(resolve(root, 'pack.config')))

/**
 * 模块处理函数   类似于webpack函数
 * @param {*} config  打包配置
 * @returns
 */

function main(config) {
  /**
   * 针对不同的配置类型,格式化不同的配置.保证后面打包配的过程中config是一个符合我们预期的对象
   */
  // 对config进行递归处理
  if (Array.isArray(config)) return config.map(main)

  //entry是数组  将其他的配置对每个entry都进行配置一下
  if (Array.isArray(config.entry))
    return config.entry.map((entry) => main({ ...config, entry, name: entry }))
  //entry是Object 根据key value执行main函数
  if (typeof config.entry === 'object')
    return Object.entries(config.entry).map(([name, entry]) =>
      main({ ...config, entry, name }),
    )

  // 默认配置
  const defaultConfig = {
    base: root, //当前处理文件的相对路径
    name: 'index', //当前配置的唯一项
    entry: 'index', //入口文件
    output: '[name].bundle.js',
    public:
      config.base || config.output
        ? resolve(config.base || '', dirname(config.output || '')).replace(
            root,
            '',
          ) + '/'
        : '/',
  }
  // 保证使用bundle config的时候里面的每一个值是符合预期的
  const bundleConfig = Object.assign({}, defaultConfig, config)

  const modulePathIdMap = {}
  const moduleList = []
  const moduleDepMapList = []
  const chunkModuleList = []
  const chunkModulePathIdMap = {}

  deepTravel(
    resolve(root, bundleConfig.base, bundleConfig.entry), //基于配置拼接出来入口文件的路径
    moduleList,
    moduleDepMapList,
    modulePathIdMap,
    chunkModuleList,
    chunkModulePathIdMap,
  )

  chunkModuleList.forEach((chunk, id) => {
    const dynamicTemplate = readFileSync(
      resolve(__dirname, 'chunk.boilerplate'),
      'utf-8',
    )
    writeFileSync(
      resolve(root, bundleConfig.base, `chunk_${id}.js`),
      dynamicTemplate
        .replace('/* dynamic-require-chunk-id */', `"chunk_${id}"`)
        .replace('/* dynamic-require-chunk-code */', chunk),
      'utf-8',
    )
  })
  // 通过fs默认的方法 将bundle文件输出
  writeFileSync(
    resolve(
      root,
      bundleConfig.base,
      bundleConfig.output.replace(
        '[name]',
        bundleConfig.name.replace(extname(bundleConfig.name), ''),
      ),
    ),
    // 写入内容
    // boilerplate--样板代码 (是运行时执行的代码)  很多代码的大致结构类似 但是中间有些部分是不一样的
    // 将公用部分的代码抽离出来 通过写一些渲染函数  基于这个模板去动态的生成
    // 类似于cli 快速的创建出来一套样板代码
    readFileSync(resolve(__dirname, 'bundle.boilerplate'), 'utf-8')
      .replace('/* runtime-config */', JSON.stringify(bundleConfig)) //对脚本中的注释进行替换   runtime-config
      .replace('/* module-list-template */', moduleList.join(','))
      .replace(
        '/* module-dep-map-list-template */',
        moduleDepMapList.map((item) => JSON.stringify(item)).join(','),
      ),
    'utf-8',
  )

  // fs.watch 监听文件的变化  每当有文件变动时就会触发watch对应的回调

  watch(
    bundleConfig.base, //当前目录
    { encoding: 'utf-8' },
    (eventType) => eventType === 'change' && main(bundleConfig), // 触发的回调
  )
}

// 打包文件
function deepTravel(
  fullPath,
  moduleList,
  moduleDepMapList,
  modulePathIdMap,
  chunkModuleList,
  chunkModulePathIdMap,
  isChunk = false,
) {
  const modulePathMatcher = /require(\.ensure)?\(["`'](.+?)["`']\)/g
  const moduleText = readFileSync(getFilePath(fullPath), 'utf-8')
  const childModules = []
  const moduleDepMap = {}
  let moduleContent = moduleText
  let match = null

  // 有子依赖
  while ((match = modulePathMatcher.exec(moduleText)) !== null) {
    const [, isDynamic, modulePath] = match
    // 根据父节点的路径拼出子节点的绝对路径
    const childModuleAbsolutePath = resolve(
      dirname(getFilePath(fullPath)),
      modulePath,
    )
    // 打包的时候每个子依赖都只应该被处理一次
    // 每次处理子模块之前判断当前子依赖的绝对路径有没有被处理过
    if (
      (isDynamic ? chunkModulePathIdMap : modulePathIdMap).hasOwnProperty(
        childModuleAbsolutePath,
      )
    ) {
      moduleDepMap[modulePath] = isDynamic
        ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath)
        : modulePathIdMap[childModuleAbsolutePath] //把当前模块的子依赖里记录子模块的id
      continue
    }
    // 子模块没被处理过  将子模块的地址记录下来
    childModules.push(modulePath)

    // 递归的形式去子模块里  进行查找
    deepTravel(
      childModuleAbsolutePath,
      moduleList,
      moduleDepMapList,
      modulePathIdMap,
      chunkModuleList,
      chunkModulePathIdMap,
      !!isDynamic,
    )
    moduleDepMap[modulePath] = isDynamic
      ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath)
      : modulePathIdMap[childModuleAbsolutePath]
  }
  const funcStr = `${funcWrapper[0]}\n${moduleContent}\n${funcWrapper[1]}`
  isChunk
    ? cacheModule(chunkModuleList, chunkModulePathIdMap, funcStr, fullPath)
    : cacheModule(moduleList, modulePathIdMap, funcStr, fullPath)
  !isChunk && moduleDepMapList.push(moduleDepMap)
}

function cacheModule(list, map, listVal, mapKey) {
  list.push(listVal)
  map[mapKey] = list.length - 1
}

function getChunkRuntimePath(chunkModulePathIdMap, chunkModuleAbsolutePath) {
  return `chunk_${chunkModulePathIdMap[chunkModuleAbsolutePath]}`
}

module.exports = main
