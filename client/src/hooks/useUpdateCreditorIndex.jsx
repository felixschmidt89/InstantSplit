import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for updating a user's creditorIndex
 * @param {string} groupCode - The groupCode of the group
 * @param {string} userId - The ID of the user to update
 * @param {number} creditorIndex - The new creditorIndex value (non-negative integer)
 * @returns {Object} - An object containing the update state
 * @property {boolean} isLoading - Indicates if the update request is in progress
 * @property {string|null} error - The error message if an error occurred
 * @property {boolean} isUpdated - Indicates if the creditorIndex was successfully updated
 */
const useSetCreditorIndex = (groupCode, userId, creditorIndex) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const updateCreditorIndex = async () => {
      if (
        groupCode &&
        userId &&
        Number.isInteger(creditorIndex) &&
        creditorIndex >= 0
      ) {
        setIsLoading(true);
        setError(null);
        setIsUpdated(false);

        try {
          const response = await axios.patch(
            `${apiUrl}/users/${userId}/creditorIndex`,
            {
              groupCode,
              creditorIndex,
            }
          );

          devLog("creditorIndex updated:", response);
          setIsUpdated(true);
        } catch (error) {
          devLog("Error updating creditorIndex:", error);
          setError(error.response?.data?.message || t("generic-error-message"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    updateCreditorIndex();
  }, [groupCode, userId, creditorIndex, t]);

  return { isLoading, error, isUpdated };
};

export default useSetCreditorIndex;
