import { reducer } from './reducer';
import { Action, setCursorAction, setHasNextPages, setPageSizeAction, setRepositoriesAction } from './actions';
import { Repository } from '../model/repository';
import { initialState, State } from './state';

describe('repository reducer', () => {
  let state: State;
  beforeEach(() => {
    state = initialState;
  });

  test('should merge current state with payload from setRepositoriesAction', () => {
    const repos: Repository[] = [{ name: 'bar', stars: 4, forks: 2, url: '//github.com/foo/bar' }];
    const action = setRepositoriesAction(repos);

    expect(reducer(state, action)).toEqual({
      ...state,
      repositories: repos,
    });
  });

  test('should merge current state with payload from setCursorAction', () => {
    const action = setCursorAction('abc');

    expect(reducer(state, action)).toEqual({
      ...state,
      metadata: {
        ...state.metadata,
        endCursor: 'abc',
      },
    });
  });

  test('should merge current state with payload from setPageSizeAction', () => {
    const action = setPageSizeAction(30);

    expect(reducer(state, action)).toEqual({
      ...state,
      metadata: {
        ...state.metadata,
        pageSize: 30,
      },
    });
  });

  test('should merge current state with payload from setHasNextPageAction', () => {
    const action = setHasNextPages(true);

    expect(reducer(state, action)).toEqual({
      ...state,
      metadata: {
        ...state.metadata,
        hasNextPage: true,
      },
    });
  });

  test('should return current state when action type is not recognized', () => {
    const action = { type: 'foo', payload: 'bar' } as unknown as Action<string>;

    expect(reducer(state, action)).toEqual(state);
  });
});
