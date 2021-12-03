import { Avatar, List, ConfigProvider, Empty } from 'antd';
import React from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

const data: { id: number; title: string }[] = [
  // {
  //   id: 1,
  //   title: 'me',
  // },
  // {
  //   id: 2,
  //   title: 'me',
  // },
  // {
  //   id: 3,
  //   title: 'me',
  // },
  // {
  //   id: 4,
  //   title: 'me',
  // },
  // {
  //   id: 5,
  //   title: 'me',
  // },
];

export const AsideContacts: React.FC = () => {
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
          className={`w-full h-full ${!data.length && 'flex items-center'}`}
          itemLayout="horizontal"
          dataSource={data}
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
                title={item.title}
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
