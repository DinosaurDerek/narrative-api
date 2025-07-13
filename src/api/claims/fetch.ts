export async function fetchClaims(): Promise<any[]> {
  return [
    {
      claim: 'Ethereum is switching to proof of stake',
      claimant: 'Vitalik Buterin',
      reviewSource: 'Google Fact Check (Mock)',
      url: 'https://example.com/eth-pos',
    },
  ];
}
