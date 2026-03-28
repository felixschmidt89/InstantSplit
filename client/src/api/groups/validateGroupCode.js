import apiClient from "../axiosInstance.js";
import API_ROUTES from "../../../../shared/constants/api/apiRouteConstants.js";

const { GROUPS } = API_ROUTES;

// TODO: Drop limited
const validateGroupCode = async (groupCode) => {
  const { data } = await apiClient.get(
    `/${GROUPS.BASE}/${groupCode}/${GROUPS.VALIDATE_GROUP_EXISTENCE}`,
  );

  return data;
};

export default validateGroupCode;
