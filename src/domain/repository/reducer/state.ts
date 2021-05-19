import { Repository } from '../model/repository';

export type Metadata = {
  endCursor: string | null;
  hasNextPage: boolean;
  pageSize: number;
};

export interface State {
  repositories: Repository[];
  metadata: Metadata;
}

export const initialState: State = {
  repositories: [],
  metadata: {
    endCursor: null,
    hasNextPage: true,
    pageSize: 10,
  },
};
