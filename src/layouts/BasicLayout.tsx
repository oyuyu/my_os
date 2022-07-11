/**
 * @页面基础布局
 */
import React from 'react';
import { ProLayout } from '@ant-design/pro-layout';
import { Link } from 'umi';

const BasicLayout: React.FC = ({ children }: any) => {
  return (
    <ProLayout
      menuItemRender={(menuItemProps, defaultDom) => {
        console.log(menuItemProps.isUrl, menuItemProps.children);

        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{menuItemProps.name}</Link>;
      }}
      breadcrumbRender={(routers = []) => [...routers]}
    >
      {children}
    </ProLayout>
  );
};
