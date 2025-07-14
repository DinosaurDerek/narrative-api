import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { getFarcasterSummaries } from '../api/farcaster/index.js';
import { getDecryptSummaries } from '../api/decrypt/index.js';
import { getCoindeskSummaries } from '../api/coindesk/index.js';
import { QuerySchema } from '../schemas/query.js';
import { SummarySchema } from '../schemas/summary.js';

export default async function summariesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/summaries',
    {
      schema: {
        querystring: QuerySchema,
        response: {
          200: Type.Array(SummarySchema),
        },
      },
    },
    async (request, reply) => {
      const { topic } = request.query as { topic?: string };

      request.log.info({ topic }, 'Generating summaries');
      const summaries = [
        ...(await getFarcasterSummaries()),
        ...(await getDecryptSummaries()),
        ...(await getCoindeskSummaries()),
      ];
      request.log.info({ count: summaries.length }, 'Summaries generated');

      const filtered = topic
        ? summaries.filter(s => s.topic === topic.toLowerCase())
        : summaries;

      return filtered;
    }
  );
}
