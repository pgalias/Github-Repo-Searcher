import { Types } from './types';
import { Repository } from '../model/repository';

export type Action<T = undefined> = {
  type: Types;
  payload?: T;
};

export const fetchRepositoriesAction = (): Action => ({
  type: Types.FETCH_REPOSITORIES,
});

export const setRepositoriesAction = (payload: Repository[]): Action<Repository[]> => ({
  type: Types.SET_REPOSITORIES,
  payload,
});

export const setPageSizeAction = (payload: number): Action<number> => ({
  type: Types.SET_PAGE_SIZE,
  payload,
});

export const setCursorAction = (payload: string): Action<string> => ({
  type: Types.SET_CURSOR,
  payload,
});

export const setHasNextPages = (payload: boolean): Action<boolean> => ({
  type: Types.SET_HAS_NEXT_PAGE,
  payload,
});
