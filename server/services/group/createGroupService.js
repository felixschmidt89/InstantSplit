import Group from '../../models/Group.js';

import { generateUniqueGroupCode } from '../../utils/groupCodeUtils.js';

const createGroupService = async (groupName) => {
  const groupCode = await generateUniqueGroupCode();

  const group = await Group.create({
    groupName,
    groupCode,
    // TODO: Drop Initial Group Name, use group id instead
    initialGroupName: groupName,
  });

  return group;
};

export default createGroupService;
