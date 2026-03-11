import { StatusCodes } from 'http-status-codes';

import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';

const { OK } = StatusCodes;

const getGroupTransactionsController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const transactions = await getGroupTransactionsService(groupCode);

    return res.status(OK).json({ transactions });
  } catch (error) {
    next(error);
  }
};

export default getGroupTransactionsController;
