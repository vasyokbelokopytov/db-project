import { Avatar, Button, Card, Result, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  fetchContact,
  messagesChanged,
  messageslastPortionChanged,
} from '../../features/direct/directSlice';
import { Display } from '../Direct/Display';
import { Field } from '../Direct/Field';

export const Direct: React.FC = () => {
  const contact = useAppSelector((state) => state.direct.contact);
  const isFetching = useAppSelector((state) => state.direct.isContactFetching);
  const fetchingError = useAppSelector(
    (state) => state.direct.contactFetchingError
  );
  const messagesFetchingError = useAppSelector(
    (state) => state.direct.messagesFetchingError
  );

  const dispatch = useAppDispatch();

  const params = useParams();

  useEffect(() => {
    if (
      params.contactId &&
      (contact === null || +params.contactId !== contact.id)
    ) {
      dispatch(messagesChanged(null));
      dispatch(messageslastPortionChanged(0));
      dispatch(fetchContact(+params.contactId));
    }
  }, [params.contactId, dispatch, contact]);

  const clickHandler = () => {
    if (params.channelId) {
      dispatch(fetchContact(+params.channelId));
    }
  };

  if (contact && !fetchingError && !isFetching)
    return (
      <Card
        title={
          <div className="flex gap-2 items-center">
            <Avatar
              src={contact.photo}
              icon={<UserOutlined />}
              size={'large'}
            />
            <p>{contact.name}</p>
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
      {(fetchingError || messagesFetchingError) && (
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
