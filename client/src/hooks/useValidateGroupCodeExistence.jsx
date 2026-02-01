import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { API_ROUTES } from "../../../shared/constants/apiRoutesConstants";
import { API_URL } from "../constants/apiConstants";

function useValidateGroupExistence(groupCode, validationType = "continuous") {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const { t } = useTranslation();

  const {
    GROUPS_BASE,
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS,
    VALIDATE_GROUP_EXISTENCE_LIMITED,
  } = API_ROUTES.GROUPS;

  useEffect(() => {
    const validateGroup = async () => {
      setError(null);
      setIsValidated(false);

      try {
        devLog(`Validating groupCode ${groupCode} in database`);

        const validateGroupExistence =
          validationType === "limited"
            ? VALIDATE_GROUP_EXISTENCE_LIMITED
            : VALIDATE_GROUP_EXISTENCE_CONTINUOUS;

        const endpoint = `${API_URL}/${GROUPS_BASE}/${groupCode}/${validateGroupExistence}`;

        const { data } = await axios.get(endpoint);

        if (data?.exists) {
          setGroupExists(true);
          devLog(`Groupcode ${groupCode} exists.`);
        } else {
          setGroupExists(false);
          setError(t("validate-groupcode-error-groupcode-does-not-exist"));
          devLog(`Groupcode ${groupCode} does not exist.`);
        }
      } catch (err) {
        if (
          validationType === "limited" &&
          err.response?.status === StatusCodes.TOO_MANY_REQUESTS
        ) {
          setError(t("validate-groupcode-error-too-many-requests"));
          devLog("Too many validation requests.", err);
        } else {
          devLog("Error validating group code:", err);
          setError(t("generic-error-message"));
        }
      } finally {
        setIsValidated(true);
      }
    };

    if (groupCode) validateGroup();
  }, [
    groupCode,
    validationType,
    t,
    GROUPS_BASE,
    VALIDATE_GROUP_EXISTENCE_CONTINUOUS,
    VALIDATE_GROUP_EXISTENCE_LIMITED,
  ]);

  return { groupExists, error, isValidated };
}

export default useValidateGroupExistence;
