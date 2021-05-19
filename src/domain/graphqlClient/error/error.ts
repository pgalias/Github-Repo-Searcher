import { ErrorCode } from './errorCode';

export class GraphQLError extends Error {
  constructor(public code: ErrorCode, public message: string = '') {
    super(message);
  }

  public static responseParsingError(message = ''): GraphQLError {
    return new GraphQLError(ErrorCode.RESPONSE_PARSING_ERROR, message);
  }

  public static graphqlError(message = ''): GraphQLError {
    return new GraphQLError(ErrorCode.GRAPHQL_ERROR, message);
  }

  public static badRequest(message = ''): GraphQLError {
    return new GraphQLError(ErrorCode.BAD_REQUEST, message);
  }

  public static invalidToken(message = ''): GraphQLError {
    return new GraphQLError(ErrorCode.INVALID_TOKEN, message);
  }

  public static internalServerError(message = ''): GraphQLError {
    return new GraphQLError(ErrorCode.INTERNAL_SERVER_ERROR, message);
  }
}
