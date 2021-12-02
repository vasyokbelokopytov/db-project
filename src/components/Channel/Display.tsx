import { Avatar } from 'antd';
import React from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';

export const Display: React.FC = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  return (
    <List
      className="flex-grow overflow-y-scroll"
      dataSource={posts ?? undefined}
      renderItem={(item) => (
        <List.Item key={item.id} className="bg-white rounded-sm mb-2">
          <List.Item.Meta
            avatar={<Avatar />}
            title={item.authorId}
            description={item.text}
          />
        </List.Item>
      )}
    />
  );
};
