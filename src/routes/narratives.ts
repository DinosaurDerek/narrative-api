import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { fetchNarratives } from '../api/index.js';

const QuerySchema = Type.Object({
  topic: Type.Optional(Type.String()),
});
type QueryType = Static<typeof QuerySchema>;

const ClaimSchema = Type.Object({
  topic: Type.String(),
  claim: Type.String(),
  claimant: Type.Optional(Type.String()),
  reviewSource: Type.String(),
  url: Type.String(),
});
const SummarySchema = Type.Object({
  topic: Type.String(),
  summary: Type.String(),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
});
const ResponseSchema = Type.Object({
  claims: Type.Array(ClaimSchema),
  summaries: Type.Array(SummarySchema),
});

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: QueryType }>(
    '/narratives',
    {
      schema: {
        querystring: QuerySchema,
        response: {
          200: ResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { topic } = request.query;
      const result = await fetchNarratives(topic);
      return result;
    }
  );
}
