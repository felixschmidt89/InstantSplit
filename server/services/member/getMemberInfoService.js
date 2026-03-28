import { StatusCodes } from 'http-status-codes';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { NOT_FOUND } = StatusCodes;
const { COMMON_FIELDS } = COMMON;
const { MEMBER_ERRORS } = ERROR_CODES;

const getMemberInfoService = async (memberId, groupCode) => {
  const member = await Member.findOne({
    [COMMON_FIELDS.ID]: memberId,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }).lean();

  if (!member) {
    throw new ApiError(NOT_FOUND, MEMBER_ERRORS.NOT_FOUND);
  }

  return member;
};

export default getMemberInfoService;
