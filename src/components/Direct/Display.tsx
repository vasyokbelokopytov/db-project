import { Avatar, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef } from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../features/direct/directSlice';

export const Display: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contact = useAppSelector((state) => state.direct.contact);
  const page = useAppSelector((state) => state.direct.lastPortion);
  const count = useAppSelector((state) => state.direct.count);
  const total = useAppSelector((state) => state.direct.total);
  const messages = useAppSelector((state) => state.direct.messages);
  const authUser = useAppSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const loadMoreMessages = useCallback(() => {
    if (!contact) return;

    dispatch(
      fetchMessages({
        id: contact.id,
        count,
        page: page + 1,
      })
    );
  }, [contact, count, dispatch, page]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      id="ScrollableMessages"
      className="flex-grow h-3/4 overflow-y-scroll"
    >
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
        <InfiniteScroll
          dataLength={page * count}
          next={loadMoreMessages}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          inverse={true} //
          hasMore={(total ?? 0) > messages?.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="ScrollableMessages"
        >
          <List
            className={`${
              !messages?.length && 'flex justify-center items-center'
            }`}
            dataSource={messages ? [...messages].reverse() : undefined}
            renderItem={(message) => (
              <List.Item key={message.id} className="bg-white rounded-sm mb-2">
                {message.authorId === contact?.id && (
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        src={contact.photo}
                      />
                    }
                    title={contact.name}
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
        </InfiniteScroll>
      </ConfigProvider>
    </div>
  );
};
