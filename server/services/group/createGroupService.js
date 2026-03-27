import Group from '../../models/Group.js';
import generateGroupCode from '../../utils/group/generateGroupCode.js';
import GROUP_CONSTANTS from '../../../shared/constants/models/groupConstants.js';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';

const { GROUP_FIELDS } = GROUP_CONSTANTS;
const { COMMON_FIELDS } = COMMON_CONSTANTS;

const createGroupService = async (groupName) => {
  const groupCode = await generateGroupCode();

  const group = await Group.create({
    [GROUP_FIELDS.NAME]: groupName,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
    // TODO: Replace 'initialGroupName' with groupId throughout the app, and remove this field
  });

  return group;
};

export default createGroupService;
