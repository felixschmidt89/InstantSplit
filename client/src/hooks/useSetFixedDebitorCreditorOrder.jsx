import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_URL } from "../constants/apiConstants";
import { debugLog } from "../../../shared/utils/debug";

const useSetFixedDebitorCreditorOrder = (
  groupCode,
  fixedDebitorCreditorOrder,
) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const updateFixedDebitorCreditorOrder = async () => {
      if (groupCode && typeof fixedDebitorCreditorOrder === "boolean") {
        setIsLoading(true);
        setError(null);
        setIsUpdated(false);

        try {
          const response = await axios.patch(
            `${API_URL}/groups/fixedDebitorCreditorOrder/${groupCode}`,
            {
              groupCode,
              fixedDebitorCreditorOrder,
            },
          );
          debugLog("fixedDebitorCreditorOrder setting updated:", response);
          setIsUpdated(true);
        } catch (error) {
          debugLog("Error updating fixedDebitorCreditorOrder setting:", error);
          setError(t("generic-error-message"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateFixedDebitorCreditorOrder();
  }, [groupCode, fixedDebitorCreditorOrder, t]);

  return { isLoading, error, isUpdated };
};

export default useSetFixedDebitorCreditorOrder;
