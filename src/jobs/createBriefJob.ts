import cron from 'node-cron';

import { getNarratives } from '../api/index.js';
import { createDailyBriefIfNotExists } from '../utils/brief.js';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Brief creation job started');
    const narratives = await getNarratives();
    await createDailyBriefIfNotExists(narratives);
    console.log('Brief creation job finished successfully');
  } catch (err) {
    console.log('Brief creation job failed', err);
  }
});
