import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select;

interface Props {
  onSubmit: ({ contact, query }: SearchFormData) => void;
}

export interface SearchFormData {
  query: string;
  contact: 'null' | 'true' | 'false';
}

export const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  const query = useAppSelector((state) => state.search.query);
  const contact = useAppSelector((state) => state.search.contact);
  const isFetching = useAppSelector((state) => state.search.isUsersFetching);

  const [form] = useForm();

  useEffect(() => {
    form.resetFields();
  }, [form, query]);

  return (
    <Form name="search" form={form} onFinish={onSubmit}>
      <Form.Item name="query" initialValue={query ?? ''}>
        <Input placeholder="Пошук..." />
      </Form.Item>

      <Space size="middle" className="mb-6">
        <Form.Item name="contact" initialValue={String(contact)} noStyle>
          <Select style={{ width: 150 }}>
            <Option value={'null'}>Всі</Option>
            <Option value={'true'}>Тільки контакти</Option>
            <Option value={'false'}>Тільки не контакти</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Шукати
        </Button>
      </Space>
    </Form>
  );
};
