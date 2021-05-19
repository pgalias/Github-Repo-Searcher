import {
  GraphqlClient as GraphqlClientInterface,
  QuerySettings,
  ApiResponse,
  GraphQLResponse,
} from '../../domain/graphqlClient';
import { catchServerError, checkResponseStatus, getGraphQLResponse, parseResponse } from './utils';

export const courier: GraphqlClientInterface = {
  query<T>(url: string, { query, variables, headers }: QuerySettings): ApiResponse<T> {
    return fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .catch(catchServerError)
      .then(res => checkResponseStatus(res as Response))
      .then(parseResponse)
      .then(graphqlResponse => getGraphQLResponse<T>(graphqlResponse as GraphQLResponse<T>));
  },
};
