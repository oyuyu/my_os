import { Component } from 'react';

export default [
  {
    //是否严格模式   location与path是否完全匹配
    // exact: true,
    path: '/user',
    title: '用户登录',
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: '@/pages/index',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    // 路由的高阶组件封装    常用于路由级别的权限校验
    // wrappers: ['@/wrapper/auth'],
    routes: [
      // {
      //   path: '/',
      //   redirect: '/home',
      // },
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
        name: 'hooks',
        path: '/hooks',
        //子路由
        routes: [
          {
            path: '/hooks/useRef',
            name: 'useRef',
            title: 'useRef',
            component: '@/pages/usehooks/useRef',
          },
        ],
      },
      {
        name: '下载',
        path: '/download',
        //子路由
        routes: [
          {
            path: '/download/a',
            name: 'A标签下载',
            component: '@/pages/download/aDownload',
          },
        ],
      },
    ],
  },
];
