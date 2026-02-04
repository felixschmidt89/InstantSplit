import express from 'express';
import {
  createExpense,
  listAllExpensesByGroupCode,
  listAllExpenses,
  deleteAllExpenses,
  getExpenseInfo,
  deleteExpense,
  updateExpense,
  getExpensesTotalByGroupCode,
} from '../controllers/expenseController.js';
import { expenseValidator } from '../validators/expenseValidator.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import { API_ROUTES } from '../../shared/constants/apiRoutesConstants.js';

const router = express.Router();

const { EXPENSES, URL_PARAMS } = API_ROUTES;

router.post('/', expenseValidator, createExpense);

router.put(`/${URL_PARAMS.EXPENSE_ID}`, expenseValidator, updateExpense);

router.get(`/${URL_PARAMS.EXPENSE_ID}`, getExpenseInfo);

router.delete(`/${URL_PARAMS.EXPENSE_ID}`, deleteExpense);

router.get(
  `/${EXPENSES.BY_GROUP_CODE}/${URL_PARAMS.GROUP_CODE}`,
  listAllExpensesByGroupCode,
);

router.get(
  `/${EXPENSES.TOTAL}/${URL_PARAMS.GROUP_CODE}`,
  getExpensesTotalByGroupCode,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all expenses
router.get('/debug/all', developmentOnlyMiddleware, listAllExpenses);

// Delete all expenses
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllExpenses);

export default router;
