import express from 'express';
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  deleteAllGroups,
  listGroupNamesByStoredGroupCodes,
  listExpensesAndPaymentsByGroup,
  getGroupInfo,
  validateGroupExistence,
  getGroupCurrency,
  changeGroupCurrency,
  changeGroupDataPurgeSetting,
  changeFixedDebitorCreditorOrderSetting,
} from '../controllers/groupController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import {
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
} from '../middleware/strictlyLimitRequestsPerIpMiddleware.js';
import {
  laxLimitRequestsPerIpMiddleware,
  laxLimiter,
} from '../middleware/laxLimitRequestsPerIpMiddleware.js';

const router = express.Router();

// Create a new group
router.post('/', createGroup);

// Change group name
router.patch('/:groupId', changeGroupName);

// List group names of locally stored groupCodes
router.get('/StoredGroupNames', listGroupNamesByStoredGroupCodes);

// Get group info by groupCode
router.get('/:groupCode', getGroupInfo);

// Get group currency by groupCode
router.get('/currency/:groupCode', getGroupCurrency);

// Change group currency by groupCode
router.patch('/currency/:groupCode', changeGroupCurrency);

// Change group inactiveDataPurge setting by groupCode
router.patch('/inactiveDataPurge/:groupCode', changeGroupDataPurgeSetting);

// Change group fixedDebitorCreditorOrder setting by groupCode
router.patch(
  '/fixedDebitorCreditorOrder/:groupCode',
  changeFixedDebitorCreditorOrderSetting,
);

// Laxely limited check if groupCode exists in database (for continuous background active groupCode validation)
router.get(
  '/:groupCode/continuous-validate-existence',
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

// Strictly limited check if groupCode exists in database (for manual groupCode input validation in the frontend)
router.get(
  '/:groupCode/limited-validate-existence',
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

// List all expenses and payments of a group
router.get('/:groupCode/expenses-and-payments', listExpensesAndPaymentsByGroup);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all groups
router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);
// Delete all groups
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllGroups);

export default router;
