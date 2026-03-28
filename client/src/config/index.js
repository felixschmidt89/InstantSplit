import VITE_MODES from "../constants/configConstants.js";

const env = import.meta.env;

const CONFIG = {
  API_URL: env.VITE_REACT_APP_API_URL,
  BASE_URL: env.VITE_REACT_APP_BASE_URL,
  IS_DEV: env.MODE === VITE_MODES.DEVELOPMENT,
  MODE: env.MODE,
};

export default CONFIG;
