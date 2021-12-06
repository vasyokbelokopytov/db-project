import { Modal, Form, Input, Upload, Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useErrorMessage,
  useImageUpload,
  useSuccessMessage,
} from '../../app/hooks';
import {
  editChannel,
  editedSucceedChanged,
  editorClosed,
} from '../../features/channel/channelSlice';
import { Channel } from '../../app/types';

export const EditChannelForm: React.FC = () => {
  const channel = useAppSelector((state) => state.channel.channel);
  const isOpened = useAppSelector((state) => state.channel.isEditorOpened);
  const isLoading = useAppSelector((state) => state.channel.isEditing);
  const error = useAppSelector((state) => state.channel.editingError);
  const succeed = useAppSelector((state) => state.channel.editedSucceed);

  const { img, setImg, dummyRequest, beforeUpload, handleChange } =
    useImageUpload(channel ? channel.photo : null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useErrorMessage(error, editedSucceedChanged);
  useSuccessMessage('Інформацію змінено', succeed, editedSucceedChanged);

  useEffect(() => {
    if (isOpened) {
      form.resetFields();
      setImg(channel ? channel.photo : null);
    }
  }, [isOpened, form, setImg, channel]);

  const close = () => {
    dispatch(editorClosed());
  };

  const okHandler = () => {
    form.submit();
  };

  const submitHandler = (formData: Channel) => {
    console.log(formData);

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
            initialValue={channel ? channel.name : ''}
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

          <Form.Item
            name="description"
            initialValue={channel ? channel.description : ''}
          >
            <Input placeholder="Опис каналу (не обов'язково)" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
