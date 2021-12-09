import { Pagination, Space } from 'antd';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  contactChanged,
  countChanged,
  pageChanged,
  queryChanged,
} from '../../features/search/searchSlice';
import { SearchForm, SearchFormData } from './SearchForm';
import { UserList } from './UserList';

export const Search: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const total = useAppSelector((state) => state.search.total);
  const query = useAppSelector((state) => state.search.query);
  const contact = useAppSelector((state) => state.search.contact);
  const page = useAppSelector((state) => state.search.page);
  const count = useAppSelector((state) => state.search.count);
  const dispatch = useAppDispatch();

  const queryParam = params.get('query');
  const contactParam = params.get('contact');
  const pageParam = params.get('page');
  const countParam = params.get('count');

  useEffect(() => {
    dispatch(queryChanged(queryParam));
    dispatch(
      contactChanged(
        contactParam === 'false' ? false : contactParam === 'true' ? true : null
      )
    );

    if (!isNaN(Number(pageParam)) && Number(pageParam) > 0) {
      dispatch(pageChanged(Number(pageParam)));
    }

    if (!isNaN(Number(countParam)) && Number(countParam) > 0) {
      dispatch(countChanged(Number(countParam)));
    }
  }, [contactParam, countParam, dispatch, pageParam, queryParam]);

  const submitHandler = (data: SearchFormData) => {
    console.log(count);

    if (data.contact === 'null') {
      setParams({
        query: data.query,
        page: '1',
        count: String(count),
      });
      return;
    }

    setParams({
      query: data.query,
      contact: data.contact,
      page: '1',
      count: String(count),
    });
  };

  const paginationChangeHandler = (page: number, pageSize: number) => {
    if (contact === null) {
      setParams({
        query,
        page: String(page),
        count: String(pageSize),
      });
      return;
    }

    setParams({
      query,
      contact: String(contact),
      page: String(page),
      count: String(pageSize),
    });
  };

  return (
    <section className="w-full h-full flex flex-col">
      <SearchForm onSubmit={submitHandler} />
      <UserList />
      <Pagination
        current={page}
        total={total ?? 0}
        pageSize={count}
        showSizeChanger
        pageSizeOptions={['5', '10', '20']}
        onChange={paginationChangeHandler}
        className="self-center"
      />
    </section>
  );
};
