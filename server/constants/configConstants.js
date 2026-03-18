export const ENV_MODES = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export const ENV_FILES = {
  [ENV_MODES.PRODUCTION]: '.env.production',
  [ENV_MODES.DEVELOPMENT]: '.env.development',
};

export const BOOLEAN_STRINGS = {
  TRUE: 'true',
};

export const DEFAULTS = {
  PORT: 3000,
  API_BASEURL: '/api/v2',
};
