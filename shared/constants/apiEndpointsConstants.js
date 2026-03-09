import { API_URL } from "../../client/src/constants/apiConstants.js";
import { API_ROUTES } from "./apiRoutesConstants.js";

const { BASE, VALIDATE_GROUP_EXISTENCE_CONTINUOUS, CURRENCY } =
  API_ROUTES.GROUPS;

export const API_ENDPOINTS = {
  GROUPS: {
    // TODO: Update so that groupcode is not exposed
    VALIDATE_EXISTENCE_CONTINUOUS: (groupCode) =>
      `${API_URL}/${BASE}/${groupCode}/${VALIDATE_GROUP_EXISTENCE_CONTINUOUS}`,

    CURRENCY: `${API_URL}/${BASE}/${CURRENCY}`,
  },
};
