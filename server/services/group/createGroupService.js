import GROUP from '../../../shared/constants/models/groupConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import Group from '../../models/Group.js';
import generateGroupCode from '../../utils/group/generateGroupCode.js';

const { GROUP_FIELDS } = GROUP;
const { COMMON_FIELDS } = COMMON;

const createGroupService = async (name) => {
  const groupCode = await generateGroupCode();

  const group = await Group.create({
    [GROUP_FIELDS.NAME]: name,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
    // TODO: Replace 'initialGroupName' with groupId throughout the app, and remove this field
  });

  return group;
};

export default createGroupService;
