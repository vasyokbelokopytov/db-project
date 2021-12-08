import React, { UIEvent } from 'react';

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

export const AsideChannels: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const channels = useAppSelector((state) => state.user.channels);
  const total = useAppSelector((state) => state.user.total);
  const count = useAppSelector((state) => state.user.count);
  const isFetching = useAppSelector((state) => state.user.isChannelsFetching);
  const error = useAppSelector((state) => state.user.channelsFetchingError);

  useErrorMessage(error, channelsFetchingErrorChanged);
  useLoading('Завантження каналів...', isFetching);

  const lastPortion = useAppSelector((state) => state.user.lastPortion);

  const scrollHandler = (e: UIEvent<HTMLElement>) => {
    if (!isFetching && (total === null || lastPortion * count < total)) {
      const scrollHeight = e.currentTarget.scrollHeight;
      const clientHeight = e.currentTarget.clientHeight;

      const top = e.currentTarget.scrollTop;
      let bottom = scrollHeight - top - clientHeight;
      if (bottom < 30) {
        dispatch(fetchUserChannels({ portion: lastPortion + 1, count }));
      }
    }
  };

  const openForm = () => {
    dispatch(creatorOpened());
  };

  return (
    <aside
      className="flex flex-col items-center bg-gray-100 overflow-y-scroll"
      onScroll={scrollHandler}
    >
      <AsideButton Icon={SearchOutlined} onClick={() => navigate('/search')} />
      <AsideButton Icon={PlusOutlined} onClick={openForm} />

      {channels
        .map((channel) => <AsideChannel key={channel.id} channel={channel} />)
        .reverse()}
    </aside>
  );
};
