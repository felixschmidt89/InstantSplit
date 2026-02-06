import { deleteAllSettlementsForGroup } from '../../controllers/settlementController.js';
import { updateFixedDebitorCreditorOrderSetting } from '../databaseUtils.js';
import { touchGroupLastActive } from './touchGroupLastActive.js';
import { debugLog } from '../../../shared/utils/debug/debugLog.js';
import { LOG_LEVELS } from '../../../shared/constants/debugConstants.js';

const { INFO } = LOG_LEVELS;

export const resetGroupSettlements = async (groupCode) => {
  debugLog('Resetting group settlements', { groupCode }, INFO);

  await Promise.all([
    deleteAllSettlementsForGroup(groupCode),
    updateFixedDebitorCreditorOrderSetting(groupCode, false),
    touchGroupLastActive(groupCode),
  ]);
};
