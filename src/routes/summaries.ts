import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { getFarcasterSummaries } from '../api/farcaster/index.js';
import { getDecryptSummaries } from '../api/decrypt/index.js';
import { getCoindeskSummaries } from '../api/coindesk/index.js';

const QuerySchema = Type.Object({
  topic: Type.Optional(Type.String()),
});
const SummarySchema = Type.Object({
  topic: Type.String(),
  summary: Type.String(),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
  source: Type.String(),
});

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

      const summaries = [
        ...(await getFarcasterSummaries()),
        ...(await getDecryptSummaries()),
        ...(await getCoindeskSummaries()),
      ];

      const filtered = topic
        ? summaries.filter(s => s.topic === topic.toLowerCase())
        : summaries;

      return filtered;
    }
  );
}
