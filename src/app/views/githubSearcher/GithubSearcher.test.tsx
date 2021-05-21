import React, { ComponentType, ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import { when } from 'jest-when';
import { GithubSearcher } from './GithubSearcher';
import { RepositoryProvider, useSelector } from '../../contexts/repository/provider';
import { useQuery } from '../../hooks/useQuery';
import { setPageSizeAction } from '../../../domain/repository/reducer';
import { selectIsLoading, selectPageSize, selectRepositories } from '../../../domain/repository/reducer/selectors';
import { Repository } from '../../../domain/repository/model/repository';

jest.mock('../../hooks/useQuery', () => ({
  ...jest.requireActual('../../hooks/useQuery'),
  useQuery: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('../../contexts/repository/provider', () => ({
  ...jest.requireActual('../../contexts/repository/provider'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('GithubSearcher view', () => {
  const wrapper: ComponentType = ({ children }) => <RepositoryProvider>{children as ReactElement}</RepositoryProvider>;

  const fetch = jest.fn();
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue([undefined, fetch]);
    when(useSelector as jest.Mock)
      .calledWith(selectRepositories)
      .mockReturnValue([])
      .calledWith(selectPageSize)
      .mockReturnValue(10);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('app should fetch data on first render and user should see loader during it', async () => {
    when(useSelector as jest.Mock)
      .calledWith(selectIsLoading)
      .mockReturnValueOnce(true);

    render(<GithubSearcher />, { wrapper });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(fetch).toHaveBeenCalled();
    });
  });

  test('user should be able to fetch more repositories by clicking on the button', async () => {
    render(<GithubSearcher />, { wrapper });
    userEvents.click(screen.getByRole('button', { name: /fetch more repositories/i }));
    userEvents.click(screen.getByRole('button', { name: /fetch more repositories/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  test('user should be able to change page size number', () => {
    render(<GithubSearcher />, { wrapper });
    userEvents.click(screen.getByLabelText(/page size/i));
    userEvents.click(screen.getByRole('option', { name: /20/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setPageSizeAction(20));
  });

  test('should show fetched data in the table', () => {
    const repo: Repository = { name: 'Foo', forks: 2, stars: 4, url: '//github.com' };
    when(useSelector as jest.Mock)
      .calledWith(selectRepositories)
      .mockReturnValue([repo]);

    render(<GithubSearcher />, { wrapper });

    expect(screen.getByRole('link', { name: /foo/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /4/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /2/i })).toBeInTheDocument();
  });
});
