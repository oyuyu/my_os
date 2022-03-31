// 静态处理    对于打包结果的处理: 入口文件jquery的所有内容会被直接打包到out文件中
import $ from 'jquery'

// import函数是动态加载的    动态打包的, 打包结果是分开的, 是两个文件   异步结果会放到jsonP的chunk里
import('./1.迭代器interator').then((content) => {
    console.log(content);
})