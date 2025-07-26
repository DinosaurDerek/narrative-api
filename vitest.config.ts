import { defineConfig } from 'vitest/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    environment: 'node',
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: process.env.DATABASE_URL,
    },
    setupFiles: ['./tests/setup.ts'],
    maxWorkers: 1,
    sequence: {
      shuffle: false,
      concurrent: false,
    },
  },
});
