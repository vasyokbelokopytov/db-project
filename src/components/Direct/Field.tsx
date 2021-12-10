import { Form, Input, Spin } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { sendMessage } from '../../features/message/messageSlice';

const { TextArea } = Input;

interface FormData {
  text: string;
}

export const Field: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const pressHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      form.submit();
    }
  };

  const handleSubmit = (data: FormData) => {
    form.resetFields();
    if (data.text.trim()) {
      dispatch(sendMessage(data.text));
    }
  };

  return (
    <div className="w-full">
      <Form name="message" form={form} onFinish={handleSubmit}>
        <Form.Item name="text" noStyle>
          <TextArea
            autoFocus
            placeholder="Enter your message here..."
            autoSize={{
              maxRows: 6,
              minRows: 1,
            }}
            onPressEnter={pressHandler}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
