import { Avatar, Button, Card, ConfigProvider, Empty, List } from 'antd';
import React, { useEffect } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers } from '../../features/search/searchSlice';
import {
  addContact,
  removeContact,
} from '../../features/contacts/contactSlice';

export const UserList: React.FC = () => {
  const users = useAppSelector((state) => state.search.users);
  const query = useAppSelector((state) => state.search.query);
  const count = useAppSelector((state) => state.search.count);
  const contact = useAppSelector((state) => state.search.contact);
  const page = useAppSelector((state) => state.search.page);
  const isFetching = useAppSelector((state) => state.search.isUsersFetching);
  const contactsInProcess = useAppSelector(
    (state) => state.contact.contactsInProcess
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ query, count, contact, page }));
  }, [query, count, contact, page, dispatch]);

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
            !users.length && 'flex justify-center items-center'
          }`}
          dataSource={users}
          loading={isFetching}
          renderItem={(item) => (
            <List.Item
              actions={
                item.contact === null
                  ? []
                  : [
                      item.contact === true ? (
                        <Button
                          loading={contactsInProcess.includes(item.id)}
                          danger
                          onClick={() => dispatch(removeContact(item.id))}
                        >
                          Видалити з контактів
                        </Button>
                      ) : (
                        <Button
                          loading={contactsInProcess.includes(item.id)}
                          onClick={() => dispatch(addContact(item.id))}
                        >
                          Додати у контакти
                        </Button>
                      ),
                    ]
              }
            >
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
