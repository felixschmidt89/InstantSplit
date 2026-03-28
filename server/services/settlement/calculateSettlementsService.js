import Settlement from '../../models/Settlement.js';
import Group from '../../models/Group.js';
import PAYLOAD_KEYS from '../../../shared/constants/api/payloadKeyConstants.js';
import SETTLEMENT from '../../../shared/constants/models/settlementConstants.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const { SETTLEMENT_KEYS } = PAYLOAD_KEYS;
const { SETTLEMENT_FIELDS } = SETTLEMENT;
const { COMMON_FIELDS } = COMMON;

// TODO: Needs improvement later
const calculateSettlementsService = async (groupCode, settlements) => {
  const settlementsWithGroup = settlements.map((settlement) => ({
    [SETTLEMENT_FIELDS.DEBTOR]: settlement[SETTLEMENT_KEYS.DEBTOR],
    [SETTLEMENT_FIELDS.CREDITOR]: settlement[SETTLEMENT_KEYS.CREDITOR],
    [SETTLEMENT_FIELDS.AMOUNT]: settlement[SETTLEMENT_KEYS.AMOUNT],
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  }));

  await Settlement.deleteMany({ [COMMON_FIELDS.GROUP_CODE]: groupCode });

  const savedSettlements = await Settlement.insertMany(settlementsWithGroup);

  await Group.updateOne(
    { [COMMON_FIELDS.GROUP_CODE]: groupCode },
    { $set: { settlementsCalculated: true } },
  );

  return savedSettlements;
};

export default calculateSettlementsService;
