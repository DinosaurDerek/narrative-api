import { Claim } from '../../types/claims.js';
import { fetchClaims } from './fetch.js';
import { mapClaims } from './map.js';

export async function getClaims(): Promise<Claim[]> {
  const raw = await fetchClaims();
  return mapClaims(raw);
}
