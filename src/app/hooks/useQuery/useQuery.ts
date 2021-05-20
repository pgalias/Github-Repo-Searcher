import { useState } from 'react';
import { QuerySettings } from '../../../infrastructure/graphqlClient/types';
import { GraphQLClient } from '../../../infrastructure/graphqlClient';

export const useQuery = <T>(url: string, settings: QuerySettings): [T | undefined, () => Promise<void>] => {
  const [results, setResults] = useState<T>();
  const { query } = GraphQLClient;

  const fetch = () => query(url, settings).then(res => setResults(res as T));

  return [results, fetch];
};
