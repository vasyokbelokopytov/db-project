import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const AsideChannelsItem: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-18 flex justify-center items-center p-2">{children}</div>
  );
};
