import {
  Modal,
  Form,
  Input,
  Upload,
  Avatar,
  Select,
  Typography,
  Tag,
  Spin,
} from 'antd';
import CustomTagProps from 'rc-select/lib/generate';
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
  editingErrorChanged,
  editorClosed,
} from '../../features/channel/channelSlice';
import { Channel } from '../../app/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchUserContacts } from '../../features/user/userSlice';

const { Option } = Select;

type FormData = Channel & {
  members: { label: React.ReactNode; value: number }[];
};

export const EditChannelForm: React.FC = () => {
  const contacts = useAppSelector((state) => state.user.contacts);
  const channel = useAppSelector((state) => state.channel.channel);
  const isOpened = useAppSelector((state) => state.channel.isEditorOpened);
  const isLoading = useAppSelector((state) => state.channel.isEditing);
  const error = useAppSelector((state) => state.channel.editingError);
  const succeed = useAppSelector((state) => state.channel.editedSucceed);

  const totalContacts = useAppSelector((state) => state.user.contactsTotal);
  const isContactsFetching = useAppSelector(
    (state) => state.user.isContactsFetching
  );
  const contactsCount = useAppSelector((state) => state.user.contactsCount);
  const contactsPage = useAppSelector(
    (state) => state.user.contactsLastPortion
  );

  const { img, setImg, dummyRequest, beforeUpload, handleChange } =
    useImageUpload(channel ? channel.photo : null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useErrorMessage(error, editingErrorChanged);
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

  const scrollHandler = (e: React.UIEvent) => {
    const target = e.currentTarget;
    const scrollBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight;
    if (
      scrollBottom < 50 &&
      !isContactsFetching &&
      contactsCount * contactsPage < (totalContacts ?? 0)
    ) {
      dispatch(
        fetchUserContacts({
          count: contactsCount,
          portion: contactsPage + 1,
        })
      );
    }
  };

  const submitHandler = (formData: FormData) => {
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

          <Form.Item name="members" initialValue={channel?.members}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Виберіть учасників зі свого списку контактів"
              onPopupScroll={scrollHandler}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  {isContactsFetching && (
                    <div className="flex justify-center">
                      <Spin />
                    </div>
                  )}
                </div>
              )}
            >
              {contacts.map((c) => (
                <Option value={c.login} key={c.id}>
                  <Typography.Text>{c.login} </Typography.Text>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
