import { Schema, model } from 'mongoose';

const settlementSchema = new Schema(
  {
    debtorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing ID of the debtor'],
    },
    creditorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing ID of the creditor'],
    },
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
  },
  {
    timestamps: true,
  },
);

const Settlement = model('Settlement', settlementSchema);

export default Settlement;
