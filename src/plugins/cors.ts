import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';

export default async function corsSetup(fastify: FastifyInstance) {
  fastify.register(fastifyCors, { origin: '*' });
}
