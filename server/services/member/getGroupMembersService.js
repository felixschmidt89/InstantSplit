import Member from '../../models/Member.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const getGroupMembersService = async (groupCode) => {
  const members = await Member.find({
    [COMMON.FIELDS.GROUP_CODE]: groupCode,
  })
    .select(
      `${MEMBER.FIELDS.NAME} ${MEMBER.FIELDS.BALANCE} ${COMMON.FIELDS.GROUP_CODE}`,
    )
    .sort({ [MEMBER.FIELDS.NAME]: 1 })
    .lean();

  return members;
};

export default getGroupMembersService;
