import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for updating a user's debitorIndex
 * @param {string} groupCode - The groupCode of the group
 * @param {string} userId - The ID of the user to update
 * @param {number} debitorIndex - The new debitorIndex value (non-negative integer)
 * @returns {Object} - An object containing the update state
 * @property {boolean} isLoading - Indicates if the update request is in progress
 * @property {string|null} error - The error message if an error occurred
 * @property {boolean} isUpdated - Indicates if the debitorIndex was successfully updated
 */
const useSetDebitorIndex = (groupCode, userId, debitorIndex) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const updateDebitorIndex = async () => {
      if (
        groupCode &&
        userId &&
        Number.isInteger(debitorIndex) &&
        debitorIndex >= 0
      ) {
        setIsLoading(true);
        setError(null);
        setIsUpdated(false);

        try {
          const response = await axios.patch(
            `${apiUrl}/users/${userId}/debitorIndex`,
            {
              groupCode,
              debitorIndex,
            }
          );

          devLog("debitorIndex updated:", response);
          setIsUpdated(true);
        } catch (error) {
          devLog("Error updating debitorIndex:", error);
          setError(error.response?.data?.message || t("generic-error-message"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateDebitorIndex();
  }, [groupCode, userId, debitorIndex, t]);

  return { isLoading, error, isUpdated };
};

export default useSetDebitorIndex;
