import React, { FunctionComponent, ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { useQuery } from '../../../hooks/useQuery';
import { RepositoryProvider } from '../../../contexts/repository/provider';
import { useFetchRepositories } from './useFetchRepositories';
import {
  initialState,
  setCursorAction,
  setHasNextPages,
  setRepositoriesAction,
} from '../../../../domain/repository/reducer';
import { Repository } from '../../../../domain/repository/model/repository';
import { REPOSITORIES_API_URL } from '../../../constants/apiUrls';

jest.mock('../../../hooks/useQuery', () => ({
  ...(jest.requireActual('../../../hooks/useQuery') as Record<string, unknown>),
  useQuery: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('../../../contexts/repository/provider', () => ({
  ...(jest.requireActual('../../../contexts/repository/provider') as Record<string, unknown>),
  useDispatch: () => mockDispatch,
}));

describe('useFetchRepositories hook', () => {
  const Wrapper: FunctionComponent<{ children: ReactElement }> = ({ children }) => (
    <RepositoryProvider>{children}</RepositoryProvider>
  );

  const repositories: Repository[] = [{ name: 'bar', forks: 2, stars: 4, url: '//github.com/foo/bar' }];
  const endCursor = 'cursor';
  const hasNextPage = true;

  test('should return method to fetch repositories', () => {
    const fetch = jest.fn();
    (useQuery as jest.Mock).mockReturnValue([undefined, fetch]);

    const { result } = renderHook(() => useFetchRepositories(), { wrapper: Wrapper });

    expect(result.current).toEqual(fetch);
  });

  test('should dispatch received data', async () => {
    (useQuery as jest.Mock).mockReturnValue([
      {
        search: {
          pageInfo: { endCursor, hasNextPage },
          repositories,
        },
      },
      jest.fn(),
    ]);
    const { result } = renderHook(() => useFetchRepositories(), { wrapper: Wrapper });
    await result.current();

    expect(useQuery).toHaveBeenCalledWith(
      REPOSITORIES_API_URL,
      expect.objectContaining({
        variables: {
          pageSize: initialState.metadata.pageSize,
          lastItem: initialState.metadata.endCursor,
          query: `${initialState.search} in:name sort:forks`,
        },
      }),
    );

    expect(mockDispatch).toHaveBeenCalledWith(setRepositoriesAction(repositories));
    expect(mockDispatch).toHaveBeenCalledWith(setCursorAction(endCursor));
    expect(mockDispatch).toHaveBeenCalledWith(setHasNextPages(hasNextPage));
  });
});
