import { StatusCodes } from 'http-status-codes';
import getGroupExpensesService from '../../services/expense/getGroupExpensesService.js';

const { OK } = StatusCodes;

const getGroupExpensesController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const expenses = await getGroupExpensesService(groupCode);

    return res.status(OK).json({
      success: true,
      data: { expenses },
    });
  } catch (error) {
    next(error);
  }
};

export default getGroupExpensesController;
