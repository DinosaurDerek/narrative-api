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
    async (request, _reply) => {
      request.log.info('Fetching all briefs');
      const briefs = await prisma.brief.findMany({
        orderBy: { createdAt: 'desc' },
        include: { narratives: true },
      });
      request.log.info('Fetching all briefs');

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
      request.log.info({ id }, 'Fetching brief by id');
      const brief = await prisma.brief.findUnique({
        where: { id },
        include: { narratives: true, notes: true },
      });

      if (!brief) {
        request.log.info({ id }, 'Brief not found');
        return reply.code(404).send({ error: 'Brief not found' });
      }

      request.log.info({ id }, 'Brief found');
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
      request.log.info({ date }, 'Fetching brief by date');
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

      if (!brief) {
        request.log.info({ date }, 'Brief not found for date');
        return reply.code(404).send({ error: 'Brief not found' });
      }

      request.log.info({ id: brief.id, date }, 'Brief found for date');
      return brief;
    }
  );
}
