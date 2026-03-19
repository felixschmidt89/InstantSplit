import mongoose from 'mongoose';
import cron from 'node-cron';

import app from './expressApp.js';
import purgeInactiveGroups from './scripts/dataPurge/purgeInactiveGroups.js';
import IS_DEVELOPMENT from '../shared/constants/system/environmentConstants.js';
// TODO: Make this a script
// import seedDemoData from './scripts/DataSeeder/seedDemoData.js';

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;

const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

// TODO: Improve and make it a util if working
const getDevCronSchedule = () => {
  const now = new Date();
  const nextMinuteDate = new Date(now.getTime() + 60000);
  const minutes = nextMinuteDate.getMinutes();
  const hours = nextMinuteDate.getHours();

  return `${minutes} ${hours} * * *`;
};

mongoose
  .connect(db)
  .then(() => {
    console.log('Database connected! 😃');
  })
  .catch((error) => {
    console.log(error.message);
    console.log('🤨');
  });

const cronSchedule = IS_DEVELOPMENT ? getDevCronSchedule() : '0 3 * * *';

const cronLogTime = IS_DEVELOPMENT ? '60 seconds after startup' : '3 am';

cron.schedule(
  cronSchedule,
  () => {
    console.log(`Running purgeInactiveGroups at ${cronLogTime}...`);
    purgeInactiveGroups();
  },
  {
    timezone: 'Europe/Paris',
  },
);
// TODO: Make this a script and run it manually when needed
// seedDemoData('GT3A4WYSWYDD');

const port = PORT || 3000;

app.listen(port, () => {
  const mode = IS_DEVELOPMENT ? 'development' : 'production';
  console.log(`App is running on port ${port} in ${mode} environment`);
});
