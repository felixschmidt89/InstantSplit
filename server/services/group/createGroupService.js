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

  //TODO: replace current email notification with a more reliable tool
  //   const mailOptions = generateGroupCreationEmailOptions(groupName);
  //   sendAdminEmailNotification(mailOptions);

  return group;
};

export default createGroupService;
