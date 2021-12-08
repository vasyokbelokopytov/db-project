import React from 'react';
import { Button } from 'antd';

import { AsideChannelsItem } from './AsideChannelsItem';

interface Props {
  Icon: React.ElementType;
  onClick: () => void;
}

export const AsideButton: React.FC<Props> = ({ Icon, onClick }) => {
  return (
    <AsideChannelsItem>
      <Button
        icon={<Icon className="text-2xl" />}
        shape="circle"
        className="w-12 h-12"
        onClick={onClick}
      />
    </AsideChannelsItem>
  );
};
