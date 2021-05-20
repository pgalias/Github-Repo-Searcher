import { Repository } from '../model/repository';

export type Metadata = {
  endCursor: string | null;
  hasNextPage: boolean;
  pageSize: number;
};

export interface State {
  repositories: Repository[];
  search: string;
  metadata: Metadata;
}

export const initialState: State = {
  repositories: [],
  search: 'react',
  metadata: {
    endCursor: null,
    hasNextPage: true,
    pageSize: 10,
  },
};
