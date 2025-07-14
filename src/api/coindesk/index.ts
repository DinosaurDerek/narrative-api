import { Summary } from '../../types/summary.js';
import { fetchCoindeskStories } from './fetch.js';
import { mapCoindeskData } from './map.js';

export async function getCoindeskSummaries(): Promise<Summary[]> {
  const raw = await fetchCoindeskStories();
  return mapCoindeskData(raw);
}
