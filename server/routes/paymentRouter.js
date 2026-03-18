import express from 'express';
import {
  createPayment,
  listAllPayments,
  deleteAllPayments,
  getPaymentInfo,
  deletePayment,
  updatePayment,
} from '../controllers/paymentController.js';
import { paymentValidator } from '../validators/paymentValidator.js';

const router = express.Router();

// Create payment
router.post('/', paymentValidator, createPayment);

// Update payment
router.put('/:paymentId', paymentValidator, updatePayment);

// Get payment info by id
router.get('/:paymentId', getPaymentInfo);

// Delete payment
router.delete('/:paymentId', deletePayment);

export default router;
