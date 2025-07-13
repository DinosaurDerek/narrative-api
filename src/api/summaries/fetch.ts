import { Summary } from '../../types/summaries.js';

export async function fetchSummaries(): Promise<Summary[]> {
  return [
    {
      topic: 'eth',
      summary:
        'Ethereum has seen increased developer activity this week, with continued optimism around L2 scaling solutions.',
      sentiment: 'bullish',
    },
    {
      topic: 'sol',
      summary:
        'Solana experienced a spike in transaction volume, but concerns remain over centralization of validators.',
      sentiment: 'neutral',
    },
    {
      topic: 'btc',
      summary:
        'Bitcoin remains stable despite macroeconomic uncertainty, with on-chain data suggesting long-term holder accumulation.',
      sentiment: 'neutral',
    },
  ];
}
