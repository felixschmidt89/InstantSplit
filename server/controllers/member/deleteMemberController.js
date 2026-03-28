import { StatusCodes } from 'http-status-codes';
import deleteMemberService from '../../services/member/deleteMemberService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { NO_CONTENT } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const deleteMemberController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.MEMBER_ID]: memberId } = req.params;

    await deleteMemberService(memberId);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default deleteMemberController;
