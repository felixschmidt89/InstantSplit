import Group from '../../models/Group.js';

const getGroupInfoService = async (groupId) => {
  const group = await Group.findById(groupId).lean();

  return group;
};

export default getGroupInfoService;
