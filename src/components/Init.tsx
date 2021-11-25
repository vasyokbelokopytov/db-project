import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Init: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spin
        size="large"
        tip={<span className="text-lg">Loading app . . .</span>}
      />
    </div>
  );
};
