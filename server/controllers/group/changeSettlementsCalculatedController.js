import { StatusCodes } from 'http-status-codes';
import changeSettlementsCalculatedService from '../../services/group/changeSettlementsCalculatedService.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';

const { OK } = StatusCodes;
const { GROUP_FIELDS } = GROUP;

const changeSettlementsCalculatedController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: settlementsCalculated } =
      req.body;

    const group = await changeSettlementsCalculatedService(
      groupCode,
      settlementsCalculated,
    );

    return res.status(OK).json({
      success: true,
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

export default changeSettlementsCalculatedController;
