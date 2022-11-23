/**
 * 组件复用--render props
 */
import React, { MouseEvent, useState } from 'react';
import styles from './style.less';

type TClient = { x: number; y: number };
const Cat = ({ client }: any) => {
  return (
    <img
      src="/cat.jpg"
      style={{ position: 'absolute', left: client.x, top: client.y }}
    />
  );
};

const MouseTracker = ({ render }: any) => {
  const [client, setClient] = useState<TClient>({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent) => {
    setClient({ x: e.clientX, y: e.clientY });
  };
  return (
    <div className={styles.wrap} onMouseMove={handleMouseMove}>
      {/* 这里如何渲染其他内容 */}
      当前鼠标位置:{client.x}-{client.y}
      {render(client)}
    </div>
  );
};

export default () => {
  return (
    <>
      <h3>render Props</h3>
      <MouseTracker
        render={(client: TClient) => {
          return <Cat client={client} />;
        }}
      />
    </>
  );
};
