import { Schema, model } from 'mongoose';

import MEMBER from '../../shared/constants/models/memberConstants.js';
import COMMON from '../../shared/constants/models/commonConstants.js';
import EXPENSE from '../../shared/constants/models/expenseConstants.js';
import PAYMENT from '../../shared/constants/models/paymentConstants.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';
import Expense from './Expense.js';
import Payment from './Payment.js';
import debugLog from '../../shared/utils/debug/debugLog.js';

const { FIELDS: MEMBER_FIELDS } = MEMBER;
const {
  MODEL_NAMES,
  DEFINITIONS,
  FIELDS: COMMON_FIELDS,
  LIMITS: COMMON_LIMITS,
} = COMMON;
const { FIELDS: EXPENSE_FIELDS } = EXPENSE;
const { FIELDS: PAYMENT_FIELDS } = PAYMENT;

const extractAggregateTotal = (aggregateResult, operationName) => {
  const total = aggregateResult.length ? aggregateResult[0].total : 0;

  debugLog(
    `Aggregate total extracted for ${operationName}`,
    { total, rawResultLength: aggregateResult.length },
    LOG_LEVELS.LOG_DEBUG,
  );

  return total;
};

const memberSchema = new Schema(
  {
    [MEMBER_FIELDS.NAME]: {
      type: DEFINITIONS.STRING,
      trim: DEFINITIONS.TRUE,
      required: DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: DEFINITIONS.STRING,
      required: DEFINITIONS.TRUE,
    },
    [MEMBER_FIELDS.TOTAL_EXPENSES_PAID]: {
      type: DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.TOTAL_EXPENSES_BENEFITTED]: {
      type: DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.TOTAL_PAYMENTS_MADE]: {
      type: DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.TOTAL_PAYMENTS_RECEIVED]: {
      type: DEFINITIONS.NUMBER,
      default: 0,
    },
  },
  {
    timestamps: DEFINITIONS.TRUE,
    toJSON: { virtuals: DEFINITIONS.TRUE },
    toObject: { virtuals: DEFINITIONS.TRUE },
  },
);

memberSchema.virtual(MEMBER_FIELDS.BALANCE).get(function () {
  const balance =
    this[MEMBER_FIELDS.TOTAL_EXPENSES_PAID] +
    this[MEMBER_FIELDS.TOTAL_PAYMENTS_MADE] -
    this[MEMBER_FIELDS.TOTAL_EXPENSES_BENEFITTED] -
    this[MEMBER_FIELDS.TOTAL_PAYMENTS_RECEIVED];

  return DEFINITIONS.NUMBER(balance);
});

memberSchema.virtual(MEMBER_FIELDS.SETTLED).get(function () {
  return this.get(MEMBER_FIELDS.BALANCE) === 0;
});

memberSchema.methods.updateTotalExpensesPaid = async function () {
  const memberId = this[COMMON_FIELDS.ID];

  try {
    const totalExpensesPaid = await Expense.aggregate([
      { $match: { [EXPENSE_FIELDS.PAYER]: memberId } },
      { $group: { _id: null, total: { $sum: `$${EXPENSE_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregateTotal(
      totalExpensesPaid,
      'updateTotalExpensesPaid',
    );

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.TOTAL_EXPENSES_PAID]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpensesPaidAmount',
      { error: error.message, memberId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalExpenseBenefitted = async function () {
  const memberId = this[COMMON_FIELDS.ID];

  try {
    const totalExpenseBenefitted = await Expense.aggregate([
      { $match: { [EXPENSE_FIELDS.BENEFICIARIES]: memberId } },
      {
        $group: {
          _id: null,
          total: { $sum: `$${EXPENSE_FIELDS.AMOUNT_PER_BENEFICIARY}` },
        },
      },
    ]);

    const updatedTotal = extractAggregateTotal(
      totalExpenseBenefitted,
      'updateTotalExpenseBenefitted',
    );

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.TOTAL_EXPENSES_BENEFITTED]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalExpenseBenefittedAmount',
      { error: error.message, memberId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsReceived = async function () {
  const memberId = this[COMMON_FIELDS.ID];

  try {
    const totalPaymentsReceived = await Payment.aggregate([
      { $match: { [PAYMENT_FIELDS.RECIPIENT]: memberId } },
      { $group: { _id: null, total: { $sum: `$${PAYMENT_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregateTotal(
      totalPaymentsReceived,
      'updateTotalPaymentsReceived',
    );

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.TOTAL_PAYMENTS_RECEIVED]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Error calculating totalPaymentsReceivedAmount',
      { error: error.message, memberId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

memberSchema.methods.updateTotalPaymentsMadeAmount = async function () {
  const memberId = this[COMMON_FIELDS.ID];

  try {
    const totalPaymentsMade = await Payment.aggregate([
      { $match: { [PAYMENT_FIELDS.MAKER]: memberId } },
      { $group: { _id: null, total: { $sum: `$${PAYMENT_FIELDS.AMOUNT}` } } },
    ]);

    const updatedTotal = extractAggregateTotal(
      totalPaymentsMade,
      'updateTotalPaymentsMadeAmount',
    );

    await this.constructor.findOneAndUpdate(
      { [COMMON_FIELDS.ID]: memberId },
      { $set: { [MEMBER_FIELDS.TOTAL_PAYMENTS_MADE]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Error updating totalPaymentsMadeAmount',
      { error: error.message, memberId },
      LOG_LEVELS.LOG_ERROR,
    );
    throw error;
  }
};

export default model(MODEL_NAMES.MEMBER, memberSchema);
