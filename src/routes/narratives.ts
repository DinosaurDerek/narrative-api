import { FastifyInstance } from 'fastify';
import { fetchNarratives } from '../api/index.js';
import { authenticate } from '../middlewares/authMiddleware.js';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/narratives',
    { preHandler: authenticate },
    async (request, reply) => {
      const result = await fetchNarratives();
      return result;
    }
  );
}
