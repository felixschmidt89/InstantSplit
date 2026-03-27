import { StatusCodes } from 'http-status-codes';
import changeGroupNameService from '../../services/group/changeGroupNameService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const changeGroupNameController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [RESOURCE_IDS.GROUP_ID]: groupId } = req.params;
    const { name } = req.body;

    const group = await changeGroupNameService(groupId, groupCode, name);

    return res.status(OK).json({ group });
  } catch (error) {
    next(error);
  }
};

export default changeGroupNameController;
