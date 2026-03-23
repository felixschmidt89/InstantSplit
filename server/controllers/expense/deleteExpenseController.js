import { StatusCodes } from 'http-status-codes';
import deleteExpenseService from '../../services/expense/deleteExpenseService.js';
import ROUTE_PARAMS from '../../../shared/constants/api/routeParamConstants.js';

const { NO_CONTENT } = StatusCodes;

const deleteExpenseController = async (req, res, next) => {
  try {
    const { [ROUTE_PARAMS.EXPENSE_ID]: expenseId } = req.params;

    await deleteExpenseService(expenseId);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default deleteExpenseController;
