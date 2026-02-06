import Group from '../../models/Group.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';

const { LOG_ERROR } = LOG_LEVELS;

export const touchGroupLastActive = async (groupCode) => {
  if (!groupCode) return;

  try {
    const group = await Group.findOne({ groupCode });

    if (group) {
      await group.touchLastActive();
    } else {
      debugLog(
        'Cannot touch group lastActive: Group not found',
        { groupCode },
        LOG_ERROR,
      );
    }
  } catch (error) {
    // Errors inside touchLastActive() are already logged by the Model.
    // Errors finding the group are non-critical side effects and shouldn't crash the request.
  }
};
