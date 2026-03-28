import express from 'express';

import createExpenseController from '../controllers/expense/createExpenseController.js';
import getSingleExpenseController from '../controllers/expense/getSingleExpenseController.js';
import updateExpenseController from '../controllers/expense/updateExpenseController.js';
import deleteExpenseController from '../controllers/expense/deleteExpenseController.js';
import getGroupExpensesController from '../controllers/expense/getGroupExpensesController.js';
import getGroupExpensesTotalController from '../controllers/expense/getGroupExpensesTotalController.js';

import { expenseValidator } from '../validators/expenseValidator.js';

import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { EXPENSES, URL_PARAMS } = API_ROUTES;
const { EXPENSE_ID, GROUP_ID } = URL_PARAMS;

const expenseRouter = express.Router();

expenseRouter.post('/', expenseValidator, createExpenseController);

expenseRouter.get(`/:${EXPENSE_ID}`, getSingleExpenseController);

expenseRouter.patch(
  `/:${EXPENSE_ID}`,
  expenseValidator,
  updateExpenseController,
);

expenseRouter.delete(`/:${EXPENSE_ID}`, deleteExpenseController);

expenseRouter.get(
  `/${EXPENSES.GROUP_LIST}/:${GROUP_ID}`,
  getGroupExpensesController,
);

expenseRouter.get(
  `/${EXPENSES.GROUP_TOTAL}/:${GROUP_ID}`,
  getGroupExpensesTotalController,
);

export default expenseRouter;
