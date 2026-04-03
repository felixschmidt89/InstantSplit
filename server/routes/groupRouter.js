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

const { GROUPS, URL_PARAMS } = API_ROUTES;
const { GROUP_ID } = URL_PARAMS;

const groupRouter = express.Router();

if (CONFIG.LOG_API_REQUESTS) {
  groupRouter.use(logRequestDetailsMiddleware);
}

groupRouter.post('/', createGroupController);

groupRouter.get(
  `/${GROUPS.STORED_GROUP_NAMES}`,
  getStoredGroupsNamesController,
);

groupRouter.use(extractGroupCodeMiddleware);
groupRouter.use(validateGroupCodeMiddleware);
groupRouter.use(touchGroupLastActiveMiddleware);

groupRouter.get(`/:${GROUP_ID}`, getGroupInfoController);

groupRouter.patch(`/:${GROUP_ID}`, changeGroupNameController);

groupRouter.get(`/${GROUPS.CURRENCY}`, getGroupCurrencyController);

groupRouter.get(`/${GROUPS.TRANSACTIONS}`, getGroupTransactionsController);

groupRouter.patch(
  `/${GROUPS.CURRENCY}/:${GROUP_ID}`,
  changeGroupCurrencyController,
);

groupRouter.patch(
  `/${GROUPS.DATA_PURGE}/:${GROUP_ID}`,
  changeDataPurgeSettingController,
);

groupRouter.get(
  `/${GROUPS.SETTLEMENTS_CALCULATED}/:${GROUP_ID}`,
  getSettlementsCalculatedController,
);

groupRouter.patch(
  `/${GROUPS.SETTLEMENTS_CALCULATED}/:${GROUP_ID}`,
  changeSettlementsCalculatedController,
);

groupRouter.get(
  `/:${GROUP_ID}/${GROUPS.CHECK_GROUP_CODE}`,
  laxLimiter,
  laxLimitRequestsPerIpMiddleware,
  checkGroupCodeController,
);

export default groupRouter;
