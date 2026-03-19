import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  ENV_MODES,
  ENV_FILES,
  BOOLEAN_STRINGS,
  DEFAULTS,
} from '../constants/serverConfigConstants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeEnv = process.env.NODE_ENV || ENV_MODES.DEVELOPMENT;
const envFile = ENV_FILES[nodeEnv] || ENV_FILES[ENV_MODES.DEVELOPMENT];

dotenv.config({ path: path.resolve(__dirname, 'env', envFile) });

const serverConfig = {
  NODE_ENV: nodeEnv,
  API_BASEURL: process.env.API_BASEURL || DEFAULTS.API_BASEURL,
  LOG_API_REQUESTS: process.env.LOG_API_REQUESTS === BOOLEAN_STRINGS.TRUE,
  PORT: process.env.PORT || DEFAULTS.PORT,
  TRUST_PROXY: process.env.TRUST_PROXY === BOOLEAN_STRINGS.TRUE || false,
};

export default serverConfig;
