import { StatusCodes } from 'http-status-codes';
import createPaymentService from '../../services/payment/createPaymentService.js';

const { CREATED } = StatusCodes;

const createPaymentController = async (req, res, next) => {
  try {
    const { makerId, recipientId, amount } = req.body;
    const { groupCode } = req.context;

    const payment = await createPaymentService({
      makerId,
      recipientId,
      amount,
      groupCode,
    });

    return res.status(CREATED).json({
      status: 'success',
      data: {
        payment,
      },
      message: 'Payment created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default createPaymentController;
