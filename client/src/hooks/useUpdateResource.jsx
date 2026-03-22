import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { updateResource as apiUpdateResource } from "../api/common/requestUpdateResource.js";
import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import { useNavigate } from "react-router-dom";

const { INFO, ERROR } = LOG_LEVELS;

const useUpdateResource = (resourceType, resourceId, route, onSuccess) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const resourceTypeSingular = resourceType.slice(0, -1);

  const updateResource = async (payload) => {
    try {
      const response = await apiUpdateResource(
        resourceType,
        resourceId,
        payload,
      );

      if (response.status === StatusCodes.OK) {
        setError(null);
        debugLog(
          `Resource (${resourceType} ${resourceId}) updated.`,
          response,
          INFO,
        );

        if (onSuccess) {
          await onSuccess();
        }

        if (route) {
          navigate(route);
        }

        return response;
      }
    } catch (updateError) {
      if (updateError.response?.status === StatusCodes.BAD_REQUEST) {
        setError(updateError.response.data.message);
      } else {
        debugLog(
          `Error updating resource (${resourceType} ${resourceId}):`,
          updateError,
          ERROR,
        );
        setError(t("generic-error-message"));
      }
      throw updateError;
    }
  };

  return { updateResource, resourceTypeSingular, error };
};

export default useUpdateResource;
