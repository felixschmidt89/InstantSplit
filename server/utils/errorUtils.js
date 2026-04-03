import { StatusCodes } from 'http-status-codes';

// TODO: Delete file once this isnt used in codebase any longer
export const devLog = (message = 'devLog', data = undefined) => {
  if (process.env.NODE_ENV === 'development') {
    if (data !== undefined) {
      if (data instanceof Error) {
        console.error(message, data);
      } else {
        console.log(message, data);
      }
    }
  }
};
