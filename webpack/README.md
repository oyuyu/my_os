## 基础配置
 webpack 进行打包时，会根据项目根路径中的 webpack.config.js 文件中设置的配置参数，找到默认入口 （根路径中的 src/index.js），根据其中的依赖关系进行打包，并输出在默认出口（根路径中生成 dist/main.js）。



## 1. babel配置与插件书写

### babel简介
**babel是一个工具链, 向后兼容ES5, 以便在当前/旧版本浏览器中运行**
1. 语法转换
2. polyfill方式添加缺失的特性   
例：如果我们要使用Array.prototype.find()，但是某个版本的浏览器不支持此方法，我们可以通过babel引入相关的Polyfill文件就可以了
3. 源码转换

### 工作原理
(parse)code ->  AST ->(transform) new AST   -> (generator) new code 

### 使用
安装
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

文件config.js
```
module.exports = {
    presets: [
        require('@babel/preset-env')
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ]
}
```

运行   将src中所有的代码编译为dist
```
./node_modules/.bin/babel src --out-dir dist
```


@babel/cli   Babel带有内置CLI，可用于从命令行编译文件。

@babel/core 包括了整个babel工作流，也就是说在@babel/core里面我们会使用到@babel/parser、transformer[s]、以及@babel/generator。

所有的transformations都会使用babel.config.js文件

@babel/parser  将源代码解析成 AST ，方便各个插件分析语法进行相应的处理。

@babel/generator 将修正后的AST解码生成js代码。

@babel/preset-env  是一个智能预设，可让您使用最新的JavaScript，转化最新语法如箭头函数, class, 扩展运算符，想要转换最新的api还需引入@babel/polyfill
接受指定的任何目标环境，并根据其映射检查它们，以编译插件列表，并将其传递给Babel。

@babel/polyfill 补丁 来模拟浏览器不支持的对象/方法,以作兼容  需要安装在生产依赖中

### 1.1 babel中的术语

#### Presets
一系列配置的集合


#### plugin
现在，Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 const babel = code => code; ，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加插件

### 1.2 babel-loader在webpack中的注意事项

旧版到新版的迁移不兼容  改了名字,不能npm i 直接升级
导致可能装了新版本的babel-loader  但是有引用了好多旧版本的 preset/plugin

旧版本
webpack loader
babel-loader
babel-loader 6.0
babel-plugin-proposal-decorators
babel-preset-env

新版本
babel-loader 7.0 
@babel/plugin-proposal-decorators
@babel/preset-env

module: {
    use: {
        test: /\.js$/,
        loader: 'babel-loader'
    }
}