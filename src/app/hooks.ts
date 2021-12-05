import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { message } from 'antd';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useImageUpload = (url: any) => {
  const [img, setImg] = useState(url);

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImg(imageUrl);
      });
    }
  };

  const dummyRequest = ({ onSuccess }: UploadRequestOption<any>) => {
    setTimeout(() => {
      if (onSuccess) {
        onSuccess('ok');
      }
    }, 0);
  };

  const getBase64 = (
    img: RcFile | undefined,
    callback: (url: string | null) => void
  ) => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result as string | null)
    );
    reader.readAsDataURL(img as Blob);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Будь ласка, завантажте JPG або PNG файл!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Зображення має важити не більше 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return {
    img,
    setImg,
    handleChange,
    beforeUpload,
    dummyRequest,
  };
};

export const useErrorMessage = (
  error: string | null,
  removeAction?: ActionCreatorWithPayload<null | string>
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error) {
      message.error(error);
      if (removeAction) {
        dispatch(removeAction(null));
      }
    }
  }, [error, dispatch, removeAction]);
};
