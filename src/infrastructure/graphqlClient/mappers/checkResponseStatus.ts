import { catchServerError } from './catchServerError';

export const checkResponseStatus = (response: Response): Response => {
  const { status } = response;

  if (status >= 400) {
    catchServerError(response);
  }

  return response;
};
