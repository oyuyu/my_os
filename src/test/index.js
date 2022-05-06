#!/usr/bin/env node

/**
 * 执行文件第一行加入 #!/usr/bin/env node
 * #!  相当于这行就是注释，其实没有什么用，只是标识的作用，说明这个文件可以当做脚本来运行
 * /usr/bin/env node  去用户(usr)的安装根目录(bin)下的env环境变量中去找node执行器,去执行
 */

/**
 * 执行命令
 * 1.进入文件夹   2. chmod +x 文件名 (给文件执行权限)    3. ./文件名 (执行文件)
 */

const bundler = require('../script')

const fs = require('fs')
const path = require('path')
// fs.readFileSync(文件路径,编码格式)
// path.resolve() 将相对路径转为绝对路径
// __dirname:当前执行文件所在目录的完整目录名
// __filename :当前执行文件 带有完整绝对路径的文件名
// ./  文件所在目录

// const content = bundler(
//   fs.readFileSync(path.resolve(__dirname, './index.js'), 'utf-8'),
// )
const content = bundler(path.resolve(__dirname, './testRequire.js'))

fs.writeFileSync(
  path.resolve(__dirname, './index.bundler.js'),
  content,
  'utf-8',
)
