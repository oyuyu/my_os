import React from 'react';

// cloneElement 传参数给子路由
export default ({ children }: any) => {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child as JSX.Element, { foo: 'bar' });
  });
};
