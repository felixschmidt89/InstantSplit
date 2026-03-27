import { StatusCodes } from 'http-status-codes';
import getSingleExpenseService from '../../services/expense/getSingleExpenseService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const getSingleExpenseController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.EXPENSE_ID]: expenseId } = req.params;

    const expense = await getSingleExpenseService(expenseId);

    return res.status(OK).json({ expense });
  } catch (error) {
    next(error);
  }
};

export default getSingleExpenseController;
