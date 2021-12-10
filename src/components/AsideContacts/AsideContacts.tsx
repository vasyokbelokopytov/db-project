import { Avatar, List, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const AsideContacts: React.FC = () => {
  const contacts = useAppSelector((state) => state.contact.contacts);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  return (
    <aside className="flex-none w-56 border-l-2 p-2">
      <ConfigProvider
        renderEmpty={() => (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ви поки що не маєте контактів"
          />
        )}
      >
        <List
          className={`w-full h-full ${!contacts.length && 'flex items-center'}`}
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={(item) => (
            <List.Item
              className={
                userId && +userId === item.id
                  ? 'bg-blue-100 rounded-md cursor-pointer p-2'
                  : 'cursor-pointer p-2'
              }
              onClick={() => navigate(`chat/${item.id}`)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.photo}
                    icon={<UserOutlined />}
                    size="large"
                  />
                }
                title={<p className="truncate">{item.name}</p>}
                description={
                  <p className="truncate">
                    {item.status === 'student' &&
                      `Студент групи ${item.group} кафедри ${item.department}`}

                    {item.status === 'lecturer' &&
                      `Викладач кафедри ${item.department}`}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </aside>
  );
};
