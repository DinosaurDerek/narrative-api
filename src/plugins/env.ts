import { FastifyInstance } from 'fastify';
import fastifyEnv from '@fastify/env';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: { type: 'number', default: 5000 },
    API_KEY: { type: 'string' },
  },
};

export default async function envSetup(fastify: FastifyInstance) {
  fastify.register(fastifyEnv, { schema, dotenv: true });
}
