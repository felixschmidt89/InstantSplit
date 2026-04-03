import Settlement from '../../models/Settlement.js';
import COMMON from '../../../shared/constants/models/commonConstants.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';

const { COMMON_FIELDS } = COMMON;
const { INFO } = LOG_LEVELS;

const deleteSettlementService = async (groupCode, settlementId) => {
  debugLog(
    'Attempting to delete single settlement',
    { settlementId, groupCode },
    INFO,
  );

  const deletedSettlement = await Settlement.findOneAndDelete({
    [COMMON_FIELDS.ID]: settlementId,
    [COMMON_FIELDS.GROUP_CODE]: groupCode,
  });

  const isDeleted = Boolean(deletedSettlement);

  if (isDeleted) {
    debugLog('Settlement deleted successfully', { settlementId }, INFO);
  }

  return isDeleted;
};

export default deleteSettlementService;
