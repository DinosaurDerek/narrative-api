import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

import { getNarratives } from '../api/index.js';

const QuerySchema = Type.Object({
  topic: Type.Optional(Type.String()),
});
type QueryType = Static<typeof QuerySchema>;

const NarrativeSchema = Type.Object({
  topic: Type.String(),
  narrative: Type.String(),
  summaryCount: Type.Number(),
  sources: Type.Array(Type.String()),
  sentiment: Type.Union([
    Type.Literal('bullish'),
    Type.Literal('bearish'),
    Type.Literal('neutral'),
  ]),
});

const ResponseSchema = Type.Array(NarrativeSchema);

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
      const result = await getNarratives(topic);
      return result;
    }
  );
}
