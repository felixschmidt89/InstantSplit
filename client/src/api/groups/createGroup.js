import { API_URL, ENDPOINTS } from "@client-constants/apiConstants";
import { debugLog } from "@shared-utils/debug";
import axios from "axios";

export const createGroup = async (groupName) => {
  debugLog("Attempting to create group", { groupName }, "info");

  try {
    const { data } = await axios.post(`${API_URL}${ENDPOINTS.GROUPS}`, {
      groupName,
    });

    debugLog(
      "Group created successfully",
      { groupId: data.group?._id },
      "success",
    );
    return data;
  } catch (error) {
    debugLog(
      "Failed to create group",
      { error: error.message, groupName },
      "error",
    );
    throw error;
  }
};
