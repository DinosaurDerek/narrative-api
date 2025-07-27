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
      request.log.info({ briefId }, 'Fetching notes for brief');
      const notes = await prisma.note.findMany({
        where: { briefId },
        orderBy: { createdAt: 'asc' },
      });
      request.log.info(
        { briefId, count: notes.length },
        'Notes fetched for brief'
      );

      return notes;
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
      request.log.info({ date }, 'Fetching notes for brief by date');
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

      if (!brief) {
        request.log.info({ date }, 'No brief found for date');
        return reply.code(404).send({ error: 'Brief not found' });
      }

      request.log.info(
        { date, count: brief.notes.length },
        'Notes fetched for brief by date'
      );

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
      request.log.info({ briefId }, 'Creating note for brief');
      const note = await prisma.note.create({
        data: { briefId, content },
      });
      request.log.info({ briefId, noteId: note.id }, 'Note created for brief');

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
    async (request, _reply) => {
      const { id } = request.params as { id: string };
      const { content } = request.body as { content: string };
      request.log.info({ id }, 'Updating note');
      const note = await prisma.note.update({
        where: { id },
        data: { content },
      });
      request.log.info({ id }, 'Note updated');

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
      request.log.info({ id }, 'Deleting note');
      await prisma.note.delete({ where: { id } });
      request.log.info({ id }, 'Note deleted');

      return reply.code(204).send();
    }
  );
}
