import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import Expense from '../../models/Expense.js';
import Group from '../../models/Group.js';
import Payment from '../../models/Payment.js';
import Member from '../../models/Member.js';

const { GROUP_INACTIVITY_THRESHOLD_DAYS } = SYSTEM;

const purgeInactiveGroups = async () => {
  const expirationDate = new Date();
  expirationDate.setDate(
    expirationDate.getDate() - GROUP_INACTIVITY_THRESHOLD_DAYS,
  );

  const excludedGroupCodes = [];

  try {
    const expiredGroups = await Group.find({
      groupCode: { $nin: excludedGroupCodes },
      lastActive: { $lt: expirationDate },
      inactiveDataPurge: true,
    }).select('groupCode');

    if (expiredGroups.length === 0) {
      console.log('No inactive groups found to purge.');
      return;
    }

    const expiredGroupCodes = expiredGroups.map((group) => group.groupCode);

    console.log(
      `Purge started. Deleting data for ${expiredGroupCodes.length} expired groups...`,
    );

    await Promise.all([
      Payment.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Member.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Expense.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
      Group.deleteMany({ groupCode: { $in: expiredGroupCodes } }),
    ]);

    console.log(
      `Purging complete. ${expiredGroupCodes.length} groups and their associated data removed.`,
    );
  } catch (error) {
    console.error('Error during bulk purging of expired groups:', error);
  }
};

export default purgeInactiveGroups;
