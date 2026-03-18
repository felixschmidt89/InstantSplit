import { Schema, model } from 'mongoose';

import Expense from './Expense.js';
import Payment from './Payment.js';
import { LOG_LEVELS } from '../../shared/constants/debugConstants.js';
import debugLog from '../../shared/utils/debug/debugLog.js';

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

const memberSchema = new Schema(
  {
    memberName: {
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

memberSchema.virtual('memberBalance').get(function () {
  const balance =
    this.totalExpensesPaidAmount +
    this.totalPaymentsMadeAmount -
    this.totalExpenseBenefittedAmount -
    this.totalPaymentsReceivedAmount;

  return Number(balance);
});

memberSchema.virtual('expensesSettled').get(function () {
  return this.get('memberBalance') === 0;
});

memberSchema.methods.updateTotalExpensesPaid = async function () {
  const memberId = this._id;

  try {
    const totalExpensesPaid = await Expense.aggregate([
      {
        $match: { expensePayer: memberId },
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
      { _id: memberId },
      {
        $set: {
          totalExpensesPaidAmount: updatedTotalExpensesPaidAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpensesPaidAmount',
      { error: error.message, memberId },
      LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalExpenseBenefitted = async function () {
  const memberId = this._id;

  try {
    const totalExpenseBenefitted = await Expense.aggregate([
      {
        $match: {
          expenseBeneficiaries: memberId,
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
      { _id: memberId },
      {
        $set: {
          totalExpenseBenefittedAmount: updatedTotalExpenseBenefittedAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpenseBenefittedAmount',
      { error: error.message, memberId },
      LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsReceived = async function () {
  const memberId = this._id;

  try {
    const totalPaymentsReceived = await Payment.aggregate([
      {
        $match: { paymentRecipient: memberId },
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
      { _id: memberId },
      {
        $set: {
          totalPaymentsReceivedAmount: updatedTotalPaymentsReceivedAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalPaymentsReceivedAmount',
      { error: error.message, memberId },
      LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsMadeAmount = async function () {
  const memberId = this._id;

  try {
    const totalPaymentsMade = await Payment.aggregate([
      {
        $match: { paymentMaker: memberId },
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
      { _id: memberId },
      {
        $set: {
          totalPaymentsMadeAmount: updatedTotalPaymentsMadeAmount,
        },
      },
    );
  } catch (error) {
    debugLog(
      'Error updating totalPaymentsMadeAmount',
      { error: error.message, memberId },
      LOG_ERROR,
    );
    throw error;
  }
};

const Member = model('Member', memberSchema);

export default Member;
