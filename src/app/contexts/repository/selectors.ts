import { Metadata, State } from '../../../domain/repository/reducer';
import { Repository } from '../../../domain/repository/model/repository';

export const selectRepositories = (store: State): Repository[] => store.repositories;
export const selectMetadata = (store: State): Metadata => store.metadata;
export const selectEndCursor = (store: State): string | null => selectMetadata(store).endCursor;
export const selectPageSize = (store: State): number => selectMetadata(store).pageSize;
export const selectHasNextPage = (store: State): boolean => selectMetadata(store).hasNextPage;