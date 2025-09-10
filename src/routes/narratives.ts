import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { getNarratives } from '../api/index.js';
import { NarrativeSchema } from '../schemas/narrative.js';
import { QuerySchema } from '../schemas/query.js';
import { Query } from '../types/query.js';
import { createDailyBriefIfNotExists } from '../utils/brief.js';

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: Query }>(
    '/narratives',
    {
      schema: {
        querystring: QuerySchema,
        response: {
          200: Type.Array(NarrativeSchema),
        },
      },
    },
    async (request, _reply) => {
      const { topic } = request.query;

      request.log.info({ topic }, 'Generating narratives');
      const narratives = await getNarratives(topic);
      request.log.info({ count: narratives.length }, 'Narratives generated');

      request.log.info({ topic }, 'Generating brief');

      // If a topic is specified, skip brief creation
      if (topic) {
        return narratives;
      }

      const brief = await createDailyBriefIfNotExists(narratives);
      brief
        ? request.log.info({ brief: brief.id }, 'Brief generated')
        : request.log.info('Brief already exists, skipping generation');

      return narratives;
    }
  );
}
