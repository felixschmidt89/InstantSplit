import express from 'express';

import createMemberController from '../controllers/member/createMemberController.js';
import getMembersController from '../controllers/member/getMembersController.js';
import changeMemberNameController from '../controllers/member/changeMemberNameController.js';
import deleteMemberController from '../controllers/member/deleteMemberController.js';
import getMemberInfoController from '../controllers/member/getMemberInfoController.js';
import getMemberTransactionsController from '../controllers/member/getMemberTransactionsController.js';
import API_ROUTES from '../../shared/constants/api/apiRoutesConstants.js';

const router = express.Router();
const { MEMBERS, URL_PARAMS } = API_ROUTES;

router.post('/', createMemberController);

router.get(`/:${URL_PARAMS.MEMBER_ID}`, getMemberInfoController);

router.patch(`/:${URL_PARAMS.MEMBER_ID}`, changeMemberNameController);

router.delete(`/:${URL_PARAMS.MEMBER_ID}`, deleteMemberController);

router.get(
  `/${MEMBERS.BY_GROUP}/:${URL_PARAMS.GROUP_ID}`,
  getMembersController,
);

router.get(
  `/:${URL_PARAMS.MEMBER_ID}/${MEMBERS.TRANSACTIONS}`,
  getMemberTransactionsController,
);

export default router;
