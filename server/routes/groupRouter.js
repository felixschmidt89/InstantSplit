import express from 'express';
// TODO: Legacy imports (to be refactored into atomic controllers individually)
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  listGroupNamesByStoredGroupCodes,
  getGroupInfo,
  validateGroupExistence,
  getGroupCurrency,
  changeGroupCurrency,
  changeGroupDataPurgeSetting,
  changeFixedDebitorCreditorOrderSetting,
  groupHasPersistedDebitorCreditorOrder,
} from '../controllers/groupController.js';

// Atomic Controller Imports
import { getGroupTransactionsController } from '../controllers/group/getGroupTransactionsController.js';

import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import {
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
} from '../middleware/strictlyLimitRequestsPerIpMiddleware.js';
import {
  laxLimitRequestsPerIpMiddleware,
  laxLimiter,
} from '../middleware/laxLimitRequestsPerIpMiddleware.js';
import { API_ROUTES } from '../../shared/constants/apiRoutesConstants.js';

const router = express.Router();
const { GROUPS, URL_PARAMS } = API_ROUTES;

/**
 * Group Management Routes
 */
router.post('/', createGroup);

router.patch(`/${URL_PARAMS.GROUP_ID}`, changeGroupName);

router.get(`/${GROUPS.STORED_GROUP_NAMES}`, listGroupNamesByStoredGroupCodes);

router.get(`/${URL_PARAMS.GROUP_CODE}`, getGroupInfo);

/**
 * Currency and Settings Routes
 */
router.get(`/currency/${URL_PARAMS.GROUP_CODE}`, getGroupCurrency);

router.patch(`/currency/${URL_PARAMS.GROUP_CODE}`, changeGroupCurrency);

router.patch(
  `/data-purge/${URL_PARAMS.GROUP_CODE}`,
  changeGroupDataPurgeSetting,
);

router.patch(
  `/fixed-order-settings/${URL_PARAMS.GROUP_CODE}`,
  changeFixedDebitorCreditorOrderSetting,
);

router.get(
  `/has-persisted-order/${URL_PARAMS.GROUP_CODE}`,
  groupHasPersistedDebitorCreditorOrder,
);

/**
 * Validation Routes (Rate Limited)
 */
router.get(
  `/${URL_PARAMS.GROUP_CODE}/${GROUPS.VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

router.get(
  `/${URL_PARAMS.GROUP_CODE}/${GROUPS.VALIDATE_GROUP_EXISTENCE_LIMITED}`,
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

/**
 * Transaction Routes
 * Refactored to Atomic Utility Architecture
 */
router.get(
  `/${URL_PARAMS.GROUP_CODE}/${GROUPS.TRANSACTIONS}`,
  getGroupTransactionsController,
);

/**
 * Development and Debugging Routes
 * Restricted to development environment via middleware
 */
router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);

export default router;
