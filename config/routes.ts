export default [
  {
    //是否严格模式   location与path是否完全匹配
    exact: true,
    path: '/login',
    title: '用户登录',
    component: '@/pages/index',
  },
  {
    path: '/',
    component: '@/layouts/index',
    // 路由的高阶组件封装    常用于路由级别的权限校验
    wrappers: ['@/wrapper/auth'],
    routes: [
      {
        path: '/',
        redirect: '/home', // 配置路由跳转
      },
      {
        path: '/params',
        component: '@/pages/routers/params',
      },
      {
        path: '/hooks',
        //子路由
        routes: [
          {
            path: '/hooks/useRef',
            title: 'useRef',
            component: '@/pages/index',
          },
        ],
      },
    ],
  },
];
