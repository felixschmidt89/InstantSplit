import { StatusCodes } from 'http-status-codes';

import changeGroupNameService from '../../services/group/changeGroupNameService.js';

const { OK } = StatusCodes;

const changeGroupNameController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { groupName } = req.body;

    const group = await changeGroupNameService(groupId, groupName);

    return res.status(OK).json({ group });
  } catch (error) {
    next(error);
  }
};

export default changeGroupNameController;
