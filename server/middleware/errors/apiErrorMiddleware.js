import { StatusCodes } from 'http-status-codes';

import ERROR_CONFIG from '../../../shared/constants/error/errorConstants.js';
import LOG_CONFIG from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { ERROR } = LOG_CONFIG.LOG_LEVELS;
const { DEFAULT_ERROR_MESSAGE } = ERROR_CONFIG;

const apiErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

  /**
   * If err.isOperational is true, it came from your ApiError class (intentional).
   * Otherwise, it's a system crash, so we send the generic default message.
   */
  const message = err.isOperational ? err.message : DEFAULT_ERROR_MESSAGE;

  debugLog(`API Error [${req.method} ${req.url}]: ${err.message}`, err, ERROR);

  return res.status(statusCode).json({
    error: message,
  });
};

export default apiErrorMiddleware;
