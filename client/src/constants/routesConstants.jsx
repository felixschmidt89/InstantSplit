import { devLog } from "../utils/errorUtils";

export const ROUTES = {
  HOME: "/",
  LEGAL_NOTICE: "/legal-notice",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  ONBOARDING: {
    GROUP_SETTINGS: "/onboarding-group-settings",
    CREATE_GROUP: "/onboarding-create-group",
    ENTER_GROUPCODE: "/onboarding-enter-groupcode",
  },
  VALIDATORS: {
    GROUPCODE: "/groupCode-validator/:groupCode",
  },
  JOIN_GROUP: {
    DE: "/join-instantsplit-group/:initialGroupName/:groupCode",
    EN: "/join-en-instantsplit-group/:initialGroupName/:groupCode",
  },
  TUTORIAL: "/tutorial/:initialGroupName/:groupCode",
  INSTANT_SPLIT: "/instant-split",
  EXPENSE: {
    CREATE: "/create-expense",
    UPDATE: "/update-expense/:groupCode/:expenseId",
    DETAILS: "/expense-details/:groupCode/:itemId",
  },
  PAYMENT: {
    CREATE: "/create-payment",
    UPDATE: "/update-payment/:groupCode/:paymentId",
    DETAILS: "/payment-details/:groupCode/:itemId",
  },
  MEMBERS: {
    CREATE: "/create-group-members",
    DETAILS: "/groupmember-details/:groupCode/:userId",
    TRANSACTION_HISTORY: "/groupmember-transaction-history/:groupCode/:userId",
  },
  SETTLE_EXPENSES: "/settle-expenses",
  LEAVE_GROUP: "/leave-group/:groupName/:groupCode",
  SHARE_GROUP: "/share-group/:initialGroupName/:groupCode",
  MANAGE_GROUPS: "/manage-groups",
  CONTACT: "/contact/:groupCode",
  GROUP_SETTINGS: "/group-settings",
  NOT_FOUND: "*",
};

export const getDynamicRoute = (path, params = {}) => {
  let dynamicPath = path;

  Object.entries(params).forEach(([key, value]) => {
    dynamicPath = dynamicPath.replace(`:${key}`, value);
  });
  devLog(`Generated dynamic route: ${path} -> ${dynamicPath}`, params);

  return dynamicPath;
};
