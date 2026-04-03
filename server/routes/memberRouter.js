import express from 'express';
import createMemberController from '../controllers/member/createMemberController.js';
import getGroupMembersController from '../controllers/member/getGroupMembersController.js';
import changeMemberNameController from '../controllers/member/changeMemberNameController.js';
import deleteMemberController from '../controllers/member/deleteMemberController.js';
import getMemberInfoController from '../controllers/member/getMemberInfoController.js';
import getMemberTransactionsController from '../controllers/member/getMemberTransactionsController.js';
import resetSettlementsMiddleware from '../middleware/group/resetSettlementsMiddleware.js';
import touchGroupLastActiveMiddleware from '../middleware/group/touchGroupLastActiveMiddleware.js';
import API_ROUTES from '../../shared/constants/api/apiRouteConstants.js';

const { MEMBERS, URL_PARAMS } = API_ROUTES;
const { MEMBER_ID } = URL_PARAMS;

const memberRouter = express.Router({ mergeParams: true });

memberRouter.use(touchGroupLastActiveMiddleware);

memberRouter.post('/', resetSettlementsMiddleware, createMemberController);

memberRouter.get('/', getGroupMembersController);

memberRouter.get(`/:${MEMBER_ID}`, getMemberInfoController);

memberRouter.patch(`/:${MEMBER_ID}`, changeMemberNameController);

memberRouter.delete(
  `/:${MEMBER_ID}`,
  resetSettlementsMiddleware,
  deleteMemberController,
);

memberRouter.get(
  `/:${MEMBER_ID}/${MEMBERS.TRANSACTIONS}`,
  getMemberTransactionsController,
);

export default memberRouter;
