module.exports = {
    // 预先写好的配置
    presets: [
        '@babel/preset-env', // 预设env  会检测你代码用了什么语法然后动态的引用插件
        // '@babel/preset-react'   //引入这个文件,会帮你预设react的大部分需要的插件

        // 存在默认配置
        {
            // 1.5%代表只需要支持 >1.5%用户量的浏览器就可以
            // babel遇到一个语法 会通过指定的targets去canIuse查找,判断当前语法在配置的环境里面是否可以运行,如果可以运行说明在预设的环境中支持了这部分的语法,那么就不需要babel编译
            'targets': '>1.5%',
            // 在自运行时解析模块需要pollfill的内容 按需进行加载
            'useBuiltins': 'usage',
            // 指定corejs的版本   
            'corejs': 2
        },

    ],
    plugins: [
        // 预设插件不能满足的条件下  额外需要的插件
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ]
}