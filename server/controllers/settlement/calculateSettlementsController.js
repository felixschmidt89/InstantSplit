import { StatusCodes } from 'http-status-codes';
import calculateSettlementsService from '../../services/settlement/calculateSettlementsService.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { CREATED, BAD_REQUEST } = StatusCodes;
const { SETTLEMENT_KEYS } = PAYLOAD_KEYS;
const { SETTLEMENT_ERRORS } = ERROR_CODES;

const calculateSettlementsController = async (req, res, next) => {
  try {
    const { [SETTLEMENT_KEYS.SETTLEMENTS]: settlements } = req.body;
    const { groupCode } = req.context;

    const hasValidSettlements = Boolean(
      Array.isArray(settlements) && settlements.length > 0,
    );

    if (!hasValidSettlements) {
      return res.status(BAD_REQUEST).json({
        success: false,
        error: SETTLEMENT_ERRORS.INVALID_ARRAY,
      });
    }

    const savedSettlements = await calculateSettlementsService(
      groupCode,
      settlements,
    );

    return res.status(CREATED).json({
      success: true,
      data: { settlements: savedSettlements },
    });
  } catch (error) {
    next(error);
  }
};

export default calculateSettlementsController;
