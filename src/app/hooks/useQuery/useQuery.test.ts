import { act, renderHook } from '@testing-library/react-hooks';
import { GraphQLClient } from '../../../infrastructure/graphqlClient';
import { useQuery } from './useQuery';

const { query } = GraphQLClient;

jest.mock('../../../infrastructure/graphqlClient', () => ({
  ...(jest.requireActual('../../../infrastructure/graphqlClient') as Record<string, unknown>),
  GraphQLClient: {
    query: jest.fn(),
  },
}));

describe('useQuery hooks', () => {
  const url = '//api.github.com/v4/graphql';
  const settings = {
    query: `
      query Foo {
        users {
          name
        }
      }
    `,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = {
    data: {
      users: [{ name: 'Bar' }, { baz: 'Baz ' }],
    },
  };

  beforeEach(() => {
    (query as jest.Mock).mockResolvedValue(response);
  });

  test('should return an array with result and fetch function', async () => {
    const { result } = renderHook(() => useQuery(url, settings));

    const [res, fetch] = result.current;
    expect(res).toBe(undefined);
    expect(typeof fetch).toBe('function');

    await act(async () => {
      fetch();
    });
    expect(result.current[0]).toEqual(response);
  });
});
