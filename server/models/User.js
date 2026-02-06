import { Schema, model } from 'mongoose';
import Expense from './Expense.js';
import Payment from './Payment.js';
import { debugLog } from '../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';

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

    // CODECHANGE: Use this.constructor to avoid circular dependency/linter errors
    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpensesPaidAmount: totalExpensesPaid[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpensesPaidAmount',
      { error: error.message, userId },
      LOG_LEVELS.LOG_ERROR,
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

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpenseBenefittedAmount: totalExpenseBenefitted[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpenseBenefittedAmount',
      { error: error.message, userId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

userSchema.methods.updateTotalPaymentsReceived = async function () {
  try {
    const userId = this._id;

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

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsReceivedAmount: totalPaymentsReceived[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalPaymentsReceivedAmount',
      { error: error.message, userId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

userSchema.methods.updateTotalPaymentsMadeAmount = async function () {
  try {
    const userId = this._id;

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

    await this.constructor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsMadeAmount: totalPaymentsMade[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error updating totalPaymentsMadeAmount',
      { error: error.message, userId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

const User = model('User', userSchema);

export default User;
