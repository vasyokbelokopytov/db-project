import React from 'react';

import { Form, Input, Button } from 'antd';

type Status = 'lecturer' | 'student';

interface FormValues {
  login: string;
  password: string;
  name: string;
  status: Status;
  faculty: string;
}

export const SignIn: React.FC = () => {
  const submitHandler = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Form name="login" onFinish={submitHandler}>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Будь ласка, введіть логін',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Логін" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Будь ласка, введіть пароль',
              whitespace: true,
            },
          ]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Війти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
