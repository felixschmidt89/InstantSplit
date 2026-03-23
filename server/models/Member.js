import { Schema, model } from 'mongoose';
import MEMBER_CONSTANTS from '../../shared/constants/models/memberConstants.js';
import COMMON_CONSTANTS from '../../shared/constants/models/commonConstants.js';
import EXPENSE_CONSTANTS from '../../shared/constants/models/expenseConstants.js';
import PAYMENT_CONSTANTS from '../../shared/constants/models/paymentConstants.js';
import LOG_LEVELS from '../../shared/constants/system/loggerConstants.js';
import Expense from './Expense.js';
import Payment from './Payment.js';
import debugLog from '../../shared/utils/debug/debugLog.js';

const { MEMBER_FIELDS, MEMBER_TYPE_VALUE } = MEMBER_CONSTANTS;
const { COMMON_MODEL_NAMES, COMMON_FIELDS, COMMON_LIMITS, COMMON_DEFINITIONS } =
  COMMON_CONSTANTS;
const { EXPENSE_FIELDS } = EXPENSE_CONSTANTS;
const { PAYMENT_FIELDS } = PAYMENT_CONSTANTS;

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
    [COMMON_FIELDS.TRANSACTION_TYPE]: {
      type: COMMON_DEFINITIONS.STRING,
      default: MEMBER_TYPE_VALUE,
      immutable: COMMON_DEFINITIONS.TRUE,
    },
    [MEMBER_FIELDS.NAME]: {
      type: COMMON_DEFINITIONS.STRING,
      trim: COMMON_DEFINITIONS.TRUE,
      required: COMMON_DEFINITIONS.TRUE,
      minlength: COMMON_LIMITS.NAME_MIN_LENGTH,
      maxlength: COMMON_LIMITS.NAME_MAX_LENGTH,
    },
    [COMMON_FIELDS.GROUP_CODE]: {
      type: COMMON_DEFINITIONS.STRING,
      required: COMMON_DEFINITIONS.TRUE,
    },
    [MEMBER_FIELDS.EXPENSES_PAID]: {
      type: COMMON_DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.EXPENSES_BENEFITTED]: {
      type: COMMON_DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.PAYMENTS_MADE]: {
      type: COMMON_DEFINITIONS.NUMBER,
      default: 0,
    },
    [MEMBER_FIELDS.PAYMENTS_RECEIVED]: {
      type: COMMON_DEFINITIONS.NUMBER,
      default: 0,
    },
  },
  {
    timestamps: COMMON_DEFINITIONS.TRUE,
    toJSON: { virtuals: COMMON_DEFINITIONS.TRUE },
    toObject: { virtuals: COMMON_DEFINITIONS.TRUE },
  },
);

memberSchema.virtual(MEMBER_FIELDS.BALANCE).get(function () {
  const balance =
    this[MEMBER_FIELDS.EXPENSES_PAID] +
    this[MEMBER_FIELDS.PAYMENTS_MADE] -
    this[MEMBER_FIELDS.EXPENSES_BENEFITTED] -
    this[MEMBER_FIELDS.PAYMENTS_RECEIVED];

  return COMMON_DEFINITIONS.NUMBER(balance);
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
      { $set: { [MEMBER_FIELDS.EXPENSES_PAID]: updatedTotal } },
    );
  } catch (error) {
    debugLog(
      'Error calculating expensesPaid',
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
      { $set: { [MEMBER_FIELDS.EXPENSES_BENEFITTED]: updatedTotal } },
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
      { $set: { [MEMBER_FIELDS.PAYMENTS_RECEIVED]: updatedTotal } },
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
      { $set: { [MEMBER_FIELDS.PAYMENTS_MADE]: updatedTotal } },
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

export default model(COMMON_MODEL_NAMES.MEMBER, memberSchema);
