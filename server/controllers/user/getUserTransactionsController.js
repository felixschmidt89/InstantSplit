import { StatusCodes } from 'http-status-codes';
import { errorLog, sendInternalError } from '../../utils/errorUtils.js';
import { getUserTransactionsService } from '../../services/user/getUserTransactionService.js';

export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await getUserTransactionsService(userId);

    res.status(StatusCodes.OK).json({
      status: 'success',
      ...data,
      message: 'User transactions retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing user transactions',
      'Failed to list user transactions. Please try again later.',
    );
    sendInternalError(res);
  }
};
