import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { debugLog } from "../../../shared/utils/debug";
import { API_URL } from "../constants/apiConstants";

const useGroupHasPersistedDebitorCreditorOrder = (groupCode) => {
  const { t } = useTranslation();
  const [hasPersistedOrder, setHasPersistedOrder] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersistedOrder = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/groups/${groupCode}/has-persisted-order`,
        );

        debugLog("Persisted order status fetched:", response);
        setHasPersistedOrder(response.data);
        setIsFetched(true);
      } catch (error) {
        debugLog("Error fetching persisted order status:", error);
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
