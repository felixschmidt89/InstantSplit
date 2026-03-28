import express from 'express';
import {
  createPayment,
  getPaymentInfo,
  deletePayment,
  updatePayment,
} from '../controllers/paymentController.js';

const router = express.Router();

// Create payment
router.post('/', createPayment);

// Update payment
router.put('/:paymentId', updatePayment);

// Get payment info by id
router.get('/:paymentId', getPaymentInfo);

// Delete payment
router.delete('/:paymentId', deletePayment);

export default router;
