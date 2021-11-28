import { Modal, Form, Input, Upload, Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useImageUpload,
} from '../../app/hooks';
import {
  createChannel,
  editChannel,
  editorClosed,
} from '../../features/channel/channelSlice';

interface FormData {
  name: string;
}

export const EditChannelForm: React.FC = () => {
  const channel = useAppSelector((state) => state.channel.channel);
  const isOpened = useAppSelector((state) => state.channel.isEditorOpened);
  const isLoading = useAppSelector((state) => state.channel.isEditing);

  const { img, setImg, dummyRequest, beforeUpload, handleChange } =
    useImageUpload(channel ? channel.photo : null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(editorClosed());
  };

  const okHandler = () => {
    form.submit();
  };

  const submitHandler = (formData: FormData) => {
    if (channel) {
      dispatch(
        editChannel({
          ...channel,
          ...formData,
          photo: img,
        })
      );
    }
  };

  return (
    <Modal
      title="Налаштування каналу"
      centered
      visible={isOpened}
      onOk={okHandler}
      onCancel={close}
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      width={800}
    >
      <div className="flex gap-5">
        <Upload
          name="channel"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={dummyRequest}
          onChange={handleChange}
        >
          <Avatar
            size={200}
            shape="square"
            src={img}
            icon={<MessageOutlined />}
          />
        </Upload>
        <Form
          form={form}
          name="editChannel"
          onFinish={submitHandler}
          className="flex-grow"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Будь ласка, введіть назву каналу',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Назва каналу" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
