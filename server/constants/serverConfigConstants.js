const ENV_MODES = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
};

const ENV_FILES = {
  [ENV_MODES.PRODUCTION]: '.env.production',
  [ENV_MODES.DEVELOPMENT]: '.env.development',
  [ENV_MODES.EXAMPLE]: '.env.example',
};

const BOOLEAN_STRINGS = {
  TRUE: 'true',
  FALSE: 'false',
};

const DEFAULTS = {
  PORT: 3000,
  API_BASEURL: '/api/v2',
};

const SERVER_CONFIG_CONSTANTS = {
  ENV_MODES,
  ENV_FILES,
  BOOLEAN_STRINGS,
  DEFAULTS,
};

export default SERVER_CONFIG_CONSTANTS;
