import { useState, useCallback } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { deleteResource as apiDeleteResource } from "../api/common/deleteResource";
import { devLog } from "../utils/errorUtils";
import { useNavigate } from "react-router-dom";

const useDeleteResource = (resourceType, resourceId, route, onSuccess) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const resourceTypeSingular = resourceType ? resourceType.slice(0, -1) : "";

  const deleteResource = useCallback(async () => {
    if (!resourceType || !resourceId) {
      devLog("useDeleteResource: Missing resourceType or resourceId");
      return;
    }

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
  }, [resourceType, resourceId, route, onSuccess, navigate]);

  return { deleteResource, resourceTypeSingular, error };
};

export default useDeleteResource;
