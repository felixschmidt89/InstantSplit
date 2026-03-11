import { StatusCodes } from 'http-status-codes';
import { debugLog, ERROR } from '../../../shared/utils/debug/debugLog.js';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/errorConstants.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const apiErrorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;
  const message = error.message || DEFAULT_ERROR_MESSAGE;

  debugLog(`API Error: ${message}`, error, ERROR);

  return res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};

export default apiErrorMiddleware;
