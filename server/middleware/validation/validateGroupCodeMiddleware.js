import { StatusCodes } from 'http-status-codes';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import ApiError from '../../utils/errors/ApiError.js';

const { BAD_REQUEST } = StatusCodes;

const validateGroupCodeMiddleware = (req, res, next) => {
  const { groupCode } = req;

  if (!groupCode) {
    return next(new ApiError(BAD_REQUEST, ERROR_CODES.GROUP.NOT_FOUND));
  }

  next();
};

export default validateGroupCodeMiddleware;
