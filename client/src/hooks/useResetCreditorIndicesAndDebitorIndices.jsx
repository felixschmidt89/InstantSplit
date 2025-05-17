import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for resetting creditorIndex and debitorIndex for all users in a group
 * @param {string} groupCode - The groupCode of the group
 * @returns {Object} - An object containing the reset state
 * @property {boolean} isLoading - Indicates if the reset request is in progress
 * @property {string|null} error - The error message if an error occurred
 * @property {boolean} isUpdated - Indicates if the indices were successfully reset
 */
const useResetCreditorIndicesAndDebitorIndices = (groupCode) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const resetIndices = async () => {
      if (groupCode) {
        setIsLoading(true);
        setError(null);
        setIsUpdated(false);

        try {
          const response = await axios.patch(
            `${apiUrl}/groups/reset-indices/${groupCode}`
          );

          devLog("Creditor and debitor indices reset:", response);
          setIsUpdated(true);
        } catch (error) {
          devLog("Error resetting creditor and debitor indices:", error);
          setError(error.response?.data?.message || t("generic-error-message"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    resetIndices();
  }, [groupCode, t]);

  return { isLoading, error, isUpdated };
};

export default useResetCreditorIndicesAndDebitorIndices;
