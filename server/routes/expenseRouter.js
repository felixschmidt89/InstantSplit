import express from 'express';
import {
  createExpense,
  getExpenseInfo,
  deleteExpense,
  updateExpense,
} from '../controllers/expenseController.js';

// Modularized Controllers
import getGroupExpensesController from '../controllers/expense/getGroupExpensesController.js';
import getGroupExpensesTotalController from '../controllers/expense/getGroupExpensesTotalController.js';

import { expenseValidator } from '../validators/expenseValidator.js';
import ROUTE_PARAMS from '../../shared/constants/api/routeParamConstants.js';

const router = express.Router();
const { EXPENSE_ID, GROUP_ID } = ROUTE_PARAMS;

// 1. Individual Transactions (Specific to :expenseId)
router.post('/', expenseValidator, createExpense);
router.get(`/:${EXPENSE_ID}`, getExpenseInfo);
router.put(`/:${EXPENSE_ID}`, expenseValidator, updateExpense);
router.delete(`/:${EXPENSE_ID}`, deleteExpense);


router.get(`/group-list/:${GROUP_ID}`, getGroupExpensesController);
router.get(`/group-total/:${GROUP_ID}`, getGroupExpensesTotalController);

export default router;
