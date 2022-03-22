//预设文件

module.exports = () => ({
    presets: [
        require('@babel/preset-env')
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ]
})