import { StatusCodes } from 'http-status-codes';
import getGroupExpensesService from '../../services/expense/getGroupExpensesService.js';
import ROUTE_PARAMS from '../../../shared/constants/api/routeParamConstants.js';

const { OK } = StatusCodes;

const getGroupExpensesController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [ROUTE_PARAMS.GROUP_ID]: groupId } = req.params;

    const expenses = await getGroupExpensesService(groupCode);

    return res.status(OK).json({
      status: 'success',
      results: expenses.length,
      data: { expenses },
      message: 'Group expenses retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default getGroupExpensesController;
