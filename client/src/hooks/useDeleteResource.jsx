import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import useAppNavigate from "./useAppNavigate";
import { deleteResource as apiDeleteResource } from "../api/common/deleteResource";
import { devLog } from "../utils/errorUtils";

const useDeleteResource = (resourceType, resourceId, route) => {
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

        navigate(route);
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
