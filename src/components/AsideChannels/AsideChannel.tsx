import React, { useEffect } from 'react';
import { Avatar, Tooltip } from 'antd';
import { AsideChannelsItem } from './AsideChannelsItem';
import { Link, useParams } from 'react-router-dom';
import { ChannelPreview } from '../../app/types';

interface Props {
  channel: ChannelPreview;
}

export const AsideChannel: React.FC<Props> = ({ channel }) => {
  const params = useParams();
  const channelId = params.channelId;

  useEffect(() => {
    console.log(params.channelId);
    console.log(channel.id);
  }, [params, channel]);

  return (
    <Link
      to={`channel/${channel.id}`}
      className={
        channelId && +channelId === channel.id ? 'bg-blue-100 rounded-lg' : ''
      }
    >
      <AsideChannelsItem>
        <Tooltip title={channel.name} placement="right">
          <Avatar size={48} src={channel.photo}>
            {channel.name[0].toUpperCase()}
          </Avatar>
        </Tooltip>
      </AsideChannelsItem>
    </Link>
  );
};
