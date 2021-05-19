import { catchServerError, parseResponse, getGraphQLResponse, checkResponseStatus } from './mappers';
import { GraphQLResponse, ApiResponse, QuerySettings } from './types';

export class GraphQLClient {
  static query<T>(url: string, { query, variables, headers }: QuerySettings): ApiResponse<T> {
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
  }
}
