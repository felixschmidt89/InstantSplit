import Settlement from '../../models/Settlement.js';
import Group from '../../models/Group.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';

const { COMMON_FIELDS } = COMMON;
const { GROUP_FIELDS } = GROUP;

const createSettlementsService = async (groupCode, settlements) => {
  await Settlement.deleteMany({ [COMMON_FIELDS.GROUP_CODE]: groupCode });

  const createdSettlements = await Settlement.insertMany(settlements);

  await Group.findOneAndUpdate(
    { [COMMON_FIELDS.GROUP_CODE]: groupCode },
    { $set: { [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: true } },
  );

  return createdSettlements;
};

export default createSettlementsService;
