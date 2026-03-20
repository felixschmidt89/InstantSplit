import { StatusCodes } from 'http-status-codes';

import changeMemberNameService from '../../services/member/changeMemberNameService.js';

const { OK } = StatusCodes;

const changeMemberNameController = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const { memberName } = req.body;
    const { groupCode } = req.context;

    const updatedMember = await changeMemberNameService({
      memberId,
      memberName,
      groupCode,
    });

    res.status(OK).json({
      member: updatedMember,
    });
  } catch (error) {
    next(error);
  }
};

export default changeMemberNameController;
