import Member from '../../models/Member.js';
import { MEMBER_FIELDS } from '../../../shared/constants/models/memberConstants.js';
import { COMMON_FIELDS } from '../../../shared/constants/models/commonConstants.js';

const { MEMBER_NAME, MEMBER_BALANCE } = MEMBER_FIELDS;
const { GROUP_CODE } = COMMON_FIELDS;

const getGroupMembersService = async (groupCode) => {
  const members = await Member.find({ [GROUP_CODE]: groupCode })
    .select(`${MEMBER_NAME} ${MEMBER_BALANCE} ${GROUP_CODE}`)
    .sort({ [MEMBER_NAME]: 1 })
    .lean();

  return members;
};

export default getGroupMembersService;
