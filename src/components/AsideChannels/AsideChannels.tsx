import React, { useCallback, useEffect, useRef } from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { AsideChannel } from './AsideChannel';
import { AsideButton } from './AsideButton';
import {
  useAppDispatch,
  useAppSelector,
  useErrorMessage,
  useLoading,
} from '../../app/hooks';
import {
  channelsFetchingErrorChanged,
  fetchUserChannels,
} from '../../features/user/userSlice';
import { creatorOpened } from '../../features/channel/channelSlice';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

export const AsideChannels: React.FC = () => {
  const scrollRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const channels = useAppSelector((state) => state.user.channels);
  const total = useAppSelector((state) => state.user.channelsTotal);
  const count = useAppSelector((state) => state.user.channelsCount);
  const error = useAppSelector((state) => state.user.channelsFetchingError);

  useErrorMessage(error, channelsFetchingErrorChanged);

  const lastPortion = useAppSelector((state) => state.user.channelsLastPortion);

  const loadMoreChannels = useCallback(() => {
    dispatch(
      fetchUserChannels({
        count: count,
        portion: lastPortion + 1,
      })
    );
  }, [count, dispatch, lastPortion]);

  useEffect(() => {
    if (!scrollRef.current || channels.length >= (total ?? 0)) {
      return;
    }

    if (
      channels.length &&
      scrollRef.current.scrollHeight === scrollRef.current.clientHeight
    ) {
      loadMoreChannels();
    }
  }, [channels.length, loadMoreChannels, total]);

  const openForm = () => {
    dispatch(creatorOpened());
  };

  return (
    <aside
      id={'scrollableChannels'}
      ref={scrollRef}
      className="flex flex-col items-center bg-gray-100 overflow-y-auto"
    >
      <AsideButton Icon={SearchOutlined} onClick={() => navigate('/search')} />
      <AsideButton Icon={PlusOutlined} onClick={openForm} />

      <InfiniteScroll
        dataLength={channels.length || count * lastPortion}
        next={loadMoreChannels}
        hasMore={(total ?? 0) > channels.length}
        loader={
          <div className="w-full h-24 flex items-center justify-center">
            <Spin />
          </div>
        }
        scrollableTarget="scrollableChannels"
      >
        {channels
          .map((channel) => <AsideChannel key={channel.id} channel={channel} />)
          .reverse()}
      </InfiniteScroll>
    </aside>
  );
};
