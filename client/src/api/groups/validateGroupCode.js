import apiClient from "../axiosInstance.js";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";

const { LOG_ERROR } = LOG_LEVELS;
const {
  BASE,
  VALIDATE_GROUP_EXISTENCE_CONTINUOUS,
  VALIDATE_GROUP_EXISTENCE_LIMITED,
} = API_ROUTES.GROUPS;

export const validateGroupCode = async (
  groupCode,
  validationType = "continuous",
) => {
  try {
    const validationPath =
      validationType === "limited"
        ? VALIDATE_GROUP_EXISTENCE_LIMITED
        : VALIDATE_GROUP_EXISTENCE_CONTINUOUS;

    const { data } = await apiClient.get(
      `/${BASE}/${groupCode}/${validationPath}`,
    );

    return data;
  } catch (error) {
    debugLog(
      "Error validating group code",
      { error: error.message, groupCode },
      LOG_ERROR,
    );
    throw error;
  }
};
