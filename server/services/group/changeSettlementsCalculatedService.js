import { StatusCodes } from 'http-status-codes';
import Group from '../../models/Group.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import ApiError from '../../utils/errors/ApiError.js';

const { COMMON_FIELDS } = COMMON;
const { GROUP_FIELDS } = GROUP;
const { GROUP_ERRORS } = ERROR_CODES;
const { NOT_FOUND } = StatusCodes;

const changeSettlementsCalculatedService = async (
  groupCode,
  settlementsCalculated,
) => {
  const updatedGroup = await Group.findOneAndUpdate(
    { [COMMON_FIELDS.GROUP_CODE]: groupCode },
    { [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: settlementsCalculated },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedGroup) {
    throw new ApiError(NOT_FOUND, GROUP_ERRORS.NOT_FOUND);
  }

  return updatedGroup;
};

export default changeSettlementsCalculatedService;
