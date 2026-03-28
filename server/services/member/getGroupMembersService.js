import MEMBER from '../../../shared/constants/models/memberConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import Member from '../../models/Member.js';

const { MEMBER_FIELDS } = MEMBER;
const { COMMON_FIELDS } = COMMON;

const getGroupMembersService = async (groupCode) => {
  const members = await Member.find({
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  })
    .select(
      `${MEMBER_FIELDS.NAME} ${MEMBER_FIELDS.BALANCE} ${COMMON_FIELDS.GROUP_CODE}`,
    )
    .sort({ [MEMBER_FIELDS.NAME]: 1 })
    .lean();

  return members;
};

export default getGroupMembersService;
