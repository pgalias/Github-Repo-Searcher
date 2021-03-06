import {
  setCursorAction,
  setRepositoriesAction,
  setPageSizeAction,
  setHasNextPagesAction,
  setIsLoadingAction,
} from './actions';
import { Types } from './types';
import { Repository } from '../model/repository';

describe('repositories actions', () => {
  test('setCursorAction should return proper object with type and passed payload', () => {
    expect(setCursorAction('abc')).toEqual({
      type: Types.SET_CURSOR,
      payload: 'abc',
    });
  });

  test('setRepositoriesAction should return proper object with type and passed payload', () => {
    const repos: Repository[] = [{ name: 'bar', forks: 2, stars: 4, url: '//github.com/foo/bar' }];
    expect(setRepositoriesAction(repos)).toEqual({
      type: Types.SET_REPOSITORIES,
      payload: repos,
    });
  });

  test('setPageSizeAction should return proper object with type and passed payload', () => {
    expect(setPageSizeAction(20)).toEqual({
      type: Types.SET_PAGE_SIZE,
      payload: 20,
    });
  });

  test('setHasNextPage should return proper object with type and passed payload', () => {
    expect(setHasNextPagesAction(true)).toEqual({
      type: Types.SET_HAS_NEXT_PAGE,
      payload: true,
    });
  });

  test('setIsLoading should return proper object with type and passed payload', () => {
    expect(setIsLoadingAction(true)).toEqual({
      type: Types.SET_IS_LOADING,
      payload: true,
    });
  });
});
