import { GraphQLError } from '../error';

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
