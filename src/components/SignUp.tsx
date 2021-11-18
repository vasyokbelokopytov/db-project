import React, { useState } from 'react';

import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

type Status = 'lecturer' | 'student';

interface FormValuesBasic {
  login: string;
  password: string;
  name: string;
  status: Status;
  faculty: string;
}

interface StudentFormValues {
  group: string;
}

interface LecturerFormValues {
  department: string;
}

type FormValues = FormValuesBasic | StudentFormValues | LecturerFormValues;

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
    <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
          <Button type="link">Вхід</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
