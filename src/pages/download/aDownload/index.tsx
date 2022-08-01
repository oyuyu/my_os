import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <div>A标签下载</div>
      <br />
      <img id="mergedPic" src="http://via.placeholder.com/256" />

      <Button type="primary" onClick={}>
        下载图片
      </Button>
    </div>
  );
};
