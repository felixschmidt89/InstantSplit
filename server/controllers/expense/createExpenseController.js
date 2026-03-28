import { StatusCodes } from 'http-status-codes';
import createExpenseService from '../../services/expense/createExpenseService.js';

const { CREATED } = StatusCodes;

const createExpenseController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const expenseData = req.body;

    const expense = await createExpenseService(groupCode, expenseData);

    return res.status(CREATED).json({ success: true, data: { expense } });
  } catch (error) {
    next(error);
  }
};

export default createExpenseController;
