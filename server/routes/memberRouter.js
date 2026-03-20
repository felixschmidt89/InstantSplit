import express from 'express';

import createMemberController from '../controllers/member/createMemberController.js';
import getGroupMembersController from '../controllers/member/getGroupMembersController.js'; // Renamed
import changeMemberNameController from '../controllers/member/changeMemberNameController.js';
import deleteMemberController from '../controllers/member/deleteMemberController.js';
import getMemberInfoController from '../controllers/member/getMemberInfoController.js';
import getMemberTransactionsController from '../controllers/member/getMemberTransactionsController.js';

import API_ROUTES from '../../shared/constants/api/apiRoutesConstants.js';

const { MEMBERS, URL_PARAMS } = API_ROUTES;
const { MEMBER_ID, GROUP_ID } = URL_PARAMS;

const memberRouter = express.Router();

memberRouter.post('/', createMemberController);

memberRouter.get(`/:${MEMBER_ID}`, getMemberInfoController);

memberRouter.patch(`/:${MEMBER_ID}`, changeMemberNameController);

memberRouter.delete(`/:${MEMBER_ID}`, deleteMemberController);

memberRouter.get(
  `/${MEMBERS.BY_GROUP}/:${GROUP_ID}`,
  getGroupMembersController,
);

memberRouter.get(
  `/:${MEMBER_ID}/${MEMBERS.TRANSACTIONS}`,
  getMemberTransactionsController,
);

export default memberRouter;
