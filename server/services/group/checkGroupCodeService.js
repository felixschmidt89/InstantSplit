import Group from '../../models/Group.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const { COMMON_FIELDS } = COMMON;

const checkGroupCodeService = async (groupCode) => {
  const group = await Group.findOne({ [COMMON_FIELDS.GROUP_CODE]: groupCode })
    .select(COMMON_FIELDS.GROUP_CODE)
    .lean();

  return Boolean(group);
};

export default checkGroupCodeService;
