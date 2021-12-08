import { Pagination, Space } from 'antd';
import React from 'react';
import { SearchForm } from './SearchForm';
import { UserList } from './UserList';

export const Search: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col">
      <SearchForm />
      <UserList />
      <Pagination defaultCurrent={6} total={500} className="self-center" />
    </section>
  );
};
