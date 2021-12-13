import { Avatar, List, ConfigProvider, Empty, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useErrorMessage } from '../../app/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { fetchUserContacts } from '../../features/user/userSlice';
import {
  addingErrorChanged,
  removingErrorChanged,
} from '../../features/contact/contactSlice';

export const AsideContacts: React.FC = () => {
  const scrollRef = useRef<HTMLElement>(null);
  const contacts = useAppSelector((state) => state.user.contacts);
  const contactsTotal = useAppSelector((state) => state.user.contactsTotal);
  const contactsCount = useAppSelector((state) => state.user.contactsCount);
  const contactPage = useAppSelector((state) => state.user.contactsLastPortion);
  const addingError = useAppSelector((state) => state.contact.addingError);
  const removingError = useAppSelector((state) => state.contact.removingError);

  useErrorMessage(addingError, addingErrorChanged);
  useErrorMessage(removingError, removingErrorChanged);

  const navigate = useNavigate();
  const params = useParams();
  const userId = params.contactId;

  const dispatch = useDispatch();

  const loadMoreContacts = useCallback(() => {
    dispatch(
      fetchUserContacts({
        count: contactsCount,
        portion: contactPage + 1,
      })
    );
  }, [contactPage, contactsCount, dispatch]);

  useEffect(() => {
    if (!scrollRef.current || contacts.length >= (contactsTotal ?? 0)) {
      return;
    }

    if (
      contacts.length &&
      scrollRef.current.scrollHeight === scrollRef.current.clientHeight
    ) {
      loadMoreContacts();
    }
  }, [contacts, contactsTotal, loadMoreContacts]);

  return (
    <aside
      className={`flex-none w-56 border-l-2 p-2 overflow-auto ${
        !contacts.length && 'flex items-center'
      }`}
      id="scrollableContacts"
      ref={scrollRef}
    >
      <ConfigProvider
        renderEmpty={() => (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ви поки що не маєте контактів"
          />
        )}
      >
        <InfiniteScroll
          dataLength={contactsCount * contactPage}
          next={loadMoreContacts}
          hasMore={(contactsTotal ?? 0) > contacts.length}
          loader={
            <div className="w-full h-14 flex items-center justify-center">
              <Spin />
            </div>
          }
          scrollableTarget="scrollableContacts"
        >
          <List
            className={`w-full h-full`}
            itemLayout="horizontal"
            dataSource={[...contacts].reverse()}
            renderItem={(item) => (
              <List.Item
                className={
                  userId && +userId === item.id
                    ? 'bg-blue-100 rounded-md cursor-pointer p-2'
                    : 'cursor-pointer p-2'
                }
                onClick={() => navigate(`direct/${item.id}`)}
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

                      {item.status === 'instructor' &&
                        `Викладач кафедри ${item.department}`}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </ConfigProvider>
    </aside>
  );
};
