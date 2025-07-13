import { Summary } from '../../types/summaries.js';

export async function fetchSummaries(): Promise<Summary[]> {
  return [
    {
      topic: 'eth',
      summary:
        'Ethereum activity is up, driven by optimism around L2 rollups and restaking protocols.',
      sentiment: 'bullish',
    },
    {
      topic: 'btc',
      summary:
        'Bitcoin remains relatively stable despite minor ETF-related sell pressure.',
      sentiment: 'neutral',
    },
    {
      topic: 'sol',
      summary:
        'Solana posted strong developer growth numbers, but validator concentration is still a concern.',
      sentiment: 'neutral',
    },
    {
      topic: 'doge',
      summary:
        'Dogecoin has seen a resurgence in social media mentions after a meme revival.',
      sentiment: 'bullish',
    },
    {
      topic: 'eth',
      summary:
        'Debates continue over Ethereum’s decentralization as L2 adoption grows.',
      sentiment: 'neutral',
    },
    {
      topic: 'btc',
      summary:
        'On-chain data shows long-term holders accumulating Bitcoin at lower prices.',
      sentiment: 'bullish',
    },
  ];
}
