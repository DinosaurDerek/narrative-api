import { Summary } from '../../types/summary.js';
import { fetchDecryptArticles } from './fetch.js';
import { mapDecryptData } from './map.js';

export async function getDecryptSummaries(): Promise<Summary[]> {
  const raw = await fetchDecryptArticles();
  return mapDecryptData(raw);
}
