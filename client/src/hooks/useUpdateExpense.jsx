import { useEffect, useState } from "react";

import useFetchExpenseInfo from "./useFetchExpenseInfo";
import { getActiveGroupCode } from "../utils/localStorage";
import { useGroupMembersContext } from "../context/GroupMembersContext.jsx";

const useUpdateExpense = (expenseId) => {
  const groupCode = getActiveGroupCode();

  const { expenseInfo, error: fetchExpenseError } =
    useFetchExpenseInfo(expenseId);

  const {
    groupMembers,
    error: groupMembersError,
    isFetched: isGroupMembersFetched,
  } = useGroupMembersContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isReady = expenseInfo && isGroupMembersFetched;

    const hasErrors = fetchExpenseError || groupMembersError;

    if (isReady || hasErrors) {
      setIsLoading(false);
    }
  }, [
    expenseInfo,
    isGroupMembersFetched,
    fetchExpenseError,
    groupMembersError,
  ]);

  return {
    isLoading,
    groupCode,
    expenseInfo,
    groupMembers,
    fetchGroupMembersError: groupMembersError,
    fetchExpenseError,
  };
};

export default useUpdateExpense;
