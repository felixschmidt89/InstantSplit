import Member from '../../models/Member.js';
import getMongooseSortOrder from '../../utils/database/getMongooseSortOrder.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import MEMBER from '../../../shared/constants/models/memberConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const { SORT_ORDER } = SYSTEM;
const { MEMBER_FIELDS } = MEMBER;
const { COMMON_FIELDS } = COMMON;

const getGroupMembersService = async (
  groupCode,
  sortBy = COMMON_FIELDS.CREATED_AT,
  order = SORT_ORDER.DESCENDING,
) => {
  return await Member.find({ [COMMON_FIELDS.GROUP_CODE]: groupCode })
    .select(
      `${MEMBER_FIELDS.NAME} ${MEMBER_FIELDS.BALANCE} ${COMMON_FIELDS.GROUP_CODE} ${COMMON_FIELDS.CREATED_AT}`,
    )
    .sort({ [sortBy]: getMongooseSortOrder(order) })
    .lean();
};

export default getGroupMembersService;
