import { useEffect, useState } from "react";
import useFetchPaymentInfo from "./useFetchPaymentInfo";
import useFetchGroupMembers from "./useFetchGroupMembers";
import { useGroupContext } from "../context/GroupContext.jsx";

const usePaymentUpdate = (paymentId) => {
  const { activeGroupCode: groupCode } = useGroupContext();

  const { paymentInfo, error: fetchPaymentError } =
    useFetchPaymentInfo(paymentId);

  const {
    groupMembers,
    error: fetchGroupMembersError,
    isFetched: isGroupMembersFetched,
  } = useFetchGroupMembers(groupCode);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasRequiredData = paymentInfo && isGroupMembersFetched;
    const hasErrors = Boolean(fetchPaymentError || fetchGroupMembersError);

    if (hasRequiredData || hasErrors) {
      setIsLoading(false);
    }
  }, [
    paymentInfo,
    isGroupMembersFetched,
    fetchPaymentError,
    fetchGroupMembersError,
  ]);

  return {
    isLoading,
    groupCode,
    paymentInfo,
    groupMembers,
    fetchPaymentError,
    fetchGroupMembersError,
  };
};

export default usePaymentUpdate;
