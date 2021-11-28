import React from 'react';

import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useRedirectFromAuth } from '../features/auth/hooks';
import { useAppSelector } from '../app/hooks';

type Status = 'lecturer' | 'student';

interface FormValues {
  login: string;
  password: string;
  name: string;
  status: Status;
  faculty: string;
}

export const SignIn: React.FC = () => {
  const isLoading = useAppSelector((state) => state.auth.isSigningIn);
  useRedirectFromAuth();
  const submitHandler = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="w-96 ml-auto mr-auto self-center">
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Війти
          </Button>
          <Link to="/sign-up">
            <div className="inline-block text-blue-500 py-1 px-3 hover:text-blue-400 focus:text-blue-400">
              Зареєструватися
            </div>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
