import { describe, it, expect } from 'vitest';
import { computeNarrative } from '../src/api/index.js';
import { Summary } from '../src/types/summary.js';

describe('computeNarrative()', () => {
  const mockSummaries: Summary[] = [
    {
      topic: 'ethereum',
      summary: 'Ethereum is showing strength after ETF approval.',
      sentiment: 'bullish',
      source: 'decrypt',
    },
    {
      topic: 'ethereum',
      summary: 'Ethereum volumes spike as markets rebound.',
      sentiment: 'bullish',
      source: 'coindesk',
    },
    {
      topic: 'ethereum',
      summary: 'Ethereum funding rates remain flat.',
      sentiment: 'neutral',
      source: 'farcaster',
    },
  ];

  it('computes a narrative with correct sentiment and summaryCount', () => {
    const result = computeNarrative('ethereum', mockSummaries);

    expect(result.topic).toBe('ethereum');
    expect(result.summaryCount).toBe(3);
    expect(result.sources.sort()).toEqual(
      ['coindesk', 'decrypt', 'farcaster'].sort()
    );
    expect(result.sentiment).toBe('bullish');
    expect(typeof result.narrative).toBe('string');
    expect(result.narrative.length).toBeGreaterThan(0);
  });
});
