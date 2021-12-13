import { Avatar, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { List } from 'antd';
import { useAppSelector, useErrorMessage } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../features/direct/directSlice';
import { fetchingErrorChanged } from '../../features/search/searchSlice';

export const Display: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bottomOffset, setBottomOffset] = useState(0);
  const contact = useAppSelector((state) => state.direct.contact);
  const page = useAppSelector((state) => state.direct.lastPortion);
  const count = useAppSelector((state) => state.direct.count);
  const total = useAppSelector((state) => state.direct.total);
  const messages = useAppSelector((state) => state.direct.messages);
  const isFetching = useAppSelector((state) => state.direct.isMessagesFetching);
  const fetchingError = useAppSelector((state) => state.message.sendingError);
  const authUser = useAppSelector((state) => state.user.user);

  useErrorMessage(fetchingError, fetchingErrorChanged);

  const dispatch = useDispatch();

  const loadMoreMessages = () => {
    if (!contact) return;
    if ((total ?? 0) <= page * count) return;
    if (scrollRef.current && scrollRef.current.scrollTop < 120 && !isFetching) {
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
  };

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
        <List
          className={`${
            !messages?.length && 'flex justify-center items-center'
          }`}
          dataSource={messages ? messages : undefined}
          loading={isFetching}
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
