import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchGroupMembers } from "../api/users/fetchGroupMembers";
import {
  calculateAndAddUserBalance,
  filterUnsettledUsers,
} from "../utils/settlementUtils";
import { debugLog } from "../../../shared/utils/debug/debugLog";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants";

const { LOG_ERROR } = LOG_LEVELS;

const useFetchUnsettledGroupMembers = (groupCode) => {
  const { t } = useTranslation();

  const [unsettledUsers, setUnsettledUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUnsettledMembers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const responseData = await fetchGroupMembers(groupCode);

        if (responseData?.users?.length) {
          // Calculate balances for everyone
          const userDetails = responseData.users.map((user) =>
            calculateAndAddUserBalance(user),
          );
          // Filter out those with 0 balance
          const unsettledUserDetails = filterUnsettledUsers(userDetails);

          setUnsettledUsers(unsettledUserDetails);
        } else {
          setUnsettledUsers([]);
        }
      } catch (err) {
        debugLog(
          "Error fetching unsettled group members",
          { error: err.message, groupCode },
          LOG_ERROR,
        );
        setError(t("generic-error-message"));
      } finally {
        setIsLoading(false);
      }
    };

    if (groupCode) {
      getUnsettledMembers();
    }
  }, [groupCode, t]);

  return { unsettledUsers, isLoading, error };
};

export default useFetchUnsettledGroupMembers;
