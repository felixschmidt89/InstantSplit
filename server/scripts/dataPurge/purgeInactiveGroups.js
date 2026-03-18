import { INACTIVE_DAYS } from '../../constants/dataConstants.js';
import Expense from '../../models/Expense.js';
import Group from '../../models/Group.js';
import Payment from '../../models/Payment.js';
import User from '../../models/Member.js';

const purgeInactiveGroups = async () => {
  // Set cutoffDate
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - INACTIVE_DAYS);

  const excludedGroupCodes = ['UO99CWXD', '7DCAG3YZ'];

  try {
    console.log('Find groups to purge');
    const groupsToPurge = await Group.find({
      groupCode: { $nin: excludedGroupCodes }, // exclude specified groups
      lastActive: { $lt: cutoffDate },
      inactiveDataPurge: true, // exclude groups with deactivated auto purge
    });

    let purgedCount = 0;

    for (const group of groupsToPurge) {
      // Delete associated Payment, User, and Expense documents
      await Payment.deleteMany({ groupCode: group.groupCode });
      await User.deleteMany({ groupCode: group.groupCode });
      await Expense.deleteMany({ groupCode: group.groupCode });

      // Delete the Group document itself
      await Group.deleteOne({ _id: group._id });
      purgedCount += 1;
    }

    console.log(`Purging complete. ${purgedCount} groups purged.`);
  } catch (error) {
    console.error('Error purging inactive groups:', error);
  }
};

export default purgeInactiveGroups;
