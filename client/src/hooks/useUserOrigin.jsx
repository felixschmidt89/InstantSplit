import { useEffect, useState } from "react";
import {
  getNestedPreviousRouteFromLocalStorage,
  getPreviousRouteFromLocalStorage,
} from "../utils/localStorage";
import { ROUTE_IDENTIFIERS } from "../constants/clientRoutesConstants";

const {
  EXPENSE_DETAILS,
  PAYMENT_DETAILS,
  MEMBER_TRANSACTION_HISTORY,
  JOIN_GROUP_DE,
  JOIN_GROUP_EN,
} = ROUTE_IDENTIFIERS;

const useUserOrigin = () => {
  const [isFromGroupHistory, setIsFromGroupHistory] = useState(false);
  const [isFromUserHistory, setIsFromUserHistory] = useState(false);
  const [isInvitedUser, setIsInvitedUser] = useState(false);
  const [isOriginChecked, setIsOriginChecked] = useState(false);

  const previousRoute = getPreviousRouteFromLocalStorage() ?? "";
  const nestedPreviousRoute = getNestedPreviousRouteFromLocalStorage() ?? "";

  useEffect(() => {
    console.log("useUserOrigin: Identifying entry path...", {
      previousRoute,
      nestedPreviousRoute,
    });

    const fromGroupHistory =
      previousRoute.includes(EXPENSE_DETAILS) ||
      previousRoute.includes(PAYMENT_DETAILS);

    const fromUserHistory = nestedPreviousRoute.includes(
      MEMBER_TRANSACTION_HISTORY,
    );

    const fromInvite =
      previousRoute.includes(JOIN_GROUP_DE) ||
      previousRoute.includes(JOIN_GROUP_EN);

    setIsFromGroupHistory(fromGroupHistory);
    setIsFromUserHistory(fromUserHistory);
    setIsInvitedUser(fromInvite);
    setIsOriginChecked(true);

    console.log("useUserOrigin: Origin established", {
      isFromGroupHistory: fromGroupHistory,
      isFromUserHistory: fromUserHistory,
      isInvitedUser: fromInvite,
    });
  }, [nestedPreviousRoute, previousRoute]);

  return {
    isFromGroupHistory,
    isFromUserHistory,
    isInvitedUser,
    isOriginChecked,
  };
};

export default useUserOrigin;
