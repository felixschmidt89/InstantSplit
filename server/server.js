import mongoose from 'mongoose';
import app from './app.js';
import cron from 'node-cron';
import purgeInactiveGroups from './scripts/dataPurge/purgeInactiveGroups.js';
// import seedDemoData from './scripts/DataSeeder/seedDemoData.js';

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT, NODE_ENV } = process.env;

const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(db, mongooseOptions)
  .then(() => {
    console.log('Database connected! 😃');
  })
  .catch((error) => {
    console.log(error.message);
    console.log('🤨');
  });

// Active scripts
// Schedule the inactive group data purge based on the environment
const cronSchedule = NODE_ENV === 'development' ? '0 10 * * *' : '0 3 * * *';
cron.schedule(
  cronSchedule,
  () => {
    console.log(
      `Running purgeInactiveGroups at ${
        NODE_ENV === 'development' ? '10 am' : '3 am'
      }...`,
    );
    purgeInactiveGroups();
  },
  {
    timezone: 'Europe/Paris',
  },
);

// Inactive scripts
// seedDemoData('GT3A4WYSWYDD');

const port = PORT || 3000;

app.listen(port, () =>
  console.log(`App is running on port ${port} in ${NODE_ENV} environment`),
);
