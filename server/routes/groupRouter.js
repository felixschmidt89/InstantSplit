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

const router = express.Router();
const { GROUPS, URL_PARAMS } = API_ROUTES;

router.post('/', createGroup);

router.patch(`/${URL_PARAMS.GROUP_ID}`, changeGroupName);

router.get(`/${GROUPS.STORED_GROUP_NAMES}`, listGroupNamesByStoredGroupCodes);

router.get(`/${URL_PARAMS.GROUP_CODE}`, getGroupInfo);

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

router.get(
  `/${URL_PARAMS.GROUP_CODE}/expenses-and-payments`,
  listExpensesAndPaymentsByGroup,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllGroups);

export default router;
