import React from 'react';
import { Form, Input, Button, Upload, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  useAppSelector,
  useErrorMessage,
  useImageUpload,
  useSuccessMessage,
} from '../app/hooks';
import { useDispatch } from 'react-redux';
import {
  updateSucceedChanged,
  updateUser,
  updatingErrorChanged,
} from '../features/user/userSlice';
import { signingOutErrorChanged, signOut } from '../features/auth/authSlice';

export interface SettingsFormValues {
  name: string;
  department: string;
  group?: string;
}

export const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const isUpdating = useAppSelector((state) => state.user.isUpdating);
  const updateSucceed = useAppSelector((state) => state.user.updateSucceed);
  const updatingError = useAppSelector((state) => state.user.updatingError);
  const signingOutError = useAppSelector((state) => state.auth.signingOutError);

  useErrorMessage(signingOutError, signingOutErrorChanged);
  useErrorMessage(updatingError, updatingErrorChanged);
  useSuccessMessage('Зміни застосовані', updateSucceed, updateSucceedChanged);

  const dispatch = useDispatch();
  const { img, handleChange, beforeUpload, dummyRequest } = useImageUpload(
    user?.photo ?? null
  );

  const submitHandler = (values: SettingsFormValues) => {
    dispatch(updateUser({ ...values, photo: img }));
  };

  return (
    <div className="flex gap-5 ml-auto mr-auto self-center">
      <div>
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={dummyRequest}
          onChange={handleChange}
        >
          <Avatar size={200} shape="square" src={img} icon={<UserOutlined />} />
        </Upload>
      </div>

      <div className="w-96">
        <Form name="settings" onFinish={submitHandler}>
          <Form.Item
            name="name"
            initialValue={user?.name}
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть своє ім'я",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="П.І.Б." />
          </Form.Item>

          <Form.Item
            name="department"
            initialValue={user?.department}
            rules={[
              {
                required: true,
                message: 'Будь ласка, введіть назву вашої кафедри',
                whitespace: true,
              },
            ]}
          >
            <Input value={user?.department} placeholder="Ваша кафедра" />
          </Form.Item>

          {user?.status === 'student' && (
            <Form.Item
              name="group"
              rules={[
                {
                  required: true,
                  message: 'Будь ласка, введіть назву вашої групи',
                  whitespace: true,
                },
              ]}
              initialValue={user.group}
            >
              <Input placeholder="Ваша група" />
            </Form.Item>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Застосувати зміни
              </Button>

              <Button onClick={() => dispatch(signOut())}>
                Вийти з акаунту
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
