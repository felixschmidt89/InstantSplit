import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import SERVER_CONFIG_CONSTANTS from './constants/serverConfigConstants.js';
import SERVER_LOG_TAGS from './constants/serverLogConstants.js';
import LOG_LEVELS from '../shared/constants/system/loggerConstants.js';

const { ENV_MODES, ENV_FILES } = SERVER_CONFIG_CONSTANTS;
const { SYSTEM, CRON } = SERVER_LOG_TAGS;
const { INFO, LOG_ERROR, SUCCESS } = LOG_LEVELS;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeEnv = process.env.NODE_ENV || ENV_MODES.DEVELOPMENT;
const envFile = ENV_FILES[nodeEnv] || ENV_FILES[ENV_MODES.DEVELOPMENT];

const envPath = path.resolve(__dirname, 'config', 'env', envFile);
console.log(
  `[${INFO}] [${SYSTEM}] Attempting to load environment from: ${envPath}`,
);

const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  console.error(
    `[${LOG_ERROR}] [${SYSTEM}] Failed to load environment file.`,
    dotenvResult.error.message,
  );
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error(
    `[${LOG_ERROR}] [${SYSTEM}] Environment file loaded, but MONGODB_URI is missing or empty.`,
  );
  process.exit(1);
}

console.log(`[${SUCCESS}] [${SYSTEM}] Environment loaded successfully.`);

const startServer = async () => {
  try {
    const { default: mongoose } = await import('mongoose');
    const { default: nodeCron } = await import('node-cron');
    const { default: serverConfig } =
      await import('./config/server/serverConfig.js');
    const { default: SYSTEM_CONSTANTS } =
      await import('../shared/constants/system/systemConstants.js');
    const { default: getPurgeCronScheduleInOneMinute } =
      await import('./utils/cron/getPurgeCronScheduleInOneMinute.js');
    const { default: expressApp } = await import('./expressApp.js');
    const { default: purgeInactiveGroups } =
      await import('./scripts/dataPurge/purgeInactiveGroups.js');

    const { PORT, IS_DEVELOPMENT, MONGODB_URI } = serverConfig;
    const { DATA_PURGE_CRON_SCHEDULE, SERVER_TIMEZONE } = SYSTEM_CONSTANTS;

    await mongoose.connect(MONGODB_URI);
    console.log(`[${SUCCESS}] [${SYSTEM}] Database connected`);

    const cronSchedule = IS_DEVELOPMENT
      ? getPurgeCronScheduleInOneMinute()
      : DATA_PURGE_CRON_SCHEDULE;

    nodeCron.schedule(
      cronSchedule,
      () => {
        console.log(`[${INFO}] [${CRON}] Running purgeInactiveGroups...`);
        purgeInactiveGroups();
      },
      { timezone: SERVER_TIMEZONE },
    );

    // 5. Server Execution
    expressApp.listen(PORT, () => {
      const mode = IS_DEVELOPMENT ? 'development' : 'production';
      console.log(
        `[${SUCCESS}] [${SYSTEM}] App is running on port ${PORT} in ${mode} environment`,
      );
    });
  } catch (error) {
    console.error(`[${LOG_ERROR}] [${SYSTEM}]`, error.message);
    console.log('🤨');
    process.exit(1);
  }
};

// TODO: Make this a script
// import seedDemoData from './scripts/DataSeeder/seedDemoData.js';

startServer();
