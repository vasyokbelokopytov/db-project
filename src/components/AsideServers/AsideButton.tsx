import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { AsideServersItem } from './AsideServersItem';

export const AsideButton: React.FC = () => {
  return (
    <AsideServersItem>
      <Button
        icon={<PlusOutlined className="text-2xl" />}
        shape="circle"
        className="w-12 h-12"
      />
    </AsideServersItem>
  );
};
