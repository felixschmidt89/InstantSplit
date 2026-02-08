import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import useAppNavigate from "./useAppNavigate";
import { deleteResource as apiDeleteResource } from "../api/common/deleteResource";
import { devLog } from "../utils/errorUtils";

/**
 * Custom hook for managing the deletion of a specific backend resource.
 * Handles the API call, error states, optional navigation, and optional success callbacks.
 *
 * @param {string} resourceType - The plural name of the resource (e.g., 'users', 'expenses').
 * @param {string} resourceId - The unique ID of the resource to be deleted.
 * @param {string|null} [route] - Optional route path to navigate to upon successful deletion.
 * @param {Function} [onSuccess] - Optional callback function to execute upon successful deletion (e.g., refreshing a context list).
 * * @returns {Object} An object containing:
 * @returns {Function} deleteResource - The asynchronous function to trigger the deletion.
 * @returns {string} resourceTypeSingular - The singular version of the resource type.
 * @returns {string|null} error - The current error message string, if an error occurred.
 */
const useDeleteResource = (resourceType, resourceId, route, onSuccess) => {
  const { t } = useTranslation();
  const navigate = useAppNavigate();
  const [error, setError] = useState(null);
  const resourceTypeSingular = resourceType.slice(0, -1);

  const deleteResource = async () => {
    try {
      const response = await apiDeleteResource(resourceType, resourceId);

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Resource (${resourceType} ${resourceId}) has been deleted.`);

        if (onSuccess) {
          await onSuccess();
        }

        if (route) {
          navigate(route);
        }

        return response;
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        devLog(
          `Error deleting resource (${resourceType} ${resourceId}):`,
          error,
        );
        setError(t("generic-error-message"));
      }
      throw error;
    }
  };

  return { deleteResource, resourceTypeSingular, error };
};

export default useDeleteResource;
