import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

import { prisma } from '../lib/prisma.js';
import { BriefSchema, BriefInputSchema } from '../schemas/brief.js';
import { isJsonCompatible } from '../utils/json.js';
import { BriefInput } from '../types/brief.js';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/briefs',
    {
      schema: {
        querystring: Type.Object({
          topic: Type.Optional(Type.String()),
        }),
        response: {
          200: Type.Array(BriefSchema),
        },
      },
    },
    async (request, reply) => {
      const { topic } = request.query as { topic?: string };

      const briefs = await prisma.brief.findMany({
        where: topic ? { topic } : {},
        orderBy: { date: 'desc' },
      });

      return briefs;
    }
  );

  fastify.post(
    '/briefs',
    {
      schema: {
        body: BriefInputSchema,
        response: {
          201: BriefSchema,
        },
      },
    },
    async (request, reply) => {
      const { date, topic, content } = request.body as BriefInput;

      if (!isJsonCompatible(content)) {
        throw new Error('Invalid JSON content');
      }

      const newBrief = await prisma.brief.create({
        data: {
          date: new Date(date),
          topic,
          content: content as any,
        },
      });

      reply.code(201).send(newBrief);
    }
  );

  fastify.put(
    '/briefs/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String({ format: 'uuid' }),
        }),
        body: BriefInputSchema,
        response: {
          200: BriefSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { date, topic, content } = request.body as BriefInput;

      if (!isJsonCompatible(content)) {
        throw new Error('Invalid JSON content');
      }

      const updatedBrief = await prisma.brief.update({
        where: { id },
        data: {
          date: new Date(date),
          topic,
          content: content as any,
        },
      });

      reply.send(updatedBrief);
    }
  );

  fastify.delete(
    '/briefs/:id',
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

      await prisma.brief.delete({
        where: { id },
      });

      reply.code(204).send();
    }
  );
}
