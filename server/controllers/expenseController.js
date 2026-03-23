import { StatusCodes } from 'http-status-codes';

import Expense from '../models/Expense.js';
import User from '../models/Member.js';

import {
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import debugLog from '../../shared/utils/debug/debugLog.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';

import { verifyExpensePayerAndBeneficiaries } from '../utils/expense/verifyExpensePayerAndBeneficiaries.js';
import { resetGroupSettlements } from '../utils/group/resetGroupSettlements.js';

const { LOG_ERROR, INFO } = LOG_LEVELS;

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

    res.status(StatusCodes.OK).json({
      status: 'success',
      expense,
      message: 'Expense info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving expense info:',
      'Failed to retrieve the expense info. Please try again later.',
    );
    sendInternalError(res);
  }
};
