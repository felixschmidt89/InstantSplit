import { StatusCodes } from 'http-status-codes';

import getGroupInfoService from '../../services/group/getGroupInfoService.js';

const { OK, NO_CONTENT } = StatusCodes;

const getGroupInfoController = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const group = await getGroupInfoService(groupId);

    if (!group) {
      return res.status(NO_CONTENT).json({
        group: null,
      });
    }

    return res.status(OK).json({ group });
  } catch (error) {
    next(error);
  }
};

export default getGroupInfoController;
