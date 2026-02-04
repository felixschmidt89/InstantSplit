import { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

import { devLog } from "../utils/errorUtils";
import { validateGroupCode } from "../api/groups/validateGroupCode";

function useValidateGroupExistence(groupCode, validationType = "continuous") {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const validate = async () => {
      setError(null);
      setIsValidated(false);

      try {
        const { exists } = await validateGroupCode(groupCode, validationType);

        if (exists) {
          setGroupExists(true);
        } else {
          setGroupExists(false);
          setError(t("validate-groupcode-error-groupcode-does-not-exist"));
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

    if (groupCode) {
      validate();
    }
  }, [groupCode, validationType, t]);

  return { groupExists, error, isValidated };
}

export default useValidateGroupExistence;
