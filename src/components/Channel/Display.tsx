import { Avatar, ConfigProvider, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from 'react';
import { List } from 'antd';
import {
  useAppSelector,
  useAppDispatch,
  useErrorMessage,
} from '../../app/hooks';
import { fetchPosts } from '../../features/channel/channelSlice';
import { sendingErrorChanged } from '../../features/post/postSlice';

export const Display: React.FC = () => {
  const [bottomOffset, setBottomOffset] = useState(0);
  const posts = useAppSelector((state) => state.channel.posts);
  const total = useAppSelector((state) => state.channel.totalPosts);
  const channel = useAppSelector((state) => state.channel.channel);
  const page = useAppSelector((state) => state.channel.lastPortion);
  const count = useAppSelector((state) => state.channel.count);
  const isFetching = useAppSelector((state) => state.channel.isPostFetching);
  const sendingError = useAppSelector((state) => state.message.sendingError);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useErrorMessage(sendingError, sendingErrorChanged);

  const loadMorePosts = () => {
    if (!channel) return;
    if ((total ?? 0) <= page * count) return;
    if (scrollRef.current && scrollRef.current.scrollTop < 120 && !isFetching) {
      setBottomOffset(
        scrollRef.current.scrollHeight -
          scrollRef.current.scrollTop -
          scrollRef.current.clientHeight
      );
      dispatch(
        fetchPosts({
          id: channel.id,
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
      className="flex-grow h-3/4 overflow-y-scroll"
      onScroll={loadMorePosts}
    >
      <ConfigProvider
        renderEmpty={() => (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                Канал наразі порожній.
                <br /> Напишіть першим!
              </span>
            }
          />
        )}
      >
        <List
          className={`${!posts?.length && 'flex justify-center items-center'}`}
          loading={isFetching}
          dataSource={posts ?? undefined}
          renderItem={(item) => (
            <List.Item key={item.id} className="bg-white rounded-sm mb-2">
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={item.author.photo}
                  />
                }
                title={item.author.name}
                description={item.text}
              />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </div>
  );
};
