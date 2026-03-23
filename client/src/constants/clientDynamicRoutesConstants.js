/**
 * BACKEND REFACTOR TASKS:
 * * 1. ROUTERS:
 * - [ ] Update Expense/Payment/Member routers to remove :groupCode from the path.
 * - [ ] Standardize param names to :expenseId, :paymentId, :memberId.
 * * 2. CONTROLLERS:
 * - [ ] Update destructuring: const { expenseId } = req.params (instead of groupId/groupCode).
 * - [ ] Remove groupCode validation logic from transaction controllers (ID uniqueness is sufficient).
 * * 3. SERVICES:
 * - [ ] Refactor service methods to accept only the specific Resource ID.
 * - [ ] Ensure "Get Details" queries use .findById(id) without needing a group filter.
 * * 4. CLEANUP:
 * - [ ] Remove INITIAL_GROUP_NAME and GROUP_NAME logic from Group creation/join flows.
 * - [ ] Update API response objects to reflect the de-prefixed field names (e.g., 'amount' vs 'expenseAmount').
 */

import ROUTE_PARAMS from "../../../shared/constants/api/routeParamConstants.js";
import prefixParamsWithColon from "../utils/route/prefixParamsWithColon.js";
import CLIENT_STATIC_ROUTES from "./clientStaticRoutesConstants.js";

const DYNAMIC_SEGMENTS = prefixParamsWithColon(ROUTE_PARAMS);

const {
  JOIN_GROUP,
  TUTORIAL,
  SHARE_GROUP,
  LEAVE_GROUP,
  EXPENSE_DETAILS,
  PAYMENT_DETAILS,
  MEMBER_DETAILS,
  MEMBER_TRANSACTION_HISTORY,
  UPDATE_EXPENSE,
  UPDATE_PAYMENT,
} = CLIENT_STATIC_ROUTES;

const { GROUP_ID, MEMBER_ID, EXPENSE_ID, PAYMENT_ID } = DYNAMIC_SEGMENTS;

const CLIENT_ROUTE_PATTERNS = {
  // Group
  JOIN_GROUP: `${JOIN_GROUP}/${GROUP_ID}`,
  TUTORIAL: `${TUTORIAL}/${GROUP_ID}`,
  SHARE_GROUP: `${SHARE_GROUP}/${GROUP_ID}`,
  LEAVE_GROUP: `${LEAVE_GROUP}/${GROUP_ID}`,

  // Members
  MEMBER_DETAILS: `${MEMBER_DETAILS}/${MEMBER_ID}`,
  MEMBER_TRANSACTION_HISTORY: `${MEMBER_TRANSACTION_HISTORY}/${MEMBER_ID}`,

  // Transactions
  EXPENSE_DETAILS: `${EXPENSE_DETAILS}/${EXPENSE_ID}`,
  PAYMENT_DETAILS: `${PAYMENT_DETAILS}/${PAYMENT_ID}`,
  UPDATE_EXPENSE: `${UPDATE_EXPENSE}/${EXPENSE_ID}`,
  UPDATE_PAYMENT: `${UPDATE_PAYMENT}/${PAYMENT_ID}`,

  NOT_FOUND: "*",
};

const CLIENT_LINKS = {
  // Member Links
  MEMBER_DETAILS: (memberId) => `${MEMBER_DETAILS}/${memberId}`,
  MEMBER_TRANSACTION_HISTORY: (memberId) =>
    `${MEMBER_TRANSACTION_HISTORY}/${memberId}`,

  // Transaction Links
  EXPENSE_DETAILS: (expenseId) => `${EXPENSE_DETAILS}/${expenseId}`,
  PAYMENT_DETAILS: (paymentId) => `${PAYMENT_DETAILS}/${paymentId}`,
  UPDATE_EXPENSE: (expenseId) => `${UPDATE_EXPENSE}/${expenseId}`,
  UPDATE_PAYMENT: (paymentId) => `${UPDATE_PAYMENT}/${paymentId}`,

  // Group Links
  JOIN_GROUP: (groupId) => `${JOIN_GROUP}/${groupId}`,
  LEAVE_GROUP: (groupId) => `${LEAVE_GROUP}/${groupId}`,
  TUTORIAL: (groupId) => `${TUTORIAL}/${groupId}`,
  SHARE_GROUP: (groupId) => `${SHARE_GROUP}/${groupId}`,
};

const ROUTES = {
  PATTERNS: CLIENT_ROUTE_PATTERNS,
  LINKS: CLIENT_LINKS,
};

export default ROUTES;
