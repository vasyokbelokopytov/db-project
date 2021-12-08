import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const { Option } = Select;

export const SearchForm: React.FC = () => {
  return (
    <Form>
      <Form.Item name="request">
        <Input placeholder="Пошук..." />
      </Form.Item>

      <Form.Item name="contact">
        <Space size="middle">
          <Select defaultValue={'null'} style={{ width: 150 }}>
            <Option value={'null'}>Всі</Option>
            <Option value={'true'}>Тільки контакти</Option>
            <Option value={'false'}>Тільки не контакти</Option>
          </Select>
          <Button type="primary">Шукати</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
