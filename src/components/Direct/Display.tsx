import { Avatar, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';

export const Display: React.FC = () => {
  const direct = useAppSelector((state) => state.direct.direct);
  const messages = useAppSelector((state) => state.direct.messages);
  const authUser = useAppSelector((state) => state.user.user);

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              Директ наразі порожній.
              <br /> Напишіть першим!
            </span>
          }
        />
      )}
    >
      <List
        className={`flex-grow overflow-y-scroll ${
          !messages?.length && 'flex justify-center items-center'
        }`}
        dataSource={messages ?? undefined}
        renderItem={(message) => (
          <List.Item key={message.id} className="bg-white rounded-sm mb-2">
            {message.id === direct?.contact.id && (
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={direct.contact.photo}
                  />
                }
                title={direct.contact.name}
                description={message.text}
              />
            )}

            {message.authorId === authUser?.id && (
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={authUser.photo}
                  />
                }
                title={authUser.name}
                description={message.text}
              />
            )}
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};
