import { Claim } from '../types/claims.js';
import { Summary } from '../types/summaries.js';
import { getClaims } from './claims/index.js';
import { getSummaries } from './summaries/index.js';

export async function fetchNarratives(topic?: string): Promise<{
  claims: Claim[];
  summaries: Summary[];
}> {
  const [claims, summaries] = await Promise.all([
    getClaims(topic),
    getSummaries(topic),
  ]);

  return {
    claims,
    summaries,
  };
}
