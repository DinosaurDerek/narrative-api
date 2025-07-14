import { Summary } from '../../types/summary.js';

type FarcasterCast = {
  hash: string;
  text: string;
  author: {
    fid: number;
    username: string;
  };
  timestamp: string;
};

export function mapFarcasterData(
  raw: FarcasterCast[],
  topic?: string
): Summary[] {
  return raw
    .map(cast => ({
      topic: inferTopic(cast.text),
      summary: cast.text,
      sentiment: inferSentiment(cast.text),
      source: 'farcaster',
    }))
    .filter(s => (topic ? s.topic === topic.toLowerCase() : true));
}

function inferTopic(text: string): string {
  if (/eth/i.test(text)) return 'eth';
  if (/sol/i.test(text)) return 'sol';
  if (/btc|bitcoin/i.test(text)) return 'btc';
  return 'general';
}

function inferSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  if (/down|halt|crash|skeptical/i.test(text)) return 'bearish';
  if (/growth|momentum|surge|impressive/i.test(text)) return 'bullish';
  return 'neutral';
}
