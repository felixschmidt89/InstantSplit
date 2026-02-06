import { Schema, model } from 'mongoose';

const expenseSchema = new Schema(
  {
    expenseDescription: {
      type: String,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    expenseAmount: {
      type: Number,
      required: true,
      min: 0.01,
      max: 99999.99,
    },
    expenseAmountPerBeneficiary: {
      type: Number,
      required: true,
    },
    expensePayer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expenseBeneficiaries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    groupCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Expense = model('Expense', expenseSchema);

export default Expense;
