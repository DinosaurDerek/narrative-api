import { Summary } from '../../types/summary.js';
import { fetchFarcasterData } from './fetch.js';
import { mapFarcasterData } from './map.js';

export async function getFarcasterSummaries(): Promise<Summary[]> {
  const raw = await fetchFarcasterData();
  return mapFarcasterData(raw);
}
