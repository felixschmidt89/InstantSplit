import { StatusCodes } from 'http-status-codes';
import changeDataPurgeSettingService from '../../services/group/changeDataPurgeSettingService.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';

const { OK } = StatusCodes;
const { GROUP_FIELDS } = GROUP;

const changeDataPurgeSettingController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [GROUP_FIELDS.DATA_PURGE_ENABLED]: dataPurgeEnabled } = req.body;

    const group = await changeDataPurgeSettingService(
      groupCode,
      dataPurgeEnabled,
    );

    return res.status(OK).json({
      success: true,
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

export default changeDataPurgeSettingController;
