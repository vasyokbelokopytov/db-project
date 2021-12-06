import { Modal, Form, Input, Upload, Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useImageUpload,
  useErrorMessage,
  useSuccessMessage,
} from '../../app/hooks';
import {
  createChannel,
  creatorClosed,
  creationErrorChanged,
  createdSucceedChanged,
} from '../../features/channel/channelSlice';
import { Channel } from '../../app/types';

export const CreateChannelForm: React.FC = () => {
  const isOpened = useAppSelector((state) => state.channel.isCreatorOpened);
  const isLoading = useAppSelector((state) => state.channel.isCreating);
  const succeed = useAppSelector((state) => state.channel.createdSucceed);
  const error = useAppSelector((state) => state.channel.creationError);

  const { img, setImg, dummyRequest, beforeUpload, handleChange } =
    useImageUpload(null);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useErrorMessage(error, creationErrorChanged);
  useSuccessMessage('Канал створено', succeed, createdSucceedChanged);

  useEffect(() => {
    if (isOpened) {
      form.resetFields();
      setImg(null);
    }
  }, [form, isOpened, setImg]);

  const close = () => {
    dispatch(creatorClosed());
  };

  const okHandler = () => {
    form.submit();
  };

  const submitHandler = (formData: Channel) => {
    console.log(formData);

    dispatch(createChannel({ ...formData, photo: img }));
  };

  return (
    <Modal
      title="Створіть свій канал"
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
          name="createChannel"
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

          <Form.Item name="description" initialValue={null}>
            <Input placeholder="Опис каналу (не обов'язково)" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
