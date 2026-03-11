import { StatusCodes } from 'http-status-codes';
import { MISSING_GROUPCODE_ERROR } from '../../constants/errorConstants.js';

const { BAD_REQUEST } = StatusCodes;

export const validateGroupCodeMiddleware = (req, res, next) => {
  const { groupCode } = req;

  if (!groupCode) {
    const error = new Error(MISSING_GROUPCODE_ERROR);
    error.statusCode = BAD_REQUEST;
    return next(error);
  }

  next();
};

export default validateGroupCodeMiddleware;
