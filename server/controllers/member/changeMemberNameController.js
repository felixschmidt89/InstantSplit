import { StatusCodes } from 'http-status-codes';
import changeMemberNameService from '../../services/member/changeMemberNameService.js';
import RESOURCE from '../../../shared/constants/domain/resourceConstants.js';

const { OK } = StatusCodes;
const { RESOURCE_IDS } = RESOURCE;

const changeMemberNameController = async (req, res, next) => {
  try {
    const { groupCode } = req.context;
    const { [RESOURCE_IDS.MEMBER_ID]: memberId } = req.params;
    const { name } = req.body;

    const member = await changeMemberNameService({
      memberId,
      name,
      groupCode,
    });

    return res.status(OK).json({
      success: true,
      data: { member },
    });
  } catch (error) {
    next(error);
  }
};

export default changeMemberNameController;
