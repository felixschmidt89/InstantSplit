import { StatusCodes } from 'http-status-codes';

import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const { NOT_FOUND } = StatusCodes;

const getMemberInfoService = async (memberId) => {
  const member = await Member.findById(memberId).lean();

  if (!member) {
    throw new ApiError(NOT_FOUND, 'Member not found');
  }

  return member;
};

export default getMemberInfoService;
