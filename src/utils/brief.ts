import { Brief } from '@prisma/client';

import { prisma } from '../lib/prisma.js';
import { NarrativeRecord } from '../types/brief.js';

export function getBriefCreatedAtDate(): Date {
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

export async function createDailyBriefIfNotExists(
  narrativeRecords: NarrativeRecord[] = []
): Promise<Brief | null> {
  const today = getBriefCreatedAtDate();

  // Check if a brief for today already exists
  const existingBrief = await prisma.brief.findFirst({
    where: { createdAt: { gte: today } },
  });

  if (existingBrief) {
    console.log('Brief for today already exists. Skipping creation.');
    return null;
  }

  // Create a new brief for today
  try {
    const brief = await createBrief(narrativeRecords);
    return brief;
  } catch (err: any) {
    if (err.code === 'P2002') {
      console.log('Brief for today already exists. Skipping creation.');
    } else {
      throw err;
    }

    return null;
  }
}
