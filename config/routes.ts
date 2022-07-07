export default [
  {
    //是否严格模式   location与path是否完全匹配
    exact: true,
    path: '/',
    title: '说的人',
    component: '@/layouts/index',
    //子路由
    routes: [
      {
        path: '/useRef',
        title: 'useRef',
        component: '@/pages/index',
      },
    ],
  },
  {
    path: '/login',
    title: '用户登录',
    component: '@/pages/index',
  },
  {
    path: '/user',
    component: '@/pages/index',
    //重定向
    redirect: '/useRef',

    // 路由的高阶组件封装    常用于路由级别的权限校验
    wrappers: ['@/wrapper/auth'],
  },
];
