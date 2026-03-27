import { StatusCodes } from 'http-status-codes';
import createGroupService from '../../services/group/createGroupService.js';

const { CREATED } = StatusCodes;

const createGroupController = async (req, res, next) => {
  try {
    const { name } = req.body;

    const group = await createGroupService(name);

    return res.status(CREATED).json({ group });
  } catch (error) {
    next(error);
  }
};

export default createGroupController;
