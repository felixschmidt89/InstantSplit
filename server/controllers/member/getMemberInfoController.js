import { StatusCodes } from 'http-status-codes';
import getMemberInfoService from '../../services/member/getMemberInfoService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const getMemberInfoController = async (req, res, next) => {
  try {
    const { [RESOURCE_IDS.MEMBER_ID]: memberId } = req.params;

    const member = await getMemberInfoService(memberId);

    return res.status(OK).json({
      success: true,
      data: { member },
    });
  } catch (error) {
    next(error);
  }
};

export default getMemberInfoController;
