import { useEffect, useState } from "react";
import { getActiveGroupCode } from "../utils/localStorage";
import useFetchExpenseInfo from "./useFetchExpenseInfo";
import useFetchGroupMembers from "./useFetchGroupMembers";

const useExpenseUpdate = (expenseId) => {
  const groupCode = getActiveGroupCode();

  const { expenseInfo, error: fetchExpenseError } =
    useFetchExpenseInfo(expenseId);
  const { groupMembers, error: fetchGroupMembersError } =
    useFetchGroupMembers(groupCode);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (expenseInfo && groupMembers) {
      setIsLoading(false);
    }
  }, [expenseInfo, groupMembers]);

  return {
    isLoading,
    groupCode,
    expenseInfo,
    groupMembers,
    fetchGroupMembersError,
    fetchExpenseError,
  };
};

export default useExpenseUpdate;
