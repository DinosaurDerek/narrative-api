import { Summary } from '../../types/summary.js';

type CoindeskStory = {
  uuid: string;
  headline: string;
  summary: string;
  date: string;
  byline: string;
};

export function mapCoindeskData(
  raw: CoindeskStory[],
  topic?: string
): Summary[] {
  return raw
    .map(story => ({
      topic: inferTopic(story.headline + ' ' + story.summary),
      summary: story.summary,
      sentiment: inferSentiment(story.summary),
      source: 'coindesk',
    }))
    .filter(s => (topic ? s.topic === topic.toLowerCase() : true));
}

function inferTopic(text: string): string {
  if (/eth|ethereum/i.test(text)) return 'eth';
  if (/sol|solana/i.test(text)) return 'sol';
  if (/btc|bitcoin/i.test(text)) return 'btc';
  return 'general';
}

function inferSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  if (/halt|decline|concerns/i.test(text)) return 'bearish';
  if (/growth|momentum|strong|rebound/i.test(text)) return 'bullish';
  return 'neutral';
}
