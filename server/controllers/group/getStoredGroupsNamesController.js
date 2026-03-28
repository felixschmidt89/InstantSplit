import { StatusCodes } from 'http-status-codes';
import getStoredGroupsNamesService from '../../services/group/getStoredGroupsNamesService.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';

const { OK } = StatusCodes;
const { STORED_GROUP_CODES } = PAYLOAD_KEYS;

const getStoredGroupsNamesController = async (req, res, next) => {
  try {
    const { [STORED_GROUP_CODES]: storedGroupCodes } = req.query;

    const groupCodesArray = storedGroupCodes ? storedGroupCodes.split(',') : [];

    const groups = await getStoredGroupsNamesService(groupCodesArray);

    return res.status(OK).json({
      success: true,
      data: { groups },
    });
  } catch (error) {
    next(error);
  }
};

export default getStoredGroupsNamesController;
