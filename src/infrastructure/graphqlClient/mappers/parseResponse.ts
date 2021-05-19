import { GraphQLResponse } from '../types';
import { GraphQLError } from '../error';

export const parseResponse = <T>(response: Response): Promise<GraphQLResponse<T>> =>
  response.json().catch((error: Error) => {
    throw GraphQLError.responseParsingError(error.message);
  }) as Promise<GraphQLResponse<T>>;
