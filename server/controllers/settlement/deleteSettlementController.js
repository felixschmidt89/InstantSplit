import { StatusCodes } from 'http-status-codes';
import deleteSettlementService from '../../services/settlement/deleteSettlementService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';
import ERROR_CODES from '../../../shared/constants/system/errorConstants.js';

const { NO_CONTENT, NOT_FOUND } = StatusCodes;
const { SETTLEMENT_ID } = API_ROUTES.URL_PARAMS;
const { SETTLEMENT_ERRORS } = ERROR_CODES;

const deleteSettlementController = async (req, res, next) => {
  try {
    const { [SETTLEMENT_ID]: settlementId } = req.params;
    const { groupCode } = req.context;

    const isDeleted = await deleteSettlementService(groupCode, settlementId);

    if (!isDeleted) {
      return res.status(NOT_FOUND).json({
        success: false,
        error: SETTLEMENT_ERRORS.NOT_FOUND,
      });
    }

    return res.status(NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default deleteSettlementController;
