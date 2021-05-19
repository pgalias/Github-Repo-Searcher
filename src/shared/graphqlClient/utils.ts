import { GraphQLError, GraphQLResponse } from '../../domain/graphqlClient';

export const catchServerError = ({ status }: Response): void => {
  if (status === 400) {
    throw GraphQLError.badRequest();
  }

  if (status === 403) {
    throw GraphQLError.invalidToken();
  }

  if (status >= 500) {
    throw GraphQLError.internalServerError();
  }
};

export const checkResponseStatus = (response: Response) => {
  const { status } = response;

  if (status >= 400) {
    catchServerError(response);
  }

  return response;
};

export const parseResponse = <T>(response: Response): Promise<GraphQLResponse<T>> =>
  response.json().catch((error: Error) => {
    throw GraphQLError.responseParsingError(error.message);
  }) as Promise<GraphQLResponse<T>>;

export const getGraphQLResponse = <T>({ errors, data }: GraphQLResponse<T>): T => {
  if (errors) {
    throw GraphQLError.graphqlError(errors?.map(({ message }) => message)?.join(', '));
  }

  return data as T;
};
