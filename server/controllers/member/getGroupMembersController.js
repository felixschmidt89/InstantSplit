import getGroupMembersService from '../../services/member/getGroupMembersService.js';

const getGroupMembersController = async (req, res, next) => {
  try {
    const { groupCode } = req.params;
    const { sortBy, order } = req.query;

    const members = await getGroupMembersService(groupCode, sortBy, order);

    return res.status(200).json({
      success: true,
      data: {
        members,
        count: members.length,
        isEmpty: !Boolean(members.length),
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getGroupMembersController;
