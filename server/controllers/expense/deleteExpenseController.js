import { StatusCodes } from 'http-status-codes';
import deleteExpenseService from '../../services/expense/deleteExpenseService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { NO_CONTENT } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const deleteExpenseController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.EXPENSE_ID]: expenseId } = req.params;

    await deleteExpenseService(expenseId);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default deleteExpenseController;
