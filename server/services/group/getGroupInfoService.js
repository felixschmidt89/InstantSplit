import { StatusCodes } from 'http-status-codes';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Group from '../../models/Group.js';
import ApiError from '../../utils/errors/ApiError.js';

const { COMMON_FIELDS } = COMMON;
const { GROUP_ERRORS } = ERROR_CODES;
const { NOT_FOUND } = StatusCodes;

const getGroupInfoService = async (groupCode) => {
  const group = await Group.findOne({
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }).lean();

  if (!group) {
    throw new ApiError(NOT_FOUND, GROUP_ERRORS.NOT_FOUND);
  }

  return group;
};

export default getGroupInfoService;
