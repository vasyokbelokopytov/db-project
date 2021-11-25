import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Status, User } from '../app/types';
import { useAppSelector } from '../app/hooks';
import { Rule } from 'rc-field-form/lib/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/user/userSlice';

type FormValues = Partial<User>;

type Statuses = {
  [key in Status]: {
    name: string;
    selectValue: string;
    rules: Rule[];
    inputPlaceholder: string;
  };
};

const dummyRequest = ({ onSuccess }: UploadRequestOption<any>) => {
  setTimeout(() => {
    if (onSuccess) {
      onSuccess('ok');
    }
  }, 0);
};

function getBase64(
  img: RcFile | undefined,
  callback: (url: string | null) => void
) {
  const reader = new FileReader();
  reader.addEventListener('load', () =>
    callback(reader.result as string | null)
  );
  reader.readAsDataURL(img as Blob);
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Будь ласка, завантажте JPG або PNG файл!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Зображення має важити не більше 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(user?.photo ?? null);

  const submitHandler = (values: FormValues) => {
    dispatch(updateUser({ ...values, photo: imageUrl }));
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
      });
    }
  };

  const statuses: Statuses = {
    lecturer: {
      name: 'department',
      selectValue: 'Викладач',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої кафедри',
          whitespace: true,
        },
      ],
      inputPlaceholder: 'Ваша кафедра',
    },

    student: {
      name: 'group',
      selectValue: 'Студент',
      rules: [
        {
          required: true,
          message: 'Будь ласка, введіть назву вашої групи',
          whitespace: true,
        },
      ],
      inputPlaceholder: 'Ваша група',
    },
  };

  return (
    <div className="flex gap-5 ml-auto mr-auto self-center">
      <div className="">
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={dummyRequest}
          onChange={handleChange}
        >
          <Avatar
            size={200}
            shape="square"
            src={imageUrl}
            icon={<UserOutlined />}
          />
        </Upload>
      </div>

      <div className="w-96">
        <Form name="settings" onFinish={submitHandler}>
          <Form.Item
            name="name"
            initialValue={user?.name}
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
            initialValue={user ? statuses[user?.status].selectValue : ''}
          >
            <Select disabled></Select>
          </Form.Item>

          <Form.Item>
            <Input value={user?.faculty} placeholder="Ваш факультет" disabled />
          </Form.Item>

          <Form.Item
            name={user ? statuses[user.status].name : ''}
            rules={user ? statuses[user.status].rules : []}
            initialValue={
              user &&
              (user.status === 'lecturer'
                ? user.department
                : user.status === 'student'
                ? user.group
                : '')
            }
          >
            <Input
              placeholder={user ? statuses[user?.status].inputPlaceholder : ''}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Застосувати зміни
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
