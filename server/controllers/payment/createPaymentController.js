import { StatusCodes } from 'http-status-codes';
import createPaymentService from '../../services/payment/createPaymentService.js';

const { CREATED } = StatusCodes;

const createPaymentController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { makerId, recipientId, amount } = req.body;

    const payment = await createPaymentService({
      makerId,
      recipientId,
      amount,
      groupCode,
    });

    return res.status(CREATED).json({
      success: true,
      data: { payment },
    });
  } catch (error) {
    next(error);
  }
};

export default createPaymentController;
