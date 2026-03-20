import { StatusCodes } from 'http-status-codes';

import getMemberInfoService from '../../services/member/getMemberInfoService.js';

const { OK } = StatusCodes;

const getMemberInfoController = async (req, res, next) => {
  try {
    const { memberId } = req.params;

    const member = await getMemberInfoService(memberId);

    res.status(OK).json({
      member,
    });
  } catch (error) {
    next(error);
  }
};

export default getMemberInfoController;
