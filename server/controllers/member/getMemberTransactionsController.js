import { StatusCodes } from 'http-status-codes';
import getMemberTransactionsService from '../../services/member/getMemberTransactionsService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';

const { URL_PARAMS } = API_ROUTES;
const { OK } = StatusCodes;

const getMemberTransactionsController = async (req, res, next) => {
  try {
    const memberId = req.params[URL_PARAMS.MEMBER_ID];

    const memberTransactions = await getMemberTransactionsService(memberId);

    const hasNoTransactions =
      !memberTransactions || memberTransactions.length === 0;

    return res.status(OK).json({
      status: 'success',
      data: {
        transactions: hasNoTransactions ? [] : memberTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getMemberTransactionsController;
