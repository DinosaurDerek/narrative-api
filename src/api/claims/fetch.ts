import { Claim } from '../../types/claims.js';

export async function fetchClaims(): Promise<Claim[]> {
  return [
    {
      topic: 'eth',
      claim: 'Ethereum is switching to proof of stake',
      claimant: 'Vitalik Buterin',
      reviewSource: 'Google Fact Check (Mock)',
      url: 'https://example.com/eth-pos',
    },
    {
      topic: 'btc',
      claim: 'Bitcoin has no intrinsic value',
      claimant: 'Warren Buffett',
      reviewSource: 'Google Fact Check (Mock)',
      url: 'https://example.com/btc-value',
    },
    {
      topic: 'sol',
      claim: 'Solana went down again for over 4 hours',
      claimant: 'Crypto Twitter',
      reviewSource: 'Mock Aggregator',
      url: 'https://example.com/sol-downtime',
    },
    {
      topic: 'doge',
      claim: 'Dogecoin was created as a joke',
      claimant: 'Jackson Palmer',
      reviewSource: 'Mock Interview',
      url: 'https://example.com/doge-origin',
    },
    {
      topic: 'eth',
      claim: 'Layer 2s are scaling Ethereum, not replacing it',
      claimant: 'Bankless',
      reviewSource: 'Mock Podcast Summary',
      url: 'https://example.com/l2-eth',
    },
  ];
}
