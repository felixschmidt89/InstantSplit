import { Schema, model } from 'mongoose';

const settlementSchema = new Schema(
  // TODO: Use ObjectId references for from and to, add migration script to update existing settlements
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
      required: true,
      min: 0.01,
      max: 99999.99,
    },
    groupCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Settlement = model('Settlement', settlementSchema);

export default Settlement;
