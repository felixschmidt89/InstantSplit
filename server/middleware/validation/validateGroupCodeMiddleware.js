import { StatusCodes } from 'http-status-codes';
import { MISSING_GROUPCODE_ERROR } from '../../../shared/constants/error/errorConstants.js/index.js';
import ApiError from '../../utils/errors/ApiError.js';

const { BAD_REQUEST } = StatusCodes;

const validateGroupCodeMiddleware = (req, res, next) => {
  const { groupCode } = req;

  const hasGroupCode = Boolean(groupCode);

  if (!hasGroupCode) {
    return next(new ApiError(BAD_REQUEST, MISSING_GROUPCODE_ERROR));
  }

  next();
};

export default validateGroupCodeMiddleware;
