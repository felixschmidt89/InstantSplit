import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Group from '../../models/Group.js';

const { INFO } = LOG_LEVELS;
const { COMMON_FIELDS } = COMMON;
const { GROUP_FIELDS } = GROUP;

const getGroupCurrencyService = async (groupCode) => {
  debugLog('Querying database for group currency', { groupCode }, INFO);

  const group = await Group.findOne({ [COMMON_FIELDS.GROUP_CODE]: groupCode })
    .select(GROUP_FIELDS.CURRENCY)
    .lean();

  if (!group) {
    debugLog('Currency lookup: No group found', { groupCode }, INFO);
    return null;
  }

  const currency = group[GROUP_FIELDS.CURRENCY];

  debugLog('Currency retrieved from DB', { groupCode, currency }, INFO);

  return currency;
};

export default getGroupCurrencyService;
