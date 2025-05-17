import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for updating the fixedDebitorCreditorOrder setting of a group.
 *
 * @param {string} groupCode - The groupCode of the group to update
 * @param {boolean} fixedDebitorCreditorOrder - The new setting value (true or false)
 * @returns {Object} - An object containing the update state
 * @property {boolean} isLoading - Indicates if the update request is in progress
 * @property {string|null} error - The error message if an error occurred
 * @property {boolean} isUpdated - Indicates if the setting was successfully updated
 */
const useSetFixedDebitorCreditorOrder = (
  groupCode,
  fixedDebitorCreditorOrder
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
            `${apiUrl}/groups/fixedDebitorCreditorOrder/${groupCode}`,
            {
              groupCode,
              fixedDebitorCreditorOrder,
            }
          );
          devLog("fixedDebitorCreditorOrder setting updated:", response);
          setIsUpdated(true);
        } catch (error) {
          devLog("Error updating fixedDebitorCreditorOrder setting:", error);
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
