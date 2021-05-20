import {
  selectRepositories,
  selectMetadata,
  selectEndCursor,
  selectHasNextPage,
  selectPageSize,
  selectSearch,
  selectIsLoading,
} from './selectors';
import { initialState, Metadata, State } from './index';
import { Repository } from '../model/repository';

describe('repository context selectors', () => {
  const repositories: Repository[] = [{ name: 'bar', forks: 2, stars: 4, url: '//github.com/foo/bar' }];
  const metadata: Metadata = {
    pageSize: 40,
    hasNextPage: true,
    endCursor: 'abc',
  };

  let state: State;
  beforeEach(() => {
    state = { ...initialState, isLoading: true, repositories, metadata, search: 'foo' };
  });

  test('selectRepositories should return all repositories from the store', () => {
    expect(selectRepositories(state)).toEqual(repositories);
  });

  test('selectMetadata should return metadata object from the store', () => {
    expect(selectMetadata(state)).toEqual(metadata);
  });

  test('selectEndCursor should return current end cursor from the store', () => {
    expect(selectEndCursor(state)).toBe(metadata.endCursor);
  });

  test('selectPageSize should return page size from the store', () => {
    expect(selectPageSize(state)).toBe(metadata.pageSize);
  });

  test('selectHasNextPage should return has next page information from the store', () => {
    expect(selectHasNextPage(state)).toBe(metadata.hasNextPage);
  });

  test('selectSearch should return search from the store', () => {
    expect(selectSearch(state)).toBe('foo');
  });

  test('selectIsLoading should return isLoading from the store', () => {
    expect(selectIsLoading(state)).toBe(true);
  });
});
