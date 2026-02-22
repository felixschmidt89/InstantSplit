import { useEffect, useState } from "react";

import useFetchExpenseInfo from "./useFetchExpenseInfo";
import { getActiveGroupCode } from "../utils/localStorage";
import { useGroupContext } from "../context/GroupContext.jsx";

const useUpdateExpense = (expenseId) => {
  const groupCode = getActiveGroupCode();

  const { expenseInfo, error: fetchExpenseError } =
    useFetchExpenseInfo(expenseId);

  const {
    groupMembers,
    error: groupMembersError,
    isFetched: isGroupMembersFetched,
  } = useGroupContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasRequiredData = expenseInfo && isGroupMembersFetched;
    const hasErrors = Boolean(fetchExpenseError || groupMembersError);

    if (hasRequiredData || hasErrors) {
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
