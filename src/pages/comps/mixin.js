import React, { useEffect } from 'react';

//mixin方法

const setMixin = (target, mixin) => {
  if (arguments[2]) {
    for (let i = 2, len = arguments.length; i < len; i++) {
      target.prototype[arguments[i]] = mixin.prototype[arguments[i]];
    }
  } else {
    for (const key in mixin.prototype) {
      if (!Object.hasOwnProperty.call(target.prototype, key)) {
        target.prototype[key] = mixin.prototype[key];
      }
    }
  }
};
setMixin(User, Log, 'actionLog');

// 实例:多个页面需要记录用户行为/性能指标等.在每个组件引入写日志的逻辑会产生大量重复代码.-->通过mixin实现

const LogMixin = {
  log: () => console.log('log'),
  componentDidMount: () => {
    console.log('in');
  },
  componentWillUnMount: () => {
    console.log('out');
  },
};

const User = React.createClass({
  mixins: [LogMixin],
  render: () => {
    return <></>;
  },
});

const Goods = React.createClass({
  mixins: [LogMixin],
  render: () => {
    return <>goods</>;
  },
});
