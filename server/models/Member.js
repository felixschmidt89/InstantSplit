import { Schema, model } from 'mongoose';
import MEMBER from '../../shared/constants/models/memberConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../shared/constants/models/expenseConstants.js';
import PAYMENT_CONSTANTS from '../../shared/constants/models/paymentConstants.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';
import debugLog from '../../shared/utils/debug/debugLog.js';
import extractAggregationTotal from '../utils/database/extractAggregationTotal.js';
import Expense from './Expense.js';
import Payment from './Payment.js';

const { MEMBER_FIELDS } = MEMBER;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS } = COMMON_CONSTANTS;
const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { PAYMENT_FIELDS } = PAYMENT_CONSTANTS;
const { ERROR } = LOG_LEVELS;

const memberSchema = new Schema(
  {
    [MEMBER_FIELDS.NAME]: {
      type: String,
      trim: true,
      required: true,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: String,
      required: true,
    },
    [MEMBER_FIELDS.EXPENSES_PAID]: { type: Number, default: 0 },
    [MEMBER_FIELDS.EXPENSES_BENEFITTED]: { type: Number, default: 0 },
    [MEMBER_FIELDS.PAYMENTS_MADE]: { type: Number, default: 0 },
    [MEMBER_FIELDS.PAYMENTS_RECEIVED]: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

memberSchema.virtual(MEMBER_FIELDS.BALANCE).get(function () {
  return (
    this[MEMBER_FIELDS.EXPENSES_PAID] +
    this[MEMBER_FIELDS.PAYMENTS_MADE] -
    this[MEMBER_FIELDS.EXPENSES_BENEFITTED] -
    this[MEMBER_FIELDS.PAYMENTS_RECEIVED]
  );
});

memberSchema.virtual(MEMBER_FIELDS.SETTLED).get(function () {
  return this.get(MEMBER_FIELDS.BALANCE) === 0;
});

memberSchema.methods.updateTotalExpensesPaid = async function () {
  const memberId = this[COMMON_FIELDS.ID];
  try {
    const result = await Expense.aggregate([
      { $match: { [EXPENSE_FIELDS.PAYER]: memberId } },
      { $group: { _id: null, total: { $sum: `$${EXPENSE_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregationTotal(result);

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.EXPENSES_PAID]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Failed to update expenses paid',
      { error: error.message, memberId },
      ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalExpenseBenefitted = async function () {
  const memberId = this[COMMON_FIELDS.ID];
  try {
    const result = await Expense.aggregate([
      { $match: { [EXPENSE_FIELDS.BENEFICIARIES]: memberId } },
      {
        $group: {
          _id: null,
          total: { $sum: `$${EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY}` },
        },
      },
    ]);

    const updatedTotal = extractAggregationTotal(result);

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Failed to update expense benefitted',
      { error: error.message, memberId },
      ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsReceived = async function () {
  const memberId = this[COMMON_FIELDS.ID];
  try {
    const result = await Payment.aggregate([
      { $match: { [PAYMENT_FIELDS.RECIPIENT]: memberId } },
      { $group: { _id: null, total: { $sum: `$${PAYMENT_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregationTotal(result);

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.PAYMENTS_RECEIVED]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Failed to update payments received',
      { error: error.message, memberId },
      ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsMadeAmount = async function () {
  const memberId = this[COMMON_FIELDS.ID];
  try {
    const result = await Payment.aggregate([
      { $match: { [PAYMENT_FIELDS.MAKER]: memberId } },
      { $group: { _id: null, total: { $sum: `$${PAYMENT_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregationTotal(result);

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.PAYMENTS_MADE]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Failed to update payments made',
      { error: error.message, memberId },
      ERROR,
    );
    throw error;
  }
};

export default model(COMMON_MODEL_NAMES.MEMBER, memberSchema);
