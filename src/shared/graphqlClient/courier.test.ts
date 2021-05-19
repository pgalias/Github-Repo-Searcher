import nock from 'nock';
import { courier } from './courier';
import { GraphQLError } from '../../domain/graphqlClient';

describe('courier', () => {
  let nockReq: nock.Interceptor;
  const query = `
      query Foo($after: Number!) {
        search(after: $after) {
          id
          name
        }
      }
    `;

  const variables = {
    after: 20,
  };

  beforeEach(() => {
    nockReq = nock('http://localhost').post(
      '/graphql',
      JSON.stringify({
        query,
        variables,
      }),
    );
  });

  test('should receive data from graphql api', () => {
    nockReq.reply(200, { data: {} }, { 'Access-Control-Allow-Origin': '*' });

    expect.assertions(1);
    return expect(
      courier.query('http://localhost/graphql', {
        query,
        variables,
      }),
    ).resolves.toEqual({});
  });

  test('should throw an error when graphql response contains errors', () => {
    nockReq.reply(200, { errors: [{ message: 'foo' }, { message: 'bar' }] }, { 'Access-Control-Allow-Origin': '*' });

    expect.assertions(1);
    return expect(
      courier.query('http://localhost/graphql', {
        query,
        variables,
      }),
    ).rejects.toEqual(GraphQLError.graphqlError('foo, bar'));
  });

  test('should throw an Bad Request error when there is response status 400', () => {
    nockReq.reply(400, {
      error: 'Invalid data passed',
    });

    expect.assertions(1);
    return expect(
      courier.query('http://localhost/graphql', {
        query,
        variables,
      }),
    ).rejects.toThrow(GraphQLError.badRequest());
  });

  test('should throw an Invalid Token error when there is response status 403', () => {
    nockReq.reply(403, {
      error: 'Invalid token passed',
    });

    expect.assertions(1);
    return expect(
      courier.query('http://localhost/graphql', {
        query,
        variables,
      }),
    ).rejects.toThrow(GraphQLError.invalidToken());
  });

  test('should throw an Internal Server Error error when there is response status 500', () => {
    nockReq.reply(500, {
      error: 'Invalid token passed',
    });

    expect.assertions(1);
    return expect(
      courier.query('http://localhost/graphql', {
        query,
        variables,
      }),
    ).rejects.toThrow(GraphQLError.internalServerError());
  });
});
