import { StatusCodes } from 'http-status-codes';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';
import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { CONFLICT, NOT_FOUND } = StatusCodes;
const { MEMBER_FIELDS } = MEMBER;
const { COMMON_FIELDS } = COMMON;
const { MEMBER_ERRORS } = ERROR_CODES;

const changeMemberNameService = async (memberData) => {
  const { memberId, memberName, groupCode } = memberData;
  const sanitizedName = memberName.trim();

  const existingMember = await Member.findOne({
    [MEMBER_FIELDS.NAME]: sanitizedName,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }).lean();

  if (existingMember && String(existingMember[COMMON_FIELDS.ID]) !== memberId) {
    throw new ApiError(CONFLICT, MEMBER_ERRORS.ALREADY_EXISTS);
  }

  const updatedMember = await Member.findOneAndUpdate(
    {
      [COMMON_FIELDS.ID]: memberId,
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    },
    { $set: { [MEMBER_FIELDS.NAME]: sanitizedName } },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedMember) {
    throw new ApiError(NOT_FOUND, MEMBER_ERRORS.NOT_FOUND);
  }

  return updatedMember;
};

export default changeMemberNameService;
