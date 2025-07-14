import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { HealthSchema } from '../schemas/health.js';

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/health',
    {
      schema: {
        response: {
          200: HealthSchema,
        },
      },
    },
    async (_request: FastifyRequest, _reply: FastifyReply) => {
      return { status: 'ok' };
    }
  );
}
