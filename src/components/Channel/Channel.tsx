import { Button, Card, Result, Spin, Typography } from 'antd';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editorOpened,
  fetchChannel,
  lastPortionChanged,
  postsChanged,
  totalPostsChanged,
} from '../../features/channel/channelSlice';
import { Display } from './Display';
import { Field } from './Field';

export const Channel: React.FC = () => {
  const authId = useAppSelector((state) => state.auth.id);
  const channel = useAppSelector((state) => state.channel.channel);
  const isFetching = useAppSelector((state) => state.channel.isFetching);
  const fetchingError = useAppSelector((state) => state.channel.fetchingError);
  const postFetchingError = useAppSelector(
    (state) => state.channel.postFetchingError
  );

  const dispatch = useAppDispatch();

  const params = useParams();

  useEffect(() => {
    if (
      params.channelId &&
      (channel === null || +params.channelId !== channel.id)
    ) {
      dispatch(postsChanged(null));
      dispatch(totalPostsChanged(null));
      dispatch(lastPortionChanged(0));
      dispatch(fetchChannel(+params.channelId));
    }
  }, [params.channelId, channel, dispatch]);

  const openEditor = () => {
    dispatch(editorOpened());
  };

  const clickHandler = () => {
    if (params.channelId) {
      dispatch(fetchChannel(+params.channelId));
    }
  };

  if (channel && !fetchingError && !isFetching)
    return (
      <Card
        title={channel.name}
        extra={
          channel.creatorId === authId && (
            <Typography.Link onClick={openEditor}>Edit</Typography.Link>
          )
        }
        className="w-full h-full flex flex-col"
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
          height: '100%',
        }}
      >
        <Display />
        <Field />
      </Card>
    );

  return (
    <Card
      className="w-full h-full flex flex-col"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflowY: 'hidden',
        height: '100%',
      }}
    >
      {isFetching && !fetchingError && <Spin />}
      {(fetchingError || postFetchingError) && (
        <Result
          status="warning"
          title="Виникла помилка під час завантаження каналу"
          subTitle={fetchingError}
          extra={
            <Button type="primary" onClick={clickHandler} loading={isFetching}>
              Спробувати ще раз
            </Button>
          }
        />
      )}
    </Card>
  );
};
