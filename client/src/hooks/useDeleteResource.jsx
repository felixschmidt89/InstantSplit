import { useState, useCallback } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import requestDeleteResource from "../api/common/requestDeleteResource.js";
import { devLog } from "../utils/errorUtils";

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
      const response = await requestDeleteResource(resourceType, resourceId);

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(
          `Resource (${resourceType} ${resourceId}) deleted successfully.`,
        );

        if (onSuccess) {
          await onSuccess();
        }

        if (route) {
          navigate(route);
        }

        return response;
      }
    } catch (apiError) {
      if (apiError.response?.status === StatusCodes.BAD_REQUEST) {
        setError(apiError.response.data.message);
      } else {
        devLog(
          `Error deleting resource (${resourceType} ${resourceId}):`,
          apiError,
        );
        setError(t("generic-error-message"));
      }
      throw apiError;
    }
  }, [resourceType, resourceId, route, onSuccess, navigate, t]);

  return { deleteResource, resourceTypeSingular, error };
};

export default useDeleteResource;
