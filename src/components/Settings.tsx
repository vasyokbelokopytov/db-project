import React from 'react';
import { Form, Input, Button, Upload, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector, useImageUpload } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import { signOut } from '../features/auth/authSlice';

export interface SettingsFormValues {
  name: string;
  department: string;
  group?: string;
}

export const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const isLoading = useAppSelector((state) => state.user.isUserUpdating);

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
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
