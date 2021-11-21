import React from 'react';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Text from 'antd/lib/typography/Text';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

export const HeaderUser: React.FC = () => {
  const authUser = useAppSelector((state) => state.user.user);

  return (
    <div className="flex items-center gap-2 flex-none w-56 py-1 pl-1 pr-4">
      {authUser && (
        <Link to="/settings">
          <div className="flex flex-grow items-center gap-2 overflow-hidden group">
            <Avatar
              size={48}
              icon={<UserOutlined />}
              src={authUser.photo}
              className="flex-none"
            />
            <Text
              strong
              className="text-base truncate group-hover:text-blue-400"
            >
              {authUser.login}
            </Text>
          </div>
        </Link>
      )}
    </div>
  );
};
