import { StatusCodes } from 'http-status-codes';
import changeGroupCurrencyService from '../../services/group/changeGroupCurrencyService.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';

const { OK } = StatusCodes;
const { GROUP_FIELDS } = GROUP;

const changeGroupCurrencyController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [GROUP_FIELDS.CURRENCY]: currency } = req.body;

    const group = await changeGroupCurrencyService(groupCode, currency);

    return res.status(OK).json({
      success: true,
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

export default changeGroupCurrencyController;
