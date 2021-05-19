type GraphQLDocument = string;
type QueryVariables = Record<string, unknown>;

export type QuerySettings = {
  query: GraphQLDocument;
  headers?: Headers | HeadersInit;
  variables?: QueryVariables;
};

export type ApiResponse<T> = Promise<T>;
export type GraphQLResponse<T> = {
  data?: T;
  errors?: {
    message: string;
  }[];
};
