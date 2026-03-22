import axios from "axios";

import CONFIG from "../config/index.js";

import LOG_LEVELS from "../../../shared/constants/system/loggerConstants.js";
import debugLog from "../../../shared/utils/debug/debugLog.js";
import getActiveGroupCodeFromLocalStorage from "../utils/localStorage/getActiveGroupCodeFromLocalStorage.js";

import API_HEADER_CONSTANTS from "../../../shared/constants/api/apiHeaderConstants.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;

const { HEADERS, CONTENT_TYPES } = API_HEADER_CONSTANTS;
const { CONTENT_TYPE, GROUPCODE } = HEADERS;
const { JSON: JSON_CONTENT_TYPE } = CONTENT_TYPES;

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 30000,
  headers: {
    [CONTENT_TYPE]: JSON_CONTENT_TYPE,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const groupCode = getActiveGroupCodeFromLocalStorage();

    if (groupCode) {
      config.headers[GROUPCODE] = groupCode;
    }

    const hasPayload = Boolean(config.data);

    debugLog(
      `API Request: ${config.method.toUpperCase()} ${config.url}`,
      {
        payload: hasPayload ? config.data : null,
        headerAttached: Boolean(groupCode),
      },
      INFO,
    );

    return config;
  },
  (error) => {
    debugLog("API Request Error", { message: error.message }, LOG_ERROR);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    debugLog(
      `API Response: ${response.status} ${response.config.url}`,
      response.data ? { data: response.data } : null,
      INFO,
    );
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    const url = error.config?.url;

    debugLog(
      `API Error: ${message}`,
      { url, status: error.response?.status },
      LOG_ERROR,
    );

    return Promise.reject(error);
  },
);

export default apiClient;
