import express from 'express';
import ROUTE_PARAMS from '../../shared/constants/api/routeParamConstants.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

import createExpenseController from '../controllers/expense/createExpenseController.js';
import getSingleExpenseController from '../controllers/expense/getSingleExpenseController.js';
import updateExpenseController from '../controllers/expense/updateExpenseController.js';
import deleteExpenseController from '../controllers/expense/deleteExpenseController.js';
import getGroupExpensesController from '../controllers/expense/getGroupExpensesController.js';
import getGroupExpensesTotalController from '../controllers/expense/getGroupExpensesTotalController.js';

import { expenseValidator } from '../validators/expenseValidator.js';

const router = express.Router();
const { EXPENSE_ID, GROUP_ID } = ROUTE_PARAMS;
const { GROUP_LIST, GROUP_TOTAL } = API_ROUTES.EXPENSES;

router.get(`/${GROUP_LIST}/:${GROUP_ID}`, getGroupExpensesController);
router.get(`/${GROUP_TOTAL}/:${GROUP_ID}`, getGroupExpensesTotalController);

router.post('/', expenseValidator, createExpenseController);
router.get(`/:${EXPENSE_ID}`, getSingleExpenseController);
router.put(`/:${EXPENSE_ID}`, expenseValidator, updateExpenseController);
router.delete(`/:${EXPENSE_ID}`, deleteExpenseController);

export default router;
