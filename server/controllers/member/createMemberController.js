import { StatusCodes } from 'http-status-codes';
import createMemberService from '../../services/member/createMemberService.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';

const { CREATED } = StatusCodes;
const { MEMBER_KEYS } = PAYLOAD_KEYS;

const createMemberController = async (req, res, next) => {
  try {
    const { [MEMBER_KEYS.NAME]: memberName } = req.body;
    const { groupCode } = req.context;

    const member = await createMemberService({
      memberName,
      groupCode,
    });

    return res.status(CREATED).json({
      success: true,
      data: { member },
    });
  } catch (error) {
    next(error);
  }
};

export default createMemberController;
