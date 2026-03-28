import { StatusCodes } from 'http-status-codes';
import getGroupInfoService from '../../services/group/getGroupInfoService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const getGroupInfoController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.GROUP_ID]: groupId } = req.params;

    const group = await getGroupInfoService(groupId);

    return res.status(OK).json({
      success: true,
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

export default getGroupInfoController;
