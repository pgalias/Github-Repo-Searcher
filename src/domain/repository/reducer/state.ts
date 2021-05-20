import { Repository } from '../model/repository';

export type Metadata = {
  endCursor: string | null;
  hasNextPage: boolean;
  pageSize: number;
};

export interface State {
  isLoading: boolean;
  repositories: Repository[];
  search: string;
  metadata: Metadata;
}

export const initialState: State = {
  isLoading: false,
  repositories: [],
  search: 'react',
  metadata: {
    endCursor: null,
    hasNextPage: true,
    pageSize: 10,
  },
};
