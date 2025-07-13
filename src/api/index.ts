import { Claim } from '../types/claims.js';
import { Summary } from '../types/summaries.js';
import { getClaims } from './claims/index.js';
import { getSummaries } from './summaries/index.js';

export async function fetchNarratives(): Promise<{
  claims: Claim[];
  summaries: Summary[];
}> {
  const [claims, summaries] = await Promise.all([getClaims(), getSummaries()]);

  return {
    claims,
    summaries,
  };
}
