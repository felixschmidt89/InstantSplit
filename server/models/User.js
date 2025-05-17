import { Schema, model } from 'mongoose';
import Expense from './Expense.js';
import Payment from './Payment.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, 'Missing user name'],
      minlength: [1, 'Username must be at least 1 character long'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
    },
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
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
    creditorIndex: {
      type: Number,
      default: 0,
    },
    debitorIndex: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtual properties to be included in JSON output
    toObject: { virtuals: true }, // Enable virtual properties to be included in object representations
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

/** Calculates and updates the totalExpensesPaidAmount of a user
 * @throws {Error} -
 */
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

    // eslint-disable-next-line no-use-before-define
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpensesPaidAmount: totalExpensesPaid[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating total expensesPaidAmount:',
      error,
    );
    throw error;
  }
};

/** Calculates and updates the totalExpensesBenefittedAmount of a user
 * @throws {Error} -
 */
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
    // eslint-disable-next-line no-use-before-define
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpenseBenefittedAmount: totalExpenseBenefitted[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating total benefittedExpensesAmount:',
      error,
    );
    throw error;
  }
};

/** Calculates and updates the totalPaymentsReceivedAmount of a user
 * @throws {Error} -
 */
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
    // eslint-disable-next-line no-use-before-define
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsReceivedAmount: totalPaymentsReceived[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating totalPaymentsReceivedAmount:',
      error,
    );
    throw error;
  }
};

/** Calculates and updates the totalPaymentsMadeAmount of a user
 * @throws {Error} -
 */ userSchema.methods.updateTotalPaymentsMadeAmount = async function () {
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

    // eslint-disable-next-line no-use-before-define
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalPaymentsMadeAmount: totalPaymentsMade[0]?.total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating totalPaymentsMadeAmount:',
      error,
    );
    throw error;
  }
};

const User = model('User', userSchema);

export default User;
