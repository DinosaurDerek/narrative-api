import cron from 'node-cron';

import { getNarratives } from '../api/index.js';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Brief creation job started');
    await getNarratives();
    console.log('Brief creation job finished successfully');
  } catch (err) {
    console.log('Brief creation job failed', err);
  }
});
