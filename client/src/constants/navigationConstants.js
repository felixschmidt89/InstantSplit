import { createRoute } from "../utils/routeBuilders.jsx";
import { CLIENT_ROUTES } from "./clientRoutesConstants";

const {
  EXPENSE,
  PAYMENT,
  MEMBERS,
  JOIN_GROUP,
  TUTORIAL,
  LEAVE_GROUP,
  SHARE_GROUP,
  CONTACT,
  INSTANT_SPLIT,
  SETTLE_EXPENSES,
  MANAGE_GROUPS,
  GROUP_SETTINGS,
} = CLIENT_ROUTES;

export const TO_EXPENSE = {
  CREATE: `/${EXPENSE.CREATE}`,
  UPDATE: createRoute(EXPENSE.UPDATE, ["groupCode", "expenseId"]),
  DETAILS: createRoute(EXPENSE.DETAILS, ["groupCode", "itemId"]),
};

export const TO_PAYMENT = {
  CREATE: `/${PAYMENT.CREATE}`,
  UPDATE: createRoute(PAYMENT.UPDATE, ["groupCode", "paymentId"]),
  DETAILS: createRoute(PAYMENT.DETAILS, ["groupCode", "itemId"]),
};

export const TO_MEMBERS = {
  CREATE: `/${MEMBERS.CREATE}`,
  DETAILS: createRoute(MEMBERS.DETAILS, ["groupCode", "userId"]),
  TRANSACTION_HISTORY: createRoute(MEMBERS.TRANSACTION_HISTORY, [
    "groupCode",
    "userId",
  ]),
};

export const TO_GROUP_ACTIONS = {
  JOIN_DE: createRoute(JOIN_GROUP.DE, ["initialGroupName", "groupCode"]),
  JOIN_EN: createRoute(JOIN_GROUP.EN, ["initialGroupName", "groupCode"]),
  TUTORIAL: createRoute(TUTORIAL, ["initialGroupName", "groupCode"]),
  LEAVE: createRoute(LEAVE_GROUP, ["groupName", "groupCode"]),
  SHARE: createRoute(SHARE_GROUP, ["initialGroupName", "groupCode"]),
};

export const TO = {
  HOME: `/`,
  CONTACT: createRoute(CONTACT, ["groupCode"]),
  INSTANT_SPLIT: `/${INSTANT_SPLIT}`,
  SETTLE_EXPENSES: `/${SETTLE_EXPENSES}`,
  MANAGE_GROUPS: `/${MANAGE_GROUPS}`,
  GROUP_SETTINGS: `/${GROUP_SETTINGS}`,
};
