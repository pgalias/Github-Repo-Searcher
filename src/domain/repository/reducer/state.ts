import { Repository } from '../model/repository';

export interface State {
  repositories: Repository[];
  metadata: {
    endCursor: string | null;
    hasNextPage: boolean;
    pageSize: number;
  };
}

export const initialState: State = {
  repositories: [],
  metadata: {
    endCursor: null,
    hasNextPage: true,
    pageSize: 10,
  },
};
