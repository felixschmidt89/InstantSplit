import { StatusCodes } from 'http-status-codes';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Group from '../../models/Group.js';
import ApiError from '../../utils/errors/ApiError.js';

const { GROUP_FIELDS } = GROUP;
const { COMMON_FIELDS } = COMMON;
const { GROUP_ERRORS } = ERROR_CODES;
const { NOT_FOUND } = StatusCodes;

const changeGroupNameService = async (groupId, groupCode, name) => {
  const updatedGroup = await Group.findOneAndUpdate(
    {
      [COMMON_FIELDS.ID]: groupId,
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    },
    { [GROUP_FIELDS.NAME]: name },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedGroup) {
    throw new ApiError(NOT_FOUND, GROUP_ERRORS.NOT_FOUND);
  }

  return updatedGroup;
};

export default changeGroupNameService;
