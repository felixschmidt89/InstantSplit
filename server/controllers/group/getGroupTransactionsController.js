import { StatusCodes } from 'http-status-codes';

import { TRANSACTION_TYPES } from '../../../shared/constants/transactionConstants.js';
import { API_MESSAGES } from '../../../shared/constants/apiMessageConstants.js';
import { API_RESPONSE_STATUS } from '../../../shared/constants/apiStatusConstants.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import { getGroupTransactionsService } from '../../services/group/getGroupTransactionsService.js';
import { touchGroupLastActive } from '../../utils/databaseUtils.js';

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;
const { SUCCESS, STATUS_ERROR } = API_RESPONSE_STATUS;
const { INFO, LOG_ERROR } = LOG_LEVELS;
const { EXPENSE, PAYMENT, UNKNOWN } = TRANSACTION_TYPES;

export const getGroupTransactionsController = async (req, res) => {
  const { groupCode } = req.params;

  debugLog('Fetching group transactions', { groupCode }, INFO);

  try {
    await touchGroupLastActive(groupCode);
    const rawTransactions = await getGroupTransactionsService(groupCode);

    const transactions = rawTransactions
      .map((item) => {
        const itemObject = item.toObject ? item.toObject() : item;
        let itemType;

        switch (true) {
          case !!itemObject.expenseDescription:
            itemType = EXPENSE;
            break;
          case !!itemObject.paymentAmount:
            itemType = PAYMENT;
            break;
          default:
            itemType = UNKNOWN;
        }

        return {
          ...itemObject,
          itemId: itemObject._id,
          itemType,
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    debugLog(
      'Transactions processed and sorted',
      { count: transactions.length },
      INFO,
    );

    res.status(OK).json({
      status: SUCCESS,
      transactions,
      count: transactions.length,
      message: API_MESSAGES.TRANSACTIONS_FETCHED,
    });
  } catch (error) {
    debugLog(
      'Failed to fetch transactions',
      { error: error.message, groupCode },
      LOG_ERROR,
    );

    res.status(INTERNAL_SERVER_ERROR).json({
      status: STATUS_ERROR,
      message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};
