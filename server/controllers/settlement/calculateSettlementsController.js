import { StatusCodes } from 'http-status-codes';
import calculateSettlementsService from '../../services/settlement/calculateSettlementsService.js';

const { OK } = StatusCodes;

const calculateSettlementsController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const settlements = await calculateSettlementsService(groupCode);

    return res.status(OK).json({
      success: true,
      data: { settlements },
    });
  } catch (error) {
    next(error);
  }
};

export default calculateSettlementsController;
