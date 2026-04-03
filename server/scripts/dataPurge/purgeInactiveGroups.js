import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import Expense from '../../models/Expense.js';
import Group from '../../models/Group.js';
import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';
import Settlement from '../../models/Settlement.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { GROUP_INACTIVITY_THRESHOLD_DAYS, DATA_PURGE_EXCLUDED_GROUP_CODES } =
  SYSTEM;
const { INFO, LOG_ERROR, SUCCESS } = LOG_LEVELS;

const purgeInactiveGroups = async () => {
  const expirationDate = new Date();
  expirationDate.setDate(
    expirationDate.getDate() - GROUP_INACTIVITY_THRESHOLD_DAYS,
  );

  debugLog(
    `Initializing purge. Inactivity Threshold: ${GROUP_INACTIVITY_THRESHOLD_DAYS} days. Excluded Groups: ${DATA_PURGE_EXCLUDED_GROUP_CODES.join(', ')}`,
    INFO,
  );

  try {
    const expiredGroups = await Group.find({
      groupCode: { $nin: DATA_PURGE_EXCLUDED_GROUP_CODES },
      lastActive: { $lt: expirationDate },
      inactiveDataPurge: true,
    }).select('groupCode');

    const hasExpiredGroups = Boolean(expiredGroups?.length);

    if (!hasExpiredGroups) {
      debugLog('No inactive groups found to purge.', INFO);
      return;
    }

    const expiredGroupCodes = expiredGroups.map((group) => group.groupCode);

    debugLog(
      `Purge started. Deleting data for ${expiredGroupCodes.length} expired groups...`,
      INFO,
    );

    await Promise.all([
      Payment.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Member.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Expense.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Settlement.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Group.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
    ]);

    debugLog(
      `Purging complete. ${expiredGroupCodes.length} groups and their associated data removed.`,
      SUCCESS,
    );
  } catch (error) {
    debugLog('Error during bulk purging of expired groups:', LOG_ERROR, error);
  }
};

export default purgeInactiveGroups;
