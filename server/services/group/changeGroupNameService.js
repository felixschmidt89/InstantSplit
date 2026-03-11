import Group from '../../models/Group.js';

const changeGroupNameService = async (groupId, groupName) => {
  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    { $set: { groupName } },
    { new: true, runValidators: true },
  ).lean();

  return updatedGroup;
};

export default changeGroupNameService;
