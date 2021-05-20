import { useEffect } from 'react';
import { loader } from 'graphql.macro';
import { useDispatch, useSelector } from '../../../contexts/repository/provider';
import { selectEndCursor, selectPageSize, selectSearch } from '../../../../domain/repository/reducer/selectors';
import { useQuery } from '../../../hooks/useQuery';
import { REPOSITORIES_API_URL } from '../../../constants/apiUrls';
import { Repository } from '../../../../domain/repository/model/repository';
import {
  setCursorAction,
  setHasNextPagesAction,
  setIsLoadingAction,
  setRepositoriesAction,
} from '../../../../domain/repository/reducer';

type Response = {
  search: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    repositories: Repository[];
  };
};

export const useFetchRepositories = (): (() => Promise<void>) => {
  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize);
  const lastItem = useSelector(selectEndCursor);
  const search = useSelector(selectSearch);

  const query = loader('../../../../domain/repository/query/repositories.graphql');

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v4.idl',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  };

  const variables = {
    pageSize,
    lastItem,
    query: `${search} in:name sort:forks`,
  };

  const [results, fetch] = useQuery<Response>(REPOSITORIES_API_URL, {
    headers,
    variables,
    query: query.loc?.source.body as string,
  });

  useEffect(() => {
    if (!results) {
      return;
    }

    const {
      search: { pageInfo, repositories },
    } = results;

    dispatch(setRepositoriesAction(repositories));
    dispatch(setCursorAction(pageInfo.endCursor));
    dispatch(setHasNextPagesAction(pageInfo.hasNextPage));
  }, [results]);

  return () =>
    new Promise<void>(resolve => {
      dispatch(setIsLoadingAction(true));
      resolve();
    })
      .then(fetch)
      .finally(() => {
        dispatch(setIsLoadingAction(false));
      });
};
