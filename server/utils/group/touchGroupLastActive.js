import Group from '../../models/Group.js';

import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';

const { LOG_ERROR } = LOG_LEVELS;

const touchGroupLastActive = async (groupCode) => {
  if (!groupCode) return;

  try {
    const result = await Group.updateOne(
      { groupCode },
      { $set: { lastActive: new Date() } },
    );

    if (result.matchedCount === 0) {
      debugLog(
        'Cannot touch group lastActive: Group not found',
        { groupCode },
        LOG_ERROR,
      );
    }
  } catch (error) {
    debugLog(
      'Error updating group lastActive',
      { groupCode, error: error.message },
      LOG_ERROR,
    );
  }
};

export default touchGroupLastActive;
