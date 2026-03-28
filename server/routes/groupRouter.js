import express from 'express';

import getGroupTransactionsController from '../controllers/group/getGroupTransactionsController.js';
import getGroupCurrencyController from '../controllers/group/getGroupCurrencyController.js';
import createGroupController from '../controllers/group/createGroupController.js';
import changeGroupNameController from '../controllers/group/changeGroupNameController.js';
import getGroupInfoController from '../controllers/group/getGroupInfoController.js';
import changeGroupCurrencyController from '../controllers/group/changeGroupCurrencyController.js';
import changeDataPurgeSettingController from '../controllers/group/changeDataPurgeSettingController.js';
import changeSettlementsCalculatedController from '../controllers/group/changeSettlementsCalculatedController.js';
import getSettlementsCalculatedController from '../controllers/group/getSettlementsCalculatedController.js';
import checkGroupCodeController from '../controllers/group/checkGroupCodeController.js';
import getStoredGroupsNamesController from '../controllers/group/getStoredGroupsNamesController.js';

import logRequestDetailsMiddleware from '../middleware/common/logRequestDetailsMiddleware.js';
import extractGroupCodeMiddleware from '../middleware/context/extractGroupCodeMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validation/validateGroupCodeMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
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
    SETTLEMENTS_CALCULATED,
    VALIDATE_GROUP_EXISTENCE,
    TRANSACTIONS,
  },
  URL_PARAMS: { GROUP_ID },
} = API_ROUTES;

if (CONFIG.LOG_API_REQUESTS) {
  router.use(logRequestDetailsMiddleware);
}

// Public Routes

router.post('/', createGroupController);
router.get(`/${STORED_GROUP_NAMES}`, getStoredGroupsNamesController);

// Group Context Protected Routes

router.use(extractGroupCodeMiddleware);
router.use(validateGroupCodeMiddleware);
router.use(touchGroupLastActiveMiddleware);

router.get(`/${GROUP_ID}`, getGroupInfoController);
router.patch(`/${GROUP_ID}`, changeGroupNameController);

router.get(`/${CURRENCY}`, getGroupCurrencyController);
router.get(`/${TRANSACTIONS}`, getGroupTransactionsController);

router.patch(`/${CURRENCY}/${GROUP_ID}`, changeGroupCurrencyController);
router.patch(`/${DATA_PURGE}/${GROUP_ID}`, changeDataPurgeSettingController);

router.get(
  `/${SETTLEMENTS_CALCULATED}/${GROUP_ID}`,
  getSettlementsCalculatedController,
);
router.patch(
  `/${SETTLEMENTS_CALCULATED}/${GROUP_ID}`,
  changeSettlementsCalculatedController,
);

//TODO: Check if laxLimiter is still needed or captcha verification would be better solution
router.get(
  `/${GROUP_ID}/${VALIDATE_GROUP_EXISTENCE}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  checkGroupCodeController,
);

export default router;
