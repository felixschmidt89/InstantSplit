import { StatusCodes } from 'http-status-codes';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import LOGGER_CONSTANTS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;
const { LOG_LEVELS } = LOGGER_CONSTANTS;

const apiErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

  const errorCode = err.isOperational
    ? err.errorCode
    : ERROR_CODES.GENERIC.INTERNAL_SERVER_ERROR;

  debugLog(
    `API Error [${req.method} ${req.url}]: ${err.message}`,
    err,
    LOG_LEVELS.ERROR,
  );

  return res.status(statusCode).json({
    success: false,
    code: errorCode,
  });
};

export default apiErrorMiddleware;
