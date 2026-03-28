import express from 'express';

import getGroupTransactionsController from '../controllers/group/getGroupTransactionsController.js';
import getGroupCurrencyController from '../controllers/group/getGroupCurrencyController.js';
import createGroupController from '../controllers/group/createGroupController.js';
import changeGroupNameController from '../controllers/group/changeGroupNameController.js';
import getGroupInfoController from '../controllers/group/getGroupInfoController.js';
import {
  listGroupNamesByStoredGroupCodes,
  validateGroupExistence,
  changeGroupCurrency,
  changeGroupDataPurgeSetting,
  changeFixedDebitorCreditorOrderSetting,
  groupHasPersistedDebitorCreditorOrder,
} from '../controllers/groupController.js';

import logRequestDetailsMiddleware from '../middleware/common/logRequestDetailsMiddleware.js';
import extractGroupCodeMiddleware from '../middleware/context/extractGroupCodeMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validation/validateGroupCodeMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import {
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
} from '../middleware/strictlyLimitRequestsPerIpMiddleware.js';
import {
  laxLimitRequestsPerIpMiddleware,
  laxLimiter,
} from '../middleware/laxLimitRequestsPerIpMiddleware.js';

import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';
import CONFIG from '../config/serverConfig.js';

const router = express.Router();

const {
  GROUPS: {
    STORED_GROUP_NAMES,
    CURRENCY,
    DATA_PURGE,
    PERSISTED_ORDER,
    HAS_PERSISTED_ORDER,
    VALIDATE_GROUP_EXISTENCE,
    TRANSACTIONS,
  },
  URL_PARAMS: { GROUP_ID },
} = API_ROUTES;

if (CONFIG.LOG_API_REQUESTS) {
  router.use(logRequestDetailsMiddleware);
}

/**
 * Public / Non-Group Context Routes
 */
router.post('/', createGroupController);
router.get(`/${STORED_GROUP_NAMES}`, listGroupNamesByStoredGroupCodes);

/**
 * Group Context Protected Routes
 * These routes identify the group via GROUP_ID in the URL
 * and validate the secret groupCode from the Request Body/Headers.
 */
router.use(extractGroupCodeMiddleware);
router.use(validateGroupCodeMiddleware);
router.use(touchGroupLastActiveMiddleware);

// Get group details via ID (secure)
router.get(`/${GROUP_ID}`, getGroupInfoController);

router.patch(`/${GROUP_ID}`, changeGroupNameController);

router.get(`/${CURRENCY}`, getGroupCurrencyController);
router.get(`/${TRANSACTIONS}`, getGroupTransactionsController);

// Legacy routes still pending atomic refactor - now using GROUP_ID for URI
router.patch(`/${CURRENCY}/${GROUP_ID}`, changeGroupCurrency);
router.patch(`/${DATA_PURGE}/${GROUP_ID}`, changeGroupDataPurgeSetting);
router.patch(
  `/${PERSISTED_ORDER}/${GROUP_ID}`,
  changeFixedDebitorCreditorOrderSetting,
);
router.get(
  `/${HAS_PERSISTED_ORDER}/${GROUP_ID}`,
  groupHasPersistedDebitorCreditorOrder,
);

router.get(
  `/${GROUP_ID}/${VALIDATE_GROUP_EXISTENCE}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

export default router;
