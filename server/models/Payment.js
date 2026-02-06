import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: true,
      min: 0.01,
      max: 99999.99,
    },
    paymentMaker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentRecipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = model('Payment', paymentSchema);

export default Payment;
