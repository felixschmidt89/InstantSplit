import ROUTE_PARAMS from "../../../shared/constants/api/routeParamConstants.js";
import prefixParamsWithColon from "../utils/route/prefixParamsWithColon.js";
import CLIENT_STATIC_ROUTES from "./clientStaticRoutesConstants.js";

const DYNAMIC_SEGMENTS = prefixParamsWithColon(ROUTE_PARAMS);

const {
  GROUPCODE_VALIDATOR,
  JOIN_GROUP_DE,
  JOIN_GROUP_EN,
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

const {
  GROUP_CODE,
  INITIAL_GROUP_NAME,
  GROUP_NAME,
  ITEM_ID,
  USER_ID,
  EXPENSE_ID,
  PAYMENT_ID,
} = DYNAMIC_SEGMENTS;

const CLIENT_ROUTE_PATTERNS = {
  GROUPCODE_VALIDATOR: `${GROUPCODE_VALIDATOR}/${GROUP_CODE}`,
  JOIN_GROUP_DE: `${JOIN_GROUP_DE}/${INITIAL_GROUP_NAME}/${GROUP_CODE}`,
  JOIN_GROUP_EN: `${JOIN_GROUP_EN}/${INITIAL_GROUP_NAME}/${GROUP_CODE}`,
  TUTORIAL: `${TUTORIAL}/${INITIAL_GROUP_NAME}/${GROUP_CODE}`,
  SHARE_GROUP: `${SHARE_GROUP}/${INITIAL_GROUP_NAME}/${GROUP_CODE}`,
  LEAVE_GROUP: `${LEAVE_GROUP}/${GROUP_NAME}/${GROUP_CODE}`,
  EXPENSE_DETAILS: `${EXPENSE_DETAILS}/${GROUP_CODE}/${ITEM_ID}`,
  PAYMENT_DETAILS: `${PAYMENT_DETAILS}/${GROUP_CODE}/${ITEM_ID}`,
  MEMBER_DETAILS: `${MEMBER_DETAILS}/${GROUP_CODE}/${USER_ID}`,
  MEMBER_TRANSACTION_HISTORY: `${MEMBER_TRANSACTION_HISTORY}/${GROUP_CODE}/${USER_ID}`,
  UPDATE_EXPENSE: `${UPDATE_EXPENSE}/${GROUP_CODE}/${EXPENSE_ID}`,
  UPDATE_PAYMENT: `${UPDATE_PAYMENT}/${GROUP_CODE}/${PAYMENT_ID}`,
  NOT_FOUND: "*",
};

const CLIENT_LINKS = {
  MEMBER_DETAILS: (groupCode, userId) =>
    `${MEMBER_DETAILS}/${groupCode}/${userId}`,

  MEMBER_TRANSACTION_HISTORY: (groupCode, userId) =>
    `${MEMBER_TRANSACTION_HISTORY}/${groupCode}/${userId}`,

  EXPENSE_DETAILS: (groupCode, itemId) =>
    `${EXPENSE_DETAILS}/${groupCode}/${itemId}`,

  PAYMENT_DETAILS: (groupCode, itemId) =>
    `${PAYMENT_DETAILS}/${groupCode}/${itemId}`,

  UPDATE_EXPENSE: (groupCode, expenseId) =>
    `${UPDATE_EXPENSE}/${groupCode}/${expenseId}`,

  UPDATE_PAYMENT: (groupCode, paymentId) =>
    `${UPDATE_PAYMENT}/${groupCode}/${paymentId}`,

  LEAVE_GROUP: (groupName, groupCode) =>
    `${LEAVE_GROUP}/${groupName}/${groupCode}`,

  TUTORIAL: (initialGroupName, groupCode) =>
    `${TUTORIAL}/${initialGroupName}/${groupCode}`,

  SHARE_GROUP: (initialGroupName, groupCode) =>
    `${SHARE_GROUP}/${initialGroupName}/${groupCode}`,
};

const ROUTES = {
  PATTERNS: CLIENT_ROUTE_PATTERNS,
  LINKS: CLIENT_LINKS,
};

export default ROUTES;
