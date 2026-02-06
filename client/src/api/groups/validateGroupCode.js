import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const {
  BASE,
  VALIDATE_GROUP_EXISTENCE_CONTINUOUS,
  VALIDATE_GROUP_EXISTENCE_LIMITED,
} = API_ROUTES.GROUPS;

export const validateGroupCode = async (
  groupCode,
  validationType = "continuous",
) => {
  debugLog(
    `Validating groupCode ${groupCode} in database (${validationType})`,
    {},
    INFO,
  );

  try {
    const validationPath =
      validationType === "limited"
        ? VALIDATE_GROUP_EXISTENCE_LIMITED
        : VALIDATE_GROUP_EXISTENCE_CONTINUOUS;

    const { data } = await axios.get(
      `${API_URL}/${BASE}/${groupCode}/${validationPath}`,
    );

    debugLog(`Group validation result`, { exists: data?.exists }, INFO);

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
