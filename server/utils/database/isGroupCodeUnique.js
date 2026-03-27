import Group from '../../models/Group.js';
import COMMON_CONSTANTS from '../../../shared/constants/models/commonConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { COMMON_FIELDS } = COMMON_CONSTANTS;
const { ERROR, DEBUG } = LOG_LEVELS;

const isGroupCodeUnique = async (groupCode) => {
  try {
    const existingGroup = await Group.findOne({
      [COMMON_FIELDS.GROUP_CODE]: groupCode,
    }).lean();

    if (!existingGroup) {
      debugLog(`GroupCode "${groupCode}" is unique.`, null, DEBUG);
      return true;
    }

    return false;
  } catch (error) {
    debugLog(
      'Database error during groupCode uniqueness check',
      { groupCode, error: error.message },
      ERROR,
    );
    throw error;
  }
};

export default isGroupCodeUnique;
