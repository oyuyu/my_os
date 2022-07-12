import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { Button } from 'antd';

const Son = (props, ref) => {
  useImperativeHandle(ref, () => {
    return { handleChange };
  });
  const handleChange = () => {};
  return <Button onClick={handleChange}>更改父级State</Button>;
};

const Father = () => {
  const sonref = useRef(null);
  const [message, setMessage] = useState('');

  return (
    <div>
      <div> 我是父级的:</div>
      <Son ref={sonref} />
    </div>
  );
};
