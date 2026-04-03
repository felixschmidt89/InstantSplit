import express from 'express';
import createExpenseController from '../controllers/expense/createExpenseController.js';
import getSingleExpenseController from '../controllers/expense/getSingleExpenseController.js';
import updateExpenseController from '../controllers/expense/updateExpenseController.js';
import deleteExpenseController from '../controllers/expense/deleteExpenseController.js';
import getGroupExpensesController from '../controllers/expense/getGroupExpensesController.js';
import getGroupExpensesTotalController from '../controllers/expense/getGroupExpensesTotalController.js';
import resetSettlementsMiddleware from '../middleware/group/resetSettlementsMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { EXPENSES, URL_PARAMS } = API_ROUTES;
const { EXPENSE_ID, GROUP_ID } = URL_PARAMS;

const expenseRouter = express.Router();

expenseRouter.use(touchGroupLastActiveMiddleware);

expenseRouter.post('/', resetSettlementsMiddleware, createExpenseController);

expenseRouter.get(`/:${EXPENSE_ID}`, getSingleExpenseController);

expenseRouter.patch(
  `/:${EXPENSE_ID}`,
  resetSettlementsMiddleware,
  updateExpenseController,
);

expenseRouter.delete(
  `/:${EXPENSE_ID}`,
  resetSettlementsMiddleware,
  deleteExpenseController,
);

expenseRouter.get(
  `/${EXPENSES.GROUP_LIST}/:${GROUP_ID}`,
  getGroupExpensesController,
);

expenseRouter.get(
  `/${EXPENSES.GROUP_TOTAL}/:${GROUP_ID}`,
  getGroupExpensesTotalController,
);

export default expenseRouter;
