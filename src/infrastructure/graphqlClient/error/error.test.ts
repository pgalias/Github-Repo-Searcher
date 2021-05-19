import { GraphQLError } from './error';
import { ErrorCode } from './errorCode';

describe('GraphQLError', () => {
  const message = 'Msg';

  test('should be able to create error instance by the constructor method', () => {
    const error = new GraphQLError(ErrorCode.GRAPHQL_ERROR, message);
    expect(error).toBeInstanceOf(GraphQLError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.GRAPHQL_ERROR);
  });

  test('message can be an empty string', () => {
    const error = new GraphQLError(ErrorCode.GRAPHQL_ERROR);
    expect(error).toBeInstanceOf(GraphQLError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('');
    expect(error.code).toBe(ErrorCode.GRAPHQL_ERROR);
  });

  describe.each`
    fn                                   | code
    ${GraphQLError.graphqlError}         | ${ErrorCode.GRAPHQL_ERROR}
    ${GraphQLError.internalServerError}  | ${ErrorCode.INTERNAL_SERVER_ERROR}
    ${GraphQLError.invalidToken}         | ${ErrorCode.INVALID_TOKEN}
    ${GraphQLError.responseParsingError} | ${ErrorCode.RESPONSE_PARSING_ERROR}
    ${GraphQLError.badRequest}           | ${ErrorCode.BAD_REQUEST}
  `('creating error instance by static "$fn" method', ({ fn, code }) => {
    test('should be able to create instance with error message', () => {
      const error = fn(message);
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(message);
      expect(error.code).toEqual(code);
    });

    test('should be able to create instance without error message', () => {
      const error = fn();
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('');
      expect(error.code).toEqual(code);
    });
  });
});
