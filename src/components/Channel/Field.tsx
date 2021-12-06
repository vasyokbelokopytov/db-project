import { Form, Input, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchChannel } from '../../features/channel/channelSlice';
import { sendPost } from '../../features/post/postSlice';

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
      dispatch(sendPost(data.text));
    }
  };

  return (
    <div className="w-full">
      <Form name="post" form={form} onFinish={handleSubmit}>
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
