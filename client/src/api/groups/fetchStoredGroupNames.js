import axios from "axios";

import { API_ROUTES } from "../../../../shared/constants/apiRoutesConstants.js";
import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { BASE, STORED_GROUP_NAMES } = API_ROUTES.GROUPS;

export const fetchStoredGroupNames = async (groupCodesArray) => {
  debugLog(
    "Fetching stored group names",
    { count: groupCodesArray.length },
    INFO,
  );

  try {
    const groupCodesString = groupCodesArray.join(",");

    const { data } = await axios.get(
      `${API_URL}/${BASE}/${STORED_GROUP_NAMES}`,
      {
        params: { storedGroupCodes: groupCodesString },
      },
    );

    debugLog("Stored group names fetched", { results: data?.results }, INFO);

    return data;
  } catch (error) {
    debugLog(
      "Error fetching stored group names",
      { error: error.message },
      LOG_ERROR,
    );
    throw error;
  }
};
