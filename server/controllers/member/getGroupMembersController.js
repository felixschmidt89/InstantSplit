import { StatusCodes } from 'http-status-codes';
import getGroupMembersService from '../../services/member/getGroupMembersService.js';

const { OK } = StatusCodes;

const getGroupMembersController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const members = await getGroupMembersService(groupCode);

    return res.status(OK).json({
      success: true,
      data: { members },
    });
  } catch (error) {
    next(error);
  }
};

export default getGroupMembersController;
