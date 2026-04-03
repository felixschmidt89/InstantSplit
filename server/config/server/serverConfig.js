import SERVER_CONFIG_CONSTANTS from '../../constants/serverConfigConstants.js';

const { ENV_MODES, BOOLEAN_STRINGS, DEFAULTS } = SERVER_CONFIG_CONSTANTS;

const nodeEnv = process.env.NODE_ENV || ENV_MODES.DEVELOPMENT;

const serverConfig = {
  NODE_ENV: nodeEnv,
  API_BASEURL: process.env.API_BASEURL || DEFAULTS.API_BASEURL,
  LOG_API_REQUESTS: process.env.LOG_API_REQUESTS === BOOLEAN_STRINGS.TRUE,
  PORT: process.env.PORT || DEFAULTS.PORT,
  TRUST_PROXY: process.env.TRUST_PROXY === BOOLEAN_STRINGS.TRUE || false,
  MONGODB_URI: process.env.MONGODB_URI,
};

export default serverConfig;
