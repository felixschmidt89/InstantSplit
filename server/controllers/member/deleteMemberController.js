import { StatusCodes } from 'http-status-codes';
import deleteMemberService from '../../services/member/deleteMemberService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';

const { URL_PARAMS } = API_ROUTES;
const { NO_CONTENT } = StatusCodes;

const deleteMemberController = async (req, res, next) => {
  try {
    const memberId = req.params[URL_PARAMS.MEMBER_ID];

    await deleteMemberService(memberId);

    return res.status(NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default deleteMemberController;
