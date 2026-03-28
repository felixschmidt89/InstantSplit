import Group from '../../models/Group.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';

const { COMMON_FIELDS } = COMMON;
const { GROUP_FIELDS } = GROUP;

const getStoredGroupsNamesService = async (groupCodesArray) => {
  const groups = await Group.find({
    [COMMON_FIELDS.GROUP_CODE]: { $in: groupCodesArray },
  })
    .select(`${GROUP_FIELDS.NAME} ${COMMON_FIELDS.GROUP_CODE}`)
    .lean();

  return groups;
};

export default getStoredGroupsNamesService;
