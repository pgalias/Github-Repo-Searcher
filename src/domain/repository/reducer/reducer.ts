import { initialState, State } from './state';
import { Action } from './actions';
import { Types } from './types';
import { Repository } from '../model/repository';

export type PossibleActionPayloads = Repository[] | number | string | boolean;

export const reducer = (state = initialState, { type, payload }: Action<PossibleActionPayloads>): State => {
  switch (type) {
    case Types.SET_REPOSITORIES:
      return {
        ...state,
        repositories: [...state.repositories, ...(payload as Repository[])],
      };
    case Types.SET_CURSOR:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          endCursor: payload as string,
        },
      };
    case Types.SET_PAGE_SIZE:
      return {
        ...state,
        repositories: [],
        metadata: {
          ...state.metadata,
          endCursor: null,
          pageSize: payload as number,
        },
      };
    case Types.SET_HAS_NEXT_PAGE:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          hasNextPage: payload as boolean,
        },
      };
    case Types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload as boolean,
      };
    default:
      return state;
  }
};
