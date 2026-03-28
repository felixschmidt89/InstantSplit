import { StatusCodes } from 'http-status-codes';
import checkGroupCodeService from '../../services/group/checkGroupCodeService.js';
import API_ROUTES from '../../../shared/constants/api/apiRouteConstants.js';

const { OK } = StatusCodes;
const {
  URL_PARAMS: { GROUP_ID },
} = API_ROUTES;

const checkGroupCodeController = async (req, res, next) => {
  try {
    const { [GROUP_ID]: groupCode } = req.params;

    const exists = await checkGroupCodeService(groupCode);

    return res.status(OK).json({
      success: true,
      data: { exists },
    });
  } catch (error) {
    next(error);
  }
};

export default checkGroupCodeController;
