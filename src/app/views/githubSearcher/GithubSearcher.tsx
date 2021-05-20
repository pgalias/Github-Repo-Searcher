import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from '../../contexts/repository/provider';
import { selectRepositories } from '../../../domain/repository/reducer/selectors';
import { useFetchRepositories } from './hooks/useFetchRepositories';

export const GithubSearcher: FunctionComponent = () => {
  const repositories = useSelector(selectRepositories);
  const fetch = useFetchRepositories();

  useEffect(() => {
    console.log(repositories, 'repositories');
  }, [repositories]);

  return (
    <div>
      <button type="button" onClick={fetch}>
        Fetch repos
      </button>
    </div>
  );
};
