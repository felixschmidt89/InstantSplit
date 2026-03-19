import { deleteAllSettlementsForGroup } from '../../controllers/settlementController.js';
import { updateFixedDebitorCreditorOrderSetting } from '../databaseUtils.js';
import debugLog from '../../../shared/utils/debug/debugLog.js';
import LOG_LEVELS from '../../../shared/constants/system/loggerConstants.js';

const { INFO } = LOG_LEVELS;

export const resetGroupSettlements = async (groupCode) => {
  debugLog('Resetting group settlements', { groupCode }, INFO);

  await Promise.all([
    deleteAllSettlementsForGroup(groupCode),
    updateFixedDebitorCreditorOrderSetting(groupCode, false),
  ]);
};
