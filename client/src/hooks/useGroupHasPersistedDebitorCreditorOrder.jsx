import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * A React hook that fetches whether a group has a persisted debitor/creditor order.
 *
 * @param {string} groupCode - The unique code identifying the group.
 * @returns {Object} An object containing the fetch status and results:
 * @returns {boolean|null} hasPersistedOrder - Whether the group has a persisted order (true/false) or null if not yet fetched.
 * @returns {boolean} isFetched - Whether the fetch operation has completed.
 * @returns {string|null} error - Error message if the fetch failed, or null if no error occurred.
 */
const useGroupHasPersistedDebitorCreditorOrder = (groupCode) => {
  const { t } = useTranslation();
  const [hasPersistedOrder, setHasPersistedOrder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersistedOrder = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/has-persisted-order`
        );

        devLog("Persisted order status fetched:", response);
        setHasPersistedOrder(response.data);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching persisted order status:", error);
        setError(t("generic-error-message"));
        setIsFetched(true);
      }
    };

    if (groupCode) {
      fetchPersistedOrder();
    }
  }, [groupCode, t]);

  return { hasPersistedOrder, isFetched, error };
};

export default useGroupHasPersistedDebitorCreditorOrder;
