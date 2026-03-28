import { StatusCodes } from 'http-status-codes';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { CONFLICT } = StatusCodes;
const { MEMBER_FIELDS } = MEMBER;
const { COMMON_FIELDS } = COMMON;
const { MEMBER_ERRORS } = ERROR_CODES.MEMBER_ERRORS;

const createMemberService = async (memberData) => {
  const { memberName, groupCode } = memberData;
  const sanitizedName = memberName.trim();

  const existingMember = await Member.findOne({
    [MEMBER_FIELDS.NAME]: sanitizedName,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  });

  if (existingMember) {
    throw new ApiError(CONFLICT, MEMBER_ERRORS.ALREADY_EXISTS);
  }

  const newMember = await Member.create({
    [MEMBER_FIELDS.NAME]: sanitizedName,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  });

  return newMember;
};

export default createMemberService;
