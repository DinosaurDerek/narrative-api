import { Summary } from '../../types/summaries.js';
import { fetchSummaries } from './fetch.js';
import { mapSummaries } from './map.js';

export async function getSummaries(topic?: string): Promise<Summary[]> {
  const raw = await fetchSummaries();
  const mapped = mapSummaries(raw);

  return topic
    ? mapped.filter(s => s.topic.toLowerCase() === topic.toLowerCase())
    : mapped;
}
