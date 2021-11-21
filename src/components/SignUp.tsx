import React, { useState } from 'react';

import { Form, Input, Select, Button } from 'antd';
import { Status, User } from '../app/types';
import { Link } from 'react-router-dom';

const { Option } = Select;

type FormValues = User & { password: string };

export const SignUp: React.FC = () => {
  const [status, setStatus] = useState<Status | null>(null);

  const statuses = {
    lecturer: {
      name: 'department',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої кафедри',
          whitespace: true,
        },
      ],
      placeholder: 'Ваша кафедра',
    },

    student: {
      name: 'group',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої групи',
          whitespace: true,
        },
      ],
      placeholder: 'Ваша група',
    },
  };

  const statusChangeHandler = (value: Status) => {
    setStatus(value);
  };

  const submitHandler = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="w-96 ml-auto mr-auto self-center">
      <Form name="registration" onFinish={submitHandler}>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Будь ласка, введіть логін',
              whitespace: true,
            },

            {
              min: 4,
              message: 'Логін повинен бути не коротше за 4 символи',
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
            {
              min: 6,
              message: 'Пароль повинен бути не коротше за 6 символів',
            },
          ]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="name"
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
          rules={[
            { required: true, message: 'Будь ласка, оберіть свій статус' },
          ]}
        >
          <Select placeholder="Ваш статус" onChange={statusChangeHandler}>
            <Option value="student">Студент</Option>
            <Option value="lecturer">Викладач</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="faculty"
          rules={[
            {
              required: true,
              message: 'Будь ласка, введіть назву Вашого факультету',
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Ваш факультет" />
        </Form.Item>

        <Form.Item
          name={!status ? undefined : statuses[status].name}
          rules={!status ? [] : statuses[status].rules}
        >
          <Input
            disabled={!status}
            placeholder={!status ? '' : statuses[status].placeholder}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зареєструватися
          </Button>
          <Link to="/sign-in">
            <div className="inline-block text-blue-500 py-1 px-3 hover:text-blue-400 focus:text-blue-400">
              Вхід
            </div>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
