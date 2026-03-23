import { StatusCodes } from 'http-status-codes';
import updateExpenseService from '../../services/expense/updateExpenseService.js';
import ROUTE_PARAMS from '../../../shared/constants/api/routeParamConstants.js';

const { OK } = StatusCodes;

const updateExpenseController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [ROUTE_PARAMS.EXPENSE_ID]: expenseId } = req.params;
    const expenseData = req.body;

    const updatedExpense = await updateExpenseService(
      expenseId,
      groupCode,
      expenseData,
    );

    return res.status(OK).json({
      status: 'success',
      data: { expense: updatedExpense },
      message: 'Expense updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default updateExpenseController;
