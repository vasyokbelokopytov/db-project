import React from 'react';
import { Avatar } from 'antd';
import { AsideServersItem } from './AsideServersItem';

export const AsideServer: React.FC = () => {
  return (
    <AsideServersItem>
      <Avatar size={48}>U</Avatar>
    </AsideServersItem>
  );
};
