import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { AsideChannelsItem } from './AsideChannelsItem';
import { useAppDispatch } from '../../app/hooks';
import { creatorOpened } from '../../features/channel/channelSlice';

export const AsideButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const openForm = () => {
    dispatch(creatorOpened());
  };

  return (
    <AsideChannelsItem>
      <Button
        icon={<PlusOutlined className="text-2xl" />}
        shape="circle"
        className="w-12 h-12"
        onClick={openForm}
      />
    </AsideChannelsItem>
  );
};
