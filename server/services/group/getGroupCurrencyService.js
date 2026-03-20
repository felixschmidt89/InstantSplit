import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import Group from '../../models/Group.js';

const { INFO } = LOG_LEVELS;

const getGroupCurrencyService = async (groupCode) => {
  debugLog('Querying database for group currency', { groupCode }, INFO);

  const group = await Group.findOne({ [COMMON.FIELDS.GROUP_CODE]: groupCode })
    .select(GROUP.FIELDS.CURRENCY)
    .lean();

  if (!group) {
    debugLog('Currency lookup: No group found', { groupCode }, INFO);
    return null;
  }

  const currency = group[GROUP.FIELDS.CURRENCY];

  debugLog('Currency retrieved from DB', { groupCode, currency }, INFO);

  return currency;
};

export default getGroupCurrencyService;
