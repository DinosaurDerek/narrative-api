import { FarcasterCast } from './types.js';

export async function fetchFarcasterData(): Promise<FarcasterCast[]> {
  return [
    {
      hash: '0xabc123',
      text: 'Restaking is taking off again, big LRT season coming.',
      author: { fid: 1500, username: 'chainmaxi' },
      timestamp: '2025-07-10T15:32:00Z',
    },
    {
      hash: '0xdef456',
      text: 'SOL downtime again... how is this still happening?',
      author: { fid: 843, username: 'defiburner' },
      timestamp: '2025-07-10T14:20:00Z',
    },
    {
      hash: '0xghi789',
      text: 'ETH validator growth is quietly impressive.',
      author: { fid: 1934, username: 'quietbuilder' },
      timestamp: '2025-07-10T12:01:00Z',
    },
  ];
}
