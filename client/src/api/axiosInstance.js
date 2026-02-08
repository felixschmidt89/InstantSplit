import axios from "axios";
import { API_URL } from "../constants/apiConstants.js";
import { LOG_LEVELS } from "../../../shared/constants/debugConstants.js";
import { debugLog } from "../../../shared/utils/debug/debugLog.js";

const { INFO, LOG_ERROR } = LOG_LEVELS;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    debugLog(
      `API Request: ${config.method.toUpperCase()} ${config.url}`,
      config.data ? { payload: config.data } : null,
      INFO,
    );
    return config;
  },
  (error) => {
    debugLog("API Request Error", error, LOG_ERROR);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    debugLog(
      `API Response: ${response.status} ${response.config.url}`,
      null,
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
