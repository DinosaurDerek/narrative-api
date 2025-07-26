import { afterAll, beforeEach } from 'vitest';

import { prisma } from '../src/lib/prisma.js';
beforeEach(async () => {
  await prisma.brief.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
