import { Summary } from '../types/summary.js';
import { Narrative } from '../types/narrative.js';

import { getFarcasterSummaries } from './farcaster/index.js';
import { getDecryptSummaries } from './decrypt/index.js';
import { getCoindeskSummaries } from './coindesk/index.js';

function groupByTopic(summaries: Summary[]): Record<string, Summary[]> {
  return summaries.reduce(
    (acc, summary) => {
      const key = summary.topic.toLowerCase();
      acc[key] = acc[key] || [];
      acc[key].push(summary);
      return acc;
    },
    {} as Record<string, Summary[]>
  );
}

export function computeNarrative(
  topic: string,
  summaries: Summary[]
): Narrative {
  const sources = [...new Set(summaries.map(s => s.source))];
  const summaryCount = summaries.length;
  const narrative = summaries.map(s => s.summary).join(' ');

  // Naive sentiment averaging
  const sentimentScore = summaries.reduce((score, s) => {
    if (s.sentiment === 'bullish') return score + 1;
    if (s.sentiment === 'bearish') return score - 1;
    return score;
  }, 0);

  const sentiment =
    sentimentScore > 0 ? 'bullish' : sentimentScore < 0 ? 'bearish' : 'neutral';

  return {
    topic,
    narrative,
    summaryCount,
    sources,
    sentiment,
  };
}

export async function getNarratives(topic?: string): Promise<Narrative[]> {
  const allSummaries: Summary[] = [
    ...(await getFarcasterSummaries()),
    ...(await getDecryptSummaries()),
    ...(await getCoindeskSummaries()),
  ];

  const filtered = topic
    ? allSummaries.filter(s => s.topic.toLowerCase() === topic.toLowerCase())
    : allSummaries;

  const grouped = groupByTopic(filtered);

  return Object.entries(grouped).map(([topic, summaries]) =>
    computeNarrative(topic, summaries)
  );
}
