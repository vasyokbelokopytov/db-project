import { Avatar, Button, Card, Result, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editorOpened,
  fetchChannel,
  postsChanged,
} from '../../features/channel/channelSlice';
import {
  fetchDirect,
  messagesChanged,
} from '../../features/direct/directSlice';
import { Display } from '../Direct/Display';
import { Field } from '../Direct/Field';

export const Direct: React.FC = () => {
  const direct = useAppSelector((state) => state.direct.direct);
  const isFetching = useAppSelector((state) => state.direct.isDirectFetching);
  const fetchingError = useAppSelector(
    (state) => state.direct.directFetchingError
  );

  const dispatch = useAppDispatch();

  const params = useParams();

  useEffect(() => {
    if (
      params.contactId &&
      (direct === null || +params.contactId !== direct.contact.id)
    ) {
      dispatch(messagesChanged(null));
      dispatch(fetchDirect(+params.contactId));
    }
  }, [params.contactId, direct, dispatch]);

  const clickHandler = () => {
    if (params.channelId) {
      dispatch(fetchDirect(+params.channelId));
    }
  };

  if (direct && !fetchingError && !isFetching)
    return (
      <Card
        title={
          <div className="flex gap-2 items-center">
            <Avatar
              src={direct.contact.photo}
              icon={<UserOutlined />}
              size={'large'}
            />
            <p>{direct.contact.name}</p>
          </div>
        }
        extra={<Typography.Link>Edit</Typography.Link>}
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
      {fetchingError && (
        <Result
          status="warning"
          title="Виникла помилка під час завантаження"
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
