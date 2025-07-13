import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Type } from '@sinclair/typebox';

export default async function healthRoutes(fastify: FastifyInstance) {
  const HealthSchema = {
    response: {
      200: Type.Object({
        status: Type.String(),
      }),
    },
  };

  fastify.get(
    '/health',
    {
      schema: HealthSchema,
    },
    async (_request: FastifyRequest, _reply: FastifyReply) => {
      return { status: 'ok' };
    }
  );
}
