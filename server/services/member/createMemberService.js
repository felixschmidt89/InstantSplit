import Member from '../../models/Member.js';
import ApiError from '../../utils/errors/ApiError.js';

const createMemberService = async (memberData) => {
  const { memberName, groupCode } = memberData;
  const sanitizedName = memberName.trim();

  const existingMemberName = await Member.findOne({
    memberName: sanitizedName,
    groupCode,
  });

  if (existingMemberName) {
    throw ApiError.conflict('Name is already taken in this group');
  }

  const newMember = await Member.create({
    memberName: sanitizedName,
    groupCode,
  });

  return newMember;
};

export default createMemberService;
