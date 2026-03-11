import express from 'express';

import getGroupTransactionsController from '../controllers/group/getGroupTransactionsController.js';
import getGroupCurrencyController from '../controllers/group/getGroupCurrencyController.js';
import createGroupController from '../controllers/group/createGroupController.js';
import changeGroupNameController from '../controllers/group/changeGroupNameController.js';

import { logRequestDetailsMiddleware } from '../middleware/common/logRequestDetailsMiddleware.js';
import { validateGroupCodeMiddleware } from '../middleware/validation/validateGroupCodeMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';

import {
  listAllGroups,
  listGroupNamesByStoredGroupCodes,
  getGroupInfo,
  validateGroupExistence,
  changeGroupCurrency,
  changeGroupDataPurgeSetting,
  changeFixedDebitorCreditorOrderSetting,
  groupHasPersistedDebitorCreditorOrder,
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

import { API_ROUTES } from '../../shared/constants/apiRoutesConstants.js';
import { CONFIG } from '../config/index.js';

const router = express.Router();

const {
  GROUPS: {
    STORED_GROUP_NAMES,
    CURRENCY,
    DATA_PURGE,
    PERSISTED_ORDER,
    HAS_PERSISTED_ORDER,
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS,
    VALIDATE_GROUP_EXISTENCE_LIMITED,
    TRANSACTIONS,
  },
  URL_PARAMS: { GROUP_ID, GROUP_CODE },
} = API_ROUTES;

if (CONFIG.LOG_API_REQUESTS) {
  router.use(logRequestDetailsMiddleware);
}

/**
 * Public / Non-Group Context Routes
 */
router.post('/', createGroupController);

router.get(`/${STORED_GROUP_NAMES}`, listGroupNamesByStoredGroupCodes);

router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);

/**
 * Group Context Protected Routes
 */
router.use(validateGroupCodeMiddleware);
router.use(touchGroupLastActiveMiddleware);

router.patch(`/${GROUP_ID}`, changeGroupNameController);

router.get(`/${CURRENCY}`, getGroupCurrencyController);

router.get(`/${TRANSACTIONS}`, getGroupTransactionsController);

router.get(`/${GROUP_CODE}`, getGroupInfo);

router.patch(`/${CURRENCY}/${GROUP_CODE}`, changeGroupCurrency);

router.patch(`/${DATA_PURGE}/${GROUP_CODE}`, changeGroupDataPurgeSetting);

router.patch(
  `/${PERSISTED_ORDER}/${GROUP_CODE}`,
  changeFixedDebitorCreditorOrderSetting,
);

router.get(
  `/${HAS_PERSISTED_ORDER}/${GROUP_CODE}`,
  groupHasPersistedDebitorCreditorOrder,
);

router.get(
  `/${GROUP_CODE}/${VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

router.get(
  `/${GROUP_CODE}/${VALIDATE_GROUP_EXISTENCE_LIMITED}`,
  strictLimiter,
  strictlyLimitRequestsPerIpMiddleware,
  validateGroupExistence,
);

export default router;
