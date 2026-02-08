import { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_URL } from "../constants/apiConstants";

const useDeleteResource = (resourceType, resourceId, route) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const resourceTypeSingular = resourceType.slice(0, -1);

  const deleteResource = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/${resourceType}/${resourceId}`,
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Resource (${resourceType} ${resourceId}) has been deleted.`);

        if (typeof route === "string" && route.trim().length > 0) {
          const cleanRoute = route.startsWith("/") ? route : `/${route}`;
          navigate(cleanRoute);
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
