import apiClient from "../axiosInstance.js";
import API_ROUTES from "../../../../shared/constants/api/apiRoutesConstants.js";

const { BASE } = API_ROUTES.MEMBERS;

const fetchGroupMembers = async (groupId) => {
  const { data } = await apiClient.get(`/${BASE}/${groupId}`);

  return data;
};

export default fetchGroupMembers;
