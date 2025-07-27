import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { prisma } from '../lib/prisma.js';
import { NoteSchema } from '../schemas/note.js';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/briefs/:briefId/notes',
    {
      schema: {
        params: Type.Object({
          briefId: Type.String({ format: 'uuid' }),
        }),
        response: {
          200: Type.Array(NoteSchema),
        },
      },
    },
    async request => {
      const { briefId } = request.params as { briefId: string };

      return prisma.note.findMany({
        where: { briefId },
        orderBy: { createdAt: 'asc' },
      });
    }
  );

  fastify.get(
    '/briefs/date/:date/notes',
    {
      schema: {
        params: Type.Object({
          date: Type.String({ format: 'date' }),
        }),
        response: {
          200: Type.Array(NoteSchema),
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
        include: {
          notes: { orderBy: { createdAt: 'asc' } },
        },
      });

      if (!brief) return reply.code(404).send({ error: 'Brief not found' });

      return brief.notes;
    }
  );

  fastify.post(
    '/briefs/:briefId/notes',
    {
      schema: {
        params: Type.Object({
          briefId: Type.String({ format: 'uuid' }),
        }),
        body: Type.Object({
          content: Type.String({ minLength: 1 }),
        }),
        response: {
          201: NoteSchema,
        },
      },
    },
    async (request, reply) => {
      const { briefId } = request.params as { briefId: string };
      const { content } = request.body as { content: string };

      const note = await prisma.note.create({
        data: { briefId, content },
      });

      return reply.code(201).send(note);
    }
  );

  fastify.patch(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String({ format: 'uuid' }),
        }),
        body: Type.Object({
          content: Type.String({ minLength: 1 }),
        }),
        response: {
          200: NoteSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { content } = request.body as { content: string };

      const note = await prisma.note.update({
        where: { id },
        data: { content },
      });

      return note;
    }
  );

  fastify.delete(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String({ format: 'uuid' }),
        }),
        response: {
          204: Type.Null(),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      await prisma.note.delete({ where: { id } });

      return reply.code(204).send();
    }
  );
}
