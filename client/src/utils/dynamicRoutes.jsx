import { ROUTES } from "../constants/clientStaticRoutesConstants";
import { createRoute, buildDynamicRoute } from "./routeBuilders";

export const dynamicRoutes = {
  join: (initialGroupName, groupCode, language = "en") => {
    const ROUTE =
      language === "de" ? ROUTES.JOIN_GROUP.DE : ROUTES.JOIN_GROUP.EN;
    return buildDynamicRoute(ROUTE, { initialGroupName, groupCode });
  },

  tutorial: createRoute(ROUTES.TUTORIAL, ["initialGroupName", "groupCode"]),
  leaveGroup: createRoute(ROUTES.LEAVE_GROUP, ["groupName", "groupCode"]),
  shareGroup: createRoute(ROUTES.SHARE_GROUP, [
    "initialGroupName",
    "groupCode",
  ]),

  expense: {
    update: createRoute(ROUTES.EXPENSE.UPDATE, ["groupCode", "expenseId"]),
    details: createRoute(ROUTES.EXPENSE.DETAILS, ["groupCode", "itemId"]),
  },

  payment: {
    update: createRoute(ROUTES.PAYMENT.UPDATE, ["groupCode", "paymentId"]),
    details: createRoute(ROUTES.PAYMENT.DETAILS, ["groupCode", "itemId"]),
  },

  members: {
    details: createRoute(ROUTES.MEMBERS.DETAILS, ["groupCode", "memberId"]),
    transactionHistory: createRoute(ROUTES.MEMBERS.TRANSACTION_HISTORY, [
      "groupCode",
      "memberId",
    ]),
  },
};
