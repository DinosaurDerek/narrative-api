import { describe, it, expect, beforeEach, afterAll } from 'vitest';

import { prisma } from '../src/lib/prisma.js';
import {
  getBriefCreatedAtDate,
  createBrief,
  createDailyBriefIfNotExists,
} from '../src/utils/brief.js';

describe('brief utils', () => {
  it('getBriefCreatedAtDate returns today at midnight UTC', () => {
    const date = getBriefCreatedAtDate();
    const now = new Date();

    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(0);
    expect(date.getUTCSeconds()).toBe(0);
    expect(date.getUTCMilliseconds()).toBe(0);
    // Should be today
    expect(date.getUTCFullYear()).toBe(now.getUTCFullYear());
    expect(date.getUTCMonth()).toBe(now.getUTCMonth());
    expect(date.getUTCDate()).toBe(now.getUTCDate());
  });

  it('createBrief creates a brief with narratives', async () => {
    const brief = await createBrief([
      { topic: 'crypto', sentiment: 'bullish' },
      { topic: 'sol', sentiment: 'bearish' },
    ]);

    expect(brief).toHaveProperty('id');

    // Check in DB
    const found = await prisma.brief.findUnique({
      where: { id: brief.id },
      include: { narratives: true },
    });

    expect(found).not.toBeNull();
    expect(found!.narratives.length).toBe(2);
    expect(found!.narratives[0]).toHaveProperty('topic');
    expect(found!.narratives[0]).toHaveProperty('sentiment');
  });

  it('createDailyBriefIfNotExists creates a brief if none exists for today', async () => {
    const brief = await createDailyBriefIfNotExists([
      { topic: 'btc', sentiment: 'bullish' },
    ]);

    expect(brief).not.toBeNull();

    const found = await prisma.brief.findFirst({
      where: { id: brief!.id },
      include: { narratives: true },
    });

    expect(found).not.toBeNull();
    expect(found!.narratives.length).toBe(1);
    expect(found!.narratives[0].topic).toBe('btc');
  });

  it('createDailyBriefIfNotExists does not create a duplicate brief for today', async () => {
    const first = await createDailyBriefIfNotExists([
      { topic: 'btc', sentiment: 'bullish' },
    ]);
    const second = await createDailyBriefIfNotExists([
      { topic: 'eth', sentiment: 'bearish' },
    ]);

    expect(first).not.toBeNull();
    expect(second).toBeNull(); // Should skip creation
    // Only one brief in DB
    const briefs = await prisma.brief.findMany();
    expect(briefs.length).toBe(1);
  });
});
