import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for checking if any user in a group has a non-zero debitorIndex or creditorIndex.
 *
 * @param {string} groupCode - The groupCode of the group to check
 * @returns {Object} - An object containing the persisted order status and potential error.
 * @property {boolean|null} hasPersistedOrder - True if any user has non-zero debitorIndex or creditorIndex, null if not yet fetched
 * @property {boolean} isFetched - Indicates whether the data has been successfully fetched
 * @property {string|null} error - The error message if an error occurred
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
