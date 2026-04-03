import Group from '../../models/Group.js';
import Settlement from '../../models/Settlement.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const { GROUP_FIELDS } = GROUP;
const { COMMON_FIELDS } = COMMON;

const setGroupSettlementsCalculated = async (groupCode, isCalculated) => {
  const query = { [COMMON_FIELDS.GROUP_CODE]: groupCode };

  if (!isCalculated) {
    await Settlement.deleteMany(query);
  }

  return await Group.findOneAndUpdate(
    query,
    { $set: { [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: isCalculated } },
    { new: true },
  ).lean();
};

export default setGroupSettlementsCalculated;
