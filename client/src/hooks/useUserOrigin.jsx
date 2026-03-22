import { useEffect, useState } from "react";
import getActiveGroupCodeFromLocalStorage from "../utils/localStorage/getActiveGroupCodeFromLocalStorage.js";
import getNestedPreviousRouteFromLocalStorage from "../utils/localStorage/getNestedPreviousRouteFromLocalStorage.js";
import getPreviousRouteFromLocalStorage from "../utils/localStorage/getPreviousRouteFromLocalStorage.js";
import CLIENT_STATIC_ROUTES from "../constants/clientStaticRoutesConstants.js";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";

const {
  EXPENSE_DETAILS,
  PAYMENT_DETAILS,
  MEMBER_TRANSACTION_HISTORY,
  JOIN_GROUP_DE,
  JOIN_GROUP_EN,
  ONBOARDING_CREATE_GROUP,
  MANAGE_GROUPS,
} = CLIENT_STATIC_ROUTES;

const { WARN, DEBUG } = LOG_LEVELS;

const useUserOrigin = () => {
  const [isOriginChecked, setIsOriginChecked] = useState(false);

  const previousRoute = getPreviousRouteFromLocalStorage() ?? "";
  const nestedPreviousRoute = getNestedPreviousRouteFromLocalStorage() ?? "";
  const activeGroupCode = getActiveGroupCodeFromLocalStorage();

  const isFromGroupHistory = Boolean(
    previousRoute.includes(EXPENSE_DETAILS) ||
    previousRoute.includes(PAYMENT_DETAILS),
  );

  const isFromUserHistory = Boolean(
    nestedPreviousRoute.includes(MEMBER_TRANSACTION_HISTORY),
  );

  const isFromInvitation = Boolean(
    previousRoute.includes(JOIN_GROUP_DE) ||
    previousRoute.includes(JOIN_GROUP_EN),
  );

  const isNewUser = Boolean(previousRoute.includes(ONBOARDING_CREATE_GROUP));
  const isFromGroupManagement = Boolean(previousRoute.includes(MANAGE_GROUPS));

  const isFromInstantSplit = Boolean(!previousRoute && activeGroupCode);

  const hasIdentifiedOrigin = Boolean(
    isFromGroupHistory ||
    isFromUserHistory ||
    isFromInvitation ||
    isNewUser ||
    isFromGroupManagement ||
    isFromInstantSplit,
  );

  const hasPreviousPath = Boolean(previousRoute || nestedPreviousRoute);

  const isOfUnknownOrigin = Boolean(hasPreviousPath && !hasIdentifiedOrigin);

  useEffect(() => {
    if (isOfUnknownOrigin) {
      debugLog(
        "useUserOrigin: Identifying entry path - UNKNOWN ORIGIN detected.",
        { previousRoute, nestedPreviousRoute },
        WARN,
      );
    }

    setIsOriginChecked(true);

    debugLog(
      "useUserOrigin: Origin identification complete",
      {
        isFromGroupHistory,
        isFromUserHistory,
        isFromInvitation,
        isNewUser,
        isFromGroupManagement,
        isFromInstantSplit,
        isOfUnknownOrigin,
      },
      DEBUG,
    );
  }, [
    isFromGroupHistory,
    isFromUserHistory,
    isFromInvitation,
    isNewUser,
    isFromGroupManagement,
    isFromInstantSplit,
    isOfUnknownOrigin,
    nestedPreviousRoute,
    previousRoute,
  ]);

  return {
    isFromGroupHistory,
    isFromUserHistory,
    isFromInvitation,
    isNewUser,
    isFromGroupManagement,
    isFromInstantSplit,
    isOfUnknownOrigin,
    isOriginChecked,
    previousRoute,
  };
};

export default useUserOrigin;
