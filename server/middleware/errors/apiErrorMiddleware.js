import { StatusCodes } from 'http-status-codes';

import ERROR_CONFIG from '../../../shared/constants/error/errorConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { ERROR } = LOG_LEVELS; // Standardized V2 access
const { MESSAGES } = ERROR_CONFIG;

const apiErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

  /**
   * If err.isOperational is true, it's a handled ApiError.
   * Otherwise, we shield the client from system details using DEFAULT.
   */
  const message = err.isOperational ? err.message : MESSAGES.DEFAULT;

  debugLog(`API Error [${req.method} ${req.url}]: ${err.message}`, err, ERROR);

  return res.status(statusCode).json({
    status: 'error',
    message,
  });
};

export default apiErrorMiddleware;
