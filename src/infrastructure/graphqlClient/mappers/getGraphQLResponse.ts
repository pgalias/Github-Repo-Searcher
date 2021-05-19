import { GraphQLResponse } from '../types';
import { GraphQLError } from '../error';

export const getGraphQLResponse = <T>({ errors, data }: GraphQLResponse<T>): T => {
  if (errors) {
    throw GraphQLError.graphqlError(errors?.map(({ message }) => message)?.join(', '));
  }

  return data as T;
};
