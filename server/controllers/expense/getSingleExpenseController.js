import { StatusCodes } from 'http-status-codes';
import getSingleExpenseService from '../../services/expense/getSingleExpenseService.js';
import ROUTE_PARAMS from '../../../shared/constants/api/routeParamConstants.js';

const { OK } = StatusCodes;

const getSingleExpenseController = async (req, res, next) => {
  try {
    const { [ROUTE_PARAMS.EXPENSE_ID]: expenseId } = req.params;

    const expense = await getSingleExpenseService(expenseId);

    return res.status(OK).json({
      status: 'success',
      data: { expense },
      message: 'Expense retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default getSingleExpenseController;
