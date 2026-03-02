import { Schema, model } from 'mongoose';

import Expense from './Expense.js';
import Payment from './Payment.js';
import { debugLog } from '../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';

const { LOG_ERROR, LOG_DEBUG } = LOG_LEVELS;

const extractAggregateTotal = (aggregateResult, operationName) => {
  const total = aggregateResult.length ? aggregateResult[0].total : 0;

  debugLog(
    `Aggregate total extracted for ${operationName}`,
    { total, rawResultLength: aggregateResult.length },
    LOG_DEBUG,
  );

  return total;
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    groupCode: {
      type: String,
      required: true,
    },
    totalExpensesPaidAmount: {
      type: Number,
      default: 0,
    },
    totalExpenseBenefittedAmount: {
      type: Number,
      default: 0,
    },
    totalPaymentsMadeAmount: {
      type: Number,
      default: 0,
    },
    totalPaymentsReceivedAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual properties
userSchema.virtual('userBalance').get(function () {
  const balance =
    this.totalExpensesPaidAmount +
    this.totalPaymentsMadeAmount -
    this.totalExpenseBenefittedAmount -
    this.totalPaymentsReceivedAmount;
  return Number(balance);
});

userSchema.virtual('expensesSettled').get(function () {
  return this.get('userBalance') === 0;
});

// METHODS
userSchema.methods.updateTotalExpensesPaid = async function () {
  const userId = this._id;

  try {
    const totalExpensesPaid = await Expense.aggregate([
      {
        $match: { expensePayer: userId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$expenseAmount' },
        },
      },
    ]);

    const updatedTotalExpensesPaidAmount = extractAggregateTotal(
      totalExpensesPaid,
      'updateTotalExpensesPaid',
    );

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpensesPaidAmount: updatedTotalExpensesPaidAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpensesPaidAmount',
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};

userSchema.methods.updateTotalExpenseBenefitted = async function () {
  const userId = this._id;

  try {
    const totalExpenseBenefitted = await Expense.aggregate([
      {
        $match: {
          expenseBeneficiaries: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$expenseAmountPerBeneficiary' },
        },
      },
    ]);

    const updatedTotalExpenseBenefittedAmount = extractAggregateTotal(
      totalExpenseBenefitted,
      'updateTotalExpenseBenefitted',
    );

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpenseBenefittedAmount: updatedTotalExpenseBenefittedAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpenseBenefittedAmount',
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};

userSchema.methods.updateTotalPaymentsReceived = async function () {
  const userId = this._id;

  try {
    const totalPaymentsReceived = await Payment.aggregate([
      {
        $match: { paymentRecipient: userId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);

    const updatedTotalPaymentsReceivedAmount = extractAggregateTotal(
      totalPaymentsReceived,
      'updateTotalPaymentsReceived',
    );

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsReceivedAmount: updatedTotalPaymentsReceivedAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalPaymentsReceivedAmount',
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};

userSchema.methods.updateTotalPaymentsMadeAmount = async function () {
  const userId = this._id;

  try {
    const totalPaymentsMade = await Payment.aggregate([
      {
        $match: { paymentMaker: userId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentAmount' },
        },
      },
    ]);

    const updatedTotalPaymentsMadeAmount = extractAggregateTotal(
      totalPaymentsMade,
      'updateTotalPaymentsMadeAmount',
    );

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsMadeAmount: updatedTotalPaymentsMadeAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error updating totalPaymentsMadeAmount',
      { error: error.message, userId },
      LOG_ERROR,
    );
    throw error;
  }
};

const User = model('User', userSchema);

export default User;
