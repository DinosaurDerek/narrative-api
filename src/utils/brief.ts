import { Brief } from '@prisma/client';

import { prisma } from '../lib/prisma.js';
import { NarrativeRecord } from '../types/brief.js';
import { Narrative } from '../types/narrative.js';

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
  narratives: Narrative[] = []
): Promise<Brief | null> {
  const today = getBriefCreatedAtDate();

  // Check if a brief for today already exists
  const existingBrief = await prisma.brief.findFirst({
    where: { createdAt: { gte: today } },
  });

  if (existingBrief) {
    return null;
  }

  // Prepare narrative records for creation
  const narrativeRecords = narratives.map(n => ({
    topic: n.topic,
    sentiment: n.sentiment,
  }));

  // Create a new brief for today
  try {
    return await createBrief(narrativeRecords);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return null;
    }
    throw err;
  }
}
