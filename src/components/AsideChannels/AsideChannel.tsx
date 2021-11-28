import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { AsideChannelsItem } from './AsideChannelsItem';
import { NavLink } from 'react-router-dom';
import { ChannelPreview } from '../../app/types';

interface Props {
  channel: ChannelPreview;
}

export const AsideChannel: React.FC<Props> = ({ channel }) => {
  return (
    <NavLink
      to={`channel/${channel.id}`}
      className={({ isActive }) => (isActive ? 'bg-blue-200 rounded-lg' : '')}
    >
      <AsideChannelsItem>
        <Tooltip title={channel.name} placement="right">
          <Avatar size={48} src={channel.photo}>
            {channel.name[0].toUpperCase()}
          </Avatar>
        </Tooltip>
      </AsideChannelsItem>
    </NavLink>
  );
};
