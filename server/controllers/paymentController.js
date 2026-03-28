import { StatusCodes } from 'http-status-codes';
import Payment from '../models/Payment.js';
import User from '../models/Member.js';
import {
  errorLog,
  sendInternalError,
  sendValidationError,
} from '../utils/errorUtils.js';
import { resetGroupSettlements } from '../utils/group/resetGroupSettlements.js';

export const getPaymentInfo = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
      .populate('paymentMaker', 'userName')
      .populate('paymentRecipient', 'userName');

    if (!payment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'Payment not found',
      });
    }

    const { groupCode } = payment;

    res.status(StatusCodes.OK).json({
      status: 'success',
      payment,
      message: 'Payment info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving payment info',
      'Failed to retrieve payment information. Please try again later.',
    );
    sendInternalError();
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentToDelete = await Payment.findById(paymentId)
      .populate('paymentRecipient')
      .populate('paymentMaker');

    if (!paymentToDelete) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'Payment not found',
      });
    }

    const { groupCode, paymentRecipient, paymentMaker } = paymentToDelete;

    await Payment.deleteOne({ _id: paymentToDelete._id });
    await resetGroupSettlements(groupCode);

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting payment:',
      'Failed to delete payment. Please try again later.',
    );
    sendInternalError();
  }
};
