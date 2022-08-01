import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { Button } from 'antd';

const Son = forwardRef((props, ref) => {
  const [message, setMessage] = useState(1);

  useImperativeHandle(ref, () => {
    return { handleChange };
  });
  const handleChange = () => {
    setMessage(message + 1);
  };
  return <div>{message}</div>;
});

const Father = () => {
  const sonref = useRef<any>(null);

  return (
    <div>
      <div> 我是父级的</div>
      <Button onClick={() => sonref.current?.handleChange()}>
        更改父级State
      </Button>
      <Son ref={sonref} />
    </div>
  );
};

export default Father;
