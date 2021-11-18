import React from 'react';

import { Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import Text from 'antd/lib/typography/Text';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

export const HeaderUser: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className="flex justify-end items-center gap-2 flex-none w-56 py-1 pl-1 pr-4">
      {isAuth && (
        <div className="flex flex-grow items-center gap-2 overflow-hidden">
          <Avatar size={48} icon={<UserOutlined />} className="flex-none" />
          <Text strong className="truncate">
            zloykrecker
          </Text>
        </div>
      )}

      <Button
        className="flex-none"
        type="link"
        icon={<LogoutOutlined className="text-2xl" />}
      />
    </div>
  );
};
