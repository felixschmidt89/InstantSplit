import { StatusCodes } from 'http-status-codes';

import { MEMBER_FIELDS } from '../../../shared/constants/models/memberConstants.js';
import { COMMON_FIELDS } from '../../../shared/constants/models/commonConstants.js';

import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { MEMBER_NAME } = MEMBER_FIELDS;
const { ID } = COMMON_FIELDS;
const { CONFLICT, NOT_FOUND } = StatusCodes;

const changeMemberNameService = async (memberData) => {
  const { memberId, memberName, groupCode } = memberData;
  const sanitizedName = memberName.trim();

  const existingMember = await Member.findOne({
    [MEMBER_NAME]: sanitizedName,
    groupCode,
  }).lean();

  if (existingMember && String(existingMember[ID]) !== memberId) {
    throw new ApiError(CONFLICT, 'Name is already taken in this group');
  }

  const updatedMember = await Member.findByIdAndUpdate(
    memberId,
    { $set: { [MEMBER_NAME]: sanitizedName } },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedMember) {
    throw new ApiError(NOT_FOUND, 'Member not found');
  }

  return updatedMember;
};

export default changeMemberNameService;
