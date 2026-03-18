import { StatusCodes } from 'http-status-codes';
import getMemberTransactionsService from '../../services/member/getMemberTransactionsService.js';

const { OK } = StatusCodes;

const getMemberTransactionsController = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    const transactions = await getMemberTransactionsService(memberId);

    return res.status(OK).json({ transactions });
  } catch (error) {
    next(error);
  }
};

export default getMemberTransactionsController;
