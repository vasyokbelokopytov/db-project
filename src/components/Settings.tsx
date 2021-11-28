import React from 'react';
import { Form, Input, Select, Button, Upload, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Status, User } from '../app/types';
import { useAppSelector, useImageUpload } from '../app/hooks';
import { Rule } from 'rc-field-form/lib/interface';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';

type FormValues = Partial<User>;

type Statuses = {
  [key in Status]: {
    name: string;
    selectValue: string;
    rules: Rule[];
    inputPlaceholder: string;
  };
};

export const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const isLoading = useAppSelector((state) => state.user.isUserUpdating);

  const dispatch = useDispatch();
  const { img, handleChange, beforeUpload, dummyRequest } = useImageUpload(
    user?.photo ?? null
  );

  const submitHandler = (values: FormValues) => {
    dispatch(updateUser({ ...values, photo: img }));
  };

  const statuses: Statuses = {
    lecturer: {
      name: 'department',
      selectValue: 'Викладач',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої кафедри',
          whitespace: true,
        },
      ],
      inputPlaceholder: 'Ваша кафедра',
    },

    student: {
      name: 'group',
      selectValue: 'Студент',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої групи',
          whitespace: true,
        },
      ],
      inputPlaceholder: 'Ваша група',
    },
  };

  return (
    <div className="flex gap-5 ml-auto mr-auto self-center">
      <div className="">
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
            name="status"
            initialValue={user ? statuses[user?.status].selectValue : ''}
          >
            <Select disabled></Select>
          </Form.Item>

          <Form.Item>
            <Input value={user?.faculty} placeholder="Ваш факультет" disabled />
          </Form.Item>

          <Form.Item
            name={user ? statuses[user.status].name : ''}
            rules={user ? statuses[user.status].rules : []}
            initialValue={
              user &&
              (user.status === 'lecturer'
                ? user.department
                : user.status === 'student'
                ? user.group
                : '')
            }
          >
            <Input
              placeholder={user ? statuses[user?.status].inputPlaceholder : ''}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Застосувати зміни
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
