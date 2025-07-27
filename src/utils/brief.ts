import { Brief } from '@prisma/client';

import { prisma } from '../lib/prisma.js';
import { NarrativeRecord } from '../types/brief.js';

function getBriefCreatedAtDate(): Date {
  const createdAt = new Date();
  createdAt.setUTCHours(0, 0, 0, 0); // set to midnight UTC

  return createdAt;
}

export async function createBrief(
  narrativeRecords: NarrativeRecord[] = []
): Promise<Brief> {
  return prisma.brief.create({
    data: {
      createdAt: getBriefCreatedAtDate(),
      narratives: {
        create: narrativeRecords,
      },
    },
  });
}
