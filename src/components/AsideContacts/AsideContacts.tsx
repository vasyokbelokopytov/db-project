import { Avatar, List, ConfigProvider, Empty } from 'antd';
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
                  ? 'bg-blue-100 rounded-md cursor-pointer'
                  : 'cursor-pointer'
              }
              onClick={() => navigate(`chat/${item.id}`)}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.name}
                description={
                  <p className="truncate">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem doloribus non vel voluptatem aspernatur soluta esse
                    impedit, doloremque sequi quae nihil, quod excepturi magni
                    aut fuga aperiam quaerat temporibus debitis?
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
