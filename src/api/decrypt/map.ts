import { Summary } from '../../types/summary.js';

type DecryptArticle = {
  id: string;
  title: string;
  excerpt: string;
  published: string;
  author: string;
};

export function mapDecryptData(
  raw: DecryptArticle[],
  topic?: string
): Summary[] {
  return raw
    .map(article => ({
      topic: inferTopic(article.title + ' ' + article.excerpt),
      summary: article.excerpt,
      sentiment: inferSentiment(article.excerpt),
      source: 'decrypt',
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
  if (/decline|drop|concerns/i.test(text)) return 'bearish';
  if (/surge|growth|strong|record/i.test(text)) return 'bullish';
  return 'neutral';
}
