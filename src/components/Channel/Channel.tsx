import { Card, Spin, Typography } from 'antd';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editorOpened,
  fetchChannel,
} from '../../features/channel/channelSlice';
import { Display } from './Display';
import { Form } from './Form';

export const Channel: React.FC = () => {
  const channel = useAppSelector((state) => state.channel.channel);
  const isLoading = useAppSelector((state) => state.channel.isFetching);
  const error = useAppSelector((state) => state.channel.error);

  const dispatch = useAppDispatch();

  const params = useParams();

  useEffect(() => {
    if (params.channelId) {
      dispatch(fetchChannel(+params.channelId));
    }
  }, [params, dispatch]);

  const openEditor = () => {
    dispatch(editorOpened());
  };

  if (isLoading) return <Spin />;

  if (!params.channelId) {
    return <div className="">404</div>;
  }

  if (channel)
    return (
      <Card
        title={channel.name}
        extra={<Typography.Link onClick={openEditor}>Edit</Typography.Link>}
        className="w-full h-full flex flex-col"
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden',
          height: '100%',
        }}
      >
        <Display />
        <Form />
      </Card>
    );

  return <div>{error}</div>;
};
