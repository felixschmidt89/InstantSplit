import { StatusCodes } from 'http-status-codes';
import { debugLog, ERROR } from '../../../shared/utils/debug/debugLog.js';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/errorConstants.js';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = err.message || DEFAULT_ERROR_MESSAGE;

  debugLog(`API Error: ${message}`, err, ERROR);

  res.status(statusCode).json({
    error: message,
  });
};

export default errorMiddleware;
