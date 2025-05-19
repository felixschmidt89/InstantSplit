import { Schema, model } from 'mongoose';

const settlementSchema = new Schema(
  {
    from: {
      type: String,
      required: [true, 'Missing debtor username'],
    },
    to: {
      type: String,
      required: [true, 'Missing creditor username'],
    },
    amount: {
      type: Number,
      required: [true, 'Missing settlement amount'],
      min: [0.01, 'The settlement amount must be at least 0.01'],
      max: [99999.99, 'The settlement amount may not exceed 99999.99'],
    },
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
    },
  },
  {
    timestamps: true,
  },
);

const Settlement = model('Settlement', settlementSchema);

export default Settlement;
