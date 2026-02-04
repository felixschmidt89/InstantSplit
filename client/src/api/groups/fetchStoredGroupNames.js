import axios from "axios";

import { LOG_LEVELS } from "../../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../../shared/utils/debug/debugLog.js";
import { API_URL, ENDPOINTS } from "../../constants/apiConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;
const { GROUPS, STORED_GROUP_NAMES } = ENDPOINTS;

export const fetchStoredGroupNames = async (groupCodesArray) => {
  debugLog(
    "Fetching stored group names",
    { count: groupCodesArray.length },
    INFO,
  );

  try {
    const groupCodesString = groupCodesArray.join(",");

    const { data } = await axios.get(
      `${API_URL}${GROUPS}${STORED_GROUP_NAMES}`,
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
