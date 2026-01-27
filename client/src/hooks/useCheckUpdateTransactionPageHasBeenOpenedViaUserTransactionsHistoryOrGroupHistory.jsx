import { useEffect, useState } from "react";

import {
  getPreviousRoute,
  getNestedPreviousRoute,
} from "@/utils/localStorage/index.js";

const useDetermineUpdateTransactionPageOpeningSource = () => {
  const [openedViaGroupHistory, setOpenedViaGroupHistory] = useState(false);
  const [
    openedViaUserTransactionsHistory,
    setOpenedViaUserTransactionsHistory,
  ] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const previousRoute = getPreviousRoute() || "";
  const nestedPreviousRoute = getNestedPreviousRoute() || "";

  useEffect(() => {
    // Check if the page has been opened via GroupHistory or PaymentPage
    setOpenedViaGroupHistory(
      previousRoute.includes("expense-details") ||
        previousRoute.includes("payment-details"),
    );

    // Check if the page has been opened via UserTransactionsHistory
    setOpenedViaUserTransactionsHistory(
      nestedPreviousRoute.includes("/groupmember-transaction-history/"),
    );

    setIsChecked(true);
  }, [nestedPreviousRoute, previousRoute]);

  return {
    openedViaGroupHistory,
    openedViaUserTransactionsHistory,
    isChecked,
  };
};

export default useDetermineUpdateTransactionPageOpeningSource;
