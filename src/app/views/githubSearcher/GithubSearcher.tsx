import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from '../../contexts/repository/provider';
import { selectPageSize } from '../../../domain/repository/reducer/selectors';
import { useFetchRepositories } from './hooks/useFetchRepositories';
import { DataTable } from './components/dataTable';
import { Fetcher } from './components/fetcher';

export const GithubSearcher: FunctionComponent = () => {
  const pageSize = useSelector(selectPageSize);
  const fetch = useFetchRepositories();

  useEffect(() => {
    fetch();
  }, [pageSize]);

  return (
    <section>
      <DataTable />
      <Fetcher />
    </section>
  );
};
