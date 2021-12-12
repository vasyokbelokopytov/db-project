import { Pagination } from 'antd';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  useErrorMessage,
} from '../../app/hooks';
import {
  contactChanged,
  countChanged,
  fetchingErrorChanged,
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
  const isFetching = useAppSelector((state) => state.search.isUsersFetching);
  const fethingError = useAppSelector((state) => state.search.fetchingError);
  useErrorMessage(fethingError, fetchingErrorChanged);
  const dispatch = useAppDispatch();

  const queryParam = params.get('query');
  const contactParam = params.get('contact');
  const pageParam = params.get('page');
  const countParam = params.get('count');

  useEffect(() => {
    dispatch(queryChanged(!queryParam ? '' : queryParam));

    if (contactParam && ['0', '1', '2'].includes(contactParam)) {
      dispatch(contactChanged(contactParam));
    }

    if (!isNaN(Number(pageParam)) && Number(pageParam) > 0) {
      dispatch(pageChanged(Number(pageParam)));
    }

    if (!isNaN(Number(countParam)) && Number(countParam) > 0) {
      dispatch(countChanged(Number(countParam)));
    }
  }, [contactParam, countParam, dispatch, pageParam, queryParam]);

  const submitHandler = (data: SearchFormData) => {
    if (data.query) {
      params.set('query', data.query);
    } else {
      params.delete('query');
    }

    params.set('contact', data.contact);
    params.set('page', '1');
    params.set('count', String(count));

    setParams(params);
  };

  const paginationChangeHandler = (newPage: number, newCount: number) => {
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    params.set('contact', contact);

    if (page !== newPage) {
      params.set('page', String(newPage));
    } else if (count !== newCount) {
      params.set('page', '1');
    }

    params.set('count', String(newCount));
    setParams(params);
  };

  return (
    <section className="w-full h-full flex flex-col">
      <SearchForm onSubmit={submitHandler} />
      <UserList />
      <Pagination
        disabled={isFetching}
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
