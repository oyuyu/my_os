import { Component } from 'react';

export default [
  {
    //是否严格模式   location与path是否完全匹配
    // exact: true,
    path: '/user',
    title: '用户登录',
    routers: [
      {
        name: '用户登录',
        path: '/user/login',
        component: '@/pages/index',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/index',
    // 路由的高阶组件封装    常用于路由级别的权限校验
    // wrappers: ['@/wrapper/auth'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        Component: '@/pages/home/index',
      },
      {
        name: '参数',
        path: '/params',
        component: '@/pages/routers/params',
      },
      {
        path: '/hooks',
        //子路由
        routes: [
          {
            path: '/hooks/useRef',
            name: 'useRef',
            title: 'useRef',
            component: '@/pages/index',
          },
        ],
      },
    ],
  },
];
