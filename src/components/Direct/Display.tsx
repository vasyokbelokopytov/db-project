import { Avatar, ConfigProvider, Empty, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../features/direct/directSlice';

export const Display: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bottomOffset, setBottomOffset] = useState(0);
  const contact = useAppSelector((state) => state.direct.contact);
  const page = useAppSelector((state) => state.direct.lastPortion);
  const count = useAppSelector((state) => state.direct.count);
  const total = useAppSelector((state) => state.direct.total);
  const messages = useAppSelector((state) => state.direct.messages);
  const isFetching = useAppSelector((state) => state.direct.isMessagesFetching);
  const authUser = useAppSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const loadMoreMessages = useCallback(() => {
    if (!contact) return;
    if ((total ?? 0) <= page * count) return;
    if (scrollRef.current && scrollRef.current.scrollTop < 120) {
      setBottomOffset(
        scrollRef.current.scrollHeight -
          scrollRef.current.scrollTop -
          scrollRef.current.clientHeight
      );
      dispatch(
        fetchMessages({
          id: contact.id,
          count,
          page: page + 1,
        })
      );
    }
  }, [contact, count, dispatch, page, total]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (
      scrollRef.current.scrollHeight > scrollRef.current.clientHeight &&
      scrollRef.current.scrollTop === 0
    ) {
      scrollRef.current.scrollTo({
        top:
          scrollRef.current.scrollHeight +
          scrollRef.current.clientHeight -
          bottomOffset,
      });
    }
  }, [scrollRef.current?.scrollHeight, bottomOffset]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (
      scrollRef.current.scrollHeight -
        scrollRef.current.scrollTop -
        scrollRef.current.clientHeight <
      100
    ) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
      });
    }
  });

  return (
    <div
      ref={scrollRef}
      id="ScrollableMessages"
      className="flex-grow h-3/4 overflow-y-scroll"
      onScroll={loadMoreMessages}
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
        <div className="flex justify-center">
          <Spin />
        </div>

        <List
          className={`${
            !messages?.length && 'flex justify-center items-center'
          }`}
          dataSource={messages ? messages : undefined}
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
      </ConfigProvider>
    </div>
  );
};
