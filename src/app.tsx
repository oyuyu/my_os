import { history } from 'umi';
import { createElement } from 'react';
// patchRoutes  修改路由
// export const patchRoutes=({routes})=>{
//     routes.unshift({
//         path:'/foo',
//         exact:true,
//         component: require('@/extraRoutes/foo').default,
//     })

// }

/**
 * @render覆写render
 * @比如 渲染前权限校验
 */

export const render = (oldRender: any) => {
  fetch('/api/auth').then((auth: any) => {
    if (auth.isLogin) {
      oldRender();
    } else {
      // history.push('/login')
      oldRender();
    }
  });
};

export const onRouteChange = ({ matchedRoutes }: any) => {
  if (matchedRoutes.length) {
    document.title =
      '学习-' + matchedRoutes[matchedRoutes.length - 1].route.title ||
      '未知页面';
  }
};

// export const rootContainer = (
//   lastRootContainer: any,
//   { routes, plugin, history }: any,
// ) => {
//   return createElement(ThemeProvider, null, lastRootContainer);
// };
