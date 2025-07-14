import { describe, it, expect } from 'vitest';
import { getNarratives } from '../src/api/index.js';

describe('getNarratives()', () => {
  it('returns an array of narratives', async () => {
    const narratives = await getNarratives();

    expect(Array.isArray(narratives)).toBe(true);
    expect(narratives.length).toBeGreaterThan(0);

    const narrative = narratives[0];
    expect(narrative).toHaveProperty('topic');
    expect(narrative).toHaveProperty('narrative');
    expect(narrative).toHaveProperty('summaryCount');
    expect(narrative).toHaveProperty('sentiment');
    expect(narrative).toHaveProperty('sources');
    expect(Array.isArray(narrative.sources)).toBe(true);
  });

  it('filters by topic if provided', async () => {
    const narratives = await getNarratives('sol');

    expect(narratives.length).toBe(1);
    expect(narratives[0].topic.toLowerCase()).toBe('sol');
  });
});
