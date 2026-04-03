import Member from '../../models/Member.js';
import Settlement from '../../models/Settlement.js';
import Group from '../../models/Group.js';
import SETTLEMENT from '../../../shared/constants/models/settlementConstants.js';
import GROUP from '../../../shared/constants/models/groupConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';

const { SETTLEMENT_FIELDS } = SETTLEMENT;
const { GROUP_FIELDS } = GROUP;
const { COMMON_FIELDS } = COMMON;
const { BALANCE_THRESHOLD } = SYSTEM;

const calculateSettlementsService = async (groupCode) => {
  const members = await Member.find({
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }).lean();

  let debtors = members
    .filter((member) => member.balance <= -BALANCE_THRESHOLD)
    .map((member) => ({
      id: member._id,
      balance: Math.abs(member.balance),
    }));

  let creditors = members
    .filter((member) => member.balance >= BALANCE_THRESHOLD)
    .map((member) => ({
      id: member._id,
      balance: member.balance,
    }));

  const calculatedSettlements = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const amount = Math.min(
      debtors[debtorIndex].balance,
      creditors[creditorIndex].balance,
    );

    if (amount >= BALANCE_THRESHOLD) {
      calculatedSettlements.push({
        [SETTLEMENT_FIELDS.DEBTOR]: debtors[debtorIndex].id,
        [SETTLEMENT_FIELDS.CREDITOR]: creditors[creditorIndex].id,
        [SETTLEMENT_FIELDS.AMOUNT]: Number(amount.toFixed(2)),
        [COMMON_FIELDS.GROUP_CODE]: groupCode,
      });
    }

    debtors[debtorIndex].balance -= amount;
    creditors[creditorIndex].balance -= amount;

    if (debtors[debtorIndex].balance < BALANCE_THRESHOLD) {
      debtorIndex++;
    }

    if (creditors[creditorIndex].balance < BALANCE_THRESHOLD) {
      creditorIndex++;
    }
  }

  await Settlement.deleteMany({ [COMMON_FIELDS.GROUP_CODE]: groupCode });

  const settlements = await Settlement.insertMany(calculatedSettlements);

  await Group.updateOne(
    { [COMMON_FIELDS.GROUP_CODE]: groupCode },
    { $set: { [GROUP_FIELDS.SETTLEMENTS_CALCULATED]: true } },
  );

  return settlements;
};

export default calculateSettlementsService;
