import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import Expense from '../models/Expense.js';
import User from '../models/User.js';

import {
  devLog,
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { updateFixedDebitorCreditorOrderSetting } from '../utils/databaseUtils.js';
import { deleteAllSettlementsForGroup } from './settlementController.js';
import { debugLog } from '../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';
import { touchGroupLastActive } from '../utils/group/touchGroupLastActive.js';

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

    // 1. Validate Payload
    if (!expensePayerId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Missing expense payer ID',
      });
    }

    if (!expenseBeneficiaryIds || !expenseBeneficiaryIds.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'At least 1 expense beneficiary is required',
      });
    }

    // 2. Fetch & Validate Users (Payer)
    const expensePayer = await User.findById(expensePayerId);

    if (!expensePayer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'Expense payer not found',
      });
    }

    // Security Check: Ensure payer belongs to the group
    if (expensePayer.groupCode !== groupCode) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: 'fail',
        message: 'Payer does not belong to this group',
      });
    }

    // 3. Fetch & Validate Users (Beneficiaries)
    const expenseBeneficiaries = await User.find({
      _id: { $in: expenseBeneficiaryIds },
      groupCode, // Ensure they belong to the group
    });

    if (expenseBeneficiaries.length !== expenseBeneficiaryIds.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'One or more beneficiaries could not be found in this group',
      });
    }

    // 4. Calculate Split
    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;

    // 5. Create Expense
    const newExpense = new Expense({
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: expenseBeneficiaryIds,
    });

    const expense = await newExpense.save();

    // 6. Update User Balances
    // Update Payer
    await expensePayer.updateTotalExpensesPaid();

    // Update Beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map((beneficiary) =>
        beneficiary.updateTotalExpenseBenefitted(),
      ),
    );

    // 7. Trigger Group Side Effects
    await deleteAllSettlementsForGroup(groupCode);
    updateFixedDebitorCreditorOrderSetting(groupCode, false);
    touchGroupLastActive(groupCode);

    debugLog('Expense created successfully', { expenseId: expense._id }, INFO);

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      expense,
      message: 'Expense created successfully',
    });
  } catch (error) {
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
      expensePayerName,
      groupCode,
      expenseDescription,
      expenseAmount,
      expenseBeneficiariesNames,
    } = req.body;

    // Validate if expensePayerName is provided
    if (!expensePayerName) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Expense payer name is required',
      });
    }

    // Validate if expenseBeneficiariesNames is provided and has at least one item
    if (!expenseBeneficiariesNames || !expenseBeneficiariesNames.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'At least 1 expense beneficiary is required',
      });
    }

    const expensePayer = await User.findOne({
      userName: { $in: expensePayerName },
      groupCode,
    });

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupCode,
    });

    const groupUsers = await User.find({
      groupCode,
    });

    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;
    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const updatedExpenseData = {
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: beneficiaryIds,
    };

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updatedExpenseData,
      { new: true, runValidators: true },
    );

    await deleteAllSettlementsForGroup(groupCode);
    updateFixedDebitorCreditorOrderSetting(groupCode, false);
    touchGroupLastActive(groupCode);

    // Update total expenses paid and total expenses benefitted for all users of the group
    await Promise.all(
      groupUsers.map(async (userId) => {
        try {
          const user = await User.findById(userId);
          if (!user) {
            return;
          }
          await user.updateTotalExpensesPaid();
          await user.updateTotalExpenseBenefitted();
        } catch (error) {
          errorLog(
            error,
            "Error updating group users' total expenses paid and benefitted",
            'Failed to update expense. Please try again later.',
          );
          sendInternalError();
        }
      }),
    );

    if (!updatedExpense) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Expense not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'success',
      updatedExpense,
      message: 'Expense updated successfully.',
    });
  } catch (error) {
    devLog('error:', error);
    if (error.name === 'ValidationError') {
      sendValidationError(res, error);
    } else {
      errorLog(
        error,
        'Error creating expense:',
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

    const groupCode = expense.groupCode;
    touchGroupLastActive(groupCode);

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
    sendInternalError();
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expenseToDelete = await Expense.findById(expenseId)
      .populate('expensePayer')
      .populate('expenseBeneficiaries');

    const { expensePayer, expenseBeneficiaries, groupCode } = expenseToDelete;

    await Expense.deleteOne({ _id: expenseToDelete._id });

    await deleteAllSettlementsForGroup(groupCode);
    updateFixedDebitorCreditorOrderSetting(groupCode, false);
    touchGroupLastActive(groupCode);

    // Update total expenses paid by the expense payer
    await expensePayer.updateTotalExpensesPaid();

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        await beneficiary.updateTotalExpenseBenefitted();
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

    // Calculate the sum of all expenses associated with the groupcode
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
      'Failed to lost total group expenses. Please try again later.',
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
