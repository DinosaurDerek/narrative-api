import { DecryptArticle } from './types.js';

export async function fetchDecryptArticles(): Promise<DecryptArticle[]> {
  return [
    {
      id: 'eth-l2-surge',
      title: 'Ethereum L2s Surge in Usage and Fees',
      excerpt:
        'Layer 2 networks like Arbitrum and Base are pushing Ethereum usage to new highs.',
      published: '2025-07-10T09:00:00Z',
      author: 'Dan Crypto',
    },
    {
      id: 'btc-hashrate-drop',
      title: 'Bitcoin Hashrate Drops Slightly',
      excerpt:
        'Bitcoin miners see a temporary decline in rewards due to block timing variance.',
      published: '2025-07-10T08:00:00Z',
      author: 'Satoshi Dan',
    },
    {
      id: 'sol-milestone',
      title: 'Solana Crosses 2 Million Daily Transactions Again',
      excerpt:
        'Solana shows strong activity despite concerns over reliability.',
      published: '2025-07-10T07:00:00Z',
      author: 'Ana Sol',
    },
  ];
}
