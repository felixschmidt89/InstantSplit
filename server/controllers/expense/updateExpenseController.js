import { StatusCodes } from 'http-status-codes';
import updateExpenseService from '../../services/expense/updateExpenseService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const updateExpenseController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [RESOURCE_IDS.EXPENSE_ID]: expenseId } = req.params;
    const expenseData = req.body;

    const expense = await updateExpenseService(
      expenseId,
      groupCode,
      expenseData,
    );

    return res.status(OK).json({ expense });
  } catch (error) {
    next(error);
  }
};

export default updateExpenseController;
