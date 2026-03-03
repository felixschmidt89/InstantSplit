import { API_URL } from "../../client/src/constants/apiConstants.js";
import { API_ROUTES } from "./apiRoutesConstants";

const { GROUPS } = API_ROUTES;

export const API_ENDPOINTS = {
  GROUPS: {
    // Returns: https://api.com/groups/:groupCode/continuous-validate-existence
    VALIDATE_EXISTENCE_CONTINUOUS: (groupCode) =>
      `${API_URL}/${GROUPS.BASE}/${groupCode}/${GROUPS.VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`,
  },
};
