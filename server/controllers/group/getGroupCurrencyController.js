import { StatusCodes } from 'http-status-codes';
import { getGroupCurrencyService } from '../../services/group/getGroupCurrencyService.js';

const { OK } = StatusCodes;

export const getGroupCurrencyController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;

    const currency = await getGroupCurrencyService(groupCode);

    return res.status(OK).json({ currency });
  } catch (error) {
    next(error);
  }
};
