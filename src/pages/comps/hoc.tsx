/**
 * 高级组件
 * 使用场景: 需要抽象出一个逻辑 在多个组件之间共享
 * 不修改传入的组件,而是将组件包装在容器中实现功能
 */

const globalData: number[] = [];

import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IHOC {
  (WrapComponet: () => JSX.Element, selectData?: () => void): (
    props: any,
  ) => ReactElement;
}

const withSubscription: IHOC = (WrapComponet, selectData) => (props) => {
  const [data, setData] = useState<number[]>([]);

  // 1.不改变传入组件  在包装容器中实现功能
  const check = (code: number): boolean => {
    return data.includes(code);
  };

  // 2. 透传与自身无关的props
  return <WrapComponet data={globalData} check={check} {...props} />;
};

// 反向继承-- 返回原组件的render

function withRender(WrapComponet: any) {
  return class extends WrapComponet {
    render() {
      return super.render();
    }
  };
}

const withRef: IHOC = (WrapComponet) => (props) => {
  const wrapRef = useRef<any>(null);
  useEffect(() => {
    wrapRef.current.log = () => {
      console.log('log');
    };
  }, []);

  return <WrapComponet ref={wrapRef} {...props} />;
};

const withStatus: IHOC = (WrapComponet) => (props) => {
  // 将value提取到HOC中进行管理,将其变成受控组件
  const [value, setValue] = useState<string>('');
  const onChange = (value: string) => {
    const { onChange } = props;
    setValue(() => {
      if (typeof onChange == 'function') {
        onChange(value);
      }
      return value;
    });
  };

  const restProps = {
    value,
    onChange,
  };
  return <WrapComponet {...props} {...restProps} />;
};

// 增强原组件元素
const withHiJack: IHOC = (WrapComponet) => (props) => {
  const [visible, setVisible] = useState(false);
  const newProps = {
    onClick: () => {
      setVisible(true);
    },
  };
  return (
    <>
      {React.Children.map(WrapComponet(), (child) =>
        React.cloneElement(child, { ...props, ...newProps }),
      )}
      {visible && (
        <div
          onClick={() => {
            setVisible(false);
          }}
        >
          原组件控制展示的部分
        </div>
      )}
    </>
  );
};

export default () => {
  return <></>;
};
