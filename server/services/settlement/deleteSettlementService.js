import Settlement from '../../models/Settlement.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';

const { COMMON_FIELDS } = COMMON;

const deleteSettlementService = async (groupCode, settlementId) => {
  const deletedSettlement = await Settlement.findOneAndDelete({
    _id: settlementId,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  });

  return Boolean(deletedSettlement);
};

export default deleteSettlementService;
