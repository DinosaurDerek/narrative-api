import { Claim } from '../../types/claims.js';
import { fetchClaims } from './fetch.js';
import { mapClaims } from './map.js';

export async function getClaims(topic?: string): Promise<Claim[]> {
  const raw = await fetchClaims();
  const mapped = mapClaims(raw);

  return topic
    ? mapped.filter(c => c.topic.toLowerCase() === topic.toLowerCase())
    : mapped;
}
