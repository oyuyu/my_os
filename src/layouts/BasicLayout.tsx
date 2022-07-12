/**
 * @页面基础布局
 */
import React, { useEffect } from 'react';
import { ProLayout } from '@ant-design/pro-layout';
import { Link, useModel } from 'umi';
import { settings as defaultSettings } from '../../config/defaultSettings';

const menuDataRender = (menuList: any) => {
  return menuList.map((item: any) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return localItem;
  });
};

const BasicLayout: React.FC = (props: any) => {
  const { children, location = { pathname: '/' } } = props;

  const { routes } = useModel('routes');

  useEffect(() => {
    // 获取动态菜单
  }, []);
  return (
    <ProLayout
      {...props}
      {...defaultSettings}
      routerData={routes}
      // 自定义菜单项render方法
      menuItemRender={(menuItemProps, defaultDom) => {
        console.log(menuItemProps, defaultDom, '--------');
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{menuItemProps.name}</Link>;
      }}
      // 自定义面包屑数据
      // breadcrumbRender={(routers = []) => {
      //   return [...routers];
      // }}

      // 自定义menudata
      // menuDataRender={menuDataRender}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
