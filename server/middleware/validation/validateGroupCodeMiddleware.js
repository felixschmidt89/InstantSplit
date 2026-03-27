import { StatusCodes } from 'http-status-codes';
import ERROR_CONFIG from '../../../shared/constants/system/errorConstants.js/';
import ApiError from '../../utils/errors/ApiError.js';

const { BAD_REQUEST } = StatusCodes;
const { MISSING_GROUPCODE_ERROR } = ERROR_CONFIG;

const validateGroupCodeMiddleware = (req, res, next) => {
  const { groupCode } = req;

  const hasGroupCode = Boolean(groupCode);

  if (!hasGroupCode) {
    return next(new ApiError(BAD_REQUEST, MISSING_GROUPCODE_ERROR));
  }

  next();
};

export default validateGroupCodeMiddleware;
