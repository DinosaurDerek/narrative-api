import { Summary } from '../../types/summaries.js';
import { fetchSummaries } from './fetch.js';
import { mapSummaries } from './map.js';

export async function getSummaries(): Promise<Summary[]> {
  const raw = await fetchSummaries();
  return mapSummaries(raw);
}
