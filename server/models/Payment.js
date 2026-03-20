import { Schema, model } from 'mongoose';
import {
  PAYMENT_FIELDS,
  PAYMENT_LIMITS,
} from '../../shared/constants/models/paymentConstants.js';
import {
  COMMON_FIELDS,
  COMMON_DEFINITIONS,
  MODEL_NAMES,
} from '../../shared/constants/models/commonConstants.js';

const { PAYMENT_AMOUNT, PAYMENT_MAKER, PAYMENT_RECIPIENT } = PAYMENT_FIELDS;

const { AMOUNT_MIN, AMOUNT_MAX } = PAYMENT_LIMITS;

const { GROUP_CODE } = COMMON_FIELDS;
const { NUMBER, STRING, OBJECT_ID, TRUE } = COMMON_DEFINITIONS;
const { PAYMENT, MEMBER } = MODEL_NAMES;

const paymentSchema = new Schema(
  {
    [PAYMENT_AMOUNT]: {
      type: NUMBER,
      required: TRUE,
      min: AMOUNT_MIN,
      max: AMOUNT_MAX,
    },
    [PAYMENT_MAKER]: {
      type: OBJECT_ID,
      ref: MEMBER,
      required: TRUE,
    },
    [PAYMENT_RECIPIENT]: {
      type: OBJECT_ID,
      ref: MEMBER,
      required: TRUE,
    },
    [GROUP_CODE]: {
      type: STRING,
      required: TRUE,
    },
  },
  {
    timestamps: TRUE,
  },
);

const Payment = model(PAYMENT, paymentSchema);

export default Payment;
