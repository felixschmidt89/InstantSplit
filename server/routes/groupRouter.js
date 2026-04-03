import express from 'express';
import createGroupController from '../controllers/group/createGroupController.js';
import getGroupTransactionsController from '../controllers/group/getGroupTransactionsController.js';
import getGroupCurrencyController from '../controllers/group/getGroupCurrencyController.js';
import changeGroupNameController from '../controllers/group/changeGroupNameController.js';
import getGroupInfoController from '../controllers/group/getGroupInfoController.js';
import changeGroupCurrencyController from '../controllers/group/changeGroupCurrencyController.js';
import changeDataPurgeSettingController from '../controllers/group/changeDataPurgeSettingController.js';
import changeSettlementsCalculatedController from '../controllers/group/changeSettlementsCalculatedController.js';
import getSettlementsCalculatedController from '../controllers/group/getSettlementsCalculatedController.js';
import checkGroupCodeController from '../controllers/group/checkGroupCodeController.js';
import getStoredGroupsNamesController from '../controllers/group/getStoredGroupsNamesController.js';
import extractGroupCodeMiddleware from '../middleware/context/extractGroupCodeMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validation/validateGroupCodeMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import {
  laxLimitRequestsPerIpMiddleware,
  laxLimiter,
} from '../middleware/rateLimit/laxLimitRequestsPerIpMiddleware.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';
import CONFIG from '../config/serverConfig.js';
import debugLogRequestMiddleware from '../middleware/debug/debugLogRequestMiddleware.js';

const { GROUPS } = API_ROUTES;

const groupRouter = express.Router({ mergeParams: true });

if (CONFIG.LOG_API_REQUESTS) {
  groupRouter.use(debugLogRequestMiddleware);
}

groupRouter.post('/', createGroupController);

groupRouter.get(
  `/${GROUPS.STORED_GROUP_NAMES}`,
  getStoredGroupsNamesController,
);

groupRouter.use(extractGroupCodeMiddleware);
groupRouter.use(validateGroupCodeMiddleware);
groupRouter.use(touchGroupLastActiveMiddleware);

groupRouter.get('/', getGroupInfoController);

groupRouter.patch('/', changeGroupNameController);

groupRouter.get(`/${GROUPS.CURRENCY}`, getGroupCurrencyController);

groupRouter.get(`/${GROUPS.TRANSACTIONS}`, getGroupTransactionsController);

groupRouter.patch(`/${GROUPS.CURRENCY}`, changeGroupCurrencyController);

groupRouter.patch(`/${GROUPS.DATA_PURGE}`, changeDataPurgeSettingController);

groupRouter.get(
  `/${GROUPS.SETTLEMENTS_CALCULATED}`,
  getSettlementsCalculatedController,
);

groupRouter.patch(
  `/${GROUPS.SETTLEMENTS_CALCULATED}`,
  changeSettlementsCalculatedController,
);

groupRouter.get(
  `/${GROUPS.CHECK_GROUP_CODE}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  checkGroupCodeController,
);

export default groupRouter;
