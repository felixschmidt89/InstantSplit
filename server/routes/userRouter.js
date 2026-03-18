import express from 'express';

import {
  createUser,
  listAllUsersByGroupCode,
  changeUserName,
  deleteUser,
  getUserInfo,
} from '../controllers/userController.js';
import { getUserTransactions } from '../controllers/user/getUserTransactionsController.js';

import { API_ROUTES } from '../../shared/constants/apiRoutesConstants.js';

const router = express.Router();
const { USERS, URL_PARAMS } = API_ROUTES;

/**
 * User Management Routes
 */
router.post('/', createUser);

router.get(`/${URL_PARAMS.USER_ID}`, getUserInfo);

router.patch(`/${URL_PARAMS.USER_ID}`, changeUserName);

router.delete(`/${URL_PARAMS.USER_ID}`, deleteUser);

router.get(
  `/${USERS.BY_GROUP_CODE}/${URL_PARAMS.GROUP_ID}`,
  listAllUsersByGroupCode,
);

router.get(`/${URL_PARAMS.USER_ID}/${USERS.TRANSACTIONS}`, getUserTransactions);

export default router;
