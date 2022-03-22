module.exports = {
    presets: [
        // 预先写好的配置
        require('@babel/preset-env')  // 预设env  会检测你代码用了什么语法然后动态的引用插件
        // require('@babel/preset-ereact')   //引入这个文件,会帮你预设react的大部分需要的插件
    ],
    plugins: [
        // 预设插件不能满足的条件下  额外需要的插件
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ]
}