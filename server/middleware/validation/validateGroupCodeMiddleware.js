import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils/errors/index.js';
import { MISSING_GROUPCODE_ERROR } from '../../constants/errorConstants.js';

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
