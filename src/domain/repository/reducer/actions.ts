import { Types } from './types';
import { Repository } from '../model/repository';

export type Action<T = undefined> = {
  type: Types;
  payload?: T;
};

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

export const setHasNextPagesAction = (payload: boolean): Action<boolean> => ({
  type: Types.SET_HAS_NEXT_PAGE,
  payload,
});

export const setIsLoadingAction = (payload: boolean): Action<boolean> => ({
  type: Types.SET_IS_LOADING,
  payload,
});
