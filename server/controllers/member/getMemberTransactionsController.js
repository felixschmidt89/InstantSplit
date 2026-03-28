import { StatusCodes } from 'http-status-codes';
import getMemberTransactionsService from '../../services/member/getMemberTransactionsService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const getMemberTransactionsController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.MEMBER_ID]: memberId } = req.params;

    const transactions = await getMemberTransactionsService(memberId);

    return res.status(OK).json({
      success: true,
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
};

export default getMemberTransactionsController;
