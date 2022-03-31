const path = require('path')





module.exports = {
    mode: 'none',
    entry: 'src/index.js',  //入口文件路径
    output: {
        publicPath: '/dist/',   //出口文件夹路径
        filename: 'index.js'   //出口文件名
    },
    // 作用: 当import某一个内容的时候  需要把它映射到他地方   常用来把一些常见的第三方依赖文件剔除出去 
    // 把不会经常变的文件通过hash或者其他方式进行长缓存  客户加载一次文件之后,把这些文件长缓存在客户本地
    externals: {
        'jquery': 'jQuery',    //这个jQuery模块会直接挂在window上  代码中加载jquery的时候 去加载jQuery

    },
    /**
     * @webpack_loader
     * 对于不同后缀的文件怎么进行处理的 
     * 通过module.rules进行配置
    */
    module: {
        rules: [
            {
                test: /\.js$/,  //正则匹配文件类型
                use: {  //使用的loader配置
                    loader: 'babel-loader',   //通过正则匹配的内容 使用babel-loader进行编译
                    options: {   //loader的具体配置
                        presets: ['@babel/preset-env']

                    }

                }
            }

        ]
    }
} 