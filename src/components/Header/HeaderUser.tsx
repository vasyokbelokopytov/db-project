import React from 'react';

import { Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import Text from 'antd/lib/typography/Text';

export const HeaderUser: React.FC = () => {
  return (
    <div className="flex items-center gap-4 flex-none w-56 p-2">
      <div className="flex flex-grow items-center justify-end gap-2 overflow-hidden">
        <Avatar size={48} icon={<UserOutlined />} className="flex-none" />
        <Text strong className="truncate">
          zloykrecker
        </Text>
      </div>

      <Button
        className="flex-none"
        type="link"
        icon={<LogoutOutlined className="text-2xl" />}
      />
    </div>
  );
};
