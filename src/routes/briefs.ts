import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { prisma } from '../lib/prisma.js';
import { BriefSchema } from '../schemas/brief.js';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/briefs',
    {
      schema: {
        response: {
          200: Type.Array(BriefSchema),
        },
      },
    },
    async (_request, _reply) => {
      const briefs = await prisma.brief.findMany({
        orderBy: { createdAt: 'desc' },
        include: { narratives: true },
      });

      return briefs;
    }
  );

  fastify.get('/briefs/:id', {
    schema: {
      params: Type.Object({
        id: Type.String({ format: 'uuid' }),
      }),
      response: {
        200: BriefSchema,
      },
    },
    async handler(request, reply) {
      const { id } = request.params as { id: string };
      const brief = await prisma.brief.findUnique({
        where: { id },
        include: { narratives: true, notes: true },
      });

      if (!brief) return reply.code(404).send({ error: 'Brief not found' });

      return brief;
    },
  });

  fastify.get(
    '/briefs/date/:date',
    {
      schema: {
        params: Type.Object({
          date: Type.String({ format: 'date' }), // YYYY-MM-DD
        }),
        response: {
          200: BriefSchema,
        },
      },
    },
    async (request, reply) => {
      const { date } = request.params as { date: string };
      const inputDate = new Date(date);
      const nextDay = new Date(inputDate);
      nextDay.setDate(inputDate.getDate() + 1);

      const brief = await prisma.brief.findFirst({
        where: {
          createdAt: {
            gte: inputDate,
            lt: nextDay,
          },
        },
        include: { narratives: true, notes: true },
      });

      if (!brief) return reply.code(404).send({ error: 'Brief not found' });

      return brief;
    }
  );

  // Temporary cleanup endpoint for free-tier hosted database
  fastify.delete('/dev/cleanup-duplicate-briefs', async () => {
    const deleted = await prisma.brief.deleteMany();

    return { deletedCount: deleted.count };
  });
}
