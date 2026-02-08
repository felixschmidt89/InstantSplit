import express from 'express';
// Legacy imports
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
  deleteUser,
  deleteAllUsers,
  getUserInfo,
} from '../controllers/userController.js';

import { getUserTransactions } from '../controllers/user/getUserTransactionsController.js';

import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
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
  `/${USERS.BY_GROUP_CODE}/${URL_PARAMS.GROUP_CODE}`,
  listAllUsersByGroupCode,
);

router.get(`/${URL_PARAMS.USER_ID}/${USERS.TRANSACTIONS}`, getUserTransactions);

/**
 * Development and Debugging Routes
 */
router.get('/debug/all', developmentOnlyMiddleware, listAllUsers);
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllUsers);

export default router;
