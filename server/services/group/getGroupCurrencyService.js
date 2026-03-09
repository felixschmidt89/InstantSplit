import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { COMMON_FIELDS } from '../../../shared/constants/models/commonConstants.js';
import { GROUP_FIELDS } from '../../../shared/constants/models/groupConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import Group from '../../models/Group.js';

const { INFO } = LOG_LEVELS;
const { GROUPCODE } = COMMON_FIELDS;
const { GROUP_CURRENCY } = GROUP_FIELDS;

export const getGroupCurrencyService = async (groupCode) => {
  debugLog('Querying database for group currency', { groupCode }, INFO);

  const group = await Group.findOne({ [GROUPCODE]: groupCode })
    .select(GROUP_CURRENCY)
    .lean();

  if (!group) {
    debugLog('Currency lookup: No group found', { groupCode }, INFO);
    return null;
  }

  const currency = group[GROUP_CURRENCY];

  debugLog('Currency retrieved from DB', { groupCode, currency }, INFO);

  return currency;
};
