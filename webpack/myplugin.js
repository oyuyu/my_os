/**
 * 具有apply方法的一个类
 */

/**
 * @功能 清除打包后bundle中的注释
 * @思路 将任务挂在emit钩子上(emit会在webpack即将向输出目录输出文件时执行)
 */

class MyPlugin {
  // compiler webpack实例
  apply(compiler) {
    compiler.hooks.emit.tap('myplugin', (compliation) => {
      // compliation打包的上下文(每一次执行打包,独立的编译)
      for (const name in compliation.assets) {
        if (name.endsWith('.js')) {
          const contents = compliation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          compliation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          }
        }
      }
    })
  }
}
