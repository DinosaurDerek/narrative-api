import { CoindeskStory } from './types.js';

export async function fetchCoindeskStories(): Promise<CoindeskStory[]> {
  return [
    {
      uuid: 'story-eth-growth',
      headline: 'Ethereum Validators Top 1 Million',
      summary:
        'The Ethereum network now has over a million active validators, indicating strong ecosystem health.',
      date: '2025-07-09T22:00:00Z',
      byline: 'Jane Chain',
    },
    {
      uuid: 'story-restaking',
      headline: 'Restaking Gathers Momentum in DeFi',
      summary:
        'Restaking protocols like EigenLayer are becoming central to Ethereum’s security economy.',
      date: '2025-07-09T18:00:00Z',
      byline: 'Mike Modular',
    },
    {
      uuid: 'story-sol-rebound',
      headline: 'Solana Rebounds After Downtime Incident',
      summary:
        'SOL recovers in price and usage after addressing its latest network halt.',
      date: '2025-07-09T16:30:00Z',
      byline: 'Sam Speed',
    },
  ];
}
