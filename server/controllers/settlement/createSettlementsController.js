import { StatusCodes } from 'http-status-codes';
import createSettlementsService from '../../services/settlement/createSettlementsService.js';

const { CREATED } = StatusCodes;

const createSettlementsController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { settlements } = req.body;

    const savedSettlements = await createSettlementsService(
      groupCode,
      settlements,
    );

    res.status(CREATED).json({
      success: true,
      data: { settlements: savedSettlements },
    });
  } catch (error) {
    next(error);
  }
};

export default createSettlementsController;
