import { Avatar, Button, Card, ConfigProvider, Empty, List } from 'antd';
import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { User, WithId, WithPhoto } from '../../app/types';

const data = [
  {
    id: 1,
    department: 'boroda',
    login: 'vfcsdcscdckj',
    name: 'vfvf',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 2,
    department: 'borffoda',
    login: 'vfckj',
    name: 'vfvbvf',
    photo: null,
    status: 'student',
    group: 'cx',
  },
  {
    id: 3,
    department: 'boroda123',
    login: 'vfckjtra',
    name: 'vfvfaaa',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 1,
    department: 'boroda',
    login: 'vfcsdcscdckj',
    name: 'vfvf',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 2,
    department: 'borffoda',
    login: 'vfckj',
    name: 'vfvbvf',
    photo: null,
    status: 'student',
    group: 'cx',
  },
  {
    id: 3,
    department: 'boroda123',
    login: 'vfckjtra',
    name: 'vfvfaaa',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 1,
    department: 'boroda',
    login: 'vfcsdcscdckj',
    name: 'vfvf',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 2,
    department: 'borffoda',
    login: 'vfckj',
    name: 'vfvbvf',
    photo: null,
    status: 'student',
    group: 'cx',
  },
  {
    id: 3,
    department: 'boroda123',
    login: 'vfckjtra',
    name: 'vfvfaaa',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 1,
    department: 'boroda',
    login: 'vfcsdcscdckj',
    name: 'vfvf',
    photo: null,
    status: 'lecturer',
  },
  {
    id: 2,
    department: 'borffoda',
    login: 'vfckj',
    name: 'vfvbvf',
    photo: null,
    status: 'student',
    group: 'cx',
  },
  {
    id: 3,
    department: 'boroda123',
    login: 'vfckjtra',
    name: 'vfvfaaa',
    photo: null,
    status: 'lecturer',
  },
];

const data1: (User & WithId & WithPhoto)[] = [];

export const UserList: React.FC = () => {
  return (
    <Card
      className="w-full h-3/4 flex-grow mb-6"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        height: '100%',
      }}
    >
      <ConfigProvider
        renderEmpty={() => (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Користувачі не знайдені</span>}
          />
        )}
      >
        <List
          className={`overflow-y-scroll h-full ${
            !data1.length && 'flex justify-center items-center'
          }`}
          dataSource={data1}
          renderItem={(item) => (
            <List.Item actions={[<Button>Додати у контакти</Button>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.photo} icon={<UserOutlined />} />}
                title={item.name}
                description={
                  <div>
                    {item.status === 'student' &&
                      `Студент групи ${item.group} кафедри ${item.department}`}

                    {item.status === 'lecturer' &&
                      `Викладач кафедри ${item.department}`}
                  </div>
                }
              />
            </List.Item>
          )}
        ></List>
      </ConfigProvider>
    </Card>
  );
};
