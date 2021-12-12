import { Avatar, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';

export const Display: React.FC = () => {
  const posts = useAppSelector((state) => state.channel.posts);
  const isFetching = useAppSelector((state) => state.channel.isPostFetching);

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              Канал наразі порожній.
              <br /> Напишіть першим!
            </span>
          }
        />
      )}
    >
      <List
        className={`flex-grow overflow-y-scroll ${
          !posts?.length && 'flex justify-center items-center'
        }`}
        loading={isFetching}
        dataSource={posts ?? undefined}
        renderItem={(item) => (
          <List.Item key={item.id} className="bg-white rounded-sm mb-2">
            <List.Item.Meta
              avatar={
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={item.author.photo}
                />
              }
              title={item.author.name}
              description={item.text}
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};
