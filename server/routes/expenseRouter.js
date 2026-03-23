import express from 'express';
import {
  createExpense,
  getExpenseInfo,
  deleteExpense,
  updateExpense,
  getExpensesTotalByGroupId,
} from '../controllers/expenseController.js';
import getGroupExpensesController from '../controllers/expense/getGroupExpensesController.js';

import { expenseValidator } from '../validators/expenseValidator.js';
import ROUTE_PARAMS from '../../shared/constants/api/routeParamConstants.js';

const router = express.Router();

const { EXPENSE_ID, GROUP_ID } = ROUTE_PARAMS;

router.post('/', expenseValidator, createExpense);

router.get(`/:${EXPENSE_ID}`, getExpenseInfo);
router.put(`/:${EXPENSE_ID}`, expenseValidator, updateExpense);
router.delete(`/:${EXPENSE_ID}`, deleteExpense);

// Updated: now uses the context-based controller and a clean path
router.get('/group', getGroupExpensesController);

router.get(`/total/:${GROUP_ID}`, getExpensesTotalByGroupId);

export default router;
