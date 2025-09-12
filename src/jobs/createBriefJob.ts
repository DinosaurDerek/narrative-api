import cron from 'node-cron';

import { getNarratives } from '../api/index.js';
import { createDailyBriefIfNotExists } from '../utils/brief.js';

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Brief creation job started');

    const narratives = await getNarratives();
    const brief = await createDailyBriefIfNotExists(narratives);

    if (brief) {
      console.log(`Brief ${brief.id} created successfully`);
    } else {
      console.log('Brief already exists, skipping creation');
    }

    console.log('Brief creation job finished');
  } catch (err) {
    console.log('Brief creation job failed', err);
  }
});
