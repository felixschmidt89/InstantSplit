import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
  deleteUser,
  deleteAllUsers,
  getUserInfo,
  listExpensesAndPaymentsByUser,
} from '../controllers/userController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import { API_ROUTES } from '../../shared/constants/apiRoutesConstants.js';

const router = express.Router();

const { USERS, URL_PARAMS } = API_ROUTES;

router.post('/', createUser);

router.get(`/${URL_PARAMS.USER_ID}`, getUserInfo);

router.patch(`/${URL_PARAMS.USER_ID}`, changeUserName);

router.delete(`/${URL_PARAMS.USER_ID}`, deleteUser);

router.get(
  `/${USERS.BY_GROUP_CODE}/${URL_PARAMS.GROUP_CODE}`,
  listAllUsersByGroupCode,
);

router.get(
  `/${URL_PARAMS.USER_ID}/${USERS.TRANSACTIONS}`,
  listExpensesAndPaymentsByUser,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
router.get('/debug/all', developmentOnlyMiddleware, listAllUsers);
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllUsers);

export default router;
