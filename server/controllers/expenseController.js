import { StatusCodes } from 'http-status-codes';

import Expense from '../models/Expense.js';
import User from '../models/User.js';

import {
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { debugLog } from '../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';

// Domain Utils
import { verifyExpensePayerAndBeneficiaries } from '../utils/expense/verifyExpensePayerAndBeneficiaries.js';
import { touchGroupLastActive } from '../utils/group/touchGroupLastActive.js';
import { resetGroupSettlements } from '../utils/group/resetGroupSettlements.js';

const { LOG_ERROR, INFO } = LOG_LEVELS;

export const createExpense = async (req, res) => {
  try {
    const {
      expensePayerId,
      groupCode,
      expenseDescription,
      expenseAmount,
      expenseBeneficiaryIds,
    } = req.body;

    debugLog('Creating expense', { groupCode, expensePayerId }, INFO);

    const { expensePayer, expenseBeneficiaries } =
      await verifyExpensePayerAndBeneficiaries(
        expensePayerId,
        expenseBeneficiaryIds,
        groupCode,
      );

    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;

    const newExpense = new Expense({
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: expenseBeneficiaryIds,
    });

    const expense = await newExpense.save();

    await expensePayer.updateTotalExpensesPaid();
    await Promise.all(
      expenseBeneficiaries.map((beneficiary) =>
        beneficiary.updateTotalExpenseBenefitted(),
      ),
    );

    await resetGroupSettlements(groupCode);

    debugLog('Expense created successfully', { expenseId: expense._id }, INFO);

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      expense,
      message: 'Expense created successfully',
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json(error);
    }

    debugLog(
      'Error creating expense',
      { error: error.message, stack: error.stack },
      LOG_ERROR,
    );

    if (error.name === 'ValidationError') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to create expense. Please try again later.',
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const {
      expensePayerId,
      groupCode,
      expenseDescription,
      expenseAmount,
      expenseBeneficiaryIds,
    } = req.body;

    debugLog('Updating expense', { expenseId, groupCode }, INFO);

    const { expensePayer, expenseBeneficiaries } =
      await verifyExpensePayerAndBeneficiaries(
        expensePayerId,
        expenseBeneficiaryIds,
        groupCode,
      );

    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;

    const updatedExpenseData = {
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: expenseBeneficiaryIds,
    };

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updatedExpenseData,
      { new: true, runValidators: true },
    );

    if (!updatedExpense) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Expense not found',
      });
    }

    const groupUsers = await User.find({ groupCode });

    await Promise.all(
      groupUsers.map(async (user) => {
        try {
          await user.updateTotalExpensesPaid();
          await user.updateTotalExpenseBenefitted();
        } catch (innerError) {
          debugLog(
            'Error updating user balance during expense update',
            { userId: user._id, error: innerError.message },
            LOG_ERROR,
          );
        }
      }),
    );

    await resetGroupSettlements(groupCode);

    return res.status(StatusCodes.OK).json({
      status: 'success',
      updatedExpense,
      message: 'Expense updated successfully.',
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).json(error);
    }

    debugLog(
      'Error updating expense',
      { error: error.message, stack: error.stack },
      LOG_ERROR,
    );

    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error updating expense',
        'Failed to update the expense. Please try again later.',
      );
      sendInternalError();
    }
  }
};

export const getExpenseInfo = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId)
      .populate('expensePayer', 'userName')
      .populate('expenseBeneficiaries', 'userName');

    if (expense) {
      touchGroupLastActive(expense.groupCode);
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { expense },
      message: 'Expense info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving expense info:',
      'Failed to retrieve the expense info. Please try again later.',
    );
    sendInternalError();
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expenseToDelete = await Expense.findById(expenseId)
      .populate('expensePayer')
      .populate('expenseBeneficiaries');

    if (!expenseToDelete) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'Expense not found',
      });
    }

    const { expensePayer, expenseBeneficiaries, groupCode } = expenseToDelete;

    await Expense.deleteOne({ _id: expenseToDelete._id });

    await resetGroupSettlements(groupCode);

    if (expensePayer) {
      await expensePayer.updateTotalExpensesPaid();
    }

    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        if (beneficiary) {
          await beneficiary.updateTotalExpenseBenefitted();
        }
      }),
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting expense:',
      'Failed to delete the expense. Please try again later.',
    );
    sendInternalError();
  }
};

export const listAllExpensesByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;

    touchGroupLastActive(groupCode);

    const expenses = await Expense.find({ groupCode });
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      expenses,
      message: 'Group expenses retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing expenses:',
      'Failed to list group expenses. Please try again later.',
    );
    sendInternalError();
  }
};

export const getExpensesTotalByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;

    touchGroupLastActive(groupCode);

    const totalExpenses = await Expense.aggregate([
      { $match: { groupCode } },
      { $group: { _id: null, total: { $sum: '$expenseAmount' } } },
    ]);

    res.status(StatusCodes.OK).json({
      status: 'success',
      expensesTotal: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
      message: 'Total group expenses retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error fetching total group expenses:',
      'Failed to fetch total group expenses. Please try again later.',
    );
    sendInternalError();
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      expenses,
      message: 'All expenses retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all expenses:',
      'Failed to list all expenses. Please try again later.',
    );
    sendInternalError();
  }
};

export const deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany();
    await User.updateMany(
      {},
      { totalExpensesPaidAmount: 0, totalExpenseBenefittedAmount: 0 },
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All expenses deleted successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting all expenses:',
      'Failed to delete all expenses. Please try again later.',
    );
    sendInternalError();
  }
};
