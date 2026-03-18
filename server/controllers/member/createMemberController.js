import { StatusCodes } from 'http-status-codes';
import createMemberService from '../../services/member/createMemberService.js';

const { CREATED } = StatusCodes;

const createMemberController = async (req, res, next) => {
  try {
    const { memberName, groupCode } = req.body;

    const newMember = await createMemberService({ memberName, groupCode });

    return res.status(CREATED).json({
      status: 'success',
      data: {
        member: newMember,
      },
      message: 'Member created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default createMemberController;
