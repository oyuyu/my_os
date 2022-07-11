import { defineConfig } from 'umi';
import routes from './routes';

// 通过presets /plugins 配置插件
const plugins = [];

export default defineConfig({
  //布局
  layout: {
    name: '礼品卡',
  },
  // 生成asset-manifest.json
  manifest: {
    basePath: '/',
  },
  // 忽略moment的local文件,减少尺寸
  ignoreMomentLocale: true,
  // react router的base  默认/
  base: '/',
  // 路由
  routes: routes,
  // 开启快速刷新(热更新)
  fastRefresh: {},
  // F按需加载
  dynamicImport: {},
  // 打包提速
  mfsu: {},
  // webpack5: {},
  // 是否让生成的文件包含hash后缀(用于增量发布和避免浏览器加载缓存)
  hash: true,
  // history类型   hash browser memory
  // history :'hash'
  // 指定输出路径
  // outputPath  :''
  // 指定为true时使用HTML里指定的window.publicPath
  // runtimePublicPath:true
  // 配置浏览器最低版本
  // targets:{},
  // 修改webpack配置
  chainWebpack: (config: any) => {},

  // 配置webpack-dev-server的proxy属性
  // proxy:{}]
  // less-loader 额外配置项
  // lessLoader:{}
  // css-loader 的额外配置项
  // cssLoader:{}
});
