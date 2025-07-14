import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { getNarratives } from '../api/index.js';
import { NarrativeSchema } from '../schemas/narrative.js';
import { QuerySchema } from '../schemas/query.js';
import { QueryType } from '../types/query.js';

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: QueryType }>(
    '/narratives',
    {
      schema: {
        querystring: QuerySchema,
        response: {
          200: Type.Array(NarrativeSchema),
        },
      },
    },
    async (request, reply) => {
      const { topic } = request.query;

      request.log.info({ topic }, 'Generating narratives');
      const narratives = await getNarratives(topic);
      request.log.info({ count: narratives.length }, 'Narratives generated');

      return narratives;
    }
  );
}
