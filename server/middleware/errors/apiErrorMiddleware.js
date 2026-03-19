import { StatusCodes } from 'http-status-codes';

import { DEFAULT_ERROR_MESSAGE } from '../../constants/errorConstants.js';
import { LOG_LEVELS } from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { ERROR } = LOG_LEVELS;

const apiErrorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;
  const message = error.message || DEFAULT_ERROR_MESSAGE;

  debugLog(`API Error: ${message}`, error, ERROR);

  return res.status(statusCode).json({
    error: message,
  });
};

export default apiErrorMiddleware;
