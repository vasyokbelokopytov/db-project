import { Input, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchChannel } from '../../features/channel/channelSlice';

const { TextArea } = Input;

export const Form: React.FC = () => {
  return (
    <div className="w-full">
      <TextArea
        placeholder="Enter your message here..."
        autoSize={{
          maxRows: 6,
          minRows: 1,
        }}
      />
    </div>
  );
};
