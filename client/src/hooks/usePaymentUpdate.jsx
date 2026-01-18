import { useEffect, useState } from "react";

import { getActiveGroupCode } from "@utils/localStorageUtils";

import useFetchGroupMembers from "@hooks/useFetchGroupMembers";
import useFetchPaymentInfo from "@hooks/useFetchPaymentInfo";

const usePaymentUpdate = (paymentId) => {
  const groupCode = getActiveGroupCode();

  const { paymentInfo, error: fetchPaymentError } =
    useFetchPaymentInfo(paymentId);
  const { groupMembers, error: fetchGroupMembersError } =
    useFetchGroupMembers(groupCode);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (paymentInfo && groupMembers) {
      setIsLoading(false);
    }
  }, [paymentInfo, groupMembers]);

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
